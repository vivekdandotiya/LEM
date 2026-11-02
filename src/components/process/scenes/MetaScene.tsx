'use client';

import React from 'react';
import { Target, TrendingUp, Layers, CheckCircle2, Award, Zap, Activity } from 'lucide-react';

interface SceneProps {
  activePhase: number;
  progress?: number;
  isStatic?: boolean;
}

export function MetaScene({ activePhase, isStatic = false }: SceneProps) {
  return (
    <div className="w-full h-full relative bg-[#0E1012] text-white overflow-hidden rounded-[24px] p-4 sm:p-6 flex flex-col justify-between border border-white/10 select-none">
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #C9F53D 1px, transparent 1px), linear-gradient(to bottom, #C9F53D 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Stage Header Info */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-grey-2">
            META ADS ENGINE // ALGORITHMIC SCALE
          </span>
        </div>
        <div className="font-mono text-[11px] text-lime font-bold">
          PHASE 0{activePhase + 1} ACTIVE
        </div>
      </div>

      {/* Main Visual Arena (Phases 0 to 3) */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
        {/* PHASE 0: FUNNEL ARCHITECTURE */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-sm mx-auto space-y-2.5">
            {/* Top of Funnel (Cold Broad) */}
            <div className="w-full p-3 rounded-xl bg-[#17191B] border border-white/15 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded bg-white/10 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                  01
                </span>
                <div>
                  <h6 className="font-mono text-xs text-white font-bold">COLD ACQUISITION</h6>
                  <span className="text-[10px] font-sans text-grey-3">Broad hook resonance & thumb-stop testing</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-lime font-bold">100% VOLUME</span>
            </div>

            {/* Middle of Funnel (Consideration) */}
            <div className="w-[85%] mx-auto p-3 rounded-xl bg-[#17191B] border border-white/15 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded bg-white/10 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                  02
                </span>
                <div>
                  <h6 className="font-mono text-xs text-white font-bold">CONSIDERATION</h6>
                  <span className="text-[10px] font-sans text-grey-3">Social proof & product objection handling</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-lime font-bold">42% INTENT</span>
            </div>

            {/* Bottom of Funnel (Conversion) */}
            <div className="w-[68%] mx-auto p-3 rounded-xl bg-[#1B2A00] border-2 border-lime shadow-lime-glow flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded bg-lime text-ink font-mono text-[10px] flex items-center justify-center font-black">
                  03
                </span>
                <div>
                  <h6 className="font-mono text-xs text-lime font-bold">TRANSACTION</h6>
                  <span className="text-[10px] font-sans text-white/80">Checkout recovery & direct buyers</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-lime font-bold">HIGH LTV</span>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-grey-2">
            [3-TIER SEGREGATED ARCHITECTURE // ZERO BUDGET LEAKAGE]
          </div>
        </div>

        {/* PHASE 1: CREATIVE MATRIX & WINNER STAMP */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto grid grid-cols-3 gap-3">
            {/* Variation A */}
            <div className="p-3 rounded-xl bg-[#17191B] border border-white/10 flex flex-col justify-between aspect-[3/4] opacity-40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-grey-3">HOOK A</span>
                <span className="text-[9px] font-mono text-white/40">1.8% CTR</span>
              </div>
              <div className="space-y-1.5 my-auto">
                <div className="w-full h-12 rounded bg-white/5" />
                <div className="w-3/4 h-2 rounded bg-white/10" />
              </div>
              <span className="font-mono text-[9px] text-grey-3 text-center">ELIMINATED</span>
            </div>

            {/* Variation B (The Winner!) */}
            <div className="relative p-3 rounded-xl bg-[#1B2A00] border-2 border-lime flex flex-col justify-between aspect-[3/4] shadow-lime-glow scale-105 z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-lime font-bold">HOOK B</span>
                <span className="text-[10px] font-mono text-lime font-bold">4.6% CTR</span>
              </div>
              <div className="space-y-1.5 my-auto">
                <div className="w-full h-12 rounded bg-lime/20 border border-lime/40 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-lime animate-pulse" />
                </div>
                <div className="w-full h-2 rounded bg-lime/40" />
                <div className="w-2/3 h-2 rounded bg-lime/30" />
              </div>
              {/* Winner Stamp Badge */}
              <div className="w-full py-1 rounded bg-lime text-ink font-mono font-black text-[9px] text-center tracking-widest uppercase">
                WINNER: +340% ROAS
              </div>
            </div>

            {/* Variation C */}
            <div className="p-3 rounded-xl bg-[#17191B] border border-white/10 flex flex-col justify-between aspect-[3/4] opacity-40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-grey-3">HOOK C</span>
                <span className="text-[9px] font-mono text-white/40">2.1% CTR</span>
              </div>
              <div className="space-y-1.5 my-auto">
                <div className="w-full h-12 rounded bg-white/5" />
                <div className="w-3/4 h-2 rounded bg-white/10" />
              </div>
              <span className="font-mono text-[9px] text-grey-3 text-center">ELIMINATED</span>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-lime">
            [3x3 MATRIX EXPERIMENTATION // WINNING HOOK ISOLATED]
          </div>
        </div>

        {/* PHASE 2: AUDIENCE MODELING */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="relative w-full max-w-sm mx-auto aspect-square flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full border border-lime/30 animate-ping opacity-30" />
            <div className="absolute inset-28 rounded-full border border-lime/50" />

            {/* Constellation of ~60 Audience Nodes */}
            <div className="absolute inset-6 grid grid-cols-8 gap-3 items-center justify-items-center opacity-30">
              {Array.from({ length: 48 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
              ))}
            </div>

            {/* Center High-Intent Cluster (Active in Lime) */}
            <div className="relative z-10 w-28 h-28 rounded-full bg-[#1B2A00]/90 border-2 border-lime flex flex-col items-center justify-center shadow-lime-glow backdrop-blur-md">
              <Target className="w-6 h-6 text-lime mb-1" />
              <span className="font-mono font-bold text-[11px] text-lime">TOP 15%</span>
              <span className="font-mono text-[8px] text-white/80">HIGH-INTENT BUYERS</span>
            </div>
          </div>
          <div className="text-center mt-2 font-mono text-[11px] text-grey-2">
            [SERVER-SIDE CAPI MODELING // ZERO-OVERLAP SEGMENTATION]
          </div>
        </div>

        {/* PHASE 3: EFFICIENCY SCALING */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* Scale Gauge Indicator */}
            <div className="bg-[#17191B] rounded-2xl border border-white/15 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-grey-2 uppercase">DAILY BUDGET VELOCITY</span>
                <span className="font-mono text-xs text-lime font-bold">SCALED 10X</span>
              </div>

              {/* Progress Slider Bar */}
              <div className="w-full h-4 rounded-full bg-[#0E1012] p-0.5 border border-white/10 mb-2">
                <div className="h-full rounded-full bg-gradient-to-r from-lime/60 to-lime w-[92%] transition-all duration-1000 shadow-lime-glow" />
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-grey-3">
                <span>TESTING: $500/day</span>
                <span className="text-lime font-bold">SCALING: $5,000/day</span>
              </div>
            </div>

            {/* Unit Economics Telemetry Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#17191B] border border-white/10">
                <span className="font-mono text-[10px] text-grey-3 block mb-1">TARGET CPA</span>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-white text-base">LOCKED</span>
                  <CheckCircle2 className="w-4 h-4 text-lime" />
                </div>
                <span className="font-mono text-[9px] text-lime mt-1 block">Within Unit Margins</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1B2A00] border border-lime/40">
                <span className="font-mono text-[10px] text-lime/80 block mb-1">PROFIT EXPANSION</span>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lime text-base">SUSTAINED</span>
                  <TrendingUp className="w-4 h-4 text-lime" />
                </div>
                <span className="font-mono text-[9px] text-white/70 mt-1 block">Predictable Flywheel</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-lime">
            [PROFITABLE EFFICIENCY PRESERVED AT SCALE]
          </div>
        </div>
      </div>

      {/* Stage Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-grey-3">
        <span>CAPI ATTRIBUTION: SERVER-SIDE</span>
        <span className="text-lime">ZERO SCRIPT BLOAT</span>
      </div>
    </div>
  );
}
