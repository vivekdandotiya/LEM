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
          { label: 'Technical SEO Audits', href: '/services/seo' },
          { label: 'JavaScript & Edge Rendering', href: '/services/seo' },
          { label: 'Core Web Vitals & Speed', href: '/services/seo' },
          { label: 'Schema Architecture & JSON-LD', href: '/services/seo' },
          { label: 'Indexation Bottleneck Recovery', href: '/services/seo' },
        ],
      },
      {
        category: 'Organic Growth',
        items: [
          { label: 'Keyword Taxonomy Mapping', href: '/services/seo' },
          { label: 'High-Intent Non-Brand Capture', href: '/services/seo' },
          { label: 'Programmatic SEO Engines', href: '/services/seo' },
          { label: 'Competitive Gap Analysis', href: '/services/seo' },
          { label: 'Editorial Authority Pillars', href: '/services/seo' },
        ],
      },
      {
        category: 'Local & Maps',
        items: [
          { label: 'Google Business Profile Optimization', href: '/services/seo' },
          { label: 'Local 3-Pack Dominance', href: '/services/seo' },
          { label: 'Multi-Location Citation Sync', href: '/services/seo' },
          { label: 'Review Acquisition Systems', href: '/services/seo' },
        ],
      },
      {
        category: 'Modern AI Search (GEO)',
        items: [
          { label: 'Generative Engine Optimization (GEO)', href: '/services/seo' },
          { label: 'Google AI Overviews Indexing', href: '/services/seo' },
          { label: 'ChatGPT & Perplexity Citations', href: '/services/seo' },
          { label: 'Structured LLMs.txt Deployment', href: '/services/seo' },
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
          { label: 'High-Intent Search Campaigns', href: '/services/ppc' },
          { label: 'Performance Max Architecture', href: '/services/ppc' },
          { label: 'Google Shopping & Feed Optimization', href: '/services/ppc' },
          { label: 'Negative Keyword & Waste Pruning', href: '/services/ppc' },
        ],
      },
      {
        category: 'Social Paid Media',
        items: [
          { label: 'Meta Ads (Instagram & Facebook)', href: '/services/ppc' },
          { label: 'TikTok Direct-Response Scaling', href: '/services/ppc' },
          { label: 'LinkedIn B2B Account Targeting', href: '/services/ppc' },
          { label: 'YouTube In-Stream Pre-Roll', href: '/services/ppc' },
        ],
      },
      {
        category: 'Retargeting & Funnels',
        items: [
          { label: 'Dynamic Catalog Remarketing', href: '/services/ppc' },
          { label: 'Cart Abandonment Ad Sequencing', href: '/services/ppc' },
          { label: 'Cross-Platform Omnichannel Retargeting', href: '/services/ppc' },
        ],
      },
      {
        category: 'Creative Testing & CRO',
        items: [
          { label: 'Rapid Creative Hook Testing', href: '/services/ppc' },
          { label: 'Iterative UGC Ad Variations', href: '/services/ppc' },
          { label: 'Landing Page Conversion Rate Optimization', href: '/services/ppc' },
          { label: 'First-Party Server-Side Attribution', href: '/services/ppc' },
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
          { label: 'Next.js 15 & React 19 Applications', href: '/services/web-development' },
          { label: 'Headless Commerce Architecture', href: '/services/web-development' },
          { label: 'Shopify Plus Custom Storefronts', href: '/services/web-development' },
          { label: 'Custom Web Application Portals', href: '/services/web-development' },
        ],
      },
      {
        category: 'Speed & UX',
        items: [
          { label: 'Sub-0.4s Ultra-Fast Load Speeds', href: '/services/web-development' },
          { label: 'Global Edge Network Deployment', href: '/services/web-development' },
          { label: 'Zero Cumulative Layout Shift (CLS)', href: '/services/web-development' },
          { label: 'Mobile-First Touch Architecture', href: '/services/web-development' },
        ],
      },
      {
        category: 'Conversion Design',
        items: [
          { label: 'High-Converting Homepage Rebuilds', href: '/services/web-development' },
          { label: 'Frictionless One-Page Checkout', href: '/services/web-development' },
          { label: 'Form Completion & Lead Flow Audits', href: '/services/web-development' },
          { label: 'Data-Backed A/B Testing Frameworks', href: '/services/web-development' },
        ],
      },
      {
        category: 'Integrations & Systems',
        items: [
          { label: 'Custom Headless CMS Integrations', href: '/services/web-development' },
          { label: 'Enterprise API Integrations', href: '/services/web-development' },
          { label: 'HubSpot & CRM Synchronization', href: '/services/web-development' },
          { label: 'Automated Real-Time Webhooks', href: '/services/web-development' },
        ],
      },
    ],
  },
  {
    id: 'creative',
    name: 'Social & Creative',
    countBadge: '14 creative formats',
    description: 'Short-form cinematic video, editorial organic social, and high-impact visual creative.',
    footerLink: { label: 'All creative & social media offerings', href: '/services/social-media' },
    groups: [
      {
        category: 'Short-Form Video',
        items: [
          { label: '9:16 Vertical Video Reels Production', href: '/services/video-photo' },
          { label: 'TikTok Direct-to-Consumer Creative', href: '/services/video-photo' },
          { label: 'Founder & Executive Video Interviews', href: '/services/video-photo' },
          { label: 'Motion Graphics & Kinetic Typography', href: '/services/video-photo' },
        ],
      },
      {
        category: 'Organic Social Media',
        items: [
          { label: 'Full-Service Social Media Strategy', href: '/services/social-media' },
          { label: 'Editorial Brand Voice Calendars', href: '/services/social-media' },
          { label: 'Community Management & Moderation', href: '/services/social-media' },
          { label: 'Brand Gravity & Social Equity', href: '/services/social-media' },
        ],
      },
      {
        category: 'Brand Visual Assets',
        items: [
          { label: 'High-Performance Ad Creative Suites', href: '/services/video-photo' },
          { label: 'Bespoke Brand Identity Systems', href: '/services/video-photo' },
          { label: 'Commercial Photography Art Direction', href: '/services/video-photo' },
        ],
      },
      {
        category: 'Authority Distribution',
        items: [
          { label: 'Executive LinkedIn Thought Leadership', href: '/services/social-media' },
          { label: 'Press & Media Content Syndication', href: '/services/social-media' },
          { label: 'Podcast Content Snippets & Cutdowns', href: '/services/video-photo' },
        ],
      },
    ],
  },
  {
    id: 'industries',
    name: 'Client Industries',
    countBadge: '71 industries',
    description: 'Specialized digital marketing frameworks engineered for specific commercial sectors.',
    footerLink: { label: 'Explore all 71 industry playbooks', href: '/services' },
    groups: [
      {
        category: 'Healthcare & Clinics',
        items: [
          { label: 'Dental Practices & Orthodontics', href: '/services' },
          { label: 'Physiotherapy & Allied Health', href: '/services' },
          { label: 'Psychology & Counselling Clinics', href: '/services' },
          { label: 'GP & Specialist Medical Centres', href: '/services' },
          { label: 'Veterinary Hospitals & Animal Care', href: '/services' },
        ],
      },
      {
        category: 'Professional Services',
        items: [
          { label: 'Law Firms & Legal Chambers', href: '/services' },
          { label: 'Accounting & Wealth Advisory', href: '/services' },
          { label: 'B2B SaaS & Tech Enterprises', href: '/services' },
          { label: 'Real Estate & Property Management', href: '/services' },
          { label: 'Recruitment & Executive Search', href: '/services' },
        ],
      },
      {
        category: 'E-Commerce & Retail',
        items: [
          { label: 'Direct-To-Consumer (DTC) Brands', href: '/services' },
          { label: 'Apparel & Fashion Editorial', href: '/services' },
          { label: 'Luxury Goods & Botanical Wellness', href: '/services' },
          { label: 'Food, Beverage & Specialty Roasters', href: '/services' },
        ],
      },
      {
        category: 'Trades & Construction',
        items: [
          { label: 'Architects & Design Studios', href: '/services' },
          { label: 'Commercial Builders & Contractors', href: '/services' },
          { label: 'Electrical & Air Conditioning Trades', href: '/services' },
          { label: 'Civil Engineering & Surveyors', href: '/services' },
        ],
      },
    ],
  },
];
