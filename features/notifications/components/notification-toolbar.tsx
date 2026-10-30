"use client"

import { RotateCcw, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"

import { NOTIFICATION_TYPE_OPTIONS } from "../config/notification.config"

import type {
  NotificationFilter,
  NotificationType,
} from "../types/notification.types"

interface NotificationToolbarProps {
  filter: NotificationFilter
  type: NotificationType | null
  search: string
  unreadCount: number
  onFilterChange: (filter: NotificationFilter) => void
  onTypeChange: (type: NotificationType | null) => void
  onSearchChange: (search: string) => void
}

const ALL_TYPES = "all_types"

function FilterTab({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean
  label: string
  count?: number
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[11px] font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "inline-flex min-w-5 items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
            active ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export function NotificationToolbar({
  filter,
  type,
  search,
  unreadCount,
  onFilterChange,
  onTypeChange,
  onSearchChange,
}: NotificationToolbarProps) {
  const typeLabel =
    NOTIFICATION_TYPE_OPTIONS.find((option) => option.id === type)?.label ??
    "All types"

  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:justify-between sm:p-3.5">
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full min-w-0 sm:max-w-72">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search notifications..."
            aria-label="Search notifications"
            className="h-9 w-full rounded-md border-border bg-background pr-8 pl-9 text-xs"
          />
          {search && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onSearchChange("")}
              aria-label="Clear notification search"
              className="absolute top-1/2 right-1 size-7 -translate-y-1/2 text-muted-foreground"
            >
              <X aria-hidden="true" className="size-3.5" />
            </Button>
          )}
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
            <FilterTab
              active={filter === "all"}
              label="All"
              onClick={() => onFilterChange("all")}
            />
            <FilterTab
              active={filter === "unread"}
              label="Unread"
              count={unreadCount}
              onClick={() => onFilterChange("unread")}
            />
          </div>

          <Select
            value={type ?? ALL_TYPES}
            onValueChange={(value) => {
              onTypeChange(
                value === ALL_TYPES ? null : (value as NotificationType)
              )
            }}
          >
            <SelectTrigger
              size="sm"
              aria-label="Filter notifications by type"
              className="h-9 min-w-32 rounded-md border-border bg-background text-[11px]"
            >
              <span className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  Type:
                </span>
                <span className="truncate text-[11px] text-foreground">
                  {typeLabel}
                </span>
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_TYPES}>All types</SelectItem>
              {NOTIFICATION_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            onFilterChange("all")
            onTypeChange(null)
            onSearchChange("")
          }}
          className="h-8 gap-1.5 px-2.5 text-[11px] text-muted-foreground hover:text-foreground"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Reset
        </Button>
      </div>
    </div>
  )
}

export default NotificationToolbar
