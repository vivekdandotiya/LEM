'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts, blogCategories, BlogCategory } from '@/data/posts';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';

const blogCovers: Record<string, string> = {
  'modern-organic-search-architecture': '/images/pages/P13-blog-seo-16x10.webp',
  'meta-creative-diversity-strategy': '/images/pages/P14-blog-ads-16x10.webp',
  'editorial-social-brand-equity': '/images/pages/P16-blog-social-16x10.webp',
  'engineering-performance-first-web-experiences': '/images/pages/P17-blog-video-16x10.webp',
  SEO: '/images/pages/P13-blog-seo-16x10.webp',
  Ads: '/images/pages/P14-blog-ads-16x10.webp',
  Social: '/images/pages/P16-blog-social-16x10.webp',
  Web: '/images/pages/P17-blog-video-16x10.webp',
  Email: '/images/pages/P15-blog-email-16x10.webp',
};

const shortPostData: Record<string, { title: string; excerpt: string }> = {
  'modern-organic-search-architecture': {
    title: 'Organic Search Architecture',
    excerpt: 'Topical entity authority and technical crawlers engineered for sustained commercial discovery.',
  },
  'meta-creative-diversity-strategy': {
    title: 'Creative Diversity Strategy',
    excerpt: 'Algorithmic auction scaling through structured hook variance and server-side conversion telemetry.',
  },
  'editorial-social-brand-equity': {
    title: 'Editorial Social Equity',
    excerpt: 'Brand storytelling that converts passive followers into active advocates without trend chasing.',
  },
  'engineering-performance-first-web-experiences': {
    title: 'Performance First Web',
    excerpt: 'Sub-second digital flagships engineered with Next.js for flawless conversion rates.',
  },
};

export function BlogListingView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = (searchParams.get('category') || 'All') as BlogCategory;

  const handleCategoryChange = (category: BlogCategory) => {
    if (category === 'All') {
      router.push('/blog', { scroll: false });
    } else {
      router.push(`/blog?category=${category}`, { scroll: false });
    }
  };

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') {
      return blogPosts;
    }
    return blogPosts.filter(
      (post) => post.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  const featuredPost = blogPosts[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 select-none">
      {/* 1. Featured Article Hero */}
      <section className="mb-20">
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group block rounded-[28px] overflow-hidden border border-ink/10 bg-white shadow-soft-md transition-all duration-300 hover:shadow-soft-lg hover:border-gold/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Cover */}
            <div className="lg:col-span-7 relative aspect-[16/10] min-h-[320px] sm:min-h-[420px] overflow-hidden bg-charcoal">
              <Image
                src="/images/pages/P12-blog-featured-16x9.webp"
                alt="Featured Editorial Analysis"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 750px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-ink font-semibold border border-ink/5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Featured Analysis</span>
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-ink/10 bg-white">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-stone uppercase tracking-wider mb-4">
                  <span className="text-gold-deep font-bold">{featuredPost.category}</span>
                  <span>·</span>
                  <span>{featuredPost.author}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink tracking-tight leading-tight mb-4 group-hover:text-gold-deep transition-colors">
                  {shortPostData[featuredPost.slug]?.title || featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base font-sans text-stone leading-relaxed mb-6">
                  {shortPostData[featuredPost.slug]?.excerpt || featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-ink/10 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-ink font-bold flex items-center gap-2 group-hover:text-gold-deep transition-colors">
                  <span>Read Analysis</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-ivory border border-ink/10 text-stone">
                  {featuredPost.date}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* 2. Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-ink/10">
        <span className="text-xs font-mono tracking-widest uppercase text-stone mr-2 font-semibold">
          Topic Filter:
        </span>
        {blogCategories.map((category) => {
          const isSelected = activeCategory.toLowerCase() === category.toLowerCase();

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isSelected
                  ? 'bg-ink text-ivory font-bold shadow-soft-sm'
                  : 'bg-white text-stone hover:text-ink hover:bg-ivory border border-ink/10'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 3. Three-Column Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        <AnimatePresence>
          {filteredPosts.map((post) => {
            const coverImg = blogCovers[post.slug] || '/images/pages/P13-blog-seo-16x10.webp';
            const shortInfo = shortPostData[post.slug] || {
              title: post.title.split(' ').slice(0, 4).join(' '),
              excerpt: post.excerpt.split(' ').slice(0, 16).join(' '),
            };

            return (
              <motion.div
                layout
                key={post.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="rounded-[24px] bg-white border border-ink/10 p-6 flex flex-col justify-between group h-full shadow-soft-sm hover:shadow-soft-md hover:border-gold/50 transition-all duration-300"
                >
                  <div>
                    {/* Thumbnail Frame */}
                    <div className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden mb-5 border border-ink/10 bg-charcoal">
                      <Image
                        src={coverImg}
                        alt={`${shortInfo.title} cover`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-semibold text-ink tracking-wider uppercase border border-ink/5">
                        {post.category}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-stone uppercase tracking-wider mb-2">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-ink mb-2 group-hover:text-gold-deep transition-colors">
                      {shortInfo.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm font-sans text-stone leading-relaxed">
                      {shortInfo.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-ink font-bold flex items-center gap-1 group-hover:text-gold-deep transition-colors">
                      Read Piece →
                    </span>
                    <span className="text-[10px] text-stone font-mono">{post.date}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
