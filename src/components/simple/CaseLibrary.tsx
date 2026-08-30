import React, { useEffect, useMemo, useState } from 'react';
import { CASE_SCAFFOLDS } from '../../data/cases/scaffolds';
import { CaseScaffold } from '../../types';
import { getPlayedCaseIds } from '../../utils/caseProgress';

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

/** Groups the scaffold library by subject, derived from the data — a new
 *  case in a new subject shows up here with no code change. */
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

const ALL_GROUPS = groupBySubject(CASE_SCAFFOLDS);

/**
 * The library: every authored case, grouped by subject and searchable.
 * Unlike the random-start buttons on StartScreen, picking a case here
 * necessarily names the condition up front — that's flagged once, plainly,
 * rather than hidden.
 */
export const CaseLibrary: React.FC<CaseLibraryProps> = ({ open, onClose, onSelect, starting }) => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [playedIds, setPlayedIds] = useState<string[]>([]);

  useEffect(() => {
    if (open) setPlayedIds(getPlayedCaseIds());
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setExpanded({});
    }
  }, [open]);

  const q = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    if (!q) return ALL_GROUPS;
    return ALL_GROUPS.map((g) => ({
      subject: g.subject,
      cases: g.cases.filter(
        (c) => c.conditionName.toLowerCase().includes(q) || g.subject.toLowerCase().includes(q)
      ),
    })).filter((g) => g.cases.length > 0);
  }, [q]);

  if (!open) return null;

  const isExpanded = (subject: string) => !!expanded[subject] || !!q;
  const toggleSubject = (subject: string) =>
    setExpanded((prev) => ({ ...prev, [subject]: !prev[subject] }));

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end sm:items-center sm:justify-center px-0 sm:px-4">
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

        <div className="px-4 pt-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by condition or subject…"
            className="w-full rounded-xl px-3.5 py-2 text-[14px] ring-focus"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {filteredGroups.length === 0 && (
            <p className="px-1 py-6 text-center text-[13px]" style={{ color: 'var(--text-faint)' }}>
              No cases match “{query}”.
            </p>
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
                      const played = playedIds.includes(c.id);
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
                              {invCount} investigation{invCount === 1 ? '' : 's'} · {txCount} therap
                              {txCount === 1 ? 'y' : 'ies'}
                            </span>
                          </span>
                          {played && (
                            <span
                              className="shrink-0 px-2 py-0.5 rounded-full text-[10.5px] font-medium"
                              style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                            >
                              Played
                            </span>
                          )}
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
