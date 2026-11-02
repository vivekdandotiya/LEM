'use client';

import { useEffect } from 'react';

export function DotGridPointerListener() {
  useEffect(() => {
    // Only on pointer devices that support hover
    if (window.matchMedia('(hover: none)').matches) return;

    const root = document.documentElement;
    let idleTimer: NodeJS.Timeout | null = null;
    let ticking = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (!ticking) {
        requestAnimationFrame(() => {
          root.style.setProperty('--mx', `${lastX}px`);
          root.style.setProperty('--my', `${lastY}px`);
          root.style.setProperty('--lit', '1');
          ticking = false;
        });
        ticking = true;
      }

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        root.style.setProperty('--lit', '0');
      }, 1200);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return null;
}
