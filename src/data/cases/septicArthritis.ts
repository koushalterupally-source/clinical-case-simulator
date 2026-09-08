import { CaseScaffold } from '../../types';

/**
 * A pyogenic infection inside a joint space — modelled in a young child with
 * a hot, immobile hip, which is deliberately how this presentation is most
 * often tested: the differential against a self-limiting, benign synovial
 * irritation of childhood is a classic exam pairing, and the hip's precarious
 * blood supply to the femoral head raises the stakes of any delay in a way a
 * more forgiving joint would not.
 *
 * The central teaching point is sequence: joint aspiration BEFORE antibiotics
 * is what secures both the diagnosis and the organism's sensitivities, so
 * `empiric_iv_antibiotics` carries `requiresFirst: ['joint_aspiration']` with
 * an honest rationale about losing the culture, rather than being graded
 * harmful outright — giving antibiotics is never wrong, only giving them
 * before sampling the fluid is. Two further therapies are graded genuinely
 * harmful in their own right: treating this as manageable on oral antibiotics
 * at home, and giving an intra-articular steroid injection on the assumption
 * this is an inflammatory rather than infective process — the latter ties
 * directly to the required differential against inflammatory arthritis.
 * `criticalInterventions` treats surgical washout, not antibiotics alone, as
 * the definitive step: this is a surgical emergency for drainage, not a
 * medical one antibiotics alone can resolve.
 *
 * `conditionName` is "Septic Arthritis" — its content words ("septic",
 * "arthritis") are what Test Suite 14 / caseSchema extract and forbid from
 * `openingVignette` and every gate's `patientContext`; those fields describe
 * "a hot, swollen, immobile joint" and "a joint infection" in their place.
 * The fully explicit vocabulary is used freely everywhere else (exam
 * findings, history, investigation and therapy text), none of which the
 * validator checks.
 *
 * See CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 */
export const SCAFFOLD_SEPTIC_ARTHRITIS: CaseScaffold = {
  id: 'scaffold_septic_arthritis',
  title: 'High Fever with a Hot, Immobile Hip in a Young Child',
  conditionName: 'Septic Arthritis',
  subject: 'Orthopedics',
  system: 'Orthopaedics',
  demographics: {
    name: 'Aarav Deshmukh',
    age: 5,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 5-year-old boy is brought to the emergency department with two days of high fever and worsening pain in his right hip, to the point that he now refuses to bear any weight on that leg and cries out whenever anyone tries to move it. He holds the leg flexed at the hip, turned slightly outward, and resists any attempt to straighten or rotate it. He looks unwell and irritable, and his parents say he was completely well and playing normally three days ago.',
  initialVitals: {
    hr: 128,
    bp: '96/60',
    rr: 24,
    spo2: 98,
    temp: '39.3°C',
    grbs: 92,
  },
  clinchingClue:
    'Ultrasound of the hip confirms a significant effusion within the joint capsule, and aspiration of the joint before any antibiotic is given yields turbid, yellow-white fluid with a synovial white cell count of 72,000/mm3 (over 90% neutrophils) and Gram-positive cocci seen on direct staining, with a synovial glucose markedly lower than a paired serum sample and no crystals on polarised microscopy — a picture that confirms a joint infection rather than a self-limiting, benign synovial irritation or a crystal or inflammatory joint disease.',
  clinchingClueTimeMinutes: 60,
  examFindingsMap: {
    general: 'Irritable, unwell-looking, febrile, reluctant to be examined; cries with any attempt to move the affected leg.',
    cvs: 'Tachycardic, regular rhythm, normal heart sounds, capillary refill normal.',
    respiratory: 'Mildly tachypnoeic from fever and distress, chest clear bilaterally.',
    musculoskeletal: 'The right hip is held flexed, abducted and externally rotated — the position that maximises the capacity of the joint capsule and is most comfortable when a large effusion is present under pressure. Any attempt to passively flex, extend or rotate the hip in either direction produces severe pain and involuntary guarding of the surrounding muscles. There is no visible skin change, warmth or swelling that can be directly seen or felt, since the hip joint lies too deep for this, unlike a more superficial joint.',
    skin: 'No rash, no overlying erythema, no wound or portal of entry visible near the hip; skin elsewhere unremarkable.',
    cns: 'Alert but irritable and difficult to console because of pain; no focal neurological deficit.',
  },
  historyMap: {
    presenting: 'Two days of high fever and progressively worsening right hip pain, now refusing to bear weight on that leg and resisting any movement of it, following three days of being completely well.',
    past: 'No known joint disease, no previous similar episode in any joint, no known immunodeficiency; up to date on routine childhood vaccination.',
    medications: 'Given paracetamol at home for the fever with only brief, partial relief.',
    allergies: 'No known drug allergies.',
    family: 'No family history of joint disease or autoimmune illness in childhood.',
    social: 'Attends preschool; no recent travel; no known unwell contacts; no antecedent skin infection, injury or wound noticed near the hip.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText: 'CBC: Hb 11.2 g/dL (Reference 11.0–14.0 g/dL for age), WBC 18,600/mcL (Reference 5,000–15,500/mcL for age) with 78% neutrophils, Platelets 420,000/mcL (Reference 150,000–450,000/mcL) — a raised white cell count with a neutrophil predominance and a reactive rise in platelets, both in keeping with an acute bacterial process.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp', 'c-reactive protein'],
      resultText: 'CRP: 92 mg/L (Reference <5 mg/L) — markedly elevated. CRP is the more sensitive and specific of the two commonly used inflammatory markers here and is the better one to trend as treatment response is assessed.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: true,
    },
    esr: {
      aliases: ['esr', 'erythrocyte sedimentation rate'],
      resultText: 'ESR: 58 mm/hr (Reference 0–10 mm/hr) — markedly elevated. Alongside fever above 38.5°C, inability to bear weight and a raised white cell count, a markedly raised ESR is one of a well-known set of clinical and laboratory predictors used to estimate how likely a joint infection is versus a self-limiting cause of a painful hip in a child; he meets essentially all of them here.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture ×2 (before antibiotics)', 'blood culture', 'blood cultures', 'blood culture before antibiotics'],
      resultText: 'Blood Culture, sent before the first dose of antibiotics: preliminary Gram stain and early growth pending at this time; children with this presentation are frequently bacteraemic, so a positive result here would independently support the diagnosis and identify the organism even before the joint fluid culture finalises.',
      turnaroundMinutes: 240,
      category: 'labs',
      isIndicative: true,
    },
    synovial_fluid_analysis: {
      aliases: ['synovial fluid analysis', 'joint fluid analysis', 'joint fluid cell count and gram stain', 'send joint fluid for culture'],
      resultText: 'Synovial Fluid Analysis (aspirated before any antibiotic given): Turbid, yellow-white fluid. White cell count 72,000/mm3 (Reference <200/mm3 in a normal joint) with 94% neutrophils — well above the level considered strongly suggestive of a joint infection. Gram stain shows Gram-positive cocci in clusters. Synovial glucose 28 mg/dL against a paired serum glucose of 98 mg/dL — a large synovial-to-serum gap typical of a bacterial process consuming glucose within the joint. No crystals seen on polarised microscopy, which argues against a crystal-induced cause. This sample, taken before any antibiotic was given, gives the best possible chance of identifying the organism and its antibiotic sensitivities on culture.',
      turnaroundMinutes: 60,
      category: 'procedures',
      isIndicative: true,
    },
    xray_hip: {
      aliases: ['x-ray pelvis with both hips', 'x-ray hip', 'xray hip', 'x ray pelvis hips'],
      resultText: 'X-ray, Pelvis with Both Hips: Subtle widening of the joint space on the affected side with soft tissue fullness around the joint; no fracture, no bony erosion, and the femoral head ossification centre looks normal for age at this early stage. A plain film is frequently unremarkable early in this presentation and a normal film here does not argue against the diagnosis.',
      turnaroundMinutes: 25,
      category: 'imaging',
      isIndicative: true,
    },
    usg_hip: {
      aliases: ['ultrasound hip joint', 'usg hip', 'ultrasound of the hip'],
      resultText: 'Ultrasound, Right Hip: A significant effusion is seen within the joint capsule, distending it well beyond the unaffected side, with echogenic debris suggesting a purulent rather than a simple, clear exudate. This is the key bedside test for confirming an effusion at this joint and for guiding the aspirating needle safely into it.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    mri_hip: {
      aliases: ['mri hip & pelvis', 'mri hip', 'mri pelvis'],
      resultText: 'MRI, Hip and Pelvis: Confirms the joint effusion already seen on ultrasound, with mild adjacent bone marrow oedema in the femoral neck that may represent early spread of infection into the adjacent bone. Requires sedation and a longer scan time in a child this age.',
      turnaroundMinutes: 90,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote: 'A bedside ultrasound has already confirmed the effusion and can guide aspiration right now; sending an already febrile, uncomfortable young child for a sedated MRI scan before the joint has even been aspirated delays the one step — getting fluid out of the joint, both to diagnose and to relieve pressure — that cannot safely wait. MRI has a role afterward if extension into the adjacent bone needs to be characterised, not as a gatekeeper before aspiration.',
    },
    ana_rf_panel: {
      aliases: ['ana / rf panel', 'ana panel', 'rheumatoid factor', 'autoimmune workup'],
      resultText: 'ANA / Rheumatoid Factor: Both negative.',
      turnaroundMinutes: 480,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'An autoimmune panel takes hours to return and cannot distinguish an acute bacterial process from an inflammatory one today — the joint fluid analysis already sent is what actually separates these possibilities, quickly and definitively, and nothing here should be waited on before deciding on aspiration or antibiotics.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['iv access', 'wide bore cannula', 'iv cannula', 'peripheral iv access'],
      responseText: 'IV access is secured for fluids, analgesia and antibiotics.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Reliable IV access is the prerequisite for fluids, antibiotics and analgesia, and should be secured as soon as he is assessed.',
    },
    iv_fluids: {
      aliases: ['iv fluids', 'iv maintenance fluids', 'fluid bolus'],
      responseText: 'IV maintenance fluids are started, given reduced oral intake from pain and fever.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Fever and pain have reduced his oral intake over the last two days; simple IV maintenance fluids are appropriate, low-risk supportive care while definitive treatment is arranged.',
    },
    antipyretic_paracetamol: {
      aliases: ['iv paracetamol', 'paracetamol', 'antipyretic'],
      responseText: 'IV paracetamol is given for fever and pain relief, dosed by weight.',
      onsetMinutes: 30,
      vitalsEffect: { temp: '38.4°C', hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Fever and pain control are appropriate supportive care, but bringing the temperature down must never be mistaken for treating the underlying problem, and should not delay aspiration or antibiotics.',
    },
    analgesia_iv: {
      aliases: ['iv analgesia', 'iv opioid analgesia', 'analgesia'],
      responseText: 'Titrated IV analgesia, dosed by weight, is given for severe pain.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Adequate analgesia is basic supportive care for pain of this severity and should not be withheld while other assessments and orders proceed.',
    },
    splint_immobilization: {
      aliases: ['splint & immobilise the limb', 'immobilise the limb', 'splint the leg'],
      responseText: 'The leg is gently supported in the position of comfort and kept still, without forcing it into a different position.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Simple immobilisation in the position of comfort reduces pain from movement, but it is purely supportive and must never substitute for, or delay, prompt aspiration and definitive treatment.',
    },
    joint_aspiration: {
      aliases: ['ultrasound-guided joint aspiration', 'joint aspiration', 'aspirate the hip joint', 'hip aspiration'],
      responseText: 'Ultrasound-guided aspiration of the hip joint is performed under sedation before any antibiotic is given, and the fluid obtained is set aside — sending it for cell count, Gram stain and culture is a separate order from the procedure itself.',
      onsetMinutes: 45,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Aspirating the joint before any antibiotic is given is what actually preserves the chance of identifying the organism and its sensitivities on the fluid sent afterward — this single step should happen as early as possible and should never be delayed for imaging beyond the ultrasound needed to guide the needle.',
    },
    empiric_iv_antibiotics: {
      aliases: ['iv cloxacillin', 'empiric iv antibiotics', 'iv antibiotics', 'cloxacillin'],
      responseText: 'IV cloxacillin is started empirically, covering the most likely causative organism, with the regimen to be adjusted once Gram stain and culture results are available.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -10, temp: '38.0°C' },
      appropriateness: 'indicated',
      rationale: 'Prompt empirical antibiotics after the joint has been sampled are a core part of treatment, chosen initially to cover the most likely organism and then narrowed once culture and sensitivity results return.',
      requiresFirst: ['joint_aspiration'],
      harmfulSequenceResponseText: 'IV cloxacillin is started immediately, before the hip joint has been aspirated. His fever begins to settle, but by the time the joint is aspirated some hours later, the fluid obtained is less turbid than expected and both the Gram stain and culture come back negative — the antibiotic already on board has partially sterilised the sample.',
      harmfulSequenceVitalsEffect: { temp: '39.1°C' },
      harmfulSequenceRationale: 'Even a single dose of antibiotic can suppress bacterial growth on culture and blunt the Gram stain enough to lose the causative organism, which then makes it far harder to safely narrow a broad empirical regimen later or to confirm the diagnosis with certainty. Aspiration should happen first — it takes only minutes to arrange once the diagnosis is suspected — and antibiotics should follow immediately after, not before.',
    },
    surgical_washout: {
      aliases: ['surgical washout of the hip', 'arthrotomy and washout', 'joint washout', 'incision and drainage of the hip', 'surgical drainage of the joint'],
      responseText: 'He is taken to theatre for formal surgical washout of the hip joint, with the joint opened, all purulent fluid drained and the joint space irrigated thoroughly.',
      onsetMinutes: 240,
      vitalsEffect: { hr: -12, temp: '37.6°C' },
      appropriateness: 'indicated',
      rationale: 'This is a surgical emergency, not a medical one antibiotics alone can resolve — pressure and bacterial enzymes within a closed joint space destroy cartilage within days if the pus is not physically drained, and the hip carries the added urgency that a tense effusion can itself compress the blood vessels supplying the femoral head. Washout should be arranged as soon as the diagnosis is secured, not deferred to see whether antibiotics alone bring the fever down first.',
    },
    oral_antibiotics_outpatient: {
      aliases: ['oral antibiotics as outpatient', 'discharge on oral antibiotics', 'outpatient oral antibiotic course'],
      responseText: 'He is discharged home on a course of oral antibiotics, with instructions to return if he does not improve.',
      onsetMinutes: 30,
      vitalsEffect: { hr: 10, temp: '39.7°C' },
      appropriateness: 'harmful',
      rationale: 'A joint infection needs admission for IV antibiotics and prompt surgical drainage, not outpatient oral therapy — pressure and enzymatic damage inside the joint continue regardless of the antibiotic route, and sending him home risks irreversible cartilage destruction and worsening systemic illness before he is even brought back for reassessment.',
    },
    intraarticular_steroid_injection: {
      aliases: ['intra-articular corticosteroid injection', 'steroid injection into the joint', 'intra-articular steroid'],
      responseText: 'An intra-articular corticosteroid injection is given into the hip, presuming this to be a flare of an inflammatory joint disease rather than an infection.',
      onsetMinutes: 20,
      vitalsEffect: { hr: 14, temp: '40.1°C' },
      appropriateness: 'harmful',
      rationale: 'Injecting corticosteroid into a joint that is actually infected suppresses the local immune response and can rapidly accelerate bacterial growth and cartilage destruction, converting a serious but treatable infection into a fulminant one. Infection must be excluded on joint fluid analysis before an inflammatory cause is ever assumed and treated with an intra-articular injection.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /joint aspiration|aspirate the hip joint|hip aspiration/i,
      name: 'Joint Aspiration Performed',
      targetMilestoneMinutes: 90,
    },
    {
      orderOrActionPattern: /iv cloxacillin|empiric iv antibiotics|cloxacillin/i,
      name: 'Empiric IV Antibiotics Started',
      targetMilestoneMinutes: 150,
    },
    {
      orderOrActionPattern: /surgical washout|arthrotomy and washout|joint washout|incision and drainage of the hip/i,
      name: 'Surgical Washout of the Joint',
      targetMilestoneMinutes: 360,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_sa_1',
      title: 'Incidental Reactive Thrombocytosis on CBC',
      description: 'The baseline CBC incidentally shows platelets at the upper end of normal, consistent with a reactive response to acute illness.',
      correctAction: 'No separate action needed; a mild reactive rise in platelets is expected with acute infection and should be rechecked once he has recovered, not investigated as a primary blood disorder.',
      status: 'unnoticed',
    },
    {
      id: 'inc_sa_2',
      title: 'Incidental Small Umbilical Hernia',
      description: 'A small, easily reducible umbilical hernia is noted incidentally on abdominal examination.',
      correctAction: 'No acute action needed; most umbilical hernias in young children close spontaneously by school age and only need elective surgical referral if they persist or enlarge.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A young child arrives with two days of high fever, refuses to put any weight on one leg, and cries out whenever the affected hip is moved at all.',
      consequenceOnRight: 'This is recognised immediately as a joint emergency: he is assessed urgently, an orthopaedic opinion is sought without delay, and arrangements for prompt joint fluid sampling begin straight away.',
      consequenceOnWrong: 'The presentation is treated as a routine limp, and he is sent home with only analgesia and an outpatient follow-up appointment, losing time in a process that can damage the joint within days.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'He has a high fever, refuses to bear weight, and his inflammatory blood markers are markedly raised — the team must decide how confident they can be that this is a true joint infection rather than a self-limiting, benign irritation of the joint lining that children can also get.',
      consequenceOnRight: 'A well-known set of clinical and laboratory predictors — a fever above a set threshold, inability to bear weight, and markedly raised inflammatory markers — is applied, and meeting nearly all of them here is recognised as making the self-limiting explanation very unlikely, warranting urgent joint fluid sampling rather than reassurance.',
      consequenceOnWrong: 'The presentation is assumed to be the self-limiting, benign explanation without weighing any of these predictors, and sampling is deferred for outpatient review that risks coming too late.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'With the diagnosis strongly suspected, the team discusses whether to start antibiotics right away "to be safe" or to aspirate the joint first.',
      consequenceOnRight: 'The joint is aspirated and the fluid sent for cell count, Gram stain and culture before any antibiotic is given, giving the best possible chance of identifying the organism and its sensitivities.',
      consequenceOnWrong: 'Antibiotics are started before the joint is aspirated, and by the time fluid is eventually obtained the sample has already been partially sterilised, with the organism and its sensitivities lost.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'The joint has been aspirated and the team must decide on his ongoing treatment and disposition, including whether an injection into the joint would ever be appropriate if the fluid results took longer to return.',
      consequenceOnRight: 'He is admitted for IV antibiotics chosen to cover the likely organism, with any suggestion of an injection into the joint for a presumed inflammatory cause firmly set aside until infection has been excluded on the fluid analysis.',
      consequenceOnWrong: 'He is sent home on oral antibiotics as an outpatient, or an injection is given into the joint before infection has been excluded, either of which risks rapid and irreversible damage to the joint.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The joint fluid results confirm a bacterial process, and the team discusses whether IV antibiotics alone are enough or whether the joint itself needs to be surgically opened and washed out.',
      consequenceOnRight: 'This is recognised as needing formal surgical washout of the joint promptly, since pressure and bacterial enzymes inside a closed joint space destroy cartilage within days if the pus is not physically drained — antibiotics support this but cannot substitute for it.',
      consequenceOnWrong: 'Management is limited to IV antibiotics with a wait-and-watch approach, and surgical washout is delayed or never arranged, risking permanent damage to the joint.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'While arrangements for washout are being finalised, the team considers what specific risk this particular joint carries beyond the infection itself.',
      consequenceOnRight: 'It is recognised that a tense effusion within this joint can itself compress the blood vessels supplying the head of the thigh bone, adding urgency to prompt drainage that goes beyond simply treating the infection.',
      consequenceOnWrong: 'This pressure effect on the local blood supply is not considered, and washout is treated with the same urgency as it would be for any other joint, risking a separate, lasting complication that has nothing to do with the infection itself but everything to do with how long the pressure inside the joint was left unrelieved.',
    },
  ],
};
