import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const FINAL_DIR = path.join(process.cwd(), 'docs', 'v6', 'final');
fs.mkdirSync(FINAL_DIR, { recursive: true });

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'services-seo', path: '/services/seo' },
  { name: 'blog', path: '/blog' },
  { name: 'contact', path: '/contact' },
];

async function capture() {
  console.log('=====================================================');
  console.log('CAPTURING V6 FINAL SCREENSHOTS');
  console.log('=====================================================\n');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--enable-gpu', '--use-gl=angle', '--enable-webgl'],
  });

  // Desktop (1440x900)
  console.log('--- Capturing Desktop (1440x900) ---');
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const r of ROUTES) {
    const page = await desktopCtx.newPage();
    console.log(`Loading ${r.name} at 1440x900...`);
    await page.goto(`http://localhost:3000${r.path}?intro=0`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Capture above-the-fold
    await page.screenshot({
      path: path.join(FINAL_DIR, `${r.name}-1440-hero.png`),
      animations: 'allow',
    });

    // Scroll down 800px to capture scrolled content
    await page.evaluate(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo(800, { immediate: true });
      } else {
        window.scrollTo(0, 800);
      }
    });
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(FINAL_DIR, `${r.name}-1440-scrolled.png`),
      animations: 'allow',
    });

    console.log(`  Saved: ${r.name}-1440-hero.png and ${r.name}-1440-scrolled.png`);
    await page.close();
  }
  await desktopCtx.close();

  // Mobile (390x844)
  console.log('\n--- Capturing Mobile (390x844) ---');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });

  for (const r of ROUTES) {
    const page = await mobileCtx.newPage();
    console.log(`Loading ${r.name} at 390x844...`);
    await page.goto(`http://localhost:3000${r.path}?intro=0`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Capture above-the-fold
    await page.screenshot({
      path: path.join(FINAL_DIR, `${r.name}-390-hero.png`),
      animations: 'allow',
    });

    // Scroll down 700px
    await page.evaluate(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo(700, { immediate: true });
      } else {
        window.scrollTo(0, 700);
      }
    });
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(FINAL_DIR, `${r.name}-390-scrolled.png`),
      animations: 'allow',
    });

    console.log(`  Saved: ${r.name}-390-hero.png and ${r.name}-390-scrolled.png`);
    await page.close();
  }
  await mobileCtx.close();

  await browser.close();
  console.log('\n✅ All final screenshots captured successfully into docs/v6/final/!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
