import Image from "next/image";

import {
  AlertCircle,
  Globe2,
  MessageSquare,
} from "lucide-react";

import {
  FaFacebookMessenger,
  FaInstagram,
} from "react-icons/fa";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import {
  DASHBOARD_INBOX_CHANNEL_CONFIG,
  DASHBOARD_INBOX_STATUS_CONFIG,
  formatDashboardInboxRelativeTime,
  getDashboardInboxMessagePreview,
} from "../../config/dashboard-inbox.config";

import type {
  ConversationPreviewRowProps,
  DashboardInboxChannel,
  DashboardInboxConversation,
} from "../../types/dashboard-inbox.types";

export type DashboardConversationPreviewRowProps =
  ConversationPreviewRowProps;

const ROW_CLASS_NAME = cn(
  "grid min-w-0",
  "grid-cols-[1.75rem_minmax(0,1fr)_auto]",
  "items-center gap-x-2.5",
  "py-2",
  "sm:grid-cols-[1.75rem_minmax(0,1fr)_auto]",
);

const DIVIDER_CLASS_NAME =
  "border-b border-border";

function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

function isValidAvatarUrl(
  value: string | null,
): value is string {
  if (!value) return false;

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return value.startsWith("/") &&
      !value.startsWith("//");
  }
}

function ChannelIcon({
  channel,
}: {
  channel: DashboardInboxChannel;
}) {
  switch (channel) {
    case "messenger":
      return (
        <FaFacebookMessenger
          aria-hidden="true"
          className="size-3 shrink-0"
        />
      );

    case "instagram":
      return (
        <FaInstagram
          aria-hidden="true"
          className="size-3 shrink-0"
        />
      );

    case "website":
      return (
        <Globe2
          aria-hidden="true"
          className="size-3 shrink-0"
        />
      );

    case "sms":
      return (
        <MessageSquare
          aria-hidden="true"
          className="size-3 shrink-0"
        />
      );
  }
}

function ConversationRowSkeleton({
  showDivider,
  className,
}: {
  showDivider: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        ROW_CLASS_NAME,
        showDivider && DIVIDER_CLASS_NAME,
        className,
      )}
    >
      <Skeleton className="size-7 rounded-full" />

      <div className="min-w-0 space-y-1.5">
        <Skeleton className="h-3 w-20 max-w-full" />
        <Skeleton className="h-2.5 w-44 max-w-full" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-15 rounded-md" />
        <Skeleton className="h-2.5 w-9" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>
    </div>
  );
}

function ConversationRowFallback({
  error,
  showDivider,
  className,
}: {
  error?: string | null;
  showDivider: boolean;
  className?: string;
}) {
  const isError = Boolean(error);

  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        ROW_CLASS_NAME,
        showDivider && DIVIDER_CLASS_NAME,
        className,
      )}
    >
      <Avatar className="size-7">
        <AvatarFallback className="bg-muted text-muted-foreground">
          {isError ? (
            <AlertCircle
              aria-hidden="true"
              className="size-3.5"
            />
          ) : (
            "?"
          )}
        </AvatarFallback>
      </Avatar>

      <p
        className={cn(
          "min-w-0 truncate text-xs",
          isError
            ? "text-destructive"
            : "text-muted-foreground",
        )}
        title={error ?? undefined}
      >
        {error ?? "Conversation unavailable"}
      </p>

      <span className="text-xs text-muted-foreground">
        —
      </span>
    </div>
  );
}

function ConversationAvatar({
  conversation,
}: {
  conversation: DashboardInboxConversation;
}) {
  const { customer, unreadCount } = conversation;

  const initials = getInitials(customer.name);

  return (
    <div className="relative size-7 shrink-0">
      <Avatar className="size-7">
        {isValidAvatarUrl(customer.avatarUrl) && (
          <Image
            src={customer.avatarUrl}
            alt=""
            fill
            sizes="28px"
            className="rounded-full object-cover"
          />
        )}

        <AvatarFallback
          className={cn(
            "bg-gold-10",
            "text-xs font-semibold text-foreground",
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Subtle unread marker */}
      {unreadCount > 0 && (
        <span
          className={cn(
            "absolute -top-0.5 -right-0.5",
            "size-2 rounded-full",
            "border border-card bg-gold",
          )}
          aria-label={`${unreadCount} unread messages`}
          title={`${unreadCount} unread messages`}
        />
      )}
    </div>
  );
}

function ConversationChannelBadge({
  channel,
}: {
  channel: DashboardInboxChannel;
}) {
  const config =
    DASHBOARD_INBOX_CHANNEL_CONFIG[channel];

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "inline-flex max-w-full items-center",
          "rounded-md outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-ring",
        )}
        aria-label={`${config.label} channel`}
      >
        <Badge
          variant="secondary"
          className={cn(
            "h-5 max-w-full gap-1 rounded-md",
            "border-0 px-1.5",
            "text-[9px] font-medium",
            config.className,
          )}
        >
          <ChannelIcon channel={channel} />

          <span className="truncate">
            {config.label}
          </span>
        </Badge>
      </TooltipTrigger>

      <TooltipContent side="top">
        {config.label}
      </TooltipContent>
    </Tooltip>
  );
}

function ConversationStatusBadge({
  status,
}: {
  status: DashboardInboxConversation["status"];
}) {
  const config =
    DASHBOARD_INBOX_STATUS_CONFIG[status];

  return (
    <Badge
      variant="secondary"
      className={cn(
        "h-5 shrink-0 rounded-md",
        "border-0 px-2",
        "text-[9px] font-medium",
        config.className,
      )}
    >
      {config.label}
    </Badge>
  );
}

export function ConversationPreviewRow({
  conversation,
  isLoading = false,
  error = null,
  showDivider = true,
  referenceTime = null,
  className,
}: DashboardConversationPreviewRowProps) {
  /* ==========================================================
     LOADING
  ========================================================== */

  if (isLoading) {
    return (
      <ConversationRowSkeleton
        showDivider={showDivider}
        className={className}
      />
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error) {
    return (
      <ConversationRowFallback
        error={error}
        showDivider={showDivider}
        className={className}
      />
    );
  }

  /* ==========================================================
     EMPTY / INVALID DATA
  ========================================================== */

  if (
    !conversation ||
    !conversation.customer?.name?.trim() ||
    !conversation.lastMessage ||
    !Number.isFinite(
      Date.parse(conversation.lastMessage.sentAt),
    )
  ) {
    return (
      <ConversationRowFallback
        showDivider={showDivider}
        className={className}
      />
    );
  }

  /* ==========================================================
     DATA PREPARATION
  ========================================================== */

  const { customer, lastMessage } = conversation;

  const messagePreview =
    getDashboardInboxMessagePreview(
      lastMessage.kind,
      lastMessage.preview,
    );

  const timeLabel = referenceTime
    ? formatDashboardInboxRelativeTime(
        lastMessage.sentAt,
        referenceTime,
      )
    : "—";

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      className={cn(
        ROW_CLASS_NAME,
        showDivider && DIVIDER_CLASS_NAME,
        "transition-colors duration-150",
        "hover:bg-accent/30",
        "motion-reduce:transition-none",
        className,
      )}
      aria-label={[
        customer.name,
        conversation.channel,
        messagePreview,
        conversation.status,
        timeLabel,
      ].join(", ")}
    >
      {/* Customer avatar */}
      <ConversationAvatar
        conversation={conversation}
      />

      {/* Customer name and message */}
      <div className="min-w-0 space-y-0.5">
        <p
          className={cn(
            "truncate text-[11px]",
            "font-semibold leading-4",
            "text-foreground",
          )}
          title={customer.name}
        >
          {customer.name}
        </p>

        <p
          className={cn(
            "truncate text-[10px]",
            "leading-4 text-muted-foreground",
          )}
          title={messagePreview}
        >
          {messagePreview}
        </p>
      </div>

      {/* Channel, timestamp and status */}
      <div
        className={cn(
          "flex min-w-0 items-center gap-2",
          "sm:gap-2.5",
        )}
      >
        <ConversationChannelBadge
          channel={conversation.channel}
        />

        <time
          dateTime={lastMessage.sentAt}
          title={lastMessage.sentAt}
          className={cn(
            "w-10 shrink-0 text-right",
            "text-[9px] tabular-nums",
            "text-muted-foreground",
          )}
        >
          {timeLabel}
        </time>

        <ConversationStatusBadge
          status={conversation.status}
        />
      </div>
    </div>
  );
}