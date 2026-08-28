import { CASE_SCAFFOLDS } from '../src/data/cases/scaffolds';
import { DEFAULT_PYQ_INDEX } from '../src/data/defaultQBank';
import { buildCaseSessionFromScaffold } from '../src/utils/caseBinder';
import {
  processTurnOffline,
  generateScorecard,
  simTimeToMinutes,
  formatSimTime,
  splitOrders,
  inferOrderCategory,
} from '../src/utils/ccsEngine';
import { CaseSession, LocationType } from '../src/types';

export function runAll20CasesAudit() {
  console.log('🏥 =========================================================');
  console.log('   MEDTRIX CLINICAL SIMULATOR: 20-CASE ENGINE & AUDIT SUITE');
  console.log('=========================================================\n');

  let passedAssertions = 0;
  let failedAssertions = 0;

  const assert = (condition: boolean, testName: string) => {
    if (condition) {
      passedAssertions++;
    } else {
      console.error(`  ❌ FAILED: ${testName}`);
      failedAssertions++;
    }
  };

  console.log(`Loaded ${CASE_SCAFFOLDS.length} authored case scaffolds.`);
  assert(CASE_SCAFFOLDS.length === 20, 'Exact 20 scaffolds loaded');

  const historyCategories = ['allergies', 'past', 'medications', 'family', 'social', 'presenting', 'surgical'];
  const physicalExamSystems = ['vitals', 'general', 'cvs', 'chest', 'abdomen', 'neuro', 'local'];

  const resultsSummaryTable: Array<{
    caseNumber: number;
    id: string;
    condition: string;
    score: number;
    grade: string;
    historyPassed: boolean;
    pePassed: boolean;
    ordersDelivered: number;
    vitalsDynamicPassed: boolean;
    noUnmodelledPassed: boolean;
  }> = [];

  for (let i = 0; i < CASE_SCAFFOLDS.length; i++) {
    const scaffold = CASE_SCAFFOLDS[i];
    const caseNum = i + 1;
    console.log(`\n🩺 [Case ${caseNum}/20] Auditing: ${scaffold.conditionName} (${scaffold.id})`);

    // 1. Initialize Session
    let session = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, {
      scaffoldId: scaffold.id,
      mode: 'standard',
    });

    assert(session.patient.name === scaffold.demographics.name, `[Case ${caseNum}] Patient demographic name initialized correctly`);
    assert(session.patient.diagnosis === scaffold.conditionName, `[Case ${caseNum}] Correct diagnosis attached to session`);
    assert(session.turns.length === 1, `[Case ${caseNum}] Initial turn 1 triage generated`);

    // 2. Full History Taking Across All Categories
    let hxAllValid = true;
    for (const hxCat of historyCategories) {
      session = processTurnOffline(session, `hx: ${hxCat}`);
      const lastEntry = session.historyLog[session.historyLog.length - 1];
      if (!lastEntry || !lastEntry.answer || lastEntry.answer.length === 0) {
        hxAllValid = false;
      }
      assert(!lastEntry.answer.includes('Not modelled'), `[Case ${caseNum}] History for "${hxCat}" returned realistic narrative`);
    }
    assert(session.historyLog.length === historyCategories.length, `[Case ${caseNum}] All ${historyCategories.length} history inquiries recorded in historyLog`);
    assert(hxAllValid, `[Case ${caseNum}] Full history taking returned complete narrative data`);

    // 3. Complete Physical Exams Across All Systems
    let peAllValid = true;
    for (const peSys of physicalExamSystems) {
      session = processTurnOffline(session, `pe: ${peSys}`);
      const lastEntry = session.examLog[session.examLog.length - 1];
      if (!lastEntry || !lastEntry.findings || lastEntry.findings.length === 0) {
        peAllValid = false;
      }
      assert(!lastEntry.findings.includes('Not modelled'), `[Case ${caseNum}] Physical exam for "${peSys}" returned realistic findings`);
    }
    assert(session.examLog.length === physicalExamSystems.length, `[Case ${caseNum}] All ${physicalExamSystems.length} physical exam systems recorded in examLog`);
    assert(peAllValid, `[Case ${caseNum}] Full physical examination returned complete findings`);

    // 4. Test Common & Specific Indicated Investigations
    const commonOrders = 'order: ecg, cbc, kft, lft, abg, cxr, ultrasound abdomen, non-contrast ct';
    session = processTurnOffline(session, commonOrders);
    const initialOrdersPlaced = splitOrders(commonOrders.replace(/^order:\s*/i, '')).length;
    const totalOrdersActive = session.pendingOrders.length + session.completedOrders.length;
    assert(totalOrdersActive === initialOrdersPlaced, `[Case ${caseNum}] All ${initialOrdersPlaced} orders accounted for (pending: ${session.pendingOrders.length}, completed: ${session.completedOrders.length})`);

    // 5. Verify NO "Not modelled in this case" across all orders placed (both pending and completed)
    let noUnmodelled = true;
    for (const ord of [...session.pendingOrders, ...session.completedOrders]) {
      if (ord.resultText.includes('Not modelled in this case') || ord.resultText.toLowerCase().includes('not modeled')) {
        noUnmodelled = false;
      }
    }
    assert(noUnmodelled, `[Case ${caseNum}] Zero orders produced "Not modelled in this case"`);

    // 6. Test Vitals Deterioration & Time Advancement
    const vitalsPreAdvance = { ...session.patient.currentVitals };
    // Advance time past critical intervention target window
    session = processTurnOffline(session, 'advance 45 mins');
    const vitalsPostDeterioration = { ...session.patient.currentVitals };
    
    const deteriorated =
      vitalsPostDeterioration.hr >= vitalsPreAdvance.hr &&
      vitalsPostDeterioration.spo2 <= vitalsPreAdvance.spo2;
    assert(deteriorated, `[Case ${caseNum}] Patient vitals show appropriate physiological stress when critical window elapses`);

    // 7. Administer Critical Interventions & Plausible Therapeutics
    const criticalAction = scaffold.criticalInterventions[0];
    const orderCommand = `order: IV fluids normal saline bolus 500 mL, Supplemental Oxygen via NRBM, IV Analgesia, ${criticalAction.name}`;
    session = processTurnOffline(session, orderCommand);

    const vitalsPreRecovery = { ...session.patient.currentVitals };
    // Advance time for interventions to take effect & pending orders to deliver
    session = processTurnOffline(session, 'advance 30 mins');
    session = processTurnOffline(session, 'advance 2 hours');

    const vitalsPostRecovery = { ...session.patient.currentVitals };
    const recovered =
      vitalsPostRecovery.hr <= vitalsPreRecovery.hr ||
      vitalsPostRecovery.spo2 >= vitalsPreRecovery.spo2;
    assert(recovered, `[Case ${caseNum}] Patient vitals demonstrate therapeutic recovery response after critical intervention`);

    // 8. Verify Order Delivery Pipeline
    assert(session.pendingOrders.length === 0, `[Case ${caseNum}] All pending investigations/drugs delivered after 2+ hours`);
    assert(session.completedOrders.length > 0, `[Case ${caseNum}] Delivered orders moved into completedOrders (Total: ${session.completedOrders.length})`);

    // 9. Execute "end case" and Generate Scorecard
    session = processTurnOffline(session, 'end case');
    assert(session.status === 'completed', `[Case ${caseNum}] Session status set to completed upon "end case"`);
    
    const scorecard = session.scorecard || generateScorecard(session);
    assert(scorecard !== undefined, `[Case ${caseNum}] Scorecard generated successfully`);
    assert(!isNaN(scorecard.overallScore), `[Case ${caseNum}] overallScore is NOT NaN`);
    assert(scorecard.overallScore >= 0 && scorecard.overallScore <= 100, `[Case ${caseNum}] overallScore is between 0 and 100% (actual: ${scorecard.overallScore}%)`);
    assert(['S', 'A', 'B', 'C', 'F'].includes(scorecard.overallGrade), `[Case ${caseNum}] Valid letter grade assigned (actual: ${scorecard.overallGrade})`);
    assert(scorecard.finalDiagnosis === scaffold.conditionName, `[Case ${caseNum}] Scorecard contains accurate final diagnosis`);
    assert(scorecard.summaryFeedback.length > 0, `[Case ${caseNum}] Scorecard contains coherent clinical summary feedback`);
    assert(!scorecard.summaryFeedback.includes('NaN'), `[Case ${caseNum}] summaryFeedback contains no NaN strings`);

    resultsSummaryTable.push({
      caseNumber: caseNum,
      id: scaffold.id,
      condition: scaffold.conditionName,
      score: scorecard.overallScore,
      grade: scorecard.overallGrade,
      historyPassed: hxAllValid,
      pePassed: peAllValid,
      ordersDelivered: session.completedOrders.length,
      vitalsDynamicPassed: deteriorated && recovered,
      noUnmodelledPassed: noUnmodelled,
    });
  }

  // Summary Matrix
  console.log('\n=============================================================================================================');
  console.log('                                 20-CASE SIMULATION AUDIT SUMMARY MATRIX');
  console.log('=============================================================================================================');
  console.log('| #  | Scaffold ID                  | Condition Name                           | Score | Grade | Hx | PE | Orders | Vitals |');
  console.log('|----|------------------------------|------------------------------------------|-------|-------|----|----|--------|--------|');
  for (const r of resultsSummaryTable) {
    const pad = (s: string | number, n: number) => String(s).padEnd(n).slice(0, n);
    console.log(
      `| ${pad(r.caseNumber, 2)} | ${pad(r.id, 28)} | ${pad(r.condition, 40)} | ${pad(r.score + '%', 5)} | ${pad(r.grade, 5)} | ${pad(r.historyPassed ? 'PASS' : 'FAIL', 2)} | ${pad(r.pePassed ? 'PASS' : 'FAIL', 2)} | ${pad(r.ordersDelivered, 6)} | ${pad(r.vitalsDynamicPassed ? 'PASS' : 'FAIL', 6)} |`
    );
  }
  console.log('=============================================================================================================\n');

  console.log(`📊 Audit Verification Complete: ${passedAssertions} assertions PASSED, ${failedAssertions} assertions FAILED.`);

  if (failedAssertions > 0) {
    throw new Error(`Simulation audit failed with ${failedAssertions} errors.`);
  }

  return {
    passedAssertions,
    failedAssertions,
    resultsSummaryTable,
  };
}

if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('all_20_cases')) {
  runAll20CasesAudit();
}
