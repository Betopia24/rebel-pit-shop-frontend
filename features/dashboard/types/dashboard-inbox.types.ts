export type InboxPreviewId = string;

export type InboxPreviewISODateTime = string;

export type DashboardInboxChannel = "messenger" | "instagram" | "website" | "sms";

export type DashboardInboxConversationStatus = "open" | "waiting" | "escalated" | "closed";

export interface DashboardInboxCustomer {
    id: InboxPreviewId;
    name: string;
    avatarUrl: string | null;
}

export type DashboardInboxMessageSender = "customer" | "agent" | "ai";

export type DashboardInboxMessageKind = "text" | "image" | "audio" | "video" | "file";

export interface DashboardInboxLastMessage {
    kind: DashboardInboxMessageKind;
    preview: string | null;
    sender: DashboardInboxMessageSender;
    sentAt: InboxPreviewISODateTime;
}

export interface DashboardInboxConversation {
    id: InboxPreviewId;
    customer: DashboardInboxCustomer;
    channel: DashboardInboxChannel;
    status: DashboardInboxConversationStatus;
    lastMessage: DashboardInboxLastMessage;
    unreadCount: number;
    requiresHumanAttention: boolean;
}

export interface DashboardInboxData {
    conversations: readonly DashboardInboxConversation[];
    totalConversations: number;
    updatedAt: InboxPreviewISODateTime | null;
}

export interface DashboardInboxChannelConfig {
    id: DashboardInboxChannel;
    label: string;
    icon: "messenger" | "instagram" | "globe" | "message-square";
    className: string;
}

export interface DashboardInboxStatusConfig {
    id: DashboardInboxConversationStatus;
    label: string;
    className: string;
}

export type DashboardInboxStatus = "loading" | "success" | "empty" | "error";

export interface ConversationPreviewRowProps {
    conversation: DashboardInboxConversation | null;
    isLoading?: boolean;
    error?: string | null;
    showDivider?: boolean;
    referenceTime?: InboxPreviewISODateTime | null;
    className?: string;
}

export interface InboxPreviewProps {
    data: DashboardInboxData | null;
    status: DashboardInboxStatus;
    error?: string | null;
    onRetry?: () => void;
    referenceTime?: InboxPreviewISODateTime | null;
    className?: string;
}