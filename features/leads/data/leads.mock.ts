import type {
  Lead,
  LeadChannel,
  LeadCoach,
  LeadStage,
  LeadTemperature,
} from "../types/lead.types"

import { LEAD_STAGE_ORDER } from "../config/lead-stages.config"

/**
 * ============================================================
 * REBEL BOXING CLUB
 * Leads Pipeline — Mock Data
 * ============================================================
 *
 * Development-only dataset.
 *
 * Supports:
 * - Six pipeline stages
 * - Hot, Warm and Cold leads
 * - Messenger, Instagram, Website and SMS
 * - Coach assignments
 * - Different experience levels
 * - Class and membership interests
 * - Lead Card selection
 * - Stage filtering
 * - Temperature filtering
 * - Channel filtering
 * - Coach filtering
 *
 * All timestamps are deterministic.
 *
 * Business timezone: America/Chicago
 *
 * No API requests, React components or hooks.
 * ============================================================
 */

/* ============================================================
   SHARED COACHES
============================================================ */

export const LEAD_COACHES_MOCK = {
  nichole: {
    id: "coach_nichole",
    name: "Nichole",
    avatarUrl: null,
  },
  cory: {
    id: "coach_cory",
    name: "Cory",
    avatarUrl: null,
  },
  nhut: {
    id: "coach_nhut",
    name: "Nhut",
    avatarUrl: null,
  },
} as const satisfies Record<string, LeadCoach>

/* ============================================================
   MOCK LEAD FACTORY
============================================================ */

type MockLeadInput = {
  id: string
  customerId: string
  name: string
  stage: LeadStage
  temperature: LeadTemperature
  channel: LeadChannel
  experienceLevel: Lead["experienceLevel"]
  interest: Lead["interest"]
  assignedCoach?: LeadCoach | null
  phone?: string | null
  email?: string | null
  location?: string | null
  preferredChannel?: LeadChannel | null
  conversationCount?: number
  bookingCount?: number
  activityAt: string
  createdAt: string
  updatedAt?: string
}

function createMockLead(input: MockLeadInput): Lead {
  return {
    id: input.id,

    customer: {
      id: input.customerId,
      name: input.name,
      avatarUrl: null,
      phone: input.phone ?? null,
      email: input.email ?? null,
      location: input.location ?? null,
      preferredChannel: input.preferredChannel ?? input.channel,
    },

    stage: input.stage,
    temperature: input.temperature,

    source: input.channel,
    channel: input.channel,

    experienceLevel: input.experienceLevel,

    interest: input.interest,

    assignedCoach: input.assignedCoach ?? null,

    lastActivity: {
      label: "",
      occurredAt: input.activityAt,
    },

    conversationCount: input.conversationCount ?? 1,

    bookingCount: input.bookingCount ?? 0,

    createdAt: input.createdAt,
    updatedAt: input.updatedAt ?? input.activityAt,
  }
}

/* ============================================================
   PIPELINE MOCK LEADS
============================================================ */

/**
 * The first lead in each stage provides
 * a representative card for the screenshot.
 *
 * Additional leads exercise different
 * temperature, channel and coach states.
 *
 * Historical April 2024 timestamps match
 * the dashboard reference design.
 */
export const LEADS_MOCK = [
  /* ----------------------------------------------------------
     NEW INQUIRY
  ---------------------------------------------------------- */

  createMockLead({
    id: "lead_sarah_m",
    customerId: "customer_sarah_m",
    name: "Sarah M.",
    stage: "new_inquiry",
    temperature: "hot",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "free_class",
      title: "Free Class",
      description: "Get in shape & learn basics",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    phone: "+15551234567",
    email: "sarah.miller@example.com",
    location: "Wichita, KS",
    conversationCount: 4,
    activityAt: "2024-04-22T09:00:00-05:00",
    createdAt: "2024-04-21T14:30:00-05:00",
  }),

  createMockLead({
    id: "lead_james_t",
    customerId: "customer_james_t",
    name: "James T.",
    stage: "new_inquiry",
    temperature: "warm",
    channel: "instagram",
    experienceLevel: "beginner",
    interest: {
      type: "membership",
      title: "Membership Pricing",
      description: "Looking for monthly plans",
    },
    conversationCount: 2,
    activityAt: "2024-04-22T08:20:00-05:00",
    createdAt: "2024-04-22T08:00:00-05:00",
  }),

  createMockLead({
    id: "lead_alex_r",
    customerId: "customer_alex_r",
    name: "Alex R.",
    stage: "new_inquiry",
    temperature: "cold",
    channel: "messenger",
    experienceLevel: "unknown",
    interest: {
      type: "personal_training",
      title: "Personal Training",
      description: "Exploring private sessions",
    },
    conversationCount: 1,
    activityAt: "2024-04-21T16:15:00-05:00",
    createdAt: "2024-04-21T16:15:00-05:00",
  }),

  /* ----------------------------------------------------------
     AI QUALIFIED
  ---------------------------------------------------------- */

  createMockLead({
    id: "lead_david_l",
    customerId: "customer_david_l",
    name: "David L.",
    stage: "ai_qualified",
    temperature: "hot",
    channel: "messenger",
    experienceLevel: "intermediate",
    interest: {
      type: "personal_training",
      title: "Personal Training",
      description: "Improve boxing technique",
    },
    assignedCoach: LEAD_COACHES_MOCK.cory,
    conversationCount: 5,
    activityAt: "2024-04-22T10:15:00-05:00",
    createdAt: "2024-04-19T12:00:00-05:00",
  }),

  createMockLead({
    id: "lead_olivia_p",
    customerId: "customer_olivia_p",
    name: "Olivia P.",
    stage: "ai_qualified",
    temperature: "warm",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "group_class",
      title: "Beginner Boxing",
      description: "Fitness and confidence",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    conversationCount: 3,
    activityAt: "2024-04-21T15:45:00-05:00",
    createdAt: "2024-04-20T11:30:00-05:00",
  }),

  createMockLead({
    id: "lead_maria_k",
    customerId: "customer_maria_k",
    name: "Maria K.",
    stage: "ai_qualified",
    temperature: "warm",
    channel: "sms",
    experienceLevel: "beginner",
    interest: {
      type: "membership",
      title: "Family Plan",
      description: "Interested in family classes",
    },
    assignedCoach: LEAD_COACHES_MOCK.nhut,
    conversationCount: 4,
    activityAt: "2024-04-20T13:10:00-05:00",
    createdAt: "2024-04-18T09:30:00-05:00",
  }),

  /* ----------------------------------------------------------
     FREE CLASS REQUESTED
  ---------------------------------------------------------- */

  createMockLead({
    id: "lead_emily_c",
    customerId: "customer_emily_c",
    name: "Emily C.",
    stage: "free_class_requested",
    temperature: "hot",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "free_class",
      title: "Free Class",
      description: "Beginner boxing trial",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    conversationCount: 4,
    bookingCount: 1,
    activityAt: "2024-04-22T11:00:00-05:00",
    createdAt: "2024-04-19T09:00:00-05:00",
  }),

  createMockLead({
    id: "lead_sophie_r",
    customerId: "customer_sophie_r",
    name: "Sophie R.",
    stage: "free_class_requested",
    temperature: "warm",
    channel: "instagram",
    experienceLevel: "beginner",
    interest: {
      type: "free_class",
      title: "Free Class",
      description: "Interested in group training",
    },
    assignedCoach: LEAD_COACHES_MOCK.nhut,
    conversationCount: 3,
    bookingCount: 1,
    activityAt: "2024-04-21T12:30:00-05:00",
    createdAt: "2024-04-18T14:20:00-05:00",
  }),

  /* ----------------------------------------------------------
     BOOKING CONFIRMED
  ---------------------------------------------------------- */

  createMockLead({
    id: "lead_nathan_b",
    customerId: "customer_nathan_b",
    name: "Nathan B.",
    stage: "booking_confirmed",
    temperature: "hot",
    channel: "sms",
    experienceLevel: "beginner",
    interest: {
      type: "free_class",
      title: "Free Class",
      description: "First boxing session booked",
    },
    assignedCoach: LEAD_COACHES_MOCK.cory,
    conversationCount: 6,
    bookingCount: 1,
    activityAt: "2024-04-22T09:40:00-05:00",
    createdAt: "2024-04-17T10:00:00-05:00",
  }),

  createMockLead({
    id: "lead_jessica_p",
    customerId: "customer_jessica_p",
    name: "Jessica P.",
    stage: "booking_confirmed",
    temperature: "warm",
    channel: "messenger",
    experienceLevel: "intermediate",
    interest: {
      type: "personal_training",
      title: "Personal Training",
      description: "One-on-one coaching",
    },
    assignedCoach: LEAD_COACHES_MOCK.cory,
    conversationCount: 4,
    bookingCount: 1,
    activityAt: "2024-04-21T14:00:00-05:00",
    createdAt: "2024-04-16T11:45:00-05:00",
  }),

  /* ----------------------------------------------------------
     TRIAL ATTENDED
  ---------------------------------------------------------- */

  createMockLead({
    id: "lead_tyler_m",
    customerId: "customer_tyler_m",
    name: "Tyler M.",
    stage: "trial_attended",
    temperature: "hot",
    channel: "instagram",
    experienceLevel: "beginner",
    interest: {
      type: "membership",
      title: "Monthly Membership",
      description: "Ready to start regular classes",
    },
    assignedCoach: LEAD_COACHES_MOCK.nhut,
    conversationCount: 7,
    bookingCount: 1,
    activityAt: "2024-04-22T12:00:00-05:00",
    createdAt: "2024-04-12T09:30:00-05:00",
  }),

  createMockLead({
    id: "lead_chloe_s",
    customerId: "customer_chloe_s",
    name: "Chloe S.",
    stage: "trial_attended",
    temperature: "warm",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "membership",
      title: "Membership",
      description: "Comparing available plans",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    conversationCount: 5,
    bookingCount: 1,
    activityAt: "2024-04-21T17:00:00-05:00",
    createdAt: "2024-04-13T13:20:00-05:00",
  }),

  /* ----------------------------------------------------------
     MEMBERSHIP CONVERTED
  ---------------------------------------------------------- */

  createMockLead({
    id: "lead_noah_p",
    customerId: "customer_noah_p",
    name: "Noah P.",
    stage: "membership_converted",
    temperature: "hot",
    channel: "messenger",
    experienceLevel: "intermediate",
    interest: {
      type: "membership",
      title: "Unlimited Membership",
      description: "Joined the boxing club",
    },
    assignedCoach: LEAD_COACHES_MOCK.cory,
    conversationCount: 8,
    bookingCount: 2,
    activityAt: "2024-04-20T16:30:00-05:00",
    createdAt: "2024-04-05T11:00:00-05:00",
  }),

  createMockLead({
    id: "lead_grace_w",
    customerId: "customer_grace_w",
    name: "Grace W.",
    stage: "membership_converted",
    temperature: "warm",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "membership",
      title: "Monthly Membership",
      description: "Membership successfully started",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    conversationCount: 6,
    bookingCount: 2,
    activityAt: "2024-04-19T15:15:00-05:00",
    createdAt: "2024-04-03T10:00:00-05:00",
  }),
] satisfies Lead[]

/* ============================================================
   BOOKING-LINKED LEADS
============================================================ */

/**
 * Booking fixtures use full customer names while the
 * pipeline preview uses compact sample names. Keep these
 * linked records outside the board preview so View Lead
 * routes still resolve without changing the pipeline design.
 */
export const BOOKING_LINKED_LEADS_MOCK = [
  createMockLead({
    id: "lead_john_smith",
    customerId: "customer_john_smith",
    name: "John Smith",
    stage: "booking_confirmed",
    temperature: "hot",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "free_class",
      title: "Free Class",
      description: "Interested in a beginner-friendly trial.",
    },
    assignedCoach: LEAD_COACHES_MOCK.cory,
    phone: "(316) 555-0198",
    email: "john.smith@example.com",
    location: "Wichita, KS",
    conversationCount: 3,
    bookingCount: 1,
    activityAt: "2025-04-18T10:24:00-05:00",
    createdAt: "2025-04-18T10:24:00-05:00",
  }),
  createMockLead({
    id: "lead_sarah_johnson",
    customerId: "customer_sarah_johnson",
    name: "Sarah Johnson",
    stage: "booking_confirmed",
    temperature: "warm",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "group_class",
      title: "Beginner Boxing",
      description: "Interested in a beginner boxing session.",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    phone: "(316) 555-0142",
    email: "sarah.johnson@example.com",
    location: "Wichita, KS",
    conversationCount: 4,
    bookingCount: 1,
    activityAt: "2025-04-19T14:12:00-05:00",
    createdAt: "2025-04-19T14:12:00-05:00",
  }),
  createMockLead({
    id: "lead_emily_wilson",
    customerId: "customer_emily_wilson",
    name: "Emily Wilson",
    stage: "free_class_requested",
    temperature: "hot",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "free_class",
      title: "Free Class",
      description: "Requested a fitness boxing trial.",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    phone: "(316) 555-0164",
    email: "emily.wilson@example.com",
    location: "Wichita, KS",
    conversationCount: 2,
    bookingCount: 1,
    activityAt: "2025-04-20T12:30:00-05:00",
    createdAt: "2025-04-20T12:30:00-05:00",
  }),
  createMockLead({
    id: "lead_david_kim",
    customerId: "customer_david_kim",
    name: "David Kim",
    stage: "ai_qualified",
    temperature: "warm",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "other",
      title: "Membership Consultation",
      description: "Interested in membership options.",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    phone: "(316) 555-0136",
    email: "david.kim@example.com",
    location: "Wichita, KS",
    conversationCount: 2,
    bookingCount: 1,
    activityAt: "2025-04-20T08:15:00-05:00",
    createdAt: "2025-04-20T08:15:00-05:00",
  }),
  createMockLead({
    id: "lead_olivia_brown",
    customerId: "customer_olivia_brown",
    name: "Olivia Brown",
    stage: "booking_confirmed",
    temperature: "warm",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "free_class",
      title: "Beginner Boxing",
      description: "First boxing session booked.",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    phone: "(316) 555-0152",
    email: "olivia.brown@example.com",
    location: "Wichita, KS",
    conversationCount: 3,
    bookingCount: 1,
    activityAt: "2025-04-21T09:00:00-05:00",
    createdAt: "2025-04-21T09:00:00-05:00",
  }),
  createMockLead({
    id: "lead_sophia_martin",
    customerId: "customer_sophia_martin",
    name: "Sophia Martin",
    stage: "ai_qualified",
    temperature: "cold",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "other",
      title: "Membership Consultation",
      description: "Exploring membership options.",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    phone: "(316) 555-0126",
    email: "sophia.martin@example.com",
    location: "Wichita, KS",
    conversationCount: 1,
    bookingCount: 1,
    activityAt: "2025-04-21T13:20:00-05:00",
    createdAt: "2025-04-21T13:20:00-05:00",
  }),
  createMockLead({
    id: "lead_chloe_walker",
    customerId: "customer_chloe_walker",
    name: "Chloe Walker",
    stage: "trial_attended",
    temperature: "warm",
    channel: "website",
    experienceLevel: "beginner",
    interest: {
      type: "group_class",
      title: "Fitness Boxing",
      description: "Completed a first boxing session.",
    },
    assignedCoach: LEAD_COACHES_MOCK.nichole,
    phone: "(316) 555-0190",
    email: "chloe.walker@example.com",
    location: "Wichita, KS",
    conversationCount: 3,
    bookingCount: 1,
    activityAt: "2025-04-22T09:00:00-05:00",
    createdAt: "2025-04-22T09:00:00-05:00",
  }),
] satisfies readonly Lead[]

/* ============================================================
   PIPELINE MOCK DATA
============================================================ */

/**
 * Screenshot header counts.
 *
 * These are representative design fixtures,
 * not counts derived from the 14 preview leads.
 *
 * Use actual backend counts in production.
 */
export const LEAD_PIPELINE_STAGE_COUNTS_MOCK = {
  new_inquiry: 48,
  ai_qualified: 38,
  free_class_requested: 28,
  booking_confirmed: 18,
  trial_attended: 15,
  membership_converted: 42,
} as const satisfies Record<LeadStage, number>

/**
 * Total number of leads represented by
 * the screenshot stage counts.
 *
 * 48 + 38 + 28 + 18 + 15 + 42 = 189
 */
export const LEAD_PIPELINE_TOTAL_MOCK = 189

/* ============================================================
   MOCK HELPERS
============================================================ */

/**
 * Return all mock leads without mutating
 * the exported dataset.
 */
export function getLeadsMock(): Lead[] {
  return [...LEADS_MOCK]
}

/**
 * Find a lead by ID.
 */
export function getLeadMockById(leadId: string): Lead | null {
  return (
    LEADS_MOCK.find((lead) => lead.id === leadId) ??
    BOOKING_LINKED_LEADS_MOCK.find((lead) => lead.id === leadId) ??
    null
  )
}

/**
 * Get mock leads for one pipeline stage.
 *
 * Most recently updated leads appear first.
 */
export function getLeadsMockByStage(stage: LeadStage): Lead[] {
  return LEADS_MOCK.filter((lead) => lead.stage === stage).sort(
    (a, b) =>
      Date.parse(b.lastActivity.occurredAt) -
      Date.parse(a.lastActivity.occurredAt)
  )
}

/**
 * Filter leads by temperature.
 */
export function getLeadsMockByTemperature(
  temperature: LeadTemperature
): Lead[] {
  return LEADS_MOCK.filter((lead) => lead.temperature === temperature)
}

/**
 * Filter leads by source channel.
 */
export function getLeadsMockByChannel(channel: LeadChannel): Lead[] {
  return LEADS_MOCK.filter((lead) => lead.source === channel)
}

/**
 * Filter leads by assigned coach.
 *
 * Pass null to get unassigned leads.
 */
export function getLeadsMockByCoach(coachId: string | null): Lead[] {
  return LEADS_MOCK.filter(
    (lead) => (lead.assignedCoach?.id ?? null) === coachId
  )
}

/**
 * Group all mock leads by their stage.
 *
 * Every stage is included, even when empty.
 *
 * Columns follow the configured stage order.
 */
export function getLeadsMockGroupedByStage(): Record<LeadStage, Lead[]> {
  const groups = Object.fromEntries(
    LEAD_STAGE_ORDER.map((stage) => [stage, getLeadsMockByStage(stage)])
  ) as Record<LeadStage, Lead[]>

  return groups
}
