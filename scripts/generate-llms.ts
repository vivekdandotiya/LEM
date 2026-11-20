import fs from 'node:fs';
import path from 'node:path';
import { getBaseUrl } from '../src/data/routes';

export function generateLlmsText(): { summary: string; full: string } {
  const baseUrl = getBaseUrl();

  const summary = `# Lead Edge Marketers
> Lead Edge Marketers is a premier digital growth studio delivering strategic SEO, PPC advertising, social media marketing, high-speed web development, and video & photography production. We focus on measurable revenue growth and business momentum rather than vanity metrics.

## Core Growth Disciplines
- [Search Engine Optimization (SEO)](${baseUrl}/services/seo): Dominate search rankings and capture high-intent organic traffic with technical audits, topical entity maps, and organic growth architecture.
- [PPC Services & Paid Search](${baseUrl}/services/ppc): Targeted Meta (Facebook & Instagram) and search advertising engineered to drive instant leads and maximum return on ad spend (ROAS).
- [Social Media Marketing](${baseUrl}/services/social-media): Content and campaign strategy built to build loyal brand communities and generate high-converting engagement across major platforms.
- [Custom Web Development](${baseUrl}/services/web-development): Lightning-fast, high-converting websites engineered to turn clicks into clients with sub-second page performance.
- [Video & Photo Production](${baseUrl}/services/video-photo): High-fidelity commercial creative and visual productions designed to capture attention and elevate brand authority.

## Key Information
- [About Us](${baseUrl}/about): Our background, methodology, and philosophy of integrating organic search, paid media, and engineering.
- [Services Hub](${baseUrl}/services): Overview of our six integrated digital growth disciplines.
- [Case Studies & Insights](${baseUrl}/blog): Technical breakdowns, algorithmic shifts, and performance frameworks.
- [Contact & Consultation](${baseUrl}/contact): Direct consultation with our team. Inbound briefs reviewed within 24 business hours.

## Direct Contact
- Website: ${baseUrl}
- Location: 100 Bishopsgate, London EC2N 4AG
- Business Hours: Monday – Friday: 09:00 – 18:00 GMT

## Full Documentation
- [Comprehensive Overview & Full FAQs](${baseUrl}/llms-full.txt): Complete details including service deliverables, process roadmaps, and full FAQs.
`;

  const full = `# Lead Edge Marketers — Complete Overview

> Lead Edge Marketers is a digital growth studio delivering strategic SEO, PPC advertising, social media marketing, high-speed web development, and video & photo production. We unite organic search, performance media, and custom web architecture to scale business revenue.

## 1. Agency Overview
- **Name:** Lead Edge Marketers
- **Headquarters:** 100 Bishopsgate, London EC2N 4AG
- **Website:** ${baseUrl}
- **Contact:** hello@leadedge.agency | +44 (0) 20 7946 0921
- **Philosophy:** "We Don't Just Rank Websites. We Scale Revenue." We focus on transparent reporting, white-hat techniques, and direct revenue momentum rather than vanity metrics.

---

## 2. Core Disciplines & Deliverables

### Search Engine Optimization (SEO)
- **URL:** ${baseUrl}/services/seo
- **Core Deliverables:**
  - Technical SEO Audits & Bottleneck Resolution
  - On-Page Keyword Optimization & Search Intent Mapping
  - Off-Page SEO & Authority Acquisition
  - Keyword Research & Competitor Analysis
  - SEO Content Strategy
  - Organic Revenue Growth Tracking
- **Process Roadmap:**
  - Phase 1: Uncover technical and competitive search opportunities.
  - Phase 2: Align content architecture with high-intent search queries.
  - Phase 3: Strengthen site crawlability, indexation, and authority foundation.
  - Phase 4: Monitor keyword momentum and continuously optimize for conversions.

### PPC Services & Paid Advertising
- **URL:** ${baseUrl}/services/ppc
- **Core Deliverables:**
  - Meta (Facebook & Instagram) Ad Management
  - Creative Hook Diversity & Angle Testing
  - Algorithmic Audience Modeling & Retargeting
  - Conversion Tracking & Server-Side Tracking (CAPI)
  - Continuous ROAS & Lead Cost Optimization

### Social Media Marketing
- **URL:** ${baseUrl}/services/social-media
- **Core Deliverables:**
  - High-impact editorial content planning and creation
  - Multi-platform community engagement and brand authority
  - Organic and paid social campaign synchronization
  - Audience demographic analysis and messaging alignment

### Custom Web Development
- **URL:** ${baseUrl}/services/web-development
- **Core Deliverables:**
  - High-speed, SEO-first responsive web development
  - Sub-second page speed engineering and Core Web Vitals optimization
  - Conversion-focused UX/UI and mobile-first architecture
  - Clean semantic markup and structured schema data

### Video & Photography Production
- **URL:** ${baseUrl}/services/video-photo
- **Core Deliverables:**
  - High-resolution commercial studio photography
  - 1080p video reels, product demonstrations, and brand films
  - Multi-ratio asset production (16:9, 9:16, 4:5) for cross-channel distribution
  - Color grading and motion editing

---

## 3. Frequently Asked Questions (Verified Client Content)

### General Agency FAQs
1. **What digital marketing services does Lead Edge Marketing offer?**
   We provide a full suite of services including SEO, technical SEO, Google and Meta ads management, social media marketing, local SEO, and web development, all customized to match your business goals.

2. **How do you align strategies with specific business goals?**
   We start by learning about your target audience, industry, and revenue goals, then build a custom digital marketing strategy designed specifically for your brand's growth.

3. **Do you require long-term contracts?**
   No, we believe in earning your partnership every month through real results rather than locking you into rigid, long-term contracts.

4. **How will I receive updates on campaign performance?**
   You will get clear, transparent regular reports and direct updates from our team tracking your traffic growth, rankings, and overall return on investment.

5. **Do you work with businesses of all sizes?**
   Yes, we partner with businesses of all sizes—from local startups to growing e-commerce brands across various industries to scale their online presence.

6. **How quickly can I expect to see results?**
   Paid advertising can drive leads almost immediately, while organic SEO and content strategies typically show noticeable growth and rankings within 3 to 6 months.

7. **What makes Lead Edge Marketers different from other agencies?**
   We focus purely on measurable revenue growth and momentum rather than vanity metrics, offering dedicated support, transparent reporting, and proven white-hat strategies.

### SEO FAQs
1. **What do SEO services include?**
   We provide technical SEO audits, keyword research, on-page optimization, backlink building, and local SEO services. We structure your site to earn high search rankings and drive consistent organic traffic.

2. **How long does SEO take to work?**
   Professional SEO is a long-term campaign that typically delivers noticeable keyword ranking gains and traffic growth within 3 to 6 months. Initial technical site fixes provide early traction, but lasting search engine authority builds over time.

3. **Which SEO metrics do you report on?**
   We track transparent, revenue-driving KPIs including organic keyword rankings, monthly organic traffic growth, domain authority, click-through rates (CTR), conversion rates, and total leads generated. You receive detailed monthly reports demonstrating clear campaign ROI.

4. **What is the difference between an SEO agency and an SEO consultant?**
   An SEO consultant primarily provides strategic advice, site audits, and recommendations for your internal team to execute. Lead Edge Marketers operates as a full-service SEO agency, handling strategy, technical fixes, content creation, and ongoing optimization from start to finish.

---

## 4. Key Links & Index
- Homepage: ${baseUrl}/
- About Page: ${baseUrl}/about
- Services Hub: ${baseUrl}/services
- SEO Discipline: ${baseUrl}/services/seo
- PPC Services: ${baseUrl}/services/ppc
- Social Media: ${baseUrl}/services/social-media
- Web Development: ${baseUrl}/services/web-development
- Video & Photo: ${baseUrl}/services/video-photo
- Perspectives & Insights: ${baseUrl}/blog
- Contact Us: ${baseUrl}/contact
- Sitemap XML: ${baseUrl}/sitemap.xml
`;

  return { summary, full };
}

// When executed directly as script, write public files
if (process.argv[1] && process.argv[1].includes('generate-llms')) {
  const { summary, full } = generateLlmsText();
  const publicDir = path.resolve(process.cwd(), 'public');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), summary, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), full, 'utf-8');
  console.log('Successfully generated public/llms.txt and public/llms-full.txt');
}
