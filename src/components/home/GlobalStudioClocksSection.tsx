'use client';

import React, { useEffect, useState } from 'react';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';

interface ClockConfig {
  id: string;
  city: string;
  region: string;
  tz: string;
  code: string;
  desk: string;
}

const CLOCKS: ClockConfig[] = [
  {
    id: 'europe',
    city: 'London',
    region: 'Europe',
    tz: 'Europe/London',
    code: 'GMT',
    desk: 'Strategy & Client Growth',
  },
  {
    id: 'asia',
    city: 'Singapore',
    region: 'Asia',
    tz: 'Asia/Singapore',
    code: 'SGT',
    desk: 'Search & Performance Media',
  },
  {
    id: 'americas',
    city: 'New York',
    region: 'Americas',
    tz: 'America/New_York',
    code: 'EST',
    desk: 'Creative Production & Scale',
  },
];

interface TimeState {
  hour: string;
  minute: string;
  period: string;
}

function getTimeForZone(timeZone: string): TimeState {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const parts = formatter.formatToParts(now);
    const hour = parts.find((p) => p.type === 'hour')?.value || '12';
    const minute = parts.find((p) => p.type === 'minute')?.value || '00';
    const period = parts.find((p) => p.type === 'dayPeriod')?.value?.toUpperCase() || 'AM';
    return { hour, minute, period };
  } catch {
    return { hour: '12', minute: '00', period: 'AM' };
  }
}

interface FlipCardProps {
  value: string;
  period?: string;
}

function FlipCard({ value, period }: FlipCardProps) {
  return (
    <div
      className="relative w-14 sm:w-16 md:w-20 h-16 sm:h-20 md:h-24 rounded-xl sm:rounded-2xl bg-[#121417] border border-white/15 shadow-[0_10px_28px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden select-none transition-transform duration-300 hover:scale-[1.02]"
      style={{
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.7)',
      }}
    >
      {/* Top half subtle glass sheen */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

      {/* AM/PM Tag on Hour Card */}
      {period && (
        <span className="absolute top-2 left-2.5 text-xs sm:text-xs font-mono font-bold tracking-wider text-[#D9C29A] uppercase select-none">
          {period}
        </span>
      )}

      {/* Main Bold Mechanical Number */}
      <span className="font-display font-extrabold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none">
        {value}
      </span>

      {/* Split-Flap Horizontal Crease Line */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#0A0B0D] border-t border-black/95 border-b border-white/[0.1] pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Mechanical Side Hinge Notches */}
      <div
        className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-2.5 rounded-r bg-[#070809] border border-black z-20"
        aria-hidden="true"
      />
      <div
        className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-2.5 rounded-l bg-[#070809] border border-black z-20"
        aria-hidden="true"
      />
    </div>
  );
}

export function GlobalStudioClocksSection() {
  const [times, setTimes] = useState<Record<string, TimeState>>({
    europe: { hour: '12', minute: '00', period: 'PM' },
    asia: { hour: '12', minute: '00', period: 'PM' },
    americas: { hour: '12', minute: '00', period: 'PM' },
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateAll = () => {
      setTimes({
        europe: getTimeForZone('Europe/London'),
        asia: getTimeForZone('Asia/Singapore'),
        americas: getTimeForZone('America/New_York'),
      });
    };

    updateAll();
    const interval = setInterval(updateAll, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <section id="global-clocks" className="py-16 sm:py-20 bg-[#0B0C0E] text-white border-b border-white/10 opacity-0">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-mono text-white/40">Loading world clocks...</span>
        </div>
      </section>
    );
  }

  return (
    <section
      id="global-clocks"
      className="relative py-16 sm:py-24 bg-[#0A0B0D] text-white border-b border-white/10 select-none overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle 600px at 50% 50%, rgba(176,141,87,0.06), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-white/10 mb-12 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-[#D9C29A] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] animate-pulse" />
              <span>LIVE STUDIO TIMEZONES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white uppercase">
              Three Timezones. Always Active.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-stone max-w-md leading-relaxed">
            Coordinated digital growth across Europe, Asia, and the Americas. Live campaign optimization and media buying round the clock.
          </p>
        </div>

        {/* 3 Flip Clocks Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CLOCKS.map((clock) => {
            const t = times[clock.id] || { hour: '12', minute: '00', period: 'AM' };

            return (
              <div
                key={clock.id}
                className="group relative p-6 sm:p-8 rounded-3xl bg-[#121417]/90 border border-white/10 hover:border-[#B08D57]/40 transition-all duration-300 shadow-[0_16px_36px_rgba(0,0,0,0.4)] flex flex-col items-center justify-between min-h-[220px]"
              >
                {/* Header: City, TZ Code & Region */}
                <div className="w-full flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
                    <span className="font-display font-extrabold text-base text-white tracking-wide uppercase">
                      {clock.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-xs font-mono text-[#D9C29A] font-bold">
                      {clock.code}
                    </span>
                    <span className="text-xs font-mono text-[#D6D3D1] uppercase tracking-wider font-medium">
                      {clock.region}
                    </span>
                  </div>
                </div>

                {/* Flip Tiles: Dual Split-Flap Boxes */}
                <div className="py-6 flex items-center gap-2.5 sm:gap-3">
                  <FlipCard value={t.hour} period={t.period} />
                  <span className="text-2xl font-mono text-white/70 font-bold select-none">:</span>
                  <FlipCard value={t.minute} />
                </div>

                {/* Footer Tagline: Studio Desk Assignment */}
                <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D6D3D1]">
                  <span className="text-white font-medium">{clock.desk}</span>
                  <span className="text-xs uppercase text-[#D9C29A] font-bold">Online</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
