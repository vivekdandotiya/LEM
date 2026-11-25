import { socialMediaContent } from "@/data/content/social-media";

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
  // =========================================================================
  // 1. SEARCH ENGINE OPTIMIZATION (SEO)
  // =========================================================================
  {
    id: "seo",
    slug: "seo",
    number: "01",
    title: "Search Engine Optimization (SEO)",
    shortTitle: "SEO",
    heroHeadline: "TURN SEARCH VISIBILITY INTO PREDICTABLE BUSINESS GROWTH.",
    tagline: "Be directly in front of customers actively searching for what you offer",
    shortDescription:
      "Search Engine Optimization (SEO) services are a strategic blend of technical engineering, high-intent content creation, and digital authority building designed to put your business directly in front of customers actively searching for what you offer.",
    fullDescription:
      "Rather than renting attention through ads that stop working the moment your budget pauses, professional SEO builds a compounding digital asset. We align your website’s architecture, messaging, and online reputation with how modern search engines and AI-powered answer engines evaluate trust, relevance, and user experience. The goal isn’t just higher rankings or vanity traffic; it’s attracting qualified prospects ready to inquire, book, or buy.",
    deliverables: [
      "On-Page SEO",
      "Off-Page SEO",
      "Local SEO",
      "Technical SEO (AEO & GEO)",
    ],
    features: [
      {
        title: "Intent-Driven Traffic",
        description:
          "Capture buyers at the exact moment they are searching for your solution, filtering for qualified prospects ready to inquire, book, or buy.",
      },
      {
        title: "Compounding ROI",
        description:
          "Build long-term organic visibility that lowers customer acquisition costs over time and acts as an enduring digital asset.",
      },
      {
        title: "Future-Ready Search Presence",
        description:
          "Optimize for both traditional Google search results and AI-generated answer engines like ChatGPT, Google AI Overviews, and Perplexity.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "1. On-Page SEO",
        description:
          "Making every page on your website clear, helpful, and easy to find through search term research, engaging copy, better search headlines, and intuitive layouts.",
      },
      {
        number: "02",
        title: "2. Off-Page SEO",
        description:
          "Building your reputation, authority, and brand visibility across the internet through high-quality backlinks, guest posting, Reddit discussions, and competitor research.",
      },
      {
        number: "03",
        title: "3. Local SEO",
        description:
          "Helping nearby customers find, trust, and choose you first in your area with Google Business Profile setup, optimization, regular GBP posts, and citation reviews.",
      },
      {
        number: "04",
        title: "4. Technical SEO (AEO & GEO)",
        description:
          "Making sure your website runs fast, works smoothly, and speaks the language of Google and AI with custom schema, robots.txt, and llms.txt implementation.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between On-Page and Off-Page SEO?",
        answer:
          "On-page SEO improves the words, headings, and layout on your actual web pages so search engines and visitors immediately understand your offers. Off-page SEO focuses on external trust signals—such as high-quality backlinks, media features, and community mentions—that prove to search engines your business is credible and worth ranking first.",
      },
      {
        question: "How do AEO and GEO (Answer & Generative Engine Optimization) work?",
        answer:
          "Beyond traditional keyword indexing, we implement structured schema markup and llms.txt files so AI search engines like Google AI Overviews, ChatGPT Search, and Perplexity can ingest your verified business data and cite your brand in conversational AI answers.",
      },
      {
        question: "How long does professional SEO take to compound results?",
        answer:
          "Unlike paid ads that stop the moment spend pauses, SEO builds lasting asset equity. Initial technical crawling fixes and local map pack updates show traction within weeks, with compounding organic rankings and qualified inbound inquiries accelerating over 3 to 6 months.",
      },
      {
        question: "Do you guarantee #1 rankings on Google?",
        answer:
          "No ethical agency can guarantee specific algorithmic positions, but we guarantee transparent execution: technical health, high-intent content, authoritative backlinks, and clear monthly revenue attribution tracking.",
      },
    ],
  },

  // =========================================================================
  // 2. META & PAID ADS (PPC)
  // =========================================================================
  {
    id: "ppc",
    slug: "ppc",
    number: "02",
    title: "Meta Ads & Paid Social Advertising",
    shortTitle: "Meta Ads",
    heroHeadline: "TURN FACEBOOK & INSTAGRAM ADS INTO A PREDICTABLE PIPELINE OF BUYERS.",
    tagline: "Planned, launched, tested, and scaled around real business outcomes",
    shortDescription:
      "Running paid social ads shouldn’t feel like guessing with your budget or watching clicks go nowhere. We plan, launch, test, and scale high-performing Facebook and Instagram campaigns designed around real business outcomes—qualified leads, booked calls, and profitable sales.",
    fullDescription:
      "Every campaign runs inside your own ad account with clear tracking, disciplined budget controls, and fresh creative variations built to stop the scroll without burning out your audience. We combine broad and AI-assisted delivery with warm retargeting and customer lookalikes to capture ready buyers.",
    deliverables: [
      "Campaign Strategy & Funnel Alignment",
      "Scroll-Stopping Ad Creative & Copy",
      "Tracking, Pixel & Conversions API Setup",
      "Budget Control, Optimization & Scaling",
    ],
    features: [
      {
        title: "Account Ownership",
        description:
          "Your Business Manager, ad account, and data stay yours always. You pay Meta directly with zero ad spend markup.",
      },
      {
        title: "Conversion-First Tracking",
        description:
          "Pixel and Conversions API (CAPI) setup ensures optimization follows real leads and purchases rather than vanity clicks.",
      },
      {
        title: "Ongoing Creative Refresh",
        description:
          "New visual hooks, vertical Reels, and messaging angles are tested systematically to fight ad fatigue and scale profit.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Campaign Strategy & Funnel Alignment",
        description:
          "Goal-driven setup structuring campaigns around qualified leads and purchases, combining broad AI delivery with warm retargeting and landing page fit.",
      },
      {
        number: "02",
        title: "Scroll-Stopping Ad Creative & Copy",
        description:
          "Producing distinct visual hooks, vertical video Reels, carousels, and actionable copy that earns attention in the first 3 seconds.",
      },
      {
        number: "03",
        title: "Tracking, Pixel & Conversions API Setup",
        description:
          "Pairing browser and server-side tracking (CAPI) to bypass iOS cookie degradation and connect ad spend to actual inquiries and sales.",
      },
      {
        number: "04",
        title: "Budget Control, Optimization & Scaling",
        description:
          "Active spend and bid monitoring, trimming wasted spend early, and methodically scaling winning campaigns while protecting profit margins.",
      },
    ],
    faqs: [
      {
        question: "Do you take a percentage markup on our ad spend?",
        answer:
          "Never. You link your credit card directly to Meta and pay ad costs at cost. We charge a flat, transparent monthly management fee so our only incentive is maximizing your return on investment.",
      },
      {
        question: "How often do you test new ad creatives?",
        answer:
          "We test fresh visual hooks, video Reels, and ad copy variations weekly. This continuous creative diversity prevents ad fatigue and keeps customer acquisition costs low as budget scales.",
      },
      {
        question: "How do you track conversions after Apple iOS privacy changes?",
        answer:
          "We engineer direct server-to-server Conversions API (CAPI) pipelines that bypass browser cookie blocks, providing a 9.8/10 Event Match Quality score and reliable attribution data.",
      },
    ],
  },

  // =========================================================================
  // 3. SOCIAL MEDIA MANAGEMENT
  // =========================================================================
  {
    id: "social-media",
    slug: "social-media",
    number: "03",
    title: "Social Media Management Services",
    shortTitle: "Social Media",
    heroHeadline: "KEEP YOUR BRAND ACTIVE, VISIBLE, AND CONNECTED—WITHOUT LIVING ON SOCIAL MEDIA.",
    tagline: "Tailored posts, community engagement, and clear monthly tracking",
    shortDescription:
      "Keep your brand active, visible, and connected—without living on social media. Clean profile polish, native content planning, responsive community care, and plain-English performance insights.",
    fullDescription:
      "Consistent, platform-native social media builds lasting brand equity and warm customer trust. We manage your day-to-day accounts, plan posts in advance around your real business goals, respond warmly to comments and DMs, and continuously adjust topics based on real audience engagement.",
    deliverables: [
      "Account & Profile Management",
      "Content Planning & Platform Adaptation",
      "Community Engagement & Inbox Care",
      "Performance Tracking & Monthly Adjustments",
    ],
    features: [
      {
        title: "Clean Day-to-Day Account Care",
        description:
          "Keeping handles, bios, visuals, and links aligned with current offers while working securely through proper role permissions.",
      },
      {
        title: "Platform-Specific Formatting",
        description:
          "Posts tailored to how people actually use each platform (Instagram, Facebook, LinkedIn, YouTube) with a clear calendar approval workflow.",
      },
      {
        title: "Trust & Community Care",
        description:
          "Turning comments and DMs into warm leads with natural, brand-aligned responses and smart escalation to your sales team.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Account & Profile Management",
        description:
          "Profile and bio polish, secure role permissions so your business always retains ownership, and reliable scheduled publishing.",
      },
      {
        number: "02",
        title: "Content Planning & Platform Adaptation",
        description:
          "Monthly content calendar mapped around promotions and seasons, platform-specific formatting, and clear approval workflows.",
      },
      {
        number: "03",
        title: "Community Engagement & Inbox Care",
        description:
          "Timely, friendly replies to comments and direct messages, smart lead routing for sales inquiries, and audience connection.",
      },
      {
        number: "04",
        title: "Performance Tracking & Monthly Adjustments",
        description:
          "Plain-English monthly reports tracking reach, engagement, and audience growth to fine-tune topics and posting rhythm.",
      },
    ],
    faqs: [
      {
        question: "Do we get to approve posts before they go live?",
        answer:
          "Yes, 100%. We map out the monthly content calendar well in advance for your review. Nothing goes live without your green light.",
      },
      {
        question: "Who replies to customer direct messages and comments?",
        answer:
          "Our team handles daily community monitoring, answering common questions in a friendly, brand-aligned voice while instantly routing sales leads or urgent customer queries to your team.",
      },
      {
        question: "Which platforms do you manage?",
        answer:
          "We manage Instagram, Facebook, LinkedIn, and YouTube, adapting content format, hooks, and tone to fit where your buyers spend their attention.",
      },
    ],
  },

  // =========================================================================
  // 4. EMAIL MARKETING SERVICES
  // =========================================================================
  {
    id: "email-marketing",
    slug: "email-marketing",
    number: "04",
    title: "Email Marketing Services",
    shortTitle: "Email Marketing",
    heroHeadline: "TURN YOUR EMAIL LIST INTO A STEADY, HIGH-ROI REVENUE CHANNEL.",
    tagline: "Own your customer asset with targeted sends, smart automation, and inbox deliverability",
    shortDescription:
      "Social algorithms change overnight and paid ads stop working the moment spend slows down—but your email list is an asset your business actually owns. Our Email Marketing Services help you stay top-of-mind, nurture leads smoothly, and turn subscribers into repeat customers without overwhelming their inbox.",
    fullDescription:
      "From writing high-converting campaigns and building smart automated sequences to cleaning up lists and setting up the right email platform, we handle the strategy, copy, design, and execution end to end.",
    deliverables: [
      "Targeted Email Campaigns",
      "Automated Email Flows",
      "Template Design & Conversion Testing",
      "Platform Setup, Migration & List Growth",
    ],
    features: [
      {
        title: "Audience-First Sends",
        description:
          "Targeted messages based on customer behavior, purchase history, and buyer stage—not one-size-fits-all blasts.",
      },
      {
        title: "Always-On Automation",
        description:
          "Timely triggered email flows that welcome new subscribers, recover abandoned browse/carts, and drive repeat orders.",
      },
      {
        title: "Inbox & Deliverability Care",
        description:
          "Clean list hygiene, hard bounce pruning, and proper SPF/DKIM authentication so your emails land in the primary inbox, not spam.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Targeted Email Campaigns",
        description:
          "Audience segmentation, natural and engaging copywriting, and planned editorial and seasonal launch calendars.",
      },
      {
        number: "02",
        title: "Automated Email Flows",
        description:
          "Welcome series, abandoned cart and browse follow-ups, and post-purchase win-back sequences sent at the exact right moment.",
      },
      {
        number: "03",
        title: "Template Design & Conversion Testing",
        description:
          "Clean, mobile-responsive brand templates and A/B testing of subject lines, preview text, and calls-to-action.",
      },
      {
        number: "04",
        title: "Platform Setup, Migration & List Growth",
        description:
          "Tool configuration on Klaviyo, Mailchimp, or ActiveCampaign, high-converting lead capture opt-ins, and deliverability protection.",
      },
    ],
    faqs: [
      {
        question: "Which email platforms do you work with?",
        answer:
          "We configure, migrate, and manage lists across all major platforms including Klaviyo, Mailchimp, ActiveCampaign, HubSpot, and Omnisend.",
      },
      {
        question: "How do automated email flows generate revenue?",
        answer:
          "Automations trigger dynamically when a prospect takes action—like joining your list or abandoning a checkout. They deliver timely, relevant value without requiring manual effort, consistently recovering lost sales 24/7.",
      },
      {
        question: "How do you protect sender reputation and prevent emails from landing in spam?",
        answer:
          "We set up proper DNS records (SPF, DKIM, DMARC), implement double opt-in safeguards, regularly prune unengaged contacts, and maintain healthy sending frequencies to protect inbox deliverability.",
      },
    ],
  },

  // =========================================================================
  // 5. WEB DEVELOPMENT
  // =========================================================================
  {
    id: "web-development",
    slug: "web-development",
    number: "05",
    title: "Web Development & Architecture",
    shortTitle: "Web Dev",
    heroHeadline: "DIGITAL EXPERIENCES ENGINEERED FOR SPEED, ELEGANCE AND CONVERSION.",
    tagline: "High-speed sites engineered to turn clicks into booked clients",
    shortDescription:
      "Build high-converting, lightning-fast websites with Lead Edge Marketers. Our SEO-first web development creates sub-second speed sites engineered to capture search traffic and scale revenue.",
    fullDescription:
      "High-speed sites engineered to turn clicks into clients. We build bespoke Next.js 15 web applications compiled at the global edge for instantaneous 0.4s mobile loads, perfect 100 Lighthouse scores, and friction-free inquiry funnels.",
    deliverables: [
      "Sub-Second Core Vitals (0.4s)",
      "Custom Next.js 15 Engine",
      "Conversion-Focused Funnels",
      "Global Edge CDN Caching",
    ],
    features: [
      {
        title: "Flawless Speed & Core Vitals",
        description:
          "Optimized static generation and modern edge caching guaranteeing near-instant page transitions, 0 layout shift, and 100 Lighthouse performance.",
      },
      {
        title: "Conversion-Led Architecture",
        description:
          "Clear buyer journeys, strategically positioned inquiry pathways, and high-converting forms engineered to turn traffic into qualified pipeline.",
      },
      {
        title: "Responsive Perfection",
        description:
          "Tested across all viewports from 320px mobile screens to 4K displays, ensuring zero horizontal overflow and native touch feel.",
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
        title: "Thorough QA, Audit & Launch",
        description: "We test accessibility, performance on 4G throttling, cross-browser compatibility, and form integrations before deployment.",
      },
    ],
    faqs: [
      {
        question: "What technology stack do you build websites with?",
        answer:
          "We primarily build with Next.js 15, React 19, TypeScript, and Tailwind CSS, backed by global serverless edge architecture on Cloudflare or Vercel.",
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
  if (slug === 'video-editing' || slug === 'video-editing-photo-creation' || slug === 'video-photo') {
    return confirmedServices.find((s) => s.slug === 'social-media');
  }
  return confirmedServices.find((s) => s.slug === slug);
}
