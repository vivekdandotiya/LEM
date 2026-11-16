'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { BRAND_NAME } from '@/data/site';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';
import './intro.css';

const HERO_PRELOAD_IMAGES = [
  '/images/hero/hero-01-trailnest-cabin-4x5.webp',
  '/images/hero/hero-02-hillcrest-homes-4x5.webp',
  '/images/hero/hero-03-greenleaf-botanical-9x16.webp',
];

export function BrandFloodIntro() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const floodRef = useRef<HTMLDivElement>(null);
  const backWaveRef = useRef<SVGSVGElement>(null);
  const frontWaveRef = useRef<SVGSVGElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const penDotRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const dropletsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const brandCharacters = BRAND_NAME.split('');

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('le-intro', '1');
    } catch {
      // Ignore in private browsing / blocked storage
    }
    window.dispatchEvent(new CustomEvent('preloader:done'));
    document.body.style.overflow = '';
    setIsCompleted(true);
  }, []);

  const handleSkip = useCallback(() => {
    if (isCompleted) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    window.dispatchEvent(new CustomEvent('preloader:revealing'));

    const flood = floodRef.current;
    const stage = stageRef.current;

    if (flood && stage) {
      gsap.to(flood, {
        y: '-140%',
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.to(stage, {
            opacity: 0,
            duration: 0.25,
            onComplete: finishIntro,
          });
        },
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

  // Main Intro Sequence Animation
  useEffect(() => {
    if (!mounted || isCompleted) return;

    const stage = stageRef.current;
    const flood = floodRef.current;
    const backWave = backWaveRef.current;
    const frontWave = frontWaveRef.current;
    const penDot = penDotRef.current;
    const subtitle = subtitleRef.current;
    const progressBar = progressBarRef.current;
    const dropletsContainer = dropletsRef.current;

    if (!stage || !flood || !backWave || !frontWave || !penDot) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isInnerPage = window.location.pathname !== '/' && !window.location.search.includes('intro=1');

    // Readiness gate: decode top images and ensure fonts ready
    const fontReadyPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const imagesReadyPromise = Promise.all(
      HERO_PRELOAD_IMAGES.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            if (img.decode) {
              img.decode().then(resolve).catch(resolve);
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      )
    );

    // Continuous wave horizontal drift
    const waveBackDrift = gsap.to(backWave, {
      xPercent: -50,
      duration: 3.5,
      ease: 'none',
      repeat: -1,
    });

    const waveFrontDrift = gsap.to(frontWave, {
      xPercent: -45,
      duration: 2.8,
      ease: 'none',
      repeat: -1,
    });

    // Create Main Master Timeline
    const tl = gsap.timeline({
      onComplete: finishIntro,
    });
    timelineRef.current = tl;

    if (prefersReducedMotion) {
      // High-speed accessible cross-fade (1.2s total)
      tl.to({}, { duration: 0.3 })
        .call(() => setProgress(50))
        .to(subtitle, { opacity: 1, duration: 0.4 })
        .call(() => {
          setProgress(100);
          window.dispatchEvent(new CustomEvent('preloader:revealing'));
        })
        .to(stage, { opacity: 0, duration: 0.5, delay: 0.2 });
      return;
    }

    // Set initial states
    gsap.set(flood, { y: '105%' });
    gsap.set(penDot, { opacity: 0 });
    gsap.set(subtitle, { opacity: 0, y: 12 });

    const totalChars = charRefs.current.filter(Boolean).length;
    const durationMultiplier = isInnerPage ? 0.6 : 1.0;

    // Progress counter simulation (0 -> 100)
    tl.to(
      {},
      {
        duration: 3.2 * durationMultiplier,
        onUpdate: function () {
          const p = Math.round(this.progress() * 100);
          setProgress(p);
        },
        ease: 'power1.inOut',
      },
      0
    );

    // 0.20 -> 1.55s: Draw brand name letter-by-letter with lime pen dot
    tl.set(penDot, { opacity: 1 }, 0.2 * durationMultiplier);

    charRefs.current.forEach((charEl, idx) => {
      if (!charEl) return;
      const charTime = (0.22 + (idx / totalChars) * 1.3) * durationMultiplier;

      tl.to(
        charEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          ease: 'power2.out',
          onStart: () => {
            const rect = charEl.getBoundingClientRect();
            gsap.set(penDot, {
              left: rect.right,
              top: rect.top + rect.height * 0.5,
            });
          },
        },
        charTime
      );
    });

    // Subtitle reveal + pen dot fade
    tl.to(
      penDot,
      {
        opacity: 0,
        scale: 0.4,
        duration: 0.25,
      },
      1.55 * durationMultiplier
    );

    tl.to(
      subtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      },
      1.55 * durationMultiplier
    );

    // 1.55 -> 1.90s: Hold complete name on paper

    // 1.90 -> 3.05s: Liquid Black Flood surges upward
    tl.to(
      flood,
      {
        y: '-30%',
        duration: 1.25 * durationMultiplier,
        ease: 'power3.inOut',
      },
      1.9 * durationMultiplier
    );

    // Droplets burst upward near crest peak
    if (dropletsContainer) {
      const dropletNodes = dropletsContainer.children;
      for (let i = 0; i < dropletNodes.length; i++) {
        const d = dropletNodes[i] as HTMLElement;
        const angle = -1.2 + (i / dropletNodes.length) * 2.4;
        const launchX = Math.sin(angle) * 70;
        const launchY = -60 - Math.random() * 40;

        tl.fromTo(
          d,
          { opacity: 0, x: 0, y: 0, scale: 0.6 },
          {
            opacity: 1,
            x: launchX,
            y: launchY,
            duration: 0.4,
            ease: 'power2.out',
          },
          (2.2 + i * 0.04) * durationMultiplier
        ).to(
          d,
          {
            y: launchY + 50,
            opacity: 0,
            duration: 0.35,
            ease: 'power1.in',
          },
          (2.55 + i * 0.04) * durationMultiplier
        );
      }
    }

    // 3.05 -> 3.35s: Black holds full screen, bar flashes, reaches 100%
    tl.call(
      () => {
        setProgress(100);
        if (progressBar) {
          progressBar.classList.add('is-flashing');
        }
      },
      undefined,
      3.05 * durationMultiplier
    );

    // 3.35 -> 4.30s: Black curtain drains upward uncovering site
    // At 3.50s: Dispatch preloader:revealing to start hero entrance
    tl.call(
      () => {
        window.dispatchEvent(new CustomEvent('preloader:revealing'));
      },
      undefined,
      3.45 * durationMultiplier
    );

    tl.to(
      flood,
      {
        y: '-140%',
        duration: 0.95 * durationMultiplier,
        ease: 'power4.inOut',
      },
      3.35 * durationMultiplier
    );

    tl.to(
      stage,
      {
        opacity: 0,
        duration: 0.35 * durationMultiplier,
      },
      4.1 * durationMultiplier
    );

    // Safety fallback: if readiness promises take time, ensure timeline runs smoothly
    Promise.all([fontReadyPromise, imagesReadyPromise]).catch(() => {
      // Continue even on network failure
    });

    return () => {
      waveBackDrift.kill();
      waveFrontDrift.kill();
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [mounted, isCompleted, finishIntro]);

  if (!mounted || isCompleted) return null;

  return (
    <div ref={stageRef} className="brand-intro-stage" aria-label="Lead Edge Marketing Brand Introduction">
      {/* 1. Top 3px Lime Progress Line */}
      <div
        ref={progressBarRef}
        className="brand-intro-progress-bar"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* 2. Top-Right Skip Button & Top Navigation Area */}
      <div className="relative z-50 w-full px-6 py-5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
          Studio Launch
        </span>
        <button
          onClick={handleSkip}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ink/20 bg-paper text-xs font-mono font-medium text-ink/80 hover:text-ink hover:border-lime transition-all duration-200"
          aria-label="Skip introduction animation (Press Escape)"
        >
          <span className="text-[10px] text-grey-2 group-hover:text-lime transition-colors">ESC</span>
          <span className="w-1 h-1 rounded-full bg-ink/30 group-hover:bg-lime" />
          <span>Skip intro</span>
        </button>
      </div>

      {/* 3. Center Brand Title & Subtitle with Pen Dot */}
      <div className="brand-intro-center">
        <h1 className="brand-intro-title">
          {brandCharacters.map((char, index) => {
            const isSpace = char === ' ';
            return (
              <span
                key={index}
                ref={(el) => {
                  charRefs.current[index] = el;
                }}
                className={`brand-intro-char ${isSpace ? 'is-space' : ''}`}
              >
                {isSpace ? '\u00A0' : char}
              </span>
            );
          })}
        </h1>

        <div ref={subtitleRef} className="brand-intro-subtitle">
          <SparkleGlyph size={14} spin={true} />
          <span>Digital growth studio</span>
        </div>

        {/* 6px Lime Pen Dot Edge Marker */}
        <div ref={penDotRef} className="brand-intro-pen-dot" aria-hidden="true" />

        {/* Droplets container for flood surge */}
        <div
          ref={dropletsRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="brand-intro-droplet" />
          ))}
        </div>
      </div>

      {/* 4. Bottom Row: Mono 00-100 Progress & Studio Coordinates */}
      <div className="relative z-50 w-full px-6 py-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink/60">
        <div>
          <span>INIT // </span>
          <span className="font-bold text-ink">
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span>%</span>
        </div>
        <span className="hidden sm:inline text-grey-2">LONDON • EDITORIAL CREATIVE & GROWTH</span>
      </div>

      {/* 5. The Liquid Black Flood Curtain */}
      <div ref={floodRef} className="brand-intro-flood-curtain" aria-hidden="true">
        <div className="brand-intro-wave-container">
          {/* Back Wave (Dark Charcoal #17191B) */}
          <svg
            ref={backWaveRef}
            className="brand-intro-wave-svg brand-intro-wave-back"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
          >
            <path d="M 0,160 Q 360,90 720,160 T 1440,160 T 2160,160 T 2880,160 V 320 H 0 Z" />
          </svg>

          {/* Front Wave (Deep Ink #0F1011) with Gold Crest Hairline */}
          <svg
            ref={frontWaveRef}
            className="brand-intro-wave-svg brand-intro-wave-front"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
          >
            <path d="M 0,110 Q 360,30 720,110 T 1440,110 T 2160,110 T 2880,110 V 320 H 0 Z" />
            <path
              d="M 0,110 Q 360,30 720,110 T 1440,110 T 2160,110 T 2880,110"
              stroke="#B08D57"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Solid Flood Body Below Waves */}
          <div className="brand-intro-flood-body" />
        </div>
      </div>
    </div>
  );
}
export default BrandFloodIntro;
