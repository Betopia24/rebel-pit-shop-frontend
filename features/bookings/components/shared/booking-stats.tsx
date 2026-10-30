
import type { ReactNode } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  Gift,
  Minus,
  UserX,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import type {
  BookingStat,
  BookingStatId,
  BookingStatTrend,
  BookingStatistics,
} from "../../types/booking.types";


export type BookingStatsStatus = "loading" | "success" | "empty" | "error";

export interface BookingStatsProps {
    statistics: BookingStatistics | null;
    status?: BookingStatsStatus;
    error?: string | null;
    className?: string;
}

interface BookingStatConfig {
    label: string;
    icon: LucideIcon;
    iconClassName: string;
    iconBackgroundClassName: string;
    increaseIsPositive: boolean | null;
}

const BOOKING_STAT_CONFIG = {
  total_bookings: {
    label: "Total Bookings",
    icon: CalendarDays,
    iconClassName: "text-gold",
    iconBackgroundClassName: "bg-gold-10",
    increaseIsPositive: true,
  },

  free_class_bookings: {
    label: "Free Class Bookings",
    icon: Gift,
    iconClassName: "text-gold",
    iconBackgroundClassName: "bg-gold-10",
    increaseIsPositive: true,
  },

  this_week: {
    label: "This Week",
    icon: CalendarCheck2,
    iconClassName: "text-muted-foreground",
    iconBackgroundClassName: "bg-muted",
    increaseIsPositive: null,
  },

  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    iconClassName: "text-success",
    iconBackgroundClassName: "bg-success/10",
    increaseIsPositive: true,
  },

  no_show: {
    label: "No Show",
    icon: UserX,
    iconClassName: "text-destructive",
    iconBackgroundClassName: "bg-destructive/10",
    increaseIsPositive: false,
  },
} satisfies Record<
  BookingStatId,
  BookingStatConfig
>;

const BOOKING_STAT_ORDER = [
  "total_bookings",
  "free_class_bookings",
  "this_week",
  "confirmed",
  "no_show",
] as const satisfies readonly BookingStatId[];

const INTEGER_FORMATTER = new Intl.NumberFormat(
  "en-US",
  {
    maximumFractionDigits: 0,
  },
);

const PERCENT_FORMATTER = new Intl.NumberFormat(
  "en-US",
  {
    maximumFractionDigits: 1,
  },
);

function formatCount(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "—";
  }

  return INTEGER_FORMATTER.format(value);
}

function formatPercentage(value: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return `${PERCENT_FORMATTER.format(value)}%`;
}

interface BookingTrendProps {
    trend: BookingStatTrend;
    increaseIsPositive: boolean | null;
}

function BookingTrend({
  trend,
  increaseIsPositive,
}: BookingTrendProps) {
  const percentage = trend.percentage;

  const direction = trend.direction;

  const hasPercentage =
    percentage !== null &&
    Number.isFinite(percentage);

  const isUp = direction === "up";
  const isDown = direction === "down";

  const isFavorable =
    increaseIsPositive === null
      ? null
      : isUp
        ? increaseIsPositive
        : isDown
          ? !increaseIsPositive
          : null;

  const colorClassName =
    isFavorable === true
      ? "text-success"
      : isFavorable === false
        ? "text-destructive"
        : "text-muted-foreground";

  const Icon = isUp
    ? ArrowUpRight
    : isDown
      ? ArrowDownRight
      : Minus;

  const label =
    hasPercentage
      ? `${isUp ? "+" : isDown ? "−" : ""}${formatPercentage(
          Math.abs(percentage),
        )}`
      : null;

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
      {label && (
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-0.5",
            "text-[11px] font-medium tabular-nums",
            colorClassName,
          )}
        >
          <Icon
            aria-hidden="true"
            className="size-3"
          />

          {label}
        </span>
      )}

      {trend.label.trim() && (
        <span className="min-w-0 text-[10px] leading-4 text-muted-foreground">
          {trend.label}
        </span>
      )}
    </div>
  );
}

interface BookingStatCardProps {
    stat: BookingStat;
}

function BookingStatCard({
  stat,
}: BookingStatCardProps) {
  const config = BOOKING_STAT_CONFIG[stat.id];

  const Icon = config.icon;

  const description = stat.description?.trim();

  return (
    <Card
      className={cn(
        "min-w-0 gap-0 rounded-xl",
        "border-border bg-card py-0",
        "shadow-none",
      )}
    >
      <CardContent className="flex min-h-31 flex-col p-3.5 sm:p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "min-w-0 text-[11px]",
              "font-medium leading-4",
              "text-muted-foreground",
            )}
          >
            {config.label}
          </p>

          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 shrink-0",
              "items-center justify-center",
              "rounded-lg",
              config.iconBackgroundClassName,
            )}
          >
            <Icon
              className={cn(
                "size-4",
                config.iconClassName,
              )}
              strokeWidth={1.8}
            />
          </span>
        </div>

        {/* Value */}
        <div className="mt-2">
          <p
            className={cn(
              "text-[27px] font-semibold",
              "leading-none tracking-tight",
              "text-foreground tabular-nums",
            )}
          >
            {formatCount(stat.value)}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3">
          {stat.trend ? (
            <BookingTrend
              trend={stat.trend}
              increaseIsPositive={
                config.increaseIsPositive
              }
            />
          ) : description ? (
            <p className="text-[10px] leading-4 text-muted-foreground">
              {description}
            </p>
          ) : (
            <span
              aria-hidden="true"
              className="block h-4"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   LOADING CARD
============================================================ */

function BookingStatSkeleton() {
  return (
    <Card
      className={cn(
        "gap-0 rounded-xl border-border",
        "bg-card py-0 shadow-none",
      )}
    >
      <CardContent className="flex min-h-31 flex-col p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="mt-1 h-3 w-24" />

          <Skeleton className="size-8 rounded-lg" />
        </div>

        <Skeleton className="mt-3 h-8 w-16" />

        <Skeleton className="mt-auto h-3 w-32" />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   EMPTY / ERROR
============================================================ */

function BookingStatsMessage({
  children,
  isError = false,
}: {
  children: ReactNode;
  isError?: boolean;
}) {
  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        "col-span-full flex min-h-30",
        "items-center justify-center",
        "rounded-xl border border-dashed",
        "px-4 py-6 text-center",
        isError
          ? "border-destructive/30 bg-destructive/5"
          : "border-border bg-muted/20",
      )}
    >
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingStats({
  statistics,
  status = "success",
  error = null,
  className,
}: BookingStatsProps) {
  const statsById = new Map(
    statistics?.stats.map(
      (stat) => [stat.id, stat],
    ) ?? [],
  );

  const hasStats = BOOKING_STAT_ORDER.some(
    (id) => statsById.has(id),
  );

  return (
    <section
      aria-label="Booking statistics"
      aria-busy={status === "loading"}
      className={cn(
        "grid min-w-0 grid-cols-1 gap-3",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-5",
        className,
      )}
    >
      {status === "loading" ? (
        BOOKING_STAT_ORDER.map((id) => (
          <BookingStatSkeleton key={id} />
        ))
      ) : status === "error" ? (
        <BookingStatsMessage isError>
          {error?.trim() ||
            "Unable to load booking statistics."}
        </BookingStatsMessage>
      ) : status === "empty" ||
        !statistics ||
        !hasStats ? (
        <BookingStatsMessage>
          No booking statistics available.
        </BookingStatsMessage>
      ) : (
        BOOKING_STAT_ORDER.map((id) => {
          const stat = statsById.get(id);

          return stat ? (
            <BookingStatCard
              key={id}
              stat={stat}
            />
          ) : (
            <BookingStatSkeleton key={id} />
          );
        })
      )}
    </section>
  );
}

export default BookingStats;
