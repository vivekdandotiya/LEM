'use client';

import React from 'react';
import Link from 'next/link';
import {
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Zap,
  HelpCircle,
} from 'lucide-react';

interface PricingTier {
  name: string;
  badge?: string;
  isPopular?: boolean;
  price: string;
  period: string;
  subtitle: string;
  targetAudience: string;
  features: string[];
  ctaText: string;
}

const TIERS: PricingTier[] = [
  {
    name: 'Local Dominance Engine',
    price: '$449',
    period: '/ mo + GST',
    subtitle: 'High-intent local Google search and map pack conquest',
    targetAudience: 'Single-location trades, allied health & local service businesses',
    features: [
      'Google Ads STAG Search Intent Campaign Management',
      'Google Business Profile & Map 3-Pack Optimization',
      '50+ Australian NAP Citation Network Directory Sync',
      '1 Next.js 15 High-Speed Conversion Landing Page',
      'Monthly Strategy & ROI Review Call',
      '0% Markup on Ad Spend (Pay Google Directly)',
      '100% Account Ownership Retained by You',
    ],
    ctaText: 'Start with Local Engine',
  },
  {
    name: 'Full-Funnel Scale',
    badge: 'MOST POPULAR',
    isPopular: true,
    price: '$899',
    period: '/ mo + GST',
    subtitle: 'Paid Social + Google Ads + Next.js Web Stack + CAPI',
    targetAudience: 'Growing businesses ready to scale inquiries across multiple channels',
    features: [
      'Meta Paid Social (Instagram & Facebook Reels / Feeds)',
      'Google Ads Search & YouTube Retargeting Campaigns',
      '5+ Weekly 9:16 Vertical Video Creative Hooks Scripted & Edited',
      'Complete Next.js 15 Custom Web Architecture (0.4s load speed)',
      'Server-Side CAPI (First-Party 9.8/10 Conversion Match Quality)',
      'Live 24/7 Looker Studio Attribution Dashboard',
      'Bi-Weekly Strategic Creative & Bidding Iteration Sprints',
      'Zero Lock-In Contract (Month-to-Month Terms)',
    ],
    ctaText: 'Scale Full-Funnel Now',
  },
  {
    name: 'Omnichannel Monopoly',
    price: '$1,499',
    period: '/ mo + GST',
    subtitle: 'Full-spectrum SEO, Paid Media, 4K Cinema Video & Dedicated Growth Director',
    targetAudience: 'High-growth multi-location or enterprise brands conquering Australia',
    features: [
      'Full-Spectrum Organic Search (Topical Authority & AI Overviews)',
      'Aggressive Google Ads & Meta Scaling (No Spend Limit Caps)',
      '10+ Weekly Multi-Format Creative Hooks & Motion Graphics',
      'Quarterly On-Location 4K Cinema Camera Filming & Studio Editing',
      'Bespoke Next.js 15 Multi-Page Web App with Custom CRM Integrations',
      'Dedicated Senior Growth Director with Direct Slack Access',
      'Weekly Executive Performance & Attribution Reviews',
      'Complete Intellectual Property & Code Ownership',
    ],
    ctaText: 'Partner with Growth Director',
  },
];

export function MarketingPricingPlans() {
  return (
    <section className="py-20 sm:py-32 bg-white text-[#161514] select-none border-b border-[#e8e6e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              Transparent Retainer Pricing
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.06] mb-4">
            You pay Google & Meta directly. We never take a cut.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed">
            Most agencies mark up your ad spend or hide management fees inside bundled invoices. With Lead Edge, your card connects directly to Google and Meta with clear flat monthly retainers.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier, i) => (
            <div
              key={i}
              className={`rounded-[32px] p-8 sm:p-10 flex flex-col justify-between border transition-all relative ${
                tier.isPopular
                  ? 'bg-[#161514] text-white border-[#161514] shadow-2xl lg:-translate-y-2'
                  : 'bg-[#FAF8F5] text-[#161514] border-[#e8e6e2] shadow-sm hover:border-[#161514]/30'
              }`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#f7ac4f] text-[#161514] font-mono text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                {/* Name */}
                <h3
                  className={`text-xl sm:text-2xl font-display font-extrabold mb-1 ${
                    tier.isPopular ? 'text-white' : 'text-[#161514]'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-xs font-sans mb-6 ${
                    tier.isPopular ? 'text-[#d9d6d1]' : 'text-[#5d5a55]'
                  }`}
                >
                  {tier.subtitle}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-current/10">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl sm:text-5xl font-display font-black ${
                        tier.isPopular ? 'text-[#f7ac4f]' : 'text-[#161514]'
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        tier.isPopular ? 'text-white/70' : 'text-[#5d5a55]'
                      }`}
                    >
                      {tier.period}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-sans block mt-1 ${
                      tier.isPopular ? 'text-white/60' : 'text-[#787570]'
                    }`}
                  >
                    {tier.targetAudience}
                  </span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.isPopular ? 'text-[#f7ac4f]' : 'text-[#1f7a37]'
                        }`}
                      />
                      <span
                        className={
                          tier.isPopular ? 'text-white/90' : 'text-[#161514]'
                        }
                      >
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href="/contact"
                  className={`w-full py-4 rounded-full font-sans font-bold text-sm text-center block transition-transform active:scale-95 shadow-md ${
                    tier.isPopular
                      ? 'bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514]'
                      : 'bg-[#161514] hover:bg-black text-white'
                  }`}
                >
                  {tier.ctaText}
                </Link>
                <div className="mt-3 text-center">
                  <span
                    className={`text-[11px] font-mono flex items-center justify-center gap-1 ${
                      tier.isPopular ? 'text-white/60' : 'text-[#787570]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1f7a37]" />
                    <span>No lock-in contract · Cancel anytime</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
