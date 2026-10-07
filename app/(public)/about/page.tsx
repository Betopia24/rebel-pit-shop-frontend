
import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { AboutHeroSection } from "./_components/about-hero-section"
import { AboutStorySection } from "./_components/about-story-section"
import { HowClassesWorkSection } from "./_components/how-classes-work-section"
import { AllLevelsSection } from "./_components/all-levels-section"
import { MeetTheRebelsSection } from "./_components/meet-the-rebels-section"


/* =========================================================
   ABOUT PAGE — SEO CONFIGURATION

   Canonical metadata, social sharing and structured data
   are managed at the page level.

   The content sections can be added later without
   changing the SEO architecture.
========================================================= */

const PAGE_PATH = "/about"

const ABOUT_IMAGE =
  "/images/about-us/about-header.jpg"

const PAGE_TITLE =
  "About Us & Our Boxing Coaches in Wichita, KS"

const PAGE_DESCRIPTION =
  "Meet the Rebel Boxing Club team in Wichita, KS. Discover no-contact boxing fitness classes, 30-, 60-, and 75-minute workouts, and training for all levels."


/* =========================================================
   ABSOLUTE URLS
========================================================= */

const homeUrl = new URL(
  "/",
  siteConfig.url
).toString()

const aboutUrl = new URL(
  PAGE_PATH,
  siteConfig.url
).toString()

const aboutImageUrl = new URL(
  ABOUT_IMAGE,
  siteConfig.url
).toString()

const fullPageTitle =
  `${PAGE_TITLE} | ${siteConfig.name}`


/* =========================================================
   NEXT.JS METADATA

   Inherits global metadata settings from app/layout.tsx,
   including the site's title template and global robots.
========================================================= */

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    type: "website",

    url: aboutUrl,

    siteName: siteConfig.name,

    locale: siteConfig.locale,

    title: fullPageTitle,

    description: PAGE_DESCRIPTION,

    images: [
      {
        url: aboutImageUrl,

        alt:
          "Members enjoying boxing fitness training at Rebel Boxing Club in Wichita, Kansas.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: fullPageTitle,

    description: PAGE_DESCRIPTION,

    images: [
      {
        url: aboutImageUrl,

        alt:
          "Rebel Boxing Club members training together.",
      },
    ],
  },
}


/* =========================================================
   SCHEMA.ORG STRUCTURED DATA

   AboutPage:
   - Identifies the page as an About Us page
   - Associates the page with Rebel Boxing Club
   - Provides location and main page image

   BreadcrumbList:
   - Home > About Us

   No fabricated ratings, reviews, opening hours,
   pricing or unsupported claims.
========================================================= */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "AboutPage",

      "@id": `${aboutUrl}#webpage`,

      url: aboutUrl,

      name: fullPageTitle,

      description: PAGE_DESCRIPTION,

      inLanguage: "en-US",

      isPartOf: {
        "@type": "WebSite",

        "@id": `${homeUrl}#website`,

        name: siteConfig.name,

        url: homeUrl,
      },

      about: {
        "@type": "HealthClub",

        "@id": `${homeUrl}#organization`,

        name: siteConfig.business.name,

        url: homeUrl,

        description:
          siteConfig.description,

        address: {
          "@type": "PostalAddress",

          streetAddress:
            siteConfig.business.address.street,

          addressLocality:
            siteConfig.business.address.city,

          addressRegion:
            siteConfig.business.address.region,

          postalCode:
            siteConfig.business.address.postalCode,

          addressCountry:
            siteConfig.business.address.country,
        },
      },

      primaryImageOfPage: {
        "@type": "ImageObject",

        contentUrl: aboutImageUrl,

        caption:
          "Rebel Boxing Club gym and boxing fitness community.",
      },

      breadcrumb: {
        "@id": `${aboutUrl}#breadcrumb`,
      },
    },

    {
      "@type": "BreadcrumbList",

      "@id": `${aboutUrl}#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: homeUrl,
        },

        {
          "@type": "ListItem",

          position: 2,

          name: "About Us",

          item: aboutUrl,
        },
      ],
    },
  ],
}


/* =========================================================
   ABOUT US PAGE

   Server Component:
   - No "use client"
   - Server-rendered page structure
   - One main landmark
   - Hero contains the page's H1
   - All later section headings should use H2
   - Navbar/Footer are handled by the public layout
========================================================= */

export default function AboutPage() {
  return (
    <>
      {/* ===================================================
          STRUCTURED DATA
      ==================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ).replace(/</g, "\\u003c"),
        }}
      />


      {/* ===================================================
          MAIN PAGE CONTENT
      ==================================================== */}

      <main
        id="main-content"
        className="
          relative
          w-full
          overflow-x-clip
          bg-background
        "
      >
        {/* SECTION 01 — HERO */}

        <AboutHeroSection />


        {/* SECTION 02 — OUR STORY */}
        <AboutStorySection />


        {/* SECTION 03 — HOW CLASSES WORK */}
        <HowClassesWorkSection />


        {/* SECTION 04 — ALL FITNESS LEVELS */}
        <AllLevelsSection />


        {/* SECTION 05 — MEET THE REBELS */}
        <MeetTheRebelsSection />

      </main>
    </>
  )
}
