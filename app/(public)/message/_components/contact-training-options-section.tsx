import Link from "next/link"

import {
  ArrowUpRight,
  CalendarDays,
  Dumbbell,
  UserRound,
} from "lucide-react"

/* =========================================================
   CONTACT — TRAINING OPTIONS

   Purpose:
   Give visitors three clear next actions after
   viewing the gym location.

   No contact details are repeated here.

   Actions:
   - Personal Training
   - Group Classes
   - Class Schedule

   Design:
   - Compact editorial layout
   - Rebel black / charcoal / gold
   - No floating cards
   - No transform-based hover movement
   - Responsive
   - Server Component
========================================================= */

const trainingOptions = [
  {
    id: "personal-training",

    number: "01",

    eyebrow: "One-on-One",

    title: "Personal Training",

    description:
      "Work directly with a Rebel coach and build a training experience around your goals, ability, and lifestyle.",

    href: "/classes#personal-training",

    cta: "Explore Training",

    icon: UserRound,
  },

  {
    id: "group-classes",

    number: "02",

    eyebrow: "Train Together",

    title: "Group Classes",

    description:
      "Experience high-energy no-contact boxing and kickboxing workouts designed for different fitness levels.",

    href: "/schedule",

    cta: "Explore Classes",

    icon: Dumbbell,
  },

  {
    id: "schedule",

    number: "03",

    eyebrow: "Find Your Time",

    title: "Class Schedule",

    description:
      "Classes run throughout the week. Find a workout that fits your routine and start training with Rebel.",

    href: "/schedule",

    cta: "View Schedule",

    icon: CalendarDays,
  },
] as const

export function ContactTrainingOptionsSection() {
  return (
    <section
      id="training-options"
      aria-labelledby="training-options-heading"
      className="
        relative
        isolate
        overflow-hidden

        border-t
        border-foreground/8

        bg-background
        text-foreground

        py-12

        sm:py-14
        lg:py-16
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

          bg-[radial-gradient(ellipse_at_50%_100%,var(--gold-06),transparent_60%)]
        "
      />

      {/* TOP ACCENT */}

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
          via-primary/40
          to-transparent
        "
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-20

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
            SECTION HEADER
        ==================================================== */}

        <div
          className="
            mb-8

            flex
            flex-col
            gap-4

            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-12
          "
        >
          <div>
            {/* EYEBROW */}

            <div
              className="
                mb-3

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
                Take The Next Step
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
              id="training-options-heading"
              className="
                font-heading
                font-black
                uppercase

                leading-[0.95]
                tracking-[-0.045em]

                text-[clamp(2.4rem,8vw,3.8rem)]

                sm:text-[clamp(2.8rem,5vw,4.2rem)]

                lg:text-[clamp(2.8rem,3.5vw,4rem)]
              "
            >
              Train Your{" "}
              <span className="rebel-gold-text">
                Way.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-115

              text-sm
              leading-7

              text-text-secondary

              lg:text-right
            "
          >
            Whether you want focused coaching,
            group energy, or simply need to find
            the right class time, there&apos;s a
            place to start at Rebel.
          </p>
        </div>

        {/* ===================================================
            EDITORIAL ACTION RAIL

            Not traditional cards.

            Each item shares one continuous surface,
            separated only by structural lines.
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
          <div
            className="
              grid
              grid-cols-1

              lg:grid-cols-3
            "
          >
            {trainingOptions.map(
              (option, index) => {
                const Icon = option.icon

                return (
                  <article
                    key={option.id}
                    className="
                      group
                      relative
                      isolate

                      overflow-hidden

                      border-t
                      border-foreground/10

                      first:border-t-0

                      lg:border-l
                      lg:border-t-0

                      lg:first:border-l-0
                    "
                  >
                    {/* =====================================
                        HOVER BACKGROUND

                        Static outer article prevents
                        border shaking.
                    ====================================== */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none

                        absolute
                        inset-0
                        z-0

                        bg-primary/0

                        transition-colors
                        duration-300

                        group-hover:bg-primary/5
                      "
                    />

                    {/* GOLD CORNER GLOW */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none

                        absolute
                        -right-20
                        -top-20
                        z-0

                        size-44
                        rounded-full

                        bg-[radial-gradient(circle,var(--gold-08)_0%,transparent_68%)]

                        opacity-0

                        transition-opacity
                        duration-300

                        group-hover:opacity-100
                      "
                    />

                    {/* CONTENT */}

                    <div
                      className="
                        relative
                        z-10

                        flex
                        min-h-71.25
                        flex-col

                        p-6

                        sm:p-7

                        lg:min-h-77.5
                        lg:p-8
                      "
                    >
                      {/* TOP */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-6
                        "
                      >
                        {/* ICON */}

                        <span
                          className="
                            flex
                            size-11
                            shrink-0

                            items-center
                            justify-center

                            rounded-full

                            border
                            border-primary/35

                            bg-primary/5

                            text-primary

                            transition-[background-color,border-color,color]
                            duration-300

                            group-hover:border-primary/65
                            group-hover:bg-primary
                            group-hover:text-primary-foreground
                          "
                        >
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.6}
                            className="size-5"
                          />
                        </span>

                        {/* NUMBER */}

                        <span
                          aria-hidden="true"
                          className="
                            font-heading
                            text-sm
                            font-black

                            text-text-faint

                            transition-colors
                            duration-300

                            group-hover:text-primary
                          "
                        >
                          {option.number}
                        </span>
                      </div>

                      {/* CONTENT */}

                      <div className="mt-7">
                        <p
                          className="
                            text-[9px]
                            font-bold
                            uppercase

                            tracking-[0.2em]

                            text-primary
                          "
                        >
                          {option.eyebrow}
                        </p>

                        <h3
                          className="
                            mt-2

                            font-heading
                            text-[clamp(1.65rem,4vw,2.25rem)]
                            font-black
                            uppercase

                            leading-none
                            tracking-[-0.035em]

                            text-foreground
                          "
                        >
                          {option.title}
                        </h3>

                        <p
                          className="
                            mt-4

                            max-w-82.5

                            text-[13px]
                            leading-6

                            text-text-secondary
                          "
                        >
                          {option.description}
                        </p>
                      </div>

                      {/* CTA */}

                      <div
                        className="
                          mt-auto
                          pt-7
                        "
                      >
                        <Link
                          href={option.href}
                          className="
                            inline-flex
                            items-center
                            gap-3

                            text-[10px]
                            font-bold
                            uppercase

                            tracking-widest

                            text-foreground

                            transition-colors
                            duration-200

                            hover:text-primary

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                          "
                        >
                          {option.cta}

                          <ArrowUpRight
                            aria-hidden="true"
                            className="
                              size-4

                              text-primary

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

                    {/* =====================================
                        ACTIVE BOTTOM LINE
                    ====================================== */}

                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-0
                        left-0
                        z-20

                        h-0.5
                        w-full

                        origin-left
                        scale-x-0

                        bg-primary

                        transition-transform
                        duration-300

                        group-hover:scale-x-100

                        motion-reduce:transition-none
                      "
                    />

                    {/* MOBILE / TABLET INDEX */}

                    {index < 2 && (
                      <span
                        aria-hidden="true"
                        className="sr-only"
                      >
                        Continue
                      </span>
                    )}
                  </article>
                )
              }
            )}
          </div>
        </div>

        {/* ===================================================
            SMALL SUPPORTING LINE
        ==================================================== */}

        <div
          className="
            mt-4

            flex
            flex-col
            gap-2

            text-[9px]
            font-semibold
            uppercase

            tracking-[0.14em]

            text-text-muted

            sm:flex-row
            sm:items-center
            sm:justify-between

            sm:text-[10px]
          "
        >
          <span>
            Start where you are.
          </span>

          <span>
            Build from there.
          </span>
        </div>
      </div>
    </section>
  )
}
