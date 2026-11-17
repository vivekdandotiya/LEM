import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'docs', 'v8', 'evidence-hero-clocks');
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
  await page.waitForTimeout(1500);

  // Capture full above-the-fold hero with the 3 clocks
  await page.screenshot({ path: path.join(OUT_DIR, 'hero-1440-with-clocks.png') });

  // Scroll down slightly so the clocks and bottom bar are focused
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, 'hero-1440-clocks-detail.png') });

  // Mobile (390x844)
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto('http://localhost:3000/?intro=0', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'hero-390-above-fold.png') });

  await mobilePage.evaluate(() => window.scrollBy(0, 400));
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'hero-390-clocks.png') });

  await browser.close();
  console.log('Hero global clocks screenshots saved to', OUT_DIR);
}

verify().catch(console.error);
