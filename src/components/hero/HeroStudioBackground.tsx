'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export function HeroStudioBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Slow, subtle, cinematic floating movement for the background image (moving slowly slowly)
    const ctx = gsap.context(() => {
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { scale: 1.04, x: -10, y: -8 },
          {
            scale: 1.12,
            x: 10,
            y: 8,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        );
      }

      if (orbRef.current) {
        gsap.to(orbRef.current, {
          opacity: 0.35,
          scale: 1.1,
          duration: 7,
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
      className="absolute inset-0 pointer-events-none overflow-hidden select-none bg-[#07080A]"
      aria-hidden="true"
    >
      {/* 1. Cinematic Background Image (Slow, Smooth Pan & Drift) */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-[-40px] will-change-transform"
      >
        <Image
          src="/images/home/hero-2.webp"
          alt="Lead Edge Corporate Architectural Headquarters"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70 brightness-95 contrast-110"
        />
      </div>

      {/* 2. Precision Technical Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* 3. Ambient Warm Gold & Amber Studio Lighting Orb */}
      <div
        ref={orbRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] rounded-full blur-[130px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200, 169, 126, 0.45) 0%, rgba(176, 141, 87, 0.18) 50%, transparent 80%)',
        }}
      />

      {/* 4. Subtle Architectural Geometric Vector Curves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
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
        <circle cx="600" cy="480" r="3" fill="#C8A97E" />
        <circle cx="1000" cy="320" r="4" fill="#C8A97E" />
      </svg>

      {/* 5. Balanced Cinematic Dark Scrim Over Image for 100% Crisp Text Visibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(7, 8, 10, 0.45) 0%, rgba(7, 8, 10, 0.68) 75%, rgba(7, 8, 10, 0.90) 100%),
            linear-gradient(180deg, rgba(7, 8, 10, 0.65) 0%, rgba(7, 8, 10, 0.25) 30%, rgba(7, 8, 10, 0.40) 65%, rgba(7, 8, 10, 0.95) 100%)
          `,
        }}
      />
    </div>
  );
}
