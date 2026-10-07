
import Image from "next/image"
import Link from "next/link"

import {
  ArrowUpRight,
  MoveDownRight,
} from "lucide-react"

import { siteConfig } from "@/config/site"

import { getCoaches } from "@/features/about/services/get-coaches"

import type { Coach } from "@/features/about/types"

import { cn } from "@/lib/utils"


/* =========================================================
   MEET THE REBELS

   API-ready server component.

   Design:
   - One dedicated introduction per coach
   - Alternating editorial layout
   - Rebel black, gold and charcoal
   - Large coach portraits
   - Original image proportions maintained
   - Thin gold offset frames
   - Complete biographies
   - No repetitive small cards
   - No hover-based layout movement
   - Mobile-first and accessible
========================================================= */


export async function MeetTheRebelsSection() {
  const coaches = await getCoaches()

  return (
    <section
      id="meet-the-rebels"
      aria-labelledby="meet-the-rebels-heading"
      className="
        relative
        isolate
        overflow-hidden
        bg-background
        text-foreground
      "
    >
      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <div
        className="
          relative
          isolate
          overflow-hidden

          border-y
          border-foreground/10

          bg-surface-dark

          px-5
          py-14

          sm:px-7
          sm:py-16

          md:px-10

          lg:px-14
          lg:py-18

          xl:px-20

          2xl:px-24
        "
      >
        {/* SOFT GOLD ATMOSPHERE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-0

            bg-[radial-gradient(ellipse_at_50%_100%,var(--gold-08),transparent_65%)]
          "
        />

        <div
          className="
            relative
            z-20

            mx-auto
            flex
            w-full
            max-w-[1450px]
            flex-col
            items-center

            text-center
          "
        >
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
                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-primary

                sm:text-xs
              "
            >
              The People Behind Rebel
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-8
                bg-primary
              "
            />
          </div>

          {/* MAIN SECTION HEADING */}

          <h2
            id="meet-the-rebels-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.93]
              tracking-[-0.055em]

              text-[clamp(2.8rem,11vw,5.2rem)]

              sm:text-[clamp(3.8rem,8vw,6.4rem)]

              lg:text-[clamp(4.5rem,6vw,7rem)]
            "
          >
            Meet The{" "}
            <span className="rebel-gold-text">
              Rebels.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5
              max-w-[720px]

              text-sm
              leading-7
              text-text-secondary

              sm:text-base
              sm:leading-8
            "
          >
            Get to know the coaches behind Rebel
            Boxing Club. From boxing and kickboxing
            to nutrition and personal training,
            each brings experience and a passion
            for helping members improve.
          </p>

          {/* TEAM COUNT */}

          <div
            className="
              mt-7

              inline-flex
              items-center
              gap-3

              border-t
              border-foreground/15

              pt-5
            "
          >
            <span
              className="
                font-heading
                text-2xl
                font-black
                text-primary
              "
            >
              {String(coaches.length).padStart(2, "0")}
            </span>

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-text-secondary
              "
            >
              Meet Our Coaches
            </span>
          </div>
        </div>
      </div>


      {/* =====================================================
          INDIVIDUAL COACH SECTIONS

          Every coach gets their own introduction.

          Content comes entirely from getCoaches().
      ====================================================== */}

      <ol className="relative">
        {coaches.map((coach, index) => (
          <li key={coach.id}>
            <CoachProfile
              coach={coach}
              index={index}
            />
          </li>
        ))}
      </ol>


      {/* =====================================================
          PRIVATE / GROUP TRAINING CTA

          Grounded in the original About Us content.
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden

          border-t
          border-primary/20

          bg-surface-dark
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            bg-[radial-gradient(ellipse_at_85%_50%,var(--gold-10),transparent_55%)]
          "
        />

        <div
          className="
            relative
            z-20

            mx-auto
            flex
            w-full
            max-w-[1600px]

            flex-col

            gap-6

            px-5
            py-10

            sm:px-7

            md:px-10

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-12
            lg:px-14
            lg:py-12

            xl:px-20

            2xl:px-24
          "
        >
          <div className="max-w-[800px]">
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-primary
              "
            >
              Train With Our Team
            </span>

            <h3
              className="
                mt-3

                font-heading
                text-[clamp(1.8rem,4vw,2.9rem)]
                font-black
                uppercase

                leading-[1.03]
                tracking-[-0.04em]
              "
            >
              Take Your Training{" "}
              <span className="rebel-gold-text">
                Further.
              </span>
            </h3>

            <p
              className="
                mt-3
                max-w-[690px]

                text-sm
                leading-7
                text-text-secondary
              "
            >
              Get in contact with us today for
              information about private/group training
              if you want a deeper dive into technique
              and conditioning.
            </p>
          </div>

          <Link
            href={siteConfig.contactCta.button.href}
            className="
              group

              inline-flex
              min-h-12
              shrink-0

              items-center
              justify-center
              gap-5

              self-start

              rounded-md

              border
              border-primary/70

              bg-primary

              px-6

              text-[11px]
              font-bold
              uppercase
              tracking-[0.08em]

              text-primary-foreground

              shadow-(--shadow-gold-sm)

              transition-[background-color,box-shadow]
              duration-300

              hover:bg-gold-hover
              hover:shadow-(--shadow-gold-md)

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background

              motion-reduce:transition-none

              lg:self-center
            "
          >
            Talk to Our Team

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
    </section>
  )
}


/* =========================================================
   INDIVIDUAL COACH PROFILE

   Reusable presentation component.

   Props:
   - coach: fully typed Coach data
   - index: current visual position

   No content is hardcoded here.
========================================================= */

type CoachProfileProps = {
  coach: Coach
  index: number
}


function CoachProfile({
  coach,
  index,
}: CoachProfileProps) {
  const isReversed =
    index % 2 === 1

  const displayNumber =
    String(index + 1).padStart(2, "0")

  const headingId =
    `coach-${coach.slug}-heading`

  return (
    <section
      id={`coach-${coach.slug}`}
      aria-labelledby={headingId}
      className={cn(
        `
          relative
          isolate
          overflow-hidden

          border-b
          border-foreground/10
        `,
        isReversed
          ? "bg-surface/55"
          : "bg-background"
      )}
    >
      {/* =====================================================
          SUBTLE ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden="true"
        className={cn(
          `
            pointer-events-none

            absolute
            inset-0
            z-0
          `,
          isReversed
            ? `
                bg-[radial-gradient(ellipse_at_0%_55%,var(--gold-06),transparent_55%)]
              `
            : `
                bg-[radial-gradient(ellipse_at_100%_45%,var(--gold-06),transparent_55%)]
              `
        )}
      />


      {/* =====================================================
          PROFILE GRID
      ====================================================== */}

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

          gap-10

          px-5
          py-10

          sm:gap-12
          sm:px-7
          sm:py-12

          md:px-10

          lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)]
          lg:gap-16
          lg:px-14
          lg:py-14

          xl:gap-20
          xl:px-20
          xl:py-16

          2xl:px-24
        "
      >
        {/* ===================================================
            COACH PHOTOGRAPH

            Photo frame stays stationary on hover.
            Natural photo is fully visible.
        ==================================================== */}

        <figure
          className={cn(
            `
              relative
              isolate

              mx-auto

              w-full
              min-w-0
              max-w-[470px]
            `,
            isReversed
              ? `
                  lg:order-2
                  lg:ml-auto
                `
              : `
                  lg:order-1
                  lg:mr-auto
                `
          )}
        >
          <div className="relative isolate">
            {/* GOLD OFFSET OUTLINE */}

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
                border-gold-dark/60

                sm:translate-x-3
                sm:translate-y-3
              "
            />

            {/* MAIN FRAME */}

            <div
              className="
                relative
                z-10

                border
                border-foreground/20

                bg-surface-deep

                p-1.5

                shadow-(--shadow-card)

                sm:p-2
              "
            >
              <div
                className="
                  relative

                  aspect-square
                  w-full

                  overflow-hidden

                  bg-surface-dark
                "
              >
                <Image
                  src={coach.image.src}
                  alt={coach.image.alt}
                  fill
                  sizes="
                    (max-width: 639px) 100vw,
                    (max-width: 1023px) 470px,
                    38vw
                  "
                  className="
                    object-contain
                    object-center
                  "
                />

                {/* SUBTLE BOTTOM FADE */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    inset-x-0
                    bottom-0

                    h-1/3

                    bg-linear-to-t
                    from-background/35
                    to-transparent
                  "
                />
              </div>
            </div>

            {/* PROFILE NUMBER */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-0
                top-0
                z-20

                flex
                size-11

                -translate-x-1/4
                -translate-y-1/4

                items-center
                justify-center

                border
                border-gold-dark

                bg-background

                font-heading
                text-sm
                font-black

                text-primary

                sm:size-12
              "
            >
              {displayNumber}
            </div>

            {/* GOLD FRAME DETAIL */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                bottom-0
                right-0
                z-20

                h-0.75
                w-20

                translate-y-1

                bg-primary
              "
            />
          </div>

          <figcaption
            className="
              mt-5

              flex
              items-center
              justify-between
              gap-4

              text-[10px]
              font-bold
              uppercase

              tracking-[0.14em]

              text-text-muted
            "
          >
            <span>
              Rebel Boxing Club
            </span>

            <span>
              Coach {displayNumber}
            </span>
          </figcaption>
        </figure>


        {/* ===================================================
            COACH INTRODUCTION
        ==================================================== */}

        <div
          className={cn(
            `
              relative

              min-w-0
              max-w-[760px]
            `,
            isReversed
              ? "lg:order-1"
              : "lg:order-2"
          )}
        >
          {/* PROFILE EYEBROW */}

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

                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase

                tracking-[0.25em]

                text-primary

                sm:text-[11px]
              "
            >
              Meet the Coach
            </span>

            <span
              className="
                font-heading
                text-xs
                font-bold

                text-text-muted
              "
            >
              / {displayNumber}
            </span>
          </div>


          {/* COACH NAME */}

          <h3
            id={headingId}
            className="
              font-heading
              font-black
              uppercase

              leading-[0.9]
              tracking-[-0.055em]

              text-[clamp(3.2rem,11vw,5.2rem)]

              sm:text-[clamp(4rem,8vw,6rem)]

              lg:text-[clamp(3.7rem,5vw,6.1rem)]
            "
          >
            <span className="sr-only">
              Coach{" "}
            </span>

            <span className="rebel-gold-text">
              {coach.name}
            </span>
          </h3>


          {/* ROLE */}

          <p
            className="
              mt-4

              text-[12px]
              font-bold
              uppercase

              leading-6
              tracking-[0.09em]

              text-primary

              sm:text-[13px]
            "
          >
            {coach.role}
          </p>


          {/* EDITORIAL DIVIDER */}

          <div
            aria-hidden="true"
            className="
              mt-5

              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-0.5
                w-12

                bg-primary
              "
            />

            <span
              className="
                h-px
                flex-1

                bg-foreground/12
              "
            />
          </div>


          {/* COMPLETE BIOGRAPHY */}

          <div
            className="
              mt-5

              max-w-[720px]

              space-y-4

              text-[13px]
              leading-[1.85]

              text-text-secondary

              sm:text-sm
              sm:leading-[1.9]

              xl:text-[15px]
            "
          >
            {coach.biography.map(
              (paragraph, paragraphIndex) => (
                <p
                  key={`${coach.id}-paragraph-${paragraphIndex}`}
                >
                  {paragraph}
                </p>
              )
            )}
          </div>


          {/* SPECIALTIES */}

          {coach.specialties.length > 0 && (
            <div className="mt-6">
              <p
                className="
                  mb-3

                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.2em]

                  text-text-muted
                "
              >
                Areas of Expertise
              </p>

              <ul
                aria-label={`${coach.name}'s specialties`}
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {coach.specialties.map(
                  (specialty) => (
                    <li
                      key={specialty}
                      className="
                        inline-flex
                        min-h-8

                        items-center
                        gap-2

                        rounded-full

                        border
                        border-primary/25

                        bg-primary/5

                        px-3

                        text-[10px]
                        font-semibold

                        text-text-soft

                        sm:text-[11px]
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          size-1
                          rounded-full
                          bg-primary
                        "
                      />

                      {specialty}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}


          {/* PROFILE FOOTER */}

          <div
            className="
              mt-7

              flex
              items-center
              gap-3

              border-t
              border-foreground/10

              pt-5
            "
          >
            <MoveDownRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="
                size-4
                text-primary
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase

                tracking-[0.18em]

                text-text-muted
              "
            >
              The Rebel Team
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
