import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { confirmedServices, getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return confirmedServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} — Capabilities`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Lead Edge Marketing`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageTemplate service={service} />;
}
