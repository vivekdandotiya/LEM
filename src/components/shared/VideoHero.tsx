'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export interface VideoHeroProps {
  videoBase?: string; // e.g. "/videos/about/about-hero"
  posterSrc: string; // e.g. "/images/about/about-hero.webp"
  posterAlt: string;
  className?: string;
  overlayClass?: string;
  children?: React.ReactNode;
  heightClass?: string;
  staticOnly?: boolean; // When true, displays rock-solid pristine photo without video zoompan jitter
}

export function VideoHero({
  videoBase,
  posterSrc,
  posterAlt,
  className = '',
  overlayClass = 'bg-black/30',
  children,
  heightClass = 'min-h-[85svh] lg:min-h-svh',
  staticOnly = false,
}: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [shouldAttachVideo, setShouldAttachVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 1. Connection & reduced-motion inspection + eager source attachment
  useEffect(() => {
    if (staticOnly || !videoBase) return;

    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return;
    }

    // Check Network Information API (saveData / slow connection)
    const nav = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };
    if (nav.connection?.saveData === true) {
      return;
    }
    if (nav.connection?.effectiveType && ['slow-2g', '2g'].includes(nav.connection.effectiveType)) {
      return;
    }

    setShouldAttachVideo(true);
  }, [staticOnly, videoBase]);

  // 2. IntersectionObserver & Tab Visibility management: pause when hidden/offscreen, resume when visible
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !shouldAttachVideo || hasError) return;

    let isIntersecting = true;
    let isTabVisible = document.visibilityState === 'visible';

    const updatePlayback = () => {
      if (isIntersecting && isTabVisible) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setVideoPlaying(true))
            .catch(() => {
              // Autoplay policy or stall
            });
        }
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      updatePlayback();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [shouldAttachVideo, hasError]);

  return (
    <div
      ref={containerRef}
      data-surface="media"
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-[#0c0c0d] ${className}`}
    >
      {/* High Priority Static Poster Image (Always visible as foundation, never black) */}
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Looping Ambient Video: Mounted gracefully over poster */}
      {!staticOnly && shouldAttachVideo && !hasError && videoBase && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlaying={() => setVideoPlaying(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            videoPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={`${videoBase}.webm`} type="video/webm" />
          <source src={`${videoBase}-720p.mp4`} type="video/mp4" media="(max-width: 767px)" />
          <source src={`${videoBase}.mp4`} type="video/mp4" />
        </video>
      )}

      {/* Balanced, Transparent Scrim: Ensures White Text Readability without Drowning Imagery */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors ${overlayClass}`}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,10,11,0.35) 0%, rgba(8,10,11,0.15) 40%, rgba(8,10,11,0.55) 100%)',
        }}
      />

      {/* Content Layer with Soft Vignette for Text Contrast */}
      {children && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 sm:py-32">
          <div
            className="rounded-3xl p-4 sm:p-8"
            style={{
              background:
                'radial-gradient(ellipse 95% 85% at 50% 50%, rgba(8,10,11,0.40) 0%, rgba(8,10,11,0.10) 65%, transparent 100%)',
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
