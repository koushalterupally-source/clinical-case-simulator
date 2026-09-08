import { CaseScaffold } from '../../types';

/**
 * A construction-site splash of wet lime/cement mix into one eye — a
 * strongly alkaline exposure and one of the few true minutes-matter
 * ophthalmic emergencies. The entire teaching spine of this case is
 * sequence: copious irrigation must begin within the first minute of
 * arrival, before history-taking, before a formal visual acuity, before
 * anything else — this is the one presentation where examining or
 * interviewing first is itself the harmful choice, modelled here via
 * `requiresFirst` on visual acuity checking and history-taking, both of
 * which point back at the irrigation therapy. Conjunctival surface pH
 * testing (litmus/narrow-range paper) is the objective marker that both
 * confirms an alkaline exposure and tells the team when irrigation has
 * actually achieved its goal — it is checked before irrigation, and
 * rechecked after, via `labShift`. Alkali is taught to penetrate deeper
 * and do more damage than an equivalent acid exposure, because it saponifies
 * cell membranes and keeps advancing rather than coagulating a barrier the
 * way an acid does — reinforced in the DIAGNOSIS gate. Attempting to
 * "neutralise" the substance with an opposing acid is modelled as an
 * outright harmful therapy: the reaction itself generates further thermal
 * injury on top of the original chemical one. See CASE_MODEL.md for the
 * therapy model this scaffold follows.
 *
 * The opening vignette and every gate's patientContext avoid the words
 * "alkali" and "chemical" — the two content words Test Suite 14 extracts
 * from conditionName ("injury" is filtered out as a stopword) — using "the
 * substance", "the mix" and "alkaline" (a different word, not blocked) in
 * their place instead.
 */
export const SCAFFOLD_CHEMICAL_EYE_INJURY: CaseScaffold = {
  id: 'scaffold_chemical_eye_injury',
  title: 'Severe Eye Pain and Inability to Open the Eye After a Splash on Site',
  conditionName: 'Alkali Chemical Eye Injury',
  subject: 'Ophthalmology',
  system: 'Ophthalmology',
  demographics: {
    name: 'Mohan Lal',
    age: 34,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 34-year-old male construction worker is rushed into the emergency department by his coworkers moments after a splash of wet lime-cement mix flew into his left eye while he was breaking up a bag of dry lime powder on site. He is in severe pain, unable to open the eye voluntarily, and tearing profusely. His coworkers say the whole thing happened about ten minutes ago — in their panic to get him to a hospital quickly, nobody thought to rinse the eye out first.',
  initialVitals: {
    hr: 98,
    bp: '138/86',
    rr: 20,
    spo2: 98,
    temp: '37.0°C',
    grbs: 118,
  },
  clinchingClue:
    'Conjunctival surface pH testing with narrow-range litmus paper touched to the inferior fornix reads a markedly alkaline pH of 11 (Reference 7.0–7.4) at presentation, confirming ongoing contact with an alkaline substance, while slit-lamp examination shows a ring of blanched, avascular conjunctiva and limbus over roughly four clock-hours around a hazy, centrally ulcerated cornea — the combination of a persistently abnormal surface pH and visible limbal blanching is what marks this as a significant, deeply penetrating exposure rather than a mild irritant splash, and is exactly why irrigation is continued and rechecked rather than stopped once the pain eases.',
  clinchingClueTimeMinutes: 10,
  examFindingsMap: {
    general: 'Distressed, marked blepharospasm of the left eye, unable to voluntarily open it, tearing profusely, holding a hand protectively over the left side of his face.',
    cvs: 'Tachycardic from pain, regular rhythm, normal heart sounds.',
    chest: 'Clear bilaterally, no respiratory distress.',
    abdomen: 'Soft, non-tender, no organomegaly.',
    cns: 'Alert and oriented, no focal neurological deficit, no other injury reported besides a small abrasion on the forehead from stumbling at the time of the splash.',
    eyes: 'Left eye: marked blepharospasm and profuse tearing; conjunctiva diffusely chemosed and injected with a ring of blanched, avascular conjunctiva and limbus visible over approximately four clock-hours; cornea hazy with a central epithelial defect, obscuring a clear view of iris detail; anterior chamber depth difficult to assess through the haze. Right eye: unaffected, white and quiet.',
    fundus: 'Left eye: view precluded by corneal haze. Right eye: normal disc, no abnormality.',
  },
  historyMap: {
    presenting: 'A splash of wet lime-cement mix flew into his left eye about ten minutes ago while breaking up a bag of dry lime powder at a construction site; coworkers brought him straight to the hospital without rinsing the eye out at the site.',
    exposure: 'The material was a lime-based masonry mix he was preparing; no attempt was made to wash the eye before arrival; he was not wearing any eye protection at the time.',
    ocular: 'No prior eye disease, no previous surgery on either eye, no known allergies to eye drops.',
    past: 'No known diabetes, no known hypertension, no other chronic illness.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    family: 'Non-contributory.',
    social: 'Works as a construction labourer for the past six years; no history of a similar exposure before; non-smoker, does not drink alcohol.',
  },
  investigationsMap: {
    ph_testing: {
      aliases: ['ph testing', 'litmus paper testing', 'conjunctival ph testing', 'ph paper test', 'surface ph testing'],
      resultText:
        'Conjunctival Surface pH Testing (litmus/narrow-range pH paper touched to the inferior fornix): pH 11 (Reference 7.0–7.4) at presentation — markedly alkaline, confirming ongoing contact with an alkaline substance and the need for continued irrigation until the surface reaches, and stays at, a neutral pH.',
      turnaroundMinutes: 2,
      category: 'monitoring',
      isIndicative: true,
    },
    slit_lamp_exam: {
      aliases: ['slit lamp examination', 'slit lamp'],
      resultText:
        'Slit-Lamp Examination: Left eye shows diffuse conjunctival chemosis and injection with a ring of blanched, avascular conjunctiva and limbus over approximately four clock-hours; the cornea shows a central epithelial defect with underlying stromal haze partially obscuring iris detail; anterior chamber depth is difficult to assess through the haze. Right eye: unremarkable.',
      turnaroundMinutes: 15,
      category: 'monitoring',
      isIndicative: true,
    },
    iop_tonometry: {
      aliases: ['tonometry', 'applanation tonometry', 'intraocular pressure measurement', 'iop measurement', 'iop', 'intraocular pressure'],
      resultText:
        'Applanation Tonometry: Intraocular pressure 24 mmHg in the left eye (Reference 10–21 mmHg), 16 mmHg in the right — mildly raised on the affected side, a recognised early complication from damage to the drainage angle, worth trending over the following days.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    fluorescein_staining: {
      aliases: ['fluorescein staining', 'fluorescein dye test', 'corneal fluorescein staining'],
      resultText:
        'Fluorescein Staining: A confluent central epithelial defect roughly 6 mm across stains bright green under blue light on the left cornea, with a smaller area of punctate staining at the margins; right eye unremarkable.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    corneal_sensation_test: {
      aliases: ['corneal sensation testing', 'corneal sensitivity test'],
      resultText:
        'Corneal Sensation Testing (cotton wisp): Reduced but present sensation over the affected area of the left cornea compared with the right — early reduction in the protective corneal reflex is a marker of deeper nerve involvement and worth re-checking as healing progresses.',
      turnaroundMinutes: 5,
      category: 'monitoring',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 14.6 g/dL (Reference 13.0–17.0 g/dL), WBC 8,100/mcL (Reference 4,000–11,000/mcL), Platelets 280,000/mcL (Reference 150,000–450,000/mcL) — unremarkable.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A normal blood count is routine admission screening; it does not grade the severity of a surface injury like this one and changes nothing about how urgently the eye itself needs irrigation and follow-up.',
    },
    rbs_grbs: {
      aliases: ['rbs / grbs', 'rbs', 'grbs', 'random blood sugar', 'blood sugar', 'rbs random blood sugar'],
      resultText:
        'Random Blood Sugar: 118 mg/dL — normal; worth knowing since poorly controlled glucose can slow corneal re-epithelialisation if underlying diabetes is later found, though it does not change today\'s emergency management.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    ct_orbit: {
      aliases: ['ct orbit', 'ct orbit plain', 'computed tomography orbit'],
      resultText: 'CT Orbit (plain): No radio-opaque foreign body, no orbital wall fracture, no free air — normal study.',
      turnaroundMinutes: 40,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote: 'There is no history of a high-velocity fragment or blunt impact here, only a liquid splash — an orbital scan has essentially no chance of showing anything relevant to a surface injury like this, and it simply delays the one thing that actually determines his outcome: uninterrupted irrigation, not a trip to the scanner.',
    },
  },
  therapiesMap: {
    copious_irrigation: {
      aliases: ['irrigate the eye', 'copious ocular irrigation', 'irrigate eye with normal saline', 'ocular irrigation', 'irrigation with normal saline', 'copious irrigation', 'irrigate with ringer lactate'],
      responseText: 'The eye is irrigated immediately and copiously with several litres of normal saline (Ringer lactate is an acceptable alternative) run through an irrigating lens, with the lids held open and the fornices swept to remove any retained particulate material; irrigation is continued until the conjunctival pH normalises and stays stable on a recheck five to ten minutes after stopping.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      labShift: {
        ph_testing: 'Conjunctival Surface pH Testing (repeat, after irrigation): pH 7.2 (Reference 7.0–7.4) and stable on recheck ten minutes later — irrigation goal achieved.',
      },
      rationale: 'Dilution and removal of the offending substance is the single most time-critical step in any splash of this kind — an alkaline substance keeps penetrating and raising tissue pH for as long as it stays in contact, so irrigation must start within the first minute of arrival, before history-taking, before a formal visual acuity, before anything else, and continue until the surface pH is confirmed neutral and stays that way.',
    },
    topical_anesthetic_before_irrigation: {
      aliases: ['proparacaine eye drops', 'topical anaesthetic drops', 'proparacaine', 'topical anesthetic eye drops'],
      responseText: 'Proparacaine 0.5% eye drops are instilled just before irrigation begins, breaking the blepharospasm enough for the lids to be held open and irrigation to proceed without a fight.',
      onsetMinutes: 2,
      appropriateness: 'indicated',
      rationale: 'A topical anaesthetic makes it possible to hold the eye open and irrigate effectively despite pain-driven blepharospasm; it is given alongside, not instead of, starting irrigation immediately.',
    },
    eyelid_speculum: {
      aliases: ['eyelid speculum', 'lid speculum', 'wire speculum insertion'],
      responseText: 'A lid speculum is inserted to hold the eyelids open, ensuring the irrigating fluid reaches the entire ocular surface including the fornices.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Blepharospasm can otherwise prevent fluid from reaching the upper and lower fornices, where residual particulate material is most likely to be trapped and keep causing damage; a speculum ensures irrigation is actually effective rather than merely attempted.',
    },
    visual_acuity_check: {
      aliases: ['visual acuity testing', 'visual acuity', 'va testing', 'visual acuity assessment', 'visual acuity check'],
      responseText: 'Visual acuity is formally recorded once irrigation is well under way: counting fingers at one metre in the left eye, 6/6 in the right.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      requiresFirst: ['copious_irrigation'],
      harmfulSequenceResponseText: 'Formal visual acuity testing is carried out before irrigation has been started; the substance continues sitting on and penetrating the ocular surface for the several extra minutes this takes, for a number that changes nothing about what needs to happen next.',
      harmfulSequenceVitalsEffect: { hr: 6 },
      harmfulSequenceRationale: 'A recorded visual acuity is useful for staging and documentation, but it does not change the one thing that actually determines his outcome in the first minutes: how quickly the substance is diluted and removed. Testing it first — however routine it feels in every other eye presentation — spends contact time the tissue does not have to spare; it is checked once irrigation is already running.',
      rationale: 'A baseline visual acuity is part of standard documentation and staging, taken once irrigation is already in progress so it never competes with the one step that is genuinely time-critical.',
    },
    detailed_history_taking: {
      aliases: ['detailed history taking', 'take a full history', 'full history taking', 'comprehensive history'],
      responseText: 'A detailed history — exactly what the substance was, how it was mixed, whether it was diluted, any prior eye disease — is taken once irrigation is already running, filled in by asking his coworkers while the fluid continues to flow.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      requiresFirst: ['copious_irrigation'],
      harmfulSequenceResponseText: 'A full history is taken in detail before irrigation is started — exactly what was in the mix, how it was stored, whether he wears glasses — none of which changes that dilution needed to begin the moment he arrived. The substance keeps acting on the eye\'s surface for as long as this conversation runs.',
      harmfulSequenceVitalsEffect: { hr: 6 },
      harmfulSequenceRationale: 'A thorough history is valuable and should absolutely be taken — but alongside, or immediately after, irrigation has begun, never before it. This is one of the few presentations where examining or interviewing before treating is itself the error, because the injury is actively worsening for every minute the substance remains in contact with the eye.',
      rationale: 'Once irrigation is running, filling in the details of exactly what happened costs nothing and helps guide follow-up planning — the harm is only ever in taking it first.',
    },
    cycloplegic_drops: {
      aliases: ['cyclopentolate eye drops', 'cyclopentolate', 'atropine eye drops for cycloplegia', 'cycloplegic drops'],
      responseText: 'Cyclopentolate 1% eye drops are instilled in the left eye for cycloplegia.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Cycloplegia relieves ciliary spasm and the associated pain, and helps prevent the iris from sticking to the lens while the anterior chamber is inflamed.',
    },
    topical_antibiotic_drops: {
      aliases: ['moxifloxacin eye drops', 'topical antibiotic eye drops', 'antibiotic eye drops'],
      responseText: 'Moxifloxacin 0.5% eye drops are started in the left eye.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'A large epithelial defect leaves the surface vulnerable to secondary bacterial infection while it re-epithelialises; prophylactic topical antibiotic cover is standard until the defect closes.',
    },
    topical_steroid_drops: {
      aliases: ['prednisolone acetate eye drops', 'topical steroid eye drops', 'prednisolone eye drops'],
      responseText: 'Prednisolone acetate 1% eye drops are started in the left eye on an hourly, tapering schedule.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Topical steroids in the first one to two weeks reduce the inflammatory cell infiltrate that would otherwise release collagenase and worsen stromal thinning; they are used early and then tapered, since continuing them unchanged beyond about ten to fourteen days itself raises the risk of corneal thinning by suppressing the cells that lay down new collagen.',
    },
    oral_vitamin_c: {
      aliases: ['oral vitamin c', 'ascorbic acid tablets', 'vitamin c supplementation'],
      responseText: 'Oral vitamin C (ascorbic acid) supplementation is started.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale: 'Ascorbate is a co-factor for collagen synthesis, and both topical and systemic supplementation are used in moderate-to-severe surface injuries of this kind to support stromal healing and reduce the risk of thinning.',
    },
    oral_doxycycline: {
      aliases: ['oral doxycycline', 'doxycycline tablets'],
      responseText: 'Oral doxycycline is started.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale: 'Doxycycline inhibits collagenase activity independent of its antibacterial effect, and is used as an adjunct in significant surface injuries to reduce the risk of progressive corneal thinning.',
    },
    ophthalmology_consult: {
      aliases: ['ophthalmology consult'],
      responseText: 'Ophthalmology consult requested urgently; the on-call ophthalmologist reviews the extent of limbal involvement and plans ongoing care and follow-up.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'The extent of limbal involvement seen here needs specialist grading and follow-up planning, including watching for delayed complications such as scarring between the lid and the eye surface, a secondary rise in pressure, or progressive thinning over the following weeks.',
    },
    attempted_neutralization: {
      aliases: ['wash the eye with vinegar', 'apply vinegar to neutralize', 'neutralize with a weak acid', 'chemical neutralization attempt', 'add an acid to cancel out the alkali'],
      responseText: 'A dilute acidic solution is instilled into the eye in an attempt to neutralise the alkaline substance.',
      onsetMinutes: 5,
      vitalsEffect: { hr: 12 },
      appropriateness: 'harmful',
      rationale: 'Deliberately mixing an acid with an alkaline substance on the ocular surface produces an exothermic neutralisation reaction, adding a fresh thermal injury on top of the original one — it is never the correct response to any splash like this. Copious dilution with a bland, sterile fluid is always the answer, never an opposing agent.',
    },
    delayed_treatment_wait_for_specialist: {
      aliases: ['wait for ophthalmologist before treating', 'defer treatment until specialist arrives', 'wait for senior review before starting treatment', 'hold off treatment until ophthalmologist arrives'],
      responseText: 'Treatment is held off "until the ophthalmologist has seen him and knows exactly what was splashed."',
      onsetMinutes: 0,
      vitalsEffect: { hr: 8 },
      appropriateness: 'harmful',
      rationale: 'Irrigation should never wait for a specialist opinion, a definitive identification of the substance, or any other test — every minute an alkaline substance remains in contact with the ocular surface, it continues to penetrate deeper and raise tissue pH further. This is emergency first aid that any member of the treating team should start immediately, with specialist review to follow once dilution is already under way.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /irrigat/i,
      name: 'Immediate Copious Irrigation Started',
      targetMilestoneMinutes: 5,
    },
    {
      orderOrActionPattern: /ph testing|litmus|ph paper/i,
      name: 'Surface pH Checked and Confirmed Neutral',
      targetMilestoneMinutes: 45,
    },
    {
      orderOrActionPattern: /ophthalmology consult/i,
      name: 'Ophthalmology Consult Requested',
      targetMilestoneMinutes: 30,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_cei_1',
      title: 'Incidental Old Corneal Scar in the Right Eye',
      description: 'Slit-lamp examination of the unaffected right eye incidentally shows a small paracentral scar, presumably old and unrelated to today\'s presentation.',
      correctAction: 'No action needed; note it for baseline reference only.',
      status: 'unnoticed',
    },
    {
      id: 'inc_cei_2',
      title: 'Mild Irritation of the Surrounding Eyelid Skin',
      description: 'Mild redness and irritation of the skin around the left eyelid is noted, where the splash also touched the skin, distinct from the surface injury to the eye itself.',
      correctAction: 'Gentle cleansing and a bland emollient are sufficient; no specific treatment is required beyond that.',
      status: 'unnoticed',
    },
    {
      id: 'inc_cei_3',
      title: 'Uncertain Tetanus Immunisation Status',
      description: 'A small abrasion is noted on his forehead from stumbling at the time of the splash, and he is unsure when he last had a tetanus booster.',
      correctAction: 'Give a tetanus toxoid booster if his immunisation status is uncertain or it has been more than five years since his last dose, and clean the abrasion appropriately.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A construction worker is wheeled in moments after a splash of a masonry mix into one eye, in severe pain and unable to open it, with his coworkers explaining that nobody rinsed the eye out before rushing him to hospital.',
      consequenceOnRight: 'Copious irrigation is started within the first minute, using whatever sterile fluid is on hand, before any history is taken and before a formal visual acuity is recorded.',
      consequenceOnWrong: 'History-taking and a formally documented visual acuity are completed first "to have a proper baseline," while the substance keeps sitting on the eye\'s surface for several more minutes.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Surface pH testing reads markedly abnormal, and slit-lamp examination shows a wide ring of blanched, avascular tissue around a hazy, centrally ulcerated cornea.',
      consequenceOnRight: 'This combination is recognised as a significant, deeply penetrating exposure — substances of this kind saponify tissue and keep advancing rather than being stopped by a coagulated barrier the way many other irritants are — and irrigation is continued and rechecked rather than stopped once his pain eases.',
      consequenceOnWrong: 'The eye is judged "not that inflamed" on a quick look, irrigation is stopped early once he reports feeling a little better, and the surface pH is never rechecked to confirm it has actually normalised.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Uncertain exactly what was splashed, someone on the team wonders aloud whether adding a mild acid to the eye might help cancel out whatever it was.',
      consequenceOnRight: 'Irrigation continues with plain sterile fluid only; no attempt is made to add an opposing agent, since mixing one on the eye\'s surface would generate heat and add a fresh injury on top of the first.',
      consequenceOnWrong: 'A dilute acid solution is instilled into the eye "to cancel it out," generating heat at the surface and adding a second injury to the first.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'By the end of the first week the surface looks markedly less inflamed, and a colleague suggests simply continuing the same topical steroid drops unchanged for as long as symptoms persist.',
      consequenceOnRight: 'The steroid is tapered within the recommended early window and stopped by around ten to fourteen days, since an exposure severe enough to have caused this much surface damage is also at risk of progressive thinning if the drops suppress collagen-forming cells for too long.',
      consequenceOnWrong: 'The drops are continued unchanged for weeks "since they are clearly helping," raising the risk of progressive thinning of the cornea.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Over the following days the team reviews what could still go wrong even though the surface pH normalised hours ago and the pain has settled.',
      consequenceOnRight: 'He is watched for a delayed rise in eye pressure, for scarring between the lid and the eye surface as it heals, and for thinning of the cornea for weeks after the surface looks superficially settled.',
      consequenceOnWrong: 'He is discharged as soon as the pain and redness improve, with no follow-up arranged to catch a late pressure rise, scarring, or thinning.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Before discharge planning begins, the team discusses what allowed his eye to go unprotected on site in the first place.',
      consequenceOnRight: 'He is counselled, and referred through his employer, on protective eyewear for any work involving lime, cement or similar materials, and his coworkers are told that immediate irrigation at the site — even with plain tap water — matters more than rushing straight to a hospital first.',
      consequenceOnWrong: 'He is discharged with no safety counselling and no correction of the belief that skipping irrigation to "get to a doctor faster" was the right call.',
    },
  ],
};
