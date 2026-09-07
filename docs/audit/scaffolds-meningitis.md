# Audit: scaffolds.ts — Case 4, `scaffold_meningitis` (Acute Bacterial Meningitis)

**Severity: MAJOR (one definite error).**

## What was checked and confirmed correct
35F, fever 39.4°C, headache, photophobia, neck stiffness, positive Kernig/Brudzinski, petechial rash. CSF: WBC 2800/mm3 (88% polymorphs), protein 310 mg/dL, glucose 16 mg/dL, serum glucose 104 mg/dL → CSF:serum glucose ratio = 16/104 = 0.154, matching the stated "ratio 0.15" exactly — internally consistent and correctly abnormal (bacterial threshold <0.4–0.5). Gram-negative intracellular diplococci on CSF and blood culture, correctly paired with a petechial rash (classic *Neisseria meningitidis*/meningococcaemia presentation — a common point of student confusion that this case gets right). Ceftriaxone 2 g IV, vancomycin add-on for cephalosporin-non-susceptible pneumococcus, dexamethasone timed with/before first antibiotic dose (correct — benefit is reduced if steroid follows antibiotics), and `inadequate_antibiotic` (azithromycin/doxycycline) correctly marked harmful for poor CNS penetration and inadequate coverage.

## MAJOR — definite error: ampicillin marked universally "indicated" for a patient who does not meet its own stated risk criteria

**File:** `src/data/cases/scaffolds.ts`, `therapiesMap.ampicillin` (around line 959-965)

**Exact text:**
```
ampicillin: {
  aliases: ['ampicillin', 'ampicillin iv', 'iv ampicillin'],
  responseText: 'IV Ampicillin added for additional coverage.',
  onsetMinutes: 30,
  appropriateness: 'indicated',
  rationale: 'Ampicillin is added empirically to cover Listeria monocytogenes in patients at risk (neonates, pregnancy, older age, or immunocompromise).',
},
```

**What is wrong:** The rationale itself correctly names the IDSA risk criteria for adding empiric ampicillin (age <1 month, age >50, pregnancy, alcoholism, or impaired cellular immunity) — but the patient in this case is a 35-year-old woman with no stated pregnancy, no stated immunocompromise, and no stated alcoholism. She does not meet any of the criteria the therapy's own rationale lists. Despite this, `appropriateness: 'indicated'` grades ampicillin as correct/rewarded regardless of the patient's actual risk profile, alongside ceftriaxone and vancomycin which genuinely are standard for any immunocompetent adult under 50. A learner following this case is taught that ampicillin should always be added for empiric bacterial meningitis coverage, which is not correct practice for this specific patient and could lead to routinely over-broadening empiric therapy in patients who do not need Listeria coverage.

**What it should say:** For an immunocompetent 35-year-old woman with no stated pregnancy/alcoholism/immunocompromise, standard empiric therapy is vancomycin + ceftriaxone alone; ampicillin should be graded `neutral` (unnecessary but not dangerous) rather than `indicated` for this specific patient, or the case should state a risk factor (e.g. pregnancy, immunocompromise) that actually puts her in the Listeria-risk group before rewarding it as indicated.

**Source checked:** IDSA 2004 practice guideline for bacterial meningitis (summarized in AAFP review and multiple institutional antimicrobial-stewardship empiric-therapy guides, cross-checked via web search 2026-09-06): "vancomycin and ceftriaxone or cefotaxime for children older than 23 months and adults up to 50 years of age, and addition of ampicillin for patients over 50 years [or pregnancy/alcoholism/impaired cellular immunity] for coverage of Listeria monocytogenes." [IDSA Guidelines summary](https://www.aafp.org/pubs/afp/issues/2005/0515/p2003.html), [IDSA 2017 HCAVM/CNS empiric guides](https://www.idsociety.org/practice-guideline/healthcare-associated-ventriculitis-and-meningitis/).

## Sources consulted
- IDSA practice guideline for bacterial meningitis (age/risk-based empiric antibiotic selection) — verified via web search, see link above.
- CSF glucose ratio and cell count interpretation, dexamethasone timing evidence (de Gans/van de Beek), and Gram-stain morphology of *N. meningitidis* — domain knowledge, unambiguous and consistent with the case's own numbers, no search needed.
