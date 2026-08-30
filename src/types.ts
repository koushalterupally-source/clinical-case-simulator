export type RoleTag = 
  | 'EMERGENCY'
  | 'DIAGNOSIS'
  | 'INVESTIGATION'
  | 'MANAGEMENT'
  | 'PHARM'
  | 'COMPLICATION'
  | 'PREVENTION'
  | 'BASIC-SCIENCE'
  | 'UNTAGGED';

export type ExamType = 'NEET-PG' | 'INI-CET' | 'CUSTOM';

export type SubjectType = 
  | 'Medicine' 
  | 'Surgery' 
  | 'OBGY' 
  | 'Pediatrics' 
  | 'Pharmacology' 
  | 'Pathology' 
  | 'PSM' 
  | 'Emergency'
  | 'ENT'
  | 'Ophthalmology'
  | 'Orthopedics'
  | 'Dermatology'
  | 'Basic Science'
  | 'Previous Year Papers';

export interface PYQItem {
  qid: string; // e.g. NEETPG-2017-034
  displayId?: string; // human readable ID
  sourceFile?: string; // provenance filename
  exam: ExamType;
  year: number | string;
  subject: SubjectType;
  system: string;
  topic: string;
  stem: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'ANSWER-NOT-IN-SOURCE';
  conceptTested: string;
  roleTag: RoleTag;
  explanation?: string;
  isDraft?: boolean;
}

export type LocationType = 'Emergency' | 'OPD' | 'Ward' | 'ICU' | 'OT' | 'Home';

export interface Vitals {
  hr: number;
  bp: string;
  rr: number;
  spo2: number;
  temp: string;
  grbs: number; // numeric e.g. 110 mg/dL
}

export interface IncidentalFinding {
  id: string;
  title: string;
  description: string; // e.g. "CXR shows 8mm solitary nodule in RUL"
  correctAction: string;
  status: 'unnoticed' | 'noticed_addressed' | 'over_investigated' | 'ignored_safely';
  notes?: string;
}

export interface DecisionGate {
  id: string;
  pyq: PYQItem;
  triggerTurnIndex: number;
  patientContext: string;
  userAnswer?: 'A' | 'B' | 'C' | 'D' | string;
  isCorrect?: boolean;
  isSelfReview?: boolean;
  consequenceMessage?: string;
  explanationGiven?: string;
  timeSpentSeconds?: number;
}

export type OrderCategory = 'labs' | 'imaging' | 'drugs' | 'consults' | 'procedures' | 'monitoring';

export interface OrderResultItem {
  id: string;
  orderName: string;
  category: OrderCategory;
  placedSimTime: string;
  readySimTime: string;
  isReady: boolean;
  resultText: string;
  turnaroundMinutes: number;
  orderedTurnIndex?: number;
}

export interface SimTurn {
  turnIndex: number;
  simTime: { day: number; hour: number; minute: number };
  location: LocationType;
  whatHappened: string;
  vitals: Vitals;
  newResults: OrderResultItem[];
  activeGate?: DecisionGate;
  userCommand?: string;
}

export type CaseMode = 'standard' | 'rapid' | 'mixed' | 'weakness' | 'blind';

/** One administered therapy, recorded so the engine can enforce sequencing,
 *  apply its delayed vitals effect once, shift repeat investigation results,
 *  and surface it (with rationale) in the end-of-case scorecard. */
export interface TherapyLogEntry {
  key: string; // therapiesMap key
  orderName: string; // what the candidate actually typed/selected
  atMinutes: number; // absolute sim-minutes when administered
  onsetMinutes: number;
  effectApplied: boolean;
  appropriateness: 'indicated' | 'neutral' | 'harmful';
  rationale: string;
  vitalsEffect?: Partial<Vitals>;
  labShift?: Record<string, string>;
}

export interface PatientState {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  chiefComplaint: string;
  setting: string;
  initialVitals: Vitals;
  currentVitals: Vitals;
  diagnosis: string;
  clinchingClue: string;
  clinchingClueTime: string;
  history?: string;
  physicalExam?: {
    general?: string;
    cvs?: string;
    resp?: string;
    abdomen?: string;
    cns?: string;
  };
}

export interface EndOfCaseScorecard {
  finalDiagnosis: string;
  clinchingClue: string;
  clinchingTime: string;
  pyqScore: { correct: number; total: number; percentage: number };
  gateResults: {
    qid: string;
    examYear: string;
    topic: string;
    roleTag: RoleTag;
    userChoice?: string;
    correctChoice: string;
    isCorrect: boolean;
    concept: string;
    consequence: string;
  }[];
  incidentalFindingsReport: {
    title: string;
    outcome: string;
    status: 'noticed_addressed' | 'unnoticed' | 'over_investigated' | 'ignored_safely';
    scoreNote: string;
  }[];
  criticalDelays: string[];
  overOrderingList: string[];
  /** Orders the case does not model at all. Listed for transparency, never
   *  scored: the case has no clinical opinion about them. */
  unmodelledList: string[];
  /** Every therapy given, with its clinical appropriateness and the reasoning
   *  behind that grading — surfaced only here, never during the case itself. */
  therapiesGiven: {
    orderName: string;
    appropriateness: 'indicated' | 'neutral' | 'harmful';
    rationale: string;
    time: string;
  }[];
  preventionChecklist: { item: string; status: 'done' | 'missed' }[];
  topConceptsToRevise: { concept: string; sourceQIDs: string[] }[];
  overallGrade: 'S' | 'A' | 'B' | 'C' | 'F';
  overallScore: number;
  summaryFeedback: string;
}

export interface CaseSession {
  id: string;
  seed: string;
  scaffoldId: string;
  /** True when the case was generated from a cluster of questions rather than
   *  an authored scaffold: real questions, no simulated patient behind them. */
  isQuestionLed?: boolean;
  title: string;
  mode: CaseMode;
  subject: string;
  patient: PatientState;
  currentLocation: LocationType;
  simTime: { day: number; hour: number; minute: number };
  turns: SimTurn[];
  pendingOrders: OrderResultItem[];
  completedOrders: OrderResultItem[];
  historyLog: { question: string; answer: string; time: string }[];
  examLog: { system: string; findings: string; time: string }[];
  decisionGates: DecisionGate[];
  currentGateIndex: number;
  incidentalFindings: IncidentalFinding[];
  therapyLog: TherapyLogEntry[];
  status: 'active' | 'paused' | 'completed';
  scorecard?: EndOfCaseScorecard;
  blindMode?: boolean;
}

export interface CaseScaffold {
  id: string;
  title: string;
  conditionName: string;
  subject: SubjectType;
  system: string;
  demographics: {
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    setting: LocationType;
  };
  openingVignette: string; // Vignette describing symptoms WITHOUT naming condition/topic
  initialVitals: Vitals;
  clinchingClue: string;
  clinchingClueTimeMinutes: number; // e.g. 15 mins after sim start
  // System-by-system physical exam findings
  examFindingsMap: Record<string, string>; // e.g. 'chest' => 'Bilateral crepitations...', 'cvs' => 'S1 S2 heard...'
  // History findings map
  historyMap: Record<string, string>; // e.g. 'allergies' => 'No known drug allergies.', 'past' => 'Hypertension 5 yrs on enalapril'
  // Investigation results lookup. Matching is against `aliases`, normalized and
  // compared for equality — never substring — so "Serum ketones" and "Urine
  // ketones" can never collide into one result.
  investigationsMap: Record<string, {
    aliases: string[]; // exact order names/phrasings this key answers to
    resultText: string;
    turnaroundMinutes: number;
    category: OrderCategory;
    isIndicative: boolean; // True if indicated for this condition (false = over-ordering)
    /**
     * Three-way grading, mirroring how therapies are graded. Optional: when it
     * is absent the grade is derived from `isIndicative` (true -> 'indicated',
     * false -> 'neutral'), so every case that predates this field keeps working.
     *
     * 'neutral'  the test is not wrong to consider, it simply does not change
     *            management here — it costs time and nothing else.
     * 'harmful'  ordering it actively costs the patient something: transporting
     *            an unstable patient to the scanner, contrast in acute kidney
     *            injury, a lumbar puncture before imaging in raised intracranial
     *            pressure. A harmful test MUST explain itself in `yieldNote`.
     */
    appropriateness?: 'indicated' | 'neutral' | 'harmful';
    /**
     * Shown WITH THE RESULT, at the moment it comes back — not held until the
     * scorecard. The time is already spent by then, so saying "this did not
     * contribute" is feedback rather than a hint, and it is how the learner
     * finds out an order was pointless while the case is still in front of
     * them. It must never name the diagnosis: it explains why THIS test does
     * not help, not what the answer is.
     */
    yieldNote?: string;
  }>;
  // Therapies this case models. An `indicated` therapy is acknowledged, moves
  // vitals toward normal over `onsetMinutes`, and can change what a REPEATED
  // investigation returns via `labShift` (investigation key -> new resultText).
  // A `harmful` therapy is acted on and the patient responds accordingly.
  // `rationale` is surfaced in the scorecard afterwards, never during the case.
  therapiesMap: Record<string, {
    aliases: string[];
    responseText: string;
    onsetMinutes: number;
    vitalsEffect?: Partial<Vitals>;
    labShift?: Record<string, string>;
    appropriateness: 'indicated' | 'neutral' | 'harmful';
    rationale: string;
    /**
     * Sequence-dependent safety: therapy keys (within this same therapiesMap)
     * that must already have been administered before this one is safe to give.
     * Giving this therapy first — the classic "insulin before fluids" trap —
     * is treated as harmful for that administration regardless of
     * `appropriateness`, using the harmfulSequence* overrides below.
     */
    requiresFirst?: string[];
    harmfulSequenceResponseText?: string;
    harmfulSequenceVitalsEffect?: Partial<Vitals>;
    harmfulSequenceRationale?: string;
  }>;
  // Trajectory milestones for time elapsed without critical treatment
  criticalInterventions: {
    orderOrActionPattern: RegExp;
    name: string;
    targetMilestoneMinutes: number; // e.g. must be given within 60 mins
  }[];
  // Incidental findings pool
  incidentalPool: IncidentalFinding[];
  // Milestones for decision gates binding
  gateMilestones: {
    roleTag: RoleTag;
    patientContext: string;
    consequenceOnWrong: string;
    consequenceOnRight: string;
  }[];
}
