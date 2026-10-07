import {
  mockScheduleTemplates,
} from "../data/mock-schedule"

import type {
  ScheduleClass,
  ScheduleDay,
  ScheduleWeek,
} from "../types"

import {
  SCHEDULE_TIME_ZONE,
} from "../types"

import {
  addDays,
  getCurrentScheduleDate,
  getMondayDate,
} from "../utils/date"

import {
  getAvailability,
} from "../utils/schedule"

type GetScheduleWeekOptions = {
  weekStart?: string
}

export async function getScheduleWeek(
  options: GetScheduleWeekOptions = {}
): Promise<ScheduleWeek> {
  /*
   * Future API implementation:
   *
   * return fetch(
   *   `/api/schedule?weekStart=${weekStart}`,
   *   { cache: "no-store" }
   * ).then((response) => response.json())
   */

  const currentDate =
    options.weekStart ??
    getCurrentScheduleDate()

  const monday =
    getMondayDate(
      currentDate
    )

  const days: ScheduleDay[] =
    Array.from(
      { length: 7 },
      (_, weekday) => {
        const date =
          addDays(
            monday,
            weekday
          )

        const classes:
          ScheduleClass[] =
          mockScheduleTemplates
            .filter(
              (template) =>
                template.weekday ===
                weekday
            )
            .map(
              (template) => ({
                id: `${template.id}-${date}`,

                title:
                  template.title,

                type:
                  template.type,

                coach:
                  template.coach,

                date,

                startTime:
                  template.startTime,

                endTime:
                  template.endTime,

                durationMinutes:
                  template.durationMinutes,

                capacity:
                  template.capacity,

                bookedCount:
                  template.bookedCount,

                availability:
                  getAvailability(
                    template.capacity,
                    template.bookedCount
                  ),

                bookingEnabled:
                  template.bookingEnabled,
              })
            )
            .sort(
              (a, b) =>
                a.startTime.localeCompare(
                  b.startTime
                )
            )

        return {
          date,
          classes,
        }
      }
    )

  return {
    startDate:
      days[0].date,

    endDate:
      days[
        days.length - 1
      ].date,

    timeZone:
      SCHEDULE_TIME_ZONE,

    days,
  }
}