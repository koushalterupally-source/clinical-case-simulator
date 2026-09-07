# Audit: dengueShock.ts

**Severity: NONE (no definite errors found).**

## What was checked
8F, day 5 of fever that defervesced 6h ago, now restless/drowsy, cold extremities, gum bleeding, BP92/78 (pulse pressure 14 mmHg), HR148, RR32, SpO2 96%. This is a correctly-modelled textbook picture of compensated dengue shock: narrow pulse pressure with a "normal-looking" systolic BP is the earliest sign of shock in a child, well before hypotension — the case's stated central teaching point, and clinically accurate.

- Age-specific reference ranges are correctly used throughout rather than adult defaults: Hct 33–39% for age, WBC 5,000–13,000/mcL for age, urea 15–36 mg/dL for age, creatinine 0.3–0.5 mg/dL for age, albumin 3.8–5.4 g/dL for age — all plausible paediatric values, a deliberate and correct departure from adult ranges.
- CBC pairing of rising haematocrit (42%, up from a presumed lower baseline) with falling platelets (68,000/mcL) on the same sample is exactly the WHO-taught signature of plasma leakage, and the case explicitly builds its teaching point around it.
- Crystalloid dosing explicitly follows WHO dengue guidance: ~5–10 mL/kg/hr for compensated shock (this case) vs. a rapid 20 mL/kg bolus once hypotension develops, with Ringer lactate preferred but normal saline substituted in significant metabolic acidosis — this is accurate and appropriately nuanced.
- `colloid_bolus` correctly `requiresFirst: ['crystalloid_bolus']` with a harmful-sequence penalty for reaching for colloid before a crystalloid trial — matches WHO/second-line colloid teaching.
- Aspirin/NSAIDs correctly graded **harmful** (antiplatelet effect + Reye syndrome risk in a febrile child) with paracetamol as the correct alternative.
- IM paracetamol correctly graded **harmful** given thrombocytopenia/coagulopathy (risk of large IM haematoma) — a genuinely useful, easily-missed teaching point.
- Prophylactic platelet transfusion for thrombocytopenia alone (no active bleeding) correctly graded **harmful** — matches WHO/current dengue guidance that platelet transfusion should be reserved for significant clinical bleeding, not for the number alone, and correctly flags the fluid-overload risk of the transfusion volume itself.
- Recovery-phase teaching (taper fluids, watch for reabsorption-phase pulmonary oedema) is accurate and an important, often-untaught nuance.

## Sources consulted
- WHO Comprehensive Guidelines for Dengue (fluid volumes by shock stage, RL vs. NS choice, colloid second-line, platelet transfusion threshold, NSAID/aspirin contraindication) — domain knowledge, consistent throughout with well-established WHO teaching; no web search needed given internal consistency and unambiguous values.
