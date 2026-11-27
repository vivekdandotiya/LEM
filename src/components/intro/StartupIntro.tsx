'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export function StartupIntro() {
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);
  const mainCurtainPathRef = useRef<SVGPathElement>(null);
  const accentCurtainPathRef = useRef<SVGPathElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('le-intro', '1');
    } catch {
      // Ignore private browsing restrictions
    }
    window.dispatchEvent(new CustomEvent('preloader:revealing'));
    window.dispatchEvent(new CustomEvent('preloader:done'));
    document.body.style.overflow = '';
    setIsCompleted(true);
  }, []);

  // Quick skip on click or ESC
  const handleSkip = useCallback(() => {
    if (isCompleted) return;
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (textWrapperRef.current) {
      gsap.to(textWrapperRef.current, { opacity: 0, duration: 0.2 });
    }

    // Quick snap open of the liquid curtain
    const quickState = { yCorners: 100, yCenter: 100 };
    gsap.to(quickState, {
      yCorners: -15,
      yCenter: -15,
      duration: 0.45,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (mainCurtainPathRef.current) {
          mainCurtainPathRef.current.setAttribute(
            'd',
            `M 0 0 L 100 0 L 100 ${quickState.yCorners} Q 50 ${quickState.yCenter} 0 ${quickState.yCorners} Z`
          );
        }
      },
      onComplete: finishIntro,
    });
  }, [finishIntro, isCompleted]);

  // Initial check & mounting
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const introParam = urlParams.get('intro');
    const skipLoader = urlParams.get('skip_loader');

    // Explicit skip flag
    if (introParam === '0' || skipLoader === '1') {
      window.dispatchEvent(new CustomEvent('preloader:revealing'));
      window.dispatchEvent(new CustomEvent('preloader:done'));
      return;
    }

    // Lock body scroll during intro
    document.body.style.overflow = 'hidden';
    setMounted(true);
  }, []);

  // Keyboard ESC listener to skip intro
  useEffect(() => {
    if (!mounted || isCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted, isCompleted, handleSkip]);

  // Jelly Type Animation:
  // 1. Text ("LeadEdge Marketing") floats in from left with jelly squash & stretch physics
  // 2. Bounces elastically into the center, pauses briefly
  // 3. Squashes in anticipation, then springs like rubber floating to the right
  // 4. In a jelly liquid wave animation, the curtain snaps open upwards to reveal the site
  useEffect(() => {
    if (!mounted || isCompleted) return;

    const wrapper = textWrapperRef.current;
    const inner = textInnerRef.current;
    const mainPath = mainCurtainPathRef.current;
    const accentPath = accentCurtainPathRef.current;

    if (!wrapper || !inner || !mainPath) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      finishIntro();
      return;
    }

    // Liquid Curtain States (represented as 0 - 100 viewport coordinates)
    const mainCurtain = { yCorners: 100, yCenter: 100 };
    const accentCurtain = { yCorners: 100, yCenter: 100 };

    const updateCurtains = () => {
      if (mainPath) {
        mainPath.setAttribute(
          'd',
          `M 0 0 L 100 0 L 100 ${mainCurtain.yCorners} Q 50 ${mainCurtain.yCenter} 0 ${mainCurtain.yCorners} Z`
        );
      }
      if (accentPath) {
        accentPath.setAttribute(
          'd',
          `M 0 0 L 100 0 L 100 ${accentCurtain.yCorners} Q 50 ${accentCurtain.yCenter} 0 ${accentCurtain.yCorners} Z`
        );
      }
    };

    // Initial setup
    gsap.set(wrapper, { x: '-120vw', opacity: 1 });
    gsap.set(inner, {
      scaleX: 1.5,
      scaleY: 0.65,
      skewX: -14,
      transformOrigin: 'center center',
    });
    updateCurtains();

    const tl = gsap.timeline({
      onComplete: finishIntro,
    });
    timelineRef.current = tl;

    // =========================================================================
    // STEP 1: Text floats in from Left to Center with Jelly Squash & Stretch
    // =========================================================================
    tl.to(wrapper, {
      x: '0vw',
      duration: 0.85,
      ease: 'power3.out',
    });

    // Sudden deceleration causes vertical jelly squash
    tl.to(
      inner,
      {
        scaleX: 0.8,
        scaleY: 1.3,
        skewX: 10,
        duration: 0.26,
        ease: 'power2.out',
      },
      '-=0.28'
    );

    // Rebound 1 (stretches horizontally)
    tl.to(inner, {
      scaleX: 1.16,
      scaleY: 0.88,
      skewX: -6,
      duration: 0.22,
      ease: 'sine.inOut',
    });

    // Rebound 2 (wobbles and settles to natural 1:1)
    tl.to(inner, {
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      duration: 0.35,
      ease: 'elastic.out(1.2, 0.4)',
    });

    // =========================================================================
    // STEP 2: Gentle float in center (~0.5s pause to read clearly)
    // =========================================================================
    tl.to(wrapper, {
      y: -10,
      duration: 0.5,
      ease: 'sine.inOut',
    });

    // =========================================================================
    // STEP 3: Text squashes in anticipation, then springs like rubber to the RIGHT
    // =========================================================================
    tl.to(inner, {
      scaleX: 0.86,
      scaleY: 1.18,
      skewX: -5,
      duration: 0.18,
      ease: 'power1.in',
    });

    // Stretches horizontally like liquid jelly and zips to the right
    tl.to(
      inner,
      {
        scaleX: 1.6,
        scaleY: 0.6,
        skewX: 18,
        duration: 0.55,
        ease: 'power3.in',
      },
      '<0.08'
    );

    tl.to(
      wrapper,
      {
        x: '130vw',
        duration: 0.6,
        ease: 'power3.in',
      },
      '<'
    );

    // =========================================================================
    // STEP 4: Jelly Type Opening of the Website (Liquid Jelly Curtain Snap)
    // =========================================================================
    // As the text exits right, the dark curtain lifts with an elastic liquid wave!
    tl.to(
      mainCurtain,
      {
        yCorners: -15,
        duration: 0.85,
        ease: 'power3.inOut',
        onUpdate: updateCurtains,
      },
      '-=0.25'
    );

    // The center of the jelly curtain lags behind with heavy elasticity,
    // creating a bouncy liquid arch that snaps open!
    tl.to(
      mainCurtain,
      {
        yCenter: -15,
        duration: 1.15,
        ease: 'elastic.out(1.15, 0.38)',
        onUpdate: updateCurtains,
      },
      '<'
    );

    // Accent golden apricot wave trails slightly for a rich liquid rim
    if (accentPath) {
      tl.to(
        accentCurtain,
        {
          yCorners: -15,
          duration: 0.95,
          ease: 'power3.inOut',
          onUpdate: updateCurtains,
        },
        '<0.06'
      );

      tl.to(
        accentCurtain,
        {
          yCenter: -15,
          duration: 1.25,
          ease: 'elastic.out(1.15, 0.38)',
          onUpdate: updateCurtains,
        },
        '<'
      );
    }

    return () => {
      tl.kill();
    };
  }, [mounted, isCompleted, finishIntro]);

  if (!mounted || isCompleted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] pointer-events-auto overflow-hidden select-none cursor-pointer"
      onClick={handleSkip}
      role="dialog"
      aria-modal="true"
      aria-label="LeadEdge Marketing"
    >
      {/* =========================================================================
          LIQUID JELLY CURTAIN (SVG Morphing Elastic Waves)
          ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Layer 1: Apricot Liquid Accent Rim */}
        <path
          ref={accentCurtainPathRef}
          fill="#f7ac4f"
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
        />

        {/* Layer 2: Main Deep Obsidian Liquid Jelly Curtain */}
        <path
          ref={mainCurtainPathRef}
          fill="#08090a"
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
        />
      </svg>

      {/* =========================================================================
          JELLY TEXT: Floats in from Left, Squashes & Bounces, Zips to Right
          ========================================================================= */}
      <div
        ref={textWrapperRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-6 will-change-transform"
      >
        <div
          ref={textInnerRef}
          className="inline-flex items-baseline will-change-transform drop-shadow-[0_0_35px_rgba(255,255,255,0.22)]"
        >
          <span className="font-display font-black text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight select-none">
            LeadEdge
          </span>
          <span className="font-sans font-light text-white/95 text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider ml-3 sm:ml-5 select-none">
            Marketing
          </span>
        </div>
      </div>
    </div>
  );
}
