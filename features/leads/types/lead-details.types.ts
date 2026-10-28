import type {
  Lead,
  LeadAIOverview,
  LeadBookingInterest,
  LeadChannel,
  LeadCoach,
  LeadFollowUp,
  LeadId,
  LeadISODateTime,
  LeadQualification,
  LeadStage,
  LeadTemperature,
} from "./lead.types";

export type LeadDetailsId = LeadId;

export type LeadDetailsStatus = "loading" | "success" | "empty" | "error";

export interface LeadBasicInformation {
    customerSince: LeadISODateTime | null;
    notes: string | null;
    assignedCoach: LeadCoach | null;
    lastContactAt: LeadISODateTime | null;
}

export interface LeadQualificationDetails
  extends LeadQualification {
    score: number | null;
    isQualified: boolean;
    missingFields: readonly string[];
}

export interface LeadBookingInterestDetails
  extends LeadBookingInterest {
    preferredClassType: string | null;
    preferredDays: readonly LeadWeekday[];
    preferredTimeOfDay: LeadPreferredTimeOfDay | null;
    trialRequested: boolean;
}

export type LeadWeekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type LeadPreferredTimeOfDay = "morning" | "afternoon" | "evening" | "flexible";

export type LeadFollowUpPriority = "low" | "normal" | "high" | "urgent";

export interface LeadFollowUpDetails
    extends LeadFollowUp {
        priority: LeadFollowUpPriority;
        lastFollowUpAt: LeadISODateTime | null;
        lastFollowUpBy: LeadCoach | null;
}

export interface LeadAISummary
    extends LeadAIOverview {
        temperatureReason: string | null;
        detectedIntent: string | null;
        keyPoints: readonly string[];
}

export interface LeadReadinessItem {
    id: string;
    label: string;
    completed: boolean;
    description: string | null;
}

export type LeadConversionReadinessStatus = "not_ready" | "in_progress" | "ready" | "converted";

export interface LeadConversionReadiness {
    status: LeadConversionReadinessStatus;
    score: number | null;
    items: readonly LeadReadinessItem[];
    evaluatedAt: LeadISODateTime | null;
}

export type LeadInsightType = "intent" | "interest" | "objection" | "opportunity" | "risk" | "recommendation";

export type LeadInsightPriority = "low" | "medium" | "high";

export interface LeadAIInsight {
    id: string;
    type: LeadInsightType;
    title: string;
    description: string;
    priority: LeadInsightPriority;
    confidence: number | null;
    detectedAt: LeadISODateTime;
}

export interface LeadAIInsightsData {
    summary: string | null;
    insights: readonly LeadAIInsight[];
    recommendedNextAction: string | null;
    analyzedAt: LeadISODateTime | null;
}

export interface LeadConversationReference {
    id: string;
    channel: LeadChannel;
    lastMessagePreview: string | null;
    lastMessageAt: LeadISODateTime | null;
    unreadCount: number;
    href: string;
}

export interface LeadConversationsData {
    items: readonly LeadConversationReference[];
    totalCount: number;
}

export type LeadBookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show";

export interface LeadBookingReference {
    id: string;
    className: string;
    startsAt: LeadISODateTime | null;
    status: LeadBookingStatus;
    coach: LeadCoach | null;
    href: string;
}

export interface LeadBookingsData {
    items: readonly LeadBookingReference[];
    totalCount: number;
}

export interface LeadDetailsTabData {
    basicInformation: LeadBasicInformation;
    qualification: LeadQualificationDetails;
    bookingInterest: LeadBookingInterestDetails;
    followUp: LeadFollowUpDetails | null;
    aiSummary: LeadAISummary | null;
    conversionReadiness: LeadConversionReadiness | null;
}

export interface LeadDetails {
    id: LeadDetailsId;
    lead: Lead;
    details: LeadDetailsTabData;
    aiInsights: LeadAIInsightsData | null;
    conversations: LeadConversationsData;
    bookings: LeadBookingsData;
    timezone: string;
    updatedAt: LeadISODateTime | null;
}

export interface LeadDetailsResult {
    data: LeadDetails | null;
    status: LeadDetailsStatus;
    error: string | null;
}

export interface LeadStageChangeEvent {
    leadId: LeadId;
    previousStage: LeadStage;
    nextStage: LeadStage;
    changedAt: LeadISODateTime;
    reason: string | null;
}

export interface LeadTemperatureChangeEvent {
    leadId: LeadId;
    previousTemperature: LeadTemperature;
    nextTemperature: LeadTemperature;
    changedAt: LeadISODateTime;
    reason: string | null;
}

export type LeadDetailsTabId = "details" | "ai_insights" | "conversations" | "bookings";

export interface LeadDetailsTabCounts {
    conversations: number;
    bookings: number;
}

export function isValidLeadPercentage(
  value: number | null,
): value is number {
  return (
    value !== null &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 100
  );
}

export function isValidLeadConfidence(
  value: number | null,
): value is number {
  return (
    value !== null &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
  );
}