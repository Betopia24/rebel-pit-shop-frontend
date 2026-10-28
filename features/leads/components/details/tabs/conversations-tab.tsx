import Link from "next/link";
import { useId } from "react";

import {
  ArrowUpRight,
  Inbox,
  MessageSquareText,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
  buttonVariants,
} from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import {
  getLeadChannelConfig,
} from "../../../config/lead-channels.config";

import type {
  LeadConversationReference,
  LeadConversationsData,
} from "../../../types/lead-details.types";

export interface LeadConversationsTabProps {
    data: LeadConversationsData | null;
    isLoading?: boolean;
    timezone?: string;
    className?: string;
}

const DEFAULT_TIMEZONE = "America/Chicago";

const EMPTY_MESSAGE = "No message preview available";

function formatConversationTime(
  value: string | null,
  timezone: string,
): string {
  if (!value) {
    return "Time unavailable";
  }

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

function getSafeInboxHref(
  href: string,
): string | null {
  if (
    href === "/inbox" ||
    href.startsWith("/inbox?") ||
    href.startsWith("/inbox/")
  ) {
    return href;
  }

  return null;
}

function ConversationsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-8 rounded-md" />
      </div>

      {Array.from(
        { length: 3 },
        (_, index) => (
          <div
            key={index}
            className={cn(
              "space-y-3 rounded-lg",
              "border border-border bg-card p-3",
            )}
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-md" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />

            <div className="flex justify-end border-t border-border pt-2">
              <Skeleton className="h-7 w-32 rounded-md" />
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function ConversationsEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-44 flex-col",
        "items-center justify-center gap-2.5",
        "rounded-lg border border-dashed",
        "border-border bg-muted/20",
        "px-4 py-6 text-center",
      )}
    >
      <div
        className={cn(
          "flex size-10 items-center justify-center",
          "rounded-lg bg-muted text-muted-foreground",
        )}
      >
        <Inbox
          aria-hidden="true"
          className="size-5"
        />
      </div>

      <p className="text-xs font-semibold text-foreground">
        No linked conversations
      </p>

      <p
        className={cn(
          "max-w-60 text-[11px]",
          "leading-relaxed text-muted-foreground",
        )}
      >
        Customer conversations linked to
        this lead will appear here.
      </p>
    </div>
  );
}

interface LeadConversationCardProps {
  conversation: LeadConversationReference;

  timezone: string;
}

function LeadConversationCard({
  conversation,
  timezone,
}: LeadConversationCardProps) {
  const channel = getLeadChannelConfig(
    conversation.channel,
  );

  const ChannelIcon = channel.icon;

  const message =
    conversation.lastMessagePreview?.trim() ||
    EMPTY_MESSAGE;

  const timestamp = formatConversationTime(
    conversation.lastMessageAt,
    timezone,
  );

  const unreadCount = Math.max(
    0,
    Math.trunc(conversation.unreadCount || 0),
  );

  const href = getSafeInboxHref(
    conversation.href,
  );

  return (
    <article
      className={cn(
        "min-w-0 rounded-lg",
        "border border-border bg-card",
        "p-3",
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex min-w-0 items-start gap-2.5">
        {/* Channel icon */}
        <div
          className={cn(
            "flex size-8 shrink-0",
            "items-center justify-center",
            "rounded-md",
            channel.badgeClassName,
          )}
        >
          <ChannelIcon
            aria-hidden="true"
            className={cn(
              "size-4",
              channel.iconClassName,
            )}
          />
        </div>

        {/* Channel and timestamp */}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate text-[11px]",
              "font-semibold text-foreground",
            )}
          >
            {channel.label}
          </p>

          <time
            dateTime={
              conversation.lastMessageAt ??
              undefined
            }
            className={cn(
              "mt-0.5 block truncate",
              "text-[10px]",
              "text-muted-foreground",
              "tabular-nums",
            )}
          >
            {timestamp}
          </time>
        </div>

        {/* Unread count */}
        {unreadCount > 0 && (
          <Badge
            variant="outline"
            className={cn(
              "h-5 min-w-5 shrink-0",
              "justify-center rounded-full",
              "border-gold/20 bg-gold-10",
              "px-1.5 text-[10px]",
              "font-semibold text-gold",
              "tabular-nums",
            )}
            aria-label={`${unreadCount} unread messages`}
          >
            {unreadCount}
          </Badge>
        )}
      </div>

      {/* ======================================================
          LAST MESSAGE
      ====================================================== */}

      <div className="mt-3 min-w-0">
        <p className="mb-1 text-[10px] font-medium text-muted-foreground">
          Last Message
        </p>

        <p
          className={cn(
            "line-clamp-2 break-words",
            "text-[11px] leading-relaxed",
            "text-foreground",
          )}
          title={message}
        >
          {message}
        </p>
      </div>

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <div
        className={cn(
          "mt-3 flex justify-end",
          "border-t border-border/60",
          "pt-2.5",
        )}
      >
        {href ? (
          <Link
            href={href}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "h-7 gap-1.5 rounded-md",
              "px-2.5 text-[10px]",
              "font-medium",
              "hover:border-gold/30",
              "hover:bg-gold-10",
              "hover:text-gold",
            )}
            aria-label={`Open ${channel.label} conversation`}
          >
            Open Conversation

            <ArrowUpRight
              aria-hidden="true"
              className="size-3"
            />
          </Link>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled
            className="h-7 px-2.5 text-[10px]"
          >
            Conversation unavailable
          </Button>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function LeadConversationsTab({
  data,
  isLoading = false,
  timezone = DEFAULT_TIMEZONE,
  className,
}: LeadConversationsTabProps) {
  const headingId = useId();

  const conversations = data?.items ?? [];

  const totalCount = data?.totalCount ?? 0;

  const sortedConversations = [
    ...conversations,
  ].sort((a, b) => {
    const aTime = a.lastMessageAt
      ? Date.parse(a.lastMessageAt)
      : 0;

    const bTime = b.lastMessageAt
      ? Date.parse(b.lastMessageAt)
      : 0;

    return (
      (Number.isFinite(bTime) ? bTime : 0) -
      (Number.isFinite(aTime) ? aTime : 0)
    );
  });

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={isLoading}
      className={cn(
        "min-w-0 space-y-3",
        className,
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <MessageSquareText
            aria-hidden="true"
            className="size-4 text-muted-foreground"
          />

          <h2
            id={headingId}
            className="text-xs font-semibold text-foreground"
          >
            Conversations
          </h2>
        </div>

        {!isLoading && data && (
          <Badge
            variant="secondary"
            className={cn(
              "h-5 rounded-md",
              "px-1.5 text-[10px]",
              "font-semibold tabular-nums",
            )}
          >
            {totalCount}
          </Badge>
        )}
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      {isLoading ? (
        <ConversationsSkeleton />
      ) : sortedConversations.length === 0 ? (
        <ConversationsEmpty />
      ) : (
        <div className="space-y-2.5">
          {sortedConversations.map(
            (conversation) => (
              <LeadConversationCard
                key={conversation.id}
                conversation={conversation}
                timezone={timezone}
              />
            ),
          )}

          {totalCount >
            sortedConversations.length && (
            <p
              className={cn(
                "pt-1 text-center",
                "text-[10px]",
                "text-muted-foreground",
              )}
            >
              Showing {sortedConversations.length} of{" "}
              {totalCount} linked conversations
            </p>
          )}
        </div>
      )}
    </section>
  );
}