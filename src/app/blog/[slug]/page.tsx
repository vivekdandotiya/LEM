import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, getPostBySlug } from '@/data/posts';
import { ArrowLeft, Clock, User, Calendar, ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} — Perspective`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverImg =
    blogCovers[post.slug] || blogCovers[post.category] || '/images/pages/P12-blog-featured-16x9.webp';

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 2);

  return (
    <main className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[#F6F3EC] text-ink select-none min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone hover:text-ink mb-8 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to publications</span>
        </Link>

        {/* Category Pill */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-ink/10 text-xs font-mono font-semibold text-ink shadow-2xs">
            {post.category}
          </span>
          <span className="text-xs font-mono text-stone">Perspective</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-[1.04] mb-6">
          {post.title}
        </h1>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone pb-8 border-b border-ink/10 font-mono mb-10">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-gold-deep" /> {post.author} ({post.authorRole})
          </span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-stone" /> {post.date}
          </span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone" /> {post.readTime}
          </span>
        </div>

        {/* Featured Editorial Photo Cover */}
        <div className="w-full aspect-[16/9] relative rounded-[28px] overflow-hidden shadow-soft-lg border border-ink/10 bg-charcoal mb-12">
          <Image
            src={coverImg}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Article Editorial Canvas */}
        <div className="py-4 space-y-8 text-base sm:text-lg text-ink/90 leading-relaxed font-sans">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Editorial Blockquote Callout */}
          <div className="my-10 p-8 sm:p-10 rounded-[24px] bg-[#EFEBE2] border-l-4 border-gold text-ink italic font-display text-xl sm:text-2xl leading-snug shadow-2xs">
            “When organic search authority and high-retention creative testing operate under one unified architecture, client customer acquisition costs compound permanently.”
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink pt-6">
            Implementing Strategic Continuity
          </h2>

          <p className="leading-relaxed">
            The transition from disconnected ad-hoc testing to a rigorous, documented growth model requires cultural discipline across your leadership team. When every creative iteration is tested systematically against unit margins, marketing ceases to be an expense and transforms into a predictable capital deployment engine.
          </p>
        </div>

        {/* End of Article CTA Box */}
        <div className="my-16 p-8 sm:p-12 rounded-[28px] bg-charcoal text-ivory flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 shadow-soft-lg">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-gold block mb-2 font-semibold">
              Commercial Alignment
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-ivory mb-2">
              Scale Your Digital Momentum
            </h3>
            <p className="text-sm text-stone max-w-md leading-relaxed">
              Speak directly with our senior growth architects to evaluate your search visibility and creative performance.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-charcoal font-display font-extrabold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-gold-soft hover:shadow-gold shrink-0 active:scale-95"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-ink/10">
          <span className="text-xs font-mono tracking-widest uppercase text-stone block mb-6 font-semibold">
            Adjacent Perspectives
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="p-6 rounded-[22px] bg-white border border-ink/10 shadow-soft-sm hover:shadow-soft-md hover:border-gold/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold-deep block mb-2 font-semibold">
                    {related.category}
                  </span>
                  <h4 className="text-lg font-display font-bold text-ink group-hover:text-gold-deep transition-colors leading-snug mb-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-stone line-clamp-2 leading-relaxed">
                    {related.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between text-xs text-stone font-mono">
                  <span>{related.readTime}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
