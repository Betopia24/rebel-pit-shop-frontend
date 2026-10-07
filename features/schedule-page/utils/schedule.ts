import type {
  ScheduleAvailability,
  ScheduleClass,
  ScheduleFilters,
  ScheduleWeek,
} from "../types"

import {
  addDays,
} from "./date"

export function getSpotsLeft(
  scheduleClass: ScheduleClass
) {
  return Math.max(
    0,
    scheduleClass.capacity -
      scheduleClass.bookedCount
  )
}

export function getAvailability(
  capacity: number,
  bookedCount: number
): ScheduleAvailability {
  const spots =
    capacity -
    bookedCount

  if (spots <= 0) {
    return "full"
  }

  if (spots <= 3) {
    return "limited"
  }

  return "available"
}

export function filterScheduleWeek(
  week: ScheduleWeek,
  filters: ScheduleFilters
): ScheduleWeek {
  return {
    ...week,

    days: week.days.map(
      (day) => ({
        ...day,

        classes:
          day.classes.filter(
            (scheduleClass) => {
              if (
                filters.classType !==
                  "all" &&
                scheduleClass.type !==
                  filters.classType
              ) {
                return false
              }

              if (
                filters.coachId !==
                  "all" &&
                scheduleClass.coach
                  ?.id !==
                  filters.coachId
              ) {
                return false
              }

              if (
                filters.duration !==
                  "all" &&
                scheduleClass.durationMinutes !==
                  Number(
                    filters.duration
                  )
              ) {
                return false
              }

              return true
            }
          ),
      })
    ),
  }
}

export function shiftScheduleWeek(
  week: ScheduleWeek,
  amountInDays: number
): ScheduleWeek {
  return {
    ...week,

    startDate: addDays(
      week.startDate,
      amountInDays
    ),

    endDate: addDays(
      week.endDate,
      amountInDays
    ),

    days: week.days.map(
      (day) => {
        const newDate =
          addDays(
            day.date,
            amountInDays
          )

        return {
          date: newDate,

          classes:
            day.classes.map(
              (
                scheduleClass
              ) => ({
                ...scheduleClass,

                id: `${scheduleClass.id}-${newDate}`,

                date: newDate,
              })
            ),
        }
      }
    ),
  }
}

export function getTotalClasses(
  week: ScheduleWeek
) {
  return week.days.reduce(
    (total, day) =>
      total +
      day.classes.length,
    0
  )
}