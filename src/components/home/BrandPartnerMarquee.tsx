'use client';

import React from 'react';

interface Brand {
  id: string;
  name: string;
  sub: string;
  logo: React.ReactNode;
}

const BRANDS: Brand[] = [
  // 1. Kestrel Logistics
  {
    id: 'kestrel',
    name: 'KESTREL',
    sub: 'LOGISTICS GROUP',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6H12V14L19 6H26L16 16L26 26H19L12 18V26H6V6Z" fill="currentColor" />
      </svg>
    ),
  },

  // 2. Harbour Allied Health
  {
    id: 'harbour',
    name: 'HARBOUR',
    sub: 'ALLIED HEALTH',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 9V23M9 16H23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
    ),
  },

  // 3. Mallee Fold Architecture
  {
    id: 'mallee-fold',
    name: 'MALLEE FOLD',
    sub: 'ARCHITECTURE',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 24L16 6L28 24H4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M16 6V24M10 18H22" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },

  // 4. Cove Apparel Co.
  {
    id: 'cove',
    name: 'COVE',
    sub: 'APPAREL CO.',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28C21 28 25.2 24.9 26.9 20.5H20.7C19.6 22 17.9 23 16 23C12.13 23 9 19.87 9 16C9 12.13 12.13 9 16 9C17.9 9 19.6 10 20.7 11.5H26.9C25.2 7.1 21 4 16 4Z" fill="currentColor" />
      </svg>
    ),
  },

  // 5. O'Connor & Vance
  {
    id: 'oconnor-vance',
    name: "O'CONNOR & VANCE",
    sub: 'ATTORNEYS AT LAW',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 8V24M10 12H22M10 20H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // 6. Aura Clinical Labs
  {
    id: 'aura-labs',
    name: 'AURA LABS',
    sub: 'DIAGNOSTICS & RESEARCH',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="4.5" fill="currentColor" />
      </svg>
    ),
  },

  // 7. Redgum Early Learning
  {
    id: 'redgum',
    name: 'REDGUM',
    sub: 'EARLY LEARNING ACADEMY',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
        <path d="M16 6C16 11.5 20.5 16 26 16C20.5 16 16 20.5 16 26C16 20.5 11.5 16 6 16C11.5 16 16 11.5 16 6Z" fill="currentColor" />
      </svg>
    ),
  },

  // 8. Highland Commercial
  {
    id: 'highland',
    name: 'HIGHLAND',
    sub: 'COMMERCIAL REALTY',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="8" height="18" stroke="currentColor" strokeWidth="2.5" />
        <rect x="18" y="14" width="8" height="12" stroke="currentColor" strokeWidth="2.5" />
        <line x1="6" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },

  // 9. Apex Solar Solutions
  {
    id: 'apex-solar',
    name: 'APEX SOLAR',
    sub: 'CLEAN ENERGY TECH',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="2.5" />
        <line x1="16" y1="3" x2="16" y2="6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="26" x2="16" y2="29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="3" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="26" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },

  // 10. SwiftCraft Marine
  {
    id: 'swiftcraft',
    name: 'SWIFTCRAFT',
    sub: 'MARINE ENGINEERING',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 21C11 21 13 11 27 11C23 19 19 24 5 24V21Z" fill="currentColor" />
        <path d="M12 7L24 7L18 12L12 7Z" fill="currentColor" />
      </svg>
    ),
  },

  // 11. Veritas Wealth
  {
    id: 'veritas',
    name: 'VERITAS',
    sub: 'PRIVATE WEALTH',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L26 8V16C26 22 21.5 27 16 29C10.5 27 6 22 6 16V8L16 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M16 10V22M11 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // 12. Roast & Co.
  {
    id: 'roast-co',
    name: 'ROAST & CO.',
    sub: 'SPECIALTY BOTANICALS',
    logo: (
      <svg className="w-8 h-8 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="16" rx="8" ry="12" stroke="currentColor" strokeWidth="2.5" transform="rotate(-30 16 16)" />
        <path d="M13 8C17 12 17 20 13 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function BrandPartnerMarquee() {
  // Duplicate for seamless 0-delay loop
  const marqueeList = [...BRANDS, ...BRANDS];

  return (
    <section className="py-20 sm:py-24 bg-white text-[#161514] select-none border-t border-[#e8e6e2] overflow-hidden relative">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            Section Headline: Exactly matching reference image
            ========================================================================= */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#0f172a] text-center tracking-tight leading-tight max-w-4xl mx-auto mb-14 sm:mb-16">
          Proudly Partnering With Brands That Demand Results, Not Just Deliverables.
        </h2>
      </div>

      {/* =========================================================================
          Infinite Auto-Sliding Marquee Track
          ========================================================================= */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Fade Edges matching reference screenshot */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        <div className="flex w-max animate-brand-marquee hover:[animation-play-state:paused] py-4">
          {marqueeList.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex items-center gap-3.5 mx-8 sm:mx-12 shrink-0 group transition-all duration-300 opacity-75 hover:opacity-100 hover:scale-105 cursor-pointer"
            >
              {/* Brand Logo Emblem */}
              <div className="transition-transform duration-200 group-hover:scale-110">
                {brand.logo}
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col text-left">
                <span className="font-sans font-black text-sm sm:text-base tracking-tight leading-none text-[#0f172a] group-hover:text-[#b45309] transition-colors">
                  {brand.name}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#64748b] mt-0.5 leading-none font-bold uppercase">
                  {brand.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation Keyframes for Smooth Infinite Sliding */}
      <style jsx>{`
        @keyframes brandMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-brand-marquee {
          animation: brandMarquee 42s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-brand-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
