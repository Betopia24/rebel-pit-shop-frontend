"use client"

import type {
  ScheduleDay,
} from "../types"

import {
  dateToDayNumber,
  dateToWeekdayShort,
} from "../utils/date"

type ScheduleDayHeaderProps = {
  day: ScheduleDay

  today: boolean
}

export function ScheduleDayHeader({
  day,
  today,
}: ScheduleDayHeaderProps) {
  const weekday =
    dateToWeekdayShort(
      day.date
    )

  const weekend =
    weekday === "SAT" ||
    weekday === "SUN"

  return (
    <header
      className={`
        relative
        isolate

        min-h-24

        overflow-hidden

        rounded-xl

        border

        px-4
        py-4

        ${
          today
            ? `
              border-primary
              bg-primary
              text-primary-foreground
              shadow-(--shadow-gold-sm)
            `
            : weekend
              ? `
                border-foreground/12
                bg-surface-raised/70
                text-foreground
              `
              : `
                border-foreground/10
                bg-surface-card
                text-foreground
              `
        }
      `}
    >
      {/* ===============================================
          SUBTLE TODAY GLOW
      ================================================ */}

      {today && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0
            z-0

            bg-[radial-gradient(circle_at_100%_0%,var(--foreground-10),transparent_50%)]
          "
        />
      )}

      <div
        className="
          relative
          z-10

          flex
          h-full
          items-center
          justify-between

          gap-3
        "
      >
        <div>
          <div
            className="
              flex
              items-center

              gap-2
            "
          >
            <p
              className={`
                text-[9px]
                font-bold
                uppercase

                tracking-[0.18em]

                ${
                  today
                    ? "text-primary-foreground/75"
                    : weekend
                      ? "text-text-secondary"
                      : "text-text-muted"
                }
              `}
            >
              {weekday}
            </p>

            {weekend &&
              !today && (
                <span
                  className="
                    text-[7px]
                    font-bold
                    uppercase

                    tracking-[0.12em]

                    text-text-faint
                  "
                >
                  Weekend
                </span>
              )}
          </div>

          <p
            className="
              mt-1

              font-heading
              text-4xl
              font-black

              leading-none
              tracking-[-0.04em]
            "
          >
            {dateToDayNumber(
              day.date
            )}
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            items-end

            gap-2
          "
        >
          {today && (
            <span
              className="
                rounded-full

                bg-primary-foreground

                px-2.5
                py-1

                text-[7px]
                font-black
                uppercase

                tracking-[0.15em]

                text-primary
              "
            >
              Today
            </span>
          )}

          <span
            className={`
              text-[8px]
              font-semibold

              ${
                today
                  ? "text-primary-foreground/70"
                  : "text-text-muted"
              }
            `}
          >
            {day.classes.length}{" "}
            {day.classes.length ===
            1
              ? "class"
              : "classes"}
          </span>
        </div>
      </div>
    </header>
  )
}