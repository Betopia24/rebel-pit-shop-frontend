"use client"

import { useId } from "react"

import { Inbox, LoaderCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"

import { LeadCard } from "./lead-card"

import { getLeadStageConfig } from "../../config/lead-stages.config"

import type { Lead, LeadId, LeadStage } from "../../types/lead.types"

export interface LeadColumnProps {
  stage: LeadStage
  leads: readonly Lead[]
  totalCount?: number
  selectedLeadId?: LeadId | null
  onSelectLead?: (leadId: LeadId) => void
  onStageChange?: (leadId: LeadId, stage: LeadStage) => void
  onScheduleFollowUp?: (leadId: LeadId) => void
  onMarkConverted?: (leadId: LeadId) => void
  isLoading?: boolean
  isLoadingMore?: boolean
  error?: string | null
  onRetry?: () => void
  hasMore?: boolean
  onLoadMore?: () => void
  timezone?: string
  className?: string
}

const COLUMN_SKELETON_COUNT = 3

function LeadCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "space-y-3 rounded-lg",
        "border border-border",
        "bg-card p-3 shadow-sm"
      )}
    >
      <div className="flex items-start gap-2.5">
        <Skeleton className="size-8 shrink-0 rounded-full" />

        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-3.5 w-24 max-w-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-5 w-12 rounded-md" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3.5 w-28 max-w-full" />
        <Skeleton className="h-3 w-full" />
      </div>

      <div className="border-t border-border pt-2.5">
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  )
}

function LeadColumnEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-36 flex-col",
        "items-center justify-center gap-2",
        "rounded-lg border border-dashed",
        "border-border bg-card/50",
        "px-4 py-6 text-center"
      )}
    >
      <div
        className={cn(
          "flex size-9 items-center justify-center",
          "rounded-lg bg-muted text-muted-foreground"
        )}
      >
        <Inbox aria-hidden="true" className="size-4" />
      </div>

      <p className="text-xs font-medium text-foreground">
        No leads in this stage
      </p>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Leads will appear here when they reach this pipeline stage.
      </p>
    </div>
  )
}

interface LeadColumnErrorProps {
  message: string
  onRetry?: () => void
}

function LeadColumnError({ message, onRetry }: LeadColumnErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border border-dashed",
        "border-destructive/30",
        "bg-destructive/5",
        "px-3 py-5 text-center"
      )}
    >
      <p className="text-xs font-medium text-foreground">
        Unable to load leads
      </p>

      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            "mt-3 rounded-md border border-border",
            "bg-background px-3 py-1.5",
            "text-xs font-medium text-foreground",
            "transition-colors hover:bg-muted",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function LeadColumn({
  stage,
  leads,
  totalCount,
  selectedLeadId = null,
  onSelectLead,
  onStageChange,
  onScheduleFollowUp,
  onMarkConverted,
  isLoading = false,
  isLoadingMore = false,
  error = null,
  onRetry,
  hasMore = false,
  onLoadMore,
  timezone = "America/Chicago",
  className,
}: LeadColumnProps) {
  const headingId = useId()

  const config = getLeadStageConfig(stage)

  const count = totalCount ?? leads.length

  const isError = !isLoading && Boolean(error)

  const isEmpty = !isLoading && !isError && leads.length === 0

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={isLoading || isLoadingMore}
      className={cn(
        "flex h-full min-h-0 w-[270px] shrink-0",
        "flex-col overflow-hidden",
        "rounded-xl border border-border",
        "bg-muted/40",
        "sm:w-[280px]",
        className
      )}
    >
      {/* ======================================================
          STAGE HEADER
      ====================================================== */}

      <div className={cn("shrink-0 border-b border-border", "px-3 py-3")}>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <h3
            id={headingId}
            className={cn(
              "min-w-0 truncate",
              "text-xs font-semibold",
              "text-foreground"
            )}
            title={config.label}
          >
            {config.label}
          </h3>

          {isLoading ? (
            <Skeleton className="h-5 w-8 rounded-md" />
          ) : (
            <Badge
              variant="secondary"
              className={cn(
                "h-5 min-w-7 shrink-0",
                "justify-center rounded-md",
                "px-1.5 text-[10px]",
                "font-semibold tabular-nums"
              )}
            >
              {Math.max(0, count).toLocaleString("en-US")}
            </Badge>
          )}
        </div>

        <p
          className={cn(
            "mt-1 truncate",
            "text-[11px] leading-4",
            "text-muted-foreground"
          )}
          title={config.description}
        >
          {config.description}
        </p>
      </div>

      {/* ======================================================
          SCROLLABLE CARDS
      ====================================================== */}

      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto",
          "overscroll-contain",
          "p-2.5",
          "[scrollbar-width:thin]"
        )}
      >
        {isLoading ? (
          <div className="space-y-2.5">
            {Array.from({ length: COLUMN_SKELETON_COUNT }, (_, index) => (
              <LeadCardSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <LeadColumnError
            message={error ?? "Please try again."}
            onRetry={onRetry}
          />
        ) : isEmpty ? (
          <LeadColumnEmpty />
        ) : (
          <div className="space-y-2.5">
            {leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                timezone={timezone}
                isSelected={selectedLeadId === lead.id}
                onSelect={onSelectLead}
                onStageChange={onStageChange}
                onScheduleFollowUp={onScheduleFollowUp}
                onMarkConverted={onMarkConverted}
              />
            ))}

            {isLoadingMore && (
              <div
                role="status"
                className={cn(
                  "flex items-center justify-center",
                  "gap-2 py-3",
                  "text-[11px] text-muted-foreground"
                )}
              >
                <LoaderCircle
                  aria-hidden="true"
                  className="size-3.5 animate-spin"
                />
                Loading more leads...
              </div>
            )}

            {hasMore && onLoadMore && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onLoadMore}
                className="mt-1 h-8 w-full text-[11px]"
              >
                Load more leads
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
