'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { primaryNavItems } from '@/data/nav';
import { DripLink } from '@/components/animorio/drip/DripLink';
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface SocialPlatform {
  name: string;
  handle: string;
  desc: string;
  action: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    name: 'Instagram',
    handle: '@leadedge_marketing',
    desc: 'Visual creative & campaign archives',
    action: 'Follow on Instagram',
    href: 'https://instagram.com/leadedge_marketing',
    icon: Instagram,
  },
  {
    name: 'Facebook',
    handle: 'Lead Edge Marketing',
    desc: 'Case studies & community updates',
    action: 'Join Community',
    href: 'https://facebook.com/leadedge_marketing',
    icon: Facebook,
  },
  {
    name: 'LinkedIn',
    handle: 'Lead Edge Marketing',
    desc: 'Growth essays & market commentary',
    action: 'Connect on LinkedIn',
    href: 'https://linkedin.com/company/lead-edge-marketing',
    icon: Linkedin,
  },
  {
    name: 'YouTube',
    handle: '@LeadEdgeMarketing',
    desc: 'Funnel teardowns & creative strategy',
    action: 'Subscribe to Channel',
    href: 'https://youtube.com/@LeadEdgeMarketing',
    icon: Youtube,
  },
  {
    name: 'X (Twitter)',
    handle: '@leadedge_mktg',
    desc: 'Live media & real-time ad data',
    action: 'Follow on X',
    href: 'https://x.com/leadedge_mktg',
    icon: Twitter,
  },
];

const FOOTER_SERVICES = [
  { title: 'Search Engine Optimization', href: '/services/seo' },
  { title: 'Pay-Per-Click Advertising', href: '/services/ppc' },
  { title: 'Social Media Marketing', href: '/services/social-media' },
  { title: 'Web Development', href: '/services/web-development' },
  { title: 'Video Editing & Photo Creation', href: '/services/video-photo' },
];

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'notice'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterStatus('notice');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#EFEBE2] text-ink border-t border-ink/10 relative overflow-hidden select-none">
      {/* =========================================================================
          BLOCK 1: SOCIAL PLATFORM CARDS
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-ink/10 bg-[#F6F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                  OUR CHANNELS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-ink">
                Connect across platforms.
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-sans text-stone max-w-xs leading-relaxed">
              Real-time campaign experiments, breakdowns, and creative work published weekly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SOCIAL_PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-5 rounded-[22px] bg-white border border-ink/10 shadow-soft-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-soft-md flex flex-col justify-between min-h-[170px]"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 group-hover:border-gold transition-all duration-300">
                      <Icon className="w-5 h-5 text-gold group-hover:text-gold-deep transition-colors" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <div className="pt-4">
                    <div className="font-display font-bold text-sm text-ink group-hover:text-gold-deep transition-colors">
                      {platform.name}
                    </div>
                    <div className="font-mono text-[11px] text-stone truncate mt-0.5">
                      {platform.handle}
                    </div>
                    <div className="text-[11px] font-sans text-stone/80 line-clamp-1 mt-1">
                      {platform.desc}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOCK 2: GIANT NAME FOOTER & UTILITY DIRECTORY
          ========================================================================= */}
      <section className="pt-16 sm:pt-20 pb-10 bg-[#EFEBE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* 4 Utility Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-ink/10">
            {/* Col 1: Brand & Tagline */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <DripLink
                href="/"
                className="flex items-center gap-3 group w-fit"
                aria-label="Lead Edge Marketing - Home"
              >
                <div className="relative w-10 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/logo/lead-edge-logo.png"
                    alt="Lead Edge Logo"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-display font-extrabold tracking-tight text-ink text-base block leading-none">
                    LEAD EDGE
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-stone block mt-1">
                    MARKETING
                  </span>
                </div>
              </DripLink>

              {/* Client Tagline Verbatim */}
              <p className="text-xs sm:text-sm font-sans font-semibold text-ink leading-relaxed max-w-sm pt-2">
                WE DON&apos;T JUST RANK WEBSITES. WE SCALE REVENUE.
              </p>

              <div className="flex flex-col gap-1 text-xs font-mono text-stone pt-2">
                <span className="text-ink font-medium">Direct: {siteConfig.contact.email}</span>
                <span>Studio: {siteConfig.contact.phone}</span>
                <span>Hours: {siteConfig.contact.hours}</span>
              </div>
            </div>

            {/* Col 2: Services Directory */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                Services
              </span>
              <ul className="flex flex-col gap-2.5 text-xs font-sans">
                {FOOTER_SERVICES.map((srv) => (
                  <li key={srv.href}>
                    <DripLink
                      href={srv.href}
                      className="text-stone hover:text-ink transition-colors duration-200"
                    >
                      {srv.title}
                    </DripLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Company Navigation */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold">
                Company
              </span>
              <ul className="flex flex-col gap-2.5 text-xs font-sans">
                {primaryNavItems.map((item) => (
                  <li key={item.title}>
                    <DripLink
                      href={item.href}
                      className="text-stone hover:text-ink transition-colors duration-200"
                    >
                      {item.title}
                    </DripLink>
                  </li>
                ))}
                <li>
                  <DripLink
                    href="/services"
                    className="text-stone hover:text-ink transition-colors duration-200"
                  >
                    Disciplines Overview
                  </DripLink>
                </li>
              </ul>
            </div>

            {/* Col 4: Perspective Newsletter */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Perspective
              </span>
              <p className="text-xs font-sans text-stone leading-relaxed">
                Bi-weekly dispatch on algorithmic search changes, paid acquisition angles, and creative production.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 pt-1">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'notice') setNewsletterStatus('idle');
                    }}
                    placeholder="name@business.com"
                    className="w-full px-3 py-2 text-xs rounded-full bg-white border border-ink/10 text-ink placeholder-stone/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold rounded-full bg-ink text-ivory hover:bg-gold hover:text-ink transition-colors whitespace-nowrap"
                  >
                    Join
                  </button>
                </div>

                {newsletterStatus === 'notice' && (
                  <div className="p-2.5 rounded-xl bg-white border border-ink/10 text-[11px] text-stone">
                    <span className="font-bold text-gold-deep block mb-0.5">Integration Notice:</span>
                    Newsletter platform pending client integration. No data recorded.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Monumental Wordmark Footer */}
          <div className="pt-10 sm:pt-14 pb-8 sm:pb-12 text-center">
            <h1 className="giant-name-footer select-none uppercase leading-[0.88] tracking-tighter text-[clamp(2.75rem,11.2vw,9.5rem)] text-charcoal">
              LEAD EDGE MARKETING
            </h1>
          </div>

          {/* Legal / Copyright Bar */}
          <div className="pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone font-mono">
            <p>© {currentYear} Lead Edge Marketing. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Engagement</span>
              <span>·</span>
              <span className="text-gold-deep font-semibold">Verified Architecture</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
