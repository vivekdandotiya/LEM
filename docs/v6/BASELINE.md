# Lead Edge Marketing — V6 T0 Performance Baseline

**Date:** 2026-11-15  
**Branch:** `v6-stack-video-drip`  
**Host Machine:** Windows 11 Home (win32 x64), 12th Gen Intel(R) Core(TM) i5-1235U (12 vCPUs), 8 GB RAM  
**Testing Harness:** Real headed Google Chrome (`channel: 'chrome'`, GPU Hardware Acceleration Enabled) via Playwright CDP Tracing  
**Build Target:** Production Build (`npm run build` && `npm run start` at `http://localhost:3000`)  
**Strict Honesty Disclosure:** All figures below are strictly measured and reproducible. Dev mode was NOT used. Software-rendered headless mode was NOT used.

---

## 1. Frame Time & Jitter Baseline (rAF Samples During Continuous Scroll)

Targets specified in brief:
- **Normal Profile:** Median <= 16.7 ms, 95th Percentile (p95) <= 24.0 ms, Long Tasks (>50ms) = 0.
- **4x CPU Slowdown:** 95th Percentile (p95) <= 40.0 ms.

| Route | Profile | Sample Count | Median (ms) | p95 (ms) | Max (ms) | Long Tasks (>50ms) | Max Long Task (ms) | Status vs Target |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home (`/`)** | Normal (1x) | 109 | 16.7 | **99.9** | **466.7** | **5** | **561.0** | **FAIL (p95 > 24ms, 5 long tasks)** |
| **Home (`/`)** | CPU 4x Slowdown | 112 | 100.0 | **900.0** | **1733.3** | **163** | **1483.0** | **CRITICAL FAIL (Severe Lag)** |
| **Services (`/services`)** | Normal (1x) | 216 | 16.7 | 16.8 | 17.0 | 0 | 0.0 | **PASS** |
| **Services (`/services`)** | CPU 4x Slowdown | 160 | 33.4 | **166.6** | 416.6 | **21** | **389.0** | **FAIL (p95 > 40ms)** |
| **SEO (`/services/seo`)** | Normal (1x) | 73 | 16.7 | **366.6** | **432.9** | 0 | 0.0 | **FAIL (p95 > 24ms, dropped frames)** |
| **SEO (`/services/seo`)** | CPU 4x Slowdown | 204 | 33.3 | **133.4** | **1883.3** | **19** | **1745.0** | **CRITICAL FAIL (Severe Lag)** |
| **PPC (`/services/ppc`)** | Normal (1x) | 196 | 16.7 | **33.4** | 99.7 | 0 | 0.0 | **FAIL (p95 > 24ms)** |
| **PPC (`/services/ppc`)** | CPU 4x Slowdown | 196 | 33.3 | **116.7** | 1666.7 | **25** | **1468.0** | **FAIL (p95 > 40ms)** |
| **Social (`/services/social-media`)** | Normal (1x) | 215 | 16.7 | 16.8 | 37.0 | 0 | 0.0 | **PASS (Normal)** |
| **Social (`/services/social-media`)** | CPU 4x Slowdown | 217 | 16.8 | **133.2** | 1866.7 | **19** | **1527.0** | **FAIL (p95 > 40ms)** |
| **Web Dev (`/services/web-development`)** | Normal (1x) | 208 | 16.7 | 16.8 | 133.4 | 0 | 0.0 | **PASS (Normal)** |
| **Web Dev (`/services/web-development`)** | CPU 4x Slowdown | 153 | 49.9 | **216.8** | 2016.6 | **70** | **1676.0** | **FAIL (p95 > 40ms)** |

---

## 2. Mobile Lighthouse Audit Baseline

Captured using official Lighthouse 13.6.0 (Simulated Mobile Throttling, Moto G4 emulation, Headed Chromium):

| Route | Performance Score | FCP | LCP | Total Blocking Time (TBT) | Cumulative Layout Shift (CLS) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Homepage (`/`)** | **39 / 100** | 1.0 s | 6.6 s | **11,940 ms** | 0.000 |
| **Services (`/services`)** | **49 / 100** | 0.9 s | 4.1 s | **3,590 ms** | 0.157 |
| **SEO Discipline (`/services/seo`)** | **68 / 100** | 1.0 s | 1.0 s | **3,890 ms** | 0.000 |

*Diagnostic Note: The 11,940 ms TBT on Homepage and 3,590 - 3,890 ms TBT on service routes confirm severe main-thread starvation caused by excessive image instances, backdrop-filter stacking, and unthrottled pointer listeners.*

---

## 3. TOP 10 Cost Offenders by CPU / GPU Time

Extracted directly from the Chromium Performance Traces (`docs/v6/T0-evidence/traces/*.json`):

### 1. `DotGridPointerListener.tsx` (Pointer-Lit Full-Viewport Mask)
- **Element:** `div.fixed.inset-0.pointer-events-none` with style `--mx`, `--my` updating on every single pointer move.
- **Trace Cost:** 524.5 ms long task (`FunctionCall: t_` in `168-f431dc65e7a88e4f.js`).
- **Mechanism:** Setting inline CSS variables on a full-viewport fixed element triggers a full-page layer invalidation and rasterization pass on every move.

### 2. Excessive `backdrop-filter` Stacking
- **Elements:** `.card-glass-elevated`, `AdCard` pills (`backdrop-blur-md`), tags, deliverable chips (`backdrop-blur-sm`).
- **Trace Cost:** 6,386.2 ms spent in `Layerize` and 2,082.4 ms in `GPUTask`.
- **Mechanism:** Over 48 individual moving cards with dynamic blur filters force the compositor to create and blend dozens of intermediate GPU offscreen surfaces every frame.

### 3. `HeroWall.tsx` 48-Card GPU Texture Pressure
- **Element:** `div.hero-wall` and 6 infinite animated vertical columns (`.wall-col`).
- **Trace Cost:** 10,771.4 ms in `RunTask` / `ThreadControllerImpl::RunTask`.
- **Mechanism:** Up to 48 ad cards animate simultaneously with CSS keyframes, each holding high-resolution images decoded synchronously, continuing to animate even when completely out of the viewport.

### 4. `cursor.ts` Delegated Hit-Testing Frequency
- **Element:** Global `document.addEventListener('pointermove')` & ScrollTrigger ticker.
- **Trace Cost:** Repeated `document.elementFromPoint(x, y)` invocations during scroll and global `MutationObserver` on `document.body`.
- **Mechanism:** Inspecting DOM hierarchy under the pointer while Lenis is actively scrolling forces synchronous style recalculations and layout tree updates.

### 5. `ProcessStage.tsx` / Scene GSAP SVG Animations
- **Element:** Interactive SVG process scenes (`SeoScene.tsx`, `MetaScene.tsx`, etc.).
- **Trace Cost:** 366.6 ms frame drops on `/services/seo` during scroll; 1,745 ms long task in 4x slowdown.
- **Mechanism:** Heavy SVG element manipulation, stroke-dashoffset animations, and unpinned ScrollTriggers calculating matrix transforms during scroll.

### 6. Per-Element `getBoundingClientRect` in Pointer Handlers
- **Elements:** `Tilt3D.tsx`, `FinalCTA.tsx` letter proximity setter, `SpotlightCard`.
- **Trace Cost:** 309.3 ms in `UpdateLayoutTree` on normal profile; 3,154 ms on 4x CPU slowdown.
- **Mechanism:** Reading `getBoundingClientRect()` on every `pointermove` event without rAF caching triggers forced synchronous reflows.

### 7. Film Grain Animation Overlay
- **Element:** `div.film-grain` (fixed full-viewport pseudo-element).
- **Trace Cost:** Steady baseline GPU draw overhead during all composite steps.
- **Mechanism:** Animated SVG turbulence filter repaints the composited frame on every tick.

### 8. Synchronous Image Decoding on Main Thread
- **Elements:** Hero creative images, showcase cards, blog cards.
- **Trace Cost:** 875.3 ms in chunk `255-b1e2483a7e02feee.js` (`next/image`).
- **Mechanism:** Images lack `decoding="async"` attribute, blocking the main thread while image bitmap rasters are decompressed.

### 9. Lack of Off-Screen Component Virtualization
- **Elements:** Heavy below-the-fold components (`HomeInkSection`, `ConceptWorkGallery`, `ProcessSteps`).
- **Trace Cost:** 2,210.5 ms spent in `Layout` on 4x CPU slowdown.
- **Mechanism:** All sections remain actively mounted in the layout tree and participating in paint passes without viewport-based pausing.

### 10. Lenis Scroll Smoothness Scrub Lag
- **Element:** `SmoothScroll.tsx` and ScrollTrigger scrub interpolation.
- **Trace Cost:** Frame jitter spikes up to 432.9 ms when Lenis RAF tick collides with heavy layout recalcs during section transitions.
- **Mechanism:** Scrub rate was unoptimized for low-end CPU throttling; multiple passive event listeners firing concurrently.

---

## 4. Evidence Files Saved

- Raw CDP Trace JSONs:
  - `docs/v6/T0-evidence/traces/home-normal.json` (13.12 MB)
  - `docs/v6/T0-evidence/traces/home-cpu-4x.json` (39.23 MB)
  - `docs/v6/T0-evidence/traces/services-overview-normal.json` (14.82 MB)
  - `docs/v6/T0-evidence/traces/services-overview-cpu-4x.json` (17.75 MB)
  - `docs/v6/T0-evidence/traces/services-seo-normal.json` (9.15 MB)
  - `docs/v6/T0-evidence/traces/services-seo-cpu-4x.json` (28.81 MB)
  - `docs/v6/T0-evidence/traces/services-ppc-normal.json` (17.67 MB)
  - `docs/v6/T0-evidence/traces/services-ppc-cpu-4x.json` (27.62 MB)
  - `docs/v6/T0-evidence/traces/services-social-media-normal.json` (18.80 MB)
  - `docs/v6/T0-evidence/traces/services-social-media-cpu-4x.json` (25.45 MB)
  - `docs/v6/T0-evidence/traces/services-web-development-normal.json` (18.03 MB)
  - `docs/v6/T0-evidence/traces/services-web-development-cpu-4x.json` (33.15 MB)
- Lighthouse JSON & HTML Reports:
  - `docs/v6/T0-evidence/lighthouse/home.report.json` & `.html`
  - `docs/v6/T0-evidence/lighthouse/services.report.json` & `.html`
  - `docs/v6/T0-evidence/lighthouse/services-seo.report.json` & `.html`
- Summaries:
  - `docs/v6/T0-evidence/baseline-metrics.json`
  - `docs/v6/T0-evidence/trace-analysis.json`
