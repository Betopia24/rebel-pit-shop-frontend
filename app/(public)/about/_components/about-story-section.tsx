
import Image from "next/image"
import Link from "next/link"

import {
  ArrowUpRight,
  Check,
} from "lucide-react"

import { siteConfig } from "@/config/site"

import boxingClassesImage from "@/public/images/about-us/boxing-classes-e1609275907564.jpg"


/* =========================================================
   ABOUT US — OUR STORY

   Premium editorial layout

   Image improvements:
   - No large solid gold backing
   - Thin gold offset outline
   - Clean rectangular photo mat
   - Natural image dimensions preserved
   - Slogan positioned inside the image
   - No clip-path distortion
   - Responsive frame composition

   Uses centralized Rebel design tokens.
========================================================= */

const amenities = [
  {
    id: "weights",
    label: "Weight Training",
  },
  {
    id: "cardio",
    label: "Cardio Equipment",
  },
  {
    id: "turf",
    label: "Turf Area",
  },
] as const


export function AboutStorySection() {
  return (
    <section
      id="about-story"
      aria-labelledby="about-story-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-foreground
        text-background

        py-12
        sm:py-14
        lg:py-16
      "
    >
      {/* BACKGROUND ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_4%_90%,var(--gold-08),transparent_35%)]
        "
      />


      {/* SECTION TOP ACCENT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-10

          h-px

          bg-linear-to-r
          from-transparent
          via-gold-dark/40
          to-transparent
        "
      />


      {/* MAIN CONTENT */}

      <div
        className="
          relative
          z-20

          mx-auto
          grid
          w-full
          max-w-[1600px]
          grid-cols-1
          items-center

          gap-11

          px-5

          sm:px-7
          md:px-10

          lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]
          lg:gap-12
          lg:px-14

          xl:gap-16
          xl:px-20

          2xl:px-24
        "
      >
        {/* ===================================================
            LEFT — STORY
        ==================================================== */}

        <div className="relative min-w-0 max-w-[640px]">
          {/* EYEBROW */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-8
                bg-gold-dark
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.26em]
                text-gold-dark

                sm:text-[11px]
              "
            >
              The Rebel Philosophy
            </span>

            <span
              aria-hidden="true"
              className="
                size-1
                rotate-45
                bg-gold-dark
              "
            />
          </div>


          {/* HEADING */}

          <h2
            id="about-story-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.94]
              tracking-[-0.045em]

              text-[clamp(2.15rem,9.2vw,3.6rem)]

              sm:text-[clamp(2.8rem,6.6vw,4rem)]

              lg:text-[clamp(2.4rem,3.6vw,3.7rem)]
            "
          >
            <span className="block">
              No-Contact
            </span>

            <span className="mt-1 block">
              Group Fitness
            </span>

            <span className="mt-1 block">
              That&apos;s{" "}
              <span
                className="
                  relative
                  inline-block
                  italic
                  text-gold-dark
                "
              >
                Fun.

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-1
                    left-0
                    right-0
                    h-0.75
                    -rotate-2
                    bg-gold-dark/60
                  "
                />
              </span>
            </span>
          </h2>


          {/* ORIGINAL CONTENT */}

          <div
            className="
              mt-5
              max-w-[575px]
              space-y-3.5

              text-[13px]
              leading-[1.75]
              text-background/75

              sm:mt-6
              sm:text-sm
              sm:leading-[1.8]

              xl:text-[15px]
            "
          >
            <p>
              At Rebel, we love boxing because it allows
              us and our members to constantly work to
              better ourselves.{" "}
              <strong className="font-semibold text-background">
                Boxing pushes you to get better and be
                better
              </strong>{" "}
              with each and every workout. But we also
              love boxing because{" "}
              <strong className="font-semibold text-background">
                it&apos;s simply one of the best full-body
                workouts
              </strong>
              .
            </p>

            <p>
              In addition to boxing classes,{" "}
              <strong className="font-semibold text-background">
                members can enjoy our full amenities
              </strong>
              , including{" "}
              <strong className="font-semibold text-background">
                weight training area, cardio equipment,
                and our turf
              </strong>
              . Come in and make your own workout or
              get in a lift before your class.
            </p>
          </div>


          {/* AMENITIES */}

          <ul
            aria-label="Rebel gym amenities"
            className="
              mt-5
              flex
              flex-wrap
              gap-2

              sm:mt-6
            "
          >
            {amenities.map((amenity) => (
              <li
                key={amenity.id}
                className="
                  inline-flex
                  min-h-8
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-background/15

                  bg-background/5

                  px-3

                  text-[10px]
                  font-semibold
                  text-background/85

                  sm:text-[11px]
                "
              >
                <Check
                  aria-hidden="true"
                  className="
                    size-3
                    text-gold-dark
                  "
                />

                {amenity.label}
              </li>
            ))}
          </ul>


          {/* CTA */}

          <div className="mt-6">
            <Link
              href={siteConfig.hero.primaryCta.href}
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-between
                gap-6

                rounded-md

                border
                border-background

                bg-background

                px-6

                text-[11px]
                font-bold
                uppercase
                tracking-[0.065em]

                text-foreground

                transition-[background-color,border-color,color]
                duration-300

                hover:border-gold-dark
                hover:bg-gold-dark
                hover:text-background

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-gold-dark
                focus-visible:ring-offset-2
                focus-visible:ring-offset-foreground

                motion-reduce:transition-none
              "
            >
              <span>
                Explore Our Classes
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
          </div>
        </div>


        {/* ===================================================
            RIGHT — PREMIUM EDITORIAL IMAGE FRAME

            Frame hierarchy:

            1. Thin gold offset outline
            2. Dark outer photo mat
            3. Original image
            4. Subtle bottom gradient
            5. Slogan inside image
            6. Minimal number badge

            Important:
            Gold backing is now limited to the image
            container, NOT the entire figure.
        ==================================================== */}

        <figure
          className="
            relative
            isolate

            mx-auto
            w-full
            min-w-0
            max-w-[660px]

            lg:ml-auto
          "
        >
          <div className="relative isolate">
            {/* ===============================================
                GOLD OFFSET OUTLINE

                No solid fill.
                Creates a restrained layered frame.
            ================================================ */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                z-0

                translate-x-2
                translate-y-2

                border
                border-gold-dark/75

                sm:translate-x-3
                sm:translate-y-3
              "
            />


            {/* ===============================================
                MAIN PHOTO MAT
            ================================================ */}

            <div
              className="
                relative
                z-10

                border
                border-background/85

                bg-background

                p-1.5

                shadow-(--shadow-card)

                sm:p-2
              "
            >
              {/* PHOTO CONTAINER */}

              <div
                className="
                  relative
                  overflow-hidden
                  bg-surface-dark
                "
              >
                {/* ===========================================
                    IMAGE

                    No fill
                    No fixed height
                    No object-cover
                    No cropping

                    The original aspect ratio is preserved.
                ============================================ */}

                <Image
                  src={boxingClassesImage}
                  alt="A Rebel Boxing Club member practicing boxing with a heavy bag during a fitness class."
                  placeholder="blur"
                  sizes="
                    (max-width: 639px) 100vw,
                    (max-width: 1023px) 85vw,
                    50vw
                  "
                  className="
                    block
                    h-auto
                    w-full
                  "
                />


                {/* ===========================================
                    BOTTOM IMAGE GRADIENT

                    Keeps the slogan readable while
                    leaving the workout visible.
                ============================================ */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    inset-x-0
                    bottom-0
                    z-10

                    h-2/3

                    bg-[linear-gradient(0deg,rgb(var(--rgb-black)/0.88)_0%,rgb(var(--rgb-black)/0.44)_27%,transparent_80%)]
                  "
                />


                {/* ===========================================
                    PHOTO CAPTION / SLOGAN

                    Positioned INSIDE the photo,
                    so it cannot overlap the gold frame.
                ============================================ */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    bottom-4
                    left-4
                    z-20

                    max-w-[75%]

                    sm:bottom-7
                    sm:left-7
                  "
                >
                  <div
                    className="
                      mb-2.5

                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        h-px
                        w-6
                        bg-gold-highlight
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase

                        tracking-[0.22em]

                        text-gold-soft

                        sm:text-[10px]
                      "
                    >
                      The Rebel Experience
                    </span>
                  </div>


                  <p
                    className="
                      font-heading
                      text-[clamp(1.2rem,3vw,2rem)]
                      font-black
                      uppercase

                      leading-[0.98]
                      tracking-[-0.045em]

                      text-foreground

                      drop-shadow-[0_3px_12px_var(--overlay-black-70)]
                    "
                  >
                    More Than

                    <span
                      className="
                        mt-1
                        block
                        text-gold-soft
                      "
                    >
                      A Workout.
                    </span>
                  </p>


                  <span
                    className="
                      mt-3
                      block
                      h-0.5
                      w-20
                      -rotate-2

                      bg-gold-highlight
                    "
                  />
                </div>
              </div>
            </div>


            {/* ===============================================
                CORNER NUMBER BADGE

                Anchored to image container.
                Does not affect photo dimensions.
            ================================================ */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-0
                top-0
                z-20

                flex
                size-10
                -translate-x-1/4
                -translate-y-1/4

                items-center
                justify-center

                border
                border-gold-dark

                bg-background

                font-heading
                text-xs
                font-black

                text-primary

                shadow-(--shadow-card-soft)

                sm:size-12
                sm:text-sm
              "
            >
              01
            </div>


            {/* ===============================================
                BOTTOM-RIGHT GOLD DETAIL
            ================================================ */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                bottom-0
                right-0
                z-20

                h-0.75
                w-24

                translate-y-1

                bg-gold-dark
              "
            />
          </div>


          {/* =================================================
              IMAGE CREDIT / EDITORIAL FOOTER

              Separate from photo positioning.
          ================================================== */}

          <figcaption
            className="
              mt-5

              flex
              items-center
              justify-between
              gap-4

              text-[10px]
              font-semibold
              uppercase

              tracking-[0.14em]
              text-background/55
            "
          >
            <span>
              Rebel Boxing Club
            </span>

            <span>
              Wichita, Kansas
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
