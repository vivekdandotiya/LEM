'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroSlidingWall } from '@/components/hero/HeroSlidingWall';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function HomeHero() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-20 bg-white text-[#161514] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: Editorial Headline & Free Growth Blueprint Submission Form
              ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Category Pill */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
                Full-Funnel Digital Marketing Agency
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(2.75rem,5.5vw,4.5rem)] font-display font-extrabold tracking-tight leading-[1.05] text-[#161514] mb-6">
              See your digital growth roadmap tomorrow. Built to scale your revenue.
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="font-sans text-lg sm:text-xl text-[#5d5a55] leading-relaxed max-w-xl mb-8 font-normal">
              Send your website address or ad accounts. Lead Edge analyzes your SEO search rankings, Meta ad funnels, and conversion bottlenecks — and walks you through a tailored digital marketing blueprint on a 15-minute call.
            </p>

            {/* URL Input Bar Form (Rounded Pill with Orange Button) */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg mb-4">
              <div className="relative flex items-center p-1.5 rounded-full border border-[#d9d6d1] bg-white shadow-sm hover:border-[#8f8a82] focus-within:border-[#161514] transition-all">
                <input
                  type="text"
                  required
                  placeholder="yourbusiness.com.au"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (submitted) setSubmitted(false);
                  }}
                  className="w-full px-5 py-3 bg-transparent text-sm sm:text-base font-sans text-[#161514] placeholder-[#8f8a82] focus:outline-none"
                  aria-label="Your website address"
                />
                <button
                  type="submit"
                  className="shrink-0 px-6 sm:px-7 py-3 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 active:scale-95 shadow-sm"
                >
                  {submitted ? 'Submitted ✓' : 'Get a Free Blueprint'}
                </button>
              </div>
            </form>

            {/* Reassurance Copy */}
            <div className="flex items-center gap-2 text-xs font-sans text-[#5d5a55]">
              <span className="w-2 h-2 rounded-full bg-[#1f7a37]" />
              <span>The strategy audit costs nothing. No lock-in, no sales pressure.</span>
            </div>

            {/* 3 Step Quick Timeline */}
            <div className="grid grid-cols-3 gap-4 pt-10 mt-8 border-t border-[#f4f3f1]">
              <div>
                <span className="text-xs font-mono font-bold text-[#b45309] uppercase block mb-1">
                  1. Today (Free)
                </span>
                <p className="text-xs font-sans text-[#5d5a55] leading-snug">
                  Send your website link or business name.
                </p>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#b45309] uppercase block mb-1">
                  2. Tomorrow (Free)
                </span>
                <p className="text-xs font-sans text-[#5d5a55] leading-snug">
                  15-min call to review your bespoke growth blueprint.
                </p>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1f7a37] uppercase block mb-1">
                  3. In 14 Days
                </span>
                <p className="text-xs font-sans text-[#5d5a55] leading-snug">
                  Live campaigns scaling on Google, Meta, and Search.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: 3-Column Auto-Sliding Phone Screen Showcase
              ========================================================================= */}
          <div aria-hidden="true" className="lg:col-span-6 relative w-full flex items-center justify-center select-none overflow-hidden">
            <HeroSlidingWall />
          </div>

        </div>
      </div>
    </section>
  );
}
