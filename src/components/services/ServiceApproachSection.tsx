'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export interface ApproachTenet {
  titlePrimary: string;
  titleSecondary: string;
  description: string;
}

export interface ApproachData {
  centerTop: string;
  centerBottom: string;
  tenets: {
    topLeft: ApproachTenet;
    topRight: ApproachTenet;
    bottomLeft: ApproachTenet;
    bottomRight: ApproachTenet;
  };
}

export const APPROACH_DATA: Record<string, ApproachData> = {
  seo: {
    centerTop: 'OUR APPROACH',
    centerBottom: 'TO SEO',
    tenets: {
      topLeft: {
        titlePrimary: 'AUDIENCES,',
        titleSecondary: 'NOT KEYWORDS',
        description:
          'We sweat to understand more about your audience and their search behaviour before we start. We might surprise you here :)',
      },
      topRight: {
        titlePrimary: 'PROBLEMS,',
        titleSecondary: 'NOT CHECKBOXES',
        description:
          'Index bloat, load time, thin content, we get to the heart of the SEO pain points of your site & kill the Kraken.',
      },
      bottomLeft: {
        titlePrimary: 'SOLUTIONS,',
        titleSecondary: 'NOT JARGON',
        description:
          'Our solutions will not look like a developer’s handbook, it will be easy to understand, measure & growth linked.',
      },
      bottomRight: {
        titlePrimary: 'GROWTH,',
        titleSecondary: 'NOT BS',
        description:
          'We track growth metrics like Organic Revenue & Organic Traffic, not vanity metrics like link count & DA/PA.',
      },
    },
  },

  ppc: {
    centerTop: 'OUR APPROACH',
    centerBottom: 'TO PAID ADS',
    tenets: {
      topLeft: {
        titlePrimary: 'OFFERS,',
        titleSecondary: 'NOT GUESSWORK',
        description:
          'Before spending a single dollar on ads, we refine the offer, hook, and angle. Great ads amplify an offer people already want to buy.',
      },
      topRight: {
        titlePrimary: 'BUYERS,',
        titleSecondary: 'NOT EMPTY CLICKS',
        description:
          'Clicks don’t pay your team; paying customers and booked calls do. We optimize every dollar for qualified inbound inquiries and sales.',
      },
      bottomLeft: {
        titlePrimary: 'CREATIVE,',
        titleSecondary: 'NOT AD FATIGUE',
        description:
          'We script, shoot, and test fresh video hooks and copy variations every single week so your audience never gets tired of seeing your brand.',
      },
      bottomRight: {
        titlePrimary: 'PROFIT,',
        titleSecondary: 'NOT VANITY ROAS',
        description:
          'We track blended acquisition cost and real revenue in your bank account, not inflated in-platform dashboard numbers.',
      },
    },
  },

  'social-media': {
    centerTop: 'OUR APPROACH',
    centerBottom: 'TO SOCIAL MEDIA',
    tenets: {
      topLeft: {
        titlePrimary: 'ATTENTION,',
        titleSecondary: 'NOT ALGORITHM CHASING',
        description:
          'We create content that stops thumbs because it is genuinely helpful, authentic, or entertaining—not lazy copy-pasting or trend-hopping.',
      },
      topRight: {
        titlePrimary: 'CONVERSATIONS,',
        titleSecondary: 'NOT BROADCASTS',
        description:
          'Social is a two-way street. We reply to comments, triage direct messages, and turn casual followers into warm business leads.',
      },
      bottomLeft: {
        titlePrimary: 'CONSISTENCY,',
        titleSecondary: 'NOT BURNOUT',
        description:
          'Never disappear for weeks at a time. We plan and produce monthly calendars in advance so your brand stays reliably active and visible.',
      },
      bottomRight: {
        titlePrimary: 'REPUTATION,',
        titleSecondary: 'NOT FLUFF',
        description:
          'Every post builds brand authority and customer trust, positioning your business as the obvious first choice in your market.',
      },
    },
  },

  'email-marketing': {
    centerTop: 'OUR APPROACH',
    centerBottom: 'TO EMAIL',
    tenets: {
      topLeft: {
        titlePrimary: 'RELATIONSHIPS,',
        titleSecondary: 'NOT SPAM',
        description:
          'We write emails your customers actually look forward to opening—relevant, engaging, and respectful of their inbox.',
      },
      topRight: {
        titlePrimary: 'AUTOMATION,',
        titleSecondary: 'NOT BUSYWORK',
        description:
          'Always-on welcome sequences, abandoned cart triggers, and browse flows that generate revenue on autopilot while you run your business.',
      },
      bottomLeft: {
        titlePrimary: 'SEGMENTS,',
        titleSecondary: 'NOT MASS BLASTS',
        description:
          'Send the right message to the right person based on what they have bought and what they care about, maximizing repeat orders.',
      },
      bottomRight: {
        titlePrimary: 'REVENUE,',
        titleSecondary: 'NOT OPEN RATES',
        description:
          'We track booked revenue and customer lifetime value, not misleading open rates that tech privacy updates distort anyway.',
      },
    },
  },

  'web-development': {
    centerTop: 'OUR APPROACH',
    centerBottom: 'TO WEB ARCHITECTURE',
    tenets: {
      topLeft: {
        titlePrimary: 'CONVERSIONS,',
        titleSecondary: 'NOT JUST PRETTY DESIGNS',
        description:
          'A pretty website is useless if visitors don’t call. Every page is engineered with clear pathways that guide prospects to inquire or book.',
      },
      topRight: {
        titlePrimary: 'SPEED,',
        titleSecondary: 'NOT SLOW PLUGINS',
        description:
          'Sub-second load times on mobile and desktop. Zero bloated templates, zero sluggish WordPress plugins, zero lost customers.',
      },
      bottomLeft: {
        titlePrimary: 'CLARITY,',
        titleSecondary: 'NOT CONFUSION',
        description:
          'Visitors decide in 3 seconds whether to stay. We write simple, punchy copy that tells them immediately who you are and why choose you.',
      },
      bottomRight: {
        titlePrimary: 'OWNERSHIP,',
        titleSecondary: 'NOT HOSTAGE CODE',
        description:
          'You own 100% of your codebase, domains, and content. Built on Next.js 15 for world-class security and zero lock-in contracts.',
      },
    },
  },
};

interface ServiceApproachSectionProps {
  slug?: string;
  customTitle?: string;
}

export function ServiceApproachSection({
  slug = 'seo',
  customTitle,
}: ServiceApproachSectionProps) {
  // Normalize slug
  const normalizedSlug =
    slug === 'meta-ads'
      ? 'ppc'
      : slug === 'web'
      ? 'web-development'
      : slug === 'social'
      ? 'social-media'
      : slug;

  const data = APPROACH_DATA[normalizedSlug] || APPROACH_DATA['seo'];

  const centerBottomText = customTitle
    ? `TO ${customTitle.toUpperCase()}`
    : data.centerBottom;

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#090A0B] text-white select-none overflow-hidden border-t border-b border-white/10">
      {/* Background Subtle Tech Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f7ac4f]/5 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #090A0B 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            DESKTOP LAYOUT (lg+): Exact 4-Quadrant Central Hub Diagram with Connecting Vectors
            ========================================================================= */}
        <div className="hidden lg:block relative min-h-[580px] w-full">
          
          {/* CENTER CIRCULAR HUB */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative w-72 h-72 rounded-full bg-[#161719] border-2 border-[#D4AF37]/50 shadow-[0_0_60px_rgba(212,175,55,0.18)] flex flex-col items-center justify-center text-center p-6 transition-transform duration-300 hover:scale-105">
              {/* Inner Subtle Ring */}
              <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none" />
              
              <span className="text-xl font-display font-extrabold uppercase tracking-widest text-white leading-tight">
                {data.centerTop}
              </span>
              <span className="text-xl sm:text-2xl font-display font-black uppercase tracking-wider text-[#F7AC4F] mt-1 drop-shadow-sm leading-tight">
                {centerBottomText}
              </span>
            </div>
          </div>

          {/* SVG CONNECTOR LINES (Desktop Radial Tree) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 580"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Top-Left Connector */}
            <path
              d="M 400 240 L 320 130 L 270 130"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            <circle cx="270" cy="130" r="5" fill="#090A0B" stroke="#D4AF37" strokeWidth="2.5" />

            {/* Top-Right Connector */}
            <path
              d="M 600 240 L 680 130 L 730 130"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            <circle cx="730" cy="130" r="5" fill="#090A0B" stroke="#D4AF37" strokeWidth="2.5" />

            {/* Bottom-Left Connector */}
            <path
              d="M 400 340 L 320 450 L 270 450"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            <circle cx="270" cy="450" r="5" fill="#090A0B" stroke="#D4AF37" strokeWidth="2.5" />

            {/* Bottom-Right Connector */}
            <path
              d="M 600 340 L 680 450 L 730 450"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            <circle cx="730" cy="450" r="5" fill="#090A0B" stroke="#D4AF37" strokeWidth="2.5" />
          </svg>

          {/* 4 QUADRANT CONTENT CARDS */}

          {/* 1. TOP-LEFT */}
          <div className="absolute top-4 left-4 max-w-[290px] text-left z-20">
            <h3 className="text-lg font-display font-black tracking-tight leading-tight uppercase">
              <span className="text-white block">{data.tenets.topLeft.titlePrimary}</span>
              <span className="text-[#F7AC4F] italic block font-serif tracking-normal text-xl">
                {data.tenets.topLeft.titleSecondary}
              </span>
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans">
              {data.tenets.topLeft.description}
            </p>
          </div>

          {/* 2. TOP-RIGHT */}
          <div className="absolute top-4 right-4 max-w-[290px] text-right z-20">
            <h3 className="text-lg font-display font-black tracking-tight leading-tight uppercase">
              <span className="text-white block">{data.tenets.topRight.titlePrimary}</span>
              <span className="text-[#F7AC4F] italic block font-serif tracking-normal text-xl">
                {data.tenets.topRight.titleSecondary}
              </span>
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans">
              {data.tenets.topRight.description}
            </p>
          </div>

          {/* 3. BOTTOM-LEFT */}
          <div className="absolute bottom-4 left-4 max-w-[290px] text-left z-20">
            <h3 className="text-lg font-display font-black tracking-tight leading-tight uppercase">
              <span className="text-white block">{data.tenets.bottomLeft.titlePrimary}</span>
              <span className="text-[#F7AC4F] italic block font-serif tracking-normal text-xl">
                {data.tenets.bottomLeft.titleSecondary}
              </span>
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans">
              {data.tenets.bottomLeft.description}
            </p>
          </div>

          {/* 4. BOTTOM-RIGHT */}
          <div className="absolute bottom-4 right-4 max-w-[290px] text-right z-20">
            <h3 className="text-lg font-display font-black tracking-tight leading-tight uppercase">
              <span className="text-white block">{data.tenets.bottomRight.titlePrimary}</span>
              <span className="text-[#F7AC4F] italic block font-serif tracking-normal text-xl">
                {data.tenets.bottomRight.titleSecondary}
              </span>
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans">
              {data.tenets.bottomRight.description}
            </p>
          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET LAYOUT (< lg): Fluid Vertical Stack with Golden Hub & Nodes
            ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          
          {/* Mobile Center Hub */}
          <div className="w-64 h-64 rounded-full bg-[#161719] border-2 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.2)] flex flex-col items-center justify-center text-center p-6">
            <span className="text-lg font-display font-extrabold uppercase tracking-widest text-white leading-tight">
              {data.centerTop}
            </span>
            <span className="text-lg font-display font-black uppercase tracking-wider text-[#F7AC4F] mt-1 leading-tight">
              {centerBottomText}
            </span>
          </div>

          {/* 4 Responsive Cards with Gold Accent Left Border & Node */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">
            
            {/* Tenet 1 */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-[#D4AF37] bg-transparent" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                  Principle 01
                </span>
              </div>
              <h3 className="text-base font-display font-black tracking-tight uppercase leading-snug">
                <span className="text-white">{data.tenets.topLeft.titlePrimary} </span>
                <span className="text-[#F7AC4F] italic font-serif">
                  {data.tenets.topLeft.titleSecondary}
                </span>
              </h3>
              <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                {data.tenets.topLeft.description}
              </p>
            </div>

            {/* Tenet 2 */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-[#D4AF37] bg-transparent" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                  Principle 02
                </span>
              </div>
              <h3 className="text-base font-display font-black tracking-tight uppercase leading-snug">
                <span className="text-white">{data.tenets.topRight.titlePrimary} </span>
                <span className="text-[#F7AC4F] italic font-serif">
                  {data.tenets.topRight.titleSecondary}
                </span>
              </h3>
              <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                {data.tenets.topRight.description}
              </p>
            </div>

            {/* Tenet 3 */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-[#D4AF37] bg-transparent" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                  Principle 03
                </span>
              </div>
              <h3 className="text-base font-display font-black tracking-tight uppercase leading-snug">
                <span className="text-white">{data.tenets.bottomLeft.titlePrimary} </span>
                <span className="text-[#F7AC4F] italic font-serif">
                  {data.tenets.bottomLeft.titleSecondary}
                </span>
              </h3>
              <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                {data.tenets.bottomLeft.description}
              </p>
            </div>

            {/* Tenet 4 */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-[#D4AF37] bg-transparent" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                  Principle 04
                </span>
              </div>
              <h3 className="text-base font-display font-black tracking-tight uppercase leading-snug">
                <span className="text-white">{data.tenets.bottomRight.titlePrimary} </span>
                <span className="text-[#F7AC4F] italic font-serif">
                  {data.tenets.bottomRight.titleSecondary}
                </span>
              </h3>
              <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                {data.tenets.bottomRight.description}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
