import { CaseScaffold } from '../../types';

/**
 * Variceal upper GI bleed in a patient with chronic liver disease.
 *
 * The teaching point this case is built around: resuscitation must be
 * restrictive, not liberal — aggressive crystalloid or blood raises portal
 * pressure and provokes rebleeding, and a vasoactive drug plus antibiotic
 * prophylaxis belong before endoscopy, not after it.
 *
 * See src/data/cases/scaffolds.ts (scaffold_stemi) for the structural
 * exemplar and CASE_MODEL.md for the binding design spec that this file
 * follows.
 */
export const SCAFFOLD_VARICEAL_BLEED: CaseScaffold = {
  id: 'scaffold_variceal_bleed',
  title: 'Vomiting Blood in Emergency',
  conditionName: 'Variceal Upper GI Bleed in Cirrhosis',
  subject: 'Medicine',
  system: 'Gastroenterology',
  demographics: {
    name: 'Ravindra Deshmukh',
    age: 48,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 48-year-old male is rushed to the emergency room after two episodes of vomiting large volumes of fresh blood with clots this morning, along with two days of loose, black, tarry stools. He reports feeling light-headed on standing. He has consumed alcohol daily for many years.',
  initialVitals: {
    hr: 122,
    bp: '88/56',
    rr: 24,
    spo2: 96,
    temp: '37.1°C',
    grbs: 96,
  },
  clinchingClue:
    'Upper GI endoscopy shows three columns of large oesophageal varices with red wale signs and an adherent clot with active ooze at the gastro-oesophageal junction.',
  clinchingClueTimeMinutes: 20,
  examFindingsMap: {
    general:
      'Pale, icteric sclerae, multiple spider naevi over the chest and upper back, palmar erythema, gynaecomastia, mild flap of the outstretched hands (asterixis) on testing.',
    abdomen:
      'Distended with shifting dullness on percussion; liver edge firm, shrunken, and nodular; spleen palpable 3 cm below the costal margin.',
    cvs: 'Tachycardic, regular rhythm, thready peripheral pulses, marked postural drop in blood pressure on sitting up.',
    chest: 'Bilateral air entry equal, no crepitations.',
    neuro: 'Alert, oriented, no focal deficit; a coarse flap is elicitable at the wrists but no drowsiness.',
  },
  historyMap: {
    allergies: 'No known drug allergies.',
    past: 'Daily alcohol use for over 15 years; no documented prior gastrointestinal bleeding.',
    medications: 'No regular medications.',
    family: 'Non-contributory.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count'],
      resultText:
        'CBC: Hb 6.8 g/dL (Reference 13.0–17.0 g/dL), WBC 9,200/mcL (Reference 4,000–11,000/mcL), Platelets 88,000/mcL (Reference 150,000–450,000/mcL) — significant anaemia with thrombocytopenia.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft', 'liver function test'],
      resultText:
        'Liver Function Tests: Total Bilirubin 3.4 mg/dL (Reference 0.2–1.2 mg/dL), AST 98 U/L (Reference 10–40 U/L), ALT 62 U/L (Reference 7–56 U/L), Albumin 2.6 g/dL (Reference 3.5–5.0 g/dL) — hyperbilirubinaemia and hypoalbuminaemia consistent with impaired synthetic function.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile', 'coagulation panel', 'prothrombin time'],
      resultText:
        'Coagulation Profile: PT 19.5 sec (Reference 11–13.5 sec), INR 1.8 (Reference 0.8–1.1), aPTT 38 sec (Reference 25–35 sec) — prolonged, reflecting reduced hepatic synthesis of clotting factors rather than a discrete deficiency.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'renal function test', 'kidney function test'],
      resultText:
        'Renal Function: Blood Urea 68 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.1 mg/dL (Reference 0.6–1.2 mg/dL) — urea disproportionately raised relative to creatinine, consistent with a large digested blood load in the gut.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes', 'serum electrolytes', 'na k cl'],
      resultText:
        'Serum Electrolytes: Na+ 133 mEq/L (Reference 135–145 mEq/L), K+ 3.4 mEq/L (Reference 3.5–5.0 mEq/L), Cl- 96 mEq/L (Reference 96–106 mEq/L) — mild hyponatraemia and hypokalaemia.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    blood_group: {
      aliases: ['blood grouping & cross-match', 'blood group', 'cross match', 'type and crossmatch', 'blood grouping', 'grouping and crossmatch'],
      resultText: 'Blood Group: O Positive. Cross-match: 4 units packed red cells held, compatible.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    endoscopy: {
      aliases: ['upper gi endoscopy', 'endoscopy', 'ogd', 'upper gi scopy', 'egd'],
      resultText:
        'Upper GI Endoscopy: Three columns of large oesophageal varices with red wale signs; an adherent clot with active ooze noted at the gastro-oesophageal junction. No gastric or duodenal ulcer seen.',
      turnaroundMinutes: 20,
      category: 'procedures',
      isIndicative: true,
    },
    usg_abdomen: {
      aliases: ['usg abdomen & pelvis', 'usg abdomen', 'ultrasound abdomen', 'abdominal ultrasound'],
      resultText:
        'USG Abdomen & Pelvis: Liver coarse and shrunken in echotexture with an irregular surface; portal vein dilated to 14 mm; spleen enlarged at 15 cm; moderate ascites present.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    ammonia: {
      aliases: ['serum ammonia', 'ammonia', 'serum nh3'],
      resultText:
        'Serum Ammonia: 98 µmol/L (Reference 15–45 µmol/L) — elevated, in keeping with the large blood load being digested in the gut.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: true,
    },
    ascitic_fluid: {
      aliases: ['ascitic fluid analysis', 'ascites fluid analysis', 'sbp workup', 'diagnostic paracentesis', 'ascitic tap'],
      resultText:
        'Ascitic Fluid Analysis: Total protein 1.1 g/dL, Polymorphonuclear cell count 120 cells/mm3 (Reference <250 cells/mm3) — no evidence of spontaneous bacterial peritonitis at this count.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    troponin: {
      aliases: ['troponin i', 'troponin', 'cardiac enzymes'],
      resultText:
        'Troponin I: 0.02 ng/mL (Reference <0.04 ng/mL) — normal; not indicated in the absence of chest pain or ECG changes.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: false,
    },
    amylase_lipase: {
      aliases: ['serum amylase & lipase', 'amylase', 'lipase'],
      resultText:
        'Serum Amylase 62 U/L (Reference 30–110 U/L), Lipase 45 U/L (Reference 10–140 U/L) — normal; there is no clinical indication for pancreatic enzymes here.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: false,
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'large bore iv', 'iv cannula', 'large bore cannula', 'two iv lines'],
      responseText: 'Two large-bore IV cannulae secured for rapid volume and blood-product access.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale:
        'Reliable large-bore venous access is the first practical step in any major upper GI bleed, needed before transfusion, vasoactive drugs, or endoscopy can safely proceed.',
    },
    terlipressin: {
      aliases: ['terlipressin', 'iv terlipressin', 'inj terlipressin'],
      responseText: 'IV Terlipressin started before endoscopy.',
      onsetMinutes: 20,
      vitalsEffect: { bp: '96/62', hr: -8 },
      appropriateness: 'indicated',
      rationale:
        'A splanchnic vasoconstrictor such as terlipressin reduces portal pressure and bleeding, and should be started as soon as variceal bleeding is suspected, before endoscopy confirms it — waiting for confirmation delays a proven mortality benefit.',
    },
    octreotide: {
      aliases: ['octreotide infusion', 'octreotide', 'iv octreotide'],
      responseText: 'Octreotide infusion started as a splanchnic vasoconstrictor.',
      onsetMinutes: 20,
      vitalsEffect: { bp: '94/60', hr: -6 },
      appropriateness: 'indicated',
      rationale:
        'Octreotide is an acceptable alternative splanchnic vasoconstrictor to terlipressin where the latter is unavailable, and should likewise be started before endoscopy.',
    },
    ceftriaxone: {
      aliases: ['ceftriaxone 2 g iv', 'ceftriaxone', 'iv antibiotic', 'antibiotic prophylaxis', 'iv ceftriaxone'],
      responseText: 'IV Ceftriaxone 2 g given as antibiotic prophylaxis.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale:
        'Short-course antibiotic prophylaxis reduces mortality, rebleeding, and the risk of spontaneous bacterial peritonitis in a variceal bleed with underlying chronic liver disease — a high-yield point often missed in favour of purely haemostatic measures.',
    },
    prbc_restrictive: {
      aliases: ['packed red cells', 'prbc', 'packed red blood cells', 'blood transfusion', 'prbc transfusion', 'transfuse blood'],
      responseText: 'Packed red cells transfused using a restrictive strategy targeting a haemoglobin around 7–8 g/dL.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -18, bp: '106/68' },
      labShift: {
        cbc: 'CBC (repeat): Hb 8.1 g/dL (Reference 13.0–17.0 g/dL), Platelets 90,000/mcL (Reference 150,000–450,000/mcL) — improved with transfusion, restrictive target reached.',
      },
      appropriateness: 'indicated',
      rationale:
        'A restrictive transfusion strategy targeting Hb around 7–8 g/dL improves survival in a variceal bleed compared with liberal transfusion, which raises portal pressure and increases rebleeding risk.',
    },
    band_ligation: {
      aliases: ['endoscopic variceal band ligation', 'band ligation', 'variceal banding', 'egvl', 'evl'],
      responseText: 'Endoscopic variceal band ligation performed, achieving haemostasis at the bleeding varix.',
      onsetMinutes: 40,
      vitalsEffect: { hr: -10, bp: '112/70' },
      requiresFirst: ['iv_access'],
      harmfulSequenceResponseText:
        'Endoscopy attempted in an unresuscitated patient with no secure IV access; the patient becomes acutely more hypotensive during the procedure and it has to be abandoned.',
      harmfulSequenceVitalsEffect: { hr: 14, bp: '78/50', spo2: -4 },
      harmfulSequenceRationale:
        'Endoscoping an unresuscitated, unprotected patient without secure venous access risks aspiration of blood and cardiovascular collapse during the procedure; IV access and initial haemodynamic support must come first.',
      appropriateness: 'indicated',
      rationale:
        'Endoscopic band ligation is the definitive haemostatic procedure for bleeding oesophageal varices once the patient has been resuscitated enough to tolerate the procedure safely.',
    },
    pantoprazole: {
      aliases: ['pantoprazole infusion', 'pantoprazole', 'ppi infusion', 'iv pantoprazole', 'iv ppi'],
      responseText: 'IV Pantoprazole infusion started empirically.',
      onsetMinutes: 15,
      appropriateness: 'neutral',
      rationale:
        'A proton pump inhibitor is reasonable empirical cover before the bleeding source is confirmed, but once endoscopy confirms a variceal source it has no proven mortality benefit and is not definitive therapy.',
    },
    lactulose: {
      aliases: ['lactulose', 'oral lactulose'],
      responseText: 'Oral/rectal lactulose started.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale:
        'Digested blood in the gut is a large protein and ammonia load; lactulose reduces colonic ammonia absorption and helps prevent hepatic encephalopathy being precipitated after a large gastrointestinal bleed.',
    },
    balloon_tamponade: {
      aliases: ['balloon tamponade (sengstaken-blakemore)', 'balloon tamponade', 'sengstaken blakemore tube', 'sb tube'],
      responseText: 'Balloon tamponade tube placed as a temporising measure for ongoing uncontrolled bleeding.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -10, bp: '100/64' },
      appropriateness: 'neutral',
      rationale:
        'Balloon tamponade is a temporising bridge for uncontrolled bleeding awaiting definitive endoscopic or radiological therapy, not a definitive treatment itself, and it carries a real risk of aspiration and oesophageal rupture.',
    },
    ffp: {
      aliases: ['fresh frozen plasma', 'ffp', 'fresh frozen plasma transfusion'],
      responseText: 'Fresh frozen plasma transfused to correct the prolonged INR.',
      onsetMinutes: 45,
      appropriateness: 'neutral',
      rationale:
        'A raised INR in this setting reflects reduced hepatic synthetic function rather than a discrete, correctable coagulopathy; routine correction with FFP has not been shown to reduce bleeding and is not recommended as a routine measure.',
    },
    over_transfusion: {
      aliases: [
        'normal saline 30 ml/kg bolus',
        'aggressive fluid bolus',
        'large volume saline',
        'normal saline bolus 30',
        'normal saline',
        'iv fluids',
        'fluid bolus',
        'ns bolus',
        'crystalloid bolus',
        'iv fluid bolus',
        'normal saline 1 l bolus',
        'ns 1 litre',
      ],
      responseText:
        'A large-volume Normal Saline bolus (30 mL/kg) given rapidly; shortly afterward fresh haematemesis recurs.',
      onsetMinutes: 10,
      vitalsEffect: { hr: 10, bp: '104/50' },
      appropriateness: 'harmful',
      rationale:
        'Aggressive crystalloid volume expansion raises portal pressure and precipitates further variceal rebleeding; over-resuscitation is a real trap here — a restrictive, targeted approach is safer than replacing losses volume-for-volume.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /terlipressin|octreotide|vasoactive/i,
      name: 'Vasoactive Drug (Terlipressin/Octreotide)',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /ceftriaxone|antibiotic prophylaxis/i,
      name: 'Antibiotic Prophylaxis',
      targetMilestoneMinutes: 60,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_variceal_1',
      title: 'Incidental Umbilical Hernia',
      description:
        'Abdominal examination incidentally reveals a small, easily reducible umbilical hernia, non-tender, with no signs of obstruction.',
      correctAction: 'Elective surgical referral only after the acute bleeding episode is fully stabilised; no emergency intervention needed.',
      status: 'unnoticed',
    },
    {
      id: 'inc_variceal_2',
      title: 'Vitamin D Deficiency',
      description: 'Serum 25-Hydroxyvitamin D level is 9 ng/mL (Reference 30–100 ng/mL) — deficiency.',
      correctAction: 'Initiate oral cholecalciferol supplementation once the acute bleeding episode has resolved.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext:
        'Man arrives at the emergency room hypotensive and tachycardic after repeatedly vomiting large volumes of blood, with stigmata of chronic liver disease on examination.',
      consequenceOnRight: 'Large-bore access secured and volume resuscitation with blood products started promptly.',
      consequenceOnWrong: 'Resuscitation delayed; the patient develops worsening hypotension.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'Endoscopy is performed to identify the source of massive haematemesis in a patient with stigmata of chronic liver disease.',
      consequenceOnRight: 'Source of bleeding correctly identified and haemostatic therapy directed appropriately.',
      consequenceOnWrong: 'Source is misattributed to a peptic cause; targeted therapy is delayed.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext:
        'Endoscopy is being arranged for a patient with ongoing haematemesis who has not yet had intravenous access secured.',
      consequenceOnRight: 'IV access secured first; endoscopy proceeds safely once the patient is stabilised.',
      consequenceOnWrong: 'Endoscopy proceeds without secure access; the patient deteriorates acutely during the procedure.',
    },
    {
      roleTag: 'PHARM',
      patientContext:
        'Deciding on a fluid resuscitation strategy for a patient with ongoing gastrointestinal haemorrhage and known chronic liver disease.',
      consequenceOnRight: 'A restrictive transfusion strategy is used, avoiding a rise in portal pressure.',
      consequenceOnWrong: 'Aggressive volume replacement raises portal pressure and provokes further bleeding.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext:
        'Planning secondary prevention before discharge for a patient recovering from a major gastrointestinal haemorrhage related to chronic liver disease.',
      consequenceOnRight: 'Non-selective beta-blocker and repeat endoscopic surveillance arranged, with counselling on stopping alcohol.',
      consequenceOnWrong: 'Patient discharged without secondary prophylaxis, risking early rebleeding.',
    },
  ],
};
