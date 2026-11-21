'use client';

import React from 'react';

export interface PhoneMockupProps {
  appName: string;
  categoryBadge?: string;
  headline: string;
  subheadline?: string;
  badgeColor?: string;
  ctaText?: string;
  ctaColor?: string;
  callPhone?: string;
  rating?: string;
  theme?: 'light' | 'dark' | 'cream' | 'sage' | 'peach';
  className?: string;
  style?: React.CSSProperties;
  isYours?: boolean;
}

export function PhoneMockup({
  appName,
  categoryBadge,
  headline,
  subheadline,
  badgeColor = '#f7ac4f',
  ctaText = 'Book online',
  ctaColor = '#1f7a37',
  callPhone = '(02) 5550 0679',
  rating = '4.9 ★★★★★ 160 Google reviews',
  theme = 'light',
  className = '',
  style,
  isYours = false,
}: PhoneMockupProps) {
  const isDarkTheme = theme === 'dark';

  const getThemeBg = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#1b1c1e] text-white';
      case 'cream':
        return 'bg-[#FAF8F5] text-[#161514]';
      case 'sage':
        return 'bg-[#EBF2EE] text-[#161514]';
      case 'peach':
        return 'bg-[#FDF2EC] text-[#161514]';
      default:
        return 'bg-white text-[#161514]';
    }
  };

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`relative w-[240px] sm:w-[260px] h-[480px] sm:h-[500px] rounded-[36px] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border transition-all duration-300 ${
        isYours
          ? 'border-[#f7ac4f] border-[3px] shadow-[0_0_30px_rgba(247,172,79,0.35)] scale-105'
          : 'border-[#161514] border-[2.5px] bg-[#0c0d0e]'
      } ${className}`}
    >
      {/* Phone Speaker & Camera Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0c0d0e] rounded-full z-20 flex items-center justify-center">
        <div className="w-8 h-1 bg-[#222] rounded-full" />
      </div>

      {/* Screen Frame */}
      <div
        className={`w-full h-full rounded-[28px] overflow-hidden flex flex-col justify-between p-4 pt-6 select-none ${getThemeBg()}`}
      >
        {/* Top Header Row */}
        <div>
          <div className={`flex items-center justify-between gap-2 pb-3 border-b ${isDarkTheme ? 'border-white/10' : 'border-black/10'}`}>
            <div>
              <span className="font-display font-extrabold text-xs tracking-tight block">
                {appName}
              </span>
              {categoryBadge && (
                <span
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase mt-0.5 inline-block"
                  style={{
                    backgroundColor: isDarkTheme ? '#332714' : '#fef3c7',
                    color: isDarkTheme ? '#fde68a' : '#92400e',
                  }}
                >
                  {categoryBadge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isDarkTheme ? 'bg-white/10' : 'bg-black/5'}`}>
                📞
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${isDarkTheme ? 'bg-white/10 text-white' : 'bg-black/5 text-[#161514]'}`}>
                Menu
              </span>
            </div>
          </div>

          {/* Main Hero in Phone */}
          <div className="pt-4">
            <h4 className="font-display font-extrabold text-base sm:text-[17px] leading-[1.15] mb-2 tracking-tight">
              {headline}
            </h4>
            {subheadline && (
              <p className={`text-[11px] font-sans leading-snug line-clamp-3 ${isDarkTheme ? 'text-[#d6d3d1]' : 'text-[#44403c]'}`}>
                {subheadline}
              </p>
            )}
          </div>

          {/* Call / Action Pills */}
          <div className="mt-4 flex flex-col gap-2">
            {ctaText && (
              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl text-center text-xs font-bold text-white shadow-sm transition-transform active:scale-95"
                style={{ backgroundColor: ctaColor }}
              >
                {ctaText}
              </button>
            )}

            {callPhone && (
              <div className={`w-full py-1.5 px-3 rounded-xl text-center text-[11px] font-mono font-medium border ${isDarkTheme ? 'border-white/20 bg-white/5 text-[#f5f5f4]' : 'border-black/15 bg-black/[0.04] text-[#1c1917]'}`}>
                Call {callPhone}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Rating / Trust Bar in Phone */}
        <div className={`pt-3 border-t flex items-center justify-between text-[10px] font-mono ${isDarkTheme ? 'border-white/10' : 'border-black/10'}`}>
          <span className={`font-bold ${isDarkTheme ? 'text-[#fde68a]' : 'text-[#92400e]'}`}>{rating}</span>
          <span className={isDarkTheme ? 'text-[#a8a29e]' : 'text-[#57534e]'}>✓ Verified</span>
        </div>
      </div>
    </div>
  );
}
