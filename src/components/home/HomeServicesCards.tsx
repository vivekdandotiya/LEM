'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

interface ServiceCardData {
  id: string;
  badgeTag: string;
  title: string;
  serviceType: string;
  examples: string;
  href: string;
  bgColor: string;
  borderColor: string;
  badge: {
    label: string;
    icon: React.ReactNode;
  };
  visual: {
    title: string;
    tag: string;
    image: string;
  };
}

const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: 'seo',
    badgeTag: 'Search Visibility',
    title: 'Search Engine Optimization',
    serviceType: 'On-Page, Off-Page, Local & Technical AI SEO',
    examples: 'Dental, Physio, Medical, Legal & Local Practices.',
    href: '/services/seo',
    bgColor: 'bg-[#EAF1ED]',
    borderColor: 'border-[#D2E2D8]',
    badge: {
      label: '+42% Organic Growth',
      icon: <TrendingUp className="w-3 h-3 text-[#1f7a37]" />,
    },
    visual: {
      title: 'Google Search & Maps Ranking',
      tag: 'Rank #1 · Google & AI Overviews',
      image: '/images/home/service-seo.webp',
    },
  },
  {
    id: 'ppc',
    badgeTag: 'Paid Acquisition',
    title: 'Meta & Google Paid Ads',
    serviceType: 'High-ROAS Facebook, Instagram & Search Campaigns',
    examples: 'Accountants, Law firms, SaaS & E-commerce.',
    href: '/services/ppc',
    bgColor: 'bg-[#F4F1EA]',
    borderColor: 'border-[#E2DDD1]',
    badge: {
      label: '4.8x ROAS Average',
      icon: <Sparkles className="w-3 h-3 text-[#b45309]" />,
    },
    visual: {
      title: 'High-Intent Ad Funnels',
      tag: 'Meta Ads · CAPI Tracking · Scaled ROAS',
      image: '/images/home/service-meta.webp',
    },
  },
  {
    id: 'social',
    badgeTag: 'Brand & Content',
    title: 'Social Media Management',
    serviceType: 'Active Content, Visual Creative & Community Care',
    examples: 'Childcare, Tuition, Hospitality & Lifestyle Brands.',
    href: '/services/social-media',
    bgColor: 'bg-[#F8EDED]',
    borderColor: 'border-[#EED4D4]',
    badge: {
      label: 'Zero Inbound Left Unanswered',
      icon: <ShieldCheck className="w-3 h-3 text-rose-700" />,
    },
    visual: {
      title: 'Curated Social Feeds',
      tag: 'Consistent Posts · Lead DM Routing',
      image: '/images/home/service-social.webp',
    },
  },
  {
    id: 'web',
    badgeTag: 'Conversion Engines',
    title: 'Web Architecture & CRO',
    serviceType: 'Sub-Second Next.js 15 Websites & Booking Funnels',
    examples: 'Builders, Trades, Commercial Contractors & DTC.',
    href: '/services/web-development',
    bgColor: 'bg-[#FCF4EA]',
    borderColor: 'border-[#F3DEC4]',
    badge: {
      label: '100 Speed Score · High Conversion',
      icon: <Zap className="w-3 h-3 text-amber-700" />,
    },
    visual: {
      title: 'Next.js 15 High-Speed Platform',
      tag: 'Sub-Second Load · Engineered to Convert',
      image: '/images/home/service-web.webp',
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
              Integrated Digital Marketing Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.08]">
              Full-funnel digital marketing engineered for growth.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#5d5a55] mt-3 max-w-2xl leading-relaxed">
              Targeted search engine optimization, high-ROAS Meta and Google ad campaigns, dedicated social media management, and conversion-focused web architecture.
            </p>
          </div>
        </div>

        {/* 4 Clean Editorial Cards (Zero Phone Bezels, Authentic Campaign Photography) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {SERVICE_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={`group rounded-[32px] ${card.bgColor} border ${card.borderColor} p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(22,21,20,0.15)] hover:-translate-y-1.5`}
            >
              <div>
                {/* Metric Badge at Top of Card */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#5d5a55] uppercase tracking-wider">
                    {card.badgeTag}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-white/95 border border-black/10 shadow-xs flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#161514] backdrop-blur-sm">
                    {card.badge.icon}
                    <span>{card.badge.label}</span>
                  </div>
                </div>

                {/* Clean, Frameless Editorial Visual Canvas (NO PHONE HARDWARE / NO BLACK BEZEL) */}
                <div
                  aria-hidden="true"
                  className="relative aspect-[4/3] w-full mb-6 rounded-[20px] overflow-hidden bg-white/80 border border-black/10 shadow-sm group-hover:shadow-md transition-all duration-300"
                >
                  <Image
                    src={card.visual.image}
                    alt={card.visual.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Clean Glass Tag Strip at Bottom */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold text-white tracking-wide truncate">
                      {card.visual.tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f7ac4f] shrink-0" />
                  </div>
                </div>

                {/* Card Meta & Title */}
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#161514] mb-1.5 leading-snug group-hover:text-[#b45309] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#b45309] uppercase tracking-wider mb-2">
                  {card.serviceType}
                </p>
                <p className="text-xs sm:text-sm font-sans text-[#5d5a55] leading-relaxed mb-4">
                  {card.examples}
                </p>
              </div>

              {/* Action Link Arrow */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs sm:text-sm font-bold text-[#161514]">
                <span>Explore service</span>
                <ArrowRight className="w-4 h-4 text-[#b45309] transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
