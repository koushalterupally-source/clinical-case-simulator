# Architecture

An offline-first clinical case simulator for postgraduate medical exam preparation. Everything runs in
the browser: there is no server, no account, and no analytics. The whole simulation — the clock,
the patient's physiology, the labs, the scoring — is a pure function of the case data and what the
learner typed.

## The shape of the thing

```
index.html ──▶ src/main.tsx ──▶ ErrorBoundary ──▶ App.tsx
                                                    │
                    ┌───────────────────────────────┼───────────────────────────────┐
                    ▼                               ▼                               ▼
              StartScreen                       CaseView                        Scorecard
              (+ CaseLibrary)          (Transcript · Composer · OrderSheet)
                    │                               │                               │
                    └──────────── src/utils/ccsEngine.ts (the simulation) ──────────┘
                                             │
                          src/data/cases/*.ts (38 authored cases)
```

`App.tsx` holds all session state and owns every transition. There is no router: the screen is
derived from `session` plus an `activeTab` of `sim | scorecard | instructions | menu`.

| Screen | Condition |
|---|---|
| Start menu | `!session`, or `activeTab === 'menu'` (a case parked with the back control) |
| In a case | a session exists and `activeTab === 'sim'` |
| Scorecard | `activeTab === 'scorecard'` and the session has one |

## The engine

`src/utils/ccsEngine.ts` is the whole simulation. Its contract:

```ts
processTurnOffline(session, userCommand?) -> newSession   // pure, no I/O, no Date.now in the sim clock
generateScorecard(session) -> EndOfCaseScorecard          // pure, total, idempotent
```

One turn does, in order:

1. Classify the command — history, examination, movement, time advance, order, or none of those.
2. Work out `timeSpentMins` for that kind of command.
3. Advance the clinical clock by `timeSpentMins`.
4. **Place any orders at the post-advance clock.** Writing the orders is what costs the minutes, so
   they go off when the turn ends. Stamping them before the advance is what once produced an order
   placed at 09:38 and ready at 09:36.
5. Release any pending order whose ready time has now passed, computing its result text *at
   delivery* so a therapy that has taken effect in the meantime is reflected.
6. Apply any therapy `vitalsEffect` whose `onsetMinutes` has elapsed — each administration fires
   exactly once.
7. Apply trajectory decay and emit an escalating nudge if a critical intervention is overdue.
8. Record the turn.

### Order matching

Orders are matched by **normalised exact equality against a case's aliases**, never by substring.
`normalizeOrderText` lowercases and collapses every run of non-alphanumerics to a single space.
Substring matching was tried and removed: `ketones` swallowed both serum and urine ketones.

An order the case does not model returns *"Not modelled in this case."* and is listed in the
scorecard under `unmodelledList`, where it costs nothing. **The engine must never invent a clinical
result.** A fabricated lab value is worse than an admitted gap.

### Invariants

These are enforced by `tests/invariants.test.ts` over seeded randomised play across all 38 cases:

- The clinical clock never moves backward.
- A result is never ready before its order was placed, and no order is stamped in the future.
- A result is released exactly once; no order is pending and completed at the same time.
- The therapy log is ordered in time and nothing is logged in the future.
- Vitals stay physically possible.
- Session state survives a round trip through storage.
- Scoring is total (never throws, whatever was played) and idempotent.
- Case selection never violates the subject or setting it was asked for.
- A rehydrated session behaves identically to a live one.

## Persistence

`src/utils/storage.ts`, IndexedDB `PYQ_CCS_Simulator_DB` with a localStorage fallback.

- Active sessions are keyed **by their own session id**, not a single shared slot, so two tabs
  playing two different cases cannot overwrite each other.
- Each tab records which case is its own in `sessionStorage`. A tab that has never played resumes
  the most recent case; a tab already playing keeps its own.
- Every stored session is validated by `isRestorableSession` before it is restored. Storage is not
  trusted input: a truncated, foreign or future-schema record is discarded and cleared rather than
  handed to React, which would blank the page.
- Saved sessions carry `SESSION_SCHEMA_VERSION` so a future format change can migrate or discard
  rather than guess.
- Finishing or abandoning a case calls `clearActiveSession`, so a scored case does not come back to
  life on the next load.

## Offline and updates

`public/sw.js` caches the shell and the hashed build assets, which are injected at build time by a
plugin in `vite.config.ts`. `CACHE_NAME` is bumped per release and `activate` deletes only caches
carrying the `pyq-ccs-` prefix, because a sibling app shares this origin.

`index.html` carries the recovery path: if the app has not mounted a few seconds after load — the
signature of a cached shell pointing at deleted asset hashes — it unregisters workers, clears
caches and reloads, exactly once per tab.

## Testing

```bash
npm run lint    # tsc --noEmit
npm test        # both suites below
npm run build   # production build

npx tsx scripts/validate-cases.ts        # case-data schema validation
npx tsx tests/simulator.test.ts          # behavioural suite, ~10,000 assertions
npx tsx tests/invariants.test.ts [seed]  # invariant/property suite, seeded and replayable
```

The browser suite needs a built app being served, so it is not part of `npm test`:

```bash
npm run build
npx serve -s dist -l 8310   # in its own shell
npm run test:e2e            # 56 checks, ~90s
```

It covers boot, starting a case, free-text submission, the order sheet, history
and examination, leave/resume, end-case and reload, mid-case reload, four
viewport widths, keyboard navigation, theme persistence and the case library.

A regression that strands the app on the wrong screen is asserted, not waited
out: the screen checks read the DOM and name what they found ("landed on:
case"). Each check has a 35s budget and the run as a whole has 150s, so a broken
app always produces a readable report instead of a killed process.

One subtlety worth preserving if you touch this. Session restore is
asynchronous — the start screen paints immediately from the synchronous
localStorage read, and only afterwards can an IndexedDB read swap a restored
case in. Reading the screen once therefore RACES the restore and can report
"start" for an app that is about to resurrect a finished case, which is the very
regression the check exists to catch. `settledScreen` waits for the screen to
stop changing before answering. A faster check here is a broken check.

The invariant suite prints its seed. A failure is reproduced by re-running with that seed as
`argv[2]`.

Two rules about tests in this repo:

- **Never weaken an assertion to make a case pass.** If a case fails an invariant, the case is
  wrong, not the invariant.
- A test that would have passed before the fix is worthless. When you fix a bug, revert the fix and
  confirm the new test goes red before you keep it.

## Clinical content rules

- Standard guideline management only. No local or personal practice.
- Every clinical claim must be one you can source. Anything you are unsure of is flagged for a
  doctor to review, never shipped quietly.
- `yieldNote` and every in-case message must never name the diagnosis — that is the thing the
  learner is there to work out.

## How to add a new case

1. Create `src/data/cases/myCase.ts` exporting a `CaseScaffold`. Copy the closest existing case as
   a skeleton; `src/data/cases/pancreatitis.ts` is a good, fully-featured one.

2. Fill in the required parts:

   | Field | Notes |
   |---|---|
   | `id` | `scaffold_<something>`, unique across the library |
   | `title` | Describes the *presentation*, never the diagnosis |
   | `conditionName` | The hidden diagnosis. Its content words must not appear in any learner-visible text |
   | `subject` | One of: Medicine, OBGY, Surgery, Pediatrics, Emergency, Ophthalmology, Dermatology, ENT, Orthopedics |
   | `demographics` | `{ name, age, gender, setting }` — setting is `Emergency` or `Ward` and is what the menu filters on |
   | `openingVignette` | The presentation. Must not name the condition |
   | `initialVitals` | Must cohere with the presentation |
   | `investigationsMap` | Each needs aliases, `resultText` with units and reference ranges, `turnaroundMinutes`, a category, and an `appropriateness` |
   | `therapiesMap` | Each needs aliases, `responseText`, `onsetMinutes`, `appropriateness`, and a `rationale` |
   | `criticalInterventions` | Each needs a pattern that actually matches an alias in this case, and a realistic `targetMilestoneMinutes` |

3. Register it in `src/data/cases/scaffolds.ts`.

4. **Aliases are how a case is played.** Every therapy and investigation must be reachable by the
   phrasings a doctor actually types — `inj adrenaline`, `send abg`, `iv fluids`, `ncct head`. A
   therapy nobody can name is a therapy nobody can give, and if it gates something else the case
   becomes unwinnable. Test Suite 15 checks reachability; it will not catch a phrasing you never
   thought of.

5. Grade honestly. `harmful` means it would hurt *this* patient, and must carry a rationale saying
   why. `neutral` means it changes nothing here. Do not mark something indicated because it is
   usually indicated.

6. If a therapy is unsafe before another, set `requiresFirst` and write `harmfulSequenceRationale`.
   Every key named must exist in the same `therapiesMap`.

7. Run `npm test`. Suite 14 checks library-wide invariants, Suite 15 checks the case can actually
   be played, Suite 16 checks the nudges do not give the answer away, and the invariant suite plays
   your case randomly and checks the clock and state rules hold.

8. Play it end to end by hand before you call it done. Every case that shipped broken shipped
   because someone checked the first turn and stopped.
