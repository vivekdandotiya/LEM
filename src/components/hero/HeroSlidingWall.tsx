'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Wifi,
  Battery,
  Signal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Search,
  Star,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Play,
} from 'lucide-react';

export type MarketingCardType =
  | 'instagram-ad'
  | 'facebook-ad'
  | 'google-seo'
  | 'google-ads'
  | 'seo-analytics'
  | 'cinema-video'
  | 'conversion-web';

export interface PhoneScreenItem {
  id: string;
  type: MarketingCardType;
  title: string;
  handle?: string;
  query?: string;
  domain?: string;
  image: string;
  metric: string;
  likes?: string;
  caption?: string;
  ctaText?: string;
  rating?: string;
  sitelinks?: string[];
  subheadline?: string;
  href: string;
}

export const COLUMN_0: PhoneScreenItem[] = [
  {
    id: 'col0-1',
    type: 'instagram-ad',
    handle: 'stridefit.aus',
    title: 'StrideFit Activewear Meta Ad',
    image: '/images/hero/hero-04-stridefit-runner-4x5.webp',
    metric: '4.8x ROAS Target',
    likes: '2,840',
    caption: 'Engineered performance running gear. Zero drag, maximum endurance.',
    ctaText: 'Shop Now →',
    href: '/services/ppc',
  },
  {
    id: 'col0-2',
    type: 'instagram-ad',
    handle: 'dewskin.lab',
    title: 'Dew Skin DTC Paid Social',
    image: '/images/hero/hero-06-dew-skin-tube-4x5.webp',
    metric: '$38 CAC · 5.4x ROAS',
    likes: '1,920',
    caption: 'Ultra-pure bio-active barrier repair. Formulated in Melbourne.',
    ctaText: 'Claim Free Trial →',
    href: '/services/social-media',
  },
  {
    id: 'col0-3',
    type: 'facebook-ad',
    handle: 'Oak & Thread Apparel',
    title: 'Meta High-Converting Ad Creative',
    image: '/images/hero/hero-05-oak-thread-apparel-4x5.webp',
    metric: '+184% CVR Uplift',
    likes: '3,410',
    caption: 'Full-funnel Meta acquisition creative sequence scaling DTC orders.',
    ctaText: 'Shop Collection',
    href: '/services/ppc',
  },
  {
    id: 'col0-4',
    type: 'instagram-ad',
    handle: 'ember.roasters',
    title: 'Ember Roasters Social Ad',
    image: '/images/hero/hero-07-ember-roasters-coffee-4x5.webp',
    metric: '+312% Repeat Orders',
    likes: '1,480',
    caption: 'Ethically sourced micro-lot beans roasted fresh in Sydney.',
    ctaText: 'Subscribe & Save',
    href: '/services/social-media',
  },
  {
    id: 'col0-5',
    type: 'instagram-ad',
    handle: 'frostline.outerwear',
    title: 'Frostline Thermal Story Ad',
    image: '/images/hero/hero-24-frostline-red-puffer-4x5.webp',
    metric: '4.2x ROAS on Meta',
    likes: '4,120',
    caption: 'Engineered for sub-zero alpine exploration. Water-resistant ripstop.',
    ctaText: 'Explore Winter',
    href: '/services/ppc',
  },
  {
    id: 'col0-6',
    type: 'instagram-ad',
    handle: 'lumen.finejewelry',
    title: 'Lumen 18K Solid Gold Atelier',
    image: '/images/hero/hero-17-lumen-gold-ring-4x5.webp',
    metric: '3.9x ROAS Target',
    likes: '2,190',
    caption: 'Bespoke sculptural jewelry hand-crafted from recycled Australian gold.',
    ctaText: 'View Collection',
    href: '/services/video-photo',
  },
];

export const COLUMN_1: PhoneScreenItem[] = [
  {
    id: 'col1-1',
    type: 'google-seo',
    query: 'emergency plumber sydney 24/7',
    title: 'Quollhill Plumbing — 24/7 Emergency Repairs',
    domain: 'quollhillplumbing.com.au',
    rating: '4.9 ★★★★★ (184 reviews)',
    metric: '#1 Organic Rank on Google',
    sitelinks: ['Blocked Drains', 'Hot Water', 'Gas Fitting', 'Pricing'],
    image: '/images/screens/plumber/poster-480.webp',
    href: '/services/seo',
  },
  {
    id: 'col1-2',
    type: 'seo-analytics',
    title: 'Google Search Console Growth',
    metric: '+340%',
    subheadline: 'Organic Search Clicks Uplift',
    image: '/images/services/seo/seo-reporting.webp',
    href: '/services/seo',
  },
  {
    id: 'col1-3',
    type: 'google-seo',
    query: 'orthodontist specialist kellyville',
    title: 'Little Creek Orthodontics — Clear Aligners',
    domain: 'littlecreekortho.com.au',
    rating: '5.0 ★★★★★ (215 reviews)',
    metric: '#1 Google Maps 3-Pack Rank',
    sitelinks: ['Invisalign', 'Kids Braces', 'Virtual Consult', 'Reviews'],
    image: '/images/screens/orthodontist/poster-480.webp',
    href: '/services/seo',
  },
  {
    id: 'col1-4',
    type: 'google-seo',
    query: 'commercial fitout builders melbourne',
    title: 'Bearer & Joist Co — Commercial Fitouts',
    domain: 'bearerandjoist.com.au',
    rating: '4.9 ★★★★★ (92 reviews)',
    metric: '#1 High-Intent Search Result',
    sitelinks: ['Office Fitouts', 'Retail Builds', 'Tenders', 'Portfolio'],
    image: '/images/screens/builder/poster-480.webp',
    href: '/services/seo',
  },
  {
    id: 'col1-5',
    type: 'seo-analytics',
    title: 'Topical Authority Entity Graph',
    metric: '2,400+',
    subheadline: 'Page 1 Ranked Keywords',
    image: '/images/services/seo/seo-authority.webp',
    href: '/services/seo',
  },
  {
    id: 'col1-6',
    type: 'seo-analytics',
    title: 'Digital PR & Editorial Authority',
    metric: 'DA 78+',
    subheadline: 'Average Editorial Domain Authority',
    image: '/images/services/seo/seo-network.webp',
    href: '/services/seo',
  },
];

export const COLUMN_2: PhoneScreenItem[] = [
  {
    id: 'col2-1',
    type: 'google-ads',
    query: 'digital marketing agency australia',
    title: 'Lead Edge Marketers — 5.2x Verified ROAS',
    domain: 'leadedge.agency/growth',
    metric: 'Top Position · High-ROAS Search',
    sitelinks: ['Strategy Blueprint', 'Meta Ads Management', 'SEO Authority', 'Case Studies'],
    image: '/images/services/meta-ads/meta-hero.webp',
    href: '/services/ppc',
  },
  {
    id: 'col2-2',
    type: 'facebook-ad',
    handle: 'Lead Edge Growth Lab',
    title: 'Meta Ads Manager Mobile Analytics',
    image: '/images/services/meta-ads/meta-creative.webp',
    metric: '4.8x Verified ROAS Target',
    likes: '5,120',
    caption: 'First-party Conversions API (CAPI) + Creative diversity architecture.',
    ctaText: 'View Live Campaign',
    href: '/services/ppc',
  },
  {
    id: 'col2-3',
    type: 'cinema-video',
    title: '4K Cinema Commercial Production',
    image: '/images/services/video-photo/video-photo-hero.webp',
    metric: '3.6x Engagement Lift',
    subheadline: 'Broadcast Cinema Grade · DaVinci Resolve',
    href: '/services/video-photo',
  },
  {
    id: 'col2-4',
    type: 'conversion-web',
    title: 'High-Converting Web Architecture',
    image: '/images/screens/electrician/poster-480.webp',
    metric: '0.4s LCP · 100 Lighthouse',
    subheadline: '+42% Direct Form Conversion Rate',
    href: '/services/web-development',
  },
  {
    id: 'col2-5',
    type: 'cinema-video',
    title: 'On-Location Commercial Production',
    image: '/images/services/video-photo/video-photo-shoot.webp',
    metric: 'High-Retention Storytelling',
    subheadline: 'Studio Lighting & Softbox Camera Rig',
    href: '/services/video-photo',
  },
  {
    id: 'col2-6',
    type: 'instagram-ad',
    handle: 'petalpress.juice',
    title: 'Petal Press Cold-Pressed Cleanse',
    image: '/images/hero/hero-21-petal-press-green-juice-4x5.webp',
    metric: '4.6x ROAS on Paid Social',
    likes: '1,740',
    caption: 'Cold-pressed organic greens delivered fresh to your door in 24h.',
    ctaText: 'Order Cleanse →',
    href: '/services/social-media',
  },
];

function PhoneMockupCard({ item }: { item: PhoneScreenItem }) {
  return (
    <Link
      href={item.href}
      tabIndex={-1}
      aria-label={`${item.title} — Digital Marketing Campaign`}
      className="group relative block w-full transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1.5 focus:outline-none"
    >
      {/* Titanium Phone Chassis */}
      <div className="relative w-full rounded-[28px] sm:rounded-[34px] p-2 sm:p-2.5 bg-gradient-to-b from-[#3a3938] via-[#1a1918] to-[#252422] shadow-[0_10px_28px_rgba(0,0,0,0.18)] border border-[#4a4947]/50 select-none">
        
        {/* Inner Phone Screen Frame */}
        <div className="relative w-full aspect-[390/844] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#faf8f5] shadow-inner flex flex-col justify-between">
          
          {/* iOS Status Bar */}
          <div
            className="w-full h-6 sm:h-7 px-3.5 flex items-center justify-between text-[#161514] text-[9px] sm:text-[10px] font-sans font-bold shrink-0 z-20 pointer-events-none select-none bg-white/95 border-b border-black/5"
            aria-hidden="true"
          >
            <span className="font-semibold tracking-tight">9:41</span>
            
            {/* Dynamic Island / Camera Notch */}
            <div className="w-10 sm:w-12 h-2.5 sm:h-3 bg-[#0c0c0d] rounded-full mx-auto shadow-sm" />
            
            {/* Battery, Wifi & Signal */}
            <div className="flex items-center gap-1 opacity-80 scale-90">
              <Signal className="w-2.5 h-2.5" />
              <Wifi className="w-2.5 h-2.5" />
              <Battery className="w-3 h-3" />
            </div>
          </div>

          {/* =========================================================================
              SCREEN CONTENT BY DIGITAL MARKETING TYPE
              ========================================================================= */}
          <div className="relative w-full flex-1 overflow-hidden flex flex-col justify-between bg-white text-left">
            
            {/* 1. INSTAGRAM SPONSORED AD */}
            {item.type === 'instagram-ad' && (
              <div className="flex flex-col h-full justify-between">
                {/* IG Post Header */}
                <div className="px-3 py-1.5 flex items-center justify-between border-b border-black/5 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[9px] font-bold text-[#161514]">
                        {item.handle?.[0]?.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-sans font-extrabold text-[#161514] leading-none block">
                        {item.handle}
                      </span>
                      <span className="text-[9px] font-sans text-[#8f8a82] leading-tight block">
                        Sponsored · Instagram
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[#8f8a82]">•••</span>
                </div>

                {/* Creative Visual with Floating ROAS Badge */}
                <div className="relative flex-1 w-full overflow-hidden bg-[#161514]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="280px"
                    className="object-cover object-center"
                  />
                  {/* Floating Metric Pill */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#f7ac4f] border border-white/20 text-[10px] font-mono font-bold flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-2.5 h-2.5 text-[#f7ac4f]" />
                    <span>{item.metric}</span>
                  </div>
                </div>

                {/* IG Action Icons & CTA Bar */}
                <div className="p-2.5 bg-white border-t border-black/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5 text-[#161514]">
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      <MessageCircle className="w-4 h-4" />
                      <Send className="w-4 h-4" />
                    </div>
                    <Bookmark className="w-4 h-4 text-[#161514]" />
                  </div>
                  
                  {/* CTA Banner */}
                  <div className="w-full py-1.5 px-3 rounded-lg bg-[#f7ac4f] text-[#161514] font-sans font-bold text-[11px] flex items-center justify-between mb-1.5 shadow-sm">
                    <span>{item.ctaText || 'Learn More'}</span>
                    <span className="text-xs">→</span>
                  </div>

                  <p className="text-[10px] font-sans text-[#5d5a55] line-clamp-1 leading-snug">
                    <strong className="text-[#161514] font-bold mr-1">{item.handle}</strong>
                    {item.caption}
                  </p>
                </div>
              </div>
            )}

            {/* 2. FACEBOOK SPONSORED CAMPAIGN */}
            {item.type === 'facebook-ad' && (
              <div className="flex flex-col h-full justify-between bg-[#F0F2F5]">
                {/* FB Post Header */}
                <div className="p-2.5 bg-white border-b border-black/5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs">
                      f
                    </div>
                    <div>
                      <span className="text-[11px] font-sans font-extrabold text-[#161514] leading-tight block">
                        {item.handle}
                      </span>
                      <span className="text-[9px] font-sans text-[#5d5a55] leading-none block">
                        Sponsored · Paid Social
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] font-sans text-[#161514] line-clamp-1">
                    {item.caption}
                  </p>
                </div>

                {/* Image Frame with Badge */}
                <div className="relative flex-1 w-full overflow-hidden bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="280px"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#1877F2] text-white text-[10px] font-mono font-bold shadow-md">
                    {item.metric}
                  </div>
                </div>

                {/* FB Bottom Action Card */}
                <div className="p-2.5 bg-white border-t border-black/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-[#8f8a82] uppercase block">
                      leadedge.agency
                    </span>
                    <span className="text-[11px] font-sans font-bold text-[#161514] block truncate max-w-[150px]">
                      {item.title}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-[#1877F2] text-white font-sans font-bold text-[10px] shrink-0">
                    {item.ctaText || 'Learn More'}
                  </span>
                </div>
              </div>
            )}

            {/* 3. GOOGLE SEARCH #1 ORGANIC RANK (SEO) */}
            {item.type === 'google-seo' && (
              <div className="flex flex-col h-full justify-between bg-white p-3">
                <div>
                  {/* Google Search Bar */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/15 bg-[#f8f9fa] mb-3 shadow-inner">
                    <Search className="w-3.5 h-3.5 text-[#5d5a55]" />
                    <span className="text-[11px] font-sans text-[#161514] font-medium truncate">
                      {item.query}
                    </span>
                  </div>

                  {/* Organic Result Card #1 */}
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#e8e6e2] shadow-sm mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#1f7a37] text-white text-[9px] flex items-center justify-center font-bold">
                        ✓
                      </span>
                      <span className="text-[10px] font-mono text-[#5d5a55] truncate">
                        {item.domain}
                      </span>
                    </div>

                    <h4 className="text-xs font-sans font-bold text-[#1a0dab] leading-snug mb-1">
                      {item.title}
                    </h4>

                    {/* Star Rating & #1 Ranking Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-sans font-bold text-[#b45309]">
                        {item.rating}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#1f7a37]/10 text-[#1f7a37] text-[9px] font-mono font-bold">
                        #1 on Google
                      </span>
                    </div>

                    {/* Sitelinks Mini Grid */}
                    {item.sitelinks && (
                      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-black/10">
                        {item.sitelinks.map((link) => (
                          <div
                            key={link}
                            className="text-[10px] font-sans font-medium text-[#1a0dab] truncate hover:underline"
                          >
                            • {link}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Supporting Thumbnail */}
                <div className="relative h-20 w-full rounded-xl overflow-hidden border border-black/10 bg-black/5 mt-auto">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="260px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-2 text-[9px] font-mono font-bold text-white drop-shadow">
                    {item.metric}
                  </span>
                </div>
              </div>
            )}

            {/* 4. GOOGLE ADS SEARCH CONQUEST (PPC) */}
            {item.type === 'google-ads' && (
              <div className="flex flex-col h-full justify-between bg-white p-3">
                <div>
                  {/* Google Search Bar */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/15 bg-[#f8f9fa] mb-3 shadow-inner">
                    <Search className="w-3.5 h-3.5 text-[#5d5a55]" />
                    <span className="text-[11px] font-sans text-[#161514] font-medium truncate">
                      {item.query}
                    </span>
                  </div>

                  {/* Google Top Sponsored Ad */}
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 shadow-sm mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] font-mono font-black text-[#161514] uppercase bg-amber-200 px-1.5 py-0.5 rounded">
                        Sponsored
                      </span>
                      <span className="text-[10px] font-mono text-[#5d5a55] truncate">
                        {item.domain}
                      </span>
                    </div>

                    <h4 className="text-xs font-sans font-bold text-[#1a0dab] leading-snug mb-1">
                      {item.title}
                    </h4>

                    <span className="text-[10px] font-sans text-[#5d5a55] line-clamp-2 leading-relaxed mb-2">
                      Full-funnel digital marketing engineered for Australian enterprises. High-ROAS Google & Meta ads.
                    </span>

                    {/* Sitelinks Mini Grid */}
                    {item.sitelinks && (
                      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-amber-200/50">
                        {item.sitelinks.map((link) => (
                          <div
                            key={link}
                            className="text-[10px] font-sans font-medium text-[#1a0dab] truncate hover:underline"
                          >
                            • {link}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Metric Footer */}
                <div className="p-2.5 rounded-xl bg-[#161514] text-white flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#f7ac4f]" />
                    <span className="text-[10px] font-mono font-bold text-[#f7ac4f]">
                      {item.metric}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-white/70">Google Verified</span>
                </div>
              </div>
            )}

            {/* 5. SEO SEARCH CONSOLE ANALYTICS DASHBOARD */}
            {item.type === 'seo-analytics' && (
              <div className="flex flex-col h-full justify-between bg-[#161514] text-white p-3">
                {/* Console Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1f7a37] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-white tracking-wide">
                      SEARCH CONSOLE
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#f7ac4f]">● LIVE AUDIT</span>
                </div>

                {/* Big Stat Hero */}
                <div className="my-auto text-center py-2">
                  <span className="text-3xl font-display font-black text-[#f7ac4f] tracking-tight block">
                    {item.metric}
                  </span>
                  <span className="text-[11px] font-sans text-white/90 font-medium block">
                    {item.subheadline}
                  </span>

                  {/* Simulated Climbing Trendline SVG */}
                  <div className="w-full h-16 mt-3 px-2">
                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id={`grad-${item.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f7ac4f" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#f7ac4f" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,35 Q20,32 40,24 T70,12 T100,4 L100,40 L0,40 Z"
                        fill={`url(#grad-${item.id})`}
                      />
                      <path
                        d="M0,35 Q20,32 40,24 T70,12 T100,4"
                        fill="none"
                        stroke="#f7ac4f"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom Snapshot Card */}
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-sans font-bold text-white block truncate">
                      {item.title}
                    </span>
                    <span className="text-[9px] font-mono text-[#8f8a82] block">
                      100% Organic Demand
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 6. CINEMA COMMERCIAL VIDEO PRODUCTION */}
            {item.type === 'cinema-video' && (
              <div className="flex flex-col h-full justify-between bg-black text-white p-2.5">
                {/* Viewfinder Header */}
                <div className="flex items-center justify-between text-[9px] font-mono text-white/80 pb-1 border-b border-white/10">
                  <span className="text-rose-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    REC
                  </span>
                  <span>4K PRORES 4444</span>
                  <span className="text-[#f7ac4f]">24 FPS</span>
                </div>

                {/* Cinematic Center Frame with Play Button */}
                <div className="relative flex-1 w-full my-1.5 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="280px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  
                  {/* Play Button Icon */}
                  <div className="relative w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#f7ac4f] shadow-lg">
                    <Play className="w-4 h-4 fill-[#f7ac4f] ml-0.5" />
                  </div>

                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[9px] font-mono text-[#f7ac4f] font-bold">
                    {item.metric}
                  </span>
                </div>

                {/* Bottom Spec Details */}
                <div className="text-left pt-1">
                  <span className="text-[10px] font-sans font-bold text-white block truncate">
                    {item.title}
                  </span>
                  <span className="text-[9px] font-mono text-[#8f8a82] block truncate">
                    {item.subheadline}
                  </span>
                </div>
              </div>
            )}

            {/* 7. HIGH-CONVERTING WEB ARCHITECTURE */}
            {item.type === 'conversion-web' && (
              <div className="flex flex-col h-full justify-between bg-white p-3">
                <div className="flex items-center justify-between pb-2 border-b border-black/10">
                  <span className="text-[10px] font-mono font-bold text-[#1f7a37] uppercase">
                    NEXT.JS 15 EDGE ENGINE
                  </span>
                  <span className="text-[9px] font-mono text-[#5d5a55]">0.4s LCP</span>
                </div>

                <div className="relative flex-1 my-2 rounded-xl overflow-hidden bg-black/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="280px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-[10px] font-mono font-bold text-[#f7ac4f] block">
                      {item.metric}
                    </span>
                    <span className="text-[9px] font-sans font-medium text-white/90 block">
                      {item.subheadline}
                    </span>
                  </div>
                </div>

                <div className="w-full py-2 rounded-xl bg-[#161514] text-white text-center text-[10px] font-sans font-bold">
                  Conversion Engineered
                </div>
              </div>
            )}

          </div>

          {/* Glass Glare Overlay */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/15 z-10"
            aria-hidden="true"
          />

          {/* Hover Overlay: "Explore Strategy →" */}
          <div className="absolute inset-0 bg-[#161514]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-30">
            <span className="px-4 py-2 rounded-full bg-[#f7ac4f] text-[#161514] text-xs font-sans font-extrabold shadow-md tracking-tight">
              Explore strategy →
            </span>
          </div>

        </div>

      </div>
    </Link>
  );
}

export function HeroSlidingWall() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-[600px] sm:h-[680px] lg:h-[760px] overflow-hidden select-none sliding-wall-container"
    >
      <style>{`
        @keyframes hubSlideUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-50% - 0.75rem));
          }
        }
        @keyframes hubSlideDown {
          0% {
            transform: translateY(calc(-50% - 0.75rem));
          }
          100% {
            transform: translateY(0);
          }
        }
        .sliding-col-up {
          animation: hubSlideUp 34s linear infinite;
        }
        .sliding-col-down {
          animation: hubSlideDown 34s linear infinite;
        }
        .sliding-wall-container:hover .sliding-col-up,
        .sliding-wall-container:hover .sliding-col-down {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .sliding-col-up,
          .sliding-col-down {
            animation: none;
          }
        }
      `}</style>

      {/* Top and Bottom Fade Gradient Mask */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0) 12%, rgba(255,255,255,0) 88%, #ffffff 100%)',
        }}
      />

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full h-full">
        
        {/* =========================================================================
            COLUMN 0: Slides UP (Meta Ads, Instagram Reels, Facebook Campaigns)
            ========================================================================= */}
        <div className="relative overflow-hidden -mt-16">
          <div className="flex flex-col gap-4 sm:gap-5 sliding-col-up">
            {COLUMN_0.map((item) => (
              <PhoneMockupCard key={`col0-1-${item.id}`} item={item} />
            ))}
            {COLUMN_0.map((item) => (
              <PhoneMockupCard key={`col0-2-${item.id}`} item={item} />
            ))}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 1: Slides DOWN (Google Search #1, SEO Growth, Google Maps 3-Pack)
            ========================================================================= */}
        <div className="relative overflow-hidden -mt-36">
          <div className="flex flex-col gap-4 sm:gap-5 sliding-col-down">
            {COLUMN_1.map((item) => (
              <PhoneMockupCard key={`col1-1-${item.id}`} item={item} />
            ))}
            {COLUMN_1.map((item) => (
              <PhoneMockupCard key={`col1-2-${item.id}`} item={item} />
            ))}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2: Slides UP (Google Ads STAG, Cinema Video Production, Web Conversion)
            Visible on lg+ screens
            ========================================================================= */}
        <div className="hidden lg:block relative overflow-hidden -mt-10">
          <div className="flex flex-col gap-4 sm:gap-5 sliding-col-up">
            {COLUMN_2.map((item) => (
              <PhoneMockupCard key={`col2-1-${item.id}`} item={item} />
            ))}
            {COLUMN_2.map((item) => (
              <PhoneMockupCard key={`col2-2-${item.id}`} item={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
