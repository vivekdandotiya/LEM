'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, MapPin, Star } from 'lucide-react';

interface MarketingPillar {
  id: number;
  title: string;
  description: string;
  phoneHighlight: string;
}

const PILLARS: MarketingPillar[] = [
  {
    id: 1,
    title: 'Google Ads',
    description: 'The top of the page, from the day it goes live.',
    phoneHighlight: 'ads',
  },
  {
    id: 2,
    title: 'Google profile',
    description: 'The map and the places under it, where most local customers choose.',
    phoneHighlight: 'map',
  },
  {
    id: 3,
    title: 'Blogs and content',
    description: "The questions people ask before they're ready to book.",
    phoneHighlight: 'content',
  },
  {
    id: 4,
    title: 'Website SEO',
    description: 'The results under them, and what AI answers say about you.',
    phoneHighlight: 'seo',
  },
];

export function MarketingBreakdownSection() {
  const [activePillar, setActivePillar] = useState<number>(1);

  return (
    <section className="py-20 sm:py-32 bg-[#F9F9F7] text-[#161514] select-none border-t border-[#e8e6e2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: Copy & Call Booking CTA
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag */}
            <span className="text-xs sm:text-sm font-sans font-bold text-[#161514] uppercase tracking-wider mb-3">
              Small business marketing
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.08] mb-6">
              More of the right customers finding you.
            </h2>

            {/* Subhead */}
            <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed mb-8">
              Lead Edge looks at where you show up now, who&apos;s ahead of you and why, before a 15-minute call. Then we tell you what we&apos;d do first and what it costs.
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-sm sm:text-base tracking-tight transition-all duration-150 shadow-sm active:scale-95"
              >
                Book a 15-minute call
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-xs font-sans text-[#5d5a55] mt-4">
              The call is free. If marketing isn&apos;t worth it for you yet, we will tell you.
            </p>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive Google Search Phone + 4 Numbered Step Rows
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
            
            {/* Phone Mockup Showing Simulated Google Search Results */}
            <div aria-hidden="true" className="w-[280px] sm:w-[310px] h-[550px] rounded-[40px] p-3 border-[3px] border-[#161514] bg-[#0c0d0e] shadow-[0_16px_50px_rgba(22,21,20,0.16)] shrink-0">
              {/* Notch */}
              <div className="w-20 h-4 bg-[#0c0d0e] rounded-full mx-auto mb-2" />

              {/* Screen Content: Google Search App */}
              <div className="w-full h-full rounded-[30px] bg-white overflow-hidden p-4 text-[#161514] flex flex-col justify-between text-left">
                <div>
                  {/* Google Search Bar */}
                  <div className="flex items-center gap-2 p-2.5 rounded-full border border-black/10 bg-[#f4f3f1] mb-3">
                    <Search className="w-3.5 h-3.5 text-[#5d5a55]" />
                    <span className="text-xs font-sans font-medium text-[#161514]">
                      physio near me
                    </span>
                  </div>

                  {/* Search Tabs */}
                  <div className="flex items-center gap-3 text-[10px] font-sans pb-3 border-b border-black/5 text-[#5d5a55]">
                    <span className="font-bold text-[#161514] border-b border-[#161514]">All</span>
                    <span>Maps</span>
                    <span>Images</span>
                    <span>News</span>
                  </div>

                  {/* 1. Sponsored Google Ad Highlight */}
                  <div
                    className={`mt-3 p-3 rounded-2xl border transition-all duration-300 ${
                      activePillar === 1
                        ? 'border-[#f7ac4f] bg-[#f7ac4f]/10 shadow-sm'
                        : 'border-black/5 bg-[#fbfbfa]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-[#5d5a55] mb-1">
                      <span className="bg-[#161514] text-white px-1 rounded">Ad</span>
                      <span>ridgelinesports.com.au</span>
                    </div>
                    <h5 className="font-display font-extrabold text-xs text-[#1a0dab] leading-tight mb-1">
                      Sports Physio Marrickville | Book Online Today
                    </h5>
                    <p className="text-[10px] text-[#5d5a55] leading-snug">
                      Same-week appointments. Health fund rebates on the spot.
                    </p>
                  </div>

                  {/* 2. Google Profile & Local Maps Pack Highlight */}
                  <div
                    className={`mt-3 p-3 rounded-2xl border transition-all duration-300 ${
                      activePillar === 2
                        ? 'border-[#f7ac4f] bg-[#f7ac4f]/10 shadow-sm'
                        : 'border-black/5 bg-[#fbfbfa]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#161514] mb-1.5">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-600" />
                        <span>Places · Inner West</span>
                      </div>
                      <span className="text-[9px] text-[#b45309] font-mono font-bold">Top Rated</span>
                    </div>

                    <div className="space-y-1.5 text-[10px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Marrickville Physio</span>
                        <span className="text-[#b45309] font-bold">4.9 ★ (160)</span>
                      </div>
                      <p className="text-[9px] text-[#5d5a55]">Open until 7pm · Closes soon</p>
                    </div>
                  </div>

                  {/* 3 & 4. Organic SEO & Content Results Highlight */}
                  <div
                    className={`mt-3 p-3 rounded-2xl border transition-all duration-300 ${
                      activePillar === 3 || activePillar === 4
                        ? 'border-[#f7ac4f] bg-[#f7ac4f]/10 shadow-sm'
                        : 'border-black/5 bg-[#fbfbfa]'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-[#5d5a55]">Organic Results & AI Overview</span>
                    <h5 className="font-display font-bold text-xs text-[#1a0dab] leading-tight mt-0.5">
                      What to expect at your first sports physiotherapy visit
                    </h5>
                    <p className="text-[9px] text-[#5d5a55] mt-1 leading-snug">
                      Detailed diagnostic assessment, treatment plan and home exercises...
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center text-[9px] font-mono text-[#5d5a55]">
                  Live Google Local Experience
                </div>
              </div>
            </div>

            {/* 4 Connected Numbered Steps (Matching Reference Image 6) */}
            <div className="flex flex-col gap-3.5 w-full">
              {PILLARS.map((pillar) => {
                const isActive = activePillar === pillar.id;

                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillar(pillar.id)}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left border transition-all duration-200 flex items-start gap-4 ${
                      isActive
                        ? 'bg-white border-[#f7ac4f] shadow-md -translate-x-1'
                        : 'bg-white/60 border-[#e8e6e2] hover:bg-white hover:border-[#d9d6d1]'
                    }`}
                  >
                    {/* Number Badge */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#f7ac4f] text-[#161514]'
                          : 'bg-[#f4f3f1] text-[#5d5a55]'
                      }`}
                    >
                      {pillar.id}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-sm sm:text-base text-[#161514]">
                          {pillar.title}
                        </h4>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isActive ? 'text-[#f7ac4f] translate-x-1' : 'text-[#5d5a55]'
                          }`}
                        />
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-[#5d5a55] mt-1 leading-snug">
                        {pillar.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
