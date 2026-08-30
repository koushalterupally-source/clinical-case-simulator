import { CaseScaffold } from '../../types';

/**
 * Acute severe asthma exacerbation.
 *
 * The teaching point this case is built around: a "normalising" PaCO2 in a
 * tiring asthmatic is a red flag, not reassurance, and a silent chest means
 * the patient has stopped moving enough air to wheeze — both signal
 * impending respiratory failure demanding immediate escalation, not relief.
 *
 * See src/data/cases/scaffolds.ts (scaffold_stemi) for the structural
 * exemplar and CASE_MODEL.md for the binding design spec that this file
 * follows.
 */
export const SCAFFOLD_ASTHMA: CaseScaffold = {
  id: 'scaffold_asthma',
  title: 'Breathlessness and Wheeze in Emergency',
  conditionName: 'Acute Severe Asthma Exacerbation',
  subject: 'Medicine',
  system: 'Respiratory',
  demographics: {
    name: 'Priya Sharma',
    age: 27,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'A 27-year-old female presents to the emergency room with two days of progressively worsening breathlessness that began after a cold with cough and sore throat. She has been wheezy on and off since childhood and used her inhaler repeatedly through the night without relief. She is now unable to speak in full sentences and is visibly using her neck and chest wall muscles to breathe.',
  initialVitals: {
    hr: 128,
    bp: '130/84',
    rr: 34,
    spo2: 88,
    temp: '37.2°C',
    grbs: 118,
  },
  clinchingClue:
    'Peak Expiratory Flow Rate is 28% of predicted. On repeat auscultation the chest is becoming strikingly quiet with markedly reduced air entry, while the arterial blood gas shows a PaCO2 that has climbed back toward the normal range rather than staying low — the classic sign of a patient who is tiring out, not improving.',
  clinchingClueTimeMinutes: 10,
  examFindingsMap: {
    general:
      'Sitting bolt upright, unable to complete sentences, visible use of sternocleidomastoid and intercostal muscles, tripod positioning, diaphoretic.',
    chest:
      'Widespread bilateral polyphonic wheeze with a markedly prolonged expiratory phase; air entry reduced throughout both lung fields.',
    cvs: 'Tachycardic, regular rhythm, pulsus paradoxus appreciated on manual blood pressure cuff deflation.',
    abdomen: 'Soft, non-tender, no organomegaly, bowel sounds normal.',
    neuro: 'Alert and oriented, visibly anxious, no focal neurological deficit.',
  },
  historyMap: {
    allergies: 'No known drug allergies.',
    past: 'Recurrent childhood wheezing episodes, intermittent use of inhaled therapy; last hospital visit for breathlessness was roughly two years ago.',
    medications: 'Salbutamol metered-dose inhaler used as needed; no regular controller inhaler taken in the past six months.',
    family: 'Mother has a similar history of childhood wheezing.',
  },
  investigationsMap: {
    pefr: {
      aliases: ['peak expiratory flow rate (pefr)', 'pefr', 'peak flow', 'peak expiratory flow rate', 'pef'],
      resultText:
        'Peak Expiratory Flow Rate (PEFR): 28% of predicted (Reference >80% of predicted) — severely reduced.',
      turnaroundMinutes: 2,
      category: 'monitoring',
      isIndicative: true,
    },
    abg: {
      aliases: ['abg', 'arterial blood gas'],
      resultText:
        'ABG (Room Air): pH 7.33 (Reference 7.35–7.45), PaCO2 46 mmHg (Reference 35–45 mmHg), PaO2 58 mmHg (Reference 80–100 mmHg), HCO3 23 mEq/L (Reference 22–26 mEq/L) — the PaCO2 has climbed back to a near-normal value; in a patient this breathless, that is a sign of respiratory muscle fatigue, not reassurance.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    cxr: {
      aliases: ['chest x-ray pa', 'cxr', 'chest x ray', 'chest xray'],
      resultText:
        'Chest X-ray PA: Hyperinflated lung fields with flattened diaphragms; no focal consolidation, pneumothorax, or pneumomediastinum.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count'],
      resultText:
        'CBC: Hb 13.5 g/dL (Reference 12.0–15.5 g/dL), WBC 9,800/mcL (Reference 4,000–11,000/mcL), Platelets 260,000/mcL (Reference 150,000–450,000/mcL) — mild leukocytosis in keeping with the preceding viral illness.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes', 'serum electrolytes', 'na k cl'],
      resultText:
        'Serum Electrolytes: Na+ 138 mEq/L (Reference 135–145 mEq/L), K+ 3.3 mEq/L (Reference 3.5–5.0 mEq/L), Cl- 101 mEq/L (Reference 96–106 mEq/L) — mild hypokalaemia, an expected effect of repeated beta-agonist nebulisation and worth monitoring.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp', 'c reactive protein'],
      resultText:
        'CRP: 18 mg/L (Reference <6 mg/L) — mildly elevated, consistent with the preceding viral upper respiratory infection rather than a bacterial process.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: true,
    },
    d_dimer: {
      aliases: ['d-dimer'],
      resultText:
        'D-dimer: 620 ng/mL FEU (Reference <500 ng/mL FEU) — non-specifically elevated; not indicated here, as there is no clinical suspicion of pulmonary embolism.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: false,
    },
    troponin: {
      aliases: ['troponin i', 'troponin', 'ck-mb', 'cardiac enzymes'],
      resultText:
        'Troponin I: 0.01 ng/mL (Reference <0.04 ng/mL) — normal; not indicated in the absence of chest pain or ischaemic ECG changes.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: false,
    },
    procalcitonin: {
      aliases: ['procalcitonin'],
      resultText:
        'Procalcitonin: 0.08 ng/mL (Reference <0.1 ng/mL for low likelihood of bacterial infection) — low; a viral trigger, not bacterial sepsis, is far more likely here.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: false,
    },
  },
  therapiesMap: {
    salbutamol_neb: {
      aliases: ['salbutamol nebulisation', 'salbutamol', 'neb', 'albuterol', 'bronchodilator nebulisation', 'salbutamol nebulization', 'nebulizer', 'inhaled salbutamol'],
      responseText:
        'Salbutamol given as back-to-back nebulisation (continuous nebulisation over the first hour) via an oxygen-driven nebuliser.',
      onsetMinutes: 10,
      vitalsEffect: { spo2: 5, hr: 6 },
      labShift: {
        pefr: 'Peak Expiratory Flow Rate (PEFR) (repeat): 52% of predicted (Reference >80% of predicted) — improved after bronchodilator therapy.',
      },
      appropriateness: 'indicated',
      rationale:
        'Inhaled short-acting beta-agonist is first-line and should be given continuously/back-to-back in a severe exacerbation; some tachycardia is an expected beta-agonist effect and is not, on its own, a reason to withhold it.',
    },
    ipratropium_neb: {
      aliases: ['ipratropium nebulisation', 'ipratropium', 'ipratropium bromide', 'anticholinergic nebulisation'],
      responseText: 'Ipratropium bromide nebulisation added to salbutamol.',
      onsetMinutes: 20,
      vitalsEffect: { spo2: 2 },
      appropriateness: 'indicated',
      rationale:
        'Adding an inhaled anticholinergic to a short-acting beta-agonist produces greater bronchodilation than either agent alone in severe exacerbations and reduces the likelihood of hospital admission.',
    },
    hydrocortisone: {
      aliases: ['hydrocortisone iv', 'hydrocortisone', 'iv steroid', 'systemic corticosteroid', 'iv corticosteroid', 'inj hydrocortisone', 'oral corticosteroid', 'prednisolone'],
      responseText: 'IV Hydrocortisone given.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale:
        'Systemic corticosteroids reduce airway inflammation and prevent relapse, but take hours to act; they must still be given early even though no immediate change in vitals is expected.',
    },
    magnesium: {
      aliases: ['magnesium sulfate 2 g iv infusion', 'magnesium', 'magnesium sulfate', 'mgso4', 'iv magnesium sulfate', 'mgso4 infusion'],
      responseText: 'Magnesium sulfate 2 g IV given as a single infusion over 20 minutes.',
      onsetMinutes: 30,
      vitalsEffect: { spo2: 2 },
      labShift: {
        abg: 'ABG (repeat): pH 7.38 (Reference 7.35–7.45), PaCO2 39 mmHg (Reference 35–45 mmHg), PaO2 78 mmHg (Reference 80–100 mmHg), HCO3 24 mEq/L (Reference 22–26 mEq/L) — improving with treatment.',
      },
      appropriateness: 'indicated',
      rationale:
        'A single dose of IV magnesium sulfate is recommended in a severe exacerbation not responding adequately to initial inhaled bronchodilators, providing additional smooth-muscle relaxation.',
    },
    oxygen: {
      aliases: ['supplemental oxygen', 'oxygen', 'o2'],
      responseText: 'Supplemental oxygen applied, titrated to target saturation.',
      onsetMinutes: 5,
      vitalsEffect: { spo2: 4 },
      labShift: {
        abg: 'ABG (repeat): pH 7.38 (Reference 7.35–7.45), PaCO2 39 mmHg (Reference 35–45 mmHg), PaO2 78 mmHg (Reference 80–100 mmHg), HCO3 24 mEq/L (Reference 22–26 mEq/L) — improving with treatment.',
      },
      appropriateness: 'indicated',
      rationale:
        'Titrated supplemental oxygen corrects hypoxaemia; the target is SpO2 94–98%, not the highest number achievable, so that a rising PaCO2 is not masked.',
    },
    niv: {
      aliases: ['non-invasive ventilation', 'niv', 'bipap', 'cpap'],
      responseText: 'Non-invasive ventilation trialled.',
      onsetMinutes: 15,
      vitalsEffect: { spo2: 2 },
      appropriateness: 'neutral',
      rationale:
        'Evidence for non-invasive ventilation in acute asthma is weak and inconsistent, unlike its established role in COPD; it must never be used to delay intubation in a patient who is tiring, as shown by a rising PaCO2 and a quiet chest.',
    },
    intubation: {
      aliases: ['endotracheal intubation', 'intubation', 'intubate', 'mechanical ventilation'],
      responseText: 'Endotracheal intubation performed for respiratory exhaustion and a silent chest.',
      onsetMinutes: 15,
      vitalsEffect: { spo2: 6, rr: -10 },
      appropriateness: 'indicated',
      rationale:
        'Intubation is indicated for a silent chest, exhaustion, or a rising PaCO2 despite maximal therapy. Because of dynamic hyperinflation, positive-pressure ventilation afterwards carries a real risk of breath-stacking and hypotension; a long expiratory time and a permissive-hypercapnia strategy are needed.',
    },
    morphine: {
      aliases: ['morphine iv', 'morphine', 'morphine sulphate', 'morphine sulfate'],
      responseText: 'Morphine IV given for distress.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -6, rr: -10, spo2: -8 },
      appropriateness: 'harmful',
      rationale:
        'Opioids cause respiratory depression and histamine-mediated bronchospasm and should never be given to a tiring asthmatic; they blunt the drive to breathe in a patient who is already failing.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /salbutamol|nebulis|nebuliz|bronchodilator/i,
      name: 'Inhaled Bronchodilator (Salbutamol Nebulisation)',
      targetMilestoneMinutes: 10,
    },
    {
      orderOrActionPattern: /hydrocortisone|corticosteroid|steroid/i,
      name: 'Systemic Corticosteroid',
      targetMilestoneMinutes: 30,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_asthma_1',
      title: 'Asymptomatic Solitary Pulmonary Nodule',
      description:
        'Chest X-ray incidentally shows a 6mm well-defined nodule in the right upper zone, unchanged in appearance on comparison, without calcification.',
      correctAction: 'Outpatient CT surveillance per incidental pulmonary nodule guidelines; no acute action required.',
      status: 'unnoticed',
    },
    {
      id: 'inc_asthma_2',
      title: 'Overdue Influenza Vaccination',
      description: 'Immunisation history reveals no influenza vaccine received this year.',
      correctAction: 'Recommend annual influenza vaccination prior to discharge.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext:
        'Young woman brought to the emergency room unable to complete full sentences, using accessory muscles of breathing, with a falling oxygen saturation.',
      consequenceOnRight: 'Continuous nebulised bronchodilator started immediately; breathing effort begins to ease.',
      consequenceOnWrong: 'Bronchodilator therapy delayed — accessory muscle use and hypoxia worsen.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'Chest becomes strikingly quiet on auscultation with markedly reduced air entry, while a repeat blood gas shows the carbon dioxide level climbing back toward normal.',
      consequenceOnRight: 'Impending respiratory failure correctly recognised despite reassuring-looking numbers.',
      consequenceOnWrong: 'The quiet chest and rising carbon dioxide are misread as reassuring; the patient continues to tire silently.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext:
        'Despite continuous bronchodilator nebulisation, breathlessness and wheeze persist an hour later with no improvement on repeat peak flow.',
      consequenceOnRight: 'Systemic corticosteroid and IV magnesium sulfate added; peak flow begins to climb.',
      consequenceOnWrong: 'Therapy is not escalated; the patient remains in extremis with no plan for deterioration.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'Selecting an analgesic for a distressed, breathless young patient in the emergency room.',
      consequenceOnRight: 'An opioid is correctly avoided given the risk of respiratory depression in a tiring patient.',
      consequenceOnWrong: 'An opioid is given, blunting respiratory drive in an already tiring patient.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext:
        'Planning discharge advice for a young patient recovering from a severe breathless episode that followed a viral illness.',
      consequenceOnRight: 'Inhaler technique reviewed, a written action plan provided, and controller therapy stepped up.',
      consequenceOnWrong: 'Patient discharged without an action plan or controller step-up, risking early relapse.',
    },
  ],
};
