"use client"

import { useId, useMemo, useState } from "react"

import { AlertCircle, Columns3, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"

import { LeadColumn } from "./lead-column"

import { LEAD_PIPELINE_STAGES } from "../../config/lead-stages.config"

import type { Lead, LeadId, LeadStage } from "../../types/lead.types"

export interface LeadsBoardProps {
  leads: readonly Lead[]
  stageCounts?: Partial<Record<LeadStage, number>>
  visibleStages?: readonly LeadStage[] | null
  selectedLeadId?: LeadId | null
  onSelectLead?: (leadId: LeadId) => void
  onStageChange?: (leadId: LeadId, stage: LeadStage) => void
  onScheduleFollowUp?: (leadId: LeadId) => void
  onMarkConverted?: (leadId: LeadId) => void
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  stageErrors?: Partial<Record<LeadStage, string>>
  loadingMoreStages?: readonly LeadStage[]
  onRetryStage?: (stage: LeadStage) => void
  timezone?: string
  className?: string
}

const DEFAULT_TIMEZONE = "America/Chicago"
const INITIAL_VISIBLE_LEADS = 20
const VISIBLE_LEADS_INCREMENT = 20

function LeadsBoardEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-64 w-full flex-col",
        "items-center justify-center gap-3",
        "rounded-xl border border-dashed",
        "border-border bg-card",
        "px-5 py-8 text-center"
      )}
    >
      <div
        className={cn(
          "flex size-11 items-center justify-center",
          "rounded-xl bg-muted text-muted-foreground"
        )}
      >
        <Columns3 aria-hidden="true" className="size-5" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          No pipeline stages to display
        </p>

        <p
          className={cn(
            "mx-auto max-w-xs",
            "text-xs leading-relaxed",
            "text-muted-foreground"
          )}
        >
          Adjust your stage filters to show pipeline columns.
        </p>
      </div>
    </div>
  )
}

interface LeadsBoardErrorProps {
  message: string
  onRetry?: () => void
}

function LeadsBoardError({ message, onRetry }: LeadsBoardErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-64 w-full flex-col",
        "items-center justify-center gap-3",
        "rounded-xl border border-dashed",
        "border-destructive/30 bg-card",
        "px-5 py-8 text-center"
      )}
    >
      <div
        className={cn(
          "flex size-11 items-center justify-center",
          "rounded-xl bg-destructive/10",
          "text-destructive"
        )}
      >
        <AlertCircle aria-hidden="true" className="size-5" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Unable to load pipeline
        </p>

        <p
          className={cn(
            "mx-auto max-w-xs",
            "text-xs leading-relaxed",
            "text-muted-foreground"
          )}
        >
          {message}
        </p>
      </div>

      {onRetry && (
        <Button type="button" variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw aria-hidden="true" className="size-3.5" />
          Try again
        </Button>
      )}
    </div>
  )
}

function LeadsBoardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex min-w-max items-start gap-3",
        "pb-2",
        "2xl:grid 2xl:w-full 2xl:min-w-0",
        "2xl:grid-cols-6"
      )}
    >
      {LEAD_PIPELINE_STAGES.map((stage) => (
        <div
          key={stage.id}
          className={cn(
            "w-[270px] shrink-0 overflow-hidden",
            "rounded-xl border border-border",
            "bg-muted/40",
            "sm:w-[280px]",
            "2xl:w-auto 2xl:min-w-0"
          )}
        >
          <div className="space-y-2 border-b border-border p-3">
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-5 w-8 rounded-md" />
            </div>

            <Skeleton className="h-3 w-28" />
          </div>

          <div className="space-y-2.5 p-2.5">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className={cn(
                  "space-y-3 rounded-lg",
                  "border border-border bg-card p-3"
                )}
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="size-8 rounded-full" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  <Skeleton className="h-5 w-12" />
                </div>

                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-full" />

                <div className="border-t border-border pt-2.5">
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function LeadsBoard({
  leads,
  stageCounts,
  visibleStages = null,
  selectedLeadId = null,
  onSelectLead,
  onStageChange,
  onScheduleFollowUp,
  onMarkConverted,
  isLoading = false,
  error = null,
  onRetry,
  stageErrors = {},
  loadingMoreStages = [],
  onRetryStage,
  timezone = DEFAULT_TIMEZONE,
  className,
}: LeadsBoardProps) {
  const boardId = useId()
  const [visibleLeadCounts, setVisibleLeadCounts] = useState<
    Partial<Record<LeadStage, number>>
  >({})

  /* ==========================================================
     VISIBLE STAGES
  ========================================================== */

  /**
   * Always preserve configured stage order,
   * even when the caller supplies filtered
   * stages in a different order.
   */
  const stages = useMemo(() => {
    if (visibleStages === null) {
      return LEAD_PIPELINE_STAGES
    }

    const allowed = new Set(visibleStages)

    return LEAD_PIPELINE_STAGES.filter((stage) => allowed.has(stage.id))
  }, [visibleStages])

  /* ==========================================================
     GROUP LEADS BY STAGE
  ========================================================== */

  const leadsByStage = useMemo(() => {
    const groups: Record<LeadStage, Lead[]> = {
      new_inquiry: [],
      ai_qualified: [],
      free_class_requested: [],
      booking_confirmed: [],
      trial_attended: [],
      membership_converted: [],
    }

    for (const lead of leads) {
      if (groups[lead.stage]) {
        groups[lead.stage].push(lead)
      }
    }

    /**
     * Latest activity first inside each column.
     *
     * Does not mutate the original leads array.
     */
    for (const stage of LEAD_PIPELINE_STAGES) {
      groups[stage.id].sort(
        (a, b) =>
          Date.parse(b.lastActivity.occurredAt) -
          Date.parse(a.lastActivity.occurredAt)
      )
    }

    return groups
  }, [leads])

  const visibleLeadsByStage = useMemo(() => {
    const visible = {} as Record<LeadStage, Lead[]>

    for (const stage of LEAD_PIPELINE_STAGES) {
      const limit = visibleLeadCounts[stage.id] ?? INITIAL_VISIBLE_LEADS

      visible[stage.id] = leadsByStage[stage.id].slice(0, limit)
    }

    return visible
  }, [leadsByStage, visibleLeadCounts])

  /* ==========================================================
     STATES
  ========================================================== */

  const hasError = !isLoading && Boolean(error)

  const hasNoStages = !isLoading && !hasError && stages.length === 0

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      aria-label="Leads pipeline board"
      aria-busy={isLoading}
      className={cn("w-full min-w-0", className)}
    >
      {hasError ? (
        <LeadsBoardError
          message={error ?? "Please try again."}
          onRetry={onRetry}
        />
      ) : hasNoStages ? (
        <LeadsBoardEmpty />
      ) : (
        <div
          role="region"
          aria-label="Scrollable lead pipeline columns"
          tabIndex={0}
          className={cn(
            "w-full min-w-0 overflow-x-auto",
            "overscroll-x-contain",
            "pb-2",
            "[scrollbar-width:thin]",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-ring",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background"
          )}
        >
          {isLoading ? (
            <LeadsBoardSkeleton />
          ) : (
            <div
              id={boardId}
              className={cn(
                "flex min-w-max",
                "items-start gap-3",
                "2xl:grid 2xl:w-full 2xl:min-w-0",
                "2xl:grid-cols-6"
              )}
            >
              {stages.map((stage) =>
                (() => {
                  const stageLeadLimit =
                    visibleLeadCounts[stage.id] ?? INITIAL_VISIBLE_LEADS
                  const stageLeads = leadsByStage[stage.id]

                  return (
                    <LeadColumn
                      key={stage.id}
                      stage={stage.id}
                      leads={visibleLeadsByStage[stage.id]}
                      totalCount={stageCounts?.[stage.id] ?? stageLeads.length}
                      selectedLeadId={selectedLeadId}
                      onSelectLead={onSelectLead}
                      onStageChange={onStageChange}
                      onScheduleFollowUp={onScheduleFollowUp}
                      onMarkConverted={onMarkConverted}
                      isLoadingMore={loadingMoreStages.includes(stage.id)}
                      error={stageErrors[stage.id] ?? null}
                      onRetry={
                        onRetryStage ? () => onRetryStage(stage.id) : undefined
                      }
                      hasMore={stageLeads.length > stageLeadLimit}
                      onLoadMore={() => {
                        setVisibleLeadCounts((current) => ({
                          ...current,
                          [stage.id]: stageLeadLimit + VISIBLE_LEADS_INCREMENT,
                        }))
                      }}
                      timezone={timezone}
                      className="2xl:w-auto 2xl:min-w-0"
                    />
                  )
                })()
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
