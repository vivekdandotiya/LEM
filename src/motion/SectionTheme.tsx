'use client';

import React, { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export interface SectionThemeProps {
  theme?: 'light' | 'dark';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionTheme({ theme = 'light', children, className = '', id }: SectionThemeProps) {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    const trigger = ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (s) => {
        if (s.isActive) {
          document.documentElement.setAttribute('data-theme', theme);
        }
      },
    });

    return () => trigger.kill();
  }, [theme]);

  return (
    <section ref={secRef} id={id} data-theme={theme} className={className}>
      {children}
    </section>
  );
}
