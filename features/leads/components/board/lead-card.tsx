"use client";

import type {
  KeyboardEvent,
  MouseEvent,
} from "react";

import {
  CalendarClock,
  Check,
  Clock3,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import {
  getLeadChannelConfig,
} from "../../config/lead-channels.config";

import {
  getLeadTemperatureConfig,
} from "../../config/lead-temperature.config";

import type {
  Lead,
  LeadId,
  LeadStage,
} from "../../types/lead.types";

export interface LeadCardProps {
    lead: Lead;
    isSelected?: boolean;
    onSelect?: (leadId: LeadId) => void;
    onStageChange?: (
        leadId: LeadId,
        stage: LeadStage,
    ) => void;
    onScheduleFollowUp?: (
        leadId: LeadId,
    ) => void;
    onMarkConverted?: (
        leadId: LeadId,
    ) => void;
    timezone?: string;
    disabled?: boolean;
    className?: string;
}

const DEFAULT_TIMEZONE = "America/Chicago";

const dateTimeFormatterCache = new Map<
  string,
  Intl.DateTimeFormat
>();

function getCustomerInitials(
  name: string,
): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function getActivityFormatter(
  timezone: string,
): Intl.DateTimeFormat {
  const existing =
    dateTimeFormatterCache.get(timezone);

  if (existing) {
    return existing;
  }

  const formatter = new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    },
  );

  dateTimeFormatterCache.set(
    timezone,
    formatter,
  );

  return formatter;
}

function formatLeadActivity(
  occurredAt: string,
  timezone: string,
  fallback: string,
): string {
  const date = new Date(occurredAt);

  if (!Number.isFinite(date.getTime())) {
    return fallback || "Date unavailable";
  }

  try {
    return getActivityFormatter(
      timezone,
    ).format(date);
  } catch {
    return fallback || "Date unavailable";
  }
}

function getExperienceLabel(
  experience: Lead["experienceLevel"],
): string {
  switch (experience) {
    case "beginner":
      return "Beginner";

    case "intermediate":
      return "Intermediate";

    case "experienced":
      return "Experienced";

    default:
      return "Experience unknown";
  }
}

export function LeadCard({
  lead,
  isSelected = false,
  onSelect,
  onStageChange,
  onScheduleFollowUp,
  onMarkConverted,
  timezone = DEFAULT_TIMEZONE,
  disabled = false,
  className,
}: LeadCardProps) {
  const channel =
    getLeadChannelConfig(lead.channel);

  const temperature =
    getLeadTemperatureConfig(
      lead.temperature,
    );

  const ChannelIcon = channel.icon;

  const TemperatureIcon =
    temperature.icon;

  const activityLabel =
    formatLeadActivity(
      lead.lastActivity.occurredAt,
      timezone,
      lead.lastActivity.label,
    );

  const experienceLabel =
    getExperienceLabel(
      lead.experienceLevel,
    );

  const initials =
    getCustomerInitials(
      lead.customer.name,
    );

  /* ==========================================================
     HANDLERS
  ========================================================== */

  function handleSelect() {
    if (disabled) {
      return;
    }

    onSelect?.(lead.id);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    if (disabled || event.target !== event.currentTarget) {
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleSelect();
    }
  }

  function stopCardSelection(
    event: MouseEvent<HTMLElement>,
  ) {
    event.stopPropagation();
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-pressed={isSelected}
      aria-label={[
        lead.customer.name,
        temperature.label,
        channel.label,
        experienceLabel,
        lead.interest.title,
        isSelected
          ? "Selected"
          : "View lead details",
      ].join(", ")}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative min-w-0",
        "rounded-lg border bg-card",
        "px-3 py-3",
        "text-card-foreground",
        "shadow-sm",
        "outline-none",
        "transition-[border-color,box-shadow,background-color]",
        "duration-150",

        !disabled && [
          "cursor-pointer",
          "hover:border-gold/40",
          "hover:shadow-md",
          "focus-visible:ring-2",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
        ],

        isSelected
          ? [
              "border-gold",
              "bg-gold-10",
              "ring-1 ring-gold/25",
            ]
          : "border-border",

        disabled &&
          "cursor-not-allowed opacity-60",

        "motion-reduce:transition-none",

        className,
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex min-w-0 items-start gap-2.5">
        {/* Customer avatar */}
        <Avatar className="size-8 shrink-0">
          {lead.customer.avatarUrl && (
            <AvatarImage
              src={lead.customer.avatarUrl}
              alt={lead.customer.name}
            />
          )}

          <AvatarFallback
            className={cn(
              "bg-muted text-foreground",
              "text-[10px] font-semibold",
            )}
          >
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Name and channel */}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate",
              "text-xs font-semibold",
              "leading-4 text-foreground",
            )}
            title={lead.customer.name}
          >
            {lead.customer.name}
          </p>

          <div className="mt-1 flex min-w-0 items-center gap-1.5">
            <Badge
              variant="outline"
              className={cn(
                "h-5 max-w-full",
                "gap-1 rounded-md",
                "px-1.5 py-0",
                "text-[10px] font-medium",
                channel.badgeClassName,
              )}
            >
              <ChannelIcon
                aria-hidden="true"
                className={cn(
                  "size-3 shrink-0",
                  channel.iconClassName,
                )}
              />

              <span className="truncate">
                {channel.shortLabel}
              </span>
            </Badge>
          </div>
        </div>

        {/* Temperature */}
        <Badge
          variant="outline"
          className={cn(
            "h-5 shrink-0",
            "gap-1 rounded-md",
            "px-1.5 py-0",
            "text-[10px] font-semibold",
            temperature.badgeClassName,
          )}
        >
          <TemperatureIcon
            aria-hidden="true"
            className={cn(
              "size-3",
              temperature.iconClassName,
            )}
          />

          {temperature.shortLabel}
        </Badge>
      </div>

      {/* ======================================================
          LEAD INFORMATION
      ====================================================== */}

      <div className="mt-3 min-w-0 space-y-1.5">
        {/* Experience */}
        <div className="flex min-w-0 items-center gap-1.5">
          <UserRound
            aria-hidden="true"
            className={cn(
              "size-3.5 shrink-0",
              "text-muted-foreground",
            )}
          />

          <span
            className={cn(
              "truncate text-[11px]",
              "text-muted-foreground",
            )}
          >
            {experienceLabel}
          </span>
        </div>

        {/* Interest title */}
        <p
          className={cn(
            "truncate",
            "text-xs font-semibold",
            "leading-4 text-foreground",
          )}
          title={lead.interest.title}
        >
          {lead.interest.title}
        </p>

        {/* Description */}
        {lead.interest.description && (
          <Tooltip>
            <TooltipTrigger
              render={
                <span
                  className={cn(
                    "block max-w-full truncate",
                    "text-left text-[11px]",
                    "leading-4 text-muted-foreground",
                  )}
                />
              }
            >
              {lead.interest.description}
            </TooltipTrigger>

            <TooltipContent
              side="top"
              className="max-w-60"
            >
              {lead.interest.description}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div
        className={cn(
          "mt-3 flex min-w-0",
          "items-center justify-between",
          "gap-2 border-t border-border",
          "pt-2.5",
        )}
      >
        {/* Activity timestamp */}
        <div className="flex min-w-0 items-center gap-1.5">
          <Clock3
            aria-hidden="true"
            className="size-3 shrink-0 text-muted-foreground"
          />

          <time
            dateTime={lead.lastActivity.occurredAt}
            className={cn(
              "truncate text-[10px]",
              "text-muted-foreground",
              "tabular-nums",
            )}
          >
            {activityLabel}
          </time>
        </div>

        {/* Lead actions */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                className={cn(
                  "size-6 shrink-0",
                  "text-muted-foreground",
                  "hover:bg-muted",
                  "hover:text-foreground",
                )}
                aria-label={
                  `More actions for ${lead.customer.name}`
                }
                onClick={stopCardSelection}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}
              />
            }
          >
            <MoreHorizontal
              aria-hidden="true"
              className="size-4"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="min-w-44"
          >
            <DropdownMenuItem
              onClick={(event) => {
                event.stopPropagation();
                handleSelect();
              }}
            >
              <UserRound className="size-4" />
              View Details
            </DropdownMenuItem>

            {onScheduleFollowUp && (
              <DropdownMenuItem
                onClick={(event) => {
                  event.stopPropagation();
                  onScheduleFollowUp(lead.id);
                }}
              >
                <CalendarClock className="size-4" />
                Schedule Follow-up
              </DropdownMenuItem>
            )}

            {onMarkConverted &&
              lead.stage !==
                "membership_converted" && (
                <>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={(event) => {
                      event.stopPropagation();
                      onMarkConverted(lead.id);
                    }}
                  >
                    <Check className="size-4" />
                    Mark as Converted
                  </DropdownMenuItem>
                </>
              )}

            {onStageChange &&
              lead.stage !==
                "membership_converted" && (
                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation();

                    const nextStage:
                      LeadStage | null =
                      getNextStage(lead.stage);

                    if (nextStage) {
                      onStageChange(
                        lead.id,
                        nextStage,
                      );
                    }
                  }}
                >
                  Move to Next Stage
                </DropdownMenuItem>
              )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

import {
  getNextLeadStage,
} from "../../config/lead-stages.config";

function getNextStage(
  stage: LeadStage,
): LeadStage | null {
  return getNextLeadStage(stage);
}