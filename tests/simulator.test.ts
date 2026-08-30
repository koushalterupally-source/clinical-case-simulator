import { parseRawQBankTextOffline } from '../src/utils/qbankParser';
import {
  addMinutesToSimTime,
  processTurnOffline,
  generateScorecard,
  splitOrders,
  inferOrderCategory,
  simTimeToMinutes,
  formatSimTime,
  normalizeOrderText,
  findByAlias,
  getOrderableGroupsForScaffold,
  investigationGrade,
} from '../src/utils/ccsEngine';
import { buildCaseSessionFromScaffold } from '../src/utils/caseBinder';
import { exportQBankToJSON, importQBankFromJSON } from '../src/utils/qbankParser';
import { DEFAULT_PYQ_INDEX } from '../src/data/defaultQBank';
import { CASE_SCAFFOLDS } from '../src/data/cases/scaffolds';
import { ORDER_GROUPS } from '../src/data/orderSets';
import { buildQuestionLedCase, buildIdf } from '../src/utils/questionLedCase';
import {
  rankForXp,
  xpForGate,
  computeGameStats,
  hrSeverity,
  spo2Severity,
  rrSeverity,
  bpSeverity,
  tempSeverity,
  grbsSeverity,
  instabilityScore,
  stabilityLabel,
} from '../src/utils/gamification';
import { CaseSession, PYQItem } from '../src/types';

function runTests() {
  console.log('🚀 Running Medtrix PYQ CCS Engine Verification Suite...\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, testName: string) => {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  };

  // 1. Sim-clock arithmetic test (midnight wrap and past day 10)
  console.log('--- Test Suite 1: Sim-Clock Arithmetic ---');
  const startClock = { day: 1, hour: 23, minute: 50 };
  const endClock = addMinutesToSimTime(startClock, 20);
  assert(endClock.day === 2 && endClock.hour === 0 && endClock.minute === 10, 'Midnight rollover (23:50 + 20m -> Day 2 00:10)');

  const day10Clock = { day: 10, hour: 12, minute: 0 };
  const pastDay10Clock = addMinutesToSimTime(day10Clock, 1440); // +24h
  assert(pastDay10Clock.day === 11 && pastDay10Clock.hour === 12 && pastDay10Clock.minute === 0, 'Multi-day progression past Day 10');

  // 2. QBank Parser Tests
  console.log('\n--- Test Suite 2: QBank Index Parser ---');
  const sampleRawText = `
Q1. A 45-year-old male presents with severe epigastric pain radiating to back. Lipase is 1200 U/L. What is the initial best fluid?
(A) 5% Dextrose
(B) Normal Saline (0.9% NaCl)
(C) Hypertonic Saline
(D) Colloid
Ans: B
Concept: Acute pancreatitis resuscitation with normal saline.
  `;

  const parsed = parseRawQBankTextOffline(sampleRawText);
  assert(parsed.parsedItems.length === 1, 'Parses single question block');
  assert(parsed.parsedItems[0].correctAnswer === 'B', 'Extracts correct answer choice B');
  assert(parsed.parsedItems[0].options.B.includes('Normal Saline'), 'Extracts Option B text cleanly');

  // Missing answer handling test
  const noAnsText = `
Q2. A 30y/o female has hyperthyroidism. Which drug is preferred in 1st trimester?
(A) Methimazole
(B) PTU
(C) Carbimazole
(D) Radioactive Iodine
  `;
  const parsedNoAns = parseRawQBankTextOffline(noAnsText);
  assert(parsedNoAns.parsedItems[0].correctAnswer === 'ANSWER-NOT-IN-SOURCE', 'Correctly flags ANSWER-NOT-IN-SOURCE when answer is missing');
  assert(parsedNoAns.parsedItems[0].isDraft === true, 'Sets isDraft = true for unverified answer source');

  // 3. Gate Binding & Grading (Standard & Blind mode)
  console.log('\n--- Test Suite 3: Gate Binding & Grading ---');
  const mockPyqs: PYQItem[] = [
    {
      qid: 'NEETPG-2023-001',
      exam: 'NEET-PG',
      year: 2023,
      subject: 'Medicine',
      system: 'Cardiology',
      topic: 'STEMI',
      stem: 'Patient with acute chest pain, ST elevation in II, III, aVF.',
      options: { A: 'Aspirin & Clopidogrel', B: 'Metoprolol', C: 'Digoxin', D: 'Amlodipine' },
      correctAnswer: 'A',
      conceptTested: 'Dual antiplatelet therapy in acute MI',
      roleTag: 'MANAGEMENT',
    },
  ];

  // Pin the scaffold: gates now require the question to be topically about the
  // Pure clinical simulation by default: no question gate interruptions
  const pureSession = buildCaseSessionFromScaffold(mockPyqs, { mode: 'standard', scaffoldId: 'scaffold_stemi' });
  assert(pureSession.decisionGates.length === 0, 'Pure clinical simulation has no question gate interruptions');

  // Gated mode verification with bindGates: true
  const session = buildCaseSessionFromScaffold(mockPyqs, { mode: 'standard', scaffoldId: 'scaffold_stemi', bindGates: true });
  assert(session.decisionGates.length > 0, 'Decision gates bound from scaffolds & PYQ index when requested');

  // And the inverse: an unrelated case must NOT bind this question at all.
  const unrelated = buildCaseSessionFromScaffold(mockPyqs, { mode: 'standard', scaffoldId: 'scaffold_meningitis', bindGates: true });
  assert(unrelated.decisionGates.length === 0, 'A STEMI question does not bind into a meningitis case');

  // No case may present the same question twice.
  const qids = session.decisionGates.map((g) => g.pyq.qid);
  assert(qids.length === new Set(qids).size, 'No question repeats within a single case');

  const gate0 = session.decisionGates[0];
  assert(gate0.userAnswer === undefined, 'Uncommitted gate has undefined userAnswer');

  // Test standard grading via processTurnOffline
  const targetAnswer = gate0.pyq.correctAnswer;
  const updatedSess = processTurnOffline(session, undefined, targetAnswer, 0);
  assert(updatedSess.decisionGates[0].isCorrect === true, `Standard gate answer "${targetAnswer}" graded correct`);
  assert(updatedSess.decisionGates[0].userAnswer === targetAnswer, 'User answer recorded against gate 0');

  // Test blind mode synonym matching
  const blindSess = buildCaseSessionFromScaffold(mockPyqs, { mode: 'blind', scaffoldId: 'scaffold_stemi', bindGates: true });
  const blindUpdated = processTurnOffline(blindSess, undefined, 'aspirin and plavix', 0);
  assert(blindUpdated.decisionGates[0].isCorrect === true, 'Blind mode synonym match "aspirin and plavix" graded correct');

  // 4. Answer Leak Protection Test
  console.log('\n--- Test Suite 4: Answer Leak Protection ---');
  const uncommittedGate = session.decisionGates[0];
  assert(uncommittedGate.isCorrect === undefined, 'Uncommitted gate does NOT expose correctness');
  assert(uncommittedGate.userAnswer === undefined, 'Uncommitted gate does NOT expose user answer');

  // 4b. Gate context must never name its own diagnosis. It is rendered BEFORE the user commits —
  // in the pre-gate banner, the gates sidebar and the modal — so leaking the condition name there
  // hands over the answer for free.
  // Words that describe what the doctor can already observe (presenting complaint, established
  // history) rather than the diagnosis itself. Mentioning these in gate context is legitimate.
  const STOPWORDS = new Set([
    'acute', 'severe', 'chronic', 'syndrome', 'disease', 'shock', 'injury',
    'failure', 'infection', 'bleed', 'bleeding', 'upper', 'lower', 'post',
    'with', 'and', 'the',
  ]);
  let leaks = 0;
  for (const scaffold of CASE_SCAFFOLDS) {
    const terms = scaffold.conditionName
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 3 && !STOPWORDS.has(w));
    for (const milestone of scaffold.gateMilestones) {
      const ctx = milestone.patientContext.toLowerCase();
      for (const term of terms) {
        // Match on word boundaries, not substrings: "tension pneumothorax" must not
        // fire on the word "hypotension", which is a sign the doctor can observe.
        if (new RegExp(`\\b${term}\\b`).test(ctx)) {
          console.error(`   ↳ LEAK in ${scaffold.id}: "${term}" appears in patientContext`);
          leaks++;
        }
      }
    }
  }
  assert(leaks === 0, 'No gate patientContext names its own diagnosis');

  // 4c. Gamification maths
  console.log('\n--- Test Suite 4c: Gamification ---');
  assert(rankForXp(0).id === 'intern', 'Zero XP is Intern');
  assert(rankForXp(250).id === 'resident', '250 XP is Resident');
  assert(rankForXp(99999).id === 'professor', 'Very high XP caps at Professor');
  assert(xpForGate(0) === 100, 'First correct gate is worth 100 XP');
  assert(xpForGate(2) === 150, 'Third consecutive correct gate carries a streak bonus');

  assert(hrSeverity(75) === 'normal', 'HR 75 is normal');
  assert(hrSeverity(115) === 'warning', 'HR 115 is a warning');
  assert(hrSeverity(140) === 'critical', 'HR 140 is critical');
  assert(spo2Severity(88) === 'critical', 'SpO2 88% is critical');
  assert(bpSeverity('85/50') === 'critical', 'Systolic 85 is critical');
  assert(bpSeverity('120/80') === 'normal', 'BP 120/80 is normal');
  // Temperature must work in either unit, since scaffolds use both.
  assert(tempSeverity('39.8°C') === 'critical', '39.8 C is critical');
  assert(tempSeverity('103.6°F') === 'critical', '103.6 F is critical (converted)');
  assert(tempSeverity('37.0°C') === 'normal', '37.0 C is normal');

  const gamified = computeGameStats(session);
  assert(gamified.xp >= 0 && gamified.gatesTotal === session.decisionGates.length, 'Game stats derive from the session');
  assert(gamified.badges.length > 0, 'Badge list is produced');

  // Second, independent leak check using word boundaries rather than substrings.
  // The two catch different things; both must hold.
  let leakFound = false;
  CASE_SCAFFOLDS.forEach((scaffold) => {
    const condName = scaffold.conditionName.toLowerCase();
    const keywords = condName
      .split(/[\s\(\)\/]+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 3 && !['acute', 'wall', 'severe', 'with', 'shock', 'young', 'post', 'type', 'gastroenterology'].includes(w));

    scaffold.gateMilestones.forEach((gate, gIdx) => {
      const ctx = gate.patientContext.toLowerCase();
      keywords.forEach((kw) => {
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(ctx)) {
          leakFound = true;
          console.error(`Leak detected in ${scaffold.id} gate ${gIdx}: keyword "${kw}" found in "${gate.patientContext}"`);
        }
      });
    });
  });
  assert(!leakFound, 'No gate patientContext names its diagnosis (word-boundary check)');

  // 4d. Order sheet: multi-order commands
  console.log('\n--- Test Suite 4d: Order Entry ---');
  assert(splitOrders('CBC, ABG, LFT').length === 3, 'Splits a comma-separated order list');
  assert(
    splitOrders('RFT / KFT (urea, creatinine), ABG').length === 2,
    'Does not split on a comma inside brackets'
  );
  assert(
    splitOrders('RFT / KFT (urea, creatinine), ABG')[0] === 'RFT / KFT (urea, creatinine)',
    'Keeps the bracketed order name intact'
  );
  assert(splitOrders('  ECG  ').length === 1, 'Trims a single order');
  assert(inferOrderCategory('Chest X-ray portable') === 'imaging', 'X-ray is imaging');
  assert(inferOrderCategory('12-lead ECG') === 'monitoring', 'ECG is monitoring');
  assert(inferOrderCategory('Normal saline 0.9% 500 mL bolus') === 'drugs', 'Saline bolus is a drug/fluid');
  assert(inferOrderCategory('Cardiology consult') === 'consults', 'Consult is a consult');
  assert(inferOrderCategory('Endotracheal intubation') === 'procedures', 'Intubation is a procedure');
  assert(inferOrderCategory('Serum ferritin') === 'labs', 'Ferritin is a lab');

  const orderSess = processTurnOffline(session, 'order: CBC / Hemogram, ABG, Chest X-ray portable');
  assert(orderSess.pendingOrders.length === 3, 'Three separate orders are queued from one command');

  // 4e. Question-led cases — the whole bank, not just the 12 authored conditions
  console.log('\n--- Test Suite 4e: Question-Led Cases ---');
  const bank: PYQItem[] = [];
  for (let i = 0; i < 40; i++) {
    bank.push({
      qid: `Q${i}`, exam: 'NEET-PG', year: 2023,
      subject: i % 2 ? 'Medicine' : 'Surgery',
      system: i % 2 ? 'Cardiology' : 'Gastroenterology',
      topic: '',
      // Half share a rare term, half share nothing distinctive.
      // Distinctive shared term, but genuinely different questions — near
      // identical phrasings are rejected as duplicates, by design.
      stem: i % 2
        ? [
            'Which enzyme is deficient in pheochromocytoma workup?',
            'Preferred imaging modality for pheochromocytoma localisation?',
            'Preoperative blockade of choice before pheochromocytoma surgery?',
            'Which syndrome is pheochromocytoma associated with inheritance?',
            'Urinary metabolite measured when pheochromocytoma suspected?',
          ][Math.floor(i / 2) % 5] + ` (variant ${i})`
        : `A patient has a common finding number ${i}. What next?`,
      options: { A: `alpha ${i}`, B: `beta ${i}`, C: `gamma ${i}`, D: `delta ${i}` },
      correctAnswer: 'A', conceptTested: '', roleTag: 'DIAGNOSIS',
    } as PYQItem);
  }
  const idf = buildIdf(bank);
  const qCase = buildQuestionLedCase(bank, { seed: 'T1', idf, seedQid: 'Q1' });
  assert(qCase.isQuestionLed === true, 'Question-led case is flagged as such');
  assert(qCase.decisionGates.length > 1, 'Question-led case gathers related questions');
  assert(
    qCase.decisionGates.every((g) => /pheochromocytoma/i.test(g.pyq.stem)),
    'Only questions sharing distinctive vocabulary are gathered'
  );
  const qlQids = qCase.decisionGates.map((g) => g.pyq.qid);
  assert(qlQids.length === new Set(qlQids).size, 'Question-led case never repeats a question');
  assert(
    qCase.decisionGates.every((g) => g.userAnswer === undefined),
    'Question-led gates start uncommitted'
  );
  // A question-led case must not pretend to be a simulated patient.
  assert(qCase.incidentalFindings.length === 0, 'Question-led case plants no fake incidental findings');
  assert(qCase.patient.diagnosis === '', 'Question-led case claims no diagnosis');

  // 5. JSON Import & Export Test
  console.log('\n--- Test Suite 5: Import & Export Integrity ---');
  const exported = exportQBankToJSON(DEFAULT_PYQ_INDEX);
  const reimported = importQBankFromJSON(exported);
  assert(reimported.length === DEFAULT_PYQ_INDEX.length, 'Reimported QBank matches exported item count');

  // 6. Vitals Decay & Trajectory Dynamics
  console.log('\n--- Test Suite 6: Vitals Decay & Trajectory Dynamics ---');
  const stemiSession = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_stemi', mode: 'standard' });
  const initialHr = stemiSession.patient.currentVitals.hr;
  const initialSpo2 = stemiSession.patient.currentVitals.spo2;

  // Advance clock past critical milestone (STEMI DAPT window is 20 min) without ordering DAPT
  const delayedSession = processTurnOffline(stemiSession, 'advance 45 minutes');
  assert(delayedSession.patient.currentVitals.hr > initialHr, 'Heart rate deteriorates (climbs) when critical intervention is overdue');
  assert(delayedSession.patient.currentVitals.spo2 < initialSpo2, 'Oxygen saturation deteriorates (falls) when critical intervention is overdue');
  assert(delayedSession.turns[delayedSession.turns.length - 1].whatHappened.includes('deteriorating'), 'Deterioration warning added to turn narrative');

  // Ordering critical intervention improves vitals
  const treatedSession = processTurnOffline(delayedSession, 'order: Aspirin 325 mg chewed, Clopidogrel 300 mg loading');
  assert(treatedSession.patient.currentVitals.hr < delayedSession.patient.currentVitals.hr, 'Heart rate recovers after critical intervention');
  assert(treatedSession.patient.currentVitals.spo2 > delayedSession.patient.currentVitals.spo2, 'Oxygenation recovers after critical intervention');

  // Question-led cases must NEVER suffer trajectory decay
  const qLedDecayCheck = processTurnOffline(qCase, 'advance 120 minutes');
  assert(qLedDecayCheck.patient.currentVitals.hr === 0, 'Question-led set maintains 0 HR (no phantom deterioration)');
  assert(qLedDecayCheck.patient.currentVitals.spo2 === 0, 'Question-led set maintains 0 SpO2 (no phantom decay)');
  assert(!qLedDecayCheck.turns[qLedDecayCheck.turns.length - 1].whatHappened.includes('deteriorating'), 'Question-led case emits no deterioration warning');

  // 7. Order Result Turnaround & Delivery Pipeline
  console.log('\n--- Test Suite 7: Order Result Turnaround & Delivery Pipeline ---');
  const freshSession = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_stemi', mode: 'standard' });
  const withOrders = processTurnOffline(freshSession, 'order: 12-lead ECG, STAT Troponin I, Chest X-ray PA');
  // Order entry for 3 items takes 5 minutes (09:00 -> 09:05), so 5-minute ECG delivers at end of turn 1
  assert(withOrders.completedOrders.some((o) => /ecg/i.test(o.orderName)), '5-minute ECG delivers once sim clock reaches 09:05');
  assert(withOrders.pendingOrders.length === 2, 'Remaining 2 slower orders (Troponin 30m, CXR 20m) remain queued in pendingOrders');

  // Advance time by 15 mins (09:05 -> 09:20): CXR (20m turnaround, ready 09:20) delivers
  const after15Mins = processTurnOffline(withOrders, 'advance 15 minutes');
  const cxrDone = after15Mins.completedOrders.some((o) => /cxr|chest x-ray/i.test(o.orderName));
  assert(cxrDone, 'Medium turnaround order (CXR PA, 20m) moves to completedOrders at 09:20');
  assert(after15Mins.pendingOrders.some((o) => /troponin/i.test(o.orderName)), '30-minute Troponin remains pending at 09:20');

  // Advancing time past 09:30 delivers Troponin
  const after30Mins = processTurnOffline(after15Mins, 'advance 15 minutes');
  assert(after30Mins.pendingOrders.length === 0, 'All pending orders delivered after sufficient turnaround (09:35 >= 09:30)');
  assert(after30Mins.completedOrders.length === 3, 'All 3 orders now in completedOrders');
  assert(after30Mins.turns[after30Mins.turns.length - 1].newResults.length > 0, 'Turn recorded delivered results');

  // Incidental finding discovery via investigation
  const incBefore = freshSession.incidentalFindings[0]?.status;
  const withImaging = processTurnOffline(freshSession, 'order: USG Abdomen & Pelvis, Chest X-ray portable');
  const incAfter = withImaging.incidentalFindings.some((i) => i.status === 'noticed_addressed');
  assert(incBefore === 'unnoticed' && incAfter, 'Ordering relevant imaging discovers and addresses incidental finding');

  // 8. Scorecard Generation & Grading
  console.log('\n--- Test Suite 8: Scorecard Generation & Grading ---');
  const scoredSession = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_stemi', mode: 'standard', bindGates: true });
  // Answer all gates correctly
  let fullSession = scoredSession;
  for (let g = 0; g < fullSession.decisionGates.length; g++) {
    const ans = fullSession.decisionGates[g].pyq.correctAnswer;
    fullSession = processTurnOffline(fullSession, undefined, ans, g);
  }
  const perfectCard = generateScorecard(fullSession);
  assert(perfectCard.pyqScore.percentage === 100, 'All correct gates yields 100% PYQ score');
  assert(perfectCard.overallGrade === 'S' || perfectCard.overallGrade === 'A', 'Perfect gate run earns high grade (S/A)');
  assert(perfectCard.finalDiagnosis.includes('STEMI'), 'Scorecard includes correct final diagnosis');
  assert(perfectCard.clinchingClue.length > 0, 'Scorecard includes clinching clue');

  // Question-led scorecard
  let qLedRun = qCase;
  for (let g = 0; g < qLedRun.decisionGates.length; g++) {
    const ans = qLedRun.decisionGates[g].pyq.correctAnswer;
    qLedRun = processTurnOffline(qLedRun, undefined, ans, g);
  }
  const qScorecard = generateScorecard(qLedRun);
  assert(qScorecard.pyqScore.percentage === 100, 'Question-led scorecard scores 100% for all correct');
  assert(qScorecard.overOrderingList.length === 0, 'Question-led scorecard has zero unmodeled order penalties');
  assert(qScorecard.criticalDelays.length === 0, 'Question-led scorecard has zero critical delays');
  assert(qScorecard.overallScore === 100, 'Question-led overallScore matches pyq percentage');

  // 9. Simulation Control Commands & State Transitions
  console.log('\n--- Test Suite 9: Simulation Control Commands & State Transitions ---');
  const ctrlSession = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_stemi', mode: 'standard' });
  
  // Pause command
  const paused = processTurnOffline(ctrlSession, 'pause');
  assert(paused.status === 'paused', 'Command "pause" sets session status to paused');

  // Transfer command
  const transferred = processTurnOffline(ctrlSession, 'move to ICU');
  assert(transferred.currentLocation === 'ICU', 'Command "move to ICU" updates currentLocation to ICU');

  // End case command
  const ended = processTurnOffline(ctrlSession, 'end case');
  assert(ended.status === 'completed', 'Command "end case" sets session status to completed');
  assert(ended.scorecard !== undefined, 'Command "end case" generates scorecard automatically');

  // History and Physical Exam commands
  const withHx = processTurnOffline(ctrlSession, 'hx: allergies');
  assert(withHx.historyLog.length === 1, 'Command "hx: allergies" appends to historyLog');
  const withPe = processTurnOffline(ctrlSession, 'pe: cvs');
  assert(withPe.examLog.length === 1, 'Command "pe: cvs" appends to examLog');

  // 10. Gamification Edge Cases & Stability
  console.log('\n--- Test Suite 10: Gamification Edge Cases & Stability ---');
  assert(instabilityScore(qCase) === 0, 'Question-led case instabilityScore is 0 (Stable)');
  assert(stabilityLabel(0).label === 'STABLE', 'Score 0 produces STABLE stability label');
  assert(stabilityLabel(6).label === 'CRITICAL', 'Score 6 produces CRITICAL stability label');
  assert(stabilityLabel(3).label === 'UNSTABLE', 'Score 3 produces UNSTABLE stability label');
  assert(stabilityLabel(1).label === 'GUARDED', 'Score 1 produces GUARDED stability label');
  assert(hrSeverity(0) === 'normal', '0 HR returns normal');
  assert(spo2Severity(0) === 'normal', '0 SpO2 returns normal');
  assert(rrSeverity(0) === 'normal', '0 RR returns normal');
  assert(grbsSeverity(0) === 'normal', '0 GRBS returns normal');

  // 11. Alias Matching — the exact bug this rebuild fixes
  console.log('\n--- Test Suite 11: Alias Matching ---');
  const dkaScaffold = CASE_SCAFFOLDS.find((s) => s.id === 'scaffold_dka')!;

  assert(
    normalizeOrderText('Normal saline 0.9% 500 mL bolus') === normalizeOrderText('normal saline 0.9% 500 ml bolus'),
    'normalizeOrderText is case-insensitive and punctuation-insensitive'
  );
  assert(
    findByAlias(dkaScaffold.investigationsMap, 'Serum ketones')?.key === 'serum_ketones',
    'findByAlias matches "Serum ketones" to the serum_ketones entry'
  );
  assert(
    findByAlias(dkaScaffold.investigationsMap, 'Urine ketones')?.key === 'urine_ketones',
    'findByAlias matches "Urine ketones" to the urine_ketones entry — a different key from serum ketones'
  );
  assert(
    findByAlias(dkaScaffold.investigationsMap, 'Serum ketones panel extended') === null,
    'Matching is exact-normalized equality, not substring — a near-miss order name matches nothing'
  );

  let ketonesSession = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_dka', mode: 'standard' });
  ketonesSession = processTurnOffline(ketonesSession, 'order: Serum ketones, Urine ketones');
  const serumOrd = ketonesSession.pendingOrders.find((o) => o.orderName === 'Serum ketones');
  const urineOrd = ketonesSession.pendingOrders.find((o) => o.orderName === 'Urine ketones');
  assert(!!serumOrd && !!urineOrd, 'Serum ketones and Urine ketones are placed as two separate orders');
  assert(
    !!serumOrd && !!urineOrd && serumOrd.resultText !== urineOrd.resultText,
    'PINNED: "Serum ketones" and "Urine ketones" return DIFFERENT results'
  );
  assert(
    /beta-hydroxybutyrate/i.test(serumOrd?.resultText || ''),
    'Serum ketones result quantifies beta-hydroxybutyrate'
  );
  assert(
    !/beta-hydroxybutyrate/i.test(urineOrd?.resultText || ''),
    'Urine ketones result does not claim to quantify beta-hydroxybutyrate'
  );

  // An order the scaffold does not model must never invent a clinical result.
  let unmodeledSession = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_dka', mode: 'standard' });
  unmodeledSession = processTurnOffline(unmodeledSession, 'order: Colonoscopy');
  const unmodeledOrd = unmodeledSession.pendingOrders[0];
  assert(
    !!unmodeledOrd && unmodeledOrd.resultText === 'Not modelled in this case.',
    'An unmodelled order is honestly reported as such, never given a fabricated result'
  );

  // 12. Therapy Model — treating the patient changes the patient
  console.log('\n--- Test Suite 12: Therapy Model ---');

  // An indicated therapy is acknowledged, and once its onset elapses it moves
  // vitals toward normal and changes what a REPEATED investigation returns.
  let dkaTx = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_dka', mode: 'standard' });
  const grbsBefore = dkaTx.patient.currentVitals.grbs;
  dkaTx = processTurnOffline(dkaTx, 'order: Normal saline 0.9% 500 mL bolus');
  dkaTx = processTurnOffline(dkaTx, 'order: Insulin infusion');
  const insulinEntry = dkaTx.therapyLog.find((t) => t.key === 'insulin');
  assert(!!insulinEntry && insulinEntry.appropriateness === 'indicated', 'Insulin given after fluids is graded indicated');
  dkaTx = processTurnOffline(dkaTx, 'advance 65 minutes');
  assert(
    dkaTx.patient.currentVitals.grbs < grbsBefore,
    'An indicated therapy (insulin, correctly sequenced after fluids) visibly lowers GRBS once its onset elapses'
  );
  dkaTx = processTurnOffline(dkaTx, 'order: ABG');
  const repeatAbg = dkaTx.pendingOrders.find((o) => o.orderName === 'ABG');
  assert(
    !!repeatAbg && /improving/i.test(repeatAbg.resultText),
    'A REPEATED investigation after indicated treatment returns a changed (improving) result via labShift'
  );

  // Sequence matters: insulin before fluids in DKA is the canonical harmful case.
  let dkaHarmfulSeq = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_dka', mode: 'standard' });
  dkaHarmfulSeq = processTurnOffline(dkaHarmfulSeq, 'order: Insulin infusion');
  const earlyInsulinEntry = dkaHarmfulSeq.therapyLog.find((t) => t.key === 'insulin');
  assert(
    !!earlyInsulinEntry && earlyInsulinEntry.appropriateness === 'harmful',
    'Insulin given BEFORE fluids in DKA is graded harmful — sequence matters'
  );
  assert(
    !dkaHarmfulSeq.turns.some((t) => /hypokalemia|arrhythmia/i.test(t.whatHappened || '')),
    'The harmful-sequence rationale is never leaked into the case narrative during play'
  );
  const dkaEnded = processTurnOffline(dkaHarmfulSeq, 'end case');
  const dkaCard = dkaEnded.scorecard!;
  assert(
    dkaCard.therapiesGiven.some((t) => t.appropriateness === 'harmful' && /hypokalemia/i.test(t.rationale)),
    'The rationale for a harmful therapy is surfaced in the scorecard AFTERWARDS'
  );

  // A harmful therapy is acted on and the patient responds — never a no-op.
  let stemiHarmful = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, { scaffoldId: 'scaffold_stemi', mode: 'standard' });
  const hrBeforeMetoprolol = stemiHarmful.patient.currentVitals.hr;
  stemiHarmful = processTurnOffline(stemiHarmful, 'order: Metoprolol IV');
  stemiHarmful = processTurnOffline(stemiHarmful, 'advance 15 minutes');
  const metoprololEntry = stemiHarmful.therapyLog.find((t) => t.key === 'metoprolol');
  assert(!!metoprololEntry && metoprololEntry.appropriateness === 'harmful', 'Metoprolol is graded harmful in this STEMI scaffold (heart-failure signs present)');
  assert(
    stemiHarmful.patient.currentVitals.hr !== hrBeforeMetoprolol,
    'A harmful therapy is acted on and the patient responds accordingly — not a no-op'
  );

  // 13. Order Sheet Filtering — the sheet stops lying
  console.log('\n--- Test Suite 13: Order Sheet Filtering ---');
  const totalSheetItems = ORDER_GROUPS.reduce((n, g) => n + g.sections.reduce((m, s) => m + s.items.length, 0), 0);
  const dkaGroups = getOrderableGroupsForScaffold(dkaScaffold);
  const dkaSheetItems = dkaGroups.reduce((n, g) => n + g.sections.reduce((m, s) => m + s.items.length, 0), 0);
  assert(dkaSheetItems < totalSheetItems, 'The order sheet is filtered down to what the DKA case actually models');
  const dkaFlatItems = new Set(dkaGroups.flatMap((g) => g.sections.flatMap((s) => s.items)));
  assert(dkaFlatItems.has('Serum ketones') && dkaFlatItems.has('Urine ketones'), 'Both ketone orders remain distinct entries on the filtered sheet');
  assert(!dkaFlatItems.has('Magnesium sulfate (Pritchard regimen)'), 'A drug this case does not model (eclampsia-only) is not offered on the DKA sheet');
  assert(getOrderableGroupsForScaffold(undefined).length === ORDER_GROUPS.length, 'With no scaffold (question-led case), the full catalogue is shown');

  // 14. Every case is modelled to the same standard.
  //
  // These run over the WHOLE library rather than one hand-picked case, because the failure this
  // project actually shipped was not a broken case — it was twelve cases nobody had checked, where
  // 96% of orders were inert and no therapy was modelled anywhere. A per-case spot check would not
  // have caught that. These would have.
  console.log('\n--- Test Suite 14: Library-wide case invariants ---');

  const sheetItemsNormalized = new Set(
    ORDER_GROUPS.flatMap((g) => g.sections.flatMap((s) => s.items)).map(normalizeOrderText)
  );

  const seenIds = new Set<string>();
  const seenConditions = new Set<string>();

  for (const sc of CASE_SCAFFOLDS) {
    const where = sc.id;

    assert(!seenIds.has(sc.id), `${where}: id is unique across the library`);
    seenIds.add(sc.id);
    assert(!seenConditions.has(sc.conditionName), `${where}: conditionName is unique across the library`);
    seenConditions.add(sc.conditionName);

    const investigationKeys = Object.keys(sc.investigationsMap);
    const therapyKeys = Object.keys(sc.therapiesMap);

    // A case with no therapies is the exact defect CASE_MODEL.md was written to end.
    assert(therapyKeys.length >= 3, `${where}: models at least three therapies (has ${therapyKeys.length})`);
    assert(investigationKeys.length >= 6, `${where}: models at least six investigations (has ${investigationKeys.length})`);
    assert(
      therapyKeys.some((k) => sc.therapiesMap[k].appropriateness === 'indicated'),
      `${where}: at least one therapy is actually the right thing to do`
    );

    // The opening vignette must not hand the candidate the diagnosis. Same word-boundary rule the
    // gate check uses, applied to the text the candidate reads first.
    const condTerms = sc.conditionName
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 3 && !STOPWORDS.has(w));
    for (const term of condTerms) {
      assert(
        !new RegExp(`\\b${term}\\b`).test(sc.openingVignette.toLowerCase()),
        `${where}: opening vignette does not name the diagnosis ("${term}")`
      );
    }

    // One order name must never resolve to two different things. The engine looks up
    // investigations and therapies separately, so a duplicate alias across the two maps is a
    // genuine ambiguity, not a harmless repetition.
    const aliasOwner = new Map<string, string>();
    const claim = (alias: string, owner: string) => {
      const norm = normalizeOrderText(alias);
      assert(norm.length > 0, `${where}: ${owner} has an empty alias`);
      const prior = aliasOwner.get(norm);
      assert(
        prior === undefined,
        prior === owner
          ? `${where}: ${owner} lists "${alias}" twice (it normalizes to an alias it already has)`
          : `${where}: alias "${alias}" is claimed by both ${prior} and ${owner}`
      );
      aliasOwner.set(norm, owner);
    };
    for (const [k, entry] of Object.entries(sc.investigationsMap)) {
      assert(entry.aliases.length > 0, `${where}: investigation "${k}" has at least one alias`);
      for (const a of entry.aliases) claim(a, `investigation:${k}`);
    }
    for (const [k, entry] of Object.entries(sc.therapiesMap)) {
      assert(entry.aliases.length > 0, `${where}: therapy "${k}" has at least one alias`);
      for (const a of entry.aliases) claim(a, `therapy:${k}`);
    }

    // Every therapy must be reachable by TAPPING, not only by typing free text. A therapy whose
    // aliases match nothing on the catalogue is invisible on the filtered order sheet.
    for (const [k, entry] of Object.entries(sc.therapiesMap)) {
      assert(
        entry.aliases.some((a) => sheetItemsNormalized.has(normalizeOrderText(a))),
        `${where}: therapy "${k}" is offered on the order sheet (no alias matches the catalogue)`
      );
    }

    // Dangling references. Both of these fail silently at runtime rather than throwing, which is
    // why they are worth pinning: a typo'd key simply means the effect never happens.
    for (const [k, entry] of Object.entries(sc.therapiesMap)) {
      for (const req of entry.requiresFirst || []) {
        assert(
          Object.prototype.hasOwnProperty.call(sc.therapiesMap, req),
          `${where}: therapy "${k}" requiresFirst "${req}", which exists in this case`
        );
        assert(req !== k, `${where}: therapy "${k}" does not require itself`);
      }
      for (const shifted of Object.keys(entry.labShift || {})) {
        assert(
          Object.prototype.hasOwnProperty.call(sc.investigationsMap, shifted),
          `${where}: therapy "${k}" shifts investigation "${shifted}", which exists in this case`
        );
      }
      // A harmful call the candidate is never told about teaches nothing.
      if (entry.appropriateness === 'harmful') {
        assert(entry.rationale.trim().length > 20, `${where}: harmful therapy "${k}" explains why`);
      }
      if (entry.requiresFirst?.length) {
        assert(
          (entry.harmfulSequenceRationale || '').trim().length > 20,
          `${where}: sequence-dependent therapy "${k}" explains why order matters`
        );
      }
    }

    // A milestone whose pattern matches nothing this case models can never be satisfied — the
    // candidate is marked down for missing something they were never able to order.
    assert(sc.criticalInterventions.length > 0, `${where}: has at least one timed critical intervention`);
    for (const ci of sc.criticalInterventions) {
      const reachable = Object.values(sc.therapiesMap).some((t) =>
        t.aliases.some((a) => ci.orderOrActionPattern.test(a))
      );
      assert(reachable, `${where}: critical intervention "${ci.name}" is achievable with a therapy this case models`);
      assert(ci.targetMilestoneMinutes > 0, `${where}: "${ci.name}" has a positive time target`);
    }

    assert(sc.incidentalPool.length >= 2, `${where}: carries at least two incidental findings`);
    assert(sc.gateMilestones.length >= 3, `${where}: carries at least three decision gates`);

    // A case where every test is worth ordering does not teach a candidate when NOT to
    // order one, and ordering everything would score perfectly. Each case must therefore
    // carry at least one investigation that does not earn its place.
    const invEntries = Object.entries(sc.investigationsMap);
    const nonIndicated = invEntries.filter(([, e]) => investigationGrade(e) !== 'indicated');
    assert(
      nonIndicated.length >= 1,
      `${where}: carries at least one low-yield investigation (has ${nonIndicated.length})`
    );

    for (const [k, entry] of invEntries) {
      const grade = investigationGrade(entry);

      // A test graded 'harmful' claims ordering it costs the patient something. That claim
      // has to be stated, or the candidate is penalised without ever being told why.
      if (grade === 'harmful') {
        assert(
          !!entry.yieldNote && entry.yieldNote.trim().length > 0,
          `${where}: harmful investigation "${k}" explains the harm in yieldNote`
        );
      }

      // yieldNote is shown DURING the case, so it is held to the same rule as the vignette
      // and the gates: it may say why this test does not help, never what the answer is.
      if (entry.yieldNote) {
        for (const term of condTerms) {
          assert(
            !new RegExp(`\\b${term}\\b`).test(entry.yieldNote.toLowerCase()),
            `${where}: yieldNote for "${k}" does not name the diagnosis ("${term}")`
          );
        }
      }
    }

    // The sheet must be filtered, and must not be filtered down to nothing.
    const groups = getOrderableGroupsForScaffold(sc);
    const itemCount = groups.reduce((n, g) => n + g.sections.reduce((m, s) => m + s.items.length, 0), 0);
    assert(itemCount > 0, `${where}: the filtered order sheet offers something`);
    assert(itemCount < totalSheetItems, `${where}: the filtered order sheet is narrower than the full catalogue`);
  }

  assert(CASE_SCAFFOLDS.length >= 12, `The library carries at least twelve cases (has ${CASE_SCAFFOLDS.length})`);

  // Subject spread: a library that is 100% Medicine is not exam-representative.
  const subjects = new Set(CASE_SCAFFOLDS.map((s) => s.subject));
  assert(subjects.size >= 4, `Cases span at least four subjects (spans ${subjects.size}: ${[...subjects].join(', ')})`);

  // ---------------------------------------------------------------------------
  // Test Suite 15: Playability — can the case actually be PLAYED?
  //
  // Suite 14 proves a case is well FORMED. It does not prove it is winnable.
  // A full DKA playthrough found that typing "normal saline 1 L bolus" — the
  // first-line treatment — matched no alias, so it was never given, the
  // sequence gate for insulin never opened, insulin was graded harmful, and
  // the glucose never moved. The case was structurally perfect and unwinnable.
  //
  // These assertions drive the real engine the way a candidate drives it.
  // ---------------------------------------------------------------------------
  console.log('\n--- Test Suite 15: Playability ---');

  for (const sc of CASE_SCAFFOLDS) {
    const where = sc.id;

    // Every therapy must be reachable by ITS OWN aliases through the real
    // order path. This is the check that would have caught the DKA fluid bug:
    // an alias that resolves to nothing means the treatment cannot be given.
    for (const [key, entry] of Object.entries(sc.therapiesMap)) {
      for (const alias of entry.aliases) {
        const match = findByAlias(sc.therapiesMap, alias);
        assert(
          !!match && match.key === key,
          `${where}: therapy "${key}" is reachable by its own alias "${alias}"` +
            (match ? ` (resolved to "${match.key}" instead)` : ' (resolved to nothing)')
        );
      }
    }

    // Same for investigations — a result you cannot order is a result that
    // does not exist.
    for (const [key, entry] of Object.entries(sc.investigationsMap)) {
      for (const alias of entry.aliases) {
        const match = findByAlias(sc.investigationsMap, alias);
        assert(
          !!match && match.key === key,
          `${where}: investigation "${key}" is reachable by its own alias "${alias}"`
        );
      }
    }

    // A sequence-dependent therapy is only teachable if its prerequisite can
    // actually be given first. If requiresFirst names a therapy that cannot be
    // reached, the safe path through the case does not exist and the candidate
    // is forced into the harmful branch — which is what happened in DKA.
    for (const [key, entry] of Object.entries(sc.therapiesMap)) {
      for (const req of entry.requiresFirst || []) {
        const prereq = sc.therapiesMap[req];
        assert(
          !!prereq && prereq.aliases.length > 0,
          `${where}: prerequisite "${req}" of "${key}" is orderable, so the safe path exists`
        );
      }
    }

    // The case must be winnable: at least one indicated therapy must have no
    // unmet prerequisite, or there is no legal first move.
    const therapyEntries = Object.entries(sc.therapiesMap);
    const openingMoves = therapyEntries.filter(
      ([, e]) => e.appropriateness === 'indicated' && (e.requiresFirst || []).length === 0
    );
    assert(
      openingMoves.length > 0,
      `${where}: has at least one indicated therapy with no prerequisite (a legal opening move)`
    );

    // requiresFirst must not form a cycle — two therapies each demanding the
    // other can never both be satisfied, and the case would be unplayable.
    const seen = new Map<string, number>();
    const visit = (k: string, stack: string[]): boolean => {
      if (stack.includes(k)) return false;
      if (seen.get(k) === 1) return true;
      seen.set(k, 1);
      for (const r of sc.therapiesMap[k]?.requiresFirst || []) {
        if (!visit(r, [...stack, k])) return false;
      }
      return true;
    };
    for (const [key] of therapyEntries) {
      assert(visit(key, []), `${where}: therapy "${key}" has no circular requiresFirst chain`);
    }
  }

  console.log(`\n🎉 Verification Suite Complete: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
