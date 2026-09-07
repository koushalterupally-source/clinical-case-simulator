# Clinical content audit — in progress, NOT yet acted on

These files are the raw output of an audit pass over the case library. The audit
was cut short by a usage limit after 17 of 28 cases, so this is **incomplete**.

**Nothing in here has been applied to the case data.** Two findings are rated
MAJOR and need a doctor's eye before anything changes:

- `scaffolds-meningitis.md` — ampicillin graded universally `indicated` for a
  patient who does not meet the case's own stated risk criteria for it.
- `malaria.md` — several quoted "severity criteria" do not match the WHO numeric
  thresholds they are presented as.

The remaining 15 audited cases came back with no definite errors; some carry
minor or debatable notes.

## Still to audit

anaphylaxis, appendicitis, asthma, burns, dengueShock, ectopicPregnancy,
ischemicStroke, malaria, malnutrition, neonatalSepsis, organophosphate,
pneumothorax, pph and the four inline scaffolds are done. Not yet covered:
snakeBite, statusEpilepticus, varicealBleed, and the remaining inline cases.

Already audited in an earlier pass (do not redo): angleClosureGlaucoma,
toxicEpidermalNecrolysis, deliriumTremens, ludwigsAngina, pancreatitis,
testicularTorsion, compartmentSyndrome, pediatricDka.

## How to read a finding

Each file separates a **definite error** (a fact that is simply wrong) from a
**debatable convention** (a defensible practice someone would do differently).
Only definite errors should ever be applied without discussion, and even then
the change belongs to whoever is clinically accountable for this content — not
to the person holding the keyboard.
