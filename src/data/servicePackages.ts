export interface DeliverablePillar {
  title: string;
  badge?: string;
  items: string[];
}

export interface ServiceTierPackage {
  id: string;
  name: string;
  scopeTag: string;
  description: string;
  isPopular?: boolean;
  pillars: DeliverablePillar[];
}

export interface ServicePackagesData {
  serviceSlug: string;
  sectionSubtitle: string;
  tier1: ServiceTierPackage;
  tier2: ServiceTierPackage;
}

export const SERVICE_PACKAGES_DATA: Record<string, ServicePackagesData> = {
  'social-media': {
    serviceSlug: 'social-media',
    sectionSubtitle: 'Concrete channel-by-channel execution engineered to build active brand gravity across major networks.',
    tier1: {
      id: 'social-basic',
      name: 'Growth Foundation',
      scopeTag: 'Channels: Any 2 Selected Networks',
      description: 'Ideal for emerging brands looking to establish an authoritative organic presence on their two highest-leverage channels.',
      isPopular: false,
      pillars: [
        {
          title: 'Instagram',
          badge: 'VISUAL BRAND',
          items: [
            'Complete Profile & Bio Optimization',
            '12 High-Impact Visual & Carousel Posts / Mo',
            'Story Strategy & Audience Engagement',
            'Curated Hashtag & Trend Research',
            'Inbound Comment & DM Management',
          ],
        },
        {
          title: 'LinkedIn',
          badge: 'B2B AUTHORITY',
          items: [
            'Executive & Company Page Architecture',
            '12 Thought-Leadership Posts / Mo',
            'Targeted B2B Connection Networking',
            'Company Page Updates & Curation',
            'Relevant Industry Group Integration',
          ],
        },
        {
          title: 'Facebook / Meta',
          badge: 'COMMUNITY',
          items: [
            'Page Setup & Cover Asset Creation (1)',
            '12 Timeline Status & Creative Posts / Mo',
            'Community Moderation & Review Monitoring',
            'Follower Growth Targeting (Up to 500+ / Mo)',
            'Strategic Organic Reach Amplification',
          ],
        },
        {
          title: 'Twitter / X',
          badge: 'CONVERSATION',
          items: [
            'Handle Branding & Profile Restructure',
            '12 Strategic Tweets & Thread Releases / Mo',
            '2 Curated Industry Retweets / Week',
            'Audience Growth & Follower Optimization',
            '#Hashtag & Real-Time Trend Research',
          ],
        },
      ],
    },
    tier2: {
      id: 'social-advanced',
      name: 'Market Dominance',
      scopeTag: 'Channels: All 4 Networks Unified',
      description: 'Full-spectrum omnichannel dominance deploying high-retention video reels, active community conquesting, and weekly thought leadership.',
      isPopular: true,
      pillars: [
        {
          title: 'Instagram',
          badge: 'MAX ENGAGEMENT',
          items: [
            'Everything in Growth Foundation',
            '16 High-Impact Carousel & Image Posts / Mo',
            '4 Monthly Cinematic Short-Form Reels / Videos',
            'Story Highlights Architecture & Custom Icons',
            'Competitor Audience Conquesting & Influencer Tagging',
          ],
        },
        {
          title: 'LinkedIn',
          badge: 'EXECUTIVE GRAVITY',
          items: [
            'Everything in Growth Foundation',
            '16 Executive Thought-Leadership Posts / Mo',
            'Competitor Post Engagement & B2B Lead Mining',
            '1 Monthly Video Interview / Explainer Post',
            'Strategic C-Suite Network Outreach & Inbound Funnels',
          ],
        },
        {
          title: 'Facebook / Meta',
          badge: 'SCALE REACH',
          items: [
            'Everything in Growth Foundation',
            '16 Timeline Creative Status Posts / Mo',
            'Cover Image Variations (2 Seasonal Sets)',
            '1 Monthly High-Production Video / Reel',
            'Active Group Moderation & Conversion Capture',
          ],
        },
        {
          title: 'Twitter / X',
          badge: 'VIRAL VELOCITY',
          items: [
            'Everything in Growth Foundation',
            '16 High-Value Tweets & In-Depth Threads / Mo',
            '3 Daily Retweets & Industry Quote Replies',
            'Trending Topic Hijacking & PR Tracking',
            '1 Monthly Video / Media Tweet Production',
          ],
        },
      ],
    },
  },

  'seo': {
    serviceSlug: 'seo',
    sectionSubtitle: 'Systematic crawl architecture, semantic entity graphs, and editorial link equity engineered to compound organic revenue.',
    tier1: {
      id: 'seo-foundation',
      name: 'Foundation SEO',
      scopeTag: 'Scope: Core Crawl Health & High-Intent Ranks',
      description: 'Eliminates technical crawl bottlenecks and captures primary commercial queries that drive qualified inbound leads.',
      isPopular: false,
      pillars: [
        {
          title: 'Technical Crawl SEO',
          badge: 'CORE VITALS',
          items: [
            'Full Server Response & Crawl Budget Audit',
            'Core Web Vitals & Sub-Second LCP Fixes',
            'Robots.txt, Canonical & XML Sitemap Overhaul',
            'Schema.org JSON-LD Structured Data Setup',
            '404 & Redirect Chain Elimination',
          ],
        },
        {
          title: 'On-Page Optimization',
          badge: 'SEMANTIC CODE',
          items: [
            'Title Tags, Meta Descriptions & H1-H3 Hierarchy',
            'Internal Linking Anchor Text Distribution',
            'Image Compression & WebP Next-Gen Format Setup',
            'Top 20 High-Intent Revenue Pages Optimized',
            'Search Intent & Keyword Cannibalization Cleanup',
          ],
        },
        {
          title: 'Keyword & Content Strategy',
          badge: 'TOPICAL MAP',
          items: [
            'In-Depth Competitor Keyword Gap Analysis',
            'Commercial & Transactional Intent Clustering',
            '4 Long-Form 1,500+ Word Editorial Articles / Mo',
            'Featured Snippet & FAQ Schema Optimization',
            'Content Refresh on Decaying Legacy Pages',
          ],
        },
        {
          title: 'Authority & Analytics',
          badge: 'TRANSPARENCY',
          items: [
            '5 High-DA Editorial Authority Placements / Mo',
            'Google Search Console & GA4 Attribution Setup',
            'Weekly Organic Keyword Tracking Dashboard',
            'Toxic Backlink Disavowal & Link Audit',
            'Monthly Revenue Contribution Reporting',
          ],
        },
      ],
    },
    tier2: {
      id: 'seo-enterprise',
      name: 'Topical Dominance',
      scopeTag: 'Scope: Full Semantic Map & Digital PR',
      description: 'Aggressive domain dominance capturing enterprise-tier head terms, high-impact digital PR, and programmatic scale.',
      isPopular: true,
      pillars: [
        {
          title: 'Technical Crawl SEO',
          badge: 'ENTERPRISE TECH',
          items: [
            'Everything in Foundation SEO',
            'JavaScript Hydration & Dynamic Rendering Audits',
            'Multi-Region & International Hreflang Configuration',
            'Automated 24/7 Crawl Anomaly Monitoring',
            'Sub-second Edge Caching & Asset Optimization',
          ],
        },
        {
          title: 'On-Page Optimization',
          badge: 'MAX CONVERSION',
          items: [
            'Everything in Foundation SEO',
            'Full Domain On-Page Overhaul (up to 60 pages)',
            'Programmatic Landing Page Template Architecture',
            'Conversion Rate Optimization (CRO) on Landing Pages',
            'Dynamic User Intent Internal Link Routing',
          ],
        },
        {
          title: 'Keyword & Content Strategy',
          badge: 'AUTHORITY SCALE',
          items: [
            'Everything in Foundation SEO',
            '8 In-Depth 2,500+ Word Authoritative Deep Dives / Mo',
            'AI Search Overview (GEO) & Voice Search Optimization',
            'Topical Knowledge Graph & Wikidata Entity Building',
            'Original Data Study & Whitepaper Content Creation',
          ],
        },
        {
          title: 'Authority & Analytics',
          badge: 'DIGITAL PR',
          items: [
            'Everything in Foundation SEO',
            '12 Tier-1 High-Impact Digital PR Backlinks / Mo',
            'Competitor Link Profile Conquesting & Replicating',
            'Custom Real-Time Looker Studio Revenue Dashboard',
            'Bi-Weekly Strategic Growth Director Consultation',
          ],
        },
      ],
    },
  },

  'ppc': {
    serviceSlug: 'ppc',
    sectionSubtitle: 'Algorithmic media buying across Meta and Google engineered to maximize blended ROAS and lower customer acquisition costs.',
    tier1: {
      id: 'ppc-foundation',
      name: 'Target Acquisition',
      scopeTag: 'Platform: Meta Ads or Google Search Core',
      description: 'Precision campaign launch targeting high-intent buyers, eliminating ad budget waste, and proving return on ad spend.',
      isPopular: false,
      pillars: [
        {
          title: 'Account Architecture',
          badge: 'TRACKING',
          items: [
            'Ad Account Audit & Budget Leak Prevention',
            'Meta Conversions API (CAPI) & Server-Side Setup',
            'Google Ads Enhanced Conversions Integration',
            'Custom Audience Seeding & Lookalike Modeling',
            'Exclusion Lists & Negative Keyword Sculpting',
          ],
        },
        {
          title: 'Creative Production',
          badge: 'DIRECT RESPONSE',
          items: [
            '6 High-Conversion Static & Motion Ad Creatives / Mo',
            '3 Distinct Direct-Response Copy Hook Angles',
            'Custom Headline & CTA Variant Split Testing',
            'Dynamic Product Feed Integration & Catalog Ads',
            'Brand Asset Harmonization across Formats',
          ],
        },
        {
          title: 'A/B Testing & Bidding',
          badge: 'ALGORITHMIC',
          items: [
            'Advantage+ vs Manual Bidding Structure Tests',
            'Target CPA & Target ROAS Bid Ceiling Calibration',
            'Dayparting & Regional Audience Clustering',
            'Weekly Creative Fatigue Monitoring & Rotation',
            'Rapid Winner Scaling Framework',
          ],
        },
        {
          title: 'Attribution & Governance',
          badge: 'CANDID DATA',
          items: [
            'Live Blended ROAS & Contribution Margin Board',
            'Cost-Per-Acquisition (CPA) Efficiency Tracking',
            'First-Party Click Attribution Diagnostics',
            'Monthly Spend & Scale Roadmap',
            'Dedicated Account Strategist Communication Channel',
          ],
        },
      ],
    },
    tier2: {
      id: 'ppc-scale',
      name: 'Omnichannel Scale',
      scopeTag: 'Platforms: Meta + Google Search & Shopping',
      description: 'Multi-platform acquisition engine combining high-velocity video hooks, search intent capture, and deep retargeting.',
      isPopular: true,
      pillars: [
        {
          title: 'Account Architecture',
          badge: 'MULTI-FUNNEL',
          items: [
            'Everything in Target Acquisition',
            'Full Cross-Channel Attribution Pipeline (Meta + Google + YouTube)',
            'High-Intent Non-Brand Google Search Domination',
            'Advanced Multi-Tier Retargeting & LTV Upsell Funnels',
            'Dedicated Ad Account Whitelisting & Scaling Budgets',
          ],
        },
        {
          title: 'Creative Production',
          badge: 'HIGH-VOLUME UGC',
          items: [
            'Everything in Target Acquisition',
            '14 High-Impact Creative Assets / Mo (Static & Motion)',
            '4 High-Retention UGC / Video Ad Hook Concepts',
            'Custom Landing Page A/B Testing & Offer Framing',
            'Seasonal & Promotional Flash Campaign Creation',
          ],
        },
        {
          title: 'A/B Testing & Bidding',
          badge: 'PORTFOLIO BIDDING',
          items: [
            'Everything in Target Acquisition',
            'Smart Bidding Multi-Variable Testing Matrix',
            'Competitor Search Term Conquesting & Domination',
            'Automated Rule-Based Budget Redistribution',
            'Dynamic Creative Optimization (DCO) at Scale',
          ],
        },
        {
          title: 'Attribution & Governance',
          badge: 'EXECUTIVE PROOF',
          items: [
            'Everything in Target Acquisition',
            'First-Party Triple-Attribution Cohort Reporting',
            'Incrementality Testing & Real Cash Contribution Proof',
            'Weekly Creative Strategy & Campaign Iteration Calls',
            'Priority Direct Slack Channel with Senior Media Directors',
          ],
        },
      ],
    },
  },

  'web-development': {
    serviceSlug: 'web-development',
    sectionSubtitle: 'Sub-second speed architectures engineered on Next.js 15 to turn cold traffic into high-converting clients.',
    tier1: {
      id: 'web-growth',
      name: 'Growth Web Engine',
      scopeTag: 'Architecture: Custom Next.js 15 & Headless CMS',
      description: 'Replaces bloated, slow agency templates with a lightning-fast custom web presence built for conversion and SEO dominance.',
      isPopular: false,
      pillars: [
        {
          title: 'Architecture & Speed',
          badge: 'SUB-SECOND',
          items: [
            'Custom Next.js 15 Server-Side Rendered (SSR) Build',
            '100/100 Core Web Vitals & Sub-Second LCP Performance',
            'Clean Tailwind CSS 3 Design System (Zero Bloat)',
            'Semantic HTML5 & Accessible Component Structure',
            'Headless CMS Integration (Sanity / Strapi / Payload)',
          ],
        },
        {
          title: 'UI/UX & Mobile Flow',
          badge: 'CONVERSION UX',
          items: [
            'Mobile-First Responsive Interface across All Breakpoints',
            'High-Converting Hero & Strategic Section Hierarchy',
            'Custom Interactive Forms with Real-Time Validation',
            'Micro-Interactions & Smooth Editorial Transitions',
            'Custom Branded Typography & Palette Integration',
          ],
        },
        {
          title: 'SEO & Tracking Prep',
          badge: 'SEARCH READY',
          items: [
            'Automated XML Sitemap, Robots.txt & Dynamic Metadata',
            'Schema.org JSON-LD Rich Snippet Integration',
            'Automated Next/Image WebP/AVIF Compression Pipeline',
            'Google Tag Manager, GA4 & Meta CAPI Event Webhooks',
            'OpenGraph & Twitter Card Social Preview Generation',
          ],
        },
        {
          title: 'Deployment & SLA',
          badge: 'EDGE HOSTED',
          items: [
            'Global Edge CDN Deployment (Vercel / Cloudflare)',
            'Automated SSL, DDoS Shielding & Security Headers',
            'Automated Git Version Control & Deployment Pipeline',
            'Cross-Browser & Multi-Device Testing Matrix',
            '30-Day Post-Launch Warranty & Performance Guarantee',
          ],
        },
      ],
    },
    tier2: {
      id: 'web-enterprise',
      name: 'Enterprise Commerce',
      scopeTag: 'Architecture: Headless Shopify / Full Web App',
      description: 'Full-scale digital flagship with custom checkout funnels, dynamic inventory sync, and complex API integrations.',
      isPopular: true,
      pillars: [
        {
          title: 'Architecture & Speed',
          badge: 'HEADLESS COMMERCE',
          items: [
            'Everything in Growth Web Engine',
            'Headless Shopify Plus / Custom Commerce Engine',
            'Complex Database & Dynamic Server Actions Architecture',
            'Multi-Currency & International Region Routing',
            'Real-Time Inventory, CRM & ERP Webhook Integration',
          ],
        },
        {
          title: 'UI/UX & Mobile Flow',
          badge: 'IMMERSIVE UX',
          items: [
            'Everything in Growth Web Engine',
            'Frictionless 1-Click Checkout & Dynamic Slide-Out Cart',
            'Advanced Product Filtering & Instant Search (<50ms)',
            'Custom WebGL / 3D Product Mockup Visuals',
            'Personalized Customer Account Portals & Subscriptions',
          ],
        },
        {
          title: 'SEO & Tracking Prep',
          badge: 'PROGRAMMATIC SEO',
          items: [
            'Everything in Growth Web Engine',
            'Programmatic Landing Page Engine for 500+ Category Pages',
            'Advanced Heatmap Tracking & Conversion Funnel Analytics',
            'A/B Testing Framework Integration (PostHog / Statsig)',
            'Dynamic Personalization Based on Traffic Source',
          ],
        },
        {
          title: 'Deployment & SLA',
          badge: 'ENTERPRISE SLA',
          items: [
            'Everything in Growth Web Engine',
            'Enterprise 99.99% Uptime SLA & Redundant Edge Hosting',
            'Dedicated Staging & Feature Preview Environments',
            'Automated Daily Database Backups & Rollback Systems',
            '90-Day Post-Launch Hyper-Care with Direct Lead Engineer Access',
          ],
        },
      ],
    },
  },

  'video-photo': {
    serviceSlug: 'video-photo',
    sectionSubtitle: 'Studio-grade video production and commercial photography engineered to captivate audiences and elevate brand authority.',
    tier1: {
      id: 'video-retainer',
      name: 'Studio Content Retainer',
      scopeTag: 'Deliverables: Monthly Short-Form Video & Product Stills',
      description: 'Consistent monthly creative engine delivering high-retention vertical reels and editorial product stills for organic and paid channels.',
      isPopular: false,
      pillars: [
        {
          title: 'Short-Form Video',
          badge: 'VERTICAL 9:16',
          items: [
            '8 High-Retention Vertical Videos / Mo (Reels/TikTok/Shorts)',
            'Dynamic Captions, Typography & Sound Design',
            '3-Second Hook Angle Variations per Concept',
            'Cinematic Color Grading & 4K 60FPS Master Exports',
            'Platform Aspect Ratio Exports (9:16, 4:5, 1:1)',
          ],
        },
        {
          title: 'Commercial Photography',
          badge: 'STUDIO STILLS',
          items: [
            '15 Studio-Grade Product / Service Images / Mo',
            'Professional Color Correction & Background Retouching',
            'Contextual & Lifestyle Flat-Lay Staging',
            'Web-Optimized WebP Masters & Print-Ready TIFFs',
            'Clean Lighting Direction Matching Brand Guidelines',
          ],
        },
        {
          title: 'Concept & Scripting',
          badge: 'STORYBOARD',
          items: [
            'Monthly Creative Brief & Concept Storyboarding',
            'Hook Writing & Direct-Response Scripting',
            'Licensed Commercial Royalty-Free Music Tracks',
            'Trending Audio Discovery & Format Adaptation',
            'Competitor Visual Ad Benchmarking',
          ],
        },
        {
          title: 'Turnaround & Rights',
          badge: 'FAST DELIVERY',
          items: [
            'Secure Cloud Asset Portal with Versioning',
            'Standard 48-72 Hour Delivery on Standard Edits',
            '2 Rounds of Strategic Revisions Included per Asset',
            'Full Digital Commercial Usage Rights Included',
            'Dedicated Creative Producer Coordination',
          ],
        },
      ],
    },
    tier2: {
      id: 'video-cinematic',
      name: 'Cinematic Production',
      scopeTag: 'Deliverables: Commercial Campaigns & Full Studio Shoot',
      description: 'Flagship commercial production delivering narrative brand stories, full-scale studio shoots, and high-volume paid media creative.',
      isPopular: true,
      pillars: [
        {
          title: 'Short-Form Video',
          badge: 'HIGH-VOLUME VIDEO',
          items: [
            'Everything in Studio Content Retainer',
            '16 High-Retention Vertical Videos / Mo',
            '2 Full Commercial Brand Anthem Videos (60-90s Master)',
            'Custom 3D Motion Graphics, Logo Reveals & Kinetic Titles',
            'Multi-Platform Cutdowns (16:9, 9:16, 1:1, 4:5)',
          ],
        },
        {
          title: 'Commercial Photography',
          badge: 'CAMPAIGN STILLS',
          items: [
            'Everything in Studio Content Retainer',
            '30 High-End Commercial Campaign Stills / Mo',
            'Multi-Angle Macro & Complex Studio Lighting Sets',
            'On-Location Environmental & Executive Portrait Staging',
            'High-End Fashion/Beauty & Product Frequency Retouching',
          ],
        },
        {
          title: 'Concept & Scripting',
          badge: 'NARRATIVE DIRECTION',
          items: [
            'Everything in Studio Content Retainer',
            'End-to-End Cinematic Scriptwriting & Scene Boarding',
            'Professional Voiceover Casting & Audio Mastering',
            'Soundtrack Composition & Bespoke SFX Mixing',
            'Omnichannel Creative Strategy Sync with Media Buyers',
          ],
        },
        {
          title: 'Turnaround & Rights',
          badge: 'WHITE-GLOVE',
          items: [
            'Everything in Studio Content Retainer',
            'Priority 24-48 Hour Rush Turnaround Available',
            'Unlimited Revisions Until 100% Campaign Sign-Off',
            'Raw Camera Footage & Project Files Transferred',
            'Unrestricted Global Commercial & Broadcast Rights',
          ],
        },
      ],
    },
  },
};
