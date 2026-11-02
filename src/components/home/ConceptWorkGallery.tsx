'use client';

import React, { useRef } from 'react';
import { HERO_CREATIVES } from '@/data/heroCreatives';
import { AdCard } from '@/components/hero/AdCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ConceptWorkGallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollOffset = direction === 'left' ? -420 : 420;
    trackRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  return (
    <section className="py-24 sm:py-32 bg-transparent overflow-hidden" id="concept-work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-ink/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                03 / CONCEPT WORK
              </span>
            </div>
            {/* H2 max 7 words with Inline Photo Pill move */}
            <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
              Creative built to stop the{' '}
              <span className="marker-sweep is-active">scroll.</span>
            </h2>
          </div>

          {/* Right controls & honesty badge */}
          <div className="flex items-center gap-4">
            <span className="sticker-badge">Concept Work</span>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollByAmount('left')}
                className="w-11 h-11 rounded-full border border-ink/15 hover:border-ink bg-paper-2 hover:bg-lime flex items-center justify-center text-ink transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                className="w-11 h-11 rounded-full border border-ink/15 hover:border-ink bg-paper-2 hover:bg-lime flex items-center justify-center text-ink transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs font-mono text-grey-3 uppercase tracking-wider mt-2">
          24 concept brand creatives demonstrating cross-category design direction.
        </p>
      </div>

      {/* Horizontal Gallery Track */}
      <div
        ref={trackRef}
        className="flex items-stretch gap-5 px-4 sm:px-6 lg:px-12 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {HERO_CREATIVES.map((creative) => (
          <div
            key={creative.id}
            className="w-[280px] sm:w-[320px] lg:w-[360px] shrink-0 snap-start"
          >
            <AdCard
              creative={creative}
              isDecorative={false}
              showConceptBadge={true}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
