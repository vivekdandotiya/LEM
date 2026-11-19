'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_DATA, ProcessPhase } from '@/data/processes';
import { SeoScene } from './scenes/SeoScene';
import { MetaScene } from './scenes/MetaScene';
import { SocialScene } from './scenes/SocialScene';
import { WebScene } from './scenes/WebScene';
import { CheckCircle2, ChevronRight, SkipForward } from 'lucide-react';
import { StackSeparate } from '@/components/stack/StackSeparate';
import { StageVideo } from '@/components/services/StageVideo';

interface ProcessStageProps {
  slug: string;
}

export function ProcessStage({ slug }: ProcessStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const processData = PROCESS_DATA[slug] || PROCESS_DATA['seo'];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const checkReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(checkReduced);

    const mql = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [slug]);

  const scrollToPhase = (idx: number) => {
    setActivePhase(idx);
    const st = ScrollTrigger.getAll().find((s) => s.trigger === containerRef.current);
    if (!st) return;

    // Calculate target scroll position within pin range
    const scrollRange = st.end - st.start;
    const targetScroll = st.start + (idx / 3.9) * scrollRange;

    const activeLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
    if (activeLenis) {
      activeLenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const skipWalkthrough = (e: React.MouseEvent) => {
    e.preventDefault();
    const st = ScrollTrigger.getAll().find((s) => s.trigger === containerRef.current);
    if (!st) return;

    const activeLenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
    if (activeLenis) {
      activeLenis.scrollTo(st.end + 20, { duration: 0.8 });
    } else {
      window.scrollTo({ top: st.end + 20, behavior: 'smooth' });
    }
  };

  const renderScene = (phaseIndex: number, isStatic = false) => {
    switch (slug) {
      case 'seo':
        return <SeoScene activePhase={phaseIndex} isStatic={isStatic} />;
      case 'meta-ads':
        return <MetaScene activePhase={phaseIndex} isStatic={isStatic} />;
      case 'social-media':
        return <SocialScene activePhase={phaseIndex} isStatic={isStatic} />;
      case 'web-development':
        return <WebScene activePhase={phaseIndex} isStatic={isStatic} />;
      default:
        return <SeoScene activePhase={phaseIndex} isStatic={isStatic} />;
    }
  };

  // Prefers Reduced Motion: Static 2x2 Grid View
  if (isReducedMotion) {
    return (
      <section className="py-20 sm:py-28 bg-transparent border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
              <span className="text-xs font-mono tracking-widest uppercase text-grey-3 font-semibold">
                {processData.eyebrow}
              </span>
            </div>
            <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
              {processData.headingPrefix}{' '}
              <span className="serif-swap text-ink">{processData.headingItalic}</span>{' '}
              {processData.headingSuffix}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processData.phases.map((phase, idx) => (
              <div key={phase.id} className="p-6 rounded-[24px] bg-paper-2 border border-ink/10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-lime font-bold">{phase.monoLabel}</span>
                  <span className="font-mono text-xs text-grey-3">ILLUSTRATIVE</span>
                </div>
                <h3 className="font-display font-bold text-xl text-ink">{phase.headline}</h3>
                <p className="font-sans text-sm text-grey-3">{phase.body}</p>
                <div className="h-64 rounded-xl overflow-hidden mt-2">
                  <StageVideo
                    serviceSlug={slug}
                    activePhase={idx}
                    phaseTitle={phase.headline}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-transparent border-b border-ink/10 scroll-mt-24" id="how-we-deliver">
      {/* =====================================================================
          DESKTOP PINNED VIEWPORT (lg:flex)
          ===================================================================== */}
      <div
        ref={pinRef}
        className="hidden lg:flex w-full min-h-screen items-center justify-center pt-24 pb-12"
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-12 gap-10 items-center">
          {/* Left Column (38% width -> col-span-5) */}
          <div className="col-span-5 flex flex-col justify-between h-[620px] py-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
                <span className="text-xs font-mono tracking-widest uppercase text-grey-3 font-semibold">
                  {processData.eyebrow}
                </span>
              </div>

              {/* H2 max 7 words */}
              <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96] mb-8">
                {processData.headingPrefix}{' '}
                <span className="serif-swap text-ink">{processData.headingItalic}</span>{' '}
                {processData.headingSuffix}
              </h2>

              {/* Stack-Then-Separate Phase Cards (List Layout) */}
              <StackSeparate
                items={processData.phases}
                layout="list"
                triggerRef={containerRef}
                pinRef={pinRef}
                onStepChange={(step) => {
                  setActivePhase(step);
                  const pct = Math.round(((step + 1) / processData.phases.length) * 100);
                  if (progressFillRef.current) {
                    progressFillRef.current.style.width = `${pct}%`;
                  }
                  if (progressTextRef.current) {
                    progressTextRef.current.textContent = `${pct}%`;
                  }
                }}
                renderCard={(phase, idx, isPeeled, isActive) => (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => scrollToPhase(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors duration-300 relative overflow-hidden h-[105px] flex flex-col justify-between cursor-pointer ${
                      isActive
                        ? 'bg-paper-2 border-lime shadow-soft-sm opacity-100 scale-[1.01]'
                        : isPeeled
                        ? 'bg-paper-2/95 border-ink/10 opacity-90 hover:opacity-100'
                        : 'bg-paper-2/80 border-ink/10 opacity-75'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-lime" />
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs tracking-wider uppercase font-bold text-ink">
                        {phase.monoLabel}
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold text-ink bg-lime px-2 py-0.5 rounded">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-grey-3">
                          PHASE 0{idx + 1}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-ink text-sm sm:text-base leading-tight line-clamp-1">
                      {phase.headline}
                    </h4>
                    <p className="font-sans text-xs text-grey-3 truncate">
                      {phase.deliverables.join(' · ')}
                    </p>
                  </button>
                )}
              />
            </div>

            {/* Bottom Controls: Progress & Skip Walkthrough */}
            <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-ink/10 rounded-full overflow-hidden">
                  <div
                    ref={progressFillRef}
                    className="h-full bg-lime transition-all duration-300"
                    style={{ width: '0%' }}
                  />
                </div>
                <span ref={progressTextRef} className="font-mono text-xs text-grey-3 font-semibold">
                  0%
                </span>
              </div>

              <button
                onClick={skipWalkthrough}
                className="text-xs font-mono text-grey-3 hover:text-ink underline flex items-center gap-1"
              >
                <span>Skip interactive walkthrough</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column (62% width -> col-span-7) */}
          <div className="col-span-7 h-[620px] relative">
            {isDesktop && (
              <StageVideo
                key={`${slug}-${isDesktop}`}
                serviceSlug={slug}
                activePhase={activePhase}
                phaseTitle={processData.phases[activePhase]?.headline || ''}
              />
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MOBILE UNPINNED STACKED VIEW (< 1024px)
          ===================================================================== */}
      <div className="lg:hidden py-16 px-4 sm:px-6 scroll-mt-24">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
            <span className="text-xs font-mono tracking-widest uppercase text-grey-3 font-semibold">
              {processData.eyebrow}
            </span>
          </div>
          <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
            {processData.headingPrefix}{' '}
            <span className="serif-swap text-ink">{processData.headingItalic}</span>{' '}
            {processData.headingSuffix}
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {processData.phases.map((phase, idx) => (
            <div
              key={phase.id}
              className="p-5 rounded-[22px] bg-paper-2 border border-ink/10 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink font-bold">{phase.monoLabel}</span>
                <span className="font-mono text-xs text-lime bg-ink px-2 py-0.5 rounded font-bold">
                  ILLUSTRATIVE
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-ink">{phase.headline}</h3>
              <p className="font-sans text-xs text-grey-3 leading-relaxed">{phase.body}</p>

              {/* Deliverable chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {phase.deliverables.map((item, dIdx) => (
                  <span
                    key={dIdx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 border border-ink/10 text-xs font-mono text-ink"
                  >
                    <CheckCircle2 className="w-3 h-3 text-lime" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              {/* Dedicated mini-stage illustration */}
              <div className="h-72 rounded-xl overflow-hidden mt-2">
                {!isDesktop && (
                  <StageVideo
                    serviceSlug={slug}
                    activePhase={idx}
                    phaseTitle={phase.headline}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
