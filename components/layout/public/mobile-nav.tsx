"use client"

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronRight,
  Menu,
} from "lucide-react"

import { Logo } from "@/components/shared/logo"
import { ThemeToggle } from "@/components/shared/theme-toggle"

import { publicNavigation } from "@/config/navigation"

import { cn } from "@/lib/utils"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Separator } from "@/components/ui/separator"


/* =========================================================
   MOBILE NAV
========================================================= */

export function MobileNav() {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        {/* ===================================================
            MENU TRIGGER
        ==================================================== */}

        <SheetTrigger
          aria-label="Open navigation menu"
          className="
            group

            inline-flex
            size-11
            shrink-0
            items-center
            justify-center

            rounded-full
            border
            border-primary/35

            bg-black/45

            text-primary

            shadow-[0_0_0_1px_rgba(212,175,55,0.04),0_8px_30px_rgba(0,0,0,0.30)]

            backdrop-blur-xl

            transition-all
            duration-300

            hover:border-primary/70
            hover:bg-primary/10

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            focus-visible:ring-offset-black

            motion-reduce:transition-none
          "
        >
          <Menu
            aria-hidden="true"
            strokeWidth={1.8}
            className="
              size-5.5

              transition-transform
              duration-300

              group-hover:scale-110

              motion-reduce:transition-none
            "
          />
        </SheetTrigger>


        {/* ===================================================
            SHEET / MOBILE MENU
        ==================================================== */}

        <SheetContent
          side="right"
          className="
            relative

            w-full
            max-w-none

            overflow-x-hidden
            overflow-y-auto

            border-l
            border-primary/15

            bg-[#070707]

            p-0

            text-foreground

            sm:max-w-107.5

            [&>button]:right-5
            [&>button]:top-6
            [&>button]:z-50

            [&>button]:flex
            [&>button]:size-11
            [&>button]:items-center
            [&>button]:justify-center

            [&>button]:rounded-full

            [&>button]:border
            [&>button]:border-primary/25

            [&>button]:bg-black/45

            [&>button]:text-primary

            [&>button]:opacity-100

            [&>button]:backdrop-blur-xl

            [&>button]:transition-all
            [&>button]:duration-200

            [&>button:hover]:border-primary/70
            [&>button:hover]:bg-primary/10

            [&>button:focus-visible]:outline-none
            [&>button:focus-visible]:ring-2
            [&>button:focus-visible]:ring-primary

            sm:[&>button]:right-7
          "
        >
          {/* =================================================
              BACKGROUND IMAGE
          ================================================== */}

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
              src="/images/footer/footer-bg.png"
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 430px"
              className="
                object-cover
                object-[25%_center]

                opacity-35
              "
            />
          </div>


          {/* =================================================
              DARK OVERLAY
          ================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-0
              -z-20

              bg-linear-to-b
              from-black/70
              via-black/92
              to-black/98
            "
          />


          {/* =================================================
              GOLD AMBIENT GLOW
          ================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-y-0
              right-0
              -z-10

              w-2/3

              bg-[radial-gradient(circle_at_100%_45%,rgba(212,175,55,0.12),transparent_58%)]
            "
          />


          {/* =================================================
              HEADER
          ================================================== */}

          <SheetHeader
            className="
              relative
              z-10

              px-5
              pb-4
              pt-6

              text-left

              sm:px-7
              sm:pt-7
            "
          >
            <div
              className="
                flex
                min-h-14
                items-center
                pr-16
              "
            >
              <Logo
                variant="header"
                className="
                  h-13.5
                  w-auto

                  sm:h-14.5
                "
              />
            </div>

            <SheetTitle className="sr-only">
              Rebel Boxing Club navigation
            </SheetTitle>

            <SheetDescription className="sr-only">
              Navigate through the Rebel Boxing Club website.
            </SheetDescription>
          </SheetHeader>


          {/* =================================================
              CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10

              flex
              min-h-[calc(100dvh-96px)]
              flex-col

              px-5

              pb-[max(28px,env(safe-area-inset-bottom))]

              sm:px-7
            "
          >
            {/* ===============================================
                MAIN NAVIGATION
            ================================================ */}

            <nav
              aria-label="Mobile navigation"
              className="mt-4"
            >
              <ul className="space-y-1">
                {publicNavigation.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        aria-current={
                          isActive
                            ? "page"
                            : undefined
                        }
                        onClick={() => {
                          setOpen(false)
                        }}
                        className={cn(
                          `
                            group
                            relative

                            flex
                            min-h-15
                            w-full
                            items-center
                            justify-between

                            overflow-hidden
                            rounded-sm

                            px-4
                            py-3

                            text-[17px]
                            font-medium
                            text-zinc-200

                            transition-all
                            duration-200

                            hover:bg-white/4
                            hover:text-white

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-black

                            motion-reduce:transition-none
                          `,
                          isActive &&
                            `
                              bg-linear-to-r
                              from-primary/15
                              via-primary/7
                              to-transparent

                              text-primary
                            `
                        )}
                      >
                        {/* Active indicator */}

                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="
                              absolute
                              inset-y-2
                              left-0

                              w-0.75

                              rounded-full
                              bg-primary

                              shadow-[0_0_12px_rgba(212,175,55,0.45)]
                            "
                          />
                        )}


                        {/* Link text */}

                        <span
                          className={cn(
                            "relative z-10",
                            isActive && "pl-1"
                          )}
                        >
                          {item.label}
                        </span>


                        {/* Arrow */}

                        <ChevronRight
                          aria-hidden="true"
                          strokeWidth={1.7}
                          className={cn(
                            `
                              size-5
                              shrink-0

                              text-zinc-500

                              transition-all
                              duration-200

                              group-hover:translate-x-0.5
                              group-hover:text-primary

                              motion-reduce:transition-none
                            `,
                            isActive &&
                              "text-primary"
                          )}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>


            {/* ===============================================
                DIVIDER
            ================================================ */}

            <Separator
              className="
                my-7
                bg-white/10
              "
            />


            {/* ===============================================
                THEME CONTROL
            ================================================ */}

            <section
              aria-labelledby="mobile-theme-heading"
              className="
                flex
                items-center
                justify-between
                gap-5
              "
            >
              <div className="min-w-0">
                <h2
                  id="mobile-theme-heading"
                  className="
                    text-[15px]
                    font-medium
                    text-zinc-100
                  "
                >
                  Appearance
                </h2>

                <p
                  className="
                    mt-1

                    text-xs
                    leading-5
                    text-zinc-500
                  "
                >
                  Switch between light and dark mode
                </p>
              </div>

              <div className="shrink-0">
                <ThemeToggle />
              </div>
            </section>


            {/* ===============================================
                BOTTOM BRAND ACCENT
            ================================================ */}

            <div className="mt-auto pt-10">
              <Separator className="bg-white/10" />

              <div
                className="
                  flex
                  items-center
                  gap-3
                  pt-6
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-px
                    w-8
                    shrink-0
                    bg-primary
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-primary/80
                  "
                >
                  Rebel Boxing Club
                </span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}