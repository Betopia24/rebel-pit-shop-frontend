"use client"

import { useMemo, useState } from "react"
import type { DateRange } from "react-day-picker"

import { CalendarDays, Check, RotateCcw, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"

import { BOOKING_STATUS_OPTIONS } from "../../config/booking-status.config"

import { BOOKING_SOURCE_CONFIG } from "../shared/booking-source-icon"

import type {
  BookingClass,
  BookingCoach,
  BookingFilters,
  BookingISODate,
  BookingSource,
  BookingStatus,
} from "../../types/booking.types"

import { DEFAULT_BOOKING_FILTERS } from "../../types/booking.types"

export interface BookingFiltersProps {
  value: BookingFilters
  onChange: (next: BookingFilters) => void
  classes: readonly BookingClass[]
  coaches: readonly BookingCoach[]
  disabled?: boolean
  className?: string
}

const ALL_STATUSES = "all"
const ALL_CLASSES = "all"
const ALL_COACHES = "all"
const ALL_SOURCES = "all"

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

function parseISODate(value: BookingISODate | null): Date | undefined {
  if (!value) return undefined

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) return undefined

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])

  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined
  }

  return date
}

function formatISODate(date: Date | undefined): BookingISODate | null {
  if (!date || !Number.isFinite(date.getTime())) {
    return null
  }

  const year = String(date.getFullYear())

  const month = String(date.getMonth() + 1).padStart(2, "0")

  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function formatDateLabel(date: Date): string {
  return DATE_FORMATTER.format(
    new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  )
}

function formatDateRangeLabel(
  from: BookingISODate | null,
  to: BookingISODate | null
): string {
  const fromDate = parseISODate(from)
  const toDate = parseISODate(to)

  if (!fromDate && !toDate) {
    return "Date Range"
  }

  if (fromDate && !toDate) {
    return `From ${formatDateLabel(fromDate)}`
  }

  if (!fromDate && toDate) {
    return `Until ${formatDateLabel(toDate)}`
  }

  return `${formatDateLabel(fromDate!)} – ${formatDateLabel(toDate!)}`
}

function countActiveFilters(filters: BookingFilters): number {
  let count = 0

  if (filters.search.trim()) count++

  if (filters.dateRange.from || filters.dateRange.to) {
    count++
  }

  if (filters.status !== null) count++

  if (filters.classId !== null) count++

  if (filters.coachId !== null) count++

  if (filters.source !== null) count++

  return count
}

function hasActiveFilters(filters: BookingFilters): boolean {
  return countActiveFilters(filters) > 0
}

function FilterTriggerValue({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
      <span className="shrink-0 text-[10px] text-muted-foreground">
        {label}:
      </span>
      <span className="truncate text-[11px] text-foreground">{value}</span>
    </span>
  )
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingFiltersToolbar({
  value,
  onChange,
  classes,
  coaches,
  disabled = false,
  className,
}: BookingFiltersProps) {
  const [dateOpen, setDateOpen] = useState(false)

  const activeCount = useMemo(() => countActiveFilters(value), [value])

  const selectedRange = useMemo<DateRange>(
    () => ({
      from: parseISODate(value.dateRange.from),
      to: parseISODate(value.dateRange.to),
    }),
    [value.dateRange.from, value.dateRange.to]
  )

  const updateFilter = <K extends keyof BookingFilters>(
    key: K,
    nextValue: BookingFilters[K]
  ) => {
    onChange({
      ...value,
      [key]: nextValue,
    })
  }

  const resetFilters = () => {
    onChange({
      ...DEFAULT_BOOKING_FILTERS,
      tab: value.tab,
      dateRange: {
        from: null,
        to: null,
      },
    })

    setDateOpen(false)
  }

  const updateDateRange = (range: DateRange | undefined) => {
    updateFilter("dateRange", {
      from: formatISODate(range?.from),
      to: formatISODate(range?.to),
    })
  }

  const clearDateRange = () => {
    updateFilter("dateRange", {
      from: null,
      to: null,
    })
  }

  const activeFilters = hasActiveFilters(value)

  const statusLabel =
    BOOKING_STATUS_OPTIONS.find((option) => option.value === value.status)
      ?.label ?? "All"
  const classLabel =
    classes.find((bookingClass) => bookingClass.id === value.classId)?.name ??
    "All"
  const coachLabel =
    coaches.find((coach) => coach.id === value.coachId)?.name ?? "All"
  const sourceLabel =
    Object.values(BOOKING_SOURCE_CONFIG).find(
      (source) => source.value === value.source
    )?.label ?? "All"

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3",
        "lg:flex-row lg:items-center",
        "lg:justify-between",
        className
      )}
    >
      {/* ======================================================
          SEARCH
      ====================================================== */}

      <div className="relative w-full min-w-0 lg:max-w-70">
        <Search
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute",
            "top-1/2 left-3 size-4",
            "-translate-y-1/2",
            "text-muted-foreground"
          )}
        />

        <Input
          type="search"
          aria-label="Search bookings"
          placeholder="Search bookings..."
          value={value.search}
          disabled={disabled}
          onChange={(event) => {
            updateFilter("search", event.target.value)
          }}
          className={cn(
            "h-9 w-full rounded-md",
            "border-border bg-background",
            "pr-8 pl-9",
            "text-xs",
            "placeholder:text-muted-foreground"
          )}
        />

        {value.search && !disabled && (
          <button
            type="button"
            aria-label="Clear booking search"
            onClick={() => {
              updateFilter("search", "")
            }}
            className={cn(
              "absolute top-1/2 right-2",
              "flex size-5 -translate-y-1/2",
              "items-center justify-center",
              "rounded-sm text-muted-foreground",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-ring"
            )}
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* ======================================================
          FILTER CONTROLS
      ====================================================== */}

      <div className={cn("flex min-w-0 flex-wrap", "items-center gap-2")}>
        {/* ====================================================
            DATE RANGE
        ==================================================== */}

        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                disabled={disabled}
                className={cn(
                  "h-9 max-w-full gap-2",
                  "rounded-md border-border",
                  "bg-background px-3",
                  "text-[11px] font-medium",
                  "text-muted-foreground",
                  value.dateRange.from && "border-gold/30 text-foreground"
                )}
              />
            }
          >
            <CalendarDays aria-hidden="true" className="size-3.5 shrink-0" />

            <span className="truncate">
              {formatDateRangeLabel(value.dateRange.from, value.dateRange.to)}
            </span>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={6}
            className={cn("w-auto max-w-[calc(100vw-2rem)]", "p-3")}
          >
            <div className="space-y-3">
              <Calendar
                mode="range"
                selected={selectedRange}
                onSelect={updateDateRange}
                numberOfMonths={1}
                disabled={disabled}
              />

              <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearDateRange}
                  disabled={
                    disabled || (!value.dateRange.from && !value.dateRange.to)
                  }
                  className="h-7 text-[11px]"
                >
                  Clear
                </Button>

                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setDateOpen(false)
                  }}
                  className="h-7 gap-1 text-[11px]"
                >
                  <Check className="size-3.5" />
                  Done
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* ====================================================
            STATUS
        ==================================================== */}

        <Select
          value={value.status ?? ALL_STATUSES}
          onValueChange={(next) => {
            updateFilter(
              "status",
              next === ALL_STATUSES ? null : (next as BookingStatus)
            )
          }}
          disabled={disabled}
        >
          <SelectTrigger
            aria-label="Filter by booking status"
            size="sm"
            className={cn(
              "h-9 min-w-30 rounded-md",
              "border-border bg-background",
              "text-[11px]"
            )}
          >
            <FilterTriggerValue label="Status" value={statusLabel} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL_STATUSES}>All Statuses</SelectItem>

            {BOOKING_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ====================================================
            CLASS TYPE
        ==================================================== */}

        <Select
          value={value.classId ?? ALL_CLASSES}
          onValueChange={(next) => {
            updateFilter("classId", next === ALL_CLASSES ? null : next)
          }}
          disabled={disabled}
        >
          <SelectTrigger
            aria-label="Filter by class or service"
            size="sm"
            className={cn(
              "h-9 max-w-48 min-w-35",
              "rounded-md border-border",
              "bg-background text-[11px]"
            )}
          >
            <FilterTriggerValue label="Class" value={classLabel} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL_CLASSES}>All Classes</SelectItem>

            {classes.map((bookingClass) => (
              <SelectItem key={bookingClass.id} value={bookingClass.id}>
                {bookingClass.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ====================================================
            COACH
        ==================================================== */}

        <Select
          value={value.coachId ?? ALL_COACHES}
          onValueChange={(next) => {
            updateFilter("coachId", next === ALL_COACHES ? null : next)
          }}
          disabled={disabled}
        >
          <SelectTrigger
            aria-label="Filter by coach"
            size="sm"
            className={cn(
              "h-9 max-w-42 min-w-28",
              "rounded-md border-border",
              "bg-background text-[11px]"
            )}
          >
            <FilterTriggerValue label="Coach" value={coachLabel} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL_COACHES}>All Coaches</SelectItem>

            {coaches.map((coach) => (
              <SelectItem key={coach.id} value={coach.id}>
                {coach.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ====================================================
            SOURCE
        ==================================================== */}

        <Select
          value={value.source ?? ALL_SOURCES}
          onValueChange={(next) => {
            updateFilter(
              "source",
              next === ALL_SOURCES ? null : (next as BookingSource)
            )
          }}
          disabled={disabled}
        >
          <SelectTrigger
            aria-label="Filter by booking source"
            size="sm"
            className={cn(
              "h-9 max-w-36 min-w-28 rounded-md",
              "border-border bg-background",
              "text-[11px]"
            )}
          >
            <FilterTriggerValue label="Source" value={sourceLabel} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL_SOURCES}>All Sources</SelectItem>

            {Object.values(BOOKING_SOURCE_CONFIG).map((source) => (
              <SelectItem key={source.value} value={source.value}>
                {source.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ====================================================
            RESET
        ==================================================== */}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled || !activeFilters}
          onClick={resetFilters}
          className={cn(
            "h-9 gap-1.5 rounded-md",
            "px-2.5 text-[11px]",
            "text-muted-foreground",
            "hover:text-foreground"
          )}
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Reset
          {activeCount > 0 && (
            <span
              className={cn(
                "inline-flex min-w-4",
                "items-center justify-center",
                "rounded-sm bg-muted",
                "px-1 text-[10px]",
                "font-semibold tabular-nums"
              )}
            >
              {activeCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

export default BookingFiltersToolbar
