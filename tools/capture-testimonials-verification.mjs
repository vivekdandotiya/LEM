import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'docs', 'v8', 'evidence-testimonials');
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

  // Scroll to Testimonials
  const testSec = page.locator('#testimonials-section');
  await testSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'testimonials-1440-uk.png') });

  // Click next button to show another client (Nigeria or India)
  const nextBtn = page.locator('button[aria-label="Next review"]');
  await nextBtn.click();
  await page.waitForTimeout(500);
  await nextBtn.click();
  await page.waitForTimeout(500);
  await nextBtn.click(); // should be Nigeria
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'testimonials-1440-nigeria.png') });

  // Click next again to show India
  await nextBtn.click();
  await page.waitForTimeout(500);
  await nextBtn.click(); // should be India
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'testimonials-1440-india.png') });

  // Scroll to Brand Trust Bar
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'brand-trust-bar-1440.png') });

  // Mobile (390x844)
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto('http://localhost:3000/?intro=0', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileTest = mobilePage.locator('#testimonials-section');
  await mobileTest.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'testimonials-390.png') });

  await browser.close();
  console.log('Testimonials verification screenshots saved to', OUT_DIR);
}

verify().catch(console.error);
