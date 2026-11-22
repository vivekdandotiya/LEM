'use client';

import React, { useState, useEffect } from 'react';
import { contactFormSchema, ContactFormData } from '@/lib/contact-schema';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Target,
  Zap,
  Share2,
  Video,
  Layers,
  Clock,
  Send,
  Calendar,
} from 'lucide-react';

export type ConsultationIntent = 'blueprint' | 'retainer' | 'rescue';

interface ServiceOption {
  id: 'seo' | 'ppc' | 'meta-ads' | 'social-media' | 'web-development' | 'other';
  label: string;
  icon: string;
  shortDesc: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'seo',
    label: 'Search & Technical SEO',
    icon: '🔍',
    shortDesc: 'Topical ontologies, AI search & local 3-pack rank',
  },
  {
    id: 'meta-ads',
    label: 'Meta & Instagram Paid Ads',
    icon: '🎯',
    shortDesc: '10+ weekly vertical hook tests & CAPI scaling',
  },
  {
    id: 'ppc',
    label: 'Google Ads & Intent Bidding',
    icon: '📊',
    shortDesc: 'STAG structures & negative keyword harvesting',
  },
  {
    id: 'web-development',
    label: 'Next.js 15 Web Architecture',
    icon: '⚡',
    shortDesc: '0.4s mobile load speeds & friction-free funnels',
  },
  {
    id: 'social-media',
    label: 'Social Reels & Content Studio',
    icon: '📱',
    shortDesc: 'High-retention 9:16 vertical storytelling',
  },
  {
    id: 'other',
    label: 'Full-Funnel Growth Retainer',
    icon: '🌲',
    shortDesc: 'Interconnected cross-channel execution tree',
  },
];

interface BudgetOption {
  id: 'under-5k' | '5k-10k' | '10k-25k' | '25k-plus' | 'undecided';
  label: string;
  detail: string;
}

const BUDGET_OPTIONS: BudgetOption[] = [
  { id: 'under-5k', label: '< $5k AUD / mo', detail: 'Local Dominance' },
  { id: '5k-10k', label: '$5k – $10k AUD', detail: 'Multi-Channel Scale' },
  { id: '10k-25k', label: '$10k – $25k AUD', detail: 'Full-Funnel Monopoly' },
  { id: '25k-plus', label: '$25k+ AUD / mo', detail: 'Enterprise National' },
  { id: 'undecided', label: 'Blueprint First', detail: 'Open to Strategy Scope' },
];

export function ContactForm() {
  const [intent, setIntent] = useState<ConsultationIntent>('blueprint');
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    companyOrWebsite: '',
    serviceRequired: 'seo',
    budgetRange: 'undecided',
    projectDetails: '',
    honeypot: '',
    formRenderTime: 0,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [isDevSimulation, setIsDevSimulation] = useState<boolean>(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, formRenderTime: Date.now() }));
  }, []);

  // Update details placeholder or initial value based on intent
  const handleIntentChange = (newIntent: ConsultationIntent) => {
    setIntent(newIntent);
    if (newIntent === 'blueprint') {
      setFormData((prev) => ({
        ...prev,
        budgetRange: 'undecided',
        projectDetails: prev.projectDetails || 'Please prepare a complimentary full-funnel audit for our website and current digital advertising.',
      }));
    } else if (newIntent === 'rescue') {
      setFormData((prev) => ({
        ...prev,
        projectDetails: prev.projectDetails || 'Our current ad acquisition costs have increased and we need an urgent diagnostic of tracking, ad fatigue, and conversion bottlenecks.',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        budgetRange: '5k-10k',
        projectDetails: prev.projectDetails || 'We are looking for an integrated full-funnel digital marketing retainer covering search, paid social, and web architecture.',
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectService = (serviceId: ServiceOption['id']) => {
    setFormData((prev) => ({ ...prev, serviceRequired: serviceId }));
    if (fieldErrors.serviceRequired) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.serviceRequired;
        return next;
      });
    }
  };

  const handleSelectBudget = (budgetId: BudgetOption['id']) => {
    setFormData((prev) => ({ ...prev, budgetRange: budgetId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setStatus('loading');

    const clientValidation = contactFormSchema.safeParse(formData);
    if (!clientValidation.success) {
      const errors: Record<string, string> = {};
      clientValidation.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFieldErrors(errors);
      setStatus('idle');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus('error');
        setServerMessage(
          result.error || 'Unable to send inquiry. Please try again or email us directly at hello@leadedge.agency.'
        );
        return;
      }

      setStatus('success');
      setServerMessage(result.message || 'Consultation brief successfully received. A senior growth partner will review your data within 24 business hours.');
      setIsDevSimulation(Boolean(result.isDevSimulation));
    } catch {
      setStatus('error');
      setServerMessage('Network connectivity failure. Please check your connection or email hello@leadedge.agency directly.');
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-[32px] bg-white border border-[#e8e6e2] shadow-xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* =====================================================================
            SUCCESS SCREEN
            ===================================================================== */}
        {status === 'success' ? (
          <div className="py-12 text-center flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#1f7a37]/15 text-[#1f7a37] flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309] bg-[#f7ac4f]/15 px-3 py-1 rounded-full">
              Consultation Scheduled
            </span>

            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#161514]">
              Brief Confirmed & In Review
            </h3>

            <p className="text-sm font-sans text-[#5d5a55] max-w-lg leading-relaxed">
              {serverMessage}
            </p>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] text-xs font-sans text-[#161514] max-w-md text-left space-y-2 mt-4">
              <div className="flex items-center justify-between font-mono pb-2 border-b border-[#e8e6e2]">
                <span className="text-[#787570]">Assigned Partner:</span>
                <span className="font-bold text-[#161514]">Senior Growth Director</span>
              </div>
              <div className="flex items-center justify-between font-mono pb-2 border-b border-[#e8e6e2]">
                <span className="text-[#787570]">Evaluation SLA:</span>
                <span className="font-bold text-[#1f7a37]">Within 24 Business Hours</span>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-[#787570]">Deliverable:</span>
                <span className="font-bold text-[#b45309]">Custom Revenue Roadmap</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setFormData({
                  fullName: '',
                  email: '',
                  companyOrWebsite: '',
                  serviceRequired: 'seo',
                  budgetRange: 'undecided',
                  projectDetails: '',
                  honeypot: '',
                  formRenderTime: Date.now(),
                });
              }}
              className="mt-6 px-8 py-3.5 rounded-full bg-[#161514] text-white text-xs font-sans font-bold hover:bg-black transition-transform active:scale-95 shadow-md"
            >
              Submit Another Brief
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            
            {/* Header with bdog badge */}
            <div className="border-b border-[#e8e6e2] pb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b45309] bg-[#f7ac4f]/15 px-3 py-1 rounded-full">
                  Executive Consultation Brief
                </span>
                <span className="text-xs font-mono text-[#787570]">
                  SLA: 24h Review
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#161514] tracking-tight">
                Tell us about your business goals.
              </h2>
            </div>

            {/* Consultation Intent Mode Switcher */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider block mb-2.5">
                1. Select Consultation Focus
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleIntentChange('blueprint')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    intent === 'blueprint'
                      ? 'bg-[#161514] text-white border-[#161514] shadow-md'
                      : 'bg-[#FAF8F5] text-[#5d5a55] border-[#e8e6e2] hover:border-[#161514]/30'
                  }`}
                >
                  <span className="text-xs font-display font-bold block mb-0.5">
                    🚀 Free Blueprint Audit
                  </span>
                  <span className="text-[10px] font-sans opacity-80 block leading-tight">
                    Search, ads & web diagnosis
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleIntentChange('retainer')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    intent === 'retainer'
                      ? 'bg-[#161514] text-white border-[#161514] shadow-md'
                      : 'bg-[#FAF8F5] text-[#5d5a55] border-[#e8e6e2] hover:border-[#161514]/30'
                  }`}
                >
                  <span className="text-xs font-display font-bold block mb-0.5">
                    💼 Growth Retainer
                  </span>
                  <span className="text-[10px] font-sans opacity-80 block leading-tight">
                    Multi-channel execution tree
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleIntentChange('rescue')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    intent === 'rescue'
                      ? 'bg-[#161514] text-white border-[#161514] shadow-md'
                      : 'bg-[#FAF8F5] text-[#5d5a55] border-[#e8e6e2] hover:border-[#161514]/30'
                  }`}
                >
                  <span className="text-xs font-display font-bold block mb-0.5">
                    ⚡ Campaign Rescue
                  </span>
                  <span className="text-[10px] font-sans opacity-80 block leading-tight">
                    Fix CPA spikes & tracking
                  </span>
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {status === 'error' && (
              <div
                role="alert"
                className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold block mb-0.5">Submission Notice:</span>
                  <span>{serverMessage}</span>
                </div>
              </div>
            )}

            {/* Hidden honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="form-hp">Leave this empty</label>
              <input
                id="form-hp"
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleChange}
              />
            </div>

            {/* Contact Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fullName"
                  className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider flex items-center justify-between"
                >
                  <span>Full Name</span>
                  <span className="text-[11px] font-sans text-red-600">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Julian Vance"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-2xl bg-[#FAF8F5] border text-sm text-[#161514] placeholder-[#787570] focus:outline-none focus:ring-2 focus:ring-[#f7ac4f] transition-all ${
                    fieldErrors.fullName ? 'border-red-500' : 'border-[#e8e6e2]'
                  }`}
                />
                {fieldErrors.fullName && (
                  <span className="text-xs text-red-600 font-mono mt-0.5">
                    {fieldErrors.fullName}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider flex items-center justify-between"
                >
                  <span>Business Email</span>
                  <span className="text-[11px] font-sans text-red-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com.au"
                  value={formData.email}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-2xl bg-[#FAF8F5] border text-sm text-[#161514] placeholder-[#787570] focus:outline-none focus:ring-2 focus:ring-[#f7ac4f] transition-all ${
                    fieldErrors.email ? 'border-red-500' : 'border-[#e8e6e2]'
                  }`}
                />
                {fieldErrors.email && (
                  <span className="text-xs text-red-600 font-mono mt-0.5">
                    {fieldErrors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Company / Website Domain Input */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="companyOrWebsite"
                className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider flex items-center justify-between"
              >
                <span>Company or Website Address</span>
                <span className="text-xs font-sans text-[#787570] font-normal">
                  (Recommended for immediate audit)
                </span>
              </label>
              <input
                id="companyOrWebsite"
                name="companyOrWebsite"
                type="text"
                autoComplete="url"
                placeholder="e.g. yourbusiness.com.au"
                value={formData.companyOrWebsite}
                onChange={handleChange}
                className="px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#e8e6e2] text-sm text-[#161514] placeholder-[#787570] focus:outline-none focus:ring-2 focus:ring-[#f7ac4f] transition-all"
              />
            </div>

            {/* Interactive Service Visual Pill Selector */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider block mb-2.5">
                2. Primary Service Discipline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SERVICE_OPTIONS.map((svc) => {
                  const isSelected = formData.serviceRequired === svc.id;

                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => handleSelectService(svc.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-white border-[#f7ac4f] ring-2 ring-[#f7ac4f]/30 shadow-md'
                          : 'bg-[#FAF8F5] border-[#e8e6e2] text-[#5d5a55] hover:border-[#161514]/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{svc.icon}</span>
                        <span className="text-xs font-display font-extrabold text-[#161514] leading-tight">
                          {svc.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-sans text-[#787570] block leading-tight line-clamp-1">
                        {svc.shortDesc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Australian Budget Tier Selector (AUD) */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider block mb-2.5">
                3. Anticipated Monthly Investment (AUD)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BUDGET_OPTIONS.map((b) => {
                  const isSelected = formData.budgetRange === b.id;

                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handleSelectBudget(b.id)}
                      className={`p-2.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#161514] text-white border-[#161514] shadow-sm'
                          : 'bg-[#FAF8F5] border-[#e8e6e2] text-[#5d5a55] hover:border-[#161514]/30'
                      }`}
                    >
                      <span
                        className={`text-xs font-mono font-bold block ${
                          isSelected ? 'text-[#f7ac4f]' : 'text-[#161514]'
                        }`}
                      >
                        {b.label}
                      </span>
                      <span
                        className={`text-[10px] font-sans block ${
                          isSelected ? 'text-white/70' : 'text-[#787570]'
                        }`}
                      >
                        {b.detail}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Details Textarea */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="projectDetails"
                className="text-xs font-mono font-bold uppercase text-[#161514] tracking-wider flex items-center justify-between"
              >
                <span>Project Objectives & Context</span>
                <span className="text-[11px] font-sans text-red-600">*</span>
              </label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                required
                rows={3}
                placeholder="Tell us about your current challenges, target locations, or key revenue goals..."
                value={formData.projectDetails}
                onChange={handleChange}
                className={`p-4 rounded-2xl bg-[#FAF8F5] border text-sm text-[#161514] placeholder-[#787570] focus:outline-none focus:ring-2 focus:ring-[#f7ac4f] transition-all resize-none ${
                  fieldErrors.projectDetails ? 'border-red-500' : 'border-[#e8e6e2]'
                }`}
              />
              {fieldErrors.projectDetails && (
                <span className="text-xs text-red-600 font-mono mt-0.5">
                  {fieldErrors.projectDetails}
                </span>
              )}
            </div>

            {/* Submit Action Button */}
            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 px-8 rounded-full bg-[#f7ac4f] hover:bg-[#f29a2e] text-[#161514] font-sans font-bold text-base transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'Evaluating brief...' : 'Transmit Strategic Brief'}</span>
                <ArrowRight className="w-4 h-4 text-[#161514]" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-sans text-[#787570]">
                <ShieldCheck className="w-4 h-4 text-[#1f7a37]" />
                <span>NDA & Confidentiality Protected · Zero Sales Reps Calling</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
