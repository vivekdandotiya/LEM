'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { HERO_CREATIVES, HeroCreative } from '@/data/heroCreatives';

export interface PhotoWallProps {
  creatives?: HeroCreative[];
  speedSeconds?: number;
  className?: string;
  onSelect?: (creative: HeroCreative) => void;
}

export function PhotoWall({
  creatives = HERO_CREATIVES,
  speedSeconds = 60,
  className = '',
  onSelect,
}: PhotoWallProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Split into 3 alternating rows for a rich editorial mosaic wall
  const row1 = creatives.slice(0, 8);
  const row2 = creatives.slice(8, 16);
  const row3 = creatives.slice(16, 24);

  const renderCard = (c: HeroCreative, idx: number) => {
    return (
      <div
        key={`${c.id}-${idx}`}
        onClick={() => onSelect?.(c)}
        className="group relative flex-shrink-0 w-64 sm:w-80 aspect-[4/5] rounded-[24px] overflow-hidden bg-white border border-ink/10 shadow-soft-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-md hover:border-gold/50 cursor-pointer"
      >
        <Image
          src={c.image}
          alt={`${c.brand} — ${c.category}`}
          fill
          sizes="(max-width: 640px) 256px, 320px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="text-xs font-mono tracking-wider uppercase text-gold-soft">
            {c.category}
          </div>
          <div className="text-sm font-display font-bold leading-tight mt-0.5">
            {c.brand}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full overflow-hidden select-none py-8 flex flex-col gap-6 ${className}`}>
      {/* Row 1: Leftward drift */}
      <div className="relative flex overflow-hidden group">
        <div
          className={`flex gap-6 whitespace-nowrap ${
            !prefersReducedMotion ? 'animate-marquee-left group-hover:[animation-play-state:paused]' : ''
          }`}
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {row1.concat(row1).map((c, i) => renderCard(c, i))}
        </div>
      </div>

      {/* Row 2: Rightward drift */}
      <div className="relative flex overflow-hidden group">
        <div
          className={`flex gap-6 whitespace-nowrap ${
            !prefersReducedMotion ? 'animate-marquee-right group-hover:[animation-play-state:paused]' : ''
          }`}
          style={{ animationDuration: `${speedSeconds * 1.1}s` }}
        >
          {row2.concat(row2).map((c, i) => renderCard(c, i))}
        </div>
      </div>

      {/* Row 3: Leftward drift */}
      <div className="relative flex overflow-hidden group">
        <div
          className={`flex gap-6 whitespace-nowrap ${
            !prefersReducedMotion ? 'animate-marquee-left group-hover:[animation-play-state:paused]' : ''
          }`}
          style={{ animationDuration: `${speedSeconds * 0.9}s` }}
        >
          {row3.concat(row3).map((c, i) => renderCard(c, i))}
        </div>
      </div>
    </div>
  );
}
