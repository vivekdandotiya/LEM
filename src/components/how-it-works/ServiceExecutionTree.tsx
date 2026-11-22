'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Target,
  Zap,
  Share2,
  Video,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers,
  Cpu,
  BarChart3,
  Flame,
} from 'lucide-react';

export type ServiceBranchId = 'all' | 'seo' | 'ppc' | 'web' | 'social' | 'video';

interface TreeNode {
  id: string;
  service: 'seo' | 'ppc' | 'web' | 'social' | 'video';
  serviceName: string;
  title: string;
  subtitle: string;
  metric: string;
  deliverable: string;
  tools: string[];
  description: string;
  image: string;
  href: string;
}

const TREE_NODES: TreeNode[] = [
  // =========================================================================
  // 1. SEARCH & SEO AUTHORITY
  // =========================================================================
  {
    id: 'seo-1',
    service: 'seo',
    serviceName: 'Search & SEO',
    title: 'Topical Intent & Semantic Clustering',
    subtitle: 'Full-spectrum search query extraction & entity mapping',
    metric: '+184% Non-Brand Organic',
    deliverable: 'Semantic Ontology Matrix',
    tools: ['Google Search Console', 'Semrush', 'Ahrefs', 'Vector Embeddings'],
    description:
      'We extract thousands of high-intent search queries and group them into structured topical clusters. Every commercial query maps to a dedicated landing page designed to capture qualified buyers and eliminate keyword cannibalization.',
    image: '/images/services/seo/seo-hero.webp',
    href: '/services/seo/keyword-taxonomy-mapping',
  },
  {
    id: 'seo-2',
    service: 'seo',
    serviceName: 'Search & SEO',
    title: 'Technical Crawl & Server Architecture',
    subtitle: 'Edge rendering, crawl budget & Core Web Vitals',
    metric: '0.4s Server TTFB',
    deliverable: 'Crawl Architecture Report',
    tools: ['Screaming Frog', 'Cloudflare Edge', 'Next.js 15 SSR', 'Lighthouse'],
    description:
      'Search engines cannot rank pages they cannot crawl. We resolve server redirect chains, JavaScript hydration bottlenecks, and canonical loops to ensure 100% crawl efficiency.',
    image: '/images/services/seo/seo-audit.webp',
    href: '/services/seo/technical-seo-audits',
  },
  {
    id: 'seo-3',
    service: 'seo',
    serviceName: 'Search & SEO',
    title: 'Google Maps Local 3-Pack Dominance',
    subtitle: 'High-intent proximity conquest for Australian businesses',
    metric: '#1 Map Pack Ranking',
    deliverable: 'Geo-Targeted Proximity Grid',
    tools: ['Google Business Profile', 'Whitespark', 'Yext', 'Review Velocity'],
    description:
      'Over 70% of phone calls originate in Google’s Map 3-pack. We optimize Google Business Profiles, synchronize NAP citations across 50+ Australian directories, and build geo-targeted landing pages.',
    image: '/images/screens/plumber/poster-480.webp',
    href: '/services/seo/local-3-pack-dominance',
  },
  {
    id: 'seo-4',
    service: 'seo',
    serviceName: 'Search & SEO',
    title: 'Digital PR & High-Tier Editorial Links',
    subtitle: 'Genuine domain authority & editorial mentions',
    metric: 'DA 78+ Editorial Placements',
    deliverable: 'Digital PR Conquest Matrix',
    tools: ['HARO / Connectively', 'Editorial Media Hubs', 'Muck Rack'],
    description:
      'We secure reputable editorial placements and organic news mentions from established Australian publishers, transferring compounding domain trust to your business.',
    image: '/images/services/seo/seo-network.webp',
    href: '/services/seo',
  },

  // =========================================================================
  // 2. PERFORMANCE PAID ADS (META, INSTAGRAM, GOOGLE)
  // =========================================================================
  {
    id: 'ppc-1',
    service: 'ppc',
    serviceName: 'Performance Ads',
    title: 'Google Ads STAG Search Intent',
    subtitle: 'Single-Theme Ad Groups with exact-match negative scrubbing',
    metric: '5.2x Verified ROAS',
    deliverable: 'STAG Campaign Architecture',
    tools: ['Google Ads', 'Value-Based Bidding', 'Looker Studio', 'GA4'],
    description:
      'Stop burning budget on generic search queries. We structure campaigns into hyper-focused Single-Theme Ad Groups with aggressive negative keyword harvesting so every dollar captures high-intent buyers.',
    image: '/images/services/meta-ads/meta-hero.webp',
    href: '/services/ppc/high-intent-search-campaigns',
  },
  {
    id: 'ppc-2',
    service: 'ppc',
    serviceName: 'Performance Ads',
    title: 'Meta Creative Hook Testing Machine',
    subtitle: '10+ weekly visual hook variants across Instagram & Facebook',
    metric: '+184% CVR Uplift',
    deliverable: 'Weekly Creative Test Grid',
    tools: ['Meta Ads Manager', 'Figma Storyboards', 'Motion Graphics', 'CapCut Pro'],
    description:
      'Modern paid social is won through creative diversity. We produce and test 10+ visual hooks, UGC storyboards, and product angles every week to prevent ad fatigue and scale ad spend profitably.',
    image: '/images/services/meta-ads/meta-creative.webp',
    href: '/services/ppc/meta-ads-scaling',
  },
  {
    id: 'ppc-3',
    service: 'ppc',
    serviceName: 'Performance Ads',
    title: 'Server-Side Conversions API (CAPI)',
    subtitle: 'First-party data tracking bypassing iOS cookie degradation',
    metric: '9.8 / 10 Match Quality',
    deliverable: 'CAPI Cloud Pipeline',
    tools: ['Server-Side GTM', 'AWS / Cloudflare Workers', 'Meta CAPI', 'Stape.io'],
    description:
      'Post-iOS 14 browser tracking drops up to 35% of conversion events. We deploy direct server-to-server Conversions API pipelines that feed Meta’s algorithm pristine purchase signals for lower acquisition costs.',
    image: '/images/services/meta-ads/meta-capi.webp',
    href: '/services/ppc',
  },

  // =========================================================================
  // 3. HIGH-CONVERTING WEB ARCHITECTURE
  // =========================================================================
  {
    id: 'web-1',
    service: 'web',
    serviceName: 'Web Architecture',
    title: 'Next.js 15 App Router Edge Architecture',
    subtitle: 'Sub-second React Server Components compiled at the edge',
    metric: '0.4s Mobile LCP',
    deliverable: 'Custom Web Application',
    tools: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Vercel / Cloudflare'],
    description:
      'We replace bloated, vulnerable WordPress templates with bespoke Next.js 15 applications. Compiled statically at the global edge for instantaneous 0.4s mobile loads and perfect 100 Lighthouse scores.',
    image: '/images/services/web-development/web-hero.webp',
    href: '/services/web-development/nextjs-react-applications',
  },
  {
    id: 'web-2',
    service: 'web',
    serviceName: 'Web Architecture',
    title: 'Conversion UX & Frictionless Funnels',
    subtitle: 'Single-tap phone, booking & lead intake routing',
    metric: '+42% Direct Inquiries',
    deliverable: 'Conversion Wireframe Blueprint',
    tools: ['Figma UX', 'Typeform / Cal.com', 'Hotjar', 'A/B Testing'],
    description:
      'Every layout element is engineered to eliminate decision fatigue. Mobile-sticky call triggers, instant calendar bookings, and multi-step inquiry funnels convert passive visitors into confirmed clients.',
    image: '/images/services/web-development/web-design.webp',
    href: '/services/web-development',
  },

  // =========================================================================
  // 4. SOCIAL MEDIA & VIRAL CONTENT
  // =========================================================================
  {
    id: 'social-1',
    service: 'social',
    serviceName: 'Social & Content',
    title: '9:16 Vertical Video Storyboarding & Hooks',
    subtitle: 'High-retention Reels, TikToks & Shorts designed to hook in 3 seconds',
    metric: '3.6x Engagement Lift',
    deliverable: 'Monthly Social Video Calendar',
    tools: ['Instagram Reels', 'TikTok Ads', 'Trend Telemetry', 'Creator Network'],
    description:
      'In a hyper-saturated attention economy, the first 3 seconds dictate survival. We script, edit, and sound-design short-form vertical videos engineered to spark emotional resonance and algorithmic distribution.',
    image: '/images/services/social-media/social-hero.webp',
    href: '/services/social-media',
  },
  {
    id: 'social-2',
    service: 'social',
    serviceName: 'Social & Content',
    title: 'Omnichannel Publishing & Community Nurture',
    subtitle: 'Daily audience conversation, DM intake & brand gravity',
    metric: '+312% Repeat Orders',
    deliverable: 'Active Audience Workflow',
    tools: ['Meta Business Suite', 'Brand Sentiment AI', 'Sprout Social'],
    description:
      'Building genuine brand equity requires daily consistency. We manage weekly content publishing, direct-message response funnels, and community engagement across Instagram, LinkedIn, and Facebook.',
    image: '/images/services/social-media/social-calendar.webp',
    href: '/services/social-media',
  },

  // =========================================================================
  // 5. COMMERCIAL VIDEO & MEDIA PRODUCTION
  // =========================================================================
  {
    id: 'video-1',
    service: 'video',
    serviceName: 'Video & Photo',
    title: 'Cinematic 4K Cinema Camera Production',
    subtitle: 'On-location filming, founder documentaries & broadcast commercials',
    metric: '4K ProRes 4444 Master',
    deliverable: 'Multi-Aspect Ratio Master Pack',
    tools: ['ARRI Alexa / Sony FX', 'Aputure Lighting', 'Cinema Prime Lenses'],
    description:
      'Human connection builds instant trust. Our on-location production team handles full creative direction: scripting, cinematic lighting, dual-system audio capture, and founder story filming.',
    image: '/images/services/video-photo/video-photo-hero.webp',
    href: '/services/video-photo/editorial-video-production',
  },
  {
    id: 'video-2',
    service: 'video',
    serviceName: 'Video & Photo',
    title: 'DaVinci Resolve Cinema Color & Sound Design',
    subtitle: 'Hollywood-grade 3D LUT grading, dialogue mastering & dynamic cutdowns',
    metric: '100% Broadcast Ready',
    deliverable: 'Color Graded Timeline Master',
    tools: ['DaVinci Resolve Studio', 'Fairlight Audio', 'Spatial Audio'],
    description:
      'Every second of footage undergoes precision color grading, micro-contrast enhancement, and custom sound design to create an indelible luxury aesthetic that elevates your brand perception.',
    image: '/images/services/video-photo/video-photo-color.webp',
    href: '/services/video-photo',
  },
];

export function ServiceExecutionTree() {
  const [activeBranch, setActiveBranch] = useState<ServiceBranchId>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('seo-1');

  const filteredNodes =
    activeBranch === 'all'
      ? TREE_NODES
      : TREE_NODES.filter((n) => n.service === activeBranch);

  const selectedNode = TREE_NODES.find((n) => n.id === selectedNodeId) || TREE_NODES[0];

  return (
    <section className="py-20 sm:py-32 bg-[#FAF8F5] text-[#161514] select-none border-b border-[#e8e6e2] relative overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#161514 1px, transparent 1px), radial-gradient(#161514 1px, #FAF8F5 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7ac4f]/15 border border-[#f7ac4f]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f7ac4f] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
              Multi-Service Execution Tree
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.06] mb-4">
            How our services connect to scale revenue.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed">
            Digital marketing does not work in silos. Our five core disciplines operate as an interconnected execution tree, compounding organic search equity, paid ad conversion, and brand authority.
          </p>
        </div>

        {/* =========================================================================
            2. INTERACTIVE SERVICE BRANCH FILTER BAR
            ========================================================================= */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 sm:mb-16 scrollbar-none">
          <button
            onClick={() => setActiveBranch('all')}
            className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all shadow-sm ${
              activeBranch === 'all'
                ? 'bg-[#161514] text-white shadow-md'
                : 'bg-white text-[#5d5a55] hover:text-[#161514] border border-[#e8e6e2]'
            }`}
          >
            🌲 Master Growth Tree
          </button>

          <button
            onClick={() => setActiveBranch('seo')}
            className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              activeBranch === 'seo'
                ? 'bg-[#1f7a37] text-white shadow-md'
                : 'bg-white text-[#5d5a55] hover:text-[#161514] border border-[#e8e6e2]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search & SEO</span>
          </button>

          <button
            onClick={() => setActiveBranch('ppc')}
            className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              activeBranch === 'ppc'
                ? 'bg-[#2563eb] text-white shadow-md'
                : 'bg-white text-[#5d5a55] hover:text-[#161514] border border-[#e8e6e2]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Performance Ads (Meta & PPC)</span>
          </button>

          <button
            onClick={() => setActiveBranch('web')}
            className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              activeBranch === 'web'
                ? 'bg-[#b45309] text-white shadow-md'
                : 'bg-white text-[#5d5a55] hover:text-[#161514] border border-[#e8e6e2]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Web Architecture</span>
          </button>

          <button
            onClick={() => setActiveBranch('social')}
            className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              activeBranch === 'social'
                ? 'bg-[#7c3aed] text-white shadow-md'
                : 'bg-white text-[#5d5a55] hover:text-[#161514] border border-[#e8e6e2]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social & Content</span>
          </button>

          <button
            onClick={() => setActiveBranch('video')}
            className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              activeBranch === 'video'
                ? 'bg-[#be185d] text-white shadow-md'
                : 'bg-white text-[#5d5a55] hover:text-[#161514] border border-[#e8e6e2]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video & Studio</span>
          </button>
        </div>

        {/* =========================================================================
            3. INTERACTIVE TREE WORKSPACE (Split Grid: Left Nodes Tree, Right Live Inspector)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: The Visual Tree Branch Nodes */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Tree Root Header Pill */}
            <div className="p-4 rounded-2xl bg-[#161514] text-white flex items-center justify-between shadow-lg border border-white/10 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f7ac4f] text-[#161514] flex items-center justify-center font-black">
                  LE
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#f7ac4f] uppercase block">
                    CENTRAL ENGINE HUB
                  </span>
                  <h3 className="text-sm sm:text-base font-display font-extrabold text-white">
                    Lead Edge Revenue Architecture
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#1f7a37] animate-pulse" />
                <span>5 Disciplinary Branches Active</span>
              </div>
            </div>

            {/* Tree Nodes List */}
            {filteredNodes.map((node, index) => {
              const isSelected = node.id === selectedNodeId;

              // Service category badge color
              const getServiceBadge = () => {
                switch (node.service) {
                  case 'seo':
                    return 'bg-[#1f7a37]/10 text-[#1f7a37] border-[#1f7a37]/20';
                  case 'ppc':
                    return 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20';
                  case 'web':
                    return 'bg-[#b45309]/10 text-[#b45309] border-[#b45309]/20';
                  case 'social':
                    return 'bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20';
                  case 'video':
                    return 'bg-[#be185d]/10 text-[#be185d] border-[#be185d]/20';
                  default:
                    return 'bg-amber-100 text-amber-800 border-amber-200';
                }
              };

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setSelectedNodeId(node.id);
                    }
                  }}
                  className={`group relative p-5 sm:p-6 rounded-[24px] border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#f7ac4f] ring-2 ring-[#f7ac4f]/30 shadow-lg translate-x-1.5'
                      : 'bg-white hover:bg-[#FAF8F5] border-[#e8e6e2] shadow-sm hover:border-[#161514]/30'
                  }`}
                >
                  {/* Tree Connector Stem */}
                  <div
                    className={`absolute -left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all ${
                      isSelected ? 'bg-[#f7ac4f] scale-150 ring-4 ring-[#f7ac4f]/20' : 'bg-[#d9d6d1]'
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${getServiceBadge()}`}
                        >
                          {node.serviceName}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded-full">
                          {node.deliverable}
                        </span>
                      </div>
                      
                      <span className="text-xs font-mono font-black text-[#161514] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#e8e6e2]">
                        {node.metric}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-display font-extrabold text-[#161514] mb-1 group-hover:text-[#b45309] transition-colors">
                      {node.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-sans text-[#5d5a55] line-clamp-2 leading-relaxed">
                      {node.subtitle}
                    </p>
                  </div>

                  {/* Tools Row */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/5 text-xs">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="text-[10px] font-mono font-bold text-[#8f8a82]">Stack:</span>
                      <span className="text-[11px] font-mono text-[#5d5a55] truncate">
                        {node.tools.join(' · ')}
                      </span>
                    </div>
                    <span className="text-[#f7ac4f] font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT 5 COLS: Interactive Detail Inspector (Sticky Card) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-6 sm:p-8 rounded-[32px] bg-[#161514] text-white shadow-2xl border border-white/10 flex flex-col justify-between">
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#f7ac4f] uppercase tracking-wider">
                    DEEP EXECUTION BLUEPRINT
                  </span>
                  <span className="text-[11px] font-mono text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full">
                    {selectedNode.serviceName}
                  </span>
                </div>

                {/* Node Title */}
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-2 leading-tight">
                  {selectedNode.title}
                </h3>
                <p className="text-sm font-sans text-[#d9d6d1] mb-6 leading-relaxed">
                  {selectedNode.description}
                </p>

                {/* Large Visual Preview Box */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black mb-6 border border-white/10 shadow-inner">
                  <Image
                    src={selectedNode.image}
                    alt={selectedNode.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Metric on Preview */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-[#f7ac4f] text-[#161514] font-black shadow-md">
                      {selectedNode.metric}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/20">
                      {selectedNode.deliverable}
                    </span>
                  </div>
                </div>

                {/* Key Deliverables Checkpoints */}
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono font-bold text-white uppercase block mb-3">
                    Technical Deliverables Included:
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-sans text-[#d9d6d1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1f7a37] shrink-0" />
                      <span>Zero keyword or ad group cannibalization</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-sans text-[#d9d6d1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1f7a37] shrink-0" />
                      <span>Dedicated enterprise tools: {selectedNode.tools.slice(0, 2).join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-sans text-[#d9d6d1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1f7a37] shrink-0" />
                      <span>Transparent weekly closed-loop revenue reporting</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={selectedNode.href}
                className="w-full py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-sm tracking-tight transition-all duration-150 shadow-md text-center flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Explore {selectedNode.serviceName} Discipline</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
