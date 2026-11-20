'use client';

import React from 'react';

interface BrandItem {
  id: string;
  name: string;
  category: string;
  logoSvg: React.ReactNode;
}

const BOUTIQUE_BRANDS: BrandItem[] = [
  {
    id: 'lumina-audio',
    name: 'LUMINA AUDIO',
    category: 'Acoustics & Studio Audio',
    logoSvg: (
      <svg className="w-7 h-7 text-ink group-hover:text-[#B08D57] transition-colors" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="16" cy="16" r="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'kinto-living',
    name: 'KINTO LIVING',
    category: 'Minimalist Objects',
    logoSvg: (
      <svg className="w-7 h-7 text-ink group-hover:text-[#B08D57] transition-colors" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'forma-studio',
    name: 'FORMA STUDIO',
    category: 'Architectural Ergonomics',
    logoSvg: (
      <svg className="w-7 h-7 text-ink group-hover:text-[#B08D57] transition-colors" viewBox="0 0 32 32" fill="none">
        <path d="M7 24L16 8L25 24H7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <line x1="12" y1="19" x2="20" y2="19" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'vespera-skincare',
    name: 'VESPERA',
    category: 'Botanical Skincare',
    logoSvg: (
      <svg className="w-7 h-7 text-ink group-hover:text-[#B08D57] transition-colors" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C16 12 24 16 24 24C24 28 20 28 16 28C12 28 8 28 8 24C8 16 16 12 16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'nordik-labs',
    name: 'NORDIK LABS',
    category: 'Urban Clean Tech',
    logoSvg: (
      <svg className="w-7 h-7 text-ink group-hover:text-[#B08D57] transition-colors" viewBox="0 0 32 32" fill="none">
        <path d="M5 22L16 6L27 22H5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 22L16 13L22 22" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'aura-biotech',
    name: 'AURA BIOTECH',
    category: 'Bio-Adaptive Health',
    logoSvg: (
      <svg className="w-7 h-7 text-ink group-hover:text-[#B08D57] transition-colors" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="16" rx="12" ry="6" stroke="currentColor" strokeWidth="2" transform="rotate(-30 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="6" stroke="currentColor" strokeWidth="2" transform="rotate(30 16 16)" />
      </svg>
    ),
  },
];

export function BrandTrustBar() {
  return (
    <section className="py-16 sm:py-20 bg-[#F6F3EC] border-b border-ink/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        {/* Eyebrow: 04 / BRAND PARTNERS */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#B08D57]" aria-hidden="true" />
          <span className="text-xs font-mono tracking-widest uppercase text-stone font-semibold">
            04 / BRAND PARTNERS
          </span>
        </div>

        {/* Section Headline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-ink tracking-tight max-w-3xl mx-auto mb-12 sm:mb-16 leading-tight">
          Proudly Partnering With Forward-Thinking Brands That Demand Measurable Growth.
        </h2>

        {/* Boutique Brand Logos Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 items-center justify-items-center">
          {BOUTIQUE_BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center gap-2.5 text-stone-700 hover:text-ink transition-colors group cursor-default"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {brand.logoSvg}
              </div>
              <div className="text-left leading-none">
                <span className="block text-xs font-display font-extrabold tracking-wider uppercase text-ink group-hover:text-[#B08D57] transition-colors">
                  {brand.name}
                </span>
                <span className="block text-xs font-mono tracking-wider text-stone-700 uppercase mt-0.5">
                  {brand.category.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
