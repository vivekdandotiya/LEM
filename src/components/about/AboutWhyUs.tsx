'use client';

import React from "react";
import { Button } from "@/components/ui/Button";
import SplitHeading from "@/motion/SplitHeading";
import ImageReveal from "@/motion/ImageReveal";
import Magnetic from "@/motion/Magnetic";
import Tilt3D from "@/motion/Tilt3D";

export function AboutWhyUs() {
  const reasons = [
    {
      number: "01",
      title: "Senior Practitioners Only",
      description:
        "You collaborate directly with experienced marketing architects, senior designers, and software engineers. We do not delegate client strategy to junior apprentices.",
    },
    {
      number: "02",
      title: "Unified Technical Architecture",
      description:
        "SEO, paid media, creative production, and web engineering operate as one connected growth engine rather than isolated agency silos.",
    },
    {
      number: "03",
      title: "Commercial Alignment",
      description:
        "We measure our success by business impact—organic revenue pipeline, verified customer acquisition margins, and long-term enterprise value.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-surface-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="pb-16 border-b border-charcoal-900/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-accent font-semibold block mb-3">
              03 / Partnership Model
            </span>
            <SplitHeading
              as="h2"
              className="text-display-2 font-display font-medium text-charcoal-900 tracking-tight leading-tight uppercase"
            >
              Why Ambitious Leaders Choose Lead Edge.
            </SplitHeading>
          </div>
          <Magnetic strength={0.25}>
            <Button href="/contact" variant="primary" size="md" showArrow>
              Initiate Conversation
            </Button>
          </Magnetic>
        </div>

        {/* 3 Core Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 pb-16">
          {reasons.map((reason) => (
            <Tilt3D key={reason.number} maxTilt={4}>
              <div className="card-glass-elevated p-8 rounded-card bg-white border border-charcoal-900/10 shadow-soft-sm flex flex-col justify-between h-full group hover:shadow-soft-md transition-shadow">
                <div>
                  <span className="text-sm font-mono tracking-widest text-accent font-bold block mb-4">
                    {reason.number}
                  </span>
                  <h3 className="text-xl font-display font-medium text-charcoal-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-warmgray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>

        {/* Team Collaboration & Operational Studio Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-charcoal-900/10">
          <div className="h-72 sm:h-96 w-full rounded-card overflow-hidden">
            <ImageReveal
              src="/images/about/team-1.webp"
              alt="Lead Edge Marketing multidisciplinary strategy session"
              fill
              rounded="rounded-card"
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
          <div className="h-72 sm:h-96 w-full rounded-card overflow-hidden">
            <ImageReveal
              src="/images/about/why-us-1.webp"
              alt="High-touch strategic client consultation and executive roadmap review"
              fill
              rounded="rounded-card"
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
