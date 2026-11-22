export interface SubServiceGuidePhase {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface SubService {
  slug: string;
  serviceCategory: string; // 'seo' | 'ppc' | 'web' | 'social' | 'industries'
  serviceCategoryName: string;
  parentHref: string;
  title: string;
  tagline: string;
  badge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroVideo?: {
    mp4: string;
    webm: string;
    poster: string;
  };
  heroImage: string;
  statPill: {
    label: string;
    value: string;
  };
  guideIntroduction: string;
  guidePhases: SubServiceGuidePhase[];
  keyBenefits: {
    title: string;
    description: string;
  }[];
  review: {
    clientName: string;
    clientRole: string;
    company: string;
    quote: string;
    rating: string;
    metric: string;
    image: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SUBSERVICES: SubService[] = [
  // =========================================================================
  // SEARCH & SEO (Category: seo)
  // =========================================================================
  {
    slug: 'keyword-taxonomy-mapping',
    serviceCategory: 'seo',
    serviceCategoryName: 'Search & SEO',
    parentHref: '/services/seo',
    title: 'Keyword Taxonomy Mapping',
    tagline: 'Architectural Search Intent Clustering & Semantic Authority',
    badge: 'ORGANIC GROWTH ARCHITECTURE',
    heroHeadline: 'Turn High-Intent Search Queries into Enterprise Revenue.',
    heroSubheadline:
      'We dismantle chaotic keyword spreadsheets into structured, semantic topical clusters. Every commercial query maps to a purpose-built landing page designed to capture qualified buyers, eliminate internal cannibalization, and win category dominance.',
    heroVideo: {
      mp4: '/videos/services/seo-phase-0.mp4',
      webm: '/videos/services/seo-phase-0.webm',
      poster: '/videos/services/seo-phase-0-poster.webp',
    },
    heroImage: '/images/screens/audiology/poster-480.webp',
    statPill: {
      label: 'Average Non-Brand Organic Growth',
      value: '+184%',
    },
    guideIntroduction:
      'Search engines no longer rank standalone keywords in isolation; they evaluate topical authority across complete semantic ontologies. Our Keyword Taxonomy Mapping framework engineers an airtight hierarchy between your core pillar pages, commercial cluster pages, and supporting informational assets.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Full-Spectrum Search Query Extraction',
        description:
          'We extract every relevant search query across Google Search Console, Semrush, Ahrefs, and customer search trends to unearth total category demand.',
        deliverables: [
          'Comprehensive 2,500+ query raw database',
          'Search intent segmentation (Commercial, Transactional, Informational)',
          'Competitor query conquest matrix',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Semantic Cluster & Topic Grouping',
        description:
          'Using vector embeddings and semantic proximity algorithms, queries are grouped into parent pillars and child sub-clusters to eliminate cannibalization.',
        deliverables: [
          'Topical ontology architectural map',
          'URL hierarchy & breadcrumb specification',
          'Page-to-keyword 1:1 assignment matrix',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Internal Linking & Page-Level Blueprinting',
        description:
          'We specify exact anchor text distribution, contextual reciprocal links, and hub-and-spoke internal link graph architecture.',
        deliverables: [
          'Bidirectional internal link blueprint',
          'Priority anchor text directory',
          'Metadata and header hierarchy (H1-H3) wireframes',
        ],
      },
      {
        phase: 'Phase 04',
        title: 'Live Deployment & Ranking Trajectory Monitoring',
        description:
          'Continuous rank verification, crawl budget audit, and click-through rate optimization via structured schema and rich snippets.',
        deliverables: [
          'Weekly ranking & impression trajectory dashboard',
          'Google Search Console indexation health report',
          'Commercial conversion attribution audit',
        ],
      },
    ],
    keyBenefits: [
      {
        title: 'Eliminates Keyword Cannibalization',
        description: 'Ensures exactly one designated canonical URL ranks for each query cluster, compounding domain authority rather than diluting it.',
      },
      {
        title: 'Captures Buyer Intent at Every Stage',
        description: 'Routes high-intent transactional searchers directly to booking pages, while nurturing mid-funnel researchers with high-authority guides.',
      },
      {
        title: 'Accelerates New Page Indexation',
        description: 'Contextual hub-and-spoke internal links allow search engine crawlers to discover and index newly published service pages within hours.',
      },
    ],
    review: {
      clientName: 'Julian Sterling',
      clientRole: 'Managing Director',
      company: 'Aura Allied Health Group',
      quote:
        'Lead Edge completely restructured our organic search architecture. Within 4 months, our non-brand organic bookings increased by 184%, and we outranked legacy national health directories for our top 25 high-value clinical search terms.',
      rating: '5.0 ★★★★★',
      metric: '+184% Organic Inquiries',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      {
        question: 'What is the difference between keyword research and keyword taxonomy mapping?',
        answer:
          'Keyword research simply identifies query volume and competition scores. Keyword taxonomy mapping architects those keywords into a structured, hierarchical site taxonomy with strict URL routing, parent-child relationships, and internal linking models that tell search engines your exact domain authority.',
      },
      {
        question: 'How does taxonomy mapping prevent internal cannibalization?',
        answer:
          'When multiple pages on your site compete for the same query, Google splits impressions and ranks neither well. Taxonomy mapping assigns a single canonical destination for every search intent and adjusts surrounding content to point to that master page.',
      },
      {
        question: 'How long before we see rankings improve from taxonomy updates?',
        answer:
          'Most clients observe Google recrawling and re-indexing the structured hierarchy within 14 to 28 days, with meaningful keyword rank increases and organic impression surges manifesting between weeks 6 and 12.',
      },
      {
        question: 'Does this apply to multi-location or e-commerce businesses?',
        answer:
          'Yes. We build specialized taxonomy matrices for multi-location practices (suburb-by-service matrices) and high-SKU e-commerce catalogues (attribute and category facet structures).',
      },
    ],
  },

  {
    slug: 'programmatic-seo-engines',
    serviceCategory: 'seo',
    serviceCategoryName: 'Search & SEO',
    parentHref: '/services/seo',
    title: 'Programmatic SEO Engines',
    tagline: 'Algorithmic Page Generation & Long-Tail Category Capture at Scale',
    badge: 'SCALABLE DATA ARCHITECTURE',
    heroHeadline: 'Deploy 500+ High-Performance Landing Pages from Structured Data.',
    heroSubheadline:
      'Capture thousands of qualified long-tail search queries with programmatic, data-backed landing page engines. Built on Next.js 15 static generation with unique localized content, verified schema, and zero duplicate content penalties.',
    heroVideo: {
      mp4: '/videos/services/seo-phase-1.mp4',
      webm: '/videos/services/seo-phase-1.webm',
      poster: '/videos/services/seo-phase-1-poster.webp',
    },
    heroImage: '/images/screens/builder/poster-480.webp',
    statPill: {
      label: 'Long-Tail Keyword Coverage',
      value: '2,400+ Pages',
    },
    guideIntroduction:
      'Traditional manual landing page creation is too slow to capture granular search demand across hundreds of suburbs, industries, or use-cases. Our Programmatic SEO Engine builds database-driven templates that compile thousands of pristine, fast-loading, customized pages.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Structured Dataset Curation & Entity Enrichment',
        description:
          'We compile proprietary localized data, customer statistics, suburb boundaries, and industry credentials into clean JSON databases.',
        deliverables: [
          'Sanitized structured master dataset',
          'Dynamic variable mapping (pricing, testimonials, local statistics)',
          'Unique content formula to guarantee 100% originality score',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Headless Next.js Static Template Engineering',
        description:
          'We design an ultra-fast React template optimized for conversion, sub-second load times, and dynamic schema.',
        deliverables: [
          'High-converting responsive landing page UI template',
          'Incremental Static Regeneration (ISR) configuration',
          'Dynamic localized Open Graph social preview cards',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Granular Schema & Sitemap Mesh Architecture',
        description:
          'Every generated page is equipped with tailored LocalBusiness or Service JSON-LD schema, verified through Google Rich Results.',
        deliverables: [
          'Segmented XML sitemaps partitioned by category/region',
          'Automated canonical tag and breadcrumb injection',
          'Internal link mesh connecting nearby locations and related services',
        ],
      },
      {
        phase: 'Phase 04',
        title: 'Controlled Rollout & Search Console Indexation Audit',
        description:
          'Staged batch deployments to safeguard domain crawl health and monitor Google indexation rates.',
        deliverables: [
          'Batch indexation tracking report',
          '404 and redirect preventive monitoring',
          'Real-time lead and phone inquiry attribution tracking',
        ],
      },
    ],
    keyBenefits: [
      {
        title: 'Unrivaled Long-Tail Organic Dominance',
        description: 'Ranks for hyper-specific searches ("emergency blocked drain Mascot") that competitors fail to target manually.',
      },
      {
        title: 'Fraction of the Cost of Manual Copywriting',
        description: 'Scales to 500+ URLs with one robust template and structured database rather than thousands of billable agency copywriting hours.',
      },
      {
        title: 'Sub-Second Cloud Speed & 100 Lighthouse',
        description: 'Prerendered at the edge with Next.js static compilation, ensuring zero bounce rate from slow server response times.',
      },
    ],
    review: {
      clientName: 'Marcus Vance',
      clientRole: 'Co-Founder & CEO',
      company: 'BuildRight Group NSW',
      quote:
        'Lead Edge deployed a programmatic suburb engine covering 84 Sydney council areas. Our inbound building quote requests doubled in 90 days. Every single landing page feels tailored and loads in under 0.5 seconds.',
      rating: '5.0 ★★★★★',
      metric: '84 Suburbs Dominated',
      image: '/images/about/about-team-creative.webp',
    },
    faqs: [
      {
        question: 'Does Google penalize programmatic SEO pages as duplicate content?',
        answer:
          'Google penalizes "thin content" that has no unique value. We avoid this by injecting genuine localized data, distinct local reviews, unique FAQs, and suburb-specific metrics into every page, ensuring each URL provides real human utility.',
      },
      {
        question: 'How fast do programmatic pages get indexed?',
        answer:
          'We release programmatic pages in curated batches of 50-100 with automated XML sitemaps and reciprocal cross-links, achieving rapid indexation within 2-3 weeks.',
      },
      {
        question: 'Can programmatic pages have custom enquiry forms?',
        answer:
          'Yes. Every page features integrated inquiry forms and phone call buttons pre-populated with the user’s specific suburb or service query.',
      },
      {
        question: 'What platform do you use to host programmatic SEO pages?',
        answer:
          'We engineer programmatic engines using Next.js 15 and deploy on global edge networks (Vercel / AWS CloudFront), ensuring instant global TTFB under 40ms.',
      },
    ],
  },

  {
    slug: 'technical-seo-audits',
    serviceCategory: 'seo',
    serviceCategoryName: 'Search & SEO',
    parentHref: '/services/seo',
    title: 'Technical SEO Audits & Crawl Recovery',
    tagline: 'Crawl Budget Optimization, Server Response & Edge Rendering',
    badge: 'TECHNICAL EXCELLENCE',
    heroHeadline: 'Fix Invisible Code Errors That Sabotage Your Rankings.',
    heroSubheadline:
      'Search engines can’t rank pages they can’t efficiently crawl or render. We inspect your server response headers, JavaScript hydration, crawl budget, canonical chains, and core web vitals to unlock full organic visibility.',
    heroVideo: {
      mp4: '/videos/services/seo-phase-2.mp4',
      webm: '/videos/services/seo-phase-2.webm',
      poster: '/videos/services/seo-phase-2-poster.webp',
    },
    heroImage: '/images/screens/conveyancer/poster-480.webp',
    statPill: {
      label: 'Crawl Efficiency Increase',
      value: '3.4x Faster',
    },
    guideIntroduction:
      'Modern web technologies like React and headless frameworks require specialized server-side rendering configurations. Our technical audits drill into byte-level crawl logs, server status codes, and rendering pipelines to eliminate crawl bottlenecks.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Raw Server Log Analysis & Crawl Bot Profiling',
        description:
          'We analyze your actual web server access logs to observe how Googlebot, Bingbot, and AI crawlers traverse your website.',
        deliverables: ['Server access log report', 'Crawl frequency and waste heat map', 'Bot budget bottleneck diagnosis'],
      },
      {
        phase: 'Phase 02',
        title: 'Client-Side vs Server-Side DOM Rendering Audit',
        description:
          'We compare raw HTML responses against fully rendered browser DOMs to ensure all critical links and copy are immediately visible without heavy JavaScript execution.',
        deliverables: ['Rendering parity report', 'Hydration delay remediation plan', 'Critical CSS & script delivery overhaul'],
      },
      {
        phase: 'Phase 03',
        title: 'Redirect Chain & Canonical Graph Cleanup',
        description:
          'We eliminate multi-hop 301 redirect chains, 404 orphan pages, and conflicting canonical tags.',
        deliverables: ['Airtight 1-to-1 redirect map', 'Self-referencing canonical validation', 'Orphan URL restoration or pruning'],
      },
      {
        phase: 'Phase 04',
        title: 'Edge Caching & Core Web Vitals Stabilization',
        description:
          'We implement edge-level caching rules (Cloudflare / Vercel Edge) to drop Time to First Byte (TTFB) below 80ms.',
        deliverables: ['99+ Core Web Vitals mobile benchmark', 'Edge caching policy deployment', 'Real-time uptime and crawl monitoring'],
      },
    ],
    keyBenefits: [
      {
        title: 'Instant Crawl Budget Recovery',
        description: 'Stops search bots from wasting crawl capacity on non-indexable scripts, redirect loops, and faceted filter URLs.',
      },
      {
        title: 'Rapid Discovery of New Content',
        description: 'Allows fresh blog articles, service pages, and case studies to be indexed in Google within hours rather than weeks.',
      },
      {
        title: '100% Core Web Vitals Compliance',
        description: 'Eliminates Largest Contentful Paint (LCP) delays and Cumulative Layout Shift (CLS) penalties across mobile devices.',
      },
    ],
    review: {
      clientName: 'Elena Rostova',
      clientRole: 'Head of Engineering',
      company: 'OmniTrade Platforms',
      quote:
        'Lead Edge diagnosed a JavaScript rendering bug that had kept 40% of our catalogue invisible to Google for 8 months. Within 3 weeks of their code deployment, our indexed pages surged by 12,000 URLs and organic revenue followed.',
      rating: '5.0 ★★★★★',
      metric: '+12,000 Indexed URLs',
      image: '/images/about/about-team-meeting.webp',
    },
    faqs: [
      {
        question: 'How do you perform server log analysis?',
        answer:
          'We ingest your CDN or Apache/Nginx access logs and filter by verified Googlebot reverse DNS IPs. This reveals which pages search engines actually crawl, how often, and where crawl budget is wasted.',
      },
      {
        question: 'Will technical fixes require my in-house developers to do extra work?',
        answer:
          'We provide complete drop-in pull requests (GitHub/GitLab) with ready-to-merge code, Next.js configuration files, and edge worker scripts so your team can deploy fixes with zero friction.',
      },
      {
        question: 'What is Time to First Byte (TTFB) and why does it matter?',
        answer:
          'TTFB is the milliseconds it takes for the browser to receive the first byte of HTML from your server. A slow TTFB delay cascades into poor LCP and signals slow server infrastructure to Google.',
      },
      {
        question: 'How often should technical SEO audits be performed?',
        answer:
          'We recommend a foundational deep audit followed by ongoing automated monitoring with alerts whenever code updates introduce redirect chains or indexation regressions.',
      },
    ],
  },

  {
    slug: 'local-3-pack-dominance',
    serviceCategory: 'seo',
    serviceCategoryName: 'Search & SEO',
    parentHref: '/services/seo',
    title: 'Local 3-Pack Dominance & Google Maps SEO',
    tagline: 'High-Intent Local Search Conquest for Australian Businesses',
    badge: 'LOCAL PROXIMITY SYSTEM',
    heroHeadline: 'Own the Top 3 Positions on Google Maps When Customers Search.',
    heroSubheadline:
      'Over 70% of local phone calls and appointments originate in Google’s Map 3-pack. We optimize your Google Business Profile, synchronize NAP citations across 50+ directories, and deploy geo-targeted location pages that cement top map rankings.',
    heroVideo: {
      mp4: '/videos/services/seo-phase-3.mp4',
      webm: '/videos/services/seo-phase-3.webm',
      poster: '/videos/services/seo-phase-3-poster.webp',
    },
    heroImage: '/images/screens/plumber/poster-480.webp',
    statPill: {
      label: 'Local Map Inquiries Increase',
      value: '+210%',
    },
    guideIntroduction:
      'Local pack rankings depend on a tripartite algorithm: Relevance, Distance, and Prominence. We systematically optimize all three vectors to expand your map ranking radius far beyond your physical office doorstep.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Google Business Profile (GBP) Deep Optimization',
        description:
          'We curate primary and secondary business categories, write keyword-rich service descriptions, and configure direct booking links.',
        deliverables: ['Primary category calibration', 'Complete service menu item catalog', 'High-res geocoded photography upload'],
      },
      {
        phase: 'Phase 02',
        title: 'Directory Citation Cleansing & Sync',
        description:
          'We lock in consistent Name, Address, and Phone (NAP) details across TrueLocal, YellowPages, Apple Maps, and industry associations.',
        deliverables: ['50+ Australian directory synchronization', 'Duplicate listing deletion', 'Consistent schema address markup'],
      },
      {
        phase: 'Phase 03',
        title: 'Review Generation & Keyword Feedback Engine',
        description:
          'Automated SMS/Email workflows that prompt delighted clients to leave 5-star Google reviews mentioning specific service keywords.',
        deliverables: ['Automated review request funnel', 'Keyword-rich review response templates', 'Reputation dashboard'],
      },
      {
        phase: 'Phase 04',
        title: 'Hyper-Local Service Area Page Deployment',
        description:
          'Location landing pages tailored to nearby suburbs that build contextual relevance for surrounding geographic radius expansion.',
        deliverables: ['Suburb service area landing pages', 'Embedded Google Maps route integration', 'Localized client proof cards'],
      },
    ],
    keyBenefits: [
      {
        title: 'Immediate High-Intent Phone Calls',
        description: 'Direct "Tap to Call" actions straight from mobile Google Maps without requiring searchers to navigate complex menus.',
      },
      {
        title: 'Expanded Proximity Radius',
        description: 'Extends your 3-pack visibility from 2km to 15km+ into affluent adjacent customer neighborhoods.',
      },
      {
        title: 'Dominates Competitors on Mobile',
        description: '占据 mobile screen real estate before organic listings even start rendering.',
      },
    ],
    review: {
      clientName: 'Dr. Sarah Jenkins',
      clientRole: 'Principal Dentist',
      company: 'Copper Lane Dental Newtown',
      quote:
        'We were invisible on Google Maps beyond King Street. Lead Edge restructured our Google Business Profile and local citations. We jumped to #1 for "dentist Newtown" and "emergency dental inner west", bringing 45 new patients every month.',
      rating: '5.0 ★★★★★',
      metric: '45 New Patients / mo',
      image: '/images/about/about-hero.webp',
    },
    faqs: [
      {
        question: 'How long does it take to rank in the Google Maps 3-Pack?',
        answer:
          'Depending on the competitiveness of your local suburb and category, GBP optimization typically produces noticeable rank improvements in 30 to 60 days.',
      },
      {
        question: 'Does having multiple categories in Google Business Profile hurt rankings?',
        answer:
          'Only if misaligned. Choosing the right primary category is critical for 70% of relevance weighting, while secondary categories unlock additional high-volume search clusters.',
      },
      {
        question: 'How do you handle businesses that service clients at their homes rather than an office?',
        answer:
          'We configure verified Service Area Businesses (SAB) with defined geographic delivery radius boundaries and compliant address privacy.',
      },
      {
        question: 'Do Google review responses impact SEO?',
        answer:
          'Yes. Timely, detailed responses that reference specific services and treatment types provide Google with semantic confirmation of your business capabilities.',
      },
    ],
  },

  // =========================================================================
  // PERFORMANCE ADS (Category: ppc)
  // =========================================================================
  {
    slug: 'high-intent-search-campaigns',
    serviceCategory: 'ppc',
    serviceCategoryName: 'Performance Ads',
    parentHref: '/services/ppc',
    title: 'High-Intent Google Search Campaigns',
    tagline: 'Precision Search Bidding Engineered for Immediate Qualified Inquiries',
    badge: 'PAID SEARCH ARCHITECTURE',
    heroHeadline: 'Stop Wasting Ad Spend on Low-Intent Clicks.',
    heroSubheadline:
      'We engineer Google Ads campaigns with exact-match negative keyword scrubbing, Single-Theme Ad Groups (STAGs), and value-based bidding. Every ad dollar is routed strictly to high-value prospects actively looking to buy.',
    heroVideo: {
      mp4: '/videos/services/ppc-phase-0.mp4',
      webm: '/videos/services/ppc-phase-0.webm',
      poster: '/videos/services/ppc-phase-0-poster.webp',
    },
    heroImage: '/images/screens/naturopath/poster-480.webp',
    statPill: {
      label: 'Average ROAS on Ad Spend',
      value: '5.2x Verified',
    },
    guideIntroduction:
      'Most businesses waste 40% of their Google Ads budget on generic queries and automated "smart" bidding traps. We apply rigorous engineering discipline: tightly structured campaigns, aggressive negative query harvesting, and custom landing page matching.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Negative Keyword & Waste Scrubbing Audit',
        description:
          'We audit historical search term reports to identify and block informational queries, student searches, and competitor misclicks.',
        deliverables: ['500+ master negative keyword library', 'Search term waste elimination report', 'Budget reallocation plan'],
      },
      {
        phase: 'Phase 02',
        title: 'Single-Theme Ad Group (STAG) Rebuild',
        description:
          'We organize campaigns into hyper-focused theme ad groups with 1:1 message match between search query, ad copy, and landing page.',
        deliverables: ['STAG campaign structure', 'Responsive Search Ad (RSA) copy variations with 15 pinned headlines', 'Ad asset extensions (Callouts, Sitelinks, Structured Snippets)'],
      },
      {
        phase: 'Phase 03',
        title: 'First-Party Conversion Value Tracking',
        description:
          'We deploy server-side Google Tag Manager and enhanced conversions to feed offline sales data directly back into Google AI bidding.',
        deliverables: ['Server-side Google Ads conversion tag', 'Enhanced conversions with SHA-256 hashed customer parameters', 'Call tracking integration (CallRail / Delacon)'],
      },
      {
        phase: 'Phase 04',
        title: 'Algorithmic Bid Optimization & Scaling',
        description:
          'Continuous Target CPA / Target ROAS tuning, device bid adjustments, and time-of-day scheduling to maximize conversion volume during business hours.',
        deliverables: ['Bid strategy performance matrix', 'Day-parting efficiency report', 'Monthly executive revenue attribution report'],
      },
    ],
    keyBenefits: [
      {
        title: 'Guaranteed 40%+ Waste Elimination',
        description: 'Stops ad spend from being eaten by irrelevant search queries and low-intent click farms.',
      },
      {
        title: 'Highest Quality Score in the Auction',
        description: 'Tightly aligned ad copy and dedicated landing pages drive 8/10 to 10/10 Quality Scores, reducing Cost Per Click (CPC) by up to 35%.',
      },
      {
        title: 'Full Revenue Transparency',
        description: 'Tracks every phone call, form inquiry, and closed deal back to the exact keyword that generated it.',
      },
    ],
    review: {
      clientName: 'Liam O’Connor',
      clientRole: 'Founding Partner',
      company: 'Saltbush Conveyancing Sydney',
      quote:
        'Before working with Lead Edge, we were spending $8,000/month on Google Ads with unpredictable results. They rebuilt our campaigns from scratch. Within 60 days, our cost per lead dropped from $190 to $68, and our monthly case intake surged.',
      rating: '5.0 ★★★★★',
      metric: '-64% Cost Per Lead',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      {
        question: 'How do you prevent Google from spending money on irrelevant broad match searches?',
        answer:
          'We use strict phrase and exact match bidding alongside rigorous negative keyword lists updated weekly. We never allow Google automated settings to expand into non-commercial queries without validation.',
      },
      {
        question: 'What is a good Quality Score and why does it reduce costs?',
        answer:
          'Google assigns a Quality Score from 1 to 10 based on expected CTR, ad relevance, and landing page experience. High Quality Scores (8-10) receive discounted auction prices, allowing you to outrank competitors while paying lower CPCs.',
      },
      {
        question: 'Do you track phone calls generated by Google Ads?',
        answer:
          'Yes. We implement dynamic number insertion (DNI) that swaps website phone numbers dynamically, tracking the exact campaign, ad, and keyword that triggered the phone call.',
      },
      {
        question: 'Is there a minimum monthly ad spend required?',
        answer:
          'We recommend a minimum media spend of $2,000 to $3,000 per month so the campaign can gather enough statistical conversion data to optimize effectively.',
      },
    ],
  },

  {
    slug: 'meta-ads-scaling',
    serviceCategory: 'ppc',
    serviceCategoryName: 'Performance Ads',
    parentHref: '/services/ppc',
    title: 'Meta Ads (Instagram & Facebook) Scaling',
    tagline: 'High-Converting Creative Hook Testing & Full-Funnel Paid Social',
    badge: 'PAID SOCIAL ACQUISITION',
    heroHeadline: 'Turn Cold Attention into Committed Inquiries on Meta.',
    heroSubheadline:
      'We combine rapid creative hook iteration, first-party Conversions API (CAPI) tracking, and custom video storyboards to scale customer acquisition on Instagram and Facebook profitably.',
    heroVideo: {
      mp4: '/videos/services/ppc-phase-1.mp4',
      webm: '/videos/services/ppc-phase-1.webm',
      poster: '/videos/services/ppc-phase-1-poster.webp',
    },
    heroImage: '/images/screens/dance-studio/poster-480.webp',
    statPill: {
      label: 'Average Customer Acquisition Cost',
      value: '-38% Reduction',
    },
    guideIntroduction:
      'After iOS 14.5, native Meta pixel tracking degraded significantly. We deploy server-side Conversions API (CAPI) with 9.0+ Event Quality Scores and test 10+ visual creative hooks per week to reliably scale ad spend.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'CAPI & First-Party Data Architecture',
        description:
          'Deploy server-side Meta Conversions API via Cloudflare / AWS to restore 100% conversion attribution and bypass browser ad blockers.',
        deliverables: ['Server-side Meta CAPI setup', '9.0+ Event Quality Match score', 'Custom offline event sync'],
      },
      {
        phase: 'Phase 02',
        title: 'Modular Creative Production & Hook Testing',
        description:
          'We script, design, and produce high-contrast video hooks, user-generated content (UGC), and carousel graphics designed for mobile feeds.',
        deliverables: ['Weekly batch of 8-12 creative variations', '3-second thumbstop hook analysis', 'Story and Reel 9:16 vertical video assets'],
      },
      {
        phase: 'Phase 03',
        title: 'Broad Targeting & Dynamic Creative Funnels',
        description:
          'We leverage Meta Advantage+ algorithms with strict value constraints and customized excluded audiences to acquire new customers efficiently.',
        deliverables: ['Advantage+ audience segmentation', '7-day and 30-day dynamic retargeting funnels', 'Offer & lead magnet testing'],
      },
      {
        phase: 'Phase 04',
        title: 'Fatigue Mitigation & Systematic Budget Scaling',
        description:
          'We rotate creative before performance drops, scaling budget by 20% increments on winning ad sets.',
        deliverables: ['Creative fatigue radar dashboard', 'Budget scaling log', 'Blended ROAS & MER tracking report'],
      },
    ],
    keyBenefits: [
      {
        title: 'Restored 100% Tracking Attribution',
        description: 'Server-side CAPI ensures Meta’s algorithm receives accurate conversion feedback, lowering acquisition costs.',
      },
      {
        title: 'Never Run Out of Winning Ads',
        description: 'Weekly creative testing guarantees a continuous pipeline of fresh visual hooks that beat ad fatigue.',
      },
      {
        title: 'High-Converting Mobile Funnels',
        description: 'Direct-to-landing-page flows engineered to convert social traffic into qualified booked inquiries.',
      },
    ],
    review: {
      clientName: 'Chloe Sutherland',
      clientRole: 'Creative Director',
      company: 'Peppergum Steps Studio',
      quote:
        'Lead Edge transformed our social advertising. Their vertical video creative and server-side tracking doubled our student enrollment for Term 1 while cutting our cost per student acquisition by 38%.',
      rating: '5.0 ★★★★★',
      metric: 'Term 1 at 100% Capacity',
      image: '/images/about/about-team-creative.webp',
    },
    faqs: [
      {
        question: 'Why is server-side Meta CAPI necessary?',
        answer:
          'Traditional browser tracking pixels lose 20-30% of conversions due to iOS privacy controls and browser ad-blockers. Conversions API transmits event data directly from your server to Meta, ensuring complete data accuracy.',
      },
      {
        question: 'Who produces the video and image creative for our ads?',
        answer:
          'Our in-house creative team writes the scripts, edits the footage, designs the overlays, and delivers completed 9:16 vertical and 4:5 feed formats ready for launch.',
      },
      {
        question: 'How often do you refresh ad creative?',
        answer:
          'We refresh and test new creative weekly or bi-weekly to prevent ad fatigue and keep Click-Through Rates (CTR) high.',
      },
      {
        question: 'Can Meta ads work for B2B or professional services?',
        answer:
          'Yes. We use executive thought-leadership hooks, case study carousel breakdowns, and targeted lead forms to acquire high-value B2B clients on Instagram and Facebook.',
      },
    ],
  },

  // =========================================================================
  // WEB ARCHITECTURE (Category: web)
  // =========================================================================
  {
    slug: 'nextjs-react-applications',
    serviceCategory: 'web',
    serviceCategoryName: 'Web Architecture',
    parentHref: '/services/web-development',
    title: 'Next.js 15 & React 19 Applications',
    tagline: 'High-Performance Edge Architecture & 100 Lighthouse Mobile Engineering',
    badge: 'MODERN WEB ENGINEERING',
    heroHeadline: 'Sub-Second Page Loads. Zero Lag. Built to Get You Booked.',
    heroSubheadline:
      'We replace bloated, slow WordPress templates with hand-crafted Next.js 15 applications. Compiled statically at the edge for 0.4s load times, perfect 100 Lighthouse performance, and conversion-engineered user interfaces.',
    heroVideo: {
      mp4: '/videos/services/web-development-phase-0.mp4',
      webm: '/videos/services/web-development-phase-0.webm',
      poster: '/videos/services/web-development-phase-0-poster.webp',
    },
    heroImage: '/images/screens/electrician/poster-480.webp',
    statPill: {
      label: 'Average Mobile Load Time',
      value: '0.4 Seconds',
    },
    guideIntroduction:
      'A 1-second delay in page load time reduces mobile conversion rates by up to 20%. Our Next.js 15 architecture pairs React Server Components with global edge caching to deliver instantaneous web experiences.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Information Architecture & Conversion UX Wireframing',
        description:
          'We design every page layout for maximum mobile readability, clear visual hierarchy, and frictionless inquiry pathways.',
        deliverables: ['Figma mobile & desktop prototype', 'High-contrast design system with WCAG AA compliance', 'Click-to-book user flow'],
      },
      {
        phase: 'Phase 02',
        title: 'React 19 Server Components & Clean Code Build',
        description:
          'We write lightweight TypeScript code with minimal dependencies, utilizing server components to send zero unused JavaScript to the client.',
        deliverables: ['Next.js 15 code repository', 'Tailwind CSS utility styling', 'Responsive modular component library'],
      },
      {
        phase: 'Phase 03',
        title: 'Global Edge Caching & Asset Pipeline Optimization',
        description:
          'Images are automatically compressed into modern WebP/AVIF formats and delivered through global CDNs with sub-40ms TTFB.',
        deliverables: ['Automated image optimization pipeline', 'Edge caching headers configuration', '100% Core Web Vitals score'],
      },
      {
        phase: 'Phase 04',
        title: 'CRM, Analytics & Conversion Webhook Integration',
        description:
          'Direct integration with your booking calendar, Stripe checkout, CRM (HubSpot, Salesforce, Cliniko), and analytics tools.',
        deliverables: ['Automated inquiry webhook pipeline', 'Google Analytics 4 & Tag Manager setup', 'Enterprise security SSL & DNS configuration'],
      },
    ],
    keyBenefits: [
      {
        title: '0.4s Instant Mobile Load Speeds',
        description: 'Pages render instantly on mobile 4G networks, keeping bounce rates under 15% and boosting conversion rates.',
      },
      {
        title: '100 Lighthouse Performance Score',
        description: 'Achieves perfect marks across Performance, Accessibility, Best Practices, and SEO in Google audits.',
      },
      {
        title: 'Zero Plugin Bloat & Bank-Grade Security',
        description: 'No fragile WordPress plugins, database vulnerabilities, or malicious script injection vectors.',
      },
    ],
    review: {
      clientName: 'Harrison Cole',
      clientRole: 'Managing Director',
      company: 'Earthpin Electrical Systems',
      quote:
        'Moving our site from WordPress to Lead Edge’s Next.js platform was like going from a tractor to a Porsche. Our site loads in 0.4 seconds, our Google Ads Quality Score jumped to 10/10, and our lead conversion rate shot up by 42%.',
      rating: '5.0 ★★★★★',
      metric: '0.4s Instant Load Time',
      image: '/images/about/about-hero.webp',
    },
    faqs: [
      {
        question: 'Why is Next.js superior to WordPress for small business websites?',
        answer:
          'WordPress relies on heavy database calls and dozens of third-party plugins that cause slow loading, security exploits, and plugin conflicts. Next.js prerenders static pages at the edge, loading in 0.4 seconds with zero maintenance overhead.',
      },
      {
        question: 'How do we make text and photo edits after the site goes live?',
        answer:
          'With our $249/mo all-inclusive plan, we handle unlimited text, photo, and price updates on 24-hour turnaround. You simply email or message us what you need changed.',
      },
      {
        question: 'Do you provide website hosting?',
        answer:
          'Yes. Ultra-fast, global edge cloud hosting with SSL certificates, daily backups, and 99.99% uptime monitoring is fully included.',
      },
      {
        question: 'Can you integrate our existing booking or scheduling software?',
        answer:
          'Yes. We seamlessly embed and integrate all major scheduling tools including Cliniko, Calendly, Acuity, Timely, ServiceM8, and custom CRM webhooks.',
      },
    ],
  },

  // =========================================================================
  // SOCIAL & CREATIVE (Category: social)
  // =========================================================================
  {
    slug: 'editorial-video-production',
    serviceCategory: 'social',
    serviceCategoryName: 'Social & Creative',
    parentHref: '/services/video-photo',
    title: 'Editorial & Brand Commercial Video Production',
    tagline: 'Cinematic Storytelling & Short-Form Video Engineered to Build Trust',
    badge: 'CREATIVE STUDIO',
    heroHeadline: 'Video Content That Commands Attention and Closes Clients.',
    heroSubheadline:
      'We shoot and produce broadcast-grade cinematic videos, founder story documentaries, and high-converting short-form Reels and TikToks designed to position your brand as the undisputed authority in your market.',
    heroVideo: {
      mp4: '/videos/services/video-photo-hero.mp4',
      webm: '/videos/services/video-photo-hero.webm',
      poster: '/videos/services/video-photo-hero-poster.webp',
    },
    heroImage: '/images/screens/childcare/poster-480.webp',
    statPill: {
      label: 'Average Engagement Lift',
      value: '3.6x Higher',
    },
    guideIntroduction:
      'In a crowded digital landscape, human connection builds immediate credibility. Our video production unit handles end-to-end creative direction: scripting, on-location cinematic filming, color grading, sound design, and multi-platform aspect ratio exports.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Creative Storyboarding & Narrative Direction',
        description:
          'We craft compelling interview prompts, customer transformation story arcs, and high-impact visual shot lists.',
        deliverables: ['Production shoot schedule', 'Scripted interview questions', 'Visual storyboard & location scouting'],
      },
      {
        phase: 'Phase 02',
        title: 'On-Location 4K Cinema Filming',
        description:
          'Our production crew captures cinema-grade 4K footage using cinema cameras, wireless audio microphones, and professional lighting.',
        deliverables: ['1-day or half-day dedicated video shoot', 'Founder interview footage', 'Dynamic commercial B-roll of your facility and team'],
      },
      {
        phase: 'Phase 03',
        title: 'Editorial Editing, Color Grading & Sound Mix',
        description:
          'We edit with precision pacing, dynamic motion typography, commercial music licensing, and cinema color grading.',
        deliverables: ['60-90 second flagship brand commercial', '30-second website hero background video', 'High-impact audio mix'],
      },
      {
        phase: 'Phase 04',
        title: 'Vertical Cutdowns & Social Repurposing',
        description:
          'We slice footage into 9:16 vertical short-form clips optimized for Instagram Reels, TikTok, and YouTube Shorts.',
        deliverables: ['6-10 vertical short-form video clips', 'Dynamic on-screen captions & sound effects', 'Ad-ready campaign exports'],
      },
    ],
    keyBenefits: [
      {
        title: 'Instant Professional Credibility',
        description: 'Demonstrates undeniable market authority that justifies premium pricing over competitors.',
      },
      {
        title: 'High-Converting Website Hero Videos',
        description: 'Engages visitors within the first 3 seconds and boosts average time-on-site by over 200%.',
      },
      {
        title: 'Multi-Channel Social Content Engine',
        description: 'One single production shoot provides a month’s worth of high-performing video content across all platforms.',
      },
    ],
    review: {
      clientName: 'Alexander Wright',
      clientRole: 'Founder & Principal',
      company: 'Mallee Fold Architects',
      quote:
        'Lead Edge produced our firm’s brand film and project case study videos. The cinematography was breathtaking. Our website inquiries converted at twice our previous rate, and clients consistently cite our video as the reason they chose us.',
      rating: '5.0 ★★★★★',
      metric: '2x Inquiry Conversion Rate',
      image: '/images/about/about-team-creative.webp',
    },
    faqs: [
      {
        question: 'Do you bring all camera, lighting, and audio gear to our location?',
        answer:
          'Yes. We arrive fully equipped with 4K cinema cameras, wireless lavalier microphones, softbox studio lighting, and gimbal stabilizers.',
      },
      {
        question: 'What if our team is nervous on camera?',
        answer:
          'Our directors guide you through a comfortable conversational interview format. We never force memorized scripts; we ask thoughtful questions and edit the conversation seamlessly.',
      },
      {
        question: 'How long does post-production take?',
        answer:
          'Initial rough cuts are typically delivered within 7 to 10 business days for your review and feedback.',
      },
      {
        question: 'Are music licensing fees included?',
        answer:
          'Yes. All commercial music licenses for digital, web, and paid advertising usage are 100% included with no ongoing royalty costs.',
      },
    ],
  },
];

export function getSubServiceBySlug(slug: string): SubService | undefined {
  return SUBSERVICES.find((s) => s.slug === slug);
}
