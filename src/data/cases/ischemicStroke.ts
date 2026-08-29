import { CaseScaffold } from '../../types';

/**
 * A large-vessel-territory brain infarct presenting within the thrombolysis
 * window.
 *
 * The teaching point this case is built around is sequence, not diagnosis:
 * a non-contrast CT head to exclude bleeding must happen before any
 * reperfusion therapy, a strict blood-pressure ceiling must be met (and not
 * overshot) before the thrombolytic is given, and an antiplatelet is
 * deliberately withheld for the first 24 hours afterwards rather than given
 * alongside it. `ct_head_noncontrast` is modelled in `therapiesMap` — not
 * `investigationsMap` — specifically so that ordering it populates the
 * candidate's therapy log and can be named in `thrombolysis_iv` and
 * `thrombectomy`'s `requiresFirst`, which only checks administered
 * therapies (see CASE_MODEL.md / ccsEngine.resolveOrder). It still reports
 * a normal imaging turnaround-style result.
 *
 * "Ischaemic" and "stroke" are this case's forbidden gate words (see
 * CASE_MODEL.md / the gate-word check): the openingVignette and every
 * gateMilestones.patientContext below are written to describe the deficit
 * and the clock, never the diagnosis itself.
 *
 * See src/data/cases/pph.ts for the structural exemplar and CASE_MODEL.md
 * for the binding design spec this file follows.
 */
export const SCAFFOLD_ISCHEMIC_STROKE: CaseScaffold = {
  id: 'scaffold_ischemic_stroke',
  title: 'Sudden Weakness and Slurred Speech',
  conditionName: 'Acute Ischaemic Stroke',
  subject: 'Medicine',
  system: 'Neurology',
  demographics: {
    name: 'Suresh Iyer',
    age: 68,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 68-year-old man is brought to the emergency department by his wife forty minutes after she found him with a droop on the right side of his face, unable to move his right arm and leg, and slurring his words when he tried to answer her — she had been speaking normally with him about twenty minutes before that. He has a history of hypertension and type 2 diabetes and smokes ten cigarettes a day. There is no history of head injury, seizure activity, or recent surgery.',
  initialVitals: {
    hr: 88,
    bp: '198/112',
    rr: 18,
    spo2: 97,
    temp: '37.0°C',
    grbs: 118,
  },
  clinchingClue:
    'Focused neurological exam shows a dense right facial droop sparing the forehead, right arm and leg power 1/5, and non-fluent slurred speech, all localising to one vascular territory — with a normal bedside glucose already excluding the one common mimic that looks just like this.',
  clinchingClueTimeMinutes: 10,
  examFindingsMap: {
    general: 'Alert, oriented, anxious. No fever. No neck stiffness.',
    cvs: 'Irregularly irregular pulse, rate 88/min. S1 S2 heard, no murmurs. No carotid bruits.',
    chest: 'Clear bilaterally, no crepitations, no wheeze.',
    abdomen: 'Soft, non-tender, no organomegaly.',
    cns: 'GCS 15/15. Right upper motor neuron facial droop (forehead spared). Right arm power 1/5, right leg power 1/5. Left side power 5/5 throughout. Non-fluent, slurred but comprehensible speech. Plantar upgoing on the right, downgoing on the left. No neck stiffness, no papilloedema on fundoscopy.',
  },
  historyMap: {
    onset: 'Last seen completely normal and speaking clearly with his wife roughly one hour ago; the deficit was noticed abruptly, not on waking, so the exact onset time is well defined.',
    past: 'Hypertension for 12 years, poorly controlled by his own account. Type 2 diabetes for 6 years on oral agents. No prior similar episode. No known bleeding disorder, no recent surgery, trauma or major bleed in the last 3 months, no history of intracranial haemorrhage.',
    medications: 'Amlodipine and metformin, taken irregularly. Not on aspirin, clopidogrel or any anticoagulant.',
    allergies: 'No known drug allergies.',
    family: 'Father died of a heart attack in his sixties. No family history of a bleeding or clotting disorder.',
    social: 'Smokes about ten cigarettes a day for over 20 years. Drinks alcohol occasionally.',
  },
  investigationsMap: {
    capillary_glucose: {
      aliases: ['rbs / grbs', 'grbs', 'capillary blood glucose'],
      resultText: 'Capillary (bedside) Glucose: 118 mg/dL (Reference 70–140 mg/dL) — normal, ruling out hypoglycaemia as the cause of the focal deficit.',
      turnaroundMinutes: 2,
      category: 'labs',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText: 'CBC: Hb 13.8 g/dL (Reference 13.0–17.0 g/dL), WBC 8,200/mcL (Reference 4,000–11,000/mcL), Platelets 245,000/mcL (Reference 150,000–450,000/mcL) — normal, no thrombocytopenia to contraindicate thrombolysis.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    coag_profile: {
      aliases: ['pt / inr', 'coagulation profile'],
      resultText: 'PT/INR: PT 12.8 sec (Reference 11–13.5 sec), INR 1.0 (Reference 0.8–1.1) — normal; he is not on warfarin or any agent that would push the INR above the safe threshold for thrombolysis.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    aptt: {
      aliases: ['aptt'],
      resultText: 'aPTT: 29 sec (Reference 25–35 sec) — normal; no evidence of heparin effect or an intrinsic pathway coagulopathy.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText: 'Serum Electrolytes: Na 138 mEq/L (Reference 135–145 mEq/L), K 4.1 mEq/L (Reference 3.5–5.0 mEq/L), Cl 101 mEq/L (Reference 98–107 mEq/L) — normal, no metabolic derangement mimicking or worsening the deficit.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText: 'Renal Function: Blood Urea 32 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.0 mg/dL (Reference 0.6–1.3 mg/dL) — normal, adequate for standard drug dosing.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    ecg: {
      aliases: ['12-lead ecg', 'ecg'],
      resultText: '12-Lead ECG: Irregularly irregular rhythm with absent P waves, rate 84–92/min, consistent with atrial fibrillation — a likely embolic source for the event. No ST elevation.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    echo: {
      aliases: ['formal 2d echo', '2d echo'],
      resultText: '2D ECHO: Mild left atrial enlargement, no intracardiac thrombus visualised, ejection fraction 55%, no valvular vegetation — supports a cardioembolic source needing long-term anticoagulation once the acute bleeding-risk window has passed.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: true,
    },
    mr_angiography: {
      aliases: ['mr angiography', 'mra brain'],
      resultText: 'MR Angiography: Occlusion of the M1 segment of the left middle cerebral artery, consistent with a large-vessel occlusion — relevant to clot-retrieval eligibility in addition to any drug already given.',
      turnaroundMinutes: 45,
      category: 'imaging',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture', 'blood culture x2'],
      resultText: 'Blood Culture: No growth after 48 hours. There was no fever or clinical suspicion of infection to justify this at the time it was sent.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'A bacterial culture has no role in this presentation and delays the clock that actually matters.',
    },
  },
  therapiesMap: {
    ct_head_noncontrast: {
      aliases: ['ct head plain', 'non-contrast ct head'],
      responseText: 'Urgent non-contrast CT head performed and reported: no haemorrhage, no established large territorial infarct, no mass effect — imaging supports proceeding to reperfusion therapy if otherwise eligible.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'A non-contrast CT head is the single mandatory step before any reperfusion therapy — it takes only minutes on a modern scanner and is the only way to exclude bleeding, which looks clinically identical to a clot at the bedside but is treated in the opposite way.',
    },
    bp_control_labetalol: {
      aliases: ['labetalol iv'],
      responseText: 'Labetalol 10–20 mg given intravenously; blood pressure eases gradually toward the safe range required before thrombolysis.',
      onsetMinutes: 10,
      vitalsEffect: { bp: '178/98', hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Thrombolysis requires blood pressure below 185/110 mmHg beforehand, because higher pressures sharply raise the risk of bleeding into the treated territory. A titratable short-acting agent brings it under that ceiling in a controlled, predictable way without dropping it further than needed.',
    },
    thrombolysis_iv: {
      aliases: ['tenecteplase (thrombolysis)', 'alteplase (rtpa) iv'],
      responseText: 'Intravenous thrombolysis given within the safe window, non-contrast CT already excluding bleeding and blood pressure already controlled below the required ceiling. Over the next hour the right-sided weakness and slurring begin to improve.',
      onsetMinutes: 45,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      requiresFirst: ['ct_head_noncontrast'],
      harmfulSequenceResponseText: 'Intravenous thrombolysis is given before any brain imaging has been reviewed. Within the hour the weakness deepens further and his level of consciousness drops; a scan obtained only now shows extensive haemorrhage within the affected territory.',
      harmfulSequenceVitalsEffect: { hr: 22, bp: '210/118' },
      harmfulSequenceRationale: 'Thrombolysis is only appropriate for a clot, and is absolutely contraindicated if the cause is bleeding — the two look identical at the bedside and are told apart only by a non-contrast CT head. Giving it before that scan is reviewed can turn a treatable event into a fatal intracranial haemorrhage, and the few minutes imaging takes are never a reason to skip it.',
      rationale: 'Intravenous thrombolysis is indicated for a disabling focal deficit within the licensed time window once haemorrhage has been excluded on non-contrast CT, blood pressure is controlled below 185/110 mmHg, and there is no other contraindication (recent surgery, active bleeding, anticoagulation with a deranged INR, or a very low platelet count). Either agent is accepted here. Tenecteplase 0.25 mg/kg as a single bolus (maximum 25 mg) and alteplase 0.9 mg/kg as a bolus followed by an infusion now carry equal weight in the 2026 AHA/ASA guideline, and the European Stroke Organisation leans toward tenecteplase for the practical reason that one bolus is easier to give than an hour-long infusion. Be aware that much Indian teaching and many question banks still treat alteplase as the single textbook answer, so a paper may expect it even though current guidance no longer requires it.',
    },
    thrombectomy: {
      aliases: ['mechanical thrombectomy'],
      responseText: 'Endovascular clot retrieval performed for the confirmed large-vessel occlusion, given alongside the intravenous drug already administered rather than waiting to see if it works alone.',
      onsetMinutes: 60,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      requiresFirst: ['ct_head_noncontrast'],
      harmfulSequenceResponseText: 'Clot-retrieval is attempted before any imaging has excluded bleeding. The interventional team finds active haemorrhage rather than a clot to retrieve, and the procedure has to be abandoned with the patient now unstable.',
      harmfulSequenceVitalsEffect: { hr: 20, bp: '88/54' },
      harmfulSequenceRationale: 'Endovascular therapy for a large-vessel occlusion depends on excluding haemorrhage exactly as much as the intravenous drug does — attempting clot retrieval on a bleeding brain does not merely fail, it actively worsens an intracranial bleed. Non-contrast CT head must precede any reperfusion therapy, mechanical or pharmacological.',
      rationale: 'Mechanical thrombectomy is indicated for a confirmed large-vessel occlusion within its own eligibility window (guided by vessel imaging, and by perfusion imaging for later presentations) and should be pursued as bridging therapy alongside intravenous thrombolysis, not held back to see if the drug works first.',
    },
    iv_access: {
      aliases: ['two wide-bore iv cannulae'],
      responseText: 'Two wide-bore IV cannulae secured for bloods, drug administration and fluids.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is needed immediately so that the time-critical steps — labs, the thrombolytic infusion, and any blood pressure agent — are never held up waiting for a line.',
    },
    neurology_consult: {
      aliases: ['neurology consult'],
      responseText: 'Neurology consult requested; the on-call team attends promptly to confirm eligibility and lead reperfusion decisions.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Early involvement of a clinician experienced in acute deficit scoring and reperfusion eligibility keeps the time-critical pathway moving without delay and ensures contraindications are checked systematically rather than missed under pressure.',
    },
    atorvastatin: {
      aliases: ['atorvastatin 80 mg'],
      responseText: 'Atorvastatin 80 mg started as secondary prevention.',
      onsetMinutes: 90,
      appropriateness: 'indicated',
      rationale: 'A high-intensity statin does nothing for the acute event itself but is standard secondary prevention started within the first day or two once the patient is stable, and is not a reason to delay anything time-critical.',
    },
    dvt_prophylaxis: {
      aliases: ['dvt prophylaxis'],
      responseText: 'Intermittent pneumatic compression started for immobility-related clot prevention.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Mechanical prophylaxis (intermittent pneumatic compression) is appropriate for an immobile patient in the immediate post-thrombolysis period; pharmacological anticoagulant prophylaxis is deliberately deferred while bleeding risk from the thrombolytic is still high.',
    },
    aspirin_immediate: {
      aliases: ['aspirin 325 mg chewed'],
      responseText: 'Aspirin 325 mg given by mouth immediately.',
      onsetMinutes: 10,
      vitalsEffect: { hr: 2 },
      appropriateness: 'harmful',
      rationale: 'He has just received (or is being worked up for) intravenous thrombolysis; aspirin must be withheld for 24 hours and only started once a follow-up CT confirms no haemorrhagic transformation. Adding an antiplatelet on top of a clot-dissolving drug, before that scan, raises the risk of bleeding into the treated territory at exactly the time it is highest.',
    },
    heparin_iv: {
      aliases: ['unfractionated heparin bolus'],
      responseText: 'An unfractionated heparin bolus is given intravenously.',
      onsetMinutes: 10,
      vitalsEffect: { hr: 4, bp: '190/108' },
      appropriateness: 'harmful',
      rationale: 'Routine early therapeutic anticoagulation has no proven benefit in this presentation and is not given in the acute phase, even for a likely cardioembolic source — the risk of converting an infarct into a haemorrhage is real and unjustified by any demonstrated benefit, and it is especially dangerous so soon after a thrombolytic.',
    },
    nifedipine_oral: {
      aliases: ['nifedipine oral'],
      responseText: 'Oral nifedipine given for the elevated blood pressure.',
      onsetMinutes: 15,
      vitalsEffect: { bp: '128/76', hr: 8 },
      appropriateness: 'harmful',
      rationale: 'Fast-acting oral or sublingual nifedipine produces a steep, unpredictable fall in blood pressure that is specifically avoided here — cerebral perfusion pressure across the affected territory can fall further than intended at exactly the moment it is most vulnerable. A titratable IV agent is used instead, aiming for a controlled reduction, not the lowest number reached fastest.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ct head/i,
      name: 'Door-to-CT Imaging',
      targetMilestoneMinutes: 25,
    },
    {
      orderOrActionPattern: /labetalol/i,
      name: 'Blood Pressure Control Before Thrombolysis',
      targetMilestoneMinutes: 45,
    },
    {
      orderOrActionPattern: /tenecteplase|thrombolysis/i,
      name: 'Door-to-Needle Thrombolysis',
      targetMilestoneMinutes: 60,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_stroke_1',
      title: 'Incidental Pineal Gland Cyst',
      description: 'The non-contrast CT head incidentally shows a 6mm simple pineal cyst with no calcification or mass effect.',
      correctAction: 'No intervention needed; a small, simple pineal cyst is a common incidental finding requiring no follow-up.',
      status: 'unnoticed',
    },
    {
      id: 'inc_stroke_2',
      title: 'Old Silent Inferior Wall Changes on ECG',
      description: 'The 12-lead ECG incidentally shows old Q waves in the inferior leads, unrelated to today\'s presentation, suggesting a prior silent event.',
      correctAction: 'Note in the record and arrange outpatient cardiology follow-up once the acute presentation is stabilised; no acute change in management today.',
      status: 'unnoticed',
    },
    {
      id: 'inc_stroke_3',
      title: 'Mildly Elevated Creatinine for Age',
      description: 'Renal function shows a creatinine at the upper end of normal, most likely reflecting long-standing hypertension and age rather than any acute process.',
      correctAction: 'Trend renal function over subsequent days; no acute intervention required and no reason to withhold time-critical treatment.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A 68-year-old man arrives by ambulance forty minutes after his wife found him with a drooping right side of his face, right arm and leg weakness, and slurred speech, having been speaking normally with her only twenty minutes earlier.',
      consequenceOnRight: 'Time-critical priorities run in parallel from the first minute: capillary glucose is checked at the bedside, the exact time he was last seen entirely normal is pinned down, and an urgent non-contrast CT head is ordered before anything else.',
      consequenceOnWrong: 'A leisurely full history and routine admission bloods are completed first, and every minute lost before imaging is tissue that cannot be recovered later.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'Before the treatment clock can be started, the resident must decide what to document as the true onset time — the moment his wife found him weak and slurred, or the last moment he was seen completely normal twenty minutes before that.',
      consequenceOnRight: 'Onset time is correctly documented as the last time he was seen entirely normal, not the time the deficit was first noticed — the same rule that makes someone who wakes up with a new deficit an unwitnessed, unknown-onset presentation needing an imaging-based approach rather than the clock starting at the moment they happened to wake.',
      consequenceOnWrong: 'The later time is used instead, wrongly widening how much of the safe window appears to remain and risking a drug being given outside the time it is actually safe.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'His blood pressure on repeat measurement is 198/112 mmHg, and the team must decide how to proceed before any reperfusion drug can be considered.',
      consequenceOnRight: 'A short-acting, titratable intravenous agent is used to bring the pressure gently below the safe ceiling required before the drug is given, and treatment proceeds once that target is reached without delaying anything else.',
      consequenceOnWrong: 'The pressure is either ignored, leaving the bleeding risk of the drug unaddressed, or dropped too fast and too far with a poorly controlled agent, and perfusion across the affected territory falls at exactly the moment it can least afford to.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'Intravenous thrombolysis has just been given, and the nursing staff ask whether an antiplatelet tablet should be started now alongside it or charted for later.',
      consequenceOnRight: 'The antiplatelet is correctly withheld for twenty-four hours, until a follow-up scan confirms no bleeding into the treated territory, and only then is it started.',
      consequenceOnWrong: 'It is given immediately alongside the thrombolytic, adding an antiplatelet effect on top of a clot-dissolving drug at the exact time bleeding risk is highest.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Vessel imaging shows a large-vessel occlusion, and the team must decide whether to wait and see if the intravenous drug alone is enough before referring for a catheter-based clot-retrieval procedure.',
      consequenceOnRight: 'The interventional team is contacted immediately so the clot-retrieval procedure can proceed without delay, alongside — not instead of — the intravenous drug already given, since the two are complementary rather than sequential alternatives.',
      consequenceOnWrong: 'Referral for the catheter-based procedure is delayed to see whether the intravenous drug works first, and the window this loses lowers the chance of the procedure still being of any use.',
    },
  ],
};
