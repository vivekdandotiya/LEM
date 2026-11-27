'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroGrowthShowcase } from '@/components/hero/HeroGrowthShowcase';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';

export function HomeHero() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-16 sm:pb-24 bg-white text-[#161514] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: High-Impact Typography & Free Plan CTA
              ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f6f4ef] border border-[#e8e4db] w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-sans font-semibold text-[#161514] tracking-tight">
                Full-Service Digital Growth Partner · Sydney & Global
              </span>
            </div>

            {/* Main Headline - Senior Copy: Clear, Authoritative, Revenue-Driven */}
            <h1 className="text-[clamp(2.4rem,4.8vw,4.1rem)] font-sans font-extrabold tracking-[-0.03em] leading-[1.08] text-[#161514] mb-5">
              Turn search visibility & ad spend into predictable revenue.
            </h1>

            {/* Subtitle - Plain English, Zero Jargon */}
            <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed max-w-xl mb-7 font-normal">
              We help ambitious businesses scale through technical SEO, performance advertising, and conversion-first websites. No vanity metrics or generic reports—just qualified leads and compounding revenue.
            </p>

            {/* Simple URL Input Bar */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg mb-3">
              <div className="relative flex items-center p-1.5 rounded-full border border-[#d9d6d1] bg-white shadow-sm hover:border-[#161514]/40 focus-within:border-[#161514] transition-all">
                <input
                  type="text"
                  required
                  placeholder="Enter your website or business name"
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
                  className="shrink-0 px-6 sm:px-7 py-3 rounded-full bg-[#f7ac4f] hover:bg-[#ffbe6a] text-[#161514] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 active:scale-95 shadow-sm"
                >
                  {submitted ? 'Submitted ✓' : 'Get Free Plan →'}
                </button>
              </div>
            </form>

            {/* Reassurance Simple Copy */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-sans text-[#5d5a55]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% Free strategy audit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                No contracts or lock-ins
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Zero pushy sales calls
              </span>
            </div>

            {/* Social Proof Strip */}
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#f0eee9]">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#161514] text-white flex items-center justify-center font-bold text-xs border-2 border-white">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-[#b45309] text-white flex items-center justify-center font-bold text-xs border-2 border-white">
                  SK
                </div>
                <div className="w-8 h-8 rounded-full bg-[#0f2b48] text-white flex items-center justify-center font-bold text-xs border-2 border-white">
                  MR
                </div>
                <div className="w-8 h-8 rounded-full bg-[#f7ac4f] text-[#161514] flex items-center justify-center font-bold text-xs border-2 border-white">
                  AL
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1 text-[#f59e0b] text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[#161514] font-bold text-xs ml-1">4.9 / 5.0</span>
                </div>
                <span className="text-[11px] text-[#78716c]">
                  Trusted by 80+ high-growth Australian businesses
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive Growth Engine Showcase (Clean, No Conveyor Loop)
              ========================================================================= */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <HeroGrowthShowcase />
          </div>

        </div>
      </div>
    </section>
  );
}
