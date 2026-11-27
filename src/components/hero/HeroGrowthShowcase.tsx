'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  TrendingUp,
  Search,
  Zap,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface CaseStudy {
  id: string;
  category: string;
  tabLabel: string;
  client: string;
  metric: string;
  metricLabel: string;
  summary: string;
  image: string;
  tags: string[];
  href: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ads',
    tabLabel: 'Paid Ads',
    category: 'Meta & Google Performance',
    client: 'Roast & Co. Botanicals',
    metric: '4.8x ROAS',
    metricLabel: '+$1.4M Scaled Revenue',
    summary: 'Targeted acquisition funnels that cut customer acquisition costs by 41%.',
    image: '/images/home/showcase-08-roaster-coffee.webp',
    tags: ['Meta Ads', 'Google Shopping', 'Scale Funnels'],
    href: '/marketing',
  },
  {
    id: 'seo',
    tabLabel: 'Search & SEO',
    category: 'Technical & Local Search',
    client: 'Quollhill Commercial',
    metric: '+342%',
    metricLabel: 'Organic Inquiries',
    summary: 'Secured #1 Map Pack rankings and top organic positions across Sydney.',
    image: '/images/home/showcase-05-luxury-residence.webp',
    tags: ['#1 Google Rank', 'Local Map Pack', 'Schema AEO'],
    href: '/services/seo',
  },
  {
    id: 'web',
    tabLabel: 'Web Platform',
    category: 'Conversion Web Architecture',
    client: 'Veritas Architecture',
    metric: '6.4%',
    metricLabel: 'Lead Conversion Rate',
    summary: 'Next.js 15 platform with 99/100 Core Web Vitals and 0.4s instant load.',
    image: '/images/home/showcase-06-botanical-brand.webp',
    tags: ['Next.js 15', '0.4s Load Speed', 'Mobile UX'],
    href: '/services/web-development',
  },
];

export function HeroGrowthShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeCase = CASE_STUDIES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CASE_STUDIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-xl mx-auto lg:max-w-none select-none">
      {/* Outer Card with Soft Ambient Shadow & Glass Border */}
      <div className="relative rounded-[32px] bg-white border border-[#e8e4db] shadow-[0_24px_70px_-15px_rgba(22,21,20,0.14)] p-4 sm:p-5 overflow-hidden transition-all duration-300">
        
        {/* Top Interactive Tab Bar */}
        <div className="flex items-center justify-between gap-2 pb-4 mb-3 border-b border-[#f0eee9]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#78716c]">
              Proven Results
            </span>
          </div>

          {/* Tab Selector Pills */}
          <div className="flex items-center bg-[#f4f2ec] p-1 rounded-full gap-1">
            {CASE_STUDIES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all duration-200 ${
                  currentIndex === idx
                    ? 'bg-white text-[#161514] shadow-xs'
                    : 'text-[#78716c] hover:text-[#161514]'
                }`}
              >
                {item.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Case Preview Chassis */}
        <div className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full rounded-2xl overflow-hidden bg-[#161514] group">
          <Image
            src={activeCase.image}
            alt={activeCase.client}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 560px"
            priority
          />

          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

          {/* Floating Metric Badge (Top Right) */}
          <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
            <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex flex-col text-right">
              <span className="text-lg sm:text-2xl font-sans font-black text-[#161514] leading-none tracking-tight">
                {activeCase.metric}
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[#b45309] mt-0.5 leading-none">
                {activeCase.metricLabel}
              </span>
            </div>
          </div>

          {/* Category Pill (Top Left) */}
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[11px] font-sans font-semibold tracking-tight">
              {activeCase.category}
            </span>
          </div>

          {/* Bottom Card Content: Client Name, Summary & Tags */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 text-white">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-white mb-1">
                  {activeCase.client}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 line-clamp-1 max-w-sm mb-3">
                  {activeCase.summary}
                </p>

                {/* Tags Strip */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-[10px] font-medium text-white border border-white/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Case Link Button */}
              <Link
                href={activeCase.href}
                className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#161514] flex items-center justify-center hover:bg-[#f7ac4f] transition-all shadow-md group/btn"
                aria-label={`View case study for ${activeCase.client}`}
              >
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Micro Controls & Navigation Strip */}
        <div className="flex items-center justify-between pt-3.5 sm:pt-4 px-1 text-xs text-[#78716c]">
          <div className="flex items-center gap-1.5">
            {CASE_STUDIES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-[#b45309]' : 'w-2 bg-[#dcd7ce]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-7 h-7 rounded-full border border-[#e2ded6] bg-[#faf9f6] hover:bg-[#eae6de] text-[#161514] flex items-center justify-center transition-colors"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-7 h-7 rounded-full border border-[#e2ded6] bg-[#faf9f6] hover:bg-[#eae6de] text-[#161514] flex items-center justify-center transition-colors"
              aria-label="Next case study"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
