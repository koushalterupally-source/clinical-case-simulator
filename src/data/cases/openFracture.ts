import { CaseScaffold } from '../../types';

/**
 * A high-energy limb injury with the bone communicating with the outside
 * world through a contaminated wound. Deliberately NOT a rebuild of the
 * compartment syndrome case: this scaffold's teaching centres on the
 * Gustilo-Anderson classification, TIME-CRITICAL antibiotics and tetanus
 * prophylaxis, correct irrigation/debridement and wound-closure strategy,
 * and neurovascular assessment bracketing any manipulation — not on
 * recognising a tense, pressure-driven limb. Compartment syndrome is
 * referenced only as a complication to keep watching for after splinting and
 * at the time of wound closure, never as this case's own diagnosis.
 *
 * `conditionName` is "Open Fracture of the Tibia" — its content words
 * ("open", "fracture", "tibia") are the words Test Suite 14 / caseSchema
 * extract and forbid from `openingVignette` and every gate's
 * `patientContext`. Those fields describe "a break to the bone of his leg"
 * with "the bone end visible through a wound in the skin" instead; the fully
 * explicit clinical vocabulary (open fracture, Gustilo-Anderson, tibia) is
 * used freely everywhere else — exam findings, history, investigation and
 * therapy text, none of which the validator checks.
 *
 * Two independently harmful therapies are modelled, each teaching a distinct
 * real error: repeatedly uncovering the wound on the ward for review (versus
 * one photograph and an undisturbed sterile dressing), and primary skin
 * closure at the first washout of a contaminated, high-energy wound (versus
 * leaving it open for planned delayed closure). Splinting/realignment is
 * gated behind a documented pre-manipulation neurovascular check, so a
 * deficit found afterward can be told apart from one the manipulation caused.
 *
 * See CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 */
export const SCAFFOLD_OPEN_FRACTURE: CaseScaffold = {
  id: 'scaffold_open_fracture',
  title: 'Bone Visible Through a Contaminated Leg Wound After a Fall',
  conditionName: 'Open Fracture of the Tibia',
  subject: 'Orthopedics',
  system: 'Orthopaedics',
  demographics: {
    name: 'Suraj Mehta',
    age: 34,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 34-year-old construction worker is brought to the emergency department after falling roughly three metres from scaffolding, landing directly on his lower right leg. There is a deep, heavily soiled wound over the front of his shin through which a jagged end of broken bone can be seen, with slow ongoing bleeding partially controlled by a pressure bandage the paramedics applied at the scene. He is in severe pain, and his foot on that side looks slightly pale compared with the other one.',
  initialVitals: {
    hr: 112,
    bp: '118/76',
    rr: 20,
    spo2: 97,
    temp: '37.0°C',
    grbs: 118,
  },
  clinchingClue:
    'Assessment of the wound and the underlying injury confirms an open fracture of the tibial shaft with a wound greater than 10 cm, moderate periosteal stripping and visible soil contamination within it, but with adequate surrounding soft tissue to allow coverage after debridement and no evidence of an arterial injury — placing this at Gustilo-Anderson type IIIA. The dorsalis pedis and posterior tibial pulses are both palpable, and sensation over the foot is intact and unchanged from the initial assessment, confirming the limb remains neurovascularly intact before any manipulation is attempted.',
  clinchingClueTimeMinutes: 30,
  examFindingsMap: {
    general: 'In severe pain, anxious, otherwise alert and appropriately responsive; no evidence of major blood loss beyond the visible wound.',
    cvs: 'Tachycardic, regular rhythm, normal heart sounds, blood pressure at the lower end of normal, capillary refill at the fingertips normal.',
    respiratory: 'Mildly tachypnoeic from pain, chest clear bilaterally, no added sounds.',
    pulses: 'Dorsalis pedis and posterior tibial pulses both palpable on the affected foot, only marginally fainter than the uninjured side; the foot looks mildly pale compared with the other, but capillary refill at the toes is within two seconds.',
    nervous: 'Alert and oriented, GCS 15/15. Sensation over the dorsum and sole of the affected foot is intact to light touch, and he can wiggle his toes, though this provokes significant pain.',
    skin: 'A 12 cm heavily soiled wound over the anterior shin, with a jagged bone end visible within it, moderate stripping of the tissue lining the bone at the wound edges, and slow ongoing bleeding partially controlled by a pressure bandage. Surrounding skin shows gross deformity and shortening of the limb below the wound, with obvious instability on gentle inspection.',
  },
  historyMap: {
    presenting: 'Fell approximately three metres from scaffolding at a construction site around 40 minutes ago, landing directly on the right leg, with an immediately visible wound and bone exposed at the site of injury.',
    past: 'No known diabetes, peripheral vascular disease or bleeding disorder; no previous fractures or surgeries.',
    medications: 'No regular medications.',
    allergies: 'No known drug allergies.',
    family: 'No relevant family history.',
    social: 'Works in construction; was not wearing designated safety equipment at the time of the fall.',
    immunisation: 'Tetanus immunisation history is uncertain — he is unsure of his last dose and there is no documentation available.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 12.6 g/dL (Reference 13.0–17.0 g/dL) — mildly low, consistent with blood loss from the wound, WBC 11,800/mcL (Reference 4,000–11,000/mcL) — mildly raised as an early stress response, Platelets 260,000/mcL (Reference 150,000–450,000/mcL).',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests', 'renal function tests kft urea creatinine', 'rft kidney function tests urea creatinine'],
      resultText: 'Renal Function: Blood Urea 28 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.9 mg/dL (Reference 0.6–1.2 mg/dL) — normal; a routine pre-operative baseline.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile', 'pt inr aptt'],
      resultText: 'PT/INR: PT 12.4 sec (Reference 11–13.5 sec), INR 1.0 (Reference 0.8–1.1), aPTT 28 sec (Reference 25–35 sec) — normal, satisfactory for proceeding to surgery.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    blood_group_crossmatch: {
      aliases: ['blood grouping & cross-match', 'blood grouping', 'cross match', 'blood group and crossmatch'],
      resultText: 'Blood Grouping & Cross-match: Group O, Rhesus D Positive. Two units held on file given ongoing wound bleeding and the anticipated surgical washout.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    xray_leg_ap_lat: {
      aliases: ['x-ray leg ap & lateral', 'x-ray leg', 'xray leg', 'x ray tibia fibula'],
      resultText: 'X-ray, Right Tibia/Fibula AP & Lateral: A displaced, comminuted fracture of the mid-shaft tibia with an associated fibular fracture at a similar level; no obvious intra-articular extension into the knee or ankle joint.',
      turnaroundMinutes: 25,
      category: 'imaging',
      isIndicative: true,
    },
    ct_leg: {
      aliases: ['ct leg', 'ct lower limb', 'computed tomography leg'],
      resultText: 'CT Lower Limb: Confirms the comminuted mid-shaft tibial fracture pattern already seen on plain film, with no additional joint-line extension identified.',
      turnaroundMinutes: 60,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A CT scan here mostly restates what the plain X-ray already showed. It has a real role in planning fixation when the break extends into a joint surface, but sending him to the scanner does not change the immediate priorities — antibiotics, tetanus status and getting to theatre for washout — and simply spends time better used moving those forward.',
    },
    superficial_wound_swab: {
      aliases: ['superficial wound swab', 'wound swab pre-debridement', 'skin swab culture'],
      resultText: 'Superficial Wound Swab (taken before debridement): Mixed skin and environmental flora grown — a sample of whatever organisms happen to be sitting on the wound surface before it has been cleaned.',
      turnaroundMinutes: 60,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A pre-debridement surface swab reflects surface contamination, not the organisms that end up driving a deep bone or soft-tissue infection later. The sample that actually guides antibiotic therapy if infection develops is the deep tissue culture taken at the time of surgical washout, not this one.',
    },
    intraop_deep_culture: {
      aliases: ['intraoperative deep tissue culture', 'deep tissue culture', 'intraoperative wound culture'],
      resultText: 'Intraoperative Deep Tissue Culture (taken at the time of surgical washout): Sent; result pending. This sample, taken from the deep wound bed after debridement rather than from the surface beforehand, is what will guide any change in antibiotic therapy if a deep infection later develops.',
      turnaroundMinutes: 240,
      category: 'labs',
      isIndicative: true,
    },
  },
  therapiesMap: {
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'access', 'iv two wide bore cannulae', 'two wide bore cannulae'],
      responseText: 'Two wide-bore (16G) IV cannulae are secured for fluids, antibiotics and analgesia.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable large-bore access is needed immediately for fluids, time-critical antibiotics and analgesia, and should be secured the moment he is assessed.',
    },
    iv_fluids: {
      aliases: ['ringer lactate 500 ml bolus', 'ringer lactate', 'iv fluids', 'fluid bolus', 'ringer lactate bolus'],
      responseText: 'Ringer Lactate is given intravenously to replace ongoing losses and support his blood pressure.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -8, bp: '124/80' },
      appropriateness: 'indicated',
      rationale: 'Modest crystalloid resuscitation supports his circulation while the wound is controlled and definitive care is arranged, given the blood loss already visible and the anticipated surgical procedure.',
    },
    analgesia: {
      aliases: ['morphine iv', 'morphine', 'iv morphine', 'iv analgesia'],
      responseText: 'IV morphine is titrated for pain control.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Adequate analgesia is a basic priority in severe pain from this injury, and should not be delayed while other assessments and orders are arranged.',
    },
    photograph_and_dress: {
      aliases: ['photograph wound & apply sterile dressing', 'photograph and dress wound', 'sterile saline dressing', 'photograph wound'],
      responseText: 'The wound is photographed once for the surgical team, then covered with a sterile saline-soaked dressing and left undisturbed.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'A single photograph gives the surgical and orthopaedic team everything they need to see without repeated exposure; a sterile dressing left in place until theatre limits further contamination and spares him repeated pain from re-exposure of an already badly soiled wound.',
    },
    neurovascular_exam_pre: {
      aliases: ['neurovascular assessment of the foot', 'neurovascular exam', 'check distal pulses and sensation', 'neurovascular check'],
      responseText: 'Pulses, capillary refill, sensation and active toe movement of the affected foot are checked and documented before anything is done to the limb.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'A documented baseline neurovascular examination before any manipulation is the only way to tell, afterward, whether a new deficit was already present from the original injury or was caused by the manipulation itself.',
    },
    align_and_splint: {
      aliases: ['gross realignment & splinting', 'realign and splint the limb', 'splint the limb', 'reduce and splint'],
      responseText: 'The limb is gently realigned to correct gross deformity and splinted in a well-padded backslab, and the neurovascular status of the foot is rechecked immediately afterward and found unchanged.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Correcting gross deformity and splinting reduces ongoing soft-tissue and neurovascular injury, eases pain, and helps control bleeding — but it must be bracketed by a neurovascular check immediately before and immediately after, precisely because the manipulation itself can injure a vessel or nerve that was previously intact.',
      requiresFirst: ['neurovascular_exam_pre'],
      harmfulSequenceResponseText: 'The limb is realigned and splinted without any neurovascular check having been done first. Afterward, the foot is noted to be cooler with a fainter pulse than before, but because no baseline was recorded, it cannot be said whether this is new or was already present.',
      harmfulSequenceVitalsEffect: { hr: 4 },
      harmfulSequenceRationale: 'Realignment and splinting can themselves stretch, kink or compress a vessel or nerve that was intact before the manipulation. Skipping the baseline check means a manipulation-induced injury cannot be distinguished from a pre-existing one, which can delay recognising and correcting a genuine new vascular problem.',
    },
    tetanus_prophylaxis: {
      aliases: ['inj tetanus toxoid', 'tetanus toxoid & immunoglobulin', 'tetanus toxoid', 'tetanus prophylaxis', 'tt and tig'],
      responseText: 'Tetanus toxoid is given intramuscularly, and tetanus immunoglobulin is added given his uncertain immunisation history and a heavily contaminated wound.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'A contaminated wound in a patient with an unclear or incomplete immunisation history needs both an active toxoid dose and passive immunoglobulin cover — this is not a wound that can be treated as "clean" for the purposes of tetanus risk, and it should not wait for the operating theatre.',
    },
    iv_cefazolin: {
      aliases: ['iv cefazolin', 'cefazolin', 'inj cefazolin', 'first generation cephalosporin'],
      responseText: 'IV cefazolin is given as soon as access is secured, covering the gram-positive skin flora most likely to cause a wound infection.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'A first-generation cephalosporin is standard cover for every grade of this injury and should be given as early as possible — time to the first antibiotic dose is directly linked to infection risk, so this should not wait for a theatre slot or a wound classification to be finalised.',
    },
    iv_gentamicin: {
      aliases: ['iv gentamicin', 'gentamicin', 'inj gentamicin', 'aminoglycoside'],
      responseText: 'IV gentamicin is added for extended gram-negative cover, given the size and contamination of the wound.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'A wound this large and heavily contaminated, with the soft-tissue and periosteal stripping already seen, needs added gram-negative cover beyond a first-generation cephalosporin alone.',
    },
    iv_penicillin: {
      aliases: ['iv penicillin', 'high-dose penicillin', 'inj penicillin g'],
      responseText: 'High-dose IV penicillin is added for anaerobic cover, given visible soil contamination within the wound.',
      onsetMinutes: 20,
      appropriateness: 'indicated',
      rationale: 'Soil-contaminated wounds carry an added risk of anaerobic organisms, including Clostridium species; high-dose penicillin is added specifically for this reason on top of the standard first-generation cephalosporin.',
    },
    irrigation_and_debridement: {
      aliases: ['irrigation and debridement', 'surgical debridement', 'wound washout', 'operative irrigation and debridement'],
      responseText: 'He is taken to theatre for formal surgical irrigation and debridement, with all devitalised tissue and gross contamination removed and copious pulsed lavage used to wash the wound.',
      onsetMinutes: 240,
      vitalsEffect: { hr: -8 },
      appropriateness: 'indicated',
      rationale: 'Formal surgical washout to remove dead tissue and contamination is what actually prevents infection here — antibiotics and a clean dressing reduce risk but cannot substitute for physically removing devitalised tissue and foreign material from a wound this contaminated, and it should be expedited given the degree of contamination seen, not deferred to the next routine list.',
    },
    primary_wound_closure: {
      aliases: ['primary closure of the wound', 'close the wound primarily', 'primary skin closure'],
      responseText: 'The skin over the wound is closed primarily at the end of the first washout, "to protect the bone."',
      onsetMinutes: 240,
      vitalsEffect: { hr: 6, temp: '37.8°C' },
      appropriateness: 'harmful',
      rationale: 'Closing a contaminated, high-energy wound primarily traps residual bacteria and dead space beneath intact skin, raising the risk of a deep infection and of a tensely swollen limb developing underneath a closed wound — exactly the pressure-driven complication a badly injured limb like this is already at risk of. Standard practice is to leave the wound open or only loosely approximated after washout, with formal closure or flap coverage planned once it is confirmed clean at a planned second look.',
    },
    repeated_wound_inspection: {
      aliases: ['repeatedly uncover and inspect wound', 'redress and inspect wound on ward', 'repeated wound inspection'],
      responseText: 'The dressing is removed and the wound re-examined several times over the next few hours by different members of the team on the ward.',
      onsetMinutes: 30,
      vitalsEffect: { hr: 4 },
      appropriateness: 'harmful',
      rationale: 'Once the wound has been photographed and adequately documented, each additional exposure adds contamination risk and unnecessary pain without providing any new clinical information — a single photograph and an undisturbed sterile dressing until theatre serves the same purpose without repeating the exposure.',
    },
    limb_elevation_monitoring: {
      aliases: ['elevate limb & monitor neurovascular status', 'elevate the limb', 'limb elevation and monitoring'],
      responseText: 'The splinted limb is elevated modestly on a pillow, level with or just above the heart, with neurovascular status and pain rechecked at regular intervals.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'Modest elevation helps control swelling after splinting, but the real value here is the accompanying structured reassessment — a high-energy fracture with this much soft-tissue injury remains at risk of a separate pressure-driven complication developing over the following hours, and escalating pain or a new deficit on repeat checks should prompt urgent reassessment rather than simply more analgesia.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /cefazolin|gentamicin|penicillin/i,
      name: 'IV Antibiotics Started',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /tetanus toxoid|tetanus prophylaxis|tt and tig/i,
      name: 'Tetanus Status Addressed',
      targetMilestoneMinutes: 90,
    },
    {
      orderOrActionPattern: /irrigation and debridement|surgical debridement|wound washout/i,
      name: 'Surgical Irrigation & Debridement',
      targetMilestoneMinutes: 360,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_of_1',
      title: 'Incidental Old Healed Wrist Fracture',
      description: 'Examination of the opposite limb incidentally reveals a well-healed, angulated old fracture of the wrist, apparently from childhood and never treated.',
      correctAction: 'No intervention needed for an old, asymptomatic healed fracture; note it in the record.',
      status: 'unnoticed',
    },
    {
      id: 'inc_of_2',
      title: 'Unexplained Mild Anaemia on Baseline CBC',
      description: 'His baseline haemoglobin is mildly low, slightly more than the visible wound bleeding alone would easily explain.',
      correctAction: 'Trend the haemoglobin after surgery and fluid resuscitation; investigate further with iron studies only if it fails to stabilise or falls further without an obvious ongoing source.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'A construction worker arrives with a heavily soiled wound over his shin through which the end of the broken bone can be seen, with slow ongoing bleeding and severe pain.',
      consequenceOnRight: 'Bleeding is controlled with direct pressure, IV access and analgesia are started immediately, and the wound is photographed once and covered with a sterile saline dressing rather than being repeatedly examined.',
      consequenceOnWrong: 'The wound is uncovered and re-examined by several people in turn while other priorities wait, adding contamination and pain without adding useful information.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'The wound is assessed for its size, degree of soiling, the amount of soft tissue lost around it, and whether the foot below it remains adequately perfused and sensate.',
      consequenceOnRight: 'A recognised classification system based on wound size, contamination, soft-tissue loss and vascular status is applied to grade the severity of this injury, which in turn guides both the antibiotic choice and how urgently he needs to reach theatre.',
      consequenceOnWrong: 'Severity is judged only by a glance at the wound without applying any structured system, risking either under-treating a more severe injury or over-treating a less severe one.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'IV access is secured and the wound is covered, and the team must decide how quickly to address infection risk given the heavy soiling seen in the wound and his uncertain immunisation history.',
      consequenceOnRight: 'Appropriate IV antibiotics, chosen to cover the added risk from the heavy contamination, and tetanus prophylaxis matched to his uncertain immunisation history are both given within the first hour, without waiting for a theatre slot to become free.',
      consequenceOnWrong: 'Antibiotics and tetanus prophylaxis are left until he reaches the operating theatre, losing the early window in which giving them promptly reduces infection risk the most.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'The limb is grossly deformed and needs to be realigned and splinted before he can be safely transferred or moved for further imaging.',
      consequenceOnRight: 'Pulses, sensation and toe movement in the foot are checked and documented before the limb is touched, the limb is then gently realigned and splinted, and the same checks are repeated immediately afterward to confirm nothing has changed.',
      consequenceOnWrong: 'The limb is realigned and splinted straight away with no neurovascular check beforehand, so if the foot is found to be less well perfused afterward, no one can say whether that change was already there or was caused by the manipulation itself.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'In theatre, after the wound has been washed out and all dead tissue removed, the surgical team discusses whether to close the skin over the wound at this same sitting.',
      consequenceOnRight: 'The wound is left open or only loosely approximated after washout, with definitive skin closure or coverage planned for a later, confirmed-clean second look.',
      consequenceOnWrong: 'The skin is closed over the wound at the first washout despite the degree of contamination seen, trapping bacteria and dead space beneath it and raising the risk of a deep infection developing unseen underneath the closed skin.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Some hours after splinting, his pain in the leg begins climbing again despite regular analgesia, and the toes on that side feel increasingly tight to move.',
      consequenceOnRight: 'Escalating pain and tightness after splinting are recognised as a possible sign of a separate, pressure-driven problem developing in the leg, prompting urgent reassessment of the limb rather than simply increasing the analgesic dose.',
      consequenceOnWrong: 'The escalating pain is treated only with more analgesia and the limb itself is not reassessed, risking a delayed diagnosis of a separate limb-threatening problem building on top of the original injury.',
    },
  ],
};
