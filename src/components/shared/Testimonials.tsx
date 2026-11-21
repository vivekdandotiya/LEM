'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const isDark = theme === 'dark';
  // Duplicate items for continuous marquee loop
  const displayItems = [...items, ...items];
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="testimonials-section"
      data-testid="testimonials"
      data-surface={isDark ? 'dark' : 'light'}
      className={`py-24 sm:py-32 select-none transition-colors relative overflow-hidden ${
        isDark ? 'bg-[#161514] text-white' : 'bg-white text-[#161514]'
      } ${className}`}
      data-theme={isDark ? 'dark' : undefined}
    >
      <div id="testimonials" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />

      <style>{`
        @keyframes autoSlideReviews {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .reviews-slider-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: autoSlideReviews 42s linear infinite;
        }
        .reviews-slider-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-slider-track {
            animation: none;
          }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10">
        {/* Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b ${
            isDark ? 'border-white/10' : 'border-ink/10'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#f7ac4f]" aria-hidden="true" />
              <span
                className={`text-xs font-mono tracking-widest uppercase font-semibold ${
                  isDark ? 'text-[#f7ac4f]' : 'text-[#5d5a55]'
                }`}
              >
                03 / CLIENT PERSPECTIVE
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-[#161514]'
              }`}
            >
              Honest partnership{' '}
              <span className={`font-serif italic ${isDark ? 'text-[#f7ac4f]' : 'text-[#b45309]'}`}>
                reviews.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Auto-sliding Indicator */}
            <div
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold ${
                isDark
                  ? 'bg-white/10 border-white/20 text-[#F6F3EC]'
                  : 'bg-black/5 border-ink/10 text-[#3E3835]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AUTO-SLIDING CLIENT REVIEWS</span>
            </div>

            {/* Manual Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                className={`p-3 rounded-full border transition-all shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isDark
                    ? 'bg-[#1C1D1F] border-white/20 text-[#F6F3EC] hover:border-[#D9C29A] hover:text-[#D9C29A]'
                    : 'bg-white border-ink/10 text-ink hover:border-[#B08D57] hover:text-[#B08D57]'
                }`}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                className={`p-3 rounded-full border transition-all shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isDark
                    ? 'bg-[#1C1D1F] border-white/20 text-[#F6F3EC] hover:border-[#D9C29A] hover:text-[#D9C29A]'
                    : 'bg-white border-ink/10 text-ink hover:border-[#B08D57] hover:text-[#B08D57]'
                }`}
                aria-label="Next reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Sliding Small Cards Container */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden py-3"
      >
        <div className="reviews-slider-track px-4 sm:px-8">
          {displayItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[330px] sm:w-[370px] shrink-0 rounded-[24px] bg-white border border-stone-200/90 p-6 sm:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:border-[#B08D57]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: 5 Gold Stars & Service Pill */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  {/* 5 Solid Gold Stars + Rating */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 text-[#F59E0B]" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-900">5.0</span>
                  </div>

                  {/* Discipline Tag */}
                  <span className="px-2.5 py-0.5 rounded-full bg-[#B08D57]/15 border border-[#B08D57]/30 text-xs font-mono font-bold text-[#6F4E1E] uppercase">
                    {item.service.split(' ')[0]}
                  </span>
                </div>

                {/* Review Quote Text: Deep Black, Crisp, High Contrast & Ultra-Legible */}
                <p className="text-[#09090B] font-sans font-medium text-[15.5px] sm:text-[16px] leading-[1.6] mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Client Row: Real Photo + Details */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#B08D57]/50 shadow-sm shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#1C1D1F] border border-[#B08D57]/50 text-[#D9C29A] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="text-left">
                    <h4 className="font-display font-extrabold text-[15px] text-[#09090B] leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#52525B] font-sans font-normal">
                      {item.role} · <span className="font-bold text-[#09090B]">{item.company}</span>
                    </p>
                  </div>
                </div>

                {/* Location Badge */}
                {item.location && (
                  <span className="text-xs font-mono font-semibold text-stone-700 bg-stone-100 border border-stone-200/80 px-2.5 py-1 rounded-full shrink-0">
                    {item.location.split(',')[1]?.trim() || item.location}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
