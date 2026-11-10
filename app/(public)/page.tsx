import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { ContactCtaSection } from "./_components/contact-cta-section"
import { HeroSection } from "./_components/hero-section"
// import { ScheduleEventsSection } from "./_components/schedule-events-section"
// import { SuccessStoriesSection } from "./_components/success-stories-section"
import { TrainingOptionsSection } from "./_components/training-options-section"
import { FloatingChatbot } from "./_components/floating-chatbot"


/* =========================================================
   HOMEPAGE METADATA

   Root metadata provides:
   - metadataBase
   - title template
   - site name
   - default robots
   - global Open Graph foundation

   This file provides homepage-specific metadata.
========================================================= */

export const metadata: Metadata = {
  /* =======================================================
     PRIMARY SEO
  ======================================================= */

  title:
    siteConfig.seo.homeTitle,

  description:
    siteConfig.seo.homeDescription,


  /* =======================================================
     CANONICAL

     metadataBase from app/layout.tsx converts "/"
     into the absolute production URL.
  ======================================================= */

  alternates: {
    canonical: "/",
  },


  /* =======================================================
     OPEN GRAPH

     Used by:
     - Facebook
     - LinkedIn
     - Discord
     - messaging apps
     - other social platforms

     The shared social image is configured in siteConfig
     and reused by the root and homepage metadata.
  ======================================================= */

  openGraph: {
    type: "website",

    url: "/",

    siteName:
      siteConfig.name,

    locale:
      siteConfig.locale,

    title:
      `${siteConfig.seo.homeTitle} | ${siteConfig.name}`,

    description:
      siteConfig.seo.homeDescription,

    images: [
      {
        url:
          siteConfig.seo.openGraphImage,

        width: 1672,

        height: 941,

        alt:
          siteConfig.seo.openGraphImageAlt,
      },
    ],
  },


  /* =======================================================
     TWITTER / X

     Twitter reuses the shared social image configured in
     siteConfig.
  ======================================================= */

  twitter: {
    card:
      siteConfig.seo.twitterCard,

    title:
      `${siteConfig.seo.homeTitle} | ${siteConfig.name}`,

    description:
      siteConfig.seo.homeDescription,

    images: [
      siteConfig.seo.openGraphImage,
    ],
  },
}


/* =========================================================
   HOME PAGE

   IMPORTANT:
   Keep this page as a Server Component.

   Do NOT add:
   "use client"

   Interactive child components can manage their own
   client boundaries individually.
========================================================= */

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="
        relative
        w-full
        overflow-x-clip
        bg-background
      "
    >
      {/* ===================================================
          01 — HERO

          Primary purpose:
          - brand introduction
          - single page H1
          - primary conversion actions
      ==================================================== */}

      <HeroSection />


      {/* ===================================================
          02 — TRAINING OPTIONS

          Answers:
          "What training options do you offer?"
      ==================================================== */}

      <TrainingOptionsSection />


      {/* ===================================================
          03 — SCHEDULE / EVENTS

          Answers:
          "When can I train?"
      ==================================================== */}

      {/* <ScheduleEventsSection /> */}


      {/* ===================================================
          04 — SOCIAL PROOF

          Answers:
          "What do members think?"
      ==================================================== */}

      {/* <SuccessStoriesSection /> */}


      {/* ===================================================
          05 — FINAL CONVERSION CTA

          Gives the visitor a clear next action
          before reaching the footer.
      ==================================================== */}

      <ContactCtaSection />

      <FloatingChatbot />
    </main>
  )
}
