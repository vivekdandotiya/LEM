'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Target,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Cpu,
} from 'lucide-react';

interface ChannelPillar {
  tag: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metric: string;
  metricLabel: string;
  image: string;
  href: string;
}

const PILLARS: ChannelPillar[] = [
  {
    tag: 'PAID SEARCH & PPC',
    badgeColor: 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20',
    title: 'Google Ads & STAG Intent Engineering',
    subtitle: 'Capturing active buyers at the exact moment of search intent',
    description:
      'We segment search traffic into Single-Theme Ad Groups with daily negative keyword scrubbing. No wasted budget on generic queries — every ad dollar bids on users ready to book.',
    deliverables: [
      'Single-Theme Ad Group (STAG) Structure',
      'Daily Search Term Mining & Negative Harvesting',
      'Value-Based Bidding & Smart Target CPA',
      'Geo-Fenced Radius Bidding for Australian Suburbs',
    ],
    metric: '5.2x Verified ROAS',
    metricLabel: 'Average across client campaigns',
    image: '/images/services/meta-ads/meta-hero.webp',
    href: '/services/ppc/high-intent-search-campaigns',
  },
  {
    tag: 'PAID SOCIAL CREATIVE',
    badgeColor: 'bg-[#be185d]/10 text-[#be185d] border-[#be185d]/20',
    title: 'Meta & Instagram 10+ Weekly Hook Engine',
    subtitle: 'Scaling profitable customer acquisition through creative volume',
    description:
      'Creative diversity is the only lever left in modern paid social algorithms. We write, film, and deploy 10+ visual hooks, UGC angles, and problem-solution reels every single week.',
    deliverables: [
      '10+ Weekly 9:16 Vertical Video Creative Hooks',
      'UGC & Founder Story Production Scripting',
      'Dynamic Retargeting Funnels for Warm Audiences',
      'High-Converting Mobile Lead Intake Flows',
    ],
    metric: '+184% CVR Uplift',
    metricLabel: 'Over standard static image ads',
    image: '/images/services/meta-ads/meta-creative.webp',
    href: '/services/ppc/meta-ads-scaling',
  },
  {
    tag: 'LOCAL SEARCH DOMINANCE',
    badgeColor: 'bg-[#b45309]/10 text-[#b45309] border-[#b45309]/20',
    title: 'Google Business Profile & Map 3-Pack',
    subtitle: 'Conquering the 70% of local phone calls generated on mobile maps',
    description:
      'High proximity rank on Google Maps requires systematic local authority. We synchronize 50+ Australian business directories, optimize core categories, and drive 5-star review velocity.',
    deliverables: [
      '50+ Australian NAP Citation Network Sync',
      'Google Business Profile Attribute & Photo Optimization',
      'Geo-Targeted Suburb Landing Page Network',
      'Automated 5-Star SMS Review Intake Pipeline',
    ],
    metric: '#1 Map 3-Pack',
    metricLabel: 'Proximity rank across local radius',
    image: '/images/screens/plumber/poster-480.webp',
    href: '/services/seo/local-3-pack-dominance',
  },
  {
    tag: 'ORGANIC SEARCH & AI',
    badgeColor: 'bg-[#1f7a37]/10 text-[#1f7a37] border-[#1f7a37]/20',
    title: 'Topical Authority SEO & AI Overview Rank',
    subtitle: 'Owning long-term organic search equity and generative AI answers',
    description:
      'Modern search engines reward topical depth, not generic keywords. We structure comprehensive semantic ontologies, build internal linking graphs, and prepare your brand for AI search engines.',
    deliverables: [
      'Topical Keyword Taxonomy & Semantic Clustering',
      'Next.js 15 Sub-Second Core Web Vitals (0.4s TTFB)',
      'Perplexity & Google AI Overview Entity Optimization',
      'High-Tier Australian Digital PR & Editorial Links',
    ],
    metric: '+312% Organic Search',
    metricLabel: 'Non-brand commercial search growth',
    image: '/images/services/seo/seo-hero.webp',
    href: '/services/seo/keyword-taxonomy-mapping',
  },
];

export function MarketingChannelPillars() {
  return (
    <section className="py-20 sm:py-32 bg-[#FAF8F5] text-[#161514] select-none border-b border-[#e8e6e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              The 4 Core Acquisition Engines
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.06] mb-4">
            Built to capture every stage of buyer intent.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed">
            From the moment someone realizes a problem on social media to when they search on Google with credit card in hand — our 4 engines work together to convert them.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              className="p-8 sm:p-10 rounded-[32px] bg-white border border-[#e8e6e2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Media Preview */}
                <div className="relative w-full h-48 rounded-[24px] overflow-hidden mb-6 bg-[#161514] border border-black/5">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Metric Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <span className="text-lg sm:text-xl font-display font-black text-[#f7ac4f] block leading-none">
                        {pillar.metric}
                      </span>
                      <span className="text-[11px] font-sans text-white/80">
                        {pillar.metricLabel}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border bg-white/10 text-white backdrop-blur-md`}
                    >
                      {pillar.tag}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-display font-extrabold text-[#161514] mb-2 leading-tight">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#b45309] font-semibold mb-3">
                  {pillar.subtitle}
                </p>
                <p className="font-sans text-sm text-[#5d5a55] leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-8 pt-4 border-t border-[#e8e6e2]">
                  {pillar.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-sans text-[#161514]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1f7a37] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link CTA */}
              <Link
                href={pillar.href}
                className="w-full inline-flex items-center justify-between p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#161514] text-[#161514] hover:text-white font-sans font-bold text-xs sm:text-sm transition-all group border border-[#e8e6e2]"
              >
                <span>Explore Technical Deliverables</span>
                <ArrowRight className="w-4 h-4 text-[#f7ac4f] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
