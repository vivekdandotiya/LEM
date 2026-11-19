'use client';

import React, { useState, useEffect } from 'react';
import { contactFormSchema, ContactFormData } from '@/lib/contact-schema';
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    companyOrWebsite: '',
    serviceRequired: 'seo',
    budgetRange: '10k-25k',
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
          result.error || 'Unable to send inquiry. Please try again or email us directly.'
        );
        return;
      }

      setStatus('success');
      setServerMessage(result.message || 'Thank you. Your message was received.');
      setIsDevSimulation(Boolean(result.isDevSimulation));
    } catch {
      setStatus('error');
      setServerMessage('Network connectivity failure. Please check your connection or email directly.');
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="p-6 sm:p-10 rounded-[28px] bg-white border border-ink/10 shadow-soft-lg relative overflow-hidden">
        {status === 'success' ? (
          <div className="py-12 text-center flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-display font-extrabold text-ink">
              Inquiry Confirmed
            </h3>
            <p className="text-sm text-stone max-w-md leading-relaxed">
              {serverMessage}
            </p>

            {isDevSimulation && (
              <div className="p-4 rounded-xl bg-ivory border border-ink/10 text-xs text-stone max-w-md text-left font-mono">
                <span className="font-semibold text-ink block mb-1">
                  Server Log Confirmed:
                </span>
                Form data was safely verified against schema and logged for director review.
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setFormData({
                  fullName: '',
                  email: '',
                  companyOrWebsite: '',
                  serviceRequired: 'seo',
                  budgetRange: '10k-25k',
                  projectDetails: '',
                  honeypot: '',
                  formRenderTime: Date.now(),
                });
              }}
              className="mt-6 px-6 py-3 rounded-full bg-ink text-ivory text-xs font-mono uppercase tracking-wider font-semibold hover:bg-charcoal transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <div className="border-b border-ink/10 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-stone block mb-1 font-semibold">
                Strategic Brief
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-ink">
                Start A Conversation
              </h2>
            </div>

            {status === 'error' && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold block mb-0.5">Submission Error:</span>
                  <span>{serverMessage}</span>
                  <div className="mt-2">
                    <a
                      href="mailto:hello@leadedge.agency"
                      className="underline font-mono text-red-900 hover:text-red-700"
                    >
                      Click here to email hello@leadedge.agency directly
                    </a>
                  </div>
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

            {/* Row 1: Full Name & Business Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fullName"
                  className="text-xs font-mono tracking-wider uppercase text-ink flex items-center justify-between font-semibold"
                >
                  <span>Full Name</span>
                  <span className="text-xs text-stone font-normal">(Required)</span>
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
                  aria-invalid={Boolean(fieldErrors.fullName)}
                  aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                  className={`px-4 py-3 text-sm rounded-xl bg-ivory border text-ink placeholder-stone/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors ${
                    fieldErrors.fullName ? 'border-red-500' : 'border-ink/15'
                  }`}
                />
                {fieldErrors.fullName && (
                  <span id="fullName-error" className="text-xs text-red-600 font-mono">
                    {fieldErrors.fullName}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-mono tracking-wider uppercase text-ink flex items-center justify-between font-semibold"
                >
                  <span>Business Email</span>
                  <span className="text-xs text-stone font-normal">(Required)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  className={`px-4 py-3 text-sm rounded-xl bg-ivory border text-ink placeholder-stone/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors ${
                    fieldErrors.email ? 'border-red-500' : 'border-ink/15'
                  }`}
                />
                {fieldErrors.email && (
                  <span id="email-error" className="text-xs text-red-600 font-mono">
                    {fieldErrors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Company or Website */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="companyOrWebsite"
                className="text-xs font-mono tracking-wider uppercase text-ink flex items-center justify-between font-semibold"
              >
                <span>Company or Website</span>
                <span className="text-xs text-stone font-normal">(Optional)</span>
              </label>
              <input
                id="companyOrWebsite"
                name="companyOrWebsite"
                type="text"
                autoComplete="organization"
                placeholder="e.g. Acme Corp or acme.com"
                value={formData.companyOrWebsite}
                onChange={handleChange}
                className="px-4 py-3 text-sm rounded-xl bg-ivory border border-ink/15 text-ink placeholder-stone/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors"
              />
            </div>

            {/* Row 3: Service & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="serviceRequired"
                  className="text-xs font-mono tracking-wider uppercase text-ink font-semibold"
                >
                  Primary Service
                </label>
                <select
                  id="serviceRequired"
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="px-4 py-3 text-sm rounded-xl bg-ivory border border-ink/15 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors"
                >
                  <option value="seo">Search Engine Optimization (SEO)</option>
                  <option value="ppc">Pay-Per-Click Advertising (PPC)</option>
                  <option value="social-media">Social Media Marketing</option>
                  <option value="web-development">Web Development & Architecture</option>
                  <option value="video-photo">Video Editing & Photo Creation</option>
                  <option value="full-funnel">Full-Funnel Integrated Growth</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="budgetRange"
                  className="text-xs font-mono tracking-wider uppercase text-ink flex items-center justify-between font-semibold"
                >
                  <span>Project Budget</span>
                  <span className="text-xs text-stone font-normal">(Optional)</span>
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="px-4 py-3 text-sm rounded-xl bg-ivory border border-ink/15 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors"
                >
                  <option value="under-5k">Under £5,000</option>
                  <option value="5k-10k">£5,000 – £10,000</option>
                  <option value="10k-25k">£10,000 – £25,000</option>
                  <option value="25k-plus">£25,000+</option>
                  <option value="undecided">Undecided / Open to Scope</option>
                </select>
              </div>
            </div>

            {/* Row 4: Project Details */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="projectDetails"
                className="text-xs font-mono tracking-wider uppercase text-ink flex items-center justify-between font-semibold"
              >
                <span>Project Objectives & Context</span>
                <span className="text-xs text-stone font-normal">(Required)</span>
              </label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                required
                rows={4}
                placeholder="Briefly describe your growth objectives, target timelines, and current bottlenecks..."
                value={formData.projectDetails}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.projectDetails)}
                aria-describedby={fieldErrors.projectDetails ? 'projectDetails-error' : undefined}
                className={`px-4 py-3 text-sm rounded-xl bg-ivory border text-ink placeholder-stone/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors resize-none ${
                  fieldErrors.projectDetails ? 'border-red-500' : 'border-ink/15'
                }`}
              />
              {fieldErrors.projectDetails && (
                <span id="projectDetails-error" className="text-xs text-red-600 font-mono">
                  {fieldErrors.projectDetails}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full mt-2 py-4 px-8 rounded-full bg-ink text-ivory font-display font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-3 transition-all duration-300 hover:bg-charcoal hover:shadow-soft-md disabled:opacity-50 active:scale-[0.99]"
            >
              <span>{status === 'loading' ? 'Evaluating brief...' : 'Transmit Consultation Brief'}</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
