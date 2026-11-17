import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('docs/v8/evidence-new-features');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() =>
    chromium.launch({ headless: true, channel: 'msedge' })
  );
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('1. Capturing starting animation...');
  // Force intro replay with ?intro=1
  await page.goto('http://localhost:3000/?intro=1');
  
  // Capture mid-animation: arrow ascending towards/touching building
  await page.waitForTimeout(1100);
  await page.screenshot({ path: path.join(outDir, '01-intro-arrow-climbing.png') });
  console.log('Saved 01-intro-arrow-climbing.png');

  // Wait for intro to complete and website to open
  await page.waitForTimeout(2500);

  // 2. Capture Hero and the new dedicated Global Clocks Section below it
  console.log('2. Capturing dedicated Global Clocks Section after Hero...');
  const clocksSec = page.locator('#global-clocks');
  await clocksSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '02-global-clocks-section.png') });
  console.log('Saved 02-global-clocks-section.png');

  // 3. Capture website bottom / footer matching reference
  console.log('3. Capturing website bottom / Footer...');
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '03-website-bottom-footer.png') });
  console.log('Saved 03-website-bottom-footer.png');

  // 4. Mobile responsiveness of Footer (390x844)
  console.log('4. Capturing mobile footer...');
  await page.setViewportSize({ width: 390, height: 844 });
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '04-mobile-footer.png') });
  console.log('Saved 04-mobile-footer.png');

  // 5. Mobile Global Clocks Section
  console.log('5. Capturing mobile clocks...');
  await clocksSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '05-mobile-clocks.png') });
  console.log('Saved 05-mobile-clocks.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
