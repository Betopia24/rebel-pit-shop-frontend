import Link from "next/link"

import { ArrowRight, CalendarClock, UserRound } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import {
  DASHBOARD_BOOKING_PREVIEW_LIMIT,
  DASHBOARD_BOOKING_ROUTE,
  formatDashboardBookingDateTime,
  getDashboardBookingStatusConfig,
} from "../../config/dashboard-booking.config"
import type {
  BookingRequestsProps,
  DashboardBookingRequest,
} from "../../types/dashboard-booking.types"

function BookingRow({
  request,
  timezone,
}: {
  request: DashboardBookingRequest
  timezone: string
}) {
  const status = getDashboardBookingStatusConfig(request.status)

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1.1fr)_minmax(0,1.35fr)_auto] items-center gap-x-3 gap-y-1 border-b border-border/70 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1.4fr)_minmax(0,1fr)_124px_56px] sm:gap-x-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {request.customer.name}
        </p>
        <p className="truncate text-xs text-muted-foreground sm:hidden">
          {request.coach?.name ?? "Coach pending"}
        </p>
      </div>

      <p className="min-w-0 truncate text-xs text-muted-foreground sm:text-sm">
        {request.requestedSession.title}
      </p>

      <time
        dateTime={request.preferredStartsAt ?? undefined}
        className="text-xs whitespace-nowrap text-muted-foreground"
      >
        {formatDashboardBookingDateTime(request.preferredStartsAt, timezone)}
      </time>

      <Badge
        variant="outline"
        className={cn("hidden sm:inline-flex", status.className)}
      >
        {status.label}
      </Badge>

      <p className="hidden max-w-20 min-w-0 truncate text-right text-xs text-muted-foreground sm:block">
        {request.coach?.name ?? "Pending"}
      </p>
    </div>
  )
}

function BookingRowsSkeleton() {
  return (
    <div role="status" aria-label="Loading booking requests">
      {Array.from({ length: DASHBOARD_BOOKING_PREVIEW_LIMIT }).map(
        (_, index) => (
          <div
            key={`booking-skeleton-${index}`}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 border-b border-border/70 py-3 last:border-b-0"
          >
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
        )
      )}
      <span className="sr-only">Loading booking requests.</span>
    </div>
  )
}

export function BookingRequests({
  data,
  status,
  error = null,
  onRetry,
  className,
}: BookingRequestsProps) {
  const requests =
    data?.requests.slice(0, DASHBOARD_BOOKING_PREVIEW_LIMIT) ?? []
  const isEmpty =
    status === "empty" || (status === "success" && requests.length === 0)

  return (
    <Card
      className={cn(
        "min-w-0 gap-0 rounded-xl border-border bg-card py-0 text-card-foreground shadow-sm",
        className
      )}
    >
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-x-3 gap-y-2 px-4 pt-4 pb-3 sm:px-5 sm:pt-5">
        <div className="min-w-0 space-y-1">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground sm:text-base">
            <CalendarClock aria-hidden="true" className="size-4 text-gold" />
            Booking Requests
          </CardTitle>
          <CardDescription className="text-xs leading-relaxed text-muted-foreground">
            Recent requests waiting for your team
          </CardDescription>
        </div>

        <Link
          href={DASHBOARD_BOOKING_ROUTE}
          className="hover:bg-gold-10 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-gold transition-colors hover:text-gold-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          View all
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="min-w-0 px-4 pt-1 pb-4 sm:px-5 sm:pb-5">
        {status === "loading" ? (
          <BookingRowsSkeleton />
        ) : status === "error" ? (
          <div
            role="alert"
            className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-destructive/30 px-4 py-6 text-center"
          >
            <p className="text-xs text-muted-foreground">
              {error ?? "Unable to load booking requests."}
            </p>
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="text-xs font-medium text-gold hover:text-gold-hover"
              >
                Try again
              </button>
            ) : null}
          </div>
        ) : isEmpty ? (
          <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-4 py-6 text-center">
            <UserRound
              aria-hidden="true"
              className="size-5 text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              No booking requests yet.
            </p>
          </div>
        ) : (
          <div aria-live="polite">
            <div className="mb-1 hidden grid-cols-[minmax(0,1.15fr)_minmax(0,1.4fr)_minmax(0,1fr)_124px_56px] gap-x-4 px-0 text-[11px] font-medium tracking-wide text-muted-foreground uppercase sm:grid">
              <span>Name</span>
              <span>Requested class</span>
              <span>Preferred time</span>
              <span>Status</span>
              <span className="text-right">Coach</span>
            </div>
            {requests.map((request) => (
              <BookingRow
                key={request.id}
                request={request}
                timezone={data?.timezone ?? "America/Chicago"}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
