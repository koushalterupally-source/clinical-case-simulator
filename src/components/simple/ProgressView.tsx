import React from 'react';
import { CaseSession } from '../../types';
import { loadCaseHistory } from '../../utils/storage';
import { computeProgress, ProgressSummary } from '../../utils/progress';

interface Props {
  onBack: () => void;
  onPractise: (subject: string) => void;
  /** Re-open one specific case — the whole point of naming a step you keep
   *  missing is being able to go and do it again. */
  onPractiseCase: (scaffoldId: string) => void;
}

/**
 * What to practise next.
 *
 * No XP, no streak, no level. A streak rewards playing every day, which is not
 * the same as being ready, and rewarding speed is the exact habit this
 * simulator exists to punish. Every number here is in service of one question:
 * what should you open next?
 */
export const ProgressView: React.FC<Props> = ({ onBack, onPractise, onPractiseCase }) => {
  const [summary, setSummary] = React.useState<ProgressSummary | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      let history: CaseSession[] = [];
      try {
        history = await loadCaseHistory();
      } catch {
        // Storage can be unreadable in private browsing; an empty history is
        // the honest answer, not an error screen.
      }
      if (!alive) return;
      setSummary(computeProgress(history));
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="min-h-screen px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[46rem] mx-auto py-8">
        <button
          onClick={onBack}
          className="text-[13px] mb-6 ring-focus rounded px-1"
          style={{ color: 'var(--text-muted)' }}
        >
          ← Back
        </button>

        <h1 className="font-display text-[24px] font-bold tracking-tight">Your progress</h1>

        {loading && (
          <p className="mt-4 text-[14px]" style={{ color: 'var(--text-muted)' }}>
            Reading your case history…
          </p>
        )}

        {!loading && summary && summary.casesCompleted === 0 && (
          <div className="mt-4">
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Nothing here yet. Finish a case and this page will start telling you where your gaps
              are — which specialties you score worst in, and which time-critical steps you keep
              missing.
            </p>
            <button
              onClick={() => onPractise('All')}
              className="mt-4 rounded-xl py-3 px-5 text-[14px] font-semibold ring-focus"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              Start a case
            </button>
          </div>
        )}

        {!loading && summary && summary.casesCompleted > 0 && (
          <>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-px rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--border)', background: 'var(--border)' }}>
              <Stat label="Cases finished" value={`${summary.casesCompleted} of ${summary.casesAvailable}`} />
              <Stat label="Average score" value={summary.averageScore === null ? '—' : `${summary.averageScore}%`} />
              <Stat
                label="Attempts with a harmful order"
                value={String(summary.unsafeAttempts)}
                tone={summary.unsafeAttempts > 0 ? 'danger' : 'normal'}
              />
            </div>

            {summary.unsafeAttempts > 0 && (
              <p className="mt-3 text-[13px] leading-relaxed" style={{ color: 'var(--danger)' }}>
                {summary.unsafeAttempts === 1 ? 'One attempt' : `${summary.unsafeAttempts} attempts`} included
                something graded harmful for that patient. That matters more than any average on this
                page — a case can score respectably and still contain an order that would have hurt
                someone.
              </p>
            )}

            {summary.repeatedMisses.length > 0 && (
              <Section title="Steps you keep missing">
                <p className="mb-3 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                  Missed once is a bad day. Missed twice is a gap worth closing.
                </p>
                <ul className="space-y-2.5">
                  {summary.repeatedMisses.map((m) => (
                    <li key={`${m.scaffoldId}-${m.name}`}>
                      <button
                        onClick={() => onPractiseCase(m.scaffoldId)}
                        className="w-full text-left ring-focus rounded-xl px-3 py-2.5"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                      >
                        <span className="block text-[14px]" style={{ color: 'var(--text)' }}>
                          {m.name}
                        </span>
                        <span className="block text-[12.5px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {m.caseTitle} — {m.omitted > 0 && `never done ${m.omitted} time${m.omitted === 1 ? '' : 's'}`}
                          {m.omitted > 0 && m.delayed > 0 && ', '}
                          {m.delayed > 0 && `late ${m.delayed} time${m.delayed === 1 ? '' : 's'}`}
                        </span>
                        <span className="block text-[12px] mt-1" style={{ color: 'var(--accent)' }}>
                          Play this case again
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {summary.weakSpecialties.length > 0 && (
              <Section title="Where you score below your own average">
                <div className="flex flex-wrap gap-2">
                  {summary.weakSpecialties.map((s) => (
                    <button
                      key={s.subject}
                      onClick={() => onPractise(s.subject)}
                      className="ring-focus rounded-xl px-3 py-2 text-left"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                    >
                      <span className="block text-[13.5px] font-medium" style={{ color: 'var(--text)' }}>
                        {s.subject}
                      </span>
                      <span className="block text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {s.averageScore}% over {s.attempted} case{s.attempted === 1 ? '' : 's'} — practise
                      </span>
                    </button>
                  ))}
                </div>
              </Section>
            )}

            <Section title="By specialty">
              <ul className="space-y-2">
                {summary.bySpecialty.map((s) => (
                  <li key={s.subject} className="flex items-baseline justify-between gap-3 text-[13.5px]">
                    <span className="min-w-0 truncate" style={{ color: 'var(--text)' }}>{s.subject}</span>
                    <span className="shrink-0 tnum" style={{ color: 'var(--text-muted)' }}>
                      {s.attempted}/{s.available}
                      {s.averageScore !== null && ` · ${s.averageScore}%`}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {summary.untouchedSpecialties.length > 0 && (
              <Section title="Not opened yet">
                <div className="flex flex-wrap gap-2">
                  {summary.untouchedSpecialties.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => onPractise(subject)}
                      className="ring-focus rounded-full px-3 py-1.5 text-[13px]"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </Section>
            )}

            <p className="mt-8 text-[12px] leading-relaxed" style={{ color: 'var(--text-faint)' }}>
              Everything here is computed on this device from cases you have finished. Nothing is
              sent anywhere.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string; tone?: 'normal' | 'danger' }> = ({
  label,
  value,
  tone = 'normal',
}) => (
  <div className="px-3 py-3" style={{ background: 'var(--surface)' }}>
    <div
      className="text-[10px] font-semibold uppercase"
      style={{ color: 'var(--text-faint)', letterSpacing: '0.08em' }}
    >
      {label}
    </div>
    <div
      className="mt-1 text-[17px] tnum font-semibold"
      style={{ color: tone === 'danger' ? 'var(--danger)' : 'var(--text)' }}
    >
      {value}
    </div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mt-7">
    <h2
      className="text-[11px] font-semibold uppercase mb-2"
      style={{ color: 'var(--text-faint)', letterSpacing: '0.08em' }}
    >
      {title}
    </h2>
    {children}
  </section>
);
