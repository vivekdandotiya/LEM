'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { ResponsiveCardImage } from '@/components/ui/ResponsiveCardImage';

interface StageVideoProps {
  serviceSlug: string;
  activePhase: number;
  phaseTitle: string;
  className?: string;
}

export function StageVideo({
  serviceSlug,
  activePhase,
  phaseTitle,
  className = '',
}: StageVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  // 'A' or 'B' indicates which video element is currently active / visible
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');
  const [slotASrc, setSlotASrc] = useState<string>(
    `/videos/services/${serviceSlug}-phase-0`
  );
  const [slotBSrc, setSlotBSrc] = useState<string>('');
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [userWantsPlay, setUserWantsPlay] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<boolean>(false);

  const prevPhaseRef = useRef<number>(0);

  // Check user preferences
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData =
      (navigator as unknown as { connection?: { saveData?: boolean } })?.connection?.saveData || false;
    setIsReducedMotion(reduced || saveData);
  }, []);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNotHidden = el.offsetParent !== null && window.getComputedStyle(el).display !== 'none';
        const visible = entry.isIntersecting && isNotHidden;
        setIsVisible(visible);

        if (visible && !(isReducedMotion && !userWantsPlay)) {
          const currentVid = activeSlot === 'A' ? videoARef.current : videoBRef.current;
          const otherVid = activeSlot === 'A' ? videoBRef.current : videoARef.current;
          otherVid?.pause();
          currentVid?.play().catch(() => {});
        } else {
          videoARef.current?.pause();
          videoBRef.current?.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      videoARef.current?.pause();
      videoBRef.current?.pause();
    };
  }, [activeSlot, isReducedMotion, userWantsPlay]);

  // Handle phase switching with A/B cross-fade
  useEffect(() => {
    if (activePhase === prevPhaseRef.current) return;
    prevPhaseRef.current = activePhase;

    if (isReducedMotion && !userWantsPlay) return;

    const newBasePath = `/videos/services/${serviceSlug}-phase-${activePhase}`;

    if (activeSlot === 'A') {
      // Transition from A to B
      setSlotBSrc(newBasePath);
      const vidB = videoBRef.current;
      const vidA = videoARef.current;

      if (vidB) {
        vidB.currentTime = 0;
        vidB.load();
        vidB
          .play()
          .then(() => {
            setActiveSlot('B');
            setTimeout(() => {
              if (vidA) {
                vidA.pause();
              }
            }, 450);
          })
          .catch(() => {
            setActiveSlot('B');
          });
      }
    } else {
      // Transition from B to A
      setSlotASrc(newBasePath);
      const vidA = videoARef.current;
      const vidB = videoBRef.current;

      if (vidA) {
        vidA.currentTime = 0;
        vidA.load();
        vidA
          .play()
          .then(() => {
            setActiveSlot('A');
            setTimeout(() => {
              if (vidB) {
                vidB.pause();
              }
            }, 450);
          })
          .catch(() => {
            setActiveSlot('A');
          });
      }
    }
  }, [activePhase, activeSlot, serviceSlug, isReducedMotion, userWantsPlay]);

  const posterPath = `/videos/services/${serviceSlug}-phase-${activePhase}-poster.webp`;
  const showPosterFallback = (isReducedMotion && !userWantsPlay) || videoError;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-[#080A0B] rounded-[28px] overflow-hidden border border-ink/15 shadow-soft-lg flex flex-col justify-between select-none ${className}`}
    >
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #EEEBE3 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Screen reader description */}
      <div className="sr-only" aria-live="polite">
        Phase 0{activePhase + 1}: {phaseTitle} stage visualization
      </div>

      {/* Stage Top Bar (HTML Overlays) */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-gradient-to-b from-[#080A0B]/90 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
            PHASE 0{activePhase + 1} / {phaseTitle}
          </span>
        </div>

        {/* Permanent Corner "ILLUSTRATIVE" Sticker */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-ink/95 border border-white/10 text-xs font-mono tracking-widest uppercase text-lime shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          ILLUSTRATIVE
        </div>
      </div>

      {/* Video Display Arena (Aspect 16:10) */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        {/* Poster Image / Fallback */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 z-10 ${
            showPosterFallback ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ResponsiveCardImage
            src={posterPath}
            alt={`Phase 0${activePhase + 1} ${phaseTitle} architectural preview`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 800px"
          />
          {isReducedMotion && !userWantsPlay && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
              <button
                type="button"
                onClick={() => setUserWantsPlay(true)}
                className="px-4 py-2 rounded-full bg-gold text-charcoal font-mono text-xs font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
                aria-label="Play animated phase preview"
              >
                <Play className="w-3.5 h-3.5 fill-ink" />
                <span>Play Animation</span>
              </button>
            </div>
          )}
        </div>

        {/* Video Slot A */}
        <video
          ref={videoARef}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[450ms] ease-in-out ${
            activeSlot === 'A' && !showPosterFallback ? 'opacity-100 z-[5]' : 'opacity-0 z-0'
          }`}
        >
          {slotASrc && (
            <>
              <source src={`${slotASrc}.webm`} type="video/webm" />
              <source src={`${slotASrc}.mp4`} type="video/mp4" />
            </>
          )}
        </video>

        {/* Video Slot B */}
        <video
          ref={videoBRef}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[450ms] ease-in-out ${
            activeSlot === 'B' && !showPosterFallback ? 'opacity-100 z-[5]' : 'opacity-0 z-0'
          }`}
        >
          {slotBSrc && (
            <>
              <source src={`${slotBSrc}.webm`} type="video/webm" />
              <source src={`${slotBSrc}.mp4`} type="video/mp4" />
            </>
          )}
        </video>
      </div>

      {/* Stage Footer (HTML Overlays, No Invented Metrics) */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-5 border-t border-white/10 bg-gradient-to-t from-[#080A0B]/90 to-transparent font-mono text-xs text-grey-3">
        <span>STAGE ENGINE: ACTIVE</span>
        <span className="text-lime font-bold uppercase">
          WORKFLOW: {phaseTitle}
        </span>
      </div>
    </div>
  );
}
