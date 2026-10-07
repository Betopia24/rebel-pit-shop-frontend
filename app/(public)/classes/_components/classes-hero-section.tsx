import Image from "next/image"
import Link from "next/link"

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Dumbbell,
  UsersRound,
} from "lucide-react"

import {
  buttonVariants,
} from "@/components/ui/button"

import { cn } from "@/lib/utils"

const heroHighlights = [
  {
    label: "All Levels Welcome",
    description: "Beginner to experienced",
    icon: UsersRound,
  },
  {
    label: "30 / 60 / 75 Min",
    description: "Flexible class options",
    icon: Clock3,
  },
  {
    label: "7 Days A Week",
    description: "Morning to evening",
    icon: CalendarDays,
  },
  {
    label: "Group + Personal",
    description: "Real coaching. Real progress.",
    icon: Dumbbell,
  },
] as const

export function ClassesHeroSection() {
  return (
    <section
      id="classes-hero"
      aria-labelledby="classes-hero-heading"
      aria-describedby="classes-hero-description"
      className="
        relative
        isolate

        min-h-175
        overflow-hidden

        bg-background
        text-foreground

        sm:min-h-180

        lg:min-h-170

        xl:min-h-180
      "
    >
      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <Image
        src="/images/classes/classes-header.jpg"
        alt="Rebel Boxing Club training area"
        fill
        priority
        sizes="100vw"
        className="
          object-cover

          object-[62%_center]

          sm:object-[65%_center]

          lg:object-[67%_center]
        "
      />

      {/* =====================================================
          IMAGE OVERLAYS
      ====================================================== */}

      {/* BASE DARKEN */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0

          bg-black/30
        "
      />

      {/* LEFT READABILITY */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0

          bg-linear-to-r

          from-black/95
          via-black/78
          to-black/20

          sm:via-black/72

          lg:from-black/96
          lg:via-black/68
          lg:to-black/5
        "
      />

      {/* MOBILE BOTTOM DARKNESS */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0

          bg-linear-to-t

          from-black/92
          via-transparent
          to-black/30

          lg:from-black/75
        "
      />

      {/* NAVBAR AREA */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          z-0

          h-40

          bg-linear-to-b
          from-black/65
          to-transparent
        "
      />

      {/* GOLD ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_28%_52%,var(--gold-08),transparent_35%)]
        "
      />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          flex
          min-h-175
          w-full
          max-w-400

          items-center

          px-5
          pb-38
          pt-30

          sm:min-h-180
          sm:px-7
          sm:pb-40
          sm:pt-32

          md:px-10

          lg:min-h-170
          lg:px-14
          lg:pb-30
          lg:pt-34

          xl:min-h-180
          xl:px-20
        "
      >
        <div
          className="
            w-full
            max-w-180
          "
        >
          {/* =================================================
              EYEBROW
          ================================================== */}

          <div
            className="
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

                tracking-[0.26em]

                text-primary

                sm:text-[11px]
              "
            >
              Classes At Rebel
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-12

                bg-primary/70

                sm:w-16
              "
            />
          </div>

          {/* =================================================
              HEADING
          ================================================== */}

          <h1
            id="classes-hero-heading"
            className="
              mt-5

              max-w-170

              font-heading
              font-black
              uppercase

              leading-[0.88]
              tracking-tighter

              text-[clamp(3.8rem,16vw,6rem)]

              sm:text-[clamp(5rem,11vw,7rem)]

              lg:text-[clamp(5.3rem,7vw,7.4rem)]
            "
          >
            Find Your{" "}

            <span
              className="
                block
                rebel-gold-text
              "
            >
              Perfect
            </span>

            <span className="block">
              Class.
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            id="classes-hero-description"
            className="
              mt-6

              max-w-145

              text-sm
              leading-6.5

              text-text-secondary

              sm:text-[15px]
              sm:leading-7

              lg:text-base
            "
          >
            Explore boxing fitness, kickboxing,
            personal training, nutrition coaching,
            youth conditioning, online training,
            and open gym access. Find the training
            style that fits your goals.
          </p>

          {/* =================================================
              CTA
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
            {/* PRIMARY */}

            <Link
              href="#find-your-fit"
              className={cn(
                buttonVariants(),
                `
                  group

                  min-h-12

                  bg-primary

                  px-6

                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.1em]

                  text-primary-foreground

                  shadow-(--shadow-gold-sm)

                  hover:bg-gold-hover
                  hover:text-primary-foreground
                  hover:shadow-(--shadow-gold-md)

                  sm:min-w-43
                `
              )}
            >
              Explore Classes

              <ArrowDownRight
                aria-hidden={true}
                strokeWidth={1.8}
                className="
                  size-4

                  transition-transform
                  duration-300

                  group-hover:translate-x-0.5
                  group-hover:translate-y-0.5

                  motion-reduce:transform-none
                "
              />
            </Link>

            {/* SECONDARY */}

            <Link
              href="/schedule"
              className="
                group

                inline-flex
                min-h-12

                items-center
                justify-center

                gap-2.5

                rounded-md

                border
                border-primary/55

                bg-black/25

                px-6

                text-[10px]
                font-bold
                uppercase

                tracking-[0.1em]

                text-foreground

                backdrop-blur-sm

                transition-[background-color,border-color,color]
                duration-200

                hover:border-primary
                hover:bg-primary/10
                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary

                sm:min-w-40
              "
            >
              View Schedule

              <ArrowUpRight
                aria-hidden={true}
                strokeWidth={1.8}
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

      {/* =====================================================
          DESKTOP HIGHLIGHT STRIP
      ====================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20

          hidden

          border-t
          border-foreground/10

          bg-black/72

          backdrop-blur-xl
          backdrop-saturate-150

          lg:block
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-400

            grid-cols-4

            px-14

            xl:px-20
          "
        >
          {heroHighlights.map(
            ({
              label,
              description,
              icon: Icon,
            },
            index) => (
              <div
                key={label}
                className={cn(
                  `
                    flex
                    min-h-25

                    items-center

                    gap-4

                    py-5
                  `,
                  index > 0 &&
                    `
                      border-l
                      border-foreground/10

                      pl-7

                      xl:pl-9
                    `,
                  index <
                    heroHighlights.length -
                      1 &&
                    `
                      pr-7

                      xl:pr-9
                    `
                )}
              >
                <div
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
                  <Icon
                    aria-hidden={true}
                    strokeWidth={1.5}
                    className="size-4.5"
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase

                      tracking-[0.14em]

                      text-foreground

                      xl:text-[10px]
                    "
                  >
                    {label}
                  </p>

                  <p
                    className="
                      mt-1

                      text-[8px]
                      font-medium
                      uppercase

                      tracking-[0.1em]

                      text-text-muted

                      xl:text-[9px]
                    "
                  >
                    {description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* =====================================================
          MOBILE BOTTOM INFO
      ====================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20

          border-t
          border-foreground/10

          bg-black/80

          backdrop-blur-xl

          lg:hidden
        "
      >
        <div
          className="
            grid
            grid-cols-2

            divide-x
            divide-y
            divide-foreground/10

            sm:grid-cols-4
            sm:divide-y-0
          "
        >
          {heroHighlights.map(
            ({
              label,
              icon: Icon,
            }) => (
              <div
                key={label}
                className="
                  flex
                  min-h-16

                  items-center

                  gap-2.5

                  px-4
                  py-3
                "
              >
                <Icon
                  aria-hidden={true}
                  strokeWidth={1.5}
                  className="
                    size-4
                    shrink-0

                    text-primary
                  "
                />

                <span
                  className="
                    text-[7px]
                    font-bold
                    uppercase

                    leading-4
                    tracking-[0.1em]

                    text-text-soft

                    sm:text-[8px]
                  "
                >
                  {label}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}