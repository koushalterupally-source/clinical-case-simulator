/**
 * Tracks which cases a learner has already played, purely client-side.
 *
 * This is a convenience marker in the case library, not a source of truth —
 * losing it (private browsing, a cleared profile, a different browser) just
 * means every case looks unplayed again. Every localStorage touch is wrapped
 * in try/catch: private browsing throws on mere access, not just on writes
 * that exceed a quota.
 */

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
