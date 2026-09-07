import { CaseScaffold } from '../../types';

/**
 * A sudden focal neurological deficit whose cause is bleeding into the
 * brain, not a clot — the deliberate mirror image of
 * src/data/cases/ischemicStroke.ts. Read that file first: this case exists
 * to teach the CONTRAST between the two, not to repeat it.
 *
 * The teaching point this case is built around is the same first step as
 * the ischaemic case for a different reason: a non-contrast CT head before
 * anything else is what actually tells the two apart, since a clot and a
 * bleed are clinically indistinguishable at the bedside. Once the scan
 * shows blood, everything the ischaemic case treats as urgent and
 * indicated inverts — thrombolysis, antiplatelets and anticoagulation are
 * all catastrophic here rather than beneficial, and are modelled
 * `harmful` with their own honest rationale rather than merely omitted.
 * This case instead teaches: a controlled blood-pressure target (systolic
 * 130–150 mmHg, using a titratable agent, avoiding a fall below 130 which
 * the evidence shows is not protective and may itself be harmful);
 * reversing anticoagulation promptly when the patient is found to be on
 * one (this patient is on warfarin for a mechanical valve, so 4-factor
 * prothrombin complex concentrate plus vitamin K is the modelled reversal,
 * deliberately different from the anticoagulation-related teaching point
 * in the ischaemic case, which is about withholding an antiplatelet, not
 * reversing an anticoagulant already on board); and neurosurgical referral
 * criteria — a large lobar or basal ganglia bleed with a deteriorating
 * conscious level, or any cerebellar bleed above 3 cm or with brainstem
 * compression or hydrocephalus, referred for evacuation rather than
 * managed medically alone.
 *
 * conditionName is "Spontaneous Intracerebral Haemorrhage" — the opening
 * vignette and every gate's patientContext avoid the words "spontaneous",
 * "intracerebral" and "haemorrhage" (its content words), and also avoid
 * "stroke" and "bleed" even though the validator does not force it, so the
 * case does not hand the candidate the category of illness before the scan
 * does.
 */
export const SCAFFOLD_HAEMORRHAGIC_STROKE: CaseScaffold = {
  id: 'scaffold_haemorrhagic_stroke',
  title: 'Sudden Severe Headache with One-Sided Weakness',
  conditionName: 'Spontaneous Intracerebral Haemorrhage',
  subject: 'Medicine',
  system: 'Neurology',
  demographics: {
    name: 'Kamala Devi',
    age: 62,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'A 62-year-old woman is brought to the emergency department thirty minutes after she suddenly clutched her head, complaining of the worst headache of her life, and vomited twice before her family noticed her right side had gone weak and her speech had become slurred. She was last known completely well over breakfast about forty-five minutes before that. She has a long history of poorly controlled high blood pressure and underwent a mechanical heart valve replacement eight years ago, for which she takes a blood-thinning tablet daily. On arrival she is drowsy but rousable to voice.',
  initialVitals: {
    hr: 96,
    bp: '208/118',
    rr: 20,
    spo2: 95,
    temp: '37.1°C',
    grbs: 132,
  },
  clinchingClue:
    'An urgent non-contrast CT head, done before anything else, shows a 35 mL hyperdense collection in the left basal ganglia with a small amount of surrounding oedema and mild midline shift, without extension into the ventricles — imaging, not the clinical picture, is what actually separates a bleed from a clot, and it is why nothing that helps a clot is given here.',
  clinchingClueTimeMinutes: 20,
  examFindingsMap: {
    general: 'Drowsy, rousable to voice, oriented to person only, no neck stiffness, no rash.',
    cvs: 'Regular rhythm, a soft mechanical valve click audible on auscultation, no murmur, warm peripheries.',
    chest: 'Clear bilaterally, no crepitations, no wheeze.',
    abdomen: 'Soft, non-tender, no organomegaly, bowel sounds normal.',
    cns: 'GCS 13/15 (E3 V4 M6). Right upper motor neuron facial droop. Right arm power 2/5, right leg power 3/5. Left side power 5/5 throughout. Slurred, effortful speech but comprehension appears intact. Plantar upgoing on the right, downgoing on the left. Pupils 3 mm bilaterally, both reacting to light. No papilloedema on fundoscopy at this stage.',
  },
  historyMap: {
    onset: 'Sudden onset of severe headache and vomiting followed within minutes by right-sided weakness and slurred speech; last seen entirely well over breakfast about forty-five minutes before the event was noticed.',
    past: 'Poorly controlled hypertension for over 15 years by her own family\'s account, frequently missing follow-up. Underwent mechanical mitral valve replacement eight years ago. No known diabetes. No prior similar episode. No recent head injury.',
    medications: 'Warfarin daily for the mechanical valve, dose and last INR unknown to the family; amlodipine, taken irregularly.',
    allergies: 'No known drug allergies.',
    family: 'Mother had high blood pressure; no known family history of a clotting or bleeding disorder.',
    social: 'Non-smoker, does not drink alcohol; lives with her son\'s family.',
  },
  investigationsMap: {
    capillary_glucose: {
      aliases: ['rbs / grbs', 'grbs', 'capillary blood glucose', 'random blood sugar', 'rbs random blood sugar'],
      resultText: 'Capillary (bedside) Glucose: 132 mg/dL (Reference 70–140 mg/dL) — normal, ruling out hypoglycaemia as a cause of her presentation.',
      turnaroundMinutes: 2,
      category: 'labs',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText: 'CBC: Hb 12.6 g/dL (Reference 12.0–15.0 g/dL), WBC 9,400/mcL (Reference 4,000–11,000/mcL), Platelets 228,000/mcL (Reference 150,000–450,000/mcL) — platelet count is adequate and not itself a bleeding risk here.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    coag_profile: {
      aliases: ['pt / inr', 'coagulation profile', 'inr'],
      resultText: 'PT/INR: PT 34 sec (Reference 11–13.5 sec), INR 4.6 (Reference 0.8–1.1 for someone not on treatment; her own target range for a mechanical valve is roughly 2.5–3.5) — markedly supratherapeutic, and on its own enough to explain why a small vessel bleed has become a sizeable one.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    aptt: {
      aliases: ['aptt'],
      resultText: 'aPTT: 31 sec (Reference 25–35 sec) — normal; the coagulopathy here is isolated to the extrinsic/common pathway, in keeping with a vitamin K antagonist effect rather than a heparin effect.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText: 'Serum Electrolytes: Na 137 mEq/L (Reference 135–145 mEq/L), K 4.0 mEq/L (Reference 3.5–5.0 mEq/L), Cl 100 mEq/L (Reference 98–107 mEq/L) — normal, no metabolic derangement contributing to her presentation.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests'],
      resultText: 'Renal Function: Blood Urea 30 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.9 mg/dL (Reference 0.6–1.2 mg/dL) — normal, adequate for standard drug dosing.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    ecg: {
      aliases: ['12-lead ecg', 'ecg', '12 lead electrocardiogram', 'electrocardiogram', 'lead ecg'],
      resultText: '12-Lead ECG: Normal sinus rhythm at 96/min, no acute ischaemic changes — the mechanical valve alone, not an arrhythmia, is the reason she is anticoagulated.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    echo: {
      aliases: ['formal 2d echo', '2d echo'],
      resultText: '2D ECHO: Mechanical mitral valve prosthesis in situ with normal function on this study, no vegetation, ejection fraction 58% — confirms the reason for her anticoagulation but does not change today\'s acute management.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'Useful to document valve function for the cardiology and cardiac surgery teams once she is stable, but it adds nothing to the acute decisions being made right now, which are already driven by the CT and the INR.',
    },
    repeat_ct_head: {
      aliases: ['repeat ct head', 'follow-up ct head', 'repeat non-contrast ct head'],
      resultText: 'Repeat Non-Contrast CT Head (6 hours later): The collection is stable in size at 36 mL with no new bleeding and no increase in midline shift — reassuring, and used here to confirm the bleed has not expanded now that her INR has been corrected, not to look for anything new.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture', 'blood culture x2'],
      resultText: 'Blood Culture: No growth after 48 hours. There was no fever or clinical suspicion of infection to justify sending this at the time.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A blood culture has no role in this presentation; the priorities are the scan, the coagulation profile and blood pressure control, and this order only spends time without changing anything.',
    },
  },
  therapiesMap: {
    ct_head_noncontrast: {
      aliases: ['ct head plain', 'non-contrast ct head', 'ncct head', 'ct head', 'ct brain', 'plain ct head', 'ct scan head', 'urgent ct head'],
      responseText: 'Urgent non-contrast CT head performed and reported: a 35 mL hyperdense collection in the left basal ganglia with mild surrounding oedema and mild midline shift, no intraventricular extension — bleeding confirmed, which rules out any drug used to dissolve a clot and instead sets today\'s priorities as reversing her anticoagulation and controlling her blood pressure.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'A non-contrast CT head is the mandatory first step in any sudden focal deficit — it takes only minutes and is the only way to tell a bleed from a clot at the bedside, since the two look identical clinically but are managed in exactly opposite ways.',
    },
    thrombolysis_iv: {
      aliases: ['thrombolysis', 'thrombolyse', 'iv thrombolysis', 'give thrombolysis', 'tenecteplase', 'alteplase', 'tenecteplase (thrombolysis)', 'alteplase (rtpa) iv', 'alteplase rtpa', 'iv alteplase rtpa', 'iv tenecteplase'],
      responseText: 'Intravenous thrombolysis is given for the presumed clot before the scan is reviewed. Within minutes her headache worsens sharply, her level of consciousness drops further and repeat imaging shows the collection has roughly doubled in size with new midline shift.',
      onsetMinutes: 15,
      vitalsEffect: { hr: 18, bp: '224/126', spo2: -6 },
      appropriateness: 'harmful',
      rationale: 'Thrombolysis dissolves clots — given to a patient who is actually bleeding into the brain, and who is already markedly over-anticoagulated on top of that, it can only make the bleeding dramatically worse. It is an absolute contraindication here, not a relative one, which is exactly why the scan must be seen before it is ever considered.',
    },
    aspirin_immediate: {
      aliases: ['aspirin 325 mg chewed', 'aspirin chewed', 'aspirin'],
      responseText: 'Aspirin 325 mg is given by mouth for the presumed clot.',
      onsetMinutes: 10,
      vitalsEffect: { hr: 4 },
      appropriateness: 'harmful',
      rationale: 'An antiplatelet drug impairs clot formation at exactly the site that most needs to form a clot right now. Giving it here adds to an already dangerous coagulopathy and has no role once the scan shows blood rather than a blocked vessel.',
    },
    heparin_iv: {
      aliases: ['unfractionated heparin bolus', 'unfractionated heparin', 'heparin'],
      responseText: 'An unfractionated heparin bolus is given, reasoning that her valve needs uninterrupted anticoagulation.',
      onsetMinutes: 10,
      vitalsEffect: { hr: 10, bp: '214/120' },
      appropriateness: 'harmful',
      rationale: 'She is already dangerously over-anticoagulated with active bleeding into the brain; adding a second anticoagulant on top of an INR of 4.6 can only worsen the bleed. Her mechanical valve is a real long-term concern, but it is addressed once the bleeding is controlled and reversed, never by anticoagulating further in the acute phase.',
    },
    reverse_anticoagulation: {
      aliases: ['4-factor pcc', 'prothrombin complex concentrate', 'reverse anticoagulation', 'inj vitamin k', 'vitamin k iv', 'pcc and vitamin k'],
      responseText: 'Four-factor prothrombin complex concentrate is given intravenously along with intravenous vitamin K; a repeat INR shortly afterwards has fallen to 1.3.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -6 },
      labShift: {
        coag_profile: 'PT/INR (repeat, post-reversal): PT 14.2 sec (Reference 11–13.5 sec), INR 1.3 — corrected from 4.6, removing the coagulopathy that was allowing the bleed to enlarge.',
      },
      appropriateness: 'indicated',
      rationale: 'A markedly supratherapeutic INR on a vitamin K antagonist is a directly reversible cause of an enlarging bleed. Four-factor PCC corrects the deficient clotting factors within minutes, and intravenous vitamin K is given alongside it because PCC\'s effect wears off in hours while vitamin K sustains the correction — reversal is a genuine emergency here, not something to defer until the valve team is available.',
    },
    bp_control_labetalol: {
      aliases: ['labetalol iv', 'iv labetalol', 'labetalol'],
      responseText: 'Labetalol is given intravenously and titrated; her blood pressure eases in a controlled, gradual fashion toward the target range.',
      onsetMinutes: 15,
      vitalsEffect: { bp: '146/88', hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Current guidance targets a systolic pressure of roughly 130–150 mmHg using a titratable intravenous agent, reached within about an hour of presentation — controlled lowering to this range is safe and may improve outcome, whereas pushing the systolic below 130 has not been shown to help and may itself be harmful by reducing pressure to the brain tissue around the bleed.',
    },
    nifedipine_oral: {
      aliases: ['nifedipine oral', 'nifedipine'],
      responseText: 'Oral nifedipine is given for the very high blood pressure reading.',
      onsetMinutes: 15,
      vitalsEffect: { bp: '112/68', hr: 12 },
      appropriateness: 'harmful',
      rationale: 'Fast-acting oral nifedipine produces a steep, unpredictable drop rather than the controlled, titrated reduction this situation calls for — overshooting below the 130 mmHg systolic floor is now understood not to help and may worsen the outcome by dropping perfusion pressure around already-injured brain tissue.',
    },
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv two wide bore cannulae', 'two wide bore cannulae'],
      responseText: 'Two wide-bore IV cannulae are secured for bloods, reversal agents and blood pressure medication.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable venous access is needed immediately so that the time-critical steps — sending coagulation studies, giving reversal agents and starting blood pressure control — are never held up waiting for a line.',
    },
    neurosurgery_referral: {
      aliases: ['neurosurgery consult', 'neurosurgical referral', 'refer neurosurgery'],
      responseText: 'A neurosurgical referral is made once the collection and her conscious level are known; the on-call team reviews the scan and elects for continued close medical management for now given the location and her current stable GCS, with a low threshold to reassess if she deteriorates.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Every case like this should be discussed with neurosurgery even when surgery is not immediately planned. Clear indications for evacuation include a cerebellar collection larger than 3 cm or one causing brainstem compression or hydrocephalus, and a deteriorating conscious level with a large, surgically accessible lobar collection — a stable basal ganglia collection of this size in an alert-enough patient is often managed medically, but that decision belongs to neurosurgery, not to a default of never asking.',
    },
    icu_admission_monitoring: {
      aliases: ['icu admission', 'neuro icu admission', 'hourly neuro observations'],
      responseText: 'She is admitted for neuro-intensive monitoring with hourly conscious level and pupillary checks.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'The first 24 hours carry the highest risk of the collection enlarging or her conscious level dropping further, particularly while her coagulopathy is still being corrected — frequent neurological observation is what catches early deterioration in time to act on it.',
    },
    mannitol_for_raised_icp: {
      aliases: ['iv mannitol', 'mannitol'],
      responseText: 'Intravenous mannitol is held in reserve and not given at this stage, since there is no current clinical or radiological sign of dangerously raised pressure inside the skull.',
      onsetMinutes: 10,
      appropriateness: 'neutral',
      rationale: 'An osmotic agent has a role if signs of raised intracranial pressure or herniation develop, but giving it pre-emptively without those signs offers no benefit and is not part of routine management for a stable, moderate-sized collection like this one.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /ct head/i,
      name: 'Door-to-CT Imaging',
      targetMilestoneMinutes: 25,
    },
    {
      orderOrActionPattern: /4-factor pcc|prothrombin complex concentrate|reverse anticoagulation/i,
      name: 'Anticoagulation Reversal Started',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /labetalol/i,
      name: 'Blood Pressure Brought to Target',
      targetMilestoneMinutes: 60,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_ich_1',
      title: 'Incidental Pineal Gland Cyst',
      description: 'The non-contrast CT head incidentally shows a 5mm simple pineal cyst with no calcification or mass effect.',
      correctAction: 'No intervention needed; a small, simple pineal cyst is a common incidental finding requiring no follow-up.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ich_2',
      title: 'Old Silent Lacunar Infarct on CT',
      description: 'The CT head incidentally shows a small, well-defined old lacunar infarct in the right centrum semiovale, unrelated to today\'s presentation.',
      correctAction: 'Note in the record as a chronic finding consistent with her long-standing hypertension; it does not change today\'s acute management.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ich_3',
      title: 'Family Unaware of Her Actual Anticoagulation Target',
      description: 'The family knows she takes "a blood-thinning tablet" for her valve but cannot say her target INR range or when it was last checked.',
      correctAction: 'Flag poor anticoagulation monitoring as a system issue to address with cardiology once she is stable, alongside deciding how her valve will be protected once reversal is complete.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A 62-year-old woman arrives thirty minutes after suddenly clutching her head with the worst headache of her life, vomiting, and then developing right-sided weakness and slurred speech, last known entirely well roughly forty-five minutes before that.',
      consequenceOnRight: 'An urgent non-contrast CT head is ordered immediately, before any drug aimed at a blocked vessel is even considered, since the clinical picture alone cannot tell a clot from bleeding.',
      consequenceOnWrong: 'A reperfusion drug is prepared on the assumption that this is a blocked-vessel event, without waiting to see what the scan actually shows first.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'The scan comes back showing a collection of blood within the brain tissue, and the team must decide what this means for every treatment that would otherwise be considered for a blocked vessel.',
      consequenceOnRight: 'Every drug intended to dissolve a clot or to prevent one from forming is recognised as absolutely contraindicated now that the scan shows bleeding, and the plan pivots entirely to controlling her blood pressure and correcting her clotting.',
      consequenceOnWrong: 'The scan finding is acknowledged but a reperfusion drug or an antiplatelet is given anyway "just in case it still helps," turning a manageable bleed into a rapidly enlarging one.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Her clotting studies come back markedly deranged, in keeping with the blood-thinning tablet she takes daily for her heart valve.',
      consequenceOnRight: 'Reversal is treated as an emergency in its own right: a concentrated clotting-factor product is given together with vitamin K to correct the deranged clotting as quickly as possible, rather than waiting for a specialist team to become available.',
      consequenceOnWrong: 'Reversal is delayed while a cardiology or haematology opinion is awaited, during which time the collection has every opportunity to keep enlarging on an uncorrected coagulopathy.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Her blood pressure on repeat measurement remains severely elevated, and the team must decide how aggressively, and with what, to bring it down.',
      consequenceOnRight: 'A titratable intravenous agent is used to bring the systolic pressure into a controlled target range, deliberately avoiding pushing it below that range, since going too low has not been shown to help and may itself reduce blood flow to the brain tissue around the bleed.',
      consequenceOnWrong: 'A fast-acting oral agent is used instead, producing an unpredictable and excessive fall in pressure that drops well below the intended target.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Once her clotting has been corrected and her pressure is under control, the team discusses whether this collection needs a surgical opinion at all, given that she is not currently worsening.',
      consequenceOnRight: 'A neurosurgical referral is made regardless, since the criteria for evacuation (a large, deteriorating collection in an accessible location, or any cerebellar collection above a certain size or causing pressure effects) are something the surgical team should assess directly rather than a decision made by default without them.',
      consequenceOnWrong: 'No referral is made because she currently appears stable, missing the chance for an early opinion that would catch a change in her indication for surgery before a silent deterioration is what finally forces the referral.',
    },
  ],
};
