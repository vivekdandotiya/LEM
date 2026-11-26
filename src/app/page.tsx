import React from 'react';
import type { Metadata } from 'next';
import { HomeHero } from '@/components/hero/HomeHero';
import { HomeServicesCards } from '@/components/home/HomeServicesCards';
import { Testimonials } from '@/components/shared/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: 'Lead Edge Marketers — Full-Service Digital Marketing Agency | SEO, Ads & Web',
  description:
    'Simple, high-impact digital marketing. We help businesses get found on Google, run profitable Facebook and Instagram ads, and build websites that convert visitors into customers.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-[#161514]">
      {/* 1. Split Hero (Simple Copywriting & URL Blueprint Bar) */}
      <HomeHero />

      {/* 2. "Let's build something great" - 6 Dark Cards Grid (Exact Match to Reference Images) */}
      <HomeServicesCards />

      {/* 3. Honest Client Reviews & Feedback */}
      <Testimonials theme="light" />

      {/* 4. Frequently Asked Questions (Clear & Simple Answers) */}
      <FAQSection />
    </main>
  );
}
