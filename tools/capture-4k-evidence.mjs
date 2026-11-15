import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const EVIDENCE_DIR = path.join(process.cwd(), 'docs', 'v6', 'T6-evidence');
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function captureEvidence() {
  console.log('Capturing 200% zoom crop evidence of 4K card images...');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--enable-gpu', '--use-gl=angle', '--enable-webgl'],
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2, // 200% High-DPI Retina
    });

    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Scroll to #what-we-do
    const whatWeDo = page.locator('#what-we-do');
    await whatWeDo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // Target the SEO card image
    const seoImg = page.locator('#what-we-do img').first();
    const cropPath = path.join(EVIDENCE_DIR, 'seo-card-4k-crop.png');
    await seoImg.screenshot({ path: cropPath });
    console.log(`Saved 200% crop: ${cropPath}`);

    // Also capture full SEO page hero visual at 200% DPI
    await page.goto('http://localhost:3000/services/seo', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const heroFig = page.locator('figure[data-cursor="view"]').first();
    const heroCropPath = path.join(EVIDENCE_DIR, 'seo-hero-4k-crop.png');
    await heroFig.screenshot({ path: heroCropPath });
    console.log(`Saved hero crop: ${heroCropPath}`);

  } finally {
    await browser.close();
  }

  console.log('✅ Evidence capture completed successfully.');
}

captureEvidence().catch((err) => {
  console.error('Evidence capture error:', err);
  process.exit(1);
});
