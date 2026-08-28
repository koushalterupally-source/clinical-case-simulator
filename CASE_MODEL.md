# Case model — treatment, not just investigation

Binding spec for the case rebuild. Written after measuring what the simulator actually did.

## What was wrong

Measured across the 12 scaffolds as they stood:

| | |
|---|---|
| Orderable items on the sheet | 175 |
| Investigation results modelled per case | 12 |
| Order attempts returning "Not modelled in this case." | 2,006 of 2,100 — **96%** |
| **Therapies modelled, in any case** | **0** |

So the order sheet offered 175 things and about 168 of them did nothing in any given case. More
importantly, **no treatment was modelled anywhere**: insulin, fluids, thrombolysis and antibiotics
all returned the same dead string. A candidate could investigate a patient but never treat one,
which is the entire point of a CCS.

A separate bug made two different orders return one identical result. Matching was substring in both
directions — `orderLower.includes(key) || key.includes(orderLower)` — so the key `ketones` swallowed
both "Serum ketones" and "Urine ketones" and handed back the same combined text for each.

## What changes

**Four cases, modelled properly. The other eight are retired.** Breadth was hiding the fact that
none of them went deep enough to be worth playing. Four that behave like real cases beat twelve that
do not.

The four: **DKA**, **STEMI**, **eclampsia**, **bacterial meningitis** — all common in Indian PG
exams, all with unambiguous, guideline-level emergency management.

### Growing the library back — the bar, not the count

Eight further cases were then authored **to this same standard**, taking the library to twelve:
acute severe asthma, variceal upper GI bleed, convulsive status epilepticus, severe falciparum
malaria, tension pneumothorax, severe acute malnutrition, anaphylaxis, and atonic postpartum
haemorrhage. The spread is deliberate — Medicine, Surgery, Paediatrics, OBGY and Emergency — because
a library that is entirely Medicine is not representative of the exam.

The count is not the point; the bar is. Test Suite 14 in `tests/simulator.test.ts` enforces it over
the **whole** library rather than a hand-picked case, because the defect this project actually
shipped was not one broken case — it was twelve nobody had checked. Every case must:

- model at least three therapies, one of which is `indicated`, and at least six investigations;
- give every therapy at least one alias that matches the order-sheet catalogue, so it can be
  **tapped**, not only typed — a therapy invisible on the sheet may as well not exist;
- resolve every order name to exactly one thing (no alias claimed by two entries);
- have no dangling `requiresFirst` or `labShift` key — both fail silently at runtime, so a typo
  just means the effect never happens;
- explain every `harmful` grading and every sequence dependency in its `rationale`;
- carry only timed `criticalInterventions` that some modelled therapy can actually satisfy,
  so a candidate is never marked down for missing something they could not order;
- not name its own diagnosis in the opening vignette or in any decision gate.

Those invariants found two real defects in the original four the moment they were written: a
therapy in the meningitis case that no order-sheet item could reach, and a duplicate alias in the
STEMI case. That is the argument for enforcing them library-wide.

### Sourcing

The cases are **authored originals**, written against standard published guidance. A search for
freely-licensed case material found nothing that could responsibly be vendored: the licences that
looked usable could not be verified from this environment, and the one source that could be pinned
down — the official NBME/USMLE sample CCS cases — is explicitly all-rights-reserved, non-commercial
and non-redistributable. Clinical facts and management pathways are not copyrightable; the specific
prose, vitals tables and order sequences of a particular source are. So nothing was copied.

### 1. Therapy is modelled

New on `CaseScaffold`:

```ts
therapiesMap: Record<string, {
  aliases: string[];          // what a candidate might type or tap
  responseText: string;       // what the chart records when it is given
  onsetMinutes: number;       // when the effect becomes visible
  vitalsEffect?: Partial<Vitals>;      // where the patient moves once it acts
  labShift?: Record<string, string>;   // investigation key -> its new result on repeat
  appropriateness: 'indicated' | 'neutral' | 'harmful';
  rationale: string;          // shown in the scorecard afterwards, never during
}>
```

Rules the engine enforces:

- An **indicated** therapy is acknowledged, moves the vitals toward normal over `onsetMinutes`, and
  changes what a repeated investigation returns. Treating a patient must visibly change the patient.
- A **harmful** therapy is acted on too, and the patient responds accordingly — insulin before
  fluids and potassium in DKA is a decision with consequences, not a no-op.
- **Order matters.** Where sequence is clinically load-bearing, `harmful` covers giving the right
  drug at the wrong time.
- Omission keeps the existing behaviour: `criticalInterventions` still deteriorates the patient when
  a time window passes.

### 2. The order sheet stops lying

The sheet is filtered per case to what that case models, plus free text for anything else. A
candidate is never offered 175 options where 168 are inert.

Where an unmodelled order is typed anyway, the response says plainly that this case does not model
it — it must **never invent a clinical result**. That constraint is the one this project has broken
before and it does not bend: a fabricated lab value is worse than an honest gap.

### 3. Matching is explicit

Substring-both-ways is replaced by a normalized match against an explicit `aliases` list. "Serum
ketones" and "urine ketones" are different orders with different results. A key may not silently
swallow an order it was not written for.

## Clinical content

Standard, guideline-level emergency management only. Conventional doses. Nothing exotic, nothing
invented. Anything the author is less than confident about is flagged in the pull request for a
clinician to check rather than quietly shipped — the reviewer here is a doctor and the content is
for people sitting an exam, so an unflagged guess is the worst outcome available.
