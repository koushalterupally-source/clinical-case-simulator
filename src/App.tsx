import React, { useState, useEffect } from 'react';
import { CaseView } from './components/simple/CaseView';
import { StartScreen } from './components/simple/StartScreen';
import { ProgressView } from './components/simple/ProgressView';
import { Scorecard } from './components/simple/Scorecard';
import { CaseSession, CaseMode, LocationType } from './types';
import { DEFAULT_PYQ_INDEX } from './data/defaultQBank';
import { processTurnOffline, generateScorecard, recordCheckpoint } from './utils/ccsEngine';
import { buildCaseSessionFromScaffold } from './utils/caseBinder';
import { saveActiveSession, loadActiveSession, clearActiveSession, readActiveSessionSync, saveCompletedCase, getMissedQIDsFromHistory } from './utils/storage';
import { markCasePlayed } from './utils/caseProgress';

export default function App() {
  const [session, setSession] = useState<CaseSession | null>(() => readActiveSessionSync());

  const [activeTab, setActiveTab] = useState<'sim' | 'scorecard' | 'instructions' | 'menu' | 'progress'>('sim');
  const [isStarting, setIsStarting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load active session on mount
  useEffect(() => {
    async function initSession() {
      const active = await loadActiveSession();
      if (active) setSession(active);
    }
    initSession();
  }, []);


  // Save active session to localStorage when updated
  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem('medtrix_active_session', JSON.stringify(session));
      } else {
        localStorage.removeItem('medtrix_active_session');
      }
    } catch (e) {
      console.warn('Could not save session to localStorage:', e);
    }
  }, [session]);

  // Handler to start a new offline case. `scaffoldId`, when given, pins the
  // exact case (from the case library) instead of a random pick within
  // `subject`.
  const handleStartNewCase = async (
    mode: CaseMode = 'standard',
    subject: string = 'Medicine',
    blindMode: boolean = false,
    scaffoldId?: string,
    setting?: LocationType
  ) => {
    setIsStarting(true);
    setErrorMessage(null);
    try {
      // Replacing a case that was left parked: drop the old one rather than
      // leaving an orphan record behind.
      if (session) await clearActiveSession(session.id);
      const missedQIDs = await getMissedQIDsFromHistory();
      const newSession = buildCaseSessionFromScaffold(DEFAULT_PYQ_INDEX, {
        mode: blindMode ? 'blind' : mode,
        subject,
        setting,
        scaffoldId,
        missedQIDs,
      });
      setSession(newSession);
      await saveActiveSession(newSession);
      markCasePlayed(newSession.scaffoldId);
      setActiveTab('sim');
    } catch (err: any) {
      console.error('Failed to start case offline:', err);
      setErrorMessage('Failed to generate offline case simulation.');
    } finally {
      setIsStarting(false);
    }
  };

  // Handler to process command turn offline
  const handleSendCommand = async (command: string) => {
    if (!session || isProcessing) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const updated = processTurnOffline(session, command);
      setSession(updated);
      await saveActiveSession(updated);
    } catch (err: any) {
      console.error('Failed to process turn offline:', err);
      setErrorMessage('Failed to process command in offline engine.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handler to submit Decision Gate Answer offline
  const handleCommitGateAnswer = async (answer: string, gateIndex?: number) => {
    if (!session || isProcessing) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const updated = processTurnOffline(session, undefined, answer, gateIndex);
      setSession(updated);
      await saveActiveSession(updated);
    } catch (err: any) {
      console.error('Failed to commit gate answer offline:', err);
      setErrorMessage('Failed to process gate answer in offline engine.');
    } finally {
      setIsProcessing(false);
    }
  };

  // The mid-case reasoning checkpoint. Answering it is a state change, not a
  // turn: no clock advance, no orders, nothing the patient experiences.
  const handleCheckpoint = async (worry: string, differentials: string, skipped: boolean) => {
    if (!session) return;
    const updated = recordCheckpoint(session, worry, differentials, skipped);
    setSession(updated);
    await saveActiveSession(updated);
  };

  // Handler to End and Score Case offline
  const handleEndCase = async (currentSess?: CaseSession) => {
    const targetSession = currentSess || session;
    if (!targetSession) return;
    setIsProcessing(true);

    try {
      const scorecard = generateScorecard(targetSession);
      const scoredSession: CaseSession = {
        ...targetSession,
        status: 'completed',
        scorecard,
      };
      setSession(scoredSession);
      await saveCompletedCase(scoredSession);
      await clearActiveSession(scoredSession.id);
      setActiveTab('scorecard');
    } catch (err: any) {
      console.error('Failed to generate scorecard offline:', err);
      setErrorMessage('Failed to generate end-of-case scorecard.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePauseResume = () => {
    if (!session) return;
    setSession({
      ...session,
      status: session.status === 'paused' ? 'active' : 'paused',
    });
  };

  // Stepping out of a case: the session is kept exactly as it is (it stays in
  // storage and this tab still owns it) and the menu offers it back.
  const handleLeaveCase = () => setActiveTab('menu');
  const handleResumeCase = () => setActiveTab('sim');

  if (activeTab === 'progress') {
    return (
      <ProgressView
        onBack={() => setActiveTab(session ? 'sim' : 'menu')}
        onPractise={(subject) => handleStartNewCase('standard', subject, false)}
        onPractiseCase={(scaffoldId) => handleStartNewCase('standard', 'All', false, scaffoldId)}
      />
    );
  }

  const showScorecard = activeTab === 'scorecard' && session?.scorecard;

  if (showScorecard && session) {
    return (
      <Scorecard
        session={session}
        onBack={() => setActiveTab('sim')}
        onNewCase={() => {
          void clearActiveSession(session.id);
          setSession(null);
          setActiveTab('sim');
        }}
      />
    );
  }

  if (!session || activeTab === 'menu') {
    const parked = session && session.status !== 'completed' ? session : null;
    return (
      <>
        {errorMessage && <ErrorBanner message={errorMessage} onDismiss={() => setErrorMessage(null)} />}
        <StartScreen
          resumeLabel={parked ? (parked.isQuestionLed ? parked.title : parked.patient.name) : null}
          onResume={parked ? handleResumeCase : undefined}
          onOpenProgress={() => setActiveTab('progress')}
          onStart={(mode, subject, blind, scaffoldId, setting) =>
            handleStartNewCase(mode, subject, !!blind, scaffoldId, setting)
          }
          starting={isStarting}
        />
      </>
    );
  }

  return (
    <>
      {errorMessage && <ErrorBanner message={errorMessage} onDismiss={() => setErrorMessage(null)} />}
      <CaseView
        session={session}
        onSendCommand={handleSendCommand}
        onCommitGateAnswer={handleCommitGateAnswer}
        isProcessing={isProcessing}
        onEndCase={() => (session.scorecard ? setActiveTab('scorecard') : handleEndCase())}
        onLeave={handleLeaveCase}
        onCheckpoint={handleCheckpoint}
      />
    </>
  );
}

const ErrorBanner: React.FC<{ message: string; onDismiss: () => void }> = ({ message, onDismiss }) => (
  <div
    className="fixed top-3 left-1/2 -translate-x-1/2 z-50 rounded-xl px-4 py-2.5 text-[14px] flex items-center gap-3 shadow-sm"
    style={{ background: 'var(--danger-soft)', color: 'var(--danger)', border: '1px solid var(--danger)' }}
  >
    <span>{message}</span>
    <button onClick={onDismiss} className="ring-focus rounded" aria-label="Dismiss">
      ×
    </button>
  </div>
);
