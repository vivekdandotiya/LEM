'use client';

import React from 'react';
import { Code, CheckCircle2, Monitor, Smartphone, Tablet, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface SceneProps {
  activePhase: number;
  progress?: number;
  isStatic?: boolean;
}

export function WebScene({ activePhase, isStatic = false }: SceneProps) {
  return (
    <div className="w-full h-full relative bg-[#17191B] text-white overflow-hidden rounded-[24px] p-4 sm:p-6 flex flex-col justify-between border border-white/10 select-none">
      {/* Browser Chrome Header Dots */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          {/* 3 Window Controls (Ink, Charcoal, Lime) */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-grey-2 ml-2">
            WEB ENGINE // BESPOKE NEXT.JS 15
          </span>
        </div>
        <div className="font-mono text-[11px] text-lime font-bold">
          PHASE 0{activePhase + 1} ACTIVE
        </div>
      </div>

      {/* Main Visual Arena (Phases 0 to 3) */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
        {/* PHASE 0: INFORMATION ARCHITECTURE & SITEMAP TREE */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto bg-[#0E1012] rounded-xl border border-white/10 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-grey-2 uppercase">USER JOURNEY BLUEPRINT</span>
              <span className="font-mono text-xs text-lime">HIERARCHY MAPPED</span>
            </div>

            {/* Tree Diagram SVG */}
            <svg className="w-full h-32" viewBox="0 0 320 100">
              {/* Connecting Paths */}
              <path
                d="M160 20 L40 70 M160 20 L120 70 M160 20 L200 70 M160 20 L280 70"
                stroke="#C9F53D"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
                opacity="0.8"
              />
              {/* Root Node */}
              <rect x="110" y="4" width="100" height="26" rx="6" fill="#1B2A00" stroke="#C9F53D" strokeWidth="1.5" />
              <text x="160" y="21" fill="#C9F53D" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                HOME (/)
              </text>

              {/* Destination Nodes */}
              <rect x="10" y="65" width="60" height="22" rx="4" fill="#17191B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="40" y="80" fill="#EEEBE3" fontSize="9" fontFamily="monospace" textAnchor="middle">/services</text>

              <rect x="90" y="65" width="60" height="22" rx="4" fill="#17191B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="120" y="80" fill="#EEEBE3" fontSize="9" fontFamily="monospace" textAnchor="middle">/work</text>

              <rect x="170" y="65" width="60" height="22" rx="4" fill="#17191B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="200" y="80" fill="#EEEBE3" fontSize="9" fontFamily="monospace" textAnchor="middle">/about</text>

              <rect x="250" y="65" width="60" height="22" rx="4" fill="#1B2A00" stroke="#C9F53D" strokeWidth="1" />
              <text x="280" y="80" fill="#C9F53D" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">/contact</text>
            </svg>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-grey-2">
            [CONVERSION FUNNEL STRUCTURED // ZERO ORPHANED ROUTES]
          </div>
        </div>

        {/* PHASE 1: WIREFRAME TO HIGH-FI UI MORPH */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-3">
            {/* Low-Fi Wireframe State */}
            <div className="p-3.5 rounded-xl bg-[#0E1012] border border-white/10 flex flex-col justify-between aspect-[4/3] opacity-50">
              <span className="font-mono text-[10px] text-grey-3">01 / WIREFRAME</span>
              <div className="space-y-2">
                <div className="w-full h-8 rounded border border-dashed border-white/20 bg-white/5" />
                <div className="w-2/3 h-2.5 rounded bg-white/15" />
                <div className="w-1/2 h-2.5 rounded bg-white/10" />
              </div>
              <span className="text-[9px] font-mono text-grey-3">Structure Approved</span>
            </div>

            {/* High-Fi Finished UI State */}
            <div className="p-3.5 rounded-xl bg-[#1B2A00] border-2 border-lime shadow-lime-glow flex flex-col justify-between aspect-[4/3]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-lime font-bold">02 / CRAFTED UI</span>
                <span className="w-2 h-2 rounded-full bg-lime" />
              </div>
              <div className="space-y-2">
                <div className="w-full p-2 rounded-lg bg-ink border border-lime/30 flex items-center justify-between">
                  <span className="font-display font-bold text-xs text-white">Momentum Engine</span>
                  <span className="px-1.5 py-0.5 rounded bg-lime text-ink font-mono font-bold text-[8px]">
                    CTA →
                  </span>
                </div>
                <div className="w-full h-2 rounded bg-lime/40" />
                <div className="w-3/4 h-2 rounded bg-white/30" />
              </div>
              <span className="text-[9px] font-mono text-lime font-bold">Commercial Polish</span>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-lime">
            [FLUID MORPH: WIREFRAME TO POLISHED INTERFACE]
          </div>
        </div>

        {/* PHASE 2: CODE EDITOR & FLUID RESIZE ENGINE */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Clean Code Editor */}
            <div className="p-3.5 rounded-xl bg-[#0E1012] border border-white/10 font-mono text-[10px] space-y-1 text-grey-2 shadow-inner">
              <div className="flex items-center justify-between text-grey-3 border-b border-white/10 pb-1 mb-2">
                <span>HeroSection.tsx</span>
                <span className="text-lime">TSX</span>
              </div>
              <p className="text-lime/90 font-bold">export function Hero() &#123;</p>
              <p className="pl-2 text-white/70">return (</p>
              <p className="pl-4 text-lime">&lt;section</p>
              <p className="pl-6 text-white/60">className=&quot;fluid-engine&quot;</p>
              <p className="pl-4 text-lime">&gt;</p>
              <p className="pl-6 text-[#B8925A]">&lt;Momentum /&gt;</p>
              <p className="pl-4 text-lime">&lt;/section&gt;</p>
              <p className="pl-2 text-white/70">);</p>
              <p className="text-lime/90 font-bold">&#125;</p>
            </div>

            {/* Viewport Resize Mode Display */}
            <div className="p-3.5 rounded-xl bg-[#17191B] border border-white/15 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] text-grey-3">VIEWPORT ENGINE</span>
                <span className="font-mono text-[10px] text-lime font-bold">100% FLUID</span>
              </div>

              <div className="flex items-center justify-around my-2">
                <div className="flex flex-col items-center gap-1 text-white">
                  <Monitor className="w-5 h-5 text-lime" />
                  <span className="font-mono text-[8px]">1440px</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-white/70">
                  <Tablet className="w-5 h-5" />
                  <span className="font-mono text-[8px]">768px</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-white/70">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-mono text-[8px]">375px</span>
                </div>
              </div>

              <div className="p-1.5 rounded bg-white/5 border border-white/10 text-center font-mono text-[9px] text-grey-2">
                NO HORIZONTAL OVERFLOW
              </div>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-grey-2">
            [ZERO TEMPLATE BLOAT // HANDCRAFTED TYPESCRIPT ARCHITECTURE]
          </div>
        </div>

        {/* PHASE 3: LAUNCH SEQUENCE & CORE VITALS GAUGES */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto space-y-3">
            {/* 3 Core Vitals Ring Gauges */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-[#1B2A00] border border-lime/50 flex flex-col items-center justify-center shadow-lime-glow">
                <div className="w-12 h-12 rounded-full border-2 border-lime flex items-center justify-center mb-1">
                  <span className="font-mono font-black text-sm text-lime">100</span>
                </div>
                <span className="font-mono text-[9px] text-white">PERFORMANCE</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1B2A00] border border-lime/50 flex flex-col items-center justify-center shadow-lime-glow">
                <div className="w-12 h-12 rounded-full border-2 border-lime flex items-center justify-center mb-1">
                  <span className="font-mono font-black text-sm text-lime">100</span>
                </div>
                <span className="font-mono text-[9px] text-white">ACCESSIBILITY</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1B2A00] border border-lime/50 flex flex-col items-center justify-center shadow-lime-glow">
                <div className="w-12 h-12 rounded-full border-2 border-lime flex items-center justify-center mb-1">
                  <span className="font-mono font-black text-sm text-lime">100</span>
                </div>
                <span className="font-mono text-[9px] text-white">BEST PRACTICES</span>
              </div>
            </div>

            {/* Pre-Flight Checklist */}
            <div className="p-3 rounded-xl bg-[#0E1012] border border-white/10 space-y-1.5 text-[10px] font-mono">
              <div className="flex items-center justify-between text-lime">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
                  SSL & Global Edge CDN Deployed
                </span>
                <span>[VERIFIED]</span>
              </div>
              <div className="flex items-center justify-between text-lime">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
                  WCAG 2.2 Semantic Accessibility Validated
                </span>
                <span>[VERIFIED]</span>
              </div>
              <div className="flex items-center justify-between text-lime">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
                  Sub-Second LCP (0.6s) Benchmark Met
                </span>
                <span>[PASS]</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-lime flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>[PRE-FLIGHT PASSED // SITE ENGINE READY FOR LAUNCH]</span>
          </div>
        </div>
      </div>

      {/* Stage Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-grey-3">
        <span>RUNTIME ENGINE: NEXT.JS 15 APP ROUTER</span>
        <span className="text-lime">0KB UNUSED HYDRATION WASTE</span>
      </div>
    </div>
  );
}
