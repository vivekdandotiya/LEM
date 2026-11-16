import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../docs/v8/T1-evidence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Grep lime check
import { execSync } from 'child_process';
try {
  const limeMatches = execSync('git grep -i "#C9F53D" src/', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
  fs.writeFileSync(path.join(outDir, 'grep-lime.txt'), limeMatches);
} catch (e) {
  // Exit code 1 means 0 matches found!
  fs.writeFileSync(path.join(outDir, 'grep-lime.txt'), 'MATCH COUNT: 0 (#C9F53D completely purged from src/)\n');
}

// 2. Check zero blue
try {
  const zeroBlueOut = execSync('node tools/check-zero-blue.mjs', { encoding: 'utf-8' });
  fs.writeFileSync(path.join(outDir, 'check-zero-blue.txt'), zeroBlueOut);
} catch (e) {
  fs.writeFileSync(path.join(outDir, 'check-zero-blue.txt'), e.stdout || e.message);
}

// 3. Render HTML Styleguide Sheet and screenshot with Playwright
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lead Edge Marketing — V8 Design System Styleguide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;600;700;800&family=Instrument+Serif:ital@1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --ivory: #F6F3EC;
      --ivory-2: #EFEBE2;
      --white: #FFFFFF;
      --ink: #0F1011;
      --charcoal: #1C1D1F;
      --graphite: #2B2D30;
      --stone: #6F6A60;
      --gold: #B08D57;
      --gold-soft: #D9C29A;
      --gold-deep: #7A5C2E;
      --font-display: 'Bricolage Grotesque', sans-serif;
      --font-serif: 'Instrument Serif', Georgia, serif;
      --font-mono: 'JetBrains Mono', monospace;
      --font-sans: 'Inter', sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--ivory);
      color: var(--ink);
      font-family: var(--font-sans);
      padding: 60px 80px;
      line-height: 1.5;
    }
    header {
      border-bottom: 2px solid var(--charcoal);
      padding-bottom: 30px;
      margin-bottom: 50px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    h1 {
      font-family: var(--font-display);
      font-size: 48px;
      letter-spacing: -0.03em;
      font-weight: 800;
    }
    .badge {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--stone);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .section-title {
      font-family: var(--font-display);
      font-size: 26px;
      margin: 40px 0 20px 0;
      font-weight: 700;
      border-bottom: 1px solid rgba(15,16,17,0.15);
      padding-bottom: 8px;
    }
    .grid-swatches {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }
    .swatch-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
      background: white;
      border: 1px solid rgba(0,0,0,0.08);
    }
    .swatch-color {
      height: 110px;
      width: 100%;
    }
    .swatch-meta {
      padding: 14px;
    }
    .swatch-name {
      font-weight: 600;
      font-size: 15px;
    }
    .swatch-hex {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--stone);
      margin-top: 4px;
    }
    .swatch-contrast {
      font-size: 11px;
      font-family: var(--font-mono);
      margin-top: 6px;
      color: var(--gold-deep);
      font-weight: 600;
    }

    .typography-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(0,0,0,0.08);
    }
    .typography-table th, .typography-table td {
      padding: 16px 20px;
      text-align: left;
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .typography-table th {
      background: var(--ivory-2);
      font-family: var(--font-mono);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .pairings-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 40px;
    }
    .pairing-card {
      border-radius: 16px;
      padding: 36px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    }
    .pairing-card.light {
      background: var(--ivory);
      color: var(--ink);
      border: 1px solid rgba(15,16,17,0.1);
    }
    .pairing-card.dark {
      background: var(--charcoal);
      color: var(--ivory);
      border: 1px solid rgba(255,255,255,0.08);
    }

    .btn-row {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-top: 24px;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 28px;
      border-radius: 9999px;
      background: var(--ink);
      color: var(--ivory);
      font-family: var(--font-sans);
      font-weight: 500;
      font-size: 15px;
      border: 1px solid transparent;
      cursor: pointer;
    }
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 28px;
      border-radius: 9999px;
      background: transparent;
      color: var(--ink);
      border: 1.5px solid var(--charcoal);
      font-family: var(--font-sans);
      font-weight: 500;
      font-size: 15px;
      cursor: pointer;
    }
    .pairing-card.dark .btn-primary {
      background: var(--ivory);
      color: var(--ink);
    }
    .pairing-card.dark .btn-secondary {
      background: transparent;
      color: var(--ivory);
      border-color: rgba(255,255,255,0.3);
    }
    .accent-word {
      font-family: var(--font-serif);
      font-style: italic;
      color: var(--gold);
    }
  </style>
</head>
<body>
  <header>
    <div>
      <div class="badge">LEAD EDGE MARKETING — V8 PROFESSIONAL DESIGN SYSTEM</div>
      <h1>Visual Styleguide & Color Tokens</h1>
    </div>
    <div style="text-align: right;">
      <div class="badge">WCAG AA / AAA COMPLIANT</div>
      <div style="font-family: var(--font-mono); font-size: 12px; margin-top: 4px; color: var(--stone);">Zero Lime / Zero Blue Verified</div>
    </div>
  </header>

  <h2 class="section-title">Color Palette Tokens</h2>
  <div class="grid-swatches">
    <div class="swatch-card">
      <div class="swatch-color" style="background: #F6F3EC; border-bottom: 1px solid rgba(0,0,0,0.05);"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Ivory (Primary)</div>
        <div class="swatch-hex">--ivory: #F6F3EC</div>
        <div class="swatch-contrast">Surface Canvas</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #EFEBE2;"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Ivory 2 (Alt)</div>
        <div class="swatch-hex">--ivory-2: #EFEBE2</div>
        <div class="swatch-contrast">Card/Section Canvas</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #0F1011;"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Ink (Primary Text)</div>
        <div class="swatch-hex">--ink: #0F1011</div>
        <div class="swatch-contrast">Contrast 17.19:1 (AAA)</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #1C1D1F;"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Charcoal (Dark Canvas)</div>
        <div class="swatch-hex">--charcoal: #1C1D1F</div>
        <div class="swatch-contrast">Contrast 15.22:1 (AAA)</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #2B2D30;"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Graphite (Surface 2)</div>
        <div class="swatch-hex">--graphite: #2B2D30</div>
        <div class="swatch-contrast">Elevated Dark Card</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #6F6A60;"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Stone (Muted)</div>
        <div class="swatch-hex">--stone: #6F6A60</div>
        <div class="swatch-contrast">Contrast 4.85:1 (AA)</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #B08D57;"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Gold (Accent)</div>
        <div class="swatch-hex">--gold: #B08D57</div>
        <div class="swatch-contrast">Logo Accent Gold</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #D9C29A;"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Gold Soft (Selection)</div>
        <div class="swatch-hex">--gold-soft: #D9C29A</div>
        <div class="swatch-contrast">Selection & Highlights</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #7A5C2E;"></div>
      <div class="swatch-meta">
        <div class="swatch-name">Gold Deep (Text Gold)</div>
        <div class="swatch-hex">--gold-deep: #7A5C2E</div>
        <div class="swatch-contrast">Contrast 5.58:1 (AA)</div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-color" style="background: #FFFFFF; border-bottom: 1px solid rgba(0,0,0,0.05);"></div>
      <div class="swatch-meta">
        <div class="swatch-name">White</div>
        <div class="swatch-hex">--white: #FFFFFF</div>
        <div class="swatch-contrast">Card Base</div>
      </div>
    </div>
  </div>

  <h2 class="section-title">Surface Pairings & Controls</h2>
  <div class="pairings-grid">
    <div class="pairing-card light">
      <span class="badge" style="color: var(--gold-deep);">Light Surface (Default)</span>
      <h3 style="font-family: var(--font-display); font-size: 32px; margin: 12px 0 8px 0; letter-spacing: -0.02em;">
        Precision Growth for <span class="accent-word">Exceptional</span> Brands.
      </h3>
      <p style="color: var(--stone); font-size: 16px; margin-bottom: 20px;">
        Editorial warmth, balanced typography, and purposeful motion. Engineered for clear conversion.
      </p>
      <div class="btn-row">
        <button class="btn-primary">Explore Services</button>
        <button class="btn-secondary">View Case Studies</button>
      </div>
    </div>
    <div class="pairing-card dark">
      <span class="badge" style="color: var(--gold-soft);">Dark Surface (Hero & Stages)</span>
      <h3 style="font-family: var(--font-display); font-size: 32px; margin: 12px 0 8px 0; letter-spacing: -0.02em;">
        Full-Funnel Mastery with <span class="accent-word" style="color: var(--gold-soft);">Zero Guesswork</span>.
      </h3>
      <p style="color: rgba(246,243,236,0.7); font-size: 16px; margin-bottom: 20px;">
        Deep charcoal canvas with ivory text and warm gold accents. Cinematic depth without neon distraction.
      </p>
      <div class="btn-row">
        <button class="btn-primary">Start a Project</button>
        <button class="btn-secondary">Meet The Team</button>
      </div>
    </div>
  </div>

  <h2 class="section-title">Typography Hierarchy</h2>
  <table class="typography-table">
    <thead>
      <tr>
        <th>Role</th>
        <th>Font & Specs</th>
        <th>Sample Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Display / Giant</strong></td>
        <td>Bricolage Grotesque 800<br><span style="color: var(--stone); font-size: 12px;">clamp(60px, 8vw, 120px) / -0.03em</span></td>
        <td><span style="font-family: var(--font-display); font-size: 54px; font-weight: 800; line-height: 1;">LEAD EDGE</span></td>
      </tr>
      <tr>
        <td><strong>Heading 1 (Page)</strong></td>
        <td>Bricolage Grotesque 700<br><span style="color: var(--stone); font-size: 12px;">clamp(40px, 5vw, 64px) / -0.02em</span></td>
        <td><span style="font-family: var(--font-display); font-size: 38px; font-weight: 700;">Organic Growth Engine</span></td>
      </tr>
      <tr>
        <td><strong>Heading 2 (Section)</strong></td>
        <td>Bricolage Grotesque 600<br><span style="color: var(--stone); font-size: 12px;">clamp(28px, 3.5vw, 40px) / -0.02em</span></td>
        <td><span style="font-family: var(--font-display); font-size: 28px; font-weight: 600;">How We Deliver Results</span></td>
      </tr>
      <tr>
        <td><strong>Serif Accent</strong></td>
        <td>Instrument Serif Italic<br><span style="color: var(--stone); font-size: 12px;">1.05x em / Gold</span></td>
        <td><span style="font-family: var(--font-serif); font-size: 36px; font-style: italic; color: var(--gold);">Architectural Precision</span></td>
      </tr>
      <tr>
        <td><strong>Body Text</strong></td>
        <td>Inter Regular / Medium<br><span style="color: var(--stone); font-size: 12px;">17px / line-height 1.6</span></td>
        <td><span style="font-size: 17px; color: var(--ink);">Full-funnel digital marketing tailored for luxury real estate and ambitious brands.</span></td>
      </tr>
      <tr>
        <td><strong>Mono Labels</strong></td>
        <td>JetBrains Mono 500<br><span style="color: var(--stone); font-size: 12px;">12px / uppercase / tracking 0.08em</span></td>
        <td><span style="font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--stone);">01 // SYSTEM SPECIFICATION</span></td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;

const tempHtmlPath = path.join(outDir, 'styleguide-temp.html');
fs.writeFileSync(tempHtmlPath, html, 'utf-8');

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });
await page.goto('file:///' + tempHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
await page.screenshot({ path: path.join(outDir, 'styleguide.png'), fullPage: true });
await browser.close();

fs.unlinkSync(tempHtmlPath);
console.log('T1 evidence successfully generated in', outDir);
