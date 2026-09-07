# Audit: pph.ts

**Severity: NONE (no definite errors found).**

## What was checked
26F, 35 min post-SVD of a 3.6 kg baby, HR126 BP86/52, boggy uterus above umbilicus firming transiently with massage, complete placenta, no tract laceration, normal PT/INR/fibrinogen — a well-constructed exclusion of the other three "Ts" (tissue, trauma, thrombin), correctly leaving atony as the cause.

- Uterine massage/bimanual compression correctly modelled as the immediate mechanical first step, done concurrently with drawing up drugs.
- Oxytocin 10 IU IM + 20 IU infusion — correct standard first-line dosing, correctly given alongside (not after) massage.
- Carboprost 250 mcg IM — correct standard dose, correctly flagged as contraindicated in asthma (bronchospasm risk), correctly noted as not a concern for this patient (no asthma history).
- Methylergometrine 0.2 mg IM — correct standard dose, correctly specified as IM only, **never IV bolus** (a genuinely important safety point — IV ergometrine bolus risks severe hypertension/stroke), correctly flagged as contraindicated in hypertension/pre-eclampsia and correctly noted as not applicable here.
- Misoprostol 800 mcg PR — correct standard adjunct dose, correctly notes expected transient pyrexia/shivering as a side effect that should not be mistaken for sepsis.
- Tranexamic acid 1 g IV — correctly indicated, correctly cites the "benefit greatest within 3 hours of bleeding onset" (WOMAN trial finding) and correctly says it should be given early, alongside uterotonics.
- Balloon tamponade correctly `requiresFirst: ['uterine_massage', 'oxytocin']` with an accurate harmful-sequence penalty (tamponade doesn't make the uterus contract, and can conceal ongoing loss within the cavity, underestimating true blood loss) — a genuinely subtle and correct teaching point.
- Laparotomy correctly `requiresFirst: ['uterine_massage', 'oxytocin', 'tranexamic_acid']`, correctly framed as the last step in the escalation ladder to avoid an avoidable hysterectomy/loss of fertility.
- Furosemide correctly graded **harmful** for oliguria that reflects hypovolaemia (not overload) in ongoing haemorrhage.
- PRBC transfusion correctly guided by clinical instability, not a fixed Hb threshold.

## Sources consulted
- WHO PPH management guideline and FIGO/ACOG PPH bundles (uterotonic ladder and dosing, ergometrine/carboprost contraindications and administration route, WOMAN trial TXA timing window, balloon tamponade and laparotomy sequencing) — domain knowledge, internally consistent and matching well-established teaching; no web search needed given the values and sequencing were unambiguous and correct throughout.
