/**
 * Tracks which cases a learner has already played, purely client-side.
 *
 * This is a convenience marker in the case library, not a source of truth —
 * losing it (private browsing, a cleared profile, a different browser) just
 * means every case looks unplayed again. Every localStorage touch is wrapped
 * in try/catch: private browsing throws on mere access, not just on writes
 * that exceed a quota.
 *
 * A case is "started" the moment `markCasePlayed` fires (App.tsx does this
 * when a session begins) and "completed" once it has a scored, saved entry
 * in the case history that `storage.ts` already keeps (App.tsx writes one
 * via `saveCompletedCase` when a scorecard is generated). Nothing new needed
 * to be recorded for the completed state — it's derived by reading that
 * existing history, so a learner's past progress is never at risk of being
 * lost or reshaped by this file.
 */

import { loadCaseHistory } from './storage';

export type CaseProgressState = 'new' | 'in-progress' | 'completed';

const PLAYED_CASES_KEY = 'ccs-played-cases';

/** Reads the set of scaffold IDs the learner has started before. Never throws. */
export function getPlayedCaseIds(): string[] {
  try {
    const raw = localStorage.getItem(PLAYED_CASES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

/** Records a scaffold as played. Silently a no-op if storage is unavailable. */
export function markCasePlayed(scaffoldId: string): void {
  if (!scaffoldId) return;
  try {
    const existing = getPlayedCaseIds();
    if (existing.includes(scaffoldId)) return;
    localStorage.setItem(PLAYED_CASES_KEY, JSON.stringify([...existing, scaffoldId]));
  } catch {
    // Private browsing or a full quota — progress just won't persist.
  }
}

/** Convenience check against the full played set. */
export function isCasePlayed(scaffoldId: string, played?: string[]): boolean {
  const ids = played || getPlayedCaseIds();
  return ids.includes(scaffoldId);
}

/**
 * Reads the set of scaffold IDs that have at least one completed, scored
 * attempt in the learner's case history. Sourced from `loadCaseHistory` in
 * `storage.ts` — the same IndexedDB/localStorage-backed store App.tsx writes
 * to via `saveCompletedCase` once a scorecard exists — rather than a second,
 * parallel record that could drift from it. Never throws: `loadCaseHistory`
 * already guards its own storage access, and any unexpected shape here just
 * falls back to an empty set.
 */
export async function getCompletedCaseIds(): Promise<string[]> {
  try {
    const history = await loadCaseHistory();
    if (!Array.isArray(history)) return [];
    const ids = new Set<string>();
    for (const session of history) {
      if (session && typeof session.scaffoldId === 'string') {
        ids.add(session.scaffoldId);
      }
    }
    return Array.from(ids);
  } catch {
    return [];
  }
}

/**
 * Combines the started and completed sets into the three-state label the
 * library shows. `completed` takes priority over `started` (a case replayed
 * after finishing it once is still "completed", not knocked back to
 * "in-progress").
 */
export function getCaseProgressState(
  scaffoldId: string,
  playedIds: string[],
  completedIds: string[]
): CaseProgressState {
  if (completedIds.includes(scaffoldId)) return 'completed';
  if (playedIds.includes(scaffoldId)) return 'in-progress';
  return 'new';
}
