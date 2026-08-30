import { CaseScaffold } from '../../types';
import { SCAFFOLD_ASTHMA } from './asthma';
import { SCAFFOLD_VARICEAL_BLEED } from './varicealBleed';
import { SCAFFOLD_STATUS_EPILEPTICUS } from './statusEpilepticus';
import { SCAFFOLD_MALARIA } from './malaria';
import { SCAFFOLD_PNEUMOTHORAX } from './pneumothorax';
import { SCAFFOLD_MALNUTRITION } from './malnutrition';
import { SCAFFOLD_ANAPHYLAXIS } from './anaphylaxis';
import { SCAFFOLD_PPH } from './pph';
import { SCAFFOLD_ORGANOPHOSPHATE } from './organophosphate';
import { SCAFFOLD_SNAKE_BITE } from './snakeBite';
import { SCAFFOLD_ECTOPIC } from './ectopicPregnancy';
import { SCAFFOLD_APPENDICITIS } from './appendicitis';
import { SCAFFOLD_BURNS } from './burns';
import { SCAFFOLD_NEONATAL_SEPSIS } from './neonatalSepsis';
import { SCAFFOLD_DENGUE_SHOCK } from './dengueShock';
import { SCAFFOLD_ISCHEMIC_STROKE } from './ischemicStroke';
import { SCAFFOLD_ANGLE_CLOSURE } from './angleClosureGlaucoma';
import { SCAFFOLD_TEN } from './toxicEpidermalNecrolysis';
import { SCAFFOLD_DELIRIUM_TREMENS } from './deliriumTremens';
import { SCAFFOLD_LUDWIGS } from './ludwigsAngina';
import { SCAFFOLD_COMPARTMENT } from './compartmentSyndrome';
import { SCAFFOLD_PANCREATITIS } from './pancreatitis';
import { SCAFFOLD_PEDIATRIC_DKA } from './pediatricDka';
import { SCAFFOLD_TORSION } from './testicularTorsion';

/**
 * Twelve cases, all modelled to the same standard. Four are defined inline
 * here — DKA, STEMI, eclampsia, bacterial meningitis — and eight live in
 * their own files alongside this one. The twelve *shallow* scaffolds this
 * file used to hold were retired first: breadth was hiding the fact that none
 * of them went deep enough to be worth playing, and none of them modelled a
 * single therapy. The library was then grown back to twelve against the
 * invariants in Test Suite 14. See CASE_MODEL.md.
 *
 * `investigationsMap` matching is by explicit `aliases`, normalized and
 * compared for equality — never substring — so two different tests (e.g.
 * "Serum ketones" vs "Urine ketones") can never collide into one result.
 *
 * `therapiesMap` entries are `indicated`, `neutral` or `harmful`. An
 * indicated therapy is acknowledged, moves vitals toward normal over
 * `onsetMinutes`, and can change what a REPEATED investigation returns via
 * `labShift`. A harmful therapy is acted on too, and the patient responds
 * accordingly — including therapies that are only harmful because of when
 * they were given (`requiresFirst` / `harmfulSequence*`), the classic
 * "insulin before fluids" trap in DKA. `rationale` is shown in the scorecard
 * afterwards, never during the case.
 */

export const CASE_SCAFFOLDS: CaseScaffold[] = [
  // 1. Acute STEMI
  {
    id: 'scaffold_stemi',
    title: 'Acute Chest Pain in Emergency',
    conditionName: 'Acute Anterior Wall STEMI',
    subject: 'Medicine',
    system: 'Cardiology',
    demographics: {
      name: 'Ramesh Kumar',
      age: 54,
      gender: 'Male',
      setting: 'Emergency',
    },
    openingVignette: 'A 54-year-old male presents to the triage room with 90 minutes of acute, severe retrosternal crushing discomfort, profuse sweating, and mild dyspnea while at work. Pain radiates to the inner aspect of left arm and lower jaw. History of Type 2 Diabetes for 8 years.',
    initialVitals: {
      hr: 110,
      bp: '140/90',
      rr: 22,
      spo2: 94,
      temp: '37.0°C',
      grbs: 186,
    },
    clinchingClue: '12-lead ECG reveals 4mm convex-upward ST-segment elevation in leads V1-V4 with reciprocal ST depression in inferior leads.',
    clinchingClueTimeMinutes: 10,
    examFindingsMap: {
      cvs: 'S1 S2 heard, soft S4 gallop present at apex. JVP 3 cm above sternal angle. No pericardial rub.',
      chest: 'Bilateral basal fine end-inspiratory crepitations up to lower 1/3rd of lung fields.',
      abdomen: 'Soft, non-tender, no hepatomegaly, bowel sounds present.',
      neuro: 'Alert, oriented x3, gross cranial nerves intact, no focal motor deficits.',
      general: 'Pale, diaphoretic, anxious, no peripheral cyanosis or pedal edema.',
    },
    historyMap: {
      allergies: 'No known drug allergies.',
      past: 'Type 2 Diabetes Mellitus for 8 years on metformin. Smoker 15 pack-years.',
      medications: 'Metformin 500 mg BD. Irregular compliance.',
      family: 'Father died of sudden cardiac death at age 52.',
    },
    investigationsMap: {
      ecg: {
        aliases: ['12-lead ecg', 'ecg', 'ekg', 'electrocardiogram'],
        resultText: '12-lead ECG: Sinus tachycardia at 110 bpm. Hyperacute T waves progressing to 4mm ST elevations in V1-V4. Reciprocal ST depressions in II, III, aVF.',
        turnaroundMinutes: 5,
        category: 'imaging',
        isIndicative: true,
      },
      troponin: {
        aliases: ['troponin i', 'stat troponin i', 'troponin', 'ck-mb', 'cardiac enzymes', 'trop i', 'cardiac markers'],
        resultText: 'STAT Troponin I: 3.4 ng/mL (Reference <0.04 ng/mL) — Significantly elevated. CK-MB: 48 U/L (Reference 0–25 U/L).',
        turnaroundMinutes: 30,
        category: 'labs',
        isIndicative: true,
      },
      cbc: {
        aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count'],
        resultText: 'CBC: Hb 14.2 g/dL (Reference 13.0–17.0 g/dL), WBC 11,400/mcL (Reference 4,000–11,000/mcL), Platelets 240,000/mcL (Reference 150,000–450,000/mcL).',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: true,
      },
      kft: {
        aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'renal function test', 'kidney function test', 'urea creatinine'],
        resultText: 'KFT / Renal Panel: Blood Urea 32 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.0 mg/dL (Reference 0.6–1.2 mg/dL), Na+ 138 mEq/L (Reference 135–145 mEq/L), K+ 4.2 mEq/L (Reference 3.5–5.0 mEq/L).',
        turnaroundMinutes: 30,
        category: 'labs',
        isIndicative: true,
      },
      cxr: {
        aliases: ['chest x-ray pa', 'chest x-ray portable', 'cxr', 'chest xray', 'chest x ray'],
        resultText: 'Portable CXR (PA view): Mild pulmonary venous congestion, heart size upper limit of normal. No pneumothorax.',
        turnaroundMinutes: 20,
        category: 'imaging',
        isIndicative: true,
      },
      echo: {
        aliases: ['bedside echo', 'formal 2d echo', 'echo', 'echocardiogram', '2d echo'],
        resultText: 'Bedside Echocardiogram: Regional wall motion abnormality (anterior wall and apex hypokinesis). LVEF 42%. No pericardial effusion or mechanical rupture.',
        turnaroundMinutes: 25,
        category: 'imaging',
        isIndicative: true,
      },
      lft: {
        aliases: ['lft', 'liver function test'],
        resultText: 'Liver Function Tests: AST 42 U/L (Reference 10–40 U/L), ALT 35 U/L (Reference 7–56 U/L), Total Bilirubin 0.8 mg/dL (Reference 0.2–1.2 mg/dL), Albumin 4.1 g/dL (Reference 3.5–5.0 g/dL).',
        turnaroundMinutes: 30,
        category: 'labs',
        isIndicative: false,
      },
      abg: {
        aliases: ['abg', 'arterial blood gas'],
        resultText: 'ABG (Room Air): pH 7.38 (Reference 7.35–7.45), PaCO2 38 mmHg (Reference 35–45 mmHg), PaO2 84 mmHg (Reference 80–100 mmHg), HCO3 23 mEq/L (Reference 22–26 mEq/L), SaO2 94%.',
        turnaroundMinutes: 10,
        category: 'labs',
        isIndicative: true,
      },
      lipid_panel: {
        aliases: ['lipid profile', 'fasting lipid profile', 'lipid panel', 'cholesterol panel'],
        resultText: 'Fasting Lipid Profile: Total Cholesterol 240 mg/dL (Reference <200 mg/dL), LDL 162 mg/dL (Reference <100 mg/dL), HDL 38 mg/dL (Reference >40 mg/dL), Triglycerides 210 mg/dL (Reference <150 mg/dL).',
        turnaroundMinutes: 45,
        category: 'labs',
        isIndicative: false,
      },
      hba1c: {
        aliases: ['hba1c', 'glycated hemoglobin'],
        resultText: 'HbA1c: 8.4% (Reference <5.7%, Diabetic target <7.0%) — Suboptimal long-term glycemic control.',
        turnaroundMinutes: 45,
        category: 'labs',
        isIndicative: false,
      },
      coag_pt_inr: {
        aliases: ['pt / inr', 'coagulation profile', 'coagulation panel', 'prothrombin time'],
        resultText: 'Coagulation Profile: PT 12.1 sec (Reference 11–13.5 sec), INR 1.0 (Reference 0.8–1.1), aPTT 28 sec (Reference 25–35 sec).',
        turnaroundMinutes: 30,
        category: 'labs',
        isIndicative: true,
      },
      urinalysis: {
        aliases: ['urine routine & microscopy', 'urinalysis', 'urine routine', 'urine analysis', 'urine r/m'],
        resultText: 'Urine Routine: Specific Gravity 1.018, pH 6.0, Protein Negative, Glucose 1+, Microalbuminuria 45 mg/L (Reference <30 mg/L).',
        turnaroundMinutes: 15,
        category: 'labs',
        isIndicative: false,
      },
    },
    therapiesMap: {
      aspirin: {
        aliases: ['aspirin 325 mg chewed', 'aspirin', 'asa', 'chewable aspirin', 'aspirin 325mg'],
        responseText: 'Aspirin 325 mg given chewed and swallowed for rapid antiplatelet effect.',
        onsetMinutes: 15,
        vitalsEffect: { hr: -2 },
        appropriateness: 'indicated',
        rationale: 'Immediate chewable, non-enteric aspirin gives rapid antiplatelet effect and reduces mortality in ACS; it should never wait for troponin confirmation.',
      },
      p2y12_inhibitor: {
        aliases: ['clopidogrel 300 mg loading', 'ticagrelor 180 mg loading', 'clopidogrel', 'ticagrelor', 'p2y12 inhibitor', 'dual antiplatelet therapy', 'dapt', 'p2y12'],
        responseText: 'P2Y12 inhibitor loading dose given alongside aspirin.',
        onsetMinutes: 20,
        appropriateness: 'indicated',
        rationale: 'Dual antiplatelet therapy (aspirin plus a P2Y12 inhibitor) is standard in ACS and reduces stent thrombosis/reinfarction risk alongside reperfusion.',
      },
      heparin: {
        aliases: ['unfractionated heparin bolus', 'enoxaparin subcutaneous', 'unfractionated heparin', 'enoxaparin', 'heparin', 'lmwh', 'anticoagulation', 'heparin bolus'],
        responseText: 'Parenteral anticoagulation started alongside antiplatelet therapy.',
        onsetMinutes: 20,
        appropriateness: 'indicated',
        rationale: 'Anticoagulation alongside antiplatelet therapy and reperfusion reduces re-thrombosis risk during the acute phase of STEMI.',
      },
      statin: {
        aliases: ['atorvastatin 80 mg', 'atorvastatin', 'high intensity statin', 'statin', 'high dose statin'],
        responseText: 'High-intensity statin (Atorvastatin 80 mg) started.',
        onsetMinutes: 60,
        appropriateness: 'indicated',
        rationale: 'High-intensity statin therapy started within 24 hours of ACS is guideline-recommended secondary prevention, independent of baseline LDL.',
      },
      reperfusion_pci: {
        aliases: ['primary pci', 'pci', 'percutaneous coronary intervention', 'coronary angioplasty', 'angioplasty', 'stenting', 'cath lab'],
        responseText: 'Primary PCI performed: culprit vessel identified and stented, flow restored.',
        onsetMinutes: 60,
        vitalsEffect: { hr: -15, spo2: 3, bp: '118/76' },
        labShift: {
          ecg: '12-lead ECG (repeat): Greater than 50% resolution of the ST-segment elevation in V1-V4, with evolving T-wave inversion — consistent with successful reperfusion.',
        },
        appropriateness: 'indicated',
        rationale: 'Primary PCI within the guideline-recommended window is the preferred reperfusion strategy for STEMI when it can be delivered promptly, restoring epicardial flow and salvaging myocardium.',
      },
      thrombolysis: {
        aliases: ['tenecteplase (thrombolysis)', 'streptokinase infusion', 'tenecteplase', 'streptokinase', 'thrombolysis', 'fibrinolysis', 'tpa', 'thrombolytic', 'clot buster'],
        responseText: 'IV thrombolytic therapy given per weight-based dosing.',
        onsetMinutes: 90,
        vitalsEffect: { hr: -10, spo2: 2 },
        labShift: {
          ecg: '12-lead ECG (repeat): Partial (around 50%) resolution of the ST-segment elevation — suggestive of successful pharmacological reperfusion; angiography is still advised.',
        },
        appropriateness: 'indicated',
        rationale: 'When primary PCI cannot be delivered within the guideline-recommended window, timely fibrinolysis is an appropriate alternative reperfusion strategy, ideally followed by angiography.',
      },
      oxygen: {
        aliases: ['supplemental oxygen', 'oxygen', 'o2'],
        responseText: 'Supplemental oxygen applied by face mask.',
        onsetMinutes: 10,
        vitalsEffect: { spo2: 1 },
        appropriateness: 'neutral',
        rationale: 'Routine supplemental oxygen has not been shown to improve outcomes in ACS patients who are not hypoxic (SpO2 ≥90%); reasonable here but not clearly beneficial at this saturation.',
      },
      nitroglycerin: {
        aliases: ['nitroglycerin infusion', 'nitroglycerin', 'ntg', 'gtn', 'nitro drip', 'iv nitroglycerin'],
        responseText: 'IV Nitroglycerin infusion started and titrated for pain relief.',
        onsetMinutes: 10,
        vitalsEffect: { hr: 2 },
        appropriateness: 'neutral',
        rationale: 'Nitrates relieve ischemic pain but have not been shown to reduce mortality in STEMI, and must be avoided in hypotension or suspected right ventricular infarction.',
      },
      metoprolol: {
        aliases: ['metoprolol iv', 'metoprolol', 'iv beta blocker', 'beta blocker'],
        responseText: 'IV Metoprolol given.',
        onsetMinutes: 10,
        vitalsEffect: { hr: -20, bp: '82/54', spo2: -3 },
        appropriateness: 'harmful',
        rationale: 'Early IV beta-blockade is discouraged in STEMI with signs of heart failure or risk of cardiogenic shock — this patient has an S4 gallop and bibasal crepitations — and can precipitate hypotension, bradycardia and cardiogenic shock.',
      },
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /aspirin|clopidogrel|ticagrelor|dual antiplatelet|dapt/i,
        name: 'Dual Antiplatelet Therapy (Aspirin + P2Y12 inhibitor)',
        targetMilestoneMinutes: 20,
      },
      {
        orderOrActionPattern: /pci|catheterization|thromboly|streptokinase|tenecteplase/i,
        name: 'Reperfusion Therapy (PCI or Fibrinolysis)',
        targetMilestoneMinutes: 60,
      },
    ],
    incidentalPool: [
      {
        id: 'inc_stemi_1',
        title: 'Asymptomatic Solitary Gallstone',
        description: 'Bedside abdominal ultrasound shows a single 9mm hyperechoic gallstone in gallbladder with acoustic shadowing. Wall thickness 2mm, no sludge or tenderness.',
        correctAction: 'Conservative observation — asymptomatic cholelithiasis requires no surgical intervention.',
        status: 'unnoticed',
      },
      {
        id: 'inc_stemi_2',
        title: 'Missed Tdap Booster Vaccination',
        description: 'Immunization history review indicates last tetanus toxoid booster was received 12 years ago.',
        correctAction: 'Administer adult Tdap booster prior to hospital discharge.',
        status: 'unnoticed',
      },
    ],
    gateMilestones: [
      {
        roleTag: 'EMERGENCY',
        patientContext: 'Patient presenting with acute chest pain and diaphoresis within golden hour.',
        consequenceOnRight: 'Immediate loading doses administered. Ischemic chest pain begins to subside.',
        consequenceOnWrong: 'Reperfusion delay incurred! Myocardial ischemia continues to expand.',
      },
      {
        roleTag: 'DIAGNOSIS',
        patientContext: 'Patient develops cold clammy extremities and new holosystolic murmur on day 3.',
        consequenceOnRight: 'Mechanical complication correctly identified. Urgent surgical consult requested.',
        consequenceOnWrong: 'Misdiagnosed mechanical complication! Cardiogenic shock worsens.',
      },
      {
        roleTag: 'MANAGEMENT',
        patientContext: 'ECG reveals convex elevation in precordial leads with primary catheterization delayed >120 minutes in secondary center.',
        consequenceOnRight: 'Fibrinolytic therapy initiated rapidly with complete resolution.',
        consequenceOnWrong: 'Delayed reperfusion leads to extensive anterior wall necrosis.',
      },
      {
        roleTag: 'PHARM',
        patientContext: 'Selecting antiplatelet and anticoagulant regimen for acute ACS.',
        consequenceOnRight: 'Optimal antithrombotic therapy maintained without major bleeding.',
        consequenceOnWrong: 'Suboptimal dosing or inappropriate combination increases complication risk.',
      },
      {
        roleTag: 'PREVENTION',
        patientContext: 'Secondary prevention planning prior to discharge post acute coronary event.',
        consequenceOnRight: 'Statin, ACE inhibitor, Beta-blocker, and DAPT prescribed appropriately.',
        consequenceOnWrong: 'Missing secondary prevention medications increases 1-year re-infarction risk.',
      },
    ],
  },

  // 2. Diabetic Ketoacidosis (DKA)
  {
    id: 'scaffold_dka',
    title: 'Altered Sensorium with Vomiting',
    conditionName: 'Diabetic Ketoacidosis (DKA)',
    subject: 'Medicine',
    system: 'Endocrinology',
    demographics: {
      name: 'Aman Verma',
      age: 21,
      gender: 'Male',
      setting: 'Emergency',
    },
    openingVignette: 'A 21-year-old male is brought to casualty by parents with 2 days of abdominal pain, frequent vomiting, severe thirst, and progressive lethargy. On exam, he is confused with deep, rapid respirations and a fruity acetone odor on his breath.',
    initialVitals: {
      hr: 128,
      bp: '92/58',
      rr: 32,
      spo2: 97,
      temp: '37.8°C',
      grbs: 480,
    },
    clinchingClue: 'Serum Beta-hydroxybutyrate is 5.8 mmol/L, ABG shows pH 7.12, HCO3 8 mEq/L (High Anion Gap Metabolic Acidosis), Serum Ketones strongly positive 4+.',
    clinchingClueTimeMinutes: 15,
    examFindingsMap: {
      general: 'Deep rapid breathing (Kussmaul respiration), dry mucous membranes, sunken eyes, acetone breath odor.',
      chest: 'Lungs clear bilaterally. Tachypneic without focal rales.',
      cvs: 'Tachycardic, regular rhythm, weak peripheral pulses.',
      abdomen: 'Diffuse mild tenderness without rigidity or rebound. Bowel sounds sluggish.',
      neuro: 'GCS 13/15 (E3V4M6), confused, no focal neurological deficits.',
    },
    historyMap: {
      allergies: 'No known allergies.',
      past: 'Type 1 Diabetes Mellitus diagnosed 3 years ago. Missed insulin doses for 3 days due to gastroenteritis.',
      medications: 'Insulin Glargine + Insulin Lispro.',
    },
    investigationsMap: {
      grbs: {
        aliases: ['rbs / grbs', 'grbs', 'rbs', 'capillary glucose', 'blood glucose', 'random blood sugar', 'bedside glucose', 'glucometer reading', 'finger stick glucose'],
        resultText: 'GRBS: 480 mg/dL (Reference 70–140 mg/dL) — Severely elevated.',
        turnaroundMinutes: 2,
        category: 'labs',
        isIndicative: true,
      },
      abg: {
        aliases: ['abg', 'arterial blood gas'],
        resultText: 'ABG: pH 7.12 (Reference 7.35–7.45), PaCO2 20 mmHg (Reference 35–45 mmHg), PaO2 96 mmHg (Reference 80–100 mmHg), HCO3 8 mEq/L (Reference 22–26 mEq/L), Anion Gap 24 mEq/L (High Anion Gap Metabolic Acidosis).',
        turnaroundMinutes: 10,
        category: 'labs',
        isIndicative: true,
      },
      electrolytes: {
        aliases: ['serum electrolytes (na, k, cl)', 'electrolytes', 'serum electrolytes', 'na k cl', 'electrolyte panel'],
        resultText: 'Serum Electrolytes: Na+ 130 mEq/L (corrected 136 mEq/L, Ref 135–145), K+ 4.8 mEq/L (Ref 3.5–5.0), Cl- 98 mEq/L (Ref 96–106 mEq/L), Bicarbonate 8 mEq/L.',
        turnaroundMinutes: 20,
        category: 'labs',
        isIndicative: true,
      },
      // "Serum ketones" and "Urine ketones" are different orders with different
      // results — the exact bug this rebuild fixes. Serum beta-hydroxybutyrate
      // is the test that should be used to track resolution; urine ketones
      // (acetoacetate) lags behind clinical recovery and should not be used to
      // guide therapy — which is exactly why the two must never share a result.
      serum_ketones: {
        aliases: ['serum ketones', 'serum ketone', 'beta-hydroxybutyrate', 'blood ketones'],
        resultText: 'Serum Ketones: Positive 4+ (Beta-hydroxybutyrate 5.8 mmol/L, Ref <0.5 mmol/L).',
        turnaroundMinutes: 15,
        category: 'labs',
        isIndicative: true,
      },
      urine_ketones: {
        aliases: ['urine ketones', 'urine ketone', 'ketones urine', 'urine dipstick ketones'],
        resultText: 'Urine Ketones: 4+ (large) on dipstick — a qualitative acetoacetate test; it does not give a numeric ketone level the way the serum test does.',
        turnaroundMinutes: 10,
        category: 'labs',
        isIndicative: true,
      },
      rft: {
        aliases: ['rft / kft (urea, creatinine)', 'rft', 'kft', 'renal function test', 'kidney function test', 'urea creatinine', 'blood urea', 'serum creatinine'],
        resultText: 'Renal Function: Blood Urea 54 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 1.6 mg/dL (Reference 0.6–1.2 mg/dL) — Prerenal azotemia secondary to severe volume depletion.',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: true,
      },
      cbc: {
        aliases: ['cbc / hemogram', 'cbc', 'complete blood count', 'hemogram'],
        resultText: 'CBC: Hb 15.8 g/dL (hemoconcentration), WBC 16,200/mcL (Reference 4,000–11,000/mcL), Platelets 280,000/mcL.',
        turnaroundMinutes: 20,
        category: 'labs',
        isIndicative: false,
      },
      hba1c: {
        aliases: ['hba1c', 'glycated hemoglobin'],
        resultText: 'HbA1c: 11.2% (Reference <5.7%) — Chronic severe hyperglycemia.',
        turnaroundMinutes: 45,
        category: 'labs',
        isIndicative: false,
      },
      blood_cultures: {
        aliases: ['blood culture ×2 (before antibiotics)', 'blood cultures', 'blood culture', 'blood c/s'],
        resultText: 'Blood Cultures x2: Aerobic and anaerobic bottles incubated. No growth at 24 hours.',
        turnaroundMinutes: 60,
        category: 'labs',
        isIndicative: false,
      },
      ecg: {
        aliases: ['12-lead ecg', 'ecg', 'ekg', 'electrocardiogram'],
        resultText: '12-lead ECG: Sinus tachycardia at 128 bpm. Peaked T waves noted in V2-V4 (early hyperkalemia shift).',
        turnaroundMinutes: 5,
        category: 'imaging',
        isIndicative: true,
      },
      cxr: {
        aliases: ['chest x-ray pa', 'chest x-ray portable', 'cxr', 'chest xray', 'chest x ray'],
        resultText: 'Chest X-ray PA view: Normal lung fields, no infiltrates or consolidation.',
        turnaroundMinutes: 20,
        category: 'imaging',
        isIndicative: false,
      },
      urinalysis: {
        aliases: ['urine routine & microscopy', 'urinalysis', 'urine analysis', 'urine r/m', 'urine routine'],
        resultText: 'Urine Routine: Glucose 4+, Ketones 4+, Protein Trace, WBC 2-3/HPF, Nitrites Negative.',
        turnaroundMinutes: 10,
        category: 'labs',
        isIndicative: true,
      },
      serum_osmolality: {
        aliases: ['serum osmolality', 'serum osm', 'osmolality'],
        resultText: 'Calculated Serum Osmolality: 312 mOsm/kg (Reference 275–295 mOsm/kg).',
        turnaroundMinutes: 20,
        category: 'labs',
        isIndicative: true,
      },
    },
    therapiesMap: {
      iv_fluids: {
        aliases: [
          'normal saline 0.9% 500 ml bolus',
          'normal saline 30 ml/kg bolus',
          'ringer lactate 500 ml bolus',
          'iv fluids',
          'normal saline',
          '0.9% saline',
          'isotonic saline',
          'ns bolus',
          'crystalloid',
          'normal saline 1 l bolus',
          'normal saline 1l bolus',
          'ns 1 litre',
          'ns 1l bolus',
          '1 litre ns bolus',
          'fluid bolus',
          'normal saline bolus',
          'iv fluid',
          'saline bolus',
          'iv ns',
          'crystalloid bolus',
          'ns',
        ],
        responseText: 'IV 0.9% Normal Saline bolus given (15–20 mL/kg over the first hour), with ongoing isotonic fluid replacement.',
        onsetMinutes: 30,
        vitalsEffect: { hr: -8, bp: '104/66' },
        appropriateness: 'indicated',
        rationale: 'Initial isotonic fluid resuscitation restores intravascular volume and tissue perfusion and is the first priority in DKA, ahead of insulin.',
      },
      insulin: {
        aliases: ['insulin infusion', 'iv insulin', 'regular insulin infusion', 'actrapid', 'insulin', 'iv insulin infusion', 'regular insulin', 'iv regular insulin'],
        responseText: 'IV Regular Insulin infusion started at 0.1 units/kg/hr.',
        onsetMinutes: 60,
        vitalsEffect: { grbs: -220 },
        labShift: {
          abg: 'ABG (repeat): pH 7.32 (Reference 7.35–7.45), PaCO2 30 mmHg, PaO2 92 mmHg, HCO3 18 mEq/L, Anion Gap 14 mEq/L — acidosis improving with insulin and fluid therapy.',
          serum_ketones: 'Serum Ketones (repeat): Trace positive (Beta-hydroxybutyrate 0.9 mmol/L, Ref <0.5 mmol/L) — improving with treatment.',
          urine_ketones: 'Urine Ketones (repeat): Still 3+ on dipstick — acetoacetate clearance lags behind the serum beta-hydroxybutyrate improvement; do not use this test to judge resolution.',
          grbs: 'GRBS: 210 mg/dL (Reference 70–140 mg/dL) — falling with insulin infusion in progress.',
        },
        appropriateness: 'indicated',
        rationale: 'Continuous low-dose IV regular insulin is the definitive therapy that switches off ketogenesis and closes the anion gap. It should follow initial fluid resuscitation (and a check that potassium is not critically low), never precede it.',
        requiresFirst: ['iv_fluids'],
        harmfulSequenceResponseText: 'IV Regular Insulin infusion started at 0.1 units/kg/hr, before fluid resuscitation had been given.',
        harmfulSequenceVitalsEffect: { hr: 10, bp: '80/50' },
        harmfulSequenceRationale: 'Insulin given before volume resuscitation drives glucose — and potassium — intracellularly while the patient is still profoundly volume-depleted, worsening hypotension and risking sudden severe hypokalemia with cardiac arrhythmia. Fluids (with potassium checked and replaced as needed) must precede or accompany insulin, never follow it.',
      },
      potassium_replacement: {
        aliases: ['potassium chloride in infusion', 'kcl', 'potassium chloride', 'potassium replacement', 'iv potassium', 'inj kcl', 'potassium chloride infusion', 'potassium'],
        responseText: 'Potassium chloride added to IV fluids per serum potassium level.',
        onsetMinutes: 30,
        labShift: {
          electrolytes: 'Serum Electrolytes (repeat): Na+ 136 mEq/L (Ref 135–145), K+ 4.0 mEq/L (Ref 3.5–5.0), Cl- 100 mEq/L, Bicarbonate rising — potassium replacement running alongside the insulin infusion.',
        },
        appropriateness: 'indicated',
        rationale: 'Insulin drives potassium intracellularly; replacement guided by the serum potassium level (withheld if K+ >5.2 mEq/L, given before insulin if K+ <3.3 mEq/L) prevents life-threatening hypokalemia and arrhythmia.',
      },
      dextrose_5: {
        aliases: ['5% dextrose infusion', 'dextrose', 'dextrose infusion', 'd5', 'd5w', 'iv dextrose'],
        responseText: '5% Dextrose added to IV fluids once glucose approached 250 mg/dL; insulin infusion continued unchanged.',
        onsetMinutes: 15,
        vitalsEffect: { grbs: 20 },
        appropriateness: 'indicated',
        rationale: 'Adding dextrose once glucose falls near 200–250 mg/dL lets the insulin infusion continue clearing ketosis without causing hypoglycemia.',
      },
      sodium_bicarbonate: {
        aliases: ['sodium bicarbonate iv', 'sodium bicarbonate', 'bicarbonate', 'nahco3', 'iv bicarbonate', 'inj sodium bicarbonate', 'nahco3 iv'],
        responseText: 'IV Sodium Bicarbonate given.',
        onsetMinutes: 20,
        vitalsEffect: { hr: 4 },
        appropriateness: 'harmful',
        rationale: "Bicarbonate is reserved for severe acidosis (pH below roughly 6.9-7.0 by most DKA protocols); this patient's pH is 7.12. Giving it here is not indicated and can cause paradoxical CNS acidosis, worsen hypokalemia, and delay resolution of ketosis without proven benefit.",
      },
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /normal saline|0\.9% saline|iv fluids|crystalloid/i,
        name: 'Aggressive IV Isotonic Saline Resuscitation',
        targetMilestoneMinutes: 15,
      },
      {
        orderOrActionPattern: /potassium|kcl|k\+/i,
        name: 'Potassium Evaluation & Replacement',
        targetMilestoneMinutes: 25,
      },
      {
        orderOrActionPattern: /insulin|regular insulin|actrapid/i,
        name: 'Continuous IV Regular Insulin Infusion',
        targetMilestoneMinutes: 30,
      },
    ],
    incidentalPool: [
      {
        id: 'inc_dka_1',
        title: 'Mild Asymptomatic Hyperuricemia',
        description: 'Serum Uric Acid level is 8.4 mg/dL (Reference 3.5–7.2 mg/dL). Patient reports no joint pain or history of gout.',
        correctAction: 'Recheck uric acid after hydration and recovery from acute metabolic crisis.',
        status: 'unnoticed',
      },
      {
        id: 'inc_dka_2',
        title: 'Vitamin D Deficiency',
        description: 'Serum 25-Hydroxyvitamin D level is 11 ng/mL (Reference 30–100 ng/mL) — Deficiency.',
        correctAction: 'Initiate oral cholecalciferol 60,000 IU weekly for 8 weeks upon discharge.',
        status: 'unnoticed',
      },
    ],
    gateMilestones: [
      {
        roleTag: 'EMERGENCY',
        patientContext: 'Obtunded young male with deep rapid breathing and acetone odor; prioritizing initial volume resuscitation.',
        consequenceOnRight: 'IV Isotonic Saline 1-1.5 L given in first hour restoring intravascular volume.',
        consequenceOnWrong: 'Inadequate fluid resuscitation delays clearance of ketoacids and worsens acute kidney injury.',
      },
      {
        roleTag: 'DIAGNOSIS',
        patientContext: 'Evaluating severe metabolic acid-base disturbance with high anion gap and hyperglycemia.',
        consequenceOnRight: 'High anion gap acidosis correctly identified and protocol initiated.',
        consequenceOnWrong: 'Misinterpreting acid-base status leads to delayed therapy.',
      },
      {
        roleTag: 'PHARM',
        patientContext: 'Managing severe acidosis and serum potassium shifts prior to starting hormone infusion.',
        consequenceOnRight: 'Potassium checked and replaced before/during regular insulin drip.',
        consequenceOnWrong: 'Starting insulin without monitoring potassium precipitates severe hypokalemia and fatal arrhythmia.',
      },
      {
        roleTag: 'MANAGEMENT',
        patientContext: 'Transitioning fluid management when blood glucose falls below 250 mg/dL.',
        consequenceOnRight: '5% Dextrose added to IV fluids while maintaining insulin infusion to clear acidosis.',
        consequenceOnWrong: 'Failure to add dextrose causes severe hypoglycemia while ketoacidosis remains uncorrected.',
      },
      {
        roleTag: 'PREVENTION',
        patientContext: 'Discharge planning for intensive insulin regimen and sick-day medication guidelines.',
        consequenceOnRight: 'Basal-bolus insulin regimen and sick-day management education provided.',
        consequenceOnWrong: 'Lack of patient education leads to recurrent hospital admissions.',
      },
    ],
  },

  // 3. Eclampsia
  {
    id: 'scaffold_eclampsia',
    title: 'Seizure in Pregnant Female at 34 Weeks',
    conditionName: 'Eclampsia (Severe Preeclampsia)',
    subject: 'OBGY',
    system: 'Obstetrics',
    demographics: {
      name: 'Priyanka Devi',
      age: 26,
      gender: 'Female',
      setting: 'Emergency',
    },
    openingVignette: 'A 26-year-old primigravida at 34 weeks gestation is rushed to casualty following a witnessed 2-minute generalized tonic-clonic seizure at home. On arrival, she is post-ictal, confused, with severe pedal edema and facial puffiness. BP is 174/112 mmHg.',
    initialVitals: {
      hr: 116,
      bp: '174/112',
      rr: 22,
      spo2: 92,
      temp: '37.1°C',
      grbs: 98,
    },
    clinchingClue: 'Urine Dipstick reveals 3+ Proteinuria, Blood Pressure 174/112 mmHg, hyperreflexia with clonus, post-seizure state.',
    clinchingClueTimeMinutes: 5,
    examFindingsMap: {
      general: 'Drowsy, post-ictal state, generalized edema (facial and bilateral lower limb 3+ pitting edema).',
      cvs: 'S1 S2 heard, no murmurs, BP elevated 174/112 mmHg.',
      chest: 'Lungs clear bilaterally, no rales.',
      abdomen: 'Gravid uterus corresponding to 32-34 weeks, non-tender, relaxed between uterine contractions. Fetal heart rate 142 bpm.',
      neuro: 'Post-ictal lethargy, hyperreflexic knee jerks (4+) with 3 beats of ankle clonus.',
    },
    historyMap: {
      allergies: 'No known drug allergies.',
      past: 'Primigravida 34 weeks. Unbooked pregnancy. Complained of severe frontal headache and epigastric pain since morning.',
    },
    investigationsMap: {
      urinalysis: {
        aliases: ['urine routine & microscopy', 'urinalysis', 'urine dipstick', 'urine protein', 'urine r/m'],
        resultText: 'Urine Dipstick: 3+ Proteinuria (24-hour urine protein 3.8 g, Ref <0.3 g/24h). No glucosuria or nitrites.',
        turnaroundMinutes: 5,
        category: 'labs',
        isIndicative: true,
      },
      lft: {
        aliases: ['lft', 'hellp panel', 'liver function test'],
        resultText: 'LFT / HELLP Panel: AST 142 U/L (Ref 10–40), ALT 128 U/L (Ref 7–56), Total Bilirubin 1.8 mg/dL (Ref 0.2–1.2), LDH 780 U/L (Ref 140–280 U/L) — Hemolysis & elevated liver enzymes.',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: true,
      },
      cbc: {
        aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count'],
        resultText: 'CBC: Hb 11.0 g/dL, WBC 12,200/mcL, Platelets 88,000/mcL (Reference 150,000–450,000/mcL) — Moderate Thrombocytopenia.',
        turnaroundMinutes: 20,
        category: 'labs',
        isIndicative: true,
      },
      usg_fetal: {
        aliases: ['usg abdomen & pelvis', 'obstetric usg', 'fetal ultrasound', 'usg fetal', 'obstetric ultrasound', 'usg pregnancy'],
        resultText: 'Obstetric USG: Single live fetus 33 weeks, EFW 1.8 kg (IUGR), Oligohydramnios (AFI 6 cm), Doppler shows umbilical artery reversed end-diastolic flow.',
        turnaroundMinutes: 20,
        category: 'imaging',
        isIndicative: true,
      },
      kft: {
        aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'renal function test', 'kidney function test'],
        resultText: 'KFT: Blood Urea 42 mg/dL (Ref 15–40), Serum Creatinine 1.3 mg/dL (Ref 0.4–0.8 in pregnancy) — Impaired renal function.',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: true,
      },
      uric_acid: {
        aliases: ['serum uric acid', 'uric acid'],
        resultText: 'Serum Uric Acid: 8.2 mg/dL (Reference 2.5–5.5 mg/dL in pregnancy) — Elevated.',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: true,
      },
      coag_profile: {
        aliases: ['pt / inr', 'coagulation profile', 'coagulation panel', 'prothrombin time'],
        resultText: 'Coagulation Profile: PT 13.0 sec, INR 1.1, Fibrinogen 210 mg/dL (Ref 300–600 mg/dL in pregnancy).',
        turnaroundMinutes: 30,
        category: 'labs',
        isIndicative: true,
      },
      peripheral_smear: {
        aliases: ['peripheral smear', 'blood smear', 'pbs'],
        resultText: 'Peripheral Blood Smear: Schistocytes and helmet cells present (microangiopathic hemolytic anemia).',
        turnaroundMinutes: 30,
        category: 'labs',
        isIndicative: true,
      },
      abg: {
        aliases: ['abg', 'arterial blood gas'],
        resultText: 'ABG: pH 7.36, PaCO2 32 mmHg, PaO2 88 mmHg, HCO3 18 mEq/L, SaO2 96%.',
        turnaroundMinutes: 10,
        category: 'labs',
        isIndicative: false,
      },
      ecg: {
        aliases: ['12-lead ecg', 'ecg', 'ekg', 'electrocardiogram'],
        resultText: '12-lead ECG: Sinus tachycardia at 116 bpm. Left ventricular hypertrophy pattern.',
        turnaroundMinutes: 5,
        category: 'imaging',
        isIndicative: false,
      },
      blood_grouping: {
        aliases: ['blood grouping & cross-match', 'blood grouping', 'blood group', 'cross match', 'type and crossmatch'],
        resultText: 'Blood Grouping & Rh Typing: O Positive. Antibody screen negative. 2 units PRBC crossmatched.',
        turnaroundMinutes: 20,
        category: 'labs',
        isIndicative: true,
      },
      bstp: {
        aliases: ['biophysical profile', 'bpp', 'fetal biophysical profile', 'bpp score'],
        resultText: 'Biophysical Profile (BPP): 6/10 (Reduced amniotic fluid volume, non-reactive NST).',
        turnaroundMinutes: 30,
        category: 'imaging',
        isIndicative: true,
      },
    },
    therapiesMap: {
      magnesium_sulfate: {
        aliases: ['magnesium sulfate (pritchard regimen)', 'magnesium sulfate', 'mgso4', 'pritchard regimen', 'iv magnesium sulfate', 'mgso4 loading dose', 'magnesium'],
        responseText: 'IV Magnesium Sulfate loading dose given (4–6 g IV over 15–20 minutes), followed by a maintenance infusion.',
        onsetMinutes: 15,
        vitalsEffect: { hr: -8 },
        appropriateness: 'indicated',
        rationale: 'Magnesium sulfate is the anticonvulsant of choice in eclampsia, proven superior to diazepam and phenytoin at preventing recurrent seizures and reducing maternal mortality (MAGPIE trial).',
      },
      antihypertensive: {
        aliases: ['labetalol iv', 'hydralazine iv', 'nifedipine oral', 'labetalol', 'hydralazine', 'nifedipine', 'iv labetalol', 'antihypertensive', 'iv antihypertensive'],
        responseText: 'IV antihypertensive given and titrated toward a target BP below 160/110 mmHg (diastolic 90–100 mmHg).',
        onsetMinutes: 20,
        vitalsEffect: { hr: -4, bp: '148/96' },
        labShift: {
          urinalysis: 'Urine Dipstick (repeat): Still 3+ proteinuria, essentially unchanged. Blood pressure is now controlled, but the underlying renal/vascular process persists — delivery, not medication, is the definitive treatment.',
        },
        appropriateness: 'indicated',
        rationale: 'Rapid-acting antihypertensives reduce the risk of maternal hemorrhagic stroke in severe hypertension; overly aggressive lowering risking uteroplacental hypoperfusion should be avoided.',
      },
      alternative_anticonvulsant: {
        aliases: ['phenytoin loading', 'lorazepam iv', 'levetiracetam iv', 'diazepam', 'phenytoin', 'lorazepam', 'levetiracetam'],
        responseText: 'Anticonvulsant given for seizure control.',
        onsetMinutes: 15,
        vitalsEffect: { hr: 5 },
        appropriateness: 'harmful',
        rationale: 'Benzodiazepines and phenytoin are inferior to magnesium sulfate at preventing recurrent eclamptic seizures (MAGPIE trial and Cochrane evidence); magnesium sulfate is the evidence-based anticonvulsant of choice and should not be substituted.',
      },
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /magnesium sulfate|mgso4|pritchard|zuspan/i,
        name: 'IV Magnesium Sulfate Loading Dose',
        targetMilestoneMinutes: 10,
      },
      {
        orderOrActionPattern: /labetalol|hydralazine|nifedipine|antihypertensive/i,
        name: 'Rapid-Acting Antihypertensive Therapy',
        targetMilestoneMinutes: 15,
      },
    ],
    incidentalPool: [
      {
        id: 'inc_eclamp_1',
        title: 'Asymptomatic Bacteriuria',
        description: 'Urine microscopy notes 15-20 WBCs/HPF and Gram-negative bacilli.',
        correctAction: 'Start oral Nitrofurantoin or Amoxicillin-Clavulanate for asymptomatic bacteriuria in pregnancy after acute seizure stabilization.',
        status: 'unnoticed',
      },
      {
        id: 'inc_eclamp_2',
        title: 'Mild Iron Deficiency Anemia',
        description: 'Hemogram notes Hb 10.1 g/dL, MCV 72 fL, Serum Ferritin 12 ng/mL.',
        correctAction: 'Plan postpartum oral/parenteral iron supplementation after delivery.',
        status: 'unnoticed',
      },
    ],
    gateMilestones: [
      {
        roleTag: 'EMERGENCY',
        patientContext: '34-week pregnant female following generalized tonic-clonic activity; securing airway and selecting acute neuro-protection.',
        consequenceOnRight: 'Parenteral magnesium sulfate bolus administered halting recurrent convulsions.',
        consequenceOnWrong: 'Inappropriate anticonvulsant (e.g. Diazepam alone) fails to prevent recurrent convulsions.',
      },
      {
        roleTag: 'MANAGEMENT',
        patientContext: 'Evaluating blood pressure exceeding 160/110 mmHg and hyperreflexia.',
        consequenceOnRight: 'Parenteral Labetalol or Hydralazine titrated to achieve target diastolic BP 90-100 mmHg.',
        consequenceOnWrong: 'Uncontrolled severe hypertension increases risk of maternal hemorrhagic stroke.',
      },
      {
        roleTag: 'INVESTIGATION',
        patientContext: 'Ordering laboratory panel and fetal Doppler for microangiopathic process.',
        consequenceOnRight: 'HELLP spectrum and fetal compromise identified promptly.',
        consequenceOnWrong: 'Delayed laboratory testing misses microangiopathic hemolytic complications.',
      },
      {
        roleTag: 'PHARM',
        patientContext: 'Monitoring toxicity signs (patellar reflexes, respiratory rate, urine output) during continuous infusion.',
        consequenceOnRight: 'Reflexes monitored and calcium gluconate readily available at bedside.',
        consequenceOnWrong: 'Failure to monitor urine output leads to drug toxicity and respiratory depression.',
      },
      {
        roleTag: 'PREVENTION',
        patientContext: 'Determining definitive obstetric management and timing of delivery once stabilized.',
        consequenceOnRight: 'Prompt delivery planned post-stabilization regardless of gestational age.',
        consequenceOnWrong: 'Delaying delivery to prolong pregnancy increases maternal and fetal mortality.',
      },
    ],
  },

  // 4. Bacterial Meningitis
  {
    id: 'scaffold_meningitis',
    title: 'Fever, Severe Headache, and Neck Stiffness',
    conditionName: 'Acute Bacterial Meningitis',
    subject: 'Medicine',
    system: 'Infectious Disease',
    demographics: {
      name: 'Kavita Patel',
      age: 35,
      gender: 'Female',
      setting: 'Emergency',
    },
    openingVignette: 'A 35-year-old female presents with 18 hours of high-grade fever with chills, severe holocranial headache, photophobia, and persistent vomiting. On exam, she lies with hips and knees flexed and cries out on passive neck flexion.',
    initialVitals: {
      hr: 118,
      bp: '110/72',
      rr: 22,
      spo2: 96,
      temp: '39.4°C',
      grbs: 104,
    },
    clinchingClue: 'Positive Kernig and Brudzinski signs, CSF turbid with WBC 2,400/mm3 (90% Neutrophils), CSF Protein 280 mg/dL, CSF Glucose 18 mg/dL (Serum 104 mg/dL).',
    clinchingClueTimeMinutes: 20,
    examFindingsMap: {
      general: 'Febrile (39.4°C), ill-looking, photophobic, petechial rash noted on lower trunk and extremities.',
      neuro: 'Marked nuchal rigidity. Positive Kernig sign (pain on extending knee beyond 130 degrees). Positive Brudzinski sign (flexion of hips when neck is flexed). Fundoscopy: optic discs sharp.',
      cvs: 'Tachycardic, S1 S2 heard.',
      chest: 'Clear to auscultation.',
    },
    historyMap: {
      allergies: 'No known drug allergies.',
      past: 'Sinusitis 2 weeks ago untreated.',
    },
    investigationsMap: {
      csf: {
        aliases: ['csf analysis', 'csf', 'lumbar puncture', 'lp', 'csf tap'],
        resultText: 'CSF Analysis: Turbid appearance, Opening Pressure 28 cm H2O (elevated). WBC count 2,800/mm3 (88% Polymorphs), Protein 310 mg/dL (Ref 15–45), Glucose 16 mg/dL (CSF/Serum ratio 0.15). Gram stain: Gram-negative intracellular diplococci.',
        turnaroundMinutes: 45,
        category: 'labs',
        isIndicative: true,
      },
      blood_cultures: {
        aliases: ['blood culture ×2 (before antibiotics)', 'blood cultures', 'blood culture', 'blood c/s'],
        resultText: 'Blood Cultures x2 STAT: Plated for aerobic/anaerobic organisms. Gram-negative diplococci growing at 24 hours.',
        turnaroundMinutes: 60,
        category: 'labs',
        isIndicative: true,
      },
      ct_head: {
        aliases: ['ct head plain', 'ct head', 'ct brain', 'ct scan head'],
        resultText: 'Non-contrast CT Head: No mass effect, no midline shift, no cerebral edema or hydrocephalus. Cisterns clear.',
        turnaroundMinutes: 30,
        category: 'imaging',
        isIndicative: true,
      },
      cbc: {
        aliases: ['cbc / hemogram', 'cbc', 'complete blood count', 'hemogram'],
        resultText: 'CBC: WBC 21,500/mcL with 88% Neutrophils (Left shift), Hb 12.2 g/dL, Platelets 180,000/mcL.',
        turnaroundMinutes: 20,
        category: 'labs',
        isIndicative: true,
      },
      // ESR and CRP are two different tests reported as one combined
      // "inflammatory markers" entry in the old scaffold — split here for the
      // same reason serum/urine ketones were split in the DKA case.
      esr: {
        aliases: ['esr', 'erythrocyte sedimentation rate'],
        resultText: 'ESR: 78 mm/hr (Reference <20 mm/hr) — Markedly elevated.',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: true,
      },
      crp: {
        aliases: ['crp', 'c reactive protein'],
        resultText: 'Serum CRP: 185 mg/L (Reference <5 mg/L) — Markedly elevated.',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: true,
      },
      kft: {
        aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'renal function test', 'kidney function test'],
        resultText: 'KFT: Blood Urea 36 mg/dL, Serum Creatinine 1.1 mg/dL, Na+ 132 mEq/L (mild hyponatremia due to SIADH), K+ 4.1 mEq/L.',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: false,
      },
      lft: {
        aliases: ['lft', 'liver function test'],
        resultText: 'LFT: AST 34 U/L, ALT 28 U/L, Total Bilirubin 0.9 mg/dL, Albumin 3.8 g/dL.',
        turnaroundMinutes: 30,
        category: 'labs',
        isIndicative: false,
      },
      electrolytes: {
        aliases: ['serum electrolytes (na, k, cl)', 'electrolytes', 'serum electrolytes', 'na k cl'],
        resultText: 'Serum Electrolytes: Na+ 132 mEq/L (Ref 135–145), K+ 4.1 mEq/L, Cl- 98 mEq/L.',
        turnaroundMinutes: 20,
        category: 'labs',
        isIndicative: false,
      },
      abg: {
        aliases: ['abg', 'arterial blood gas'],
        resultText: 'ABG: pH 7.42, PaCO2 34 mmHg, PaO2 92 mmHg, HCO3 22 mEq/L, SaO2 97%.',
        turnaroundMinutes: 10,
        category: 'labs',
        isIndicative: false,
      },
      coag_pt_inr: {
        aliases: ['pt / inr', 'coagulation profile', 'coagulation panel', 'prothrombin time'],
        resultText: 'Coagulation Profile: PT 12.8 sec, INR 1.1, aPTT 31 sec, D-Dimer 850 ng/mL.',
        turnaroundMinutes: 25,
        category: 'labs',
        isIndicative: true,
      },
      grbs: {
        aliases: ['rbs / grbs', 'grbs', 'rbs', 'blood sugar', 'bedside glucose', 'capillary glucose'],
        resultText: 'GRBS: 104 mg/dL (Reference 70–140 mg/dL).',
        turnaroundMinutes: 2,
        category: 'labs',
        isIndicative: true,
      },
      cxr: {
        aliases: ['chest x-ray pa', 'chest x-ray portable', 'cxr', 'chest xray', 'chest x ray'],
        resultText: 'Chest X-ray PA view: Normal lung fields, clear costophrenic angles.',
        turnaroundMinutes: 20,
        category: 'imaging',
        isIndicative: false,
      },
    },
    therapiesMap: {
      ceftriaxone: {
        aliases: ['ceftriaxone 2 g iv', 'ceftriaxone', 'iv ceftriaxone', 'inj ceftriaxone'],
        responseText: 'IV Ceftriaxone 2 g given empirically.',
        onsetMinutes: 30,
        vitalsEffect: { hr: -6 },
        labShift: {
          csf: 'CSF Analysis (repeat): Turbidity clearing. WBC 620/mm3 (predominantly lymphocytes now), Protein 190 mg/dL, Glucose 38 mg/dL (CSF/serum ratio improving) — trending toward resolution on antibiotic therapy; full clearance typically takes 24–48 hours.',
          crp: 'Serum CRP (repeat): 96 mg/L (Reference <5 mg/L) — declining from admission but still elevated.',
          cbc: 'CBC (repeat): WBC 14,800/mcL with an improving differential, Hb 12.1 g/dL, Platelets 190,000/mcL — trending toward normal on antibiotics.',
        },
        appropriateness: 'indicated',
        rationale: 'Empiric high-dose ceftriaxone covers the leading community-acquired bacterial meningitis pathogens and should be started immediately, without waiting for imaging or CSF results.',
      },
      vancomycin: {
        aliases: ['vancomycin iv', 'vancomycin', 'iv vancomycin'],
        responseText: 'IV Vancomycin added to empiric coverage.',
        onsetMinutes: 30,
        appropriateness: 'indicated',
        rationale: 'Vancomycin is added empirically alongside a third-generation cephalosporin to cover cephalosporin-non-susceptible Streptococcus pneumoniae until susceptibilities return.',
      },
      meropenem: {
        aliases: ['meropenem iv', 'meropenem', 'iv meropenem'],
        responseText: 'IV Meropenem given as broad-spectrum empiric cover.',
        onsetMinutes: 30,
        appropriateness: 'indicated',
        rationale: 'Meropenem is a reasonable broad-spectrum empiric alternative for bacterial meningitis, particularly with beta-lactam allergy or concern for resistant Gram-negative organisms.',
      },
      ampicillin: {
        aliases: ['ampicillin', 'ampicillin iv', 'iv ampicillin'],
        responseText: 'IV Ampicillin added for additional coverage.',
        onsetMinutes: 30,
        appropriateness: 'indicated',
        rationale: 'Ampicillin is added empirically to cover Listeria monocytogenes in patients at risk (neonates, pregnancy, older age, or immunocompromise).',
      },
      dexamethasone: {
        aliases: ['dexamethasone iv', 'dexamethasone', 'steroid', 'iv dexamethasone', 'inj dexamethasone'],
        responseText: 'IV Dexamethasone 10 mg given.',
        onsetMinutes: 20,
        vitalsEffect: { temp: '38.2°C' },
        appropriateness: 'indicated',
        rationale: 'Adjunctive dexamethasone reduces the risk of neurological sequelae, particularly hearing loss, in bacterial meningitis — but only when given with or just before the first antibiotic dose; benefit is reduced if it is delayed until after antibiotics have already been started.',
      },
      inadequate_antibiotic: {
        aliases: ['azithromycin', 'doxycycline', 'iv azithromycin', 'oral doxycycline'],
        responseText: 'Antibiotic given.',
        onsetMinutes: 30,
        vitalsEffect: { hr: 8, temp: '40.0°C' },
        appropriateness: 'harmful',
        rationale: 'Azithromycin and doxycycline do not reliably cover the leading bacterial meningitis pathogens and have poor CNS penetration; neither is an appropriate empiric choice here, and giving one leaves the infection effectively untreated.',
      },
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /ceftriaxone|cefotaxime|vancomycin|ampicillin|antibiotic/i,
        name: 'Empiric IV High-Dose Antibiotics (Ceftriaxone + Vancomycin)',
        targetMilestoneMinutes: 20,
      },
      {
        orderOrActionPattern: /dexamethasone|steroid/i,
        name: 'IV Dexamethasone Prior to or With First Antibiotic Dose',
        targetMilestoneMinutes: 20,
      },
    ],
    incidentalPool: [
      {
        id: 'inc_mening_1',
        title: 'Mild Asymptomatic Iron Deficiency',
        description: 'Hemogram notes Hb 10.2 g/dL, MCV 74 fL, Serum Ferritin 14 ng/mL (Reference 15–150 ng/mL).',
        correctAction: 'Initiate oral iron supplementation after acute infection resolves.',
        status: 'unnoticed',
      },
      {
        id: 'inc_mening_2',
        title: 'Solitary 8mm Simple Hepatic Cyst',
        description: 'Abdominal ultrasound cuts note a well-circumscribed 8mm thin-walled anechoic hepatic cyst.',
        correctAction: 'Reassure patient — benign simple hepatic cyst requiring no surgical or medical intervention.',
        status: 'unnoticed',
      },
    ],
    gateMilestones: [
      {
        roleTag: 'EMERGENCY',
        patientContext: 'Febrile patient with headache, photophobia, and neck stiffness; prioritizing immediate antimicrobial administration.',
        consequenceOnRight: 'Blood cultures drawn and IV Ceftriaxone + Vancomycin + Dexamethasone administered within 20 mins.',
        consequenceOnWrong: 'Delaying antibiotics for imaging/LP increases mortality and permanent neurological sequelae!',
      },
      {
        roleTag: 'DIAGNOSIS',
        patientContext: 'Evaluating signs of meningeal irritation and turbid subarachnoid fluid findings.',
        consequenceOnRight: 'Acute polymorphonuclear inflammatory profile confirmed.',
        consequenceOnWrong: 'Misinterpreting CSF cell count leads to inappropriate antiviral therapy.',
      },
      {
        roleTag: 'INVESTIGATION',
        patientContext: 'Selecting empiric adjunctive anti-inflammatory therapy prior to antimicrobial administration.',
        consequenceOnRight: 'IV Dexamethasone 10mg administered with or 15 mins prior to antibiotic dose to reduce hearing loss.',
        consequenceOnWrong: 'Omitting corticosteroids increases risk of sensorineural hearing loss and neurological disability.',
      },
      {
        roleTag: 'PHARM',
        patientContext: 'Adjusting targeted antimicrobial spectrum based on Gram-negative diplococci on stain.',
        consequenceOnRight: 'Targeted high-dose Ceftriaxone therapy continued for 7 days.',
        consequenceOnWrong: 'Inappropriate narrowing or suboptimal dosing leads to treatment failure.',
      },
      {
        roleTag: 'PREVENTION',
        patientContext: 'Chemoprophylaxis planning for close household contacts following organism identification.',
        consequenceOnRight: 'Rifampin or single-dose Ciprofloxacin prescribed for close household contacts.',
        consequenceOnWrong: 'Failure to provide contact prophylaxis risks secondary outbreak among contacts.',
      },
    ],
  },

  // 5-12. Authored to the same standard, one file each, so a case can be read
  // and reviewed on its own without scrolling past three others.
  SCAFFOLD_ASTHMA,
  SCAFFOLD_VARICEAL_BLEED,
  SCAFFOLD_STATUS_EPILEPTICUS,
  SCAFFOLD_MALARIA,
  SCAFFOLD_PNEUMOTHORAX,
  SCAFFOLD_MALNUTRITION,
  SCAFFOLD_ANAPHYLAXIS,
  SCAFFOLD_PPH,

  // 13-20. INICET-weighted batch. Chosen as much for spread as for topic: the
  // library was seven-twelfths Medicine before these, which is not what the exam
  // looks like. These bring Emergency, Surgery, Paediatrics and OBGY to three
  // apiece.
  SCAFFOLD_ORGANOPHOSPHATE,
  SCAFFOLD_SNAKE_BITE,
  SCAFFOLD_ECTOPIC,
  SCAFFOLD_APPENDICITIS,
  SCAFFOLD_BURNS,
  SCAFFOLD_NEONATAL_SEPSIS,
  SCAFFOLD_DENGUE_SHOCK,
  SCAFFOLD_ISCHEMIC_STROKE,

  // 21-28. Chosen for subject reach as much as topic: five of these open a
  // discipline the library did not cover at all.
  SCAFFOLD_ANGLE_CLOSURE,
  SCAFFOLD_TEN,
  SCAFFOLD_DELIRIUM_TREMENS,
  SCAFFOLD_LUDWIGS,
  SCAFFOLD_COMPARTMENT,
  SCAFFOLD_PANCREATITIS,
  SCAFFOLD_PEDIATRIC_DKA,
  SCAFFOLD_TORSION,
];
