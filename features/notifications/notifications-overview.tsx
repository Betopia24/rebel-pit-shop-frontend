"use client"

import { useMemo, useState } from "react"

import { CheckCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

import { PageHeader } from "@/features/admin-shell/components/page-header"

import { NOTIFICATIONS_MOCK } from "./data/notifications.mock"
import { NotificationList } from "./components/notification-list"
import { NotificationPreferences } from "./components/notification-preferences"
import {
  NotificationStats,
  type NotificationStatsData,
} from "./components/notification-stats"
import { NotificationToolbar } from "./components/notification-toolbar"

import type {
  NotificationAction,
  NotificationFilter,
  NotificationRecord,
  NotificationType,
} from "./types/notification.types"

export function NotificationsOverview() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>(
    () => [...NOTIFICATIONS_MOCK]
  )
  const [filter, setFilter] = useState<NotificationFilter>("all")
  const [type, setType] = useState<NotificationType | null>(null)
  const [search, setSearch] = useState("")

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase()

    return notifications.filter((notification) => {
      const matchesRead = filter === "all" || !notification.read
      const matchesType = type === null || notification.type === type
      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.description.toLowerCase().includes(query) ||
        notification.type.toLowerCase().includes(query)

      return matchesRead && matchesType && matchesSearch
    })
  }, [filter, notifications, search, type])

  const stats = useMemo<NotificationStatsData>(() => {
    const actionRequiredTypes = new Set<NotificationType>(["booking", "lead"])

    return {
      total: notifications.length,
      unread: unreadCount,
      thisWeek: notifications.filter(
        (notification) => notification.group !== "Earlier"
      ).length,
      actionRequired: notifications.filter(
        (notification) =>
          !notification.read && actionRequiredTypes.has(notification.type)
      ).length,
    }
  }, [notifications, unreadCount])

  const handleNotificationAction = (
    notification: NotificationRecord,
    action: NotificationAction
  ) => {
    if (action === "delete") {
      setNotifications((current) =>
        current.filter((item) => item.id !== notification.id)
      )
      return
    }

    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id ? { ...item, read: !item.read } : item
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true }))
    )
  }

  return (
    <div className="min-h-full space-y-8 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Notifications"
        description="Keep track of important updates and activity in your workspace."
        actions={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="h-9 gap-2 text-[11px]"
          >
            <CheckCheck aria-hidden="true" className="size-3.5" />
            Mark all as read
          </Button>
        }
      />

      <NotificationStats data={stats} />

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(17rem,0.34fr)]">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Notification feed
              </h2>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Review updates and follow up on anything that needs attention.
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
            </span>
          </div>

          <NotificationToolbar
            filter={filter}
            type={type}
            search={search}
            unreadCount={unreadCount}
            onFilterChange={setFilter}
            onTypeChange={setType}
            onSearchChange={setSearch}
          />

          <NotificationList
            notifications={filteredNotifications}
            onAction={handleNotificationAction}
          />
        </div>
        <NotificationPreferences />
      </div>
    </div>
  )
}

export default NotificationsOverview
