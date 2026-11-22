'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface IndustryMetric {
  name: string;
  icon: string;
  avgConversionRate: number; // e.g. 0.10 for 10%
  avgClientValue: number; // in AUD
  cpc: number; // avg Cost Per Click
  targetRoas: string;
}

const INDUSTRIES: IndustryMetric[] = [
  {
    name: 'Allied Health & Clinics',
    icon: '🩺',
    avgConversionRate: 0.118,
    avgClientValue: 195,
    cpc: 2.85,
    targetRoas: '4.8x – 6.2x',
  },
  {
    name: 'Trades & Home Services',
    icon: '⚡',
    avgConversionRate: 0.134,
    avgClientValue: 1250,
    cpc: 4.2,
    targetRoas: '5.5x – 8.4x',
  },
  {
    name: 'Professional & Legal',
    icon: '⚖️',
    avgConversionRate: 0.082,
    avgClientValue: 2400,
    cpc: 5.8,
    targetRoas: '4.5x – 7.0x',
  },
  {
    name: 'Childcare & Education',
    icon: '🎒',
    avgConversionRate: 0.095,
    avgClientValue: 3200,
    cpc: 3.1,
    targetRoas: '6.0x – 9.2x',
  },
  {
    name: 'E-Commerce & Retail',
    icon: '🛍️',
    avgConversionRate: 0.042,
    avgClientValue: 110,
    cpc: 1.25,
    targetRoas: '3.8x – 5.4x',
  },
];

export function MarketingRoasCalculator() {
  const [adSpend, setAdSpend] = useState<number>(3000);
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);

  const ind = INDUSTRIES[selectedIndustry];

  // Dynamic calculations based on spend & industry
  const estimatedClicks = Math.round(adSpend / ind.cpc);
  const estimatedInquiries = Math.round(estimatedClicks * ind.avgConversionRate);
  const estimatedRevenue = Math.round(estimatedInquiries * ind.avgClientValue * 0.45); // Assuming 45% close rate on qualified leads
  const calculatedRoas = (estimatedRevenue / adSpend).toFixed(1);

  return (
    <section className="py-20 sm:py-32 bg-white text-[#161514] select-none border-b border-[#e8e6e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              Interactive Return On Ad Spend Simulator
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.06] mb-4">
            Calculate your projected growth & inquiry volume.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed">
            See realistic monthly traffic, customer booking volume, and gross revenue projections based on actual Australian benchmark performance data.
          </p>
        </div>

        {/* Calculator Workspace */}
        <div className="rounded-[36px] bg-[#FAF8F5] border border-[#e8e6e2] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left 6 Columns: Inputs */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* 1. Industry Selector */}
                <div className="mb-8">
                  <label className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider block mb-3">
                    Step 1: Select Your Industry Sector
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {INDUSTRIES.map((industry, idx) => {
                      const isSelected = selectedIndustry === idx;
                      return (
                        <button
                          key={industry.name}
                          type="button"
                          onClick={() => setSelectedIndustry(idx)}
                          className={`p-3 rounded-2xl text-left border transition-all text-xs font-sans font-bold flex items-center gap-2 ${
                            isSelected
                              ? 'bg-[#161514] text-white border-[#161514] shadow-md'
                              : 'bg-white text-[#5d5a55] border-[#e8e6e2] hover:border-[#161514]/30'
                          }`}
                        >
                          <span className="text-base">{industry.icon}</span>
                          <span className="leading-tight">{industry.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Monthly Ad Spend Slider */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider">
                      Step 2: Projected Monthly Paid Ad Budget
                    </label>
                    <span className="text-2xl sm:text-3xl font-display font-black text-[#161514]">
                      ${adSpend.toLocaleString('en-AU')}{' '}
                      <span className="text-xs font-sans font-normal text-[#5d5a55]">/ mo</span>
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="500"
                    value={adSpend}
                    onChange={(e) => setAdSpend(Number(e.target.value))}
                    className="w-full h-3 bg-[#e8e6e2] rounded-lg appearance-none cursor-pointer accent-[#f7ac4f]"
                  />

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#787570] mt-2">
                    <span>$1,000 / mo</span>
                    <span>$5,000 / mo</span>
                    <span>$10,000 / mo</span>
                    <span>$20,000 / mo</span>
                  </div>
                </div>

                {/* Reassurance Checklist */}
                <div className="p-4 rounded-2xl bg-white border border-[#e8e6e2] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-sans text-[#161514]">
                    <CheckCircle2 className="w-4 h-4 text-[#1f7a37] shrink-0" />
                    <span>0% markup on ad spend. You link your card directly to Google & Meta.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans text-[#161514]">
                    <CheckCircle2 className="w-4 h-4 text-[#1f7a37] shrink-0" />
                    <span>Calculations use conservative 45% closing rates on inbound high-intent leads.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: Projected Outputs HUD */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="p-8 sm:p-10 rounded-[32px] bg-[#161514] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <span className="text-xs font-mono font-bold text-[#f7ac4f] uppercase tracking-wider">
                      Forecasted Monthly Outcomes
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      {ind.name}
                    </span>
                  </div>

                  {/* 4 Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Clicks */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                        High-Intent Clicks
                      </span>
                      <div className="text-2xl sm:text-3xl font-display font-black text-white">
                        {estimatedClicks.toLocaleString('en-AU')}
                      </div>
                      <span className="text-[10px] font-sans text-white/60">
                        Avg CPC: ${ind.cpc.toFixed(2)}
                      </span>
                    </div>

                    {/* Bookings / Inquiries */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-mono text-[#f7ac4f] uppercase block mb-1">
                        Qualified Inquiries
                      </span>
                      <div className="text-2xl sm:text-3xl font-display font-black text-[#f7ac4f]">
                        {estimatedInquiries.toLocaleString('en-AU')}
                      </div>
                      <span className="text-[10px] font-sans text-white/60">
                        {(ind.avgConversionRate * 100).toFixed(1)}% Conversion Rate
                      </span>
                    </div>

                    {/* Estimated Revenue */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-mono text-white/60 uppercase block mb-1">
                        Est. Gross Revenue
                      </span>
                      <div className="text-2xl sm:text-3xl font-display font-black text-white">
                        ${estimatedRevenue.toLocaleString('en-AU')}
                      </div>
                      <span className="text-[10px] font-sans text-white/60">
                        Based on avg job value
                      </span>
                    </div>

                    {/* Target ROAS */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-mono text-[#1f7a37] uppercase block mb-1">
                        Estimated ROAS
                      </span>
                      <div className="text-2xl sm:text-3xl font-display font-black text-[#1f7a37]">
                        {calculatedRoas}x
                      </div>
                      <span className="text-[10px] font-sans text-white/60">
                        Target: {ind.targetRoas}
                      </span>
                    </div>
                  </div>

                  {/* Consultation Action */}
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-sm sm:text-base transition-transform active:scale-95 shadow-md"
                  >
                    <span>Receive This Custom Forecast Free</span>
                    <ArrowRight className="w-4 h-4 text-[#161514]" />
                  </Link>
                </div>

                {/* Ambient glow */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#f7ac4f]/15 blur-3xl pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
