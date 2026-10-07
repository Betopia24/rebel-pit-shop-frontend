"use client"

import {
  ArrowUpRight,
  Clock3,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import type {
  ScheduleClass,
} from "../types"

import {
  formatTime,
} from "../utils/date"

import {
  getSpotsLeft,
} from "../utils/schedule"

type ScheduleClassCardProps = {
  scheduleClass: ScheduleClass

  compact?: boolean

  onBook: (
    scheduleClass: ScheduleClass
  ) => void
}

export function ScheduleClassCard({
  scheduleClass,
  compact = false,
  onBook,
}: ScheduleClassCardProps) {
  const spotsLeft =
    getSpotsLeft(
      scheduleClass
    )

  const isFull =
    scheduleClass.availability ===
    "full"

  const isLimited =
    scheduleClass.availability ===
    "limited"

  const isOpenGym =
    scheduleClass.type ===
    "open-gym"

  return (
    <article
      className={`
        group
        relative
        isolate

        overflow-hidden

        rounded-lg

        border

        bg-surface

        transition-[background-color,border-color]
        duration-200

        ${
          isLimited
            ? "border-primary/30"
            : "border-foreground/10"
        }

        hover:border-primary/35
        hover:bg-surface-card

        ${
          compact
            ? "p-3.5"
            : "p-4 sm:p-5"
        }
      `}
    >
      {/* LIMITED AVAILABILITY ACCENT */}

      {isLimited && (
        <span
          aria-hidden="true"
          className="
            absolute
            inset-y-0
            left-0
            z-20

            w-0.5

            bg-primary
          "
        />
      )}

      {/* HOVER ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
          z-0

          bg-[radial-gradient(circle_at_100%_0%,var(--gold-05),transparent_45%)]

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      <div className="relative z-10">
        {/* =================================================
            TIME + DURATION
        ================================================== */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-3
          "
        >
          <p
            className="
              text-[9px]
              font-bold
              uppercase

              tracking-[0.16em]

              text-primary
            "
          >
            {formatTime(
              scheduleClass.startTime
            )}
          </p>

          <span
            className="
              shrink-0

              whitespace-nowrap

              text-[8px]
              font-semibold
              uppercase

              tracking-[0.11em]

              text-text-muted
            "
          >
            {
              scheduleClass.durationMinutes
            }{" "}
            min
          </span>
        </div>

        {/* =================================================
            CLASS NAME
        ================================================== */}

        <h4
          className={`
            mt-2

            font-heading
            font-black
            uppercase

            leading-[1.02]
            tracking-[-0.025em]

            text-foreground

            ${
              compact
                ? "text-[15px]"
                : "text-lg"
            }
          `}
        >
          {scheduleClass.title}
        </h4>

        {/* =================================================
            COACH / OPEN GYM
        ================================================== */}

        {!isOpenGym &&
          scheduleClass.coach && (
            <div
              className="
                mt-3

                flex
                items-center

                gap-1.5

                text-[10px]

                text-text-secondary
              "
            >
              <UserRound
                aria-hidden={true}
                strokeWidth={1.6}
                className="
                  size-3.5
                  shrink-0
                "
              />

              <span className="truncate">
                with{" "}
                {
                  scheduleClass
                    .coach.name
                }
              </span>
            </div>
          )}

        {isOpenGym && (
          <div
            className="
              mt-3

              flex
              items-center

              gap-1.5

              text-[10px]

              text-text-secondary
            "
          >
            <Clock3
              aria-hidden={true}
              strokeWidth={1.6}
              className="
                size-3.5
                shrink-0
              "
            />

            <span>
              Open gym access
            </span>
          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================== */}

        <div
          className="
            mt-5

            flex
            items-center
            justify-between

            gap-2
          "
        >
          {!isOpenGym ? (
            <Availability
              full={isFull}
              limited={
                isLimited
              }
              spotsLeft={
                spotsLeft
              }
            />
          ) : (
            <span
              className="
                whitespace-nowrap

                text-[8px]
                font-bold
                uppercase

                tracking-[0.1em]

                text-text-muted
              "
            >
              No booking needed
            </span>
          )}

          {scheduleClass.bookingEnabled && (
            <Button
              type="button"
              size="sm"
              disabled={isFull}
              onClick={() =>
                onBook(
                  scheduleClass
                )
              }
              className={`
                group/book

                min-h-8
                shrink-0

                px-3

                text-[8px]
                font-bold
                uppercase

                tracking-[0.08em]

                transition-[background-color,border-color,color,opacity]
                duration-200

                ${
                  isFull
                    ? `
                      border
                      border-foreground/10
                      bg-transparent
                      text-text-muted
                    `
                    : isLimited
                      ? `
                        border
                        border-primary
                        bg-primary
                        text-primary-foreground

                        hover:bg-gold-hover
                      `
                      : `
                        border
                        border-primary/35
                        bg-primary/8
                        text-primary

                        hover:border-primary
                        hover:bg-primary
                        hover:text-primary-foreground
                      `
                }
              `}
            >
              {isFull
                ? "Full"
                : "Book"}

              {!isFull && (
                <ArrowUpRight
                  aria-hidden={
                    true
                  }
                  className="
                    size-3

                    transition-transform
                    duration-200

                    group-hover/book:translate-x-0.5
                    group-hover/book:-translate-y-0.5
                  "
                />
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

/* =========================================================
   AVAILABILITY
========================================================= */

function Availability({
  full,
  limited,
  spotsLeft,
}: {
  full: boolean
  limited: boolean
  spotsLeft: number
}) {
  if (full) {
    return (
      <span
        className="
          inline-flex
          shrink-0
          items-center

          gap-1.5

          whitespace-nowrap

          text-[8px]
          font-semibold

          text-destructive
        "
      >
        <span
          aria-hidden="true"
          className="
            size-1.5
            shrink-0
            rounded-full

            bg-destructive
          "
        />

        Class full
      </span>
    )
  }

  return (
    <span
      className={`
        inline-flex
        shrink-0
        items-center

        gap-1.5

        whitespace-nowrap

        text-[8px]
        font-semibold

        ${
          limited
            ? "text-primary"
            : "text-text-muted"
        }
      `}
    >
      <span
        aria-hidden="true"
        className={`
          size-1.5
          shrink-0
          rounded-full

          ${
            limited
              ? "bg-primary"
              : "bg-foreground/45"
          }
        `}
      />

      {spotsLeft}{" "}
      {spotsLeft === 1
        ? "spot left"
        : "spots left"}
    </span>
  )
}