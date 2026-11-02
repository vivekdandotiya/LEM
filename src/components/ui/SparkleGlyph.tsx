import React from 'react';

interface SparkleGlyphProps {
  className?: string;
  size?: number;
  spin?: boolean;
}

export function SparkleGlyph({
  className = 'text-lime',
  size = 20,
  spin = false,
}: SparkleGlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      className={`${spin ? 'animate-spin-slow' : ''} ${className}`}
      aria-hidden="true"
    >
      <path d="M24 3v42M3 24h42M9 9l30 30M39 9 9 39" />
    </svg>
  );
}
