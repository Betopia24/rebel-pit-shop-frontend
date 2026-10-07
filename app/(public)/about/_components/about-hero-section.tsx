
import Image from "next/image"
import Link from "next/link"

import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react"

import { siteConfig } from "@/config/site"


/* =========================================================
   ABOUT US — HERO SECTION

   Rebel Boxing Club

   Goals:
   - Compact, premium cinematic hero
   - Match the existing dark/gold landing page
   - Reveal the next page section sooner
   - Preserve original About Us content
   - Responsive mobile, tablet and desktop layout
   - Semantic HTML and accessible CTA links
   - No client-side JavaScript required

   Desktop target:
   Approximately 580–650px depending on content.

   The section is content-safe: it can expand if
   typography or accessibility settings require it.
========================================================= */

const HERO_IMAGE =
  "/images/about-us/about-header.jpg"


const heroHighlights = [
  {
    id: "no-contact",
    number: "01",
    title: "No-Contact",
    description: "Group Fitness",
  },
  {
    id: "workouts",
    number: "02",
    title: "30 / 60 / 75",
    description: "Minute Workouts",
  },
  {
    id: "availability",
    number: "03",
    title: "7 Days",
    description: "A Week",
  },
] as const


export function AboutHeroSection() {
  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-heading"
      aria-describedby="about-hero-description"
      className="
        relative
        isolate

        flex
        min-h-[680px]
        w-full
        flex-col

        overflow-hidden
        bg-background

        sm:min-h-[660px]

        lg:min-h-[580px]

        xl:min-h-[610px]

        2xl:min-h-[625px]
      "
    >
      {/* =====================================================
          LAYER 0 — REAL GYM IMAGE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          overflow-hidden
        "
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="
            object-cover

            object-[58%_center]

            sm:object-[55%_center]

            lg:object-[55%_center]
          "
        />
      </div>


      {/* =====================================================
          MOBILE — CINEMATIC READABILITY OVERLAY

          Top: photo visible
          Bottom: strong contrast for text
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-10

          bg-[linear-gradient(180deg,rgb(var(--rgb-background)/0.15)_0%,rgb(var(--rgb-background)/0.38)_22%,rgb(var(--rgb-background)/0.81)_48%,rgb(var(--rgb-background)/0.97)_78%,rgb(var(--rgb-background)/1)_100%)]

          lg:hidden
        "
      />


      {/* =====================================================
          DESKTOP — LEFT-SIDE TEXT SAFE GRADIENT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-10

          hidden

          lg:block

          lg:bg-[linear-gradient(90deg,rgb(var(--rgb-background)/0.99)_0%,rgb(var(--rgb-background)/0.96)_20%,rgb(var(--rgb-background)/0.84)_37%,rgb(var(--rgb-background)/0.34)_65%,rgb(var(--rgb-background)/0.08)_100%)]
        "
      />


      {/* =====================================================
          TOP FADE

          Navbar remains transparent while this Hero
          is visible. This fade protects its readability.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-10

          h-28

          bg-linear-to-b
          from-background/65
          via-background/15
          to-transparent

          lg:h-32
        "
      />


      {/* =====================================================
          BOTTOM FADE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-10

          h-44

          bg-linear-to-t
          from-background
          via-background/45
          to-transparent
        "
      />


      {/* =====================================================
          GOLD ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-80
          top-1/4
          z-10

          size-160
          rounded-full

          bg-[radial-gradient(circle,var(--gold-05)_0%,transparent_65%)]
        "
      />


      {/* =====================================================
          LAYER 20 — HERO MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20

          mx-auto

          flex
          w-full
          max-w-[1600px]
          flex-1
          flex-col
          justify-end

          px-5
          pb-9
          pt-32

          sm:px-7
          sm:pb-10
          sm:pt-32

          md:px-10

          lg:justify-center
          lg:px-14
          lg:pb-8
          lg:pt-26

          xl:px-20
          xl:pt-28

          2xl:px-24
        "
      >
        <div className="max-w-[790px]">
          {/* =================================================
              EYEBROW
          ================================================== */}

          <div
            className="
              mb-5

              flex
              flex-wrap
              items-center
              gap-x-3
              gap-y-2

              sm:mb-6
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-8
                shrink-0

                bg-primary

                sm:w-10
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase

                tracking-[0.28em]

                text-primary

                sm:text-[11px]
              "
            >
              About Rebel Boxing Club
            </span>

            <span
              aria-hidden="true"
              className="
                size-1

                rotate-45

                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                uppercase

                tracking-[0.12em]

                text-text-secondary

                sm:text-[11px]
              "
            >
              Wichita, Kansas
            </span>
          </div>


          {/* =================================================
              MAIN HEADING

              Compact 3-line layout instead of 4 lines.
              This preserves the full original headline.
          ================================================== */}

          <h1
            id="about-hero-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.91]

              tracking-[-0.055em]

              text-[clamp(2.4rem,10vw,4.6rem)]

              sm:text-[clamp(3.4rem,8.2vw,5.2rem)]

              lg:text-[clamp(3.7rem,5vw,5.2rem)]

              xl:text-[clamp(4rem,4.6vw,5.2rem)]
            "
          >
            <span className="block text-foreground">
              We{" "}

              <span className="rebel-gold-text">
                Rebel
              </span>
            </span>

            <span
              className="
                mt-1
                block
                text-foreground
              "
            >
              Against The
            </span>

            <span
              className="
                mt-1
                block
                text-foreground
              "
            >
              Fitness{" "}

              <span className="rebel-gold-text">
                Norms.
              </span>
            </span>
          </h1>


          {/* =================================================
              DESCRIPTION

              Keep this concise. Detailed story content
              belongs in the next About Us section.
          ================================================== */}

          <div
            id="about-hero-description"
            className="
              mt-6

              flex
              max-w-[620px]
              gap-4

              sm:mt-7

              lg:mt-6
            "
          >
            <span
              aria-hidden="true"
              className="
                w-0.5
                shrink-0

                rounded-full

                bg-linear-to-b
                from-primary
                via-primary/70
                to-transparent
              "
            />

            <div className="min-w-0">
              <p
                className="
                  text-sm
                  font-semibold
                  leading-6

                  text-foreground

                  sm:text-base
                  sm:leading-7
                "
              >
                Boxing Fitness Classes. Cross &amp;
                Weights Training. Personalized Nutrition.
              </p>

              <p
                className="
                  mt-2.5

                  max-w-[550px]

                  text-[13px]
                  leading-6

                  text-text-soft

                  sm:text-sm
                  sm:leading-6
                "
              >
                Boxing pushes you to get better and be
                better with each and every workout.
              </p>
            </div>
          </div>


          {/* =================================================
              CTA BUTTONS
          ================================================== */}

          <div
            className="
              mt-6

              flex
              flex-wrap
              items-center
              gap-3

              sm:mt-7
            "
          >
            {/* PRIMARY BUTTON */}

            <Link
              href={siteConfig.hero.primaryCta.href}
              className="
                group

                inline-flex
                min-h-12
                items-center
                justify-center
                gap-4

                rounded-md

                border
                border-primary/70

                bg-primary

                px-5

                text-[11px]
                font-bold
                uppercase

                tracking-[0.07em]

                text-primary-foreground

                shadow-(--shadow-gold-sm)

                transition-[background-color,box-shadow,filter]
                duration-300
                ease-out

                hover:bg-gold-hover
                hover:shadow-(--shadow-gold-md)

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                motion-reduce:transition-none

                sm:min-h-12.5
                sm:px-7
                sm:text-xs
              "
            >
              <span>
                {siteConfig.hero.primaryCta.label}
              </span>

              <ArrowUpRight
                aria-hidden="true"
                className="
                  size-4

                  transition-transform
                  duration-300

                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5

                  motion-reduce:transform-none
                "
              />
            </Link>


            {/* SECONDARY BUTTON */}

            <Link
              href={siteConfig.contactCta.button.href}
              className="
                group

                inline-flex
                min-h-12
                items-center
                justify-center
                gap-4

                rounded-md

                border
                border-foreground/25

                bg-background/35

                px-5

                text-[11px]
                font-bold
                uppercase

                tracking-[0.07em]

                text-foreground

                backdrop-blur-md

                transition-[background-color,border-color,color]
                duration-300
                ease-out

                hover:border-primary/70
                hover:bg-primary/10
                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                motion-reduce:transition-none

                sm:min-h-12.5
                sm:px-7
                sm:text-xs
              "
            >
              <span>
                {siteConfig.contactCta.button.label}
              </span>

              <ArrowRight
                aria-hidden="true"
                className="
                  size-4

                  transition-transform
                  duration-300

                  group-hover:translate-x-1

                  motion-reduce:transform-none
                "
              />
            </Link>
          </div>
        </div>


        {/* ===================================================
            DESKTOP PHOTO CAPTION

            Smaller and positioned within the right
            image area, away from the main heading.
        ==================================================== */}

        <div
          className="
            pointer-events-none

            absolute

            bottom-14
            right-14

            hidden

            xl:block

            2xl:right-24
          "
        >
          <div
            className="
              border-r-2
              border-primary

              pr-4

              text-right
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase

                tracking-[0.24em]

                text-primary
              "
            >
              The Rebel Mindset
            </p>

            <p
              className="
                mt-2

                font-heading
                text-lg
                font-black
                uppercase

                leading-[1.05]
                tracking-tight

                text-foreground

                drop-shadow-[0_4px_18px_var(--overlay-black-70)]
              "
            >
              Get Better.
              <span className="block">
                Be Better.
              </span>
            </p>
          </div>
        </div>
      </div>


      {/* =====================================================
          LAYER 20 — COMPACT INFORMATION STRIP

          Reduced from the previous large strip.

          Desktop: single horizontal information row
          Mobile: three compact columns
      ====================================================== */}

      <div
        className="
          relative
          z-20

          w-full

          border-t
          border-foreground/12

          bg-background/65

          backdrop-blur-lg
        "
      >
        <div
          className="
            mx-auto

            flex
            w-full
            max-w-[1600px]
            items-center

            px-5

            sm:px-7

            md:px-10

            lg:px-14

            xl:px-20

            2xl:px-24
          "
        >
          <ul
            className="
              grid
              w-full
              grid-cols-3

              divide-x
              divide-foreground/12
            "
          >
            {heroHighlights.map((item) => (
              <li
                key={item.id}
                className="
                  flex
                  min-w-0
                  items-center
                  gap-2

                  px-2
                  py-4

                  first:pl-0

                  sm:gap-3
                  sm:px-5

                  lg:py-5
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    shrink-0

                    font-heading
                    text-[11px]
                    font-black

                    text-primary/80

                    sm:text-sm
                  "
                >
                  {item.number}
                </span>

                <div className="min-w-0">
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase

                      leading-4

                      text-foreground

                      sm:text-[11px]
                    "
                  >
                    {item.title}
                  </p>

                  <p
                    className="
                      text-[9px]
                      leading-4

                      text-text-muted

                      sm:text-[11px]
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>


          {/* DESKTOP SCROLL INDICATOR */}

          <a
            href="#about-story"
            aria-label="Discover our story"
            className="
              ml-6

              hidden
              shrink-0
              items-center
              gap-3

              border-l
              border-foreground/12

              pl-6

              text-[10px]
              font-semibold
              uppercase

              tracking-[0.12em]

              text-text-secondary

              transition-colors
              duration-200

              hover:text-primary

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary

              xl:inline-flex
            "
          >
            <span>Our Story</span>

            <ChevronDown
              aria-hidden="true"
              className="size-4"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
