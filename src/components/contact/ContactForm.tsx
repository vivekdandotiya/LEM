"use client";

import React, { useState, useEffect } from "react";
import { contactFormSchema, ContactFormData } from "@/lib/contact-schema";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import Magnetic from "@/motion/Magnetic";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    companyOrWebsite: "",
    serviceRequired: "seo",
    budgetRange: "10k-25k",
    projectDetails: "",
    honeypot: "",
    formRenderTime: 0,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [isDevSimulation, setIsDevSimulation] = useState<boolean>(false);

  // Record initial render timestamp for anti-spam check
  useEffect(() => {
    setFormData((prev) => ({ ...prev, formRenderTime: Date.now() }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error on change
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
    setStatus("loading");

    // 1. Client-Side Zod Validation
    const clientValidation = contactFormSchema.safeParse(formData);
    if (!clientValidation.success) {
      const errors: Record<string, string> = {};
      clientValidation.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFieldErrors(errors);
      setStatus("idle");
      return;
    }

    // 2. Submit to Real Server Route Handler
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setServerMessage(
          result.error || "Unable to send inquiry. Please try again or email us directly."
        );
        return;
      }

      // Success
      setStatus("success");
      setServerMessage(result.message || "Thank you. Your message was received.");
      setIsDevSimulation(!!result.isDevSimulation);
    } catch {
      setStatus("error");
      setServerMessage("Network connectivity failure. Please check your connection or email directly.");
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Background Soft Ambient Light */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-gradient-to-tr from-accent/20 via-warmgray-200/40 to-transparent rounded-[36px] blur-xl pointer-events-none -z-10"
      />

      {/* Glass Form Container with Glassy Corner & Deep Shadow */}
      <div className="card-glass-elevated p-6 sm:p-10 rounded-[28px] bg-paper-2/95 border border-ink/10 shadow-soft-lg relative overflow-hidden">
        {/* Glassy corner sheen highlight */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-white via-lime/10 to-transparent pointer-events-none rounded-tr-[inherit] z-20"
        />
        <div className="relative z-10">
        {status === "success" ? (
          <div className="py-12 text-center flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-accent/20 text-accent flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-display font-medium text-charcoal-900">
              Inquiry Confirmed
            </h3>
            <p className="text-sm text-warmgray-600 max-w-md leading-relaxed">
              {serverMessage}
            </p>

            {isDevSimulation && (
              <div className="p-3.5 rounded-xl bg-warmgray-100 border border-warmgray-200 text-xs text-warmgray-600 max-w-md text-left font-mono">
                <span className="font-semibold text-charcoal-900 block mb-1">
                  Developer Environment Notice:
                </span>
                External SMTP/Resend API key is unconfigured. Form data was verified via server schema and safely logged to the console adapter.
              </div>
            )}

            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => {
                setStatus("idle");
                setFormData({
                  fullName: "",
                  email: "",
                  companyOrWebsite: "",
                  serviceRequired: "seo",
                  budgetRange: "10k-25k",
                  projectDetails: "",
                  honeypot: "",
                  formRenderTime: Date.now(),
                });
              }}
              className="mt-4"
            >
              Submit another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            {/* Server Error Alert Banner */}
            {status === "error" && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold block">Submission Error:</span>
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

            {/* Anti-Spam Hidden Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="form-hp">Do not fill this field</label>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullName"
                  className="text-xs font-mono tracking-wider uppercase text-charcoal-900 flex items-center justify-between"
                >
                  <span>Full Name</span>
                  <span className="text-[10px] text-warmgray-500 font-normal">(Required)</span>
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
                  aria-invalid={!!fieldErrors.fullName}
                  aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                  className={`px-4 py-3 text-base sm:text-sm rounded-xl bg-white/80 border text-charcoal-900 placeholder-warmgray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors ${
                    fieldErrors.fullName ? "border-red-500" : "border-charcoal-900/10"
                  }`}
                />
                {fieldErrors.fullName && (
                  <span id="fullName-error" className="text-xs text-red-600 font-mono">
                    {fieldErrors.fullName}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-mono tracking-wider uppercase text-charcoal-900 flex items-center justify-between"
                >
                  <span>Business Email</span>
                  <span className="text-[10px] text-warmgray-500 font-normal">(Required)</span>
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
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className={`px-4 py-3 text-base sm:text-sm rounded-xl bg-white/80 border text-charcoal-900 placeholder-warmgray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors ${
                    fieldErrors.email ? "border-red-500" : "border-charcoal-900/10"
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
            <div className="flex flex-col gap-2">
              <label
                htmlFor="companyOrWebsite"
                className="text-xs font-mono tracking-wider uppercase text-charcoal-900 flex items-center justify-between"
              >
                <span>Company or Website</span>
                <span className="text-[10px] text-warmgray-500 font-normal">(Optional)</span>
              </label>
              <input
                id="companyOrWebsite"
                name="companyOrWebsite"
                type="text"
                autoComplete="organization"
                placeholder="e.g. Acme Corp or acme.com"
                value={formData.companyOrWebsite}
                onChange={handleChange}
                className="px-4 py-3 text-base sm:text-sm rounded-xl bg-white/80 border border-charcoal-900/10 text-charcoal-900 placeholder-warmgray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              />
            </div>

            {/* Row 3: Service Required & Budget Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="serviceRequired"
                  className="text-xs font-mono tracking-wider uppercase text-charcoal-900"
                >
                  Primary Discipline Required
                </label>
                <select
                  id="serviceRequired"
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="px-4 py-3 text-base sm:text-sm rounded-xl bg-white/80 border border-charcoal-900/10 text-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                >
                  <option value="seo">Search Engine Optimization (SEO)</option>
                  <option value="meta-ads">Meta Ads & Paid Social</option>
                  <option value="social-media">Social Media Marketing</option>
                  <option value="web-development">Web Development & UI/UX</option>
                  <option value="other">Full-Funnel Growth / Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="budgetRange"
                  className="text-xs font-mono tracking-wider uppercase text-charcoal-900 flex items-center justify-between"
                >
                  <span>Project Budget</span>
                  <span className="text-[10px] text-warmgray-500 font-normal">(Optional)</span>
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="px-4 py-3 text-base sm:text-sm rounded-xl bg-white/80 border border-charcoal-900/10 text-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
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
            <div className="flex flex-col gap-2">
              <label
                htmlFor="projectDetails"
                className="text-xs font-mono tracking-wider uppercase text-charcoal-900 flex items-center justify-between"
              >
                <span>Project Objectives & Timeline</span>
                <span className="text-[10px] text-warmgray-500 font-normal">
                  {formData.projectDetails.length}/2000 chars
                </span>
              </label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                required
                rows={4}
                placeholder="Briefly describe your business, commercial challenges, and what success looks like over the next 90–180 days..."
                value={formData.projectDetails}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.projectDetails}
                aria-describedby={fieldErrors.projectDetails ? "projectDetails-error" : undefined}
                className={`px-4 py-3 text-base sm:text-sm rounded-xl bg-white/80 border text-charcoal-900 placeholder-warmgray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors resize-none ${
                  fieldErrors.projectDetails ? "border-red-500" : "border-charcoal-900/10"
                }`}
              />
              {fieldErrors.projectDetails && (
                <span id="projectDetails-error" className="text-xs text-red-600 font-mono">
                  {fieldErrors.projectDetails}
                </span>
              )}
            </div>

            {/* Privacy Consent Microcopy */}
            <p className="text-[11px] text-warmgray-500 leading-normal">
              By submitting this inquiry, you agree to our confidential handling of your information. We do not share your details with third parties.
            </p>

            {/* Submit Button */}
            <Magnetic strength={0.2}>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full text-center py-4 text-base font-bold shadow-lime-glow disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Transmitting Inquiry..." : "Transmit Consultation Request →"}
              </button>
            </Magnetic>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}
