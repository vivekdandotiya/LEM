# Client Information Required & Decision Tracker

This document tracks all unverified facts, required client inputs, and strategic decisions. In accordance with Lead Edge Marketing non-negotiable guidelines, no facts, client names, statistics, or certifications are fabricated. Missing items are represented with clearly labeled, config-controlled placeholders.

## 1. Information Requirements Tracker

| Item # | Item Description | Where It Appears | Current Placeholder Representation | What Is Needed From Client | Status |
|---|---|---|---|---|---|
| **CIR-01** | Official Vector Logo (SVG) | Navbar, Footer, Favicon, OG Image | High-res 1024×1024 PNG master extracted into lossless WebP & transparent PNGs. | Vector SVG source file if available for infinite scaling. | Sourced PNG in place |
| **CIR-02** | "5+ Years Experience" Claim Approval | About Page Hero, Home Hero trust text | Disabled in production; labeled placeholder badge "EXPERIENCE CLAIM — AWAITING CLIENT APPROVAL". | Written confirmation that Lead Edge has operated for 5+ years. | Pending Client Sign-off |
| **CIR-03** | Verified Statistics & Growth Metrics | Homepage Section 5.6 (Results/Stats) | Stat cards render neutral "00" with "PLACEHOLDER — AWAITING APPROVED FIGURE" badge. | Three verified metrics (e.g. ad spend managed, organic traffic lift %, clients served). | Pending Client Data |
| **CIR-04** | Client Case Studies & Names | Homepage Section 5.4, Service pages | Generic editorial development samples ("SAMPLE PROJECT 01", "SAMPLE PROJECT 02") with sample badges. | Approved real client case studies, high-res project imagery, and authorization to publish. | Awaiting Portfolio Approval |
| **CIR-05** | Partner / Platform Certification Badges | Homepage Trust Bar (Section 5.2) | Outlined badge placeholders labeled "Approved Partner Badge Placeholder" (controlled by `showPlaceholders` flag). | Official Google Partner, Meta Partner, or Shopify Partner badge assets if certified. | Awaiting Verification |
| **CIR-06** | Contact Information | Footer, Contact Page Hero | `hello@leadedge.com`, `+1 (555) 019-2834`, London/NYC sample address placeholders. | Official company registration address, support email, and primary telephone number. | Needs Client Input |
| **CIR-07** | Social Profile URLs | Footer, Contact Page | `#` placeholders with honest hover label. | Official LinkedIn, X, Instagram, YouTube handle URLs. | Needs Client Input |
| **CIR-08** | Contact Form Email Service Backend | Contact Form (`/api/contact`) | Configurable Provider Adapter (currently in dev test mode with mock confirmation + console logger). | Resend / SendGrid / Postmark API key or SMTP credentials & recipient email address. | Dev Adapter Ready |
| **CIR-09** | Newsletter Integration | Footer Newsletter Form | Honest "Newsletter integration pending platform setup" notice on submission. | Email platform choice (Mailchimp, Klaviyo, ConvertKit, etc.) and API key. | Architecture Prepared |
| **CIR-10** | Service Count (4 vs 6) | Services Overview & Homepage Preview | 4 confirmed services live (`SEO`, `Meta Ads`, `Social Media`, `Web Dev`). 2 extra slots hidden behind `enableExtraServices: false`. | Confirmation whether Lead Edge wants 4 or 6 core services (and titles of services 5 & 6 if so). | Decision Pending |
| **CIR-11** | Currency & Budget Ranges | Contact Form budget dropdown | Standard ranges in GBP/USD ($5,000–$10,000, etc.) | Preferred billing currency (£, $, €) and qualified project budget tiers. | Needs Client Input |

## 2. Configuration Control Flag
In `/src/data/site.ts`, all placeholders are governed by:
```typescript
export const clientConfig = {
  showPlaceholders: true, // Set to false for clean production release without dev badges
  experienceClaimApproved: false, // Set to true once CIR-02 is confirmed
  statsVerified: false, // Set to true once CIR-03 numbers are provided
  enableExtraServices: false, // Set to true if 6 services are confirmed
};
```
