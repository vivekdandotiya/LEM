'use client';

import React, { useEffect, useState } from 'react';

interface ClockConfig {
  id: string;
  city: string;
  region: string;
  tz: string;
  code: string;
}

const CLOCKS: ClockConfig[] = [
  {
    id: 'europe',
    city: 'London',
    region: 'Europe',
    tz: 'Europe/London',
    code: 'GMT',
  },
  {
    id: 'asia',
    city: 'Singapore',
    region: 'Asia',
    tz: 'Asia/Singapore',
    code: 'SGT',
  },
  {
    id: 'americas',
    city: 'New York',
    region: 'Americas',
    tz: 'America/New_York',
    code: 'EST',
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
      className="relative w-12 sm:w-14 md:w-16 h-14 sm:h-16 md:h-20 rounded-xl sm:rounded-2xl bg-[#141518] border border-white/12 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden select-none"
      style={{
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.6)',
      }}
    >
      {/* Top half subtle sheen */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />

      {/* AM/PM Tag on Hour Card */}
      {period && (
        <span className="absolute top-1.5 left-2 text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-white/50 uppercase select-none">
          {period}
        </span>
      )}

      {/* Main Bold Number */}
      <span className="font-display font-extrabold text-white text-2xl sm:text-3xl md:text-4xl tracking-tight leading-none">
        {value}
      </span>

      {/* Split-Flap Horizontal Crease Line */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#0A0B0D] border-t border-black/90 border-b border-white/[0.08] pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Mechanical Side Hinge Notches */}
      <div
        className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r bg-[#0A0B0D] z-20"
        aria-hidden="true"
      />
      <div
        className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-2 rounded-l bg-[#0A0B0D] z-20"
        aria-hidden="true"
      />
    </div>
  );
}

export function HeroGlobalClocks() {
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
      <div className="h-20 sm:h-24 w-full flex items-center justify-center opacity-0">
        <span className="text-xs font-mono text-white/40">Loading world clocks...</span>
      </div>
    );
  }

  return (
    <div className="relative z-30 inline-flex flex-col items-center select-none">
      {/* Outer Dock Box */}
      <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#0D0E10]/85 backdrop-blur-xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
        {CLOCKS.map((clock, idx) => {
          const t = times[clock.id] || { hour: '12', minute: '00', period: 'AM' };

          return (
            <React.Fragment key={clock.id}>
              {idx > 0 && (
                <div
                  className="hidden sm:block w-[1px] h-12 bg-white/10"
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-col items-center">
                {/* City & Region Header */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] animate-pulse" />
                  <span className="font-display font-extrabold text-xs sm:text-[13px] text-white tracking-wide uppercase">
                    {clock.city}
                  </span>
                  <span className="text-[10px] font-mono text-stone tracking-wider uppercase">
                    · {clock.region}
                  </span>
                </div>

                {/* 2 Split Flip Tiles (Hour & Minute side-by-side) */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <FlipCard value={t.hour} period={t.period} />
                  <FlipCard value={t.minute} />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
