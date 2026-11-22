import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactForm } from '@/components/contact/ContactForm';
import {
  Mail,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Executive Consultation — Lead Edge Marketers',
  description:
    'Initiate a strategic consultation with Lead Edge Marketers. Senior partners evaluate your search rankings, ad funnels, and web architecture within 24 business hours.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[#FAF8F5] text-[#161514] min-h-screen select-none border-b border-[#e8e6e2] relative overflow-hidden">
      {/* Background Subtle Tech Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#161514 1px, transparent 1px), radial-gradient(#161514 1px, #FAF8F5 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            HEADER ROW
            ========================================================================= */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#b45309] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span>Direct Partner Access · 24-Hour Evaluation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-[#161514] tracking-tight leading-[1.04] mb-5">
            Start your strategic growth consultation.
          </h1>

          <p className="text-base sm:text-xl font-sans text-[#5d5a55] leading-relaxed">
            Senior partners evaluate every inbound brief within 24 business hours. No junior sales reps calling you. Receive an objective growth blueprint before committing a single dollar.
          </p>
        </div>

        {/* =========================================================================
            TWO-COLUMN WORKSPACE:
            Left: Senior Partner Assurances, Australian Desks, Calendar Walkthrough
            Right: Upgraded Luxury Consultation Brief Form
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* =========================================================================
              LEFT 5 COLS: Senior Assurances & Direct Agency Details
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Studio Photography Card with Luxury HUD */}
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-[#e8e6e2] shadow-sm bg-[#161514]">
              <Image
                src="/images/pages/P11-contact-hero-4x5.webp"
                alt="Lead Edge executive advisory consultation suite"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#f7ac4f] uppercase block font-bold">
                    STRATEGY ADVISORY
                  </span>
                  <span className="font-display font-bold text-sm text-white">
                    Sydney · Melbourne · Brisbane
                  </span>
                </div>
                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white/90 border border-white/20">
                  Active Practice
                </span>
              </div>
            </div>

            {/* Direct Channel Cards (No phone numbers) */}
            <div className="space-y-3">
              {/* Partner Inquiries Email */}
              <div className="p-5 rounded-[24px] bg-white border border-[#e8e6e2] shadow-xs flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] flex items-center justify-center shrink-0 text-[#b45309]">
                  <Mail className="w-5 h-5 text-[#f7ac4f]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#787570] block font-bold">
                    Direct Partner Desk
                  </span>
                  <a
                    href="mailto:hello@leadedge.agency"
                    className="text-sm sm:text-base font-sans font-bold text-[#161514] hover:text-[#b45309] transition-colors"
                  >
                    hello@leadedge.agency
                  </a>
                </div>
              </div>

              {/* Australian Working Hours */}
              <div className="p-5 rounded-[24px] bg-white border border-[#e8e6e2] shadow-xs flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] flex items-center justify-center shrink-0 text-[#b45309]">
                  <Clock className="w-5 h-5 text-[#f7ac4f]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#787570] block font-bold">
                    Evaluation SLA & Availability
                  </span>
                  <span className="text-sm font-sans font-bold text-[#161514]">
                    Mon – Fri, 08:30 – 18:00 AEST (24h Review)
                  </span>
                </div>
              </div>

              {/* Australian Physical Locations */}
              <div className="p-5 rounded-[24px] bg-white border border-[#e8e6e2] shadow-xs flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] flex items-center justify-center shrink-0 text-[#b45309]">
                  <MapPin className="w-5 h-5 text-[#f7ac4f]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#787570] block font-bold">
                    Australian Presence
                  </span>
                  <span className="text-sm font-sans font-bold text-[#161514]">
                    Barangaroo, Sydney · Collins St, Melbourne
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Core Client Guarantees Box */}
            <div className="p-6 rounded-[28px] bg-[#161514] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#f7ac4f]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f7ac4f]">
                    Our Consultation Standards
                  </span>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">100% Unconditional Ownership</span>
                      <span className="text-[#d9d6d1]">
                        All audit findings, competitor data, and keyword taxonomies remain yours to keep.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Zero Sales Rep Call Pressure</span>
                      <span className="text-[#d9d6d1]">
                        You communicate directly with senior growth practitioners, never commissioned telemarketers.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1f7a37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Rapid 14-Day Delivery Speed</span>
                      <span className="text-[#d9d6d1]">
                        When approved, your campaigns and web infrastructure go live in two weeks flat.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ambient Glow */}
              <div className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-[#f7ac4f]/15 blur-3xl pointer-events-none" />
            </div>

          </div>

          {/* =========================================================================
              RIGHT 7 COLS: The Upgraded Interactive Consultation Brief
              ========================================================================= */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </main>
  );
}
