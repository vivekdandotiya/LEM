'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface Tilt3DProps {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

export default function Tilt3D({ children, maxTilt = 6, className = '' }: Tilt3DProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;

    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6 });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6 });

    let rect: DOMRect | null = null;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };

    const onMove = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      ry(((e.clientX - rect.left) / rect.width - 0.5) * (maxTilt * 1.3));
      rx(-((e.clientY - rect.top) / rect.height - 0.5) * (maxTilt * 1.3));
    };

    const onLeave = () => {
      rect = null;
      rx(0);
      ry(0);
    };

    const onInvalidate = () => {
      rect = null;
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
  }, [maxTilt]);

  return (
    <div ref={elRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
