'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function DotGridPointerListener() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer devices that support hover
    if (window.matchMedia('(hover: none)').matches) return;

    const el = spotlightRef.current;
    if (!el) return;

    const GRID_SIZE = 26;
    const SPOTLIGHT_SIZE = 442; // 17 * 26px = 442px
    const HALF_SIZE = SPOTLIGHT_SIZE / 2; // 221px

    // Set initial position offscreen
    gsap.set(el, { x: -9999, y: -9999, opacity: 0 });

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power2.out' });

    let idleTimer: NodeJS.Timeout | null = null;
    let isVisible = false;

    const onPointerMove = (e: PointerEvent) => {
      // Snap top-left to grid multiples so pattern perfectly aligns with body::before
      const targetX = Math.round((e.clientX - HALF_SIZE) / GRID_SIZE) * GRID_SIZE;
      const targetY = Math.round((e.clientY - HALF_SIZE) / GRID_SIZE) * GRID_SIZE;

      xTo(targetX);
      yTo(targetY);

      if (!isVisible) {
        isVisible = true;
        gsap.to(el, { opacity: 1, duration: 0.25, overwrite: 'auto' });
      }

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isVisible = false;
        gsap.to(el, { opacity: 0, duration: 0.6, overwrite: 'auto' });
      }, 1200);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed top-0 left-0 w-[442px] h-[442px] z-[-1]"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(8, 10, 11, 0.62) 1.9px, transparent 2.5px)',
        backgroundSize: '26px 26px',
        backgroundPosition: '0 0',
        WebkitMaskImage: 'radial-gradient(circle at center, #000 0%, transparent 70%)',
        maskImage: 'radial-gradient(circle at center, #000 0%, transparent 70%)',
        transform: 'translate3d(-9999px, -9999px, 0)',
        willChange: 'transform, opacity',
      }}
      aria-hidden="true"
    />
  );
}
