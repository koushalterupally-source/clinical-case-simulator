import React from 'react';
import { CaseSession } from '../../types';
import { Transcript } from './Transcript';
import { Composer } from './Composer';
import { OrderSheet } from './OrderSheet';
import { formatSimTime } from '../../utils/ccsEngine';

interface CaseViewProps {
  session: CaseSession;
  onSendCommand: (command: string) => void;
  onCommitGateAnswer?: (answer: string, gateIndex?: number) => void;
  isProcessing: boolean;
  onEndCase: () => void;
}

/** Reading measure shared by the header, transcript and composer so their
 *  edges line up in one column instead of three independently-sized ones. */
const MEASURE = 'max-w-[46rem]';

export const CaseView: React.FC<CaseViewProps> = ({
  session,
  onSendCommand,
  isProcessing,
  onEndCase,
}) => {
  const done = session.status === 'completed';
  const [ordersOpen, setOrdersOpen] = React.useState(false);

  const pendingCount = session.pendingOrders?.length || 0;
  const displayName = session.isQuestionLed ? session.title : session.patient.name;

  return (
    // A real flex column pinned to the viewport height — not min-h-screen —
    // so the composer is a true footer next to the scroll area rather than
    // the last thing in a page that happens to be shorter than the window.
    // That was the source of the "floating in empty ground" feel: on a short
    // transcript the old sticky-bottom composer just sat wherever the
    // content ended, with a wall of empty background stretching below it.
    <div className="flex flex-col overflow-hidden" style={{ height: '100dvh', background: 'var(--bg)' }}>
      <OrderSheet
        open={ordersOpen}
        onClose={() => setOrdersOpen(false)}
        onSubmit={onSendCommand}
        scaffoldId={session.isQuestionLed ? undefined : session.scaffoldId}
      />

      {/* Clinical status bar: patient identity and the running clock are the
          two things worth reading at a glance; everything else is quieter. */}
      <header
        className="shrink-0"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', boxShadow: 'var(--elev-1)' }}
      >
        <div className={`${MEASURE} mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3`}>
          <div className="min-w-0">
            <h1
              className="font-display text-[17px] sm:text-[19px] font-semibold leading-tight truncate"
              style={{ color: 'var(--text)' }}
            >
              {displayName}
              {!session.isQuestionLed && (
                <span className="font-sans text-[12px] font-normal ml-1.5 align-middle" style={{ color: 'var(--text-muted)' }}>
                  {session.patient.age}{session.patient.gender === 'Male' ? 'M' : 'F'}
                </span>
              )}
            </h1>
            <div className="mt-0.5 flex items-center gap-1.5 text-[12px] truncate">
              <span className="tnum font-medium" style={{ color: 'var(--text)' }}>
                {formatSimTime(session.simTime)}
              </span>
              {!session.isQuestionLed && (
                <>
                  <span aria-hidden style={{ color: 'var(--text-faint)' }}>·</span>
                  <span className="truncate" style={{ color: 'var(--text-muted)' }}>{session.currentLocation}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOrdersOpen(true)}
              className="btn btn-secondary ring-focus rounded-xl h-9 px-3.5 text-[13px] font-medium flex items-center gap-1.5"
            >
              Orders
              {pendingCount > 0 && (
                <span
                  className="tnum rounded-full text-[11px] font-bold leading-none px-1.5 py-1"
                  style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                >
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={onEndCase}
              className={`btn ${done ? 'btn-primary' : 'btn-secondary'} ring-focus rounded-xl h-9 px-3.5 text-[13px] font-medium whitespace-nowrap`}
            >
              {done ? 'View scorecard' : 'End case'}
            </button>
          </div>
        </div>
      </header>

      {/* The only scrolling region — the composer below never moves with it. */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6">
        <div className={`${MEASURE} mx-auto pt-6 pb-8`}>
          <Transcript session={session}>
            {isProcessing && (
              <div className="text-[14px] py-2 flex items-center gap-2.5" style={{ color: 'var(--text-muted)' }}>
                <span
                  aria-hidden
                  className="inline-block w-3.5 h-3.5 rounded-full animate-spin shrink-0"
                  style={{ border: '2px solid var(--border)', borderTopColor: 'var(--accent)' }}
                />
                Processing clinical turn…
              </div>
            )}
          </Transcript>

          {/* Case complete banner */}
          {done && (
            <div
              className="mt-8 rounded-2xl p-6 text-center fade-rise"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', boxShadow: 'var(--elev-1)' }}
            >
              <h2 className="font-display text-[18px] font-semibold" style={{ color: 'var(--text)' }}>
                Patient Management Concluded
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The simulation has ended. Review your clinical investigations, turnaround decisions, critical life-saving interventions, and diagnostic accuracy.
              </p>
              <button
                onClick={onEndCase}
                className="btn btn-primary mt-5 px-6 py-2.5 rounded-xl text-[14px] font-semibold ring-focus"
              >
                View Comprehensive Clinical Scorecard
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Anchored footer — always the last thing on screen, never the
          scroll area, so it reads as the fixed place you act from. */}
      {!done && (
        <div
          className="shrink-0 px-4 sm:px-6"
          style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
        >
          <div className={`${MEASURE} mx-auto`}>
            <Composer
              onSend={onSendCommand}
              onOpenOrders={() => setOrdersOpen(true)}
              disabled={done}
              busy={isProcessing}
            />
          </div>
        </div>
      )}
    </div>
  );
};
