
"use client"

import { useSyncExternalStore } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { MobileNav } from "@/components/layout/public/mobile-nav"
import { Logo } from "@/components/shared/logo"

import { publicNavigation } from "@/config/navigation"

import { cn } from "@/lib/utils"


/* =========================================================
   NAVBAR CONFIGURATION

   Routes with cinematic Hero sections.

   Navbar stays transparent while these Hero sections
   remain visible, and switches to glass after they pass.
========================================================= */

const heroSelectors: Record<string, string> = {
  "/": "#main-content > section:first-of-type",

  "/about": "#about-hero",
}


/* =========================================================
   SCROLL STORE

   Uses useSyncExternalStore instead of setState/useEffect.

   React only updates the component when the returned
   boolean changes.
========================================================= */

function subscribeToViewport(
  onStoreChange: () => void
) {
  window.addEventListener(
    "scroll",
    onStoreChange,
    { passive: true }
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


/* =========================================================
   HERO DETECTION
========================================================= */

function hasCrossedHero(
  pathname: string
): boolean {
  const normalizedPath =
    pathname === "/"
      ? "/"
      : pathname.replace(/\/+$/, "")

  const heroSelector =
    heroSelectors[normalizedPath]


  /*
   * Pages without a registered cinematic hero
   * get the readable glass navbar immediately.
   */

  if (!heroSelector) {
    return true
  }


  const hero =
    document.querySelector<HTMLElement>(
      heroSelector
    )


  /*
   * Avoid showing glass before the hero has mounted.
   */

  if (!hero) {
    return false
  }


  /*
   * Hero bottom:
   *
   * > 0  → Hero remains in viewport
   * <= 0 → Hero has passed
   */

  return (
    hero.getBoundingClientRect().bottom <= 0
  )
}


/* =========================================================
   SERVER SNAPSHOT

   Ensures consistent initial rendering during SSR.

   Home/About start transparent.
   Other pages start with glass.
========================================================= */

function getInitialGlassState(
  pathname: string
) {
  const normalizedPath =
    pathname === "/"
      ? "/"
      : pathname.replace(/\/+$/, "")

  return !Object.prototype.hasOwnProperty.call(
    heroSelectors,
    normalizedPath
  )
}


/* =========================================================
   PUBLIC NAVBAR

   Design:
   - Fixed overlay
   - Transparent on Hero
   - Glass after Hero
   - Dark Rebel Boxing design system
   - Desktop navigation >= 1280px
   - Mobile navigation < 1280px
========================================================= */

export function Navbar() {
  const pathname = usePathname()


  const hasGlassBackground =
    useSyncExternalStore(
      subscribeToViewport,

      () => hasCrossedHero(pathname),

      () => getInitialGlassState(pathname)
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
          duration-500
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

              backdrop-blur-none
            `
      )}
    >
      {/* =====================================================
          NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto

          flex
          h-20
          w-full

          items-center
          justify-between

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
        ==================================================== */}

        <nav
          aria-label="Main navigation"
          className={cn(
            `
              hidden
              items-center

              rounded-full

              border

              p-1.5

              transition-[background-color,border-color,box-shadow,backdrop-filter]
              duration-500
              ease-out

              motion-reduce:transition-none

              xl:flex
            `,

            hasGlassBackground
              ? `
                  border-foreground/20

                  bg-background/35

                  shadow-(--shadow-navbar)

                  backdrop-blur-xl
                `
              : `
                  border-foreground/20

                  bg-transparent

                  shadow-none

                  backdrop-blur-none
                `
          )}
        >
          {publicNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(
                    `${item.href}/`
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
                    ? `
                        text-primary
                      `
                    : `
                        text-foreground/80

                        hover:text-foreground
                      `
                )}
              >
                {item.label}


                {/* ACTIVE INDICATOR */}

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
            MOBILE / TABLET NAVIGATION
        ==================================================== */}

        <MobileNav />
      </div>
    </header>
  )
}
