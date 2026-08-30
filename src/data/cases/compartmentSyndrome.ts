import { CaseScaffold } from '../../types';

/**
 * A closed tibial fracture, several hours out, with pain climbing far past
 * what two doses of morphine and a well-reduced fracture would explain. The
 * exam findings are written so the candidate has to act on pain out of
 * proportion and pain on passive stretch — the earliest and most reliable
 * signs — rather than waiting for pulselessness, pallor or paralysis, which
 * are LATE findings: a preserved pulse here must never be read as reassurance.
 * The case rewards releasing every external constriction (cast, padding,
 * bandage) immediately and keeping the limb at heart level, punishes
 * elevation and empirical anticoagulation for a presumed clot, and models
 * needle manometry with the diastolic-minus-tissue-pressure (delta) margin
 * as a confirmatory test in equivocal cases — never a reason to wait once the
 * clinical picture is already clear. It also carries the systemic
 * complication: myoglobinuric renal failure and hyperkalaemia from muscle
 * injury, tracked with CK, urine myoglobin, fluids and potassium monitoring.
 * See CASE_MODEL.md for the therapy model this scaffold follows (indicated /
 * neutral / harmful, requiresFirst sequencing).
 */
export const SCAFFOLD_COMPARTMENT: CaseScaffold = {
  id: 'scaffold_compartment_syndrome',
  title: 'Escalating Leg Pain After a Tibial Fracture',
  conditionName: 'Acute Compartment Syndrome of the Leg',
  subject: 'Orthopedics',
  system: 'Orthopaedics',
  demographics: {
    name: 'Rohan Verma',
    age: 23,
    gender: 'Male',
    setting: 'Ward',
  },
  openingVignette:
    'A 23-year-old man was brought in six hours ago after his motorcycle skidded on a wet road, sustaining a closed fracture of the mid-shaft of the tibia and fibula that was reduced and placed in a well-padded below-knee cast. On the trauma ward this evening he keeps pressing the call bell for pain in the leg that two doses of IV morphine have barely touched, describing it as a deep, unrelenting ache far beyond what he felt at the time of the injury. The nurse notes he cries out sharply when his toes are gently moved.',
  initialVitals: {
    hr: 118,
    bp: '138/86',
    rr: 22,
    spo2: 98,
    temp: '37.0°C',
    grbs: 104,
  },
  clinchingClue:
    'Passive extension and flexion of the toes reproduces severe pain radiating up the leg, clearly out of proportion to a reduced, well-immobilised fracture; once the cast is opened, the anterior and lateral leg is tensely swollen, shiny and firm on palpation compared with the other side, with reduced sensation over the first dorsal web space. The dorsalis pedis pulse is still faintly palpable — a preserved pulse at this stage does not rule the process out, since pulselessness only appears late, once perfusion has already failed.',
  clinchingClueTimeMinutes: 10,
  examFindingsMap: {
    general: 'Anxious and clearly distressed, repeatedly asking for more analgesia; lying rigidly still because any movement of the leg provokes severe pain.',
    cardiovascular: 'Tachycardic, regular rhythm, blood pressure mildly elevated from pain. Dorsalis pedis and posterior tibial pulses on the affected side are present, only marginally fainter than the other foot at this stage.',
    pulses: 'Dorsalis pedis and posterior tibial pulses are both palpable on the affected foot, only marginally weaker than the uninjured side. A preserved pulse here does not exclude a serious problem — pulselessness is a late finding that appears only once perfusion has already failed, and waiting for it to disappear before acting is the classic error.',
    respiratory: 'Chest clear bilaterally, mildly tachypnoeic from pain, no added sounds.',
    abdomen: 'Soft, non-tender, normal bowel sounds.',
    nervous: 'Alert and oriented, GCS 15/15, in obvious distress from pain. Reports new tingling and reduced sensation over the web space between the first and second toes on the affected foot.',
    skin: 'With the below-knee cast opened for inspection, the anterior and lateral leg is tensely swollen, shiny and firm to palpation, distinctly tenser than the contralateral leg. Skin colour is normal and capillary refill at the toes is at the upper limit of normal at three seconds. Passive dorsiflexion and plantarflexion of the toes reproduces severe pain out of proportion to the injury.',
  },
  historyMap: {
    start: 'Sustained a closed fracture of the tibia and fibula in a motorcycle accident approximately six hours ago; it was reduced and placed in a below-knee cast in the emergency department at that time.',
    worse: 'Pain has progressively worsened over the last two to three hours despite two doses of intravenous morphine, and is markedly worse when the toes are moved passively or the cast presses on the leg.',
    past: 'No known diabetes, peripheral vascular disease or bleeding disorder. No previous fractures or surgeries.',
    medications: 'Two doses of IV morphine given on the ward for pain over the last three hours, with only partial and short-lived relief.',
    allergies: 'No known drug allergies.',
    family: 'No family history of a bleeding or clotting disorder.',
    immunisation: 'Tetanus immunisation reported up to date; the fracture was closed, with no skin breach requiring prophylaxis on this admission.',
  },
  investigationsMap: {
    pressure_measurement: {
      aliases: ['compartment pressure measurement (needle manometry)', 'compartment pressure measurement', 'needle manometry', 'intracompartmental pressure measurement'],
      resultText: 'Intracompartmental Pressure, anterior compartment, needle manometry: absolute pressure 68 mmHg (reference resting pressure <10–12 mmHg). Current diastolic blood pressure is 74 mmHg, giving a perfusion margin (diastolic BP minus tissue pressure) of only 6 mmHg — well under the roughly 30 mmHg margin below which urgent surgical decompression is indicated. Useful to confirm an equivocal picture, but the clinical findings here were already clear and treatment should not have waited for this number.',
      turnaroundMinutes: 10,
      category: 'procedures',
      isIndicative: true,
    },
    serum_ck: {
      aliases: ['serum ck (total)', 'serum ck', 'creatine kinase', 'ck total'],
      resultText: 'Serum CK (total): 18,600 U/L (Reference 30–200 U/L) — markedly elevated, indicating significant muscle injury.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    urine_myoglobin: {
      aliases: ['urine myoglobin'],
      resultText: 'Urine Myoglobin: strongly positive. Urine dipstick is strongly positive for blood, but microscopy shows no red blood cells — a pattern typical of pigment release from injured muscle rather than true bleeding into the urine.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    serum_electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'serum electrolytes', 'serum potassium'],
      resultText: 'Serum Electrolytes: Sodium 138 mEq/L (Reference 135–145), Potassium 5.6 mEq/L (Reference 3.5–5.0) — mildly elevated, Chloride 101 mEq/L (Reference 98–106). Potassium should be trended closely given the muscle injury, with continuous cardiac monitoring if it rises further.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText: 'Renal Function: Blood Urea 32 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.3 mg/dL (Reference 0.6–1.2 mg/dL) — mildly elevated, consistent with early kidney stress from circulating muscle pigment; should be trended alongside fluids and urine output.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText: 'CBC: Hb 13.8 g/dL (Reference 13.0–17.0 g/dL), WBC 13,200/mcL (Reference 4,000–11,000/mcL) — mildly raised, consistent with the stress of significant soft-tissue and muscle injury, Platelets 240,000/mcL (Reference 150,000–450,000/mcL).',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    coag_pt_inr: {
      aliases: ['pt / inr', 'coagulation profile'],
      resultText: 'PT/INR: PT 12.8 sec (Reference 11–13.5 sec), INR 1.0 (Reference 0.8–1.1), aPTT 29 sec (Reference 25–35 sec) — normal, satisfactory for proceeding to urgent surgery.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    vbg: {
      aliases: ['vbg'],
      resultText: 'Venous Blood Gas: pH 7.33 (Reference 7.32–7.38 venous), HCO3 19 mEq/L (Reference 22–26 mEq/L), Lactate 2.6 mmol/L (Reference 0.5–2.0 mmol/L) — mild metabolic acidosis with elevated lactate, in keeping with significant muscle injury; potassium on this sample reads 5.5 mEq/L and should be confirmed on a formal serum sample.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    urine_routine: {
      aliases: ['urine routine & microscopy'],
      resultText: 'Urine Routine & Microscopy: dipstick strongly positive for blood, but microscopy shows only 1–2 red blood cells per high power field — the blood reaction is out of proportion to the red cells seen, in keeping with pigment from injured muscle rather than true haematuria.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    doppler_leg_veins: {
      aliases: ['doppler lower limb veins'],
      resultText: 'Doppler Ultrasound, Lower Limb Veins: no evidence of venous thrombus; the study is technically difficult and delayed by the tense swelling and severe pain limiting probe contact and limb positioning.',
      turnaroundMinutes: 40,
      category: 'imaging',
      isIndicative: false,
      appropriateness: 'harmful',
      yieldNote: 'A venous study looks for clot inside the veins; it says nothing about the pressure inside the muscle of the leg and cannot explain pain that is out of proportion to the injury. Sending an acutely painful, tensely swollen leg to the scanner also spends time that matters here, and a normal study must never be treated as reassurance to keep waiting.',
    },
    crp: {
      aliases: ['crp'],
      resultText: 'CRP: 42 mg/L (Reference <6 mg/L) — mildly elevated, as expected after any significant musculoskeletal injury.',
      turnaroundMinutes: 25,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'An inflammatory marker rises after any significant fracture or soft-tissue injury and cannot separate a mechanical problem building pressure in the leg from ordinary post-traumatic inflammation. It does not change what needs to happen next, and a normal or high value must not be used as a reason to wait before deciding on the leg itself.',
    },
  },
  therapiesMap: {
    remove_cast: {
      aliases: ['bivalve cast & release constrictive dressings', 'remove the cast', 'bivalve the cast', 'release constrictive dressings'],
      responseText: 'The below-knee cast is split down to the skin on both sides (bivalved), the padding beneath is cut through, and any constrictive bandage is released completely; the leg is kept flat, level with the heart.',
      onsetMinutes: 5,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Releasing every external constricting layer — cast, padding and bandage — down to skin, and keeping the limb level with the heart rather than raised, is the immediate, zero-cost first step the moment this is suspected clinically. It takes seconds, can partially relieve pressure, and must never be deferred while waiting for a test or a theatre slot.',
    },
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula'],
      responseText: 'Two wide-bore (16G) IV cannulae are secured for fluids, analgesia and pre-operative access.',
      onsetMinutes: 3,
      appropriateness: 'indicated',
      rationale: 'Reliable large-bore venous access is needed for fluid resuscitation, analgesia and urgent pre-operative drug administration, and should be secured without delay alongside the bedside release manoeuvre.',
    },
    iv_fluids: {
      aliases: ['ringer lactate 500 ml bolus', 'ringer lactate', 'iv fluids'],
      responseText: 'Ringer Lactate 500 mL is given rapidly IV, with ongoing crystalloid to maintain a good urine output.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -6 },
      labShift: {
        kft: 'Renal Function (repeat): Blood Urea 26 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.0 mg/dL (Reference 0.6–1.2 mg/dL) — improving with fluids and better urine output.',
      },
      appropriateness: 'indicated',
      rationale: 'Generous crystalloid supports urine output and helps flush circulating muscle pigment through the kidneys, protecting against the pigment-induced acute kidney injury that follows significant muscle breakdown.',
    },
    morphine_analgesia: {
      aliases: ['morphine iv', 'iv morphine', 'morphine'],
      responseText: 'IV morphine is carefully titrated for pain relief.',
      onsetMinutes: 10,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Adequate analgesia is appropriate supportive care, but it treats a symptom, not the underlying problem. Pain that keeps escalating despite good analgesia is itself a warning sign, and more morphine must never be used as a substitute for urgent surgical decompression.',
    },
    foley: {
      aliases: ['foley catheterisation', 'foley catheter'],
      responseText: 'A Foley catheter is placed to allow hourly monitoring of urine output and colour.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Hourly urine output and direct inspection of urine colour are the simplest bedside way to monitor for pigment-related kidney injury and to titrate fluid resuscitation against a real endpoint.',
    },
    surgical_consult: {
      aliases: ['general surgery consult', 'orthopaedics consult', 'surgical consult'],
      responseText: 'The on-call surgical (orthopaedic) team is called urgently to assess for emergency operative decompression.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Calling the surgical team the moment this is recognised clinically avoids any delay in getting to theatre once the decision for decompression is made — it should happen in parallel with the bedside release manoeuvre, not after it.',
    },
    fasciotomy: {
      aliases: ['emergency fasciotomy', 'fasciotomy', 'four-compartment fasciotomy'],
      responseText: 'Emergency four-compartment fasciotomy of the leg is performed in theatre, opening the fascia to release the pressure and restore blood flow to the muscle.',
      onsetMinutes: 60,
      vitalsEffect: { hr: -14 },
      appropriateness: 'indicated',
      rationale: 'Fasciotomy is the only definitive treatment once the diagnosis is made on clinical grounds, or confirmed by a pressure measurement crossing the threshold. It is time-critical: muscle and nerve tolerate this poorly beyond roughly six to eight hours, and delay converts a reversible problem into permanent loss of muscle and nerve function.',
      requiresFirst: ['remove_cast'],
      harmfulSequenceResponseText: 'The team proceeds straight to theatre for fasciotomy without first releasing the cast and dressings at the bedside; valuable minutes are lost gathering theatre staff and consent while an external, immediately reversible source of constriction sits untouched.',
      harmfulSequenceVitalsEffect: { hr: 6 },
      harmfulSequenceRationale: 'Releasing every external constricting layer down to skin takes seconds and can partially relieve pressure immediately. It must always happen first, in parallel with arranging theatre, rather than being skipped in the rush to the operating room — it costs nothing and there is no reason to defer it until after a much longer surgical process has begun.',
    },
    elevation: {
      aliases: ['supine with legs elevated'],
      responseText: 'The leg is propped up on two pillows above the level of the heart "to help the swelling settle."',
      onsetMinutes: 15,
      vitalsEffect: { hr: 8 },
      appropriateness: 'harmful',
      rationale: 'Elevating the limb above heart level is a classic, well-intentioned error here: it lowers local arterial perfusion pressure at exactly the point tissue is already struggling to be perfused, worsening the ischaemia it is meant to relieve. The limb should be kept level with the heart, neither raised nor dependent.',
    },
    anticoagulation_dvt: {
      aliases: ['enoxaparin subcutaneous', 'enoxaparin', 'lmwh'],
      responseText: 'Enoxaparin is given subcutaneously, presuming the tense, painful swelling represents a venous clot.',
      onsetMinutes: 30,
      vitalsEffect: { hr: 4 },
      appropriateness: 'harmful',
      rationale: 'Empirical anticoagulation for a presumed clot in a tensely swollen, acutely painful leg risks precipitating bleeding into muscle that is already under pressure, which can turn a borderline situation into a surgical emergency and will also complicate or delay the fasciotomy and any further orthopaedic surgery that may be needed.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /bivalve|remove.*cast|release.*dressing/i,
      name: 'Cast & Dressing Release',
      targetMilestoneMinutes: 15,
    },
    {
      orderOrActionPattern: /fasciotomy/i,
      name: 'Emergency Fasciotomy',
      targetMilestoneMinutes: 60,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_compartment_1',
      title: 'Old Healed Fibular Fracture',
      description: 'The trauma X-rays incidentally show a well-healed, asymptomatic fracture of the fibula from childhood, unrelated to the current injury.',
      correctAction: 'No intervention needed; note it in the record and reassure the patient.',
      status: 'unnoticed',
    },
    {
      id: 'inc_compartment_2',
      title: 'Unverified Tetanus Immunisation Record',
      description: 'His tetanus immunisation status was never formally documented at his last visit, though he reports being up to date.',
      correctAction: 'Confirm and document tetanus immunisation status before discharge; give a booster if records cannot be verified and it has been more than the routine interval since the last dose.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'Several hours after a closed lower leg fracture was placed in a cast, his pain has escalated despite two doses of intravenous morphine and now worsens sharply when his toes are moved passively.',
      consequenceOnRight: 'The cast and every underlying dressing are bivalved and released immediately, the leg is kept flat at heart level, and the surgical team is called without waiting for any imaging.',
      consequenceOnWrong: 'A scan is requested first and the cast is left in place while the team waits for the report, and the pressure inside the leg keeps building during that time.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'On examination the leg is tensely swollen and firm, the pain is far greater than the fracture would explain, and the foot pulses are still faintly present.',
      consequenceOnRight: 'Severe pain out of proportion to the injury and pain on passive stretch are recognised as the earliest and most reliable signs, and the preserved pulse is correctly understood not to rule anything out.',
      consequenceOnWrong: 'The preserved pulse is used to reassure the team that the leg is fine, and action is deferred until a pulse is lost — by which point the damage is already severe.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Despite releasing the cast and keeping the leg level with the heart, the pain and tense swelling do not improve over the next half hour.',
      consequenceOnRight: 'Pressure inside the leg is measured, and with the perfusion margin critically low, the patient is taken for urgent surgical decompression without further delay.',
      consequenceOnWrong: 'The team continues to escalate opioid doses and simply observes, while the window for reversible muscle and nerve recovery keeps narrowing.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Ongoing muscle breakdown from the tense, painful leg raises concern for the kidneys and for heart rhythm.',
      consequenceOnRight: 'CK and urine myoglobin are sent, generous IV fluids are given to maintain good urine output, and potassium is monitored closely for a dangerous rise.',
      consequenceOnWrong: 'The kidneys and potassium are not monitored, and a pigment-related kidney injury or a dangerous arrhythmia from rising potassium is caught only late.',
    },
  ],
};
