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
    heroHeadline: "TURN SEARCH VISIBILITY INTO SUSTAINABLE BUSINESS Growth.",
    tagline: "Be the answer when buyers search",
    shortDescription: "Dominate search engine rankings and capture high-intent organic traffic.",
    fullDescription:
      "Modern search engine optimization is no longer about isolated keywords or superficial tweaks. We build comprehensive technical foundations, architect topical authority across your entire domain, and secure reputable editorial mentions that establish lasting organic visibility.",
    deliverables: [
      "Technical SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Keyword Research",
      "SEO Content Strategy",
      "Organic Growth",
    ],
    features: [
      {
        title: "Strategic SEO Architecture",
        description:
          "Build SEO strategies around keyword research, search intent, and competitor analysis to reach the right audience and identify growth opportunities.",
      },
      {
        title: "Continuous Refinement & Impact",
        description:
          "Refine website performance, content, and search visibility through ongoing analysis, technical improvements, and measurable SEO actions.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "We uncover opportunities others overlook.",
        description: "Analyze your website, competitors, and search performance to identify technical issues and opportunities for organic growth.",
      },
      {
        number: "02",
        title: "We align your content with search intent.",
        description: "Discover relevant keywords and develop a content strategy that connects your business with the right audience.",
      },
      {
        number: "03",
        title: "We build a stronger search foundation.",
        description: "Improve website structure, crawlability, indexing, and backlink quality to strengthen your website's search engine performance.",
      },
      {
        number: "04",
        title: "We turn rankings into meaningful results.",
        description: "Monitor keyword rankings, organic traffic, and conversions while continuously optimizing your SEO strategy for long-term growth.",
      },
    ],
    faqs: [
      {
        question: "1. What do SEO services include?",
        answer:
          "Lead Edge Marketers provides technical SEO audits, keyword research, on-page optimization, backlink building, and local SEO services. We structure your site to earn high search rankings and drive consistent organic traffic.",
      },
      {
        question: "2. How long does SEO take to work?",
        answer:
          "Professional SEO is a long-term campaign that typically delivers noticeable keyword ranking gains and traffic growth within 3 to 6 months. Initial technical site fixes provide early traction, but lasting search engine authority builds over time.",
      },
      {
        question: "3. Which SEO metrics do you report on?",
        answer:
          "We track transparent, revenue-driving KPIs including organic keyword rankings, monthly organic traffic growth, domain authority, click-through rates (CTR), conversion rates, and total leads generated. You receive detailed monthly reports demonstrating clear campaign ROI.",
      },
      {
        question: "4. What is the difference between an SEO agency and an SEO consultant?",
        answer:
          "An SEO consultant primarily provides strategic advice, site audits, and recommendations for your internal team to execute. Lead Edge Marketers operates as a full-service SEO agency, handling strategy, technical fixes, content creation, and ongoing optimization from start to finish.",
      },
    ],
  },
  {
    id: "ppc",
    slug: "ppc",
    number: "02",
    title: "PPC Services",
    shortTitle: "PPC",
    heroHeadline: "DATA-DRIVEN META ADS THAT TURN TARGET AUDIENCES INTO customers.",
    tagline: "Targeted Facebook & Instagram ads engineered to drive instant leads and max ROAS.",
    shortDescription: "Targeted Facebook & Instagram ads engineered to drive instant leads and max ROAS.",
    fullDescription:
      "Targeted Facebook and Instagram ads engineered to drive instant leads and max ROAS. By uniting bespoke visual assets with advanced audience modeling and first-party conversion tracking (Conversions API), we scale profitability while eliminating ad fatigue.",
    deliverables: [
      "Creative Hook Diversity",
      "Active Practice",
      "Algorithmic Audience Modeling",
    ],
    features: [
      {
        title: "Visibility Without Delay",
        description:
          "Strategic campaigns and targeted technical fixes designed to strengthen your search presence and accelerate organic growth.",
      },
      {
        title: "Precision That Performs",
        description:
          "From search-focused content to on-page optimization, every detail is refined to improve rankings, build trust, and attract the right audience.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "3-Tier Funnel Architecture",
        description: "Segmenting cold discovery, mid-funnel consideration, and high-intent checkout funnels so ad spend never bleeds.",
      },
      {
        number: "02",
        title: "3x3 Creative Matrix Testing",
        description: "Deploying modular creative variations testing visual hooks, angles, and editorial copy against strict unit metrics.",
      },
      {
        number: "03",
        title: "Algorithmic Audience Modeling",
        description: "Server-side CAPI tracking and algorithmic lookalikes zeroing in on buyers with the highest lifetime purchasing intent.",
      },
      {
        number: "04",
        title: "Dynamic Efficiency Scaling",
        description: "Scaling daily budgets profitably on validated creatives while maintaining target CPA thresholds and healthy margins.",
      },
    ],
    faqs: [
      {
        question: "1. What do Facebook marketing services include?",
        answer:
          "Lead Edge Marketers handles custom ad creation, audience targeting, campaign setup, continuous A/B testing, and conversion tracking to ensure your Meta ads generate consistent leads and sales.",
      },
      {
        question: "2. How long does Facebook marketing take to show results?",
        answer:
          "Meta ads start generating website traffic and lead inquiries almost immediately after launching, with full campaign optimization and steady return on ad spend achieved within the first 2 to 4 weeks.",
      },
      {
        question: "3. How much does a Facebook marketing agency cost?",
        answer:
          "Agency fees depend on your total monthly ad spend and project goals, with Lead Edge Marketers offering flexible performance retainers designed to maximize your profit and return on investment.",
      },
      {
        question: "4. Should I use Advantage+ or manual targeting on Facebook?",
        answer:
          "Advantage+ uses Meta's AI algorithms to reach broad potential buyers fast, while manual targeting lets us focus on specific niche demographics; we often test both to find what delivers the lowest cost per lead.",
      },
      {
        question: "5. Are Facebook Groups worth it for a small business?",
        answer:
          "Yes, running or participating in active Facebook Groups helps build direct community trust, though combining group engagement with targeted paid ads yields much faster lead generation.",
      },
    ],
  },
  {
    id: "social-media",
    slug: "social-media",
    number: "03",
    title: "Social Media Services",
    shortTitle: "Social Media",
    heroHeadline: "CULTIVATE AN ENGAGED AUDIENCE THAT ADVOCATES FOR YOUR BRAND.",
    tagline: "Content built to build loyal brand communities.",
    shortDescription:
      "Scale your brand reach with Lead Edge Marketers. We craft targeted social media marketing campaigns that drive engagement, build authority, and generate high-converting leads across all platforms.",
    fullDescription:
      "Content built to build loyal brand communities. Scale your brand reach with Lead Edge Marketers. We craft targeted social media marketing campaigns that drive engagement, build authority, and generate high-converting leads across all platforms.",
    deliverables: [
      "Editorial Content Calendars",
      "High-Retention Vertical Video",
      "Distinct Brand Voice",
      "Proactive Community Care",
      "Organic Demand Attribution",
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
    title: "Web Development",
    shortTitle: "Web Dev",
    heroHeadline: "DIGITAL EXPERIENCES ENGINEERED FOR SPEED, ELEGANCE AND CONVERSION.",
    tagline: "High-speed sites engineered to turn clicks into clients.",
    shortDescription:
      "Build high-converting, lightning-fast websites with Lead Edge Marketers. Our SEO-first web development creates sub-second speed sites engineered to capture search traffic and scale revenue.",
    fullDescription:
      "High-speed sites engineered to turn clicks into clients. Build high-converting, lightning-fast websites with Lead Edge Marketers. Our SEO-first web development creates sub-second speed sites engineered to capture search traffic and scale revenue.",
    deliverables: [
      "Sub-Second Core Vitals",
      "Bespoke Next.js Engine",
      "Fluid Device Geometry",
      "Zero Theme Bloat",
      "Conversion-Focused Funnels",
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

export const placeholderServices: ServiceItem[] = [];

export function getActiveServices(includePlaceholders = false): ServiceItem[] {
  return confirmedServices;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  if (slug === 'meta-ads') {
    return confirmedServices.find((s) => s.slug === 'ppc');
  }
  return confirmedServices.find((s) => s.slug === slug);
}
