import { CaseScaffold } from '../../types';

/**
 * A recurrent-stent patient on dual antiplatelet therapy presents with
 * ongoing bleeding from one nostril after mismanaging his own first aid at
 * home. The teaching spine is the escalation ladder itself, modelled as a
 * genuine `requiresFirst` chain: correct first-aid pressure, then a
 * topical vasoconstrictor with chemical cautery of a visualised point,
 * then anterior packing, then posterior packing — each rung reserved for
 * when the one before it has been tried and has not held, since each is
 * more uncomfortable and higher-risk than the last. A second, quieter
 * teaching point sits underneath: blood seen running down the throat does
 * not by itself mean a deeper, posterior source — it is also exactly what
 * happens when someone (wrongly) tilts the head back, redirecting the
 * bleed down the throat instead of controlling it, which is why the
 * incorrect head-tilt/bony-bridge technique is modelled as a genuinely
 * harmful therapy rather than a harmless folk remedy. Anticoagulation
 * (here, dual antiplatelet therapy eight months after a drug-eluting
 * stent) is modelled as a modifier: local measures are tried first, and
 * any decision to interrupt it needs cardiology input weighing stent
 * thrombosis risk against the bleed, never a reflexive bedside call. See
 * CASE_MODEL.md for the therapy model this scaffold follows.
 *
 * The opening vignette and every gate's patientContext avoid the word
 * "epistaxis" — the one content word Test Suite 14 extracts from
 * conditionName — using "bleeding from his nose" and "the bleed" in its
 * place instead.
 */
export const SCAFFOLD_EPISTAXIS: CaseScaffold = {
  id: 'scaffold_epistaxis',
  title: 'Ongoing Bleeding From One Side of the Nose After Failed Home First Aid',
  conditionName: 'Epistaxis',
  subject: 'ENT',
  system: 'Nose & Sinuses',
  demographics: {
    name: 'Balbir Singh',
    age: 68,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 68-year-old man is brought to the emergency department with bleeding from his right nostril that started spontaneously two hours ago while he was gardening. He tried pinching the bony top part of his nose and tilting his head back at home, but the bleeding has continued on and off, and for the last twenty minutes he has also been spitting out blood trickling down the back of his throat. He feels lightheaded and has vomited once, bringing up a small amount of swallowed blood.',
  initialVitals: {
    hr: 108,
    bp: '158/94',
    rr: 20,
    spo2: 97,
    temp: '37.0°C',
    grbs: 132,
  },
  clinchingClue:
    'Anterior rhinoscopy, performed after the nose is cleared of clots and a topical decongestant is sprayed in, reveals a discrete point actively oozing from Little\'s area on the anterior part of the right nasal septum, with no second source seen more posteriorly on nasal endoscopy — confirming this is a bleed from the anterior plexus rather than a deeper vessel, even though blood had been pooling in his throat simply because he had been tilting his head backward at home instead of leaning forward.',
  clinchingClueTimeMinutes: 20,
  examFindingsMap: {
    general: 'Anxious and mildly pale, holding a blood-stained tissue to his nose, intermittently spitting blood-tinged saliva into a bowl.',
    cvs: 'Tachycardic, regular rhythm, normal heart sounds, blood pressure at the upper end of his usual range; warm peripheries with a normal capillary refill.',
    chest: 'Clear bilaterally, no respiratory distress; no aspiration sounds.',
    abdomen: 'Soft, non-tender, no guarding; vomited once, bringing up swallowed blood rather than fresh haematemesis.',
    cns: 'Alert and oriented, mildly lightheaded when sat upright, no focal neurological deficit.',
    ent: 'Right nostril: active oozing seen anteriorly once clots are cleared, no obvious mass or foreign body. Left nostril: clear, dried blood at the vestibule only from earlier trickling. Oropharynx: streaks of old blood on the posterior pharyngeal wall from earlier swallowed blood.',
  },
  historyMap: {
    presenting: 'Bleeding from the right nostril for two hours, started spontaneously without trauma while gardening; tried pinching the bony bridge of the nose and tilting the head back at home without stopping it, then noticed blood trickling down the back of his throat.',
    past: 'Hypertension for five years on amlodipine; a drug-eluting coronary stent placed eight months ago after a heart attack, currently on dual antiplatelet therapy (aspirin and clopidogrel); no known bleeding disorder.',
    medications: 'Amlodipine 5 mg once daily; aspirin 75 mg and clopidogrel 75 mg once daily since his stent; occasional ibuprofen for knee pain over the last week.',
    allergies: 'No known drug allergies.',
    family: 'Non-contributory; no family history of a bleeding disorder.',
    social: 'Retired, enjoys gardening; occasional alcohol, non-smoker; no history of nose-picking reported by him, though his wife mentions he does it often when watching television.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 11.8 g/dL (Reference 13.0–17.0 g/dL), WBC 9,200/mcL (Reference 4,000–11,000/mcL), Platelets 240,000/mcL (Reference 150,000–450,000/mcL) — mildly low haemoglobin in keeping with visible and swallowed blood loss over the last two hours; a normal platelet count argues against a primary platelet disorder.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    coagulation_profile: {
      aliases: ['pt inr aptt', 'coagulation profile', 'pt/inr', 'aptt', 'prothrombin time inr'],
      resultText:
        'Coagulation Profile: PT 13.2 seconds with INR 1.1 (Reference INR 0.8–1.2), aPTT 30 seconds (Reference 25–35 seconds) — both normal. Aspirin and clopidogrel act on platelet function rather than the clotting cascade, so a normal INR and aPTT here do not rule out a bleeding tendency from his antiplatelet therapy.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    blood_grouping_crossmatch: {
      aliases: ['blood grouping & cross-match', 'blood grouping', 'cross match'],
      resultText: 'Blood Grouping & Cross-match: Group O Positive. Two units held on standby given ongoing visible and swallowed blood loss while on dual antiplatelet therapy.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    anterior_rhinoscopy: {
      aliases: ['anterior rhinoscopy', 'anterior nasal examination'],
      resultText:
        'Anterior Rhinoscopy: After clearing clots and applying a topical decongestant, a discrete point is seen actively oozing from Little\'s area on the anterior right nasal septum; no polyp, foreign body or obvious growth seen.',
      turnaroundMinutes: 10,
      category: 'procedures',
      isIndicative: true,
    },
    nasal_endoscopy: {
      aliases: ['nasal endoscopy', 'rigid nasal endoscopy', 'flexible nasoendoscopy'],
      resultText:
        'Nasal Endoscopy: No second bleeding source is seen more posteriorly; the postnasal space and posterior septum are clear once the anterior point is controlled, arguing against a separate, deeper source.',
      turnaroundMinutes: 20,
      category: 'procedures',
      isIndicative: true,
    },
    ecg: {
      aliases: ['ecg', 'electrocardiogram', 'ekg'],
      resultText: 'ECG: Sinus tachycardia at 108/min, no ST-segment or T-wave changes to suggest acute ischaemia — a reassuring baseline given his stent, though it should be repeated if he develops chest pain or any new symptom.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    rft_kft: {
      aliases: ['rft / kft (urea, creatinine)', 'rft', 'kft', 'kidney function tests', 'renal function tests', 'renal function tests kft urea creatinine', 'rft kidney function tests urea creatinine'],
      resultText: 'Renal Function: Blood Urea 28 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.0 mg/dL (Reference 0.6–1.2 mg/dL) — normal, and a useful baseline before any procedure or sedation.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    ct_angiogram_face: {
      aliases: ['ct angiogram face', 'ct angiography face and neck', 'computed tomography angiography face'],
      resultText: 'CT Angiography of the Face and Neck: No active contrast extravasation identified at the time of the scan; the visualised nasal and facial vasculature is otherwise unremarkable.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote:
        'This is reserved for bleeding that has genuinely failed pressure, cautery and packing, to plan embolisation of a specific vessel — ordering it as a first step here sends a patient who is still actively losing blood to a scanner instead of applying the simple bedside measures that control the overwhelming majority of bleeds like his, adding a contrast load and a transport delay for no benefit at this stage.',
    },
  },
  therapiesMap: {
    correct_first_aid_position: {
      aliases: ['lean forward and pinch soft part of nose', 'correct first aid position', 'pinch the soft part of the nose', 'lean forward pinch nose 10 minutes', 'apply firm continuous pressure leaning forward'],
      responseText: 'He is repositioned sitting up and leaning forward, and firm continuous pressure is applied by pinching the soft, cartilaginous lower part of the nose (not the bony bridge) for a full ten to fifteen minutes, with an ice pack placed over the bridge and nape of the neck; he is told to spit out blood rather than swallow it.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Leaning forward keeps blood from running down the throat and being swallowed or aspirated, and firm pressure on the soft cartilaginous part directly compresses the vessels of the anterior septal plexus, where the overwhelming majority of bleeds like this originate — this alone controls a large proportion of cases and should always be tried, done correctly, before anything else.',
    },
    incorrect_first_aid_headtilt: {
      aliases: ['tilt head back and pinch bony bridge', 'tilt the head back', 'pinch the bony bridge of the nose', 'head tilted back with pressure on bridge'],
      responseText: 'The head is tilted back and pressure is applied over the bony bridge of the nose.',
      onsetMinutes: 5,
      vitalsEffect: { hr: 4 },
      appropriateness: 'harmful',
      rationale: 'Tilting the head back does not compress the bleeding vessels at all — it simply redirects blood down the back of the throat, where it is swallowed or can be aspirated, and can provoke vomiting of swallowed blood as already happened here. Pressure on the bony bridge similarly misses the soft anterior septal plexus entirely. Neither step controls the bleeding; both just hide it by sending it down the throat instead of out the nostril.',
    },
    topical_vasoconstrictor_cautery: {
      aliases: ['topical vasoconstrictor spray', 'silver nitrate cautery', 'chemical cautery of bleeding point', 'topical decongestant and cautery', 'oxymetazoline spray and cautery'],
      responseText: 'A topical vasoconstrictor spray is applied, and once the bleeding point is visualised on the anterior septum, it is chemically cauterised with a silver nitrate stick.',
      onsetMinutes: 10,
      appropriateness: 'indicated',
      requiresFirst: ['correct_first_aid_position'],
      harmfulSequenceResponseText: 'Cautery is attempted before basic pressure has been given a chance to work; the nose is still actively bleeding and full of fresh blood, the bleeding point cannot be clearly seen, and the attempt has to be abandoned and repeated once the nose has been cleared and pressure has settled the flow enough to see the source.',
      harmfulSequenceVitalsEffect: { hr: 5 },
      harmfulSequenceRationale: 'A bleeding point can only be cauterised once it can actually be seen — a nose still pouring fresh blood from unattempted first aid obscures the view completely. Simple pressure, done correctly first, is what clears the field enough for cautery to have a target.',
      rationale: 'For a visualised, discrete anterior bleeding point that has not settled with pressure alone, chemical cautery seals the vessel directly and is the next rung of the escalation ladder before resorting to packing.',
    },
    anterior_nasal_packing: {
      aliases: ['anterior nasal packing', 'nasal tampon insertion', 'anterior nasal pack', 'ribbon gauze packing'],
      responseText: 'An anterior nasal pack (an expandable nasal tampon impregnated with a topical haemostatic/vasoconstrictor) is inserted into the right nostril, applying direct pressure along the length of the nasal cavity.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      requiresFirst: ['topical_vasoconstrictor_cautery'],
      harmfulSequenceResponseText: 'A pack is inserted before pressure and cautery have been given a chance to work; the bleeding point was never clearly identified, and the pack has to be adjusted and the nose re-examined once the acute flow has settled enough to actually see where the blood is coming from.',
      harmfulSequenceVitalsEffect: { hr: 4 },
      harmfulSequenceRationale: 'Packing is meant for a bleed that has not responded to pressure and cautery, or one whose source could not be pinned down for cautery — reaching for it before those simpler, less uncomfortable steps skips the ladder and packs a nose whose bleeding point was never actually confirmed.',
      rationale: 'When pressure and cautery do not fully control the bleeding, or a discrete point cannot be cauterised, an anterior pack tamponades the anterior plexus directly and is the standard next step before considering a posterior pack.',
    },
    posterior_nasal_packing: {
      aliases: ['posterior nasal packing', 'posterior pack', 'foley catheter balloon posterior pack', 'postnasal pack'],
      responseText: 'A Foley catheter balloon is passed through the nostril into the postnasal space, inflated, and drawn gently forward to tamponade the posterior nasal cavity, combined with anterior packing of the same side; he is admitted for close monitoring given the discomfort and risk of this technique.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      requiresFirst: ['anterior_nasal_packing'],
      harmfulSequenceResponseText: 'A posterior pack is placed before an anterior pack has even been tried; the bleeding was never confirmed to be refractory to simpler measures, and he is now committed to an uncomfortable technique with its own risk of a sudden drop in heart rate and oxygen levels, admission and specialist monitoring, for a bleed that anterior packing alone might well have controlled.',
      harmfulSequenceVitalsEffect: { hr: -10, spo2: -3 },
      harmfulSequenceRationale: 'Posterior packing is reserved for bleeding that persists despite an adequately placed anterior pack, precisely because it is far more uncomfortable, usually needs admission and continuous monitoring, and carries a recognised risk of a reflex fall in heart rate and oxygen saturation. Reaching for it before anterior packing has been tried and shown inadequate exposes him to that risk for no reason.',
      rationale: 'When bleeding continues despite an adequately placed anterior pack, tamponading the posterior nasal cavity as well is the next step, since a source too far back for an anterior pack to reach is now more likely — but it should prompt admission, ENT input, and consideration of a definitive procedure if it still fails.',
    },
    ent_consult_embolization_referral: {
      aliases: ['ent consult', 'otolaryngology consult', 'interventional radiology referral for embolization', 'sphenopalatine artery ligation referral'],
      responseText: 'ENT is consulted; given ongoing bleeding despite packing and his antiplatelet therapy, they discuss endoscopic sphenopalatine artery ligation or referral for angiographic embolisation if packing does not hold.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'A bleed that continues despite an adequately placed posterior pack, or recurs when it is removed, is an indication for a definitive procedure — endoscopic ligation of the feeding vessel or angiographic embolisation — rather than repeated packing alone.',
    },
    iv_access_fluids: {
      aliases: ['iv access', 'two wide-bore iv cannulae', 'ringer lactate bolus', 'iv fluids', 'wide bore cannula'],
      responseText: 'Two wide-bore IV cannulae are secured and Ringer lactate is started, given the volume of blood lost and swallowed.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -8, bp: '142/88' },
      appropriateness: 'indicated',
      rationale: 'Significant nasal bleeding, especially swallowed blood that is not directly visible, can cause real volume loss — securing access and starting fluid resuscitation addresses his circulation while the bleeding itself is being controlled, and should never be deferred purely to focus on the nose.',
    },
    cardiology_consult_before_antiplatelet_change: {
      aliases: ['cardiology consult', 'cardiology review before stopping antiplatelets'],
      responseText: 'Cardiology is consulted before any change is made to his dual antiplatelet therapy, given his stent was placed only eight months ago.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Local measures — pressure, cautery, packing — are tried first and usually control bleeding without ever needing to touch his antiplatelet regimen. A recent stent carries a real risk of clotting off if dual antiplatelet therapy is stopped abruptly, so any decision to interrupt it — should local measures fail and the bleeding become genuinely life-threatening — needs to weigh that risk with cardiology input rather than being made unilaterally at the bedside.',
    },
    abrupt_dual_antiplatelet_stop: {
      aliases: ['stop both aspirin and clopidogrel', 'discontinue dual antiplatelet therapy', 'stop all antiplatelets immediately'],
      responseText: 'Both aspirin and clopidogrel are stopped immediately on the treating team\'s own initiative, without discussing it with cardiology.',
      onsetMinutes: 5,
      appropriateness: 'harmful',
      rationale: 'Abruptly stopping dual antiplatelet therapy within the first year after a drug-eluting stent carries a real risk of the stent clotting off and causing a heart attack — a risk that is usually far greater than the risk from a bleed that local measures can control. This decision should never be made reflexively at the bedside without cardiology input, and almost never needs to be made at all if pressure, cautery and packing are given a proper chance first.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /lean forward and pinch|correct first aid position|pinch the soft part/i,
      name: 'Correct First-Aid Pressure Applied',
      targetMilestoneMinutes: 10,
    },
    {
      orderOrActionPattern: /iv access|wide-bore iv cannulae|ringer lactate/i,
      name: 'IV Access and Fluids Secured',
      targetMilestoneMinutes: 20,
    },
    {
      orderOrActionPattern: /silver nitrate cautery|topical vasoconstrictor spray|chemical cautery/i,
      name: 'Bleeding Point Visualised and Cauterised',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /anterior nasal pack|nasal tampon/i,
      name: 'Anterior Packing If Cautery Does Not Hold',
      targetMilestoneMinutes: 60,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_epi_1',
      title: 'Incidental Nasal Septal Deviation',
      description: 'Anterior rhinoscopy incidentally shows a mild leftward deviation of the nasal septum, on the side opposite to today\'s bleeding.',
      correctAction: 'No intervention needed acutely; mention it for outpatient ENT follow-up only if it later causes symptomatic obstruction.',
      status: 'unnoticed',
    },
    {
      id: 'inc_epi_2',
      title: 'Blood Pressure Remaining Elevated Beyond the Acute Stress Response',
      description: 'His blood pressure remains above 150/90 mmHg even after the bleeding is controlled and he has calmed down.',
      correctAction: 'Review and optimise his existing antihypertensive regimen as an outpatient rather than treating a single post-bleed reading as a new emergency.',
      status: 'unnoticed',
    },
    {
      id: 'inc_epi_3',
      title: 'Chronic Nasal Crusting From Habitual Nose-Picking',
      description: 'Examination of the unaffected left nostril incidentally shows crusting and mild mucosal thickening consistent with chronic minor trauma from habitual nose-picking, as his wife describes.',
      correctAction: 'Counsel him on avoiding nose-picking and consider a saline nasal gel or emollient for dryness; no acute intervention needed.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A 68-year-old man arrives with ongoing bleeding from one side of his nose that started two hours ago; he says he tried pinching the top bony part of his nose and tilting his head back at home without much effect, and has now started spitting blood from the back of his throat as well.',
      consequenceOnRight: 'He is sat up leaning forward and shown to pinch the soft lower part of the nose firmly for a full ten to fifteen minutes with an ice pack applied, rather than repeating what he tried at home.',
      consequenceOnWrong: 'The same tilted-back, bony-bridge technique he already tried unsuccessfully is repeated in the department, and blood continues to be swallowed and trickle down his throat instead of being controlled.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Once the nose is cleared of clots and sprayed with a topical decongestant, the team has to work out where the bleeding is actually coming from, given that blood has also been seen running down the back of his throat.',
      consequenceOnRight: 'A discrete point is looked for directly on the anterior part of the septum before assuming a deeper source; when one is found there, the throat trickle is correctly attributed to his earlier head-back positioning rather than to a second, more posterior source.',
      consequenceOnWrong: 'The blood seen in his throat is taken as proof of a deeper, harder-to-reach source without ever looking for an anterior point first, and management jumps straight to packing without confirming where the bleeding is actually coming from.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Firm pressure alone has not fully stopped the bleeding, and the team must decide what to try next.',
      consequenceOnRight: 'The bleeding point is visualised and chemically cauterised before anything more invasive is tried, escalating to a nasal pack only if cautery does not hold.',
      consequenceOnWrong: 'A nasal pack is inserted straight away without ever looking for or attempting to cauterise a visible bleeding point, subjecting him to a more uncomfortable procedure than the bleeding may have needed.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'He has now vomited a small amount of swallowed blood and reports feeling lightheaded, with a fast heart rate and a blood pressure at the lower end of what is usual for him.',
      consequenceOnRight: 'Attention turns to securing IV access and starting fluids for his circulation alongside — not instead of — controlling the nose, recognising that swallowed blood can cause real volume loss even when the visible bleeding looks modest.',
      consequenceOnWrong: 'All attention stays on the nose itself while his circulation is left unaddressed, on the assumption that bleeding from the nose alone cannot make someone unwell.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'The team learns he had a heart stent placed eight months ago and takes two antiplatelet tablets daily, and someone suggests simply stopping both immediately to help the bleeding settle.',
      consequenceOnRight: 'Local measures are tried first and cardiology is consulted before either antiplatelet drug is touched, since stopping them abruptly this soon after a stent carries a real risk of it clotting off.',
      consequenceOnWrong: 'Both antiplatelet drugs are stopped on the spot without any specialist input, trading a controllable bleed for a real risk of the stent occluding.',
    },
    {
      roleTag: 'PREVENTION',
      patientContext: 'Once the bleeding is controlled and he is ready for discharge, the team reviews what should be explained to prevent a repeat episode.',
      consequenceOnRight: 'He is taught the correct first-aid technique for any future bleeding, counselled on avoiding nose-picking and forceful nose-blowing, and his blood pressure control is reviewed as an outpatient rather than left unaddressed.',
      consequenceOnWrong: 'He is discharged with no first-aid teaching and no review of his blood pressure control, leaving him to repeat the same ineffective head-tilt technique if it happens again.',
    },
  ],
};
