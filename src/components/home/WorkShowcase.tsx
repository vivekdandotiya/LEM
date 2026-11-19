'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { media, ShowcaseCard } from '@/data/media';
import { Lightbox, LightboxItem } from '@/components/shared/Lightbox';
import { ArrowUpRight, Play } from 'lucide-react';

interface CardItemProps {
  card: ShowcaseCard;
  index: number;
  onSelect: (c: ShowcaseCard) => void;
}

function ShowcaseCardItem({ card, index, onSelect }: CardItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isVideo = card.type === 'video' && card.video;
  const imgSrc = isVideo ? card.video!.poster.src : card.image!.src;
  const imgAlt = isVideo ? card.video!.poster.alt : card.image!.alt;

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isVideo) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Check data saver & cellular throttling
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.connection?.saveData === true) return;
    if (nav.connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(nav.connection.effectiveType)) return;

    const el = containerRef.current;
    if (!el) return;

    let isIntersecting = false;
    let isTabVisible = document.visibilityState === 'visible';

    const updateVideoPlayback = () => {
      const vid = videoRef.current;
      if (!vid) return;

      if (isIntersecting && isTabVisible) {
        const promise = vid.play();
        if (promise !== undefined) {
          promise.then(() => setIsPlaying(true)).catch(() => {});
        }
      } else {
        vid.pause();
        setIsPlaying(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting && !shouldLoadVideo) {
          setShouldLoadVideo(true);
        }
        updateVideoPlayback();
      },
      { rootMargin: '120px' }
    );

    observer.observe(el);

    const handleVisibility = () => {
      isTabVisible = document.visibilityState === 'visible';
      updateVideoPlayback();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isVideo, shouldLoadVideo]);

  return (
    <div
      ref={containerRef}
      onClick={() => onSelect(card)}
      className="group relative rounded-[22px] overflow-hidden bg-white border border-ink/10 shadow-soft-sm hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Thumbnail / Video Container */}
      <div className="relative w-full aspect-[4/5] bg-charcoal overflow-hidden">
        {/* Static poster image always loaded for zero CLS and instant visual */}
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video mounted only when scrolled near viewport */}
        {isVideo && shouldLoadVideo && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out group-hover:scale-105 ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={card.video!.mobile} type="video/mp4" media="(max-width: 767px)" />
            <source src={card.video!.mp4} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono font-bold tracking-wider uppercase text-ink flex items-center gap-1.5">
          {isVideo && <Play className="w-2.5 h-2.5 fill-current text-gold" />}
          <span>{card.category}</span>
        </div>

        {/* Expand Action Pill */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-ink group-hover:bg-gold group-hover:text-ink transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Caption */}
      <div className="p-4 bg-white flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase text-stone">
            0{index + 1}
          </div>
          <h3 className="text-sm font-display font-bold text-ink group-hover:text-gold-deep transition-colors truncate">
            {card.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function WorkShowcase() {
  const [selectedItem, setSelectedItem] = useState<LightboxItem | null>(null);
  const cards: ShowcaseCard[] = media.home.showcase;

  const handleCardClick = (c: ShowcaseCard) => {
    setSelectedItem({
      id: c.id,
      title: c.title,
      brand: c.category,
      category: c.type === 'video' ? '1080p Video Reel' : 'Editorial Photography',
      image: c.image ? c.image.src : c.video ? c.video.poster.src : '',
      description: 'Concept work produced to demonstrate high-conversion creative and performance engineering.',
      year: '2026',
    });
  };

  return (
    <>
      <section id="work-showcase" className="py-24 sm:py-32 bg-[#F6F3EC] select-none border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-ink/10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                <span className="text-xs font-mono tracking-widest uppercase text-stone font-semibold">
                  02 / WORK SHOWCASE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-ink tracking-tight leading-tight">
                Selected executions.
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-sans text-stone max-w-sm leading-relaxed">
              Eight campaign and web productions spanning performance media, organic architecture, and visual editorial.
            </p>
          </div>

          {/* 8-Card Grid: 4 columns x 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((c, idx) => (
              <ShowcaseCardItem
                key={c.id}
                card={c}
                index={idx}
                onSelect={handleCardClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
