'use client';

import React from 'react';

export function KineticGrowthGraph() {
  return (
    <div className="relative w-full h-44 rounded-xl bg-charcoal-900 border border-charcoal-800 p-4 overflow-hidden flex flex-col justify-between shadow-inner">
      <div className="flex items-center justify-between text-[10px] font-mono text-warmgray-400">
        <span className="flex items-center gap-1.5 text-accent-tint">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          Compounding Velocity
        </span>
        <span>Telemetry Active</span>
      </div>

      {/* SVG Kinetic Line with animated dashoffset */}
      <svg viewBox="0 0 300 80" className="w-full h-24 stroke-accent fill-none overflow-visible">
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A28156" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#C9A66B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E6D3B3" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Subtle grid lines */}
        <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
        <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

        {/* Dynamic compounding growth path */}
        <path
          d="M 10,70 Q 70,68 120,54 T 220,24 T 290,8"
          stroke="url(#curveGradient)"
          strokeWidth="2.5"
          className="stroke-[url(#curveGradient)]"
        />
        {/* Glowing node at tip */}
        <circle cx="290" cy="8" r="4" fill="#C9A66B" className="animate-pulse" />
      </svg>

      <div className="flex items-center justify-between text-[11px] font-mono text-warmgray-300 border-t border-white/10 pt-2">
        <span>Attribution Baseline: Q1</span>
        <span className="text-accent font-semibold">+64.8% LTV Efficiency</span>
      </div>
    </div>
  );
}

export function KineticNodeCluster() {
  return (
    <div className="relative w-full h-44 rounded-xl bg-charcoal-900 border border-charcoal-800 p-4 overflow-hidden flex flex-col justify-between shadow-inner">
      <div className="flex items-center justify-between text-[10px] font-mono text-warmgray-400">
        <span className="text-accent-tint">Integrated Growth Engine</span>
        <span>Unified Disciplines</span>
      </div>

      <div className="flex items-center justify-center my-auto relative h-20">
        {/* Concentric rotating orbital rings */}
        <div className="absolute w-24 h-24 rounded-full border border-dashed border-accent/30 animate-[spin_24s_linear_infinite]" />
        <div className="absolute w-16 h-16 rounded-full border border-white/15" />
        
        {/* Core Monogram */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-accent-tint flex items-center justify-center text-charcoal-900 font-bold font-mono text-xs shadow-glow-accent z-10">
          LE
        </div>

        {/* Satellites */}
        <div className="absolute -top-1 px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[9px] font-mono text-warmgray-200">
          SEO
        </div>
        <div className="absolute -bottom-1 px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[9px] font-mono text-warmgray-200">
          Meta Ads
        </div>
        <div className="absolute -left-2 px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[9px] font-mono text-warmgray-200">
          Creative
        </div>
        <div className="absolute -right-2 px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[9px] font-mono text-warmgray-200">
          Web Dev
        </div>
      </div>

      <div className="text-[11px] font-mono text-center text-warmgray-400 border-t border-white/10 pt-2">
        Zero Agency Silos · Direct Senior Collaboration
      </div>
    </div>
  );
}
