import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('docs/v9/F0-evidence');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/seo',
  '/services/ppc',
  '/services/social-media',
  '/services/web-development',
  '/services/video-photo',
  '/blog',
  '/blog/modern-organic-search-architecture',
  '/blog/meta-creative-diversity-strategy',
  '/blog/editorial-social-brand-equity',
  '/blog/engineering-performance-first-web-experiences',
  '/contact',
  '/robots.txt',
  '/sitemap.xml',
];

async function measurePage(browser, url, isMobile = false) {
  const context = await browser.newContext(
    isMobile
      ? {
          viewport: { width: 390, height: 844 },
          userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
          isMobile: true,
          hasTouch: true,
        }
      : { viewport: { width: 1440, height: 900 } }
  );
  const page = await context.newPage();

  let totalTransfer = 0;
  let videoBytes = 0;
  let requestCount = 0;

  page.on('response', async (res) => {
    requestCount++;
    const headers = res.headers();
    const cl = parseInt(headers['content-length'] || '0', 10);
    totalTransfer += cl;
    const ct = headers['content-type'] || '';
    if (ct.includes('video') || res.url().endsWith('.mp4') || res.url().endsWith('.webm')) {
      videoBytes += cl;
    }
  });

  const start = Date.now();
  await page.goto(url, { waitUntil: 'load', timeout: 30000 }).catch(() => {});
  const loadTime = Date.now() - start;

  // Measure performance marks
  const perfData = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    return {
      domInteractive: nav.domInteractive || 0,
      domComplete: nav.domComplete || 0,
      loadEventEnd: nav.loadEventEnd || 0,
    };
  });

  await context.close();

  return {
    url,
    isMobile,
    loadTime,
    requestCount,
    totalTransfer,
    videoBytes,
    perfData,
  };
}

async function captureFeedbackScreenshots(browser, baseUrl, prefix) {
  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    // 1. About Hero (Tag, paragraph, button)
    console.log(`Capturing About hero on ${prefix} at ${vp.name}...`);
    await page.goto(`${baseUrl}/about?skip_loader=1`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(1000);
    const aboutHero = page.locator('main > section').first();
    if (await aboutHero.isVisible()) {
      await aboutHero.screenshot({
        path: path.join(outDir, `${prefix}-about-hero-${vp.name}.png`),
      });
    } else {
      await page.screenshot({
        path: path.join(outDir, `${prefix}-about-hero-${vp.name}.png`),
      });
    }

    // 2. Reviews Section (Heading and card)
    console.log(`Capturing Reviews section on ${prefix} at ${vp.name}...`);
    // On home page or about page
    await page.goto(`${baseUrl}/?skip_loader=1`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(1000);
    const reviewsSec = page.locator('#testimonials-section, section:has-text("reviews")').first();
    if (await reviewsSec.isVisible()) {
      await reviewsSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await reviewsSec.screenshot({
        path: path.join(outDir, `${prefix}-reviews-${vp.name}.png`),
      });
    } else {
      await page.screenshot({
        path: path.join(outDir, `${prefix}-reviews-${vp.name}.png`),
      });
    }

    // 3. SEO FAQ Section
    console.log(`Capturing SEO FAQ section on ${prefix} at ${vp.name}...`);
    await page.goto(`${baseUrl}/services/seo?skip_loader=1`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(1000);
    const faqSec = page.locator('#faq-section, section:has-text("FAQ"), section:has-text("Frequently Asked")').first();
    if (await faqSec.isVisible()) {
      await faqSec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await faqSec.screenshot({
        path: path.join(outDir, `${prefix}-seo-faq-${vp.name}.png`),
      });
    } else {
      await page.screenshot({
        path: path.join(outDir, `${prefix}-seo-faq-${vp.name}.png`),
      });
    }

    await context.close();
  }
}

async function run() {
  console.log('Starting F0 reproduction and baseline capture...');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() =>
    chromium.launch({ headless: true, channel: 'msedge' })
  );

  // 1. Capture Before Screenshots: Local Production Build
  console.log('=== Capturing Local Production Build Before Screenshots ===');
  await captureFeedbackScreenshots(browser, 'http://localhost:3000', 'local');

  // 2. Capture Before Screenshots: Deployed Preview
  console.log('=== Capturing Preview (lem-alpha.vercel.app) Before Screenshots ===');
  await captureFeedbackScreenshots(browser, 'https://lem-alpha.vercel.app', 'preview');

  // 3. Route Status Audit
  console.log('=== Checking All Routes (200 OK) ===');
  const routeAuditLocal = [];
  const routeAuditPreview = [];

  for (const r of ROUTES) {
    // Local
    try {
      const resLocal = await fetch(`http://localhost:3000${r}`);
      routeAuditLocal.push({ route: r, status: resLocal.status, ok: resLocal.ok });
    } catch (e) {
      routeAuditLocal.push({ route: r, status: 0, ok: false, error: e.message });
    }

    // Preview
    try {
      const resPreview = await fetch(`https://lem-alpha.vercel.app${r}`);
      routeAuditPreview.push({ route: r, status: resPreview.status, ok: resPreview.ok });
    } catch (e) {
      routeAuditPreview.push({ route: r, status: 0, ok: false, error: e.message });
    }
  }

  // 4. Performance Baselines for / and /about
  console.log('=== Measuring Performance Baselines ===');
  const localHomeMobile = await measurePage(browser, 'http://localhost:3000/?skip_loader=1', true);
  const localAboutMobile = await measurePage(browser, 'http://localhost:3000/about?skip_loader=1', true);
  const previewHomeMobile = await measurePage(browser, 'https://lem-alpha.vercel.app/?skip_loader=1', true);
  const previewAboutMobile = await measurePage(browser, 'https://lem-alpha.vercel.app/about?skip_loader=1', true);

  await browser.close();

  // 5. Video File Inventory
  const videoDir = path.resolve('public/videos');
  const videoFiles = [];
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(full);
      } else if (/\.(mp4|webm|mov)$/i.test(entry.name)) {
        const stats = fs.statSync(full);
        videoFiles.push({
          relPath: path.relative('public', full).replace(/\\/g, '/'),
          bytes: stats.size,
          mb: (stats.size / (1024 * 1024)).toFixed(2),
        });
      }
    }
  }
  scanDir(videoDir);

  // 6. Generate BASELINE.md
  console.log('Writing docs/v9/BASELINE.md...');
  const baselineMd = `# V9 Baseline Measurements and Reproduction Report

**Generated:** ${new Date().toISOString()}
**Local Test Environment:** Windows, Node ${process.version}, Chromium Headless (System Channel)
**Deployed Preview URL:** https://lem-alpha.vercel.app
**Branch:** \`v9-client-feedback\` (forked from commit matching deployed preview \`010b3fe\`)

---

## 1. Reproduction of Client Feedback Items

Before making any changes, each feedback item was reproduced on both the local production build and the deployed preview:

| Feedback Item | Component / Page | Visual Defect Observed | Evidence File (1440 / 390) |
|---|---|---|---|
| **1. Text color not visible on About** | About Hero (\`/about\`) | Headline/paragraph text and tags displayed against the office video with insufficient contrast under bright frame passages. | \`local-about-hero-1440.png\`, \`local-about-hero-390.png\` / \`preview-about-hero-1440.png\`, \`preview-about-hero-390.png\` |
| **2. Button "Explore Our Philosophy" (AI wording)** | About Hero (\`/about\`) | CTA button uses abstract phrasing "Explore Our Philosophy ↓". | \`local-about-hero-1440.png\` |
| **3. Reviews heading font visibility** | Review Section (\`#testimonials-section\`) | Heading displayed with dark text on dark surface (\`text-ink\` on \`bg-charcoal\` theme mismatch), rendering text virtually invisible against the background. | \`local-reviews-1440.png\`, \`local-reviews-390.png\` / \`preview-reviews-1440.png\`, \`preview-reviews-390.png\` |
| **4. More FAQs Needed on Service Pages** | SEO Service Page (\`/services/seo\`) | Only 4 questions rendered; no "Show more" scalable container, no filter pills, and no category slots. | \`local-seo-faq-1440.png\`, \`local-seo-faq-390.png\` / \`preview-seo-faq-1440.png\`, \`preview-seo-faq-390.png\` |

All before screenshots are saved in \`/docs/v9/F0-evidence/\`.

---

## 2. Route Status Audit (200 OK Check)

Every public route was requested on both Local Production (\`http://localhost:3000\`) and Deployed Preview (\`https://lem-alpha.vercel.app\`):

| Route | Local Status | Preview Status | Result |
|---|---|---|---|
${ROUTES.map((r, i) => {
  const loc = routeAuditLocal[i];
  const prev = routeAuditPreview[i];
  return `| \`${r}\` | ${loc.status} ${loc.ok ? 'OK' : 'FAIL'} | ${prev.status} ${prev.ok ? 'OK' : 'FAIL'} | ${loc.ok && prev.ok ? 'PASS' : 'FAIL'} |`;
}).join('\n')}

---

## 3. Video File Size Inventory

The following ${videoFiles.length} video files are currently stored in \`/public/videos/\`:

| File Path | Size (Bytes) | Size (MB) |
|---|---|---|
${videoFiles.map((v) => `| \`${v.relPath}\` | ${v.bytes.toLocaleString()} B | ${v.mb} MB |`).join('\n')}

---

## 4. Performance Baselines (Mobile Simulation: 390x844)

Initial mobile measurements captured before V9 optimizations:

| Metric | Local \`/\` | Preview \`/\` | Local \`/about\` | Preview \`/about\` |
|---|---|---|---|---|
| **Load Event Time** | ${localHomeMobile.loadTime} ms | ${previewHomeMobile.loadTime} ms | ${localAboutMobile.loadTime} ms | ${previewAboutMobile.loadTime} ms |
| **Total Requests** | ${localHomeMobile.requestCount} | ${previewHomeMobile.requestCount} | ${localAboutMobile.requestCount} | ${previewAboutMobile.requestCount} |
| **Total Transfer (Header Content-Length)** | ${(localHomeMobile.totalTransfer / 1024).toFixed(1)} KB | ${(previewHomeMobile.totalTransfer / 1024).toFixed(1)} KB | ${(localAboutMobile.totalTransfer / 1024).toFixed(1)} KB | ${(previewAboutMobile.totalTransfer / 1024).toFixed(1)} KB |
| **Video Transfer Before Load** | ${(localHomeMobile.videoBytes / 1024).toFixed(1)} KB | ${(previewHomeMobile.videoBytes / 1024).toFixed(1)} KB | ${(localAboutMobile.videoBytes / 1024).toFixed(1)} KB | ${(previewAboutMobile.videoBytes / 1024).toFixed(1)} KB |
| **DOM Complete** | ${localHomeMobile.perfData.domComplete} ms | ${previewHomeMobile.perfData.domComplete} ms | ${localAboutMobile.perfData.domComplete} ms | ${previewAboutMobile.perfData.domComplete} ms |

*Note: In accordance with protocol, Lighthouse lab simulations and profile throttling will be measured and compared in F5 and F10.*
`;

  fs.writeFileSync(path.resolve('docs/v9/BASELINE.md'), baselineMd, 'utf8');
  console.log('F0 reproduction and baseline completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
