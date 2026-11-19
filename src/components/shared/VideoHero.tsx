'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export interface VideoHeroProps {
  videoBase: string; // e.g. "/videos/about/about-hero"
  posterSrc: string; // e.g. "/images/about/about-hero.webp"
  posterAlt: string;
  className?: string;
  overlayClass?: string;
  children?: React.ReactNode;
  heightClass?: string;
}

export function VideoHero({
  videoBase,
  posterSrc,
  posterAlt,
  className = '',
  overlayClass = 'bg-charcoal/60',
  children,
  heightClass = 'min-h-[85svh] lg:min-h-svh',
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div
      data-surface="media"
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-charcoal ${className}`}
    >
      {/* Fallback Static Poster Image */}
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center transition-opacity duration-1000 ${
          videoLoaded && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Looping Ambient Video */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={`${videoBase}.webm`} type="video/webm" />
          <source src={`${videoBase}.mp4`} type="video/mp4" />
          <source src={`${videoBase}-720p.mp4`} type="video/mp4" media="(max-width: 768px)" />
        </video>
      )}

      {/* Atmospheric Vignette & Tuned Contrast Gradient Scrim (V9 F1.1) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors ${overlayClass}`}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,10,11,0.72) 0%, rgba(8,10,11,0.48) 40%, rgba(8,10,11,0.85) 100%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />

      {/* Content Layer with Local Dark Radial Scrim */}
      {children && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-32">
          <div
            className="rounded-3xl p-4 sm:p-8"
            style={{
              background:
                'radial-gradient(ellipse 95% 85% at 50% 50%, rgba(8,10,11,0.65) 0%, rgba(8,10,11,0.30) 65%, transparent 100%)',
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
