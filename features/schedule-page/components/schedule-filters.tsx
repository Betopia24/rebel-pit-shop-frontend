"use client"

import type {
  ScheduleClassType,
  ScheduleFilters,
  ScheduleWeek,
} from "../types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

type ScheduleFiltersProps = {
  week: ScheduleWeek

  filters: ScheduleFilters

  onChange: (
    filters: ScheduleFilters
  ) => void
}

const classLabels: Record<
  ScheduleFilters["classType"],
  string
> = {
  all: "All Classes",

  boxing: "Boxing Fitness",

  kickboxing: "Kickboxing",

  conditioning: "Conditioning",

  strength: "Strength & Boxing",

  "open-gym": "Open Gym",
}

export function ScheduleFiltersControl({
  week,
  filters,
  onChange,
}: ScheduleFiltersProps) {
  const coaches =
    Array.from(
      new Map(
        week.days
          .flatMap(
            (day) =>
              day.classes
          )
          .filter(
            (
              scheduleClass
            ) =>
              scheduleClass.coach
          )
          .map(
            (
              scheduleClass
            ) => [
              scheduleClass.coach!
                .id,
              scheduleClass.coach!,
            ]
          )
      ).values()
    ).sort(
      (a, b) =>
        a.name.localeCompare(
          b.name
        )
    )

  const coachLabel =
    filters.coachId === "all"
      ? "All Coaches"
      : coaches.find(
          (coach) =>
            coach.id ===
            filters.coachId
        )?.name ??
        "All Coaches"

  const durationLabel =
    filters.duration === "all"
      ? "Any Duration"
      : `${filters.duration} Minutes`

  return (
    <div
      className="
        grid
        grid-cols-1

        gap-2.5

        sm:grid-cols-3
      "
    >
      {/* =====================================================
          CLASS
      ====================================================== */}

      <Select
        value={
          filters.classType
        }
        onValueChange={(
          value
        ) =>
          onChange({
            ...filters,

            classType:
              (value ??
                "all") as
                | "all"
                | ScheduleClassType,
          })
        }
      >
        <SelectTrigger
          className="
            w-full

            border-foreground/15

            bg-surface

            text-xs
            font-medium

            text-foreground

            hover:border-primary/30
          "
        >
          <span className="truncate">
            {
              classLabels[
                filters.classType
              ]
            }
          </span>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Classes
          </SelectItem>

          <SelectItem value="boxing">
            Boxing Fitness
          </SelectItem>

          <SelectItem value="kickboxing">
            Kickboxing
          </SelectItem>

          <SelectItem value="conditioning">
            Conditioning
          </SelectItem>

          <SelectItem value="strength">
            Strength & Boxing
          </SelectItem>

          <SelectItem value="open-gym">
            Open Gym
          </SelectItem>
        </SelectContent>
      </Select>

      {/* =====================================================
          COACH
      ====================================================== */}

      <Select
        value={
          filters.coachId
        }
        onValueChange={(
          value
        ) =>
          onChange({
            ...filters,

            coachId:
              value ??
              "all",
          })
        }
      >
        <SelectTrigger
          className="
            w-full

            border-foreground/15

            bg-surface

            text-xs
            font-medium

            text-foreground

            hover:border-primary/30
          "
        >
          <span className="truncate">
            {coachLabel}
          </span>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            All Coaches
          </SelectItem>

          {coaches.map(
            (coach) => (
              <SelectItem
                key={coach.id}
                value={coach.id}
              >
                {coach.name}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>

      {/* =====================================================
          DURATION
      ====================================================== */}

      <Select
        value={
          filters.duration
        }
        onValueChange={(
          value
        ) =>
          onChange({
            ...filters,

            duration:
              value ??
              "all",
          })
        }
      >
        <SelectTrigger
          className="
            w-full

            border-foreground/15

            bg-surface

            text-xs
            font-medium

            text-foreground

            hover:border-primary/30
          "
        >
          <span className="truncate">
            {durationLabel}
          </span>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            Any Duration
          </SelectItem>

          <SelectItem value="30">
            30 Minutes
          </SelectItem>

          <SelectItem value="60">
            60 Minutes
          </SelectItem>

          <SelectItem value="75">
            75 Minutes
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}