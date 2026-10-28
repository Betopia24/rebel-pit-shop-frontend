
import type {
  DashboardInboxConversation,
  DashboardInboxData,
  DashboardInboxStatus,
  InboxPreviewProps,
} from "../types/dashboard-inbox.types";

/**
 * ============================================================
 * REBEL BOXING CLUB
 * Dashboard Unified Inbox Mock Data
 * ============================================================
 *
 * Development-only conversation previews.
 *
 * Reference design:
 *
 * Sarah M.  → Messenger → Open
 * James T.  → Instagram → Waiting
 * Alex R.   → Website   → Open
 * Maria K.  → SMS       → Escalated
 *
 * All timestamps are fixed to ensure
 * deterministic rendering.
 *
 * No API calls, React components or hooks.
 * ============================================================
 */

/* ============================================================
   REFERENCE TIME
============================================================ */

/**
 * Reference timestamp used to render:
 *
 * Sarah → 2m ago
 * James → 12m ago
 * Alex  → 28m ago
 * Maria → 1h ago
 *
 * Providing a fixed reference time avoids
 * server/client hydration mismatches.
 */
export const DASHBOARD_INBOX_MOCK_REFERENCE_TIME =
  "2026-10-28T10:00:00-05:00";

/* ============================================================
   CONVERSATION MOCK DATA
============================================================ */

export const DASHBOARD_INBOX_CONVERSATIONS_MOCK = [
  {
    id: "conversation_sarah_001",

    customer: {
      id: "customer_sarah_001",
      name: "Sarah M.",
      avatarUrl: null,
    },

    channel: "messenger",
    status: "open",

    lastMessage: {
      kind: "text",
      preview:
        "I've never boxed before. Can I join?",
      sender: "customer",
      sentAt: "2026-10-28T09:58:00-05:00",
    },

    unreadCount: 2,
    requiresHumanAttention: false,
  },

  {
    id: "conversation_james_002",

    customer: {
      id: "customer_james_002",
      name: "James T.",
      avatarUrl: null,
    },

    channel: "instagram",
    status: "waiting",

    lastMessage: {
      kind: "text",
      preview:
        "What are your membership prices?",
      sender: "customer",
      sentAt: "2026-10-28T09:48:00-05:00",
    },

    unreadCount: 1,
    requiresHumanAttention: false,
  },

  {
    id: "conversation_alex_003",

    customer: {
      id: "customer_alex_003",
      name: "Alex R.",
      avatarUrl: null,
    },

    channel: "website",
    status: "open",

    lastMessage: {
      kind: "text",
      preview:
        "Do you offer personal training sessions?",
      sender: "customer",
      sentAt: "2026-10-28T09:32:00-05:00",
    },

    unreadCount: 0,
    requiresHumanAttention: false,
  },

  {
    id: "conversation_maria_004",

    customer: {
      id: "customer_maria_004",
      name: "Maria K.",
      avatarUrl: null,
    },

    channel: "sms",
    status: "escalated",

    lastMessage: {
      kind: "text",
      preview:
        "Can I bring my 14 year old son?",
      sender: "customer",
      sentAt: "2026-10-28T09:00:00-05:00",
    },

    unreadCount: 1,
    requiresHumanAttention: true,
  },
] as const satisfies readonly DashboardInboxConversation[];

/* ============================================================
   MAIN DASHBOARD INBOX DATA
============================================================ */

/**
 * Main mock dataset matching the screenshot.
 *
 * Conversations are sorted by latest message,
 * newest first.
 */
export const DASHBOARD_INBOX_MOCK:
  DashboardInboxData = {
  conversations:
    DASHBOARD_INBOX_CONVERSATIONS_MOCK,

  totalConversations: 4,

  updatedAt:
    DASHBOARD_INBOX_MOCK_REFERENCE_TIME,
};

/* ============================================================
   EMPTY STATE MOCK
============================================================ */

/**
 * Used to test when the dashboard has
 * no conversations to display.
 */
export const DASHBOARD_INBOX_EMPTY_MOCK:
  DashboardInboxData = {
  conversations: [],

  totalConversations: 0,

  updatedAt:
    DASHBOARD_INBOX_MOCK_REFERENCE_TIME,
};

/* ============================================================
   ADDITIONAL MESSAGE TYPES
============================================================ */

/**
 * Sample conversations with media messages.
 *
 * These are not included in the screenshot's
 * default four conversations.
 *
 * Used for testing fallback preview labels:
 *
 * Photo
 * Voice message
 * Video
 * Attachment
 */
export const DASHBOARD_INBOX_MEDIA_MOCK = [
  {
    id: "conversation_media_image",

    customer: {
      id: "customer_media_image",
      name: "Daniel R.",
      avatarUrl: null,
    },

    channel: "messenger",
    status: "open",

    lastMessage: {
      kind: "image",
      preview: null,
      sender: "customer",
      sentAt: "2026-10-28T08:45:00-05:00",
    },

    unreadCount: 1,
    requiresHumanAttention: false,
  },

  {
    id: "conversation_media_audio",

    customer: {
      id: "customer_media_audio",
      name: "Olivia P.",
      avatarUrl: null,
    },

    channel: "instagram",
    status: "waiting",

    lastMessage: {
      kind: "audio",
      preview: null,
      sender: "customer",
      sentAt: "2026-10-28T08:30:00-05:00",
    },

    unreadCount: 0,
    requiresHumanAttention: false,
  },

  {
    id: "conversation_media_video",

    customer: {
      id: "customer_media_video",
      name: "Michael B.",
      avatarUrl: null,
    },

    channel: "website",
    status: "open",

    lastMessage: {
      kind: "video",
      preview: null,
      sender: "customer",
      sentAt: "2026-10-28T08:15:00-05:00",
    },

    unreadCount: 0,
    requiresHumanAttention: false,
  },

  {
    id: "conversation_media_file",

    customer: {
      id: "customer_media_file",
      name: "Emma W.",
      avatarUrl: null,
    },

    channel: "sms",
    status: "closed",

    lastMessage: {
      kind: "file",
      preview: null,
      sender: "agent",
      sentAt: "2026-10-28T08:00:00-05:00",
    },

    unreadCount: 0,
    requiresHumanAttention: false,
  },
] as const satisfies readonly DashboardInboxConversation[];

/* ============================================================
   UI STATE MOCKS
============================================================ */

/**
 * Loading preview.
 *
 * The component will render four skeleton rows.
 */
export const DASHBOARD_INBOX_LOADING_MOCK = {
  data: null,
  status: "loading",
  referenceTime:
    DASHBOARD_INBOX_MOCK_REFERENCE_TIME,
} satisfies InboxPreviewProps;

/**
 * Empty preview.
 *
 * The component will render its empty state.
 */
export const DASHBOARD_INBOX_EMPTY_STATE_MOCK = {
  data: DASHBOARD_INBOX_EMPTY_MOCK,
  status: "empty",
  referenceTime:
    DASHBOARD_INBOX_MOCK_REFERENCE_TIME,
} satisfies InboxPreviewProps;

/**
 * Error preview.
 *
 * No fake conversations are displayed
 * when the request fails.
 */
export const DASHBOARD_INBOX_ERROR_MOCK = {
  data: null,
  status: "error",
  error: "Unable to load conversations.",
  referenceTime:
    DASHBOARD_INBOX_MOCK_REFERENCE_TIME,
} satisfies InboxPreviewProps;

/* ============================================================
   MOCK DATA HELPERS
============================================================ */

/**
 * Retrieve a single mock conversation by ID.
 */
export function getDashboardInboxConversationMock(
  conversationId: string,
): DashboardInboxConversation | null {
  return (
    DASHBOARD_INBOX_CONVERSATIONS_MOCK.find(
      (conversation) =>
        conversation.id === conversationId,
    ) ?? null
  );
}

/**
 * Return a sorted copy of the default
 * dashboard conversations.
 *
 * Sorting never mutates the original array.
 */
export function getDashboardInboxMock(): DashboardInboxData {
  const conversations = [
    ...DASHBOARD_INBOX_CONVERSATIONS_MOCK,
  ].sort(
    (a, b) =>
      Date.parse(b.lastMessage.sentAt) -
      Date.parse(a.lastMessage.sentAt),
  );

  return {
    conversations,
    totalConversations: conversations.length,
    updatedAt:
      DASHBOARD_INBOX_MOCK_REFERENCE_TIME,
  };
}

/**
 * Return a filtered set of conversations
 * matching a requested UI status.
 *
 * Useful for development previews.
 */
export function getDashboardInboxMockByStatus(
  status: DashboardInboxStatus,
): DashboardInboxData | null {
  if (status === "loading" || status === "error") {
    return null;
  }

  if (status === "empty") {
    return DASHBOARD_INBOX_EMPTY_MOCK;
  }

  return getDashboardInboxMock();
}
