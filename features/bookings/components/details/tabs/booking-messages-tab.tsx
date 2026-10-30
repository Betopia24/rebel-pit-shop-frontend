import type { ReactNode } from "react";

import {
  ArrowUpRight,
  ArrowDownLeft,
  Inbox,
  MessageCircle,
  MessageSquareText,
  MessagesSquare,
  Send,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import type {
  BookingMessageReference,
  BookingMessagesData,
} from "../../../types/booking-details.types";


export interface BookingMessagesTabProps {
    data: BookingMessagesData;
    timezone: string;
    onOpenInbox?: (
        conversationId: BookingMessageReference["conversationId"],
    ) => void;
    onMessageSelect?: (
        message: BookingMessageReference,
    ) => void;
    showMessageDirection?: boolean;
    showChannel?: boolean;
    disabled?: boolean;
    className?: string;
}

/* ============================================================
   FORMATTERS
============================================================ */

const COUNT_FORMATTER = new Intl.NumberFormat(
  "en-US",
  {
    maximumFractionDigits: 0,
  },
);

function formatCount(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "—";
  }

  return COUNT_FORMATTER.format(Math.trunc(value));
}

function formatDateTime(
  value: string,
  timezone: string,
): string {
  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return "Time unavailable";
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    }).format(date);
  } catch {
    return "Time unavailable";
  }
}

function normalizeText(
  value: string | null | undefined,
): string | null {
  return value?.trim() || null;
}

function formatChannel(
  value: string,
): string {
  switch (value) {
    case "website":
      return "Website";

    case "facebook":
    case "messenger":
      return "Messenger";

    case "instagram":
      return "Instagram";

    case "whatsapp":
      return "WhatsApp";

    case "sms":
      return "SMS";

    default:
      return value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (character) =>
          character.toUpperCase(),
        );
  }
}

function formatContentType(
  value: string,
): string {
  switch (value) {
    case "image":
      return "Photo";

    case "audio":
      return "Voice message";

    case "video":
      return "Video";

    case "file":
      return "Attachment";

    case "product":
      return "Product";

    case "text":
      return "Message";

    default:
      return "Message";
  }
}

/* ============================================================
   MESSAGE DIRECTION
============================================================ */

function MessageDirection({
  direction,
}: {
  direction: BookingMessageReference["direction"];
}) {
  const isIncoming =
    direction === "incoming";

  const Icon = isIncoming
    ? ArrowDownLeft
    : Send;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1",
        "text-[10px] text-muted-foreground",
      )}
    >
      <Icon
        aria-hidden="true"
        className="size-3"
      />

      {isIncoming ? "Incoming" : "Outgoing"}
    </span>
  );
}

/* ============================================================
   CHANNEL INDICATOR
============================================================ */

function MessageChannel({
  channel,
}: {
  channel: BookingMessageReference["channel"];
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-5 max-w-full gap-1",
        "rounded-md border-border",
        "bg-muted/40 px-1.5",
        "text-[10px] font-medium",
        "text-muted-foreground shadow-none",
      )}
    >
      <MessageCircle
        aria-hidden="true"
        className="size-3 shrink-0"
      />

      <span className="truncate">
        {formatChannel(channel)}
      </span>
    </Badge>
  );
}

/* ============================================================
   MESSAGE ITEM
============================================================ */

interface MessageItemProps {
    message: BookingMessageReference;
    timezone: string;
    showDirection: boolean;
    showChannel: boolean;
    onSelect?: () => void;
    disabled: boolean;
}

function MessageItem({
  message,
  timezone,
  showDirection,
  showChannel,
  onSelect,
  disabled,
}: MessageItemProps) {
  const isIncoming =
    message.direction === "incoming";

  const sender =
    normalizeText(message.senderName) ??
    (isIncoming ? "Customer" : "Team");

  const preview =
    normalizeText(message.preview) ??
    formatContentType(message.contentType);

  const timestamp = formatDateTime(
    message.sentAt,
    timezone,
  );

  const content: ReactNode = (
    <>
      {/* Direction icon */}
      <div
        className={cn(
          "flex size-8 shrink-0",
          "items-center justify-center",
          "rounded-lg border",
          isIncoming
            ? "border-border bg-muted/50 text-muted-foreground"
            : "border-primary/20 bg-primary/10 text-primary",
        )}
      >
        {isIncoming ? (
          <ArrowDownLeft
            aria-hidden="true"
            className="size-4"
          />
        ) : (
          <Send
            aria-hidden="true"
            className="size-3.5"
          />
        )}
      </div>

      {/* Message content */}
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="min-w-0 truncate text-[11px] font-semibold text-foreground">
            {sender}
          </span>

          {showChannel && (
            <MessageChannel
              channel={message.channel}
            />
          )}
        </div>

        <p
          className={cn(
            "line-clamp-3 break-words",
            "text-[11px] leading-relaxed",
            "text-foreground/85",
          )}
        >
          {preview}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <time
            dateTime={message.sentAt}
            className="text-[10px] text-muted-foreground"
          >
            {timestamp}
          </time>

          {showDirection && (
            <MessageDirection
              direction={message.direction}
            />
          )}
        </div>
      </div>

      {/* Navigation indicator */}
      {onSelect && !disabled && (
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            "mt-1 size-3.5 shrink-0",
            "text-muted-foreground",
            "transition-colors",
            "group-hover:text-foreground",
          )}
        />
      )}
    </>
  );

  const commonClassName = cn(
    "group flex w-full min-w-0",
    "items-start gap-2.5 rounded-lg",
    "border border-border",
    "bg-card p-3 text-left",
    "transition-colors",
  );

  if (onSelect && !disabled) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Open conversation message from ${sender}`}
        className={cn(
          commonClassName,
          "cursor-pointer hover:bg-muted/30",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-ring",
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <article className={commonClassName}>
      {content}
    </article>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function MessagesEmptyState({
  hasUnloadedMessages,
}: {
  hasUnloadedMessages: boolean;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-44 flex-col",
        "items-center justify-center",
        "gap-2 rounded-lg",
        "border border-dashed border-border",
        "bg-muted/15 px-5 py-6",
        "text-center",
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        {hasUnloadedMessages ? (
          <Inbox className="size-4 text-muted-foreground" />
        ) : (
          <MessageSquareText className="size-4 text-muted-foreground" />
        )}
      </div>

      <h4 className="text-[11px] font-semibold text-foreground">
        {hasUnloadedMessages
          ? "Message previews unavailable"
          : "No messages yet"}
      </h4>

      <p className="max-w-64 text-[10px] leading-relaxed text-muted-foreground">
        {hasUnloadedMessages
          ? "This booking has related messages, but the message previews have not been loaded."
          : "Booking-related conversations will appear here when messages become available."}
      </p>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingMessagesTab({
  data,
  timezone,
  onOpenInbox,
  onMessageSelect,
  showMessageDirection = true,
  showChannel = true,
  disabled = false,
  className,
}: BookingMessagesTabProps) {
  const conversationId =
    data.items.find(
      (item) => Boolean(item.conversationId),
    )?.conversationId ?? null;

  const canOpenInbox =
    Boolean(onOpenInbox) &&
    Boolean(conversationId) &&
    !disabled;

  const messages = [...data.items].sort(
    (a, b) =>
      Date.parse(b.sentAt) -
      Date.parse(a.sentAt),
  );

  const missingCount = Math.max(
    0,
    data.totalCount - messages.length,
  );

  const handleMessageSelect = (
    message: BookingMessageReference,
  ) => {
    if (disabled) return;

    if (onMessageSelect) {
      onMessageSelect(message);
      return;
    }

    onOpenInbox?.(message.conversationId);
  };

  return (
    <div
      className={cn(
        "min-w-0 space-y-4 pb-4",
        className,
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MessagesSquare
            aria-hidden="true"
            className="size-4 text-muted-foreground"
          />

          <h3 className="text-xs font-semibold text-foreground">
            Booking Messages
          </h3>

          <Badge
            variant="outline"
            className={cn(
              "h-5 rounded-md",
              "border-border bg-muted/30",
              "px-1.5 text-[10px]",
              "font-medium text-muted-foreground",
            )}
          >
            {formatCount(data.totalCount)}
          </Badge>
        </div>

        {data.unreadCount > 0 && (
          <Badge
            variant="outline"
            className={cn(
              "h-5 rounded-md",
              "border-primary/20",
              "bg-primary/10",
              "px-1.5 text-[10px]",
              "font-medium text-primary",
            )}
          >
            {formatCount(data.unreadCount)} Unread
          </Badge>
        )}
      </div>

      {/* ======================================================
          INBOX ACTION
      ====================================================== */}

      {canOpenInbox && conversationId && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onOpenInbox?.(conversationId)
          }
          className={cn(
            "h-9 w-full justify-between",
            "rounded-md border-border",
            "bg-background px-3",
            "text-[11px] font-medium",
            "text-foreground",
          )}
        >
          <span className="flex items-center gap-2">
            <Inbox
              aria-hidden="true"
              className="size-3.5 text-muted-foreground"
            />

            Open in Inbox
          </span>

          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />
        </Button>
      )}

      <Separator />

      {/* ======================================================
          MESSAGES LIST
      ====================================================== */}

      <section
        aria-label="Related message previews"
        className="space-y-2"
      >
        {messages.length === 0 ? (
          <MessagesEmptyState
            hasUnloadedMessages={
              data.totalCount > 0
            }
          />
        ) : (
          <>
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                timezone={timezone}
                showDirection={
                  showMessageDirection
                }
                showChannel={showChannel}
                disabled={disabled}
                onSelect={
                  !disabled &&
                  (onMessageSelect ||
                    onOpenInbox)
                    ? () =>
                        handleMessageSelect(
                          message,
                        )
                    : undefined
                }
              />
            ))}

            {missingCount > 0 && (
              <p
                role="status"
                className="rounded-md border border-dashed border-border px-3 py-2.5 text-center text-[10px] text-muted-foreground"
              >
                {formatCount(missingCount)} additional{" "}
                {missingCount === 1
                  ? "message preview is"
                  : "message previews are"}{" "}
                not loaded.
              </p>
            )}
          </>
        )}
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <p className="text-[10px] leading-relaxed text-muted-foreground">
        Messages are previews of conversations
        managed in your Inbox.
      </p>
    </div>
  );
}

export default BookingMessagesTab;