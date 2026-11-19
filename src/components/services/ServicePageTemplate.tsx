'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceItem } from '@/data/services';
import { HeroTextAnimation, HeroAnimationVariant } from '@/components/shared/HeroTextAnimation';
import { StepPhotoSection, StepTransitionStyle, StepItem } from '@/components/shared/StepPhotoSection';
import { ServicePackagesSection } from '@/components/services/ServicePackagesSection';
import { WorkCard } from '@/components/shared/WorkCard';
import { Lightbox, LightboxItem } from '@/components/shared/Lightbox';
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

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
};

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  const config =
    SERVICE_CONFIGS[service.slug] ||
    (service.slug === 'meta-ads' ? SERVICE_CONFIGS['ppc'] : SERVICE_CONFIGS['seo']);

  const displayChips =
    service.deliverables && service.deliverables.length > 0
      ? service.deliverables.slice(0, 5)
      : ['Strategy', 'Execution', 'Optimization', 'Analytics', 'Reporting'];

  const serviceFaqs = service.faqs && service.faqs.length > 0 ? service.faqs.slice(0, 4) : [];

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

      {/* 4. What We Do Differently (Tiered Deliverables Breakdown) */}
      <ServicePackagesSection
        serviceSlug={service.slug}
        serviceTitle={service.title}
      />

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

      {/* 5. Discipline-Specific FAQs */}
      {serviceFaqs.length > 0 && (
        <section id="faq-section" data-surface="light" className="py-20 sm:py-28 bg-[#EFEBE2] border-b border-ink/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center pb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-ink/15 text-xs font-mono uppercase tracking-widest text-[#0F1011] font-bold mb-3 shadow-2xs">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F1011] tracking-tight">
                Common questions, clear answers.
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {serviceFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-[20px] bg-white border border-ink/10 overflow-hidden shadow-2xs transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 font-display font-bold text-[17px] sm:text-lg text-[#0F1011] hover:text-gold-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-ink/10 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-gold text-white' : 'bg-ivory text-stone'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 sm:px-8 pb-6 pt-2 text-base font-sans text-[#3A3835] border-t border-ink/10 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
