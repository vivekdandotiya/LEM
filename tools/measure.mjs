import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000';
const EVIDENCE_DIR = path.resolve(__dirname, '..', 'docs', 'v6', 'T0-evidence');
const TRACE_DIR = path.join(EVIDENCE_DIR, 'traces');

fs.mkdirSync(TRACE_DIR, { recursive: true });

const ROUTES = [
  { name: 'home', path: '/?intro=0' },
  { name: 'services-overview', path: '/services?intro=0' },
  { name: 'services-seo', path: '/services/seo?intro=0' },
  { name: 'services-ppc', path: '/services/ppc?intro=0' },
  { name: 'services-social-media', path: '/services/social-media?intro=0' },
  { name: 'services-web-development', path: '/services/web-development?intro=0' },
];

function calculateStats(samples) {
  if (!samples.length) return { count: 0, median: 0, p95: 0, max: 0, mean: 0 };
  const sorted = [...samples].sort((a, b) => a - b);
  const count = sorted.length;
  const median = sorted[Math.floor(count * 0.5)];
  const p95 = sorted[Math.floor(count * 0.95)];
  const max = sorted[count - 1];
  const mean = sorted.reduce((sum, v) => sum + v, 0) / count;
  return {
    count,
    median: Number(median.toFixed(2)),
    p95: Number(p95.toFixed(2)),
    max: Number(max.toFixed(2)),
    mean: Number(mean.toFixed(2)),
  };
}

async function recordRoute(browser, route, cpuThrottling = 1) {
  const profileName = cpuThrottling === 1 ? 'normal' : `cpu-${cpuThrottling}x`;
  console.log(`\n--- Recording ${route.name} (${profileName}) ---`);

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  const client = await context.newCDPSession(page);

  if (cpuThrottling > 1) {
    await client.send('Emulation.setCPUThrottlingRate', { rate: cpuThrottling });
  }

  // Navigate to page
  await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Set up in-page frame and long-task monitors
  await page.evaluate(() => {
    window.__frameDeltas = [];
    window.__longTasks = [];
    window.__longAnimationFrames = [];

    let lastTime = performance.now();
    let isTracking = true;

    function step(now) {
      if (!isTracking) return;
      const delta = now - lastTime;
      lastTime = now;
      window.__frameDeltas.push(delta);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // PerformanceObserver for long tasks
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__longTasks.push({
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime,
          });
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch {}

    // PerformanceObserver for long-animation-frame
    try {
      const loafObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__longAnimationFrames.push({
            duration: entry.duration,
            blockingDuration: entry.blockingDuration,
            startTime: entry.startTime,
          });
        }
      });
      loafObserver.observe({ type: 'long-animation-frame', buffered: true });
    } catch {}

    window.__stopTracking = () => {
      isTracking = false;
    };
  });

  // Start CDP Tracing
  const traceEvents = [];
  client.on('Tracing.dataCollected', (data) => {
    traceEvents.push(...data.value);
  });

  await client.send('Tracing.start', {
    traceConfig: {
      includedCategories: [
        '-*',
        'devtools.timeline',
        'v8.execute',
        'disabled-by-default-devtools.timeline',
        'disabled-by-default-devtools.timeline.frame',
        'toplevel',
        'blink.console',
      ],
    },
  });

  // Scroll smoothly from top to bottom
  const scrollSteps = 40;
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const stepAmount = totalHeight / scrollSteps;

  for (let i = 0; i < scrollSteps; i++) {
    await page.evaluate((y) => window.scrollBy({ top: y, behavior: 'instant' }), stepAmount);
    await page.waitForTimeout(60);
  }

  // Hold at bottom
  await page.waitForTimeout(500);

  // Stop tracking
  await page.evaluate(() => {
    if (window.__stopTracking) window.__stopTracking();
  });

  // Stop Tracing
  await new Promise((resolve) => {
    client.on('Tracing.tracingComplete', resolve);
    client.send('Tracing.end');
  });

  // Collect in-page performance data
  const metrics = await page.evaluate(() => {
    return {
      frames: window.__frameDeltas ? window.__frameDeltas.slice(2) : [], // slice initial rAF jump
      longTasks: window.__longTasks || [],
      loaf: window.__longAnimationFrames || [],
    };
  });

  // Save trace file
  const traceFilename = `${route.name}-${profileName}.json`;
  const tracePath = path.join(TRACE_DIR, traceFilename);
  fs.writeFileSync(tracePath, JSON.stringify({ traceEvents }, null, 2));

  const stats = calculateStats(metrics.frames);
  const maxLongTask = metrics.longTasks.reduce((max, t) => Math.max(max, t.duration), 0);

  console.log(`  Frames sampled: ${stats.count}`);
  console.log(`  Median frame time: ${stats.median} ms`);
  console.log(`  95th percentile: ${stats.p95} ms (target <= 24ms normal, <= 40ms 4x)`);
  console.log(`  Max frame time: ${stats.max} ms`);
  console.log(`  Long tasks (>50ms): ${metrics.longTasks.length} (Max: ${maxLongTask.toFixed(1)} ms)`);
  console.log(`  Trace saved to: ${traceFilename} (${(fs.statSync(tracePath).size / 1024 / 1024).toFixed(2)} MB)`);

  await context.close();

  return {
    route: route.name,
    path: route.path,
    profile: profileName,
    cpuThrottling,
    stats,
    longTasksCount: metrics.longTasks.length,
    maxLongTask: Number(maxLongTask.toFixed(1)),
    loafCount: metrics.loaf.length,
    traceFilename,
  };
}

async function run() {
  console.log('=====================================================');
  console.log('V6 T0 BASELINE MEASUREMENT — HEADED GOOGLE CHROME');
  console.log('Production Build on http://localhost:3000');
  console.log('=====================================================');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--enable-gpu', '--window-size=1440,900', '--hide-scrollbars'],
  });

  const results = [];

  // 1. Normal Profile (1x)
  console.log('\n>>> PHASE 1: NORMAL PROFILE (1x CPU) <<<');
  for (const route of ROUTES) {
    const res = await recordRoute(browser, route, 1);
    results.push(res);
  }

  // 2. CPU 4x Throttle Profile
  console.log('\n>>> PHASE 2: 4x CPU SLOWDOWN PROFILE <<<');
  for (const route of ROUTES) {
    const res = await recordRoute(browser, route, 4);
    results.push(res);
  }

  await browser.close();

  // Save summary
  const summaryPath = path.join(EVIDENCE_DIR, 'baseline-metrics.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
  console.log(`\nMetrics summary saved to: ${summaryPath}`);

  return results;
}

run().catch((err) => {
  console.error('Fatal measurement error:', err);
  process.exit(1);
});
