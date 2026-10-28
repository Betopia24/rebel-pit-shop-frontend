import {
  AlertCircle,
  FileText,
  Package,
  ShieldCheck,
  TriangleAlert,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import type {
  DashboardKnowledgeMetricConfig,
  KnowledgeMetricProps,
} from "../../types/dashboard-knowledge.types";

const KNOWLEDGE_METRIC_ICONS: Record<
  DashboardKnowledgeMetricConfig["icon"],
  LucideIcon
> = {
  "file-text": FileText,
  package: Package,
  users: Users,
  "shield-check": ShieldCheck,
  "triangle-alert": TriangleAlert,
};

const numberFormatter = new Intl.NumberFormat(
  "en-US",
  {
    maximumFractionDigits: 0,
  },
);

function isValidCount(
  count: number | null,
): count is number {
  return (
    count !== null &&
    Number.isSafeInteger(count) &&
    count >= 0
  );
}

function KnowledgeMetricSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex min-w-0 items-center gap-2",
        className,
      )}
    >
      <Skeleton className="size-8 shrink-0 rounded-md" />

      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-8" />
        <Skeleton className="h-2.5 w-20 max-w-full" />
      </div>
    </div>
  );
}

export function KnowledgeMetric({
  metric,
  config,
  isLoading = false,
  error = null,
  className,
}: KnowledgeMetricProps) {
  /* ==========================================================
     LOADING
  ========================================================== */

  if (isLoading) {
    return (
      <KnowledgeMetricSkeleton
        className={className}
      />
    );
  }

  /* ==========================================================
     DATA VALIDATION
  ========================================================== */

  const hasError = Boolean(error);

  const countIsValid =
    !hasError &&
    metric !== null &&
    metric.id === config.id &&
    isValidCount(metric.count);

  const count = countIsValid
    ? metric.count
    : null;

  const isUnavailable = count === null;

  /**
   * Only highlight attention metrics when
   * the count is greater than zero.
   *
   * Example:
   * Open knowledge gaps = 3 → attention
   * Open knowledge gaps = 0 → normal
   */
  const needsAttention =
    config.emphasis === "attention" &&
    count !== null &&
    count > 0;

  const Icon = hasError
    ? AlertCircle
    : KNOWLEDGE_METRIC_ICONS[config.icon];

  const formattedCount =
    count !== null
      ? numberFormatter.format(count)
      : "—";

  const metricDescription = hasError
    ? error
    : isUnavailable
      ? "Metric currently unavailable."
      : config.description;

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2",
        className,
      )}
      role={hasError ? "status" : undefined}
      aria-label={[
        config.label,
        count !== null
          ? `${formattedCount} records`
          : "unavailable",
      ].join(": ")}
    >
      {/* Metric icon */}
      <div
        className={cn(
          "flex size-8 shrink-0",
          "items-center justify-center",
          "rounded-md",
          needsAttention
            ? "bg-warning/10 text-warning"
            : hasError
              ? "bg-destructive/10 text-destructive"
              : "bg-muted text-foreground",
        )}
      >
        <Icon
          aria-hidden="true"
          className="size-4"
          strokeWidth={1.8}
        />
      </div>

      {/* Count and label */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "text-sm font-bold leading-4",
              "tracking-tight tabular-nums",
              hasError
                ? "text-destructive"
                : needsAttention
                  ? "text-warning"
                  : isUnavailable
                    ? "text-muted-foreground"
                    : "text-foreground",
            )}
          >
            {formattedCount}
          </span>
        </div>

        {metricDescription ? (
          <Tooltip>
            <TooltipTrigger
              className={cn(
                "block max-w-full rounded-sm",
                "text-left outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
              )}
              aria-label={
                `${config.label}. ${metricDescription}`
              }
            >
              <span
                className={cn(
                  "block truncate",
                  "text-[10px] leading-4",
                  hasError
                    ? "text-destructive"
                    : "text-muted-foreground",
                )}
              >
                {config.label}
              </span>
            </TooltipTrigger>

            <TooltipContent
              side="top"
              className="max-w-56"
            >
              <p>{metricDescription}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <p
            className={cn(
              "truncate text-[10px] leading-4",
              "text-muted-foreground",
            )}
          >
            {config.label}
          </p>
        )}
      </div>
    </div>
  );
}