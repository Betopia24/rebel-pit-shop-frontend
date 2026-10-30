
import type {
  ComponentProps,
} from "react";

import {
  Badge,
} from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import {
  getBookingStatusConfig,
} from "../../config/booking-status.config";

import type {
  BookingStatus,
} from "../../types/booking.types";

export type BookingStatusBadgeSize = "sm" | "md" | "lg";

export type BookingStatusBadgeAppearance = "soft" | "dot";

export interface BookingStatusBadgeProps
  extends Omit<
    ComponentProps<typeof Badge>,
    "children" | "variant"
  > {
  status: BookingStatus;
  size?: BookingStatusBadgeSize;
  appearance?: BookingStatusBadgeAppearance;
  showIcon?: boolean;
  label?: string;
  announceChanges?: boolean;
}


const BADGE_SIZE_CLASSES = {
  sm: {
    badge:
      "min-h-5 gap-1 rounded-md px-1.5 py-0.5 text-[10px] leading-none",

    icon: "size-3",

    dot: "size-1.5",
  },

  md: {
    badge:
      "min-h-5.5 gap-1.5 rounded-md px-2 py-0.5 text-[11px] leading-4",

    icon: "size-3.5",

    dot: "size-1.5",
  },

  lg: {
    badge:
      "min-h-7 gap-1.5 rounded-md px-2.5 py-1 text-xs leading-4",

    icon: "size-3.5",

    dot: "size-2",
  },
} as const satisfies Record<
  BookingStatusBadgeSize,
  {
    badge: string;
    icon: string;
    dot: string;
  }
>;

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingStatusBadge({
  status,
  size = "sm",
  appearance = "soft",
  showIcon = false,
  label,
  announceChanges = false,
  className,
  ...props
}: BookingStatusBadgeProps) {
  const config = getBookingStatusConfig(status);

  const styles = BADGE_SIZE_CLASSES[size];

  const Icon = config.icon;

  const displayLabel =
    label?.trim() || config.label;

  const showDot = appearance === "dot";

  return (
    <Badge
      {...props}
      variant="outline"
      aria-label={`Booking status: ${config.label}`}
      aria-live={
        announceChanges ? "polite" : undefined
      }
      className={cn(
        "inline-flex w-fit shrink-0 items-center",
        "justify-center whitespace-nowrap",
        "border font-medium",
        "shadow-none",
        styles.badge,
        config.badgeClassName,
        className,
      )}
    >
      {showDot ? (
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 rounded-full",
            styles.dot,
            config.dotClassName,
          )}
        />
      ) : showIcon ? (
        <Icon
          aria-hidden="true"
          className={cn(
            "shrink-0",
            styles.icon,
            config.iconClassName,
          )}
          strokeWidth={1.8}
        />
      ) : null}

      <span className="truncate">
        {displayLabel}
      </span>
    </Badge>
  );
}

/* ============================================================
   OPTIONAL COMPACT STATUS INDICATOR
============================================================ */

export interface BookingStatusIndicatorProps {
  status: BookingStatus;

  showLabel?: boolean;

  className?: string;
}


export function BookingStatusIndicator({
  status,
  showLabel = true,
  className,
}: BookingStatusIndicatorProps) {
  const config = getBookingStatusConfig(status);

  return (
    <span
      aria-label={`Booking status: ${config.label}`}
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5",
        "text-[11px] font-medium text-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          config.dotClassName,
        )}
      />

      {showLabel && (
        <span className="truncate">
          {config.label}
        </span>
      )}
    </span>
  );
}
