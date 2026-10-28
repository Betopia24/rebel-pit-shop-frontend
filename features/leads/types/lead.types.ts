export type LeadId = string

export type LeadISODateTime = string

export type LeadDate = string

export type LeadStage =
  | "new_inquiry"
  | "ai_qualified"
  | "free_class_requested"
  | "booking_confirmed"
  | "trial_attended"
  | "membership_converted"

export type LeadTemperature = "hot" | "warm" | "cold"

export type LeadChannel = "messenger" | "instagram" | "website" | "sms"

export interface LeadCustomer {
  id: string
  name: string
  avatarUrl: string | null
  phone: string | null
  email: string | null
  location: string | null
  preferredChannel: LeadChannel | null
}

export interface LeadCoach {
  id: string
  name: string
  avatarUrl: string | null
}

export type LeadExperienceLevel =
  "beginner" | "intermediate" | "experienced" | "unknown"

export type LeadInterestType =
  | "free_class"
  | "personal_training"
  | "membership"
  | "open_gym"
  | "group_class"
  | "other"

export interface LeadInterest {
  type: LeadInterestType
  title: string
  description: string | null
}

export interface LeadQualification {
  experienceLevel: LeadExperienceLevel
  goal: string | null
  interestedIn: string | null
  weeklyFrequency: string | null
  budget: string | null
  tags: readonly string[]
  updatedAt: LeadISODateTime | null
}

export interface LeadBookingInterest {
  preferredStartsAt: LeadISODateTime | null
  requestedClassId: string | null
  requestedClassName: string | null
  interestedService: string | null
  notes: string | null
}

export type LeadFollowUpStatus =
  "open" | "scheduled" | "completed" | "cancelled"

export type LeadDateFilterPreset =
  "all_time" | "today" | "this_week" | "this_month" | "last_3_months" | "custom"

export interface LeadFollowUp {
  id: string
  nextFollowUpAt: LeadISODateTime | null
  assignedCoach: LeadCoach | null
  stage: string | null
  status: LeadFollowUpStatus
  notes: string | null
}

export interface LeadAIOverview {
  summary: string | null
  recommendedNextAction: string | null
  lastAnalyzedAt: LeadISODateTime | null
}

export interface LeadActivity {
  label: string
  occurredAt: LeadISODateTime
}

export interface Lead {
  id: LeadId
  customer: LeadCustomer
  stage: LeadStage
  temperature: LeadTemperature
  source: LeadChannel
  channel: LeadChannel
  experienceLevel: LeadExperienceLevel
  interest: LeadInterest
  assignedCoach: LeadCoach | null
  lastActivity: LeadActivity
  conversationCount: number
  bookingCount: number
  createdAt: LeadISODateTime
  updatedAt: LeadISODateTime
}

export interface LeadStageUpdate {
  leadId: LeadId
  stage: LeadStage
}

export interface LeadTemperatureUpdate {
  leadId: LeadId
  temperature: LeadTemperature
}

export interface LeadCoachAssignment {
  leadId: LeadId
  coachId: string | null
}
