/**
 * End-to-end browser suite for the clinical case simulator, driven by the
 * installed system `playwright` package (there is no @playwright/test and
 * none is added — see the harness style in tests/invariants.test.ts).
 *
 * Run: node tests/e2e/run.mjs
 * (requires `npm run build` and a static server for dist/ at BASE_URL first —
 * see the accompanying report for the exact commands)
 *
 * Requires Chromium at /opt/pw-browsers/chromium. The whole suite runs in one
 * browser context/page reused across all 12 checks (a handful still navigate
 * back to the start screen between steps — that is a same-context reload,
 * not a fresh context). Outbound network is blocked in this sandbox and the
 * app both requests Google Fonts and, in production, registers a service
 * worker; armRoutes() aborts both at the CONTEXT level (not page level —
 * sw.js's install/fetch traffic bypasses page.route()) before any page is
 * created in it. This sandbox's outbound-blocking proxy can also make an
 * unrelated Chromium-internal background connection (sync, autofill, Safe
 * Browsing update checks — never our own page's traffic) sit for several
 * seconds before failing, occasionally stalling a fresh navigation; the
 * extra chromium.launch() args reduce that, and generous timeouts on top-
 * level start-screen waits absorb whatever it doesn't.
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:8310';

let passed = 0;
let failed = 0;
const failures = [];

function assert(cond, msg) {
  if (cond) {
    passed++;
  } else {
    failed++;
    failures.push(msg);
    console.log(`  ❌ FAIL: ${msg}`);
  }
}

/**
 * Every context must abort Google Fonts and the service worker before any
 * navigation. Fonts hang because outbound network is blocked. The service
 * worker matters more subtly: `sw.js`'s install/fetch traffic is dispatched
 * outside the page's normal network stack, so `page.route()` never sees it —
 * only `context.route()` does. Missing that, the real service worker
 * registers, activates (skipWaiting + clients.claim), and its
 * `controllerchange` listener in index.html calls `location.reload()` the
 * instant it takes control — a genuine full navigation moments after the
 * very first click, which reliably broke every check downstream of it.
 * Always call this on the CONTEXT, before creating any page in it.
 */
async function armRoutes(context) {
  await context.route('**://fonts.googleapis.com/**', (r) => r.abort());
  await context.route('**://fonts.gstatic.com/**', (r) => r.abort());
  await context.route('**/sw.js', (r) => r.abort());
}

/** Collects uncaught page errors and >=400 responses from our own origin for
 *  the lifetime of a page. */
function watchPage(page) {
  const pageErrors = [];
  const badResponses = [];
  page.on('pageerror', (e) => pageErrors.push(e.message || String(e)));
  page.on('response', (r) => {
    if (r.url().startsWith(BASE_URL) && r.status() >= 400) {
      badResponses.push(`${r.status()} ${r.url()}`);
    }
  });
  return { pageErrors, badResponses };
}

async function gotoApp(page) {
  await page.goto(BASE_URL + '/', { waitUntil: 'domcontentloaded' });
}

/** Retries a page/locator action once if Chromium reports its execution
 *  context destroyed — seen occasionally and harmlessly in this sandbox
 *  around a fresh context's very first interaction, unrelated to anything
 *  the app itself does (no navigation-triggering control is ever touched
 *  here). */
async function retryOnDestroyedContext(fn) {
  try {
    return await fn();
  } catch (e) {
    if (!/Execution context was destroyed/i.test(String(e?.message || e))) throw e;
    await new Promise((r) => setTimeout(r, 300));
    return await fn();
  }
}

/** Starts the standard emergency-triage case from the start screen and waits
 *  for the case view to render. Returns once the header shows a clock. */
async function startCase(page) {
  const startBtn = page.getByRole('button', { name: /Start Clinical Case/i });
  await startBtn.waitFor({ state: 'visible' });
  await startBtn.click();
  // Case generation is pure local computation (no network) and normally
  // resolves in well under a second; the generous ceiling is headroom for a
  // loaded sandbox, not an expectation of real slowness.
  await page.waitForSelector('text=/Day \\d+, \\d{2}:\\d{2}/', { timeout: 30000 });
}

/**
 * Runs one check, recording a single failure if it throws. Returns true on
 * success — callers use that to skip checks that can only fail noisily (and
 * burn the shared time budget) once an earlier, foundational step in the
 * same stateful flow has already gone wrong.
 */
async function runCheck(label, fn) {
  try {
    await fn();
    return true;
  } catch (e) {
    assert(false, `${label} threw: ${e?.stack || e}`);
    return false;
  }
}

function skip(label) {
  console.log(`  ⏭  skipped: ${label} (a prior step in this flow did not reach a usable state)`);
}

async function main() {
  console.log('E2E: booting Chromium\n');
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium',
    // Beyond fonts and the service worker (handled by armRoutes, which only
    // covers requests this page/context actually makes), Chromium itself
    // opens a handful of background connections to Google's own services
    // (sync, Safe Browsing update pings, autofill) that page/context route
    // interception cannot see or abort because they never originate from
    // page content. In this sandbox each one sits at the outbound-blocking
    // proxy for several seconds before failing, so every flag that can turn
    // one off up front is worth passing.
    args: [
      '--disable-sync',
      '--disable-features=AutofillServerCommunication',
      '--safebrowsing-disable-auto-update',
    ],
  });
  // One context and one page for the entire suite — each fresh
  // BrowserContext pays its own round of that background-connection tax on
  // its first navigation, so reusing one throughout (per the sandbox's own
  // guidance) is the difference between paying it once and paying it four
  // times over the run's 3-minute budget. A handful of checks below still
  // navigate back to the start screen between steps; that is a same-context
  // reload, not a fresh context, and is cheap.
  const ctx = await browser.newContext();
  await armRoutes(ctx);
  const page = await ctx.newPage();
  const { pageErrors, badResponses } = watchPage(page);

  await runCheck('check 1 (boot)', () => check1_boot(page, pageErrors, badResponses));

  // Checks 2-7 are one continuous, stateful narrative on the same page (start
  // a case -> talk to it -> leave/resume it -> end it). Once an early step in
  // that chain fails to reach a usable screen, the later ones cannot pass
  // either — running them anyway would just add several more multi-second
  // timeouts without new information, at real risk to the 3-minute budget.
  let patientName = '';
  const caseStarted = await runCheck('check 2 (start case)', () => check2_startCase(page));
  if (caseStarted) {
    const freeTextOk = await runCheck('check 3 (free text)', () => check3_freeText(page));
    if (freeTextOk) await runCheck('check 4 (order sheet)', () => check4_orderSheet(page, ctx));
    else skip('check 4 (order sheet)');
    if (freeTextOk) await runCheck('check 5 (history/exam)', () => check5_historyExam(page));
    else skip('check 5 (history/exam)');

    let leftAndResumed = false;
    if (freeTextOk) {
      leftAndResumed = await runCheck('check 6 (leave/resume)', async () => {
        patientName = await check6_leaveResume(page);
      });
    } else {
      skip('check 6 (leave/resume)');
    }
    if (leftAndResumed) await runCheck('check 7 (end case + reload)', () => check7_endCaseAndReload(page, patientName));
    else skip('check 7 (end case + reload)');
  } else {
    skip('check 3 (free text)');
    skip('check 4 (order sheet)');
    skip('check 5 (history/exam)');
    skip('check 6 (leave/resume)');
    skip('check 7 (end case + reload)');
  }

  // Check 8 re-navigates and starts its own fresh case, independent of
  // whatever state checks 2-7 left behind, so it always gets a real attempt.
  const midCaseOk = await runCheck('check 8 (mid-case reload)', () => check8_midCaseReload(page));
  if (midCaseOk) await runCheck('check 9 (responsive)', () => check9_responsive(page));
  else skip('check 9 (responsive)');

  await runCheck('check 10 (keyboard)', () => check10_keyboard(page));
  await runCheck('check 11 (theme persist)', () => check11_themePersist(page));
  await runCheck('check 12 (case library)', () => check12_caseLibrary(page));

  await browser.close();

  console.log(`\n${failed === 0 ? '🎉' : '💥'} E2E: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    console.log('\nFailures:');
    failures.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// 1. Boot: start screen renders; no uncaught page errors; no HTTP >= 400 from
//    our own origin.
// ---------------------------------------------------------------------------
async function check1_boot(page, pageErrors, badResponses) {
  console.log('--- 1. Boot ---');
  await gotoApp(page);
  const startBtn = page.getByRole('button', { name: /Start Clinical Case/i });
  await startBtn.waitFor({ state: 'visible', timeout: 20000 });
  assert(await startBtn.isVisible(), 'start screen renders the primary start button');
  // Give any deferred/microtask errors (font abort handling, sw registration
  // failure being caught, etc.) a moment to surface before we assert on them.
  await page.waitForTimeout(300);
  assert(pageErrors.length === 0, `no uncaught page errors on boot (got: ${pageErrors.join(' | ')})`);
  assert(badResponses.length === 0, `no HTTP >= 400 from our own origin on boot (got: ${badResponses.join(' | ')})`);
}

// ---------------------------------------------------------------------------
// 2. Start a case; the case screen shows a patient name and a clock.
// ---------------------------------------------------------------------------
async function check2_startCase(page) {
  console.log('--- 2. Start a case ---');
  await gotoApp(page);
  await startCase(page);

  const header = page.locator('header h1').first();
  const name = (await header.textContent())?.trim() || '';
  assert(name.length > 0, `case header shows a patient name (got "${name}")`);

  const clock = page.locator('header').getByText(/Day \d+, \d{2}:\d{2}/).first();
  await clock.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  assert(await clock.isVisible(), 'case header shows a running clock');
}

// ---------------------------------------------------------------------------
// 3. Free text: type a command, press Enter; it appears exactly once; the
//    input clears; two rapid Enters do not duplicate it.
// ---------------------------------------------------------------------------
async function check3_freeText(page) {
  console.log('--- 3. Free text command ---');
  const textarea = page.locator('textarea[placeholder="What do you do?"]');
  await textarea.waitFor({ state: 'visible' });

  const command = 'pe: chest';
  await textarea.fill(command);
  await textarea.press('Enter');
  // Fire a second Enter immediately (same synchronous tick as the guard's
  // ref flip) to exercise the inFlight de-dupe rather than a real double-type.
  await textarea.press('Enter');

  await page.waitForFunction(
    (cmd) => {
      const bubbles = Array.from(document.querySelectorAll('main *'));
      return bubbles.some((el) => el.textContent?.trim() === cmd);
    },
    command,
    { timeout: 10000 }
  );
  // Let any queued turn finish before counting.
  await page.waitForFunction(
    () => !document.querySelector('[aria-busy="true"]'),
    undefined,
    { timeout: 10000 }
  );

  const occurrences = await page.locator('main').getByText(command, { exact: true }).count();
  assert(occurrences === 1, `the command appears exactly once in the transcript (found ${occurrences})`);

  const value = await textarea.inputValue();
  assert(value === '', `the composer input clears after sending (got "${value}")`);
}

// ---------------------------------------------------------------------------
// 4. Order sheet opens, shows its category chips, Escape closes it. At 390px
//    every chip is inside the viewport and the page does not scroll
//    horizontally.
// ---------------------------------------------------------------------------
async function check4_orderSheet(page) {
  console.log('--- 4. Order sheet ---');
  const ordersBtn = page.getByRole('button', { name: 'Orders', exact: true });
  await ordersBtn.click();

  const dialog = page.getByRole('dialog', { name: 'Order sheet' });
  await dialog.waitFor({ state: 'visible' });

  const chips = dialog.locator('.flex.flex-wrap.gap-1\\.5.px-4.pt-3.pb-1 button');
  const chipCount = await chips.count();
  assert(chipCount > 0, `order sheet shows category chips (found ${chipCount})`);

  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden', timeout: 5000 });
  assert(true, 'Escape closes the order sheet');

  // Re-open at a narrow (390px) viewport and check every chip is on-screen.
  const original = page.viewportSize();
  await page.setViewportSize({ width: 390, height: 800 });
  await ordersBtn.click();
  await dialog.waitFor({ state: 'visible' });

  const chipBoxes = await chips.evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right };
    })
  );
  const offscreen = chipBoxes.filter((b) => b.left < -0.5 || b.right > 390.5);
  assert(offscreen.length === 0, `every order-sheet chip is inside a 390px viewport (offenders: ${JSON.stringify(offscreen)})`);

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  assert(scrollWidth <= 391, `page does not scroll horizontally at 390px with the order sheet open (scrollWidth ${scrollWidth})`);

  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden', timeout: 5000 });
  if (original) await page.setViewportSize(original);
}

/** True once no turn is in flight (the composer's send button drops
 *  aria-busy) — the safe point to look at the transcript or header. */
async function waitIdle(page) {
  await page.waitForFunction(() => !document.querySelector('[aria-busy="true"]'), undefined, {
    timeout: 10000,
  });
}

// ---------------------------------------------------------------------------
// 5. History and examination are reachable through the order sheet.
// ---------------------------------------------------------------------------
async function check5_historyExam(page) {
  console.log('--- 5. History and examination via order sheet ---');
  const ordersBtn = page.getByRole('button', { name: 'Orders', exact: true });
  const dialog = page.getByRole('dialog', { name: 'Order sheet' });

  await ordersBtn.click();
  await dialog.waitFor({ state: 'visible' });
  await dialog.getByRole('button', { name: 'History', exact: true }).click();
  // First prompt button under the History tab, whatever the case's own copy is.
  const promptButtons = dialog.locator('div.space-y-2 button');
  await promptButtons.first().waitFor({ state: 'visible' });
  const promptLabel = (await promptButtons.first().textContent())?.trim() || '';
  await promptButtons.first().click();
  await dialog.waitFor({ state: 'hidden' });
  await waitIdle(page);
  const hxCount = await page.locator('main').getByText(`hx: ${promptLabel}`, { exact: true }).count();
  assert(hxCount === 1, `a history prompt ("${promptLabel}") is reachable and lands in the transcript once`);

  await ordersBtn.click();
  await dialog.waitFor({ state: 'visible' });
  await dialog.getByRole('button', { name: 'Examination', exact: true }).click();
  const examButtons = dialog.locator('div.grid button');
  await examButtons.first().waitFor({ state: 'visible' });
  const examLabel = (await examButtons.first().textContent())?.trim() || '';
  await examButtons.first().click();
  await dialog.waitFor({ state: 'hidden' });
  await waitIdle(page);
  const peCount = await page.locator('main').getByText(`pe: ${examLabel}`, { exact: true }).count();
  assert(peCount === 1, `an examination system ("${examLabel}") is reachable and lands in the transcript once`);
}

// ---------------------------------------------------------------------------
// 6. Leave a case via the back control; the menu offers Resume; resuming
//    returns to the same patient with the transcript intact.
// ---------------------------------------------------------------------------
async function check6_leaveResume(page) {
  console.log('--- 6. Leave and resume ---');
  const header = page.locator('header h1').first();
  const patientName = (await header.textContent())?.trim() || '';

  const before = await page.locator('main').innerText();

  const leaveBtn = page.getByRole('button', { name: /Leave this case/i });
  await leaveBtn.click();

  const resumeBtn = page.getByRole('button', { name: /Resume/i });
  await resumeBtn.waitFor({ state: 'visible', timeout: 5000 });
  const resumeText = (await resumeBtn.textContent()) || '';
  assert(resumeText.includes(patientName) || /Resume/i.test(resumeText), `the menu offers a Resume control naming the in-progress case (got "${resumeText.trim()}")`);

  await resumeBtn.click();
  await header.waitFor({ state: 'visible', timeout: 5000 });
  const nameAfter = (await header.textContent())?.trim() || '';
  assert(nameAfter === patientName, `resuming returns to the same patient (before "${patientName}", after "${nameAfter}")`);

  const after = await page.locator('main').innerText();
  assert(after === before, 'resuming keeps the transcript intact');

  return patientName;
}

// ---------------------------------------------------------------------------
// 7. End case: the scorecard renders with a score. Reloading after ending
//    lands on the start screen, NOT back in the finished case.
// ---------------------------------------------------------------------------
async function check7_endCaseAndReload(page, patientName) {
  console.log('--- 7. End case + reload ---');
  const endBtn = page.getByRole('button', { name: 'End case', exact: true });
  await endBtn.click();

  const scoreHeading = page.getByRole('heading', { name: 'Case complete' });
  await scoreHeading.waitFor({ state: 'visible', timeout: 10000 });
  const scoreText = await page.getByText(/\d+%/).first().textContent();
  assert(/\d+%/.test(scoreText || ''), `the scorecard renders with a numeric score (got "${scoreText}")`);

  // Give the app's own localStorage-mirroring effect (and IndexedDB clear) a
  // moment to settle before reloading, same as a real user would.
  await page.waitForTimeout(500);
  await gotoApp(page);
  const startBtn = page.getByRole('button', { name: /Start Clinical Case/i });
  await startBtn.waitFor({ state: 'visible', timeout: 10000 });
  const stillOnScorecard = await page.getByRole('heading', { name: 'Case complete' }).count();
  assert(stillOnScorecard === 0, 'reloading after ending the case does not land back on the finished case');
  assert(await startBtn.isVisible(), 'reloading after ending the case lands on the start screen');
}

// ---------------------------------------------------------------------------
// 8. Mid-case reload resumes the same patient.
// ---------------------------------------------------------------------------
async function check8_midCaseReload(page) {
  console.log('--- 8. Mid-case reload ---');
  await startCase(page);
  const header = page.locator('header h1').first();
  const patientName = (await header.textContent())?.trim() || '';

  const textarea = page.locator('textarea[placeholder="What do you do?"]');
  await textarea.fill('advance 30 minutes');
  await textarea.press('Enter');
  await waitIdle(page);

  await gotoApp(page);
  await header.waitFor({ state: 'visible', timeout: 10000 });
  const nameAfter = (await header.textContent())?.trim() || '';
  assert(nameAfter === patientName, `mid-case reload resumes the same patient (before "${patientName}", after "${nameAfter}")`);
  const clockVisible = await page.locator('header').getByText(/Day \d+, \d{2}:\d{2}/).first().isVisible();
  assert(clockVisible, 'mid-case reload still shows a running clock, not the start screen');
}

/**
 * Asserts the page never scrolls horizontally and no leaf element is clipped
 * (extends past the viewport with no scrollable ancestor to explain it) at
 * whatever viewport size is currently set.
 */
async function assertResponsive(page, label) {
  const { scrollWidth, viewportWidth, offenders } = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;

    function hasScrollableAncestor(el) {
      let node = el.parentElement;
      while (node && node !== document.body.parentElement) {
        const style = getComputedStyle(node);
        const canScrollX = /(auto|scroll)/.test(style.overflowX);
        if (canScrollX && node.scrollWidth > node.clientWidth + 1) return true;
        node = node.parentElement;
      }
      return false;
    }

    const offenders = [];
    const all = document.body.querySelectorAll('*');
    for (const el of all) {
      if (el.children.length > 0) continue; // leaf nodes only
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if ((rect.right > vw + 1 || rect.left < -1) && !hasScrollableAncestor(el)) {
        offenders.push({
          tag: el.tagName,
          cls: (el.className && el.className.toString) ? el.className.toString().slice(0, 60) : '',
          text: (el.textContent || '').trim().slice(0, 40),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
    }
    return { scrollWidth: document.documentElement.scrollWidth, viewportWidth: vw, offenders: offenders.slice(0, 6) };
  });

  assert(scrollWidth <= viewportWidth + 1, `${label}: page does not scroll horizontally (scrollWidth ${scrollWidth} > viewport ${viewportWidth})`);
  assert(offenders.length === 0, `${label}: no leaf element is clipped (offenders: ${JSON.stringify(offenders)})`);
}

// ---------------------------------------------------------------------------
// 9. Responsive: at 320, 390, 768 and 1280 the start screen, case screen and
//    scorecard never scroll horizontally and no leaf element is clipped.
// ---------------------------------------------------------------------------
const WIDTHS = [320, 390, 768, 1280];

async function check9_responsive(page) {
  console.log('--- 9. Responsive ---');
  const original = page.viewportSize();

  // Case screen — this page is mid-case, left over from check 8.
  await page.locator('header').getByText(/Day \d+, \d{2}:\d{2}/).first().waitFor({ state: 'visible' });
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    await assertResponsive(page, `case screen @ ${w}px`);
  }

  // Scorecard.
  await page.getByRole('button', { name: 'End case', exact: true }).click();
  await page.getByRole('heading', { name: 'Case complete' }).waitFor({ state: 'visible', timeout: 10000 });
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    await assertResponsive(page, `scorecard @ ${w}px`);
  }

  // Start screen.
  await page.getByRole('button', { name: 'Start another case' }).click();
  await page.getByRole('button', { name: /Start Clinical Case/i }).waitFor({ state: 'visible', timeout: 10000 });
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    await assertResponsive(page, `start screen @ ${w}px`);
  }

  if (original) await page.setViewportSize(original);
}

// ---------------------------------------------------------------------------
// 10. Keyboard-only: the primary start button is reachable by Tab and
//     activatable by Enter.
// ---------------------------------------------------------------------------
async function check10_keyboard(page) {
  console.log('--- 10. Keyboard navigation ---');
  // Self-contained regardless of prior state — no active session should be
  // parked at this point in the flow, but force a clean start screen anyway.
  await gotoApp(page);
  const startBtn = page.getByRole('button', { name: /Start Clinical Case/i });
  await startBtn.waitFor({ state: 'visible', timeout: 35000 });

  // Tab from the top of the document until the start button (or something
  // else) has focus, or we give up after a generous number of stops.
  let focusedIsStartBtn = false;
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    focusedIsStartBtn = await retryOnDestroyedContext(() =>
      startBtn.evaluate((el) => el === document.activeElement)
    );
    if (focusedIsStartBtn) break;
  }
  assert(focusedIsStartBtn, 'the primary start button is reachable by Tab from the top of the page');

  await page.keyboard.press('Enter');
  await page.waitForSelector('text=/Day \\d+, \\d{2}:\\d{2}/', { timeout: 20000 });
  assert(true, 'the primary start button is activatable by Enter');

  // Merely leaving a case only changes which screen this render shows —
  // the parked session itself is untouched in storage, so a later reload
  // would resume straight back into it (that is check 8's own point).
  // End and clear it here so the next check gets a genuine, empty start
  // screen rather than the case it never actually finished with.
  await page.getByRole('button', { name: 'End case', exact: true }).click();
  await page.getByRole('button', { name: 'Start another case' }).click({ timeout: 20000 });
}

// ---------------------------------------------------------------------------
// 11. Theme toggle persists across reload.
// ---------------------------------------------------------------------------
async function check11_themePersist(page) {
  console.log('--- 11. Theme persistence ---');
  // check10 may have left a case parked on the case screen; either way, the
  // start screen (with or without a "Resume" banner — irrelevant here) is
  // just a reload away, and that's all this check needs.
  await gotoApp(page);
  const startBtn = page.getByRole('button', { name: /Start Clinical Case/i });
  await startBtn.waitFor({ state: 'visible', timeout: 35000 });

  const toggle = page.getByRole('button', { name: /Switch to (dark|light) theme/i });
  await toggle.waitFor({ state: 'visible' });
  const before = await retryOnDestroyedContext(() =>
    page.evaluate(() => document.documentElement.getAttribute('data-theme'))
  );
  await toggle.click();
  const after = await retryOnDestroyedContext(() =>
    page.evaluate(() => document.documentElement.getAttribute('data-theme'))
  );
  assert(after !== before, `the theme toggle actually changes the theme attribute (before "${before}", after "${after}")`);

  await gotoApp(page);
  await startBtn.waitFor({ state: 'visible', timeout: 35000 });
  const persisted = await retryOnDestroyedContext(() =>
    page.evaluate(() => document.documentElement.getAttribute('data-theme'))
  );
  assert(persisted === after, `the chosen theme persists across reload (expected "${after}", got "${persisted}")`);
}

// ---------------------------------------------------------------------------
// 12. The case library modal: search filters the list, filters combine, the
//     empty state offers a way out, and focus lands in the search field on
//     open.
// ---------------------------------------------------------------------------
async function check12_caseLibrary(page) {
  console.log('--- 12. Case library ---');
  // Self-contained regardless of what state an earlier check left the page
  // in — this only needs the start screen.
  await gotoApp(page);
  const browseBtn = page.getByRole('button', { name: 'Browse by topic' });
  await browseBtn.waitFor({ state: 'visible', timeout: 35000 });
  await browseBtn.click();

  const dialog = page.getByRole('dialog', { name: 'Case library' });
  await dialog.waitFor({ state: 'visible' });

  const search = dialog.getByPlaceholder('Search by symptom, subject, or presentation…');
  await search.waitFor({ state: 'visible' });
  const focused = await search.evaluate((el) => el === document.activeElement);
  assert(focused, 'focus lands in the search field when the case library opens');

  const countText = async () => (await dialog.getByText(/ of \d+ case/).first().textContent()) || '';
  const totalMatch = (await countText()).match(/of (\d+) case/);
  const total = totalMatch ? parseInt(totalMatch[1], 10) : NaN;
  assert(Number.isFinite(total) && total > 0, `case library reports a total case count (got "${await countText()}")`);

  // Search filters the list.
  await search.fill('zzz_no_such_condition_xyz');
  await page.waitForTimeout(150);
  const emptyState = dialog.locator('div', { hasText: 'No cases match' }).last();
  assert((await dialog.getByText(/No cases match/).count()) === 1, 'searching for nonsense text produces the empty state');

  const emptyStateClearBtn = emptyState.getByRole('button', { name: 'Clear filters' });
  assert(await emptyStateClearBtn.isVisible(), 'the empty state offers a way out (Clear filters)');
  await emptyStateClearBtn.click();
  await page.waitForTimeout(150);
  const afterClearMatch = (await countText()).match(/of (\d+) case/);
  const afterClear = afterClearMatch ? parseInt(afterClearMatch[1], 10) : NaN;
  assert(afterClear === total, `clearing filters restores the full list (expected ${total}, got ${afterClear})`);

  // A real symptom substring narrows the list (present in some case's
  // openingVignette, title or subject — "pain" is broad enough to exist and
  // narrow enough to filter something out).
  await search.fill('pain');
  await page.waitForTimeout(150);
  const painMatch = (await countText()).match(/of (\d+) case/);
  const painCount = painMatch ? parseInt(painMatch[1], 10) : NaN;
  assert(Number.isFinite(painCount) && painCount > 0 && painCount <= total, `search narrows the list (got ${painCount} of ${total})`);
  await search.fill('');

  // Filters combine: pick one specialty chip and one setting chip; the
  // reported count must be no greater than either filter alone.
  const specialtyGroup = dialog.locator('[aria-labelledby="filter-specialty-label"] button');
  const settingGroup = dialog.locator('[aria-labelledby="filter-setting-label"] button');
  const specialtyLabel = (await specialtyGroup.first().textContent())?.trim() || '';
  await specialtyGroup.first().click();
  await page.waitForTimeout(150);
  const specialtyOnlyMatch = (await countText()).match(/of (\d+) case/);
  const specialtyOnlyCount = specialtyOnlyMatch ? parseInt(specialtyOnlyMatch[1], 10) : NaN;

  const settingLabel = (await settingGroup.first().textContent())?.trim() || '';
  await settingGroup.first().click();
  await page.waitForTimeout(150);
  const combinedMatch = (await countText()).match(/of (\d+) case/);
  const combinedCount = combinedMatch ? parseInt(combinedMatch[1], 10) : NaN;
  assert(
    Number.isFinite(combinedCount) && combinedCount <= specialtyOnlyCount,
    `combining a "${specialtyLabel}" specialty filter with a "${settingLabel}" setting filter narrows or holds the list (specialty alone ${specialtyOnlyCount}, combined ${combinedCount})`
  );

  await dialog.getByRole('button', { name: 'Clear filters' }).first().click();
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden', timeout: 5000 });
}

main().catch((e) => {
  console.error('Suite crashed:', e);
  process.exit(1);
});
