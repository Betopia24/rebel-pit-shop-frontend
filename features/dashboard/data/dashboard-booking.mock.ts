
import type {
  BookingRequestsProps,
  DashboardBookingData,
  DashboardBookingRequest,
  DashboardBookingStatus,
} from "../types/dashboard-booking.types";

/**
 * ============================================================
 * REBEL BOXING CLUB
 * Dashboard Recent Booking Requests — Mock Data
 * ============================================================
 *
 * Development-only mock data.
 *
 * Matches the approved Dashboard screenshot:
 *
 * Emily C.   → Beginner Boxing        → Pending
 * David L.   → Personal Training      → Confirmed
 * Sophie R.  → Boxing Fundamentals    → Pending
 * Marcus T.  → Skills & Combinations  → Needs Follow-up
 * Jessica P. → Personal Training      → Confirmed
 *
 * All timestamps are fixed and deterministic.
 *
 * Business timezone:
 * America/Chicago
 *
 * No API calls, React components or hooks.
 * ============================================================
 */

/* ============================================================
   CONSTANTS
============================================================ */

export const DASHBOARD_BOOKING_MOCK_TIMEZONE =
  "America/Chicago";

/**
 * The reference screenshot uses April 2024.
 *
 * April 2024 is within Central Daylight Time,
 * so the UTC offset is -05:00.
 */
export const DASHBOARD_BOOKING_MOCK_UPDATED_AT =
  "2024-04-22T16:00:00-05:00";

/* ============================================================
   COACHES
============================================================ */

const MOCK_BOOKING_COACHES = {
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
   BOOKING SESSIONS
============================================================ */

const MOCK_BOOKING_SESSIONS = {
  beginnerBoxing: {
    id: "session_beginner_boxing",
    title: "Beginner Boxing",
    type: "group_class",
  },

  personalTraining: {
    id: "session_personal_training",
    title: "Personal Training",
    type: "personal_training",
  },

  boxingFundamentals: {
    id: "session_boxing_fundamentals",
    title: "Boxing Fundamentals",
    type: "group_class",
  },

  skillsCombinations: {
    id: "session_skills_combinations",
    title: "Skills & Combinations",
    type: "group_class",
  },
} as const;

/* ============================================================
   BOOKING REQUESTS
============================================================ */

/**
 * The records are ordered by requestedAt,
 * newest first.
 *
 * preferredStartsAt represents the customer's
 * requested session time, not the time the
 * booking request was created.
 */
export const DASHBOARD_BOOKING_REQUESTS_MOCK = [
  {
    id: "booking_emily_001",

    customer: {
      id: "customer_emily_001",
      name: "Emily C.",
    },

    requestedSession:
      MOCK_BOOKING_SESSIONS.beginnerBoxing,

    preferredStartsAt:
      "2024-04-23T09:00:00-05:00",

    status: "pending",

    coach: MOCK_BOOKING_COACHES.nichole,

    requestedAt:
      "2024-04-22T10:45:00-05:00",
  },

  {
    id: "booking_david_002",

    customer: {
      id: "customer_david_002",
      name: "David L.",
    },

    requestedSession:
      MOCK_BOOKING_SESSIONS.personalTraining,

    preferredStartsAt:
      "2024-04-24T18:00:00-05:00",

    status: "confirmed",

    coach: MOCK_BOOKING_COACHES.cory,

    requestedAt:
      "2024-04-22T10:20:00-05:00",
  },

  {
    id: "booking_sophie_003",

    customer: {
      id: "customer_sophie_003",
      name: "Sophie R.",
    },

    requestedSession:
      MOCK_BOOKING_SESSIONS.boxingFundamentals,

    preferredStartsAt:
      "2024-04-25T10:00:00-05:00",

    status: "pending",

    coach: MOCK_BOOKING_COACHES.nhut,

    requestedAt:
      "2024-04-22T09:50:00-05:00",
  },

  {
    id: "booking_marcus_004",

    customer: {
      id: "customer_marcus_004",
      name: "Marcus T.",
    },

    requestedSession:
      MOCK_BOOKING_SESSIONS.skillsCombinations,

    preferredStartsAt:
      "2024-04-26T17:30:00-05:00",

    status: "needs_follow_up",

    coach: MOCK_BOOKING_COACHES.nhut,

    requestedAt:
      "2024-04-22T09:15:00-05:00",
  },

  {
    id: "booking_jessica_005",

    customer: {
      id: "customer_jessica_005",
      name: "Jessica P.",
    },

    requestedSession:
      MOCK_BOOKING_SESSIONS.personalTraining,

    preferredStartsAt:
      "2024-04-27T11:00:00-05:00",

    status: "confirmed",

    coach: MOCK_BOOKING_COACHES.cory,

    requestedAt:
      "2024-04-22T08:40:00-05:00",
  },
] as const satisfies readonly DashboardBookingRequest[];

/* ============================================================
   MAIN BOOKING DATA
============================================================ */

/**
 * Default dataset matching the screenshot.
 */
export const DASHBOARD_BOOKING_MOCK:
  DashboardBookingData = {
  requests: DASHBOARD_BOOKING_REQUESTS_MOCK,

  totalRequests: 5,

  timezone: DASHBOARD_BOOKING_MOCK_TIMEZONE,

  updatedAt: DASHBOARD_BOOKING_MOCK_UPDATED_AT,
};

/* ============================================================
   EMPTY STATE
============================================================ */

/**
 * No booking requests available.
 */
export const DASHBOARD_BOOKING_EMPTY_MOCK:
  DashboardBookingData = {
  requests: [],

  totalRequests: 0,

  timezone: DASHBOARD_BOOKING_MOCK_TIMEZONE,

  updatedAt: DASHBOARD_BOOKING_MOCK_UPDATED_AT,
};

/* ============================================================
   ADDITIONAL EDGE CASES
============================================================ */

/**
 * Unassigned coach and unspecified time.
 *
 * Useful for checking row fallbacks.
 */
export const DASHBOARD_BOOKING_INCOMPLETE_MOCK = {
  id: "booking_incomplete_006",

  customer: {
    id: "customer_incomplete_006",
    name: "Jordan P.",
  },

  requestedSession:
    MOCK_BOOKING_SESSIONS.personalTraining,

  preferredStartsAt: null,

  status: "needs_follow_up",

  coach: null,

  requestedAt:
    "2024-04-22T08:10:00-05:00",
} as const satisfies DashboardBookingRequest;

/**
 * Cancelled booking example.
 */
export const DASHBOARD_BOOKING_CANCELLED_MOCK = {
  id: "booking_cancelled_007",

  customer: {
    id: "customer_cancelled_007",
    name: "Olivia M.",
  },

  requestedSession:
    MOCK_BOOKING_SESSIONS.beginnerBoxing,

  preferredStartsAt:
    "2024-04-28T09:00:00-05:00",

  status: "cancelled",

  coach: MOCK_BOOKING_COACHES.nichole,

  requestedAt:
    "2024-04-22T07:30:00-05:00",
} as const satisfies DashboardBookingRequest;

/**
 * Completed booking example.
 */
export const DASHBOARD_BOOKING_COMPLETED_MOCK = {
  id: "booking_completed_008",

  customer: {
    id: "customer_completed_008",
    name: "Daniel R.",
  },

  requestedSession:
    MOCK_BOOKING_SESSIONS.boxingFundamentals,

  preferredStartsAt:
    "2024-04-21T10:00:00-05:00",

  status: "completed",

  coach: MOCK_BOOKING_COACHES.nhut,

  requestedAt:
    "2024-04-19T14:00:00-05:00",
} as const satisfies DashboardBookingRequest;

/* ============================================================
   COMPONENT STATE MOCKS
============================================================ */

/**
 * Successful booking preview.
 */
export const DASHBOARD_BOOKING_SUCCESS_STATE_MOCK = {
  data: DASHBOARD_BOOKING_MOCK,
  status: "success",
} satisfies BookingRequestsProps;

/**
 * Loading preview.
 */
export const DASHBOARD_BOOKING_LOADING_STATE_MOCK = {
  data: null,
  status: "loading",
} satisfies BookingRequestsProps;

/**
 * Empty preview.
 */
export const DASHBOARD_BOOKING_EMPTY_STATE_MOCK = {
  data: DASHBOARD_BOOKING_EMPTY_MOCK,
  status: "empty",
} satisfies BookingRequestsProps;

/**
 * Error preview.
 */
export const DASHBOARD_BOOKING_ERROR_STATE_MOCK = {
  data: null,
  status: "error",
  error: "Unable to load booking requests.",
} satisfies BookingRequestsProps;

/* ============================================================
   MOCK HELPERS
============================================================ */

/**
 * Return the default booking requests
 * sorted newest first.
 *
 * Does not mutate the original mock array.
 */
export function getDashboardBookingMock():
  DashboardBookingData {
  const requests = [
    ...DASHBOARD_BOOKING_REQUESTS_MOCK,
  ].sort(
    (a, b) =>
      Date.parse(b.requestedAt) -
      Date.parse(a.requestedAt),
  );

  return {
    requests,
    totalRequests: requests.length,
    timezone: DASHBOARD_BOOKING_MOCK_TIMEZONE,
    updatedAt: DASHBOARD_BOOKING_MOCK_UPDATED_AT,
  };
}

/**
 * Find one mock booking by ID.
 */
export function getDashboardBookingMockById(
  bookingId: string,
): DashboardBookingRequest | null {
  return (
    DASHBOARD_BOOKING_REQUESTS_MOCK.find(
      (request) => request.id === bookingId,
    ) ?? null
  );
}

/**
 * Filter booking requests by status.
 *
 * Used only for development previews.
 */
export function getDashboardBookingMockByStatus(
  status: DashboardBookingStatus,
): DashboardBookingData {
  const requests =
    DASHBOARD_BOOKING_REQUESTS_MOCK.filter(
      (request) => request.status === status,
    );

  return {
    requests,
    totalRequests: requests.length,
    timezone: DASHBOARD_BOOKING_MOCK_TIMEZONE,
    updatedAt: DASHBOARD_BOOKING_MOCK_UPDATED_AT,
  };
}
