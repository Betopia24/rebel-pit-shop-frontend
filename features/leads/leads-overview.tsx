"use client"

import { useCallback, useMemo, useState } from "react"

import { LayoutDashboard, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import { LeadStats, type LeadStatData } from "./components/stats/lead-stats"
import {
  LeadFilters,
  DEFAULT_LEAD_FILTERS,
} from "./components/filters/lead-filters"

import { LeadsBoard } from "./components/board/leads-board"
import { LeadDetailsPanel } from "./components/details/lead-details-panel"

import { LeadDetailsTab } from "./components/details/tabs/details-tab"
import { LeadAIInsightsTab } from "./components/details/tabs/ai-insights-tab"
import { LeadConversationsTab } from "./components/details/tabs/conversations-tab"
import { LeadBookingsTab } from "./components/details/tabs/bookings-tab"

import {
  LEADS_MOCK,
  LEAD_COACHES_MOCK,
  LEAD_PIPELINE_STAGE_COUNTS_MOCK,
} from "./data/leads.mock"

import { getLeadDetailsMockById } from "./data/lead-details.mock"

import type { Lead, LeadId, LeadStage } from "./types/lead.types"

import type { LeadFilterValues } from "./components/filters/lead-filters"

/* ============================================================
   REBEL BOXING CLUB
   Leads — Overview
============================================================ */

/**
 * Main orchestration component for Leads.
 *
 * Responsibilities:
 *
 * - Coordinate statistics, filters and board
 * - Manage local lead stage changes
 * - Manage selected lead
 * - Render Lead Details Panel
 * - Connect all four detail tabs
 *
 * Mock data is used for UI development.
 * Backend integration comes later.
 */

/* ============================================================
   TYPES
============================================================ */

export interface LeadsOverviewProps {
  className?: string
}

/* ============================================================
   CONSTANTS
============================================================ */

const BUSINESS_TIMEZONE = "America/Chicago"
const LEAD_COACH_OPTIONS = Object.values(LEAD_COACHES_MOCK)

/* ============================================================
   HELPERS
============================================================ */

function matchesSearch(lead: Lead, search: string): boolean {
  const query = search.trim().toLowerCase()

  if (!query) return true

  const searchableValues = [
    lead.customer.name,
    lead.customer.phone,
    lead.customer.email,
    lead.customer.location,
    lead.interest.title,
    lead.interest.description,
    lead.assignedCoach?.name,
  ]

  return searchableValues.some((value) => value?.toLowerCase().includes(query))
}

function matchesFilters(lead: Lead, filters: LeadFilterValues): boolean {
  if (!matchesSearch(lead, filters.search)) {
    return false
  }

  if (filters.source !== null && lead.source !== filters.source) {
    return false
  }

  if (filters.stage !== null && lead.stage !== filters.stage) {
    return false
  }

  if (
    filters.temperature !== null &&
    lead.temperature !== filters.temperature
  ) {
    return false
  }

  if (filters.coachId !== null && lead.assignedCoach?.id !== filters.coachId) {
    return false
  }

  return true
}

function hasActiveFilters(filters: LeadFilterValues): boolean {
  return (
    filters.search.trim().length > 0 ||
    filters.source !== null ||
    filters.stage !== null ||
    filters.temperature !== null ||
    filters.coachId !== null ||
    filters.datePreset !== "all_time"
  )
}

function getDemoReferenceDate(leads: readonly Lead[]): Date {
  const latestTimestamp = leads.reduce((latest, lead) => {
    const timestamp = Date.parse(lead.createdAt)

    return timestamp > latest ? timestamp : latest
  }, Number.NEGATIVE_INFINITY)

  return Number.isFinite(latestTimestamp)
    ? new Date(latestTimestamp)
    : new Date()
}

function startOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

function endOfDay(date: Date): Date {
  const result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

function parseFilterDate(value: string | null, end = false): Date | null {
  if (!value) return null

  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) return null

  const date = new Date(year, month - 1, day)
  return end ? endOfDay(date) : startOfDay(date)
}

function getLeadDateRange(
  filters: LeadFilterValues,
  referenceDate: Date
): { from: Date; to: Date } | null {
  if (filters.datePreset === "all_time") return null

  if (filters.datePreset === "custom") {
    const from = parseFilterDate(filters.dateFrom)
    const to = parseFilterDate(filters.dateTo, true)

    return from && to ? { from, to } : null
  }

  const from = startOfDay(referenceDate)
  const to = endOfDay(referenceDate)

  if (filters.datePreset === "today") {
    return { from, to }
  }

  if (filters.datePreset === "this_week") {
    const mondayOffset = (from.getDay() + 6) % 7
    from.setDate(from.getDate() - mondayOffset)
    return { from, to }
  }

  if (filters.datePreset === "this_month") {
    from.setDate(1)
    return { from, to }
  }

  from.setDate(1)
  from.setMonth(from.getMonth() - 2)
  return { from, to }
}

function matchesDateFilter(
  lead: Lead,
  filters: LeadFilterValues,
  referenceDate: Date
): boolean {
  const range = getLeadDateRange(filters, referenceDate)

  if (!range) return true

  const createdAt = Date.parse(lead.createdAt)

  return (
    Number.isFinite(createdAt) &&
    createdAt >= range.from.getTime() &&
    createdAt <= range.to.getTime()
  )
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function LeadsOverview({ className }: LeadsOverviewProps) {
  /* ==========================================================
     STATE
  ========================================================== */

  const [leads, setLeads] = useState<Lead[]>(() => [...LEADS_MOCK])

  const [filters, setFilters] = useState<LeadFilterValues>({
    ...DEFAULT_LEAD_FILTERS,
  })

  const [selectedLeadId, setSelectedLeadId] = useState<LeadId | null>(null)

  /* ==========================================================
     DERIVED DATA
  ========================================================== */

  const filteredLeads = useMemo(() => {
    const referenceDate = getDemoReferenceDate(leads)

    return leads.filter(
      (lead) =>
        matchesFilters(lead, filters) &&
        matchesDateFilter(lead, filters, referenceDate)
    )
  }, [leads, filters])

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId) ?? null,
    [leads, selectedLeadId]
  )

  const selectedDetails = useMemo(() => {
    if (!selectedLead) return null

    const details = getLeadDetailsMockById(selectedLead.id)

    if (!details) return null

    return {
      ...details,
      lead: selectedLead,
    }
  }, [selectedLead])

  const panelOpen = selectedLeadId !== null

  const filtersActive = hasActiveFilters(filters)

  /* ==========================================================
     STATISTICS
  ========================================================== */

  /**
   * These statistics describe the small local
   * preview dataset, not the 189-lead dashboard
   * totals shown in the screenshot.
   *
   * Production statistics should come from a
   * dedicated aggregate API endpoint.
   */

  const stats = useMemo<LeadStatData[]>(() => {
    const total = leads.length

    const hot = leads.filter((lead) => lead.temperature === "hot").length

    const freeTrials = leads.filter(
      (lead) => lead.stage === "free_class_requested"
    ).length

    const confirmed = leads.filter(
      (lead) => lead.stage === "booking_confirmed"
    ).length

    const converted = leads.filter(
      (lead) => lead.stage === "membership_converted"
    ).length

    const conversionRate =
      total > 0 ? Number(((converted / total) * 100).toFixed(1)) : 0

    return [
      {
        id: "total_leads",
        value: total,
        change: null,
        history: [],
        comparisonLabel: "Sample records",
      },
      {
        id: "hot_leads",
        value: hot,
        change: null,
        history: [],
      },
      {
        id: "free_trials",
        value: freeTrials,
        change: null,
        history: [],
      },
      {
        id: "confirmed_bookings",
        value: confirmed,
        change: null,
        history: [],
      },
      {
        id: "conversion_rate",
        value: conversionRate,
        change: null,
        history: [],
      },
    ]
  }, [leads])

  /* ==========================================================
     BOARD STAGE COUNTS
  ========================================================== */

  /**
   * Full pipeline counts and preview cards
   * are different mock datasets.
   *
   * Once filters or local mutations are active,
   * use visible sample counts to avoid implying
   * server aggregates have been recomputed.
   */

  const stageCounts = useMemo(() => {
    if (filtersActive) {
      return undefined
    }

    return LEAD_PIPELINE_STAGE_COUNTS_MOCK
  }, [filtersActive])

  /* ==========================================================
     EVENTS
  ========================================================== */

  const handleLeadSelect = useCallback((leadId: LeadId) => {
    setSelectedLeadId(leadId)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedLeadId(null)
  }, [])

  const handleStageChange = useCallback(
    (leadId: LeadId, nextStage: LeadStage) => {
      setLeads((current) =>
        current.map((lead) =>
          lead.id === leadId
            ? {
                ...lead,
                stage: nextStage,
              }
            : lead
        )
      )
    },
    []
  )

  const handleClearFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_LEAD_FILTERS,
    })
  }, [])

  const handleResetDemo = useCallback(() => {
    setLeads([...LEADS_MOCK])
    setFilters({ ...DEFAULT_LEAD_FILTERS })
    setSelectedLeadId(null)
  }, [])

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      className={cn(
        "flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden",
        "bg-background",
        className
      )}
    >
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <header
        className={cn(
          "flex shrink-0 flex-wrap",
          "items-center justify-between gap-3",
          "border-b border-border",
          "bg-card px-4 py-3",
          "lg:px-5"
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex size-9 shrink-0",
              "items-center justify-center",
              "bg-gold-10 rounded-lg",
              "text-gold"
            )}
          >
            <LayoutDashboard className="size-4.5" />
          </div>

          <div className="min-w-0">
            <h1
              className={cn(
                "text-base font-semibold",
                "tracking-tight text-foreground"
              )}
            >
              Leads Pipeline
            </h1>

            <p className="text-[11px] text-muted-foreground">
              Manage prospects from first inquiry to membership conversion.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetDemo}
          className="h-8 gap-1.5 text-[11px]"
        >
          <RotateCcw className="size-3.5" />
          Reset Demo
        </Button>
      </header>

      {/* ======================================================
          PAGE BODY
      ====================================================== */}

      <div className={cn("flex min-h-0 min-w-0 flex-1", "overflow-hidden")}>
        {/* ====================================================
            MAIN AREA
        ==================================================== */}

        <main
          className={cn(
            "flex min-h-0 min-w-0 flex-1",
            "flex-col overflow-hidden"
          )}
        >
          {/* ==================================================
              STATS + FILTERS
          ================================================== */}

          <div
            className={cn(
              "shrink-0 space-y-4",
              "border-b border-border",
              "px-4 py-4 lg:px-5"
            )}
          >
            <LeadStats stats={stats} status="success" />

            <LeadFilters
              value={filters}
              onChange={setFilters}
              coaches={LEAD_COACH_OPTIONS}
            />

            <div className="flex items-center justify-between gap-3">
              <p
                className={cn(
                  "text-[11px]",
                  "text-muted-foreground",
                  "tabular-nums"
                )}
              >
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredLeads.length}
                </span>{" "}
                of {leads.length} sample leads
              </p>

              {filtersActive && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className={cn(
                    "h-7 px-2",
                    "text-[10px]",
                    "text-muted-foreground"
                  )}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          {/* ==================================================
              KANBAN BOARD
          ================================================== */}

          <div
            className={cn(
              "min-h-0 min-w-0 flex-1",
              "overflow-hidden",
              "px-4 py-4 lg:px-5"
            )}
          >
            <LeadsBoard
              leads={filteredLeads}
              stageCounts={stageCounts}
              selectedLeadId={selectedLeadId}
              onSelectLead={handleLeadSelect}
              onStageChange={handleStageChange}
              timezone={BUSINESS_TIMEZONE}
            />
          </div>
        </main>

        {/* ====================================================
            LEAD DETAILS PANEL
        ==================================================== */}

        <LeadDetailsPanel
          lead={selectedLead}
          selectedLeadId={selectedLeadId}
          open={panelOpen}
          onClose={handleCloseDetails}
          detailsContent={
            <LeadDetailsTab
              lead={selectedDetails?.lead ?? null}
              details={selectedDetails?.details ?? null}
              timezone={selectedDetails?.timezone ?? BUSINESS_TIMEZONE}
            />
          }
          aiInsightsContent={
            <LeadAIInsightsTab data={selectedDetails?.aiInsights ?? null} />
          }
          conversationsContent={
            <LeadConversationsTab
              data={selectedDetails?.conversations ?? null}
              timezone={selectedDetails?.timezone ?? BUSINESS_TIMEZONE}
            />
          }
          bookingsContent={
            <LeadBookingsTab
              data={selectedDetails?.bookings ?? null}
              timezone={selectedDetails?.timezone ?? BUSINESS_TIMEZONE}
            />
          }
        />
      </div>
    </div>
  )
}

export default LeadsOverview
