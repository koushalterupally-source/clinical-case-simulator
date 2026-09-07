import React from 'react';
import { CaseSession } from '../../types';
import { computeGameStats } from '../../utils/gamification';
import {
  buildCaseTimeline,
  computeCriticalInterventionStatus,
  computeSafetySummary,
  computeInvestigationQuality,
  computeTreatmentAppropriateness,
  TimelineEvent,
} from '../../utils/ccsEngine';
import { checkpointCaughtIt } from '../../utils/ccsEngine';

interface ScorecardProps {
  session: CaseSession;
  onNewCase: () => void;
  onBack: () => void;
}

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="py-4" style={{ borderTop: '1px solid var(--border)' }}>
    <div className="text-[13px] mb-1.5" style={{ color: 'var(--text-muted)' }}>
      {label}
    </div>
    <div className="text-[15px] leading-relaxed">{children}</div>
  </div>
);

/** Colour for a three-way clinical grade, shared by the timeline dots and the
 *  inline appropriateness labels. Neutral/ungraded uses the same muted tone
 *  as an unmodelled order — it is not a judgement, just "not indicated". */
function graderColor(grade?: 'indicated' | 'neutral' | 'harmful'): string {
  if (grade === 'indicated') return 'var(--ok)';
  if (grade === 'harmful') return 'var(--danger)';
  if (grade === 'neutral') return 'var(--warn)';
  return 'var(--text-faint)';
}

/** Fallback consequence strings the engine writes when a case has no authored
 *  milestone for a gate (defensive path only — every gate is built from a
 *  gateMilestone, so this should not normally trigger). Never surfaced as a
 *  "what this led to" line, since that would present generic copy as a
 *  clinical fact the case never actually stated. */
const GENERIC_GATE_CONSEQUENCES = new Set([
  'Suboptimal clinical choice made.',
  'Standard clinical outcome.',
  'Decision executed correctly.',
]);

const TIMELINE_KIND_LABEL: Record<TimelineEvent['kind'], string> = {
  order: 'Ordered',
  therapy: 'Given',
  gate: 'Decision',
  note: 'Action',
};

const CriticalStatusLabel: Record<'done' | 'delayed' | 'omitted', string> = {
  done: 'done',
  delayed: 'delayed',
  omitted: 'omitted',
};

function criticalStatusColor(status: 'done' | 'delayed' | 'omitted'): string {
  if (status === 'done') return 'var(--ok)';
  if (status === 'delayed') return 'var(--warn)';
  return 'var(--danger)';
}

export const Scorecard: React.FC<ScorecardProps> = ({ session, onNewCase, onBack }) => {
  const card = session.scorecard;
  const stats = computeGameStats(session);
  if (!card) return null;

  const earned = stats.badges.filter((b) => b.earned);

  // Teaching sub-scores and the debrief timeline: computed fresh from the
  // session (turns, completedOrders, therapyLog, decisionGates) rather than
  // stored on the scorecard, so nothing in generateScorecard had to change.
  // All are scaffold-based, so a question-led run (no simulated patient
  // behind it) skips them rather than showing hollow, all-empty sections.
  const timeline = session.isQuestionLed ? [] : buildCaseTimeline(session);
  const criticalStatuses = session.isQuestionLed ? [] : computeCriticalInterventionStatus(session);
  const safety = session.isQuestionLed ? null : computeSafetySummary(session);
  const investigationQuality = session.isQuestionLed ? null : computeInvestigationQuality(session);
  const treatmentAppropriateness = session.isQuestionLed ? null : computeTreatmentAppropriateness(session);
  const criticalDoneCount = criticalStatuses.filter((c) => c.status === 'done').length;

  return (
    <div className="min-h-screen px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[46rem] mx-auto py-10">
        <button
          onClick={onBack}
          className="text-[13px] mb-8 ring-focus rounded px-1"
          style={{ color: 'var(--text-muted)' }}
        >
          ← Back to case
        </button>

        <h1 className="font-display text-[22px] font-semibold tracking-tight">Case complete</h1>
        <p className="mt-1.5 text-[15px]" style={{ color: 'var(--text-muted)' }}>
          {session.patient.name} · {card.finalDiagnosis}
        </p>

        {/* Headline numbers */}
        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
          {[
            { v: `${session.completedOrders?.length || 0}`, l: 'orders completed' },
            { v: `${stats.incidentalsCaught}/${stats.incidentalsTotal}`, l: 'incidentals managed' },
            { v: `${card.overallScore}%`, l: 'clinical score' },
            { v: `Grade ${card.overallGrade}`, l: 'competency' },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-[26px] font-semibold tnum leading-none">{s.v}</div>
              <div className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {(() => {
            // What the learner said they were worried about, mid-case, against
            // what it turned out to be. Shown BEFORE the diagnosis below, so it
            // reads in the order it happened rather than as hindsight.
            const cp = checkpointCaughtIt(session, card.finalDiagnosis);
            if (!cp.asked) return null;
            const worry = session.reasoningCheckpoints?.find((c) => !c.skipped);
            return (
              <Row label="What you were thinking at the time">
                {worry?.worry && (
                  <p className="mb-2" style={{ color: 'var(--text)' }}>
                    “{worry.worry}”
                    <span className="text-[12.5px]" style={{ color: 'var(--text-faint)' }}>
                      {' '}— {worry.simTime}
                    </span>
                  </p>
                )}
                {cp.listed.length > 0 && (
                  <p className="mb-2" style={{ color: 'var(--text-muted)' }}>
                    Your differentials: {cp.listed.join(' · ')}
                  </p>
                )}
                <p style={{ color: cp.caught ? 'var(--ok)' : 'var(--warn)' }}>
                  {cp.caught
                    ? 'It was on your list. Whatever else went right or wrong here, you were thinking about the correct thing while the patient was still in front of you.'
                    : 'It does not look like it was on your list. That is worth sitting with more than any score on this page — work back through what you had at that point and ask what would have put it there.'}
                </p>
              </Row>
            );
          })()}

          <Row label="Final Diagnosis & Clinching Clue">
            <div className="font-medium text-[16px] mb-1" style={{ color: 'var(--text)' }}>
              {card.finalDiagnosis}
            </div>
            <div>
              {card.clinchingClue}
              {card.clinchingTime && (
                <span style={{ color: 'var(--text-muted)' }}> — available from {card.clinchingTime}</span>
              )}
            </div>
          </Row>

          {timeline.length > 0 && (
            <Row label="Timeline">
              <div className="space-y-4">
                {timeline.map((ev, i) => (
                  <div key={i} className="flex gap-3">
                    <span
                      className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: graderColor(ev.appropriateness) }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] tnum" style={{ color: 'var(--text-faint)' }}>
                        {ev.time} · {TIMELINE_KIND_LABEL[ev.kind]}
                      </div>
                      <div className="text-[14px] break-words">
                        {ev.label}
                        {ev.appropriateness && (
                          <span
                            className="ml-2 text-[11px] uppercase tracking-wide align-middle"
                            style={{ color: graderColor(ev.appropriateness) }}
                          >
                            {/* A decision gate is right or wrong, not "indicated"/"harmful" —
                                that wording belongs to orders and therapies. Same colour, a
                                label that actually fits what the event is. */}
                            {ev.kind === 'gate'
                              ? ev.appropriateness === 'indicated'
                                ? 'correct'
                                : 'incorrect'
                              : ev.appropriateness}
                          </span>
                        )}
                      </div>
                      {ev.detail && (
                        <div
                          className="text-[13px] mt-0.5 break-words whitespace-pre-line"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {ev.detail}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Row>
          )}

          {(safety || investigationQuality || treatmentAppropriateness || criticalStatuses.length > 0) && (
            <Row label="How this was scored">
              <div className="space-y-4">
                {safety && (
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: safety.isSafe ? 'var(--ok)' : 'var(--danger)' }}
                      />
                      <span className="text-[14px] font-medium">Safety</span>
                      <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                        {safety.isSafe ? 'no harmful therapy' : `${safety.harmfulEvents.length} harmful therapy administration${safety.harmfulEvents.length === 1 ? '' : 's'}`}
                      </span>
                    </div>
                    <div className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>
                      {safety.explanation}
                    </div>
                  </div>
                )}

                {criticalStatuses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{
                          background:
                            criticalDoneCount === criticalStatuses.length ? 'var(--ok)' : 'var(--warn)',
                        }}
                      />
                      <span className="text-[14px] font-medium">Time to critical intervention</span>
                      <span className="text-[13px] tnum" style={{ color: 'var(--text-muted)' }}>
                        {criticalDoneCount}/{criticalStatuses.length} on time
                      </span>
                    </div>
                    <div className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>
                      Each time-critical step is checked against the case's own target window — see Critical
                      actions below for each one.
                    </div>
                  </div>
                )}

                {investigationQuality && (
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{
                          background:
                            investigationQuality.gradedTotal === 0
                              ? 'var(--text-faint)'
                              : investigationQuality.harmfulCount > 0
                              ? 'var(--danger)'
                              : 'var(--ok)',
                        }}
                      />
                      <span className="text-[14px] font-medium">Investigation quality</span>
                      <span className="text-[13px] tnum" style={{ color: 'var(--text-muted)' }}>
                        {investigationQuality.gradedTotal === 0 ? 'n/a' : `${investigationQuality.percentage}%`}
                      </span>
                    </div>
                    <div className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>
                      {investigationQuality.explanation}
                    </div>
                  </div>
                )}

                {treatmentAppropriateness && (
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{
                          background:
                            treatmentAppropriateness.gradedTotal === 0
                              ? 'var(--text-faint)'
                              : treatmentAppropriateness.harmfulCount > 0
                              ? 'var(--danger)'
                              : 'var(--ok)',
                        }}
                      />
                      <span className="text-[14px] font-medium">Treatment appropriateness</span>
                      <span className="text-[13px] tnum" style={{ color: 'var(--text-muted)' }}>
                        {treatmentAppropriateness.gradedTotal === 0 ? 'n/a' : `${treatmentAppropriateness.percentage}%`}
                      </span>
                    </div>
                    <div className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>
                      {treatmentAppropriateness.explanation}
                    </div>
                  </div>
                )}
              </div>
            </Row>
          )}

          {criticalStatuses.length > 0 && (
            <Row label="Critical actions">
              <div className="space-y-2.5">
                {criticalStatuses.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <span
                      className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: criticalStatusColor(c.status) }}
                    />
                    <div className="min-w-0 flex-1">
                      <div>
                        {c.name}{' '}
                        <span
                          className="text-[12px] uppercase tracking-wide"
                          style={{ color: criticalStatusColor(c.status) }}
                        >
                          {CriticalStatusLabel[c.status]}
                        </span>
                      </div>
                      <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                        {c.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Row>
          )}

          {card.criticalDelays.length > 0 && criticalStatuses.length === 0 && (
            <Row label="Critical Delays / Misses">
              <div className="space-y-2">
                {card.criticalDelays.map((del, i) => (
                  <div key={i} className="flex gap-2.5 text-[14px]" style={{ color: 'var(--danger)' }}>
                    <span>⚠️</span>
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </Row>
          )}

          {card.therapiesGiven.length > 0 && (
            <Row label="Therapies given">
              <div className="space-y-3">
                {card.therapiesGiven.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <span
                      className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          t.appropriateness === 'indicated'
                            ? 'var(--ok)'
                            : t.appropriateness === 'harmful'
                            ? 'var(--danger)'
                            : 'var(--text-faint)',
                      }}
                    />
                    <div>
                      <div>
                        {t.orderName}{' '}
                        <span
                          className="text-[12px] uppercase tracking-wide"
                          style={{
                            color:
                              t.appropriateness === 'indicated'
                                ? 'var(--ok)'
                                : t.appropriateness === 'harmful'
                                ? 'var(--danger)'
                                : 'var(--text-faint)',
                          }}
                        >
                          {t.appropriateness}
                        </span>
                      </div>
                      <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                        {t.rationale}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Row>
          )}

          {card.overOrderingList.length > 0 && (
            <Row label="Unindicated Investigations">
              <div className="space-y-1.5 text-[14px]" style={{ color: 'var(--text-muted)' }}>
                {card.overOrderingList.map((ord, i) => (
                  <div key={i}>• {ord}</div>
                ))}
              </div>
            </Row>
          )}

          {card.unmodelledList.length > 0 && (
            <Row label="Not modelled in this case">
              <div className="space-y-1.5 text-[14px]" style={{ color: 'var(--text-muted)' }}>
                {card.unmodelledList.map((ord, i) => (
                  <div key={i}>• {ord}</div>
                ))}
              </div>
            </Row>
          )}

          {card.gateResults.length > 0 && (
            <Row label="Decisions">
              <div className="space-y-2.5">
                {card.gateResults.map((g) => (
                  <div key={g.qid} className="flex gap-3">
                    <span
                      className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: g.isCorrect ? 'var(--ok)' : 'var(--danger)' }}
                    />
                    <div className="min-w-0 flex-1">
                      <div>{g.concept}</div>
                      <div className="text-[13px] tnum" style={{ color: 'var(--text-faint)' }}>
                        {g.qid} · {g.examYear} · you chose {g.userChoice || 'none'}, answer {g.correctChoice}
                      </div>
                      {!g.isCorrect && g.consequence && !GENERIC_GATE_CONSEQUENCES.has(g.consequence) && (
                        <div className="text-[13px] mt-1 break-words" style={{ color: 'var(--danger)' }}>
                          What this led to: {g.consequence}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Row>
          )}

          {card.incidentalFindingsReport.length > 0 && (
            <Row label="Incidental findings">
              <div className="space-y-2.5">
                {card.incidentalFindingsReport.map((inc, i) => (
                  <div key={i} className="flex gap-3">
                    <span
                      className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          inc.status === 'noticed_addressed' ? 'var(--ok)' : 'var(--text-muted)',
                      }}
                    />
                    <div>
                      <div>{inc.title}</div>
                      <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                        {inc.outcome}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Row>
          )}

          {card.topConceptsToRevise && card.topConceptsToRevise.length > 0 && (
            <Row label="Revise these">
              <ul className="space-y-1.5">
                {card.topConceptsToRevise.map((c, i) => (
                  <li key={i}>
                    {c.concept}
                    <span className="text-[13px] tnum" style={{ color: 'var(--text-faint)' }}>
                      {' '}
                      · {(c.sourceQIDs || []).join(', ')}
                    </span>
                  </li>
                ))}
              </ul>
            </Row>
          )}

          {earned.length > 0 && (
            <Row label="Earned">
              <div className="flex flex-wrap gap-2">
                {earned.map((b) => (
                  <span
                    key={b.id}
                    title={b.description}
                    className="rounded-full px-3 py-1 text-[13px]"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </Row>
          )}
        </div>

        <button
          onClick={onNewCase}
          className="mt-8 w-full rounded-xl py-3 text-[15px] font-medium ring-focus"
          style={{ background: 'var(--accent)', color: 'var(--bg)' }}
        >
          Start another case
        </button>
      </div>
    </div>
  );
};
