import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { MarketingHeroSimulator } from '@/components/marketing/MarketingHeroSimulator';
import { MarketingRoasCalculator } from '@/components/marketing/MarketingRoasCalculator';
import { MarketingChannelPillars } from '@/components/marketing/MarketingChannelPillars';
import { MarketingFaqSection } from '@/components/marketing/MarketingFaqSection';

export const metadata: Metadata = {
  title: 'Small Business Marketing — Google Ads, Meta Paid Social & Local SEO | Lead Edge Marketers',
  description:
    'More of the right customers finding, choosing, and booking you. Transparent Google Ads STAG campaigns, Meta Paid Social Reels, Google Maps Local 3-Pack, and Server-Side CAPI tracking.',
  alternates: {
    canonical: '/marketing',
  },
};

export default function MarketingPage() {
  return (
    <main className="bg-white text-[#161514] select-none">
      {/* 1. Interactive Multi-Channel Simulator Hero (Matching Reference Screen with Dynamic Tabs) */}
      <MarketingHeroSimulator />

      {/* 2. Interactive Return on Ad Spend (ROAS) & Revenue Growth Calculator */}
      <MarketingRoasCalculator />

      {/* 3. The 4 Full-Funnel Acquisition Engines Breakdown */}
      <MarketingChannelPillars />

      {/* 4. Frequently Asked Questions */}
      <MarketingFaqSection />

      {/* 5. Bottom Strategy Consultation Blueprint Banner */}
      <section className="py-20 sm:py-28 bg-[#161514] text-white select-none relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-mono font-bold uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span>Free 15-Minute Strategy Review · Zero Obligation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.06] mb-4">
            Ready to capture more high-intent customers?
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#d9d6d1] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Send your current website address or Google Business profile. We audit your search presence, competitor ads, and booking friction, then present a tailored growth roadmap on a 15-minute call tomorrow.
          </p>

          <div className="max-w-md mx-auto mb-6">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-base transition-transform active:scale-95 shadow-lg"
            >
              <span>Book Your Free 15-Minute Strategy Call</span>
              <ArrowRight className="w-5 h-5 text-[#161514]" />
            </Link>
          </div>

          <p className="text-xs font-sans text-[#d1cec7] flex items-center justify-center gap-2">
            <span>Direct partner review · Confidential briefs transmitted to</span>
            <a
              href="mailto:hello@leadedge.agency"
              className="text-[#f7ac4f] hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>hello@leadedge.agency</span>
            </a>
          </p>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-72 h-72 rounded-full bg-[#f7ac4f]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-72 h-72 rounded-full bg-[#2563eb]/10 blur-3xl pointer-events-none" />
      </section>
    </main>
  );
}
