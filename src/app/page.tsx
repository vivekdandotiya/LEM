import React from 'react';
import type { Metadata } from 'next';
import { HomeHero } from '@/components/hero/HomeHero';
import { HomeServicesCards } from '@/components/home/HomeServicesCards';
import { DarkRebuildSection } from '@/components/home/DarkRebuildSection';
import { Testimonials } from '@/components/shared/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: 'Lead Edge Marketers — Full-Funnel Digital Marketing Agency | SEO, Meta Ads & Web',
  description:
    'Full-funnel digital marketing engineered to turn traffic into enterprise revenue. Search engine optimization, high-ROAS Meta & Google ads, and conversion web architecture. Free strategy blueprint.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-[#161514]">
      {/* 1. Split Hero (Clear Copywriting & 2-Column Floating Creative Showcase) */}
      <HomeHero />

      {/* 2. Industry Growth Specializations (4 Clean Pastel Cards) */}
      <HomeServicesCards />

      {/* 3. Obsidian Dark Section ("See your digital marketing roadmap, free.") */}
      <DarkRebuildSection />

      {/* 4. Honest Partnership Client Reviews (Auto-Sliding 5-Star Cards) */}
      <Testimonials theme="light" />

      {/* 5. Frequently Asked Questions */}
      <FAQSection />
    </main>
  );
}
