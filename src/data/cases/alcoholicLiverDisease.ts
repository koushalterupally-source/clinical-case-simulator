import { CaseScaffold } from '../../types';

/**
 * Acute decompensation of long-standing alcohol-related chronic liver
 * disease, triggered by an infection within the ascitic fluid itself — see
 * CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 *
 * This is deliberately NOT withdrawal and NOT a bleed: the patient explicitly
 * has no tremor, agitation or hallucinations and has had no change in his
 * usual daily drinking (excluding `deliriumTremens.ts`), and he has no
 * haematemesis or melaena (excluding `varicealBleed.ts`). Read both of those
 * files before touching this one — the point of this case is decompensation
 * and the infection driving it, not either of those.
 *
 * Teaching points this case is built around: the recognised precipitants of
 * decompensation (infection, bleeding, constipation, dehydration, continued
 * drinking) should all be actively screened for rather than assumed; any
 * hospitalised patient with known ascites gets a diagnostic tap regardless of
 * how obvious another trigger looks, because more than one precipitant can
 * act together; the diagnostic threshold is an ascitic fluid polymorphonuclear
 * count over 250 cells/mm3; empirical antibiotics plus IV albumin (1.5 g/kg
 * on day 1, 1 g/kg on day 3) reduces renal impairment and mortality compared
 * with antibiotics alone; thiamine must be given before any glucose-containing
 * fluid in a long-term heavy drinker regardless of whether he is withdrawing;
 * lactulose (± rifaximin) treats the hepatic encephalopathy, titrated to 2–3
 * soft stools a day, and his five days of constipation is itself a
 * precipitant worth treating; dietary protein should NOT be restricted
 * (an outdated practice that worsens malnutrition without improving
 * encephalopathy); a non-selective beta-blocker is held while he is this
 * unwell and hypotensive; and secondary antibiotic prophylaxis is arranged
 * before discharge given the high one-year recurrence risk after a first
 * episode.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "spontaneous", "bacterial", "peritonitis", "alcohol", "related" and
 * "cirrhosis" — the content words Test Suite 14 extracts from conditionName —
 * using "heavy drinking", "liver disease", "the fluid" and "an infection"
 * in their place instead.
 */
export const SCAFFOLD_ALCOHOLIC_CLD: CaseScaffold = {
  id: 'scaffold_alcoholic_cld',
  title: 'Increasing Abdominal Swelling with New Drowsiness',
  conditionName: 'Spontaneous Bacterial Peritonitis in Alcohol-Related Cirrhosis',
  subject: 'Medicine',
  system: 'Gastroenterology',
  demographics: {
    name: 'Manoj Yadav',
    age: 52,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 52-year-old man with several years of heavy daily drinking is brought to the ward because his belly has been getting bigger over the past three weeks and, over the last two days, he has become increasingly drowsy and difficult to rouse, sleeping through most of the day. His wife says he had a mild fever yesterday and has been complaining of vague discomfort in his belly, though he has not vomited blood or passed black stools. He has not had any tremors, agitation or hallucinations, and has continued his usual daily drinks without any recent change; he also has not had a bowel movement in five days. On arrival he is jaundiced, drowsy but rousable to voice, and his belly looks visibly swollen.',
  initialVitals: {
    hr: 118,
    bp: '86/54',
    rr: 22,
    spo2: 95,
    temp: '38.4°C',
    grbs: 82,
  },
  clinchingClue:
    'Diagnostic paracentesis returns ascitic fluid with a polymorphonuclear leucocyte count of 620 cells/mm3 (the diagnostic threshold is any count over 250 cells/mm3) and a low ascitic protein, with a serum-ascites albumin gradient consistent with portal hypertension — together with his fever, new abdominal tenderness and worsening encephalopathy, confirming an infection within the ascitic fluid itself as the trigger for this decompensation in a man with long-standing heavy drinking and known liver disease.',
  clinchingClueTimeMinutes: 90,
  examFindingsMap: {
    general:
      'Jaundiced, drowsy but rousable to voice, oriented to person only; a coarse bilateral flap (asterixis) is elicited on outstretched arms; a faint sweetish, musty breath odour is noted; low-grade fever recorded.',
    cvs: 'Tachycardic, regular rhythm, warm peripheries with bounding pulses (a hyperdynamic circulation), normal heart sounds, no murmurs.',
    chest:
      'Mildly tachypnoeic; reduced air entry and dullness at both lung bases from the elevated diaphragm of tense ascites; no focal crepitations, no wheeze.',
    abdomen:
      'Grossly distended with a positive fluid thrill and shifting dullness; diffuse, mild tenderness on palpation with no rebound or guarding — the low-grade, diffuse tenderness expected from an infection confined to the fluid rather than a surgical abdomen; liver edge impalpable due to distension; bowel sounds sluggish.',
    cns:
      'Drowsy, oriented to person only and disoriented to time and place; bilateral asterixis present; no focal motor or sensory deficit; no neck stiffness; pupils equal and reactive — a picture consistent with grade II encephalopathy on the West Haven scale.',
  },
  historyMap: {
    presenting: 'Gradually increasing abdominal girth over three weeks, with new drowsiness and reduced oral intake over the last two days.',
    past: 'Known liver disease diagnosed at another hospital about a year ago after an admission for similar swelling; prescribed spironolactone and furosemide at that time but has not taken either for the last two months.',
    bowelHabit: 'No bowel movement in the last five days, against his usual daily pattern.',
    substanceUse: 'Reports drinking roughly 180–200 mL of spirits daily for more than 15 years, with no recent change in his usual pattern and no recent binge or attempted cutback.',
    medications: 'Spironolactone and furosemide prescribed a year ago, self-discontinued two months ago; no other regular medications.',
    allergies: 'No known drug allergies.',
    family: 'Non-contributory.',
    social: 'Vegetarian diet with poor appetite over recent months; non-smoker.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 9.8 g/dL (Reference 13.0–17.0 g/dL), WBC 16,400/mcL (Reference 4,000–11,000/mcL) with a neutrophilic left shift, Platelets 82,000/mcL (Reference 1.5–4.5 lakh/mcL) — anaemia and thrombocytopenia typical of long-standing liver disease with hypersplenism, on top of a reactive leucocytosis pointing to an active infective process.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft', 'liver function tests', 'liver function test'],
      resultText:
        'Liver Function Tests: Total Bilirubin 6.8 mg/dL (Reference 0.2–1.2 mg/dL), AST 110 U/L (Reference 10–40 U/L), ALT 48 U/L (Reference 7–56 U/L, AST:ALT ratio over 2 — typical of alcohol-related injury rather than a viral pattern), ALP 190 U/L, Albumin 2.4 g/dL (Reference 3.5–5.0 g/dL) — marked hyperbilirubinaemia with hypoalbuminaemia, both inputs needed for grading the severity of his liver disease.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile', 'coagulation panel', 'prothrombin time'],
      resultText:
        'Coagulation Profile: PT 21.4 sec (Reference 11–13.5 sec), INR 2.0 (Reference 0.8–1.1), aPTT 41 sec (Reference 25–35 sec) — markedly prolonged, reflecting reduced hepatic synthetic function; a required input for both his severity score and his bleeding risk before any invasive procedure.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests', 'renal function tests kft urea creatinine', 'rft kidney function tests urea creatinine'],
      resultText:
        'Renal Function: Blood Urea 58 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.3 mg/dL (Reference 0.6–1.2 mg/dL) — mildly elevated, worth trending closely: a rising creatinine on top of this infection is exactly the combination that can evolve into kidney failure if albumin is withheld.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    serum_electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'serum electrolytes', 'electrolytes', 'na k cl'],
      resultText:
        'Serum Electrolytes: Sodium 128 mEq/L (Reference 135–145 mEq/L, significant hyponatraemia), Potassium 3.6 mEq/L (Reference 3.5–5.0 mEq/L), Chloride 94 mEq/L — the low sodium both worsens his confusion independently and factors into his severity scoring.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    serum_ammonia: {
      aliases: ['serum ammonia', 'ammonia', 'serum nh3'],
      resultText: 'Serum Ammonia: 88 µmol/L (Reference 15–45 µmol/L) — elevated.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'Ammonia does not correlate well with how confused a patient actually is, and this diagnosis is made and staged clinically (the West Haven grade), not by this number — treat what you see at the bedside, not the level on the report.',
    },
    ascitic_fluid_analysis: {
      aliases: ['ascitic fluid analysis', 'ascites fluid analysis', 'diagnostic paracentesis', 'ascitic tap', 'tap the ascites', 'sbp workup'],
      resultText:
        'Ascitic Fluid Analysis: Polymorphonuclear leucocyte count 620 cells/mm3 (diagnostic threshold is >250 cells/mm3 — positive), Total Protein 0.9 g/dL, Ascitic Albumin 0.8 g/dL against a serum albumin of 2.4 g/dL, giving a Serum-Ascites Albumin Gradient of 1.6 g/dL (>1.1 g/dL is consistent with portal hypertension as the cause of the fluid); Gram stain shows no organisms (frequently negative even with true infection); fluid culture sent.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture ×2 (before antibiotics)', 'blood culture', 'blood cultures', 'blood culture before antibiotics'],
      resultText: 'Blood Culture ×2: Escherichia coli isolated, sensitive to third-generation cephalosporins — the most common organism responsible for this infection, consistent with gut bacteria translocating across the bowel wall.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: true,
    },
    urine_routine: {
      aliases: ['urine routine & microscopy', 'urine routine', 'urine microscopy', 'urine culture'],
      resultText: 'Urine Routine & Microscopy: No pus cells, no nitrites, no organisms seen — no evidence of a urinary source contributing to his fever.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    chest_xray: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr', 'chest x ray', 'cxr pa'],
      resultText: 'Chest X-ray PA: Bilateral blunting of the costophrenic angles from small reactive effusions related to his tense ascites; no focal consolidation; heart size normal — no chest source for his fever.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    usg_abdomen: {
      aliases: ['usg abdomen & pelvis', 'usg abdomen', 'ultrasound abdomen', 'abdominal ultrasound', 'ultrasound abdomen pelvis'],
      resultText:
        'USG Abdomen & Pelvis: Liver coarse and shrunken in echotexture with an irregular, nodular surface; spleen enlarged at 14 cm; portal vein dilated to 15 mm; moderate-to-severe ascites present. An incidental 1.8 cm simple anechoic cyst is noted in the right kidney, with no septations or wall thickening.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    hepatitis_serology: {
      aliases: ['hbsag', 'hepatitis b surface antigen', 'anti hcv', 'hepatitis serology', 'viral hepatitis screen'],
      resultText: 'Viral Hepatitis Screen: HBsAg negative, Anti-HCV negative.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: true,
      yieldNote:
        'Reasonable to screen for a coexisting viral cause even when heavy drinking is the obvious one, since more than one cause of liver disease can coexist — but a negative result here does not change anything done for him today.',
    },
    ct_abdomen_contrast: {
      aliases: ['ct abdomen & pelvis contrast', 'ct abdomen contrast', 'contrast ct abdomen'],
      resultText: 'CT Abdomen & Pelvis with Contrast: Nodular liver, splenomegaly and ascites — the same findings already seen on ultrasound, with nothing additional identified.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'A contrast-enhanced CT adds nothing here that the ultrasound has not already shown for straightforward ascites and liver assessment, while the contrast load is an avoidable kidney insult in a man whose renal reserve is already tenuous from this infection — exactly the setting in which a kidney injury can be tipped into something fixed rather than reversible.',
    },
    abg: {
      aliases: ['abg', 'arterial blood gas'],
      resultText: 'Arterial Blood Gas: pH 7.46, pCO2 30 mmHg, pO2 78 mmHg, HCO3 20 mmol/L on room air — a mild respiratory alkalosis with mild hypoxaemia, in keeping with tachypnoea and the bibasal effusions from his tense ascites.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    serum_vitamin_d: {
      aliases: ['vitamin d level', 'serum vitamin d', '25-hydroxyvitamin d'],
      resultText: 'Serum 25-Hydroxyvitamin D: 8 ng/mL (Reference 30–100 ng/mL) — deficient, common with his poor nutritional intake.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A low vitamin D level is common in long-standing liver disease and poor nutrition but does not change anything in his acute management; worth addressing once he has recovered.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'access', 'iv two wide bore cannulae', 'two wide bore cannulae'],
      responseText: 'Two IV cannulae secured for fluids, antibiotics and albumin.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is needed before antibiotics, albumin or thiamine can be given and should be one of the first things secured.',
    },
    iv_albumin_sbp: {
      aliases: ['iv albumin', 'albumin infusion', 'human albumin solution', '20% albumin', 'iv 20% albumin'],
      responseText: 'IV 20% human albumin given at 1.5 g/kg on day one, with a further 1 g/kg planned for day three.',
      onsetMinutes: 60,
      labShift: {
        kft: 'Renal Function (repeat): Blood Urea 42 mg/dL, Serum Creatinine 1.0 mg/dL — improved with volume expansion from albumin alongside treatment of the infection.',
      },
      appropriateness: 'indicated',
      rationale:
        'Adding IV albumin (1.5 g/kg on day 1, 1 g/kg on day 3) to antibiotic therapy for this infection has been shown to reduce the risk of the kidneys failing and to reduce mortality compared with antibiotics alone, and is now standard practice alongside antibiotics — particularly when bilirubin or creatinine is already elevated, as they are here.',
    },
    cefotaxime: {
      aliases: ['cefotaxime iv', 'cefotaxime', 'inj cefotaxime', 'iv cefotaxime'],
      responseText: 'IV Cefotaxime 2 g given every 8 hours.',
      onsetMinutes: 30,
      vitalsEffect: { temp: '37.6°C', hr: -6 },
      appropriateness: 'indicated',
      rationale:
        'A third-generation cephalosporin such as cefotaxime 2 g IV every eight hours is first-line empirical therapy for this infection, covering the gram-negative enteric organisms that most often cause it; treatment should be started as soon as the diagnosis is made on the ascitic fluid count, without waiting for the culture to grow.',
    },
    lactulose: {
      aliases: ['lactulose', 'oral lactulose', 'rectal lactulose enema'],
      responseText: 'Oral lactulose started, titrated to two to three soft stools a day.',
      onsetMinutes: 90,
      vitalsEffect: {},
      appropriateness: 'indicated',
      rationale:
        'Lactulose treats his encephalopathy by reducing colonic ammonia absorption and, just as importantly, corrects the constipation that has itself been a precipitant here (no bowel movement in five days) — clearing the bowel is part of the treatment, not incidental to it.',
    },
    rifaximin: {
      aliases: ['rifaximin', 'rifaximin 550mg', 'oral rifaximin'],
      responseText: 'Rifaximin 550 mg given orally twice daily, added on to the lactulose.',
      onsetMinutes: 720,
      appropriateness: 'indicated',
      rationale: 'Rifaximin added to lactulose reduces gut ammonia-producing flora and lowers the risk of a further encephalopathy episode more than lactulose alone, and is a standard add-on rather than an alternative to it.',
    },
    thiamine: {
      aliases: ['thiamine iv', 'thiamine', 'vitamin b1', 'iv thiamine'],
      responseText: 'Thiamine 200 mg given intravenously.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale:
        'Years of heavy drinking with poor intake deplete thiamine stores regardless of whether he is currently withdrawing; replacing it before any glucose-containing fluid protects the small remaining reserve from being consumed by glucose metabolism, which is what precipitates a severe, largely irreversible brain injury in a thiamine-deficient patient.',
    },
    dextrose_5: {
      aliases: ['5% dextrose infusion', 'dextrose', 'iv dextrose', 'd5 infusion'],
      responseText: 'A 5% Dextrose infusion is started for his low blood sugar and poor oral intake, thiamine already on board.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'A patient not eating and already mildly hypoglycaemic needs caloric support; the dextrose itself is not the problem once his thiamine has already been replaced — the order it is given in is.',
      requiresFirst: ['thiamine'],
      harmfulSequenceResponseText:
        'The dextrose infusion is hung before any thiamine has been given. Over the next half hour his eye movements become slow and disconjugate on top of his existing confusion.',
      harmfulSequenceVitalsEffect: { hr: 8 },
      harmfulSequenceRationale:
        'In a thiamine-deficient patient, a glucose load is used up by cells through a thiamine-dependent enzyme step, consuming what little thiamine reserve remains and precipitating an acute, largely irreversible brain injury on top of the encephalopathy he already has. Parenteral thiamine must be given before, or at the very least alongside, the first dextrose-containing fluid — never after — in any long-term heavy drinker, whether or not he is actively withdrawing.',
    },
    protein_restriction: {
      aliases: ['restrict dietary protein', 'protein restriction', 'low protein diet'],
      responseText: 'Dietary protein is restricted, on the reasoning that this will lower the ammonia load contributing to his confusion.',
      onsetMinutes: 60,
      appropriateness: 'harmful',
      rationale:
        'This is an outdated practice: restricting dietary protein does not improve encephalopathy and instead worsens the muscle wasting and malnutrition already common in decompensated liver disease. Current guidance is to maintain adequate protein intake — roughly 1.2–1.5 g/kg/day, preferably from vegetable or dairy sources — alongside lactulose and rifaximin, not to restrict it.',
    },
    propranolol_continue: {
      aliases: ['continue propranolol', 'propranolol', 'restart beta blocker', 'non-selective beta blocker'],
      responseText: 'His home dose of propranolol is continued despite the current illness and his low blood pressure.',
      onsetMinutes: 30,
      vitalsEffect: { bp: '76/46', hr: -10 },
      appropriateness: 'harmful',
      rationale:
        'A non-selective beta-blocker blunts the compensatory rise in heart rate and cardiac output that is needed to maintain organ perfusion during this acute infection. He is already relatively hypotensive from evolving sepsis; continuing the drug risks pushing his blood pressure and kidney perfusion further down. Current caution is to hold it while systolic pressure is this low, or while there is significant kidney injury or a low sodium, and to resume it only once he is haemodynamically stable again.',
    },
    norfloxacin_prophylaxis: {
      aliases: ['norfloxacin', 'secondary sbp prophylaxis', 'norfloxacin 400mg', 'norfloxacin prophylaxis'],
      responseText: 'Norfloxacin 400 mg once daily is planned from discharge onward as secondary prevention.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale:
        'The one-year risk of a repeat episode after a first infection like this is high without prevention; daily norfloxacin (or ciprofloxacin as an alternative) meaningfully reduces recurrence and should be arranged before discharge, continued long-term or until his ascites resolves or he is transplanted.',
    },
    salt_restriction: {
      aliases: ['salt restricted diet', 'sodium restriction', 'low salt diet'],
      responseText: 'A salt-restricted diet (roughly 2 g of sodium a day) is advised alongside his diuretics once these are restarted.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Dietary sodium restriction is a standard adjunct to diuretic therapy for ascites once he is stable enough for diuretics to be safely restarted.',
    },
    hepatology_consult: {
      aliases: ['hepatology consult', 'gastroenterology consult', 'liver consult'],
      responseText: 'Hepatology consult requested to grade his disease severity, plan the diuretic restart and discuss longer-term care including transplant evaluation.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Early specialist involvement ensures his severity is formally graded (Child-Pugh / MELD) and that longer-term decisions, including transplant referral, are not left until a later, more urgent admission.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /paracentesis|ascitic (fluid )?(analysis|tap)|tap the ascites/i,
      name: 'Diagnostic Paracentesis Performed',
      targetMilestoneMinutes: 120,
    },
    {
      orderOrActionPattern: /cefotaxime/i,
      name: 'Empirical Antibiotic Started',
      targetMilestoneMinutes: 180,
    },
    {
      orderOrActionPattern: /albumin/i,
      name: 'IV Albumin Given Alongside Antibiotic',
      targetMilestoneMinutes: 240,
    },
    {
      orderOrActionPattern: /lactulose/i,
      name: 'Lactulose Started for Encephalopathy',
      targetMilestoneMinutes: 120,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_acld_1',
      title: 'Incidental Simple Renal Cyst',
      description: 'The abdominal ultrasound incidentally shows a 1.8 cm simple anechoic cyst in the right kidney, with no septations or wall thickening.',
      correctAction: 'No intervention needed; this is a benign finding requiring no follow-up imaging.',
      status: 'unnoticed',
    },
    {
      id: 'inc_acld_2',
      title: 'Vitamin D Deficiency',
      description: 'Serum 25-Hydroxyvitamin D level is 8 ng/mL (Reference 30–100 ng/mL) — deficiency.',
      correctAction: 'Note for outpatient oral cholecalciferol supplementation once the acute illness has resolved; no acute action needed.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A man with long-standing heavy drinking and known liver disease arrives drowsy, jaundiced, feverish and with a visibly swollen belly.',
      consequenceOnRight:
        'IV access, cardiac monitoring and blood work are started immediately, and a diagnostic tap of the belly fluid is arranged within the hour rather than waiting for the fever or drowsiness to be explained some other way first.',
      consequenceOnWrong:
        'The team waits for blood results before considering the fluid itself, losing time in identifying an infection that is already driving both his fever and his worsening confusion.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'His belly fluid is being considered for testing while the team also reviews what has tipped his stable liver disease into this sudden decline — his fever, his five days without a bowel movement, and his unchanged drinking pattern are all reviewed together.',
      consequenceOnRight:
        'A tap of the belly fluid is sent regardless of how obvious another trigger might seem, since more than one cause can be acting together, and a white cell count in the fluid above the diagnostic threshold confirms an infection within it as a driver of his decline.',
      consequenceOnWrong:
        'His fever and confusion are attributed only to the missed bowel movements or to his ongoing drinking without ever sending a tap of the fluid itself, so a treatable infection inside it goes undiagnosed.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Once the belly fluid confirms an infection within it, the team must choose an antibiotic and decide whether anything else should be added alongside it.',
      consequenceOnRight:
        'An appropriate intravenous antibiotic is started promptly together with intravenous albumin, a combination shown to reduce the risk of his kidneys failing and to improve his chances of survival compared with the antibiotic alone.',
      consequenceOnWrong:
        'The antibiotic is given without the albumin, or antibiotics are delayed until the fluid culture result is back, losing the added protection for his kidneys and losing time on treatment that should have started immediately.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'His home blood pressure medication and his diet are both reviewed now that he is unwell with this new infection and a low blood pressure.',
      consequenceOnRight:
        'His non-selective heart medication is held for now given how low his pressure already is, and he is kept on an adequate protein intake rather than restricted, since current evidence shows restricting protein does not help his confusion and only worsens his muscle wasting.',
      consequenceOnWrong:
        'His usual heart medication is restarted anyway despite his low blood pressure, risking a further drop in blood flow to his kidneys, and his diet is needlessly restricted in protein on the outdated belief that this will help his confusion.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext:
        'On examination his belly is diffusely and only mildly tender with no rigidity or rebound, and the team must decide whether this needs an urgent surgical opinion or fits with an infection confined to the fluid itself.',
      consequenceOnRight:
        'The mild, diffuse tenderness without rebound or guarding is recognised as fitting an infection within the fluid itself rather than a surgical abdomen, and treatment continues medically without a needless surgical exploration.',
      consequenceOnWrong:
        'An emergency surgical exploration is pursued for a presentation with none of the localising or peritoneal signs that would call for one, exposing a poor anaesthetic-risk patient to an unnecessary operation.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before discharge, the team plans how to reduce the chance of him coming back with the same problem.',
      consequenceOnRight:
        'Long-term daily antibiotic prevention is arranged given how likely a repeat episode is after a first one, alongside restarting his diuretics once his kidneys have settled, dietary counselling with adequate protein, and a firm conversation about stopping his drinking with a referral for support.',
      consequenceOnWrong:
        'He is discharged once he feels better with no plan for ongoing antibiotic prevention or diuretic review, leaving him at high risk of a repeat admission with the same problem within the year.',
    },
  ],
};
