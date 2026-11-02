export interface ProcessPhase {
  id: string;
  number: string;
  monoLabel: string;
  headline: string;
  body: string;
  deliverables: string[];
  badge: string;
}

export interface ServiceProcessData {
  serviceSlug: string;
  eyebrow: string;
  headingPrefix: string;
  headingItalic: string;
  headingSuffix: string;
  phases: ProcessPhase[];
}

export const PROCESS_DATA: Record<string, ServiceProcessData> = {
  seo: {
    serviceSlug: 'seo',
    eyebrow: '03 / HOW WE DELIVER',
    headingPrefix: 'We engineer your',
    headingItalic: 'visibility',
    headingSuffix: 'step by step.',
    phases: [
      {
        id: '01',
        number: '01',
        monoLabel: '01 / AUDIT & DISCOVERY',
        headline: 'We scan the crawl paths others miss.',
        body: 'Full technical crawl of indexing bottlenecks, orphaned URLs, and Core Web Vitals issues before writing a single word of copy.',
        deliverables: ['Crawl Path Map', 'Speed Diagnostics', 'Entity Gap Report'],
        badge: 'Phase 01',
      },
      {
        id: '02',
        number: '02',
        monoLabel: '02 / ARCHITECTURE & SERP',
        headline: 'Search engines reward clear hierarchy.',
        body: 'We build topical entity silos and structured schema markup so search crawlers understand your exact domain authority.',
        deliverables: ['Entity Taxonomy', 'Schema 3.0 Rich Snippets', 'Crawl Silo Specs'],
        badge: 'Phase 02',
      },
      {
        id: '03',
        number: '03',
        monoLabel: '03 / AUTHORITY NETWORK',
        headline: 'Editorial links that move the needle.',
        body: 'Direct outreach to high-trust industry publications and category leaders, building durable organic referral equity.',
        deliverables: ['DR60+ Placements', 'Contextual Mentions', 'Zero-PBN Guarantee'],
        badge: 'Phase 03',
      },
      {
        id: '04',
        number: '04',
        monoLabel: '04 / COMMERCIAL RANKING',
        headline: 'Climbing to the only position that converts.',
        body: 'Continuous SERP testing, click-through optimization, and content refreshes targeting buyers ready to transact.',
        deliverables: ['#1 Position Velocity', 'High-Intent CTR', 'Revenue Attribution'],
        badge: 'Phase 04',
      },
    ],
  },

  'meta-ads': {
    serviceSlug: 'meta-ads',
    eyebrow: '03 / HOW WE DELIVER',
    headingPrefix: 'Ads engineered for',
    headingItalic: 'profitable',
    headingSuffix: 'scale.',
    phases: [
      {
        id: '01',
        number: '01',
        monoLabel: '01 / FUNNEL ARCHITECTURE',
        headline: 'Every touchpoint has a single job.',
        body: 'Segmenting cold discovery, mid-funnel consideration, and high-intent checkout funnels so ad spend never bleeds.',
        deliverables: ['3-Tier Funnel Model', 'Exclusion Rules', 'Pixel + CAPI Setup'],
        badge: 'Phase 01',
      },
      {
        id: '02',
        number: '02',
        monoLabel: '02 / CREATIVE MATRIX',
        headline: 'Rapid hook testing with zero guesswork.',
        body: 'We deploy 3x3 creative variations testing visual hooks, angles, and editorial copy against strict unit metrics.',
        deliverables: ['Hook Variation Matrix', 'Thumb-Stop Analysis', 'Winning Angle Lock'],
        badge: 'Phase 02',
      },
      {
        id: '03',
        number: '03',
        monoLabel: '03 / AUDIENCE MODELING',
        headline: 'Finding your top 15% high-intent buyers.',
        body: 'Server-side CAPI tracking and algorithmic lookalikes zero in on buyers with the highest lifetime purchasing intent.',
        deliverables: ['Algorithmic Clusters', 'LTV Seed Audiences', 'Zero-Overlap Slicing'],
        badge: 'Phase 03',
      },
      {
        id: '04',
        number: '04',
        monoLabel: '04 / EFFICIENCY SCALING',
        headline: 'Pouring budget into verified winners.',
        body: 'Scaling daily budgets profitably on validated creatives while maintaining target CPA thresholds and healthy margins.',
        deliverables: ['Dynamic Budget Scaling', 'Fatigue Prevention', 'Weekly Unit Economics'],
        badge: 'Phase 04',
      },
    ],
  },

  'social-media': {
    serviceSlug: 'social-media',
    eyebrow: '03 / HOW WE DELIVER',
    headingPrefix: 'Content with an authentic',
    headingItalic: 'pulse',
    headingSuffix: 'and rhythm.',
    phases: [
      {
        id: '01',
        number: '01',
        monoLabel: '01 / PILLAR STRATEGY',
        headline: 'Content engineered around distinct pillars.',
        body: 'Eliminating random posting. We structure monthly content into 4 balanced pillars: educate, entertain, convert, and authority.',
        deliverables: ['Pillar Framework', 'Tone Guidelines', 'Audience Archetypes'],
        badge: 'Phase 01',
      },
      {
        id: '02',
        number: '02',
        monoLabel: '02 / EDITORIAL CADENCE',
        headline: 'Consistent publishing without creative fatigue.',
        body: 'Structured 30-day editorial roadmaps scheduled across peak engagement windows, locked and signed off weeks in advance.',
        deliverables: ['30-Day Grid Preview', 'Peak Window Timetable', 'Asset Production Plan'],
        badge: 'Phase 02',
      },
      {
        id: '03',
        number: '03',
        monoLabel: '03 / 9:16 SHORT-FORM STUDIO',
        headline: 'Vertical video that halts the scroll.',
        body: 'Bespoke short-form reels and shorts with kinetic captions, sound design, and retention curves engineered for watch time.',
        deliverables: ['Kinetic Typography', 'Sound Design & Foley', 'Hook Optimization'],
        badge: 'Phase 03',
      },
      {
        id: '04',
        number: '04',
        monoLabel: '04 / COMMUNITY CONVERSION',
        headline: 'Turning passive viewers into booked calls.',
        body: 'Active inbound comment handling, targeted outbound DM workflows, and clear bio funnels driving qualified leads.',
        deliverables: ['Inbound Triage System', 'DM Funnel Scripts', 'Weekly Sentiment Log'],
        badge: 'Phase 04',
      },
    ],
  },

  'web-development': {
    serviceSlug: 'web-development',
    eyebrow: '03 / HOW WE DELIVER',
    headingPrefix: 'High-speed architectures built to',
    headingItalic: 'convert.',
    headingSuffix: '',
    phases: [
      {
        id: '01',
        number: '01',
        monoLabel: '01 / INFORMATION ARCHITECTURE',
        headline: 'User journeys mapped before wireframes.',
        body: 'Structuring site maps, conversion hierarchies, and technical specifications designed to turn visitors into enquiries.',
        deliverables: ['Top-Level Sitemap', 'Conversion Funnel Flow', 'Tech Stack Blueprint'],
        badge: 'Phase 01',
      },
      {
        id: '02',
        number: '02',
        monoLabel: '02 / WIREFRAME TO INTERACTION',
        headline: 'Low-fidelity layouts morph into polish.',
        body: 'Rapid prototyping of fluid component geometries, high-contrast typography, and tactile button states.',
        deliverables: ['Component UI System', 'Tactile States', 'Micro-Interactions'],
        badge: 'Phase 02',
      },
      {
        id: '03',
        number: '03',
        monoLabel: '03 / NEXT.JS ENGINE & CODE',
        headline: 'Clean code tailored for sub-second loads.',
        body: 'Handcrafted TypeScript and Next.js App Router architectures with zero template bloat and fluid responsive viewports.',
        deliverables: ['Next.js 15 App Router', 'Fluid Responsive Geometry', 'Zero JS Hydration Bloat'],
        badge: 'Phase 03',
      },
      {
        id: '04',
        number: '04',
        monoLabel: '04 / PRE-FLIGHT & LAUNCH',
        headline: 'Triple-checked for 100/100 Core Web Vitals.',
        body: 'Rigorous QA across WCAG 2.2 accessibility, edge security, SSL, mobile performance, and automated telemetry.',
        deliverables: ['100/100 Core Vitals', 'WCAG 2.2 Compliance', 'Automated Health Telemetry'],
        badge: 'Phase 04',
      },
    ],
  },
};
