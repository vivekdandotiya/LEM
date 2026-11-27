'use client';

import React from 'react';
import Link from 'next/link';
import { HeroGrowthShowcase } from '@/components/hero/HeroGrowthShowcase';
import { CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';

export function HomeHero() {
  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-16 sm:pb-24 bg-white text-[#161514] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: High-Clarity, Minimalist Copywriting (Less Text, Simple Meaning)
              ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f6f4ef] border border-[#e8e4db] w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-sans font-semibold text-[#161514] tracking-tight">
                Digital Growth Agency · Sydney & Worldwide
              </span>
            </div>

            {/* Main Headline - Punchy, Simple, Plain English */}
            <h1 className="text-[clamp(2.4rem,4.6vw,4rem)] font-sans font-extrabold tracking-[-0.035em] leading-[1.04] text-[#161514] mb-4">
              We turn search & ads <br className="hidden sm:inline" />
              into <span className="text-[#b45309]">paying clients.</span>
            </h1>

            {/* Subtitle - One Simple Sentence */}
            <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed max-w-lg mb-8 font-normal">
              High-performance SEO, paid advertising, and conversion-first websites built to scale your business.
            </p>

            {/* Direct High-Contrast Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-7">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#161514] hover:bg-[#2c2b29] text-white font-sans font-bold text-sm tracking-tight transition-all duration-150 active:scale-95 shadow-md shadow-black/10 group"
              >
                <span>Get Free Growth Plan</span>
                <ArrowRight className="w-4 h-4 text-[#f7ac4f] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/marketing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#faf9f6] hover:bg-[#f2efe9] text-[#161514] border border-[#e2ded6] font-sans font-bold text-sm tracking-tight transition-all duration-150 active:scale-95 shadow-2xs group/btn"
              >
                <span>Selected Work</span>
                <ArrowUpRight className="w-4 h-4 text-[#78716c] group-hover/btn:text-[#161514] transition-colors" />
              </Link>
            </div>

            {/* Friction-Free Reassurance */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-[#78716c] pt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% Free Strategy Audit
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                No Lock-In Contracts
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ★★★★★ 4.9/5 Rating (80+ Brands)
              </span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Visual-First Case Study Spotlight (Real Photography & Proof)
              ========================================================================= */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <HeroGrowthShowcase />
          </div>

        </div>
      </div>
    </section>
  );
}
