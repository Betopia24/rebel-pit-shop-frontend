import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  RefreshCw,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
  buttonVariants,
} from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { KnowledgeMetric } from "./knowledge-metric";

import {
  DASHBOARD_KNOWLEDGE_METRICS,
  DASHBOARD_KNOWLEDGE_ROUTE,
} from "../../config/dashboard-knowledge.config";

import type {
  DashboardKnowledgeMetric,
  DashboardKnowledgeMetricId,
  KnowledgeOverviewProps,
} from "../../types/dashboard-knowledge.types";

function createMetricLookup(
  metrics: readonly DashboardKnowledgeMetric[],
): Map<DashboardKnowledgeMetricId, DashboardKnowledgeMetric> {
  const lookup = new Map<
    DashboardKnowledgeMetricId,
    DashboardKnowledgeMetric
  >();

  for (const metric of metrics) {
    lookup.set(metric.id, metric);
  }

  return lookup;
}

function hasKnowledgeActivity(
  metrics: readonly DashboardKnowledgeMetric[],
): boolean {
  return metrics.some(
    (metric) =>
      metric.count !== null &&
      Number.isSafeInteger(metric.count) &&
      metric.count > 0,
  );
}

function hasCompleteZeroMetrics(
  metrics: readonly DashboardKnowledgeMetric[],
): boolean {
  const lookup = createMetricLookup(metrics);

  return DASHBOARD_KNOWLEDGE_METRICS.every(
    (config) =>
      lookup.get(config.id)?.count === 0,
  );
}

function KnowledgeOverviewEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-36 flex-col",
        "items-center justify-center gap-2.5",
        "rounded-lg border border-dashed border-border",
        "px-4 py-5 text-center",
      )}
    >
      <div
        className={cn(
          "flex size-10 items-center justify-center",
          "rounded-lg bg-muted text-muted-foreground",
        )}
      >
        <BookOpen
          aria-hidden="true"
          className="size-5"
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          No knowledge added yet
        </p>

        <p
          className={cn(
            "mx-auto max-w-52",
            "text-xs leading-relaxed",
            "text-muted-foreground",
          )}
        >
          Add business information to help the
          AI answer customer questions.
        </p>
      </div>
    </div>
  );
}

interface KnowledgeOverviewErrorProps {
  message?: string | null;
  onRetry?: () => void;
}

function KnowledgeOverviewError({
  message,
  onRetry,
}: KnowledgeOverviewErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-36 flex-col",
        "items-center justify-center gap-2.5",
        "rounded-lg border border-dashed",
        "border-destructive/30",
        "px-4 py-5 text-center",
      )}
    >
      <div
        className={cn(
          "flex size-10 items-center justify-center",
          "rounded-lg bg-destructive/10",
          "text-destructive",
        )}
      >
        <AlertCircle
          aria-hidden="true"
          className="size-5"
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Unable to load knowledge
        </p>

        <p
          className={cn(
            "mx-auto max-w-56",
            "text-xs leading-relaxed",
            "text-muted-foreground",
          )}
        >
          {message ||
            "Knowledge Base statistics are temporarily unavailable."}
        </p>
      </div>

      {onRetry && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onRetry}
          className="mt-1"
        >
          <RefreshCw
            aria-hidden="true"
            className="size-3.5"
          />
          Try again
        </Button>
      )}
    </div>
  );
}

interface KnowledgeMetricsGridProps {
  metrics: readonly DashboardKnowledgeMetric[];
  isLoading?: boolean;
  metricErrors?: Partial<
    Record<DashboardKnowledgeMetricId, string>
  >;
}

function KnowledgeMetricsGrid({
  metrics,
  isLoading = false,
  metricErrors = {},
}: KnowledgeMetricsGridProps) {
  const metricsById = createMetricLookup(metrics);

  return (
    <div
      className={cn(
        "grid min-w-0",
        "grid-cols-2",
        "gap-x-3 gap-y-4",
      )}
      aria-label="Knowledge Base statistics"
      aria-busy={isLoading}
    >
      {DASHBOARD_KNOWLEDGE_METRICS.map(
        (config) => (
          <KnowledgeMetric
            key={config.id}
            config={config}
            metric={
              metricsById.get(config.id) ?? null
            }
            isLoading={isLoading}
            error={metricErrors[config.id] ?? null}
          />
        ),
      )}
    </div>
  );
}

export function KnowledgeOverview({
  data,
  status,
  error = null,
  metricErrors = {},
  onRetry,
  className,
}: KnowledgeOverviewProps) {
  const isLoading = status === "loading";
  const isError = status === "error";

  const metrics = data?.metrics ?? [];

  /**
   * Preserve partial API results.
   *
   * A response with null/missing metrics is
   * not automatically considered empty.
   */
  const isEmpty =
    status === "empty" ||
    (status === "success" &&
      hasCompleteZeroMetrics(metrics));

  const showMetrics =
    !isError &&
    !isEmpty &&
    (isLoading ||
      status === "success" ||
      hasKnowledgeActivity(metrics));

  return (
    <Card
      className={cn(
        "flex h-full min-w-0 flex-col",
        "gap-0 rounded-xl",
        "border-border bg-card",
        "py-0 text-card-foreground",
        "shadow-sm",
        className,
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <CardHeader
        className={cn(
          "space-y-1",
          "px-4 pt-4 pb-3",
          "sm:px-5 sm:pt-5",
        )}
      >
        <CardTitle
          className={cn(
            "text-sm font-semibold",
            "tracking-tight text-foreground",
            "sm:text-base",
          )}
        >
          Knowledge Base
        </CardTitle>

        <CardDescription
          className={cn(
            "text-xs leading-relaxed",
            "text-muted-foreground",
          )}
        >
          Manage what the AI knows
        </CardDescription>
      </CardHeader>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <CardContent
        className={cn(
          "min-w-0 flex-1",
          "px-4 pt-2 pb-4",
          "sm:px-5",
        )}
      >
        {isError ? (
          <KnowledgeOverviewError
            message={error}
            onRetry={onRetry}
          />
        ) : isEmpty ? (
          <KnowledgeOverviewEmpty />
        ) : showMetrics ? (
          <KnowledgeMetricsGrid
            metrics={metrics}
            isLoading={isLoading}
            metricErrors={
              isLoading ? {} : metricErrors
            }
          />
        ) : (
          <KnowledgeOverviewEmpty />
        )}
      </CardContent>

      {/* ======================================================
          FOOTER ACTION
      ====================================================== */}

      <CardFooter
        className={cn(
          "mt-auto px-4 pb-4",
          "sm:px-5 sm:pb-5",
        )}
      >
        <Link
          href={DASHBOARD_KNOWLEDGE_ROUTE}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
            }),
            "h-9 w-full gap-2",
            "border-border",
            "bg-background",
            "text-xs font-medium",
            "text-foreground",
            "transition-colors",
            "hover:border-gold/30",
            "hover:bg-gold-10",
            "hover:text-gold",
            "focus-visible:ring-2",
            "focus-visible:ring-ring",
            "motion-reduce:transition-none",
          )}
        >
          Manage Knowledge

          <ArrowRight
            aria-hidden="true"
            className="size-3.5"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}