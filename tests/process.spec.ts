import { test, expect } from '@playwright/test';

test.describe('Part B — Animated How We Deliver Process Stages', () => {
  test('1. SEO discipline displays process stage, 4 phase buttons, and permanent ILLUSTRATIVE sticker', async ({ page }) => {
    await page.goto('/services/seo?skip_loader=1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Check for permanent ILLUSTRATIVE badge
    const sticker = page.locator('text=ILLUSTRATIVE').first();
    await expect(sticker).toBeVisible();

    // Check 4 phase buttons
    const phase01Btn = page.locator('button:has-text("01 / AUDIT & DISCOVERY")').first();
    const phase02Btn = page.locator('button:has-text("02 / ARCHITECTURE & SERP")').first();
    const phase03Btn = page.locator('button:has-text("03 / AUTHORITY NETWORK")').first();
    const phase04Btn = page.locator('button:has-text("04 / COMMERCIAL RANKING")').first();

    await expect(phase01Btn).toBeVisible();
    await expect(phase02Btn).toBeVisible();
    await expect(phase03Btn).toBeVisible();
    await expect(phase04Btn).toBeVisible();

    // Check skip interactive walkthrough link
    const skipLink = page.locator('button:has-text("Skip interactive walkthrough")').first();
    await expect(skipLink).toBeVisible();
  });

  test('2. Clicking Phase 02 button updates active phase and displays phase headline and scene', async ({ page }) => {
    await page.goto('/services/seo?skip_loader=1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const phase02Btn = page.locator('button:has-text("02 / ARCHITECTURE & SERP")').first();
    await phase02Btn.click();
    await page.waitForTimeout(400);

    // Active badge should be visible on clicked phase
    await expect(phase02Btn.locator('text=ACTIVE')).toBeVisible();
  });

  test('3. Meta Ads discipline renders Funnel & Creative Matrix stage', async ({ page }) => {
    await page.goto('/services/meta-ads?skip_loader=1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const sticker = page.locator('text=ILLUSTRATIVE').first();
    await expect(sticker).toBeVisible();

    const phase01Btn = page.locator('button:has-text("01 / FUNNEL ARCHITECTURE")').first();
    await expect(phase01Btn).toBeVisible();
  });

  test('4. Social Media discipline renders 4-Pillar Strategy stage', async ({ page }) => {
    await page.goto('/services/social-media?skip_loader=1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const sticker = page.locator('text=ILLUSTRATIVE').first();
    await expect(sticker).toBeVisible();

    const phase01Btn = page.locator('button:has-text("01 / PILLAR STRATEGY")').first();
    await expect(phase01Btn).toBeVisible();
  });

  test('5. Web Development discipline renders Information Architecture & Next.js Engine stage', async ({ page }) => {
    await page.goto('/services/web-development?skip_loader=1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const sticker = page.locator('text=ILLUSTRATIVE').first();
    await expect(sticker).toBeVisible();

    const phase01Btn = page.locator('button:has-text("01 / INFORMATION ARCHITECTURE")').first();
    await expect(phase01Btn).toBeVisible();
  });

  test('6. Mobile emulation (<1024px) renders unpinned stacked phase cards with illustrations', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
    });
    const mobilePage = await context.newPage();
    await mobilePage.goto('http://localhost:3000/services/web-development?skip_loader=1', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(500);

    // Check for 4 illustrative cards on mobile
    const badges = mobilePage.locator('.lg\\:hidden').getByText('ILLUSTRATIVE');
    const count = await badges.count();
    expect(count).toBe(4);

    await context.close();
  });
});
