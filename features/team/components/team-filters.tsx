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

import { TEAM_ROLE_OPTIONS } from "../config/team-role.config"

import type {
  TeamFilters as TeamFiltersValue,
  TeamMemberRole,
  TeamMemberStatus,
} from "../types/team.types"

export const DEFAULT_TEAM_FILTERS: TeamFiltersValue = {
  search: "",
  role: null,
  status: null,
}

const ALL_ROLES = "all_roles"
const ALL_STATUSES = "all_statuses"

const STATUS_OPTIONS: readonly {
  value: TeamMemberStatus
  label: string
}[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
]

function FilterTriggerValue({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
      <span className="shrink-0 text-[10px] text-muted-foreground">
        {label}:
      </span>
      <span className="truncate text-[11px] text-foreground">{value}</span>
    </span>
  )
}

export interface TeamFiltersProps {
  value: TeamFiltersValue
  onChange: (value: TeamFiltersValue) => void
  disabled?: boolean
  className?: string
}

export function TeamFilters({
  value,
  onChange,
  disabled = false,
  className,
}: TeamFiltersProps) {
  const hasActiveFilters = Boolean(
    value.search.trim() || value.role || value.status
  )

  const roleLabel =
    TEAM_ROLE_OPTIONS.find((option) => option.value === value.role)?.label ??
    "All"
  const statusLabel =
    STATUS_OPTIONS.find((option) => option.value === value.status)?.label ??
    "All"

  const updateFilter = <K extends keyof TeamFiltersValue>(
    key: K,
    nextValue: TeamFiltersValue[K]
  ) => {
    onChange({ ...value, [key]: nextValue })
  }

  const resetFilters = () => {
    onChange({ ...DEFAULT_TEAM_FILTERS })
  }

  return (
    <div
      role="search"
      aria-label="Filter team members"
      className={cn(
        "flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <div className="relative w-full min-w-0 lg:max-w-72">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          value={value.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          disabled={disabled}
          placeholder="Search team members..."
          aria-label="Search team members"
          className="h-9 w-full rounded-md border-border bg-background pr-8 pl-9 text-xs"
        />
        {value.search && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => updateFilter("search", "")}
            aria-label="Clear team member search"
            className="absolute top-1/2 right-1 size-7 -translate-y-1/2 text-muted-foreground"
          >
            <X aria-hidden="true" className="size-3.5" />
          </Button>
        )}
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Select
          value={value.role ?? ALL_ROLES}
          onValueChange={(nextValue) =>
            updateFilter(
              "role",
              nextValue === ALL_ROLES ? null : (nextValue as TeamMemberRole)
            )
          }
          disabled={disabled}
        >
          <SelectTrigger
            size="sm"
            aria-label="Filter by team role"
            className="h-9 min-w-32 rounded-md border-border bg-background text-[11px]"
          >
            <FilterTriggerValue label="Role" value={roleLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_ROLES}>All Roles</SelectItem>
            {TEAM_ROLE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.status ?? ALL_STATUSES}
          onValueChange={(nextValue) =>
            updateFilter(
              "status",
              nextValue === ALL_STATUSES
                ? null
                : (nextValue as TeamMemberStatus)
            )
          }
          disabled={disabled}
        >
          <SelectTrigger
            size="sm"
            aria-label="Filter by team member status"
            className="h-9 min-w-36 rounded-md border-border bg-background text-[11px]"
          >
            <FilterTriggerValue label="Status" value={statusLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_STATUSES}>All Statuses</SelectItem>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          disabled={disabled || !hasActiveFilters}
          className="h-9 gap-1.5 rounded-md px-2.5 text-[11px] text-muted-foreground hover:text-foreground"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Reset
        </Button>
      </div>
    </div>
  )
}

export default TeamFilters
