'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export function DarkRebuildSection() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#161514] text-white overflow-hidden select-none border-t border-white/10">
      {/* Background Subtle Tech Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f7ac4f]/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-[#f7ac4f] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
          <span>Zero Obligation · Free 15-Minute Strategy Review</span>
        </div>

        {/* Main Center Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.06] mb-5">
          See your digital marketing roadmap, free.
        </h2>

        {/* Plain-English, Simple Subtitle */}
        <p className="font-sans text-base sm:text-lg text-[#d9d6d1] max-w-2xl mx-auto mb-9 font-normal leading-relaxed">
          Send your website address. We audit your Google search rankings, paid social opportunities, and conversion speed—and walk you through our recommendations on a quick 15-minute call tomorrow.
        </p>

        {/* Input Pill Bar */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-7">
          <div className="relative flex items-center p-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40 focus-within:border-white transition-all shadow-lg">
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
              {submitted ? 'Submitted ✓' : 'Get a Free Blueprint'}
            </button>
          </div>
        </form>

        {/* 3 Reassurance Value Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-sans text-[#a8a59f] pt-4 border-t border-white/10 max-w-xl mx-auto">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1f7a37]" />
            <span>Free strategy roadmap</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1f7a37]" />
            <span>No lock-in contracts</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#f7ac4f]" />
            <span>Senior partner review</span>
          </span>
        </div>

        {/* Direct Email Link */}
        <p className="text-xs font-sans text-[#787570] mt-8">
          Have a question first? Email our directors at{' '}
          <a href="mailto:hello@leadedge.agency" className="text-[#f7ac4f] hover:underline font-semibold">
            hello@leadedge.agency
          </a>
        </p>

      </div>
    </section>
  );
}
