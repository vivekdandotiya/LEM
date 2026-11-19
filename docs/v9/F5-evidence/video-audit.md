# Home and About Video Audit (F5.1)

This audit documents every video asset utilized on the Homepage and About page, verifying file sizes against the strict V9 budgets:
- **Hero 1080p Budget:** <= 1.8 MB
- **Hero 720p Budget:** <= 1.0 MB
- **Showcase Clips Budget:** <= 900 KB each

## Video Inventory & Technical Specs

| Video File | Page | Role | Resolution | Duration | Bitrate | Size | Budget | Audio | Status |
|---|---|---|---|---|---|---|---|---|---|
| `about-hero.mp4` | About | Hero ambient background loop | 1920x1080 | 10.0 s | 873 kbps | **1.04 MB** (1066.4 KB) | 1.8 MB | No (Clean -an) | ✅ Under Budget |
| `about-hero.webm` | About | Hero ambient background loop | 1920x1080 | 10.0 s | 1348 kbps | **1.61 MB** (1646.0 KB) | 1.8 MB | No (Clean -an) | ✅ Under Budget |
| `about-hero-720p.mp4` | About | Mobile hero loop | 1280x720 | 10.0 s | 357 kbps | **0.43 MB** (435.9 KB) | 1.0 MB | No (Clean -an) | ✅ Under Budget |
| `showcase-01-product-ad.mp4` | Home | Work showcase portfolio card | 1080x1350 | 7.0 s | 363 kbps | **0.30 MB** (311.0 KB) | 900 KB | No (Clean -an) | ✅ Under Budget |
| `showcase-01-product-ad-720p.mp4` | Home | Mobile showcase card | 576x720 | 7.0 s | 94 kbps | **0.08 MB** (80.4 KB) | 900 KB | No (Clean -an) | ✅ Under Budget |
| `showcase-02-social-reel.mp4` | Home | Work showcase portfolio card | 1080x1350 | 7.0 s | 385 kbps | **0.32 MB** (329.8 KB) | 900 KB | No (Clean -an) | ✅ Under Budget |
| `showcase-02-social-reel-720p.mp4` | Home | Mobile showcase card | 576x720 | 7.0 s | 119 kbps | **0.10 MB** (101.8 KB) | 900 KB | No (Clean -an) | ✅ Under Budget |
| `showcase-03-web-scroll.mp4` | Home | Work showcase portfolio card | 1080x1350 | 7.0 s | 660 kbps | **0.55 MB** (564.5 KB) | 900 KB | No (Clean -an) | ✅ Under Budget |
| `showcase-03-web-scroll-720p.mp4` | Home | Mobile showcase card | 576x720 | 7.0 s | 207 kbps | **0.17 MB** (177.2 KB) | 900 KB | No (Clean -an) | ✅ Under Budget |
| `showcase-04-behind-the-scenes.mp4` | Home | Work showcase portfolio card | 1080x1350 | 7.0 s | 905 kbps | **0.76 MB** (773.6 KB) | 900 KB | No (Clean -an) | ✅ Under Budget |
| `showcase-04-behind-the-scenes-720p.mp4` | Home | Mobile showcase card | 576x720 | 7.0 s | 459 kbps | **0.38 MB** (392.6 KB) | 900 KB | No (Clean -an) | ✅ Under Budget |


## Loading Architecture Audit (F5.3 - F5.7)

### 1. About Hero Ambient Video (`VideoHero.tsx`)
- **Format Order:** `<source type="video/webm">` followed by `720p mp4` (`media="(max-width: 767px)"`) and `1080p mp4`.
- **Preload Strategy:** `preload="none"`. The video sources are NOT attached until the window `load` event / `requestIdleCallback` has fired.
- **Save-Data & Slow Network Safe:** Evaluates `navigator.connection.saveData` and `effectiveType === '2g' | '3g'`. Under cellular throttling or data saver, the video stays unattached and only the static poster is rendered.
- **Reduced Motion:** If `prefers-reduced-motion: reduce` is detected, video execution is suppressed; the high-resolution poster is preserved.
- **LCP Optimization:** High-priority AVIF/WebP poster (`fetchpriority="high"`, Next.js `priority`) ensures instant LCP paint before video chunks are requested.
- **Scroll & Tab Visibility:** Connected to an `IntersectionObserver` and `visibilitychange` listener. Automatically pauses playback when scrolled out of view or when the user switches tabs, resuming smoothly upon return.
- **Stall & Failure Safe:** A 3-second watchdog timer falls back to the static poster if video decoding stalls or errors.

### 2. Work Showcase Cards (`WorkShowcase.tsx`)
- **Lazy Attachment:** Videos on portfolio showcase cards do not attach their `src` on page load. Instead, an `IntersectionObserver` attaches the video source only when the card scrolls within 100px of the viewport.
- **Single Active Video Policy:** Only one showcase video card is allowed to play/decode at any given moment; off-screen cards are paused and unbuffered to prevent GPU / memory contention.
- **Aspect Ratio Protection:** Container maintains explicit `aspect-[4/5]` aspect ratio to guarantee zero Cumulative Layout Shift (CLS = 0).

### 3. Server Caching & Range Requests (`next.config.mjs`)
- Configured `Cache-Control: public, max-age=31536000, immutable` for all `/videos/:path*` assets.
- Explicit `Accept-Ranges: bytes` header configured to facilitate instant multi-chunk streaming without re-downloading entire video files.
