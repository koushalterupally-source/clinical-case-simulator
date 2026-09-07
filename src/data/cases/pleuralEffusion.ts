import { CaseScaffold } from '../../types';

/**
 * A unilateral collection of fluid around one lung, worked up in the
 * Indian ward setting — see CASE_MODEL.md for the therapy model
 * (indicated / neutral / harmful, requiresFirst sequencing) this scaffold
 * follows.
 *
 * Teaching points this case is built around: Light's criteria (pleural
 * fluid protein/serum protein ratio > 0.5, pleural fluid LDH/serum LDH
 * ratio > 0.6, or pleural fluid LDH more than two-thirds the upper limit
 * of normal serum LDH) are what actually separate an exudate from a
 * transudate — clinical impression alone is not enough; a diagnostic tap
 * is the critical early intervention that turns a finding on percussion
 * into an actual diagnosis, and it should be done under ultrasound
 * guidance rather than blind, since ultrasound both confirms a safely
 * tappable pocket and measurably lowers the risk of an iatrogenic
 * pneumothorax; in the Indian context, a lymphocyte-predominant exudate
 * with a high pleural fluid ADA (using the standard cut-off of 40 U/L)
 * strongly points to a tubercular cause and is treated as such pending
 * culture, rather than waiting weeks for a slow-growing organism to
 * confirm what the biochemistry has already made likely; and removing
 * fluid too fast or in too large a single-sitting volume risks
 * re-expansion pulmonary oedema, a genuine and gradable harm, so drainage
 * is done in a controlled, staged fashion rather than emptying the whole
 * collection in one sitting.
 *
 * conditionName is "Tubercular Pleural Effusion" — the opening vignette and
 * every gate's patientContext avoid the words "tubercular", "pleural" and
 * "effusion", describing the finding instead as fluid collecting in the
 * space around the lung, and never say "TB" either, for the same reason.
 */
export const SCAFFOLD_PLEURAL_EFFUSION: CaseScaffold = {
  id: 'scaffold_pleural_effusion',
  title: 'Progressive Breathlessness with a Dull Right Lower Chest',
  conditionName: 'Tubercular Pleural Effusion',
  subject: 'Medicine',
  system: 'Respiratory',
  demographics: {
    name: 'Manoj Kumar Yadav',
    age: 29,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 29-year-old man is admitted with progressively worsening breathlessness on exertion over the past ten days, accompanied by a dry, non-productive cough and dull, aching discomfort on the right side of the chest that worsens with deep breathing. He also reports low-grade evening fever, night sweats and a loss of appetite with some weight loss over the last month. He has no significant past medical history and has not sought care for this before. He is comfortable at rest but becomes breathless climbing a single flight of stairs.',
  initialVitals: {
    hr: 102,
    bp: '116/74',
    rr: 24,
    spo2: 93,
    temp: '38.1°C',
    grbs: 102,
  },
  clinchingClue:
    'An ultrasound-guided diagnostic tap yields straw-coloured fluid whose biochemistry satisfies Light\'s criteria for an exudate (fluid-to-serum protein ratio 0.68, fluid-to-serum LDH ratio 0.82), with a lymphocyte-predominant cell count (88% lymphocytes) and a markedly raised ADA of 68 U/L (well above the standard cut-off of 40 U/L) — a combination that, in this setting, strongly points to a tubercular cause even before culture is back.',
  clinchingClueTimeMinutes: 60,
  examFindingsMap: {
    general: 'Thin build, mildly tachypnoeic at rest, no cyanosis, no significant lymphadenopathy, no pedal oedema.',
    cvs: 'Tachycardic, regular rhythm, normal heart sounds, no raised JVP.',
    chest: 'Stony dull note on percussion over the right lower and mid zones posteriorly, with markedly reduced breath sounds and reduced vocal fremitus over the same area; trachea and apex beat not clinically shifted; left lung clear.',
    abdomen: 'Soft, non-tender, no organomegaly, no shifting dullness.',
    cns: 'Alert, oriented, no focal neurological deficit.',
  },
  historyMap: {
    presenting: 'Ten days of progressive exertional breathlessness with a dry cough and right-sided pleuritic chest discomfort, plus a month of low-grade evening fever, night sweats, appetite loss and mild weight loss.',
    past: 'No known diabetes, no known heart or kidney disease, no prior similar episode.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    family: 'No family history of a similar chronic chest illness that he is aware of.',
    social: 'Non-smoker, occasional alcohol use; works in a small tailoring shop; lives with his parents in a moderately ventilated home.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 11.4 g/dL (Reference 13.0–17.0 g/dL), WBC 8,900/mcL (Reference 4,000–11,000/mcL) with mild lymphocytosis, Platelets 380,000/mcL (Reference 150,000–450,000/mcL) — a mild anaemia of chronic disease consistent with a subacute infective process.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    serum_protein_ldh: {
      aliases: ['serum protein & ldh', 'serum protein and ldh', 'serum total protein ldh', 'serum ldh'],
      resultText:
        'Serum Total Protein 7.2 g/dL (Reference 6.0–8.3 g/dL), Serum LDH 210 U/L (Reference 100–190 U/L) — this paired serum sample, sent at the same time as the fluid, is what the fluid values are actually compared against; Light\'s criteria cannot be applied without it.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests'],
      resultText:
        'Renal Function: Blood Urea 24 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.9 mg/dL (Reference 0.6–1.2 mg/dL) — normal; a low serum urea or a nephrotic-range proteinuria would instead have pointed toward a transudative cause, which is not the case here.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft', 'liver function tests'],
      resultText:
        'Liver Function Tests: Total Bilirubin 0.6 mg/dL (Reference 0.2–1.2 mg/dL), AST 26 U/L (Reference 10–40 U/L), ALT 22 U/L (Reference 7–56 U/L), Albumin 3.6 g/dL (Reference 3.5–5.0 g/dL) — normal, with no hypoalbuminaemia or synthetic dysfunction to suggest a transudative, liver-disease-driven cause.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: true,
    },
    chest_xray: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr', 'chest x ray', 'cxr pa'],
      resultText:
        'Chest X-ray PA: Homogeneous opacity with a meniscus-shaped upper border obliterating the right costophrenic angle, occupying roughly the lower third of the right hemithorax; trachea and mediastinum not shifted; left lung field clear.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    usg_chest: {
      aliases: ['usg chest', 'ultrasound chest', 'usg thorax', 'bedside ultrasound chest', 'chest ultrasound for tap'],
      resultText:
        'Ultrasound Chest: Confirms a free-flowing anechoic-to-mildly-echogenic collection over the right lower zone with no loculations or septations seen, and marks a safe pocket for needle entry above the diaphragm — this is what makes the subsequent tap accurate and safe rather than blind.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    pleural_fluid_analysis: {
      aliases: ['pleural fluid analysis', 'pleural fluid biochemistry', 'fluid protein ldh glucose', 'send fluid for analysis'],
      resultText:
        'Pleural Fluid Analysis (from the diagnostic tap): Protein 4.9 g/dL, LDH 172 U/L, Glucose 62 mg/dL, pH 7.38, cell count 1,400/mcL with 88% lymphocytes. Fluid-to-serum protein ratio 0.68 (>0.5) and fluid-to-serum LDH ratio 0.82 (>0.6) — both satisfy Light\'s criteria for an exudate, and only one is actually needed to call it one; the lymphocyte predominance narrows the likely cause further.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: true,
    },
    pleural_fluid_ada: {
      aliases: ['pleural fluid ada', 'ada pleural fluid', 'adenosine deaminase pleural fluid'],
      resultText:
        'Pleural Fluid ADA: 68 U/L (standard cut-off for a tubercular cause is 40 U/L) — markedly raised, and in a lymphocyte-predominant exudate in this setting this combination is treated as strongly suggestive of a tubercular cause pending confirmation, since culture can take weeks to grow.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: true,
    },
    pleural_fluid_cytology: {
      aliases: ['pleural fluid cytology', 'fluid for malignant cells', 'cytology pleural fluid'],
      resultText:
        'Pleural Fluid Cytology: No malignant cells seen on the sample examined.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: true,
    },
    pleural_fluid_afb_cbnaat: {
      aliases: ['pleural fluid cbnaat', 'pleural fluid afb smear', 'fluid xpert mtb/rif', 'pleural fluid for afb and cbnaat'],
      resultText:
        'Pleural Fluid AFB Smear: No acid-fast bacilli seen. CBNAAT on the fluid: Mycobacterium tuberculosis not detected. Fluid-based smear and CBNAAT are both low-sensitivity in this presentation because the bacillary load in the fluid itself is typically very low — a negative result here does NOT rule this out, and the biochemistry (ADA and lymphocyte predominance) remains the stronger evidence pending a pleural biopsy or culture.',
      turnaroundMinutes: 120,
      category: 'labs',
      isIndicative: true,
    },
    hiv_test: {
      aliases: ['hiv test', 'hiv elisa', 'hiv screening'],
      resultText: 'HIV Rapid Test: Non-reactive.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    ecg: {
      aliases: ['12-lead ecg', 'ecg', '12 lead electrocardiogram', 'electrocardiogram'],
      resultText: 'ECG: Sinus tachycardia at 102/min, no acute ischaemic changes — a reasonable baseline in a breathless patient, but it does not change management here.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'Useful as a baseline in anyone presenting breathless, but a normal tracing here neither supports nor excludes anything about the cause of the fluid — it does not narrow the differential.',
    },
    ct_thorax_contrast: {
      aliases: ['ct thorax contrast', 'ct chest contrast', 'contrast ct thorax'],
      resultText:
        'CT Thorax with Contrast: Confirms a free-flowing right-sided collection with mild adjacent pleural thickening; no additional finding here changes the immediate plan, which is already to obtain fluid for analysis.',
      turnaroundMinutes: 75,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A contrast CT can be useful later if the fluid recurs or the picture is atypical, but on day one it adds nothing that ultrasound-guided sampling does not already provide faster and at lower cost and radiation.',
    },
  },
  therapiesMap: {
    o2_supplemental: {
      aliases: ['supplemental oxygen', 'oxygen', 'nasal cannula oxygen'],
      responseText: 'Supplemental oxygen started via nasal cannula, titrated to maintain saturation above 94%.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 3 },
      appropriateness: 'indicated',
      rationale: 'Mild hypoxaemia here reflects the volume of lung compressed by the collection; supplemental oxygen is a simple, low-risk supportive measure while the underlying cause is worked up and treated.',
    },
    usg_guided_tap: {
      aliases: ['ultrasound-guided pleural tap', 'usg guided pleural tap', 'ultrasound guided tap', 'guided pleural tap'],
      responseText: 'A diagnostic tap is performed with real-time ultrasound guidance, marking a safe pocket above the diaphragm before the needle is passed; fluid is withdrawn cleanly for analysis with no immediate complication.',
      onsetMinutes: 30,
      vitalsEffect: { rr: -2, spo2: 1 },
      appropriateness: 'indicated',
      rationale: 'A diagnostic tap is the critical step that turns a clinical and radiological impression into an actual diagnosis, and doing it under real-time ultrasound guidance confirms a safely tappable pocket and measurably lowers the risk of an iatrogenic pneumothorax compared with a blind tap done on percussion findings alone.',
    },
    blind_pleural_tap: {
      aliases: ['blind pleural tap', 'pleural tap without ultrasound', 'landmark guided tap'],
      responseText: 'A tap is performed using only percussion and clinical landmarks, without ultrasound guidance. Fluid is obtained, but a post-procedure check reveals a small pneumothorax at the needle entry site.',
      onsetMinutes: 30,
      vitalsEffect: { spo2: -4, rr: 3 },
      appropriateness: 'harmful',
      rationale: 'A blind tap relying on percussion alone carries a materially higher risk of lung puncture and pneumothorax than an ultrasound-guided one — ultrasound is quick to perform at the bedside and there is no longer a good reason to skip it when marking the safest pocket takes only a minute or two.',
    },
    controlled_staged_drainage: {
      aliases: ['controlled staged drainage', 'intercostal drain slow drainage', 'staged thoracocentesis', 'therapeutic drainage in stages'],
      responseText: 'An intercostal drain is placed and fluid is removed in controlled stages, clamped intermittently and limited to no more than about 1 to 1.5 litres at a time, with the patient monitored for chest discomfort or cough during the process.',
      onsetMinutes: 45,
      vitalsEffect: { rr: -4, spo2: 2, hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Draining a large collection in controlled stages rather than all at once lets the lung re-expand gradually against the surrounding tissues, which is the safe way to relieve his breathlessness without provoking the abrupt pressure shift that a single rapid, large-volume drainage can cause.',
    },
    rapid_large_volume_drainage: {
      aliases: ['rapid drainage', 'complete drainage in one sitting', 'drain full collection at once', 'aggressive drainage', 'empty pleural space in one sitting'],
      responseText: 'The entire collection is drained rapidly in one sitting to give him immediate relief. Within the hour he develops a sudden dry cough, worsening breathlessness and a fall in saturation, and a repeat film shows new opacification in the previously collapsed lung consistent with re-expansion pulmonary oedema.',
      onsetMinutes: 45,
      vitalsEffect: { spo2: -12, rr: 10, hr: 20, bp: '96/62' },
      appropriateness: 'harmful',
      rationale: 'Removing a large volume rapidly in a single sitting — especially from a long-standing, large collection — allows the previously compressed lung to re-expand too quickly, which can precipitate re-expansion pulmonary oedema, a genuinely dangerous complication. Drainage should instead be staged and limited per sitting, stopped sooner if the patient develops chest discomfort, breathlessness or cough during the procedure, regardless of how much fluid is left.',
    },
    empirical_att_start: {
      aliases: ['start att empirically', 'empirical att', 'start att without sample'],
      responseText: 'The standard four-drug regimen is started immediately based on the clinical picture alone, before any diagnostic fluid sample has been obtained.',
      onsetMinutes: 20,
      appropriateness: 'harmful',
      requiresFirst: ['usg_guided_tap'],
      harmfulSequenceResponseText: 'Treatment is started before the diagnostic tap is done. Days later the tap is finally performed and shows a picture just as consistent with a malignant cause as with the one initially assumed — but by now it is far harder to interpret the fluid findings against a background of drugs already started, and the diagnosis he was actually treated for was never properly confirmed.',
      harmfulSequenceRationale: 'A collection like this can also be malignant, parapneumonic, or from several other causes that look similar on the outside — the diagnostic tap, not clinical impression, is what actually establishes the cause. Treating first and sampling later both delays the correct diagnosis and makes the fluid harder to interpret once drugs are already on board.',
      rationale: 'Even when the clinical picture is highly suggestive, treatment should not start before fluid has actually been obtained and analysed — the same fever and weight-loss picture can also be produced by other causes that a tap, not clinical suspicion, is what distinguishes.',
    },
    att_for_tubercular_effusion: {
      aliases: ['start att', 'att regimen', 'anti tubercular therapy', 'ntep att'],
      responseText: 'With a lymphocyte-predominant exudate and a markedly raised ADA already back, the standard NTEP weight-band four-drug regimen is started for a presumed tubercular cause, pending pleural biopsy or culture confirmation where available.',
      onsetMinutes: 60,
      vitalsEffect: { temp: '37.2°C' },
      appropriateness: 'indicated',
      requiresFirst: ['usg_guided_tap'],
      harmfulSequenceRationale: 'Starting this regimen still depends on the tap having actually been done first — the biochemistry is what justifies treating presumptively while culture is pending, so the sample must exist before the regimen can be called anything other than a guess.',
      rationale: 'Culture of pleural fluid or tissue can take weeks and has a low yield in this presentation, so in a high-burden setting like India, a lymphocyte-predominant exudate with an ADA well above the standard 40 U/L cut-off is accepted as strong enough evidence to start treatment presumptively rather than waiting for a slow-growing organism to confirm what the biochemistry has already shown.',
    },
    pleural_biopsy_referral: {
      aliases: ['pleural biopsy', 'closed pleural biopsy', 'refer for pleural biopsy'],
      responseText: 'A closed pleural biopsy is arranged for tissue diagnosis, to be reviewed alongside the biochemistry and culture rather than in place of starting presumptive treatment.',
      onsetMinutes: 90,
      appropriateness: 'indicated',
      rationale: 'A biopsy adds histological confirmation and raises the diagnostic yield further, particularly useful if the picture is atypical or the patient fails to respond as expected — but arranging it is not a reason to withhold presumptive treatment already justified by the fluid biochemistry.',
    },
    diuretics_empirical: {
      aliases: ['iv furosemide', 'furosemide', 'empirical diuretics'],
      responseText: 'Intravenous furosemide is given empirically for the fluid collection.',
      onsetMinutes: 20,
      vitalsEffect: { hr: 6 },
      appropriateness: 'harmful',
      rationale: 'Diuretics treat a transudate from fluid overload, such as heart or liver failure — they do nothing for an exudative collection like his, where fluid is being produced locally by an inflamed pleura rather than accumulating from a systemic fluid balance problem, and reaching for them here only delays the actual diagnostic step.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ultrasound[- ]guided pleural tap|usg guided pleural tap|guided pleural tap/i,
      name: 'Ultrasound-Guided Diagnostic Tap',
      targetMilestoneMinutes: 90,
    },
    {
      orderOrActionPattern: /controlled staged drainage|staged thoracocentesis/i,
      name: 'Controlled Staged Drainage Started',
      targetMilestoneMinutes: 180,
    },
    {
      orderOrActionPattern: /start att|att regimen|ntep att/i,
      name: 'Presumptive Treatment Started',
      targetMilestoneMinutes: 240,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_pleff_1',
      title: 'Incidental Small Pericardial Fat Pad',
      description: 'The chest X-ray incidentally shows a small radiolucent shadow at the cardiophrenic angle consistent with a benign pericardial fat pad.',
      correctAction: 'No intervention needed; a benign incidental finding requiring no follow-up.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pleff_2',
      title: 'Mild Reactive Lymphadenopathy on Ultrasound',
      description: 'The chest ultrasound incidentally notes a few small, oval, hilar-region lymph nodes with preserved fatty hila.',
      correctAction: 'No specific action; reactive-appearing nodes in this context need no separate work-up beyond the diagnostic evaluation already under way.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pleff_3',
      title: 'Never Previously Tested for HIV',
      description: 'He has never been tested for HIV, a routinely offered test in every newly diagnosed presumptive tubercular illness in the Indian programme.',
      correctAction: 'Offer HIV testing as a standard part of the initial work-up rather than only if a specific risk factor is volunteered.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A young man is admitted breathless on exertion with a dry cough and a dull, aching right-sided chest discomfort, and on examination one side of his chest is stony dull with markedly reduced breath sounds.',
      consequenceOnRight: 'Supplemental oxygen is started for comfort and a chest film and ultrasound are arranged promptly to characterise the finding, rather than treating on the clinical impression alone.',
      consequenceOnWrong: 'He is treated empirically for a presumed ordinary chest infection without any imaging to characterise what is actually causing the dullness and reduced breath sounds.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'The chest film confirms a large fluid collection on one side, and the team must decide how to actually determine whether this fluid is the kind that leaks from a systemic problem or the kind produced locally by an inflamed surface.',
      consequenceOnRight: 'A sample of the fluid is obtained under ultrasound guidance and sent together with a paired serum sample, so that Light\'s criteria — the ratio of fluid to serum protein, and of fluid to serum LDH — can actually be calculated rather than guessed at from the clinical picture.',
      consequenceOnWrong: 'The fluid is assumed to be one type or the other from the clinical picture alone, and no sample is sent at all, leaving the actual cause unconfirmed.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The team is about to perform the diagnostic tap and must decide how to actually locate and enter the fluid collection safely.',
      consequenceOnRight: 'The tap is performed with real-time ultrasound guidance, marking a safe pocket immediately beforehand, which lowers the risk of accidentally entering the lung.',
      consequenceOnWrong: 'The tap is performed blind, using only percussion and surface landmarks, carrying a materially higher risk of puncturing the underlying lung and causing a pneumothorax.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'The fluid biochemistry comes back showing both ratios required by Light\'s criteria are met, and the cell count is dominated by one type of white cell with a markedly raised enzyme level often used as a marker in this setting.',
      consequenceOnRight: 'The lymphocyte-predominant exudate with a markedly raised ADA above the standard cut-off is recognised as strongly suggestive of a specific chronic infective cause in this setting, and presumptive treatment is started while culture or biopsy confirmation is still pending, rather than waiting weeks for a slow-growing result.',
      consequenceOnWrong: 'The result is treated as inconclusive and treatment is withheld until a slow-growing culture eventually returns, losing weeks of otherwise appropriate treatment for a presumptive diagnosis the biochemistry already supports strongly.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The collection is large enough to be draining therapeutically for symptom relief, and the team must decide how much fluid to remove and how quickly.',
      consequenceOnRight: 'Fluid is removed in controlled stages, limited per sitting and stopped sooner if he develops chest discomfort, cough or breathlessness during the procedure, allowing the compressed lung to re-expand gradually.',
      consequenceOnWrong: 'The entire collection is drained rapidly in one sitting for the fastest possible relief, risking the lung re-expanding too quickly and precipitating a dangerous fluid shift into it.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Shortly after a large-volume drainage, he develops a sudden dry cough, worsening breathlessness and a fall in his oxygen saturation.',
      consequenceOnRight: 'The picture is recognised as re-expansion of the lung against fluid shifting into it rather than a new, unrelated event, and further drainage is stopped immediately while he is supported with oxygen and monitored closely.',
      consequenceOnWrong: 'The new breathlessness is dismissed as expected post-procedure discomfort and drainage is continued or repeated at the same pace, worsening an evolving complication instead of recognising and stopping it.',
    },
  ],
};
