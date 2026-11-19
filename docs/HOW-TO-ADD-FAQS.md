# How to Add or Update FAQs for Lead Edge Marketing Services

This guide provides clear instructions on how to add, modify, or categorize FAQs across service pages.

## 1. Where FAQ Content Lives

FAQ data is stored per-service in typed TypeScript data files:
- **SEO:** `src/data/content/faqs-seo.ts`
- **PPC & Meta Ads:** `src/data/content/faqs-ppc.ts`
- **Social Media:** `src/data/content/faqs-social-media.ts`
- **Web Development:** `src/data/content/faqs-web-development.ts`
- **Video & Photo:** `src/data/content/faqs-video-photo.ts`

## 2. FAQ Item Format

Each FAQ entry adheres to the `ServiceFAQItem` interface:

```typescript
export interface ServiceFAQItem {
  id: string;          // Unique URL anchor slug (e.g. 'seo-audit-scope')
  question: string;    // The visible question heading
  answer: string;      // The detailed response copy
  category?: string;   // Optional category pill (e.g. 'Technical', 'Pricing', 'Deliverables')
}
```

### Example Entry:
```typescript
{
  id: 'seo-audit-timeline',
  question: 'How in-depth is the initial technical SEO audit?',
  answer: 'We analyze over 200 technical factors including indexation hierarchy, Core Web Vitals, canonical routing, and structured entity architecture.',
  category: 'Technical',
}
```

## 3. Scalable Features Handled Automatically

The FAQ system automatically handles:
- **Initial Limit & Show More:** The first 6 questions are shown by default. When more questions exist, an accessible "Show more questions" button smoothly reveals the rest with screen-reader count announcements.
- **Direct Anchor Links & Copy Affordance:** Each question has a direct URL anchor (`#faq-<id>`) with an inline copy-link button.
- **Optional Category Filter Pills:** If any item contains a `category` property, category filter pills are automatically rendered with URL synchronization (`?faq=<category>`). If no items have categories, pills are cleanly omitted.
- **Schema.org JSON-LD:** Generates valid `FAQPage` structured data matching only the visible, approved questions on that page.
- **Accessible Keyboard Navigation:** Full keyboard navigation support (Enter / Space to toggle, Up / Down Arrow to navigate, Home / End).

## 4. How to Test After Updating

1. Run the test suite:
   ```bash
   npm run check
   ```
2. Build the production package to verify type validity:
   ```bash
   npm run build
   ```
3. Preview locally:
   ```bash
   npm run start
   ```
   Navigate to `http://localhost:3000/services/seo` to verify your new questions appear correctly.
