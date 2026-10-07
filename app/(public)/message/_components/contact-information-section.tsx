import type {
  ReactNode,
} from "react"

import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react"

import { ContactMessageForm } from "./contact-message-form"

import { siteConfig } from "@/config/site"

/* =========================================================
   CONTACT INFORMATION + MESSAGE FORM

   Design:
   - Compact dark editorial section
   - Matches Rebel landing page
   - Contact data comes from siteConfig
   - Form is isolated for future API integration
   - Semantic address / phone / email markup
   - No duplicated business information
========================================================= */

const phoneHref =
  `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`

const emailHref =
  `mailto:${siteConfig.contact.email}`

export function ContactInformationSection() {
  return (
    <section
      id="contact-form"
      aria-labelledby="contact-section-heading"
      className="
        relative
        isolate
        overflow-hidden

        border-t
        border-foreground/10

        bg-background
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

          bg-[radial-gradient(ellipse_at_8%_42%,var(--gold-06),transparent_42%),radial-gradient(ellipse_at_92%_20%,var(--gold-04),transparent_38%)]
        "
      />

      {/* =====================================================
          SUBTLE GRID
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          opacity-40

          bg-[linear-gradient(var(--foreground-03)_1px,transparent_1px),linear-gradient(90deg,var(--foreground-03)_1px,transparent_1px)]

          bg-size-[72px_72px]
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
          via-primary/45
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

          w-full
          max-w-[1600px]

          px-5

          sm:px-7
          md:px-10
          lg:px-14
          xl:px-20
          2xl:px-24
        "
      >
        {/* ===================================================
            SECTION INTRO
        ==================================================== */}

        <div
          className="
            mb-9

            flex
            flex-col

            gap-5

            sm:mb-10

            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-10
          "
        >
          <div>
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

                  tracking-[0.28em]

                  text-primary

                  sm:text-[11px]
                "
              >
                Contact Rebel
              </span>
            </div>

            <h2
              id="contact-section-heading"
              className="
                font-heading
                font-black
                uppercase

                leading-[0.94]
                tracking-[-0.045em]

                text-[clamp(2.5rem,9vw,4.2rem)]

                sm:text-[clamp(3rem,6vw,4.8rem)]

                lg:text-[clamp(3rem,4vw,4.5rem)]
              "
            >
              Let&apos;s Start a{" "}

              <span className="rebel-gold-text">
                Conversation.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-125

              text-sm
              leading-7

              text-text-secondary

              lg:text-right
            "
          >
            Have a question about classes, private
            training, group training, or visiting
            Rebel? Send us a message and our team
            will help point you in the right direction.
          </p>
        </div>

        {/* ===================================================
            CONTENT GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1

            overflow-hidden

            rounded-xl

            border
            border-foreground/12

            bg-surface-dark/80

            shadow-(--shadow-card)

            lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]
          "
        >
          {/* =================================================
              LEFT — CONTACT INFORMATION
          ================================================== */}

          <div
            className="
              relative
              isolate

              border-b
              border-foreground/10

              px-5
              py-8

              sm:px-7
              sm:py-9

              lg:border-b-0
              lg:border-r
              lg:px-8
              lg:py-10

              xl:px-10
            "
          >
            {/* GOLD GLOW */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                z-0

                bg-[radial-gradient(circle_at_0%_0%,var(--gold-08),transparent_48%)]
              "
            />

            <div className="relative z-10">
              {/* =============================================
                  HEADER
              ============================================== */}

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
                    w-7

                    bg-primary
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase

                    tracking-[0.25em]

                    text-primary
                  "
                >
                  Contact Information
                </span>
              </div>

              <h3
                className="
                  mt-4

                  font-heading
                  text-3xl
                  font-black
                  uppercase

                  leading-none
                  tracking-[-0.035em]

                  sm:text-4xl
                "
              >
                Rebel Boxing Club
              </h3>

              <p
                className="
                  mt-3
                  max-w-sm

                  text-sm
                  leading-6

                  text-text-secondary
                "
              >
                Visit us, call, or email. We&apos;d
                love to hear from you.
              </p>

              {/* =============================================
                  CONTACT DETAILS
              ============================================== */}

              <address
                className="
                  mt-8

                  space-y-6

                  not-italic
                "
              >
                {/* ===========================================
                    LOCATION
                ============================================ */}

                <ContactItem
                  icon={MapPin}
                  label="Our Location"
                >
                  <p
                    className="
                      text-sm
                      font-semibold
                      leading-6

                      text-foreground
                    "
                  >
                    {siteConfig.business.name}
                  </p>

                  <p
                    className="
                      mt-0.5

                      text-sm
                      leading-6

                      text-text-secondary
                    "
                  >
                    {
                      siteConfig.business.address
                        .formatted
                    }
                  </p>
                </ContactItem>

                {/* ===========================================
                    PHONE
                ============================================ */}

                <ContactItem
                  icon={Phone}
                  label="Give Us a Call"
                >
                  <a
                    href={phoneHref}
                    className="
                      inline-flex

                      text-sm
                      font-semibold

                      text-foreground

                      transition-colors
                      duration-200

                      hover:text-primary

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-primary
                    "
                  >
                    {siteConfig.contact.phone}
                  </a>

                  <p
                    className="
                      mt-1

                      text-xs
                      leading-5

                      text-text-muted
                    "
                  >
                    Call during gym opening hours.
                  </p>
                </ContactItem>

                {/* ===========================================
                    EMAIL
                ============================================ */}

                <ContactItem
                  icon={Mail}
                  label="Email Us"
                >
                  <a
                    href={emailHref}
                    className="
                      break-all

                      text-sm
                      font-semibold

                      text-foreground

                      transition-colors
                      duration-200

                      hover:text-primary

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-primary
                    "
                  >
                    {siteConfig.contact.email}
                  </a>

                  <p
                    className="
                      mt-1

                      text-xs
                      leading-5

                      text-text-muted
                    "
                  >
                    Send us your training questions.
                  </p>
                </ContactItem>

                {/* ===========================================
                    HOURS
                ============================================ */}

                <ContactItem
                  icon={Clock3}
                  label="Gym Hours"
                >
                  <div
                    className="
                      max-w-72.5

                      space-y-1.5
                    "
                  >
                    {siteConfig.hours.map(
                      (item) => (
                        <div
                          key={item.id}
                          className="
                            flex
                            items-center
                            justify-between

                            gap-5

                            text-xs
                            leading-5
                          "
                        >
                          <span className="text-text-secondary">
                            {item.days}
                          </span>

                          <span
                            className="
                              font-medium
                              text-foreground
                            "
                          >
                            {item.time}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </ContactItem>
              </address>

              {/* =============================================
                  SMALL REBEL MESSAGE
              ============================================== */}

              <div
                className="
                  mt-8

                  border-l-2
                  border-primary

                  bg-primary/5

                  px-4
                  py-3.5
                "
              >
                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase

                    leading-5
                    tracking-[0.08em]

                    text-text-soft
                  "
                >
                  Real people. Real training.

                  <span className="text-primary">
                    {" "}
                    A stronger you.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT — CONTACT FORM
          ================================================== */}

          <div
            className="
              relative
              isolate

              px-5
              py-8

              sm:px-7
              sm:py-9

              lg:px-8
              lg:py-10

              xl:px-10
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                z-0

                bg-[radial-gradient(circle_at_100%_0%,var(--gold-05),transparent_48%)]
              "
            />

            <div className="relative z-10">
              {/* =============================================
                  FORM HEADER
              ============================================== */}

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
                    w-7

                    bg-primary
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase

                    tracking-[0.25em]

                    text-primary
                  "
                >
                  Send Us a Message
                </span>
              </div>

              <h3
                className="
                  mt-4

                  font-heading
                  text-3xl
                  font-black
                  uppercase

                  leading-none
                  tracking-[-0.035em]

                  sm:text-4xl
                "
              >
                How Can We{" "}

                <span className="rebel-gold-text">
                  Help?
                </span>
              </h3>

              <p
                className="
                  mt-3
                  max-w-xl

                  text-sm
                  leading-6

                  text-text-secondary
                "
              >
                Tell us what you&apos;re interested
                in and we&apos;ll get back to you as
                soon as possible.
              </p>

              {/* =============================================
                  FORM
              ============================================== */}

              <div className="mt-7">
                <ContactMessageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   CONTACT ITEM

   LucideIcon is the correct type for icons imported from
   lucide-react.

   Using aria-hidden={true} keeps the value boolean and
   avoids the TS2769 error from the previous custom type.
========================================================= */

type ContactItemProps = {
  icon: LucideIcon
  label: string
  children: ReactNode
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: ContactItemProps) {
  return (
    <div
      className="
        grid
        grid-cols-[44px_minmax(0,1fr)]

        gap-4
      "
    >
      <span
        aria-hidden="true"
        className="
          flex
          size-11

          items-center
          justify-center

          rounded-full

          border
          border-primary/45

          bg-primary/5

          text-primary
        "
      >
        <Icon
          aria-hidden={true}
          strokeWidth={1.6}
          className="size-5"
        />
      </span>

      <div className="min-w-0 pt-0.5">
        <p
          className="
            mb-1

            text-[9px]
            font-bold
            uppercase

            tracking-[0.19em]

            text-primary
          "
        >
          {label}
        </p>

        {children}
      </div>
    </div>
  )
}