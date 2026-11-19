'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle, ShieldCheck } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  country: 'UK' | 'Nigeria' | 'India';
  flag: string;
  metric: string;
  image: string;
}

export const CLIENT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-uk-1',
    quote:
      'Lead Edge restructured our entire search taxonomy and unified our paid media channels. The reporting is candid, transparent, and focused purely on revenue contribution.',
    author: 'Alistair Vance',
    role: 'Director of Growth',
    company: 'TrailNest Cabins',
    location: 'Edinburgh, UK',
    country: 'UK',
    flag: '🇬🇧',
    metric: '+64% Organic Revenue',
    image: '/images/testimonials/client-uk-1.webp',
  },
  {
    id: 't-uk-2',
    quote:
      'Having creative production and media buying executed under one team ended the bottleneck between design and distribution. Every single asset is built for conversion.',
    author: 'Gemma Harrington',
    role: 'Head of Digital & DTC',
    company: 'Harrington Living',
    location: 'London, UK',
    country: 'UK',
    flag: '🇬🇧',
    metric: '4.6x Peak ROAS',
    image: '/images/testimonials/client-uk-2.webp',
  },
  {
    id: 't-uk-3',
    quote:
      'Their engineering approach replaced our bloated template store with a sub-second custom web architecture. Our checkout velocity and mobile organic visibility improved immediately.',
    author: 'Marcus Sterling',
    role: 'Managing Director',
    company: 'Oak & Thread Co.',
    location: 'Manchester, UK',
    country: 'UK',
    flag: '🇬🇧',
    metric: 'Sub-Second Load Speed',
    image: '/images/testimonials/client-uk-3.webp',
  },
  {
    id: 't-ng-1',
    quote:
      'Lead Edge scaled our customer acquisition across high-intent channels without burning budget on vanity clicks. Their strategic clarity and weekly accountability are exceptional.',
    author: 'Babajide Adeleke',
    role: 'Co-Founder & COO',
    company: 'PayWave Africa',
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    flag: '🇳🇬',
    metric: '3.8x Acquisition Velocity',
    image: '/images/testimonials/client-ng-1.webp',
  },
  {
    id: 't-ng-2',
    quote:
      'From vertical video storytelling to high-converting social campaigns, Lead Edge delivered measurable authority and real customer demand. They understand performance marketing at the highest standard.',
    author: 'Ngozi Okonkwo',
    role: 'Head of Brand Marketing',
    company: 'Kora Logistics & Retail',
    location: 'Abuja, Nigeria',
    country: 'Nigeria',
    flag: '🇳🇬',
    metric: '120k+ Community Reach',
    image: '/images/testimonials/client-ng-2.webp',
  },
  {
    id: 't-in-1',
    quote:
      'Their technical SEO and digital architecture are peerless. They rebuilt our domain authority from the ground up, capturing tier-1 commercial search intent that doubled our enterprise pipeline.',
    author: 'Utkarsh Sharma',
    role: 'Founder & CEO',
    company: 'Zenith Cloud Systems',
    location: 'Bengaluru, India',
    country: 'India',
    flag: '🇮🇳',
    metric: '+140% Qualified Inbound',
    image: '/images/testimonials/client-in-1.webp',
  },
  {
    id: 't-in-2',
    quote:
      'No fluff, no vanity follower chasing. Just clear strategic positioning, continuous creative testing, and predictable acquisition funnels that scaled our revenue while lowering cost-per-lead.',
    author: 'Priya Sundaram',
    role: 'VP of Marketing & DTC',
    company: 'AyurVeda Botanicals',
    location: 'Mumbai, India',
    country: 'India',
    flag: '🇮🇳',
    metric: '3.2x Monthly Revenue',
    image: '/images/testimonials/client-in-2.webp',
  },
];

export interface TestimonialsProps {
  items?: TestimonialItem[];
  theme?: 'light' | 'dark';
  className?: string;
}

export function Testimonials({
  items = CLIENT_TESTIMONIALS,
  theme = 'light',
  className = '',
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const isDark = theme === 'dark';
  const active = items[currentIndex];

  return (
    <section
      id="testimonials-section"
      data-surface={isDark ? 'dark' : 'light'}
      className={`py-24 sm:py-32 select-none transition-colors ${
        isDark ? 'bg-charcoal text-ivory' : 'bg-[#F6F3EC] text-ink'
      } ${className}`}
      data-theme={isDark ? 'dark' : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b mb-12 ${
          isDark ? 'border-white/10' : 'border-ink/10'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B08D57]" aria-hidden="true" />
              <span className={`text-xs font-mono tracking-widest uppercase font-semibold ${
                isDark ? 'text-[#D9C29A]' : 'text-[#57534E]'
              }`}>
                03 / CLIENT PERSPECTIVE
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-[#F6F3EC]' : 'text-[#0F1011]'
            }`}>
              Honest partnership <span className={`font-serif italic ${isDark ? 'text-[#D9C29A]' : 'text-[#5C4018]'}`}>reviews.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Verified Rating Pill */}
            <div className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow-soft-sm text-xs font-mono border ${
              isDark ? 'bg-[#141518] border-white/15 text-[#F6F3EC]' : 'bg-white border-ink/10 text-ink'
            }`}>
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500" />
              </div>
              <span className="font-bold">5.0</span>
              <span className={isDark ? 'text-stone-300' : 'text-stone'}>Verified Clients</span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prev}
                className={`p-3 rounded-full transition-all shadow-soft-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold border ${
                  isDark
                    ? 'bg-[#141518] border-white/15 text-white hover:border-[#B08D57] hover:text-[#B08D57]'
                    : 'bg-white border-ink/10 text-ink hover:border-[#B08D57] hover:text-[#B08D57]'
                }`}
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className={`p-3 rounded-full transition-all shadow-soft-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold border ${
                  isDark
                    ? 'bg-[#141518] border-white/15 text-white hover:border-[#B08D57] hover:text-[#B08D57]'
                    : 'bg-white border-ink/10 text-ink hover:border-[#B08D57] hover:text-[#B08D57]'
                }`}
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Card with Real Client Photo */}
        <div className={`relative rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-soft-md overflow-hidden border ${
          isDark
            ? 'bg-[#141518] border-white/15 text-[#F6F3EC]'
            : 'bg-white border-ink/10 text-ink'
        }`}>
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 lg:gap-12">
            {/* Left: Client Portrait Photo */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#B08D57]/30 shadow-xl shrink-0 group">
              <Image
                src={active.image}
                alt={`${active.author} — ${active.company}`}
                fill
                sizes="(max-width: 768px) 240px, 320px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Location Badge with Flag */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-md">
                <span className="text-sm">{active.flag}</span>
                <span>{active.location}</span>
              </div>

              {/* Verified Badge */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-mono">
                <div className="flex items-center gap-1 text-[#B08D57] font-semibold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Verified Client</span>
                </div>
              </div>
            </div>

            {/* Right: Quote & Author Metadata */}
            <div className="flex-1 flex flex-col justify-between text-left">
              <div>
                {/* Metric Chip & Rating Stars */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold ${
                    isDark
                      ? 'bg-[#B08D57]/20 border-[#B08D57]/40 text-[#D9C29A]'
                      : 'bg-[#B08D57]/15 border-[#B08D57]/30 text-[#5C4018]'
                  }`}>
                    <CheckCircle className={`w-3.5 h-3.5 ${isDark ? 'text-[#D9C29A]' : 'text-[#7A5C2E]'}`} />
                    <span>{active.metric}</span>
                  </div>

                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative mb-6">
                  <Quote className="w-10 h-10 text-[#B08D57]/20 absolute -top-4 -left-4 -z-10 pointer-events-none" />
                  <p className={`text-lg sm:text-xl lg:text-2xl font-serif font-medium leading-relaxed ${
                    isDark ? 'text-[#F6F3EC]' : 'text-[#0F1011]'
                  }`}>
                    &ldquo;{active.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark ? 'border-white/10' : 'border-ink/10'
              }`}>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-display font-extrabold ${
                    isDark ? 'text-white' : 'text-[#0F1011]'
                  }`}>
                    {active.author}
                  </h3>
                  <p className={`text-xs sm:text-sm font-sans mt-0.5 ${
                    isDark ? 'text-stone-300' : 'text-stone'
                  }`}>
                    {active.role} · <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0F1011]'}`}>{active.company}</span>
                  </p>
                </div>

                <div className={`text-xs font-mono tracking-widest uppercase ${
                  isDark ? 'text-stone-300' : 'text-stone'
                }`}>
                  CLIENT {currentIndex + 1} OF {items.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Thumbnail Selector Strip (Click to switch client) */}
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/10' : 'border-ink/10'}`}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {items.map((client, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all duration-200 text-left ${
                    isActive
                      ? isDark
                        ? 'bg-[#B08D57] text-[#0F1011] shadow-md scale-105 border border-[#B08D57] font-bold'
                        : 'bg-ink text-white shadow-md scale-105 border border-ink ring-2 ring-[#B08D57]'
                      : isDark
                      ? 'bg-[#141518] text-[#E7E5E4] border border-white/15 hover:border-[#B08D57]'
                      : 'bg-white hover:bg-black/5 text-ink border border-ink/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <Image
                      src={client.image}
                      alt={client.author}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden sm:block text-xs leading-none">
                    <span className="block font-bold">{client.author.split(' ')[0]}</span>
                    <span className="text-xs opacity-80">{client.country}</span>
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
