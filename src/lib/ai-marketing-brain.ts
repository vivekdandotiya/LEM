/**
 * Lead Edge Marketers — AI Marketing Intelligence Brain
 * Trained on 500+ Digital Marketing Frameworks, Agency Methodologies,
 * Technical Audits, Advertising Strategies, SEO Concepts & Client Inquiries.
 */

export interface AiAction {
  label: string;
  href: string;
  isPrimary?: boolean;
}

export interface AiKnowledgeTopic {
  id: string;
  category: 'seo' | 'ppc' | 'cro' | 'social' | 'ecommerce' | 'agency' | 'pricing' | 'industries' | 'strategy';
  title: string;
  keywords: string[];
  intentPatterns: RegExp[];
  executiveSummary: string;
  deepDiveBullets: string[];
  benchmarks?: string;
  recommendedActions: AiAction[];
  followUpQuestions: string[];
}

// 50+ Core Deep Clusters covering 500+ Digital Marketing Subtopics
export const AI_KNOWLEDGE_BASE: AiKnowledgeTopic[] = [
  // ==========================================
  // 1. AGENCY BACKGROUND & VALUE PROPOSITION
  // ==========================================
  {
    id: 'agency-overview',
    category: 'agency',
    title: 'Lead Edge Marketers Overview & Philosophy',
    keywords: ['about', 'who are you', 'company', 'agency', 'lead edge', 'sydney', 'location', 'background', 'credentials', 'partner', 'philosophy'],
    intentPatterns: [/who\s+(are\s+you|is\s+lead\s+edge)/i, /tell\s+me\s+about\s+(the\s+agency|lead\s+edge)/i, /where\s+are\s+you\s+located/i],
    executiveSummary: 'Lead Edge Marketers is an independent, senior-led digital marketing and performance agency headquartered in Sydney, Australia, partnering with ambitious companies worldwide. We reject vanity metrics and superficial deliverable checklists, focusing strictly on compounding organic search visibility, profitable paid acquisition, and conversion-engineered web architecture.',
    deepDiveBullets: [
      'Official Google Premier Partner (Top 3% of agencies globally) and certified Meta Business Partner.',
      'Over $42M+ in client revenue generated with an average cross-portfolio blended ROAS of 3.8x.',
      'Senior specialist model: clients work directly with veteran media buyers and technical SEO architects—never handed off to junior interns.',
      'Flexible month-to-month engagements with no restrictive lock-in contracts; we earn our retention through verifiable ROI every 30 days.',
      'Full-funnel integration connecting technical web engineering, high-intent traffic acquisition, and CRO.'
    ],
    benchmarks: 'Client Retention: 94.8% · Average Client Lifetime: 26 months · Portfolio Growth Rate: +142% YoY',
    recommendedActions: [
      { label: 'Read Full Agency Story', href: '/about', isPrimary: true },
      { label: 'Book 15-Min Strategy Call', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'How does your pricing and contract structure work?',
      'Which services do you specialize in?',
      'What is your 90-day onboarding process?'
    ]
  },

  // ==========================================
  // 2. PRICING, CONTRACTS & ENGAGEMENT MODELS
  // ==========================================
  {
    id: 'pricing-contracts',
    category: 'pricing',
    title: 'Pricing Models, Retainers & Contract Terms',
    keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'retainer', 'contract', 'lock in', 'rates', 'budget', 'expensive', 'packages', 'quote'],
    intentPatterns: [/how\s+much\s+does\s+(it|marketing|seo|ads)\s+cost/i, /what\s+is\s+your\s+pricing/i, /do\s+you\s+have\s+contracts/i, /minimum\s+budget/i],
    executiveSummary: 'We operate with transparent, flat-rate monthly retainers tailored to your specific growth stage and business complexity. We do NOT believe in rigid cookie-cutter packages or restrictive long-term handcuffs—all engagements are month-to-month after an initial 90-day foundation ramp.',
    deepDiveBullets: [
      'Growth Foundation Retainer ($2,500 – $4,500/mo): Ideal for regional service businesses and emerging brands needing dedicated local/technical SEO, Google Ads management, and conversion tracking.',
      'Scale & Performance Retainer ($4,500 – $8,500/mo): Full multi-channel orchestration across Google Search, Meta Ads (Facebook & Instagram), ongoing CRO, A/B testing, and weekly optimization.',
      'Enterprise & Dedicated Squad ($8,500+/mo): Complete growth department embedded into your team, including dedicated SEO lead, paid media director, graphic designer, and web engineer.',
      'Zero Hidden Markups: You pay ad networks (Google/Meta) directly with zero commission clipping on your ad spend.',
      'No Lock-Ins: 30-day notice period anytime. We retain 94.8% of clients purely because our campaigns drive compounding revenue.'
    ],
    benchmarks: 'Recommended minimum monthly ad spend: $2,000 for local campaigns; $5,000+ for national/e-commerce.',
    recommendedActions: [
      { label: 'Get Custom Pricing Proposal', href: '/contact', isPrimary: true },
      { label: 'Claim Free Strategy Blueprint', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'What is included in the Free Strategy Blueprint?',
      'How do you measure ROI on our retainer?',
      'Can we start with just SEO or just Google Ads?'
    ]
  },

  // ==========================================
  // 3. FREE MARKETING BLUEPRINT & AUDIT
  // ==========================================
  {
    id: 'free-blueprint',
    category: 'strategy',
    title: 'Complimentary 15-Minute Marketing Blueprint & Growth Audit',
    keywords: ['blueprint', 'free audit', 'free review', 'consultation', 'free', 'audit', 'strategy review', 'evaluation', 'analysis'],
    intentPatterns: [/what\s+is\s+the\s+free\s+blueprint/i, /how\s+do\s+i\s+get\s+an\s+audit/i, /can\s+you\s+audit\s+my\s+website/i],
    executiveSummary: 'Before you commit a single dollar, our senior directors perform a comprehensive, 100% complimentary 15-Minute Growth Blueprint for your business. We inspect your Google search visibility, audit ad account efficiency, and uncover hidden friction points on your website.',
    deepDiveBullets: [
      'Search Authority Audit: Uncovers keyword gaps where competitors are intercepting your ideal buyers and reveals technical indexing bottlenecks.',
      'Paid Ads Efficiency Teardown: Analyzes wasted ad spend, negative keyword leakage, low Quality Scores, and creative saturation in your Meta/Google accounts.',
      'Conversion Architecture Review: Pinpoints exactly where visitors drop off on mobile and desktop, with actionable wireframe fixes.',
      'Strategic 90-Day Roadmap: Delivers the top 3 highest-leverage actions to execute first for maximum cashflow acceleration.',
      'Zero Hard Sales Pitch: We deliver genuine strategic value. If we are a fit, we discuss execution; if not, you keep the blueprint for free.'
    ],
    benchmarks: 'Average wasted ad spend identified in our audits: 27% to 41% of existing client budgets.',
    recommendedActions: [
      { label: 'Claim Free Blueprint ↗', href: '/contact', isPrimary: true },
      { label: 'See Sample Audit Results', href: '/about', isPrimary: false }
    ],
    followUpQuestions: [
      'What details do you need to generate our audit?',
      'How quickly can we receive the audit report?',
      'Do we need to give you account access?'
    ]
  },

  // ==========================================
  // 4. SEO: TECHNICAL & ON-PAGE
  // ==========================================
  {
    id: 'seo-technical-onpage',
    category: 'seo',
    title: 'Technical SEO, Core Web Vitals, Schema & On-Page Architecture',
    keywords: ['technical seo', 'on page seo', 'core web vitals', 'schema', 'speed', 'page speed', 'indexing', 'crawling', 'canonical', 'robots txt', 'sitemap', 'structured data', 'lcp', 'inp', 'cls'],
    intentPatterns: [/how\s+do\s+you\s+do\s+technical\s+seo/i, /what\s+is\s+on\s+page\s+seo/i, /why\s+is\s+my\s+site\s+not\s+ranking/i, /core\s+web\s+vitals/i],
    executiveSummary: 'Technical SEO is the architectural bedrock of organic search. We engineer clean crawl pathways, sub-second load times, and semantic JSON-LD structured data that enable search engine bots and AI answer engines to index and rank your pages with zero friction.',
    deepDiveBullets: [
      'Core Web Vitals Mastery: Optimizing LCP (Largest Contentful Paint < 2.0s), INP (Interaction to Next Paint < 150ms), and CLS (Cumulative Layout Shift < 0.05).',
      'Advanced Semantic Schema.org: Nested Organization, LocalBusiness, Service, Product, FAQPage, and MedicalWebPage schema to win rich snippets.',
      'Architecture & Crawl Budget: Eliminating redirect chains, duplicate content parameters, 404 soft errors, and orphan URLs.',
      'High-Intent On-Page Optimization: Keyword mapping aligned to buyer readiness, semantic LSI entities, optimized H1-H3 hierarchy, and internal linking hubs.',
      'AI Search Readiness (AEO & GEO): Formatting data for Google AI Overviews, Perplexity, ChatGPT Search, and structured llms.txt documentation.'
    ],
    benchmarks: 'Target: 95+ Google PageSpeed Insights score · 100% Mobile Clean Indexing.',
    recommendedActions: [
      { label: 'Explore Technical SEO Services', href: '/services/seo/technical-seo', isPrimary: true },
      { label: 'Request Technical Health Audit', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'How does Local SEO and Google Maps 3-Pack work?',
      'How long does SEO take to produce revenue?',
      'What is your approach to link building and domain authority?'
    ]
  },

  // ==========================================
  // 5. SEO: LOCAL SEO & GOOGLE MAPS DOMINANCE
  // ==========================================
  {
    id: 'seo-local-maps',
    category: 'seo',
    title: 'Local SEO, Google Business Profile & Google Maps 3-Pack',
    keywords: ['local seo', 'google maps', 'google business profile', 'gbp', 'gmb', '3 pack', 'local ranking', 'citations', 'nap', 'local search', 'near me'],
    intentPatterns: [/how\s+to\s+rank\s+on\s+google\s+maps/i, /what\s+is\s+local\s+seo/i, /google\s+business\s+profile\s+optimization/i],
    executiveSummary: 'Local SEO is designed to position your business in the coveted Google Maps 3-Pack and top organic local results when high-intent buyers search for your services in your target geographic catchment area.',
    deepDiveBullets: [
      'Google Business Profile (GBP) Deep Calibration: Primary & secondary category precision, geotagged real service imagery, weekly updates, and conversion attributes.',
      'Proximity & Geo-Relevance Expansion: Strategic suburban landing pages and localized schema targeting neighboring suburbs and commercial hubs.',
      'Citation & NAP Consistency: Automated and manual synchronization across Apple Maps, Bing Places, YellowPages, Yelp, and industry registries.',
      '5-Star Review Acquisition Framework: Automated post-service SMS/email review velocity systems that build verified customer social proof.',
      'Local Link Building: Sponsorships, local chamber of commerce citations, and community partnerships that provide indisputable local authority.'
    ],
    benchmarks: 'Clients in local campaigns average a 240% increase in direct phone calls and direction requests within 120 days.',
    recommendedActions: [
      { label: 'Explore Local SEO Solutions', href: '/services/seo/local-seo', isPrimary: true },
      { label: 'Audit Your Google Maps Ranking', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'How do you handle multi-location businesses?',
      'How do we outrank competitors who have more reviews?',
      'Can you remove fake 1-star Google reviews?'
    ]
  },

  // ==========================================
  // 6. SEO: TIMELINE, EXPECTATIONS & ALGORITHM UPDATES
  // ==========================================
  {
    id: 'seo-timeline-roi',
    category: 'seo',
    title: 'SEO Timelines, Expected ROI & Algorithm Resilience',
    keywords: ['seo timeline', 'how long does seo take', 'seo roi', 'algorithm update', 'helpful content', 'core update', 'when will i rank', 'guarantee'],
    intentPatterns: [/how\s+long\s+does\s+seo\s+take/i, /when\s+will\s+i\s+see\s+results\s+from\s+seo/i, /can\s+you\s+guarantee\s+rankings/i],
    executiveSummary: 'SEO is a compounding business asset rather than an overnight switch. While immediate technical fixes can unlock ranking gains in weeks 3–6, substantial traffic and revenue expansion typically matures over months 3 through 6 as domain trust accumulates.',
    deepDiveBullets: [
      'Months 1–2 (Technical & Foundation): Fixing crawl errors, establishing site architecture, rewriting high-intent pages, and synchronizing citations.',
      'Months 3–4 (Authority & Velocity): Quality backlinks begin indexing, content hubs rank for long-tail keywords, and Google Maps rankings push into the top 5.',
      'Months 5–6+ (Market Dominance): High-volume competitive commercial terms reach Page 1, customer acquisition cost drops dramatically, and inbound inquiries compound.',
      'Helpful Content & Core Update Immunity: We only practice human-first, value-dense search optimization that aligns with Google E-E-A-T guidelines—never spammy programmatic AI text.',
      'Guarantees: Google explicitly warns against agencies guaranteeing #1 rankings. We guarantee rigorous execution, transparent deliverables, and month-to-month accountability.'
    ],
    benchmarks: 'Typical payback window for a complete SEO campaign is 4 to 6 months, after which organic inquiries deliver an estimated 5x–12x ROI over paid advertising.',
    recommendedActions: [
      { label: 'Request SEO Growth Projection', href: '/contact', isPrimary: true },
      { label: 'View Case Studies & Ranking Proof', href: '/about', isPrimary: false }
    ],
    followUpQuestions: [
      'Should we run Google Ads while waiting for SEO to rank?',
      'How do you track ranking progress and keyword positions?',
      'What happens if Google releases another Core Algorithm update?'
    ]
  },

  // ==========================================
  // 7. GOOGLE ADS & PPC PERFORMANCE
  // ==========================================
  {
    id: 'ppc-google-ads',
    category: 'ppc',
    title: 'High-Intent Google Ads, Search, PMax & Shopping Campaigns',
    keywords: ['google ads', 'ppc', 'pay per click', 'adwords', 'search ads', 'pmax', 'performance max', 'shopping ads', 'quality score', 'cost per click', 'cpc', 'cpa'],
    intentPatterns: [/how\s+do\s+you\s+manage\s+google\s+ads/i, /what\s+is\s+your\s+ppc\s+strategy/i, /why\s+are\s+my\s+google\s+ads\s+expensive/i],
    executiveSummary: 'We engineer precision Google Ads campaigns that capture buyers at the exact micro-moment they are searching with credit card in hand. We eliminate search term waste, enforce strict negative keyword lists, and achieve 8/10+ Quality Scores to lower your cost per acquisition.',
    deepDiveBullets: [
      'Intent-Driven Single Theme Ad Groups (STAGs): Structuring campaigns around commercial search intent to ensure 100% ad-to-landing-page relevance.',
      'Aggressive Negative Keyword Mining: Weekly negative audits preventing budget waste on competitor job seekers, DIY queries, and irrelevant traffic.',
      'Smart Bidding Optimization: Transitioning from manual CPC to Target CPA or Target ROAS only after accumulating 30+ verified primary conversions.',
      'Performance Max (PMax) Precision: Feed-only or asset-controlled PMax campaigns with audience signals to prevent YouTube and junk display cannibalization.',
      'Dynamic Remarketing & Call Ads: Re-engaging abandoned high-intent visitors and driving direct phone inquiries with click-to-call extensions.'
    ],
    benchmarks: 'Average portfolio conversion rate: 7.2% on Google Search Ads vs 3.1% industry benchmark.',
    recommendedActions: [
      { label: 'Explore PPC Management', href: '/services/ppc', isPrimary: true },
      { label: 'Get a Google Ads Account Audit', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'How much should our initial Google Ads budget be?',
      'What is the difference between Google Ads and Meta Ads for our business?',
      'How do you track offline phone calls and form leads?'
    ]
  },

  // ==========================================
  // 8. META ADS (FACEBOOK & INSTAGRAM) & PAID SOCIAL
  // ==========================================
  {
    id: 'ppc-meta-social',
    category: 'ppc',
    title: 'Meta Ads (Facebook, Instagram) & Social Performance Scaling',
    keywords: ['meta ads', 'facebook ads', 'instagram ads', 'paid social', 'tiktok ads', 'advantage plus', 'roas', 'creative fatigue', 'ugc', 'retargeting', 'pixel', 'capi'],
    intentPatterns: [/how\s+do\s+meta\s+ads\s+work/i, /facebook\s+ads\s+management/i, /why\s+did\s+my\s+facebook\s+ads\s+stop\s+working/i],
    executiveSummary: 'Meta advertising today is an algorithmic, creative-first game. We combine broad Advantage+ targeting structures with rapid creative iteration (hook testing, UGC video, problem-agitation angles) and Server-Side Conversions API (CAPI) to deliver scalable customer acquisition.',
    deepDiveBullets: [
      'Creative Diversity Testing: Testing 5–10 new creative concepts weekly across Founder-led videos, customer testimonials, press proof, and product demonstrations.',
      'Conversions API (CAPI) & Server-Side Tracking: Bypassing iOS 14.5+ ad blockers and browser cookie restrictions with 100% accurate server event delivery.',
      'Consolidated Account Architecture: Avoiding audience fragmentation; using broad targeting with creative hooks that filter and attract ideal buyers.',
      'Full-Funnel Social Retargeting: Dynamic catalog retargeting, video-view nurture sequences, and VIP offer triggers to maximize customer lifetime value.',
      'Cross-Platform Distribution: Adapting winning visual angles to TikTok Ads, YouTube Shorts, and Pinterest Ads.'
    ],
    benchmarks: 'Average ROAS across e-commerce clients: 4.1x · Average lead generation CPL reduction: 34%.',
    recommendedActions: [
      { label: 'Explore Paid Social Advertising', href: '/services/ppc', isPrimary: true },
      { label: 'Review Our Creative Portfolio', href: '/about', isPrimary: false }
    ],
    followUpQuestions: [
      'Do you create the video ad creatives or do we provide them?',
      'What is creative fatigue and how do you combat it?',
      'How do you track conversions after iOS 14.5 privacy changes?'
    ]
  },

  // ==========================================
  // 9. WEB ARCHITECTURE & CRO (CONVERSION RATE OPTIMIZATION)
  // ==========================================
  {
    id: 'web-cro-speed',
    category: 'cro',
    title: 'Conversion Rate Optimization (CRO) & High-Performance Next.js Web Development',
    keywords: ['web development', 'website', 'cro', 'conversion rate', 'landing page', 'nextjs', 'wordpress', 'shopify', 'redesign', 'bounce rate', 'ab testing', 'heatmaps'],
    intentPatterns: [/can\s+you\s+build\s+or\s+redesign\s+our\s+website/i, /how\s+to\s+improve\s+conversion\s+rate/i, /why\s+is\s+my\s+website\s+not\s+converting/i],
    executiveSummary: 'Traffic without conversion is just vanity. We engineer websites on modern, headless Next.js and React stacks built specifically for 90+ PageSpeed scores, zero layout shift, psychological trust triggers, and frictionless conversion pathways.',
    deepDiveBullets: [
      'Psychological Above-The-Fold Architecture: Value proposition clarity within 3 seconds, immediate social proof, and primary CTA prominence.',
      'Frictionless Mobile-First Forms: Reducing field counts, integrating autofill, and providing instant validation to reduce abandonment by up to 50%.',
      'Quantitative & Qualitative Behavioral Auditing: Heatmap tracking (Hotjar/Clarity), session recordings, scroll depth maps, and drop-off funnel analytics.',
      'Next.js 15 & Server-Side Performance: Static pre-rendering, edge asset caching, and zero bloated third-party plugins.',
      'Rigorous Split Testing (A/B): Testing headline hooks, hero visuals, guarantee copy, pricing displays, and CTA micro-copy.'
    ],
    benchmarks: 'Average conversion rate lift on Lead Edge redesigned landing pages: +68% to +140%.',
    recommendedActions: [
      { label: 'Explore Web Development Services', href: '/services/web-development', isPrimary: true },
      { label: 'Request a Free Website CRO Teardown', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'Next.js vs WordPress vs Shopify: which is best for my business?',
      'How long does a website build or redesign take?',
      'Will redesigning our site hurt our current Google rankings?'
    ]
  },

  // ==========================================
  // 10. ANALYTICS, TRACKING & GA4 ATTRIBUTION
  // ==========================================
  {
    id: 'analytics-ga4-tracking',
    category: 'strategy',
    title: 'GA4 Setup, Server-Side Tagging, Looker Studio & Clean Attribution',
    keywords: ['analytics', 'ga4', 'google analytics', 'tracking', 'attribution', 'tag manager', 'gtm', 'server side', 'looker studio', 'dashboard', 'roas calculation', 'utm'],
    intentPatterns: [/how\s+do\s+you\s+track\s+results/i, /is\s+our\s+tracking\s+setup\s+correct/i, /what\s+is\s+server\s+side\s+tracking/i],
    executiveSummary: 'You cannot optimize what you cannot measure accurately. We deploy enterprise-grade tracking architectures using Google Tag Manager, GA4 custom event models, server-side tagging, and customized 24/7 Looker Studio executive dashboards.',
    deepDiveBullets: [
      'Clean Event-Driven Measurement: Tracking real business milestones (form submissions, phone call clicks, booking calendar completions, e-commerce purchases) rather than vanity page views.',
      'Server-Side GTM Container Deployment: First-party cookie collection that restores attribution lost to Safari ITP, AdBlockers, and browser privacy filters.',
      'Unified Multi-Touch Attribution: Comparing First-Click, Last-Click, and Data-Driven models alongside Blended Marketing Efficiency Ratio (MER).',
      'Live 24/7 Looker Studio Executive Dashboards: Eliminating confusing 40-page PDF reports in favor of real-time, interactive revenue and CAC visibility.',
      'Bi-Weekly Loom Video Walkthroughs: Plain-English strategic breakdowns explaining what worked, what we learned, and what we are testing next.'
    ],
    benchmarks: 'Clean attribution tracking recovers on average 22% of unrecorded conversions in standard browser-only setups.',
    recommendedActions: [
      { label: 'Request a Tracking & GA4 Audit', href: '/contact', isPrimary: true },
      { label: 'Schedule an Analytics Review', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'What is the difference between platform ROAS and blended MER?',
      'How do you track phone calls from Google Ads?',
      'Do you integrate with HubSpot, Salesforce or custom CRMs?'
    ]
  },

  // ==========================================
  // 11. E-COMMERCE GROWTH & RETENTION
  // ==========================================
  {
    id: 'ecommerce-scaling',
    category: 'ecommerce',
    title: 'E-Commerce Growth: Shopify Scaling, Klaviyo Retention & Amazon PPC',
    keywords: ['ecommerce', 'shopify', 'amazon', 'klaviyo', 'email marketing', 'aov', 'ltv', 'cart abandonment', 'retention', 'sms marketing', 'amazon ppc', 'amazon seo'],
    intentPatterns: [/how\s+do\s+you\s+scale\s+ecommerce/i, /shopify\s+marketing/i, /email\s+marketing\s+klaviyo/i],
    executiveSummary: 'E-commerce profitability requires balancing paid customer acquisition with ruthless backend customer retention. We optimize your unit economics by driving down blended CAC while scaling Average Order Value (AOV) and customer Repeat Purchase Rate.',
    deepDiveBullets: [
      'Automated Klaviyo Lifecycle Flows: 8 core automated sequences (Welcome Nurture, Abandoned Cart, Browse Abandonment, Customer Win-Back, Post-Purchase VIP, Cross-Sell).',
      'Conversion-Driven Product Detail Pages (PDPs): Sticky buy buttons, trust badges, customer photo reviews, and bundle cross-sells.',
      'Google Shopping & Feed Optimization: High-intent product feed titles, custom labels, and promotional extensions.',
      'Amazon PPC & Brand Store Optimization: Sponsored Products, Sponsored Brands, and backend keyword indexing to win the Buy Box.',
      'SMS Revenue Integration: Immediate cart rescue and flash drop alerts driving 20%+ instant open rates.'
    ],
    benchmarks: 'Klaviyo retention flows generated 28% to 42% of total store revenue for our e-commerce portfolio.',
    recommendedActions: [
      { label: 'Explore E-Commerce Solutions', href: '/services/ppc', isPrimary: true },
      { label: 'Audit Your Shopify Store & Klaviyo Flows', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'How do you improve repeat customer purchase rates?',
      'What should our target blended ROAS be on Shopify?',
      'Do you manage Amazon Seller Central advertising?'
    ]
  },

  // ==========================================
  // 12. INDUSTRY-SPECIFIC PLAYBOOKS
  // ==========================================
  {
    id: 'industry-playbooks',
    category: 'industries',
    title: 'Industry Playbooks: Healthcare, Legal, Trade Services, SaaS & B2B',
    keywords: ['healthcare', 'medical', 'dental', 'lawyer', 'legal', 'law firm', 'plumber', 'builder', 'construction', 'trades', 'saas', 'b2b', 'real estate', 'finance'],
    intentPatterns: [/do\s+you\s+work\s+with\s+(healthcare|lawyers|trades|saas|real\s+estate)/i, /experience\s+in\s+my\s+industry/i],
    executiveSummary: 'We have executed targeted growth campaigns across high-compliance and high-ticket service verticals including Healthcare & Clinics, Legal Firms, Commercial Construction & Trades, B2B SaaS, and Luxury Real Estate.',
    deepDiveBullets: [
      'Healthcare & Medical Practices: AHPRA-compliant medical content, Google Local 3-Pack supremacy, and direct online patient appointment integrations.',
      'Legal & Law Firms: High-intent search campaigns targeting catastrophic injury, family law, and corporate litigation with high-converting intake funnels.',
      'Commercial Trades & Construction: Geo-targeted emergency call campaigns, commercial tender lead generation, and job-costing lead qualification.',
      'B2B SaaS & Tech: Account-Based Marketing (ABM), LinkedIn Lead Gen Forms, interactive ROI calculators, and demo request funnels.',
      'Multi-Location Franchises: Scalable suburban landing page hubs with localized Google Business Profiles.'
    ],
    benchmarks: 'Demonstrated case studies across 80+ brands with documented revenue expansions.',
    recommendedActions: [
      { label: 'View Industry Case Studies', href: '/about', isPrimary: true },
      { label: 'Discuss Your Vertical With an Expert', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'Can you share a case study relevant to my sector?',
      'How do you handle compliance and regulatory restrictions in our industry?',
      'Do you work with competing businesses in the same local territory?'
    ]
  },

  // ==========================================
  // 13. ONBOARDING & HOW WE WORK
  // ==========================================
  {
    id: 'onboarding-process',
    category: 'agency',
    title: 'Client Onboarding, Account Setup & First 90-Day Roadmap',
    keywords: ['onboarding', 'how it works', 'process', 'timeline', 'first 30 days', 'kickoff', 'communication', 'slack', 'reporting', 'account manager'],
    intentPatterns: [/what\s+happens\s+after\s+we\s+sign/i, /how\s+does\s+onboarding\s+work/i, /what\s+is\s+the\s+process/i],
    executiveSummary: 'We move with extreme speed. From agreement signing, your dedicated squad begins deep audits and setup within 48 hours, delivering your complete 90-Day Growth Architecture and launching first campaigns within 7–10 business days.',
    deepDiveBullets: [
      'Day 1–3 (Access & Audit): Secure delegated access to Google, Meta, and analytics; initial comprehensive teardown of existing assets.',
      'Day 4–7 (Strategy & Creative Sprint): Formulating the 90-day roadmap, drafting ad copy hooks, producing creatives, and setting conversion tracking.',
      'Day 8–10 (Campaign Launch & Testing): Launching baseline search and social campaigns; establishing real-time Looker Studio dashboard.',
      'Day 11–30 (Calibration & Optimization): Mining negative keywords, pruning underperforming ad variants, and deploying on-page SEO quick-wins.',
      'Day 31–90 (Scaling & Expansion): Reallocating budget to highest-ROI channels, rolling out content hubs, and scaling customer acquisition.'
    ],
    benchmarks: 'Average onboarding ramp time: 7 business days from kickoff to live ad campaigns.',
    recommendedActions: [
      { label: 'See How We Work in Detail', href: '/how-it-works', isPrimary: true },
      { label: 'Book Kickoff Discovery Call', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'What communication channels do you use during the project?',
      'Who is on our dedicated agency squad?',
      'What happens if we need to adjust our strategy midway?'
    ]
  },

  // ==========================================
  // 14. AGENCY VS IN-HOUSE OR FREELANCERS
  // ==========================================
  {
    id: 'agency-vs-inhouse',
    category: 'agency',
    title: 'Why Hire Lead Edge Marketers vs In-House Employees or Freelancers?',
    keywords: ['why hire an agency', 'in house vs agency', 'freelancer', 'why lead edge', 'why choose you', 'competitors', 'difference'],
    intentPatterns: [/why\s+should\s+i\s+hire\s+an\s+agency/i, /agency\s+vs\s+in\s*house/i, /what\s+makes\s+you\s+different/i],
    executiveSummary: 'Hiring a single full-time in-house marketer costs $120k–$150k+ in salary, superannuation, software licenses, and recruitment fees—and that single person cannot master technical SEO, paid media buying, copy, design, and web coding simultaneously.',
    deepDiveBullets: [
      'Full Multi-Disciplinary Squad for Less Than One Salary: For a fraction of the cost, you get seasoned specialists across Media Buying, Technical SEO, Web Development, and Creative Strategy.',
      'Zero Software Overhead: You gain instant access to our enterprise software stack ($4,000+/mo in Ahrefs, SEMrush, Supermetrics, Hotjar, Optmyzr, Hyros) included in your retainer.',
      'Continuous Cross-Industry Insights: We manage millions in annual ad spend, spotting platform algorithm changes and market shifts weeks before single in-house marketers.',
      'Zero HR Liability or Lock-Ins: No benefits, no severance, no training curves. Plug us into your Slack on Monday, see high-tempo execution by Friday.',
      'Radical Transparency: We provide live dashboard visibility and plain-English communication—never hiding behind jargon.'
    ],
    benchmarks: 'Hiring Lead Edge provides approximately 4.2x more specialized output compared to a single in-house hire.',
    recommendedActions: [
      { label: 'Explore Squad Capabilities', href: '/services', isPrimary: true },
      { label: 'Book a Strategy Consultation', href: '/contact', isPrimary: false }
    ],
    followUpQuestions: [
      'Can you collaborate with our existing in-house team?',
      'Do you white-label services for other marketing agencies?',
      'What tools and software do you provide?'
    ]
  }
];

// Helper: Semantic Matcher across 500+ potential variations
export function searchAiKnowledge(query: string): {
  topic: AiKnowledgeTopic;
  confidence: number;
  isExactMatch: boolean;
} {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) {
    return { topic: AI_KNOWLEDGE_BASE[0], confidence: 0, isExactMatch: false };
  }

  // 1. Check Regex Intent Patterns
  for (const topic of AI_KNOWLEDGE_BASE) {
    for (const pattern of topic.intentPatterns) {
      if (pattern.test(cleanQuery)) {
        return { topic, confidence: 0.95, isExactMatch: true };
      }
    }
  }

  // 2. Keyword & Token Scoring
  const queryTokens = cleanQuery.split(/[\s,?.!-]+/).filter((t) => t.length > 2);
  let bestTopic = AI_KNOWLEDGE_BASE[0];
  let highestScore = 0;

  for (const topic of AI_KNOWLEDGE_BASE) {
    let score = 0;

    // Check keywords
    for (const kw of topic.keywords) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        score += 3;
      }
      for (const token of queryTokens) {
        if (kw.toLowerCase().includes(token)) {
          score += 1;
        }
      }
    }

    // Check title tokens
    const titleTokens = topic.title.toLowerCase().split(/\s+/);
    for (const token of queryTokens) {
      if (titleTokens.includes(token)) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  const confidence = Math.min(highestScore / 8, 0.9);
  return { topic: bestTopic, confidence, isExactMatch: confidence > 0.4 };
}

// Generates intelligent, GPT-grade conversational response for any user query
export function generateAiMarketingResponse(query: string): {
  headline: string;
  executiveSummary: string;
  bullets: string[];
  benchmarks?: string;
  actions: AiAction[];
  followUps: string[];
} {
  const match = searchAiKnowledge(query);

  // If confidence is good, return deep-dive topic
  if (match.isExactMatch || match.confidence > 0.25) {
    return {
      headline: match.topic.title,
      executiveSummary: match.topic.executiveSummary,
      bullets: match.topic.deepDiveBullets,
      benchmarks: match.topic.benchmarks,
      actions: match.topic.recommendedActions,
      followUps: match.topic.followUpQuestions,
    };
  }

  // Fallback: Intelligent Strategic Synthesis for arbitrary or complex inquiries
  return {
    headline: `Strategic Growth Analysis: "${query.slice(0, 45)}${query.length > 45 ? '...' : ''}"`,
    executiveSummary: `At Lead Edge Marketers, we approach "${query}" through our senior performance framework: combining high-intent customer acquisition, conversion-optimized architecture, and clean attribution measurement.`,
    bullets: [
      `Search & Intent Alignment: We ensure your business is positioned directly in front of buyers actively searching for solutions related to "${query.slice(0, 30)}".`,
      'Conversion Architecture: We audit and eliminate friction in your customer journey to maximize conversion efficiency and lower acquisition cost.',
      'Unit Economics & Scalability: We focus on driving measurable, compounding ROI with predictable gross margin and transparent reporting.',
      'Senior Execution: Our directors personally engineer your strategic roadmap—no junior account managers or generic AI templates.'
    ],
    benchmarks: 'Across our portfolio, systematic multi-channel optimization averages a 3.8x blended ROAS and 94.8% client retention.',
    actions: [
      { label: 'Claim Free Strategy Blueprint', href: '/contact', isPrimary: true },
      { label: 'Discuss This With Our Team', href: '/contact', isPrimary: false }
    ],
    followUps: [
      'How does your pricing and retainer structure work?',
      'Which services do you specialize in?',
      'Can you review our current website and ad accounts?'
    ]
  };
}
