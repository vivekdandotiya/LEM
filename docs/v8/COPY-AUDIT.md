# LEAD EDGE MARKETING — V8 COPY & LEAK AUDIT REPORT (T0)

**Audit Date:** November 16, 2026  
**Status:** ACTION REQUIRED ⚠️  

---

## 1. Forbidden Leak Phrases Check (Part 0 Diagnosis)

✅ **Zero critical leak phrases found!** None of the forbidden V7 developer notes ("THE WORKING BRIEF", "WHO IT IS FOR", "ZERO FLUFF", "NO OUTSOURCING", "HOVER OR TAP") appear in user-facing code.

---

## 2. Client Document Mapping Audit (/docs/CLIENT-CONTENT.md)

Verifying that all core client propositions are mapped into data files and user-facing views:

- **Hero Headlines Pair:** ❌ Missing from active view
- **4 Core Service Taglines:** ✅ Confirmed (mapped in `src/data/services.ts`)
- **7 Client FAQs:** ✅ Confirmed (mapped in `src/data/faqs.ts` and `FAQSection.tsx`)


### Missing Client Phrases:
- `WE DON'T JUST DRIVE TRAFFIC. WE BUILD`

---

## 3. Copy Governance Rules for Tasks T1–T10

1. **Only Client Copy, Approved UI Strings (`src/data/ui-strings.ts`), or Flagged Drafts** are permitted.
2. **Strict Word Budgets (Enforced by `check-copy.ts`):**
   - H1: At most 8 words.
   - H2: At most 7 words.
   - Supporting lines: At most 14 words.
   - Card text: At most 12 words.
   - Body copy: No section with more than 2 sentences of body copy visible by default.
