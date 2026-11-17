import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'docs', 'v8', 'evidence-home-refresh');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function verify() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
  });

  // Desktop (1440x900)
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const page = await desktop.newPage();
  await page.goto('http://localhost:3000/?intro=0', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Capture Hero at 1s
  await page.screenshot({ path: path.join(OUT_DIR, 'home-1440-hero-t0.png') });

  // Wait 2.5s and capture Hero again to verify moving animation
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT_DIR, 'home-1440-hero-t2.png') });

  // Scroll to services grid
  const servicesSec = page.locator('#services-grid');
  await servicesSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'home-1440-services-grid.png') });

  // Mobile (390x844)
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto('http://localhost:3000/?intro=0', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'home-390-hero.png') });

  const mobileServices = mobilePage.locator('#services-grid');
  await mobileServices.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'home-390-services-grid.png') });

  await browser.close();
  console.log('Verification screenshots saved to', OUT_DIR);
}

verify().catch(console.error);
