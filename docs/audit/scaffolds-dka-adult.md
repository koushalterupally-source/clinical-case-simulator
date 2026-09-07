# Audit: scaffolds.ts — Case 2, `scaffold_dka` (adult Diabetic Ketoacidosis)

**Severity: NONE (no definite errors found).**

Note: this is a distinct, separate adult (21M) DKA case from `pediatricDka` (which was already audited and skipped). It needed its own check because adult and paediatric DKA dosing/fluid protocols differ, and this one is correctly built as an adult case throughout.

## What was checked
21M, T1DM x3y with 3 days of missed insulin, HR128 BP92/58 RR32(Kussmaul) SpO2 97% GRBS480, temp37.8. Vitals/exam cohere with DKA (weak peripheral pulses, dry mucous membranes, Kussmaul breathing, acetone breath).

- ABG pH 7.12, HCO3 8, anion gap 24 — correct HAGMA, internally consistent with severe DKA.
- Corrected Na: measured 130, glucose 480 → corrected Na = 130 + 1.6×(480−100)/100 = 130 + 6.1 ≈ 136 mEq/L. Case states "corrected 136 mEq/L" — arithmetic checks out exactly.
- Serum osmolality 312 mOsm/kg vs. calculated 2×130 + 480/18 + 54/2.8 ≈ 306 — close enough given differing formula conventions; reference range 275–295 mOsm/kg is standard adult.
- Serum ketones (beta-hydroxybutyrate) reference <0.5 mmol/L is correct; urine vs. serum ketones are correctly modelled as two different tests that must not collide (serum tracks resolution, urine/acetoacetate lags — correct and clinically important teaching point, matches ADA guidance).
- Insulin: "IV Regular Insulin infusion at 0.1 units/kg/hr" — correct standard adult ADA/ISPAD dosing.
- `requiresFirst: ['iv_fluids']` on insulin, with a harmful-sequence penalty for insulin-before-fluids (worsening hypotension) — correct and is explicitly the classic teaching trap named in the file's own header comment.
- Potassium replacement rationale: "withheld if K+ >5.2 mEq/L, given before insulin if K+ <3.3 mEq/L" — matches standard ADA algorithm (hold insulin/give K+ first if K+<3.3; add K+ to fluids and continue insulin if K+ 3.3–5.2; withhold K+ if K+>5.2 and recheck q2h).
- Dextrose 5% added "once glucose approached 250 mg/dL" while continuing insulin — correct (ADA: switch to dextrose-containing fluid at glucose ≈200–250 mg/dL, keep insulin running to clear ketosis).
- Sodium bicarbonate marked **harmful**, reserved for pH <~6.9–7.0; this patient's pH is 7.12 — correctly not indicated, correct rationale (paradoxical CNS acidosis, worsened hypokalaemia).

All reference ranges (glucose, electrolytes, renal function, CBC) are standard adult values and match the patient's age/sex.

## Sources consulted
- ADA/Kitabchi DKA management consensus (fluid-before-insulin sequencing, 0.1 U/kg/hr insulin dosing, potassium algorithm, dextrose transition point, bicarbonate threshold) — well-established teaching, cross-checked against domain knowledge; no web search needed given unambiguous, undisputed values.
