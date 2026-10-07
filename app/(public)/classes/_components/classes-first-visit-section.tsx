import {
  Clock3,
  Gift,
  Hand,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

/* =========================================================
   TYPES
========================================================= */

type FirstVisitStep = {
  number: string
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  accent?: boolean
}

/* =========================================================
   DATA
========================================================= */

const firstVisitSteps: FirstVisitStep[] = [
  {
    number: "01",
    eyebrow: "Start Here",
    title: "First Class Free",
    description:
      "New visitors can experience their first Rebel group class before deciding what training routine fits them best.",
    icon: Gift,
    accent: true,
  },
  {
    number: "02",
    eyebrow: "Need Gloves?",
    title: "Loaner Gloves",
    description:
      "First-time visitors can use loaner gloves at no cost, so you do not need to buy gear before trying a class.",
    icon: Hand,
  },
  {
    number: "03",
    eyebrow: "New To Training?",
    title: "Beginners Welcome",
    description:
      "No previous boxing or kickboxing experience is required. Your coach will explain the basics and help you get started.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    eyebrow: "Before Class",
    title: "Arrive 10–15 Min Early",
    description:
      "Give yourself a little extra time to get oriented, meet your coach, and prepare before the session begins.",
    icon: Clock3,
    accent: true,
  },
]

/* =========================================================
   SECTION
========================================================= */

export function ClassesFirstVisitSection() {
  return (
    <section
      id="first-visit"
      aria-labelledby="first-visit-heading"
      className="
        relative
        isolate
        overflow-hidden

        border-t
        border-background/8

        bg-foreground
        text-background

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

          bg-[radial-gradient(circle_at_50%_0%,var(--gold-08),transparent_30%),radial-gradient(circle_at_0%_100%,var(--gold-04),transparent_26%)]
        "
      />

      {/* BACKGROUND NUMBER */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-5
          -top-10
          z-0

          hidden

          font-heading
          text-[13rem]
          font-black

          leading-none
          tracking-tighter

          text-background/2

          xl:block
        "
      >
        01
      </span>

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-375

          px-5
          sm:px-7
          md:px-10
          lg:px-14
          xl:px-20
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            mx-auto
            max-w-205

            text-center
          "
        >
          <div
            className="
              flex
              items-center
              justify-center

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
              Your First Visit
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

          <h2
            id="first-visit-heading"
            className="
              mt-5

              font-heading
              text-[clamp(3rem,7vw,5.1rem)]
              font-black
              uppercase

              leading-[0.9]
              tracking-tighter

              text-background
            "
          >
            Walk In New.
            <span
              className="
                block
                rebel-gold-text
              "
            >
              Leave Stronger.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-155

              text-[13px]
              leading-6.5

              text-background/60

              sm:text-sm
              lg:text-[15px]
            "
          >
            Your first Rebel visit is designed to be simple.
            Arrive a little early, borrow gloves if you need them,
            meet your coach, and experience the class for yourself.
          </p>
        </div>

        {/* ===================================================
            FEATURE — FIRST CLASS FREE
        ==================================================== */}

        <div
          className="
            relative
            isolate

            mx-auto
            mt-8
            max-w-220

            overflow-hidden

            rounded-xl

            border
            border-primary/30

            bg-primary/6

            px-5
            py-6

            sm:px-7
            sm:py-7
          "
        >
          {/* GLOW */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-0
              z-0

              bg-[radial-gradient(circle_at_50%_0%,var(--gold-12),transparent_58%)]
            "
          />

          <div
            className="
              relative
              z-10

              grid
              grid-cols-1

              gap-5

              sm:grid-cols-[48px_minmax(0,1fr)_auto]
              sm:items-center
              sm:gap-6
            "
          >
            {/* ICON */}

            <span
              className="
                mx-auto

                flex
                size-11

                items-center
                justify-center

                rounded-full

                bg-primary

                text-primary-foreground

                shadow-(--shadow-gold-xs)

                sm:mx-0
              "
            >
              <Sparkles
                aria-hidden={true}
                strokeWidth={1.6}
                className="size-4.5"
              />
            </span>

            {/* CONTENT */}

            <div
              className="
                text-center

                sm:text-left
              "
            >
              <p
                className="
                  text-[8px]
                  font-black
                  uppercase

                  tracking-[0.18em]

                  text-primary
                "
              >
                New Visitors
              </p>

              <h3
                className="
                  mt-1.5

                  font-heading
                  text-[clamp(2rem,4vw,3.4rem)]
                  font-black
                  uppercase

                  leading-none
                  tracking-tighter

                  text-background
                "
              >
                First Class{" "}
                <span className="text-primary">
                  Free.
                </span>
              </h3>

              <p
                className="
                  mt-2

                  max-w-120

                  text-[11px]
                  leading-5.5

                  text-background/55

                  sm:text-xs
                "
              >
                Try your first Rebel group class and see
                how the training experience feels before
                choosing what comes next.
              </p>
            </div>

            {/* BADGE */}

            <div
              className="
                flex
                justify-center

                sm:justify-end
              "
            >
              <span
                className="
                  inline-flex

                  rounded-full

                  border
                  border-primary/25

                  px-3
                  py-1.5

                  text-[8px]
                  font-black
                  uppercase

                  tracking-[0.12em]

                  text-background/45
                "
              >
                First Group Class
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            DESKTOP JOURNEY
        ==================================================== */}

        <div
          className="
            relative

            mt-10

            hidden

            lg:block
          "
        >
          {/* CONNECTING LINE */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-[12%]
              right-[12%]
              top-6

              h-px

              bg-linear-to-r
              from-primary/10
              via-primary/55
              to-primary/10
            "
          />

          <div
            className="
              relative
              z-10

              grid
              grid-cols-4

              gap-6
            "
          >
            {firstVisitSteps.map((step) => (
              <DesktopVisitStep
                key={step.number}
                step={step}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            MOBILE / TABLET JOURNEY
        ==================================================== */}

        <div
          className="
            relative

            mt-8

            lg:hidden
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-8
              left-5
              top-8

              w-px

              bg-linear-to-b
              from-primary/60
              via-primary/25
              to-primary/5
            "
          />

          <div className="space-y-3">
            {firstVisitSteps.map((step) => (
              <MobileVisitStep
                key={step.number}
                step={step}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            REASSURANCE
        ==================================================== */}

        <div
          className="
            mx-auto
            mt-8
            max-w-210

            border-t
            border-background/10

            pt-5
          "
        >
          <div
            className="
              flex
              flex-col

              items-center
              justify-center

              gap-2.5

              text-center

              sm:flex-row
              sm:gap-4
            "
          >
            <ShieldCheck
              aria-hidden={true}
              strokeWidth={1.6}
              className="
                size-4
                shrink-0

                text-primary
              "
            />

            <p
              className="
                text-[9px]
                font-black
                uppercase

                tracking-[0.13em]

                text-background/46
              "
            >
              No Previous Boxing Or Kickboxing Experience Required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   DESKTOP STEP
========================================================= */

type VisitStepProps = {
  step: FirstVisitStep
}

function DesktopVisitStep({
  step,
}: VisitStepProps) {
  const Icon = step.icon

  return (
    <article
      className="
        group

        text-center
      "
    >
      {/* NODE */}

      <div
        className={cn(
          `
            relative
            z-10

            mx-auto

            flex
            size-12

            items-center
            justify-center

            rounded-full

            border

            transition-[background-color,border-color,color,box-shadow]
            duration-250
          `,

          step.accent
            ? `
              border-primary
              bg-primary

              text-primary-foreground

              shadow-(--shadow-gold-xs)
            `
            : `
              border-primary/35
              bg-foreground

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
          className="size-4.5"
        />
      </div>

      {/* NUMBER */}

      <p
        className="
          mt-4

          font-heading
          text-[10px]
          font-black

          text-primary
        "
      >
        {step.number}
      </p>

      {/* EYEBROW */}

      <p
        className="
          mt-1

          text-[8px]
          font-black
          uppercase

          tracking-[0.14em]

          text-background/38
        "
      >
        {step.eyebrow}
      </p>

      {/* TITLE */}

      <h3
        className="
          mx-auto
          mt-2
          max-w-62

          font-heading
          text-xl
          font-black
          uppercase

          leading-[0.95]
          tracking-tight

          text-background
        "
      >
        {step.title}
      </h3>

      {/* DESCRIPTION */}

      <p
        className="
          mx-auto
          mt-3
          max-w-70

          text-[11px]
          leading-5.5

          text-background/55

          xl:text-xs
        "
      >
        {step.description}
      </p>
    </article>
  )
}

/* =========================================================
   MOBILE STEP
========================================================= */

function MobileVisitStep({
  step,
}: VisitStepProps) {
  const Icon = step.icon

  return (
    <article
      className="
        relative

        grid
        grid-cols-[42px_minmax(0,1fr)]

        gap-4
      "
    >
      {/* ICON */}

      <div
        className={cn(
          `
            relative
            z-10

            flex
            size-10

            items-center
            justify-center

            rounded-full

            border
          `,

          step.accent
            ? `
              border-primary
              bg-primary

              text-primary-foreground
            `
            : `
              border-primary/35
              bg-foreground

              text-primary
            `
        )}
      >
        <Icon
          aria-hidden={true}
          strokeWidth={1.55}
          className="size-4"
        />
      </div>

      {/* CONTENT */}

      <div
        className="
          rounded-xl

          border
          border-background/9

          bg-white/34

          px-4
          py-4
        "
      >
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
              text-[9px]
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

          <span
            className="
              text-[7px]
              font-black
              uppercase

              tracking-[0.12em]

              text-background/40
            "
          >
            {step.eyebrow}
          </span>
        </div>

        <h3
          className="
            mt-2

            font-heading
            text-lg
            font-black
            uppercase

            leading-none
            tracking-tight

            text-background
          "
        >
          {step.title}
        </h3>

        <p
          className="
            mt-2

            text-[11px]
            leading-5.5

            text-background/58
          "
        >
          {step.description}
        </p>
      </div>
    </article>
  )
}