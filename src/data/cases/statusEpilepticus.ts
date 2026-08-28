import { CaseScaffold } from '../../types';

/**
 * Convulsive status epilepticus.
 *
 * The teaching point this case is built around: a benzodiazepine must be
 * given first and fast — the window in which a seizure is easiest to
 * terminate is the first few minutes — and a second-line agent given before
 * that window closes wastes it rather than helping.
 *
 * NOTE: "status" is an ordinary English word and is one of this case's
 * forbidden gate words (see CASE_MODEL.md / the gate-word check). Every
 * gateMilestones.patientContext below deliberately avoids the phrase
 * "status" in any form (e.g. never "mental status" or "haemodynamic
 * status") — "level of consciousness" / "sensorium" is used instead.
 *
 * See src/data/cases/scaffolds.ts (scaffold_stemi) for the structural
 * exemplar and CASE_MODEL.md for the binding design spec that this file
 * follows.
 */
export const SCAFFOLD_STATUS_EPILEPTICUS: CaseScaffold = {
  id: 'scaffold_status_epilepticus',
  title: 'Continuous Limb Jerking in Emergency',
  conditionName: 'Convulsive Status Epilepticus',
  subject: 'Medicine',
  system: 'Neurology',
  demographics: {
    name: 'Arjun Mehta',
    age: 32,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 32-year-old male is brought to the emergency room by family members with continuous, generalised shaking of all four limbs for over 20 minutes, without regaining awareness between spells. He is frothing at the mouth and has bitten his tongue. His family reports he stopped taking his regular tablets four days ago after running out.',
  initialVitals: {
    hr: 138,
    bp: '156/94',
    rr: 26,
    spo2: 90,
    temp: '38.0°C',
    grbs: 96,
  },
  clinchingClue:
    'Ongoing generalised tonic-clonic activity continues at 22 minutes with no recovery of awareness between events, despite one dose of a benzodiazepine already having been given — a bedside diagnosis that must not wait for EEG confirmation.',
  clinchingClueTimeMinutes: 5,
  examFindingsMap: {
    general:
      'Actively convulsing with rhythmic jerking of all four limbs, frothing at the mouth, cyanosed lips, a fresh tongue laceration noted.',
    cvs: 'Tachycardic, regular rhythm, blood pressure elevated, consistent with the ongoing motor activity.',
    chest: 'Bilateral equal air entry, oral secretions audible, no wheeze.',
    abdomen: 'Soft, non-tender, bowel sounds present; incontinence of urine noted.',
    neuro:
      'Eyes deviated upward, unresponsive to voice throughout the limb jerking, pupils equal and reactive, no lateralising sign appreciable between episodes.',
  },
  historyMap: {
    allergies: 'No known drug allergies.',
    past: 'Known seizure disorder on regular oral anti-seizure medication for several years, previously well controlled.',
    medications: 'Regular oral anti-seizure medication, stopped four days ago when the supply ran out.',
    family: 'Non-contributory.',
  },
  investigationsMap: {
    grbs: {
      aliases: ['rbs / grbs', 'grbs', 'rbs', 'blood sugar', 'bedside glucose'],
      resultText:
        'RBS / GRBS: 96 mg/dL (Reference 70–140 mg/dL) — normal; checking bedside glucose immediately in every convulsing patient is mandatory to exclude hypoglycaemia as a reversible cause, even though it is normal here.',
      turnaroundMinutes: 2,
      category: 'labs',
      isIndicative: true,
    },
    abg: {
      aliases: ['abg'],
      resultText:
        'ABG: pH 7.28 (Reference 7.35–7.45), PaCO2 44 mmHg (Reference 35–45 mmHg), PaO2 68 mmHg (Reference 80–100 mmHg), HCO3 20 mEq/L (Reference 22–26 mEq/L) — a mixed respiratory and lactic acidosis expected from prolonged muscular activity and transient hypoventilation; it should resolve once the convulsions stop.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText:
        'Serum Electrolytes: Na+ 138 mEq/L (Reference 135–145 mEq/L), K+ 3.6 mEq/L (Reference 3.5–5.0 mEq/L), Cl- 102 mEq/L (Reference 96–106 mEq/L) — normal, effectively excluding a metabolic electrolyte disturbance as the trigger.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    calcium: {
      aliases: ['serum calcium', 'calcium', 'serum ca'],
      resultText: 'Serum Calcium: 9.2 mg/dL (Reference 8.5–10.5 mg/dL) — normal, excluding hypocalcaemia as a trigger.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText:
        'CBC: Hb 14.0 g/dL (Reference 13.0–17.0 g/dL), WBC 13,200/mcL (Reference 4,000–11,000/mcL), Platelets 250,000/mcL (Reference 150,000–450,000/mcL) — mild stress leukocytosis expected after prolonged muscular activity.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    ct_head: {
      aliases: ['ct head plain', 'ct head', 'ct brain'],
      resultText:
        'CT Head (Plain): No acute haemorrhage, midline shift, or space-occupying lesion. No evidence of raised intracranial pressure.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft'],
      resultText:
        'Liver Function Tests: AST 32 U/L (Reference 10–40 U/L), ALT 28 U/L (Reference 7–56 U/L), Total Bilirubin 0.7 mg/dL (Reference 0.2–1.2 mg/dL) — normal; relevant baseline given ongoing anti-seizure medication use.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    serum_lactate: {
      aliases: ['serum lactate', 'lactate'],
      resultText:
        'Serum Lactate: 6.2 mmol/L (Reference 0.5–2.2 mmol/L) — elevated, an expected consequence of prolonged generalised muscular activity rather than a marker of sepsis; it should fall once the convulsions are terminated.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    mri_brain: {
      aliases: ['mri brain', 'mri'],
      resultText:
        'MRI Brain: No acute infarct, haemorrhage or mass lesion; unremarkable for an acute cause of this presentation.',
      turnaroundMinutes: 90,
      category: 'imaging',
      isIndicative: false,
    },
    gcs_charting: {
      aliases: ['hourly gcs charting', 'gcs charting', 'glasgow coma scale monitoring'],
      resultText:
        'Hourly GCS Charting instituted: score fluctuating 8–10/15 between episodes, improving as the convulsions are controlled.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    troponin: {
      aliases: ['troponin i', 'troponin'],
      resultText:
        'Troponin I: 0.02 ng/mL (Reference <0.04 ng/mL) — normal; not indicated in the absence of chest pain or ECG changes suggestive of cardiac injury.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: false,
    },
  },
  therapiesMap: {
    lorazepam: {
      aliases: ['lorazepam iv', 'lorazepam', 'benzodiazepine', 'iv benzodiazepine'],
      responseText: 'IV Lorazepam given as first-line therapy.',
      onsetMinutes: 5,
      vitalsEffect: { hr: -14, rr: -2, spo2: 4 },
      labShift: {
        serum_lactate: 'Serum Lactate (repeat): 2.1 mmol/L (Reference 0.5–2.2 mmol/L) — normalised now that the convulsions have stopped.',
      },
      appropriateness: 'indicated',
      rationale:
        'A benzodiazepine is first-line therapy and should be given immediately; treatment within the first five minutes gives the best chance of terminating the episode before it becomes refractory.',
    },
    levetiracetam: {
      aliases: ['levetiracetam iv', 'levetiracetam'],
      responseText: 'IV Levetiracetam loading dose given.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -4 },
      requiresFirst: ['lorazepam'],
      harmfulSequenceResponseText:
        'IV Levetiracetam given before any benzodiazepine had been administered; the convulsions continue unabated.',
      harmfulSequenceVitalsEffect: { spo2: -6, hr: 8 },
      harmfulSequenceRationale:
        'Giving a second-line agent before a benzodiazepine wastes the window in which seizures are most easily terminated pharmacologically; a benzodiazepine must always be given first.',
      appropriateness: 'indicated',
      rationale:
        'A second-line intravenous anti-seizure medication is added when convulsions continue despite an adequate benzodiazepine dose, and should follow — never precede — the benzodiazepine.',
    },
    phenytoin: {
      aliases: ['phenytoin loading', 'phenytoin'],
      responseText: 'IV Phenytoin loading dose given at a controlled infusion rate, via a line free of dextrose-containing fluid.',
      onsetMinutes: 25,
      vitalsEffect: { hr: -4 },
      requiresFirst: ['lorazepam'],
      harmfulSequenceResponseText:
        'IV Phenytoin given before any benzodiazepine had been administered; the convulsions continue unabated.',
      harmfulSequenceVitalsEffect: { spo2: -6, bp: '138/86' },
      harmfulSequenceRationale:
        'Giving a second-line agent before a benzodiazepine wastes the window in which seizures are most easily terminated pharmacologically; a benzodiazepine must always be given first.',
      appropriateness: 'indicated',
      rationale:
        'Phenytoin is an appropriate second-line agent, but must be infused no faster than about 50 mg/min because of the risk of hypotension and cardiac arrhythmia, and must never be mixed with or run through a line carrying dextrose-containing fluid, which causes it to precipitate.',
    },
    dextrose: {
      aliases: ['25% dextrose 100 ml iv', 'dextrose', '25 dextrose'],
      responseText: 'IV 25% Dextrose given after confirming the bedside glucose was normal.',
      onsetMinutes: 10,
      appropriateness: 'neutral',
      rationale:
        'Blood glucose was already normal here, so dextrose adds no benefit — but checking glucose immediately and being ready to correct it is correct practice in every convulsing patient, since hypoglycaemia is an easily reversible cause.',
    },
    thiamine: {
      aliases: ['thiamine iv', 'thiamine'],
      responseText: 'IV Thiamine given.',
      onsetMinutes: 10,
      appropriateness: 'neutral',
      rationale:
        'Thiamine is given before glucose when alcohol use disorder or malnutrition is suspected, to avoid precipitating Wernicke encephalopathy; there is no such history here, so it neither helps nor harms.',
    },
    oxygen: {
      aliases: ['supplemental oxygen', 'oxygen', 'o2'],
      responseText: 'Supplemental oxygen applied by face mask.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 6 },
      appropriateness: 'indicated',
      rationale:
        'Airway and breathing support with supplemental oxygen is a basic first step in any ongoing convulsive episode, alongside positioning to protect the airway.',
    },
    intubation: {
      aliases: ['endotracheal intubation', 'intubation', 'intubate'],
      responseText: 'Endotracheal intubation performed for airway protection and ongoing refractory convulsions.',
      onsetMinutes: 20,
      vitalsEffect: { spo2: 6 },
      appropriateness: 'indicated',
      rationale:
        'Intubation is indicated for airway protection and for refractory seizures unresponsive to first- and second-line therapy, particularly with a falling level of consciousness and desaturation.',
    },
    nifedipine: {
      aliases: ['nifedipine oral', 'nifedipine'],
      responseText: 'Oral Nifedipine given for the elevated blood pressure.',
      onsetMinutes: 15,
      vitalsEffect: { bp: '92/58' },
      appropriateness: 'harmful',
      rationale:
        'The raised blood pressure here is a compensatory autonomic response to the ongoing convulsive activity and settles once the seizures are controlled; abruptly lowering it with a short-acting oral calcium-channel blocker risks cerebral hypoperfusion and should be avoided.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /lorazepam|benzodiazepine/i,
      name: 'Benzodiazepine (Lorazepam)',
      targetMilestoneMinutes: 5,
    },
    {
      orderOrActionPattern: /levetiracetam|phenytoin/i,
      name: 'Second-line Antiepileptic',
      targetMilestoneMinutes: 20,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_status_1',
      title: 'Tongue Laceration',
      description:
        'Examination of the oral cavity reveals a superficial lateral tongue laceration with mild ongoing ooze, no active brisk bleeding.',
      correctAction: 'Conservative management with saline mouth rinses; surgical repair only if the laceration is large, gaping, or actively bleeding.',
      status: 'unnoticed',
    },
    {
      id: 'inc_status_2',
      title: 'Old Healed Scalp Scar',
      description: 'A well-healed, non-tender linear scalp scar is noted on inspection, with no history volunteered by the family.',
      correctAction: 'Note in the record and ask the family about prior head injury once the patient is able to communicate; no acute action needed.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext:
        'Man continues to shake all four limbs for over twenty minutes without regaining awareness between episodes, brought in by anxious family members.',
      consequenceOnRight: 'A benzodiazepine is given immediately; the shaking begins to settle.',
      consequenceOnWrong: 'Treatment is delayed while further history is taken; the shaking continues uninterrupted.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'Ongoing generalised limb jerking persists with no return of awareness between episodes, despite one dose of medication already given.',
      consequenceOnRight: 'The ongoing, unresolving nature of the episode is recognised as needing urgent escalation rather than watchful waiting.',
      consequenceOnWrong: 'The episode is assumed to be settling on its own and is not escalated; the jerking continues.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Limb jerking continues despite an adequate dose of a first-line agent having already been given.',
      consequenceOnRight: 'A second-line intravenous anti-seizure medication is added promptly.',
      consequenceOnWrong: 'No second agent is added; the episode is allowed to continue unchecked.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'Blood pressure remains elevated while the patient continues to jerk all four limbs.',
      consequenceOnRight: 'The elevated blood pressure is correctly left untreated, recognising it as a response to the ongoing muscular activity.',
      consequenceOnWrong: 'A short-acting oral blood pressure medication is given, risking a sudden drop in blood pressure and reduced brain perfusion.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext:
        'Planning discharge counselling for a patient recovering from a prolonged episode of limb jerking caused by missing his regular tablets.',
      consequenceOnRight: 'Medication adherence counselling given, with a clear plan for prescription refills and follow-up neurology review.',
      consequenceOnWrong: 'Patient discharged without adherence counselling or a follow-up plan, risking early recurrence.',
    },
  ],
};
