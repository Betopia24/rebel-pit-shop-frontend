import {
  SCHEDULE_TIME_ZONE,
} from "../types"

/* =========================================================
   DATE UTILITIES

   Date-only values use:
   YYYY-MM-DD

   This avoids browser/server timezone drift for schedule
   navigation.

   Schedule timezone:
   America/Chicago
========================================================= */

export function getCurrentScheduleDate(): string {
  const formatter =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          SCHEDULE_TIME_ZONE,

        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    )

  const parts =
    formatter.formatToParts(
      new Date()
    )

  const year =
    parts.find(
      (part) =>
        part.type === "year"
    )?.value

  const month =
    parts.find(
      (part) =>
        part.type === "month"
    )?.value

  const day =
    parts.find(
      (part) =>
        part.type === "day"
    )?.value

  if (
    !year ||
    !month ||
    !day
  ) {
    throw new Error(
      "Unable to determine schedule date."
    )
  }

  return `${year}-${month}-${day}`
}

export function getMondayDate(
  dateIso: string
): string {
  const date =
    isoToUtcDate(dateIso)

  const weekday =
    date.getUTCDay()

  const offset =
    weekday === 0
      ? -6
      : 1 - weekday

  return addDays(
    dateIso,
    offset
  )
}

export function addDays(
  dateIso: string,
  amount: number
): string {
  const date =
    isoToUtcDate(dateIso)

  date.setUTCDate(
    date.getUTCDate() +
      amount
  )

  return dateToIso(date)
}

export function formatScheduleDay(
  dateIso: string
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "UTC",

      weekday: "short",
      month: "short",
      day: "numeric",
    }
  ).format(
    isoToUtcDate(dateIso)
  )
}

export function formatScheduleDayLong(
  dateIso: string
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "UTC",

      weekday: "long",
      month: "long",
      day: "numeric",
    }
  ).format(
    isoToUtcDate(dateIso)
  )
}

export function formatWeekRange(
  startDate: string,
  endDate: string
) {
  const start =
    isoToUtcDate(startDate)

  const end =
    isoToUtcDate(endDate)

  const sameMonth =
    start.getUTCMonth() ===
      end.getUTCMonth() &&
    start.getUTCFullYear() ===
      end.getUTCFullYear()

  if (sameMonth) {
    const month =
      start.toLocaleDateString(
        "en-US",
        {
          timeZone: "UTC",
          month: "short",
        }
      )

    return `${month.toUpperCase()} ${start.getUTCDate()} — ${end.getUTCDate()}, ${end.getUTCFullYear()}`
  }

  const startLabel =
    start.toLocaleDateString(
      "en-US",
      {
        timeZone: "UTC",

        month: "short",
        day: "numeric",
      }
    )

  const endLabel =
    end.toLocaleDateString(
      "en-US",
      {
        timeZone: "UTC",

        month: "short",
        day: "numeric",
        year: "numeric",
      }
    )

  return `${startLabel.toUpperCase()} — ${endLabel.toUpperCase()}`
}

export function formatTime(
  time: string
): string {
  const [
    hourValue,
    minuteValue,
  ] =
    time.split(":")

  const hour =
    Number(hourValue)

  const displayHour =
    hour % 12 || 12

  const meridiem =
    hour >= 12
      ? "PM"
      : "AM"

  return `${displayHour}:${minuteValue} ${meridiem}`
}

export function dateToDayNumber(
  dateIso: string
) {
  return isoToUtcDate(
    dateIso
  ).getUTCDate()
}

export function dateToWeekdayShort(
  dateIso: string
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "UTC",
      weekday: "short",
    }
  )
    .format(
      isoToUtcDate(dateIso)
    )
    .toUpperCase()
}

function isoToUtcDate(
  value: string
) {
  return new Date(
    `${value}T12:00:00.000Z`
  )
}

function dateToIso(
  date: Date
) {
  return date
    .toISOString()
    .slice(0, 10)
}