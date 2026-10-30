
import type { ReactNode } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Dumbbell,
  MapPin,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Progress,
} from "@/components/ui/progress";

import { cn } from "@/lib/utils";

import type {
  Booking,
  BookingCoach,
  BookingSessionAvailability,
} from "../../../types/booking.types";

import type {
  BookingClassDetails,
} from "../../../types/booking-details.types";


export interface BookingClassInfoProps {
    booking: Booking;
    data: BookingClassDetails;
    showDescription?: boolean;
    showAvailability?: boolean;
    className?: string;
}


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

function formatDuration(
  minutes: number | null,
): string | null {
  if (
    minutes === null ||
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return null;
  }

  const total = Math.round(minutes);
  const hours = Math.floor(total / 60);
  const remaining = total % 60;

  if (hours === 0) return `${remaining} min`;
  if (remaining === 0) return `${hours} hr`;

  return `${hours} hr ${remaining} min`;
}

function formatSchedule(
  startsAt: string,
  endsAt: string,
  timezone: string,
): {
  date: string;
  time: string;
} {
  const start = new Date(startsAt);
  const end = new Date(endsAt);

  if (
    !Number.isFinite(start.getTime()) ||
    !Number.isFinite(end.getTime())
  ) {
    return {
      date: "Date unavailable",
      time: "Time unavailable",
    };
  }

  try {
    const dateFormatter = new Intl.DateTimeFormat(
      "en-US",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: timezone,
      },
    );

    const timeFormatter = new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: timezone,
      },
    );

    return {
      date: dateFormatter.format(start),
      time: `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`,
    };
  } catch {
    return {
      date: "Date unavailable",
      time: "Time unavailable",
    };
  }
}

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

/* ============================================================
   DETAIL ROW
============================================================ */

interface DetailRowProps {
  icon: ReactNode;

  label: string;

  value: string;
}

function DetailRow({
  icon,
  label,
  value,
}: DetailRowProps) {
  return (
    <div className="grid min-w-0 grid-cols-[76px_minmax(0,1fr)] items-start gap-2 py-1.5">
      <div className="flex items-center gap-1.5 text-[10px] leading-4 text-muted-foreground">
        <span
          aria-hidden="true"
          className="shrink-0"
        >
          {icon}
        </span>

        <span>{label}</span>
      </div>

      <span
        title={value}
        className="min-w-0 text-[11px] font-medium leading-4 text-foreground"
      >
        {value}
      </span>
    </div>
  );
}

/* ============================================================
   CLASS IDENTITY
============================================================ */

function BookingClassIdentity({
  booking,
  description,
  showDescription,
}: {
  booking: Booking;
  description: string | null;
  showDescription: boolean;
}) {
  const bookingClass = booking.bookingClass;

  return (
    <div className="flex min-w-0 items-start gap-3">
      <div
        className={cn(
          "flex size-14 shrink-0",
          "items-center justify-center",
          "overflow-hidden rounded-lg",
          "border border-border bg-muted",
        )}
      >
        {bookingClass.imageUrl ? (
          <Image
            src={bookingClass.imageUrl}
            alt={bookingClass.name}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <Dumbbell
            aria-hidden="true"
            className="size-5 text-muted-foreground"
            strokeWidth={1.6}
          />
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="text-xs font-semibold leading-5 text-foreground">
          {bookingClass.name}
        </h3>

        <p className="text-[10px] leading-4 text-muted-foreground">
          {bookingClass.kind === "group_class"
            ? "Group Class"
            : bookingClass.kind === "personal_training"
              ? "Personal Training"
              : bookingClass.kind === "consultation"
                ? "Consultation"
                : "Open Gym"}
        </p>

        {showDescription &&
          description?.trim() && (
            <p className="pt-1 text-[11px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
      </div>
    </div>
  );
}

/* ============================================================
   COACH INFORMATION
============================================================ */

function BookingCoachInfo({
  coach,
}: {
  coach: BookingCoach | null;
}) {
  if (!coach) {
    return (
      <DetailRow
        icon={<UserRound className="size-3.5" />}
        label="Coach"
        value="Not assigned"
      />
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-[76px_minmax(0,1fr)] items-center gap-2 py-1.5">
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <UserRound
          aria-hidden="true"
          className="size-3.5"
        />
        Coach
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <Avatar className="size-6 shrink-0">
          {coach.avatarUrl && (
            <AvatarImage
              src={coach.avatarUrl}
              alt={coach.name}
            />
          )}

          <AvatarFallback className="bg-muted text-[9px] font-semibold text-foreground">
            {getInitials(coach.name)}
          </AvatarFallback>
        </Avatar>

        <span className="truncate text-[11px] font-medium text-foreground">
          {coach.name}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   AVAILABILITY METRIC
============================================================ */

interface AvailabilityMetricProps {
    label: string;
    value: number;
    accent?: boolean;
}

function AvailabilityMetric({
  label,
  value,
  accent = false,
}: AvailabilityMetricProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col",
        "items-center justify-center",
        "gap-1 rounded-md",
        "border border-border",
        "bg-muted/20 px-1.5 py-2.5",
      )}
    >
      <span
        className={cn(
          "text-lg font-semibold",
          "leading-none tabular-nums",
          accent
            ? "text-success"
            : "text-foreground",
        )}
      >
        {formatCount(value)}
      </span>

      <span className="text-[10px] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   SESSION AVAILABILITY
============================================================ */

function BookingClassAvailability({
  availability,
}: {
  availability: BookingSessionAvailability;
}) {
  const capacity = Math.max(
    0,
    availability.capacity,
  );

  const booked = Math.max(
    0,
    availability.booked,
  );

  const occupancyPercentage =
    capacity > 0
      ? Math.min(
          100,
          Math.max(0, (booked / capacity) * 100),
        )
      : 0;

  return (
    <section
      aria-label="Session availability"
      className="space-y-3"
    >
      <div className="flex items-center justify-between gap-2">
        <h4 className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
          <UsersRound
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />

          Session Availability
        </h4>

        <span className="text-[10px] text-muted-foreground tabular-nums">
          {Math.round(occupancyPercentage)}% booked
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <AvailabilityMetric
          label="Capacity"
          value={availability.capacity}
        />

        <AvailabilityMetric
          label="Booked"
          value={availability.booked}
        />

        <AvailabilityMetric
          label="Available"
          value={availability.available}
          accent
        />
      </div>

      <div className="space-y-1.5">
        <Progress
          value={occupancyPercentage}
          aria-label="Session occupancy"
          className="h-1.5 bg-muted"
        />

        {availability.waitlisted > 0 && (
          <p className="text-[10px] text-muted-foreground">
            {formatCount(availability.waitlisted)}{" "}
            {availability.waitlisted === 1
              ? "person"
              : "people"}{" "}
            on the waitlist
          </p>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingClassInfo({
  booking,
  data,
  showDescription = false,
  showAvailability = true,
  className,
}: BookingClassInfoProps) {
  const schedule = formatSchedule(
    booking.schedule.startsAt,
    booking.schedule.endsAt,
    booking.schedule.timezone,
  );

  const location =
    booking.schedule.location?.trim() ||
    booking.bookingClass.location?.trim() ||
    "Location not set";

  const duration =
    formatDuration(data.durationMinutes);

  return (
    <section
      aria-label="Booking class information"
      className={cn("min-w-0 space-y-4", className)}
    >
      {/* ======================================================
          SECTION TITLE
      ====================================================== */}

      <h3 className="text-xs font-semibold text-foreground">
        Class Information
      </h3>

      {/* ======================================================
          CLASS IDENTITY
      ====================================================== */}

      <BookingClassIdentity
        booking={booking}
        description={data.description}
        showDescription={showDescription}
      />

      {/* ======================================================
          SCHEDULE & COACH
      ====================================================== */}

      <div className="space-y-0.5">
        <DetailRow
          icon={
            <CalendarDays className="size-3.5" />
          }
          label="Date"
          value={schedule.date}
        />

        <DetailRow
          icon={<Clock3 className="size-3.5" />}
          label="Time"
          value={schedule.time}
        />

        {duration && (
          <DetailRow
            icon={
              <Clock3 className="size-3.5" />
            }
            label="Duration"
            value={duration}
          />
        )}

        <DetailRow
          icon={<MapPin className="size-3.5" />}
          label="Location"
          value={location}
        />

        <BookingCoachInfo
          coach={booking.coach}
        />
      </div>

      {/* ======================================================
          SESSION AVAILABILITY
      ====================================================== */}

      {showAvailability &&
        data.availability && (
          <div className="border-t border-border pt-4">
            <BookingClassAvailability
              availability={data.availability}
            />
          </div>
        )}
    </section>
  );
}

export default BookingClassInfo;
