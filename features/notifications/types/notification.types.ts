export type NotificationType =
  "booking" | "lead" | "message" | "team" | "system"

export type NotificationFilter = "all" | "unread"

export type NotificationAction = "toggle_read" | "delete"

export interface NotificationRecord {
  id: string
  type: NotificationType
  title: string
  description: string
  createdAt: string
  createdAtLabel: string
  group: "Today" | "Yesterday" | "Earlier"
  read: boolean
}

export interface NotificationTypeDefinition {
  id: NotificationType
  label: string
  description: string
}
