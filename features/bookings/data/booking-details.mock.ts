import type {
  Booking,
  BookingAction,
  BookingId,
  BookingStatus,
} from "../types/booking.types"

import type {
  BookingActionAvailability,
  BookingAdditionalInformation,
  BookingAttendee,
  BookingAttendeesData,
  BookingDetails,
  BookingDetailsActions,
  BookingDetailsResult,
  BookingDetailsTabData,
  BookingMessageReference,
  BookingMessagesData,
  BookingNote,
  BookingNotesData,
  BookingStatusHistoryItem,
} from "../types/booking-details.types"

import {
  BOOKINGS_MOCK,
  BOOKINGS_MOCK_TIMEZONE,
  BOOKINGS_MOCK_UPDATED_AT,
  getBookingMockById,
  getBookingSessionAvailabilityMock,
} from "./bookings.mock"

/**
 * ============================================================
 * REBEL PIT SHOP
 * Bookings — Details Mock Data
 * ============================================================
 *
 * Development-only fixtures for:
 *
 * - Booking Details Panel
 * - Details tab
 * - Attendees tab
 * - Notes tab
 * - Messages tab
 * - Booking actions
 *
 * John Smith has a fully populated fixture.
 *
 * All remaining bookings receive consistent,
 * booking-specific fallback details.
 *
 * IMPORTANT:
 *
 * These are fictional development records.
 * Do not treat them as live booking data.
 * ============================================================
 */

/* ============================================================
   CONSTANTS
============================================================ */

export const BOOKING_DETAILS_MOCK_TIMEZONE = BOOKINGS_MOCK_TIMEZONE

export const BOOKING_DETAILS_MOCK_UPDATED_AT = BOOKINGS_MOCK_UPDATED_AT

/* ============================================================
   SHARED HELPERS
============================================================ */

function getAllowedStatuses(status: BookingStatus): readonly BookingStatus[] {
  switch (status) {
    case "pending":
      return ["confirmed", "cancelled"]

    case "confirmed":
      return ["completed", "cancelled", "no_show"]

    case "waitlist":
      return ["confirmed", "cancelled"]

    case "completed":
    case "cancelled":
    case "no_show":
      return []
  }
}

/**
 * Mock UI actions based on booking state.
 *
 * These rules are illustrative only.
 * Production permissions must come from
 * the backend's authoritative response.
 */
function createActionAvailability(booking: Booking): BookingDetailsActions {
  const isTerminal =
    booking.status === "completed" ||
    booking.status === "cancelled" ||
    booking.status === "no_show"

  const availableActions: readonly BookingAction[] = [
    "view",
    "edit",
    "confirm",
    "cancel",
    "reschedule",
    "mark_completed",
    "mark_no_show",
    "send_message",
    "view_lead",
  ]

  const items: BookingActionAvailability[] = availableActions.map((action) => {
    let enabled = false
    let disabledReason: string | null = null

    switch (action) {
      case "view":
        enabled = true
        break

      case "edit":
        enabled = !isTerminal
        break

      case "confirm":
        enabled = booking.status === "pending" || booking.status === "waitlist"
        break

      case "cancel":
      case "reschedule":
        enabled = !isTerminal
        break

      case "mark_completed":
      case "mark_no_show":
        enabled = booking.status === "confirmed"
        break

      case "send_message":
        enabled = true
        break

      case "view_lead":
        enabled = booking.leadId !== null
        break
    }

    if (!enabled) {
      disabledReason =
        action === "view_lead"
          ? "No lead is linked to this booking."
          : "This action is unavailable for the current booking status."
    }

    return {
      action,
      enabled,
      disabledReason,
    }
  })

  return {
    items,
    allowedStatuses: getAllowedStatuses(booking.status),
  }
}

/* ============================================================
   DEFAULT ADDITIONAL INFORMATION
============================================================ */

function createDefaultAdditionalInformation(): BookingAdditionalInformation {
  return {
    experienceLevel: "unknown",
    goal: null,
    notes: null,
    customFields: [],
  }
}

/* ============================================================
   DEFAULT STATUS HISTORY
============================================================ */

function createDefaultStatusHistory(
  booking: Booking
): readonly BookingStatusHistoryItem[] {
  return [
    {
      id: `history_${booking.id}_001`,
      from: null,
      to: booking.status,
      changedAt: booking.updatedAt,
      changedBy: "System",
      reason: null,
    },
  ]
}

/* ============================================================
   DEFAULT ATTENDEES
============================================================ */

/**
 * A preview booking's attendee count does
 * not guarantee individual attendee profiles
 * were included in the API response.
 *
 * Unknown attendee records are not
 * fabricated by the fallback factory.
 */
function createDefaultAttendees(booking: Booking): BookingAttendeesData {
  return {
    items: [],
    totalCount: booking.attendance.attendees,
    checkedInCount: booking.attendance.checkedIn ?? 0,
  }
}

/* ============================================================
   DEFAULT NOTES
============================================================ */

function createDefaultNotes(booking: Booking): BookingNotesData {
  return {
    items: [],
    totalCount: booking.notesCount,
  }
}

/* ============================================================
   DEFAULT MESSAGES
============================================================ */

function createDefaultMessages(booking: Booking): BookingMessagesData {
  return {
    items: [],
    totalCount: booking.messagesCount,
    unreadCount: 0,
    conversationHref: null,
  }
}

/* ============================================================
   DEFAULT DETAILS FACTORY
============================================================ */

export function createDefaultBookingDetails(booking: Booking): BookingDetails {
  const details: BookingDetailsTabData = {
    customer: {
      customer: booking.customer,
      isNewLead: booking.customer.kind === "visitor",
      previousBookingsCount: null,
      specialRequests: null,
    },

    classInformation: {
      availability: getBookingSessionAvailabilityMock(
        booking.schedule.sessionId
      ),
      durationMinutes: getDurationMinutes(booking),
      description: null,
      assistantCoaches: [],
    },

    status: {
      currentStatus: booking.status,
      allowedTransitions: getAllowedStatuses(booking.status),
      history: createDefaultStatusHistory(booking),
      lastChangedAt: booking.updatedAt,
    },

    source: {
      source: booking.source,
      campaignName: null,
      externalReference: booking.source.externalReference ?? null,
    },

    additionalInformation: createDefaultAdditionalInformation(),
  }

  return {
    id: booking.id,
    booking,

    header: {
      bookingId: booking.id,
      reference: booking.reference,
      status: booking.status,
      bookedAt: booking.createdAt,
      hasLinkedLead: booking.leadId !== null,
    },

    details,

    attendees: createDefaultAttendees(booking),

    notes: createDefaultNotes(booking),

    messages: createDefaultMessages(booking),

    actions: createActionAvailability(booking),

    timezone: booking.schedule.timezone || BOOKING_DETAILS_MOCK_TIMEZONE,

    updatedAt: booking.updatedAt,
  }
}

/* ============================================================
   DURATION HELPER
============================================================ */

function getDurationMinutes(booking: Booking): number | null {
  const start = Date.parse(booking.schedule.startsAt)

  const end = Date.parse(booking.schedule.endsAt)

  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return null
  }

  return Math.round((end - start) / 60_000)
}

/* ============================================================
   JOHN SMITH — BOOKING REFERENCE
============================================================ */

const johnBooking = getBookingMockById("booking_001")

if (!johnBooking) {
  throw new Error("John Smith's booking is missing from bookings.mock.ts.")
}

/* ============================================================
   JOHN SMITH — STATUS HISTORY
============================================================ */

const JOHN_STATUS_HISTORY: readonly BookingStatusHistoryItem[] = [
  {
    id: "history_john_001",

    from: null,

    to: "pending",

    changedAt: "2025-04-18T10:24:00-05:00",

    changedBy: "System",

    reason: "Free class booking submitted through the website.",
  },
  {
    id: "history_john_002",

    from: "pending",

    to: "confirmed",

    changedAt: "2025-04-18T11:00:00-05:00",

    changedBy: "Admin",

    reason: "Free trial reservation confirmed.",
  },
]

/* ============================================================
   JOHN SMITH — ATTENDEES
============================================================ */

const JOHN_ATTENDEES: readonly BookingAttendee[] = [
  {
    id: "attendee_john_001",

    customerId: johnBooking.customer.id,

    name: johnBooking.customer.name,

    avatarUrl: johnBooking.customer.avatarUrl,

    phone: johnBooking.customer.phone,

    email: johnBooking.customer.email,

    status: "registered",

    registeredAt: johnBooking.createdAt,

    checkedInAt: null,

    notes: "First-time boxing participant.",
  },
]

const JOHN_ATTENDEES_DATA: BookingAttendeesData = {
  items: JOHN_ATTENDEES,

  totalCount: 1,

  checkedInCount: 0,
}

/* ============================================================
   JOHN SMITH — NOTES
============================================================ */

const JOHN_NOTES: readonly BookingNote[] = [
  {
    id: "note_john_001",

    content:
      "First-time visitor. Interested in beginner-friendly boxing and improving general fitness.",

    visibility: "internal",

    author: {
      id: "coach_cory",
      name: "Cory Miller",
      avatarUrl: null,
      type: "coach",
    },

    createdAt: "2025-04-18T11:10:00-05:00",

    updatedAt: null,

    canEdit: true,

    canDelete: true,
  },
  {
    id: "note_john_002",

    content:
      "Please arrive 10–15 minutes before the class. Comfortable workout clothing is recommended.",

    visibility: "customer_visible",

    author: {
      id: "admin_001",
      name: "Admin",
      avatarUrl: null,
      type: "admin",
    },

    createdAt: "2025-04-18T11:15:00-05:00",

    updatedAt: null,

    canEdit: true,

    canDelete: false,
  },
]

const JOHN_NOTES_DATA: BookingNotesData = {
  items: JOHN_NOTES,

  totalCount: JOHN_NOTES.length,
}

/* ============================================================
   JOHN SMITH — MESSAGES
============================================================ */

/**
 * Lightweight message previews only.
 *
 * The Inbox remains the source of truth
 * for complete conversations.
 */
const JOHN_MESSAGES: readonly BookingMessageReference[] = [
  {
    id: "message_john_001",

    conversationId: "conversation_john_001",

    channel: "website",

    direction: "incoming",

    contentType: "text",

    preview: "Hi, I'd like to book a free boxing class.",

    sentAt: "2025-04-18T10:20:00-05:00",

    senderName: "John Smith",
  },
  {
    id: "message_john_002",

    conversationId: "conversation_john_001",

    channel: "website",

    direction: "outgoing",

    contentType: "text",

    preview: "Absolutely! We have a Boxing Fundamentals class available.",

    sentAt: "2025-04-18T10:22:00-05:00",

    senderName: "Rebel Pit Shop",
  },
  {
    id: "message_john_003",

    conversationId: "conversation_john_001",

    channel: "website",

    direction: "incoming",

    contentType: "text",

    preview: "That sounds great. It's my first time boxing.",

    sentAt: "2025-04-18T10:23:00-05:00",

    senderName: "John Smith",
  },
]

const JOHN_MESSAGES_DATA: BookingMessagesData = {
  items: JOHN_MESSAGES,

  totalCount: JOHN_MESSAGES.length,

  unreadCount: 0,

  conversationHref: "/inbox?conversationId=conversation_john_001",
}

/* ============================================================
   JOHN SMITH — ADDITIONAL INFORMATION
============================================================ */

const JOHN_ADDITIONAL_INFORMATION: BookingAdditionalInformation = {
  experienceLevel: "beginner",

  goal: "Fitness & weight loss",

  notes: "Interested in morning classes.",

  customFields: [
    {
      id: "first_time",
      label: "First Time Boxing",
      value: "Yes",
    },
    {
      id: "training_goal",
      label: "Training Goal",
      value: "Improve overall fitness",
    },
  ],
}

/* ============================================================
   JOHN SMITH — COMPLETE DETAILS
============================================================ */

const johnBaseDetails = createDefaultBookingDetails(johnBooking)

export const JOHN_BOOKING_DETAILS_MOCK: BookingDetails = {
  ...johnBaseDetails,

  details: {
    ...johnBaseDetails.details,

    customer: {
      customer: johnBooking.customer,

      isNewLead: true,

      previousBookingsCount: 0,

      specialRequests: "Interested in beginner-friendly sessions.",
    },

    classInformation: {
      availability: getBookingSessionAvailabilityMock(
        johnBooking.schedule.sessionId
      ),

      durationMinutes: 60,

      description:
        "An introductory boxing class covering stance, footwork, basic punches, and foundational technique.",

      assistantCoaches: [],
    },

    status: {
      currentStatus: "confirmed",

      allowedTransitions: getAllowedStatuses("confirmed"),

      history: JOHN_STATUS_HISTORY,

      lastChangedAt: "2025-04-18T11:00:00-05:00",
    },

    source: {
      source: johnBooking.source,

      campaignName: null,

      externalReference: null,
    },

    additionalInformation: JOHN_ADDITIONAL_INFORMATION,
  },

  attendees: JOHN_ATTENDEES_DATA,

  notes: JOHN_NOTES_DATA,

  messages: JOHN_MESSAGES_DATA,

  actions: createActionAvailability(johnBooking),

  updatedAt: BOOKING_DETAILS_MOCK_UPDATED_AT,
}

/* ============================================================
   COMPLETE MOCK DETAILS DATASET
============================================================ */

/**
 * Every preview booking has a details
 * payload so selection works across
 * the entire development table.
 */
export const BOOKING_DETAILS_MOCK: readonly BookingDetails[] =
  BOOKINGS_MOCK.map((booking) =>
    booking.id === "booking_001"
      ? JOHN_BOOKING_DETAILS_MOCK
      : createDefaultBookingDetails(booking)
  )

/* ============================================================
   LOOKUP MAP
============================================================ */

const BOOKING_DETAILS_BY_ID = new Map<BookingId, BookingDetails>(
  BOOKING_DETAILS_MOCK.map((details) => [details.id, details])
)

/* ============================================================
   LOOKUP HELPERS
============================================================ */

/**
 * Find a selected booking's details.
 *
 * Returns null when the booking ID
 * does not exist in mock data.
 */
export function getBookingDetailsMockById(
  bookingId: BookingId
): BookingDetails | null {
  return BOOKING_DETAILS_BY_ID.get(bookingId) ?? null
}

/* ============================================================
   DATA STATES
============================================================ */

export const BOOKING_DETAILS_SUCCESS_MOCK: BookingDetailsResult = {
  data: JOHN_BOOKING_DETAILS_MOCK,

  status: "success",

  error: null,
}

export const BOOKING_DETAILS_LOADING_MOCK: BookingDetailsResult = {
  data: null,

  status: "loading",

  error: null,
}

export const BOOKING_DETAILS_EMPTY_MOCK: BookingDetailsResult = {
  data: null,

  status: "empty",

  error: null,
}

export const BOOKING_DETAILS_ERROR_MOCK: BookingDetailsResult = {
  data: null,

  status: "error",

  error: "Unable to load booking details.",
}

/* ============================================================
   MOCK RESULT HELPER
============================================================ */

/**
 * Simulates an API-style lookup response.
 *
 * Useful for local UI development
 * and parent component integration.
 */
export function getBookingDetailsMockResult(
  bookingId: BookingId
): BookingDetailsResult {
  const details = getBookingDetailsMockById(bookingId)

  if (!details) {
    return {
      data: null,
      status: "empty",
      error: null,
    }
  }

  return {
    data: details,
    status: "success",
    error: null,
  }
}
