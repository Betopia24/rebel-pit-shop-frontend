import type {
  Metadata,
} from "next"

import {
  ClassesHeroSection,
} from "./_components/classes-hero-section"
import { ClassesGoalFinderSection } from "./_components/classes-goal-finder-section"
import { ClassesFormatsSection } from "./_components/classes-formats-section"
import {
  ClassStructureSection,
} from "./_components/class-structure-section"
import {
  GroupClassesSection,
} from "./_components/group-classes-section"
import {
  PersonalTrainingSection,
} from "./_components/personal-training-section"
import {
  OpenGymSection,
} from "./_components/open-gym-section"
import {
  ClassesFirstVisitSection,
} from "./_components/classes-first-visit-section"
import {
  siteConfig,
} from "@/config/site"
import { absoluteUrl } from "@/lib/seo"

/* =========================================================
   PAGE CONSTANTS
========================================================= */

const PAGE_PATH =
  "/classes"

const PAGE_TITLE =
  "Boxing & Kickboxing Classes in Wichita, KS"

const PAGE_DESCRIPTION =
  "Explore boxing fitness, kickboxing, personal training, nutrition coaching, youth conditioning, online training, and open gym options at Rebel Boxing Club in Wichita, Kansas. Find the training style that fits your goals."

const PAGE_IMAGE =
  "/images/classes/classes-header.jpg"

/* =========================================================
   URL HELPERS
========================================================= */

const siteUrl = absoluteUrl("/")

const pageUrl = absoluteUrl(PAGE_PATH)

const imageUrl = absoluteUrl(PAGE_IMAGE)

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata =
  {
    title:
      PAGE_TITLE,

    description:
      PAGE_DESCRIPTION,

    keywords: [
      "boxing classes Wichita KS",
      "kickboxing classes Wichita KS",
      "boxing fitness Wichita",
      "kickboxing fitness Wichita",
      "boxing gym Wichita KS",
      "boxing training Wichita",
      "personal training Wichita KS",
      "boxing personal trainer Wichita",
      "nutrition coaching Wichita",
      "youth conditioning Wichita",
      "online personal training Wichita",
      "open gym Wichita KS",
      "beginner boxing classes Wichita",
      "no contact boxing Wichita",
      "Rebel Boxing Club",
    ],

    category:
      "Fitness",

    alternates: {
      canonical:
        pageUrl,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet":
          -1,

        "max-video-preview":
          -1,
      },
    },

    openGraph: {
      type: "website",

      url:
        pageUrl,

      siteName:
        siteConfig.name,

      title:
        PAGE_TITLE,

      description:
        PAGE_DESCRIPTION,

      locale:
        "en_US",

      images: [
        {
          url:
            imageUrl,

          width:
            1200,

          height:
            630,

          alt:
            "Training at Rebel Boxing Club in Wichita, Kansas",
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        PAGE_TITLE,

      description:
        PAGE_DESCRIPTION,

      images: [
        imageUrl,
      ],
    },
  }

/* =========================================================
   TRAINING OPTIONS

   This centralized list is used only for structured data.

   Actual UI data should stay inside:
   features/classes-page/

   No pricing is included here because pricing belongs to
   dedicated membership / service content and some personal
   training pricing varies by coach and program.
========================================================= */

const trainingOptions = [
  {
    name:
      "Boxing Fitness Classes",

    description:
      "Coach-led, no-contact boxing fitness classes that teach real boxing technique while delivering a full-body workout.",
  },

  {
    name:
      "Kickboxing Fitness Classes",

    description:
      "Coach-led kickboxing fitness classes combining punching, kicking, technique, conditioning, and full-body training.",
  },

  {
    name:
      "Weights Training",

    description:
      "Individualized strength and resistance training built around the client's goals and training needs.",
  },

  {
    name:
      "Technical Boxing and Mitts Coaching",

    description:
      "One-on-one technical boxing coaching focused on boxing skills, technique, combinations, and mitt work.",
  },

  {
    name:
      "Nutrition Coaching",

    description:
      "Personalized nutrition coaching focused on sustainable progress and individual goals.",
  },

  {
    name:
      "Youth Conditioning",

    description:
      "Individualized conditioning programs for members under 16.",
  },

  {
    name:
      "Online Training",

    description:
      "Virtual coaching and individualized training programs available remotely.",
  },

  {
    name:
      "Open Gym",

    description:
      "Self-directed access to heavy bags, weights, cardio equipment, turf space, and gym training equipment.",
  },
] as const

/* =========================================================
   STRUCTURED DATA
========================================================= */

const structuredData = {
  "@context":
    "https://schema.org",

  "@graph": [
    /* =====================================================
       WEBSITE
    ====================================================== */

    {
      "@type":
        "WebSite",

      "@id":
        `${siteUrl}#website`,

      url:
        siteUrl,

      name:
        siteConfig.name,

      inLanguage:
        "en-US",
    },

    /* =====================================================
       BUSINESS
    ====================================================== */

    {
      "@type":
        "HealthClub",

      "@id":
        `${siteUrl}#organization`,

      name:
        siteConfig.business.name,

      url:
        siteUrl,

      telephone:
        siteConfig.contact.phone,

      email:
        siteConfig.contact.email,

      address: {
        "@type":
          "PostalAddress",

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

      image:
        imageUrl,

      sameAs: [
        "https://www.facebook.com/rebelboxingclub",
        "https://www.instagram.com/rebelboxingclub",
      ],
    },

    /* =====================================================
       PRIMARY IMAGE
    ====================================================== */

    {
      "@type":
        "ImageObject",

      "@id":
        `${pageUrl}#primaryimage`,

      url:
        imageUrl,

      contentUrl:
        imageUrl,

      caption:
        "Rebel Boxing Club training in Wichita, Kansas",

      representativeOfPage:
        true,
    },

    /* =====================================================
       CLASSES PAGE
    ====================================================== */

    {
      "@type":
        "CollectionPage",

      "@id":
        `${pageUrl}#webpage`,

      url:
        pageUrl,

      name:
        PAGE_TITLE,

      description:
        PAGE_DESCRIPTION,

      inLanguage:
        "en-US",

      isPartOf: {
        "@id":
          `${siteUrl}#website`,
      },

      about: {
        "@id":
          `${siteUrl}#organization`,
      },

      primaryImageOfPage: {
        "@id":
          `${pageUrl}#primaryimage`,
      },

      breadcrumb: {
        "@id":
          `${pageUrl}#breadcrumb`,
      },

      mainEntity: {
        "@id":
          `${pageUrl}#training-options`,
      },

      potentialAction: [
        {
          "@type":
            "ViewAction",

          target: [
            pageUrl,
          ],
        },

        {
          "@type":
            "ViewAction",

          name:
            "View Class Schedule",

          target: [
            `${siteUrl}/schedule`,
          ],
        },

        {
          "@type":
            "ContactAction",

          name:
            "Contact Rebel Boxing Club",

          target: [
            `${siteUrl}/message`,
          ],
        },
      ],
    },

    /* =====================================================
       TRAINING OPTIONS LIST

       ItemList is appropriate because this page is a
       collection of Rebel's different training options.
    ====================================================== */

    {
      "@type":
        "ItemList",

      "@id":
        `${pageUrl}#training-options`,

      name:
        "Rebel Boxing Club Training Options",

      numberOfItems:
        trainingOptions.length,

      itemListOrder:
        "https://schema.org/ItemListUnordered",

      itemListElement:
        trainingOptions.map(
          (
            item,
            index
          ) => ({
            "@type":
              "ListItem",

            position:
              index + 1,

            item: {
              "@type":
                "Service",

              name:
                item.name,

              description:
                item.description,

              provider: {
                "@id":
                  `${siteUrl}#organization`,
              },

              areaServed: {
                "@type":
                  "City",

                name:
                  "Wichita",
              },

              url:
                pageUrl,
            },
          })
        ),
    },

    /* =====================================================
       BREADCRUMBS
    ====================================================== */

    {
      "@type":
        "BreadcrumbList",

      "@id":
        `${pageUrl}#breadcrumb`,

      itemListElement: [
        {
          "@type":
            "ListItem",

          position:
            1,

          name:
            "Home",

          item:
            siteUrl,
        },

        {
          "@type":
            "ListItem",

          position:
            2,

          name:
            "Classes",

          item:
            pageUrl,
        },
      ],
    },
  ],
}

/* =========================================================
   SAFE JSON-LD SERIALIZER
========================================================= */

function serializeJsonLd(
  value: object
) {
  return JSON.stringify(
    value
  )
    .replace(
      /</g,
      "\\u003c"
    )
    .replace(
      />/g,
      "\\u003e"
    )
    .replace(
      /&/g,
      "\\u0026"
    )
}

/* =========================================================
   PAGE
========================================================= */

export default function ClassesPage() {
  return (
    <>
      {/* ===================================================
          STRUCTURED DATA
      ==================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              structuredData
            ),
        }}
      />

      {/* ===================================================
          PAGE CONTENT
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
        {/* ===============================================
            01 — HERO
        ================================================ */}

        <ClassesHeroSection />

        {/* ===============================================
            02 — FIND YOUR FIT

            Future:
           
        ================================================ */}
        <ClassesGoalFinderSection />

        <ClassesFormatsSection />

        {/* ===============================================
            03 — GROUP CLASSES

            Boxing Fitness
            Kickboxing Fitness

            Future:
            <GroupClassesSection />
        ================================================ */}

        <GroupClassesSection />

        {/* ===============================================
            04 — HOW A CLASS WORKS

            Warm-up
            3-minute rounds
            1-minute active rest
            Core finisher
            Cool down

            Future:
            
        ================================================ */}
        <ClassStructureSection />

        {/* ===============================================
            05 — PERSONAL TRAINING

            Weights Training
            Nutrition Coaching
            Technical Boxing / Mitts
            Youth Conditioning
            Online Training

            Future:
            <PersonalTrainingSection />
        ================================================ */}
        <PersonalTrainingSection />
        {/* ===============================================
            06 — OPEN GYM

            Future:
            <ClassesOpenGymSection />
        ================================================ */}

        <OpenGymSection />

        {/* ===============================================
            07 — FIRST VISIT

            Future:
            <ClassesFirstVisitSection />
        ================================================ */}
        <ClassesFirstVisitSection />

        {/* ===============================================
            08 — FAQ

            Future:
            <ClassesFaqSection />
        ================================================ */}

        {/* ===============================================
            09 — FINAL CTA

            Existing reusable component can be added here.

            Future:
            <ContactCtaSection />
        ================================================ */}
      </main>
    </>
  )
}
