# System Architecture: Lead Edge Marketing

## 1. Directory Structure

```
/src
  /app
    layout.tsx                  Root layout with font configuration, global navbar and footer
    page.tsx                    Homepage
    about/page.tsx              About page with interactive 3D Smartphone feature
    services/page.tsx           Services overview with interactive cards and push-in transition
    services/[slug]/page.tsx    Dynamic reusable service template (SEO, Meta Ads, Social Media, Web Development)
    blog/page.tsx               Editorial blog listing with client-side & URL-synced category filtering
    blog/[slug]/page.tsx        Reusable article view with related posts and CTA
    contact/page.tsx            Contact page with glass form shell and validation
    api/contact/route.ts        Server-side validation, rate limiting & provider adapter
    not-found.tsx               Custom 404 page styled in brand aesthetics
    robots.ts                   Robots.txt generator
    sitemap.ts                  Dynamic sitemap.xml generator
  /components
    /layout                     Navbar, MobileMenu, Footer, SectionWrapper, Container
    /ui                         Button, Card, Badge, Accordion, Input, Select, Textarea, PlaceholderBadge
    /hero                       HomeHero, HeroVisualStack, ServicesHero, AboutHero, ContactHero
    /home                       TrustBar, ServicesPreview, SelectedWork, ProcessSteps, Stats, FAQ, FinalCTA
    /services                   ServiceCard, ServiceFeatures, HowWeWorkStepTimeline
    /blog                       BlogCard, FeaturedPost, CategoryFilter
    /contact                    ContactForm, GlassFormShell
    /three                      PhoneCanvas (dynamic import), PhoneFallback
    /motion                     FadeIn, StaggerContainer, PageTransition
  /data
    site.ts                     Global brand settings & config flags (showPlaceholders, etc.)
    services.ts                 Full data for 4 confirmed services + 2 placeholder slots behind config flag
    projects.ts                 Selected work portfolio items
    faqs.ts                     Honest FAQ items for homepage and service pages
    stats.ts                    Statistic data model with `verified: boolean` flag
    posts.ts                    Blog editorial posts schema and data
    nav.ts                      Strict 5-link primary navigation data
  /lib
    utils.ts                    cn (clsx + twMerge), formatting helpers
    contact-schema.ts           Shared Zod validation schema
    email-adapter.ts            Swappable email service adapter (mock/Resend/Sendgrid)
  /styles
    tokens.css                  Design system CSS variables
    globals.css                 Tailwind base and accessibility resets
/docs                           All audit, design, motion, and testing records
/public
  /logo                         Original and derivative logo marks
  /images                       High-resolution curated visual assets
  /video                        Custom social media screen video loop
```

## 2. Route Manifest
1. `/` - Homepage
2. `/about` - About (storytelling & 3D device showcase)
3. `/services` - Services Hub
4. `/services/seo` - Search Engine Optimization
5. `/services/meta-ads` - Meta Advertising & Paid Social
6. `/services/social-media` - Social Media Strategy & Creative
7. `/services/web-development` - Web Engineering & UI/UX
8. `/blog` - Publication listing with real-time filters
9. `/blog/[slug]` - Reusable article detail view
10. `/contact` - Contact & consultation enquiry
11. `/api/contact` - Secure contact submission endpoint

## 3. SEO & Rendering Strategy
- Next.js App Router Static Site Generation (SSG) for static routes (`/`, `/about`, `/services`, `/blog`, `/services/*`).
- Metadata API dynamically injects page titles, descriptions, canonical URLs, and Open Graph tags.
- Schema.org JSON-LD structured data for `Organization`, `WebSite`, and `Service`.
