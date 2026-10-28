import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Info,
  Minus,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

import type {
  DashboardStat,
  DashboardStatConfig,
  DashboardStatSparklinePoint,
  DashboardStatTrend,
  StatCardProps,
} from "../../types/dashboard-stat.types"

export interface DashboardStatCardProps extends Omit<StatCardProps, "stat"> {
  stat: DashboardStat | null
  error?: string | null
}

const SPARKLINE_WIDTH = 100
const SPARKLINE_HEIGHT = 38
const SPARKLINE_PADDING = 3

function formatValue(
  value: number,
  format: DashboardStatConfig["valueFormat"]
): string {
  if (!Number.isFinite(value)) {
    return "—"
  }

  switch (format) {
    case "percentage":
      return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
      }).format(value)}%`

    case "duration": {
      const seconds = Math.max(0, Math.floor(value))

      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const remainingSeconds = seconds % 60

      if (hours > 0) {
        return `${hours}h ${minutes}m`
      }

      if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`
      }

      return `${remainingSeconds}s`
    }

    case "number":
    default:
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
      }).format(value)
  }
}

function formatChange(
  change: number,
  format: DashboardStatConfig["valueFormat"]
): string {
  if (!Number.isFinite(change)) {
    return "—"
  }

  const formatted = formatValue(Math.abs(change), format)

  if (change > 0) return `+${formatted}`
  if (change < 0) return `−${formatted}`

  return formatted
}

function getComparisonLabel(
  period: DashboardStatTrend["comparisonPeriod"]
): string {
  switch (period) {
    case "previous_day":
      return "from yesterday"

    case "previous_week":
      return "from last week"

    case "previous_month":
      return "from last month"

    case "previous_period":
    default:
      return "from previous period"
  }
}

function getTrendClasses(sentiment: DashboardStatTrend["sentiment"]): string {
  switch (sentiment) {
    case "positive":
      return "text-success"

    case "negative":
      return "text-destructive"

    case "neutral":
    default:
      return "text-muted-foreground"
  }
}

function getSparklineClasses(
  sentiment: DashboardStatTrend["sentiment"] | null
): string {
  switch (sentiment) {
    case "negative":
      return "text-destructive"

    case "neutral":
      return "text-muted-foreground"

    case "positive":
    default:
      return "text-gold"
  }
}

function getSparklinePath(
  points: readonly DashboardStatSparklinePoint[]
): string | null {
  const values = points.map((point) => point.value).filter(Number.isFinite)

  if (values.length < 2) {
    return null
  }

  const min = Math.min(...values)
  const max = Math.max(...values)

  const range = max - min

  const drawableWidth = SPARKLINE_WIDTH - SPARKLINE_PADDING * 2

  const drawableHeight = SPARKLINE_HEIGHT - SPARKLINE_PADDING * 2

  const coordinates = values.map((value, index) => {
    const x = SPARKLINE_PADDING + (index / (values.length - 1)) * drawableWidth

    const y =
      range === 0
        ? SPARKLINE_HEIGHT / 2
        : SPARKLINE_HEIGHT -
          SPARKLINE_PADDING -
          ((value - min) / range) * drawableHeight

    return {
      x: x.toFixed(2),
      y: y.toFixed(2),
    }
  })

  return coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ")
}

function getSparklineAreaPath(linePath: string): string {
  const baseline = SPARKLINE_HEIGHT - SPARKLINE_PADDING
  const rightEdge = SPARKLINE_WIDTH - SPARKLINE_PADDING

  return `${linePath} L ${rightEdge} ${baseline} L ${SPARKLINE_PADDING} ${baseline} Z`
}

interface StatSparklineProps {
  points: readonly DashboardStatSparklinePoint[]
  sentiment: DashboardStatTrend["sentiment"] | null
}

function StatSparkline({ points, sentiment }: StatSparklineProps) {
  const path = getSparklinePath(points)

  if (!path) {
    return null
  }

  const gradientId = `stat-sparkline-gradient-${sentiment ?? "neutral"}`

  return (
    <svg
      viewBox={`0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}`}
      className={cn(
        "block h-10 w-24 shrink-0",
        "overflow-visible",
        getSparklineClasses(sentiment)
      )}
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={getSparklineAreaPath(path)}
        fill={`url(#${gradientId})`}
        stroke="none"
      />

      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function StatCardSkeleton({
  config,
  className,
}: {
  config: DashboardStatConfig
  className?: string
}) {
  return (
    <Card
      aria-label={`Loading ${config.title}`}
      aria-busy="true"
      className={cn(
        "min-w-0 gap-0 overflow-hidden",
        "rounded-lg border-border bg-card",
        "py-0 shadow-sm",
        className
      )}
    >
      <CardContent className="p-3 sm:p-3.5">
        <div className="flex min-h-20 items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-lg" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-2.5 w-28 max-w-full" />
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-2.5 w-24 max-w-full" />
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCardFallback({
  config,
  message,
  isError,
  className,
}: {
  config: DashboardStatConfig
  message: string
  isError: boolean
  className?: string
}) {
  const Icon = config.icon

  return (
    <Card
      className={cn(
        "min-w-0 gap-0 overflow-hidden",
        "rounded-lg border-border bg-card",
        "py-0 shadow-sm",
        className
      )}
    >
      <CardContent className="p-3 sm:p-3.5">
        <div className="flex min-h-20 items-center gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center",
              "bg-gold-10 rounded-lg text-gold"
            )}
          >
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-text-secondary">
              {config.title}
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              —
            </p>

            <p
              role={isError ? "alert" : undefined}
              className={cn(
                "mt-0.5 text-[10px] leading-relaxed",
                isError ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatTrend({ trend }: { trend: DashboardStatTrend }) {
  const TrendIcon =
    trend.direction === "up"
      ? ArrowUpRight
      : trend.direction === "down"
        ? ArrowDownRight
        : Minus

  if (trend.changePercent === null || !Number.isFinite(trend.changePercent)) {
    return null
  }

  const percent = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(Math.abs(trend.changePercent))

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5",
        "text-[10px] font-semibold tabular-nums",
        getTrendClasses(trend.sentiment)
      )}
      aria-label={`${trend.direction} ${percent} percent`}
    >
      <TrendIcon aria-hidden="true" className="size-3" strokeWidth={2} />

      <span>{percent}%</span>
    </span>
  )
}

export function StatCard({
  stat,
  config,
  className,
  isLoading = false,
  error = null,
}: DashboardStatCardProps) {
  if (isLoading) {
    return <StatCardSkeleton config={config} className={className} />
  }

  if (error) {
    return (
      <StatCardFallback
        config={config}
        message={error}
        isError
        className={className}
      />
    )
  }

  if (!stat || !Number.isFinite(stat.value)) {
    return (
      <StatCardFallback
        config={config}
        message="No data available"
        isError={false}
        className={className}
      />
    )
  }

  const Icon = config.icon
  const trend = stat.trend

  const comparisonText = trend
    ? `${formatChange(trend.change, config.valueFormat)} ${getComparisonLabel(
        trend.comparisonPeriod
      )}`
    : "No comparison available"

  const sparklinePoints = stat.sparkline?.points ?? []

  return (
    <Card
      aria-label={`${config.title}: ${formatValue(
        stat.value,
        config.valueFormat
      )}`}
      className={cn(
        "group min-w-0 gap-0 overflow-hidden",
        "rounded-lg border-border bg-card",
        "py-0 shadow-sm",
        "transition-[border-color,box-shadow] duration-200",
        "hover:border-gold/30 hover:shadow-md",
        "motion-reduce:transition-none",
        className
      )}
    >
      <CardContent className="p-3 sm:p-3.5">
        <div className="flex min-h-20 items-center gap-3">
          {/* Icon container */}
          <div
            className={cn(
              "flex size-10 shrink-0",
              "items-center justify-center",
              "bg-gold-10 rounded-lg text-gold"
            )}
          >
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </div>

          {/* Main metric */}
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-1">
              <p
                className={cn(
                  "min-w-0 truncate",
                  "text-[11px] font-medium",
                  "text-text-secondary"
                )}
                title={config.title}
              >
                {config.title}
              </p>

              {config.description && (
                <Tooltip>
                  <TooltipTrigger
                    className={cn(
                      "inline-flex size-5 shrink-0",
                      "items-center justify-center",
                      "rounded-sm text-muted-foreground",
                      "opacity-60 transition-opacity",
                      "hover:opacity-100",
                      "focus-visible:opacity-100",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-ring"
                    )}
                    aria-label={`About ${config.title}`}
                  >
                    <Info aria-hidden="true" className="size-3" />
                  </TooltipTrigger>

                  <TooltipContent side="top" className="max-w-60">
                    <p>{config.description}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span
                className={cn(
                  "text-[25px] leading-none font-bold",
                  "tracking-tight tabular-nums",
                  "text-foreground"
                )}
              >
                {formatValue(stat.value, config.valueFormat)}
              </span>

              {trend && <StatTrend trend={trend} />}
            </div>

            <p
              className={cn(
                "mt-1.5 truncate",
                "text-[10px] leading-4",
                "text-muted-foreground"
              )}
              title={comparisonText}
            >
              {comparisonText}
            </p>
          </div>

          {/* Bottom-right sparkline */}
          <div className="flex shrink-0 self-end pb-0.5">
            {sparklinePoints.length >= 2 ? (
              <StatSparkline
                points={sparklinePoints}
                sentiment={trend?.sentiment ?? null}
              />
            ) : (
              <div
                className="flex h-9 w-20 items-center justify-end"
                aria-label="No trend history available"
              >
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-muted-foreground/40"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
