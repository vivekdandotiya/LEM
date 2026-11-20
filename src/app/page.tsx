import React from 'react';
import type { Metadata } from 'next';
import { HomeHero } from '@/components/hero/HomeHero';
import { HomeServicesCards } from '@/components/home/HomeServicesCards';
import { Testimonials } from '@/components/shared/Testimonials';
import { BrandTrustBar } from '@/components/home/BrandTrustBar';
import { FAQSection } from '@/components/home/FAQSection';
import { ConversionCTA } from '@/components/home/ConversionCTA';

export const metadata: Metadata = {
  title: 'Lead Edge Marketers — Digital Growth Studio',
  description:
    'Full-funnel digital growth unifying organic search, performance media, and custom web architecture.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#F6F3EC] text-ink">
      {/* 1. Hero Wall (Endless Slow-Moving Drift) + Client Headline Pair */}
      <HomeHero />

      {/* 2. Core Disciplines (6 Dark Cards Styled After Reference) */}
      <HomeServicesCards />

      {/* 3. Client Feedback Slider (Authentic Portraits: UK, Nigeria, India) */}
      <Testimonials theme="light" />

      {/* 4. Brand Trust Bar (Partner Logos) */}
      <BrandTrustBar />

      {/* 5. Frequently Asked Questions (Client Q&As Verbatim) */}
      <FAQSection />

      {/* 6. High-Conversion Growth Strategy Call CTA */}
      <ConversionCTA />
    </main>
  );
}
