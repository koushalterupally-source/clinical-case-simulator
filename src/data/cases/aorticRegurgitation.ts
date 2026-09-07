import { CaseScaffold } from '../../types';

/**
 * Long-standing, gradually progressive severe backward leak across the
 * outflow valve, now presenting with exertional breathlessness — see
 * CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 *
 * Teaching points this case is built around: the wide pulse pressure and
 * the classic eponymous peripheral signs it produces (a bounding,
 * collapsing pulse, visible head-bobbing, a pulsating uvula, capillary
 * pulsations, a to-and-fro femoral murmur, a "pistol shot" femoral sound,
 * and a popliteal-over-brachial pressure gap); the early diastolic
 * decrescendo murmur, plus the apical Austin Flint rumble the regurgitant
 * jet itself can produce; the two independent echocardiographic triggers
 * for surgery — an ejection fraction at or below 55% and a left
 * ventricular end-systolic dimension beyond 50 mm — and that a symptomatic
 * patient needs surgery regardless of either number; and, taught by direct
 * contrast with a fixed-obstruction lesion, why afterload reduction HELPS
 * here (this ventricle is volume-, not pressure-, loaded, so lowering
 * systemic resistance sends more of each beat forward) while artificially
 * slowing the heart rate is the genuine trap (a slower rate lengthens
 * diastole, giving the leak more time to fill the ventricle each cycle,
 * worsening rather than easing his failure). A sudden, acutely severe leak
 * — from an infection or a tear rather than years of gradual dilation — is
 * used as a deliberate contrast point: it would show none of the wide
 * pulse pressure or peripheral signs seen here, because the circulation
 * has had no time to adapt, and it demands emergency surgery rather than
 * the elective planning appropriate for this man.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "aortic" and "regurgitation" — the two content words the schema
 * validator extracts from conditionName — describing the lesion instead as
 * "the affected valve", "a leak" or "backward flow".
 */
export const SCAFFOLD_AORTIC_REGURGITATION: CaseScaffold = {
  id: 'scaffold_aortic_regurgitation',
  title: 'Wide Pulse Pressure with Exertional Breathlessness',
  conditionName: 'Chronic Severe Aortic Regurgitation',
  subject: 'Medicine',
  system: 'Cardiology',
  demographics: {
    name: 'Farhan Sheikh',
    age: 42,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 42-year-old man is admitted to the ward with eight months of progressively worsening breathlessness on exertion, now limited to under two flights of stairs, along with occasional palpitations he notices most when lying flat at night. He denies chest pain, fevers, or recent dental work. A heart murmur was picked up incidentally on a routine medical check fifteen years ago but was never followed up. On examination his pulse feels unusually forceful and bounding, and his blood pressure reading shows a strikingly wide gap between the top and bottom numbers.',
  initialVitals: {
    hr: 96,
    bp: '150/48',
    rr: 20,
    spo2: 95,
    temp: '36.7°C',
    grbs: 102,
  },
  clinchingClue:
    'Echocardiography shows a wide colour jet of backward flow across the affected valve with a vena contracta of 8 mm (severe defined as ≥6 mm), a regurgitant volume of 65 mL per beat and a regurgitant fraction of 58% (both comfortably in the severe range), together with a left ventricular end-systolic dimension of 52 mm — beyond the 50 mm surgical threshold — and an ejection fraction of 52%, already at or below the 55% cut-off that alone would call for surgery, in a man who is already symptomatic with everyday exertion.',
  clinchingClueTimeMinutes: 90,
  examFindingsMap: {
    general: 'Comfortable at rest, breathless only on walking to the bathroom; no cyanosis, no pallor, no oedema.',
    cvs: 'Pulse bounding and collapsing (a water-hammer character), best felt by raising the arm above the head while palpating the radial pulse (Corrigan\'s sign). Visible pulsation of the head with each heartbeat (de Musset\'s sign) and of the uvula (Müller\'s sign); rhythmic capillary pulsations seen in the nail bed on light pressure (Quincke\'s sign). Apex beat diffuse, hyperdynamic and displaced to the sixth intercostal space in the anterior axillary line. An early diastolic decrescendo murmur is heard at the left third intercostal space (Erb\'s point) with the patient sitting forward in held expiration, along with a soft mid-diastolic rumble at the apex from the regurgitant jet striking the anterior mitral leaflet (an Austin Flint murmur). Popliteal cuff systolic pressure exceeds the brachial reading by more than 60 mmHg (Hill\'s sign), and a to-and-fro murmur (Duroziez\'s sign) with a "pistol-shot" sound (Traube\'s sign) is heard over the femoral arteries.',
    chest: 'Clear to auscultation bilaterally, no crepitations.',
    abdomen: 'Soft, non-tender, no organomegaly, bowel sounds normal.',
    neuro: 'Alert and oriented, no focal deficit.',
  },
  historyMap: {
    presenting: 'Eight months of progressive exertional breathlessness, now limited to under two flights of stairs; occasional palpitations noticed most when lying flat; no chest pain, fevers, night sweats, or weight loss; no recent dental or invasive procedures.',
    past: 'A heart murmur was noted incidentally on a pre-employment medical check fifteen years ago but never investigated further; no known rheumatic fever as a child, no hypertension, no diabetes.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    family: 'No family history of early heart disease or sudden cardiac death.',
    social: 'Non-smoker, occasional alcohol; previously worked manual labour, now limited by breathlessness on exertion.',
  },
  investigationsMap: {
    ecg: {
      aliases: ['12-lead ecg', 'ecg', 'ekg', 'electrocardiogram', '12 lead electrocardiogram'],
      resultText:
        'ECG: Sinus rhythm, rate 96/min. Voltage criteria for left ventricular hypertrophy with a diastolic-overload pattern — deep, narrow Q waves and tall R waves in the lateral leads (I, aVL, V5–V6) — and secondary ST-T changes. No acute ischaemic changes.',
      turnaroundMinutes: 5,
      category: 'imaging',
      isIndicative: true,
    },
    echo: {
      aliases: ['2d echo', 'echo', 'echocardiogram', 'transthoracic echo', 'formal 2d echo', 'echocardiography'],
      resultText:
        'Transthoracic Echocardiogram: Wide colour-flow jet of backward flow across the affected valve, with a vena contracta of 8 mm (severe ≥6 mm), regurgitant volume 65 mL/beat and regurgitant fraction 58% (both severe). Left ventricular end-diastolic dimension 68 mm, end-systolic dimension 52 mm (exceeding the 50 mm surgical threshold). Ejection fraction 52% (at or below the 55% cut-off that alone indicates surgery). Trileaflet valve with mild leaflet thickening and no vegetation; mildly dilated aortic root at 42 mm.',
      turnaroundMinutes: 90,
      category: 'imaging',
      isIndicative: true,
    },
    cxr: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr', 'chest x ray', 'cxr pa'],
      resultText:
        'Chest X-ray PA: Marked cardiomegaly with an elongated, downward- and outward-displaced left ventricular border (a "cor bovinum" silhouette classically seen with a longstanding severe leak), and mild dilation of the ascending aorta. Lung fields clear.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 14.5 g/dL (Reference 13.5–17.5 g/dL), WBC 7,800/mcL (Reference 4,000–11,000/mcL), Platelets 260,000/mcL (Reference 150,000–450,000/mcL) — unremarkable, no leucocytosis to suggest an infective process.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests'],
      resultText:
        'Renal Function: Blood Urea 28 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.9 mg/dL (Reference 0.7–1.3 mg/dL) — normal; a useful baseline before starting an ACE inhibitor or planning surgery.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    nt_probnp: {
      aliases: ['nt-probnp', 'bnp', 'nt pro bnp', 'natriuretic peptide'],
      resultText:
        'NT-proBNP: 980 pg/mL (Reference <125 pg/mL) — elevated, supporting a genuinely cardiac cause for his breathlessness and useful for tracking his trajectory.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    troponin: {
      aliases: ['troponin i', 'troponin', 'ck-mb', 'cardiac enzymes', 'cardiac markers'],
      resultText:
        'Troponin I: 0.02 ng/mL (Reference <0.04 ng/mL) — normal.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'He has no chest pain and no ischaemic changes on his ECG, so this does not add much here; it is reasonable to check once if there is any doubt, but his gradual, months-long course is not suggestive of an acute coronary event and this need not be repeated.',
    },
    blood_cultures: {
      aliases: ['blood culture', 'blood cultures', 'blood cultures x2'],
      resultText: 'Blood Cultures (2 sets, peripheral): No growth at 5 days of incubation.',
      turnaroundMinutes: 4320,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'There is no fever, no vascular or immunologic stigmata, and nothing in a gradual, months-long course to suggest an infected valve — cultures are reasonable to send if there is genuine clinical doubt, but a slowly progressive picture like his does not by itself warrant them.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['iv access', 'iv cannula', 'wide bore cannula', 'two wide bore iv cannulae'],
      responseText: 'IV cannula secured for medications and blood draws.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Routine venous access on admission for a patient undergoing cardiac workup and likely to need IV therapy.',
    },
    cardiac_monitor: {
      aliases: ['continuous cardiac monitoring', 'cardiac monitor', 'telemetry', 'continuous ecg monitoring'],
      responseText: 'Continuous cardiac monitoring started at the bedside.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'A chronically volume-overloaded ventricle is at higher risk of atrial and ventricular arrhythmia; monitoring is reasonable while he is worked up as an inpatient.',
    },
    afterload_reduction: {
      aliases: ['ace inhibitor', 'ramipril', 'enalapril', 'afterload reduction', 'nifedipine', 'vasodilator therapy'],
      responseText: 'An ACE inhibitor (ramipril) is started for afterload reduction and blood pressure control.',
      onsetMinutes: 60,
      vitalsEffect: { bp: '134/58' },
      appropriateness: 'indicated',
      rationale:
        'Lowering systemic vascular resistance sends more of each beat forward instead of back through the leaking valve, easing the volume load on the ventricle and helping both his symptoms and his very wide pulse pressure. It is genuinely useful here — the opposite of a fixed-obstruction lesion, where the ventricle depends on preload and a vasodilator is dangerous — but it is adjunctive: it does not replace timely valve surgery once his criteria for it are already met.',
    },
    furosemide: {
      aliases: ['iv furosemide', 'furosemide', 'inj furosemide', 'lasix'],
      responseText: 'IV furosemide given for symptomatic relief of his breathlessness and volume overload.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -4, spo2: 2 },
      appropriateness: 'indicated',
      rationale:
        'Unlike a fixed-obstruction lesion, this ventricle is not preload-dependent for forward flow — it is already volume-overloaded from the chronic leak, so judicious diuresis relieves congestion and eases his breathlessness without the risk of a sudden fall in output that stripping preload would cause elsewhere.',
    },
    beta_blocker: {
      aliases: ['beta blocker', 'metoprolol', 'iv metoprolol', 'bisoprolol', 'atenolol'],
      responseText:
        'A beta-blocker is given to "settle" his heart rate. His heart rate falls as intended, but over the next hour he becomes more breathless and his congestion visibly worsens.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -20, spo2: -3 },
      appropriateness: 'harmful',
      rationale:
        'His mild tachycardia here is compensatory: a faster rate shortens the time available in diastole for blood to leak backward each cycle. Slowing the heart rate lengthens diastole and gives the leak more time to fill the ventricle each beat, increasing the regurgitant volume and precipitating decompensation — the mirror-image trap of a fixed-obstruction lesion, where a fast heart rate is the one worth preserving rather than treating.',
    },
    valve_surgery_referral: {
      aliases: ['cardiothoracic surgery consult', 'cardiology consult', 'valve replacement evaluation', 'surgical referral', 'avr evaluation'],
      responseText: 'Cardiology and cardiothoracic surgery referral requested for definitive valve replacement or repair.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale:
        'He already has exertional symptoms, which alone is a definite indication for surgery regardless of the echo numbers; here the echo also independently shows the ventricle beginning to fail (an ejection fraction at the threshold and an end-systolic dimension beyond it), reinforcing that surgery should not be delayed while medical therapy is tried instead.',
    },
    dental_review: {
      aliases: ['dental clearance', 'dental review', 'dental assessment'],
      responseText: 'Dental assessment and clearance arranged ahead of his planned valve surgery.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Untreated dental disease is a recognised source of the bloodstream infection that can seed a damaged or newly placed valve; clearing dental sepsis before an elective valve operation reduces this risk.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ace inhibitor|ramipril|enalapril|afterload reduction|nifedipine|vasodilator therapy/i,
      name: 'Afterload-Reducing Therapy Started',
      targetMilestoneMinutes: 240,
    },
    {
      orderOrActionPattern: /cardiothoracic surgery consult|cardiology consult|valve replacement evaluation|surgical referral|avr evaluation/i,
      name: 'Valve Replacement Referral Placed',
      targetMilestoneMinutes: 720,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_ar_1',
      title: 'Old Healed Rib Fracture on Chest X-ray',
      description: 'A well-healed fracture of the left seventh rib is noted incidentally on the chest film, with no associated soft tissue abnormality.',
      correctAction: 'No intervention needed; ask about remote trauma history for completeness, but no follow-up imaging is required.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ar_2',
      title: 'Small Reducible Umbilical Hernia',
      description: 'A small, soft, easily reducible umbilical hernia is noted on abdominal palpation, non-tender and unrelated to his presentation.',
      correctAction: 'No acute intervention; an elective surgical opinion only if it becomes symptomatic or enlarges.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ar_3',
      title: 'Overdue Lipid Screening',
      description: 'No fasting lipid profile has been checked in over five years despite his age and now-diagnosed structural heart disease.',
      correctAction: 'Recommend a fasting lipid profile as part of routine cardiovascular risk assessment, unrelated to today\'s presentation.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'On admission, a man with several months of worsening breathlessness on exertion is found to have an unusually high systolic reading alongside an unusually low diastolic reading on his blood pressure check.',
      consequenceOnRight: 'IV access and cardiac monitoring are started, and the very wide gap between his systolic and diastolic pressures is correctly treated as a genuine clinical clue rather than a cuff error, prompting a focused cardiovascular examination.',
      consequenceOnWrong: 'The reading is repeated and dismissed as measurement error without a focused examination, delaying recognition of a structural heart problem.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Examination reveals a bounding, collapsing pulse, visible pulsation of the head and uvula with each heartbeat, and an early, soft diastolic murmur at the left sternal border, together with a striking gap between his arm and leg blood pressure readings.',
      consequenceOnRight: 'This combination of peripheral signs and the diastolic murmur is recognised as pointing to a significant leak in a heart valve, and echocardiography is requested to establish its severity.',
      consequenceOnWrong: 'The bounding pulse is attributed to anxiety or anaemia without a proper cardiovascular examination, delaying recognition of a structural heart problem.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'The team debates whether to start a heart-rate-slowing drug to "settle" his mildly fast heart rate, or a blood-vessel-relaxing drug for his very wide pulse pressure.',
      consequenceOnRight: 'A vessel-relaxing (afterload-reducing) drug is chosen, and a heart-rate-slowing drug is deliberately avoided, since his faster rate is helping rather than hurting him here.',
      consequenceOnWrong: 'A heart-rate-slowing drug is started to calm his tachycardia, and he becomes more breathless as the slower rate gives more time each beat for blood to leak backward.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Echocardiography returns showing his pumping efficiency at 52% and a left ventricular size measurement of 52 mm, in a man who is already breathless with everyday exertion.',
      consequenceOnRight: 'Definitive valve surgery is arranged promptly, since these numbers independently meet recognised triggers for operating, and because he is already symptomatic that decision would not have depended on the numbers at all.',
      consequenceOnWrong: 'Surgery is deferred in favour of continued medical therapy alone, "since he is not in acute distress," delaying an operation his own numbers already call for.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'The team discusses how this same leaking valve problem would look if it had developed suddenly instead of over many months — for instance from an infection of the valve or a tear in the vessel wall behind it.',
      consequenceOnRight: 'It is correctly noted that a sudden severe leak would present very differently — with abrupt breathlessness or shock, and without the wide pulse pressure or peripheral signs seen here, since the circulation would not have had time to adapt — and would need emergency, not elective, treatment.',
      consequenceOnWrong: 'The sudden and gradual pictures are treated as interchangeable, missing that a rapidly evolving presentation would need emergency intervention on a completely different timescale from his.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before his planned valve operation, the team plans the remaining steps in his workup and any preventive measures.',
      consequenceOnRight: 'Dental assessment and clearance are arranged ahead of the operation to reduce his risk of seeding the valve, and he is counselled on symptoms that would need urgent review before his surgery date.',
      consequenceOnWrong: 'Surgery is scheduled without dental clearance and no safety-netting advice is given, leaving an avoidable infective risk unaddressed.',
    },
  ],
};
