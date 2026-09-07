# Audit: appendicitis.ts

**Severity: NONE (no definite errors found).**

## What was checked
24M, 2-day history of migrating peri-umbilical → RIF → generalised pain, fever 39.4°C, HR128, BP92/58, warm peripheries/bounding pulses (correctly modelled as early *warm/distributive* septic shock rather than cold shock — a subtle and correct physiological detail). Diffuse peritonism, absent bowel sounds, tender PR exam — all cohere with perforated appendicitis with diffuse peritonitis.

- CBC, CRP, procalcitonin, lactate, ABG, KFT, electrolytes, LFT reference ranges are all standard adult values and internally consistent with an evolving septic picture (mild metabolic acidosis, mildly elevated urea/creatinine, hypokalaemia/hyponatraemia from vomiting).
- Erect abdominal X-ray correctly modelled as **often falsely reassuring** here (free gas frequently absent in a walled-off appendiceal perforation, unlike a perforated peptic ulcer) — a genuine and correctly-taught exam point, with an explicit `yieldNote` warning against misreading a normal film as reassurance.
- USG correctly flagged as limited by overlying bowel gas/ileus in a diffuse process; CT abdomen/pelvis with contrast correctly identified as the most sensitive study once perforation/collection is suspected.
- Sepsis-bundle sequencing is correct throughout: blood cultures `requiresFirst`-gated before antibiotics (harmful-sequence penalty if antibiotics given first, correctly reasoning about sample sterilisation); IV fluids + antibiotics both `requiresFirst`-gated before appendicectomy/induction of anaesthesia (harmful-sequence penalty modelling cardiovascular collapse on induction in an under-resuscitated patient — correct anaesthetic teaching); noradrenaline correctly graded **harmful** if reached for before an adequate fluid challenge (treats the pressure number rather than the volume deficit, risking excess afterload on an unloaded heart and mesenteric/digital ischaemia).
- Analgesia (IV morphine) correctly graded **indicated** with an explicit note that the old "don't give analgesia before surgical review" teaching is outdated — correct, current teaching (analgesia does not mask peritonism and should not be withheld).
- `inadequate_antibiotic` (azithromycin/doxycycline) correctly graded **harmful** for lacking Gram-negative/anaerobic gut coverage.

## Sources consulted
- Domain knowledge of appendiceal perforation imaging teaching (plain-film insensitivity, CT as gold standard), Surviving Sepsis Campaign bundle sequencing (cultures-before-antibiotics, resuscitation-before-induction), and current analgesia-in-acute-abdomen teaching — all well-established, undisputed points; no web search needed given the values and sequencing were unambiguous.
