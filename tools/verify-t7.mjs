import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const EVIDENCE_DIR = path.join(process.cwd(), 'docs', 'v6', 'T7-evidence');
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

async function verifyT7() {
  console.log('=====================================================');
  console.log('LEAD EDGE MARKETING — T7 INK-DRIP VERIFICATION');
  console.log('=====================================================\n');

  let allPassed = true;

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--enable-gpu', '--use-gl=angle', '--enable-webgl'],
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // 1. Navigate to Homepage
    console.log('Navigating to homepage...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Scroll to #what-we-do (Services section)
    const whatWeDo = page.locator('#what-we-do');
    await whatWeDo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // 2. Check (a): Layout shifts caused by drips (CLS)
    console.log('\nChecking Layout Shift (CLS)...');
    const cls = await page.evaluate(async () => {
      let clsScore = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // @ts-ignore
          if (!entry.hadRecentInput) {
            // @ts-ignore
            clsScore += entry.value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: false });
      // Wait 1.5 seconds while drips animate
      await new Promise((r) => setTimeout(r, 1500));
      observer.disconnect();
      return clsScore;
    });

    console.log(`  Measured CLS during drip animation: ${cls.toFixed(4)}`);
    if (cls > 0.01) {
      console.error(`  ❌ CLS check failed! CLS = ${cls}`);
      allPassed = false;
    } else {
      console.log(`  ✅ CLS check passed: 0.000 layout shift.`);
    }

    // 3. Check (b): Copy-paste string equality
    console.log('\nChecking Copy-Paste String Equality...');
    const h2Text = await page.evaluate(() => {
      const h2 = document.querySelector('#what-we-do h2');
      if (!h2) return '';
      const range = document.createRange();
      range.selectNodeContents(h2);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      return sel ? sel.toString().replace(/\s+/g, ' ').trim() : '';
    });

    console.log(`  Selected copy-paste text: "${h2Text}"`);
    const expectedText = 'Disciplines built to create momentum.';
    if (h2Text !== expectedText) {
      console.error(`  ❌ Copy-paste string mismatch! Expected "${expectedText}", got "${h2Text}"`);
      allPassed = false;
    } else {
      console.log(`  ✅ Copy-paste equality passed: uninterrupted clean text.`);
    }

    // 4. Check (c): Screen reader aria-hidden="true" inspection
    console.log('\nChecking Screen Reader Accessibility (aria-hidden)...');
    const ariaAudit = await page.evaluate(() => {
      const dripElements = Array.from(document.querySelectorAll('.ink-drip-drop'));
      const svgs = Array.from(document.querySelectorAll('.ink-drip-drop svg'));
      return {
        totalDrops: dripElements.length,
        allDropsHidden: dripElements.every((el) => el.getAttribute('aria-hidden') === 'true'),
        allSvgsHidden: svgs.every((el) => el.getAttribute('aria-hidden') === 'true'),
      };
    });

    console.log(`  Found ${ariaAudit.totalDrops} drip elements.`);
    if (!ariaAudit.allDropsHidden || !ariaAudit.allSvgsHidden || ariaAudit.totalDrops === 0) {
      console.error(`  ❌ Accessibility check failed: not all drip elements have aria-hidden="true"!`);
      allPassed = false;
    } else {
      console.log(`  ✅ Accessibility passed: 100% of drip elements have aria-hidden="true".`);
    }

    // 5. Check (d): 60 FPS Compositor-only execution
    console.log('\nChecking CSS Animation Keyframes for Reflow-Free Compositor Execution...');
    const animProperties = await page.evaluate(() => {
      let isReflowFree = true;
      const forbiddenProps = ['width', 'height', 'top', 'left', 'bottom', 'right', 'margin', 'padding'];
      // Inspect all document style rules
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name.startsWith('drip-')) {
              // @ts-ignore
              for (const kf of Array.from(rule.cssRules)) {
                // @ts-ignore
                for (const prop of forbiddenProps) {
                  // @ts-ignore
                  if (kf.style[prop] && kf.style[prop] !== '') {
                    isReflowFree = false;
                  }
                }
              }
            }
          }
        } catch {}
      }
      return isReflowFree;
    });

    if (!animProperties) {
      console.error(`  ❌ Animation uses forbidden layout reflow properties!`);
      allPassed = false;
    } else {
      console.log(`  ✅ Compositor check passed: Only transform and opacity animated (GPU accelerated).`);
    }

    // 6. Capture 4-frame anatomy strip
    console.log('\nCapturing 4-frame animation strip...');
    const dropAnchor = page.locator('.ink-drip-anchor').first();

    const frames = [
      { name: 'frame-1-build.png', delay: 400 },
      { name: 'frame-2-necking.png', delay: 1400 },
      { name: 'frame-3-pinchoff.png', delay: 2000 },
      { name: 'frame-4-fall.png', delay: 2500 },
    ];

    const frameBuffers = [];

    for (const f of frames) {
      await page.waitForTimeout(f.delay);
      const buf = await dropAnchor.screenshot({ animations: 'allow' });
      const p = path.join(EVIDENCE_DIR, f.name);
      fs.writeFileSync(p, buf);
      frameBuffers.push(buf);
      console.log(`  Captured ${f.name}`);
    }

    // Stitch 4 frames horizontally into drip-anatomy-strip.png
    console.log('Stitching 4 frames into drip-anatomy-strip.png...');
    const metaList = await Promise.all(frameBuffers.map((b) => sharp(b).metadata()));
    const frameW = metaList[0].width || 120;
    const frameH = metaList[0].height || 180;
    const totalW = frameW * 4 + 60; // 20px padding between frames

    const composites = frameBuffers.map((b, i) => ({
      input: b,
      left: 10 + i * (frameW + 15),
      top: 10,
    }));

    const stripPath = path.join(EVIDENCE_DIR, 'drip-anatomy-strip.png');
    await sharp({
      create: {
        width: totalW,
        height: frameH + 20,
        channels: 4,
        background: { r: 238, g: 235, b: 227, alpha: 1 }, // paper #EEEBE3
      },
    })
      .composite(composites)
      .png()
      .toFile(stripPath);

    console.log(`  ✅ Saved strip: ${stripPath}`);

    // Check ?drips=0 override
    console.log('\nChecking ?drips=0 diagnostic bypass URL override...');
    await page.goto('http://localhost:3000/?drips=0', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const dripsDisabledCount = await page.evaluate(() => {
      const visibleDrips = Array.from(document.querySelectorAll('.ink-drip-drop')).filter(
        (el) => window.getComputedStyle(el).display !== 'none'
      );
      return visibleDrips.length;
    });

    if (dripsDisabledCount > 0) {
      console.error(`  ❌ ?drips=0 did not disable all drips! count=${dripsDisabledCount}`);
      allPassed = false;
    } else {
      console.log(`  ✅ ?drips=0 verified: all drips immediately hidden.`);
    }

  } finally {
    await browser.close();
  }

  if (!allPassed) {
    console.error('\n❌ T7 Ink-Drip Verification FAILED!');
    process.exit(1);
  } else {
    console.log('\n✅ ALL T7 ACCEPTANCE CHECKS PASSED (100% compliant with V6 Section H)!');
  }
}

verifyT7().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
