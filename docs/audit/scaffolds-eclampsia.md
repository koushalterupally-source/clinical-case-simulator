# Audit: scaffolds.ts — Case 3, `scaffold_eclampsia` (Eclampsia / Severe Preeclampsia)

**Severity: NONE (no definite errors found).** One debatable game-mechanic note.

## What was checked
26F primigravida 34 weeks, post-GTC-seizure, BP174/112, 3+ proteinuria, hyperreflexia/clonus. All pregnancy-specific reference ranges used correctly and distinctly from non-pregnant adult ranges:
- Serum creatinine reference "0.4–0.8 mg/dL in pregnancy" — correct (pregnancy GFR rises, normal creatinine falls versus non-pregnant ~0.6–1.2).
- Serum uric acid reference "2.5–5.5 mg/dL in pregnancy" — correct, elevated relative to non-pregnant, consistent with preeclampsia.
- Fibrinogen reference "300–600 mg/dL in pregnancy" — correct, pregnancy is a hyperfibrinogenemic state versus non-pregnant ~200–400 mg/dL.
- LFT/HELLP panel (AST142, ALT128, LDH780) and platelets 88,000 are internally consistent with HELLP syndrome.
- Fetal USG: EFW 1.8 kg at 33 weeks with oligohydramnios and reversed end-diastolic umbilical artery flow — consistent with placental insufficiency from severe preeclampsia, appropriately urgent finding.

Therapies:
- Magnesium sulfate loading 4–6 g IV over 15–20 min — correct standard dosing (Pritchard/Zuspan regimens), correctly cited as superior to diazepam/phenytoin (MAGPIE trial) for seizure prophylaxis/recurrence prevention.
- Antihypertensive target "BP below 160/110, diastolic 90–100 mmHg" — matches current ACOG guidance exactly (treat severe-range ≥160/110; avoid over-aggressive lowering that risks uteroplacental hypoperfusion).
- Delivery planning ("prompt delivery regardless of gestational age" once stabilised) — correct definitive management principle for eclampsia/severe preeclampsia with fetal compromise.

## Debatable note (not a definite error)
- `alternative_anticonvulsant` (diazepam/phenytoin/lorazepam/levetiracetam used instead of MgSO4) is graded **harmful** with `vitalsEffect: { hr: 5 }`. Clinically these drugs are *inferior*, not directly harmful, and their failure mode (recurrent seizures) would more plausibly show as ongoing seizure activity/hypoxia rather than a simple +5 bpm tachycardia; benzodiazepines if anything tend to sedate/lower heart rate. This is a defensible game-mechanic simplification (the "harm" being modelled is failure to prevent recurrence, not a direct drug effect) rather than a clinical fact stated wrongly, so it is not flagged as a definite error.

## Sources consulted
- ACOG Practice Bulletin on gestational hypertension/preeclampsia (BP treatment target, delivery timing); MAGPIE trial (magnesium sulfate vs. alternatives) — domain knowledge, values unambiguous and well established; no web search needed.
