'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroWall } from './HeroWall';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';
import { Magnetic } from '@/motion/Magnetic';
import { HERO_DATA } from '@/data/hero';
import { Pause, Play } from 'lucide-react';
import { InkDripText } from '@/motion/InkDrip';

gsap.registerPlugin(ScrollTrigger);

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const swashRef = useRef<SVGPathElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const activeHeadlines = HERO_DATA.headlines.filter((h) => h.enabled);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animate swash on index change or mount
  useEffect(() => {
    const swash = swashRef.current;
    if (!swash) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const len = swash.getTotalLength ? swash.getTotalLength() : 300;
    gsap.fromTo(
      swash,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 1.0, delay: 0.15, ease: 'power3.out' }
    );
  }, [currentIndex]);

  const nextHeadline = useCallback(() => {
    if (activeHeadlines.length <= 1) return;
    const headline = headlineRef.current;
    if (!headline) {
      setCurrentIndex((prev) => (prev + 1) % activeHeadlines.length);
      return;
    }

    gsap.to(headline, {
      opacity: 0,
      y: -18,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % activeHeadlines.length);
        gsap.fromTo(
          headline,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
        );
      },
    });
  }, [activeHeadlines.length]);

  // 6-second rotation timer (WCAG 2.2.2 pause on hover/focus/button)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused || isHovered || activeHeadlines.length <= 1) return;

    const interval = setInterval(() => {
      nextHeadline();
    }, HERO_DATA.intervalMs || 6000);

    return () => clearInterval(interval);
  }, [isPaused, isHovered, nextHeadline, activeHeadlines.length]);

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
            opacity: 1 - p * 1.2,
            y: p * 80,
          });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const scrollToNext = () => {
    const nextSec = document.getElementById('what-we-do');
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentHeadline = activeHeadlines[currentIndex] || activeHeadlines[0];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-ink text-white border-b-[6px] border-lime select-none dark-dots"
      data-theme="dark"
    >
      {/* 1. Endless Scrolling Wall of Ad Creative Cards */}
      <HeroWall />

      {/* 2. Legibility Veil over Wall */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(ellipse 65% 60% at 50% 46%, rgba(8,10,11,0.90) 0%, rgba(8,10,11,0.68) 55%, rgba(8,10,11,0.42) 100%),
            linear-gradient(180deg, rgba(8,10,11,0.65) 0%, transparent 25%, transparent 75%, rgba(8,10,11,0.85) 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Spacer for Floating Navbar */}
      <div className="h-28 sm:h-32 pointer-events-none" />

      {/* 3. Hero Centred Foreground */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center py-8 my-auto"
      >
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-charcoal/90 border border-white/15 text-xs font-mono tracking-widest uppercase text-white/90 mb-6 shadow-sm">
          <SparkleGlyph size={14} spin={true} />
          <span>{HERO_DATA.eyebrow}</span>
        </div>

        {/* H1 Display with 6-second rotating headline pair */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          className="relative max-w-5xl mb-6"
        >
          <h1
            ref={headlineRef}
            aria-live="polite"
            className="text-[clamp(2.75rem,8.5vw,7.8rem)] font-display font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-white"
          >
            <InkDripText text={currentHeadline.prefix} color="#F6F3EC" maxDrips={1} />{' '}
            <span className="relative inline-block font-serif lowercase italic text-[#D9C29A] font-normal tracking-normal mx-1">
              {currentHeadline.italicWord}
              {/* Hand-drawn swash underline in gold */}
              <svg
                viewBox="0 0 280 24"
                fill="none"
                className="absolute -bottom-3 left-0 w-full text-[#B08D57] pointer-events-none"
                aria-hidden="true"
              >
                <path
                  ref={swashRef}
                  d="M4 14C60 6 160 4 274 18"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Accessible Rotation Controls (WCAG 2.2.2) */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
              0{currentIndex + 1} / 0{activeHeadlines.length}
            </span>
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume rotating headlines' : 'Pause rotating headlines'}
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-lime transition-colors"
            >
              {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            </button>
          </div>
        </div>

        {/* Support line */}
        <p className="font-sans text-base sm:text-xl text-warmgray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {HERO_DATA.subheadline}
        </p>

        {/* CTA Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Magnetic strength={0.25}>
            <Link
              href="/contact"
              className="btn-primary"
            >
              Start a project →
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="#concept-work"
              className="btn-secondary-white"
            >
              See the work
            </a>
          </Magnetic>
        </div>
      </div>

      {/* 4. Hero Bottom Row: Honesty Line & Smooth Scroll Sparkle Button */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 pb-6 flex items-center justify-between text-left">
        <div className="hidden sm:block w-14" />

        <p className="font-mono text-[11px] uppercase tracking-wider text-white/60 text-center mx-auto">
          Concept creatives shown for illustration.
        </p>

        <button
          onClick={scrollToNext}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-charcoal/90 hover:bg-charcoal border border-white/20 flex items-center justify-center text-lime transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          aria-label="Scroll to next section"
        >
          <SparkleGlyph size={22} spin={true} />
        </button>
      </div>
    </section>
  );
}
