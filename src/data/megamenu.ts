export interface MegamenuGroup {
  category: string;
  items: { label: string; href: string; description?: string }[];
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
    countBadge: '4 core services',
    description: 'Turn search visibility into predictable, compounding business growth across Google and AI answer engines.',
    footerLink: { label: 'Explore all SEO solutions', href: '/services/seo' },
    groups: [
      {
        category: '1. On-Page SEO',
        items: [
          {
            label: 'On-Page SEO',
            href: '/services/seo/on-page-seo',
            description: 'Helpful content, buyer intent keywords & high-converting layouts.',
          },
        ],
      },
      {
        category: '2. Off-Page SEO',
        items: [
          {
            label: 'Off-Page SEO',
            href: '/services/seo/off-page-seo',
            description: 'Reputable backlinks, external authority & digital PR mentions.',
          },
        ],
      },
      {
        category: '3. Local SEO',
        items: [
          {
            label: 'Local SEO',
            href: '/services/seo/local-seo',
            description: 'Google Business Profile, Google Maps 3-pack & 5-star review velocity.',
          },
        ],
      },
      {
        category: '4. Technical SEO',
        items: [
          {
            label: 'Technical SEO (AEO & GEO)',
            href: '/services/seo/technical-seo',
            description: 'Speed, custom schema, robots.txt & structured llms.txt readiness.',
          },
        ],
      },
    ],
  },
  {
    id: 'ppc',
    name: 'Meta & Paid Ads',
    countBadge: '4 core services',
    description: 'Turn Facebook & Instagram ads into a predictable pipeline of high-intent buyers and booked calls.',
    footerLink: { label: 'Explore all paid advertising solutions', href: '/services/ppc' },
    groups: [
      {
        category: '1. Strategy & Funnel',
        items: [
          {
            label: 'Campaign Strategy & Funnel Alignment',
            href: '/services/ppc/campaign-strategy',
            description: 'Target audience mapping, offer structure & customer journey design.',
          },
        ],
      },
      {
        category: '2. Ad Creative',
        items: [
          {
            label: 'Scroll-Stopping Creative & Copy',
            href: '/services/ppc/ad-creative-copy',
            description: 'High-converting video hooks, static carousels & benefit-first copywriting.',
          },
        ],
      },
      {
        category: '3. Tracking & Telemetry',
        items: [
          {
            label: 'Tracking, Pixel & CAPI Setup',
            href: '/services/ppc/tracking-pixel-capi',
            description: 'Server-side Conversions API, clean event attribution & zero signal loss.',
          },
        ],
      },
      {
        category: '4. Optimization',
        items: [
          {
            label: 'Budget Control, Optimization & Scaling',
            href: '/services/ppc/budget-scaling',
            description: 'Daily bid management, negative exclusions & controlled budget scaling.',
          },
        ],
      },
    ],
  },
  {
    id: 'social-media',
    name: 'Social Media',
    countBadge: '4 core services',
    description: 'Keep your brand active, visible, and connected—without living on social media.',
    footerLink: { label: 'Explore all social media solutions', href: '/services/social-media' },
    groups: [
      {
        category: '1. Profile Management',
        items: [
          {
            label: 'Account & Profile Management',
            href: '/services/social-media/account-profile-management',
            description: 'Profile polish, brand aesthetics, link architecture & role ownership.',
          },
        ],
      },
      {
        category: '2. Content Planning',
        items: [
          {
            label: 'Content Planning & Platform Adaptation',
            href: '/services/social-media/content-planning-adaptation',
            description: 'Monthly editorial calendars tailored for Instagram, Facebook & LinkedIn.',
          },
        ],
      },
      {
        category: '3. Community Care',
        items: [
          {
            label: 'Community Engagement & Inbox Care',
            href: '/services/social-media/community-engagement-inbox',
            description: 'Fast friendly comment replies, DM triage & warm lead escalation.',
          },
        ],
      },
      {
        category: '4. Analytics & Growth',
        items: [
          {
            label: 'Performance Tracking & Adjustments',
            href: '/services/social-media/performance-tracking-adjustments',
            description: 'Clear monthly insights, audience growth data & continuous refinement.',
          },
        ],
      },
    ],
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    countBadge: '4 core services',
    description: 'Turn your email list into a steady, high-ROI revenue channel that compounds over time.',
    footerLink: { label: 'Explore all email marketing solutions', href: '/services/email-marketing' },
    groups: [
      {
        category: '1. Broadcast Campaigns',
        items: [
          {
            label: 'Targeted Email Campaigns',
            href: '/services/email-marketing/targeted-email-campaigns',
            description: 'Promotional launches, seasonal offers, newsletters & announcements.',
          },
        ],
      },
      {
        category: '2. Automated Flows',
        items: [
          {
            label: 'Automated Email Flows',
            href: '/services/email-marketing/automated-email-flows',
            description: 'Welcome series, abandoned cart recovery, browse re-engagement & win-backs.',
          },
        ],
      },
      {
        category: '3. Design & Testing',
        items: [
          {
            label: 'Template Design & Conversion Testing',
            href: '/services/email-marketing/template-design-testing',
            description: 'Mobile-responsive layouts, subject line A/B splits & CTA optimization.',
          },
        ],
      },
      {
        category: '4. Setup & Growth',
        items: [
          {
            label: 'Platform Setup, Migration & List Growth',
            href: '/services/email-marketing/platform-setup-deliverability',
            description: 'Klaviyo/Mailchimp integration, clean signup popups & deliverability care.',
          },
        ],
      },
    ],
  },
  {
    id: 'web',
    name: 'Web Architecture',
    countBadge: '4 core services',
    description: 'Sub-second Next.js 15 web applications and commercial booking funnels engineered to convert.',
    footerLink: { label: 'Explore all web development solutions', href: '/services/web-development' },
    groups: [
      {
        category: '1. Core Applications',
        items: [
          {
            label: 'Next.js 15 Web Applications',
            href: '/services/web-development/nextjs-15-applications',
            description: 'Modern TypeScript architecture, server components & edge rendering.',
          },
        ],
      },
      {
        category: '2. Conversion CRO',
        items: [
          {
            label: 'Conversion Rate Optimization (CRO)',
            href: '/services/web-development/conversion-rate-optimization',
            description: 'Frictionless forms, tactile trust signals & UX micro-interactions.',
          },
        ],
      },
      {
        category: '3. Performance & Speed',
        items: [
          {
            label: 'Speed & Edge Infrastructure',
            href: '/services/web-development/speed-edge-infrastructure',
            description: '100 Lighthouse performance, sub-second TTFB & global CDN caching.',
          },
        ],
      },
      {
        category: '4. Commercial Funnels',
        items: [
          {
            label: 'Custom Booking Funnels & Integrations',
            href: '/services/web-development/custom-booking-funnels',
            description: 'CRM syncing, automated booking calendars & custom webhook pipelines.',
          },
        ],
      },
    ],
  },
];
