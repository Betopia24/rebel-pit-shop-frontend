import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Separator,
} from "@/components/ui/separator";

import {
  DashboardBreadcrumb,
} from "./dashboard-breadcrumb";

import {
  HeaderNotifications,
} from "./header-notifications";

import type {
  HeaderNotification,
} from "./header-notifications";

interface DashboardHeaderProps {
    notifications?: readonly HeaderNotification[];
    onNotificationClick?: (
        notification: HeaderNotification,
    ) => void;
    currentPageLabel?: string;
}

export function DashboardHeader({
  notifications = [],
  onNotificationClick,
  currentPageLabel,
}: DashboardHeaderProps) {
  return (
    <header
      className="
        sticky top-0
        z-(--z-navbar)
        flex h-14 w-full
        shrink-0 items-center
        border-b border-border
        bg-background
        text-foreground
      "
    >
      <div
        className="
          flex w-full min-w-0
          items-center justify-between
          gap-3 px-3 sm:px-4
        "
      >
        {/* Left: sidebar toggle and breadcrumbs */}
        <div
          className="
            flex min-w-0 flex-1
            items-center gap-2 sm:gap-3
          "
        >
          <SidebarTrigger
            aria-label="Toggle sidebar"
            className="
              size-8 shrink-0
              text-muted-foreground
              hover:bg-accent
              hover:text-foreground
              focus-visible:ring-2
              focus-visible:ring-ring
            "
          />

          <Separator
            orientation="vertical"
            className="
              h-5 shrink-0
              bg-border
            "
          />

          <div className="min-w-0 flex-1">
            <DashboardBreadcrumb
              currentPageLabel={currentPageLabel}
            />
          </div>
        </div>

        {/* Right: notifications */}
        <div
          className="
            flex shrink-0
            items-center justify-end
            gap-2
          "
        >
          <HeaderNotifications
            notifications={notifications}
            onNotificationClick={
              onNotificationClick
            }
          />
        </div>
      </div>
    </header>
  );
}