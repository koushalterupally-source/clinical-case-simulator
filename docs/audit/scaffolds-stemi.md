# Audit: scaffolds.ts — Case 1, `scaffold_stemi` (Acute Anterior Wall STEMI)

**Severity: NONE (no definite errors found).** One minor/debatable observation.

## What was checked
54M, T2DM x8y, 90 min crushing chest pain, HR110 BP140/90 RR22 SpO2 94% GRBS186. ECG 4mm STE V1-V4 with reciprocal inferior depression (anterior STEMI, correct pairing). Troponin/CK-MB, CBC, KFT, LFT, ABG, lipid panel, HbA1c, coag, urinalysis reference ranges all standard adult values and internally consistent.

Therapies: aspirin 325mg chewed (indicated, correct — non-enteric, chewed, given immediately, never waits for troponin), P2Y12 inhibitor (indicated), heparin (indicated), high-intensity statin atorvastatin 80mg (indicated, correct per ACC/AHA regardless of baseline LDL), primary PCI (indicated, door-to-balloon reasoning correct), thrombolysis as PCI alternative (indicated, correctly says angiography should still follow), oxygen marked **neutral** (correct per current AHA/ESC guidance — no benefit when SpO2 ≥90%, matches this patient's 94%), nitroglycerin marked **neutral** (correct — symptom relief only, no mortality benefit, correctly flags hypotension/RV-infarct caution), IV metoprolol marked **harmful** (correct — this patient has an S4 gallop and bibasal crepitations, i.e. signs of heart failure/risk of cardiogenic shock, in which early IV beta-blockade is guideline-discouraged per COMMIT trial and ACC/AHA STEMI guidelines).

Sequencing (`requiresFirst`), `criticalInterventions` (DAPT by 20 min, reperfusion by 60 min) and gate milestones are all clinically coherent.

## Minor/debatable note (not a definite error)
- ABG "on Room Air": PaO2 84 mmHg paired with SpO2 94% (from the pulse oximeter concurrently). By the oxyhemoglobin dissociation curve, an SpO2 of 94% typically corresponds to a PaO2 closer to 70–75 mmHg, not 84. This is a small internal-consistency mismatch between two numbers in the same case, not a wrong reference range or wrong fact taught — flagging as debatable/minor since ABG and pulse-ox timing can differ in reality and the case does not hinge any scoring on this discrepancy.

## Sources consulted
- Domain knowledge of ACC/AHA 2013 STEMI guideline and ESC 2023 ACS guideline (oxygen therapy only if SpO2 <90%, high-intensity statin regardless of baseline LDL, early IV beta-blocker contraindicated with heart-failure signs); COMMIT/CCS-2 trial (IV metoprolol and cardiogenic shock risk). No web search needed — values were unambiguous and consistent with well-established, undisputed teaching.
