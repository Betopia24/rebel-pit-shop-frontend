
import type {
  ComponentType,
  ReactNode,
} from "react";

import {
  Globe2,
  MessageSquareText,
  UserRoundCog,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import type {
  BookingSource,
} from "../../types/booking.types";


export type BookingSourceIconSize = "sm" | "md" | "lg";

export type BookingSourceAppearance = "icon" | "badge" | "label";

type SourceIconComponent = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

export interface BookingSourceConfig {
    value: BookingSource;
    label: string;
    shortLabel: string;
    description: string;
    icon: SourceIconComponent;
    iconClassName: string;
    backgroundClassName: string;
}

export interface BookingSourceIconProps {
    source: BookingSource;
    size?: BookingSourceIconSize;
    appearance?: BookingSourceAppearance;
    showTooltip?: boolean;
    showLabel?: boolean;
    className?: string;
}


export const BOOKING_SOURCE_CONFIG = {
  website: {
    value: "website",
    label: "Website",
    shortLabel: "Web",
    description: "Booking received through the website.",
    icon: Globe2,
    iconClassName: "text-foreground",
    backgroundClassName: "bg-muted",
  },

  instagram: {
    value: "instagram",
    label: "Instagram",
    shortLabel: "IG",
    description: "Booking attributed to Instagram.",
    icon: FaInstagram,
    iconClassName: "text-[#E4405F]",
    backgroundClassName: "bg-[#E4405F]/10",
  },

  facebook: {
    value: "facebook",
    label: "Facebook",
    shortLabel: "FB",
    description: "Booking attributed to Facebook.",
    icon: FaFacebookF,
    iconClassName: "text-[#1877F2]",
    backgroundClassName: "bg-[#1877F2]/10",
  },

  sms: {
    value: "sms",
    label: "SMS",
    shortLabel: "SMS",
    description: "Booking received through SMS.",
    icon: MessageSquareText,
    iconClassName: "text-foreground",
    backgroundClassName: "bg-muted",
  },

  manual: {
    value: "manual",
    label: "Manual",
    shortLabel: "Manual",
    description: "Booking created manually by the team.",
    icon: UserRoundCog,
    iconClassName: "text-muted-foreground",
    backgroundClassName: "bg-muted",
  },
} satisfies Record<
  BookingSource,
  BookingSourceConfig
>;


const SIZE_CONFIG = {
  sm: {
    container: "size-5",
    icon: "size-3",
    text: "text-[10px]",
  },

  md: {
    container: "size-7",
    icon: "size-3.5",
    text: "text-[11px]",
  },

  lg: {
    container: "size-9",
    icon: "size-4.5",
    text: "text-xs",
  },
} as const;

export function getBookingSourceConfig(
  source: BookingSource,
): BookingSourceConfig {
  return BOOKING_SOURCE_CONFIG[source];
}

export function getBookingSourceLabel(
  source: BookingSource,
): string {
  return BOOKING_SOURCE_CONFIG[source].label;
}

export function isBookingSource(
  value: unknown,
): value is BookingSource {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(
      BOOKING_SOURCE_CONFIG,
      value,
    )
  );
}


function SourceIconContent({
  source,
  size,
  appearance,
  showLabel,
  className,
}: {
  source: BookingSource;
  size: BookingSourceIconSize;
  appearance: BookingSourceAppearance;
  showLabel: boolean;
  className?: string;
}) {
  const config = getBookingSourceConfig(source);

  const styles = SIZE_CONFIG[size];

  const Icon = config.icon;

  const isIconOnly =
    appearance === "icon";

  const iconNode: ReactNode = (
    <Icon
      aria-hidden="true"
      className={cn(
        "shrink-0",
        styles.icon,
        config.iconClassName,
      )}
    />
  );

  if (isIconOnly) {
    return (
      <span
        role="img"
        aria-label={`Booking source: ${config.label}`}
        className={cn(
          "inline-flex shrink-0 items-center",
          "justify-center rounded-md",
          "border border-border/60",
          styles.container,
          config.backgroundClassName,
          className,
        )}
      >
        {iconNode}
      </span>
    );
  }

  if (appearance === "badge") {
    return (
      <span
        className={cn(
          "inline-flex w-fit min-w-0 items-center",
          "gap-1.5 rounded-md border",
          "border-border bg-card",
          "px-2 py-1",
          styles.text,
          "font-medium text-foreground",
          className,
        )}
      >
        {iconNode}

        {showLabel && (
          <span className="truncate">
            {config.label}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5",
        styles.text,
        "font-medium text-foreground",
        className,
      )}
    >
      {iconNode}

      {showLabel && (
        <span className="truncate">
          {config.label}
        </span>
      )}
    </span>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingSourceIcon({
  source,
  size = "md",
  appearance = "icon",
  showTooltip = true,
  showLabel = true,
  className,
}: BookingSourceIconProps) {
  const config = getBookingSourceConfig(source);

  const content = (
    <SourceIconContent
      source={source}
      size={size}
      appearance={appearance}
      showLabel={showLabel}
      className={className}
    />
  );

  if (!showTooltip) {
    return content;
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            aria-label={`Booking source: ${config.label}`}
            className="inline-flex max-w-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            tabIndex={0}
          />
        }
      >
        {content}
      </TooltipTrigger>

      <TooltipContent side="top">
        <p className="text-xs font-medium">
          {config.label}
        </p>

        <p className="text-[11px] opacity-80">
          {config.description}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
