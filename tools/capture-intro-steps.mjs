import { chromium } from '@playwright/test';
import path from 'node:path';

async function run() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() =>
    chromium.launch({ headless: true, channel: 'msedge' })
  );
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/?intro=1');
  
  // Capture at 600ms (buildings visible)
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.resolve('docs/v8/evidence-new-features/step-01-buildings.png') });

  // Capture at 1400ms (arrow climbing from left)
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.resolve('docs/v8/evidence-new-features/step-02-climbing.png') });

  // Capture at 2000ms (arrow touching building and tilting up)
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.resolve('docs/v8/evidence-new-features/step-03-tilt-up.png') });

  // Capture at 2500ms (arrow reaching top)
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.resolve('docs/v8/evidence-new-features/step-04-apex.png') });

  // Capture at 3200ms (website revealed)
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.resolve('docs/v8/evidence-new-features/step-05-revealed.png') });

  await browser.close();
  console.log('All steps captured!');
}

run().catch(console.error);
