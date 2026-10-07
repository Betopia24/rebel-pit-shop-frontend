"use client"

import * as React from "react"

import type {
  ScheduleClass,
  ScheduleFilters,
  ScheduleWeek,
} from "../types"

import {
  getCurrentScheduleDate,
} from "../utils/date"

import {
  filterScheduleWeek,
  shiftScheduleWeek,
} from "../utils/schedule"

import {
  ScheduleBookingSheet,
} from "./schedule-booking-sheet"

import {
  ScheduleMobileDays,
} from "./schedule-mobile-days"

import {
  ScheduleMobileList,
} from "./schedule-mobile-list"

import {
  ScheduleToolbar,
} from "./schedule-toolbar"

import {
  ScheduleWeekBoard,
} from "./schedule-week-board"

type ScheduleExplorerProps = {
  initialWeek: ScheduleWeek
}

const defaultFilters: ScheduleFilters =
  {
    classType: "all",
    coachId: "all",
    duration: "all",
  }

export function ScheduleExplorer({
  initialWeek,
}: ScheduleExplorerProps) {
  const [
    week,
    setWeek,
  ] =
    React.useState<ScheduleWeek>(
      initialWeek
    )

  const [
    filters,
    setFilters,
  ] =
    React.useState<ScheduleFilters>(
      defaultFilters
    )

  const [
    selectedDate,
    setSelectedDate,
  ] =
    React.useState(() => {
      const today =
        getCurrentScheduleDate()

      const exists =
        initialWeek.days.some(
          (day) =>
            day.date ===
            today
        )

      return exists
        ? today
        : initialWeek.days[0]
            .date
    })

  const [
    selectedClass,
    setSelectedClass,
  ] =
    React.useState<ScheduleClass | null>(
      null
    )

  const [
    bookingOpen,
    setBookingOpen,
  ] =
    React.useState(false)

  const filteredWeek =
    React.useMemo(
      () =>
        filterScheduleWeek(
          week,
          filters
        ),
      [week, filters]
    )

  const selectedDay =
    React.useMemo(
      () =>
        filteredWeek.days.find(
          (day) =>
            day.date ===
            selectedDate
        ) ??
        filteredWeek.days[0],
      [
        filteredWeek,
        selectedDate,
      ]
    )

  function changeWeek(
    amount: number
  ) {
    const newWeek =
      shiftScheduleWeek(
        week,
        amount
      )

    setWeek(newWeek)

    setSelectedDate(
      newWeek.days[0].date
    )
  }

  function goToday() {
    setWeek(
      initialWeek
    )

    const today =
      getCurrentScheduleDate()

    const todayExists =
      initialWeek.days.some(
        (day) =>
          day.date === today
      )

    setSelectedDate(
      todayExists
        ? today
        : initialWeek.days[0]
            .date
    )
  }

  function handleBook(
    scheduleClass: ScheduleClass
  ) {
    setSelectedClass(
      scheduleClass
    )

    setBookingOpen(
      true
    )
  }

  return (
    <>
      {/* =====================================================
          TOOLBAR
      ====================================================== */}

      <ScheduleToolbar
        week={week}
        filters={filters}
        onFiltersChange={
          setFilters
        }
        onPreviousWeek={() =>
          changeWeek(-7)
        }
        onNextWeek={() =>
          changeWeek(7)
        }
        onToday={
          goToday
        }
      />

      {/* =====================================================
          SCHEDULE
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]

          px-5
          py-8

          sm:px-7
          sm:py-10

          md:px-10

          lg:px-14
          lg:py-12

          xl:px-20
        "
      >
        {/* MOBILE / TABLET */}

        <ScheduleMobileDays
          days={
            filteredWeek.days
          }
          selectedDate={
            selectedDate
          }
          onSelect={
            setSelectedDate
          }
        />

        <ScheduleMobileList
          day={
            selectedDay
          }
          onBook={
            handleBook
          }
        />

        {/* LARGE DESKTOP */}

        <ScheduleWeekBoard
          week={
            filteredWeek
          }
          onBook={
            handleBook
          }
        />

        {/* QUIET FOOTER */}

        <div
          className="
            mt-7

            flex
            flex-col

            gap-2

            border-t
            border-foreground/10

            pt-5

            text-[9px]
            font-semibold
            uppercase

            tracking-[0.13em]

            text-text-muted

            sm:flex-row
            sm:items-center
            sm:justify-between

            sm:text-[10px]
          "
        >
          <span>
            Select a class to
            reserve your spot.
          </span>

          <span>
            Schedule subject to
            availability.
          </span>
        </div>
      </div>

      {/* =====================================================
          BOOKING
      ====================================================== */}

      <ScheduleBookingSheet
        scheduleClass={
          selectedClass
        }
        open={
          bookingOpen
        }
        onOpenChange={
          setBookingOpen
        }
      />
    </>
  )
}