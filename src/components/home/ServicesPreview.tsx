'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { business } from '@/data/business';
import Tilt3D from '@/motion/Tilt3D';
import { DripLink } from '@/components/animorio/drip/DripLink';

const serviceImages: Record<string, string> = {
  seo: '/images/pages/P01-services-seo-hero-16x9.webp',
  'meta-ads': '/images/pages/P03-services-meta-hero-16x9.webp',
  'social-media': '/images/pages/P05-services-social-hero-16x9.webp',
  'web-development': '/images/pages/P07-services-web-hero-16x9.webp',
};

const serviceShortLines: Record<string, string> = {
  seo: 'Be the answer when buyers search.',
  'meta-ads': 'Ads people stop scrolling for.',
  'social-media': 'Editorial content with a living pulse.',
  'web-development': 'Sub-second web built to convert.',
};

export function ServicesPreview() {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section className="py-24 sm:py-32 bg-transparent" id="what-we-do">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-ink/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                02 / SERVICES
              </span>
            </div>
            {/* H2 max 7 words with Serif Swap */}
            <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
              Disciplines built to create{' '}
              <span className="serif-swap text-ink">momentum.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base font-sans text-grey-3 max-w-sm leading-relaxed">
            Four core practices pulling in the same direction.
          </p>
        </div>

        {/* 4 Tall Image Cards with Spotlight + Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-12">
          {business.services.map((service) => {
            const imgSrc = serviceImages[service.slug] || '/images/pages/P01-services-seo-hero-16x9.webp';
            const shortLine = serviceShortLines[service.slug] || service.headline;

            return (
              <Tilt3D key={service.id} maxTilt={6}>
                <div
                  onPointerMove={handlePointerMove}
                  className="group spotlight-card card-glass-elevated relative p-6 sm:p-8 rounded-[24px] bg-paper-2 border border-ink/10 flex flex-col justify-between overflow-hidden h-full transition-all duration-300"
                >
                  <div>
                    {/* Image Thumbnail Banner */}
                    <div className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden mb-6 border border-ink/10">
                      <Image
                        src={imgSrc}
                        alt={`${service.title} execution preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ink/80 backdrop-blur-md text-[10px] font-mono text-white tracking-widest uppercase border border-white/10">
                        {service.label}
                      </div>
                    </div>

                    {/* Title max 4 words */}
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink mb-2 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description max 12 words */}
                    <p className="text-sm sm:text-base font-sans text-grey-3 leading-snug">
                      {shortLine}
                    </p>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="pt-6 mt-6 border-t border-ink/8 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-grey-2 group-hover:text-ink transition-colors">
                      Explore Practice
                    </span>
                    <DripLink
                      href={`/services/${service.slug}`}
                      className="w-10 h-10 rounded-full bg-paper hover:bg-lime border border-ink/10 flex items-center justify-center text-ink transition-colors duration-300"
                      aria-label={`View ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </DripLink>
                  </div>
                </div>
              </Tilt3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
