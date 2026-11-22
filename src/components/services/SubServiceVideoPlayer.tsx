'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface SubServiceVideoPlayerProps {
  mp4: string;
  webm?: string;
  poster: string;
  title: string;
  tagline: string;
}

export function SubServiceVideoPlayer({
  mp4,
  webm,
  poster,
  title,
  tagline,
}: SubServiceVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tryAutoplay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        setHasStarted(true);
      } catch {
        // Autoplay policy prevented playback, poster stays visible
        setIsPlaying(false);
      }
    };

    tryAutoplay();
  }, [mp4]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#e8e6e2] bg-[#161514] shadow-2xl p-2 sm:p-2.5 group select-none">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 text-white/80 text-[11px] font-mono border-b border-white/10 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
          <span className="font-bold text-white tracking-wide">LEAD EDGE GROWTH LAB</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#f7ac4f] font-mono">
            {isPlaying ? '● LIVE STREAM' : '❚❚ PAUSED'}
          </span>
        </div>
      </div>

      {/* Screen Frame with Video & Underlying Guaranteed Poster */}
      <div
        className="relative aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#0c0c0d] cursor-pointer"
        style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? 'Pause production preview' : 'Play production preview'}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            togglePlay();
          }
        }}
      >
        {/* Guaranteed Crisp Poster Image (Never shows black screen) */}
        <Image
          src={poster}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover object-center pointer-events-none"
        />

        {/* Ambient Video on Top with Hardware-Accelerated Smooth Playback */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster={poster}
          onPlaying={() => {
            setIsPlaying(true);
            setHasStarted(true);
          }}
          onError={() => setIsPlaying(false)}
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isPlaying || hasStarted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>

        {/* Subtle Ambient Vignette (Keeps image bright while protecting text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        {/* Interactive Play/Pause Floating Pill */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-mono font-semibold border border-white/20 transition-all active:scale-95 shadow-lg"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#f7ac4f]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#f7ac4f] fill-[#f7ac4f]" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs border border-white/20 transition-all active:scale-95 shadow-lg"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white/70" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#f7ac4f]" />
            )}
          </button>
        </div>

        {/* Bottom Tagline & Spec Pill */}
        <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 flex items-center justify-between text-white text-xs font-mono drop-shadow pointer-events-none">
          <span className="truncate pr-2 font-medium text-white/95">{tagline}</span>
          <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-[#f7ac4f] font-bold">
            1080P HD
          </span>
        </div>
      </div>
    </div>
  );
}
