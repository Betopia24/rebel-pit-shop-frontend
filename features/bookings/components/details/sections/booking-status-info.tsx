import type { ReactNode } from "react";

import {
  ArrowRight,
  CalendarClock,
  Check,
  Clock3,
  History,
  Info,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { BookingStatusBadge } from "../../shared/booking-status-badge";
import { BookingSourceIcon } from "../../shared/booking-source-icon";

import {
  getBookingStatusConfig,
} from "../../../config/booking-status.config";

import type {
  Booking,
  BookingStatus,
} from "../../../types/booking.types";

import type {
  BookingStatusDetails,
} from "../../../types/booking-details.types";


export interface BookingStatusInfoProps {
    booking: Booking;
    data: BookingStatusDetails;
    showHistory?: boolean;
    showAllowedTransitions?: boolean;
    showSource?: boolean;
    className?: string;
}

/* ============================================================
   FORMATTERS
============================================================ */

function formatDateTime(
  value: string | null | undefined,
  timezone: string,
): string {
  if (!value) return "Not available";

  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return "Not available";
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    }).format(date);
  } catch {
    return "Not available";
  }
}

/* ============================================================
   INFO ROW
============================================================ */

interface StatusInfoRowProps {
  icon: ReactNode;

  label: string;

  children: ReactNode;
}

function StatusInfoRow({
  icon,
  label,
  children,
}: StatusInfoRowProps) {
  return (
    <div className="grid min-w-0 grid-cols-[92px_minmax(0,1fr)] items-start gap-2 py-2">
      <span className="flex items-center gap-1.5 text-[10px] leading-4 text-muted-foreground">
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>

        {label}
      </span>

      <div className="min-w-0 text-[11px] font-medium leading-4 text-foreground">
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   STATUS TIMELINE
============================================================ */

interface StatusHistoryProps {
  data: BookingStatusDetails;

  timezone: string;
}

function StatusHistory({
  data,
  timezone,
}: StatusHistoryProps) {
  const history = [...data.history].sort(
    (a, b) =>
      Date.parse(b.changedAt) -
      Date.parse(a.changedAt),
  );

  if (history.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-border px-3 py-4 text-center text-[11px] text-muted-foreground">
        No status history available.
      </p>
    );
  }

  return (
    <ol className="space-y-0">
      {history.map((item, index) => {
        const config = getBookingStatusConfig(
          item.to,
        );

        const Icon = config.icon;
        const isLatest = index === 0;
        const isLast = index === history.length - 1;

        return (
          <li
            key={item.id}
            className="relative flex gap-3 pb-4 last:pb-0"
          >
            {/* Timeline indicator */}
            <div className="relative flex w-7 shrink-0 justify-center">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 top-7 w-px bg-border"
                />
              )}

              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex size-7",
                  "items-center justify-center",
                  "rounded-full border",
                  isLatest
                    ? cn(
                        "border-current",
                        config.iconBackgroundClassName,
                        config.iconClassName,
                      )
                    : "border-border bg-muted text-muted-foreground",
                )}
              >
                <Icon
                  className="size-3.5"
                  strokeWidth={1.8}
                />
              </span>
            </div>

            {/* Timeline information */}
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-foreground">
                  {item.from === null
                    ? "Booking created"
                    : "Status updated"}
                </span>

                {isLatest && (
                  <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                    Latest
                  </span>
                )}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                {item.from !== null && (
                  <>
                    <span className="text-[10px] text-muted-foreground">
                      {getBookingStatusConfig(item.from).label}
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className="size-3 text-muted-foreground"
                    />
                  </>
                )}

                <BookingStatusBadge
                  status={item.to}
                  size="sm"
                />
              </div>

              <p className="mt-1.5 text-[10px] text-muted-foreground">
                {formatDateTime(
                  item.changedAt,
                  timezone,
                )}
                {item.changedBy
                  ? ` · ${item.changedBy}`
                  : ""}
              </p>

              {item.reason?.trim() && (
                <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">
                  {item.reason}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ============================================================
   ALLOWED STATUS TRANSITIONS
============================================================ */

function AllowedStatusTransitions({
  statuses,
}: {
  statuses: readonly BookingStatus[];
}) {
  if (statuses.length === 0) {
    return (
      <p className="text-[10px] text-muted-foreground">
        No further status transitions are available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {statuses.map((status) => (
        <BookingStatusBadge
          key={status}
          status={status}
          size="sm"
        />
      ))}
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingStatusInfo({
  booking,
  data,
  showHistory = true,
  showAllowedTransitions = false,
  showSource = true,
  className,
}: BookingStatusInfoProps) {
  const timezone =
    booking.schedule.timezone || "UTC";

  const lastChangedAt =
    data.lastChangedAt ?? booking.updatedAt;

  return (
    <section
      aria-label="Booking status and activity"
      className={cn(
        "min-w-0 space-y-4",
        className,
      )}
    >
      {/* ======================================================
          SECTION HEADER
      ====================================================== */}

      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-foreground">
          Booking Status
        </h3>

        <BookingStatusBadge
          status={data.currentStatus}
          size="sm"
        />
      </div>

      {/* ======================================================
          CURRENT STATUS DETAILS
      ====================================================== */}

      <div className="space-y-0.5">
        <StatusInfoRow
          icon={<Check className="size-3.5" />}
          label="Status"
        >
          {getBookingStatusConfig(
            data.currentStatus,
          ).label}
        </StatusInfoRow>

        <StatusInfoRow
          icon={<Clock3 className="size-3.5" />}
          label="Updated"
        >
          {formatDateTime(
            lastChangedAt,
            timezone,
          )}
        </StatusInfoRow>

        {showSource && (
          <StatusInfoRow
            icon={<Info className="size-3.5" />}
            label="Source"
          >
            <BookingSourceIcon
              source={booking.source.channel}
              appearance="label"
              size="sm"
              showTooltip={false}
            />
          </StatusInfoRow>
        )}
      </div>

      {/* ======================================================
          AVAILABLE TRANSITIONS
      ====================================================== */}

      {showAllowedTransitions && (
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center gap-1.5">
            <CalendarClock
              aria-hidden="true"
              className="size-3.5 text-muted-foreground"
            />

            <h4 className="text-[11px] font-semibold text-foreground">
              Available Statuses
            </h4>
          </div>

          <AllowedStatusTransitions
            statuses={data.allowedTransitions}
          />

          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Status changes must be completed through an authorized booking action.
          </p>
        </div>
      )}

      {/* ======================================================
          STATUS HISTORY
      ====================================================== */}

      {showHistory && (
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex items-center gap-1.5">
            <History
              aria-hidden="true"
              className="size-3.5 text-muted-foreground"
            />

            <h4 className="text-[11px] font-semibold text-foreground">
              Status History
            </h4>
          </div>

          <StatusHistory
            data={data}
            timezone={timezone}
          />
        </div>
      )}
    </section>
  );
}

export default BookingStatusInfo;