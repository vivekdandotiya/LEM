'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface WordHighlightProps {
  text: string;
  className?: string;
}

export default function WordHighlight({ text, className = '' }: WordHighlightProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const spans = containerRef.current?.querySelectorAll('.highlight-word');
        if (!spans || spans.length === 0) return;

        gsap.fromTo(
          spans,
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <p ref={containerRef} className={className}>
      {words.map((w, i) => (
        <span key={i} className="highlight-word inline-block mr-[0.28em] transition-opacity">
          {w}
        </span>
      ))}
    </p>
  );
}
