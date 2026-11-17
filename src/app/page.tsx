import React from 'react';
import { HomeHero } from '@/components/hero/HomeHero';
import { HomeServicesCards } from '@/components/home/HomeServicesCards';
import { Testimonials } from '@/components/shared/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#F6F3EC] text-ink">
      {/* 1. Hero Wall (Slow-moving endless cards) + Client Headline Pair */}
      <HomeHero />

      {/* 2. Core Disciplines (6 Dark Cards Styled After Reference Photo) */}
      <HomeServicesCards />

      {/* 3. Client Feedback Slider (Honest Sample Reviews) */}
      <Testimonials theme="light" />

      {/* 4. Frequently Asked Questions (7 Client Q&As Verbatim) */}
      <FAQSection />
    </main>
  );
}
