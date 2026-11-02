import type { Metadata } from "next";
import "@/styles/globals.css";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SitePreloader from "@/components/SitePreloader";
import SmoothScroll from "@/motion/SmoothScroll";
import { DripTransitionProvider } from "@/components/animorio/drip/DripTransitionProvider";
import CustomCursor from "@/motion/CustomCursor";
import { LimeScrollProgress } from "@/components/ui/LimeScrollProgress";
import { DotGridPointerListener } from "@/components/ui/DotGridPointerListener";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Premium Digital Marketing Agency`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Digital Marketing Agency",
    "Technical SEO",
    "Meta Ads Management",
    "Paid Social Acquisition",
    "Social Media Creative Direction",
    "Bespoke Web Development",
    "High Performance Growth",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    title: `${siteConfig.name} — Premium Digital Marketing Agency`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/logo/lead-edge-logo.png",
        width: 1024,
        height: 1024,
        alt: "Lead Edge Marketing Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Premium Digital Marketing Agency`,
    description: siteConfig.description,
    images: ["/logo/lead-edge-logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="light">
      <body className="min-h-screen flex flex-col bg-surface-warm text-charcoal-900 selection:bg-accent selection:text-white antialiased relative">
        {/* Film grain subtle cinematic texture overlay */}
        <div aria-hidden="true" className="film-grain" />

        {/* V3 Lime 3px Scroll Progress Hairline */}
        <LimeScrollProgress />

        {/* Section 4 Pointer Listener for Cursor-Lit Dot Grid */}
        <DotGridPointerListener />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Site Preloader - Candle that burns down (1st session visit) */}
        <SitePreloader />

        {/* WCAG 2.2 Skip-To-Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[10003] px-4 py-2 rounded-md bg-accent text-white font-medium shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Skip to main content
        </a>

        {/* Smooth Lenis Scrolling & Drip Route Transition Provider */}
        <SmoothScroll>
          <DripTransitionProvider>
            {/* Global Floating Glass Navbar */}
            <Navbar />

            {/* Main Content Landmark */}
            <main id="main-content" className="flex-grow">
              {children}
            </main>

            {/* Global Footer */}
            <Footer />
          </DripTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
