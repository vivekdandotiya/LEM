'use client';

import React from 'react';

/**
 * Brand Partner Logotypes
 * Each brand is designed as a distinct, authentic vector logotype with its own
 * graphic personality, typography, and visual mark matching world-class corporate standards.
 */
interface BrandItem {
  id: string;
  name: string;
  render: React.ReactNode;
}

const BRANDS: BrandItem[] = [
  // 1. Verve Social (Signature Script Wordmark with Flourish + Crisp Geometric Sans)
  {
    id: 'verve-social',
    name: 'Verve Social',
    render: (
      <div className="flex items-center gap-2 select-none">
        <div className="relative flex flex-col items-start">
          <span className="font-serif italic font-bold text-[25px] sm:text-[27px] text-[#0f2b48] tracking-tight leading-none">
            Verve
          </span>
          {/* Subtle pen sweep flourish */}
          <svg className="w-12 h-1 text-[#0f2b48] -mt-0.5" viewBox="0 0 48 4" fill="none">
            <path d="M1 2.5 C 14 0.5, 32 3.8, 47 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-sans font-black text-[11px] sm:text-[12px] text-[#0f2b48] tracking-[0.24em] uppercase leading-none pt-0.5">
          SOCIAL
        </span>
      </div>
    ),
  },

  // 2. Oakridge Living (Delicate Illustrated Rose Tree Emblem + Refined Roman Serif)
  {
    id: 'oakridge-living',
    name: 'Oakridge Living',
    render: (
      <div className="flex items-center gap-2.5 select-none">
        <svg className="w-8 h-8 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk and branching limbs */}
          <path d="M18 33V23M18 23C18 19 14 16 11 14M18 21C18 18 22 15 25 13M18 19V12" stroke="#b36979" strokeWidth="1.8" strokeLinecap="round" />
          {/* Delicate blossom clusters */}
          <circle cx="18" cy="9" r="3.2" fill="#b36979" />
          <circle cx="11" cy="13" r="3" fill="#b36979" />
          <circle cx="25" cy="12" r="3" fill="#b36979" />
          <circle cx="14" cy="7" r="2.4" fill="#c98291" />
          <circle cx="22" cy="7" r="2.4" fill="#c98291" />
          <circle cx="7" cy="15" r="2.2" fill="#d999a6" />
          <circle cx="29" cy="14" r="2.2" fill="#d999a6" />
          <circle cx="18" cy="15" r="2.8" fill="#b36979" opacity="0.9" />
          <circle cx="13" cy="18" r="2.2" fill="#c98291" />
          <circle cx="23" cy="17" r="2.2" fill="#c98291" />
        </svg>
        <div className="flex flex-col text-left justify-center">
          <span className="font-serif text-[15px] font-bold tracking-[0.16em] text-[#1e293b] leading-tight uppercase">
            OAKRIDGE
          </span>
          <span className="text-[7.5px] font-sans font-semibold tracking-[0.24em] text-[#64748b] leading-none uppercase mt-0.5">
            LIVING & CARE
          </span>
        </div>
      </div>
    ),
  },

  // 3. NØRDIK Studio (Scandinavian Minimalist Architectural Slashed Geometric Mark)
  {
    id: 'nordik',
    name: 'NØRDIK',
    render: (
      <div className="flex items-center select-none">
        <svg viewBox="0 0 134 26" className="h-6 sm:h-[26px] w-auto text-[#0f172a]" fill="currentColor">
          {/* N */}
          <path d="M 2 24 V 4 H 6.5 L 18 19 V 4 H 22.5 V 24 H 18 L 6.5 9 V 24 H 2 Z" />
          {/* Slashed Ø */}
          <circle cx="38" cy="14" r="9.5" fill="none" stroke="currentColor" strokeWidth="3.6" />
          <line x1="26" y1="26" x2="50" y2="2" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          {/* R */}
          <path d="M 56 24 V 4 H 66 C 71.5 4 74.5 6.5 74.5 10.5 C 74.5 13.5 72.5 15.5 69 16.5 L 75.5 24 H 70 L 64 17 H 60.5 V 24 H 56 Z M 60.5 13 H 65.5 C 68 13 69.5 12 69.5 10.5 C 69.5 9 68 8 65.5 8 H 60.5 V 13 Z" />
          {/* D */}
          <path d="M 81 24 V 4 H 89 C 95.5 4 100 8 100 14 C 100 20 95.5 24 89 24 H 81 Z M 85.5 20 H 89 C 93 20 95.5 17.5 95.5 14 C 95.5 10.5 93 8 89 8 H 85.5 V 20 Z" />
          {/* I */}
          <path d="M 106 4 H 110.5 V 24 H 106 Z" />
          {/* K */}
          <path d="M 117 24 V 4 H 121.5 V 13 L 129 4 H 134.5 L 126 14 L 135 24 H 129 L 121.5 15.5 V 24 H 117 Z" />
        </svg>
      </div>
    ),
  },

  // 4. STRATA Performance (High-Impact Athletic Condensed Type + Velocity Ring)
  {
    id: 'strata-athletic',
    name: 'STRATA',
    render: (
      <div className="flex items-center gap-2 select-none">
        <span className="font-sans font-black italic text-xl sm:text-2xl tracking-tighter text-[#111827] leading-none uppercase">
          STRATA
        </span>
        <svg className="w-7 h-7 shrink-0 text-[#111827]" viewBox="0 0 32 32" fill="none">
          <ellipse cx="16" cy="16" rx="12" ry="7" transform="rotate(-25 16 16)" stroke="currentColor" strokeWidth="3" />
          <circle cx="16" cy="16" r="4.5" fill="currentColor" />
          <circle cx="25" cy="11" r="2" fill="#f59e0b" />
        </svg>
      </div>
    ),
  },

  // 5. Vance & Mercer Legal (Royal Blue Interlocking Ribbon Monogram + Corporate Type)
  {
    id: 'vance-legal',
    name: 'Vance Legal',
    render: (
      <div className="flex items-center gap-2 select-none">
        <svg className="w-8 h-8 shrink-0" viewBox="0 0 34 34" fill="none">
          {/* Interlocking Ribbon Monogram in Royal Cobalt Blue */}
          <path d="M6 6 V26 C6 28 8 29.5 10.5 29.5 H28" stroke="#1d70b8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6 H18 C22 6 24.5 8.5 24.5 12 C24.5 15.5 22 18 18 18 H6" stroke="#1d70b8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 18 L26 28" stroke="#1d70b8" strokeWidth="3.2" strokeLinecap="round" />
          {/* Inner parallel accent */}
          <path d="M12 21 V24.5 H22" stroke="#0ea5e9" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col text-left justify-center pl-1">
          <span className="font-sans font-bold text-[17px] text-[#1d70b8] tracking-tight leading-none">
            Rilus
          </span>
          <span className="font-sans font-medium text-[13px] text-[#0f2b48] tracking-wide leading-tight">
            Law
          </span>
        </div>
      </div>
    ),
  },

  // 6. Lumina Acoustics (Hairline Radial Frequency Wave + Ultra-Spaced Sans)
  {
    id: 'lumina-acoustics',
    name: 'Lumina Acoustics',
    render: (
      <div className="flex items-center gap-2.5 select-none">
        <svg className="w-7 h-7 text-[#0f2b48] shrink-0" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 3" />
          <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
        <div className="flex flex-col text-left justify-center">
          <span className="font-sans font-medium text-[13px] sm:text-[14px] text-[#0f2b48] tracking-[0.28em] uppercase leading-none">
            LUMINA
          </span>
          <span className="text-[7.5px] font-sans font-semibold tracking-[0.2em] text-[#64748b] uppercase mt-0.5">
            ACOUSTICS
          </span>
        </div>
      </div>
    ),
  },

  // 7. Cove Botanicals (Apothecary Crest Seal + Classic Roman Serif)
  {
    id: 'cove-botanicals',
    name: 'Cove Botanicals',
    render: (
      <div className="flex items-center gap-2.5 select-none">
        <svg className="w-7 h-7 text-[#374151] shrink-0" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 8 C16 14 13 18 10 22 M16 11 C18 10 21 11 21 13 C21 15 18 15 16 14 M14 16 C12 15 9 16 9 18 C9 20 12 20 14 18 M16 19 C18 18 20 19 20 21 C20 22 18 23 16 22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col text-left justify-center">
          <span className="font-serif text-[17px] font-medium text-[#1f2937] tracking-[0.1em] leading-none uppercase">
            COVE
          </span>
          <span className="text-[7.5px] font-sans font-semibold tracking-[0.24em] text-[#6b7280] uppercase mt-0.5">
            BOTANICALS
          </span>
        </div>
      </div>
    ),
  },

  // 8. Mallee Fold Architecture (Isometric Architectural Origami Fold)
  {
    id: 'mallee-fold',
    name: 'Mallee Fold',
    render: (
      <div className="flex items-center gap-2.5 select-none">
        <svg className="w-7 h-7 text-[#0f2b48] shrink-0" viewBox="0 0 32 32" fill="none">
          <path d="M6 24 L16 7 L26 24 L16 19 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="16" y1="7" x2="16" y2="19" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="flex flex-col text-left justify-center">
          <span className="font-sans font-bold text-[14px] text-[#0f2b48] tracking-[0.14em] leading-none uppercase">
            MALLEE FOLD
          </span>
          <span className="text-[7.5px] font-sans font-medium tracking-[0.25em] text-[#64748b] uppercase mt-0.5">
            ARCHITECTURE
          </span>
        </div>
      </div>
    ),
  },

  // 9. Kestrel Dynamics (Precision Engineered Aerodynamic Chevron)
  {
    id: 'kestrel-dynamics',
    name: 'Kestrel Dynamics',
    render: (
      <div className="flex items-center gap-2.5 select-none">
        <svg className="w-7 h-7 text-[#1e293b] shrink-0" viewBox="0 0 32 32" fill="none">
          <path d="M4 22 L16 6 L28 22 L22 22 L16 13 L10 22 Z" fill="currentColor" />
          <path d="M16 16 L22 25 L10 25 Z" fill="#0ea5e9" />
        </svg>
        <div className="flex flex-col text-left justify-center">
          <span className="font-sans font-extrabold text-[15px] text-[#0f2b48] tracking-tight leading-none">
            KESTREL
          </span>
          <span className="text-[8px] font-mono font-semibold text-[#64748b] tracking-[0.2em] uppercase mt-0.5">
            DYNAMICS
          </span>
        </div>
      </div>
    ),
  },

  // 10. Halcyon Capital (Diamond Faceted Crest + Prestigious Heritage Type)
  {
    id: 'halcyon-capital',
    name: 'Halcyon Capital',
    render: (
      <div className="flex items-center gap-2.5 select-none">
        <svg className="w-7 h-7 text-[#0f2b48] shrink-0" viewBox="0 0 32 32" fill="none">
          <polygon points="16,4 27,16 16,28 5,16" stroke="currentColor" strokeWidth="2" />
          <polygon points="16,9 22,16 16,23 10,16" fill="currentColor" />
        </svg>
        <div className="flex flex-col text-left justify-center">
          <span className="font-serif text-[16px] font-bold text-[#0f2b48] tracking-[0.12em] leading-none uppercase">
            HALCYON
          </span>
          <span className="text-[7.5px] font-sans font-semibold tracking-[0.22em] text-[#64748b] uppercase mt-0.5">
            PRIVATE CAPITAL
          </span>
        </div>
      </div>
    ),
  },
];

export function BrandPartnerMarquee() {
  // Seamless loop by duplicating the array
  const marqueeList = [...BRANDS, ...BRANDS];

  return (
    <section className="py-16 sm:py-20 bg-white text-[#161514] select-none border-t border-[#f0eee9] overflow-hidden relative">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            Section Headline:
            Deep sapphire navy (#0f2b48), clean bold sans typography, balanced 2-line break
            ========================================================================= */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-sans font-bold text-[#0f2b48] text-center tracking-tight leading-[1.28] max-w-3xl mx-auto mb-10 sm:mb-14">
          Proudly Partnering With Brands That<br className="hidden sm:inline" /> Demand Results, Not Just Deliverables.
        </h2>
      </div>

      {/* =========================================================================
          Infinite Auto-Sliding Marquee Track
          ========================================================================= */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Soft Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-white via-white/85 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-white via-white/85 to-transparent z-10" />

        <div className="flex w-max items-center animate-brand-marquee hover:[animation-play-state:paused] py-3">
          {marqueeList.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex items-center mx-8 sm:mx-12 lg:mx-14 shrink-0 opacity-90 hover:opacity-100 hover:scale-[1.04] transition-all duration-300 cursor-pointer"
            >
              {brand.render}
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
          animation: brandMarquee 38s linear infinite;
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
