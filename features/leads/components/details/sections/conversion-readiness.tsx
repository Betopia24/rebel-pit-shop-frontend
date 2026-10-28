import { useId } from "react";

import {
  AlertCircle,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  LockKeyhole,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import type {
  LeadConversionReadiness,
  LeadConversionReadinessStatus,
  LeadReadinessItem,
} from "../../../types/lead-details.types";

export interface LeadConversionReadinessProps {
    readiness: LeadConversionReadiness | null;
    isLoading?: boolean;
    className?: string;
}

interface ReadinessStatusConfig {
  label: string;
  className: string;
}

const READINESS_STATUS_CONFIG = {
  not_ready: {
    label: "Not Ready",
    className:
      "border-border bg-muted text-muted-foreground",
  },

  in_progress: {
    label: "In Progress",
    className:
      "border-warning/20 bg-warning/10 text-warning",
  },

  ready: {
    label: "Ready",
    className:
      "border-success/20 bg-success/10 text-success",
  },

  converted: {
    label: "Converted",
    className:
      "border-success/20 bg-success/10 text-success",
  },
} satisfies Record<
  LeadConversionReadinessStatus,
  ReadinessStatusConfig
>;

function getValidScore(
  value: number | null,
): number | null {
  if (
    value === null ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > 100
  ) {
    return null;
  }

  return value;
}

function getCompletedCount(
  items: readonly LeadReadinessItem[],
): number {
  return items.reduce(
    (count, item) =>
      count + (item.completed ? 1 : 0),
    0,
  );
}

function ConversionReadinessSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-md" />
        <Skeleton className="h-5 w-12" />
      </div>

      <Skeleton className="h-2 w-full rounded-full" />

      <Skeleton className="h-3 w-40" />

      <div className="space-y-3 pt-1">
        {Array.from(
          { length: 4 },
          (_, index) => (
            <div
              key={index}
              className="flex items-start gap-2"
            >
              <Skeleton className="size-4 shrink-0 rounded-full" />

              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-4/5" />

                {index > 1 && (
                  <Skeleton className="h-3 w-full" />
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function ConversionReadinessEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-2.5",
        "rounded-lg border border-dashed",
        "border-border bg-muted/20",
        "px-3 py-3",
      )}
    >
      <ClipboardCheck
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-4 shrink-0",
          "text-muted-foreground",
        )}
      />

      <div className="min-w-0 space-y-1">
        <p className="text-[11px] font-medium text-foreground">
          Readiness not evaluated
        </p>

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Conversion readiness will appear
          when the lead has been evaluated.
        </p>
      </div>
    </div>
  );
}

interface ReadinessChecklistItemProps {
  item: LeadReadinessItem;
}

function ReadinessChecklistItem({
  item,
}: ReadinessChecklistItemProps) {
  const label = item.label.trim();

  const description =
    item.description?.trim() || null;

  const Icon = item.completed
    ? CheckCircle2
    : Circle;

  return (
    <li
      className={cn(
        "flex min-w-0 items-start gap-2",
        "py-1",
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-3.5 shrink-0",
          item.completed
            ? "text-success"
            : "text-muted-foreground",
        )}
      />

      <div className="min-w-0 flex-1 space-y-0.5">
        <p
          className={cn(
            "break-words text-[11px]",
            "font-medium leading-4",
            item.completed
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          {label || "Unnamed requirement"}
        </p>

        {description && (
          <p
            className={cn(
              "break-words text-[10px]",
              "leading-relaxed",
              "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </li>
  );
}

interface ReadinessChecklistProps {
  items: readonly LeadReadinessItem[];
  headingId: string;
}

function ReadinessChecklist({
  items,
  headingId,
}: ReadinessChecklistProps) {
  if (items.length === 0) {
    return (
      <p className="text-[11px] text-muted-foreground">
        No readiness requirements available.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <h4
        id={headingId}
        className="text-[11px] font-semibold text-foreground"
      >
        Readiness Checklist
      </h4>

      <ul
        aria-labelledby={headingId}
        className="space-y-1"
      >
        {items.map((item) => (
          <ReadinessChecklistItem
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

export function LeadConversionReadinessSection({
  readiness,
  isLoading = false,
  className,
}: LeadConversionReadinessProps) {
  const headingId = useId();
  const checklistId = useId();

  const score = readiness
    ? getValidScore(readiness.score)
    : null;

  const statusConfig = readiness
    ? READINESS_STATUS_CONFIG[readiness.status]
    : null;

  const items = readiness?.items ?? [];

  const totalCount = items.length;
  const completedCount = getCompletedCount(items);

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={isLoading}
      className={cn("min-w-0", className)}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-3 flex items-center gap-2">
        <ClipboardCheck
          aria-hidden="true"
          className="size-3.5 text-muted-foreground"
        />

        <h3
          id={headingId}
          className={cn(
            "text-xs font-semibold",
            "tracking-tight text-foreground",
          )}
        >
          Conversion Readiness
        </h3>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      {isLoading ? (
        <ConversionReadinessSkeleton />
      ) : !readiness ? (
        <ConversionReadinessEmpty />
      ) : (
        <div className="space-y-4">
          {/* Status and readiness score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              {statusConfig && (
                <Badge
                  variant="outline"
                  className={cn(
                    "h-5 rounded-md",
                    "px-1.5 py-0",
                    "text-[10px] font-medium",
                    statusConfig.className,
                  )}
                >
                  {statusConfig.label}
                </Badge>
              )}

              <span
                className={cn(
                  "text-sm font-semibold",
                  "tracking-tight tabular-nums",
                  score !== null
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {score !== null
                  ? `${Math.round(score)}%`
                  : "Not scored"}
              </span>
            </div>

            {/* Score progress */}
            {score !== null ? (
              <Progress
                value={score}
                aria-label="Lead conversion readiness"
                className="h-2"
              />
            ) : (
              <div
                className={cn(
                  "flex items-center gap-1.5",
                  "text-[11px]",
                  "text-muted-foreground",
                )}
              >
                <LockKeyhole
                  aria-hidden="true"
                  className="size-3.5"
                />

                Readiness score unavailable
              </div>
            )}

            {/* Completion summary */}
            {totalCount > 0 && (
              <p
                className={cn(
                  "text-[11px]",
                  "leading-relaxed",
                  "text-muted-foreground",
                  "tabular-nums",
                )}
              >
                <span className="font-medium text-foreground">
                  {completedCount} of {totalCount}
                </span>{" "}
                requirements completed
              </p>
            )}
          </div>

          {/* Requirements checklist */}
          <ReadinessChecklist
            items={items}
            headingId={checklistId}
          />

          {/* Readiness notice */}
          {readiness.status === "ready" &&
            score !== null && (
              <div
                className={cn(
                  "flex items-start gap-2",
                  "rounded-lg border",
                  "border-success/20",
                  "bg-success/5 p-3",
                )}
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-3.5 shrink-0 text-success"
                />

                <p className="text-[11px] leading-relaxed text-foreground">
                  This lead meets the configured
                  conversion-readiness criteria.
                </p>
              </div>
            )}

          {readiness.status === "converted" && (
            <div
              className={cn(
                "flex items-start gap-2",
                "rounded-lg border",
                "border-success/20",
                "bg-success/5 p-3",
              )}
            >
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-success"
              />

              <p className="text-[11px] leading-relaxed text-foreground">
                This lead has converted to a
                membership.
              </p>
            </div>
          )}

          {readiness.status === "not_ready" &&
            totalCount > 0 && (
              <div className="flex items-start gap-2">
                <AlertCircle
                  aria-hidden="true"
                  className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
                />

                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Some requirements must be
                  completed before conversion.
                </p>
              </div>
            )}
        </div>
      )}
    </section>
  );
}