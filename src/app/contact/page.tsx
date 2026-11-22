import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactForm } from '@/components/contact/ContactForm';
import { Mail, Phone, MapPin, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Strategic Consultation — Start A Project',
  description:
    'Initiate a strategic consultation with Lead Edge Marketers. We review inbound briefs within 24 business hours.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[#F6F3EC] text-ink min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Consultation Details & Studio Image */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-ink/10 text-xs font-mono uppercase tracking-widest text-stone w-fit shadow-2xs mb-6">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Direct Consultation</span>
              </div>

              {/* H1 max 8 words */}
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-[0.96] mb-5">
                Let&apos;s build steady{' '}
                <span className="font-serif italic font-normal text-gold-deep">
                  momentum.
                </span>
              </h1>

              {/* Supporting Line max 14 words */}
              <p className="text-base sm:text-lg font-sans text-stone leading-relaxed">
                Senior partners evaluate every inbound inquiry within 24 business hours.
              </p>
            </div>

            {/* Studio Photography */}
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-ink/10 shadow-soft-md bg-charcoal">
              <Image
                src="/images/pages/P11-contact-hero-4x5.webp"
                alt="Lead Edge executive advisory consultation suite"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-ivory text-xs font-mono">
                <span className="uppercase tracking-widest">Consultation Suite</span>
                <span className="text-gold font-semibold">Active Practice</span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-[20px] bg-white border border-ink/10 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-ivory border border-ink/10 flex items-center justify-center shrink-0 text-gold-deep">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-stone block font-semibold">
                    Inquiries & RFPs
                  </span>
                  <a
                    href="mailto:hello@leadedge.agency"
                    className="text-sm font-mono font-bold text-ink hover:text-gold-deep transition-colors"
                  >
                    hello@leadedge.agency
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-white border border-ink/10 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-ivory border border-ink/10 flex items-center justify-center shrink-0 text-gold-deep">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-stone block font-semibold">
                    Direct Line
                  </span>
                  <a
                    href="tel:+442079460912"
                    className="text-sm font-mono font-bold text-ink hover:text-gold-deep transition-colors"
                  >
                    +44 (0) 20 7946 0912
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-white border border-ink/10 shadow-2xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-ivory border border-ink/10 flex items-center justify-center shrink-0 text-gold-deep">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-stone block font-semibold">
                    Studio Availability
                  </span>
                  <span className="text-sm font-mono font-bold text-ink">
                    Mon – Fri, 09:00 – 18:00 GMT
                  </span>
                </div>
              </div>
            </div>

            {/* SLA Commitment */}
            <div className="p-5 rounded-[20px] bg-[#EFEBE2] border border-ink/10 shadow-2xs flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-gold-deep shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-display font-bold text-ink mb-1">
                  Direct Senior Evaluation
                </h4>
                <p className="text-xs font-sans text-stone leading-relaxed">
                  Every inquiry receives a senior partner review. We assess technical scope and feasibility prior to initiating a discovery sprint.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Zod Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
