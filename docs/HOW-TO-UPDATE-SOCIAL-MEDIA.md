# How To Update Social Media Services Content

> **Status:** Awaiting revised copy from client (Feedback Instruction 3 / CIR-16).  
> **Source File:** `src/data/content/social-media.ts`  
> **Target Route:** `/services/social-media`

---

## Overview
The client's feedback document states:
> *"The content on the Social Media Services page needs to be updated. I will provide the revised content shortly. Please make the necessary changes once I share it."*

To ensure immediate, error-free updating when the client shares the revised document, all copy for this page has been isolated into a single typed file: `src/data/content/social-media.ts`.

**No JSX, CSS, or component files need to be edited.** Updating this single data file immediately updates the live page, structured metadata, and `/llms.txt`.

---

## Step-by-Step Update Procedure (3 Minutes)

### 1. Open the Content File
Open:
```
src/data/content/social-media.ts
```

### 2. Paste the Client's Revised Content
Replace the fields in `socialMediaContent`:

```typescript
export const socialMediaContent: SocialMediaContent = {
  status: {
    awaitingClientContent: false, // <-- Change this from true to false
    sourceDocument: 'Revised Social Media Content Document (Received [Date])',
    note: 'Client-approved copy applied.',
    lastUpdated: 'YYYY-MM-DD',
  },

  meta: {
    title: 'Social Media Marketing — Lead Edge Marketing',
    description: '[Insert meta description from client]',
  },

  hero: {
    badge: '03 // SOCIAL MEDIA SERVICES',
    headline: '[Insert client headline]',
    tagline: '[Insert client tagline]',
    shortDescription: '[Insert client short description]',
    fullDescription: '[Insert client full description]',
  },

  // Update deliverables (chips below hero)
  deliverables: [
    'Deliverable 1',
    'Deliverable 2',
    'Deliverable 3',
    'Deliverable 4',
    'Deliverable 5',
  ],

  // Update feature cards
  features: [
    {
      title: 'Feature Title 1',
      description: 'Feature description text...',
    },
    // ...
  ],

  // Update process roadmap phases
  processSteps: [
    {
      number: '01',
      title: 'Phase Title 1',
      description: 'Phase description text...',
    },
    // ...
  ],
};
```

### 3. Update FAQs (If Provided)
If the client also provides revised FAQs for Social Media:
1. Open `src/data/content/faqs-social-media.ts`.
2. Add or update the FAQ items following the `ServiceFAQItem` schema.
3. See `docs/HOW-TO-ADD-FAQS.md` for FAQ details.

### 4. Verify and Test
Run the automated verification suite from your terminal:
```bash
npm run check
npm run build
```
Verify the live page at `http://localhost:3000/services/social-media`.
