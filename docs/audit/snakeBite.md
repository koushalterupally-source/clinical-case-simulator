# Audit: snakeBite.ts

**Severity: NONE (no definite errors found).**

## What was checked and confirmed correct
34M farmer, barefoot bite on the dorsum of the foot in a paddy field at dusk, progressive descending neuroparalysis (ptosis, ophthalmoplegia, nasal voice, poor swallow, respiratory distress) 45 minutes after the bite, with minimal local swelling and no bruising/blistering — a textbook elapid (cobra/krait) neurotoxic envenomation pattern, correctly distinguished throughout from a haemotoxic (viper) bite via a normal 20-minute whole blood clotting test (20WBCT), normal PT/INR/aPTT, and a normal urine routine (no haemoglobinuria/myoglobinuria).

- **20WBCT technique** ("2 mL of venous blood placed in a clean, dry glass test tube and left undisturbed for 20 minutes") matches the standard bedside protocol exactly (a fresh, clean, dry glass tube, undisturbed, read at 20 minutes).
- **ABG is quantitatively self-consistent**: pH 7.34, PaCO2 48, HCO3 23. Using the acute respiratory acidosis rule of thumb (pH falls ~0.008 per mmHg PaCO2 rise above 40), 8 mmHg × 0.008 = 0.064 → predicted pH ≈ 7.40 − 0.064 = 7.336, matching the stated 7.34 almost exactly — a genuinely well-modelled physiological detail, not just plausible-looking numbers.
- **Atropine 0.6 mg IV before neostigmine, then neostigmine 1.5–2 mg IV, repeated according to response**: confirmed against published Indian neurotoxic-snakebite protocols (e.g. the neostigmine/krait-bite literature), which use atropine 0.6 mg IV followed by neostigmine 1.5 mg IV doses repeated per response — matches the case exactly.
- `neostigmine` correctly `requiresFirst: ['atropine']` with a harmful-sequence penalty (bradycardia, bronchorrhoea, cramping) for reversing the order — correct pharmacology (unblocked muscarinic effects of an anticholinesterase).
- **Antivenom given as a fixed dose regardless of age, weight, or number of bite marks** — confirmed via web search: polyvalent antivenom dose is the same for adults and children because it neutralises a venom load, not a body-weight-dependent drug effect; this is exactly what the case's PHARM gate milestone tests.
- Tight arterial tourniquet correctly graded **harmful** (does not remove already-absorbed venom, causes limb ischaemia, and can flush pooled venom back into circulation on release) — matches current guidance against arterial tourniquets in snakebite first aid.
- Adrenaline 0.5 mg (1:1000) IM for an antivenom reaction, with hydrocortisone and chlorpheniramine correctly graded as slower-acting adjuncts that must never substitute for or precede adrenaline (`requiresFirst: ['adrenaline_im']`) — standard anaphylaxis-management sequencing, correctly applied to an antivenom reaction.
- Incision-and-suction bystander first aid correctly flagged as ineffective/harmful-if-repeated; tetanus prophylaxis correctly flagged for an undocumented-immunisation contaminated puncture wound; a single stress-related BP reading correctly handled as needing a recheck rather than treatment.
- Intubation and mechanical ventilation correctly sequenced (`mech_vent` requires `intubation` first, with a harmful-sequence penalty for attempting ventilatory support through a face mask in a patient with bulbar weakness — aspiration risk).

No unit errors, no contradictory vitals/exam findings, no impossible turnaround times, and no age/weight-scaling errors were found.

## Sources consulted (via web search, 2026-09-07)
- Indian neurotoxic-snakebite neostigmine protocol (atropine 0.6 mg IV followed by neostigmine 1.5 mg IV doses) — cross-checked against published krait-bite treatment literature (e.g. "Role of neostigmine and polyvalent antivenom in Indian common krait (Bungarus caeruleus) bite," ScienceDirect; "Role of Neostigmine in Neurotoxic Snake Bite").
- Fixed-dose antivenom regardless of age/weight in children — cross-checked via web search (paediatric snakebite dosing guidance: antivenom dose is the same for adults and children since it neutralises venom load, not weight-dependent).
- 20WBCT technique, ABG acid-base arithmetic, tourniquet vs. immobilisation guidance, and anaphylaxis-adjunct sequencing — domain knowledge, internally consistent with the case's own numbers, cross-checked qualitatively against the search results above.
