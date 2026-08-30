import { CaseScaffold } from '../../types';

/**
 * A sight-threatening ophthalmic emergency: the drainage recess between iris
 * and cornea shuts, aqueous cannot leave the eye, and pressure inside it
 * rises rapidly. The exam findings are written so the candidate can build
 * the diagnosis from the fixed mid-dilated pupil, hazy cornea and stony-hard
 * globe rather than being told it.
 *
 * The teaching spine: topical beta-blocker + alpha-agonist + systemic
 * carbonic-anhydrase inhibitor + IV osmotic agent lower pressure fast but
 * only buy time; a laser opening through the iris is the definitive cure,
 * and only works once the cornea has cleared enough to see through; a
 * pupil-constricting drop is ineffective at very high pressure until the
 * pressure is already coming down (a real sequencing trap, modelled via
 * requiresFirst); and a mydriatic or systemic anticholinergic is dangerous
 * because it pushes the iris further into the drainage recess. See
 * CASE_MODEL.md for the therapy model this scaffold follows.
 */
export const SCAFFOLD_ANGLE_CLOSURE: CaseScaffold = {
  id: 'scaffold_angle_closure',
  title: 'Sudden Severe Pain and Blurred Vision in One Eye',
  conditionName: 'Acute Angle-Closure Glaucoma',
  subject: 'Ophthalmology',
  system: 'Ophthalmology',
  demographics: {
    name: 'Radha Iyer',
    age: 58,
    gender: 'Female',
    setting: 'Emergency',
  },
  openingVignette:
    'A 58-year-old woman is brought to the emergency department with sudden severe pain in her right eye for the past three hours, along with markedly blurred vision and coloured haloes around lights. She has an associated frontal headache and has vomited twice. The pain began while she was sitting in a darkened room. There is no history of trauma, discharge, or prior eye surgery.',
  initialVitals: {
    hr: 108,
    bp: '162/94',
    rr: 20,
    spo2: 98,
    temp: '37.0°C',
    grbs: 132,
  },
  clinchingClue:
    'The right eye is red with circumcorneal congestion; the cornea looks hazy and oedematous; the pupil is fixed, mid-dilated and oval, non-reactive to light; the globe feels stony-hard compared with the soft left eye on gentle digital palpation. Applanation tonometry confirms a markedly raised intraocular pressure on the right, and gonioscopy shows the anterior chamber angle is crowded and appositionally closed on that side, while the same angle in the left eye is anatomically narrow but still open — the same predisposition, not yet decompensated.',
  clinchingClueTimeMinutes: 10,
  examFindingsMap: {
    general: 'Anxious, in obvious pain, holding the right side of her face, retching intermittently.',
    cvs: 'Tachycardic, regular rhythm, normal heart sounds; blood pressure mildly elevated, in keeping with pain.',
    chest: 'Clear bilaterally, no respiratory distress.',
    abdomen: 'Soft, non-tender, no guarding; no abdominal cause found for the vomiting.',
    cns: 'Alert and oriented, no focal neurological deficit, no neck stiffness. The headache is frontal and periorbital, on the same side as the eye pain.',
    eyes: 'Right eye: circumcorneal congestion, hazy oedematous cornea, shallow anterior chamber, pupil fixed mid-dilated and oval, non-reactive to light, globe stony-hard on palpation. Left eye: white and quiet, clear cornea, pupil round and reactive, globe of normal softer consistency, but the anterior chamber is shallow on side-by-side comparison.',
    fundus: 'View of the right optic disc is hazy through the oedematous cornea and cannot be assessed. The left fundus is clearly seen and appears normal, healthy disc, no cupping.',
  },
  historyMap: {
    onset: 'Sudden onset three hours ago while sitting in a dim room; the pain has been severe and constant since, radiating to the forehead on the same side.',
    vision: 'Vision in the right eye has become progressively more blurred over the three hours; left eye vision is unaffected. She also describes seeing coloured rings around lights just before the pain started.',
    ocular: 'No history of eye trauma, eye surgery, or use of eye drops. She wears reading glasses for long-sightedness and recalls one milder, self-limiting episode of eye ache and blurred vision at dusk a few months ago that settled on its own once she went indoors.',
    past: 'No known systemic illness. No previous hospital admission for an eye problem.',
    medications: 'No regular medications. Took an over-the-counter cold and allergy tablet two days ago.',
    allergies: 'No known drug allergies.',
    family: 'No family history of a similar eye complaint that she is aware of.',
  },
  investigationsMap: {
    iop_tonometry: {
      aliases: ['tonometry', 'applanation tonometry', 'intraocular pressure measurement', 'iop measurement'],
      resultText: 'Applanation Tonometry: Intraocular pressure 56 mmHg in the right eye (Reference 10–21 mmHg), 18 mmHg in the left eye — markedly elevated on the symptomatic side.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    gonioscopy: {
      aliases: ['gonioscopy'],
      resultText: 'Gonioscopy: The anterior chamber angle is crowded and appositionally closed over 360° in the right eye. The same angle in the left eye is anatomically narrow (Shaffer grade 1) but still open, confirming both eyes share the predisposing anatomy.',
      turnaroundMinutes: 15,
      category: 'monitoring',
      isIndicative: true,
    },
    slit_lamp: {
      aliases: ['slit lamp examination', 'slit lamp'],
      resultText: 'Slit-Lamp Examination: Right eye shows circumcorneal congestion, microcystic corneal oedema, a shallow anterior chamber (Van Herick grade 1), and a mid-dilated, oval, poorly reactive pupil with a sluggish light reflex. Left eye is quiet with a clear cornea but a shallow anterior chamber on comparison.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    visual_acuity: {
      aliases: ['visual acuity testing', 'visual acuity assessment', 'visual acuity'],
      resultText: 'Visual Acuity: Right eye 6/60, markedly reduced. Left eye 6/9 unaided, essentially preserved.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    serum_electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'serum electrolytes', 'electrolytes'],
      resultText: 'Serum Electrolytes: Na+ 138 mEq/L (Reference 135–145), K+ 4.0 mEq/L (Reference 3.5–5.0), Cl- 101 mEq/L (Reference 98–107) — normal baseline, worth trending once a carbonic anhydrase inhibitor and an osmotic agent are started.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    rft_kft: {
      aliases: ['rft / kft (urea, creatinine)', 'rft', 'kft'],
      resultText: 'Renal Function: Blood Urea 26 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.8 mg/dL (Reference 0.6–1.2 mg/dL) — normal, confirming it is safe to proceed with a sulfonamide-related carbonic anhydrase inhibitor and an intravenous osmotic agent.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    rbs_grbs: {
      aliases: ['rbs / grbs', 'rbs', 'grbs', 'random blood sugar'],
      resultText: 'RBS: 132 mg/dL — mildly elevated, in keeping with the stress of severe pain and vomiting; not in the diabetic range.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText: 'CBC: Hb 12.8 g/dL (Reference 12.0–15.0 g/dL), WBC 8,200/mcL (Reference 4,000–11,000/mcL), Platelets 260,000/mcL (Reference 150,000–450,000/mcL) — unremarkable.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A normal blood count is routine screening here; it does not explain the pain, the fixed pupil or the rock-hard eye, and waiting on it should never delay starting pressure-lowering treatment.',
    },
    ct_head_plain: {
      aliases: ['ct head plain', 'ct head'],
      resultText: 'CT Head (plain): No haemorrhage, no midline shift, no acute infarct — brain parenchyma is normal.',
      turnaroundMinutes: 45,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote: 'The headache and vomiting here are being driven by a painful, rock-hard eye, not by an intracranial process. Sending her to the scanner adds a transport delay while the eye itself goes untreated, and a normal brain scan will not lower what is happening inside it.',
    },
  },
  therapiesMap: {
    timolol_eye_drops: {
      aliases: ['timolol 0.5% eye drops', 'timolol eye drops', 'timolol'],
      responseText: 'Timolol 0.5% eye drops instilled in the right eye.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'A topical beta-blocker reduces aqueous humour production and is one of the first-line agents used immediately, alongside a topical alpha-agonist and a systemic carbonic anhydrase inhibitor, to bring the pressure down while a definitive procedure is arranged.',
    },
    brimonidine_eye_drops: {
      aliases: ['brimonidine 0.2% eye drops', 'brimonidine eye drops', 'brimonidine'],
      responseText: 'Brimonidine 0.2% eye drops instilled in the right eye.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'A topical alpha-2 agonist both reduces aqueous production and increases outflow, and is combined with a beta-blocker and a systemic carbonic anhydrase inhibitor as first-line medical therapy while a definitive procedure is arranged.',
    },
    acetazolamide_iv: {
      aliases: ['acetazolamide iv', 'acetazolamide'],
      responseText: 'Acetazolamide 500 mg given intravenously.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -6, bp: '148/88' },
      labShift: {
        iop_tonometry: 'Applanation Tonometry (repeat): Intraocular pressure now 42 mmHg in the right eye — falling with topical and systemic therapy, though still elevated.',
      },
      appropriateness: 'indicated',
      rationale: 'A systemic carbonic anhydrase inhibitor gives a rapid, reliable fall in aqueous production and is a mainstay of emergency medical treatment alongside the topical agents; renal function is checked first since it is a sulfonamide-related drug excreted renally.',
    },
    mannitol: {
      aliases: ['mannitol 20%', 'mannitol'],
      responseText: 'Mannitol 20%, 1–1.5 g/kg, given as a rapid intravenous infusion.',
      onsetMinutes: 45,
      vitalsEffect: { hr: -8, bp: '140/86' },
      labShift: {
        iop_tonometry: 'Applanation Tonometry (repeat): Intraocular pressure now 30 mmHg in the right eye — substantially improved with the osmotic agent, though a definitive procedure is still required once the eye is quiet.',
      },
      appropriateness: 'indicated',
      rationale: 'An intravenous osmotic agent draws fluid out of the eye and produces the fastest, largest fall in pressure among the medical options; it is used when pressure remains very high despite topical drops and the systemic carbonic anhydrase inhibitor, with renal and cardiac status checked first since it causes a rapid fluid shift.',
    },
    pilocarpine_eye_drops: {
      aliases: ['pilocarpine 2% eye drops', 'pilocarpine eye drops', 'pilocarpine'],
      responseText: 'Pilocarpine 2% eye drops instilled in the right eye.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Pilocarpine constricts the pupil to pull the iris away from the drainage recess, but the sphincter is ischaemic and responds poorly when pressure is very high — it is added once the beta-blocker and the systemic agent have started to bring pressure down, not used as the opening move.',
      requiresFirst: ['timolol_eye_drops', 'acetazolamide_iv'],
      harmfulSequenceResponseText: 'Pilocarpine is instilled first, before any pressure-lowering agent has been given. The pupil barely constricts and the eye remains rock-hard — at this level of pressure the iris sphincter is ischaemic and unresponsive, and the attempt has cost time.',
      harmfulSequenceVitalsEffect: { hr: 6 },
      harmfulSequenceRationale: 'At very high pressure the pupillary sphincter is ischaemic and pilocarpine cannot produce an effective miosis. Giving it before the beta-blocker and the systemic carbonic anhydrase inhibitor have started to lower the pressure wastes time on a drug that will not work yet, while the eye remains under critically high pressure.',
    },
    laser_iridotomy: {
      aliases: ['laser peripheral iridotomy', 'peripheral iridotomy', 'iridotomy'],
      responseText: 'Laser peripheral iridotomy performed on the right eye, now that the cornea has cleared enough and the pressure has come down with medical therapy.',
      onsetMinutes: 60,
      vitalsEffect: { hr: -10, bp: '128/80' },
      labShift: {
        iop_tonometry: 'Applanation Tonometry (repeat): Intraocular pressure now 14 mmHg in the right eye — normalised after the definitive procedure, with a patent opening confirmed in the iris.',
      },
      appropriateness: 'indicated',
      rationale: 'Drops and systemic agents only lower pressure temporarily. A laser opening through the iris creates a new, permanent drainage channel that bypasses the blocked one — this is the definitive cure that prevents recurrence in this eye, but it can only be performed once the cornea has cleared enough to see through and aim the laser safely.',
      requiresFirst: ['timolol_eye_drops', 'acetazolamide_iv'],
      harmfulSequenceResponseText: 'The procedure is attempted before pressure has been brought down medically. The cornea is still hazy and oedematous, the view of the iris is poor, and the laser cannot be applied safely or effectively — the attempt is abandoned and has to be repeated once medical therapy has worked.',
      harmfulSequenceVitalsEffect: { hr: 8 },
      harmfulSequenceRationale: 'A hazy, oedematous cornea makes it difficult or impossible to focus a laser accurately on the iris. Medical treatment must bring the pressure down and let the cornea clear first, so the procedure can be performed safely and successfully — it is the definitive cure, but only once the eye is ready for it.',
    },
    prophylactic_iridotomy_fellow_eye: {
      aliases: ['prophylactic laser iridotomy (fellow eye)', 'prophylactic iridotomy fellow eye', 'fellow eye iridotomy'],
      responseText: 'A prophylactic laser peripheral iridotomy is performed on the left, unaffected eye, once it is confirmed on gonioscopy to share the same crowded angle.',
      onsetMinutes: 90,
      appropriateness: 'indicated',
      rationale: 'The fellow eye shares the same predisposing anatomy and carries a substantial risk of the same emergency within a few years if left untreated. A prophylactic laser opening is offered to that eye electively, once the first eye is stable — standard practice for this presentation.',
    },
    atropine_iv: {
      aliases: ['atropine 0.6 mg iv', 'atropine'],
      responseText: 'Atropine 0.6 mg given intravenously.',
      onsetMinutes: 15,
      vitalsEffect: { hr: 22, bp: '150/92' },
      appropriateness: 'harmful',
      rationale: 'Atropine is a systemic anticholinergic and dilates the pupil further, pushing the iris more firmly into the drainage recess and worsening the block. Any mydriatic or systemic anticholinergic is dangerous here and can precipitate a further, more severe rise in pressure, with a real risk of permanent vision loss.',
    },
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'large bore iv'],
      responseText: 'A wide-bore IV cannula is secured for the intravenous carbonic anhydrase inhibitor and osmotic agent.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable IV access is needed promptly, since both the carbonic anhydrase inhibitor and the osmotic agent are given intravenously as first-line emergency treatment.',
    },
    ondansetron_iv: {
      aliases: ['ondansetron iv', 'ondansetron'],
      responseText: 'Ondansetron 4 mg given intravenously for the vomiting.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Controlling vomiting is a useful supportive measure and makes the patient more comfortable while pressure-lowering treatment takes effect, though it does not itself change the pressure in the eye.',
    },
    paracetamol_iv: {
      aliases: ['paracetamol iv', 'paracetamol'],
      responseText: 'Paracetamol 1 g given intravenously for pain.',
      onsetMinutes: 20,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Analgesia is an appropriate supportive measure for the severe pain, given alongside — never instead of — the pressure-lowering agents that treat the underlying problem.',
    },
    ophthalmology_consult: {
      aliases: ['ophthalmology consult'],
      responseText: 'Ophthalmology consult requested; the on-call ophthalmologist attends to confirm the findings on slit-lamp and gonioscopy and to plan the definitive procedure.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'Early ophthalmology involvement ensures confirmation on slit-lamp and gonioscopy, appropriate titration of medical therapy, and timely definitive laser treatment for both eyes.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /timolol|brimonidine|acetazolamide|mannitol/i,
      name: 'Initial Pressure-Lowering Therapy',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /iridotomy/i,
      name: 'Definitive Laser Procedure',
      targetMilestoneMinutes: 1440,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_ang_1',
      title: 'Early Nuclear Sclerosis in the Left Eye',
      description: 'Slit-lamp examination of the left eye incidentally shows early nuclear sclerotic lens changes consistent with early age-related cataract, not visually significant at present.',
      correctAction: 'No intervention needed now; reassure and advise routine outpatient follow-up if vision in that eye declines.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ang_2',
      title: 'Elevated Blood Pressure Reading',
      description: 'Blood pressure recorded in the emergency department stays persistently over 150/90 mmHg even once the pain has settled, with no prior diagnosis of high blood pressure documented.',
      correctAction: 'Recheck blood pressure once pain and vomiting have settled, and refer for outpatient blood pressure evaluation rather than treating a single pain-related reading as a new diagnosis.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ang_3',
      title: 'Incidental Old Chorioretinal Scar',
      description: 'Dilated fundus examination of the left eye, once safely possible, incidentally shows a small, flat, pigmented chorioretinal scar in the periphery, presumably old and inactive.',
      correctAction: 'No treatment needed; document the finding and reassure the patient, with no further work-up required.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A 58-year-old woman arrives with sudden severe pain in one red eye, blurred vision with coloured haloes, headache and vomiting, three hours after the pain began in a darkened room.',
      consequenceOnRight: 'A topical beta-blocker and alpha-agonist are instilled and a systemic carbonic anhydrase inhibitor is started immediately, with a wide-bore line secured, without waiting for any scan.',
      consequenceOnWrong: 'Treatment is delayed while a head scan is arranged for the headache and vomiting, and the pressure inside the eye continues to build while nothing is done for it.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'On examination the affected eye is red and painful with a hazy cornea, a fixed, mid-dilated oval pupil unreactive to light, and it feels stony-hard on gentle palpation compared with the other eye.',
      consequenceOnRight: 'The stony-hard globe, hazy cornea and fixed mid-dilated pupil are correctly recognised as a markedly raised pressure inside the eye, rather than a migraine, a red eye infection, or a primary neurological cause of the headache.',
      consequenceOnWrong: 'The presentation is mistaken for a migraine or an eye infection, and no pressure-lowering treatment is started while damage to the eye continues.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The pressure in the affected eye remains critically high despite the first-line topical drops, and the team must decide the next step in emergency treatment.',
      consequenceOnRight: 'An intravenous osmotic agent is added on top of the topical drops and the systemic carbonic anhydrase inhibitor, once renal and cardiac status have been checked.',
      consequenceOnWrong: 'No escalation is made, and the pressure inside the eye stays dangerously high for longer than necessary, risking permanent loss of vision.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'The patient keeps retching, and a colleague suggests giving a systemic anticholinergic for the nausea and vomiting.',
      consequenceOnRight: 'A systemic anticholinergic is avoided in favour of an antiemetic that does not dilate the pupil, since a mydriatic effect on the affected eye would push the iris further into the drainage recess and worsen the block.',
      consequenceOnWrong: 'A systemic anticholinergic is given for the vomiting; the pupil dilates further, the block worsens, and the pressure in the eye climbs even higher.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Once the affected eye has settled and the cornea has cleared enough for a laser procedure, the team reviews what should be planned before this woman leaves hospital.',
      consequenceOnRight: 'A definitive laser opening is performed on the affected eye once it is ready, and the same procedure is offered electively to the other eye once it is confirmed to share the same crowded drainage recess, since it carries a real risk of the same emergency later.',
      consequenceOnWrong: 'She is discharged on drops alone with no definitive procedure planned for either eye, leaving her at risk of a recurrence in the treated eye and a first episode in the other one.',
    },
  ],
};
