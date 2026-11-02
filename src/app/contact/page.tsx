import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactForm } from '@/components/contact/ContactForm';
import { siteConfig } from '@/data/site';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SparkleGlyph } from '@/components/ui/SparkleGlyph';

export const metadata: Metadata = {
  title: 'Contact & Strategic Consultation — Start A Project',
  description:
    'Initiate a strategic consultation with Lead Edge Marketing. We review inbound briefs within 24 business hours.',
};

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-transparent min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, P11 Photography & 3 Placeholders */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-sm bg-lime" aria-hidden="true" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-grey-3 font-semibold">
                  DIRECT CONSULTATION
                </span>
              </div>

              {/* H1 max 8 words with Serif Swap */}
              <h1 className="text-fs-xl font-display font-extrabold text-ink tracking-tight leading-[0.92] mb-6">
                Let&apos;s build steady <span className="serif-swap text-ink">momentum.</span>
              </h1>

              <p className="text-base sm:text-lg font-sans text-grey-3 leading-relaxed">
                Whether you need search architecture, paid social scaling, or a bespoke web engine, our senior partners evaluate every brief.
              </p>
            </div>

            {/* Studio Photography P11 */}
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-ink/10 shadow-soft-md card-glass-elevated">
              <Image
                src="/images/pages/P11-contact-hero-4x5.webp"
                alt="Lead Edge executive advisory desk with lime coffee mug"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs font-mono">
                <span className="uppercase tracking-widest">Consultation Suite</span>
                <span className="text-lime">CIR-01 Pending</span>
              </div>
            </div>

            {/* 3 Contact Placeholders */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-[18px] bg-paper-2 border border-ink/10 card-glass-elevated flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-lime flex items-center justify-center shrink-0 text-ink">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-grey-2 tracking-wider block">
                    Direct Email (Sample)
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-ink font-semibold">
                    {siteConfig.contact.email}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-[18px] bg-paper-2 border border-ink/10 card-glass-elevated flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-lime flex items-center justify-center shrink-0 text-ink">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-grey-2 tracking-wider block">
                    Studio Line (Sample)
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-ink font-semibold">
                    {siteConfig.contact.phone}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-[18px] bg-paper-2 border border-ink/10 card-glass-elevated flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-lime flex items-center justify-center shrink-0 text-ink">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-grey-2 tracking-wider block">
                    Headquarters (Sample)
                  </span>
                  <span className="text-xs sm:text-sm font-sans text-ink font-semibold">
                    {siteConfig.contact.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glass Form on Paper Dots */}
          <div className="lg:col-span-7 w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
