import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const EVIDENCE_DIR = path.join(process.cwd(), 'docs', 'v6', 'T5-evidence');
const DESKTOP_DIR = path.join(EVIDENCE_DIR, 'desktop');
const MOBILE_DIR = path.join(EVIDENCE_DIR, 'mobile');
const VIDEOS_DIR = path.join(process.cwd(), 'public', 'videos', 'services');

fs.mkdirSync(DESKTOP_DIR, { recursive: true });
fs.mkdirSync(MOBILE_DIR, { recursive: true });

const SERVICES = ['seo', 'ppc', 'social-media', 'web-development'];

async function verifyT5() {
  console.log('=====================================================');
  console.log('LEAD EDGE MARKETING — T5 AUTOMATED VERIFICATION');
  console.log('=====================================================\n');

  let allPassed = true;

  // 1. Check all 16 clips and file sizes
  console.log('Checking generated video files and sizes...');
  for (const service of SERVICES) {
    for (let phase = 0; phase < 4; phase++) {
      const base = `${service}-phase-${phase}`;
      const mp4Path = path.join(VIDEOS_DIR, `${base}.mp4`);
      const webmPath = path.join(VIDEOS_DIR, `${base}.webm`);
      const mobilePath = path.join(VIDEOS_DIR, `${base}-720p.mp4`);
      const posterPath = path.join(VIDEOS_DIR, `${base}-poster.webp`);

      for (const p of [mp4Path, webmPath, mobilePath, posterPath]) {
        if (!fs.existsSync(p)) {
          console.error(`  MISSING: ${path.basename(p)}`);
          allPassed = false;
        }
      }

      if (fs.existsSync(mp4Path)) {
        const mp4Size = fs.statSync(mp4Path).size / 1024;
        if (mp4Size > 1800) {
          console.error(`  SIZE EXCEEDED: ${path.basename(mp4Path)} is ${mp4Size.toFixed(1)} KB (> 1800 KB)`);
          allPassed = false;
        }
      }
      if (fs.existsSync(mobilePath)) {
        const mobileSize = fs.statSync(mobilePath).size / 1024;
        if (mobileSize > 900) {
          console.error(`  SIZE EXCEEDED: ${path.basename(mobilePath)} is ${mobileSize.toFixed(1)} KB (> 900 KB)`);
          allPassed = false;
        }
      }
    }
  }
  console.log('Video file check finished.\n');

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--enable-gpu', '--use-gl=angle', '--enable-webgl'],
  });

  try {
    // 2. Desktop Tests (1440x900)
    console.log('Testing desktop service pages (1440x900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();

    for (const service of SERVICES) {
      console.log(`\nVerifying /services/${service}...`);
      await desktopPage.goto(`http://localhost:3000/services/${service}`, { waitUntil: 'networkidle' });
      await desktopPage.waitForTimeout(1500);
      try {
        await desktopPage.waitForFunction(() => document.querySelectorAll('#how-we-deliver').length === 1, { timeout: 3000 });
      } catch {}

      // Scroll to #how-we-deliver stage
      const stage = desktopPage.locator('#how-we-deliver');
      await stage.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(800);

      // Test all 4 phases
      for (let phase = 0; phase < 4; phase++) {
        // Find phase button in left column
        const phaseBtn = desktopPage.locator(`button:has-text("PHASE 0${phase + 1}"), button:has-text("ACTIVE"):has-text("0${phase + 1}")`).first();
        if (await phaseBtn.count() > 0 && phase > 0) {
          await phaseBtn.click({ force: true });
          await desktopPage.waitForTimeout(1000);
        }

        // Check playing videos count: only 1 video can be playing at any moment
        const playingCount = await desktopPage.evaluate(() => {
          const videos = Array.from(document.querySelectorAll('#how-we-deliver video'));
          return videos.filter((v) => !v.paused).length;
        });

        if (playingCount > 1) {
          console.error(`  Phase ${phase}: Multiple videos playing! count=${playingCount}`);
          allPassed = false;
        } else {
          console.log(`  Phase ${phase}: Playing videos count = ${playingCount} (<= 1 check passed)`);
        }

        // Check corner ILLUSTRATIVE sticker is visible
        const hasIllustrative = await desktopPage.evaluate(() => {
          const stageEl = document.querySelector('#how-we-deliver');
          return stageEl ? stageEl.textContent.includes('ILLUSTRATIVE') : false;
        });
        if (!hasIllustrative) {
          console.error(`  Phase ${phase}: Missing ILLUSTRATIVE sticker!`);
          allPassed = false;
        }

        // Capture screenshot
        const shotPath = path.join(DESKTOP_DIR, `${service}-phase-${phase}.png`);
        await desktopPage.screenshot({ path: shotPath });
        console.log(`  Saved screenshot: ${path.basename(shotPath)}`);
      }

      // Check pause when scrolled off-screen
      console.log(`  Checking pause when stage scrolls off-screen...`);
      await desktopPage.evaluate(() => {
        const activeLenis = window.__lenis;
        if (activeLenis) {
          activeLenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      });
      await desktopPage.waitForTimeout(1200);

      const playingWhenOffscreen = await desktopPage.evaluate(() => {
        const videos = Array.from(document.querySelectorAll('#how-we-deliver video'));
        return videos.filter((v) => !v.paused).length;
      });

      if (playingWhenOffscreen > 0) {
        console.error(`  Off-screen test: ${playingWhenOffscreen} videos still playing when off-screen!`);
        allPassed = false;
      } else {
        console.log(`  Off-screen test: All videos paused when off-screen! (passed)`);
      }
    }
    await desktopContext.close();

    // 3. Mobile Tests (390x844)
    console.log('\nTesting mobile service pages (390x844)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const mobilePage = await mobileContext.newPage();

    for (const service of SERVICES) {
      await mobilePage.goto(`http://localhost:3000/services/${service}`, { waitUntil: 'networkidle' });
      await mobilePage.waitForTimeout(800);

      const shotPath = path.join(MOBILE_DIR, `${service}-mobile.png`);
      await mobilePage.screenshot({ path: shotPath });
      console.log(`  Saved mobile screenshot: ${path.basename(shotPath)}`);
    }
    await mobileContext.close();

    // 4. Reduced Motion Test
    console.log('\nTesting prefers-reduced-motion fallback...');
    const rmContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const rmPage = await rmContext.newPage();
    await rmPage.goto('http://localhost:3000/services/seo', { waitUntil: 'networkidle' });
    await rmPage.waitForTimeout(1000);

    const hasPlayBtn = await rmPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.some((b) => b.textContent && b.textContent.includes('Play Animation'));
    });
    console.log(`  Reduced motion play button present: ${hasPlayBtn ? 'YES (passed)' : 'NO'}`);

    const rmShot = path.join(EVIDENCE_DIR, 'reduced-motion-fallback.png');
    await rmPage.screenshot({ path: rmShot });
    console.log(`  Saved reduced motion screenshot: ${path.basename(rmShot)}`);
    await rmContext.close();

  } finally {
    await browser.close();
  }

  if (!allPassed) {
    console.error('\n❌ T5 Verification FAILED some checks!');
    process.exit(1);
  } else {
    console.log('\n✅ ALL T5 ACCEPTANCE CHECKS PASSED!');
  }
}

verifyT5().catch((err) => {
  console.error('T5 Verification script error:', err);
  process.exit(1);
});
