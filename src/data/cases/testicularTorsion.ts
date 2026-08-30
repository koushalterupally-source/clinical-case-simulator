import { CaseScaffold } from '../../types';

/**
 * An adolescent boy with sudden severe unilateral scrotal pain — the classic
 * INI-CET picture of an acute vascular emergency of the spermatic cord, a
 * few hours old.
 *
 * The teaching points this scaffold is built around:
 *  - This is a TIME-CRITICAL clinical diagnosis. The window for salvaging the
 *    organ is roughly 6 hours from onset and falls steeply after that —
 *    every scaffold decision is built to reward speed and penalise delay.
 *  - The diagnosis is made clinically: a high-riding, transversely-lying
 *    testis, an absent cremasteric reflex, and pain not relieved by
 *    elevation (a negative Prehn sign), supported by a high-risk TWIST
 *    score and a history of a prior self-resolving episode (intermittent
 *    twisting). These separate it from epididymo-orchitis, which tends to
 *    have a more gradual onset, fever, urinary symptoms and a POSITIVE
 *    Prehn sign.
 *  - Colour Doppler ultrasound must NEVER be allowed to delay surgical
 *    exploration once the clinical picture is convincing — a normal or
 *    equivocal scan does not exclude this, and chasing one anyway is the
 *    single most examined trap in this topic. Modelled here as a
 *    'harmful'-graded investigation (the cost is time, not radiation or
 *    contrast) and as the central INVESTIGATION decision gate.
 *  - Definitive treatment is urgent surgical exploration with detorsion.
 *    Because the anatomical (bell-clapper) predisposition that allows the
 *    cord to twist is usually BILATERAL, fixation (orchidopexy) is done on
 *    BOTH sides in the same operation, not just the affected one.
 *  - Orchidectomy is reserved for a testis found non-viable at exploration
 *    — a decision made only after direct surgical inspection, never before.
 *  - Manual detorsion at the bedside is a temporising bridge to surgery
 *    only, never a substitute for it, even when it fully relieves the pain.
 *
 * See src/data/cases/pph.ts for the structural exemplar and CASE_MODEL.md
 * for the binding design spec this file follows.
 */
export const SCAFFOLD_TORSION: CaseScaffold = {
  id: 'scaffold_testicular_torsion',
  title: 'Sudden Severe Scrotal Pain in an Adolescent',
  conditionName: 'Testicular Torsion',
  subject: 'Surgery',
  system: 'Urology',
  demographics: {
    name: 'Rohit Verma',
    age: 15,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 15-year-old boy is brought to the emergency department by his parents with sudden, severe pain in the left side of the scrotum that woke him from sleep about three hours ago. He has vomited twice since the pain began and cannot sit still on the trolley. There is no fever, no burning or frequency on passing urine, no history of trauma, and no preceding swelling or discharge.',
  initialVitals: {
    hr: 118,
    bp: '124/78',
    rr: 20,
    spo2: 99,
    temp: '37.0°C',
    grbs: 96,
  },
  clinchingClue:
    'On examination the left side of the scrotum is swollen and exquisitely tender; that testis lies higher than the right and horizontal rather than vertical in its axis. The cremasteric reflex is absent on the left, present on the right, and elevating the scrotum does not relieve the pain — a negative Prehn sign. A TWIST score of 7 places him in the high-risk range. Together these findings point to an acute twist of the spermatic cord cutting off its own blood supply — a time-critical surgical emergency.',
  clinchingClueTimeMinutes: 10,
  examFindingsMap: {
    general: 'Anxious and restless with pain, unable to find a comfortable position on the trolley; afebrile.',
    cvs: 'Tachycardic from pain, regular rhythm, pulses normal volume, warm well-perfused peripheries.',
    chest: 'Clear bilaterally, mildly tachypnoeic from pain and distress.',
    abdomen: 'Soft and non-tender with no guarding; mild lower abdominal discomfort referred from the scrotum but no localising abdominal sign.',
    genital:
      'Left hemi-scrotum swollen, erythematous and exquisitely tender to touch. That testis lies higher in the sac than the right and lies transversely rather than in its usual longitudinal axis (a high-riding, horizontal lie). The cremasteric reflex — stroking the inner thigh should draw the testis upward — is absent on the left but present on the right. Elevating the scrotum does not relieve the pain (a negative Prehn sign). TWIST score works out to 7 (high-risk range). No urethral discharge.',
  },
  historyMap: {
    presenting: 'Sudden-onset severe left-sided scrotal pain three hours ago, waking him from sleep, with two episodes of vomiting since; no preceding trauma, exertion, or swelling.',
    past: 'One similar but milder episode of scrotal pain about four months ago that settled on its own within an hour without any treatment — a detail worth asking about directly, since it is often not volunteered.',
    medications: 'No regular medications; no antibiotics or analgesics taken yet for this episode.',
    allergies: 'No known drug allergies.',
    family: 'No family history of a similar problem or of undescended testes.',
    sexual: 'Not sexually active; no urethral discharge, no urinary frequency or burning, making a sexually transmitted infective cause of scrotal pain unlikely.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText: 'CBC: Hb 14.2 g/dL (Reference 13.0–17.0 g/dL), WBC 9,800/mcL (Reference 4,000–11,000/mcL), Platelets 260,000/mcL (Reference 150,000–450,000/mcL) — essentially normal; a routine pre-operative baseline.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests', 'renal function tests kft urea creatinine', 'rft kidney function tests urea creatinine'],
      resultText: 'Renal Function: Blood Urea 22 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.6 mg/dL (Reference 0.6–1.2 mg/dL) — normal; routine pre-operative baseline.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile'],
      resultText: 'PT/INR: PT 12.0 sec (Reference 11–13.5 sec), INR 1.0 (Reference 0.8–1.1), aPTT 28 sec (Reference 25–35 sec) — normal, satisfactory for proceeding to anaesthesia and surgery.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    blood_group: {
      aliases: ['blood grouping & cross-match', 'blood grouping', 'cross match', 'blood group'],
      resultText: 'Blood Grouping & Cross-match: Group B Positive. Not expected to be needed for this operation, but grouped as routine pre-operative practice.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    ecg: {
      aliases: ['12-lead ecg', 'ecg', '12 lead electrocardiogram', 'electrocardiogram', 'lead ecg'],
      resultText: '12-lead ECG: Sinus tachycardia at 116/min, otherwise normal axis and intervals, no ischaemic changes — satisfactory for anaesthetic fitness.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp'],
      resultText: 'Serum CRP: 8 mg/L (Reference <5 mg/L) — mildly raised.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A mildly raised or even normal inflammatory marker does not help here — sterile inflammation from a cut-off blood supply and a genuine infection can look identical on this test. It does not distinguish between them, and waiting for it back only spends time that matters far more than the result does.',
    },
    urine_routine: {
      aliases: ['urine routine & microscopy', 'urine routine', 'urinalysis'],
      resultText: 'Urine Routine & Microscopy: No pus cells, no red cells, no nitrites — normal.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A normal urine sample does not confirm anything useful here: the urgency of the decision has already been set by the history and examination, and a clean urinalysis changes none of it.',
    },
    urine_culture: {
      aliases: ['urine culture & sensitivity', 'urine culture'],
      resultText: 'Urine Culture & Sensitivity: No growth after incubation.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'With no urinary symptoms and a clean urine microscopy, sending a culture only adds turnaround time without changing what needs to happen next.',
    },
    doppler_us_scrotum: {
      aliases: ['doppler ultrasound scrotum', 'scrotal doppler ultrasound', 'colour doppler scrotum', 'doppler usg scrotum', 'scrotal doppler usg'],
      resultText: 'Colour Doppler Ultrasound Scrotum: Reduced-to-absent flow within the left testis compared with the right, with the cord appearing twisted along its course — in keeping with a compromised blood supply on the left.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote: 'Even a completely normal or equivocal scan here would NOT have ruled anything out. Chasing one when the history and examination already point clearly to a time-critical surgical emergency spends minutes that a cut-off blood supply does not have to spare — a convincing clinical picture should go straight to the operating theatre rather than wait on this result.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'large bore iv', 'access', 'iv large bore', 'iv two wide bore cannulae', 'large bore', 'two wide bore cannulae'],
      responseText: 'Two wide-bore IV cannulae secured for analgesia and access ahead of theatre.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable IV access is a simple early step that lets analgesia and induction drugs be given without delay once theatre is ready.',
    },
    analgesia: {
      aliases: ['morphine iv', 'iv morphine', 'analgesia', 'morphine'],
      responseText: 'IV Morphine given, titrated to effect.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -14 },
      appropriateness: 'indicated',
      rationale: 'Adequate analgesia should be given early and does not hide the examination findings that matter here — the old habit of withholding pain relief until a surgeon has looked is outdated and leaves a patient in needless severe pain.',
    },
    antiemetic: {
      aliases: ['ondansetron iv', 'antiemetic', 'iv ondansetron', 'ondansetron'],
      responseText: 'IV Ondansetron given for the vomiting.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Controlling vomiting is a simple supportive step that improves comfort and reduces aspiration risk ahead of a general anaesthetic.',
    },
    npo: {
      aliases: ['nil by mouth', 'npo', 'nbm'],
      responseText: 'Kept nil by mouth in preparation for theatre.',
      onsetMinutes: 2,
      appropriateness: 'indicated',
      rationale: 'Fasting reduces the risk of aspiration at induction of anaesthesia and is standard preparation for a patient who is very likely to need an urgent operation — it should run in parallel with getting him to theatre, never delay it.',
    },
    surgical_consult: {
      aliases: ['general surgery consult'],
      responseText: 'Urgent surgical opinion sought; the on-call surgical team is mobilised to take the patient to theatre without delay.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'Early surgical involvement is essential the moment this is suspected clinically — any imaging, if pursued at all, must run in parallel with arranging theatre, not before it, given how narrow the window for saving the organ is.',
    },
    manual_detorsion: {
      aliases: ['manual detorsion', 'bedside manual detorsion'],
      responseText: 'Bedside manual detorsion attempted, rotating the affected testis outward ("opening the book"); the pain eases somewhat.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -16 },
      appropriateness: 'indicated',
      rationale: 'Manual detorsion at the bedside can partially untwist the cord and buy time when theatre is not immediately available, but even a fully successful attempt with good pain relief is only temporising — it does not reliably correct the twist completely or fix the underlying anatomy, and surgical exploration with fixation is still required regardless of how much the pain improves.',
    },
    scrotal_exploration: {
      aliases: ['emergency scrotal exploration & detorsion', 'emergency scrotal exploration', 'scrotal exploration', 'move to ot'],
      responseText: 'Emergency surgical exploration of the scrotum performed: the cord is untwisted under direct vision and the testis is observed regaining a healthy colour.',
      onsetMinutes: 90,
      vitalsEffect: { hr: -30 },
      appropriateness: 'indicated',
      requiresFirst: ['iv_access', 'analgesia', 'npo'],
      harmfulSequenceResponseText: 'The patient is taken straight to the operating theatre before IV access, analgesia or fasting status have been addressed; induction has to be paused while a line is secured and an unprepared, distressed patient is managed.',
      harmfulSequenceVitalsEffect: { hr: 20 },
      harmfulSequenceRationale: 'Skipping IV access, analgesia and fasting assessment before theatre risks an unsafe induction and unnecessary distress. But none of these steps should be allowed to add more than a few minutes — the organ is losing its blood supply for every minute exploration is delayed, and salvage falls steeply once several hours have passed, so preparation must run alongside getting to theatre fast, never instead of it.',
      rationale: 'Urgent surgical exploration is the definitive treatment and should not be delayed for imaging, a full work-up, or anything else once the history and examination are convincing — every hour that passes reduces the chance the organ can be saved, and salvage falls steeply once several hours have gone by.',
    },
    bilateral_orchidopexy: {
      aliases: ['bilateral orchidopexy', 'bilateral orchidopexy (testicular fixation)', 'orchidopexy'],
      responseText: 'Both testes are fixed in place within the scrotum (bilateral orchidopexy) during the same operation.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      requiresFirst: ['scrotal_exploration'],
      harmfulSequenceResponseText: 'Fixation is attempted before the cord has been surgically exposed and the affected side dealt with — there is nothing yet to fix in place, and the operative sequence has to restart from exploration.',
      harmfulSequenceVitalsEffect: { hr: 5 },
      harmfulSequenceRationale: 'Fixation can only be carried out once the scrotum has been surgically opened and the cord exposed at exploration. More importantly, the loose attachment that let one side twist is an anatomical trait almost always present on both sides, so fixation is only meaningful — and only performed — once exploration has confirmed and dealt with the affected side first.',
      rationale: 'The loose attachment that let one side twist is an anatomical trait almost always present on both sides, so fixation is carried out on both at the same operation. Fixing only the symptomatic side leaves the other side just as free to twist on its own on some later day.',
    },
    orchidectomy: {
      aliases: ['orchidectomy', 'removal of non-viable testis'],
      responseText: 'The affected testis is found non-viable at exploration despite untwisting and is removed (orchidectomy), with the other side fixed in place.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      requiresFirst: ['scrotal_exploration'],
      harmfulSequenceResponseText: 'A decision to remove the organ is made without first surgically exploring it to assess whether it can be saved.',
      harmfulSequenceVitalsEffect: { hr: 5 },
      harmfulSequenceRationale: 'Viability can only be judged after the cord has been untwisted and the organ observed directly at exploration for a return of colour and bleeding on incision. Deciding on removal beforehand risks sacrificing a testis that could have been salvaged.',
      rationale: 'Removal is reserved for a testis found genuinely non-viable after the cord has been untwisted and observed directly at surgery — it is never decided in advance of that direct look.',
    },
    antibiotics_wrong_dx: {
      aliases: ['ceftriaxone 2 g iv', 'ceftriaxone', 'ceftriaxone iv', 'iv ceftriaxone'],
      responseText: 'IV Ceftriaxone started, treating this as an infective cause.',
      onsetMinutes: 30,
      vitalsEffect: { hr: 8 },
      appropriateness: 'harmful',
      rationale: 'Antibiotics treat infection; they do nothing for a mechanically twisted cord cutting off its own blood supply. Reaching for them because the picture "could be an infection" wastes the limited time the organ has left — and the absent cremasteric reflex and pain unrelieved by elevation seen here both argue against an infective cause in the first place.',
    },
    discharge_home: {
      aliases: ['counselling & discharge advice', 'discharge advice', 'discharge home'],
      responseText: 'The patient is discharged home with reassurance and instructions to return if the pain continues.',
      onsetMinutes: 30,
      vitalsEffect: { hr: 14 },
      appropriateness: 'harmful',
      rationale: 'Sending a convincing presentation like this home — for any reason, including a reassuring or equivocal scan — leaves a twisted cord cutting off its own blood supply for every additional hour at home. That blood supply does not wait for a follow-up appointment, and the salvage window can close before he is brought back.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /morphine|analgesia/i,
      name: 'Analgesia',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /general surgery consult/i,
      name: 'Urgent Surgical Referral',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /scrotal exploration|move to ot/i,
      name: 'Urgent Surgical Exploration (salvage window)',
      targetMilestoneMinutes: 360,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_torsion_1',
      title: 'Small Reactive Hydrocele',
      description: 'A small amount of reactive fluid is noted around the affected testis at the time of surgery.',
      correctAction: 'No separate treatment needed; it resolves on its own as the underlying problem is treated.',
      status: 'unnoticed',
    },
    {
      id: 'inc_torsion_2',
      title: 'Tetanus Immunisation Status Not Documented',
      description: 'His immunisation card cannot be found and the family are unsure whether his tetanus boosters are up to date.',
      correctAction: 'Check and update tetanus immunisation status before or at the time of any surgical incision, per routine surgical prophylaxis practice.',
      status: 'unnoticed',
    },
    {
      id: 'inc_torsion_3',
      title: 'Mild Reducible Umbilical Hernia',
      description: 'Abdominal examination incidentally reveals a small, easily reducible umbilical hernia with no signs of obstruction.',
      correctAction: 'No emergency intervention needed; mention it to the family and consider elective assessment later.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A teenage boy arrives with sudden, severe pain in one side of the scrotum that began a few hours ago, along with two episodes of vomiting; he is restless and cannot find a comfortable position.',
      consequenceOnRight: 'He is triaged as an emergency, analgesia is given promptly, and a surgical opinion is sought immediately without waiting behind less urgent cases.',
      consequenceOnWrong: 'He is triaged as routine pain and left waiting, losing time from a window that narrows with every passing hour.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'On examination the affected side of the scrotum is swollen and exquisitely tender, that testis lies unusually high and horizontal compared with the other side, the cremasteric reflex cannot be elicited on that side, and lifting the scrotum does not ease the pain.',
      consequenceOnRight: 'These findings are correctly read as a surgical emergency of the spermatic cord rather than an infection, and the surgical team is mobilised without waiting for further tests.',
      consequenceOnWrong: 'The findings are mistaken for an infective cause and antibiotics are started while the true emergency goes unaddressed.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'A colour Doppler scan of the scrotum has been requested, but the radiology team says it will take some time to arrange, while the history and examination already strongly point to one diagnosis.',
      consequenceOnRight: 'The surgical team is not made to wait for the scan — with a convincing history and examination, the patient goes straight to the operating theatre, since a normal or equivocal scan would not have changed that decision anyway.',
      consequenceOnWrong: 'Surgery is delayed until the scan result is back, and further hours are lost from an already narrow window even though the scan comes back equivocal.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'At operation the affected cord is untwisted and the testis is pink and viable; the team must now decide what to do about fixation before closing.',
      consequenceOnRight: 'Both testes are fixed in place in the same operation, because the loose anchoring that allowed this to happen is usually present on both sides, not only the one that was symptomatic.',
      consequenceOnWrong: 'Only the affected side is fixed, leaving the other side just as free to make the same sudden twist in future.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'The boy is in severe distress from the pain, and the team must decide on analgesia while the surgical opinion is being arranged.',
      consequenceOnRight: 'Adequate IV analgesia is given promptly, since treating the pain does not hide the physical findings the surgeons need to see and should never be withheld pending their review.',
      consequenceOnWrong: 'Analgesia is withheld until a surgeon has examined him, leaving him in severe unnecessary pain for no clinical benefit.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before he goes home after surgery, the team discusses what to tell the family about future symptoms and follow-up.',
      consequenceOnRight: 'The family is told to seek emergency care immediately for any sudden scrotal pain in future, and a follow-up review is arranged to check healing and confirm both sides remain well fixed.',
      consequenceOnWrong: 'He is discharged with no safety-netting advice, so a future episode on either side may not be brought in urgently.',
    },
  ],
};
