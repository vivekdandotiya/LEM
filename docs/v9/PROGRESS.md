# V9 Client Feedback Round — Progress Log

This file tracks the execution of each task (F0 to F10) according to the strict protocol defined in the V9 prompt.

---

## Task Progress Summary

| Task | Status | Commit | Key Deliverables & Evidence |
|---|---|---|---|
| **F0: Setup and Reproduction** | **COMPLETED** | `F0: baseline and reproduction` | Branch `v9-client-feedback` created; 12 before screenshots captured at 1440 & 390 for local & preview; all routes verified 200 OK; baseline metrics in `/docs/v9/BASELINE.md`. |
| **F1: Text Visibility and Readability** | **COMPLETED** | `F1: text visibility and readability` | Fixed About hero contrast (dual gradient scrim + radial backing, >13:1 to 15:1 over video loop), reviews heading & card contrast, FAQ labels & sizing; surface tokens `[data-surface]`; site-wide >= 12px font size enforcement; Axe + sharp video luminance test passed with 0 violations (`docs/v9/F1-evidence/contrast-report.md`). |
| **F2: Plain-Language Pass** | **COMPLETED** | `F2: plain wording` | Changed button to "Our story ↓" with smooth-scroll; replaced 74 instances of generated/buzzword phrasing across 21 files; created `src/data/ui-strings.ts` and automated scanner `tools/check-wording.ts` (`npm run check:wording`); 0 client copy modifications. |
| **F3: Reviews Section: Honest Content** | **COMPLETED** | `F3: honest reviews` | Centralized typed data in `src/data/testimonials.ts`; unverified items use transparent placeholders; removed fabricated reviewer names, company names, portraits (monogram circle avatars used), star rating badge, percentage tags, and review structured data; sample vs hidden mode verified with Playwright screenshots at 1440 & 390; `npm run check:samples` passed. |
| **F4: Scalable FAQ System** | **COMPLETED** | `F4: scalable faq system` | Created per-service typed data in `src/data/content/faqs-<service>.ts` (4 approved SEO items kept verbatim); implemented scalable `ServiceFaqSection.tsx` with 6-item limit, smooth "Show more" button, direct anchor copy links, multi-open accordion, keyboard navigation (Arrow keys/Enter/Space), category pills with `?faq=` sync, and valid `FAQPage` JSON-LD; tested with 12-item fixture; added `docs/HOW-TO-ADD-FAQS.md` & `CIR-15` in `docs/CLIENT-INFO-REQUIRED.md`. |
| **F5: Video and Page Speed** | **COMPLETED** | `F5: video and speed optimization` | Re-encoded hero & showcase videos to strict budget (showcase-04 down to 774 KB from 1.09 MB; hero 1080p 1.04 MB <= 1.8 MB); poster-first LCP architecture with deferred idle attachment; network/data-saver consciousness (`saveData`, `2g/3g`, `prefers-reduced-motion`); `IntersectionObserver` & tab visibility pause controls; immutable caching & byte-range streaming headers in `next.config.mjs`; video transfer before load reduced from 1,646 KB to 0 KB on About page (`docs/v9/F5-evidence/speed-before-after.md`). |
| **F6: Sitemap and Robots** | Pending | - | Single route source; production allow / preview block-all; canonical match. |
| **F7: LLMs.txt** | Pending | - | Standard `llms.txt` and `llms-full.txt` from client copy only; route handler & verification check. |
| **F8: Social Media Content Readiness** | Pending | - | Isolate copy in typed data file with `awaitingClientContent: true`; how-to update guide. |
| **F9: Responsiveness Matrix** | Pending | - | 16 viewports across Chromium, WebKit, Firefox; zero overflow / overlap / clipping; contact sheets. |
| **F10: Final Regression & Report** | Pending | - | Full test pass; speed re-measurement; final report; STOP. |

---

## Detailed Task Entries

### F0: Setup and Reproduction
- **Branch:** `v9-client-feedback` created from commit matching deployed preview (`010b3fe`).
- **Reproduction:**
  - Captured before screenshots of About Hero at 1440 and 390 on local (`local-about-hero-1440.png`, `local-about-hero-390.png`) and preview (`preview-about-hero-1440.png`, `preview-about-hero-390.png`).
  - Captured before screenshots of Reviews section at 1440 and 390 on local (`local-reviews-1440.png`, `local-reviews-390.png`) and preview (`preview-reviews-1440.png`, `preview-reviews-390.png`).
  - Captured before screenshots of SEO FAQ section at 1440 and 390 on local (`local-seo-faq-1440.png`, `local-seo-faq-390.png`) and preview (`preview-seo-faq-1440.png`, `preview-seo-faq-390.png`).
- **Route Audit:** Checked all 16 public routes across local and preview; all returned `200 OK`.
- **Baseline Measurements:** Documented initial mobile metrics (load times, request count, transfer size, video bytes) and full video file inventory in `docs/v9/BASELINE.md`.

### F1: Text Visibility and Readability
- **About Hero:** Added dual gradient scrim (`linear-gradient(180deg, rgba(8,10,11,0.72) 0%, rgba(8,10,11,0.48) 40%, rgba(8,10,11,0.85) 100%)`) plus local radial contrast backing behind text in `src/components/shared/VideoHero.tsx`. Text upgraded to solid ivory `#F6F3EC` at 18px / 1.6 leading, uppercase tag pill set to `#D9C29A` with high contrast, and button set to solid ivory fill with ink text. Media luminance video loop test measured contrast of 13.58:1 to 15.69:1 (exceeding 4.5:1 / 3:1 threshold).
- **Reviews Section:** Eliminated theme conflict where `text-ink` was hardcoded on `bg-charcoal`. Dynamic surface evaluation enforces `text-[#F6F3EC]` and `text-[#D9C29A]` on dark surfaces and `text-[#0F1011]` and `text-[#5C4018]` on light surfaces.
- **FAQ Section:** Replaced small faint labels with bold 12px pill eyebrows (`text-xs`), and upgraded question accordion triggers to minimum 17px font size with high-contrast active states.
- **Surface Token System:** Implemented structural tokens `[data-surface="light"]`, `[data-surface="dark"]`, `[data-surface="media"]` in `src/styles/tokens.css` with auto-surface UI primitives `Heading.tsx` and `Eyebrow.tsx`.
- **Site-Wide Font Size Upgrade:** Upgraded all sub-12px elements across 48 files to strict minimum 12px (`text-xs`).
- **Automated Readability & Contrast Gate:** Created `tools/check-readability.mjs` running Playwright + Axe-core across all 14 routes at 1440px and 390px viewports, plus sharp frame-by-frame media luminance contrast sampling over video loops. Verified 0 Axe violations, 0 font-size violations, and 0 media contrast violations.
- **Evidence:** 6 after screenshots captured and saved to `docs/v9/F1-evidence/` (`after-about-hero-1440.png`, `after-about-hero-390.png`, `after-reviews-1440.png`, `after-reviews-390.png`, `after-seo-faq-1440.png`, `after-seo-faq-390.png`), alongside `docs/v9/F1-evidence/contrast-report.md`.

### F2: Plain-Language Pass
- **About Hero Button:** Updated button from "Explore Our Philosophy" to "Our story ↓" with smooth-scroll linking to `#our-description` (`src/app/about/page.tsx`).
- **UI Strings Centralization:** Created `src/data/ui-strings.ts` centralizing standardized button labels, section tags, search tags, and aria labels.
- **Buzzword Elimination:** Cleaned 74 occurrences of 26 forbidden buzzwords (such as *bespoke, elevate, leverage, synergy, seamless, dynamic, next-gen, rigorous, conviction, disciplines, holistic, world-class*) across 21 components and data files.
- **Client Copy Preservation:** Audited against `docs/CLIENT-CONTENT.md`; 0 client copy modifications were made. Verified in `docs/v9/F2-evidence/client-copy-flags.md`.
- **Automated Check:** Created `tools/check-wording.ts` (`npm run check:wording`) and `tools/check-copy.ts`. Both tests pass with 0 violations.
- **Evidence:** Complete audit diff saved in `docs/v9/F2-evidence/wording-changes.md`.

### F3: Reviews Section: Honest Content
- **Data Centralization:** Extracted all testimonial items into typed data file `src/data/testimonials.ts` implementing schema `{ id, quote, name, company, service, role, verified, source }`.
- **Honest Review Pattern:** With zero testimonials supplied in `docs/CLIENT-CONTENT.md`, all entries are strictly flagged as `verified: false` with explicit placeholder text ("Client feedback goes here. Replace with an approved quote." / "Client Name, Company").
- **Removed Fabrications:**
  - **Portraits Removed:** Replaced stock/AI portrait photos with clean monogram circle avatars displaying initials (e.g. `CN`) in gold/ivory borders.
  - **Ratings Removed:** Stripped all star rating icons, "5.0" rating pills, and "Verified Clients" badges.
  - **Metrics Removed:** Eliminated fabricated metric tags (e.g. "+64% Organic Revenue", "4.6x Peak ROAS").
  - **Structured Data Audit:** Confirmed zero `aggregateRating` or `Review` schema markup in JSON-LD.
- **Sample Mode vs Hidden Mode:**
  - In SAMPLE mode (`NEXT_PUBLIC_SHOW_SAMPLES=true` / preview default), clear `SAMPLE FEEDBACK DRAFTS` and `SAMPLE` badges are visibly displayed on each review card.
  - In HIDDEN mode (`NEXT_PUBLIC_SHOW_SAMPLES=false` or `?samples=false`), because zero verified client testimonials exist, the section returns `null` and is completely omitted from the DOM.
- **Automated Check & Evidence:**
  - Created `tools/check-samples.ts` (`npm run check:samples`) added to `npm run check`.
  - Captured screenshots in `docs/v9/F3-evidence/`: `reviews-sample-1440.png`, `reviews-sample-390.png`, `reviews-hidden-1440.png`, `reviews-hidden-390.png`.
  - Generated `docs/v9/F3-evidence/honest-reviews-report.md`.

### F4: Scalable FAQ System
- **Per-Service Typed Data:** Extracted and isolated FAQ data per service into `src/data/content/`:
  - `faqs-seo.ts` (4 client-approved SEO items preserved 100% verbatim).
  - `faqs-ppc.ts`, `faqs-social-media.ts`, `faqs-web-development.ts`, `faqs-video-photo.ts`.
  - Central getter `getServiceFaqs(slug)` in `src/data/content/faqs.ts`.
- **Scalable Accordion Architecture (\`ServiceFaqSection.tsx\`):**
  - **Threshold Limit & Show More:** First 6 items displayed initially; smooth "Show more questions" button reveals remainder with accessible live region screen-reader announcement.
  - **Multi-Open Support:** Permits several questions to remain open simultaneously.
  - **Anchors & Copy Affordance:** Each item features `#faq-<slug>` with an inline one-click copy-link button. Deep linking directly opens and scrolls to target item.
  - **Category Filter Pills:** Conditionally rendered with `?faq=<category>` URL synchronization when categories exist; cleanly omitted when items have no categories.
  - **Keyboard Navigation:** Full ArrowUp / ArrowDown / Home / End / Enter / Space navigation.
  - **Structured Data:** Generates valid `FAQPage` JSON-LD matching only the visible, real items of that page.
- **Client Instructions & Tracking:**
  - Added `docs/HOW-TO-ADD-FAQS.md` providing step-by-step instructions for client copy additions.
  - Logged `CIR-15` in `docs/CLIENT-INFO-REQUIRED.md` as "AWAITING CONTENT: more FAQs for SEO (and any other service)".
- **Fixture Verification & Evidence:**
  - Verified with 12-item temporary test fixture at `test-faq-fixture`, proving 6-limit initial render, show-more expansion to 12, category filtering to 5, keyboard navigation, and mobile viewports.
  - Fixture cleanly deleted after verification.
  - Captured screenshots in `docs/v9/F4-evidence/`: `seo-faq-real-1440.png`, `seo-faq-real-390.png`, `fixture-faq-12items-1440.png`, `fixture-faq-12items-390.png`.
  - Generated `docs/v9/F4-evidence/faq-verification-report.md`.

### F5: Video and Page Speed
- **Video Re-Encoding & Budget Verification:**
  - Audited all Home and About page videos with `tools/audit-videos.mjs` against strict V9 budgets.
  - Re-encoded `public/videos/home/showcase-04-behind-the-scenes.mp4` with `ffmpeg-static` (`crf=28`, `-movflags +faststart`) from 1.09 MB down to **773.6 KB** (well under the 900 KB threshold).
  - All 11 video assets verified under budget (`about-hero.mp4` 1.04 MB <= 1.8 MB; `about-hero-720p.mp4` 435 KB <= 1.0 MB; showcase clips 80 KB - 774 KB <= 900 KB).
- **Poster-First Hero Architecture (`VideoHero.tsx`):**
  - Instant high-priority static poster render with `fetchpriority="high"` and Next.js `priority`.
  - Looping ambient video sources attached only after window `load` / `requestIdleCallback` fires.
  - Respects user battery and network preferences: suppresses video attachments if `saveData` is active, cellular connection is `slow-2g`, `2g`, or `3g`, or `prefers-reduced-motion` is detected.
  - Integrated 3-second watchdog timer: gracefully falls back to static poster if video playback or decoding fails.
  - `IntersectionObserver` (0.15 threshold) and `visibilitychange` listeners pause playback when off-screen or tab is backgrounded.
- **Lazy-Loaded Portfolio Cards (`WorkShowcase.tsx`):**
  - Replaced eager `<video autoPlay>` on cards with `ShowcaseCardItem`.
  - Posters render instantly with explicit `aspect-[4/5]` containers (zero CLS).
  - Cards attach video elements only when within 120px viewport margin (`rootMargin: '120px'`).
- **HTTP Caching & Byte-Range Streaming (`next.config.mjs`):**
  - Configured `Cache-Control: public, max-age=31536000, immutable` for `/videos/:path*`, `/images/:path*`, and `/_next/static/:path*`.
  - Configured `Accept-Ranges: bytes` for `/videos/:path*` enabling seamless chunk-by-chunk media streaming without full-file rebuffering.
- **Speed & Bandwidth Measurements:**
  - On `/about`: Reduced video transfer before load from **1,646 KB down to 0.0 KB** (-100% video bandwidth contention before page load).
  - On `/about`: Load event time dropped from **721 ms down to 302 ms**; DOM Complete dropped from **707 ms down to 292 ms**.
  - All automated readability and contrast gates passed with 0 violations.
- **Evidence:**
  - Technical specs and asset inventory: `docs/v9/F5-evidence/video-audit.md`.
  - Mobile speed before & after comparison: `docs/v9/F5-evidence/speed-before-after.md`.
