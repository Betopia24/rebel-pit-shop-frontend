import { useId } from "react"

import { AlertCircle, UserRound } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"

import { LeadBasicInfo } from "../sections/basic-info"
import { LeadQualification } from "../sections/qualification"
import { LeadBookingInterest } from "../sections/booking-interest"
import { LeadFollowUpSection } from "../sections/follow-up"
import { LeadAISummarySection } from "../sections/ai-summary"
import { LeadConversionReadinessSection } from "../sections/conversion-readiness"

import type { Lead } from "../../../types/lead.types"

import type { LeadDetailsTabData } from "../../../types/lead-details.types"

export interface LeadDetailsTabProps {
  lead: Lead | null
  details: LeadDetailsTabData | null
  timezone?: string
  isLoading?: boolean
  error?: string | null
  className?: string
}

const DEFAULT_TIMEZONE = "America/Chicago"

function DetailsSectionSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-hidden="true" className="space-y-3">
      <Skeleton className="h-3.5 w-32" />

      <div className="space-y-3">
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            className={cn(
              "grid grid-cols-[minmax(88px,30%)_minmax(0,1fr)]",
              "items-center gap-3"
            )}
          >
            <Skeleton className="h-3 w-20" />

            <Skeleton
              className={cn("h-3", index % 2 === 0 ? "w-4/5" : "w-3/5")}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function LeadDetailsTabSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-5">
      <DetailsSectionSkeleton rows={6} />

      <Separator />

      <DetailsSectionSkeleton rows={4} />

      <Separator />

      <DetailsSectionSkeleton rows={5} />

      <Separator />

      <DetailsSectionSkeleton rows={4} />

      <Separator />

      <div className="space-y-3">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      <Separator />

      <div className="space-y-3">
        <Skeleton className="h-3.5 w-40" />
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-3 w-36" />
      </div>
    </div>
  )
}

function LeadDetailsTabEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-48 flex-col",
        "items-center justify-center gap-3",
        "rounded-lg border border-dashed",
        "border-border bg-muted/20",
        "px-4 py-8 text-center"
      )}
    >
      <div
        className={cn(
          "flex size-10 items-center justify-center",
          "rounded-lg bg-muted text-muted-foreground"
        )}
      >
        <UserRound aria-hidden="true" className="size-5" />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-foreground">
          Lead details unavailable
        </p>

        <p className="mx-auto max-w-60 text-[11px] leading-relaxed text-muted-foreground">
          Select a lead with available details to view customer information and
          qualification.
        </p>
      </div>
    </div>
  )
}

function LeadDetailsTabError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-40 flex-col",
        "items-center justify-center gap-2.5",
        "rounded-lg border border-dashed",
        "border-destructive/30",
        "bg-destructive/5",
        "px-4 py-6 text-center"
      )}
    >
      <AlertCircle aria-hidden="true" className="size-5 text-destructive" />

      <p className="text-xs font-semibold text-foreground">
        Unable to load lead details
      </p>

      <p className="max-w-60 text-[11px] leading-relaxed text-muted-foreground">
        {message}
      </p>
    </div>
  )
}

function DetailsSectionGroup({ children }: { children: React.ReactNode }) {
  return <div className="min-w-0">{children}</div>
}

export function LeadDetailsTab({
  lead,
  details,
  timezone = DEFAULT_TIMEZONE,
  isLoading = false,
  error = null,
  className,
}: LeadDetailsTabProps) {
  const contentId = useId()

  /* ==========================================================
     LOADING
  ========================================================== */

  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading lead details"
        className={cn("min-w-0", className)}
      >
        <LeadDetailsTabSkeleton />
      </div>
    )
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error) {
    return (
      <div className={cn("min-w-0", className)}>
        <LeadDetailsTabError message={error} />
      </div>
    )
  }

  /* ==========================================================
     EMPTY
  ========================================================== */

  if (!lead || !details) {
    return (
      <div className={cn("min-w-0", className)}>
        <LeadDetailsTabEmpty />
      </div>
    )
  }

  /* ==========================================================
     DETAILS CONTENT
  ========================================================== */

  return (
    <div id={contentId} className={cn("min-w-0 space-y-5", className)}>
      {/* ======================================================
          1. BASIC INFORMATION
      ====================================================== */}

      <DetailsSectionGroup>
        <LeadBasicInfo
          customer={lead.customer}
          information={details.basicInformation}
          timezone={timezone}
        />
      </DetailsSectionGroup>

      <Separator />

      {/* ======================================================
          2. LEAD QUALIFICATION
      ====================================================== */}

      <DetailsSectionGroup>
        <LeadQualification qualification={details.qualification} />
      </DetailsSectionGroup>

      <Separator />

      {/* ======================================================
          3. BOOKING INTEREST
      ====================================================== */}

      <DetailsSectionGroup>
        <LeadBookingInterest
          bookingInterest={details.bookingInterest}
          timezone={timezone}
        />
      </DetailsSectionGroup>

      <Separator />

      {/* ======================================================
          4. FOLLOW-UP
      ====================================================== */}

      <DetailsSectionGroup>
        <LeadFollowUpSection followUp={details.followUp} timezone={timezone} />
      </DetailsSectionGroup>

      <Separator />

      {/* ======================================================
          5. AI SUMMARY
      ====================================================== */}

      <DetailsSectionGroup>
        <LeadAISummarySection summary={details.aiSummary} />
      </DetailsSectionGroup>

      <Separator />

      {/* ======================================================
          6. CONVERSION READINESS
      ====================================================== */}

      <DetailsSectionGroup>
        <LeadConversionReadinessSection
          readiness={details.conversionReadiness}
        />
      </DetailsSectionGroup>
    </div>
  )
}
