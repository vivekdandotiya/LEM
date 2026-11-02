'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HERO_CREATIVES, HeroCreative } from '@/data/heroCreatives';
import { AdCard } from './AdCard';

export function HeroWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const wall = wallRef.current;
    const container = containerRef.current;
    if (!wall || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. IntersectionObserver: Pause animations and hide wall when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsPaused(true);
            wall.style.visibility = 'hidden';
          } else {
            setIsPaused(false);
            wall.style.visibility = 'visible';
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    if (prefersReducedMotion) return () => observer.disconnect();

    // 2. Entrance Animation after Preloader
    const handlePreloaderDone = () => {
      gsap.fromTo(
        wall.querySelectorAll('.wall-col'),
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power3.out',
        }
      );
    };

    window.addEventListener('preloader:done', handlePreloaderDone);
    // If preloader already fired
    if (sessionStorage.getItem('le-intro')) {
      handlePreloaderDone();
    }

    // 3. Desktop Pointer Parallax (max 14px)
    let removePointerListener: (() => void) | undefined;
    if (window.innerWidth >= 1024) {
      const xTo = gsap.quickTo(wall, 'x', { duration: 1.2, ease: 'power2.out' });
      const yTo = gsap.quickTo(wall, 'y', { duration: 1.2, ease: 'power2.out' });

      const onPointerMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        xTo(nx * 14);
        yTo(ny * 14);
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      removePointerListener = () => window.removeEventListener('pointermove', onPointerMove);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('preloader:done', handlePreloaderDone);
      if (removePointerListener) removePointerListener();
    };
  }, []);

  // Organize 24 creatives into 6 columns (4 per col, duplicated once to 8 per col)
  const columns: { creatives: HeroCreative[]; dur: number; dir: 'up' | 'down' }[] = [
    { creatives: [HERO_CREATIVES[0], HERO_CREATIVES[6], HERO_CREATIVES[12], HERO_CREATIVES[18]], dur: 85, dir: 'up' },
    { creatives: [HERO_CREATIVES[1], HERO_CREATIVES[7], HERO_CREATIVES[13], HERO_CREATIVES[19]], dur: 105, dir: 'down' },
    { creatives: [HERO_CREATIVES[2], HERO_CREATIVES[8], HERO_CREATIVES[14], HERO_CREATIVES[20]], dur: 75, dir: 'up' },
    { creatives: [HERO_CREATIVES[3], HERO_CREATIVES[9], HERO_CREATIVES[15], HERO_CREATIVES[21]], dur: 95, dir: 'down' },
    { creatives: [HERO_CREATIVES[4], HERO_CREATIVES[10], HERO_CREATIVES[16], HERO_CREATIVES[22]], dur: 80, dir: 'up' },
    { creatives: [HERO_CREATIVES[5], HERO_CREATIVES[11], HERO_CREATIVES[17], HERO_CREATIVES[23]], dur: 110, dir: 'down' },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        ref={wallRef}
        className="absolute inset-[-25%_-14%] rotate-[-5deg] md:rotate-[-7deg] scale-[1.08] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 pointer-events-none"
        style={{
          willChange: 'transform, opacity',
        }}
      >
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className={`wall-col flex flex-col gap-3 sm:gap-4 ${
              colIdx >= 3 ? 'hidden md:flex' : ''
            } ${colIdx >= 4 ? 'md:hidden lg:flex' : ''}`}
            style={{
              animationName: col.dir === 'up' ? 'wall-up' : 'wall-down',
              animationDuration: `${col.dur}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {/* First set of 4 cards */}
            {col.creatives.map((creative, idx) => (
              <AdCard
                key={`${creative.id}-a`}
                creative={creative}
                priority={colIdx < 3 && idx < 2}
                isDecorative={true}
              />
            ))}
            {/* Duplicated set for seamless translateY(-50%) infinite loop */}
            {col.creatives.map((creative) => (
              <AdCard
                key={`${creative.id}-b`}
                creative={creative}
                priority={false}
                isDecorative={true}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
