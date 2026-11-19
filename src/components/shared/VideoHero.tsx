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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [shouldAttachVideo, setShouldAttachVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 1. Connection & reduced-motion inspection + delayed source attachment
  useEffect(() => {
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
    if (nav.connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(nav.connection.effectiveType)) {
      return;
    }

    // Attach video sources only after window load or idle callback to protect LCP & TBT
    const scheduleAttach = () => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
          setShouldAttachVideo(true);
        });
      } else {
        setTimeout(() => setShouldAttachVideo(true), 200);
      }
    };

    if (document.readyState === 'complete') {
      scheduleAttach();
    } else {
      window.addEventListener('load', scheduleAttach, { once: true });
    }
  }, []);

  // 2. Watchdog timer: If video does not start playing within 3 seconds of being attached, preserve poster
  useEffect(() => {
    if (!shouldAttachVideo || videoPlaying || hasError) return;

    const timer = setTimeout(() => {
      if (!videoPlaying) {
        setHasError(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [shouldAttachVideo, videoPlaying, hasError]);

  // 3. IntersectionObserver & Tab Visibility management: pause when hidden/offscreen, resume when visible
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
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-charcoal ${className}`}
    >
      {/* High Priority Static Poster Image (Fast LCP) */}
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center transition-opacity duration-700 ease-out ${
          videoPlaying && !hasError ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Looping Ambient Video: Poster-first, lazy sources, watchdog safety */}
      {shouldAttachVideo && !hasError && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
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
