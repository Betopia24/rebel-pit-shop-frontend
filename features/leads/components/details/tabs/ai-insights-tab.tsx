import { useId } from "react";
import type { ReactNode } from "react";

import {
  AlertCircle,
  ArrowUpRight,
  BrainCircuit,
  CircleHelp,
  Lightbulb,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import type {
  LeadAIInsight,
  LeadAIInsightsData,
  LeadInsightPriority,
  LeadInsightType,
} from "../../../types/lead-details.types";

export interface LeadAIInsightsTabProps {
    data: LeadAIInsightsData | null;
    isLoading?: boolean;
    className?: string;
}

interface InsightTypeConfig {
    label: string;
    icon: LucideIcon;
    iconClassName: string;
    backgroundClassName: string;
}

const INSIGHT_TYPE_CONFIG = {
  intent: {
    label: "Intent",
    icon: Target,
    iconClassName: "text-gold",
    backgroundClassName: "bg-gold-10",
  },

  interest: {
    label: "Interest",
    icon: MessageCircle,
    iconClassName: "text-foreground",
    backgroundClassName: "bg-muted",
  },

  objection: {
    label: "Objection",
    icon: CircleHelp,
    iconClassName: "text-warning",
    backgroundClassName: "bg-warning/10",
  },

  opportunity: {
    label: "Opportunity",
    icon: TrendingUp,
    iconClassName: "text-success",
    backgroundClassName: "bg-success/10",
  },

  risk: {
    label: "Risk",
    icon: ShieldAlert,
    iconClassName: "text-destructive",
    backgroundClassName: "bg-destructive/10",
  },

  recommendation: {
    label: "Recommendation",
    icon: Lightbulb,
    iconClassName: "text-gold",
    backgroundClassName: "bg-gold-10",
  },
} satisfies Record<
  LeadInsightType,
  InsightTypeConfig
>;

const INSIGHT_PRIORITY_CONFIG = {
  low: {
    label: "Low",
    className:
      "border-border bg-muted text-muted-foreground",
  },

  medium: {
    label: "Medium",
    className:
      "border-warning/20 bg-warning/10 text-warning",
  },

  high: {
    label: "High",
    className:
      "border-destructive/20 bg-destructive/10 text-destructive",
  },
} satisfies Record<
  LeadInsightPriority,
  {
    label: string;
    className: string;
  }
>;

function normalizeText(
  value: string | null | undefined,
): string | null {
  return value?.trim() || null;
}

function getConfidence(
  value: number | null,
): number | null {
  if (
    value === null ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > 1
  ) {
    return null;
  }

  return Math.round(value * 100);
}

function AIInsightsSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      <Separator />

      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />

        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-lg border border-border p-3"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="h-3.5 w-32" />
            </div>

            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      <Skeleton className="h-24 w-full rounded-lg" />
    </div>
  );
}

function AIInsightsEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-44 flex-col items-center",
        "justify-center gap-2.5 rounded-lg",
        "border border-dashed border-border",
        "bg-muted/20 px-4 py-6 text-center",
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
        <BrainCircuit
          aria-hidden="true"
          className="size-5 text-muted-foreground"
        />
      </div>

      <p className="text-xs font-semibold text-foreground">
        No AI insights available
      </p>

      <p className="max-w-60 text-[11px] leading-relaxed text-muted-foreground">
        Detected customer signals and AI
        recommendations will appear after
        the lead has been analyzed.
      </p>
    </div>
  );
}

function InsightSectionHeading({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className="text-muted-foreground"
      >
        {icon}
      </span>

      <h3 className="text-xs font-semibold text-foreground">
        {children}
      </h3>
    </div>
  );
}

function AIInsightCard({
  insight,
}: {
  insight: LeadAIInsight;
}) {
  const config =
    INSIGHT_TYPE_CONFIG[insight.type];

  const priority =
    INSIGHT_PRIORITY_CONFIG[insight.priority];

  const Icon = config.icon;

  const confidence =
    getConfidence(insight.confidence);

  return (
    <article
      className={cn(
        "min-w-0 space-y-2.5",
        "rounded-lg border border-border",
        "bg-card p-3",
      )}
    >
      {/* Heading */}
      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "flex size-8 shrink-0",
            "items-center justify-center",
            "rounded-md",
            config.backgroundClassName,
            config.iconClassName,
          )}
        >
          <Icon
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <h4 className="break-words text-[11px] font-semibold leading-4 text-foreground">
            {insight.title}
          </h4>

          <span className="text-[10px] text-muted-foreground">
            {config.label}
          </span>
        </div>

        <Badge
          variant="outline"
          className={cn(
            "h-5 shrink-0 rounded-md",
            "px-1.5 py-0",
            "text-[10px] font-medium",
            priority.className,
          )}
        >
          {priority.label}
        </Badge>
      </div>

      {/* Description */}
      <p
        className={cn(
          "whitespace-pre-wrap break-words",
          "text-[11px] leading-relaxed",
          "text-muted-foreground",
        )}
      >
        {insight.description}
      </p>

      {/* Confidence */}
      {confidence !== null && (
        <div
          className={cn(
            "flex items-center justify-between gap-2",
            "border-t border-border/60 pt-2",
          )}
        >
          <span className="text-[10px] text-muted-foreground">
            AI Confidence
          </span>

          <span className="text-[10px] font-semibold tabular-nums text-foreground">
            {confidence}%
          </span>
        </div>
      )}
    </article>
  );
}

function RecommendedNextAction({
  action,
}: {
  action: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gold/20",
        "bg-gold-10 p-3",
      )}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <Lightbulb
          aria-hidden="true"
          className="size-4 text-gold"
        />

        <h3 className="text-[11px] font-semibold text-foreground">
          Recommended Next Action
        </h3>

        <ArrowUpRight
          aria-hidden="true"
          className="ml-auto size-3.5 text-gold"
        />
      </div>

      <p className="whitespace-pre-wrap break-words text-[11px] leading-relaxed text-foreground">
        {action}
      </p>
    </div>
  );
}

export function LeadAIInsightsTab({
  data,
  isLoading = false,
  className,
}: LeadAIInsightsTabProps) {
  const headingId = useId();

  const summary = normalizeText(
    data?.summary,
  );

  const recommendedAction = normalizeText(
    data?.recommendedNextAction,
  );

  const insights = data?.insights ?? [];

  const hasContent =
    Boolean(summary) ||
    insights.length > 0 ||
    Boolean(recommendedAction);

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={isLoading}
      className={cn("min-w-0", className)}
    >
      {/* ======================================================
          TAB HEADING
      ====================================================== */}

      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Sparkles
            aria-hidden="true"
            className="size-4 text-gold"
          />

          <h2
            id={headingId}
            className="text-xs font-semibold text-foreground"
          >
            AI Insights
          </h2>
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
          TAB CONTENT
      ====================================================== */}

      {isLoading ? (
        <AIInsightsSkeleton />
      ) : !hasContent ? (
        <AIInsightsEmpty />
      ) : (
        <div className="space-y-5">
          {/* AI analysis summary */}
          {summary && (
            <div className="space-y-2">
              <InsightSectionHeading
                icon={
                  <BrainCircuit className="size-3.5" />
                }
              >
                AI Analysis Summary
              </InsightSectionHeading>

              <p className="whitespace-pre-wrap break-words text-[11px] leading-relaxed text-foreground">
                {summary}
              </p>
            </div>
          )}

          {summary && insights.length > 0 && (
            <Separator />
          )}

          {/* Detected signals */}
          {insights.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <InsightSectionHeading
                  icon={
                    <Target className="size-3.5" />
                  }
                >
                  Detected Signals
                </InsightSectionHeading>

                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {insights.length} insights
                </span>
              </div>

              <div className="space-y-2.5">
                {insights.map((insight) => (
                  <AIInsightCard
                    key={insight.id}
                    insight={insight}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recommended next action */}
          {recommendedAction && (
            <RecommendedNextAction
              action={recommendedAction}
            />
          )}

          {/* AI advisory */}
          <div className="flex items-start gap-2">
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 size-3 shrink-0 text-muted-foreground"
            />

            <p className="text-[10px] leading-relaxed text-muted-foreground">
              AI-generated assessments are
              informational. Review customer
              context before taking action.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}