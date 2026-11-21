import React from 'react';
import type { Metadata } from 'next';
import { HomeHero } from '@/components/hero/HomeHero';
import { HomeServicesCards } from '@/components/home/HomeServicesCards';
import { DarkRebuildSection } from '@/components/home/DarkRebuildSection';
import { MarketingBreakdownSection } from '@/components/home/MarketingBreakdownSection';
import { PricingSection } from '@/components/home/PricingSection';
import { Testimonials } from '@/components/shared/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: 'Lead Edge Marketers — See your new homepage tomorrow. Built to get you booked.',
  description:
    'Custom small business websites built without generic templates. Free homepage rebuild mockup before you commit. From $249 a month + GST.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-[#161514]">
      {/* 1. Split Hero (URL Rebuild Form & Floating Device Showcase) */}
      <HomeHero />

      {/* 2. Find Your Kind of Business (4 Pastel Industry Group Cards with Phone Mockups) */}
      <HomeServicesCards />

      {/* 3. Obsidian Dark Section ("See your homepage rebuilt, free." with "Yours" Phone Collage) */}
      <DarkRebuildSection />

      {/* 4. Small Business Marketing (Google Search Mockup with 1, 2, 3, 4 Steps) */}
      <MarketingBreakdownSection />

      {/* 5. Simple, Transparent Monthly Pricing ($249/mo Inclusions vs Ongoing) */}
      <PricingSection />

      {/* 6. Honest Partnership Client Reviews (Auto-Sliding 5-Star Cards) */}
      <Testimonials theme="light" />

      {/* 7. Frequently Asked Questions */}
      <FAQSection />
    </main>
  );
}
