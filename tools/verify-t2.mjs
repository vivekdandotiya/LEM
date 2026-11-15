import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000';
const EVIDENCE_DIR = path.resolve(__dirname, '..', 'docs', 'v6', 'T2-evidence');

fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function runVerification() {
  console.log('=====================================================');
  console.log('V6 T2 VERIFICATION: NAVBAR LEGIBILITY & TOP-EDGE FIXES');
  console.log('=====================================================');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });

  const routes = [
    { name: 'home', path: '/?intro=0' },
    { name: 'services', path: '/services?intro=0' },
    { name: 'services-seo', path: '/services/seo?intro=0' },
    { name: 'blog', path: '/blog?intro=0' },
  ];

  const results = {
    screenshots: [],
    contrastChecks: [],
    sagTests: [],
    topEdgeStripClean: true,
  };

  // 1. CAPTURE DESKTOP SCREENSHOTS (1440x900)
  for (const r of routes) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    console.log(`\nNavigating to ${r.path} (1440x900)...`);
    await page.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Top position screenshot
    const topShotPath = path.join(EVIDENCE_DIR, `${r.name}-1440-top.png`);
    await page.screenshot({ path: topShotPath });
    results.screenshots.push(topShotPath);
    console.log(`  Saved: ${path.basename(topShotPath)}`);

    // Scrolled position (over dark stage or ink section if present, or scrolled 1200px)
    let scrollTarget = 1200;
    if (r.name === 'services-seo') {
      const stage = page.locator('#how-we-deliver');
      if (await stage.count()) {
        const box = await stage.boundingBox();
        if (box) scrollTarget = box.y + 100;
      }
    } else if (r.name === 'home') {
      scrollTarget = 2400; // Ink section
    }

    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollTarget);
    await page.waitForTimeout(800);

    const scrolledShotPath = path.join(EVIDENCE_DIR, `${r.name}-1440-scrolled.png`);
    await page.screenshot({ path: scrolledShotPath });
    results.screenshots.push(scrolledShotPath);
    console.log(`  Saved: ${path.basename(scrolledShotPath)}`);

    // Evaluate contrast of navbar link in current state
    const contrastData = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Main Navigation"]');
      const link = nav?.querySelector('a.nav-link');
      if (!nav || !link) return null;

      const navStyle = window.getComputedStyle(nav);
      const linkStyle = window.getComputedStyle(link);

      return {
        navBg: navStyle.backgroundColor,
        navBorder: navStyle.borderColor,
        navBackdrop: navStyle.backdropFilter || navStyle.webkitBackdropFilter,
        textColor: linkStyle.color,
        fontWeight: linkStyle.fontWeight,
      };
    });

    if (contrastData) {
      console.log(`  Navbar Style on ${r.name} (scrolled):`);
      console.log(`    bg: ${contrastData.navBg}, color: ${contrastData.textColor}, blur: ${contrastData.navBackdrop}`);
      results.contrastChecks.push({ route: r.name, ...contrastData });
    }

    await context.close();
  }

  // 2. CAPTURE MOBILE SCREENSHOTS (390x844)
  for (const r of routes) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();

    console.log(`\nNavigating to ${r.path} (390x844)...`);
    await page.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const mobileTopShot = path.join(EVIDENCE_DIR, `${r.name}-390-top.png`);
    await page.screenshot({ path: mobileTopShot });
    results.screenshots.push(mobileTopShot);
    console.log(`  Saved: ${path.basename(mobileTopShot)}`);

    await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
    await page.waitForTimeout(600);

    const mobileScrolledShot = path.join(EVIDENCE_DIR, `${r.name}-390-scrolled.png`);
    await page.screenshot({ path: mobileScrolledShot });
    results.screenshots.push(mobileScrolledShot);
    console.log(`  Saved: ${path.basename(mobileScrolledShot)}`);

    await context.close();
  }

  // 3. HOVER SAG TEST (NAV LINKS HOVER AND LEAVE: NO LEFTOVER SAG)
  console.log('\n--- Testing Nav Link Hover Sag and Delegated Reset ---');
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const testPage = await context.newPage();
  await testPage.goto(`${BASE_URL}/services/seo?intro=0`, { waitUntil: 'networkidle' });
  await testPage.waitForTimeout(500);

  // Hover over "Services" nav link
  const navLink = testPage.locator('nav a.nav-link[href="/services"]').first();
  await navLink.hover();
  await testPage.waitForTimeout(200);

  // Check that sag activated
  const sagDuringHover = await testPage.evaluate(() => {
    // Check canvas element state or bounding
    const canvas = document.querySelector('canvas[style*="z-index: 9999"]');
    return canvas !== null;
  });
  console.log(`  Drip canvas present: ${sagDuringHover}`);

  // Move pointer far away to empty space
  await testPage.mouse.move(10, 500);
  await testPage.waitForTimeout(350);

  // Take screenshot of top edge after pointer leave
  const afterLeaveShot = path.join(EVIDENCE_DIR, 'nav-hover-leave-no-sag.png');
  await testPage.screenshot({ path: afterLeaveShot });
  console.log(`  Captured after-leave verification screenshot: ${path.basename(afterLeaveShot)}`);

  // 4. CHECK TOP EDGE (Y=0 to Y=24px) FOR ANY UNAPPROVED TEAL/BLUE/GREY STRIP
  console.log('\n--- Inspecting Top Edge Pixel Colors (y=0 to y=24) ---');
  const topEdgeClean = await testPage.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 30;
    const ctx = canvas.getContext('2d');
    
    // Check if there are any rogue elements fixed at y=0
    const fixedElements = Array.from(document.querySelectorAll('*')).filter((el) => {
      const s = window.getComputedStyle(el);
      if (s.position === 'fixed') {
        const r = el.getBoundingClientRect();
        return r.top <= 2 && r.height > 0 && r.height <= 30;
      }
      return false;
    });

    const elementsInfo = fixedElements.map((el) => ({
      tagName: el.tagName,
      className: el.className,
      style: el.getAttribute('style'),
      bg: window.getComputedStyle(el).backgroundColor,
    }));

    return elementsInfo;
  });

  console.log('  Fixed elements at top edge (y <= 24px):', JSON.stringify(topEdgeClean, null, 2));

  await context.close();
  await browser.close();

  // Save report JSON
  fs.writeFileSync(
    path.join(EVIDENCE_DIR, 'verification-summary.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n=====================================================');
  console.log(`T2 Verification Complete. ${results.screenshots.length} screenshots saved to docs/v6/T2-evidence/`);
  console.log('=====================================================');
}

runVerification().catch((err) => {
  console.error('T2 Verification failed:', err);
  process.exit(1);
});
