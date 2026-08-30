import { CaseScaffold } from '../../types';

/**
 * Third hospital day, no alcohol on board, and the classic tetrad — coarse
 * tremor, autonomic hyperactivity, perceptual disturbance and disorientation
 * — arriving together. The exam findings and history are written so the
 * candidate must actively exclude the mimics (head injury, sepsis,
 * hypoglycaemia, a dangerous electrolyte derangement, hepatic
 * encephalopathy) rather than assume withdrawal outright, and the therapy
 * model carries a genuine sequence trap: thiamine must be on board before
 * any dextrose-containing fluid, or the glucose load can precipitate a
 * serious, largely irreversible brain injury. See CASE_MODEL.md for the
 * therapy model this scaffold follows (indicated / neutral / harmful,
 * requiresFirst sequencing).
 *
 * NOTE on `subject`: SubjectType in ../../types.ts has no 'Psychiatry'
 * literal yet, so this is filed under 'Medicine' (the closest valid value)
 * with `system: 'Psychiatry'` carrying the intended subject label. See the
 * FLAG in the authoring report — add 'Psychiatry' to SubjectType and switch
 * this if the library wants it filed there instead.
 */
export const SCAFFOLD_DELIRIUM_TREMENS: CaseScaffold = {
  id: 'scaffold_delirium_tremens',
  title: 'New Agitation, Tremor and Confusion on the Third Hospital Day',
  conditionName: 'Delirium Tremens',
  subject: 'Medicine',
  system: 'Psychiatry',
  demographics: {
    name: 'Ram Bahadur Thapa',
    age: 48,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 48-year-old man, admitted three days ago after surgical fixation of a fractured femur, has grown increasingly restless and shaky since yesterday evening. Overnight he became agitated, kept picking at his bedsheets, insisted insects were crawling on his arms, and did not know he was in a hospital. His hands show a coarse tremor and his gown is soaked with sweat. He has not had any alcohol since admission, and his family says he drinks daily.',
  initialVitals: {
    hr: 128,
    bp: '164/98',
    rr: 26,
    spo2: 96,
    temp: '38.3°C',
    grbs: 104,
  },
  clinchingClue:
    'On the third day without his usual daily drink, he has a coarse resting tremor, profuse diaphoresis, a pulse over 120, hypertension and low-grade fever, together with vivid tactile and visual hallucinations and disorientation to place and time — and this pattern persists after head injury, sepsis, hypoglycaemia and a dangerous electrolyte derangement have each been actively checked for and excluded, with a markedly elevated score on the bedside withdrawal severity scale.',
  clinchingClueTimeMinutes: 40,
  examFindingsMap: {
    general: 'Agitated, tremulous, profusely diaphoretic, picking at the bedsheets, gown soaked through; not febrile to touch but recorded temperature mildly elevated.',
    cvs: 'Tachycardic and regular, blood pressure elevated, peripheral pulses bounding, no murmurs.',
    chest: 'Tachypnoeic, air entry equal bilaterally, no crepitations, no wheeze.',
    abdomen: 'Soft, non-tender, mild hepatomegaly with a firm edge, no ascites, no guarding; surgical dressing over the fixed femur is clean and dry.',
    cns: 'Disoriented to time and place, oriented to person; describes insects crawling on the skin and voices from an empty corner of the room; coarse tremor of both outstretched hands; deep tendon reflexes brisk and symmetric; no neck stiffness; no focal motor or sensory deficit; pupils equal and reactive.',
  },
  historyMap: {
    presenting: 'Symptoms began roughly 60–72 hours after his last drink, which was the evening before this admission; he has had nothing alcoholic since, as an inpatient.',
    substanceUse: 'Reports drinking roughly 180–220 mL of spirits daily for more than 15 years. One prior hospitalisation two years ago for a witnessed generalised seizure on the second day of an attempted cutdown, per his son.',
    past: 'Admitted three days ago for open reduction and internal fixation of a closed femoral shaft fracture sustained in a fall; recovering surgically as expected until last evening. No known diabetes, no known liver disease diagnosis, no prior psychiatric diagnosis.',
    medications: 'Postoperative paracetamol and a short course of antibiotics; no home medications reported; no benzodiazepine or anticonvulsant on board since admission.',
    allergies: 'No known drug allergies.',
    family: 'Son at bedside confirms the daily drinking history and the prior seizure; no other family history volunteered.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText: 'CBC: Hb 13.6 g/dL (Reference 13.0–17.0 g/dL), MCV 104 fL (Reference 80–100 fL, mildly macrocytic), WBC 13,100/mcL (Reference 4,000–11,000/mcL, mild stress leukocytosis), Platelets 118,000/mcL (Reference 150,000–450,000/mcL, mildly low) — a pattern consistent with long-standing heavy alcohol use rather than acute infection.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'serum electrolytes', 'electrolytes'],
      resultText: 'Serum Electrolytes: Sodium 132 mEq/L (Reference 135–145 mEq/L, mildly low), Potassium 3.1 mEq/L (Reference 3.5–5.0 mEq/L, low), Chloride 96 mEq/L (Reference 98–107 mEq/L) — hypokalaemia present, relevant to both seizure and arrhythmia risk.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    serum_magnesium: {
      aliases: ['serum magnesium'],
      resultText: 'Serum Magnesium: 1.3 mg/dL (Reference 1.7–2.2 mg/dL) — low, as is typical with sustained heavy alcohol intake and poor intake.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft', 'liver function tests'],
      resultText: 'Liver Function Tests: AST 96 U/L, ALT 42 U/L (AST:ALT ratio > 2, Reference 10–40 U/L each), GGT elevated, Total Bilirubin 1.4 mg/dL (Reference 0.2–1.2 mg/dL), Albumin 3.4 g/dL — a pattern of alcohol-related liver injury without features of liver failure.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    serum_ammonia: {
      aliases: ['serum ammonia'],
      resultText: 'Serum Ammonia: 42 mcmol/L (Reference 15–45 mcmol/L) — within the normal range.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A serum ammonia level does not track reliably with how confused a patient is, and a normal or mildly raised value here neither confirms nor rules out a contribution from his liver — the assessment of his mental state has to stay clinical and cannot lean on this number.',
    },
    grbs_lab: {
      aliases: ['rbs / grbs', 'rbs', 'grbs', 'blood glucose', 'random blood sugar', 'rbs random blood sugar'],
      resultText: 'Laboratory Blood Glucose: 108 mg/dL (Reference 70–140 mg/dL) — normal, excluding hypoglycaemia as a cause of the confusion.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    ct_head: {
      aliases: ['ct head plain', 'ct head'],
      resultText: 'CT Head (plain): No acute haemorrhage, no mass lesion, no midline shift, no acute infarct. A tiny incidental arachnoid cyst is noted in the left middle cranial fossa, of no clinical significance.',
      turnaroundMinutes: 45,
      category: 'imaging',
      isIndicative: true,
    },
    abg: {
      aliases: ['abg', 'arterial blood gas'],
      resultText: 'Arterial Blood Gas: pH 7.47, pCO2 30 mmHg, pO2 88 mmHg, HCO3 21 mEq/L on room air — a mild respiratory alkalosis consistent with agitation and rapid breathing, no significant hypoxia.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture ×2 (before antibiotics)', 'blood culture', 'blood cultures', 'blood culture before antibiotics'],
      resultText: 'Blood Culture ×2: No organisms seen on Gram stain; no growth reported at 48 hours — no evidence of bloodstream infection driving the fever and tachycardia.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: true,
    },
    urine_routine: {
      aliases: ['urine routine & microscopy', 'urine routine', 'urine microscopy'],
      resultText: 'Urine Routine & Microscopy: No pus cells, no nitrites, no organisms seen — no evidence of a urinary source of infection.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    lumbar_puncture: {
      aliases: ['lumbar puncture'],
      resultText: 'Lumbar Puncture: Performed with difficulty in an agitated, only partly cooperative patient. Opening pressure, cell count, protein and glucose all normal — no evidence of central nervous system infection.',
      turnaroundMinutes: 60,
      category: 'procedures',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote: 'There is no neck stiffness, no meningeal sign and no fever pattern pointing to meningitis, and a mass lesion has not yet been excluded by imaging — attempting a spinal tap on an agitated, uncooperative patient before that risks a procedural complication for a test that is not indicated by anything found on exam so far.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'access', 'iv two wide bore cannulae', 'two wide bore cannulae'],
      responseText: 'Two wide-bore IV cannulae secured for fluids, thiamine and the sedative infusion.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is needed before thiamine, fluids or a benzodiazepine can be given, and should be one of the first things secured.',
    },
    thiamine: {
      aliases: ['thiamine iv', 'thiamine', 'vitamin b1', 'iv thiamine'],
      responseText: 'Thiamine 500 mg given intravenously.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Chronic heavy alcohol use depletes thiamine stores. Replacing thiamine before any glucose load is given protects the small remaining reserve from being consumed by glucose metabolism, which is what precipitates a severe, largely irreversible brain injury in a thiamine-deficient patient.',
    },
    dextrose: {
      aliases: ['5% dextrose infusion', 'dextrose', 'iv dextrose'],
      responseText: 'A 5% Dextrose infusion is started for caloric support, thiamine already on board.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'A patient not eating needs caloric support, and a dextrose-containing fluid is reasonable once his depleted thiamine stores have already been replaced — the fluid itself is not the problem, the order it is given in is.',
      requiresFirst: ['thiamine'],
      harmfulSequenceResponseText: 'The dextrose infusion is hung before any thiamine has been given. Over the next half hour his eye movements become slow and disconjugate and his gait, when he is coaxed to stand, is unsteady and wide-based on top of the existing confusion.',
      harmfulSequenceVitalsEffect: { hr: 8, bp: '148/90' },
      harmfulSequenceRationale: 'In a thiamine-deficient patient, a glucose load is used up by cells as fuel through a thiamine-dependent enzyme step, and doing so consumes what little thiamine reserve remains. That can precipitate an acute, largely irreversible brain injury (Wernicke encephalopathy — the triad of confusion, eye-movement abnormality and unsteady gait) that then persists even after the withdrawal itself is treated. This is exactly why parenteral thiamine must be given before, or at the very least alongside, the first dextrose-containing fluid — never after.',
    },
    benzodiazepine: {
      aliases: ['lorazepam iv', 'lorazepam', 'benzodiazepine', 'iv lorazepam'],
      responseText: 'Lorazepam given intravenously, dosed against the bedside withdrawal severity score and repeated as that score dictates, rather than on a fixed schedule.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -22, bp: '138/86', rr: -6, temp: '37.4°C' },
      appropriateness: 'indicated',
      rationale: 'A benzodiazepine is the definitive treatment: it substitutes for alcohol at the GABA-A receptor and treats the underlying neurochemical process, not just the symptoms. Symptom-triggered dosing against a validated withdrawal scale, titrated to light somnolence — rousable, calm, not agitated and not deeply sedated — controls the withdrawal with less total drug than a fixed schedule and lets the dose track how the patient is actually doing.',
    },
    magnesium_therapy: {
      aliases: ['magnesium sulfate 2 g iv infusion', 'magnesium sulfate', 'iv magnesium', 'iv magnesium sulfate infusion', 'magnesium', 'magnesium sulfate infusion', 'magnesium sulfate iv infusion'],
      responseText: 'Magnesium sulfate 2 g given as an intravenous infusion.',
      onsetMinutes: 30,
      labShift: {
        serum_magnesium: 'Serum Magnesium (repeat): 1.9 mg/dL (Reference 1.7–2.2 mg/dL) — normalised after replacement.',
      },
      appropriateness: 'indicated',
      rationale: 'Hypomagnesaemia is common with sustained heavy drinking, lowers the seizure threshold, and makes potassium harder to correct until it is replaced — correcting it supports both seizure prevention and the potassium repletion given alongside it.',
    },
    potassium_therapy: {
      aliases: ['potassium chloride in infusion', 'potassium chloride', 'iv potassium', 'potassium', 'potassium chloride in'],
      responseText: 'Potassium chloride given in an intravenous infusion, with cardiac monitoring running throughout.',
      onsetMinutes: 30,
      labShift: {
        electrolytes: 'Serum Electrolytes (repeat): Sodium 136 mEq/L, Potassium 4.1 mEq/L (Reference 3.5–5.0 mEq/L), Chloride 100 mEq/L — potassium normalised after replacement.',
      },
      appropriateness: 'indicated',
      rationale: 'Correcting hypokalaemia reduces the risk of a cardiac arrhythmia in a patient who is already tachycardic and catecholamine-driven, and should be replaced under monitoring alongside magnesium.',
    },
    iv_fluids: {
      aliases: ['normal saline 0.9% 500 ml bolus', 'normal saline', 'ns bolus', 'normal saline 0 9 bolus'],
      responseText: 'Normal saline 0.9% 500 mL bolus given intravenously for volume depletion from sweating and poor intake.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -6, bp: '150/92' },
      appropriateness: 'indicated',
      rationale: 'Profuse sweating, tachypnoea and poor oral intake over the preceding day produce a real volume deficit that supports the circulation while the sedative and electrolyte repletion take effect.',
    },
    cardiac_monitoring: {
      aliases: ['continuous cardiac monitoring', 'cardiac monitoring', 'continuous ecg monitoring', 'continuous electrocardiogram monitoring'],
      responseText: 'Continuous cardiac monitoring commenced.',
      onsetMinutes: 2,
      appropriateness: 'indicated',
      rationale: 'Autonomic instability, hypokalaemia and hypomagnesaemia together carry a real arrhythmia risk, and monitoring should run throughout electrolyte replacement and sedation.',
    },
    haloperidol_sole_therapy: {
      aliases: ['haloperidol 5 mg iv', 'haloperidol', 'haloperidol iv', 'iv haloperidol'],
      responseText: 'Haloperidol given intravenously as the sole agent for the agitation and hallucinations, with no benzodiazepine given.',
      onsetMinutes: 20,
      vitalsEffect: { hr: 10, bp: '172/104' },
      appropriateness: 'harmful',
      rationale: 'Haloperidol has no cross-tolerance with alcohol at the GABA-A receptor and does nothing to treat the underlying withdrawal process, so the autonomic hyperactivity and agitation continue largely unmodified. It also lowers the seizure threshold, adding risk on top of a patient who is already at risk of a withdrawal seizure. An antipsychotic has a role only as a cautious add-on to an adequate benzodiazepine dose for refractory hallucinations or agitation — never as the sole or first agent.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /thiamine/i,
      name: 'Parenteral Thiamine',
      targetMilestoneMinutes: 20,
    },
    {
      orderOrActionPattern: /lorazepam|benzodiazepine/i,
      name: 'Symptom-Triggered Benzodiazepine',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /magnesium/i,
      name: 'Magnesium Repletion',
      targetMilestoneMinutes: 90,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_dt_1',
      title: 'Incidental Arachnoid Cyst on CT Head',
      description: 'The CT head ordered to exclude an acute intracranial cause incidentally shows a tiny arachnoid cyst in the left middle cranial fossa, with no mass effect.',
      correctAction: 'No intervention needed; document the finding and reassure — it is unrelated to the current presentation and needs no follow-up imaging in this context.',
      status: 'unnoticed',
    },
    {
      id: 'inc_dt_2',
      title: 'Reduced Vibration Sense in Both Feet',
      description: 'On examining the lower limbs for the tremor and reflex check, vibration sense is found reduced at both great toes, with otherwise normal power and coordination.',
      correctAction: 'Note it as a sign of nutritional peripheral neuropathy from sustained heavy alcohol use, continue thiamine and B-complex replacement, and arrange outpatient neurology follow-up rather than further acute workup.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'Overnight, a patient several days into an unrelated surgical admission grows agitated, tremulous and profusely sweaty, insisting insects are on the sheets and unsure where he is.',
      consequenceOnRight: 'The team secures IV access, checks the bedside glucose, and gives thiamine before any glucose-containing fluid is hung, while beginning close observation with a validated bedside severity score.',
      consequenceOnWrong: 'A dextrose-containing fluid is started first for presumed low sugar or routine maintenance, and the window to protect his remaining thiamine reserve before it is depleted is lost.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'The team reviews what could explain new agitation, tremor, sweating and disorientation that began roughly three days into this admission, in a patient whose family confirms daily heavy drinking with nothing alcoholic since he came in.',
      consequenceOnRight: 'Head injury, bloodstream infection, a urinary source, low blood sugar and a dangerous electrolyte derangement are each actively checked for and excluded before the change in mental state is attributed to the time since his last drink.',
      consequenceOnWrong: 'The new confusion is assumed to be simple abstinence without checking for a mimicking or coexisting cause, and a treatable alternative explanation is missed.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The bedside withdrawal severity score comes back markedly elevated, and the agitation, tremor and hallucinations are not settling.',
      consequenceOnRight: 'A benzodiazepine is given intravenously, dosed against the score and repeated as the score dictates, aiming for a calm, lightly sedated but rousable patient rather than a fixed dose or a rigid schedule.',
      consequenceOnWrong: 'An antipsychotic is given alone in place of a benzodiazepine, or dosing ignores the ongoing score entirely, leaving the underlying process unmodified and, in the case of the antipsychotic, lowering the seizure threshold as well.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'Blood results return showing a low potassium and a low magnesium in a patient with a long history of heavy daily drinking who had a witnessed seizure during a previous attempt to cut down.',
      consequenceOnRight: 'Magnesium and potassium are both actively replaced under cardiac monitoring, since correcting magnesium first makes potassium easier to correct and both lower the risk of a seizure or arrhythmia here.',
      consequenceOnWrong: 'The electrolyte results are filed without action, leaving a patient already known to have seized once during withdrawal at needless additional risk.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'As the acute agitation settles over the following day, the team plans what should happen before this patient, with a long history of heavy daily drinking, leaves the ward.',
      consequenceOnRight: 'Ongoing oral thiamine and multivitamin replacement, a nutrition review, and counselling with a referral for supervised community follow-up or de-addiction support are arranged before discharge.',
      consequenceOnWrong: 'He is discharged once calm with no plan for continued nutritional replacement or follow-up, leaving him at risk of a repeat presentation or of a preventable neurological complication.',
    },
  ],
};
