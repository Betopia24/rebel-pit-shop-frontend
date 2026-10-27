import {
  LayoutDashboard,
  MessagesSquare,
  Users,
  CalendarDays,
  CalendarCheck2,
  BrainCircuit,
  FlaskConical,
  BookOpen,
  Plug,
  ChartNoAxesCombined,
  UsersRound,
  Settings,
} from "lucide-react"

import type {
  SidebarNavGroup,
  SidebarNavItem,
  SidebarUserRole,
  SidebarBrand,
  AdminSidebarConfig,
} from "../types/navigation.types"

export const sidebarBrand = {
  name: "REBEL",
  subtitle: "BOXING CLUB",
  logoUrl: "/images/branding/rebel-boxing-logo.webp",
} as const satisfies SidebarBrand

const ALL_ROLES = [
  "admin",
  "coach",
  "staff",
] as const satisfies readonly SidebarUserRole[]

const MANAGEMENT_ROLES = [
  "admin",
  "coach",
  "staff",
] as const satisfies readonly SidebarUserRole[]

const ADMIN_ONLY = ["admin"] as const satisfies readonly SidebarUserRole[]

export const sidebarNavigation = [
  {
    id: "general",
    label: "General",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        allowedRoles: ALL_ROLES,
      },
      {
        id: "inbox",
        title: "Inbox",
        href: "/inbox",
        icon: MessagesSquare,
        allowedRoles: MANAGEMENT_ROLES,
      },
      {
        id: "leads",
        title: "Leads & Prospects",
        href: "/leads-prospect",
        icon: Users,
        allowedRoles: MANAGEMENT_ROLES,
      },
      {
        id: "calendar",
        title: "Calendar",
        href: "/calendar",
        icon: CalendarDays,
        allowedRoles: ALL_ROLES,
      },
      {
        id: "bookings",
        title: "Bookings",
        href: "/bookings",
        icon: CalendarCheck2,
        allowedRoles: MANAGEMENT_ROLES,
      },
    ],
  },
  {
    id: "ai_management",
    label: "AI Management",
    items: [
      {
        id: "ai-center",
        title: "AI Center",
        href: "/ai-center",
        icon: BrainCircuit,
        allowedRoles: ADMIN_ONLY,
      },
      {
        id: "ai-playground",
        title: "AI Playground",
        href: "/ai-playground",
        icon: FlaskConical,
        allowedRoles: ADMIN_ONLY,
      },
      {
        id: "knowledge-base",
        title: "Knowledge Base",
        href: "/knowledge-base",
        icon: BookOpen,
        allowedRoles: ADMIN_ONLY,
      },
    ],
  },
  {
    id: "management",
    label: "Management",
    items: [
      {
        id: "channels",
        title: "Channels & Integrations",
        href: "/channels-integrations",
        icon: Plug,
        allowedRoles: ADMIN_ONLY,
      },
      {
        id: "analytics",
        title: "Analytics",
        href: "/analytics",
        icon: ChartNoAxesCombined,
        allowedRoles: ALL_ROLES,
      },
      {
        id: "team",
        title: "Team",
        href: "/team",
        icon: UsersRound,
        allowedRoles: ADMIN_ONLY,
      },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      {
        id: "settings",
        title: "Settings",
        href: "/settings",
        icon: Settings,
        allowedRoles: ADMIN_ONLY,
      },
    ],
  },
] as const satisfies readonly SidebarNavGroup[]

/**
 * Complete static configuration.
 */
export const adminSidebarConfig = {
  brand: sidebarBrand,
  navigation: sidebarNavigation,
} as const satisfies AdminSidebarConfig

/**
 * Returns navigation groups visible to a user role.
 *
 * This function is pure and can be used from
 * server or client components.
 *
 * Important:
 * Filtering navigation does not provide security.
 * Every protected page and API must also enforce
 * server-side authorization.
 */
export function getSidebarNavigation(role: SidebarUserRole): SidebarNavGroup[] {
  return sidebarNavigation
    .map((group) => ({
      id: group.id,
      label: group.label,
      items: group.items.filter((item) => {
        const allowedRoles = item.allowedRoles as
          readonly SidebarUserRole[] | undefined

        return allowedRoles === undefined || allowedRoles.includes(role)
      }) as SidebarNavItem[],
    }))
    .filter((group) => group.items.length > 0)
}
