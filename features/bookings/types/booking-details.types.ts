
import type {
  Booking,
  BookingAction,
  BookingCoach,
  BookingConversationId,
  BookingCustomer,
  BookingId,
  BookingISODateTime,
  BookingSessionAvailability,
  BookingSourceInfo,
  BookingStatus,
} from "./booking.types";


export type BookingDetailsId = BookingId;

export type BookingAttendeeId = string;

export type BookingNoteId = string;

export type BookingMessageId = string;


export type BookingDetailsTabId = "details" | "attendees" | "notes" | "messages";

export interface BookingDetailsTabCounts {
    attendees: number;
    notes: number;
    messages: number;
}


export interface BookingDetailsHeaderData {
    bookingId: BookingId;
    reference: string;
    status: BookingStatus;
    bookedAt: BookingISODateTime;
    hasLinkedLead: boolean;
}


export interface BookingCustomerDetails {
    customer: BookingCustomer;
    isNewLead: boolean;
    previousBookingsCount: number | null;
    specialRequests: string | null;
}


export interface BookingClassDetails {
    availability: BookingSessionAvailability | null;
    durationMinutes: number | null;
    description: string | null;
    assistantCoaches: readonly BookingCoach[];
}

export interface BookingStatusHistoryItem {
    id: string;
    from: BookingStatus | null;
    to: BookingStatus;
    changedAt: BookingISODateTime;
    changedBy: string | null;
    reason: string | null;
}

export interface BookingStatusDetails {
    currentStatus: BookingStatus;
    allowedTransitions: readonly BookingStatus[];
    history: readonly BookingStatusHistoryItem[];
    lastChangedAt: BookingISODateTime | null;
}


export interface BookingSourceDetails {
    source: BookingSourceInfo;
    campaignName: string | null
    externalReference: string | null;
}

export type BookingExperienceLevel = "beginner" | "intermediate" | "experienced" | "unknown";

export interface BookingAdditionalInformation {
    experienceLevel: BookingExperienceLevel;
    goal: string | null;
    notes: string | null;
    customFields: readonly BookingCustomField[];
}

export interface BookingCustomField {
    id: string;
    label: string;
    value: string | null;
}

export interface BookingDetailsTabData {
    customer: BookingCustomerDetails;
    classInformation: BookingClassDetails;
    status: BookingStatusDetails;
    source: BookingSourceDetails;
    additionalInformation: BookingAdditionalInformation;
}

export type BookingAttendeeStatus = "registered" | "checked_in" | "attended" | "no_show" | "cancelled";

export interface BookingAttendee {
    id: BookingAttendeeId;
    customerId: string | null;
    name: string;
    avatarUrl: string | null;
    phone: string | null;
    email: string | null;
    status: BookingAttendeeStatus;
    registeredAt: BookingISODateTime;
    checkedInAt: BookingISODateTime | null;
    notes: string | null;
}

export interface BookingAttendeesData {
    items: readonly BookingAttendee[];
    totalCount: number;
    checkedInCount: number;
}


export type BookingNoteVisibility = "internal" | "customer_visible";

export type BookingNoteAuthorType = "admin" | "coach" | "system"| "ai";

export interface BookingNoteAuthor {
    id: string | null;
    name: string;
    avatarUrl: string | null;
    type: BookingNoteAuthorType;
}

export interface BookingNote {
    id: BookingNoteId;
    content: string;
    visibility: BookingNoteVisibility;
    author: BookingNoteAuthor;
    createdAt: BookingISODateTime;
    updatedAt: BookingISODateTime | null;
    canEdit: boolean;
    canDelete: boolean;
}

export interface BookingNotesData {
    items: readonly BookingNote[];
    totalCount: number;
}

export interface CreateBookingNoteInput {
    bookingId: BookingId;
    content: string;
    visibility: BookingNoteVisibility;
}

export interface UpdateBookingNoteInput {
    bookingId: BookingId;
    noteId: BookingNoteId;
    content: string;
}

export type BookingMessageChannel = "messenger" | "instagram" | "website" | "sms";

export type BookingMessageDirection = "incoming" | "outgoing";

export type BookingMessageContentType = "text" | "image" | "audio" | "video" | "file" | "system";

export interface BookingMessageReference {
    id: BookingMessageId;
    conversationId: BookingConversationId;
    channel: BookingMessageChannel;
    direction: BookingMessageDirection;
    contentType: BookingMessageContentType;
    preview: string | null;
    sentAt: BookingISODateTime;
    senderName: string | null;
}

export interface BookingMessagesData {
    items: readonly BookingMessageReference[];
    totalCount: number;
    unreadCount: number;
    conversationHref: string | null;
}


export interface BookingActionAvailability {
    action: BookingAction;
    enabled: boolean;
    disabledReason: string | null;
}

export interface BookingDetailsActions {
    items: readonly BookingActionAvailability[];
    allowedStatuses: readonly BookingStatus[];
}


export interface BookingDetails {
    id: BookingDetailsId;
    booking: Booking;
    header: BookingDetailsHeaderData;
    details: BookingDetailsTabData;
    attendees: BookingAttendeesData;
    notes: BookingNotesData;
    messages: BookingMessagesData;
    actions: BookingDetailsActions;
    timezone: string;
    updatedAt: BookingISODateTime | null;
}


export type BookingDetailsStatus = "idle" | "loading" | "success" | "empty" | "error";

export interface BookingDetailsResult {
    data: BookingDetails | null;
    status: BookingDetailsStatus;
    error: string | null;
}


export interface BookingDetailsPanelState {
    selectedBookingId: BookingId | null;
    activeTab: BookingDetailsTabId;
    isOpen: boolean;
}


export type BookingActionStatus = "idle" | "submitting" | "success" | "error";

export interface BookingActionState {
    action: BookingAction | null;
    status: BookingActionStatus;
    error: string | null;
}


export function isValidBookingDetailsCount(
  value: number,
): boolean {
  return (
    Number.isInteger(value) &&
    value >= 0
  );
}


export function isValidSessionAvailability(
  value: BookingSessionAvailability,
): boolean {
  const {
    capacity,
    booked,
    available,
    waitlisted,
  } = value;

  return (
    isValidBookingDetailsCount(capacity) &&
    isValidBookingDetailsCount(booked) &&
    isValidBookingDetailsCount(available) &&
    isValidBookingDetailsCount(waitlisted) &&
    booked <= capacity &&
    available === capacity - booked
  );
}


export function getBookingDetailsTabCounts(
  details: BookingDetails,
): BookingDetailsTabCounts {
  return {
    attendees: details.attendees.totalCount,

    notes: details.notes.totalCount,

    messages: details.messages.totalCount,
  };
}


export function getBookingActionAvailability(
  actions: BookingDetailsActions,
  action: BookingAction,
): BookingActionAvailability {
  return (
    actions.items.find(
      (item) => item.action === action,
    ) ?? {
      action,
      enabled: false,
      disabledReason: "Action unavailable",
    }
  );
}
