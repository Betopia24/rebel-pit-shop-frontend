import { Sidebar, SidebarRail } from "@/components/ui/sidebar"

import { sidebarBrand } from "../config/navigation.config"
import { SidebarBrand } from "./sidebar-brand"
import { SidebarNavigation } from "./sidebar-navigation"
import { SidebarUserMenu } from "./sidebar-user-menu"

import type { AdminSidebarProps } from "../types/navigation.types"

interface AppSidebarProps extends AdminSidebarProps {
  logoutAction: () => Promise<void>
}

export function AppSidebar({
  user,
  indicators,
  logoutAction,
}: AppSidebarProps) {
  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      aria-label="Dashboard sidebar"
      className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      {/* Original logo / collapsed lettermark */}
      <SidebarBrand brand={sidebarBrand} />

      {/* Role-based application navigation */}
      <SidebarNavigation
        role={user.role}
        unreadConversations={indicators?.unreadConversations}
      />

      {/* Logged-in user dropdown */}
      <SidebarUserMenu user={user} logoutAction={logoutAction} />

      {/* Desktop collapse / expand rail */}
      <SidebarRail />
    </Sidebar>
  )
}
