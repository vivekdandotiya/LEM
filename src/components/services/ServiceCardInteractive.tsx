"use client";

import React from "react";
import { ServiceItem } from "@/data/services";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import ImageReveal from "@/motion/ImageReveal";
import Tilt3D from "@/motion/Tilt3D";
import { DripLink } from "@/components/animorio/drip/DripLink";

interface ServiceCardInteractiveProps {
  service: ServiceItem;
  index: number;
}

const hubImages: Record<string, string> = {
  seo: "/images/services/hub-seo.webp",
  "meta-ads": "/images/services/hub-meta.webp",
  "social-media": "/images/services/hub-social.webp",
  "web-development": "/images/services/hub-web.webp",
};

export function ServiceCardInteractive({ service, index }: ServiceCardInteractiveProps) {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const imgSrc = hubImages[service.slug] || "/images/services/hub-web.webp";

  return (
    <Tilt3D maxTilt={4}>
      <div
        onPointerMove={handlePointerMove}
        className="group card-glass-elevated rounded-card bg-white border border-charcoal-900/10 p-6 sm:p-10 flex flex-col justify-between overflow-hidden relative h-full"
      >
        {/* Glassy corner sheen highlight */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-white via-white/50 to-transparent pointer-events-none rounded-tr-[inherit] z-20"
        />

        {/* Spotlight cursor radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background:
              "radial-gradient(450px circle at var(--mx, 50%) var(--my, 50%), rgba(201, 166, 107, 0.16), transparent 75%)",
          }}
        />

        {/* Top Meta */}
        <div className="flex items-center justify-between pb-6 border-b border-charcoal-900/10 relative z-10">
          <span className="text-sm font-mono tracking-widest text-accent font-bold">
            0{index + 1} / Discipline
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-warmgray-400">
            Full-Stack Practice
          </span>
        </div>

        {/* Main Content Area */}
        <div className="py-6 sm:py-8 flex flex-col gap-4 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-charcoal-900 leading-tight group-hover:text-accent-shade transition-colors">
            <DripLink href={`/services/${service.slug}`} className="hover:underline">
              {service.title}
            </DripLink>
          </h3>
          <p className="text-sm sm:text-base text-warmgray-600 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Real Photo ImageReveal */}
          <div className="my-3 h-52 sm:h-64 w-full rounded-xl overflow-hidden shadow-inner border border-charcoal-900/10">
            <ImageReveal
              src={imgSrc}
              alt={`${service.title} operational capability preview`}
              fill
              rounded="rounded-xl"
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>

          {/* Deliverables snippet */}
          <div className="space-y-2 pt-2">
            {service.deliverables.slice(0, 3).map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-xs text-warmgray-700">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Action Link with DripLink */}
        <div className="pt-6 border-t border-charcoal-900/10 flex items-center justify-between relative z-10">
          <span className="text-xs font-mono text-warmgray-500">
            Bespoke Strategy & Execution
          </span>
          <DripLink
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-charcoal-900 text-white text-xs font-medium hover:bg-accent transition-colors duration-200 shadow-sm"
            aria-label={`Discover ${service.title} details`}
          >
            <span>Discover Service</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </DripLink>
        </div>
      </div>
    </Tilt3D>
  );
}
