"use client"

import { useMemo, useState } from "react"

import type { DateRange } from "react-day-picker"

import { CalendarDays, RotateCcw, Search, X } from "lucide-react"

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

import {
  LEAD_CHANNEL_CONFIG,
  LEAD_CHANNEL_OPTIONS,
} from "../../config/lead-channels.config"

import {
  getLeadStageLabel,
  LEAD_PIPELINE_STAGES,
} from "../../config/lead-stages.config"

import {
  getLeadTemperatureConfig,
  LEAD_TEMPERATURE_ORDER,
} from "../../config/lead-temperature.config"

import type {
  LeadChannel,
  LeadCoach,
  LeadDateFilterPreset,
  LeadStage,
  LeadTemperature,
} from "../../types/lead.types"

export interface LeadFilterValues {
  search: string
  source: LeadChannel | null
  stage: LeadStage | null
  temperature: LeadTemperature | null
  coachId: string | null
  datePreset: LeadDateFilterPreset
  dateFrom: string | null
  dateTo: string | null
}

export interface LeadFiltersProps {
  value: LeadFilterValues
  onChange: (value: LeadFilterValues) => void
  coaches?: readonly LeadCoach[]
  disabled?: boolean
  className?: string
}

export const DEFAULT_LEAD_FILTERS: LeadFilterValues = {
  search: "",
  source: null,
  stage: null,
  temperature: null,
  coachId: null,
  datePreset: "all_time",
  dateFrom: null,
  dateTo: null,
}

const ALL_SOURCES = "all_sources"
const ALL_STAGES = "all_stages"
const ALL_TEMPERATURES = "all_temperatures"
const ALL_COACHES = "all_coaches"

const LEAD_DATE_OPTIONS = [
  { value: "all_time", label: "All time" },
  { value: "today", label: "Today" },
  { value: "this_week", label: "This week" },
  { value: "this_month", label: "This month" },
  { value: "last_3_months", label: "Last 3 months" },
  { value: "custom", label: "Custom range" },
] as const satisfies readonly {
  value: LeadDateFilterPreset
  label: string
}[]

function parseDateValue(value: string): Date | undefined {
  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) return undefined

  return new Date(year, month - 1, day)
}

function formatDateValue(value: Date): string {
  return [
    value.getFullYear(),
    String(value.getMonth() + 1).padStart(2, "0"),
    String(value.getDate()).padStart(2, "0"),
  ].join("-")
}

function formatDateLabel(value: Date | undefined): string {
  if (!value) return "Choose dates"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value)
}

export function hasActiveLeadFilters(filters: LeadFilterValues): boolean {
  return (
    filters.search.trim().length > 0 ||
    filters.source !== null ||
    filters.stage !== null ||
    filters.temperature !== null ||
    filters.coachId !== null ||
    filters.datePreset !== "all_time"
  )
}

export function getActiveLeadFilterCount(filters: LeadFilterValues): number {
  return [
    filters.search.trim().length > 0,
    filters.source !== null,
    filters.stage !== null,
    filters.temperature !== null,
    filters.coachId !== null,
    filters.datePreset !== "all_time",
  ].filter(Boolean).length
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

export function LeadFilters({
  value,
  onChange,
  coaches = [],
  disabled = false,
  className,
}: LeadFiltersProps) {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(
    () => {
      const from = value.dateFrom ? parseDateValue(value.dateFrom) : undefined
      const to = value.dateTo ? parseDateValue(value.dateTo) : undefined

      return from ? { from, to } : undefined
    }
  )

  /* ==========================================================
     DERIVED STATE
  ========================================================== */

  const activeFilterCount = getActiveLeadFilterCount(value)

  const hasActiveFilters = activeFilterCount > 0

  const sourceLabel = value.source
    ? LEAD_CHANNEL_CONFIG[value.source].label
    : "All"
  const stageLabel = value.stage ? getLeadStageLabel(value.stage) : "All"
  const temperatureLabel = value.temperature
    ? getLeadTemperatureConfig(value.temperature).label
    : "All"
  const coachLabel = value.coachId
    ? (coaches.find((coach) => coach.id === value.coachId)?.name ?? "All")
    : "All"
  const dateLabel =
    LEAD_DATE_OPTIONS.find((option) => option.value === value.datePreset)
      ?.label ?? "All time"
  const customDateLabel = customDateRange?.from
    ? `${formatDateLabel(customDateRange.from)} – ${formatDateLabel(customDateRange.to)}`
    : "Choose dates"

  /**
   * Deduplicate coach options by ID.
   *
   * Coach data may come from the backend,
   * and duplicate assignments should not
   * create duplicate Select items.
   */
  const coachOptions = useMemo(() => {
    const unique = new Map<string, LeadCoach>()

    for (const coach of coaches) {
      unique.set(coach.id, coach)
    }

    return [...unique.values()].sort((a, b) => a.name.localeCompare(b.name))
  }, [coaches])

  /* ==========================================================
     HANDLERS
  ========================================================== */

  function updateFilter<K extends keyof LeadFilterValues>(
    key: K,
    nextValue: LeadFilterValues[K]
  ) {
    onChange({
      ...value,
      [key]: nextValue,
    })
  }

  function clearAllFilters() {
    setCustomDateRange(undefined)
    setIsDateRangeOpen(false)
    onChange({
      ...DEFAULT_LEAD_FILTERS,
    })
  }

  function handleDatePresetChange(nextValue: string | null) {
    if (!nextValue) return

    const option = LEAD_DATE_OPTIONS.find((item) => item.value === nextValue)

    if (!option) return

    onChange({
      ...value,
      datePreset: option.value,
      ...(option.value === "custom" ? {} : { dateFrom: null, dateTo: null }),
    })

    setIsDateRangeOpen(option.value === "custom")
  }

  function applyCustomDateRange() {
    if (!customDateRange?.from || !customDateRange.to) return

    onChange({
      ...value,
      datePreset: "custom",
      dateFrom: formatDateValue(customDateRange.from),
      dateTo: formatDateValue(customDateRange.to),
    })
    setIsDateRangeOpen(false)
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      role="search"
      aria-label="Filter leads"
      className={cn(
        "flex min-w-0 flex-col gap-3",
        "lg:flex-row lg:items-center lg:justify-between",
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
            "top-1/2 left-3",
            "size-4 -translate-y-1/2",
            "text-muted-foreground"
          )}
        />

        <Input
          type="search"
          value={value.search}
          onChange={(event) => {
            updateFilter("search", event.target.value)
          }}
          disabled={disabled}
          placeholder="Search leads..."
          aria-label="Search leads"
          className={cn(
            "h-9 w-full rounded-md",
            "border-border bg-background",
            "pr-8 pl-9",
            "text-xs"
          )}
        />

        {value.search.length > 0 && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              updateFilter("search", "")
            }}
            aria-label="Clear lead search"
            className={cn(
              "absolute top-1/2 right-1",
              "size-7 -translate-y-1/2",
              "text-muted-foreground"
            )}
          >
            <X aria-hidden="true" className="size-3.5" />
          </Button>
        )}
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {/* ======================================================
              DATE FILTER
          ====================================================== */}

          <Select
            value={value.datePreset}
            onValueChange={handleDatePresetChange}
            disabled={disabled}
          >
            <SelectTrigger
              size="sm"
              aria-label="Filter leads by date"
              className="h-9 min-w-35 rounded-md border-border bg-background text-[11px]"
            >
              <CalendarDays aria-hidden="true" className="size-3.5" />
              <FilterTriggerValue label="Date" value={dateLabel} />
            </SelectTrigger>

            <SelectContent align="start">
              {LEAD_DATE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {value.datePreset === "custom" && (
            <Popover open={isDateRangeOpen} onOpenChange={setIsDateRangeOpen}>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    className="h-9 max-w-48 min-w-40 flex-1 rounded-md border-border bg-background text-[11px]"
                    aria-label="Choose lead date range"
                  />
                }
              >
                <FilterTriggerValue label="Dates" value={customDateLabel} />
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-auto max-w-[calc(100vw-2rem)] p-0"
              >
                <div className="border-b border-border px-3 py-3">
                  <p className="text-sm font-medium text-foreground">
                    Custom lead date range
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Filter leads by their creation date.
                  </p>
                </div>

                <Calendar
                  mode="range"
                  selected={customDateRange}
                  onSelect={setCustomDateRange}
                  numberOfMonths={1}
                  defaultMonth={customDateRange?.from}
                  className="mx-auto"
                />

                <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-3">
                  <span className="min-w-0 truncate text-xs text-muted-foreground">
                    {customDateLabel}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    className="shrink-0 bg-gold text-background hover:bg-gold-hover"
                    disabled={!customDateRange?.from || !customDateRange.to}
                    onClick={applyCustomDateRange}
                  >
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* ====================================================
            SOURCE FILTER
        ==================================================== */}

        <Select
          value={value.source ?? ALL_SOURCES}
          onValueChange={(nextValue) => {
            updateFilter(
              "source",
              nextValue === ALL_SOURCES ? null : (nextValue as LeadChannel)
            )
          }}
          disabled={disabled}
        >
          <SelectTrigger
            size="sm"
            aria-label="Filter by lead source"
            className={cn(
              "h-9 min-w-35 rounded-md border-border bg-background text-[11px]"
            )}
          >
            <FilterTriggerValue label="Source" value={sourceLabel} />
          </SelectTrigger>

          <SelectContent align="start">
            <SelectItem value={ALL_SOURCES}>All Sources</SelectItem>

            {LEAD_CHANNEL_OPTIONS.map((channel) => (
              <SelectItem key={channel.value} value={channel.value}>
                {channel.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ======================================================
          STAGE FILTER
      ====================================================== */}

        <Select
          value={value.stage ?? ALL_STAGES}
          onValueChange={(nextValue) => {
            updateFilter(
              "stage",
              nextValue === ALL_STAGES ? null : (nextValue as LeadStage)
            )
          }}
          disabled={disabled}
        >
          <SelectTrigger
            size="sm"
            aria-label="Filter by pipeline stage"
            className={cn(
              "h-9 max-w-48 min-w-40 rounded-md border-border bg-background text-[11px]"
            )}
          >
            <FilterTriggerValue label="Stage" value={stageLabel} />
          </SelectTrigger>

          <SelectContent align="start">
            <SelectItem value={ALL_STAGES}>All Stages</SelectItem>

            {LEAD_PIPELINE_STAGES.map((stage) => (
              <SelectItem key={stage.id} value={stage.id}>
                {stage.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ======================================================
          TEMPERATURE FILTER
      ====================================================== */}

        <Select
          value={value.temperature ?? ALL_TEMPERATURES}
          onValueChange={(nextValue) => {
            updateFilter(
              "temperature",
              nextValue === ALL_TEMPERATURES
                ? null
                : (nextValue as LeadTemperature)
            )
          }}
          disabled={disabled}
        >
          <SelectTrigger
            size="sm"
            aria-label="Filter by lead temperature"
            className={cn(
              "h-9 max-w-48 min-w-40 rounded-md border-border bg-background text-[11px]"
            )}
          >
            <FilterTriggerValue label="Temperature" value={temperatureLabel} />
          </SelectTrigger>

          <SelectContent align="start">
            <SelectItem value={ALL_TEMPERATURES}>All Temperatures</SelectItem>

            {LEAD_TEMPERATURE_ORDER.map((temperature) => {
              const config = getLeadTemperatureConfig(temperature)

              return (
                <SelectItem key={temperature} value={temperature}>
                  {config.label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>

        {/* ======================================================
          COACH FILTER
      ====================================================== */}

        <Select
          value={value.coachId ?? ALL_COACHES}
          onValueChange={(nextValue) => {
            updateFilter(
              "coachId",
              nextValue === ALL_COACHES ? null : nextValue
            )
          }}
          disabled={disabled}
        >
          <SelectTrigger
            size="sm"
            aria-label="Filter by assigned coach"
            className={cn(
              "h-9 min-w-35 rounded-md border-border bg-background text-[11px]"
            )}
          >
            <FilterTriggerValue label="Coach" value={coachLabel} />
          </SelectTrigger>

          <SelectContent align="start">
            <SelectItem value={ALL_COACHES}>All Coaches</SelectItem>

            {coachOptions.map((coach) => (
              <SelectItem key={coach.id} value={coach.id}>
                {coach.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ======================================================
          RESET FILTERS
      ====================================================== */}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled || !hasActiveFilters}
          onClick={clearAllFilters}
          className={cn(
            "h-9 gap-1.5 rounded-md",
            "px-2.5 text-[11px]",
            "text-muted-foreground",
            "hover:text-foreground"
          )}
          aria-label={`Reset ${activeFilterCount} active lead filters`}
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Reset
          {activeFilterCount > 0 && (
            <span
              className={cn(
                "inline-flex min-w-4",
                "items-center justify-center",
                "rounded-sm bg-muted",
                "px-1 text-[10px]",
                "font-semibold tabular-nums"
              )}
            >
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
