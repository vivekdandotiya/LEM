import React from "react";
import type { Metadata } from "next";
import { AboutJourney } from "@/components/about/AboutJourney";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "About Us — Purpose & Philosophy",
  description:
    "Discover the engineering philosophy and editorial standards behind Lead Edge Marketing. We build digital momentum for ambitious brands.",
};

export default function AboutPage() {
  return (
    <>
      <AboutJourney />
      <FinalCTA />
    </>
  );
}
