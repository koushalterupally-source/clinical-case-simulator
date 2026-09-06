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

  if (totalProblems > 0) {
    console.log('\nFAILED: real defects were found in the case library (see above). Not fixing case data automatically.');
    process.exit(1);
  }

  console.log('\nOK: every case scaffold is structurally valid.');
}

run();
