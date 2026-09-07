import React from 'react';

interface Props {
  onSubmit: (worry: string, differentials: string) => void;
  onSkip: () => void;
}

/**
 * The mid-case reasoning checkpoint.
 *
 * It asks; it never offers. A multiple choice here would hand over the
 * differential, which is the one thing the learner is in the case to generate.
 * Nothing in this component knows the diagnosis, so nothing here can leak it.
 *
 * It also never blocks: the composer stays live underneath, and Skip is a real
 * first-class choice rather than a nag to dismiss.
 */
export const ReasoningCheckpoint: React.FC<Props> = ({ onSubmit, onSkip }) => {
  const [worry, setWorry] = React.useState('');
  const [ddx, setDdx] = React.useState('');

  const canSubmit = worry.trim().length > 0 || ddx.trim().length > 0;

  return (
    <section
      className="fade-rise rounded-2xl px-4 py-4 my-3"
      aria-label="Pause and think"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--accent)',
        boxShadow: 'var(--elev-1)',
      }}
    >
      <p className="text-[12px] font-semibold uppercase" style={{ color: 'var(--accent)', letterSpacing: '0.07em' }}>
        Pause and think
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: 'var(--text)' }}>
        Before you carry on — what are you worried about here, and what else could this be?
      </p>
      <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        Nobody marks this while you play. It is kept so the debrief can show you what you were
        thinking at this point in the case.
      </p>

      <label className="block mt-3 text-[12px] font-medium" style={{ color: 'var(--text-muted)' }}>
        What are you worried about?
        {/* Deliberately not autofocused. This card appears while the learner
            may already be typing their next command, and pulling focus here
            would hijack it — the card is an offer, not an interruption. */}
        <textarea
          rows={2}
          value={worry}
          onChange={(e) => setWorry(e.target.value)}
          placeholder="A sentence on what is going on with this patient"
          className="mt-1 w-full rounded-xl px-3 py-2 text-[14px] resize-none ring-focus"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
        />
      </label>

      <label className="block mt-2.5 text-[12px] font-medium" style={{ color: 'var(--text-muted)' }}>
        Your differentials
        <textarea
          rows={2}
          value={ddx}
          onChange={(e) => setDdx(e.target.value)}
          placeholder="One per line, or separated by commas"
          className="mt-1 w-full rounded-xl px-3 py-2 text-[14px] resize-none ring-focus"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
        />
      </label>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => onSubmit(worry, ddx)}
          disabled={!canSubmit}
          className="btn btn-primary ring-focus rounded-xl h-9 px-4 text-[13px] font-medium disabled:opacity-40"
        >
          Save and carry on
        </button>
        <button
          onClick={onSkip}
          className="btn btn-secondary ring-focus rounded-xl h-9 px-4 text-[13px] font-medium"
        >
          Skip
        </button>
      </div>
    </section>
  );
};
