"use client"

import { SidebarContent } from "@/components/ui/sidebar"
import { getSidebarNavigation } from "../config/navigation.config"
import type { SidebarUserRole } from "../types/navigation.types"
import { SidebarNavGroup } from "./sidebar-nav-group"

interface SidebarNavigationProps {
  role: SidebarUserRole
  unreadConversations?: number
}

export function SidebarNavigation({
  role,
  unreadConversations,
}: SidebarNavigationProps) {
  const groups = getSidebarNavigation(role)

  return (
    <SidebarContent
      aria-label="Admin navigation"
      className="scrollbar-hidden gap-0 overscroll-contain py-2"
    >
      <nav aria-label="Main navigation" className="flex min-w-0 flex-col gap-1">
        {groups.map((group) => (
          <SidebarNavGroup
            key={group.id}
            group={group}
            unreadConversations={unreadConversations}
          />
        ))}
      </nav>
    </SidebarContent>
  )
}
