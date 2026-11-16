'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CylinderCard {
  id: string;
  title: string;
  tagline: string;
  image: string;
  slug: string;
}

export interface CylinderGalleryProps {
  cards?: CylinderCard[];
  radius?: number; // default 360px
  className?: string;
}

const DEFAULT_CYLINDER_CARDS: CylinderCard[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization',
    tagline: 'Discoverability Architecture',
    image: '/images/services/cylinder-strategy-session.webp',
    slug: 'seo',
  },
  {
    id: 'ppc',
    title: 'Pay-Per-Click Advertising',
    tagline: 'Precision Acquisition',
    image: '/images/hero/hero-04-stridefit-runner-4x5.webp',
    slug: 'ppc',
  },
  {
    id: 'social',
    title: 'Social Media Marketing',
    tagline: 'Brand Gravity & Resonance',
    image: '/images/hero/hero-07-ember-roasters-coffee-4x5.webp',
    slug: 'social-media',
  },
  {
    id: 'web',
    title: 'Web Development',
    tagline: 'Engineered High Conversion',
    image: '/images/hero/hero-10-barkley-bites-dog-4x5.webp',
    slug: 'web-development',
  },
  {
    id: 'video',
    title: 'Video & Photo Production',
    tagline: 'Cinematic Editorial Visuals',
    image: '/images/services/video-photo/cylinder.webp',
    slug: 'video-photo',
  },
];

export function CylinderGallery({
  cards = DEFAULT_CYLINDER_CARDS,
  radius = 340,
  className = '',
}: CylinderGalleryProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentAngleRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  const cardCount = cards.length;
  const angleStep = 360 / cardCount;

  // Auto-rotation loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHovered && !isDragging) {
        currentAngleRef.current += delta * 12; // 12 degrees per second
        setRotationAngle(currentAngleRef.current);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered, isDragging]);

  // Pointer drag listeners
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    currentAngleRef.current -= deltaX * 0.35;
    setRotationAngle(currentAngleRef.current);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`relative w-full h-[480px] sm:h-[540px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1400px' }}
      aria-label="Interactive 3D Cylinder Gallery"
    >
      {/* 3D Rotating Stage */}
      <div
        className="relative w-64 sm:w-72 h-[380px] sm:h-[420px] transition-transform duration-75 ease-linear"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${-rotationAngle}deg)`,
        }}
      >
        {cards.map((card, idx) => {
          const cardAngle = idx * angleStep;
          return (
            <div
              key={card.id}
              className="absolute inset-0 rounded-[24px] overflow-hidden bg-white border border-ink/10 shadow-soft-lg flex flex-col justify-between"
              style={{
                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Card Image */}
              <div className="relative w-full h-3/5 bg-charcoal overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold uppercase text-ink">
                  0{idx + 1}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-deep font-semibold block mb-1">
                    {card.tagline}
                  </span>
                  <h4 className="text-base font-display font-bold text-ink leading-snug">
                    {card.title}
                  </h4>
                </div>

                <Link
                  href={`/services/${card.slug}`}
                  className="text-xs font-mono text-ink font-semibold flex items-center justify-between pt-2 border-t border-ink/8 hover:text-gold transition-colors"
                >
                  <span>Explore discipline</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
