import { CaseScaffold } from '../../types';

/**
 * A term newborn deteriorating within the first three days of life, with the
 * classic maternal risk-factor pair (prolonged rupture of membranes plus an
 * untreated intrapartum fever) behind it. The teaching points this scaffold
 * is built around: blood culture is sent BEFORE the first antibiotic dose,
 * but the dose itself must never wait for the culture to turn around;
 * hypoglycaemia and hypothermia are presenting features that are corrected
 * as aggressively as the infection itself; fluid boluses are given in small,
 * reassessed aliquots before a vasoactive infusion is ever reached for
 * (`dopamine` `requiresFirst` `fluid_bolus`); a lumbar puncture is still
 * indicated even without classic meningeal signs, which a newborn this
 * unwell often does not show; and a third-generation cephalosporin
 * (`ceftriaxone`, graded harmful) is avoided in this age group because it
 * displaces bilirubin and can precipitate with calcium-containing fluids.
 * See CASE_MODEL.md for the therapy model this scaffold follows.
 */
export const SCAFFOLD_NEONATAL_SEPSIS: CaseScaffold = {
  id: 'scaffold_neonatal_sepsis',
  title: 'Poorly Feeding Newborn with a Low Temperature',
  conditionName: 'Early-Onset Neonatal Sepsis with Septic Shock',
  subject: 'Pediatrics',
  system: 'Neonatology',
  demographics: {
    name: 'Baby (Male) of Kavita Yadav',
    age: 0,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    "A baby boy, born at term by spontaneous vaginal delivery, is reviewed on the postnatal ward on his third day of life because he has stopped feeding well, become unusually drowsy, and feels cold to touch. His mother recalls that her waters broke more than eighteen hours before he was born and that she ran a fever during labour that was never treated. On arrival his temperature is low, his breathing is fast and grunting, his hands and feet are cool and mottled, and he barely stirs when handled.",
  initialVitals: {
    hr: 190,
    bp: '52/30',
    rr: 74,
    spo2: 89,
    temp: '35.3°C',
    grbs: 36,
  },
  clinchingClue:
    'Prolonged rupture of membranes beyond eighteen hours and an untreated maternal fever in labour, together with poor feeding, temperature instability, grunting respiration and a critically low blood glucose all appearing within the first three days of life — this combination of maternal risk factors with multisystem newborn illness is treated as an infection acquired around the time of delivery on clinical grounds alone, with management started while cultures are still pending, not after they return.',
  clinchingClueTimeMinutes: 15,
  examFindingsMap: {
    general: 'Lethargic with a weak cry and poor tone; capillary refill prolonged to 4 seconds; extremities cool and mottled to the mid-forearm and mid-shin.',
    cvs: 'Tachycardic with thready peripheral pulses; central pulses also feeble. Normal heart sounds, no murmur.',
    chest: 'Grunting respiration with subcostal and intercostal recession, and brief pauses in breathing lasting several seconds; air entry equal on both sides, no crepitations.',
    abdomen: 'Mildly distended, soft, bowel sounds present; liver edge palpable 1 cm below the costal margin; umbilical stump clean and dry, no surrounding redness.',
    neuro: 'Lethargic and hypotonic, with a weak suck and a weak Moro response; anterior fontanelle soft and flat; no seizure activity witnessed.',
    skin: 'Mottled, dusky peripheries; a scattering of fine petechiae over the trunk; a shallow sacral dimple with a visible base and no overlying tuft of hair.',
  },
  historyMap: {
    past: 'First child; previously feeding and behaving normally until this admission on the third day of life. No prior hospital contact.',
    antenatal: 'Booked pregnancy with regular antenatal visits; no antenatal complications recorded. A vaginal-rectal swab for Group B Streptococcus was not performed, as it is not routinely offered at this centre.',
    intrapartum: 'Membranes ruptured 19 hours before delivery. The mother developed a fever of 38.4°C during labour and received no antibiotics for it. Spontaneous vaginal delivery at term; Apgar scores 8 and 9 at 1 and 5 minutes; no resuscitation needed at birth.',
    feeding: 'Breastfeeding was established slowly from birth; over the last several hours the baby has fed very little and vomited once.',
    immunisation: 'Birth dose of Hepatitis B given; BCG and OPV still pending as per schedule. The Vitamin K1 injection at birth is not clearly documented in the birth notes.',
    allergies: 'No known drug allergies; no medications given to the baby before this admission.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText: "CBC: Total leucocyte count 3,200/mm³ (Reference roughly 5,000–30,000/mm³ in a well term newborn — a much wider and higher normal range than in an older child), absolute neutrophil count 900/mm³ with an immature-to-total neutrophil ratio of 0.28 (Reference <0.2), platelets 92,000/mm³ (Reference 150,000–450,000/mm³) — neutropenia with a left shift and thrombocytopenia, both supportive of a bacterial process.",
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp'],
      resultText: 'CRP: 48 mg/L (Reference <10 mg/L) — markedly elevated; a single normal value soon after the illness begins does not exclude infection, so a repeat value 12–24 hours later is more useful than one reading alone.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    procalcitonin: {
      aliases: ['procalcitonin'],
      resultText: "Procalcitonin: 12 ng/mL — markedly elevated, though procalcitonin also rises physiologically in every newborn over the first 24–48 hours of life and must be interpreted against an age-specific cut-off, not the adult reference range.",
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture ×2 (before antibiotics)', 'blood cultures', 'blood culture'],
      resultText: 'Blood Culture (drawn from a peripheral vein before the first antibiotic dose): Gram stain and aerobic/anaerobic incubation underway; growth typically takes 24–48 hours and must never be waited for before starting treatment.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: true,
    },
    csf: {
      aliases: ['csf analysis', 'csf'],
      resultText: 'CSF Analysis: Cloudy fluid, WBC 45/mm³ (Reference roughly <20–30/mm³ in a well term newborn, higher than in an older child) with neutrophil predominance, protein 180 mg/dL (Reference up to about 170 mg/dL in a newborn, again higher than in an older child), glucose low against a paired blood glucose — findings that can accompany a bloodstream infection in a baby this age and are actively looked for even without neck stiffness, which a newborn this unwell often does not show.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    grbs: {
      aliases: ['rbs / grbs', 'grbs', 'blood glucose'],
      resultText: 'GRBS: 36 mg/dL — a symptomatic newborn is treated once glucose falls below roughly 45 mg/dL, a distinctly lower treatment threshold than is used at any older age, and this value needs correction immediately.',
      turnaroundMinutes: 2,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText: 'Serum Electrolytes: Na+ 133 mEq/L (Reference 135–145 mEq/L), K+ 5.4 mEq/L (Reference roughly 3.5–6.0 mEq/L in a newborn — higher than the adult range), Cl- 101 mEq/L (Reference 96–106 mEq/L).',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    serum_calcium: {
      aliases: ['serum calcium'],
      resultText: 'Serum Calcium (total): 7.6 mg/dL (Reference roughly 8–10.5 mg/dL in a term newborn) — low; hypocalcaemia commonly accompanies hypoglycaemia in a sick newborn and is corrected alongside it.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText: "RFT/KFT: Blood Urea 38 mg/dL (Reference roughly 8–20 mg/dL, higher than the adult range in a well newborn), Serum Creatinine 1.0 mg/dL — a term newborn's creatinine at birth largely reflects the mother's own renal function and should fall over the first 1–2 weeks of life; a value that is static or rising instead points to this baby's own kidneys being under-perfused.",
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft'],
      resultText: "LFT: AST 32 U/L, ALT 24 U/L, Total Bilirubin 9.2 mg/dL, predominantly unconjugated — a level that needs to be plotted on an hour-specific bilirubin chart for this baby's age and risk factors before deciding on a phototherapy threshold.",
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    abg: {
      aliases: ['abg'],
      resultText: 'ABG: pH 7.26 (Reference 7.35–7.45), PaCO2 28 mmHg (Reference 35–45 mmHg), PaO2 58 mmHg (Reference roughly 50–70 mmHg on room air in a term newborn, lower than the adult range), HCO3 14 mEq/L (Reference roughly 20–24 mEq/L in a newborn) — metabolic acidosis with respiratory compensation, in keeping with poor tissue perfusion.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    serum_lactate: {
      aliases: ['serum lactate'],
      resultText: 'Serum Lactate: 5.2 mmol/L (Reference 0.5–2.0 mmol/L) — elevated, consistent with the circulation failing to meet tissue demand.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    cxr: {
      aliases: ['chest x-ray pa', 'chest x-ray portable', 'cxr'],
      resultText: 'Chest X-ray (portable, bedside): Diffuse granular opacities with air bronchograms in both lung fields — an appearance well recognised when pneumonia is the source of a bloodstream infection acquired around the time of birth.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    urine_culture: {
      aliases: ['urine culture & sensitivity', 'urine culture'],
      resultText: 'Urine Culture: A urinary source is a recognised cause of infection acquired later in the newborn period, but is distinctly uncommon as a cause this early, and a specimen sent now is unlikely to change management.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'A urine culture has little yield in the first 72 hours of life; this route of seeding matters in babies presenting later, not in one this age. Blood and CSF are the samples that count here.',
    },
  },
  therapiesMap: {
    active_warming: {
      aliases: ['active warming & kangaroo care', 'active warming', 'radiant warmer', 'kangaroo care'],
      responseText: 'Baby placed under a pre-warmed radiant warmer with a servo-controlled skin temperature probe; kangaroo care substituted once stable enough to be handled.',
      onsetMinutes: 15,
      vitalsEffect: { temp: '36.6°C' },
      appropriateness: 'indicated',
      rationale: 'A sick newborn loses heat rapidly because of a large surface-area-to-weight ratio and thin subcutaneous fat, and cannot generate heat by shivering the way an older child can; untreated hypothermia itself worsens oxygen consumption and acidosis, so warming is started alongside every other resuscitation step, not after it.',
    },
    dextrose_bolus: {
      aliases: ['10% dextrose 5 ml/kg iv', '10% dextrose', 'dextrose 10%', 'dextrose bolus'],
      responseText: '10% Dextrose 2 mL/kg given as a slow intravenous push for the critically low blood glucose, followed by a continuous dextrose infusion titrated to maintain an adequate glucose infusion rate.',
      onsetMinutes: 5,
      vitalsEffect: { grbs: 42 },
      labShift: {
        grbs: 'GRBS (repeat): 78 mg/dL — corrected after the dextrose bolus and the maintenance infusion that followed it.',
      },
      appropriateness: 'indicated',
      rationale: "A newborn has minimal glycogen reserve and a high glucose requirement relative to body weight, so hypoglycaemia develops quickly during illness. It is corrected with a small-volume 10% dextrose bolus (2 mL/kg) followed by an infusion — a much smaller bolus volume than would be used in an older child, since the same concentration given in a larger volume can itself provoke a swing into rebound hypoglycaemia.",
    },
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'peripheral iv cannula', 'umbilical venous catheter'],
      responseText: 'A peripheral intravenous line is secured; when peripheral access proves difficult, as it often does in a shut-down newborn, an umbilical venous catheter is placed instead for immediate, reliable access.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is a prerequisite for glucose correction, fluids and antibiotics and is secured within the first few minutes; the umbilical vein remains cannulable for about the first week of life and is the fastest reliable route when peripheral veins cannot be found.',
    },
    fluid_bolus: {
      aliases: ['normal saline 30 ml/kg bolus', 'normal saline bolus', 'crystalloid bolus', 'ns bolus'],
      responseText: "Normal saline given as a 10 mL/kg bolus over 10–15 minutes, with perfusion, heart rate and liver size reassessed after every aliquot before deciding whether to repeat it.",
      onsetMinutes: 15,
      vitalsEffect: { hr: -12, bp: '64/38' },
      appropriateness: 'indicated',
      rationale: "Fluid boluses in a newborn are given in small aliquots (around 10 mL/kg) with reassessment after each one, rather than the larger single bolus used in an older child, because a newborn myocardium tolerates a sudden volume load poorly; the liver edge and lung fields are checked after every aliquot for early fluid overload.",
    },
    antibiotics: {
      aliases: ['ampicillin + gentamicin iv', 'ampicillin', 'gentamicin'],
      responseText: 'IV Ampicillin plus Gentamicin started empirically within the first hour, immediately after the blood culture sample is drawn.',
      onsetMinutes: 45,
      vitalsEffect: { hr: -10 },
      labShift: {
        blood_culture: 'Blood Culture (final report, 48 hours): Significant growth identified and reported with sensitivities, confirming susceptibility to the ampicillin and gentamicin already started — the empirical regimen is continued unchanged.',
      },
      appropriateness: 'indicated',
      rationale: 'Ampicillin plus an aminoglycoside is the standard empirical combination for infection acquired around the time of birth, covering Group B Streptococcus, Listeria and E. coli — the organisms responsible for most cases — and it is started within the first hour of recognition regardless of how long the blood culture takes to grow. The culture is drawn first, but its turnaround must never delay the first dose.',
    },
    dopamine: {
      aliases: ['dopamine infusion', 'dopamine'],
      responseText: "A dopamine infusion is started and titrated for poor perfusion and low blood pressure that persist despite adequate fluid boluses.",
      onsetMinutes: 20,
      vitalsEffect: { hr: -8, bp: '72/44' },
      appropriateness: 'indicated',
      requiresFirst: ['fluid_bolus'],
      harmfulSequenceResponseText: 'A dopamine infusion is started before any fluid bolus has been given. The blood pressure rises only briefly — the circulation was never refilled — and the hands and feet become more mottled and cool as the drug constricts vessels around an empty circulation.',
      harmfulSequenceVitalsEffect: { hr: 10, bp: '46/26' },
      harmfulSequenceRationale: 'An inotrope or vasopressor started before volume has been restored acts on an underfilled circulation: it can raise the number on the blood pressure cuff without improving blood flow to the tissues, and the added vasoconstriction can worsen peripheral perfusion further. Fluid boluses come first; a vasoactive drug is added only for poor perfusion that persists despite adequate volume replacement.',
      rationale: 'When poor perfusion and low blood pressure persist despite adequate fluid resuscitation, a dopamine infusion is the conventional first-line vasoactive agent in a newborn, escalating to a second agent if the response is inadequate.',
    },
    noradrenaline: {
      aliases: ['noradrenaline infusion', 'noradrenaline', 'norepinephrine infusion'],
      responseText: "A noradrenaline infusion is added for perfusion that remains poor despite fluids and a first vasoactive agent.",
      onsetMinutes: 20,
      vitalsEffect: { hr: -6, bp: '78/48' },
      appropriateness: 'indicated',
      rationale: 'A second agent is added when perfusion and blood pressure remain inadequate on fluids and a first-line vasoactive infusion alone — escalating from fluids, to a first agent, to a second agent mirrors the standard stepwise approach to fluid-refractory shock at any age, adapted to newborn dosing.',
    },
    oxygen: {
      aliases: ['supplemental oxygen', 'oxygen', 'free flow oxygen'],
      responseText: 'Free-flow supplemental oxygen given and titrated to a saturation target appropriate for a newborn, with a low threshold to escalate to respiratory support if breathing pauses or distress continue.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 6 },
      appropriateness: 'indicated',
      rationale: 'Grunting, recession and pauses in breathing reflect both lung involvement and the added respiratory drive from poor perfusion and acidosis. Oxygen is titrated to a narrower target range than in an older child, since both too little and too much oxygen carry specific risks for a newborn.',
    },
    paeds_consult: {
      aliases: ['paediatrics consult', 'pediatrics consult', 'neonatology consult'],
      responseText: 'The paediatric/neonatal team is consulted urgently and the baby is transferred to the neonatal intensive care unit for continuous monitoring and escalation.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'Prompt involvement of the paediatric/neonatal team and transfer to a unit capable of continuous monitoring ensures escalation through fluids, antibiotics and vasoactive support happens without delay.',
    },
    maintenance_fluids: {
      aliases: ['5% dextrose infusion', 'dextrose maintenance', 'maintenance iv fluids'],
      responseText: 'A maintenance intravenous infusion containing dextrose is continued after the initial bolus to sustain the glucose infusion rate.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'A single dextrose bolus corrects the glucose only transiently; an ongoing infusion is needed afterwards because a sick newborn has minimal glycogen reserve and can become hypoglycaemic again within a short time without a continued source of glucose.',
    },
    ceftriaxone: {
      aliases: ['ceftriaxone 2 g iv', 'ceftriaxone'],
      responseText: 'IV Ceftriaxone given empirically to the newborn.',
      onsetMinutes: 30,
      labShift: {
        lft: 'LFT (repeat): Total Bilirubin now 15.8 mg/dL, predominantly unconjugated, and rising further — a concerning trajectory. Ceftriaxone displaces bilirubin from its albumin-binding sites, increasing the risk of bilirubin encephalopathy, and can also precipitate with calcium-containing intravenous fluids routinely used at this age.',
      },
      appropriateness: 'harmful',
      rationale: 'Ceftriaxone is avoided in newborns because it competitively displaces bilirubin from albumin, increasing free bilirubin available to cross into the brain and raising the risk of bilirubin encephalopathy, and because it can form an insoluble precipitate with calcium-containing intravenous fluids that are routinely used in this age group. Ampicillin plus an aminoglycoside remains the correct empirical choice, not a third-generation cephalosporin from this class.',
    },
    furosemide: {
      aliases: ['furosemide iv', 'furosemide', 'lasix'],
      responseText: 'IV Furosemide given for reduced urine output.',
      onsetMinutes: 10,
      vitalsEffect: { hr: 14, bp: '44/24' },
      appropriateness: 'harmful',
      rationale: 'Reduced urine output here reflects poor kidney perfusion from an underfilled circulation, not fluid overload. A diuretic further contracts an already depleted intravascular volume and deepens shock — reduced output in this setting is treated with fluid and, if needed, vasoactive support, never a diuretic.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ampicillin|gentamicin|antibiotic/i,
      name: 'Empirical Antibiotics (Ampicillin + Gentamicin)',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /10% dextrose|dextrose 10%|dextrose bolus|glucose correction/i,
      name: 'Correction of Hypoglycaemia',
      targetMilestoneMinutes: 10,
    },
    {
      orderOrActionPattern: /active warming|radiant warmer|kangaroo care/i,
      name: 'Correction of Hypothermia',
      targetMilestoneMinutes: 20,
    },
    {
      orderOrActionPattern: /normal saline|crystalloid bolus|ns bolus/i,
      name: 'Initial Fluid Resuscitation',
      targetMilestoneMinutes: 30,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_neosep_1',
      title: 'Undocumented Vitamin K1 Prophylaxis',
      description: 'The birth notes do not clearly record whether Vitamin K1 was given at birth.',
      correctAction: 'Confirm from the labour room register and give Vitamin K1 if it was missed, since deficiency risks a bleeding disorder of the newborn.',
      status: 'unnoticed',
    },
    {
      id: 'inc_neosep_2',
      title: 'Shallow Sacral Dimple',
      description: 'A shallow dimple over the sacrum is noted on examination, with a visible base and no overlying tuft of hair, skin tag or discolouration.',
      correctAction: 'Reassure — a shallow dimple with a visible base and no other cutaneous marker does not need spinal imaging, unlike a deep, wide or high dimple with an associated skin marker.',
      status: 'unnoticed',
    },
    {
      id: 'inc_neosep_3',
      title: "Mother's Hepatitis B Status Not on Record",
      description: "The mother's Hepatitis B surface antigen status from antenatal screening is not available in the notes brought with the baby.",
      correctAction: "Trace or repeat the mother's Hepatitis B surface antigen result urgently; if positive or unavailable within the window, give the baby Hepatitis B immunoglobulin in addition to the vaccine already given.",
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A baby just a few days old is brought back from the ward lethargic, cold to touch, breathing fast with grunting, and feeding poorly, with a blood glucose that has come back critically low — several life-threatening problems that all need correcting together, right now, rather than one after another.',
      consequenceOnRight: 'Warming, glucose correction, blood cultures and the first dose of antibiotics are all started together within the first hour, without waiting on any single result.',
      consequenceOnWrong: 'Treatment is delayed while results are awaited one at a time; the temperature, glucose and circulation all continue to worsen.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Reviewing why a baby who was well at birth has become this unwell within the first three days of life: the waters broke more than eighteen hours before delivery, and the mother had a fever during labour that was never treated with antibiotics.',
      consequenceOnRight: 'The combination of maternal risk factors with multisystem illness in a baby this young is recognised as pointing to an infection acquired around the time of birth, and treatment is started on this clinical picture without waiting for any single test to confirm it.',
      consequenceOnWrong: "The maternal risk factors are not connected to the baby's illness, and the picture is instead treated as a feeding problem alone while the underlying cause goes untreated.",
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: "After fluid boluses given in small, carefully reassessed volumes, the baby's hands and feet remain cool and mottled and the blood pressure is still low.",
      consequenceOnRight: 'A vasoactive infusion is started for poor perfusion that persists despite adequate fluid replacement, and titrated at the bedside.',
      consequenceOnWrong: 'The vasoactive infusion is started before any fluid has been given, or fluid boluses are pushed indefinitely without ever moving on once they have clearly stopped helping.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'Choosing which intravenous antibiotic combination to start empirically in a baby this young, who already has visible yellow discolouration of the skin, before any culture result is available.',
      consequenceOnRight: 'A combination that covers the organisms typically acquired around birth is chosen, avoiding an agent known to worsen the yellow discolouration already present.',
      consequenceOnWrong: 'A third-generation cephalosporin is chosen instead, worsening the yellow discolouration by displacing bilirubin and adding a risk of drug precipitation in the intravenous fluids this baby is already receiving.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before this baby leaves the ward, the team reviews what should be documented and watched for so that the same combination of maternal risk factors is never missed in the next baby delivered here.',
      consequenceOnRight: "Prolonged rupture of membranes and an untreated intrapartum fever are documented as triggers for closer newborn observation, and this baby's own Vitamin K and Hepatitis B records are completed before discharge.",
      consequenceOnWrong: 'Nothing is documented for future deliveries, and the same combination of risk factors goes unrecognised in the next baby born on the ward.',
    },
  ],
};
