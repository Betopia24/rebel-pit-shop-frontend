"use client"

import { useId } from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

import { BOOKING_TABS } from "../../config/booking-types.config"

import type { BookingTabCounts } from "../../config/booking-types.config"

import type { BookingTab } from "../../types/booking.types"

export interface BookingTypeTabsProps {
  value: BookingTab
  onChange: (value: BookingTab) => void
  counts?: BookingTabCounts | null
  showCounts?: boolean
  disabled?: boolean
  className?: string
}

const COUNT_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
})

function formatCount(count: number | undefined): string | null {
  if (count === undefined || !Number.isFinite(count) || count < 0) {
    return null
  }

  return COUNT_FORMATTER.format(Math.trunc(count))
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingTypeTabs({
  value,
  onChange,
  counts = null,
  showCounts = false,
  disabled = false,
  className,
}: BookingTypeTabsProps) {
  const labelId = useId()

  return (
    <nav
      aria-labelledby={labelId}
      className={cn("w-full min-w-0", "border-b border-border", className)}
    >
      <h2 id={labelId} className="sr-only">
        Booking categories
      </h2>

      <Tabs
        value={value}
        onValueChange={(nextValue) => {
          if (disabled) return

          const nextTab = BOOKING_TABS.find((tab) => tab.value === nextValue)

          if (!nextTab) return

          if (nextTab.value !== value) {
            onChange(nextTab.value)
          }
        }}
        className="w-full min-w-0"
      >
        {/* Horizontal overflow container */}
        <div
          className={cn(
            "w-full overflow-x-auto",
            "overflow-y-hidden",
            "overscroll-x-contain",
            "scrollbar-hidden"
          )}
        >
          <TabsList
            className={cn(
              "inline-flex h-auto w-max min-w-full",
              "items-stretch justify-start",
              "gap-1 rounded-none",
              "bg-transparent p-0",
              "shadow-none"
            )}
          >
            {BOOKING_TABS.map((tab) => {
              const Icon = tab.icon

              const isActive = value === tab.value

              const count = counts ? formatCount(counts[tab.value]) : null

              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  disabled={disabled}
                  aria-label={tab.label}
                  className={cn(
                    "relative inline-flex h-10",
                    "shrink-0 items-center",
                    "justify-center gap-1.5",
                    "rounded-none border-0",
                    "border-b-2 border-transparent",
                    "bg-transparent px-3 py-2",
                    "text-[11px] font-medium",
                    "whitespace-nowrap shadow-none",
                    "transition-colors",
                    "text-muted-foreground",
                    "hover:bg-muted/40",
                    "hover:text-foreground",
                    "focus-visible:z-10",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-ring",
                    "focus-visible:ring-inset",
                    "disabled:pointer-events-none",
                    "disabled:opacity-50",
                    "data-[active]:border-gold",
                    "data-[active]:bg-transparent",
                    "data-[active]:text-gold",
                    "data-[active]:shadow-none",
                    "data-[state=active]:border-gold",
                    "data-[state=active]:bg-transparent",
                    "data-[state=active]:text-gold",
                    "data-[state=active]:shadow-none",
                    isActive && "border-gold text-gold"
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-3.5 shrink-0"
                    strokeWidth={1.8}
                  />

                  <span>{tab.label}</span>

                  {showCounts && count !== null && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex min-w-5",
                        "items-center justify-center",
                        "rounded-md px-1.5 py-0.5",
                        "text-[10px] font-semibold",
                        "leading-none tabular-nums",
                        isActive
                          ? "bg-gold-10 text-gold"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
      </Tabs>
    </nav>
  )
}

export default BookingTypeTabs
