'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';

// Eligible characters with stable baselines and no descenders
const ELIGIBLE_REGEX = /[ELTHMKkdbhtr]/;

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface DripSVGProps {
  color?: string;
  delay?: number;
}

export function DripSVG({ color = '#080A0B', delay = 0 }: DripSVGProps) {
  const delaySec = `${delay.toFixed(2)}s`;

  return (
    <span className="ink-drip-drop" aria-hidden="true">
      <svg
        width="12"
        height="38"
        viewBox="0 0 12 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        {/* Phase 1 & 4: Swelling & snapping baseline meniscus */}
        <ellipse
          cx="6"
          cy="1"
          rx="3.2"
          ry="1.4"
          fill={color}
          className="drip-meniscus"
          style={{ animationDelay: delaySec }}
        />

        {/* Phase 2: Capillary neck stem */}
        <path
          d="M 5.1 1.2 Q 6 10, 6 13 Q 6 10, 6.9 1.2 Z"
          fill={color}
          className="drip-stem"
          style={{ animationDelay: delaySec }}
        />

        {/* Phase 2 & 3: Droplet bulb & specular highlight */}
        <g className="drip-bulb-group" style={{ animationDelay: delaySec }}>
          <circle cx="6" cy="13" r="2.4" fill={color} />
          {/* Specular highlight */}
          <circle cx="5.2" cy="12.2" r="0.6" fill="#FFFFFF" opacity="0.65" />
        </g>
      </svg>
    </span>
  );
}

interface InkDripTextProps {
  text: string;
  className?: string;
  color?: string;
  maxDrips?: number;
}

export function InkDripText({
  text,
  className = '',
  color = '#080A0B',
  maxDrips = 2,
}: InkDripTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isDripsDisabled, setIsDripsDisabled] = useState(false);

  useEffect(() => {
    // Check ?drips=0 URL override and prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('drips') === '0') {
        setIsDripsDisabled(true);
        document.body.setAttribute('data-drips', '0');
        return;
      }
      const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (rm) {
        setIsDripsDisabled(true);
        return;
      }
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '20% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute deterministic drip anchors
  const words = useMemo(() => text.split(' '), [text]);
  const textHash = useMemo(() => hashString(text), [text]);

  // Determine which words get drips (at most 1 per 4-7 words, capped at maxDrips)
  const dripWordIndices = useMemo(() => {
    const indices: number[] = [];
    if (words.length <= 2) {
      indices.push(0);
    } else {
      const step = Math.max(3, Math.floor(words.length / (maxDrips + 1)));
      for (let i = 0; i < words.length && indices.length < maxDrips; i += step) {
        const candidateWordIndex = (i + (textHash % step)) % words.length;
        if (!indices.includes(candidateWordIndex)) {
          indices.push(candidateWordIndex);
        }
      }
    }
    return indices;
  }, [words, maxDrips, textHash]);

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, wIdx) => {
        const shouldDrip = dripWordIndices.includes(wIdx) && isInView && !isDripsDisabled;

        if (!shouldDrip) {
          return (
            <React.Fragment key={wIdx}>
              {word}
              {wIdx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        }

        // Find the first eligible character in the word
        let targetCharIdx = -1;
        for (let c = 0; c < word.length; c++) {
          if (ELIGIBLE_REGEX.test(word[c])) {
            targetCharIdx = c;
            break;
          }
        }

        if (targetCharIdx === -1) {
          return (
            <React.Fragment key={wIdx}>
              {word}
              {wIdx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        }

        const before = word.slice(0, targetCharIdx);
        const targetChar = word[targetCharIdx];
        const after = word.slice(targetCharIdx + 1);
        const delay = (wIdx * 1.8 + (textHash % 3)) % 8;

        return (
          <React.Fragment key={wIdx}>
            {before}
            <span className="ink-drip-anchor">
              {targetChar}
              <DripSVG color={color} delay={delay} />
            </span>
            {after}
            {wIdx < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </span>
  );
}

// Button anchor for primary CTA buttons
export function InkDripAnchorChar({
  char,
  color = '#080A0B',
  delay = 0.5,
}: {
  char: string;
  color?: string;
  delay?: number;
}) {
  return (
    <span className="ink-drip-anchor">
      {char}
      <DripSVG color={color} delay={delay} />
    </span>
  );
}
