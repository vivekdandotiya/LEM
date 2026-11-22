import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PricingSection } from '@/components/home/PricingSection';
import { Check, ShieldCheck, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing — Lead Edge Marketers',
  description:
    'Simple, transparent pricing from $249/month + GST. No large upfront build fees, no lock-in contract, cancel on 14 days notice.',
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingPage() {
  const addons = [
    {
      title: 'Google Business Profile Setup',
      price: '$199 one-off',
      description: 'Full profile optimization, category mapping, local service area targeting, and review link generation.',
    },
    {
      title: 'Ongoing Digital Marketing',
      price: 'From $449 / month',
      description: 'Google Ads management, SEO ranking optimization, and automated monthly conversion reporting.',
    },
    {
      title: 'Brand Logo & Style Kit',
      price: '$299 one-off',
      description: 'Vector logo redesign, typography rules, social profile graphics, and brand color palette.',
    },
  ];

  return (
    <main className="pt-28 pb-20 bg-white text-[#161514] select-none">
      {/* Embedded Main Pricing Section */}
      <PricingSection />

      {/* Add-ons Section */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#e8e6e2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#161514] tracking-tight mb-3">
              Optional add-ons when you need them.
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#5d5a55]">
              Everything you need for growth, quoted cleanly with no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <div
                key={addon.title}
                className="p-7 rounded-[26px] bg-white border border-[#e8e6e2] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-display font-extrabold text-lg text-[#161514] mb-1">
                    {addon.title}
                  </h4>
                  <span className="text-sm font-mono font-bold text-[#b45309] block mb-3">
                    {addon.price}
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-[#5d5a55] leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-[24px] bg-white border border-[#e8e6e2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#1f7a37] shrink-0" />
              <div>
                <h5 className="font-display font-bold text-base text-[#161514]">
                  Own your site after 12 months
                </h5>
                <p className="text-xs text-[#5d5a55]">
                  After 12 months, you can either keep the all-inclusive hosting & edits at $249/mo, or take all files and host yourself.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-6 py-2.5 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-sm shadow-sm"
            >
              Get a Free Blueprint
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
