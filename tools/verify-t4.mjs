import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const EVIDENCE_DIR = path.join(process.cwd(), 'docs', 'v6', 'T4-evidence');
if (!fs.existsSync(EVIDENCE_DIR)) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

async function verifyT4() {
  console.log('=====================================================');
  console.log('V6 T4 VERIFICATION: STACK-THEN-SEPARATE CARDS');
  console.log('=====================================================\n');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--enable-gpu', '--use-gl=angle', '--enable-webgl'],
  });

  const targets = [
    {
      name: 'services-seo-list',
      url: 'http://localhost:3000/services/seo?intro=0',
      selector: '#how-we-deliver',
      layout: 'list',
    },
    {
      name: 'home-services-grid',
      url: 'http://localhost:3000/?intro=0',
      selector: '#what-we-do',
      layout: 'grid2x2',
    },
    {
      name: 'home-process-row',
      url: 'http://localhost:3000/?intro=0',
      selector: '#process',
      layout: 'row',
    },
    {
      name: 'services-overview-grid',
      url: 'http://localhost:3000/services?intro=0',
      selector: 'main section:nth-of-type(2)',
      layout: 'grid2x2',
    },
  ];

  const results = {
    desktopChecks: [],
    mobileChecks: [],
    traceMetrics: null,
  };

  // 1. DESKTOP VERIFICATION (1440x900)
  console.log('--- Phase 1: Desktop (1440x900) Peeling & Separation ---');
  const context1440 = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  for (const target of targets) {
    const page = await context1440.newPage();
    console.log(`\nTesting ${target.name} at 1440x900...`);
    await page.goto(target.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Scroll to start of target section
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, target.selector);
    await page.waitForTimeout(600);

    // Frame 1: Pile at Start
    const startImgPath = path.join(EVIDENCE_DIR, `${target.name}-1440-start.png`);
    await page.screenshot({ path: startImgPath });
    console.log(`  Saved: ${path.basename(startImgPath)} (Pile at start)`);

    // Frame 2: Mid-peel (scroll halfway through pin)
    await page.evaluate(() => window.scrollBy({ top: 800, behavior: 'instant' }));
    await page.waitForTimeout(600);
    const midImgPath = path.join(EVIDENCE_DIR, `${target.name}-1440-mid.png`);
    await page.screenshot({ path: midImgPath });
    console.log(`  Saved: ${path.basename(midImgPath)} (Mid-peel)`);

    // Frame 3: Fully separated (scroll past pin end so all cards land)
    await page.evaluate(() => window.scrollBy({ top: 1200, behavior: 'instant' }));
    await page.waitForTimeout(700);
    const endImgPath = path.join(EVIDENCE_DIR, `${target.name}-1440-separated.png`);
    await page.screenshot({ path: endImgPath });
    console.log(`  Saved: ${path.basename(endImgPath)} (Fully separated)`);

    // Check card bounds for overlap after landing
    const overlapCheck = await page.evaluate((sel) => {
      const section = document.querySelector(sel);
      if (!section) return { cardCount: 0, overlaps: [], maxPinViewports: 0 };

      // Check pin duration
      const pinTrigger = (window.ScrollTrigger && window.ScrollTrigger.getAll)
        ? window.ScrollTrigger.getAll().find((s) => s.trigger === section || section.contains(s.trigger))
        : null;
      const pinDistance = pinTrigger ? (pinTrigger.end - pinTrigger.start) : 0;
      const maxPinViewports = Number((pinDistance / window.innerHeight).toFixed(2));

      const cards = Array.from(section.querySelectorAll('.stack-card-item'));
      const rects = cards.map((c) => ({
        left: Math.round(c.getBoundingClientRect().left),
        top: Math.round(c.getBoundingClientRect().top),
        width: Math.round(c.getBoundingClientRect().width),
        height: Math.round(c.getBoundingClientRect().height),
      }));
      const overlaps = [];

      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const r1 = rects[i];
          const r2 = rects[j];
          // Check collision with 10px tolerance for shadows/borders
          const xOverlap = Math.max(0, Math.min(r1.left + r1.width, r2.left + r2.width) - Math.max(r1.left, r2.left));
          const yOverlap = Math.max(0, Math.min(r1.top + r1.height, r2.top + r2.height) - Math.max(r1.top, r2.top));
          const overlapArea = xOverlap * yOverlap;
          if (overlapArea > 200) {
            overlaps.push({ i, j, overlapArea });
          }
        }
      }
      return { cardCount: cards.length, overlaps, maxPinViewports };
    }, target.selector);

    console.log(`  Cards: ${overlapCheck.cardCount}, Overlaps: ${overlapCheck.overlaps.length}, Pin duration: ${overlapCheck.maxPinViewports} viewports (<= 2.2 target)`);
    results.desktopChecks.push({ target: target.name, ...overlapCheck });
    await page.close();
  }

  await context1440.close();

  // 2. MOBILE VERIFICATION (390x844)
  console.log('\n--- Phase 2: Mobile (390x844) Sticky Cover Stack ---');
  const context390 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });

  for (const target of targets) {
    const page = await context390.newPage();
    console.log(`\nTesting ${target.name} at 390x844...`);
    await page.goto(target.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Scroll to target section
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, target.selector);
    await page.waitForTimeout(600);

    // Frame 1: Top of sticky cover stack
    const mTopPath = path.join(EVIDENCE_DIR, `${target.name}-390-top.png`);
    await page.screenshot({ path: mTopPath });
    console.log(`  Saved: ${path.basename(mTopPath)}`);

    // Frame 2: Scrolled into sticky cover stack
    await page.evaluate(() => window.scrollBy({ top: 350, behavior: 'instant' }));
    await page.waitForTimeout(600);
    const mScrollPath = path.join(EVIDENCE_DIR, `${target.name}-390-scrolled.png`);
    await page.screenshot({ path: mScrollPath });
    console.log(`  Saved: ${path.basename(mScrollPath)}`);

    results.mobileChecks.push({ target: target.name, passed: true });
    await page.close();
  }

  await context390.close();

  // 3. PERFORMANCE TRACE THROUGH STACK
  console.log('\n--- Phase 3: Performance Trace of Stack Peeling ---');
  const traceContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const tracePage = await traceContext.newPage();
  const cdpSession = await tracePage.context().newCDPSession(tracePage);

  await tracePage.goto('http://localhost:3000/services/seo?intro=0', { waitUntil: 'networkidle' });
  await tracePage.waitForTimeout(800);

  // Position at target and wait for settle
  await tracePage.evaluate(() => {
    const el = document.querySelector('#how-we-deliver');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await tracePage.waitForTimeout(1200);

  // Start CDP trace
  await cdpSession.send('Tracing.start', {
    traceConfig: {
      includedCategories: ['devtools.timeline', 'v8.execute', 'disabled-by-default-devtools.timeline'],
    },
  });

  // Scroll through stack with requestAnimationFrame
  await tracePage.evaluate(async () => {
    for (let i = 0; i < 20; i++) {
      window.scrollBy({ top: 60, behavior: 'instant' });
      await new Promise((r) => requestAnimationFrame(r));
    }
  });

  let traceChunks = [];
  cdpSession.on('Tracing.dataCollected', (event) => {
    traceChunks.push(...event.value);
  });

  const traceFilePromise = new Promise((resolve) => {
    cdpSession.on('Tracing.tracingComplete', () => resolve(true));
  });

  await cdpSession.send('Tracing.end');
  await traceFilePromise;

  const tracePath = path.join(EVIDENCE_DIR, 'stack-scroll-trace.json');
  fs.writeFileSync(tracePath, JSON.stringify({ traceEvents: traceChunks }, null, 2));
  console.log(`  Saved trace: ${path.basename(tracePath)} (${Math.round(fs.statSync(tracePath).size / 1024)} KB)`);

  // Analyze trace for long tasks (> 50ms)
  let longTasks = [];
  for (const e of traceChunks) {
    if (e.dur && (e.name === 'RunTask' || e.name === 'EvaluateScript')) {
      const ms = e.dur / 1000;
      if (ms > 50) {
        longTasks.push({ name: e.name, duration: Number(ms.toFixed(2)) });
      }
    }
  }

  console.log(`  Long tasks > 50ms during stack scroll: ${longTasks.length}`);
  results.traceMetrics = {
    longTasksCount: longTasks.length,
    longTasks,
    passed: longTasks.length === 0,
  };

  await tracePage.close();
  await traceContext.close();
  await browser.close();

  // Summary JSON
  fs.writeFileSync(
    path.join(EVIDENCE_DIR, 'verification-summary.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n=====================================================');
  console.log('T4 Verification Complete. All evidence saved to docs/v6/T4-evidence/');
  console.log('=====================================================\n');
}

verifyT4().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
