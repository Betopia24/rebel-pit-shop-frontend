
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  UserRound,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import type {
  Booking,
  BookingSessionAvailability,
} from "../../../types/booking.types";

import type {
  BookingAttendee,
  BookingAttendeesData,
} from "../../../types/booking-details.types";


export interface BookingAttendeesTabProps {
    booking: Booking;
    data: BookingAttendeesData;
    availability?: BookingSessionAvailability | null;
    onCheckIn?: (attendeeId: BookingAttendee["id"]) => void;
    canCheckIn?: boolean;
    checkingInIds?: readonly BookingAttendee["id"][];
    disabled?: boolean;
    className?: string;
}

/* ============================================================
   HELPERS
============================================================ */

const COUNT_FORMATTER = new Intl.NumberFormat(
  "en-US",
  {
    maximumFractionDigits: 0,
  },
);

function formatCount(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "—";
  }

  return COUNT_FORMATTER.format(Math.trunc(value));
}

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

function formatDateTime(
  value: string | null | undefined,
  timezone: string,
): string | null {
  if (!value) return null;

  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return null;
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone,
    }).format(date);
  } catch {
    return null;
  }
}

function formatStatus(status: string): string {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

function isCheckedIn(
  attendee: BookingAttendee,
): boolean {
  return attendee.checkedInAt !== null;
}

/* ============================================================
   SUMMARY METRIC
============================================================ */

interface AttendeeMetricProps {
  label: string;
  value: number;
  icon: typeof UsersRound;
  accent?: boolean;
}

function AttendeeMetric({
  label,
  value,
  icon: Icon,
  accent = false,
}: AttendeeMetricProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-2",
        "rounded-lg border border-border",
        "bg-muted/20 p-3",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] text-muted-foreground">
          {label}
        </span>

        <Icon
          aria-hidden="true"
          className={cn(
            "size-3.5",
            accent
              ? "text-success"
              : "text-muted-foreground",
          )}
        />
      </div>

      <span
        className={cn(
          "text-xl font-semibold",
          "leading-none tabular-nums",
          accent
            ? "text-success"
            : "text-foreground",
        )}
      >
        {formatCount(value)}
      </span>
    </div>
  );
}

/* ============================================================
   ATTENDANCE SUMMARY
============================================================ */

function AttendanceSummary({
  data,
  availability,
}: {
  data: BookingAttendeesData;
  availability: BookingSessionAvailability | null;
}) {
  const registered = Math.max(
    0,
    data.totalCount,
  );

  const checkedIn = Math.max(
    0,
    data.checkedInCount,
  );

  const checkInPercentage =
    registered > 0
      ? Math.min(
          100,
          (checkedIn / registered) * 100,
        )
      : 0;

  const sessionCapacity =
    availability?.capacity ?? null;

  const sessionBooked =
    availability?.booked ?? null;

  const occupancyPercentage =
    sessionCapacity !== null &&
    sessionCapacity > 0 &&
    sessionBooked !== null
      ? Math.min(
          100,
          Math.max(
            0,
            (sessionBooked / sessionCapacity) * 100,
          ),
        )
      : null;

  return (
    <section
      aria-label="Attendance summary"
      className="space-y-3"
    >
      <div className="grid grid-cols-2 gap-2">
        <AttendeeMetric
          label="Registered"
          value={registered}
          icon={UsersRound}
        />

        <AttendeeMetric
          label="Checked In"
          value={checkedIn}
          icon={UserRoundCheck}
          accent
        />
      </div>

      <div className="space-y-2 rounded-lg border border-border p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-foreground">
            Check-in Progress
          </span>

          <span className="text-[10px] text-muted-foreground tabular-nums">
            {formatCount(checkedIn)} /{" "}
            {formatCount(registered)}
          </span>
        </div>

        <Progress
          value={checkInPercentage}
          aria-label="Booking check-in progress"
          className="h-1.5"
        />

        <p className="text-[10px] text-muted-foreground">
          {Math.round(checkInPercentage)}% of registered
          attendees checked in
        </p>
      </div>

      {availability && (
        <div className="space-y-2 rounded-lg border border-border bg-muted/15 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-foreground">
              Session Capacity
            </span>

            <span className="text-[10px] text-muted-foreground tabular-nums">
              {formatCount(availability.booked)} /{" "}
              {formatCount(availability.capacity)}
            </span>
          </div>

          {occupancyPercentage !== null && (
            <Progress
              value={occupancyPercentage}
              aria-label="Overall session occupancy"
              className="h-1.5"
            />
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
            <span>
              {formatCount(availability.available)}{" "}
              available seats
            </span>

            {availability.waitlisted > 0 && (
              <span>
                {formatCount(availability.waitlisted)}{" "}
                waitlisted
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   ATTENDEE STATUS
============================================================ */

function AttendeeStatusBadge({
  attendee,
}: {
  attendee: BookingAttendee;
}) {
  if (isCheckedIn(attendee)) {
    return (
      <Badge
        variant="outline"
        className={cn(
          "h-5 gap-1 rounded-md",
          "border-success/20 bg-success/10",
          "px-1.5 text-[10px] font-medium",
          "text-success shadow-none",
        )}
      >
        <Check className="size-3" />
        Checked In
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-5 rounded-md",
        "border-border bg-muted/40",
        "px-1.5 text-[10px] font-medium",
        "text-muted-foreground shadow-none",
      )}
    >
      {formatStatus(attendee.status)}
    </Badge>
  );
}

/* ============================================================
   ATTENDEE CARD
============================================================ */

interface AttendeeCardProps {
  attendee: BookingAttendee;
  timezone: string;
  onCheckIn?: BookingAttendeesTabProps["onCheckIn"];
  canCheckIn: boolean;
  isCheckingIn: boolean;
  disabled: boolean;
}

function AttendeeCard({
  attendee,
  timezone,
  onCheckIn,
  canCheckIn,
  isCheckingIn,
  disabled,
}: AttendeeCardProps) {
  const checkedIn = isCheckedIn(attendee);

  const registeredAt = formatDateTime(
    attendee.registeredAt,
    timezone,
  );

  const checkedInAt = formatDateTime(
    attendee.checkedInAt,
    timezone,
  );

  const canRequestCheckIn =
    canCheckIn &&
    Boolean(onCheckIn) &&
    !checkedIn &&
    !disabled &&
    !isCheckingIn &&
    attendee.status === "registered";

  return (
    <article
      className={cn(
        "min-w-0 rounded-lg border",
        "border-border bg-card p-3",
      )}
    >
      <div className="flex min-w-0 items-start gap-2.5">
        <Avatar className="size-9 shrink-0">
          {attendee.avatarUrl && (
            <AvatarImage
              src={attendee.avatarUrl}
              alt={attendee.name}
            />
          )}

          <AvatarFallback className="bg-muted text-[10px] font-semibold text-foreground">
            {getInitials(attendee.name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <h4 className="min-w-0 truncate text-[11px] font-semibold text-foreground">
              {attendee.name}
            </h4>

            <AttendeeStatusBadge attendee={attendee} />
          </div>

          {attendee.phone && (
            <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Phone
                aria-hidden="true"
                className="size-3 shrink-0"
              />

              <span className="truncate">
                {attendee.phone}
              </span>
            </p>
          )}

          {attendee.email && (
            <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Mail
                aria-hidden="true"
                className="size-3 shrink-0"
              />

              <span className="truncate">
                {attendee.email}
              </span>
            </p>
          )}
        </div>
      </div>

      {(registeredAt || checkedInAt) && (
        <div className="mt-3 space-y-1.5 border-t border-border pt-2.5">
          {registeredAt && (
            <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <CalendarDays
                aria-hidden="true"
                className="size-3"
              />

              Registered {registeredAt}
            </p>
          )}

          {checkedInAt && (
            <p className="flex items-center gap-1.5 text-[10px] text-success">
              <CheckCircle2
                aria-hidden="true"
                className="size-3"
              />

              Checked in {checkedInAt}
            </p>
          )}
        </div>
      )}

      {attendee.notes?.trim() && (
        <p className="mt-2 rounded-md bg-muted/30 px-2.5 py-2 text-[10px] leading-relaxed text-muted-foreground">
          {attendee.notes}
        </p>
      )}

      {canCheckIn && onCheckIn && (
        <div className="mt-3 flex justify-end border-t border-border pt-3">
          <Button
            type="button"
            size="sm"
            variant={checkedIn ? "outline" : "default"}
            disabled={!canRequestCheckIn}
            onClick={() => onCheckIn(attendee.id)}
            className="h-7 gap-1.5 rounded-md px-2.5 text-[10px]"
          >
            {checkedIn ? (
              <>
                <CheckCircle2 className="size-3.5" />
                Checked In
              </>
            ) : (
              <>
                <UserRoundCheck className="size-3.5" />
                {isCheckingIn
                  ? "Checking In..."
                  : "Check In"}
              </>
            )}
          </Button>
        </div>
      )}
    </article>
  );
}

/* ============================================================
   EMPTY STATES
============================================================ */

function AttendeesEmptyState({
  totalCount,
}: {
  totalCount: number;
}) {
  const hasUnloadedAttendees = totalCount > 0;

  return (
    <div
      role="status"
      className={cn(
        "flex min-h-38 flex-col",
        "items-center justify-center",
        "gap-2 rounded-lg",
        "border border-dashed border-border",
        "bg-muted/15 px-5 py-6",
        "text-center",
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        {hasUnloadedAttendees ? (
          <Clock3 className="size-4 text-muted-foreground" />
        ) : (
          <UserRound className="size-4 text-muted-foreground" />
        )}
      </div>

      <h4 className="text-[11px] font-semibold text-foreground">
        {hasUnloadedAttendees
          ? "Attendee details unavailable"
          : "No registered attendees"}
      </h4>

      <p className="max-w-64 text-[10px] leading-relaxed text-muted-foreground">
        {hasUnloadedAttendees
          ? "This booking has registered attendees, but their individual records have not been loaded."
          : "Attendees will appear here when someone registers for this booking."}
      </p>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingAttendeesTab({
  booking,
  data,
  availability = null,
  onCheckIn,
  canCheckIn = false,
  checkingInIds = [],
  disabled = false,
  className,
}: BookingAttendeesTabProps) {
  const timezone =
    booking.schedule.timezone || "UTC";

  const checkingInSet = new Set(checkingInIds);

  const visibleCount = data.items.length;

  const missingCount = Math.max(
    0,
    data.totalCount - visibleCount,
  );

  return (
    <div
      className={cn(
        "min-w-0 space-y-4 pb-4",
        className,
      )}
    >
      {/* ======================================================
          ATTENDANCE SUMMARY
      ====================================================== */}

      <AttendanceSummary
        data={data}
        availability={availability}
      />

      <Separator />

      {/* ======================================================
          ATTENDEES HEADER
      ====================================================== */}

      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <UsersRound
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />

          Registered Attendees
        </h3>

        <Badge
          variant="outline"
          className={cn(
            "h-5 rounded-md",
            "border-border bg-muted/30",
            "px-1.5 text-[10px]",
            "font-medium text-muted-foreground",
          )}
        >
          {formatCount(data.totalCount)}
        </Badge>
      </div>

      {/* ======================================================
          ATTENDEE LIST
      ====================================================== */}

      {visibleCount === 0 ? (
        <AttendeesEmptyState
          totalCount={data.totalCount}
        />
      ) : (
        <div className="space-y-2">
          {data.items.map((attendee) => (
            <AttendeeCard
              key={attendee.id}
              attendee={attendee}
              timezone={timezone}
              onCheckIn={onCheckIn}
              canCheckIn={canCheckIn}
              isCheckingIn={checkingInSet.has(
                attendee.id,
              )}
              disabled={disabled}
            />
          ))}

          {missingCount > 0 && (
            <p
              role="status"
              className="rounded-md border border-dashed border-border px-3 py-2.5 text-center text-[10px] text-muted-foreground"
            >
              {formatCount(missingCount)} additional{" "}
              {missingCount === 1
                ? "attendee record is"
                : "attendee records are"}{" "}
              not loaded.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingAttendeesTab;
