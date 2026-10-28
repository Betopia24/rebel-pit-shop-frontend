import Link from "next/link";
import { useId } from "react";

import {
  ArrowUpRight,
  CalendarCheck2,
  CalendarDays,
  Clock3,
  Dumbbell,
  UserRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type {
  LeadBookingReference,
  LeadBookingsData,
  LeadBookingStatus,
} from "../../../types/lead-details.types";

export interface LeadBookingsTabProps {
    data: LeadBookingsData | null;
    isLoading?: boolean;
    timezone?: string;
    className?: string;
}

const DEFAULT_TIMEZONE = "America/Chicago";

const EMPTY_VALUE = "Not scheduled";

const BOOKING_STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className:
      "border-warning/20 bg-warning/10 text-warning",
  },

  confirmed: {
    label: "Confirmed",
    className:
      "border-success/20 bg-success/10 text-success",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "border-destructive/20 bg-destructive/10 text-destructive",
  },

  completed: {
    label: "Completed",
    className:
      "border-success/20 bg-success/10 text-success",
  },

  no_show: {
    label: "No Show",
    className:
      "border-border bg-muted text-muted-foreground",
  },
} satisfies Record<
  LeadBookingStatus,
  {
    label: string;
    className: string;
  }
>;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function formatBookingDate(
  startsAt: string | null,
  timezone: string,
): {
  date: string;
  time: string;
} {
  if (!startsAt) {
    return {
      date: EMPTY_VALUE,
      time: EMPTY_VALUE,
    };
  }

  const date = new Date(startsAt);

  if (!Number.isFinite(date.getTime())) {
    return {
      date: EMPTY_VALUE,
      time: EMPTY_VALUE,
    };
  }

  try {
    return {
      date: new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: timezone,
      }).format(date),

      time: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: timezone,
        timeZoneName: "short",
      }).format(date),
    };
  } catch {
    return {
      date: EMPTY_VALUE,
      time: EMPTY_VALUE,
    };
  }
}

function getSafeBookingHref(
  href: string,
): string | null {
  if (
    href === "/bookings" ||
    href.startsWith("/bookings?") ||
    href.startsWith("/bookings/")
  ) {
    return href;
  }

  return null;
}

function BookingsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-8 rounded-md" />
      </div>

      {Array.from(
        { length: 3 },
        (_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-lg border border-border bg-card p-3"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-md" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>

              <Skeleton className="h-5 w-18 rounded-md" />
            </div>

            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />

            <div className="flex justify-end border-t border-border pt-2">
              <Skeleton className="h-7 w-24 rounded-md" />
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function BookingsEmpty({
  hasUnloadedBookings,
}: {
  hasUnloadedBookings: boolean;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-44 flex-col",
        "items-center justify-center gap-2.5",
        "rounded-lg border border-dashed",
        "border-border bg-muted/20",
        "px-4 py-6 text-center",
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
        <CalendarCheck2
          aria-hidden="true"
          className="size-5 text-muted-foreground"
        />
      </div>

      <p className="text-xs font-semibold text-foreground">
        {hasUnloadedBookings
          ? "Booking details unavailable"
          : "No bookings yet"}
      </p>

      <p className="max-w-60 text-[11px] leading-relaxed text-muted-foreground">
        {hasUnloadedBookings
          ? "This lead has linked bookings, but their records have not been loaded."
          : "Confirmed bookings and other booking records linked to this lead will appear here."}
      </p>
    </div>
  );
}

/* ============================================================
   BOOKING CARD
============================================================ */

interface LeadBookingCardProps {
  booking: LeadBookingReference;

  timezone: string;
}

function LeadBookingCard({
  booking,
  timezone,
}: LeadBookingCardProps) {
  const status =
    BOOKING_STATUS_CONFIG[booking.status];

  const scheduled = formatBookingDate(
    booking.startsAt,
    timezone,
  );

  const coach = booking.coach;

  const href = getSafeBookingHref(
    booking.href,
  );

  const className =
    booking.className.trim() ||
    "Unnamed class";

  return (
    <article
      className={cn(
        "min-w-0 rounded-lg",
        "border border-border bg-card",
        "p-3",
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex min-w-0 items-start gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
          <Dumbbell
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <h3
            title={className}
            className="truncate text-[11px] font-semibold leading-4 text-foreground"
          >
            {className}
          </h3>

          <p className="text-[10px] text-muted-foreground">
            Class Booking
          </p>
        </div>

        <Badge
          variant="outline"
          className={cn(
            "h-5 shrink-0 rounded-md",
            "px-1.5 py-0",
            "text-[10px] font-medium",
            status.className,
          )}
        >
          {status.label}
        </Badge>
      </div>

      {/* ======================================================
          SCHEDULE
      ====================================================== */}

      <div className="mt-3 space-y-2">
        <div className="flex min-w-0 items-center gap-2">
          <CalendarDays
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground"
          />

          <span className="text-[11px] text-muted-foreground">
            Date
          </span>

          <span
            className="ml-auto truncate text-right text-[11px] font-medium text-foreground"
            title={scheduled.date}
          >
            {scheduled.date}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <Clock3
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground"
          />

          <span className="text-[11px] text-muted-foreground">
            Time
          </span>

          <span
            className="ml-auto truncate text-right text-[11px] font-medium text-foreground"
            title={scheduled.time}
          >
            {scheduled.time}
          </span>
        </div>

        {/* Coach */}
        <div className="flex min-w-0 items-center gap-2">
          <UserRound
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground"
          />

          <span className="text-[11px] text-muted-foreground">
            Coach
          </span>

          <div className="ml-auto flex min-w-0 items-center gap-1.5">
            {coach ? (
              <>
                <Avatar className="size-5 shrink-0">
                  {coach.avatarUrl && (
                    <AvatarImage
                      src={coach.avatarUrl}
                      alt={coach.name}
                    />
                  )}

                  <AvatarFallback className="bg-muted text-[9px] font-semibold">
                    {getInitials(coach.name)}
                  </AvatarFallback>
                </Avatar>

                <span
                  title={coach.name}
                  className="truncate text-[11px] font-medium text-foreground"
                >
                  {coach.name}
                </span>
              </>
            ) : (
              <span className="text-[11px] text-muted-foreground">
                Unassigned
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <div className="mt-3 flex justify-end border-t border-border/60 pt-2.5">
        {href ? (
          <Link
            href={href}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "h-7 gap-1.5 rounded-md",
              "px-2.5 text-[10px] font-medium",
              "hover:border-gold/30",
              "hover:bg-gold-10 hover:text-gold",
            )}
            aria-label={`View booking for ${className}`}
          >
            View Booking

            <ArrowUpRight
              aria-hidden="true"
              className="size-3"
            />
          </Link>
        ) : (
          <span className="text-[10px] text-muted-foreground">
            Booking link unavailable
          </span>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function LeadBookingsTab({
  data,
  isLoading = false,
  timezone = DEFAULT_TIMEZONE,
  className,
}: LeadBookingsTabProps) {
  const headingId = useId();

  const bookings = data?.items ?? [];

  const totalCount = Math.max(
    0,
    data?.totalCount ?? 0,
  );

  // Sort by scheduled date, newest first.
  // Keep unscheduled bookings at the end.
  const sortedBookings = [...bookings].sort(
    (a, b) => {
      const aTime = a.startsAt
        ? Date.parse(a.startsAt)
        : Number.NaN;

      const bTime = b.startsAt
        ? Date.parse(b.startsAt)
        : Number.NaN;

      const aValid = Number.isFinite(aTime);
      const bValid = Number.isFinite(bTime);

      if (!aValid && !bValid) return 0;
      if (!aValid) return 1;
      if (!bValid) return -1;

      return bTime - aTime;
    },
  );

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={isLoading}
      className={cn(
        "min-w-0 space-y-3",
        className,
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <CalendarCheck2
            aria-hidden="true"
            className="size-4 text-muted-foreground"
          />

          <h2
            id={headingId}
            className="text-xs font-semibold text-foreground"
          >
            Bookings
          </h2>
        </div>

        {!isLoading && data && (
          <Badge
            variant="secondary"
            className={cn(
              "h-5 rounded-md px-1.5",
              "text-[10px] font-semibold",
              "tabular-nums",
            )}
          >
            {totalCount}
          </Badge>
        )}
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      {isLoading ? (
        <BookingsSkeleton />
      ) : sortedBookings.length === 0 ? (
        <BookingsEmpty
          hasUnloadedBookings={totalCount > 0}
        />
      ) : (
        <div className="space-y-2.5">
          {sortedBookings.map((booking) => (
            <LeadBookingCard
              key={booking.id}
              booking={booking}
              timezone={timezone}
            />
          ))}

          {totalCount > sortedBookings.length && (
            <p className="pt-1 text-center text-[10px] text-muted-foreground">
              Showing {sortedBookings.length} of{" "}
              {totalCount} linked bookings
            </p>
          )}
        </div>
      )}
    </section>
  );
}