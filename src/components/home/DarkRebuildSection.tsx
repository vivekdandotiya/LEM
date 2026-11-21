'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PhoneMockup } from '@/components/ui/PhoneMockup';

export function DarkRebuildSection() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full pt-20 sm:pt-28 pb-12 sm:pb-16 bg-[#161514] text-white overflow-hidden select-none border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Main Center Headline Covering All Services */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.06] mb-4">
          See your homepage & growth engine rebuilt, free.
        </h2>

        {/* Subtitle covering SEO, Ads, and Web Architecture */}
        <p className="font-sans text-base sm:text-lg text-[#d9d6d1] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Send your web address. Lead Edge Marketers audits your SEO keyword taxonomy, ad funnels, and mobile web architecture — free on a 15-minute call tomorrow.
        </p>

        {/* Input Pill Bar */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-5">
          <div className="relative flex items-center p-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40 focus-within:border-white transition-all">
            <input
              type="text"
              required
              placeholder="yourbusiness.com.au"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (submitted) setSubmitted(false);
              }}
              className="w-full px-5 py-3 bg-transparent text-sm sm:text-base font-sans text-white placeholder-white/50 focus:outline-none"
              aria-label="Your website address"
            />
            <button
              type="submit"
              className="shrink-0 px-6 py-3 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 active:scale-95 shadow-sm"
            >
              {submitted ? 'Submitted ✓' : 'Get a Free Rebuild'}
            </button>
          </div>
        </form>

        {/* Support Phone Call Prompt */}
        <p className="text-xs font-sans text-[#d1cec7]">
          Questions about our full-service rebuilds? Call{' '}
          <a href="tel:0452424845" className="text-[#f7ac4f] hover:underline font-bold">
            0452 424 845
          </a>
          .
        </p>
      </div>

      {/* Row of Mobile Mockups Showcasing All Agency Services */}
      <div aria-hidden="true" className="relative mt-10 pt-4 w-full overflow-hidden flex justify-center items-end">
        {/* Ambient Warm Glow behind Center Phone */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#f7ac4f]/25 blur-[100px] pointer-events-none" />

        <div className="flex items-end justify-center gap-3 sm:gap-5 translate-y-6 sm:translate-y-10 max-w-7xl mx-auto px-4">
          
          {/* Peeking Phone 1: Search & SEO */}
          <div className="hidden lg:block">
            <PhoneMockup
              appName="Marrickville Physio"
              categoryBadge="Search & SEO"
              headline="Back, neck or sports pain? We can help."
              subheadline="#1 Google Local 3-Pack ranking. 4.9 stars with 160 reviews."
              ctaText="Book online today"
              ctaColor="#1f7a37"
              theme="cream"
              rating="5.0 ★★★★★ #1 on Maps"
            />
          </div>

          {/* Peeking Phone 2: Performance Paid Ads (PPC) */}
          <div className="hidden md:block">
            <PhoneMockup
              appName="Norton Street Clinic"
              categoryBadge="Paid Media"
              headline="Targeted Meta & Google acquisition funnels"
              subheadline="4.8x verified ROAS target with direct-response creative sequencing."
              ctaText="Get free audit"
              ctaColor="#2563eb"
              theme="dark"
              rating="4.8x ★ ROAS Target"
            />
          </div>

          {/* =========================================================================
              CENTER HIGHLIGHTED PHONE: "YOURS: FULL-FUNNEL REBUILD"
              ========================================================================= */}
          <div className="relative z-20 flex flex-col items-center">
            {/* The "Yours" Label in Orange */}
            <span className="text-xs sm:text-sm font-sans font-extrabold text-[#f7ac4f] tracking-wider uppercase mb-2 animate-bounce">
              Yours: Full-Funnel Rebuild
            </span>

            <div className="w-[260px] sm:w-[290px] h-[500px] sm:h-[530px] rounded-[38px] p-3 border-4 border-[#f7ac4f] bg-[#161514] shadow-[0_0_50px_rgba(247,172,79,0.5)] flex flex-col justify-between">
              {/* Top Notch */}
              <div className="w-20 h-4 bg-[#0c0d0e] rounded-full mx-auto mb-3" />

              {/* Wireframe / Preview Ready Canvas */}
              <div className="w-full h-full rounded-[26px] bg-[#FAF8F5] p-5 flex flex-col justify-between text-[#161514]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-5 w-24 bg-[#e8e6e2] rounded-full" />
                    <span className="text-[9px] font-mono font-bold text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded-full">
                      LIVE IN 14 DAYS
                    </span>
                  </div>
                  <div className="h-8 w-full bg-[#161514] rounded-lg mb-2" />
                  <div className="h-4 w-3/4 bg-[#8f8a82]/40 rounded mb-6" />
                  
                  <div className="p-3 rounded-xl bg-white border border-[#e8e6e2] shadow-sm mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#5d5a55] block mb-1">
                      ALL-IN-ONE GROWTH
                    </span>
                    <p className="text-xs font-bold text-[#161514]">
                      SEO + High-ROAS Ads + Web Rebuild
                    </p>
                  </div>

                  <div className="h-10 w-full bg-[#f7ac4f] rounded-xl shadow-sm flex items-center justify-center font-bold text-xs text-[#161514]">
                    Walkthrough on 15-Min Call
                  </div>
                </div>
                <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[10px] text-[#5d5a55]">
                  <span>Custom rebuild ready</span>
                  <span className="font-bold text-[#b45309]">Free Tomorrow</span>
                </div>
              </div>
            </div>
          </div>

          {/* Peeking Phone 4: High-Speed Web Architecture */}
          <div className="hidden md:block">
            <PhoneMockup
              appName="Copper Lane Dental"
              categoryBadge="Web Architecture"
              headline="0.4s fast-loading Next.js digital experience"
              subheadline="100 Lighthouse mobile performance score with instant appointment booking."
              ctaText="Check speed score"
              ctaColor="#0369a1"
              theme="cream"
              rating="100 ★ Lighthouse Score"
            />
          </div>

          {/* Peeking Phone 5: Social & Video Production */}
          <div className="hidden lg:block">
            <PhoneMockup
              appName="Peppergum Studio"
              categoryBadge="Social & Video"
              headline="Editorial short-form video & brand equity"
              subheadline="High-conversion reels and TikToks filmed, edited, and scaled."
              ctaText="View portfolio"
              ctaColor="#991b1b"
              theme="dark"
              rating="5.0 ★★★★★ Creative Studio"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
