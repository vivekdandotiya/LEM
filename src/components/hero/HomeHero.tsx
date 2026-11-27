'use client';

import React from 'react';
import Link from 'next/link';
import { TeddyBearScene } from '@/components/three/TeddyBearScene';
import { CheckCircle2, ArrowRight, ArrowUpRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export function HomeHero() {
  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-20 sm:pb-28 bg-[#0a0a09] text-white overflow-hidden min-h-[92vh] flex items-center">
      {/* 3D Real Textured Teddy Bear Canvas (Peeking from left, waving hello, 3s loop) */}
      <TeddyBearScene />

      {/* Subtle Cinematic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#f7ac4f]/[0.07] rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: High-Impact Dark Mode Typography
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left pl-0 lg:pl-16">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
              <span className="text-xs font-sans font-semibold text-neutral-300 tracking-tight">
                Digital Growth Agency · Sydney & Worldwide
              </span>
            </div>

            {/* Simple, Punchy Headline as Requested */}
            <h1 className="text-[clamp(2.8rem,5.6vw,4.8rem)] font-sans font-black tracking-[-0.04em] leading-[1.02] text-white mb-5">
              Marketing that <br />
              <span className="text-[#f7ac4f]">brings more.</span>
            </h1>

            {/* Subtitle - Simple Words, Simple Meaning */}
            <p className="font-sans text-base sm:text-xl text-[#a8a29e] leading-relaxed max-w-xl mb-8 font-normal">
              High-performance SEO, paid advertising, and conversion-first websites engineered to scale your revenue.
            </p>

            {/* High-Contrast Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#f7ac4f] hover:bg-[#ffbe6a] text-[#161514] font-sans font-bold text-sm tracking-tight transition-all duration-150 active:scale-95 shadow-[0_10px_30px_-10px_rgba(247,172,79,0.45)] group"
              >
                <span>Get Free Growth Plan</span>
                <ArrowRight className="w-4 h-4 text-[#161514] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 backdrop-blur-md font-sans font-bold text-sm tracking-tight transition-all duration-150 active:scale-95"
              >
                <span>Selected Work</span>
                <ArrowUpRight className="w-4 h-4 text-[#a8a29e]" />
              </Link>
            </div>

            {/* Friction-Free Reassurance */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-[#a8a29e]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f7ac4f]" />
                100% Free Strategy Audit
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f7ac4f]" />
                No Lock-In Contracts
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f7ac4f]" />
                ★★★★★ 4.9/5 Rating (80+ Brands)
              </span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Luxury Dark Glass Growth Benchmark Terminal
              ========================================================================= */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative rounded-[28px] bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Subtle top reflection line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                    Live Client Impact
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 text-[#f7ac4f] text-[10px] font-bold tracking-tight">
                  Verified Data
                </span>
              </div>

              {/* 3 Bold Metric Pillars */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 font-sans block mb-0.5">Paid Acquisition (ROAS)</span>
                    <span className="text-2xl sm:text-3xl font-sans font-black text-white tracking-tight leading-none">
                      4.8x ROAS
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#f7ac4f]/10 text-[#f7ac4f] flex items-center justify-center shrink-0 border border-[#f7ac4f]/20">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 font-sans block mb-0.5">Organic Search Visibility</span>
                    <span className="text-2xl sm:text-3xl font-sans font-black text-emerald-400 tracking-tight leading-none">
                      +342% Inquiries
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 font-sans block mb-0.5">Web Lead Conversion Rate</span>
                    <span className="text-2xl sm:text-3xl font-sans font-black text-[#f7ac4f] tracking-tight leading-none">
                      6.4% CR
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#f7ac4f] flex items-center justify-center shrink-0 border border-amber-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Bottom Card CTA */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Want results like this?</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-bold text-[#f7ac4f] hover:text-white transition-colors"
                >
                  <span>Build custom plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
