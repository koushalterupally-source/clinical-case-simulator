import { CaseScaffold } from '../../types';

/**
 * Degenerative (senile calcific) severe aortic valve narrowing presenting
 * with exertional syncope — see CASE_MODEL.md for the therapy model
 * (indicated / neutral / harmful, requiresFirst sequencing) this scaffold
 * follows.
 *
 * Teaching points this case is built around: the symptom triad of
 * exertional angina, syncope and dyspnoea each mark a step down in
 * prognosis once the lesion is severe, and once ANY of them appears,
 * medical therapy alone no longer changes the downhill course; the
 * examination triad of a slow-rising, reduced-volume (anacrotic) carotid
 * pulse, a harsh ejection systolic murmur radiating to the carotids, and a
 * soft or single second heart sound (the aortic closure sound falling
 * away); the three numerical severity criteria on echocardiography — peak
 * jet velocity, mean gradient and valve area — which all agree here on a
 * high-gradient severe lesion; and, the central trap, that this ventricle
 * is preload-dependent: it must generate very high pressure to force flow
 * across a fixed orifice that cannot enlarge to compensate, so anything
 * that drops preload (a nitrate, aggressive diuresis) can crash cardiac
 * output rather than relieve symptoms. Exercise testing is modelled as a
 * genuinely harmful order once the patient is already symptomatic, for the
 * same fixed-obstruction reason that makes exertion itself dangerous for
 * him.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "aortic" and "stenosis" — the two content words the schema validator
 * extracts from conditionName — describing the lesion instead as "the
 * valve", "a narrowed opening" or "a structural heart problem".
 */
export const SCAFFOLD_AORTIC_STENOSIS: CaseScaffold = {
  id: 'scaffold_aortic_stenosis',
  title: 'Exertional Syncope with a Systolic Murmur',
  conditionName: 'Severe Aortic Stenosis',
  subject: 'Medicine',
  system: 'Cardiology',
  demographics: {
    name: 'Ramesh Iyer',
    age: 68,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 68-year-old man is brought to the emergency department after briefly losing consciousness while climbing a flight of stairs, regaining awareness within a minute with no tongue bite or loss of bladder control. For the past four to five months he has noticed increasing breathlessness on exertion and an occasional tight sensation across his chest when he walks briskly, both of which ease with rest. Today that same tightness returned just before he blacked out. His family says he went pale and slumped rather than jerking, and he was talking normally again within a couple of minutes.',
  initialVitals: {
    hr: 76,
    bp: '128/94',
    rr: 18,
    spo2: 94,
    temp: '36.8°C',
    grbs: 118,
  },
  clinchingClue:
    'Transthoracic echocardiography shows a heavily calcified valve with markedly reduced leaflet opening: peak jet velocity 4.6 m/s, mean gradient 54 mmHg and a calculated valve area of 0.7 cm² — all three recognised severity measures agreeing on a high-gradient, severe lesion — with concentric left ventricular hypertrophy but preserved ejection fraction of 58%, in a man whose exertional chest tightness, breathlessness and now syncope place him squarely in the symptomatic, high-risk group.',
  clinchingClueTimeMinutes: 90,
  examFindingsMap: {
    general: 'Alert and appropriately oriented on arrival, though initially pale; no post-ictal confusion, no tongue bite, no incontinence.',
    cvs: 'Pulse slow-rising and of reduced volume (anacrotic) on carotid palpation; apex beat sustained and forceful but not displaced; a harsh, late-peaking grade 3/6 ejection systolic murmur heard best at the right second intercostal space, radiating to both carotids; second heart sound soft and single, its aortic component inaudible. No added sounds, no peripheral oedema.',
    chest: 'Clear to auscultation bilaterally, no crepitations, no wheeze.',
    abdomen: 'Soft, non-tender, no organomegaly, bowel sounds normal.',
    neuro: 'Alert and oriented, Glasgow Coma Scale 15/15, no focal deficit, gait steady on assessment after the event.',
  },
  historyMap: {
    presenting: 'Progressive exertional breathlessness over four to five months, now limited to under one flight of stairs; intermittent exertional chest tightness relieved by rest; today, chest tightness was followed by a brief loss of consciousness while climbing stairs with rapid, spontaneous recovery.',
    past: 'Hypertension diagnosed two years ago, on amlodipine; no known diabetes; no prior cardiac events, hospitalisations, or rheumatic fever as a child.',
    medications: 'Amlodipine 5 mg once daily. No nitrate-containing supplements, no sildenafil or similar drugs.',
    allergies: 'No known drug allergies.',
    family: 'No family history of sudden cardiac death or early heart disease.',
    social: 'Retired schoolteacher, non-smoker, occasional alcohol; walks daily, though his exercise tolerance has fallen noticeably over recent months.',
  },
  investigationsMap: {
    ecg: {
      aliases: ['12-lead ecg', 'ecg', 'ekg', 'electrocardiogram', '12 lead electrocardiogram'],
      resultText:
        'ECG: Sinus rhythm, rate 74/min. Voltage criteria for left ventricular hypertrophy with a secondary strain pattern (ST depression and T-wave inversion) in leads I, aVL and V5–V6. No acute ST-elevation, no significant conduction block.',
      turnaroundMinutes: 5,
      category: 'imaging',
      isIndicative: true,
    },
    echo: {
      aliases: ['2d echo', 'echo', 'echocardiogram', 'transthoracic echo', 'formal 2d echo', 'echocardiography'],
      resultText:
        'Transthoracic Echocardiogram: Heavily calcified, restricted trileaflet valve with markedly reduced leaflet excursion. Peak transvalvular jet velocity 4.6 m/s (severe defined as ≥4.0 m/s), mean gradient 54 mmHg (severe ≥40 mmHg), calculated valve area 0.7 cm² (severe ≤1.0 cm²) — a high-gradient, severe lesion by all three criteria. Concentric left ventricular hypertrophy, ejection fraction 58% (preserved). Mildly dilated post-stenotic ascending aorta. No more than mild regurgitation of the same valve.',
      turnaroundMinutes: 90,
      category: 'imaging',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 14.2 g/dL (Reference 13.5–17.5 g/dL), WBC 8,200/mcL (Reference 4,000–11,000/mcL), Platelets 250,000/mcL (Reference 150,000–450,000/mcL) — unremarkable.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests'],
      resultText:
        'Renal Function: Blood Urea 32 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.0 mg/dL (Reference 0.7–1.3 mg/dL) — normal; a useful baseline before any diuretic or contrast exposure and before surgical planning.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    troponin: {
      aliases: ['troponin i', 'troponin', 'ck-mb', 'cardiac enzymes', 'cardiac markers'],
      resultText:
        'Troponin I: 0.06 ng/mL (Reference <0.04 ng/mL) — mildly elevated. In a lesion this severe, a degree of demand-related myocardial injury from the thickened, oxygen-hungry ventricle is common even without a coronary plaque event, so this alone does not indicate an acute coronary syndrome.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    nt_probnp: {
      aliases: ['nt-probnp', 'bnp', 'nt pro bnp', 'natriuretic peptide'],
      resultText:
        'NT-proBNP: 1,850 pg/mL (Reference <125 pg/mL) — significantly elevated, supporting genuinely symptomatic disease rather than simple deconditioning, and useful for tracking whether his breathlessness is truly cardiac in origin.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    cxr: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr', 'chest x ray', 'cxr pa'],
      resultText:
        'Chest X-ray PA: Cardiac silhouette normal in size (concentric hypertrophy does not usually enlarge it on a plain film); calcification visible in the region of the affected valve; mild dilation of the ascending aorta. Lungs clear, no pulmonary venous congestion.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    coag_profile: {
      aliases: ['pt / inr', 'coagulation profile', 'pt inr', 'coagulation profile pt inr'],
      resultText:
        'Coagulation Profile: PT 12.8 sec (Reference 11–13.5 sec), INR 1.0 (Reference 0.8–1.1), aPTT 30 sec (Reference 25–35 sec) — normal; a routine baseline ahead of any planned valve intervention.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    exercise_stress_test: {
      aliases: ['exercise stress test', 'ett', 'treadmill test', 'exercise tolerance test'],
      resultText:
        'Exercise Treadmill Test: Test terminated at three minutes of the Bruce protocol when he became acutely lightheaded and diaphoretic; systolic blood pressure fell from 128 to 84 mmHg with no ischaemic ECG changes. He was laid flat and recovered within two minutes without further intervention.',
      turnaroundMinutes: 30,
      category: 'procedures',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'Exercise testing is contraindicated once a patient with this degree of narrowing is already symptomatic: the fixed opening cannot enlarge to meet the higher flow demand of exertion, which is exactly why exertion itself provokes his collapse — reproducing that on a treadmill risks a real hypotensive or arrhythmic event rather than useful information. A carefully supervised exercise test has a role only in an asymptomatic patient, to unmask a limitation that history alone missed, never in someone who has already fainted with exertion.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['iv access', 'iv cannula', 'wide bore cannula', 'two wide bore iv cannulae'],
      responseText: 'IV cannula secured for medications and blood draws.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is routine on arrival for anyone with syncope of uncertain cause pending evaluation.',
    },
    cardiac_monitor: {
      aliases: ['continuous cardiac monitoring', 'cardiac monitor', 'telemetry', 'continuous ecg monitoring'],
      responseText: 'Continuous cardiac and blood pressure monitoring started at the bedside.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Exertional syncope in a patient with a structural heart lesion this severe warrants continuous monitoring for further hypotension or arrhythmia while urgent evaluation proceeds.',
    },
    o2_supplemental: {
      aliases: ['supplemental oxygen', 'oxygen', 'o2'],
      responseText: 'Supplemental oxygen started via nasal cannula, titrated to maintain saturation above 94%.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 3 },
      appropriateness: 'indicated',
      rationale: 'Simple, low-risk supportive measure for his mild hypoxaemia while the cause of his collapse is worked up.',
    },
    gtn_nitrate: {
      aliases: ['sublingual gtn', 'sublingual nitroglycerin', 'nitrate', 'gtn', 'nitroglycerin', 'sorbitrate'],
      responseText:
        'Sublingual glyceryl trinitrate is given for his exertional chest tightness. Within minutes his blood pressure falls sharply and he becomes acutely lightheaded and diaphoretic, needing to be laid flat with his legs raised and a rapid fluid bolus to recover.',
      onsetMinutes: 5,
      vitalsEffect: { hr: 18, bp: '80/52' },
      appropriateness: 'harmful',
      rationale:
        'This ventricle is preload-dependent: to force flow across a fixed, near-immobile opening it must generate very high pressure, and it relies on adequate filling volume to sustain that stroke volume because the opening itself cannot enlarge to compensate. Nitrates sharply reduce venous return and preload; with stroke volume unable to rise to make up the difference, cardiac output falls precipitously and can produce profound hypotension, syncope, or worse. The same fixed-obstruction physiology that makes exertion dangerous for him makes preload-reducing drugs dangerous even at rest.',
    },
    iv_furosemide: {
      aliases: ['iv furosemide', 'furosemide', 'inj furosemide', 'lasix'],
      responseText:
        'IV furosemide is given empirically for his breathlessness on the assumption of fluid overload. Aggressive diuresis strips away more of his filling volume than intended, and he becomes hypotensive and dizzy on sitting up.',
      onsetMinutes: 15,
      vitalsEffect: { hr: 14, bp: '84/56' },
      appropriateness: 'harmful',
      rationale:
        'The same preload dependence applies to diuretics as to nitrates: without clear evidence of volume overload on this presentation, aggressive diuresis removes the filling pressure this fixed-obstruction ventricle needs to maintain forward output, risking hypotension and reduced cerebral and coronary perfusion rather than relieving his symptoms. Cautious, clinically-justified diuresis is only appropriate if genuine congestion is present, and even then it is titrated carefully rather than dosed empirically.',
    },
    avr_referral: {
      aliases: ['cardiothoracic surgery consult', 'cardiology consult', 'tavi evaluation', 'structural heart team referral', 'valve replacement evaluation', 'surgical referral'],
      responseText: 'Urgent cardiology and cardiothoracic surgery (structural heart / TAVI) evaluation requested for definitive valve replacement.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale:
        'Once this lesion becomes symptomatic — through angina, syncope, or breathlessness — average survival without valve replacement falls sharply within a few years, and no medical therapy alters that natural history. Prompt referral for surgical or transcatheter valve replacement, the choice guided by surgical risk, anatomy, and frailty, is the only intervention proven to change his prognosis.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /cardiac monitor|telemetry|continuous ecg monitoring/i,
      name: 'Continuous Cardiac Monitoring Started',
      targetMilestoneMinutes: 15,
    },
    {
      orderOrActionPattern: /cardiothoracic surgery consult|cardiology consult|tavi evaluation|structural heart team referral|valve replacement evaluation|surgical referral/i,
      name: 'Structural Heart / Valve Replacement Referral',
      targetMilestoneMinutes: 180,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_as_1',
      title: 'Incidental Thyroid Nodule',
      description: 'A firm, non-tender 1 cm nodule is felt in the right lobe of the thyroid while examining his neck vessels, with no palpable lymphadenopathy.',
      correctAction: 'No acute action; arrange an outpatient thyroid ultrasound for further characterisation once the acute presentation is settled.',
      status: 'unnoticed',
    },
    {
      id: 'inc_as_2',
      title: 'Degenerative Thoracic Spine Changes on Chest X-ray',
      description: 'Mild anterior wedging and osteophyte formation of the mid-thoracic vertebrae is noted incidentally on the chest film, in keeping with age-related degenerative change.',
      correctAction: 'No intervention needed; an incidental age-appropriate finding requiring no follow-up imaging.',
      status: 'unnoticed',
    },
    {
      id: 'inc_as_3',
      title: 'Overdue Pneumococcal and Influenza Vaccination',
      description: 'Immunisation history reveals he has never received a pneumococcal vaccine and has not had an influenza vaccine in over two years.',
      correctAction: 'Recommend pneumococcal and influenza vaccination, ideally completed before any planned valve intervention.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A 68-year-old man arrives after a brief blackout that happened while he was climbing stairs, preceded by chest tightness; he has now recovered and is alert, but the story is a classic pattern of exertional collapse from a structural heart problem.',
      consequenceOnRight: 'IV access and continuous cardiac monitoring are started immediately, and no vasodilator is given for his chest tightness while the cause of his collapse is worked up.',
      consequenceOnWrong: 'He is treated as a routine faint and monitoring is delayed, missing the chance to catch a further hypotensive episode early.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Examination reveals a slow-rising pulse of reduced volume, a forceful but non-displaced apex beat, a harsh murmur radiating to the neck vessels, and a soft, almost inaudible second heart sound — before any imaging has come back.',
      consequenceOnRight: 'This examination triad is recognised as pointing to a severe, fixed narrowing of a heart valve, and urgent echocardiography is requested to confirm severity.',
      consequenceOnWrong: 'The murmur is dismissed as an incidental finding of ageing and echocardiography is not prioritised, delaying recognition of a high-risk lesion.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'With the murmur and his exertional collapse already noted, a colleague suggests putting him on a treadmill to see how far he can walk and to reproduce his symptoms under monitoring.',
      consequenceOnRight: 'Exercise testing is declined for a patient who is already symptomatic with this pattern, since it risks provoking the very collapse it would be testing for.',
      consequenceOnWrong: 'A treadmill test is ordered anyway, and he becomes acutely hypotensive and symptomatic during the test.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Formal imaging of the heart returns showing a heavily calcified valve with a markedly narrowed opening and a high pressure difference across it, in a man who is already having symptoms with exertion.',
      consequenceOnRight: 'He is referred promptly for definitive valve replacement (surgical or transcatheter, depending on his risk profile) rather than managed with medical therapy alone, since his prognosis worsens quickly once symptoms have appeared.',
      consequenceOnWrong: 'Referral is deferred in favour of continued medical management alone, "since his blood pressure is at goal on amlodipine," leaving a high-risk lesion untreated.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'The team is deciding what to give for his intermittent exertional chest tightness and for ongoing control of his blood pressure.',
      consequenceOnRight: 'A vasodilator or nitrate is avoided, and diuretics, if used at all, are given cautiously rather than aggressively, because this ventricle depends on adequate filling pressure to maintain output across a fixed narrowing.',
      consequenceOnWrong: 'A nitrate is given for his chest tightness or a diuretic is dosed aggressively, and his blood pressure drops sharply as his filling pressure is stripped away.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before discharge, the team plans his activity levels, vaccination status and follow-up while his case is referred onward for definitive treatment of the valve problem.',
      consequenceOnRight: 'He is counselled to avoid strenuous or competitive exertion until his valve is addressed, brought up to date on pneumococcal and influenza vaccination, and given a clear, urgent follow-up plan with the structural heart team.',
      consequenceOnWrong: 'He is discharged with reassurance to resume unrestricted activity while awaiting an unspecified future outpatient review, risking another syncopal event before his valve is treated.',
    },
  ],
};
