import { AlertCircle } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import {
  DASHBOARD_SCHEDULE_INDICATOR_CONFIG,
  DASHBOARD_SCHEDULE_STATUS_CONFIG,
  formatScheduleDuration,
  formatScheduleTime,
  getScheduleTypeLabel,
} from "../../config/dashboard-schedule.config";

import type {
  DashboardScheduleItem,
  ScheduleItemProps,
} from "../../types/dashboard-schedule.types";

export interface DashboardScheduleItemProps
    extends Omit<ScheduleItemProps, "item"> {
    item: DashboardScheduleItem | null;
    isLoading?: boolean;
    error?: string | null;
    showDivider?: boolean;
}

const ROW_CLASS_NAME = cn(
    "relative grid min-w-0",
    "grid-cols-[auto_4.25rem_minmax(0,1fr)_auto]",
    "items-center gap-x-2",
    "py-2.5",
    "sm:grid-cols-[auto_4.5rem_minmax(0,1fr)_auto]",
);
const DIVIDER_CLASS_NAME =
  "border-b border-border";

function ScheduleItemSkeleton({
  showDivider,
  className,
}: {
  showDivider: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        ROW_CLASS_NAME,
        showDivider && DIVIDER_CLASS_NAME,
        className,
      )}
    >
      <Skeleton className="size-1.5 rounded-full" />

      <Skeleton className="h-3 w-13" />

      <div className="min-w-0 space-y-1.5">
        <Skeleton className="h-3 w-28 max-w-full" />
        <Skeleton className="h-2.5 w-24 max-w-full" />
      </div>

      <Skeleton className="h-3 w-12" />
    </div>
  );
}

function ScheduleItemFallback({
  error,
  showDivider,
  className,
}: {
  error?: string | null;
  showDivider: boolean;
  className?: string;
}) {
  const isError = Boolean(error);

  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        ROW_CLASS_NAME,
        showDivider && DIVIDER_CLASS_NAME,
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          isError
            ? "bg-destructive"
            : "bg-muted-foreground/40",
        )}
      />

      <span className="text-xs text-muted-foreground">
        —
      </span>

      <div className="flex min-w-0 items-center gap-2">
        {isError && (
          <AlertCircle
            aria-hidden="true"
            className="size-3.5 shrink-0 text-destructive"
          />
        )}

        <span
          className={cn(
            "truncate text-xs",
            isError
              ? "text-destructive"
              : "text-muted-foreground",
          )}
          title={error ?? undefined}
        >
          {error ?? "No session available"}
        </span>
      </div>

      <span className="text-xs text-muted-foreground">
        —
      </span>
    </div>
  );
}

function ScheduleIndicator({
  indicator,
  label,
}: {
  indicator: DashboardScheduleItem["indicator"];
  label: string;
}) {
  const indicatorConfig =
    DASHBOARD_SCHEDULE_INDICATOR_CONFIG[
      indicator
    ];

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "flex size-4 shrink-0",
          "items-center justify-center",
          "rounded-full",
          "outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-ring",
        )}
        aria-label={label}
      >
        <span
          aria-hidden="true"
          className={cn(
            "size-1.5 rounded-full",
            indicatorConfig.className,
          )}
        />
      </TooltipTrigger>

      <TooltipContent side="top">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function ScheduleItem({
  item,
  timezone,
  isLoading = false,
  error = null,
  showDivider = true,
  className,
}: DashboardScheduleItemProps) {
  /* ==========================================================
     LOADING
  ========================================================== */

  if (isLoading) {
    return (
      <ScheduleItemSkeleton
        showDivider={showDivider}
        className={className}
      />
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error) {
    return (
      <ScheduleItemFallback
        error={error}
        showDivider={showDivider}
        className={className}
      />
    );
  }

  /* ==========================================================
     EMPTY / INVALID DATA
  ========================================================== */

  if (
    !item ||
    !item.title.trim() ||
    !Number.isFinite(item.durationMinutes) ||
    item.durationMinutes <= 0 ||
    Number.isNaN(Date.parse(item.startsAt))
  ) {
    return (
      <ScheduleItemFallback
        showDivider={showDivider}
        className={className}
      />
    );
  }

  const isCancelled =
    item.status === "cancelled";

  const time = formatScheduleTime(
    item.startsAt,
    timezone,
  );

  const sessionType = getScheduleTypeLabel(
    item.type,
  );

  const duration = formatScheduleDuration(
    item.durationMinutes,
  );

  const coachName =
    item.coach?.name?.trim() || "Unassigned";

  const statusConfig =
    DASHBOARD_SCHEDULE_STATUS_CONFIG[
      item.status
    ];

  const indicator =
    isCancelled ? "muted" : item.indicator;

  const indicatorLabel =
    `${statusConfig.label}: ${item.title}`;

  return (
    <div
      className={cn(
        ROW_CLASS_NAME,
        showDivider && DIVIDER_CLASS_NAME,
        isCancelled && "opacity-65",
        className,
      )}
      aria-label={[
        time,
        item.title,
        sessionType,
        duration,
        `Coach: ${coachName}`,
        `Status: ${statusConfig.label}`,
      ].join(", ")}
    >
      {/* Session indicator */}
      <ScheduleIndicator
        indicator={indicator}
        label={indicatorLabel}
      />

      {/* Session time */}
      <time
        dateTime={item.startsAt}
        className={cn(
          "whitespace-nowrap",
          "text-[11px] font-medium",
          "tabular-nums text-foreground",
          isCancelled && "line-through",
        )}
      >
        {time}
      </time>

      {/* Session details */}
      <div
        className={cn(
          "min-w-0 border-l",
          "border-border pl-2.5",
        )}
      >
        <p
          className={cn(
            "truncate text-[11px]",
            "font-semibold leading-4",
            "text-foreground",
            isCancelled && "line-through",
          )}
          title={item.title}
        >
          {item.title}
        </p>

        <p
          className={cn(
            "mt-0.5 truncate",
            "text-[10px] leading-4",
            "text-muted-foreground",
          )}
        >
          {sessionType} · {duration}
        </p>
      </div>

      {/* Coach name */}
      <span
        className={cn(
          "max-w-18 truncate",
          "text-right text-[10px]",
          "text-text-secondary",
          "sm:max-w-24",
        )}
        title={coachName}
      >
        {coachName}
      </span>
    </div>
  );
}