import { CaseScaffold } from '../../types';

/**
 * A young man with two days of migrating abdominal pain that has become
 * generalised, febrile and haemodynamically early-septic — the classic
 * INI-CET picture of a perforated appendix with diffuse spread rather than
 * a localised, walled-off one.
 *
 * The teaching points this scaffold is built around:
 *  - Alvarado-type clinical scoring is a screening aid, not a substitute for
 *    imaging once peritonism is generalised.
 *  - Free intraperitoneal gas on an erect film is often ABSENT even with a
 *    confirmed perforation here, unlike a perforated peptic ulcer — a normal
 *    film must never be read as reassurance.
 *  - CT abdomen/pelvis with contrast is the most sensitive study once
 *    perforation or a collection is suspected; ultrasound is a reasonable
 *    first look (no radiation) but is limited by overlying bowel gas once
 *    there is a diffuse process.
 *  - Antibiotics are source-control-sparing, not source-control-replacing —
 *    surgery is still required even after a good antibiotic response.
 *  - Sepsis-bundle sequencing: blood cultures before the first antibiotic
 *    dose, antibiotics within the first hour, fluid resuscitation completed
 *    BEFORE induction of anaesthesia.
 *  - Analgesia does not mask this diagnosis and must never be withheld
 *    pending surgical review — the old teaching to do so is outdated.
 *
 * See src/data/cases/pph.ts for the structural exemplar and CASE_MODEL.md
 * for the binding design spec this file follows.
 */
export const SCAFFOLD_APPENDICITIS: CaseScaffold = {
  id: 'scaffold_appendicitis',
  title: 'Severe Abdominal Pain, Rigidity and Fever',
  conditionName: 'Perforated Appendicitis with Peritonitis and Sepsis',
  subject: 'Surgery',
  system: 'General Surgery',
  demographics: {
    name: 'Arjun Mehta',
    age: 24,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 24-year-old man is brought to the emergency department with severe, generalised abdominal pain. It began two days ago as a dull ache around the umbilicus, shifted to the right lower abdomen by the next day, and has spread across the whole abdomen over the last twelve hours. He has had a high fever, repeated vomiting, and has not passed flatus since this morning. He looks unwell, is breathing rapidly and shallowly, and winces when the stretcher is jolted.',
  initialVitals: {
    hr: 128,
    bp: '92/58',
    rr: 26,
    spo2: 95,
    temp: '39.4°C',
    grbs: 118,
  },
  clinchingClue:
    'Contrast CT of the abdomen and pelvis shows a thick-walled, non-enhancing appendix in the right iliac fossa with an appendicolith, a focal defect in its wall, surrounding fat stranding, a peri-appendiceal collection and free fluid tracking across the abdomen — confirming a defect at that site with spread well beyond it.',
  clinchingClueTimeMinutes: 30,
  examFindingsMap: {
    general: 'Ill-looking, flushed, dry tongue, lying still on the trolley and reluctant to move; temperature 39.4°C.',
    cvs: 'Tachycardic, regular rhythm, warm peripheries with bounding pulses and a brisk capillary refill — an early distributive picture rather than cold shock.',
    chest: 'Bilateral air entry equal and clear; breathing rapid and shallow, splinting the abdomen with each breath.',
    abdomen: 'Diffuse tenderness across all four quadrants with board-like guarding and generalised rebound tenderness, most marked in the right iliac fossa; bowel sounds absent; the abdomen is distended and does not move with respiration.',
    rectal: 'Digital rectal examination is tender on the right side of the pelvic floor, in keeping with a collection tracking down into the pelvis.',
  },
  historyMap: {
    presenting: 'Pain began peri-umbilical two days ago, migrated to the right lower abdomen the next day, and has been generalised for the last twelve hours; associated with anorexia and two episodes of vomiting.',
    past: 'No previous abdominal surgery; no known chronic illness.',
    medications: 'Took over-the-counter antacid tablets for the pain yesterday; no antibiotics taken so far.',
    allergies: 'No known drug allergies.',
    family: 'Non-contributory.',
    social: 'No alcohol or tobacco use.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText: 'CBC: Hb 13.6 g/dL (Reference 13.0–17.0 g/dL), WBC 18,600/mcL (Reference 4,000–11,000/mcL) with 88% neutrophils and band forms (left shift), Platelets 168,000/mcL (Reference 150,000–450,000/mcL) — marked neutrophilic leucocytosis in keeping with a significant intra-abdominal bacterial source.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp'],
      resultText: 'Serum CRP: 212 mg/L (Reference <5 mg/L) — markedly elevated, supporting significant intra-abdominal inflammation; used alongside the total count, but neither is specific enough alone to make this diagnosis.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    procalcitonin: {
      aliases: ['procalcitonin'],
      resultText: 'Procalcitonin: 4.8 ng/mL (Reference <0.5 ng/mL) — markedly elevated, consistent with a bacterial source and an evolving systemic response; more useful trended over time to judge response to source control than used alone to diagnose.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    serum_lactate: {
      aliases: ['serum lactate'],
      resultText: 'Serum Lactate: 3.6 mmol/L (Reference 0.5–1.6 mmol/L) — elevated, reflecting tissue hypoperfusion; part of the initial resuscitation bundle and repeated to judge response to treatment.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    abg: {
      aliases: ['abg'],
      resultText: 'ABG: pH 7.31 (Reference 7.35–7.45), PaCO2 32 mmHg, PaO2 88 mmHg, HCO3 16 mEq/L (Reference 22–26 mEq/L), Base Excess -6 mEq/L — a mild metabolic acidosis with early respiratory compensation, in keeping with an evolving systemic bacterial response and hypoperfusion.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText: 'Renal Function: Blood Urea 48 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.3 mg/dL (Reference 0.6–1.2 mg/dL) — mildly elevated, reflecting dehydration and early hypoperfusion; worth trending to catch an evolving kidney injury.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText: 'Serum Electrolytes: Na+ 132 mEq/L (Reference 135–145 mEq/L), K+ 3.3 mEq/L (Reference 3.5–5.0 mEq/L), Cl- 97 mEq/L (Reference 96–106 mEq/L) — mild hyponatraemia and hypokalaemia from vomiting and reduced intake, worth correcting before theatre.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft'],
      resultText: 'Liver Function Tests: AST 22 U/L (Reference 10–40 U/L), ALT 26 U/L (Reference 7–56 U/L), Total Bilirubin 0.7 mg/dL (Reference 0.2–1.2 mg/dL), Albumin 3.6 g/dL (Reference 3.5–5.0 g/dL) — normal; mainly useful here to make a biliary cause less likely rather than to confirm this diagnosis.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'Liver function does not discriminate here, and a normal result does not make the abdomen any less concerning.',
    },
    urine_routine: {
      aliases: ['urine routine & microscopy', 'urine routine', 'urinalysis'],
      resultText: 'Urine Routine & Microscopy: No pus cells, no red cells, no nitrites — normal, arguing against a urinary source for the pain.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    xray_erect: {
      aliases: ['x-ray abdomen erect', 'erect abdominal x-ray'],
      resultText: 'X-ray Abdomen Erect: No free gas under the diaphragm and no air-fluid levels. A normal erect film here does NOT rule out a defect in the bowel wall — free intraperitoneal gas is often absent when a wall breach in the right iliac fossa is walled off by adjacent bowel and omentum, unlike a perforated peptic ulcer, where free gas is usually seen.',
      turnaroundMinutes: 15,
      category: 'imaging',
      isIndicative: false,
      yieldNote:
        'No free gas under the diaphragm. That is the expected finding and it excludes nothing: this organ rarely releases enough gas to be visible on a plain film, unlike a hollow viscus higher up. A negative film here is falsely reassuring.',
    },
    usg_abdomen: {
      aliases: ['usg abdomen & pelvis', 'usg abdomen', 'ultrasound abdomen'],
      resultText: 'USG Abdomen & Pelvis: Non-compressible, blind-ending tubular structure in the right iliac fossa measuring 11 mm with peri-appendiceal free fluid; views are limited by overlying bowel gas from an ileus, and a discrete collection or wall breach cannot be confidently excluded on this study.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    ct_abdomen: {
      aliases: ['ct abdomen & pelvis contrast', 'ct abdomen', 'ct abdomen pelvis'],
      resultText: 'CT Abdomen & Pelvis with Contrast: Thick-walled, non-enhancing appendix in the right iliac fossa with an appendicolith, a focal wall defect, adjacent fat stranding, a peri-appendiceal/pelvic collection and free fluid extending across the abdomen — the most sensitive study for this picture, particularly once a wall breach or collection is suspected.',
      turnaroundMinutes: 45,
      category: 'imaging',
      isIndicative: true,
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'large bore iv'],
      responseText: 'Two wide-bore (16G) IV cannulae secured for rapid fluid, antibiotic and blood product access.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable large-bore venous access is the first practical step, needed before fluid resuscitation, antibiotics and blood tests can all proceed.',
    },
    iv_fluids: {
      aliases: ['ringer lactate 500 ml bolus', 'ringer lactate', 'crystalloid bolus'],
      responseText: 'Ringer Lactate 500 mL bolus given rapidly IV, with ongoing crystalloid to follow.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -10, bp: '104/64' },
      appropriateness: 'indicated',
      rationale: 'Prompt crystalloid resuscitation corrects the volume deficit from vomiting, reduced intake and third-space losses, and must be underway before the patient is taken to theatre — resuscitation is completed before induction of anaesthesia, not started after it.',
    },
    blood_cultures: {
      aliases: ['blood culture ×2 (before antibiotics)', 'blood cultures', 'blood culture'],
      responseText: 'Two sets of blood cultures drawn from separate venepuncture sites before the first dose of antibiotic is given.',
      onsetMinutes: 2,
      appropriateness: 'indicated',
      rationale: 'Blood cultures should be drawn before the first antibiotic dose wherever this does not delay treatment beyond the first hour — drawing them after an antibiotic is already circulating can sterilise the sample and lose the only chance to identify the organism and its sensitivities.',
    },
    antibiotics: {
      aliases: ['piperacillin-tazobactam iv', 'ceftriaxone 2 g iv', 'metronidazole iv'],
      responseText: 'Empirical broad-spectrum IV antibiotic cover started, targeting the Gram-negative and anaerobic organisms typical of a gut source.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -8, temp: '38.6°C' },
      labShift: {
        serum_lactate: 'Serum Lactate (repeat): 2.4 mmol/L (Reference 0.5–1.6 mmol/L) — improving with antibiotics and fluids while awaiting theatre, though still elevated pending source control.',
      },
      appropriateness: 'indicated',
      requiresFirst: ['blood_cultures'],
      harmfulSequenceResponseText: 'The antibiotic is given immediately, with no blood sample sent for culture first.',
      harmfulSequenceVitalsEffect: { hr: -4, temp: '38.9°C' },
      harmfulSequenceRationale: 'Giving the antibiotic before blood is sent for culture risks sterilising the sample, losing the chance to identify the organism and its sensitivities before treatment can be narrowed — two sets from separate sites take only a couple of minutes and belong before the drug is pushed, not after.',
      rationale: 'Empirical antibiotics covering Gram-negative and anaerobic gut organisms should be started within the first hour, but they are source-control-sparing, not source-control-replacing — they do not substitute for the operation that removes the underlying source.',
    },
    inadequate_antibiotic: {
      aliases: ['azithromycin', 'doxycycline'],
      responseText: 'Antibiotic given.',
      onsetMinutes: 30,
      vitalsEffect: { hr: 10, bp: '84/52', temp: '39.9°C' },
      appropriateness: 'harmful',
      rationale: 'Azithromycin and doxycycline are aimed at atypical and respiratory organisms and do not reliably cover the Gram-negative and anaerobic gut organisms responsible for this picture; relying on either leaves the true intra-abdominal source under-treated while the systemic bacterial response continues to progress.',
    },
    analgesia: {
      aliases: ['morphine iv', 'iv morphine', 'analgesia'],
      responseText: 'IV Morphine given for pain, titrated to effect.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Adequate analgesia should be given early and does not mask the physical signs of this diagnosis — the old teaching to withhold pain relief until a surgeon has examined the patient is outdated and unnecessarily leaves a patient in severe pain.',
    },
    antiemetic: {
      aliases: ['ondansetron iv', 'antiemetic'],
      responseText: 'IV Ondansetron given for the vomiting.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Controlling vomiting is a simple supportive measure that improves comfort and reduces further fluid and electrolyte loss while definitive treatment is arranged.',
    },
    ngt: {
      aliases: ['nasogastric tube', 'ngt', 'ryles tube'],
      responseText: 'Nasogastric tube passed and put on free drainage.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Nasogastric decompression rests the gut, reduces vomiting and aspiration risk in a patient with an ileus and an abdomen distended enough to interfere with breathing, ahead of a general anaesthetic.',
    },
    npo: {
      aliases: ['nil by mouth', 'npo', 'nbm'],
      responseText: 'Kept nil by mouth in preparation for theatre.',
      onsetMinutes: 2,
      appropriateness: 'indicated',
      rationale: 'Nil by mouth reduces the risk of aspiration during induction of anaesthesia and is a standard part of preparing a patient who is very likely to need an operation.',
    },
    foley: {
      aliases: ['foley catheterisation', 'foley catheter', 'urinary catheterisation'],
      responseText: 'Foley catheter inserted for hourly urine output monitoring.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Hourly urine output is a simple, continuous marker of end-organ perfusion during resuscitation of an early systemic bacterial response, and should be monitored from early on rather than only once shock is established.',
    },
    appendicectomy: {
      aliases: ['emergency laparotomy', 'appendicectomy', 'appendectomy', 'laparoscopic appendicectomy', 'source control surgery'],
      responseText: 'Emergency surgery performed, removing the diseased appendix, washing out the peritoneal cavity and achieving definitive source control.',
      onsetMinutes: 90,
      vitalsEffect: { hr: -24, bp: '116/74', temp: '37.4°C' },
      labShift: {
        cbc: 'CBC (repeat): WBC 10,800/mcL (Reference 4,000–11,000/mcL) with a normalising differential — falling after source control and continued antibiotics.',
        crp: 'Serum CRP (repeat): 42 mg/L (Reference <5 mg/L) — declining from the peak but still elevated in the early post-operative period.',
        serum_lactate: 'Serum Lactate (repeat): 1.2 mmol/L (Reference 0.5–1.6 mmol/L) — normalised after source control and adequate resuscitation.',
      },
      appropriateness: 'indicated',
      requiresFirst: ['iv_fluids', 'antibiotics'],
      harmfulSequenceResponseText: 'Anaesthesia is induced and the patient taken to theatre before fluid resuscitation or the first antibiotic dose were completed; shortly after induction the blood pressure crashes and the case has to be paused for emergency resuscitation on the table.',
      harmfulSequenceVitalsEffect: { hr: 24, bp: '68/40' },
      harmfulSequenceRationale: 'Induction of anaesthesia abolishes the compensatory sympathetic drive propping up the blood pressure in an under-resuscitated, feverish patient, and can precipitate cardiovascular collapse on the table. Fluid resuscitation and the first antibiotic dose must be running before induction — theatre is not delayed for an exhaustive work-up, but it is delayed the short time it takes to run in fluid and start the antibiotic.',
      rationale: 'Surgical removal of the source is the definitive treatment once the diagnosis is confirmed — antibiotics and fluids treat the systemic response but do not replace the operation, and delaying it while chasing a perfect work-up in a generalised picture like this one only allows the systemic response to progress.',
    },
    noradrenaline: {
      aliases: ['noradrenaline infusion', 'norepinephrine infusion', 'vasopressor'],
      responseText: 'Noradrenaline infusion started for the low blood pressure.',
      onsetMinutes: 10,
      vitalsEffect: { hr: 6, bp: '110/62', spo2: -1 },
      appropriateness: 'harmful',
      rationale: 'Reaching for a vasopressor before an adequate fluid challenge has been given treats the blood pressure number rather than the underlying volume deficit; started in an under-filled patient it raises afterload on a heart that has not yet been given preload, and risks digital and mesenteric ischaemia. Fluid resuscitation and source control come first, with a vasopressor reserved for a low blood pressure that remains fluid-refractory.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ringer lactate|crystalloid|iv fluid/i,
      name: 'Initial Fluid Resuscitation',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /blood culture/i,
      name: 'Blood Cultures Drawn (before antibiotics)',
      targetMilestoneMinutes: 45,
    },
    {
      orderOrActionPattern: /piperacillin|ceftriaxone|metronidazole|antibiotic/i,
      name: 'Empirical Broad-Spectrum Antibiotics (within the first hour)',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /laparotomy|appendicectomy|appendectomy/i,
      name: 'Source Control Surgery',
      targetMilestoneMinutes: 180,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_appy_1',
      title: 'Simple Left Renal Cortical Cyst',
      description: 'The CT scan incidentally shows a 2 cm simple, thin-walled left renal cortical cyst with no septations or calcification.',
      correctAction: 'No intervention needed; note in the report and reassure the patient, no follow-up imaging required for a simple cyst this size.',
      status: 'unnoticed',
    },
    {
      id: 'inc_appy_2',
      title: 'Asymptomatic Gallstones',
      description: 'Ultrasound incidentally notes a few small, non-obstructing gallstones in a normal-walled gallbladder, with no pericholecystic fluid.',
      correctAction: 'No acute intervention needed; mention the finding to the patient and arrange a routine outpatient surgical opinion only if symptoms develop.',
      status: 'unnoticed',
    },
    {
      id: 'inc_appy_3',
      title: 'Reducible Umbilical Hernia',
      description: 'Abdominal examination incidentally reveals a small, easily reducible umbilical hernia with no signs of obstruction or strangulation.',
      correctAction: 'No emergency intervention needed; elective repair can be considered later once the patient has recovered.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A young man arrives in the emergency department gravely unwell, with a rigid, board-like abdomen, a high fever, a fast pulse and a low blood pressure, having not passed flatus since the morning.',
      consequenceOnRight: 'IV access, fluid resuscitation, blood cultures and the first dose of a broad-spectrum antibiotic are all started within the first hour, alongside an urgent surgical referral.',
      consequenceOnWrong: 'Resuscitation and antibiotics are delayed while further tests are awaited, and the fast pulse and low blood pressure worsen.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'On examination the abdomen is diffusely tender with guarding and rebound tenderness in all four quadrants, bowel sounds are absent, and a per-rectal examination is tender on the right side of the pelvis.',
      consequenceOnRight: 'A widespread process arising from the right lower abdomen and now involving the whole abdominal cavity is correctly recognised as a surgical emergency needing urgent imaging and a surgical opinion.',
      consequenceOnWrong: 'The generalised findings are mistaken for a purely medical cause such as gastroenteritis, and the surgical emergency is missed.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'The team must choose the next imaging study to confirm the site and extent of the problem before involving the surgical team.',
      consequenceOnRight: 'Contrast CT of the abdomen and pelvis is chosen, giving the most sensitive picture of a collection, free fluid and the point of disease in the right lower abdomen; ultrasound is recognised as a reasonable first look but limited here by overlying bowel gas.',
      consequenceOnWrong: 'An erect abdominal X-ray alone is relied on to look for a hole in the bowel, and its normal appearance is wrongly taken as reassurance, when a normal film does not exclude one here.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The surgical team wants to take the patient to theatre for source control, but fluid resuscitation and the first dose of antibiotic have not yet been completed.',
      consequenceOnRight: 'Fluid resuscitation and the first antibiotic dose are completed first, and the patient tolerates induction of anaesthesia safely.',
      consequenceOnWrong: 'The patient is rushed to theatre unresuscitated, and the blood pressure crashes on induction of anaesthesia.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'Selecting the empirical antibiotic regimen for an intra-abdominal source before the organism and its sensitivities are known.',
      consequenceOnRight: 'A broad-spectrum regimen covering Gram-negative and anaerobic gut organisms is chosen and given within the first hour.',
      consequenceOnWrong: 'An antibiotic effective mainly against atypical or respiratory organisms is chosen, leaving the true gut source under-treated.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before discharge after recovery from surgery, the team reviews what should be documented and planned so a wound or intra-abdominal collection is not missed if a fever recurs at home.',
      consequenceOnRight: 'Wound care instructions, red-flag fever advice and a follow-up review are documented before discharge.',
      consequenceOnWrong: 'The patient is discharged with no safety-netting advice, risking a missed post-operative collection.',
    },
  ],
};
