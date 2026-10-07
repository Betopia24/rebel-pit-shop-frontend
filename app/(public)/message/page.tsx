
import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

import { ContactPageHeroSection } from "@/app/(public)/message/_components/contact-page-hero-section"
import { ContactInformationSection } from "./_components/contact-information-section"
import { ContactLocationSection } from "./_components/contact-location-section"
import { ContactTrainingOptionsSection } from "./_components/contact-training-options-section"
import { ContactFaqSection } from "./_components/contact-faq-section"


/* =========================================================
   REBEL BOXING CLUB — CONTACT PAGE

   Route:
   /message

   SEO:
   - Unique metadata title and description
   - Canonical URL
   - Open Graph
   - Twitter/X social sharing
   - Schema.org ContactPage
   - Schema.org HealthClub
   - Schema.org BreadcrumbList
   - Real business contact information
   - Semantic HTML
   - Server-rendered page
   - No duplicated Navbar or Footer

   Future page sections can be added without changing
   this metadata or structured-data architecture.
========================================================= */


/* =========================================================
   PAGE CONFIGURATION
========================================================= */

const PAGE_PATH = "/message"

const PAGE_TITLE =
  "Contact Our Boxing Gym in Wichita, KS"

const PAGE_DESCRIPTION =
  "Contact Rebel Boxing Club in Wichita, Kansas. Ask about no-contact boxing fitness classes, personal training, group sessions, class schedules, or visiting our gym."

const PAGE_IMAGE =
  "/images/contact/contact-header.jpg"

const PAGE_IMAGE_ALT =
  "Inside Rebel Boxing Club's boxing and fitness training facility in Wichita, Kansas."


/* =========================================================
   CANONICAL & ABSOLUTE URLS

   All public URLs are derived from config/site.ts.

   Set NEXT_PUBLIC_APP_URL to the real production domain
   when deploying.
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

   Works with metadataBase and title.template defined
   in the root app/layout.tsx.
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
}


/* =========================================================
   BUSINESS SCHEMA

   Data source:
   config/site.ts

   Do not hardcode different contact details here.

   When siteConfig is updated, structured data receives
   the updated business information automatically.
========================================================= */

const businessSchema = {
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
    siteConfig.hours.map((schedule) => ({
      "@type": "OpeningHoursSpecification",

      dayOfWeek:
        schedule.dayOfWeek.map(
          (day) => `https://schema.org/${day}`
        ),

      opens: schedule.opens,

      closes: schedule.closes,
    })),

  contactPoint: {
    "@type": "ContactPoint",

    telephone: siteConfig.contact.phone,

    email: siteConfig.contact.email,

    contactType: "customer service",

    availableLanguage: ["English"],
  },
}


/* =========================================================
   CONTACT PAGE SCHEMA

   ContactPage is a specific Schema.org WebPage type.

   Connects the contact page to the existing business
   entity through a consistent @id.
========================================================= */

const contactPageSchema = {
  "@type": "ContactPage",

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

  mainEntity: {
    "@id": `${siteUrl}#organization`,
  },

  primaryImageOfPage: {
    "@type": "ImageObject",

    "@id": `${pageUrl}#primaryimage`,

    contentUrl: imageUrl,

    url: imageUrl,

    caption: PAGE_IMAGE_ALT,
  },

  breadcrumb: {
    "@id": `${pageUrl}#breadcrumb`,
  },
}


/* =========================================================
   WEBSITE SCHEMA

   Provides the WebSite entity referenced by ContactPage.

   Uses the same stable ID across website pages.
========================================================= */

const websiteSchema = {
  "@type": "WebSite",

  "@id": `${siteUrl}#website`,

  name: siteConfig.name,

  url: siteUrl,

  description: siteConfig.description,

  inLanguage: "en-US",

  publisher: {
    "@id": `${siteUrl}#organization`,
  },
}


/* =========================================================
   BREADCRUMB SCHEMA

   Home → Contact Us

   Represents the real page hierarchy.
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

      name: "Contact Us",

      item: pageUrl,
    },
  ],
}


/* =========================================================
   STRUCTURED DATA GRAPH

   One JSON-LD script rather than multiple disconnected
   declarations.

   Stable entity identifiers:
   - #website
   - #organization
   - #webpage
   - #breadcrumb
   - #primaryimage
========================================================= */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    websiteSchema,

    businessSchema,

    contactPageSchema,

    breadcrumbSchema,
  ],
}


/* =========================================================
   SAFE JSON-LD SERIALIZATION

   Escaping '<' prevents HTML/script-breaking content
   from being interpreted as markup.
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
   CONTACT PAGE

   SEO / ACCESSIBILITY STRUCTURE:

   - Single main landmark
   - Contact Hero contains the page's only H1
   - Subsequent sections use H2
   - JSON-LD rendered on the server
   - Navbar/Footer rendered by public layout
   - No unnecessary client-side JavaScript
========================================================= */

export default function ContactPage() {
  return (
    <>
      {/* ===================================================
          SCHEMA.ORG STRUCTURED DATA
      ==================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            structuredData
          ),
        }}
      />


      {/* ===================================================
          MAIN PAGE
      ==================================================== */}

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
        {/* =================================================
            SECTION 01 — CONTACT HERO

            H1:
            Let's Talk Training.

            Image:
            /images/contact/contact-header.jpg
        ================================================== */}

        <ContactPageHeroSection />


        {/* =================================================
            SECTION 02 — CONTACT INFORMATION + FORM

            Future component:
            ContactInformationSection

            Required anchor:
            id="contact-form"

            The Hero's "Send a Message" button
            links to this anchor.
        ================================================== */}
        <ContactInformationSection />

        {/* =================================================
            SECTION 03 — OUR LOCATION

            Future component:
            ContactLocationSection

            Use real business address and map data
            sourced from siteConfig.
        ================================================== */}
        <ContactLocationSection />


        {/* =================================================
            SECTION 04 — TRAINING OPTIONS

            Future component:
            ContactTrainingOptionsSection

            Private Training
            Group Fitness Classes
            Class Schedule
        ================================================== */}
        <ContactTrainingOptionsSection />

        {/* =================================================
            SECTION 05 — FREQUENTLY ASKED QUESTIONS

            Future component:
            ContactFaqSection

            Add FAQ content without changing this
            page-level SEO architecture.
        ================================================== */}
        <ContactFaqSection />

        {/* =================================================
            SECTION 06 — FINAL CTA

            Future component:
            ContactClosingSection

            Can reuse the existing ContactCtaSection
            or a page-specific wrapper.
        ================================================== */}
      </main>
    </>
  )
}
