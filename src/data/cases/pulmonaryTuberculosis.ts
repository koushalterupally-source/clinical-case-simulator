import { CaseScaffold } from '../../types';

/**
 * A chronic cough with constitutional symptoms in the Indian setting — see
 * CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 *
 * Teaching points this case is built around: cough for two weeks or more
 * with evening rise of temperature and weight loss is the presumptive
 * definition that should trigger testing; CBNAAT (Xpert MTB/RIF) — not
 * sputum smear alone — is the NTEP first-line diagnostic test, because it
 * is far more sensitive than smear microscopy and reports rifampicin
 * resistance in the same two-hour run, flagging drug-resistant disease at
 * the very first test rather than after weeks of failed first-line
 * treatment; a smear can still be sent alongside it but must never be
 * treated as sufficient on its own; airborne (droplet-nuclei) isolation and
 * proper sputum collection are early-priority actions, not afterthoughts,
 * because an undiagnosed productive cougher is a transmission risk to the
 * whole ward from the moment he is admitted; starting empirical ATT before
 * any sample is sent is a genuine, gradable error — it can never be
 * "confirmed" microbiologically afterwards and, if he is one of the
 * minority with rifampicin resistance, first-line therapy will simply fail
 * while he keeps transmitting; the NTEP daily weight-band FDC regimen
 * (8 weeks of 4-drug HRZE, then 16 weeks of 3-drug HRE) is dosed by weight
 * band, not a flat adult dose; pyridoxine is co-administered with isoniazid
 * to prevent peripheral neuropathy; and a baseline LFT is checked before
 * starting three hepatotoxic drugs together. A rifampicin-resistant CBNAAT
 * result is modelled as a genuine branch point the case can raise, forcing
 * the choice between continuing first-line ATT and referring for a
 * drug-resistant-TB regimen instead.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "pulmonary" and "tuberculosis" (conditionName's content words) — using
 * "the chest", "the lungs" and "the illness" in their place instead, and
 * never say "TB" either, for the same reason.
 */
export const SCAFFOLD_PULMONARY_TB: CaseScaffold = {
  id: 'scaffold_pulmonary_tb',
  title: 'Cough for Three Weeks with Evening Fever and Weight Loss',
  conditionName: 'Pulmonary Tuberculosis',
  subject: 'Medicine',
  system: 'Respiratory',
  demographics: {
    name: 'Ram Bahadur Thapa',
    age: 34,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 34-year-old man is admitted with a cough productive of whitish sputum for three weeks, associated with a rise in temperature almost every evening and drenching night sweats. He has lost close to six kilograms of weight over the past month and describes poor appetite throughout. He mentions one episode of streaking blood in the sputum two days ago. He works as a daily-wage labourer and lives in a crowded rented room with three other men, one of whom was treated for a similar prolonged cough about a year ago. He looks thin and unwell but is able to talk in full sentences.',
  initialVitals: {
    hr: 104,
    bp: '108/70',
    rr: 22,
    spo2: 96,
    temp: '38.4°C',
    grbs: 96,
  },
  clinchingClue:
    'CBNAAT (Xpert MTB/RIF) performed on a spot sputum sample detects Mycobacterium tuberculosis with a low bacillary load, and rifampicin resistance is not detected — confirming the diagnosis microbiologically within two hours and, just as importantly, telling the team the first-line regimen will actually work before a single dose is given.',
  clinchingClueTimeMinutes: 90,
  examFindingsMap: {
    general: 'Thin, cachectic-looking man, temperature 38.4°C, mild pallor, no icterus, no lymphadenopathy; BMI approximately 17.',
    cvs: 'Tachycardic, regular rhythm, normal heart sounds, no murmurs.',
    chest: 'Reduced air entry with coarse crepitations in the right upper zone posteriorly; no wheeze; trachea central.',
    abdomen: 'Soft, non-tender, no organomegaly, bowel sounds normal.',
    cns: 'Alert, oriented, no focal neurological deficit.',
  },
  historyMap: {
    presenting: 'Cough with whitish sputum for three weeks, near-daily evening rise in temperature, drenching night sweats, appetite loss and unintentional weight loss of about six kilograms over one month; one episode of blood-streaked sputum two days ago; no chest pain, no breathlessness at rest.',
    past: 'No previous similar illness, no known diabetes, no known HIV status (never tested), no prior contact with the health system for this.',
    medications: 'No regular medications; occasional over-the-counter cough syrup with no relief.',
    allergies: 'No known drug allergies.',
    family: 'No family members with a similar illness; not aware of anyone in the family being treated for a chest infection.',
    social: 'Works as a daily-wage construction labourer; lives in a shared, poorly ventilated rented room with three other men, one of whom completed treatment for a prolonged cough roughly a year ago; smokes about eight bidis a day for 15 years; drinks alcohol occasionally; no injecting drug use.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 10.8 g/dL (Reference 13.0–17.0 g/dL), WBC 9,600/mcL (Reference 4,000–11,000/mcL) with a mild lymphocytosis, Platelets 410,000/mcL (Reference 150,000–450,000/mcL) — a normocytic anaemia of chronic disease and a mildly reactive count, in keeping with a subacute infective illness rather than pointing to any single diagnosis on its own.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    lft_baseline: {
      aliases: ['lft', 'liver function tests', 'baseline lft'],
      resultText:
        'Liver Function Tests: Total Bilirubin 0.7 mg/dL (Reference 0.2–1.2 mg/dL), AST 28 U/L (Reference 10–40 U/L), ALT 24 U/L (Reference 7–56 U/L), ALP 88 U/L (Reference 40–130 U/L), Albumin 3.4 g/dL (Reference 3.5–5.0 g/dL) — normal liver enzymes with a mildly low albumin from chronic illness; a clean baseline before starting a regimen built on three hepatotoxic drugs together, and the reference point any later derangement will be judged against.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests'],
      resultText:
        'Renal Function: Blood Urea 26 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.8 mg/dL (Reference 0.6–1.2 mg/dL) — normal, adequate for standard weight-band dosing.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: true,
    },
    hiv_test: {
      aliases: ['hiv test', 'hiv elisa', 'hiv screening'],
      resultText:
        'HIV Rapid Test: Non-reactive.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    rbs_grbs: {
      aliases: ['rbs / grbs', 'grbs', 'rbs', 'blood sugar', 'random blood sugar'],
      resultText: 'Random Blood Sugar: 96 mg/dL — normal, no evidence of undiagnosed diabetes, which would otherwise be a risk factor worth screening for in a new diagnosis like his.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    sputum_afb_smear: {
      aliases: ['sputum afb smear', 'afb smear', 'sputum smear', 'ziehl-neelsen stain', 'sputum for afb'],
      resultText:
        'Sputum AFB Smear (Ziehl-Neelsen, spot sample): 1+ acid-fast bacilli seen per field (scanty-to-moderate). Smear microscopy is quick and cheap but detects only about half of active cases and, unlike CBNAAT, gives no information at all about drug resistance — a negative smear here would not have ruled anything out.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: true,
    },
    chest_xray: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr', 'chest x ray', 'cxr pa'],
      resultText:
        'Chest X-ray PA: Patchy heterogeneous opacities with a few thin-walled cavities in the right upper zone; no pleural effusion; heart size normal. Appearances are suggestive but not diagnostic on their own — a normal or atypical film never excludes the diagnosis, and an abnormal one never confirms it without a microbiological sample.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    esr: {
      aliases: ['esr', 'erythrocyte sedimentation rate'],
      resultText: 'ESR: 62 mm/hr (Reference <20 mm/hr) — non-specifically elevated, in keeping with a chronic infective or inflammatory process; it does not distinguish this from several other chronic chest illnesses and does not change what is done next.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A raised ESR only tells you something chronic and inflammatory is going on — it is not specific enough to secure this diagnosis or to be trended in place of an actual microbiological sample. Time and effort here is better spent chasing the sputum result.',
    },
    sputum_culture_dst: {
      aliases: ['sputum culture', 'mgit culture', 'sputum culture dst', 'culture and sensitivity sputum'],
      resultText:
        'Sputum Liquid Culture (MGIT) with Drug Susceptibility Testing: Sent; culture takes 2–6 weeks to grow even in a rapid liquid system, so this cannot guide today\'s decision to start treatment. Pending.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'Culture is the reference standard and is worth sending for banking and full first-line susceptibility testing, but its result will not be back for weeks — it cannot be waited for before starting treatment once CBNAAT has already confirmed the diagnosis and rifampicin susceptibility.',
    },
    ct_thorax_contrast: {
      aliases: ['ct thorax contrast', 'ct chest contrast', 'contrast ct thorax'],
      resultText:
        'CT Thorax with Contrast: Confirms cavitating consolidation in the right upper lobe with tree-in-bud nodularity, already well seen on the plain film. No additional finding here changes management.',
      turnaroundMinutes: 75,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'A contrast CT adds radiation and cost without changing anything: the plain chest film already showed the cavitating disease clearly enough to proceed, and the diagnosis is confirmed on CBNAAT, not on cross-sectional imaging. It also delays getting him promptly isolated and sampled by tying up time in the scanner queue.',
    },
  },
  therapiesMap: {
    airborne_isolation: {
      aliases: ['airborne isolation precautions', 'airborne isolation', 'droplet nuclei precautions', 'isolate patient', 'negative pressure isolation', 'n95 precautions'],
      responseText: 'The patient is moved to an airborne-isolation area (or, where unavailable, a well-ventilated single space) and staff and visitors are asked to use N95 respirators; he is given a surgical mask and taught cough etiquette.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'A productive cougher with an undiagnosed chronic chest illness is a transmission risk to every other patient and staff member on an open ward from the moment he is admitted — airborne precautions are started on clinical suspicion, before any test result, not after confirmation.',
    },
    cbnaat_sputum: {
      aliases: ['send cbnaat', 'cbnaat', 'xpert mtb/rif', 'gene xpert', 'cbnaat sputum', 'xpert mtb rif sputum'],
      responseText: 'A spot sputum sample is collected under supervision in a well-ventilated area and sent for CBNAAT (Xpert MTB/RIF). Result: Mycobacterium tuberculosis detected, low bacillary load; rifampicin resistance not detected.',
      onsetMinutes: 90,
      appropriateness: 'indicated',
      rationale: 'CBNAAT is the NTEP first-line diagnostic test for presumptive disease like his — far more sensitive than smear microscopy — and it reports rifampicin resistance in the same run, which is the single most important thing to know before committing him to a regimen: starting first-line drugs on someone with resistant disease would fail treatment while he continues to transmit.',
    },
    empirical_att_no_sample: {
      aliases: ['start att empirically', 'empirical att', 'start att without sample'],
      responseText: 'The standard four-drug regimen is started today on clinical and radiological suspicion alone, without waiting for a sputum sample to be sent.',
      onsetMinutes: 15,
      appropriateness: 'harmful',
      requiresFirst: ['cbnaat_sputum'],
      harmfulSequenceResponseText: 'The four-drug regimen is started before any sputum sample has been collected. Days later the CBNAAT eventually sent shows rifampicin resistance — he has been on a first-line regimen that was never going to work, has continued to transmit an undiagnosed drug-resistant illness on the ward in the meantime, and now needs to be started over on a different regimen after the delay.',
      harmfulSequenceVitalsEffect: { temp: '38.6°C' },
      harmfulSequenceRationale: 'Once treatment is started, a sputum sample can no longer reliably confirm the diagnosis or detect resistance — the drugs already suppress the bacillary load. A sample must always be sent before the first dose is given, both to confirm the diagnosis microbiologically and, critically, to know whether the regimen about to be started will actually work.',
      rationale: 'Treatment should never be started on suspicion alone when a same-day molecular test can confirm the diagnosis and screen for rifampicin resistance first — this is exactly the error CBNAAT was introduced to prevent.',
    },
    att_weight_band_regimen: {
      aliases: ['start att', 'start att (ntep weight-band regimen)', 'att regimen', 'anti tubercular therapy', 'ntep att'],
      responseText: 'CBNAAT already confirms the diagnosis with no rifampicin resistance, so the standard NTEP daily weight-band regimen is started: at his weight (58 kg, the 50–64 kg band) this is four tablets of the 4-drug FDC (isoniazid 75 mg + rifampicin 150 mg + pyrazinamide 400 mg + ethambutol 275 mg per tablet) daily for the 8-week intensive phase, to be followed by four tablets of the 3-drug FDC (isoniazid 75 mg + rifampicin 150 mg + ethambutol 275 mg per tablet) daily for the 16-week continuation phase.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      requiresFirst: ['cbnaat_sputum'],
      harmfulSequenceResponseText: 'The weight-band regimen is started before the CBNAAT sample has been sent, so it is really the same error as starting empirically: the chance to confirm both the diagnosis and rifampicin susceptibility before committing him to first-line drugs has already been lost.',
      harmfulSequenceRationale: 'Dosing is correct, but sequence is not — first-line therapy must never begin before a sample has been sent for CBNAAT, because that same sample is what confirms the drugs being started will actually work against his organism.',
      rationale: 'NTEP dosing is by weight band, not a flat adult dose, and is only started once the diagnosis is microbiologically confirmed and rifampicin resistance excluded — starting the right regimen at the right dose still depends on having sent the sample first.',
    },
    pyridoxine: {
      aliases: ['pyridoxine', 'vitamin b6', 'inj pyridoxine', 'tab pyridoxine'],
      responseText: 'Pyridoxine 10 mg once daily is co-prescribed alongside the isoniazid-containing regimen.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Isoniazid can cause a peripheral neuropathy by depleting pyridoxine; co-administering it is standard practice with an isoniazid-containing regimen, and it is especially important here given his poor nutrition and alcohol use, both independent risk factors for the neuropathy.',
    },
    lft_monitoring_baseline: {
      aliases: ['baseline lft before att', 'check baseline lft'],
      responseText: 'Baseline liver function is checked before the first dose and a plan is made to recheck if he develops nausea, vomiting, abdominal pain or jaundice during treatment.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'Isoniazid, rifampicin and pyrazinamide are each independently hepatotoxic and are about to be given together — a clean baseline is checked before starting so that any later derangement can actually be recognised as a change, and monitoring is then driven by symptoms rather than by a fixed calendar.',
    },
    nutritional_support: {
      aliases: ['nutritional counselling', 'nutritional support', 'dietary counselling'],
      responseText: 'Nutritional counselling is given and he is registered for the government nutritional support benefit available to notified patients.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'He is significantly underweight with ongoing weight loss; undernutrition both increases his risk of a poor treatment outcome and is itself worsened by the illness, so nutritional support is addressed alongside drug treatment, not left for later.',
    },
    contact_tracing_notification: {
      aliases: ['contact tracing', 'notify case', 'household contact screening'],
      responseText: 'The diagnosis is notified as required, and his household and workplace contacts are listed for screening, since he shares a room with three other men.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Notification is a legal requirement in India for every diagnosed case, and screening close contacts — especially those sharing his poorly ventilated room — is how a second case is caught early rather than found only after it has progressed.',
    },
    broad_spectrum_antibiotics: {
      aliases: ['iv ceftriaxone', 'ceftriaxone', 'amoxiclav', 'broad spectrum antibiotics'],
      responseText: 'A course of broad-spectrum antibiotics is given empirically for "a chest infection" without waiting for the sputum result.',
      onsetMinutes: 20,
      appropriateness: 'harmful',
      rationale: 'A three-week history with evening fever, weight loss and cavitating changes on the film is not the picture of an ordinary bacterial pneumonia, and treating it as one delays the specific test and specific treatment he actually needs while giving him no benefit — it also risks masking or confusing the picture if repeat cultures are later sent.',
    },
    dexamethasone_empirical: {
      aliases: ['iv dexamethasone', 'dexamethasone', 'empirical steroids'],
      responseText: 'Intravenous dexamethasone is given empirically for the fever and general unwellness.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -6 },
      appropriateness: 'harmful',
      rationale: 'There is no indication for steroids in straightforward disease confined to the lung — they have a defined, narrow role in specific complications (such as involvement around the brain or heart) and giving them here, before a diagnosis is even confirmed, can blunt the inflammatory response that makes the illness clinically obvious without treating the underlying cause at all.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /airborne isolation|isolate patient|n95/i,
      name: 'Airborne Isolation Started',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /cbnaat|xpert/i,
      name: 'Sputum Sample Sent for CBNAAT',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /start att|att regimen|ntep att/i,
      name: 'Weight-Band ATT Started',
      targetMilestoneMinutes: 180,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_tb_1',
      title: 'Incidental Healed Rib Fracture',
      description: 'The chest X-ray incidentally shows an old, well-healed fracture of the right 7th rib with no acute tenderness on exam.',
      correctAction: 'No action needed; note it as an old finding unrelated to the current presentation.',
      status: 'unnoticed',
    },
    {
      id: 'inc_tb_2',
      title: 'Low BMI Discovered on Nutritional Assessment',
      description: 'His BMI works out to approximately 17, meeting criteria for undernutrition independent of the current illness.',
      correctAction: 'Register him for nutritional support alongside drug treatment rather than treating the weight loss as something that will resolve on its own once treatment starts.',
      status: 'unnoticed',
    },
    {
      id: 'inc_tb_3',
      title: 'Never Previously Tested for HIV',
      description: 'He has never been tested for HIV, a routinely offered test in every newly diagnosed case in the Indian programme regardless of perceived risk.',
      correctAction: 'Offer HIV testing as a standard part of the initial work-up, not only if a specific risk factor is volunteered.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A thin, unwell-looking man on an open ward has been coughing for three weeks with near-daily evening fever and drenching night sweats, and one episode of blood-streaked sputum.',
      consequenceOnRight: 'He is placed on airborne precautions and a supervised sputum sample is collected on clinical suspicion alone, before any result is back.',
      consequenceOnWrong: 'He is left on the open ward without precautions while a full round of routine, non-specific blood tests is completed first, exposing everyone nearby in the meantime.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'A chest film has come back showing cavitating changes in the upper zone, and the team must decide what test actually confirms the diagnosis and tells them whether the standard drugs will work.',
      consequenceOnRight: 'A spot sputum sample is sent for CBNAAT, which detects the organism and reports on rifampicin resistance within about two hours, and this is what drives the decision to treat — not the appearance of the film alone.',
      consequenceOnWrong: 'The film is accepted as diagnostic on its own and no microbiological sample is ever sent, so the diagnosis is never confirmed and a resistant organism, if present, is never detected.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'The evening team wants to start treatment tonight so he does not lose another day, and asks whether that can happen before the sputum result is available.',
      consequenceOnRight: 'Treatment is held until the sample has actually been sent for CBNAAT — once started, drugs make later confirmation and resistance testing unreliable, so the order of events cannot be reversed.',
      consequenceOnWrong: 'The regimen is started tonight on suspicion alone "to not waste time," and if his organism later turns out to be rifampicin-resistant, the chance to know that before committing him to a regimen is already gone.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The report comes back positive for the organism, and before charting a regimen the team must decide what else on that same report has to be checked, and what dose to use.',
      consequenceOnRight: 'The rifampicin resistance result reported on the same test is checked and found negative before anything is charted — had it instead shown resistance, the standard four-drug regimen would need to be replaced with a drug-resistant-TB regimen rather than simply dosed as usual — and only then is the weight-band daily regimen charted correctly for his weight band, the 4-drug combination for the intensive phase followed by the 3-drug combination for the continuation phase, rather than a flat adult dose used for everyone regardless of weight.',
      consequenceOnWrong: 'The regimen is charted purely because the organism was detected, without checking the resistance result on the same report — a practice that would miss a resistant case and start a regimen doomed to fail — or a standard fixed adult dose is used without checking his weight band, risking under-dosing or needless toxicity.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'The regimen has been charted and the nursing staff ask whether anything else needs to be added alongside the isoniazid-containing combination before it is given.',
      consequenceOnRight: 'Pyridoxine is co-prescribed alongside the isoniazid-containing regimen to prevent a peripheral neuropathy, particularly relevant given his poor nutrition and alcohol use.',
      consequenceOnWrong: 'The regimen is given without pyridoxine, leaving him unprotected against a neuropathy that is easy to prevent but harder to treat once it has developed.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Before the first dose of three hepatotoxic drugs together is actually given, the team discusses what baseline blood work, if any, is worth sending first.',
      consequenceOnRight: 'A baseline liver function test is sent before the first dose, so that any derangement that develops later during treatment can be recognised against a known starting point rather than guessed at.',
      consequenceOnWrong: 'The regimen is started with no baseline liver test at all, so if he later develops deranged liver enzymes on treatment there is no way to know whether they were already abnormal before a single dose was given.',
    },
  ],
};
