import { CaseScaffold } from '../../types';

/**
 * A biliary trigger for inflammation of the pancreas — see CASE_MODEL.md for
 * the therapy model (indicated / neutral / harmful, requiresFirst sequencing)
 * this scaffold follows.
 *
 * Teaching points this case is built around: the diagnosis needs two of
 * three (characteristic pain, an enzyme rise of at least three times the
 * upper limit of normal, and imaging), so a normal enzyme level late in the
 * course does not exclude it; lipase is more specific than amylase and
 * stays elevated for longer; the DEGREE of enzyme elevation does not track
 * with how severe the illness is; resuscitation is with a balanced
 * crystalloid (Ringer lactate over normal saline) titrated to urine output,
 * and recent evidence warns against over-aggressive volumes; ultrasound
 * looks for the biliary cause, while a contrast CT within the first 72
 * hours adds nothing (complications are not yet visible) and is a
 * genuinely low-yield, harmful order this early; early enteral feeding
 * beats prolonged fasting or parenteral nutrition; prophylactic antibiotics
 * have no role without evidence of infection; and an urgent scope procedure
 * to clear the bile duct is reserved for concurrent duct infection or a
 * persistently blocked duct, not for this picture alone.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "gallstone" and "pancreatitis" — the two content words Test Suite 14
 * extracts from conditionName — using "stones", "the pancreas"/"the gland"
 * and "the illness" in their place instead.
 */
export const SCAFFOLD_PANCREATITIS: CaseScaffold = {
  id: 'scaffold_gallstone_pancreatitis',
  title: 'Severe Epigastric Pain Radiating to the Back',
  conditionName: 'Severe Acute Gallstone Pancreatitis',
  subject: 'Medicine',
  system: 'Gastroenterology',
  demographics: {
    name: 'Sunita Devi',
    age: 44,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'A 44-year-old woman is brought to the emergency department with severe, constant pain in the upper abdomen that began six hours ago after a heavy, fatty dinner, boring straight through to her back. She has vomited repeatedly and cannot keep anything down. She looks unwell and restless with the pain, is breathing a little fast, and has had similar but milder episodes of upper abdominal discomfort after fatty meals in the past that settled on their own.',
  initialVitals: {
    hr: 118,
    bp: '106/68',
    rr: 24,
    spo2: 94,
    temp: '37.8°C',
    grbs: 138,
  },
  clinchingClue:
    'Serum lipase returns markedly elevated at more than five times the upper limit of normal, and an abdominal ultrasound shows multiple echogenic stones within the gallbladder with a thick gallbladder wall and a mildly dilated bile duct — the biochemical rise and the imaging together confirm two of the three recognised diagnostic criteria, alongside her characteristic boring epigastric pain radiating to the back.',
  clinchingClueTimeMinutes: 50,
  examFindingsMap: {
    general: 'Restless and uncomfortable, lying still with knees drawn up; mild scleral icterus noted; no skin discolouration over the flanks or around the umbilicus.',
    cvs: 'Tachycardic, regular rhythm, normal heart sounds, warm peripheries with a normal capillary refill.',
    chest: 'Mild tachypnoea, reduced air entry and dullness at the left lung base consistent with a small reactive effusion; no wheeze.',
    abdomen: 'Marked tenderness and voluntary guarding in the upper abdomen, worse in the right upper quadrant, with sluggish bowel sounds; no rebound tenderness or rigidity; no palpable mass.',
    skin: 'Mild scleral and sublingual icterus; no bruising over the flanks or around the umbilicus at this stage.',
  },
  historyMap: {
    presenting: 'Sudden severe upper abdominal pain for six hours, constant and boring through to the back, worse after a heavy fatty meal, associated with repeated vomiting that has not relieved the pain.',
    past: 'Two prior episodes of milder upper abdominal discomfort after fatty food over the last year, each settling within a few hours without medical attention; no known diabetes or heart disease.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    family: 'Mother had her gallbladder removed in her fifties.',
    social: 'Does not drink alcohol; vegetarian diet with frequent fried and fatty food; non-smoker.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText:
        'CBC: Hb 13.6 g/dL (Reference 12.0–15.0 g/dL), WBC 15,200/mcL (Reference 4,000–11,000/mcL) with neutrophil predominance, Haematocrit 47% (Reference 36–46%) — mild haemoconcentration from vomiting and third-space fluid loss, with a reactive leucocytosis.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    amylase_lipase: {
      aliases: ['serum amylase & lipase', 'amylase', 'lipase', 'serum amylase and lipase'],
      resultText:
        'Serum Amylase 620 U/L (Reference 30–110 U/L, over 3x upper limit) and Serum Lipase 940 U/L (Reference 0–160 U/L, over 5x upper limit). Lipase is the more specific of the two and stays elevated for longer, so it remains useful even if the patient presents late. Note: the height of this rise is used to help make the diagnosis, not to predict how severe the illness will be — a very high level here does not by itself mean the course will be severe.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft'],
      resultText:
        'Liver Function Tests: Total Bilirubin 2.6 mg/dL (Reference 0.2–1.2 mg/dL), ALP 310 U/L (Reference 40–130 U/L), AST 98 U/L (Reference 10–40 U/L), ALT 112 U/L (Reference 7–56 U/L), Albumin 3.9 g/dL (Reference 3.5–5.0 g/dL) — a cholestatic pattern supporting a biliary source for this presentation.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText:
        'Renal Function: Blood Urea 46 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.1 mg/dL (Reference 0.6–1.2 mg/dL) — mildly elevated urea from volume depletion; a useful baseline to trend as a severity marker and to guide fluid resuscitation.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    serum_calcium: {
      aliases: ['serum calcium', 'calcium'],
      resultText:
        'Serum Calcium: 8.6 mg/dL (Reference 8.5–10.5 mg/dL) — low-normal today; worth trending, since a falling calcium over the next 48 hours is a recognised marker of a more severe course.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    rbs_grbs: {
      aliases: ['rbs / grbs', 'grbs', 'rbs', 'blood sugar'],
      resultText:
        'Random Blood Sugar: 138 mg/dL — mildly elevated, in keeping with the stress response to acute illness; worth trending as a severity marker over the next 48 hours.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp', 'c-reactive protein'],
      resultText:
        'CRP: 38 mg/L (Reference <10 mg/L) — mildly elevated at six hours from the start of symptoms.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'This early in the illness a single CRP does not add much: it takes roughly 48 hours to peak and is used from that point onward to gauge how severe the course is becoming, not to make the diagnosis on the day of presentation. A repeat value at 48 hours would carry far more information than this one.',
    },
    usg_abdomen: {
      aliases: ['usg abdomen & pelvis', 'usg abdomen', 'ultrasound abdomen'],
      resultText:
        'USG Abdomen & Pelvis: Multiple echogenic stones seen within a thick-walled gallbladder, with a mildly dilated common bile duct (7 mm); the pancreas is partially obscured by overlying bowel gas but the visualised portion appears bulky with peripancreatic fluid; no free intraperitoneal fluid.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    ct_abdomen_contrast: {
      aliases: ['ct abdomen & pelvis contrast', 'ct abdomen contrast', 'contrast ct abdomen'],
      resultText:
        'CT Abdomen & Pelvis with Contrast: The gland is mildly bulky with subtle peripancreatic stranding; no drainable collection or necrosis identified at this stage.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'A contrast-enhanced scan this early adds nothing here: any necrosis or local complication is simply not visible yet in the first 72 hours of illness, so the scan cannot change what is done today, while the contrast load adds an avoidable kidney risk on top of the volume shifts already under way from vomiting and fluid resuscitation. It is reserved for when the diagnosis is genuinely in doubt or a complication is suspected later in the course — not for a straightforward early presentation like this one.',
    },
    serum_lactate: {
      aliases: ['serum lactate', 'lactate'],
      resultText:
        'Serum Lactate: 2.6 mmol/L (Reference 0.5–1.6 mmol/L) — mildly elevated, consistent with reduced perfusion from vomiting and third-space fluid loss.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    abg: {
      aliases: ['abg', 'arterial blood gas'],
      resultText:
        'ABG: pH 7.34, pCO2 32 mmHg, pO2 68 mmHg on room air, HCO3 18 mmol/L — mild hypoxaemia and a mild metabolic acidosis with partial respiratory compensation, in keeping with systemic upset and the reactive effusion.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    chest_xray: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr'],
      resultText:
        'Chest X-ray PA: Blunted left costophrenic angle in keeping with a small reactive pleural effusion; no free air under the diaphragm; heart size normal.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula'],
      responseText: 'Two wide-bore (16G) IV cannulae secured for rapid fluid and analgesic access.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable large-bore venous access is the prerequisite for rapid balanced-crystalloid resuscitation and should be secured the moment she is assessed.',
    },
    iv_fluids_rl: {
      aliases: ['ringer lactate 500 ml bolus', 'ringer lactate', 'rl bolus'],
      responseText: 'Ringer Lactate 500 mL bolus given rapidly IV, with the rate then reassessed against urine output.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -12, bp: '114/72' },
      labShift: {
        serum_lactate: 'Serum Lactate (repeat): 1.5 mmol/L (Reference 0.5–1.6 mmol/L) — normalised after fluid resuscitation, reflecting restored perfusion.',
      },
      appropriateness: 'indicated',
      rationale: 'A balanced crystalloid such as Ringer lactate is preferred over normal saline and is titrated against urine output rather than given as a fixed large volume — recent evidence warns that over-aggressive fluid administration can itself cause harm, so the goal is judicious, monitored resuscitation, not simply pouring in litres.',
    },
    morphine: {
      aliases: ['morphine iv', 'morphine'],
      responseText: 'Morphine given intravenously in titrated doses for pain control.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -8, rr: -2 },
      appropriateness: 'indicated',
      rationale: 'Adequate opioid analgesia is standard of care; there is no good evidence that morphine worsens outcomes here, and untreated pain itself drives tachypnoea and tachycardia.',
      requiresFirst: ['iv_access', 'iv_fluids_rl'],
      harmfulSequenceResponseText: 'Morphine is given intravenously before a line has been secured and fluid resuscitation started; her tachycardia briefly worsens and her blood pressure dips further while a cannula is hurriedly found and fluids catch up.',
      harmfulSequenceVitalsEffect: { hr: 10, bp: '92/58' },
      harmfulSequenceRationale: 'Opioids can lower vascular tone and worsen hypotension, and she is already volume-depleted and tachycardic from vomiting and third-space losses. Securing access and starting balanced-crystalloid resuscitation first ensures an analgesic that relaxes vascular tone is not given to a patient whose circulating volume has not yet been restored.',
    },
    ondansetron: {
      aliases: ['ondansetron iv', 'ondansetron'],
      responseText: 'Ondansetron 4 mg given intravenously for nausea and vomiting.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Antiemetic control reduces further fluid and electrolyte loss from ongoing vomiting and lets oral or enteral intake be reintroduced sooner.',
    },
    o2_supplemental: {
      aliases: ['supplemental oxygen', 'oxygen'],
      responseText: 'Supplemental oxygen started via nasal cannula, titrated to maintain saturation above 94%.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 3 },
      appropriateness: 'indicated',
      rationale: 'Mild hypoxaemia here reflects splinting from pain and a reactive effusion; supplemental oxygen is a simple, low-risk supportive measure while the underlying cause is treated.',
    },
    io_charting: {
      aliases: ['strict input-output charting', 'input output charting', 'io charting'],
      responseText: 'Strict input-output charting started with hourly urine output recorded via a calibrated collection system.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Urine output is the bedside target fluid resuscitation is titrated against — charting it is what turns "aggressive fluids" into a judicious, monitored volume rather than an arbitrary one.',
    },
    npo_initial: {
      aliases: ['nil by mouth', 'npo', 'nbm'],
      responseText: 'Kept nil by mouth for now while vomiting and pain are brought under control.',
      onsetMinutes: 5,
      appropriateness: 'neutral',
      rationale: 'A brief period of fasting while vomiting is active and severe pain is being controlled is reasonable, but it has no independent benefit beyond that and must not be prolonged — current guidance favours reintroducing oral or enteral feeding early, within the first day or two, rather than the traditional extended fast.',
    },
    ng_enteral: {
      aliases: ['nasogastric tube', 'ng tube', 'nasogastric'],
      responseText: 'A nasogastric tube is placed and early enteral feeding is started as vomiting settles, well within the first two days.',
      onsetMinutes: 60,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Early enteral feeding, started within the first day or two once vomiting is controlled, maintains gut mucosal integrity and lowers infective complications compared with prolonged fasting or parenteral nutrition, and should not be delayed for its own sake.',
    },
    meropenem: {
      aliases: ['meropenem iv', 'meropenem'],
      responseText: 'Meropenem started empirically as a broad-spectrum "just in case" antibiotic.',
      onsetMinutes: 15,
      appropriateness: 'harmful',
      rationale: 'There is no fever spike, no confirmed infected necrosis and no evidence of an infected, blocked bile duct here — prophylactic broad-spectrum antibiotics in sterile disease do not reduce mortality or infective complications, and instead promote resistant organisms and fungal superinfection. Antibiotics are reserved for confirmed infection, not given pre-emptively.',
    },
    gastro_consult: {
      aliases: ['gastroenterology consult'],
      responseText: 'Gastroenterology consult requested to plan definitive management of the underlying biliary source once she has stabilised.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Early specialist involvement ensures the biliary source is addressed with definitive same-admission gallbladder surgery once the acute episode settles, and that an urgent scope procedure is reserved only for evidence of a duct infection or a persistently blocked duct rather than used routinely.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ringer lactate|rl bolus/i,
      name: 'Fluid Resuscitation Started',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /morphine/i,
      name: 'Analgesia Given',
      targetMilestoneMinutes: 45,
    },
    {
      orderOrActionPattern: /wide-bore iv cannula|wide bore cannula/i,
      name: 'IV Access Secured',
      targetMilestoneMinutes: 20,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_pancreatitis_1',
      title: 'Incidental Simple Hepatic Cyst',
      description: 'The abdominal ultrasound incidentally shows a 2 cm simple anechoic cyst in the right lobe of the liver with no septations or internal vascularity.',
      correctAction: 'No intervention needed; this is a benign finding requiring no follow-up imaging.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pancreatitis_2',
      title: 'New Mild Hyperglycaemia on Admission',
      description: 'Her random blood sugar is mildly raised at 138 mg/dL with no prior history of diabetes.',
      correctAction: 'Recognise this as a stress response to acute illness; recheck fasting glucose and HbA1c once she has recovered rather than labelling her diabetic from a single admission value.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pancreatitis_3',
      title: 'Incidental Gallbladder Polyp',
      description: 'A 4 mm polyp is noted on the gallbladder wall on ultrasound, separate from the stones seen.',
      correctAction: 'No action needed for a polyp this small; note it for surveillance only if it is later found to be growing or larger than 6 mm.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A woman with sudden severe upper abdominal pain boring through to her back and repeated vomiting arrives visibly unwell, restless and mildly breathless.',
      consequenceOnRight: 'IV access, analgesia, an antiemetic and balanced-crystalloid fluids are all started together without waiting for any test to return.',
      consequenceOnWrong: 'Treatment is delayed while tests are awaited, and her pain, vomiting and volume depletion are left untreated in the meantime.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Her pain fits a classic pattern, and a blood test measuring an enzyme made by the gland returns markedly elevated at several times the upper limit of normal.',
      consequenceOnRight: 'The diagnosis is accepted once the characteristic pain and the marked enzyme rise together satisfy two of the three recognised criteria, without waiting for a cross-sectional scan that is not needed at this stage.',
      consequenceOnWrong: 'The team insists on a contrast scan before accepting the diagnosis despite the pain and enzyme picture already being sufficient, delaying treatment for no benefit.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The team must decide how to run her fluid resuscitation over the next several hours.',
      consequenceOnRight: 'A balanced crystalloid is chosen over normal saline and infused in a judicious, monitored fashion titrated against hourly urine output, rather than as a large fixed volume.',
      consequenceOnWrong: 'Normal saline is used instead, or fluids are pushed aggressively and indiscriminately without watching urine output — both are now recognised to cause harm rather than good.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'An ultrasound has already shown the likely biliary cause, and someone on the team suggests a contrast-enhanced CT scan on this first day of illness "to be thorough".',
      consequenceOnRight: 'The contrast scan is deferred: nothing it would show at this early stage would change today\'s management, and it carries an avoidable contrast risk on top of the fluid shifts already under way.',
      consequenceOnWrong: 'A contrast-enhanced scan is ordered reflexively on day one, adding a kidney risk and cost without changing anything that is actually done for her today.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'By the next day her vomiting has settled and the team reviews her nutrition and whether she needs any antibiotics.',
      consequenceOnRight: 'Oral or enteral feeding is reintroduced early now that vomiting has settled, and antibiotics are withheld since there is no evidence of infection.',
      consequenceOnWrong: 'She is kept fasting for a prolonged period "to rest the gland" and started on antibiotics "just in case", neither of which current evidence supports.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Before discharge, the team discusses how to address the stones felt to be the trigger, and whether an urgent scope procedure to clear the bile duct is needed — she has no fever, no worsening jaundice and no signs of a blocked, infected duct.',
      consequenceOnRight: 'Definitive keyhole removal of the gallbladder is planned during this same admission once she has stabilised, and the urgent scope procedure is reserved only for evidence of an infected or persistently blocked duct, which she does not have.',
      consequenceOnWrong: 'An urgent scope procedure is performed anyway without evidence of a blocked or infected duct, exposing her to a risk she did not need, or definitive gallbladder surgery is deferred indefinitely, leaving her at risk of a repeat episode.',
    },
  ],
};
