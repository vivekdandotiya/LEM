'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Magnetic } from '@/motion/Magnetic';
import ScrollMarquee from '@/motion/ScrollMarquee';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const headline = headlineRef.current;
    if (!container || !headline) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) {
      return;
    }

    const letters = headline.querySelectorAll<HTMLSpanElement>('.prox-char');
    if (!letters.length) return;

    // Pre-calculate centers
    const setters = Array.from(letters).map((letter) => ({
      el: letter,
      setWght: gsap.quickSetter(letter, 'fontVariationSettings'),
    }));

    const onPointerMove = (e: PointerEvent) => {
      const px = e.clientX;
      const py = e.clientY;

      setters.forEach(({ el, setWght }) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(px - cx, py - cy);

        // Map distance (0 to 350px) to font weight (800 near, 300 far)
        const factor = Math.max(0, 1 - dist / 350);
        const wght = Math.round(300 + factor * 500);
        setWght(`'wght' ${wght}, 'wdth' 85`);
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  const headlineText = 'READY TO MOVE?';
  const marqueeWords = [
    'START A PROJECT',
    'CREATE MOMENTUM',
    'LESS NOISE',
    'MORE MOMENTUM',
    'MAKE THE SCROLL STOP',
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-36 bg-ink text-white relative overflow-hidden dark-dots select-none border-t border-white/10"
      data-theme="dark"
    >
      {/* Top Lime Sparkle Marquee */}
      <div className="mb-14 opacity-75 hover:opacity-100 transition-opacity">
        <ScrollMarquee speed={25} className="py-3 border-y border-white/10 font-mono uppercase tracking-widest text-xs sm:text-sm">
          <div className="inline-flex items-center gap-10 px-4">
            {marqueeWords.map((word, i) => (
              <span key={i} className="inline-flex items-center gap-10">
                <span className="text-white font-medium">{word}</span>
                <SparkleGlyph size={14} className="text-lime" spin={true} />
              </span>
            ))}
          </div>
        </ScrollMarquee>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-widest uppercase text-white/90 mb-6">
          <span className="w-2 h-2 rounded-sm bg-lime" />
          <span>08 / NEXT STEP</span>
        </div>

        {/* Proximity Weight Headline: 14 characters */}
        <h2
          ref={headlineRef}
          className="text-[clamp(3rem,9.5vw,8.5rem)] font-display font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-white mb-6 select-none"
        >
          {headlineText.split('').map((char, i) => (
            <span
              key={i}
              className="prox-char inline-block transition-transform duration-150"
              style={{
                fontVariationSettings: "'wght' 780, 'wdth' 85",
                whiteSpace: char === ' ' ? 'pre' : 'normal',
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        {/* Max 16 words support line: 10 words */}
        <p className="font-sans text-base sm:text-xl text-warmgray-300 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
          Tell us what you want to achieve. Let&apos;s get moving.
        </p>

        {/* Primary CTA Button */}
        <Magnetic strength={0.3}>
          <Link href="/contact" className="btn-primary text-base px-8 py-4 shadow-lime-glow">
            Start a project →
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
