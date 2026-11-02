export interface ServiceStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  metric?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  heroHeadline: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  features: ServiceFeature[];
  processSteps: ServiceStep[];
  faqs: ServiceFAQ[];
  isPlaceholder?: boolean;
}

export const confirmedServices: ServiceItem[] = [
  {
    id: "seo",
    slug: "seo",
    number: "01",
    title: "Search Engine Optimization",
    shortTitle: "SEO",
    heroHeadline: "CAPTURE HIGH-INTENT DEMAND AT THE MOMENT OF SEARCH.",
    tagline: "Organic visibility engineered for sustainable, compounding commercial growth.",
    shortDescription:
      "Technical audits, deep keyword architecture, and editorial link-building that position your brand at the summit of organic search.",
    fullDescription:
      "Modern search engine optimization is no longer about isolated keywords or superficial tweaks. We build comprehensive technical foundations, architect topical authority across your entire domain, and secure reputable editorial mentions that establish lasting organic visibility.",
    deliverables: [
      "Technical SEO & Core Web Vitals Auditing",
      "Comprehensive On-Page Semantic Optimisation",
      "High-Intent Commercial Keyword Architecture",
      "Local SEO & Multi-Location Citation Mapping",
      "Editorial Link Acquisition & Digital PR",
      "Granular Organic Revenue & Conversion Reporting",
    ],
    features: [
      {
        title: "Technical Infrastructure",
        description:
          "Zero-friction crawlability, clean schema markup, and rigorous Core Web Vitals performance tuning so search bots index your commercial pages without impediment.",
      },
      {
        title: "Topical Authority Clustering",
        description:
          "Structuring content hubs that demonstrate unmatched expertise to search algorithms and answer exact prospective customer intent.",
      },
      {
        title: "Digital PR & Link Architecture",
        description:
          "Earning verified high-authority editorial references and citations that permanently elevate domain trust and ranking power.",
      },
      {
        title: "Transparent Attribution Reporting",
        description:
          "Actionable dashboards tracking keyword movement, organic impression share, assisted conversions, and bottom-line revenue pipeline.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Deep Technical & Competitor Audit",
        description: "We rigorously crawl your architecture, diagnose crawl errors, benchmark competitors, and map high-value keyword opportunities.",
      },
      {
        number: "02",
        title: "Information Architecture & On-Page Calibration",
        description: "We optimize title tags, schema entities, heading hierarchy, and internal linking structures for maximum relevance.",
      },
      {
        number: "03",
        title: "Authority Content & Outreach Execution",
        description: "We publish authoritative industry content and execute high-tier editorial outreach to capture influential backlinks.",
      },
      {
        number: "04",
        title: "Rank Tracking & Compounding Scaling",
        description: "Continuous monitoring, algorithmic adaptation, and expansion into adjacent commercial search queries.",
      },
    ],
    faqs: [
      {
        question: "How long does it typically take to see tangible SEO results?",
        answer:
          "While technical fixes can show crawling benefits within 3–6 weeks, sustained commercial ranking gains and traffic momentum generally compound over 3 to 6 months depending on domain authority and competitive density.",
      },
      {
        question: "Do you guarantee number one rankings on Google?",
        answer:
          "No reputable agency guarantees position one due to algorithmic volatility. Instead, we guarantee rigorous technical compliance, high-grade authority execution, and transparent monthly performance reporting.",
      },
      {
        question: "What does your monthly SEO reporting include?",
        answer:
          "You receive a clear executive report detailing keyword trajectory, organic search impressions, qualified click volume, assisted conversions, and ongoing technical health.",
      },
    ],
  },
  {
    id: "meta-ads",
    slug: "meta-ads",
    number: "02",
    title: "Meta Advertising & Paid Social",
    shortTitle: "Meta Ads",
    heroHeadline: "PRECISION PAID ACQUISITION THAT TURNS ATTENTION INTO REVENUE.",
    tagline: "High-converting ad creatives paired with data-backed audience architecture.",
    shortDescription:
      "Scalable customer acquisition across Facebook and Instagram driven by modular creative testing, algorithmic bidding, and full-funnel attribution.",
    fullDescription:
      "We design, produce, and manage performance-engineered paid social campaigns across Facebook and Instagram. By uniting bespoke visual assets with advanced audience modeling and first-party conversion tracking (Conversions API), we scale profitability while mitigating ad fatigue.",
    deliverables: [
      "Custom Campaign Architecture & Budget Allocation",
      "High-Impact Motion & Static Creative Production",
      "Meta Pixel & Conversions API (CAPI) Integration",
      "Lookalike & Predictive In-Market Audience Segmentation",
      "Dynamic Retargeting & Offer Sequencing",
      "Real-Time Blended ROAS & Attribution Analytics",
    ],
    features: [
      {
        title: "Iterative Creative Testing",
        description:
          "Testing modular hooks, angles, and visual formats every week to identify breakthrough ad creatives that drop customer acquisition cost.",
      },
      {
        title: "Server-Side CAPI Tracking",
        description:
          "Resilient first-party conversion tracking that overcomes browser tracking restrictions and fuels Meta's machine learning engine.",
      },
      {
        title: "Full-Funnel Value Sequencing",
        description:
          "Guiding cold prospects through brand consideration, value demonstration, and frictionless conversion offers.",
      },
      {
        title: "Rigorous Unit Economics Focus",
        description:
          "Managing campaigns against real profit margins, customer lifetime value (LTV), and target CAC thresholds.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Data Audit & Tracking Calibration",
        description: "We configure server-side Conversions API, evaluate past ad spend efficiency, and establish baseline unit economics.",
      },
      {
        number: "02",
        title: "Creative Strategy & Angle Production",
        description: "We develop compelling video and static creative assets tailored specifically to overcome common buyer objections.",
      },
      {
        number: "03",
        title: "Algorithmic Testing & Budget Ramp",
        description: "We deploy controlled test budgets across broad and interest audiences, rapidly identifying top-performing creative variations.",
      },
      {
        number: "04",
        title: "Horizontal & Vertical Scaling",
        description: "We systematically scale winning assets while rotating fresh hooks to prevent audience fatigue and protect ROAS.",
      },
    ],
    faqs: [
      {
        question: "What minimum ad spend do you recommend for Meta campaigns?",
        answer:
          "To allow Meta's machine-learning algorithm to gather sufficient conversion data (50 conversions per ad set per week), we typically recommend a minimum media budget of £2,500 – £4,000 per month.",
      },
      {
        question: "Who handles ad creative production and copywriting?",
        answer:
          "Our in-house design and copywriting team handles all creative production, including video briefs, motion graphics, carousel assets, and high-converting ad copy.",
      },
      {
        question: "How do you track conversions after iOS 14+ tracking changes?",
        answer:
          "We implement Meta Conversions API (CAPI) server-side tracking alongside clean UTM architecture and Google Analytics 4 to maintain robust attribution data.",
      },
    ],
  },
  {
    id: "social-media",
    slug: "social-media",
    number: "03",
    title: "Social Media Marketing",
    shortTitle: "Social Media",
    heroHeadline: "CULTIVATE AN ENGAGED AUDIENCE THAT ADVOCATES FOR YOUR BRAND.",
    tagline: "Distinctive brand storytelling, editorial content creation, and active community growth.",
    shortDescription:
      "Strategic content calendars, short-form video production, and intentional community management that build loyal brand equity.",
    fullDescription:
      "Social media should be a powerful brand moat, not an afterthought. We build cohesive visual identities, develop engaging editorial content calendars, produce cinematic short-form vertical videos, and foster genuine two-way conversations that transform passive followers into vocal advocates.",
    deliverables: [
      "Brand Narrative & Social Positioning Strategy",
      "Comprehensive Monthly Content Calendars",
      "Short-Form Video (Reels/Shorts/TikTok) Direction",
      "High-Fidelity Graphic Design & Carousel Storytelling",
      "Proactive Community Moderation & Outreach",
      "Monthly Engagement & Share of Voice Insights",
    ],
    features: [
      {
        title: "Editorial Brand Aesthetic",
        description:
          "Curating an elevated, cohesive visual feed that commands respect, reinforces credibility, and aligns with your luxury or corporate identity.",
      },
      {
        title: "Short-Form Video Mastery",
        description:
          "Producing trend-aware, high-retention vertical reels designed to capture organic algorithmic distribution across modern social feeds.",
      },
      {
        title: "Authentic Community Engagement",
        description:
          "Active community stewardship, initiating thoughtful discussions with industry peers and responding to prospect inquiries promptly.",
      },
      {
        title: "Influence & Partnership Mapping",
        description:
          "Identifying aligned industry creators and collaborators to organically amplify brand reach without compromising brand tone.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Brand Voice & Visual Pillar Workshop",
        description: "We define your social aesthetic pillars, core messaging themes, audience personas, and content tonality.",
      },
      {
        number: "02",
        title: "Monthly Content Batching & Pre-Approvals",
        description: "We produce copy, carousels, and video concepts one month in advance via a frictionless client preview portal.",
      },
      {
        number: "03",
        title: "Publishing, Story Management & Community Care",
        description: "We handle timed publishing across peak engagement windows, real-time comment moderation, and story interaction.",
      },
      {
        number: "04",
        title: "Analytics Review & Format Refinement",
        description: "We analyze saves, shares, and watch time to double down on formats generating the highest organic traction.",
      },
    ],
    faqs: [
      {
        question: "Which social media platforms do you manage?",
        answer:
          "We specialize in Instagram, LinkedIn, and TikTok, tailored to whether your primary target audience is B2B executive decision-makers or direct-to-consumer buyers.",
      },
      {
        question: "Do we get to approve content before it goes live?",
        answer:
          "Yes, absolutely. All visual assets, captions, and publication schedules are uploaded to a collaborative preview board for your review and sign-off well in advance.",
      },
      {
        question: "Do you supply the video assets or do we need to film them?",
        answer:
          "We offer flexible workflows: we can direct and produce assets using provided raw footage, generate high-end motion graphics, or conduct on-site creative capture days.",
      },
    ],
  },
  {
    id: "web-development",
    slug: "web-development",
    number: "04",
    title: "Web Development & UI/UX",
    shortTitle: "Web Development",
    heroHeadline: "DIGITAL EXPERIENCES ENGINEERED FOR SPEED, ELEGANCE AND CONVERSION.",
    tagline: "Bespoke digital architecture that elevates your brand and turns visitors into clients.",
    shortDescription:
      "Modern Next.js and headless architectures delivering sub-second load times, fluid micro-interactions, and conversion-optimized user flows.",
    fullDescription:
      "Your website is the single most important asset in your digital ecosystem. We architect bespoke digital flagships that unite minimalist editorial beauty with cutting-edge front-end engineering. Fast, accessible, and structured to convert, every site is crafted to elevate your market positioning.",
    deliverables: [
      "Custom UI/UX Design & Interactive Prototyping",
      "Next.js / React Modern Front-End Engineering",
      "Sub-Second Core Web Vitals & Performance Tuning",
      "Semantic WCAG 2.2 AA Accessibility Compliance",
      "Custom CMS Integration for Frictionless Content Editing",
      "Automated CI/CD Pipeline & Enterprise Edge Hosting",
    ],
    features: [
      {
        title: "Flawless Performance",
        description:
          "Optimized static generation and modern edge caching guaranteeing near-instant page transitions, 0 layout shift, and exceptional Core Web Vitals.",
      },
      {
        title: "Editorial Design Craft",
        description:
          "Typographic balance, generous whitespace, subtle glassmorphic elements, and fluid layouts designed specifically to reflect premium authority.",
      },
      {
        title: "Conversion-Led Architecture",
        description:
          "Clear buyer journeys, strategically positioned inquiry pathways, and high-converting forms engineered to turn traffic into qualified pipeline.",
      },
      {
        title: "Responsive Perfection",
        description:
          "Meticulously tested across all viewports from 320px mobile screens to 4K displays, ensuring zero horizontal overflow and native touch feel.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "User Journey & Information Architecture",
        description: "We map user personas, conversion goals, and site hierarchy to eliminate friction from discovery to inquiry.",
      },
      {
        number: "02",
        title: "High-Fidelity Editorial UI/UX Design",
        description: "We craft custom typographic layouts, responsive design tokens, and interactive component prototypes in Figma.",
      },
      {
        number: "03",
        title: "Front-End Engineering & Interaction Polish",
        description: "We build the site using modern Next.js and TypeScript, integrating fluid animations and accessible semantic markup.",
      },
      {
        number: "04",
        title: "Rigorous QA, Audit & Launch",
        description: "We test accessibility, performance on 4G throttling, cross-browser compatibility, and form integrations before deployment.",
      },
    ],
    faqs: [
      {
        question: "What technology stack do you build websites with?",
        answer:
          "We primarily build with Next.js, React, TypeScript, and Tailwind CSS, backed by headless CMS platforms or modern serverless edge architecture.",
      },
      {
        question: "Can our internal team easily update text and blog posts after launch?",
        answer:
          "Yes. We configure intuitive content management systems so your team can publish articles, update case studies, and modify copy without writing code.",
      },
      {
        question: "How do you ensure the website is fast on mobile devices?",
        answer:
          "We employ modern image formats (AVIF/WebP), responsive image srcsets, code splitting, minimal JavaScript execution, and strict font metrics optimization.",
      },
    ],
  },
];

export const placeholderServices: ServiceItem[] = [
  {
    id: "service-05-placeholder",
    slug: "email-marketing-placeholder",
    number: "05",
    title: "Email & Retention Marketing",
    shortTitle: "Email Marketing",
    heroHeadline: "LIFETIME VALUE MAXIMIZATION VIA AUTOMATED RETENTION.",
    tagline: "Awaiting Client Confirmation — Placeholder Service.",
    shortDescription: "Automated lifecycle flows, segmentation, and customer retention campaigns.",
    fullDescription: "Service 05 is currently held as an optional expansion slot pending client strategic review.",
    deliverables: ["Lifecycle Flow Architecture", "Predictive Customer Segmentation", "A/B Subject Line Testing"],
    features: [],
    processSteps: [],
    faqs: [],
    isPlaceholder: true,
  },
  {
    id: "service-06-placeholder",
    slug: "conversion-rate-optimization-placeholder",
    number: "06",
    title: "Conversion Rate Optimization",
    shortTitle: "CRO",
    heroHeadline: "SCIENTIFIC REVENUE ACCELERATION VIA USER TESTING.",
    tagline: "Awaiting Client Confirmation — Placeholder Service.",
    shortDescription: "Data-driven landing page experiments, user recordings, and checkout optimization.",
    fullDescription: "Service 06 is currently held as an optional expansion slot pending client strategic review.",
    deliverables: ["Heatmap & Session Analysis", "Hypothesis-Driven A/B Testing", "Checkout Friction Elimination"],
    features: [],
    processSteps: [],
    faqs: [],
    isPlaceholder: true,
  },
];

export function getActiveServices(includePlaceholders = false): ServiceItem[] {
  if (includePlaceholders) {
    return [...confirmedServices, ...placeholderServices];
  }
  return confirmedServices;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return confirmedServices.find((s) => s.slug === slug);
}
