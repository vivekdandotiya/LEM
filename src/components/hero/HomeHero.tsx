'use client';

import React from 'react';
import Link from 'next/link';
import { HeroTeddyAnimator } from '@/components/hero/HeroTeddyAnimator';

export function HomeHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#000000] text-white overflow-hidden pt-28 pb-16 sm:py-32">
      {/* Photorealistic 3D Teddy Bear Animation (Attached visually to left edge, 10s loop) */}
      <HeroTeddyAnimator />

      {/* Main Container with Generous Negative Space & Editorial Typography */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Offset to give the left ~30% of viewport to the peeking teddy bear */}
          <div className="lg:col-span-8 lg:col-start-5 xl:col-start-5 flex flex-col justify-center text-left pl-0 lg:pl-6">
            
            {/* Primary Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] font-sans font-black tracking-[-0.04em] leading-[0.98] mb-6 select-none">
              <span className="text-[#FFFFFF] block">Marketing that</span>
              <span className="text-[#FFAD49] block">brings more.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl lg:text-2xl text-[#A0A0A0] font-sans font-normal tracking-tight max-w-xl mb-10 leading-relaxed">
              More visibility. More customers. More growth.
            </p>

            {/* Primary Action Button */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#FFAD49] hover:bg-[#ffbe6a] text-[#000000] font-sans font-bold text-base sm:text-lg tracking-tight transition-all duration-200 active:scale-95 shadow-[0_12px_35px_-10px_rgba(255,173,73,0.4)] group"
              >
                <span>Let&apos;s grow together</span>
                <span className="text-xl leading-none font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
