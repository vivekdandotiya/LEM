"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Sparkles, VolumeX, Eye } from "lucide-react";

interface PhoneFallbackProps {
  className?: string;
  isVisible?: boolean;
}

export function PhoneFallback({ className = "", isVisible = true }: PhoneFallbackProps) {
  const [likeCount, setLikeCount] = useState(14820);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(25);

  // Subtle live progress bar animation for social video reel (pauses when not visible)
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 100);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    } else {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <div className={`relative flex items-center justify-center p-4 ${className}`}>
      {/* Subtle warm champagne backdrop illumination */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      {/* Floating Tactical Annotation Cards (Anchored to screen plane) */}
      <div className="hidden sm:block absolute -left-12 top-24 z-20 bg-charcoal-900/90 backdrop-blur-md border border-white/15 p-3 rounded-xl shadow-glass text-white max-w-[190px] animate-pulse">
        <div className="flex items-center gap-1.5 text-accent-tint text-[10px] font-mono mb-1">
          <Sparkles className="w-3 h-3" />
          <span>Real-Time Engagement</span>
        </div>
        <p className="text-xs text-warmgray-200 font-medium leading-tight">
          +48.6% Brand Lift via Narrative Pacing
        </p>
      </div>

      <div className="hidden sm:block absolute -right-10 bottom-28 z-20 bg-charcoal-900/90 backdrop-blur-md border border-white/15 p-3 rounded-xl shadow-glass text-white max-w-[180px]">
        <div className="flex items-center gap-1.5 text-titanium text-[10px] font-mono mb-1">
          <Eye className="w-3 h-3 text-accent" />
          <span>Audience Retention</span>
        </div>
        <p className="text-xs text-warmgray-200 font-medium leading-tight">
          91.4% Watch-Through on Vertical Video
        </p>
      </div>

      {/* Flagship Titanium Smartphone Body (19.5:9 Proportions) */}
      <div className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] rounded-[48px] p-3 bg-gradient-to-b from-[#8E8A82] via-[#2A2A2C] to-[#121214] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/40">
        {/* Chamfered Inner Metallic Bezel */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black border border-white/10 flex flex-col justify-between">
          {/* Real editorial background image for authentic video feel */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about/approach-1.webp"
              alt="Vertical social media narrative campaign"
              fill
              className="object-cover object-center brightness-[0.72]"
              sizes="320px"
            />
          </div>

          {/* Glass Screen Glare Overlay */}
          <div
            aria-hidden="true"
            className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30 transform -rotate-12"
          />

          {/* Top Sensor Notch / Pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-charcoal-950 rounded-full z-40 flex items-center justify-center gap-3 px-3">
            <div className="w-2 h-2 rounded-full bg-[#18181A] border border-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          </div>

          {/* Dynamic Social Video Reel Simulation */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-5 text-white overflow-hidden bg-gradient-to-b from-black/60 via-transparent to-black/85">
            {/* Video Header UI */}
            <div className="pt-7 flex items-center justify-between text-xs text-warmgray-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-[11px] tracking-wider uppercase text-white font-semibold">
                  Lead Edge / Reel
                </span>
              </div>
              <div className="p-1 rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/10">
                <VolumeX className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Video Body Narrative */}
            <div className="my-auto text-center py-6 px-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-accent-tint block mb-2">
                Creative Direction
              </span>
              <h5 className="text-xl sm:text-2xl font-display font-medium text-white leading-snug tracking-tight drop-shadow-md">
                “Momentum is not accidental. It is engineered.”
              </h5>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white text-[11px] font-mono">
                <span>Campaign Phase 04</span>
              </div>
            </div>

            {/* Video Bottom UI & Social Actions */}
            <div className="flex items-end justify-between gap-4 pb-2">
              {/* Creator Info & Caption */}
              <div className="flex flex-col gap-1 max-w-[170px]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center font-bold text-[9px] text-black">
                    LE
                  </div>
                  <span className="text-xs font-semibold text-white">leadedge.marketing</span>
                </div>
                <p className="text-[11px] text-warmgray-200 leading-tight drop-shadow">
                  High-retention creative systems that turn attention into qualified pipeline.
                </p>
              </div>

              {/* Engagement Action Bar */}
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={handleLike}
                  className="flex flex-col items-center gap-0.5 focus:outline-none"
                  aria-label="Like video"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isLiked ? "bg-accent text-white" : "bg-black/40 backdrop-blur-sm border border-white/15 text-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  </div>
                  <span className="text-[10px] font-mono text-warmgray-300">
                    {likeCount.toLocaleString()}
                  </span>
                </button>

                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-warmgray-300">492</span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-warmgray-300">Share</span>
                </div>
              </div>
            </div>

            {/* Progress Hairline */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div
                className="h-full bg-accent transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
