import React from 'react';

interface ComposerProps {
  onSend: (command: string) => void;
  onOpenOrders: () => void;
  disabled?: boolean;
  busy?: boolean;
}

/** Quick actions that don't warrant opening the sheet. */
const SUGGESTIONS = [
  { label: 'ECG', cmd: 'order: 12-lead ECG' },
  { label: 'ABG', cmd: 'order: ABG' },
  { label: 'Recheck vitals', cmd: 'pe: Vitals recheck' },
  { label: 'Wait 30 min', cmd: 'advance 30 minutes' },
];

export const Composer: React.FC<ComposerProps> = ({ onSend, onOpenOrders, disabled, busy }) => {
  const [text, setText] = React.useState('');
  const [showHelp, setShowHelp] = React.useState(false);
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const v = text.trim();
    if (!v || disabled || busy) return;
    onSend(v);
    setText('');
  };

  // Grow with content, up to a few lines.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
  }, [text]);

  return (
    // Lives inside CaseView's non-scrolling footer, so this is just padding
    // around the actual controls — no sticky positioning or fade needed,
    // the parent already keeps it pinned below the transcript.
    <div className="pt-3" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      {showHelp && (
        <div
          className="mb-3 rounded-xl px-4 py-3 text-[13px] leading-relaxed fade-rise"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ color: 'var(--text)' }} className="font-medium mb-1">
            You can write plainly, or use a prefix:
          </p>
          <p>
            <code>order:</code> tests, drugs, procedures · <code>hx:</code> ask the patient ·{' '}
            <code>pe:</code> examine a system · <code>move to</code> ICU / ward / OT ·{' '}
            <code>advance</code> 2 hours
          </p>
        </div>
      )}

      {!text && (
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              onClick={() => !disabled && onSend(s.cmd)}
              disabled={disabled || busy}
              className="btn chip rounded-full px-3 py-1.5 text-[13px] ring-focus disabled:opacity-40"
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => setShowHelp((v) => !v)}
            className="btn rounded-full px-2.5 py-1.5 text-[13px] ring-focus"
            style={{ color: 'var(--text-muted)' }}
          >
            {showHelp ? 'Hide typing tips' : 'Typing tips'}
          </button>
        </div>
      )}

      <div
        className="flex items-end gap-2 rounded-2xl px-3 py-2"
        style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', boxShadow: 'var(--elev-1)' }}
      >
        <button
          onClick={onOpenOrders}
          disabled={disabled}
          aria-label="Open order sheet"
          title="Orders, history and examination"
          className="btn btn-secondary shrink-0 h-8 px-3 rounded-full text-[13px] font-medium ring-focus disabled:opacity-40"
        >
          + Orders
        </button>

        <textarea
          ref={ref}
          rows={1}
          value={text}
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={disabled ? 'Case complete' : 'What do you do?'}
          className="flex-1 bg-transparent resize-none py-1.5 text-[15px] outline-none"
          style={{ color: 'var(--text)' }}
        />

        <button
          onClick={submit}
          disabled={!text.trim() || disabled || busy}
          aria-label="Send"
          className="btn btn-primary shrink-0 w-8 h-8 rounded-full flex items-center justify-center ring-focus disabled:opacity-25"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
