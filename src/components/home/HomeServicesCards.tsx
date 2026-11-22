'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

interface PhonePreview {
  title: string;
  tag: string;
  image: string;
}

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
  phones: PhonePreview[];
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
    phones: [
      {
        title: 'Hearing care without hard sell',
        tag: 'Audiology',
        image: '/images/screens/audiology/poster-480.webp',
      },
      {
        title: 'Morrow Wattle Clinic',
        tag: 'Naturopath',
        image: '/images/screens/naturopath/poster-480.webp',
      },
      {
        title: 'Straight teeth, your colours',
        tag: 'Orthodontics',
        image: '/images/screens/orthodontist/poster-480.webp',
      },
    ],
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
    phones: [
      {
        title: 'Wills & Estates fixed fee',
        tag: 'Legal',
        image: '/images/screens/wills-estates/poster-480.webp',
      },
      {
        title: 'Caught up, then kept up',
        tag: 'Bookkeeping',
        image: '/images/screens/bookkeeper/poster-480.webp',
      },
      {
        title: 'Commercial conveyancing',
        tag: 'Property',
        image: '/images/screens/conveyancer/poster-480.webp',
      },
    ],
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
    phones: [
      {
        title: 'Ballet, Jazz, Contemporary',
        tag: 'Dance Studio',
        image: '/images/screens/dance-studio/poster-480.webp',
      },
      {
        title: 'Early learning in Marsden Park',
        tag: 'Childcare',
        image: '/images/screens/childcare/poster-480.webp',
      },
      {
        title: 'Bottlebrush Driving School',
        tag: 'Driving School',
        image: '/images/screens/driving-school/poster-480.webp',
      },
    ],
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
      label: 'NEXT.JS 15 · 100 LIGHTHOUSE',
      icon: <Zap className="w-3 h-3 text-amber-700" />,
    },
    phones: [
      {
        title: 'The leak fixed agreed first',
        tag: 'Plumbing',
        image: '/images/screens/plumber/poster-480.webp',
      },
      {
        title: 'Stay in the street you love',
        tag: 'Builders',
        image: '/images/screens/builder/poster-480.webp',
      },
      {
        title: 'Earthpin Electrical Systems',
        tag: 'Electrician',
        image: '/images/screens/electrician/poster-480.webp',
      },
    ],
  },
];

export function HomeServicesCards() {
  return (
    <section className="py-20 sm:py-28 bg-white text-[#161514] select-none">
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

        {/* 4 Large Rounded Pastel Cards (Matching Reference Images with Real Photography) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {INDUSTRY_GROUPS.map((group) => (
            <Link
              key={group.id}
              href={group.href}
              className={`group rounded-[28px] ${group.bgColor} border ${group.borderColor} p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_36px_-8px_rgba(22,21,20,0.12)] hover:-translate-y-1`}
            >
              <div>
                {/* Embedded Mini Mobile Showcase Mockups with Real Photography */}
                <div
                  aria-hidden="true"
                  className="relative h-48 sm:h-52 mb-6 overflow-hidden rounded-[22px] bg-white/60 border border-black/5 p-3 flex items-center justify-center gap-2.5 shadow-inner"
                >
                  {/* Floating Metric Pill */}
                  <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-white/95 border border-black/10 shadow-sm flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#161514] backdrop-blur-sm">
                    {group.badge.icon}
                    <span>{group.badge.label}</span>
                  </div>

                  {group.phones.map((phone, idx) => (
                    <div
                      key={phone.title}
                      className={`w-28 sm:w-32 h-44 rounded-[18px] p-1.5 bg-[#161514] border border-[#333] shadow-md flex flex-col shrink-0 transform overflow-hidden ${
                        idx === 0
                          ? '-translate-x-3 rotate-[-4deg] opacity-80'
                          : idx === 1
                          ? 'z-10 scale-105 shadow-xl ring-2 ring-white/50'
                          : 'translate-x-3 rotate-[4deg] opacity-80'
                      } transition-transform duration-300 group-hover:scale-100 group-hover:opacity-100`}
                    >
                      {/* Mini Speaker Notch */}
                      <div className="w-8 h-1 bg-[#333] rounded-full mx-auto mb-1 shrink-0" />
                      
                      {/* Screen with Real Image */}
                      <div className="relative w-full flex-1 rounded-[12px] overflow-hidden bg-white">
                        <Image
                          src={phone.image}
                          alt={phone.title}
                          fill
                          sizes="130px"
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-1 left-1.5 right-1.5 text-[8px] font-mono font-bold text-white uppercase tracking-wider truncate drop-shadow">
                          {phone.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Meta & Title */}
                <span className="text-xs font-mono font-medium text-[#5d5a55] block mb-1">
                  {group.count}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#161514] mb-2 leading-snug">
                  {group.title}
                </h3>
                <p className="text-xs font-sans text-[#5d5a55] leading-relaxed mb-4">
                  {group.examples}
                </p>
              </div>

              {/* Action Link Arrow */}
              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#161514]">
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
