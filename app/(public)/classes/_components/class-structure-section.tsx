import Link from "next/link"

import {
  Activity,
  ArrowRight,
  BicepsFlexed,
  HeartPulse,
  PersonStanding,
  TimerReset,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import {
  buttonVariants,
} from "@/components/ui/button"

import { cn } from "@/lib/utils"

/* =========================================================
   CLASS STRUCTURE

   Confirmed class flow:

   01 Warm-Up
   02 3-Minute Training Rounds
   03 1-Minute Active Rest
   04 Core Finisher
   05 Cool Down

   No invented duration is used for:
   - Warm-Up
   - Core Finisher
   - Cool Down
========================================================= */

type ClassStep = {
  number: string

  eyebrow: string

  title: string

  description: string

  icon: LucideIcon

  emphasis?: boolean
}

const classSteps: ClassStep[] = [
  {
    number: "01",

    eyebrow: "Get Ready",

    title: "Warm-Up",

    description:
      "Start moving, loosen up, and prepare your body for the workout ahead.",

    icon: PersonStanding,
  },

  {
    number: "02",

    eyebrow: "3-Minute Rounds",

    title: "Training Rounds",

    description:
      "Work through boxing or kickboxing drills, combinations, technique, movement, and full-body conditioning.",

    icon: BicepsFlexed,

    emphasis: true,
  },

  {
    number: "03",

    eyebrow: "1-Minute Active Rest",

    title: "Recover & Reset",

    description:
      "Stay active between rounds, catch your breath, and get ready to go again.",

    icon: TimerReset,

    emphasis: true,
  },

  {
    number: "04",

    eyebrow: "Finish Strong",

    title: "Core Finisher",

    description:
      "Close out the workout with focused core, stability, and conditioning work.",

    icon: Activity,
  },

  {
    number: "05",

    eyebrow: "Recover",

    title: "Cool Down",

    description:
      "Bring the intensity down, recover from the session, and finish feeling accomplished.",

    icon: HeartPulse,
  },
]

/* =========================================================
   COMPONENT
========================================================= */

export function ClassStructureSection() {
  return (
    <section
      id="class-structure"
      aria-labelledby="class-structure-heading"
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
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_10%_15%,var(--gold-05),transparent_28%),radial-gradient(circle_at_100%_90%,var(--gold-04),transparent_30%)]
        "
      />

      {/* DECORATIVE RING */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-32
          -top-32
          z-0

          size-80

          rounded-full

          border-20
          border-foreground/2
        "
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          grid
          w-full
          max-w-375

          grid-cols-1

          gap-10

          px-5

          sm:px-7

          md:px-10

          lg:grid-cols-[minmax(300px,0.68fr)_minmax(0,1.32fr)]
          lg:items-center
          lg:gap-14
          lg:px-14

          xl:gap-20
          xl:px-20
        "
      >
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div className="max-w-125">
          {/* EYEBROW */}

          <div
            className="
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
                text-[9px]
                font-black
                uppercase

                tracking-[0.22em]

                text-primary

                sm:text-[10px]
              "
            >
              The Class Experience
            </span>
          </div>

          {/* HEADING */}

          <h2
            id="class-structure-heading"
            className="
              mt-5

              font-heading
              text-[clamp(3rem,6vw,5.2rem)]
              font-black
              uppercase

              leading-[0.88]
              tracking-tighter
            "
          >
            How A Class{" "}

            <span
              className="
                block
                rebel-gold-text
              "
            >
              Works.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5

              max-w-110

              text-sm
              leading-7

              text-text-secondary

              sm:text-[15px]
            "
          >
            You don&apos;t need to know the routine
            before you arrive. Your coach guides you
            through every stage of the workout from
            warm-up to cool down.
          </p>

          {/* =================================================
              5-STEP SUMMARY
          ================================================== */}

          <div
            className="
              mt-7

              flex
              items-center

              gap-4

              border-y
              border-foreground/10

              py-4
            "
          >
            <span
              className="
                font-heading
                text-4xl
                font-black

                leading-none

                text-primary
              "
            >
              05
            </span>

            <div>
              <p
                className="
                  text-[9px]
                  font-black
                  uppercase

                  tracking-[0.14em]

                  text-foreground
                "
              >
                Parts. One Workout.
              </p>

              <p
                className="
                  mt-1

                  text-[10px]
                  leading-4

                  text-text-muted
                "
              >
                Simple structure. Different challenge
                every class.
              </p>
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================== */}

          <div
            className="
              mt-7

              flex
              flex-wrap
              items-center

              gap-4
            "
          >
            <Link
              href="/schedule"
              className={cn(
                buttonVariants(),
                `
                  group

                  min-h-11

                  bg-primary

                  px-5

                  text-[9px]
                  font-black
                  uppercase

                  tracking-[0.08em]

                  text-primary-foreground

                  shadow-(--shadow-gold-xs)

                  hover:bg-gold-hover
                  hover:text-primary-foreground
                  hover:shadow-(--shadow-gold-sm)
                `
              )}
            >
              View Schedule

              <ArrowRight
                aria-hidden={true}
                strokeWidth={1.8}
                className="
                  size-3.5

                  transition-transform
                  duration-200

                  group-hover:translate-x-0.5

                  motion-reduce:transform-none
                "
              />
            </Link>

            <div
              className="
                inline-flex
                items-center

                gap-2

                text-[8px]
                font-bold
                uppercase

                tracking-[0.1em]

                text-text-muted
              "
            >
              <UsersRound
                aria-hidden={true}
                strokeWidth={1.6}
                className="
                  size-3.5

                  text-primary
                "
              />

              All fitness levels welcome
            </div>
          </div>
        </div>

        {/* ===================================================
            RIGHT — CLASS FLOW
        ==================================================== */}

        <div className="relative">
          {/* VERTICAL FLOW LINE */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-7
              left-5
              top-7
              z-0

              w-px

              bg-linear-to-b
              from-primary/70
              via-primary/25
              to-primary/5

              sm:left-6
            "
          />

          <div className="space-y-2.5">
            {classSteps.map(
              (
                step,
                index
              ) => (
                <ClassFlowStep
                  key={step.number}
                  step={step}
                  last={
                    index ===
                    classSteps.length -
                      1
                  }
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   FLOW STEP
========================================================= */

type ClassFlowStepProps = {
  step: ClassStep

  last: boolean
}

function ClassFlowStep({
  step,
  last,
}: ClassFlowStepProps) {
  const Icon =
    step.icon

  return (
    <article
      className="
        group
        relative

        grid
        grid-cols-[42px_minmax(0,1fr)]

        gap-4

        sm:grid-cols-[50px_minmax(0,1fr)]
        sm:gap-5
      "
    >
      {/* =====================================================
          ICON NODE
      ====================================================== */}

      <div
        className="
          relative
          z-10

          flex
          justify-center
        "
      >
        <div
          className={cn(
            `
              flex
              size-10

              items-center
              justify-center

              rounded-full

              border

              transition-[background-color,border-color,color,box-shadow]
              duration-200

              sm:size-12
            `,

            step.emphasis
              ? `
                border-primary

                bg-primary

                text-primary-foreground

                shadow-(--shadow-gold-xs)
              `
              : `
                border-primary/35

                bg-background

                text-primary

                group-hover:border-primary
                group-hover:bg-primary
                group-hover:text-primary-foreground
              `
          )}
        >
          <Icon
            aria-hidden={true}
            strokeWidth={1.55}
            className="
              size-4.5

              sm:size-5
            "
          />
        </div>
      </div>

      {/* =====================================================
          STEP CONTENT
      ====================================================== */}

      <div
        className={cn(
          `
            relative
            isolate

            overflow-hidden

            rounded-lg

            border

            px-4
            py-4

            transition-[background-color,border-color]
            duration-200

            sm:px-5
          `,

          step.emphasis
            ? `
              border-primary/30

              bg-primary/5
            `
            : `
              border-foreground/8

              bg-surface-dark

              group-hover:border-primary/20
              group-hover:bg-surface
            `
        )}
      >
        {/* EMPHASIS GLOW */}

        {step.emphasis && (
          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-0
              z-0

              bg-[radial-gradient(circle_at_100%_0%,var(--gold-07),transparent_45%)]
            "
          />
        )}

        <div
          className="
            relative
            z-10

            grid
            grid-cols-1

            gap-2.5

            md:grid-cols-[145px_minmax(0,1fr)]
            md:items-center
            md:gap-5
          "
        >
          {/* NUMBER / EYEBROW */}

          <div>
            <div
              className="
                flex
                items-center

                gap-2
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
                  w-4

                  bg-primary/35
                "
              />
            </div>

            <p
              className="
                mt-1.5

                text-[7px]
                font-black
                uppercase

                tracking-[0.13em]

                text-primary
              "
            >
              {step.eyebrow}
            </p>
          </div>

          {/* TITLE / DESCRIPTION */}

          <div>
            <h3
              className="
                font-heading
                text-lg
                font-black
                uppercase

                leading-none
                tracking-tight

                text-foreground

                sm:text-xl
              "
            >
              {step.title}
            </h3>

            <p
              className="
                mt-1.5

                max-w-150

                text-[11px]
                leading-5

                text-text-secondary

                sm:text-xs
              "
            >
              {step.description}
            </p>
          </div>
        </div>

        {/* SMALL FLOW MARKER */}

        {!last && (
          <span
            aria-hidden="true"
            className="
              absolute
              bottom-1.5
              right-2.5

              text-[7px]
              font-black
              uppercase

              tracking-[0.1em]

              text-primary/25
            "
          >
            Next
          </span>
        )}
      </div>
    </article>
  )
}