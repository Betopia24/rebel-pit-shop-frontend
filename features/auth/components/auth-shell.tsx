import Image from "next/image"
import Link from "next/link"

import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface AuthShellProps {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  headerContent?: ReactNode
  className?: string
  cardClassName?: string
}

export function AuthShell({
  title,
  description,
  children,
  footer,
  headerContent,
  className,
  cardClassName,
}: AuthShellProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center",
        "justify-center",
        "px-4 py-8",
        "sm:px-6 sm:py-12",
        className
      )}
    >
      <div className="w-full max-w-md">
        {/* Original Rebel Boxing Club logo */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <Link
            href="/login"
            aria-label="Rebel Boxing Club — Sign in"
            className={cn(
              "flex items-center justify-center",
              "rounded-lg p-2",
              "outline-none",
              "transition-opacity duration-150",
              "hover:opacity-85",
              "focus-visible:ring-2",
              "focus-visible:ring-ring",
              "focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background",
              "motion-reduce:transition-none"
            )}
          >
            <span className="relative block h-20 w-[220px] max-w-full">
              <Image
                src="/images/branding/rebel-boxing-logo.webp"
                alt="Rebel Boxing Club"
                fill
                priority
                sizes="220px"
                className={cn("object-contain", "select-none")}
              />
            </span>
          </Link>
        </div>

        {/* Authentication card */}
        <Card
          className={cn(
            "w-full gap-0",
            "rounded-xl",
            "border border-border",
            "bg-card text-card-foreground",
            "py-0",
            "shadow-(--shadow-card-soft)",
            cardClassName
          )}
        >
          <CardContent className="px-5 py-7 sm:px-8 sm:py-9">
            <div className="flex flex-col gap-6">
              {/* Optional recovery step indicator */}
              {headerContent && <div className="min-w-0">{headerContent}</div>}

              {/* Heading */}
              <div className="space-y-2 text-center">
                <h1
                  className={cn(
                    "text-2xl font-semibold",
                    "tracking-tight",
                    "text-foreground",
                    "sm:text-[28px]"
                  )}
                >
                  {title}
                </h1>

                {description && (
                  <p
                    className={cn(
                      "mx-auto max-w-sm",
                      "text-sm leading-relaxed",
                      "text-muted-foreground"
                    )}
                  >
                    {description}
                  </p>
                )}
              </div>

              {/* Form */}
              <div className="min-w-0">{children}</div>

              {/* Optional footer */}
              {footer && (
                <div
                  className={cn(
                    "border-t border-border",
                    "pt-5 text-center",
                    "text-sm text-muted-foreground"
                  )}
                >
                  {footer}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Minimal security footer */}
        <p className={cn("mt-6 text-center", "text-xs text-text-muted")}>
          Authorized staff access only
        </p>
      </div>
    </div>
  )
}
