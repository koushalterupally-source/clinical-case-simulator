# Audit: neonatalSepsis.ts

**Severity: NONE (no definite errors found). Exceptionally careful use of neonate-specific reference ranges throughout.**

## What was checked
Day-3 term male newborn, PROM >18h + untreated intrapartum maternal fever, HR190 BP52/30 RR74 SpO2 89% Temp35.3 GRBS36 — coherent early-onset neonatal sepsis with septic shock.

This case is unusual among the set in explicitly and correctly using **neonate-specific** reference ranges rather than adult or general-paediatric ones throughout, and flags the difference each time:
- WBC 5,000–30,000/mm³ "wider and higher normal range" for a well term newborn, I:T ratio >0.2 abnormal — correct classic neonatal sepsis screening teaching.
- CSF WBC <20–30/mm³ and protein up to ~170 mg/dL "higher than in an older child" — correct and an important, frequently-missed nuance (using adult/older-child CSF norms on a neonate is a classic trap this case explicitly avoids).
- Serum calcium reference 8–10.5 mg/dL "in a term newborn" with 7.6 mg/dL correctly flagged low — correct term-neonate hypocalcaemia threshold.
- K+ reference "roughly 3.5–6.0 mEq/L in a newborn, higher than the adult range" — correct, neonates tolerate/exhibit higher physiological potassium.
- Urea "8–20 mg/dL, higher than the adult range" and correct teaching that neonatal creatinine at birth reflects maternal renal function and should fall over 1–2 weeks — accurate and a genuinely useful, exam-relevant point.
- ABG PaO2 "roughly 50–70 mmHg on room air" and HCO3 "roughly 20–24 mEq/L" for a newborn, both correctly lower than adult reference — consistent with standard neonatal physiology teaching.
- Glucose treatment threshold ("treated once glucose falls below roughly 45 mg/dL" for a symptomatic newborn) is correctly distinguished from adult/older-child thresholds.
- Procalcitonin correctly flagged as physiologically elevated in the first 24–48h of life and not interpretable against an adult cutoff.
- Bilirubin correctly deferred to an hour-specific nomogram rather than a fixed threshold — correct practice for neonatal jaundice.

Therapies:
- Dextrose dosing correctly scaled down for a newborn (10% dextrose 2 mL/kg slow IV push, vs. the larger per-kg boluses used in older children elsewhere in this same file set) followed by a maintenance GIR-titrated infusion — correct and a genuinely important dosing distinction.
- Fluid boluses correctly given in smaller neonatal aliquots (10 mL/kg) with reassessment, rather than a larger paediatric/adult bolus — correct, newborn myocardium is bolus-intolerant.
- `dopamine` correctly `requiresFirst: ['fluid_bolus']` with a harmful-sequence penalty for a vasoactive drug on an underfilled circulation — correct sequencing; noradrenaline correctly added as a second-line agent for fluid- and dopamine-refractory shock.
- Ampicillin + gentamicin correctly chosen as first-line empirical cover (GBS, Listeria, E. coli) with blood culture correctly drawn first but never delaying the first antibiotic dose.
- Ceftriaxone correctly graded **harmful** in a neonate, with an accurate and important dual mechanism (bilirubin-albumin displacement risking kernicterus + precipitation with calcium-containing IV fluids) — a classic, high-value exam point correctly represented.
- Furosemide correctly graded **harmful** for reduced urine output caused by hypoperfusion (not overload) in an underfilled circulation.
- Lumbar puncture correctly performed even without classic meningeal signs, with correct reasoning that a newborn this unwell often does not show them.

## Sources consulted
- Standard neonatology teaching on age-specific reference ranges (WBC/I:T ratio, CSF norms, calcium, potassium, urea/creatinine, ABG), AAP/WHO neonatal sepsis and hypoglycaemia management, and ceftriaxone's neonatal contraindication (bilirubin displacement, calcium precipitation) — domain knowledge, internally consistent throughout and matching well-established teaching; no web search needed given the values were unambiguous and the case's own age-specific framing was already correct.
