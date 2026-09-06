/**
 * Invariant / property tests for the clinical clock and the session state
 * machine.
 *
 * The suite in simulator.test.ts checks specific behaviours against specific
 * cases. This one does the opposite: it plays randomised but SEEDED command
 * sequences against every scaffold and asserts the rules that must hold no
 * matter what was typed. A failure here prints the seed and the exact command
 * list, so it is reproducible by re-running with that seed.
 *
 * Run: npx tsx tests/invariants.test.ts [seed]
 */
import {
  processTurnOffline,
  simTimeToMinutes,
  generateScorecard,
} from '../src/utils/ccsEngine';
import { buildCaseSessionFromScaffold } from '../src/utils/caseBinder';
import { DEFAULT_PYQ_INDEX } from '../src/data/defaultQBank';
import { CASE_SCAFFOLDS } from '../src/data/cases/scaffolds';
import { CaseSession, LocationType } from '../src/types';
import { isRestorableSession, SESSION_SCHEMA_VERSION } from '../src/utils/storage';

let passed = 0;
let failed = 0;
const failures: string[] = [];

function assert(cond: boolean, msg: string) {
  if (cond) {
    passed++;
  } else {
    failed++;
    failures.push(msg);
    console.log(`  ❌ FAIL: ${msg}`);
  }
}

/** Small deterministic PRNG so a failing run can be replayed exactly. */
function prngFrom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function parseSimTime(str: string): number | null {
  const m = str.match(/Day\s+(\d+),\s+(\d+):(\d+)/);
  if (!m) return null;
  return (parseInt(m[1], 10) - 1) * 24 * 60 + parseInt(m[2], 10) * 60 + parseInt(m[3], 10);
}

// ---------------------------------------------------------------------------
// The command vocabulary a learner can actually produce, including the junk.
// ---------------------------------------------------------------------------
const GENERIC_COMMANDS = [
  'advance 30 minutes',
  'advance 5 minutes',
  'wait 30 min',
  'hx: chest pain',
  'hx: past history',
  'pe: chest',
  'pe: abdomen',
  'pe: Vitals recheck',
  'move to ICU',
  'zzzz not a real order at all',
  '',
  '   ',
  'order:',
  'give',
  'the patient looks unwell to me',
];

function commandsFor(scaffoldId: string): string[] {
  const sc = CASE_SCAFFOLDS.find((s) => s.id === scaffoldId)!;
  const therapies = Object.values(sc.therapiesMap)
    .slice(0, 6)
    .map((t: any) => `order: ${t.aliases?.[0] ?? ''}`);
  const investigations = Object.keys(sc.investigationsMap).slice(0, 6).map((k) => `order: ${k}`);
  return [...GENERIC_COMMANDS, ...therapies.filter((t) => t.length > 8), ...investigations];
}

// ---------------------------------------------------------------------------
// Invariants checked after every single turn.
// ---------------------------------------------------------------------------
function checkSessionInvariants(
  s: CaseSession,
  prevMinutes: number,
  where: string
): number {
  const now = simTimeToMinutes(s.simTime);

  // 1. The clinical clock never runs backwards.
  assert(now >= prevMinutes, `${where}: clinical clock never moves backward (${prevMinutes} -> ${now})`);

  const all = [...s.completedOrders, ...s.pendingOrders];

  for (const ord of all) {
    const placed = parseSimTime(ord.placedSimTime);
    const ready = parseSimTime(ord.readySimTime);

    // 2. Nothing is ever ready before it was ordered. This is the defect a
    //    learner saw as "placed 09:38, ready 09:36".
    if (placed !== null && ready !== null) {
      assert(
        ready >= placed,
        `${where}: "${ord.orderName}" is not ready before it was placed (placed ${ord.placedSimTime}, ready ${ord.readySimTime})`
      );
    }

    // 3. An order is never stamped in the future relative to the clock.
    if (placed !== null) {
      assert(
        placed <= now,
        `${where}: "${ord.orderName}" was not placed after the current clock (placed ${ord.placedSimTime}, now is ${now} min)`
      );
    }

    // 4. A pending order has genuinely not come back yet.
    if (ready !== null && s.pendingOrders.includes(ord)) {
      assert(ready > now, `${where}: pending "${ord.orderName}" has not already passed its ready time`);
    }
  }

  // 5. A result is released exactly once.
  const ids = s.completedOrders.map((o) => o.id);
  assert(new Set(ids).size === ids.length, `${where}: no result is released twice`);

  // 6. Nothing is in both queues at once.
  const pendingIds = new Set(s.pendingOrders.map((o) => o.id));
  assert(
    !ids.some((id) => pendingIds.has(id)),
    `${where}: no order is pending and completed at the same time`
  );

  // 7. Every completed order is flagged ready; no pending one is.
  assert(
    s.completedOrders.every((o) => o.isReady) && s.pendingOrders.every((o) => !o.isReady),
    `${where}: the ready flag agrees with which queue the order is in`
  );

  // 8. Therapies are logged in non-decreasing time order and never in the future.
  let lastAt = -Infinity;
  for (const t of s.therapyLog) {
    assert(t.atMinutes >= lastAt, `${where}: therapy log is ordered in time`);
    assert(t.atMinutes <= now, `${where}: therapy "${t.orderName}" was not given in the future`);
    lastAt = t.atMinutes;
  }

  // 9. The whole session survives a round trip through storage.
  let round: CaseSession | null = null;
  try {
    round = JSON.parse(JSON.stringify(s));
  } catch {
    /* falls through to the assertion below */
  }
  assert(!!round && round.id === s.id, `${where}: session state is serializable`);

  // 10. Vitals stay inside physically possible bounds.
  const v = s.patient.currentVitals;
  assert(
    v.hr > 0 && v.hr < 400 && v.spo2 >= 0 && v.spo2 <= 100 && v.grbs > 0,
    `${where}: vitals stay within possible bounds (hr ${v.hr}, spo2 ${v.spo2}, grbs ${v.grbs})`
  );

  return now;
}

function run() {
  console.log('🔬 Clinical clock and state-machine invariants\n');

  const baseSeed = process.argv[2] ? parseInt(process.argv[2], 10) : 20260906;
  console.log(`Seed: ${baseSeed} (pass a different one as argv[2] to replay another run)\n`);

  // -------------------------------------------------------------------------
  // Randomised play across every case.
  // -------------------------------------------------------------------------
  console.log(`--- Randomised play: ${CASE_SCAFFOLDS.length} cases x 12 turns ---`);
  for (let i = 0; i < CASE_SCAFFOLDS.length; i++) {
    const scaffold = CASE_SCAFFOLDS[i];
    const rand = prngFrom(baseSeed + i * 7919);
    const vocab = commandsFor(scaffold.id);

    let s = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, {
      scaffoldId: scaffold.id,
      mode: 'standard',
      seed: `INV-${baseSeed}-${i}`,
    });

    let prev = simTimeToMinutes(s.simTime);
    const played: string[] = [];
    for (let turn = 0; turn < 12; turn++) {
      const cmd = vocab[Math.floor(rand() * vocab.length)];
      played.push(cmd);
      try {
        s = processTurnOffline(s, cmd);
      } catch (err: any) {
        assert(false, `${scaffold.id}: turn "${cmd}" threw ${err?.message} (after ${played.join(' | ')})`);
        break;
      }
      prev = checkSessionInvariants(s, prev, `${scaffold.id} turn ${turn}`);
    }

    // Scoring must be total and idempotent on any state the play left behind.
    try {
      const a = generateScorecard(s);
      const b = generateScorecard(s);
      assert(
        JSON.stringify(a) === JSON.stringify(b),
        `${scaffold.id}: scoring the same session twice gives the same scorecard`
      );
      assert(
        a.overallScore >= 0 && a.overallScore <= 100,
        `${scaffold.id}: score stays within 0-100 (got ${a.overallScore})`
      );
    } catch (err: any) {
      assert(false, `${scaffold.id}: scoring an arbitrary played session does not throw (${err?.message})`);
    }
  }

  // -------------------------------------------------------------------------
  // The specific regression: an order must never be ready before the turn that
  // placed it, which is what the learner reads as "placed 09:38, ready 09:36".
  // -------------------------------------------------------------------------
  console.log('\n--- Order timestamps against the turn that placed them ---');
  {
    for (const scaffold of CASE_SCAFFOLDS.slice(0, 8)) {
      let s = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, {
        scaffoldId: scaffold.id,
        mode: 'standard',
        seed: `TS-${scaffold.id}`,
      });
      const firstTherapy = Object.values(scaffold.therapiesMap)[0] as any;
      const label = firstTherapy?.aliases?.[0];
      assert(!!label, `${scaffold.id}: its first therapy is orderable by an alias`);
      if (!label) continue;
      s = processTurnOffline(s, `order: ${label}`);
      const turnMinutes = simTimeToMinutes(s.simTime);
      for (const ord of [...s.pendingOrders, ...s.completedOrders]) {
        const ready = parseSimTime(ord.readySimTime);
        const placed = parseSimTime(ord.placedSimTime);
        assert(
          placed !== null && placed === turnMinutes,
          `${scaffold.id}: "${ord.orderName}" is stamped with the clock the turn ended on`
        );
        assert(
          ready !== null && ready >= turnMinutes,
          `${scaffold.id}: "${ord.orderName}" is not ready before the turn that placed it (ready ${ord.readySimTime}, turn ended ${turnMinutes} min)`
        );
      }
    }
  }

  // -------------------------------------------------------------------------
  // Case selection must never violate the filter it was given.
  // -------------------------------------------------------------------------
  console.log('\n--- Case selection honours the filter it was given ---');
  {
    const settings: LocationType[] = ['Emergency', 'Ward'];
    for (const setting of settings) {
      const available = CASE_SCAFFOLDS.filter((s) => s.demographics.setting === setting);
      assert(available.length > 0, `there is at least one case set in ${setting}`);
      for (let i = 0; i < 40; i++) {
        const s = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, {
          setting,
          seed: `SET-${setting}-${i}`,
        });
        assert(
          s.currentLocation === setting,
          `a case requested in ${setting} starts in ${setting} (got ${s.currentLocation})`
        );
      }
    }

    const subjects = Array.from(new Set(CASE_SCAFFOLDS.map((s) => s.subject)));
    for (const subject of subjects) {
      for (let i = 0; i < 8; i++) {
        const s = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, {
          subject,
          seed: `SUB-${subject}-${i}`,
        });
        assert(
          s.subject.toLowerCase() === subject.toLowerCase(),
          `a case requested in ${subject} is a ${subject} case (got ${s.subject})`
        );
      }
    }
  }

  // -------------------------------------------------------------------------
  // Hydration: a session that has been through storage behaves identically.
  // -------------------------------------------------------------------------
  console.log('\n--- Rehydration ---');
  {
    const scaffold = CASE_SCAFFOLDS[0];
    let live = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, {
      scaffoldId: scaffold.id,
      seed: 'HYDRATE',
    });
    const script = ['pe: chest', 'advance 30 minutes', 'hx: past history'];
    for (const c of script) live = processTurnOffline(live, c);

    let hydrated: CaseSession = JSON.parse(JSON.stringify(live));
    const nextLive = processTurnOffline(live, 'advance 30 minutes');
    const nextHydrated = processTurnOffline(hydrated, 'advance 30 minutes');
    assert(
      simTimeToMinutes(nextLive.simTime) === simTimeToMinutes(nextHydrated.simTime),
      'a rehydrated session advances its clock exactly like the live one'
    );
    assert(
      JSON.stringify(nextLive.patient.currentVitals) ===
        JSON.stringify(nextHydrated.patient.currentVitals),
      'a rehydrated session produces the same vitals as the live one'
    );
  }

  // -------------------------------------------------------------------------
  // Determinism: the same seed and the same commands give the same case.
  // -------------------------------------------------------------------------
  console.log('\n--- Determinism ---');
  {
    const play = (seed: string) => {
      let s = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { seed });
      for (const c of ['pe: chest', 'advance 30 minutes', 'hx: past history']) {
        s = processTurnOffline(s, c);
      }
      return s;
    };
    const a = play('DETERMINISM-1');
    const b = play('DETERMINISM-1');
    const c = play('DETERMINISM-2');
    assert(a.scaffoldId === b.scaffoldId, 'the same seed selects the same case');
    assert(
      JSON.stringify(a.patient.currentVitals) === JSON.stringify(b.patient.currentVitals),
      'the same seed and commands give the same vitals'
    );
    assert(typeof c.scaffoldId === 'string', 'a different seed still produces a valid case');
  }

  // -------------------------------------------------------------------------
  // Storage is not a trusted input. Anything that fails validation must be
  // rejected, because handing it to React blanks the page — and the reload
  // then finds the same record and blanks again.
  // -------------------------------------------------------------------------
  console.log('\n--- Corrupt stored state is rejected ---');
  {
    const good = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { seed: 'STORAGE-OK' });
    assert(isRestorableSession(good), 'a real session is restorable');
    assert(
      isRestorableSession({ ...good, schemaVersion: SESSION_SCHEMA_VERSION }),
      'a session stamped with the current schema version is restorable'
    );

    const bad: Record<string, unknown> = {
      null: null,
      undefined: undefined,
      'a string': 'nope',
      'a number': 42,
      'an empty object': {},
      'a foreign object': { hello: 'world' },
      'missing id': { ...good, id: '' },
      'missing scaffoldId': { ...good, scaffoldId: undefined },
      'turns not an array': { ...good, turns: 'nope' },
      'orders not an array': { ...good, completedOrders: null },
      'therapy log not an array': { ...good, therapyLog: {} },
      'no clock': { ...good, simTime: undefined },
      'clock hour out of range': { ...good, simTime: { day: 1, hour: 99, minute: 0 } },
      'clock minute out of range': { ...good, simTime: { day: 1, hour: 9, minute: 61 } },
      'clock day below one': { ...good, simTime: { day: 0, hour: 9, minute: 0 } },
      'clock is NaN': { ...good, simTime: { day: 1, hour: NaN, minute: 0 } },
      'no patient': { ...good, patient: null },
      'no vitals': { ...good, patient: {} },
      'vitals are NaN': { ...good, patient: { currentVitals: { hr: NaN, spo2: 98 } } },
      'a schema from the future': { ...good, schemaVersion: SESSION_SCHEMA_VERSION + 1 },
    };
    for (const [name, value] of Object.entries(bad)) {
      assert(!isRestorableSession(value), `stored state is rejected: ${name}`);
    }
  }

  console.log(`\n${failed === 0 ? '🎉' : '💥'} Invariants: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    console.log('\nFailures:');
    failures.slice(0, 25).forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
}

run();
