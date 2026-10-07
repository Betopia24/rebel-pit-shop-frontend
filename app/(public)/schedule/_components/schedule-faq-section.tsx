import Link from "next/link"

import {
  ArrowUpRight,
  CircleHelp,
  Clock3,
  Dumbbell,
  Gauge,
  ShieldCheck,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  buttonVariants,
} from "@/components/ui/button"

import { cn } from "@/lib/utils"

import { siteConfig } from "@/config/site"

/* =========================================================
   SCHEDULE — FAQ SECTION

   Purpose:
   - Answer common questions before a visitor books
   - Reduce hesitation for first-time members
   - Avoid duplicating schedule/calendar UI
   - Keep content grounded in established Rebel information

   Uses:
   - shadcn/ui Accordion
   - Base UI version

   IMPORTANT:
   Do NOT use:
   - type="single"
   - collapsible

   This project's Accordion does not use those props.
========================================================= */

const scheduleFaqItems = [
  {
    id: "experience",

    question:
      "Do I need boxing experience before booking a class?",

    answer:
      "No. Everyone starts somewhere at Rebel. You can begin at your current fitness level, and coaches can help you adjust the workout to what works best for you.",

    icon: ShieldCheck,
  },

  {
    id: "no-contact",

    question:
      "Are Rebel boxing classes no-contact?",

    answer:
      "Yes. Rebel's group fitness classes are built around boxing and kickboxing-inspired training without requiring sparring or person-to-person contact.",

    icon: Dumbbell,
  },

  {
    id: "duration",

    question:
      "How long are the classes?",

    answer:
      "Rebel classes are structured as 30, 60, or 75 minute workouts. This gives you different options depending on your schedule and the class you choose.",

    icon: Clock3,
  },

  {
    id: "class-structure",

    question:
      "What happens during a typical class?",

    answer:
      "Classes generally include a warm-up, 3-minute workout rounds with a 1-minute active rest between rounds, followed by a core finisher or cool down.",

    icon: Gauge,
  },

  {
    id: "modify",

    question:
      "Can I modify exercises during class?",

    answer:
      "Yes. You can adjust movements, slow your pace, take additional rest, or use alternatives that better fit your needs. Rebel coaches can help you make those adjustments.",

    icon: ShieldCheck,
  },

  {
    id: "weekly-classes",

    question:
      "Are classes available throughout the week?",

    answer:
      "Yes. Rebel offers classes 7 days a week, making it easier to find training times that work with your routine.",

    icon: Clock3,
  },
] as const

/* =========================================================
   FAQ STRUCTURED DATA

   This lives inside the component so page.tsx does not
   need to change when this section is added.

   Search engines may use this structured information to
   better understand the page. Rich-result display is not
   guaranteed.
========================================================= */

const faqStructuredData = {
  "@context":
    "https://schema.org",

  "@type": "FAQPage",

  mainEntity:
    scheduleFaqItems.map(
      (item) => ({
        "@type": "Question",

        name:
          item.question,

        acceptedAnswer: {
          "@type": "Answer",

          text:
            item.answer,
        },
      })
    ),
}

function serializeJsonLd(
  value: object
) {
  return JSON.stringify(
    value
  )
    .replace(
      /</g,
      "\\u003c"
    )
    .replace(
      />/g,
      "\\u003e"
    )
    .replace(
      /&/g,
      "\\u0026"
    )
}

/* =========================================================
   COMPONENT
========================================================= */

export function ScheduleFaqSection() {
  return (
    <section
      id="schedule-faq"
      aria-labelledby="schedule-faq-heading"
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
          FAQ JSON-LD
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              faqStructuredData
            ),
        }}
      />

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

          bg-[radial-gradient(ellipse_at_100%_10%,var(--gold-06),transparent_42%),radial-gradient(ellipse_at_0%_100%,var(--gold-04),transparent_42%)]
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
          via-primary/45
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

          grid
          w-full
          max-w-375

          grid-cols-1

          gap-10

          px-5

          sm:px-7

          md:px-10

          lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]
          lg:items-start
          lg:gap-14
          lg:px-14

          xl:gap-20
          xl:px-20
        "
      >
        {/* ===================================================
            LEFT — INTRO
        ==================================================== */}

        <div
          className="
            max-w-125

            lg:sticky
            lg:top-32
          "
        >
          {/* ICON */}

          <div
            className="
              mb-6

              flex
              size-11

              items-center
              justify-center

              rounded-full

              border
              border-primary/35

              bg-primary/5

              text-primary
            "
          >
            <CircleHelp
              aria-hidden={true}
              strokeWidth={1.6}
              className="size-5"
            />
          </div>

          {/* EYEBROW */}

          <div
            className="
              mb-4

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
              Before You Book
            </span>
          </div>

          {/* HEADING */}

          <h2
            id="schedule-faq-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.94]
              tracking-tighter

              text-[clamp(2.7rem,9vw,4rem)]

              sm:text-[clamp(3.1rem,6vw,4.5rem)]

              lg:text-[clamp(3rem,4vw,4.3rem)]
            "
          >
            Questions About{" "}

            <span className="rebel-gold-text">
              Training?
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5
              max-w-115

              text-sm
              leading-7

              text-text-secondary

              sm:text-[15px]
            "
          >
            New to boxing fitness or not sure what
            to expect? Here are a few things worth
            knowing before choosing your class.
          </p>

          {/* SUPPORT CTA */}

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
            <Link
              href="#schedule-main"
              className={cn(
                buttonVariants(),
                `
                  group

                  min-h-11

                  bg-primary

                  px-5

                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.08em]

                  text-primary-foreground

                  shadow-(--shadow-gold-xs)

                  hover:bg-gold-hover
                  hover:text-primary-foreground
                  hover:shadow-(--shadow-gold-sm)

                  sm:text-[11px]
                `
              )}
            >
              View Classes

              <ArrowUpRight
                aria-hidden={true}
                strokeWidth={1.8}
                className="
                  size-3.5

                  transition-transform
                  duration-300

                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5

                  motion-reduce:transform-none
                "
              />
            </Link>

            <Link
              href={
                siteConfig
                  .contactCta
                  .button.href
              }
              className="
                group

                inline-flex
                min-h-11

                items-center
                justify-center

                gap-2.5

                rounded-md

                px-3

                text-[10px]
                font-bold
                uppercase

                tracking-[0.08em]

                text-text-soft

                transition-colors
                duration-200

                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary

                sm:text-[11px]
              "
            >
              Ask A Question

              <ArrowUpRight
                aria-hidden={true}
                strokeWidth={1.8}
                className="
                  size-3.5

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
            RIGHT — FAQ ACCORDION
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
          <Accordion className="w-full">
            {scheduleFaqItems.map(
              (
                item,
                index
              ) => {
                const Icon =
                  item.icon

                const number =
                  String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )

                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="
                      border-b
                      border-foreground/10

                      px-5

                      last:border-b-0

                      sm:px-6

                      lg:px-7
                    "
                  >
                    {/* =======================================
                        QUESTION
                    ======================================== */}

                    <AccordionTrigger
                      className="
                        group

                        py-5

                        text-left

                        hover:no-underline

                        sm:py-6

                        [&>svg]:size-4
                        [&>svg]:shrink-0
                        [&>svg]:text-primary
                      "
                    >
                      <span
                        className="
                          flex
                          min-w-0
                          items-start

                          gap-3

                          pr-4

                          sm:gap-4
                        "
                      >
                        {/* ICON */}

                        <span
                          className="
                            mt-0.5

                            flex
                            size-8
                            shrink-0

                            items-center
                            justify-center

                            rounded-full

                            border
                            border-primary/25

                            bg-primary/5

                            text-primary

                            transition-[background-color,border-color,color]
                            duration-200

                            group-hover:border-primary/50
                            group-hover:bg-primary
                            group-hover:text-primary-foreground
                          "
                        >
                          <Icon
                            aria-hidden={true}
                            strokeWidth={1.6}
                            className="size-3.5"
                          />
                        </span>

                        {/* QUESTION TEXT */}

                        <span className="min-w-0">
                          <span
                            className="
                              block

                              text-[8px]
                              font-black
                              uppercase

                              tracking-[0.16em]

                              text-primary/70
                            "
                          >
                            {number}
                          </span>

                          <span
                            className="
                              mt-1
                              block

                              text-[13px]
                              font-semibold

                              leading-6

                              text-foreground

                              transition-colors
                              duration-200

                              group-hover:text-primary

                              sm:text-sm

                              lg:text-[15px]
                            "
                          >
                            {
                              item.question
                            }
                          </span>
                        </span>
                      </span>
                    </AccordionTrigger>

                    {/* =======================================
                        ANSWER
                    ======================================== */}

                    <AccordionContent
                      className="
                        pb-5

                        pl-11
                        pr-8

                        sm:pb-6
                        sm:pl-12

                        lg:pl-13
                      "
                    >
                      <div
                        className="
                          max-w-155

                          border-l
                          border-primary/25

                          pl-4

                          text-xs
                          leading-6

                          text-text-secondary

                          sm:text-[13px]

                          lg:text-sm
                          lg:leading-7
                        "
                      >
                        {item.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              }
            )}
          </Accordion>

          {/* =================================================
              BOTTOM SUPPORT STRIP
          ================================================== */}

          <div
            className="
              border-t
              border-primary/15

              bg-primary/4

              px-5
              py-5

              sm:px-6

              lg:px-7
            "
          >
            <div
              className="
                flex
                flex-col

                gap-4

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:gap-6
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase

                    tracking-[0.16em]

                    text-primary
                  "
                >
                  Still Unsure?
                </p>

                <p
                  className="
                    mt-1

                    text-xs
                    leading-5

                    text-text-secondary
                  "
                >
                  Send the Rebel team a message before booking.
                </p>
              </div>

              <Link
                href={
                  siteConfig
                    .contactCta
                    .button.href
                }
                className="
                  group

                  inline-flex
                  min-h-10
                  shrink-0

                  items-center
                  justify-center

                  gap-2

                  rounded-md

                  border
                  border-primary/40

                  px-4

                  text-[9px]
                  font-bold
                  uppercase

                  tracking-[0.08em]

                  text-primary

                  transition-[background-color,border-color,color]
                  duration-200

                  hover:border-primary
                  hover:bg-primary
                  hover:text-primary-foreground

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                "
              >
                Contact Rebel

                <ArrowUpRight
                  aria-hidden={true}
                  className="
                    size-3.5

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
      </div>
    </section>
  )
}