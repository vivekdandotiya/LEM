/**
 * Lead Edge Marketers — Centralized UI Strings
 * Single source of truth for generic buttons, section eyebrows, tags, badges, and aria labels.
 * Client copy remains verbatim in client content files.
 */

export const UI_STRINGS = {
  buttons: {
    bookCall: 'Book a call',
    ourStory: 'Our story ↓',
    seeOurWork: 'See our work',
    viewPricing: 'View pricing',
    readGuide: 'Read guide',
    sendMessage: 'Send message',
    getStarted: 'Get started',
    next: 'Next',
    previous: 'Previous',
    showMore: 'Show more questions',
    showLess: 'Show fewer questions',
    copyLink: 'Copy question link',
  },
  tags: {
    whoWeAre: 'Who we are',
    ourApproach: 'Our approach',
    howWeWork: 'How we work',
    caseStudies: 'Case studies',
    selectedWork: 'Selected work',
    questions: 'Questions',
    faq: 'FAQ',
    clientFeedback: 'Client feedback',
    clientPerspective: 'Client feedback',
    nextSteps: 'Next steps',
    contact: 'Contact',
    insights: 'Articles & Guides',
    studioLocations: 'Studio hours',
  },
  badges: {
    verifiedClient: 'Verified Client',
    activeService: 'Active',
    sample: 'SAMPLE',
    sampleDrafts: 'SAMPLE FEEDBACK DRAFTS',
  },
  aria: {
    openMenu: 'Open main navigation menu',
    closeMenu: 'Close main navigation menu',
    prevSlide: 'Previous slide',
    nextSlide: 'Next slide',
    toggleFaq: 'Toggle FAQ answer',
    copied: 'Link copied to clipboard',
  },
} as const;

// Backward-compatible exports for tooling
export const approvedUiStrings = UI_STRINGS;

export const FORBIDDEN_WORDS = [
  'philosophy',
  'manifesto',
  'discipline',
  'conviction',
  'rigorous',
  'synergy',
  'paradigm',
  'leverage',
  'supercharge',
  'unlock',
  'elevate',
  'holistic',
  'bespoke',
  'ecosystem',
  'seamless',
  'cutting-edge',
  'game-changer',
  'revolutionize',
  'unleash',
  'empower',
  'tailored',
  'unrivaled',
  'world-class',
  'state-of-the-art',
  'next-gen',
  'dynamic',
] as const;

