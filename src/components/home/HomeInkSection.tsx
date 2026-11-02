'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Magnetic } from '@/motion/Magnetic';

const InkThatReveals = dynamic(
  () => import('@/components/animorio/ink/InkThatReveals'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] flex items-center justify-center bg-transparent text-ink font-display text-4xl sm:text-6xl uppercase font-extrabold tracking-tight opacity-20">
        Momentum
      </div>
    ),
  }
);

export function HomeInkSection() {
  return (
    <section className="relative bg-transparent overflow-hidden py-20 sm:py-28 border-y border-ink/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
              04 / MOMENTUM
            </span>
          </div>
          <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
            Fluid intelligence that <span className="serif-swap text-ink">compounds.</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-grey-3 uppercase tracking-wider max-w-xs">
          Interactive WebGL2 Interlude · Drag across paper
        </p>
      </div>

      {/* WebGL2 Ink Canvas */}
      <div className="w-full relative">
        <InkThatReveals
          word="Momentum"
          height="min(70svh, 640px)"
          hint="Move cursor across paper to dissolve the surface."
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-ink/10">
        <p className="text-base sm:text-lg font-sans text-grey-3 max-w-xl leading-relaxed">
          Growth is engineered through technical foundations and relentless creative momentum.
        </p>

        <Magnetic strength={0.25}>
          <Link href="/about" className="btn-secondary self-start md:self-auto">
            Discover our methodology →
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
