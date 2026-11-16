import React from 'react';
import { HomeHero } from '@/components/hero/HomeHero';
import { WorkShowcase } from '@/components/home/WorkShowcase';
import { HomeServicesTeaser } from '@/components/home/HomeServicesTeaser';
import { Testimonials } from '@/components/shared/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#F6F3EC] text-ink">
      {/* 1. Hero Wall + Client Headline Pair */}
      <HomeHero />

      {/* 2. Work Showcase (8 Cards: 4 Photo + 4 Video + Lightbox) */}
      <WorkShowcase />

      {/* 3. Services Teaser (5 Circle Photos in Charcoal) */}
      <HomeServicesTeaser />

      {/* 4. Client Feedback Slider (Honest Sample Reviews) */}
      <Testimonials theme="light" />

      {/* 5. Frequently Asked Questions (7 Client Q&As Verbatim) */}
      <FAQSection />
    </main>
  );
}
