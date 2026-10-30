import {
  Bell,
  CalendarCheck2,
  MessageSquareText,
  UserPlus,
  UsersRound,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"

import type {
  NotificationType,
  NotificationTypeDefinition,
} from "../types/notification.types"

export const NOTIFICATION_TYPE_OPTIONS: readonly NotificationTypeDefinition[] =
  [
    {
      id: "booking",
      label: "Bookings",
      description: "Booking requests, confirmations, and changes",
    },
    {
      id: "lead",
      label: "Leads",
      description: "Lead activity and pipeline updates",
    },
    {
      id: "message",
      label: "Messages",
      description: "New conversations and replies",
    },
    {
      id: "team",
      label: "Team",
      description: "Invitations, access, and team changes",
    },
    {
      id: "system",
      label: "System",
      description: "Workspace and automation updates",
    },
  ]

export const NOTIFICATION_TYPE_CONFIG: Record<
  NotificationType,
  {
    label: string
    icon: LucideIcon
    iconClassName: string
    iconBackgroundClassName: string
  }
> = {
  booking: {
    label: "Booking",
    icon: CalendarCheck2,
    iconClassName: "text-gold",
    iconBackgroundClassName: "bg-gold/10",
  },
  lead: {
    label: "Lead",
    icon: UserPlus,
    iconClassName: "text-sky-300",
    iconBackgroundClassName: "bg-sky-400/10",
  },
  message: {
    label: "Message",
    icon: MessageSquareText,
    iconClassName: "text-violet-300",
    iconBackgroundClassName: "bg-violet-400/10",
  },
  team: {
    label: "Team",
    icon: UsersRound,
    iconClassName: "text-emerald-300",
    iconBackgroundClassName: "bg-emerald-400/10",
  },
  system: {
    label: "System",
    icon: Bell,
    iconClassName: "text-muted-foreground",
    iconBackgroundClassName: "bg-muted",
  },
}

export function getNotificationTypeLabel(type: NotificationType): string {
  return NOTIFICATION_TYPE_CONFIG[type].label
}
