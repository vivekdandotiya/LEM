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

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

export default Magnetic;
