# Audit: varicealBleed.ts

**Severity: MAJOR (one definite dosing error; one minor definite wording/physiology inaccuracy).**

## What was checked and confirmed correct
48M, 15+ years daily alcohol use, haematemesis + melaena, stigmata of chronic liver disease (spider naevi, palmar erythema, gynaecomastia, asterixis, splenomegaly, shifting dullness), hypotensive/tachycardic with a postural drop, endoscopy showing large oesophageal varices with red wale signs and active ooze — an internally coherent variceal bleed picture in cirrhosis with no contradictions between vitals, exam and diagnosis.

- **Restrictive transfusion strategy** (target Hb ~7–8 g/dL) correctly graded indicated, with the large-volume crystalloid bolus (`over_transfusion`, 30 mL/kg rapid NS) correctly graded **harmful** for raising portal pressure and provoking rebleeding — matches the Villanueva restrictive-vs-liberal transfusion trial and current teaching, and is the case's explicit, correctly-modelled central teaching point.
- **Vasoactive drugs (terlipressin/octreotide) correctly started before endoscopy**, not after — matches Baveno consensus/AASLD guidance that a splanchnic vasoconstrictor should begin as soon as variceal bleeding is suspected, before endoscopic confirmation.
- `band_ligation` correctly `requiresFirst: ['iv_access']`, with a harmful-sequence penalty for endoscoping an unresuscitated patient with no secure IV access (aspiration/cardiovascular collapse risk) — sound sequencing.
- FFP correctly graded **neutral**, not indicated: a raised INR in cirrhosis reflects reduced hepatic synthesis rather than a discrete, correctable coagulopathy, and routine FFP correction has not been shown to reduce bleeding — matches current AASLD/EASL teaching (no routine FFP for cirrhotic coagulopathy).
- Ascitic fluid PMN count of 120 cells/mm³ correctly read against the standard SBP diagnostic threshold of ≥250 cells/mm³ ("no evidence of spontaneous bacterial peritonitis at this count").
- Balloon tamponade correctly graded **neutral**: a temporising bridge to definitive therapy, not definitive treatment itself, with a real aspiration/oesophageal rupture risk — accurate framing.
- Ammonia elevation (98 µmol/L) correctly attributed to the large digested blood/protein load in the gut rather than asserted as proof of hepatic encephalopathy, consistent with the patient remaining alert and oriented with only asterixis on exam.
- Lactulose correctly graded indicated as a pre-emptive measure against encephalopathy precipitated by a large GI blood load, not as active-encephalopathy treatment.
- USG findings (shrunken/coarse liver, portal vein 14 mm, spleen 15 cm, ascites) are consistent with cirrhosis and portal hypertension; PT/INR (19.5 sec / 1.8), bilirubin (3.4 mg/dL) and albumin (2.6 g/dL) are all plausible, internally consistent derangements for this patient.

## MAJOR — definite error: ceftriaxone prophylaxis dose is double the guideline dose

**File:** `src/data/cases/varicealBleed.ts`, `therapiesMap.ceftriaxone` (lines 179–186)

**Exact text:**
```
ceftriaxone: {
  aliases: ['ceftriaxone 2 g iv', 'ceftriaxone', 'iv antibiotic', 'antibiotic prophylaxis', 'iv ceftriaxone', 'antibiotic', 'ceftriaxone iv'],
  responseText: 'IV Ceftriaxone 2 g given as antibiotic prophylaxis.',
  ...
  rationale: 'Short-course antibiotic prophylaxis reduces mortality, rebleeding, and the risk of spontaneous bacterial peritonitis in a variceal bleed with underlying chronic liver disease...'
```

**What is wrong:** The case states and grades as `indicated` a ceftriaxone dose of **2 g IV** for antibiotic prophylaxis in variceal bleeding. The guideline-recommended prophylactic dose (Baveno consensus/Tripathi 2015, AASLD/Garcia-Tsao 2017, EASL 2018) is **ceftriaxone 1 g IV every 24 hours** (typically for up to 7 days), not 2 g. 2 g/day is a dose used for other indications (e.g. treating established spontaneous bacterial peritonitis or meningitis), not for variceal-bleed prophylaxis. This is an exact numeric dosing fact of exactly the kind tested on NEET-PG/INI-CET, and the case teaches the wrong number.

**Why it matters clinically/pedagogically:** 2 g of ceftriaxone is not dangerous, so this does not create patient harm within the simulation, but a learner who memorises "ceftriaxone 2 g for variceal-bleed prophylaxis" from this case will answer an exact-dose MCQ incorrectly.

**What it should say:** `responseText` and the alias list should read "IV Ceftriaxone 1 g given as antibiotic prophylaxis" (matching the alias `'ceftriaxone 2 g iv'` would also need updating to `'ceftriaxone 1 g iv'`).

**Source checked (web search, 2026-09-07):** multiple independent sources converge on 1 g/24h — Tripathi 2015 (Baveno-aligned UK guidelines), Garcia-Tsao 2017 AASLD practice guidance, and EASL 2018 guidelines are all summarised as recommending "ceftriaxone 1 gram every 24 hours for seven days" for antibiotic prophylaxis in cirrhotic patients with variceal bleeding; a Cochrane review (Sanchez-Jimenez 2018) and multiple RCTs on ceftriaxone prophylaxis in this setting used the same 1 g/day dose. No source found recommending 2 g/day specifically for prophylaxis.

## Minor definite error — misleading wording: bilirubin mischaracterised as a synthetic-function marker

**File:** `src/data/cases/varicealBleed.ts`, `investigationsMap.lft.resultText` (line 67)

**Exact text:** *"Total Bilirubin 3.4 mg/dL ... Albumin 2.6 g/dL (Reference 3.5–5.0 g/dL) — hyperbilirubinaemia and hypoalbuminaemia consistent with impaired synthetic function."*

**What is wrong:** Serum albumin and PT/INR are the standard tests of hepatic **synthetic** function (production capacity). Bilirubin reflects hepatocyte uptake/conjugation and biliary excretion, not synthetic capacity — it is conventionally taught as a separate category (excretory/cholestatic function, or a marker of hepatocellular injury/haemolysis) distinct from synthetic function. Lumping "hyperbilirubinaemia" together with "hypoalbuminaemia" under a single "impaired synthetic function" label teaches an incorrect classification of liver function tests, a distinction (synthetic vs. excretory vs. injury markers) that is itself commonly tested.

**Why it is minor:** this does not change any treatment decision, dose, or diagnosis in the case — it is a physiology-labelling inaccuracy in a result-text sentence, not a management error.

**What it should say:** e.g. "hyperbilirubinaemia (impaired excretory function) and hypoalbuminaemia (impaired synthetic function)," keeping the two abnormalities separately and correctly categorised — or simply drop the "synthetic function" label from the bilirubin clause.

**Source:** standard hepatology/clinical-biochemistry teaching (LFT classification into hepatocellular injury markers [AST/ALT], synthetic function [albumin, PT/INR], and excretory/cholestatic markers [bilirubin, ALP, GGT]) — domain knowledge, not requiring a web search since this is an unambiguous, textbook classification.

## Sources consulted
- Ceftriaxone prophylaxis dose in variceal bleeding — web search 2026-09-07 (Tripathi 2015, Garcia-Tsao 2017 AASLD, EASL 2018, Cochrane review Sanchez-Jimenez 2018, multiple RCTs — all converge on 1 g/24h).
- Villanueva restrictive-vs-liberal transfusion trial, Baveno consensus on pre-endoscopy vasoactive drugs, AASLD/EASL guidance on FFP in cirrhotic coagulopathy, SBP diagnostic ANC threshold (≥250 cells/mm³) — domain knowledge, internally consistent with the case's own numbers, no search needed given unambiguous, well-established values.
- Classification of liver function tests (synthetic vs. excretory vs. injury markers) — domain knowledge, standard textbook teaching.
