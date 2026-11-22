'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Wifi,
  Battery,
  Signal,
  Search,
  Star,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export interface PhoneScreenItem {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  image: string;
  metric: string;
  metricColor?: string;
  rating?: string;
  href: string;
}

// =============================================================================
// COLUMN 0: 6 Authentic Real Australian Business Screens (Slides UP)
// =============================================================================
export const COLUMN_0: PhoneScreenItem[] = [
  {
    id: 'col0-1',
    title: 'Quollhill Plumbing & Gas',
    tag: 'Emergency Repairs · Penrith',
    subtitle: 'The leak fixed, at the price you agreed first',
    image: '/images/screens/plumber/poster-480.webp',
    metric: '#1 Organic Rank',
    metricColor: 'text-[#1f7a37]',
    rating: '4.9 ★ (184 reviews)',
    href: '/services/seo',
  },
  {
    id: 'col0-2',
    title: 'Corella Bookkeeping',
    tag: 'Payroll & BAS · Toowoomba',
    subtitle: 'Caught up, then kept up',
    image: '/images/screens/bookkeeper/poster-480.webp',
    metric: '4.8x ROAS Target',
    metricColor: 'text-[#b45309]',
    rating: '5.0 ★ (96 reviews)',
    href: '/services/ppc',
  },
  {
    id: 'col0-3',
    title: 'Little Creek Orthodontics',
    tag: 'Clear Aligners · Kellyville',
    subtitle: 'Straight teeth, your colours',
    image: '/images/screens/orthodontist/poster-480.webp',
    metric: '#1 Map 3-Pack',
    metricColor: 'text-[#1f7a37]',
    rating: '4.9 ★ (215 reviews)',
    href: '/services/seo',
  },
  {
    id: 'col0-4',
    title: 'Bearer & Joist Co',
    tag: 'Custom Builders · Caringbah',
    subtitle: 'Stay in the street you love',
    image: '/images/screens/builder/poster-480.webp',
    metric: '+184% Inquiries',
    metricColor: 'text-[#b45309]',
    rating: '4.9 ★ (88 reviews)',
    href: '/services/web-development',
  },
  {
    id: 'col0-5',
    title: 'Peppergum Steps Dance',
    tag: 'Ballet, Jazz, Contemporary',
    subtitle: 'Dance classes in Mawson Lakes',
    image: '/images/screens/dance-studio/poster-480.webp',
    metric: '100% Term Capacity',
    metricColor: 'text-[#be185d]',
    rating: '5.0 ★ (140 reviews)',
    href: '/services/social-media',
  },
  {
    id: 'col0-6',
    title: 'Wattlebend Home Support',
    tag: 'Allied Care · Camden',
    subtitle: 'Help at home, across Camden',
    image: '/images/screens/aged-care/poster-480.webp',
    metric: '0.4s Fast Mobile Load',
    metricColor: 'text-[#1f7a37]',
    rating: '4.9 ★ (112 reviews)',
    href: '/services/web-development',
  },
];

// =============================================================================
// COLUMN 1: 6 Authentic Real Australian Business Screens (Slides DOWN)
// =============================================================================
export const COLUMN_1: PhoneScreenItem[] = [
  {
    id: 'col1-1',
    title: 'Banksia Verandah Audiology',
    tag: 'Hearing Care · Sutherland',
    subtitle: 'Hearing care without the hard sell',
    image: '/images/screens/audiology/poster-480.webp',
    metric: '+42% Patient Bookings',
    metricColor: 'text-[#1f7a37]',
    rating: '4.9 ★ (160 reviews)',
    href: '/services/seo',
  },
  {
    id: 'col1-2',
    title: 'Pebble Lantern Early Learning',
    tag: 'Childcare · Marsden Park',
    subtitle: 'From six weeks to school',
    image: '/images/screens/childcare/poster-480.webp',
    metric: 'Fully Enrolled 2026',
    metricColor: 'text-[#b45309]',
    rating: '5.0 ★ (128 reviews)',
    href: '/services/social-media',
  },
  {
    id: 'col1-3',
    title: 'Earthpin Electrical Systems',
    tag: 'Commercial Electricians · Sydney',
    subtitle: 'Industrial, Solar & Automation',
    image: '/images/screens/electrician/poster-480.webp',
    metric: 'Next.js 15 Edge SSR',
    metricColor: 'text-[#1f7a37]',
    rating: '4.9 ★ (190 reviews)',
    href: '/services/web-development',
  },
  {
    id: 'col1-4',
    title: 'Cardwell Wills & Estates',
    tag: 'Fixed-Fee Legal · Melbourne',
    subtitle: 'Estate planning and probate law',
    image: '/images/screens/wills-estates/poster-480.webp',
    metric: '5.2x Verified ROAS',
    metricColor: 'text-[#b45309]',
    rating: '4.9 ★ (74 reviews)',
    href: '/services/ppc',
  },
  {
    id: 'col1-5',
    title: 'Morrow Wattle Naturopathy',
    tag: 'Clinical Naturopath · Castlemaine',
    subtitle: 'Naturopathy in Castlemaine, and online',
    image: '/images/screens/naturopath/poster-480.webp',
    metric: '#1 Local Ranking',
    metricColor: 'text-[#1f7a37]',
    rating: '5.0 ★ (110 reviews)',
    href: '/services/seo',
  },
  {
    id: 'col1-6',
    title: 'Hopfield Recruitment Partners',
    tag: 'Executive Search · Sydney CBD',
    subtitle: 'Placing leaders in technology & finance',
    image: '/images/screens/recruitment/poster-480.webp',
    metric: '+312% Search Traffic',
    metricColor: 'text-[#b45309]',
    rating: '4.8 ★ (95 reviews)',
    href: '/services/seo',
  },
];

function PhoneMockupCard({ item }: { item: PhoneScreenItem }) {
  return (
    <Link
      href={item.href}
      tabIndex={-1}
      aria-label={`${item.title} — Digital Marketing`}
      className="group relative block w-full transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1.5 focus:outline-none"
    >
      {/* Titanium Phone Chassis with Rounded Curves */}
      <div className="relative w-full rounded-[30px] sm:rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#3a3938] via-[#1a1918] to-[#252422] shadow-[0_12px_32px_rgba(0,0,0,0.18)] border border-[#4a4947]/50 select-none">
        
        {/* Inner Phone Screen Frame */}
        <div className="relative w-full aspect-[390/820] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#faf8f5] shadow-inner flex flex-col justify-between">
          
          {/* iOS Status Bar */}
          <div className="relative z-20 px-4 pt-2.5 pb-1 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#161514] bg-white/90 backdrop-blur-sm border-b border-black/5">
            <span className="font-bold">9:41</span>
            
            {/* Dynamic Island Notch */}
            <div className="w-14 sm:w-16 h-3.5 bg-[#0c0d0e] rounded-full mx-auto" />
            
            <div className="flex items-center gap-1.5 text-[#161514]">
              <Signal className="w-2.5 h-2.5" />
              <Wifi className="w-2.5 h-2.5" />
              <Battery className="w-3 h-3" />
            </div>
          </div>

          {/* Screen Content: Authentic Razor-Sharp Poster Screenshot */}
          <div className="relative w-full flex-1 overflow-hidden bg-white">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
              className="object-cover object-top"
              priority={item.id === 'col0-1' || item.id === 'col1-1'}
            />
            
            {/* Subtle Gradient Overlay at Top & Bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Top Floating Metric Pill */}
            <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-white/95 border border-black/10 shadow-sm text-[9px] sm:text-[10px] font-mono font-bold text-[#161514] backdrop-blur-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f7a37]" />
                <span className={item.metricColor || 'text-[#161514]'}>{item.metric}</span>
              </span>
              {item.rating && (
                <span className="px-2 py-0.5 rounded-full bg-black/75 text-white text-[9px] font-mono font-bold backdrop-blur-sm">
                  {item.rating}
                </span>
              )}
            </div>

            {/* Bottom Meta Info */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#f7ac4f] block truncate drop-shadow">
                {item.tag}
              </span>
              <h4 className="font-display font-extrabold text-xs sm:text-sm text-white leading-tight drop-shadow truncate">
                {item.title}
              </h4>
            </div>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="py-1 bg-white flex justify-center border-t border-black/5">
            <div className="w-20 h-1 bg-black/30 rounded-full" />
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
      className="relative w-full h-[620px] sm:h-[720px] lg:h-[760px] overflow-hidden select-none"
    >
      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }

        @keyframes slideDown {
          0% {
            transform: translate3d(0, -50%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .sliding-col-up {
          animation: slideUp 42s linear infinite;
          will-change: transform;
        }

        .sliding-col-down {
          animation: slideDown 42s linear infinite;
          will-change: transform;
        }

        @media (hover: hover) {
          .sliding-col-up:hover,
          .sliding-col-down:hover {
            animation-play-state: paused;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sliding-col-up,
          .sliding-col-down {
            animation: none !important;
          }
        }
      `}</style>

      {/* Top and Bottom Fade Gradient Mask */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0) 90%, #ffffff 100%)',
        }}
      />

      {/* EXACTLY 2 SLIDING COLUMNS GRID (Column 0 slides UP, Column 1 slides DOWN) */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:gap-6 w-full h-full max-w-[540px] mx-auto lg:mx-0">
        
        {/* =========================================================================
            COLUMN 0: Slides UP (Authentic Australian Client Proof)
            ========================================================================= */}
        <div className="relative overflow-hidden -mt-12">
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
            COLUMN 1: Slides DOWN (Authentic Australian Client Proof)
            ========================================================================= */}
        <div className="relative overflow-hidden -mt-28">
          <div className="flex flex-col gap-4 sm:gap-5 sliding-col-down">
            {COLUMN_1.map((item) => (
              <PhoneMockupCard key={`col1-1-${item.id}`} item={item} />
            ))}
            {COLUMN_1.map((item) => (
              <PhoneMockupCard key={`col1-2-${item.id}`} item={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
