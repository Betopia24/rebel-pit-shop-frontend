"use client"

import {
  CalendarDays,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"

/* =========================================================
   SCHEDULE EMPTY STATE

   Reusable for:
   - Empty filtered schedule
   - Empty selected day
   - Empty week

   Design:
   - Rebel dark / gold visual language
   - Compact and premium
   - No unnecessary illustration
   - Clear recovery actions
   - Responsive
========================================================= */

export type ScheduleEmptyStateVariant =
  | "filters"
  | "day"
  | "week"

type ScheduleEmptyStateProps = {
  variant?: ScheduleEmptyStateVariant

  title?: string

  description?: string

  compact?: boolean

  onResetFilters?: () => void

  onGoToday?: () => void
}

const emptyStateContent: Record<
  ScheduleEmptyStateVariant,
  {
    eyebrow: string
    title: string
    description: string
  }
> = {
  filters: {
    eyebrow: "No Matches",

    title: "No Classes Found.",

    description:
      "No classes match the filters you selected. Reset your filters or try a different combination.",
  },

  day: {
    eyebrow: "No Classes Today",

    title: "Nothing Scheduled.",

    description:
      "There are no classes matching your selection for this day. Choose another day or return to today's schedule.",
  },

  week: {
    eyebrow: "Schedule Empty",

    title: "No Classes This Week.",

    description:
      "There are currently no classes available for this week. Try another week or return to the current schedule.",
  },
}

export function ScheduleEmptyState({
  variant = "filters",

  title,

  description,

  compact = false,

  onResetFilters,

  onGoToday,
}: ScheduleEmptyStateProps) {
  const content =
    emptyStateContent[
      variant
    ]

  const displayTitle =
    title ??
    content.title

  const displayDescription =
    description ??
    content.description

  const showReset =
    Boolean(
      onResetFilters
    )

  const showToday =
    Boolean(
      onGoToday
    )

  const hasActions =
    showReset ||
    showToday

  return (
    <div
      className={`
        relative
        isolate

        overflow-hidden

        rounded-xl

        border
        border-foreground/10

        bg-surface-dark

        shadow-(--shadow-card-soft)

        ${
          compact
            ? "px-5 py-8"
            : "px-6 py-12 sm:px-8 sm:py-14"
        }
      `}
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

          bg-[radial-gradient(circle_at_50%_0%,var(--gold-08),transparent_48%)]
        "
      />

      {/* SUBTLE GRID */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          opacity-30

          bg-[linear-gradient(var(--foreground-03)_1px,transparent_1px),linear-gradient(90deg,var(--foreground-03)_1px,transparent_1px)]

          bg-size-[60px_60px]
        "
      />

      {/* TOP GOLD ACCENT */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          z-10

          h-px

          bg-linear-to-r
          from-transparent
          via-primary/55
          to-transparent
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className={`
          relative
          z-20

          mx-auto

          flex
          max-w-xl
          flex-col

          items-center

          text-center

          ${
            compact
              ? "max-w-md"
              : ""
          }
        `}
      >
        {/* ===================================================
            ICON
        ==================================================== */}

        <div
          className={`
            relative

            flex
            items-center
            justify-center

            rounded-full

            border
            border-primary/35

            bg-primary/5

            text-primary

            ${
              compact
                ? "size-12"
                : "size-14"
            }
          `}
        >
          <CalendarDays
            aria-hidden={true}
            strokeWidth={1.5}
            className={
              compact
                ? "size-5"
                : "size-6"
            }
          />

          {/* SMALL STATUS DOT */}

          <span
            aria-hidden="true"
            className="
              absolute
              -right-0.5
              -top-0.5

              size-3

              rounded-full

              border-2
              border-surface-dark

              bg-primary
            "
          />
        </div>

        {/* ===================================================
            EYEBROW
        ==================================================== */}

        <div
          className="
            mt-5

            flex
            items-center
            justify-center

            gap-3
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px
              w-6

              bg-primary/70
            "
          />

          <span
            className="
              text-[9px]
              font-bold
              uppercase

              tracking-[0.2em]

              text-primary
            "
          >
            {
              content.eyebrow
            }
          </span>

          <span
            aria-hidden="true"
            className="
              h-px
              w-6

              bg-primary/70
            "
          />
        </div>

        {/* ===================================================
            TITLE
        ==================================================== */}

        <h3
          className={`
            mt-3

            font-heading
            font-black
            uppercase

            leading-none
            tracking-tight

            text-foreground

            ${
              compact
                ? "text-xl"
                : "text-2xl sm:text-3xl"
            }
          `}
        >
          {displayTitle}
        </h3>

        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        <p
          className={`
            mt-3

            max-w-md

            text-text-secondary

            ${
              compact
                ? "text-xs leading-5"
                : "text-sm leading-6"
            }
          `}
        >
          {
            displayDescription
          }
        </p>

        {/* ===================================================
            ACTIONS
        ==================================================== */}

        {hasActions && (
          <div
            className="
              mt-6

              flex
              w-full
              flex-col

              items-center
              justify-center

              gap-2.5

              sm:w-auto
              sm:flex-row
            "
          >
            {showReset && (
              <Button
                type="button"
                onClick={
                  onResetFilters
                }
                className="
                  group

                  min-h-10
                  w-full

                  bg-primary

                  px-5

                  text-[9px]
                  font-bold
                  uppercase

                  tracking-[0.08em]

                  text-primary-foreground

                  shadow-(--shadow-gold-xs)

                  hover:bg-gold-hover
                  hover:shadow-(--shadow-gold-sm)

                  sm:w-auto
                "
              >
                <RotateCcw
                  aria-hidden={true}
                  strokeWidth={
                    1.8
                  }
                  className="
                    size-3.5

                    transition-transform
                    duration-300

                    group-hover:-rotate-45

                    motion-reduce:transform-none
                  "
                />

                Reset Filters
              </Button>
            )}

            {showToday && (
              <Button
                type="button"
                variant="outline"
                onClick={
                  onGoToday
                }
                className="
                  min-h-10
                  w-full

                  border-foreground/15

                  bg-foreground/4

                  px-5

                  text-[9px]
                  font-bold
                  uppercase

                  tracking-[0.08em]

                  text-foreground

                  hover:border-primary/40
                  hover:bg-primary/5
                  hover:text-primary

                  sm:w-auto
                "
              >
                <CalendarDays
                  aria-hidden={true}
                  strokeWidth={
                    1.7
                  }
                  className="size-3.5"
                />

                Today&apos;s Classes
              </Button>
            )}
          </div>
        )}

        {/* ===================================================
            SUPPORTING HINT
        ==================================================== */}

        {variant ===
          "filters" && (
          <div
            className="
              mt-6

              inline-flex
              items-center

              gap-2

              text-[8px]
              font-semibold
              uppercase

              tracking-[0.12em]

              text-text-muted
            "
          >
            <SlidersHorizontal
              aria-hidden={
                true
              }
              strokeWidth={
                1.6
              }
              className="size-3"
            />

            Try fewer filters
          </div>
        )}
      </div>
    </div>
  )
}