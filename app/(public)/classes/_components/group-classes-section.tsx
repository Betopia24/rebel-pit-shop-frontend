import Link from "next/link"

import {
  ArrowUpRight,
  BicepsFlexed,
  CalendarDays,
  Check,
  Clock3,
  Footprints,
  ShieldCheck,
  TimerReset,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* =========================================================
   TYPES
========================================================= */

type TrainingClass = {
  number: string
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  features: readonly string[]
  bestFor: readonly string[]
  ctaLabel: string
}

type SharedFact = {
  value: string
  label: string
  icon: LucideIcon
}

/* =========================================================
   DATA
========================================================= */

const boxingClass: TrainingClass = {
  number: "01",

  eyebrow: "Punch-Focused Training",

  title: "Boxing Fitness",

  description:
    "Learn authentic boxing fundamentals while building strength, endurance, coordination, confidence, and full-body fitness in a supportive no-contact environment.",

  icon: BicepsFlexed,

  features: [
    "Real boxing fundamentals",
    "Punching combinations",
    "Footwork and movement",
    "Speed, timing, and accuracy",
    "Full-body conditioning",
    "No-contact training",
  ],

  bestFor: [
    "Complete beginners",
    "Learning boxing basics",
    "Technique-focused training",
    "Building confidence",
    "Full-body fitness",
  ],

  ctaLabel: "View Boxing Schedule",
}

const kickboxingClass: TrainingClass = {
  number: "02",

  eyebrow: "Punches + Kicks",

  title: "Kickboxing Fitness",

  description:
    "Combine punches, kicks, movement, and high-energy conditioning for a dynamic full-body workout that develops balance, coordination, strength, and confidence.",

  icon: Footprints,

  features: [
    "Punching and kicking combinations",
    "More lower-body involvement",
    "Balance and coordination",
    "Strength and conditioning",
    "Movement variety",
    "No-contact training",
  ],

  bestFor: [
    "Trying kickboxing",
    "More leg involvement",
    "Dynamic movement",
    "Strength and coordination",
    "Full-body conditioning",
  ],

  ctaLabel: "View Kickboxing Schedule",
}

const sharedFacts: SharedFact[] = [
  {
    value: "30 / 60 / 75",
    label: "Minute Class Options",
    icon: Clock3,
  },
  {
    value: "3 MIN",
    label: "Training Rounds",
    icon: BicepsFlexed,
  },
  {
    value: "1 MIN",
    label: "Active Rest",
    icon: TimerReset,
  },
  {
    value: "UP TO 40",
    label: "Members Per Class",
    icon: UsersRound,
  },
  {
    value: "7 DAYS",
    label: "Classes Each Week",
    icon: CalendarDays,
  },
  {
    value: "NO CONTACT",
    label: "Train Without Sparring",
    icon: ShieldCheck,
  },
]

/* =========================================================
   SECTION
========================================================= */

export function GroupClassesSection() {
  return (
    <section
      id="group-classes"
      aria-labelledby="group-classes-heading"
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

          bg-[radial-gradient(circle_at_50%_0%,var(--gold-09),transparent_34%),radial-gradient(circle_at_0%_100%,var(--gold-05),transparent_28%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-32
          top-12
          z-0

          size-72

          rounded-full

          border-20
          border-background/2
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
            max-w-190

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

                bg-primary/70
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
              Group Classes
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-8

                bg-primary/70
              "
            />
          </div>

          <h2
            id="group-classes-heading"
            className="
              mt-4

              font-heading
              text-[clamp(2.8rem,7vw,5.2rem)]
              font-black
              uppercase

              leading-[0.9]
              tracking-tighter

              text-background
            "
          >
            Boxing Or{" "}
            <span className="rebel-gold-text">
              Kickboxing?
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-160

              text-[13px]
              leading-6.5

              text-background/60

              sm:text-sm
              lg:text-[15px]
            "
          >
            Both classes combine authentic technique with
            high-energy, full-body training. The difference
            comes down to how you want to move and which skills
            you want to develop.
          </p>
        </div>

        {/* ===================================================
            CLASS COMPARISON
        ==================================================== */}

        <div
          className="
            relative

            mt-10

            grid
            grid-cols-1

            gap-5

            lg:mt-11
            lg:grid-cols-2
            lg:gap-6
          "
        >
          <ClassComparisonCard trainingClass={boxingClass} />

          {/* VS BADGE */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              z-20

              hidden
              size-13

              -translate-x-1/2
              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-primary/55

              bg-foreground

              font-heading
              text-sm
              font-black
              italic

              text-primary

              shadow-(--shadow-card-soft)

              lg:flex
            "
          >
            VS
          </div>

          <ClassComparisonCard trainingClass={kickboxingClass} />
        </div>

        {/* ===================================================
            SHARED CLASS FACTS
        ==================================================== */}

        <div
          className="
            mt-5

            overflow-hidden

            rounded-xl

            border
            border-background/10

            bg-white/40

            shadow-(--shadow-card-soft)
          "
        >
          {/* FACTS HEADER */}

          <div
            className="
              flex
              flex-col

              gap-2

              border-b
              border-background/8

              px-5
              py-4

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-6

              lg:px-6
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
                  size-8
                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-primary/35

                  bg-primary/6

                  text-primary
                "
              >
                <Check
                  aria-hidden={true}
                  strokeWidth={2}
                  className="size-3.5"
                />
              </span>

              <div>
                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase

                    tracking-[0.16em]

                    text-primary
                  "
                >
                  Shared Class Format
                </p>

                <p
                  className="
                    mt-1

                    text-[11px]
                    leading-5

                    text-background/55
                  "
                >
                  Whichever style you choose, these Rebel group
                  class fundamentals stay consistent.
                </p>
              </div>
            </div>

            <span
              className="
                hidden

                text-[8px]
                font-black
                uppercase

                tracking-[0.15em]

                text-background/35

                lg:block
              "
            >
              Beginner Friendly · No Contact
            </span>
          </div>

          {/* FACT GRID */}

          <div
            className="
              grid
              grid-cols-2

              sm:grid-cols-3
              xl:grid-cols-6
            "
          >
            {sharedFacts.map((fact, index) => (
              <SharedFactItem
                key={fact.value}
                fact={fact}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            DECISION NOTE
        ==================================================== */}

        <div
          className="
            mt-4

            flex
            flex-col

            gap-3

            border-t
            border-background/8

            pt-4

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-8
          "
        >
          <div
            className="
              flex
              items-start

              gap-3
            "
          >
            <ShieldCheck
              aria-hidden={true}
              strokeWidth={1.6}
              className="
                mt-0.5
                size-4
                shrink-0

                text-primary
              "
            />

            <p
              className="
                max-w-190

                text-[11px]
                leading-5

                text-background/52

                sm:text-xs
              "
            >
              Both formats are beginner-friendly and no-contact.
              Choose the one that sounds more fun—or try both
              and discover which style feels right for you.
            </p>
          </div>

          <Link
            href="/schedule"
            className="
              group

              inline-flex
              shrink-0

              items-center
              gap-2

              text-[9px]
              font-black
              uppercase

              tracking-[0.1em]

              text-primary

              transition-colors
              duration-200

              hover:text-gold-hover

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-foreground
            "
          >
            View Full Schedule

            <ArrowUpRight
              aria-hidden={true}
              strokeWidth={1.8}
              className="
                size-3.5

                transition-transform
                duration-200

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
   COMPARISON CARD
========================================================= */

type ClassComparisonCardProps = {
  trainingClass: TrainingClass
}

function ClassComparisonCard({
  trainingClass,
}: ClassComparisonCardProps) {
  const Icon = trainingClass.icon

  return (
    <article
      className="
        group
        relative
        isolate
        overflow-hidden

        rounded-xl

        border
        border-background/10

        bg-white/42

        p-5

        shadow-(--shadow-card-soft)

        transition-[background-color,border-color,box-shadow]
        duration-300

        hover:border-primary/35
        hover:bg-white/55
        hover:shadow-(--shadow-card)

        sm:p-6
        lg:p-7
      "
    >
      {/* BACKGROUND NUMBER */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-4
          top-2
          z-0

          font-heading
          text-7xl
          font-black

          leading-none
          tracking-tighter

          text-background/4

          sm:text-8xl
        "
      >
        {trainingClass.number}
      </span>

      {/* GOLD GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_100%_0%,var(--gold-09),transparent_42%)]

          opacity-35

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      <div
        className="
          relative
          z-10
        "
      >
        {/* CARD TOP */}

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
              size-11
              shrink-0

              items-center
              justify-center

              rounded-xl

              border
              border-primary/35

              bg-primary/6

              text-primary

              transition-[background-color,border-color,color]
              duration-250

              group-hover:border-primary
              group-hover:bg-primary
              group-hover:text-primary-foreground
            "
          >
            <Icon
              aria-hidden={true}
              strokeWidth={1.6}
              className="size-5"
            />
          </span>

          <div>
            <p
              className="
                text-[8px]
                font-black
                uppercase

                tracking-[0.17em]

                text-primary
              "
            >
              {trainingClass.eyebrow}
            </p>

            <p
              className="
                mt-1

                text-[8px]
                font-semibold
                uppercase

                tracking-[0.1em]

                text-background/38
              "
            >
              Group Class {trainingClass.number}
            </p>
          </div>
        </div>

        {/* TITLE */}

        <h3
          className="
            mt-5

            font-heading
            text-[clamp(2.1rem,4vw,3.2rem)]
            font-black
            uppercase

            leading-[0.92]
            tracking-tighter

            text-background
          "
        >
          {trainingClass.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4

            max-w-150

            text-xs
            leading-6

            text-background/62

            sm:text-[13px]
            sm:leading-6.5
          "
        >
          {trainingClass.description}
        </p>

        {/* ===================================================
            FEATURES + BEST FOR
        ==================================================== */}

        <div
          className="
            mt-6

            grid
            grid-cols-1

            gap-5

            sm:grid-cols-[minmax(0,1.12fr)_minmax(180px,0.88fr)]
            sm:gap-6
          "
        >
          {/* FEATURES */}

          <div>
            <p
              className="
                text-[8px]
                font-black
                uppercase

                tracking-[0.16em]

                text-background/42
              "
            >
              What You&apos;ll Work On
            </p>

            <ul
              className="
                mt-3
                space-y-2.5
              "
            >
              {trainingClass.features.map((feature) => (
                <li
                  key={feature}
                  className="
                    flex
                    items-start

                    gap-2.5

                    text-[11px]
                    leading-5

                    text-background/68

                    sm:text-xs
                  "
                >
                  <span
                    className="
                      mt-0.5

                      flex
                      size-4.5
                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-primary/50

                      text-primary
                    "
                  >
                    <Check
                      aria-hidden={true}
                      strokeWidth={2}
                      className="size-2.5"
                    />
                  </span>

                  <span>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* BEST FOR */}

          <div
            className="
              rounded-xl

              border
              border-primary/20

              bg-primary/5

              p-4

              sm:p-4.5
            "
          >
            <p
              className="
                text-[8px]
                font-black
                uppercase

                tracking-[0.17em]

                text-primary
              "
            >
              Best For
            </p>

            <ul
              className="
                mt-3
                space-y-2.5
              "
            >
              {trainingClass.bestFor.map((item) => (
                <li
                  key={item}
                  className="
                    flex
                    items-start

                    gap-2.5

                    text-[11px]
                    leading-5

                    text-background/60
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      mt-2

                      size-1.5
                      shrink-0

                      rounded-full

                      bg-primary
                    "
                  />

                  <span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===================================================
            CARD CTA
        ==================================================== */}

        <div
          className="
            mt-6

            border-t
            border-background/8

            pt-4
          "
        >
          <Link
            href="/schedule"
            className={cn(
              buttonVariants(),
              `
                group/cta

                min-h-10

                bg-primary

                px-5

                text-[8px]
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
            {trainingClass.ctaLabel}

            <ArrowUpRight
              aria-hidden={true}
              strokeWidth={1.8}
              className="
                size-3.5

                transition-transform
                duration-200

                group-hover/cta:translate-x-0.5
                group-hover/cta:-translate-y-0.5

                motion-reduce:transform-none
              "
            />
          </Link>
        </div>
      </div>
    </article>
  )
}

/* =========================================================
   SHARED FACT
========================================================= */

type SharedFactItemProps = {
  fact: SharedFact
  index: number
}

function SharedFactItem({
  fact,
  index,
}: SharedFactItemProps) {
  const Icon = fact.icon

  return (
    <div
      className={cn(
        `
          flex
          min-h-29

          flex-col
          items-center
          justify-center

          px-3
          py-5

          text-center
        `,

        index % 2 !== 0 &&
          `
            border-l
            border-background/8
          `,

        index >= 2 &&
          `
            border-t
            border-background/8
          `,

        `
          sm:border-t-0
        `,

        index % 3 !== 0 &&
          `
            sm:border-l
            sm:border-background/8
          `,

        `
          xl:border-t-0
        `,

        index > 0 &&
          `
            xl:border-l
            xl:border-background/8
          `
      )}
    >
      <span
        className="
          flex
          size-8

          items-center
          justify-center

          rounded-full

          border
          border-primary/30

          bg-primary/5

          text-primary
        "
      >
        <Icon
          aria-hidden={true}
          strokeWidth={1.55}
          className="size-3.5"
        />
      </span>

      <p
        className="
          mt-2.5

          font-heading
          text-[13px]
          font-black
          uppercase

          leading-none
          tracking-tight

          text-background

          sm:text-sm
        "
      >
        {fact.value}
      </p>

      <p
        className="
          mt-1.5

          max-w-28

          text-[9px]
          font-medium

          leading-4

          text-background/48
        "
      >
        {fact.label}
      </p>
    </div>
  )
}