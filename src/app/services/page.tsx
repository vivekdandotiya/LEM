import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CylinderGallery } from '@/components/shared/CylinderGallery';
import { CircleServiceRow } from '@/components/shared/CircleServiceRow';
import { Testimonials } from '@/components/shared/Testimonials';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services — Five Integrated Growth Disciplines',
  description:
    'Explore our 5 core disciplines: SEO, PPC Advertising, Social Media Marketing, Web Development, and Video & Photo Production.',
};

const SERVICES_DATA = [
  {
    index: 1,
    slug: 'seo',
    title: 'Search Engine Optimization',
    tagline: 'Topical Authority & Crawl Architecture',
    description:
      "We don't just rank websites. We build comprehensive topical entity maps, resolve technical crawl bottlenecks, and compound organic revenue visibility.",
    deliverables: [
      'Topical Entity Architecture',
      'Technical Core Vitals',
      'Crawl Path Optimization',
      'Editorial Authority Links',
      'Revenue Search Analytics',
    ],
    imageSrc: '/images/services/cylinder-strategy-session.webp',
    imageAlt: 'Lead Edge technical SEO strategy and analytics architecture',
    reversed: false,
  },
  {
    index: 2,
    slug: 'ppc',
    title: 'Pay-Per-Click Advertising',
    tagline: 'Precision Acquisition & Scale',
    description:
      "Stop wasting money on ads that don't convert. We engineer high-converting paid funnels across Google and Meta powered by algorithmic audience modeling and hook diversity.",
    deliverables: [
      'Creative Hook Diversity',
      'Algorithmic Bidding Models',
      'Multi-Variant Copy Testing',
      'First-Party Conversion API',
      'Transparent ROAS Attribution',
    ],
    imageSrc: '/images/hero/hero-04-stridefit-runner-4x5.webp',
    imageAlt: 'Targeted paid media creative',
    reversed: true,
  },
  {
    index: 3,
    slug: 'social-media',
    title: 'Social Media Marketing',
    tagline: 'Brand Reach & Community Growth',
    description:
      'Turn casual scrollers into loyal customers through structured content calendars, high-retention vertical video, and active community engagement.',
    deliverables: [
      'Editorial Content Calendars',
      'High-Retention Vertical Reels',
      'Distinct Visual Identity',
      'Proactive Community Care',
      'Organic Demand Capture',
    ],
    imageSrc: '/images/hero/hero-07-ember-roasters-coffee-4x5.webp',
    imageAlt: 'Warm editorial social media photography',
    reversed: false,
  },
  {
    index: 4,
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'Fast Load Times & Clear Conversion',
    description:
      'Custom, high-performance web applications built on Next.js. Built for sub-second load times, fluid device layouts, and clean conversion paths.',
    deliverables: [
      'Sub-Second Core Web Vitals',
      'Custom Next.js Architecture',
      'Fluid Multi-Device Layouts',
      'Zero Template Bloat',
      'High-Conversion Funnels',
    ],
    imageSrc: '/images/hero/hero-10-barkley-bites-dog-4x5.webp',
    imageAlt: 'Custom high-performance web development interface',
    reversed: true,
  },
  {
    index: 5,
    slug: 'video-photo',
    title: 'Video Editing & Photo Creation',
    tagline: 'Cinematic Storytelling & Visual Craft',
    description:
      'Full-service studio production delivering cinematic brand commercials, high-retention social reels, and high-resolution editorial product photography that commands attention.',
    deliverables: [
      'Cinematic Commercial Production',
      '9:16 High-Retention Reels',
      'Editorial Product Stills',
      'Precision Color Grading',
      'Multi-Platform Sound Design',
    ],
    imageSrc: '/images/services/video-photo/video-photo-hero.webp',
    imageAlt: 'Cinematic cinema camera setup with prime lens',
    reversed: false,
  },
];

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-[#F6F3EC] text-ink select-none">
      {/* 1. Split Hero with 3D Cylinder Gallery */}
      <section className="pt-28 sm:pt-36 pb-20 sm:pb-28 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: 3D Rotating Cylinder Gallery (6 cols) */}
            <div className="lg:col-span-6 flex justify-center">
              <CylinderGallery />
            </div>

            {/* Right: Headline & Statement (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-ink/10 text-xs font-mono uppercase tracking-widest text-stone mb-6 w-fit shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Our Five Disciplines</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ink tracking-tight leading-[0.96] mb-6">
                Five core services.{' '}
                <span className="font-serif italic font-normal text-gold-deep">
                  Zero fragmentation.
                </span>
              </h1>

              <p className="text-base sm:text-lg font-sans text-stone leading-relaxed mb-8 max-w-lg">
                Unified organic search, performance acquisition, custom web development, and video production under one roof.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#services-list"
                  className="btn-primary text-xs px-6 py-3 rounded-full font-semibold"
                >
                  View services ↓
                </a>
                <Link
                  href="/contact"
                  className="btn-secondary text-xs px-6 py-3 rounded-full font-semibold"
                >
                  Book a call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Five Circle Service Rows */}
      <section id="services-list" className="bg-[#F6F3EC]">
        {SERVICES_DATA.map((srv) => (
          <CircleServiceRow
            key={srv.slug}
            index={srv.index}
            slug={srv.slug}
            title={srv.title}
            tagline={srv.tagline}
            description={srv.description}
            deliverables={srv.deliverables}
            imageSrc={srv.imageSrc}
            imageAlt={srv.imageAlt}
            reversed={srv.reversed}
          />
        ))}
      </section>

      {/* 3. Testimonials (Client Reviews Slider) */}
      <Testimonials theme="light" />

      {/* 4. Final CTA Banner */}
      <section className="py-20 sm:py-28 bg-[#EFEBE2] border-t border-ink/10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-deep font-semibold block mb-3">
            START YOUR CAMPAIGN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight mb-4">
            Unite your growth channels today.
          </h2>
          <p className="text-sm sm:text-base font-sans text-stone max-w-lg mx-auto mb-8 leading-relaxed">
            Talk directly with our team to audit your existing media, search, and web funnels.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 text-xs px-7 py-3.5 rounded-full font-semibold group"
          >
            <span>Book a call</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
