import { CaseSession, PYQItem } from '../types';
import { DEFAULT_PYQ_INDEX } from '../data/defaultQBank';

const DB_NAME = 'PYQ_CCS_Simulator_DB';
const DB_VERSION = 1;

/** Per-tab record of which case this tab is playing. Two tabs playing two
 *  different cases used to share one storage slot and overwrite each other;
 *  each tab now reads back its own case. */
const TAB_OWNER_KEY = 'medtrix_tab_session_id';
/** Abandoned sessions are pruned after this long so the store cannot grow
 *  without bound. */
const ACTIVE_SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000;

function tabOwnedSessionId(): string | null {
  try {
    return typeof sessionStorage === 'undefined' ? null : sessionStorage.getItem(TAB_OWNER_KEY);
  } catch {
    return null;
  }
}

function setTabOwnedSessionId(id: string | null): void {
  try {
    if (typeof sessionStorage === 'undefined') return;
    if (id) sessionStorage.setItem(TAB_OWNER_KEY, id);
    else sessionStorage.removeItem(TAB_OWNER_KEY);
  } catch {
    /* private browsing — the IndexedDB path still works */
  }
}

/**
 * IndexedDB Connection helper
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('active_session')) {
        db.createObjectStore('active_session', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('qbank_index')) {
        db.createObjectStore('qbank_index', { keyPath: 'qid' });
      }
      if (!db.objectStoreNames.contains('case_history')) {
        db.createObjectStore('case_history', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** Resolve once the write has actually landed. `store.put` alone resolves
 *  before the transaction commits, so a tab closed straight after a turn
 *  could lose it. */
function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

/**
 * Save active case session to storage, keyed by its own id so that a second
 * tab playing a different case cannot clobber this one.
 */
export async function saveActiveSession(session: CaseSession): Promise<void> {
  setTabOwnedSessionId(session.id);
  try {
    const db = await openDatabase();
    const tx = db.transaction('active_session', 'readwrite');
    tx.objectStore('active_session').put({ id: session.id, session, savedAt: Date.now() });
    await txDone(tx);
  } catch (err) {
    // Fallback to localStorage
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('medtrix_active_session', JSON.stringify(session));
      } catch (e) {
        console.warn('LocalStorage quota exceeded', e);
      }
    }
  }
}

/**
 * Forget the active session. Called when a case is finished or abandoned —
 * without this the finished case comes back to life on the next page load.
 */
export async function clearActiveSession(sessionId?: string): Promise<void> {
  const id = sessionId || tabOwnedSessionId();
  setTabOwnedSessionId(null);
  try {
    const db = await openDatabase();
    const tx = db.transaction('active_session', 'readwrite');
    const store = tx.objectStore('active_session');
    // Legacy single-slot record from before sessions were keyed by id.
    store.delete('CURRENT_ACTIVE');
    if (id) store.delete(id);
    await txDone(tx);
  } catch (err) {
    console.warn('Could not clear the active session from IndexedDB', err);
  }
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem('medtrix_active_session');
    } catch {
      /* nothing more we can do */
    }
  }
}

/**
 * Load the active case session belonging to this tab. Completed sessions are
 * not resumable — they live in the history instead.
 */
export async function loadActiveSession(): Promise<CaseSession | null> {
  const owned = tabOwnedSessionId();
  try {
    const db = await openDatabase();
    const tx = db.transaction('active_session', 'readonly');
    const req = tx.objectStore('active_session').getAll();

    const record = await new Promise<any>((resolve) => {
      req.onsuccess = () => {
        const rows: any[] = (req.result || []).filter((r) => r && r.session);
        if (owned) {
          const mine = rows.find((r) => r.session.id === owned);
          if (mine) return resolve(mine);
          // This tab owned a case that has since been finished or cleared.
          return resolve(null);
        }
        const fresh = rows
          .filter((r) => Date.now() - (r.savedAt || 0) < ACTIVE_SESSION_TTL_MS || !r.savedAt)
          .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
        resolve(fresh[0] || null);
      };
      req.onerror = () => resolve(null);
    });

    const session = record?.session as CaseSession | undefined;
    if (session && session.status !== 'completed') {
      setTabOwnedSessionId(session.id);
      return session;
    }
    if (session) return null; // finished case — do not resurrect it
    return owned ? null : loadActiveSessionFromLocalStorage();
  } catch (err) {
    return loadActiveSessionFromLocalStorage();
  }
}

/**
 * Synchronous first paint of a resumable case, before IndexedDB has answered.
 * Tab-aware: a tab that is already playing its own case must not adopt the one
 * another tab happens to have written to the shared localStorage slot.
 */
export function readActiveSessionSync(): CaseSession | null {
  const owned = tabOwnedSessionId();
  const session = loadActiveSessionFromLocalStorage();
  if (!session) return null;
  if (owned && session.id !== owned) return null;
  return session;
}

function loadActiveSessionFromLocalStorage(): CaseSession | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem('medtrix_active_session');
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session && session.id && session.turns && session.status !== 'completed') return session;
  } catch (e) {
    console.warn('Failed to parse active session from localStorage');
  }
  return null;
}

/**
 * Save QBank index
 */
export async function saveQBankIndex(index: PYQItem[]): Promise<void> {
  try {
    const db = await openDatabase();
    const tx = db.transaction('qbank_index', 'readwrite');
    const store = tx.objectStore('qbank_index');
    store.clear();
    index.forEach((item) => store.put(item));
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to save QBank index to IndexedDB, attempting fallback:', err);
    if (typeof localStorage !== 'undefined') {
      try {
        // Save only a sample/slice to localStorage to prevent QuotaExceededError
        localStorage.setItem('medtrix_pyq_index_sample', JSON.stringify(index.slice(0, 50)));
      } catch (e) {
        console.warn('LocalStorage quota exceeded saving sample qbank');
      }
    }
  }
}

/**
 * Load QBank index
 */
export async function loadQBankIndex(): Promise<PYQItem[]> {
  try {
    const db = await openDatabase();
    const tx = db.transaction('qbank_index', 'readonly');
    const store = tx.objectStore('qbank_index');
    const req = store.getAll();

    return new Promise((resolve) => {
      req.onsuccess = () => {
        if (req.result && req.result.length > 0) {
          resolve(req.result as PYQItem[]);
        } else {
          resolve(loadQBankFromLocalStorage());
        }
      };
      req.onerror = () => resolve(loadQBankFromLocalStorage());
    });
  } catch (err) {
    return loadQBankFromLocalStorage();
  }
}

function loadQBankFromLocalStorage(): PYQItem[] {
  if (typeof localStorage === 'undefined') return DEFAULT_PYQ_INDEX;
  try {
    const raw = localStorage.getItem('medtrix_pyq_index');
    if (!raw) return DEFAULT_PYQ_INDEX;
    const items = JSON.parse(raw);
    if (Array.isArray(items) && items.length > 0) return items;
  } catch (e) {
    console.warn('Failed to parse QBank from localStorage');
  }
  return DEFAULT_PYQ_INDEX;
}

/**
 * Save completed case to history
 */
export async function saveCompletedCase(session: CaseSession): Promise<void> {
  try {
    const db = await openDatabase();
    const tx = db.transaction('case_history', 'readwrite');
    const store = tx.objectStore('case_history');
    store.put(session);
  } catch (err) {
    if (typeof localStorage !== 'undefined') {
      try {
        const historyRaw = localStorage.getItem('medtrix_case_history') || '[]';
        const history: CaseSession[] = JSON.parse(historyRaw);
        history.push(session);
        localStorage.setItem('medtrix_case_history', JSON.stringify(history.slice(-20))); // Keep last 20
      } catch (e) {
        console.warn('Failed to save completed case to localStorage', e);
      }
    }
  }
}

/**
 * Load case history
 */
export async function loadCaseHistory(): Promise<CaseSession[]> {
  try {
    const db = await openDatabase();
    const tx = db.transaction('case_history', 'readonly');
    const store = tx.objectStore('case_history');
    const req = store.getAll();

    return new Promise((resolve) => {
      req.onsuccess = () => {
        resolve((req.result || []) as CaseSession[]);
      };
      req.onerror = () => resolve(loadHistoryFromLocalStorage());
    });
  } catch (err) {
    return loadHistoryFromLocalStorage();
  }
}

function loadHistoryFromLocalStorage(): CaseSession[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem('medtrix_case_history');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

/**
 * Returns QIDs of questions missed in previous completed cases
 */
export async function getMissedQIDsFromHistory(): Promise<string[]> {
  const history = await loadCaseHistory();
  const missedQIDs = new Set<string>();

  history.forEach((session) => {
    if (session.decisionGates) {
      session.decisionGates.forEach((gate) => {
        if (gate.isCorrect === false && gate.pyq && gate.pyq.qid) {
          missedQIDs.add(gate.pyq.qid);
        }
      });
    }
  });

  return Array.from(missedQIDs);
}

/**
 * Export full user profile data (QBank index + Case History) as JSON
 */
export async function exportProfileJSON(): Promise<string> {
  const index = await loadQBankIndex();
  const history = await loadCaseHistory();

  const exportData = {
    version: '1.0',
    app: 'PYQ CCS Simulator',
    exportDate: new Date().toISOString(),
    qbankIndex: index,
    caseHistory: history,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Import full user profile data from JSON
 */
export async function importProfileJSON(
  jsonStr: string
): Promise<{ indexCount: number; historyCount: number }> {
  const parsed = JSON.parse(jsonStr);

  let qbankItems: PYQItem[] = [];
  let historyItems: CaseSession[] = [];

  if (parsed.qbankIndex && Array.isArray(parsed.qbankIndex)) {
    qbankItems = parsed.qbankIndex;
  } else if (Array.isArray(parsed)) {
    qbankItems = parsed;
  }

  if (parsed.caseHistory && Array.isArray(parsed.caseHistory)) {
    historyItems = parsed.caseHistory;
  }

  if (qbankItems.length > 0) {
    await saveQBankIndex(qbankItems);
  }

  if (historyItems.length > 0) {
    for (const item of historyItems) {
      await saveCompletedCase(item);
    }
  }

  return {
    indexCount: qbankItems.length,
    historyCount: historyItems.length,
  };
}
