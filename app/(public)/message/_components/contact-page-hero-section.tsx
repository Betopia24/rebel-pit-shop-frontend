
import Image from "next/image"
// import Link from "next/link"

// import {
//   ArrowDownRight,
//   ArrowUpRight,
//   Phone,
// } from "lucide-react"

// import { siteConfig } from "@/config/site"


/* =========================================================
   REBEL BOXING CLUB — CONTACT HERO

   Design:
   - Cinematic dark Rebel branding
   - Real gym photography
   - Compact desktop height
   - Black / charcoal / Rebel gold
   - Full-bleed background
   - Responsive typography
   - Accessible and SEO-friendly
   - No client-side JavaScript

   Image:
   /public/images/contact/contact-header.jpg

   Navbar:
   Controlled by the shared Public Navbar.

   Next section:
   #contact-form
========================================================= */

const CONTACT_HERO_IMAGE =
  "/images/contact/contact-header.jpg"


// const phoneHref =
//   `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`


export function ContactPageHeroSection() {
  return (
    <section
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      aria-describedby="contact-hero-description"
      className="
        relative
        isolate

        flex
        min-h-152.5
        w-full
        flex-col

        overflow-hidden

        bg-background
        text-foreground

        sm:min-h-142.5

        lg:min-h-145

        xl:min-h-152.5
      "
    >
      {/* =====================================================
          LAYER 0 — ORIGINAL GYM PHOTOGRAPHY

          Background uses the exact Rebel gym photograph.
          Desktop composition retains the wall logo on
          the right-hand side.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        <Image
          src={CONTACT_HERO_IMAGE}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="
            object-cover
            object-[67%_center]

            sm:object-[60%_center]

            lg:object-center
          "
        />
      </div>


      {/* =====================================================
          LAYER 10 — MOBILE IMAGE GRADIENT

          Text stays readable over the photograph.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-10

          bg-[linear-gradient(180deg,rgb(var(--rgb-background)/0.40)_0%,rgb(var(--rgb-background)/0.73)_30%,rgb(var(--rgb-background)/0.93)_75%,rgb(var(--rgb-background)/0.96)_100%)]

          lg:hidden
        "
      />


      {/* =====================================================
          LAYER 10 — DESKTOP CINEMATIC GRADIENT

          Dark text area on the left.
          Original brick wall and Rebel logo remain
          visible on the right.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-10

          hidden

          lg:block

          lg:bg-[linear-gradient(90deg,rgb(var(--rgb-background)/0.99)_0%,rgb(var(--rgb-background)/0.97)_18%,rgb(var(--rgb-background)/0.86)_32%,rgb(var(--rgb-background)/0.52)_49%,rgb(var(--rgb-background)/0.12)_75%,rgb(var(--rgb-background)/0.06)_100%)]
        "
      />


      {/* =====================================================
          TOP NAVBAR READABILITY

          Navbar itself remains transparent over Hero.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-10

          h-32

          bg-linear-to-b
          from-background/70
          via-background/20
          to-transparent
        "
      />


      {/* =====================================================
          BOTTOM GRADIENT

          Smooth transition into Contact Information section.
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-10

          h-36

          bg-linear-to-t
          from-background/80
          via-background/25
          to-transparent
        "
      />


      {/* =====================================================
          GOLD AMBIENT LIGHT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-72
          top-1/4
          z-10

          size-144
          rounded-full

          bg-[radial-gradient(circle,var(--gold-06)_0%,transparent_65%)]
        "
      />


      {/* =====================================================
          LAYER 20 — MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20

          mx-auto

          flex
          w-full
          max-w-[1600px]
          flex-1
          flex-col
          justify-center

          px-5
          pb-14
          pt-32

          sm:px-7
          sm:pt-30

          md:px-10

          lg:px-14
          lg:pb-14
          lg:pt-28

          xl:px-20

          2xl:px-24
        "
      >
        <div
          className="
            relative
            max-w-175
          "
        >
          {/* ===============================================
              EYEBROW
          ================================================ */}

          <div
            className="
              mb-5

              flex
              flex-wrap
              items-center
              gap-3

              sm:mb-6
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-9
                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase

                tracking-[0.3em]

                text-primary

                sm:text-[11px]
              "
            >
              Get In Touch
            </span>

            <span
              aria-hidden="true"
              className="
                size-1
                rotate-45
                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                uppercase

                tracking-[0.14em]

                text-text-secondary

                sm:text-[11px]
              "
            >
              Rebel Boxing Club
            </span>
          </div>


          {/* ===============================================
              MAIN HEADING

              Single H1 for the Contact page.
          ================================================ */}

          <h1
            id="contact-hero-heading"
            className="
              font-heading
              font-black
              uppercase

              leading-[0.87]
              tracking-[-0.055em]

              text-[clamp(3.7rem,12.5vw,5.5rem)]

              sm:text-[clamp(4.5rem,9vw,6.3rem)]

              lg:text-[clamp(4.5rem,6.1vw,6.5rem)]
            "
          >
            <span
              className="
                block
                text-foreground
              "
            >
              Let&apos;s
            </span>

            <span
              className="
                mt-1
                block

                rebel-gold-text
              "
            >
              Talk
            </span>

            <span
              className="
                mt-1
                block
                text-foreground
              "
            >
              Training
              <span className="text-primary">
                .
              </span>
            </span>
          </h1>


          {/* ===============================================
              DESCRIPTION
          ================================================ */}

          <div
            id="contact-hero-description"
            className="
              mt-6

              flex
              max-w-147.5
              gap-4

              sm:mt-7
            "
          >
            <span
              aria-hidden="true"
              className="
                w-0.75
                shrink-0

                bg-linear-to-b
                from-primary
                via-primary/70
                to-transparent
              "
            />

            <div className="min-w-0">
              <p
                className="
                  text-sm
                  leading-7
                  text-text-soft

                  sm:text-[15px]
                  sm:leading-7
                "
              >
                Have a question, want to learn more
                about our boxing classes, or
                interested in private or group
                training? We&apos;d love to hear
                from you.
              </p>

              <p
                className="
                  mt-2

                  text-[13px]
                  leading-6

                  text-text-secondary

                  sm:text-sm
                "
              >
                Send us a message, give us a call,
                or stop by the gym in Wichita,
                Kansas.
              </p>
            </div>
          </div>


          {/* ===============================================
              CALL TO ACTION

              CTA 1 — Scroll to the contact form
              CTA 2 — Call the gym directly
          ================================================ */}

          {/* <div
            className="
              mt-7

              flex
              flex-wrap
              items-center
              gap-3

              sm:mt-8
            "
          > */}
            {/* PRIMARY CTA */}

            {/* <Link
              href="#contact-form"
              className="
                group

                inline-flex
                min-h-12
                items-center
                justify-center
                gap-4

                rounded-md

                border
                border-primary/70

                bg-primary

                px-6

                text-[11px]
                font-bold
                uppercase

                tracking-[0.075em]

                text-primary-foreground

                shadow-(--shadow-gold-sm)

                transition-[background-color,box-shadow]
                duration-300
                ease-out

                hover:bg-gold-hover
                hover:shadow-(--shadow-gold-md)

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                motion-reduce:transition-none

                sm:px-7
                sm:text-xs
              "
            >
              Send a Message

              <ArrowDownRight
                aria-hidden="true"
                className="
                  size-4

                  transition-transform
                  duration-300

                  group-hover:translate-x-0.5
                  group-hover:translate-y-0.5

                  motion-reduce:transform-none
                "
              />
            </Link> */}


            {/* SECONDARY CTA */}

            {/* <a
              href={phoneHref}
              className="
                group

                inline-flex
                min-h-12
                items-center
                justify-center
                gap-3

                rounded-md

                border
                border-foreground/25

                bg-background/35

                px-6

                text-[11px]
                font-bold
                uppercase

                tracking-[0.075em]

                text-foreground

                backdrop-blur-md

                transition-[background-color,border-color,color]
                duration-300

                hover:border-primary/60
                hover:bg-primary/10
                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                motion-reduce:transition-none

                sm:px-7
                sm:text-xs
              "
            >
              <Phone
                aria-hidden="true"
                className="size-4"
              />

              Call Our Gym

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
            </a>
          </div> */}
        </div>
      </div>


      {/* =====================================================
          BOTTOM EDITORIAL STRIP

          Small and restrained to avoid making the
          Hero unnecessarily tall.
      ====================================================== */}

      <div
        className="
          relative
          z-20

          w-full

          border-t
          border-foreground/12

          bg-background/40

          backdrop-blur-sm
        "
      >
        <div
          className="
            mx-auto

            flex
            w-full
            max-w-[1600px]

            flex-wrap
            items-center
            justify-between
            gap-3

            px-5
            py-3.5

            sm:px-7

            md:px-10

            lg:px-14

            xl:px-20

            2xl:px-24
          "
        >
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
                size-1.5
                rotate-45
                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase

                tracking-[0.15em]

                text-text-soft
              "
            >
              Wichita, Kansas
            </span>
          </div>


          <span
            className="
              text-[10px]
              font-semibold
              uppercase

              tracking-[0.14em]

              text-text-muted
            "
          >
            Boxing. Fitness. Community.
          </span>
        </div>
      </div>


      {/* BOTTOM GOLD ACCENT */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          z-30

          h-px

          bg-linear-to-r
          from-transparent
          via-primary/55
          to-transparent
        "
      />
    </section>
  )
}
