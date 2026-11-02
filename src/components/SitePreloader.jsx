'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Candle from './animorio/candle/TheCandleLoaderThatBurnsDown';

export default function SitePreloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('le-intro');
      const skipParam = typeof window !== 'undefined' && window.location.search.includes('skip_loader');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (seen || skipParam || reduced) {
        window.dispatchEvent(new Event('preloader:done'));
        return;
      }
      setShow(true);
    } catch {
      window.dispatchEvent(new Event('preloader:done'));
    }
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem('le-intro', '1');
    } catch {
      // ignore
    }

    gsap.to('.preloader', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        setShow(false);
        window.dispatchEvent(new Event('preloader:done'));
      },
    });
  };

  if (!show) return null;

  return (
    <div
      className="preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#000',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      <Candle onDone={finish} />
    </div>
  );
}
