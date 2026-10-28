import type {
  DashboardInboxChannel,
  DashboardInboxChannelConfig,
  DashboardInboxConversationStatus,
  DashboardInboxMessageKind,
  DashboardInboxStatusConfig,
} from "../types/dashboard-inbox.types";

export const DASHBOARD_INBOX_PREVIEW_LIMIT = 4;
export const DASHBOARD_INBOX_ROUTE = "/inbox";

export const DASHBOARD_INBOX_CHANNEL_CONFIG = {
  messenger: {
    id: "messenger",
    label: "Messenger",
    icon: "messenger",
    className:
      "bg-primary/10 text-primary",
  },

  instagram: {
    id: "instagram",
    label: "Instagram",
    icon: "instagram",
    className:
      "bg-muted text-foreground",
  },

  website: {
    id: "website",
    label: "Website",
    icon: "globe",
    className:
      "bg-muted text-text-secondary",
  },

  sms: {
    id: "sms",
    label: "SMS",
    icon: "message-square",
    className:
      "bg-primary/10 text-primary",
  },
} as const satisfies Record<
  DashboardInboxChannel,
  DashboardInboxChannelConfig
>;

export const DASHBOARD_INBOX_STATUS_CONFIG = {
  open: {
    id: "open",
    label: "Open",
    className:
      "bg-success/10 text-success",
  },

  waiting: {
    id: "waiting",
    label: "Waiting",
    className:
      "bg-warning/10 text-warning",
  },

  escalated: {
    id: "escalated",
    label: "Escalated",
    className:
      "bg-destructive/10 text-destructive",
  },

  closed: {
    id: "closed",
    label: "Closed",
    className:
      "bg-muted text-muted-foreground",
  },
} as const satisfies Record<
  DashboardInboxConversationStatus,
  DashboardInboxStatusConfig
>;

export const DASHBOARD_INBOX_MESSAGE_FALLBACKS = {
  text: "Message",
  image: "Photo",
  audio: "Voice message",
  video: "Video",
  file: "Attachment",
} as const satisfies Record<
  DashboardInboxMessageKind,
  string
>;

export const DASHBOARD_INBOX_TIME_LABELS = {
  now: "Just now",
  minute: "m ago",
  hour: "h ago",
  day: "d ago",
  month: "mo ago",
  year: "y ago",
} as const;

export function getDashboardInboxChannelConfig(
  channel: DashboardInboxChannel,
): DashboardInboxChannelConfig {
  return DASHBOARD_INBOX_CHANNEL_CONFIG[channel];
}

export function getDashboardInboxStatusConfig(
  status: DashboardInboxConversationStatus,
): DashboardInboxStatusConfig {
  return DASHBOARD_INBOX_STATUS_CONFIG[status];
}

export function getDashboardInboxMessagePreview(
  kind: DashboardInboxMessageKind,
  preview: string | null,
): string {
  const text = preview?.trim();

  if (text) {
    return text;
  }

  return DASHBOARD_INBOX_MESSAGE_FALLBACKS[kind];
}

export function formatDashboardInboxRelativeTime(
  sentAt: string,
  referenceTime: string,
): string {
  const sentTimestamp = Date.parse(sentAt);
  const referenceTimestamp = Date.parse(referenceTime);

  if (
    !Number.isFinite(sentTimestamp) ||
    !Number.isFinite(referenceTimestamp)
  ) {
    return "—";
  }

  const elapsedSeconds = Math.max(
    0,
    Math.floor(
      (referenceTimestamp - sentTimestamp) / 1000,
    ),
  );

  if (elapsedSeconds < 60) {
    return DASHBOARD_INBOX_TIME_LABELS.now;
  }

  const minutes = Math.floor(elapsedSeconds / 60);

  if (minutes < 60) {
    return `${minutes}${DASHBOARD_INBOX_TIME_LABELS.minute}`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}${DASHBOARD_INBOX_TIME_LABELS.hour}`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days}${DASHBOARD_INBOX_TIME_LABELS.day}`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months}${DASHBOARD_INBOX_TIME_LABELS.month}`;
  }

  const years = Math.floor(days / 365);

  return `${Math.max(1, years)}${DASHBOARD_INBOX_TIME_LABELS.year}`;
}