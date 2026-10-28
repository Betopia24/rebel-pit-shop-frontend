import type { ReactNode } from "react";

import {
  CalendarCheck2,
  CalendarPlus2,
  Flame,
  TrendingDown,
  TrendingUp,
  Users,
  UserRoundCheck,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

export type LeadStatId =  "total_leads" | "hot_leads" | "free_trials" | "confirmed_bookings" | "conversion_rate";

export interface LeadStatData {
    id: LeadStatId;
    value: number | null;
    change?: number | null;
    history?: readonly number[];
    comparisonLabel?: string;
}

export type LeadStatsStatus = "loading" | "success" | "empty" | "error";

export interface LeadStatsProps {
    stats: readonly LeadStatData[];
    status?: LeadStatsStatus;
    error?: string | null;
    className?: string;
}

interface StatConfig {
    id: LeadStatId;
    label: string;
    icon: LucideIcon;
    format: "number" | "percentage";
    color: string;
    softBackground: string;
    chartColor: string;
    description: string;
}

const LEAD_STATS_CONFIG: readonly StatConfig[] = [
  {
    id: "total_leads",
    label: "Total Leads",
    icon: Users,
    format: "number",
    color: "text-gold",
    softBackground: "bg-gold-10",
    chartColor: "var(--gold)",
    description: "All leads in the pipeline",
  },
  {
    id: "hot_leads",
    label: "Hot Leads",
    icon: Flame,
    format: "number",
    color: "text-destructive",
    softBackground: "bg-destructive/10",
    chartColor: "var(--destructive)",
    description: "Leads with high intent",
  },
  {
    id: "free_trials",
    label: "Free Trials",
    icon: CalendarPlus2,
    format: "number",
    color: "text-warning",
    softBackground: "bg-warning/10",
    chartColor: "var(--warning)",
    description: "Free trial requests",
  },
  {
    id: "confirmed_bookings",
    label: "Confirmed Bookings",
    icon: CalendarCheck2,
    format: "number",
    color: "text-success",
    softBackground: "bg-success/10",
    chartColor: "var(--success)",
    description: "Confirmed trial bookings",
  },
  {
    id: "conversion_rate",
    label: "Conversion Rate",
    icon: UserRoundCheck,
    format: "percentage",
    color: "text-gold",
    softBackground: "bg-gold-10",
    chartColor: "var(--gold)",
    description: "Lead-to-member conversion",
  },
];

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const percentageFormatter = new Intl.NumberFormat(
  "en-US",
  {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  },
);

function formatStatValue(
  value: number | null,
  format: StatConfig["format"],
): string {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  if (format === "percentage") {
    return `${percentageFormatter.format(value)}%`;
  }

  return numberFormatter.format(value);
}

function formatChange(
  change: number,
  format: StatConfig["format"],
): string {
  const prefix = change > 0 ? "+" : "";

  const formatted = percentageFormatter.format(change);

  return format === "percentage"
    ? `${prefix}${formatted} pp`
    : `${prefix}${formatted}%`;
}

interface LeadSparklineProps {
  id: LeadStatId;
  values: readonly number[];
  color: string;
}

function LeadSparkline({
  id,
  values,
  color,
}: LeadSparklineProps) {
  const data = values.filter(
    (value) => Number.isFinite(value) && value >= 0,
  );

  if (data.length < 2) {
    return (
      <div
        aria-hidden="true"
        className="h-12 w-full"
      />
    );
  }

  const width = 240;
  const height = 54;
  const top = 5;
  const bottom = 49;
  const left = 3;
  const right = 237;

  const minimum = Math.min(...data);
  const maximum = Math.max(...data);
  const range = maximum - minimum || 1;

  const points = data.map((value, index) => {
    const x =
      left +
      (index / (data.length - 1)) *
        (right - left);

    const y =
      bottom -
      ((value - minimum) / range) *
        (bottom - top);

    return { x, y };
  });

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
    )
    .join(" ");

  const areaPath = [
    linePath,
    `L ${right} ${height}`,
    `L ${left} ${height}`,
    "Z",
  ].join(" ");

  const gradientId = `lead-sparkline-${id}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="h-12 w-full overflow-visible"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={color}
            stopOpacity="0.25"
          />
          <stop
            offset="100%"
            stopColor={color}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      <path
        d={areaPath}
        fill={`url(#${gradientId})`}
      />

      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

interface LeadTrendProps {
  change: number | null | undefined;
  format: StatConfig["format"];
  comparisonLabel?: string;
}

function LeadTrend({
  change,
  format,
  comparisonLabel = "vs. previous period",
}: LeadTrendProps) {
  if (
    change === undefined ||
    change === null ||
    !Number.isFinite(change)
  ) {
    return (
      <span className="text-[11px] text-muted-foreground">
        No comparison available
      </span>
    );
  }

  const isPositive = change > 0;
  const isNegative = change < 0;

  const TrendIcon = isNegative
    ? TrendingDown
    : TrendingUp;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-0.5",
          "text-[11px] font-semibold tabular-nums",
          isPositive
            ? "text-success"
            : isNegative
              ? "text-destructive"
              : "text-muted-foreground",
        )}
      >
        {change !== 0 && (
          <TrendIcon
            aria-hidden="true"
            className="size-3"
          />
        )}

        {formatChange(change, format)}
      </span>

      <span className="text-[10px] text-muted-foreground">
        {comparisonLabel}
      </span>
    </div>
  );
}

interface LeadStatCardProps {
  config: StatConfig;
  stat?: LeadStatData;
  loading?: boolean;
}

function LeadStatCard({
  config,
  stat,
  loading = false,
}: LeadStatCardProps) {
  const Icon = config.icon;

  if (loading) {
    return (
      <Card className="gap-0 rounded-xl border-border py-0 shadow-sm">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="size-8 rounded-lg" />
          </div>

          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "min-w-0 gap-0 rounded-xl",
        "border-border bg-card py-0",
        "shadow-sm",
      )}
    >
      <CardContent className="min-w-0 p-4">
        {/* Label and icon */}
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {config.label}
          </p>

          <div
            className={cn(
              "flex size-8 shrink-0",
              "items-center justify-center rounded-lg",
              config.softBackground,
              config.color,
            )}
          >
            <Icon
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* Value */}
        <div className="mt-2">
          <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {formatStatValue(
              stat?.value ?? null,
              config.format,
            )}
          </p>
        </div>

        {/* Trend */}
        <div className="mt-1 min-h-4">
          <LeadTrend
            change={stat?.change}
            format={config.format}
            comparisonLabel={
              stat?.comparisonLabel
            }
          />
        </div>

        {/* Chart */}
        <div className="mt-3">
          <LeadSparkline
            id={config.id}
            values={stat?.history ?? []}
            color={config.chartColor}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function LeadStatsMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-36 items-center",
        "justify-center rounded-xl",
        "border border-dashed border-border",
        "bg-card px-4 py-6",
        "text-center text-sm",
        "text-muted-foreground",
      )}
    >
      {children}
    </div>
  );
}

export function LeadStats({
  stats,
  status = "success",
  error = null,
  className,
}: LeadStatsProps) {
  if (status === "error") {
    return (
      <LeadStatsMessage>
        {error || "Unable to load lead statistics."}
      </LeadStatsMessage>
    );
  }

  if (status === "empty") {
    return (
      <LeadStatsMessage>
        No lead statistics available yet.
      </LeadStatsMessage>
    );
  }

  const byId = new Map(
    stats.map((stat) => [stat.id, stat]),
  );

  return (
    <section
      aria-label="Leads statistics"
      aria-busy={status === "loading"}
      className={cn(
        "grid min-w-0 gap-3",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "2xl:grid-cols-5",
        className,
      )}
    >
      {LEAD_STATS_CONFIG.map((config) => (
        <LeadStatCard
          key={config.id}
          config={config}
          stat={byId.get(config.id)}
          loading={status === "loading"}
        />
      ))}
    </section>
  );
}