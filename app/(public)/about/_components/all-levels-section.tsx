
import Image from "next/image"
import Link from "next/link"

import {
  ArrowUpRight,
  Heart,
  RefreshCcw,
  UsersRound,
} from "lucide-react"

import { siteConfig } from "@/config/site"

import aboutGymImage from "@/public/images/about-us/about-header.jpg"


/* =========================================================
   ABOUT US — ALL FITNESS LEVELS

   Design:
   - Warm ivory / charcoal / antique gold
   - Compact editorial layout
   - Authentic Rebel gym photograph
   - Original content preserved
   - Clear accessibility and inclusivity messaging
   - Distinct image layout from Our Story
   - No unnecessary animation
   - Server Component
========================================================= */

const trainingFeatures = [
  {
    id: "adaptable",
    icon: RefreshCcw,
    title: "Make It Yours",
    description:
      "Modify movements to suit your ability.",
  },
  {
    id: "own-pace",
    icon: Heart,
    title: "Your Own Pace",
    description:
      "Slow down or take extra rests.",
  },
  {
    id: "coaching",
    icon: UsersRound,
    title: "Coaches Who Care",
    description:
      "Get help finding what works for you.",
  },
] as const


export function AllLevelsSection() {
  return (
    <section
      id="all-fitness-levels"
      aria-labelledby="all-levels-heading"
      aria-describedby="all-levels-description"
      className="
        relative
        isolate
        overflow-hidden

        bg-foreground
        text-background

        py-14
        sm:py-16
        lg:py-18
      "
    >
      {/* BACKGROUND ACCENT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_95%_15%,var(--gold-08),transparent_38%)]
        "
      />

      {/* SUBTLE TOP DIVIDER */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-10

          h-px
          bg-gold-dark/20
        "
      />

      {/* MAIN CONTENT */}

      <div
        className="
          relative
          z-20

          mx-auto
          grid
          w-full
          max-w-[1600px]
          grid-cols-1
          items-center

          gap-10

          px-5

          sm:px-7
          md:px-10

          lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]
          lg:gap-14
          lg:px-14

          xl:gap-20
          xl:px-20

          2xl:px-24
        "
      >
        {/* ===================================================
            LEFT — INTRODUCTION
        ==================================================== */}

        <div className="min-w-0 max-w-167.5">
          {/* EYEBROW */}

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
                bg-gold-dark
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.27em]
                text-gold-dark

                sm:text-[11px]
              "
            >
              Everyone Starts Somewhere
            </span>
          </div>

          {/* HEADING */}

          <h2
            id="all-levels-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.94]
              tracking-tighter

              text-[clamp(2.5rem,10vw,4rem)]

              sm:text-[clamp(3.1rem,7vw,4.6rem)]

              lg:text-[clamp(2.9rem,4.15vw,4.6rem)]
            "
          >
            <span className="block">
              What If I&apos;m
            </span>

            <span
              className="
                mt-1
                block
                text-gold-dark
              "
            >
              Out of Shape?
            </span>
          </h2>

          {/* ORIGINAL CONTENT */}

          <div
            id="all-levels-description"
            className="
              mt-6
              max-w-155

              space-y-4

              text-[13px]
              leading-[1.85]

              text-background/75

              sm:text-sm
              xl:text-[15px]
            "
          >
            <p>
              <strong
                className="
                  font-bold
                  text-background
                "
              >
                Everyone starts somewhere at Rebel!
              </strong>{" "}
              Whether you&apos;re used to cross-training
              or have put on a few pandemic pounds,
              you can modify the classes to your needs.
            </p>

            <p>
              Have hip issues? Switch out a kick for a
              hook. Asthmatic? Take more rests or slow
              your pace.{" "}
              <strong
                className="
                  font-semibold
                  text-background
                "
              >
                Our goal is that everyone gets a great
                workout no matter their abilities
              </strong>{" "}
              and our coaches will be there to help
              you find what works best for you!
            </p>
          </div>

          {/* SMALL GOLD DIVIDER */}

          <div
            aria-hidden="true"
            className="
              mt-6
              h-px
              w-full
              max-w-135

              bg-linear-to-r
              from-gold-dark/45
              to-transparent
            "
          />

          {/* TRAINING HIGHLIGHTS */}

          <ul
            aria-label="Flexible training benefits"
            className="
              mt-6

              grid
              grid-cols-1
              gap-3

              sm:grid-cols-3
              sm:gap-4
            "
          >
            {trainingFeatures.map((feature) => {
              const Icon = feature.icon

              return (
                <li
                  key={feature.id}
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-3

                    sm:flex-col
                    sm:gap-2.5
                  "
                >
                  <span
                    className="
                      flex
                      size-9
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-gold-dark/25

                      bg-gold-dark/5

                      text-gold-dark
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.7}
                      className="size-4"
                    />
                  </span>

                  <div className="min-w-0">
                    <h3
                      className="
                        text-[12px]
                        font-bold
                        text-background
                      "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        leading-5
                        text-background/60
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* CTA */}

          <div className="mt-7">
            <Link
              href={siteConfig.hero.primaryCta.href}
              className="
                group

                inline-flex
                min-h-11.5
                items-center
                justify-center
                gap-5

                rounded-md

                border
                border-background

                bg-background

                px-6

                text-[11px]
                font-bold
                uppercase
                tracking-[0.07em]

                text-foreground

                transition-[background-color,border-color,color]
                duration-300

                hover:border-gold-dark
                hover:bg-gold-dark
                hover:text-foreground

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-gold-dark
                focus-visible:ring-offset-2
                focus-visible:ring-offset-foreground

                motion-reduce:transition-none
              "
            >
              Find Your Class

              <ArrowUpRight
                aria-hidden="true"
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

        {/* ===================================================
            RIGHT — COMMUNITY IMAGE COMPOSITION

            Distinct from the framed photographs used
            in the previous sections.

            Image aspect ratio is maintained.
        ==================================================== */}

        <figure
          className="
            relative
            isolate
            w-full
            min-w-0

            lg:ml-auto
          "
        >
          {/* TOP EDITORIAL LABEL */}

          <div
            className="
              mb-3

              flex
              items-center
              justify-between
              gap-4
            "
          >
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-gold-dark
              "
            >
              The Rebel Community
            </span>

            <span
              className="
                font-heading
                text-sm
                font-black
                text-background/35
              "
            >
              03 / REBEL
            </span>
          </div>

          {/* IMAGE CONTAINER */}

          <div
            className="
              relative
              isolate
              overflow-hidden

              border
              border-background/15

              bg-background
            "
          >
            <Image
              src={aboutGymImage}
              alt="Rebel Boxing Club members enjoying time together inside the boxing gym."
              placeholder="blur"
              sizes="
                (max-width: 1023px) 100vw,
                47vw
              "
              className="
                block
                h-auto
                w-full
              "
            />

            {/* PHOTO GRADIENT */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-10

                bg-[linear-gradient(0deg,rgb(var(--rgb-black)/0.75)_0%,transparent_55%)]
              "
            />

            {/* PHOTO MESSAGE */}

            <div
              className="
                absolute
                bottom-5
                left-5
                z-20

                max-w-[75%]

                sm:bottom-7
                sm:left-7
              "
            >
              <p
                className="
                  font-heading
                  text-[clamp(1.35rem,3.1vw,2.4rem)]
                  font-black
                  uppercase
                  leading-[0.98]
                  tracking-[-0.04em]

                  text-foreground
                "
              >
                Start
                <span
                  className="
                    ml-2
                    text-gold-soft
                  "
                >
                  Somewhere.
                </span>
              </p>

              <span
                aria-hidden="true"
                className="
                  mt-3
                  block
                  h-0.5
                  w-24
                  bg-gold-highlight
                "
              />
            </div>
          </div>

          {/* QUOTE STRIP */}

          <figcaption
            className="
              mt-3

              flex
              items-center
              gap-4

              border-l-2
              border-gold-dark

              bg-background/5

              px-5
              py-4
            "
          >
            <span
              aria-hidden="true"
              className="
                font-heading
                text-4xl
                font-black
                leading-none
                text-gold-dark
              "
            >
              &ldquo;
            </span>

            <p
              className="
                text-[13px]
                font-semibold
                leading-6
                text-background/85

                sm:text-sm
              "
            >
              Everyone starts somewhere at Rebel!
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
