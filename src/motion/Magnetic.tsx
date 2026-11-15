'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.28, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

    let centerX = 0;
    let centerY = 0;
    let hasCoords = false;

    const updateCoords = () => {
      const r = el.getBoundingClientRect();
      centerX = r.left + r.width / 2;
      centerY = r.top + r.height / 2;
      hasCoords = true;
    };

    const onEnter = () => {
      updateCoords();
    };

    const onMove = (e: PointerEvent) => {
      if (!hasCoords) updateCoords();
      xTo((e.clientX - centerX) * strength);
      yTo((e.clientY - centerY) * strength);
    };

    const onLeave = () => {
      hasCoords = false;
      xTo(0);
      yTo(0);
    };

    const onInvalidate = () => {
      hasCoords = false;
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onInvalidate, { passive: true });
    window.addEventListener('resize', onInvalidate, { passive: true });

    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onInvalidate);
      window.removeEventListener('resize', onInvalidate);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

export default Magnetic;
