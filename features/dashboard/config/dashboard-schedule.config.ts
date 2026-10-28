import type {
  DashboardScheduleIndicator,
  DashboardScheduleSessionStatus,
  DashboardScheduleSessionType,
} from "../types/dashboard-schedule.types";

export const DASHBOARD_SCHEDULE_TYPE_CONFIG = {
  group_class: {
    label: "Group Class",
  },

  personal_training: {
    label: "1:1 Session",
  },

  consultation: {
    label: "Consultation",
  },
} as const satisfies Record<
  DashboardScheduleSessionType,
  {
    label: string;
  }
>;

export const DASHBOARD_SCHEDULE_INDICATOR_CONFIG = {
  gold: {
    className: "bg-gold",
    label: "Gold",
  },

  amber: {
    className: "bg-warning",
    label: "Amber",
  },

  green: {
    className: "bg-success",
    label: "Green",
  },

  blue: {
    className: "bg-primary",
    label: "Blue",
  },

  muted: {
    className: "bg-muted-foreground",
    label: "Muted",
  },
} as const satisfies Record<
  DashboardScheduleIndicator,
  {
    className: string;
    label: string;
  }
>;

export const DASHBOARD_SCHEDULE_STATUS_CONFIG = {
  scheduled: {
    label: "Scheduled",
    className:
      "bg-muted text-muted-foreground",
  },

  confirmed: {
    label: "Confirmed",
    className:
      "bg-success/10 text-success",
  },

  completed: {
    label: "Completed",
    className:
      "bg-primary/10 text-primary",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "bg-destructive/10 text-destructive",
  },
} as const satisfies Record<
  DashboardScheduleSessionStatus,
  {
    label: string;
    className: string;
  }
>;

export const DASHBOARD_SCHEDULE_LOCALE = "en-US";
export const DASHBOARD_SCHEDULE_TIMEZONE =
  "America/Chicago";
export const DASHBOARD_SCHEDULE_TIME_FORMAT = {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
} as const satisfies Intl.DateTimeFormatOptions;

export const DASHBOARD_SCHEDULE_MONTH_FORMAT = {
  month: "long",
  year: "numeric",
} as const satisfies Intl.DateTimeFormatOptions;

export const DASHBOARD_SCHEDULE_DATE_FORMAT = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
} as const satisfies Intl.DateTimeFormatOptions;

export const DASHBOARD_SCHEDULE_PREVIEW_LIMIT = 4;

export function getScheduleTypeLabel(
  type: DashboardScheduleSessionType,
): string {
  return DASHBOARD_SCHEDULE_TYPE_CONFIG[type].label;
}

export function getScheduleIndicatorConfig(
  indicator: DashboardScheduleIndicator,
) {
  return DASHBOARD_SCHEDULE_INDICATOR_CONFIG[
    indicator
  ];
}

export function getScheduleStatusConfig(
  status: DashboardScheduleSessionStatus,
) {
  return DASHBOARD_SCHEDULE_STATUS_CONFIG[
    status
  ];
}

export function formatScheduleTime(
  startsAt: string,
  timezone: string = DASHBOARD_SCHEDULE_TIMEZONE,
): string {
  const date = new Date(startsAt);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  try {
    return new Intl.DateTimeFormat(
      DASHBOARD_SCHEDULE_LOCALE,
      {
        ...DASHBOARD_SCHEDULE_TIME_FORMAT,
        timeZone: timezone,
      },
    ).format(date);
  } catch {
    return "—";
  }
}

export function formatScheduleDuration(
  minutes: number,
): string {
  if (
    !Number.isFinite(minutes) ||
    minutes < 0
  ) {
    return "—";
  }

  return `${Math.round(minutes)} min`;
}