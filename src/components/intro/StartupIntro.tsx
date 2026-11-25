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
    
    // Quick emergency smooth open
    const top = topShutterRef.current;
    const bottom = bottomShutterRef.current;
    const center = centerContentRef.current;
    const beam = beamRef.current;

    if (top && bottom) {
      if (center) gsap.to(center, { opacity: 0, duration: 0.25 });
      if (beam) gsap.to(beam, { opacity: 0, duration: 0.2 });
      gsap.to(top, {
        yPercent: -100,
        duration: 0.65,
        ease: 'power3.inOut',
      });
      gsap.to(bottom, {
        yPercent: 100,
        duration: 0.65,
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

  // Main Motion Graphic Animation:
  // 1. Black Screen holds with "LeadEdge Marketing" for 1.5s
  // 2. Horizontal split from middle: Top half glides UP, Bottom half glides DOWN smoothly
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

    // Set initial shutter and center states
    gsap.set([top, bottom], { yPercent: 0 });
    gsap.set(center, { opacity: 0, y: 15, scale: 0.96 });
    gsap.set(beam, { opacity: 0, scaleX: 0 });

    const tl = gsap.timeline({
      onComplete: finishIntro,
    });
    timelineRef.current = tl;

    // Step 1: Smooth fade & gentle drift-in of "LeadEdge Marketing" (0.0s - 0.5s)
    tl.to(center, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    });

    // Step 2: Hold steady on the black screen (0.6s - 1.5s)
    // The name is fully readable in the middle for 1.5 seconds as requested!

    // Step 3: At 1.5s, luminous gold seam laser beam flashes horizontally across center line
    tl.to(
      beam,
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.25,
        ease: 'power2.in',
      },
      '+=0.85' // Reaches ~1.45s - 1.5s mark
    );

    // Step 4: Text gently expands and dissolves as shutters split
    tl.to(
      center,
      {
        opacity: 0,
        scale: 1.05,
        y: -4,
        duration: 0.35,
        ease: 'power2.inOut',
      },
      '<'
    );

    // Step 5: SILK-SMOOTH SPLIT OPENING (1.55s - 2.8s)
    // Top half glides UP (-100%), Bottom half glides DOWN (+100%)
    // Uses cinematic luxury motion curve (power4.inOut)
    tl.to(
      top,
      {
        yPercent: -100,
        duration: 1.25,
        ease: 'power4.inOut',
      },
      '-=0.08'
    );

    tl.to(
      bottom,
      {
        yPercent: 100,
        duration: 1.25,
        ease: 'power4.inOut',
      },
      '<'
    );

    // Fade beam line as shutters separate
    tl.to(
      beam,
      {
        opacity: 0,
        duration: 0.35,
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
      aria-label="LeadEdge Marketing Intro"
    >
      {/* =========================================================================
          1. TOP SHUTTER (Upper 50% of screen - slides UP)
          ========================================================================= */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 right-0 h-[50vh] bg-[#070809] border-b border-[#f7ac4f]/25 will-change-transform flex flex-col justify-end items-center overflow-hidden"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {/* Subtle radial ambient illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#141619_0%,#070809_75%)] pointer-events-none" />
        
        {/* Subtle top ambient gold shimmer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[#f7ac4f]/5 rounded-full blur-[60px] pointer-events-none" />
      </div>

      {/* =========================================================================
          2. BOTTOM SHUTTER (Lower 50% of screen - slides DOWN)
          ========================================================================= */}
      <div
        ref={bottomShutterRef}
        className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[#070809] border-t border-[#f7ac4f]/25 will-change-transform flex flex-col justify-start items-center overflow-hidden"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {/* Subtle radial ambient illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#141619_0%,#070809_75%)] pointer-events-none" />
        
        {/* Subtle bottom ambient gold shimmer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[#f7ac4f]/5 rounded-full blur-[60px] pointer-events-none" />
      </div>

      {/* =========================================================================
          3. CENTER HORIZON LASER SEAM (Flashes across the split line at 1.5s)
          ========================================================================= */}
      <div
        ref={beamRef}
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(247,172,79,0.2) 20%, #f7ac4f 50%, rgba(247,172,79,0.2) 80%, transparent 100%)',
          boxShadow: '0 0 25px 3px rgba(247,172,79,0.8), 0 0 50px 8px rgba(247,172,79,0.3)',
        }}
      />

      {/* =========================================================================
          4. CENTER BRAND CONTENT: "LeadEdge Marketing"
          ========================================================================= */}
      <div
        ref={centerContentRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-center pointer-events-none flex flex-col items-center justify-center will-change-transform px-4 w-full max-w-4xl"
      >
        {/* Small Luxury Crown / Sparkle Accent */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f7ac4f] animate-ping" />
          <span className="text-[10px] font-mono font-bold tracking-[0.35em] uppercase text-[#f7ac4f]/90">
            Digital Growth Studio
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#f7ac4f] animate-ping" />
        </div>

        {/* Main Brand Title: "LeadEdge Marketing" */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-none text-white drop-shadow-md">
          <span className="text-white tracking-[0.16em] sm:tracking-[0.2em]">
            LeadEdge
          </span>
          <span className="text-[#f7ac4f] font-light tracking-[0.18em] sm:tracking-[0.22em] ml-2.5 sm:ml-4">
            Marketing
          </span>
        </h1>

        {/* Minimal Monospace Architecture Subtitle */}
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[#8e8d8a] mt-4 font-medium">
          SEO · Performance Ads · Web Architecture
        </p>

        {/* Subtle Click or ESC prompt */}
        <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase mt-8">
          Click anywhere or press Esc to skip
        </span>
      </div>
    </div>
  );
}
