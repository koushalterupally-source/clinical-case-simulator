/**
 * Formal schema / build-time validation for CaseScaffold data.
 *
 * This is hand-written, not a schema library (zod etc.) — the project has no
 * schema dependency and this file is not meant to introduce one. It exists to
 * catch the class of defect CASE_MODEL.md and tests/simulator.test.ts Suite 14
 * already worry about (dangling requiresFirst, an unreachable critical
 * intervention, a vignette that names its own diagnosis, ...), but as a
 * reusable, importable check rather than only as inline test assertions, so a
 * script can run it against the whole library and report per-case.
 *
 * `validateScaffold` checks a single case in isolation. `validateLibrary`
 * checks properties that only make sense across the whole set (right now:
 * duplicate ids) — call both.
 */
import { CaseScaffold, LocationType, OrderCategory } from '../types';
import { normalizeOrderText } from '../utils/ccsEngine';

const LOCATION_TYPES: LocationType[] = ['Emergency', 'OPD', 'Ward', 'ICU', 'OT', 'Home'];
const ORDER_CATEGORIES: OrderCategory[] = ['labs', 'imaging', 'drugs', 'consults', 'procedures', 'monitoring'];
const APPROPRIATENESS_VALUES = ['indicated', 'neutral', 'harmful'] as const;

/**
 * Content-word extraction for "does this text leak the diagnosis" checks.
 * This is deliberately identical to the logic in tests/simulator.test.ts
 * Suite 14 (the opening-vignette leak check) — same stopword list, same
 * split/filter — so this file and that test can never quietly disagree about
 * what counts as a leak. If that test's definition changes, update this one
 * too rather than inventing a second definition.
 */
const CONTENT_WORD_STOPWORDS = new Set([
  'acute', 'severe', 'chronic', 'syndrome', 'disease', 'shock', 'injury',
  'failure', 'infection', 'bleed', 'bleeding', 'upper', 'lower', 'post',
  'with', 'and', 'the',
]);

function contentWordsOf(conditionName: string): string[] {
  return conditionName
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 3 && !CONTENT_WORD_STOPWORDS.has(w));
}

function leaksDiagnosis(text: string, condTerms: string[]): string | null {
  const lower = text.toLowerCase();
  for (const term of condTerms) {
    if (new RegExp(`\\b${term}\\b`).test(lower)) return term;
  }
  return null;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

/** Reads systolic/diastolic out of a "120/80"-shaped string, mirroring
 *  src/utils/gamification.ts's systolicOf so the schema agrees with the
 *  engine about what a parseable bp string looks like. */
function parseBp(bp: string): { systolic: number; diastolic: number } | null {
  const m = String(bp).match(/(\d+)\s*\/\s*(\d+)/);
  if (!m) return null;
  return { systolic: parseInt(m[1], 10), diastolic: parseInt(m[2], 10) };
}

/** Reads the leading numeric value out of a temp string like "38.4°C" or
 *  "101.2°F", mirroring src/utils/gamification.ts's tempSeverity parsing. */
function parseTempNumber(temp: string): number | null {
  const m = String(temp).match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return Number.isFinite(n) ? n : null;
}

/**
 * Detects a cycle in the requiresFirst graph within one therapiesMap.
 * Returns the first cycle found, as an ordered list of keys, or null.
 */
function findRequiresFirstCycle(therapiesMap: CaseScaffold['therapiesMap']): string[] | null {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Map<string, number>();
  const stack: string[] = [];

  function visit(key: string): string[] | null {
    color.set(key, GRAY);
    stack.push(key);
    const entry = therapiesMap[key];
    for (const dep of entry?.requiresFirst || []) {
      if (!Object.prototype.hasOwnProperty.call(therapiesMap, dep)) continue; // reported separately as dangling
      const depColor = color.get(dep) ?? WHITE;
      if (depColor === GRAY) {
        const cycleStart = stack.indexOf(dep);
        return [...stack.slice(cycleStart), dep];
      }
      if (depColor === WHITE) {
        const found = visit(dep);
        if (found) return found;
      }
    }
    stack.pop();
    color.set(key, BLACK);
    return null;
  }

  for (const key of Object.keys(therapiesMap)) {
    if ((color.get(key) ?? WHITE) === WHITE) {
      const found = visit(key);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Validates one CaseScaffold in isolation. Returns a list of human-readable
 * problems; an empty array means the scaffold is valid.
 */
export function validateScaffold(scaffold: CaseScaffold): string[] {
  const problems: string[] = [];
  const where = scaffold?.id || '(missing id)';
  const fail = (msg: string) => problems.push(`${where}: ${msg}`);

  if (!scaffold) {
    return ['(scaffold is null/undefined)'];
  }

  // --- Identity fields -------------------------------------------------
  if (!isNonEmptyString(scaffold.id)) fail('id is missing or empty');
  if (!isNonEmptyString(scaffold.title)) fail('title is missing or empty');
  if (!isNonEmptyString(scaffold.conditionName)) fail('conditionName is missing or empty');
  if (!isNonEmptyString(scaffold.subject)) fail('subject is missing or empty');

  // --- Demographics ------------------------------------------------------
  const demo = scaffold.demographics;
  if (!demo) {
    fail('demographics is missing');
  } else {
    if (!isFiniteNumber(demo.age)) {
      fail(`demographics.age is not a finite number (${JSON.stringify(demo.age)})`);
    } else if (demo.age < 0 || demo.age > 120) {
      fail(`demographics.age (${demo.age}) is outside a plausible range (0-120)`);
    }
    if (demo.gender !== 'Male' && demo.gender !== 'Female') {
      fail(`demographics.gender is not Male|Female (got ${JSON.stringify(demo.gender)})`);
    }
    if (!LOCATION_TYPES.includes(demo.setting as LocationType)) {
      fail(`demographics.setting is not a valid LocationType (got ${JSON.stringify(demo.setting)})`);
    }
  }

  // --- Initial vitals ------------------------------------------------------
  const vitals = scaffold.initialVitals;
  if (!vitals) {
    fail('initialVitals is missing');
  } else {
    for (const key of ['hr', 'rr', 'spo2', 'grbs'] as const) {
      if (!isFiniteNumber(vitals[key])) {
        fail(`initialVitals.${key} is not a finite number (${JSON.stringify(vitals[key])})`);
      }
    }
    if (!isNonEmptyString(vitals.temp)) {
      fail('initialVitals.temp is missing or empty');
    } else if (parseTempNumber(vitals.temp) === null) {
      fail(`initialVitals.temp does not contain a parseable numeric value (${JSON.stringify(vitals.temp)})`);
    }
    if (!isNonEmptyString(vitals.bp)) {
      fail('initialVitals.bp is missing or empty');
    } else {
      const parsed = parseBp(vitals.bp);
      if (!parsed) {
        fail(`initialVitals.bp does not parse as "systolic/diastolic" (${JSON.stringify(vitals.bp)})`);
      } else if (parsed.systolic <= parsed.diastolic) {
        fail(`initialVitals.bp "${vitals.bp}" has systolic (${parsed.systolic}) not greater than diastolic (${parsed.diastolic})`);
      }
    }
  }

  const therapiesMap = scaffold.therapiesMap || {};
  const investigationsMap = scaffold.investigationsMap || {};
  const therapyKeys = new Set(Object.keys(therapiesMap));
  const investigationKeys = new Set(Object.keys(investigationsMap));

  // --- Alias normalisation uniqueness, WITHIN this case, across BOTH maps --
  // Two different therapies/investigations claiming the same normalized alias
  // is a genuine ambiguity: the engine's findByAlias (normalizeOrderText,
  // equality match) can only ever resolve it to one of them.
  const aliasOwner = new Map<string, string>();
  const claimAlias = (alias: unknown, owner: string) => {
    if (!isNonEmptyString(alias)) {
      fail(`${owner} has an empty or non-string alias`);
      return;
    }
    const norm = normalizeOrderText(alias);
    if (!norm) {
      fail(`${owner} alias "${alias}" normalizes to empty`);
      return;
    }
    const prior = aliasOwner.get(norm);
    if (prior !== undefined) {
      fail(
        prior === owner
          ? `${owner} lists alias "${alias}" twice (normalizes to an alias it already has)`
          : `alias "${alias}" is claimed by both ${prior} and ${owner} (normalizes the same)`
      );
    } else {
      aliasOwner.set(norm, owner);
    }
  };

  // --- Investigations ------------------------------------------------------
  for (const [key, entry] of Object.entries(investigationsMap)) {
    const label = `investigation "${key}"`;
    if (!entry || !Array.isArray(entry.aliases) || entry.aliases.length === 0) {
      fail(`${label} has no aliases`);
    } else {
      for (const a of entry.aliases) claimAlias(a, `investigation:${key}`);
    }
    if (!entry || !isNonEmptyString(entry.resultText)) fail(`${label} has no resultText`);
    if (!entry || !isFiniteNumber(entry.turnaroundMinutes) || entry.turnaroundMinutes <= 0) {
      fail(`${label} turnaroundMinutes is not a finite number > 0 (got ${JSON.stringify(entry?.turnaroundMinutes)})`);
    }
    if (!entry || !ORDER_CATEGORIES.includes(entry.category)) {
      fail(`${label} has an invalid category (got ${JSON.stringify(entry?.category)})`);
    }
  }

  // --- Therapies -------------------------------------------------------
  for (const [key, entry] of Object.entries(therapiesMap)) {
    const label = `therapy "${key}"`;
    if (!entry || !Array.isArray(entry.aliases) || entry.aliases.length === 0) {
      fail(`${label} has no aliases`);
    } else {
      for (const a of entry.aliases) claimAlias(a, `therapy:${key}`);
    }
    if (!entry || !isNonEmptyString(entry.responseText)) fail(`${label} has no responseText`);
    if (!entry || !isFiniteNumber(entry.onsetMinutes) || entry.onsetMinutes < 0) {
      fail(`${label} onsetMinutes is not a finite number >= 0 (got ${JSON.stringify(entry?.onsetMinutes)})`);
    }
    if (!entry || !APPROPRIATENESS_VALUES.includes(entry.appropriateness)) {
      fail(`${label} has an invalid appropriateness (got ${JSON.stringify(entry?.appropriateness)})`);
    }
    if (!entry || !isNonEmptyString(entry.rationale)) fail(`${label} has no rationale`);

    // Dangling requiresFirst: names a therapy key that does not exist in this
    // same therapiesMap. Fails silently at runtime (the prerequisite is
    // simply never satisfiable), so a typo makes the case unwinnable.
    for (const req of entry?.requiresFirst || []) {
      if (req === key) {
        fail(`${label} lists itself in requiresFirst`);
      } else if (!therapyKeys.has(req)) {
        fail(`${label} requiresFirst names "${req}", which does not exist in this case's therapiesMap`);
      }
    }

    // Dangling labShift: names an investigation key that does not exist.
    for (const shifted of Object.keys(entry?.labShift || {})) {
      if (!investigationKeys.has(shifted)) {
        fail(`${label} labShift names investigation "${shifted}", which does not exist in this case's investigationsMap`);
      }
    }
  }

  // Circular requiresFirst chains: A requires B requires A (or longer) means
  // neither can ever legally be given first.
  const cycle = findRequiresFirstCycle(therapiesMap);
  if (cycle) {
    fail(`circular requiresFirst chain: ${cycle.join(' -> ')}`);
  }

  // --- Critical interventions ------------------------------------------
  const allAliases: string[] = [
    ...Object.values(therapiesMap).flatMap((e) => e?.aliases || []),
    ...Object.values(investigationsMap).flatMap((e) => e?.aliases || []),
  ];
  const interventions = scaffold.criticalInterventions || [];
  if (interventions.length === 0) {
    fail('has no criticalInterventions');
  }
  interventions.forEach((ci, idx) => {
    const label = `criticalIntervention[${idx}]${ci?.name ? ` "${ci.name}"` : ''}`;
    if (!ci || !isNonEmptyString(ci.name)) fail(`${label} has no name`);
    if (!ci || !(ci.orderOrActionPattern instanceof RegExp)) {
      fail(`${label} orderOrActionPattern is not a RegExp`);
    }
    if (!ci || !isFiniteNumber(ci.targetMilestoneMinutes) || ci.targetMilestoneMinutes <= 0) {
      fail(`${label} targetMilestoneMinutes is not a finite number > 0 (got ${JSON.stringify(ci?.targetMilestoneMinutes)})`);
    }
    if (ci && ci.orderOrActionPattern instanceof RegExp) {
      const reachable = allAliases.some((alias) => ci.orderOrActionPattern.test(alias));
      if (!reachable) {
        fail(`${label} pattern matches no orderable alias in this case (therapiesMap/investigationsMap) — it can never be satisfied`);
      }
    }
  });

  // --- Diagnosis-leak checks: opening vignette + every gate patientContext -
  const condTerms = isNonEmptyString(scaffold.conditionName) ? contentWordsOf(scaffold.conditionName) : [];
  if (isNonEmptyString(scaffold.openingVignette)) {
    const leak = leaksDiagnosis(scaffold.openingVignette, condTerms);
    if (leak) fail(`openingVignette names the diagnosis ("${leak}")`);
  } else {
    fail('openingVignette is missing or empty');
  }

  (scaffold.gateMilestones || []).forEach((gate, idx) => {
    if (!isNonEmptyString(gate?.patientContext)) {
      fail(`gateMilestones[${idx}].patientContext is missing or empty`);
      return;
    }
    const leak = leaksDiagnosis(gate.patientContext, condTerms);
    if (leak) fail(`gateMilestones[${idx}].patientContext names the diagnosis ("${leak}")`);
  });

  return problems;
}

/**
 * Cross-case checks that only make sense against the whole library — right
 * now, duplicate ids. Call this alongside validateScaffold on every case;
 * neither subsumes the other.
 */
export function validateLibrary(scaffolds: CaseScaffold[]): string[] {
  const problems: string[] = [];
  const seenIds = new Map<string, number>();
  scaffolds.forEach((sc, idx) => {
    const id = sc?.id;
    if (!isNonEmptyString(id)) return; // reported by validateScaffold
    if (seenIds.has(id)) {
      problems.push(`duplicate id "${id}": used by scaffold index ${seenIds.get(id)} and index ${idx}`);
    } else {
      seenIds.set(id, idx);
    }
  });
  return problems;
}
