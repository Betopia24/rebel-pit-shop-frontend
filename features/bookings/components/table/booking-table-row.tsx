
"use client";

import type {
  KeyboardEvent,
  MouseEvent,
} from "react";

import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  Eye,
  MessageSquareText,
  MoreHorizontal,
  Pencil,
  UserRound,
  XCircle,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

import { BookingStatusBadge } from "../shared/booking-status-badge";
import { BookingTypeBadge } from "../shared/booking-type-badge";
import { BookingSourceIcon } from "../shared/booking-source-icon";

import type {
  Booking,
  BookingAction,
  BookingId,
} from "../../types/booking.types";


export interface BookingTableRowProps {
    booking: Booking;
    selected?: boolean;
    checked?: boolean;
    onSelect: (bookingId: BookingId) => void;
    onCheckedChange?: (
        bookingId: BookingId,
        checked: boolean,
    ) => void;
    onAction?: (
        bookingId: BookingId,
        action: BookingAction,
    ) => void;
    availableActions?: readonly BookingAction[];
    disabled?: boolean;
    className?: string;
}


function formatSchedule(
  startsAt: string,
  timezone: string,
): {
  date: string;
  time: string;
  iso: string;
} {
  const date = new Date(startsAt);

  if (!Number.isFinite(date.getTime())) {
    return {
      date: "Date unavailable",
      time: "Time unavailable",
      iso: startsAt,
    };
  }

  try {
    return {
      date: new Intl.DateTimeFormat("en-US", {
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
      }).format(date),

      iso: date.toISOString(),
    };
  } catch {
    return {
      date: "Date unavailable",
      time: "Time unavailable",
      iso: startsAt,
    };
  }
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);

  return (
    words
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase() || "?"
  );
}

function formatAttendance(
  attendees: number,
  capacity: number | null,
): string {
  const count = Number.isFinite(attendees)
    ? Math.max(0, Math.trunc(attendees))
    : 0;

  if (capacity === null) {
    return String(count);
  }

  return `${count}/${Math.max(
    0,
    Math.trunc(capacity),
  )}`;
}


const BOOKING_ROW_ACTIONS = [
  {
    id: "view",
    label: "View Details",
    icon: Eye,
  },
  {
    id: "edit",
    label: "Edit Booking",
    icon: Pencil,
  },
  {
    id: "confirm",
    label: "Confirm Booking",
    icon: CheckCircle2,
  },
  {
    id: "reschedule",
    label: "Reschedule",
    icon: CalendarClock,
  },
  {
    id: "send_message",
    label: "Send Message",
    icon: MessageSquareText,
  },
  {
    id: "cancel",
    label: "Cancel Booking",
    icon: XCircle,
  },
] as const satisfies readonly {
  id: BookingAction;
  label: string;
  icon: typeof Eye;
}[];



export function BookingTableRow({
  booking,
  selected = false,
  checked = false,
  onSelect,
  onCheckedChange,
  onAction,
  availableActions = ["view"],
  disabled = false,
  className,
}: BookingTableRowProps) {
  const schedule = formatSchedule(
    booking.schedule.startsAt,
    booking.schedule.timezone,
  );

  const customer = booking.customer;
  const coach = booking.coach;
  const bookingClass = booking.bookingClass;

  const canSelectCheckbox =
    Boolean(onCheckedChange) && !disabled;

  const allowedActions = BOOKING_ROW_ACTIONS.filter(
    (action) =>
      availableActions.includes(action.id),
  );

  const handleSelect = () => {
    if (!disabled) {
      onSelect(booking.id);
    }
  };

  const handleRowKeyDown = (
    event: KeyboardEvent<HTMLTableRowElement>,
  ) => {
    if (disabled) return;

    if (
      event.target !== event.currentTarget
    ) {
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleSelect();
    }
  };

  const handleCheckboxClick = (
    event: MouseEvent,
  ) => {
    event.stopPropagation();
  };

  const handleAction = (
    action: BookingAction,
  ) => {
    if (disabled) return;

    if (action === "view") {
      onSelect(booking.id);
      return;
    }

    onAction?.(booking.id, action);
  };

  return (
    <TableRow
      data-selected={selected || undefined}
      aria-selected={selected}
      tabIndex={disabled ? -1 : 0}
      onClick={handleSelect}
      onKeyDown={handleRowKeyDown}
      className={cn(
        "group h-17 cursor-pointer",
        "border-b border-border/70",
        "transition-colors",
        "hover:bg-muted/35",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-inset",
        "focus-visible:ring-ring",
        selected &&
          "bg-gold-10/70 hover:bg-gold-10",
        disabled &&
          "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {/* ======================================================
          SELECT
      ====================================================== */}

      <TableCell
        className="w-10 px-3 py-3"
        onClick={handleCheckboxClick}
      >
        <Checkbox
          checked={checked}
          disabled={!canSelectCheckbox}
          aria-label={`Select booking ${booking.reference}`}
          onCheckedChange={(value) => {
            onCheckedChange?.(
              booking.id,
              value === true,
            );
          }}
        />
      </TableCell>

      {/* ======================================================
          DATE & TIME
      ====================================================== */}

      <TableCell className="min-w-33 px-3 py-3">
        <div className="space-y-1">
          <time
            dateTime={schedule.iso}
            className="block whitespace-nowrap text-[11px] font-semibold text-foreground tabular-nums"
          >
            {schedule.date}
          </time>

          <div className="flex items-center gap-1">
            <Clock3
              aria-hidden="true"
              className="size-3 text-muted-foreground"
            />

            <span className="text-[10px] text-muted-foreground tabular-nums">
              {schedule.time}
            </span>
          </div>
        </div>
      </TableCell>

      {/* ======================================================
          MEMBER / VISITOR
      ====================================================== */}

      <TableCell className="min-w-46 px-3 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar className="size-8 shrink-0">
            {customer.avatarUrl && (
              <AvatarImage
                src={customer.avatarUrl}
                alt={customer.name}
              />
            )}

            <AvatarFallback className="bg-muted text-[10px] font-semibold text-foreground">
              {getInitials(customer.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 space-y-0.5">
            <p
              title={customer.name}
              className="max-w-38 truncate text-[11px] font-semibold text-foreground"
            >
              {customer.name}
            </p>

            <p
              title={customer.phone ?? undefined}
              className="max-w-38 truncate text-[10px] text-muted-foreground"
            >
              {customer.phone?.trim() || "No phone"}
            </p>
          </div>
        </div>
      </TableCell>

      {/* ======================================================
          CLASS / SERVICE
      ====================================================== */}

      <TableCell className="min-w-47 px-3 py-3">
        <div className="min-w-0 space-y-1">
          <p
            title={bookingClass.name}
            className="max-w-43 truncate text-[11px] font-medium text-foreground"
          >
            {bookingClass.name}
          </p>

          <p
            title={
              booking.schedule.location ??
              bookingClass.location ??
              undefined
            }
            className="max-w-43 truncate text-[10px] text-muted-foreground"
          >
            {booking.schedule.location ??
              bookingClass.location ??
              "Location not set"}
          </p>
        </div>
      </TableCell>

      {/* ======================================================
          COACH
      ====================================================== */}

      <TableCell className="min-w-36 px-3 py-3">
        {coach ? (
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="size-6 shrink-0">
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
              className="max-w-30 truncate text-[11px] text-foreground"
            >
              {coach.name}
            </span>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <UserRound className="size-3.5" />
            Unassigned
          </span>
        )}
      </TableCell>

      {/* ======================================================
          TYPE
      ====================================================== */}

      <TableCell className="min-w-28 px-3 py-3">
        <BookingTypeBadge
          type={booking.type}
          size="sm"
        />
      </TableCell>

      {/* ======================================================
          STATUS
      ====================================================== */}

      <TableCell className="min-w-27 px-3 py-3">
        <BookingStatusBadge
          status={booking.status}
          size="sm"
        />
      </TableCell>

      {/* ======================================================
          ATTENDEES
      ====================================================== */}

      <TableCell className="min-w-20 px-3 py-3">
        <span className="text-[11px] font-medium text-foreground tabular-nums">
          {formatAttendance(
            booking.attendance.attendees,
            booking.attendance.capacity,
          )}
        </span>
      </TableCell>

      {/* ======================================================
          SOURCE
      ====================================================== */}

      <TableCell className="min-w-21 px-3 py-3">
        <BookingSourceIcon
          source={booking.source.channel}
          appearance="icon"
          size="md"
        />
      </TableCell>

      {/* ======================================================
          ACTIONS
      ====================================================== */}

      <TableCell
        className="w-12 px-3 py-3 text-right"
        onClick={handleCheckboxClick}
      >
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={
                  disabled ||
                  allowedActions.length === 0
                }
                aria-label={`Actions for booking ${booking.reference}`}
                className={cn(
                  "size-7 rounded-md",
                  "text-muted-foreground",
                  "hover:bg-muted",
                  "hover:text-foreground",
                )}
              />
            }
          >
            <MoreHorizontal
              aria-hidden="true"
              className="size-4"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="min-w-44"
          >
            {allowedActions.map(
              (action, index) => {
                const Icon = action.icon;

                const destructive =
                  action.id === "cancel";

                return (
                  <div key={action.id}>
                    {destructive && index > 0 && (
                      <DropdownMenuSeparator />
                    )}

                    <DropdownMenuItem
                      onClick={() => {
                        handleAction(action.id);
                      }}
                      className={cn(
                        "gap-2 text-xs",
                        destructive &&
                          "text-destructive focus:text-destructive",
                      )}
                    >
                      <Icon className="size-3.5" />
                      {action.label}
                    </DropdownMenuItem>
                  </div>
                );
              },
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default BookingTableRow;
