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
              LEFT COLUMN: Plain-English Headline & Simple URL Submission Bar
              ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Category Pill */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700">
                Full-Service Digital Marketing Agency
              </span>
            </div>

            {/* Main Headline - Crystal Clear */}
            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-display font-extrabold tracking-tight leading-[1.05] text-[#0f172a] mb-5">
              More traffic. More calls. Real business growth.
            </h1>

            {/* Subtitle - Zero Jargon */}
            <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-7 font-normal">
              We help your business get found at the top of Google, run high-return Facebook and Instagram ads, and build websites that convert visitors into paying clients.
            </p>

            {/* Simple URL Input Bar */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg mb-3">
              <div className="relative flex items-center p-1.5 rounded-full border border-slate-300 bg-white shadow-sm hover:border-slate-400 focus-within:border-sky-500 transition-all">
                <input
                  type="text"
                  required
                  placeholder="Enter your website or business name"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (submitted) setSubmitted(false);
                  }}
                  className="w-full px-5 py-3 bg-transparent text-sm sm:text-base font-sans text-slate-900 placeholder-slate-400 focus:outline-none"
                  aria-label="Your website address"
                />
                <button
                  type="submit"
                  className="shrink-0 px-6 sm:px-7 py-3 rounded-full bg-[#0c1f38] hover:bg-slate-900 text-white font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 active:scale-95 shadow-sm"
                >
                  {submitted ? 'Submitted ✓' : 'Get Free Plan'}
                </button>
              </div>
            </form>

            {/* Reassurance Simple Copy */}
            <div className="flex items-center gap-2 text-xs font-sans text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>100% Free marketing review · No contracts · No pushy sales calls</span>
            </div>

            {/* 3 Simple Steps */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-sky-700 uppercase block mb-1">
                  1. Send Website
                </span>
                <p className="text-xs font-sans text-slate-500 leading-snug">
                  Type your business name or website link above.
                </p>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-sky-700 uppercase block mb-1">
                  2. Get Your Plan
                </span>
                <p className="text-xs font-sans text-slate-500 leading-snug">
                  We show you exactly how to get more customers.
                </p>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 uppercase block mb-1">
                  3. Start Growing
                </span>
                <p className="text-xs font-sans text-slate-500 leading-snug">
                  We manage your marketing so you can run your business.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: 2-Column Floating Editorial Showcase Wall
              ========================================================================= */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <HeroSlidingWall />
          </div>

        </div>
      </div>
    </section>
  );
}
