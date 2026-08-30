import { CaseScaffold } from '../../types';

/**
 * A school-age child with new-onset severe hyperglycaemic ketoacidosis — the
 * paediatric counterpart to `scaffold_dka` in `scaffolds.ts`, and deliberately
 * built around what that adult case leaves out rather than repeating it.
 *
 * The adult case's teaching point is sequencing (fluids before insulin) and
 * a fixed bicarbonate cutoff. This one keeps that sequencing trap but adds
 * the thing that actually kills children with this illness and is almost
 * never modelled: a swelling brain (cerebral oedema). Its risk factors —
 * rapid fluid administration, a fast fall in effective osmolality,
 * bicarbonate use, young age, and a first-ever diagnosis — are all present
 * in this child on purpose, and its warning signs (headache, a falling
 * heart rate with a rising blood pressure, falling consciousness) and its
 * emergency treatment (mannitol or hypertonic saline, fluids slowed) are
 * modelled as their own gate and therapies. Rehydration here is spread over
 * 24–48 hours rather than corrected quickly, insulin is a low-dose infusion
 * started only after fluids have run for an hour or two and never a bolus,
 * and bicarbonate — used at a defined pH cutoff in the adult case — is
 * modelled as outright harmful here because of the added cerebral-oedema
 * risk in a child. See CASE_MODEL.md for the therapy/investigation model.
 */
export const SCAFFOLD_PEDIATRIC_DKA: CaseScaffold = {
  id: 'scaffold_pediatric_dka',
  title: 'Fast, Deep Breathing and Drowsiness in a School-age Child',
  conditionName: 'Diabetic Ketoacidosis (Paediatric)',
  subject: 'Pediatrics',
  system: 'Endocrinology',
  demographics: {
    name: 'Ananya Reddy',
    age: 8,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'An 8-year-old girl is brought to the emergency department by her parents after three weeks of excessive thirst and frequent urination, and roughly 4 kg of unintentional weight loss over the past month. For the last two days she has had repeated vomiting and abdominal pain, and today her parents noticed she is breathing fast and deeply and has become increasingly drowsy and hard to rouse.',
  initialVitals: {
    hr: 138,
    bp: '88/56',
    rr: 36,
    spo2: 97,
    temp: '36.6°C',
    grbs: 452,
  },
  clinchingClue:
    'Venous blood gas shows pH 7.08 with HCO3 6 mEq/L (severe high anion gap metabolic acidosis) and GRBS 452 mg/dL, with serum beta-hydroxybutyrate strongly positive at 6.4 mmol/L — no prior diagnosis of high blood sugar had ever been made in this child.',
  clinchingClueTimeMinutes: 15,
  examFindingsMap: {
    general:
      'Drowsy but rousable to voice (GCS 13/15, E3V4M6), deep sighing (Kussmaul) breathing, dry mucous membranes, sunken eyes, reduced skin turgor. Current weight 22 kg; the family\'s own record puts her usual weight nearer 26 kg a month ago.',
    chest: 'Trachea central, chest clear bilaterally, deep rapid breathing without wheeze or crepitations.',
    cvs: 'Tachycardic, regular rhythm, warm normal-volume peripheral pulses, capillary refill 2–3 seconds — not yet in frank shock.',
    abdomen: 'Mild diffuse tenderness, no guarding or rigidity, bowel sounds present.',
    neuro: 'Alert to voice, drowsy between questions, no neck stiffness, no focal deficit, pupils equal and reactive; no headache at this time.',
  },
  historyMap: {
    allergies: 'No known drug allergies.',
    past: 'Previously fit and well; no known diagnosis of high blood sugar before this illness, and no prior hospital admissions.',
    medications: 'No regular medications.',
    family: 'A maternal aunt has an autoimmune form of high blood sugar diagnosed in childhood; no other chronic illness in the family.',
    social: 'Attends the local school; no recent travel; immunisations up to date for age.',
  },
  investigationsMap: {
    grbs: {
      aliases: ['rbs / grbs', 'grbs'],
      resultText: 'GRBS: 452 mg/dL (Reference 70–140 mg/dL) — markedly elevated.',
      turnaroundMinutes: 2,
      category: 'labs',
      isIndicative: true,
    },
    vbg: {
      aliases: ['vbg'],
      resultText:
        'Venous Blood Gas: pH 7.08 (Reference 7.32–7.42 venous), PaCO2 18 mmHg, HCO3 6 mEq/L (Reference 18–25 mEq/L venous), Anion Gap 26 mEq/L — severe high anion gap metabolic acidosis. A venous sample is used to track this in children; it gives an adequate pH and bicarbonate without an arterial puncture.',
      turnaroundMinutes: 8,
      category: 'labs',
      isIndicative: true,
      appropriateness: 'indicated',
    },
    abg: {
      // Deliberately distinct from the adult case, where ABG is the primary
      // gas: here it is the low-yield order, because a venous sample is
      // preferred in children and an arterial one adds an avoidable puncture.
      aliases: ['abg'],
      resultText:
        'Arterial Blood Gas: pH 7.09 (Reference 7.35–7.45), PaCO2 17 mmHg, PaO2 98 mmHg, HCO3 6 mEq/L, Anion Gap 25 mEq/L — obtained via arterial puncture.',
      turnaroundMinutes: 12,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A venous gas already gives the pH and bicarbonate needed to guide treatment and to monitor the response over time; an arterial sample adds a painful puncture — and the risk of arterial spasm or thrombosis in a small vessel — without changing what happens next.',
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText:
        'Serum Electrolytes: Na+ 128 mEq/L (corrected for glucose approximately 133 mEq/L, Ref 135–145 mEq/L), K+ 4.6 mEq/L (Ref 3.5–5.0 mEq/L), Cl- 96 mEq/L (Ref 96–106 mEq/L) — total-body potassium is markedly depleted despite this near-normal reading.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    serum_ketones: {
      aliases: ['serum ketones'],
      resultText: 'Serum Ketones: Strongly positive (Beta-hydroxybutyrate 6.4 mmol/L, Ref <0.5 mmol/L).',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    urine_ketones: {
      aliases: ['urine ketones'],
      resultText:
        'Urine Ketones: 4+ (large) on dipstick — a qualitative acetoacetate test that lags behind clinical recovery; the serum test above is what is used to track resolution, not this one.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    serum_osmolality: {
      aliases: ['serum osmolality'],
      resultText:
        'Calculated Serum Osmolality: 302 mOsm/kg (Reference 275–295 mOsm/kg) — moderately raised. In a child, how fast this falls with treatment matters more than the single value: too fast a fall is dangerous.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    rft: {
      aliases: ['rft / kft (urea, creatinine)', 'rft', 'kft'],
      resultText:
        'Renal Function: Blood Urea 32 mg/dL (Reference 15–35 mg/dL for age), Serum Creatinine 0.6 mg/dL (Reference 0.3–0.7 mg/dL for age) — mildly high urea from volume depletion; creatinine remains within the paediatric reference range.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    ecg: {
      aliases: ['12-lead ecg', 'ecg'],
      resultText: '12-lead ECG: Sinus tachycardia at 138 bpm. T wave amplitude and morphology currently normal.',
      turnaroundMinutes: 5,
      category: 'imaging',
      isIndicative: true,
    },
    hba1c: {
      aliases: ['hba1c'],
      resultText:
        'HbA1c: 9.6% (Reference <5.7%) — consistent with roughly the last two to three months, in keeping with the recent weight loss and thirst rather than a long-standing disorder.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'This confirms how long the blood sugar has been running high, but it will not change what happens in the next hour of treatment — the immediate priorities are fluids, checking potassium, and the timing of the insulin infusion.',
    },
    ct_head: {
      aliases: ['ct head plain', 'ct head'],
      resultText:
        'CT Head Plain: study deferred. The child remains stable enough for transfer, but there is no new headache, no falling pulse with rising blood pressure, and no fall in conscious level beyond her presenting drowsiness.',
      turnaroundMinutes: 40,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'Moving a child who has not yet completed even the first hour of fluid resuscitation out of the resuscitation area to the scanner delays potassium checks and bedside monitoring, and is not warranted without a new headache, a falling heart rate with a rising blood pressure, or a fall in conscious level — none of which are present right now. Ordering it here costs time these first hours cannot spare.',
    },
    hourly_gcs: {
      aliases: ['hourly gcs charting'],
      resultText:
        'Hourly Neurological Observations: GCS, pupils, heart rate and blood pressure charted hourly on a dedicated flow sheet through the resuscitation and rehydration period.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    io_charting: {
      aliases: ['strict input-output charting', 'input output charting', 'io charting'],
      resultText:
        'Strict Input-Output Charting: all fluid in (IV and oral) and out (urine, vomitus) totalled and reviewed hourly against the planned 48-hour rehydration schedule.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc'],
      resultText:
        'CBC: Hb 13.6 g/dL (Reference 11.5–14.5 g/dL for age), WBC 15,800/mcL (Reference 5,000–14,500/mcL for age), Platelets 340,000/mcL.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A raised white cell count can occur here purely from the stress of the acute illness, without necessarily indicating a separate infection — it does not by itself change the next step of treatment.',
    },
  },
  therapiesMap: {
    iv_fluids_initial: {
      aliases: ['normal saline 0.9% 500 ml bolus', 'iv fluids', 'normal saline', '0.9% saline', 'ns bolus', 'isotonic saline'],
      responseText:
        'IV 0.9% Normal Saline given as a measured bolus of about 10 mL/kg over the first hour, moving straight into the calculated 48-hour deficit-plus-maintenance replacement rather than repeated large boluses.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -6, bp: '94/60' },
      appropriateness: 'indicated',
      rationale:
        'Initial volume expansion corrects perfusion, but children are resuscitated with a smaller measured bolus (around 10 mL/kg, repeated only if shock persists) and then rehydrated evenly over 24–48 hours rather than the faster regimen reasonable in an adult, because a child\'s brain is far more vulnerable to a rapid shift in fluid balance and effective osmolality.',
    },
    deficit_replacement: {
      aliases: ['ringer lactate maintenance', 'deficit replacement', 'maintenance fluids'],
      responseText:
        'The calculated fluid deficit (roughly 7–10% of body weight) is replaced evenly alongside maintenance fluid requirements over the next 48 hours using isotonic fluid, with regular reassessment.',
      onsetMinutes: 120,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale:
        'Spreading deficit correction over 24–48 hours, rather than correcting it quickly as in an adult, keeps the fall in effective osmolality gradual — the single most important modifiable factor in preventing cerebral oedema, the leading cause of death in children being treated for this illness.',
    },
    potassium_replacement: {
      aliases: ['potassium chloride in infusion', 'kcl', 'potassium chloride', 'potassium replacement'],
      responseText:
        'Potassium chloride added to the infusion once the potassium level and urine output were confirmed, running before and alongside the insulin infusion.',
      onsetMinutes: 30,
      labShift: {
        electrolytes:
          'Serum Electrolytes (repeat): Na+ 133 mEq/L (Ref 135–145 mEq/L), K+ 3.9 mEq/L (Ref 3.5–5.0 mEq/L), Cl- 100 mEq/L — potassium holding steady with replacement running.',
      },
      appropriateness: 'indicated',
      rationale:
        'Insulin drives potassium into cells. Starting replacement before or alongside insulin — once urine output is confirmed and the level is not dangerously high — prevents the severe hypokalaemia and arrhythmia that follow if insulin is started on an empty tank.',
    },
    insulin_infusion: {
      aliases: ['insulin infusion', 'iv insulin', 'regular insulin infusion', 'insulin'],
      responseText:
        'IV Regular Insulin infusion started at a low dose (0.05–0.1 units/kg/hr) one to two hours after fluid replacement had begun, with no bolus given at any point.',
      onsetMinutes: 90,
      vitalsEffect: { grbs: -140 },
      labShift: {
        vbg: 'Venous Blood Gas (repeat): pH 7.24 (Reference 7.32–7.42 venous), PaCO2 26 mmHg, HCO3 14 mEq/L, Anion Gap 16 mEq/L — improving steadily.',
        serum_ketones: 'Serum Ketones (repeat): Mild positive (Beta-hydroxybutyrate 1.1 mmol/L) — falling with treatment.',
        grbs: 'GRBS: 312 mg/dL (Reference 70–140 mg/dL) — falling gradually with the low-dose infusion.',
      },
      appropriateness: 'indicated',
      rationale:
        'A low-dose infusion (0.05–0.1 units/kg/hr) is used in children, started only after the first one to two hours of fluid replacement and never as a bolus — a bolus produces a far faster fall in glucose and effective osmolality than a child\'s brain can safely tolerate.',
      requiresFirst: ['iv_fluids_initial'],
      harmfulSequenceResponseText:
        'IV Regular Insulin infusion started immediately, before fluid replacement had been running for even an hour.',
      harmfulSequenceVitalsEffect: { hr: 14, bp: '76/48' },
      harmfulSequenceRationale:
        'Starting insulin before fluids have had time to restore circulating volume drives glucose — and potassium — into cells while the child is still volume-depleted, producing a rapid fall in blood glucose and effective osmolality on top of an unresuscitated circulation. That combination, a fast osmotic shift in a child whose volume has not yet been restored, is exactly the pattern linked to cerebral oedema, the leading cause of death in children with this illness. Fluids must run for one to two hours before insulin is even started, and insulin is never given as a bolus in a child.',
    },
    dextrose_5: {
      aliases: ['5% dextrose infusion', 'dextrose'],
      responseText:
        'Dextrose added to the IV fluids once glucose fell to around 250–300 mg/dL, with the insulin infusion continued unchanged to keep clearing ketones.',
      onsetMinutes: 20,
      vitalsEffect: { grbs: 15 },
      appropriateness: 'indicated',
      rationale:
        'Adding dextrose once glucose approaches 250–300 mg/dL lets the insulin infusion keep running at a rate that clears ketosis, without letting glucose — and the osmolality change that goes with it — fall too fast or tip into hypoglycaemia.',
    },
    sodium_bicarbonate: {
      aliases: ['sodium bicarbonate iv', 'sodium bicarbonate', 'bicarbonate', 'nahco3'],
      responseText: 'IV Sodium Bicarbonate given for the severe acidosis.',
      onsetMinutes: 20,
      vitalsEffect: { hr: 6 },
      appropriateness: 'harmful',
      rationale:
        'Bicarbonate is not used in children outside of extreme, life-threatening acidosis with cardiac compromise unresponsive to other measures, and even then only with great caution. Routine use here paradoxically worsens intracellular and CNS acidosis, drives potassium further into cells, and is specifically associated with a higher risk of cerebral oedema, the leading cause of death in children with this illness — fluids and insulin correct the acidosis without it.',
    },
    rapid_fluid_bolus: {
      aliases: ['normal saline 30 ml/kg bolus', 'rapid fluid bolus', 'large volume bolus'],
      responseText:
        'A large 30 mL/kg normal saline bolus given rapidly, well beyond the measured initial resuscitation volume used in children.',
      onsetMinutes: 20,
      vitalsEffect: { hr: 10, bp: '82/50' },
      appropriateness: 'harmful',
      rationale:
        'Aggressive rapid-bolus resuscitation, reasonable in some adult shock protocols, is one of the specific factors linked to cerebral oedema, the leading cause of death in children being treated for this illness — alongside a young age, a new diagnosis, a rapid fall in effective osmolality, and bicarbonate use. Boluses in children are kept to a measured 10 mL/kg, repeated only if shock persists, not a standard weight-based 30 mL/kg.',
    },
    mannitol: {
      aliases: ['mannitol 20%'],
      responseText:
        'Mannitol 20% (0.5–1 g/kg) given IV promptly for new warning signs of a swelling brain — a falling heart rate with a rising blood pressure, headache, and increasing drowsiness — with the fluid infusion rate slowed at the same time.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -18, bp: '104/64' },
      appropriateness: 'indicated',
      rationale:
        'Mannitol (or hypertonic saline as an alternative) is the emergency treatment for the warning signs of cerebral oedema in a child with this illness — a falling heart rate with a rising blood pressure, headache, and reduced consciousness — and must be given as soon as these are recognised, with the fluid rate slowed at the same time.',
    },
    hypertonic_saline: {
      aliases: ['3% hypertonic saline'],
      responseText:
        '3% Hypertonic saline (5–10 mL/kg) given IV as an alternative to mannitol for the same warning signs, with the fluid infusion rate slowed at the same time.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -16, bp: '102/64' },
      appropriateness: 'indicated',
      rationale:
        'Hypertonic saline is an equally acceptable emergency option to mannitol for the same warning signs of cerebral oedema, chosen by local protocol or when mannitol is unavailable or has already been given without full response.',
    },
    peds_consult: {
      aliases: ['paediatrics consult'],
      responseText:
        'Paediatrics consult requested; the on-call paediatrician reviews the fluid and insulin plan alongside the emergency team.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale:
        'The fluid and insulin regimen in a child differs materially from an adult protocol, and early recognition of neurological warning signs is time-critical, so senior paediatric input alongside the resuscitation is standard practice from the outset.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /normal saline|iv fluids|isotonic saline/i,
      name: 'Initial Measured Fluid Resuscitation',
      targetMilestoneMinutes: 20,
    },
    {
      orderOrActionPattern: /potassium|kcl/i,
      name: 'Potassium Checked & Replaced',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /insulin/i,
      name: 'Insulin Infusion Started (After Fluids)',
      targetMilestoneMinutes: 120,
    },
    {
      orderOrActionPattern: /mannitol|hypertonic saline/i,
      name: 'Emergency Treatment of Neurological Warning Signs',
      targetMilestoneMinutes: 20,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_pdka_1',
      title: 'Mild Iron Deficiency Anaemia',
      description: 'CBC incidentally shows Hb 10.8 g/dL (Reference 11.5–14.5 g/dL for age) with a low MCV, otherwise unremarkable.',
      correctAction: 'Arrange outpatient iron studies and dietary review once the acute illness has resolved; no acute intervention needed.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pdka_2',
      title: 'Dental Caries Noted on Examination',
      description: 'Multiple carious deciduous molars are noted incidentally on oral examination.',
      correctAction: 'Refer to paediatric dentistry as an outpatient once the child is stable and eating again.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pdka_3',
      title: 'Growth Not Plotted on a Chart This Visit',
      description: 'Height and weight have not been plotted on an age-appropriate growth chart during this admission, despite the documented recent weight loss.',
      correctAction: 'Plot height and weight on a growth chart before discharge to formally document the faltering and guide follow-up.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext:
        'An 8-year-old girl arrives drowsy with deep sighing breathing, dry mucous membranes and a very high blood sugar; the team must decide the first fluid step before anything else is drawn up.',
      consequenceOnRight: 'A measured initial fluid volume is started at once, reserving a larger resuscitation-style bolus only for a child in frank shock.',
      consequenceOnWrong: 'A full adult-sized rapid bolus is given instead, or fluids are delayed altogether, either of which raises her risk over the following hours.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'Venous gas and electrolyte results return showing a severe high anion gap metabolic acidosis with a markedly raised blood sugar, in a previously well child with no prior diagnosis of high sugars.',
      consequenceOnRight: 'The severe metabolic derangement is correctly recognised as a first presentation of this illness and the standard protocol for a child is started.',
      consequenceOnWrong: 'The acid-base picture is misread as a purely gastrointestinal illness, and specific treatment is delayed.',
    },
    {
      roleTag: 'PHARM',
      patientContext:
        'Fluids have been running for under an hour, and the team must decide when to start the insulin infusion that will bring the blood sugar and the acid level down.',
      consequenceOnRight: 'Insulin is started only after fluids have run for one to two hours and the potassium level has been checked, at the low weight-based dose used in children, never as a bolus.',
      consequenceOnWrong: 'Insulin is started immediately, or as a bolus, before the circulation has been supported — risking a dangerous swing in potassium and a rapid shift in the fluid balance of the brain.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext:
        "Two hours into treatment the nurse reports the child's heart rate has fallen from 138 to 92 while her blood pressure has risen, she now complains of a headache, and she is harder to rouse than at admission.",
      consequenceOnRight: 'These are recognised at once as warning signs of a swelling brain; the fluid rate is slowed and emergency hyperosmolar therapy is given without delay.',
      consequenceOnWrong: 'The falling heart rate is mistaken for treatment working and the change is not acted on, losing the narrow window in which emergency treatment can prevent permanent harm.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext:
        'Before discharge, the family — who had never previously been told their daughter had high blood sugars — need a plan for injections, home glucose monitoring, and what to do if she becomes unwell again.',
      consequenceOnRight: 'Structured education on injection technique, home glucose monitoring, sick-day rules and clear return precautions is given to the family before discharge.',
      consequenceOnWrong: 'The family is discharged without structured education, and the child returns in a similar crisis within weeks.',
    },
  ],
};
