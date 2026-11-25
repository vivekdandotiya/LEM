export interface SubServiceGuidePhase {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface SubService {
  slug: string;
  serviceCategory: string; // 'seo' | 'ppc' | 'web-development' | 'social-media' | 'email-marketing'
  serviceCategoryName: string;
  parentHref: string;
  title: string;
  tagline: string;
  badge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroVideo?: {
    mp4: string;
    webm?: string;
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
  // 1. SEARCH ENGINE OPTIMIZATION (SEO) — 4 CORE DISCIPLINES
  // =========================================================================
  {
    slug: 'on-page-seo',
    serviceCategory: 'seo',
    serviceCategoryName: 'Search & SEO',
    parentHref: '/services/seo',
    title: 'On-Page SEO',
    tagline: 'Making Every Page on Your Website Clear, Helpful, and Easy to Find',
    badge: 'ORGANIC SEARCH FOUNDATION',
    heroHeadline: 'Align Your Web Pages with What Qualified Buyers Are Searching For.',
    heroSubheadline:
      'On-page SEO is all about improving the words, headings, and layout on your actual web pages. When someone searches for what you sell, Google checks your pages to see if you have the best answer. We organize your content so both your visitors and search engines immediately understand what you offer—and why they should choose you.',
    heroVideo: {
      mp4: '/videos/catalog/seo/video-01.mp4',
      poster: '/videos/catalog/seo/video-01-poster.webp',
    },
    heroImage: '/videos/catalog/seo/video-01-poster.webp',
    statPill: {
      label: 'Average Non-Brand Organic Uplift',
      value: '+184%',
    },
    guideIntroduction:
      'High rankings start on your actual pages. Rather than stuffing random keywords, our On-Page SEO framework creates engaging, logical content architecture that answers search intent, earns user attention, and converts traffic into direct inquiries.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Finding the Right Search Terms',
        description:
          'Discovering the exact commercial and high-intent phrases your prospective customers type into Google when they are actively ready to buy.',
        deliverables: [
          'High-intent buyer query database',
          'Search intent segmentation (Commercial vs Informational)',
          'Competitor keyword conquest mapping',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Clear, Helpful Page Copy & Hierarchy',
        description:
          'Writing and organizing your core service pages and articles so visitors stay engaged, build trust in your expertise, and take action.',
        deliverables: [
          'H1, H2, and H3 semantic content outlines',
          'Service-specific copy optimization',
          'Engaging conversion-focused calls to action',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Better Search Headlines & Click CTR',
        description:
          'Crafting catchy, high-CTR page title tags and meta descriptions that make searchers click your link instead of your competitors in the search results.',
        deliverables: [
          '100% unique title tags and meta descriptions',
          'OpenGraph social share preview tags',
          'SERP snippet click-through optimization',
        ],
      },
      {
        phase: 'Phase 04',
        title: 'Easy-to-Read Page Layout & Internal Linking',
        description:
          'Structuring text, scannable bullet points, and internal contextual links so visitors and search engine bots can smoothly navigate your website.',
        deliverables: [
          'Logical site hierarchy and breadcrumb paths',
          'Topic cluster contextual internal link graph',
          'Mobile readability and scanning improvements',
        ],
      },
    ],
    keyBenefits: [
      {
        title: 'Finding the Right Search Terms',
        description: 'Discovering the exact words your customers type into Google when they are ready to buy.',
      },
      {
        title: 'Clear, Helpful Page Copy',
        description: 'Writing and organizing your service pages and blogs so visitors stay engaged and take action.',
      },
      {
        title: 'Better Search Headlines',
        description: 'Crafting catchy page titles and descriptions that make people click your link instead of competitors.',
      },
      {
        title: 'Easy-to-Read Page Layout',
        description: 'Structuring your text and internal links so visitors can smoothly navigate your site.',
      },
    ],
    review: {
      clientName: 'David MacIntyre',
      clientRole: 'Managing Director',
      company: 'Highland Commercial Group',
      quote:
        'Lead Edge reorganized our service pages and search headlines. Within 90 days, our non-brand organic search inquiries doubled without spending extra on ads.',
      rating: '5.0 / 5.0',
      metric: '+184% Organic Inquiries',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      {
        question: 'What is On-Page SEO?',
        answer:
          'On-page SEO refers to optimizing the visible content, page titles, headings, and internal linking structure directly on your website so search engines understand your offers and rank you for relevant queries.',
      },
      {
        question: 'How quickly do on-page optimizations impact rankings?',
        answer:
          'Once Google recrawls your updated pages (typically within 1 to 3 weeks), click-through rates and ranking improvements often begin showing visible traction.',
      },
    ],
  },
  {
    slug: 'off-page-seo',
    serviceCategory: 'seo',
    serviceCategoryName: 'Search & SEO',
    parentHref: '/services/seo',
    title: 'Off-Page SEO',
    tagline: 'Building Your Reputation, Authority, and Brand Visibility Across the Internet',
    badge: 'EXTERNAL DOMAIN AUTHORITY',
    heroHeadline: 'Build Brand Trust & Industry Authority That Search Engines Vouch For.',
    heroSubheadline:
      'Even if you have a great website, Google wants to know that real people and trustworthy websites vouch for you. Off-page SEO focuses on everything that happens outside your website to prove your business is credible, active, and worth recommending at the top of search results.',
    heroVideo: {
      mp4: '/videos/catalog/seo/video-02.mp4',
      poster: '/videos/catalog/seo/video-02-poster.webp',
    },
    heroImage: '/videos/catalog/seo/video-02-poster.webp',
    statPill: {
      label: 'Average Domain Authority Lift',
      value: 'DA 48+ Boost',
    },
    guideIntroduction:
      'Google evaluates authority by seeing who recommends you. Our Off-Page SEO framework earns genuine external endorsements, digital PR features, and community discussions that transfer compounding domain trust to your business.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'High-Quality Backlink Creation',
        description:
          'Earning strong, relevant links from reputable Australian and global websites that signal authentic trust and boost your search rankings.',
        deliverables: [
          'Strict editorial link acquisition roadmap',
          'Zero toxic link penalty guarantees',
          'Contextual in-content placement tracking',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Guest Posting & Editorial Features',
        description:
          'Publishing helpful, expert thought-leadership articles on established industry blogs and publications to reach new audiences and build credibility.',
        deliverables: [
          'High-tier industry publisher outreach',
          'Expert article ideation and editorial drafting',
          'Permanent canonical authority placements',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Strategic Reddit & Community Presence',
        description:
          'Participating authentically in relevant Reddit discussions and niche communities to drive real traffic, spark brand mentions, and build trust where buyers talk.',
        deliverables: [
          'Subreddit keyword and intent monitoring',
          'Helpful, non-promotional value contributions',
          'Organic referral traffic and branded search lift',
        ],
      },
      {
        phase: 'Phase 04',
        title: 'Competitor Authority Conquest',
        description:
          'Checking where your top competitors are getting featured online, uncovering their link profiles, and helping you win stronger, more visible placements.',
        deliverables: [
          'Competitor link gap matrix',
          'High-value target outreach pipeline',
          'Continuous monthly authority growth reports',
        ],
      },
    ],
    keyBenefits: [
      {
        title: 'High-Quality Backlink Creation',
        description: 'Earning strong, relevant links from reputable websites that signal trust and boost rankings.',
      },
      {
        title: 'Guest Posting (External Posting)',
        description: 'Publishing expert articles on established industry blogs to reach new audiences and build authority.',
      },
      {
        title: 'Strategic Reddit Posting',
        description: 'Participating authentically in niche communities to drive real traffic and brand trust.',
      },
      {
        title: 'Competitor Authority Research',
        description: 'Auditing top competitors to systematically win their best featured online placements.',
      },
    ],
    review: {
      clientName: 'Lachlan O’Connor',
      clientRole: 'Principal Partner',
      company: 'O’Connor & Vance Legal',
      quote:
        'The editorial links and Reddit community authority Lead Edge built for us took our legal practice from page 4 to #1 on Google for commercial litigation in Sydney.',
      rating: '5.0 / 5.0',
      metric: '#1 Legal Category Rank',
      image: '/images/about/team-1.webp',
    },
    faqs: [
      {
        question: 'Are backlinks still important for SEO?',
        answer:
          'Yes. High-quality backlinks remain one of Google’s top ranking signals. A few authoritative, relevant editorial links carry more ranking power than thousands of spam directory links.',
      },
      {
        question: 'How do you participate on Reddit safely?',
        answer:
          'We contribute genuine, expert insights to active discussions where prospective buyers seek help, building authentic brand credibility and organic referral traffic without spamming.',
      },
    ],
  },
  {
    slug: 'local-seo',
    serviceCategory: 'seo',
    serviceCategoryName: 'Search & SEO',
    parentHref: '/services/seo',
    title: 'Local SEO',
    tagline: 'Helping Nearby Customers Find, Trust, and Choose You First in Your Area',
    badge: 'LOCAL PROXIMITY CONQUEST',
    heroHeadline: 'Dominate Google Maps & Win Customers in Your Local Area.',
    heroSubheadline:
      'If you serve customers in a specific city, neighborhood, or region, Local SEO is how you win local business. When people search for services "near me" or check Google Maps, we handle everything from setting up your listing to keeping it active so locals call or visit you first.',
    heroVideo: {
      mp4: '/videos/catalog/seo/video-03.mp4',
      poster: '/videos/catalog/seo/video-03-poster.webp',
    },
    heroImage: '/videos/catalog/seo/video-03-poster.webp',
    statPill: {
      label: 'Local Phone Inquiries Uplift',
      value: '+215% Local Calls',
    },
    guideIntroduction:
      'Over 70% of local phone calls originate directly in Google’s Map 3-pack. Our Local SEO engine optimizes your Google Business Profile, unifies citations across Australian directories, and accelerates 5-star review velocity.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Google Business Profile (GBP) Creation & Verification',
        description:
          'Setting up and verifying your official Google Business Profile from scratch if you don’t have one yet, or taking over and securing ownership.',
        deliverables: [
          'Official Google Business Profile verification',
          'Clean ownership role configuration',
          'Primary & secondary category assignment',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Complete GBP Optimization & Photo Polish',
        description:
          'Fine-tuning your business categories, service areas, high-resolution geotagged photos, business hours, and descriptions so you rank higher on Google Maps.',
        deliverables: [
          'Geotagged high-resolution facility & team photos',
          'Custom product & service menu catalog',
          'Service area boundary definitions',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Regular GMB / GBP Ongoing Posting',
        description:
          'Publishing ongoing weekly updates, promotional offers, fresh photos, and company news directly on your Google profile to keep customers engaged.',
        deliverables: [
          'Weekly Google Post content scheduling',
          'Seasonal promotional announcements',
          'Active business signal generation for Google’s algorithm',
        ],
      },
      {
        phase: 'Phase 04',
        title: 'Consistent Local Listings & 5-Star Reviews',
        description:
          'Keeping your business name, address, and phone number (NAP) 100% accurate across 50+ Australian directories while helping you earn genuine customer reviews.',
        deliverables: [
          '50+ Australian directory NAP synchronization',
          'Automated SMS/Email review request funnel',
          'Review response protocol to boost ranking signals',
        ],
      },
    ],
    keyBenefits: [
      {
        title: 'Google Business Profile Creation & Verification',
        description: 'Setting up and verifying your official Google Business Profile from scratch.',
      },
      {
        title: 'Complete GBP Optimization',
        description: 'Fine-tuning categories, service areas, photos, hours, and descriptions to rank higher.',
      },
      {
        title: 'Regular GMB / GBP Posting',
        description: 'Publishing weekly updates, offers, and photos directly on your profile to signal an active business.',
      },
      {
        title: 'Consistent Local Listings & 5-Star Reviews',
        description: 'Synchronizing NAP directory citations and accelerating genuine customer review collection.',
      },
    ],
    review: {
      clientName: 'Sarah Jenkins',
      clientRole: 'Clinical Practice Director',
      company: 'Harbour Allied Health',
      quote:
        'Since Lead Edge optimized our Google Business Profile and local citations, we consistently hold the #1 Map 3-pack spot across Sydney’s eastern suburbs. New patient calls increased by over 45%.',
      rating: '5.0 / 5.0',
      metric: '#1 Map 3-Pack Dominance',
      image: '/images/about/team-1.webp',
    },
    faqs: [
      {
        question: 'Why is Google Maps ranking so critical for local businesses?',
        answer:
          'When users search on mobile for local services, Google shows the Map 3-pack above all organic links. More than 70% of clicks and calls go to those top 3 listings.',
      },
      {
        question: 'How do you handle NAP citation consistency?',
        answer:
          'We synchronize your exact business Name, Address, and Phone number across 50+ reputable Australian platforms (TrueLocal, YellowPages, Apple Maps, Bing Places) to build unbreakable local credibility.',
      },
    ],
  },
  {
    slug: 'technical-seo',
    serviceCategory: 'seo',
    serviceCategoryName: 'Search & SEO',
    parentHref: '/services/seo',
    title: 'Technical SEO (Including AEO & GEO Readiness)',
    tagline: 'Making Sure Your Website Runs Fast, Works Smoothly, and Speaks the Language of Google & AI',
    badge: 'AI & TECHNICAL CRAWL ARCHITECTURE',
    heroHeadline: 'Prepare Your Website for Google Crawlers and AI Answer Engines.',
    heroSubheadline:
      'Technical SEO is the behind-the-scenes tune-up that keeps your website healthy and future-proof. Beyond helping traditional search engines crawl your site, we also prepare your website for Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) so AI tools like ChatGPT, Google AI Overviews, and Perplexity can accurately read, understand, and recommend your business.',
    heroVideo: {
      mp4: '/videos/catalog/seo/video-04.mp4',
      poster: '/videos/catalog/seo/video-04-poster.webp',
    },
    heroImage: '/videos/catalog/seo/video-04-poster.webp',
    statPill: {
      label: 'Core Web Vitals TTFB Speed',
      value: '0.4s Fast Load',
    },
    guideIntroduction:
      'If search engines cannot crawl or parse your site cleanly, even the best content cannot rank. Our Technical SEO framework resolves server latency, injects structured JSON-LD schema, and deploys llms.txt files for AI answer citations.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Custom Schema Creation & Structured Data',
        description:
          'Adding smart, behind-the-scenes JSON-LD code that helps Google display rich details like star ratings, FAQs, prices, and services directly in search results.',
        deliverables: [
          'LocalBusiness, Organization, and Service schema',
          'Rich FAQ snippet and Article structured data',
          'Google Rich Results validation testing',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'robots.txt Setup & Optimization',
        description:
          'Configuring your robots.txt file properly so search engine bots know exactly which pages to crawl and index without wasting crawl budget on duplicate or hidden pages.',
        deliverables: [
          'Optimized robots.txt crawler directives',
          'XML sitemap submission and dynamic auto-generation',
          'Resolution of crawl bloat and server redirect chains',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'llms.txt Implementation for AEO & GEO',
        description:
          'Creating and structuring an llms.txt file so AI models and generative search engines (ChatGPT, Google AI Overviews, Perplexity) can easily ingest your core business info and cite you in AI answers.',
        deliverables: [
          'Standardized /llms.txt file deployment',
          'Entity clarification for generative search engines',
          'AI-assisted citation and prompt recommendation readiness',
        ],
      },
      {
        phase: 'Phase 04',
        title: 'Faster Speed & Mobile-First Health',
        description:
          'Speeding up page load times, fixing broken 404 links, optimizing mobile layouts, and ensuring your site works seamlessly on every phone, tablet, and computer.',
        deliverables: [
          'Sub-second Time to First Byte (TTFB) optimization',
          'Zero Cumulative Layout Shift (CLS) Core Web Vitals',
          'Next-gen WebP/AVIF asset compression pipelines',
        ],
      },
    ],
    keyBenefits: [
      {
        title: 'Custom Schema Creation',
        description: 'Adding smart structured code that helps Google display rich snippets, ratings, and FAQs.',
      },
      {
        title: 'robots.txt Setup & Optimization',
        description: 'Directing search bots properly to crawl and index priority revenue pages without crawl waste.',
      },
      {
        title: 'llms.txt Implementation for AEO & GEO',
        description: 'Creating an llms.txt file so AI models (ChatGPT, Perplexity) easily read and cite your business in AI answers.',
      },
      {
        title: 'Faster Speed & Mobile-First Health',
        description: 'Speeding up page load times and ensuring flawless performance across mobile and desktop devices.',
      },
    ],
    review: {
      clientName: 'Alexander Wright',
      clientRole: 'Principal Architect',
      company: 'Mallee Fold Studio',
      quote:
        'Implementing technical schema and llms.txt made an immediate difference. We now appear consistently in both Google AI Overviews and traditional organic searches for modern architectural design.',
      rating: '5.0 / 5.0',
      metric: '100% Core Web Vitals Score',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      {
        question: 'What is an llms.txt file and why is it important?',
        answer:
          'llms.txt is an emerging web standard designed specifically for Large Language Models. It provides AI search engines (like ChatGPT, Perplexity, and Google AI Overviews) with clean, structured text about your core services, making it easy for AI to cite your business.',
      },
      {
        question: 'How does mobile speed impact SEO rankings?',
        answer:
          'Google uses Mobile-First Indexing and evaluates Core Web Vitals (Largest Contentful Paint, First Input Delay, Cumulative Layout Shift). Sites that load in under 1 second receive preferential ranking placement over slow competitors.',
      },
    ],
  },

  // =========================================================================
  // 2. META ADS MANAGEMENT — 4 CORE DISCIPLINES
  // =========================================================================
  {
    slug: 'campaign-strategy-funnel-alignment',
    serviceCategory: 'ppc',
    serviceCategoryName: 'Meta & Paid Ads',
    parentHref: '/services/ppc',
    title: 'Campaign Strategy & Funnel Alignment',
    tagline: 'Structuring Paid Social Around Real Leads, Bookings, and Sales',
    badge: 'PAID SOCIAL FUNNEL ARCHITECTURE',
    heroHeadline: 'Turn Facebook & Instagram Traffic into a Predictable Pipeline of Buyers.',
    heroSubheadline:
      'Running paid social ads shouldn’t feel like guessing with your budget or watching clicks go nowhere. We structure your campaigns around qualified leads, booked calls, and profitable sales—never vanity engagement.',
    heroVideo: {
      mp4: '/videos/catalog/ppc/video-01.mp4',
      poster: '/videos/catalog/ppc/video-01-poster.webp',
    },
    heroImage: '/videos/catalog/ppc/video-01-poster.webp',
    statPill: {
      label: 'Average Client ROAS',
      value: '5.2x Verified ROAS',
    },
    guideIntroduction:
      'We combine broad/AI-assisted delivery with warm retargeting and customer lookalikes so prospects see the right message at the right stage, ensuring your landing pages convert high-intent traffic.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Goal-Driven Funnel Setup',
        description: 'Structuring campaigns around leads, purchases, messages, or bookings rather than superficial likes.',
        deliverables: ['Custom conversion event mapping', 'CPA threshold targets', 'Funnel staging specifications'],
      },
      {
        phase: 'Phase 02',
        title: 'Audience & Retargeting Architecture',
        description: 'Combining broad delivery with warm retargeting and customer lookalikes for maximum efficiency.',
        deliverables: ['Audience segmentation roadmap', 'Custom audience seed lists', 'Exclusion logic to prevent wasted spend'],
      },
      {
        phase: 'Phase 03',
        title: 'Landing Page & Offer Alignment',
        description: 'Ensuring your landing pages match ad messaging seamlessly so visitors convert immediately upon clicking.',
        deliverables: ['Ad-to-landing-page message match audit', 'Mobile friction reduction', 'Instant booking flow triggers'],
      },
    ],
    keyBenefits: [
      { title: 'Goal-Driven Setup', description: 'Structured around real revenue outcomes rather than vanity metrics.' },
      { title: 'Audience Modeling', description: 'AI-assisted delivery combined with warm retargeting to maximize conversion.' },
      { title: 'Offer Fit', description: 'Ensures visitors understand next steps immediately after clicking your ad.' },
    ],
    review: {
      clientName: 'Marcus Chen',
      clientRole: 'Founder',
      company: 'Kestrel Robotics Australia',
      quote:
        'Lead Edge structured our Meta ad funnel from cold discovery down to high-intent booking. Our cost per qualified acquisition dropped by 42% in our first month.',
      rating: '5.0 / 5.0',
      metric: '5.4x Verified ROAS',
      image: '/images/about/about-team-creative.webp',
    },
    faqs: [
      { question: 'Do you work in our ad account?', answer: 'Yes. You retain 100% ownership of your Business Manager, ad account, and pixel data.' },
    ],
  },
  {
    slug: 'scroll-stopping-ad-creative-copy',
    serviceCategory: 'ppc',
    serviceCategoryName: 'Meta & Paid Ads',
    parentHref: '/services/ppc',
    title: 'Scroll-Stopping Ad Creative & Copy',
    tagline: 'Creative That Earns Attention in the First 3 Seconds and Drives Action',
    badge: 'CREATIVE DIVERSITY ENGINE',
    heroHeadline: 'Multi-Angle Creative Testing That Beats Ad Fatigue.',
    heroSubheadline:
      'In modern social advertising, creative diversity is the primary lever for lower acquisition costs. We produce distinct hooks, vertical Reels, carousels, and actionable copy that stop the scroll and convert buyers.',
    heroVideo: {
      mp4: '/videos/catalog/ppc/video-02.mp4',
      poster: '/videos/catalog/ppc/video-02-poster.webp',
    },
    heroImage: '/videos/catalog/ppc/video-02-poster.webp',
    statPill: {
      label: 'Conversion Rate Uplift',
      value: '+184% CVR',
    },
    guideIntroduction:
      'We write clear headlines and body copy addressing buyer pain points, continuously testing new angles to prevent audience burnout and scale profitably.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Multi-Angle Creative Testing',
        description: 'Producing distinct visual hooks, vertical video Reels, and static carousels testing different emotional angles.',
        deliverables: ['Weekly 9:16 vertical video cutdowns', 'Visual hook variations', 'Carousel storyboards'],
      },
      {
        phase: 'Phase 02',
        title: 'Direct, Actionable Ad Copywriting',
        description: 'Writing punchy headlines and body text addressing real customer objections and next steps.',
        deliverables: ['High-contrast hook headlines', 'Benefit-led body copy variants', 'Targeted calls to action'],
      },
      {
        phase: 'Phase 03',
        title: 'Ad Fatigue Prevention',
        description: 'Rotating fresh concepts systematically before frequency climbs and performance slips.',
        deliverables: ['Creative refresh schedule', 'Winning angle iteration', 'Ad fatigue monitoring alerts'],
      },
    ],
    keyBenefits: [
      { title: 'Multi-Angle Testing', description: 'Testing visual hooks, Reels, and carousels to see what truly converts.' },
      { title: 'Direct Copy', description: 'Headlines speaking straight to customer pain points and clear next steps.' },
      { title: 'Fatigue Prevention', description: 'Rotating fresh creative concepts systematically to maintain low acquisition costs.' },
    ],
    review: {
      clientName: 'Julian Vance',
      clientRole: 'Marketing Director',
      company: 'StrideFit Activewear',
      quote: 'The weekly hook testing machine Lead Edge built keeps our Meta ads converting consistently month after month without burning out.',
      rating: '5.0 / 5.0',
      metric: '+184% CVR Uplift',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      { question: 'What formats do you test?', answer: 'We test 9:16 vertical video Reels, square carousels, problem-solution statics, and customer testimonial formats.' },
    ],
  },
  {
    slug: 'tracking-pixel-conversions-api',
    serviceCategory: 'ppc',
    serviceCategoryName: 'Meta & Paid Ads',
    parentHref: '/services/ppc',
    title: 'Tracking, Pixel & Conversions API Setup',
    tagline: 'Pairing Browser and Server-Side Tracking for Unbreakable Attribution',
    badge: 'FIRST-PARTY DATA TELEMETRY',
    heroHeadline: 'Zero Data Loss from iOS 14+ Tracking Blocks with Server-Side CAPI.',
    heroSubheadline:
      'Browser cookies lose up to 35% of conversions. We pair browser pixel tracking with direct server-side Conversions API (CAPI) pipelines so your campaigns optimize around verified revenue and high-value leads.',
    heroVideo: {
      mp4: '/videos/catalog/ppc/video-03.mp4',
      poster: '/videos/catalog/ppc/video-03-poster.webp',
    },
    heroImage: '/videos/catalog/ppc/video-03-poster.webp',
    statPill: {
      label: 'Event Match Quality Score',
      value: '9.8 / 10 Match',
    },
    guideIntroduction:
      'We link ad performance to actual inquiries, form submissions, and verified purchases rather than superficial clicks, feeding Meta’s AI pristine data.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Pixel + CAPI Alignment',
        description: 'Deploying cloud server-to-server CAPI on Cloudflare or AWS for maximum data reliability.',
        deliverables: ['Server-side GTM setup', 'Conversions API event pipeline', 'Deduplication configuration'],
      },
      {
        phase: 'Phase 02',
        title: 'Funnel & Lead Quality Visibility',
        description: 'Connecting campaigns directly to form completions, calendar bookings, and CRM revenue events.',
        deliverables: ['Custom lead milestone events', 'CRM pipeline integration', 'Looker Studio attribution dashboards'],
      },
    ],
    keyBenefits: [
      { title: 'Pixel + CAPI Alignment', description: 'Pairs browser and server tracking to reliably capture conversions.' },
      { title: 'Lead Quality Visibility', description: 'Connects ad performance to actual inquiries and sales.' },
    ],
    review: {
      clientName: 'David MacIntyre',
      clientRole: 'Managing Director',
      company: 'Highland Commercial Group',
      quote: 'Setting up server-side CAPI recovered over 30% of our untracked phone calls and form leads in Meta Ads Manager.',
      rating: '5.0 / 5.0',
      metric: '9.8 / 10 Match Quality',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      { question: 'Why is CAPI necessary?', answer: 'Browser cookies are blocked by Safari and ad-blockers; CAPI sends encrypted conversion data directly from your server to Meta for accurate attribution.' },
    ],
  },
  {
    slug: 'budget-control-optimization-scaling',
    serviceCategory: 'ppc',
    serviceCategoryName: 'Meta & Paid Ads',
    parentHref: '/services/ppc',
    title: 'Budget Control, Optimization & Scaling',
    tagline: 'Trimming Waste Early and Methodically Scaling Winning Campaigns',
    badge: 'DISCIPLINED PROFIT SCALING',
    heroHeadline: 'Scale Daily Ad Budgets While Protecting Profit Margins.',
    heroSubheadline:
      'Scaling ad spend shouldn’t mean blowing up your cost per lead. We actively monitor bids, placements, and early performance indicators to pause losers quickly and scale proven winners.',
    heroVideo: {
      mp4: '/videos/catalog/ppc/video-04.mp4',
      poster: '/videos/catalog/ppc/video-04-poster.webp',
    },
    heroImage: '/videos/catalog/ppc/video-04-poster.webp',
    statPill: {
      label: 'Average Client Spend Scaling',
      value: '+310% Profitable Scale',
    },
    guideIntroduction:
      'We protect your profitability with disciplined scaling protocols and provide plain-English monthly reviews showing exactly what worked and what we are testing next.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Active Spend & Placement Monitoring',
        description: 'Watching cost per result, device efficiency, and negative warning signs before budgets bleed.',
        deliverables: ['Daily bid management', 'Placement pruning', 'Automated budget safeguard rules'],
      },
      {
        phase: 'Phase 02',
        title: 'Methodical Budget Scaling',
        description: 'Incrementally increasing spend on validated campaigns to protect cost per acquisition.',
        deliverables: ['Horizontal scaling across lookalikes', 'Vertical budget ramp-up schedules', 'Margin protection thresholds'],
      },
    ],
    keyBenefits: [
      { title: 'Spend Monitoring', description: 'Trims waste before budgets are lost.' },
      { title: 'Smart Scaling', description: 'Increases budget on proven ads while protecting margins.' },
    ],
    review: {
      clientName: 'Marcus Chen',
      clientRole: 'CEO',
      company: 'Kestrel Robotics',
      quote: 'We scaled our monthly ad spend 4x while maintaining our target acquisition cost. Exceptional discipline.',
      rating: '5.0 / 5.0',
      metric: '4.8x ROAS Target Maintained',
      image: '/images/about/about-team-creative.webp',
    },
    faqs: [
      { question: 'How do you prevent CPA spikes when scaling?', answer: 'We scale budgets incrementally (15–20% every few days) and duplicate winning creatives into fresh broad audience buckets.' },
    ],
  },

  // =========================================================================
  // 3. SOCIAL MEDIA MANAGEMENT — 4 CORE DISCIPLINES
  // =========================================================================
  {
    slug: 'account-profile-management',
    serviceCategory: 'social-media',
    serviceCategoryName: 'Social Media',
    parentHref: '/services/social-media',
    title: 'Account & Profile Management',
    tagline: 'Clean, Up-to-Date Profiles and Smooth Day-to-Day Account Care',
    badge: 'BRAND REPUTATION POLISH',
    heroHeadline: 'Keep Your Social Profiles Polished, Secure, and Active.',
    heroSubheadline:
      'Clean day-to-day profile care. We keep your handles, bios, visuals, links, and highlights aligned with your offers, ensuring your business always retains full ownership and never goes dark.',
    heroVideo: {
      mp4: '/videos/catalog/social-media/video-01.mp4',
      poster: '/videos/catalog/social-media/video-01-poster.webp',
    },
    heroImage: '/videos/catalog/social-media/video-01-poster.webp',
    statPill: {
      label: 'Brand Consistency Score',
      value: '100% Up-To-Date',
    },
    guideIntroduction:
      'Your social profile is often the first place prospects look before booking. We maintain complete visual and messaging polish across all channels.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Profile & Bio Optimization',
        description: 'Keeping bio links, highlight covers, banners, and call-to-actions aligned with current business campaigns.',
        deliverables: ['Custom bio copywriting', 'Highlight category covers', 'Link-in-bio funnel optimization'],
      },
      {
        phase: 'Phase 02',
        title: 'Secure Access & Role Management',
        description: 'Configuring safe permissions so your business retains permanent ownership without password sharing.',
        deliverables: ['Business Manager partner access', 'Two-factor security audit', 'Role access specifications'],
      },
    ],
    keyBenefits: [
      { title: 'Profile Polish', description: 'Bios, visuals, and links always aligned with your offers.' },
      { title: 'Safe Access', description: 'Your business retains 100% ownership of every account.' },
      { title: 'Consistent Publishing', description: 'Scheduled reliably so your brand never goes dark.' },
    ],
    review: {
      clientName: 'Fiona Gallagher',
      clientRole: 'Operations Director',
      company: 'Redgum Care Centres',
      quote: 'Our social channels now look like a Fortune 500 company. Clean, active, and professional across Instagram and Facebook.',
      rating: '5.0 / 5.0',
      metric: '100% Brand Alignment',
      image: '/images/about/about-hero.webp',
    },
    faqs: [
      { question: 'Do I share my passwords with you?', answer: 'No. We request agency partner permissions through Meta Business Suite and LinkedIn Page Roles so your passwords remain private.' },
    ],
  },
  {
    slug: 'content-planning-platform-adaptation',
    serviceCategory: 'social-media',
    serviceCategoryName: 'Social Media',
    parentHref: '/services/social-media',
    title: 'Content Planning & Platform Adaptation',
    tagline: 'Posts Tailored to How People Actually Use Each Platform—Not Lazy Copy-Pasting',
    badge: 'NATIVE CONTENT ARCHITECTURE',
    heroHeadline: 'Platform-Native Content Mapped to Your Business Goals.',
    heroSubheadline:
      'We adapt captions, visuals, hooks, and formats for Instagram, Facebook, LinkedIn, and YouTube so each post feels native, supported by a clear monthly calendar approval workflow.',
    heroVideo: {
      mp4: '/videos/catalog/social-media/video-02.mp4',
      poster: '/videos/catalog/social-media/video-02-poster.webp',
    },
    heroImage: '/videos/catalog/social-media/video-02-poster.webp',
    statPill: {
      label: 'Audience Engagement Growth',
      value: '3.6x Lift',
    },
    guideIntroduction:
      'We plan posts around your seasonal promotions, launches, and service priorities, ensuring nothing goes live without your advance sign-off.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Monthly Content Planning',
        description: 'Mapping upcoming posts around your key offers, client testimonials, and industry trends.',
        deliverables: ['30-day interactive calendar preview', 'Topic theme segmentation', 'Asset staging board'],
      },
      {
        phase: 'Phase 02',
        title: 'Platform-Specific Content Design',
        description: 'Formatting 9:16 vertical Reels for Instagram, executive articles for LinkedIn, and community posts for Facebook.',
        deliverables: ['Native platform formatting', 'High-retention video hooks', 'Custom graphic assets'],
      },
    ],
    keyBenefits: [
      { title: 'Monthly Calendar', description: 'Planned in advance around your seasonal goals.' },
      { title: 'Platform-Specific Formats', description: 'Tailored for Instagram, LinkedIn, and Facebook.' },
      { title: 'Approval Workflow', description: 'Review everything in one place with your green light.' },
    ],
    review: {
      clientName: 'Alexander Wright',
      clientRole: 'Principal Architect',
      company: 'Mallee Fold Studio',
      quote: 'We review the month’s posts in 10 minutes, click approve, and our Instagram and LinkedIn run on autopilot.',
      rating: '5.0 / 5.0',
      metric: '3.6x Engagement Growth',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      { question: 'Can we suggest post topics?', answer: 'Yes! We collaborate directly with your team and integrate your project updates or photos seamlessly into the calendar.' },
    ],
  },
  {
    slug: 'community-engagement-inbox-care',
    serviceCategory: 'social-media',
    serviceCategoryName: 'Social Media',
    parentHref: '/services/social-media',
    title: 'Community Engagement & Inbox Care',
    tagline: 'Turning Comments and Direct Messages into Trust and Warm Inquiries',
    badge: 'ACTIVE COMMUNITY NURTURE',
    heroHeadline: 'Never Leave Customer Comments or Inquiries Unanswered.',
    heroSubheadline:
      'We reply promptly to comments and direct messages in a friendly, natural tone that matches your brand, while smartly routing qualified sales leads and urgent questions to your team.',
    heroVideo: {
      mp4: '/videos/catalog/social-media/video-03.mp4',
      poster: '/videos/catalog/social-media/video-03-poster.webp',
    },
    heroImage: '/videos/catalog/social-media/video-03-poster.webp',
    statPill: {
      label: 'Average Response Speed',
      value: '< 15 Mins Response',
    },
    guideIntroduction:
      'Social media is a two-way conversation. We spot recurring audience questions so we can create future content around what your buyers care about most.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Timely Daily Replies',
        description: 'Monitoring and responding to post comments and messages with brand-aligned warmth.',
        deliverables: ['Daily comment response protocol', 'Spam and troll filtering', 'Brand voice guidelines compliance'],
      },
      {
        phase: 'Phase 02',
        title: 'Smart Lead & Escalation Routing',
        description: 'Flagging genuine commercial inquiries, price questions, and service bookings for your team.',
        deliverables: ['Direct message lead capture funnel', 'Urgent issue escalation protocols', 'Audience question extraction'],
      },
    ],
    keyBenefits: [
      { title: 'Timely Replies', description: 'Warm, brand-aligned responses that build customer trust.' },
      { title: 'Smart Lead Routing', description: 'Sales inquiries flagged immediately for your team.' },
      { title: 'Audience Insights', description: 'Extracts real questions to guide future marketing.' },
    ],
    review: {
      clientName: 'Sarah Jenkins',
      clientRole: 'Director',
      company: 'Harbour Allied Health',
      quote: 'Lead Edge handles all our clinic’s Instagram DMs and comments. We’ve booked dozens of patients who simply asked a question in our inbox.',
      rating: '5.0 / 5.0',
      metric: '< 15m Response Time',
      image: '/images/about/team-1.webp',
    },
    faqs: [
      { question: 'What happens when someone asks a technical or price question?', answer: 'We use pre-approved response scripts for common queries, and immediately flag complex or high-intent inquiries to your internal staff.' },
    ],
  },
  {
    slug: 'performance-tracking-monthly-adjustments',
    serviceCategory: 'social-media',
    serviceCategoryName: 'Social Media',
    parentHref: '/services/social-media',
    title: 'Performance Tracking & Monthly Adjustments',
    tagline: 'Clear Monthly Insights That Guide Smarter Content Next Month',
    badge: 'PLAIN-ENGLISH REPORTING',
    heroHeadline: 'Track Reach, Audience Growth, and Lead Generation Without Confusion.',
    heroSubheadline:
      'We provide plain-English monthly reports tracking reach, engagement, top-performing posts, and response speed without confusing fluff, using real data to fine-tune topics and rhythm.',
    heroVideo: {
      mp4: '/videos/catalog/social-media/video-04.mp4',
      poster: '/videos/catalog/social-media/video-04-poster.webp',
    },
    heroImage: '/videos/catalog/social-media/video-04-poster.webp',
    statPill: {
      label: 'Audience Growth Rate',
      value: '+312% Growth',
    },
    guideIntroduction:
      'We analyze what worked and what didn’t to continuously improve your social reach, audience growth, and direct conversion velocity every 30 days.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Plain-English Performance Review',
        description: 'Tracking audience growth, profile clicks, and engagement benchmarks in an easy-to-read monthly summary.',
        deliverables: ['Executive monthly summary report', 'Top 5 performing content breakdown', 'Audience demographic shifts'],
      },
      {
        phase: 'Phase 02',
        title: 'Continuous Strategy Refinement',
        description: 'Using real engagement data and competitor activity to adjust content topics and posting rhythm.',
        deliverables: ['Next-month strategy adjustments', 'Topic expansion recommendations', 'Format experimentation roadmap'],
      },
    ],
    keyBenefits: [
      { title: 'Plain-English Reports', description: 'Clear insights on reach and audience growth without fluff.' },
      { title: 'Continuous Refinement', description: 'Fine-tunes topics and formats each month based on real data.' },
    ],
    review: {
      clientName: 'Fiona Gallagher',
      clientRole: 'Operations Director',
      company: 'Redgum Care Centres',
      quote: 'Their monthly reports actually make sense. We see which posts drove calls and where our audience is growing.',
      rating: '5.0 / 5.0',
      metric: '+312% Reach Expansion',
      image: '/images/about/about-hero.webp',
    },
    faqs: [
      { question: 'What metrics do you track?', answer: 'We track net audience growth, reach, post saves, profile visits, link clicks, and direct inquiry counts.' },
    ],
  },

  // =========================================================================
  // 4. EMAIL MARKETING SERVICES — 4 CORE DISCIPLINES
  // =========================================================================
  {
    slug: 'targeted-email-campaigns',
    serviceCategory: 'email-marketing',
    serviceCategoryName: 'Email Marketing',
    parentHref: '/services/email-marketing',
    title: 'Targeted Email Campaigns',
    tagline: 'Relevant, Well-Timed Campaigns Built Around Launches, Offers, and Real Needs',
    badge: 'SUBSCRIBER REVENUE ENGINE',
    heroHeadline: 'Turn Your Email List into an Asset Your Business Actually Owns.',
    heroSubheadline:
      'Social algorithms change overnight and ads stop working when spend pauses—but your email list is an asset you own. We write, design, and send segmented campaigns that keep you top of mind and drive steady sales.',
    heroVideo: {
      mp4: '/videos/catalog/ppc/video-01.mp4',
      poster: '/videos/catalog/ppc/video-01-poster.webp',
    },
    heroImage: '/videos/catalog/ppc/video-01-poster.webp',
    statPill: {
      label: 'Average Open Rate Achieved',
      value: '44.8% Open Rate',
    },
    guideIntroduction:
      'Rather than sending one-size-fits-all blasts, we segment your subscribers by behavior and interest, crafting engaging copy with focused calls-to-action.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Audience Segmentation',
        description: 'Grouping subscribers by purchase history, service interest, and engagement level so every email feels relevant.',
        deliverables: ['High-intent customer segments', 'VIP buyer lists', 'Inactive contact filters'],
      },
      {
        phase: 'Phase 02',
        title: 'Engaging Copywriting & Visual Design',
        description: 'Writing natural, engaging emails with compelling subject lines, clear hooks, and focused calls-to-action.',
        deliverables: ['Mobile-optimized responsive layouts', 'High-CTR subject line tests', 'Engaging brand copy'],
      },
      {
        phase: 'Phase 03',
        title: 'Editorial & Launch Calendars',
        description: 'Planning regular newsletters, seasonal promotions, and service announcements ahead of time.',
        deliverables: ['Quarterly campaign calendar', 'Seasonal offer sequences', 'Product/service launch roadmaps'],
      },
    ],
    keyBenefits: [
      { title: 'Audience Segmentation', description: 'Grouping subscribers so every email feels relevant.' },
      { title: 'Engaging Copy', description: 'Clear, natural writing with strong hooks and focused CTAs.' },
      { title: 'Launch Calendars', description: 'Regular newsletters and seasonal promotions planned ahead.' },
    ],
    review: {
      clientName: 'David MacIntyre',
      clientRole: 'Managing Director',
      company: 'Highland Group',
      quote: 'Our monthly email newsletter drives more repeat commercial consulting engagements than all our social channels combined.',
      rating: '5.0 / 5.0',
      metric: '44.8% Open Rate',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      { question: 'How often should we send emails?', answer: 'For most service and local businesses, 2 to 4 high-value emails per month keeps you top of mind without fatiguing subscribers.' },
    ],
  },
  {
    slug: 'automated-email-flows',
    serviceCategory: 'email-marketing',
    serviceCategoryName: 'Email Marketing',
    parentHref: '/services/email-marketing',
    title: 'Automated Email Flows',
    tagline: 'The Right Message Sent Automatically at the Exact Moment a Subscriber Acts',
    badge: 'ALWAYS-ON REVENUE AUTOMATION',
    heroHeadline: 'Recover Inquiries and Drive Repeat Orders on Autopilot.',
    heroSubheadline:
      'Automated email flows trigger dynamically when a prospect takes action. We build welcome series, abandoned cart follow-ups, and post-purchase win-back sequences that nurture leads 24/7.',
    heroVideo: {
      mp4: '/videos/catalog/ppc/video-02.mp4',
      poster: '/videos/catalog/ppc/video-02-poster.webp',
    },
    heroImage: '/videos/catalog/ppc/video-02-poster.webp',
    statPill: {
      label: 'Automated Revenue Share',
      value: '+38% Flow Revenue',
    },
    guideIntroduction:
      'Automated sequences catch high-intent prospects who showed interest but did not finish booking, nurturing them gently without aggressive discounting.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Welcome Series & Brand Introduction',
        description: 'Greeting new subscribers, sharing your brand story, setting expectations, and introducing your core solutions.',
        deliverables: ['3-part welcome automation sequence', 'Core offer introduction', 'Trust-building founder story email'],
      },
      {
        phase: 'Phase 02',
        title: 'Abandoned Cart & Inquiry Follow-Ups',
        description: 'Gently reminding shoppers or prospects who left items or booking forms behind without unnecessary discounting.',
        deliverables: ['Timed browse and cart abandonment triggers', 'Objection-clearing email copy', 'Urgency reminders'],
      },
      {
        phase: 'Phase 03',
        title: 'Post-Purchase & Re-Engagement Sequences',
        description: 'Driving repeat purchases, requesting genuine reviews, and re-engaging subscribers who have gone quiet.',
        deliverables: ['Review request automation', 'Cross-sell and repeat order triggers', 'Sunset unengaged contact flows'],
      },
    ],
    keyBenefits: [
      { title: 'Welcome Series', description: 'Greets new subscribers and introduces your brand story.' },
      { title: 'Abandoned Inquiries', description: 'Recovers high-intent prospects who did not finish booking.' },
      { title: 'Post-Purchase Flows', description: 'Drives repeat orders, reviews, and customer re-engagement.' },
    ],
    review: {
      clientName: 'Marcus Chen',
      clientRole: 'CEO',
      company: 'Kestrel Robotics',
      quote: 'The automated welcome and nurture sequence Lead Edge installed converts cold leads into qualified sales calls around the clock.',
      rating: '5.0 / 5.0',
      metric: '+38% Flow Revenue',
      image: '/images/about/about-team-creative.webp',
    },
    faqs: [
      { question: 'What is the most profitable email flow?', answer: 'The Welcome Series and the Abandoned Browse/Cart sequences typically generate the highest return per recipient.' },
    ],
  },
  {
    slug: 'template-design-conversion-testing',
    serviceCategory: 'email-marketing',
    serviceCategoryName: 'Email Marketing',
    parentHref: '/services/email-marketing',
    title: 'Template Design & Conversion Testing',
    tagline: 'Clean, Mobile-Friendly Emails Tested to Earn More Clicks and Actions',
    badge: 'HIGH-CONVERTING TEMPLATES',
    heroHeadline: 'Emails That Look Sharp on Every Phone and Desktop.',
    heroSubheadline:
      'We design responsive brand email templates that look clean, load instantly, and read effortlessly. We A/B test subject lines, send times, and button placements to steadily lift click-through rates.',
    heroVideo: {
      mp4: '/videos/catalog/ppc/video-03.mp4',
      poster: '/videos/catalog/ppc/video-03-poster.webp',
    },
    heroImage: '/videos/catalog/ppc/video-03-poster.webp',
    statPill: {
      label: 'Click-Through Rate Uplift',
      value: '+42% CTR Lift',
    },
    guideIntroduction:
      'Over 65% of emails are opened on mobile devices. We engineer responsive, accessible templates that look editorial and convert clicks into bookings.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Responsive Brand Template System',
        description: 'Designing custom layouts matching your brand typography, colors, and button styles in Klaviyo or Mailchimp.',
        deliverables: ['Mobile-first modular templates', 'Dark-mode email compatibility', 'Reusable content blocks'],
      },
      {
        phase: 'Phase 02',
        title: 'A/B Testing & Optimization',
        description: 'Experimenting with subject lines, preview text, send timing, and call-to-action placement to lift performance.',
        deliverables: ['Subject line test framework', 'Send-time optimization', 'CTR heat-mapping analysis'],
      },
    ],
    keyBenefits: [
      { title: 'Responsive Templates', description: 'Sharp, effortless reading on phones and desktops.' },
      { title: 'A/B Testing', description: 'Tests subject lines and CTAs to continuously lift performance.' },
    ],
    review: {
      clientName: 'Julian Vance',
      clientRole: 'Marketing Director',
      company: 'StrideFit',
      quote: 'Their mobile email templates increased our click-through rate by 42%. Clean, readable, and highly effective.',
      rating: '5.0 / 5.0',
      metric: '+42% CTR Lift',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      { question: 'Do you test dark mode?', answer: 'Yes. All our email templates are tested across Apple Mail, Gmail, and Outlook in both light and dark mode.' },
    ],
  },
  {
    slug: 'platform-setup-migration-list-growth',
    serviceCategory: 'email-marketing',
    serviceCategoryName: 'Email Marketing',
    parentHref: '/services/email-marketing',
    title: 'Platform Setup, Migration & List Growth',
    tagline: 'The Right Tools, Healthy Subscriber Lists, and Reliable Inbox Placement',
    badge: 'DELIVERABILITY & HYGIENE',
    heroHeadline: 'Protect Sender Reputation and Land in the Primary Inbox.',
    heroSubheadline:
      'We configure or migrate lists, templates, and automations across platforms like Klaviyo, Mailchimp, and ActiveCampaign. We build high-converting sign-up opt-ins and ensure SPF/DKIM authentication protects deliverability.',
    heroVideo: {
      mp4: '/videos/catalog/ppc/video-04.mp4',
      poster: '/videos/catalog/ppc/video-04-poster.webp',
    },
    heroImage: '/videos/catalog/ppc/video-04-poster.webp',
    statPill: {
      label: 'Inbox Placement Rate',
      value: '99.4% Deliverability',
    },
    guideIntroduction:
      'Clean hygiene avoids spam traps. We remove hard bounces and inactive addresses, verifying DNS authentication to keep your deliverability pristine.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Platform Tool Setup & Migration',
        description: 'Configuring or safely migrating subscriber lists, tags, and flows across platforms without data loss.',
        deliverables: ['Platform migration roadmap', 'Segment and tag mapping', 'Historical data verification'],
      },
      {
        phase: 'Phase 02',
        title: 'Website Lead Capture & Opt-Ins',
        description: 'Turning website visitors into subscribers with non-intrusive, relevant sign-up forms and lead magnets.',
        deliverables: ['Custom lead capture forms', 'Exit-intent opt-in modals', 'Lead magnet delivery automations'],
      },
      {
        phase: 'Phase 03',
        title: 'List Hygiene & SPF/DKIM Deliverability',
        description: 'Pruning hard bounces, verifying SPF, DKIM, and DMARC alignment to ensure emails reach the primary inbox.',
        deliverables: ['DNS authentication setup (SPF/DKIM/DMARC)', 'Inactive contact pruning', 'Deliverability health check'],
      },
    ],
    keyBenefits: [
      { title: 'Tool Setup & Migration', description: 'Safely moves lists and flows across Klaviyo, Mailchimp, or ActiveCampaign.' },
      { title: 'Lead Capture', description: 'Converts website visitors into subscribers with clean sign-up forms.' },
      { title: 'Deliverability Care', description: 'Prunes bounces and aligns SPF/DKIM to land in the inbox.' },
    ],
    review: {
      clientName: 'Alexander Wright',
      clientRole: 'Principal Architect',
      company: 'Mallee Fold Studio',
      quote: 'Migrating our list to Klaviyo and setting up SPF/DKIM authentication took our inbox deliverability to 99.4%. No more spam folder issues.',
      rating: '5.0 / 5.0',
      metric: '99.4% Deliverability',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      { question: 'What is SPF, DKIM, and DMARC?', answer: 'These are DNS security records that verify you actually sent the email, preventing spoofing and ensuring Gmail and Yahoo deliver your messages to the inbox.' },
    ],
  },

  // =========================================================================
  // 5. WEB DEVELOPMENT & ARCHITECTURE — 4 CORE DISCIPLINES
  // =========================================================================
  {
    slug: 'nextjs-react-applications',
    serviceCategory: 'web-development',
    serviceCategoryName: 'Web Development',
    parentHref: '/services/web-development',
    title: 'Next.js 15 & React Applications',
    tagline: 'High-Performance React Server Components Compiled at the Global Edge',
    badge: 'EDGE SERVER ARCHITECTURE',
    heroHeadline: 'Sub-Second Web Applications Built with Next.js 15.',
    heroSubheadline:
      'We replace slow WordPress and template websites with bespoke Next.js 15 applications statically generated and edge-cached for instant 0.4s loads and 100 Lighthouse performance.',
    heroVideo: {
      mp4: '/videos/catalog/web-development/video-01.mp4',
      poster: '/videos/catalog/web-development/video-01-poster.webp',
    },
    heroImage: '/videos/catalog/web-development/video-01-poster.webp',
    statPill: {
      label: 'Mobile Page Speed Benchmark',
      value: '0.4s Load Speed',
    },
    guideIntroduction:
      'Every 100ms of latency costs conversions. We build modern, clean React architectures that deliver instant navigation and frictionless user experiences.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'React Server Components & SSR',
        description: 'Rendering content at the global edge to achieve near-instant initial paint and eliminate layout shift.',
        deliverables: ['Next.js 15 App Router architecture', 'Server-side rendering (SSR)', 'Dynamic edge caching'],
      },
    ],
    keyBenefits: [
      { title: 'Sub-Second Speed', description: '0.4s load speed on mobile devices.' },
      { title: '100 Lighthouse', description: 'Perfect performance, accessibility, and SEO audit scores.' },
    ],
    review: {
      clientName: 'David MacIntyre',
      clientRole: 'Managing Director',
      company: 'Highland Commercial',
      quote: 'Our new Next.js site loads instantly. Bounce rates dropped by 34% immediately after launch.',
      rating: '5.0 / 5.0',
      metric: '0.4s Load Time',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      { question: 'Why use Next.js over WordPress?', answer: 'Next.js produces pre-rendered static code with zero database bloat, making it 5x to 10x faster and immune to standard WordPress security vulnerabilities.' },
    ],
  },
  {
    slug: 'conversion-rate-optimization',
    serviceCategory: 'web-development',
    serviceCategoryName: 'Web Development',
    parentHref: '/services/web-development',
    title: 'Conversion Rate Optimization (CRO)',
    tagline: 'Turning Passive Traffic into Confirmed Inquiries, Calls, and Bookings',
    badge: 'CONVERSION FUNNEL UX',
    heroHeadline: 'Friction-Free Buyer Journeys Engineered for Maximum Conversion.',
    heroSubheadline:
      'Every layout element is placed with commercial intent. We build sticky mobile call triggers, calendar booking embeds, and multi-step inquiry funnels that convert visitors into confirmed clients.',
    heroVideo: {
      mp4: '/videos/catalog/web-development/video-02.mp4',
      poster: '/videos/catalog/web-development/video-02-poster.webp',
    },
    heroImage: '/videos/catalog/web-development/video-02-poster.webp',
    statPill: {
      label: 'Direct Inquiry Conversion Lift',
      value: '+42% Form Inquiries',
    },
    guideIntroduction:
      'We eliminate decision fatigue with clear visual hierarchy, scannable value points, and single-tap inquiry actions.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Conversion Wireframe Blueprint',
        description: 'Designing user pathways that guide prospects smoothly from discovery to confirmed consultation.',
        deliverables: ['Conversion wireframes', 'Mobile-sticky CTA triggers', 'Form friction reduction'],
      },
    ],
    keyBenefits: [
      { title: 'Friction-Free Funnels', description: 'Streamlined multi-step inquiry forms.' },
      { title: '+42% Conversion', description: 'Engineered specifically to turn traffic into pipeline.' },
    ],
    review: {
      clientName: 'Lachlan O’Connor',
      clientRole: 'Partner',
      company: 'O’Connor Legal',
      quote: 'The inquiry form Lead Edge designed increased our qualified consultation bookings by 42%.',
      rating: '5.0 / 5.0',
      metric: '+42% CVR Lift',
      image: '/images/about/team-1.webp',
    },
    faqs: [
      { question: 'How do you optimize mobile conversion?', answer: 'We place thumb-friendly sticky action triggers, eliminate unnecessary form fields, and ensure instant sub-second loading.' },
    ],
  },
  {
    slug: 'speed-sub-second-edge-infrastructure',
    serviceCategory: 'web-development',
    serviceCategoryName: 'Web Development',
    parentHref: '/services/web-development',
    title: 'Speed & Global Edge Infrastructure',
    tagline: 'Sub-Second Global Edge Caching & 100 Core Web Vitals',
    badge: 'PERFORMANCE FIRST',
    heroHeadline: 'Lightning-Fast Load Times Delivered Through Edge CDN Networks.',
    heroSubheadline:
      'We deploy assets across global edge CDN networks with next-gen image compression (WebP/AVIF) and zero layout shift, ensuring your site loads instantaneously anywhere in Australia.',
    heroVideo: {
      mp4: '/videos/catalog/web-development/video-03.mp4',
      poster: '/videos/catalog/web-development/video-03-poster.webp',
    },
    heroImage: '/videos/catalog/web-development/video-03-poster.webp',
    statPill: {
      label: 'Core Web Vitals Benchmark',
      value: '100 / 100 Score',
    },
    guideIntroduction:
      'Edge infrastructure caches content geographically closest to your visitors, providing consistent sub-second speeds.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Global Edge Caching',
        description: 'Routing requests to local Sydney and Melbourne edge nodes for immediate rendering.',
        deliverables: ['Edge caching rules', 'Asset optimization pipeline', 'Zero CLS layout stabilization'],
      },
    ],
    keyBenefits: [
      { title: 'Global Edge Caching', description: 'Sub-second response times across all Australian cities.' },
      { title: 'Asset Pipelines', description: 'Automated WebP/AVIF compression with zero quality loss.' },
    ],
    review: {
      clientName: 'Sarah Jenkins',
      clientRole: 'Director',
      company: 'Harbour Health',
      quote: 'Our site loads in the blink of an eye. Patients love how fast and smooth booking an appointment feels.',
      rating: '5.0 / 5.0',
      metric: '0.4s Global Edge Load',
      image: '/images/about/team-1.webp',
    },
    faqs: [
      { question: 'What CDN do you use?', answer: 'We deploy on Vercel and Cloudflare Edge networks with server locations in Sydney, Melbourne, and Brisbane.' },
    ],
  },
  {
    slug: 'custom-lead-booking-funnels',
    serviceCategory: 'web-development',
    serviceCategoryName: 'Web Development',
    parentHref: '/services/web-development',
    title: 'Custom Lead & Booking Funnels',
    tagline: 'Direct Calendar Integrations, Multi-Step Intakes, and CRM Sync',
    badge: 'AUTOMATED INQUIRY FUNNELS',
    heroHeadline: 'Turn Website Traffic into Confirmed Appointments Automatically.',
    heroSubheadline:
      'We build custom multi-step quote calculators, calendar booking embeds, and webhook pipelines that feed leads directly into your CRM without manual data entry.',
    heroVideo: {
      mp4: '/videos/catalog/web-development/video-04.mp4',
      poster: '/videos/catalog/web-development/video-04-poster.webp',
    },
    heroImage: '/videos/catalog/web-development/video-04-poster.webp',
    statPill: {
      label: 'Lead Capture Automation',
      value: '100% Automated CRM Sync',
    },
    guideIntroduction:
      'Automated scheduling eliminates the back-and-forth email delay, securing customer appointments while buyer intent is at its highest.',
    guidePhases: [
      {
        phase: 'Phase 01',
        title: 'Interactive Booking Embeds',
        description: 'Integrating seamless calendar scheduling with SMS reminders and automatic CRM lead creation.',
        deliverables: ['Custom multi-step intake flow', 'Calendar scheduling engine', 'Webhook CRM synchronization'],
      },
    ],
    keyBenefits: [
      { title: 'Automated Scheduling', description: 'Book appointments directly on your site without back-and-forth.' },
      { title: 'CRM Sync', description: 'Feeds lead data directly into HubSpot, Salesforce, or your custom CRM.' },
    ],
    review: {
      clientName: 'Alexander Wright',
      clientRole: 'Principal Architect',
      company: 'Mallee Fold Studio',
      quote: 'Clients book strategy consultations right on our website. It has completely eliminated calendar phone tag.',
      rating: '5.0 / 5.0',
      metric: '100% Automated Intake',
      image: '/images/about/about-team-table.webp',
    },
    faqs: [
      { question: 'Which CRMs can you integrate with?', answer: 'We integrate with HubSpot, Salesforce, ActiveCampaign, Zoho, HighLevel, and custom Webhooks via Zapier or Make.' },
    ],
  },
];

// Helper to look up subservice by slug with backward compatibility aliases
export function getSubServiceBySlug(slug: string): SubService | undefined {
  // Direct match
  const direct = SUBSERVICES.find((s) => s.slug === slug);
  if (direct) return direct;

  // Legacy SEO aliases
  if (slug === 'keyword-taxonomy-mapping' || slug === 'high-intent-non-brand-capture' || slug === 'editorial-authority-pillars') {
    return SUBSERVICES.find((s) => s.slug === 'on-page-seo');
  }
  if (slug === 'competitive-gap-analysis' || slug === 'programmatic-seo-engines') {
    return SUBSERVICES.find((s) => s.slug === 'off-page-seo');
  }
  if (slug === 'local-3-pack-dominance' || slug === 'google-business-profile-optimization' || slug === 'multi-location-citation-sync') {
    return SUBSERVICES.find((s) => s.slug === 'local-seo');
  }
  if (slug === 'technical-seo-audits' || slug === 'javascript-edge-rendering' || slug === 'schema-architecture-json-ld' || slug === 'core-web-vitals-speed' || slug === 'generative-engine-optimization-geo' || slug === 'structured-llmstxt-deployment') {
    return SUBSERVICES.find((s) => s.slug === 'technical-seo');
  }

  // Legacy PPC aliases
  if (slug === 'high-intent-search-campaigns' || slug === 'performance-max-architecture') {
    return SUBSERVICES.find((s) => s.slug === 'campaign-strategy-funnel-alignment');
  }
  if (slug === 'meta-ads-scaling' || slug === 'rapid-creative-hook-testing' || slug === 'iterative-ugc-ad-variations') {
    return SUBSERVICES.find((s) => s.slug === 'scroll-stopping-ad-creative-copy');
  }
  if (slug === 'first-party-server-side-attribution' || slug === 'google-shopping-feed-optimization') {
    return SUBSERVICES.find((s) => s.slug === 'tracking-pixel-conversions-api');
  }
  if (slug === 'negative-keyword-waste-pruning' || slug === 'cross-platform-omnichannel-retargeting') {
    return SUBSERVICES.find((s) => s.slug === 'budget-control-optimization-scaling');
  }

  // Legacy Web aliases
  if (slug === 'headless-commerce-architecture' || slug === 'shopify-plus-custom-storefronts') {
    return SUBSERVICES.find((s) => s.slug === 'nextjs-react-applications');
  }
  if (slug === 'landing-page-conversion-rate-optimization' || slug === 'multi-step-lead-funnels-quote-calculators') {
    return SUBSERVICES.find((s) => s.slug === 'conversion-rate-optimization');
  }
  if (slug === 'sub-second-global-edge-caching' || slug === 'core-web-vitals-100-engineering') {
    return SUBSERVICES.find((s) => s.slug === 'speed-sub-second-edge-infrastructure');
  }
  if (slug === 'custom-booking-scheduling-engines' || slug === 'crm-webhook-pipeline-integrations') {
    return SUBSERVICES.find((s) => s.slug === 'custom-lead-booking-funnels');
  }

  // Legacy Social aliases
  if (slug === 'short-form-video-reels-tiktok' || slug === 'editorial-video-production') {
    return SUBSERVICES.find((s) => s.slug === 'content-planning-platform-adaptation');
  }
  if (slug === 'organic-instagram-community-growth' || slug === 'active-community-management-inbox-nurturing') {
    return SUBSERVICES.find((s) => s.slug === 'community-engagement-inbox-care');
  }
  if (slug === 'editorial-brand-voice-narrative-guidelines' || slug === 'linkedin-b2b-thought-leadership-publishing') {
    return SUBSERVICES.find((s) => s.slug === 'performance-tracking-monthly-adjustments');
  }

  return undefined;
}
