import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { VideoHero } from '@/components/shared/VideoHero';
import { AboutTeamCards } from '@/components/about/AboutTeamCards';
import { Testimonials } from '@/components/shared/Testimonials';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Discipline & Conviction',
  description:
    'We engineer full-funnel digital momentum where search, creative, and code unite under one roof.',
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#F6F3EC] text-ink select-none">
      {/* 1. Full-Bleed Office Video Hero (100svh) */}
      <VideoHero
        videoBase="/videos/about/about-hero"
        posterSrc="/images/about/about-hero.webp"
        posterAlt="Lead Edge Agency Studio in natural daylight"
        heightClass="min-h-[100svh]"
        overlayClass="bg-charcoal/50"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-gold-soft mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>STUDIO MANIFESTO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[0.94] mb-6">
            Built on rigorous engineering and{' '}
            <span className="font-serif italic font-normal text-gold-soft">conviction.</span>
          </h1>

          <p className="text-base sm:text-xl font-sans text-stone max-w-2xl leading-relaxed mb-8">
            We engineer full-funnel digital momentum where search, creative, and code unite.
          </p>

          <a
            href="#our-description"
            className="btn-primary text-xs px-6 py-3 rounded-full font-semibold"
          >
            Explore Our Philosophy ↓
          </a>
        </div>
      </VideoHero>

      {/* 2. Our Description (2-Column Editorial Statement) */}
      <section id="our-description" className="py-24 sm:py-32 bg-[#F6F3EC] border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Big Editorial Statement */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                  01 / PHILOSOPHY
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight leading-[1.05] mb-6">
                Growth is not an accident of{' '}
                <span className="font-serif italic font-normal text-gold-deep">vanity metrics.</span>
              </h2>

              <p className="text-base sm:text-lg font-sans text-stone leading-relaxed mb-4">
                We believe durable market leadership is engineered through topical search authority, creative hook diversity, and high-conversion web infrastructure.
              </p>

              <p className="text-sm sm:text-base font-sans text-stone leading-relaxed">
                By housing search architects, performance media buyers, and full-stack software engineers in one room, we eliminate the friction between strategy and technical execution.
              </p>

              <div className="pt-8 flex items-center gap-6">
                <div>
                  <div className="font-display font-extrabold text-2xl text-ink">5</div>
                  <div className="font-mono text-xs text-stone uppercase tracking-wider">Disciplines</div>
                </div>
                <div className="w-px h-10 bg-ink/10" />
                <div>
                  <div className="font-display font-extrabold text-2xl text-ink">100%</div>
                  <div className="font-mono text-xs text-stone uppercase tracking-wider">Custom Code</div>
                </div>
                <div className="w-px h-10 bg-ink/10" />
                <div>
                  <div className="font-display font-extrabold text-2xl text-ink">Zero</div>
                  <div className="font-mono text-xs text-stone uppercase tracking-wider">Vanity Fluff</div>
                </div>
              </div>
            </div>

            {/* Right Column: Tall Editorial Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[28px] overflow-hidden bg-charcoal border border-ink/10 shadow-soft-lg">
                <Image
                  src="/images/about/about-team-table.webp"
                  alt="Lead Edge strategy table in natural light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-[18px] bg-white/90 backdrop-blur-md border border-ink/5">
                  <div className="text-[10px] font-mono uppercase text-stone tracking-wider">
                    Studio Working Method
                  </div>
                  <div className="text-xs font-display font-bold text-ink mt-0.5">
                    Cross-functional architecture session
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How Our Team Works (4 Photo Paper Cards) */}
      <AboutTeamCards />

      {/* 4. Testimonials (Client Reviews Slider) */}
      <Testimonials theme="dark" />

      {/* 5. Final CTA Banner */}
      <section className="py-20 sm:py-28 bg-[#EFEBE2] border-t border-ink/10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-gold-deep font-semibold block mb-3">
            NEXT STEPS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight mb-4">
            Ready to compound your digital momentum?
          </h2>
          <p className="text-sm sm:text-base font-sans text-stone max-w-lg mx-auto mb-8 leading-relaxed">
            Schedule a confidential technical audit and commercial strategy consultation.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 text-xs px-7 py-3.5 rounded-full font-semibold group"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
