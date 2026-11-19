'use client';

import React, { useEffect, useRef, useState } from 'react';

export type HeroAnimationVariant =
  | 'split-reveal'
  | 'kinetic-counter'
  | 'blur-dissolve'
  | 'wipe-up'
  | 'iris-fade';

export interface HeroTextAnimationProps {
  headline: string;
  italicWord?: string;
  tagline?: string;
  variant?: HeroAnimationVariant;
  className?: string;
}

export function HeroTextAnimation({
  headline,
  italicWord,
  tagline,
  variant = 'split-reveal',
  className = '',
}: HeroTextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const words = headline.split(' ');

  return (
    <div ref={containerRef} className={`select-none flex flex-col gap-4 ${className}`}>
      {/* Dynamic Headline Variant */}
      <h1 className="text-fs-hero font-display font-extrabold tracking-tight leading-[0.94] text-current">
        {variant === 'split-reveal' && (
          <span className="flex flex-wrap gap-x-3 gap-y-1 overflow-hidden">
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  className="inline-block transition-transform duration-700 ease-out"
                  style={{
                    transitionDelay: `${i * 65}ms`,
                    transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                  }}
                >
                  {word === italicWord ? (
                    <span className="font-serif italic font-normal text-[#5C4018] pr-1">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>{' '}
              </React.Fragment>
            ))}
          </span>
        )}

        {variant === 'kinetic-counter' && (
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  className="inline-block transition-transform duration-300 ease-editorial"
                  style={{
                    transitionDelay: `${i * 40}ms`,
                    transform: mounted ? 'scale(1)' : 'scale(0.92) translateY(8px)',
                  }}
                >
                  {word === italicWord ? (
                    <span className="font-serif italic font-normal text-[#5C4018] pr-1">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>{' '}
              </React.Fragment>
            ))}
          </span>
        )}

        {variant === 'blur-dissolve' && (
          <span
            className="inline-block transition-all duration-300 ease-out"
            style={{
              letterSpacing: mounted ? '-0.02em' : '0.04em',
            }}
          >
            {words.map((word, i) => (
              <React.Fragment key={i}>
                {word === italicWord ? (
                  <span className="font-serif italic font-normal text-[#5C4018] pr-1">
                    {word}
                  </span>
                ) : (
                  word
                )}{' '}
              </React.Fragment>
            ))}
          </span>
        )}

        {variant === 'wipe-up' && (
          <span className="inline-block relative overflow-hidden">
            <span
              className="inline-block transition-transform duration-500 ease-editorial"
              style={{
                transform: mounted ? 'translateY(0)' : 'translateY(100%)',
              }}
            >
              {words.map((word, i) => (
                <React.Fragment key={i}>
                  {word === italicWord ? (
                    <span className="font-serif italic font-normal text-[#5C4018] pr-1">
                      {word}
                    </span>
                  ) : (
                    word
                  )}{' '}
                </React.Fragment>
              ))}
            </span>
          </span>
        )}

        {variant === 'iris-fade' && (
          <span
            className="inline-block transition-transform duration-300 ease-out"
            style={{
              transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            {words.map((word, i) => (
              <React.Fragment key={i}>
                {word === italicWord ? (
                  <span className="font-serif italic font-normal text-gold-deep pr-1">
                    {word}
                  </span>
                ) : (
                  word
                )}{' '}
              </React.Fragment>
            ))}
          </span>
        )}
      </h1>

      {tagline && (
        <p
          className="text-base sm:text-xl font-sans text-stone max-w-2xl leading-relaxed transition-opacity duration-700 delay-300"
          style={{ opacity: mounted ? 1 : 0 }}
        >
          {tagline}
        </p>
      )}
    </div>
  );
}
