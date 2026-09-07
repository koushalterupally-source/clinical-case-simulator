# Audit: malnutrition.ts

**Severity: NONE (no definite errors found).** One minor/debatable note.

## What was checked
22-month-old girl, MUAC 10.2 cm, weight-for-height Z-score <-3, HR168 BP70/40 RR44 SpO2 93% Temp35.4 GRBS42 — coherent severe acute malnutrition (SAM) with shock/hypoglycaemia/hypothermia triad.

- MUAC reference "≥12.5 cm" for normal, 10.2 cm here — correctly below the WHO severe-wasting MUAC cutoff (<11.5 cm).
- Weight-for-height Z-score <-3 SD — correct WHO SAM definition.
- GRBS 42 mg/dL for hypoglycaemia in a SAM child — correctly below the WHO SAM-specific hypoglycaemia threshold (<54 mg/dL / 3 mmol/L), not just the general lab reference range.
- 10% dextrose 5 mL/kg IV bolus for hypoglycaemia — correct WHO SAM-specific dosing (note: this differs from the higher-concentration boluses used in non-malnourished children, and the case gets the SAM-specific figure right).
- `standard_bolus` (normal saline 30 mL/kg rapid) correctly graded **harmful**: this is the case's explicit central teaching point (a wasted, atrophic myocardium cannot tolerate a standard rapid paediatric fluid bolus and develops heart failure) — accurate and matches WHO's SAM-specific caution against standard rapid resuscitation volumes.
- `sam_fluids` (Ringer lactate 15 mL/kg over 1 hour, reduced volume, slow rate, frequent reassessment) correctly modelled as the appropriate reduced/slowed alternative for a SAM child with genuine shock.
- ReSoMal correctly reserved for dehydration *without* shock, correctly described as lower-sodium/higher-potassium than standard ORS, matching the specific electrolyte physiology of SAM.
- Empirical ampicillin+gentamicin correctly indicated despite the absence of fever/raised CRP — correctly explains that inflammatory/febrile responses are blunted in SAM (a genuinely important and often-missed teaching point).
- F-75 starter feed (small, frequent, low-protein, low-sodium) correctly used in the stabilisation phase, with correct reasoning about refeeding-syndrome risk (phosphate/potassium/magnesium shifts) if feeds are advanced too fast.
- Furosemide correctly graded **harmful** for oedema/puffiness in this context (worsens the existing total-body potassium/volume depletion) — correct, avoids a dangerous but plausible-looking error.
- Vitamin A supplementation correctly included as standard stabilisation-phase care.

## Minor/debatable note (not a definite error)
- WHO's SAM-with-shock fluid protocol specifies Ringer lactate *with 5% dextrose* (or half-strength Darrow's/half-normal saline with dextrose) rather than plain Ringer lactate, given how hypoglycaemia-prone these children are. The case's `sam_fluids` entry gives plain Ringer lactate. Since the case already corrects hypoglycaemia with a separate dextrose bolus immediately beforehand (and reassessment is explicitly frequent), giving plain RL afterward is a defensible sequencing choice rather than a clear error, so this is flagged as debatable rather than definite.

## Sources consulted
- WHO Pocket Book of Hospital Care for Children / WHO SAM management guidelines (MUAC and Z-score thresholds, SAM-specific hypoglycaemia threshold, reduced-volume shock fluid protocol, ReSoMal indication, F-75 refeeding caution, blunted infection signs, furosemide contraindication) — domain knowledge, internally consistent and well-established; no web search needed given the case's own numbers were unambiguous and consistent with WHO SAM teaching.
