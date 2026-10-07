import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { ScheduleHeroSection } from "./_components/schedule-hero-section"
import { ScheduleMainSection } from "./_components/schedule-main-section"
import { ScheduleFirstVisitSection } from "./_components/schedule-first-visit-section"
import { ScheduleFaqSection } from "./_components/schedule-faq-section"

/* =========================================================
   REBEL BOXING CLUB — SCHEDULE PAGE

   Route:
   /schedule

   SEO architecture:
   - Unique metadata
   - Canonical URL
   - Open Graph
   - Twitter / X
   - Robots directives
   - Schema.org CollectionPage
   - Schema.org BreadcrumbList
   - Schema.org HealthClub reference
   - Primary image metadata
   - Stable structured-data IDs
   - Semantic page structure

   IMPORTANT:
   This file is intentionally designed so future schedule
   sections can be added without changing page-level SEO.

   Future components can include:
   - ScheduleMainSection
   - ScheduleToolbar
   - WeeklySchedule
   - MobileDaySchedule
   - BookingSheet
   - BookingDrawer
   - FirstVisitSection
   - ScheduleFaqSection
   - ContactCtaSection
========================================================= */

/* =========================================================
   PAGE CONFIG
========================================================= */

const PAGE_PATH = "/schedule"

const PAGE_TITLE =
  "Boxing Class Schedule in Wichita, KS"

const PAGE_DESCRIPTION =
  "View the Rebel Boxing Club class schedule in Wichita, Kansas. Find boxing fitness, kickboxing, conditioning, and training times throughout the week and book a class that fits your schedule."

const PAGE_IMAGE =
  "/images/schedule/schedule-header.jpg"

const PAGE_IMAGE_ALT =
  "Members training on heavy bags inside Rebel Boxing Club in Wichita, Kansas."

/* =========================================================
   ABSOLUTE URLS
========================================================= */

const siteUrl = new URL(
  "/",
  siteConfig.url
).toString()

const pageUrl = new URL(
  PAGE_PATH,
  siteConfig.url
).toString()

const imageUrl = new URL(
  PAGE_IMAGE,
  siteConfig.url
).toString()

const fullPageTitle =
  `${PAGE_TITLE} | ${siteConfig.name}`

/* =========================================================
   NEXT.JS METADATA
========================================================= */

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    type: "website",

    url: pageUrl,

    siteName: siteConfig.name,

    locale: siteConfig.locale,

    title: fullPageTitle,

    description: PAGE_DESCRIPTION,

    images: [
      {
        url: imageUrl,

        width: 1600,

        height: 861,

        alt: PAGE_IMAGE_ALT,

        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: fullPageTitle,

    description: PAGE_DESCRIPTION,

    images: [
      {
        url: imageUrl,

        alt: PAGE_IMAGE_ALT,
      },
    ],
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,

      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },

  category: "Fitness",

  keywords: [
    "Rebel Boxing Club schedule",
    "boxing classes Wichita",
    "boxing gym Wichita KS",
    "kickboxing classes Wichita",
    "boxing fitness Wichita",
    "Wichita boxing schedule",
    "fitness classes Wichita KS",
    "Rebel Boxing Club Wichita",
  ],
}

/* =========================================================
   WEBSITE SCHEMA

   Stable website entity.
========================================================= */

const websiteSchema = {
  "@type": "WebSite",

  "@id": `${siteUrl}#website`,

  url: siteUrl,

  name: siteConfig.name,

  description: siteConfig.description,

  inLanguage: "en-US",

  publisher: {
    "@id": `${siteUrl}#organization`,
  },
}

/* =========================================================
   HEALTH CLUB SCHEMA

   Uses the same organization @id used across the site.

   This ensures Google sees Rebel Boxing Club as one
   consistent business entity across:
   - Homepage
   - About
   - Contact
   - Schedule
========================================================= */

const healthClubSchema = {
  "@type": "HealthClub",

  "@id": `${siteUrl}#organization`,

  name: siteConfig.business.name,

  url: siteUrl,

  description: siteConfig.description,

  telephone: siteConfig.contact.phone,

  email: siteConfig.contact.email,

  image: imageUrl,

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

  openingHoursSpecification:
    siteConfig.hours.map(
      (schedule) => ({
        "@type":
          "OpeningHoursSpecification",

        dayOfWeek:
          schedule.dayOfWeek.map(
            (day) =>
              `https://schema.org/${day}`
          ),

        opens: schedule.opens,

        closes: schedule.closes,
      })
    ),
}

/* =========================================================
   SCHEDULE PAGE SCHEMA

   CollectionPage is appropriate because this route
   represents a collection of recurring training/classes.

   IMPORTANT:
   We do NOT add fake Event schema here.

   Individual classes can later provide their own
   structured data from the schedule components/API
   if real dates, coaches, availability and booking URLs
   are available.
========================================================= */

const schedulePageSchema = {
  "@type": "CollectionPage",

  "@id": `${pageUrl}#webpage`,

  url: pageUrl,

  name: fullPageTitle,

  description: PAGE_DESCRIPTION,

  inLanguage: "en-US",

  isPartOf: {
    "@id": `${siteUrl}#website`,
  },

  about: {
    "@id": `${siteUrl}#organization`,
  },

  publisher: {
    "@id": `${siteUrl}#organization`,
  },

  primaryImageOfPage: {
    "@id": `${pageUrl}#primaryimage`,
  },

  breadcrumb: {
    "@id": `${pageUrl}#breadcrumb`,
  },

  potentialAction: {
    "@type": "ViewAction",

    target: pageUrl,

    name: "View Rebel Boxing Club Class Schedule",
  },
}

/* =========================================================
   PRIMARY IMAGE SCHEMA
========================================================= */

const primaryImageSchema = {
  "@type": "ImageObject",

  "@id": `${pageUrl}#primaryimage`,

  url: imageUrl,

  contentUrl: imageUrl,

  caption: PAGE_IMAGE_ALT,
}

/* =========================================================
   BREADCRUMB SCHEMA

   Home → Schedule
========================================================= */

const breadcrumbSchema = {
  "@type": "BreadcrumbList",

  "@id": `${pageUrl}#breadcrumb`,

  itemListElement: [
    {
      "@type": "ListItem",

      position: 1,

      name: "Home",

      item: siteUrl,
    },

    {
      "@type": "ListItem",

      position: 2,

      name: "Class Schedule",

      item: pageUrl,
    },
  ],
}

/* =========================================================
   JSON-LD GRAPH

   One connected graph rather than unrelated scripts.
========================================================= */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    websiteSchema,

    healthClubSchema,

    primaryImageSchema,

    schedulePageSchema,

    breadcrumbSchema,
  ],
}

/* =========================================================
   SAFE JSON-LD SERIALIZATION

   Prevents HTML-breaking characters from being interpreted
   as markup inside the script element.
========================================================= */

function serializeJsonLd(
  value: object
): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
}

/* =========================================================
   SCHEDULE PAGE

   Heading hierarchy:

   H1
   └── ScheduleHeroSection

   H2
   ├── ScheduleMainSection
   ├── FirstVisitSection
   ├── ScheduleFaqSection
   └── CTA sections as appropriate

   Do not add another H1 anywhere on this page.
========================================================= */

export default function SchedulePage() {
  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              structuredData
            ),
        }}
      />

      {/* =====================================================
          MAIN PAGE
      ====================================================== */}

      <main
        id="main-content"
        className="
          relative

          w-full
          overflow-x-clip

          bg-background
          text-foreground
        "
      >
        {/* ===================================================
            SECTION 01 — SCHEDULE HERO

            H1:
            Find Your Time.

            Image:
            /images/schedule/schedule-header.jpg

            Navbar:
            Transparent until #schedule-hero ends.
        ==================================================== */}

        <ScheduleHeroSection />

        {/* ===================================================
            SECTION 02 — MAIN SCHEDULE

            Recommended component:
            <ScheduleMainSection />

            Required ID:
            id="schedule-main"

            Recommended contents:

            - Current week title
            - Previous / Today / Next controls
            - Class filter
            - Coach filter
            - Duration filter
            - Desktop weekly schedule
            - Mobile day selector
            - Mobile chronological schedule

            Hero CTA already points to:
            #schedule-main
        ==================================================== */}

        <section
          id="schedule-main"
          aria-label="Rebel Boxing Club class schedule"
          className="
            scroll-mt-24
          "
        >
          <ScheduleMainSection />
        </section>

        {/* ===================================================
            SECTION 03 — BOOKING UI

            Recommended architecture:

            Booking UI should normally be controlled
            by ScheduleMainSection rather than rendered
            as a visible independent page section.

            Desktop:
            <BookingSheet />

            Mobile:
            <BookingDrawer />

            Booking flow:
            Class → Details → Confirm
        ==================================================== */}

        {/* ===================================================
            SECTION 04 — FIRST TIME AT REBEL

            Future:
            

            Recommended H2:
            First Time at Rebel?

            Keep this compact and contextual.
            Do not turn the schedule page into a large
            marketing landing page.
        ==================================================== */}
        <ScheduleFirstVisitSection />
        {/* ===================================================
            SECTION 05 — OPTIONAL FAQ

            Future:
            <ScheduleFaqSection />

            FAQ topics could include:

            - Do I need boxing experience?
            - Are classes no-contact?
            - What should I bring?
            - Can workouts be modified?
            - How long are classes?

            If you later add FAQ structured data,
            it can live inside the FAQ component itself
            without changing this page.tsx.
        ==================================================== */}
        <ScheduleFaqSection />
        {/* ===================================================
            SECTION 06 — FINAL CTA

            Future:
            <ContactCtaSection />

            Reuse the existing site CTA instead of
            duplicating a new contact component.
        ==================================================== */}
      </main>
    </>
  )
}