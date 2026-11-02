'use client';

import React from "react";
import { projectsData } from "@/data/projects";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { ArrowUpRight } from "lucide-react";
import SplitHeading from "@/motion/SplitHeading";
import ImageReveal from "@/motion/ImageReveal";
import Tilt3D from "@/motion/Tilt3D";
import { DripLink } from "@/components/animorio/drip/DripLink";

const featuredProjects = [
  {
    ...projectsData[0],
    image: "/images/home/work-1.webp",
  },
  {
    ...projectsData[1],
    image: "/images/home/work-2.webp",
  },
];

export function SelectedWork() {
  return (
    <section className="py-20 sm:py-28 bg-surface-muted" id="work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Streamlined Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-charcoal-900/10">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-xs font-mono tracking-widest uppercase text-accent font-semibold">
                03 / Featured Work
              </span>
              <PlaceholderBadge label="CIR-04 Verified Sample" />
            </div>
            <SplitHeading
              as="h2"
              className="text-display-2 font-display font-medium text-charcoal-900 tracking-tight leading-tight uppercase"
            >
              Craft In Action.
            </SplitHeading>
          </div>
          <p className="text-sm text-warmgray-600 max-w-sm leading-relaxed">
            Curated flagship engagements demonstrating our multidisciplinary execution across web engineering and search visibility.
          </p>
        </div>

        {/* 2-Column High-Impact Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-10">
          {featuredProjects.map((project) => (
            <Tilt3D key={project.id} maxTilt={4}>
              <div className="group card-glass-elevated rounded-card bg-white border border-charcoal-900/10 p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
                {/* Glassy corner sheen highlight */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-white via-white/50 to-transparent pointer-events-none rounded-tr-[inherit] z-20"
                />

                {/* Visual Area with ImageReveal */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 flex flex-col justify-between text-white border border-charcoal-800/10 shadow-inner">
                  <ImageReveal
                    src={project.image}
                    alt={`${project.title} - ${project.category}`}
                    fill
                    rounded="rounded-xl"
                    className="h-full w-full"
                    sizes="(max-width: 768px) 100vw, 650px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-900/20 to-black/20 pointer-events-none" />

                  {/* Overlaid details */}
                  <div className="relative z-10 flex items-center justify-between p-4">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-mono tracking-wider uppercase text-warmgray-200 border border-white/10">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-warmgray-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>

                  <div className="relative z-10 p-4 mt-auto">
                    <span className="text-[11px] font-mono text-accent block mb-0.5">
                      {project.client}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-white group-hover:text-accent-tint transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Meta & Summary */}
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-charcoal-900/5 relative z-10">
                  <p className="text-sm text-warmgray-600 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <DripLink
                    href="/services"
                    aria-label={`Explore services for ${project.title}`}
                    className="w-10 h-10 shrink-0 rounded-full bg-surface-muted group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <ArrowUpRight className="w-4 h-4 text-charcoal-900 group-hover:text-white" />
                  </DripLink>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
}
