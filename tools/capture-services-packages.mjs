import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'docs', 'v8', 'evidence-service-packages');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SERVICES = [
  'social-media',
  'seo',
  'ppc',
  'web-development',
  'video-photo',
];

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

  for (const slug of SERVICES) {
    const page = await desktop.newPage();
    await page.goto(`http://localhost:3000/services/${slug}?intro=0`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const packagesSec = page.locator('#service-packages');
    await packagesSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, `package-1440-${slug}.png`) });
    await page.close();
  }

  // Mobile (390x844) for social-media
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto('http://localhost:3000/services/social-media?intro=0', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);
  const mobileSec = mobilePage.locator('#service-packages');
  await mobileSec.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'package-390-social-media.png') });
  await mobilePage.close();

  await browser.close();
  console.log('Service packages screenshots saved to', OUT_DIR);
}

verify().catch(console.error);
