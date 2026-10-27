"use client";

import { Bell, BellOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";

export interface HeaderNotification {
  id: string;
  title: string;
  description?: string | null;
  createdAtLabel: string;
  read: boolean;
}

interface HeaderNotificationsProps {
  notifications: readonly HeaderNotification[];
  onNotificationClick?: (
    notification: HeaderNotification,
  ) => void;
}

function formatCount(count: number): string {
  return count > 99 ? "99+" : String(count);
}

export function HeaderNotifications({
  notifications,
  onNotificationClick,
}: HeaderNotificationsProps) {
  const unreadCount = notifications.reduce(
    (count, notification) =>
      count + (notification.read ? 0 : 1),
    0,
  );

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              unreadCount > 0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
            className="
              relative shrink-0
              text-muted-foreground
              hover:bg-accent
              hover:text-foreground
              focus-visible:ring-ring
            "
          />
        }
      >
        <Bell
          aria-hidden="true"
          className="size-4.5"
        />

        {unreadCount > 0 && (
          <Badge
            className="
              pointer-events-none
              absolute -top-1 -right-1
              flex h-4 min-w-4
              items-center justify-center
              rounded-full
              border-2 border-background
              bg-primary px-0.5
              text-[9px] font-semibold
              leading-none
              text-primary-foreground
              tabular-nums
            "
          >
            {formatCount(unreadCount)}
          </Badge>
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="
          w-[calc(100vw-2rem)]
          max-w-90
          gap-0
          overflow-hidden
          rounded-xl
          border-border
          bg-popover
          p-0
          text-popover-foreground
          shadow-md
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center
            justify-between gap-3
            border-b border-border
            px-4 py-3
          "
        >
          <h2
            className="
              text-sm font-semibold
              text-popover-foreground
            "
          >
            Notifications
          </h2>

          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="
                rounded-md
                text-xs font-medium
                tabular-nums
              "
            >
              {unreadCount} unread
            </Badge>
          )}
        </div>

        {/* Notification content */}
        {notifications.length === 0 ? (
          <div
            className="
              flex flex-col
              items-center justify-center
              gap-3 px-5 py-10
              text-center
            "
          >
            <div
              className="
                flex size-11
                items-center justify-center
                rounded-full
                bg-muted
              "
            >
              <BellOff
                aria-hidden="true"
                className="
                  size-5
                  text-muted-foreground
                "
              />
            </div>

            <div className="space-y-1">
              <p
                className="
                  text-sm font-medium
                  text-foreground
                "
              >
                No notifications
              </p>

              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                You&apos;re all caught up.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="max-h-80">
            <div
              role="list"
              aria-label="Recent notifications"
              className="divide-y divide-border"
            >
              {notifications.map((notification) => {
                const content = (
                  <>
                    <span
                      aria-hidden="true"
                      className={[
                        "mt-1.5 size-2 shrink-0",
                        "rounded-full",
                        notification.read
                          ? "bg-muted-foreground/30"
                          : "bg-primary",
                      ].join(" ")}
                    />

                    <span
                      className="
                        flex min-w-0 flex-1
                        flex-col gap-1
                      "
                    >
                      <span
                        className={[
                          "text-xs leading-5",
                          notification.read
                            ? "font-medium text-muted-foreground"
                            : "font-semibold text-foreground",
                        ].join(" ")}
                      >
                        {notification.title}
                      </span>

                      {notification.description && (
                        <span
                          className="
                            line-clamp-2
                            text-xs leading-4
                            text-muted-foreground
                          "
                        >
                          {notification.description}
                        </span>
                      )}

                      <span
                        className="
                          text-[11px]
                          text-text-muted
                        "
                      >
                        {notification.createdAtLabel}
                      </span>
                    </span>
                  </>
                );

                return (
                  <div
                    role="listitem"
                    key={notification.id}
                  >
                    {onNotificationClick ? (
                      <button
                        type="button"
                        onClick={() =>
                          onNotificationClick(notification)
                        }
                        aria-label={
                          notification.read
                            ? notification.title
                            : `${notification.title}, unread`
                        }
                        className="
                          flex w-full
                          cursor-pointer
                          items-start gap-3
                          px-4 py-3
                          text-left
                          transition-colors
                          hover:bg-accent
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-inset
                          focus-visible:ring-ring
                          motion-reduce:transition-none
                        "
                      >
                        {content}
                      </button>
                    ) : (
                      <div
                        className="
                          flex items-start
                          gap-3 px-4 py-3
                        "
                      >
                        {content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}