'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface IndustryGroup {
  id: string;
  count: string;
  title: string;
  examples: string;
  href: string;
  bgColor: string;
  borderColor: string;
  phones: {
    title: string;
    tag: string;
    theme: string;
  }[];
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
    phones: [
      { title: 'Hearing care without hard sell', tag: 'Audiology', theme: 'bg-emerald-950 text-white' },
      { title: 'Help at home across Camden', tag: 'Allied Care', theme: 'bg-[#FAF8F5] text-[#161514]' },
      { title: 'Straight teeth, your colours', tag: 'Orthodontics', theme: 'bg-white text-[#161514]' },
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
    phones: [
      { title: 'Wills & Estates fixed fee', tag: 'Legal', theme: 'bg-stone-900 text-white' },
      { title: 'Caught up, then kept up', tag: 'Bookkeeping', theme: 'bg-[#1b1c1e] text-white' },
      { title: 'Commercial lease advisory', tag: 'Property', theme: 'bg-amber-100/60 text-[#161514]' },
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
    phones: [
      { title: 'Ballet, Jazz, Contemporary', tag: 'Dance Studio', theme: 'bg-rose-950 text-white' },
      { title: 'Early learning in Marsden Park', tag: 'Childcare', theme: 'bg-[#FFFDF9] text-[#161514]' },
      { title: 'VCE & HSC selective tutoring', tag: 'Colleges', theme: 'bg-blue-950 text-white' },
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
    phones: [
      { title: 'The leak fixed agreed first', tag: 'Plumbing', theme: 'bg-white text-[#161514]' },
      { title: 'Stay in the street you love', tag: 'Builders', theme: 'bg-[#FAF7F2] text-[#161514]' },
      { title: 'Direct-to-consumer luxury', tag: 'E-Commerce', theme: 'bg-[#141517] text-white' },
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.08]">
              Find your kind of business.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#5d5a55] mt-3 max-w-2xl leading-relaxed">
              Small business websites for 71 industries, in four groups. Each has its own page, with an example built for it.
            </p>
          </div>
        </div>

        {/* 4 Large Rounded Pastel Cards (Matching Reference Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {INDUSTRY_GROUPS.map((group) => (
            <Link
              key={group.id}
              href={group.href}
              className={`group rounded-[28px] ${group.bgColor} border ${group.borderColor} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_36px_-8px_rgba(22,21,20,0.12)] hover:-translate-y-1`}
            >
              <div>
                {/* Embedded Mini Mobile Showcase Mockups */}
                <div aria-hidden="true" className="relative h-44 sm:h-48 mb-6 overflow-hidden rounded-[20px] bg-white/40 border border-black/5 p-3 flex items-center justify-center gap-2">
                  {group.phones.map((phone, idx) => (
                    <div
                      key={phone.title}
                      className={`w-28 sm:w-32 h-44 rounded-[18px] p-2.5 border border-black/10 shadow-sm flex flex-col justify-between shrink-0 transform ${
                        idx === 0
                          ? '-translate-x-3 rotate-[-4deg]'
                          : idx === 1
                          ? 'z-10 scale-105'
                          : 'translate-x-3 rotate-[4deg]'
                      } ${phone.theme} transition-transform duration-300 group-hover:scale-100`}
                    >
                      <div>
                        <span className="text-[8px] font-mono uppercase tracking-wider block mb-1 font-bold">
                          {phone.tag}
                        </span>
                        <h4 className="text-[10px] font-display font-bold leading-tight line-clamp-2">
                          {phone.title}
                        </h4>
                      </div>
                      <div className="h-1.5 w-8 rounded-full bg-current opacity-30 mt-auto" />
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
                <span>Explore websites</span>
                <ArrowRight className="w-4 h-4 text-[#f7ac4f] transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
