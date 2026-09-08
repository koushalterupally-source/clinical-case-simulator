import { CaseScaffold } from '../../types';

/**
 * A rapidly progressive, limb- and life-threatening deep soft-tissue
 * infection presenting first as if it were ordinary cellulitis. The case is
 * built to punish the single most dangerous management error in this
 * condition: treating it as a medical problem that antibiotics alone can
 * fix. `antibiotics_only_observe` is modelled as genuinely harmful — not
 * merely suboptimal — because antibiotics cannot penetrate thrombosed,
 * necrotic tissue and every additional hour without surgical source control
 * measurably worsens survival and limb salvage.
 *
 * Pain out of proportion to visible skin findings, systemic toxicity,
 * crepitus and rapid clinical progression are the clinical anchors; the
 * LRINEC score is modelled as a genuine adjunct (its six components spelled
 * out with real point thresholds) that must never be used to override or
 * delay a clinical decision to operate — a normal or borderline score does
 * not exclude the diagnosis, and this case's gates are written to punish
 * treating the score as a gatekeeper rather than a supporting data point.
 *
 * See CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 */
export const SCAFFOLD_NECROTISING_FASCIITIS: CaseScaffold = {
  id: 'scaffold_necrotising_fasciitis',
  title: 'Rapidly Spreading Leg Pain and Skin Discolouration After a Minor Scratch',
  conditionName: 'Necrotising Fasciitis',
  subject: 'Dermatology',
  system: 'Dermatology',
  demographics: {
    name: 'Ramesh Yadav',
    age: 58,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 58-year-old man with long-standing, poorly controlled diabetes is brought to the emergency department with two days of rapidly worsening pain, swelling and skin discolouration of his right lower leg, which began at a small scratch he sustained while gardening. Over the last several hours the pain has become far more severe than the visible skin changes would suggest, patches of dusky, purplish discolouration have appeared, and a few blood-tinged blisters have formed on the skin. He is confused, breathing fast, and looks acutely unwell with a high fever.',
  initialVitals: {
    hr: 128,
    bp: '92/58',
    rr: 26,
    spo2: 94,
    temp: '39.5°C',
    grbs: 320,
  },
  clinchingClue:
    'The pain over the leg is markedly out of proportion to the skin changes visible on the surface, and firm palpation of the tissue beyond the visible discolouration produces a crackling sensation under the fingers (subcutaneous crepitus). The area of dusky, blistering skin is spreading visibly within the hour it is marked with a pen, and part of the affected skin has become numb rather than tender — a loss of sensation from destruction of the small nerves running through the tissue, which is a late and ominous sign, not a reassuring one. At surgical exploration, the tissue plane deep to the skin separates from the muscle with gentle finger dissection and shows grey, non-bleeding, foul-smelling tissue with only thin, dishwater-coloured fluid — confirming a rapidly destructive process that antibiotics alone could never have controlled.',
  clinchingClueTimeMinutes: 30,
  examFindingsMap: {
    general: 'Acutely unwell, confused and disoriented to time, febrile, breathing rapidly; looks toxic out of proportion to a simple skin infection.',
    cvs: 'Tachycardic, thready peripheral pulses, blood pressure at the lower end of normal, capillary refill mildly prolonged — an early picture of shock.',
    chest: 'Tachypnoeic, air entry equal bilaterally, no crepitations, no wheeze.',
    abdomen: 'Soft, non-tender, normal bowel sounds.',
    cns: 'Confused and disoriented to time and place but rousable and moving all limbs; no focal neurological deficit.',
    skin: 'The right lower leg shows an area of dusky, violaceous discolouration with ill-defined, rapidly advancing margins, several tense blood-tinged blisters, and a crackling sensation (crepitus) on firm palpation of tissue beyond the visible discolouration. Pain on light touch extends well beyond the visible skin changes, while a portion of the discoloured skin itself has become numb. Marking the edge of the discolouration and re-examining an hour later shows it has already advanced beyond the mark.',
  },
  historyMap: {
    presenting: 'A small scratch sustained while gardening two days ago, followed by rapidly worsening leg pain, swelling and skin discolouration, now with confusion and high fever over the last several hours.',
    past: 'Diabetes for approximately ten years, describes his sugars as "always a bit high"; no known peripheral vascular disease.',
    medications: 'Metformin, taken irregularly.',
    allergies: 'No known drug allergies.',
    family: 'No family history of a similar illness.',
    social: 'Works in his home garden regularly, often without gloves; non-smoker, occasional alcohol use.',
    immunisation: 'Tetanus immunisation status uncertain; last documented booster over 15 years ago, and this is a soil-contaminated wound.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 11.2 g/dL (Reference 13.0–17.0 g/dL), WBC 27,800/mcL (Reference 4,000–11,000/mcL) with 15% band forms, Platelets 118,000/mcL (Reference 150,000–450,000/mcL) — marked leucocytosis with a left shift and early thrombocytopenia, in keeping with a fulminant infective process and early consumptive coagulopathy.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp', 'c-reactive protein'],
      resultText: 'CRP: 224 mg/L (Reference <10 mg/L) — markedly elevated, one of the six inputs to the bedside risk score used to support (never replace) clinical suspicion here.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: true,
    },
    serum_electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes', 'serum electrolytes'],
      resultText: 'Serum Electrolytes: Sodium 129 mEq/L (Reference 135–145 mEq/L) — low, Potassium 4.4 mEq/L (Reference 3.5–5.0 mEq/L), Chloride 96 mEq/L (Reference 98–106 mEq/L). The low sodium is another of the six inputs to the bedside risk score.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests', 'renal function tests kft urea creatinine', 'rft kidney function tests urea creatinine'],
      resultText: 'Renal Function: Blood Urea 58 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.8 mg/dL (Reference 0.6–1.2 mg/dL) — acute kidney injury from evolving shock, and the creatinine value is another of the six inputs to the bedside risk score.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    rbs_grbs: {
      aliases: ['rbs / grbs', 'grbs', 'rbs', 'blood sugar', 'random blood sugar', 'rbs random blood sugar'],
      resultText: 'Random Blood Sugar: 320 mg/dL — markedly elevated, reflecting both his underlying diabetes and the stress of severe infection; also one of the six inputs to the bedside risk score.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    lrinec_score: {
      aliases: ['lrinec score calculation', 'lrinec score', 'lrinec'],
      resultText:
        'LRINEC Score (from CRP, total WBC, haemoglobin, sodium, creatinine and glucose already sent): CRP ≥150 mg/L (4 points) + WBC >25,000/mcL (2 points) + Hb <11 g/dL (2 points) + Na <135 mEq/L (2 points) + Creatinine >1.6 mg/dL (2 points) + Glucose >180 mg/dL (1 point) = 13 points, placing him in the high-risk band (score >8). A high score here supports what the examination already showed. The reverse is just as important to remember: this score was validated as a rule-in tool, not a rule-out one, and a low or moderate score in a patient whose examination already looks like this must never be used to argue against surgical exploration.',
      turnaroundMinutes: 15,
      category: 'monitoring',
      isIndicative: true,
    },
    vbg: {
      aliases: ['vbg', 'venous blood gas'],
      resultText: 'Venous Blood Gas: pH 7.28 (Reference 7.32–7.38 venous), HCO3 15 mEq/L (Reference 22–26 mEq/L), Lactate 4.8 mmol/L (Reference 0.5–2.0 mmol/L) — a significant metabolic acidosis with markedly raised lactate, in keeping with tissue hypoperfusion and early septic shock.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture ×2 (before antibiotics)', 'blood culture', 'blood cultures', 'blood culture before antibiotics'],
      resultText: 'Blood Culture ×2, sent before the first dose of antibiotics: pending at this time — result held on file; a positive culture will help narrow empirical antibiotic cover once the organism and sensitivities are known.',
      turnaroundMinutes: 240,
      category: 'labs',
      isIndicative: true,
    },
    deep_tissue_gram_stain: {
      aliases: ['deep tissue gram stain & culture', 'deep tissue culture', 'wound gram stain', 'tissue gram stain'],
      resultText: 'Deep Tissue Gram Stain (sample taken from the wound bed at surgical exploration): Mixed gram-positive cocci and gram-negative rods with scant neutrophils relative to the degree of tissue destruction seen — a polymicrobial pattern where the pace of tissue injury has outstripped the local immune response. Culture and sensitivities are pending.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: true,
    },
    superficial_wound_swab: {
      aliases: ['superficial wound swab', 'skin swab culture', 'surface swab'],
      resultText: 'Superficial Wound Swab: Mixed skin commensals grown — a swab taken from the surface only, before any surgical exploration.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A swab of the surface samples whatever skin flora happens to be sitting on top and routinely misses the organisms actually driving destruction in the deeper tissue plane. A sample taken from the wound bed at surgical exploration is what actually guides antibiotic therapy here — this swab does not change management and should not be relied on over that.',
    },
    xray_soft_tissue: {
      aliases: ['x-ray leg (soft tissue view)', 'x-ray leg', 'plain x-ray leg', 'soft tissue x-ray'],
      resultText: 'Plain X-ray, Right Leg (soft tissue technique): Streaky lucencies tracking along the tissue planes of the calf, in keeping with gas within the soft tissue. A quick, useful positive finding when present, but plain films miss gas in a substantial proportion of confirmed cases — a normal film must never be used to argue against the diagnosis when the examination already points to it.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    ct_limb_contrast: {
      aliases: ['ct leg with contrast', 'ct limb contrast', 'contrast ct leg', 'mri leg'],
      resultText: 'CT Lower Limb with Contrast: Fat stranding and streaky gas tracking along the deep fascial planes of the calf, with a small area of non-enhancing tissue — findings that require clinical correlation and do not change what the surgical team already needed to do.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote: 'Sending a toxic, hypotensive, rapidly deteriorating patient to the scanner "to confirm" a diagnosis the examination has already made spends the single resource that matters most here — time — and adds a contrast load on top of kidneys already injured by evolving shock. When the clinical picture is this convincing, the correct next stop is the operating theatre, not the CT suite.',
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile', 'pt inr aptt'],
      resultText: 'PT/INR: PT 15.6 sec (Reference 11–13.5 sec), INR 1.3 (Reference 0.8–1.1), aPTT 38 sec (Reference 25–35 sec) — mildly deranged, consistent with an early consumptive coagulopathy from severe sepsis; useful preoperative baseline and to guide blood product support if surgery proceeds.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'access', 'iv two wide bore cannulae', 'two wide bore cannulae'],
      responseText: 'Two wide-bore (16G) IV cannulae are secured immediately for fluids, antibiotics and pre-operative access.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable large-bore venous access is the prerequisite for rapid fluid resuscitation, immediate empirical antibiotics and getting him to theatre without delay, and should be secured the moment he is assessed.',
    },
    iv_fluid_resuscitation: {
      aliases: ['ringer lactate 500 ml bolus', 'ringer lactate', 'rl bolus', 'ringer lactate bolus', 'iv fluids', 'fluid bolus', 'crystalloid'],
      responseText: 'Ringer Lactate is given as a rapid bolus and continued as guided crystalloid resuscitation for evolving septic shock.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -10, bp: '104/66' },
      labShift: {
        vbg: 'Venous Blood Gas (repeat): pH 7.33, HCO3 19 mEq/L, Lactate 2.9 mmol/L — improved but not normalised with fluids alone; sustained improvement still depends on removing the source of infection.',
      },
      appropriateness: 'indicated',
      rationale: 'Prompt crystalloid resuscitation is part of standard sepsis bundle care and should start immediately alongside antibiotics — but it treats the downstream shock, not the underlying tissue destruction, and must never be used as a reason to delay surgery while chasing a fully normalised blood pressure.',
    },
    empiric_pip_tazo: {
      aliases: ['iv piperacillin-tazobactam', 'piperacillin-tazobactam', 'pip tazo', 'iv pip tazo'],
      responseText: 'Intravenous piperacillin-tazobactam is started immediately as broad-spectrum empirical cover against gram-positive, gram-negative and anaerobic organisms.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Broad empirical antibiotic cover targeting the mixed aerobic and anaerobic organisms typical of this infection should begin the moment it is suspected, sent after blood cultures are drawn but without waiting for them to result.',
    },
    iv_clindamycin: {
      aliases: ['iv clindamycin', 'clindamycin', 'inj clindamycin'],
      responseText: 'IV clindamycin is added alongside the broad-spectrum beta-lactam.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Clindamycin inhibits bacterial protein synthesis and suppresses ongoing exotoxin production by the causative organisms, an effect a cell-wall-active antibiotic alone does not provide. It is added as a standard adjunct here, on top of — never instead of — a broad-spectrum agent and surgical source control.',
    },
    iv_vancomycin: {
      aliases: ['iv vancomycin', 'vancomycin', 'inj vancomycin'],
      responseText: 'IV vancomycin is added for empirical cover against resistant gram-positive organisms while cultures are pending.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Given how severe and rapidly progressive this presentation is, empirical cover for a resistant gram-positive organism is reasonable alongside the broad-spectrum agent and clindamycin until deep tissue culture and sensitivity results allow the regimen to be narrowed.',
    },
    oxygen_supplemental: {
      aliases: ['supplemental oxygen', 'oxygen'],
      responseText: 'Supplemental oxygen is started via face mask, titrated to keep saturation above 94%.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 3 },
      appropriateness: 'indicated',
      rationale: 'Mild hypoxaemia here reflects the systemic demands of severe sepsis; supplemental oxygen is simple, low-risk supportive care while definitive treatment is arranged.',
    },
    analgesia: {
      aliases: ['morphine iv', 'morphine', 'iv morphine', 'iv analgesia'],
      responseText: 'IV morphine is titrated for pain control.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Adequate analgesia is appropriate supportive care and should not be withheld, but it must never be allowed to blunt ongoing reassessment of how far the pain and skin changes are spreading.',
    },
    tetanus_toxoid: {
      aliases: ['inj tetanus toxoid', 'tetanus toxoid', 'tetanus vaccine', 'tt injection'],
      responseText: 'Tetanus toxoid is given intramuscularly given the uncertain immunisation history and a soil-contaminated wound.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'A soil-contaminated wound with an immunisation history that cannot be confirmed as up to date within the last five years meets the criteria for a tetanus toxoid booster, regardless of how the wound itself is otherwise managed.',
    },
    vasopressor_noradrenaline: {
      aliases: ['iv noradrenaline infusion', 'noradrenaline', 'norepinephrine', 'vasopressor'],
      responseText: 'A noradrenaline infusion is started for blood pressure that remains low despite adequate fluid resuscitation.',
      onsetMinutes: 10,
      vitalsEffect: { bp: '108/70' },
      appropriateness: 'indicated',
      rationale: 'Vasopressor support for fluid-refractory hypotension is standard septic shock management, but it supports the circulation while the actual source of the problem is removed — it is never a substitute for surgical source control.',
    },
    emergency_surgical_debridement: {
      aliases: ['emergency surgical debridement', 'surgical debridement', 'surgical exploration and debridement', 'emergency fasciotomy and debridement', 'wound debridement'],
      responseText: 'Emergency surgical exploration is performed, all non-viable, grey and non-bleeding tissue is widely debrided down to healthy bleeding margins, and the wound is left open for planned re-look.',
      onsetMinutes: 90,
      vitalsEffect: { hr: -12, bp: '110/72', temp: '38.4°C' },
      appropriateness: 'indicated',
      rationale: 'Early, aggressive surgical debridement of all non-viable tissue is the single intervention most strongly linked to survival and limb salvage here. Antibiotics cannot penetrate thrombosed, dead tissue, and mortality rises with every additional hour source control is delayed — this must never wait for imaging, a risk score, or a fully resuscitated blood pressure.',
      requiresFirst: ['iv_access', 'iv_fluid_resuscitation'],
      harmfulSequenceResponseText: 'He is taken straight to the operating theatre for debridement before any IV line is secured or fluids started. Anaesthetic induction in an unresuscitated, already-hypotensive patient causes a sharp further drop in blood pressure requiring emergency vasopressor support before surgery can even begin.',
      harmfulSequenceVitalsEffect: { hr: 14, bp: '76/48' },
      harmfulSequenceRationale: 'Securing IV access and starting fluid resuscitation take only minutes and should happen in parallel with mobilising the surgical team — skipping them in the rush to theatre risks cardiovascular collapse on anaesthetic induction. This is not a reason to delay surgery itself; both should be happening within the same short window, not one after the other in the wrong order.',
    },
    antibiotics_only_observe: {
      aliases: ['continue antibiotics and observe overnight', 'antibiotics and observe', 'conservative management observe', 'observe and reassess in morning'],
      responseText: 'IV antibiotics are continued and he is admitted for serial limb observation overnight, with surgical review deferred to "see how he responds to antibiotics first."',
      onsetMinutes: 30,
      vitalsEffect: { hr: 14, bp: '78/48', temp: '40.1°C' },
      appropriateness: 'harmful',
      rationale: 'Antibiotics cannot penetrate necrotic, thrombosed tissue or halt a process that is destroying tissue by the hour — survival and limb salvage depend specifically on early surgical removal of the dead tissue. Waiting overnight "to see if he improves on antibiotics" is exactly the delay that converts a salvageable limb and a salvageable patient into a fatal or amputation-level outcome; this is a surgical emergency, not a medical one to be treated with antibiotics alone.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /piperacillin-tazobactam|pip tazo|iv clindamycin|clindamycin/i,
      name: 'Empiric Broad-Spectrum Antibiotics Started',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /surgical debridement|surgical exploration and debridement|wound debridement/i,
      name: 'Emergency Surgical Debridement',
      targetMilestoneMinutes: 180,
    },
    {
      orderOrActionPattern: /ringer lactate|rl bolus|crystalloid/i,
      name: 'Fluid Resuscitation Started',
      targetMilestoneMinutes: 60,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_nf_1',
      title: 'Incidental Markedly Elevated HbA1c',
      description: 'An HbA1c sent as part of his diabetes workup returns at 11.2% (Reference <5.7% non-diabetic, <7% controlled diabetic), reflecting long-standing poor glycaemic control well beyond today\'s acute illness.',
      correctAction: 'Note it for outpatient diabetes management once the acute illness has resolved; do not attempt to acutely correct HbA1c during the emergency admission, and avoid overly tight acute glucose targets that risk hypoglycaemia in a critically unwell patient.',
      status: 'unnoticed',
    },
    {
      id: 'inc_nf_2',
      title: 'Incidental Old Healed Surgical Scar',
      description: 'A well-healed appendectomy scar is noted on the abdomen during the general examination, unrelated to the current presentation.',
      correctAction: 'No action needed; note it in the record as an incidental old surgical history.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A man with diabetes arrives with two days of rapidly worsening leg pain and discolouration after a minor scratch, now confused, febrile and looking acutely unwell, with pain far worse than the skin changes would suggest.',
      consequenceOnRight: 'This is immediately recognised as a surgical emergency: IV access, fluids and broad-spectrum antibiotics are started at once, and the surgical team is called in parallel, without waiting for any test to return.',
      consequenceOnWrong: 'He is managed as a routine skin infection, started on oral or delayed antibiotics, and scheduled for a general ward review in the morning, losing hours that matter.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'On examination, the pain extends well beyond the visible skin discolouration, firm palpation produces a crackling sensation in the tissue, part of the discoloured skin has become numb rather than tender, and the margin of discolouration has visibly advanced within an hour of being marked.',
      consequenceOnRight: 'Pain out of proportion, crepitus, rapidly advancing margins and new numbness are recognised as the reliable early clinical signs, and the diagnosis is made and acted on clinically rather than waiting for a scan or a score to confirm it.',
      consequenceOnWrong: 'The team waits for imaging or a laboratory score to look convincing before accepting the diagnosis, while the process keeps advancing during the wait.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'IV access and fluids are running, and the team must decide how to combine antibiotics with surgical involvement — and specifically whether an agent that suppresses toxin production has any added role here.',
      consequenceOnRight: 'A broad-spectrum antibiotic plus a protein-synthesis inhibitor to suppress toxin production are both started immediately, at the same time the surgical team is called for emergency exploration — not as an alternative to surgery, but running in parallel with it.',
      consequenceOnWrong: 'Antibiotics alone are given with surgical review deferred "to see how he responds first" — a delay that leaves the true driver of his deterioration, the dead and dying tissue, completely untouched.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'The bedside laboratory risk score comes back and the team discusses how much weight to place on it, especially if it had come back only borderline rather than clearly high.',
      consequenceOnRight: 'The score is used only as one supporting data point alongside a clinical picture that already justified surgical exploration, and a low or borderline score is understood never to override or delay that decision.',
      consequenceOnWrong: 'A reassuring or borderline score is used to argue for delaying surgical exploration, even though the pain out of proportion, crepitus and rapidly advancing skin changes had already made the clinical diagnosis.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Acute kidney injury, an early consumptive coagulopathy and persisting hypotension are all present while the team prepares to move him to theatre.',
      consequenceOnRight: 'Fluids, vasopressor support and coagulation correction continue in parallel with getting him to theatre as quickly as possible, since sustained improvement in all of these depends on removing the source of the problem.',
      consequenceOnWrong: 'The team insists on a fully normalised blood pressure and corrected coagulation profile before agreeing to proceed to theatre, not recognising that none of these will reliably normalise until the infected tissue is removed.',
    },
  ],
};
