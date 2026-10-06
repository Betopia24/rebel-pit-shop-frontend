"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { MobileNav } from "@/components/layout/public/mobile-nav"
import { Logo } from "@/components/shared/logo"
import { ThemeToggle } from "@/components/shared/theme-toggle"

import { publicNavigation } from "@/config/navigation"

import { cn } from "@/lib/utils"


/* =========================================================
   PUBLIC NAVBAR

   Behaviour:
   - Fixed at the top of the viewport
   - Remains visible while scrolling
   - Keeps the existing transparent / floating design
   - Desktop navigation: 1280px+
   - Mobile / tablet navigation: below 1280px

   IMPORTANT:
   We intentionally use `fixed` instead of `sticky`.

   A normal sticky header remains in document flow and
   would push the Hero section downward.

   Fixed positioning keeps the current Hero-overlay design
   exactly as it is while still keeping the navbar visible
   during scrolling.
========================================================= */

export function Navbar() {
  const pathname = usePathname()


  return (
    <header
      className="
        fixed
        inset-x-0
        top-0

        z-[var(--z-navbar)]

        w-full
      "
    >
      {/* =====================================================
          NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          flex
          w-full
          items-center
          justify-between

          h-20
          px-5

          sm:px-7

          md:px-10

          lg:px-14

          xl:h-24
          xl:px-20

          2xl:px-24
        "
      >
        {/* ===================================================
            LOGO
        ==================================================== */}

        <Logo
          variant="header"
          priority
          className="
            h-13.5
            w-auto

            sm:h-14

            xl:h-14.5
          "
        />


        {/* ===================================================
            DESKTOP NAVIGATION
            Visible: >= 1280px
        ==================================================== */}

        <nav
          aria-label="Main navigation"
          className="
            hidden
            items-center

            rounded-full

            border
            border-foreground/20

            bg-background/35

            p-1.5

            shadow-[var(--shadow-navbar)]

            backdrop-blur-xl

            xl:flex
          "
        >
          {publicNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)


            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                className={cn(
                  `
                    relative

                    flex
                    h-9
                    items-center

                    rounded-full

                    px-4

                    text-sm
                    font-medium

                    transition-colors
                    duration-200

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-background

                    motion-reduce:transition-none
                  `,
                  isActive
                    ? "text-primary"
                    : `
                        text-foreground/80

                        hover:text-foreground
                      `
                )}
              >
                {item.label}


                {/* Active indicator */}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-1
                      left-1/2

                      h-0.5
                      w-5

                      -translate-x-1/2

                      rounded-full

                      bg-primary
                    "
                  />
                )}
              </Link>
            )
          })}


          {/* =================================================
              NAV DIVIDER
          ================================================== */}

          <div
            aria-hidden="true"
            className="
              mx-2

              h-5
              w-px

              bg-foreground/15
            "
          />


          {/* =================================================
              THEME
          ================================================== */}

          <ThemeToggle />
        </nav>


        {/* ===================================================
            MOBILE + TABLET NAVIGATION

            MobileNav internally uses:
            xl:hidden

            Therefore:
            < 1280px  → MobileNav
            >=1280px  → Desktop nav
        ==================================================== */}

        <MobileNav />
      </div>
    </header>
  )
}