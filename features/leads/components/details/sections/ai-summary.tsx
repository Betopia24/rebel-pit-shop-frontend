import { useId } from "react";

import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import type {
  LeadAISummary,
} from "../../../types/lead-details.types";

export interface LeadAISummarySectionProps {
    summary: LeadAISummary | null;
    isLoading?: boolean;
    className?: string;
}

function getText(
  value: string | null | undefined,
): string | null {
  const normalized = value?.trim();

  return normalized || null;
}

function getKeyPoints(
  points: readonly string[],
): string[] {
  const seen = new Set<string>();

  return points.filter((point) => {
    const normalized = point.trim();

    if (!normalized || seen.has(normalized)) {
      return false;
    }

    seen.add(normalized);
    return true;
  });
}

function AISummarySkeleton() {
  return (
    <div
      aria-hidden="true"
      className="space-y-3"
    >
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-44" />
      </div>

      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-10/12" />
      </div>

      <Skeleton className="mt-3 h-20 w-full rounded-lg" />
    </div>
  );
}

function AISummaryEmpty() {
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
      <BrainCircuit
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-4 shrink-0",
          "text-muted-foreground",
        )}
      />

      <div className="min-w-0 space-y-1">
        <p className="text-[11px] font-medium text-foreground">
          No AI summary available
        </p>

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          AI-generated insights will appear
          when the lead has been analyzed.
        </p>
      </div>
    </div>
  );
}

interface AIInformationItemProps {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
    className?: string;
}

function AIInformationItem({
  icon,
  label,
  children,
  className,
}: AIInformationItemProps) {
  return (
    <div
      className={cn(
        "space-y-1.5",
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className="text-muted-foreground"
        >
          {icon}
        </span>

        <h4 className="text-[11px] font-medium text-muted-foreground">
          {label}
        </h4>
      </div>

      <div className="min-w-0">
        {children}
      </div>
    </div>
  );
}

function AIKeyPoints({
  points,
}: {
  points: readonly string[];
}) {
  const validPoints = getKeyPoints(points);

  if (validPoints.length === 0) {
    return null;
  }

  return (
    <AIInformationItem
      icon={<CheckCircle2 className="size-3.5" />}
      label="Key Points"
    >
      <ul className="space-y-2">
        {validPoints.map((point, index) => (
          <li
            key={`${index}-${point}`}
            className={cn(
              "flex items-start gap-2",
              "text-[11px] leading-relaxed",
              "text-foreground",
            )}
          >
            <CheckCircle2
              aria-hidden="true"
              className={cn(
                "mt-0.5 size-3.5 shrink-0",
                "text-success",
              )}
            />

            <span className="min-w-0 break-words">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </AIInformationItem>
  );
}

function AIRecommendedAction({
  action,
}: {
  action: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border",
        "border-gold/20 bg-gold-10",
        "p-3",
      )}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <Lightbulb
          aria-hidden="true"
          className="size-3.5 text-gold"
        />

        <h4 className="text-[11px] font-semibold text-foreground">
          Recommended Next Action
        </h4>

        <ArrowUpRight
          aria-hidden="true"
          className="ml-auto size-3.5 text-gold"
        />
      </div>

      <p
        className={cn(
          "whitespace-pre-wrap break-words",
          "text-[11px] leading-relaxed",
          "text-foreground",
        )}
      >
        {action}
      </p>
    </div>
  );
}

export function LeadAISummarySection({
  summary,
  isLoading = false,
  className,
}: LeadAISummarySectionProps) {
  const headingId = useId();

  const summaryText = getText(
    summary?.summary,
  );

  const detectedIntent = getText(
    summary?.detectedIntent,
  );

  const temperatureReason = getText(
    summary?.temperatureReason,
  );

  const recommendedAction = getText(
    summary?.recommendedNextAction,
  );

  const keyPoints = getKeyPoints(
    summary?.keyPoints ?? [],
  );

  const hasContent =
    Boolean(summaryText) ||
    Boolean(detectedIntent) ||
    Boolean(temperatureReason) ||
    keyPoints.length > 0 ||
    Boolean(recommendedAction);

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={isLoading}
      className={cn(
        "min-w-0",
        className,
      )}
    >
      {/* ======================================================
          SECTION HEADER
      ====================================================== */}

      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Sparkles
            aria-hidden="true"
            className="size-3.5 text-gold"
          />

          <h3
            id={headingId}
            className={cn(
              "text-xs font-semibold",
              "tracking-tight text-foreground",
            )}
          >
            AI Summary
          </h3>
        </div>

        {!isLoading && hasContent && (
          <Badge
            variant="outline"
            className={cn(
              "h-5 gap-1 rounded-md",
              "border-gold/20 bg-gold-10",
              "px-1.5 text-[10px]",
              "font-medium text-gold",
            )}
          >
            <Sparkles
              aria-hidden="true"
              className="size-3"
            />

            AI Generated
          </Badge>
        )}
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      {isLoading ? (
        <AISummarySkeleton />
      ) : !hasContent ? (
        <AISummaryEmpty />
      ) : (
        <div className="space-y-4">
          {/* Main AI summary */}
          {summaryText && (
            <p
              className={cn(
                "whitespace-pre-wrap break-words",
                "text-[11px] leading-relaxed",
                "text-foreground",
              )}
            >
              {summaryText}
            </p>
          )}

          {/* Detected intent */}
          {detectedIntent && (
            <AIInformationItem
              icon={<Target className="size-3.5" />}
              label="Detected Intent"
            >
              <Badge
                variant="secondary"
                className={cn(
                  "h-auto max-w-full",
                  "whitespace-normal rounded-md",
                  "px-2 py-1",
                  "text-left text-[10px]",
                  "font-medium leading-relaxed",
                  "text-foreground",
                )}
              >
                {detectedIntent}
              </Badge>
            </AIInformationItem>
          )}

          {/* Lead temperature reasoning */}
          {temperatureReason && (
            <AIInformationItem
              icon={<BrainCircuit className="size-3.5" />}
              label="Lead Temperature Reason"
            >
              <p
                className={cn(
                  "whitespace-pre-wrap break-words",
                  "text-[11px] leading-relaxed",
                  "text-foreground",
                )}
              >
                {temperatureReason}
              </p>
            </AIInformationItem>
          )}

          {/* Key insights */}
          {keyPoints.length > 0 && (
            <AIKeyPoints points={keyPoints} />
          )}

          {/* Recommended action */}
          {recommendedAction && (
            <AIRecommendedAction
              action={recommendedAction}
            />
          )}
        </div>
      )}
    </section>
  );
}