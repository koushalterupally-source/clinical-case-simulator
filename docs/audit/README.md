# Clinical content audit — COMPLETE (all 28 cases covered)

These files are the raw output of a full audit pass over the case library —
28 of 28 cases now covered (an earlier run of this pass was cut short by a
usage limit after 17 of 28; this pass finished the remaining 3 named cases,
confirming the 4 inline scaffolds had already been covered).

**Status: the three MAJOR findings below HAVE now been applied to the case data.**
Everything else in these files is recorded but not acted on. Three findings are
rated MAJOR and need a doctor's eye before anything changes:

- `scaffolds-meningitis.md` — ampicillin graded universally `indicated` for a
  patient who does not meet the case's own stated risk criteria for it.
- `malaria.md` — several quoted "severity criteria" do not match the WHO numeric
  thresholds they are presented as.
- `varicealBleed.md` — ceftriaxone antibiotic prophylaxis dose is stated and
  graded `indicated` as 2 g IV; the guideline dose (Baveno/AASLD/EASL) is 1 g
  IV every 24 hours. Also carries a minor, non-management-affecting wording
  issue: bilirubin is mischaracterised as a marker of hepatic "synthetic
  function" (it reflects excretory/conjugation function, not synthesis).

The remaining 24 audited cases came back with no definite errors; some carry
minor or debatable notes (see individual files, e.g. a minor scenario-realism
note in `statusEpilepticus.md`).

## Coverage

All 28 cases have a corresponding audit file in this directory: anaphylaxis,
appendicitis, asthma, burns, dengueShock, ectopicPregnancy, ischemicStroke,
malaria, malnutrition, neonatalSepsis, organophosphate, pneumothorax, pph,
snakeBite, statusEpilepticus, varicealBleed, the four inline scaffolds
(scaffolds-stemi, scaffolds-dka-adult, scaffolds-eclampsia,
scaffolds-meningitis), and the eight cases from the earlier pass:
angleClosureGlaucoma, toxicEpidermalNecrolysis, deliriumTremens,
ludwigsAngina, pancreatitis, testicularTorsion, compartmentSyndrome,
pediatricDka.

## How to read a finding

Each file separates a **definite error** (a fact that is simply wrong) from a
**debatable convention** (a defensible practice someone would do differently).
Only definite errors should ever be applied without discussion, and even then
the change belongs to whoever is clinically accountable for this content — not
to the person holding the keyboard.
