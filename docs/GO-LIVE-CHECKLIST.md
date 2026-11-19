# Go-Live & SEO Deployment Checklist

This document provides step-by-step instructions for launching Lead Edge Marketing to production.

---

## 1. Environment Variables Configuration

In Vercel Project Settings > Environment Variables:

| Variable | Recommended Production Value | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://leadedge.agency` | The primary canonical domain for sitemaps, canonical tags, and OpenGraph metadata. |
| `VERCEL_ENV` | Automatically set by Vercel (`production`) | Controls robots indexing policy. |
| `NEXT_PUBLIC_BLOCK_INDEXING` | Leave unset or `false` on production | Set to `true` on staging/preview branches to prevent crawlers. |
| `NEXT_PUBLIC_SHOW_SAMPLES` | `false` on production (or unset) | Omit unverified sample drafts from public view. Set to `true` only for review demos. |

---

## 2. DNS & Domain Configuration
1. Ensure `leadedge.agency` points to Vercel DNS (`76.76.21.21` or `cname.vercel-dns.com`).
2. Verify SSL certificate auto-provisions and HTTPS redirect is active.
3. Configure `www.leadedge.agency` redirecting to root apex `https://leadedge.agency` (or vice-versa, matching `siteConfig.url`).

---

## 3. Robots & Crawl Behavior Verification
1. Access `https://leadedge.agency/robots.txt` in a browser.
2. Confirm output contains:
   ```txt
   User-Agent: *
   Allow: /
   Disallow: /api/
   Disallow: /__scene/

   Sitemap: https://leadedge.agency/sitemap.xml
   ```
3. Verify preview deployments (`*.vercel.app`) return:
   ```txt
   User-Agent: *
   Disallow: /
   ```

---

## 4. Sitemap & Search Console Submission
1. Access `https://leadedge.agency/sitemap.xml` and verify all 14 indexable routes return 200 OK.
2. Log in to [Google Search Console](https://search.google.com/search-console).
3. Add domain property `leadedge.agency`.
4. Navigate to **Sitemaps** > **Add a new sitemap** > Enter `sitemap.xml` > Submit.
5. Verify status changes to **Success**.
6. Repeat submission in [Bing Webmaster Tools](https://www.bing.com/webmasters).

---

## 5. Post-Launch Verification Checks
- [ ] Run automated gate: `npm run check:seo`
- [ ] Verify `curl -I https://leadedge.agency/` returns `HTTP/2 200`
- [ ] Check `<link rel="canonical" href="https://leadedge.agency/...">` on homepage, about, services, and blog articles.
- [ ] Inspect OpenGraph tags via [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator).
