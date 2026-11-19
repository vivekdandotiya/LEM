# V9 Baseline Measurements and Reproduction Report

**Generated:** 2026-11-19T08:33:37.947Z
**Local Test Environment:** Windows, Node v22.20.0, Chromium Headless (System Channel)
**Deployed Preview URL:** https://lem-alpha.vercel.app
**Branch:** `v9-client-feedback` (forked from commit matching deployed preview `010b3fe`)

---

## 1. Reproduction of Client Feedback Items

Before making any changes, each feedback item was reproduced on both the local production build and the deployed preview:

| Feedback Item | Component / Page | Visual Defect Observed | Evidence File (1440 / 390) |
|---|---|---|---|
| **1. Text color not visible on About** | About Hero (`/about`) | Headline/paragraph text and tags displayed against the office video with insufficient contrast under bright frame passages. | `local-about-hero-1440.png`, `local-about-hero-390.png` / `preview-about-hero-1440.png`, `preview-about-hero-390.png` |
| **2. Button "Explore Our Philosophy" (AI wording)** | About Hero (`/about`) | CTA button uses abstract phrasing "Explore Our Philosophy ↓". | `local-about-hero-1440.png` |
| **3. Reviews heading font visibility** | Review Section (`#testimonials-section`) | Heading displayed with dark text on dark surface (`text-ink` on `bg-charcoal` theme mismatch), rendering text virtually invisible against the background. | `local-reviews-1440.png`, `local-reviews-390.png` / `preview-reviews-1440.png`, `preview-reviews-390.png` |
| **4. More FAQs Needed on Service Pages** | SEO Service Page (`/services/seo`) | Only 4 questions rendered; no "Show more" scalable container, no filter pills, and no category slots. | `local-seo-faq-1440.png`, `local-seo-faq-390.png` / `preview-seo-faq-1440.png`, `preview-seo-faq-390.png` |

All before screenshots are saved in `/docs/v9/F0-evidence/`.

---

## 2. Route Status Audit (200 OK Check)

Every public route was requested on both Local Production (`http://localhost:3000`) and Deployed Preview (`https://lem-alpha.vercel.app`):

| Route | Local Status | Preview Status | Result |
|---|---|---|---|
| `/` | 200 OK | 200 OK | PASS |
| `/about` | 200 OK | 200 OK | PASS |
| `/services` | 200 OK | 200 OK | PASS |
| `/services/seo` | 200 OK | 200 OK | PASS |
| `/services/ppc` | 200 OK | 200 OK | PASS |
| `/services/social-media` | 200 OK | 200 OK | PASS |
| `/services/web-development` | 200 OK | 200 OK | PASS |
| `/services/video-photo` | 200 OK | 200 OK | PASS |
| `/blog` | 200 OK | 200 OK | PASS |
| `/blog/modern-organic-search-architecture` | 200 OK | 200 OK | PASS |
| `/blog/meta-creative-diversity-strategy` | 200 OK | 200 OK | PASS |
| `/blog/editorial-social-brand-equity` | 200 OK | 200 OK | PASS |
| `/blog/engineering-performance-first-web-experiences` | 200 OK | 200 OK | PASS |
| `/contact` | 200 OK | 200 OK | PASS |
| `/robots.txt` | 200 OK | 200 OK | PASS |
| `/sitemap.xml` | 200 OK | 200 OK | PASS |

---

## 3. Video File Size Inventory

The following 81 video files are currently stored in `/public/videos/`:

| File Path | Size (Bytes) | Size (MB) |
|---|---|---|
| `videos/about/about-hero-720p.mp4` | 4,46,346 B | 0.43 MB |
| `videos/about/about-hero.mp4` | 10,92,016 B | 1.04 MB |
| `videos/about/about-hero.webm` | 16,85,523 B | 1.61 MB |
| `videos/blog/blog-hero-720p.mp4` | 2,83,615 B | 0.27 MB |
| `videos/blog/blog-hero.mp4` | 8,27,219 B | 0.79 MB |
| `videos/blog/blog-hero.webm` | 12,08,587 B | 1.15 MB |
| `videos/home/showcase-01-product-ad-720p.mp4` | 82,293 B | 0.08 MB |
| `videos/home/showcase-01-product-ad.mp4` | 3,18,419 B | 0.30 MB |
| `videos/home/showcase-01-product-ad.webm` | 6,22,799 B | 0.59 MB |
| `videos/home/showcase-02-social-reel-720p.mp4` | 1,04,245 B | 0.10 MB |
| `videos/home/showcase-02-social-reel.mp4` | 3,37,749 B | 0.32 MB |
| `videos/home/showcase-02-social-reel.webm` | 4,62,394 B | 0.44 MB |
| `videos/home/showcase-03-web-scroll-720p.mp4` | 1,81,430 B | 0.17 MB |
| `videos/home/showcase-03-web-scroll.mp4` | 5,78,044 B | 0.55 MB |
| `videos/home/showcase-03-web-scroll.webm` | 11,66,720 B | 1.11 MB |
| `videos/home/showcase-04-behind-the-scenes-720p.mp4` | 4,02,073 B | 0.38 MB |
| `videos/home/showcase-04-behind-the-scenes.mp4` | 11,21,297 B | 1.07 MB |
| `videos/home/showcase-04-behind-the-scenes.webm` | 12,91,762 B | 1.23 MB |
| `videos/services/ppc-phase-0-720p.mp4` | 86,290 B | 0.08 MB |
| `videos/services/ppc-phase-0.mp4` | 2,11,646 B | 0.20 MB |
| `videos/services/ppc-phase-0.webm` | 2,00,332 B | 0.19 MB |
| `videos/services/ppc-phase-1-720p.mp4` | 89,432 B | 0.09 MB |
| `videos/services/ppc-phase-1.mp4` | 2,35,406 B | 0.22 MB |
| `videos/services/ppc-phase-1.webm` | 1,99,417 B | 0.19 MB |
| `videos/services/ppc-phase-2-720p.mp4` | 96,000 B | 0.09 MB |
| `videos/services/ppc-phase-2.mp4` | 2,32,493 B | 0.22 MB |
| `videos/services/ppc-phase-2.webm` | 1,98,747 B | 0.19 MB |
| `videos/services/ppc-phase-3-720p.mp4` | 89,055 B | 0.08 MB |
| `videos/services/ppc-phase-3.mp4` | 2,26,796 B | 0.22 MB |
| `videos/services/ppc-phase-3.webm` | 2,07,451 B | 0.20 MB |
| `videos/services/seo-phase-0-720p.mp4` | 61,702 B | 0.06 MB |
| `videos/services/seo-phase-0.mp4` | 1,45,179 B | 0.14 MB |
| `videos/services/seo-phase-0.webm` | 1,42,919 B | 0.14 MB |
| `videos/services/seo-phase-1-720p.mp4` | 82,614 B | 0.08 MB |
| `videos/services/seo-phase-1.mp4` | 2,04,624 B | 0.20 MB |
| `videos/services/seo-phase-1.webm` | 1,88,194 B | 0.18 MB |
| `videos/services/seo-phase-2-720p.mp4` | 85,949 B | 0.08 MB |
| `videos/services/seo-phase-2.mp4` | 2,18,648 B | 0.21 MB |
| `videos/services/seo-phase-2.webm` | 2,15,210 B | 0.21 MB |
| `videos/services/seo-phase-3-720p.mp4` | 86,848 B | 0.08 MB |
| `videos/services/seo-phase-3.mp4` | 2,20,055 B | 0.21 MB |
| `videos/services/seo-phase-3.webm` | 2,16,566 B | 0.21 MB |
| `videos/services/social-media-phase-0-720p.mp4` | 89,632 B | 0.09 MB |
| `videos/services/social-media-phase-0.mp4` | 2,23,510 B | 0.21 MB |
| `videos/services/social-media-phase-0.webm` | 2,07,854 B | 0.20 MB |
| `videos/services/social-media-phase-1-720p.mp4` | 93,498 B | 0.09 MB |
| `videos/services/social-media-phase-1.mp4` | 2,24,926 B | 0.21 MB |
| `videos/services/social-media-phase-1.webm` | 2,16,946 B | 0.21 MB |
| `videos/services/social-media-phase-2-720p.mp4` | 86,642 B | 0.08 MB |
| `videos/services/social-media-phase-2.mp4` | 2,09,991 B | 0.20 MB |
| `videos/services/social-media-phase-2.webm` | 1,88,446 B | 0.18 MB |
| `videos/services/social-media-phase-3-720p.mp4` | 73,375 B | 0.07 MB |
| `videos/services/social-media-phase-3.mp4` | 1,75,317 B | 0.17 MB |
| `videos/services/social-media-phase-3.webm` | 1,76,388 B | 0.17 MB |
| `videos/services/video-photo-hero-720p.mp4` | 4,61,436 B | 0.44 MB |
| `videos/services/video-photo-hero.mp4` | 10,35,285 B | 0.99 MB |
| `videos/services/video-photo-hero.webm` | 13,47,508 B | 1.29 MB |
| `videos/services/video-photo-phase-0-720p.mp4` | 3,09,780 B | 0.30 MB |
| `videos/services/video-photo-phase-0.mp4` | 7,82,606 B | 0.75 MB |
| `videos/services/video-photo-phase-0.webm` | 10,20,809 B | 0.97 MB |
| `videos/services/video-photo-phase-1-720p.mp4` | 4,72,390 B | 0.45 MB |
| `videos/services/video-photo-phase-1.mp4` | 10,53,317 B | 1.00 MB |
| `videos/services/video-photo-phase-1.webm` | 11,59,304 B | 1.11 MB |
| `videos/services/video-photo-phase-2-720p.mp4` | 3,70,650 B | 0.35 MB |
| `videos/services/video-photo-phase-2.mp4` | 9,31,126 B | 0.89 MB |
| `videos/services/video-photo-phase-2.webm` | 10,70,952 B | 1.02 MB |
| `videos/services/video-photo-phase-3-720p.mp4` | 2,29,495 B | 0.22 MB |
| `videos/services/video-photo-phase-3.mp4` | 6,93,907 B | 0.66 MB |
| `videos/services/video-photo-phase-3.webm` | 9,81,656 B | 0.94 MB |
| `videos/services/web-development-phase-0-720p.mp4` | 86,086 B | 0.08 MB |
| `videos/services/web-development-phase-0.mp4` | 2,25,229 B | 0.21 MB |
| `videos/services/web-development-phase-0.webm` | 2,18,527 B | 0.21 MB |
| `videos/services/web-development-phase-1-720p.mp4` | 72,697 B | 0.07 MB |
| `videos/services/web-development-phase-1.mp4` | 1,85,486 B | 0.18 MB |
| `videos/services/web-development-phase-1.webm` | 1,71,269 B | 0.16 MB |
| `videos/services/web-development-phase-2-720p.mp4` | 83,244 B | 0.08 MB |
| `videos/services/web-development-phase-2.mp4` | 1,99,984 B | 0.19 MB |
| `videos/services/web-development-phase-2.webm` | 1,98,738 B | 0.19 MB |
| `videos/services/web-development-phase-3-720p.mp4` | 91,660 B | 0.09 MB |
| `videos/services/web-development-phase-3.mp4` | 2,39,643 B | 0.23 MB |
| `videos/services/web-development-phase-3.webm` | 2,11,969 B | 0.20 MB |

---

## 4. Performance Baselines (Mobile Simulation: 390x844)

Initial mobile measurements captured before V9 optimizations:

| Metric | Local `/` | Preview `/` | Local `/about` | Preview `/about` |
|---|---|---|---|---|
| **Load Event Time** | 587 ms | 1513 ms | 721 ms | 888 ms |
| **Total Requests** | 54 | 54 | 28 | 28 |
| **Total Transfer (Header Content-Length)** | 416.8 KB | 416.8 KB | 1818.5 KB | 1818.5 KB |
| **Video Transfer Before Load** | 0.0 KB | 0.0 KB | 1646.0 KB | 1646.0 KB |
| **DOM Complete** | 576.3999999761581 ms | 1496.1000000238419 ms | 707 ms | 875.8000000119209 ms |

*Note: In accordance with protocol, Lighthouse lab simulations and profile throttling will be measured and compared in F5 and F10.*
