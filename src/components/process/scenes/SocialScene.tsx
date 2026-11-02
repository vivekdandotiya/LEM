'use client';

import React from 'react';
import { Play, Heart, MessageSquare, CheckCircle2, Calendar, Sparkles, Send, Video } from 'lucide-react';

interface SceneProps {
  activePhase: number;
  progress?: number;
  isStatic?: boolean;
}

export function SocialScene({ activePhase, isStatic = false }: SceneProps) {
  return (
    <div className="w-full h-full relative bg-[#EEEBE3] text-ink overflow-hidden rounded-[24px] p-4 sm:p-6 flex flex-col justify-between border border-ink/10 select-none">
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #080A0B 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Stage Header Info */}
      <div className="relative z-10 flex items-center justify-between border-b border-ink/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ink animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-grey-3 font-bold">
            SOCIAL MEDIA ENGINE // ORGANIC CADENCE
          </span>
        </div>
        <div className="font-mono text-[11px] text-ink font-bold bg-lime px-2 py-0.5 rounded">
          PHASE 0{activePhase + 1} ACTIVE
        </div>
      </div>

      {/* Main Visual Arena (Phases 0 to 3) */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
        {/* PHASE 0: PILLAR ARCHITECTURE */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-3">
            {/* Pillar 1 */}
            <div className="p-3.5 rounded-xl bg-paper-2 border border-ink/10 shadow-sm flex flex-col justify-between aspect-[4/3]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-grey-2">25% MIX</span>
                <span className="w-2 h-2 rounded-full bg-ink" />
              </div>
              <div>
                <h6 className="font-display font-bold text-ink text-sm">01 / EDUCATE</h6>
                <p className="text-[10px] font-sans text-grey-3 leading-tight mt-0.5">
                  Framework breakdowns & market clarity
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-3.5 rounded-xl bg-paper-2 border border-ink/10 shadow-sm flex flex-col justify-between aspect-[4/3]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-grey-2">25% MIX</span>
                <span className="w-2 h-2 rounded-full bg-lime" />
              </div>
              <div>
                <h6 className="font-display font-bold text-ink text-sm">02 / ENTERTAIN</h6>
                <p className="text-[10px] font-sans text-grey-3 leading-tight mt-0.5">
                  Fast cultural hooks & relatable narrative
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-3.5 rounded-xl bg-paper-2 border border-ink/10 shadow-sm flex flex-col justify-between aspect-[4/3]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-grey-2">25% MIX</span>
                <span className="w-2 h-2 rounded-full bg-[#B8925A]" />
              </div>
              <div>
                <h6 className="font-display font-bold text-ink text-sm">03 / CONVERT</h6>
                <p className="text-[10px] font-sans text-grey-3 leading-tight mt-0.5">
                  Clear offer mechanics & case proof
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-3.5 rounded-xl bg-ink text-white shadow-md flex flex-col justify-between aspect-[4/3]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-lime font-bold">25% MIX</span>
                <span className="w-2 h-2 rounded-full bg-lime" />
              </div>
              <div>
                <h6 className="font-display font-bold text-white text-sm">04 / AUTHORITY</h6>
                <p className="text-[10px] font-sans text-grey-2 leading-tight mt-0.5">
                  Behind-the-scenes standards & conviction
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-grey-3">
            [BALANCED 4-PILLAR BLUEPRINT // ZERO RANDOM POSTING]
          </div>
        </div>

        {/* PHASE 1: EDITORIAL CADENCE & CALENDAR */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto space-y-2">
            {/* Days Strip */}
            <div className="grid grid-cols-4 gap-2">
              <div className="p-3 rounded-xl bg-paper-2 border border-ink/10 flex flex-col justify-between">
                <span className="font-mono text-[10px] text-grey-2 font-bold">MON 09:00</span>
                <div className="my-2">
                  <span className="text-[9px] font-mono bg-lime text-ink px-1.5 py-0.5 rounded font-bold">
                    REEL 01
                  </span>
                  <p className="text-[10px] font-sans font-bold text-ink mt-1 truncate">Hook Breakdown</p>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-grey-3">
                  <CheckCircle2 className="w-3 h-3 text-ink" />
                  <span>Ready</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-paper-2 border border-ink/10 flex flex-col justify-between">
                <span className="font-mono text-[10px] text-grey-2 font-bold">WED 12:30</span>
                <div className="my-2">
                  <span className="text-[9px] font-mono bg-ink text-white px-1.5 py-0.5 rounded">
                    SLIDES
                  </span>
                  <p className="text-[10px] font-sans font-bold text-ink mt-1 truncate">Framework Guide</p>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-grey-3">
                  <CheckCircle2 className="w-3 h-3 text-ink" />
                  <span>Ready</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-paper-2 border border-ink/10 flex flex-col justify-between">
                <span className="font-mono text-[10px] text-grey-2 font-bold">FRI 18:00</span>
                <div className="my-2">
                  <span className="text-[9px] font-mono bg-lime text-ink px-1.5 py-0.5 rounded font-bold">
                    REEL 02
                  </span>
                  <p className="text-[10px] font-sans font-bold text-ink mt-1 truncate">Founder Angle</p>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-grey-3">
                  <CheckCircle2 className="w-3 h-3 text-ink" />
                  <span>Ready</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-paper-2 border border-ink/10 flex flex-col justify-between">
                <span className="font-mono text-[10px] text-grey-2 font-bold">SUN 20:00</span>
                <div className="my-2">
                  <span className="text-[9px] font-mono bg-ink text-white px-1.5 py-0.5 rounded">
                    STORIES
                  </span>
                  <p className="text-[10px] font-sans font-bold text-ink mt-1 truncate">Weekly Recap</p>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-grey-3">
                  <CheckCircle2 className="w-3 h-3 text-ink" />
                  <span>Ready</span>
                </div>
              </div>
            </div>

            {/* Timetable Sign-off Banner */}
            <div className="p-3 rounded-xl bg-ink text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-lime" />
                <span className="font-mono text-xs font-bold">30-DAY EDITORIAL QUEUE SIGNED OFF</span>
              </div>
              <span className="font-mono text-[10px] text-lime">100% PRE-PRODUCED</span>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-grey-3">
            [SCHEDULED PEAK ENGAGEMENT // ZERO RUNTIME RUSH]
          </div>
        </div>

        {/* PHASE 2: 9:16 VERTICAL VIDEO STUDIO */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-56 mx-auto aspect-[9/16] bg-ink rounded-[28px] border-4 border-ink shadow-2xl p-3 flex flex-col justify-between text-white relative overflow-hidden">
            {/* Top Phone Pill */}
            <div className="w-16 h-3 bg-white/20 rounded-full mx-auto" />

            {/* Kinetic Caption Simulation */}
            <div className="my-auto text-center space-y-2">
              <span className="px-2 py-0.5 rounded bg-lime text-ink font-mono font-bold text-[9px]">
                HIGH-RETENTION HOOK
              </span>
              <h5 className="font-display font-black text-xl tracking-tight leading-tight uppercase">
                STOP.<br />
                <span className="text-lime">SCROLLING.</span><br />
                NOW.
              </h5>
            </div>

            {/* Bottom Playhead Timeline Scrubber */}
            <div className="space-y-1.5 bg-white/10 p-2 rounded-xl backdrop-blur-md">
              <div className="flex items-center justify-between text-[8px] font-mono text-grey-2">
                <span>00:03</span>
                <span className="text-lime font-bold">RETENTION: 84%</span>
                <span>00:15</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-lime w-2/3 shadow-lime-glow" />
              </div>
            </div>
          </div>
          <div className="text-center mt-2 font-mono text-[11px] text-grey-3">
            [9:16 VERTICAL MASTERING // RETENTION CURVE OPTIMISED]
          </div>
        </div>

        {/* PHASE 3: COMMUNITY CONVERSION & INBOUND LEAD */}
        <div
          className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
            activePhase === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-md mx-auto space-y-3">
            {/* Floating Reactions Bar */}
            <div className="p-3 rounded-xl bg-paper-2 border border-ink/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-ink fill-ink" />
                <span className="font-mono text-xs font-bold">1,840 Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-ink" />
                <span className="font-mono text-xs font-bold">142 Inbound Comments</span>
              </div>
              <div className="flex items-center gap-1 text-lime font-mono text-xs bg-ink px-2 py-0.5 rounded font-bold">
                <Sparkles className="w-3 h-3 text-lime" />
                <span>Hot Lead</span>
              </div>
            </div>

            {/* Inbound Direct Message Card */}
            <div className="p-4 rounded-xl bg-ink text-white shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime" />
                  <span className="font-mono text-xs font-bold">INBOUND COMMERCIAL ENQUIRY</span>
                </div>
                <span className="font-mono text-[9px] text-grey-2">2m ago</span>
              </div>

              <p className="font-sans text-xs text-white/90 leading-relaxed italic">
                &ldquo;Saw your video on creative matrix testing. We have a £40k/mo ad spend — can we schedule a consultation this week?&rdquo;
              </p>

              {/* Automated Triage Action */}
              <div className="p-2.5 rounded-lg bg-white/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-lime flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
                  DIRECT CALL BOOKING DISPATCHED
                </span>
                <span className="text-white/70">PRIORITY LEAD</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 font-mono text-[11px] text-ink font-bold">
            [ACTIVE AUDIENCE TRIAGE // TURNING ENGAGEMENT INTO REVENUE]
          </div>
        </div>
      </div>

      {/* Stage Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-ink/10 pt-3 text-[10px] font-mono text-grey-3">
        <span>DELIVERABLE: HIGH-RETENTION ASSETS</span>
        <span className="text-ink font-bold">PROPRIETARY CALENDAR RIGOR</span>
      </div>
    </div>
  );
}
