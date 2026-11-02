import { test, expect } from '@playwright/test';

test.describe('Part A — Delegated Custom Cursor Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate with skip_loader to bypass candle intro
    await page.goto('/services/seo?skip_loader=1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
  });

  test('1. Hovering an image triggers state="view" and label="VIEW"', async ({ page }) => {
    const cursor = page.locator('.cursor');
    const label = page.locator('.cursor__label');

    // Target the hero figure with data-cursor="view"
    const figure = page.locator('figure[data-cursor="view"]').first();
    await figure.scrollIntoViewIfNeeded();
    const box = await figure.boundingBox();
    expect(box).not.toBeNull();

    // Hover into center of image
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForTimeout(100);

    await expect(cursor).toHaveAttribute('data-state', 'view');
    await expect(label).toHaveText('VIEW');
  });

  test('2. Moving pointer off image to empty space resets state to "default" within 100ms', async ({ page }) => {
    const cursor = page.locator('.cursor');
    const figure = page.locator('figure[data-cursor="view"]').first();
    await figure.scrollIntoViewIfNeeded();
    const box = await figure.boundingBox();
    expect(box).not.toBeNull();

    // Hover into image
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForTimeout(100);
    await expect(cursor).toHaveAttribute('data-state', 'view');

    // Move mouse off image into blank page area
    await page.mouse.move(20, 200);
    await page.waitForTimeout(100);

    await expect(cursor).toHaveAttribute('data-state', 'default');
  });

  test('3. Hover image, then scroll down without moving mouse resets state when image leaves pointer', async ({ page }) => {
    const cursor = page.locator('.cursor');
    const figure = page.locator('figure[data-cursor="view"]').first();
    await figure.scrollIntoViewIfNeeded();
    const box = await figure.boundingBox();
    expect(box).not.toBeNull();

    // Move mouse over figure
    const mouseX = box!.x + box!.width / 2;
    const mouseY = box!.y + box!.height / 2;
    await page.mouse.move(mouseX, mouseY);
    await page.waitForTimeout(100);
    await expect(cursor).toHaveAttribute('data-state', 'view');

    // Scroll by 600px without moving pointer
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(250);

    // After scrolling, if image is no longer under pointer, state must self-correct to default
    const stateAfterScroll = await cursor.getAttribute('data-state');
    expect(stateAfterScroll).not.toBe('view');
  });

  test('4. Hovering link activates state="link" and empty label', async ({ page }) => {
    const cursor = page.locator('.cursor');
    const label = page.locator('.cursor__label');

    const link = page.locator('a[href="/contact"]').first();
    await link.scrollIntoViewIfNeeded();
    const box = await link.boundingBox();
    expect(box).not.toBeNull();

    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForTimeout(100);

    await expect(cursor).toHaveAttribute('data-state', 'link');
    await expect(label).toHaveText('');
  });

  test('5. Window blur or tab hidden resets cursor to "default"', async ({ page }) => {
    const cursor = page.locator('.cursor');
    const figure = page.locator('figure[data-cursor="view"]').first();
    await figure.scrollIntoViewIfNeeded();
    const box = await figure.boundingBox();
    expect(box).not.toBeNull();

    // Hover image
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForTimeout(100);
    await expect(cursor).toHaveAttribute('data-state', 'view');

    // Trigger blur event
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    await page.waitForTimeout(50);

    await expect(cursor).toHaveAttribute('data-state', 'default');
  });

  test('6. Route change resets cursor immediately', async ({ page }) => {
    const cursor = page.locator('.cursor');
    const figure = page.locator('figure[data-cursor="view"]').first();
    await figure.scrollIntoViewIfNeeded();
    const box = await figure.boundingBox();
    expect(box).not.toBeNull();

    // Hover image
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForTimeout(100);
    await expect(cursor).toHaveAttribute('data-state', 'view');

    // Dispatch route:start
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('route:start')));
    await page.waitForTimeout(50);

    await expect(cursor).toHaveAttribute('data-state', 'default');
  });

  test('7. Mobile/touch emulation hides the cursor element', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    const mobilePage = await context.newPage();
    await mobilePage.goto('http://localhost:3000/services/seo?skip_loader=1', { waitUntil: 'domcontentloaded' });

    const cursor = mobilePage.locator('.cursor');
    // On mobile touch devices, .cursor has display: none via media query
    const isVisible = await cursor.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none';
    });

    expect(isVisible).toBe(false);
    await context.close();
  });

  test('8. Cursor has pointer-events: none so clicks pass directly through to links', async ({ page }) => {
    const cursor = page.locator('.cursor');
    const pointerEvents = await cursor.evaluate((el) => window.getComputedStyle(el).pointerEvents);
    expect(pointerEvents).toBe('none');

    const link = page.locator('a[href="/contact"]').first();
    await link.scrollIntoViewIfNeeded();

    // Place mouse directly over link
    const box = await link.boundingBox();
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);

    // Clicking should navigate to /contact without being blocked by cursor
    await link.click();
    await page.waitForURL('**/contact');
    expect(page.url()).toContain('/contact');
  });
});
