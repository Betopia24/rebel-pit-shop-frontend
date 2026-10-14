
import Image from "next/image"
import Link from "next/link"

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
} from "lucide-react"

import { siteConfig } from "@/config/site"

import classFormatImage from "@/public/images/about-us/start-somewhere-e1609276061839.jpg"


/* =========================================================
   ABOUT US — HOW CLASSES WORK

   Design system:
   - Rebel cinematic black / gold
   - Compact editorial section
   - Image on left, content on right
   - Same frame treatment as Our Story
   - Natural image aspect ratio preserved
   - No excessive card animations
   - Fully responsive
   - Server Component
========================================================= */

const classDurations = [
  {
    id: "30-minutes",
    duration: "30",
    unit: "MINUTES",
  },
  {
    id: "60-minutes",
    duration: "60",
    unit: "MINUTES",
  },
  {
    id: "75-minutes",
    duration: "75",
    unit: "MINUTES",
  },
] as const


const workoutSteps = [
  {
    id: "warmup",
    number: "01",
    title: "Warm-Up",
  },
  {
    id: "rounds",
    number: "02",
    title: "3-Minute Rounds",
  },
  {
    id: "active-rest",
    number: "03",
    title: "1-Minute Active Rest",
  },
  {
    id: "cooldown",
    number: "04",
    title: "Core Finisher / Cool Down",
  },
] as const


export function HowClassesWorkSection() {
  return (
    <section
      id="how-classes-work"
      aria-labelledby="how-classes-work-heading"
      className="
        relative
        isolate
        overflow-hidden

        border-t
        border-foreground/8

        bg-background
        text-foreground

        py-14

        sm:py-16
        lg:py-18
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[radial-gradient(ellipse_at_0%_60%,var(--gold-06),transparent_45%),radial-gradient(ellipse_at_100%_10%,var(--gold-04),transparent_40%)]
        "
      />


      {/* TOP GOLD LINE */}

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
          via-primary/35
          to-transparent
        "
      />


      {/* =====================================================
          MAIN CONTAINER
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

          gap-12

          px-5

          sm:px-7

          md:px-10

          lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]
          lg:gap-14
          lg:px-14

          xl:gap-18
          xl:px-20

          2xl:px-24
        "
      >
        {/* ===================================================
            LEFT — IMAGE

            Same clean photo frame used in Our Story.
        ==================================================== */}

        <figure
          className="
            relative
            isolate

            mx-auto
            w-full
            min-w-0
            max-w-152.5

            lg:mr-auto
          "
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
                border-gold-dark/75

                sm:translate-x-3
                sm:translate-y-3
              "
            />


            {/* MAIN IMAGE FRAME */}

            <div
              className="
                relative
                z-10

                border
                border-foreground/60

                bg-surface-deep

                p-1.5

                shadow-(--shadow-card)

                sm:p-2
              "
            >
              <div
                className="
                  relative
                  overflow-hidden

                  bg-surface-dark
                "
              >
                {/* ORIGINAL IMAGE — NO CROPPING */}

                <Image
                  src={classFormatImage}
                  alt="Rebel Boxing Club training space with hanging heavy bags, boxing gloves, and a gym dog."
                  placeholder="blur"
                  sizes="
                    (max-width: 639px) 100vw,
                    (max-width: 1023px) 85vw,
                    45vw
                  "
                  className="
                    block
                    h-auto
                    w-full
                  "
                />


                {/* SUBTLE IMAGE GRADIENT */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    z-10

                    h-1/2

                    bg-[linear-gradient(0deg,rgb(var(--rgb-black)/0.85)_0%,rgb(var(--rgb-black)/0.25)_55%,transparent_100%)]
                  "
                />


                {/* PHOTO EDITORIAL CAPTION */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    bottom-5
                    left-5
                    z-20

                    max-w-[80%]

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
                        bg-primary
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase

                        tracking-[0.2em]

                        text-gold-soft

                        sm:text-[10px]
                      "
                    >
                      Inside Rebel
                    </span>
                  </div>

                  <p
                    className="
                      font-heading
                      text-[clamp(1.3rem,3.4vw,2.2rem)]
                      font-black
                      uppercase

                      leading-[0.98]
                      tracking-[-0.045em]

                      text-foreground

                      drop-shadow-[0_3px_12px_var(--overlay-black-70)]
                    "
                  >
                    Every Class.

                    <span
                      className="
                        mt-1
                        block

                        text-gold-soft
                      "
                    >
                      A New Challenge.
                    </span>
                  </p>

                  <span
                    aria-hidden="true"
                    className="
                      mt-3
                      block

                      h-0.5
                      w-20
                      -rotate-2

                      bg-primary
                    "
                  />
                </div>
              </div>
            </div>


            {/* CORNER NUMBER BADGE */}

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
              02
            </div>


            {/* BOTTOM GOLD ACCENT */}

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
              font-semibold
              uppercase

              tracking-[0.14em]

              text-text-muted
            "
          >
            <span>
              The Rebel Experience
            </span>

            <span>
              Wichita, Kansas
            </span>
          </figcaption>
        </figure>


        {/* ===================================================
            RIGHT — CLASS INFORMATION
        ==================================================== */}

        <div
          className="
            relative
            min-w-0
            max-w-177.5
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

                tracking-[0.26em]

                text-primary

                sm:text-[11px]
              "
            >
              The Training Experience
            </span>

            <span
              aria-hidden="true"
              className="
                size-1
                rotate-45
                bg-primary
              "
            />
          </div>


          {/* HEADING */}

          <h2
            id="how-classes-work-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.94]
              tracking-[-0.045em]

              text-[clamp(2.6rem,10vw,4rem)]

              sm:text-[clamp(3.2rem,7vw,4.5rem)]

              lg:text-[clamp(2.8rem,4.1vw,4.4rem)]
            "
          >
            <span className="block">
              How Classes
            </span>

            <span
              className="
                mt-1
                block
                rebel-gold-text
              "
            >
              Work.
            </span>
          </h2>


          {/* ORIGINAL CONTENT */}

          <div
            className="
              mt-5
              max-w-165

              space-y-3.5

              text-[13px]
              leading-[1.8]

              text-text-secondary

              sm:mt-6
              sm:text-sm

              xl:text-[15px]
            "
          >
            <p>
              Each of our{" "}
              <strong className="font-semibold text-foreground">
                classes are structured in either 30,
                60, or 75 minute workouts
              </strong>
              . All classes are broken down into a
              warm-up, 3 minute rounds with a minute
              active rest in between rounds, and a
              core finisher/cool down at the end of
              each workout.{" "}
              <Link
                href="/schedule"
                className="
                  font-semibold
                  text-primary
                  underline
                  decoration-primary/40
                  underline-offset-4

                  transition-colors
                  hover:text-gold-hover

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                "
              >
                Classes are 7 days a week
              </Link>
              , so you&apos;ll be sure to find a couple
              that fit your schedule!
            </p>

            <p>
              While our workouts are focused on
              boxing or kickboxing, you never quite
              know what you might get that day,{" "}
              <strong className="font-semibold text-foreground">
                making each class fully unique
              </strong>
              .
            </p>
          </div>


          {/* =================================================
              CLASS DURATION CARDS

              Fixed dimensions and no transform on the
              hover container to prevent border shaking.
          ================================================== */}

          <div
            aria-label="Available class durations"
            className="
              mt-7
              grid
              grid-cols-3

              gap-2.5

              sm:gap-3
            "
          >
            {classDurations.map((item) => (
              <div
                key={item.id}
                className="
                  relative
                  isolate

                  flex
                  min-w-0
                  flex-col
                  items-center
                  justify-center

                  overflow-hidden

                  rounded-md

                  border
                  border-foreground/12

                  bg-surface

                  px-2
                  py-4

                  text-center

                  transition-[border-color,background-color,box-shadow]
                  duration-300

                  hover:border-primary/50
                  hover:bg-surface-card
                  hover:shadow-(--shadow-card-soft)

                  sm:py-5
                "
              >
                <Clock3
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="
                    mb-2.5

                    size-4
                    text-primary

                    sm:size-5
                  "
                />

                <span
                  className="
                    font-heading
                    text-3xl
                    font-black

                    leading-none
                    tracking-[-0.04em]

                    text-foreground

                    sm:text-4xl
                  "
                >
                  {item.duration}
                </span>

                <span
                  className="
                    mt-1.5

                    text-[9px]
                    font-bold
                    uppercase

                    tracking-[0.14em]

                    text-text-muted

                    sm:text-[10px]
                  "
                >
                  {item.unit}
                </span>


                {/* BOTTOM GOLD LINE */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-1/2

                    h-0.5
                    w-9

                    -translate-x-1/2

                    bg-primary/70
                  "
                />
              </div>
            ))}
          </div>


          {/* =================================================
              WORKOUT STRUCTURE
          ================================================== */}

          <div className="mt-7">
            <div
              className="
                mb-3.5

                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.19em]

                  text-text-secondary
                "
              >
                Inside Every Workout
              </span>

              <span
                aria-hidden="true"
                className="
                  h-px
                  flex-1

                  bg-foreground/10
                "
              />
            </div>


            <ol
              className="
                grid
                grid-cols-2

                gap-x-4
                gap-y-4

                sm:grid-cols-4
                sm:gap-3
              "
            >
              {workoutSteps.map((step) => (
                <li
                  key={step.id}
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-2.5
                  "
                >
                  <span
                    className="
                      shrink-0

                      font-heading
                      text-[11px]
                      font-black

                      text-primary
                    "
                  >
                    {step.number}
                  </span>

                  <span
                    className="
                      text-[11px]
                      font-medium
                      leading-4.5

                      text-text-soft

                      sm:text-[11px]
                    "
                  >
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>


          {/* =================================================
              SCHEDULE CTA
          ================================================== */}

          <div
            className="
              mt-7

              flex
              flex-wrap
              items-center
              justify-between

              gap-5

              border-t
              border-foreground/10

              pt-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  size-10
                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-primary/30

                  bg-primary/5

                  text-primary
                "
              >
                <CalendarDays
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="size-5"
                />
              </span>

              <div>
                <p
                  className="
                    text-sm
                    font-semibold

                    text-foreground
                  "
                >
                  Classes 7 Days a Week
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs

                    text-text-muted
                  "
                >
                  Find a workout that fits your schedule.
                </p>
              </div>
            </div>


            <Link
              href={siteConfig.hero.primaryCta.href}
              className="
                group

                inline-flex
                min-h-11

                items-center
                justify-center

                gap-3

                rounded-md

                border
                border-primary/60

                bg-primary

                px-5

                text-[11px]
                font-bold
                uppercase

                tracking-[0.07em]

                text-primary-foreground

                shadow-(--shadow-gold-xs)

                transition-[background-color,box-shadow]
                duration-300

                hover:bg-gold-hover
                hover:shadow-(--shadow-gold-sm)

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                motion-reduce:transition-none
              "
            >
              View Schedule

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
      </div>
    </section>
  )
}
