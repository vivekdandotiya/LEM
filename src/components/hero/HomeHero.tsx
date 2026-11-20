'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroStudioBackground } from './HeroStudioBackground';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';
import { Magnetic } from '@/motion/Magnetic';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const swashRef = useRef<SVGPathElement>(null);

  // Animate gold swash underline on mount
  useEffect(() => {
    const swash = swashRef.current;
    if (!swash) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const len = swash.getTotalLength ? swash.getTotalLength() : 300;
    gsap.fromTo(
      swash,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 1.1, delay: 0.2, ease: 'power3.out' }
    );
  }, []);

  // ScrollTrigger parallax
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (content) {
          gsap.set(content, {
            opacity: 1 - p * 1.3,
            y: p * 70,
          });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const scrollToNext = () => {
    const nextSec = document.getElementById('services-grid') || document.getElementById('what-we-do');
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[96svh] sm:min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#08090C] text-white border-b border-white/10 select-none"
      data-theme="dark"
      data-surface="dark"
    >
      {/* 1. Ultra-Premium Studio Ambient Background (Replacing Image Gallery) */}
      <HeroStudioBackground />

      {/* Spacer for Floating Navbar */}
      <div className="h-28 sm:h-32 pointer-events-none" />

      {/* 2. Hero Centered Foreground: Short, Punchy, High-Impact Typography */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center py-6 sm:py-10 my-auto"
      >
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/15 text-xs font-mono tracking-widest uppercase text-[#F6F3EC] mb-6 shadow-md">
          <SparkleGlyph size={13} spin={true} />
          <span>DIGITAL GROWTH STUDIO • SEARCH • MEDIA • WEB</span>
        </div>

        {/* Short, Punchy, High-Contrast Headline */}
        <div className="relative max-w-4xl mx-auto mb-6 px-2">
          <h1
            className="text-[clamp(2.35rem,6.8vw,4.75rem)] font-display font-extrabold uppercase leading-[1.04] sm:leading-[0.98] tracking-tight sm:tracking-[-0.03em] text-[#F6F3EC]"
          >
            WE SCALE{' '}
            <span className="relative inline-block font-serif lowercase italic text-[#D9C29A] font-normal tracking-normal mx-1">
              revenue.
              {/* Hand-drawn swash underline in gold */}
              <svg
                viewBox="0 0 280 24"
                fill="none"
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full text-[#B08D57] pointer-events-none"
                aria-hidden="true"
              >
                <path
                  ref={swashRef}
                  d="M4 14C60 6 160 4 274 18"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Short, Concise, Crystal-Clear Subheadline */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#F6F3EC] max-w-xl mx-auto mb-10 leading-relaxed font-normal opacity-95">
          Full-funnel digital marketing engineered to turn traffic into enterprise revenue.
        </p>

        {/* CTA Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Magnetic strength={0.25}>
            <Link
              href="/contact"
              className="btn-primary"
            >
              Book Strategy Call →
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              onClick={scrollToNext}
              className="btn-secondary"
            >
              Explore Our Work
            </button>
          </Magnetic>
        </div>
      </div>

      {/* 3. Hero Bottom Area: Active Desks & Smooth Scroll */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 pb-6 pt-2 flex items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#D6D3D1] font-medium">
            Active Desks: London · Singapore · New York
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToNext}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-md border border-white/20 text-[#D9C29A] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Scroll to services"
          >
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90 group-hover:text-gold transition-colors">
              Scroll
            </span>
            <SparkleGlyph size={16} spin={true} />
          </button>
        </div>
      </div>
    </section>
  );
}
