# Clinical Case Simulator

An offline-first, deterministic clinical case simulator for postgraduate medical exam
preparation. 38 authored emergency and ward cases across 9 specialties. Everything runs in the browser —
no server, no account, no analytics, no data leaves the device.

**Educational use only.** This is a teaching simulation, not a substitute for supervised clinical
training or your local protocols.

## What it does

- **Play a case as the treating doctor.** Take a history, examine, order investigations, give
  drugs, do procedures, escalate, and move the patient — by typing the way you would say it, or
  from the order sheet.
- **A clinical clock that costs you something.** Every action takes time, results come back after a
  real turnaround, and a patient left untreated deteriorates while you think.
- **Escalating prompts when you are stuck.** The nurse, then the registrar, tell you something
  time-critical is outstanding — without naming the diagnosis.
- **Honest gaps.** An order the case does not model says so. The engine never invents a lab value.
- **An end-of-case debrief** with what you did, when, what it was worth, and what you missed.
- **Offline after the first load**, installable as a PWA, with light and dark themes.

## Getting started

```bash
npm install
npm run dev      # development server
npm run lint     # tsc --noEmit
npm test         # behavioural + invariant suites
npm run build    # production build
```

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how it fits together, the engine contract, the
  invariants, persistence, the service worker, test commands, and **how to add a new case**.
- [`CASE_MODEL.md`](CASE_MODEL.md) — the treatment model each case follows (indicated / neutral /
  harmful, sequence safety, lab shifts).

## Data and privacy

Sessions and progress live in browser IndexedDB (`PYQ_CCS_Simulator_DB`) with a localStorage
fallback. Nothing is transmitted anywhere. Clearing site data clears everything.
