import React from "react";
import { HomeHero } from "@/components/hero/HomeHero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ConceptWorkGallery } from "@/components/home/ConceptWorkGallery";
import { HomeInkSection } from "@/components/home/HomeInkSection";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { StatsSection } from "@/components/home/StatsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <ServicesPreview />
      <ConceptWorkGallery />
      <HomeInkSection />
      <ProcessSteps />
      <StatsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
