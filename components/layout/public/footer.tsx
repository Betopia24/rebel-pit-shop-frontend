import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

import { Logo } from "@/components/shared/logo"
import { SocialLinks } from "@/components/shared/social-links"

import {
  footerNavigation,
  legalNavigation,
  programNavigation,
} from "@/config/navigation"

import { siteConfig } from "@/config/site"

import { FooterWatermark } from "./footer-watermark"


/* =========================================================
   CONSTANTS
========================================================= */

const FOOTER_BACKGROUND_IMAGE =
  "/images/footer/footer-bg.png"

const phoneHref = `tel:${siteConfig.contact.phone.replace(
  /[^\d+]/g,
  ""
)}`

const emailHref = `mailto:${siteConfig.contact.email}`


/* =========================================================
   TYPES
========================================================= */

type FooterNavigationItem = {
  readonly id: string
  readonly label: string
  readonly href: string
}


/* =========================================================
   FOOTER
========================================================= */

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#050505]
        text-[#F5F5F2]
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
          -z-30
        "
      >
        <Image
          src={FOOTER_BACKGROUND_IMAGE}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="
            object-cover
            object-[38%_center]

            md:object-[42%_center]

            lg:object-center
          "
        />
      </div>


      {/* =====================================================
          RESPONSIVE DARK OVERLAY
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          bg-black/80

          sm:bg-black/76

          md:bg-black/68

          lg:bg-black/48

          xl:bg-black/34
        "
      />


      {/* Desktop cinematic center shadow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10

          hidden

          lg:block
          lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.58)_25%,rgba(0,0,0,0.76)_48%,rgba(0,0,0,0.68)_70%,rgba(0,0,0,0.14)_100%)]
        "
      />


      {/* Bottom fade */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          -z-10
          h-[42%]

          bg-linear-to-t
          from-black/85
          via-black/25
          to-transparent
        "
      />


      {/* =====================================================
          TOP GOLD LINE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          z-20
          h-px
          bg-primary
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0
          z-20

          h-0.5
          w-20
          -translate-x-1/2

          rounded-full
          bg-primary

          shadow-[0_0_16px_5px_rgba(212,175,55,0.38)]

          sm:w-28
        "
      />


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1600px]

          px-5
          pt-12

          sm:px-8
          sm:pt-14

          md:px-10
          md:pt-16

          lg:px-12
          lg:pt-18

          xl:px-14
          xl:pt-20.5

          2xl:px-0
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-y-11

            md:grid-cols-2
            md:gap-x-12
            md:gap-y-14

            lg:gap-x-16

            xl:grid-cols-[1.38fr_0.88fr_0.98fr_1.30fr]
            xl:gap-x-0
          "
        >
          {/* =================================================
              BRAND
          ================================================== */}

          <section
            aria-labelledby="footer-brand-heading"
            className="
              min-w-0

              md:pr-5

              xl:pr-14
            "
          >
            <h2
              id="footer-brand-heading"
              className="sr-only"
            >
              {siteConfig.name}
            </h2>

            <Logo
              variant="footer"
              className="
                h-16
                w-auto
                max-w-full

                sm:h-18

                md:h-19.5

                lg:h-21.5

                xl:h-27
              "
            />


            <div
              aria-hidden="true"
              className="
                mt-6
                h-0.5
                w-12
                bg-primary
              "
            />


            <p
              className="
                mt-5
                max-w-82.5

                text-sm
                leading-7
                text-zinc-300

                sm:text-[15px]

                xl:text-[17px]
              "
            >
              Train hard. Fight smart.
              <br />

              Become stronger every day.
            </p>


            <div className="mt-8">
              <h3
                className="
                  mb-5

                  text-[13px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-white

                  sm:text-sm

                  xl:text-[18px]
                "
              >
                Follow Us
              </h3>

              <SocialLinks />
            </div>
          </section>


          {/* =================================================
              QUICK LINKS
          ================================================== */}

          <FooterColumn title="Quick Links">
            <nav aria-label="Footer navigation">
              <FooterNavigationList
                items={footerNavigation}
              />
            </nav>
          </FooterColumn>


          {/* =================================================
              PROGRAMS
          ================================================== */}

          <FooterColumn title="Our Programs">
            <nav aria-label="Programs">
              <FooterNavigationList
                items={programNavigation}
              />
            </nav>
          </FooterColumn>


          {/* =================================================
              CONTACT
          ================================================== */}

          <FooterColumn title="Contact Us">
            <div className="min-w-0 space-y-5">

              <address className="space-y-5 not-italic">

                <ContactLink
                  href={phoneHref}
                  icon={Phone}
                >
                  {siteConfig.contact.phone}
                </ContactLink>


                <ContactLink
                  href={emailHref}
                  icon={Mail}
                >
                  <span className="wrap-break-word">
                    {siteConfig.contact.email}
                  </span>
                </ContactLink>


                <div
                  className="
                    flex
                    min-w-0
                    items-start
                    gap-4

                    text-sm
                    leading-6
                    text-zinc-300

                    xl:text-[16px]
                  "
                >
                  <MapPin
                    aria-hidden="true"
                    strokeWidth={2.2}
                    className="
                      mt-0.5
                      size-5
                      shrink-0
                      text-primary
                    "
                  />

                  <span
                    className="
                      min-w-0
                      max-w-full
                      wrap-break-word

                      xl:max-w-77.5
                    "
                  >
                    {siteConfig.contact.address}
                  </span>
                </div>
              </address>


              {/* Contact divider */}

              <div
                aria-hidden="true"
                className="
                  my-6
                  h-px
                  w-full

                  bg-linear-to-r
                  from-primary/80
                  via-primary/35
                  to-transparent
                "
              />


              {/* Opening hours */}

              <div
                className="
                  flex
                  min-w-0
                  items-start
                  gap-4
                "
              >
                <Clock3
                  aria-hidden="true"
                  strokeWidth={2.2}
                  className="
                    mt-0.5
                    size-5
                    shrink-0
                    text-primary
                  "
                />

                <div
                  className="
                    min-w-0
                    flex-1
                    space-y-3
                  "
                >
                  {siteConfig.hours.map((item) => (
                    <div
                      key={item.days}
                      className="
                        flex
                        min-w-0
                        flex-col
                        gap-1

                        text-sm
                        leading-5
                        text-zinc-300

                        min-[430px]:grid
                        min-[430px]:grid-cols-[76px_minmax(0,1fr)]
                        min-[430px]:gap-3

                        xl:grid-cols-[82px_minmax(0,1fr)]
                        xl:text-[16px]
                        xl:leading-6
                      "
                    >
                      <span
                        className="
                          shrink-0
                          font-semibold
                          text-white
                        "
                      >
                        {item.days}
                      </span>

                      <span className="min-w-0">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FooterColumn>
        </div>


        {/* ===================================================
            WATERMARK
        ==================================================== */}

        <div
          className="
            mx-auto
            mt-12
            w-full
            px-1

            sm:mt-14
            sm:px-2

            md:mt-16
            md:px-3

            lg:mt-14
            lg:px-0

            xl:mt-5
          "
        >
          <FooterWatermark />
        </div>
      </div>


      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div
        className="
          relative
          z-20

          border-t
          border-white/15

          bg-black/65
          backdrop-blur-sm
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1850px]

            flex-col
            items-start
            gap-4

            px-5
            py-5

            sm:px-8
            sm:py-6

            md:px-10

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-12

            xl:min-h-21
            xl:px-16
            xl:py-0

            2xl:px-0
          "
        >
          <p
            className="
              max-w-full

              text-xs
              leading-5
              text-zinc-400

              sm:text-sm

              xl:text-[15px]
            "
          >
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>


          <nav
            aria-label="Legal navigation"
            className="
              flex
              flex-col
              items-start
              gap-2.5

              sm:flex-row
              sm:flex-wrap
              sm:items-center
              sm:gap-0
            "
          >
            {legalNavigation.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center"
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="
                      mx-5
                      hidden
                      h-4
                      w-px
                      bg-primary/60

                      sm:block
                    "
                  />
                )}

                {item.href.endsWith(".xml") ? (
                  <a
                    href={item.href}
                    className={footerLegalLinkClassName}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={footerLegalLinkClassName}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}


/* =========================================================
   FOOTER COLUMN
========================================================= */

type FooterColumnProps = {
  title: string
  children: ReactNode
}


function FooterColumn({
  title,
  children,
}: FooterColumnProps) {
  return (
    <section
      className="
        min-w-0

        border-t
        border-white/10
        pt-8

        md:border-t-0
        md:pt-0

        xl:min-h-77.5
        xl:border-l
        xl:border-white/15
        xl:px-10
      "
    >
      <h2
        className="
          text-[13px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-primary

          sm:text-sm

          xl:text-[16px]
        "
      >
        {title}
      </h2>


      <div
        aria-hidden="true"
        className="
          mt-4
          h-0.5
          w-10
          bg-primary
        "
      />


      <div className="mt-6">
        {children}
      </div>
    </section>
  )
}


/* =========================================================
   NAVIGATION LIST
========================================================= */

type FooterNavigationListProps = {
  items: readonly FooterNavigationItem[]
}


function FooterNavigationList({
  items,
}: FooterNavigationListProps) {
  return (
    <ul className="space-y-3.5 sm:space-y-4">
      {items.map((item) => (
        <FooterLink
          key={item.id}
          href={item.href}
        >
          {item.label}
        </FooterLink>
      ))}
    </ul>
  )
}


/* =========================================================
   FOOTER LINK
========================================================= */

type FooterLinkProps = {
  href: string
  children: ReactNode
}


function FooterLink({
  href,
  children,
}: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="
          block
          w-fit
          rounded-sm

          text-sm
          leading-6
          text-zinc-300

          transition-colors
          duration-200

          hover:text-primary

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-4
          focus-visible:ring-offset-black

          motion-reduce:transition-none

          xl:text-[16px]
        "
      >
        {children}
      </Link>
    </li>
  )
}


/* =========================================================
   CONTACT LINK
========================================================= */

type ContactLinkProps = {
  href: string
  icon: LucideIcon
  children: ReactNode
}


function ContactLink({
  href,
  icon: Icon,
  children,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      className="
        flex
        min-w-0
        w-fit
        items-start
        gap-4
        rounded-sm

        text-sm
        leading-6
        text-zinc-300

        transition-colors
        duration-200

        hover:text-primary

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-4
        focus-visible:ring-offset-black

        motion-reduce:transition-none

        xl:text-[16px]
      "
    >
      <Icon
        aria-hidden="true"
        strokeWidth={2.2}
        className="
          mt-0.5
          size-5
          shrink-0
          text-primary
        "
      />

      <span
        className="
          min-w-0
          wrap-break-word
        "
      >
        {children}
      </span>
    </a>
  )
}


/* =========================================================
   SHARED LEGAL LINK STYLE
========================================================= */

const footerLegalLinkClassName = `
  rounded-sm

  text-xs
  text-zinc-400

  transition-colors
  duration-200

  hover:text-primary

  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary
  focus-visible:ring-offset-4
  focus-visible:ring-offset-black

  motion-reduce:transition-none

  sm:text-sm

  xl:text-[15px]
`