import * as fs from 'fs';
import * as path from 'path';
/**
 * Build-time validation of the case library against src/data/caseSchema.ts.
 *
 * Run with:
 *   npx tsx scripts/validate-cases.ts
 *
 * Prints a per-case report and exits 1 if any case (or the library as a
 * whole) is invalid. This is a structural check only — it proves a case is
 * well FORMED and reachable, not that its medicine is right, and it never
 * modifies case data.
 */
import { CASE_SCAFFOLDS } from '../src/data/cases/scaffolds';
import { validateScaffold, validateLibrary } from '../src/data/caseSchema';

function run() {
  console.log(`Validating ${CASE_SCAFFOLDS.length} case scaffold(s)...\n`);

  let totalProblems = 0;
  const perCase: { id: string; problems: string[] }[] = [];

  for (const scaffold of CASE_SCAFFOLDS) {
    const problems = validateScaffold(scaffold);
    perCase.push({ id: scaffold?.id || '(missing id)', problems });
    totalProblems += problems.length;
  }

  const libraryProblems = validateLibrary(CASE_SCAFFOLDS);
  totalProblems += libraryProblems.length;

  for (const { id, problems } of perCase) {
    if (problems.length === 0) {
      console.log(`  PASS  ${id}`);
    } else {
      console.log(`  FAIL  ${id} (${problems.length} problem${problems.length === 1 ? '' : 's'})`);
      for (const p of problems) {
        console.log(`          - ${p}`);
      }
    }
  }

  if (libraryProblems.length > 0) {
    console.log(`\n  FAIL  (library-wide, ${libraryProblems.length} problem${libraryProblems.length === 1 ? '' : 's'})`);
    for (const p of libraryProblems) {
      console.log(`          - ${p}`);
    }
  }

  const failedCases = perCase.filter((c) => c.problems.length > 0).length;
  console.log(
    `\n${CASE_SCAFFOLDS.length - failedCases}/${CASE_SCAFFOLDS.length} cases valid, ` +
      `${totalProblems} total problem${totalProblems === 1 ? '' : 's'}.`
  );

  // The documented case count has now drifted three separate times, because
  // nothing was checking it. A number in the docs that is quietly wrong is worse
  // than no number, since the architecture doc uses it to describe how much the
  // invariant suite covers. Cheaper to assert it than to keep noticing it.
  const docProblems = checkDocumentedCaseCount(CASE_SCAFFOLDS.length);
  for (const p of docProblems) console.log(`  DOCS: ${p}`);

  if (totalProblems > 0 || docProblems.length > 0) {
    if (totalProblems > 0) {
      console.log('\nFAILED: real defects were found in the case library (see above). Not fixing case data automatically.');
    }
    if (docProblems.length > 0) {
      console.log('\nFAILED: the documentation states the wrong number of cases. Update it.');
    }
    process.exit(1);
  }

  console.log('\nOK: every case scaffold is structurally valid, and the docs agree on how many there are.');
}

/**
 * Every place the docs quote a case count has to match reality. Files that do
 * not exist are ignored rather than failing — this is a consistency check, not
 * a requirement that any particular document be present.
 */
function checkDocumentedCaseCount(actual: number): string[] {
  const problems: string[] = [];
  const targets = ['README.md', 'docs/ARCHITECTURE.md'];
  for (const rel of targets) {
    const file = path.join(process.cwd(), rel);
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    // Any "<n> authored ... cases" or "all <n> cases" phrasing.
    const patterns = [/(\d+)\s+authored/g, /all\s+(\d+)\s+cases/g];
    for (const re of patterns) {
      for (const m of text.matchAll(re)) {
        const stated = parseInt(m[1], 10);
        if (stated !== actual) {
          problems.push(`${rel} says ${stated} where the library has ${actual} ("${m[0]}")`);
        }
      }
    }
  }
  return problems;
}

run();
