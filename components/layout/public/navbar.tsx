"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Logo } from "@/components/shared/logo"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { publicNavigation } from "@/config/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full">
      <div
        className={cn(
          "flex w-full items-center justify-between",
          "h-24",
          "px-8 lg:px-14 xl:px-20 2xl:px-24"
        )}
      >
        {/* Logo */}
        <Logo
          variant="header"
          priority
          className="h-14.5 w-auto"
        />

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className={cn(
            "hidden md:flex items-center",
            "rounded-full",
            "border border-white/20",
            "bg-black/35",
            "p-1.5",
            "backdrop-blur-xl",
            "shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
          )}
        >
          {publicNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex h-9 items-center rounded-full px-4",
                  "text-sm font-medium",
                  "transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-white/80 hover:text-white"
                )}
              >
                {item.label}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-1 left-1/2",
                      "h-0.5 w-5",
                      "-translate-x-1/2",
                      "rounded-full bg-primary"
                    )}
                  />
                )}
              </Link>
            )
          })}

          <div
            aria-hidden="true"
            className="mx-2 h-5 w-px bg-white/15"
          />

          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}