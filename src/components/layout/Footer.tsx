'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Instagram,
  Linkedin,
  Youtube,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';

// Custom X (Twitter) Icon
function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SERVICES_LINKS = [
  { label: 'Search Engine Optimization (SEO)', href: '/services/seo' },
  { label: 'Paid Advertising & PPC', href: '/services/ppc' },
  { label: 'Social Media Marketing', href: '/services/social-media' },
  { label: 'Web Architecture & Design', href: '/services/web-development' },
  { label: 'Creative Content & Media', href: '/services/video-photo' },
];

const COMPANY_LINKS = [
  { label: 'About Studio', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Growth Strategies', href: '/marketing' },
  { label: 'Articles & Insights', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0c0d0e] text-white border-t border-white/10 select-none relative overflow-hidden font-sans">
      {/* Subtle ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle 900px at 15% 0%, rgba(247,172,79,0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-12">
        {/* =========================================================================
            TOP SECTION: Brand Column + 3 Clean Nav Columns
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pb-14 border-b border-white/10">
          {/* Left Column: Brand Identity & Clean Newsletter (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between max-w-md">
            <div>
              {/* Brand Logo & Name */}
              <div
                className="flex items-center gap-3.5 mb-5 group cursor-pointer w-fit"
                onClick={scrollToTop}
              >
                <div className="w-10 h-10 rounded-full bg-[#f7ac4f] flex items-center justify-center text-[#161514] font-black font-sans text-sm shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0">
                  LE
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold tracking-tight text-xl sm:text-2xl leading-none text-white">
                    LEAD EDGE
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#f7ac4f] mt-1 leading-none font-bold">
                    MARKETERS
                  </span>
                </div>
              </div>

              {/* Clean, Simple One-Sentence Brand Summary */}
              <p className="text-sm font-sans text-[#a8a29e] leading-relaxed mb-6">
                Simple, high-impact digital marketing. We help businesses gain organic search authority, execute profitable ad campaigns, and build web platforms that convert.
              </p>
            </div>

            {/* Newsletter Subscription Box (Pill Style, Clean & Uncluttered) */}
            <div className="pt-2">
              <span className="block text-xs font-medium text-white/80 mb-2.5">
                Get monthly marketing insights & case studies
              </span>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative flex items-center rounded-full bg-[#16171a] border border-white/15 p-1.5 focus-within:border-[#f7ac4f]/60 transition-all">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (subscribed) setSubscribed(false);
                    }}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="w-full bg-transparent text-sm text-white placeholder-white/40 px-3.5 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="px-4 py-2 rounded-full bg-[#f7ac4f] hover:bg-[#ffbe6a] text-[#161514] font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    {subscribed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#161514]" />
                        <span>Joined</span>
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </button>
                </div>
                {subscribed ? (
                  <p className="text-xs text-[#f7ac4f] mt-2 font-medium">
                    ✓ You are subscribed to Lead Edge Marketers updates.
                  </p>
                ) : (
                  <p className="text-[11px] text-[#78716c] mt-2">
                    Actionable strategies every two weeks. No spam, ever.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right Columns: 3 Clean, Spacious Directory Columns (Spans 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:pl-6">
            {/* Column 1: Services */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Services
              </span>
              <ul className="flex flex-col gap-2.5">
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-sans text-[#a8a29e] hover:text-white transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Company
              </span>
              <ul className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-sans text-[#a8a29e] hover:text-white transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Direct Connect */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Get in Touch
              </span>
              <ul className="flex flex-col gap-2.5 text-sm text-[#a8a29e]">
                <li>
                  <Link
                    href="/contact"
                    className="text-[#f7ac4f] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Book a 15-Min Call
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@leadedge.agency"
                    className="hover:text-white transition-colors"
                  >
                    hello@leadedge.agency
                  </a>
                </li>
                <li className="text-[#78716c] text-xs pt-1">
                  Sydney, Australia & Worldwide
                </li>
                <li className="text-[#78716c] text-xs">
                  Mon – Fri, 9am – 6pm AEST
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MIDDLE SECTION: Clean Accreditations & Social Links
            ========================================================================= */}
        <div className="pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10">
          {/* Accreditations */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-[#78716c]">
            <span className="font-medium text-white/70">Google Premier Partner</span>
            <span>•</span>
            <span className="font-medium text-white/70">Meta Business Partner</span>
            <span>•</span>
            <span className="font-medium text-white/70">Shopify Partner</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[#a8a29e]">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/lead-edge-marketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on LinkedIn"
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/leadedge_mktg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on X"
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/leadedge_marketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on Instagram"
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@LeadEdgeMarketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on YouTube"
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM SECTION: Minimal Copyright & Legal Notice
            ========================================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716c]">
          <p>© {new Date().getFullYear()} Lead Edge Marketers. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
            <span>•</span>
            <span className="text-[#f7ac4f]">Lead Edge Marketers</span>
          </div>
        </div>
      </div>

      {/* Floating Accent Star Widget (Right Margin) */}
      <button
        onClick={scrollToTop}
        title="Scroll to Top"
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F1012] border border-white/15 text-[#f7ac4f] hover:text-white hover:border-[#f7ac4f] transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.7)] group"
      >
        <SparkleGlyph size={18} spin={true} />
      </button>
    </footer>
  );
}
