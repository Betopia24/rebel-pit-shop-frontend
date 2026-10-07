"use client"

import * as React from "react"

import Link from "next/link"

import {
  Apple,
  ArrowRight,
  BicepsFlexed,
  CalendarDays,
  Check,
  Clock3,
  Dumbbell,
  Goal,
  Heart,
  PersonStanding,
  ShieldCheck,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import {
  buttonVariants,
} from "@/components/ui/button"

import { cn } from "@/lib/utils"

/* =========================================================
   TYPES
========================================================= */

type GoalId =
  | "beginner-boxing"
  | "full-body"
  | "kickboxing"
  | "technique"
  | "personal-training"
  | "nutrition"
  | "youth"
  | "open-gym"

type RecommendationFact = {
  label: string
  sublabel: string
  icon: LucideIcon
}

type GoalOption = {
  id: GoalId

  number: string

  title: string

  description: string

  icon: LucideIcon

  recommendation: {
    eyebrow: string

    title: string

    description: string

    benefits: string[]

    facts: RecommendationFact[]

    primaryLabel: string
    primaryHref: string

    secondaryLabel?: string
    secondaryHref?: string
  }
}

/* =========================================================
   GOAL OPTIONS

   Later these can move into:
   features/classes-page/data/class-goals.ts

   or come from API / CMS.
========================================================= */

const goalOptions: GoalOption[] = [
  {
    id: "beginner-boxing",

    number: "01",

    title:
      "I'm new to boxing",

    description:
      "Learn the fundamentals in a supportive, beginner-friendly class.",

    icon: BicepsFlexed,

    recommendation: {
      eyebrow:
        "Recommended For You",

      title:
        "Boxing Fitness",

      description:
        "Learn real boxing technique while getting a full-body workout. Build speed, power, endurance, coordination, and confidence in a supportive, no-contact environment.",

      benefits: [
        "Perfect for complete beginners",
        "Learn real boxing fundamentals",
        "Full-body conditioning",
        "Build confidence and coordination",
        "No-contact training",
      ],

      facts: [
        {
          label:
            "30 / 60 / 75 Min",

          sublabel:
            "Class options",

          icon: Clock3,
        },

        {
          label:
            "3-Minute Rounds",

          sublabel:
            "1-minute active rest",

          icon: Target,
        },

        {
          label:
            "Up To 40",

          sublabel:
            "Members per class",

          icon: UsersRound,
        },

        {
          label:
            "7 Days A Week",

          sublabel:
            "Flexible schedule",

          icon: CalendarDays,
        },
      ],

      primaryLabel:
        "Explore Boxing Fitness",

      primaryHref:
        "#group-classes",

      secondaryLabel:
        "View Schedule",

      secondaryHref:
        "/schedule",
    },
  },

  {
    id: "full-body",

    number: "02",

    title:
      "I want a full-body workout",

    description:
      "Build strength, cardio, coordination, and confidence while learning a skill.",

    icon: Dumbbell,

    recommendation: {
      eyebrow:
        "Best Starting Point",

      title:
        "Boxing Or Kickboxing",

      description:
        "Both group-class styles combine real technique with high-energy full-body conditioning. Choose boxing for a punch-focused starting point or kickboxing for more lower-body movement.",

      benefits: [
        "Train your entire body",
        "Build strength and endurance",
        "Improve cardio and coordination",
        "Every class is different",
        "Suitable for all fitness levels",
      ],

      facts: [
        {
          label:
            "Full Body",

          sublabel:
            "Strength + cardio",

          icon: Dumbbell,
        },

        {
          label:
            "3-Minute Rounds",

          sublabel:
            "Structured training",

          icon: Clock3,
        },

        {
          label:
            "Always Different",

          sublabel:
            "Varied workouts",

          icon: Goal,
        },

        {
          label:
            "All Levels",

          sublabel:
            "Train at your pace",

          icon: UsersRound,
        },
      ],

      primaryLabel:
        "Explore Group Classes",

      primaryHref:
        "#group-classes",

      secondaryLabel:
        "View Schedule",

      secondaryHref:
        "/schedule",
    },
  },

  {
    id: "kickboxing",

    number: "03",

    title:
      "I want to try kickboxing",

    description:
      "Add kicks, lower-body movement, power, and more variety to your workout.",

    icon: PersonStanding,

    recommendation: {
      eyebrow:
        "Recommended For You",

      title:
        "Kickboxing Fitness",

      description:
        "Combine punching and kicking with full-body conditioning. Kickboxing brings more lower-body movement while keeping the workout beginner-friendly and no-contact.",

      benefits: [
        "Punching and kicking combinations",
        "More lower-body involvement",
        "Build strength and conditioning",
        "Improve balance and coordination",
        "No-contact training",
      ],

      facts: [
        {
          label:
            "Box + Kick",

          sublabel:
            "Combination training",

          icon: PersonStanding,
        },

        {
          label:
            "Full Body",

          sublabel:
            "Upper + lower body",

          icon: Dumbbell,
        },

        {
          label:
            "All Levels",

          sublabel:
            "Beginner friendly",

          icon: UsersRound,
        },

        {
          label:
            "Real Coaching",

          sublabel:
            "Technique matters",

          icon: Target,
        },
      ],

      primaryLabel:
        "Explore Kickboxing",

      primaryHref:
        "#group-classes",

      secondaryLabel:
        "View Schedule",

      secondaryHref:
        "/schedule",
    },
  },

  {
    id: "technique",

    number: "04",

    title:
      "I want to learn technique",

    description:
      "Focus on technical boxing and mitt work to sharpen your skills.",

    icon: Target,

    recommendation: {
      eyebrow:
        "Technical Development",

      title:
        "Boxing & Mitts",

      description:
        "Work one-on-one with a coach on boxing fundamentals, combinations, timing, movement, technique, and mitt work.",

      benefits: [
        "Focused one-on-one coaching",
        "Improve boxing fundamentals",
        "Work on combinations and timing",
        "Receive personalized feedback",
        "Train around specific goals",
      ],

      facts: [
        {
          label:
            "1-on-1",

          sublabel:
            "Focused coaching",

          icon: UsersRound,
        },

        {
          label:
            "Technique",

          sublabel:
            "Skill development",

          icon: Target,
        },

        {
          label:
            "Mitts",

          sublabel:
            "Coach-led work",

          icon: BicepsFlexed,
        },

        {
          label:
            "Free Consult",

          sublabel:
            "Start with a coach",

          icon: CalendarDays,
        },
      ],

      primaryLabel:
        "Explore Personal Training",

      primaryHref:
        "#personal-training",

      secondaryLabel:
        "Contact A Coach",

      secondaryHref:
        "/message",
    },
  },

  {
    id: "personal-training",

    number: "05",

    title:
      "I want personal training",

    description:
      "Get individualized coaching built around your specific goals.",

    icon: UsersRound,

    recommendation: {
      eyebrow:
        "Individualized Coaching",

      title:
        "Personal Training",

      description:
        "Train directly with a Rebel coach through an individualized program designed around your goals, schedule, experience, and personality.",

      benefits: [
        "Training built around you",
        "One-on-one coach attention",
        "Strength or boxing-focused options",
        "In-person and virtual options",
        "Free initial consultation",
      ],

      facts: [
        {
          label:
            "Personalized",

          sublabel:
            "Goal-based training",

          icon: Goal,
        },

        {
          label:
            "1-on-1",

          sublabel:
            "Direct coaching",

          icon: UsersRound,
        },

        {
          label:
            "Flexible",

          sublabel:
            "Multiple options",

          icon: CalendarDays,
        },

        {
          label:
            "Free Consult",

          sublabel:
            "Get started",

          icon: Check,
        },
      ],

      primaryLabel:
        "Explore Personal Training",

      primaryHref:
        "#personal-training",

      secondaryLabel:
        "Get A Consultation",

      secondaryHref:
        "/message",
    },
  },

  {
    id: "nutrition",

    number: "06",

    title:
      "I want nutrition support",

    description:
      "Get personalized nutrition guidance focused on progress and results.",

    icon: Apple,

    recommendation: {
      eyebrow:
        "Nutrition Support",

      title:
        "Nutrition Coaching",

      description:
        "Receive personalized nutrition guidance built around your lifestyle, goals, progress, and sustainable long-term results.",

      benefits: [
        "Personalized nutrition guidance",
        "Goal-focused planning",
        "Progress-focused approach",
        "Individual coach support",
        "Complements your training",
      ],

      facts: [
        {
          label:
            "Personalized",

          sublabel:
            "Built around you",

          icon: Apple,
        },

        {
          label:
            "Progress",

          sublabel:
            "Goal-focused",

          icon: Goal,
        },

        {
          label:
            "Support",

          sublabel:
            "Coach guidance",

          icon: Heart,
        },

        {
          label:
            "Free Consult",

          sublabel:
            "Start here",

          icon: CalendarDays,
        },
      ],

      primaryLabel:
        "Explore Nutrition",

      primaryHref:
        "#personal-training",

      secondaryLabel:
        "Contact Rebel",

      secondaryHref:
        "/message",
    },
  },

  {
    id: "youth",

    number: "07",

    title:
      "I'm interested in youth training",

    description:
      "Age-appropriate conditioning programs for members under 16.",

    icon: UsersRound,

    recommendation: {
      eyebrow:
        "Youth Development",

      title:
        "Youth Conditioning",

      description:
        "Individualized conditioning for members under 16 with age-appropriate movement, fitness, confidence building, and supportive coaching.",

      benefits: [
        "Designed for members under 16",
        "Individualized conditioning",
        "Build movement foundations",
        "Develop confidence",
        "Supportive coaching",
      ],

      facts: [
        {
          label:
            "Under 16",

          sublabel:
            "Youth focused",

          icon: UsersRound,
        },

        {
          label:
            "Conditioning",

          sublabel:
            "Fitness development",

          icon: BicepsFlexed,
        },

        {
          label:
            "Confidence",

          sublabel:
            "Positive coaching",

          icon: Heart,
        },

        {
          label:
            "Free Consult",

          sublabel:
            "Meet a coach",

          icon: CalendarDays,
        },
      ],

      primaryLabel:
        "Explore Youth Training",

      primaryHref:
        "#personal-training",

      secondaryLabel:
        "Talk To A Coach",

      secondaryHref:
        "/message",
    },
  },

  {
    id: "open-gym",

    number: "08",

    title:
      "I prefer to train on my own",

    description:
      "Use bags, weights, cardio equipment, and turf on your own schedule.",

    icon: Dumbbell,

    recommendation: {
      eyebrow:
        "Train On Your Terms",

      title:
        "Open Gym",

      description:
        "Train independently using Rebel's heavy bags, specialty bags, weight room, cardio equipment, and turf space. Open gym access does not include group classes.",

      benefits: [
        "Train independently",
        "Heavy and specialty bags",
        "Weights and strength equipment",
        "Cardio and turf space",
        "Flexible self-directed training",
      ],

      facts: [
        {
          label:
            "Heavy Bags",

          sublabel:
            "Multiple styles",

          icon: BicepsFlexed,
        },

        {
          label:
            "Weights",

          sublabel:
            "Strength equipment",

          icon: Dumbbell,
        },

        {
          label:
            "Cardio + Turf",

          sublabel:
            "More ways to train",

          icon: PersonStanding,
        },

        {
          label:
            "Your Schedule",

          sublabel:
            "Train your way",

          icon: Goal,
        },
      ],

      primaryLabel:
        "Explore Open Gym",

      primaryHref:
        "#open-gym",

      secondaryLabel:
        "View Schedule",

      secondaryHref:
        "/schedule",
    },
  },
]

/* =========================================================
   TRUST POINTS
========================================================= */

const trustPoints = [
  {
    title:
      "No-Contact Workouts",

    description:
      "Hit heavy bags, not people.",

    icon: ShieldCheck,
  },

  {
    title:
      "All Fitness Levels",

    description:
      "Beginners to experienced.",

    icon: UsersRound,
  },

  {
    title:
      "Real Coaching",

    description:
      "Authentic boxing technique.",

    icon: Target,
  },

  {
    title:
      "Full-Body Training",

    description:
      "Strength, cardio, coordination.",

    icon: Dumbbell,
  },

  {
    title:
      "Supportive Community",

    description:
      "Welcoming and judgment-free.",

    icon: Heart,
  },
] as const

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function ClassesGoalFinderSection() {
  const [
    selectedGoal,
    setSelectedGoal,
  ] =
    React.useState<GoalId>(
      "beginner-boxing"
    )

  const activeGoal =
    goalOptions.find(
      (goal) =>
        goal.id ===
        selectedGoal
    ) ??
    goalOptions[0]

  return (
    <section
      id="find-your-fit"
      aria-labelledby="find-your-fit-heading"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-foreground
        text-background

        py-10

        sm:py-11

        lg:py-12
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

          bg-[radial-gradient(circle_at_50%_0%,var(--gold-06),transparent_30%),radial-gradient(circle_at_100%_100%,var(--gold-04),transparent_30%)]
        "
      />

      {/* DECORATIVE RING */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-28
          top-0
          z-0

          size-70

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
            max-w-160

            text-center
          "
        >
          {/* EYEBROW */}

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

                bg-primary/60
              "
            />

            <span
              className="
                rounded-full

                border
                border-primary/40

                px-3
                py-1

                text-[8px]
                font-black
                uppercase

                tracking-[0.2em]

                text-primary
              "
            >
              Start Here
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-8

                bg-primary/60
              "
            />
          </div>

          {/* HEADING */}

          <h2
            id="find-your-fit-heading"
            className="
              mt-3

              font-heading
              text-[clamp(2.5rem,6vw,4.3rem)]
              font-black
              uppercase

              leading-[0.9]
              tracking-tighter
            "
          >
            Find Your{" "}

            <span className="rebel-gold-text">
              Fit
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-3
              max-w-145

              text-xs
              leading-6

              text-background/60

              sm:text-[13px]
            "
          >
            Tell us your goal and we&apos;ll help
            you find the best place to start.
            Whether you&apos;re new or experienced,
            there&apos;s a Rebel training option
            built for you.
          </p>
        </div>

        {/* ===================================================
            MAIN FINDER
        ==================================================== */}

        <div
          className="
            mt-7

            grid
            grid-cols-1

            gap-4

            xl:grid-cols-[minmax(0,1.08fr)_minmax(430px,0.92fr)]
            xl:items-stretch
          "
        >
          {/* =================================================
              GOAL CARDS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1

              gap-2.5

              sm:grid-cols-2
            "
          >
            {goalOptions.map(
              (goal) => {
                const Icon =
                  goal.icon

                const active =
                  goal.id ===
                  selectedGoal

                return (
                  <button
                    key={goal.id}
                    type="button"
                    aria-pressed={
                      active
                    }
                    onClick={() =>
                      setSelectedGoal(
                        goal.id
                      )
                    }
                    className={cn(
                      `
                        group
                        relative
                        isolate

                        min-h-29

                        overflow-hidden

                        rounded-lg

                        border

                        p-3.5

                        text-left

                        outline-none

                        transition-[background-color,border-color,box-shadow]
                        duration-200

                        focus-visible:ring-2
                        focus-visible:ring-primary
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-foreground
                      `,

                      active
                        ? `
                          border-primary/75

                          bg-primary/10

                          shadow-(--shadow-gold-xs)
                        `
                        : `
                          border-background/10

                          bg-background/3

                          hover:border-primary/35
                          hover:bg-background/5
                        `
                    )}
                  >
                    {/* =========================================
                        ACTIVE CHECK
                    ========================================== */}

                    {active && (
                      <span
                        aria-hidden="true"
                        className="
                          absolute
                          right-2.5
                          top-2.5
                          z-20

                          flex
                          size-6

                          items-center
                          justify-center

                          rounded-full

                          bg-primary

                          text-primary-foreground

                          shadow-(--shadow-gold-xs)
                        "
                      >
                        <Check
                          className="size-3"
                          strokeWidth={2}
                        />
                      </span>
                    )}

                    {/* =========================================
                        CARD CONTENT
                    ========================================== */}

                    <div
                      className="
                        relative
                        z-10

                        grid
                        grid-cols-[40px_minmax(0,1fr)_28px]

                        items-center

                        gap-3
                      "
                    >
                      {/* NUMBER + ICON */}

                      <div>
                        <span
                          className="
                            block

                            font-heading
                            text-[10px]
                            font-black

                            text-primary
                          "
                        >
                          {goal.number}
                        </span>

                        <span
                          className={cn(
                            `
                              mt-2

                              flex
                              size-9

                              items-center
                              justify-center

                              rounded-md

                              border

                              transition-[background-color,border-color,color]
                              duration-200
                            `,

                            active
                              ? `
                                border-primary
                                bg-primary
                                text-primary-foreground
                              `
                              : `
                                border-primary/30
                                bg-primary/5
                                text-primary
                              `
                          )}
                        >
                          <Icon
                            aria-hidden={true}
                            strokeWidth={1.6}
                            className="size-4"
                          />
                        </span>
                      </div>

                      {/* TEXT */}

                      <div className="min-w-0">
                        <h3
                          className="
                            font-heading
                            text-sm
                            font-black

                            leading-[1.05]
                            tracking-tight

                            text-background

                            lg:text-[15px]
                          "
                        >
                          {goal.title}
                        </h3>

                        <p
                          className="
                            mt-1.5

                            max-w-55

                            text-[10px]
                            leading-4

                            text-background/55

                            lg:text-[11px]
                          "
                        >
                          {goal.description}
                        </p>
                      </div>

                      {/* ARROW */}

                      <span
                        className={cn(
                          `
                            flex
                            size-7
                            shrink-0

                            items-center
                            justify-center

                            rounded-full

                            border

                            transition-[background-color,border-color,color]
                            duration-200
                          `,

                          active
                            ? `
                              border-primary
                              bg-primary
                              text-primary-foreground
                            `
                            : `
                              border-primary/40
                              text-primary

                              group-hover:bg-primary
                              group-hover:text-primary-foreground
                            `
                        )}
                      >
                        <ArrowRight
                          aria-hidden={true}
                          strokeWidth={1.8}
                          className="
                            size-3

                            transition-transform
                            duration-200

                            group-hover:translate-x-0.5

                            motion-reduce:transform-none
                          "
                        />
                      </span>
                    </div>
                  </button>
                )
              }
            )}
          </div>

          {/* =================================================
              ACTIVE RECOMMENDATION
          ================================================== */}

          <RecommendationPanel
            goal={activeGoal}
          />
        </div>

        {/* ===================================================
            TRUST STRIP
        ==================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-2

            overflow-hidden

            rounded-lg

            border
            border-background/10

            bg-background/3

            lg:grid-cols-5
          "
        >
          {trustPoints.map(
            (
              point,
              index
            ) => {
              const Icon =
                point.icon

              return (
                <div
                  key={
                    point.title
                  }
                  className={cn(
                    `
                      flex
                      items-center

                      gap-2.5

                      px-3.5
                      py-3
                    `,

                    index % 2 ===
                      1 &&
                      `
                        border-l
                        border-background/10
                      `,

                    index >= 2 &&
                      `
                        border-t
                        border-background/10
                      `,

                    `
                      lg:border-t-0
                    `,

                    index > 0 &&
                      `
                        lg:border-l
                        lg:border-background/10
                      `
                  )}
                >
                  <Icon
                    aria-hidden={true}
                    strokeWidth={1.6}
                    className="
                      size-4
                      shrink-0

                      text-primary
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[7px]
                        font-black
                        uppercase

                        leading-3
                        tracking-[0.08em]

                        text-background
                      "
                    >
                      {point.title}
                    </p>

                    <p
                      className="
                        mt-0.5

                        hidden

                        text-[7px]
                        leading-3

                        text-background/45

                        xl:block
                      "
                    >
                      {point.description}
                    </p>
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   RECOMMENDATION PANEL
========================================================= */

function RecommendationPanel({
  goal,
}: {
  goal: GoalOption
}) {
  const recommendation =
    goal.recommendation

  const Icon =
    goal.icon

  return (
    <article
      className="
        relative
        isolate

        overflow-hidden

        rounded-xl

        border
        border-primary/35

        bg-background

        p-5

        text-foreground

        shadow-(--shadow-card)

        sm:p-6
      "
    >
      {/* =====================================================
          GOLD ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_100%_0%,var(--gold-10),transparent_36%)]
        "
      />

      {/* =====================================================
          LARGE DECORATIVE ICON
      ====================================================== */}

      <Icon
        aria-hidden={true}
        strokeWidth={0.6}
        className="
          pointer-events-none

          absolute
          -right-5
          top-14
          z-0

          size-44

          text-primary/4
        "
      />

      {/* =====================================================
          LARGE DECORATIVE NUMBER
      ====================================================== */}

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

          text-foreground/3
        "
      >
        {goal.number}
      </span>

      {/* =====================================================
          PANEL CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          flex
          h-full
          flex-col
        "
      >
        {/* ===================================================
            EYEBROW
        ==================================================== */}

        <div
          className="
            flex
            items-center

            gap-2.5
          "
        >
          <span
            className="
              flex
              size-7

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
              strokeWidth={1.6}
              className="size-3.5"
            />
          </span>

          <span
            className="
              text-[8px]
              font-black
              uppercase

              tracking-[0.18em]

              text-primary
            "
          >
            {recommendation.eyebrow}
          </span>
        </div>

        {/* ===================================================
            TITLE
        ==================================================== */}

        <h3
          className="
            mt-4

            max-w-95

            font-heading
            text-[clamp(2.4rem,4vw,3.7rem)]
            font-black
            uppercase

            leading-[0.88]
            tracking-tighter

            text-foreground
          "
        >
          {recommendation.title}
        </h3>

        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        <p
          className="
            mt-4

            max-w-115

            text-[11px]
            leading-5

            text-text-secondary

            sm:text-xs
          "
        >
          {recommendation.description}
        </p>

        {/* ===================================================
            BENEFITS
        ==================================================== */}

        <ul
          className="
            mt-4

            grid
            grid-cols-1

            gap-1.5
          "
        >
          {recommendation.benefits.map(
            (benefit) => (
              <li
                key={benefit}
                className="
                  flex
                  items-center

                  gap-2

                  text-[10px]
                  leading-4

                  text-text-soft

                  sm:text-[11px]
                "
              >
                <span
                  className="
                    flex
                    size-4
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-primary

                    text-primary-foreground
                  "
                >
                  <Check
                    aria-hidden={true}
                    className="size-2.5"
                    strokeWidth={2}
                  />
                </span>

                {benefit}
              </li>
            )
          )}
        </ul>

        {/* ===================================================
            FACTS
        ==================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-2

            border-y
            border-foreground/10

            sm:grid-cols-4
          "
        >
          {recommendation.facts.map(
            (
              fact,
              index
            ) => {
              const FactIcon =
                fact.icon

              return (
                <div
                  key={fact.label}
                  className={cn(
                    `
                      px-1.5
                      py-3

                      text-center
                    `,

                    index % 2 ===
                      1 &&
                      `
                        border-l
                        border-foreground/10
                      `,

                    index >= 2 &&
                      `
                        border-t
                        border-foreground/10
                      `,

                    `
                      sm:border-t-0
                    `,

                    index > 0 &&
                      `
                        sm:border-l
                        sm:border-foreground/10
                      `
                  )}
                >
                  <FactIcon
                    aria-hidden={true}
                    strokeWidth={1.5}
                    className="
                      mx-auto
                      size-4

                      text-primary
                    "
                  />

                  <p
                    className="
                      mt-1.5

                      text-[6px]
                      font-black
                      uppercase

                      leading-3
                      tracking-[0.04em]

                      text-foreground

                      sm:text-[7px]
                    "
                  >
                    {fact.label}
                  </p>

                  <p
                    className="
                      mt-0.5

                      hidden

                      text-[6px]
                      leading-3

                      text-text-muted

                      sm:block
                    "
                  >
                    {fact.sublabel}
                  </p>
                </div>
              )
            }
          )}
        </div>

        {/* ===================================================
            ACTIONS
        ==================================================== */}

        <div
          className="
            mt-auto
            pt-4

            grid
            grid-cols-1

            gap-2

            sm:grid-cols-2
          "
        >
          {/* PRIMARY */}

          <Link
            href={
              recommendation.primaryHref
            }
            className={cn(
              buttonVariants(),
              `
                group

                min-h-9
                w-full

                bg-primary

                px-3

                text-[8px]
                font-black
                uppercase

                tracking-[0.06em]

                text-primary-foreground

                shadow-(--shadow-gold-xs)

                hover:bg-gold-hover
                hover:text-primary-foreground
                hover:shadow-(--shadow-gold-sm)
              `
            )}
          >
            {recommendation.primaryLabel}

            <ArrowRight
              aria-hidden={true}
              strokeWidth={1.8}
              className="
                size-3

                transition-transform
                duration-200

                group-hover:translate-x-0.5

                motion-reduce:transform-none
              "
            />
          </Link>

          {/* SECONDARY */}

          {recommendation.secondaryLabel &&
            recommendation.secondaryHref && (
              <Link
                href={
                  recommendation.secondaryHref
                }
                className="
                  group

                  inline-flex
                  min-h-9
                  w-full

                  items-center
                  justify-center

                  gap-2

                  rounded-md

                  border
                  border-primary/40

                  bg-transparent

                  px-3

                  text-[8px]
                  font-black
                  uppercase

                  tracking-[0.06em]

                  text-foreground

                  transition-[background-color,border-color,color]
                  duration-200

                  hover:border-primary
                  hover:bg-primary/5
                  hover:text-primary

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                "
              >
                {recommendation.secondaryLabel}

                <ArrowRight
                  aria-hidden={true}
                  strokeWidth={1.8}
                  className="
                    size-3

                    transition-transform
                    duration-200

                    group-hover:translate-x-0.5

                    motion-reduce:transform-none
                  "
                />
              </Link>
            )}
        </div>
      </div>
    </article>
  )
}
