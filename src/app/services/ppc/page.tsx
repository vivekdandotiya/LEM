import React from "react";
import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "PPC Services — Precision Paid Search & Social Acquisition",
  description:
    "Targeted Facebook, Instagram, and search ads engineered to drive instant leads and max ROAS with algorithmic audience modeling.",
  openGraph: {
    title: "PPC Services | Lead Edge Marketing",
    description:
      "Targeted Facebook, Instagram, and search ads engineered to drive instant leads and max ROAS.",
  },
};

export default function PPCServicePage() {
  const service = getServiceBySlug("ppc");

  if (!service) {
    notFound();
  }

  return <ServicePageTemplate service={service} />;
}
