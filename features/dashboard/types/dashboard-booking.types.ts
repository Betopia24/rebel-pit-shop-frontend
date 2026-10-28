export type DashboardBookingId = string;

export type DashboardBookingISODateTime = string;

export type DashboardBookingDate = string;

export type DashboardBookingStatus = "pending" | "confirmed" | "needs_follow_up" | "cancelled" | "completed";

export type DashboardBookingSessionType = "group_class" | "personal_training" | "consultation";

export interface DashboardBookingCustomer {
    id: string;
    name: string;
}

export interface DashboardBookingCoach {
    id: string;
    name: string;
}

export interface DashboardBookingSession {
    id: string;
    title: string;
    type: DashboardBookingSessionType;
}

export interface DashboardBookingRequest {
    id: DashboardBookingId;
    customer: DashboardBookingCustomer;
    requestedSession: DashboardBookingSession;
    preferredStartsAt: DashboardBookingISODateTime | null;
    status: DashboardBookingStatus;
    coach: DashboardBookingCoach | null;
    requestedAt: DashboardBookingISODateTime;
}

export interface DashboardBookingData {
    requests: readonly DashboardBookingRequest[];
    totalRequests: number;
    timezone: string;
    updatedAt: DashboardBookingISODateTime | null;
}

export interface DashboardBookingStatusConfig {
    id: DashboardBookingStatus;
    label: string;
    className: string;
}

export type DashboardBookingColumnId = "customer" | "requested_class" | "preferred_time" | "status" | "coach";

export interface DashboardBookingColumnConfig {
    id: DashboardBookingColumnId;
    label: string;
    align?: "left" | "center" | "right";
}

export type DashboardBookingPreviewStatus = "loading" | "success" | "empty" | "error";

export interface BookingRequestRowProps {
    request: DashboardBookingRequest | null;
    timezone: string;
    isLoading?: boolean;
    error?: string | null;
    className?: string;
}

export interface BookingRequestsProps {
    data: DashboardBookingData | null;
    status: DashboardBookingPreviewStatus;
    error?: string | null;
    onRetry?: () => void;
    className?: string;
}