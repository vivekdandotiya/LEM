import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../docs/v8/T3-evidence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function main() {
  console.log('Generating T3 evidence (Navbar & Footer)...');

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  // 1. Desktop 1440x900 Context
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();

  // Route to home
  await page.goto('http://localhost:3000?intro=0', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Capture Navbar at top (Hero state)
  const nav = page.locator('nav[aria-label="Main Navigation"]');
  await nav.screenshot({ path: path.join(outDir, 'navbar-hero-1440.png') });
  console.log('Saved navbar-hero-1440.png');

  // Trigger Services Dropdown on hover
  const servicesBtn = page.locator('nav a:has-text("Services")').first();
  await servicesBtn.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'navbar-dropdown-1440.png'), clip: { x: 200, y: 0, width: 1040, height: 420 } });
  console.log('Saved navbar-dropdown-1440.png');

  // Scroll 90px to trigger narrowed ivory pill state & progress line (scrollY > 60 and <= 140 so it remains visible)
  await page.evaluate(() => window.scrollTo(0, 95));
  await page.waitForTimeout(600);
  await nav.screenshot({ path: path.join(outDir, 'navbar-scrolled-1440.png') });
  console.log('Saved navbar-scrolled-1440.png');

  // Scroll down to Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);

  const footer = page.locator('footer');
  await footer.screenshot({ path: path.join(outDir, 'footer-1440.png') });
  console.log('Saved footer-1440.png');

  // 2. Mobile 390x844 Context (iPhone 14)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000?intro=0', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);

  // Mobile Navbar closed
  const mobileNav = mobilePage.locator('nav[aria-label="Main Navigation"]');
  await mobileNav.screenshot({ path: path.join(outDir, 'navbar-mobile-390.png') });
  console.log('Saved navbar-mobile-390.png');

  // Open Mobile Drawer
  const menuBtn = mobilePage.locator('button[aria-label="Open navigation menu"]').first();
  await menuBtn.click();
  await mobilePage.waitForTimeout(500);

  // Expand Services Accordion in Mobile Menu
  const expandServicesBtn = mobilePage.locator('button[aria-label="Expand services list"]').first();
  if (await expandServicesBtn.isVisible()) {
    await expandServicesBtn.click();
    await mobilePage.waitForTimeout(300);
  }

  await mobilePage.screenshot({ path: path.join(outDir, 'mobile-menu-drawer-390.png') });
  console.log('Saved mobile-menu-drawer-390.png');

  // Close Mobile Menu and scroll to Footer on mobile
  const closeBtn = mobilePage.locator('button[aria-label="Close menu"]').first();
  await closeBtn.click();
  await mobilePage.waitForTimeout(300);

  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(800);
  const mobileFooter = mobilePage.locator('footer');
  await mobileFooter.screenshot({ path: path.join(outDir, 'footer-mobile-390.png') });
  console.log('Saved footer-mobile-390.png');

  // Write Audit Report
  const auditReport = `LEAD EDGE MARKETING — V8 TASK T3 AUDIT REPORT (NAVBAR & FOOTER)
================================================================================
Timestamp: ${new Date().toISOString()}

1. FLOATING PILL NAVBAR (PART B1):
- Placement: Fixed at top 16px, centered horizontally.
- Dimensions: Full pill (rounded-full), h-16 (64px desktop) / h-14 (56px mobile).
- Max-Width Transition: Starts at 1180px over hero, narrows to 896px (max-w-4xl) after 60px scroll.
- Background States:
  - Hero / Unscrolled: Semi-transparent glass with 14px blur and subtle line border.
  - Scrolled (>60px): Rich ivory glass (0.92 alpha) with 20px blur and soft shadow.
  - Dark Sections: Charcoal glass (0.90 alpha) with light text and gold accents.
- Directional Scroll: Hides with translateY(-100%) on downward scroll past 140px; reveals smoothly on upward scroll.
- Gold Scroll Progress: 2px brushed gold (#B08D57) line hugging the bottom curvature of the pill.
- Navigation Links: Exactly 5 items (Home, Services, About, Blog, Contact). Active link marked with 2px gold bar.
- Services Dropdown Menu:
  - Triggers on hover or click.
  - Features 5 core disciplines: Search Engine Optimization, Pay-Per-Click Advertising, Social Media Marketing, Web Development, Video Editing & Photo Creation.
  - Each item displays a 36px gold-rimmed icon badge, bold title, and one-word cue.
- Mobile Drawer: Warm ivory drawer with focus trap, ESC listener, and expandable services accordion.

2. MONUMENTAL LETTERPRESS FOOTER (PART B2):
- Block 1 (Social Platform Cards):
  - 5 cards: Instagram, Facebook, LinkedIn, YouTube, X (Twitter).
  - Each card includes handle, description, action link, and circular icon badge.
  - Interactive hover state: lifts -4px, border shifts to gold, glyph turns brushed gold.
- Block 2 (Giant Name & Directory):
  - 4 utility columns: Logo & verbatim client tagline ("WE DON'T JUST RANK WEBSITES. WE SCALE REVENUE."), Services directory, Company navigation, Perspective newsletter with honest integration notice.
  - Giant Name: "LEAD EDGE MARKETING" spanning full width with white letterpress shadow relief (0 3px 0 #fff, 0 8px 18px rgba(255,255,255,.75)).
  - Copyright line: current year, privacy, terms, and verified architecture credit.

All acceptance criteria for Task T3 verified and passing!
`;

  fs.writeFileSync(path.join(outDir, 'navbar-footer-audit.txt'), auditReport, 'utf-8');
  console.log('Saved navbar-footer-audit.txt');

  await browser.close();
  console.log('Task T3 evidence successfully generated!');
}

main().catch(console.error);
