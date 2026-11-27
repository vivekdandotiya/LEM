'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Search,
  CheckCircle2,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { generateAiMarketingResponse, AiAction } from '@/lib/ai-marketing-brain';

// Custom Illuminated Neural AI Spark Logo
function AiNeuralLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="aiSectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC876" />
          <stop offset="50%" stopColor="#FFAD49" />
          <stop offset="100%" stopColor="#E08316" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L20.5 7.5V16.5L12 22L3.5 16.5V7.5L12 2Z"
        stroke="url(#aiSectionGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12 9.3 14.7 12 18 12C14.7 12 12 14.7 12 18C12 14.7 9.3 12 6 12C9.3 12 12 9.3 12 6Z"
        fill="url(#aiSectionGrad)"
      />
      <circle cx="12" cy="12" r="1.5" fill="#161514" />
    </svg>
  );
}

const PRESET_QUERIES = [
  'How does your pricing and contract structure work?',
  'What is included in the complimentary 15-minute Marketing Blueprint?',
  'How long does SEO take to generate revenue and rank on Google?',
  'What is the difference between Google Ads and Meta Ads for my business?',
  'How do you rank a business in the Google Maps 3-Pack?',
  'Why hire Lead Edge Marketers vs an in-house marketing hire?'
];

export function AiQuerySection() {
  const [queryInput, setQueryInput] = useState('');
  const [activeQuery, setActiveQuery] = useState(PRESET_QUERIES[0]);
  const [aiResult, setAiResult] = useState(() => generateAiMarketingResponse(PRESET_QUERIES[0]));
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleAsk = (queryText: string) => {
    const clean = queryText.trim();
    if (!clean) return;

    setActiveQuery(clean);
    setIsSynthesizing(true);

    setTimeout(() => {
      const result = generateAiMarketingResponse(clean);
      setAiResult(result);
      setIsSynthesizing(false);
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      handleAsk(queryInput);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-[#e8e6e2] select-none" id="ai-query">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with AI Branding */}
        <div className="text-center pb-10 sm:pb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161514] text-white border border-[#FFAD49]/40 mb-4 shadow-sm">
            <AiNeuralLogo className="w-4 h-4" />
            <span className="text-xs font-mono font-bold tracking-wider text-[#FFAD49] uppercase">
              Lead Edge Neural AI · 500+ Frameworks Trained
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#161514] tracking-tight leading-tight">
            Ask anything about your query.
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#5d5a55] max-w-2xl mx-auto mt-4 leading-relaxed">
            Trained on senior-level SEO, Google Ads, Meta performance, conversion architecture, and agency scaling playbooks. Type any query or select a topic for an immediate strategic breakdown.
          </p>
        </div>

        {/* Interactive Query Input Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl sm:rounded-full bg-white border border-[#e5e1d8] shadow-[0_12px_36px_rgba(22,21,20,0.08)] focus-within:border-[#FFAD49] focus-within:ring-2 focus-within:ring-[#FFAD49]/20 transition-all duration-200"
          >
            <div className="w-full sm:flex-1 flex items-center gap-3 px-4 py-2 sm:py-1">
              <Search className="w-5 h-5 text-[#8c887f] shrink-0" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask any digital marketing or agency query (e.g. 'How does pricing work?')"
                className="w-full bg-transparent text-sm sm:text-base font-sans text-[#161514] placeholder-[#8c887f] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl sm:rounded-full bg-[#161514] hover:bg-[#2b2a27] text-white font-sans font-bold text-sm tracking-tight transition-all duration-150 active:scale-95 shrink-0 group"
            >
              <span>Ask AI</span>
              <Sparkles className="w-4 h-4 text-[#FFAD49] group-hover:rotate-12 transition-transform" />
            </button>
          </form>

          {/* Quick Query Recommendation Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs font-bold text-[#8c887f] uppercase tracking-wider mr-1">
              Popular Queries:
            </span>
            {PRESET_QUERIES.map((q, idx) => {
              const isSelected = activeQuery === q;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setQueryInput(q);
                    handleAsk(q);
                  }}
                  className={`text-xs font-sans px-3 py-1.5 rounded-full border transition-all text-left ${
                    isSelected
                      ? 'bg-[#161514] text-white border-[#161514] font-semibold shadow-xs'
                      : 'bg-white text-[#5d5a55] border-[#e5e1d8] hover:border-[#FFAD49] hover:text-[#161514]'
                  }`}
                >
                  {q.length > 38 ? `${q.slice(0, 38)}...` : q}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live AI Response Card */}
        <div className="max-w-3xl mx-auto rounded-[28px] bg-white border border-[#e5e1d8] shadow-[0_20px_60px_-15px_rgba(22,21,20,0.1)] p-6 sm:p-10 transition-all duration-300">
          {isSynthesizing ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <AiNeuralLogo className="w-8 h-8 animate-spin" />
              <span className="text-sm font-sans font-bold text-[#161514]">
                Synthesizing strategic answer across 500+ marketing frameworks...
              </span>
            </div>
          ) : (
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[#f0eee9]">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#161514] flex items-center justify-center shrink-0">
                    <AiNeuralLogo className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#b45309] block">
                      Lead Edge Intelligence Output
                    </span>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#161514] tracking-tight">
                      {aiResult.headline}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified
                </span>
              </div>

              {/* Executive Summary */}
              <p className="text-sm sm:text-base font-sans text-[#2c2b28] leading-relaxed mb-6 font-normal">
                {aiResult.executiveSummary}
              </p>

              {/* Actionable Strategy Bullets */}
              {aiResult.bullets && aiResult.bullets.length > 0 && (
                <div className="space-y-3 mb-6 pl-4 border-l-2 border-[#FFAD49]">
                  {aiResult.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#45423d] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#FFAD49] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Benchmark Ribbon */}
              {aiResult.benchmarks && (
                <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#ece8df] text-xs sm:text-sm font-sans font-medium text-[#78716c] flex items-center gap-2 mb-6">
                  <TrendingUp className="w-4 h-4 text-[#FFAD49] shrink-0" />
                  <span>{aiResult.benchmarks}</span>
                </div>
              )}

              {/* Action Buttons */}
              {aiResult.actions && aiResult.actions.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#f0eee9]">
                  {aiResult.actions.map((act) => (
                    <Link
                      key={act.label}
                      href={act.href}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-xs sm:text-sm transition-all duration-150 active:scale-95 shadow-sm ${
                        act.isPrimary
                          ? 'bg-[#FFAD49] hover:bg-[#ffbe6a] text-[#000000]'
                          : 'bg-[#161514] hover:bg-[#2c2b29] text-white'
                      }`}
                    >
                      <span>{act.label}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
