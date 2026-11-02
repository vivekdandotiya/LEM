'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceItem } from '@/data/services';
import { ProcessStage } from '@/components/process/ProcessStage';
import { HERO_CREATIVES } from '@/data/heroCreatives';
import { AdCard } from '@/components/hero/AdCard';
import { FinalCTA } from '@/components/home/FinalCTA';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';
import { CheckCircle2, Plus, Sparkles, Cpu, Layers, Target, Code, ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/motion/Magnetic';

interface ServicePageTemplateProps {
  service: ServiceItem;
}

const serviceVisuals: Record<
  string,
  {
    hero: string;
    showcase: string;
    chips: string[];
    conceptIndices: number[];
  }
> = {
  seo: {
    hero: '/images/pages/P01-services-seo-hero-16x9.webp',
    showcase: '/images/pages/P02-services-seo-audit-4x5.webp',
    chips: [
      'Topical Entity Architecture',
      'Technical Core Web Vitals',
      'Crawl Path Optimization',
      'Editorial Authority Links',
      'Plain-English Search Analytics',
    ],
    conceptIndices: [0, 1, 2],
  },
  'meta-ads': {
    hero: '/images/pages/P03-services-meta-hero-16x9.webp',
    showcase: '/images/pages/P04-services-meta-creative-4x5.webp',
    chips: [
      'Creative Hook Diversity',
      'Server-Side CAPI Tracking',
      'Algorithmic Audience Modeling',
      'Ad Account Governance',
      'Unit Economic Scaling',
    ],
    conceptIndices: [3, 4, 5],
  },
  'social-media': {
    hero: '/images/pages/P05-services-social-hero-16x9.webp',
    showcase: '/images/pages/P06-services-social-calendar-4x5.webp',
    chips: [
      'Editorial Content Calendars',
      'High-Retention Vertical Video',
      'Distinct Brand Voice',
      'Proactive Community Care',
      'Organic Demand Attribution',
    ],
    conceptIndices: [6, 7, 8],
  },
  'web-development': {
    hero: '/images/pages/P07-services-web-hero-16x9.webp',
    showcase: '/images/pages/P08-services-web-devices-16x9.webp',
    chips: [
      'Sub-Second Core Vitals',
      'Bespoke Next.js Engine',
      'Fluid Device Geometry',
      'Zero Theme Bloat',
      'Conversion-Focused Funnels',
    ],
    conceptIndices: [9, 10, 11],
  },
};

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const config = serviceVisuals[service.slug] || serviceVisuals['web-development'];
  const conceptCards = config.conceptIndices.map((i) => HERO_CREATIVES[i]);
  const serviceFaqs = service.faqs.slice(0, 4);

  return (
    <div className="overflow-hidden bg-transparent select-none">
      {/* 1. Unique Hero Section with P01/P03/P05/P07 */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & 5 Feature Chips */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                  DISCIPLINE {service.shortTitle}
                </span>
              </div>

              {/* H1 max 8 words */}
              <h1 className="text-fs-xl font-display font-extrabold text-ink tracking-tight leading-[0.92]">
                {service.heroHeadline ? service.heroHeadline.split(' ').slice(0, 6).join(' ') : service.title}{' '}
                <span className="serif-swap text-ink">momentum.</span>
              </h1>

              <p className="text-base sm:text-lg font-sans text-grey-3 max-w-xl leading-relaxed">
                {service.tagline}
              </p>

              {/* 5 Feature Chips (No Paragraphs!) */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-grey-2 block mb-3">
                  Core Deliverables
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {config.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-2 border border-ink/10 text-xs font-mono font-semibold text-ink shadow-sm hover:border-lime transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
                      <span>{chip}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Magnetic strength={0.25}>
                  <Link href="/contact" className="btn-primary">
                    Start a project →
                  </Link>
                </Magnetic>
              </div>
            </div>

            {/* Right Column: Hero Visual Photo */}
            <figure
              data-cursor="view"
              data-cursor-label="VIEW"
              className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[4/5] rounded-[24px] overflow-hidden border border-ink/10 shadow-soft-lg card-glass-elevated m-0"
            >
              <Image
                src={config.hero}
                alt={`${service.title} flagship workspace`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
                <span className="uppercase tracking-widest">{service.shortTitle} Engine</span>
                <span className="text-lime">Active Practice</span>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Device or Creative Showcase Section (P02/P04/P06/P08) */}
      <section className="py-20 sm:py-28 bg-paper-2/60 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-ink/10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                  SHOWCASE
                </span>
              </div>
              {/* H2 max 7 words */}
              <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
                Tactical execution across every <span className="marker-sweep is-active">detail.</span>
              </h2>
            </div>
            <p className="text-sm font-sans text-grey-3 max-w-xs">
              Every deliverable is engineered for commercial clarity and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <figure
              data-cursor="view"
              data-cursor-label="VIEW"
              className="lg:col-span-7 relative aspect-[16/10] rounded-[24px] overflow-hidden border border-ink/10 shadow-soft-md card-glass-elevated m-0"
            >
              <Image
                src={config.showcase}
                alt={`${service.title} showcase artifact`}
                fill
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover"
              />
            </figure>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-7 rounded-[22px] bg-paper-2 border border-ink/10 card-glass-elevated">
                <span className="text-[10px] font-mono uppercase text-grey-2 tracking-wider block mb-2">
                  Standard 01
                </span>
                <h3 className="text-xl font-display font-bold text-ink mb-1">
                  Speed to Impact
                </h3>
                <p className="text-sm font-sans text-grey-3">
                  Deployments happen in days, not months.
                </p>
              </div>

              <div className="p-7 rounded-[22px] bg-paper-2 border border-ink/10 card-glass-elevated">
                <span className="text-[10px] font-mono uppercase text-grey-2 tracking-wider block mb-2">
                  Standard 02
                </span>
                <h3 className="text-xl font-display font-bold text-ink mb-1">
                  Obsessive Quality
                </h3>
                <p className="text-sm font-sans text-grey-3">
                  Crafted for high conversion and brand equity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "How We Deliver" Interactive Scroll Stage */}
      <ProcessStage slug={service.slug} />

      {/* 4. Three Concept Work Cards */}
      <section className="py-20 sm:py-28 bg-transparent border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-ink/10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                  CONCEPT WORK
                </span>
              </div>
              <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
                Related concept <span className="serif-swap text-ink">executions.</span>
              </h2>
            </div>
            <span className="sticker-badge">Concept Work</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {conceptCards.map((card) => (
              <AdCard
                key={card.id}
                creative={card}
                isDecorative={false}
                showConceptBadge={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Four Service-Specific FAQs */}
      <section className="py-20 sm:py-28 bg-paper-2/40 border-b border-ink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pb-10">
            <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold block mb-2">
              DISCIPLINE FAQ
            </span>
            <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
              Clear questions, clear answers.
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="card-glass-elevated rounded-[18px] bg-paper-2 border border-ink/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-display font-bold text-lg text-ink"
                  >
                    <span>{faq.question}</span>
                    <Plus className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-45 text-lime' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm font-sans text-grey-3 border-t border-ink/8 leading-relaxed">
                      {faq.answer.split('. ').slice(0, 2).join('. ')}.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Global CTA Band */}
      <FinalCTA />
    </div>
  );
}
