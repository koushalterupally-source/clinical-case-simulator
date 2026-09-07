import { CaseScaffold } from '../../types';

/**
 * Decompensation of chronic liver disease from a long-standing viral
 * infection (chronic hepatitis B), NOT alcohol — see CASE_MODEL.md for the
 * therapy model (indicated / neutral / harmful, requiresFirst sequencing)
 * this scaffold follows.
 *
 * This case is deliberately built to teach the CONTRAST with
 * `alcoholicLiverDisease.ts`: the physical stigmata of chronic liver disease
 * (jaundice, spider naevi, a firm nodular liver, ascites) look the same
 * regardless of cause, so a team that assumes heavy drinking because that is
 * the more commonly tested aetiology will anchor incorrectly here — his
 * alcohol history is explicitly minimal, and the actual driver is a flare of
 * a long-standing viral infection picked up on a proper aetiological screen.
 * The diagnostic ascitic tap here is deliberately NEGATIVE for infection
 * (reinforcing that it is still mandatory even when unrevealing, and that a
 * negative result does not mean the search for a cause stops), which is the
 * opposite of `alcoholicLiverDisease.ts`, where the same test is positive and
 * is itself the trigger.
 *
 * Teaching points this case is built around: a full cause-finding workup
 * (viral serology and viral load, an autoimmune panel, iron studies, a copper
 * study) is sent rather than assuming the presentation must be alcohol;
 * antiviral therapy (entecavir 1 mg once daily — the decompensated-disease
 * dose, doubled from the 0.5 mg compensated dose — or tenofovir) is indicated
 * in every patient with cirrhosis from this virus regardless of viral load,
 * ALT or HBeAg status, and should not be delayed waiting for "worse" numbers;
 * a large-volume paracentesis needs albumin cover (roughly 6–8 g per litre
 * removed beyond the first 5 litres) to avoid a fall in effective circulating
 * volume; empirical antibiotics are withheld once the ascitic fluid count is
 * below the infection threshold, rather than treated on presumption; a liver
 * biopsy is deferred in a coagulopathic patient once the diagnosis is already
 * established biochemically and on imaging; and once cirrhosis from this
 * virus is present, six-monthly liver cancer surveillance continues
 * indefinitely and susceptible household contacts are screened and
 * vaccinated.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "decompensated", "cirrhosis" and "hepatitis" — the content words Test
 * Suite 14 extracts from conditionName — using "liver disease", "liver
 * scarring" and "the virus" in their place instead.
 */
export const SCAFFOLD_NONALCOHOLIC_CLD: CaseScaffold = {
  id: 'scaffold_nonalcoholic_cld',
  title: 'Progressive Jaundice and Abdominal Swelling with New Confusion',
  conditionName: 'Decompensated Cirrhosis due to Chronic Hepatitis B',
  subject: 'Medicine',
  system: 'Gastroenterology',
  demographics: {
    name: 'Suresh Pillai',
    age: 39,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 39-year-old man is brought to the ward with ten days of increasing abdominal girth and two weeks of yellowing of his eyes and skin, and over the last day his family says he has become mildly confused and unusually drowsy, dozing off mid-conversation. He drinks alcohol only occasionally at social gatherings, no more than a couple of drinks a few times a year, and has never used any recreational or injection drugs. Five years ago a blood donation camp flagged an abnormal blood test and he was advised to see a liver specialist, but he never followed up. His mother has been told for years that she carries a virus in her blood, though she has never been unwell from it.',
  initialVitals: {
    hr: 92,
    bp: '108/68',
    rr: 18,
    spo2: 97,
    temp: '37.0°C',
    grbs: 92,
  },
  clinchingClue:
    'A viral load for the infection his mother is known to carry returns markedly elevated at over 8 × 10^7 IU/mL, with the surface marker positive and an early antibody pattern suggesting a fresh flare rather than simple long-standing carriage, and ALT disproportionately higher than AST — while the ascitic fluid tap is negative for infection (polymorphonuclear count 60 cells/mm3) and the rest of the cause-finding screen (autoimmune markers, iron studies, copper study) is unremarkable — together confirming this viral flare, not alcohol and not a superimposed infection, as the trigger for his decompensation in a man with minimal alcohol use and a family history of the same infection.',
  clinchingClueTimeMinutes: 200,
  examFindingsMap: {
    general:
      'Deeply icteric sclerae and skin, drowsy but rousable to voice and oriented to person and place though slow to respond; several spider naevi over the chest and upper back; palmar erythema; afebrile.',
    cvs: 'Regular rhythm, mildly tachycardic, normal heart sounds, warm peripheries.',
    chest: 'Bilateral air entry equal with mild reduction at both bases from ascites splinting the diaphragm; no crepitations.',
    abdomen:
      'Moderately distended with shifting dullness present; mild diffuse tenderness, no rebound or guarding; liver span reduced with a firm, nodular edge palpable below the distension; spleen palpable 2 cm below the costal margin.',
    cns:
      'Drowsy but oriented to person and place, mildly slow in his responses; a coarse flap (asterixis) is elicitable at the wrists; no focal motor or sensory deficit; no neck stiffness — a picture consistent with grade I–II encephalopathy.',
  },
  historyMap: {
    presenting: 'Ten days of increasing abdominal girth, two weeks of yellowing of the eyes and skin, and one day of new drowsiness and mild confusion.',
    past: 'An abnormal blood test flagged at a blood donation camp five years ago, for which he was told to see a liver specialist but never followed up; no diagnosed diabetes or heart disease.',
    substanceUse: 'Drinks alcohol only occasionally at social occasions, no more than a couple of drinks a few times a year; no recreational or injection drug use; no tattoos or unsterile piercings recalled.',
    family: 'His mother has been told for years that she carries a viral infection of the liver in her blood, though she has remained well; no other family history of liver disease volunteered.',
    medications: 'No regular medications; no herbal or over-the-counter supplements.',
    allergies: 'No known drug allergies.',
    social: 'Married, monogamous, works as an accountant; no recent travel; his vaccination history has never specifically been checked.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 10.8 g/dL (Reference 13.0–17.0 g/dL), WBC 5,200/mcL (Reference 4,000–11,000/mcL, normal — no leucocytosis), Platelets 96,000/mcL (Reference 1.5–4.5 lakh/mcL) — anaemia and thrombocytopenia from long-standing liver disease with hypersplenism, but a normal white count with nothing to suggest an active infection driving today\'s picture.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft', 'liver function tests', 'liver function test'],
      resultText:
        'Liver Function Tests: Total Bilirubin 9.2 mg/dL (Reference 0.2–1.2 mg/dL), AST 210 U/L (Reference 10–40 U/L), ALT 340 U/L (Reference 7–56 U/L) — ALT disproportionately higher than AST, unlike the AST-predominant pattern typical of alcohol-related injury, in keeping with an active viral process; ALP 140 U/L, Albumin 2.6 g/dL (Reference 3.5–5.0 g/dL).',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile', 'coagulation panel', 'prothrombin time'],
      resultText: 'Coagulation Profile: PT 22.0 sec (Reference 11–13.5 sec), INR 2.1 (Reference 0.8–1.1), aPTT 40 sec (Reference 25–35 sec) — markedly prolonged, a required input for severity scoring and for weighing the risk of any invasive procedure.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests', 'renal function tests kft urea creatinine', 'rft kidney function tests urea creatinine'],
      resultText: 'Renal Function: Blood Urea 34 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.9 mg/dL (Reference 0.6–1.2 mg/dL) — normal, with no evidence of an evolving kidney injury at this stage.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    serum_electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'serum electrolytes', 'electrolytes', 'na k cl'],
      resultText: 'Serum Electrolytes: Sodium 133 mEq/L (Reference 135–145 mEq/L, mild hyponatraemia), Potassium 4.0 mEq/L, Chloride 98 mEq/L.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    serum_ammonia: {
      aliases: ['serum ammonia', 'ammonia', 'serum nh3'],
      resultText: 'Serum Ammonia: 76 µmol/L (Reference 15–45 µmol/L) — elevated.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'Ammonia does not correlate well with how confused a patient actually is; his encephalopathy is graded and treated clinically, not by this number.',
    },
    ascitic_fluid_analysis: {
      aliases: ['ascitic fluid analysis', 'ascites fluid analysis', 'diagnostic paracentesis', 'ascitic tap', 'tap the ascites', 'sbp workup'],
      resultText:
        'Ascitic Fluid Analysis: Polymorphonuclear leucocyte count 60 cells/mm3 (diagnostic threshold for infection is >250 cells/mm3 — NEGATIVE), Total Protein 1.3 g/dL, Ascitic Albumin 1.0 g/dL against a serum albumin of 2.6 g/dL, giving a Serum-Ascites Albumin Gradient of 1.6 g/dL (>1.1 g/dL, consistent with portal hypertension as the cause of the fluid). No organisms on Gram stain; culture sent. This test is still mandatory in every hospitalised patient with new or worsening ascites, even without a fever — a negative result here rules out one precipitant but does not mean the search for what is driving his decline can stop.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    hbv_serology_panel: {
      aliases: ['hbsag', 'hepatitis b surface antigen', 'hbv serology panel', 'hepatitis b panel', 'igm anti-hbc', 'hepatitis b serology'],
      resultText:
        'Hepatitis B Serology: HBsAg positive; IgM anti-HBc positive, suggesting a fresh flare rather than simple long-standing carriage; HBeAg negative; Anti-HBs negative.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: true,
    },
    hbv_dna_viral_load: {
      aliases: ['hbv dna', 'hbv viral load', 'hepatitis b viral load', 'quantitative hbv dna'],
      resultText: 'HBV DNA (quantitative PCR): 8.4 × 10^7 IU/mL — markedly elevated, in keeping with active viral replication driving this flare.',
      turnaroundMinutes: 240,
      category: 'labs',
      isIndicative: true,
    },
    hcv_screen: {
      aliases: ['anti hcv', 'hepatitis c screen', 'anti-hcv antibody', 'hcv serology'],
      resultText: 'Anti-HCV Antibody: Negative — no evidence of a coexisting hepatitis C infection.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: true,
    },
    autoimmune_markers: {
      aliases: ['ana / asma', 'autoimmune liver panel', 'ana', 'asma', 'anti smooth muscle antibody', 'antinuclear antibody'],
      resultText: 'Autoimmune Liver Panel: ANA negative, Anti-Smooth Muscle Antibody negative, Total IgG 1,180 mg/dL (Reference 700–1,600 mg/dL, normal) — no evidence of an autoimmune process.',
      turnaroundMinutes: 180,
      category: 'labs',
      isIndicative: true,
    },
    iron_studies: {
      aliases: ['iron studies', 'serum ferritin', 'transferrin saturation', 'serum iron and tibc'],
      resultText: 'Iron Studies: Serum Ferritin 180 ng/mL (Reference 30–300 ng/mL), Transferrin Saturation 32% (Reference 20–50%) — both normal, making iron overload an unlikely contributor.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: true,
    },
    ceruloplasmin: {
      aliases: ['serum ceruloplasmin', 'ceruloplasmin'],
      resultText: 'Serum Ceruloplasmin: 28 mg/dL (Reference 20–40 mg/dL) — normal.',
      turnaroundMinutes: 120,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A copper storage disorder usually presents before 40 and becomes progressively less likely with age; it is still reasonable to complete a thorough cause-finding screen with this test, but it was never the leading possibility once his viral marker returned strongly positive, and a normal result here changes nothing.',
    },
    afp: {
      aliases: ['alpha-fetoprotein', 'afp', 'serum afp'],
      resultText: 'Alpha-Fetoprotein: 12 ng/mL (Reference <10 ng/mL) — mildly elevated, non-diagnostic on its own, but establishes a baseline for the ongoing cancer surveillance this diagnosis now requires.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: true,
    },
    usg_abdomen: {
      aliases: ['usg abdomen & pelvis', 'usg abdomen', 'ultrasound abdomen', 'abdominal ultrasound', 'ultrasound abdomen pelvis'],
      resultText:
        'USG Abdomen & Pelvis: Liver reduced in span with a coarse, nodular surface; spleen enlarged at 13 cm; portal vein dilated to 14 mm; moderate ascites present. An incidental 2.3 cm well-defined hyperechoic lesion is noted in the right lobe of the liver, in keeping with a simple haemangioma, with no internal vascularity of concern.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    liver_biopsy: {
      aliases: ['liver biopsy', 'percutaneous liver biopsy'],
      resultText: 'Percutaneous Liver Biopsy: Attempted despite the coagulopathy; a moderate subcapsular haematoma develops post-procedure, managed conservatively without transfusion. Histology (once available) confirms established cirrhosis with active viral hepatitis changes — information the serology and viral load had already provided.',
      turnaroundMinutes: 240,
      category: 'procedures',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'With an INR of 2.1 and a platelet count of 96,000/mcL, a percutaneous biopsy carries a real bleeding risk. The diagnosis here is already established by the combination of examination findings, imaging and the viral marker and viral load — a biopsy adds no information that changes management and should be deferred or, if tissue were genuinely needed later, obtained by a transjugular route after coagulopathy is addressed.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'access', 'iv two wide bore cannulae', 'two wide bore cannulae'],
      responseText: 'Two IV cannulae secured for fluids and albumin.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is needed before albumin or any other infusion can be given and should be one of the first things secured.',
    },
    entecavir: {
      aliases: ['entecavir', 'entecavir 1mg', 'oral entecavir', 'tenofovir', 'tenofovir disoproxil fumarate'],
      responseText: 'Entecavir 1 mg once daily — the higher dose used specifically for decompensated liver disease, double the 0.5 mg compensated dose — is started orally.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale:
        'Antiviral therapy is indicated in every patient with cirrhosis from this virus, regardless of how high or low the viral load, ALT or e-antigen status is, and is especially urgent once decompensation has occurred, since suppressing the virus can halt further progression. Entecavir or tenofovir are preferred first-line agents over older drugs because of their potency and low resistance; starting it should not wait for "worse" numbers to accumulate first.',
    },
    lactulose: {
      aliases: ['lactulose', 'oral lactulose', 'rectal lactulose enema'],
      responseText: 'Oral lactulose started, titrated to two to three soft stools a day.',
      onsetMinutes: 90,
      appropriateness: 'indicated',
      rationale: 'Lactulose reduces colonic ammonia absorption and is standard treatment for his encephalopathy regardless of what precipitated the underlying decline.',
    },
    empirical_antibiotics_unnecessary: {
      aliases: ['cefotaxime', 'empirical antibiotics', 'start antibiotics for infection', 'iv antibiotic', 'antibiotics for presumed infection'],
      responseText: 'Empirical intravenous antibiotics are started for a presumed infection in the ascitic fluid.',
      onsetMinutes: 30,
      appropriateness: 'harmful',
      rationale:
        'His diagnostic tap returns a cell count well below the threshold for infection and he has no fever — starting antibiotics anyway treats a presumption rather than a proven infection, exposes him to antibiotic side effects and resistance pressure for no benefit, and distracts attention from the actual driver of this decline, which is the flare of his underlying viral infection needing antiviral therapy instead.',
    },
    therapeutic_lvp: {
      aliases: ['large volume paracentesis', 'therapeutic paracentesis', 'abdominal paracentesis drain'],
      responseText: 'Large-volume paracentesis performed for symptomatic relief, roughly six litres of fluid drained.',
      onsetMinutes: 40,
      vitalsEffect: { rr: -2 },
      appropriateness: 'indicated',
      rationale: 'Draining a large, symptomatic volume of ascites relieves his discomfort and the splinting of his diaphragm, and is safe and effective once albumin cover is running alongside it.',
      requiresFirst: ['albumin_post_paracentesis'],
      harmfulSequenceResponseText:
        'The large-volume tap is performed without albumin already running; over the next few hours his blood pressure drifts down and his creatinine is found to have risen the next morning.',
      harmfulSequenceVitalsEffect: { bp: '92/58', hr: 8 },
      harmfulSequenceRationale:
        'Draining a large volume of protein-rich ascitic fluid acutely drops his effective circulating volume; without albumin cover (roughly 6–8 g per litre removed beyond the first 5 litres) started before or alongside the drain, this can precipitate a post-paracentesis fall in circulating volume — hypotension, hyponatraemia and a rise in creatinine — which is why albumin is started before or during a large-volume tap, not added afterwards as an afterthought.',
    },
    albumin_post_paracentesis: {
      aliases: ['albumin for paracentesis', 'albumin 8g per litre', 'post-paracentesis albumin', 'albumin cover for paracentesis'],
      responseText: 'IV 20% albumin is started, dosed at roughly 8 g per litre of ascitic fluid anticipated beyond the first 5 litres.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Albumin replacement at this dose prevents the fall in effective circulating volume that a large-volume tap would otherwise cause, protecting kidney perfusion through the drain.',
    },
    hcc_surveillance_plan: {
      aliases: ['arrange hcc surveillance', 'six monthly afp and ultrasound', 'hepatocellular carcinoma surveillance plan', 'liver cancer surveillance'],
      responseText: 'Six-monthly alpha-fetoprotein and liver ultrasound surveillance is arranged going forward.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Once cirrhosis from this virus is established, the risk of liver cancer persists even with good viral suppression, so surveillance continues indefinitely at six-month intervals rather than being deferred until symptoms develop.',
    },
    household_screening_vaccination: {
      aliases: ['screen household contacts', 'vaccinate household contacts', 'family screening and vaccination', 'household contact screening'],
      responseText: 'His household contacts, including his mother, wife and any children, are offered screening for this same viral infection and vaccination for those found susceptible.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'This virus spreads within households, particularly from mother to child around birth and through prolonged close contact; screening susceptible contacts and vaccinating those not already immune or infected is a standard, high-yield preventive step that is easy to forget once the acutely unwell patient is the sole focus.',
    },
    hepatology_consult: {
      aliases: ['hepatology consult', 'gastroenterology consult', 'liver consult'],
      responseText: 'Hepatology consult requested to formally grade his disease severity and plan transplant evaluation if warranted.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Early specialist involvement ensures his severity is formally scored (Child-Pugh / MELD) and that transplant referral, if warranted, is not left until a later, more urgent admission.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /paracentesis|ascitic (fluid )?(analysis|tap)|tap the ascites/i,
      name: 'Diagnostic Paracentesis Performed Despite No Fever',
      targetMilestoneMinutes: 120,
    },
    {
      orderOrActionPattern: /hbsag|hbv dna|hbv viral load|hepatitis b (serology|panel)/i,
      name: 'Aetiological Viral Workup Sent',
      targetMilestoneMinutes: 150,
    },
    {
      orderOrActionPattern: /entecavir|tenofovir/i,
      name: 'Antiviral Therapy Started',
      targetMilestoneMinutes: 360,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_nacld_1',
      title: 'Incidental Hepatic Haemangioma',
      description: 'The abdominal ultrasound incidentally shows a 2.3 cm well-defined hyperechoic lesion in the right lobe of the liver, in keeping with a simple haemangioma.',
      correctAction: 'No intervention or biopsy needed; a classic simple haemangioma on ultrasound needs no follow-up imaging unless its appearance changes.',
      status: 'unnoticed',
    },
    {
      id: 'inc_nacld_2',
      title: 'Household Contacts Never Screened or Vaccinated',
      description:
        'The history reveals a spouse and two children at home, none of whom have ever been screened or vaccinated against the transmissible cause identified here.',
      correctAction:
        'Arrange screening and vaccination for the household contacts before discharge — this admission is also a public health opportunity that is easy to miss.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A man with progressive yellowing of the eyes and skin, a swelling belly and new drowsiness is admitted to the ward for urgent assessment.',
      consequenceOnRight:
        'IV access and baseline blood work are started immediately, and a diagnostic tap of the belly fluid is arranged the same day regardless of what the team suspects is driving this.',
      consequenceOnWrong:
        'The tap is deferred because there is no fever, on the assumption that an infection is therefore unlikely, delaying a test that should be done in every hospitalised patient with new or worsening fluid in the belly.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'His drinking history is minimal — only an occasional social drink a few times a year — yet his examination looks much like a heavier drinker\'s liver disease, with marks on his chest and a firm, irregular liver edge; the team must decide how to work up the actual cause rather than assume the more commonly tested one.',
      consequenceOnRight:
        'A full cause-finding workup is sent — viral markers, an autoimmune panel, iron studies and a copper study — rather than assuming heavy drinking is responsible on the strength of examination findings alone, since these physical signs are shared by liver disease of any cause.',
      consequenceOnWrong:
        'The picture is assumed to be from drinking despite his history not supporting it, and the actual, treatable cause is never specifically looked for.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext:
        'His viral marker comes back strongly positive with a very high viral count, and the team discusses whether treatment should wait for the count to fall on its own or for more evidence of severe disease.',
      consequenceOnRight:
        'Specific antiviral treatment is started without delay, since it is recommended for anyone with this degree of liver scarring from this virus regardless of how high or low the viral count or liver enzymes are.',
      consequenceOnWrong:
        'Antiviral treatment is withheld while waiting for a "more convincing" viral count or for enzyme levels to rise further, delaying a treatment that should have started as soon as the virus was confirmed active.',
    },
    {
      roleTag: 'PHARM',
      patientContext:
        'His belly fluid comes back with a cell count well below the threshold for infection and he has no fever, yet someone on the team suggests starting antibiotics anyway "to be safe", and a large volume of his ascitic fluid is being considered for drainage to relieve his discomfort.',
      consequenceOnRight:
        'Antibiotics are withheld since there is no evidence of infection in the fluid, and albumin replacement is started before or alongside the large-volume drain to protect his kidneys from the fluid shift.',
      consequenceOnWrong:
        'Antibiotics are given despite a fluid count below the diagnostic threshold, treating a presumption rather than a proven infection, or a large volume is drained without any albumin cover, risking a fall in his blood pressure and a rise in his creatinine afterwards.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'A liver biopsy is proposed to "confirm" the diagnosis, in a patient whose clotting time is already markedly prolonged and whose platelet count is low.',
      consequenceOnRight:
        'The biopsy is deferred: the combination of examination findings, imaging, and blood and viral markers already establishes the diagnosis without a tissue sample, and a percutaneous biopsy in a patient this coagulopathic carries a real, avoidable bleeding risk.',
      consequenceOnWrong:
        'A percutaneous liver biopsy is performed anyway despite the coagulopathy, exposing him to an avoidable bleeding complication for a diagnosis that other, safer tests had already established.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before discharge, the team plans his long-term follow-up given the virus that has been identified and the degree of scarring already present in his liver.',
      consequenceOnRight:
        'Ongoing antiviral therapy, six-monthly cancer surveillance with a blood marker and an ultrasound, and screening with vaccination of susceptible household contacts (his mother, wife and any children) are all arranged before he leaves, along with referral for formal severity scoring and transplant discussion.',
      consequenceOnWrong:
        'He is discharged once he feels better with no arrangement for ongoing antiviral therapy, no cancer surveillance plan, and no screening offered to his household contacts, leaving both him and his family at avoidable risk.',
    },
  ],
};
