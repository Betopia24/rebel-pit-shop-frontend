
import type {
  Lead,
  LeadId,
} from "../types/lead.types";

import type {
  LeadAIInsightsData,
  LeadAISummary,
  LeadBookingInterestDetails,
  LeadBookingsData,
  LeadConversationsData,
  LeadConversionReadiness,
  LeadDetails,
  LeadDetailsResult,
  LeadDetailsTabData,
  LeadFollowUpDetails,
  LeadQualificationDetails,
} from "../types/lead-details.types";

import {
  getLeadMockById,
  LEADS_MOCK,
} from "./leads.mock";

/**
 * ============================================================
 * REBEL BOXING CLUB
 * Leads — Details Panel Mock Data
 * ============================================================
 *
 * Development-only mock data for:
 *
 * - Details tab
 * - Basic Information
 * - Lead Qualification
 * - Booking Interest
 * - Follow-up
 * - AI Summary
 * - Conversion Readiness
 * - AI Insights
 * - Conversations
 * - Bookings
 *
 * Sarah M. has a detailed reference fixture.
 *
 * All other mock leads receive deterministic,
 * lead-specific fallback details.
 *
 * No API calls, React components or hooks.
 * ============================================================
 */

/* ============================================================
   CONSTANTS
============================================================ */

export const LEAD_DETAILS_MOCK_TIMEZONE =
  "America/Chicago";

export const LEAD_DETAILS_MOCK_UPDATED_AT =
  "2024-04-22T16:00:00-05:00";

/* ============================================================
   SHARED HELPERS
============================================================ */

function createDefaultQualification(
  lead: Lead,
): LeadQualificationDetails {
  return {
    experienceLevel: lead.experienceLevel,

    goal: lead.interest.description,

    interestedIn: lead.interest.title,

    weeklyFrequency: null,

    budget: null,

    tags: [
      lead.interest.title,
    ],

    updatedAt: lead.updatedAt,

    score: null,

    isQualified: lead.stage !== "new_inquiry",

    missingFields:
      lead.stage === "new_inquiry"
        ? ["Weekly training frequency"]
        : [],
  };
}

function createDefaultBookingInterest(
  lead: Lead,
): LeadBookingInterestDetails {
  return {
    preferredStartsAt: null,

    requestedClassId: null,

    requestedClassName: null,

    interestedService: lead.interest.title,

    notes: null,

    preferredClassType: null,

    preferredDays: [],

    preferredTimeOfDay: null,

    trialRequested:
      lead.interest.type === "free_class" ||
      lead.stage === "free_class_requested" ||
      lead.stage === "booking_confirmed" ||
      lead.stage === "trial_attended" ||
      lead.stage === "membership_converted",
  };
}

function createDefaultAISummary(
  lead: Lead,
): LeadAISummary {
  return {
    summary: `${lead.customer.name} is interested in ${lead.interest.title.toLowerCase()}.`,

    recommendedNextAction: null,

    lastAnalyzedAt: lead.updatedAt,

    temperatureReason: null,

    detectedIntent: lead.interest.title,

    keyPoints: [
      lead.interest.description ??
        lead.interest.title,
    ],
  };
}

function createDefaultReadiness(
  lead: Lead,
): LeadConversionReadiness {
  const converted =
    lead.stage === "membership_converted";

  return {
    status: converted
      ? "converted"
      : "in_progress",

    score: converted ? 100 : null,

    items: [
      {
        id: "interest_confirmed",

        label: "Customer interest identified",

        completed: true,

        description: null,
      },
      {
        id: "membership_confirmed",

        label: "Membership confirmed",

        completed: converted,

        description: converted
          ? null
          : "Customer has not yet converted.",
      },
    ],

    evaluatedAt: lead.updatedAt,
  };
}

function createDefaultAIInsights(
  lead: Lead,
): LeadAIInsightsData {
  return {
    summary:
      `${lead.customer.name} has shown interest in ` +
      `${lead.interest.title.toLowerCase()}.`,

    insights: [],

    recommendedNextAction: null,

    analyzedAt: lead.updatedAt,
  };
}

/* ============================================================
   SARAH M. — QUALIFICATION
============================================================ */

const SARAH_QUALIFICATION: LeadQualificationDetails = {
  experienceLevel: "beginner",

  goal: "Fitness & weight loss",

  interestedIn: "Free Class",

  weeklyFrequency: "2–3 times per week",

  budget: null,

  tags: [
    "Beginner",
    "Fitness",
    "Weight Loss",
    "Free Class",
  ],

  updatedAt: "2024-04-22T09:00:00-05:00",

  score: 85,

  isQualified: true,

  missingFields: [],
};

/* ============================================================
   SARAH M. — BOOKING INTEREST
============================================================ */

const SARAH_BOOKING_INTEREST:
  LeadBookingInterestDetails = {
  preferredStartsAt:
    "2024-04-22T09:00:00-05:00",

  requestedClassId: "class_beginner_boxing",

  requestedClassName: "Beginner Boxing",

  interestedService: "Free Trial Class",

  notes:
    "Prefers morning sessions and would like to try a beginner-friendly class.",

  preferredClassType: "Group Class",

  preferredDays: [
    "monday",
    "wednesday",
  ],

  preferredTimeOfDay: "morning",

  trialRequested: true,
};

/* ============================================================
   SARAH M. — FOLLOW-UP
============================================================ */

const SARAH_FOLLOW_UP:
  LeadFollowUpDetails = {
  id: "followup_sarah_001",

  nextFollowUpAt:
    "2024-04-22T18:00:00-05:00",

  assignedCoach: {
    id: "coach_nichole",
    name: "Nichole",
    avatarUrl: null,
  },

  stage: "New Inquiry",

  status: "scheduled",

  notes:
    "Confirm preferred trial class and answer first-time boxing questions.",

  priority: "high",

  lastFollowUpAt: null,

  lastFollowUpBy: null,
};

/* ============================================================
   SARAH M. — AI SUMMARY
============================================================ */

const SARAH_AI_SUMMARY: LeadAISummary = {
  summary:
    "Sarah is a first-time boxing prospect who wants to improve fitness and lose weight. She is interested in a beginner-friendly free trial and prefers morning classes. She has provided enough information for a coach to follow up.",

  recommendedNextAction:
    "Contact Sarah to confirm a suitable beginner trial class and help her complete the booking.",

  lastAnalyzedAt:
    "2024-04-22T09:05:00-05:00",

  temperatureReason:
    "Strong intent to attend a free class, clear fitness goals, and a preferred training schedule.",

  detectedIntent:
    "Book a free beginner boxing trial",

  keyPoints: [
    "First-time boxing participant",
    "Primary goal is fitness and weight loss",
    "Interested in a free trial class",
    "Prefers morning sessions",
    "Available 2–3 times per week",
  ],
};

/* ============================================================
   SARAH M. — CONVERSION READINESS
============================================================ */

const SARAH_CONVERSION_READINESS:
  LeadConversionReadiness = {
  status: "in_progress",

  score: 60,

  items: [
    {
      id: "interest_identified",
      label: "Training interest identified",
      completed: true,
      description: null,
    },
    {
      id: "goal_captured",
      label: "Fitness goal captured",
      completed: true,
      description: null,
    },
    {
      id: "preferred_schedule",
      label: "Preferred schedule captured",
      completed: true,
      description: null,
    },
    {
      id: "trial_booked",
      label: "Trial class booked",
      completed: false,
      description:
        "Trial time still needs confirmation.",
    },
    {
      id: "membership_selected",
      label: "Membership plan selected",
      completed: false,
      description:
        "Discuss membership options after the trial.",
    },
  ],

  evaluatedAt:
    "2024-04-22T09:05:00-05:00",
};

/* ============================================================
   SARAH M. — DETAILS TAB
============================================================ */

const SARAH_DETAILS_TAB:
  LeadDetailsTabData = {
  basicInformation: {
    customerSince:
      "2024-04-21T14:30:00-05:00",

    notes:
      "Interested in beginner boxing classes.",

    assignedCoach: {
      id: "coach_nichole",
      name: "Nichole",
      avatarUrl: null,
    },

    lastContactAt:
      "2024-04-22T09:00:00-05:00",
  },

  qualification: SARAH_QUALIFICATION,

  bookingInterest: SARAH_BOOKING_INTEREST,

  followUp: SARAH_FOLLOW_UP,

  aiSummary: SARAH_AI_SUMMARY,

  conversionReadiness:
    SARAH_CONVERSION_READINESS,
};

/* ============================================================
   SARAH M. — AI INSIGHTS TAB
============================================================ */

const SARAH_AI_INSIGHTS:
  LeadAIInsightsData = {
  summary:
    "Sarah shows strong interest in beginner boxing and is a promising candidate for a free trial booking.",

  insights: [
    {
      id: "insight_sarah_intent",

      type: "intent",

      title: "Strong trial booking intent",

      description:
        "Sarah explicitly expressed interest in attending a beginner-friendly free class.",

      priority: "high",

      confidence: 0.94,

      detectedAt:
        "2024-04-22T09:00:00-05:00",
    },
    {
      id: "insight_sarah_interest",

      type: "interest",

      title: "Fitness and weight loss",

      description:
        "Her primary motivation is improving overall fitness and losing weight.",

      priority: "medium",

      confidence: 0.91,

      detectedAt:
        "2024-04-22T09:00:00-05:00",
    },
    {
      id: "insight_sarah_opportunity",

      type: "opportunity",

      title: "Morning class preference",

      description:
        "A morning beginner boxing class could be a good match for her availability.",

      priority: "medium",

      confidence: 0.87,

      detectedAt:
        "2024-04-22T09:05:00-05:00",
    },
    {
      id: "insight_sarah_recommendation",

      type: "recommendation",

      title: "Confirm trial availability",

      description:
        "A coach should verify class availability and help Sarah complete her first booking.",

      priority: "high",

      confidence: 0.92,

      detectedAt:
        "2024-04-22T09:05:00-05:00",
    },
  ],

  recommendedNextAction:
    "Follow up with Sarah and confirm a morning beginner boxing trial class.",

  analyzedAt:
    "2024-04-22T09:05:00-05:00",
};

/* ============================================================
   SARAH M. — CONVERSATIONS TAB
============================================================ */

const SARAH_CONVERSATIONS:
  LeadConversationsData = {
  items: [
    {
      id: "conversation_sarah_001",

      channel: "website",

      lastMessagePreview:
        "I've never boxed before. Can I join?",

      lastMessageAt:
        "2024-04-22T09:00:00-05:00",

      unreadCount: 1,

      href:
        "/inbox?conversationId=conversation_sarah_001",
    },
    {
      id: "conversation_sarah_002",

      channel: "website",

      lastMessagePreview:
        "I'm mainly interested in getting fit.",

      lastMessageAt:
        "2024-04-21T17:30:00-05:00",

      unreadCount: 0,

      href:
        "/inbox?conversationId=conversation_sarah_002",
    },
    {
      id: "conversation_sarah_003",

      channel: "website",

      lastMessagePreview:
        "Do you have morning classes?",

      lastMessageAt:
        "2024-04-21T15:00:00-05:00",

      unreadCount: 0,

      href:
        "/inbox?conversationId=conversation_sarah_003",
    },
    {
      id: "conversation_sarah_004",

      channel: "website",

      lastMessagePreview:
        "I would like to try a free class.",

      lastMessageAt:
        "2024-04-21T14:30:00-05:00",

      unreadCount: 0,

      href:
        "/inbox?conversationId=conversation_sarah_004",
    },
  ],

  totalCount: 4,
};

/* ============================================================
   SARAH M. — BOOKINGS TAB
============================================================ */

/**
 * Sarah has expressed booking interest,
 * but no actual booking exists yet.
 *
 * Booking interest must not be treated
 * as a confirmed booking.
 */
const SARAH_BOOKINGS: LeadBookingsData = {
  items: [],

  totalCount: 0,
};

/* ============================================================
   SARAH M. — COMPLETE RECORD
============================================================ */

const sarahLead = getLeadMockById(
  "lead_sarah_m",
);

if (!sarahLead) {
  throw new Error(
    "Sarah M. is missing from leads.mock.ts.",
  );
}

export const SARAH_LEAD_DETAILS_MOCK:
  LeadDetails = {
  id: sarahLead.id,

  lead: sarahLead,

  details: SARAH_DETAILS_TAB,

  aiInsights: SARAH_AI_INSIGHTS,

  conversations: SARAH_CONVERSATIONS,

  bookings: SARAH_BOOKINGS,

  timezone: LEAD_DETAILS_MOCK_TIMEZONE,

  updatedAt:
    LEAD_DETAILS_MOCK_UPDATED_AT,
};

/* ============================================================
   DEFAULT DETAILS FACTORY
============================================================ */

/**
 * Generates lead-specific development data
 * for leads without a dedicated detailed fixture.
 *
 * This is placeholder data, not real customer
 * qualification or AI analysis.
 *
 * Unknown information remains null rather
 * than inventing contact details or bookings.
 */
function createDefaultLeadDetails(
  lead: Lead,
): LeadDetails {
  const qualification =
    createDefaultQualification(lead);

  const bookingInterest =
    createDefaultBookingInterest(lead);

  const aiSummary =
    createDefaultAISummary(lead);

  const conversionReadiness =
    createDefaultReadiness(lead);

  return {
    id: lead.id,

    lead,

    details: {
      basicInformation: {
        customerSince: lead.createdAt,

        notes: null,

        assignedCoach:
          lead.assignedCoach,

        lastContactAt:
          lead.lastActivity.occurredAt,
      },

      qualification,

      bookingInterest,

      followUp: null,

      aiSummary,

      conversionReadiness,
    },

    aiInsights:
      createDefaultAIInsights(lead),

    conversations: {
      items: [],

      totalCount:
        lead.conversationCount,
    },

    bookings: {
      items: [],

      totalCount:
        lead.bookingCount,
    },

    timezone:
      LEAD_DETAILS_MOCK_TIMEZONE,

    updatedAt: lead.updatedAt,
  };
}

/* ============================================================
   COMPLETE MOCK DATASET
============================================================ */

/**
 * All leads have a corresponding details
 * payload so card selection can be tested.
 */
export const LEAD_DETAILS_MOCK:
  readonly LeadDetails[] = LEADS_MOCK.map(
  (lead) =>
    lead.id === "lead_sarah_m"
      ? SARAH_LEAD_DETAILS_MOCK
      : createDefaultLeadDetails(lead),
);

/* ============================================================
   LOOKUP
============================================================ */

const LEAD_DETAILS_MOCK_MAP =
  new Map<LeadId, LeadDetails>(
    LEAD_DETAILS_MOCK.map(
      (details) => [
        details.id,
        details,
      ],
    ),
  );

/**
 * Find complete details for a selected lead.
 *
 * Returns null when the ID is unknown.
 */
export function getLeadDetailsMockById(
  leadId: LeadId,
): LeadDetails | null {
  return (
    LEAD_DETAILS_MOCK_MAP.get(leadId) ??
    null
  );
}

/* ============================================================
   STATE FIXTURES
============================================================ */

export const LEAD_DETAILS_SUCCESS_MOCK:
  LeadDetailsResult = {
  data: SARAH_LEAD_DETAILS_MOCK,

  status: "success",

  error: null,
};

export const LEAD_DETAILS_LOADING_MOCK:
  LeadDetailsResult = {
  data: null,

  status: "loading",

  error: null,
};

export const LEAD_DETAILS_EMPTY_MOCK:
  LeadDetailsResult = {
  data: null,

  status: "empty",

  error: null,
};

export const LEAD_DETAILS_ERROR_MOCK:
  LeadDetailsResult = {
  data: null,

  status: "error",

  error:
    "Unable to load lead details.",
};

/* ============================================================
   DYNAMIC MOCK RESULT
============================================================ */

/**
 * Retrieve a mock API-style response.
 *
 * Useful when switching between
 * lead cards during UI development.
 */
export function getLeadDetailsMockResult(
  leadId: LeadId,
): LeadDetailsResult {
  const details =
    getLeadDetailsMockById(leadId);

  if (!details) {
    return {
      data: null,
      status: "empty",
      error: null,
    };
  }

  return {
    data: details,
    status: "success",
    error: null,
  };
}
