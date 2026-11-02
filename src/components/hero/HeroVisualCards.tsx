import React from "react";
import Image from "next/image";
import { ArrowUpRight, TrendingUp, Sparkles, CheckCircle2, Eye, ShieldCheck } from "lucide-react";

export function CardWebDev() {
  return (
    <div className="w-full h-full bg-[#1A1A1D] text-white p-5 sm:p-6 flex flex-col justify-between rounded-card border border-white/10 shadow-2xl relative overflow-hidden select-none">
      {/* Subtle warm ambient lighting */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#7E7A73]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#7E7A73]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#7E7A73]/60" />
          <span className="ml-3 text-[11px] font-mono tracking-wider text-warmgray-400">
            preview.leadedge.agency/aura
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-tint text-[10px] font-mono">
          <Sparkles className="w-3 h-3" />
          <span>Core Vitals 100</span>
        </div>
      </div>

      {/* Real editorial image canvas */}
      <div className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden border border-white/10 my-2 group">
        <Image
          src="/images/home/hero-1.webp"
          alt="Bespoke luxury web experience crafted by Lead Edge Marketing"
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 550px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-900/20 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
          <span className="text-white font-medium">Aura Spatial Flagship</span>
          <span className="text-accent-tint font-mono">0.6s LCP</span>
        </div>
      </div>

      {/* Mockup Canvas */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
            Digital Flagship
          </span>
          <span className="text-[10px] font-mono text-warmgray-400">Next.js · Edge Delivery</span>
        </div>
        <p className="text-xs text-warmgray-300 leading-relaxed line-clamp-2">
          Sub-second editorial web experience crafted for ambitious brands, featuring fluid micro-interactions and zero layout shift.
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-warmgray-300 font-mono">
            WCAG 2.2 AA
          </span>
          <span className="px-2 py-0.5 rounded bg-accent/15 border border-accent/30 text-[10px] text-accent-tint font-mono">
            +64% Inquiry Lift
          </span>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-warmgray-400">
        <span className="font-mono text-[11px]">Disc: Web Development</span>
        <span className="text-white flex items-center gap-1 font-medium text-xs">
          Explore Architecture <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
        </span>
      </div>
    </div>
  );
}

export function CardSocial() {
  return (
    <div className="w-full h-full bg-[#161618] text-white p-5 sm:p-6 flex flex-col justify-between rounded-card border border-white/10 shadow-2xl relative overflow-hidden select-none">
      {/* Champagne gradient accent */}
      <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#A28156]/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent to-accent-tint flex items-center justify-center text-[10px] font-bold text-charcoal-900">
            LE
          </div>
          <div>
            <span className="text-xs font-semibold text-white block leading-none">leadedge.creative</span>
            <span className="text-[9px] font-mono text-warmgray-400">Editorial Feed</span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-warmgray-300 font-mono">
          9:16 Cinematic
        </span>
      </div>

      {/* Real editorial image canvas */}
      <div className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden border border-white/10 my-2 group">
        <Image
          src="/images/home/hero-2.webp"
          alt="Cinematic social media creative production"
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 550px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-900/20 to-transparent" />
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-warmgray-300 font-mono">
          0:15 / 4K
        </div>
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          <p className="text-xs font-display text-white line-clamp-1">
            “True luxury is communicated in the restraint of details.”
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between text-xs text-warmgray-300 pt-1">
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-accent-tint">
          <Eye className="w-3.5 h-3.5" /> 842K Views
        </span>
        <span className="text-[11px] font-mono text-warmgray-400">
          94.2% Retention
        </span>
      </div>

      {/* Bottom Bar */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-warmgray-400">
        <span className="font-mono text-[11px]">Disc: Social Media Strategy</span>
        <span className="text-white flex items-center gap-1 font-medium text-xs">
          Creative Systems <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
        </span>
      </div>
    </div>
  );
}

export function CardMetaAds() {
  return (
    <div className="w-full h-full bg-[#121214] text-white p-5 sm:p-6 flex flex-col justify-between rounded-card border border-white/10 shadow-2xl relative overflow-hidden select-none">
      {/* Background warm shimmer */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-48 h-48 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="text-xs font-mono font-medium text-white">Campaign Attribution Engine</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent-tint text-[10px] font-mono">
          CAPI Active
        </span>
      </div>

      {/* Real editorial image canvas */}
      <div className="relative w-full h-28 sm:h-32 rounded-lg overflow-hidden border border-white/10 my-2 group">
        <Image
          src="/images/home/hero-3.webp"
          alt="Precision performance marketing and campaign attribution"
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 550px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-900/20 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          <span className="text-[11px] font-mono text-accent-tint">Attribution Engine Active</span>
          <span className="text-[10px] font-mono text-warmgray-300">Live Telemetry</span>
        </div>
      </div>

      {/* Key Metric Blocks */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-2.5 rounded-lg bg-charcoal-800/80 border border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-warmgray-400 block mb-0.5">
            Blended ROAS
          </span>
          <span className="text-xl sm:text-2xl font-display font-bold text-accent-tint">
            4.82×
          </span>
          <span className="text-[10px] font-mono text-warmgray-400 mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-accent" /> Top Tier Scaling
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-charcoal-800/80 border border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-warmgray-400 block mb-0.5">
            CAC Reduction
          </span>
          <span className="text-xl sm:text-2xl font-display font-bold text-white">
            -34.8%
          </span>
          <span className="text-[10px] font-mono text-warmgray-400 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-titanium" /> Bidding Engine
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-warmgray-400">
        <span className="font-mono text-[11px]">Disc: Paid Meta Acquisition</span>
        <span className="text-white flex items-center gap-1 font-medium text-xs">
          View Mechanics <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
        </span>
      </div>
    </div>
  );
}

export function CardSEO() {
  return (
    <div className="w-full h-full bg-[#18181B] text-white p-5 sm:p-6 flex flex-col justify-between rounded-card border border-white/10 shadow-2xl relative overflow-hidden select-none">
      {/* Ambient glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#C8AB7E]/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span className="text-xs font-mono font-medium text-white">Topical Graph Engine</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-warmgray-300 font-mono">
          Organic Search
        </span>
      </div>

      {/* Real editorial image canvas */}
      <div className="relative w-full h-28 sm:h-32 rounded-lg overflow-hidden border border-white/10 my-2 group">
        <Image
          src="/images/home/hero-4.webp"
          alt="Topical graph and organic search visibility"
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 550px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-900/20 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          <span className="text-[11px] font-mono text-accent-tint">#1 Commercial Queries</span>
          <span className="text-[10px] font-mono text-warmgray-300">Topical Graph</span>
        </div>
      </div>

      {/* Trajectory visualization */}
      <div className="p-2.5 rounded-lg bg-charcoal-800/80 border border-white/10 space-y-1.5">
        <div className="flex justify-between text-[11px]">
          <span className="text-warmgray-300">Commercial Intent Queries</span>
          <span className="font-mono text-accent">Pos 1.2</span>
        </div>
        <div className="h-1.5 w-full bg-charcoal-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-accent-tint w-[92%]" />
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-warmgray-300">Domain Authority Rating</span>
          <span className="font-mono text-white">DR 78</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-warmgray-400">
        <span className="font-mono text-[11px]">Disc: Technical SEO</span>
        <span className="text-white flex items-center gap-1 font-medium text-xs">
          Explore SEO System <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
        </span>
      </div>
    </div>
  );
}
