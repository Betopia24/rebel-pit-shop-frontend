import { useId } from "react"
import type { ReactNode } from "react"

import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileText,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils"

import type {
  LeadFollowUpDetails,
  LeadFollowUpPriority,
} from "../../../types/lead-details.types"

import type { LeadFollowUpStatus } from "../../../types/lead.types"

export interface LeadFollowUpSectionProps {
  followUp: LeadFollowUpDetails | null
  timezone?: string
  className?: string
}

const DEFAULT_TIMEZONE = "America/Chicago"

const EMPTY_VALUE = "Not specified"

const FOLLOW_UP_STATUS_CONFIG: Record<
  LeadFollowUpStatus,
  {
    label: string
    className: string
  }
> = {
  open: {
    label: "Open",
    className: "border-warning/20 bg-warning/10 text-warning",
  },
  scheduled: {
    label: "Scheduled",
    className: "border-gold/20 bg-gold-10 text-gold",
  },
  completed: {
    label: "Completed",
    className: "border-success/20 bg-success/10 text-success",
  },
  cancelled: {
    label: "Cancelled",
    className: "border-border bg-muted text-muted-foreground",
  },
}

const FOLLOW_UP_PRIORITY_CONFIG: Record<
  LeadFollowUpPriority,
  {
    label: string
    className: string
  }
> = {
  low: {
    label: "Low",
    className: "border-border bg-muted text-muted-foreground",
  },
  normal: {
    label: "Normal",
    className: "border-border bg-secondary text-secondary-foreground",
  },
  high: {
    label: "High",
    className: "border-warning/20 bg-warning/10 text-warning",
  },
  urgent: {
    label: "Urgent",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
}

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

function normalizeValue(value: string | null | undefined): string {
  return value?.trim() || EMPTY_VALUE
}

function formatFollowUpDate(value: string | null, timezone: string): string {
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
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    }).format(date)
  } catch {
    return EMPTY_VALUE
  }
}

interface FollowUpRowProps {
  icon: ReactNode
  label: string
  value: string
  children?: ReactNode
}

function FollowUpRow({ icon, label, value, children }: FollowUpRowProps) {
  const isMissing = value === EMPTY_VALUE

  return (
    <div
      className={cn(
        "grid min-w-0",
        "grid-cols-[minmax(88px,30%)_minmax(0,1fr)]",
        "items-start gap-3 py-2"
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span aria-hidden="true" className="shrink-0 text-muted-foreground">
          {icon}
        </span>

        <span className="text-[11px] leading-4 text-muted-foreground">
          {label}
        </span>
      </div>

      <div className="min-w-0">
        {children ?? (
          <span
            title={value}
            className={cn(
              "block truncate text-[11px] leading-4",
              isMissing
                ? "text-muted-foreground"
                : "font-medium text-foreground"
            )}
          >
            {value}
          </span>
        )}
      </div>
    </div>
  )
}

function FollowUpCoach({
  name,
  avatarUrl,
}: {
  name: string | null
  avatarUrl: string | null
}) {
  if (!name) {
    return <span className="text-[11px] text-muted-foreground">Unassigned</span>
  }

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Avatar className="size-5 shrink-0">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}

        <AvatarFallback className="bg-muted text-[9px] font-semibold">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <span
        title={name}
        className="truncate text-[11px] font-medium text-foreground"
      >
        {name}
      </span>
    </div>
  )
}

function FollowUpEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-2.5",
        "rounded-lg border border-dashed",
        "border-border bg-muted/20",
        "px-3 py-3"
      )}
    >
      <CalendarClock
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
      />

      <div className="space-y-1">
        <p className="text-[11px] font-medium text-foreground">
          No follow-up scheduled
        </p>

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Follow-up information will appear here when it becomes available.
        </p>
      </div>
    </div>
  )
}

export function LeadFollowUpSection({
  followUp,
  timezone = DEFAULT_TIMEZONE,
  className,
}: LeadFollowUpSectionProps) {
  const headingId = useId()

  const statusConfig = followUp
    ? FOLLOW_UP_STATUS_CONFIG[followUp.status]
    : null

  const priorityConfig = followUp
    ? FOLLOW_UP_PRIORITY_CONFIG[followUp.priority]
    : null

  const notes = followUp?.notes?.trim()

  return (
    <section aria-labelledby={headingId} className={cn("min-w-0", className)}>
      {/* Section heading */}
      <h3
        id={headingId}
        className="mb-2 text-xs font-semibold tracking-tight text-foreground"
      >
        Follow-up
      </h3>

      {!followUp ? (
        <FollowUpEmpty />
      ) : (
        <>
          {/* Information rows */}
          <div className="divide-y divide-border/60">
            <FollowUpRow
              icon={<CalendarClock className="size-3.5" />}
              label="Next Follow-up"
              value={formatFollowUpDate(followUp.nextFollowUpAt, timezone)}
            />

            <FollowUpRow
              icon={<UserRound className="size-3.5" />}
              label="Assigned Coach"
              value={followUp.assignedCoach?.name ?? "Unassigned"}
            >
              <FollowUpCoach
                name={followUp.assignedCoach?.name ?? null}
                avatarUrl={followUp.assignedCoach?.avatarUrl ?? null}
              />
            </FollowUpRow>

            <FollowUpRow
              icon={<Clock3 className="size-3.5" />}
              label="Stage"
              value={normalizeValue(followUp.stage)}
            />

            <FollowUpRow
              icon={<CheckCircle2 className="size-3.5" />}
              label="Status"
              value={statusConfig?.label ?? EMPTY_VALUE}
            >
              {statusConfig && (
                <Badge
                  variant="outline"
                  className={cn(
                    "h-5 rounded-md px-1.5 py-0",
                    "text-[10px] font-medium",
                    statusConfig.className
                  )}
                >
                  {statusConfig.label}
                </Badge>
              )}
            </FollowUpRow>

            <FollowUpRow
              icon={<AlertCircle className="size-3.5" />}
              label="Priority"
              value={priorityConfig?.label ?? EMPTY_VALUE}
            >
              {priorityConfig && (
                <Badge
                  variant="outline"
                  className={cn(
                    "h-5 rounded-md px-1.5 py-0",
                    "text-[10px] font-medium",
                    priorityConfig.className
                  )}
                >
                  {priorityConfig.label}
                </Badge>
              )}
            </FollowUpRow>

            {followUp.lastFollowUpAt && (
              <FollowUpRow
                icon={<Clock3 className="size-3.5" />}
                label="Last Follow-up"
                value={formatFollowUpDate(followUp.lastFollowUpAt, timezone)}
              />
            )}

            {followUp.lastFollowUpBy && (
              <FollowUpRow
                icon={<UserRound className="size-3.5" />}
                label="Last Contact By"
                value={followUp.lastFollowUpBy.name}
              >
                <FollowUpCoach
                  name={followUp.lastFollowUpBy.name}
                  avatarUrl={followUp.lastFollowUpBy.avatarUrl}
                />
              </FollowUpRow>
            )}
          </div>

          {/* Notes */}
          {notes && (
            <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
              <div className="mb-1.5 flex items-center gap-1.5">
                <FileText
                  aria-hidden="true"
                  className="size-3.5 text-muted-foreground"
                />

                <h4 className="text-[11px] font-semibold text-foreground">
                  Follow-up Notes
                </h4>
              </div>

              <p className="text-[11px] leading-relaxed break-words whitespace-pre-wrap text-muted-foreground">
                {notes}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  )
}
