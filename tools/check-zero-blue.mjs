import { chromium } from 'playwright';

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/seo',
  '/blog',
  '/contact'
];

function isBlueDominant(colorStr) {
  if (!colorStr || colorStr === 'transparent' || colorStr === 'inherit') return false;
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return false;
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);

  // If neutral grey/black/white, not blue
  if (Math.abs(r - b) < 15 && Math.abs(g - b) < 15) return false;

  // Blue dominant if b is significantly higher than r and g
  if (b > r + 30 && b > g + 25 && b > 80) {
    return true;
  }
  return false;
}

async function run() {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--enable-gpu', '--use-gl=angle', '--enable-webgl'],
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  let violations = [];

  for (const route of ROUTES) {
    console.log(`Checking route ${route}...`);
    await page.goto(`http://localhost:3000${route}?intro=0`, { waitUntil: 'networkidle' });
    
    const elements = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      const results = [];
      for (const el of all) {
        // Skip images, svgs, videos
        if (['IMG', 'VIDEO', 'CANVAS', 'PICTURE', 'SOURCE', 'SCRIPT', 'STYLE'].includes(el.tagName)) continue;
        const style = window.getComputedStyle(el);
        results.push({
          tag: el.tagName,
          className: el.className?.toString?.() || '',
          color: style.color,
          bg: style.backgroundColor,
          borderTop: style.borderTopColor,
          borderBottom: style.borderBottomColor,
        });
      }
      return results;
    });

    for (const el of elements) {
      if (isBlueDominant(el.color)) {
        violations.push({ route, type: 'color', val: el.color, tag: el.tag, class: el.className });
      }
      if (isBlueDominant(el.bg)) {
        violations.push({ route, type: 'bg', val: el.bg, tag: el.tag, class: el.className });
      }
      if (isBlueDominant(el.borderTop)) {
        violations.push({ route, type: 'borderTop', val: el.borderTop, tag: el.tag, class: el.className });
      }
    }
  }

  await browser.close();

  if (violations.length > 0) {
    console.error(`❌ Found ${violations.length} blue color violations:`);
    console.error(JSON.stringify(violations.slice(0, 10), null, 2));
    process.exit(1);
  } else {
    console.log('✅ ZERO BLUE CHECK PASSED: No blue-dominant UI colors found across all checked routes!');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
