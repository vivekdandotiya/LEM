'use client';

import React from 'react';
import Image from 'next/image';
import { business } from '@/data/business';
import { DripLink } from '@/components/animorio/drip/DripLink';
import { FinalCTA } from '@/components/home/FinalCTA';
import { ArrowUpRight } from 'lucide-react';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';
import { StackSeparate } from '@/components/stack/StackSeparate';
import { ResponsiveCardImage } from '@/components/ui/ResponsiveCardImage';

const panelImages: Record<string, string> = {
  seo: '/images/pages/P01-services-seo-hero-16x9.webp',
  'meta-ads': '/images/pages/P03-services-meta-hero-16x9.webp',
  'social-media': '/images/pages/P05-services-social-hero-16x9.webp',
  'web-development': '/images/pages/P07-services-web-hero-16x9.webp',
};

const sixWordLines: Record<string, string> = {
  seo: 'Be the answer when they search.',
  'meta-ads': 'Ads people stop scrolling to buy.',
  'social-media': 'Editorial content with a living pulse.',
  'web-development': 'Sub-second sites built to convert visits.',
};

export default function ServicesPage() {
  return (
    <div className="pt-28 sm:pt-36 bg-transparent select-none">
      {/* 1. Kinetic Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-20 border-b border-ink/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
            SERVICES OVERVIEW
          </span>
        </div>

        {/* H1 max 8 words */}
        <h1 className="text-fs-xl font-display font-extrabold text-ink tracking-tight leading-[0.92] max-w-4xl mb-6">
          Four disciplines built for <span className="serif-swap text-ink">momentum.</span>
        </h1>

        <p className="text-base sm:text-lg font-sans text-grey-3 max-w-xl leading-relaxed">
          We master four core practices and integrate them into one compounding growth engine.
        </p>
      </section>

      {/* 2. Four Service Panels in Stack-Then-Separate 2x2 Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
        <StackSeparate
          items={business.services}
          layout="grid2x2"
          renderCard={(service, idx, isPeeled, isActive) => {
            const imgSrc = panelImages[service.slug] || '/images/pages/P01-services-seo-hero-16x9.webp';
            const line = sixWordLines[service.slug] || service.headline;
            const num = `0${idx + 1}`;

            return (
              <article
                className={`group relative rounded-[28px] overflow-hidden border transition-colors duration-300 bg-paper-2 card-glass-elevated shadow-soft-lg flex flex-col justify-between h-[520px] sm:h-[540px] ${
                  isActive
                    ? 'border-lime shadow-soft-md'
                    : isPeeled
                    ? 'border-ink/10 shadow-soft-sm'
                    : 'border-ink/10 opacity-90'
                }`}
              >
                {/* Top Image Section */}
                <div className="relative w-full aspect-[16/9] min-h-[200px] overflow-hidden">
                  <ResponsiveCardImage
                    src={imgSrc}
                    alt={`${service.title} discipline visual`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    priority={idx < 2}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-ink/90 text-white font-mono text-xs uppercase tracking-wider border border-white/10">
                      {num} / {service.shortTitle}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-4xl sm:text-5xl font-display font-extrabold text-outline group-hover:text-ink transition-colors duration-300">
                        {num}
                      </span>
                      <SparkleGlyph size={16} className="text-lime" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-display font-bold text-ink mb-2">
                      {service.title}
                    </h2>

                    <p className="text-base font-display font-medium text-ink leading-snug mb-2">
                      {line}
                    </p>

                    <p className="text-xs sm:text-sm font-sans text-grey-3 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* "Discover" CTA */}
                  <div className="pt-4 mt-4 border-t border-ink/8 flex items-center justify-between">
                    <DripLink
                      href={`/services/${service.slug}`}
                      className="btn-primary text-xs font-bold flex items-center gap-2 group-hover:bg-lime-soft transition-colors"
                    >
                      <span>Discover</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </DripLink>

                    <span className="text-[11px] font-mono uppercase tracking-widest text-grey-2">
                      {service.shortTitle}
                    </span>
                  </div>
                </div>
              </article>
            );
          }}
        />
      </section>

      {/* 3. Final Call to Action */}
      <FinalCTA />
    </div>
  );
}
