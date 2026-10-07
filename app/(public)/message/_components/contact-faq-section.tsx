import Link from "next/link"

import {
  ArrowUpRight,
  MessageCircleQuestion,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { siteConfig } from "@/config/site"

/* =========================================================
   CONTACT — FAQ SECTION

   Uses:
   shadcn/ui Accordion

   IMPORTANT:
   This project uses the Base UI version of shadcn Accordion.

   Therefore:
   - Do NOT use type="single"
   - Do NOT use collapsible
   - Default behavior already allows one item at a time
   - Open item can be closed again

   Goals:
   - Compact FAQ section
   - Rebel black / charcoal / gold identity
   - Accessible keyboard interaction
   - No duplicated contact information
   - Questions grounded in actual Rebel content
   - Server Component
========================================================= */

const faqItems = [
  {
    id: "experience",

    question:
      "Do I need boxing experience to join?",

    answer:
      "No. Everyone starts somewhere at Rebel. Classes can be modified to your ability, and our coaches will help you find a pace and approach that works for you.",
  },

  {
    id: "no-contact",

    question:
      "Are the boxing classes no-contact?",

    answer:
      "Yes. Rebel offers no-contact group fitness built around boxing and kickboxing-inspired training, so you can work on fitness, technique, confidence, and conditioning without sparring.",
  },

  {
    id: "duration",

    question:
      "How long are Rebel classes?",

    answer:
      "Classes are structured as 30, 60, or 75 minute workouts. Sessions include a warm-up, 3-minute rounds, active rest between rounds, and a core finisher or cool down.",
  },

  {
    id: "schedule",

    question:
      "How often are classes available?",

    answer:
      "Classes are available 7 days a week, giving members multiple opportunities to find workouts that fit their schedule.",
  },

  {
    id: "modify",

    question:
      "Can I modify a workout if needed?",

    answer:
      "Yes. Workouts can be adjusted to your needs. You can replace movements, slow your pace, or take additional rest, and Rebel coaches can help you find suitable modifications.",
  },

  {
    id: "private-training",

    question:
      "Do you offer private or group training?",

    answer:
      "Yes. You can contact Rebel Boxing Club for information about private or group training if you want a deeper focus on technique and conditioning.",
  },

  {
    id: "amenities",

    question:
      "What gym amenities are available?",

    answer:
      "In addition to boxing classes, Rebel members can use the weight training area, cardio equipment, and turf for additional workouts.",
  },
] as const

export function ContactFaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="contact-faq-heading"
      className="
        relative
        isolate
        overflow-hidden

        border-t
        border-foreground/8

        bg-surface-deep
        text-foreground

        py-14

        sm:py-16

        lg:py-18
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

          bg-[radial-gradient(ellipse_at_0%_50%,var(--gold-06),transparent_42%),radial-gradient(ellipse_at_100%_100%,var(--gold-04),transparent_40%)]
        "
      />

      {/* =====================================================
          TOP GOLD ACCENT
      ====================================================== */}

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
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-20

          mx-auto

          grid
          w-full
          max-w-[1500px]

          grid-cols-1

          gap-10

          px-5

          sm:px-7

          md:px-10

          lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]
          lg:items-start
          lg:gap-16
          lg:px-14

          xl:gap-20
          xl:px-20
        "
      >
        {/* ===================================================
            LEFT — INTRODUCTION
        ==================================================== */}

        <div
          className="
            relative

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
              border-primary/40

              bg-primary/5

              text-primary
            "
          >
            <MessageCircleQuestion
              aria-hidden="true"
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
              Frequently Asked Questions
            </span>
          </div>

          {/* HEADING */}

          <h2
            id="contact-faq-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.94]
              tracking-[-0.05em]

              text-[clamp(2.7rem,9vw,4rem)]

              sm:text-[clamp(3.2rem,6vw,4.5rem)]

              lg:text-[clamp(3rem,4vw,4.4rem)]
            "
          >
            Got{" "}

            <span className="rebel-gold-text">
              Questions?
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5

              max-w-[410px]

              text-sm
              leading-7

              text-text-secondary
            "
          >
            Here are answers to some of the most
            common questions about training at Rebel.
            If you still need help, send us a message.
          </p>

          {/* CTA */}

          <div className="mt-7">
            <Link
              href="#contact-form"
              className="
                group

                inline-flex
                items-center
                gap-3

                text-[10px]
                font-bold
                uppercase

                tracking-[0.11em]

                text-foreground

                transition-colors
                duration-200

                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
              "
            >
              Ask Us Something Else

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

        {/* ===================================================
            RIGHT — SHADCN / BASE UI ACCORDION
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
          {/* =================================================
              IMPORTANT

              Base UI Accordion does NOT use:

              type="single"
              collapsible

              Default behavior is sufficient here.
          ================================================== */}

          <Accordion className="w-full">
            {faqItems.map(
              (item, index) => (
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
                  {/* =========================================
                      QUESTION
                  ========================================== */}

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
                      [&>svg]:transition-transform
                    "
                  >
                    <span
                      className="
                        flex
                        min-w-0
                        items-start

                        gap-4

                        pr-4

                        sm:gap-5
                      "
                    >
                      {/* NUMBER */}

                      <span
                        aria-hidden="true"
                        className="
                          mt-0.5
                          shrink-0

                          font-heading
                          text-[11px]
                          font-black

                          text-primary/70

                          sm:text-xs
                        "
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      {/* QUESTION TEXT */}

                      <span
                        className="
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
                        {item.question}
                      </span>
                    </span>
                  </AccordionTrigger>

                  {/* =========================================
                      ANSWER
                  ========================================== */}

                  <AccordionContent
                    className="
                      pb-5

                      pl-9
                      pr-8

                      text-[12px]
                      leading-6

                      text-text-secondary

                      sm:pb-6
                      sm:pl-11
                      sm:text-[13px]

                      lg:pl-12
                      lg:text-sm
                      lg:leading-7
                    "
                  >
                    <div
                      className="
                        max-w-[680px]

                        border-l
                        border-primary/25

                        pl-4
                      "
                    >
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>

          {/* =================================================
              BOTTOM SUPPORT BAR
          ================================================== */}

          <div
            className="
              flex
              flex-col

              gap-4

              border-t
              border-primary/15

              bg-primary/4

              px-5
              py-5

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-6

              lg:px-7
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-primary
                "
              >
                Still Have Questions?
              </p>

              <p
                className="
                  mt-1

                  text-xs
                  leading-5

                  text-text-secondary
                "
              >
                The Rebel team is happy to help.
              </p>
            </div>

            <Link
              href={siteConfig.contactCta.button.href}
              className="
                group

                inline-flex
                min-h-10
                shrink-0

                items-center
                justify-center

                gap-2.5

                rounded-md

                border
                border-primary/50

                px-4

                text-[9px]
                font-bold
                uppercase

                tracking-[0.09em]

                text-primary

                transition-[background-color,border-color,color]
                duration-200

                hover:border-primary
                hover:bg-primary
                hover:text-primary-foreground

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary

                sm:text-[10px]
              "
            >
              Contact Us

              <ArrowUpRight
                aria-hidden="true"
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
    </section>
  )
}