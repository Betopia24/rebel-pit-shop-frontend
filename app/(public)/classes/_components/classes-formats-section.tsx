import Link from "next/link"

import {
  ArrowUpRight,
  Dumbbell,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

type ClassFormat = {
  id: string
  eyebrow: string
  title: string
  description: string
  benefits: string[]
  href: string
  cta: string
  icon: LucideIcon
}

const classFormats: ClassFormat[] = [
  {
    id: "group-classes",
    eyebrow: "Train Together",
    title: "Boxing & Kickboxing",
    description:
      "High-energy, no-contact workouts that build real technique, conditioning, confidence, and community.",
    benefits: [
      "Beginner-friendly coaching",
      "Boxing and kickboxing formats",
      "Full-body conditioning",
    ],
    href: "/schedule",
    cta: "View Class Schedule",
    icon: UsersRound,
  },
  {
    id: "personal-training",
    eyebrow: "One-on-One",
    title: "Personal Training",
    description:
      "Individualized coaching built around your goals, schedule, experience, and preferred training style.",
    benefits: [
      "Technical boxing and mitt work",
      "Strength and conditioning",
      "Nutrition and online options",
    ],
    href: "/message#contact-form",
    cta: "Talk With A Coach",
    icon: Target,
  },
  {
    id: "open-gym",
    eyebrow: "Train On Your Terms",
    title: "Open Gym",
    description:
      "Use Rebel's heavy bags, weights, cardio equipment, and turf space to train independently on your schedule.",
    benefits: [
      "Heavy bags and specialty bags",
      "Weights and cardio equipment",
      "Flexible independent training",
    ],
    href: "/schedule",
    cta: "Find Your Time",
    icon: Dumbbell,
  },
]

export function ClassesFormatsSection() {
  return (
    <section
      id="class-formats"
      aria-labelledby="class-formats-heading"
      className="
        relative
        isolate
        overflow-hidden

        bg-background
        py-20
        text-foreground

        sm:py-24
        lg:py-32
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-linear-to-r
          from-transparent
          via-primary/40
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-350
          px-5

          sm:px-7
          md:px-10
          lg:px-14
          xl:px-20
        "
      >
        <div
          className="
            mx-auto
            max-w-180
            text-center
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-primary
            "
          >
            Find Your Training Style
          </p>

          <h2
            id="class-formats-heading"
            className="
              mt-4
              text-3xl
              font-black
              tracking-[-0.04em]
              text-foreground

              sm:text-4xl
              lg:text-5xl
            "
          >
            A place to train at every level.
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-150
              text-sm
              leading-7
              text-text-secondary

              sm:text-base
            "
          >
            Start where you are, choose the support you need, and build a training routine that keeps you coming back.
          </p>
        </div>

        <div
          className="
            mt-12
            grid
            gap-4

            md:grid-cols-3
            lg:mt-16
          "
        >
          {classFormats.map((format, index) => {
            const Icon = format.icon

            return (
              <article
                id={format.id}
                key={format.id}
                className="
                  scroll-mt-28
                  flex
                  min-h-105
                  flex-col
                  rounded-2xl
                  border
                  border-foreground/10
                  bg-surface-card/60
                  p-6
                  shadow-(--shadow-card-soft)
                  transition-[border-color,background-color,box-shadow,transform]
                  duration-300

                  hover:-translate-y-1
                  hover:border-primary/40
                  hover:bg-surface-card
                  hover:shadow-(--shadow-card)

                  motion-reduce:transform-none
                  sm:p-7
                "
              >
                <div className="flex items-center justify-between">
                  <span
                    className="
                      text-[10px]
                      font-bold
                      tracking-[0.18em]
                      text-primary/75
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      flex
                      size-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-primary/25
                      bg-primary/5
                      text-primary
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.7}
                    />
                  </span>
                </div>

                <p
                  className="
                    mt-10
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-text-secondary
                  "
                >
                  {format.eyebrow}
                </p>

                <h3
                  className="
                    mt-3
                    text-2xl
                    font-black
                    tracking-[-0.03em]
                    text-foreground
                  "
                >
                  {format.title}
                </h3>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-6
                    text-text-secondary
                  "
                >
                  {format.description}
                </p>

                <ul
                  className="
                    mt-6
                    space-y-3
                    border-t
                    border-foreground/10
                    pt-5
                  "
                >
                  {format.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="
                        flex
                        items-center
                        gap-3
                        text-xs
                        text-text-soft
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-primary"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link
                  href={format.href}
                  className="
                    group
                    mt-auto
                    inline-flex
                    items-center
                    gap-2
                    pt-8
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-primary
                    transition-colors
                    hover:text-gold-hover
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-4
                    focus-visible:ring-offset-background
                  "
                >
                  {format.cta}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                  />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
