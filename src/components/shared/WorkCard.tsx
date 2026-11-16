'use client';

import React from 'react';
import Image from 'next/image';
import { LightboxItem } from './Lightbox';
import { ArrowUpRight } from 'lucide-react';

export interface WorkCardProps {
  item: LightboxItem;
  aspectRatio?: '16/9' | '4/5' | '1/1';
  onSelect?: (item: LightboxItem) => void;
  className?: string;
}

export function WorkCard({
  item,
  aspectRatio = '4/5',
  onSelect,
  className = '',
}: WorkCardProps) {
  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : 'aspect-[4/5]';

  return (
    <article
      onClick={() => onSelect?.(item)}
      className={`group relative rounded-[22px] overflow-hidden bg-white border border-ink/10 shadow-soft-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft-md cursor-pointer flex flex-col ${className}`}
    >
      {/* Visual Thumbnail */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-charcoal`}>
        <Image
          src={item.image}
          alt={`${item.brand} — ${item.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient on bottom of image */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-semibold tracking-wider uppercase text-ink border border-ink/5">
          {item.category}
        </div>

        {/* Expand Arrow Icon Button */}
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink group-hover:bg-gold group-hover:text-ink transition-colors shadow-sm">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Meta Content */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="text-[11px] font-mono text-stone tracking-wider uppercase mb-1">
            {item.brand}
          </div>
          <h3 className="text-base sm:text-lg font-display font-bold text-ink group-hover:text-gold-deep transition-colors leading-snug">
            {item.title}
          </h3>
        </div>

        {item.description && (
          <p className="text-xs font-sans text-stone mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
