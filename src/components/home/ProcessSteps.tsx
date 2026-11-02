'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { business } from '@/data/business';

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
    <section className="py-24 sm:py-32 bg-transparent" id="process">
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
              Four steps to steady <span className="serif-swap text-ink">momentum.</span>
            </h2>
          </div>
          <p className="text-sm font-sans text-grey-3 max-w-xs leading-relaxed">
            A repeatable roadmap uniting creative, media, and web under one roof.
          </p>
        </div>

        {/* Process Content Grid with Photo Crossfade */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 4 Interactive Steps with Giant Outlined Numerals */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {business.process.map((p, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={p.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative p-6 sm:p-7 rounded-[20px] transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-paper-2 border-ink/20 shadow-soft-sm'
                      : 'bg-transparent border-transparent hover:bg-paper-2/50'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    {/* Giant Outlined Numeral */}
                    <span
                      className={`text-5xl sm:text-6xl font-display font-extrabold leading-none transition-colors duration-300 ${
                        isActive ? 'text-ink' : 'text-outline'
                      }`}
                    >
                      {p.step}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-2xl font-display font-bold text-ink">
                          {p.name}
                        </h3>
                        {isActive && (
                          <span className="w-2.5 h-2.5 rounded-full bg-lime shadow-sm" />
                        )}
                      </div>
                      {/* Short Description: max 12 words */}
                      <p className="text-sm sm:text-base font-sans text-grey-3 leading-snug">
                        {shortStepDescriptions[idx]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky / Crossfading Photo Panel */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-[24px] overflow-hidden border border-ink/10 shadow-soft-md card-glass-elevated">
            {stepImages.map((src, idx) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  activeStep === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                }`}
              >
                <Image
                  src={src}
                  alt={`Process step ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
                  <span className="text-xs font-mono tracking-widest uppercase">
                    Stage {business.process[activeStep].step}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-lime text-ink font-mono font-bold text-xs">
                    {business.process[activeStep].name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
