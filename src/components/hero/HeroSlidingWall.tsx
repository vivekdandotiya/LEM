'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneScreenItem {
  slug: string;
  title: string;
  category: string;
  href: string;
}

const COLUMN_0: PhoneScreenItem[] = [
  { slug: 'audiology', title: 'Banksia Verandah Hearing', category: 'Audiology', href: '/services/seo' },
  { slug: 'bookkeeper', title: 'Corella Bookkeeping', category: 'BAS & Payroll', href: '/services/seo' },
  { slug: 'builder', title: 'Bearer & Joist Building Co', category: 'Builders', href: '/services/web-development' },
  { slug: 'conveyancer', title: 'Saltbush Conveyancing', category: 'Legal', href: '/services/ppc' },
  { slug: 'driving-school', title: 'Bottlebrush Driving School', category: 'Education', href: '/services/social-media' },
  { slug: 'naturopath', title: 'Morrow Wattle Naturopathy', category: 'Health', href: '/services/seo' },
];

const COLUMN_1: PhoneScreenItem[] = [
  { slug: 'plumber', title: 'Quollhill Plumbing & Gas', category: 'Plumber', href: '/services/seo' },
  { slug: 'orthodontist', title: 'Little Creek Orthodontics', category: 'Orthodontist', href: '/services/seo' },
  { slug: 'kids-sports', title: 'Hopfield Junior Sport', category: 'Kids Sports', href: '/services/social-media' },
  { slug: 'podiatry', title: 'Norton Street Podiatry', category: 'Podiatry', href: '/services/seo' },
  { slug: 'wills-estates', title: 'Orchard Gully Law', category: 'Wills & Estates', href: '/services/ppc' },
  { slug: 'recruitment', title: 'Banksia Ledger Recruitment', category: 'Recruitment', href: '/services/ppc' },
];

const COLUMN_2: PhoneScreenItem[] = [
  { slug: 'dance-studio', title: 'Peppergum Steps Studio', category: 'Dance Studio', href: '/services/social-media' },
  { slug: 'aged-care', title: 'Wattlebend Home Support', category: 'Aged Care', href: '/services/seo' },
  { slug: 'childcare', title: 'Pebble Lantern Early Learning', category: 'Childcare', href: '/services/social-media' },
  { slug: 'electrician', title: 'Earthpin Electrical', category: 'Electrician', href: '/services/web-development' },
  { slug: 'architect', title: 'Mallee Fold Architects', category: 'Architects', href: '/services/web-development' },
  { slug: 'painter', title: 'Stilt & Batten Painting', category: 'Painter', href: '/services/seo' },
];

function PhoneMockupCard({ item }: { item: PhoneScreenItem }) {
  return (
    <Link
      href={item.href}
      tabIndex={-1}
      aria-label={`${item.title} — ${item.category}`}
      className="group relative block w-full transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1.5 focus:outline-none"
    >
      {/* Titanium Phone Chassis */}
      <div className="relative w-full rounded-[28px] sm:rounded-[34px] p-2 sm:p-2.5 bg-gradient-to-b from-[#3a3938] via-[#1a1918] to-[#252422] shadow-[0_10px_28px_rgba(0,0,0,0.18)] border border-[#4a4947]/50 select-none">
        
        {/* Inner Phone Screen Frame */}
        <div className="relative w-full aspect-[390/844] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-white shadow-inner">
          
          {/* iOS Status Bar */}
          <div
            className="absolute top-0 inset-x-0 h-6 sm:h-7 px-3 flex items-center justify-between text-[#161514] text-[9px] sm:text-[10px] font-sans font-bold z-20 pointer-events-none select-none bg-gradient-to-b from-white/90 via-white/50 to-transparent"
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

          {/* Website Screenshot Poster Image */}
          <div className="relative w-full h-full pt-5 sm:pt-6 bg-[#fbfbfa]">
            <Image
              src={`/images/screens/${item.slug}/poster-480.webp`}
              alt={item.title}
              width={480}
              height={1039}
              className="w-full h-auto object-cover display-block"
              priority={false}
              loading="lazy"
            />
          </div>

          {/* Glass Glare Overlay */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/25 z-10"
            aria-hidden="true"
          />

          {/* Hover Overlay: "View Rebuild" */}
          <div className="absolute inset-0 bg-[#161514]/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-30">
            <span className="px-3.5 py-1.5 rounded-full bg-[#f7ac4f] text-[#161514] text-xs font-sans font-extrabold shadow-md tracking-tight">
              View website →
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
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white via-transparent to-white"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0) 12%, rgba(255,255,255,0) 88%, #ffffff 100%)'
        }}
      />

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full h-full">
        
        {/* =========================================================================
            COLUMN 0: Slides UP (Audiology, Bookkeeper, Builder, etc.)
            ========================================================================= */}
        <div className="relative overflow-hidden -mt-16">
          <div className="flex flex-col gap-4 sm:gap-5 sliding-col-up">
            {/* Set 1 */}
            {COLUMN_0.map((item) => (
              <PhoneMockupCard key={`col0-1-${item.slug}`} item={item} />
            ))}
            {/* Set 2 (Duplicated for seamless loop) */}
            {COLUMN_0.map((item) => (
              <PhoneMockupCard key={`col0-2-${item.slug}`} item={item} />
            ))}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 1: Slides DOWN (Plumber, Orthodontist, Kids Sports, etc.)
            ========================================================================= */}
        <div className="relative overflow-hidden -mt-36">
          <div className="flex flex-col gap-4 sm:gap-5 sliding-col-down">
            {/* Set 1 */}
            {COLUMN_1.map((item) => (
              <PhoneMockupCard key={`col1-1-${item.slug}`} item={item} />
            ))}
            {/* Set 2 (Duplicated for seamless loop) */}
            {COLUMN_1.map((item) => (
              <PhoneMockupCard key={`col1-2-${item.slug}`} item={item} />
            ))}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2: Slides UP (Dance Studio, Aged Care, Childcare, etc.)
            Visible on lg+ screens
            ========================================================================= */}
        <div className="hidden lg:block relative overflow-hidden -mt-10">
          <div className="flex flex-col gap-4 sm:gap-5 sliding-col-up">
            {/* Set 1 */}
            {COLUMN_2.map((item) => (
              <PhoneMockupCard key={`col2-1-${item.slug}`} item={item} />
            ))}
            {/* Set 2 (Duplicated for seamless loop) */}
            {COLUMN_2.map((item) => (
              <PhoneMockupCard key={`col2-2-${item.slug}`} item={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
