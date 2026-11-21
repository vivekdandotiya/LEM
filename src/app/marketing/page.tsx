import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MarketingBreakdownSection } from '@/components/home/MarketingBreakdownSection';
import { Search, MapPin, BarChart3, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Small Business Marketing — Lead Edge Marketers',
  description:
    'More of the right customers finding you. Transparent Google Ads, Google Business Profile, SEO, and AI Search for Australian small businesses.',
  alternates: {
    canonical: '/marketing',
  },
};

export default function MarketingPage() {
  return (
    <main className="pt-28 pb-20 bg-white text-[#161514] select-none">
      {/* Interactive Marketing Breakdown Section */}
      <MarketingBreakdownSection />

      {/* Transparent Ad Spend Policy */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#e8e6e2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider bg-[#f7ac4f]/15 px-3 py-1 rounded-full inline-block mb-3">
                Transparent Ad Spend
              </span>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#161514] tracking-tight leading-tight mb-4">
                You pay Google directly. We never take a cut of ad spend.
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#5d5a55] leading-relaxed mb-4">
                Many agencies mark up ad spend or hide management fees inside bundled invoices. With Lead Edge, your credit card is linked directly to Google, and you pay a clear flat fee for our strategy and management.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#161514] font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#1f7a37]">✓</span> 100% account ownership remains yours
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1f7a37]">✓</span> Real-time live dashboard tracking calls & bookings
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#1f7a37]">✓</span> Monthly review calls with actionable suggestions
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-[32px] bg-[#FAF8F5] border border-[#e8e6e2] text-center">
              <span className="text-xs font-mono text-[#5d5a55] uppercase block mb-1">
                Digital Marketing Plans
              </span>
              <div className="text-4xl font-display font-black text-[#161514] mb-2">
                From $449
                <span className="text-sm font-sans font-normal text-[#5d5a55]"> / mo + GST</span>
              </div>
              <p className="text-xs text-[#5d5a55] mb-6">
                Tailored based on your target service area and competitive density.
              </p>

              <Link
                href="/contact"
                className="w-full py-3.5 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-bold text-sm block shadow-sm active:scale-95 transition-all"
              >
                Book a 15-Minute Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
