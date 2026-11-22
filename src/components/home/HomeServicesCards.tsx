'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

interface IndustryGroup {
  id: string;
  count: string;
  title: string;
  examples: string;
  href: string;
  bgColor: string;
  borderColor: string;
  badge: {
    label: string;
    icon: React.ReactNode;
  };
  phone: {
    title: string;
    tag: string;
    image: string;
  };
}

const INDUSTRY_GROUPS: IndustryGroup[] = [
  {
    id: 'health',
    count: '23 industries',
    title: 'Health & Clinical Care',
    examples: 'Dental, Physio, Psychology, Vet and 19 more.',
    href: '/services/seo',
    bgColor: 'bg-[#EAF1ED]',
    borderColor: 'border-[#D2E2D8]',
    badge: {
      label: '+42% Patient Bookings',
      icon: <TrendingUp className="w-3 h-3 text-[#1f7a37]" />,
    },
    phone: {
      title: 'Hearing care without the hard sell',
      tag: 'Audiology & Dental',
      image: '/images/screens/audiology/poster-480.webp',
    },
  },
  {
    id: 'professional',
    count: '21 industries',
    title: 'Professional Services',
    examples: 'Accountants, Law firms, Real estate, SaaS and 17 more.',
    href: '/services/ppc',
    bgColor: 'bg-[#F4F1EA]',
    borderColor: 'border-[#E2DDD1]',
    badge: {
      label: '4.8x ROAS Target',
      icon: <Sparkles className="w-3 h-3 text-[#b45309]" />,
    },
    phone: {
      title: 'Caught up, then kept up',
      tag: 'Accounting & Advisory',
      image: '/images/screens/bookkeeper/poster-480.webp',
    },
  },
  {
    id: 'education',
    count: '12 industries',
    title: 'Education and Care',
    examples: 'Childcare, Tutoring, Swim schools, Dance and 8 more.',
    href: '/services/social-media',
    bgColor: 'bg-[#F8EDED]',
    borderColor: 'border-[#EED4D4]',
    badge: {
      label: '100% Term Capacity',
      icon: <ShieldCheck className="w-3 h-3 text-rose-700" />,
    },
    phone: {
      title: 'Early learning in Marsden Park',
      tag: 'Childcare & Tuition',
      image: '/images/screens/childcare/poster-480.webp',
    },
  },
  {
    id: 'trades',
    count: '15 industries',
    title: 'Trades & Commerce',
    examples: 'Builders, Plumbers, Electricians, DTC and 11 more.',
    href: '/services/web-development',
    bgColor: 'bg-[#FCF4EA]',
    borderColor: 'border-[#F3DEC4]',
    badge: {
      label: 'NEXT.JS 15 · 100 SPEED',
      icon: <Zap className="w-3 h-3 text-amber-700" />,
    },
    phone: {
      title: 'The leak fixed at the agreed price',
      tag: 'Plumbing & Building',
      image: '/images/screens/plumber/poster-480.webp',
    },
  },
];

export function HomeServicesCards() {
  return (
    <section className="py-20 sm:py-28 bg-white text-[#161514] select-none border-t border-[#e8e6e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider block mb-2">
              Industry Growth Specializations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.08]">
              Full-funnel digital marketing across key industries.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#5d5a55] mt-3 max-w-2xl leading-relaxed">
              Specialized search engine optimization, high-ROAS Meta and Google ad campaigns, and conversion-engineered web architecture tailored to your commercial market.
            </p>
          </div>
        </div>

        {/* 4 Clean Rounded Pastel Cards with Centered, Razor-Sharp Phone Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {INDUSTRY_GROUPS.map((group) => (
            <Link
              key={group.id}
              href={group.href}
              className={`group rounded-[32px] ${group.bgColor} border ${group.borderColor} p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(22,21,20,0.15)] hover:-translate-y-1.5`}
            >
              <div>
                {/* Metric Badge at Top of Card */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#5d5a55] uppercase tracking-wider">
                    {group.count}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-white/95 border border-black/10 shadow-xs flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#161514] backdrop-blur-sm">
                    {group.badge.icon}
                    <span>{group.badge.label}</span>
                  </div>
                </div>

                {/* Clean, Centered, Elegantly Proportioned Smartphone Mockup */}
                <div
                  aria-hidden="true"
                  className="relative h-60 sm:h-64 mb-6 rounded-[24px] bg-white/70 border border-black/5 p-4 flex items-center justify-center overflow-hidden shadow-inner group-hover:bg-white/90 transition-colors"
                >
                  <div className="relative w-40 sm:w-44 h-56 sm:h-60 rounded-[26px] p-2 bg-[#161514] border border-[#333] shadow-xl flex flex-col transform transition-transform duration-300 group-hover:scale-105">
                    {/* Notch & Speaker */}
                    <div className="w-12 h-1.5 bg-[#333] rounded-full mx-auto mb-1.5 shrink-0" />
                    
                    {/* Screen with Real, High-Definition Poster Screenshot */}
                    <div className="relative w-full flex-1 rounded-[16px] overflow-hidden bg-white">
                      <Image
                        src={group.phone.image}
                        alt={group.phone.title}
                        fill
                        sizes="(max-width: 768px) 180px, 200px"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Subtitle tag at bottom */}
                      <span className="absolute bottom-1.5 left-2 right-2 text-[9px] font-mono font-bold text-white uppercase tracking-wider truncate drop-shadow">
                        {group.phone.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Meta & Title */}
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#161514] mb-2 leading-snug">
                  {group.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#5d5a55] leading-relaxed mb-4">
                  {group.examples}
                </p>
              </div>

              {/* Action Link Arrow */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs sm:text-sm font-bold text-[#161514]">
                <span>Explore growth strategies</span>
                <ArrowRight className="w-4 h-4 text-[#b45309] transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
