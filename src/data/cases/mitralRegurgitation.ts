import { CaseScaffold } from '../../types';

/**
 * Long-standing, gradually worsening backward leak of the left-sided
 * inflow valve from a myxomatous, prolapsing leaflet — see CASE_MODEL.md
 * for the therapy model (indicated / neutral / harmful, requiresFirst
 * sequencing) this scaffold follows.
 *
 * Teaching points this case is built around: the pansystolic (holosystolic)
 * murmur radiating to the axilla; why ejection fraction here is
 * deceptively reassuring — this ventricle empties a large share of every
 * beat backward into a low-pressure chamber next door as well as forward,
 * so a "normal" figure already represents disguised systolic dysfunction,
 * and current guidance treats a fall to 60% or below, or an end-systolic
 * dimension of 40 mm or more, as itself the trigger for surgery rather
 * than something to wait out; and the choice between repair and
 * replacement once surgery is agreed, favouring repair whenever the
 * anatomy (here, a single floppy leaflet segment) supports it. The
 * deliberate contrast point with its sibling case on the outflow valve:
 * afterload reduction helps a leak that drains against the body's own
 * resistance, but does little for a leak that empties straight into a
 * neighbouring low-pressure chamber regardless of that resistance — the
 * harmful trap here is borrowing that other lesion's playbook. Exercise
 * testing, dangerous in a fixed-obstruction lesion, is modelled here as a
 * genuinely useful, safe tool, since this heart can and should raise its
 * output with effort.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "mitral" and "regurgitation" — the two content words the schema
 * validator extracts from conditionName — describing the lesion instead as
 * "the affected valve", "a leaking valve" or "the leaking leaflet".
 */
export const SCAFFOLD_MITRAL_REGURGITATION: CaseScaffold = {
  id: 'scaffold_mitral_regurgitation',
  title: 'Progressive Breathlessness with an Apical Murmur',
  conditionName: 'Chronic Severe Mitral Regurgitation',
  subject: 'Medicine',
  system: 'Cardiology',
  demographics: {
    name: 'Vikram Nair',
    age: 58,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 58-year-old man is admitted to the ward with four months of progressively worsening breathlessness on exertion, now needing two pillows to sleep comfortably, along with occasional palpitations and mild ankle swelling by evening. He denies chest pain or fevers. A heart murmur was picked up incidentally on an echocardiogram six years ago during an unrelated evaluation, at the time thought to be mild and needing only periodic review, but he did not return for follow-up. His mother had a heart valve repaired in her sixties.',
  initialVitals: {
    hr: 88,
    bp: '128/76',
    rr: 20,
    spo2: 95,
    temp: '36.8°C',
    grbs: 110,
  },
  clinchingClue:
    'Echocardiography shows a myxomatous, thickened posterior leaflet of the affected valve with a flail segment and a wide, eccentric jet of backward flow, a vena contracta of 8 mm and a regurgitant fraction of 56% (both comfortably severe), together with a left ventricular end-systolic dimension of 41 mm — at the 40 mm threshold that alone now calls for surgery — and an ejection fraction reported as a reassuring-looking 58% that, in a ventricle unloading a large share of every beat backward into a low-pressure chamber, already represents early systolic dysfunction rather than a genuinely healthy number.',
  clinchingClueTimeMinutes: 90,
  examFindingsMap: {
    general: 'Comfortable at rest, breathless on minor exertion; mild bilateral pitting ankle oedema.',
    cvs: 'Apex beat hyperdynamic and displaced laterally to the anterior axillary line in the sixth intercostal space. Soft first heart sound; widely split, soft second heart sound. A blowing, high-pitched murmur is heard throughout systole at the apex, radiating to the left axilla and back, unchanged with respiration. A third heart sound is audible at the apex, reflecting rapid early filling from the volume-overloaded chamber rather than necessarily indicating outright decompensation at this stage.',
    chest: 'Mild bilateral fine basal crepitations; no wheeze.',
    abdomen: 'Soft, non-tender, mild tenderness-free hepatic edge palpable one finger-breadth below the costal margin; bowel sounds normal.',
    neuro: 'Alert and oriented, no focal deficit.',
  },
  historyMap: {
    presenting: 'Four months of progressive exertional breathlessness, now requiring two pillows at night, with occasional palpitations and mild evening ankle swelling; no chest pain, fevers, or recent dental work.',
    past: 'A prolapsing, floppy heart valve was noted incidentally on an echocardiogram six years ago during an unrelated evaluation, said at the time to be mild and needing only periodic review; he did not return for follow-up. No known rheumatic fever, hypertension, or diabetes.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    family: 'Mother had a heart valve surgically repaired in her sixties.',
    social: 'Works in business, largely sedentary; non-smoker; moderate social alcohol use.',
  },
  investigationsMap: {
    ecg: {
      aliases: ['12-lead ecg', 'ecg', 'ekg', 'electrocardiogram', '12 lead electrocardiogram'],
      resultText:
        'ECG: Sinus rhythm, rate 88/min. Broad, notched P wave in lead II and a biphasic P wave in V1, in keeping with left atrial enlargement. Voltage evidence of left ventricular hypertrophy with a volume-overload pattern. No acute ischaemic changes.',
      turnaroundMinutes: 5,
      category: 'imaging',
      isIndicative: true,
    },
    echo: {
      aliases: ['2d echo', 'echo', 'echocardiogram', 'transthoracic echo', 'formal 2d echo', 'echocardiography'],
      resultText:
        'Transthoracic Echocardiogram: Myxomatous, thickened posterior leaflet of the affected valve with a flail P2 segment and a wide, eccentric jet of backward flow directed anteriorly. Vena contracta 8 mm (severe ≥7 mm); regurgitant volume 68 mL/beat and regurgitant fraction 56% (both severe). Left atrium enlarged at 48 mm. Left ventricular end-diastolic dimension 62 mm, end-systolic dimension 41 mm — at the 40 mm threshold that itself now indicates surgery. Ejection fraction 58%, reported as preserved, but in a chronically volume-overloaded ventricle ejecting freely backward as well as forward, a figure like this already represents early, disguised systolic dysfunction rather than reassuring normal function — a fall toward 60% or below is itself an indication to intervene, not a number to wait out. Leaflet morphology (isolated posterior leaflet prolapse) is favourable for repair rather than replacement.',
      turnaroundMinutes: 90,
      category: 'imaging',
      isIndicative: true,
    },
    cxr: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr', 'chest x ray', 'cxr pa'],
      resultText:
        'Chest X-ray PA: Cardiomegaly with straightening of the left heart border and a double density behind the cardiac silhouette, reflecting left atrial enlargement. Mild upper-zone pulmonary vascular prominence. No overt pulmonary oedema.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 13.8 g/dL (Reference 13.5–17.5 g/dL), WBC 7,600/mcL (Reference 4,000–11,000/mcL), Platelets 245,000/mcL (Reference 150,000–450,000/mcL) — unremarkable.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests'],
      resultText:
        'Renal Function: Blood Urea 30 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.0 mg/dL (Reference 0.7–1.3 mg/dL) — normal; a useful baseline before diuretics or surgery.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    nt_probnp: {
      aliases: ['nt-probnp', 'bnp', 'nt pro bnp', 'natriuretic peptide'],
      resultText: 'NT-proBNP: 720 pg/mL (Reference <125 pg/mL) — elevated, supporting a genuinely cardiac cause for his breathlessness and useful for tracking his trajectory.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    troponin: {
      aliases: ['troponin i', 'troponin', 'ck-mb', 'cardiac enzymes', 'cardiac markers'],
      resultText: 'Troponin I: 0.02 ng/mL (Reference <0.04 ng/mL) — normal.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'He has no chest pain and no ischaemic ECG changes, so this does not add much here; reasonable to check once, but his gradual, months-long course is not suggestive of an acute coronary event.',
    },
    holter_monitor: {
      aliases: ['holter monitor', '24 hour holter', 'ambulatory ecg monitoring'],
      resultText: '24-hour Holter Monitor: Occasional atrial ectopic beats; no sustained atrial fibrillation or other arrhythmia captured over the recording period.',
      turnaroundMinutes: 1440,
      category: 'monitoring',
      isIndicative: true,
    },
    exercise_stress_echo: {
      aliases: ['exercise stress echocardiography', 'stress echo', 'exercise echocardiography'],
      resultText:
        'Exercise Stress Echocardiography: He achieves 7 METs before stopping for breathlessness; the regurgitant jet enlarges with exertion and pulmonary artery systolic pressure rises to 52 mmHg (exercise-induced pulmonary hypertension), reproducing his symptoms and supporting a genuinely limited functional capacity rather than simple deconditioning. Unlike a fixed-obstruction valve lesion, exercise testing here is safe and clinically useful rather than dangerous, since this heart can and should raise its output with effort.',
      turnaroundMinutes: 60,
      category: 'procedures',
      isIndicative: true,
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
    o2_supplemental: {
      aliases: ['supplemental oxygen', 'oxygen', 'o2'],
      responseText: 'Supplemental oxygen started via nasal cannula, titrated to maintain saturation above 94%.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 3 },
      appropriateness: 'indicated',
      rationale: 'Simple, low-risk supportive measure for his mild hypoxaemia from elevated pulmonary venous pressure.',
    },
    furosemide: {
      aliases: ['iv furosemide', 'furosemide', 'inj furosemide', 'lasix'],
      responseText: 'IV furosemide given for symptomatic relief of his breathlessness and mild fluid retention.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -4, spo2: 2 },
      appropriateness: 'indicated',
      rationale: 'This chamber is already volume-overloaded from the chronic leak, so judicious diuresis relieves congestion and eases his breathlessness and ankle swelling without the risk a fixed-obstruction lesion would carry from stripping away preload.',
    },
    ace_inhibitor: {
      aliases: ['ace inhibitor', 'ramipril', 'enalapril', 'afterload reduction', 'vasodilator therapy'],
      responseText: 'An ACE inhibitor (ramipril) is started, borrowing the afterload-reduction approach used for a leak on the outflow side of the heart.',
      onsetMinutes: 60,
      vitalsEffect: { bp: '116/68' },
      appropriateness: 'neutral',
      rationale:
        'Unlike a leak on the high-pressure outflow side of the heart, this leak drains straight into a low-pressure chamber next door regardless of the body\'s own vascular resistance, so lowering that resistance does not meaningfully reduce how much blood is diverted backward here, and has not been shown to delay the need for surgery in a primary leaflet problem like his. It may still help coexisting hypertension or established heart failure, but it is not a substitute for timely repair.',
    },
    aggressive_vasodilator: {
      aliases: ['iv hydralazine', 'hydralazine', 'aggressive vasodilator therapy', 'iv nitroprusside'],
      responseText:
        'IV hydralazine is given as afterload-reducing therapy, borrowing the approach used for a different leaking valve. His blood pressure falls and he becomes symptomatically dizzy, with no real improvement in his breathlessness.',
      onsetMinutes: 15,
      vitalsEffect: { bp: '92/56', hr: 10 },
      appropriateness: 'harmful',
      rationale:
        'This leak drains directly into the chamber next door rather than against systemic resistance, so an aggressive vasodilator does not meaningfully reduce how much blood is diverted backward the way it does for a leak on the outflow side of the heart. All this drug reliably produces here is symptomatic hypotension, while the actual problem — a structurally abnormal leaflet — goes unaddressed; that problem is fixed by timely repair, not by borrowing a strategy suited to a different lesion.',
    },
    valve_repair_referral: {
      aliases: ['cardiothoracic surgery consult', 'cardiology consult', 'valve repair evaluation', 'surgical referral', 'mitral valve repair referral'],
      responseText: 'Cardiology and cardiothoracic surgery referral requested for definitive repair of the leaking leaflet.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale:
        'He already has exertional symptoms, and his echo independently shows two recognised triggers for surgery — an ejection fraction at the threshold where it already reflects hidden dysfunction, and an end-systolic dimension right at the 40 mm cut-off. With a single favourable, repairable leaflet segment, referral should be for a repair-focused surgical team rather than delayed while medical therapy is tried in its place.',
    },
    dental_review: {
      aliases: ['dental clearance', 'dental review', 'dental assessment'],
      responseText: 'Dental assessment and clearance arranged ahead of his planned valve surgery.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Untreated dental disease is a recognised source of the bloodstream infection that can seed a damaged or newly repaired valve; clearing dental sepsis before an elective operation reduces this risk.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /iv furosemide|furosemide|inj furosemide|lasix/i,
      name: 'Diuretic Therapy for Congestion',
      targetMilestoneMinutes: 120,
    },
    {
      orderOrActionPattern: /cardiothoracic surgery consult|cardiology consult|valve repair evaluation|surgical referral|mitral valve repair referral/i,
      name: 'Valve Repair Referral Placed',
      targetMilestoneMinutes: 480,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_mr_1',
      title: 'Incidental Benign Skin Lipoma',
      description: 'A 2 cm soft, mobile, non-tender subcutaneous lump is felt over his upper back during examination.',
      correctAction: 'No intervention needed for a lesion this small and typical in appearance; excision only if it enlarges or becomes symptomatic.',
      status: 'unnoticed',
    },
    {
      id: 'inc_mr_2',
      title: 'Overdue Colorectal Cancer Screening',
      description: 'At 58 years old, he has never undergone any colorectal cancer screening.',
      correctAction: 'Recommend age-appropriate colorectal cancer screening as part of routine preventive care, unrelated to today\'s presentation.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A middle-aged man is admitted with several months of worsening breathlessness, now needing extra pillows to sleep, along with mild ankle swelling and a heart murmur that has been known about for years but never actively followed up.',
      consequenceOnRight: 'IV access is secured and a focused cardiovascular examination and baseline bloods are prioritised rather than treating his breathlessness as simple deconditioning.',
      consequenceOnWrong: 'His breathlessness is attributed to age and inactivity without examining his heart murmur further, delaying recognition of a worsening structural problem.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Examination reveals a hyperdynamic, laterally displaced heart impulse and a blowing murmur heard throughout systole at the apex, radiating around toward the back of the chest.',
      consequenceOnRight: 'This pattern is recognised as pointing to a significant leak of a heart valve, and echocardiography is requested to define its severity and to see whether the leaking leaflet can be repaired.',
      consequenceOnWrong: 'The murmur is assumed to be the same mild finding noted years earlier without reassessing it, missing that it has clearly progressed.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'With his blood pressure normal and his main problem a leaking valve, a colleague suggests starting the same vessel-relaxing drug used for a leak on the outflow side of the heart, reasoning that "a leak is a leak."',
      consequenceOnRight: 'This is recognised as the wrong lesion for that approach: the leak here drains straight into the chamber next door rather than against the body\'s own resistance, so a vessel-relaxing drug will not meaningfully reduce it, and it is not started for that reason.',
      consequenceOnWrong: 'A vessel-relaxing drug is started anyway on the reasoning that it helped a different leaking valve, and his blood pressure falls with no improvement in his breathlessness.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Echocardiography returns showing his pumping efficiency at what looks like a reassuring 58%, alongside a left ventricular size measurement right at a recognised numeric threshold.',
      consequenceOnRight: 'The 58% figure is correctly read as already representing early, disguised weakening of the heart muscle rather than genuinely normal function, since this ventricle empties a large share of every beat backward rather than forward — and together with his size measurement reaching the threshold and his ongoing symptoms, surgery is arranged without waiting for the number to fall further.',
      consequenceOnWrong: 'The 58% figure is treated as reassuring and surgery is deferred "until the number actually drops," missing that by the time it clearly falls, real muscle damage will already have occurred.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'With surgery now agreed, the surgical team discusses whether to repair the leaking leaflet or replace the whole valve, given that the problem is confined to a single floppy leaflet segment.',
      consequenceOnRight: 'Repair of the diseased leaflet segment is chosen over full replacement, since this anatomy — one floppy segment rather than widespread scarring — is well suited to repair, preserving his own valve tissue with better long-term outcomes than a replacement would give.',
      consequenceOnWrong: 'Full valve replacement is chosen by default even though the anatomy is well suited to repair, exposing him to the added long-term burdens of a replaced valve that a successful repair would have avoided.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before his operation, the team plans the remaining preventive steps in his workup.',
      consequenceOnRight: 'Dental assessment and clearance are arranged ahead of the operation to reduce his risk of seeding the valve, and he is counselled on symptoms that would need urgent review before his surgery date.',
      consequenceOnWrong: 'Surgery is scheduled without dental clearance and no safety-netting advice is given, leaving an avoidable infective risk unaddressed.',
    },
  ],
};
