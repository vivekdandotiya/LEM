'use client';

import React from 'react';
import { Search, ShieldCheck, ArrowUpRight, Zap, CheckCircle2, Globe, Sparkles } from 'lucide-react';

interface SceneProps {
  activePhase: number;
  progress?: number;
  isStatic?: boolean;
}

export function SeoScene({ activePhase, isStatic = false }: SceneProps) {
  return (
    <div className="w-full h-full relative bg-[#17191B] text-white overflow-hidden rounded-[24px] p-4 sm:p-6 flex flex-col justify-between border border-white/10 select-none">
      {/* Background Subtle Dot Matrix Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9F53D 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Stage Header Info */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-grey-2">
            SEO ENGINE // TELEMETRY
          </span>
        </div>
        <div className="font-mono text-[11px] text-lime font-bold">
          PHASE 0{activePhase + 1} ACTIVE
        </div>
      </div>

      {/* Main Visual Arena (Phases 0 to 3) */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
        {/* PHASE 0: AUDIT & DISCOVERY */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {/* Wireframe Mockup Frame */}
          <div className="relative w-full max-w-md mx-auto aspect-[16/10] bg-[#0E1012] rounded-xl border border-white/15 p-4 overflow-hidden shadow-2xl">
            {/* Mock Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <div className="w-16 h-2.5 rounded bg-white/20" />
              <div className="flex gap-2">
                <div className="w-10 h-2 rounded bg-white/10" />
                <div className="w-10 h-2 rounded bg-white/10" />
                <div className="w-10 h-2 rounded bg-white/10" />
              </div>
            </div>

            {/* Wireframe Grid Content */}
            <div className="grid grid-cols-3 gap-3 h-32">
              <div className="col-span-2 space-y-2">
                <div className="w-3/4 h-3 rounded bg-white/25" />
                <div className="w-full h-2 rounded bg-white/10" />
                <div className="w-5/6 h-2 rounded bg-white/10" />
                <div className="w-2/3 h-2 rounded bg-white/10" />
              </div>
              <div className="col-span-1 bg-white/5 rounded-lg border border-white/10 p-2 flex flex-col justify-end">
                <div className="w-full h-8 rounded bg-lime/20 border border-lime/40" />
              </div>
            </div>

            {/* Sweeping Laser Scanner Bar */}
            <div
              className={`absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-lime/25 to-lime/40 border-b-2 border-lime pointer-events-none ${
                !isStatic ? 'animate-[scanner_2.8s_ease-in-out_infinite]' : 'top-1/2'
              }`}
            />

            {/* Diagnostic Flags */}
            <div className="absolute inset-0 p-4 flex flex-col justify-around pointer-events-none">
              <div className="self-end px-2.5 py-1 rounded bg-ink/90 border border-lime/60 text-[10px] font-mono text-lime flex items-center gap-1.5 shadow-lg">
                <CheckCircle2 className="w-3 h-3 text-lime" />
                <span>404 CRAWL PATH: RESOLVED</span>
              </div>
              <div className="self-start px-2.5 py-1 rounded bg-ink/90 border border-lime/60 text-[10px] font-mono text-lime flex items-center gap-1.5 shadow-lg">
                <CheckCircle2 className="w-3 h-3 text-lime" />
                <span>CANONICAL CONFLICT: FIXED</span>
              </div>
              <div className="self-end px-2.5 py-1 rounded bg-ink/90 border border-lime/60 text-[10px] font-mono text-lime flex items-center gap-1.5 shadow-lg">
                <Zap className="w-3 h-3 text-lime" />
                <span>CORE WEB VITALS: 0.8s LCP</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-grey-2">
            [LASER TELEMETRY CRAWL: ZERO ERRORS DETECTED]
          </div>
        </div>

        {/* PHASE 1: ARCHITECTURE & SERP */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* Sitemap Tree Hierarchy SVG */}
            <div className="bg-[#0E1012] rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-grey-3 uppercase tracking-wider">
                  TOPICAL ENTITY CLUSTERING
                </span>
                <span className="text-[10px] font-mono text-lime">SCHEMA 3.0</span>
              </div>
              <svg className="w-full h-24" viewBox="0 0 320 80">
                {/* Connecting Paths */}
                <path
                  d="M160 16 L60 60 M160 16 L160 60 M160 16 L260 60"
                  stroke="#C9F53D"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  fill="none"
                  className="opacity-70"
                />
                {/* Root Node */}
                <rect x="110" y="4" width="100" height="24" rx="6" fill="#1B2A00" stroke="#C9F53D" strokeWidth="1" />
                <text x="160" y="20" fill="#C9F53D" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  leadedge.agency
                </text>
                {/* Child Nodes */}
                <rect x="20" y="52" width="80" height="20" rx="4" fill="#080A0B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="60" y="66" fill="#EEEBE3" fontSize="9" fontFamily="monospace" textAnchor="middle">/seo-core</text>

                <rect x="120" y="52" width="80" height="20" rx="4" fill="#080A0B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="160" y="66" fill="#EEEBE3" fontSize="9" fontFamily="monospace" textAnchor="middle">/authority</text>

                <rect x="220" y="52" width="80" height="20" rx="4" fill="#080A0B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="260" y="66" fill="#EEEBE3" fontSize="9" fontFamily="monospace" textAnchor="middle">/insights</text>
              </svg>
            </div>

            {/* Zero-Blue Google SERP Snippet Preview */}
            <div className="bg-[#0E1012] rounded-xl border border-white/15 p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-4 h-4 rounded-full bg-lime/20 flex items-center justify-center text-[9px] font-bold text-lime">
                  ✓
                </span>
                <span className="font-mono text-[11px] text-lime truncate">
                  https://leadedge.agency › growth-engine
                </span>
              </div>
              <h4 className="font-display font-bold text-white text-sm hover:underline cursor-pointer mb-1">
                High-Performance Digital Growth Studio | Lead Edge
              </h4>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#B8925A] mb-1.5">
                <span>★★★★★ 5.0</span>
                <span className="text-grey-3">•</span>
                <span className="text-grey-2">Commercial Entity Validated</span>
              </div>
              <p className="font-sans text-xs text-grey-2 line-clamp-2 leading-relaxed">
                Technical search architecture, entity-based topical authority, and continuous SERP climb engineered to convert search volume into commercial enquiries.
              </p>
            </div>
          </div>
        </div>

        {/* PHASE 2: AUTHORITY ORBIT */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="relative w-full max-w-sm mx-auto aspect-square flex items-center justify-center">
            {/* Orbit Rings */}
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full border border-lime/20 animate-pulse" />

            {/* Central Domain Core */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-[#1B2A00] border-2 border-lime flex flex-col items-center justify-center shadow-lime-glow">
              <Globe className="w-5 h-5 text-lime mb-1" />
              <span className="font-mono font-bold text-[10px] text-lime">LEAD EDGE</span>
              <span className="font-mono text-[8px] text-white/70">CORE DOMAIN</span>
            </div>

            {/* Orbiting Authority Domain Nodes */}
            <div className="absolute top-2 left-6 px-2.5 py-1 rounded bg-[#0E1012] border border-white/20 text-[10px] font-mono text-white flex items-center gap-1 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span>TechCrunch [DR 92]</span>
            </div>

            <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0E1012] border border-white/20 text-[10px] font-mono text-white flex items-center gap-1 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span>Forbes [DR 94]</span>
            </div>

            <div className="absolute bottom-6 left-4 px-2.5 py-1 rounded bg-[#0E1012] border border-white/20 text-[10px] font-mono text-white flex items-center gap-1 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span>VentureBeat [DR 91]</span>
            </div>

            <div className="absolute bottom-4 right-8 px-2.5 py-1 rounded bg-[#0E1012] border border-white/20 text-[10px] font-mono text-white flex items-center gap-1 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span>Industry Hub [DR 88]</span>
            </div>

            {/* Pulses flowing inward SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
              <path d="M60 40 Q 150 100 150 150" stroke="#C9F53D" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />
              <path d="M240 40 Q 150 100 150 150" stroke="#C9F53D" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />
              <path d="M60 260 Q 150 200 150 150" stroke="#C9F53D" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />
              <path d="M240 260 Q 150 200 150 150" stroke="#C9F53D" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />
            </svg>
          </div>
          <div className="text-center mt-2 font-mono text-[11px] text-grey-2">
            [EDITORIAL BACKLINK GRAPH // ZERO PRIVATE BLOG NETWORKS]
          </div>
        </div>

        {/* PHASE 3: COMMERCIAL RANKING & CLIMB */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto space-y-3">
            {/* Search Input Omnibar */}
            <div className="bg-[#0E1012] rounded-full border border-lime/40 px-4 py-2.5 flex items-center gap-3 shadow-lg">
              <Search className="w-4 h-4 text-lime shrink-0" />
              <span className="font-mono text-xs text-white">best digital growth studio</span>
              <span className="w-1.5 h-3.5 bg-lime animate-pulse ml-auto" />
            </div>

            {/* Ranked Results List */}
            <div className="space-y-2 pt-2">
              {/* Winner #1: Lead Edge */}
              <div className="p-3.5 rounded-xl bg-[#1B2A00] border-2 border-lime flex items-center justify-between shadow-lime-glow transition-all duration-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lime text-ink font-mono font-black text-xs flex items-center justify-center">
                    #1
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-white text-xs sm:text-sm">
                      Lead Edge Marketing — Digital Growth Studio
                    </h5>
                    <span className="font-mono text-[10px] text-lime">leadedge.agency</span>
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-lime/20 border border-lime/40 text-[9px] font-mono text-lime font-bold">
                  ▲ +8 POS
                </div>
              </div>

              {/* Competitor 2 */}
              <div className="p-3 rounded-lg bg-[#0E1012] border border-white/10 flex items-center justify-between opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-white/10 text-grey-3 font-mono text-xs flex items-center justify-center">
                    #2
                  </div>
                  <div>
                    <div className="w-32 h-2.5 rounded bg-white/20 mb-1" />
                    <div className="w-20 h-2 rounded bg-white/10" />
                  </div>
                </div>
                <span className="text-[10px] font-mono text-grey-3">Competitor Alpha</span>
              </div>

              {/* Competitor 3 */}
              <div className="p-3 rounded-lg bg-[#0E1012] border border-white/10 flex items-center justify-between opacity-35">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-white/10 text-grey-3 font-mono text-xs flex items-center justify-center">
                    #3
                  </div>
                  <div>
                    <div className="w-28 h-2.5 rounded bg-white/20 mb-1" />
                    <div className="w-16 h-2 rounded bg-white/10" />
                  </div>
                </div>
                <span className="text-[10px] font-mono text-grey-3">Competitor Beta</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-lime">
            [TARGET COMMERCIAL RANK: POSITION #1 SECURED]
          </div>
        </div>
      </div>

      {/* Stage Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-grey-3">
        <span>FRAME RATE: 60FPS STABLE</span>
        <span className="text-lime">VERIFIED COMMERCIAL ARCHITECTURE</span>
      </div>
    </div>
  );
}
