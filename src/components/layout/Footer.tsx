'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { primaryNavItems } from '@/data/nav';
import { business } from '@/data/business';
import { DripLink } from '@/components/animorio/drip/DripLink';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';

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
    <footer className="bg-ink text-white border-t border-white/10 relative overflow-hidden pt-20 pb-12 select-none dark-dots" data-theme="dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Grid: Exactly 3 Columns Max */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1 (Brand & Positioning) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <DripLink href="/" className="flex items-center gap-3 group w-fit" aria-label="Lead Edge Marketing - Home">
              <div className="relative w-9 h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo/lead-edge-logo.png"
                  alt="Lead Edge Logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display font-bold tracking-tight text-white text-base block leading-none">
                  LEAD EDGE
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-grey-2 block mt-1">
                  Digital Growth Studio
                </span>
              </div>
            </DripLink>

            <p className="text-sm font-sans text-grey-2 leading-relaxed max-w-sm">
              {business.supportLine}
            </p>

            <div className="flex flex-col gap-1 text-xs font-mono text-grey-2">
              <span className="text-white">Direct: {siteConfig.contact.email}</span>
              <span>Studio: {siteConfig.contact.phone}</span>
            </div>
          </div>

          {/* Column 2 (Capabilities & Navigation) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest uppercase text-grey-2">
                Services
              </span>
              <ul className="flex flex-col gap-2 text-sm font-sans">
                {business.services.map((service) => (
                  <li key={service.id}>
                    <DripLink
                      href={`/services/${service.slug}`}
                      className="text-grey-2 hover:text-white transition-colors duration-200"
                    >
                      {service.shortTitle}
                    </DripLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest uppercase text-grey-2">
                Studio
              </span>
              <ul className="flex flex-col gap-2 text-sm font-sans">
                {primaryNavItems.map((item) => (
                  <li key={item.title}>
                    <DripLink
                      href={item.href}
                      className="text-grey-2 hover:text-white transition-colors duration-200"
                    >
                      {item.title}
                    </DripLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 (Newsletter Placeholder) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest uppercase text-grey-2 flex items-center gap-2">
              <SparkleGlyph size={12} className="text-lime" />
              Perspective
            </span>
            <p className="text-xs font-sans text-grey-2 leading-relaxed">
              Field notes on search algorithms, creative hooks, and paid acquisition.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
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
                  className="w-full px-3 py-2 text-xs rounded-xl bg-charcoal border border-white/10 text-white placeholder-grey-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-lime text-ink hover:bg-lime-soft transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </div>

              {newsletterStatus === 'notice' && (
                <div className="p-2.5 rounded-xl bg-charcoal border border-white/10 text-[11px] text-grey-2">
                  <span className="font-bold text-lime block mb-0.5">Integration Notice:</span>
                  Newsletter platform pending client integration. No data recorded.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-grey-3 font-mono">
          <p>© {currentYear} Lead Edge Marketing. All rights reserved.</p>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Notice</span>
            <span>·</span>
            <span>Terms of Engagement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
