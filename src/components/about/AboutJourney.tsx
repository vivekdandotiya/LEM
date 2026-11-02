'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WordHighlight from '@/motion/WordHighlight';
import Tilt3D from '@/motion/Tilt3D';
import { PhoneScene } from '@/components/three/PhoneScene';
import { Layers, Sparkles, Cpu, Shield, ArrowUpRight } from 'lucide-react';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';
import { Magnetic } from '@/motion/Magnetic';

export function AboutJourney() {
  const [activeChapter, setActiveChapter] = useState(1);

  const chapters = [
    { id: 1, label: '01 / Origin' },
    { id: 2, label: '02 / Manifesto' },
    { id: 3, label: '03 / 3D Craft' },
    { id: 4, label: '04 / Why Us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sec1 = document.getElementById('chapter-1')?.getBoundingClientRect();
      const sec2 = document.getElementById('chapter-2')?.getBoundingClientRect();
      const sec3 = document.getElementById('chapter-3')?.getBoundingClientRect();
      const sec4 = document.getElementById('chapter-4')?.getBoundingClientRect();

      const offset = window.innerHeight * 0.45;

      if (sec4 && sec4.top <= offset) {
        setActiveChapter(4);
      } else if (sec3 && sec3.top <= offset) {
        setActiveChapter(3);
      } else if (sec2 && sec2.top <= offset) {
        setActiveChapter(2);
      } else {
        setActiveChapter(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id: number) => {
    const el = document.getElementById(`chapter-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const manifestoText =
    "Ambitious brands do not need bloated agencies executing fragmented tactics. They need an integrated growth partner uniting bold design craft with algorithmic media discipline. Every channel pulls the same way. Less noise. More momentum.";

  const whyUsChips = [
    {
      icon: <Layers className="w-5 h-5 text-ink" />,
      title: "Unified Channels",
      desc: "Creative, ads, search, web pull together.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-ink" />,
      title: "Performance Creative",
      desc: "Built to halt the scroll and convert.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-ink" />,
      title: "Conversion Web",
      desc: "Sub-second sites that capture demand.",
    },
    {
      icon: <Shield className="w-5 h-5 text-ink" />,
      title: "Plain-English Reporting",
      desc: "Clear dashboards without agency jargon.",
    },
  ];

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 bg-transparent select-none">
      {/* Sticky Journey Navigation Bar */}
      <div className="sticky top-20 z-40 max-w-2xl mx-auto px-4 mb-14">
        <div className="card-glass-elevated bg-paper-2/90 backdrop-blur-md p-2 rounded-full border border-ink/10 flex items-center justify-between shadow-soft-sm">
          <div className="flex items-center gap-2 pl-3">
            <SparkleGlyph size={14} className="text-lime" spin={true} />
            <span className="text-[11px] font-mono uppercase tracking-wider text-grey-3 font-semibold hidden sm:inline">
              Story
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {chapters.map((ch) => {
              const isCurrent = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChapter(ch.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                    isCurrent
                      ? 'bg-ink text-white font-bold shadow-sm'
                      : 'text-grey-3 hover:text-ink hover:bg-paper'
                  }`}
                >
                  {ch.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chapter 01: Origin Hero with P09 Photo & "5+ YEARS" Sticker */}
      <section id="chapter-1" className="scroll-mt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-28">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
              01 / ORIGIN
            </span>
          </div>
          {/* Rotated Sticker Badge per Section 8 ("5+ YEARS" Confirm) */}
          <span className="sticker-badge">5+ Years (Confirm)</span>
        </div>

        {/* H1 max 8 words */}
        <h1 className="text-fs-xl font-display font-extrabold text-ink tracking-tight leading-[0.92] max-w-4xl mb-8">
          Engineering momentum for ambitious <span className="serif-swap text-ink">brands.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Studio Photography P09 */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden card-glass-elevated border border-ink/10 shadow-soft-md">
            <Image
              src="/images/pages/P09-about-hero-4x5.webp"
              alt="Lead Edge Studio Headquarters"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
              <span className="uppercase tracking-widest">Lead Edge Headquarters</span>
              <span className="text-lime">CIR-02 Verified Workspace</span>
            </div>
          </div>

          {/* Right Text Column: max words */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-6 sm:p-7 rounded-[20px] bg-paper-2 border border-ink/10 card-glass-elevated">
              <span className="text-[11px] font-mono uppercase text-grey-2 tracking-wider block mb-2">
                Mission
              </span>
              <h3 className="text-xl font-display font-bold text-ink mb-2">
                Zero Fragmented Tactics
              </h3>
              <p className="text-sm font-sans text-grey-3 leading-relaxed">
                We unite high-craft creative with algorithmic search and media buying.
              </p>
            </div>
            <div className="p-6 sm:p-7 rounded-[20px] bg-paper-2 border border-ink/10 card-glass-elevated">
              <span className="text-[11px] font-mono uppercase text-grey-2 tracking-wider block mb-2">
                Promise
              </span>
              <h3 className="text-xl font-display font-bold text-ink mb-2">
                Trackable Enquiries
              </h3>
              <p className="text-sm font-sans text-grey-3 leading-relaxed">
                Steady pipeline growth replacing random posting and hollow vanity metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 02: Word-by-Word Manifesto (under 40 words) + P10 */}
      <section id="chapter-2" className="scroll-mt-36 py-24 border-y border-ink/10 bg-paper-2/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
              02 / MANIFESTO
            </span>
          </div>

          {/* Word-by-Word Manifesto Scroll Highlight (34 words total) */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink leading-tight mb-12">
            <WordHighlight text={manifestoText} />
          </div>

          {/* Workshop photo P10 */}
          <div className="max-w-xl mx-auto aspect-square rounded-[24px] overflow-hidden card-glass-elevated border border-ink/10 shadow-soft-md relative">
            <Image
              src="/images/pages/P10-about-process-1x1.webp"
              alt="Strategy Mapping Workshop"
              fill
              sizes="(max-width: 640px) 100vw, 600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
              <span className="uppercase tracking-widest">Strategy Mapping</span>
              <span className="text-lime">Stage 01</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 03: 3D Phone Scene (Tactile Immersion) */}
      <section id="chapter-3" className="scroll-mt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-ink/10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                03 / CRAFT
              </span>
            </div>
            {/* H2 max 7 words */}
            <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
              Tactile mobile experiences that <span className="serif-swap text-ink">convert.</span>
            </h2>
          </div>
          <p className="text-sm font-sans text-grey-3 max-w-xs">
            Interactive Three.js viewport · Drag to rotate frame
          </p>
        </div>

        {/* 3D Phone Canvas Shell with Bronze Accent Frame */}
        <div className="relative w-full h-[540px] sm:h-[620px] rounded-[28px] overflow-hidden bg-charcoal border border-white/10 shadow-soft-lg flex items-center justify-center dark-dots">
          <PhoneScene />
        </div>
      </section>

      {/* Chapter 04: "Why Us" as 4 Icon Chips */}
      <section id="chapter-4" className="scroll-mt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16">
        <div className="pb-10 border-b border-ink/10 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
              04 / WHY US
            </span>
          </div>
          {/* H2 max 7 words */}
          <h2 className="text-fs-lg font-display font-extrabold text-ink tracking-tight leading-[0.96]">
            Four principles behind our <span className="marker-sweep is-active">momentum.</span>
          </h2>
        </div>

        {/* 4 Icon Chips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsChips.map((chip, idx) => (
            <Tilt3D key={idx} maxTilt={6}>
              <div className="p-7 rounded-[22px] bg-paper-2 border border-ink/10 card-glass-elevated flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-lime flex items-center justify-center mb-5 shadow-sm">
                    {chip.icon}
                  </div>
                  {/* Title max 4 words */}
                  <h3 className="text-xl font-display font-bold text-ink mb-2">
                    {chip.title}
                  </h3>
                  {/* Desc max 12 words */}
                  <p className="text-sm font-sans text-grey-3 leading-snug">
                    {chip.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between text-xs font-mono text-grey-2">
                  <span>Pillar {idx + 1}</span>
                  <ArrowUpRight className="w-4 h-4 text-ink" />
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>
    </div>
  );
}
