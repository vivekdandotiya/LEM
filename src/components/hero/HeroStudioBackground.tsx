'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroStudioBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Slow, organic floating motion for luxury ambient light orbs
    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=40',
          y: '-=30',
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=50',
          y: '+=35',
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          scale: 1.15,
          opacity: 0.22,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none bg-[#08090C]"
      aria-hidden="true"
    >
      {/* 1. Subtle Precision Engineering Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 2. Top-Center Ambient Champagne Gold Glow */}
      <div
        ref={orb1Ref}
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200, 169, 126, 0.45) 0%, rgba(176, 141, 87, 0.18) 50%, transparent 80%)',
        }}
      />

      {/* 3. Bottom-Left Soft Amber Glow */}
      <div
        ref={orb2Ref}
        className="absolute -bottom-[15%] -left-[10%] w-[500px] sm:w-[650px] h-[450px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(176, 141, 87, 0.35) 0%, rgba(138, 107, 60, 0.1) 60%, transparent 80%)',
        }}
      />

      {/* 4. Center Growth Radiance */}
      <div
        ref={orb3Ref}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217, 194, 154, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* 5. Sleek Architectural Geometric Vector Curves (Subtle Growth Trajectory) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.09]"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-100 700 C 300 650, 600 480, 1000 320 C 1200 240, 1400 150, 1600 100"
          stroke="#C8A97E"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M-100 780 C 350 720, 700 520, 1100 340 C 1300 250, 1450 170, 1600 120"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        {/* Subtle grid coordinate points */}
        <circle cx="600" cy="480" r="3" fill="#C8A97E" />
        <circle cx="1000" cy="320" r="4" fill="#C8A97E" />
        <circle cx="1100" cy="340" r="3" fill="#FFFFFF" />
      </svg>

      {/* 6. Vignette overlay for focused center legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 40%, rgba(8, 9, 12, 0.75) 100%)',
        }}
      />
    </div>
  );
}
