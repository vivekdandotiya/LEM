'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, ShieldCheck, Zap } from 'lucide-react';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';
import { Magnetic } from '@/motion/Magnetic';

export function ConversionCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[#121316] text-white border-b border-white/10 relative overflow-hidden select-none" data-surface="dark">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle 800px at 50% 100%, rgba(176,141,87,0.18), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/15 text-xs font-mono tracking-widest uppercase text-[#D9C29A] mb-8 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CURRENT AVAILABILITY: ACCEPTING NEW CLIENTS</span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#F6F3EC] leading-[1.05] max-w-4xl mx-auto mb-6">
          Ready to scale your digital{' '}
          <span className="font-serif italic font-normal text-[#D9C29A]">revenue?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Book a private 30-minute growth architecture session with our principal marketing directors. We inspect your acquisition funnels, organic search taxonomy, and unit economics.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-14">
          <Magnetic strength={0.25}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B08D57] hover:bg-[#C5A065] text-[#0F1011] text-base font-bold tracking-tight transition-all duration-200 shadow-xl hover:scale-105 active:scale-95"
            >
              <span>Book Strategy Call</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </Magnetic>

          <Magnetic strength={0.25}>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 text-base font-medium tracking-tight transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Explore All Disciplines</span>
            </Link>
          </Magnetic>
        </div>

        {/* 3 Value Pillars Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/10 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <Clock className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs font-mono font-bold tracking-wider text-white uppercase">2-Hour Response SLA</span>
              <span className="text-xs text-stone-400 mt-0.5 block">Direct reply from our senior partner desk.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <Zap className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs font-mono font-bold tracking-wider text-white uppercase">Complimentary Audit</span>
              <span className="text-xs text-stone-400 mt-0.5 block">Full review of current search &amp; ad data.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs font-mono font-bold tracking-wider text-white uppercase">Commercial Confidentiality</span>
              <span className="text-xs text-stone-400 mt-0.5 block">Mutual NDA signed before campaign review.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
