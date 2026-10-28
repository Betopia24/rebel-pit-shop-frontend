import type {
  DashboardBookingColumnConfig,
  DashboardBookingColumnId,
  DashboardBookingStatus,
  DashboardBookingStatusConfig,
} from "../types/dashboard-booking.types";

export const DASHBOARD_BOOKING_PREVIEW_LIMIT = 5;

export const DASHBOARD_BOOKING_ROUTE = "/bookings";

export const DASHBOARD_BOOKING_COLUMNS = [
  {
    id: "customer",
    label: "Name",
    align: "left",
  },
  {
    id: "requested_class",
    label: "Requested Class",
    align: "left",
  },
  {
    id: "preferred_time",
    label: "Preferred Time",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
  {
    id: "coach",
    label: "Coach",
    align: "left",
  },
] as const satisfies readonly DashboardBookingColumnConfig[];

export const DASHBOARD_BOOKING_STATUS_CONFIG = {
  pending: {
    id: "pending",
    label: "Pending",
    className:
      "border-transparent bg-warning/10 text-warning",
  },

  confirmed: {
    id: "confirmed",
    label: "Confirmed",
    className:
      "border-transparent bg-success/10 text-success",
  },

  needs_follow_up: {
    id: "needs_follow_up",
    label: "Needs Follow-up",
    className:
      "border-transparent bg-destructive/10 text-destructive",
  },

  cancelled: {
    id: "cancelled",
    label: "Cancelled",
    className:
      "border-transparent bg-muted text-muted-foreground",
  },

  completed: {
    id: "completed",
    label: "Completed",
    className:
      "border-transparent bg-success/10 text-success",
  },
} as const satisfies Record<
  DashboardBookingStatus,
  DashboardBookingStatusConfig
>;

export const DASHBOARD_BOOKING_TIMEZONE =
  "America/Chicago";

export const DASHBOARD_BOOKING_LOCALE = "en-US";

export const DASHBOARD_BOOKING_DATE_TIME_FORMAT = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
} as const satisfies Intl.DateTimeFormatOptions;

export const DASHBOARD_BOOKING_FULL_DATE_TIME_FORMAT = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
} as const satisfies Intl.DateTimeFormatOptions;

export function getDashboardBookingStatusConfig(
  status: DashboardBookingStatus,
): DashboardBookingStatusConfig {
  return DASHBOARD_BOOKING_STATUS_CONFIG[status];
}

export function getDashboardBookingColumnConfig(
  id: DashboardBookingColumnId,
): DashboardBookingColumnConfig {
  const column = DASHBOARD_BOOKING_COLUMNS.find(
    (item) => item.id === id,
  );

  if (!column) {
    throw new Error(
      `Dashboard booking column not found: ${id}`,
    );
  }

  return column;
}

function formatBookingDate(
  value: string | null,
  timezone: string,
  options: Intl.DateTimeFormatOptions,
  fallback: string,
): string {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return fallback;
  }

  try {
    return new Intl.DateTimeFormat(
      DASHBOARD_BOOKING_LOCALE,
      {
        ...options,
        timeZone: timezone,
      },
    ).format(date);
  } catch {
    return fallback;
  }
}

export function formatDashboardBookingDateTime(
  startsAt: string | null,
  timezone: string = DASHBOARD_BOOKING_TIMEZONE,
): string {
  return formatBookingDate(
    startsAt,
    timezone,
    DASHBOARD_BOOKING_DATE_TIME_FORMAT,
    "Not specified",
  );
}

export function formatDashboardBookingFullDateTime(
  startsAt: string | null,
  timezone: string = DASHBOARD_BOOKING_TIMEZONE,
): string {
  return formatBookingDate(
    startsAt,
    timezone,
    DASHBOARD_BOOKING_FULL_DATE_TIME_FORMAT,
    "Preferred time not specified",
  );
}