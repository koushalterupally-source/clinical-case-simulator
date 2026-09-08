import { CaseScaffold } from '../../types';

/**
 * A high myope presents with the classic sequence of floaters and flashes
 * followed by an enlarging field defect from a peripheral break with early
 * separation of the light-sensitive layer at the back of the eye. The exam
 * is written so the candidate builds the diagnosis from the vitreous
 * pigment cells, the slightly low intraocular pressure on the affected
 * side, and the field defect itself, rather than being told it outright.
 *
 * Teaching spine: dilated indirect ophthalmoscopy with scleral depression,
 * after full pupillary dilation, is the step that actually makes the
 * diagnosis — a slit lamp or a B-scan alone do not substitute for it; the
 * central distinction of whether the sharpest-vision area in the middle of
 * the field is still spared ("macula-on") or already involved
 * ("macula-off") is what sets the urgency — repair within about 24 hours
 * of presentation is associated with better visual outcomes while the
 * centre is still spared, a window that is easy to squander by reasoning
 * backwards ("vision is still good, so there's no rush") rather than
 * forwards ("vision is still good — today is the day to keep it that
 * way"); a miotic drop is a genuine, if less obvious, harmful order here
 * since both the diagnostic exam and either definitive repair depend on a
 * widely dilated pupil; and once the centre is reached, that portion of
 * the visual outcome is not one that can be gotten back — the entire
 * urgency argument is about protecting what has not yet been lost. See
 * CASE_MODEL.md for the therapy model this scaffold follows.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "rhegmatogenous", "retinal" and "detachment" — the three content words
 * Test Suite 14 extracts from conditionName — using "the light-sensitive
 * layer at the back of the eye", "a break", "separated" and "the curtain"
 * in their place instead.
 */
export const SCAFFOLD_RETINAL_DETACHMENT: CaseScaffold = {
  id: 'scaffold_retinal_detachment',
  title: 'Sudden Floaters, Flashes and an Enlarging Curtain in One Eye',
  conditionName: 'Rhegmatogenous Retinal Detachment',
  subject: 'Ophthalmology',
  system: 'Ophthalmology',
  demographics: {
    name: 'Vikram Nair',
    age: 52,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 52-year-old man with long-standing short-sightedness presents to the eye emergency room with a two-day history of sudden floaters and flashes of light in his right eye. Since yesterday evening he has noticed a grey curtain spreading upward from the lower part of his vision in that eye, which has been slowly creeping further up over the last few hours and now covers almost half of his visual field. He denies any injury to the eye. He says he can still read fine print with that eye when he covers the other one, and the eye is not painful, not red, and looks otherwise normal to him.',
  initialVitals: {
    hr: 84,
    bp: '128/82',
    rr: 16,
    spo2: 98,
    temp: '36.8°C',
    grbs: 104,
  },
  clinchingClue:
    'Dilated indirect ophthalmoscopy with scleral depression, performed after full pupillary dilation, reveals a horseshoe-shaped, full-thickness break in the superior retina of the right eye with the surrounding retina elevated, thrown into mobile, corrugated folds extending toward but not yet reaching the posterior pole. His central visual acuity in that eye remains 6/9, and the macula itself is flat and dry on the same view — confirming the macula is not yet involved, a distinction that determines whether this goes to theatre today or can safely wait even one more day.',
  clinchingClueTimeMinutes: 45,
  examFindingsMap: {
    general: 'Anxious but comfortable, no pain, holding a hand over the left eye repeatedly to check the right eye\'s vision.',
    cvs: 'Mildly tachycardic from anxiety, regular rhythm, normal heart sounds.',
    chest: 'Clear bilaterally, no respiratory distress.',
    abdomen: 'Soft, non-tender, no organomegaly.',
    cns: 'Alert and oriented, no headache, no focal neurological deficit; no history of preceding weakness, slurred speech or double vision to suggest a neurological event.',
    eyes: 'Right eye: white and quiet, no injection, anterior chamber deep and quiet, no cells or flare; pupil round and reactive with no afferent pupillary defect; vitreous shows fine pigmented cells settling inferiorly on slit-lamp examination. Left eye: white and quiet, high myopic fundus changes only, no acute findings.',
    fundus: 'Right eye: undilated view through a normal-sized pupil is limited to the posterior pole, which looks flat; the periphery, where the pathology actually lies, cannot be assessed without dilation. Left eye: myopic tessellated fundus, healthy disc, no breaks seen on the limited undilated view.',
  },
  historyMap: {
    presenting: 'Sudden floaters and flashes of light in the right eye for two days, followed by an enlarging grey curtain rising from below over the last several hours; no pain, no redness, no discharge.',
    ocular: 'No history of trauma to the eye, no prior eye surgery, no eye drops used. Wears spectacles for short-sightedness of about -9 dioptres in both eyes since his twenties. No previous similar episode in either eye.',
    past: 'No known diabetes, no known hypertension, no other chronic illness.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    family: 'His mother had a similar problem in one eye in her sixties, treated with surgery, though he does not know further details.',
    social: 'Works as a delivery driver; concerned about his ability to drive if his vision worsens. Non-smoker, does not drink alcohol.',
  },
  investigationsMap: {
    visual_acuity: {
      aliases: ['visual acuity testing', 'visual acuity assessment', 'visual acuity', 'va testing', 'visual acuity check'],
      resultText:
        'Visual Acuity: Right eye 6/9 unaided, correctable to 6/6 with pinhole — central vision still preserved despite the peripheral field defect. Left eye 6/6, unremarkable.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    amsler_grid: {
      aliases: ['amsler grid test', 'amsler grid', 'amsler grid testing'],
      resultText:
        'Amsler Grid: Right eye — the grid lines appear straight and undistorted centrally, with only the inferior portion of the grid missing from view; no central distortion or blank patch in the middle. Left eye: normal.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    iop_tonometry: {
      aliases: ['tonometry', 'applanation tonometry', 'intraocular pressure measurement', 'iop measurement', 'iop', 'intraocular pressure'],
      resultText:
        'Applanation Tonometry: Intraocular pressure 11 mmHg in the right eye (Reference 10–21 mmHg), 15 mmHg in the left eye — mildly lower on the affected side, a recognised finding once fluid has tracked in behind the light-sensitive layer.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    slit_lamp: {
      aliases: ['slit lamp examination', 'slit lamp'],
      resultText:
        'Slit-Lamp Examination: Anterior segment quiet and white in both eyes, no cells or flare. The right vitreous shows fine pigmented cells settling inferiorly ("tobacco dust", a positive Shafer sign) — a recognised marker of a break even before the periphery has been examined.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    indirect_ophthalmoscopy: {
      aliases: ['dilated indirect ophthalmoscopy', 'indirect ophthalmoscopy with scleral depression', 'indirect ophthalmoscopy', 'dilated fundus examination', 'fundus examination dilated'],
      resultText:
        'Dilated Indirect Ophthalmoscopy with Scleral Depression: A horseshoe-shaped, full-thickness break is seen in the superior retina of the right eye at the 11 o\'clock periphery, with the surrounding retina elevated, thrown into mobile, corrugated folds extending toward but not yet reaching the posterior pole; the macula is flat and dry. Left eye: healthy peripheral retina with diffuse myopic thinning but no breaks or lattice seen.',
      turnaroundMinutes: 30,
      category: 'procedures',
      isIndicative: true,
    },
    b_scan_usg: {
      aliases: ['b scan ultrasound', 'ocular b scan', 'ultrasound b scan eye', 'b-scan ultrasonography'],
      resultText:
        'B-Scan Ultrasonography: A mobile, highly reflective membrane rises from the wall of the globe in the superior quadrant of the right eye, in continuity with the vitreous base — no echoes to suggest a mass or dense haemorrhage.',
      turnaroundMinutes: 20,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A B-scan earns its place when the view through the pupil is blocked by media haze — a dense cataract or vitreous haemorrhage — to still map the extent of a break before surgery. Here the media are clear and dilated ophthalmoscopy has already shown the break directly, so this only confirms what has already been seen rather than adding new information.',
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 14.2 g/dL (Reference 13.0–17.0 g/dL), WBC 7,400/mcL (Reference 4,000–11,000/mcL), Platelets 260,000/mcL (Reference 150,000–450,000/mcL) — unremarkable, a routine preoperative baseline.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    rbs_grbs: {
      aliases: ['rbs / grbs', 'rbs', 'grbs', 'random blood sugar', 'blood sugar', 'rbs random blood sugar'],
      resultText: 'Random Blood Sugar: 104 mg/dL — normal, and a useful preoperative baseline given the anaesthetic planned for surgery.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    ct_brain: {
      aliases: ['ct brain plain', 'ct head', 'ct brain', 'computed tomography brain', 'ct head plain'],
      resultText: 'CT Brain (plain): No acute intracranial abnormality, no infarct, no haemorrhage.',
      turnaroundMinutes: 45,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'Flashes and floaters progressing to a field-specific curtain in one eye, with a completely normal fellow eye, are not a typical picture for a transient ischaemic attack or a migraine aura, and a brain scan cannot show a peripheral break in the eye. Ordering it spends the transport and scanning time on the wrong organ, in a macula-on eye where every hour matters for getting to the dilated fundus exam and then to theatre.',
    },
  },
  therapiesMap: {
    mydriatic_drops: {
      aliases: ['tropicamide phenylephrine eye drops', 'dilating eye drops', 'mydriatic drops', 'pupil dilating drops', 'tropicamide drops'],
      responseText: 'Tropicamide 1% and phenylephrine 2.5% eye drops instilled in the right eye to achieve full pupillary dilation.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Full mydriasis is required before a proper dilated fundus examination and before either definitive repair procedure — without it the periphery, where breaks characteristically sit, cannot be adequately seen or treated.',
    },
    conservative_positioning: {
      aliases: ['posturing advice', 'positioning advice', 'advise upright posture and avoid strenuous activity', 'activity restriction', 'head positioning advice'],
      responseText: 'The patient is advised to remain upright as much as possible, avoid lying flat, avoid strenuous activity, heavy lifting and sudden head movements while he waits for theatre.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'With a superior break, gravity carries fluid from behind the light-sensitive layer toward the centre of vision when the head is flat; keeping him upright and avoiding strenuous activity slows that spread and buys time until surgery — a bridge, never a substitute, for timely repair.',
    },
    vitreoretina_consult: {
      aliases: ['vitreoretina consult', 'retina specialist consult', 'urgent ophthalmology referral', 'vitreo-retinal surgery consult', 'vitreoretinal consult'],
      responseText: 'Urgent vitreo-retinal surgery consult requested; the on-call retina specialist confirms the findings and lists the patient for same-day repair given the macula-on status.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Because the centre of vision is not yet involved, this is one of the true same-day ophthalmic emergencies — early specialist involvement is what turns a same-day diagnosis into a same-day operation before the window closes.',
    },
    scleral_buckle: {
      aliases: ['scleral buckle surgery', 'scleral buckling', 'scleral buckle'],
      responseText: 'An encircling scleral buckle is placed under anaesthesia, indenting the wall of the eye against the break, combined with cryotherapy to seal it; the retina is confirmed flat on the table.',
      onsetMinutes: 300,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      requiresFirst: ['mydriatic_drops'],
      harmfulSequenceResponseText: 'The surgical team begins before the pupil is fully dilated; the peripheral break cannot be adequately seen through the small pupil, and the procedure is paused to instil dilating drops and wait for them to act before restarting.',
      harmfulSequenceVitalsEffect: { hr: 6 },
      harmfulSequenceRationale: 'Scleral buckling depends on full mydriasis to visualise and treat the periphery; starting before dilation is complete wastes time under anaesthesia in an eye that is already racing the centre of vision becoming involved.',
      rationale: 'Indenting the sclera against the break with cryotherapy or laser to seal it is one of the two standard definitive repairs for a single, easily localised superior break in an eye with clear media — same-day repair is the standard of care while the centre of vision remains uninvolved.',
    },
    ppv_gas_tamponade: {
      aliases: ['pars plana vitrectomy', 'vitrectomy with gas tamponade', 'ppv', 'pars plana vitrectomy with gas tamponade'],
      responseText: 'Pars plana vitrectomy is performed with removal of the vitreous traction, laser applied around the break, and a gas bubble left in the eye as tamponade; the patient is counselled on face-down positioning afterwards.',
      onsetMinutes: 300,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      requiresFirst: ['mydriatic_drops'],
      harmfulSequenceResponseText: 'The vitrectomy is started before the pupil is fully dilated; the surgical view through the small pupil is inadequate to safely remove the vitreous traction, and the case is paused to dilate further before continuing.',
      harmfulSequenceVitalsEffect: { hr: 6 },
      harmfulSequenceRationale: 'Vitrectomy depends on a wide, stable pupil for a safe surgical view throughout the case; starting before dilation is complete forces an avoidable pause under anaesthesia while the centre of vision remains at risk.',
      rationale: 'Vitrectomy with laser and gas tamponade is the alternative definitive repair, often favoured when there is vitreous traction, and is equally appropriate here — the choice between it and a buckle is a surgeon\'s judgement, but either must happen the same day while the centre of vision is still spared.',
    },
    topical_antibiotic_drops: {
      aliases: ['moxifloxacin eye drops', 'topical antibiotic eye drops', 'perioperative antibiotic drops', 'antibiotic eye drops'],
      responseText: 'Moxifloxacin 0.5% eye drops started perioperatively.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'Topical antibiotic prophylaxis around any intraocular procedure reduces the risk of infection inside the eye; it is routine supportive care and does not itself change how urgently the break needs sealing.',
    },
    pilocarpine_drops: {
      aliases: ['pilocarpine eye drops', 'pilocarpine', 'pupil constricting drops', 'pilocarpine 2% eye drops'],
      responseText: 'Pilocarpine 2% eye drops are instilled in the right eye to constrict the pupil.',
      onsetMinutes: 20,
      appropriateness: 'harmful',
      rationale: 'A miotic constricts exactly the pupil that needs to be widely dilated to examine the periphery and to perform either buckling or vitrectomy — giving it here obscures the view, delays both the diagnosis and the operation, and then has to be reversed with a dilating drop before either can proceed. There is no point in this presentation where constricting the pupil helps.',
    },
    deferred_elective_review: {
      aliases: ['discharge home review in two weeks', 'elective outpatient review', 'reassure and discharge', 'discharge with routine follow up'],
      responseText: 'The patient is reassured that this is likely eye strain from screen use, given a routine glasses-clinic appointment in two weeks, and sent home.',
      onsetMinutes: 0,
      appropriateness: 'harmful',
      rationale: 'A superior break with an enlarging field defect and a centre of vision only just still spared is a same-day surgical emergency, not a routine follow-up complaint — sending him home without same-day repair risks fluid reaching the centre of vision before he is ever seen again, converting a highly treatable eye into one with a permanently worse visual outcome.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /indirect ophthalmoscop|scleral depression|dilated fundus/i,
      name: 'Dilated Fundus Exam Confirms the Diagnosis',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /vitreoretina consult|retina specialist consult|urgent ophthalmology referral|vitreoretinal consult/i,
      name: 'Urgent Same-Day Eye Surgical Referral',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /scleral buckle|vitrectomy/i,
      name: 'Definitive Repair Performed Within the Macula-On Window',
      targetMilestoneMinutes: 1440,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_rd_1',
      title: 'Incidental Early Cataract in the Left Eye',
      description: 'Slit-lamp examination of the unaffected left eye incidentally shows early nuclear sclerotic lens changes, not visually significant at present.',
      correctAction: 'No intervention needed now; note it and advise routine follow-up if vision in that eye declines.',
      status: 'unnoticed',
    },
    {
      id: 'inc_rd_2',
      title: 'Lattice Degeneration in the Fellow Eye',
      description: 'Peripheral examination of the left eye incidentally shows an area of lattice degeneration with no associated break.',
      correctAction: 'Counsel him on warning symptoms (new flashes, floaters or a shadow) and arrange surveillance; prophylactic laser is reserved for a break or surgeon-judged high-risk lattice, not applied routinely to lattice alone.',
      status: 'unnoticed',
    },
    {
      id: 'inc_rd_3',
      title: 'Mildly Elevated Blood Pressure Reading',
      description: 'A single blood pressure reading of 148/92 mmHg is recorded in the eye emergency room, with no prior history of high blood pressure.',
      correctAction: 'Recheck once he has calmed down from the acute stress of the diagnosis and refer for outpatient blood pressure evaluation rather than treating one anxious reading as new hypertension.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A 52-year-old man arrives describing two days of floaters and flashes in one eye, now with a curtain spreading upward from below that has been slowly enlarging over several hours, though he can still read fine print with that eye.',
      consequenceOnRight: 'He is triaged as a same-day ophthalmic emergency, dilating drops are started immediately, and an urgent referral to the on-call retina specialist is made without delay.',
      consequenceOnWrong: 'He is placed in a routine queue behind less urgent complaints, and hours pass with the pupil still undilated and no specialist yet informed while the field defect continues to enlarge.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Slit-lamp examination shows pigmented cells settling in the vitreous of the affected eye, and the intraocular pressure on that side is slightly lower than the other eye, with no redness or anterior chamber inflammation to explain either finding.',
      consequenceOnRight: 'These findings are recognised together as suggestive of a break with early separation of the light-sensitive layer at the back of the eye, prompting an urgent dilated examination with scleral depression rather than being dismissed as unrelated.',
      consequenceOnWrong: 'The pigmented cells and the low pressure are noted but not connected to anything, and the dilated peripheral examination that would actually make the diagnosis is never performed.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The dilated examination confirms a break with the light-sensitive layer lifted in the superior periphery, but his central vision through that eye is still sharp and the middle of his visual field is untouched.',
      consequenceOnRight: 'Because the centre of vision is not yet involved, this is treated as one of the true same-day ophthalmic emergencies and surgery is arranged for later today, since outcomes are measurably better when repair happens within about 24 hours of a break like this while the centre is still spared.',
      consequenceOnWrong: 'The case is scheduled onto the next routine operating list several days away, reasoning that his central vision is still good "so there is no rush" — the opposite of the truth: it is precisely because the centre is still spared that today is the window in which surgery gives the best chance of keeping it that way.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'While he waits to be taken to theatre, a colleague suggests instilling a drop to constrict his pupil so it is "protected" until surgery.',
      consequenceOnRight: 'A pupil-constricting drop is avoided; the pupil is instead kept dilated, since both the surgeon\'s view of the periphery and the procedure itself depend on it staying wide.',
      consequenceOnWrong: 'A pupil-constricting drop is given, the pupil narrows, and the surgical team must now wait for a dilating drop to reverse it before the operation can even begin, losing time in an eye already racing against the centre becoming involved.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Over the next few hours the enlarging field defect is watched while he waits for a theatre slot, and there is a question of what he should be doing with himself in the meantime.',
      consequenceOnRight: 'He is advised to remain upright and avoid lying flat, heavy lifting or strenuous activity, since gravity can carry fluid from the break toward the centre of vision while he lies down, buying time until the operating list.',
      consequenceOnWrong: 'He is allowed to lie flat and go about his day as usual with no positioning advice, and the field defect creeps further before his slot in theatre arrives.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Once his eye has been repaired and he is recovering, the team discusses what should be checked and explained before he is discharged.',
      consequenceOnRight: 'His other eye is examined for the same predisposing thinning given how short-sighted he is in both eyes, and he is taught to return immediately — not wait for a routine appointment — if he ever notices new flashes, floaters or a shadow in either eye.',
      consequenceOnWrong: 'He is discharged with instructions about the operated eye only, no examination of the fellow eye is arranged, and he is not warned that new symptoms in either eye need same-day attention rather than a routine follow-up visit.',
    },
  ],
};
