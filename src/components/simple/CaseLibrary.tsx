import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CASE_SCAFFOLDS } from '../../data/cases/scaffolds';
import { CaseScaffold } from '../../types';
import {
  CaseProgressState,
  getCaseProgressState,
  getCompletedCaseIds,
  getPlayedCaseIds,
} from '../../utils/caseProgress';

interface CaseLibraryProps {
  open: boolean;
  onClose: () => void;
  /** Fires with the chosen scaffold's id and subject — the caller starts that exact case. */
  onSelect: (scaffoldId: string, subject: string) => void;
  starting?: boolean;
}

interface SubjectGroup {
  subject: string;
  cases: CaseScaffold[];
}

/** Groups a (possibly filtered) list of scaffolds by subject. */
function groupBySubject(scaffolds: CaseScaffold[]): SubjectGroup[] {
  const bySubject = new Map<string, CaseScaffold[]>();
  for (const s of scaffolds) {
    const list = bySubject.get(s.subject) || [];
    list.push(s);
    bySubject.set(s.subject, list);
  }
  return Array.from(bySubject.entries())
    .map(([subject, cases]) => ({
      subject,
      cases: [...cases].sort((a, b) => a.conditionName.localeCompare(b.conditionName)),
    }))
    .sort((a, b) => a.subject.localeCompare(b.subject));
}

// Filter option lists are derived from the data itself, sorted for a stable
// display order — a new case in a new subject or setting shows up as a
// filter option with no code change here.
const ALL_SUBJECTS = Array.from(new Set(CASE_SCAFFOLDS.map((s) => s.subject))).sort((a, b) =>
  a.localeCompare(b)
);
const ALL_SETTINGS = Array.from(new Set(CASE_SCAFFOLDS.map((s) => s.demographics.setting))).sort(
  (a, b) => a.localeCompare(b)
);

const TOTAL_CASES = CASE_SCAFFOLDS.length;

/** Small, calm status label — no icons, no colour outside the palette tokens.
 *  A "new" case gets no label at all, same as the library's previous
 *  unplayed state: silence is the default, not a badge. */
function ProgressTag({ state }: { state: CaseProgressState }) {
  if (state === 'completed') {
    return (
      <span
        className="shrink-0 px-2 py-0.5 rounded-full text-[10.5px] font-medium"
        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
      >
        Completed
      </span>
    );
  }
  if (state === 'in-progress') {
    return (
      <span
        className="shrink-0 px-2 py-0.5 rounded-full text-[10.5px] font-medium"
        style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}
      >
        In progress
      </span>
    );
  }
  return null;
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="ring-focus rounded-full px-3 py-1 text-[12px] font-medium whitespace-nowrap transition-colors"
      style={
        active
          ? { background: 'var(--accent)', color: 'var(--bg)', border: '1px solid transparent' }
          : { background: 'var(--bg)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
      }
    >
      {label}
    </button>
  );
}

/**
 * The library: every authored case, searchable and filterable, grouped by
 * subject. Unlike the random-start buttons on StartScreen, picking a case
 * here necessarily names the condition up front — that's flagged once,
 * plainly, and each row shows `conditionName` deliberately (this list exists
 * so a learner can drill management on a diagnosis they already know).
 *
 * Search and filters, however, only ever match against fields that are safe
 * to reveal before that choice is made: `title` (a symptom-led heading, e.g.
 * "Sudden Severe Scrotal Pain in an Adolescent") and `openingVignette`
 * (documented on `CaseScaffold` as written "WITHOUT naming condition/topic"),
 * plus the `subject` and `demographics.setting` facets. `conditionName` — the
 * hidden diagnosis — is never searched or filtered on, even though it is
 * shown in the row once the full list is already in front of the learner;
 * typing a symptom must not work by accident because it happens to overlap
 * a condition's name.
 */
export const CaseLibrary: React.FC<CaseLibraryProps> = ({ open, onClose, onSelect, starting }) => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [subjectFilters, setSubjectFilters] = useState<Set<string>>(new Set());
  const [settingFilters, setSettingFilters] = useState<Set<string>>(new Set());
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setPlayedIds(getPlayedCaseIds());
    // Async and best-effort: if it's slow or fails, cases just read as "new"
    // or "in progress" until it resolves — the modal never waits on it.
    let cancelled = false;
    getCompletedCaseIds().then((ids) => {
      if (!cancelled) setCompletedIds(ids);
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setExpanded({});
      setSubjectFilters(new Set());
      setSettingFilters(new Set());
      return;
    }
    // Search is the natural place to land — move focus there on open.
    const id = window.setTimeout(() => searchRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  // Escape closes the sheet. Every modal on the web does this and people press
  // it by reflex; without it a keyboard user has no way out at all, since Tab
  // walks straight past the modal into the page behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const q = query.trim().toLowerCase();
  const hasFilters = subjectFilters.size > 0 || settingFilters.size > 0;

  const filteredCases = useMemo(() => {
    return CASE_SCAFFOLDS.filter((c) => {
      if (subjectFilters.size > 0 && !subjectFilters.has(c.subject)) return false;
      if (settingFilters.size > 0 && !settingFilters.has(c.demographics.setting)) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.openingVignette.toLowerCase().includes(q)
      );
    });
  }, [q, subjectFilters, settingFilters]);

  const filteredGroups = useMemo(() => groupBySubject(filteredCases), [filteredCases]);

  if (!open) return null;

  const isExpanded = (subject: string) => !!expanded[subject] || !!q || hasFilters;
  const toggleSubject = (subject: string) =>
    setExpanded((prev) => ({ ...prev, [subject]: !prev[subject] }));

  const toggleInSet = (set: Set<string>, setSet: (s: Set<string>) => void, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setSet(next);
  };

  const clearFilters = () => {
    setQuery('');
    setSubjectFilters(new Set());
    setSettingFilters(new Set());
  };

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col justify-end sm:items-center sm:justify-center px-0 sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Case library"
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={onClose} />

      <div
        className="relative w-full sm:max-w-[36rem] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--elev-2)',
          maxHeight: '86vh',
        }}
      >
        <div
          className="flex items-center gap-2 px-4 pt-4 pb-3"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-[16px] font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              Case Library
            </h2>
            <p className="mt-0.5 text-[12.5px] leading-snug" style={{ color: 'var(--text-muted)' }}>
              Choosing a case here shows the condition before you start — use it to drill management on a
              diagnosis you already know, not to practice reaching one.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close case library"
            className="ring-focus shrink-0 w-8 h-8 rounded-full text-[18px]"
            style={{ color: 'var(--text-faint)' }}
          >
            ×
          </button>
        </div>

        <div className="px-4 pt-3 space-y-2.5">
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by symptom, subject, or presentation…"
            aria-label="Search cases"
            className="w-full rounded-xl px-3.5 py-2 text-[14px] ring-focus"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
          />

          {/* Both groups contain a chip labelled "Emergency" — one a specialty,
              one a place. Unlabelled, they read as the same control twice.
              A visible group label is what tells them apart. */}
          <div>
            <p
              className="text-[10.5px] font-semibold uppercase mb-1.5"
              style={{ color: 'var(--text-faint)', letterSpacing: '0.07em' }}
              id="filter-specialty-label"
            >
              Specialty
            </p>
            <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="filter-specialty-label">
            {ALL_SUBJECTS.map((subject) => (
              <FilterChip
                key={subject}
                label={subject}
                active={subjectFilters.has(subject)}
                onClick={() => toggleInSet(subjectFilters, setSubjectFilters, subject)}
              />
            ))}
            </div>
          </div>

          <div>
            <p
              className="text-[10.5px] font-semibold uppercase mb-1.5"
              style={{ color: 'var(--text-faint)', letterSpacing: '0.07em' }}
              id="filter-setting-label"
            >
              Where the patient is
            </p>
            <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="filter-setting-label">
            {ALL_SETTINGS.map((setting) => (
              <FilterChip
                key={setting}
                label={setting}
                active={settingFilters.has(setting)}
                onClick={() => toggleInSet(settingFilters, setSettingFilters, setting)}
              />
            ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <p className="text-[11.5px]" style={{ color: 'var(--text-faint)' }}>
              {filteredCases.length} of {TOTAL_CASES} case{TOTAL_CASES === 1 ? '' : 's'}
            </p>
            {(q || hasFilters) && (
              <button
                onClick={clearFilters}
                className="ring-focus text-[11.5px] font-medium underline decoration-dotted underline-offset-2"
                style={{ color: 'var(--accent)' }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {filteredGroups.length === 0 && (
            <div className="px-3 py-8 text-center">
              <p className="text-[13px]" style={{ color: 'var(--text-faint)' }}>
                No cases match{q ? ` “${query}”` : ' these filters'}.
              </p>
              <button
                onClick={clearFilters}
                className="ring-focus mt-3 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                Clear filters
              </button>
            </div>
          )}

          {filteredGroups.map((group) => {
            const open = isExpanded(group.subject);
            return (
              <div
                key={group.subject}
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
              >
                <button
                  onClick={() => toggleSubject(group.subject)}
                  className="ring-focus w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>
                    {group.subject}
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px]" style={{ color: 'var(--text-faint)' }}>
                      {group.cases.length}
                    </span>
                    <span
                      className="text-[11px] leading-none transition-transform"
                      style={{
                        color: 'var(--text-faint)',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      ▾
                    </span>
                  </span>
                </button>

                {open && (
                  <div className="px-2 pb-2 space-y-1">
                    {group.cases.map((c) => {
                      const invCount = Object.keys(c.investigationsMap || {}).length;
                      const txCount = Object.keys(c.therapiesMap || {}).length;
                      const progressState = getCaseProgressState(c.id, playedIds, completedIds);
                      return (
                        <button
                          key={c.id}
                          onClick={() => onSelect(c.id, c.subject)}
                          disabled={starting}
                          className="ring-focus w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors disabled:opacity-50"
                          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                        >
                          <span className="min-w-0">
                            <span className="block text-[13.5px] font-medium truncate" style={{ color: 'var(--text)' }}>
                              {c.conditionName}
                            </span>
                            <span className="block text-[11.5px] mt-0.5" style={{ color: 'var(--text-faint)' }}>
                              {c.demographics.setting} · {invCount} investigation{invCount === 1 ? '' : 's'} · {txCount} therap
                              {txCount === 1 ? 'y' : 'ies'}
                            </span>
                          </span>
                          <ProgressTag state={progressState} />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
