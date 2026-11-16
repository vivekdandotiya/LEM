'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  verified: boolean;
}

const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Lead Edge restructured our entire search taxonomy and unified our paid media channels. The reporting is candid, transparent, and focused purely on revenue contribution.',
    author: 'Marcus Vance',
    role: 'Director of Growth',
    company: 'TrailNest Cabins',
    verified: false,
  },
  {
    id: 't2',
    quote:
      'Having creative production and media buying executed under one discipline ended the bottleneck between design and distribution. Every asset is built for conversion.',
    author: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Botanical Heritage',
    verified: false,
  },
  {
    id: 't3',
    quote:
      'Their engineering discipline replaced our bloated template store with a sub-second custom web architecture. Our checkout velocity and mobile organic visibility improved immediately.',
    author: 'Julian Croft',
    role: 'Head of Ecommerce',
    company: 'Oak & Thread Co.',
    verified: false,
  },
  {
    id: 't4',
    quote:
      'No fluff, no vanity follower chasing. Just clear strategic positioning, rigorous creative iteration, and predictable acquisition pipelines that our board respects.',
    author: 'Sarah Jenkins',
    role: 'Managing Partner',
    company: 'Hillcrest Residences',
    verified: false,
  },
];

export interface TestimonialsProps {
  items?: TestimonialItem[];
  theme?: 'light' | 'dark';
  className?: string;
}

export function Testimonials({
  items = SAMPLE_TESTIMONIALS,
  theme = 'light',
  className = '',
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const isDark = theme === 'dark';
  const active = items[currentIndex];

  return (
    <section
      className={`py-20 sm:py-28 select-none transition-colors ${
        isDark ? 'bg-charcoal text-ivory' : 'bg-transparent text-ink'
      } ${className}`}
      data-theme={isDark ? 'dark' : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                CLIENT PERSPECTIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Honest partnership <span className="font-serif italic text-gold-deep">reviews.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone px-3 py-1 rounded-full border border-current/10">
              Sample Feedback Drafts
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prev}
                className={`p-2.5 rounded-full border border-current/15 hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                }`}
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className={`p-2.5 rounded-full border border-current/15 hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                }`}
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div
          className={`relative p-8 sm:p-12 md:p-16 rounded-[28px] border transition-all duration-300 shadow-soft-sm ${
            isDark
              ? 'bg-graphite/60 border-white/12 text-ivory'
              : 'bg-white border-ink/10 text-ink shadow-soft-md'
          }`}
        >
          <Quote className="w-12 h-12 text-gold/30 mb-6" aria-hidden="true" />

          <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium tracking-tight leading-relaxed max-w-4xl">
            &ldquo;{active.quote}&rdquo;
          </p>

          <div className="pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-display font-bold text-base sm:text-lg">
                {active.author}
              </div>
              <div className="text-xs sm:text-sm font-sans text-stone mt-0.5">
                {active.role} · <span className="font-semibold text-current">{active.company}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-stone tracking-wider uppercase">
                {currentIndex + 1} / {items.length}
              </span>
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'w-6 bg-gold'
                        : 'w-2 bg-current/20 hover:bg-current/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
