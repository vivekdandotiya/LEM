'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export function StartupIntro() {
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const arrowHeadRef = useRef<SVGGElement>(null);
  const buildingsGroupRef = useRef<SVGGElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<SVGTextElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('le-intro', '1');
    } catch {
      // Ignore in private browsing
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
    const curtain = curtainRef.current;
    if (curtain) {
      gsap.to(curtain, {
        y: '-100%',
        duration: 0.45,
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

    // intro=0 or skip_loader=1 explicitly skips
    if (introParam === '0' || skipLoader === '1') {
      window.dispatchEvent(new CustomEvent('preloader:revealing'));
      window.dispatchEvent(new CustomEvent('preloader:done'));
      return;
    }

    // Check sessionStorage if intro has already run (and not forced with ?intro=1)
    const hasSeenIntro = sessionStorage.getItem('le-intro');
    if (hasSeenIntro && introParam !== '1') {
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

  // Main 60fps GSAP Sequence: 4 Buildings + Climbing Arrow + Tilt to Top + Reveal
  useEffect(() => {
    if (!mounted || isCompleted) return;

    const curtain = curtainRef.current;
    const path = pathRef.current;
    const trail = trailRef.current;
    const arrowHead = arrowHeadRef.current;
    const buildingsGroup = buildingsGroupRef.current;
    const pulse = pulseRef.current;
    const label = labelRef.current;

    if (!curtain || !path || !trail || !arrowHead || !buildingsGroup) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      finishIntro();
      return;
    }

    const totalLength = path.getTotalLength ? path.getTotalLength() : 1000;
    trail.style.strokeDasharray = `${totalLength}`;
    trail.style.strokeDashoffset = `${totalLength}`;

    // Set initial positions
    const startPt = path.getPointAtLength(0);
    const startPtNext = path.getPointAtLength(Math.min(2, totalLength));
    const initialAngle = Math.atan2(startPtNext.y - startPt.y, startPtNext.x - startPt.x) * (180 / Math.PI);
    arrowHead.setAttribute('transform', `translate(${startPt.x}, ${startPt.y}) rotate(${initialAngle})`);
    gsap.set(arrowHead, { opacity: 0 });
    gsap.set(buildingsGroup, { opacity: 0, y: 15 });
    if (label) gsap.set(label, { opacity: 0, y: 5 });
    if (pulse) gsap.set(pulse, { opacity: 0, scale: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
    });
    timelineRef.current = tl;

    // Phase 1: 4 Buildings fade and rise subtly (0.0s - 0.5s)
    tl.to(buildingsGroup, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
    if (label) {
      tl.to(
        label,
        {
          opacity: 0.7,
          y: 0,
          duration: 0.5,
        },
        '-=0.3'
      );
    }

    // Phase 2: Arrow enters from left, climbs high, touches building, tilts straight to top (0.5s - 2.2s)
    const arrowMotion = { progress: 0 };
    tl.to(
      arrowHead,
      {
        opacity: 1,
        duration: 0.15,
      },
      '+=0.1'
    );

    tl.to(
      arrowMotion,
      {
        progress: 1,
        duration: 1.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentLen = arrowMotion.progress * totalLength;
          const pt = path.getPointAtLength(currentLen);
          const nextLen = Math.min(currentLen + 2, totalLength);
          const ptNext = path.getPointAtLength(nextLen);
          const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

          trail.style.strokeDashoffset = `${totalLength - currentLen}`;
          arrowHead.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
        },
      },
      '<'
    );

    // Phase 3: Arrow reaches the top, stops, and a luminous glow pulse radiates (2.2s - 2.5s)
    if (pulse) {
      const topPt = path.getPointAtLength(totalLength);
      pulse.setAttribute('cx', `${topPt.x}`);
      pulse.setAttribute('cy', `${topPt.y}`);

      tl.to(pulse, {
        opacity: 0.8,
        scale: 1,
        duration: 0.25,
        ease: 'power1.out',
      });
      tl.to(pulse, {
        opacity: 0,
        scale: 2.5,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    // Phase 4: Curtain opens smoothly upwards to reveal website (2.5s - 3.2s)
    tl.add(() => {
      window.dispatchEvent(new CustomEvent('preloader:revealing'));
    });

    tl.to(curtain, {
      y: '-100%',
      duration: 0.75,
      ease: 'power4.inOut',
      onComplete: finishIntro,
    });

    return () => {
      tl.kill();
    };
  }, [mounted, isCompleted, finishIntro]);

  if (!mounted || isCompleted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] select-none pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Loading Lead Edge Marketing"
    >
      {/* Black Curtain Overlay */}
      <div
        ref={curtainRef}
        className="relative w-full h-full bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Subtle background ambient radial sheen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle 700px at 50% 50%, rgba(176,141,87,0.08), transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Skip [ESC] Button Top Right */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono tracking-widest uppercase text-white/60 hover:text-white transition-all duration-200"
          aria-label="Skip intro animation"
        >
          Skip [ESC]
        </button>

        {/* Central Architectural SVG Stage */}
        <div className="relative w-full max-w-4xl px-4 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-auto max-h-[75vh] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Luminous Glow Filter for Arrow & Apex */}
              <filter id="gold-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradient for Arrow Trajectory */}
              <linearGradient id="arrow-gradient" x1="0" y1="450" x2="560" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#D9C29A" stopOpacity="0.3" />
                <stop offset="40%" stopColor="#B08D57" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
              </linearGradient>

              {/* Window Light Gradient */}
              <linearGradient id="window-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EFEBE2" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#B08D57" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* =========================================================================
                1. 4 BUILDING ARCHITECTURAL DESIGN
                ========================================================================= */}
            <g ref={buildingsGroupRef}>
              {/* Groundline */}
              <line
                x1="120"
                y1="450"
                x2="880"
                y2="450"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* BUILDING 1 (Left): Mid-rise architectural tower */}
              <g className="building-1">
                {/* Silhouette body */}
                <rect
                  x="330"
                  y="290"
                  width="68"
                  height="160"
                  fill="#0D0F12"
                  stroke="#262A30"
                  strokeWidth="1.5"
                />
                {/* Vertical glass facade strips */}
                <rect x="342" y="305" width="8" height="130" fill="url(#window-glow)" />
                <rect x="360" y="305" width="8" height="130" fill="url(#window-glow)" />
                <rect x="378" y="305" width="8" height="130" fill="url(#window-glow)" />
              </g>

              {/* BUILDING 2 (Mid-Left): Setback tiered skyscraper */}
              <g className="building-2">
                {/* Base tier */}
                <rect
                  x="418"
                  y="220"
                  width="82"
                  height="230"
                  fill="#111317"
                  stroke="#2E333B"
                  strokeWidth="1.5"
                />
                {/* Setback upper tier */}
                <rect
                  x="430"
                  y="190"
                  width="58"
                  height="30"
                  fill="#0E1013"
                  stroke="#2E333B"
                  strokeWidth="1.5"
                />
                {/* Horizontal floor grid slits */}
                <line x1="428" y1="245" x2="490" y2="245" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="428" y1="275" x2="490" y2="275" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="428" y1="305" x2="490" y2="305" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="428" y1="335" x2="490" y2="335" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="428" y1="365" x2="490" y2="365" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="428" y1="395" x2="490" y2="395" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="428" y1="425" x2="490" y2="425" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              </g>

              {/* BUILDING 3 (Mid-Right / Tallest Spire Flagship) */}
              <g className="building-3">
                {/* Main tower body */}
                <rect
                  x="520"
                  y="150"
                  width="92"
                  height="300"
                  fill="#14171C"
                  stroke="#383E47"
                  strokeWidth="1.5"
                />
                {/* Slanted crown apex */}
                <polygon
                  points="520,150 566,105 612,150"
                  fill="#101216"
                  stroke="#383E47"
                  strokeWidth="1.5"
                />
                {/* Spire antenna */}
                <line
                  x1="566"
                  y1="105"
                  x2="566"
                  y2="70"
                  stroke="#B08D57"
                  strokeWidth="2"
                />
                {/* Spire beacon light */}
                <circle cx="566" cy="68" r="2.5" fill="#FFFFFF" filter="url(#gold-glow)" />

                {/* Central illuminated core window column */}
                <rect x="556" y="165" width="20" height="260" fill="url(#window-glow)" />
                {/* Flanking subtle vertical columns */}
                <line x1="535" y1="170" x2="535" y2="430" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="597" y1="170" x2="597" y2="430" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </g>

              {/* BUILDING 4 (Right): Sleek corporate modern glass pavilion */}
              <g className="building-4">
                <rect
                  x="632"
                  y="260"
                  width="72"
                  height="190"
                  fill="#0D0F13"
                  stroke="#262A30"
                  strokeWidth="1.5"
                />
                {/* Modern vertical louvers */}
                <line x1="648" y1="275" x2="648" y2="435" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <line x1="668" y1="275" x2="668" y2="435" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <line x1="688" y1="275" x2="688" y2="435" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              </g>
            </g>

            {/* Architecture Subtitle Tag */}
            <text
              ref={labelRef}
              x="500"
              y="490"
              textAnchor="middle"
              fill="#8E8E93"
              fontSize="11"
              fontFamily="monospace"
              letterSpacing="0.28em"
              className="uppercase font-semibold select-none"
            >
              LEAD EDGE · ARCHITECTURE OF SCALE
            </text>

            {/* =========================================================================
                2. THE ARROW TRAJECTORY:
                Comes from left, ascends high towards buildings, touches building,
                then tilts straight to top!
                ========================================================================= */}
            {/* Hidden guide path */}
            <path
              ref={pathRef}
              d="M -30 480 C 140 460, 270 380, 390 320 C 460 280, 520 245, 548 190 C 564 150, 566 60, 566 -30"
              fill="none"
              stroke="transparent"
            />

            {/* Animated Luminous Glowing Trail */}
            <path
              ref={trailRef}
              d="M -30 480 C 140 460, 270 380, 390 320 C 460 280, 520 245, 548 190 C 564 150, 566 60, 566 -30"
              fill="none"
              stroke="url(#arrow-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#gold-glow)"
            />

            {/* Arrowhead Group (Follows path and aligns with tangent angle) */}
            <g ref={arrowHeadRef} filter="url(#gold-glow)">
              {/* Sleek triangular arrowhead */}
              <polygon
                points="-14,-8 6,0 -14,8 -9,0"
                fill="#FFFFFF"
                stroke="#B08D57"
                strokeWidth="1"
              />
              {/* Trailing bright photon point */}
              <circle cx="2" cy="0" r="2.5" fill="#FFFFFF" />
            </g>

            {/* Apex Stop Pulse Ripple */}
            <circle
              ref={pulseRef}
              cx="566"
              cy="20"
              r="24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              filter="url(#gold-glow)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
