export interface MegamenuGroup {
  category: string;
  items: { label: string; href: string }[];
}

export interface MegamenuTab {
  id: string;
  name: string;
  countBadge?: string;
  description: string;
  footerLink: { label: string; href: string };
  groups: MegamenuGroup[];
}

export const MEGAMENU_TABS: MegamenuTab[] = [
  {
    id: 'seo',
    name: 'Search & SEO',
    countBadge: '24 disciplines',
    description: 'Full-funnel search engine optimization & generative AI search discoverability.',
    footerLink: { label: 'All search & indexation disciplines', href: '/services/seo' },
    groups: [
      {
        category: 'Technical & Crawl',
        items: [
          { label: 'Technical SEO Audits', href: '/services/seo/technical-seo-audits' },
          { label: 'JavaScript & Edge Rendering', href: '/services/seo/javascript-edge-rendering' },
          { label: 'Core Web Vitals & Speed', href: '/services/seo/core-web-vitals-speed' },
          { label: 'Schema Architecture & JSON-LD', href: '/services/seo/schema-architecture-json-ld' },
          { label: 'Indexation Bottleneck Recovery', href: '/services/seo/indexation-bottleneck-recovery' },
        ],
      },
      {
        category: 'Organic Growth',
        items: [
          { label: 'Keyword Taxonomy Mapping', href: '/services/seo/keyword-taxonomy-mapping' },
          { label: 'High-Intent Non-Brand Capture', href: '/services/seo/high-intent-non-brand-capture' },
          { label: 'Programmatic SEO Engines', href: '/services/seo/programmatic-seo-engines' },
          { label: 'Competitive Gap Analysis', href: '/services/seo/competitive-gap-analysis' },
          { label: 'Editorial Authority Pillars', href: '/services/seo/editorial-authority-pillars' },
        ],
      },
      {
        category: 'Local & Maps',
        items: [
          { label: 'Google Business Profile Optimization', href: '/services/seo/google-business-profile-optimization' },
          { label: 'Local 3-Pack Dominance', href: '/services/seo/local-3-pack-dominance' },
          { label: 'Multi-Location Citation Sync', href: '/services/seo/multi-location-citation-sync' },
          { label: 'Review Acquisition Systems', href: '/services/seo/review-acquisition-systems' },
        ],
      },
      {
        category: 'Modern AI Search (GEO)',
        items: [
          { label: 'Generative Engine Optimization (GEO)', href: '/services/seo/generative-engine-optimization-geo' },
          { label: 'Google AI Overviews Indexing', href: '/services/seo/google-ai-overviews-indexing' },
          { label: 'ChatGPT & Perplexity Citations', href: '/services/seo/chatgpt-perplexity-citations' },
          { label: 'Structured LLMs.txt Deployment', href: '/services/seo/structured-llmstxt-deployment' },
        ],
      },
    ],
  },
  {
    id: 'ppc',
    name: 'Performance Ads',
    countBadge: '18 channels',
    description: 'High-ROAS paid media acquisition across search, social, and programmatic display.',
    footerLink: { label: 'All paid media & advertising services', href: '/services/ppc' },
    groups: [
      {
        category: 'Google Advertising',
        items: [
          { label: 'High-Intent Search Campaigns', href: '/services/ppc/high-intent-search-campaigns' },
          { label: 'Performance Max Architecture', href: '/services/ppc/performance-max-architecture' },
          { label: 'Google Shopping & Feed Optimization', href: '/services/ppc/google-shopping-feed-optimization' },
          { label: 'Negative Keyword & Waste Pruning', href: '/services/ppc/negative-keyword-waste-pruning' },
        ],
      },
      {
        category: 'Social Paid Media',
        items: [
          { label: 'Meta Ads (Instagram & Facebook)', href: '/services/ppc/meta-ads-scaling' },
          { label: 'TikTok Direct-Response Scaling', href: '/services/ppc/tiktok-direct-response-scaling' },
          { label: 'LinkedIn B2B Account Targeting', href: '/services/ppc/linkedin-b2b-account-targeting' },
          { label: 'YouTube In-Stream Pre-Roll', href: '/services/ppc/youtube-in-stream-pre-roll' },
        ],
      },
      {
        category: 'Retargeting & Funnels',
        items: [
          { label: 'Dynamic Catalog Remarketing', href: '/services/ppc/dynamic-catalog-remarketing' },
          { label: 'Cart Abandonment Ad Sequencing', href: '/services/ppc/cart-abandonment-ad-sequencing' },
          { label: 'Cross-Platform Omnichannel Retargeting', href: '/services/ppc/cross-platform-omnichannel-retargeting' },
        ],
      },
      {
        category: 'Creative Testing & CRO',
        items: [
          { label: 'Rapid Creative Hook Testing', href: '/services/ppc/rapid-creative-hook-testing' },
          { label: 'Iterative UGC Ad Variations', href: '/services/ppc/iterative-ugc-ad-variations' },
          { label: 'Landing Page Conversion Rate Optimization', href: '/services/ppc/landing-page-conversion-rate-optimization' },
          { label: 'First-Party Server-Side Attribution', href: '/services/ppc/first-party-server-side-attribution' },
        ],
      },
    ],
  },
  {
    id: 'web',
    name: 'Web Architecture',
    countBadge: '16 technical solutions',
    description: 'High-speed, conversion-engineered digital storefronts and web experiences.',
    footerLink: { label: 'All web architecture & development solutions', href: '/services/web-development' },
    groups: [
      {
        category: 'Modern Storefronts',
        items: [
          { label: 'Next.js 15 & React 19 Applications', href: '/services/web-development/nextjs-react-applications' },
          { label: 'Headless Commerce Architecture', href: '/services/web-development/headless-commerce-architecture' },
          { label: 'Shopify Plus Custom Storefronts', href: '/services/web-development/shopify-plus-custom-storefronts' },
          { label: 'Custom Web Application Portals', href: '/services/web-development/custom-web-application-portals' },
        ],
      },
      {
        category: 'Speed & Edge Infrastructure',
        items: [
          { label: 'Sub-Second Global Edge Caching', href: '/services/web-development/sub-second-global-edge-caching' },
          { label: 'Core Web Vitals 100 Engineering', href: '/services/web-development/core-web-vitals-100-engineering' },
          { label: 'Zero Layout Shift (CLS) Optimization', href: '/services/web-development/zero-layout-shift-cls-optimization' },
          { label: 'Asset Pipeline & Image CDN Delivery', href: '/services/web-development/asset-pipeline-image-cdn-delivery' },
        ],
      },
      {
        category: 'Conversion Mechanics',
        items: [
          { label: 'Multi-Step Lead Funnels & Quote Calculators', href: '/services/web-development/multi-step-lead-funnels-quote-calculators' },
          { label: 'CRM & Webhook Pipeline Integrations', href: '/services/web-development/crm-webhook-pipeline-integrations' },
          { label: 'Custom Booking & Scheduling Engines', href: '/services/web-development/custom-booking-scheduling-engines' },
          { label: 'Client Portal & Account Dashboards', href: '/services/web-development/client-portal-account-dashboards' },
        ],
      },
      {
        category: 'Compliance & Accessibility',
        items: [
          { label: 'WCAG 2.2 AA Contrast Compliance', href: '/services/web-development/wcag-22-aa-contrast-compliance' },
          { label: 'Bank-Grade SSL & Security Hardening', href: '/services/web-development/bank-grade-ssl-security-hardening' },
          { label: 'Privacy Act & Cookie Consent Systems', href: '/services/web-development/privacy-act-cookie-consent-systems' },
        ],
      },
    ],
  },
  {
    id: 'social',
    name: 'Social & Creative',
    countBadge: '14 creative formats',
    description: 'Cinematic video, commercial photography, and editorial social branding.',
    footerLink: { label: 'All creative & production services', href: '/services/video-photo' },
    groups: [
      {
        category: 'Video Production',
        items: [
          { label: 'Short-Form Video (Reels & TikTok)', href: '/services/video-photo/short-form-video-reels-tiktok' },
          { label: 'Cinematic Brand Commercial Spots', href: '/services/video-photo/editorial-video-production' },
          { label: 'Founder-Led Thought Leadership Video', href: '/services/video-photo/founder-led-thought-leadership-video' },
        ],
      },
      {
        category: 'Commercial Photography',
        items: [
          { label: 'High-End Commercial Product Photography', href: '/services/video-photo/high-end-commercial-product-photography' },
          { label: 'Architectural & Interior Space Photography', href: '/services/video-photo/architectural-interior-space-photography' },
          { label: 'Executive & Team Portrait Photography', href: '/services/video-photo/executive-team-portrait-photography' },
        ],
      },
      {
        category: 'Social Channels',
        items: [
          { label: 'Organic Instagram Community Growth', href: '/services/social-media/organic-instagram-community-growth' },
          { label: 'LinkedIn B2B Thought Leadership Publishing', href: '/services/social-media/linkedin-b2b-thought-leadership-publishing' },
        ],
      },
      {
        category: 'Creative Strategy',
        items: [
          { label: 'Editorial Brand Voice & Narrative Guidelines', href: '/services/social-media/editorial-brand-voice-narrative-guidelines' },
          { label: 'Active Community Management & Inbox Nurturing', href: '/services/social-media/active-community-management-inbox-nurturing' },
        ],
      },
    ],
  },
  {
    id: 'industries',
    name: 'Client Industries',
    countBadge: '71 verified sectors',
    description: 'Tailored websites and full-funnel marketing built for specific Australian industries.',
    footerLink: { label: 'View all 71 small business industries', href: '/services/seo' },
    groups: [
      {
        category: 'Health & Care (23)',
        items: [
          { label: 'Dental & Orthodontic Practices', href: '/services/seo/dental-orthodontic-practices' },
          { label: 'Physiotherapy & Sports Injury Clinics', href: '/services/seo/physiotherapy-sports-injury-clinics' },
          { label: 'Allied Health, Psychology & NDIS Providers', href: '/services/seo/allied-health-psychology-ndis-providers' },
          { label: 'Veterinary Hospitals & Animal Clinics', href: '/services/seo/veterinary-hospitals-animal-clinics' },
        ],
      },
      {
        category: 'Professional Services (21)',
        items: [
          { label: 'Commercial & Corporate Law Firms', href: '/services/ppc/commercial-corporate-law-firms' },
          { label: 'Accounting, CPA & Wealth Management', href: '/services/ppc/accounting-cpa-wealth-management' },
          { label: 'Real Estate Agencies & Property Advisory', href: '/services/ppc/real-estate-agencies-property-advisory' },
          { label: 'Enterprise B2B & SaaS Technologies', href: '/services/ppc/enterprise-b2b-saas-technologies' },
        ],
      },
      {
        category: 'Trades & Construction (15)',
        items: [
          { label: 'Custom Home Builders & Renovators', href: '/services/web-development/custom-home-builders-renovators' },
          { label: 'Commercial Electrical & Plumbing Contractors', href: '/services/web-development/commercial-electrical-plumbing-contractors' },
          { label: 'Luxury DTC & E-Commerce Brands', href: '/services/web-development/luxury-dtc-e-commerce-brands' },
        ],
      },
      {
        category: 'Education & Learning (12)',
        items: [
          { label: 'Early Learning & Childcare Centres', href: '/services/social-media/early-learning-childcare-centres' },
          { label: 'Private Tutoring & Selective Colleges', href: '/services/social-media/private-tutoring-selective-colleges' },
          { label: 'Dance, Martial Arts & Performance Academies', href: '/services/social-media/dance-martial-arts-performance-academies' },
        ],
      },
    ],
  },
];
