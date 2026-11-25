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
    title: 'Google Ads & Search Campaigns',
    subtitle: 'Capturing buyers at the exact moment they search for your service',
    description:
      'We place your business at the top of Google searches. Every dollar targets customers actively seeking your solution with high purchase intent.',
    deliverables: [
      'Targeted Search Campaign Architecture',
      'Daily Search Term Review & Negative Keyword Scrubbing',
      'Location-Specific Radius Targeting for Australian Suburbs',
      'Transparent Weekly Reporting & Cost-Per-Lead Tracking',
    ],
    metric: '5.2x Verified ROAS',
    metricLabel: 'Average across client campaigns',
    image: '/images/services/meta-ads/meta-hero.webp',
    href: '/services/ppc/campaign-strategy',
  },
  {
    tag: 'PAID SOCIAL CREATIVE',
    badgeColor: 'bg-[#be185d]/10 text-[#be185d] border-[#be185d]/20',
    title: 'Facebook & Instagram Paid Ads',
    subtitle: 'Scaling customer inquiries with high-performing video and image ads',
    description:
      'We write, film, and test fresh video hooks and copy variations every single week so your audience never gets tired of seeing your brand.',
    deliverables: [
      'Weekly Vertical Video Creative & Image Ad Variations',
      'Audience Retargeting to Win Back Past Website Visitors',
      'Frictionless Mobile Lead Forms & Booking Pathways',
      'Server-Side Tracking Setup for 100% Attribution Accuracy',
    ],
    metric: '+184% Conversion Uplift',
    metricLabel: 'Over standard static image ads',
    image: '/images/services/meta-ads/meta-creative.webp',
    href: '/services/ppc/ad-creative-copy',
  },
  {
    tag: 'LOCAL SEARCH DOMINANCE',
    badgeColor: 'bg-[#b45309]/10 text-[#b45309] border-[#b45309]/20',
    title: 'Google Business Profile & Map 3-Pack',
    subtitle: 'Winning the 70% of local customer calls that start on Google Maps',
    description:
      'When nearby customers search for what you offer, we make sure your business ranks in the top 3 Google Map spots so they call you first.',
    deliverables: [
      'Complete Google Business Profile Setup & Optimization',
      'Accurate Directory Citations Across Australia',
      'Regular Posts, Photos & Service Updates on Google Profile',
      '5-Star Customer Review Generation Strategies',
    ],
    metric: '#1 Map 3-Pack',
    metricLabel: 'Proximity rank across local radius',
    image: '/images/screens/plumber/poster-480.webp',
    href: '/services/seo/local-seo',
  },
  {
    tag: 'ORGANIC SEARCH & AI',
    badgeColor: 'bg-[#1f7a37]/10 text-[#1f7a37] border-[#1f7a37]/20',
    title: 'Organic Search Engine Optimization (SEO)',
    subtitle: 'Building long-term organic rankings and AI search visibility',
    description:
      'We optimize your website content, headings, and authority so Google and AI tools like ChatGPT and Perplexity recommend your business at the top.',
    deliverables: [
      'Comprehensive High-Intent Keyword Strategy',
      'Clear, Helpful Page Content & Engaging Headlines',
      'Faster Mobile Load Speeds & Technical Clean-Up',
      'High-Authority Industry Backlinks & Media Placements',
    ],
    metric: '+312% Organic Growth',
    metricLabel: 'Inbound customer search growth',
    image: '/images/services/seo/seo-hero.webp',
    href: '/services/seo/on-page-seo',
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
