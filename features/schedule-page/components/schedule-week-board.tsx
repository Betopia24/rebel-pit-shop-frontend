"use client"

import type {
  ScheduleClass,
  ScheduleWeek,
} from "../types"

import {
  getCurrentScheduleDate,
} from "../utils/date"

import {
  ScheduleDayColumn,
} from "./schedule-day-column"

import {
  ScheduleDayHeader,
} from "./schedule-day-header"

type ScheduleWeekBoardProps = {
  week: ScheduleWeek

  onBook: (
    scheduleClass: ScheduleClass
  ) => void
}

export function ScheduleWeekBoard({
  week,
  onBook,
}: ScheduleWeekBoardProps) {
  const today =
    getCurrentScheduleDate()

  return (
    <div
      className="
        hidden
        xl:block
      "
    >
      {/* =====================================================
          WEEK DAY HEADER ROW

          Separate from class columns so the calendar dates
          remain clear and never get hidden by toolbar content.
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-7

          gap-3
        "
      >
        {week.days.map(
          (day) => (
            <ScheduleDayHeader
              key={day.date}
              day={day}
              today={
                day.date ===
                today
              }
            />
          )
        )}
      </div>

      {/* =====================================================
          CLASS COLUMNS
      ====================================================== */}

      <div
        className="
          mt-3

          grid
          grid-cols-7

          items-start

          gap-3
        "
      >
        {week.days.map(
          (day) => (
            <ScheduleDayColumn
              key={day.date}
              day={day}
              today={
                day.date ===
                today
              }
              onBook={
                onBook
              }
            />
          )
        )}
      </div>
    </div>
  )
}