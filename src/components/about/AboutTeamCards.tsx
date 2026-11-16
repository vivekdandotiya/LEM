'use client';

import React from 'react';
import Image from 'next/image';

interface TeamStep {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const TEAM_STEPS: TeamStep[] = [
  {
    number: '01',
    title: 'Thesis & Architecture',
    description: 'We align commercial targets and technical search taxonomy before a single asset is produced.',
    image: '/images/about/about-team-table.webp',
    alt: 'Agency strategy workspace with team notebooks and laptops',
  },
  {
    number: '02',
    title: 'Systems Modeling',
    description: 'Every user journey and algorithmic crawl trajectory is mapped for frictionless revenue velocity.',
    image: '/images/about/about-team-whiteboard.webp',
    alt: 'Sketching full-funnel digital architecture on glass whiteboard',
  },
  {
    number: '03',
    title: 'Cross-Discipline Alignment',
    description: 'Paid media acquisition, organic search, and visual creative operate as one synchronized engine.',
    image: '/images/about/about-team-meeting.webp',
    alt: 'Minimalist agency boardroom with floor-to-ceiling glass',
  },
  {
    number: '04',
    title: 'Tactile Production',
    description: 'Studio optics, genuine camera craft, and bespoke engineering replace generic agency stock.',
    image: '/images/about/about-team-creative.webp',
    alt: 'Creative desk with mirrorless cinema camera and prime lens',
  },
];

export function AboutTeamCards() {
  return (
    <section className="py-24 sm:py-32 bg-[#F6F3EC] select-none border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-ink/10 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                HOW OUR TEAM WORKS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight leading-tight">
              Four operating disciplines.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone max-w-xs leading-relaxed">
            Our multi-disciplinary workflow unites strategic rigor, data modeling, and tactile execution.
          </p>
        </div>

        {/* 4 Photo Paper Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="group relative rounded-[22px] overflow-hidden bg-white border border-ink/10 shadow-soft-sm hover:-translate-y-2 hover:border-gold/50 hover:shadow-soft-md transition-all duration-500 flex flex-col justify-between"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Photo */}
              <div className="relative w-full aspect-[4/5] bg-charcoal overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold uppercase text-ink">
                  {step.number}
                </div>
              </div>

              {/* Text */}
              <div className="p-5 bg-white flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-ink group-hover:text-gold-deep transition-colors leading-snug mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs font-sans text-stone leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-ink/8 text-[10px] font-mono text-stone uppercase tracking-wider flex items-center justify-between">
                  <span>DISCIPLINE 0{idx + 1}</span>
                  <span className="text-gold-deep font-semibold">ACTIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
