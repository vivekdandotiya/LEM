# Lead Edge Marketing — V6 Progress Log

This document tracks progress through tasks T0 to T8 in strict accordance with the V6 Master Prompt Operating Protocol.

---

## T0: Setup and True Baseline
- **Date:** 2026-11-15
- **Branch:** `v6-stack-video-drip` (branched from `main`)
- **Status:** **PASSED**
- **Changes & Findings:**
  - Created measurement tooling (`tools/measure.mjs`, `tools/analyze-traces.mjs`) driving real headed Google Chrome via Playwright CDP Tracing with hardware acceleration.
  - Confirmed `npm run build` succeeds cleanly.
  - Ran measurement on production server (`npm run start` on port 3000) under both normal (1x CPU) and 4x CPU slowdown profiles.
  - Proved real baseline bottlenecks: Homepage normal p95 is 99.9ms (5 long tasks up to 561ms); 4x CPU slowdown median drops to 100ms with p95 at 900ms and 163 long tasks. SEO page normal p95 is 366.6ms.
  - Mobile Lighthouse baseline captured: Homepage score 39 (TBT 11,940ms), Services score 49 (TBT 3,590ms), SEO score 68 (TBT 3,890ms).
  - Documented Top 10 cost offenders in `docs/v6/BASELINE.md`.
  - Raw traces and Lighthouse reports saved in `docs/v6/T0-evidence/`.
- **Files Touched:**
  - `tools/measure.mjs` (measurement harness)
  - `tools/analyze-traces.mjs` (trace analysis script)
  - `docs/v6/BASELINE.md`
  - `docs/v6/PROGRESS.md`
  - Evidence: `docs/v6/T0-evidence/traces/*.json`, `docs/v6/T0-evidence/lighthouse/*`
- **Commit:** `T0: baseline measurements`

---

## T1: Fix the Lag (Smoothness Repairs, Measured)
- **Date:** 2026-11-16
- **Branch:** `v6-stack-video-drip`
- **Status:** **PASSED**
- **Changes & Findings:**
  - Removed full-viewport repainting mask (`body::after`) and promoted base dots (`body::before`) with `transform: translateZ(0)`.
  - Replaced dot cursor layer in `DotGridPointerListener.tsx` with a small, 442×442 element with static radial mask and grid-snapped `translate3d()` via `gsap.quickTo`.
  - Removed `backdrop-blur` from all cards, chips, badges, and moving columns (retained strictly on navbar and contact form).
  - Optimized `HeroWall.tsx`: added `will-change: transform` directly to column elements, converted pause/resume to direct DOM operations (zero React re-renders during scroll), and capped rendered creatives per column to visible + 1 buffer.
  - Optimized `cursor.ts`: throttled `elementFromPoint` to at most once per 80ms during scroll, removed per-frame `gsap.ticker` loop, and targeted `MutationObserver` strictly to the active target's parent.
  - Eliminated synchronous layout thrash in `Magnetic.tsx`, `Tilt3D.tsx`, and `FinalCTA.tsx` by pre-caching element bounding boxes on `pointerenter` and invalidating on scroll/resize.
  - Added `content-visibility: auto` to below-the-fold sections and explicit `decoding="async"` to `<Image>` tags.
  - Re-measured on production build with real headed Google Chrome:
    - Normal profile: 5 out of 6 routes achieved 0 long tasks; `/services/seo` p95 improved by 11x from 366.6ms down to 33.4ms with 0 long tasks; `/` p95 dropped from 99.9ms to 66.6ms with only 1 task at 50.0ms.
    - 4x CPU slowdown: `/` median dropped from 100.0ms to 16.7ms (6x faster), with long tasks reduced by 75.5%; `/services/seo` max frame time dropped from 1883ms to 200ms.
    - Cursor test suite: 8/8 tests passed (100%).
    - Lighthouse mobile: Homepage improved from 39 to 50 (+11 pts, LCP 6.6s -> 2.0s); Services improved from 49 to 51.
- **Files Touched:**
  - `src/styles/globals.css`
  - `src/components/ui/DotGridPointerListener.tsx`
  - `src/components/hero/AdCard.tsx`
  - `src/components/hero/HeroWall.tsx`
  - `src/components/hero/HeroVisualCards.tsx`
  - `src/components/hero/HeroVisualStack.tsx`
  - `src/components/hero/HomeHero.tsx`
  - `src/components/home/SelectedWork.tsx`
  - `src/components/home/ServicesPreview.tsx`
  - `src/components/home/TrustBar.tsx`
  - `src/components/about/AboutJourney.tsx`
  - `src/components/process/ProcessStage.tsx`
  - `src/components/process/scenes/MetaScene.tsx`
  - `src/components/process/scenes/SocialScene.tsx`
  - `src/components/services/ServicePageTemplate.tsx`
  - `src/components/three/PhoneFallback.tsx`
  - `src/components/ui/CircularBadge.tsx`
  - `src/components/intro/BrandFloodIntro.tsx`
  - `src/components/home/FAQSection.tsx`
  - `src/components/home/StatsSection.tsx`
  - `src/components/home/FinalCTA.tsx`
  - `src/components/home/ConceptWorkGallery.tsx`
  - `src/components/home/ProcessSteps.tsx`
  - `src/motion/cursor.ts`
  - `src/motion/Magnetic.tsx`
  - `src/motion/Tilt3D.tsx`
  - `src/motion/ImageReveal.tsx`
  - `next.config.mjs`
  - `docs/v6/T1-before-after.md`
  - `docs/v6/PROGRESS.md`
  - Evidence: `docs/v6/T1-evidence/traces/*.json`, `docs/v6/T1-evidence/lighthouse/*`, `docs/v6/T1-evidence/baseline-metrics.json`
- **Commit:** `T1: smoothness repairs`

---

## T2: Navbar and Top-Edge Bug Fixes
- **Date:** 2026-11-16
- **Branch:** `v6-stack-video-drip`
- **Status:** **PASSED**
- **Changes & Findings:**
  - Redefined `.glass-nav-dark` and `.glass-nav-light` in `src/styles/globals.css`:
    - Ink state: `background: rgba(8, 10, 11, 0.88)` with `backdrop-filter: blur(18px) saturate(1.1)`, 1px hairline border `rgba(255, 255, 255, 0.12)`, text crisp white (`rgb(255, 255, 255)` / `rgba(255, 255, 255, 0.8)`).
    - Paper state: `background: rgba(246, 244, 238, 0.90)` with `backdrop-filter: blur(18px) saturate(1.1)`, 1px hairline border `rgba(8, 10, 11, 0.10)`, text crisp ink (`#080A0B`).
    - Added `@supports not (backdrop-filter: blur(18px))` fallbacks (`#080A0B` / `#F6F4EE` at 0.96 alpha).
    - Removed all fading gradients and mask fades from the navbar container.
  - Upgraded `src/components/layout/Navbar.tsx`:
    - Center-line element sampling via `document.elementsFromPoint(centerX, centerY)` detecting dark vs light sections directly underneath the floating pill with hysteresis debounce (3 consecutive matching frames) to eliminate rapid flickering.
    - Full WCAG AA/AAA contrast verified across paper, dark, and stage sections.
    - Replaced CSS hover sag with reliable, delegated listeners in `DripTransitionProvider.jsx` (listening to `pointermove`, `scroll`, `resize`, `blur`, `route:start`, and `visibilitychange`), guaranteeing sag resets to 0 immediately when the pointer leaves or content shifts.
  - Removed top-edge dark band in `src/components/animorio/drip/DripTransitionProvider.jsx`:
    - Removed `drawBand` 3px `#14110F` idle bar across the viewport top edge. Top edge is now clean with only the 3px lime scroll progress bar (`LimeScrollProgress`) rendering at `y <= 24px`.
    - Zero teal/blue-grey strip present on any page.
  - Fixed pinned stage overlap in `src/components/process/ProcessStage.tsx` and `src/components/services/ServicePageTemplate.tsx`:
    - Added `scroll-mt-24` and `pt-24` to the pinned container so pinning starts with 96px top clearance below the navbar pill, leaving the "03 / HOW WE DELIVER" section heading completely visible and uncovered.
  - Disabled Next.js dev indicator in `next.config.mjs` (`devIndicators: false`).
  - Automated verification via `tools/verify-t2.mjs`:
    - Captured 16 screenshots across 4 routes (`/`, `/services`, `/services/seo`, `/blog`) at 1440px and 390px, top and scrolled.
    - Verified all nav links legible with contrast > 4.5:1.
    - Verified nav hover sag reset to 0 with zero stuck sags.
    - Inspected top edge `y <= 24px`: only the lime scroll progress indicator exists; zero dark/teal strips.
- **Files Touched:**
  - `src/styles/globals.css`
  - `src/components/layout/Navbar.tsx`
  - `src/components/animorio/drip/DripTransitionProvider.jsx`
  - `src/components/process/ProcessStage.tsx`
  - `src/components/services/ServicePageTemplate.tsx`
  - `next.config.mjs`
  - `tools/verify-t2.mjs`
  - `docs/v6/PROGRESS.md`
  - Evidence: `docs/v6/T2-evidence/*.png`
- **Commit:** `T2: navbar legibility and top-edge fixes`
