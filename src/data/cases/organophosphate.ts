import { CaseScaffold } from '../../types';

/**
 * A cholinergic crisis from agricultural chemical exposure. The exam points
 * this case is built to test: atropine is titrated to drying of secretions
 * and a clear chest — never to pupil size or heart rate alone, both of which
 * can stay abnormal for other reasons even once the muscarinic crisis is
 * controlled; pralidoxime reactivates acetylcholinesterase for the nicotinic
 * picture (weakness, fasciculations) but does nothing for the muscarinic
 * crisis, so it should follow — not replace — adequate atropinisation, and
 * it works far better before the enzyme-inhibitor bond "ages" into a
 * permanent, irreversible complex; succinylcholine is dangerous here because
 * the same plasma cholinesterase that would normally clear it is already
 * inhibited, producing prolonged paralysis; and morphine, aminophylline and
 * phenothiazines are all avoided for their own separate reasons. A later
 * gate covers the intermediate syndrome — a distinct, delayed neuromuscular
 * complication, never named as such in patient-facing text. See
 * CASE_MODEL.md for the therapy model this scaffold follows.
 */
export const SCAFFOLD_ORGANOPHOSPHATE: CaseScaffold = {
  id: 'scaffold_organophosphate',
  title: 'Collapse After Field Chemical Exposure',
  conditionName: 'Organophosphate (Anticholinesterase) Poisoning',
  subject: 'Emergency',
  system: 'Toxicology',
  demographics: {
    name: 'Suresh Yadav',
    age: 34,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 34-year-old farmer is brought to the emergency department by his co-workers, found collapsed in his cotton field beside an empty container of a crop-spray chemical he had been using without gloves or a mask for the past few hours. He is drowsy but rousable, drenched in sweat, vomiting repeatedly, and has been incontinent of urine and stool on the way in. His clothes carry a strong solvent-like smell.',
  initialVitals: {
    hr: 52,
    bp: '92/58',
    rr: 28,
    spo2: 86,
    temp: '36.5°C',
    grbs: 172,
  },
  clinchingClue:
    'Plasma cholinesterase activity comes back at 800 IU/L (Reference 4,300–11,500 IU/L) — markedly depressed — in a patient with pinpoint, sluggishly reactive pupils, profuse oral and bronchial secretions, generalised fine muscle fasciculations, and a strong solvent-like odour on his clothing after handling an agricultural chemical.',
  clinchingClueTimeMinutes: 20,
  examFindingsMap: {
    general:
      'Drowsy but rousable to voice, drenched in sweat, profuse frothy oral secretions running from the corner of the mouth, strong solvent-like odour from his clothing, generalised fine muscle fasciculations visible over the chest wall and thighs.',
    cvs: 'Bradycardic, regular rhythm, normal heart sounds, cool clammy peripheries.',
    chest:
      'Bilateral coarse crepitations and rhonchi throughout, copious secretions audible without a stethoscope, using accessory muscles of respiration, tachypnoeic.',
    abdomen:
      'Diffuse mild tenderness with hyperactive bowel sounds; an episode of involuntary loose stool was noted on the trolley.',
    neuro:
      'Drowsy, oriented to person only, pinpoint (miotic) pupils bilaterally reacting sluggishly to light, generalised fine fasciculations, power difficult to assess formally given drowsiness but no obvious focal deficit.',
    skin: 'Diaphoretic throughout, clothing visibly damp, no burns, no rash.',
  },
  historyMap: {
    occupational:
      'Works as a farmer; was spraying a crop-protection chemical alone in the field this morning without gloves, a mask or any protective clothing.',
    past: 'No known chronic illness. No psychiatric history documented in prior records.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    social:
      'Occasional alcohol use, no other substance use reported. Family deny any note or stated intent, though an intentional exposure has not been directly asked about yet and should not be assumed either way until he can be interviewed himself.',
    family: 'No family history of a similar illness.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText:
        'CBC: Hb 14.6 g/dL (Reference 13.0–17.0 g/dL), WBC 14,800/mcL (Reference 4,000–11,000/mcL) — mild stress leukocytosis, Platelets 240,000/mcL (Reference 150,000–450,000/mcL).',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'A blood count neither confirms nor grades what is going on here, and nothing in it changes the antidote or the endpoint you titrate it to.',
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText:
        'Renal Function: Blood Urea 34 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.9 mg/dL (Reference 0.6–1.2 mg/dL) — normal, though should be trended if hypoperfusion or prolonged immobility develops.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'Renal function is worth knowing eventually, but it does not alter the immediate antidote decisions, which are made on clinical signs.',
    },
    lft: {
      aliases: ['lft'],
      resultText:
        'Liver Function Tests: AST 38 U/L (Reference 10–40 U/L), ALT 30 U/L (Reference 7–56 U/L), Total Bilirubin 0.7 mg/dL (Reference 0.2–1.2 mg/dL), Albumin 4.0 g/dL (Reference 3.5–5.0 g/dL) — normal.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: false,
      yieldNote:
        'Liver enzymes do not contribute here. Nothing in the result changes the antidote, its dose, or the endpoint you titrate to.',
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText:
        'Serum Electrolytes: Na+ 138 mEq/L (Reference 135–145 mEq/L), K+ 3.3 mEq/L (Reference 3.5–5.0 mEq/L) — mildly low, reflecting ongoing vomiting and secretory losses, Cl- 100 mEq/L (Reference 96–106 mEq/L).',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    abg: {
      aliases: ['abg'],
      resultText:
        'ABG (room air): pH 7.29 (Reference 7.35–7.45), PaCO2 52 mmHg (Reference 35–45 mmHg), PaO2 58 mmHg (Reference 80–100 mmHg), HCO3 21 mEq/L (Reference 22–26 mEq/L) — combined respiratory acidosis and hypoxaemia from airway flooding, bronchospasm and weak respiratory effort.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    ecg: {
      aliases: ['12-lead ecg', 'ecg'],
      resultText:
        '12-lead ECG: Sinus bradycardia at 52 bpm, QTc 470 ms (Reference <440 ms) — prolonged, no acute ST-T changes.',
      turnaroundMinutes: 5,
      category: 'imaging',
      isIndicative: true,
    },
    cxr: {
      aliases: ['chest x-ray pa', 'chest x-ray portable', 'cxr'],
      resultText:
        'Chest X-ray (portable, AP): Bilateral perihilar haziness with ill-defined patchy opacities, in keeping with airway flooding from copious secretions; no focal consolidation to suggest aspiration at this stage.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    grbs: {
      aliases: ['rbs / grbs', 'grbs'],
      resultText:
        'GRBS: 172 mg/dL (Reference 70–140 mg/dL) — mild stress hyperglycaemia from the acute physiological insult; not diabetes.',
      turnaroundMinutes: 2,
      category: 'labs',
      isIndicative: true,
    },
    amylase_lipase: {
      aliases: ['serum amylase & lipase', 'amylase', 'lipase'],
      resultText:
        'Serum Amylase & Lipase: Amylase 210 U/L (Reference 30–110 U/L), Lipase 190 U/L (Reference 10–140 U/L) — mildly elevated, a recognised but usually self-limiting complication of significant cholinergic excess; monitor rather than treat unless clinical pancreatitis develops.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    // Plasma (pseudo)cholinesterase and RBC (true) acetylcholinesterase are two
    // different enzymes with different kinetics — the same reason serum and
    // urine ketones are kept as separate keys in the DKA case. The plasma
    // enzyme falls and recovers fast and is what is usually available acutely;
    // the RBC enzyme mirrors the one inhibited at the synapse and recovers
    // only slowly, so it tracks true clinical severity better.
    plasma_cholinesterase: {
      aliases: [
        'plasma cholinesterase',
        'serum cholinesterase',
        'pseudocholinesterase',
        'plasma cholinesterase level',
      ],
      resultText:
        'Plasma (Pseudo)cholinesterase: 800 IU/L (Reference 4,300–11,500 IU/L; range is lab-dependent) — markedly depressed, consistent with significant exposure. This enzyme falls and recovers faster than the red-cell enzyme, so it tracks acute severity but is not a reliable guide to whether it is safe to stop atropine.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    rbc_ache: {
      aliases: ['rbc acetylcholinesterase', 'red cell cholinesterase', 'rbc cholinesterase'],
      resultText:
        'RBC (True) Acetylcholinesterase: 3.2 U/g Hb (Reference 26–36 U/g Hb; range is lab-dependent) — severely depressed. This is the same enzyme inhibited at the nerve synapse; it recovers only as new red cells are made (roughly 1% per day) or through timely oxime reactivation, and correlates better with clinical severity than the plasma enzyme.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: true,
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'large bore iv'],
      responseText: 'Two wide-bore (16G) IV cannulae secured for rapid drug and fluid delivery.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale:
        'Reliable large-bore venous access is needed immediately, since repeated escalating antidote doses and supportive fluids will follow within minutes.',
    },
    oxygen: {
      aliases: ['supplemental oxygen', 'oxygen', 'high flow oxygen'],
      responseText: 'High-flow supplemental oxygen applied by face mask with continuous suctioning of oral secretions.',
      onsetMinutes: 2,
      vitalsEffect: { spo2: 3 },
      appropriateness: 'indicated',
      rationale:
        'Airway suctioning and supplemental oxygen support gas exchange immediately, though saturation will not fully recover until the bronchial secretions themselves are dried by the antidote.',
    },
    decontamination: {
      aliases: ['skin decontamination & ppe precautions', 'decontamination', 'remove contaminated clothing'],
      responseText:
        'All clothing is removed and bagged, the skin is washed with soap and water, and staff handling the patient don gloves and a gown before further contact.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale:
        'Contaminated skin and clothing keep absorbing the chemical and can transfer it to bare-handed staff, causing secondary cholinergic symptoms in the treating team. This should be done in parallel with — never in place of, and never as a reason to delay — the antidotes and airway support the patient needs immediately.',
    },
    atropine: {
      aliases: ['atropine 0.6 mg iv', 'atropine', 'iv atropine'],
      responseText:
        'IV atropine given as repeated boluses, doubled roughly every 5 minutes, then continued as a titrated infusion once secretions begin to dry.',
      onsetMinutes: 10,
      vitalsEffect: { spo2: 8, rr: -8, hr: 14 },
      labShift: {
        abg: 'ABG (repeat, room air): pH 7.38 (Reference 7.35–7.45), PaCO2 42 mmHg, PaO2 88 mmHg, HCO3 23 mEq/L — improving as bronchial secretions dry and ventilation improves with atropinisation.',
      },
      appropriateness: 'indicated',
      rationale:
        'Atropine is the immediate antidote for the muscarinic features of cholinergic excess — bronchorrhoea, bronchospasm, bradycardia and secretions — and the dose is doubled at short intervals until secretions genuinely dry and the chest clears. Chasing a specific heart rate or pupil size instead is a common and dangerous error: pupils can stay miotic and the heart rate can stay elevated (partly from atropine itself) even once adequate atropinisation has been reached.',
    },
    pralidoxime: {
      aliases: ['pralidoxime (pam) iv', 'pralidoxime', 'pam'],
      responseText:
        'IV pralidoxime (PAM) infusion started alongside continuing atropine, aimed at reactivating the inhibited enzyme before the enzyme-inhibitor bond becomes permanent.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -2 },
      labShift: {
        plasma_cholinesterase:
          'Plasma (Pseudo)cholinesterase (repeat): rising to 2,100 IU/L (Reference 4,300–11,500 IU/L) — reactivation is occurring, but this response is strongly time-critical: once the enzyme-inhibitor bond has "aged" into a stable, irreversible complex — which for some agents can happen within hours of exposure — reactivation no longer works and only new enzyme synthesis restores activity.',
        rbc_ache:
          'RBC (True) Acetylcholinesterase (repeat): 4.1 U/g Hb (Reference 26–36 U/g Hb) — still severely depressed. Reactivation at the nerve synapse is real but only partial once some ageing has occurred; full recovery otherwise depends on new red cell and enzyme production over days to weeks, which is why clinical improvement — not one repeat level — is what actually guides when it is safe to taper atropine and watch closely for delayed weakness.',
      },
      appropriateness: 'indicated',
      rationale:
        'Pralidoxime reactivates acetylcholinesterase and is aimed at the nicotinic picture — muscle weakness and fasciculations. It does not relieve muscarinic symptoms (secretions, bronchospasm, bradycardia), which is atropine\'s job, so it is added once atropine is running and never used to replace it, and its theoretical benefit falls the longer it is delayed because the enzyme-inhibitor bond "ages" into an irreversible complex. Be clear about the strength of the evidence here, because it is not the same as for atropine: pralidoxime remains in standard teaching and in most national protocols, but the Cochrane review found no trial evidence of benefit and a signal of possible harm, and it does NOT reliably prevent the intermediate syndrome — one cohort found more of it in the pralidoxime arm. Treat it as conventional practice with a weak evidence base, not as a proven life-saving intervention on a par with atropine.',
      requiresFirst: ['atropine'],
      harmfulSequenceResponseText:
        'Pralidoxime infusion is started before atropine has been given. The muscarinic crisis is untouched — secretions remain profuse, the chest stays full of coarse crepitations, and oxygenation continues to fall while the infusion runs.',
      harmfulSequenceVitalsEffect: { spo2: -6, rr: 4 },
      harmfulSequenceRationale:
        'Pralidoxime does nothing for the muscarinic crisis — bronchorrhoea, bronchospasm and bradycardia — because that is atropine\'s job, not the oxime\'s. Giving it first, before atropine has begun controlling the immediately life-threatening secretions and hypoxia, leaves the patient exposed to ongoing respiratory compromise while time and the infusion both run.',
    },
    lorazepam: {
      aliases: ['lorazepam iv', 'lorazepam', 'benzodiazepine'],
      responseText: 'IV lorazepam given for agitation and to terminate any seizure activity.',
      onsetMinutes: 5,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale:
        'Benzodiazepines are the appropriate agent for seizures or severe agitation in this setting, both directly and as adjuncts to controlling the overall crisis; they carry none of the risks that make several other sedative and antiemetic classes unsafe here.',
    },
    crystalloid: {
      aliases: ['normal saline 0.9% 500 ml bolus', 'normal saline', 'iv fluids', 'crystalloid bolus'],
      responseText: 'IV 0.9% normal saline given to replace ongoing losses from vomiting, diarrhoea and secretions.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -4, bp: '100/64' },
      appropriateness: 'indicated',
      rationale:
        'Supportive isotonic fluid replaces the substantial ongoing losses from vomiting, diarrhoea and profuse secretions; it plays a supporting role here rather than being the primary antidote therapy.',
    },
    intubation: {
      aliases: ['endotracheal intubation', 'intubation', 'mechanical ventilation', 'ventilatory support'],
      responseText:
        'Endotracheal intubation and mechanical ventilation instituted for failing respiratory effort, using a non-depolarising muscle relaxant for the intubating dose.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 10, rr: -10 },
      appropriateness: 'indicated',
      rationale:
        'Ventilatory failure from copious secretions, bronchospasm and weakness can outpace what atropine and suctioning alone can manage, and mechanical ventilation is life-saving when it does. A non-depolarising agent, not succinylcholine, must be used for the intubating dose.',
    },
    succinylcholine: {
      aliases: ['succinylcholine iv', 'succinylcholine', 'suxamethonium'],
      responseText:
        'Succinylcholine given as the muscle relaxant for intubation. Spontaneous respiratory effort fails to return afterwards, and the patient remains paralysed and apnoeic far longer than expected.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: -15, hr: 10 },
      appropriateness: 'harmful',
      rationale:
        'Succinylcholine is broken down by the same plasma (pseudo)cholinesterase that this exposure has already inhibited. With that enzyme unavailable, a single intubating dose produces a markedly prolonged paralysis and apnoea, forcing an extended period of ventilation that a non-depolarising agent (such as rocuronium) would have avoided entirely.',
    },
    contraindicated_drugs: {
      aliases: ['morphine iv', 'morphine', 'aminophylline', 'theophylline', 'phenothiazine', 'chlorpromazine', 'promethazine'],
      responseText: 'The drug is given for sedation or nausea.',
      onsetMinutes: 10,
      vitalsEffect: { rr: -6, spo2: -8 },
      appropriateness: 'harmful',
      rationale:
        'Morphine can worsen respiratory depression and secretions in a patient already struggling with bronchorrhoea; aminophylline/theophylline can precipitate seizures and arrhythmia on top of an already irritable myocardium; and phenothiazines (chlorpromazine, promethazine) can deepen sedation, lower the seizure threshold and complicate the clinical picture. All three drug classes are conventionally avoided in this presentation for these separate reasons.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /atropine/i,
      name: 'Atropine Titrated to Drying of Secretions',
      targetMilestoneMinutes: 10,
    },
    {
      orderOrActionPattern: /pralidoxime|\bpam\b/i,
      name: 'Pralidoxime (Enzyme-Reactivator) Therapy',
      targetMilestoneMinutes: 45,
    },
    {
      orderOrActionPattern: /intubation|mechanical ventilation|ventilatory support/i,
      name: 'Definitive Airway & Ventilatory Support for Respiratory Failure',
      targetMilestoneMinutes: 30,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_op_1',
      title: 'Undisclosed Recent Psychosocial Stress',
      description:
        'Family mention, almost in passing, that he has seemed low in mood and had been worried about crop failure and debt over the past few weeks.',
      correctAction:
        'Screen directly for suicidal ideation and arrange a psychiatry review once he is medically stable, since a self-inflicted exposure is far more common in this setting than an accidental one and should never be assumed away.',
      status: 'unnoticed',
    },
    {
      id: 'inc_op_2',
      title: 'Undocumented Tetanus Booster Status',
      description: 'No record of when he last received a tetanus toxoid booster.',
      correctAction:
        'Check and update tetanus toxoid booster status before discharge, given his ongoing occupational exposure to soil and field injuries.',
      status: 'unnoticed',
    },
    {
      id: 'inc_op_3',
      title: 'Incidental Calcified Pulmonary Granuloma',
      description:
        'The chest film also shows a small, well-defined calcified nodule in the right upper lobe, consistent with an old healed granulomatous infection.',
      correctAction:
        'No acute action needed; reassure and note it in the record as an old healed finding, not a new process requiring work-up.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext:
        'A farmer collapses in his field beside an empty chemical container, arriving drowsy with pinpoint pupils, profuse secretions, bradycardia and low oxygen saturation, and the team must decide the very first priority.',
      consequenceOnRight:
        'The airway is cleared of secretions, oxygen is applied, IV access is secured and the muscarinic antidote is started immediately, without waiting for any confirmatory test.',
      consequenceOnWrong:
        'Treatment is delayed while confirmatory tests are awaited, and secretions, bronchospasm and hypoxia continue to worsen.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'The combination of pinpoint pupils, profuse secretions, bradycardia, muscle fasciculations and a markedly depressed enzyme level points to a specific cause after an occupational chemical exposure.',
      consequenceOnRight:
        'The muscarinic and nicotinic features are correctly linked to cholinergic excess from the field chemical, guiding the choice of antidotes.',
      consequenceOnWrong:
        'A different cause, such as a primary seizure disorder or sepsis, is pursued instead, and the correct antidotes are never started.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext:
        'Secretions remain profuse and the chest stays full despite the first round of antidote therapy, and the team must decide whether to keep escalating the dose or stop.',
      consequenceOnRight:
        'The antidote dose is doubled at short intervals and continued as an infusion until secretions genuinely dry and the chest clears, rather than stopping once the heart rate rises or the pupils widen.',
      consequenceOnWrong:
        'Dosing is guided by heart rate or pupil size alone, and further doses are withheld too early while secretions and bronchospasm are still active.',
    },
    {
      roleTag: 'PHARM',
      patientContext:
        'The team must add a second agent for the muscle weakness and fasciculations, decide which drug classes to avoid entirely while he remains this unwell, and choose a safe muscle relaxant if he needs to be intubated.',
      consequenceOnRight:
        'An enzyme-reactivating agent is added early alongside the muscarinic antidote, the recognised contraindicated drug classes are avoided, and a non-depolarising agent is used if intubation is required.',
      consequenceOnWrong:
        'A contraindicated drug is given, or a paralytic that depends on the same inhibited enzyme is used for intubation, or the enzyme-reactivating agent is delayed so long it can no longer restore normal function.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext:
        'Two days after the acute crisis appears to have settled, he develops new weakness of the neck flexors, difficulty holding his head up, and a weakening cough, with no fresh chemical exposure.',
      consequenceOnRight:
        'A distinct, later neuromuscular complication is recognised, ventilatory reserve is monitored closely, and respiratory support is arranged proactively before he tires out completely.',
      consequenceOnWrong:
        'The new weakness is dismissed as residual sedation, and unrecognised respiratory muscle failure leads to a preventable arrest.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext:
        'Before discharge planning begins, the team reviews what should be clarified about the circumstances of the exposure and what support he will need going forward.',
      consequenceOnRight:
        'The circumstances of the exposure are clarified directly with him once he can communicate, a psychiatry review is arranged given the possibility this was not accidental, and safe handling and protective equipment for future spraying are discussed.',
      consequenceOnWrong:
        'The circumstances are never clarified, an intentional cause is missed, and no safety counselling is given before he returns to the same unsafe work practice.',
    },
  ],
};
