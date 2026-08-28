import { CaseScaffold } from '../../types';

export const CASE_SCAFFOLDS: CaseScaffold[] = [
  {
    id: "scaffold_stemi",
    title: "Acute Chest Pain in Emergency",
    conditionName: "Acute Anterior Wall STEMI",
    subject: "Medicine",
    system: "Cardiology",
    demographics: {
      "name": "Ramesh Kumar",
      "age": 54,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 54-year-old male presents with 90 minutes of acute, severe retrosternal crushing chest pain radiating to left arm and jaw with profuse diaphoresis and nausea. Known type 2 diabetic for 8 years.",
    initialVitals: {
      "hr": 110,
      "bp": "140/90",
      "rr": 22,
      "spo2": 94,
      "temp": "37.0°C",
      "grbs": 186
},
    clinchingClue: "12-lead ECG reveals 4mm convex-upward ST-segment elevation in leads V1-V4 with reciprocal ST depression in II, III, aVF.",
    clinchingClueTimeMinutes: 10,
    examFindingsMap: {
      "cvs": "S1 S2 heard, soft S4 gallop present at apex. JVP 3 cm above sternal angle. No pericardial rub or murmurs.",
      "chest": "Bilateral basal fine end-inspiratory crepitations up to lower 1/3rd of lung fields. No wheezing.",
      "abdomen": "Soft, non-tender, no hepatomegaly, normal active bowel sounds present.",
      "neuro": "Alert, oriented x3, gross cranial nerves intact, no focal motor deficits, GCS 15/15.",
      "general": "Pale, profusely diaphoretic, anxious, no peripheral cyanosis, clubbing, or pedal edema.",
      "vitals": "HR 110 bpm regular, BP 140/90 mmHg, RR 22/min, SpO2 94% on room air, Temp 37.0°C, GRBS 186 mg/dL.",
      "local": "No calf swelling, calf tenderness, or varicosities bilaterally. Peripheral pulses (radial, femoral, dorsalis pedis) palpable and symmetric."
    },
    historyMap: {
      "allergies": "No known drug allergies (NKDA).",
      "past": "Type 2 Diabetes Mellitus for 8 years on oral hypoglycemics. Smoker 15 pack-years. No prior myocardial infarction or angina.",
      "medications": "Metformin 500 mg BD. Irregular compliance. No other regular prescription medications.",
      "family": "Father died of sudden cardiac death at age 52. Mother has hypertension.",
      "social": "Smokes 10 cigarettes/day for 15 years. Occasional alcohol consumption on weekends. Sedentary lifestyle.",
      "surgical": "No previous major surgical procedures or hospitalizations.",
      "presenting": "Substernal crushing, heavy pressure pain started suddenly at rest 90 minutes ago, radiating to left shoulder, inner arm, and lower jaw, accompanied by cold sweats, lightheadedness, and impending doom."
    },
    investigationsMap: {
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 110 bpm. 4 mm convex-upward ST-segment elevations in V1–V4 with hyperacute T waves; reciprocal ST depressions (1.5 mm) in leads II, III, and aVF (Diagnostic of Acute Extensive Anterior STEMI).",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "troponin": {
        resultText: "High-Sensitivity STAT Cardiac Troponin I: 3.84 ng/mL (Reference interval: <0.04 ng/mL) — Markedly Elevated. CK-MB: 52 U/L (Reference: <25 U/L).",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 14.4 g/dL (13.0–17.0), Total WBC Count 11,800/mcL (4,000–11,000) with 78% Neutrophils, Platelet Count 248,000/mcL (150,000–450,000), Hematocrit 42.6%.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 32 mg/dL (15–40), Serum Creatinine 1.0 mg/dL (0.7–1.3), eGFR >90 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 138 mEq/L (135–145), Potassium 4.1 mEq/L (3.5–5.0), Chloride 101 mEq/L (96–106), Bicarbonate 23 mEq/L (22–28).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.8 mg/dL (0.2–1.2), SGOT/AST 42 U/L (10–40), SGPT/ALT 36 U/L (7–56), Alkaline Phosphatase 82 U/L (44–147), Serum Albumin 4.2 g/dL (3.5–5.2).",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas (Room Air): pH 7.39 (7.35–7.45), PaCO2 37 mmHg (35–45), PaO2 82 mmHg (80–100), HCO3 22.8 mEq/L (22–26), SaO2 94% (95–100%), Blood Lactate 1.4 mmol/L (<2.0).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: Prothrombin Time (PT) 12.4 sec (Control 12.0), INR 1.02 (0.9–1.1), aPTT 28.6 sec (25–35).",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray (AP View): Cardiothoracic ratio 50%, mild upper lobe pulmonary venous diversion consistent with early LV strain (Killip Class II). No pneumothorax or widened mediastinum.",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "echo": {
        resultText: "STAT Bedside Echocardiogram: Regional kinetic defect (anterior, anteroseptal, and apical akinesis). Estimated LVEF 40%. No pericardial effusion, mechanical VSR, or acute severe MR.",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "lipid_panel": {
        resultText: "Fasting Lipid Profile: Total Cholesterol 242 mg/dL (<200), LDL-C 164 mg/dL (<100), HDL-C 36 mg/dL (>40), Triglycerides 210 mg/dL (<150).",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: false
      },
      "serum_tsh": {
        resultText: "Thyroid Stimulating Hormone (TSH): 2.4 mIU/L (0.4–4.2 mIU/L). Euthyroid status.",
        turnaroundMinutes: 45,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /aspirin|ecosprin|antiplatelet|ticagrelor|clopidogrel/i,
        name: "Dual Antiplatelet Loading (Aspirin 300mg + Ticagrelor 180mg / Clopidogrel 600mg)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /pci|cath lab|coronary angiography|thrombolysis|tenecteplase|streptokinase|reperfusion/i,
        name: "STAT Primary PCI Activation / Thrombolytic Reperfusion Pathway",
        targetMilestoneMinutes: 20
      },
      {
        orderOrActionPattern: /heparin|enoxaparin|lmwh|anticoagulat/i,
        name: "Parenteral Anticoagulation (IV Unfractionated Heparin Bolus or SC Enoxaparin)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /atorvastatin|statin|rosuvastatin/i,
        name: "High-Intensity Statin Therapy (Atorvastatin 80mg STAT)",
        targetMilestoneMinutes: 30
      }
    ],
    incidentalPool: [
      {
        id: "inc_stemi_1",
        title: "Solitary Subpleural Calcified Granuloma",
        description: "Incidental 5mm dense calcified granuloma noted in right middle lung zone on portable CXR, typical of healed benign tuberculous/fungal granuloma.",
        correctAction: "Document in medical record; no acute workup or biopsy warranted.",
        status: "unnoticed"
      },
      {
        id: "inc_stemi_2",
        title: "Asymptomatic Hyperuricemia",
        description: "Serum uric acid returned at 8.4 mg/dL without history of gouty arthritis or renal calculi.",
        correctAction: "Avoid acute pharmacologic lowering during active STEMI; dietary lifestyle advice post-discharge.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Middle-aged diabetic male presenting with acute retrosternal heaviness radiating to left jaw, diaphoresis, and ST-segment elevations in V1-V4; clinician must determine primary etiology and immediate reperfusion pathway.",
        consequenceOnRight: "Acute ST-Elevation Myocardial Infarction recognized immediately; primary reperfusion protocol triggered within target door-to-balloon time.",
        consequenceOnWrong: "Failure to establish rapid diagnosis causes critical delay in myocardial salvage and increases risk of fatal arrhythmias."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Emergency physician assessing acute ischemic chest pain requires immediate 12-lead electrocardiography and cardiac biomarkers to guide urgent invasive strategy.",
        consequenceOnRight: "12-lead ECG performed within 5 minutes revealing anterior injury pattern; bedside echo confirms regional hypokinesis without mechanical defect.",
        consequenceOnWrong: "Delay in obtaining 12-lead ECG delays cath lab activation beyond the golden hour."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "First-line STAT pharmacotherapy required immediately upon identifying acute coronary occlusion in resuscitation bay.",
        consequenceOnRight: "Dual antiplatelet loading (Aspirin 300mg + Ticagrelor 180mg) and IV heparin administered rapidly, halting coronary thrombus propagation.",
        consequenceOnWrong: "Omission of STAT antiplatelet loading worsens coronary microvascular obstruction and stent thrombosis risk."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Definitive reperfusion strategy selection: Emergency primary catheter intervention vs pharmacologic lysis based on door-to-balloon and transfer logistics.",
        consequenceOnRight: "Primary PCI pathway activated; coronary angiogram reveals 100% proximal LAD occlusion successfully stented with drug-eluting stent (TIMI-3 flow restored).",
        consequenceOnWrong: "Inappropriate conservative medical management chosen; patient develops progressive cardiogenic shock."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Monitoring for early post-infarct complications including Killip II heart failure, tachyarrhythmias, and mechanical structural defects.",
        consequenceOnRight: "Continuous telemetry and fluid management initiated; mild basal rales managed with low-dose loop diuretic, preventing pulmonary edema.",
        consequenceOnWrong: "Excessive IV fluid boluses trigger flash pulmonary edema requiring emergent non-invasive ventilation."
      }
    ]
  },
  {
    id: "scaffold_pe",
    title: "Sudden Breathlessness & Hemoptysis Post-Trauma",
    conditionName: "Acute Massive Pulmonary Embolism",
    subject: "Medicine",
    system: "Respiratory",
    demographics: {
      "name": "Sunita Verma",
      "age": 48,
      "gender": "Female",
      "setting": "Emergency"
},
    openingVignette: "A 48-year-old female presents with sudden-onset severe pleuritic chest pain, breathlessness, and hemoptysis. She underwent right total knee replacement surgery 12 days ago and has been on prolonged bed rest.",
    initialVitals: {
      "hr": 128,
      "bp": "86/56",
      "rr": 32,
      "spo2": 84,
      "temp": "37.4°C",
      "grbs": 118
},
    clinchingClue: "CT Pulmonary Angiogram (CTPA) shows large saddle embolus straddling main pulmonary bifurcation with extensive right ventricular strain (RV/LV ratio 1.4).",
    clinchingClueTimeMinutes: 20,
    examFindingsMap: {
      "cvs": "Tachycardia 128 bpm, loud P2 (pulmonic component of S2), tricuspid regurgitant murmur at lower sternal border, elevated JVP with prominent 'v' wave (5 cm above sternal angle).",
      "chest": "Bilateral vesicular breath sounds, mild right basal crackles and pleural friction rub. Severe tachypnea with accessory muscle use.",
      "abdomen": "Soft, mildly tender hepatomegaly due to acute right ventricular congestion, no ascites, bowel sounds present.",
      "neuro": "Restless, mildly confused due to cerebral hypoperfusion, pupils equal and reactive, no focal neurological deficits.",
      "general": "Marked central cyanosis on room air, cold clammy extremities, diaphoretic, severe respiratory distress.",
      "vitals": "Shock state: HR 128 bpm (sinus tachycardia), BP 86/56 mmHg (MAP 66), RR 32/min, SpO2 84% on room air, Temp 37.4°C, GRBS 118 mg/dL.",
      "local": "Right lower limb: Post-operative healing scar over right knee, marked unilateral right calf edema (+3 cm compared to left), tenderness on calf compression, positive Homans sign."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Right total knee replacement 12 days ago. History of mild varicose veins. No prior DVT or PE.",
      "medications": "Paracetamol PRN. Thrombo-prophylaxis was discontinued prematurely 4 days ago by patient.",
      "family": "No known family history of coagulopathy or hypercoagulable disorders.",
      "social": "Non-smoker, non-alcoholic, works as a school teacher.",
      "surgical": "Elective uncomplicated Right Total Knee Arthroplasty 12 days ago under spinal anesthesia.",
      "presenting": "Sudden onset of stabbing right-sided chest pain, severe dyspnea, and two episodes of blood-streaked sputum (hemoptysis) started 1 hour ago while attempting to ambulate."
    },
    investigationsMap: {
      "ctpa": {
        resultText: "CT Pulmonary Angiography (CTPA): Large saddle embolus lodged in main pulmonary artery trunk extending into right and left main pulmonary arteries. Severe RV enlargement with RV/LV ratio 1.4 and interventricular septal flattening.",
        turnaroundMinutes: 30,
        category: "imaging",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 128 bpm, S1Q3T3 pattern (prominent S in I, Q in III, inverted T in III), right bundle branch block (RBBB), and T-wave inversions in V1–V4 (Acute Cor Pulmonale).",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas (Room Air): pH 7.48 (7.35–7.45), PaCO2 26 mmHg (35–45, respiratory alkalosis), PaO2 48 mmHg (80–100, severe hypoxemia), HCO3 20 mEq/L, SaO2 83%, A-a gradient 54 mmHg (markedly widened).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "d_dimer": {
        resultText: "Quantitative D-Dimer: 4,850 ng/mL FEU (Reference: <500 ng/mL FEU) — Markedly Elevated.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "echo": {
        resultText: "STAT Bedside Echocardiogram: Severe right ventricular dilatation and hypokinesia with sparing of the RV apex (McConnell sign positive). Systolic pulmonary artery pressure estimated at 55 mmHg. IVC plethoric (>2.2 cm, <50% collapse).",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "troponin": {
        resultText: "High-Sensitivity STAT Troponin I: 0.42 ng/mL (Reference: <0.04 ng/mL) — Elevated secondary to acute RV myocardial micro-infarction / strain.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 12.2 g/dL, Total WBC Count 9,600/mcL, Platelets 210,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 38 mg/dL, Serum Creatinine 1.1 mg/dL, eGFR 78 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 139 mEq/L, Potassium 4.3 mEq/L, Chloride 102 mEq/L, Bicarbonate 21 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 1.1 mg/dL, AST 44 U/L, ALT 38 U/L, Alkaline Phosphatase 90 U/L.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 13.0 sec, INR 1.05, aPTT 29.2 sec (Normal baseline prior to anticoagulation/thrombolysis).",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Wedge-shaped peripheral pleural-based opacity at right lower zone (Hampton hump) and focal oligemia of right lung (Westermark sign).",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "serum_amylase": {
        resultText: "Serum Amylase: 55 U/L (Reference: 28–100 U/L). Normal.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /oxygen|high flow|nrbm|intubation|resuscitation/i,
        name: "High-Flow Supplemental Oxygen (15 L/min NRBM) to Correct Severe Hypoxemia",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /alteplase|tpa|tenecteplase|thrombolysis|streptokinase|embolectomy/i,
        name: "STAT Systemic Thrombolysis (Alteplase 100mg IV over 2h) or Surgical/Catheter Embolectomy for High-Risk PE",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /heparin|ufh|unfractionated heparin|lmwh|enoxaparin/i,
        name: "STAT Unfractionated Heparin IV Bolus (80 units/kg) + Continuous Infusion (18 units/kg/hr)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /noradrenaline|norepinephrine|vasopressor|fluid bolus|cautious fluids/i,
        name: "Cautious Judicious Fluid Bolus (max 500 mL) & Norepinephrine Infusion for Right Ventricular Support",
        targetMilestoneMinutes: 15
      }
    ],
    incidentalPool: [
      {
        id: "inc_pe_1",
        title: "Incidental Small Hepatic Hemangioma",
        description: "CTPA visualizes upper abdomen showing a 1.2 cm well-circumscribed hypodense liver lesion with peripheral nodular enhancement, typical of benign hemangioma.",
        correctAction: "No acute intervention required; reassure patient after recovery from acute PE.",
        status: "unnoticed"
      },
      {
        id: "inc_pe_2",
        title: "Mild Degenerative Lumbar Spondylosis",
        description: "CT topogram demonstrates mild L4-L5 disc space narrowing and anterior osteophytosis without neurological compromise.",
        correctAction: "Conservative outpatient physiotherapy once fully stabilized.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Post-operative orthopedic patient presenting with sudden collapse, tachypnea, severe hypoxemia, low blood pressure, and acute right heart strain. Clinician must identify hemodynamic compromise etiology.",
        consequenceOnRight: "Massive thromboembolic occlusion with obstructive shock diagnosed rapidly; emergency thrombolytic pathway activated.",
        consequenceOnWrong: "Diagnostic misattribution to myocardial infarction delays reperfusion and precipitates irreversible right heart failure."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Hemodynamically unstable patient with suspected vascular obstruction requires rapid bedside echocardiography and STAT contrast vascular imaging.",
        consequenceOnRight: "Bedside Echo and STAT CTPA rapidly confirm saddle clot and severe right-sided pressure overload.",
        consequenceOnWrong: "Relying solely on non-specific blood tests without definitive vascular imaging delays life-saving interventions."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Immediate life support and vascular reperfusion required for patient in obstructive shock secondary to central arterial obstruction.",
        consequenceOnRight: "Systemic thrombolytic infusion initiated along with targeted vasopressor support, restoring circulation.",
        consequenceOnWrong: "Withholding thrombolysis in hemodynamically unstable presentation leads to circulatory arrest."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Institution of therapeutic parenteral anticoagulation (IV UFH infusion titrated to aPTT 1.5–2.5x control) and ICU hemodynamic monitoring.",
        consequenceOnRight: "Therapeutic anticoagulation established smoothly, preventing recurrent thrombosis and extension.",
        consequenceOnWrong: "Sub-therapeutic anticoagulation results in clot propagation."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Monitoring for post-thrombolysis major bleeding complications (intracranial hemorrhage, surgical site bleeding) and chronic hypertension.",
        consequenceOnRight: "Frequent neurological checks and knee wound inspections ensure safety with prompt identification of any bleed.",
        consequenceOnWrong: "Failure to monitor coagulation and neurological status increases risk of unnoticed major hemorrhagic transformation."
      }
    ]
  },
  {
    id: "scaffold_dka",
    title: "Altered Sensorium, Kussmaul Breathing & Vomiting in Young Diabetic",
    conditionName: "Diabetic Ketoacidosis (DKA)",
    subject: "Medicine",
    system: "Endocrinology",
    demographics: {
      "name": "Aakash Sharma",
      "age": 22,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 22-year-old male with type 1 diabetes presents with 2 days of severe nausea, persistent vomiting, abdominal pain, deep rapid sighing respiration, and progressive confusion following a febrile upper respiratory tract infection.",
    initialVitals: {
      "hr": 122,
      "bp": "96/60",
      "rr": 34,
      "spo2": 98,
      "temp": "38.2°C",
      "grbs": 486
},
    clinchingClue: "ABG demonstrates severe high anion gap metabolic acidosis (pH 7.12, HCO3 7.8 mEq/L, Anion Gap 27.2 mEq/L) with high serum beta-hydroxybutyrate (5.8 mmol/L) and heavy ketonuria.",
    clinchingClueTimeMinutes: 15,
    examFindingsMap: {
      "cvs": "Tachycardia 122 bpm, peripheral pulses weak and thready, normal S1 S2, no added heart sounds or pericardial rub.",
      "chest": "Deep, rapid, labored respirations (Kussmaul breathing, RR 34/min) with prominent sweet fruity acetone breath odor. Lungs clear to auscultation bilaterally.",
      "abdomen": "Diffuse generalized abdominal tenderness without localized peritonitis, involuntary guarding, or rebound tenderness; hypoactive bowel sounds.",
      "neuro": "Lethargic, confused, oriented only to person (GCS 12/15: E3V4M5), pupils symmetric and reactive, deep tendon reflexes sluggish, no focal motor deficits.",
      "general": "Severe signs of volume depletion: sunken eyes, dry crusted tongue and oral mucosa, poor skin turgor (tenting), cold peripheries.",
      "vitals": "HR 122 bpm, BP 96/60 mmHg (orthostatic drop present), RR 34/min, SpO2 98% on room air, Temp 38.2°C, GRBS 486 mg/dL.",
      "local": "Insulin injection sites over anterior abdominal wall show mild subcutaneous lipohypertrophy. No active skin abscess or furuncles."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Type 1 Diabetes Mellitus diagnosed 5 years ago. Omitted insulin doses over the last 36 hours due to anorexia and vomiting.",
      "medications": "Subcutaneous Basal-Bolus Insulin Regimen (Glargine 22 units at bedtime + Aspart 6 units before meals).",
      "family": "Maternal aunt has autoimmune thyroiditis.",
      "social": "College student, non-smoker, does not consume alcohol or recreational substances.",
      "surgical": "No past surgical operations.",
      "presenting": "Began experiencing fever, sore throat, and productive cough 3 days ago, followed by intractable vomiting, severe cramping abdominal pain, polyuria, polydipsia, and lethargy."
    },
    investigationsMap: {
      "abg": {
        resultText: "STAT Arterial Blood Gas: pH 7.12 (7.35–7.45), PaCO2 18 mmHg (35–45, respiratory compensation), PaO2 96 mmHg, HCO3 7.8 mEq/L (22–26), Base Excess -19.4 mEq/L, SaO2 98%, Blood Lactate 2.1 mmol/L.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "serum_ketones": {
        resultText: "STAT Serum Beta-Hydroxybutyrate: 5.8 mmol/L (Reference: <0.4 mmol/L) — Markedly Elevated (Severe Ketosis).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "grbs": {
        resultText: "STAT Capillary Blood Glucose (GRBS): 486 mg/dL (Reference: 70–140 mg/dL).",
        turnaroundMinutes: 2,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 131 mEq/L (Corrected Sodium: 137.2 mEq/L), Potassium 4.8 mEq/L (3.5–5.0), Chloride 96 mEq/L, Anion Gap 27.2 mEq/L (Reference: 8–12 mEq/L).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 58 mg/dL (15–40, prerenal azotemia), Serum Creatinine 1.8 mg/dL (0.7–1.3), eGFR 48 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 16.2 g/dL (hemoconcentration), Total WBC Count 17,400/mcL with 82% neutrophils (stress leukocytosis / infection), Platelets 290,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "urine_routine": {
        resultText: "Urinalysis: Urine Glucose 4+ (>=1000 mg/dL), Urine Ketones 4+ (Large Acetoacetate), Urine Protein Trace, Pus cells 2–4/HPF, Leukocyte esterase Negative.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 122 bpm, normal PR interval, normal QTc (420 ms), normal T-wave morphology. No ST elevation or depression.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable CXR (AP View): Clear lung fields, no focal consolidation, pleural effusion, or pneumothorax.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.7 mg/dL, SGOT/AST 28 U/L, SGPT/ALT 32 U/L, Alkaline Phosphatase 74 U/L, Albumin 4.4 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 12.6 sec, INR 1.02, aPTT 29.0 sec. Normal.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "serum_calcium": {
        resultText: "Serum Total Calcium: 9.4 mg/dL (8.5–10.5 mg/dL), Ionized Calcium 1.20 mmol/L (1.15–1.33 mmol/L).",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /normal saline|0\.9% nacl|isotonic saline|iv fluids|fluid resuscitation/i,
        name: "Aggressive IV Fluid Resuscitation (0.9% Normal Saline 1000 mL in 1st hour, then 250–500 mL/hr)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /regular insulin|insulin infusion|iv insulin|actrapid|huminsulin/i,
        name: "Continuous IV Regular Insulin Infusion (0.1 units/kg/hr, withhold only if K+ < 3.3 mEq/L)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /potassium|kcl|potassium chloride/i,
        name: "Proactive Potassium Replacement (IV KCl 20–30 mEq/L in fluids once K+ < 5.0 mEq/L with urine output)",
        targetMilestoneMinutes: 20
      },
      {
        orderOrActionPattern: /dextrose|5% dextrose|d5w|dns/i,
        name: "Addition of 5% Dextrose to IV Fluids once Blood Glucose drops < 200–250 mg/dL",
        targetMilestoneMinutes: 30
      }
    ],
    incidentalPool: [
      {
        id: "inc_dka_1",
        title: "Asymptomatic Microalbuminuria",
        description: "Spot urine albumin-creatinine ratio is 48 mcg/mg (moderately increased), indicating early diabetic nephropathy.",
        correctAction: "Optimize glycemic and blood pressure control outpatient; initiate ACEi/ARB after acute DKA and azotemia resolve.",
        status: "unnoticed"
      },
      {
        id: "inc_dka_2",
        title: "Lipohypertrophy at Subcutaneous Injection Sites",
        description: "Bilateral periumbilical nodular fatty hypertrophy from repeated insulin injections in identical sites.",
        correctAction: "Educate on systematic rotation of subcutaneous insulin injection sites.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Young patient presenting with acute vomiting, abdominal pain, deep rapid sighing respiration, hyperglycemia, high anion gap metabolic acidosis, and heavy urine ketones. Clinician must establish underlying metabolic crisis.",
        consequenceOnRight: "Severe metabolic acidosis accurately diagnosed; emergency fluid and electrolyte replacement protocol initiated without delay.",
        consequenceOnWrong: "Misdiagnosing presentation as acute gastroenteritis or acute surgical abdomen leads to severe dehydration, cerebral edema, and circulatory collapse."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Clinician must monitor serial blood gas, serum beta-hydroxybutyrate, anion gap, blood glucose, and hourly potassium levels during stabilization protocol.",
        consequenceOnRight: "Serial electrolyte and blood gas profiling ordered; allows precise tracking of anion gap closure and potassium trends.",
        consequenceOnWrong: "Failure to check hourly potassium leads to fatal unrecognized hypokalemia during insulin therapy."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Immediate initiation of vigorous crystalloid resuscitation with 0.9% isotonic saline to restore intravascular volume before aggressive insulin boluses.",
        consequenceOnRight: "Intravenous isotonic crystalloids restore renal perfusion and decrease stress hormone levels rapidly.",
        consequenceOnWrong: "Administering high-dose insulin without volume expansion precipitates sudden intravascular collapse."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Continuous low-dose regular insulin infusion protocol with timely addition of dextrose when glucose falls below 200 mg/dL to clear ketonemia safely.",
        consequenceOnRight: "Insulin protocol clears ketoacids steadily; dextrose added at 200 mg/dL prevents hypoglycemia and cerebral edema.",
        consequenceOnWrong: "Premature cessation of insulin upon blood glucose normalization causes rebound acid accumulation."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Vigilant surveillance for life-threatening complications of management: hypokalemia-induced cardiac arrhythmias, cerebral edema, and hyperchloremic metabolic acidosis.",
        consequenceOnRight: "Proactive potassium replacement and controlled fluid titration prevent arrhythmias and neurological deterioration.",
        consequenceOnWrong: "Rapid over-correction of osmolality triggers acute cerebral edema with neurological herniation."
      }
    ]
  },
  {
    id: "scaffold_eclampsia",
    title: "Generalized Seizures in a Third-Trimester Primigravida",
    conditionName: "Eclampsia with Severe Preeclampsia in Preterm Pregnancy",
    subject: "OBGY",
    system: "Obstetrics",
    demographics: {
      "name": "Pooja Devi",
      "age": 23,
      "gender": "Female",
      "setting": "Emergency"
},
    openingVignette: "A 23-year-old primigravida at 32 weeks period of gestation is rushed to the emergency department in a post-ictal state following two generalized tonic-clonic convulsions at home. She had severe throbbing headache, blurred vision, and epigastric pain over the preceding 12 hours.",
    initialVitals: {
      "hr": 116,
      "bp": "178/112",
      "rr": 24,
      "spo2": 93,
      "temp": "37.2°C",
      "grbs": 104
},
    clinchingClue: "Dipstick urinalysis shows 4+ proteinuria in a convulsing 32-week pregnant female with severe hypertension (BP 178/112 mmHg) and hyperreflexia.",
    clinchingClueTimeMinutes: 10,
    examFindingsMap: {
      "cvs": "Tachycardia 116 bpm, loud S2, hyperdynamic circulation, no organic murmurs.",
      "chest": "Bilateral vesicular breath sounds, mild basal bibasilar rales, no gross consolidation.",
      "abdomen": "Obstetric Examination: Gravid uterus corresponding to 32 weeks gestation, relaxed, non-tender between contractions, fetal heart rate 152 bpm regular by Doppler. Epigastric and right upper quadrant tenderness elicited on palpation (hepatic capsule stretch).",
      "neuro": "Post-ictal state, slowly responsive to voice (GCS 10/15: E3V2M5), pupils equal and reactive, 4+ bilateral patellar hyperreflexia with sustained ankle clonus (4 beats).",
      "general": "Marked facial puffiness, periorbital edema, tongue bite mark on right lateral border with minor blood-tinged saliva.",
      "vitals": "Severe gestational hypertension: BP 178/112 mmHg, HR 116 bpm, RR 24/min, SpO2 93% on room air, Temp 37.2°C, GRBS 104 mg/dL.",
      "local": "Pelvic & Extremity Exam: Marked bilateral non-dependent pitting edema (+3) extending up to mid-thighs and vulva. Sterile speculum exam: cervical os closed, no vaginal bleeding or liquor leakage."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Primigravida at 32 weeks gestation by dates. Irregular antenatal checkups. No pre-existing chronic hypertension, renal disease, or epilepsy.",
      "medications": "Iron and folic acid supplements irregularly. No antihypertensive medications.",
      "family": "Mother had preeclampsia during pregnancy.",
      "social": "Homemaker, non-smoker, non-alcoholic, lives with extended family in semi-urban area.",
      "surgical": "No prior surgical interventions.",
      "presenting": "Developed severe persistent frontal headache, scotomata (flashing lights in visual field), nausea, and epigastric discomfort over the past 24 hours, followed by two witness episodes of generalized tonic-clonic convulsions lasting 2 minutes each."
    },
    investigationsMap: {
      "urine_protein": {
        resultText: "Urinalysis: Protein 4+ (>=500 mg/dL by dipstick), Spot Urine Protein-to-Creatinine Ratio (UPCR): 4.6 mg/mg (Reference: <0.3 mg/mg) — Severe Nephrotic-Range Proteinuria.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 11.2 g/dL, Total WBC 12,400/mcL, Platelets 82,000/mcL (Reference: 150,000–450,000, Thrombocytopenia / Impending HELLP syndrome).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 1.8 mg/dL, SGOT/AST 148 U/L (10–40), SGPT/ALT 162 U/L (7–56), Serum LDH 890 U/L (<250, Elevated hemolysis/tissue injury marker).",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 44 mg/dL, Serum Creatinine 1.3 mg/dL (Elevated for pregnancy, baseline <0.8), Serum Uric Acid 7.8 mg/dL (Elevated).",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 137 mEq/L, Potassium 4.0 mEq/L, Chloride 100 mEq/L, Bicarbonate 22 mEq/L, Serum Magnesium 1.6 mg/dL (1.7–2.2).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 13.2 sec, INR 1.08, aPTT 31.0 sec, Fibrinogen 320 mg/dL.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "obstetric_usg": {
        resultText: "Obstetric Ultrasound & Doppler: Single live intrauterine fetus at 31+4 weeks, estimated fetal weight 1450g (symmetric IUGR <10th percentile), AFI 7.2 cm (oligohydramnios). Umbilical artery Doppler shows elevated S/D ratio (4.2) with absent end-diastolic flow (AEDF).",
        turnaroundMinutes: 25,
        category: "imaging",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas: pH 7.34, PaCO2 36 mmHg, PaO2 78 mmHg, HCO3 19 mEq/L, SaO2 94% on room air.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 116 bpm, left ventricular strain pattern, no ST elevations.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable CXR (with Abdominal Shielding): Mild pulmonary venous congestion, no dense consolidation.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "serum_ferritin": {
        resultText: "Serum Ferritin: 68 ng/mL (Reference: 15–150 ng/mL). Normal iron stores.",
        turnaroundMinutes: 35,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /magnesium sulfate|mgso4|pritchard|zuspan/i,
        name: "STAT Magnesium Sulfate Loading Dose (4g IV over 15 min + 10g IM [5g in each buttock], then 5g IM q4h or 1g/hr IV)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /labetalol|hydralazine|nifedipine|antihypertensive/i,
        name: "STAT IV Antihypertensive for Severe BP (IV Labetalol 20mg bolus, repeat 40–80mg q10m or IV Hydralazine 5–10mg)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /airway|suction|left lateral|oxygen|mouth gag/i,
        name: "Airway Protection, Left Lateral Tilt Positioning & High-Flow Oxygen Support",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /delivery|cesarean|induction|emergency lscs|obgy consult|terminate pregnancy/i,
        name: "Emergency Obstetric Stabilization & Planned Delivery within 24h of Eclampsia Control (Definitive Cure)",
        targetMilestoneMinutes: 30
      }
    ],
    incidentalPool: [
      {
        id: "inc_eclamp_1",
        title: "Rh Incompatibility Screening",
        description: "Maternal blood group is B Negative; Indirect Coombs Test (ICT) is negative.",
        correctAction: "Administer Anti-D Immunoglobulin (300 mcg IM) within 72 hours of delivery.",
        status: "unnoticed"
      },
      {
        id: "inc_eclamp_2",
        title: "Magnesium Toxicity Monitoring Rule",
        description: "Magnesium toxicity causes loss of patellar reflexes at 8–10 mEq/L, respiratory depression at >12 mEq/L.",
        correctAction: "Monitor patellar reflexes, respiratory rate (>12/min), and urine output (>30 mL/hr); keep Calcium Gluconate 10% readily available at bedside.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Third-trimester gravida presenting with new-onset convulsions, severe systolic and diastolic hypertension, and heavy proteinuria. Clinician must identify obstetric crisis.",
        consequenceOnRight: "Condition accurately recognized; emergency neuro-obstetric resuscitation protocol activated immediately.",
        consequenceOnWrong: "Misattributing convulsions to primary epilepsy delays Magnesium Sulfate and precipitates maternal intracranial hemorrhage or abruption."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Urgent laboratory evaluation for end-organ damage and HELLP syndrome (platelets, liver transaminases, LDH, serum creatinine, and proteinuria).",
        consequenceOnRight: "HELLP screening and fetal wellbeing assessed; early identification of thrombocytopenia guides safe delivery planning.",
        consequenceOnWrong: "Omitting hepatic and renal labs leads to unrecognized DIC and progressive multi-organ failure."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "First-line anticonvulsant of choice for terminating and preventing neuro-obstetric convulsions: Magnesium Sulfate regimen.",
        consequenceOnRight: "Magnesium sulfate loading and maintenance therapy initiated smoothly, preventing recurrent maternal seizures.",
        consequenceOnWrong: "Administering phenytoin or benzodiazepines as first-line therapy results in inferior seizure control and maternal-fetal depression."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Control of acute severe hypertension (target systolic 140–150 mmHg, diastolic 90–100 mmHg) with IV Labetalol or Hydralazine, followed by planned delivery.",
        consequenceOnRight: "Blood pressure controlled safely without compromising uteroplacental blood flow; delivery expedited successfully.",
        consequenceOnWrong: "Over-aggressive reduction of BP to hypotensive levels causes fetal bradycardia and acute uteroplacental hypoperfusion."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Surveillance for Magnesium Sulfate toxicity (loss of deep tendon reflexes, hypoventilation, oliguria) and abruptio placentae.",
        consequenceOnRight: "Reflexes and urine output monitored strictly; Calcium Gluconate kept at bedside as direct antidote.",
        consequenceOnWrong: "Unmonitored Magnesium administration in the setting of oliguria leads to fatal respiratory arrest."
      }
    ]
  },
  {
    id: "scaffold_pneumothorax",
    title: "Sudden Severe Dyspnea, Absent Breath Sounds & Shock Post-Trauma",
    conditionName: "Tension Pneumothorax",
    subject: "Surgery",
    system: "Trauma",
    demographics: {
      "name": "Vikram Rathore",
      "age": 31,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 31-year-old construction worker is brought to the trauma resuscitation room following a fall from scaffolding (15 feet). He is in extreme respiratory distress with severe cyanosis, tracheal shift to the left, and profound hypotension.",
    initialVitals: {
      "hr": 136,
      "bp": "74/42",
      "rr": 38,
      "spo2": 76,
      "temp": "36.8°C",
      "grbs": 112
},
    clinchingClue: "Grossly hyper-resonant percussion note and absent breath sounds over entire right hemithorax with distended jugular neck veins and tracheal deviation to the contralateral left side.",
    clinchingClueTimeMinutes: 5,
    examFindingsMap: {
      "cvs": "Marked sinus tachycardia 136 bpm, thready impalpable radial pulses, distended non-pulsatile neck veins (elevated JVP) due to severe superior vena cava kinking/compression, distant heart sounds.",
      "chest": "Inspection: Right hemithorax severely hyper-expanded and motionless during respiration. Palpation: Trachea deviated markedly to the left; surgical emphysema (crepitus) felt over right chest wall and neck. Percussion: Tympanitic / hyper-resonant over entire right hemithorax. Auscultation: Completely absent breath sounds over right hemithorax.",
      "abdomen": "Soft, mildly depressed liver edge pushed inferiorly by tense right diaphragm, bowel sounds normal, FAST negative for hemoperitoneum.",
      "neuro": "Agitated, hypoxic encephalopathy (GCS 12/15: E3V4M5), pupils equal and sluggishly reactive.",
      "general": "Severe central and peripheral cyanosis, cold clammy extremities, gasping respirations.",
      "vitals": "Obstructive Shock: BP 74/42 mmHg (MAP 52 mmHg), HR 136 bpm, RR 38/min, SpO2 76% on room air, Temp 36.8°C, GRBS 112 mg/dL.",
      "local": "Right chest wall abrasions, palpable crepitus over 3rd–5th right ribs anterolaterally with bony step-off tenderness."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "No chronic medical illnesses, asthma, or previous pneumothorax.",
      "medications": "None.",
      "family": "Non-contributory.",
      "social": "Occasional smoker, construction laborer.",
      "surgical": "No prior thoracic or abdominal surgeries.",
      "presenting": "Fell from a height of 15 feet onto iron pipes 25 minutes ago; immediate onset of acute right chest pain, progressive suffocation, and collapse."
    },
    investigationsMap: {
      "cxr": {
        resultText: "Portable Chest X-ray (Post-Decompression): Demonstrates right lung re-expansion with intercostal drain in situ, fracture of right 4th and 5th ribs. Trachea midline.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "e_fast": {
        resultText: "Bedside e-FAST Ultrasound: Absence of normal lung sliding and stratosphere/barcode sign on M-mode over right anterior chest (Pneumothorax confirmed). Normal pericardial and peritoneal windows.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas (Pre-decompression Room Air): pH 7.21, PaCO2 56 mmHg, PaO2 44 mmHg, HCO3 22 mEq/L, SaO2 75%, Blood Lactate 3.8 mmol/L (Severe combined respiratory acidosis and tissue hypoperfusion).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 13.8 g/dL, Total WBC Count 10,800/mcL, Platelet Count 230,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 28 mg/dL, Serum Creatinine 0.9 mg/dL, eGFR >90 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 140 mEq/L, Potassium 4.2 mEq/L, Chloride 101 mEq/L, Bicarbonate 22 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 12.4 sec, INR 1.01, aPTT 28.0 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 136 bpm, right axis deviation, low voltage QRS complexes across precordium.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "serum_lipase": {
        resultText: "Serum Lipase: 34 U/L (Reference: 10–140 U/L). Normal.",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /needle decompression|needle thoracocentesis|14g cannula|16g needle|large bore needle/i,
        name: "STAT Immediate Needle Decompression (14G–16G needle with rush of air at 2nd ICS Mid-Clavicular Line or 5th ICS Anterior Axillary Line) — Clinical Diagnosis, DO NOT wait for X-ray",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /chest tube|intercostal drain|icd|tube thoracostomy|underwater seal/i,
        name: "Definitive Tube Thoracostomy / Chest Tube Insertion (28–32 Fr at 5th ICS anterior/mid-axillary line connected to underwater seal)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /oxygen|high flow|nrbm|intubation/i,
        name: "High-Flow Supplemental Oxygen (15 L/min via Non-Rebreather Mask)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /analgesia|fentanyl|paracetamol|intercostal block|pain control/i,
        name: "Adequate Analgesia (IV Fentanyl / Regional Intercostal Nerve Block) to Improve Chest Mechanics",
        targetMilestoneMinutes: 15
      }
    ],
    incidentalPool: [
      {
        id: "inc_pneu_1",
        title: "Subcutaneous Emphysema Propagation",
        description: "Palpable crepitus spreading into neck and anterior chest wall.",
        correctAction: "Ensure chest tube is functioning properly and patent with good underwater column oscillation.",
        status: "unnoticed"
      },
      {
        id: "inc_pneu_2",
        title: "Tetanus Immunization Status in Open Trauma",
        description: "Skin abrasions sustained in contaminated construction site environment.",
        correctAction: "Administer Tetanus Toxoid 0.5 mL IM + Tetanus Immunoglobulin if vaccination unconfirmed.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Trauma patient presenting in obstructive shock with severe breathlessness, unilateral hyper-resonance, absent breath sounds, distended neck veins, and tracheal shift. Clinician must identify thoracic emergency.",
        consequenceOnRight: "Pleural air under pressure identified clinically as an immediate surgical emergency; immediate decompression performed.",
        consequenceOnWrong: "Delaying treatment to obtain diagnostic X-ray leads to cardiac arrest from total caval compression."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Understanding that high-pressure pleural air entrapment is a strictly clinical diagnosis; diagnostic imaging is contraindicated before decompression, but post-procedure confirmation is indicated.",
        consequenceOnRight: "Bedside e-FAST / post-procedure CXR confirms lung re-expansion and proper tube placement.",
        consequenceOnWrong: "Sending an unstable patient to the radiology suite causes in-transit fatal arrest."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "First-line intervention: Immediate needle decompression with large-bore cannula followed by definitive intercostal tube placement.",
        consequenceOnRight: "Audible rush of escaping air confirms decompression; blood pressure and SpO2 recover immediately.",
        consequenceOnWrong: "Failure to perform immediate needle decompression results in irreversible electromechanical dissociation."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Placement of formal large-bore tube (28–32 Fr) in the triangle of safety and underwater seal drainage management.",
        consequenceOnRight: "Intercostal tube secured and connected to underwater seal; continuous bubbling noted with complete lung expansion.",
        consequenceOnWrong: "Improper clamping of tube leads to recurrent air tension."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Monitoring for re-expansion pulmonary edema, persistent air leaks, and associated occult bloody effusion.",
        consequenceOnRight: "Chest drainage monitored hourly; vitals stabilize with excellent lung compliance.",
        consequenceOnWrong: "Overlooked large continuing air leak leads to worsening subcutaneous emphysema and respiratory failure."
      }
    ]
  },
  {
    id: "scaffold_meningitis",
    title: "High Fever, Altered Mental Status & Severe Neck Rigidity",
    conditionName: "Acute Bacterial Meningitis",
    subject: "Medicine",
    system: "Neurology",
    demographics: {
      "name": "Deepak Joshi",
      "age": 26,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 26-year-old male is brought to the emergency department with a 24-hour history of high-grade fever with chills, severe agonizing headache, photophobia, projectile vomiting, and progressive disorientation.",
    initialVitals: {
      "hr": 118,
      "bp": "110/72",
      "rr": 22,
      "spo2": 97,
      "temp": "39.4°C",
      "grbs": 114
},
    clinchingClue: "CSF analysis reveals cloudy turbid fluid with marked neutrophilic pleocytosis (WBC 2,800/mcL with 92% polymorphs), high protein (240 mg/dL), very low glucose (18 mg/dL with CSF/blood glucose ratio 0.15), and Gram-positive diplococci (Streptococcus pneumoniae).",
    clinchingClueTimeMinutes: 20,
    examFindingsMap: {
      "cvs": "Tachycardia 118 bpm, normal heart sounds S1 S2, no murmurs.",
      "chest": "Bilateral vesicular breath sounds, clear to auscultation, no added sounds.",
      "abdomen": "Soft, non-tender, no organomegaly, active bowel sounds.",
      "neuro": "Drowsy, disoriented to time and place (GCS 11/15: E3V3M5), photophobia present. Marked nuchal rigidity (unable to touch chin to chest). Positive Kernig sign (resistance and pain on knee extension at 90 deg hip flexion) and positive Brudzinski sign (involuntary hip/knee flexion on passive neck flexion). Fundoscopy: No papilledema.",
      "general": "Flushed, febrile (39.4°C), toxic look, no petechial or purpuric skin rash.",
      "vitals": "HR 118 bpm, BP 110/72 mmHg, RR 22/min, SpO2 97% on room air, Temp 39.4°C, GRBS 114 mg/dL.",
      "local": "ENT exam: Normal tympanic membranes bilaterally, no mastoid tenderness or rhinorrhea. No focal skin lesions."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "History of right chronic suppurative otitis media (CSOM) in childhood. No history of head trauma, seizures, or immunodeficiency.",
      "medications": "Paracetamol taken at home with minimal relief.",
      "family": "Non-contributory.",
      "social": "Lives in a college dormitory, non-smoker, non-alcoholic.",
      "surgical": "No prior neurosurgical or ENT procedures.",
      "presenting": "Began experiencing severe global throbbing headache and high fever 24 hours ago, rapidly progressing to neck stiffness, persistent vomiting, photophobia, and confusion."
    },
    investigationsMap: {
      "csf_analysis": {
        resultText: "STAT CSF Analysis: Appearance Turbid/Cloudy, Opening Pressure 280 mmH2O (>200), Total Leukocyte Count 2,800/mcL (92% Neutrophils, 8% Lymphocytes), Protein 240 mg/dL (15–45), Glucose 18 mg/dL (40–70, Blood Glucose 114 mg/dL, CSF/Serum Glucose ratio 0.15). Gram Stain: Gram-positive lancet-shaped diplococci (Streptococcus pneumoniae).",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "blood_culture": {
        resultText: "STAT Blood Cultures (2 sets): Streptococcus pneumoniae isolated, sensitive to Ceftriaxone, Vancomycin, and Benzylpenicillin.",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: true
      },
      "ncct_head": {
        resultText: "NCCT Head: Normal ventricular size, no midline shift, no mass effect, no intracranial hemorrhage or basal cistern effacement (Safe for lumbar puncture).",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 13.4 g/dL, Total WBC Count 19,200/mcL (88% Neutrophils, 6% Band forms, 6% Lymphocytes), Platelet Count 240,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 34 mg/dL, Serum Creatinine 1.0 mg/dL, eGFR >90 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 134 mEq/L, Potassium 4.1 mEq/L, Chloride 99 mEq/L, Bicarbonate 23 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.9 mg/dL, AST 32 U/L, ALT 28 U/L, ALP 80 U/L.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 12.8 sec, INR 1.04, aPTT 29.4 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas: pH 7.42, PaCO2 34 mmHg, PaO2 92 mmHg, HCO3 22 mEq/L, SaO2 97%, Blood Lactate 1.6 mmol/L.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable CXR: Clear lung parenchyma, normal cardiac contour.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "serum_uric_acid": {
        resultText: "Serum Uric Acid: 4.8 mg/dL (Reference: 3.5–7.2 mg/dL). Normal.",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /dexamethasone|steroid/i,
        name: "STAT IV Dexamethasone 10mg (Administered with or 15–20 minutes PRIOR to first antibiotic dose to prevent inflammatory neurological sequelae/hearing loss)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /ceftriaxone|cefotaxime|vancomycin|antibiotic|empiric antibiotic/i,
        name: "STAT Empiric High-Dose IV Antibiotics (Ceftriaxone 2g IV q12h + Vancomycin 15–20 mg/kg IV q12h within 30 minutes of arrival)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /lumbar puncture|lp|spinal tap|csf/i,
        name: "Emergency Lumbar Puncture for CSF Analysis (Immediately after fundoscopy/NCCT confirms absence of brain herniation risk)",
        targetMilestoneMinutes: 20
      },
      {
        orderOrActionPattern: /paracetamol|antipyretic|cooling|fluids/i,
        name: "Supportive Care: IV Paracetamol 1g + Maintenance IV Isotonic Crystalloids & Neurological Monitoring",
        targetMilestoneMinutes: 15
      }
    ],
    incidentalPool: [
      {
        id: "inc_mening_1",
        title: "Droplet Isolation Precautions",
        description: "Patient presenting with acute meningitis syndrome in shared emergency setting.",
        correctAction: "Initiate respiratory droplet isolation until Neisseria meningitidis is ruled out or patient has received 24h of effective antibiotics.",
        status: "unnoticed"
      },
      {
        id: "inc_mening_2",
        title: "Close Contact Chemoprophylaxis Assessment",
        description: "College dormitory roommates and immediate household contacts.",
        correctAction: "Evaluate need for Rifampicin (600mg BD x 2d) or single-dose Ciprofloxacin (500mg) if N. meningitidis confirmed.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Young adult presenting with acute fever, toxic appearance, severe headache, photophobia, altered sensorium, and marked neck stiffness (Kernig/Brudzinski positive). Clinician must identify central nervous system infection.",
        consequenceOnRight: "Central nervous system infection diagnosed promptly; urgent antimicrobial and neuro-protective protocol activated.",
        consequenceOnWrong: "Misattributing symptoms to a viral illness or uncomplicated migraine delays life-saving bactericidal therapy."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Diagnostic Lumbar Puncture prioritization: obtaining spinal fluid for Gram stain, cell count, biochemistry, and cultures while ensuring brain herniation safety.",
        consequenceOnRight: "CSF analysis and blood cultures collected rapidly, confirming pneumococcal etiology and guiding targeted therapy.",
        consequenceOnWrong: "Delaying antibiotics for hours while awaiting imaging or lumbar puncture increases neurological morbidity and mortality."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Parenteral adjunctive Dexamethasone timing: must be administered before or concurrently with the first antibiotic dose to attenuate pneumolysin-mediated inflammatory injury.",
        consequenceOnRight: "Dexamethasone administered prior to Ceftriaxone and Vancomycin, significantly reducing risk of sensorineural hearing loss and mortality.",
        consequenceOnWrong: "Withholding corticosteroids increases risk of severe post-infectious neurological deficits."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "High-dose bactericidal empirical antibiotic regimen (IV Ceftriaxone 2g q12h + IV Vancomycin) to cover resistant pathogens.",
        consequenceOnRight: "Appropriate empirical antibiotic regimen sterilizes CSF within 24–48 hours, leading to clinical improvement.",
        consequenceOnWrong: "Inadequate dosing or narrow spectrum monotherapy results in persistent infection and cerebral thrombosis."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Monitoring for acute complications of central nervous system infection: increased intracranial pressure, cerebral venous sinus thrombosis, seizures, and SIADH.",
        consequenceOnRight: "Serum sodium and neurological checks detect mild SIADH; fluid intake adjusted appropriately.",
        consequenceOnWrong: "Unrecognized SIADH or cerebral edema leads to hyponatremic seizures and secondary neurological collapse."
      }
    ]
  },
  {
    id: "scaffold_appendicitis",
    title: "Migratory Right Iliac Fossa Pain, Rebound & Fever",
    conditionName: "Acute Appendicitis with Impending Perforation",
    subject: "Surgery",
    system: "Gastroenterology",
    demographics: {
      "name": "Aditya Nair",
      "age": 19,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 19-year-old college student presents with 20 hours of severe right lower quadrant abdominal pain, nausea, anorexia, and low-grade fever. The pain initially began around the umbilicus before shifting to the right iliac fossa.",
    initialVitals: {
      "hr": 104,
      "bp": "118/76",
      "rr": 20,
      "spo2": 98,
      "temp": "38.3°C",
      "grbs": 98
},
    clinchingClue: "Point tenderness at McBurney's point with exquisite rebound tenderness, positive Rovsing's sign, positive psoas sign, and graded-compression USG abdomen showing a non-compressible, blind-ending tubular structure of 8.6 mm diameter with hyperemic wall and appendicolith.",
    clinchingClueTimeMinutes: 15,
    examFindingsMap: {
      "cvs": "Tachycardia 104 bpm, regular, S1 S2 normal, no murmurs.",
      "chest": "Bilateral vesicular breath sounds, no added sounds, resonant percussion.",
      "abdomen": "Inspection: Abdomen scaphoid, moves with respiration. Palpation: Marked localized tenderness and involuntary guarding at McBurney's point (1/3rd distance from ASIS to umbilicus). Rebound tenderness positive (Blumberg sign). Rovsing's sign positive (left iliac fossa pressure elicits pain in RIF). Psoas sign positive (pain on passive right hip hyperextension). Auscultation: Hypoactive bowel sounds in RIF.",
      "neuro": "Alert, fully oriented x3, GCS 15/15, no neurological deficits.",
      "general": "Flushed, in moderate distress lying still with right hip flexed, mild dehydration with dry lips, no icterus or pedal edema.",
      "vitals": "HR 104 bpm, BP 118/76 mmHg, RR 20/min, SpO2 98% on room air, Temp 38.3°C, GRBS 98 mg/dL.",
      "local": "Digital rectal examination (DRE): Tenderness elicited on the right lateral pelvic wall. External genitalia and hernial orifices normal without irreducible swellings."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "No history of prior abdominal surgeries, inflammatory bowel disease, or renal calculi.",
      "medications": "Took an oral antacid suspension and Paracetamol 650 mg 6 hours ago with no pain relief.",
      "family": "Non-contributory.",
      "social": "University student, non-smoker, occasional social drinker.",
      "surgical": "No previous surgical history.",
      "presenting": "Abdominal discomfort started as dull periumbilical ache accompanied by total loss of appetite (anorexia) and two episodes of non-bilious vomiting. Over the next 10 hours, the pain shifted and localized sharply to the right lower quadrant, worsening with walking or coughing."
    },
    investigationsMap: {
      "usg_abdomen": {
        resultText: "Targeted High-Resolution Ultrasound Abdomen: Blind-ending, non-compressible aperistaltic tubular structure in right iliac fossa measuring 8.6 mm in outer diameter (Normal <6 mm) with mucosal wall thickening, periappendiceal fat stranding, target sign on cross-section, and an obstructing 4 mm echogenic appendicolith with acoustic shadowing. Mild free fluid in pelvic cavity.",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 14.1 g/dL, Total Leukocyte Count (TLC) 15,800/mcL (Reference: 4,000–11,000) with 84% Neutrophils and 6% Band forms (Significant left shift), Platelet Count 260,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "urine_routine": {
        resultText: "Urinalysis: Appearance clear, Specific Gravity 1.022, Urine Leukocyte Esterase Negative, Nitrite Negative, Pus cells 1–2/HPF, RBCs 0–1/HPF. (Rules out acute UTI and urolithiasis).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 28 mg/dL, Serum Creatinine 0.9 mg/dL, eGFR >90 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 138 mEq/L, Potassium 4.0 mEq/L, Chloride 101 mEq/L, Bicarbonate 24 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 1.1 mg/dL, SGOT/AST 26 U/L, SGPT/ALT 24 U/L, ALP 72 U/L, Serum Albumin 4.3 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 12.2 sec, INR 1.01, aPTT 27.8 sec (Pre-operative clearance normal).",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas: pH 7.41, PaCO2 38 mmHg, PaO2 95 mmHg, HCO3 23.6 mEq/L, SaO2 98%, Lactate 1.2 mmol/L.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Chest & Erect Abdominal X-ray: No free air under diaphragm (no pneumoperitoneum). Non-specific gas shadow in right lower quadrant with fecalith shadow.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 104 bpm, otherwise normal tracing.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "serum_psa": {
        resultText: "Prostate Specific Antigen (PSA): 0.6 ng/mL (Reference: <4.0 ng/mL). Normal.",
        turnaroundMinutes: 40,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /npo|nil per os|iv fluids|crystalloid|ringer lactate|normal saline/i,
        name: "Keep Strictly NPO (Nil Per Os) & Initiate IV Crystalloid Hydration (Ringer's Lactate / 0.9% Normal Saline)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /ceftriaxone|metronidazole|ciprofloxacin|amoxicillin|clavulanate|antibiotic/i,
        name: "STAT Pre-Operative IV Prophylactic Antibiotics (IV Ceftriaxone 1g + Metronidazole 500mg)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /appendectomy|appendicectomy|laparoscopic appendectomy|surgical consult|theatre|surgery consult/i,
        name: "Emergency Surgical Consultation & Preparation for Emergency Laparoscopic / Open Appendectomy",
        targetMilestoneMinutes: 20
      },
      {
        orderOrActionPattern: /paracetamol|tramadol|fentanyl|analgesic|pain relief/i,
        name: "IV Analgesia (IV Paracetamol 1g / IV Tramadol 50mg) — Safe analgesia does NOT obscure clinical diagnosis",
        targetMilestoneMinutes: 15
      }
    ],
    incidentalPool: [
      {
        id: "inc_app_1",
        title: "Alvarado / MANTRELS Scoring Stratification",
        description: "Patient exhibits Migration of pain (1), Anorexia (1), Nausea (1), Tenderness in RIF (2), Rebound tenderness (1), Elevated temp (1), Leukocytosis (2), Shift to left (1) = Alvarado score 10/10.",
        correctAction: "High clinical probability confirms indication for immediate surgery without requiring mandatory CT scan.",
        status: "unnoticed"
      },
      {
        id: "inc_app_2",
        title: "Incidental Asymptomatic Mild Right Varicocele",
        description: "Painless grade 1 pampiniform venous dilatation on standing during genitourinary examination.",
        correctAction: "Reassure patient; no acute surgical or radiological intervention needed.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Young male presenting with classic migratory right lower quadrant abdominal pain, anorexia, McBurney's point guarding, and leukocytosis with left shift. Clinician must identify acute surgical abdomen.",
        consequenceOnRight: "Condition correctly diagnosed; urgent surgical pathway initiated to prevent gangrenous rupture.",
        consequenceOnWrong: "Misdiagnosing as non-specific mesenteric adenitis or gastroenteritis leads to rupture, abscess, and generalized peritonitis."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Selection of first-line imaging modality (targeted graded-compression ultrasound vs contrast-enhanced CT) and essential pre-operative laboratory workup.",
        consequenceOnRight: "Graded compression ultrasound confirms inflamed non-compressible tubular structure while excluding alternative pathologies.",
        consequenceOnWrong: "Unnecessary delay for advanced unindicated tests increases rupture risk."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Immediate pre-operative resuscitation: NPO status, isotonic fluid bolus, and broad-spectrum coverage against aerobic and anaerobic enteric flora.",
        consequenceOnRight: "IV fluids and prophylactic antibiotics (Ceftriaxone + Metronidazole) administered, optimizing patient for safe anesthesia.",
        consequenceOnWrong: "Administering oral analgesics or feeds breaches NPO guidelines, delaying emergency anesthesia induction."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Definitive therapeutic management: Prompt laparoscopic or open operative removal and peritoneal lavage.",
        consequenceOnRight: "Laparoscopic surgery successfully performed; inflamed organ removed intact.",
        consequenceOnWrong: "Prolonged non-operative delay in an obstructed case results in intra-abdominal sepsis."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Post-operative surveillance for pelvic collections/abscess, surgical site infection, and paralytic ileus.",
        consequenceOnRight: "Careful monitoring of fever, bowel sound return, and wound site ensures uneventful recovery and early discharge.",
        consequenceOnWrong: "Discharging without inspecting for postoperative pelvic collection leads to readmission in sepsis."
      }
    ]
  },
  {
    id: "scaffold_sam_shock",
    title: "Lethargy, Severe Wasting, Dehydration & Hypothermia in Toddler",
    conditionName: "SAM with Septic/Hypovolemic Shock",
    subject: "Pediatrics",
    system: "Nutrition/Infectious",
    demographics: {
      "name": "Baby Aarav",
      "age": 2,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 2-year-old boy with severe acute malnutrition is brought to the pediatric emergency triage with extreme lethargy, 3 days of watery diarrhea, severe hypothermia, weak rapid pulse, delayed capillary refill (>4 seconds), and cold extremities.",
    initialVitals: {
      "hr": 158,
      "bp": "68/40",
      "rr": 44,
      "spo2": 91,
      "temp": "35.2°C",
      "grbs": 42
},
    clinchingClue: "Visible severe muscle wasting (baggy pants appearance, mid-upper arm circumference [MUAC] 10.4 cm, weight-for-height < -3 Z-scores) with septic/hypovolemic shock, critical hypoglycemia (GRBS 42 mg/dL), and hypothermia (35.2°C).",
    clinchingClueTimeMinutes: 10,
    examFindingsMap: {
      "cvs": "Tachycardia 158 bpm, feeble peripheral pulses, faint heart sounds S1 S2, capillary refill time prolonged (4.5 seconds), cold extremities extending above knees.",
      "chest": "Tachypnea (RR 44/min), shallow breathing with mild subcostal retractions. Bilateral clear breath sounds, no focal crepitations.",
      "abdomen": "Distended, doughy feel, skin pinch over abdomen goes back very slowly (>2 seconds, though unreliable in severe wasting), mild hepatomegaly (liver edge 2.5 cm below costal margin, soft/fatty).",
      "neuro": "Severely lethargic, obtunded, responds only to painful stimuli (GCS 8/15: E2V2M4), hypotonic, weak suck/cry.",
      "general": "Severe marasmic wasting: prominent ribs, loose redundant skin folds over buttocks ('baggy pants' sign), sunken eyeballs, dry mucous membranes, no bilateral pedal edema.",
      "vitals": "Hypothermic Decompensated Shock: HR 158 bpm, BP 68/40 mmHg (MAP 49 mmHg), RR 44/min, SpO2 91% on room air, Temp 35.2°C (Axillary), GRBS 42 mg/dL (Severe Hypoglycemia).",
      "local": "Anthropometry: Weight 6.8 kg (Expected ~12 kg), Height 78 cm, Weight-for-Height < -3 Z-score, Mid-Upper Arm Circumference (MUAC) 10.4 cm (Red zone <11.5 cm)."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Recurrent episodes of acute gastroenteritis and lower respiratory infections. Weaned prematurely at 4 months onto diluted cows milk and watery gruel without age-appropriate complementary feeding.",
      "medications": "Unclear over-the-counter home syrup given for diarrhea.",
      "family": "Third child of daily-wage laborers; elder siblings have history of undernutrition.",
      "social": "Low socioeconomic status, poor sanitation and lack of safe drinking water at home.",
      "surgical": "No prior surgeries.",
      "presenting": "Profuse watery diarrhea (6–8 loose stools/day) for 3 days accompanied by low oral intake, progressive drowsiness, coldness of hands and feet, and inability to feed."
    },
    investigationsMap: {
      "grbs": {
        resultText: "STAT Capillary Blood Glucose (GRBS): 42 mg/dL (Reference: 70–140 mg/dL) — Critical Hypoglycemia in Malnutrition.",
        turnaroundMinutes: 2,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 126 mEq/L (Hyponatremia with high total body sodium and low intracellular potassium), Potassium 3.1 mEq/L (3.5–5.0, Severe total body potassium depletion), Chloride 92 mEq/L, Bicarbonate 14 mEq/L, Serum Magnesium 1.3 mg/dL (1.7–2.2).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 7.4 g/dL (Microcytic hypochromic severe anemia), Total WBC Count 16,200/mcL (72% Neutrophils, 24% Lymphocytes), Platelet Count 180,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 48 mg/dL, Serum Creatinine 0.6 mg/dL (Significantly elevated for 2yo infant with reduced muscle mass).",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "blood_culture": {
        resultText: "STAT Blood Culture (Pediatric): Gram-negative enteric bacilli (Klebsiella pneumoniae) isolated, sensitive to Cefotaxime, Amikacin, and Meropenem.",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: true
      },
      "urine_culture": {
        resultText: "Urine Routine & Culture: Urine sterile, no nitrites or pus cells.",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Venous Blood Gas (VBG): pH 7.24, PvCO2 32 mmHg, PvO2 34 mmHg, HCO3 13.8 mEq/L, Base Excess -12.4 mEq/L, Lactate 4.2 mmol/L (Metabolic acidosis with hypoperfusion).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Pediatric CXR: Small cardiothoracic ratio (cardiomyopathy of malnutrition / small heart), clear lung fields, no focal consolidation.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.6 mg/dL, AST 54 U/L, ALT 46 U/L, Total Protein 4.8 g/dL, Serum Albumin 2.4 g/dL (Hypoalbuminemia).",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "stool_routine": {
        resultText: "Stool Examination: Watery consistency, 2–4 pus cells/HPF, no Giardia trophozoites, no occult blood.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "serum_b12": {
        resultText: "Serum Vitamin B12: 180 pg/mL (Reference: 200–900 pg/mL). Mild deficiency.",
        turnaroundMinutes: 45,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /10% dextrose|dextrose bolus|hypoglycemia|d10w/i,
        name: "STAT 10% Dextrose Bolus (5 mL/kg IV over 5 minutes) followed by 10% Dextrose in IV fluids or oral/NG F-75 feed",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /warm|blanket|heater|hypothermia|skin to skin|kangaroo/i,
        name: "Immediate Active Rewarming (Warm blankets / radiant warmer, maintain room temp 28–30°C to treat hypothermia)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /resomal|rehydration solution for malnutrition|cautious fluids|15 ml\/kg/i,
        name: "Cautious Rehydration using ReSoMal (5 mL/kg q30m for 2h orally/NG, or if in severe shock: 1/2 strength Darrow with 5% Dextrose or Ringer Lactate with 5% Dextrose 15 mL/kg IV over 1 hour under strict cardiac monitoring — NEVER give rapid standard 20 mL/kg boluses)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /ampicillin|gentamicin|cefotaxime|antibiotic/i,
        name: "STAT Empiric Broad-Spectrum IV Antibiotics for Malnutrition Sepsis (IV Ampicillin 50mg/kg q6h + IV Gentamicin 7.5mg/kg OD or IV Cefotaxime 50mg/kg q8h)",
        targetMilestoneMinutes: 15
      }
    ],
    incidentalPool: [
      {
        id: "inc_sam_1",
        title: "Sodium / Potassium Electrolyte Paradox in SAM",
        description: "Total body sodium is elevated while intracellular potassium and magnesium are severely depleted in SAM.",
        correctAction: "Never administer plain standard high-sodium ORS; utilize specialized ReSoMal with added potassium (45 mEq/L) and low sodium (45 mEq/L).",
        status: "unnoticed"
      },
      {
        id: "inc_sam_2",
        title: "Iron Administration Timing Rule in SAM",
        description: "Severe nutritional anemia is present (Hb 7.4 g/dL).",
        correctAction: "Strictly withhold oral iron supplementation during acute stabilization (Step 1–7 of WHO 10-step protocol); start iron only during rehabilitation phase after appetite returns.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Severely wasted infant with weight-for-height < -3 Z-scores, mid-arm circumference < 11.5 cm presenting with low glucose, low body temperature, and poor peripheral perfusion. Clinician must identify critical pediatric nutritional crisis.",
        consequenceOnRight: "Condition with circulatory collapse recognized immediately; WHO 10-step stabilization protocol initiated without standard rapid volume overload.",
        consequenceOnWrong: "Treating as simple pediatric dehydration with standard rapid saline boluses precipitates acute heart failure and death."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Urgent bedside blood glucose (GRBS), electrolytes (tracking potassium and sodium), blood culture, and venous blood gas without delaying stabilization.",
        consequenceOnRight: "Hypoglycemia detected and corrected immediately; hypokalemia identified for proactive ReSoMal replacement.",
        consequenceOnWrong: "Delay in checking capillary glucose leads to permanent hypoglycemic brain injury."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Triad of Death in severe wasting: Simultaneous management of Hypoglycemia, Hypothermia, and Impaired Perfusion.",
        consequenceOnRight: "10% Dextrose bolus, active rewarming, and cautious slow fluid titration restore perfusion safely.",
        consequenceOnWrong: "Aggressive fluid overload results in sudden acute pulmonary edema due to impaired sodium-potassium ATPase pump mechanics."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "WHO 10-step protocol execution: Broad-spectrum empirical parenteral antibiotics (Ampicillin + Gentamicin) and initial cautious feeding with starter formula F-75.",
        consequenceOnRight: "Empirical antibiotic coverage and slow enteral trophic feeding (F-75) stabilize mucosal barrier and metabolism.",
        consequenceOnWrong: "Administering high-protein/high-calorie formulas prematurely triggers fatal refeeding syndrome."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Prevention and monitoring of fluid overload (rising jugular venous pressure, gallop rhythm, tachypnea, hepatomegaly) and refeeding syndrome.",
        consequenceOnRight: "Frequent monitoring of respiratory rate and liver size ensures early detection of fluid overload.",
        consequenceOnWrong: "Overlooked fluid overload leads to fatal iatrogenic cardiac decompensation."
      }
    ]
  },
  {
    id: "scaffold_stroke",
    title: "Sudden Right Hemiplegia, Global Aphasia & Left Gaze Deviation",
    conditionName: "Acute Ischemic Stroke (L MCA Territory)",
    subject: "Medicine",
    system: "Neurology",
    demographics: {
      "name": "Krishnan Murthy",
      "age": 62,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 62-year-old male with long-standing atrial fibrillation presents 75 minutes after sudden-onset collapse with dense right-sided hemiplegia, right facial droop, total inability to speak or comprehend (global aphasia), and forced eye deviation to the left.",
    initialVitals: {
      "hr": 114,
      "bp": "172/98",
      "rr": 18,
      "spo2": 97,
      "temp": "37.0°C",
      "grbs": 132
},
    clinchingClue: "STAT NCCT Head rules out intracranial hemorrhage and shows early hyperdense left middle cerebral artery sign (dot sign) with ASPECTS score 9; NIHSS score is 18 (Severe Acute L MCA Ischemic Stroke within 4.5h thrombolytic window).",
    clinchingClueTimeMinutes: 15,
    examFindingsMap: {
      "cvs": "Irregularly irregular pulse (Atrial Fibrillation) at 114 bpm, variable intensity S1, no structural cardiac murmurs.",
      "chest": "Bilateral vesicular breath sounds, lungs clear to auscultation, no wheeze or rales.",
      "abdomen": "Soft, non-tender, no organomegaly, normal bowel sounds present.",
      "neuro": "Conscious but globally aphasic (expressive and receptive language deficit). Left gaze preference (eyes looking towards left cortical lesion). Dense right upper motor neuron facial nerve palsy (flattened right nasolabial fold with forehead sparing). Right hemiplegia: Right upper limb power 0/5, right lower limb power 1/5 with extensor plantar response (positive Babinski on right). NIHSS Score: 18.",
      "general": "No external head trauma, no active bleeding manifestations, no pedal edema, well-perfused peripheries.",
      "vitals": "Permissive hypertension: BP 172/98 mmHg, HR 114 bpm (irregular), RR 18/min, SpO2 97% on room air, Temp 37.0°C, GRBS 132 mg/dL.",
      "local": "Carotid auscultation: No audible carotid bruit. Peripheral pulses present in all 4 extremities."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Non-valvular Atrial Fibrillation for 4 years, Hypertension for 10 years. No prior history of intracranial hemorrhage, ischemic stroke, gastrointestinal bleeding, or major surgery within past 3 months.",
      "medications": "Amlodipine 5mg OD, Telmisartan 40mg OD. Was prescribed Apixaban 5mg BD but ran out of stock 10 days ago and stopped taking it.",
      "family": "Father suffered an ischemic stroke at age 70.",
      "social": "Retired civil engineer, non-smoker, non-alcoholic.",
      "surgical": "No past major surgeries.",
      "presenting": "Was having breakfast at 08:00 AM when he suddenly dropped his tea cup, became unable to speak, and collapsed to the right side at 08:15 AM. Arrived at emergency department at 09:30 AM (Last Known Normal 75 minutes ago)."
    },
    investigationsMap: {
      "ncct_head": {
        resultText: "STAT Non-Contrast CT (NCCT) Head: No evidence of acute intracranial hemorrhage or subarachnoid hemorrhage. Hyperdense left middle cerebral artery sign (dense MCA sign) with subtle loss of gray-white differentiation in the left insular ribbon. ASPECTS score 9/10 (Favorable for reperfusion).",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "cta_head_neck": {
        resultText: "CT Angiography (CTA) Head & Neck: Acute occlusion of the proximal left M1 segment of the Middle Cerebral Artery. Good collateral circulation score (Score 2/3). No carotid artery dissection.",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "grbs": {
        resultText: "STAT Capillary Blood Glucose (GRBS): 132 mg/dL (Reference: 70–140 mg/dL, stroke mimic hypoglycemia ruled out).",
        turnaroundMinutes: 2,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 14.0 g/dL, Total WBC Count 8,800/mcL, Platelet Count 210,000/mcL (Reference: >100,000 required for thrombolysis).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: Prothrombin Time (PT) 12.4 sec, INR 1.02 (Reference: <1.7 required for thrombolysis), aPTT 28.2 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 30 mg/dL, Serum Creatinine 1.0 mg/dL, eGFR 82 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 139 mEq/L, Potassium 4.2 mEq/L, Chloride 101 mEq/L, Bicarbonate 24 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Atrial Fibrillation with rapid ventricular response (114 bpm), no acute ST-T elevation or myocardial infarction.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Normal cardiac silhouette, clear lung parenchyma.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.8 mg/dL, AST 30 U/L, ALT 28 U/L, Albumin 4.1 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "serum_ca125": {
        resultText: "Cancer Antigen 125 (CA-125): 11.2 U/mL (Reference: <35 U/mL). Normal.",
        turnaroundMinutes: 45,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /alteplase|tpa|tenecteplase|thrombolysis|iv tpa/i,
        name: "STAT IV Thrombolysis (IV Alteplase 0.9 mg/kg [max 90mg]: 10% bolus over 1 min, remaining 90% infused over 60 min, or Tenecteplase 0.25 mg/kg IV) within 4.5h window",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /thrombectomy|endovascular|mechanical thrombectomy|neurointervention|cath lab/i,
        name: "STAT Mechanical Thrombectomy Activation (Endovascular clot retrieval for Large Vessel Occlusion within 6–24 hours)",
        targetMilestoneMinutes: 25
      },
      {
        orderOrActionPattern: /blood pressure|labetalol|nicardipine|permissive hypertension/i,
        name: "Strict Blood Pressure Management (Maintain BP < 185/110 mmHg prior to and < 180/105 mmHg during/after thrombolysis with IV Labetalol 10–20mg; avoid excessive hypotensive drops)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /npo|dysphagia|swallow screen|aspiration precaution|head elevation/i,
        name: "Strict NPO & Aspiration Precautions (Elevate head of bed 30 degrees, mandatory dysphagia screen before any oral intake)",
        targetMilestoneMinutes: 10
      }
    ],
    incidentalPool: [
      {
        id: "inc_stroke_1",
        title: "Antiplatelet / Anticoagulation Timing Post-Thrombolysis",
        description: "Secondary stroke prevention in cardioembolic stroke with atrial fibrillation.",
        correctAction: "Strictly withhold Aspirin, Heparin, or DOAC for 24 hours post-thrombolysis until follow-up repeat NCCT Head rules out hemorrhagic transformation.",
        status: "unnoticed"
      },
      {
        id: "inc_stroke_2",
        title: "Fever and Hyperglycemia Secondary Injury Avoidance",
        description: "Post-stroke hyperthermia and severe hyperglycemia exacerbate ischemic penumbral neuronal death.",
        correctAction: "Aggressively treat temperature > 37.5°C with Paracetamol and maintain blood glucose 140–180 mg/dL.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Patient with atrial fibrillation presenting with hyperacute onset right-sided weakness, language impairment, conjugate gaze palsy, and high NIHSS within 4.5-hour window. Clinician must identify acute cerebral vascular event.",
        consequenceOnRight: "Acute cerebral ischemia recognized immediately; Code hyperacute reperfusion pathway activated.",
        consequenceOnWrong: "Delay in establishing diagnosis exhausts the critical 4.5-hour intravenous thrombolysis therapeutic window."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Urgent non-contrast head CT (NCCT) to exclude intracranial hemorrhage and CTA for large vessel occlusion (LVO) identification within 20 minutes of arrival.",
        consequenceOnRight: "NCCT Head immediately excludes hemorrhage; CTA confirms proximal arterial occlusion with favorable penumbra.",
        consequenceOnWrong: "Ordering lengthy non-essential diagnostic tests delays door-to-needle time."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "First-line reperfusion: Immediate intravenous Alteplase / Tenecteplase administration and blood pressure control (<185/110 mmHg).",
        consequenceOnRight: "IV thrombolysis initiated within target door-to-needle time (<45 min), promoting rapid penumbral recanalization.",
        consequenceOnWrong: "Withholding IV thrombolysis leads to irreversible large hemispheric infarction and lifelong disability."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Endovascular mechanical clot retrieval for large vessel proximal occlusion and comprehensive dedicated neurological unit care.",
        consequenceOnRight: "Mechanical clot retrieval performed successfully; complete recanalization (TICI 3) achieved with major functional recovery.",
        consequenceOnWrong: "Failing to evaluate for endovascular thrombectomy in confirmed LVO compromises maximal functional recovery."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Surveillance for post-thrombolysis hemorrhagic conversion, malignant cerebral edema, and aspiration pneumonia.",
        consequenceOnRight: "24-hour repeat NCCT confirms no hemorrhage; anticoagulation for atrial fibrillation safely planned thereafter.",
        consequenceOnWrong: "Premature administration of heparin within 24 hours of thrombolysis causes massive fatal intracerebral hemorrhage."
      }
    ]
  },
  {
    id: "scaffold_ugib",
    title: "Massive Hematemesis, Melena & Shock in Chronic Liver Disease",
    conditionName: "Acute Variceal Upper GI Bleed",
    subject: "Medicine",
    system: "Gastroenterology",
    demographics: {
      "name": "Gopal Banerjee",
      "age": 52,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 52-year-old male with decompensated alcoholic cirrhosis presents after vomiting 800 mL of fresh bright red blood mixed with clots (hematemesis) and passing maroon-black tarry stools (melena), accompanied by postural syncope and cold clammy skin.",
    initialVitals: {
      "hr": 126,
      "bp": "82/50",
      "rr": 26,
      "spo2": 94,
      "temp": "36.6°C",
      "grbs": 92
},
    clinchingClue: "Emergency upper gastrointestinal endoscopy reveals actively spurting high-risk Grade III esophageal varices at the gastroesophageal junction with red whale markings and fresh blood pooling in the gastric fundus.",
    clinchingClueTimeMinutes: 20,
    examFindingsMap: {
      "cvs": "Tachycardia 126 bpm, low volume thready pulses, orthostatic hypotension, normal heart sounds S1 S2.",
      "chest": "Bilateral clear vesicular breath sounds, no rales or rhonchi.",
      "abdomen": "Distended abdomen with prominent caput medusae (dilated periumbilical veins with flow radiating away from umbilicus), shifting dullness positive (moderate ascites), soft non-tender, shrunken nodular liver, spleen palpable 4 cm below left costal margin (splenomegaly), hyperactive bowel sounds.",
      "neuro": "Mild encephalopathy: Drowsy but arousable to voice (West Haven Grade I Hepatic Encephalopathy), asterixis (flapping tremor) elicited on wrist dorsiflexion, GCS 13/15: E3V4M6.",
      "general": "Severe pallor, visible scleral icterus, palmar erythema, multiple spider naevi on upper chest and arms, parotid enlargement, bilateral pedal edema.",
      "vitals": "Hemorrhagic Hypovolemic Shock: HR 126 bpm, BP 82/50 mmHg (MAP 60 mmHg), RR 26/min, SpO2 94% on room air, Temp 36.6°C, GRBS 92 mg/dL.",
      "local": "Per Rectal Examination (DRE): Glove smeared with abundant, jet-black, foul-smelling, tarry melena. No painful anal fissures or external hemorrhoidal thrombosis."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Decompensated Alcoholic Cirrhosis (Child-Pugh Class B, MELD-Na 19) diagnosed 3 years ago. Previous history of ascites. No prior endoscopic variceal ligation (EVL).",
      "medications": "Furosemide 20mg OD, Spironolactone 50mg OD, Propranolol 20mg BD (non-compliant).",
      "family": "Non-contributory.",
      "social": "Consumes 120g alcohol daily for 25 years. Lives with spouse.",
      "surgical": "No previous surgical interventions.",
      "presenting": "Woke up at 04:00 AM with sudden retching and vomited large amounts of fresh red blood and clots (>800 mL) twice, followed by passing dark tarry stool and feeling dizzy upon standing."
    },
    investigationsMap: {
      "upper_gi_endoscopy": {
        resultText: "STAT Upper GI Endoscopy: Four columns of tortuous Grade III/IV esophageal varices with active spurting of blood from a 5mm varix in the lower third of esophagus (red wale sign positive). Successful Endoscopic Variceal Band Ligation (EVL) performed with 5 rubber bands; complete hemostasis achieved.",
        turnaroundMinutes: 30,
        category: "procedures",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 6.8 g/dL (Severe Acute Anemia), Hematocrit 21.2%, Total WBC Count 11,400/mcL, Platelet Count 64,000/mcL (Hypersplenism-induced Thrombocytopenia).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: Prothrombin Time (PT) 19.8 sec (Control 12.0), INR 1.68 (Elevated due to cirrhosis-related synthetic failure), aPTT 42.0 sec, Fibrinogen 160 mg/dL.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 3.8 mg/dL (Direct 2.4 mg/dL), SGOT/AST 86 U/L, SGPT/ALT 48 U/L (AST/ALT ratio > 1.5), ALP 142 U/L, Total Protein 5.6 g/dL, Serum Albumin 2.6 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 52 mg/dL (Elevated due to upper GI blood breakdown and prerenal azotemia), Serum Creatinine 1.2 mg/dL, eGFR 68 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 131 mEq/L, Potassium 3.8 mEq/L, Chloride 98 mEq/L, Bicarbonate 21 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas: pH 7.35, PaCO2 35 mmHg, PaO2 84 mmHg, HCO3 19 mEq/L, SaO2 95%, Blood Lactate 3.2 mmol/L.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "blood_grouping": {
        resultText: "Blood Grouping & Cross-Match: B Rh Positive. STAT 2 units Packed Red Blood Cells (PRBC) cross-matched and issued.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "usg_abdomen": {
        resultText: "Ultrasound Abdomen & Portal Doppler: Coarse echotexture of liver with nodular surface, portal vein dilated to 14.8 mm with hepatopetal flow, splenomegaly (15.2 cm), moderate free ascitic fluid.",
        turnaroundMinutes: 25,
        category: "imaging",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 126 bpm, no ischemic changes.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Clear lung fields, no aspiration pneumonitis.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "serum_crp": {
        resultText: "C-Reactive Protein (CRP): 12 mg/L (Reference: <5 mg/L). Mild elevation.",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /two large bore|16g cannula|14g cannula|iv access|blood transfusion|prbc|restrictive transfusion/i,
        name: "Establish Two Large-Bore IV Lines (16G/18G) & Restrictive Blood Transfusion Strategy (Target Hemoglobin 7–8 g/dL to avoid rebound portal hypertension)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /octreotide|terlipressin|somatostatin|vasoactive/i,
        name: "STAT Splanchnic Vasoactive Drug (IV Terlipressin 2mg bolus q4h or IV Octreotide 50 mcg bolus followed by 50 mcg/hr continuous infusion)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /ceftriaxone|antibiotic prophylaxis|ciprofloxacin/i,
        name: "STAT Prophylactic IV Antibiotic (IV Ceftriaxone 1g OD for 7 days to prevent SBP, bacterial infections & reduce rebleeding/mortality)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /endoscopy|evl|variceal band ligation|esophagogastroduodenoscopy|banding/i,
        name: "Emergency Upper GI Endoscopy & Endoscopic Variceal Ligation (EVL) within 12 hours of presentation post-resuscitation",
        targetMilestoneMinutes: 25
      }
    ],
    incidentalPool: [
      {
        id: "inc_ugib_1",
        title: "Lactulose for Hepatic Encephalopathy Prophylaxis",
        description: "Massive upper gastrointestinal hemorrhage delivers huge protein load into gut, increasing ammonia production and precipitating coma.",
        correctAction: "Initiate oral/nasogastric Lactulose 30 mL TID titrated to 2–3 soft bowel movements daily.",
        status: "unnoticed"
      },
      {
        id: "inc_ugib_2",
        title: "Caution with Platelet / FFP Over-Correction",
        description: "Cirrhotic coagulopathy represents rebalanced hemostasis.",
        correctAction: "Avoid aggressive FFP or platelet transfusions unless severe intractable bleeding or extreme thrombocytopenia (<30,000/mcL); volume expansion raises portal pressures.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Patient with known decompensated cirrhosis presenting with massive hematemesis, dark tarry stools, hemorrhagic shock, stigmata of chronic liver disease, and splenomegaly. Clinician must identify portal hypertensive hemorrhage.",
        consequenceOnRight: "Portal hypertensive hemorrhage diagnosed rapidly; hemodynamic stabilization and vasoactive pharmacotherapy initiated immediately.",
        consequenceOnWrong: "Misattributing hemorrhage to uncomplicated peptic ulcer disease delays crucial splanchnic vasoactive infusion and prophylactic antibiotics."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Urgent diagnostic endoscopy timing, blood grouping & cross-match, CBC, coagulation, and liver function panels in acute cirrhosis presentation.",
        consequenceOnRight: "STAT blood cross-match and endoscopy arranged; identifies high-risk dilated vessels suitable for band ligation.",
        consequenceOnWrong: "Over-investigating with delayed non-contrast imaging while omitting urgent endoscopy leads to exsanguinating hemorrhage."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Initial resuscitation targets: Restrictive transfusion protocol (target Hb 7–8 g/dL) and immediate splanchnic vasoactive drug (Terlipressin / Octreotide).",
        consequenceOnRight: "Terlipressin infusion and restrictive blood transfusion reduce portal venous pressure and decrease active hemorrhage rate.",
        consequenceOnWrong: "Over-transfusion to Hb > 10 g/dL causes surge in portal pressures, precipitating massive uncontrollable re-bleeding."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Endoscopic Band Ligation (EVL) as primary definitive hemostatic modality, combined with 7-day Ceftriaxone antibiotic prophylaxis.",
        consequenceOnRight: "EVL successfully performed and IV Ceftriaxone started, significantly decreasing mortality and bacterial translocation.",
        consequenceOnWrong: "Omitting prophylactic antibiotics in cirrhotic gastrointestinal hemorrhage markedly increases spontaneous bacterial peritonitis and sepsis."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Surveillance for refractory hemorrhage requiring balloon tamponade or emergency portosystemic shunt (TIPS).",
        consequenceOnRight: "Hemorrhage arrested; patient closely monitored in ICU for signs of re-bleeding or hepatic encephalopathy.",
        consequenceOnWrong: "Failure to have rescue balloon tamponade available in massive refractory hemorrhage results in fatal aspiration/exsanguination."
      }
    ]
  },
  {
    id: "scaffold_urosepsis",
    title: "High Fever, Right Flank Pain, Hypotension & Confusion in Elderly Diabetic",
    conditionName: "Urosepsis with Septic Shock",
    subject: "Medicine",
    system: "Infectious/Nephrology",
    demographics: {
      "name": "Kamala Sundaram",
      "age": 68,
      "gender": "Female",
      "setting": "Emergency"
},
    openingVignette: "A 68-year-old female with poorly controlled type 2 diabetes presents with 2 days of high-grade fever with rigors, right flank pain, severe dysuria, profound hypotension, cold clammy extremities, and delirium.",
    initialVitals: {
      "hr": 130,
      "bp": "78/48",
      "rr": 30,
      "spo2": 92,
      "temp": "39.6°C",
      "grbs": 284
},
    clinchingClue: "Severe right costovertebral angle tenderness, cloudy foul-smelling urine with heavy pyuria (pus cells >100/HPF) and bacteriuria, elevated serum lactate (4.6 mmol/L), and septic shock refractory to initial fluid bolus requiring noradrenaline.",
    clinchingClueTimeMinutes: 15,
    examFindingsMap: {
      "cvs": "Tachycardia 130 bpm, bounding pulses initially progressing to weak thready peripheral pulses, heart sounds normal S1 S2, no murmur.",
      "chest": "Tachypneic (RR 30/min), clear vesicular breath sounds bilaterally, no crepitations or wheezes.",
      "abdomen": "Soft, marked tenderness on deep palpation in right lumbar and right hypochondrium; severe right renal angle tenderness (positive Murphy's punch sign / costovertebral tenderness on right side). No generalized guarding or rebound.",
      "neuro": "Acute toxic delirium: Agitated, confused, disoriented to time and place (GCS 11/15: E3V3M5), pupils symmetric and reactive, no focal neurological deficits.",
      "general": "Toxic appearance, febrile (39.6°C), severe peripheral vasoconstriction with mottled knees, capillary refill time 4 seconds, dry tongue.",
      "vitals": "Septic Shock: HR 130 bpm, BP 78/48 mmHg (MAP 58 mmHg), RR 30/min, SpO2 92% on room air, Temp 39.6°C, GRBS 284 mg/dL.",
      "local": "External genitalia: Mild atrophic vaginitis, Foley catheter drained 40 mL of thick turbid cloudy urine with sediment."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Type 2 Diabetes Mellitus for 14 years with microvascular complications. History of recurrent lower urinary tract infections and asymptomatic nephrolithiasis.",
      "medications": "Gliclazide 80mg BD, Metformin 500mg BD. Had taken Ciprofloxacin 500mg 2 tablets over the last 2 days without improvement.",
      "family": "Non-contributory.",
      "social": "Homemaker, non-smoker, lives with daughter.",
      "surgical": "No prior surgical interventions.",
      "presenting": "Started experiencing painful burning micturition and urinary frequency 3 days ago, which rapidly worsened to high fever with teeth-chattering chills, right-sided severe back/flank pain, vomiting, and progressive confusion."
    },
    investigationsMap: {
      "urine_culture": {
        resultText: "STAT Urinalysis & Culture: Turbid, Dipstick 3+ Leukocyte Esterase, 3+ Nitrite, Protein 2+, Pus cells >100/HPF, RBCs 10–15/HPF, Gram-negative rods present. Culture grew Extended-Spectrum Beta-Lactamase (ESBL) producing Escherichia coli (>10^5 CFU/mL), sensitive to Meropenem, Amikacin, and Fosfomycin; resistant to Ceftriaxone and Fluoroquinolones.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "blood_culture": {
        resultText: "STAT Blood Cultures (2 sets): ESBL-producing Escherichia coli isolated, matching urinary isolate sensitivities.",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 11.0 g/dL, Total Leukocyte Count (TLC) 24,600/mcL with 89% Neutrophils, 8% Band forms, Toxic granulations positive, Platelet Count 112,000/mcL (Consumptive Sepsis Thrombocytopenia).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 78 mg/dL, Serum Creatinine 2.4 mg/dL (Baseline 1.0 mg/dL — Acute Kidney Injury KDIGO Stage 2), eGFR 22 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "lactate": {
        resultText: "STAT Blood Lactate: 4.6 mmol/L (Reference: <2.0 mmol/L) — Severe Tissue Hypoperfusion / Cellular Dysoxia.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 132 mEq/L, Potassium 4.7 mEq/L, Chloride 98 mEq/L, Bicarbonate 16 mEq/L, Anion Gap 18 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "usg_kub": {
        resultText: "Ultrasound KUB (Kidney, Ureter, Bladder): Right kidney enlarged (12.4 cm) with increased cortical echogenicity, loss of corticomedullary differentiation, and mild hydronephrosis due to a 6 mm calculus in the proximal right ureter (Obstructive Pyelonephritis). Left kidney normal.",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas: pH 7.28, PaCO2 29 mmHg, PaO2 72 mmHg, HCO3 15.2 mEq/L, Base Excess -9.8 mEq/L, SaO2 92% on room air.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 1.6 mg/dL, AST 52 U/L, ALT 44 U/L, ALP 110 U/L, Serum Albumin 2.9 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 15.2 sec, INR 1.28, aPTT 36.4 sec, Fibrinogen 410 mg/dL.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Clear lung fields, no consolidation or pulmonary edema.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 130 bpm, no acute ST-T elevation.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "serum_b12": {
        resultText: "Serum Vitamin B12: 340 pg/mL. Normal.",
        turnaroundMinutes: 45,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /blood culture|urine culture|culture/i,
        name: "STAT Blood & Urine Cultures prior to initiating antimicrobial therapy (within 15 minutes of presentation)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /meropenem|piperacillin|tazobactam|piptaz|carbapenem|antibiotic/i,
        name: "STAT Empiric Broad-Spectrum IV Antibiotic for Urosepsis/ESBL (IV Meropenem 1g q8h or Piperacillin-Tazobactam 4.5g q6h within 1 hour of triage)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /crystalloid|normal saline|ringer lactate|iv fluids|30 ml\/kg|fluid bolus/i,
        name: "Rapid Weight-Based Crystalloid Fluid Resuscitation (30 mL/kg IV isotonic crystalloid within 3 hours)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /noradrenaline|norepinephrine|vasopressor/i,
        name: "Early Vasopressor Support (IV Norepinephrine infusion titrated to target Mean Arterial Pressure [MAP] >= 65 mmHg if hypotensive despite fluids)",
        targetMilestoneMinutes: 20
      },
      {
        orderOrActionPattern: /dj stent|pcn|percutaneous nephrostomy|urology consult|decompression/i,
        name: "Emergency Urological Consultation & Decompression of Obstructed Infected Kidney (Double-J Stenting or Percutaneous Nephrostomy)",
        targetMilestoneMinutes: 30
      }
    ],
    incidentalPool: [
      {
        id: "inc_urosep_1",
        title: "Obstructive Pyonephrosis Source Control Mandate",
        description: "Antibiotics alone cannot sterilize an obstructed infected collecting system containing calculus and pus.",
        correctAction: "Urgent source control by retrograde ureteric DJ stenting or percutaneous nephrostomy (PCN) is mandatory.",
        status: "unnoticed"
      },
      {
        id: "inc_urosep_2",
        title: "Euglycemic Glycemic Target during Sepsis",
        description: "Stress hyperglycemia in sepsis exacerbates neutrophil dysfunction.",
        correctAction: "Initiate subcutaneous/IV regular insulin sliding scale targeting blood glucose 140–180 mg/dL.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Elderly diabetic female presenting with fever, severe right flank tenderness, pyuria, hyperlactatemia, and refractory hypotension. Clinician must identify urinary tract source sepsis.",
        consequenceOnRight: "Urinary tract sepsis diagnosed rapidly; Surviving Sepsis Campaign 1-Hour Bundle initiated.",
        consequenceOnWrong: "Misattributing shock to simple cardiogenic or hypovolemic etiology delays broad-spectrum antibiotics and vasopressors, leading to irreversible multi-organ failure."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Prioritizing blood and urine cultures, serum lactate, renal function, and urgent renal tract ultrasound to evaluate for hydronephrosis/obstruction.",
        consequenceOnRight: "Ultrasound KUB rapidly reveals obstructing calculus; cultures drawn prior to antibiotics guide definitive de-escalation.",
        consequenceOnWrong: "Failing to image the urinary tract misses infected hydronephrosis (pyonephrosis) requiring surgical source control."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Immediate execution of Sepsis Bundle: 30 mL/kg IV crystalloids, STAT broad-spectrum carbapenem/beta-lactamase inhibitor, and Norepinephrine for MAP >= 65 mmHg.",
        consequenceOnRight: "Target MAP >= 65 mmHg achieved promptly, restoring vital organ microvascular perfusion.",
        consequenceOnWrong: "Delaying vasopressor support in fluid-refractory shock worsens ischemic acute tubular injury and lactic acidosis."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Urgent urological intervention for emergent decompression of the obstructed collecting system (DJ stent / PCN) combined with targeted IV antibiotics.",
        consequenceOnRight: "DJ stent successfully deployed; purulent infected urine drained, resulting in rapid clinical defervescence.",
        consequenceOnWrong: "Relying on antibiotics alone without source control leads to fatal recalcitrant shock."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Monitoring for acute kidney injury progression, DIC, and secondary acute respiratory distress syndrome (ARDS).",
        consequenceOnRight: "Serial lactate clearance and hourly urine output monitoring confirm resolving acute tubular injury.",
        consequenceOnWrong: "Unmonitored fluid administration leads to non-cardiogenic pulmonary edema and respiratory failure."
      }
    ]
  },
  {
    id: "scaffold_post_mi_comp",
    title: "Sudden Harsh Pansystolic Murmur, Thrill & Shock Day 4 Post-MI",
    conditionName: "Post-MI Ventricular Septal Rupture (VSR)",
    subject: "Medicine",
    system: "Cardiology",
    demographics: {
      "name": "Subhash Chandra",
      "age": 64,
      "gender": "Male",
      "setting": "ICU"
},
    openingVignette: "A 64-year-old male on Day 4 of an extensive anterior wall myocardial infarction suddenly develops acute breathlessness, orthopnea, severe hypotension, and a new loud harsh holosystolic murmur with a palpable parasternal thrill.",
    initialVitals: {
      "hr": 124,
      "bp": "76/44",
      "rr": 32,
      "spo2": 86,
      "temp": "36.8°C",
      "grbs": 142
},
    clinchingClue: "Transthoracic echocardiography with color Doppler demonstrates a 14 mm muscular ventricular septal rupture at the apical septum with a large left-to-right shunt (Qp/Qs 2.8), severe right ventricular volume overload, and step-up in oxygen saturation between right atrium (62%) and pulmonary artery (84%).",
    clinchingClueTimeMinutes: 15,
    examFindingsMap: {
      "cvs": "Tachycardia 124 bpm, low-volume pulse, elevated JVP (8 cm above sternal angle) with prominent 'v' wave and systolic pulsation. Precordial Palpation: Prominent systolic thrill felt along the lower left sternal border. Auscultation: Loud, harsh Grade 4/6 holosystolic / pansystolic murmur loudest at the left lower sternal border (3rd–4th ICS), radiating widely across the precordium.",
      "chest": "Bilateral diffuse coarse crepitations/crackles extending throughout middle and lower lung zones (Acute cardiogenic pulmonary edema).",
      "abdomen": "Tender enlarged liver edge (acute right heart congestion), no ascites, normal bowel sounds.",
      "neuro": "Restless, hypoxic, confused (GCS 12/15: E3V4M5), cool pale extremities.",
      "general": "Severe respiratory distress, central and peripheral cyanosis, cold clammy extremities, profuse cold sweating.",
      "vitals": "Cardiogenic Shock: BP 76/44 mmHg (MAP 54 mmHg), HR 124 bpm, RR 32/min, SpO2 86% on room air, Temp 36.8°C, GRBS 142 mg/dL.",
      "local": "Femoral and distal peripheral pulses thready but present bilaterally. No localized peripheral edema."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Presented 4 days ago with late-presenting extensive anterior STEMI (symptom onset >24 hours prior to presentation, did not receive timely primary PCI or thrombolysis).",
      "medications": "Aspirin 75mg OD, Clopidogrel 75mg OD, Atorvastatin 40mg OD, Ramipril 2.5mg OD (held).",
      "family": "Father died of coronary artery disease at age 58.",
      "social": "Chronic smoker 20 pack-years, retired clerk.",
      "surgical": "No past surgical operations.",
      "presenting": "While resting in the coronary care unit on Day 4 post-MI, experienced acute sudden suffocation, chest heaviness, severe dizziness, and sudden drop in blood pressure."
    },
    investigationsMap: {
      "echo": {
        resultText: "STAT Bedside 2D Echocardiogram with Color Doppler: 14 mm discontinuity in apical muscular interventricular septum (Ventricular Septal Rupture) with high-velocity left-to-right color jet across defect (Vmax 4.2 m/s). Dilated right ventricle with acute volume overload and hyperdynamic left ventricular base with akinetic apex. Estimated pulmonary-to-systemic shunt ratio (Qp:Qs) 2.8:1. No free wall rupture or pericardial tamponade.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas (Room Air): pH 7.26, PaCO2 32 mmHg, PaO2 52 mmHg, HCO3 14.8 mEq/L, SaO2 85%, Blood Lactate 4.8 mmol/L (Severe lactic acidosis and hypoxemic respiratory failure).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 124 bpm, QS waves with persistent ST elevations and T-wave inversions in leads V1–V5 (Evolving anterior MI / aneurysmal changes).",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable CXR: Cardiomegaly with acute bilateral alveolar perihilar bat-wing infiltrates (Severe Cardiogenic Pulmonary Edema) and prominent pulmonary vascular congestion.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "troponin": {
        resultText: "High-Sensitivity Troponin I: 4.8 ng/mL (Reference: <0.04 ng/mL). Elevated.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 12.8 g/dL, Total WBC Count 13,200/mcL (82% Neutrophils), Platelet Count 210,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 64 mg/dL, Serum Creatinine 1.9 mg/dL (Acute Kidney Injury from cardiogenic shock), eGFR 36 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 136 mEq/L, Potassium 4.4 mEq/L, Chloride 100 mEq/L, Bicarbonate 16 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 13.2 sec, INR 1.08, aPTT 32.0 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 1.8 mg/dL, AST 110 U/L, ALT 98 U/L (Congestive ischemic hepatopathy).",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "serum_tsh": {
        resultText: "Serum TSH: 1.8 mIU/L. Normal.",
        turnaroundMinutes: 40,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /echo|echocardiogram|bedside echo|2d echo/i,
        name: "STAT Bedside Echocardiogram with Color Doppler to Differentiate VSR from Acute Papillary Muscle Rupture / Free Wall Rupture",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /iabp|intra-aortic balloon pump|counterpulsation|impella/i,
        name: "Emergency Intra-Aortic Balloon Pump (IABP) Insertion / Mechanical Circulatory Support (Reduces LV afterload, decreases left-to-right shunt & augments coronary perfusion)",
        targetMilestoneMinutes: 20
      },
      {
        orderOrActionPattern: /nitroprusside|vasodilator|afterload reduction|inodilator|milrinone|noradrenaline/i,
        name: "Judicious Afterload Reduction (IV Sodium Nitroprusside carefully titrated with Arterial Line + Norepinephrine / Inotrope for Blood Pressure Support)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /ctvs|cardiothoracic|cardiac surgeon|surgical repair|emergency surgery|vsr repair/i,
        name: "STAT Cardiothoracic Surgical Consultation (CTVS) for Emergency Surgical VSR Patch Repair or ECMO Bridge",
        targetMilestoneMinutes: 25
      }
    ],
    incidentalPool: [
      {
        id: "inc_vsr_1",
        title: "VSR vs Papillary Muscle Rupture Murmur Distinction",
        description: "VSR produces a harsh pansystolic murmur with a palpable thrill at left sternal border; Acute MR produces soft apical systolic murmur without thrill radiating to axilla.",
        correctAction: "Echocardiography is the definitive diagnostic modality to distinguish these mechanical complications.",
        status: "unnoticed"
      },
      {
        id: "inc_vsr_2",
        title: "Timing Dilemma in Surgical VSR Repair",
        description: "Freshly infarcted myocardial tissue is friable and tears easily upon suturing.",
        correctAction: "Hemodynamically stabilize with IABP and inotropes; emergency surgical repair indicated for refractory shock, while stable patients may benefit from optimized delayed repair.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Patient post-infarction presenting with sudden cardiogenic shock, pulmonary edema, and a new harsh holosystolic murmur with thrill at the left sternal border. Clinician must identify post-infarction mechanical defect.",
        consequenceOnRight: "Mechanical defect recognized immediately; specialized protocol activated.",
        consequenceOnWrong: "Misdiagnosing presentation as simple recurrent ischemia or heart failure delays mechanical circulatory support and surgical consultation."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Urgent bedside Transthoracic Echocardiogram with Color Doppler to localize internal defect, quantify shunt ratio, and exclude acute severe MR.",
        consequenceOnRight: "Echocardiography confirms 14 mm apical defect with massive left-to-right shunt and excludes free wall rupture.",
        consequenceOnWrong: "Delaying echocardiography while empirically administering large fluid boluses worsens pulmonary edema."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Mechanical circulatory support with Intra-Aortic Balloon Counterpulsation (IABP) and targeted pharmacologic afterload reduction.",
        consequenceOnRight: "IABP deployed successfully, dramatically reducing LV afterload, decreasing left-to-right shunting, and augmenting coronary blood flow.",
        consequenceOnWrong: "Administering pure alpha-agonist vasoconstrictors increases LV afterload, worsening the left-to-right shunt and accelerating right heart failure."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Definitive surgical consultation with cardiothoracic surgery team for emergency surgical patch repair or percutaneous occluder closure.",
        consequenceOnRight: "Emergency CTVS consultation initiated; patient transferred to cardiac surgical theatre with IABP in situ.",
        consequenceOnWrong: "Relying purely on medical therapy for large defect carries >90% in-hospital mortality."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Monitoring for refractory cardiogenic shock, progressive multi-organ failure, and malignant cardiac arrhythmias.",
        consequenceOnRight: "Continuous arterial line and pulmonary artery pressure monitoring maintain hemodynamic stability until definitive surgical repair.",
        consequenceOnWrong: "Failure to monitor end-organ perfusion leads to irreversible ischemic bowel and anuric renal failure."
      }
    ]
  },
  {
    id: "scaffold_anaphylaxis",
    title: "Stridor, Urticaria, Bronchospasm & Shock Post-Antibiotic Injection",
    conditionName: "Severe Anaphylactic Shock",
    subject: "Emergency",
    system: "Immunology",
    demographics: {
      "name": "Meera Nair",
      "age": 28,
      "gender": "Female",
      "setting": "Emergency"
},
    openingVignette: "A 28-year-old female develops severe throat tightness, inspiratory stridor, diffuse pruritic hives (urticaria), facial angioedema, wheezing, and profound hypotension within 5 minutes of receiving an intramuscular injection of Cefotaxime in an outpatient clinic.",
    initialVitals: {
      "hr": 138,
      "bp": "70/40",
      "rr": 34,
      "spo2": 82,
      "temp": "37.1°C",
      "grbs": 108
},
    clinchingClue: "Rapid multiorgan involvement within minutes of allergen exposure: Upper airway angioedema/stridor, severe diffuse bronchospasm, generalized urticarial wheals, and distributive shock (BP 70/40 mmHg) responding dramatically to intramuscular Epinephrine.",
    clinchingClueTimeMinutes: 5,
    examFindingsMap: {
      "cvs": "Marked tachycardia 138 bpm, thready bounding pulses, faint S1 S2, no organic murmurs.",
      "chest": "Audible laryngeal stridor on inspiration; auscultation reveals diffuse severe polyphonic expiratory wheezes and prolonged expiration across all lung fields with intercostal retractions.",
      "abdomen": "Hyperactive bowel sounds, diffuse cramping abdominal tenderness, nausea, no organomegaly.",
      "neuro": "Anxious, agitated with impending sense of doom, dizziness on sitting up (GCS 13/15: E3V4M6), pupils equal.",
      "general": "Marked facial angioedema: severe swelling of lips, uvula, tongue, and eyelids; diffuse erythematous blanching urticarial wheals and plaques covering face, trunk, and extremities.",
      "vitals": "Distributive Anaphylactic Shock: BP 70/40 mmHg (MAP 50 mmHg), HR 138 bpm, RR 34/min, SpO2 82% on room air, Temp 37.1°C, GRBS 108 mg/dL.",
      "local": "Injection site on right gluteal region shows localized erythema and induration without abscess."
    },
    historyMap: {
      "allergies": "History of mild skin itching with Penicillin in childhood; was not noted in clinic records.",
      "past": "Mild allergic rhinitis. No chronic hypertension, diabetes, or coronary artery disease.",
      "medications": "Given IM Cefotaxime 1g for an uncomplicated urinary tract infection 10 minutes ago.",
      "family": "Atopic family history (mother has asthma).",
      "social": "Software engineer, non-smoker, non-alcoholic.",
      "surgical": "No prior surgical interventions.",
      "presenting": "Within 3 minutes of receiving the gluteal antibiotic injection, experienced intense palm/sole itching, generalized hives, throat constriction, hoarseness, violent coughing, dizziness, and collapsed."
    },
    investigationsMap: {
      "serum_tryptase": {
        resultText: "STAT Serum Total Tryptase: 38.4 mcg/L (Reference: <11.4 mcg/L, collected 1 hour post-reaction) — Markedly Elevated (Confirms massive mast cell / basophil degranulation in anaphylaxis).",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas (Room Air): pH 7.28, PaCO2 48 mmHg, PaO2 50 mmHg, HCO3 21 mEq/L, SaO2 82%, Blood Lactate 3.4 mmol/L (Acute hypoxemia and respiratory acidosis).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 138 bpm, non-specific T-wave flattening across lateral leads (Kounis syndrome / allergic myocardial ischemia ruled out).",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 14.8 g/dL (Mild hemoconcentration from vascular leak), Total WBC Count 11,200/mcL (Eosinophils 6%), Platelet Count 240,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 138 mEq/L, Potassium 4.1 mEq/L, Chloride 101 mEq/L, Bicarbonate 22 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 26 mg/dL, Serum Creatinine 0.8 mg/dL, eGFR >90 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Hyperinflated lung fields, no pneumothorax or consolidation.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.6 mg/dL, AST 24 U/L, ALT 22 U/L, Albumin 4.2 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 12.0 sec, INR 1.00, aPTT 28.0 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "serum_crp": {
        resultText: "C-Reactive Protein: 3.2 mg/L. Normal.",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /epinephrine|adrenaline|1:1000|im adrenaline|im epinephrine/i,
        name: "STAT Intramuscular Epinephrine / Adrenaline (1:1,000 concentration, 0.5 mg IM into anterolateral mid-thigh [vastus lateralis] — repeat every 5–15 minutes if refractory)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /oxygen|high flow|nrbm|intubation|airway|cricothyroidotomy/i,
        name: "High-Flow Supplemental Oxygen (15 L/min NRBM) & Preparation for Emergency Difficult Airway / Endotracheal Intubation",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /normal saline|crystalloid|iv fluids|fluid bolus|1000 ml|2000 ml/i,
        name: "Aggressive IV Crystalloid Bolus (1–2 Liters 0.9% Normal Saline rapid infusion via large-bore cannula for profound vasodilation/third-spacing)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /hydrocortisone|methylprednisolone|antihistamine|chlorpheniramine|diphenhydramine|pheniramine|steroid/i,
        name: "Second-Line Adjunctive Therapy: IV Hydrocortisone 200mg + IV Chlorpheniramine / Diphenhydramine 25–50mg (to prevent biphasic anaphylaxis)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /salbutamol|albuterol|nebulization|duolin|bronchodilator/i,
        name: "Nebulized Beta-2 Agonist (Salbutamol 5mg nebulization for persistent bronchospasm)",
        targetMilestoneMinutes: 15
      }
    ],
    incidentalPool: [
      {
        id: "inc_anaph_1",
        title: "Biphasic Anaphylaxis Surveillance Window",
        description: "Recurrence of severe allergic symptoms can occur 1 to 72 hours (typically 8–10 hours) after apparent clinical resolution without re-exposure.",
        correctAction: "Mandatory observation in emergency department/ICU for at least 8–24 hours post-resuscitation.",
        status: "unnoticed"
      },
      {
        id: "inc_anaph_2",
        title: "Auto-Injector (EpiPen) Discharge Education",
        description: "Patient at lifelong risk of severe beta-lactam cross-reactivity.",
        correctAction: "Issue medical alert bracelet, document severe penicillin/cephalosporin allergy, and prescribe self-injectable Epinephrine (0.3mg auto-injector).",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Patient presenting with hyperacute onset hives, facial angioedema, stridor, wheezing, and profound distributive shock within minutes of antibiotic injection. Clinician must identify acute hypersensitivity reaction.",
        consequenceOnRight: "Severe hypersensitivity shock recognized immediately; emergency Epinephrine administered within golden minutes.",
        consequenceOnWrong: "Delaying diagnosis to obtain blood tests or misdiagnosing as isolated asthma/vasovagal syncope leads to fatal asphyxiation or cardiovascular collapse."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Understanding that acute systemic hypersensitivity is an emergency clinical diagnosis; post-event Serum Tryptase (drawn 1–2 hours after onset) provides retrospective diagnostic confirmation.",
        consequenceOnRight: "Clinical diagnosis made instantly without waiting for laboratory results; serum tryptase sent appropriately.",
        consequenceOnWrong: "Withholding adrenaline while waiting for lab tests or chest imaging is lethal."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "First-line life-saving drug of choice: Intramuscular Epinephrine (Adrenaline 1:1,000, 0.5 mg IM anterolateral thigh).",
        consequenceOnRight: "IM Epinephrine halts mast cell degranulation, reverses laryngeal edema, causes bronchodilation, and restores systemic vascular resistance.",
        consequenceOnWrong: "Administering oral antihistamines or subcutaneous adrenaline as primary therapy fails to halt airway obstruction."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Vigorous isotonic fluid resuscitation (1–2L rapid bolus) and secondary medications (IV corticosteroids and H1/H2 antihistamines).",
        consequenceOnRight: "Rapid crystalloid infusion corrects massive third-space capillary leak and restores blood pressure.",
        consequenceOnWrong: "Failure to replace intravascular volume loss results in persistent refractory hypotension."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Prevention and monitoring for biphasic allergic reaction and Kounis syndrome (allergic acute coronary syndrome).",
        consequenceOnRight: "Patient observed for 24 hours in ICU with steroid taper; auto-injector education provided.",
        consequenceOnWrong: "Early premature discharge at 1 hour results in fatal unmonitored biphasic reaction at home."
      }
    ]
  },
  {
    id: "scaffold_acute_pancreatitis",
    title: "Excruciating Epigastric Pain Radiating to Back, Vomiting & Hypocalcemia",
    conditionName: "Severe Acute Gallstone Pancreatitis",
    subject: "Surgery",
    system: "Gastroenterology",
    demographics: {
      "name": "Sarojini Saxena",
      "age": 46,
      "gender": "Female",
      "setting": "Emergency"
},
    openingVignette: "A 46-year-old obese female presents with 18 hours of sudden, excruciating, constant epigastric pain radiating straight through to the back, relieved slightly by leaning forward, accompanied by intractable bilious vomiting, tachycardia, and fever.",
    initialVitals: {
      "hr": 120,
      "bp": "92/58",
      "rr": 28,
      "spo2": 93,
      "temp": "38.5°C",
      "grbs": 168
},
    clinchingClue: "Serum Lipase is markedly elevated at 2,480 U/L (>3 times upper limit of normal: 10–140 U/L), Serum Amylase 1,620 U/L, with Ultrasound Abdomen showing cholelithiasis, dilated common bile duct (11 mm), and diffuse pancreatic enlargement with peripancreatic fluid collection.",
    clinchingClueTimeMinutes: 15,
    examFindingsMap: {
      "cvs": "Tachycardia 120 bpm, normal heart sounds S1 S2, no organic murmurs.",
      "chest": "Tachypneic (RR 28/min), shallow breathing with splinting; dull percussion note and decreased breath sounds at left lung base (Sympathetic left-sided pleural effusion).",
      "abdomen": "Distended abdomen with exquisite epigastric and periumbilical tenderness, involuntary guarding, hypoactive/absent bowel sounds (paralytic ileus). Cullen's sign (faint periumbilical bluish ecchymosis) and Grey Turner's sign (bluish discoloration in flanks) starting to appear (retroperitoneal hemorrhagic necrotizing pancreatitis).",
      "neuro": "Restless, in agonizing pain (GCS 14/15: E4V4M6), oriented x3, pupils equal and reactive.",
      "general": "Severe distress, pale, mild scleral icterus (biliary obstruction), diaphoretic, dry mucous membranes.",
      "vitals": "Systemic Inflammatory Response / Shock: HR 120 bpm, BP 92/58 mmHg (MAP 69 mmHg), RR 28/min, SpO2 93% on room air, Temp 38.5°C, GRBS 168 mg/dL.",
      "local": "Extremities: Trousseau's sign positive (carpopedal spasm induced by inflating BP cuff above systolic pressure for 3 minutes) due to acute hypocalcemia from fat saponification."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "History of recurrent postprandial right upper quadrant colicky pain after fatty meals for 6 months (biliary colic). No chronic alcohol use.",
      "medications": "None on regular prescription.",
      "family": "Mother had gallstone disease and underwent cholecystectomy.",
      "social": "Non-smoker, non-drinker, BMI 32 kg/m2.",
      "surgical": "No prior abdominal surgeries.",
      "presenting": "Developed excruciating, constant, band-like epigastric pain radiating to the spine 18 hours ago after a heavy celebratory dinner, with repeated vomiting and inability to tolerate any oral intake."
    },
    investigationsMap: {
      "serum_lipase": {
        resultText: "STAT Serum Lipase: 2,480 U/L (Reference: 10–140 U/L) — >17x Upper Limit of Normal (Diagnostic for Acute Pancreatitis).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "serum_amylase": {
        resultText: "STAT Serum Amylase: 1,620 U/L (Reference: 28–100 U/L) — Markedly Elevated.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "usg_abdomen": {
        resultText: "Ultrasound Abdomen: Multiple acoustic gallstones within a thickened gallbladder wall, Common Bile Duct (CBD) dilated to 11.2 mm with an impacted 5mm echogenic calculus at lower end (Choledocholithiasis). Pancreas bulky, edematous, with peripancreatic free fluid.",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "cect_abdomen": {
        resultText: "CECT Abdomen (Protocol: Pancreatic Phase post-72h): Diffuse necrosis involving >30% of pancreatic parenchyma with extensive peripancreatic acute necrotic collections. Modified CT Severity Index (MCTSI): 8/10 (Severe Acute Necrotizing Pancreatitis).",
        turnaroundMinutes: 30,
        category: "imaging",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 15.6 g/dL (Hemoconcentration, Hematocrit 47%), Total Leukocyte Count 18,600/mcL (86% Neutrophils), Platelet Count 280,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 3.6 mg/dL (Direct 2.6 mg/dL), SGOT/AST 260 U/L (Elevated >3x indicates gallstone etiology), SGPT/ALT 310 U/L, Alkaline Phosphatase 380 U/L, Serum Albumin 3.1 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "serum_calcium": {
        resultText: "Serum Total Calcium: 6.8 mg/dL (Reference: 8.5–10.5 mg/dL) — Significant Hypocalcemia secondary to retroperitoneal fat saponification; Ionized Calcium 0.88 mmol/L.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 54 mg/dL (Prerenal azotemia), Serum Creatinine 1.7 mg/dL, eGFR 42 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 134 mEq/L, Potassium 3.6 mEq/L, Chloride 98 mEq/L, Bicarbonate 18 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas: pH 7.32, PaCO2 32 mmHg, PaO2 68 mmHg, HCO3 17 mEq/L, SaO2 92%, Blood Lactate 2.8 mmol/L.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 13.8 sec, INR 1.14, aPTT 33.0 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Left-sided reactive pleural effusion with basal subsegmental atelectasis; no free air under diaphragm.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 120 bpm, prolonged QTc (480 ms) related to hypocalcemia.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "serum_ferritin": {
        resultText: "Serum Ferritin: 140 ng/mL. Normal.",
        turnaroundMinutes: 40,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /ringer lactate|lactated ringer|crystalloid|aggressive fluid|goal directed fluid|200-250 ml\/hr/i,
        name: "Aggressive Goal-Directed Fluid Resuscitation (IV Ringer's Lactate 200–250 mL/hr, targeting urine output >0.5–1.0 mL/kg/hr & hematocrit reduction)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /calcium gluconate|calcium replacement|iv calcium/i,
        name: "STAT IV Calcium Gluconate 10% (10 mL infused over 10–15 min for symptomatic hypocalcemia/positive Trousseau sign)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /fentanyl|morphine|hydromorphone|tramadol|analgesia|pain relief/i,
        name: "Multimodal IV Opioid Analgesia (IV Fentanyl / Hydromorphone / Morphine on demand for severe pancreatitis pain)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /ercp|sphincterotomy|biliary decompression|endoscopic retrograde/i,
        name: "Emergency ERCP & Endoscopic Sphincterotomy within 24–48 hours for Obstructive Gallstone Pancreatitis with Cholangitis / Impacted Stone",
        targetMilestoneMinutes: 30
      }
    ],
    incidentalPool: [
      {
        id: "inc_panc_1",
        title: "Routine Prophylactic Antibiotic Restriction",
        description: "Non-infected necrotizing pancreatitis.",
        correctAction: "Do NOT administer routine prophylactic antibiotics in sterile necrotizing pancreatitis; reserve antibiotics only for documented infected necrosis or acute cholangitis.",
        status: "unnoticed"
      },
      {
        id: "inc_panc_2",
        title: "Early Enteral vs Parenteral Nutrition Strategy",
        description: "Nutritional support in severe acute pancreatitis.",
        correctAction: "Initiate early enteral nutrition via nasojejunal or nasogastric tube within 24–72 hours rather than total parenteral nutrition (TPN), preserving gut mucosal barrier.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Patient presenting with acute severe epigastric pain radiating to back, intractable vomiting, Cullen/Grey Turner signs, and >3-fold elevated serum lipase. Clinician must identify acute retroperitoneal inflammation.",
        consequenceOnRight: "Condition diagnosed promptly; risk stratification (BISAP / Ranson) and resuscitation initiated.",
        consequenceOnWrong: "Misdiagnosing as peptic perforation or cholecystitis leads to inappropriate emergency laparotomy, increasing mortality."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Biochemical confirmation with Serum Lipase/Amylase, liver function tests (ALT > 150 U/L indicates biliary etiology), ultrasound for calculi, and CT timing (indicated after 72 hours).",
        consequenceOnRight: "Lipase and biliary ultrasound confirm impacted calculus; baseline calcium and hematocrit guide fluid needs.",
        consequenceOnWrong: "Performing contrast CT within 12 hours of onset underestimates necrosis and risks contrast-induced nephropathy."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "First-line fluid resuscitation: Ringer's Lactate protocol, IV opioid analgesia, and urgent correction of symptomatic hypocalcemia.",
        consequenceOnRight: "Goal-directed Ringer's lactate resuscitation reduces microcirculatory necrosis and SIRS.",
        consequenceOnWrong: "Under-resuscitation results in extensive parenchymal necrosis, hypovolemic shock, and acute tubular necrosis."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Therapeutic ERCP with biliary sphincterotomy within 24–48 hours for persistent biliary obstruction/cholangitis, followed by index-admission cholecystectomy.",
        consequenceOnRight: "ERCP relieves biliary obstruction; cholecystectomy planned during same admission prevents recurrent attacks.",
        consequenceOnWrong: "Delaying ERCP in the presence of acute cholangitis precipitates fatal biliary sepsis."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Monitoring for infected necrosis, abdominal compartment syndrome, ARDS, and pseudocyst formation.",
        consequenceOnRight: "Bladder pressure and oxygenation tracked closely; step-up approach planned if infected necrosis develops.",
        consequenceOnWrong: "Overlooked abdominal compartment syndrome causes fatal multi-organ collapse."
      }
    ]
  },
  {
    id: "scaffold_ectopic_pregnancy",
    title: "Amenorrhea, Acute Lower Abdominal Pain, Syncope & Hemoperitoneum",
    conditionName: "Ruptured Tubal Ectopic Pregnancy",
    subject: "OBGY",
    system: "Reproductive",
    demographics: {
      "name": "Sunidhi Rao",
      "age": 27,
      "gender": "Female",
      "setting": "Emergency"
},
    openingVignette: "A 27-year-old female presents with 6 weeks of amenorrhea, sudden-onset agonizing right iliac fossa pain radiating to the right shoulder tip, light vaginal spotting, dizziness, and collapse in the emergency triage.",
    initialVitals: {
      "hr": 132,
      "bp": "78/46",
      "rr": 26,
      "spo2": 95,
      "temp": "36.6°C",
      "grbs": 102
},
    clinchingClue: "Urine pregnancy test positive, Transvaginal Ultrasound (TVS) demonstrates an empty uterine cavity with thickened endometrium, a 3.5 cm complex right adnexal mass with a tubal ring sign, and massive free fluid/echogenic blood filling the pouch of Douglas and Morison's pouch.",
    clinchingClueTimeMinutes: 10,
    examFindingsMap: {
      "cvs": "Tachycardia 132 bpm, weak thready pulses, normal heart sounds S1 S2.",
      "chest": "Bilateral vesicular breath sounds, lungs clear to auscultation.",
      "abdomen": "Distended abdomen, marked tenderness, involuntary guarding, and rebound tenderness across lower abdomen (especially right iliac fossa), shifting dullness positive (massive hemoperitoneum), hypoactive bowel sounds.",
      "neuro": "Drowsy, syncope on standing/sitting (GCS 13/15: E3V4M6), pupils equal and reactive.",
      "general": "Severe pallor, cold clammy extremities, diaphoretic, air hunger.",
      "vitals": "Hemorrhagic Hypovolemic Shock: BP 78/46 mmHg (MAP 56 mmHg), HR 132 bpm, RR 26/min, SpO2 95% on room air, Temp 36.6°C, GRBS 102 mg/dL.",
      "local": "Pelvic Examination: Sterile speculum reveals minimal dark brown bleeding through external os. Bimanual pelvic exam: Exquisite cervical motion tenderness (Chandelier sign positive), fullness and severe tenderness in the posterior fornix / pouch of Douglas, extremely tender, ill-defined boggy mass in the right adnexa."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "History of Pelvic Inflammatory Disease (PID) treated 2 years ago. Uses intrauterine contraceptive device (Copper-T) which was removed 8 months ago. Gravida 2, Para 1, Living 1, previous uncomplicated full-term normal vaginal delivery.",
      "medications": "None on regular prescription.",
      "family": "Non-contributory.",
      "social": "Homemaker, non-smoker, non-alcoholic.",
      "surgical": "No past surgical operations.",
      "presenting": "Last menstrual period was 6 weeks ago. Started having dull right lower abdominal cramping yesterday, which suddenly became sharp, tearing, and unbearable 2 hours ago, radiating to the right shoulder tip (Kehr sign) with fainting."
    },
    investigationsMap: {
      "upt": {
        resultText: "STAT Urine Test for beta-hCG (UPT): Positive (Detection of urinary beta-hCG).",
        turnaroundMinutes: 5,
        category: "labs",
        isIndicative: true
      },
      "beta_hcg": {
        resultText: "Quantitative Serum Beta-hCG: 4,850 mIU/mL (Reference discriminatory zone: >1,500–2,000 mIU/mL where intrauterine gestational sac MUST be visible on TVS).",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "tvs_usg": {
        resultText: "Emergency Transvaginal Ultrasound (TVS): Empty uterine cavity with 14 mm decidualized endometrium (no intrauterine gestational sac / pseudo-sac). Right adnexa shows a 3.4 x 2.8 cm complex heterogeneous mass with a distinct tubal ring sign and peripheral vascularity (ring of fire). Massive free fluid with swirling internal echoes (gross hemoperitoneum >800 mL) filling pouch of Douglas and hepatorenal space.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 7.2 g/dL (Acute Blood Loss Anemia), Hematocrit 22.4%, Total WBC Count 13,800/mcL, Platelet Count 210,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "blood_grouping": {
        resultText: "Blood Grouping & Rh Typing: O Rh Negative (Rh-Negative Mother). STAT 2 units O-Negative PRBC cross-matched and issued.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: Prothrombin Time (PT) 12.8 sec, INR 1.05, aPTT 29.2 sec, Fibrinogen 280 mg/dL.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 28 mg/dL, Serum Creatinine 0.8 mg/dL, eGFR >90 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 138 mEq/L, Potassium 4.0 mEq/L, Chloride 101 mEq/L, Bicarbonate 21 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas: pH 7.34, PaCO2 34 mmHg, PaO2 88 mmHg, HCO3 18 mEq/L, SaO2 95%, Blood Lactate 3.2 mmol/L.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 132 bpm, normal axis.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "serum_psa": {
        resultText: "Prostate Specific Antigen: Not applicable. (Unindicated test).",
        turnaroundMinutes: 45,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /two large bore|16g cannula|14g cannula|iv access|fluid resuscitation|blood transfusion|prbc|o negative/i,
        name: "Establish Two Large-Bore IV Cannulae (14G/16G) & STAT Crystalloid / Uncrossed O-Negative Blood Transfusion Resuscitation",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /laparotomy|laparoscopy|salpingectomy|surgery|emergency theatre|obgy consult/i,
        name: "STAT Emergency Gynecological Consultation & Emergency Surgical Intervention (Exploratory Laparotomy / Laparoscopy with Right Salpingectomy)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /anti-d|rhogam|anti d immunoglobulin|immunoglobulin/i,
        name: "STAT Anti-D Immunoglobulin (300 mcg IM for Rh-Negative unsensitized mother to prevent isoimmunization)",
        targetMilestoneMinutes: 30
      }
    ],
    incidentalPool: [
      {
        id: "inc_ectopic_1",
        title: "Rh-Negative Isoimmunization Risk",
        description: "Patient is O Rh-Negative; fetomaternal hemorrhage during tubal rupture causes anti-D alloimmunization.",
        correctAction: "Administer Anti-D Immunoglobulin (300 mcg IM) prior to hospital discharge.",
        status: "unnoticed"
      },
      {
        id: "inc_ectopic_2",
        title: "Contralateral Tubal Health Assessment",
        description: "Past history of PID increases risk of bilateral tubal pathology.",
        correctAction: "Inspect contralateral Fallopian tube intra-operatively; counsel patient on future fertility options and early scanning in subsequent pregnancies.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Reproductive-age female presenting with amenorrhea, acute lower abdominal peritonism, shoulder tip pain (Kehr sign), cervical motion tenderness, and hemorrhagic shock. Clinician must identify extrauterine gestation with hemoperitoneum.",
        consequenceOnRight: "Condition diagnosed rapidly; immediate surgical resuscitation protocol activated.",
        consequenceOnWrong: "Misdiagnosing as ruptured ovarian cyst or acute appendicitis delays life-saving gynecologic laparotomy, resulting in fatal hemoperitoneum."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Urgent Urine Test for beta-hCG (UPT), quantitative beta-hCG discriminatory zone interpretation (>2000 mIU/mL), and Transvaginal Ultrasound (TVS).",
        consequenceOnRight: "TVS confirms empty uterus and massive hemoperitoneum with adnexal mass; blood group confirms Rh-negative status.",
        consequenceOnWrong: "Waiting for serial beta-hCG levels in a hemodynamically unstable patient with hemoperitoneum is contraindicated."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Immediate aggressive resuscitation with large-bore IV access, uncrossed O-negative blood transfusion, and rapid transfer to emergency operating room.",
        consequenceOnRight: "Blood resuscitation stabilizes vitals during rapid transfer to the operating theatre.",
        consequenceOnWrong: "Attempting medical management with Methotrexate in a ruptured, unstable presentation is fatal."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Definitive surgical hemostasis via exploratory laparotomy / laparoscopy with salpingectomy and hemoperitoneum evacuation.",
        consequenceOnRight: "Emergency salpingectomy secures the bleeding site and evacuates 1.2L of blood.",
        consequenceOnWrong: "Delay in surgical clamping causes intractable hemorrhagic shock and cardiac arrest."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Prevention of Rh isoimmunization in Rh-negative mothers (Anti-D Immunoglobulin) and monitoring for post-operative anemia and DIC.",
        consequenceOnRight: "Anti-D immunoglobulin administered, preserving future obstetric health and preventing hemolytic disease of the newborn.",
        consequenceOnWrong: "Omission of Anti-D leads to maternal Rh sensitization and recurrent fetal hydrops in future pregnancies."
      }
    ]
  },
  {
    id: "scaffold_status_epilepticus",
    title: "Continuous Generalized Seizures >25 min, Cyanosis & Hyperthermia",
    conditionName: "Generalized Convulsive Status Epilepticus",
    subject: "Medicine",
    system: "Neurology",
    demographics: {
      "name": "Harish Patel",
      "age": 38,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 38-year-old male with known epilepsy is brought to the emergency department actively convulsing with continuous generalized tonic-clonic movements lasting for >25 minutes without regaining consciousness between seizure paroxysms.",
    initialVitals: {
      "hr": 142,
      "bp": "164/98",
      "rr": 28,
      "spo2": 84,
      "temp": "38.6°C",
      "grbs": 94
},
    clinchingClue: "Continuous, unrelenting bilateral tonic-clonic motor activity with autonomic storm (HR 142 bpm, BP 164/98 mmHg), profound post-ictal metabolic acidosis (ABG pH 7.18, Lactate 7.8 mmol/L), and subtherapeutic serum antiepileptic drug levels.",
    clinchingClueTimeMinutes: 5,
    examFindingsMap: {
      "cvs": "Marked tachycardia 142 bpm, hyperdynamic heart sounds S1 S2, no organic murmurs.",
      "chest": "Gurgling breath sounds with secretions in upper airway, coarse bilateral transmitted crackles, cyanosis with shallow respirations during tonic phases.",
      "abdomen": "Soft, no organomegaly, involuntary urinary and fecal incontinence.",
      "neuro": "Comatose between paroxysms (GCS 4/15: E1V1M2), continuous bilateral symmetric tonic-clonic jerking of all four extremities, upward eye rolling, jaw clenching, bilateral extensor plantar responses (Babinski positive bilaterally), pupils 5mm bilaterally and sluggishly reactive.",
      "general": "Cyanotic, profuse diaphoresis, hyperthermic (38.6°C), lateral tongue bite laceration with bleeding into oral cavity, copious foaming at the mouth.",
      "vitals": "Autonomic Storm / Severe Hypoxemia: HR 142 bpm, BP 164/98 mmHg, RR 28/min (irregular), SpO2 84% on room air, Temp 38.6°C, GRBS 94 mg/dL.",
      "local": "Musculoskeletal: Multiple abrasions over shoulders and knees from convulsing on hard floor. No evidence of posterior shoulder dislocation or limb deformity."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Diagnosed with Idiopathic Generalized Epilepsy 6 years ago. Had been seizure-free for 18 months on oral antiepileptics until medication was abruptly stopped 4 days ago.",
      "medications": "Phenytoin 300mg at bedtime (abruptly discontinued by patient due to running out of stock).",
      "family": "Non-contributory.",
      "social": "Factory supervisor, non-smoker, occasional alcohol.",
      "surgical": "No past surgical operations.",
      "presenting": "Began having generalized convulsions at home 30 minutes ago; spouse called emergency ambulance after three successive seizures occurred without the patient regaining consciousness."
    },
    investigationsMap: {
      "abg": {
        resultText: "STAT Arterial Blood Gas: pH 7.18 (7.35–7.45), PaCO2 46 mmHg, PaO2 54 mmHg, HCO3 16.8 mEq/L, Base Excess -11.2 mEq/L, SaO2 84%, Blood Lactate 7.8 mmol/L (Severe combined convulsive lactic acidosis and respiratory acidosis).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "grbs": {
        resultText: "STAT Capillary Blood Glucose: 94 mg/dL (Reference: 70–140 mg/dL, excludes hypoglycemia-induced status).",
        turnaroundMinutes: 2,
        category: "labs",
        isIndicative: true
      },
      "phenytoin_level": {
        resultText: "STAT Total Serum Phenytoin Level: <2.5 mcg/mL (Therapeutic Reference Range: 10–20 mcg/mL) — Subtherapeutic level confirming abrupt medication non-compliance.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 137 mEq/L, Potassium 4.6 mEq/L, Chloride 100 mEq/L, Bicarbonate 17 mEq/L, Serum Calcium 9.2 mg/dL, Magnesium 2.0 mg/dL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "ncct_head": {
        resultText: "NCCT Head (Post-Seizure Control): No acute intracranial hemorrhage, territorial infarction, midline shift, or mass lesion.",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 14.2 g/dL, Total WBC Count 14,800/mcL (Stress demargination leukocytosis), Platelet Count 230,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 36 mg/dL, Serum Creatinine 1.2 mg/dL, eGFR 76 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.8 mg/dL, AST 48 U/L, ALT 42 U/L, Albumin 4.1 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 12.6 sec, INR 1.02, aPTT 28.8 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 142 bpm, normal QTc interval.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Mild right perihilar opacity suspicious for early micro-aspiration; no pneumothorax.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "serum_tsh": {
        resultText: "Serum TSH: 2.1 mIU/L. Normal.",
        turnaroundMinutes: 40,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /airway|suction|oxygen|nrbm|recovery position|intubation/i,
        name: "Airway Maintenance, Oropharyngeal Suctioning, High-Flow Oxygen (15 L/min NRBM) & Lateral Recovery Positioning",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /lorazepam|diazepam|midazolam|benzodiazepine/i,
        name: "First-Line Emergent Anticonvulsant: IV Lorazepam 4mg (0.1 mg/kg at 2 mg/min) or IM Midazolam 10mg STAT (repeat once at 5 min if seizures persist)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /levetiracetam|fosphenytoin|phenytoin|valproate|valproic acid/i,
        name: "Second-Line Urgent Antiepileptic Loading: IV Levetiracetam 60 mg/kg (max 4500mg) or IV Fosphenytoin 20 mg PE/kg / Phenytoin 20 mg/kg infused over 15–20 minutes",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /propofol|thiopental|midazolam infusion|general anesthesia|intubation|mechanical ventilation/i,
        name: "Third-Line Refractory Status Protocol: Rapid Sequence Intubation & Continuous IV Propofol / Midazolam / Thiopental Anesthetic Infusion with ICU EEG Monitoring if Seizures exceed 30 minutes",
        targetMilestoneMinutes: 30
      }
    ],
    incidentalPool: [
      {
        id: "inc_status_1",
        title: "Aspiration Pneumonitis Vigilance",
        description: "Loss of airway protective reflexes and saliva pooling during prolonged convulsions.",
        correctAction: "Suction pharynx thoroughly; initiate proactive chest physiotherapy and monitor for chemical pneumonitis/aspiration pneumonia.",
        status: "unnoticed"
      },
      {
        id: "inc_status_2",
        title: "Seizure-Induced Hyperpyrexia & Rhabdomyolysis",
        description: "Intense sustained muscular contractions generate severe heat and muscle breakdown.",
        correctAction: "Institute passive external cooling and check CPK/urinalysis to detect early myoglobinuria.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Patient presenting with ongoing motor paroxysms lasting >5 minutes without recovery of consciousness. Clinician must identify prolonged unremitting seizure activity.",
        consequenceOnRight: "Prolonged continuous seizure activity recognized immediately; algorithmic neuro-resuscitation protocol initiated within the 5-minute emergent window.",
        consequenceOnWrong: "Treating prolonged seizures as benign isolated fits allows excitotoxic GABA-receptor internalization and progressive neuronal necrosis."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "STAT bedside glucose (GRBS), blood gas, antiepileptic drug levels, and continuous physiological monitoring.",
        consequenceOnRight: "Point-of-care testing confirms normoglycemia, rules out metabolic precipitants, and reveals subtherapeutic antiepileptic levels.",
        consequenceOnWrong: "Delaying treatment to obtain neuroimaging while the patient is actively convulsing leads to irreversible brain damage."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Phase 1 Emergent Therapy: Immediate administration of full-dose IV Lorazepam / IM Midazolam with airway and oxygen support.",
        consequenceOnRight: "Adequate benzodiazepine bolus terminates motor phase rapidly before permanent synaptic changes occur.",
        consequenceOnWrong: "Under-dosing benzodiazepines (e.g. giving 1mg lorazepam) fails to abort seizures and breeds pharmacoresistance."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Phase 2 Urgent Control Therapy: Full-dose IV loading of non-sedating antiepileptic (Levetiracetam 60mg/kg or Fosphenytoin 20mg PE/kg) regardless of initial benzodiazepine response.",
        consequenceOnRight: "Antiepileptic loading provides sustained neuronal membrane stabilization, preventing seizure recurrence.",
        consequenceOnWrong: "Failing to administer second-line loading leads to rebound seizures as benzodiazepine levels drop."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Management of Refractory Seizures (>30 minutes): Endotracheal intubation, continuous anesthetic infusion (Propofol/Midazolam), and continuous EEG monitoring.",
        consequenceOnRight: "Patient transitioned safely to general anesthesia with electrographic burst suppression achieved in ICU.",
        consequenceOnWrong: "Failure to induce general anesthesia in refractory state causes malignant hyperthermia, muscle necrosis, and brain death."
      }
    ]
  },
  {
    id: "scaffold_copd_exacerbation",
    title: "Severe Wheezing, Drowsiness, Flapping Tremor & Hypercapnic Respiratory Failure",
    conditionName: "Acute Exacerbation of COPD with Type 2 Respiratory Failure",
    subject: "Medicine",
    system: "Respiratory",
    demographics: {
      "name": "Manohar Lal",
      "age": 65,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 65-year-old male with severe chronic obstructive pulmonary disease (COPD) presents with 3 days of worsening breathlessness, increased volume of purulent green sputum, drowsiness, morning headache, and asterixis.",
    initialVitals: {
      "hr": 116,
      "bp": "148/88",
      "rr": 32,
      "spo2": 80,
      "temp": "37.8°C",
      "grbs": 126
},
    clinchingClue: "Arterial Blood Gas demonstrates acute-on-chronic respiratory acidosis / Type 2 respiratory failure (pH 7.24, PaCO2 72 mmHg, PaO2 46 mmHg, HCO3 31 mEq/L, SaO2 79% on room air) with significant hyperinflation and barrel chest.",
    clinchingClueTimeMinutes: 15,
    examFindingsMap: {
      "cvs": "Tachycardia 116 bpm, bounding peripheral pulse (hypercapnic vasodilation), loud P2, elevated JVP with prominent 'a' wave (Cor Pulmonale).",
      "chest": "Inspection: Barrel chest (increased AP diameter), purse-lipped breathing, severe intercostal and supraclavicular indrawing, Hoover sign positive (paradoxical inward movement of lower lateral chest wall during inspiration). Percussion: Generalized hyper-resonance, diminished cardiac dullness and liver dullness pushed downwards. Auscultation: Markedly reduced vesicular breath sounds with prolonged expiratory phase and diffuse polyphonic expiratory wheezing and coarse rhonchi bilaterally.",
      "abdomen": "Soft, non-tender, liver edge palpable 3 cm below right costal margin (displaced by flattened diaphragm, non-tender), normal bowel sounds.",
      "neuro": "Lethargic, drowsy, disoriented to time (CO2 Narcosis, GCS 12/15: E3V4M5), prominent flapping tremor (asterixis) on sustained wrist dorsiflexion, myoclonus, pupils normal.",
      "general": "Plethoric cyanotic facies, engorged conjunctival veins (carbon dioxide retention), nicotine staining on fingers, central cyanosis, mild bilateral pitting pedal edema.",
      "vitals": "Severe Hypercapnic Respiratory Failure: HR 116 bpm, BP 148/88 mmHg, RR 32/min, SpO2 80% on room air, Temp 37.8°C, GRBS 126 mg/dL.",
      "local": "Extremities: Grade 2 digital clubbing, warm peripheries with bounding pulses, bilateral ankle edema."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "Known COPD (GOLD Stage III, Severe) for 10 years, chronic bronchitis phenotype. Multiple prior admissions for acute exacerbations. Cor pulmonale.",
      "medications": "Inhaled Tiotropium 18 mcg OD, Inhaled Salmeterol/Fluticasone 50/250 mcg BD via DPI (irregular compliance).",
      "family": "Non-contributory.",
      "social": "Chronic heavy bidi smoker (40 pack-years), retired bus driver.",
      "surgical": "No past surgeries.",
      "presenting": "Caught a common cold 4 days ago; over the last 3 days developed worsening breathlessness (mMRC Grade 4, breathless while dressing), marked increase in sputum tenacity and purulence (Anthonisen Type 1 Exacerbation), and progressive daytime somnolence."
    },
    investigationsMap: {
      "abg": {
        resultText: "STAT Arterial Blood Gas (Room Air): pH 7.24 (7.35–7.45), PaCO2 72 mmHg (35–45, Acute-on-Chronic Hypercapnia), PaO2 46 mmHg (80–100, Severe Hypoxemia), HCO3 31.2 mEq/L (Compensatory metabolic alkalosis), Base Excess +6.2 mEq/L, SaO2 79% (Indicating immediate Non-Invasive Ventilation [BiPAP] requirement).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Hyperinflated lung fields with >10 posterior ribs visible, low flattened diaphragmatic domes, tubular elongated heart silhouette, increased bronchovascular markings at bases, no focal pneumonic consolidation or pneumothorax.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 116 bpm, P-pulmonale (tall peaked P waves >2.5mm in leads II, III, aVF), right axis deviation (+110 deg), and right ventricular hypertrophy with strain (Acute Cor Pulmonale).",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 17.2 g/dL (Secondary Polycythemia from chronic hypoxemia), Hematocrit 52.4%, Total WBC Count 13,800/mcL (82% Neutrophils), Platelet Count 220,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "sputum_gram": {
        resultText: "Sputum Gram Stain & Culture: Abundant polymorphonuclear leukocytes, Gram-negative coccobacilli (Haemophilus influenzae) isolated, sensitive to Amoxicillin-Clavulanate, Azithromycin, and Levofloxacin.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 38 mg/dL, Serum Creatinine 1.0 mg/dL, eGFR 74 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 138 mEq/L, Potassium 4.1 mEq/L, Chloride 94 mEq/L, Bicarbonate 31 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 1.1 mg/dL, AST 32 U/L, ALT 28 U/L, Albumin 3.8 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 12.8 sec, INR 1.04, aPTT 29.0 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "procalcitonin": {
        resultText: "Serum Procalcitonin: 0.82 ng/mL (Reference: <0.1 ng/mL) — Indicates bacterial infection triggering COPD exacerbation.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "serum_b12": {
        resultText: "Serum Vitamin B12: 420 pg/mL. Normal.",
        turnaroundMinutes: 45,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /controlled oxygen|venturi|target 88|target 92|24%|28%|low flow oxygen/i,
        name: "Controlled Target Oxygen Therapy via Venturi Mask (24%–28% FiO2 targeting SpO2 88%–92% — AVOID high-flow 100% O2 to prevent worsening CO2 retention / abolition of hypoxic drive)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /salbutamol|ipratropium|duolin|bronchodilator|nebulization|nebulisation/i,
        name: "Short-Acting Dual Bronchodilator Nebulization (Salbutamol 2.5mg + Ipratropium Bromide 0.5mg driven by medical air, not high-flow O2)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /hydrocortisone|prednisolone|methylprednisolone|systemic corticosteroid|steroid/i,
        name: "Systemic Corticosteroids (IV Hydrocortisone 100mg STAT or Oral Prednisolone 40mg OD for 5 days to reduce airway inflammation and treatment failure)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /bipap|niv|non-invasive ventilation|noninvasive ventilation/i,
        name: "STAT Non-Invasive Positive Pressure Ventilation (BiPAP/NIV: IPAP 12–15 cmH2O, EPAP 4–6 cmH2O for persistent respiratory acidosis pH < 7.35 and PaCO2 > 45 mmHg)",
        targetMilestoneMinutes: 20
      },
      {
        orderOrActionPattern: /amoxicillin|clavulanate|augmentin|azithromycin|doxycycline|antibiotic/i,
        name: "Targeted Antibiotic Therapy for Anthonisen Type 1 Exacerbation (Oral/IV Amoxicillin-Clavulanate 1.2g BD or Azithromycin 500mg OD for 5 days)",
        targetMilestoneMinutes: 20
      }
    ],
    incidentalPool: [
      {
        id: "inc_copd_1",
        title: "Secondary Polycythemia from Chronic Hypoxia",
        description: "Elevated hemoglobin (17.2 g/dL) and hematocrit (52.4%) represent chronic compensatory erythrocytosis.",
        correctAction: "Focus on long-term oxygen therapy (LTOT) optimization; phlebotomy is NOT indicated unless hematocrit > 56% with hyperviscosity symptoms.",
        status: "unnoticed"
      },
      {
        id: "inc_copd_2",
        title: "Inhaler Technique & Smoking Cessation Counseling",
        description: "Severe recurrent exacerbations driven by ongoing smoking and incorrect dry powder inhaler technique.",
        correctAction: "Prescribe smoking cessation pharmacotherapy (Varenicline / Nicotine Replacement) and demonstrate Metered Dose Inhaler with spacer chamber.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Elderly smoker presenting with acute worsening of dyspnea, increased purulent sputum, hypercapnic asterixis, and blood gas acidemia. Clinician must identify acute decompensation of chronic lung disease.",
        consequenceOnRight: "Acute decompensation with hypercapnic ventilatory insufficiency recognized immediately; controlled oxygen and NIV protocols initiated.",
        consequenceOnWrong: "Misdiagnosing as bronchial asthma and administering uncontrolled 100% high-flow oxygen precipitates fatal CO2 narcosis and coma."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Immediate Arterial Blood Gas (ABG) profiling, portable chest radiograph (excluding air leak and pneumonia), and sputum microbiological workup.",
        consequenceOnRight: "STAT ABG reveals decompensated acidemia (pH 7.24, PaCO2 72 mmHg), providing clear indication for BiPAP.",
        consequenceOnWrong: "Relying purely on pulse oximetry without checking arterial blood gases misses worsening dangerous hypercapnia."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Controlled oxygenation titrated strictly to SpO2 88–92% via Venturi mask and air-driven dual bronchodilator nebulization.",
        consequenceOnRight: "Targeted oxygen titration prevents worsening of ventilation-perfusion mismatch and Haldane effect.",
        consequenceOnWrong: "Applying unregulated high-flow non-rebreather mask causes acute elevation of PaCO2 to >95 mmHg."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Evidence-based triad of acute management: Non-Invasive Ventilation (BiPAP), systemic corticosteroids (5-day course), and targeted antibiotics.",
        consequenceOnRight: "BiPAP reduces work of breathing, clears CO2, and reduces need for endotracheal intubation by >60%.",
        consequenceOnWrong: "Omitting NIV in worsening respiratory acidemia leads to respiratory muscle exhaustion and invasive intubation."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Monitoring for NIV breakdown (worsening pH < 7.20, hemodynamic instability, refractory somnolence) requiring invasive mechanical ventilation.",
        consequenceOnRight: "Serial 1-hour repeat ABG demonstrates improving pH (7.32) and falling PaCO2 (58 mmHg), confirming successful non-invasive ventilation.",
        consequenceOnWrong: "Failing to check repeat blood gases allows unrecognized NIV breakdown to progress to cardiac arrest."
      }
    ]
  },
  {
    id: "scaffold_acute_kidney_injury",
    title: "Crush Injury, Dark Tea-Colored Urine, Hyperkalemia & T-Wave Tenting",
    conditionName: "Rhabdomyolysis with Acute Tubular Necrosis and Hyperkalemic Emergency",
    subject: "Medicine",
    system: "Nephrology/Trauma",
    demographics: {
      "name": "Suresh Pillai",
      "age": 42,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 42-year-old male is brought to the emergency department after being pinned under heavy concrete debris for 6 hours following a structural collapse. He complains of excruciating muscle pain, profound weakness, and passing a small volume of dark tea-colored (cola-colored) urine.",
    initialVitals: {
      "hr": 52,
      "bp": "100/64",
      "rr": 20,
      "spo2": 97,
      "temp": "38.1°C",
      "grbs": 110
},
    clinchingClue: "12-lead ECG shows sinus bradycardia (52 bpm), PR prolongation, loss of P waves, and tall peaked 'tented' T-waves in V2–V5; STAT Serum Potassium is 7.4 mEq/L (Critical Hyperkalemia) with Serum CPK >68,000 U/L and dipstick positive for blood without intact RBCs on microscopy (Myoglobinuria).",
    clinchingClueTimeMinutes: 5,
    examFindingsMap: {
      "cvs": "Sinus bradycardia 52 bpm, regular, heart sounds S1 S2 heard, no pericardial friction rub.",
      "chest": "Bilateral vesicular breath sounds, clear to auscultation, no crackles or rales.",
      "abdomen": "Soft, mild generalized tenderness, no peritoneal signs, normal bowel sounds.",
      "neuro": "Alert, oriented x3 (GCS 15/15), flaccid proximal muscle weakness in lower limbs (power 3/5 bilaterally), symmetrical hyporeflexia (1+ deep tendon reflexes) secondary to severe hyperkalemia.",
      "general": "Severe pain, mild fever (38.1°C), moderate dehydration, dry mucous membranes, no visible jaundice.",
      "vitals": "Hyperkalemic Bradycardia: HR 52 bpm, BP 100/64 mmHg, RR 20/min, SpO2 97% on room air, Temp 38.1°C, GRBS 110 mg/dL.",
      "local": "Bilateral lower limbs: Marked swelling, tense woody induration, exquisite tenderness on passive stretch of bilateral calves and thighs; distal pulses (dorsalis pedis) palpable, capillary refill 2.5 seconds. No open compound fractures."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "No prior history of chronic kidney disease, hypertension, or diabetes.",
      "medications": "Took Diclofenac 50mg tablet 2 hours ago given by rescue team for severe pain.",
      "family": "Non-contributory.",
      "social": "Manual laborer, non-smoker, occasional alcohol.",
      "surgical": "No past surgical operations.",
      "presenting": "Trapped under collapsed concrete slab for 6 hours; extricated 1 hour ago. Passing scant cola-colored urine accompanied by severe muscle swelling, cramps, and generalized lethargy."
    },
    investigationsMap: {
      "ecg": {
        resultText: "12-Lead ECG: Sinus bradycardia at 52 bpm, tall symmetrical peaked/tented T waves with narrow base across leads V2–V6, widened QRS complex (130 ms), flattened P waves, and prolonged PR interval (240 ms) — Life-Threatening Hyperkalemic Conduction Toxicity.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "STAT Serum Electrolytes: Potassium 7.4 mEq/L (Reference: 3.5–5.0 mEq/L, Critical Emergency), Sodium 132 mEq/L, Chloride 96 mEq/L, Bicarbonate 15 mEq/L, Serum Calcium 7.2 mg/dL (Hypocalcemia), Serum Phosphate 6.8 mg/dL (Hyperphosphatemia), Serum Magnesium 2.8 mg/dL.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 88 mg/dL, Serum Creatinine 4.8 mg/dL (Severe Acute Tubular Necrosis, KDIGO Stage 3 AKI), Serum Uric Acid 11.4 mg/dL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "cpk": {
        resultText: "STAT Total Serum Creatine Kinase (CPK): 68,400 U/L (Reference: 30–200 U/L) — Massive Rhabdomyolysis.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "urine_myoglobin": {
        resultText: "Urinalysis: Dark brown/tea-colored appearance, Dipstick strongly positive 4+ for 'blood/hemoglobin', Urine Microscopy: Only 0–1 RBC/HPF with pigmented brown granular heme casts (Confirms true Myoglobinuria / Orthotolidine false-positive for RBCs).",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas: pH 7.28, PaCO2 31 mmHg, PaO2 92 mmHg, HCO3 14.6 mEq/L, Base Excess -10.4 mEq/L, SaO2 97%, Blood Lactate 3.1 mmol/L.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 14.6 g/dL, Total WBC Count 16,800/mcL (Neutrophilia), Platelet Count 210,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 13.4 sec, INR 1.10, aPTT 31.0 sec, D-Dimer 1,400 ng/mL.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "usg_kub": {
        resultText: "Ultrasound KUB: Bilateral kidneys enlarged (Right 12.8 cm, Left 13.1 cm) with diffuse increased cortical echogenicity consistent with acute medical renal disease (ATN); no hydronephrosis or renal calculi.",
        turnaroundMinutes: 20,
        category: "imaging",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 1.2 mg/dL, AST 380 U/L (Elevated from muscle release), ALT 160 U/L, Albumin 3.9 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Clear lung fields, normal cardiac silhouette.",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "serum_tsh": {
        resultText: "Serum TSH: 1.6 mIU/L. Normal.",
        turnaroundMinutes: 40,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /calcium gluconate|calcium chloride|cardiac membrane/i,
        name: "STAT IV Calcium Gluconate 10% (10 mL infused IV over 3–5 minutes with continuous ECG monitoring for Cardiac Membrane Stabilization — repeat in 5 min if ECG unchanged)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /insulin|dextrose|regular insulin|glucose-insulin|insulin-dextrose/i,
        name: "STAT Intracellular Potassium Shifting: IV Regular Insulin 10 Units in 50 mL 50% Dextrose (or 100 mL 20% Dextrose) infused over 15–30 minutes",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /salbutamol|albuterol|nebulization|nebulisation/i,
        name: "Adjunctive Potassium Shifting: High-Dose Nebulized Salbutamol (10–20 mg in 4 mL normal saline nebulized over 15 minutes)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /normal saline|isotonic saline|crystalloid|aggressive hydration|saline diuresis|200-300 ml\/hr/i,
        name: "Vigorous Isotonic Saline Volume Resuscitation (0.9% Normal Saline 200–300 mL/hr targeting urine output 200–300 mL/hr to flush obstructing tubular myoglobin casts)",
        targetMilestoneMinutes: 15
      },
      {
        orderOrActionPattern: /dialysis|hemodialysis|nephrology consult|emergency dialysis|sled|crrt/i,
        name: "STAT Nephrology Consultation for Emergency Hemodialysis / Renal Replacement Therapy for Refractory Hyperkalemia, Severe Acidosis & Anuric AKI",
        targetMilestoneMinutes: 30
      }
    ],
    incidentalPool: [
      {
        id: "inc_aki_1",
        title: "NSAID Nephrotoxicity Absolute Contraindication",
        description: "Patient was administered Diclofenac during extrication.",
        correctAction: "Immediately stop and strictly avoid all NSAIDs and nephrotoxic agents; NSAID-induced renal vasoconstriction synergistically accelerates myoglobinuric acute tubular necrosis.",
        status: "unnoticed"
      },
      {
        id: "inc_aki_2",
        title: "Early Hypocalcemia Management Rule in Rhabdomyolysis",
        description: "Calcium binds to injured necrotic muscle tissue (dystrophic calcification) during early phase.",
        correctAction: "Avoid excessive calcium administration unless life-threatening hyperkalemic ECG changes or severe tetany occur; exogenous calcium causes rebound severe hypercalcemia during recovery phase.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Patient rescued from prolonged compressive trauma presenting with dark tea-colored urine, profound myalgias, acute renal failure, and tented T waves. Clinician must identify muscle breakdown and electrolyte toxicity.",
        consequenceOnRight: "Massive muscle breakdown and life-threatening high potassium recognized instantly; emergency cardiac membrane stabilization initiated.",
        consequenceOnWrong: "Misattributing presentation to isolated musculoskeletal trauma without checking ECG/potassium results in sudden fatal asystole or ventricular fibrillation."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Priority diagnostic tests: 12-lead ECG, STAT serum electrolytes, serum CPK, renal function, and urinalysis (differentiating hemoglobinuria vs myoglobinuria).",
        consequenceOnRight: "ECG confirms advanced conduction toxicity; CPK >60,000 U/L confirms massive muscle lysis.",
        consequenceOnWrong: "Delaying treatment while awaiting complex laboratory tests increases risk of sudden cardiac arrest."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Tiered Hyperkalemia Protocol: Immediate IV Calcium Gluconate (membrane stabilization), followed by Insulin + Dextrose and Nebulized Salbutamol (intracellular shift).",
        consequenceOnRight: "Calcium gluconate normalizes cardiac membrane excitability within 3 minutes; insulin/salbutamol lower serum potassium safely.",
        consequenceOnWrong: "Administering potassium-shifting agents without first stabilizing cardiac membrane with Calcium Gluconate leaves myocardium vulnerable to fatal arrhythmia."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Aggressive isotonic crystalloid fluid resuscitation (200–300 mL/hr) to maintain high urine output and urgent renal replacement indication evaluation.",
        consequenceOnRight: "High-volume saline hydration flushes renal tubules, preventing obstructing cast deposition and promoting recovery.",
        consequenceOnWrong: "Fluid restriction in severe muscle lysis causes irreversible extensive cortical loss."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Surveillance for Compartment Syndrome in compressed extremities, rebound hypercalcemia in diuretic phase, and fluid overload during anuria.",
        consequenceOnRight: "Compartment pressures monitored; early fasciotomy performed if intracompartmental pressure > 30 mmHg.",
        consequenceOnWrong: "Overlooked compartment syndrome results in ischemic muscle loss, Volkmann contracture, and limb amputation."
      }
    ]
  },
  {
    id: "scaffold_op_poisoning",
    title: "Garlic Odor, Pinpoint Pupils, Fasciculations, Wheezing & Bradycardia",
    conditionName: "Acute Organophosphate Insecticide Poisoning",
    subject: "Medicine",
    system: "Toxicology",
    demographics: {
      "name": "Ramu Gowda",
      "age": 29,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 29-year-old agricultural worker is brought to the emergency department in acute respiratory failure with profuse salivation, pinpoint pupils, muscle twitching, vomiting, diarrhea, and a pungent garlic-like chemical odor 2 hours after spraying organophosphate insecticide without protective gear.",
    initialVitals: {
      "hr": 42,
      "bp": "90/58",
      "rr": 32,
      "spo2": 84,
      "temp": "36.4°C",
      "grbs": 112
},
    clinchingClue: "Classic cholinergic toxidrome (DUMBBELLS / SLUDGE): Extreme miosis (pinpoint 1 mm non-reactive pupils), severe bronchorrhea and bronchospasm (drowning in secretions), profuse lacrimation, salivation, muscle fasciculations, severe sinus bradycardia (42 bpm), and >85% inhibition of plasma pseudocholinesterase.",
    clinchingClueTimeMinutes: 5,
    examFindingsMap: {
      "cvs": "Severe sinus bradycardia 42 bpm, weak pulses, normal heart sounds S1 S2.",
      "chest": "Severe respiratory distress: Audible gurgling stridor, frothy secretions pouring from mouth and nose; auscultation reveals diffuse coarse 'wet' crackles / bubbling rales throughout all lung zones and widespread expiratory wheezing (Massive Bronchorrhea and Bronchoconstriction).",
      "abdomen": "Hyperactive loud borborygmi/bowel sounds, involuntary defecation (fecal incontinence), soft non-tender, no organomegaly.",
      "neuro": "Stuporous (GCS 9/15: E2V2M5), pinpoint pupils (1 mm bilateral, non-reactive to light), diffuse fine muscle fasciculations visible over tongue, pectoralis, and calves (Nicotinic receptor overstimulation).",
      "general": "Patient and clothing soaked in sweat and pesticide, pungent kerosene/garlic odor, intense lacrimation and sialorrhea, cold clammy skin.",
      "vitals": "Cholinergic Crisis / Severe Hypoxemia: HR 42 bpm, BP 90/58 mmHg, RR 32/min, SpO2 84% on room air, Temp 36.4°C, GRBS 112 mg/dL.",
      "local": "Skin: Extensive chemical saturation of clothing and cutaneous surfaces over torso and upper extremities."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "No previous medical illnesses or psychiatric history.",
      "medications": "None.",
      "family": "Non-contributory.",
      "social": "Farmer, works in paddy fields, non-smoker.",
      "surgical": "No past surgical operations.",
      "presenting": "Was spraying Chlorpyrifos/Monocrotophos insecticide in agricultural field for 4 hours without face mask or gloves on a windy day; developed sudden dizziness, blurred vision, intense nausea, foaming at mouth, and collapsed."
    },
    investigationsMap: {
      "plasma_cholinesterase": {
        resultText: "STAT Serum Butyrylcholinesterase (Pseudocholinesterase): 720 U/L (Reference: 4,900–11,900 U/L) — >85% Enzyme Inhibition (Diagnostic for Severe Organophosphate Toxicity).",
        turnaroundMinutes: 30,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas (Room Air): pH 7.27, PaCO2 48 mmHg, PaO2 52 mmHg, HCO3 21 mEq/L, SaO2 84%, Blood Lactate 3.6 mmol/L (Severe hypoxemic and hypercapnic respiratory failure secondary to bronchorrhea).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus bradycardia at 42 bpm, prolonged QTc interval (510 ms), no ST elevations.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "cxr": {
        resultText: "Portable Chest X-ray: Diffuse bilateral perihilar pulmonary opacities / wet lungs (Severe pulmonary edema / bronchorrhea).",
        turnaroundMinutes: 15,
        category: "imaging",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 14.0 g/dL, Total WBC Count 12,400/mcL, Platelet Count 240,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 32 mg/dL, Serum Creatinine 1.0 mg/dL, eGFR >90 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 138 mEq/L, Potassium 4.0 mEq/L, Chloride 100 mEq/L, Bicarbonate 21 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.8 mg/dL, AST 38 U/L, ALT 34 U/L, Albumin 4.0 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: PT 12.4 sec, INR 1.01, aPTT 28.2 sec.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "serum_amylase": {
        resultText: "Serum Amylase: 110 U/L (Reference: 28–100 U/L). Mild cholinergic salivary/pancreatic stimulation.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "serum_psa": {
        resultText: "Prostate Specific Antigen: Not applicable. (Unindicated test).",
        turnaroundMinutes: 45,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /decontamination|remove clothes|wash skin|ppe|protective gear/i,
        name: "Immediate Dermal Decontamination (Staff in PPE: Completely strip all contaminated clothing and wash patient body with copious soap and water to halt ongoing transdermal absorption)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /airway|suction|oxygen|nrbm|intubation/i,
        name: "Aggressive Airway Suctioning & High-Flow Oxygenation (Mandatory pre-oxygenation prior to atropinization to prevent ventricular fibrillation from atropine-induced tachycardia in hypoxic myocardium)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /atropine|iv atropine|atropinization|atropine bolus/i,
        name: "STAT Titrated IV Atropine Therapy (Initial bolus 2–4 mg IV, double dose every 5 minutes [e.g. 2mg -> 4mg -> 8mg -> 16mg] until full Atropinization achieved: Clear chest on auscultation, dry axillae, HR > 80 bpm, Systolic BP > 80 mmHg — DO NOT use pupil size as sole endpoint)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /pralidoxime|pam|2-pam|oxime|cholinesterase reactivator/i,
        name: "Cholinesterase Reactivator: IV Pralidoxime (2-PAM 2g IV loading dose infused over 30 minutes, followed by continuous infusion of 500 mg/hr for 24–48 hours) to reactivate enzyme before aging",
        targetMilestoneMinutes: 20
      }
    ],
    incidentalPool: [
      {
        id: "inc_op_1",
        title: "Healthcare Worker Secondary Contamination Precaution",
        description: "Volatile organophosphate pesticide vapors from clothing and vomitus can poison healthcare workers via inhalation and dermal contact.",
        correctAction: "Decontaminate in designated isolated area; emergency staff must wear nitrile gloves, gowns, and face shields.",
        status: "unnoticed"
      },
      {
        id: "inc_op_2",
        title: "Atropinization Endpoint Recognition Rule",
        description: "Pupil dilation often lags behind cardiopulmonary drying; relying purely on mydriasis leads to dangerous Atropine toxicity.",
        correctAction: "Primary clinical endpoints of atropinization are: 1. Resolution of bronchorrhea and clear chest sounds, 2. Dry skin/axillae, 3. HR > 80 bpm.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Agricultural worker presenting with acute ventilatory compromise, copious frothy secretions, garlic odor, pinpoint pupils, muscle twitches, and bradycardia. Clinician must identify acute toxic cholinergic crisis.",
        consequenceOnRight: "Acute cholinergic crisis identified instantly; decontamination and antidotal atropinization protocol activated.",
        consequenceOnWrong: "Misdiagnosing presentation as acute pulmonary edema or opioid overdose delays crucial atropinization, resulting in fatal asphyxiation."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Understanding that acute cholinergic crisis is an immediate clinical diagnosis; confirming with Plasma Pseudocholinesterase level while continuously assessing oxygenation and airway secretions.",
        consequenceOnRight: "Antidote given immediately without waiting for lab confirmation; pseudocholinesterase verifies severe enzyme inhibition.",
        consequenceOnWrong: "Delaying atropine while awaiting blood gas or cholinesterase results causes fatal respiratory arrest."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Dual immediate priorities: PPE-guided dermal decontamination and rapid escalating IV Atropine titration (doubling doses) until bronchorrhea clears.",
        consequenceOnRight: "Escalating atropine doses rapidly dry copious tracheobronchial secretions, restoring lung compliance and oxygenation.",
        consequenceOnWrong: "Giving fixed small doses of atropine (e.g. 0.6mg) in severe crisis fails to reverse life-threatening bronchorrhea."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Pralidoxime (2-PAM) administration to reactivate phosphorylated acetylcholinesterase before irreversible enzyme aging occurs.",
        consequenceOnRight: "Pralidoxime loading and maintenance infusion reverse nicotinic neuromuscular weakness and fasciculations.",
        consequenceOnWrong: "Withholding oximes allows covalent enzyme aging, leading to prolonged ventilator dependence."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Surveillance for Intermediate Syndrome (Type II paralysis of ventilatory and proximal neck muscles occurring 24–96 hours post-exposure) and delayed neurotoxicity.",
        consequenceOnRight: "Serial neck flexion strength and vital capacity monitoring detect early Intermediate Syndrome; elective intubation performed safely.",
        consequenceOnWrong: "Failure to monitor for Intermediate Syndrome leads to sudden unmonitored respiratory arrest on Day 3 in general ward."
      }
    ]
  },
  {
    id: "scaffold_flail_chest_hemothorax",
    title: "Blunt Chest Trauma, Paradoxical Chest Motion, Dullness & Shock",
    conditionName: "Traumatic Flail Chest with Massive Hemothorax",
    subject: "Surgery",
    system: "Trauma",
    demographics: {
      "name": "Mohan Lal",
      "age": 36,
      "gender": "Male",
      "setting": "Emergency"
},
    openingVignette: "A 36-year-old driver presents 30 minutes after a high-speed frontal vehicular collision with steering wheel impact to the anterior chest. He is in severe respiratory distress with paradoxical inward movement of the left chest wall during inspiration, stony dullness over the left hemithorax, and hemorrhagic shock.",
    initialVitals: {
      "hr": 126,
      "bp": "84/52",
      "rr": 34,
      "spo2": 83,
      "temp": "36.2°C",
      "grbs": 118
},
    clinchingClue: "Paradoxical chest wall movement (segment of left anterolateral 4th–7th ribs moves inward on inspiration and outward on expiration) combined with stony dull percussion note, completely absent breath sounds, and STAT portable CXR / e-FAST demonstrating massive fluid accumulation in the left pleural space (>1,500 mL blood).",
    clinchingClueTimeMinutes: 10,
    examFindingsMap: {
      "cvs": "Tachycardia 126 bpm, weak thready pulses, flat/collapsed neck veins (severe hypovolemic hemorrhagic shock), heart sounds distant.",
      "chest": "Inspection: Paradoxical breathing — a large flail segment involving the left 4th to 7th ribs moves inwards during inspiration and outwards during expiration. Palpation: Severe bony crepitus and step-off deformity over left anterolateral ribs; trachea shifted slightly to the right. Percussion: Stony dull percussion note over lower two-thirds of left hemithorax. Auscultation: Breath sounds completely absent over left middle and lower lung fields; coarse crackles in right lung (contrecoup contusion).",
      "abdomen": "Soft, mild upper abdominal guarding, e-FAST negative for free fluid in Morison's pouch and splenorenal recess, bowel sounds present.",
      "neuro": "Agitated, hypoxic, in severe pain (GCS 14/15: E4V4M6), pupils equal and reactive.",
      "general": "Severe pallor, cold clammy extremities, diaphoretic, splinting left chest with extreme dyspnea and air hunger.",
      "vitals": "Hemorrhagic Shock / Flail Chest Hypoxemia: HR 126 bpm, BP 84/52 mmHg (MAP 62 mmHg), RR 34/min, SpO2 83% on room air, Temp 36.2°C, GRBS 118 mg/dL.",
      "local": "Chest Wall: Extensive seatbelt sign contusion and ecchymosis across anterior thorax, multiple segmental left rib fractures with palpable bony crepitus."
    },
    historyMap: {
      "allergies": "No known drug allergies.",
      "past": "No chronic medical illnesses, previous surgeries, or bleeding diathesis.",
      "medications": "None.",
      "family": "Non-contributory.",
      "social": "Commercial truck driver, non-smoker, non-alcoholic.",
      "surgical": "No past surgical operations.",
      "presenting": "Sustained high-velocity frontal collision 30 minutes ago without airbag deployment; direct impact of chest onto steering column resulting in immediate excruciating left chest pain, inability to breathe, and dizziness."
    },
    investigationsMap: {
      "cxr": {
        resultText: "Portable Chest X-ray (Supine Trauma AP): Segmental fractures of left 4th, 5th, 6th, and 7th ribs in two places each (Flail Chest), dense homogenous opacification of left hemithorax with meniscus sign obscuring left hemidiaphragm and costophrenic angle (Massive Left Hemothorax >1,500 mL). Left pulmonary contusion.",
        turnaroundMinutes: 10,
        category: "imaging",
        isIndicative: true
      },
      "e_fast": {
        resultText: "Bedside e-FAST Ultrasound: Left thoracic window demonstrates large anechoic/hypoechoic pleural fluid collection (Hemothorax) with collapsed left lower lobe. Pericardial space, right pleural space, and peritoneal recesses are clear.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "blood_grouping": {
        resultText: "STAT Blood Grouping & Cross-Match: O Rh Positive. STAT 4 units uncrossed PRBC and 2 units FFP issued under High-Ratio Transfusion Protocol.",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "cbc": {
        resultText: "Complete Blood Count: Hemoglobin 8.4 g/dL (Acute Traumatic Hemorrhage), Hematocrit 25.8%, Total WBC Count 14,200/mcL, Platelet Count 210,000/mcL.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "abg": {
        resultText: "Arterial Blood Gas (Room Air): pH 7.26, PaCO2 48 mmHg, PaO2 48 mmHg, HCO3 20 mEq/L, SaO2 82%, Blood Lactate 4.8 mmol/L (Severe mixed hypoxemic/hypercapnic respiratory failure and lactic acidosis).",
        turnaroundMinutes: 10,
        category: "labs",
        isIndicative: true
      },
      "coagulation": {
        resultText: "Coagulation Profile: Prothrombin Time (PT) 14.8 sec, INR 1.24, aPTT 35.2 sec, Fibrinogen 220 mg/dL.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "kft": {
        resultText: "Kidney Function Tests: Blood Urea 30 mg/dL, Serum Creatinine 1.0 mg/dL, eGFR >90 mL/min/1.73m2.",
        turnaroundMinutes: 20,
        category: "labs",
        isIndicative: true
      },
      "electrolytes": {
        resultText: "Serum Electrolytes: Sodium 138 mEq/L, Potassium 4.2 mEq/L, Chloride 101 mEq/L, Bicarbonate 20 mEq/L.",
        turnaroundMinutes: 15,
        category: "labs",
        isIndicative: true
      },
      "lft": {
        resultText: "Liver Function Tests: Total Bilirubin 0.8 mg/dL, AST 42 U/L, ALT 36 U/L, Albumin 4.0 g/dL.",
        turnaroundMinutes: 25,
        category: "labs",
        isIndicative: true
      },
      "ecg": {
        resultText: "12-Lead ECG: Sinus tachycardia at 126 bpm, no ST-elevation or myocardial contusion pattern.",
        turnaroundMinutes: 5,
        category: "imaging",
        isIndicative: true
      },
      "serum_ferritin": {
        resultText: "Serum Ferritin: 110 ng/mL. Normal.",
        turnaroundMinutes: 40,
        category: "labs",
        isIndicative: false
      }
    },
    criticalInterventions: [
      {
        orderOrActionPattern: /oxygen|high flow|nrbm|intubation|mechanical ventilation|positive pressure/i,
        name: "High-Flow Supplemental Oxygen (15 L/min NRBM) & Internal Pneumatic Stabilization (Endotracheal Intubation with Positive Pressure Ventilation for severe flail chest mechanics)",
        targetMilestoneMinutes: 5
      },
      {
        orderOrActionPattern: /chest tube|tube thoracostomy|icd|intercostal drain|28 fr|32 fr/i,
        name: "Emergency Left Tube Thoracostomy / Large-Bore Chest Tube Insertion (28–32 Fr at 5th ICS anterior axillary line connected to underwater seal with autotransfusion if available)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /blood transfusion|prbc|massive transfusion|warmed fluids|resuscitation/i,
        name: "Aggressive Hemostatic Resuscitation (STAT Warmed Blood Transfusion + 1:1:1 PRBC:FFP:Platelets under High-Ratio Transfusion Protocol)",
        targetMilestoneMinutes: 10
      },
      {
        orderOrActionPattern: /thoracotomy|ctvs|emergency surgery|theatre|surgical exploration/i,
        name: "STAT Cardiothoracic Surgical Consultation for Emergency Thoracotomy (Indicated if immediate chest tube drainage > 1,500 mL blood or ongoing bleeding > 200 mL/hr for 3–4 consecutive hours)",
        targetMilestoneMinutes: 20
      },
      {
        orderOrActionPattern: /fentanyl|epidural|thoracic epidural|paravertebral block|intercostal block|analgesia/i,
        name: "Aggressive Multimodal Analgesia (IV Fentanyl / Regional Thoracic Epidural / Paravertebral Block to prevent atelectasis and pneumonia)",
        targetMilestoneMinutes: 15
      }
    ],
    incidentalPool: [
      {
        id: "inc_flail_1",
        title: "Emergency Thoracotomy Output Threshold Rule",
        description: "Massive ongoing hemothorax from intercostal or internal mammary vessel laceration.",
        correctAction: "Immediate exploratory thoracotomy is mandatory if initial chest tube output exceeds 1,500 mL or continuous output > 200 mL/hr for 3–4 consecutive hours.",
        status: "unnoticed"
      },
      {
        id: "inc_flail_2",
        title: "Fluid Overload Pulmonary Contusion Hazard",
        description: "Contused lung parenchyma is extremely sensitive to capillary leak and alveolar flooding.",
        correctAction: "Carefully titrate crystalloids to maintain mean arterial pressure of 65 mmHg; avoid aggressive fluid over-resuscitation.",
        status: "unnoticed"
      }
    ],
    gateMilestones: [
      {
        roleTag: "DIAGNOSIS",
        patientContext: "Blunt impact trauma victim presenting with paradoxical respiratory motion of left ribcage, dullness, absent breath sounds, and hemorrhagic shock. Clinician must identify major thoracic structural disruption.",
        consequenceOnRight: "Thoracic cage disruption and pleural bleeding diagnosed instantly; primary trauma resuscitation protocol activated.",
        consequenceOnWrong: "Failing to recognize paradoxical mechanics and pleural blood leads to severe hypoxia, respiratory arrest, and exsanguination."
      },
      {
        roleTag: "INVESTIGATION",
        patientContext: "Emergency ATLS adjuncts: Bedside e-FAST, STAT portable trauma CXR, arterial blood gas, and blood typing & cross-match.",
        consequenceOnRight: "e-FAST and CXR confirm large left pleural fluid and multi-segmental rib fractures without pneumoperitoneum.",
        consequenceOnWrong: "Sending an unstable polytrauma patient to the CT scanner before tube decompression leads to fatal arrest."
      },
      {
        roleTag: "EMERGENCY",
        patientContext: "Large-bore pleural tube insertion (28–32 Fr) for immediate lung re-expansion and drainage, plus internal pneumatic stabilization with positive pressure ventilation.",
        consequenceOnRight: "Tube thoracostomy immediately drains 1,600 mL of dark blood, relieving lung compression and allowing accurate measurement of blood loss.",
        consequenceOnWrong: "Delaying drainage results in fibrothorax, persistent shock, and irreversible lung collapse."
      },
      {
        roleTag: "MANAGEMENT",
        patientContext: "Activation of High-Ratio Transfusion Protocol and evaluating absolute criteria for Emergency Surgical Thoracotomy.",
        consequenceOnRight: "Immediate evacuation of >1,500 mL triggers emergency thoracotomy; bleeding internal mammary artery clipped successfully.",
        consequenceOnWrong: "Ignoring massive hourly tube output leads to fatal exsanguination on the resuscitation stretcher."
      },
      {
        roleTag: "COMPLICATION",
        patientContext: "Management of underlying pulmonary contusion, acute respiratory distress syndrome (ARDS), and severe pain-induced hypoventilation.",
        consequenceOnRight: "Regional analgesia (paravertebral block) and lung-protective ventilation prevent pneumonia and chronic deformity.",
        consequenceOnWrong: "Inadequate analgesia causes splinting, severe sputum retention, and fatal ventilator-associated pneumonia."
      }
    ]
  }
];
