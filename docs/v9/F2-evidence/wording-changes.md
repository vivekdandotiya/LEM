# Plain-Language Pass (Task F2) — Wording Changes Log

**Execution Date:** 2026-11-19  
**Specification:** Lead Edge Marketing V9 Protocol — Task F2  
**Standard:** Elimination of agency jargon and AI-generated buzzwords (`philosophy`, `manifesto`, `discipline`, `conviction`, `rigorous`, `bespoke`, `dynamic`, `elevate`, `highest-leverage`, `seamless`, etc.). Replacement with quiet, confident, plain spoken English. Client copy preserved verbatim.

---

## Detailed Table of Changes

| File | Line | Flagged Word | Old Text | New Text | Reason |
|---|---|---|---|---|---|
| `src/app/about/page.tsx` | L11 | `discipline`, `conviction` | `title: 'About Us — Discipline & Conviction'` | `title: 'About Us — Lead Edge Marketing'` | Removed buzzwords from metadata title |
| `src/app/about/page.tsx` | L30 | `manifesto` | `<span>STUDIO MANIFESTO</span>` | `<span>WHO WE ARE</span>` | Replaced agency buzzword with plain descriptive tag |
| `src/app/about/page.tsx` | L34-35 | `rigorous`, `conviction` | `Built on rigorous engineering and conviction.` | `Built on solid engineering and focus.` | Addressed client feedback screenshot; removed heavy AI wording |
| `src/app/about/page.tsx` | L39 | `momentum` | `We engineer full-funnel digital momentum where search, creative, and code unite.` | `We build digital growth where search, creative media, and code work together.` | Replaced abstract jargon with plain English |
| `src/app/about/page.tsx` | L46 | `philosophy` | `Explore Our Philosophy ↓` | `Our story ↓` | Explicit client feedback requirement ("Looks Ai wording") |
| `src/app/about/page.tsx` | L60 | `philosophy` | `01 / PHILOSOPHY` | `01 / OUR APPROACH` | Replaced buzzword with clear section identifier |
| `src/app/about/page.tsx` | L81 | `discipline` | `5 Disciplines` | `5 Services` | Plain language for agency services |
| `src/app/about/page.tsx` | L109 | `method` | `Studio Working Method` | `How We Work` | 1-3 words descriptive tag |
| `src/app/about/page.tsx` | L143 | `call` | `Book Strategy Call` | `Book a call` | Verb-led, 1-3 words button |
| `src/components/about/AboutTeamCards.tsx` | L18 | `thesis` | `Thesis & Architecture` | `Research & Strategy` | Plain language |
| `src/components/about/AboutTeamCards.tsx` | L31 | `discipline` | `Cross-Discipline Alignment` | `Connected Team Execution` | Removed service buzzword |
| `src/components/about/AboutTeamCards.tsx` | L39 | `bespoke` | `bespoke engineering replace generic agency stock.` | `custom engineering replace generic stock assets.` | Plain English replacement |
| `src/components/about/AboutTeamCards.tsx` | L55 | `team` | `HOW OUR TEAM WORKS` | `HOW WE WORK` | 1-3 words descriptive tag |
| `src/components/about/AboutTeamCards.tsx` | L59 | `discipline` | `Four operating disciplines.` | `Four working stages.` | Plain language |
| `src/components/about/AboutTeamCards.tsx` | L63 | `rigor` | `workflow unites strategic rigor, data modeling...` | `workflow unites clear strategy, data modeling...` | Removed agency jargon |
| `src/components/about/AboutTeamCards.tsx` | L105 | `discipline` | `DISCIPLINE 0{idx + 1}` | `STAGE 0{idx + 1}` | Clean numbering label |
| `src/app/layout.tsx` | L26 | `bespoke` | `"Bespoke Web Development"` | `"Custom Web Development"` | Plain keyword |
| `src/app/services/page.tsx` | L49 | `dynamic` | `imageAlt: 'Dynamic performance paid media creative'` | `imageAlt: 'Targeted paid media creative'` | Precise descriptive alt text |
| `src/app/services/page.tsx` | L76 | `bespoke` | `'Bespoke, high-performance web applications...'` | `'Custom, high-performance web applications...'` | Replaced overused buzzword |
| `src/app/services/page.tsx` | L79 | `bespoke` | `'Bespoke Next.js Architecture'` | `'Custom Next.js Architecture'` | Clean deliverable tag |
| `src/app/services/page.tsx` | L128 | `discipline` | `Five integrated disciplines.` | `Five core services.` | Plain English |
| `src/app/services/page.tsx` | L135 | `bespoke` | `bespoke web engineering` | `custom web development` | Clear service term |
| `src/app/services/page.tsx` | L143 | `discipline` | `Explore Disciplines ↓` | `View services ↓` | Verb-led plain button |
| `src/app/services/page.tsx` | L188 | `discipline` | `discipline leads` | `team` | Plain conversational English |
| `src/components/home/HomeServicesCards.tsx` | L58 | `elevate` | `elevate brand authority.` | `build brand trust.` | Removed marketing cliché |
| `src/components/home/HomeServicesTeaser.tsx` | L38 | `rigor` | `cue: 'Architectural Rigor'` | `cue: 'Clean Code'` | Plain, quiet description |
| `src/components/home/HomeServicesTeaser.tsx` | L39 | `bespoke` | `Bespoke, high-performance web applications` | `Custom, high-performance web applications` | Plain English |
| `src/components/home/StatsSection.tsx` | L14 | `bespoke` | `label: 'Bespoke code'` | `label: 'Custom code'` | Honest, clear terminology |
| `src/components/home/StatsSection.tsx` | L26 | `discipline` | `label: 'Unified disciplines'` | `label: 'Integrated services'` | Plain English |
| `src/components/contact/ContactForm.tsx` | L262 | `discipline` | `Discipline & Budget` | `Service & Budget` | Natural form section title |
| `src/components/contact/ContactForm.tsx` | L269 | `discipline` | `Primary Discipline` | `Primary Service` | Natural form field label |
| `src/components/services/ServicePageTemplate.tsx` | L152 | `dynamic` | `dynamic budget allocation` | `flexible budget allocation` | Removed marketing buzzword |
| `src/components/services/ServicePageTemplate.tsx` | L174 | `dynamic` | `High-Retention Dynamic Video Ad` | `High-Retention Vertical Video Ad` | Clear technical format |
| `src/components/services/ServicePageTemplate.tsx` | L226 | `dynamic` | `dynamic pacing` | `engaging pacing` | Plain adjective |
| `src/components/services/ServicePageTemplate.tsx` | L290 | `bespoke` | `Bespoke Next.js web applications` | `Custom Next.js web applications` | Plain description |
| `src/components/services/ServicePageTemplate.tsx` | L374 | `elevate` | `elevate brand authority` | `build brand trust` | Plain language |
| `src/components/services/ServicePageTemplate.tsx` | L479 | `discipline` | `Discipline · {service.number}` | `Service · {service.number}` | Clean service eyebrow |
| `src/components/services/ServiceCardInteractive.tsx` | L56 | `discipline` | `0{index + 1} / Discipline` | `0{index + 1} / Service` | Clear label |
| `src/components/services/ServiceCardInteractive.tsx` | L100 | `bespoke` | `Bespoke Strategy & Execution` | `Custom Strategy & Execution` | Plain description |
| `src/components/shared/CircleServiceRow.tsx` | L144 | `discipline` | `0{index} / CORE DISCIPLINE` | `0{index} / CORE SERVICE` | Plain service label |
| `src/components/shared/CylinderGallery.tsx` | L176 | `discipline` | `Explore discipline` | `View service` | Verb-led link |
| `src/components/hero/HeroVisualCards.tsx` | L31 | `bespoke` | `Bespoke luxury web experience` | `Custom modern web experience` | Natural alt text |
| `src/components/process/scenes/SocialScene.tsx` | L97 | `conviction` | `Behind-the-scenes standards & conviction` | `Behind-the-scenes standards & craft` | Natural descriptor |
| `src/components/process/scenes/WebScene.tsx` | L25 | `bespoke` | `WEB ENGINE // BESPOKE NEXT.JS 15` | `WEB ENGINE // CUSTOM NEXT.JS 15` | Natural descriptor |
| `src/data/processes.ts` | L107 | `dynamic` | `Dynamic Budget Scaling` | `Active Budget Scaling` | Professional media term |
| `src/data/processes.ts` | L190 | `bespoke` | `Bespoke short-form reels` | `Custom short-form reels` | Plain English |
| `src/data/processes.ts` | L235 | `tailored` | `Clean code tailored for sub-second loads.` | `Clean code built for sub-second loads.` | Plain spoken English |
| `src/data/processes.ts` | L244-245 | `rigorous` | `Rigorous pre-flight quality assurance.` | `Thorough pre-flight quality checks.` | Plain spoken English |
| `src/data/servicePackages.ts` | L31 | `leverage` | `highest-leverage channels` | `two primary channels` | Removed leverage buzzword |
| `src/data/servicePackages.ts` | L162 | `next-gen` | `WebP Next-Gen Format Setup` | `WebP / AVIF Format Setup` | Exact technical formats |
| `src/data/servicePackages.ts` | L203 | `dynamic` | `Dynamic Rendering Audits` | `Client-Side Rendering Audits` | Technical accuracy |
| `src/data/servicePackages.ts` | L217 | `dynamic` | `Dynamic User Intent Internal Link Routing` | `Intent-Based Internal Link Routing` | Plain descriptive term |
| `src/data/servicePackages.ts` | L274 | `dynamic` | `Dynamic Product Feed Integration` | `Automated Product Feed Integration` | Plain descriptive term |
| `src/data/servicePackages.ts` | L339 | `dynamic` | `Dynamic Creative Optimization` | `Multi-Variant Creative Testing` | Plain descriptive term |
| `src/data/servicePackages.ts` | L393 | `dynamic` | `Dynamic Metadata` | `Metadata` | Concise term |
| `src/data/servicePackages.ts` | L417 | `dynamic` | `dynamic inventory sync` | `real-time inventory sync` | Standard technical term |
| `src/data/servicePackages.ts` | L470 | `elevate` | `elevate brand authority` | `build brand authority` | Plain English |
| `src/data/servicePackages.ts` | L483 | `dynamic` | `Dynamic Captions, Typography...` | `Engaging Captions, Typography...` | Plain English |
| `src/data/servicePackages.ts` | L560 | `bespoke` | `Bespoke SFX Mixing` | `Custom SFX Mixing` | Plain English |
| `src/data/services.ts` | L122 | `bespoke` | `bespoke visual assets` | `custom visual assets` | Plain English |
| `src/data/services.ts` | L158 | `dynamic` | `Dynamic Efficiency Scaling` | `Active Efficiency Scaling` | Plain English |
| `src/data/services.ts` | L257 | `tailored` | `tailored to whether your primary target audience` | `focused on whether your primary target audience` | Plain English |
| `src/data/services.ts` | L285 | `bespoke` | `Bespoke Next.js Engine` | `Custom Next.js Engine` | Plain English |
| `src/data/services.ts` | L330 | `rigorous` | `Rigorous QA, Audit & Launch` | `Thorough QA, Audit & Launch` | Plain English |
| `src/data/services.ts` | L359 | `elevate` | `crafted to elevate brand authority.` | `crafted to build brand trust.` | Plain English |
| `src/data/services.ts` | L363 | `dynamic` | `From dynamic short-form reels...` | `From engaging short-form video...` | Plain English |
| `src/data/services.ts` | L375 | `tailored` | `sound design tailored to create` | `sound design crafted to create` | Plain English |
| `src/data/services.ts` | L397 | `seamless` | `seamless edits` | `polished, engaging edits` | Plain English |
| `src/data/posts.ts` | L33 | `rigorous` | `rigorous server-side rendering` | `clean server-side rendering` | Plain English |
| `src/data/posts.ts` | L49 | `dynamic` | `dynamically distribute ad spend` | `efficiently distribute ad spend` | Plain English |
| `src/data/posts.ts` | L69 | `elevate` | `directly elevates buyer perception` | `directly strengthens buyer perception` | Plain English |
| `src/data/posts.ts` | L75 | `leverage` | `Highest-Leverage CRO Tool` | `Most Effective CRO Tool` | Plain English |
| `src/data/posts.ts` | L87 | `philosophy` | `architectural philosophy` | `core engineering standard` | Plain English |
| `src/data/posts.ts` | L88 | `seamless` | `loads seamlessly` | `loads smoothly and quickly` | Plain English |
