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
