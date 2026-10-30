import type { NotificationRecord } from "../types/notification.types"

export const NOTIFICATIONS_MOCK: readonly NotificationRecord[] = [
  {
    id: "notification_1",
    type: "booking",
    title: "New booking request",
    description:
      "Emily Wilson requested a free class for Tue, Apr 22 at 5:00 PM.",
    createdAt: "2026-10-30T09:32:00-05:00",
    createdAtLabel: "12 minutes ago",
    group: "Today",
    read: false,
  },
  {
    id: "notification_2",
    type: "message",
    title: "New message from John Smith",
    description: "Can I move my Boxing Fundamentals session to next week?",
    createdAt: "2026-10-30T08:54:00-05:00",
    createdAtLabel: "50 minutes ago",
    group: "Today",
    read: false,
  },
  {
    id: "notification_3",
    type: "lead",
    title: "Hot lead needs follow-up",
    description:
      "Sarah Miller has been waiting for a response for more than 24 hours.",
    createdAt: "2026-10-30T08:10:00-05:00",
    createdAtLabel: "1 hour ago",
    group: "Today",
    read: false,
  },
  {
    id: "notification_4",
    type: "team",
    title: "Invitation accepted",
    description:
      "Nichole Davis accepted the Coach invitation and joined your team.",
    createdAt: "2026-10-30T07:25:00-05:00",
    createdAtLabel: "2 hours ago",
    group: "Today",
    read: true,
  },
  {
    id: "notification_5",
    type: "booking",
    title: "Booking confirmed",
    description:
      "Sarah Johnson is confirmed for Beginner Boxing on Tue, Apr 22.",
    createdAt: "2026-10-29T16:18:00-05:00",
    createdAtLabel: "Yesterday, 4:18 PM",
    group: "Yesterday",
    read: true,
  },
  {
    id: "notification_6",
    type: "lead",
    title: "Lead moved to AI Qualified",
    description:
      "David Kim answered the qualification questions from Website Chat.",
    createdAt: "2026-10-29T14:42:00-05:00",
    createdAtLabel: "Yesterday, 2:42 PM",
    group: "Yesterday",
    read: true,
  },
  {
    id: "notification_7",
    type: "system",
    title: "Weekly activity summary is ready",
    description:
      "Review your team response time, bookings, and conversion summary.",
    createdAt: "2026-10-28T09:00:00-05:00",
    createdAtLabel: "Oct 28, 9:00 AM",
    group: "Earlier",
    read: true,
  },
  {
    id: "notification_8",
    type: "message",
    title: "Conversation assigned to you",
    description: "A new Instagram conversation was assigned from the AI inbox.",
    createdAt: "2026-10-27T11:24:00-05:00",
    createdAtLabel: "Oct 27, 11:24 AM",
    group: "Earlier",
    read: true,
  },
] as const
