'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface CircleServiceRowProps {
  index: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  deliverables?: string[];
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  className?: string;
}

export function CircleServiceRow({
  index,
  slug,
  title,
  tagline,
  description,
  deliverables = [],
  imageSrc,
  imageAlt,
  reversed = false,
  className = '',
}: CircleServiceRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = rowRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of element through viewport (0 to 1)
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.2;

      if (rect.top > start) {
        setScrollProgress(0);
      } else if (rect.top < end) {
        setScrollProgress(1);
      } else {
        const p = (start - rect.top) / (start - end);
        setScrollProgress(Math.min(1, Math.max(0, p)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Circle perimeter calculation for r=150 (svg viewBox 0 0 320 320)
  const radius = 150;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <div
      ref={rowRef}
      className={`py-16 sm:py-24 border-b border-ink/10 last:border-b-0 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Visual Side with SVG Drawing Ring (5 cols) */}
          <div
            className={`lg:col-span-5 flex justify-center ${
              reversed ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              {/* Animated SVG Brushed Gold Drawing Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10"
                viewBox="0 0 320 320"
                aria-hidden="true"
              >
                {/* Background Track */}
                <circle
                  cx="160"
                  cy="160"
                  r={radius}
                  fill="none"
                  stroke="rgba(176, 141, 87, 0.15)"
                  strokeWidth="3"
                />
                {/* Dynamic Gold Progress Arc */}
                <circle
                  cx="160"
                  cy="160"
                  r={radius}
                  fill="none"
                  stroke="#B08D57"
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-[stroke-dashoffset] duration-150 ease-out"
                />
              </svg>

              {/* Masked Circular Image */}
              <div className="relative w-[calc(100%-24px)] h-[calc(100%-24px)] rounded-full overflow-hidden shadow-soft-lg border-2 border-white bg-charcoal">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 380px"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Number Badge */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-11 h-11 rounded-full bg-ink text-ivory font-mono text-xs font-bold flex items-center justify-center border-2 border-white shadow-soft-sm z-20">
                0{index}
              </div>
            </div>
          </div>

          {/* Text & Content Side (7 cols) */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center ${
              reversed ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                0{index} / CORE DISCIPLINE
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-ink tracking-tight leading-tight">
              {title}
            </h3>

            {tagline && (
              <p className="text-base sm:text-lg font-serif italic text-gold-deep mt-2">
                {tagline}
              </p>
            )}

            <p className="text-sm sm:text-base font-sans text-stone mt-4 leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Deliverables Chips */}
            {deliverables.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6">
                {deliverables.map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-ink/8 text-xs font-mono text-stone shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Link */}
            <div className="pt-8">
              <Link
                href={`/services/${slug}`}
                className="btn-primary inline-flex items-center gap-2 text-xs px-6 py-3 rounded-full font-semibold group"
              >
                <span>Explore {title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
