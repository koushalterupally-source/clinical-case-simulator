import { CaseScaffold } from '../../types';

/**
 * A unilateral, worsening sore throat that has already failed a course of
 * oral antibiotics from a pharmacist, now with trismus, a muffled voice
 * and drooling. The central teaching point is that this needs drainage —
 * antibiotics alone, however carefully chosen, cannot adequately reach a
 * collection that has already walled itself off, which is why simply
 * switching the oral antibiotic and waiting is modelled as a genuinely
 * harmful therapy. A second teaching point is a real anatomical safety
 * fact rather than a vague caution: the internal carotid artery lies only
 * a short distance posterolateral to the tonsillar bed, so needle
 * aspiration or incision and drainage in an unanaesthetised, gagging
 * patient is modelled as a harmful sequence via `requiresFirst` on a
 * topical anaesthetic spray. The COMPLICATION gate exists specifically to
 * distinguish this from the case's Head & Neck sibling — a swelling that
 * stays confined to one side around the tonsil, versus the diffuse,
 * bilateral, non-fluctuant floor-of-mouth process of a spreading
 * dental-space infection, which is what actually earns the airway-first,
 * surgeon-at-the-bedside management already modelled in that other case.
 * See CASE_MODEL.md for the therapy model this scaffold follows.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "peritonsillar" and "abscess" — the two content words Test Suite 14
 * extracts from conditionName — using "the swelling", "the collection"
 * and "one-sided bulge" in their place instead.
 */
export const SCAFFOLD_PERITONSILLAR_ABSCESS: CaseScaffold = {
  id: 'scaffold_peritonsillar_abscess',
  title: 'Worsening One-Sided Sore Throat with Trismus and a Muffled Voice',
  conditionName: 'Peritonsillar Abscess',
  subject: 'ENT',
  system: 'Throat',
  demographics: {
    name: 'Anjali Rao',
    age: 24,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'A 24-year-old woman presents to the emergency department with five days of worsening sore throat, now so severe on the left side that she can barely swallow her own saliva. Over the last day her family has noticed her voice sounding thick and muffled, and this morning she found she could only open her mouth about a finger\'s width before hitting a wall of pain and stiffness in her jaw. She feels feverish and generally unwell, and has been drooling because swallowing has become so painful.',
  initialVitals: {
    hr: 112,
    bp: '112/70',
    rr: 20,
    spo2: 97,
    temp: '39.2°C',
    grbs: 102,
  },
  clinchingClue:
    'Oral cavity examination, achieved despite trismus with gentle retraction, reveals marked swelling and bulging of the soft palate and anterior tonsillar pillar on the left, pushing the uvula toward the right side of the midline, with the left tonsil displaced medially and inferiorly. The mucosa over the bulge is tense and fluctuant to gentle palpation — distinctly different from the diffusely reddened, symmetrically enlarged tonsils of simple tonsillitis, and confirmed by bedside ultrasound to be a discrete, drainable fluid collection rather than diffuse cellulitis.',
  clinchingClueTimeMinutes: 20,
  examFindingsMap: {
    general: 'Uncomfortable, sitting forward, drooling occasionally into a tissue, speaks in a muffled, "hot potato" voice; visibly limited jaw opening.',
    cvs: 'Tachycardic from fever and pain, regular rhythm, normal heart sounds.',
    chest: 'Clear bilaterally, no respiratory distress, no stridor.',
    abdomen: 'Soft, non-tender, no organomegaly.',
    cns: 'Alert and oriented, no focal neurological deficit, no neck stiffness.',
    neck: 'Mild, mobile, tender lymphadenopathy in the left upper cervical chain; no bilateral, brawny or non-fluctuant swelling of the floor of the mouth and no woody induration extending toward the hyoid — the swelling stays confined around the left tonsillar area rather than spreading diffusely into the neck on both sides.',
    oral: 'Trismus limits mouth opening to about one finger-breadth; on gentle retraction, the left soft palate and anterior tonsillar pillar bulge medially and inferiorly with the uvula pushed to the right; the bulge is tense and fluctuant to palpation; foul breath odour noted; pooling of saliva in the left tonsillar fossa.',
  },
  historyMap: {
    presenting: 'Sore throat for five days, initially treated as an ordinary throat infection, now markedly worse and localised to the left side, with new difficulty opening the mouth and a change in her voice over the last day.',
    treatment_so_far: 'Was given a course of oral amoxicillin by a local pharmacist two days ago for the same sore throat, but her symptoms have only worsened since, with new trismus and a muffled voice developing on top of the pain.',
    past: 'Recurrent tonsillitis, with two to three similar though milder throat infections most years since her teens; no known diabetes, no other chronic illness.',
    medications: 'The course of oral amoxicillin from the pharmacist, taken irregularly over the last two days; occasional over-the-counter analgesics.',
    allergies: 'No known drug allergies.',
    family: 'Non-contributory.',
    social: 'University student; non-smoker, does not drink alcohol.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText: 'CBC: Hb 12.4 g/dL (Reference 12.0–15.5 g/dL), WBC 16,800/mcL (Reference 4,000–11,000/mcL) with 82% neutrophils, Platelets 310,000/mcL (Reference 150,000–450,000/mcL) — marked neutrophilic leucocytosis consistent with an acute bacterial process.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp'],
      resultText: 'CRP: 96 mg/L (Reference <5 mg/L) — markedly elevated, in keeping with a significant acute bacterial infection.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    throat_swab_culture: {
      aliases: ['throat swab culture', 'pus culture and sensitivity', 'swab culture and sensitivity'],
      resultText: 'Throat/Pus Culture and Sensitivity: Sent before the first antibiotic dose; preliminary Gram stain shows mixed Gram-positive cocci and Gram-negative organisms, in keeping with the usual mixed aerobic-anaerobic flora of this presentation. Final culture and sensitivity expected in 48–72 hours.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    monospot_ebv: {
      aliases: ['monospot test', 'ebv serology', 'infectious mononucleosis test'],
      resultText: 'Monospot / EBV Serology: Negative.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'Infectious mononucleosis is a reasonable differential for a severe sore throat in a young adult, but it typically causes symmetric, bilateral tonsillar enlargement rather than the one-sided bulge with uvular deviation seen here — a test for it does not change what needs to happen next once a localised, fluctuant swelling has already been found on examination.',
    },
    intraoral_ultrasound: {
      aliases: ['intraoral ultrasound', 'transcutaneous neck ultrasound', 'ultrasound guided assessment of swelling'],
      resultText: 'Intraoral Ultrasound: A well-defined hypoechoic fluid collection is seen deep to the left superior tonsillar pole, distinct from surrounding solid, vascular tonsillar tissue — confirming a drainable collection rather than diffuse cellulitis, and marking a safe site and depth for needle placement away from the major vessels of the neck.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: true,
    },
    ct_neck_contrast: {
      aliases: ['ct neck with contrast', 'ct neck contrast', 'contrast ct neck'],
      resultText: 'CT Neck with Contrast: A rim-enhancing fluid collection is seen in the left tonsillar region with mild surrounding soft-tissue stranding; no extension into the deeper neck spaces, and the airway is not compromised.',
      turnaroundMinutes: 45,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A contrast scan earns its place when trismus is too severe to examine the throat adequately, when the diagnosis is genuinely unclear, or when a deeper or spreading infection is suspected. Here the oral exam and a bedside ultrasound have already shown a localised, drainable collection, so the scan mainly confirms what is already known at the cost of radiation, contrast and time.',
    },
    rbs_grbs: {
      aliases: ['rbs / grbs', 'rbs', 'grbs', 'random blood sugar', 'blood sugar', 'rbs random blood sugar'],
      resultText: 'Random Blood Sugar: 102 mg/dL — normal; a useful baseline given fever and reduced oral intake, and worth knowing since poorly controlled diabetes both predisposes to and can slow recovery from an infection like this one.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture', 'blood culture x2 before antibiotics', 'blood culture before antibiotics'],
      resultText: 'Blood Culture x2 (drawn before the first antibiotic dose): sent to the laboratory, incubating; preliminary report expected in 24–48 hours.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
  },
  therapiesMap: {
    topical_local_anesthesia: {
      aliases: ['topical lidocaine spray', 'local anesthetic spray to throat', 'lidocaine spray', 'topical anaesthetic throat spray'],
      responseText: 'Topical lidocaine spray is applied to the area over the swelling before any procedure is attempted.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'A cooperative, still patient makes needle placement far safer — the internal carotid artery lies just posterolateral to the tonsillar bed, and adequate local anaesthesia is what allows aspiration or drainage to be performed accurately and calmly rather than as a struggle.',
    },
    needle_aspiration: {
      aliases: ['needle aspiration', 'intraoral needle aspiration', 'aspiration of the abscess', 'needle aspiration of the swelling'],
      responseText: 'Needle aspiration of the collection is performed at the point of maximal bulge, directed laterally and away from the carotid sheath, yielding purulent material and immediate relief of tension in the area.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      requiresFirst: ['topical_local_anesthesia'],
      harmfulSequenceResponseText: 'Aspiration is attempted without any local anaesthesia first; she gags and moves through the procedure, making it far harder to control the needle\'s direction and depth close to the major vessels running just behind the tonsillar bed.',
      harmfulSequenceVitalsEffect: { hr: 10 },
      harmfulSequenceRationale: 'The internal carotid artery lies only a short distance posterolateral to the tonsillar bed. Attempting needle placement in an unanaesthetised, gagging, uncooperative patient removes the margin of control that keeps this a safe bedside procedure rather than a genuinely dangerous one.',
      rationale: 'Draining the collection is the step that antibiotics alone cannot achieve — needle aspiration is a simple, well-tolerated first-line technique that both confirms the diagnosis (by yielding pus) and provides immediate relief.',
    },
    incision_and_drainage: {
      aliases: ['incision and drainage', 'i&d of the abscess', 'surgical incision and drainage', 'incision and drainage of the swelling'],
      responseText: 'A small incision is made over the point of maximal bulge and the cavity is opened and drained with gentle blunt dissection, with the same care taken to stay medial and away from the carotid sheath.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -8 },
      appropriateness: 'indicated',
      rationale: 'Incision and drainage is an equally valid alternative to needle aspiration, often preferred for a larger or more loculated collection, or when aspiration alone fails to fully decompress it — either technique achieves the source control that antibiotics cannot provide on their own.',
    },
    iv_antibiotics: {
      aliases: ['amoxicillin-clavulanate iv', 'iv amoxicillin clavulanate', 'co-amoxiclav iv', 'iv antibiotics', 'clindamycin iv'],
      responseText: 'Intravenous amoxicillin-clavulanate (clindamycin substituted if there is a penicillin allergy) is started, covering the mixed aerobic-anaerobic oral flora typically responsible.',
      onsetMinutes: 60,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Antibiotics covering both typical throat streptococci and anaerobic oral flora are started alongside drainage — they treat the surrounding inflamed tissue and help prevent spread, but on their own, without drainage, they do not reliably clear a walled-off collection like this one.',
    },
    iv_fluids: {
      aliases: ['iv fluids', 'ringer lactate', 'ringer lactate bolus'],
      responseText: 'Ringer Lactate is given intravenously, given several days of reduced oral intake from pain and now trismus.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Odynophagia and trismus of this degree commonly lead to significant reduced oral intake over several days; intravenous fluids correct this while swallowing remains painful.',
    },
    iv_analgesia: {
      aliases: ['iv paracetamol', 'paracetamol iv', 'iv analgesia'],
      responseText: 'Paracetamol 1 g is given intravenously for pain and fever.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Adequate analgesia is standard supportive care and makes both examination and any drainage procedure more tolerable, though it does not address the underlying collection itself.',
    },
    iv_dexamethasone: {
      aliases: ['dexamethasone iv', 'iv dexamethasone', 'iv steroid'],
      responseText: 'A single dose of intravenous dexamethasone is given alongside the antibiotics and drainage.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'A single dose of a corticosteroid, given together with antibiotics and drainage, is a recognised adjunct that reduces pain, trismus and time to resolution — it is never used as a substitute for draining the collection or for starting antibiotics.',
    },
    tonsillectomy_acute: {
      aliases: ['acute tonsillectomy', 'abscess tonsillectomy', 'quinsy tonsillectomy'],
      responseText: 'Tonsillectomy is performed during this same acute admission rather than simple drainage alone, removing the tonsil along with the collection.',
      onsetMinutes: 90,
      vitalsEffect: { hr: -6 },
      appropriateness: 'neutral',
      rationale: 'Removing the tonsil during the acute episode is a recognised alternative to simple aspiration or incision and drainage, particularly with a strong history of recurrent tonsillitis like hers, but it is a bigger procedure with more bleeding risk in acutely inflamed tissue and is not the default first step — needle aspiration or incision and drainage plus antibiotics remains the standard first-line approach, with interval tonsillectomy considered later if there is a pattern of recurrence.',
    },
    oral_antibiotics_alone_no_drainage: {
      aliases: ['continue oral antibiotics only', 'switch oral antibiotic without drainage', 'oral antibiotics alone'],
      responseText: 'The oral antibiotic is simply switched to a different agent, and she is told to return in a few days if there is no improvement; no drainage procedure is performed.',
      onsetMinutes: 0,
      vitalsEffect: { hr: 8 },
      appropriateness: 'harmful',
      rationale: 'A walled-off collection like this will not resolve on antibiotics alone, regardless of which oral agent is chosen — antibiotics cannot adequately penetrate a collection that has already walled itself off from surrounding tissue. Withholding drainage risks progressive trismus, dehydration from worsening odynophagia, and spread of infection into the deeper neck spaces, none of which a change of oral antibiotic addresses.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /needle aspiration|incision and drainage/i,
      name: 'Drainage Performed',
      targetMilestoneMinutes: 120,
    },
    {
      orderOrActionPattern: /amoxicillin-clavulanate|co-amoxiclav|iv antibiotics|clindamycin/i,
      name: 'IV Antibiotics Started',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /topical lidocaine spray|local anesthetic spray|lidocaine spray/i,
      name: 'Local Anaesthesia Before Aspiration',
      targetMilestoneMinutes: 30,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_pta_1',
      title: 'Incidental Lymph Node Enlargement on the Unaffected Side',
      description: 'Mild, non-tender lymphadenopathy is also felt on the right side of the neck, away from the area of the swelling.',
      correctAction: 'Recognise this as reactive lymphadenopathy from the throat infection; no separate work-up needed, and expect it to settle once the infection resolves.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pta_2',
      title: 'Dental Caries Noted on Oral Examination',
      description: 'Oral examination incidentally reveals several carious molars unrelated to the current presentation.',
      correctAction: 'Refer for outpatient dental care after the acute infection resolves; no emergency treatment is needed for this admission.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pta_3',
      title: 'Mildly Elevated Blood Glucose on Admission',
      description: 'Her random blood glucose comes back mildly elevated with no prior history of diabetes.',
      correctAction: 'Recognise this as a stress response to acute infection and fever; recheck once she has recovered rather than labelling her diabetic from a single admission value.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A 24-year-old woman arrives with five days of worsening one-sided throat pain, now with trismus limiting her mouth opening, a muffled voice, and drooling because swallowing has become too painful.',
      consequenceOnRight: 'She is recognised as needing urgent assessment for a collection that may need draining; IV access and analgesia are started and urgent ENT input is sought the same day rather than a routine outpatient slot.',
      consequenceOnWrong: 'She is treated as an ordinary sore throat, given only oral medication, and sent home despite the trismus and muffled voice already present.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'On examination there is a one-sided bulge of the soft palate pushing the uvula to the opposite side, with the swelling tense and fluctuant to touch, distinctly different from the two inflamed but symmetric tonsils of an ordinary throat infection.',
      consequenceOnRight: 'The one-sided bulge with uvular deviation and a tense, fluctuant swelling on the affected side is recognised as a collection needing drainage, not simply a worse case of tonsillitis.',
      consequenceOnWrong: 'The findings are put down to "just a bad throat infection" on a cursory glance at both tonsils, without specifically looking for the one-sided bulge and uvular shift that would change the plan.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'She has already had two days of oral antibiotics from a pharmacist with no improvement, and the team debates whether to simply switch or add another oral antibiotic and reassess in a few days.',
      consequenceOnRight: 'It is recognised that a walled-off collection like this will not resolve on antibiotics alone regardless of which one is chosen, and needle aspiration or incision and drainage is arranged promptly alongside starting appropriate intravenous antibiotics.',
      consequenceOnWrong: 'Only the antibiotic is changed, and drainage is deferred "to see if the new one works first," while the underlying collection is left untouched and her trismus and pain continue to worsen.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'Needle aspiration is planned, and someone suggests going straight ahead since she is already in a great deal of pain and just wants it over with.',
      consequenceOnRight: 'A topical local anaesthetic is applied to the area first so the aspiration can be performed on a still, cooperative patient, since a major vessel of the neck lies just behind and to the side of the area being punctured.',
      consequenceOnWrong: 'The needle is passed without any local anaesthesia first; she moves and gags through the procedure, and the needle passes closer than it should to the vessels running just behind the tonsillar bed.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'The team discusses what distinguishes this from the kind of spreading, both-sided neck swelling that can threaten the airway itself.',
      consequenceOnRight: 'It is noted that this swelling stays confined to one side around the tonsil rather than spreading diffusely into the floor of the mouth and neck on both sides, so the same urgent surgical-airway planning used for a spreading floor-of-mouth infection is not automatically needed here — though any new stridor, drooling out of proportion to her pain, or trismus worsening despite drainage should prompt re-assessment for exactly that.',
      consequenceOnWrong: 'Airway drills and surgical-airway equipment are mobilised as though this were the same spreading, both-sided process as a floor-of-mouth infection, needlessly delaying simple bedside drainage for a localised collection that does not carry the same risk.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before discharge, the team discusses why this has happened after a history of recurrent throat infections.',
      consequenceOnRight: 'She is counselled that recurrent tonsillitis is a recognised risk factor for this, told to complete her full course of antibiotics this time, and referred for consideration of interval tonsillectomy given her pattern of recurrent episodes.',
      consequenceOnWrong: 'She is discharged with no explanation of why this happened and no discussion of interval tonsillectomy despite a clear pattern of recurrent throat infections.',
    },
  ],
};
