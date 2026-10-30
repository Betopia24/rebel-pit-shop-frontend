"use client"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"

import { NOTIFICATION_TYPE_CONFIG } from "../config/notification.config"

import type {
  NotificationAction,
  NotificationRecord,
} from "../types/notification.types"

interface NotificationListProps {
  notifications: readonly NotificationRecord[]
  onAction: (
    notification: NotificationRecord,
    action: NotificationAction
  ) => void
}

const GROUP_ORDER = ["Today", "Yesterday", "Earlier"] as const

export function NotificationList({
  notifications,
  onAction,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-5 py-10 text-center">
        <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <span className="text-lg">✓</span>
        </span>
        <p className="mt-3 text-sm font-semibold text-foreground">
          You&apos;re all caught up
        </p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
          There are no notifications matching your current filters.
        </p>
      </div>
    )
  }

  return (
    <section
      aria-label="Notifications list"
      className="min-w-0 overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Recent notifications
          </h2>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Stay up to date with activity across your workspace.
          </p>
        </div>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {notifications.length} total
        </span>
      </div>

      {GROUP_ORDER.map((group) => {
        const groupNotifications = notifications.filter(
          (notification) => notification.group === group
        )

        if (groupNotifications.length === 0) return null

        return (
          <div key={group}>
            <div className="border-b border-border/70 bg-muted/20 px-4 py-2 sm:px-5">
              <p className="text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                {group}
              </p>
            </div>

            <div role="list" className="divide-y divide-border">
              {groupNotifications.map((notification) => {
                const config = NOTIFICATION_TYPE_CONFIG[notification.type]
                const Icon = config.icon

                return (
                  <div
                    key={notification.id}
                    role="listitem"
                    className={cn(
                      "flex items-start gap-3 px-4 py-4 transition-colors sm:px-5",
                      !notification.read && "bg-gold/[0.035]"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
                        config.iconBackgroundClassName,
                        config.iconClassName
                      )}
                    >
                      <Icon className="size-4" strokeWidth={1.8} />
                    </span>

                    <button
                      type="button"
                      onClick={() => onAction(notification, "toggle_read")}
                      className="min-w-0 flex-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                      aria-label={`${notification.read ? "Mark unread" : "Mark read"}: ${notification.title}`}
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p
                          className={cn(
                            "text-xs leading-5",
                            notification.read
                              ? "font-medium text-foreground"
                              : "font-semibold text-foreground"
                          )}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span
                            className="size-1.5 rounded-full bg-gold"
                            aria-label="Unread"
                          />
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-muted-foreground">
                        {notification.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{config.label}</span>
                        <span
                          aria-hidden="true"
                          className="size-1 rounded-full bg-border"
                        />
                        <span>{notification.createdAtLabel}</span>
                      </div>
                    </button>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${notification.title}`}
                            className="size-8 shrink-0 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                          />
                        }
                      >
                        <MoreHorizontal aria-hidden="true" className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-40">
                        <DropdownMenuItem
                          onClick={() => onAction(notification, "toggle_read")}
                          className="text-xs"
                        >
                          {notification.read
                            ? "Mark as unread"
                            : "Mark as read"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onAction(notification, "delete")}
                          className="text-xs text-destructive focus:text-destructive"
                        >
                          Delete notification
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default NotificationList
