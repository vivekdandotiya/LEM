import React from 'react';
import Image from 'next/image';
import { HeroCreative } from '@/data/heroCreatives';

interface AdCardProps {
  creative: HeroCreative;
  priority?: boolean;
  isDecorative?: boolean;
  showConceptBadge?: boolean;
  className?: string;
}

export function AdCard({
  creative,
  priority = false,
  isDecorative = true,
  showConceptBadge = false,
  className = '',
}: AdCardProps) {
  const aspectClass =
    creative.ratio === '9:16'
      ? 'aspect-[9/16]'
      : creative.ratio === '1:1'
      ? 'aspect-square'
      : 'aspect-[4/5]';

  return (
    <article
      className={`relative w-full ${aspectClass} rounded-[24px] overflow-hidden border border-white/12 shadow-soft-md group select-none ${className}`}
      aria-hidden={isDecorative ? 'true' : undefined}
      data-cursor={!isDecorative ? 'view' : undefined}
      data-cursor-label="VIEW"
    >
      {/* Background Image */}
      <Image
        src={creative.image}
        alt={isDecorative ? '' : `${creative.brand} — ${creative.category}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Atmospheric Vignette Veil tailored by theme */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          creative.theme === 'light'
            ? 'bg-gradient-to-t from-ink/90 via-ink/30 to-ink/20'
            : creative.theme === 'color'
            ? 'bg-gradient-to-t from-ink/95 via-ink/40 to-ink/15'
            : 'bg-gradient-to-t from-ink/95 via-ink/50 to-ink/25'
        }`}
      />

      {/* Card Header Top Row */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
        {/* Brand Pill with Brand Dot */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/75 backdrop-blur-md border border-white/15 text-[12px] font-sans font-medium text-white shadow-sm">
          <i
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: creative.dot }}
            aria-hidden="true"
          />
          <span className="truncate max-w-[130px]">{creative.brand}</span>
        </span>

        {/* Category Tag */}
        <div className="flex items-center gap-1.5">
          {showConceptBadge && (
            <span className="sticker-badge text-[10px] py-0.5 px-2">Concept</span>
          )}
          <span className="px-2.5 py-1 rounded bg-white/15 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider uppercase text-white/90">
            {creative.category}
          </span>
        </div>
      </div>

      {/* Card Bottom: Headline & CTA Row */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end z-10">
        <h3 className="font-display font-bold text-white text-[18px] sm:text-[20px] leading-[1.1] tracking-tight line-clamp-2 mb-3">
          {creative.headline}
        </h3>

        {/* Hairline divider & CTA */}
        <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-mono">
          <span className="text-lime group-hover:text-lime-soft transition-colors flex items-center gap-1 font-sans font-bold">
            {creative.cta} <span aria-hidden="true">→</span>
          </span>
          <span className="text-white/60 font-mono tracking-widest text-[11px]">
            {creative.ratio}
          </span>
        </div>
      </div>
    </article>
  );
}
