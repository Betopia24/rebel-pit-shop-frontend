import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  Inbox,
  MessagesSquare,
  RefreshCw,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ConversationPreviewRow } from "./conversation-preview-row";

import {
  DASHBOARD_INBOX_PREVIEW_LIMIT,
  DASHBOARD_INBOX_ROUTE,
} from "../../config/dashboard-inbox.config";

import type {
  DashboardInboxConversation,
  InboxPreviewProps,
} from "../../types/dashboard-inbox.types";

function getPreviewConversations(
  conversations: readonly DashboardInboxConversation[],
): DashboardInboxConversation[] {
  return conversations
    .filter((conversation) => {
      return (
        Boolean(conversation.id) &&
        Boolean(conversation.customer?.name?.trim()) &&
        Number.isFinite(
          Date.parse(conversation.lastMessage?.sentAt ?? ""),
        )
      );
    })
    .slice()
    .sort(
      (a, b) =>
        Date.parse(b.lastMessage.sentAt) -
        Date.parse(a.lastMessage.sentAt),
    )
    .slice(0, DASHBOARD_INBOX_PREVIEW_LIMIT);
}

function InboxPreviewLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading recent conversations"
      className="min-w-0"
    >
      {Array.from({
        length: DASHBOARD_INBOX_PREVIEW_LIMIT,
      }).map((_, index) => (
        <ConversationPreviewRow
          key={`conversation-skeleton-${index}`}
          conversation={null}
          isLoading
          showDivider={
            index < DASHBOARD_INBOX_PREVIEW_LIMIT - 1
          }
        />
      ))}

      <span className="sr-only">
        Loading recent conversations.
      </span>
    </div>
  );
}

function InboxPreviewEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-50 flex-col",
        "items-center justify-center gap-3",
        "rounded-lg border border-dashed border-border",
        "px-5 py-8 text-center",
      )}
    >
      <div
        className={cn(
          "flex size-11 items-center justify-center",
          "rounded-lg bg-muted text-muted-foreground",
        )}
      >
        <Inbox
          aria-hidden="true"
          className="size-5"
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          No conversations yet
        </p>

        <p
          className={cn(
            "max-w-xs text-xs leading-relaxed",
            "text-muted-foreground",
          )}
        >
          New customer conversations will appear
          here when messages arrive.
        </p>
      </div>
    </div>
  );
}

interface InboxPreviewErrorProps {
  message?: string | null;
  onRetry?: () => void;
}

function InboxPreviewError({
  message,
  onRetry,
}: InboxPreviewErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-50 flex-col",
        "items-center justify-center gap-3",
        "rounded-lg border border-dashed",
        "border-destructive/30",
        "px-5 py-8 text-center",
      )}
    >
      <div
        className={cn(
          "flex size-11 items-center justify-center",
          "rounded-lg bg-destructive/10",
          "text-destructive",
        )}
      >
        <AlertCircle
          aria-hidden="true"
          className="size-5"
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Unable to load conversations
        </p>

        <p
          className={cn(
            "max-w-xs text-xs leading-relaxed",
            "text-muted-foreground",
          )}
        >
          {message ||
            "Something went wrong while loading recent conversations."}
        </p>
      </div>

      {onRetry && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onRetry}
          className="mt-1"
        >
          <RefreshCw
            aria-hidden="true"
            className="size-3.5"
          />
          Try again
        </Button>
      )}
    </div>
  );
}

interface InboxPreviewListProps {
  conversations: readonly DashboardInboxConversation[];
  referenceTime: string | null;
}

function InboxPreviewList({
  conversations,
  referenceTime,
}: InboxPreviewListProps) {
  const previewConversations =
    getPreviewConversations(conversations);

  if (previewConversations.length === 0) {
    return <InboxPreviewEmpty />;
  }

  return (
    <div
      className="min-w-0"
      aria-label="Latest customer conversations"
    >
      {previewConversations.map(
        (conversation, index) => (
          <ConversationPreviewRow
            key={conversation.id}
            conversation={conversation}
            referenceTime={referenceTime}
            showDivider={
              index < previewConversations.length - 1
            }
          />
        ),
      )}
    </div>
  );
}

export function InboxPreview({
  data,
  status,
  error = null,
  onRetry,
  referenceTime = null,
  className,
}: InboxPreviewProps) {
  const isLoading = status === "loading";
  const isError = status === "error";

  const isEmpty =
    status === "empty" ||
    (status === "success" &&
      (!data || data.conversations.length === 0));

  const effectiveReferenceTime =
    referenceTime ?? data?.updatedAt ?? null;

  return (
    <Card
      className={cn(
        "min-w-0 gap-0",
        "rounded-xl border-border",
        "bg-card text-card-foreground",
        "py-0 shadow-sm",
        className,
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <CardHeader
        className={cn(
          "flex flex-row flex-wrap",
          "items-start justify-between",
          "gap-x-3 gap-y-2",
          "px-4 pt-4 pb-3",
          "sm:px-5 sm:pt-5",
        )}
      >
        <div className="min-w-0 space-y-1">
          <CardTitle
            className={cn(
              "flex items-center gap-2",
              "text-sm font-semibold",
              "tracking-tight text-foreground",
              "sm:text-base",
            )}
          >
            <MessagesSquare
              aria-hidden="true"
              className="size-4 text-gold"
            />

            Unified Inbox
          </CardTitle>

          <CardDescription
            className={cn(
              "text-xs leading-relaxed",
              "text-muted-foreground",
            )}
          >
            Latest conversations across all channels
          </CardDescription>
        </div>

        {/* View all → /inbox */}
        <Link
          href={DASHBOARD_INBOX_ROUTE}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
            }),
            "h-8 shrink-0 gap-1.5 px-2",
            "text-xs font-medium text-gold",
            "hover:bg-gold-10",
            "hover:text-gold-hover",
            "focus-visible:ring-2",
            "focus-visible:ring-ring",
          )}
        >
          View all

          <ArrowRight
            aria-hidden="true"
            className="size-3.5"
          />
        </Link>
      </CardHeader>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <CardContent
        className={cn(
          "min-w-0 px-4 pt-1 pb-4",
          "sm:px-5 sm:pb-5",
        )}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <InboxPreviewLoading />
        ) : isError ? (
          <InboxPreviewError
            message={error}
            onRetry={onRetry}
          />
        ) : isEmpty ? (
          <InboxPreviewEmpty />
        ) : data ? (
          <InboxPreviewList
            conversations={data.conversations}
            referenceTime={effectiveReferenceTime}
          />
        ) : (
          <InboxPreviewEmpty />
        )}
      </CardContent>
    </Card>
  );
}
