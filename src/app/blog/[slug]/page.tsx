import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getPostBySlug } from "@/data/posts";
import { Button } from "@/components/ui/Button";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { ArrowLeft, Clock, User, Calendar, ArrowUpRight } from "lucide-react";
import SplitHeading from "@/motion/SplitHeading";
import ImageReveal from "@/motion/ImageReveal";
import Magnetic from "@/motion/Magnetic";
import { DripLink } from "@/components/animorio/drip/DripLink";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const blogCovers: Record<string, string> = {
  "modern-organic-search-architecture": "/images/blog/cover-seo.webp",
  "meta-creative-diversity-strategy": "/images/blog/cover-ads.webp",
  "editorial-social-brand-equity": "/images/blog/cover-social.webp",
  "engineering-performance-first-web-experiences": "/images/blog/cover-web.webp",
  SEO: "/images/blog/cover-seo.webp",
  Ads: "/images/blog/cover-ads.webp",
  Social: "/images/blog/cover-social.webp",
  Video: "/images/blog/cover-web.webp",
  Email: "/images/blog/cover-email.webp",
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
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} — Perspective`,
    description: post.excerpt,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
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
    blogCovers[post.slug] || blogCovers[post.category] || "/images/blog/cover-brand.webp";

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 2);

  return (
    <article className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-surface-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link with DripLink */}
        <DripLink
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-warmgray-500 hover:text-charcoal-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to publications</span>
        </DripLink>

        {/* Header Metadata */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-charcoal-900 text-white text-xs font-mono font-medium">
            {post.category}
          </span>
          <PlaceholderBadge label="Sample Article — noindex" />
        </div>

        <SplitHeading
          as="h1"
          className="text-display-2 font-display font-medium text-charcoal-900 tracking-tight leading-[1.08] mb-6"
        >
          {post.title}
        </SplitHeading>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-warmgray-500 pb-8 border-b border-charcoal-900/10 font-mono mb-8">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-accent" /> {post.author} ({post.authorRole})
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-warmgray-400" /> {post.date}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-warmgray-400" /> {post.readTime}
          </span>
        </div>

        {/* Featured Editorial Photo Cover */}
        <div className="w-full h-72 sm:h-96 relative rounded-card overflow-hidden shadow-soft-lg border border-charcoal-900/10 mb-12">
          <ImageReveal
            src={coverImg}
            alt={post.title}
            fill
            priority
            rounded="rounded-card"
            className="h-full w-full"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        {/* Article Editorial Canvas */}
        <div className="py-4 space-y-8 text-base sm:text-lg text-warmgray-800 leading-relaxed font-sans">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Editorial Blockquote Callout */}
          <div className="my-10 p-8 rounded-card bg-surface-muted border-l-4 border-accent text-charcoal-900 italic font-display text-xl leading-snug">
            “When organic search authority and high-retention creative testing operate under one unified architecture, client customer acquisition costs plummet permanently.”
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-medium text-charcoal-900 pt-6">
            Implementing Strategic Continuity
          </h2>

          <p className="leading-relaxed">
            The transition from disconnected ad-hoc testing to a rigorous, documented growth model requires cultural discipline across your leadership team. When every creative iteration is tested systematically against unit margins, marketing ceases to be an expense and transforms into a predictable capital deployment engine.
          </p>
        </div>

        {/* End of Article CTA Box */}
        <div className="my-16 p-8 sm:p-12 rounded-card bg-charcoal-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-accent-tint block mb-1">
              Commercial Alignment
            </span>
            <h3 className="text-2xl font-display font-medium text-white mb-2">
              Scale Your Digital Momentum
            </h3>
            <p className="text-xs sm:text-sm text-warmgray-300 max-w-md">
              Speak directly with our senior growth architects to evaluate your search visibility and creative performance.
            </p>
          </div>
          <Magnetic strength={0.3}>
            <Button href="/contact" variant="accent" size="lg" showArrow>
              Consultation
            </Button>
          </Magnetic>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-charcoal-900/10">
          <span className="text-xs font-mono tracking-widest uppercase text-warmgray-500 block mb-6">
            Adjacent Perspectives
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <DripLink
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="p-6 rounded-card bg-white border border-charcoal-900/10 shadow-soft-sm hover:shadow-soft-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent block mb-2">
                    {related.category}
                  </span>
                  <h4 className="text-lg font-display font-medium text-charcoal-900 group-hover:text-accent transition-colors leading-snug mb-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-warmgray-600 line-clamp-2">
                    {related.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-charcoal-900/5 flex items-center justify-between text-xs text-warmgray-500 font-mono">
                  <span>{related.readTime}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-900" />
                </div>
              </DripLink>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
