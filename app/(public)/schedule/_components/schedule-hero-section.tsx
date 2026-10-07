import Image from "next/image"
import Link from "next/link"

import {
  ArrowDown,
  ArrowDownRight,
  CalendarDays,
} from "lucide-react"

import scheduleHeaderImage from "@/public/images/schedule/schedule-header.jpg"

/* =========================================================
   REBEL BOXING CLUB — SCHEDULE HERO

   Design system alignment:
   - Same visual family as About + Contact hero
   - Compact cinematic composition
   - Single H1 for SEO
   - Softer image treatment
   - Clear primary / secondary CTA hierarchy
   - Bottom highlights separated from CTA area
   - Transparent navbar friendly
   - Responsive image crop
========================================================= */

const heroHighlights = [
  {
    number: "01",
    label: "7 Days A Week",
  },
  {
    number: "02",
    label: "30 / 60 / 75 Min",
  },
  {
    number: "03",
    label: "No-Contact Training",
  },
] as const

export function ScheduleHeroSection() {
  return (
    <section
      id="schedule-hero"
      aria-labelledby="schedule-hero-heading"
      aria-describedby="schedule-hero-description"
      className="
        relative
        isolate
        overflow-hidden

        border-b
        border-foreground/10

        bg-background
        text-foreground

        min-h-[650px]

        sm:min-h-[630px]

        lg:min-h-[580px]

        xl:min-h-[610px]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <Image
        src={scheduleHeaderImage}
        alt="Members training on heavy bags inside Rebel Boxing Club."
        fill
        priority
        sizes="100vw"
        className="
          object-cover

          object-[57%_center]

          sm:object-[58%_center]

          lg:object-center
        "
      />

      {/* =====================================================
          CINEMATIC IMAGE TREATMENT
      ====================================================== */}

      {/* BASE DARKENING */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-10

          bg-black/28
        "
      />

      {/* LEFT COPY GRADIENT */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-10

          bg-linear-to-r

          from-black/94
          via-black/68
          to-black/12

          lg:from-black/90
          lg:via-black/55
          lg:to-black/5
        "
      />

      {/* MOBILE BOTTOM SUPPORT */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-10

          bg-linear-to-t

          from-black/82
          via-transparent
          to-black/26

          lg:from-black/42
        "
      />

      {/* NAVBAR READABILITY */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          z-10

          h-36

          bg-linear-to-b
          from-black/58
          to-transparent
        "
      />

      {/* SUBTLE GOLD ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-10

          bg-[radial-gradient(circle_at_76%_44%,var(--gold-06),transparent_34%)]
        "
      />

      {/* BOTTOM FADE INTO STRIP */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-10

          h-40

          bg-linear-to-t
          from-black/72
          to-transparent

          lg:h-32
        "
      />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20

          mx-auto

          flex
          w-full
          max-w-[1600px]

          items-center

          min-h-[650px]

          px-5
          pt-28
          pb-20

          sm:min-h-[630px]
          sm:px-7
          sm:pt-30
          sm:pb-20

          md:px-10

          lg:min-h-[580px]
          lg:px-14
          lg:pt-28
          lg:pb-24

          xl:min-h-[610px]
          xl:px-20
          xl:pb-25

          2xl:px-24
        "
      >
        <div
          className="
            w-full
            max-w-[690px]
          "
        >
          {/* =================================================
              EYEBROW
          ================================================== */}

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

                sm:w-10
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase

                tracking-[0.28em]

                text-primary

                sm:text-[11px]
              "
            >
              Class Schedule
              <span className="hidden sm:inline">
                {" "}
                • Wichita, Kansas
              </span>
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

          {/* =================================================
              H1

              Only H1 on the Schedule page.
          ================================================== */}

          <h1
            id="schedule-hero-heading"
            className="
              max-w-[680px]

              font-heading
              font-black
              uppercase

              leading-[0.9]
              tracking-[-0.055em]

              text-[clamp(3.75rem,14vw,5.6rem)]

              sm:text-[clamp(4.3rem,9vw,6rem)]

              lg:text-[clamp(4.5rem,5.8vw,6.4rem)]
            "
          >
            <span className="block">
              Find Your
            </span>

            <span
              className="
                block
                rebel-gold-text
              "
            >
              Time.
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            id="schedule-hero-description"
            className="
              mt-5

              max-w-[500px]

              text-sm
              leading-7

              text-white/72

              sm:text-[15px]

              lg:text-base
            "
          >
            Pick a class. Choose a time. Book your
            spot and get to work with the Rebel
            community.
          </p>

          {/* =================================================
              CTA GROUP
          ================================================== */}

          <div
            className="
              mt-7

              flex
              flex-col
              items-start

              gap-3

              sm:flex-row
              sm:items-center
            "
          >
            {/* PRIMARY CTA */}

            <Link
              href="#schedule-main"
              className="
                group

                inline-flex
                min-h-12.5

                items-center
                justify-center

                gap-3

                rounded-md

                border
                border-primary/75

                bg-primary

                px-5

                text-[10px]
                font-bold
                uppercase

                tracking-[0.08em]

                text-primary-foreground

                shadow-(--shadow-gold-sm)

                transition-[background-color,box-shadow]
                duration-300

                hover:bg-gold-hover
                hover:shadow-(--shadow-gold-md)

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                motion-reduce:transition-none

                sm:px-6
                sm:text-[11px]
              "
            >
              <CalendarDays
                aria-hidden={true}
                strokeWidth={1.8}
                className="size-4"
              />

              View Today&apos;s Classes

              <ArrowDown
                aria-hidden={true}
                strokeWidth={1.8}
                className="
                  size-4

                  transition-transform
                  duration-300

                  group-hover:translate-y-0.5

                  motion-reduce:transform-none
                "
              />
            </Link>

            {/* SECONDARY CTA */}

            <Link
              href="#schedule-main"
              className="
                group

                inline-flex
                min-h-12.5

                items-center
                justify-center

                gap-3

                rounded-md

                border
                border-white/18

                bg-black/25

                px-5

                text-[10px]
                font-bold
                uppercase

                tracking-[0.08em]

                text-white/82

                backdrop-blur-md

                transition-[background-color,border-color,color]
                duration-200

                hover:border-primary/45
                hover:bg-primary/6
                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary

                motion-reduce:transition-none

                sm:px-6
                sm:text-[11px]
              "
            >
              Browse Full Schedule

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
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP BOTTOM HIGHLIGHT STRIP

          Kept deliberately subtle so it does not look like
          another navbar or separate dashboard component.
      ====================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-30

          hidden

          border-t
          border-white/10

          bg-black/38

          backdrop-blur-md

          lg:block
        "
      >
        <div
          className="
            mx-auto

            grid
            min-h-14
            w-full
            max-w-[1600px]

            grid-cols-3

            px-14

            xl:px-20

            2xl:px-24
          "
        >
          {heroHighlights.map(
            (item, index) => (
              <HeroHighlight
                key={item.number}
                number={item.number}
                label={item.label}
                showBorder={
                  index !==
                  heroHighlights.length - 1
                }
              />
            )
          )}
        </div>
      </div>

      {/* =====================================================
          MOBILE SCROLL CUE

          Bottom highlight strip is hidden on mobile,
          so a subtle cue leads into the schedule.
      ====================================================== */}

      <Link
        href="#schedule-main"
        aria-label="Scroll to class schedule"
        className="
          absolute
          bottom-5
          right-5
          z-30

          flex
          size-10

          items-center
          justify-center

          rounded-full

          border
          border-white/15

          bg-black/35

          text-white/70

          backdrop-blur-md

          transition-[border-color,color,background-color]
          duration-200

          hover:border-primary/45
          hover:bg-primary/8
          hover:text-primary

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary

          lg:hidden
        "
      >
        <ArrowDown
          aria-hidden={true}
          strokeWidth={1.7}
          className="size-4"
        />
      </Link>
    </section>
  )
}

/* =========================================================
   HERO HIGHLIGHT
========================================================= */

type HeroHighlightProps = {
  number: string
  label: string
  showBorder?: boolean
}

function HeroHighlight({
  number,
  label,
  showBorder = false,
}: HeroHighlightProps) {
  return (
    <div
      className={`
        flex
        min-h-14

        items-center

        gap-3

        ${
          showBorder
            ? "border-r border-white/10"
            : ""
        }
      `}
    >
      <span
        className="
          font-heading
          text-[10px]
          font-black

          text-primary
        "
      >
        {number}
      </span>

      <span
        className="
          text-[9px]
          font-bold
          uppercase

          tracking-[0.14em]

          text-white/60
        "
      >
        {label}
      </span>
    </div>
  )
}