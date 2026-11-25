'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export function StartupIntro() {
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const topShutterRef = useRef<HTMLDivElement>(null);
  const bottomShutterRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
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

  const handleSkip = useCallback(() => {
    if (isCompleted) return;
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const top = topShutterRef.current;
    const bottom = bottomShutterRef.current;
    const center = centerContentRef.current;
    const beam = beamRef.current;

    if (top && bottom) {
      if (center) gsap.to(center, { opacity: 0, duration: 0.25 });
      if (beam) gsap.to(beam, { opacity: 0, duration: 0.2 });
      gsap.to(top, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
      });
      gsap.to(bottom, {
        yPercent: 100,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: finishIntro,
      });
    } else {
      finishIntro();
    }
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

  // Soft, Cinematic Motion Graphic:
  // 1. Pure black screen with ONLY "LeadEdge Marketing" in white
  // 2. Holds softly for 1.5s
  // 3. Butter-smooth middle horizontal split (Top slides UP, Bottom slides DOWN)
  useEffect(() => {
    if (!mounted || isCompleted) return;

    const top = topShutterRef.current;
    const bottom = bottomShutterRef.current;
    const center = centerContentRef.current;
    const beam = beamRef.current;

    if (!top || !bottom || !center || !beam) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      finishIntro();
      return;
    }

    // Initial states
    gsap.set([top, bottom], { yPercent: 0 });
    gsap.set(center, { opacity: 0, y: 10, scale: 0.98 });
    gsap.set(beam, { opacity: 0, scaleX: 0 });

    const tl = gsap.timeline({
      onComplete: finishIntro,
    });
    timelineRef.current = tl;

    // Phase 1: Soft, silky fade-in of the white agency name (0.0s - 0.7s)
    tl.to(center, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      ease: 'power2.out',
    });

    // Phase 2: Holds steady and calm on pure black for 1.5 seconds

    // Phase 3: At 1.5s, soft luminous center horizon line breathes across the middle seam
    tl.to(
      beam,
      {
        opacity: 0.85,
        scaleX: 1,
        duration: 0.35,
        ease: 'sine.inOut',
      },
      '+=0.75' // Arrives at 1.5s mark
    );

    // Phase 4: Agency name dissolves with a delicate, soft fade
    tl.to(
      center,
      {
        opacity: 0,
        scale: 1.03,
        duration: 0.45,
        ease: 'power2.inOut',
      },
      '<'
    );

    // Phase 5: Feather-soft split opening (Top half UP, Bottom half DOWN)
    // Silky, luxury easing for an ultra-smooth motion graphic feel
    tl.to(
      top,
      {
        yPercent: -100,
        duration: 1.35,
        ease: 'power3.inOut',
      },
      '-=0.15'
    );

    tl.to(
      bottom,
      {
        yPercent: 100,
        duration: 1.35,
        ease: 'power3.inOut',
      },
      '<'
    );

    // Softly fade horizon beam as the shutters part
    tl.to(
      beam,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '<'
    );

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
          1. TOP SHUTTER (Upper 50% - glides UP smoothly)
          ========================================================================= */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 right-0 h-[50vh] bg-[#050505] border-b border-white/10 will-change-transform flex flex-col justify-end items-center overflow-hidden"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {/* Soft, deep ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#141416_0%,#050505_70%)] pointer-events-none" />
      </div>

      {/* =========================================================================
          2. BOTTOM SHUTTER (Lower 50% - glides DOWN smoothly)
          ========================================================================= */}
      <div
        ref={bottomShutterRef}
        className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[#050505] border-t border-white/10 will-change-transform flex flex-col justify-start items-center overflow-hidden"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {/* Soft, deep ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#141416_0%,#050505_70%)] pointer-events-none" />
      </div>

      {/* =========================================================================
          3. SOFT CENTER HORIZON SEAM (Illuminates subtly at 1.5s)
          ========================================================================= */}
      <div
        ref={beamRef}
        className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)',
          boxShadow: '0 0 25px 2px rgba(255,255,255,0.6), 0 0 50px 6px rgba(255,255,255,0.2)',
        }}
      />

      {/* =========================================================================
          4. AGENCY NAME ONLY (In pure, pristine white with soft luxury kerning)
          ========================================================================= */}
      <div
        ref={centerContentRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-center pointer-events-none flex flex-col items-center justify-center will-change-transform px-6 w-full max-w-4xl"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-white tracking-[0.16em] sm:tracking-[0.22em] drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] select-none leading-none">
          <span className="font-extrabold text-white">LeadEdge</span>
          <span className="font-light text-white ml-2.5 sm:ml-4">Marketing</span>
        </h1>
      </div>
    </div>
  );
}
