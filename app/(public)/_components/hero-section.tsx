import Link from "next/link"

import {
  ArrowRight,
  Dumbbell,
  UserRound,
  UsersRound,
} from "lucide-react"

import { siteConfig } from "@/config/site"


/* =========================================================
   HERO HIGHLIGHT ICONS

   Content stays in siteConfig.
   Only visual icon mapping lives here.
========================================================= */

const heroHighlightIcons = {
  "all-levels": UsersRound,
  "group-classes": Dumbbell,
  "personal-training": UserRound,
} as const


/* =========================================================
   HERO SECTION

   Layer system:

   z-0
   └── Video / poster

   z-10
   └── Visual overlays / gradients

   z-20
   └── Actual page content

   z-30
   └── Decorative section edge

   Navbar:
   z-[var(--z-navbar)]

   This prevents the negative-z-index problems that can
   occur with isolated sections.
========================================================= */

export function HeroSection() {
  const { hero } = siteConfig


  return (
    <section
      aria-labelledby="hero-heading"
      aria-describedby="hero-description"
      className="
        relative
        isolate

        flex
        min-h-svh
        w-full
        items-end

        overflow-hidden

        bg-background

        xl:items-center
      "
    >
      {/* =====================================================
          LAYER 0 — VIDEO / POSTER

          Poster is also used as CSS background so that
          there is always a visual fallback while the
          video is loading or when reduced motion hides it.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0

          bg-cover
          bg-position-[58%_center]
          bg-no-repeat

          md:bg-position-[60%_center]

          xl:bg-position-[62%_center]
        "
        style={{
          backgroundImage:
            `url(${hero.media.poster})`,
        }}
      >
      <video
        data-hero-video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={hero.media.poster}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          className="
            size-full

            object-cover
            object-[58%_center]

            md:object-[60%_center]

            xl:object-[62%_center]

            motion-reduce:hidden
          "
        >
          <source
            src={hero.media.video}
            type="video/mp4"
          />
        </video>
      </div>


      {/* =====================================================
          LAYER 10 — BASE VIDEO DARKENING
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-10

          bg-background/20

          md:bg-background/16

          xl:bg-background/10
        "
      />


      {/* =====================================================
          LAYER 10 — MOBILE / TABLET TEXT-SAFE GRADIENT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-10

          bg-[linear-gradient(180deg,var(--overlay-black-10)_0%,rgb(var(--rgb-black)/0.06)_25%,var(--overlay-black-20)_43%,rgb(var(--rgb-black)/0.78)_68%,rgb(var(--rgb-black)/0.97)_100%)]

          xl:hidden
        "
      />


      {/* =====================================================
          LAYER 10 — DESKTOP TEXT-SAFE GRADIENT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-10

          hidden

          xl:block

          xl:bg-[linear-gradient(90deg,rgb(var(--rgb-black)/0.97)_0%,rgb(var(--rgb-black)/0.92)_20%,rgb(var(--rgb-black)/0.78)_34%,rgb(var(--rgb-black)/0.52)_47%,rgb(var(--rgb-black)/0.18)_62%,rgb(var(--rgb-black)/0.02)_80%,transparent_100%)]
        "
      />


      {/* =====================================================
          LAYER 10 — SUBTLE GOLD CONTENT GLOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-10

          hidden

          bg-[radial-gradient(circle_at_17%_61%,var(--gold-06),transparent_28%)]

          xl:block
        "
      />


      {/* =====================================================
          LAYER 10 — NAVBAR READABILITY

          Navbar is fixed and overlays the Hero.
          This gradient preserves the original cinematic
          navbar readability without giving the Navbar
          a large solid bar.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-10

          h-36

          bg-linear-to-b
          from-background/60
          via-background/20
          to-transparent
        "
      />


      {/* =====================================================
          LAYER 10 — BOTTOM FADE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-10

          h-40

          bg-linear-to-t
          from-background/85
          via-background/18
          to-transparent

          xl:h-28
        "
      />


      {/* =====================================================
          LAYER 20 — CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20

          w-full

          px-5
          pb-8
          pt-28

          sm:px-7
          sm:pb-10

          md:px-10
          md:pb-12
          md:pt-32

          lg:px-14

          xl:px-20
          xl:pb-12
          xl:pt-32

          2xl:px-24
        "
      >
        <div
          className="
            max-w-147.5

            sm:max-w-155

            md:max-w-162.5

            lg:max-w-170

            xl:max-w-207.5
            xl:translate-y-4
          "
        >
          {/* =================================================
              EYEBROW
          ================================================== */}

          <div
            className="
              mb-4

              flex
              items-center
              gap-3.5

              sm:mb-5
              sm:gap-4
            "
          >
            <span
              className="
                text-[11px]
                font-bold
                uppercase

                tracking-[0.32em]

                text-primary

                sm:text-xs

                xl:text-[13px]
              "
            >
              {hero.eyebrow}
            </span>


            <span
              aria-hidden="true"
              className="
                h-px
                w-10
                shrink-0

                bg-primary

                sm:w-12
              "
            />
          </div>


          {/* =================================================
              H1

              Homepage primary heading.
              Only one H1 should exist on the homepage.
          ================================================== */}

          <h1
            id="hero-heading"
            className="
              max-w-none

              font-heading
              font-black
              uppercase

              leading-[0.89]

              tracking-[-0.048em]

              text-foreground

              text-[clamp(2.45rem,11.8vw,4.65rem)]

              sm:text-[clamp(3.5rem,9vw,5.05rem)]

              md:text-[clamp(4rem,7.3vw,5.5rem)]

              lg:text-[clamp(4.35rem,6vw,5.8rem)]

              xl:text-[clamp(4.8rem,5vw,6.1rem)]
            "
          >
            <span
              className="
                block

                drop-shadow-[0_4px_18px_var(--overlay-black-35)]
              "
            >
              {hero.title}
            </span>


            <span
              className="
                rebel-gold-text

                mt-1
                block

                whitespace-nowrap

                drop-shadow-[0_4px_24px_var(--gold-10)]
              "
            >
              {hero.accentTitle}
            </span>
          </h1>


          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            id="hero-description"
            className="
              mt-5

              max-w-125

              text-sm
              leading-6.5

              text-text-soft

              sm:mt-6
              sm:text-[15px]
              sm:leading-7

              md:max-w-130
              md:text-base

              xl:max-w-135
              xl:text-[17px]
              xl:leading-7.5
            "
          >
            {hero.description}
          </p>


          {/* =================================================
              CTA GROUP
          ================================================== */}

          <div
            className="
              mt-7

              flex
              w-full
              flex-col

              gap-3

              min-[430px]:w-auto
              min-[430px]:flex-row

              sm:mt-8
              sm:gap-3.5
            "
          >
            {/* ===============================================
                PRIMARY CTA
            ================================================ */}

            <Link
              href={hero.primaryCta.href}
              className="
                group

                rebel-gold-surface

                inline-flex
                min-h-12
                items-center
                justify-center

                gap-3

                rounded-md

                border
                border-gold-hover

                px-6

                text-[13px]
                font-bold
                uppercase

                tracking-[0.075em]

                shadow-[var(--shadow-gold-sm)]

                transition-[transform,box-shadow,filter]
                duration-300
                ease-out

                hover:-translate-y-0.5
                hover:brightness-105
                hover:shadow-[var(--shadow-gold-md)]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                motion-reduce:transform-none
                motion-reduce:transition-none

                sm:min-w-48
              "
            >
              <span>
                {hero.primaryCta.label}
              </span>

              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="
                  size-4
                  shrink-0

                  transition-transform
                  duration-300

                  group-hover:translate-x-1

                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              />
            </Link>


            {/* ===============================================
                SECONDARY CTA
            ================================================ */}

            <Link
              href={hero.secondaryCta.href}
              className="
                inline-flex
                min-h-12
                items-center
                justify-center

                rounded-md

                border
                border-foreground/20

                bg-background/20

                px-6

                text-[13px]
                font-bold
                uppercase

                tracking-[0.075em]

                text-foreground

                shadow-[inset_0_1px_0_var(--white-04)]

                backdrop-blur-md

                transition-[background-color,border-color,color,transform]
                duration-300

                hover:-translate-y-0.5
                hover:border-primary/55
                hover:bg-primary/6
                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                motion-reduce:transform-none
                motion-reduce:transition-none

                sm:min-w-44
              "
            >
              {hero.secondaryCta.label}
            </Link>
          </div>


          {/* =================================================
              HERO HIGHLIGHTS
          ================================================== */}

          <ul
            aria-label="Training highlights"
            className="
              mt-7

              flex
              flex-wrap

              gap-2

              sm:mt-8
              sm:gap-2.5
            "
          >
            {hero.highlights.map(
              (item) => {
                const Icon =
                  heroHighlightIcons[
                    item.id
                  ]


                return (
                  <li
                    key={item.id}
                    className="
                      inline-flex
                      min-h-9
                      items-center

                      gap-2

                      rounded-full

                      border
                      border-foreground/14

                      bg-background/25

                      px-3.5
                      py-1.5

                      text-[11px]
                      font-medium

                      text-text-soft

                      shadow-[inset_0_1px_0_var(--white-02)]

                      backdrop-blur-md

                      sm:px-4
                      sm:text-xs

                      xl:text-[13px]
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.8}
                      className="
                        size-4
                        shrink-0

                        text-primary
                      "
                    />

                    <span>
                      {item.label}
                    </span>
                  </li>
                )
              }
            )}
          </ul>
        </div>
      </div>


      {/* =====================================================
          LAYER 30 — BOTTOM ACCENT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-30

          hidden
          h-px

          bg-[var(--gradient-gold-line)]

          xl:block
        "
      />
    </section>
  )
}
