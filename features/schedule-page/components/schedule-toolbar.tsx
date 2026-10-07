"use client"

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import type {
  ScheduleFilters,
  ScheduleWeek,
} from "../types"

import {
  formatWeekRange,
} from "../utils/date"

import {
  getTotalClasses,
} from "../utils/schedule"

import {
  ScheduleFiltersControl,
} from "./schedule-filters"

type ScheduleToolbarProps = {
  week: ScheduleWeek

  filters: ScheduleFilters

  onFiltersChange: (
    filters: ScheduleFilters
  ) => void

  onPreviousWeek: () => void
  onNextWeek: () => void
  onToday: () => void
}

export function ScheduleToolbar({
  week,
  filters,

  onFiltersChange,

  onPreviousWeek,
  onNextWeek,
  onToday,
}: ScheduleToolbarProps) {
  return (
    <div
      className="
        relative
        z-20

        border-y
        border-foreground/10

        bg-surface-deep/95

        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-375

          px-5
          py-5

          sm:px-7

          md:px-10

          lg:px-14
          lg:py-6

          xl:px-20
        "
      >
        <div
          className="
            flex
            flex-col

            gap-5

            xl:flex-row
            xl:items-end
            xl:justify-between
            xl:gap-10
          "
        >
          {/* =================================================
              WEEK INFORMATION
          ================================================== */}

          <div
            className="
              flex
              flex-col

              gap-4

              sm:flex-row
              sm:items-end
              sm:justify-between

              xl:shrink-0
              xl:justify-start
              xl:gap-5
            "
          >
            <div>
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
                    h-px
                    w-7

                    bg-primary
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase

                    tracking-[0.21em]

                    text-primary
                  "
                >
                  Your Week
                </span>
              </div>

              <h2
                id="schedule-main-heading"
                className="
                  mt-2

                  font-heading
                  text-2xl
                  font-black
                  uppercase

                  leading-none
                  tracking-[-0.035em]

                  text-foreground

                  sm:text-3xl
                "
              >
                {formatWeekRange(
                  week.startDate,
                  week.endDate
                )}
              </h2>

              <p
                className="
                  mt-2

                  text-[10px]
                  font-medium

                  text-text-muted
                "
              >
                {getTotalClasses(
                  week
                )}{" "}
                classes available this week
              </p>
            </div>

            {/* WEEK NAVIGATION */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Previous week"
                onClick={
                  onPreviousWeek
                }
                className="
                  border-foreground/15

                  bg-surface

                  hover:border-primary/40
                  hover:bg-primary/5
                  hover:text-primary
                "
              >
                <ChevronLeft
                  aria-hidden={true}
                  className="size-4"
                />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onToday}
                className="
                  border-foreground/15

                  bg-surface

                  px-4

                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.08em]

                  hover:border-primary/40
                  hover:bg-primary/5
                  hover:text-primary
                "
              >
                Today
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Next week"
                onClick={
                  onNextWeek
                }
                className="
                  border-foreground/15

                  bg-surface

                  hover:border-primary/40
                  hover:bg-primary/5
                  hover:text-primary
                "
              >
                <ChevronRight
                  aria-hidden={true}
                  className="size-4"
                />
              </Button>
            </div>
          </div>

          {/* =================================================
              FILTERS
          ================================================== */}

          <div
            className="
              w-full

              xl:max-w-[560px]
            "
          >
            <ScheduleFiltersControl
              week={week}
              filters={filters}
              onChange={
                onFiltersChange
              }
            />
          </div>
        </div>

        {/* ===================================================
            CALENDAR LEGEND

            This makes color meaning explicit instead of
            expecting users to infer it.
        ==================================================== */}

        <div
          className="
            mt-5

            hidden

            flex-wrap
            items-center

            gap-x-6
            gap-y-2

            border-t
            border-foreground/8

            pt-4

            sm:flex
          "
        >
          <CalendarLegendItem
            swatchClassName="
              border-primary
              bg-primary
            "
            label="Today"
          />

          <CalendarLegendItem
            swatchClassName="
              border-foreground/15
              bg-surface-card
            "
            label="Scheduled Day"
          />

          <CalendarLegendItem
            dotClassName="bg-primary"
            label="Few Spots Left"
          />

          <CalendarLegendItem
            dotClassName="bg-destructive"
            label="Class Full"
          />
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   LEGEND ITEM
========================================================= */

type CalendarLegendItemProps = {
  label: string

  swatchClassName?: string
  dotClassName?: string
}

function CalendarLegendItem({
  label,
  swatchClassName,
  dotClassName,
}: CalendarLegendItemProps) {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2

        text-[9px]
        font-semibold
        uppercase

        tracking-[0.11em]

        text-text-muted
      "
    >
      {swatchClassName && (
        <span
          aria-hidden="true"
          className={`
            size-3

            rounded-[3px]

            border

            ${swatchClassName}
          `}
        />
      )}

      {dotClassName && (
        <span
          aria-hidden="true"
          className={`
            size-1.5
            rounded-full

            ${dotClassName}
          `}
        />
      )}

      {label}
    </div>
  )
}