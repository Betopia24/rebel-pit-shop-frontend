import { CalendarDays, Mail, MapPin, Phone, UserRound } from "lucide-react"

import type { ReactNode } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

import { getLeadChannelConfig } from "../../../config/lead-channels.config"

import type { LeadCustomer } from "../../../types/lead.types"

import type { LeadBasicInformation } from "../../../types/lead-details.types"

export interface LeadBasicInfoProps {
  customer: LeadCustomer
  information: LeadBasicInformation
  timezone?: string
  className?: string
}

const DEFAULT_TIMEZONE = "America/Chicago"

const EMPTY_VALUE = "Not provided"

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return "?"
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

function formatCustomerSince(value: string | null, timezone: string): string {
  if (!value) {
    return EMPTY_VALUE
  }

  const date = new Date(value)

  if (!Number.isFinite(date.getTime())) {
    return EMPTY_VALUE
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: timezone,
    }).format(date)
  } catch {
    return EMPTY_VALUE
  }
}

function normalizeValue(value: string | null | undefined): string {
  return value?.trim() || EMPTY_VALUE
}

interface BasicInfoRowProps {
  icon: ReactNode
  label: string
  value: string
  children?: ReactNode
  className?: string
}

function BasicInfoRow({
  icon,
  label,
  value,
  children,
  className,
}: BasicInfoRowProps) {
  const isMissing = value === EMPTY_VALUE

  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-[minmax(88px,30%)_minmax(0,1fr)]",
        "items-start gap-3 py-2",
        className
      )}
    >
      {/* Label */}
      <div className="flex min-w-0 items-center gap-1.5">
        <span aria-hidden="true" className="shrink-0 text-muted-foreground">
          {icon}
        </span>

        <span className="text-[11px] leading-4 text-muted-foreground">
          {label}
        </span>
      </div>

      {/* Value */}
      <div className="min-w-0">
        {children ?? (
          <Tooltip>
            <TooltipTrigger
              className={cn(
                "block max-w-full rounded-sm text-left",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <span
                className={cn(
                  "block truncate text-[11px] leading-4",
                  isMissing
                    ? "text-muted-foreground"
                    : "font-medium text-foreground"
                )}
              >
                {value}
              </span>
            </TooltipTrigger>

            <TooltipContent side="top" className="max-w-64 break-words">
              {value}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export function LeadBasicInfo({
  customer,
  information,
  timezone = DEFAULT_TIMEZONE,
  className,
}: LeadBasicInfoProps) {
  const phone = normalizeValue(customer.phone)
  const email = normalizeValue(customer.email)
  const location = normalizeValue(customer.location)

  const preferredChannel = customer.preferredChannel
    ? getLeadChannelConfig(customer.preferredChannel)
    : null

  const PreferredChannelIcon = preferredChannel?.icon

  const coach = information.assignedCoach

  const customerSince = formatCustomerSince(information.customerSince, timezone)

  return (
    <section
      aria-labelledby="lead-basic-info-heading"
      className={cn("min-w-0", className)}
    >
      {/* Section title */}
      <h3
        id="lead-basic-info-heading"
        className={cn(
          "mb-2 text-xs font-semibold",
          "tracking-tight text-foreground"
        )}
      >
        Basic Info
      </h3>

      {/* Information rows */}
      <div className="divide-y divide-border/60">
        {/* Phone */}
        <BasicInfoRow
          icon={<Phone className="size-3.5" />}
          label="Phone"
          value={phone}
        />

        {/* Email */}
        <BasicInfoRow
          icon={<Mail className="size-3.5" />}
          label="Email"
          value={email}
        />

        {/* Location */}
        <BasicInfoRow
          icon={<MapPin className="size-3.5" />}
          label="Location"
          value={location}
        />

        {/* Preferred channel */}
        <BasicInfoRow
          icon={
            PreferredChannelIcon ? (
              <PreferredChannelIcon className="size-3.5" />
            ) : (
              <UserRound className="size-3.5" />
            )
          }
          label="Preferred Channel"
          value={preferredChannel?.label ?? EMPTY_VALUE}
        />

        {/* Assigned coach */}
        <BasicInfoRow
          icon={<UserRound className="size-3.5" />}
          label="Assigned Coach"
          value={coach?.name ?? "Unassigned"}
        >
          {coach ? (
            <div className="flex min-w-0 items-center gap-2">
              <Avatar className="size-5 shrink-0">
                {coach.avatarUrl && (
                  <AvatarImage src={coach.avatarUrl} alt={coach.name} />
                )}

                <AvatarFallback className="bg-muted text-[9px] font-semibold">
                  {getInitials(coach.name)}
                </AvatarFallback>
              </Avatar>

              <span className="truncate text-[11px] font-medium text-foreground">
                {coach.name}
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-muted-foreground">
              Unassigned
            </span>
          )}
        </BasicInfoRow>

        {/* Customer since */}
        <BasicInfoRow
          icon={<CalendarDays className="size-3.5" />}
          label="Customer Since"
          value={customerSince}
        />
      </div>
    </section>
  )
}
