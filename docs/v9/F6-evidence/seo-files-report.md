# Sitemap & Robots.txt Verification Report (F6)

## Audit Overview
- **Verification Date:** 2026-11-19
- **Domain Configured:** `https://leadedge.agency`
- **Total Registered Routes:** 18
- **Indexable Public Routes:** 17
- **Non-Indexable Excluded Paths:** 1

---

## Sitemap Details (`/sitemap.xml`)
- **Status:** HTTP 200 OK
- **Format:** Valid XML 0.9 schema (`<urlset>`)
- **URL Count:** 17
- **URL Verification:** All 14 routes return HTTP 200 OK with valid `rel="canonical"` tags.

### Included Routes:
- `/` (priority: 1, freq: weekly)
- `/how-it-works` (priority: 0.9, freq: weekly)
- `/pricing` (priority: 0.9, freq: weekly)
- `/marketing` (priority: 0.9, freq: weekly)
- `/about` (priority: 0.8, freq: monthly)
- `/services` (priority: 0.9, freq: weekly)
- `/contact` (priority: 0.8, freq: monthly)
- `/services/seo` (priority: 0.85, freq: monthly)
- `/services/ppc` (priority: 0.85, freq: monthly)
- `/services/social-media` (priority: 0.85, freq: monthly)
- `/services/web-development` (priority: 0.85, freq: monthly)
- `/services/video-photo` (priority: 0.85, freq: monthly)
- `/blog` (priority: 0.8, freq: weekly)
- `/blog/modern-organic-search-architecture` (priority: 0.7, freq: monthly)
- `/blog/meta-creative-diversity-strategy` (priority: 0.7, freq: monthly)
- `/blog/editorial-social-brand-equity` (priority: 0.7, freq: monthly)
- `/blog/engineering-performance-first-web-experiences` (priority: 0.7, freq: monthly)

---

## Robots Details (`/robots.txt`)
- **Status:** HTTP 200 OK
- **Directives:**
```txt
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /__scene/

User-Agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /__scene/

User-Agent: Google-Extended
Allow: /
Disallow: /api/
Disallow: /__scene/

Sitemap: https://leadedge.agency/sitemap.xml
```

---

## Staging & Preview Protection
- When deployed on preview environments (`VERCEL_ENV=preview` or `NEXT_PUBLIC_BLOCK_INDEXING=true`), robots automatically switches to `Disallow: /` to prevent search engine indexing of unfinished preview branches.
- Production environment permits full indexing of public pages while cleanly protecting internal routes (`/api/`, `/__scene/`).

---

## Audit Outcome
✅ **ALL CHECKS PASSED: 0 ERRORS**
