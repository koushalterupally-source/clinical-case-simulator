import { CaseSession } from '../types';
import { CASE_SCAFFOLDS } from '../data/cases/scaffolds';
import { computeSafetySummary, computeCriticalInterventionStatus } from './ccsEngine';

/**
 * What to practise next, derived from cases already finished.
 *
 * Deliberately not a score, a streak, or a level. Those measure how much you
 * have used the app, which is not the same as how ready you are, and a streak
 * rewards rushing — the one habit this simulator exists to punish. Everything
 * here answers one question: given what you have already done, what is the most
 * useful thing to open next?
 *
 * Only completed cases are read, so nothing here can reveal a diagnosis the
 * learner has not already been shown.
 */

export interface SpecialtyProgress {
  subject: string;
  attempted: number;
  available: number;
  averageScore: number | null;
  /** Attempts in which a therapy graded harmful was given. */
  unsafeAttempts: number;
}

export interface RepeatedMiss {
  /** The critical intervention, and the case it belongs to. */
  name: string;
  caseTitle: string;
  scaffoldId: string;
  omitted: number;
  delayed: number;
}

export interface ProgressSummary {
  casesCompleted: number;
  casesAvailable: number;
  averageScore: number | null;
  unsafeAttempts: number;
  bySpecialty: SpecialtyProgress[];
  /** Weakest first: attempted, and scoring below the learner's own average. */
  weakSpecialties: SpecialtyProgress[];
  repeatedMisses: RepeatedMiss[];
  /** Specialties with cases available that have never been opened. */
  untouchedSpecialties: string[];
}

function mean(xs: number[]): number | null {
  if (xs.length === 0) return null;
  return Math.round(xs.reduce((a, b) => a + b, 0) / xs.length);
}

export function computeProgress(history: CaseSession[]): ProgressSummary {
  // One entry per case attempt that actually finished and was scored.
  const scored = history.filter((s) => s.status === 'completed' && s.scorecard);

  const scoresBySubject = new Map<string, number[]>();
  const unsafeBySubject = new Map<string, number>();
  const attemptedIdsBySubject = new Map<string, Set<string>>();
  const missCounts = new Map<string, RepeatedMiss>();
  let unsafeTotal = 0;

  for (const session of scored) {
    const subject = session.subject || 'Other';
    const score = session.scorecard!.overallScore;

    if (!scoresBySubject.has(subject)) scoresBySubject.set(subject, []);
    scoresBySubject.get(subject)!.push(score);

    if (!attemptedIdsBySubject.has(subject)) attemptedIdsBySubject.set(subject, new Set());
    attemptedIdsBySubject.get(subject)!.add(session.scaffoldId);

    // Safety is the one thing worth counting separately from the score: a case
    // can score respectably and still contain something that would have hurt
    // the patient.
    let unsafe = false;
    try {
      unsafe = !computeSafetySummary(session).isSafe;
    } catch {
      /* an older stored session the current engine cannot read — skip, do not guess */
    }
    if (unsafe) {
      unsafeTotal += 1;
      unsafeBySubject.set(subject, (unsafeBySubject.get(subject) || 0) + 1);
    }

    // A step missed once is a bad day. The same step missed repeatedly is a gap.
    try {
      const scaffold = CASE_SCAFFOLDS.find((sc) => sc.id === session.scaffoldId);
      for (const crit of computeCriticalInterventionStatus(session)) {
        if (crit.status === 'done') continue;
        const key = `${session.scaffoldId}::${crit.name}`;
        const entry =
          missCounts.get(key) ||
          {
            name: crit.name,
            caseTitle: scaffold?.title || session.title,
            scaffoldId: session.scaffoldId,
            omitted: 0,
            delayed: 0,
          };
        if (crit.status === 'omitted') entry.omitted += 1;
        else entry.delayed += 1;
        missCounts.set(key, entry);
      }
    } catch {
      /* same: a session this build cannot interpret contributes nothing */
    }
  }

  const availableBySubject = new Map<string, number>();
  for (const sc of CASE_SCAFFOLDS) {
    availableBySubject.set(sc.subject, (availableBySubject.get(sc.subject) || 0) + 1);
  }

  const bySpecialty: SpecialtyProgress[] = [...availableBySubject.entries()]
    .map(([subject, available]) => ({
      subject,
      attempted: attemptedIdsBySubject.get(subject)?.size || 0,
      available,
      averageScore: mean(scoresBySubject.get(subject) || []),
      unsafeAttempts: unsafeBySubject.get(subject) || 0,
    }))
    .sort((a, b) => a.subject.localeCompare(b.subject));

  const overall = mean(scored.map((s) => s.scorecard!.overallScore));

  // "Weak" is measured against the learner's own average, not an absolute bar.
  // Someone averaging 80 has different weak areas from someone averaging 40,
  // and telling both of them the same thing helps neither.
  const weakSpecialties = bySpecialty
    .filter((s) => s.attempted > 0 && s.averageScore !== null && overall !== null && s.averageScore < overall)
    .sort((a, b) => (a.averageScore ?? 0) - (b.averageScore ?? 0));

  const repeatedMisses = [...missCounts.values()]
    .filter((m) => m.omitted + m.delayed >= 2)
    .sort((a, b) => b.omitted * 2 + b.delayed - (a.omitted * 2 + a.delayed))
    .slice(0, 6);

  const untouchedSpecialties = bySpecialty.filter((s) => s.attempted === 0).map((s) => s.subject);

  return {
    casesCompleted: new Set(scored.map((s) => s.scaffoldId)).size,
    casesAvailable: CASE_SCAFFOLDS.length,
    averageScore: overall,
    unsafeAttempts: unsafeTotal,
    bySpecialty,
    weakSpecialties,
    repeatedMisses,
    untouchedSpecialties,
  };
}
