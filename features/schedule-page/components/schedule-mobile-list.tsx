"use client"

import {
  CalendarDays,
} from "lucide-react"

import type {
  ScheduleClass,
  ScheduleDay,
} from "../types"

import {
  formatScheduleDayLong,
} from "../utils/date"

import {
  ScheduleClassCard,
} from "./schedule-class-card"

type ScheduleMobileListProps = {
  day: ScheduleDay

  onBook: (
    scheduleClass: ScheduleClass
  ) => void
}

export function ScheduleMobileList({
  day,
  onBook,
}: ScheduleMobileListProps) {
  return (
    <div
      className="
        mt-7

        xl:hidden
      "
    >
      <div
        className="
          mb-5

          flex
          items-end
          justify-between

          gap-5
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase

              tracking-[0.2em]

              text-primary
            "
          >
            Selected Day
          </p>

          <h3
            className="
              mt-1

              font-heading
              text-2xl
              font-black
              uppercase

              tracking-[-0.03em]

              text-foreground

              sm:text-3xl
            "
          >
            {
              formatScheduleDayLong(
                day.date
              )
            }
          </h3>
        </div>

        <span
          className="
            shrink-0

            text-[10px]
            font-bold
            uppercase

            tracking-[0.12em]

            text-text-muted
          "
        >
          {
            day.classes.length
          }{" "}
          {day.classes.length ===
          1
            ? "Class"
            : "Classes"}
        </span>
      </div>

      {day.classes.length >
      0 ? (
        <div
          className="
            grid
            grid-cols-1

            gap-3

            md:grid-cols-2
          "
        >
          {day.classes.map(
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
                onBook={
                  onBook
                }
              />
            )
          )}
        </div>
      ) : (
        <div
          className="
            rounded-xl

            border
            border-foreground/10

            bg-surface-dark

            px-6
            py-12

            text-center
          "
        >
          <CalendarDays
            aria-hidden={true}
            className="
              mx-auto
              size-6

              text-primary
            "
          />

          <h3
            className="
              mt-4

              font-heading
              text-xl
              font-black
              uppercase

              text-foreground
            "
          >
            No Classes Found
          </h3>

          <p
            className="
              mx-auto
              mt-2
              max-w-sm

              text-sm
              leading-6

              text-text-secondary
            "
          >
            Try changing your
            class, coach, or
            duration filters.
          </p>
        </div>
      )}
    </div>
  )
}