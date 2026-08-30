import { CaseScaffold } from '../../types';

/**
 * Severe dengue with plasma leakage progressing to compensated (early)
 * shock in a child — see CASE_MODEL.md for the modelling rules this
 * scaffold follows (therapiesMap, labShift, aliases matched by equality
 * against ORDER_GROUPS). The teaching point of this case is the pairing of
 * a RISING haematocrit with a FALLING platelet count exactly as the fever
 * settles — the marker of plasma leaking out of the vascular compartment —
 * together with a narrowing pulse pressure as the earliest sign of shock in
 * a child, long before hypotension appears. See `crystalloid_bolus`
 * (labShift on `cbc`), `platelet_transfusion` and `aspirin` (both
 * `harmful`), and `colloid_bolus` (sequence-dependent via `requiresFirst`).
 */
export const SCAFFOLD_DENGUE_SHOCK: CaseScaffold = {
  id: 'scaffold_dengue_shock',
  title: 'Fever Just Settled, Now a Cold and Restless Child',
  conditionName: 'Dengue Shock Syndrome',
  subject: 'Pediatrics',
  system: 'Infectious Disease',
  demographics: {
    name: 'Ananya Reddy',
    age: 8,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'An 8-year-old girl is brought to the emergency department on the fifth day of a high-grade continuous fever that abruptly settled to normal about six hours ago. Since then she has become increasingly restless, complains of severe abdominal pain, and has vomited three times. Her parents noticed bleeding from the gums while she was brushing her teeth this morning. Over the last hour her hands and feet have turned cold, and she has grown quiet and drowsy. Several children in her neighbourhood have had a similar illness this mosquito season.',
  initialVitals: {
    hr: 148,
    bp: '92/78',
    rr: 32,
    spo2: 96,
    temp: '36.4°C',
    grbs: 88,
  },
  clinchingClue:
    'A haematocrit of 42% (reference range for age 33–39%) together with a platelet count of 68,000/mcL (reference 150,000–450,000/mcL) on the same sample, occurring alongside a narrow pulse pressure of just 14 mmHg, together confirm plasma leaking out of the vascular compartment into early compensated shock — not simple recovery once the fever broke.',
  clinchingClueTimeMinutes: 15,
  examFindingsMap: {
    general: 'Restless and drowsy, cold clammy extremities, capillary refill prolonged to 3 seconds, scattered petechiae over both forearms.',
    cvs: 'Tachycardic with feeble, thready peripheral pulses despite a narrow but technically normal blood pressure; central pulses better felt than peripheral ones.',
    chest: 'Reduced air entry and stony dullness to percussion at both lung bases, consistent with bilateral pleural effusion; no wheeze.',
    abdomen: 'Tender hepatomegaly 3 cm below the right costal margin, mild diffuse tenderness, shifting dullness suggestive of free fluid.',
    skin: 'Scattered petechiae over the limbs, gum bleeding on inspection, tourniquet test reported strongly positive; no rash elsewhere.',
  },
  historyMap: {
    presenting: 'High-grade continuous fever for five days with severe headache, retro-orbital pain and diffuse body ache, which settled abruptly six hours ago.',
    gi: 'Persistent vomiting (three episodes today) and severe abdominal pain that began once the fever settled; no melena or blood in vomitus so far.',
    bleeding: 'Gum bleeding noticed this morning while brushing teeth; no other overt bleeding site yet.',
    past: 'No known chronic illness and no prior episode of a similar febrile illness. Previously well and developmentally normal for age.',
    medications: 'An over-the-counter fever syrup was given at home; the family is unsure which agent it was.',
    allergies: 'No known drug allergies.',
    family: 'No family history of a bleeding disorder.',
    social: 'Several children in the neighbourhood have had a similar febrile illness this mosquito season. Immunisation is up to date for age.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText: 'CBC: Haematocrit 42% (Reference for age 33–39%), Hb 14.1 g/dL, WBC 3,200/mcL (Reference 5,000–13,000/mcL for age — leucopenia), Platelets 68,000/mcL (Reference 150,000–450,000/mcL) — haemoconcentration with thrombocytopenia, the combination expected once plasma starts leaking out of the vessels.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    dengue_serology: {
      aliases: ['ns1 antigen / dengue serology', 'ns1 antigen', 'dengue serology', 'dengue igm elisa'],
      resultText: 'NS1 Antigen: Positive. Confirms the current febrile illness is due to this specific mosquito-borne virus, though management is guided by the clinical warning signs and the haematocrit/platelet trend, not by this result alone.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile'],
      resultText: 'PT/INR: PT 14.8 sec (Reference 11–14 sec), INR 1.2 (Reference 0.8–1.1), aPTT 38 sec (Reference 25–35 sec) — mildly deranged, consistent with early consumptive coagulopathy; not yet in a range that itself mandates blood product replacement.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft', 'liver function tests'],
      resultText: 'Liver Function Tests: AST 142 U/L (Reference 10–40 U/L), ALT 98 U/L (Reference 7–56 U/L), Albumin 3.0 g/dL (Reference 3.8–5.4 g/dL for age) — transaminases raised more than expected for a routine viral illness, and the low albumin is itself contributing to fluid leaking out of the vessels.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests', 'renal function tests kft urea creatinine', 'rft kidney function tests urea creatinine'],
      resultText: 'RFT/KFT: Blood Urea 24 mg/dL (Reference 15–36 mg/dL for age), Serum Creatinine 0.4 mg/dL (Reference 0.3–0.5 mg/dL for age) — currently normal; worth trending closely if shock is not promptly reversed.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText: 'Serum Electrolytes: Na+ 132 mEq/L (Reference 135–145 mEq/L), K+ 3.4 mEq/L (Reference 3.5–5.0 mEq/L), Cl- 98 mEq/L (Reference 98–107 mEq/L) — mild hyponatraemia and hypokalaemia from vomiting and third-space fluid shift.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    usg_abdomen: {
      aliases: ['usg abdomen & pelvis', 'usg pelvis', 'pelvic ultrasound', 'pelvic usg', 'ultrasound abdomen pelvis', 'ultrasound pelvis'],
      resultText: 'USG Abdomen & Pelvis: Gallbladder wall oedema/thickening, free fluid in the hepatorenal pouch and pelvis, and mild hepatomegaly — all in keeping with plasma leaking out of the vascular compartment into the tissues and peritoneal cavity.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    chest_xray: {
      aliases: ['chest x-ray pa', 'chest x-ray', 'cxr', 'cxr pa'],
      resultText: 'Chest X-ray: Blunting of both costophrenic angles consistent with bilateral pleural effusion, right greater than left — another site the leaked plasma has collected.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    blood_group: {
      aliases: ['blood grouping & cross-match', 'blood grouping', 'cross match'],
      resultText: 'Blood Grouping & Cross-match: Group B Positive. No units cross-matched yet — held in reserve in case significant bleeding develops.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    io_charting: {
      aliases: ['strict input-output charting', 'input output charting', 'io charting'],
      resultText: 'Strict Input-Output Charting: Hourly urine output and all fluid boluses charted on the bedside sheet, essential for titrating further fluid against the response rather than giving a fixed volume.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture ×2 (before antibiotics)', 'blood cultures', 'blood culture', 'blood culture before antibiotics'],
      resultText: 'Blood Cultures x2: No growth at 48 hours. The clinical picture and NS1 result already point to a viral cause, not a bacterial one — antibiotics were never indicated here and this result does not change that.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'A bacterial culture does not address this febrile illness, and waiting on it changes nothing. Serial haematocrit and platelets are what guide the fluid decisions.',
    },
  },
  therapiesMap: {
    crystalloid_bolus: {
      aliases: ['ringer lactate 500 ml bolus', 'ringer lactate', 'crystalloid bolus', 'crystalloid', 'ringer lactate bolus', 'iv fluids', 'fluid bolus', 'iv fluid'],
      responseText: 'An isotonic crystalloid (Ringer lactate) bolus is given over one hour, with vitals and the haematocrit trend reassessed closely through the infusion.',
      onsetMinutes: 45,
      vitalsEffect: { hr: -22, bp: '104/76' },
      labShift: {
        cbc: 'CBC (repeat): Haematocrit 37% (Reference for age 33–39%), Platelets 74,000/mcL — the haematocrit falling back toward baseline is the expected, reassuring response to adequate plasma volume replacement, with platelets beginning to stabilise.',
      },
      appropriateness: 'indicated',
      rationale: 'An isotonic crystalloid bolus is the first-line treatment for compensated shock from plasma leakage. WHO dengue guidance separates the dosing by how far the child has decompensated: roughly 5-10 mL/kg over an hour for compensated shock like this one, against a rapid 20 mL/kg over about fifteen minutes once the blood pressure has actually fallen. Ringer lactate is the preferred solution, with one caveat worth carrying — in significant metabolic acidosis, normal saline is used instead, since a lactate load is unhelpful in a child who is already acidotic. It is titrated against the response of the pulse pressure, capillary refill and, most specifically, the haematocrit trend, rather than given as one fixed volume and stopped.',
    },
    supplemental_oxygen: {
      aliases: ['supplemental oxygen'],
      responseText: 'Supplemental oxygen started via face mask.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 2 },
      appropriateness: 'indicated',
      rationale: 'Oxygen is given to every child in shock while the circulating volume is being restored, supporting tissue oxygen delivery during the period of poor perfusion.',
    },
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'access', 'iv two wide bore cannulae', 'two wide bore cannulae'],
      responseText: 'Two wide-bore IV cannulae secured for fluid resuscitation and repeat sampling.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is a prerequisite for timely crystalloid resuscitation and must be secured the moment shock is recognised, not after the first bolus is prescribed.',
    },
    foley_catheter: {
      aliases: ['foley catheterisation', 'foley catheter', 'urinary catheterisation'],
      responseText: 'A Foley catheter is placed to allow precise hourly measurement of urine output.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Accurate hourly urine output is one of the most useful bedside guides to whether fluid resuscitation is adequate, excessive, or still insufficient, in a condition managed entirely by careful titration.',
    },
    paracetamol: {
      aliases: ['paracetamol iv', 'paracetamol', 'iv paracetamol'],
      responseText: 'Paracetamol given for fever and pain.',
      onsetMinutes: 20,
      vitalsEffect: { temp: '36.7°C' },
      appropriateness: 'indicated',
      rationale: 'Paracetamol is the safe antipyretic and analgesic of choice here; it does not affect platelet function and does not add to the gastric or bleeding risk already present.',
    },
    icu_admission: {
      aliases: ['move to icu'],
      responseText: 'The child is moved to the intensive care unit for continuous monitoring during fluid resuscitation.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      rationale: 'A child in shock from plasma leakage needs continuous vital-sign and urine-output monitoring through both the leak phase and the reabsorption phase that follows, which is best delivered at ICU level of care.',
    },
    colloid_bolus: {
      aliases: ['6% hes colloid bolus', 'colloid bolus', 'dextran 70 bolus', '6% hes', 'colloid', 'dextran', 'hes', 'hes colloid'],
      responseText: 'A colloid bolus (6% hydroxyethyl starch) is given over one hour after crystalloid boluses failed to reverse the shock.',
      onsetMinutes: 45,
      vitalsEffect: { hr: -14, bp: '106/74' },
      appropriateness: 'indicated',
      rationale: 'A colloid is reserved as a second-line fluid for shock that persists despite one or two isotonic crystalloid boluses. It is never the first fluid reached for, since crystalloid resuscitation is effective in the great majority of children and colloid carries its own risks (anaphylactoid reactions, added coagulopathy, cost).',
      requiresFirst: ['crystalloid_bolus'],
      harmfulSequenceResponseText: 'Colloid is infused before any isotonic crystalloid has been tried. The haematocrit does not fall meaningfully, the child remains cold and tachycardic, and it is now unclear whether the true problem is inadequate volume or a genuinely refractory leak, because the standard first step was skipped.',
      harmfulSequenceVitalsEffect: { hr: 6, bp: '88/76' },
      harmfulSequenceRationale: 'Colloid is a second-line fluid used only when shock persists despite crystalloid. Reaching for it first skips the step that resolves shock in most children, exposes the child to colloid-specific risks (anaphylactoid reaction, added coagulopathy) for no proven benefit over crystalloid as an initial agent, and muddies the picture of whether the leak is truly refractory.',
    },
    aspirin: {
      aliases: ['aspirin 325 mg chewed', 'aspirin', 'aspirin chewed'],
      responseText: 'Aspirin given for fever and body ache.',
      onsetMinutes: 60,
      vitalsEffect: { hr: 6 },
      appropriateness: 'harmful',
      rationale: 'Aspirin (and other NSAIDs) are contraindicated for fever or pain in this illness: their antiplatelet effect and gastric irritation worsen the bleeding tendency that already exists from thrombocytopenia and coagulopathy, and aspirin specifically carries a Reye syndrome risk in a febrile child. Paracetamol is the safe alternative.',
    },
    im_paracetamol: {
      aliases: ['paracetamol im injection', 'intramuscular paracetamol', 'paracetamol im', 'im paracetamol', 'im paracetamol injection', 'paracetamol injection'],
      responseText: 'Paracetamol given as an intramuscular injection for fever.',
      onsetMinutes: 20,
      vitalsEffect: { temp: '36.8°C' },
      appropriateness: 'harmful',
      rationale: 'Intramuscular injections of any kind are avoided once significant thrombocytopenia and coagulopathy are present, because they risk a large, painful intramuscular haematoma at the injection site. The same drug given orally or intravenously carries none of that risk.',
    },
    platelet_transfusion: {
      aliases: ['platelet concentrate'],
      responseText: 'A unit of platelet concentrate is transfused for the low platelet count.',
      onsetMinutes: 60,
      vitalsEffect: { rr: 4, spo2: -3 },
      labShift: {
        cbc: 'CBC (repeat): Platelets 96,000/mcL — transiently higher after transfusion, but the count will fall again as the underlying leak continues; the transfusion has not addressed the process actually driving this illness.',
      },
      appropriateness: 'harmful',
      rationale: 'Prophylactic platelet transfusion for thrombocytopenia alone, without significant active bleeding, is NOT indicated — it does not shorten the illness or prevent bleeding, and the added volume risks tipping an already leaky vascular compartment into fluid overload. Platelets are reserved for significant clinical bleeding with a very low count, not for the number by itself.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ringer lactate|crystalloid bolus/i,
      name: 'Isotonic Crystalloid Resuscitation',
      targetMilestoneMinutes: 20,
    },
    {
      orderOrActionPattern: /supplemental oxygen/i,
      name: 'Supplemental Oxygen',
      targetMilestoneMinutes: 10,
    },
    {
      orderOrActionPattern: /colloid bolus|hes|dextran/i,
      name: 'Escalation to Colloid for Refractory Shock',
      targetMilestoneMinutes: 90,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_dengue_1',
      title: 'Innocent Vibratory Murmur',
      description: 'A grade 1/6 short systolic murmur is heard at the left sternal border on cardiovascular exam, with no radiation, accentuated by the fast heart rate.',
      correctAction: 'Reassure as an innocent (Still\'s) murmur exaggerated by the fever and tachycardia; no echocardiography or cardiology referral is needed unless it persists once the vitals normalise.',
      status: 'unnoticed',
    },
    {
      id: 'inc_dengue_2',
      title: 'Reducible Umbilical Hernia',
      description: 'A small, soft, easily reducible umbilical hernia is noted on abdominal palpation, non-tender and unrelated to the current illness.',
      correctAction: 'No acute intervention; plan an elective surgical opinion after full recovery, since it has persisted beyond the age at which most close spontaneously.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'Six hours after her fever settled, a child with cold clammy extremities and a narrow pulse pressure of only 14 mmHg has become drowsy, and the team must decide whether to await laboratory results before acting.',
      consequenceOnRight: 'An isotonic crystalloid bolus and oxygen are started immediately on recognising early shock, without waiting for any test to return.',
      consequenceOnWrong: 'Fluid resuscitation is delayed while tests are awaited, and the child drifts from compensated toward decompensated shock.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'A rising haematocrit together with a falling platelet count on the same blood sample, appearing exactly as the fever settled, must be recognised as a specific process rather than ordinary recovery from a viral illness.',
      consequenceOnRight: 'The rising haematocrit and falling platelets together are correctly recognised as plasma leaking out of the vascular compartment, explaining the narrow pulse pressure and cold peripheries despite the fever having settled.',
      consequenceOnWrong: 'The abnormal counts are dismissed as an incidental finding of a resolving viral illness, and the leak driving the child toward shock goes unaddressed.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The child remains cold and tachycardic despite one isotonic crystalloid bolus, and the team must decide the next step for fluid that has not yet corrected the shock.',
      consequenceOnRight: 'A further isotonic crystalloid bolus is given and reassessed against the pulse pressure and haematocrit trend before a different type of fluid is even considered.',
      consequenceOnWrong: 'A colloid solution is reached for before crystalloid has been given a fair trial, exposing the child to needless additional risk for no proven benefit.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'Choosing an antipyretic and analgesic for fever and body ache in a bleeding-prone child, where one whole class of common painkillers must be strictly avoided.',
      consequenceOnRight: 'Paracetamol is chosen for fever and pain, and antiplatelet, gastric-irritant analgesics are specifically avoided given the existing bleeding tendency.',
      consequenceOnWrong: 'An antiplatelet analgesic is given for the fever, worsening the bleeding tendency in a child who already has a low platelet count.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'As the fever stays settled and the counts begin to recover over the next one to two days, the team must plan monitoring to avoid an opposite danger during recovery from what caused the shock in the first place.',
      consequenceOnRight: 'Fluids are tapered and the child is watched closely for breathlessness or puffiness as the leaked plasma re-enters the circulation during recovery, rather than continuing aggressive fluid replacement unchanged.',
      consequenceOnWrong: 'Aggressive fluid replacement is continued unchanged into the recovery period, precipitating fluid overload with breathlessness from pulmonary oedema.',
    },
  ],
};
