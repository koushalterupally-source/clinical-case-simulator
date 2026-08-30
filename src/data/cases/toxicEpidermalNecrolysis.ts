import { CaseScaffold } from '../../types';

/**
 * A severe delayed-type drug hypersensitivity reaction across the
 * SJS/overlap/TEN spectrum, staged by percentage body-surface-area
 * detachment. Modelled deliberately like a burn: fluid resuscitation,
 * warming, meticulous wound care and nutrition, with the single highest-
 * yield intervention being immediate withdrawal of the culprit drug — every
 * exam wants that identified and acted on before anything else. Systemic
 * corticosteroids and IVIG are graded 'neutral' on purpose: both are
 * genuinely contested in the literature and neither should read as the
 * "correct" answer here. See CASE_MODEL.md for the therapy model this
 * scaffold follows (indicated / neutral / harmful, requiresFirst sequencing).
 *
 * FLAG FOR CLINICAL REVIEW (see task report): the systemic corticosteroid and
 * IVIG gradings, the SCORTEN-adjacent lab framing, and the illustrative
 * vitals/lab magnitudes throughout are all called out for a clinician to
 * check — see the end-of-task report for the full list.
 */
export const SCAFFOLD_TEN: CaseScaffold = {
  id: 'scaffold_ten',
  title: 'Skin Sloughing Days After Starting a New Drug',
  conditionName: 'Toxic Epidermal Necrolysis',
  subject: 'Dermatology',
  system: 'Dermatology',
  demographics: {
    name: 'Suresh Patil',
    age: 48,
    gender: 'Male',
    setting: 'Emergency',
  },
  openingVignette:
    'A 48-year-old man presents with high fever and a widespread painful rash that began four days ago, ten days after he was started on a new anti-seizure medication for newly diagnosed epilepsy. The rash started as flat red-purple spots on his face and trunk that have merged together, and over the last 24 hours the top layer of skin has begun sliding off in sheets with gentle rubbing, leaving raw, weeping surfaces underneath. He also has painful mouth ulcers making it hard to swallow, red gritty eyes, and pain on passing urine from sores at the tip.',
  initialVitals: {
    hr: 118,
    bp: '98/62',
    rr: 22,
    spo2: 95,
    temp: '39.2°C',
    grbs: 132,
  },
  clinchingClue:
    'On examination, gentle lateral shear pressure on skin that still looks intact makes the outer layer slide off immediately (a positive shearing sign), with confluent erosions now covering roughly 18% of the total body surface area, alongside ulceration of the oral, ocular and genital mucosae — three mucosal surfaces involved — all appearing in the ten days since he was started on the new anti-seizure drug.',
  clinchingClueTimeMinutes: 20,
  examFindingsMap: {
    general: 'Acutely unwell-looking, febrile, restless with pain, marked tenderness whenever the skin or mucosa is touched or moved.',
    cvs: 'Tachycardic, regular rhythm, thready peripheral pulses, capillary refill mildly prolonged.',
    chest: 'Mildly tachypnoeic, air entry equal bilaterally, no crepitations yet.',
    abdomen: 'Soft, non-tender, bowel sounds present, no organomegaly.',
    skin: 'Confluent dusky red-purple macules coalescing over the face, trunk and proximal limbs, with flaccid blisters and sheets of skin detachment leaving raw, weeping dermis exposed; a positive shearing sign is elicited on adjacent skin that still looks intact.',
    mucosal: 'Haemorrhagic crusting of the lips with erosions across the buccal mucosa and oropharynx limiting oral intake; bilateral conjunctival injection with early lid-margin adhesions forming; erosions at the urethral meatus and glans.',
    cns: 'Alert and oriented, no focal neurological deficit, distressed by pain.',
  },
  historyMap: {
    presenting: 'Fever and a spreading rash for four days, beginning as flat red-purple spots on the face and trunk that merged together before the skin began sliding off in sheets over the last 24 hours.',
    medications: 'Started on a new anti-seizure medication (carbamazepine) ten days ago for newly diagnosed epilepsy; no other new medications, supplements or over-the-counter drugs in the preceding month.',
    past: 'First-ever seizure three weeks ago, worked up and started on maintenance anti-seizure treatment; previously fit and well with no chronic illness.',
    allergies: 'No previously known drug allergies — this is his first-ever exposure to this medication.',
    family: 'No family history of a similar reaction to any medication.',
    social: 'Non-smoker, occasional alcohol use, no recent travel, no preceding respiratory or other infective illness before the rash began.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram'],
      resultText: 'CBC: Hb 13.1 g/dL (Reference 13.0–17.0 g/dL), WBC 2,900/mcL (Reference 4,000–11,000/mcL) — leucopenia, Platelets 138,000/mcL (Reference 150,000–450,000/mcL) — mildly low. A low white cell count here is an adverse prognostic marker and should prompt close surveillance for secondary infection.',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    blood_group: {
      aliases: ['blood grouping & cross-match', 'blood grouping', 'cross match'],
      resultText: 'Blood Grouping & Cross-match: Group B, Rhesus D Negative. Held on file in case blood product support is later required.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    rft_kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft'],
      resultText: 'Renal Function: Blood Urea 46 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.3 mg/dL (Reference 0.6–1.2 mg/dL) — mildly elevated, consistent with intravascular volume depletion from ongoing fluid loss through denuded skin, exactly as would be seen in a burn of comparable extent.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft'],
      resultText: 'Liver Function Tests: AST 68 U/L (Reference 10–40 U/L), ALT 74 U/L (Reference 7–56 U/L), Total Bilirubin 1.0 mg/dL (Reference 0.2–1.2 mg/dL) — mild transaminitis, which should be trended alongside the causative drug history and any further hepatotoxic exposures.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes'],
      resultText: 'Serum Electrolytes: Na 130 mEq/L (Reference 135–145 mEq/L), K 3.6 mEq/L (Reference 3.5–5.0 mEq/L), Cl 96 mEq/L (Reference 98–106 mEq/L) — mild derangement from ongoing fluid and electrolyte loss through the areas of skin loss.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    serum_lactate: {
      aliases: ['serum lactate'],
      resultText: 'Serum Lactate: 2.6 mmol/L (Reference 0.5–1.6 mmol/L) — mildly elevated, consistent with the degree of intravascular volume depletion; a useful number to trend alongside the fluid resuscitation.',
      turnaroundMinutes: 15,
      category: 'labs',
      isIndicative: true,
    },
    blood_culture: {
      aliases: ['blood culture ×2 (before antibiotics)', 'blood culture', 'blood cultures'],
      resultText: 'Blood Culture ×2: No growth at this time; held on file for surveillance. Sent because secondary bloodstream infection is the leading cause of death here, so a positive result would need targeted antibiotics — this is surveillance, not a reason to start antibiotics on its own.',
      turnaroundMinutes: 240,
      category: 'labs',
      isIndicative: true,
    },
    skin_biopsy: {
      aliases: ['skin biopsy (frozen section) with histopathology', 'skin biopsy', 'punch biopsy'],
      resultText: 'Skin Biopsy (frozen section): Full-thickness epidermal cell death with a subepidermal split and only a sparse dermal inflammatory infiltrate — a pattern that supports the clinical impression and helps exclude other blistering disorders (autoimmune bullous disease, staphylococcal scalded skin) that can look similar at the bedside.',
      turnaroundMinutes: 90,
      category: 'labs',
      isIndicative: true,
    },
    bsa_mapping: {
      aliases: ['total body surface area mapping', 'tbsa mapping', 'body surface area assessment', 'lund-browder chart'],
      resultText: 'Body Surface Area Mapping (Lund-Browder chart): Approximately 18% of total body surface area shows detachment or a positive shearing sign on currently intact-looking skin. This figure, plus age and the laboratory values above, feeds directly into the bedside severity/prognostic score used for this condition and into the fluid resuscitation calculation.',
      turnaroundMinutes: 10,
      category: 'monitoring',
      isIndicative: true,
    },
    crp: {
      aliases: ['crp', 'c-reactive protein'],
      resultText: 'C-Reactive Protein: 64 mg/L (Reference <5 mg/L) — non-specifically raised.',
      turnaroundMinutes: 40,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'A raised CRP here just reflects the size of the skin injury itself — it does not tell you anything the exam findings have not already shown, it will not distinguish an evolving secondary infection from the underlying illness on its own, and trending it does not change what to do next. Clinical review of the wound and vitals, not this number, is what should drive the next decision.',
    },
    ana_autoimmune: {
      aliases: ['ana / autoimmune serology', 'ana panel', 'autoimmune workup'],
      resultText: 'ANA / Autoimmune Serology: Sent, pending — routine turnaround is several days.',
      turnaroundMinutes: 480,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote: 'This panel takes days to return and cannot influence anything in the next 24 hours of an acutely unstable patient with a clear medication started ten days before onset and rapidly progressive mucocutaneous blistering. It has a place in a stable patient with a chronic or ambiguous blistering illness, not in this acute stabilisation window.',
    },
  },
  therapiesMap: {
    stop_offending_drug: {
      aliases: ['stop the suspected offending drug', 'stop offending drug', 'discontinue culprit drug', 'withdraw culprit drug'],
      responseText: 'The anti-seizure medication identified as the likely trigger is stopped immediately and flagged clearly in the chart, along with the drug class, as an agent never to be given to him again.',
      onsetMinutes: 120,
      vitalsEffect: { hr: -6, temp: '38.6°C' },
      appropriateness: 'indicated',
      rationale: 'Early withdrawal of the culprit drug is the single intervention most strongly linked to survival in this condition — every additional day the causative drug is continued is associated with worse outcome — so this must happen before any confirmatory test result, not after.',
    },
    iv_access: {
      aliases: ['two wide-bore iv cannulae', 'iv access', 'wide bore cannula', 'large bore iv'],
      responseText: 'Two wide-bore (16G) IV cannulae are secured, sited through unaffected skin where possible.',
      onsetMinutes: 5,
      appropriateness: 'indicated',
      rationale: 'Reliable large-bore access is needed for the large-volume fluid resuscitation this degree of skin loss requires, calculated as for a burn, and for delivering medications without further traumatising denuded skin.',
    },
    iv_fluid_resuscitation: {
      aliases: ['ringer lactate 500 ml bolus', 'ringer lactate', 'crystalloid bolus', 'normal saline 0.9% 500 ml bolus'],
      responseText: 'Warmed Ringer Lactate is given as an initial bolus and continued as a titrated infusion, with the rate calculated from percentage body-surface-area detachment as for a burn, and adjusted against hourly urine output.',
      onsetMinutes: 30,
      vitalsEffect: { hr: -10, bp: '108/68' },
      labShift: {
        rft_kft: 'Renal Function (repeat): Blood Urea 34 mg/dL, Serum Creatinine 1.0 mg/dL — improving after fluid resuscitation.',
      },
      appropriateness: 'indicated',
      rationale: 'This patient loses fluid, protein and heat through denuded skin much as a burn patient does, and needs formula-guided crystalloid resuscitation titrated to urine output — usually somewhat less aggressive than a cutaneous burn of the same extent, since the primary injury here is more superficial, but resuscitation must not be delayed or omitted.',
    },
    active_warming: {
      aliases: ['active warming & kangaroo care', 'active warming', 'warming measures'],
      responseText: 'Active warming is instituted — warmed IV fluids, an elevated ambient room temperature, and warming blankets — to counter the impaired thermoregulation caused by extensive skin loss.',
      onsetMinutes: 45,
      vitalsEffect: { temp: '38.2°C' },
      appropriateness: 'indicated',
      rationale: 'Extensive skin loss impairs the ability to conserve heat exactly as a comparable burn does, and hypothermia is a real risk that active warming of the environment and fluids prevents throughout wound care.',
    },
    wound_care: {
      aliases: ['wound care & non-adherent dressings', 'wound care', 'non-adherent dressings', 'meticulous wound care'],
      responseText: 'Meticulous wound care is performed with conservative debridement of only clearly non-viable skin, non-adherent dressings applied over denuded areas, and strict aseptic technique — mirroring burns-unit wound management.',
      onsetMinutes: 90,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Denuded skin is managed as a burn wound: conservative debridement, non-adherent dressings and aseptic technique reduce ongoing fluid loss, pain and infection risk from the exposed dermis, and are best carried out once adequate analgesia is already on board.',
      requiresFirst: ['analgesia'],
      harmfulSequenceResponseText: 'Wound care and dressing changes are attempted before adequate analgesia is on board. The patient thrashes in pain during handling, several partially adherent sheets of skin are inadvertently sheared further, and the raw surface area increases.',
      harmfulSequenceVitalsEffect: { hr: 24, bp: '86/54' },
      harmfulSequenceRationale: 'This much denuded, exquisitely sensitive skin makes wound care significantly painful; doing it before analgesia is given causes needless suffering, a sympathetic surge that worsens haemodynamics, and risks extending the area of skin loss through inadvertent mechanical shearing during handling.',
    },
    analgesia: {
      aliases: ['morphine iv', 'morphine', 'iv analgesia'],
      responseText: 'IV morphine is titrated for background pain and given pre-emptively before wound care and dressing changes.',
      onsetMinutes: 15,
      vitalsEffect: { hr: -8 },
      appropriateness: 'indicated',
      rationale: 'Pain from this extent of mucocutaneous denudation is severe and easily under-treated; adequate opioid analgesia, particularly dosed ahead of wound care, is a standard and necessary part of supportive management.',
    },
    nutrition_ngt: {
      aliases: ['nasogastric tube', 'ng tube', 'nasogastric feeding'],
      responseText: 'A soft nasogastric tube is passed for early enteral nutrition, since painful oral and oropharyngeal ulceration is limiting oral intake.',
      onsetMinutes: 60,
      appropriateness: 'indicated',
      rationale: 'Catabolic demands rise sharply with this extent of skin loss, just as after a burn, while painful oral mucosal ulceration prevents adequate oral intake — early enteral nutrition through a nasogastric tube preserves gut integrity and meets the raised nutritional requirement.',
    },
    icu_transfer: {
      aliases: ['move to icu', 'icu transfer', 'burns unit transfer'],
      responseText: 'The patient is transferred to the intensive care / burns unit for the level of monitoring, warmed-environment nursing and wound care this extent of skin loss requires.',
      onsetMinutes: 60,
      vitalsEffect: { hr: -6 },
      appropriateness: 'indicated',
      rationale: 'Care of this magnitude of skin loss — fluid balance, thermoregulation, sterile wound care and surveillance for sepsis — is best delivered in an intensive care or burns unit, and outcomes are better when patients with this much detachment are moved there early rather than managed on a general ward.',
      requiresFirst: ['stop_offending_drug', 'iv_access', 'iv_fluid_resuscitation'],
      harmfulSequenceResponseText: 'The patient is transferred before the causative drug is stopped, IV access is secured, or fluid resuscitation is started. En route, the tachycardia worsens and the blood pressure drifts lower with no line in place to correct it.',
      harmfulSequenceVitalsEffect: { hr: 22, bp: '82/50' },
      harmfulSequenceRationale: 'Transferring an unstable, ongoing-fluid-losing patient before the culprit drug is stopped and before IV access and initial resuscitation are secured risks deterioration in transit, at the exact moment he is furthest from monitoring and intervention — stabilise first, then move to the unit equipped for ongoing care.',
    },
    ophthal_consult: {
      aliases: ['ophthalmology consult', 'ophthalmology referral', 'eye consult'],
      responseText: 'Ophthalmology reviews the patient at the bedside the same day, examining for conjunctival and lid-margin involvement and starting lubrication and any indicated topical therapy.',
      onsetMinutes: 90,
      appropriateness: 'indicated',
      rationale: 'Ocular mucosal involvement can progress to permanent scarring, symblepharon and even loss of vision if it is not addressed from day one; same-admission ophthalmology involvement whenever the eyes are involved is standard of care, not a referral to defer.',
    },
    prophylactic_antibiotics: {
      aliases: ['ceftriaxone 2 g iv', 'ceftriaxone'],
      responseText: 'Intravenous ceftriaxone is started empirically despite no clinical or laboratory evidence of infection.',
      onsetMinutes: 30,
      appropriateness: 'harmful',
      rationale: 'Prophylactic systemic antibiotics given before there is any evidence of infection do not improve survival in this condition and are specifically advised against by guidelines — they select for resistant organisms and can delay recognition of a genuine secondary infection when it does occur, even though infection is the leading cause of death here. Antibiotics should be reserved for a documented infection guided by surveillance cultures.',
    },
    corticosteroids: {
      aliases: ['dexamethasone iv', 'dexamethasone', 'systemic corticosteroids'],
      responseText: 'A short course of systemic corticosteroid (IV dexamethasone) is given early in the course, per local unit protocol.',
      onsetMinutes: 90,
      appropriateness: 'neutral',
      rationale: 'Systemic corticosteroids remain genuinely contested for this condition: some observational series and unit protocols report benefit from a short early course, while others report increased infective complications with no consistent mortality benefit, and expert guidance is divided. This is a specialist/unit-protocol judgement call, not an unambiguously right or wrong step, and it must never substitute for stopping the drug and for burns-style supportive care.',
    },
    ivig: {
      aliases: ['intravenous immunoglobulin (ivig) infusion', 'ivig', 'iv immunoglobulin'],
      responseText: 'High-dose intravenous immunoglobulin is infused over several days, per local unit protocol.',
      onsetMinutes: 120,
      appropriateness: 'neutral',
      rationale: 'IVIG is likewise genuinely contested: proposed to interrupt the immune-mediated keratinocyte injury, but trial and cohort evidence on mortality benefit is inconsistent, and some series show none. As with corticosteroids, this is a specialist/unit-protocol decision rather than a clearly correct or incorrect order, and it does not replace drug withdrawal or burns-style supportive care.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /stop the suspected offending drug|stop offending drug|discontinue culprit drug|withdraw culprit drug/i,
      name: 'Withdraw the Causative Drug',
      targetMilestoneMinutes: 30,
    },
    {
      orderOrActionPattern: /ringer lactate|normal saline|crystalloid bolus/i,
      name: 'Fluid Resuscitation',
      targetMilestoneMinutes: 60,
    },
    {
      orderOrActionPattern: /move to icu|icu transfer|burns unit transfer/i,
      name: 'Transfer to ICU / Burns Unit Level Care',
      targetMilestoneMinutes: 180,
    },
    {
      orderOrActionPattern: /ophthalmology consult|ophthalmology referral|eye consult/i,
      name: 'Early Ophthalmology Review',
      targetMilestoneMinutes: 240,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_ten_1',
      title: 'Incidental Mild Peripheral Eosinophilia',
      description: 'The complete blood count incidentally shows a mildly raised eosinophil count.',
      correctAction: 'Note it in the chart; an isolated mild rise in eosinophils here does not need separate treatment or change the plan, since there is no facial swelling, lymphadenopathy or the more delayed multi-organ pattern that would point to a different, slower-onset drug reaction needing its own work-up.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ten_2',
      title: 'Rh-Negative Blood Group on Cross-Match',
      description: 'Blood grouping incidentally shows he is Rhesus D negative.',
      correctAction: 'Document clearly for any future transfusion or blood product requirement; no immediate action is needed for this alone.',
      status: 'unnoticed',
    },
    {
      id: 'inc_ten_3',
      title: 'Undocumented Tetanus Immunisation Status',
      description: 'His last tetanus toxoid booster is undocumented, and he now has multiple large areas of open, denuded skin.',
      correctAction: 'Give a tetanus toxoid booster if the last dose was more than 10 years ago or the status is unknown, as for any patient with extensive open wounds.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'EMERGENCY',
      patientContext: 'Four days after starting a new anti-seizure medication, this man now has fever, spreading dusky red-purple patches that are merging together, and sheets of skin peeling off with gentle rubbing — the single decision that most affects his chances of survival has to be made now, before any test result is back.',
      consequenceOnRight: 'The suspected causative drug is identified from the medication history and stopped immediately, alongside starting IV access and fluid resuscitation — survival is strongly linked to how early the trigger is withdrawn.',
      consequenceOnWrong: 'The new medication is continued while tests are awaited, and the reaction keeps advancing with more skin detachment each additional day it stays on board.',
    },
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Gentle lateral pressure on skin that still looks intact makes the top layer shear off immediately, and the confluent area of skin loss is measured across the body along with ulceration of the mouth, eyes and genital mucosa.',
      consequenceOnRight: 'The percentage of body surface area involved is measured and used, together with age and the laboratory values, to grade the severity of the reaction and decide the level of care needed — exactly as the depth and extent of a burn would be staged.',
      consequenceOnWrong: 'Severity is guessed rather than measured, and a patient who in fact needs unit-level care is left on a general ward.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'With this much skin lost, the team must decide how to replace ongoing fluid and heat loss and where he should be nursed for wound care and monitoring.',
      consequenceOnRight: 'He is resuscitated with warmed crystalloid guided by urine output, kept actively warm, and moved to an intensive care or burns unit for meticulous wound care — managed as a comparable area of burn would be.',
      consequenceOnWrong: 'He is managed with routine ward-level fluids and monitoring, and hypothermia, worsening fluid losses and wound infection are picked up late.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'With this much open, raw skin, infection is the leading cause of death, and the team must decide whether to start antibiotics now or hold them.',
      consequenceOnRight: 'Antibiotics are held unless and until there is clinical or culture evidence of infection, with surveillance cultures sent and the skin and lines watched closely instead.',
      consequenceOnWrong: 'Broad-spectrum antibiotics are started before any evidence of infection, which does not improve survival here and risks selecting for resistant organisms.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'His eyes are red and gritty with early adhesions forming between the lids and the eye surface, alongside the mouth and genital ulceration already noted.',
      consequenceOnRight: 'Ophthalmology is involved from day one to start lubrication and any indicated topical therapy, heading off the scarring that untreated eye involvement can leave behind.',
      consequenceOnWrong: 'Eye involvement is treated as a minor detail and ophthalmology is not called, risking permanent scarring, adhesions and even loss of vision.',
    },
  ],
};
