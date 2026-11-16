'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ResponsiveImage } from '@/data/media';
import { ArrowRight, Layers, Eye, Smartphone, Monitor, Video } from 'lucide-react';

export type StepTransitionStyle = 'lens' | 'feed' | 'stories' | 'browser' | 'iris';

export interface StepItem {
  number: string;
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
    avifSrcSet?: string;
    webpSrcSet?: string;
    aspectRatio?: string;
  };
  deliverable: string;
}

export interface StepPhotoSectionProps {
  style: StepTransitionStyle;
  serviceTitle: string;
  steps: StepItem[];
  className?: string;
}

export function StepPhotoSection({
  style,
  serviceTitle,
  steps,
  className = '',
}: StepPhotoSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep] || steps[0];

  const getStyleBadge = () => {
    switch (style) {
      case 'lens':
        return { label: 'Lens Focus Mode', icon: Eye };
      case 'feed':
        return { label: 'Ad Feed Stream', icon: Layers };
      case 'stories':
        return { label: 'Vertical Story Flow', icon: Smartphone };
      case 'browser':
        return { label: 'Interactive Canvas', icon: Monitor };
      case 'iris':
        return { label: 'Cinematic Shutter', icon: Video };
    }
  };

  const badge = getStyleBadge();
  const Icon = badge.icon;

  return (
    <section className={`py-20 sm:py-28 border-b border-ink/10 bg-[#F6F3EC] select-none ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-ink/10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                HOW WE DELIVER
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink tracking-tight">
              {serviceTitle} roadmap.
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-ink/10 text-xs font-mono text-stone">
            <Icon className="w-3.5 h-3.5 text-gold" />
            <span>{badge.label}</span>
          </div>
        </div>

        {/* Interactive Step Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Step Selector List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-5 rounded-[20px] transition-all duration-300 border flex flex-col gap-1.5 ${
                    isActive
                      ? 'bg-white border-gold/60 shadow-soft-md'
                      : 'bg-white/60 border-ink/8 hover:bg-white hover:border-ink/15 text-stone'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-gold-deep' : 'text-stone'
                      }`}
                    >
                      STEP {step.number}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-gold" />
                    )}
                  </div>
                  <h4
                    className={`text-base font-display font-bold ${
                      isActive ? 'text-ink' : 'text-stone'
                    }`}
                  >
                    {step.name}
                  </h4>
                  <p className="text-xs font-sans text-stone line-clamp-2 leading-relaxed">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Visual Showcase (7 cols) tailored to transition style */}
          <div className="lg:col-span-7">
            <div className="relative w-full rounded-[28px] overflow-hidden bg-charcoal border border-ink/15 shadow-soft-lg">
              {/* Style 1: Lens / Magnifier */}
              {style === 'lens' && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-700 ease-out scale-100 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-ink uppercase tracking-wider">
                    Focal Scan Active
                  </div>
                </div>
              )}

              {/* Style 2: Feed / Ad Feed */}
              {style === 'feed' && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-ink uppercase tracking-wider">
                    Paid Creative Stream
                  </div>
                </div>
              )}

              {/* Style 3: Stories / 9:16 Frame */}
              {style === 'stories' && (
                <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center bg-graphite p-6">
                  <div className="relative w-64 aspect-[9/16] rounded-[22px] overflow-hidden shadow-2xl border-2 border-white/20">
                    <Image
                      src={current.image.src}
                      alt={current.image.alt}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex gap-1">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i === activeStep ? 'bg-gold' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Style 4: Browser Frame */}
              {style === 'browser' && (
                <div className="relative aspect-[16/10] overflow-hidden flex flex-col bg-charcoal">
                  <div className="h-9 bg-[#2B2D30] border-b border-white/10 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="mx-auto px-4 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-white/60">
                      leadedge.marketing/{current.number}
                    </div>
                  </div>
                  <div className="relative flex-1 overflow-hidden">
                    <Image
                      src={current.image.src}
                      alt={current.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Style 5: Iris Shutter */}
              {style === 'iris' && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    Editorial Aperture
                  </div>
                </div>
              )}

              {/* Overlay Metadata Bar */}
              <div className="p-5 sm:p-6 bg-white border-t border-ink/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-stone uppercase tracking-widest">
                    Step Output
                  </div>
                  <div className="text-sm font-display font-bold text-ink mt-0.5">
                    {current.deliverable}
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-gold-deep">
                  0{activeStep + 1} / 0{steps.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
