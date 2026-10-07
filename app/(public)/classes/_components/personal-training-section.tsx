import {
  Apple,
  BicepsFlexed,
  Dumbbell,
  Laptop,
  MessageCircle,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

/* =========================================================
   TYPES
========================================================= */

type TrainingOption = {
  number: string
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
}

/* =========================================================
   DATA
========================================================= */

const supportingOptions: TrainingOption[] = [
  {
    number: "02",
    eyebrow: "Strength Training",
    title: "Weights Training",
    description:
      "Individualized strength and resistance training built around your goals, current ability, and progress.",
    icon: Dumbbell,
  },
  {
    number: "03",
    eyebrow: "Personalized Support",
    title: "Nutrition Coaching",
    description:
      "Nutrition guidance shaped around your goals, lifestyle, habits, and sustainable long-term progress.",
    icon: Apple,
  },
  {
    number: "04",
    eyebrow: "Members Under 16",
    title: "Youth Conditioning",
    description:
      "Individualized conditioning for younger members focused on fitness, movement, and athletic development.",
    icon: UsersRound,
  },
  {
    number: "05",
    eyebrow: "Train From Anywhere",
    title: "Online Training",
    description:
      "Individualized coaching and programming for people who need more flexibility outside the gym.",
    icon: Laptop,
  },
]

const boxingFocusAreas = [
  "Technique",
  "Combinations",
  "Timing",
  "Movement",
  "Mitt Work",
] as const

/* =========================================================
   SECTION
========================================================= */

export function PersonalTrainingSection() {
  return (
    <section
      id="personal-training"
      aria-labelledby="personal-training-heading"
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

          bg-[radial-gradient(circle_at_15%_0%,var(--gold-08),transparent_31%),radial-gradient(circle_at_100%_100%,var(--gold-04),transparent_28%)]
        "
      />

      {/* DECORATIVE RING */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-36
          -top-32
          z-0

          size-80

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
            grid
            grid-cols-1

            gap-5

            lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.55fr)]
            lg:items-end
            lg:gap-14
          "
        >
          <div>
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
                Personal Training
              </span>
            </div>

            <h2
              id="personal-training-heading"
              className="
                mt-5

                max-w-220

                font-heading
                text-[clamp(3rem,6vw,5rem)]
                font-black
                uppercase

                leading-[0.9]
                tracking-tighter

                text-background
              "
            >
              Built Around{" "}
              <span className="rebel-gold-text">
                Your Goals.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-120

              text-[13px]
              leading-6.5

              text-background/60

              sm:text-sm
              lg:text-[15px]
            "
          >
            Get individualized coaching based on what you
            want to improve—whether that&apos;s boxing
            technique, strength, nutrition, youth conditioning,
            or flexible online training.
          </p>
        </div>

        {/* ===================================================
            TRAINING OPTIONS
        ==================================================== */}

        <div
          className="
            mt-9

            grid
            grid-cols-1

            gap-4

            lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]
            lg:gap-5
          "
        >
          {/* =================================================
              01 — BOXING & MITTS
          ================================================== */}

          <article
            className="
              group
              relative
              isolate
              overflow-hidden

              rounded-xl

              border
              border-primary/25

              bg-background

              p-6

              shadow-(--shadow-card-soft)

              sm:p-7
              lg:p-7
            "
          >
            {/* BACKGROUND NUMBER */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                -right-2
                -top-5
                z-0

                font-heading
                text-[8rem]
                font-black

                leading-none
                tracking-tighter

                text-foreground/3

                sm:text-[10rem]
              "
            >
              01
            </span>

            {/* GOLD GLOW */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                z-0

                bg-[radial-gradient(circle_at_100%_0%,var(--gold-12),transparent_48%)]
              "
            />

            <div
              className="
                relative
                z-10

                flex
                h-full
                flex-col
              "
            >
              {/* TOP */}

              <div
                className="
                  flex
                  items-center
                  justify-between

                  gap-4
                "
              >
                <span
                  className="
                    flex
                    size-11

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-primary/40

                    bg-primary/7

                    text-primary
                  "
                >
                  <Target
                    aria-hidden={true}
                    strokeWidth={1.55}
                    className="size-5"
                  />
                </span>

                <span
                  className="
                    font-heading
                    text-[10px]
                    font-black

                    text-primary
                  "
                >
                  01
                </span>
              </div>

              {/* CONTENT */}

              <div className="mt-6">
                <p
                  className="
                    text-[8px]
                    font-black
                    uppercase

                    tracking-[0.18em]

                    text-primary
                  "
                >
                  Technical Coaching
                </p>

                <h3
                  className="
                    mt-2.5

                    font-heading
                    text-[clamp(2.5rem,4.5vw,4rem)]
                    font-black
                    uppercase

                    leading-[0.9]
                    tracking-tighter

                    text-foreground
                  "
                >
                  Boxing
                  <span className="block">
                    & Mitts
                  </span>
                </h3>

                <p
                  className="
                    mt-4

                    max-w-115

                    text-xs
                    leading-6

                    text-text-secondary

                    sm:text-[13px]
                  "
                >
                  Focused one-on-one boxing work covering
                  technique, combinations, timing, movement,
                  precision, and mitt training.
                </p>
              </div>

              {/* FOCUS AREAS */}

              <div
                className="
                  mt-7

                  border-t
                  border-foreground/10

                  pt-5
                "
              >
                <p
                  className="
                    text-[8px]
                    font-black
                    uppercase

                    tracking-[0.16em]

                    text-text-muted
                  "
                >
                  Focus Areas
                </p>

                <div
                  className="
                    mt-3

                    flex
                    flex-wrap

                    gap-2
                  "
                >
                  {boxingFocusAreas.map((item) => (
                    <span
                      key={item}
                      className="
                        rounded-full

                        border
                        border-foreground/10

                        px-3
                        py-1.5

                        text-[8px]
                        font-bold
                        uppercase

                        tracking-[0.08em]

                        text-text-secondary
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="
                  mt-auto
                  pt-7
                "
              >
                <div
                  className="
                    flex
                    items-center

                    gap-2

                    border-t
                    border-foreground/10

                    pt-4
                  "
                >
                  <BicepsFlexed
                    aria-hidden={true}
                    strokeWidth={1.5}
                    className="
                      size-4
                      text-primary
                    "
                  />

                  <p
                    className="
                      text-[8px]
                      font-black
                      uppercase

                      tracking-[0.12em]

                      text-text-muted
                    "
                  >
                    One-On-One Skill Development
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* =================================================
              02–05 SUPPORTING OPTIONS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1

              gap-4

              sm:grid-cols-2
            "
          >
            {supportingOptions.map((option) => (
              <TrainingOptionCard
                key={option.number}
                option={option}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            FREE CONSULTATION
        ==================================================== */}

        <div
          className="
            relative
            isolate

            mt-5
            overflow-hidden

            rounded-xl

            border
            border-primary/25

            bg-primary/5

            px-5
            py-5

            sm:px-6
            lg:px-7
          "
        >
          {/* BACKGROUND GLOW */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-0
              z-0

              bg-[linear-gradient(90deg,var(--gold-08),transparent_48%)]
            "
          />

          <div
            className="
              relative
              z-10

              grid
              grid-cols-[40px_minmax(0,1fr)]

              gap-4

              sm:grid-cols-[44px_minmax(0,1fr)_auto]
              sm:items-center
              sm:gap-5
            "
          >
            {/* ICON */}

            <span
              className="
                flex
                size-10

                items-center
                justify-center

                rounded-full

                bg-primary

                text-primary-foreground
              "
            >
              <MessageCircle
                aria-hidden={true}
                strokeWidth={1.6}
                className="size-4"
              />
            </span>

            {/* CONTENT */}

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
                Start With A Conversation
              </p>

              <h3
                className="
                  mt-1.5

                  font-heading
                  text-xl
                  font-black
                  uppercase

                  leading-none
                  tracking-tight

                  text-background

                  sm:text-2xl
                "
              >
                Free Initial Consultation
              </h3>

              <p
                className="
                  mt-2

                  max-w-170

                  text-[11px]
                  leading-5

                  text-background/58

                  sm:text-xs
                "
              >
                Every personal training program begins with an
                initial consultation to understand your goals
                and determine the right coaching approach.
              </p>
            </div>

            {/* SIDE LABEL */}

            <div
              className="
                col-start-2

                sm:col-start-auto
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
                Individualized Coaching
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   SUPPORTING TRAINING OPTION
========================================================= */

type TrainingOptionCardProps = {
  option: TrainingOption
}

function TrainingOptionCard({
  option,
}: TrainingOptionCardProps) {
  const Icon = option.icon

  return (
    <article
      className="
        group
        relative
        isolate
        overflow-hidden

        min-h-52

        rounded-xl

        border
        border-background/10

        bg-white/42

        p-5

        transition-[background-color,border-color,box-shadow]
        duration-250

        hover:border-primary/30
        hover:bg-white/55
        hover:shadow-(--shadow-card-soft)

        sm:p-6
      "
    >
      {/* NUMBER */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-4
          top-3
          z-0

          font-heading
          text-5xl
          font-black

          leading-none

          text-background/5
        "
      >
        {option.number}
      </span>

      {/* GOLD GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_100%_0%,var(--gold-07),transparent_44%)]

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      <div
        className="
          relative
          z-10

          flex
          h-full
          flex-col
        "
      >
        {/* TOP */}

        <div
          className="
            flex
            items-center
            justify-between

            gap-4
          "
        >
          <span
            className="
              flex
              size-10

              items-center
              justify-center

              rounded-xl

              border
              border-primary/30

              bg-primary/5

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
              strokeWidth={1.55}
              className="size-4.5"
            />
          </span>

          <span
            className="
              font-heading
              text-[9px]
              font-black

              text-primary
            "
          >
            {option.number}
          </span>
        </div>

        {/* CONTENT */}

        <div className="mt-5">
          <p
            className="
              text-[8px]
              font-black
              uppercase

              tracking-[0.15em]

              text-primary
            "
          >
            {option.eyebrow}
          </p>

          <h3
            className="
              mt-2

              max-w-70

              font-heading
              text-[1.35rem]
              font-black
              uppercase

              leading-[0.95]
              tracking-tight

              text-background

              sm:text-[1.5rem]
            "
          >
            {option.title}
          </h3>

          <p
            className="
              mt-3

              text-[11px]
              leading-5.5

              text-background/60

              sm:text-xs
            "
          >
            {option.description}
          </p>
        </div>
      </div>
    </article>
  )
}