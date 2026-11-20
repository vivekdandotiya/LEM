'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, TestimonialItem } from '@/data/testimonials';

export type { TestimonialItem };

export interface TestimonialsProps {
  items?: TestimonialItem[];
  theme?: 'light' | 'dark';
  className?: string;
}

export function Testimonials({
  items = TESTIMONIALS,
  theme = 'light',
  className = '',
}: TestimonialsProps) {
  // If NEXT_PUBLIC_SHOW_SAMPLES is 'false' (or URL ?samples=false), hide unverified placeholder items
  const [samplesParam, setSamplesParam] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('samples') === 'false') {
        setSamplesParam(false);
      } else if (urlParams.get('samples') === 'true') {
        setSamplesParam(true);
      }
    }
  }, []);

  const envShowSamples = process.env.NEXT_PUBLIC_SHOW_SAMPLES !== 'false';
  const showSamples = samplesParam !== null ? samplesParam : envShowSamples;

  const verifiedItems = items.filter((item) => item.verified);
  const displayItems = verifiedItems.length > 0 ? verifiedItems : (showSamples ? items : []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // If no items to display (e.g. showSamples is false and no verified items), hide section completely
  if (displayItems.length === 0) {
    return null;
  }

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? displayItems.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === displayItems.length - 1 ? 0 : prevIdx + 1));
  };

  const isDark = theme === 'dark';

  // Compute clean initials for circle avatar
  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (parts[0] || 'LE').slice(0, 2).toUpperCase();
  };

  return (
    <section
      id="testimonials-section"
      data-testid="testimonials"
      data-surface={isDark ? 'dark' : 'light'}
      className={`py-24 sm:py-32 select-none transition-colors relative overflow-hidden ${
        isDark ? 'bg-charcoal text-ivory' : 'bg-[#F6F3EC] text-ink'
      } ${className}`}
      data-theme={isDark ? 'dark' : undefined}
    >
      <div id="testimonials" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b mb-12 ${
            isDark ? 'border-white/10' : 'border-ink/10'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B08D57]" aria-hidden="true" />
              <span
                className={`text-xs font-mono tracking-widest uppercase font-semibold ${
                  isDark ? 'text-[#D9C29A]' : 'text-[#57534E]'
                }`}
              >
                03 / CLIENT PERSPECTIVE
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-[#F6F3EC]' : 'text-[#0F1011]'
              }`}
            >
              Honest partnership{' '}
              <span className={`font-serif italic ${isDark ? 'text-[#D9C29A]' : 'text-[#5C4018]'}`}>
                reviews.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Sample Indicator Pill */}
            <div
              className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border ${
                isDark
                  ? 'border-[#B08D57]/40 bg-[#B08D57]/10 text-[#D9C29A]'
                  : 'border-[#B08D57]/40 bg-[#B08D57]/10 text-[#5C4018]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" aria-hidden="true" />
              <span>SAMPLE FEEDBACK DRAFTS</span>
            </div>

            {/* Prev / Next Controls for Sliding Cards */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className={`p-3 rounded-full transition-all shadow-soft-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold border ${
                  isDark
                    ? 'bg-[#141518] border-white/15 text-white hover:border-[#B08D57] hover:text-[#B08D57]'
                    : 'bg-white border-ink/10 text-ink hover:border-[#B08D57] hover:text-[#B08D57]'
                }`}
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className={`p-3 rounded-full transition-all shadow-soft-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold border ${
                  isDark
                    ? 'bg-[#141518] border-white/15 text-white hover:border-[#B08D57] hover:text-[#B08D57]'
                    : 'bg-white border-ink/10 text-ink hover:border-[#B08D57] hover:text-[#B08D57]'
                }`}
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Cards Carousel Track */}
        <div className="relative overflow-hidden w-full py-2">
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {displayItems.map((item, idx) => (
              <div
                key={item.id}
                className="w-full shrink-0"
              >
                <div
                  className={`relative rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-soft-md overflow-hidden border transition-all duration-300 ${
                    isDark ? 'bg-[#141518] border-white/15 text-[#F6F3EC]' : 'bg-white border-ink/10 text-ink'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 lg:gap-12">
                    {/* Left: Initials Monogram in Designer Circle Avatar */}
                    <div className="flex flex-col items-center justify-center shrink-0">
                      <div
                        className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center border-2 shadow-lg transition-transform ${
                          isDark
                            ? 'bg-[#1C1D1F] border-[#B08D57]/40 text-[#D9C29A]'
                            : 'bg-[#F6F3EC] border-[#B08D57]/40 text-[#5C4018]'
                        }`}
                      >
                        <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-wider">
                          {getInitials(item.name)}
                        </span>
                        {!item.verified && (
                          <span
                            className={`mt-2 text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                              isDark
                                ? 'bg-[#B08D57]/20 border-[#B08D57]/40 text-[#D9C29A]'
                                : 'bg-[#B08D57]/15 border-[#B08D57]/30 text-[#5C4018]'
                            }`}
                          >
                            SAMPLE
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Quote & Details */}
                    <div className="flex-1 flex flex-col justify-between text-left">
                      <div>
                        {/* Service Tag & Sample Flag */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                          <div
                            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold ${
                              isDark
                                ? 'bg-[#B08D57]/20 border-[#B08D57]/40 text-[#D9C29A]'
                                : 'bg-[#B08D57]/15 border-[#B08D57]/30 text-[#5C4018]'
                            }`}
                          >
                            <span>{item.service}</span>
                          </div>

                          {!item.verified && (
                            <span
                              className={`text-xs font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded border ${
                                isDark
                                  ? 'border-white/10 bg-white/5 text-stone-300'
                                  : 'border-ink/10 bg-black/5 text-[#57534E]'
                              }`}
                            >
                              SAMPLE DRAFT
                            </span>
                          )}
                        </div>

                        {/* Quote Text */}
                        <div className="relative mb-6">
                          <Quote className="w-10 h-10 text-[#B08D57]/20 absolute -top-4 -left-4 -z-10 pointer-events-none" />
                          <p
                            className={`text-lg sm:text-xl lg:text-2xl font-serif font-medium leading-relaxed ${
                              isDark ? 'text-[#F6F3EC]' : 'text-[#0F1011]'
                            }`}
                          >
                            &ldquo;{item.quote}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Author Footer */}
                      <div
                        className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isDark ? 'border-white/10' : 'border-ink/10'
                        }`}
                      >
                        <div>
                          <h3
                            className={`text-xl sm:text-2xl font-display font-extrabold ${
                              isDark ? 'text-white' : 'text-[#0F1011]'
                            }`}
                          >
                            {item.name}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm font-sans mt-0.5 ${
                              isDark ? 'text-stone-300' : 'text-[#57534E]'
                            }`}
                          >
                            {item.role ? `${item.role} · ` : ''}
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0F1011]'}`}>
                              {item.company}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-mono tracking-widest uppercase font-semibold ${
                              isDark ? 'text-stone-300' : 'text-[#57534E]'
                            }`}
                          >
                            0{idx + 1} / 0{displayItems.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Slide Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {displayItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-[#B08D57]'
                  : isDark
                  ? 'w-2 bg-white/20 hover:bg-white/40'
                  : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
