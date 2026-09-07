# Audit: pneumothorax.ts

**Severity: NONE (no definite errors found).** One debatable-convention note (verified via web search).

## What was checked
29M, blunt right chest trauma 25 min ago, HR136 BP82/50 RR36 SpO2 84%, absent right breath sounds + hyper-resonance + tracheal deviation left + distended neck veins — classic, internally coherent tension pneumothorax with obstructive shock.

- Needle decompression correctly modelled as an immediate bedside clinical diagnosis/treatment that must never wait for a CXR or CT — correct and the case's central, correctly-taught point.
- CT chest correctly deferred with an explicit rationale that an unstable trauma patient must never be sent to the scanner — correct trauma teaching.
- `intubation` correctly `requiresFirst: ['needle_decompression']`, with an accurate harmful-sequence penalty describing how positive-pressure ventilation before decompression forces more air into the trapped pleural space each breath, worsening mediastinal shift and precipitating arrest — correct and an important, exam-relevant sequencing point.
- Chest drain correctly modelled as the definitive treatment following needle decompression, which "only buys time."
- Morphine and tranexamic acid both correctly graded **neutral** with accurate reasoning: analgesia doesn't treat the mechanical cause and must never precede decompression; TXA is reasonable for haemorrhagic shock but this patient's shock is obstructive, not haemorrhagic, so it doesn't address the primary problem — a genuinely useful distinction (obstructive vs. haemorrhagic shock) correctly drawn.
- FAST scan and bedside echo (no tamponade, hyperdynamic underfilled LV) are used appropriately to rule out other causes of shock, not as a substitute for the bedside decompression decision.

## Debatable/minor note (verified via web search, not a definite error)
- Needle decompression site is specified as the "2nd intercostal space, midclavicular line." **Current ATLS (10th edition, 2018)** now prefers the **4th/5th intercostal space, anterior axillary line** as the primary site (better success rate, fewer complications, per CT/cadaveric evidence), with 2nd ICS-MCL now positioned as an alternative/second-choice site — though notably still considered the **safer choice for a *left*-sided tension pneumothorax** given the proximity of the heart to the lateral approach on that side. Since this case is a *right*-sided pneumothorax, 2nd ICS-MCL remains a clinically defensible, guideline-recognised site rather than a wrong answer, and it also remains the site most commonly taught in Indian medical curricula and question banks. This is flagged as a debatable convention rather than a definite error — the case would benefit from a note (as the `burns.ts` case does for the Parkland-formula figure) that current international guidance has shifted toward the 5th-ICS-anterior-axillary-line site, since a learner reading only this case could be unaware newer guidance exists.
  - Source: ATLS 10th edition needle thoracostomy site change, verified via web search 2026-09-06 — "the 4th or 5th intercostal space, anterior axillary line (4th/5th ICS-AAL)... adopted in the most recent ATLS revision... For left-sided cases, the 2nd ICS-MCL is the safer approach given the injury risk to cardiac structures at lateral sites."

## Sources consulted
- ATLS 10th edition needle decompression site guidance — verified via web search (see above) since this is a specific, checkable, guideline-version-dependent fact.
- General tension pneumothorax pathophysiology and obstructive-vs-haemorrhagic shock distinction — domain knowledge, unambiguous and consistent.
