
import type {
  DashboardScheduleData,
  DashboardScheduleItem,
  ScheduleDate,
} from "../types/dashboard-schedule.types";

/**
 * ============================================================
 * REBEL BOXING CLUB
 * Dashboard Schedule Mock Data
 * ============================================================
 *
 * Development-only schedule data.
 *
 * Reference design:
 * Monday, April 22, 2024
 *
 * Sessions:
 * - 9:00 AM  Boxing Fundamentals — Nichole
 * - 11:00 AM Personal Training — Cory
 * - 1:00 PM  Skills & Combinations — Nhut
 * - 5:30 PM  Beginner Boxing — Nichole
 *
 * All dates and times are fixed to ensure
 * deterministic rendering.
 *
 * Timezone: America/Chicago
 *
 * No runtime-generated dates or random values.
 * ============================================================
 */

/* ============================================================
   CONSTANTS
============================================================ */

export const DASHBOARD_SCHEDULE_MOCK_DATE =
  "2024-04-22";

export const DASHBOARD_SCHEDULE_MOCK_TIMEZONE =
  "America/Chicago";

const MOCK_UPDATED_AT =
  "2024-04-22T08:00:00-05:00";

/* ============================================================
   COACHES
============================================================ */

const MOCK_COACHES = {
  nichole: {
    id: "coach_nichole",
    name: "Nichole",
  },

  cory: {
    id: "coach_cory",
    name: "Cory",
  },

  nhut: {
    id: "coach_nhut",
    name: "Nhut",
  },
} as const;

/* ============================================================
   TODAY'S SESSIONS
============================================================ */

export const DASHBOARD_SCHEDULE_ITEMS_MOCK = [
  {
    id: "session_boxing_fundamentals_01",
    title: "Boxing Fundamentals",
    type: "group_class",
    status: "confirmed",
    startsAt: "2024-04-22T09:00:00-05:00",
    durationMinutes: 60,
    coach: MOCK_COACHES.nichole,
    indicator: "gold",
  },
  {
    id: "session_personal_training_01",
    title: "Personal Training",
    type: "personal_training",
    status: "confirmed",
    startsAt: "2024-04-22T11:00:00-05:00",
    durationMinutes: 60,
    coach: MOCK_COACHES.cory,
    indicator: "amber",
  },
  {
    id: "session_skills_combinations_01",
    title: "Skills & Combinations",
    type: "group_class",
    status: "confirmed",
    startsAt: "2024-04-22T13:00:00-05:00",
    durationMinutes: 60,
    coach: MOCK_COACHES.nhut,
    indicator: "green",
  },
  {
    id: "session_beginner_boxing_01",
    title: "Beginner Boxing",
    type: "group_class",
    status: "confirmed",
    startsAt: "2024-04-22T17:30:00-05:00",
    durationMinutes: 60,
    coach: MOCK_COACHES.nichole,
    indicator: "blue",
  },
] as const satisfies readonly DashboardScheduleItem[];

/* ============================================================
   MAIN SCHEDULE DATA
============================================================ */

/**
 * Default dataset matching the screenshot.
 */
export const DASHBOARD_SCHEDULE_MOCK:
  DashboardScheduleData = {
  date: DASHBOARD_SCHEDULE_MOCK_DATE,

  timezone: DASHBOARD_SCHEDULE_MOCK_TIMEZONE,

  items: DASHBOARD_SCHEDULE_ITEMS_MOCK,

  updatedAt: MOCK_UPDATED_AT,
};

/* ============================================================
   ADDITIONAL CALENDAR DATES
============================================================ */

/**
 * Additional illustrative sessions.
 *
 * These let us test selecting different
 * dates in the mini calendar.
 */
const ADDITIONAL_SCHEDULE_ITEMS = {
  "2024-04-23": [
    {
      id: "session_beginner_boxing_02",
      title: "Beginner Boxing",
      type: "group_class",
      status: "scheduled",
      startsAt:
        "2024-04-23T09:00:00-05:00",
      durationMinutes: 60,
      coach: MOCK_COACHES.nichole,
      indicator: "gold",
    },
    {
      id: "session_personal_training_02",
      title: "Personal Training",
      type: "personal_training",
      status: "confirmed",
      startsAt:
        "2024-04-23T16:00:00-05:00",
      durationMinutes: 60,
      coach: MOCK_COACHES.cory,
      indicator: "amber",
    },
  ],

  "2024-04-24": [
    {
      id: "session_boxing_fundamentals_02",
      title: "Boxing Fundamentals",
      type: "group_class",
      status: "scheduled",
      startsAt:
        "2024-04-24T10:00:00-05:00",
      durationMinutes: 60,
      coach: MOCK_COACHES.nhut,
      indicator: "green",
    },
  ],

  "2024-04-25": [
    {
      id: "session_skills_combinations_02",
      title: "Skills & Combinations",
      type: "group_class",
      status: "confirmed",
      startsAt:
        "2024-04-25T17:30:00-05:00",
      durationMinutes: 60,
      coach: MOCK_COACHES.nhut,
      indicator: "blue",
    },
  ],

  "2024-04-26": [
    {
      id: "session_personal_training_03",
      title: "Personal Training",
      type: "personal_training",
      status: "confirmed",
      startsAt:
        "2024-04-26T11:00:00-05:00",
      durationMinutes: 60,
      coach: MOCK_COACHES.cory,
      indicator: "amber",
    },
  ],
} satisfies Record<
  string,
  readonly DashboardScheduleItem[]
>;

/* ============================================================
   CALENDAR DATASET
============================================================ */

/**
 * Session data indexed by business-local date.
 *
 * Dates not present in this mapping are treated
 * as having no sessions in this mock.
 */
export const DASHBOARD_SCHEDULE_MOCK_BY_DATE:
  Readonly<
    Record<
      ScheduleDate,
      readonly DashboardScheduleItem[]
    >
  > = {
  [DASHBOARD_SCHEDULE_MOCK_DATE]:
    DASHBOARD_SCHEDULE_ITEMS_MOCK,

  ...ADDITIONAL_SCHEDULE_ITEMS,
};

/**
 * Dates that contain one or more sessions.
 *
 * Used by the mini calendar to indicate
 * scheduled dates.
 */
export const DASHBOARD_SCHEDULE_DATES_WITH_SESSIONS:
  readonly ScheduleDate[] = Object.entries(
  DASHBOARD_SCHEDULE_MOCK_BY_DATE,
)
  .filter(([, items]) =>
    items.some(
      (item) => item.status !== "cancelled",
    ),
  )
  .map(([date]) => date)
  .sort();

/* ============================================================
   EMPTY STATE MOCK
============================================================ */

/**
 * Represents a date with no scheduled sessions.
 */
export const DASHBOARD_SCHEDULE_EMPTY_MOCK:
  DashboardScheduleData = {
  date: "2024-04-27",

  timezone: DASHBOARD_SCHEDULE_MOCK_TIMEZONE,

  items: [],

  updatedAt: MOCK_UPDATED_AT,
};

/* ============================================================
   ERROR STATE MOCK
============================================================ */

/**
 * Error state is represented by the component's
 * status and error props, not by fake session data.
 */
export const DASHBOARD_SCHEDULE_ERROR_MOCK = {
  data: null,
  status: "error",
  error: "Unable to load schedule. Please try again.",
} as const;

/* ============================================================
   MOCK DATA HELPERS
============================================================ */

/**
 * Returns the schedule dataset for a selected date.
 *
 * Used when testing mini-calendar navigation.
 *
 * Items are sorted chronologically.
 */
export function getDashboardScheduleMock(
  date: ScheduleDate = DASHBOARD_SCHEDULE_MOCK_DATE,
): DashboardScheduleData {
  const items =
    DASHBOARD_SCHEDULE_MOCK_BY_DATE[date] ?? [];

  return {
    date,

    timezone: DASHBOARD_SCHEDULE_MOCK_TIMEZONE,

    items: [...items].sort(
      (a, b) =>
        Date.parse(a.startsAt) -
        Date.parse(b.startsAt),
    ),

    updatedAt: MOCK_UPDATED_AT,
  };
}
