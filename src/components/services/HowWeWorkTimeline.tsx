'use client';

import React, { useRef } from 'react';
import { ServiceStep } from '@/data/services';
import Tilt3D from '@/motion/Tilt3D';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HowWeWorkTimelineProps {
  steps: ServiceStep[];
  serviceTitle: string;
}

export function HowWeWorkTimeline({ steps, serviceTitle }: HowWeWorkTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!lineRef.current) return;
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-ink text-white relative overflow-hidden dark-dots border-y border-white/10"
      data-theme="dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="pb-12 border-b border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-grey-2 font-semibold">
              EXECUTION ROADMAP
            </span>
          </div>

          <h2 className="text-fs-lg font-display font-extrabold text-white tracking-tight leading-[0.96] max-w-2xl">
            How we deliver <span className="serif-swap text-lime">{serviceTitle}.</span>
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative pt-12 sm:pt-16">
          {/* Scroll-drawn Lime Line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[92px] left-0 right-0 h-[2px] bg-lime origin-left z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <Tilt3D key={step.number} maxTilt={6}>
                <div className="p-6 sm:p-7 rounded-[22px] bg-charcoal border border-white/10 flex flex-col justify-between h-full group hover:border-lime/40 transition-all duration-300">
                  <div>
                    {/* Giant Outlined Step Numeral */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl sm:text-5xl font-display font-extrabold text-outline-dark group-hover:text-lime transition-colors">
                        {step.number}
                      </span>
                      <span className="text-[10px] font-mono text-grey-2 uppercase px-2.5 py-1 rounded-full bg-white/10">
                        Step {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-white mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-sans text-grey-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-grey-2">
                    <span>Phase 0{idx + 1}</span>
                    <span className="text-lime">→</span>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
