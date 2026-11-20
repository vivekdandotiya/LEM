'use client';

import React from 'react';

interface BrandItem {
  id: string;
  name: string;
  category: string;
  logoSvg: React.ReactNode;
}

export function BrandTrustBar() {
  return (
    <section className="py-16 sm:py-20 bg-[#F6F3EC] border-b border-ink/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        {/* Eyebrow: 04 / BRAND PARTNERS */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#B08D57]" aria-hidden="true" />
          <span className="text-xs font-mono tracking-widest uppercase text-stone font-semibold">
            04 / BRAND PARTNERS
          </span>
        </div>

        {/* Headline matching user reference image */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-ink tracking-tight max-w-3xl mx-auto mb-12 sm:mb-16 leading-tight">
          Proudly Partnering With Brands That Demand Results, Not Just Deliverables.
        </h2>

        {/* Brand Logos Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 items-center justify-items-center transition-opacity">
          {/* 1. Watches & Crystals */}
          <div className="flex items-center gap-2.5 text-stone-700 hover:text-ink transition-colors group">
            <svg
              className="w-8 h-8 text-[#7A5C2E] group-hover:scale-105 transition-transform"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="24" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" />
              <path d="M20 11L22 15H18L20 11Z" fill="currentColor" />
            </svg>
            <div className="text-left leading-none">
              <span className="block text-xs font-serif font-bold tracking-wider uppercase text-ink">
                WATCHES
              </span>
              <span className="block text-xs font-sans font-medium tracking-widest text-stone-700">
                &amp; CRYSTALS
              </span>
            </div>
          </div>

          {/* 2. Tapioca Express */}
          <div className="flex items-center gap-1.5 text-stone-700 hover:text-ink transition-colors group">
            <span className="text-base sm:text-lg font-serif italic font-bold text-[#5C4018] group-hover:scale-105 transition-transform">
              Tapioca
            </span>
            <span className="text-xs sm:text-sm font-sans font-extrabold tracking-tight text-ink uppercase">
              Express
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A5C2E]" />
          </div>

          {/* 3. Watch Pilot */}
          <div className="flex items-center gap-2 text-stone-700 hover:text-ink transition-colors group">
            <svg
              className="w-7 h-7 text-ink group-hover:text-[#B08D57] transition-colors"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 16L16 6L28 16L16 26L4 16Z" stroke="currentColor" strokeWidth="2.5" />
              <path d="M16 10V22M10 16H22" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div className="text-left font-display font-black tracking-widest text-xs sm:text-sm uppercase text-ink">
              WATCH <span className="text-stone-700">PILOT</span>
            </div>
          </div>

          {/* 4. Prosper Business Credit */}
          <div className="flex flex-col items-center justify-center text-center group">
            <span className="text-base sm:text-lg font-display font-black tracking-tighter text-[#1C2C42] group-hover:text-ink transition-colors leading-none">
              PROSPER
            </span>
            <span className="text-xs font-mono tracking-widest uppercase text-stone-700 font-semibold mt-0.5">
              BUSINESS CREDIT
            </span>
          </div>

          {/* 5. Gameday Social */}
          <div className="flex items-center gap-1.5 group">
            <span className="font-serif italic text-base sm:text-lg font-extrabold text-ink group-hover:text-[#B08D57] transition-colors">
              Gameday
            </span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-black/5 text-ink">
              SOCIAL
            </span>
          </div>

          {/* 6. Glen Park Senior Living */}
          <div className="flex items-center gap-2 group">
            <svg
              className="w-7 h-7 text-[#3D5237] group-hover:scale-105 transition-transform"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 4C11.58 4 8 7.58 8 12C8 16.42 16 28 16 28C16 28 24 16.42 24 12C24 7.58 20.42 4 16 4ZM16 14C14.9 14 14 13.1 14 12C14 10.9 14.9 10 16 10C17.1 10 18 10.9 18 12C18 13.1 17.1 14 16 14Z" />
            </svg>
            <div className="text-left leading-tight">
              <span className="block text-xs font-serif font-bold uppercase tracking-wider text-ink">
                GLEN PARK
              </span>
              <span className="block text-xs font-sans text-stone-700 tracking-tight font-medium">
                SENIOR LIVING
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
