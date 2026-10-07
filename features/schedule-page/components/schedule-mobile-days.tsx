"use client"

import type {
  ScheduleDay,
} from "../types"

import {
  dateToDayNumber,
  dateToWeekdayShort,
  formatScheduleDayLong,
  getCurrentScheduleDate,
} from "../utils/date"

type ScheduleMobileDaysProps = {
  days: ScheduleDay[]

  selectedDate: string

  onSelect: (
    date: string
  ) => void
}

export function ScheduleMobileDays({
  days,
  selectedDate,
  onSelect,
}: ScheduleMobileDaysProps) {
  const today =
    getCurrentScheduleDate()

  return (
    <div
      className="
        xl:hidden

        -mx-5

        overflow-x-auto

        px-5
        pb-1

        [scrollbar-width:none]

        [&::-webkit-scrollbar]:hidden

        sm:-mx-7
        sm:px-7

        md:-mx-10
        md:px-10
      "
    >
      <div
        className="
          flex
          min-w-max

          gap-2
        "
      >
        {days.map((day) => {
          const active =
            day.date ===
            selectedDate

          const isToday =
            day.date ===
            today

          const weekday =
            dateToWeekdayShort(
              day.date
            )

          const isWeekend =
            weekday === "SAT" ||
            weekday === "SUN"

          const hasClasses =
            day.classes.length >
            0

          const classLabel =
            day.classes.length ===
            1
              ? "1 class"
              : `${day.classes.length} classes`

          return (
            <button
              key={day.date}
              type="button"
              aria-label={`${formatScheduleDayLong(day.date)}, ${classLabel}`}
              aria-pressed={
                active
              }
              aria-current={
                isToday
                  ? "date"
                  : undefined
              }
              onClick={() =>
                onSelect(
                  day.date
                )
              }
              className={`
                group
                relative
                isolate

                flex
                min-h-25
                w-20
                shrink-0

                flex-col
                items-center
                justify-center

                overflow-hidden

                rounded-xl

                border

                px-2
                py-3

                text-center

                outline-none

                transition-[background-color,border-color,color,box-shadow]
                duration-200

                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                ${
                  active
                    ? `
                      border-primary
                      bg-primary
                      text-primary-foreground

                      shadow-(--shadow-gold-sm)
                    `
                    : isToday
                      ? `
                        border-primary/60
                        bg-primary/8
                        text-primary

                        shadow-(--shadow-gold-xs)
                      `
                      : isWeekend
                        ? `
                          border-foreground/12
                          bg-surface-raised/65
                          text-foreground

                          hover:border-primary/30
                          hover:bg-surface-raised
                        `
                        : `
                          border-foreground/10
                          bg-surface-dark
                          text-foreground

                          hover:border-primary/30
                          hover:bg-surface-card
                        `
                }

                ${
                  !hasClasses &&
                  !active
                    ? "opacity-55"
                    : ""
                }
              `}
            >
              {/* =================================================
                  ACTIVE / TODAY TOP ACCENT
              ================================================== */}

              {(active ||
                isToday) && (
                <span
                  aria-hidden="true"
                  className={`
                    absolute
                    inset-x-0
                    top-0
                    z-10

                    h-0.5

                    ${
                      active
                        ? "bg-primary-foreground/80"
                        : "bg-primary"
                    }
                  `}
                />
              )}

              {/* =================================================
                  BACKGROUND DETAIL
              ================================================== */}

              {active && (
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    inset-0
                    z-0

                    bg-[radial-gradient(circle_at_50%_0%,var(--foreground-10),transparent_55%)]
                  "
                />
              )}

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  z-10

                  flex
                  w-full
                  flex-col

                  items-center
                  justify-center
                "
              >
                {/* WEEKDAY */}

                <span
                  className={`
                    text-[8px]
                    font-black
                    uppercase

                    tracking-[0.16em]

                    ${
                      active
                        ? "text-primary-foreground/75"
                        : isToday
                          ? "text-primary"
                          : "text-text-muted"
                    }
                  `}
                >
                  {weekday}
                </span>

                {/* DATE */}

                <span
                  className={`
                    mt-1

                    font-heading
                    text-2xl
                    font-black

                    leading-none
                    tracking-tight

                    ${
                      active
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }
                  `}
                >
                  {dateToDayNumber(
                    day.date
                  )}
                </span>

                {/* CLASS COUNT */}

                <span
                  className={`
                    mt-2

                    whitespace-nowrap

                    text-[7px]
                    font-bold
                    uppercase

                    tracking-[0.08em]

                    ${
                      active
                        ? "text-primary-foreground/65"
                        : hasClasses
                          ? "text-text-secondary"
                          : "text-text-faint"
                    }
                  `}
                >
                  {hasClasses
                    ? classLabel
                    : "No classes"}
                </span>

                {/* TODAY BADGE */}

                {isToday && (
                  <span
                    className={`
                      mt-2

                      rounded-full

                      px-2
                      py-0.5

                      text-[6px]
                      font-black
                      uppercase

                      tracking-[0.12em]

                      ${
                        active
                          ? `
                            bg-primary-foreground
                            text-primary
                          `
                          : `
                            bg-primary
                            text-primary-foreground
                          `
                      }
                    `}
                  >
                    Today
                  </span>
                )}
              </div>

              {/* =================================================
                  SELECTED INDICATOR

                  Makes selection obvious even when quickly
                  scrolling through the dates.
              ================================================== */}

              {active && (
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    z-20

                    h-0.75
                    w-8

                    -translate-x-1/2

                    rounded-t-full

                    bg-primary-foreground
                  "
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}