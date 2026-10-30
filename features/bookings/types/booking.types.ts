export type BookingId = string;

export type BookingCustomerId = string;

export type BookingCoachId = string;

export type BookingClassId = string;

export type BookingSessionId = string;

export type BookingLeadId = string;

export type BookingConversationId = string;

export type BookingISODateTime = string;

export type BookingISODate = string;

export type BookingTab = "all" | "free_class" | "membership" | "personal_training" | "consultation" | "waitlist";

export type BookingCategory = "free_class" | "membership" | "personal_training" | "consultation";

export type BookingType = | "free_class" | "member" | "consultation" | "personal_training";

export type BookingStatus = | "pending" | "confirmed" | "waitlist" | "cancelled" | "completed" | "no_show";

export interface BookingStatusChange {
    bookingId: BookingId;
    from: BookingStatus;
    to: BookingStatus;
    reason?: string | null;
}

export type BookingSource = | "website" | "instagram" | "facebook" | "sms" | "manual";

export interface BookingSourceInfo {
    channel: BookingSource;
    createdAt: BookingISODateTime;
    externalReference?: string | null;
}


export type BookingCustomerKind = | "member" | "visitor";

export interface BookingCustomer {
    id: BookingCustomerId;
    name: string;
    avatarUrl: string | null;
    phone: string | null;
    email: string | null;
    kind: BookingCustomerKind;
    leadId: BookingLeadId | null;
}


export interface BookingCoach {
    id: BookingCoachId;
    name: string;
    avatarUrl: string | null;
}


export type BookingServiceKind = | "group_class" | "personal_training" | "consultation" | "open_gym";

export interface BookingClass {
    id: BookingClassId;
    name: string;
    kind: BookingServiceKind;
    location: string | null;
    imageUrl: string | null;
    coach: BookingCoach | null;
}


export interface BookingSchedule {
    sessionId: BookingSessionId | null;
    startsAt: BookingISODateTime;
    endsAt: BookingISODateTime;
    timezone: string;
    location: string | null;
}


export interface BookingAttendance {
    attendees: number;
    capacity: number | null;
    checkedIn: number | null;
}

export interface BookingSessionAvailability {
    capacity: number;
    booked: number;
    available: number;
    waitlisted: number;
}

export interface Booking {
    id: BookingId;
    reference: string;
    customer: BookingCustomer;
    bookingClass: BookingClass;
    coach: BookingCoach | null;
    category: BookingCategory;
    type: BookingType;
    status: BookingStatus;
    schedule: BookingSchedule;
    attendance: BookingAttendance;
    source: BookingSourceInfo;
    createdAt: BookingISODateTime;
    updatedAt: BookingISODateTime;
    notesCount: number;
    messagesCount: number;
    leadId: BookingLeadId | null;
}

export interface BookingDateRange {
    from: BookingISODate | null;
    to: BookingISODate | null;
}

export interface BookingFilters {
    search: string;
    tab: BookingTab;
    dateRange: BookingDateRange;
    status: BookingStatus | null;
    classId: BookingClassId | null;
    coachId: BookingCoachId | null;
    source: BookingSource | null;
}

export const DEFAULT_BOOKING_FILTERS: BookingFilters = {
    search: "",
    tab: "all",
    dateRange: {
        from: null,
        to: null,
    },
    status: null,
    classId: null,
    coachId: null,
    source: null,
};


export type BookingSortField = "startsAt" | "customerName" | "className" | "status" | "createdAt";

export type BookingSortDirection = "asc" | "desc";

export interface BookingSort {
    field: BookingSortField;
    direction: BookingSortDirection;
}


export interface BookingPagination {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface BookingPage {
    items: readonly Booking[];
    pagination: BookingPagination;
}


export type BookingStatId = "total_bookings" | "free_class_bookings" | "this_week" | "confirmed" | "no_show";

export interface BookingStatTrend {
    percentage: number | null;
    direction: "up" | "down" | "neutral";
    label: string;
}

export interface BookingStat {
    id: BookingStatId;
    value: number;
    trend: BookingStatTrend | null;
    description: string | null;
}

export interface BookingStatistics {
    totalBookings: number;
    freeClassBookings: number;
    thisWeek: number;
    pendingThisWeek: number;
    confirmed: number;
    confirmationRate: number;
    noShow: number;
    noShowRate: number;
    stats: readonly BookingStat[];
    updatedAt: BookingISODateTime | null;
}


export interface BookingSelection {
    selectedBookingId: BookingId | null;
    selectedBookingIds: readonly BookingId[];
}


export interface BookingCancelRequest {
    bookingId: BookingId;
    reason: string | null;
    notifyCustomer: boolean;
}

export interface BookingRescheduleRequest {
    bookingId: BookingId;
    targetSessionId: BookingSessionId | null;
    startsAt: BookingISODateTime;
    endsAt: BookingISODateTime;
    timezone: string;
    notifyCustomer: boolean;
}

export interface BookingCoachAssignment {
    bookingId: BookingId;
    coachId: BookingCoachId | null;
}


export type BookingAction = "view" | "edit" | "confirm" | "cancel" | "reschedule" | "mark_completed" | "mark_no_show" | "send_message" | "view_lead";


export type BookingsDataStatus = | "idle" | "loading" | "success" | "empty" | "error";

export interface BookingsListResult {
    data: BookingPage | null;
    status: BookingsDataStatus;
    error: string | null;
}


export function isValidBookingCount(
  value: number,
): boolean {
  return (
    Number.isInteger(value) &&
    value >= 0
  );
}

export function isTerminalBookingStatus(
  status: BookingStatus,
): boolean {
  return (
    status === "completed" ||
    status === "cancelled" ||
    status === "no_show"
  );
}


export function isWaitlistedBooking(
  booking: Booking,
): boolean {
  return booking.status === "waitlist";
}


export function matchesBookingTab(
  booking: Booking,
  tab: BookingTab,
): boolean {
  if (tab === "all") return true;

  if (tab === "waitlist") {
    return isWaitlistedBooking(booking);
  }

  return booking.category === tab;
}
