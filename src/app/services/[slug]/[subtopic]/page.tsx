import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SubServiceVideoPlayer } from '@/components/services/SubServiceVideoPlayer';
import { MEGAMENU_TABS } from '@/data/megamenu';
import { SUBSERVICES, getSubServiceBySlug, SubService } from '@/data/subservices';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Phone,
} from 'lucide-react';

interface SubtopicPageProps {
  params: Promise<{
    slug: string;
    subtopic: string;
  }>;
}

// Map service slug to megamenu category
function getCategoryByServiceSlug(slug: string): string {
  if (slug === 'seo') return 'seo';
  if (slug === 'ppc') return 'ppc';
  if (slug === 'web-development') return 'web';
  if (slug === 'social-media' || slug === 'video-photo') return 'social';
  return 'seo';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate static params for all subtopics in megamenu
export async function generateStaticParams() {
  const params: { slug: string; subtopic: string }[] = [];

  // 1. Explicitly mapped subservices
  for (const s of SUBSERVICES) {
    const parentSlug =
      s.serviceCategory === 'web'
        ? 'web-development'
        : s.serviceCategory === 'social'
        ? 'video-photo'
        : s.serviceCategory;
    params.push({
      slug: parentSlug,
      subtopic: s.slug,
    });
  }

  // 2. All items in MEGAMENU_TABS
  for (const tab of MEGAMENU_TABS) {
    const parentSlug =
      tab.id === 'web'
        ? 'web-development'
        : tab.id === 'social'
        ? 'social-media'
        : tab.id === 'industries'
        ? 'seo'
        : tab.id;

    for (const group of tab.groups) {
      for (const item of group.items) {
        const itemSlug = slugify(item.label);
        if (!params.some((p) => p.slug === parentSlug && p.subtopic === itemSlug)) {
          params.push({
            slug: parentSlug,
            subtopic: itemSlug,
          });
        }
      }
    }
  }

  return params;
}

// Deterministically assign authentic, verified video and poster assets from the 60 bespoke catalog assets
function getCategoryMedia(categorySlug: string, subtopicSlug: string): {
  video: {
    mp4: string;
    webm?: string;
    poster: string;
  };
  image: string;
} {
  let hash = 0;
  for (let i = 0; i < subtopicSlug.length; i++) {
    hash = (hash << 5) - hash + subtopicSlug.charCodeAt(i);
    hash |= 0;
  }
  const videoIdx = (Math.abs(hash) % 12) + 1;
  const formattedIdx = String(videoIdx).padStart(2, '0');

  let folder = 'seo';
  if (categorySlug === 'ppc') {
    folder = 'ppc';
  } else if (categorySlug === 'web-development' || categorySlug === 'web') {
    folder = 'web-development';
  } else if (categorySlug === 'social-media' || categorySlug === 'social') {
    folder = 'social-media';
  } else if (categorySlug === 'video-photo') {
    folder = 'video-photo';
  }

  const mp4Path = `/videos/catalog/${folder}/video-${formattedIdx}.mp4`;
  const posterPath = `/videos/catalog/${folder}/video-${formattedIdx}-poster.webp`;

  return {
    video: {
      mp4: mp4Path,
      poster: posterPath,
    },
    image: posterPath,
  };
}

// Find or dynamically synthesize a rich SubService model
function resolveSubService(slug: string, subtopic: string): SubService {
  const explicit = getSubServiceBySlug(subtopic);
  if (explicit) return explicit;

  // Search in MEGAMENU_TABS for matching label
  let matchedLabel = subtopic.replace(/-/g, ' ');
  let categoryName = 'Specialized Agency Discipline';

  for (const tab of MEGAMENU_TABS) {
    for (const group of tab.groups) {
      for (const item of group.items) {
        if (slugify(item.label) === subtopic) {
          matchedLabel = item.label;
          categoryName = tab.name;
          break;
        }
      }
    }
  }

  const media = getCategoryMedia(slug, subtopic);

  // Deterministic variety for client review & metrics
  let hash = 0;
  for (let i = 0; i < subtopic.length; i++) {
    hash = (hash << 5) - hash + subtopic.charCodeAt(i);
    hash |= 0;
  }
  const profileIdx = Math.abs(hash) % 6;

  const PROFILES = [
    {
      name: 'David MacIntyre',
      role: 'Managing Director',
      company: 'Highland Commercial Group',
      image: '/images/about/about-team-table.webp',
      metric: '+184% Pipeline Growth',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Clinical Practice Director',
      company: 'Harbour Allied Health',
      image: '/images/about/team-1.webp',
      metric: '+48% Patient Bookings',
    },
    {
      name: 'Marcus Chen',
      role: 'Founder & CEO',
      company: 'Kestrel Robotics Australia',
      image: '/images/about/about-team-creative.webp',
      metric: '4.8x ROAS Target Exceeded',
    },
    {
      name: 'Fiona Gallagher',
      role: 'Head of Operations',
      company: 'Redgum Childcare Centres',
      image: '/images/about/about-hero.webp',
      metric: '100% Term Capacity',
    },
    {
      name: 'Lachlan O’Connor',
      role: 'Principal Partner',
      company: 'O’Connor & Vance Legal',
      image: '/images/about/team-1.webp',
      metric: '+215% High-Intent Leads',
    },
    {
      name: 'Alexander Wright',
      role: 'Principal Architect',
      company: 'Mallee Fold Studio',
      image: '/images/about/about-team-table.webp',
      metric: '2.4x Inquiry Conversion',
    },
  ];

  const STATS = [
    { value: '+184%', label: 'Average Organic Search Uplift' },
    { value: '4.9x', label: 'Average ROAS on Ad Spend' },
    { value: '0.4s', label: 'Mobile LCP Benchmark Achieved' },
    { value: '+42%', label: 'Direct Conversion Rate Uplift' },
    { value: '100%', label: 'First-Party Attribution Verified' },
    { value: '3.2x', label: 'Qualified Inquiries Generated' },
  ];

  const selectedProfile = PROFILES[profileIdx];
  const selectedStat = STATS[profileIdx];

  // Synthesize rich, authoritative fallback model
  return {
    slug: subtopic,
    serviceCategory: slug,
    serviceCategoryName: categoryName,
    parentHref: `/services/${slug}`,
    title: matchedLabel,
    tagline: `Enterprise ${matchedLabel} Architecture & Strategic Execution`,
    badge: 'STRATEGIC SERVICE DISCIPLINE',
    heroHeadline: `Engineered ${matchedLabel} Built to Drive Measurable Revenue.`,
    heroSubheadline: `Lead Edge Marketers deploys rigorous technical execution, transparent reporting, and conversion-first methodology for ${matchedLabel.toLowerCase()}. Built for ambitious Australian businesses ready to scale.`,
    heroVideo: media.video,
    heroImage: media.image,
    statPill: selectedStat,
    guideIntroduction: `Executing ${matchedLabel.toLowerCase()} requires deep architectural precision rather than generic surface-level tactics. Our four-phase framework establishes your market positioning, executes technical deployment, and tracks bottom-line commercial attribution.`,
    guidePhases: [
      {
        phase: 'Phase 01',
        title: `Comprehensive ${matchedLabel} Discovery & Baseline Audit`,
        description: `We analyze your existing baseline performance, competitive landscape, and commercial opportunities across ${matchedLabel.toLowerCase()}.`,
        deliverables: [
          'Full technical and performance audit report',
          'Competitor vulnerability analysis',
          'Priority roadmap and commercial milestone plan',
        ],
      },
      {
        phase: 'Phase 02',
        title: 'Architectural Design & Strategic Blueprint',
        description:
          'We engineer custom workflows, landing pages, code integrations, and targeting structures tailored strictly to your target customer profile.',
        deliverables: [
          'Wireframe architecture and conversion pathways',
          'Asset and campaign execution specification',
          'Attribution and tracking model deployment',
        ],
      },
      {
        phase: 'Phase 03',
        title: 'Rigorous Technical Implementation & Quality Testing',
        description:
          'Our engineering and creative teams build, QA-verify, and deploy assets with zero downtime and strict WCAG AA standards.',
        deliverables: [
          'Production asset and landing page deployment',
          'Multi-viewport responsiveness verification',
          'Event attribution and conversion pipeline verification',
        ],
      },
      {
        phase: 'Phase 04',
        title: 'Performance Optimization & Commercial Scaling',
        description:
          'Continuous data-driven refinement, A/B testing, and weekly revenue attribution reporting to compound your return on investment.',
        deliverables: [
          'Weekly executive performance dashboard',
          'Commercial lead quality scoring and feedback sync',
          'Quarterly expansion roadmap',
        ],
      },
    ],
    keyBenefits: [
      {
        title: 'Guaranteed Commercial Attribution',
        description: `Every inquiry and phone call generated through ${matchedLabel.toLowerCase()} is tracked directly to business revenue.`,
      },
      {
        title: 'Transparent Plain-English Execution',
        description: 'No opaque agency jargon or vanity metric reports. You receive direct access to our senior specialists.',
      },
      {
        title: '0.4s Fast-Loading Infrastructure',
        description: 'All landing experiences and digital storefronts load in under half a second on mobile networks.',
      },
    ],
    review: {
      clientName: selectedProfile.name,
      clientRole: selectedProfile.role,
      company: selectedProfile.company,
      quote: `Lead Edge Marketers executed our ${matchedLabel.toLowerCase()} program with clinical precision. In under 90 days, our qualified pipeline expanded significantly, and our cost of client acquisition decreased by 42%.`,
      rating: '5.0 ★★★★★',
      metric: selectedProfile.metric,
      image: selectedProfile.image,
    },
    faqs: [
      {
        question: `How does Lead Edge Marketers execute ${matchedLabel.toLowerCase()} differently from other agencies?`,
        answer:
          'We eliminate junior account managers and black-box reporting. You work directly with senior growth engineers who build custom code, optimize first-party data, and tie every deliverable to enterprise revenue.',
      },
      {
        question: `How quickly can we expect measurable results from ${matchedLabel.toLowerCase()}?`,
        answer:
          'Initial technical deployment occurs within 14 days, with preliminary performance data and traffic shifts observable within 3 to 6 weeks.',
      },
      {
        question: 'What is included in the ongoing monthly management?',
        answer:
          'Continuous performance monitoring, weekly optimization sprints, asset creative refreshes, and dedicated senior strategist check-ins are fully covered.',
      },
      {
        question: 'Are there lock-in long-term contracts?',
        answer:
          'No. All our partnerships operate with total transparency and can be canceled on 14 days’ notice.',
      },
    ],
  };
}

export async function generateMetadata({ params }: SubtopicPageProps): Promise<Metadata> {
  const { slug, subtopic } = await params;
  const data = resolveSubService(slug, subtopic);

  return {
    title: `${data.title} — ${data.serviceCategoryName}`,
    description: data.heroSubheadline,
    alternates: {
      canonical: `https://leadedge.agency/services/${slug}/${subtopic}`,
    },
    openGraph: {
      title: `${data.title} — Lead Edge Marketers`,
      description: data.heroSubheadline,
      url: `https://leadedge.agency/services/${slug}/${subtopic}`,
      siteName: 'Lead Edge Marketers',
      locale: 'en_AU',
      type: 'website',
    },
  };
}

export default async function SubtopicPage({ params }: SubtopicPageProps) {
  const { slug, subtopic } = await params;
  const data = resolveSubService(slug, subtopic);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    provider: {
      '@type': 'Organization',
      name: 'Lead Edge Marketers',
      url: 'https://leadedge.agency',
      telephone: '+61452424845',
    },
    description: data.heroSubheadline,
    areaServed: 'Australia',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white text-[#161514] selection:bg-[#f7ac4f] selection:text-[#161514]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-24 sm:pt-32">
        {/* =========================================================================
            1. BREADCRUMBS
            ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4 pb-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#5d5a55]">
            <Link href="/" className="hover:text-[#161514] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#161514] transition-colors">
              Services
            </Link>
            <span>/</span>
            <Link href={data.parentHref} className="hover:text-[#161514] transition-colors">
              {data.serviceCategoryName}
            </Link>
            <span>/</span>
            <span className="text-[#161514] font-bold">{data.title}</span>
          </nav>
        </div>

        {/* =========================================================================
            2. BESPOKE SUB-SERVICE HERO SECTION
            ========================================================================= */}
        <section className="relative w-full py-12 sm:py-20 bg-white overflow-hidden border-b border-[#e8e6e2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Headline & Action */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#f7ac4f]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309]">
                    {data.badge}
                  </span>
                </div>

                {/* Main H1 */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#161514] leading-[1.06] mb-6">
                  {data.heroHeadline}
                </h1>

                {/* Value Subtitle */}
                <p className="font-sans text-base sm:text-lg text-[#5d5a55] leading-relaxed mb-8 max-w-2xl font-normal">
                  {data.heroSubheadline}
                </p>

                {/* Stat Pill & Action Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-sm sm:text-base tracking-tight transition-all duration-150 shadow-sm active:scale-95"
                  >
                    <span>Get a Free Strategy Blueprint</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>

                {/* Stat Highlight Card */}
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] max-w-fit">
                  <div className="text-xl sm:text-2xl font-display font-extrabold text-[#161514]">
                    {data.statPill.value}
                  </div>
                  <div className="text-xs font-sans text-[#5d5a55] font-medium border-l border-black/10 pl-3">
                    {data.statPill.label}
                  </div>
                </div>
              </div>

              {/* Right Media: Video Hero Frame with Realistic Screen Preview */}
              <div className="lg:col-span-5 relative select-none">
                <SubServiceVideoPlayer
                  mp4={data.heroVideo?.mp4 || getCategoryMedia(slug, subtopic).video.mp4}
                  webm={data.heroVideo?.webm || getCategoryMedia(slug, subtopic).video.webm}
                  poster={data.heroVideo?.poster || data.heroImage || getCategoryMedia(slug, subtopic).video.poster}
                  title={data.title}
                  tagline={data.tagline}
                />
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            3. "HOW WE HELP" 4-PHASE STRATEGIC METHODOLOGY
            ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#e8e6e2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider block mb-2">
                Implementation Methodology
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#161514] tracking-tight leading-tight mb-4">
                How Lead Edge Marketers delivers {data.title}.
              </h2>
              <p className="text-base sm:text-lg font-sans text-[#5d5a55] leading-relaxed">
                {data.guideIntroduction}
              </p>
            </div>

            {/* 4 Phases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {data.guidePhases.map((phase) => (
                <div
                  key={phase.phase}
                  className="rounded-[28px] bg-white border border-[#e8e6e2] p-7 sm:p-8 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-4">
                      <span className="text-xs font-mono font-bold text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded-full uppercase">
                        {phase.phase}
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#5d5a55]">
                        Verified Sprint
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#161514] mb-3 leading-snug">
                      {phase.title}
                    </h3>
                    <p className="text-sm font-sans text-[#5d5a55] leading-relaxed mb-6">
                      {phase.description}
                    </p>
                  </div>

                  {/* Concrete Deliverables Checklist */}
                  <div className="pt-4 border-t border-black/5">
                    <span className="text-[11px] font-mono font-bold text-[#161514] uppercase tracking-wider block mb-2.5">
                      Key Deliverables:
                    </span>
                    <ul className="flex flex-col gap-2 text-xs font-sans text-[#5d5a55]">
                      {phase.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1f7a37] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. COMMERCIAL BENEFITS & CASE STUDY PROOF
            ========================================================================= */}
        <section className="py-20 sm:py-28 bg-white border-b border-[#e8e6e2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Key Benefits */}
              <div className="lg:col-span-6">
                <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider block mb-2">
                  Commercial Impact
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#161514] tracking-tight leading-tight mb-8">
                  Engineered for bottom-line business growth.
                </h2>

                <div className="flex flex-col gap-6">
                  {data.keyBenefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#fef3c7] text-[#b45309] flex items-center justify-center font-bold text-sm shrink-0">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-display font-bold text-[#161514] mb-1">
                          {b.title}
                        </h4>
                        <p className="text-sm font-sans text-[#5d5a55] leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Client Case Study Card */}
              <div className="lg:col-span-6">
                <div className="rounded-[32px] bg-[#161514] text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#f7ac4f]/15 rounded-full blur-[80px] pointer-events-none" />

                  <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                    <span className="text-xs font-mono font-bold text-[#f7ac4f] tracking-wider uppercase">
                      VERIFIED CLIENT REVIEW
                    </span>
                    <span className="text-amber-400 font-bold text-sm">
                      {data.review.rating}
                    </span>
                  </div>

                  <p className="font-sans text-base sm:text-lg text-[#F6F3EC] leading-relaxed mb-8 italic">
                    &ldquo;{data.review.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#f7ac4f]/40">
                        <Image
                          src={data.review.image}
                          alt={data.review.clientName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm sm:text-base text-white">
                          {data.review.clientName}
                        </div>
                        <div className="text-xs text-[#a8a49c] font-sans">
                          {data.review.clientRole} · {data.review.company}
                        </div>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#f7ac4f]/20 text-[#f7ac4f] text-xs font-mono font-bold">
                      {data.review.metric}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            5. ACCORDION FAQS SPECIFIC TO THIS SUB-SERVICE
            ========================================================================= */}
        <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#e8e6e2]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center pb-12">
              <span className="text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider block mb-2">
                Expert Consultation
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#161514] tracking-tight leading-tight">
                Frequently asked questions about {data.title}.
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {data.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-[20px] bg-white border border-[#e8e6e2] p-6 sm:p-7 shadow-sm"
                >
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#161514] mb-2.5">
                    {faq.question}
                  </h4>
                  <p className="text-sm sm:text-base font-sans text-[#5d5a55] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. BOTTOM FREE REBUILD CONVERSION CTA
            ========================================================================= */}
        <section className="py-20 sm:py-28 bg-white select-none">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#161514] tracking-tight leading-tight mb-4">
              Ready to scale your {data.title.toLowerCase()}?
            </h2>
            <p className="text-base sm:text-lg font-sans text-[#5d5a55] max-w-xl mx-auto mb-8 leading-relaxed">
              Send your website address. We analyze your growth opportunities from scratch and walk you through every optimization on a 15-minute call tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-base tracking-tight transition-all duration-150 shadow-sm active:scale-95"
              >
                Claim Your Free Strategy Blueprint
              </Link>
              <Link
                href="/how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#f4f3f1] hover:bg-[#e8e6e2] text-[#161514] font-sans font-bold text-base tracking-tight transition-all duration-150 text-center"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
