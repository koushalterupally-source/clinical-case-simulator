import { CaseScaffold } from '../../types';

/**
 * A major flame burn sustained in an enclosed room, with clinical signs
 * pointing to a smoke-related airway/lung injury on top of the skin injury
 * itself. The exam points this case is built to teach:
 *
 *  - securing the airway EARLY on the strength of clinical signs (hoarseness,
 *    singed nasal hair, soot, facial burns) — before progressive oedema makes
 *    intubation difficult or impossible, rather than waiting for stridor;
 *  - burn fluid resuscitation started at the current ABA rate (2 mL x weight(kg)
 *    x %TBSA, crystalloid only) rather than the classic Parkland 4 mL, with
 *    the first half given over the first 8 hours counted from the TIME OF
 *    INJURY, not from arrival — it is only a starting estimate, titrated
 *    against hourly urine output rather than followed as a fixed rate;
 *  - carbon monoxide poisoning and why a normal pulse oximeter reading is
 *    falsely reassuring (it cannot distinguish carboxyhaemoglobin from
 *    oxyhaemoglobin) — high-flow 100% oxygen is started on clinical
 *    suspicion, not held for a co-oximetry result;
 *  - escharotomy for a circumferential full-thickness burn once it starts to
 *    compromise the chest wall or a limb's circulation;
 *  - tetanus prophylaxis for a tetanus-prone wound.
 *
 * See CASE_MODEL.md for the therapy model this scaffold follows (indicated /
 * neutral / harmful, requiresFirst sequencing).
 */
export const SCAFFOLD_BURNS: CaseScaffold = {
  id: 'scaffold_burns',
  title: 'Burns and Smoke Exposure from an Enclosed-Space Fire',
  conditionName: 'Major Thermal Burns with Suspected Inhalational Injury',
  subject: 'Surgery',
  system: 'Burns & Trauma',
  demographics: {
    name: 'Arvind Yadav',
    age: 34,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 34-year-old man is brought to the emergency department after being pulled unconscious from a burning room in his house roughly 40 minutes ago; bystanders say he was trapped for several minutes before rescue. He is now conscious but hoarse, coughing up sooty sputum, with singed nasal hair and soot around his mouth and nostrils. His face, both arms, the front of his trunk and one leg show blistered, weeping and leathery grey-white patches of skin, and he is agitated and increasingly short of breath.',
  initialVitals: {
    hr: 126,
    bp: '106/68',
    rr: 28,
    spo2: 97,
    temp: '36.4°C',
    grbs: 118,
  },
  clinchingClue:
    'History of enclosed-space fire exposure with hoarseness, soot in the oropharynx, singed nasal vibrissae and carbonaceous sputum, together with a carboxyhaemoglobin level of 32% (Reference <3% in non-smokers) on co-oximetry, confirm significant smoke exposure complicating a flame burn covering approximately 40% of total body surface area.',
  clinchingClueTimeMinutes: 15,
  examFindingsMap: {
    general:
      'Weight approximately 70 kg. Anxious and agitated, hoarse voice, singed nasal vibrissae, soot around the mouth and nares, carbonaceous sputum on coughing.',
    airway:
      'Hoarseness with a brassy cough; oropharynx shows soot deposits and mild mucosal oedema; no stridor yet, but the voice has audibly changed over the last several minutes.',
    cvs:
      'Tachycardic, regular rhythm. Peripheral pulses on the left are full; the right radial and ulnar pulses are fainter than the left.',
    resp:
      'Tachypnoeic. Chest wall movement on inspiration is visibly reduced where the skin over the chest is tight and leathery.',
    skin:
      'Rule-of-nines estimate: face and neck 9% (superficial-to-partial thickness), anterior chest and abdomen 18% (full-thickness, circumferential), right upper limb 9% (full-thickness, circumferential), front of the right thigh 4% (partial-thickness) — approximately 40% of total body surface area involved. Skin over the chest and right arm is tight, dry, leathery and does not blanch on pressure.',
    abdomen: 'Soft, mildly distended, bowel sounds sluggish. No peritonism.',
    neuro: 'Alert and oriented but agitated. GCS 15/15. No focal neurological deficit.',
  },
  historyMap: {
    mechanism:
      'Caught in an enclosed room during a house fire roughly 40 minutes ago; extracted by neighbours. No reported loss of consciousness at the scene.',
    past: 'No known cardiac, respiratory or renal disease. Non-smoker.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    immunisation: 'Last documented tetanus toxoid dose was more than 10 years ago; no other vaccination records available.',
    family: 'No family history of note.',
  },
  investigationsMap: {
    abg_cooximetry: {
      aliases: ['abg'],
      resultText:
        'ABG with co-oximetry: pH 7.31 (Reference 7.35–7.45), PaCO2 34 mmHg (Reference 35–45 mmHg), PaO2 88 mmHg (Reference 80–100 mmHg), HCO3 17 mEq/L (Reference 22–26 mEq/L) — Carboxyhaemoglobin (COHb) 32% (Reference <3% in non-smokers, <10% in smokers) — significant carbon monoxide poisoning. Standard pulse oximetry cannot detect this, since it cannot distinguish carboxyhaemoglobin from oxyhaemoglobin.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    pulse_ox: {
      aliases: ['continuous pulse oximetry', 'pulse oximetry'],
      resultText:
        'Continuous Pulse Oximetry: SpO2 97–98% throughout — a reassuring-looking number, but a standard two-wavelength pulse oximeter reads carboxyhaemoglobin as if it were oxyhaemoglobin. This reading must not be used to exclude carbon monoxide poisoning.',
      turnaroundMinutes: 2,
      category: 'monitoring',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText:
        'CBC: Hb 16.8 g/dL (Reference 13.0–17.0 g/dL), Hct 50% (Reference 40–50%), WBC 14,200/mcL (Reference 4,000–11,000/mcL), Platelets 260,000/mcL (Reference 150,000–450,000/mcL) — haemoconcentration from early plasma volume loss into the injured tissue.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText:
        'Renal Function: Blood Urea 34 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.1 mg/dL (Reference 0.6–1.2 mg/dL) — upper-normal, consistent with early intravascular volume depletion; should be trended alongside urine output.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText:
        'Serum Electrolytes: Na+ 138 mEq/L (Reference 135–145 mEq/L), K+ 5.1 mEq/L (Reference 3.5–5.0 mEq/L, mildly elevated from tissue injury), Cl- 102 mEq/L (Reference 96–106 mEq/L).',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    cxr: {
      aliases: ['chest x-ray pa', 'chest x-ray portable', 'cxr'],
      resultText:
        'Portable Chest X-ray: No infiltrate, effusion or pneumothorax at this stage. A normal early film does not rule out significant smoke-related airway or lung injury, which often takes 24–48 hours to appear on imaging — clinical signs, not the X-ray, should drive the decision to secure the airway now.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    ecg: {
      aliases: ['12-lead ecg', 'ecg'],
      resultText: '12-lead ECG: Sinus tachycardia at 126 bpm, no acute ST-T changes.',
      turnaroundMinutes: 5,
      category: 'imaging',
      isIndicative: false,
      yieldNote:
        'A tracing is reasonable to glance at, but it does not change any of the airway, fluid or analgesic decisions in front of you.',
    },
    serum_lactate: {
      aliases: ['serum lactate'],
      resultText:
        'Serum Lactate: 4.1 mmol/L (Reference 0.5–1.6 mmol/L) — elevated, reflecting tissue hypoperfusion. In smoke exposure from an enclosed space, a lactate this high should also raise concern for concomitant cyanide exposure alongside carbon monoxide.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    urine_output: {
      aliases: ['strict input-output charting', 'urine output charting', 'input output charting', 'io charting'],
      resultText:
        'Urine Output Charting: Hourly urine output via indwelling catheter currently running at 15–20 mL/hr (about 0.25 mL/kg/hr for his 70 kg weight) — below the roughly 0.5–1 mL/kg/hr target for adult burn resuscitation, indicating the crystalloid rate needs to go up.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    blood_grouping: {
      aliases: ['blood grouping & cross-match', 'blood grouping', 'cross match'],
      resultText: 'Blood Grouping & Cross-match: Group B Positive. Held in anticipation of surgical debridement and possible escharotomy.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft'],
      resultText:
        'Liver Function Tests: AST 32 U/L (Reference 10–40 U/L), ALT 28 U/L (Reference 7–56 U/L), Total Bilirubin 0.7 mg/dL (Reference 0.2–1.2 mg/dL), Albumin 4.0 g/dL (Reference 3.5–5.0 g/dL) — normal at this stage.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'Liver enzymes contribute nothing at this stage. Fluid resuscitation is titrated to urine output, not to these.',
    },
  },
  therapiesMap: {
    airway_intubation: {
      aliases: ['endotracheal intubation', 'intubation', 'secure the airway'],
      responseText:
        'Endotracheal intubation performed promptly given the hoarseness, soot and singed nasal hair — the airway is secured before swelling can distort it further.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 2, rr: -6 },
      appropriateness: 'indicated',
      rationale:
        'Signs of impending airway compromise — hoarseness, singed nasal hair, soot in the oropharynx and facial burns — mean the airway should be secured immediately, before progressive oedema over the next several hours makes intubation difficult or impossible. Waiting for stridor to appear is too late.',
    },
    high_flow_oxygen: {
      aliases: ['high-flow nasal oxygen', '100% oxygen', 'non-rebreather mask oxygen', 'high flow oxygen'],
      responseText: 'High-flow 100% oxygen applied.',
      onsetMinutes: 10,
      vitalsEffect: { spo2: 1 },
      labShift: {
        abg_cooximetry:
          'ABG with co-oximetry (repeat): COHb has fallen to 14% (Reference <3% in non-smokers) — elimination accelerated by high-flow 100% oxygen, which shortens the carboxyhaemoglobin half-life from several hours on room air to roughly 40–60 minutes.',
      },
      appropriateness: 'indicated',
      rationale:
        'High-flow 100% oxygen dramatically shortens the half-life of carboxyhaemoglobin and should be started immediately on clinical suspicion of carbon monoxide poisoning, regardless of a normal-looking pulse oximeter reading, which cannot distinguish oxyhaemoglobin from carboxyhaemoglobin.',
    },
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'large bore iv'],
      responseText: 'Two large-bore IV cannulae sited, through unburned skin where possible.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale:
        'Reliable large-bore venous access is required before the calculated fluid regimen can be delivered, and should be secured immediately alongside airway and breathing assessment.',
    },
    parkland_fluids: {
      aliases: ['ringer lactate maintenance', 'ringer lactate infusion', 'parkland formula fluids', 'lactated ringers infusion'],
      responseText:
        'IV Ringer Lactate infusion started at the calculated starting rate: 2 mL × 70 kg × 40% TBSA = 5,600 mL over 24 hours, with half given over the first 8 hours counted from the time of injury (not from arrival) and the remainder over the following 16 hours. The rate is then titrated hourly against urine output.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -10, bp: '112/72' },
      labShift: {
        urine_output:
          'Urine Output Charting (repeat): Running at approximately 40–50 mL/hr (≈0.6–0.7 mL/kg/hr) since the infusion rate was titrated upward — within the 0.5–1 mL/kg/hr target range for adult burn resuscitation.',
      },
      appropriateness: 'indicated',
      rationale:
        'Burn fluid resuscitation is calculated as volume per kg per %TBSA burned, crystalloid only, with half given over the first 8 hours FROM THE TIME OF INJURY and half over the following 16 hours. Note the number: the American Burn Association moved the recommended STARTING rate down from the classic Parkland 4 mL/kg/%TBSA to 2 mL/kg/%TBSA in 2011, and ATLS follows the same lower figure, because starting at 4 mL routinely produced over-resuscitation — "fluid creep" — with its own morbidity from oedema and compartment syndrome. Many Indian textbooks and question banks still print 4 mL as the Parkland number, so expect to see it; the point that matters clinically is that whichever figure starts the infusion, it is only an estimate, and the running rate is then titrated hourly against a urine output of about 0.5 mL/kg/hr rather than given as a fixed rate for 24 hours.',
    },
    foley_catheter: {
      aliases: ['foley catheterisation', 'foley catheter', 'urinary catheterisation'],
      responseText: 'Foley catheter placed to allow hourly urine output measurement.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale:
        'An indwelling catheter is required in any major burn to allow hourly urine output measurement, which is the single most reliable bedside guide for titrating the fluid infusion rate — more useful moment to moment than the Parkland estimate alone.',
    },
    escharotomy: {
      aliases: ['escharotomy'],
      responseText: 'Escharotomy incisions made along the mid-lateral lines of the right arm and across the chest wall, through the full-thickness eschar.',
      onsetMinutes: 15,
      vitalsEffect: { rr: -4, spo2: 1 },
      appropriateness: 'indicated',
      rationale:
        'The full-thickness injury is circumferential across the chest and right arm; as tissue oedema builds beneath the inelastic burnt skin, it can compress the chest wall enough to restrict ventilation and compress limb vessels enough to cause ischaemia. Escharotomy through the eschar (not into viable tissue) relieves this pressure and is a clinical decision based on the exam findings, not one that should wait for distal pulses to disappear.',
    },
    morphine_analgesia: {
      aliases: ['morphine iv', 'morphine', 'iv opioid analgesia'],
      responseText: 'IV morphine given in small titrated doses for pain.',
      onsetMinutes: 5,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale:
        'A skin injury of this extent is extremely painful, and adequate titrated opioid analgesia is standard of care — but it should follow, not precede, control of an airway that is already in doubt, since a sedating drug can blunt both the drive and the warning signs of worsening obstruction.',
      requiresFirst: ['airway_intubation'],
      harmfulSequenceResponseText:
        'IV morphine given for pain before the airway had been secured. Minutes later his breathing becomes shallow and his voice fades to a whisper.',
      harmfulSequenceVitalsEffect: { rr: -8, spo2: -6 },
      harmfulSequenceRationale:
        'Sedating analgesia given before the airway is secured in a patient with hoarseness, soot and singed nasal hair blunts both respiratory drive and the protective reflexes that were still buying time — it can precipitate the very obstruction and hypoventilation the case is racing to prevent. When there are signs of impending airway compromise, the airway is always addressed first, pain relief second.',
    },
    general_surgery_consult: {
      aliases: ['general surgery consult'],
      responseText: 'General surgery / burns team consulted for wound assessment and escharotomy planning.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale:
        'Early surgical involvement is standard for an injury of this extent, both to decide on escharotomy where indicated and to plan the staged debridement and grafting that follows once the patient is resuscitated.',
    },
    tetanus_prophylaxis: {
      aliases: ['vaccination before discharge', 'tetanus toxoid', 'tetanus prophylaxis'],
      responseText: 'Tetanus prophylaxis given.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale:
        'A significant skin injury of this kind is a tetanus-prone wound; tetanus toxoid (with tetanus immunoglobulin if immunisation status is absent or uncertain, as it is here) should be given as part of initial management, on the same catch-up schedule as for any other wound.',
    },
    active_warming: {
      aliases: ['active warming & kangaroo care', 'active warming'],
      responseText: 'Active warming measures started (warmed IV fluids, warmed room, wounds covered) to prevent hypothermia.',
      onsetMinutes: 10,
      vitalsEffect: { temp: '36.8°C' },
      appropriateness: 'indicated',
      rationale:
        'A large surface-area skin injury causes rapid heat loss and impairs the body\'s own thermoregulation. Unlike first aid for a small burn, prolonged cooling with cold water is avoided here, and active warming is used instead — hypothermia itself worsens coagulopathy and shock.',
    },
    ng_tube: {
      aliases: ['nasogastric tube'],
      responseText: 'Nasogastric tube placed on free drainage.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale:
        'Burns above roughly 20% TBSA are commonly complicated by paralytic ileus and gastric dilatation; an early nasogastric tube decompresses the stomach and reduces the risk of aspiration, which matters even more with the airway already at risk.',
    },
    prophylactic_antibiotics: {
      aliases: ['ceftriaxone 2 g iv', 'piperacillin-tazobactam iv', 'vancomycin iv', 'prophylactic antibiotics'],
      responseText: 'Broad-spectrum IV antibiotics started as a precaution, despite no clinical signs of infection.',
      onsetMinutes: 30,
      vitalsEffect: { hr: 4 },
      appropriateness: 'harmful',
      rationale:
        'Routine prophylactic systemic antibiotics are not recommended in burn care in the absence of documented infection — they do not prevent burn wound sepsis, and instead select for resistant organisms and raise the risk of a later drug-resistant infection. Topical antimicrobial wound care and clinical surveillance for signs of infection are preferred over blanket systemic prophylaxis.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /endotracheal intubation|intubation|secure the airway/i,
      name: 'Early Definitive Airway Control',
      targetMilestoneMinutes: 20,
    },
    {
      orderOrActionPattern: /ringer lactate maintenance|ringer lactate infusion|parkland/i,
      name: 'Parkland Fluid Resuscitation Initiated',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /escharotomy/i,
      name: 'Escharotomy for Circumferential Full-Thickness Injury',
      targetMilestoneMinutes: 90,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_burns_1',
      title: 'Old Healed Clavicle Fracture',
      description: 'The chest X-ray incidentally shows a well-healed, old right clavicle fracture with abundant callus, unrelated to the current presentation.',
      correctAction: 'No intervention needed; note in the record and reassure.',
      status: 'unnoticed',
    },
    {
      id: 'inc_burns_2',
      title: 'Missed Hepatitis B Vaccination Status',
      description: 'Immunisation records show no documented hepatitis B vaccination series, relevant given the likelihood of blood product exposure during the wound care and surgery ahead.',
      correctAction: 'Offer the hepatitis B vaccination series once he is acutely stabilised, before discharge.',
      status: 'unnoticed',
    },
    {
      id: 'inc_burns_3',
      title: 'Mild Asymptomatic Eosinophilia',
      description: 'The CBC incidentally notes an eosinophil count of 8% (Reference <6%), otherwise unremarkable, with no history of atopy or parasitic exposure.',
      correctAction: 'No intervention needed; recheck if it persists after recovery.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext:
        'Within minutes of arrival he is hoarse, coughing sooty sputum, and has singed nasal hairs and soot around his mouth after being trapped in a smoke-filled room — the team must decide how urgently to protect his airway before it swells further.',
      consequenceOnRight: 'The airway is secured immediately by definitive intubation, before progressive swelling can make it difficult or impossible.',
      consequenceOnWrong: 'Airway control is deferred, and within hours mounting soft-tissue swelling makes intubation far harder and the airway is nearly lost.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'Pulse oximetry reads 97% even though he was pulled from a smoke-filled enclosed room and remains agitated and short of breath — the team must decide whether to trust this reading or look deeper.',
      consequenceOnRight: 'Carboxyhaemoglobin is checked directly by co-oximetry, which is markedly elevated despite the reassuring oximeter reading, and high-flow oxygen is started immediately.',
      consequenceOnWrong: 'The normal-looking oximeter reading is trusted at face value, oxygen therapy is delayed, and significant carbon monoxide poisoning goes untreated.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext:
        'With roughly 40% of his body surface affected and his weight recorded at 70 kg, the team must calculate the crystalloid infusion rate and decide what clock to start it from — the moment he arrived, or the moment he was actually caught in the fire forty minutes earlier.',
      consequenceOnRight: 'The Parkland calculation is timed from the moment of the fire, giving half the calculated crystalloid volume across the hours remaining of that first eight-hour window, then titrating the running rate against hourly urine output.',
      consequenceOnWrong: 'The eight-hour clock is mistakenly started from arrival, the volume is delivered too slowly relative to the true time since injury, and hypoperfusion deepens.',
    },
    {
      roleTag: 'PHARM',
      patientContext:
        'He is in obvious pain from his skin injuries and repeatedly asks for something for the pain, while his voice remains hoarse and his airway has not yet been definitively secured.',
      consequenceOnRight: 'The airway is secured first; titrated opioid analgesia follows once it is safe to give a sedating drug.',
      consequenceOnWrong: 'Opioid analgesia is given first, blunting his breathing and the warning signs of worsening airway narrowing before the airway has been protected.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext:
        'The skin across his chest and right arm has become tight, leathery and circumferential; the right hand is growing cool and the chest wall barely seems to move with each breath.',
      consequenceOnRight: 'Escharotomy incisions are made through the leathery eschar over the chest and arm, immediately restoring chest wall movement and blood flow to the hand.',
      consequenceOnWrong: 'The tightening eschar is left alone, and the limb becomes progressively ischaemic while chest wall movement worsens further.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext:
        'Before he leaves the resuscitation area, the team reviews what wound-related prophylaxis and documentation should not be missed given the extent and mechanism of what he has sustained.',
      consequenceOnRight: 'Tetanus prophylaxis is given, immunisation status is documented, and systemic antibiotics are not started merely as a precaution.',
      consequenceOnWrong: 'Tetanus status is never checked, and antibiotics are started prophylactically without any sign of infection, needlessly encouraging resistance.',
    },
  ],
};
