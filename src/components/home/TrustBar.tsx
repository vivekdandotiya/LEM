'use client';

import React from 'react';
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge';
import ScrollMarquee from '@/motion/ScrollMarquee';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';

export function TrustBar() {
  const marqueeItems = [
    'Organic Search Architecture',
    'CIR-05: Meta Partner Pending',
    'Sub-Second Conversion Web',
    'CIR-05: Google Partner Pending',
    'Algorithmic Ad Scaling',
    'CIR-05: Verified Reviews Pending',
    'High-Retention Video Creative',
  ];

  return (
    <section className="border-b border-ink/10 py-6 overflow-hidden select-none bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-lime" />
            01 / Standards
          </span>
          <PlaceholderBadge label="CIR-05 Industry Validation Pending" />
        </div>
        <span className="text-[11px] font-mono text-grey-2 hidden sm:inline">
          Velocity-Reactive Strip
        </span>
      </div>

      {/* Velocity Reactive Marquee */}
      <ScrollMarquee speed={22} className="py-2.5 border-y border-ink/8 bg-paper-2/60 backdrop-blur-sm">
        <div className="inline-flex items-center gap-8 px-4">
          {marqueeItems.map((item, i) => (
            <div key={i} className="inline-flex items-center gap-8">
              <span
                className={`text-xs sm:text-sm font-mono tracking-wider uppercase ${
                  item.startsWith('CIR-')
                    ? 'text-ink font-bold px-2.5 py-0.5 rounded-full bg-lime border border-ink/20 shadow-sm'
                    : 'text-ink font-semibold'
                }`}
              >
                {item}
              </span>
              <SparkleGlyph size={12} className="text-lime" spin={true} />
            </div>
          ))}
        </div>
      </ScrollMarquee>
    </section>
  );
}
