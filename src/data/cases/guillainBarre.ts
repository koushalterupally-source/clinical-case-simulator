import { CaseScaffold } from '../../types';

/**
 * Acute ascending, symmetric flaccid weakness with global areflexia,
 * beginning roughly two weeks after a self-limited diarrhoeal illness — see
 * CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 *
 * Teaching points this case is built around: the diagnosis is clinical —
 * symmetric ascending weakness with universally absent deep tendon reflexes
 * and no sensory level — and CSF/nerve-conduction findings support rather
 * than gate that diagnosis, since albuminocytological dissociation (raised
 * CSF protein with a near-normal cell count) can genuinely be absent in the
 * first week; the thing that actually kills is unrecognised respiratory
 * failure, so serial single-breath count and bedside spirometry (trending
 * vital capacity) is the critical, repeated bedside action — not a one-off
 * test — and a normal arterial blood gas is falsely reassuring, since carbon
 * dioxide retention is a very late finding in neuromuscular respiratory
 * failure; intravenous immunoglobulin and plasma exchange are the two
 * disease-modifying treatments, equally effective and never routinely
 * combined; corticosteroids do not hasten recovery here (unlike in CIDP) and
 * are graded harmful below because a course exposes the patient to steroid
 * side effects and can delay the actual disease-modifying treatment for no
 * benefit; succinylcholine is a genuine hazard in denervated muscle
 * (life-threatening hyperkalaemia) and a non-depolarising agent is used
 * instead if intubation is needed; and autonomic instability (labile blood
 * pressure, arrhythmia risk) needs continuous monitoring and cautious,
 * short-acting treatment rather than a long-acting antihypertensive.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "Guillain" and "Barr(é)" — the two content words Test Suite 14 extracts
 * from conditionName — describing the illness instead as an ascending
 * weakness / a polyneuropathy without naming it.
 */
export const SCAFFOLD_GBS: CaseScaffold = {
  id: 'scaffold_gbs',
  title: 'Rapidly Progressive Ascending Weakness in Both Legs',
  conditionName: 'Guillain-Barré Syndrome',
  subject: 'Medicine',
  system: 'Neurology',
  demographics: {
    name: 'Arvind Kumar',
    age: 29,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 29-year-old schoolteacher is admitted with four days of tingling in his fingertips and toes followed by weakness that began in both feet and has climbed upward over the last two days to involve his thighs and, since this morning, his hands — he now struggles to stand from a chair or grip a cup without spilling it. About two weeks before the weakness began he had four days of watery diarrhoea that settled on its own without any medical treatment. His family says his voice has sounded softer since this morning and he has been coughing weakly after sips of water. He denies any back pain, and there is no bladder or bowel disturbance and no history of trauma.',
  initialVitals: {
    hr: 102,
    bp: '138/90',
    rr: 20,
    spo2: 97,
    temp: '37.1°C',
    grbs: 98,
  },
  clinchingClue:
    'CSF analysis returns with a normal cell count but a markedly raised protein — albuminocytological dissociation — and nerve conduction studies show a demyelinating pattern with prolonged distal latencies, conduction block and prolonged F-waves in keeping with involvement of the proximal nerve roots; together with his symmetric, ascending, areflexic weakness and preceding diarrhoeal illness, this confirms the clinical impression that was already strong enough to start treatment on before either result returned.',
  clinchingClueTimeMinutes: 150,
  examFindingsMap: {
    general:
      'Alert, cooperative and fully oriented, speaking in a noticeably softer voice than his family describes as normal; mild bilateral facial weakness with difficulty puffing out both cheeks fully; no ptosis, no drooling, no double vision.',
    cvs: 'Tachycardic, regular rhythm, blood pressure noted to vary meaningfully between readings taken only minutes apart; normal heart sounds, warm peripheries with a normal capillary refill.',
    chest:
      'Mildly tachypnoeic with slightly reduced bilateral chest expansion on inspection; air entry equal, no crepitations or wheeze; his voice noticeably trails off partway through counting aloud in one breath.',
    abdomen: 'Soft, non-tender, normal bowel sounds, no organomegaly, no palpable bladder.',
    cns:
      'Symmetric flaccid weakness, worse proximally than distally in the legs (hip flexion and knee extension 3/5 bilaterally) with milder weakness in the hands (grip 4/5 bilaterally); all deep tendon reflexes — biceps, triceps, knee and ankle — are absent bilaterally; plantar responses are mute bilaterally; sensory examination shows only mild glove-and-stocking paraesthesia, with pinprick and joint-position sense otherwise preserved and no sensory level found anywhere on the trunk; cranial nerve exam shows the bilateral facial weakness noted above with no ophthalmoplegia, no ptosis and normal eye movements; higher mental function, speech content and cognition are entirely normal throughout.',
  },
  historyMap: {
    presenting:
      'Tingling in the fingertips and toes began four days ago, followed within a day by weakness starting in both feet and climbing upward to the thighs and, since this morning, the hands.',
    antecedent:
      'About two weeks before this weakness began he had four days of watery diarrhoea with mild cramping that settled on its own; no antibiotics were taken and no medical attention was sought at the time.',
    past: 'No known diabetes, hypertension or prior neurological illness; no previous episode of weakness.',
    medications: 'No regular medications; no vaccination in the preceding months.',
    allergies: 'No known drug allergies.',
    family: 'Non-contributory; no similar illness reported in the family.',
    social: 'Non-smoker; drinks alcohol only occasionally at social events; works as a school teacher; no recent travel.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 14.1 g/dL (Reference 13.0–17.0 g/dL), WBC 8,200/mcL (Reference 4,000–11,000/mcL), Platelets 2.6 lakh/mcL (Reference 1.5–4.5 lakh/mcL) — entirely normal, with nothing to suggest an ongoing infective or haematological process.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    esr_crp: {
      aliases: ['esr & crp', 'esr', 'crp', 'esr crp', 'erythrocyte sedimentation rate', 'c-reactive protein'],
      resultText:
        'ESR 10 mm/hr (Reference <15 mm/hr), CRP 4 mg/L (Reference <10 mg/L) — both normal.',
      turnaroundMinutes: 45,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A normal ESR and CRP neither support nor exclude what is happening here: the process driving this weakness is immune-mediated rather than an active infection or inflammation of the kind these markers detect, so a normal result today should not be read as reassuring and must not be allowed to delay definitive testing or treatment.',
    },
    serum_electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'serum electrolytes', 'electrolytes', 'serum potassium', 'serum calcium magnesium'],
      resultText:
        'Serum Electrolytes: Sodium 138 mEq/L, Potassium 4.1 mEq/L, Chloride 101 mEq/L (all within reference range); Serum Calcium 9.2 mg/dL and Serum Magnesium 2.0 mg/dL — both normal, making an electrolyte-driven cause of this weakness (such as a periodic paralysis from a low or high potassium) unlikely.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    csf_analysis: {
      aliases: ['lumbar puncture', 'csf analysis', 'lp', 'spinal tap', 'csf study', 'csf examination'],
      resultText:
        'CSF Analysis: Opening pressure 14 cmH2O (normal), White Cell Count 2 cells/mm3 (Reference 0–5 cells/mm3, all lymphocytes), Protein 118 mg/dL (Reference 15–45 mg/dL, markedly elevated), Glucose 62 mg/dL with a paired serum glucose of 96 mg/dL — a normal cell count with a disproportionately raised protein (albuminocytological dissociation), the classic CSF signature of this illness. Note that this dissociation can genuinely still be absent if the tap is done within the first week of symptoms, so a normal CSF result this early does not exclude the diagnosis.',
      turnaroundMinutes: 90,
      category: 'procedures',
      isIndicative: true,
    },
    nerve_conduction_studies: {
      aliases: ['nerve conduction studies', 'ncs', 'nerve conduction study', 'electromyography', 'emg ncs'],
      resultText:
        'Nerve Conduction Studies: Reduced motor conduction velocities with prolonged distal motor latencies and conduction block in multiple nerves; sural sensory responses are relatively preserved compared with the more affected motor responses; F-wave latencies are prolonged, indicating the proximal nerve roots are also involved — a demyelinating pattern in keeping with an acute polyradiculoneuropathy.',
      turnaroundMinutes: 120,
      category: 'procedures',
      isIndicative: true,
    },
    mri_spine_contrast: {
      aliases: ['mri whole spine with contrast', 'mri spine', 'mri spine contrast', 'mri whole spine'],
      resultText:
        'MRI Whole Spine with Contrast: Cord signal and calibre normal throughout, with no compressive lesion, epidural collection or disc pathology; mild smooth enhancement of the cauda equina nerve roots is noted, a recognised but non-specific accompanying feature.',
      turnaroundMinutes: 90,
      category: 'imaging',
      isIndicative: true,
    },
    abg: {
      aliases: ['abg', 'arterial blood gas'],
      resultText:
        'Arterial Blood Gas: pH 7.42, pCO2 38 mmHg, pO2 89 mmHg, HCO3 24 mmol/L on room air — entirely normal today. A normal, or even low, pCO2 does not rule out significant respiratory muscle weakness: carbon dioxide retention is a very late finding in a neuromuscular cause of respiratory failure. Waiting for the blood gas to turn abnormal before escalating is a recognised trap — the decision to plan ventilatory support must rest on the trend in vital capacity and the clinical signs of fatigue, not on a reassuring-looking gas.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    ecg: {
      aliases: ['12-lead ecg', 'ecg', '12 lead electrocardiogram', 'electrocardiogram', 'lead ecg'],
      resultText:
        'ECG: Sinus tachycardia at 104/min with occasional ventricular ectopic beats; no ST-T changes; QTc within normal limits — worth trending given the autonomic instability this illness can produce.',
      turnaroundMinutes: 15,
      category: 'monitoring',
      isIndicative: true,
    },
    single_breath_count_fvc: {
      aliases: ['single breath count', 'bedside spirometry', 'fvc measurement', 'forced vital capacity', 'serial fvc monitoring', 'single breath count fvc'],
      resultText:
        'Single-breath count: he can count aloud to only 16 in one breath (a count above 25 is reassuring). Bedside spirometry confirms Forced Vital Capacity 17 mL/kg. The widely used "20/30/40" rule (FVC below 20 mL/kg, maximum inspiratory pressure below 30 cmH2O, or maximum expiratory pressure below 40 cmH2O) flags impending ventilatory failure and is the traditional trigger to plan elective, controlled intubation before an emergency one is forced; some more recent series suggest an even lower FVC cut-off nearer 10 mL/kg, so the trend on repeated measurement and the whole clinical picture — weak cough, breathless while counting, bulbar involvement — matter more than any single number in isolation. This must be repeated every few hours, not checked once and filed away.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    stool_culture: {
      aliases: ['stool culture', 'stool routine & culture', 'stool routine culture', 'stool examination'],
      resultText:
        'Stool Culture: Campylobacter jejuni isolated, consistent with the diarrhoeal illness two weeks before this weakness began. This confirms a likely antecedent trigger but does not change today\'s management — treating an already-resolved diarrhoeal illness now offers no benefit, and antibiotic therapy for it does not alter the course of the neurological illness that has followed.',
      turnaroundMinutes: 180,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A positive stool culture at this point only confirms a preceding trigger; it does not confirm or change management of the current neurological illness, and treating a diarrhoeal illness that has already resolved on its own offers him no benefit today.',
    },
    anti_ganglioside_ab: {
      aliases: ['anti-ganglioside antibodies', 'anti ganglioside antibody', 'gq1b antibody', 'ganglioside antibody panel'],
      resultText: 'Anti-Ganglioside Antibody Panel: GQ1b antibody negative; GM1 antibody pending send-out reference lab report.',
      turnaroundMinutes: 240,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'GQ1b antibody testing is mainly useful for the Miller Fisher variant, which presents with eye-movement paralysis, unsteady gait and areflexia — none of which are present here. Sending it in a typical case like this one adds cost and a long turnaround without changing what is done for him.',
    },
    ct_brain: {
      aliases: ['ct brain plain', 'ct head', 'ct brain', 'ct head plain'],
      resultText: 'CT Brain (plain): No acute infarct, haemorrhage or mass lesion; ventricles and sulci normal for age.',
      turnaroundMinutes: 45,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A symmetric, ascending weakness with preserved higher mental function and no facial droop does not localise to the brain, so brain imaging was never going to confirm or exclude what is going on here — it is reasonable early when the picture is still unclear, but a normal scan changes nothing once the peripheral, symmetric pattern is recognised.',
    },
    chest_xray: {
      aliases: ['chest x-ray pa', 'chest xray', 'cxr', 'chest x ray', 'cxr pa'],
      resultText:
        'Chest X-ray PA: Lung fields clear, no infiltrate or effusion; a small calcified granuloma is incidentally noted in the right upper lobe, consistent with old, healed tuberculosis and of no current clinical significance; heart size normal.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A chest X-ray is a reasonable baseline before any anaesthetic or ventilatory step, but it does not help make or exclude this diagnosis. The granuloma noted here is an old, unrelated finding.',
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'access', 'iv two wide bore cannulae', 'two wide bore cannulae'],
      responseText: 'Two IV cannulae secured for fluids, immunotherapy and any medication that may be needed.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is needed before intravenous immunoglobulin or plasma exchange can proceed and should be one of the first things secured.',
    },
    cardiac_monitoring: {
      aliases: ['continuous cardiac monitoring', 'cardiac monitoring', 'continuous ecg monitoring', 'continuous blood pressure monitoring', 'continuous cardiac and bp monitoring'],
      responseText: 'Continuous cardiac and blood pressure monitoring commenced.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale:
        'Autonomic instability is common in this illness and can swing blood pressure and heart rate in either direction within minutes; continuous monitoring is what lets that be caught and managed safely rather than discovered too late, and should run throughout the admission.',
    },
    single_breath_count_order: {
      aliases: ['start serial single breath count monitoring', 'begin serial fvc monitoring', 'order serial spirometry every 4 hours'],
      responseText: 'Serial single-breath count and bedside spirometry started, repeated every few hours and charted as a trend rather than a one-off value.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale:
        'The trend in vital capacity, not any single number and not the blood gas, is what actually predicts respiratory failure here — starting serial measurement immediately is what allows falling capacity to be caught and acted on before a crisis forces an emergency intubation.',
    },
    ivig: {
      aliases: ['ivig', 'iv immunoglobulin', 'intravenous immunoglobulin', 'inj ivig'],
      responseText: 'Intravenous immunoglobulin started at 0.4 g/kg/day, planned for a total of five days (total dose 2 g/kg).',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale:
        'IVIG at 0.4 g/kg/day for five days is one of the two proven disease-modifying treatments here, equally effective as plasma exchange, and works best started early in the illness rather than delayed until every supportive test result is back.',
    },
    plasma_exchange: {
      aliases: ['plasma exchange', 'plex', 'plasmapheresis', 'therapeutic plasma exchange'],
      responseText: 'A course of plasma exchange is started (typically four to six exchanges over one to two weeks).',
      onsetMinutes: 60,
      vitalsEffect: { hr: 4, bp: '128/82' },
      appropriateness: 'indicated',
      rationale:
        'Plasma exchange is the other proven disease-modifying treatment, equally effective as IVIG; the two are never routinely combined together since combining them has not been shown to add benefit over either alone.',
      requiresFirst: ['cardiac_monitoring'],
      harmfulSequenceResponseText:
        'Plasma exchange is started before continuous cardiac and blood pressure monitoring is in place; midway through the exchange he becomes acutely hypotensive and the run has to be paused.',
      harmfulSequenceVitalsEffect: { hr: 16, bp: '86/54' },
      harmfulSequenceRationale:
        'Plasma exchange involves large, rapid intravascular fluid shifts through a central line, which is poorly tolerated in a patient whose autonomic reflexes are already unreliable — without continuous monitoring already running, a dangerous swing in blood pressure or a new arrhythmia during the exchange can go unnoticed until it is severe. Monitoring must be established first, not started reactively once something goes wrong.',
    },
    corticosteroids: {
      aliases: ['iv methylprednisolone', 'corticosteroids', 'oral prednisolone', 'iv steroids', 'steroids'],
      responseText: 'A course of intravenous corticosteroids is given in addition to supportive care.',
      onsetMinutes: 30,
      appropriateness: 'harmful',
      rationale:
        'Unlike in a chronic demyelinating polyneuropathy, corticosteroids given alone have not been shown to hasten recovery or improve long-term outcome in this acute illness, and a pooled analysis of trials found no meaningful benefit. Giving a course anyway exposes him to steroid side effects (hyperglycaemia, mood change, infection risk) for no proven gain, and can delay attention and resources going to the treatment that actually works.',
    },
    succinylcholine_rsi: {
      aliases: ['succinylcholine iv', 'succinylcholine', 'suxamethonium', 'iv succinylcholine for intubation'],
      responseText: 'Succinylcholine is given as the muscle relaxant for a rapid sequence intubation.',
      onsetMinutes: 5,
      vitalsEffect: { hr: 20 },
      appropriateness: 'harmful',
      rationale:
        'Widespread denervation in this illness causes extrajunctional acetylcholine receptors to proliferate over the muscle membrane; succinylcholine acting on this abnormally expanded receptor population can trigger a sudden, massive efflux of potassium and a life-threatening hyperkalaemic cardiac arrest. A non-depolarising agent (such as rocuronium) is used instead whenever intubation is needed in this illness.',
    },
    ventilatory_support: {
      aliases: ['elective intubation', 'mechanical ventilation', 'ventilatory support', 'invasive ventilation', 'shift to icu for ventilation', 'non-invasive ventilation trial'],
      responseText: 'Elective, controlled intubation and mechanical ventilatory support are arranged before he tires further, with transfer to a monitored ICU bed.',
      onsetMinutes: 20,
      vitalsEffect: { spo2: 3, rr: -4, hr: -6 },
      appropriateness: 'indicated',
      rationale:
        'Planned, elective ventilatory support ahead of frank respiratory arrest is the entire point of serial vital-capacity monitoring — waiting for a crisis converts a controlled procedure into an emergency one with a much higher complication rate.',
    },
    dvt_prophylaxis: {
      aliases: ['lmwh prophylaxis', 'subcutaneous heparin prophylaxis', 'dvt prophylaxis', 'venous thromboembolism prophylaxis', 'compression stockings'],
      responseText: 'Pharmacological VTE prophylaxis with low-molecular-weight heparin, plus compression stockings, is started.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale:
        'A largely immobile, flaccidly paralysed patient carries a substantial venous thromboembolism risk; prophylaxis should be started as soon as any active bleeding risk has been excluded and continued through the immobile period.',
    },
    physiotherapy_rom: {
      aliases: ['passive limb physiotherapy', 'physiotherapy', 'passive range of motion exercises', 'chest physiotherapy'],
      responseText: 'Passive range-of-motion physiotherapy and regular position changes are started from the outset, alongside chest physiotherapy.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale:
        'Early, regular passive physiotherapy prevents contractures and pressure injury during a paralysis that can take weeks to resolve, and starting it from the beginning of the illness — not once movement starts returning — gives the best functional recovery.',
    },
    neuropathic_pain_control: {
      aliases: ['gabapentin', 'oral gabapentin', 'neuropathic pain control', 'carbamazepine for pain'],
      responseText: 'Gabapentin is started for the significant neuropathic pain that often accompanies this illness.',
      onsetMinutes: 120,
      appropriateness: 'indicated',
      rationale:
        'Neuropathic pain is common and often underestimated in this illness; gabapentin or carbamazepine gives useful relief, while opioids are used only cautiously given the risk of worsening any autonomic or respiratory compromise already present.',
    },
    neurology_consult: {
      aliases: ['neurology consult', 'neurology referral'],
      responseText: 'Neurology consult requested to guide immunotherapy choice, monitor progression and plan rehabilitation.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Early specialist involvement helps choose and time the disease-modifying treatment correctly and plan the rehabilitation pathway from the outset.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /single breath count|bedside spirometry|fvc/i,
      name: 'Serial FVC / Single-Breath Count Monitoring Started',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /ivig|iv immunoglobulin|intravenous immunoglobulin|plasma exchange|plasmapheresis|plex/i,
      name: 'Disease-Modifying Treatment Started (IVIG or Plasma Exchange)',
      targetMilestoneMinutes: 240,
    },
    {
      orderOrActionPattern: /elective intubation|mechanical ventilation|ventilatory support|invasive ventilation|shift to icu for ventilation/i,
      name: 'Timely Ventilatory Support Before Crisis',
      targetMilestoneMinutes: 480,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_gbs_1',
      title: 'Incidental Calcified Granuloma on Chest X-ray',
      description: 'The chest X-ray obtained as a pre-anaesthetic and respiratory baseline incidentally shows a small calcified granuloma in the right upper lobe, consistent with old healed tuberculosis.',
      correctAction: 'No action needed; document the finding — a small calcified granuloma from prior healed disease requires no further workup or treatment.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext:
        'A young man with rapidly progressive weakness climbing from his feet up to his hands over two days, softening of his voice, and a weak cough is admitted to the ward.',
      consequenceOnRight:
        'IV access is secured, continuous cardiac and blood pressure monitoring is started, and serial bedside spirometry and single-breath counts begin immediately rather than being left for the next round.',
      consequenceOnWrong:
        'Monitoring is deferred while routine blood tests are awaited, and an early warning sign of worsening breathing strength is missed until he is already struggling.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext:
        'A young man has symmetric weakness climbing upward, tingling in his fingers and toes, and universally absent reflexes, two weeks after a short bout of diarrhoea; a spinal fluid study and a nerve study of electrical conduction are being considered to support the clinical picture.',
      consequenceOnRight:
        'The diagnosis is made clinically from the pattern of ascending, symmetric weakness with absent reflexes and no sensory level, and treatment is not held up waiting for the spinal fluid or nerve conduction results once that clinical picture is already convincing.',
      consequenceOnWrong:
        'Treatment is delayed until both send-out results return, or a normal spinal fluid study taken this early in the illness is wrongly used to rule the diagnosis out altogether.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The team must choose between the two disease-modifying treatments available and decide whether a corticosteroid should be added on top.',
      consequenceOnRight:
        'Either intravenous immunoglobulin or plasma exchange is started promptly as the definitive treatment, while a corticosteroid is correctly withheld since it has not been shown to speed recovery in this illness.',
      consequenceOnWrong:
        'A course of corticosteroids is given instead of, or alongside, the definitive treatment, exposing him to their side effects while not accelerating his recovery, and delaying the treatment that actually works.',
    },
    {
      roleTag: 'PHARM',
      patientContext:
        'With his weak cough and softening voice raising concern about his ability to protect his airway, a controlled intubation is planned and the choice of muscle relaxant is discussed.',
      consequenceOnRight:
        'A non-depolarising muscle relaxant is chosen and succinylcholine is specifically avoided, given the danger it carries in a patient with this much denervated muscle.',
      consequenceOnWrong:
        'Succinylcholine is used for the intubation, risking a sudden and dangerous rise in blood potassium from the widespread denervation already present.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext:
        'Over the following hours his blood pressure is noted swinging between high and low readings taken only minutes apart, with no new medication having been given.',
      consequenceOnRight:
        'This is recognised as autonomic instability from the illness itself; continuous monitoring continues, a short-acting agent is used cautiously only for an extreme and sustained swing, and a long-acting blood pressure medication is avoided.',
      consequenceOnWrong:
        'A long-acting antihypertensive is given for one high reading, and he then swings into a profound, hard-to-reverse low blood pressure that a short-acting, cautious approach would have avoided.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext:
        'As the acute weakness plateaus, the team discusses what should be arranged for him given how immobile the paralysis has left him.',
      consequenceOnRight:
        'Pharmacological clot prevention, regular passive physiotherapy, pressure-area care, neuropathic pain control and an early referral for structured rehabilitation are all arranged, since recovery is often slow and early physiotherapy improves the eventual outcome.',
      consequenceOnWrong:
        'He is left immobile without clot prevention or physiotherapy while everyone waits for the weakness to start improving on its own, needlessly adding the risk of a preventable clot or a pressure injury on top of the neurological illness.',
    },
  ],
};
