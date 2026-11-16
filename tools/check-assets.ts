import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

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
  '/contact',
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

interface AssetFailure {
  route: string;
  type: 'image-broken' | 'image-404' | 'missing-alt' | 'video-failed' | 'file-missing';
  src: string;
  detail: string;
}

export async function runAssetCheck() {
  console.log('=====================================================');
  console.log('LEAD EDGE MARKETING — V8 ASSET VERIFICATION SUITE');
  console.log('=====================================================');
  console.log(`Checking routes on: ${BASE_URL}\n`);

  const failures: AssetFailure[] = [];
  const checkedAssets = new Set<string>();

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`Checking route: ${route}...`);

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    // Track network 404s
    page.on('response', (res) => {
      const resUrl = res.url();
      if (res.status() === 404 && (resUrl.includes('/images/') || resUrl.includes('/videos/'))) {
        failures.push({
          route,
          type: 'image-404',
          src: resUrl,
          detail: `HTTP 404 response received for asset`,
        });
      }
    });

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      if (!response || response.status() >= 400) {
        failures.push({
          route,
          type: 'file-missing',
          src: url,
          detail: `Page returned HTTP ${response ? response.status() : 'no response'}`,
        });
        await context.close();
        continue;
      }

      // Scroll smoothly down the page to trigger renders
      await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
          let totalHeight = 0;
          const distance = 600;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 50);
        });
      });
      await page.waitForTimeout(500);

      // Trigger decode on all images to verify every asset renders without error
      const imgData = await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        await Promise.all(
          imgs.map(async (img) => {
            img.loading = 'eager';
            try {
              if (img.decode) await img.decode();
            } catch (e) {}
          })
        );

        return imgs.map((img) => ({
          src: img.currentSrc || img.src,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          alt: img.alt,
          srcset: img.srcset,
          loading: img.loading,
        }));
      });

      console.log(`  Found ${imgData.length} images on ${route}`);

      for (const img of imgData) {
        checkedAssets.add(img.src);

        // Check if image failed to load or has 0 width
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          failures.push({
            route,
            type: 'image-broken',
            src: img.src,
            detail: `Image naturalWidth is 0 (broken image icon)`,
          });
        }

        // Check for missing alt attribute
        if (typeof img.alt !== 'string' || img.alt.trim() === '') {
          // Decorative images with aria-hidden or role=presentation are okay, else flag
          failures.push({
            route,
            type: 'missing-alt',
            src: img.src,
            detail: `Missing or empty alt text`,
          });
        }
      }

      // Check all <video> elements
      const videoData = await page.evaluate(() => {
        const videos = Array.from(document.querySelectorAll('video'));
        return videos.map((v) => ({
          src: v.currentSrc || v.src || (v.querySelector('source') ? (v.querySelector('source') as HTMLSourceElement).src : ''),
          readyState: v.readyState,
          paused: v.paused,
          muted: v.muted,
        }));
      });

      console.log(`  Found ${videoData.length} videos on ${route}`);
      for (const vid of videoData) {
        if (vid.src) {
          checkedAssets.add(vid.src);
        }
      }

    } catch (err: any) {
      failures.push({
        route,
        type: 'file-missing',
        src: url,
        detail: `Navigation failed: ${err.message}`,
      });
    } finally {
      await context.close();
    }
  }

  await browser.close();

  console.log('\n=====================================================');
  console.log('AUDIT SUMMARY');
  console.log('=====================================================');
  console.log(`Total unique assets checked across routes: ${checkedAssets.size}`);
  console.log(`Total asset failures detected: ${failures.length}`);

  if (failures.length > 0) {
    console.error('\nFAILURES:');
    failures.forEach((f) => {
      console.error(`- [${f.route}] [${f.type}] ${f.src}: ${f.detail}`);
    });
    return { passed: false, failures, count: checkedAssets.size };
  } else {
    console.log('\n✅ ALL ASSETS PASSED: 0 broken images, 0 404s, all naturalWidth > 0!');
    return { passed: true, failures: [], count: checkedAssets.size };
  }
}

if (process.argv[1].endsWith('check-assets.ts')) {
  runAssetCheck().then((res) => {
    process.exit(res.passed ? 0 : 1);
  });
}
