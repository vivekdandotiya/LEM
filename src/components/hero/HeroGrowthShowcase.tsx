'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Star,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  MousePointerClick,
  Check,
} from 'lucide-react';

type TabType = 'seo' | 'ads' | 'web';

export function HeroGrowthShowcase() {
  const [activeTab, setActiveTab] = useState<TabType>('seo');

  return (
    <div className="w-full max-w-xl mx-auto lg:max-w-none select-none">
      {/* Outer Card with Soft Elevation & Glass Border */}
      <div className="relative rounded-[28px] bg-white border border-[#e8e5de] shadow-[0_20px_60px_-15px_rgba(20,20,20,0.12),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300">
        
        {/* Top Header & Interactive Tab Switcher */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-[#f0eee9] bg-[#faf9f6]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#78716c]">
              Live Agency Benchmarks
            </span>
          </div>

          {/* 3 Tab Switcher Buttons */}
          <div className="flex items-center bg-[#edeae3] p-1 rounded-full gap-1 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all duration-200 ${
                activeTab === 'seo'
                  ? 'bg-white text-[#161514] shadow-xs'
                  : 'text-[#66625b] hover:text-[#161514]'
              }`}
            >
              Search & SEO
            </button>
            <button
              onClick={() => setActiveTab('ads')}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all duration-200 ${
                activeTab === 'ads'
                  ? 'bg-white text-[#161514] shadow-xs'
                  : 'text-[#66625b] hover:text-[#161514]'
              }`}
            >
              Paid Ads
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all duration-200 ${
                activeTab === 'web'
                  ? 'bg-white text-[#161514] shadow-xs'
                  : 'text-[#66625b] hover:text-[#161514]'
              }`}
            >
              Web Platform
            </button>
          </div>
        </div>

        {/* =====================================================================
            TAB 1: SEO & SEARCH AUTHORITY
            ===================================================================== */}
        {activeTab === 'seo' && (
          <div className="p-6 sm:p-7 space-y-5 animate-in fade-in duration-250">
            {/* Visual Simulated SERP Preview */}
            <div className="rounded-2xl border border-[#e8e5de] bg-[#fbfaf8] p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3 text-xs text-[#78716c] pb-2.5 border-b border-[#ece8df]">
                <Search className="w-3.5 h-3.5 text-[#b45309]" />
                <span className="font-mono text-[11px]">google.com/search?q=top+commercial+plumbing</span>
              </div>

              {/* Simulated #1 Map Pack Placement */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#eaf4ec] text-[#1f7a37] font-bold text-[10px] font-mono uppercase">
                      #1 Organic Result
                    </span>
                    <span className="text-xs text-[#78716c] font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" /> 4.9 (184 reviews)
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#161514] tracking-tight">
                    Quollhill Commercial Plumbing & Gas
                  </h4>
                  <p className="text-xs text-[#5d5a55] leading-relaxed">
                    Same-day commercial repairs, gas compliance & preventative audits. 100% upfront quotes.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="px-3 py-1.5 rounded-full bg-[#161514] text-white text-[11px] font-bold inline-flex items-center gap-1">
                    Booked <Check className="w-3 h-3 text-[#f7ac4f]" />
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#161514] leading-none mb-1">
                  +342%
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  Organic Inquiries
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#1f7a37] leading-none mb-1">
                  #1 Rank
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  High-Intent Terms
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#b45309] leading-none mb-1">
                  88%
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  AI Answer Share
                </span>
              </div>
            </div>

            {/* Micro Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#5d5a55]">
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">Local Google Map Pack</span>
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">Technical Schema</span>
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">AEO & ChatGPT Ready</span>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: PERFORMANCE PAID ADS (PPC)
            ===================================================================== */}
        {activeTab === 'ads' && (
          <div className="p-6 sm:p-7 space-y-5 animate-in fade-in duration-250">
            {/* Visual Simulated Ad Creative Card */}
            <div className="rounded-2xl border border-[#e8e5de] bg-[#fbfaf8] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#ece8df]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#1877f2] flex items-center justify-center text-white text-[10px] font-bold">
                    f
                  </div>
                  <span className="text-xs font-bold text-[#161514]">Meta Ads Strategy · Live Placement</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#fef3c7] text-[#92400e] font-bold">
                  Sponsored
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-[#161514] tracking-tight">
                  High-intent ad creatives engineered to convert qualified prospects.
                </h4>
                <p className="text-xs text-[#5d5a55] leading-relaxed">
                  Targeted acquisition funnels that eliminate wasted clicks and deliver booked consultations at a predictable cost per acquisition.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#f7ac4f] text-[#161514] font-bold text-xs inline-flex items-center gap-1">
                    Book Initial Strategy <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs text-[#1f7a37] font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> 4.8x Target ROAS
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#161514] leading-none mb-1">
                  4.8x
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  Average ROAS
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#1f7a37] leading-none mb-1">
                  -41%
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  Lower Cost / Lead
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#b45309] leading-none mb-1">
                  $2.5M+
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  Profitable Spend
                </span>
              </div>
            </div>

            {/* Micro Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#5d5a55]">
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">Google Premier Partner</span>
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">Meta Verified Business</span>
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">Conversion API Setup</span>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: CONVERSION-ENGINEERED WEB PLATFORM
            ===================================================================== */}
        {activeTab === 'web' && (
          <div className="p-6 sm:p-7 space-y-5 animate-in fade-in duration-250">
            {/* Visual Simulated Browser Preview */}
            <div className="rounded-2xl border border-[#e8e5de] bg-[#fbfaf8] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#ece8df]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-xs font-mono text-[#78716c] pl-1">nextjs-platform.leadedge.agency</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf4ec] text-[#1f7a37]">
                  100% Lighthouse
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-[#161514] tracking-tight">
                  Web experiences engineered to turn first-time visitors into clients.
                </h4>
                <p className="text-xs text-[#5d5a55] leading-relaxed">
                  Sub-second loading speeds, friction-free mobile inquiry forms, and clean technical architecture that search engines and buyers love.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#161514]">
                  <Zap className="w-4 h-4 text-[#f59e0b]" /> 0.4s Fast Mobile Interaction
                </div>
              </div>
            </div>

            {/* 3 Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#161514] leading-none mb-1">
                  6.4%
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  Lead Conversion Rate
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#1f7a37] leading-none mb-1">
                  99/100
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  Core Web Vitals
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#faf9f6] border border-[#ece8df] text-center">
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#b45309] leading-none mb-1">
                  3.2x
                </span>
                <span className="text-[11px] font-sans text-[#78716c] font-medium leading-tight block">
                  Speed vs Competitors
                </span>
              </div>
            </div>

            {/* Micro Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#5d5a55]">
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">Next.js 15 App Router</span>
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">Mobile-First Conversion UX</span>
              <span className="px-2.5 py-1 rounded-full bg-[#edeae3] font-medium">Tailwind CSS Performance</span>
            </div>
          </div>
        )}

        {/* Card Footer Banner */}
        <div className="px-6 py-3.5 bg-[#f6f4ef] border-t border-[#ece8df] flex items-center justify-between text-xs">
          <span className="text-[#5d5a55] font-medium">
            Want to see what we can do for your business?
          </span>
          <Link
            href="/contact"
            className="font-bold text-[#161514] hover:text-[#b45309] transition-colors inline-flex items-center gap-1"
          >
            Get Custom Growth Plan <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
