import Link from "next/link"

import {
  ArrowUpRight,
  CalendarCheck2,
  Gauge,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"

import {
  buttonVariants,
} from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"

import { cn } from "@/lib/utils"

/* =========================================================
   SCHEDULE — FIRST VISIT SECTION

   Purpose:
   - Help first-time visitors feel confident booking
   - Avoid repeating schedule data
   - Use established Rebel information
   - Match Rebel dark / gold visual language
   - Server Component

   IMPORTANT:
   This project's Button component does NOT support
   the `asChild` prop.

   For links styled like buttons, use:

   Link + buttonVariants() + cn()
========================================================= */

const firstVisitSteps = [
  {
    number: "01",

    title: "Choose Your Class",

    description:
      "Pick a class and time that works for you. Rebel offers workouts throughout the week, with 30, 60, and 75 minute options.",

    icon: CalendarCheck2,
  },

  {
    number: "02",

    title: "Train At Your Pace",

    description:
      "Everyone starts somewhere. Movements can be modified, your pace can be adjusted, and additional rest can be taken when needed.",

    icon: Gauge,
  },

  {
    number: "03",

    title: "Your Coach Is There",

    description:
      "Rebel coaches are there to help you find what works for your ability while still giving you a challenging, rewarding workout.",

    icon: MessageCircle,
  },
] as const

export function ScheduleFirstVisitSection() {
  return (
    <section
      id="first-visit"
      aria-labelledby="first-visit-heading"
      className="
        relative
        isolate
        overflow-hidden

        border-t
        border-foreground/8

        bg-surface-deep
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

          bg-[radial-gradient(ellipse_at_10%_50%,var(--gold-06),transparent_42%),radial-gradient(ellipse_at_100%_100%,var(--gold-04),transparent_40%)]
        "
      />

      {/* =====================================================
          TOP GOLD ACCENT
      ====================================================== */}

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
          via-primary/45
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
          max-w-375

          grid-cols-1

          gap-10

          px-5

          sm:px-7

          md:px-10

          lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]
          lg:items-start
          lg:gap-14
          lg:px-14

          xl:gap-20
          xl:px-20
        "
      >
        {/* ===================================================
            LEFT — INTRODUCTION
        ==================================================== */}

        <div
          className="
            max-w-130

            lg:sticky
            lg:top-32
          "
        >
          {/* =================================================
              ICON
          ================================================== */}

          <div
            className="
              mb-6

              flex
              size-11

              items-center
              justify-center

              rounded-full

              border
              border-primary/35

              bg-primary/5

              text-primary
            "
          >
            <ShieldCheck
              aria-hidden={true}
              strokeWidth={1.6}
              className="size-5"
            />
          </div>

          {/* =================================================
              EYEBROW
          ================================================== */}

          <div
            className="
              mb-4

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

                tracking-[0.27em]

                text-primary

                sm:text-[11px]
              "
            >
              New To Rebel?
            </span>
          </div>

          {/* =================================================
              HEADING
          ================================================== */}

          <h2
            id="first-visit-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.94]
              tracking-tighter

              text-[clamp(2.7rem,9vw,4rem)]

              sm:text-[clamp(3.1rem,6vw,4.5rem)]

              lg:text-[clamp(3rem,4vw,4.3rem)]
            "
          >
            First Time{" "}

            <span className="rebel-gold-text">
              At Rebel?
            </span>
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              mt-5

              max-w-115

              text-sm
              leading-7

              text-text-secondary

              sm:text-[15px]
            "
          >
            You don&apos;t need to already be in
            perfect shape or have boxing experience.
            Start where you are and let the workout
            meet you there.
          </p>

          {/* =================================================
              CTA GROUP

              IMPORTANT:
              We use Link + buttonVariants instead of
              Button asChild because this project's Button
              implementation doesn't support `asChild`.
          ================================================== */}

          <div
            className="
              mt-7

              flex
              flex-col

              gap-3

              sm:flex-row
              sm:items-center
            "
          >
            {/* PRIMARY CTA */}

            <Link
              href="/message"
              className={cn(
                buttonVariants(),
                `
                  group

                  min-h-11

                  bg-primary

                  px-5

                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.08em]

                  text-primary-foreground

                  shadow-(--shadow-gold-xs)

                  hover:bg-gold-hover
                  hover:text-primary-foreground
                  hover:shadow-(--shadow-gold-sm)

                  focus-visible:ring-primary

                  sm:text-[11px]
                `
              )}
            >
              Text us - we reply fast

              <ArrowUpRight
                aria-hidden={true}
                strokeWidth={1.8}
                className="
                  size-3.5

                  transition-transform
                  duration-300

                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5

                  motion-reduce:transform-none
                "
              />
            </Link>

            {/* SECONDARY CTA */}

            {/* <Link
              href="/message"
              className="
                group

                inline-flex
                min-h-11

                items-center
                justify-center

                gap-2.5

                rounded-md

                px-3

                text-[10px]
                font-bold
                uppercase

                tracking-[0.08em]

                text-text-soft

                transition-colors
                duration-200

                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary

                sm:text-[11px]
              "
            >
              Ask A Question

              <ArrowUpRight
                aria-hidden={true}
                strokeWidth={1.8}
                className="
                  size-3.5

                  transition-transform
                  duration-300

                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5

                  motion-reduce:transform-none
                "
              />
            </Link> */}
          </div>
        </div>

        {/* ===================================================
            RIGHT — FIRST VISIT STEPS

            One continuous visual surface rather than
            three unrelated cards.
        ==================================================== */}

        <div
          className="
            overflow-hidden

            rounded-xl

            border
            border-foreground/12

            bg-surface-dark

            shadow-(--shadow-card)
          "
        >
          {firstVisitSteps.map(
            (step, index) => {
              const Icon =
                step.icon

              return (
                <div
                  key={step.number}
                  className="
                    group
                    relative
                    isolate

                    overflow-hidden

                    px-5
                    py-6

                    sm:px-7
                    sm:py-7

                    lg:px-8
                    lg:py-8
                  "
                >
                  {/* =========================================
                      HOVER ATMOSPHERE
                  ========================================== */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none

                      absolute
                      inset-0
                      z-0

                      bg-[radial-gradient(circle_at_100%_50%,var(--gold-06),transparent_42%)]

                      opacity-0

                      transition-opacity
                      duration-300

                      group-hover:opacity-100
                    "
                  />

                  {/* =========================================
                      STEP CONTENT
                  ========================================== */}

                  <div
                    className="
                      relative
                      z-10

                      grid
                      grid-cols-[48px_minmax(0,1fr)]

                      gap-4

                      sm:grid-cols-[56px_minmax(0,1fr)_auto]
                      sm:items-center
                      sm:gap-5
                    "
                  >
                    {/* =======================================
                        ICON
                    ======================================== */}

                    <div
                      className="
                        flex
                        size-12

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-primary/30

                        bg-primary/5

                        text-primary

                        transition-[background-color,border-color,color]
                        duration-300

                        group-hover:border-primary/60
                        group-hover:bg-primary
                        group-hover:text-primary-foreground

                        sm:size-14
                      "
                    >
                      <Icon
                        aria-hidden={true}
                        strokeWidth={1.5}
                        className="
                          size-5

                          sm:size-5.5
                        "
                      />
                    </div>

                    {/* =======================================
                        TEXT
                    ======================================== */}

                    <div className="min-w-0">
                      <div
                        className="
                          flex
                          items-center
                          gap-2.5
                        "
                      >
                        <span
                          className="
                            font-heading
                            text-[10px]
                            font-black

                            text-primary
                          "
                        >
                          {step.number}
                        </span>

                        <span
                          aria-hidden="true"
                          className="
                            h-px
                            w-5

                            bg-primary/35
                          "
                        />
                      </div>

                      <h3
                        className="
                          mt-2

                          font-heading
                          text-xl
                          font-black
                          uppercase

                          leading-tight
                          tracking-tight

                          text-foreground

                          sm:text-2xl
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-2

                          max-w-155

                          text-xs
                          leading-6

                          text-text-secondary

                          sm:text-[13px]
                        "
                      >
                        {
                          step.description
                        }
                      </p>
                    </div>

                    {/* =======================================
                        LARGE DECORATIVE NUMBER
                    ======================================== */}

                    <span
                      aria-hidden="true"
                      className="
                        hidden

                        font-heading
                        text-5xl
                        font-black

                        leading-none

                        text-foreground/4

                        transition-colors
                        duration-300

                        group-hover:text-primary/10

                        sm:block
                      "
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* =========================================
                      DIVIDER
                  ========================================== */}

                  {index <
                    firstVisitSteps.length -
                      1 && (
                    <Separator
                      className="
                        absolute
                        inset-x-0
                        bottom-0

                        bg-foreground/10
                      "
                    />
                  )}
                </div>
              )
            }
          )}

          {/* =================================================
              BOTTOM MESSAGE
          ================================================== */}

          <div
            className="
              border-t
              border-primary/15

              bg-primary/4

              px-5
              py-4

              sm:px-7

              lg:px-8
            "
          >
            <div
              className="
                flex
                flex-col

                gap-1

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:gap-6
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-primary
                "
              >
                Start Where You Are.
              </p>

              <p
                className="
                  text-[10px]
                  font-medium

                  text-text-muted
                "
              >
                Progress comes one round at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}