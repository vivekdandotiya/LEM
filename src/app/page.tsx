import React from 'react';
import { HomeHero } from '@/components/hero/HomeHero';
import { HomeServicesCards } from '@/components/home/HomeServicesCards';
import { Testimonials } from '@/components/shared/Testimonials';
import { BrandTrustBar } from '@/components/home/BrandTrustBar';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#F6F3EC] text-ink">
      {/* 1. Hero Wall (Endless Slow-Moving Drift) + Client Headline Pair */}
      <HomeHero />

      {/* 2. Core Disciplines (6 Dark Cards Styled After Reference Photo 3) */}
      <HomeServicesCards />

      {/* 3. Client Feedback Slider (Authentic Portraits: UK, Nigeria, India) */}
      <Testimonials theme="light" />

      {/* 4. Brand Trust Bar (Partner Logos Styled After Reference Photo 2) */}
      <BrandTrustBar />

      {/* 5. Frequently Asked Questions (7 Client Q&As Verbatim) */}
      <FAQSection />
    </main>
  );
}
