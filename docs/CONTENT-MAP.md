# Lead Edge Marketing — Content Mapping Specification (V5)
**Source of Truth:** Google Doc "Copy of Website Content | Lead Edge Marketer" ([CLIENT-CONTENT.md](./CLIENT-CONTENT.md))  
**Status:** 100% Document Blocks Placed

---

## 1. Master Content Placement Matrix

| Doc Block | Target Page | Target Section | Component Target | Data Source File | Content Summary / Verbatim String |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Suggestion A** | Homepage (`/`) | Hero H1 (Headline 1) | `HomeHero.tsx` | `src/data/hero.ts` | `"WE DON'T JUST RANK WEBSITES. WE SCALE revenue"` |
| **Suggestion B** | Homepage (`/`) | Hero H1 (Headline 2) | `HomeHero.tsx` | `src/data/hero.ts` | `"WE DON'T JUST DRIVE TRAFFIC. WE BUILD authority."` |
| **Card 1 (Seo)** | Homepage (`/`) & Services (`/services`) | Services Preview Card 1 | `ServicesPreview.tsx`, `ServiceCardInteractive.tsx` | `src/data/services.ts` | Title: `"Be the answer when buyers search"`<br>Tagline: `"Dominate search engine rankings and capture high-intent organic traffic."` |
| **Card 2 (PPC Services)** | Homepage (`/`) & Services (`/services`) | Services Preview Card 2 | `ServicesPreview.tsx`, `ServiceCardInteractive.tsx` | `src/data/services.ts` | Renamed from "Meta Ads" to **"PPC Services"**.<br>Tagline: `"Targeted Facebook & Instagram ads engineered to drive instant leads and max ROAS."` |
| **Card 3 (Social Media Services)** | Homepage (`/`) & Services (`/services`) | Services Preview Card 3 | `ServicesPreview.tsx`, `ServiceCardInteractive.tsx` | `src/data/services.ts` | Title: `"Content built to build loyal brand communities."`<br>Tagline: `"Scale your brand reach with Lead Edge Marketers. We craft targeted social media marketing campaigns..."` |
| **Card 4 (Web Development)** | Homepage (`/`) & Services (`/services`) | Services Preview Card 4 | `ServicesPreview.tsx`, `ServiceCardInteractive.tsx` | `src/data/services.ts` | Title: `"High-speed sites engineered to turn clicks into clients."`<br>Tagline: `"Build high-converting, lightning-fast websites with Lead Edge Marketers. Our SEO-first web development creates sub-second speed sites..."` |
| **Homepage FAQ (7 Items)** | Homepage (`/`) | Homepage FAQ Accordion | `FAQSection.tsx` | `src/data/faqs.ts` | 7 client-supplied questions & answers covering service suite, goal alignment, contract terms, reporting, company size, timeline, and agency differentiation. |
| **SEO Hero Headline** | SEO Discipline (`/services/seo`) | Service Hero H1 | `ServicePageTemplate.tsx` | `src/data/services.ts` | `"TURN SEARCH VISIBILITY INTO SUSTAINABLE BUSINESS Growth."` (with `Growth.` styled in lowercase serif-italic) |
| **SEO Core Deliverables** | SEO Discipline (`/services/seo`) | Hero Feature Chips | `ServicePageTemplate.tsx` | `src/data/services.ts` | 6 Client Chips: `Technical SEO`, `On-Page SEO`, `Off-Page SEO`, `Keyword Research`, `SEO Content Strategy`, `Organic Growth`. |
| **SEO Section 02** | SEO Discipline (`/services/seo`) | Showcase 2-Card Execution Grid | `ServicePageTemplate.tsx` | `src/data/services.ts` | H2: `"Strategic SEO execution across every detail."`<br>Card 1: `"Build SEO strategies around keyword research, search intent, and competitor analysis..."`<br>Card 2: `"Refine website performance, content, and search visibility through ongoing analysis..."` |
| **SEO Section 03 (Process)** | SEO Discipline (`/services/seo`) | 4-Phase Interactive Stage | `ProcessStage.tsx`, `SeoScene.tsx` | `src/data/processes.ts` | H2: `"We engineer your visibility step by step."`<br>Phase 01: `"We uncover opportunities others overlook."`<br>Phase 02: `"We align your content with search intent."`<br>Phase 03: `"We build a stronger search foundation."`<br>Phase 04: `"We turn rankings into meaningful results."` |
| **SEO FAQ (4 Items)** | SEO Discipline (`/services/seo`) | Discipline FAQ Accordion | `ServicePageTemplate.tsx` | `src/data/services.ts` | 4 client-supplied questions: Services included, time to rank (3-6 mos), KPIs reported, agency vs consultant. |
| **PPC Hero Headline** | PPC Discipline (`/services/ppc`) | Service Hero H1 | `ServicePageTemplate.tsx` | `src/data/services.ts` | `"DATA-DRIVEN META ADS THAT TURN TARGET AUDIENCES INTO customers."` (with `customers.` in serif-italic) |
| **PPC Core Deliverables** | PPC Discipline (`/services/ppc`) | Hero Feature Chips | `ServicePageTemplate.tsx` | `src/data/services.ts` | 3 Client Chips: `Creative Hook Diversity`, `Active Practice`, `Algorithmic Audience Modeling`. |
| **PPC Section 02** | PPC Discipline (`/services/ppc`) | Showcase 2-Card Execution Grid | `ServicePageTemplate.tsx` | `src/data/services.ts` | Card 1: `"Visibility Without Delay"` / `"Strategic campaigns and targeted technical fixes..."`<br>Card 2: `"Precision That Performs"` / `"From search-focused content to on-page optimization..."` |
| **PPC FAQ (5 Items)** | PPC Discipline (`/services/ppc`) | Discipline FAQ Accordion | `ServicePageTemplate.tsx` | `src/data/services.ts` | 5 client-supplied questions: Facebook marketing scope, timeline to results (2-4 wks), pricing/retainers, Advantage+ vs manual, Facebook Groups ROI. |
| **Social & Web Subpages** | Social & Web (`/services/social-media`, `/services/web-development`) | Service Hero, Showcase, Process, FAQs | `ServicePageTemplate.tsx`, `ProcessStage.tsx` | `src/data/services.ts`, `src/data/processes.ts` | Uses client document's confirmed service positioning, 4-pillar social strategy, Next.js engineering rigor, zero false claims. |

---

## 2. Global Brand Name Policy
- **Supplied Logo Emblem:** Reads `"LEAD EDGE MARKETING"`.
- **Client Google Doc Text:** Uses `"Lead Edge Marketers"` and `"Lead Edge Marketer"`.
- **Resolution Strategy:** Defined dynamically via `BRAND_NAME = "Lead Edge Marketing"` in `src/data/site.ts`. All metadata, nav, footer, and intro read this constant. Document discrepancy logged in `docs/CLIENT-INFO-REQUIRED.md` for final client confirmation.

---

## 3. URL Routing & Redirection
- **Old Route:** `/services/meta-ads`
- **New Canonical Route:** `/services/ppc` (labeled "PPC Services")
- **Redirect Rule:** Added permanent HTTP 308 redirect in `next.config.mjs`:
  ```javascript
  {
    source: '/services/meta-ads',
    destination: '/services/ppc',
    permanent: true,
  }
  ```
- **Navigation & Internal Links:** All `<a>` and `<Link>` references across Navbar, Footer, Services Preview, Breadcrumbs, and Sitemap updated to `/services/ppc`.
