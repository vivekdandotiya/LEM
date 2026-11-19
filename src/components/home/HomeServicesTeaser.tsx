'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/data/media';
import { ArrowRight } from 'lucide-react';

const SERVICE_TEASERS = [
  {
    slug: 'seo',
    number: '01',
    title: 'Search Engine Optimization',
    cue: 'Discoverability',
    description: 'We optimize website structure, build organic authority, and target high-converting search intent to generate sustainable traffic.',
    image: media.home.servicesTeaser[0].image.src,
  },
  {
    slug: 'ppc',
    number: '02',
    title: 'Pay-Per-Click Advertising',
    cue: 'Immediate Traction',
    description: 'Data-driven paid ad campaigns across Google and Meta built to maximize conversion velocity and return on ad spend.',
    image: media.home.servicesTeaser[1].image.src,
  },
  {
    slug: 'social-media',
    number: '03',
    title: 'Social Media Marketing',
    cue: 'Brand Gravity',
    description: 'Strategic social content, vertical video production, and active community care that transform passive scrollers into loyal customers.',
    image: media.home.servicesTeaser[2].image.src,
  },
  {
    slug: 'web-development',
    number: '04',
    title: 'Web Development',
    cue: 'Architectural Rigor',
    description: 'Bespoke, high-performance web applications engineered for sub-second page loads, clean architecture, and conversion.',
    image: media.home.servicesTeaser[3].image.src,
  },
  {
    slug: 'video-photo',
    number: '05',
    title: 'Video Editing & Photo Creation',
    cue: 'Visual Cinematic',
    description: 'Full-service studio production delivering cinematic brand stories, high-retention vertical reels, and editorial product photography.',
    image: media.home.servicesTeaser[4].image.src,
  },
];

export function HomeServicesTeaser() {
  return (
    <section className="py-24 sm:py-32 bg-charcoal text-ivory select-none" data-theme="dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-xs font-mono tracking-widest uppercase text-gold-soft font-semibold">
                03 / CORE CAPABILITIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              Five integrated disciplines.
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-gold-soft hover:text-gold transition-colors group"
          >
            <span>View All 5 Disciplines</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-gold" />
          </Link>
        </div>

        {/* 5 Circle Services Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {SERVICE_TEASERS.map((srv) => (
            <Link
              key={srv.slug}
              href={`/services/${srv.slug}`}
              className="group flex flex-col items-center text-center p-6 rounded-[24px] bg-graphite/40 border border-white/10 hover:border-gold/50 hover:bg-graphite/70 transition-all duration-300"
            >
              {/* Circular Photo with Gold Rim */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-gold/40 group-hover:border-gold group-hover:scale-105 transition-all duration-300 shadow-soft-md bg-charcoal mb-6">
                <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
              </div>

              <div className="text-xs font-mono tracking-widest text-gold-soft uppercase mb-1">
                {srv.number} · {srv.cue}
              </div>

              <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-gold-soft transition-colors mb-2 leading-snug">
                {srv.title}
              </h3>

              <p className="text-xs font-sans text-stone leading-relaxed line-clamp-3">
                {srv.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-center gap-1 text-xs font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
