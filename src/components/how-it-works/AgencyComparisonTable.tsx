'use client';

import React from 'react';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface ComparisonRow {
  dimension: string;
  traditional: string;
  freelancer: string;
  leadEdge: string;
  isLeadEdgeSuperior?: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: 'Turnaround to Live Launch',
    traditional: '8–16 weeks of endless onboarding & meetings',
    freelancer: '3–6 weeks depending on availability',
    leadEdge: '14 Days flat from kickoff to live campaigns & web',
    isLeadEdgeSuperior: true,
  },
  {
    dimension: 'Pricing Structure',
    traditional: '$3,000–$8,000/mo retainer + % of ad spend markup',
    freelancer: '$80–$150/hr with unpredictable scope creep',
    leadEdge: '$249/mo + GST flat rate with 0% ad spend markup',
    isLeadEdgeSuperior: true,
  },
  {
    dimension: 'Multi-Service Integration',
    traditional: 'Siloed departments that rarely coordinate',
    freelancer: 'Single discipline only (Web only or Ads only)',
    leadEdge: 'Interconnected tree: SEO + Ads + Code + Cinema Video',
    isLeadEdgeSuperior: true,
  },
  {
    dimension: 'Tech Stack & Page Speed',
    traditional: 'Bloated WordPress or Webflow templates (Lighthouse 30-50)',
    freelancer: 'Generic templates or unoptimized builder themes',
    leadEdge: 'Next.js 15 React Server Components at the Edge (0.4s load)',
    isLeadEdgeSuperior: true,
  },
  {
    dimension: 'Conversion Tracking & Attribution',
    traditional: 'Basic browser pixel prone to 35% iOS data loss',
    freelancer: 'Usually not configured or broken',
    leadEdge: 'Server-Side CAPI (Meta & Google) with 9.8/10 match score',
    isLeadEdgeSuperior: true,
  },
  {
    dimension: 'Creative Hook Testing',
    traditional: '1–2 static image assets per quarter',
    freelancer: 'Stock imagery with generic Canva text overlays',
    leadEdge: '10+ weekly vertical video hooks, UGC & 4K cinematic assets',
    isLeadEdgeSuperior: true,
  },
  {
    dimension: 'Account & Asset Ownership',
    traditional: 'Locked in proprietary agency ad accounts or CMS',
    freelancer: 'Personal accounts with transfer risks',
    leadEdge: '100% Client Ownership. Full code, domain & ad accounts',
    isLeadEdgeSuperior: true,
  },
  {
    dimension: 'Contract Lock-In',
    traditional: '6–12 month binding contracts with heavy exit penalties',
    freelancer: 'Informal or hourly commitments',
    leadEdge: 'Month-to-month. Cancel anytime with zero exit penalties',
    isLeadEdgeSuperior: true,
  },
];

export function AgencyComparisonTable() {
  return (
    <section className="py-20 sm:py-32 bg-[#FAF8F5] text-[#161514] select-none border-b border-[#e8e6e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              The Agency Landscape
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.06] mb-4">
            Why Australian businesses switch to Lead Edge.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed">
            See how our multi-service execution architecture compares to traditional bloated agencies and fragmented solo freelancers.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto rounded-[32px] border border-[#e8e6e2] bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#e8e6e2]">
                <th className="p-6 sm:p-8 font-mono text-xs uppercase tracking-wider text-[#787570] font-bold w-1/4">
                  Evaluation Dimension
                </th>
                <th className="p-6 sm:p-8 font-sans font-bold text-base text-[#787570] bg-[#FAF8F5]/50 w-1/4">
                  Traditional Agencies
                </th>
                <th className="p-6 sm:p-8 font-sans font-bold text-base text-[#787570] w-1/4">
                  Solo Freelancers
                </th>
                <th className="p-6 sm:p-8 font-display font-extrabold text-base sm:text-lg text-[#161514] bg-[#f7ac4f]/10 w-1/4 border-l border-r border-[#f7ac4f]/20 relative">
                  <div className="flex items-center gap-1.5 text-[#b45309] text-xs font-mono font-bold uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interconnected Model</span>
                  </div>
                  Lead Edge Marketers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e6e2] text-xs sm:text-sm">
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F5]/40 transition-colors">
                  {/* Dimension */}
                  <td className="p-6 sm:p-8 font-sans font-bold text-[#161514]">
                    {row.dimension}
                  </td>

                  {/* Traditional Agency */}
                  <td className="p-6 sm:p-8 text-[#5d5a55] bg-[#FAF8F5]/30">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>

                  {/* Solo Freelancer */}
                  <td className="p-6 sm:p-8 text-[#5d5a55]">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{row.freelancer}</span>
                    </div>
                  </td>

                  {/* Lead Edge Marketers */}
                  <td className="p-6 sm:p-8 font-sans font-medium text-[#161514] bg-[#f7ac4f]/5 border-l border-r border-[#f7ac4f]/20">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                      <span className="font-semibold">{row.leadEdge}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#161514] hover:bg-black text-white font-sans font-bold text-sm sm:text-base transition-transform active:scale-95 shadow-md"
          >
            <span>Compare Your Current Agency Stack</span>
            <span className="text-[#f7ac4f]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
