import { AlertCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import type {
  DashboardPipelineStage,
  DashboardPipelineStageConfig,
  PipelineStageProps,
} from "../../types/dashboard-pipeline.types";

export interface DashboardPipelineStageProps
  extends Omit<PipelineStageProps, "stage"> {
  stage: DashboardPipelineStage | null;
  isLoading?: boolean;
  error?: string | null;
}

const CHEVRON_VIEWBOX = "0 0 100 64";

const STAGE_COLORS: Record<
  DashboardPipelineStageConfig["colorLevel"],
  string
> = {
  1: "text-gold",
  2: "text-gold/75",
  3: "text-gold/55",
  4: "text-gold/35",
  5: "text-gold/20",
  6: "text-gold/10",
};

const numberFormatter = new Intl.NumberFormat(
  "en-US",
);

const percentageFormatter = new Intl.NumberFormat(
  "en-US",
  {
    maximumFractionDigits: 0,
  },
);

function formatCount(value: number): string {
  return numberFormatter.format(value);
}

function formatConversion(
  value: number | null,
): string {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  return `${percentageFormatter.format(value)}%`;
}

function getChevronPath(
  position: PipelineStageProps["position"],
): string {
  if (position === "first") {
    return [
      "M 2 1",
      "L 82 1",
      "L 99 32",
      "L 82 63",
      "L 2 63",
      "Z",
    ].join(" ");
  }

  return [
    "M 1 1",
    "L 82 1",
    "L 99 32",
    "L 82 63",
    "L 1 63",
    "L 18 32",
    "Z",
  ].join(" ");
}

interface PipelineChevronProps {
  position: PipelineStageProps["position"];
  colorLevel: DashboardPipelineStageConfig["colorLevel"];
}

function PipelineChevron({
  position,
  colorLevel,
}: PipelineChevronProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={CHEVRON_VIEWBOX}
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none",
        "absolute inset-0 size-full",
        STAGE_COLORS[colorLevel],
      )}
    >
      <path
        d={getChevronPath(position)}
        fill="currentColor"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function PipelineStageSkeleton({
  position,
  colorLevel,
  className,
}: {
  position: PipelineStageProps["position"];
  colorLevel: DashboardPipelineStageConfig["colorLevel"];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center",
        className,
      )}
      aria-hidden="true"
    >
      {/* Chevron skeleton */}
      <div className="relative h-16 w-full sm:h-18">
        <PipelineChevron
          position={position}
          colorLevel={colorLevel}
        />

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Skeleton className="h-5 w-10 rounded-sm bg-foreground/15" />
        </div>
      </div>

      {/* Label skeleton */}
      <div className="mt-2 flex min-h-10 w-full flex-col items-center gap-1.5 px-1">
        <Skeleton className="h-2.5 w-4/5 max-w-24" />
        <Skeleton className="h-2.5 w-1/2 max-w-16" />
      </div>

      {/* Conversion skeleton */}
      <Skeleton className="mt-2 h-3 w-9" />
    </div>
  );
}

interface PipelineStageFallbackProps {
  config: DashboardPipelineStageConfig;
  position: PipelineStageProps["position"];
  error?: string | null;
  className?: string;
}

function PipelineStageFallback({
  config,
  position,
  error,
  className,
}: PipelineStageFallbackProps) {
  const isError = Boolean(error);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center",
        className,
      )}
      aria-label={
        isError
          ? `${config.label}: unavailable`
          : `${config.label}: no data available`
      }
    >
      <div className="relative h-16 w-full sm:h-18">
        <PipelineChevron
          position={position}
          colorLevel={config.colorLevel}
        />

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {isError ? (
            <AlertCircle
              aria-hidden="true"
              className="size-4 text-destructive"
            />
          ) : (
            <span className="text-lg font-bold tabular-nums text-foreground/50 sm:text-xl">
              —
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 flex min-h-10 w-full items-start justify-center px-1">
        <p
          className="text-center text-[10px] leading-4 font-medium text-foreground sm:text-[11px]"
          title={config.label}
        >
          {config.label}
        </p>
      </div>

      <p
        className={cn(
          "mt-1 text-center text-[10px] leading-4",
          isError
            ? "text-destructive"
            : "text-muted-foreground",
        )}
        title={error ?? undefined}
        role={isError ? "alert" : undefined}
      >
        {isError ? "Unavailable" : "—"}
      </p>
    </div>
  );
}

export function PipelineStage({
  stage,
  config,
  position,
  isLoading = false,
  error = null,
  className,
}: DashboardPipelineStageProps) {
  /* ==========================================================
     LOADING
  ========================================================== */

  if (isLoading) {
    return (
      <PipelineStageSkeleton
        position={position}
        colorLevel={config.colorLevel}
        className={className}
      />
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error) {
    return (
      <PipelineStageFallback
        config={config}
        position={position}
        error={error}
        className={className}
      />
    );
  }

  /* ==========================================================
     EMPTY / INVALID DATA
  ========================================================== */

  if (
    !stage ||
    !Number.isSafeInteger(stage.count) ||
    stage.count < 0 ||
    stage.id !== config.id
  ) {
    return (
      <PipelineStageFallback
        config={config}
        position={position}
        className={className}
      />
    );
  }

  const isEmpty = stage.count === 0;

  const count = formatCount(stage.count);

  const conversion = formatConversion(
    stage.conversionRate,
  );

  /* ==========================================================
     NORMAL STATE
  ========================================================== */

  return (
    <div
      className={cn(
        "group flex min-w-0 flex-col items-center",
        className,
      )}
      aria-label={[
        config.label,
        `${count} leads`,
        stage.conversionRate !== null
          ? `${conversion} conversion from initial inquiries`
          : "Conversion unavailable",
      ].join(", ")}
    >
      {/* Chevron */}
      <div className="relative h-16 w-full sm:h-18">
        <PipelineChevron
          position={position}
          colorLevel={config.colorLevel}
        />

        {/* Main count */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <span
            className={cn(
              "font-bold tabular-nums tracking-tight",
              "text-base sm:text-lg lg:text-xl",
              isEmpty
                ? "text-foreground/50"
                : "text-foreground",
            )}
          >
            {count}
          </span>
        </div>
      </div>

      {/* Stage label */}
      <div className="mt-2 flex min-h-10 w-full items-start justify-center px-1">
        <p
          className={cn(
            "max-w-28 text-center",
            "text-[10px] leading-4",
            "font-medium text-foreground",
            "sm:text-[11px]",
          )}
          title={config.description ?? config.label}
        >
          {config.label}
        </p>
      </div>

      {/* Conversion percentage */}
      <p
        className={cn(
          "mt-1 text-center",
          "text-[10px] leading-4",
          "tabular-nums",
          "text-muted-foreground",
        )}
      >
        {conversion}
      </p>
    </div>
  );
}