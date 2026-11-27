'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { AiNeuralLogo } from '@/components/ui/AiNeuralLogo';

const POPULAR_PROMPTS = [
  'How does your pricing and retainer work?',
  'What is included in the Free Strategy Blueprint?',
  'How long does SEO take to generate revenue?',
  'What is the difference between Google Ads and Meta Ads?',
  'How do you rank in the Google Maps 3-Pack?',
  'Why hire Lead Edge Marketers vs an in-house employee?'
];

export function AiQuerySection() {
  const [queryInput, setQueryInput] = useState('');

  const triggerChat = (queryText: string) => {
    const clean = queryText.trim();
    if (!clean) return;

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-lead-edge-ai', {
          detail: { query: clean },
        })
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      triggerChat(queryInput);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-[#e8e6e2] select-none" id="ai-query">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header with Refined AI Branding */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161514] text-white border border-[#FFAD49]/40 mb-6 shadow-sm">
          <AiNeuralLogo className="w-4 h-4" size={18} glow={false} />
          <span className="text-xs font-mono font-bold tracking-wider text-[#FFAD49] uppercase">
            Lead Edge Neural AI · 500+ Frameworks Trained
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#161514] tracking-tight leading-tight mb-4">
          Ask anything about your query.
        </h2>

        <p className="text-base sm:text-lg font-sans text-[#5d5a55] max-w-2xl mx-auto mb-10 leading-relaxed">
          Trained on senior-level SEO, Google Ads, Meta performance, conversion architecture, and agency scaling playbooks. Type your question or choose a topic below for instant, strategic answers.
        </p>

        {/* Sleek Interactive Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl sm:rounded-full bg-white border border-[#e5e1d8] shadow-[0_16px_40px_rgba(22,21,20,0.08)] focus-within:border-[#FFAD49] focus-within:ring-2 focus-within:ring-[#FFAD49]/20 transition-all duration-200"
          >
            <div className="w-full sm:flex-1 flex items-center gap-3 px-4 py-2 sm:py-1">
              <Search className="w-5 h-5 text-[#8c887f] shrink-0" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask any digital marketing or agency query..."
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
        </div>

        {/* Quick Query Recommendation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#8c887f] uppercase tracking-wider mr-1">
            Popular Topics:
          </span>
          {POPULAR_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQueryInput(prompt);
                triggerChat(prompt);
              }}
              className="text-xs font-sans px-3.5 py-1.5 rounded-full bg-white hover:bg-[#fff9ef] border border-[#e5e1d8] hover:border-[#FFAD49] text-[#5d5a55] hover:text-[#161514] transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 group"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3 h-3 text-[#a8a29a] group-hover:text-[#FFAD49] group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>

        {/* Agency Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#78716c] font-sans font-medium pt-8 border-t border-[#e8e6e2]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FFAD49]" />
            Instant GPT-Grade Strategic Answers
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FFAD49]" />
            100% Free Senior Agency Guidance
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#FFAD49]" />
            Trained on 500+ Verified Playbooks
          </span>
        </div>

      </div>
    </section>
  );
}
