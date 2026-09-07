# Audit: malaria.ts

**Severity: MAJOR (definite error — but does not change the overall diagnosis or treatment, since other criteria independently justify "severe malaria").**

## What was checked and confirmed correct
34M, 5 days fever, 10 days post-travel to a forested/endemic district, ring-form trophozoites 8% parasitaemia + HRP-2 positive (falciparum). Several severity-criterion numbers are actually accurate against WHO thresholds:
- Metabolic acidosis: pH 7.28, HCO3 14 mEq/L — WHO severe-malaria acidosis criterion is bicarbonate <15 mmol/L; 14 correctly qualifies.
- Hyperlactataemia: 5.4 mmol/L — WHO criterion is lactate >5 mmol/L; correctly qualifies.
- Jaundice: total bilirubin 4.8 mg/dL (predominantly indirect) with parasitaemia — WHO criterion is bilirubin >3 mg/dL with parasite density >100,000/μL; correctly qualifies.
- Parenteral artesunate first-line (superior to quinine, per AQUAMAT/SEAQUAMAT trials), dexamethasone correctly graded **harmful** for cerebral involvement (prolongs coma, increases GI bleeding/pneumonia risk without survival benefit — classic and correct teaching), cautious small-aliquot fluids vs. large-volume boluses correctly graded indicated vs. harmful respectively (large boluses risk pulmonary oedema in severe malaria — correct and important, mirrors the FEAST trial's African paediatric findings extended to severe malaria fluid caution generally), quinine correctly flagged as causing hyperinsulinaemic hypoglycaemia, primaquine single low-dose correctly distinguished from the G6PD-dependent radical-cure course.

## MAJOR — definite error: several quoted "severity criteria" do not actually meet the WHO numeric thresholds they are used to represent

The case explicitly frames the following values as WHO/standard severe-malaria severity criteria (in `investigationsMap` result text, `therapiesMap` rationale, and `gateMilestones` patient context), but each falls short of the actual published threshold:

1. **Impaired consciousness**: GCS 12/15 (E3V4M5) is used throughout as a severity/cerebral-malaria criterion ("Severe Falciparum Malaria" diagnosis, gate milestone: "impaired consciousness... mandating the correct choice of first-line parenteral agent"). **WHO's threshold for "impaired consciousness"/cerebral malaria is GCS <11** — this patient's GCS of 12 is above that threshold and, by itself, would not meet the criterion.
   - Source: WHO cerebral malaria definition, cross-checked via web search — "reduced consciousness, defined as a Glasgow Coma Scale (GCS) score below 11."

2. **Hypoglycaemia**: file `src/data/cases/malaria.ts`, `therapiesMap.dextrose.rationale` (line ~152): *"Hypoglycaemia is both a severity criterion here and a cause of the altered sensorium..."* — GRBS is 54 mg/dL. **WHO's severe-malaria hypoglycaemia threshold is <40 mg/dL (2.2 mmol/L)**. 54 mg/dL is below the general lab reference range (70–140, correctly flagged as low) but does not meet the specific severe-malaria criterion it is invoked to satisfy.
   - Source: WHO severe malaria criteria, verified via web search — "blood or plasma glucose <2.2 mM (<40 mg/dL)."

3. **Severe anaemia**: CBC result text (line ~69) reads *"Hb 7.4 g/dL... severe anaemia with marked thrombocytopenia"*. **WHO's adult severe-malarial-anaemia threshold is Hb <7 g/dL (with parasitaemia >10,000/μL)**. 7.4 g/dL is just above that cutoff and does not itself meet the criterion, though it is still a clinically low, transfusable haemoglobin.
   - Source: WHO 2015 malaria treatment guidelines, verified via web search — "severe malarial anaemia is defined as a haemoglobin concentration <7 g/dL... together with a parasite count >10,000/μL" (adults).

4. **Renal impairment/AKI**: KFT result (line ~83) reads *"Blood Urea 68 mg/dL... Serum Creatinine 2.1 mg/dL — acute kidney injury"*, used as a severity criterion. **WHO's severe-malaria renal-impairment criterion is serum creatinine >3 mg/dL (>265 μmol/L) or urea >120 mg/dL (>20 mmol/L)**. This patient's creatinine (2.1) and urea (68) are both below those specific thresholds, even though 2.1 mg/dL would be considered clinically abnormal renal function in a general context.
   - Source: WHO severe malaria renal-impairment threshold, verified via web search.

**Why this matters:** exact WHO severe-malaria criteria (the numeric cutoffs for coma, hypoglycaemia, anaemia and renal impairment) are a classic, heavily-tested NEET-PG/INI-CET topic. A learner who reads this case is being taught that GCS 12, glucose 54, Hb 7.4 and creatinine 2.1/urea 68 each independently satisfy WHO severe-malaria criteria, which is incorrect and could cost marks on an exact-threshold MCQ.

**Does this change the diagnosis?** No — the patient's parasitaemia (8%, which independently qualifies as hyperparasitaemia in a non-immune host under most teaching), acidosis (HCO3 14), hyperlactataemia (5.4 mmol/L) and jaundice (bilirubin 4.8 with high parasite density) are each independently sufficient to classify this as severe malaria, so the overall diagnosis and the "give parenteral artesunate now" teaching point both remain correct. The error is confined to which specific numbers are cited as meeting which specific criterion.

**What it should say:** either state values that genuinely cross the WHO thresholds (e.g. GCS ≤10, glucose <40 mg/dL, Hb <7 g/dL, creatinine >3 mg/dL or urea >120 mg/dL) if the intent is to teach those exact criteria, or drop the claim that these particular numbers are "severity criteria" and rely on the criteria that do genuinely qualify (acidosis, lactate, jaundice, parasitaemia).

## Sources consulted (all via web search, 2026-09-06)
- WHO severe malaria hypoglycaemia threshold (<2.2 mmol/L / <40 mg/dL).
- WHO/2015 WHO malaria treatment guidelines, adult severe malarial anaemia threshold (Hb <7 g/dL with parasitaemia >10,000/μL).
- WHO severe malaria renal impairment/AKI threshold (creatinine >3 mg/dL or urea >20 mmol/L /120 mg/dL).
- WHO cerebral malaria/impaired consciousness definition (GCS <11 in adults).
- Acidosis (HCO3 <15 mmol/L), hyperlactataemia (>5 mmol/L) and jaundice (bilirubin >3 mg/dL with parasitaemia) criteria used elsewhere in the case were cross-checked against the same WHO framework and found to be correctly applied.
