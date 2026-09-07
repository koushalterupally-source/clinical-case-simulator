# Audit: ischemicStroke.ts

**Severity: NONE (no definite errors found). Notably well-sourced, including a claim I specifically verified.**

## What was checked
68M, last seen normal ~60 min ago, deficit noticed ~40 min ago, right facial droop (forehead spared)/hemiparesis/dysarthria, BP198/112, AF on ECG, GRBS118 (mimic excluded). Deficit pattern (UMN facial droop sparing forehead + arm/leg weakness + non-fluent speech, all one territory) and history (AF as embolic source, no bleeding disorder/recent surgery/trauma) are internally coherent with a thrombolysis-eligible large-vessel ischaemic stroke.

- Last-known-well vs. deficit-noticed-time distinction is correctly taught (onset = last seen normal, not time noticed) — genuinely important and often-tested nuance, correctly applied.
- CT head correctly modelled as the single mandatory gate before any reperfusion therapy (`requiresFirst` on both `thrombolysis_iv` and `thrombectomy`), with harmful-sequence penalties correctly describing haemorrhagic transformation/worsening if skipped.
- BP ceiling of <185/110 mmHg before thrombolysis is correct (AHA/ASA), using a titratable IV agent (labetalol) rather than fast-acting oral/sublingual nifedipine — nifedipine correctly graded **harmful** for producing an unpredictable, excessive BP drop that can worsen cerebral perfusion in the affected territory.
- **Verified via web search**: the rationale text states "Tenecteplase 0.25 mg/kg as a single bolus (maximum 25 mg) and alteplase 0.9 mg/kg... now carry equal weight in the 2026 AHA/ASA guideline." I confirmed this is accurate — the 2026 AHA/ASA Guideline for the Early Management of Patients With Acute Ischaemic Stroke does give both agents equal Class 1 recommendation status within the 4.5-hour window, reflecting recent international non-inferiority trials. [Stroke journal, 2026 AHA/ASA guideline](https://www.ahajournals.org/doi/10.1161/STR.0000000000000513); [AHA professional summary](https://professional.heart.org/en/science-news/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-stroke/top-things-to-know). The case's own added caveat — that many Indian textbooks/question banks still expect alteplase as the sole answer — is a fair and accurate exam-context note, not a hedge to cover an error.
- Aspirin correctly graded **harmful** if given immediately alongside/after thrombolysis (must be withheld ~24h pending a follow-up scan for haemorrhagic transformation) — correct.
- Routine early therapeutic heparin correctly graded **harmful** even with a likely cardioembolic (AF) source — correct, matches guidance against early anticoagulation regardless of presumed embolic aetiology.
- Thrombectomy correctly modelled as complementary/bridging alongside IV thrombolysis for confirmed LVO, not sequential/wait-and-see — correct current teaching.
- Mechanical DVT prophylaxis (not pharmacological) correctly chosen given elevated post-thrombolysis bleeding risk.
- High-intensity statin correctly deferred as non-urgent secondary prevention, explicitly not a reason to delay time-critical care.

## Sources consulted
- 2026 AHA/ASA Guideline for the Early Management of Patients With Acute Ischaemic Stroke (verified via web search for the tenecteplase/alteplase equivalence claim specifically, since it postdates my training and is a checkable, high-stakes factual claim) — see links above.
- General AHA/ASA thrombolysis eligibility criteria (BP ceiling, antiplatelet timing, anticoagulation avoidance) — domain knowledge, consistent with the verified guideline and well-established teaching.
