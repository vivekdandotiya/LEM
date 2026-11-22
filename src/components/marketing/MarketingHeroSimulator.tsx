'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Play,
  Heart,
  MessageCircle,
  Share2,
  PhoneCall,
  CheckCircle2,
  BarChart3,
  Flame,
  Globe,
  Sliders,
} from 'lucide-react';

export type SimulatorChannel = 'google-search' | 'instagram-reel' | 'maps-pack' | 'attribution-hud';

interface ChannelConfig {
  id: SimulatorChannel;
  number: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
}

const CHANNELS: ChannelConfig[] = [
  {
    id: 'google-search',
    number: 1,
    badge: 'High-Intent Search',
    title: 'Google Ads & STAG Intent',
    subtitle: 'The top of the page, from the moment campaigns go live',
    description:
      'We isolate high-intent buyer searches using Single-Theme Ad Groups with daily negative keyword scrubbing. Every dollar captures customers actively seeking your service.',
    metric: '5.2x Verified ROAS',
    metricLabel: 'Average client return on ad spend',
  },
  {
    id: 'instagram-reel',
    number: 2,
    badge: 'Paid Social Hook Machine',
    title: 'Meta & Instagram Paid Reels',
    subtitle: '10+ weekly vertical video hooks stopping the scroll',
    description:
      'Scale profitable customer acquisition through creative diversity. We script, edit, and test 10+ visual hooks and authentic UGC videos every single week to beat ad fatigue.',
    metric: '+184% CVR Uplift',
    metricLabel: 'Conversion rate vs static imagery',
  },
  {
    id: 'maps-pack',
    number: 3,
    badge: 'Proximity Conquest',
    title: 'Google Profile & Local 3-Pack',
    subtitle: 'The 70% of local phone calls originating on mobile maps',
    description:
      'Dominate the Google Map 3-pack across your entire service territory. We synchronize 50+ Australian citations, optimize GBP attributes, and accelerate review velocity.',
    metric: '#1 Map Ranking',
    metricLabel: 'Proximity rank across key suburbs',
  },
  {
    id: 'attribution-hud',
    number: 4,
    badge: 'First-Party Attribution',
    title: 'Server-Side CAPI & Live HUD',
    subtitle: 'Zero data loss from iOS 14+ tracking blocks',
    description:
      'Browser cookies drop up to 35% of conversions. We deploy cloud server-to-server Conversions API pipelines feeding Meta and Google pristine purchase telemetry.',
    metric: '9.8 / 10 Match Quality',
    metricLabel: 'First-party event telemetry score',
  },
];

export function MarketingHeroSimulator() {
  const [activeChannel, setActiveChannel] = useState<SimulatorChannel>('google-search');

  const currentConfig = CHANNELS.find((c) => c.id === activeChannel) || CHANNELS[0];

  return (
    <section className="pt-24 sm:pt-36 pb-20 sm:pb-32 bg-[#FAF8F5] text-[#161514] select-none border-b border-[#e8e6e2] relative overflow-hidden">
      {/* Background Subtle Tech Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#161514 1px, transparent 1px), radial-gradient(#161514 1px, #FAF8F5 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            1. TOP EYEBROW BADGE & HEADLINE ROW
            ========================================================================= */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              Full-Funnel Acquisition Engine
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.04] mb-6">
            More of the right customers finding you.
          </h1>

          <p className="font-sans text-base sm:text-xl text-[#5d5a55] leading-relaxed max-w-2xl">
            Lead Edge looks at where you show up now, who’s ahead of you and why, before a 15-minute call. Then we show you the exact multi-channel strategy to capture them.
          </p>
        </div>

        {/* =========================================================================
            2. SIMULATOR WORKSPACE: SPLIT GRID
               Left: Active Channel Context & CTA
               Center: Realistic Phone Simulator
               Right: 4 Numbered Channel Selector Cards
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* =========================================================================
              LEFT 4 COLS: Active Channel Value Proof & Walkthrough CTA
              ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between order-2 lg:order-1">
            <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#e8e6e2] shadow-sm mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#b45309] bg-[#f7ac4f]/20 px-2.5 py-1 rounded-full uppercase">
                  {currentConfig.badge}
                </span>
                <span className="text-xs font-mono text-[#787570] font-bold">
                  Channel 0{currentConfig.number} of 04
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#161514] mb-2 leading-snug">
                {currentConfig.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#b45309] font-semibold mb-3">
                {currentConfig.subtitle}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#5d5a55] leading-relaxed mb-6">
                {currentConfig.description}
              </p>

              {/* Metric Box */}
              <div className="p-4 rounded-2xl bg-[#161514] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#f7ac4f] uppercase block">
                    Verified Benchmark
                  </span>
                  <span className="text-lg sm:text-xl font-display font-black text-white">
                    {currentConfig.metric}
                  </span>
                </div>
                <span className="text-[11px] font-sans text-white/70 max-w-[130px] text-right">
                  {currentConfig.metricLabel}
                </span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-sm sm:text-base tracking-tight transition-all duration-150 shadow-md active:scale-95"
              >
                <span>Book a 15-Minute Strategy Call</span>
                <ArrowRight className="w-4 h-4 text-[#161514]" />
              </Link>
              <p className="text-center text-xs font-sans text-[#787570] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1f7a37]" />
                <span>The call is free. If marketing isn’t viable yet, we tell you openly.</span>
              </p>
            </div>
          </div>

          {/* =========================================================================
              CENTER 4 COLS: Realistic Interactive Phone Screen Simulator
              ========================================================================= */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
            <div className="relative w-[300px] sm:w-[325px] h-[590px] rounded-[48px] p-3.5 border-[4px] border-[#161514] bg-[#0c0d0e] shadow-[0_24px_60px_rgba(22,21,20,0.2)] shrink-0 transition-transform duration-300">
              
              {/* Phone Dynamic Island / Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0c0d0e] rounded-full z-30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black/60 border border-white/10" />
              </div>

              {/* Phone Inner Display Screen */}
              <div className="w-full h-full rounded-[38px] bg-white overflow-hidden text-[#161514] flex flex-col justify-between text-left relative">
                
                {/* Status Bar */}
                <div className="pt-3 px-6 flex items-center justify-between text-[11px] font-mono text-[#161514] z-20">
                  <span className="font-bold">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1f7a37]" />
                    <span className="text-[10px] font-bold">5G</span>
                  </div>
                </div>

                {/* ===================================================================
                    SCREEN 1: GOOGLE SEARCH SIMULATOR
                    =================================================================== */}
                {activeChannel === 'google-search' && (
                  <div className="p-4 flex-1 overflow-y-auto scrollbar-none animate-fadeIn">
                    {/* Google Search Bar */}
                    <div className="flex items-center gap-2 p-2.5 rounded-full border border-black/10 bg-[#f4f3f1] mb-2.5 mt-1 shadow-xs">
                      <Search className="w-3.5 h-3.5 text-[#5d5a55]" />
                      <span className="text-xs font-sans font-medium text-[#161514]">
                        sports physio near me
                      </span>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-3 text-[10px] font-sans pb-2 border-b border-black/5 text-[#5d5a55] mb-2.5">
                      <span className="font-bold text-[#161514] border-b-2 border-[#161514] pb-0.5">All</span>
                      <span>Maps</span>
                      <span>Images</span>
                      <span>News</span>
                    </div>

                    {/* Google STAG Sponsored Ad */}
                    <div className="p-3 rounded-2xl border border-[#f7ac4f] bg-[#f7ac4f]/10 shadow-sm mb-2.5">
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold mb-1">
                        <div className="flex items-center gap-1">
                          <span className="bg-[#161514] text-white px-1.5 py-0.5 rounded font-black">Ad</span>
                          <span className="text-[#5d5a55]">ridgelinesports.com.au</span>
                        </div>
                        <span className="text-[#b45309] font-bold">#1 Top Placement</span>
                      </div>
                      <h4 className="font-display font-extrabold text-xs text-[#1a0dab] leading-tight mb-1">
                        Sports Physio Marrickville | Book Online Today
                      </h4>
                      <p className="text-[10px] text-[#5d5a55] leading-snug mb-2">
                        Same-week appointments. Health fund rebates on the spot. Trusted by 1,200+ Sydney athletes.
                      </p>
                      <div className="flex items-center gap-2 pt-1 border-t border-[#f7ac4f]/20 text-[9px] font-bold text-[#1a0dab]">
                        <span className="bg-white px-2 py-0.5 rounded border border-[#f7ac4f]/30">Book Initial Consult</span>
                        <span className="bg-white px-2 py-0.5 rounded border border-[#f7ac4f]/30">Meet Our Team</span>
                      </div>
                    </div>

                    {/* Map Pack Snippet */}
                    <div className="p-2.5 rounded-xl border border-black/5 bg-[#fbfbfa] mb-2.5">
                      <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                        <span className="flex items-center gap-1 text-red-600">
                          <MapPin className="w-3 h-3" />
                          <span>Marrickville Physio</span>
                        </span>
                        <span className="text-[#b45309] font-mono">4.9 ★ (184)</span>
                      </div>
                      <p className="text-[9px] text-[#787570]">Open until 7:00 PM · Confirmed Active</p>
                    </div>

                    {/* Organic SEO & AI Overview */}
                    <div className="p-2.5 rounded-xl border border-black/5 bg-[#fbfbfa]">
                      <span className="text-[8px] font-mono text-[#787570] uppercase block mb-0.5">
                        Organic Search & AI Overview
                      </span>
                      <h5 className="font-display font-bold text-[11px] text-[#1a0dab] leading-tight">
                        What to expect at your first sports injury consultation
                      </h5>
                    </div>
                  </div>
                )}

                {/* ===================================================================
                    SCREEN 2: INSTAGRAM PAID REEL SIMULATOR
                    =================================================================== */}
                {activeChannel === 'instagram-reel' && (
                  <div className="flex-1 relative overflow-hidden bg-[#161514] text-white flex flex-col justify-between p-4 animate-fadeIn">
                    {/* Background Video Frame Mockup */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src="/images/services/meta-ads/meta-hero.webp"
                        alt="Instagram Paid Reel Video Ad"
                        fill
                        className="object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
                    </div>

                    {/* Top Header */}
                    <div className="relative z-10 flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#f7ac4f] text-[#161514] font-black text-xs flex items-center justify-center">
                          LE
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">@ridgelinesports</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          </div>
                          <span className="text-[9px] font-mono text-[#f7ac4f] block">
                            Sponsored · Instagram Reels
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-white/20 px-2 py-0.5 rounded-full text-white/90">
                        Follow
                      </span>
                    </div>

                    {/* Center Animated Hook Callout */}
                    <div className="relative z-10 text-center my-auto px-2">
                      <div className="inline-block p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-[#f7ac4f]/40 shadow-xl">
                        <span className="text-[10px] font-mono font-bold text-[#f7ac4f] uppercase block mb-1">
                          ⚡ 3-SECOND RETENTION HOOK
                        </span>
                        <p className="text-xs font-display font-extrabold text-white leading-tight">
                          “How this Sydney clinic added 42 new patients in 30 days without price discounting”
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-xs">
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                            <span>1.8k</span>
                          </span>
                          <span className="flex items-center gap-1 text-xs">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>142</span>
                          </span>
                          <span className="flex items-center gap-1 text-xs">
                            <Share2 className="w-3.5 h-3.5" />
                            <span>380</span>
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-white/70">
                          Hook Variant 07
                        </span>
                      </div>

                      {/* Instagram Pill CTA */}
                      <div className="p-2.5 rounded-xl bg-[#f7ac4f] text-[#161514] font-sans font-bold text-xs text-center flex items-center justify-between shadow-lg">
                        <span>Book Online Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ===================================================================
                    SCREEN 3: GOOGLE LOCAL 3-PACK PROXIMITY MAP
                    =================================================================== */}
                {activeChannel === 'maps-pack' && (
                  <div className="p-4 flex-1 overflow-y-auto scrollbar-none animate-fadeIn flex flex-col justify-between">
                    <div>
                      {/* Map Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-black/5 mb-3">
                        <div className="flex items-center gap-1 text-xs font-bold text-[#161514]">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span>Google Local 3-Pack</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#1f7a37] bg-[#1f7a37]/10 px-2 py-0.5 rounded-full">
                          #1 Proximity Rank
                        </span>
                      </div>

                      {/* Simulated Map View */}
                      <div className="w-full h-32 rounded-2xl bg-[#e5e3df] relative overflow-hidden mb-3 border border-black/10 flex items-center justify-center">
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#161514_1px,transparent_1px)] [background-size:12px_12px]" />
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg animate-bounce">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold bg-[#161514] text-white px-2 py-0.5 rounded-full shadow-md mt-1">
                            Your Clinic (Rank 1)
                          </span>
                        </div>
                      </div>

                      {/* Profile Card */}
                      <div className="p-3.5 rounded-2xl border border-[#f7ac4f] bg-[#f7ac4f]/10 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-display font-extrabold text-xs text-[#161514]">
                            Ridgeline Sports Physiotherapy
                          </h4>
                          <span className="text-[9px] font-mono font-bold text-[#b45309]">
                            4.9 ★ (184)
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5d5a55] mb-2">
                          Physiotherapist in Marrickville, NSW · Open Closes 7pm
                        </p>
                        <div className="flex items-center gap-2">
                          <button className="flex-1 py-1.5 rounded-lg bg-[#161514] text-white text-[10px] font-bold flex items-center justify-center gap-1">
                            <PhoneCall className="w-3 h-3 text-[#f7ac4f]" />
                            <span>Call (02) 9550 0192</span>
                          </button>
                          <button className="flex-1 py-1.5 rounded-lg bg-white border border-[#161514]/20 text-[#161514] text-[10px] font-bold">
                            Directions
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 text-center text-[9px] font-mono text-[#787570] bg-[#FAF8F5] rounded-xl border border-[#e8e6e2]">
                      50+ Australian Citations Synchronized
                    </div>
                  </div>
                )}

                {/* ===================================================================
                    SCREEN 4: ATTRIBUTION & ROAS LIVE HUD
                    =================================================================== */}
                {activeChannel === 'attribution-hud' && (
                  <div className="p-4 flex-1 bg-[#161514] text-white flex flex-col justify-between animate-fadeIn">
                    <div>
                      {/* Telemetry Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#1f7a37] animate-pulse" />
                          <span className="text-[11px] font-mono font-bold text-[#f7ac4f]">
                            CAPI TELEMETRY LIVE
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-white/60">
                          Looker Studio Sync
                        </span>
                      </div>

                      {/* Big ROAS Metric Display */}
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-3">
                        <span className="text-[9px] font-mono text-[#f7ac4f] uppercase block mb-0.5">
                          Blended Return on Ad Spend
                        </span>
                        <div className="text-3xl font-display font-black text-white">
                          5.42x <span className="text-xs font-mono text-[#1f7a37]">+34% vs Q3</span>
                        </div>
                        <p className="text-[9px] text-[#d9d6d1] mt-1">
                          $14,240 spend → $77,180 verified patient bookings
                        </p>
                      </div>

                      {/* Event Match Score */}
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-3 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white/70">Meta CAPI Match Quality:</span>
                          <span className="text-[#1f7a37] font-bold">9.8 / 10</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-[#1f7a37] rounded-full w-[98%]" />
                        </div>
                      </div>

                      {/* Real-time Stream */}
                      <div className="space-y-1.5 text-[9px] font-mono">
                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                          <span className="text-white/80">Consult Booking ($180)</span>
                          <span className="text-[#f7ac4f]">32s ago · Google Ad</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                          <span className="text-white/80">Phone Call (12 mins)</span>
                          <span className="text-[#f7ac4f]">4m ago · Map 3-Pack</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 text-center text-[9px] font-mono text-white/60 bg-white/5 rounded-xl border border-white/10">
                      First-Party Cloud Pipeline Active
                    </div>
                  </div>
                )}

                {/* Phone Bottom Home Bar */}
                <div className="pb-2 pt-1 flex justify-center">
                  <div className="w-28 h-1 bg-[#161514]/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT 4 COLS: 4 Interactive Channel Selector Cards (User Screenshot Match)
              ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 order-3">
            {CHANNELS.map((channel) => {
              const isActive = activeChannel === channel.id;

              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full p-4 sm:p-5 rounded-[24px] text-left border transition-all duration-200 flex items-start gap-4 ${
                    isActive
                      ? 'bg-white border-[#f7ac4f] ring-2 ring-[#f7ac4f]/30 shadow-lg -translate-x-1'
                      : 'bg-white/70 border-[#e8e6e2] hover:bg-white hover:border-[#161514]/30 shadow-xs'
                  }`}
                >
                  {/* Number Badge */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-extrabold text-xs shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#f7ac4f] text-[#161514]'
                        : 'bg-[#FAF8F5] text-[#5d5a55] border border-[#e8e6e2]'
                    }`}
                  >
                    {channel.number}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display font-extrabold text-sm sm:text-base text-[#161514] leading-snug">
                        {channel.title}
                      </h3>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-[#f7ac4f] translate-x-1' : 'text-[#787570]'
                        }`}
                      />
                    </div>
                    <p className="text-xs font-sans text-[#5d5a55] leading-snug">
                      {channel.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
