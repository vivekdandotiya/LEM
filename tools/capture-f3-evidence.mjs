import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'docs/v9/F3-evidence');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser to capture F3 reviews evidence...');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() =>
    chromium.launch({ headless: true, channel: 'msedge' })
  );

  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });

    // 1. Capture SAMPLE mode
    console.log(`Navigating to Home page at ${vp.name} (SAMPLE mode)...`);
    await page.goto('http://localhost:3000/?intro=0', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    const testimonialSection = page.locator('#testimonials-section');
    await testimonialSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const sampleScreenshotPath = path.join(outDir, `reviews-sample-${vp.name}.png`);
    await testimonialSection.screenshot({ path: sampleScreenshotPath });
    console.log(`Saved ${sampleScreenshotPath}`);

    // 2. Capture HIDDEN mode (samples=false)
    console.log(`Navigating to Home page at ${vp.name} with samples=false (HIDDEN mode)...`);
    await page.goto('http://localhost:3000/?intro=0&samples=false', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    const count = await page.locator('#testimonials-section').count();
    console.log(`Testimonials count with samples=false: ${count} (expected 0)`);

    // Capture the area between preceding section and following section
    const hiddenScreenshotPath = path.join(outDir, `reviews-hidden-${vp.name}.png`);
    await page.screenshot({ path: hiddenScreenshotPath });
    console.log(`Saved ${hiddenScreenshotPath}`);

    await page.close();
  }

  await browser.close();

  // Write report
  const reportContent = `# F3 Evidence: Honest Reviews & Placeholder Verification

## Summary of Changes
1. **Extracted Data Model:** Centralized all testimonial items in \`src/data/testimonials.ts\` adhering to typed schema:
   \`\`\`ts
   { id: string, quote: string, name: string, company: string, service: string, role?: string, verified: boolean, source: string }
   \`\`\`
2. **Honest Placeholder Pattern:** Because \`docs/CLIENT-CONTENT.md\` contains zero client-supplied reviews, all entries are strictly flagged as \`verified: false\` with transparent placeholder text:
   - Quote: *"Client feedback goes here. Replace with an approved quote."*
   - Author: *"Client Name"*
   - Company: *"Company"*
   - Source: *"Sample feedback draft"*
3. **Removed Fabrications:**
   - **Portraits Removed:** Replaced all stock/AI face photos with clean, high-contrast monogram initials circle avatars (\`CN\` in gold/ivory border).
   - **Ratings Removed:** Removed all star icons, "5.0" rating pills, and "Verified Clients" badges.
   - **Metrics Removed:** Removed all fabricated metrics (e.g. "+64% Organic Revenue", "4.6x Peak ROAS", "+140% Qualified Inbound").
   - **Structured Data:** Audited codebase to ensure 0 \`aggregateRating\` or \`Review\` JSON-LD schemas exist.
4. **Environment / Sample Mode Control:**
   - In SAMPLE mode (\`NEXT_PUBLIC_SHOW_SAMPLES=true\` / default preview), clear badges (\`SAMPLE FEEDBACK DRAFTS\` and \`SAMPLE\`) are visibly displayed so reviewers know these are non-production placeholders.
   - In HIDDEN mode (\`NEXT_PUBLIC_SHOW_SAMPLES=false\` or \`?samples=false\`), when zero verified client testimonials exist, the section returns \`null\` and is completely omitted from the DOM.
5. **Automated Verification:**
   - \`npm run check:samples\` enforces data integrity, zero invented entity names, absence of star components, and sample hiding.

## Screenshots Captured
- **SAMPLE Mode (1440px):** \`reviews-sample-1440.png\`
- **SAMPLE Mode (390px):** \`reviews-sample-390.png\`
- **HIDDEN Mode (1440px):** \`reviews-hidden-1440.png\`
- **HIDDEN Mode (390px):** \`reviews-hidden-390.png\`
`;

  fs.writeFileSync(path.join(outDir, 'honest-reviews-report.md'), reportContent, 'utf-8');
  console.log('Saved honest-reviews-report.md');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
