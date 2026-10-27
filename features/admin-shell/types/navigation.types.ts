import type { LucideIcon } from "lucide-react"
export type SidebarUserRole = "admin" | "coach" | "staff"
export type SidebarGroupId =
  "general" | "ai_management" | "management" | "system"
export interface SidebarNavBadge {
  value: string | number
  variant?: "default" | "secondary" | "destructive" | "outline"
}
export interface SidebarNavItem {
  id: string
  title: string
  href: `/${string}`
  icon: LucideIcon
  allowedRoles?: readonly SidebarUserRole[]
  badge?: SidebarNavBadge
  disabled?: boolean
  matchSubRoutes?: boolean
}
export interface SidebarNavGroup {
  id: SidebarGroupId
  label: string
  items: readonly SidebarNavItem[]
}
export type SidebarAIStatus = "draft" | "testing" | "live" | "paused" | "error"

export interface SidebarUser {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
  role: SidebarUserRole
}

export interface SidebarBrand {
  name: string
  subtitle?: string
  logoUrl?: string | null
}
export interface AdminSidebarConfig {
  brand: SidebarBrand
  navigation: readonly SidebarNavGroup[]
}
export interface SidebarIndicators {
  unreadConversations?: number
  aiStatus?: SidebarAIStatus
}
export interface AdminSidebarProps {
  user: SidebarUser
  indicators?: SidebarIndicators
}
