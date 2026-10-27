"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type {
  SidebarNavGroup,
  SidebarNavItem,
} from "../types/navigation.types";
interface SidebarNavGroupProps {
  group: SidebarNavGroup;
  unreadConversations?: number;
}

function isActiveRoute(
  pathname: string,
  item: SidebarNavItem,
): boolean {
  const href =
    item.href.length > 1
      ? item.href.replace(/\/+$/, "")
      : item.href;

  const currentPath =
    pathname.length > 1
      ? pathname.replace(/\/+$/, "")
      : pathname;

  if (currentPath === href) {
    return true;
  }

  if (item.matchSubRoutes === false || href === "/") {
    return false;
  }

  return currentPath.startsWith(`${href}/`);
}

function formatUnreadCount(count: number): string {
  return count > 99 ? "99+" : String(count);
}

export function SidebarNavGroup({
  group,
  unreadConversations,
}: SidebarNavGroupProps) {
  const pathname = usePathname();

  if (group.items.length === 0) {
    return null;
  }

  return (
    <SidebarGroup className="px-2 py-2">
      <SidebarGroupLabel
        className="
          mb-1 px-2
          text-[10px] font-semibold
          uppercase tracking-wider
          text-text-muted
          group-data-[collapsible=icon]:hidden
        "
      >
        {group.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {group.items.map((item) => {
            const Icon = item.icon;

            const isActive = isActiveRoute(
              pathname,
              item,
            );

            const isDisabled = item.disabled === true;

            const runtimeUnread =
              item.id === "inbox" &&
              typeof unreadConversations === "number" &&
              Number.isFinite(unreadConversations)
                ? Math.max(
                    0,
                    Math.floor(unreadConversations),
                  )
                : undefined;

            const hasRuntimeUnread =
              runtimeUnread !== undefined &&
              runtimeUnread > 0;

            const badgeValue = hasRuntimeUnread
              ? formatUnreadCount(runtimeUnread)
              : runtimeUnread === undefined
                ? item.badge?.value
                : undefined;

            const hasBadge =
              badgeValue !== undefined &&
              badgeValue !== null &&
              badgeValue !== "" &&
              badgeValue !== 0;

            const tooltipLabel = hasRuntimeUnread
              ? `${item.title} (${runtimeUnread} unread)`
              : item.title;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={
                    isDisabled ? (
                      <span
                        aria-disabled="true"
                        title={item.title}
                      />
                    ) : (
                      <Link href={item.href} />
                    )
                  }
                  isActive={isActive && !isDisabled}
                  tooltip={tooltipLabel}
                  aria-current={
                    isActive && !isDisabled
                      ? "page"
                      : undefined
                  }
                  className={[
                    "h-10 rounded-md px-3",
                    "transition-colors duration-150",
                    "motion-reduce:transition-none",

                    "text-text-secondary",
                    "hover:bg-sidebar-accent",
                    "hover:text-sidebar-accent-foreground",

                    "focus-visible:ring-2",
                    "focus-visible:ring-sidebar-ring",

                    "data-[active=true]:bg-gold-10",
                    "data-[active=true]:text-gold",
                    "data-[active=true]:font-medium",

                    "group-data-[collapsible=icon]:justify-center",
                    "group-data-[collapsible=icon]:px-0",

                    isDisabled
                      ? "pointer-events-none opacity-50"
                      : "",
                  ].join(" ")}
                >
                  <Icon
                    aria-hidden="true"
                    className="
                      size-4 shrink-0
                      text-current
                    "
                  />

                  <span className="min-w-0 truncate">
                    {item.title}
                  </span>
                </SidebarMenuButton>

                {hasBadge && !isDisabled && (
                  <SidebarMenuBadge
                    aria-label={`${badgeValue} notifications`}
                    className="
                      min-w-5 rounded-md
                      bg-sidebar-accent
                      px-1.5 text-center
                      text-[10px] font-semibold
                      tabular-nums
                      text-sidebar-foreground
                      group-data-[collapsible=icon]:hidden
                    "
                  >
                    {badgeValue}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}