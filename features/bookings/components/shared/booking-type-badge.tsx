
import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  getBookingTypeConfig,
} from "../../config/booking-types.config";

import type {
  BookingType,
} from "../../types/booking.types";

export type BookingTypeBadgeSize = "sm" | "md" | "lg";

export interface BookingTypeBadgeProps
  extends Omit<
    ComponentProps<typeof Badge>,
    "children" | "variant"
  > {
  type: BookingType;
  size?: BookingTypeBadgeSize;
  showIcon?: boolean;
  shortLabel?: boolean;
  label?: string;
}


const BADGE_SIZE_CLASSES = {
  sm: {
    badge:
      "min-h-5 gap-1 rounded-md px-1.5 py-0.5 text-[10px] leading-none",

    icon: "size-3",
  },

  md: {
    badge:
      "min-h-5.5 gap-1.5 rounded-md px-2 py-0.5 text-[11px] leading-4",

    icon: "size-3.5",
  },

  lg: {
    badge:
      "min-h-7 gap-1.5 rounded-md px-2.5 py-1 text-xs leading-4",

    icon: "size-3.5",
  },
} as const satisfies Record<
  BookingTypeBadgeSize,
  {
    badge: string;
    icon: string;
  }
>;

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingTypeBadge({
  type,
  size = "sm",
  showIcon = false,
  shortLabel = false,
  label,
  className,
  ...props
}: BookingTypeBadgeProps) {
  const config = getBookingTypeConfig(type);

  const styles = BADGE_SIZE_CLASSES[size];

  const Icon = config.icon;

  const displayLabel =
    label?.trim() ||
    (shortLabel
      ? config.shortLabel
      : config.label);

  return (
    <Badge
      {...props}
      variant="outline"
      aria-label={`Booking type: ${config.label}`}
      className={cn(
        "inline-flex w-fit max-w-full shrink-0",
        "items-center justify-center",
        "border font-medium shadow-none",
        "whitespace-nowrap",
        styles.badge,
        config.badgeClassName,
        className,
      )}
    >
      {showIcon && (
        <Icon
          aria-hidden="true"
          className={cn(
            "shrink-0",
            styles.icon,
            config.iconClassName,
          )}
          strokeWidth={1.8}
        />
      )}

      <span className="truncate">
        {displayLabel}
      </span>
    </Badge>
  );
}

/* ============================================================
   COMPACT TYPE INDICATOR
============================================================ */

export interface BookingTypeIndicatorProps {
    type: BookingType;
    showLabel?: boolean;
    shortLabel?: boolean;
    className?: string;
}


export function BookingTypeIndicator({
  type,
  showLabel = true,
  shortLabel = false,
  className,
}: BookingTypeIndicatorProps) {
  const config = getBookingTypeConfig(type);

  const displayLabel = shortLabel
    ? config.shortLabel
    : config.label;

  return (
    <span
      aria-label={`Booking type: ${config.label}`}
      className={cn(
        "inline-flex min-w-0 items-center",
        "gap-1.5 text-[11px]",
        "font-medium text-foreground",
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
          {displayLabel}
        </span>
      )}
    </span>
  );
}
