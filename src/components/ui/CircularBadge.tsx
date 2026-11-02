'use client';

import React from 'react';
import { ArrowDownRight } from 'lucide-react';

interface CircularBadgeProps {
  text?: string;
  className?: string;
  size?: number;
}

export function CircularBadge({
  text = 'STRATEGY • CREATIVE • GROWTH • MOMENTUM • ',
  className = '',
  size = 120,
}: CircularBadgeProps) {
  const id = React.useId();
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer rotating circular text */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-[spin_20s_linear_infinite] motion-reduce:animate-none origin-center"
      >
        <defs>
          <path
            id={`circlePath-${id}`}
            d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
          />
        </defs>
        <text className="text-[9.5px] uppercase font-mono font-medium fill-charcoal-700 tracking-[0.24em]">
          <textPath href={`#circlePath-${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center stationary core badge */}
      <div className="absolute inset-[24%] rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm flex items-center justify-center text-charcoal-900 shadow-soft-sm">
        <ArrowDownRight className="w-4 h-4 text-accent" />
      </div>
    </div>
  );
}
