'use client';

import React from 'react';
import Image from 'next/image';
import { business } from '@/data/business';
import { DripLink } from '@/components/animorio/drip/DripLink';
import { FinalCTA } from '@/components/home/FinalCTA';
import { ArrowUpRight } from 'lucide-react';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';

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

      {/* 2. Four Huge Panels (Image-led, Number, 6-word line, "Discover") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 flex flex-col gap-12 sm:gap-16">
        {business.services.map((service, idx) => {
          const imgSrc = panelImages[service.slug] || '/images/pages/P01-services-seo-hero-16x9.webp';
          const line = sixWordLines[service.slug] || service.headline;
          const num = `0${idx + 1}`;

          return (
            <article
              key={service.id}
              className="group relative rounded-[28px] overflow-hidden border border-ink/10 bg-paper-2 card-glass-elevated shadow-soft-lg flex flex-col lg:flex-row items-stretch"
            >
              {/* Left Image Section with Zoom Effect */}
              <div className="lg:w-7/12 relative aspect-[16/10] lg:aspect-auto min-h-[340px] sm:min-h-[440px] overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={`${service.title} discipline visual`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 750px"
                  priority={idx < 2}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 lg:hidden">
                  <span className="px-3 py-1 rounded-full bg-ink/80 text-white font-mono text-xs uppercase tracking-wider">
                    {num} / {service.shortTitle}
                  </span>
                </div>
              </div>

              {/* Right Content Section */}
              <div className="lg:w-5/12 p-8 sm:p-12 flex flex-col justify-between bg-paper-2 border-t lg:border-t-0 lg:border-l border-ink/10">
                <div>
                  {/* Huge Outlined Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-6xl sm:text-7xl font-display font-extrabold text-outline group-hover:text-ink transition-colors duration-300">
                      {num}
                    </span>
                    <SparkleGlyph size={18} className="text-lime" />
                  </div>

                  {/* Title max 4 words */}
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink mb-3">
                    {service.title}
                  </h2>

                  {/* Exactly 6-word line */}
                  <p className="text-lg sm:text-xl font-display font-medium text-ink leading-snug mb-4">
                    {line}
                  </p>

                  <p className="text-sm font-sans text-grey-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* "Discover" CTA */}
                <div className="pt-8 mt-8 border-t border-ink/8 flex items-center justify-between">
                  <DripLink
                    href={`/services/${service.slug}`}
                    className="btn-primary text-sm font-bold flex items-center gap-2 group-hover:bg-lime-soft transition-colors"
                  >
                    <span>Discover</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </DripLink>

                  <span className="text-xs font-mono uppercase tracking-widest text-grey-2">
                    {service.shortTitle}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 3. Global CTA Band */}
      <FinalCTA />
    </div>
  );
}
