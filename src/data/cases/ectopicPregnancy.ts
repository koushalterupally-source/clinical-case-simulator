import { CaseScaffold } from '../../types';

/**
 * A haemodynamically unstable adnexal rupture with a haemoperitoneum. The
 * teaching points this topic is examined on: urine/serum beta-hCG and the
 * discriminatory zone; transvaginal ultrasound findings and free fluid; why
 * an unstable patient goes straight to theatre rather than waiting for more
 * imaging; resuscitation running IN PARALLEL with surgery, never as a
 * precondition for it; salpingectomy vs salpingostomy; anti-D prophylaxis in
 * an Rh-negative woman; and why methotrexate is the wrong choice once the
 * patient is unstable and ruptured. See CASE_MODEL.md for the therapy model
 * (indicated / neutral / harmful, requiresFirst sequencing) this scaffold
 * follows.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "ruptured", "ectopic", "pregnancy" and "haemoperitoneum" — the four
 * content words Test Suite 14 extracts from conditionName — using "missed
 * period", "positive urine test", "conception" and "internal bleeding" in
 * their place instead.
 */
export const SCAFFOLD_ECTOPIC: CaseScaffold = {
  id: 'scaffold_ectopic_pregnancy',
  title: 'Sudden Collapse with Abdominal Pain in a Woman of Reproductive Age',
  conditionName: 'Ruptured Ectopic Pregnancy with Haemoperitoneum and Shock',
  subject: 'OBGY',
  system: 'Obstetrics',
  demographics: {
    name: 'Meena Iyer',
    age: 27,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'A 27-year-old woman is brought to the emergency room with sudden, severe lower abdominal pain that began an hour ago, followed by a brief fainting spell on standing up. She reports her last menstrual period was seven weeks ago, and she has had scant dark vaginal spotting for the past three days. On arrival she is pale, restless and drenched in sweat, and the abdomen is diffusely tender with guarding.',
  initialVitals: {
    hr: 128,
    bp: '82/54',
    rr: 26,
    spo2: 95,
    temp: '36.7°C',
    grbs: 98,
  },
  clinchingClue:
    'Bedside scan shows an empty uterine cavity with only a thickened decidual reaction, a heterogeneous 3.5 cm right adnexal mass with no cardiac activity, and a large collection of free fluid extending up to the hepatorenal pouch — and with the blood pressure continuing to fall despite the first fluid bolus, she is taken straight to the operating room without waiting for a formal scan.',
  clinchingClueTimeMinutes: 15,
  examFindingsMap: {
    general: 'Pale, restless, cold clammy peripheries, drowsy and dizzy when sitting upright; looks more unwell than the numbers alone suggest.',
    cvs: 'Marked tachycardia, thready peripheral pulses, capillary refill prolonged beyond 3 seconds, blood pressure barely maintained.',
    chest: 'Clear bilaterally, tachypnoeic, no crepitations.',
    abdomen: 'Diffusely tender with guarding, worse in the lower abdomen and right iliac fossa, with shifting dullness and mild distension suggesting a collection of free fluid; bowel sounds sluggish.',
    pelvic: 'Speculum examination shows scant dark blood at a closed cervix. Bimanual examination elicits marked tenderness on gentle cervical movement, with an ill-defined tender fullness felt to the right of the uterus and a boggy fullness in the pouch of Douglas — examination kept brief given how unwell she is.',
  },
  historyMap: {
    menstrual: 'Last menstrual period was seven weeks ago; cycles were previously regular. Scant dark vaginal spotting for the past three days before today’s collapse.',
    obstetric: 'Married, one previous uncomplicated vaginal delivery two years ago. No booking visit this cycle, as her missed period had not yet been formally worked up.',
    past: 'Treated for a pelvic infection around two years ago with a course of antibiotics; no previous abdominal or tubal surgery.',
    medications: 'A copper intrauterine device has been in place for the last 18 months for contraception.',
    allergies: 'No known drug allergies.',
    family: 'No family history of a bleeding disorder or notable gynaecological illness.',
  },
  investigationsMap: {
    urine_hcg: {
      aliases: ['urine pregnancy test'],
      resultText: 'Urine Test for Conception: Positive.',
      turnaroundMinutes: 5,
      category: 'labs',
      isIndicative: true,
    },
    serum_bhcg: {
      aliases: ['serum beta-hcg', 'quantitative beta-hcg', 'beta-hcg', 'serum hcg'],
      resultText: 'Serum Beta-hCG (quantitative): 1,650 mIU/mL — above the discriminatory zone (commonly quoted as 1,500–3,500 mIU/mL, widened from the older 1,500–2,000 figure because it varies with operator and equipment) at which an intrauterine gestational sac should normally already be visible on transvaginal scan. No intrauterine sac is seen on this patient’s scan, which favours an implantation outside the uterine cavity over a very early normal one.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText: 'CBC: Hb 7.6 g/dL (Reference 12.0–15.0 g/dL) — significant anaemia from ongoing internal blood loss, WBC 13,200/mcL (Reference 4,000–11,000/mcL), Platelets 220,000/mcL (Reference 150,000–450,000/mcL).',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    blood_group: {
      aliases: ['blood grouping & cross-match', 'blood grouping', 'cross match', 'blood group'],
      resultText: 'Blood Grouping & Cross-match: Group O Negative, antibody screen negative. Two units of packed red cells cross-matched and held ready — being Rh-negative, she will need anti-D immunoglobulin after this event.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile'],
      resultText: 'PT/INR: PT 12.6 sec (Reference 11–13.5 sec), INR 1.0 (Reference 0.8–1.1), aPTT 28 sec (Reference 25–35 sec) — coagulation currently normal, though should be rechecked if bleeding and transfusion continue.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText: 'Renal Function: Blood Urea 26 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.7 mg/dL (Reference 0.6–1.2 mg/dL) — normal, useful as a pre-operative baseline.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    usg_pelvis: {
      aliases: ['usg abdomen & pelvis', 'usg pelvis', 'pelvic ultrasound', 'transvaginal ultrasound'],
      resultText: 'Transvaginal Ultrasound: Uterine cavity empty with only a thickened decidual reaction, no intrauterine gestational sac. A heterogeneous 3.5 cm right adnexal mass is seen with no cardiac activity. Moderate-to-large free fluid is present in the pelvis, extending up to the hepatorenal (Morison’s) pouch — in keeping with a significant volume of free intra-abdominal blood.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    fast_scan: {
      aliases: ['fast scan'],
      resultText: 'FAST Scan: Free fluid seen in the pouch of Douglas, both paracolic gutters and Morison’s pouch — a positive scan in a haemodynamically unstable patient, and by itself already enough reason to proceed to theatre without waiting for a formal scan.',
      turnaroundMinutes: 5,
      category: 'imaging',
      isIndicative: true,
    },
    serum_lactate: {
      aliases: ['serum lactate'],
      resultText: 'Serum Lactate: 3.6 mmol/L (Reference 0.5–1.6 mmol/L) — elevated, consistent with hypoperfusion from significant blood loss.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft'],
      resultText: 'Liver Function Tests: AST 22 U/L (Reference 10–40 U/L), ALT 18 U/L (Reference 7–56 U/L), Total Bilirubin 0.5 mg/dL (Reference 0.2–1.2 mg/dL), Albumin 4.0 g/dL (Reference 3.5–5.0 g/dL) — normal; not particularly informative in this presentation.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'Liver enzymes do not change anything here. In a shocked patient the useful tests are the ones that confirm bleeding and get blood cross-matched.',
    },
    ct_abdomen: {
      aliases: ['ct abdomen & pelvis contrast', 'ct abdomen'],
      resultText:
        'CT Abdomen & Pelvis: Large volume of high-attenuation free fluid throughout the pelvis and both paracolic gutters, consistent with haemoperitoneum. The patient became transiently unrecordable on the scanner table and was returned to the resuscitation area.',
      turnaroundMinutes: 40,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'This took an unstable, actively bleeding patient out of the resuscitation area and onto a scanner table for forty minutes, and told you what the bedside scan and her own physiology had already established. Imaging that confirms what you already know is not free when the patient is bleeding — the cost is paid in delay to the only thing that stops it.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'large bore iv'],
      responseText: 'Two wide-bore (16G) IV cannulae secured for rapid fluid and blood product access.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable large-bore venous access is the immediate prerequisite for crystalloid resuscitation, blood transfusion and safe transfer to theatre, and should be secured within the first minutes of assessment.',
    },
    crystalloid: {
      aliases: ['ringer lactate 500 ml bolus', 'ringer lactate', 'crystalloid bolus'],
      responseText: 'Ringer Lactate 500 mL bolus given rapidly IV, repeated as needed while blood is arranged.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -8, bp: '90/58' },
      appropriateness: 'indicated',
      rationale: 'Crystalloid resuscitation supports the circulation while blood is cross-matched and theatre is arranged, and must run in parallel with — never instead of, and never as a precondition for — definitive surgical control of the bleeding.',
    },
    oxygen: {
      aliases: ['supplemental oxygen', 'oxygen'],
      responseText: 'Supplemental oxygen applied by face mask.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 2 },
      appropriateness: 'indicated',
      rationale: 'Supplemental oxygen is part of the standard initial approach to any patient in haemorrhagic shock, improving oxygen delivery to hypoperfused tissue while resuscitation proceeds.',
    },
    foley: {
      aliases: ['foley catheterisation', 'foley catheter', 'urinary catheterisation'],
      responseText: 'Foley catheter inserted to monitor hourly urine output as a marker of end-organ perfusion.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Hourly urine output is a simple, continuous marker of the adequacy of resuscitation in shock and should be monitored from the outset.',
    },
    prbc: {
      aliases: ['packed red cells', 'prbc', 'blood transfusion'],
      responseText: 'Packed red cells transfused — O-negative units immediately if cross-matched blood is not yet ready, switching to cross-matched units once available.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -14, bp: '100/64' },
      labShift: {
        cbc: 'CBC (repeat): Hb 9.1 g/dL (Reference 12.0–15.0 g/dL) — rising after transfusion of packed red cells.',
      },
      appropriateness: 'indicated',
      rationale: 'Transfusion replaces ongoing blood loss and restores oxygen-carrying capacity in a haemodynamically unstable patient; it is guided by clinical instability rather than by waiting for a specific haemoglobin threshold, and should not be delayed for a completed formal cross-match if she is in extremis.',
    },
    obs_consult: {
      aliases: ['obstetrics consult'],
      responseText: 'Obstetrics/gynaecology consult requested; a senior obstetrician attends to lead surgical decision-making.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Early senior obstetric involvement ensures rapid escalation to theatre without delay once instability and free intra-abdominal fluid are recognised.',
    },
    anaesthesia_consult: {
      aliases: ['anaesthesia / icu consult', 'anaesthesia consult', 'icu consult'],
      responseText: 'Anaesthesia/ICU team informed and attends for pre-operative assessment and post-operative critical care planning.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Early anaesthetic involvement is needed for safe induction in a shocked patient and to plan post-operative monitoring, and should be arranged as soon as theatre is decided on, not once she has already arrived there.',
    },
    nbm: {
      aliases: ['nil by mouth'],
      responseText: 'Kept nil by mouth in preparation for emergency surgery.',
      onsetMinutes: 2,
      appropriateness: 'indicated',
      rationale: 'Nil-by-mouth status reduces aspiration risk during induction of anaesthesia and should be instituted as soon as emergency surgery is anticipated.',
    },
    laparotomy: {
      aliases: ['emergency laparotomy', 'laparotomy'],
      responseText: 'Emergency laparotomy performed: the haemoperitoneum is evacuated and the bleeding adnexal source controlled. Salpingectomy is performed for the damaged tube, since the extent of tubal disruption and ongoing haemorrhage make tube-preserving surgery unsafe here.',
      onsetMinutes: 45,
      vitalsEffect: { hr: -22, bp: '112/72' },
      appropriateness: 'indicated',
      rationale: 'Definitive surgical control is the priority in a haemodynamically unstable patient with a bleeding adnexal source; it should proceed as soon as IV access is secured, running alongside continued resuscitation rather than waiting for it to finish. Salpingectomy is preferred over tube-conserving salpingostomy when the tube is extensively damaged or bleeding is not easily controlled; salpingostomy may be considered instead in a stable patient with a healthy contralateral tube who wants fertility preserved, followed up afterward with serial beta-hCG.',
      requiresFirst: ['iv_access'],
      harmfulSequenceResponseText: 'She is taken to the operating room and anaesthesia is induced before any IV line has been secured — the anaesthetist has no route for induction agents, resuscitation fluid, or an emergency vasopressor if she deteriorates further on the table.',
      harmfulSequenceVitalsEffect: { hr: 16, bp: '70/40' },
      harmfulSequenceRationale: 'Secure IV access is a basic prerequisite for safe anaesthesia and for delivering fluid or drugs if the patient deteriorates further during induction or surgery. Taking an unstable patient to theatre before a single line is running risks a fatal delay at exactly the moment she needs resuscitation most.',
    },
    anti_d: {
      aliases: ['anti-d immunoglobulin im', 'anti-d immunoglobulin', 'anti-d prophylaxis', 'anti-d'],
      responseText: 'Anti-D immunoglobulin given intramuscularly.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale: 'This is a sensitising event in an Rh-negative woman; anti-D immunoglobulin should be given (ideally within 72 hours) to prevent alloimmunisation that could harm a future Rh-positive fetus, regardless of how early the gestation was.',
    },
    methotrexate: {
      aliases: ['methotrexate im', 'methotrexate'],
      responseText: 'Methotrexate given intramuscularly.',
      onsetMinutes: 30,
      vitalsEffect: { hr: 14, bp: '76/46' },
      appropriateness: 'harmful',
      rationale: 'Methotrexate is medical therapy reserved for a selected, haemodynamically stable patient with a small, unruptured mass and a low, plateauing beta-hCG — it takes days to act and does nothing to stop active bleeding. Giving it here, in a patient who is unstable with a haemoperitoneum, wastes critical time while internal bleeding continues and delays the emergency surgery she actually needs.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /crystalloid|ringer lactate|iv fluid/i,
      name: 'IV Crystalloid Resuscitation',
      targetMilestoneMinutes: 10,
    },
    {
      orderOrActionPattern: /packed red cells|prbc|blood transfusion/i,
      name: 'Blood Transfusion',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /laparotomy|emergency surgery/i,
      name: 'Emergency Surgical Control of Bleeding',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /anti-d/i,
      name: 'Anti-D Immunoglobulin Prophylaxis',
      targetMilestoneMinutes: 180,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_ectopic_1',
      title: 'Asymptomatic Simple Ovarian Cyst',
      description: 'The pelvic scan incidentally shows a 2.5 cm simple anechoic cyst on the left ovary, with no septations or vascularity.',
      correctAction: 'No intervention needed; reassure and advise a routine follow-up scan in 6 weeks.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ectopic_2',
      title: 'Never Screened for Cervical Cancer',
      description: 'She is 27 and has never had cervical cytology (Pap smear) screening.',
      correctAction: 'Recommend age-appropriate cervical cancer screening at her follow-up visit once she has recovered.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ectopic_3',
      title: 'Rubella Immunity Not Documented',
      description: 'Her rubella IgG immune status has never been checked or documented.',
      correctAction: 'Check rubella IgG at follow-up and offer MMR vaccination if non-immune, with reliable contraception advised for one month afterward.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A young woman arrives collapsed with severe lower abdominal pain, a fast thready pulse and a blood pressure that is barely recordable, after a missed period and days of scant vaginal spotting.',
      consequenceOnRight: 'IV access, oxygen and rapid crystalloid resuscitation are started immediately while blood is sent for grouping and cross-match.',
      consequenceOnWrong: 'Resuscitation is delayed while extensive tests are awaited, and shock continues to deepen.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'A bedside scan shows an empty uterine cavity, a moderate collection of free abdominal fluid, and a tender mass beside the uterus, in a woman with a positive urine test for conception.',
      consequenceOnRight: 'The combination of a positive urine test, an empty uterine cavity and free intra-abdominal fluid is recognised as needing an urgent surgical opinion rather than further waiting.',
      consequenceOnWrong: 'The finding is dismissed as a simple ovarian cyst or a gastrointestinal cause, and time is lost while internal bleeding continues unrecognised.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'A quantitative hormone level comes back in a range where an intrauterine sac should normally already be visible on scan, yet the uterine cavity is empty.',
      consequenceOnRight: 'The mismatch between the hormone level and an empty uterine cavity is recognised as concerning for implantation outside the uterus, prompting an urgent scan and surgical opinion.',
      consequenceOnWrong: 'The result is assumed to reflect a very early normal implantation, and the patient is sent home to repeat testing in 48 hours, delaying diagnosis in an unstable patient.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Blood pressure remains low despite an initial fluid bolus, and the team must decide whether to wait for further imaging or proceed straight to the operating room.',
      consequenceOnRight: 'She is taken to the operating room without delay, with fluid and blood resuscitation continuing alongside surgery rather than beforehand.',
      consequenceOnWrong: 'Surgery is delayed to first complete a full imaging work-up, and ongoing internal bleeding worsens the shock.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'A colleague suggests giving a drug to end the process non-surgically now that a mass beside the uterus has been found, given how the patient looked a short while after fluids were started.',
      consequenceOnRight: 'Medical therapy is correctly rejected because she remains haemodynamically unstable with ongoing internal bleeding, and she proceeds straight to surgery instead.',
      consequenceOnWrong: 'A drug is given instead of surgery, wasting critical time while bleeding continues in an unstable patient — the drug takes days to act and does nothing to stop active bleeding.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Her blood group comes back Rh-negative, and before discharge the team reviews what should be given to protect a future conception from Rh sensitisation.',
      consequenceOnRight: 'Anti-D immunoglobulin is given within the recommended window to prevent Rh sensitisation affecting a future conception.',
      consequenceOnWrong: 'Anti-D is not given, leaving her at risk of Rh sensitisation that could harm a future conception.',
    },
  ],
};
