"use client"

import Link from "next/link"
import { Bell, ChevronsUpDown, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import type { SidebarUser } from "../types/navigation.types"

interface SidebarUserMenuProps {
  user: SidebarUser
  logoutAction: () => Promise<void>
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) {
    return "U"
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
}

function getRoleLabel(role: SidebarUser["role"]): string {
  return role === "admin" ? "Administrator" : "Staff"
}

function UserAvatar({
  user,
  className,
}: {
  user: SidebarUser
  className?: string
}) {
  return (
    <Avatar className={className}>
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}

      <AvatarFallback className="bg-sidebar-accent font-semibold text-sidebar-foreground">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  )
}

export function SidebarUserMenu({ user, logoutAction }: SidebarUserMenuProps) {
  const { isMobile } = useSidebar()

  return (
    <SidebarFooter className="shrink-0 border-t border-sidebar-border p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  tooltip={user.name}
                  className="h-12 rounded-lg text-sidebar-foreground group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                />
              }
            >
              <UserAvatar user={user} className="size-8 shrink-0 rounded-lg" />

              <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>

                <span className="truncate text-xs text-text-secondary">
                  {getRoleLabel(user.role)} · {user.email}
                </span>
              </div>

              <ChevronsUpDown
                aria-hidden="true"
                className="ml-auto size-4 shrink-0 text-text-secondary"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
              className="w-56 min-w-56 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md"
            >
              {/* User information */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="p-2 font-normal">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} className="size-9 rounded-lg" />

                    <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>

                      <span className="truncate text-xs text-muted-foreground">
                        {getRoleLabel(user.role)} · {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Notifications */}
              <DropdownMenuGroup>
                <DropdownMenuItem
                  render={<Link href="/notifications" />}
                  className="cursor-pointer gap-3"
                >
                  <Bell aria-hidden="true" className="size-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={() => void logoutAction()}
                variant="destructive"
                className="cursor-pointer gap-3"
              >
                <LogOut aria-hidden="true" className="size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
