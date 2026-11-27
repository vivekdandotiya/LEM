'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function HeroTeddyAnimator() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', onMotionChange);

    // Pause when tab is inactive to preserve GPU / battery
    const handleVisibilityChange = () => {
      if (!videoRef.current) return;
      if (document.hidden) {
        videoRef.current.pause();
      } else if (!prefersReducedMotion) {
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver to pause when hero is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting && !prefersReducedMotion) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      mediaQuery.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="absolute bottom-0 left-0 w-[300px] sm:w-[420px] lg:w-[480px] xl:w-[520px] h-[400px] sm:h-[540px] lg:h-[620px] pointer-events-none select-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle cinematic warm amber rim light backdrop glow */}
      <div 
        className="absolute bottom-10 left-0 w-[420px] h-[420px] rounded-full blur-[90px] bg-[#FFAD49]/[0.14] pointer-events-none -translate-x-1/4" 
      />

      {/* Primary Video Animation (Cycles render: 10s loop with 3s hidden interval) */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`absolute bottom-0 left-0 w-full h-full object-contain object-left-bottom transition-opacity duration-500 will-change-transform ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/videos/hero/teddy-hero-anim.webm" type="video/webm" />
          <source src="/videos/hero/teddy-hero-anim.mp4" type="video/mp4" />
        </video>
      )}

      {/* Photorealistic High-Res Static Fallback (for initial render & prefers-reduced-motion) */}
      <div
        className={`absolute bottom-0 left-0 w-full h-full transition-opacity duration-500 ${
          prefersReducedMotion || !isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/hero/teddy-character-seamless.webp"
          alt="Lead Edge Marketers plush teddy bear"
          fill
          priority
          sizes="(max-width: 768px) 320px, 520px"
          className="object-contain object-left-bottom"
        />
      </div>
    </div>
  );
}
