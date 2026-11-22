'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  ArrowRight,
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

// Custom Behance Icon
function BehanceIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.8 12.8c1.3 0 2.2-.6 2.2-1.8 0-1-.7-1.6-1.8-1.6H4.6v3.4h3.2zm.2 4.4c1.5 0 2.6-.7 2.6-2.1 0-1.3-.9-2-2.4-2H4.6v4.1h3.4zm10-5.7c-2 0-3.3 1.5-3.3 3.5 0 2.1 1.4 3.5 3.5 3.5 1.5 0 2.7-.8 3.1-2.1h-1.6c-.3.5-.8.7-1.4.7-1.1 0-1.8-.7-1.9-1.8h5c.1-.4.1-.7.1-1 0-1.8-1.3-2.8-3.5-2.8zm-1.7 2.5c.1-.8.7-1.4 1.7-1.4 1 0 1.6.6 1.7 1.4h-3.4zM2.5 7h5.8c2.4 0 4 1.3 4 3.2 0 1.2-.6 2.1-1.6 2.7 1.3.5 2 1.6 2 3.1 0 2.3-1.8 3.8-4.4 3.8H2.5V7zm13.7-2h4v1.2h-4V5z" />
    </svg>
  );
}

const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: '/ HOME', href: '/', isAccent: true },
      { label: 'HOW IT WORKS', href: '/how-it-works' },
      { label: 'PRICING', href: '/pricing' },
      { label: 'MARKETING', href: '/marketing' },
      { label: 'ABOUT STUDIO', href: '/about' },
      { label: 'CONTACT', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'OVERVIEW', href: '/services' },
      { label: 'SEARCH & SEO', href: '/services/seo' },
      { label: 'PAID ADS', href: '/services/ppc' },
      { label: 'WEB ARCHITECTURE', href: '/services/web-development' },
      { label: 'VIDEO & PHOTO', href: '/services/video-photo' },
      { label: 'SOCIAL MEDIA', href: '/services/social-media' },
    ],
  },
  {
    title: 'Disciplines',
    links: [
      { label: 'HEALTHCARE WEBSITES', href: '/services/seo' },
      { label: 'PROFESSIONAL SERVICES', href: '/services/ppc' },
      { label: 'EDUCATION & CARE', href: '/services/social-media' },
      { label: 'TRADES & COMMERCE', href: '/services/web-development' },
      { label: 'REVENUE AUDIT', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'GUIDES & INSIGHTS', href: '/blog' },
      { label: 'CLIENT REVIEWS', href: '/#testimonials' },
      { label: 'FREQUENT QUESTIONS', href: '/#faq' },
      { label: 'PRICING INCLUSIONS', href: '/pricing' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'SCHEDULE A CONSULTATION', href: '/contact' },
      { label: 'GET FREE BLUEPRINT', href: '/contact' },
      { label: 'SUPPORT DESK', href: '/contact' },
      { label: 'TERMS OF ENGAGEMENT', href: '/terms' },
    ],
  },
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
    <footer className="w-full bg-[#050607] text-white border-t border-white/10 select-none relative overflow-hidden font-sans">
      {/* Ambient background grid / radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle 800px at 20% 0%, rgba(176,141,87,0.06), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12">
        {/* =========================================================================
            TOP SECTION: Brand Column + 5 Nav Link Columns
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Left Brand & Newsletter Column (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between max-w-sm">
            <div>
              {/* Brand Logo & Title: Consistent with Header */}
              <div className="flex items-center gap-3.5 mb-6 group cursor-pointer" onClick={scrollToTop}>
                <div className="relative w-11 h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/logo/lead-edge-logo.png"
                    alt="Lead Edge Marketers Logo"
                    fill
                    sizes="44px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold tracking-tight text-xl sm:text-2xl leading-none text-white">
                    LEAD EDGE
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#f7ac4f] mt-1 leading-none font-semibold">
                    MARKETERS
                  </span>
                </div>
              </div>

              {/* Manifesto Copy */}
              <p className="text-sm font-sans text-[#E7E5E4] leading-relaxed mb-8">
                Every two weeks, we take you behind the scenes. Around 1,000 words on search architecture, creative media performance, and what we&apos;re learning through our work.
              </p>
            </div>

            {/* Newsletter Input with Underline Style & Arrow Submit */}
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative flex items-center border-b border-white/30 hover:border-white/60 focus-within:border-white transition-colors pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (subscribed) setSubscribed(false);
                  }}
                  placeholder="YOUR EMAIL HERE"
                  aria-label="Your email address"
                  className="w-full bg-transparent text-xs font-mono tracking-[0.2em] uppercase text-white placeholder-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter subscription"
                  className="pl-3 text-white hover:text-[#B08D57] transition-colors group flex items-center"
                >
                  {subscribed ? (
                    <Check className="w-4 h-4 text-[#f7ac4f]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs font-sans text-[#D6D3D1] mt-3 leading-relaxed">
                {subscribed ? (
                  <span className="text-[#f7ac4f] font-mono">✓ You are subscribed to Lead Edge Marketers dispatches.</span>
                ) : (
                  <>
                    We&apos;ll only email you about Lead Edge Marketers. Read our{' '}
                    <Link href="/privacy" className="underline hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                    . Unsubscribe at any time.
                  </>
                )}
              </p>
            </form>
          </div>

          {/* Right Navigation Directory (Spans 8 columns: 5 clean columns) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-4 pt-2">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <span className="text-xs font-display font-extrabold text-white tracking-wider uppercase">
                  {col.title}
                </span>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`text-xs font-mono tracking-wider transition-colors duration-200 block ${
                          link.isAccent
                            ? 'text-[#f7ac4f] font-bold hover:text-white'
                            : 'text-[#D6D3D1] hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            MIDDLE SECTION: Industry Partnerships & Social Row + ENG Dropdown
            ========================================================================= */}
        <div className="pt-10 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10">
          {/* Members / Partner Accreditation Statement */}
          <p className="text-xs font-sans text-[#D6D3D1] text-center md:text-left">
            Proud partners with Google Premier Partner, Meta Business Partner, Shopify Plus, HubSpot, and Awwwards.
          </p>

          {/* Social Icons & Language Badge */}
          <div className="flex items-center gap-5 sm:gap-6 text-[#D6D3D1]">
            {/* W. (Wikipedia / Web Directory) */}
            <a
              href="https://leadedge.agency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge Directory"
              className="text-xs font-bold font-serif hover:text-white transition-colors"
            >
              W.
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/leadedge_marketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/lead-edge-marketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on LinkedIn"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/leadedge_mktg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on X"
              className="hover:text-white transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </a>

            {/* Behance */}
            <a
              href="https://behance.net/leadedge"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on Behance"
              className="hover:text-white transition-colors"
            >
              <BehanceIcon className="w-4 h-4" />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/leadedge_marketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on Facebook"
              className="hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@LeadEdgeMarketing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lead Edge on YouTube"
              className="hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>

            {/* ENG Dropdown Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#16171A] border border-white/10 text-xs font-mono text-white/90 hover:border-white/30 transition-colors cursor-pointer ml-2">
              <span className="font-bold">ENG</span>
              <span className="text-xs text-[#D6D3D1]">↓</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM SECTION: Minimal Copyright Line
            ========================================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A8A29E]">
          <p>© 2006–2026 All rights reserved. Privacy. Legal. Quality.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Notice
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
            <span>·</span>
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
