'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { business } from '@/data/business';
import { StackSeparate } from '@/components/stack/StackSeparate';
import { InkDripText } from '@/motion/InkDrip';

const stepImages = [
  '/images/pages/P10-about-process-1x1.webp',
  '/images/pages/P02-services-seo-audit-4x5.webp',
  '/images/pages/P06-services-social-calendar-4x5.webp',
  '/images/pages/P08-services-web-devices-16x9.webp',
];

const shortStepDescriptions = [
  'Audit assets and define growth thesis.',
  'Design creative architecture and media roadmap.',
  'Deploy campaigns and conversion web builds.',
  'Amplify winning angles and compound momentum.',
];

export function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-transparent content-auto" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="pb-12 border-b border-ink/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                05 / PROCESS
              </span>
            </div>
            {/* H2 max 7 words with Outline + Fill */}
            <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
              <InkDripText text="Four steps to steady" color="#080A0B" maxDrips={1} />{' '}
              <span className="serif-swap text-ink">momentum.</span>
            </h2>
          </div>
          <p className="text-sm font-sans text-grey-3 max-w-xs leading-relaxed">
            A repeatable roadmap uniting creative, media, and web under one roof.
          </p>
        </div>

        {/* 4-Step Row with Stack-Then-Separate Animation */}
        <div className="pt-12">
          <StackSeparate
            items={business.process}
            layout="row"
            onStepChange={(step) => setActiveStep(step)}
            renderCard={(p, idx, isPeeled, isActive) => (
              <div
                className={`group relative p-5 sm:p-6 rounded-[22px] border transition-colors duration-300 flex flex-col justify-between h-[360px] sm:h-[380px] overflow-hidden ${
                  isActive
                    ? 'bg-paper-2 border-lime shadow-soft-md'
                    : isPeeled
                    ? 'bg-paper-2 border-ink/10 shadow-soft-sm'
                    : 'bg-paper-2/90 border-ink/10'
                }`}
              >
                <div>
                  {/* Top Image Preview */}
                  <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-4 border border-ink/10">
                    <Image
                      src={stepImages[idx]}
                      alt={`Process step ${p.step}: ${p.name}`}
                      fill
                      decoding="async"
                      sizes="(max-width: 1024px) 100vw, 300px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-ink/90 text-[10px] font-mono text-white font-bold">
                      {p.step}
                    </div>
                  </div>

                  {/* Step Title */}
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-ink">
                      {p.name}
                    </h3>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-lime shadow-sm" />
                    )}
                  </div>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm font-sans text-grey-3 leading-snug">
                    {shortStepDescriptions[idx]}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="pt-3 border-t border-ink/8 flex items-center justify-between font-mono text-[10px] text-grey-3">
                  <span>STEP {p.step}</span>
                  <span className={isActive ? 'text-lime font-bold' : ''}>
                    {isActive ? 'IN PROGRESS' : 'ROADMAP'}
                  </span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
