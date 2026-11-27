'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, CheckCircle2, ShieldCheck, TrendingUp, Award, Zap } from 'lucide-react';

export function HomeHero() {
  const router = useRouter();
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteUrl.trim()) {
      router.push(`/contact?url=${encodeURIComponent(websiteUrl.trim())}`);
    } else {
      router.push('/contact');
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between bg-[#000000] text-white overflow-hidden pt-28 sm:pt-36 pb-12 sm:pb-16 select-none">
      {/* Subtle Studio Ambient Lighting (Warm Amber & Graphite Refraction) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full blur-[140px] bg-[#FFAD49]/[0.08] pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[120px] bg-[#FFAD49]/[0.04] pointer-events-none" 
        aria-hidden="true"
      />

      {/* Main Content Stage */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 w-full my-auto text-center flex flex-col items-center">
        
        {/* Senior Studio Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md mb-8 transition-transform hover:scale-105 duration-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs sm:text-sm font-sans font-medium text-white/90 tracking-tight">
            Sydney HQ & Worldwide · Q4 Growth Partnerships Open
          </span>
        </div>

        {/* Primary Editorial Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[6.2rem] font-sans font-black tracking-[-0.04em] leading-[0.96] mb-6 max-w-5xl">
          <span className="text-[#FFFFFF] block">Marketing that</span>
          <span className="text-[#FFAD49] block">brings more.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-2xl text-[#A0A0A0] font-sans font-normal tracking-tight max-w-2xl mb-10 leading-relaxed">
          More visibility. More customers. More growth.
        </p>

        {/* Interactive Growth Audit Bar & Primary Action */}
        <div className="w-full max-w-xl mx-auto mb-6">
          <form
            onSubmit={handleAuditSubmit}
            className="flex flex-col sm:flex-row items-center gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/[0.07] border border-white/[0.14] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:border-[#FFAD49]/80 focus-within:ring-2 focus-within:ring-[#FFAD49]/20 transition-all duration-200"
          >
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="Enter your website (e.g. yourbrand.com)"
              className="w-full sm:flex-1 bg-transparent px-5 py-3.5 sm:py-3 text-white placeholder-white/40 text-sm sm:text-base font-sans font-medium focus:outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-3.5 rounded-xl sm:rounded-full bg-[#FFAD49] hover:bg-[#ffbe6a] text-[#000000] font-sans font-bold text-sm sm:text-base tracking-tight transition-all duration-200 active:scale-95 shadow-[0_10px_30px_-5px_rgba(255,173,73,0.5)] shrink-0 group"
            >
              <span>Let&apos;s grow together</span>
              <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#8c887f] font-sans font-medium mb-12 sm:mb-16">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFAD49]" />
            100% Free Strategy Blueprint
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFAD49]" />
            No Long-Term Lock-In Contracts
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#FFAD49]" />
            Official Google Premier Partner
          </span>
        </div>

      </div>

      {/* Bottom Performance Metrics Ribbon */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 border-t border-white/[0.08] pt-6 sm:pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
              94.8%
            </span>
            <span className="text-xs sm:text-sm text-[#8c887f] font-sans mt-0.5">
              Client Retention Rate
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-2xl sm:text-3xl text-[#FFAD49] tracking-tight">
              $42M+
            </span>
            <span className="text-xs sm:text-sm text-[#8c887f] font-sans mt-0.5">
              Tracked Client Revenue
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight">
              3.8x
            </span>
            <span className="text-xs sm:text-sm text-[#8c887f] font-sans mt-0.5">
              Avg Blended ROAS
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-2xl sm:text-3xl text-[#FFAD49] tracking-tight">
              Top 3%
            </span>
            <span className="text-xs sm:text-sm text-[#8c887f] font-sans mt-0.5">
              Google Premier Partner
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
