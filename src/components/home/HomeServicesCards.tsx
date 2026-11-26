'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Search,
  MapPin,
  Mail,
  ShoppingBag,
  MousePointer,
  DollarSign,
  Lightbulb,
} from 'lucide-react';

interface CardData {
  id: string;
  title: string;
  description: string;
  href: string;
  badgeText: string;
  renderVisual: () => React.ReactNode;
}

const CARDS: CardData[] = [
  // 1. Data-Driven Digital Marketing
  {
    id: 'digital-marketing',
    title: 'Data-Driven Digital Marketing',
    description: 'We get your business found online and turn clicks into paying customers.',
    href: '/services',
    badgeText: 'Get Started',
    renderVisual: () => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#111317] to-[#08090b]">
        {/* Subtle Watermark Typography */}
        <span className="absolute font-sans font-black text-4xl sm:text-5xl tracking-widest text-white/[0.04] uppercase select-none pointer-events-none">
          DIGITAL
        </span>

        {/* Center Glowing Orb */}
        <div className="absolute w-40 h-40 rounded-full bg-indigo-600/20 blur-2xl pointer-events-none" />

        {/* Stylized Modern Professional & Floating Elements */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-36 h-44 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900">
            <Image
              src="/images/about/team-1.webp"
              alt="Digital Marketing Strategist"
              fill
              className="object-cover"
              sizes="150px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* Floating 3D Badges */}
          <div className="absolute -top-2 -right-4 px-3 py-1.5 rounded-full bg-[#38bdf8] text-slate-950 font-bold text-[11px] shadow-lg flex items-center gap-1 animate-bounce duration-1000">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+340% Traffic</span>
          </div>

          <div className="absolute top-12 -left-4 p-2 rounded-xl bg-amber-400 text-slate-950 shadow-md">
            <Lightbulb className="w-4 h-4" />
          </div>

          <div className="absolute -bottom-2 -left-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-md">
            <MousePointer className="w-3 h-3 text-sky-400" />
            <span>High Intent</span>
          </div>
        </div>
      </div>
    ),
  },

  // 2. High-Impact Social Media Marketing
  {
    id: 'social-media',
    title: 'High-Impact Social Media Marketing',
    description: 'We post creative photos and videos that get attention and grow your brand.',
    href: '/services/social-media',
    badgeText: 'Get Started',
    renderVisual: () => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#141217] to-[#0a080c]">
        {/* 3 Layered Tilted Social Feed Cards */}
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Left Card */}
          <div className="absolute -left-1 w-24 h-36 rounded-xl overflow-hidden border border-pink-500/20 shadow-lg -rotate-12 bg-slate-900 opacity-90 transition-transform hover:scale-105">
            <Image
              src="/images/home/service-social.webp"
              alt="Social Story"
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>

          {/* Center Main Card */}
          <div className="relative z-10 w-28 h-44 rounded-2xl overflow-hidden border-2 border-pink-500/40 shadow-2xl bg-slate-900 transition-transform hover:scale-105">
            <Image
              src="/images/home/hero-1.webp"
              alt="Social Reel"
              fill
              className="object-cover"
              sizes="120px"
            />
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-[10px] text-white font-medium text-center">
              Reels & TikTok
            </div>
          </div>

          {/* Right Card */}
          <div className="absolute -right-1 w-24 h-36 rounded-xl overflow-hidden border border-purple-500/20 shadow-lg rotate-12 bg-slate-900 opacity-90 transition-transform hover:scale-105">
            <Image
              src="/images/home/hero-2.webp"
              alt="Social Feed"
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>

          {/* Floating 3D Social Brand Badges */}
          <div className="absolute top-2 left-3 p-2 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg animate-pulse">
            <Instagram className="w-4 h-4" />
          </div>

          <div className="absolute bottom-3 right-4 p-2 rounded-xl bg-blue-600 text-white shadow-lg">
            <Facebook className="w-4 h-4" />
          </div>

          <div className="absolute top-4 right-6 p-2 rounded-xl bg-red-600 text-white shadow-lg">
            <Youtube className="w-4 h-4" />
          </div>
        </div>
      </div>
    ),
  },

  // 3. Revenue-Converting E-Commerce Marketing
  {
    id: 'ecommerce',
    title: 'Revenue-Converting E-Commerce Marketing',
    description: 'We help online stores sell more products and get more repeat orders.',
    href: '/services/web-development',
    badgeText: 'Get Started',
    renderVisual: () => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#121415] to-[#090a0b]">
        {/* Masking Tape Polaroid Effect matching Reference Image */}
        <div className="relative p-3 pb-8 bg-white rounded-md shadow-2xl -rotate-2 max-w-[200px] border border-slate-200">
          {/* Top Left Yellow Masking Tape */}
          <div className="absolute -top-3 -left-3 w-10 h-5 bg-amber-200/90 rotate-[-25deg] shadow-xs border-t border-b border-amber-300/60" />
          {/* Bottom Right Masking Tape */}
          <div className="absolute -bottom-3 -right-3 w-10 h-5 bg-amber-200/90 rotate-[15deg] shadow-xs border-t border-b border-amber-300/60" />

          {/* Product Clothes Rack Photo */}
          <div className="relative w-40 h-32 rounded overflow-hidden bg-slate-100">
            <Image
              src="/images/home/showcase-07-apparel-editorial.webp"
              alt="E-Commerce Fashion Rack"
              fill
              className="object-cover"
              sizes="180px"
            />
          </div>
          <div className="mt-2 text-center">
            <span className="font-mono text-[10px] font-bold text-slate-800 tracking-wider">
              BOUTIQUE COLLECTION
            </span>
          </div>
        </div>

        {/* Floating Green Shopify Style Badge */}
        <div className="absolute bottom-3 left-4 px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[11px] shadow-lg flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>+4.8x Sales</span>
        </div>
      </div>
    ),
  },

  // 4. Performance-Focused Paid Advertising
  {
    id: 'paid-ads',
    title: 'Performance-Focused Paid Advertising',
    description: 'We run Google and Facebook ads that make you more money than they cost.',
    href: '/services/ppc',
    badgeText: 'Get Started',
    renderVisual: () => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#141517] to-[#0a0a0c]">
        {/* Editorial Fashion Ad Layout matching Reference Screenshot */}
        <div className="relative w-48 h-44 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 group-hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/service-meta.webp"
            alt="Editorial Ad Creative"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
            sizes="200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Bold Magazine Typography "New ADVERTISING" */}
          <div className="absolute top-3 left-3 text-left">
            <span className="font-serif italic text-sky-400 text-xs block">New</span>
            <span className="font-sans font-black text-white text-base tracking-tight leading-none uppercase">
              ADVERTISING
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-mono">
            <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">High ROAS</span>
            <span className="text-sky-300">Meta · Google</span>
          </div>
        </div>
      </div>
    ),
  },

  // 5. Automated Email Marketing That Converts
  {
    id: 'email-marketing',
    title: 'Automated Email Marketing That Converts',
    description: 'We send automated emails that turn one-time buyers into repeat customers.',
    href: '/services/web-development',
    badgeText: 'Get Started',
    renderVisual: () => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#141311] to-[#090807]">
        {/* Subtle Watermark */}
        <span className="absolute font-sans font-black text-4xl sm:text-5xl tracking-widest text-white/[0.04] uppercase select-none pointer-events-none">
          FLOWS
        </span>

        {/* Vintage Mail Delivery Composition */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Glowing Mail Envelope */}
          <div className="relative z-10 w-28 h-20 rounded-xl bg-amber-400 text-slate-950 p-3 shadow-2xl border border-amber-300 flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
            <Mail className="w-10 h-10 text-slate-950" />
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shadow-md">
              ✓
            </div>
          </div>

          {/* Dotted Dialogue Bubble */}
          <div className="mt-3 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>99.4% Inbox Delivery</span>
          </div>
        </div>
      </div>
    ),
  },

  // 6. Local SEO That Wins the Map Pack
  {
    id: 'local-seo',
    title: 'Local SEO That Wins the Map Pack',
    description: 'We put your business at the top of Google Maps so nearby customers call you.',
    href: '/services/seo/local-seo',
    badgeText: 'Get Started',
    renderVisual: () => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#111417] to-[#07090b]">
        {/* Isometric Phone / Google Maps Showcase */}
        <div className="relative w-48 h-44 rounded-xl border border-white/15 bg-slate-900/90 shadow-2xl p-3 flex flex-col justify-between">
          {/* Search Bar Bar */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/10 text-[11px] text-white">
            <Search className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-300 truncate">services near me</span>
          </div>

          {/* Google 3-Pack Result */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-rose-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">Your Business</span>
                <span className="text-[10px] text-amber-400">★★★★★ (180+ Reviews)</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              #1
            </span>
          </div>

          {/* Google Maps Bottom Indicator */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
            <span>Rank #1 Map Pack</span>
            <span className="text-sky-400 font-bold">100% Organic</span>
          </div>
        </div>
      </div>
    ),
  },
];

export function HomeServicesCards() {
  return (
    <section className="py-20 sm:py-28 bg-[#f8fafc] text-slate-900 select-none border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* =========================================================================
            Section Header: "Let's build something great" matching Reference Images
            ========================================================================= */}
        <div className="mb-14 sm:mb-16 text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0f172a] leading-[1.08]">
            Let&apos;s <span className="text-[#38bdf8]">build</span> something great
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 mt-3 max-w-2xl leading-relaxed">
            Every Lead Edge service is run by a specialist who knows the channel.
          </p>
        </div>

        {/* =========================================================================
            6 Dark Obsidian Cards Grid (Exact Uniform Size, Obsidian Black, Sky Blue CTA)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="group rounded-[28px] bg-[#0c0d0e] border border-white/10 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] h-[540px]"
            >
              {/* 1. Top Card Title: Big, Bold, White */}
              <div>
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight leading-snug">
                  {card.title}
                </h3>
              </div>

              {/* 2. Middle Visual Canvas: Authentic Work Artwork / Showcase */}
              <div className="relative w-full h-[260px] my-4">
                {card.renderVisual()}
              </div>

              {/* 3. Bottom Row: Plain English 2-Line Text (Left) + Sky Blue Button (Right) */}
              <div className="flex items-end justify-between gap-4 pt-2">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-[210px] sm:max-w-[230px]">
                  {card.description}
                </p>

                <Link
                  href={card.href}
                  className="shrink-0 px-5 sm:px-6 py-2.5 rounded-full bg-[#38bdf8] hover:bg-white text-slate-950 font-sans font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-sm active:scale-95"
                >
                  {card.badgeText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
