'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Sparkles, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { SERVICE_PACKAGES_DATA } from '@/data/servicePackages';

interface ServicePackagesSectionProps {
  serviceSlug: string;
  serviceTitle: string;
}

export function ServicePackagesSection({
  serviceSlug,
  serviceTitle,
}: ServicePackagesSectionProps) {
  // Normalize slug (e.g. meta-ads maps to ppc)
  const normalizedSlug = serviceSlug === 'meta-ads' ? 'ppc' : serviceSlug;
  const packageData = SERVICE_PACKAGES_DATA[normalizedSlug] || SERVICE_PACKAGES_DATA['seo'];

  const { tier1, tier2, sectionSubtitle } = packageData;

  return (
    <section id="service-packages" className="py-24 sm:py-32 bg-[#F6F3EC] select-none border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-ink/10 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#B08D57]" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                04 / PACKAGES &amp; DELIVERABLES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight leading-tight">
              What we do differently for{' '}
              <span className="font-serif italic font-normal text-gold-deep block sm:inline">
                {serviceTitle}.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone max-w-md leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* 2-Tier Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Card 1: Growth Foundation (Tier 1) */}
          <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-ink/10 p-6 sm:p-10 shadow-soft-sm flex flex-col justify-between hover:border-ink/20 transition-all duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-black/5 text-[10px] font-mono font-bold uppercase tracking-wider text-stone">
                  FOUNDATION SCOPE
                </span>
                <span className="text-xs font-mono font-semibold text-stone">
                  TIER 01
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-ink tracking-tight mb-2">
                {tier1.name}
              </h3>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F3EC] border border-ink/5 text-xs font-mono font-semibold text-stone mb-4">
                <Layers className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>{tier1.scopeTag}</span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-stone leading-relaxed pb-6 border-b border-ink/10">
                {tier1.description}
              </p>

              {/* Pillars (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                {tier1.pillars.map((pillar, pIdx) => (
                  <div key={pIdx} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-ink/10">
                      <h4 className="font-display font-bold text-sm sm:text-base text-ink">
                        {pillar.title}
                      </h4>
                      {pillar.badge && (
                        <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-black/5 text-stone">
                          {pillar.badge}
                        </span>
                      )}
                    </div>
                    <ul className="flex flex-col gap-2">
                      {pillar.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2 text-xs font-sans text-stone leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B08D57] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 border-t border-ink/10">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-ink hover:bg-charcoal text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <span>Select {tier1.name}</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>

          {/* Card 2: Market Dominance / Full-Scale (Tier 2 - Featured) */}
          <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#121315] border-2 border-[#B08D57] p-6 sm:p-10 shadow-2xl text-ivory flex flex-col justify-between group overflow-hidden">
            {/* Top Right Floating Badge */}
            <div className="absolute top-6 right-6 z-20">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#B08D57] text-[#0F1011] text-[10px] font-mono font-black uppercase tracking-wider shadow-lg">
                <Sparkles className="w-3 h-3 text-[#0F1011]" />
                <span>MOST POPULAR</span>
              </span>
            </div>

            {/* Ambient Background Glow */}
            <div
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#B08D57]/15 blur-3xl pointer-events-none group-hover:bg-[#B08D57]/25 transition-colors duration-500"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                  FULL-SCALE DOMINANCE
                </span>
                <span className="text-xs font-mono font-semibold text-white/50 mr-28 sm:mr-32">
                  TIER 02
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-2">
                {tier2.name}
              </h3>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#B08D57]/40 text-xs font-mono font-semibold text-[#D9C29A] mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>{tier2.scopeTag}</span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-stone-300 leading-relaxed pb-6 border-b border-white/10">
                {tier2.description}
              </p>

              {/* Pillars (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                {tier2.pillars.map((pillar, pIdx) => (
                  <div key={pIdx} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                      <h4 className="font-display font-bold text-sm sm:text-base text-white">
                        {pillar.title}
                      </h4>
                      {pillar.badge && (
                        <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#D9C29A] border border-white/10">
                          {pillar.badge}
                        </span>
                      )}
                    </div>
                    <ul className="flex flex-col gap-2">
                      {pillar.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2 text-xs font-sans text-stone-300 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B08D57] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="relative z-10 pt-6 border-t border-white/10">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#B08D57] hover:bg-[#C5A065] text-[#0F1011] font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-[0_10px_30px_rgba(176,141,87,0.4)] active:scale-[0.98]"
              >
                <span>Select {tier2.name}</span>
                <ArrowRight className="w-4 h-4 text-[#0F1011]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
