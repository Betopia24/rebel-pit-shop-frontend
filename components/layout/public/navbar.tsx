"use client"

import { useSyncExternalStore } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { MobileNav } from "@/components/layout/public/mobile-nav"
import { Logo } from "@/components/shared/logo"

import { publicNavigation } from "@/config/navigation"

import { cn } from "@/lib/utils"


/* =========================================================
   VIEWPORT STORE

   We use useSyncExternalStore instead of setState inside
   an effect. The snapshot stays boolean, so React only
   re-renders when the navbar actually crosses the Hero
   boundary.
========================================================= */

function subscribeToViewport(
  onStoreChange: () => void
) {
  window.addEventListener(
    "scroll",
    onStoreChange,
    {
      passive: true,
    }
  )

  window.addEventListener(
    "resize",
    onStoreChange
  )

  return () => {
    window.removeEventListener(
      "scroll",
      onStoreChange
    )

    window.removeEventListener(
      "resize",
      onStoreChange
    )
  }
}


function hasCrossedHomeHero() {
  const hero =
    document.querySelector<HTMLElement>(
      "#main-content > section:first-of-type"
    )

  /*
   * Fallback:
   * If the homepage Hero cannot be found, use a small
   * scroll threshold instead of leaving the navbar
   * permanently transparent.
   */
  if (!hero) {
    return window.scrollY > 24
  }

  return (
    hero.getBoundingClientRect().bottom <= 0
  )
}


/* =========================================================
   PUBLIC NAVBAR

   Behaviour:
   - Fixed at the top of the viewport
   - Transparent while the homepage Hero is visible
   - Premium glass bar after the Hero has been crossed
   - Glass bar is enabled immediately on non-home pages
   - Desktop navigation: 1280px+
   - Mobile / tablet navigation: below 1280px
   - Dark-only UI; no theme toggle
========================================================= */

export function Navbar() {
  const pathname = usePathname()


  const hasGlassBackground =
    useSyncExternalStore(
      subscribeToViewport,

      () => {
        /*
         * The cinematic transparent navbar is specifically
         * for the homepage Hero.
         *
         * Other public pages receive the readable glass
         * navbar immediately.
         */
        if (pathname !== "/") {
          return true
        }

        return hasCrossedHomeHero()
      },

      /*
       * Server snapshot:
       * Homepage starts transparent.
       * Internal pages can start with the glass treatment.
       */
      () => pathname !== "/"
    )


  return (
    <header
      className={cn(
        `
          fixed
          inset-x-0
          top-0

          z-[var(--z-navbar)]

          w-full

          border-b

          transition-[background-color,border-color,box-shadow,backdrop-filter]
          duration-300
          ease-out

          motion-reduce:transition-none
        `,
        hasGlassBackground
          ? `
              border-foreground/10

              bg-background/75

              shadow-(--shadow-navbar)

              backdrop-blur-2xl
              backdrop-saturate-150
            `
          : `
              border-transparent

              bg-transparent

              shadow-none
            `
      )}
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

            shadow-(--shadow-navbar)

            backdrop-blur-xl

            xl:flex
          "
        >
          {publicNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(
                    item.href
                  )


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
        </nav>


        {/* ===================================================
            MOBILE + TABLET NAVIGATION

            MobileNav internally uses:
            xl:hidden

            < 1280px  → MobileNav
            >=1280px  → Desktop navigation
        ==================================================== */}

        <MobileNav />
      </div>
    </header>
  )
}
