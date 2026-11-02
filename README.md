# Lead Edge Marketing — Official Web Platform

A bespoke, high-craft, editorial web platform designed and engineered for **Lead Edge Marketing**, a premium digital marketing agency.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, the site unites high-end design craft with sub-second performance, strict accessibility (WCAG 2.2 AA), and complete responsive precision.

---

## Brand Palette & Design Tokens

Derived mathematically from the authoritative Lead Edge Marketing 3D metallic logo:
- **Primary Accent:** `#A28156` (Warm brushed bronze / antique gold midtone)
- **Champagne Highlight:** `#C8AB7E` (Metallic luster)
- **Burnished Bronze Shade:** `#74572D` (Deep shadow)
- **Titanium / Silver:** `#B4AFA6` (Neutral secondary metal from logo 'E')
- **Editorial Canvases:** `#FFFFFF` (Pure white), `#FAF8F5` (Warm off-white), `#F3F0EB` (Warm muted stone)
- **Deep Surfaces:** `#0B0B0C` (Charcoal slate), `#121214` (Deep black)
- **Strict Prohibition:** Absolute 0% blue across all UI, links, selection, and focus states.

---

## Route Architecture

| Route | View Description | Rendering Strategy |
|---|---|---|
| `/` | Homepage (Hero, Trust Bar, Services Preview, Selected Work, 4-Step Process, Stats, FAQ, Final CTA) | SSG (Static) |
| `/about` | Brand Storytelling & Realistic Interactive 3D Flagship Smartphone Scene | SSG (Static) |
| `/services` | Services Hub with 4 Interactive Tilting Editorial Panels | SSG (Static) |
| `/services/seo` | Technical SEO, Topical Architecture, Local SEO & Reporting | SSG (Static) |
| `/services/meta-ads` | Meta Advertising, CAPI Attribution & Creative Testing | SSG (Static) |
| `/services/social-media` | Social Media Strategy, Short-Form Video & Community Care | SSG (Static) |
| `/services/web-development` | Custom Web Engineering, Core Web Vitals & UI/UX Design | SSG (Static) |
| `/blog` | Editorial Journal with Client-Side & URL-Synced Category Filters | SSG (Static) |
| `/blog/[slug]` | Reusable Article Detail Template with Related Posts & CTAs | SSG (Static) |
| `/contact` | Conversion-Led Contact Page with Glass Form Shell & Live Validation | SSG (Static) |
| `/api/contact` | Secure Server Endpoint with Zod Validation, Rate Limiting & Honeypot | Dynamic Route Handler |
| `/_not-found` | Branded 404 Error View | Static |
| `/sitemap.xml` | Search Engine Sitemap XML | Dynamic Edge |
| `/robots.txt` | Crawler Directives | Static |

---

## Getting Started

### Prerequisites
- Node.js v18.18+ or v20+ / v22+
- npm v9+

### Installation
```bash
# Clone the repository and navigate into the workspace
git clone <repo-url>
cd Demo2

# Install dependencies
npm install
```

### Environment Configuration
Copy the provided `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your email service provider API key (e.g., Resend, SendGrid) when available. In local development without keys, the contact adapter safely runs in simulated mode with server logging.

### Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
# Compile and optimize static pages
npm run build

# Launch the production server
npm run start
```

---

## Quality & Verification Highlights

- **Shared First-Load JS:** Only **103 kB**.
- **Page Response Times:** ~50ms – 75ms under local production server.
- **Accessibility:** Tested WCAG 2.2 AA compliant. Skip link, focus-visible outlines (non-blue), aria landmarks, and focus trap on mobile navigation.
- **Motion Safety:** Full support for `prefers-reduced-motion` with automated pause controls (WCAG 2.2.2).
- **Anti-Spam Security:** In-memory IP rate limiting, hidden honeypot traps, and time-to-submit verification.

---

## Documentation Index

All architectural decisions, design tokens, and audit logs are documented in `/docs`:
- [`/docs/REPO-AUDIT.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/REPO-AUDIT.md) — Initial repo state and color extraction science
- [`/docs/ARCHITECTURE.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/ARCHITECTURE.md) — System architecture, routes, and data models
- [`/docs/DESIGN-SYSTEM.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/DESIGN-SYSTEM.md) — Token definitions, typography scales, contrast ratios
- [`/docs/ART-DIRECTION.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/ART-DIRECTION.md) — Visual standards, lighting moods, and mockup guidelines
- [`/docs/MOTION.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/MOTION.md) — Animation tokens, easing curves, reduced-motion overrides
- [`/docs/3D-DECISION.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/3D-DECISION.md) — Evaluation and hybrid architecture of the 3D smartphone showcase
- [`/docs/CLIENT-INFO-REQUIRED.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/CLIENT-INFO-REQUIRED.md) — Open client inputs, unverified facts tracker, and decision log
- [`/docs/TEST-REPORT.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/TEST-REPORT.md) — Measured performance, route audit, and integration test results
- [`/docs/ASSET-LICENSES.md`](file:///c:/Users/HP/OneDrive/Desktop/Demo2/docs/ASSET-LICENSES.md) — Provenance and usage terms of logo and creative assets
