
import type {
  LucideIcon,
} from "lucide-react";

import {
  CalendarClock,
  CheckCircle2,
  CircleCheckBig,
  Clock3,
  UserX,
  XCircle,
} from "lucide-react";

import type {
  BookingStatus,
} from "../types/booking.types";



export interface BookingStatusConfig {
    value: BookingStatus;
    label: string;
    shortLabel: string;
    description: string;
    icon: LucideIcon;
    badgeClassName: string;
    iconClassName: string;
    iconBackgroundClassName: string;
    dotClassName: string;
}

export interface BookingStatusOption {
    value: BookingStatus;
    label: string;
}


export const BOOKING_STATUS_CONFIG = {
  pending: {
    value: "pending",

    label: "Pending",

    shortLabel: "Pending",

    description:
      "The booking is awaiting confirmation.",

    icon: Clock3,

    badgeClassName:
      "border-warning/20 bg-warning/10 text-warning",

    iconClassName:
      "text-warning",

    iconBackgroundClassName:
      "bg-warning/10",

    dotClassName:
      "bg-warning",
  },

  confirmed: {
    value: "confirmed",

    label: "Confirmed",

    shortLabel: "Confirmed",

    description:
      "The booking has been confirmed.",

    icon: CheckCircle2,

    badgeClassName:
      "border-success/20 bg-success/10 text-success",

    iconClassName:
      "text-success",

    iconBackgroundClassName:
      "bg-success/10",

    dotClassName:
      "bg-success",
  },

  waitlist: {
    value: "waitlist",

    label: "Waitlist",

    shortLabel: "Waitlist",

    description:
      "The customer is waiting for an available spot.",

    icon: CalendarClock,

    badgeClassName:
      "border-warning/20 bg-warning/10 text-warning",

    iconClassName:
      "text-warning",

    iconBackgroundClassName:
      "bg-warning/10",

    dotClassName:
      "bg-warning",
  },

  cancelled: {
    value: "cancelled",

    label: "Cancelled",

    shortLabel: "Cancelled",

    description:
      "The booking has been cancelled.",

    icon: XCircle,

    badgeClassName:
      "border-destructive/20 bg-destructive/10 text-destructive",

    iconClassName:
      "text-destructive",

    iconBackgroundClassName:
      "bg-destructive/10",

    dotClassName:
      "bg-destructive",
  },

  completed: {
    value: "completed",

    label: "Completed",

    shortLabel: "Completed",

    description:
      "The scheduled booking has been completed.",

    icon: CircleCheckBig,

    badgeClassName:
      "border-success/20 bg-success/10 text-success",

    iconClassName:
      "text-success",

    iconBackgroundClassName:
      "bg-success/10",

    dotClassName:
      "bg-success",
  },

  no_show: {
    value: "no_show",

    label: "No Show",

    shortLabel: "No Show",

    description:
      "The customer did not attend the scheduled booking.",

    icon: UserX,

    badgeClassName:
      "border-destructive/20 bg-destructive/10 text-destructive",

    iconClassName:
      "text-destructive",

    iconBackgroundClassName:
      "bg-destructive/10",

    dotClassName:
      "bg-destructive",
  },
} satisfies Record<
  BookingStatus,
  BookingStatusConfig
>;


export const BOOKING_STATUS_ORDER = [
  "pending",
  "confirmed",
  "waitlist",
  "completed",
  "cancelled",
  "no_show",
] as const satisfies readonly BookingStatus[];


export const BOOKING_STATUS_OPTIONS:
  readonly BookingStatusOption[] = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "waitlist",
    label: "Waitlist",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "no_show",
    label: "No Show",
  },
];


export const ACTIVE_BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "waitlist",
] as const satisfies readonly BookingStatus[];


export const TERMINAL_BOOKING_STATUSES = [
  "completed",
  "cancelled",
  "no_show",
] as const satisfies readonly BookingStatus[];


export function getBookingStatusConfig(
  status: BookingStatus,
): BookingStatusConfig {
  return BOOKING_STATUS_CONFIG[status];
}

export function getBookingStatusLabel(
  status: BookingStatus,
): string {
  return BOOKING_STATUS_CONFIG[status].label;
}


export function isBookingStatus(
  value: unknown,
): value is BookingStatus {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(
      BOOKING_STATUS_CONFIG,
      value,
    )
  );
}


export function isActiveBookingStatus(
  status: BookingStatus,
): boolean {
  return (
    status === "pending" ||
    status === "confirmed" ||
    status === "waitlist"
  );
}


export function isFinalBookingStatus(
  status: BookingStatus,
): boolean {
  return (
    status === "completed" ||
    status === "cancelled" ||
    status === "no_show"
  );
}


export function getBookingStatusBadgeClassName(
  status: BookingStatus,
): string {
  return BOOKING_STATUS_CONFIG[status]
    .badgeClassName;
}


export function getBookingStatusDotClassName(
  status: BookingStatus,
): string {
  return BOOKING_STATUS_CONFIG[status]
    .dotClassName;
}


export function getBookingStatusIcon(
  status: BookingStatus,
): LucideIcon {
  return BOOKING_STATUS_CONFIG[status]
    .icon;
}


export type BookingStatusCounts = Record<
  BookingStatus,
  number
>;

export function createEmptyBookingStatusCounts():
  BookingStatusCounts {
  return {
    pending: 0,
    confirmed: 0,
    waitlist: 0,
    completed: 0,
    cancelled: 0,
    no_show: 0,
  };
}


export function getTotalBookingStatusCount(
  counts: BookingStatusCounts,
): number {
  return BOOKING_STATUS_ORDER.reduce(
    (total, status) =>
      total + counts[status],
    0,
  );
}


export function getBookingStatusFilterOptions(): readonly {
  value: BookingStatus | null;
  label: string;
}[] {
  return [
    {
      value: null,
      label: "All Statuses",
    },
    ...BOOKING_STATUS_OPTIONS,
  ];
}


export function parseBookingStatus(
  value: unknown,
): BookingStatus | null {
  return isBookingStatus(value)
    ? value
    : null;
}
