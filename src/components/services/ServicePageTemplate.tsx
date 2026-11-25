'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceItem } from '@/data/services';
import { HeroTextAnimation, HeroAnimationVariant } from '@/components/shared/HeroTextAnimation';
import { StepPhotoSection, StepTransitionStyle, StepItem } from '@/components/shared/StepPhotoSection';
import { ServiceApproachSection } from '@/components/services/ServiceApproachSection';
import { WorkCard } from '@/components/shared/WorkCard';
import { Lightbox, LightboxItem } from '@/components/shared/Lightbox';
import { ServiceFaqSection } from '@/components/services/ServiceFaqSection';
import { getServiceFaqs } from '@/data/content/faqs';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface ServicePageTemplateProps {
  service: ServiceItem;
}

interface ServiceConfig {
  animationVariant: HeroAnimationVariant;
  stepTransitionStyle: StepTransitionStyle;
  heroHeadline: string;
  heroItalicWord?: string;
  heroTagline: string;
  heroImage: string;
  heroImageAlt: string;
  statementHeading: string;
  statementText: string;
  steps: StepItem[];
  relatedWorks: LightboxItem[];
}

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  seo: {
    animationVariant: 'split-reveal',
    stepTransitionStyle: 'lens',
    heroHeadline: 'Turn search visibility into sustainable business',
    heroItalicWord: 'growth.',
    heroTagline: 'Topical authority maps and technical crawl architecture compounding organic revenue.',
    heroImage: '/images/pages/P01-services-seo-hero-16x9.webp',
    heroImageAlt: 'Lead Edge technical SEO and crawl analytics workstation',
    statementHeading: 'Compounding search equity beats transactional keywords.',
    statementText:
      "We build comprehensive topical entity maps, resolve technical crawl bottlenecks, and compound organic revenue visibility.",
    steps: [
      {
        number: '01',
        name: 'Technical Crawl Audit',
        description: 'Comprehensive audit of server response headers, crawl efficiency, and Core Web Vitals bottlenecks.',
        image: {
          src: '/images/pages/P02-services-seo-audit-4x5.webp',
          alt: 'Technical SEO crawl analysis interface',
        },
        deliverable: 'Crawl Architecture Report',
      },
      {
        number: '02',
        name: 'Topical Entity Mapping',
        description: 'Semantic entity graphs and keyword clusters engineered to establish domain topical dominance.',
        image: {
          src: '/images/services/seo/seo-authority.webp',
          alt: 'Topical entity authority cluster architecture',
        },
        deliverable: 'Topical Entity Schema',
      },
      {
        number: '03',
        name: 'Editorial Authority Links',
        description: 'High-tier digital PR and organic editorial placements that build genuine domain trust.',
        image: {
          src: '/images/services/seo/seo-network.webp',
          alt: 'Editorial outreach network and digital PR roadmap',
        },
        deliverable: 'Editorial Placements',
      },
      {
        number: '04',
        name: 'Revenue Analytics Tracking',
        description: 'Transparent attribution pipelines connecting organic search impressions directly to closed revenue.',
        image: {
          src: '/images/services/seo/seo-reporting.webp',
          alt: 'Organic search revenue attribution dashboard',
        },
        deliverable: 'Revenue Attribution Model',
      },
    ],
    relatedWorks: [
      {
        id: 'w-seo-1',
        brand: 'Apex Financial',
        title: 'Topical Authority Architecture',
        category: 'SEO / Organic Search',
        image: '/images/pages/P02-services-seo-audit-4x5.webp',
        description: 'Complete semantic cluster restructuring delivering sustainable organic search authority.',
        year: '2026',
      },
      {
        id: 'w-seo-2',
        brand: 'Vanguard Health',
        title: 'Technical Crawl Optimization',
        category: 'SEO / Technical',
        image: '/images/services/seo/seo-authority.webp',
        description: 'Sub-second rendering optimization and crawl bottleneck elimination.',
        year: '2026',
      },
      {
        id: 'w-seo-3',
        brand: 'Equinox Retail',
        title: 'Editorial Link Strategy',
        category: 'SEO / Digital PR',
        image: '/images/services/seo/seo-reporting.webp',
        description: 'High-tier digital PR placements establishing compounding organic search equity.',
        year: '2026',
      },
    ],
  },

  ppc: {
    animationVariant: 'kinetic-counter',
    stepTransitionStyle: 'feed',
    heroHeadline: "Stop wasting money on ads that don't",
    heroItalicWord: 'convert.',
    heroTagline: 'High-converting paid acquisition funnels powered by algorithmic bidding and creative diversity.',
    heroImage: '/images/services/meta-ads/meta-hero.webp',
    heroImageAlt: 'Performance paid acquisition campaign dashboard',
    statementHeading: 'Algorithmic targeting demands creative hook diversity.',
    statementText:
      "We engineer high-converting paid funnels across Google and Meta powered by algorithmic audience modeling and hook diversity.",
    steps: [
      {
        number: '01',
        name: 'Algorithmic Audience Modeling',
        description: 'First-party data modeling and predictive lookalikes aligned to buyer lifetime value.',
        image: {
          src: '/images/services/meta-ads/meta-testing.webp',
          alt: 'Predictive audience modeling matrix',
        },
        deliverable: 'Audience Strategy Matrix',
      },
      {
        number: '02',
        name: 'Creative Hook Diversity',
        description: 'Multi-angle video hooks and static creatives engineered for rapid algorithmic testing.',
        image: {
          src: '/images/services/meta-ads/meta-creative.webp',
          alt: 'High-performance video hook creative',
        },
        deliverable: 'Creative Hook Matrix',
      },
      {
        number: '03',
        name: 'Bid & Budget Optimization',
        description: 'Automated bidding rules and flexible budget allocation scaling high-performing ad sets.',
        image: {
          src: '/images/services/meta-ads/meta-scaling.webp',
          alt: 'Flexible budget allocation and bidding rules',
        },
        deliverable: 'Bidding Engine Rules',
      },
      {
        number: '04',
        name: 'First-Party Conversion API',
        description: 'Server-side tracking and transparent ROAS attribution avoiding signal loss.',
        image: {
          src: '/images/services/meta-ads/meta-capi.webp',
          alt: 'Server-side conversion API schema',
        },
        deliverable: 'Server-Side CAPI Setup',
      },
    ],
    relatedWorks: [
      {
        id: 'w-ppc-1',
        brand: 'StrideFit Athletic',
        title: 'High-Retention Vertical Video Ad',
        category: 'PPC / Paid Social',
        image: '/images/services/meta-ads/meta-creative.webp',
        description: 'Targeted Meta campaign driving qualified customer acquisition at scale.',
        year: '2026',
      },
      {
        id: 'w-ppc-2',
        brand: 'NovaWatch Co.',
        title: 'Luxury Timepiece Direct Response',
        category: 'PPC / Google & Meta',
        image: '/images/services/meta-ads/meta-scaling.webp',
        description: 'High-intent search and social retargeting matrix.',
        year: '2026',
      },
      {
        id: 'w-ppc-3',
        brand: 'KROMA Mineral Cosmetics',
        title: 'Editorial Multi-Angle Creative',
        category: 'PPC / Creative',
        image: '/images/services/meta-ads/meta-capi.webp',
        description: 'Multi-variant ad creatives optimized for conversion.',
        year: '2026',
      },
    ],
  },

  'social-media': {
    animationVariant: 'blur-dissolve',
    stepTransitionStyle: 'stories',
    heroHeadline: 'Turn passive scrollers into passionate brand',
    heroItalicWord: 'advocates.',
    heroTagline: 'Structured editorial calendars, high-retention vertical reels, and proactive community engagement.',
    heroImage: '/images/services/social-media/social-hero.webp',
    heroImageAlt: 'Social media editorial production suite',
    statementHeading: 'Authentic engagement builds lasting brand gravity.',
    statementText:
      'Transform passive scrollers into loyal brand advocates through structured editorial calendars, high-retention vertical video, and proactive community engagement.',
    steps: [
      {
        number: '01',
        name: 'Editorial Content Blueprint',
        description: 'Monthly content architecture aligning brand storytelling with cultural micro-trends.',
        image: {
          src: '/images/services/social-media/social-calendar.webp',
          alt: 'Monthly social editorial calendar',
        },
        deliverable: 'Editorial Monthly Blueprint',
      },
      {
        number: '02',
        name: 'High-Retention Vertical Video',
        description: 'Cinematic 9:16 reels engineered with strong hooks and engaging pacing.',
        image: {
          src: '/images/services/social-media/social-production.webp',
          alt: 'Vertical reel production workflow',
        },
        deliverable: 'Reels Production Pipeline',
      },
      {
        number: '03',
        name: 'Community Care & Moderation',
        description: 'Proactive comment response, DM triage, and real-time social community management.',
        image: {
          src: '/images/services/social-media/social-community.webp',
          alt: 'Real-time community engagement interface',
        },
        deliverable: 'Community Care Protocol',
      },
      {
        number: '04',
        name: 'Organic Engagement Analytics',
        description: 'Monthly engagement analytics and follower sentiment tracking.',
        image: {
          src: '/images/services/social-media/social-growth.webp',
          alt: 'Social sentiment analytics report',
        },
        deliverable: 'Sentiment & Growth Report',
      },
    ],
    relatedWorks: [
      {
        id: 'w-soc-1',
        brand: 'Ember Coffee Roasters',
        title: 'Warm Editorial Social Campaign',
        category: 'Social / Video',
        image: '/images/services/social-media/social-calendar.webp',
        description: 'Organic Instagram reel campaign celebrating artisanal coffee craftsmanship.',
        year: '2026',
      },
      {
        id: 'w-soc-2',
        brand: 'Zenith Audio',
        title: 'Acoustic Product Launch Series',
        category: 'Social / Creative',
        image: '/images/services/social-media/social-production.webp',
        description: 'Tactile editorial stills and short-form video series.',
        year: '2026',
      },
      {
        id: 'w-soc-3',
        brand: 'Solace Botanicals',
        title: 'Skincare Minimalist Aesthetics',
        category: 'Social / Stills',
        image: '/images/services/social-media/social-community.webp',
        description: 'Clean botanical aesthetic campaign generating community resonance.',
        year: '2026',
      },
    ],
  },

  'web-development': {
    animationVariant: 'wipe-up',
    stepTransitionStyle: 'browser',
    heroHeadline: 'Sub-second speed engineered for modern digital',
    heroItalicWord: 'conversion.',
    heroTagline: 'Custom Next.js web applications delivering sub-second load times and fluid geometry.',
    heroImage: '/images/services/web-development/web-hero.webp',
    heroImageAlt: 'Next.js custom engineering workspace',
    statementHeading: 'Engineered performance is the greatest conversion lever.',
    statementText:
      'Custom, high-performance web applications built on Next.js. Engineered for sub-second load times, fluid device geometry, and clean conversion funnels.',
    steps: [
      {
        number: '01',
        name: 'Information Architecture',
        description: 'Component mapping, schema design, and user conversion pathway blueprinting.',
        image: {
          src: '/images/services/web-development/web-design.webp',
          alt: 'Web architecture component blueprint',
        },
        deliverable: 'System Architecture Blueprint',
      },
      {
        number: '02',
        name: 'Next.js Frontend Engineering',
        description: 'TypeScript architecture, server components, and Tailwind styling with zero template bloat.',
        image: {
          src: '/images/services/web-development/web-responsive.webp',
          alt: 'High-performance Next.js code interface',
        },
        deliverable: 'Production Next.js Codebase',
      },
      {
        number: '03',
        name: 'Core Web Vitals Optimization',
        description: 'Strict asset optimization, script lazy loading, and sub-second Largest Contentful Paint.',
        image: {
          src: '/images/services/web-development/web-vitals.webp',
          alt: 'Sub-second Core Web Vitals audit scorecard',
        },
        deliverable: 'Core Vitals Scorecard',
      },
      {
        number: '04',
        name: 'Zero-Downtime Deployment',
        description: 'Automated CI/CD pipelines, edge CDN caching, and automated regression testing.',
        image: {
          src: '/images/services/web-development/web-deployment.webp',
          alt: 'Automated deployment and testing dashboard',
        },
        deliverable: 'Edge Production Deployment',
      },
    ],
    relatedWorks: [
      {
        id: 'w-web-1',
        brand: 'Barkley & Co.',
        title: 'Artisanal Canine Direct-to-Consumer',
        category: 'Web / E-Commerce',
        image: '/images/services/web-development/web-design.webp',
        description: 'Next.js commerce platform engineered for sub-second interactions.',
        year: '2026',
      },
      {
        id: 'w-web-2',
        brand: 'Solis Renewable Energy',
        title: 'Commercial Clean Tech Platform',
        category: 'Web / Platform',
        image: '/images/services/web-development/web-responsive.webp',
        description: 'Multi-device portal with interactive solar energy estimation calculations.',
        year: '2026',
      },
      {
        id: 'w-web-3',
        brand: 'Vellum & Press Books',
        title: 'Editorial Heritage Publisher Site',
        category: 'Web / Editorial',
        image: '/images/services/web-development/web-vitals.webp',
        description: 'Refined typography-first digital reader and archival bookstore.',
        year: '2026',
      },
    ],
  },

  'video-photo': {
    animationVariant: 'iris-fade',
    stepTransitionStyle: 'iris',
    heroHeadline: 'Cinematic visual storytelling that commands customer',
    heroItalicWord: 'attention.',
    heroTagline: 'High-impact video and photography crafted to build brand trust and conversions.',
    heroImage: '/images/services/video-photo/video-photo-hero.webp',
    heroImageAlt: 'Cinema camera rig with precision prime lens in production studio',
    statementHeading: 'Visual craft commands attention in crowded markets.',
    statementText:
      'Full-service studio production delivering cinematic brand commercials, high-retention social reels, and high-resolution editorial product photography that commands attention.',
    steps: [
      {
        number: '01',
        name: 'Storyboard & Creative Concept',
        description: 'Visual hooks, narrative pacing, and moodboards aligned with your brand identity.',
        image: {
          src: '/images/services/video-photo/video-photo-concept.webp',
          alt: 'Creative storyboard treatment',
        },
        deliverable: 'Creative Treatment Blueprint',
      },
      {
        number: '02',
        name: 'Studio & Location Capture',
        description: 'High-resolution cinema camera capture and precision architectural studio lighting.',
        image: {
          src: '/images/services/video-photo/video-photo-shoot.webp',
          alt: 'Cinema camera on studio rig',
        },
        deliverable: 'Raw 4K Cinema Footage',
      },
      {
        number: '03',
        name: 'Editorial Cut & Sound Design',
        description: 'Narrative rhythm, sound design, and motion graphics sculpted into polished edits.',
        image: {
          src: '/images/services/video-photo/video-photo-edit.webp',
          alt: 'Editorial timeline and sound design',
        },
        deliverable: 'Master Timeline Assembly',
      },
      {
        number: '04',
        name: 'Color Grading & Film Finish',
        description: 'Color harmony, custom LUTs, and film finish delivering elevated visual elegance.',
        image: {
          src: '/images/services/video-photo/video-photo-color.webp',
          alt: 'Precision color grading monitor suite',
        },
        deliverable: 'Final Color-Graded Masters',
      },
    ],
    relatedWorks: [
      {
        id: 'w-vid-1',
        brand: 'Studio Cinematics',
        title: 'Behind the Scenes Studio Film',
        category: 'Video / Production',
        image: '/images/services/video-photo/video-photo-shoot.webp',
        description: 'Inside our production workflow capturing cinema camera footage and high-end lighting.',
        year: '2026',
      },
      {
        id: 'w-vid-2',
        brand: 'Ember Roasters',
        title: 'Artisanal Roaster Documentary',
        category: 'Video / Commercial',
        image: '/images/hero/hero-07-ember-roasters-coffee-4x5.webp',
        description: 'High-retention cinematic social reel celebrating coffee roasting craft.',
        year: '2026',
      },
      {
        id: 'w-vid-3',
        brand: 'Apex Vision',
        title: 'Product Commercial Campaign',
        category: 'Photo / Stills',
        image: '/images/services/video-photo/video-photo-concept.webp',
        description: 'Multi-platform commercial stills and short-form visual campaign.',
        year: '2026',
      },
    ],
  },

  'email-marketing': {
    animationVariant: 'split-reveal',
    stepTransitionStyle: 'feed',
    heroHeadline: 'Turn your email list into steady, predictable',
    heroItalicWord: 'revenue.',
    heroTagline: 'Automated email flows and targeted campaigns that turn subscribers into repeat buyers.',
    heroImage: '/images/services/meta-ads/meta-hero.webp',
    heroImageAlt: 'Email marketing automation and segmentation dashboard',
    statementHeading: 'Your email list is the only marketing channel you own 100%.',
    statementText:
      'We create automated welcome flows, cart recovery sequences, and regular targeted campaigns that generate consistent sales without paid ad spend.',
    steps: [
      {
        number: '01',
        name: 'Account & Deliverability Setup',
        description: 'Clean DNS configuration, domain warming, and platform migration to protect your inbox placement.',
        image: {
          src: '/images/services/meta-ads/meta-testing.webp',
          alt: 'Email deliverability and DNS setup',
        },
        deliverable: 'Deliverability & Domain Audit',
      },
      {
        number: '02',
        name: 'Automated Revenue Flows',
        description: 'Always-on welcome series, cart abandonment recovery, and post-purchase customer win-backs.',
        image: {
          src: '/images/services/meta-ads/meta-creative.webp',
          alt: 'Automated lifecycle email flow builder',
        },
        deliverable: 'Core Lifecycle Flow Engine',
      },
      {
        number: '03',
        name: 'Template Design & Testing',
        description: 'Clean, mobile-responsive email templates built to look great in Apple Mail, Gmail, and Outlook.',
        image: {
          src: '/images/services/meta-ads/meta-capi.webp',
          alt: 'Mobile responsive email layout design',
        },
        deliverable: 'Branded Master Email Kit',
      },
      {
        number: '04',
        name: 'Targeted Broadcast Campaigns',
        description: 'Promotional launches, product drops, and educational newsletters sent to segmented buyer lists.',
        image: {
          src: '/images/services/meta-ads/meta-scaling.webp',
          alt: 'Segmented campaign revenue analytics',
        },
        deliverable: 'Monthly Campaign Calendar',
      },
    ],
    relatedWorks: [
      {
        id: 'w-em-1',
        brand: 'Lumina Home',
        title: 'Automated Flow Revenue Engine',
        category: 'Email / E-Commerce',
        image: '/images/services/meta-ads/meta-hero.webp',
        description: 'Generated 34% of total shop revenue from automated email sequences within 60 days.',
        year: '2026',
      },
      {
        id: 'w-em-2',
        brand: 'Aura Skincare',
        title: 'VIP Segment Retention Campaign',
        category: 'Email / Retention',
        image: '/images/services/meta-ads/meta-creative.webp',
        description: 'Custom segmented product drop series delivering 6.8x revenue per recipient.',
        year: '2026',
      },
    ],
  },
};

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  const config =
    SERVICE_CONFIGS[service.slug] ||
    (service.slug === 'meta-ads' ? SERVICE_CONFIGS['ppc'] : SERVICE_CONFIGS['seo']);

  const displayChips =
    service.deliverables && service.deliverables.length > 0
      ? service.deliverables.slice(0, 5)
      : ['Strategy', 'Execution', 'Optimization', 'Analytics', 'Reporting'];

  return (
    <main className="overflow-hidden bg-[#F6F3EC] text-ink select-none">
      {/* 1. Hero Section */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Deliverable Chips */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-ink/10 text-xs font-mono uppercase tracking-widest text-stone w-fit shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Service · {service.number}</span>
              </div>

              {/* Dynamic Animated Headline */}
              <HeroTextAnimation
                headline={config.heroHeadline}
                italicWord={config.heroItalicWord}
                variant={config.animationVariant}
              />

              <p className="text-base sm:text-lg font-sans text-stone max-w-xl leading-relaxed">
                {config.heroTagline}
              </p>

              {/* Deliverable Tags (Warm Ivory Pills) */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-stone block mb-3 font-semibold">
                  Core Deliverables
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {displayChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-ink/10 text-xs font-mono font-semibold text-ink shadow-2xs hover:border-gold transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                      <span>{chip}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink text-ivory font-display font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:bg-charcoal hover:shadow-soft-lg active:scale-95"
                >
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Photo */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden border border-ink/10 shadow-soft-lg bg-charcoal">
              <Image
                src={config.heroImage}
                alt={config.heroImageAlt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-ivory text-xs font-mono">
                <span className="uppercase tracking-widest font-semibold">{service.shortTitle} Engine</span>
                <span className="text-gold font-semibold">Active Practice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Value Highlights 3-Column Strip */}
      {service.features && service.features.length >= 3 && (
        <section className="py-12 sm:py-16 bg-white border-b border-ink/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-[24px] bg-[#FAF8F5] border border-[#e8e6e2] shadow-xs flex flex-col justify-between hover:border-[#f7ac4f] transition-colors"
                >
                  <div>
                    <div className="w-9 h-9 rounded-full bg-[#f7ac4f] flex items-center justify-center text-xs font-mono font-black text-[#161514] mb-4 shadow-2xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-xl font-display font-black text-[#161514] mb-2 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#5d5a55] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  {feat.metric && (
                    <div className="mt-4 pt-3 border-t border-black/5 text-[11px] font-mono font-bold text-[#b45309]">
                      {feat.metric}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2b. Core Subservices Grid (Direct Links to Detailed Subpages) */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F6F3EC] border-b border-ink/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-ink/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-stone block mb-2 font-bold">
                  Dedicated Sub-Disciplines
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#161514] tracking-tight">
                  Types of {service.shortTitle} Services We Offer
                </h2>
              </div>
              <span className="text-xs font-mono text-[#b45309] font-bold">
                4 Core Sub-Pages Available →
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.processSteps.map((step, idx) => {
                // Determine clean subpage link
                const subSlugs: Record<string, string[]> = {
                  seo: ['on-page-seo', 'off-page-seo', 'local-seo', 'technical-seo'],
                  ppc: ['campaign-strategy', 'ad-creative-copy', 'tracking-pixel-capi', 'budget-scaling'],
                  'social-media': [
                    'account-profile-management',
                    'content-planning-adaptation',
                    'community-engagement-inbox',
                    'performance-tracking-adjustments',
                  ],
                  'email-marketing': [
                    'targeted-email-campaigns',
                    'automated-email-flows',
                    'template-design-testing',
                    'platform-setup-deliverability',
                  ],
                  'web-development': [
                    'nextjs-15-applications',
                    'conversion-rate-optimization',
                    'speed-edge-infrastructure',
                    'custom-booking-funnels',
                  ],
                };
                const currentSlugs = subSlugs[service.slug] || ['on-page-seo', 'off-page-seo', 'local-seo', 'technical-seo'];
                const targetSlug = currentSlugs[idx % currentSlugs.length];
                const href = `/services/${service.slug}/${targetSlug}`;

                return (
                  <Link
                    key={idx}
                    href={href}
                    className="group p-6 sm:p-8 rounded-[28px] bg-white border border-[#e8e6e2] shadow-xs hover:shadow-md hover:border-[#f7ac4f] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider">
                          Phase 0{idx + 1}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-[#f4f3f1] flex items-center justify-center text-[#161514] group-hover:bg-[#f7ac4f] transition-colors">
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#161514] mb-3 leading-snug group-hover:text-[#b45309] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-[#5d5a55] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#161514]">
                      <span>View full subpage & video breakdown</span>
                      <span className="text-[#b45309] font-mono">Explore →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 2c. Dedicated Fit Comparison Table for PPC / Email Marketing */}
      {service.slug === 'ppc' && (
        <section className="py-16 sm:py-20 bg-white border-b border-ink/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider block mb-2">
                Strategic Fit Matrix
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#161514] tracking-tight">
                Which Meta Ads Setup Fits Your Business?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-[24px] bg-[#FAF8F5] border border-[#e8e6e2] flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white border border-black/10 text-[10px] font-mono font-bold text-[#161514] uppercase mb-3 inline-block">
                    Option 01
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#161514] mb-2">
                    Lead Generation & Calls
                  </h3>
                  <p className="text-xs text-[#5d5a55] leading-relaxed mb-4">
                    Best for clinics, accountants, contractors, and local services wanting qualified inbound inquiries directly into CRM.
                  </p>
                </div>
                <div className="pt-3 border-t border-black/5 text-xs font-mono font-semibold text-[#1f7a37]">
                  Target: High-Intent Inquiries
                </div>
              </div>

              <div className="p-6 rounded-[24px] bg-[#FAF8F5] border-2 border-[#f7ac4f] shadow-sm flex flex-col justify-between relative">
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#f7ac4f] text-[10px] font-mono font-black text-[#161514] uppercase">
                  Most Popular
                </span>
                <div>
                  <span className="px-3 py-1 rounded-full bg-white border border-black/10 text-[10px] font-mono font-bold text-[#161514] uppercase mb-3 inline-block">
                    Option 02
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#161514] mb-2">
                    E-Commerce Sales & Scale
                  </h3>
                  <p className="text-xs text-[#5d5a55] leading-relaxed mb-4">
                    Best for DTC brands and online retailers requiring dynamic product ads, catalog retargeting, and scalable purchase ROAS.
                  </p>
                </div>
                <div className="pt-3 border-t border-black/5 text-xs font-mono font-semibold text-[#b45309]">
                  Target: Scalable Purchase ROAS
                </div>
              </div>

              <div className="p-6 rounded-[24px] bg-[#FAF8F5] border border-[#e8e6e2] flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white border border-black/10 text-[10px] font-mono font-bold text-[#161514] uppercase mb-3 inline-block">
                    Option 03
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#161514] mb-2">
                    Event & Local Awareness
                  </h3>
                  <p className="text-xs text-[#5d5a55] leading-relaxed mb-4">
                    Best for grand openings, webinars, seasonal ticket sales, and time-sensitive geographic promotions.
                  </p>
                </div>
                <div className="pt-3 border-t border-black/5 text-xs font-mono font-semibold text-[#161514]">
                  Target: Geographic Density
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {service.slug === 'email-marketing' && (
        <section className="py-16 sm:py-20 bg-white border-b border-ink/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider block mb-2">
                Email Strategic Approach
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#161514] tracking-tight">
                Which Email Approach Fits Your Goal?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-[24px] bg-[#FAF8F5] border border-[#e8e6e2] flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white border border-black/10 text-[10px] font-mono font-bold text-[#161514] uppercase mb-3 inline-block">
                    Approach 01
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#161514] mb-2">
                    Targeted Broadcast Campaigns
                  </h3>
                  <p className="text-xs text-[#5d5a55] leading-relaxed mb-4">
                    Periodic newsletters, product drops, holiday sales, and company announcements sent to curated segments.
                  </p>
                </div>
                <div className="pt-3 border-t border-black/5 text-xs font-mono font-semibold text-[#1f7a37]">
                  Deliverable: High-Impact Broadcasts
                </div>
              </div>

              <div className="p-6 rounded-[24px] bg-[#FAF8F5] border-2 border-[#f7ac4f] shadow-sm flex flex-col justify-between relative">
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#f7ac4f] text-[10px] font-mono font-black text-[#161514] uppercase">
                  Highest ROI
                </span>
                <div>
                  <span className="px-3 py-1 rounded-full bg-white border border-black/10 text-[10px] font-mono font-bold text-[#161514] uppercase mb-3 inline-block">
                    Approach 02
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#161514] mb-2">
                    Automated Behavioral Flows
                  </h3>
                  <p className="text-xs text-[#5d5a55] leading-relaxed mb-4">
                    Always-on welcome sequences, abandoned cart triggers, browse abandonment, and customer win-back flows.
                  </p>
                </div>
                <div className="pt-3 border-t border-black/5 text-xs font-mono font-semibold text-[#b45309]">
                  Deliverable: Compounding Automation
                </div>
              </div>

              <div className="p-6 rounded-[24px] bg-[#FAF8F5] border border-[#e8e6e2] flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white border border-black/10 text-[10px] font-mono font-bold text-[#161514] uppercase mb-3 inline-block">
                    Approach 03
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#161514] mb-2">
                    Full Lifecycle Retention Engine
                  </h3>
                  <p className="text-xs text-[#5d5a55] leading-relaxed mb-4">
                    Complete subscriber migration, deliverability warming, VIP tiering, and ongoing conversion split testing.
                  </p>
                </div>
                <div className="pt-3 border-t border-black/5 text-xs font-mono font-semibold text-[#161514]">
                  Deliverable: End-to-End Retention
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Editorial Statement */}
      <section className="py-20 sm:py-24 bg-[#EFEBE2] border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono uppercase tracking-widest text-stone block mb-3 font-semibold">
                Strategic Foundation
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-ink tracking-tight leading-snug">
                {config.statementHeading}
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-base sm:text-lg font-sans text-stone leading-relaxed">
                {config.statementText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Unique Step Photo Roadmap (Transition Style for Each Discipline) */}
      <StepPhotoSection
        style={config.stepTransitionStyle}
        serviceTitle={service.title}
        steps={config.steps}
      />

      {/* 4. Signature Radial Methodology Diagram (User Reference Match) */}
      <ServiceApproachSection slug={service.slug} />

      {/* 5. Three Selected Concept Work Cards */}
      <section className="py-20 sm:py-28 bg-[#F6F3EC] border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-ink/10 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-stone block mb-2 font-semibold">
                Selected Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink tracking-tight">
                Related concept{' '}
                <span className="font-serif italic font-normal text-gold-deep">
                  executions.
                </span>
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-ink/10 text-xs font-mono uppercase tracking-widest text-stone shadow-2xs">
              Direct Production
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.relatedWorks.map((work) => (
              <WorkCard
                key={work.id}
                item={work}
                aspectRatio="4/5"
                onSelect={(selected) => setLightboxItem(selected)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Scalable FAQs Section */}
      <ServiceFaqSection
        items={
          getServiceFaqs(service.slug).length > 0
            ? getServiceFaqs(service.slug)
            : (service.faqs || []).map((f, i) => ({
                id: `${service.slug}-${i + 1}`,
                question: f.question,
                answer: f.answer,
              }))
        }
        serviceTitle={service.title}
      />

      {/* 6. Final CTA Banner */}
      <section className="py-24 sm:py-32 bg-charcoal text-ivory relative overflow-hidden" data-surface="dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#D9C29A] mb-6 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#D9C29A]" />
            <span>Next Steps</span>
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-6 text-[#F6F3EC]">
            Ready to scale your <span className="font-serif italic text-[#D9C29A]">growth?</span>
          </h2>

          <p className="text-[#D6D3D1] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Schedule a confidential 30-minute growth architecture session with our directors.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gold text-charcoal font-display font-extrabold text-base tracking-wide uppercase transition-all duration-300 hover:bg-gold-soft hover:shadow-gold active:scale-95 shadow-soft-lg"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        item={lightboxItem}
        isOpen={Boolean(lightboxItem)}
        onClose={() => setLightboxItem(null)}
      />
    </main>
  );
}
