"use client"
import { useId, useState } from "react"

import type { DateRange } from "react-day-picker"

import { AlertCircle, GitBranch, Inbox, RefreshCw } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"

import { PipelineStage } from "./pipeline-stage"

import {
  DASHBOARD_PIPELINE_STAGES,
  DASHBOARD_PIPELINE_DATE_OPTIONS,
} from "../../config/dashboard-pipeline.config"

import type {
  DashboardPipelineDateRange,
  DashboardPipelineDatePreset,
  DashboardPipelineStage,
  DashboardPipelineStageId,
  LeadPipelineProps,
} from "../../types/dashboard-pipeline.types"

function parseDateValue(value: string): Date | undefined {
  const [year, month, day] = value.split("-").map(Number)

  if (
    !year ||
    !month ||
    !day ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return undefined
  }

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
  if (!value) return "Select dates"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value)
}

function toCalendarRange(
  range: DashboardPipelineDateRange | undefined
): DateRange | undefined {
  if (!range) return undefined

  const from = parseDateValue(range.startDate)
  const to = parseDateValue(range.endDate)

  return from ? { from, to } : undefined
}

const PIPELINE_STAGE_COUNT = DASHBOARD_PIPELINE_STAGES.length

const PIPELINE_STAGE_CLASS = "relative min-w-0 flex-1"

const PIPELINE_GRID_CLASS = "flex min-w-[690px] w-full items-start"

function getPipelinePosition(index: number): "first" | "middle" | "last" {
  if (index === 0) return "first"

  if (index === PIPELINE_STAGE_COUNT - 1) {
    return "last"
  }

  return "middle"
}

function isValidStage(
  stage: DashboardPipelineStage | undefined
): stage is DashboardPipelineStage {
  return (
    stage !== undefined &&
    Number.isSafeInteger(stage.count) &&
    stage.count >= 0 &&
    (stage.conversionRate === null ||
      (Number.isFinite(stage.conversionRate) &&
        stage.conversionRate >= 0 &&
        stage.conversionRate <= 100))
  )
}

function PipelineLoading() {
  return (
    <div role="status" aria-label="Loading lead pipeline" className="space-y-5">
      <div className="overflow-x-auto pb-2">
        <div className={PIPELINE_GRID_CLASS}>
          {DASHBOARD_PIPELINE_STAGES.map((config, index) => (
            <div
              key={config.id}
              className={cn(PIPELINE_STAGE_CLASS, index > 0 && "-ml-3")}
              style={{
                zIndex: PIPELINE_STAGE_COUNT - index,
              }}
            >
              <PipelineStage
                stage={null}
                config={config}
                position={getPipelinePosition(index)}
                isLoading
              />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading lead pipeline statistics.</span>
    </div>
  )
}

function PipelineEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-52 flex-col",
        "items-center justify-center",
        "gap-3 rounded-lg",
        "border border-dashed border-border",
        "px-6 py-8 text-center"
      )}
    >
      <div
        className={cn(
          "flex size-11 items-center",
          "justify-center rounded-lg",
          "bg-muted text-muted-foreground"
        )}
      >
        <Inbox aria-hidden="true" className="size-5" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          No pipeline data
        </p>

        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          No new inquiries were recorded for the selected reporting period.
        </p>
      </div>
    </div>
  )
}
interface PipelineErrorProps {
  message?: string | null
  onRetry?: () => void
}

function PipelineError({ message, onRetry }: PipelineErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-52 flex-col",
        "items-center justify-center",
        "gap-3 rounded-lg",
        "border border-dashed border-destructive/30",
        "px-6 py-8 text-center"
      )}
    >
      <div
        className={cn(
          "flex size-11 items-center",
          "justify-center rounded-lg",
          "bg-destructive/10 text-destructive"
        )}
      >
        <AlertCircle aria-hidden="true" className="size-5" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Unable to load pipeline
        </p>

        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          {message ||
            "Something went wrong while loading the pipeline. Please try again."}
        </p>
      </div>

      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-1"
        >
          <RefreshCw aria-hidden="true" className="size-3.5" />
          Try again
        </Button>
      )}
    </div>
  )
}

interface PipelineVisualizationProps {
  stages: readonly DashboardPipelineStage[]
}

function PipelineVisualization({ stages }: PipelineVisualizationProps) {
  const stagesById = new Map<DashboardPipelineStageId, DashboardPipelineStage>()

  for (const stage of stages) {
    if (isValidStage(stage)) {
      stagesById.set(stage.id, stage)
    }
  }

  return (
    <div className="min-w-0">
      {/*
       * Scroll horizontally on narrow screens
       * instead of shrinking the chevrons.
       */}
      <div
        className={cn("w-full overflow-x-auto", "overscroll-x-contain", "pb-2")}
        tabIndex={0}
        role="region"
        aria-label="Lead pipeline stages, scroll horizontally to view all"
      >
        <div className={PIPELINE_GRID_CLASS}>
          {DASHBOARD_PIPELINE_STAGES.map((config, index) => {
            const stage = stagesById.get(config.id) ?? null

            return (
              <div
                key={config.id}
                className={cn(PIPELINE_STAGE_CLASS, index > 0 && "-ml-3")}
                style={{
                  zIndex: PIPELINE_STAGE_COUNT - index,
                }}
              >
                <PipelineStage
                  stage={stage}
                  config={config}
                  position={getPipelinePosition(index)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function LeadPipeline({
  data,
  status,
  selectedPeriod,
  customDateRange,
  onPeriodChange,
  onCustomDateRangeChange,
  onRetry,
  error = null,
  className,
}: LeadPipelineProps) {
  const filterId = useId()
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false)
  const [selectedCustomRange, setSelectedCustomRange] = useState<
    DateRange | undefined
  >(() => toCalendarRange(customDateRange ?? data?.dateRange))

  const isLoading = status === "loading"
  const isError = status === "error"

  const hasInquiries =
    data?.stages.find((stage) => stage.id === "new_inquiry")?.count ?? 0

  const isEmpty =
    status === "empty" ||
    (status === "success" &&
      (!data || !Number.isSafeInteger(hasInquiries) || hasInquiries <= 0))

  function handlePeriodChange(nextPeriod: string | null) {
    if (!nextPeriod || !onPeriodChange) {
      return
    }

    if (nextPeriod === "custom") {
      setIsCustomRangeOpen(true)

      if (selectedPeriod !== "custom") {
        onPeriodChange("custom")
      }

      return
    }

    if (nextPeriod === selectedPeriod) return

    const validPeriod = DASHBOARD_PIPELINE_DATE_OPTIONS.some(
      (option) => option.value === nextPeriod
    )

    if (!validPeriod) return

    onPeriodChange(nextPeriod as DashboardPipelineDatePreset)
  }

  function handleCustomRangeApply() {
    if (!selectedCustomRange?.from || !selectedCustomRange.to) {
      return
    }

    onCustomDateRangeChange?.({
      preset: "custom",
      startDate: formatDateValue(selectedCustomRange.from),
      endDate: formatDateValue(selectedCustomRange.to),
    })
    onPeriodChange?.("custom")
    setIsCustomRangeOpen(false)
  }

  const customRangeLabel = selectedCustomRange?.from
    ? `${formatDateLabel(selectedCustomRange.from)} – ${formatDateLabel(selectedCustomRange.to)}`
    : "Choose dates"

  return (
    <Card
      className={cn(
        "min-w-0 gap-0",
        "rounded-xl border-border",
        "bg-card text-card-foreground",
        "py-0 shadow-sm",
        className
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <CardHeader
        className={cn(
          "flex flex-col gap-3",
          "px-4 pt-4 pb-2",
          "sm:flex-row sm:items-start",
          "sm:justify-between",
          "sm:px-5 sm:pt-5"
        )}
      >
        <div className="min-w-0 space-y-1">
          <CardTitle
            className={cn(
              "flex items-center gap-2",
              "text-sm font-semibold",
              "tracking-tight text-foreground",
              "sm:text-base"
            )}
          >
            <GitBranch aria-hidden="true" className="size-4 text-gold" />
            Lead Pipeline
          </CardTitle>

          <CardDescription
            className={cn("text-xs leading-relaxed", "text-muted-foreground")}
          >
            From first message to membership conversion
          </CardDescription>
        </div>

        {/* Date filter */}
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
          {isLoading && !onPeriodChange ? (
            <Skeleton className="h-9 w-35 rounded-md" />
          ) : (
            <Select
              items={DASHBOARD_PIPELINE_DATE_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
                disabled: false,
              }))}
              value={selectedPeriod}
              onValueChange={handlePeriodChange}
              disabled={!onPeriodChange}
            >
              <SelectTrigger
                id={filterId}
                aria-label="Lead pipeline reporting period"
                className={cn(
                  "h-9 w-38",
                  "border-border bg-background",
                  "text-xs text-foreground"
                )}
              >
                <SelectValue placeholder="Select period" />
              </SelectTrigger>

              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {DASHBOARD_PIPELINE_DATE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          {selectedPeriod === "custom" && (
            <Popover
              open={isCustomRangeOpen}
              onOpenChange={setIsCustomRangeOpen}
            >
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 max-w-52 min-w-0 text-xs"
                    aria-label="Choose custom pipeline date range"
                  />
                }
              >
                <span className="truncate">{customRangeLabel}</span>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-auto max-w-[calc(100vw-2rem)] p-0"
              >
                <div className="border-b border-border px-3 py-3">
                  <p className="text-sm font-medium text-foreground">
                    Custom date range
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select a start and end date for the pipeline.
                  </p>
                </div>

                <Calendar
                  mode="range"
                  selected={selectedCustomRange}
                  onSelect={setSelectedCustomRange}
                  numberOfMonths={1}
                  defaultMonth={selectedCustomRange?.from}
                  className="mx-auto"
                />

                <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-3">
                  <p className="min-w-0 truncate text-xs text-muted-foreground">
                    {customRangeLabel}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    className="shrink-0 bg-gold text-background hover:bg-gold-hover"
                    disabled={
                      !selectedCustomRange?.from || !selectedCustomRange.to
                    }
                    onClick={handleCustomRangeApply}
                  >
                    Apply range
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </CardHeader>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <CardContent className="px-4 pt-4 pb-5 sm:px-5 sm:pt-5">
        {isLoading ? (
          <PipelineLoading />
        ) : isError ? (
          <PipelineError message={error} onRetry={onRetry} />
        ) : isEmpty ? (
          <PipelineEmpty />
        ) : data ? (
          <PipelineVisualization stages={data.stages} />
        ) : (
          <PipelineEmpty />
        )}
      </CardContent>
    </Card>
  )
}
