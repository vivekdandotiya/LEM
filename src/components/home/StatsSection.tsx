import React from 'react';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';

interface StatBlock {
  metric: string;
  label: string;
  subtext: string;
  badge: string;
}

const stats: StatBlock[] = [
  {
    metric: '100%',
    label: 'Bespoke code',
    subtext: 'Zero bloated templates or generic theme overhead.',
    badge: 'CIR-02 Engineering Metric',
  },
  {
    metric: '<1.0s',
    label: 'Sub-second speed',
    subtext: 'Engineered for instant conversion velocity.',
    badge: 'CIR-02 Performance Standard',
  },
  {
    metric: '4-in-1',
    label: 'Unified disciplines',
    subtext: 'Creative, ads, search, and web combined.',
    badge: 'CIR-02 Service Model',
  },
];

export function StatsSection() {
  return (
    <section className="py-20 sm:py-24 bg-lime text-ink border-y border-ink/20 select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-ink/15">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-sm bg-ink" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-lime-ink font-bold">
                06 / STANDARDS
              </span>
            </div>
            {/* H2 max 7 words */}
            <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
              Built to perform without compromise.
            </h2>
          </div>
          <p className="text-xs font-mono text-lime-ink uppercase tracking-wider">
            All metrics subject to client authorization
          </p>
        </div>

        {/* 3 Big Blocks on Lime Band */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[20px] bg-paper-2/90 border border-ink/15 shadow-soft-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl sm:text-6xl font-display font-black text-ink tracking-tight">
                    {stat.metric}
                  </span>
                  <SparkleGlyph size={18} className="text-lime-ink" />
                </div>

                {/* Title max 4 words */}
                <h3 className="text-xl font-display font-bold text-ink mb-1">
                  {stat.label}
                </h3>

                {/* Subtext max 12 words */}
                <p className="text-sm font-sans text-grey-3 leading-snug">
                  {stat.subtext}
                </p>
              </div>

              {/* Honesty Badge */}
              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-grey-2 uppercase">Status</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime text-ink font-bold border border-ink/20">
                  {stat.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
