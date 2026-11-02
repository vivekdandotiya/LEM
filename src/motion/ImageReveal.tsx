'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  rounded?: string;
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes = '100vw',
  rounded = 'rounded-card',
}: ImageRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const wrap = wrapRef.current;
        const img = imgRef.current;
        if (!wrap || !img) return;

        gsap.fromTo(
          wrap,
          { clipPath: 'inset(12% 12% 12% 12% round 24px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            duration: 1.3,
            ease: 'power4.out',
            scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
          }
        );

        gsap.fromTo(
          img,
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
          }
        );

        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: wrap, scrub: true },
        });
      });
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${rounded} ${className}`}>
      <div ref={imgRef} className="w-full h-full will-change-transform">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 400}
            priority={priority}
            className="object-cover w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
