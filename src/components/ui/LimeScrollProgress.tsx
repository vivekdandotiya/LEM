'use client';

import { useEffect, useRef } from 'react';

export function LimeScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (barRef.current) {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const progress = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
            barRef.current.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-lime"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}
