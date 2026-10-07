"use client"

import type {
  ScheduleClass,
  ScheduleDay,
} from "../types"

import {
  ScheduleClassCard,
} from "./schedule-class-card"

type ScheduleDayColumnProps = {
  day: ScheduleDay

  today: boolean

  onBook: (
    scheduleClass: ScheduleClass
  ) => void
}

export function ScheduleDayColumn({
  day,
  today,
  onBook,
}: ScheduleDayColumnProps) {
  return (
    <article
      className={`
        relative
        isolate

        overflow-hidden

        rounded-xl

        border

        ${
          today
            ? `
              border-primary/35
              bg-primary/5
            `
            : `
              border-foreground/8
              bg-surface-deep
            `
        }
      `}
    >
      {/* TODAY COLUMN ACCENT */}

      {today && (
        <span
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            top-0
            z-10

            h-px

            bg-primary
          "
        />
      )}

      {/* SUBTLE TODAY BACKGROUND */}

      {today && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0
            z-0

            bg-[linear-gradient(to_bottom,var(--gold-06),transparent_45%)]
          "
        />
      )}

      <div
        className="
          relative
          z-10

          space-y-3

          p-2.5
        "
      >
        {day.classes.length >
        0 ? (
          day.classes.map(
            (
              scheduleClass
            ) => (
              <ScheduleClassCard
                key={
                  scheduleClass.id
                }
                scheduleClass={
                  scheduleClass
                }
                compact
                onBook={
                  onBook
                }
              />
            )
          )
        ) : (
          <div
            className="
              flex
              min-h-28

              items-center
              justify-center

              px-4

              text-center

              text-[9px]
              font-medium

              leading-5

              text-text-muted
            "
          >
            No classes match
            your filters.
          </div>
        )}
      </div>
    </article>
  )
}