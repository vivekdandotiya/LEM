'use client';

import React from "react";
import { Sparkles, Shield, Cpu } from "lucide-react";
import SplitHeading from "@/motion/SplitHeading";
import WordHighlight from "@/motion/WordHighlight";
import ImageReveal from "@/motion/ImageReveal";
import Tilt3D from "@/motion/Tilt3D";

export function AboutPhilosophy() {
  const manifesto =
    "True authority in modern marketing cannot be bought with vanity spend or fabricated through hollow trends. It is earned through obsessive technical craft, editorial restraint, and compounding commercial impact.";

  const pillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-accent" />,
      title: "Restraint Over Noise",
      description:
        "The market is saturated with loud, commoditized marketing noise. We build brands that command authority through editorial polish, disciplined typography, and elevated aesthetics that convey unquestioned market leadership.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-accent" />,
      title: "Engineering First Principles",
      description:
        "Marketing without technical precision fails at scale. We treat digital platforms as high-performance software: optimizing Core Web Vitals, structuring schema entity graphs, and implementing server-side attribution engines.",
    },
    {
      icon: <Shield className="w-5 h-5 text-accent" />,
      title: "Attribution Honesty",
      description:
        "We never hide behind vanity metrics, inflated impressions, or simulated conversions. Our performance models are anchored strictly in unit economics: cost per qualified acquisition, organic pipeline lift, and compounding customer value.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-surface-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="pb-16 border-b border-charcoal-900/10">
          <span className="text-xs font-mono tracking-widest uppercase text-accent font-semibold block mb-3">
            01 / Guiding Philosophy
          </span>
          <SplitHeading
            as="h2"
            className="text-display-2 font-display font-medium text-charcoal-900 tracking-tight leading-tight uppercase max-w-2xl"
          >
            The Standards That Govern Every Deliverable.
          </SplitHeading>
        </div>

        {/* Word-by-Word Scrubbed Highlight Manifesto */}
        <div className="py-16 sm:py-20 border-b border-charcoal-900/10 max-w-4xl">
          <span className="text-xs font-mono uppercase tracking-widest text-warmgray-500 block mb-4">
            Agency Manifesto
          </span>
          <WordHighlight
            text={manifesto}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-medium text-charcoal-900 leading-[1.2] tracking-tight"
          />
        </div>

        {/* Dual Editorial Photography Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
          <div className="h-64 sm:h-80 w-full rounded-card overflow-hidden">
            <ImageReveal
              src="/images/about/philosophy-1.webp"
              alt="Design systems calibration and typographic standards"
              fill
              rounded="rounded-card"
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
          <div className="h-64 sm:h-80 w-full rounded-card overflow-hidden">
            <ImageReveal
              src="/images/about/philosophy-2.webp"
              alt="Technical performance architecture and analytics review"
              fill
              rounded="rounded-card"
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {pillars.map((pillar) => (
            <Tilt3D key={pillar.title} maxTilt={4}>
              <div className="card-glass-elevated p-8 rounded-card bg-white border border-charcoal-900/10 shadow-soft-sm flex flex-col justify-between h-full group hover:shadow-soft-lg transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-warm border border-charcoal-900/10 group-hover:border-accent group-hover:bg-accent group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-display font-medium text-charcoal-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-warmgray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
}
