'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Star, TrendingUp, CheckCircle, Video, MapPin } from 'lucide-react';

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
  visualType: 'growth' | 'social' | 'ecommerce' | 'ads' | 'video' | 'seo';
  image: string;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: 'digital-marketing',
    title: 'Data-Driven Digital Marketing',
    description: 'Shine Bright Online, Captivate Audiences, and Convert Clicks into Loyal Fans Fast.',
    href: '/contact',
    badge: 'FULL FUNNEL',
    visualType: 'growth',
    image: '/images/services/cylinder-strategy-session.webp',
  },
  {
    id: 'social-media',
    title: 'High-Impact Social Media Marketing',
    description: 'Turn Heads, Ignite Engagement, Build Buzz, and Make Your Brand Unforgettable.',
    href: '/services/social-media',
    badge: 'COMMUNITY',
    visualType: 'social',
    image: '/images/services/social-media/social-calendar.webp',
  },
  {
    id: 'web-development',
    title: 'Revenue-Converting Web Development',
    description: 'Turn Browsers into Buyers with Proven Strategies That Drive Sales and Growth.',
    href: '/services/web-development',
    badge: 'SUB-SECOND',
    visualType: 'ecommerce',
    image: '/images/pages/P08-services-web-devices-16x9.webp',
  },
  {
    id: 'ppc-advertising',
    title: 'Performance-Focused Paid Advertising',
    description: 'Targeted Facebook, Instagram & Google ads engineered to drive instant leads and max ROAS.',
    href: '/services/ppc',
    badge: 'SCALE',
    visualType: 'ads',
    image: '/images/services/meta-ads/meta-creative.webp',
  },
  {
    id: 'video-photo',
    title: 'Video Editing & Photo Creation',
    description: 'High-impact video and photography crafted to captivate audiences and elevate brand authority.',
    href: '/services/video-photo',
    badge: 'CINEMATIC',
    visualType: 'video',
    image: '/images/services/video-photo/video-photo-hero.webp',
  },
  {
    id: 'seo-search',
    title: 'Local SEO That Wins the Map Pack',
    description: 'Be the answer when buyers search. Dominate search rankings and capture high-intent organic traffic.',
    href: '/services/seo',
    badge: 'ORGANIC',
    visualType: 'seo',
    image: '/images/services/seo/seo-audit.webp',
  },
];

export function HomeServicesCards() {
  return (
    <section id="services-grid" className="py-24 sm:py-32 bg-[#F6F3EC] select-none border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-ink/10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B08D57]" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                02 / CORE DISCIPLINES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight leading-tight">
              Engineered to scale.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone max-w-sm leading-relaxed">
            Six high-performance disciplines engineered to dominate search rankings, scale paid media, and convert clicks into revenue.
          </p>
        </div>

        {/* 6-Card Editorial Grid Styled After Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((card) => (
            <div
              key={card.id}
              className="group relative rounded-[28px] sm:rounded-[32px] bg-[#121315] border border-white/[0.09] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.3)] hover:border-[#B08D57]/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all duration-300"
            >
              {/* Subtle Ambient Radial Highlight */}
              <div
                className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#B08D57]/[0.06] blur-3xl pointer-events-none group-hover:bg-[#B08D57]/[0.12] transition-colors duration-500"
                aria-hidden="true"
              />

              {/* Top Title */}
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-snug">
                  {card.title}
                </h3>
              </div>

              {/* Centered Visual Stage */}
              <div className="relative z-10 my-6 w-full h-[220px] sm:h-[235px] rounded-2xl bg-[#17191C] border border-white/[0.07] overflow-hidden flex items-center justify-center p-3 select-none group-hover:border-white/15 transition-all duration-300">
                {/* Visual Stage 1: Data-Driven Digital Marketing */}
                {card.visualType === 'growth' && (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-black/30" />
                    {/* Floating Metrics Chips */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#B08D57]/40 text-[#B08D57] text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                      <TrendingUp className="w-3.5 h-3.5 text-[#B08D57]" />
                      <span>+42% CVR</span>
                    </div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                      <span>4.8x ROAS Target</span>
                    </div>
                  </div>
                )}

                {/* Visual Stage 2: High-Impact Social Media Marketing */}
                {card.visualType === 'social' && (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1E2024] to-[#121315]">
                    {/* 3 Phone / Story Tiles */}
                    <div className="relative flex items-center justify-center gap-2 w-full h-full py-2">
                      <div className="relative w-24 h-36 rounded-xl overflow-hidden border border-white/15 shadow-md -rotate-6 scale-90 opacity-70">
                        <Image
                          src="/images/services/social-media/social-community.webp"
                          alt="Social Feed"
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-28 h-44 rounded-xl overflow-hidden border-2 border-[#B08D57]/60 shadow-xl z-10 group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={card.image}
                          alt="Social Creator"
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-2 inset-x-2 text-center text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-sm py-0.5 rounded">
                          @LEADEDGE
                        </span>
                      </div>
                      <div className="relative w-24 h-36 rounded-xl overflow-hidden border border-white/15 shadow-md rotate-6 scale-90 opacity-70">
                        <Image
                          src="/images/services/social-media/social-production.webp"
                          alt="Social Post"
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    {/* Floating Social Badges */}
                    <div className="absolute top-3 left-4 w-7 h-7 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584] flex items-center justify-center shadow-lg border border-white/20">
                      <span className="text-[11px] font-bold text-white">IG</span>
                    </div>
                    <div className="absolute bottom-3 right-4 w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center shadow-lg border border-white/20">
                      <span className="text-[11px] font-bold text-white">f</span>
                    </div>
                  </div>
                )}

                {/* Visual Stage 3: Revenue-Converting Web Development with Taped Corners */}
                {card.visualType === 'ecommerce' && (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1C1D21] to-[#141517] p-2">
                    {/* Taped Photo Card */}
                    <div className="relative w-[90%] h-[85%] rounded-lg overflow-hidden border border-white/20 shadow-2xl rotate-[-1.5deg] group-hover:rotate-0 transition-transform duration-500 bg-[#0F1011]">
                      {/* Top-Right Masking Tape */}
                      <div
                        className="absolute -top-1.5 -right-3 w-12 h-4 bg-[#F6F3EC]/90 shadow-sm rotate-12 z-20 pointer-events-none rounded-[1px]"
                        aria-hidden="true"
                      />
                      {/* Bottom-Left Masking Tape */}
                      <div
                        className="absolute -bottom-1.5 -left-3 w-12 h-4 bg-[#F6F3EC]/90 shadow-sm rotate-12 z-20 pointer-events-none rounded-[1px]"
                        aria-hidden="true"
                      />
                      <Image
                        src={card.image}
                        alt="E-commerce web architecture"
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90">
                        <span>NEXT.JS 15</span>
                        <span className="text-[#B08D57] font-semibold">100 LIGHTHOUSE</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Stage 4: Performance-Focused Paid Advertising */}
                {card.visualType === 'ads' && (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-black/40 to-black/30" />
                    {/* Stylized ADVERTISING Tag */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-black/75 border border-white/20 text-[10px] font-mono font-bold tracking-wider text-white uppercase">
                        SPONSORED CAMPAIGN
                      </span>
                      <span className="text-[11px] font-serif italic text-[#B08D57]">New Creative</span>
                    </div>
                    <div className="absolute bottom-3 inset-x-4 flex items-center justify-between">
                      <div className="text-white text-xs font-display font-bold">META & GOOGLE ADS</div>
                      <div className="px-2.5 py-0.5 rounded bg-[#B08D57]/90 text-black text-[10px] font-mono font-extrabold">
                        HIGH ROAS
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Stage 5: Video Editing & Photo Creation */}
                {card.visualType === 'video' && (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-black/40" />
                    {/* Recording indicator */}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 text-white text-[10px] font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span>REC</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 border border-white/15 text-[#B08D57] text-[10px] font-mono font-bold">
                      4K 60FPS
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90 text-xs font-sans">
                      <Video className="w-3.5 h-3.5 text-[#B08D57]" />
                      <span className="font-medium text-[11px]">Studio Production</span>
                    </div>
                  </div>
                )}

                {/* Visual Stage 6: Local SEO That Wins the Map Pack */}
                {card.visualType === 'seo' && (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-[#1A1C20] p-3">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-black/30 to-black/40" />
                    {/* Google Map Pack Mockup */}
                    <div className="relative z-10 w-full p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 shadow-xl">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
                          <span className="text-white text-xs font-display font-bold">Local 3-Pack</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#B08D57]/20 border border-[#B08D57]/50 text-[#B08D57] text-[10px] font-mono font-bold">
                          #1 RANKING
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="text-white/80 font-mono text-[10px] ml-1">4.9 (180+ Reviews)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Flex Row: Description on Left, "Get Started" Pill Button on Right */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed max-w-[62%] font-normal">
                  {card.description}
                </p>

                <Link
                  href={card.href}
                  className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#B08D57] hover:bg-[#C5A065] text-[#0F1011] text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 shrink-0"
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
