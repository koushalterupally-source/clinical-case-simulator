# Audit: anaphylaxis.ts

**Severity: NONE (no definite errors found).** One minor/debatable note.

## What was checked
24F, 8 min after first-ever IV antibiotic dose, urticaria + angio-oedema + stridor + hypotension (BP76/44) + SpO2 89%. Vitals cohere well with anaphylactic shock (tachycardic, thready pulses, cold clammy extremities, prolonged cap refill — a correctly-modelled cold/distributive-with-vasodilation-then-decompensation picture).

- Adrenaline (epinephrine) 0.5 mg (1:1000) IM into the anterolateral thigh, repeatable every 5 min — this is the correct adult dose, concentration and route per WHO/Resuscitation Council UK anaphylaxis guidance.
- IV adrenaline 1 mg bolus is correctly graded **harmful**: 1 mg IV is the cardiac-arrest dose, and giving it as a bolus to a patient with a pulse risks hypertensive crisis/tachyarrhythmia — correctly distinguished from the (only) appropriate IV route, a titrated infusion in a monitored refractory case.
- Hydrocortisone 200 mg IV and chlorpheniramine 10 mg IV are standard adult doses, both correctly graded **neutral** with `requiresFirst: ['adrenaline_im']` and a harmful-sequence penalty if given before adrenaline — correct sequencing and correct teaching (steroids/antihistamines do not reverse airway swelling or shock and must never substitute for or delay adrenaline).
- Oxygen, fluid bolus, salbutamol nebulisation, early intubation are all appropriately graded **indicated**, with correct rationale for each (fluid shift from capillary leak, bronchospasm component, and progressive airway swelling risking a difficult later intubation).
- `legs_up`/Trendelenburg-type positioning is correctly indicated and correctly warns against sitting/standing the patient up during circulatory collapse (a genuine, easily-missed killer in anaphylaxis teaching).

## Minor/debatable note (not a definite error)
- ABG "on oxygen": pH 7.30, PaCO2 30, PaO2 68 mmHg, SaO2 89%. A PaO2 of 68 mmHg on the oxyhaemoglobin dissociation curve typically corresponds to an SaO2 nearer 92–93%, not 89% — a small internal-consistency gap between the two numbers in the same result string. Likely a snapshot-timing artefact (initial SpO2 89% carried into the ABG label) rather than a wrong fact being taught, and it does not affect any scoring logic, so flagged as debatable/minor only.
- Serum tryptase turnaround listed as 180 minutes (3 hours). In many real-world labs tryptase is a send-out test with a turnaround of 24–48 hours or longer; 3 hours is optimistic for most centres, though not impossible for a lab with in-house capability. This does not affect scoring (the case correctly states the sample must never delay treatment) so it is noted as debatable rather than a definite timeline error.

## Sources consulted
- WHO/Resuscitation Council UK anaphylaxis algorithm (IM adrenaline dose/route/repeat interval, IV adrenaline reserved for titrated infusion in refractory shock) — domain knowledge, unambiguous and undisputed; no web search needed.
