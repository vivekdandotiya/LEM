import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

for (const route of ROUTES) {
  test(`Color contrast audit on ${route} (1440px)`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:3000${route}?skip_loader=1`, { waitUntil: 'networkidle' });
    
    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test(`Color contrast audit on ${route} (390px)`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:3000${route}?skip_loader=1`, { waitUntil: 'networkidle' });

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
