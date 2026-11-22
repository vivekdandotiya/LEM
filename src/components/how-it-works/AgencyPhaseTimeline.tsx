'use client';

import React, { useState } from 'react';
import {
  Search,
  Compass,
  FileCode,
  Rocket,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  BarChart2,
  Cpu,
} from 'lucide-react';
import Link from 'next/link';

interface Phase {
  phase: string;
  badge: string;
  timeline: string;
  title: string;
  subtitle: string;
  summary: string;
  deliverables: string[];
  disciplines: { label: string; icon: string }[];
  proofMetric: { value: string; label: string };
  actionText: string;
}

const PHASES: Phase[] = [
  {
    phase: '01',
    badge: 'Discovery & Telemetry',
    timeline: 'Day 0 – 1 · Zero Cost',
    title: 'Full-Funnel Audit & Competitor Telemetry',
    subtitle: 'Uncovering indexation leaks, ad spend waste & conversion friction',
    summary:
      'We never make assumptions. We start by auditing your existing search indexation, Meta ad account match rates, competitor keyword clusters, and mobile checkout friction to build an evidence-backed baseline.',
    deliverables: [
      'Comprehensive 100-Point Technical SEO & Server Audit',
      'Meta Pixel & Server-Side CAPI Event Match Quality Test',
      'High-Intent Competitor Keyword & Topical Gap Report',
      'Mobile UX Lighthouse Speed & Core Web Vitals Diagnostic',
    ],
    disciplines: [
      { label: 'Technical SEO', icon: '🔍' },
      { label: 'Ad Telemetry', icon: '📊' },
      { label: 'Conversion UX', icon: '⚡' },
    ],
    proofMetric: {
      value: '100%',
      label: 'Objective diagnostic data before touching code',
    },
    actionText: 'Request Free Initial Audit',
  },
  {
    phase: '02',
    badge: 'Strategic Architecture',
    timeline: 'Day 2 – 4 · Blueprint Walkthrough',
    title: 'Custom Revenue Blueprint & Creative Strategy',
    subtitle: 'Structuring the full stack: keywords, ad hooks, and site layout',
    summary:
      'Our team crafts your custom growth architecture. We map out every keyword cluster, draft 10+ social video hook angles, design sub-second Next.js page layouts, and present the complete blueprint on a 15-minute executive call.',
    deliverables: [
      'Interactive Next.js 15 Wireframe & Conversion Architecture',
      'Single-Theme Ad Group (STAG) Google Ads Intent Map',
      '10-Variant Meta Paid Social Video Hook & Angle Matrix',
      'Executive 15-Minute Strategy Review & Clear Cost Forecast',
    ],
    disciplines: [
      { label: 'Web Architecture', icon: '💻' },
      { label: 'Paid Social Hooks', icon: '🎯' },
      { label: 'Topical Taxonomy', icon: '🗺️' },
    ],
    proofMetric: {
      value: '15 Mins',
      label: 'Zero obligation executive walkthrough call',
    },
    actionText: 'Book 15-Min Walkthrough',
  },
  {
    phase: '03',
    badge: 'Production & Launch',
    timeline: 'Day 5 – 14 · Coordinated Deployment',
    title: 'Technical Implementation & Coordinated Go-Live',
    subtitle: 'Deploying edge code, firing live campaigns & rolling out media',
    summary:
      'Once approved, our engineering and creative teams build the full infrastructure: compiling high-speed React Server Components, staging tracking pipelines, shooting or grading video assets, and launching targeted ads.',
    deliverables: [
      'Production Deployment on Next.js 15 & Global Edge CDN',
      'Google Ads & Meta Ads Campaign Activation with CAPI',
      '4K Cinematic Brand Video Assets & 9:16 Social Cutdowns',
      'NAP Citation Sync across 50+ Australian Local Directories',
    ],
    disciplines: [
      { label: 'Full-Stack Code', icon: '⚡' },
      { label: 'Ad Campaign Launch', icon: '🚀' },
      { label: 'Studio Cinema', icon: '🎬' },
    ],
    proofMetric: {
      value: '14 Days',
      label: 'From kickoff to fully live revenue generation',
    },
    actionText: 'Explore Service Retainers',
  },
  {
    phase: '04',
    badge: 'Growth Compounding',
    timeline: 'Day 15+ · Continuous Iteration',
    title: 'Algorithmic Optimization & Attribution Scaling',
    subtitle: 'Weekly search negative scrubbing, hook testing & CRO',
    summary:
      'Growth is never static. We continuously analyze real user interactions, harvest negative keywords in Google Ads, test fresh weekly video creative hooks on Meta, and iterate landing page conversion rates.',
    deliverables: [
      'Weekly Search Query Harvesting & Negative Keyword Scrubbing',
      'Iterative Meta Hook Rotation (Killing Fatigue, Scaling Winners)',
      'A/B Conversion Rate Optimization on Mobile Call Triggers',
      'Live 24/7 Looker Studio Dashboard with First-Party Attribution',
    ],
    disciplines: [
      { label: 'Attribution Tracking', icon: '📈' },
      { label: 'Creative Refresh', icon: '🔄' },
      { label: 'Conversion CRO', icon: '🧪' },
    ],
    proofMetric: {
      value: '$249/mo',
      label: 'Flat transparent growth rate with no hidden markups',
    },
    actionText: 'See Pricing Tiers',
  },
];

export function AgencyPhaseTimeline() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const current = PHASES[activePhaseIndex];

  return (
    <section className="py-20 sm:py-32 bg-white text-[#161514] select-none border-b border-[#e8e6e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              The 14-Day Delivery Pipeline
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.06] mb-4">
            From initial audit to live revenue in 14 days.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed">
            No 3-month agency onboarding delays or vague retainers. We execute across search, paid media, code, and cinema video through an accountable four-phase sprint.
          </p>
        </div>

        {/* Phase Selector Steps Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
          {PHASES.map((p, idx) => {
            const isActive = idx === activePhaseIndex;
            return (
              <button
                key={p.phase}
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-5 sm:p-6 rounded-[24px] border text-left transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#161514] text-white border-[#161514] shadow-xl -translate-y-1'
                    : 'bg-[#FAF8F5] text-[#161514] border-[#e8e6e2] hover:border-[#161514]/30'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#f7ac4f]" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-2xl sm:text-3xl font-display font-black ${
                        isActive ? 'text-[#f7ac4f]' : 'text-[#161514]'
                      }`}
                    >
                      {p.phase}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/10 text-white/90'
                          : 'bg-[#161514]/5 text-[#5d5a55]'
                      }`}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-display font-extrabold mb-1 leading-snug line-clamp-2 ${
                      isActive ? 'text-white' : 'text-[#161514]'
                    }`}
                  >
                    {p.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-current/10">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isActive ? 'text-[#f7ac4f]' : 'text-[#b45309]'
                    }`}
                  >
                    {p.timeline}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="rounded-[32px] bg-[#FAF8F5] border border-[#e8e6e2] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Columns: Context & Deliverables Checklist */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-[#f7ac4f]/20 text-[#b45309]">
                    Phase {current.phase} · {current.timeline}
                  </span>
                  <div className="flex items-center gap-2">
                    {current.disciplines.map((d) => (
                      <span
                        key={d.label}
                        className="text-xs font-sans font-semibold bg-white border border-[#e8e6e2] px-2.5 py-0.5 rounded-full text-[#5d5a55] flex items-center gap-1"
                      >
                        <span>{d.icon}</span>
                        <span>{d.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#161514] mb-3 leading-tight">
                  {current.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#b45309] font-medium mb-5">
                  {current.subtitle}
                </p>
                <p className="font-sans text-sm sm:text-base text-[#5d5a55] leading-relaxed mb-8">
                  {current.summary}
                </p>

                {/* Deliverables Checklist */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-bold text-[#161514] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#f7ac4f]" />
                    <span>Tangible Deliverables You Receive in Phase {current.phase}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {current.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-white border border-[#e8e6e2] flex items-start gap-2.5 shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-sans font-medium text-[#161514] leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-[#e8e6e2] flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#161514] hover:bg-black text-white font-sans font-bold text-sm transition-transform active:scale-95 shadow-md"
                >
                  <span>{current.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-[#f7ac4f]" />
                </Link>
                <span className="text-xs font-sans text-[#787570] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1f7a37]" />
                  <span>No long lock-ins. Keep all strategy docs unconditionally.</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Proof Card & Metric Highlight */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-8 rounded-[28px] bg-[#161514] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-mono font-bold text-[#f7ac4f] uppercase tracking-wider block mb-2">
                    Phase Outcome Standard
                  </span>
                  <div className="text-4xl sm:text-5xl font-display font-black text-white mb-2">
                    {current.proofMetric.value}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#d9d6d1] mb-6">
                    {current.proofMetric.label}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/60">Execution Speed:</span>
                      <span className="text-[#f7ac4f] font-bold">14-Day Cycle</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/60">Attribution Model:</span>
                      <span className="text-white font-bold">First-Party CAPI</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/60">Client Ownership:</span>
                      <span className="text-[#1f7a37] font-bold">100% Retained</span>
                    </div>
                  </div>
                </div>

                {/* Subtle gradient flare */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#f7ac4f]/15 blur-3xl pointer-events-none" />
              </div>

              {/* Callout quote */}
              <div className="p-6 rounded-[24px] bg-white border border-[#e8e6e2] shadow-xs">
                <p className="font-sans text-xs sm:text-sm italic text-[#5d5a55] leading-relaxed mb-3">
                  “We eliminate the guesswork. By delivering a complete technical roadmap and creative hook variants before scaling spend, you see the exact ROI logic before risking capital.”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f7ac4f] text-[#161514] flex items-center justify-center font-display font-bold text-xs">
                    LE
                  </div>
                  <div>
                    <span className="text-xs font-sans font-bold text-[#161514] block">
                      Lead Edge Growth Strategy
                    </span>
                    <span className="text-[11px] font-sans text-[#787570]">
                      Sydney, Melbourne, Brisbane
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
