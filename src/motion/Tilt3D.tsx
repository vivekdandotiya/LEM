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

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * (maxTilt * 1.3));
      rx(-((e.clientY - r.top) / r.height - 0.5) * (maxTilt * 1.3));
    };

    const onLeave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={elRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
