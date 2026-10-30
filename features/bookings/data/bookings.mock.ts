import type {
  Booking,
  BookingCategory,
  BookingClass,
  BookingCoach,
  BookingCustomer,
  BookingId,
  BookingISODateTime,
  BookingSource,
  BookingStat,
  BookingStatistics,
  BookingStatus,
  BookingTab,
  BookingType,
  BookingSessionAvailability,
} from "../types/booking.types"

import {
  getBookingTabCounts,
  type BookingTabCounts,
} from "../config/booking-types.config"

import {
  createEmptyBookingStatusCounts,
  type BookingStatusCounts,
} from "../config/booking-status.config"

/**
 * ============================================================
 * REBEL PIT SHOP
 * Bookings — Mock Dataset
 * ============================================================
 *
 * Development-only fixtures for:
 *
 * - Booking statistics
 * - Booking category tabs
 * - Booking search and filters
 * - Booking table
 * - Booking details panel
 *
 * All records are fictional examples.
 *
 * Dates are fixed to the reference design
 * period so the UI remains deterministic.
 *
 * Timezone: America/Chicago
 *
 * IMPORTANT:
 *
 * Dashboard aggregate statistics and the
 * sample table records are intentionally
 * separate datasets.
 *
 * Do not calculate full dashboard totals
 * using only the preview records.
 * ============================================================
 */

/* ============================================================
   CONSTANTS
============================================================ */

export const BOOKINGS_MOCK_TIMEZONE = "America/Chicago"

export const BOOKINGS_MOCK_UPDATED_AT = "2025-04-22T16:00:00-05:00"

/* ============================================================
   COACHES
============================================================ */

export const BOOKING_COACHES_MOCK = {
  cory: {
    id: "coach_cory",
    name: "Cory Miller",
    avatarUrl: null,
  },

  nichole: {
    id: "coach_nichole",
    name: "Nichole Davis",
    avatarUrl: null,
  },

  nhut: {
    id: "coach_nhut",
    name: "Nhut Nguyen",
    avatarUrl: null,
  },

  alex: {
    id: "coach_alex",
    name: "Alex Carter",
    avatarUrl: null,
  },
} as const satisfies Record<string, BookingCoach>

export const BOOKING_COACH_OPTIONS_MOCK: readonly BookingCoach[] =
  Object.values(BOOKING_COACHES_MOCK)

/* ============================================================
   CLASSES & SERVICES
============================================================ */

export const BOOKING_CLASSES_MOCK = {
  boxingFundamentals: {
    id: "class_boxing_fundamentals",
    name: "Boxing Fundamentals",
    kind: "group_class",
    location: "Main Gym",
    imageUrl: null,
    coach: BOOKING_COACHES_MOCK.cory,
  },

  beginnerBoxing: {
    id: "class_beginner_boxing",
    name: "Beginner Boxing",
    kind: "group_class",
    location: "Studio A",
    imageUrl: null,
    coach: BOOKING_COACHES_MOCK.nichole,
  },

  advancedBoxing: {
    id: "class_advanced_boxing",
    name: "Advanced Boxing",
    kind: "group_class",
    location: "Main Gym",
    imageUrl: null,
    coach: BOOKING_COACHES_MOCK.nhut,
  },

  personalTraining: {
    id: "class_personal_training",
    name: "1-on-1 Personal Training",
    kind: "personal_training",
    location: "Training Studio",
    imageUrl: null,
    coach: BOOKING_COACHES_MOCK.cory,
  },

  fitnessBoxing: {
    id: "class_fitness_boxing",
    name: "Fitness Boxing",
    kind: "group_class",
    location: "Studio B",
    imageUrl: null,
    coach: BOOKING_COACHES_MOCK.alex,
  },

  membershipConsultation: {
    id: "class_membership_consultation",
    name: "Membership Consultation",
    kind: "consultation",
    location: "Consultation Room",
    imageUrl: null,
    coach: BOOKING_COACHES_MOCK.nichole,
  },
} as const satisfies Record<string, BookingClass>

export const BOOKING_CLASS_OPTIONS_MOCK: readonly BookingClass[] =
  Object.values(BOOKING_CLASSES_MOCK)

/* ============================================================
   CUSTOMERS
============================================================ */

export const BOOKING_CUSTOMERS_MOCK = {
  john: {
    id: "customer_john_smith",
    name: "John Smith",
    avatarUrl: null,
    phone: "(316) 555-0198",
    email: "john.smith@example.com",
    kind: "visitor",
    leadId: "lead_john_smith",
  },

  sarah: {
    id: "customer_sarah_johnson",
    name: "Sarah Johnson",
    avatarUrl: null,
    phone: "(316) 555-0142",
    email: "sarah.johnson@example.com",
    kind: "member",
    leadId: "lead_sarah_johnson",
  },

  mike: {
    id: "customer_mike_davis",
    name: "Mike Davis",
    avatarUrl: null,
    phone: "(316) 555-0115",
    email: "mike.davis@example.com",
    kind: "member",
    leadId: null,
  },

  emily: {
    id: "customer_emily_wilson",
    name: "Emily Wilson",
    avatarUrl: null,
    phone: "(316) 555-0164",
    email: "emily.wilson@example.com",
    kind: "visitor",
    leadId: "lead_emily_wilson",
  },

  david: {
    id: "customer_david_kim",
    name: "David Kim",
    avatarUrl: null,
    phone: "(316) 555-0136",
    email: "david.kim@example.com",
    kind: "visitor",
    leadId: "lead_david_kim",
  },

  jessica: {
    id: "customer_jessica_lee",
    name: "Jessica Lee",
    avatarUrl: null,
    phone: "(316) 555-0181",
    email: "jessica.lee@example.com",
    kind: "member",
    leadId: null,
  },

  olivia: {
    id: "customer_olivia_brown",
    name: "Olivia Brown",
    avatarUrl: null,
    phone: "(316) 555-0152",
    email: "olivia.brown@example.com",
    kind: "visitor",
    leadId: "lead_olivia_brown",
  },

  james: {
    id: "customer_james_taylor",
    name: "James Taylor",
    avatarUrl: null,
    phone: "(316) 555-0174",
    email: "james.taylor@example.com",
    kind: "member",
    leadId: null,
  },

  sophia: {
    id: "customer_sophia_martin",
    name: "Sophia Martin",
    avatarUrl: null,
    phone: "(316) 555-0126",
    email: "sophia.martin@example.com",
    kind: "visitor",
    leadId: "lead_sophia_martin",
  },

  ethan: {
    id: "customer_ethan_clark",
    name: "Ethan Clark",
    avatarUrl: null,
    phone: "(316) 555-0107",
    email: "ethan.clark@example.com",
    kind: "member",
    leadId: null,
  },

  chloe: {
    id: "customer_chloe_walker",
    name: "Chloe Walker",
    avatarUrl: null,
    phone: "(316) 555-0190",
    email: "chloe.walker@example.com",
    kind: "visitor",
    leadId: "lead_chloe_walker",
  },

  noah: {
    id: "customer_noah_harris",
    name: "Noah Harris",
    avatarUrl: null,
    phone: "(316) 555-0185",
    email: "noah.harris@example.com",
    kind: "member",
    leadId: null,
  },
} as const satisfies Record<string, BookingCustomer>

/* ============================================================
   BOOKING FIXTURE FACTORY
============================================================ */

interface CreateBookingInput {
  id: BookingId

  reference: string

  customer: BookingCustomer

  bookingClass: BookingClass

  coach?: BookingCoach | null

  category: BookingCategory

  type: BookingType

  status: BookingStatus

  sessionId: string

  startsAt: BookingISODateTime

  endsAt: BookingISODateTime

  attendees?: number

  capacity?: number | null

  checkedIn?: number | null

  source: BookingSource

  createdAt: BookingISODateTime

  updatedAt?: BookingISODateTime

  notesCount?: number

  messagesCount?: number
}

/**
 * Keep every mock record consistent with
 * the Booking domain interface.
 */
function createBooking(input: CreateBookingInput): Booking {
  return {
    id: input.id,

    reference: input.reference,

    customer: input.customer,

    bookingClass: input.bookingClass,

    coach: input.coach === undefined ? input.bookingClass.coach : input.coach,

    category: input.category,

    type: input.type,

    status: input.status,

    schedule: {
      sessionId: input.sessionId,

      startsAt: input.startsAt,

      endsAt: input.endsAt,

      timezone: BOOKINGS_MOCK_TIMEZONE,

      location: input.bookingClass.location,
    },

    attendance: {
      attendees: input.attendees ?? 1,

      capacity: input.capacity ?? null,

      checkedIn: input.checkedIn ?? null,
    },

    source: {
      channel: input.source,

      createdAt: input.createdAt,

      externalReference: null,
    },

    createdAt: input.createdAt,

    updatedAt: input.updatedAt ?? input.createdAt,

    notesCount: input.notesCount ?? 0,

    messagesCount: input.messagesCount ?? 0,

    leadId: input.customer.leadId,
  }
}

/* ============================================================
   BOOKINGS
============================================================ */

export const BOOKINGS_MOCK: readonly Booking[] = [
  createBooking({
    id: "booking_001",
    reference: "BK-20250422-001",
    customer: BOOKING_CUSTOMERS_MOCK.john,
    bookingClass: BOOKING_CLASSES_MOCK.boxingFundamentals,
    category: "free_class",
    type: "free_class",
    status: "confirmed",
    sessionId: "session_boxing_fundamentals_0422",
    startsAt: "2025-04-22T18:00:00-05:00",
    endsAt: "2025-04-22T19:00:00-05:00",
    attendees: 1,
    capacity: 16,
    source: "website",
    createdAt: "2025-04-18T10:24:00-05:00",
    notesCount: 2,
    messagesCount: 3,
  }),

  createBooking({
    id: "booking_002",
    reference: "BK-20250422-002",
    customer: BOOKING_CUSTOMERS_MOCK.sarah,
    bookingClass: BOOKING_CLASSES_MOCK.beginnerBoxing,
    category: "membership",
    type: "member",
    status: "confirmed",
    sessionId: "session_beginner_boxing_0422",
    startsAt: "2025-04-22T09:00:00-05:00",
    endsAt: "2025-04-22T10:00:00-05:00",
    capacity: 12,
    source: "instagram",
    createdAt: "2025-04-19T14:12:00-05:00",
    notesCount: 1,
    messagesCount: 2,
  }),

  createBooking({
    id: "booking_003",
    reference: "BK-20250422-003",
    customer: BOOKING_CUSTOMERS_MOCK.mike,
    bookingClass: BOOKING_CLASSES_MOCK.personalTraining,
    category: "personal_training",
    type: "personal_training",
    status: "pending",
    sessionId: "session_personal_training_0422",
    startsAt: "2025-04-22T11:00:00-05:00",
    endsAt: "2025-04-22T12:00:00-05:00",
    capacity: 1,
    source: "website",
    createdAt: "2025-04-20T08:15:00-05:00",
  }),

  createBooking({
    id: "booking_004",
    reference: "BK-20250422-004",
    customer: BOOKING_CUSTOMERS_MOCK.emily,
    bookingClass: BOOKING_CLASSES_MOCK.fitnessBoxing,
    category: "free_class",
    type: "free_class",
    status: "waitlist",
    sessionId: "session_fitness_boxing_0422",
    startsAt: "2025-04-22T17:00:00-05:00",
    endsAt: "2025-04-22T18:00:00-05:00",
    capacity: 15,
    source: "facebook",
    createdAt: "2025-04-20T12:30:00-05:00",
  }),

  createBooking({
    id: "booking_005",
    reference: "BK-20250422-005",
    customer: BOOKING_CUSTOMERS_MOCK.david,
    bookingClass: BOOKING_CLASSES_MOCK.membershipConsultation,
    category: "consultation",
    type: "consultation",
    status: "pending",
    sessionId: "session_consultation_0422",
    startsAt: "2025-04-22T14:00:00-05:00",
    endsAt: "2025-04-22T14:30:00-05:00",
    capacity: 1,
    source: "sms",
    createdAt: "2025-04-21T09:18:00-05:00",
  }),

  createBooking({
    id: "booking_006",
    reference: "BK-20250422-006",
    customer: BOOKING_CUSTOMERS_MOCK.jessica,
    bookingClass: BOOKING_CLASSES_MOCK.advancedBoxing,
    category: "membership",
    type: "member",
    status: "confirmed",
    sessionId: "session_advanced_boxing_0422",
    startsAt: "2025-04-22T19:00:00-05:00",
    endsAt: "2025-04-22T20:00:00-05:00",
    capacity: 16,
    source: "website",
    createdAt: "2025-04-18T16:45:00-05:00",
  }),

  createBooking({
    id: "booking_007",
    reference: "BK-20250423-001",
    customer: BOOKING_CUSTOMERS_MOCK.olivia,
    bookingClass: BOOKING_CLASSES_MOCK.beginnerBoxing,
    category: "free_class",
    type: "free_class",
    status: "confirmed",
    sessionId: "session_beginner_boxing_0423",
    startsAt: "2025-04-23T09:00:00-05:00",
    endsAt: "2025-04-23T10:00:00-05:00",
    capacity: 12,
    source: "instagram",
    createdAt: "2025-04-21T11:20:00-05:00",
  }),

  createBooking({
    id: "booking_008",
    reference: "BK-20250423-002",
    customer: BOOKING_CUSTOMERS_MOCK.james,
    bookingClass: BOOKING_CLASSES_MOCK.boxingFundamentals,
    category: "membership",
    type: "member",
    status: "completed",
    sessionId: "session_boxing_fundamentals_0419",
    startsAt: "2025-04-19T10:00:00-05:00",
    endsAt: "2025-04-19T11:00:00-05:00",
    capacity: 16,
    checkedIn: 1,
    source: "website",
    createdAt: "2025-04-17T10:10:00-05:00",
  }),

  createBooking({
    id: "booking_009",
    reference: "BK-20250423-003",
    customer: BOOKING_CUSTOMERS_MOCK.sophia,
    bookingClass: BOOKING_CLASSES_MOCK.membershipConsultation,
    category: "consultation",
    type: "consultation",
    status: "cancelled",
    sessionId: "session_consultation_0423",
    startsAt: "2025-04-23T13:00:00-05:00",
    endsAt: "2025-04-23T13:30:00-05:00",
    capacity: 1,
    source: "facebook",
    createdAt: "2025-04-21T08:45:00-05:00",
  }),

  createBooking({
    id: "booking_010",
    reference: "BK-20250423-004",
    customer: BOOKING_CUSTOMERS_MOCK.ethan,
    bookingClass: BOOKING_CLASSES_MOCK.personalTraining,
    category: "personal_training",
    type: "personal_training",
    status: "confirmed",
    sessionId: "session_personal_training_0423",
    startsAt: "2025-04-23T15:00:00-05:00",
    endsAt: "2025-04-23T16:00:00-05:00",
    capacity: 1,
    source: "manual",
    createdAt: "2025-04-20T15:55:00-05:00",
  }),

  createBooking({
    id: "booking_011",
    reference: "BK-20250424-001",
    customer: BOOKING_CUSTOMERS_MOCK.chloe,
    bookingClass: BOOKING_CLASSES_MOCK.fitnessBoxing,
    category: "free_class",
    type: "free_class",
    status: "no_show",
    sessionId: "session_fitness_boxing_0417",
    startsAt: "2025-04-17T17:00:00-05:00",
    endsAt: "2025-04-17T18:00:00-05:00",
    capacity: 15,
    checkedIn: 0,
    source: "sms",
    createdAt: "2025-04-15T11:40:00-05:00",
  }),

  createBooking({
    id: "booking_012",
    reference: "BK-20250424-002",
    customer: BOOKING_CUSTOMERS_MOCK.noah,
    bookingClass: BOOKING_CLASSES_MOCK.advancedBoxing,
    category: "membership",
    type: "member",
    status: "confirmed",
    sessionId: "session_advanced_boxing_0424",
    startsAt: "2025-04-24T18:00:00-05:00",
    endsAt: "2025-04-24T19:00:00-05:00",
    capacity: 16,
    source: "website",
    createdAt: "2025-04-21T17:05:00-05:00",
  }),
]

/* ============================================================
   SESSION AVAILABILITY
============================================================ */

/**
 * Session-level availability is separate
 * from each individual booking's seats.
 *
 * The selected John Smith booking has
 * 1 attendee, while its full class session
 * has 12 booked seats out of 16.
 */
export const BOOKING_SESSION_AVAILABILITY_MOCK: Readonly<
  Record<string, BookingSessionAvailability>
> = {
  session_boxing_fundamentals_0422: {
    capacity: 16,
    booked: 12,
    available: 4,
    waitlisted: 0,
  },

  session_beginner_boxing_0422: {
    capacity: 12,
    booked: 9,
    available: 3,
    waitlisted: 0,
  },

  session_personal_training_0422: {
    capacity: 1,
    booked: 0,
    available: 1,
    waitlisted: 0,
  },

  session_fitness_boxing_0422: {
    capacity: 15,
    booked: 15,
    available: 0,
    waitlisted: 3,
  },

  session_consultation_0422: {
    capacity: 1,
    booked: 0,
    available: 1,
    waitlisted: 0,
  },

  session_advanced_boxing_0422: {
    capacity: 16,
    booked: 13,
    available: 3,
    waitlisted: 0,
  },

  session_beginner_boxing_0423: {
    capacity: 12,
    booked: 8,
    available: 4,
    waitlisted: 0,
  },

  session_boxing_fundamentals_0419: {
    capacity: 16,
    booked: 14,
    available: 2,
    waitlisted: 0,
  },

  session_consultation_0423: {
    capacity: 1,
    booked: 0,
    available: 1,
    waitlisted: 0,
  },

  session_personal_training_0423: {
    capacity: 1,
    booked: 1,
    available: 0,
    waitlisted: 0,
  },

  session_fitness_boxing_0417: {
    capacity: 15,
    booked: 15,
    available: 0,
    waitlisted: 0,
  },

  session_advanced_boxing_0424: {
    capacity: 16,
    booked: 11,
    available: 5,
    waitlisted: 0,
  },
}

/* ============================================================
   DASHBOARD STATISTICS
============================================================ */

/**
 * Aggregate values based on the design.
 *
 * They represent a larger fictional
 * dataset, not just BOOKINGS_MOCK.
 */
export const BOOKING_STATS_MOCK: readonly BookingStat[] = [
  {
    id: "total_bookings",
    value: 186,
    trend: {
      percentage: 12,
      direction: "up",
      label: "from last week",
    },
    description: null,
  },
  {
    id: "free_class_bookings",
    value: 48,
    trend: {
      percentage: 18,
      direction: "up",
      label: "from last week",
    },
    description: null,
  },
  {
    id: "this_week",
    value: 42,
    trend: null,
    description: "6 pending",
  },
  {
    id: "confirmed",
    value: 136,
    trend: null,
    description: "73% confirmation rate",
  },
  {
    id: "no_show",
    value: 8,
    trend: null,
    description: "4% no-show rate",
  },
]

export const BOOKING_STATISTICS_MOCK: BookingStatistics = {
  totalBookings: 186,

  freeClassBookings: 48,

  thisWeek: 42,

  pendingThisWeek: 6,

  confirmed: 136,

  confirmationRate: 73,

  noShow: 8,

  noShowRate: 4,

  stats: BOOKING_STATS_MOCK,

  updatedAt: BOOKINGS_MOCK_UPDATED_AT,
}

/* ============================================================
   AGGREGATE TAB COUNTS
============================================================ */

/**
 * These are separate mock aggregate counts.
 *
 * Waitlist overlaps booking categories,
 * so the tab counts do not add up to 186.
 */
export const BOOKING_AGGREGATE_TAB_COUNTS_MOCK: BookingTabCounts = {
  all: 186,
  free_class: 48,
  membership: 85,
  personal_training: 32,
  consultation: 21,
  waitlist: 12,
}

/**
 * Counts that match the records rendered by the local preview table.
 */
export const BOOKING_TAB_COUNTS_MOCK = getBookingTabCounts(BOOKINGS_MOCK)

/* ============================================================
   LOOKUP MAPS
============================================================ */

const BOOKINGS_BY_ID = new Map(
  BOOKINGS_MOCK.map((booking) => [booking.id, booking])
)

const BOOKING_CLASSES_BY_ID = new Map(
  BOOKING_CLASS_OPTIONS_MOCK.map((bookingClass) => [
    bookingClass.id,
    bookingClass,
  ])
)

const BOOKING_COACHES_BY_ID = new Map(
  BOOKING_COACH_OPTIONS_MOCK.map((coach) => [coach.id, coach])
)

/* ============================================================
   LOOKUP HELPERS
============================================================ */

export function getBookingMockById(bookingId: BookingId): Booking | null {
  return BOOKINGS_BY_ID.get(bookingId) ?? null
}

export function getBookingClassMockById(classId: string): BookingClass | null {
  return BOOKING_CLASSES_BY_ID.get(classId) ?? null
}

export function getBookingCoachMockById(coachId: string): BookingCoach | null {
  return BOOKING_COACHES_BY_ID.get(coachId) ?? null
}

export function getBookingSessionAvailabilityMock(
  sessionId: string | null
): BookingSessionAvailability | null {
  if (!sessionId) return null

  return BOOKING_SESSION_AVAILABILITY_MOCK[sessionId] ?? null
}

/* ============================================================
   FILTER HELPERS
============================================================ */

export function getBookingsMockByStatus(
  status: BookingStatus
): readonly Booking[] {
  return BOOKINGS_MOCK.filter((booking) => booking.status === status)
}

export function getBookingsMockByCategory(
  category: BookingCategory
): readonly Booking[] {
  return BOOKINGS_MOCK.filter((booking) => booking.category === category)
}

export function getBookingsMockByTab(tab: BookingTab): readonly Booking[] {
  if (tab === "all") {
    return BOOKINGS_MOCK
  }

  if (tab === "waitlist") {
    return BOOKINGS_MOCK.filter((booking) => booking.status === "waitlist")
  }

  return BOOKINGS_MOCK.filter((booking) => booking.category === tab)
}

/* ============================================================
   SAMPLE DATA COUNTS
============================================================ */

/**
 * These counts are derived from the
 * 12 preview records only.
 */
export const BOOKING_PREVIEW_TAB_COUNTS_MOCK = BOOKING_TAB_COUNTS_MOCK

export const BOOKING_PREVIEW_STATUS_COUNTS_MOCK: BookingStatusCounts = (() => {
  const counts = createEmptyBookingStatusCounts()

  for (const booking of BOOKINGS_MOCK) {
    counts[booking.status] += 1
  }

  return counts
})()

/* ============================================================
   MOCK PAGINATION
============================================================ */

export const BOOKINGS_MOCK_PAGE_SIZE = 10

export const BOOKINGS_MOCK_TOTAL_RECORDS = BOOKINGS_MOCK.length

/**
 * Preview dataset only.
 *
 * A production API should return its
 * own page metadata.
 */
export function getBookingsMockPage(
  page: number,
  pageSize = BOOKINGS_MOCK_PAGE_SIZE
) {
  const safePageSize = Math.max(1, Math.trunc(pageSize))

  const safePage = Math.max(1, Math.trunc(page))

  const start = (safePage - 1) * safePageSize

  const items = BOOKINGS_MOCK.slice(start, start + safePageSize)

  return {
    items,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalItems: BOOKINGS_MOCK_TOTAL_RECORDS,
      totalPages: Math.ceil(BOOKINGS_MOCK_TOTAL_RECORDS / safePageSize),
    },
  }
}
