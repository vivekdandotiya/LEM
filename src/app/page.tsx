import React from 'react';
import type { Metadata } from 'next';
import { HomeHero } from '@/components/hero/HomeHero';
import { GlobalStudioClocksSection } from '@/components/home/GlobalStudioClocksSection';
import { HomeServicesCards } from '@/components/home/HomeServicesCards';
import { Testimonials } from '@/components/shared/Testimonials';
import { BrandTrustBar } from '@/components/home/BrandTrustBar';
import { FAQSection } from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: 'Lead Edge Marketing — Digital Growth Studio',
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

      {/* 2. Global Studio Clocks (Dedicated Section: London, Singapore, New York) */}
      <GlobalStudioClocksSection />

      {/* 3. Core Disciplines (6 Dark Cards Styled After Reference Photo 3) */}
      <HomeServicesCards />

      {/* 4. Client Feedback Slider (Authentic Portraits: UK, Nigeria, India) */}
      <Testimonials theme="light" />

      {/* 5. Brand Trust Bar (Partner Logos Styled After Reference Photo 2) */}
      <BrandTrustBar />

      {/* 6. Frequently Asked Questions (7 Client Q&As Verbatim) */}
      <FAQSection />
    </main>
  );
}
