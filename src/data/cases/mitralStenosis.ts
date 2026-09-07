import { CaseScaffold } from '../../types';

/**
 * Rheumatic narrowing of the left-sided inflow valve, presenting through
 * its irregular rhythm and the embolic risk that rhythm carries — see
 * CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 *
 * Teaching points this case is built around: recurrent, poorly-treated
 * childhood throat and joint symptoms as the classic Indian route into
 * this disease, decades before it declares itself; the examination triad
 * of a loud first heart sound, an opening snap, and a low-pitched
 * mid-diastolic murmur with presystolic accentuation — a component that is
 * itself LOST once atrial fibrillation supervenes, since it depends on
 * organised atrial contraction; that a SHORTER gap between the second
 * heart sound and the opening snap means a HIGHER left atrial pressure and
 * therefore MORE severe disease, not less; that atrial fibrillation here
 * is not just an incidental arrhythmia but the direct source of today's
 * transient neurological event, and that this specific combination —
 * significant narrowing plus atrial fibrillation, so-called "valvular AF"
 * — was excluded from every trial supporting the newer oral
 * anticoagulants, leaving a vitamin K antagonist as the guideline
 * anticoagulant of choice; that RATE CONTROL, not rate acceleration, is
 * the goal, because a faster ventricular rate shortens the diastolic
 * filling time available to cross the narrowed valve and can itself
 * precipitate pulmonary oedema; and balloon valvotomy with its two
 * absolute contraindications — a left atrial (appendage) clot and more
 * than mild leak of the same valve — plus unfavourable calcified
 * morphology as a relative one. Future pregnancy is flagged as poorly
 * tolerated by a valve this narrow (the physiological rise in heart rate
 * and plasma volume further shortens diastolic filling) without setting
 * this case inside a pregnancy itself.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "mitral" and "stenosis" — the two content words the schema validator
 * extracts from conditionName — describing the lesion instead as "the
 * affected valve", "a narrowed valve" or "the valve on the left side of
 * the heart".
 */
export const SCAFFOLD_MITRAL_STENOSIS: CaseScaffold = {
  id: 'scaffold_mitral_stenosis',
  title: 'Transient Weakness with an Irregular Heartbeat',
  conditionName: 'Mitral Stenosis',
  subject: 'Medicine',
  system: 'Cardiology',
  demographics: {
    name: 'Meena Yadav',
    age: 29,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'A 29-year-old woman is brought to the emergency department after a sudden episode of weakness affecting the left side of her face and arm that lasted under an hour and resolved completely before she arrived. For the past six weeks she has also noticed increasing breathlessness on exertion and an intermittent fluttering sensation in her chest. As a child she had several bouts of sore throat and joint pains that were never formally evaluated. She is married with two young children and works as a tailor.',
  initialVitals: {
    hr: 122,
    bp: '108/72',
    rr: 22,
    spo2: 94,
    temp: '36.9°C',
    grbs: 106,
  },
  clinchingClue:
    'Echocardiography shows thickened, restricted leaflets of the affected valve with a planimetered area of 0.9 cm² (severe defined as <1.0 cm²) and a pressure half-time corroborating a severely reduced opening, alongside marked enlargement of the chamber immediately behind it and a favourable morphology score for intervention, with no more than mild leak of the same valve — findings that, together with her new irregular rhythm and today\'s transient neurological event, place her in a severely narrowed, high embolic-risk group.',
  clinchingClueTimeMinutes: 100,
  examFindingsMap: {
    general: 'Alert and comfortable at rest, mildly breathless on walking to the examination couch; no cyanosis, no pallor.',
    cvs: 'Pulse irregularly irregular, counted at 96/min at the wrist but faster at 122/min on auscultation at the apex — a pulse deficit, meaning many beats are not reaching the radial artery and the wrist count under-represents her true rate. Loud first heart sound; a snapping extra sound heard shortly after the second heart sound (an opening snap), with a notably short gap between the two, in keeping with a high left atrial pressure. A low-pitched, rumbling mid-diastolic murmur is heard at the apex with the bell, patient in the left lateral position, in expiration; the presystolic accentuation classically described with this murmur is absent, as expected, since it depends on organised atrial contraction that her current irregular rhythm does not provide. No raised JVP, no peripheral oedema, no hepatomegaly at this time.',
    chest: 'Bilateral fine basal crepitations, mild, clearing partially on deep inspiration; no wheeze.',
    abdomen: 'Soft, non-tender, no organomegaly, bowel sounds normal.',
    neuro: 'On arrival, subjective weakness of the left face and arm, now fully resolved; power 5/5 throughout, no dysarthria, no facial asymmetry, no visual field deficit at the time of this examination.',
  },
  historyMap: {
    presenting: 'Six weeks of progressive exertional breathlessness and an intermittent fluttering sensation in the chest, culminating today in a sudden episode of left-sided facial and arm weakness lasting under an hour that resolved completely before arrival.',
    past: 'Recurrent sore throats and migratory joint pains as a child, never medically evaluated at the time; no heart disease diagnosed previously; no hypertension, no diabetes; no prior stroke or clotting disorder.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    family: 'Mother had similar breathlessness in her forties and died in her fifties of an unclear heart problem.',
    social: 'Married with two children; works as a tailor; non-smoker, non-drinker.',
  },
  investigationsMap: {
    ecg: {
      aliases: ['12-lead ecg', 'ecg', 'ekg', 'electrocardiogram', '12 lead electrocardiogram'],
      resultText:
        'ECG: Atrial fibrillation, ventricular rate 118–130/min, irregularly irregular, absent discrete P waves with a fibrillatory baseline. (The broad, notched P wave of left atrial enlargement classically described with this disease cannot be assessed now that atrial activity is disorganised.) No acute ischaemic changes.',
      turnaroundMinutes: 5,
      category: 'imaging',
      isIndicative: true,
    },
    echo: {
      aliases: ['2d echo', 'echo', 'echocardiogram', 'transthoracic echo', 'formal 2d echo', 'echocardiography'],
      resultText:
        'Transthoracic Echocardiogram: Thickened, restricted leaflets of the affected valve with doming in diastole; planimetered valve area 0.9 cm² (severe <1.0 cm²), pressure half-time 240 ms corroborating a severe gradient, mean transvalvular gradient 14 mmHg. Left atrium markedly enlarged at 52 mm. Mild subvalvular fibrosis; overall morphology score 6 of a possible 16 (favourable for a catheter-based widening procedure). No more than mild leak of the same valve. No thrombus seen in the visualised left atrium on this transthoracic study — a dedicated transoesophageal study would be needed to formally exclude a clot in the atrial appendage before any planned procedure.',
      turnaroundMinutes: 100,
      category: 'imaging',
      isIndicative: true,
    },
    cxr: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr', 'chest x ray', 'cxr pa'],
      resultText:
        'Chest X-ray PA: Straightening of the left heart border with a double density seen behind the cardiac silhouette on the frontal view, in keeping with marked enlargement of the chamber behind the affected valve. Prominent upper-zone pulmonary vasculature (cephalisation) with septal (Kerley B) lines at the bases, reflecting elevated pulmonary venous pressure. No pleural effusion.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 12.1 g/dL (Reference 12.0–15.5 g/dL), WBC 7,500/mcL (Reference 4,000–11,000/mcL), Platelets 260,000/mcL (Reference 150,000–450,000/mcL) — unremarkable.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests'],
      resultText:
        'Renal Function: Blood Urea 24 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.7 mg/dL (Reference 0.5–1.1 mg/dL) — normal; a useful baseline before starting anticoagulation.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile', 'coagulation profile pt inr'],
      resultText:
        'Coagulation Profile: PT 12.6 sec (Reference 11–13.5 sec), INR 1.0 (Reference 0.8–1.1), aPTT 29 sec (Reference 25–35 sec) — normal baseline, needed before starting a vitamin K antagonist and for future dose titration.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    tsh: {
      aliases: ['tsh', 'thyroid function tests', 'thyroid stimulating hormone'],
      resultText: 'TSH: 2.1 mIU/L (Reference 0.4–4.0 mIU/L) — normal, making thyrotoxicosis an unlikely driver of her new irregular rhythm.',
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
      yieldNote: 'She has no chest pain and her presentation is not suggestive of an acute coronary event; reasonable to check once, but it does not change management here.',
    },
    ct_brain: {
      aliases: ['ct brain', 'ct head', 'non-contrast ct brain', 'ct brain plain'],
      resultText: 'CT Brain (non-contrast): No acute haemorrhage and no established infarct. Appearances are non-specific and do not exclude a transient ischaemic event that has already resolved clinically.',
      turnaroundMinutes: 40,
      category: 'imaging',
      isIndicative: true,
    },
    carotid_doppler: {
      aliases: ['carotid doppler', 'carotid ultrasound'],
      resultText: 'Carotid Doppler: No significant plaque or stenosis in either carotid system; normal flow velocities.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'At 29, with an obvious cardiac rhythm problem and a narrowed heart valve already identified as a far more likely source for a clot, pursuing an atherosclerotic carotid cause adds little; it is not wrong to complete a stroke workup, but it should not be prioritised over the cardiac source already in view.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['iv access', 'iv cannula', 'wide bore cannula', 'two wide bore iv cannulae'],
      responseText: 'IV cannula secured for medications and blood draws.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Routine venous access on arrival for a patient with a transient neurological event and a new arrhythmia needing urgent workup.',
    },
    o2_supplemental: {
      aliases: ['supplemental oxygen', 'oxygen', 'o2'],
      responseText: 'Supplemental oxygen started via nasal cannula, titrated to maintain saturation above 94%.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 3 },
      appropriateness: 'indicated',
      rationale: 'Simple, low-risk supportive measure for her mild hypoxaemia from elevated pulmonary venous pressure.',
    },
    rate_control: {
      aliases: ['beta blocker', 'metoprolol', 'oral metoprolol', 'iv metoprolol', 'bisoprolol', 'digoxin'],
      responseText: 'Oral metoprolol started to control the ventricular response of her irregular rhythm.',
      onsetMinutes: 45,
      vitalsEffect: { hr: -22 },
      appropriateness: 'indicated',
      rationale: 'Slowing the ventricular rate lengthens the time available in diastole for blood to cross the narrowed valve, lowering left atrial pressure and easing her breathlessness far more reliably than any attempt to restore or speed her rhythm.',
    },
    anticoagulation_warfarin: {
      aliases: ['warfarin', 'oral anticoagulation', 'vitamin k antagonist', 'tab warfarin'],
      responseText: 'Oral anticoagulation with warfarin started, with a plan to titrate to a target INR of 2 to 3.',
      onsetMinutes: 180,
      appropriateness: 'indicated',
      rationale:
        'She has atrial fibrillation together with at least severe narrowing of this valve — so-called "valvular AF" — which carries a high thromboembolic risk, illustrated by today\'s transient event. Patients with moderate-to-severe disease of this valve were excluded from every trial that established the newer direct oral anticoagulants, and current guidelines specifically withhold that drug class here; a vitamin K antagonist, dose-titrated by INR, remains the guideline-endorsed choice.',
    },
    doac_apixaban: {
      aliases: ['apixaban', 'rivaroxaban', 'dabigatran', 'direct oral anticoagulant', 'doac'],
      responseText: 'A direct oral anticoagulant (apixaban) is started for stroke prevention instead of a vitamin K antagonist.',
      onsetMinutes: 30,
      appropriateness: 'harmful',
      rationale:
        'Patients with moderate-to-severe narrowing of this valve, like her, were excluded from every major trial of the direct oral anticoagulants, and current international atrial fibrillation guidelines specifically do not recommend this class of drug for exactly this combination. A vitamin K antagonist, titrated to an INR of 2 to 3, is the only guideline-endorsed oral anticoagulant for her situation.',
    },
    iv_atropine: {
      aliases: ['iv atropine', 'atropine', 'inj atropine'],
      responseText:
        'IV atropine is given after her radial pulse is counted at a deceptively slow 96/min. Because many beats are not reaching her wrist, her true rate — already fast — climbs further still, and her breathlessness worsens over the next few minutes.',
      onsetMinutes: 5,
      vitalsEffect: { hr: 24, spo2: -4 },
      appropriateness: 'harmful',
      rationale:
        'Her true heart rate was already fast; the radial pulse alone is an unreliable guide here because of the gap between the rate felt at the wrist and the true rate at the heart. A faster rate shortens the diastolic time available for the left atrium to empty across the narrowed valve, raising left atrial and pulmonary venous pressure and precipitating pulmonary oedema. What she needs is deliberate rate CONTROL, not rate acceleration — the apical rate or a monitor strip should be trusted over the wrist count before any rate-affecting drug is chosen.',
    },
    electrical_cardioversion: {
      aliases: ['electrical cardioversion', 'dc cardioversion', 'synchronised cardioversion', 'synchronized cardioversion', 'cardioversion'],
      responseText: 'Electrical cardioversion is performed; sinus rhythm is briefly restored before reverting to her irregular rhythm within the hour, given how enlarged the chamber behind her valve has become.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -30 },
      appropriateness: 'neutral',
      rationale:
        'With a chamber this enlarged from longstanding rheumatic change, restoring and sustaining a normal rhythm is unlikely to succeed, so ongoing rate control — not a rhythm-restoring procedure — remains her primary long-term strategy; attempting it is not automatically wrong, but it adds little on its own.',
      requiresFirst: ['anticoagulation_warfarin'],
      harmfulSequenceResponseText:
        'Electrical cardioversion is performed before any anticoagulation has been established. Two hours later she develops sudden weakness of the right arm and leg — a new embolic stroke, from a clot dislodged the moment organised contraction of the atrium resumed.',
      harmfulSequenceVitalsEffect: { hr: 10 },
      harmfulSequenceRationale:
        'Cardioverting an irregular rhythm of unknown or prolonged duration in a dilated, poorly-contracting atrium carries a real risk of dislodging an existing or forming clot the instant organised atrial contraction resumes. Guidelines require either several weeks of therapeutic anticoagulation beforehand, or urgent transoesophageal imaging to exclude a clot immediately before the procedure — anticoagulation established first is what makes the procedure safe, not something to arrange afterwards.',
    },
    bmv_referral: {
      aliases: ['balloon mitral valvotomy', 'bmv', 'percutaneous balloon valvotomy', 'balloon valvuloplasty'],
      responseText: 'Referral placed for a catheter-based balloon procedure to widen the narrowed valve.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale:
        'She is symptomatic with a severely narrowed, favourably-shaped valve, no more than mild leak of that same valve, and — pending formal transoesophageal exclusion — no clot seen so far: exactly the profile this catheter-based procedure suits. The two absolute contraindications are a clot in the atrium or its appendage and more than mild leak of the same valve; a heavily calcified, poorly mobile valve counts against it too. Any one of those would mean open surgical repair or replacement instead.',
    },
    secondary_prophylaxis: {
      aliases: ['benzathine penicillin', 'secondary prophylaxis', 'im benzathine penicillin g', 'penicillin prophylaxis'],
      responseText: 'Monthly intramuscular benzathine penicillin G started for secondary prevention of further throat-infection-triggered valve damage.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Ongoing prophylaxis against the streptococcal throat infections that originally triggered this valve damage reduces the risk of further scarring with each recurrence, and is recommended for years — often well into adulthood — once valve involvement like hers is confirmed.',
    },
    neurology_consult: {
      aliases: ['neurology consult'],
      responseText: 'Neurology consult requested to formally characterise her resolved neurological event and guide further workup.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'A transient focal neurological deficit deserves formal characterisation even once it has resolved, both to document it and to align the stroke workup with the cardiac source already emerging.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ct brain|ct head|non-contrast ct brain|ct brain plain/i,
      name: 'Neuroimaging to Exclude Haemorrhage',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /beta blocker|metoprolol|bisoprolol|digoxin/i,
      name: 'Rate Control Started',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /warfarin|oral anticoagulation|vitamin k antagonist/i,
      name: 'Anticoagulation Started',
      targetMilestoneMinutes: 240,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_ms_1',
      title: 'Multiple Dental Caries on Examination',
      description: 'Several carious teeth are noted on general examination, unrelated to her presenting complaint.',
      correctAction: 'Refer for dental assessment and treatment before any planned valve procedure, to reduce the risk of seeding the valve.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ms_2',
      title: 'Low Body Mass Index',
      description: 'Her body mass index is calculated at 17.8, below the healthy range, and has not been previously assessed.',
      correctAction: 'Screen for a nutritional cause and consider dietary counselling; unrelated to today\'s cardiac presentation.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ms_3',
      title: 'Overdue Cervical Cancer Screening',
      description: 'She has never had a cervical Pap smear or equivalent screening test performed.',
      correctAction: 'Recommend age-appropriate cervical cancer screening as part of routine preventive care, unrelated to today\'s presentation.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A young woman arrives with a transient episode of one-sided weakness that has already resolved, together with several weeks of breathlessness and an irregular, fluttering heartbeat.',
      consequenceOnRight: 'IV access, oxygen and continuous monitoring are started, and urgent neuroimaging plus a search for a cardiac source of embolism are pursued together rather than treating her resolved weakness as reassuring.',
      consequenceOnWrong: 'The resolved weakness is dismissed as anxiety since she looks well now, delaying the search for its cause.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Examination reveals an irregularly irregular pulse with a rate at the wrist noticeably slower than the rate heard at the chest, a loud first heart sound, a snapping extra sound just after the second heart sound, and a low rumbling murmur at the apex.',
      consequenceOnRight: 'This combination is recognised as pointing to a narrowed valve on the left side of the heart with a resulting irregular rhythm, and echocardiography is requested to define its severity and to look for a clot as the source of her transient weakness.',
      consequenceOnWrong: 'The findings are attributed to a benign flow murmur exaggerated by a fast heart rate, delaying the search for a structural cause and a clot.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Her rate at the wrist is initially counted as only modestly fast, noticeably slower than how unwell she looks, and a decision is needed about her heart rate.',
      consequenceOnRight: 'Her true rate is confirmed from the monitor or by listening at the chest rather than trusting the wrist count alone, and a rate-slowing drug is chosen to lengthen the time available each beat for blood to cross the narrowed valve.',
      consequenceOnWrong: 'A rate-accelerating drug is given based on the falsely slow wrist count, pushing her already-fast true heart rate higher and worsening her breathlessness.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'With a narrowed valve and an irregular rhythm confirmed, and today\'s transient weakness already suggesting a possible clot, the team must choose a long-term anticoagulant for stroke prevention.',
      consequenceOnRight: 'A vitamin K antagonist is chosen and dose-titrated to a monitoring target, recognising that this specific combination of a significantly narrowed valve and an irregular rhythm was excluded from every trial supporting the newer oral anticoagulants.',
      consequenceOnWrong: 'A newer, once-daily oral anticoagulant is started instead — a combination current guidelines specifically do not support for her.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'The team discusses two possible procedures for her: shocking her heart back into a regular rhythm, and a catheter-based procedure to widen the narrowed valve itself.',
      consequenceOnRight: 'Anticoagulation is confirmed as already established before any attempt to shock her heart back into rhythm, since dislodging a forming clot at that moment is a real risk; and the valve-widening procedure is confirmed appropriate only because no clot and no more than mild leak of the same valve have been found — either one would have ruled it out.',
      consequenceOnWrong: 'Her heart is shocked back into rhythm without first establishing anticoagulation, or the valve-widening procedure is pursued despite an unexcluded clot, either of which is a recognised, serious hazard.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before she is discharged, the team plans how to prevent further damage to her heart valve and to reduce her risk of another event like today\'s.',
      consequenceOnRight: 'Long-term monthly antibiotic prophylaxis is arranged to prevent further throat-infection-triggered valve damage, her contraception and future pregnancy plans are discussed given how poorly a pregnancy\'s added strain on heart rate and blood volume would be tolerated by a valve this narrow, and she is counselled on symptoms warranting urgent return.',
      consequenceOnWrong: 'She is discharged with no plan for ongoing antibiotic prevention and no discussion of the risks a future pregnancy would carry, leaving her exposed to further valve damage and an unplanned high-risk pregnancy.',
    },
  ],
};
