"use client"

import {
  Mail,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserCheck,
  UserRound,
  UserRoundX,
  XCircle,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils"

import { getTeamRoleLabel } from "../config/team-role.config"

import type { TeamMember, TeamMemberAction } from "../types/team.types"

interface TeamMembersTableProps {
  members: readonly TeamMember[]
  onAction?: (member: TeamMember, action: TeamMemberAction) => void
}

const TABLE_HEADER_TEXT_CLASS =
  "text-[11px] font-semibold whitespace-nowrap text-muted-foreground"

const STATUS_CONFIG = {
  active: {
    label: "Active",
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  },
  inactive: {
    label: "Inactive",
    className: "border-border bg-muted text-muted-foreground",
  },
  pending: {
    label: "Pending",
    className: "border-amber-400/20 bg-amber-400/10 text-amber-400",
  },
} as const

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function formatLastActive(member: TeamMember): string {
  if (member.status === "pending") return "Invitation sent"
  if (!member.lastActiveAt) return "Never"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(member.lastActiveAt))
}

function MemberActions({
  member,
  onAction,
}: {
  member: TeamMember
  onAction?: (member: TeamMember, action: TeamMemberAction) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${member.name}`}
            className="size-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          />
        }
      >
        <MoreHorizontal aria-hidden="true" className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuItem
          onClick={() => onAction?.(member, "view")}
          className="gap-2 text-xs"
        >
          <UserRound aria-hidden="true" className="size-3.5" />
          View profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onAction?.(member, "edit")}
          className="gap-2 text-xs"
        >
          <Pencil aria-hidden="true" className="size-3.5" />
          Edit member
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {member.status === "pending" ? (
          <>
            <DropdownMenuItem
              onClick={() => onAction?.(member, "resend_invitation")}
              className="gap-2 text-xs"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              Resend invitation
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onAction?.(member, "cancel_invitation")}
              className="gap-2 text-xs text-destructive focus:text-destructive"
            >
              <XCircle aria-hidden="true" className="size-3.5" />
              Cancel invitation
            </DropdownMenuItem>
          </>
        ) : member.status === "active" ? (
          <DropdownMenuItem
            onClick={() => onAction?.(member, "deactivate")}
            className="gap-2 text-xs text-destructive focus:text-destructive"
          >
            <UserRoundX aria-hidden="true" className="size-3.5" />
            Deactivate member
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => onAction?.(member, "reactivate")}
            className="gap-2 text-xs"
          >
            <UserCheck aria-hidden="true" className="size-3.5" />
            Reactivate member
          </DropdownMenuItem>
        )}

        {member.status === "inactive" && (
          <DropdownMenuItem
            onClick={() => onAction?.(member, "remove")}
            className="gap-2 text-xs text-destructive focus:text-destructive"
          >
            <Trash2 aria-hidden="true" className="size-3.5" />
            Remove member
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function TeamMembersTable({ members, onAction }: TeamMembersTableProps) {
  if (members.length === 0) {
    return (
      <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-5 py-10 text-center">
        <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <UserRound aria-hidden="true" className="size-5" />
        </span>
        <p className="mt-3 text-sm font-semibold text-foreground">
          No team members found
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Try a different name, role, or status filter.
        </p>
      </div>
    )
  }

  return (
    <section
      aria-label="Team members table"
      className="min-w-0 overflow-hidden rounded-xl border border-border bg-card"
    >
      <Table className="min-w-[860px]">
        <TableHeader>
          <TableRow className="h-11 border-b border-border bg-muted/30 hover:bg-muted/30">
            <TableHead className={cn("min-w-52 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Member
            </TableHead>
            <TableHead className={cn("min-w-28 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Role
            </TableHead>
            <TableHead className={cn("min-w-56 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Email
            </TableHead>
            <TableHead className={cn("min-w-28 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Status
            </TableHead>
            <TableHead className={cn("min-w-32 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Last active
            </TableHead>
            <TableHead className="w-12 px-3 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {members.map((member) => {
            const status = STATUS_CONFIG[member.status]

            return (
              <TableRow
                key={member.id}
                className="h-17 border-b border-border/70 hover:bg-muted/30"
              >
                <TableCell className="min-w-52 px-3 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      {member.avatarUrl && (
                        <AvatarImage src={member.avatarUrl} alt="" />
                      )}
                      <AvatarFallback className="bg-gold/10 text-[10px] font-semibold text-gold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {member.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {member.status === "pending"
                          ? "Invitation pending"
                          : "Team member"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-3 py-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-6 rounded-md px-2 text-[10px]",
                      member.role === "admin"
                        ? "border-gold/30 bg-gold/5 text-gold"
                        : "border-sky-400/20 bg-sky-400/5 text-sky-300"
                    )}
                  >
                    {getTeamRoleLabel(member.role)}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-56 truncate px-3 py-3 text-[11px] text-muted-foreground">
                  {member.email}
                </TableCell>
                <TableCell className="px-3 py-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-6 rounded-md px-2 text-[10px]",
                      status.className
                    )}
                  >
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="px-3 py-3 text-[11px] text-muted-foreground">
                  {formatLastActive(member)}
                </TableCell>
                <TableCell className="w-12 px-3 py-3 text-right">
                  <MemberActions member={member} onAction={onAction} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}

export default TeamMembersTable
