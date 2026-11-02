'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
  delay?: number;
  waitForPreloader?: boolean;
}

export default function SplitHeading({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  waitForPreloader = false,
  ...props
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const runSplit = () => {
          if (!ref.current) return;
          const split = new SplitType(ref.current, { types: 'lines', lineClass: 'split-line' });
          split.lines?.forEach((l) => {
            const w = document.createElement('span');
            w.className = 'split-mask';
            l.parentNode?.insertBefore(w, l);
            w.appendChild(l);
          });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.08,
            delay,
            scrollTrigger: waitForPreloader
              ? undefined
              : { trigger: ref.current, start: 'top 85%', once: true },
          });
          return () => split.revert();
        };

        let isIntroFinished = false;
        try {
          isIntroFinished = sessionStorage.getItem('le-intro') === '1';
        } catch {
          // ignore
        }

        if (waitForPreloader && !isIntroFinished) {
          let hasRun = false;
          const handler = () => {
            if (hasRun) return;
            hasRun = true;
            runSplit();
          };
          window.addEventListener('preloader:done', handler, { once: true });
          window.addEventListener('route:revealed', handler, { once: true });
          // Fallback timer just in case
          const fallback = setTimeout(handler, 4500);
          return () => {
            clearTimeout(fallback);
            window.removeEventListener('preloader:done', handler);
            window.removeEventListener('route:revealed', handler);
          };
        } else {
          return runSplit();
        }
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
