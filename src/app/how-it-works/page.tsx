import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Search,
  Target,
  Zap,
  Share2,
  Video,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Phone,
} from 'lucide-react';
import { ServiceExecutionTree } from '@/components/how-it-works/ServiceExecutionTree';
import { AgencyPhaseTimeline } from '@/components/how-it-works/AgencyPhaseTimeline';
import { AgencyComparisonTable } from '@/components/how-it-works/AgencyComparisonTable';

export const metadata: Metadata = {
  title: 'How It Works — Digital Marketing Execution Architecture | Lead Edge Marketers',
  description:
    'Explore our multi-service execution architecture across Organic Search (SEO), Performance Ads (Meta & Google), Next.js Web Development, Social Media, and Commercial Cinema Video.',
  alternates: {
    canonical: '/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <main className="bg-white text-[#161514] select-none">
      {/* =========================================================================
          1. HERO HEADER: FULL-SPECTRUM DIGITAL MARKETING ARCHITECTURE
          ========================================================================= */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-white border-b border-[#e8e6e2] relative overflow-hidden">
        {/* Subtle decorative dot matrix */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#161514 1px, transparent 1px), radial-gradient(#161514 1px, #FAF8F5 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              The Agency Execution Framework
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.04] mb-6">
            How we work. Service by service.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg sm:text-xl text-[#5d5a55] leading-relaxed max-w-3xl mx-auto mb-10">
            From search engine dominance and high-intent Meta ad funnels to sub-second Next.js web applications and cinematic video creative — see how all 5 disciplines interconnect into a single growth engine.
          </p>

          {/* Quick Pillar Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 max-w-4xl mx-auto mb-10 text-xs font-mono font-bold">
            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] flex items-center justify-center gap-1.5 text-[#1f7a37]">
              <span>🔍</span>
              <span>Organic SEO</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] flex items-center justify-center gap-1.5 text-[#2563eb]">
              <span>🎯</span>
              <span>Paid Social & PPC</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] flex items-center justify-center gap-1.5 text-[#b45309]">
              <span>⚡</span>
              <span>Next.js Code</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] flex items-center justify-center gap-1.5 text-[#7c3aed]">
              <span>📱</span>
              <span>Social Media</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 text-[#be185d]">
              <span>🎬</span>
              <span>Cinema Video</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#execution-tree"
              className="px-6 py-3.5 rounded-full bg-[#161514] hover:bg-black text-white font-sans font-bold text-sm transition-transform active:scale-95 shadow-md flex items-center gap-2"
            >
              <span>Explore Execution Tree</span>
              <span className="text-[#f7ac4f]">↓</span>
            </a>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-sm transition-transform active:scale-95 shadow-sm"
            >
              Get a Free Blueprint
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MULTI-SERVICE EXECUTION TREE (INTERACTIVE DISCIPLINE CONNECTOR)
          ========================================================================= */}
      <div id="execution-tree">
        <ServiceExecutionTree />
      </div>

      {/* =========================================================================
          3. 4-PHASE AGENCY TIMELINE (DAY 0 TO DAY 14)
          ========================================================================= */}
      <AgencyPhaseTimeline />

      {/* =========================================================================
          4. COMPARISON MATRIX: TRADITIONAL AGENCIES VS SOLO VS LEAD EDGE
          ========================================================================= */}
      <AgencyComparisonTable />

      {/* =========================================================================
          5. BOTTOM CONSULTATION BLUEPRINT CTA (BDOG DARK BANNER STYLE)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#161514] text-white select-none relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-mono font-bold uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span>Zero Obligation · Direct Strategy Review</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.06] mb-4">
            Ready to inspect your custom growth blueprint?
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#d9d6d1] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Send your current website address or business name. We audit your search rankings, ad funnels, and conversion bottlenecks, then present the custom strategy on a 15-minute call tomorrow.
          </p>

          {/* Form */}
          <div className="max-w-md mx-auto mb-6">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-base transition-transform active:scale-95 shadow-lg"
            >
              <span>Get Your Free Strategy Blueprint</span>
              <ArrowRight className="w-5 h-5 text-[#161514]" />
            </Link>
          </div>

          {/* Phone & Direct Reassurance */}
          <p className="text-xs font-sans text-[#d1cec7] flex items-center justify-center gap-2">
            <span>Prefer to speak directly? Call our Sydney desk at</span>
            <a
              href="tel:0452424845"
              className="text-[#f7ac4f] hover:underline font-bold inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0452 424 845</span>
            </a>
          </p>
        </div>

        {/* Glow ambient background circles */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-64 h-64 rounded-full bg-[#f7ac4f]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-64 h-64 rounded-full bg-[#2563eb]/10 blur-3xl pointer-events-none" />
      </section>
    </main>
  );
}
