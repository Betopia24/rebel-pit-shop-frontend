import { useId } from "react"

import {
  CalendarCheck2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"

import type {
  LeadBookingInterestDetails,
  LeadPreferredTimeOfDay,
  LeadWeekday,
} from "../../../types/lead-details.types"

export interface LeadBookingInterestProps {
  bookingInterest: LeadBookingInterestDetails
  timezone?: string
  className?: string
}

const DEFAULT_TIMEZONE = "America/Chicago"

const EMPTY_VALUE = "Not specified"

const WEEKDAY_LABELS: Record<LeadWeekday, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
}

const TIME_OF_DAY_LABELS: Record<LeadPreferredTimeOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  flexible: "Flexible",
}

function normalizeValue(value: string | null | undefined): string {
  return value?.trim() || EMPTY_VALUE
}

function formatPreferredSchedule(
  startsAt: string | null,
  timezone: string
): string {
  if (!startsAt) {
    return EMPTY_VALUE
  }

  const date = new Date(startsAt)

  if (!Number.isFinite(date.getTime())) {
    return EMPTY_VALUE
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    }).format(date)
  } catch {
    return EMPTY_VALUE
  }
}

interface BookingInterestRowProps {
  icon: React.ReactNode
  label: string
  value: string
  children?: React.ReactNode
}

function BookingInterestRow({
  icon,
  label,
  value,
  children,
}: BookingInterestRowProps) {
  const isMissing = value === EMPTY_VALUE

  return (
    <div
      className={cn(
        "grid min-w-0",
        "grid-cols-[minmax(88px,30%)_minmax(0,1fr)]",
        "items-start gap-3 py-2"
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span aria-hidden="true" className="shrink-0 text-muted-foreground">
          {icon}
        </span>

        <span className="text-[11px] leading-4 text-muted-foreground">
          {label}
        </span>
      </div>

      <div className="min-w-0">
        {children ?? (
          <span
            title={value}
            className={cn(
              "block truncate text-[11px] leading-4",
              isMissing
                ? "text-muted-foreground"
                : "font-medium text-foreground"
            )}
          >
            {value}
          </span>
        )}
      </div>
    </div>
  )
}

function PreferredDays({ days }: { days: readonly LeadWeekday[] }) {
  const orderedDays: readonly LeadWeekday[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]

  const selectedDays = new Set(days)

  const validDays = orderedDays.filter((day) => selectedDays.has(day))

  if (validDays.length === 0) {
    return (
      <span className="text-[11px] text-muted-foreground">{EMPTY_VALUE}</span>
    )
  }

  return (
    <div className="flex flex-wrap gap-1">
      {validDays.map((day) => (
        <Badge
          key={day}
          variant="secondary"
          className={cn(
            "h-5 rounded-md px-1.5 py-0",
            "text-[10px] font-medium",
            "text-foreground"
          )}
        >
          {WEEKDAY_LABELS[day]}
        </Badge>
      ))}
    </div>
  )
}

function TrialRequestStatus({ requested }: { requested: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-5 w-fit gap-1 rounded-md",
        "px-1.5 py-0 text-[10px] font-medium",
        requested
          ? "border-success/20 bg-success/10 text-success"
          : "border-border bg-muted text-muted-foreground"
      )}
    >
      {requested && <CheckCircle2 aria-hidden="true" className="size-3" />}

      {requested ? "Requested" : "Not requested"}
    </Badge>
  )
}

export function LeadBookingInterest({
  bookingInterest,
  timezone = DEFAULT_TIMEZONE,
  className,
}: LeadBookingInterestProps) {
  const headingId = useId()

  const preferredClass = normalizeValue(
    bookingInterest.requestedClassName ?? bookingInterest.preferredClassType
  )

  const preferredSchedule = formatPreferredSchedule(
    bookingInterest.preferredStartsAt,
    timezone
  )

  const preferredTime = bookingInterest.preferredTimeOfDay
    ? TIME_OF_DAY_LABELS[bookingInterest.preferredTimeOfDay]
    : EMPTY_VALUE

  const interestedService = normalizeValue(bookingInterest.interestedService)

  const notes = bookingInterest.notes?.trim()

  return (
    <section aria-labelledby={headingId} className={cn("min-w-0", className)}>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <h3
        id={headingId}
        className={cn(
          "mb-2 text-xs font-semibold",
          "tracking-tight text-foreground"
        )}
      >
        Booking Interest
      </h3>

      {/* ======================================================
          BOOKING PREFERENCES
      ====================================================== */}

      <div className="divide-y divide-border/60">
        <BookingInterestRow
          icon={<CalendarCheck2 className="size-3.5" />}
          label="Preferred Class"
          value={preferredClass}
        />

        <BookingInterestRow
          icon={<CalendarClock className="size-3.5" />}
          label="Preferred Schedule"
          value={preferredSchedule}
        />

        <BookingInterestRow
          icon={<CalendarDays className="size-3.5" />}
          label="Preferred Days"
          value={
            bookingInterest.preferredDays.length > 0 ? "Selected" : EMPTY_VALUE
          }
        >
          <PreferredDays days={bookingInterest.preferredDays} />
        </BookingInterestRow>

        <BookingInterestRow
          icon={<Clock3 className="size-3.5" />}
          label="Preferred Time"
          value={preferredTime}
        />

        <BookingInterestRow
          icon={<CheckCircle2 className="size-3.5" />}
          label="Trial Status"
          value={bookingInterest.trialRequested ? "Requested" : "Not requested"}
        >
          <TrialRequestStatus requested={bookingInterest.trialRequested} />
        </BookingInterestRow>

        {bookingInterest.interestedService && (
          <BookingInterestRow
            icon={<FileText className="size-3.5" />}
            label="Interested In"
            value={interestedService}
          />
        )}
      </div>

      {/* ======================================================
          ADDITIONAL NOTES
      ====================================================== */}

      {notes && (
        <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <FileText
              aria-hidden="true"
              className="size-3.5 text-muted-foreground"
            />

            <h4 className="text-[11px] font-semibold text-foreground">
              Booking Notes
            </h4>
          </div>

          <p className="text-[11px] leading-relaxed break-words whitespace-pre-wrap text-muted-foreground">
            {notes}
          </p>
        </div>
      )}
    </section>
  )
}
