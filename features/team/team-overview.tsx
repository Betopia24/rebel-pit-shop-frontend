"use client"

import { useMemo, useState } from "react"

import { Activity, ShieldCheck, UsersRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PageHeader } from "@/features/admin-shell/components/page-header"
import { BookingTablePagination } from "@/features/bookings/components/table/booking-pagination"

import { cn } from "@/lib/utils"

import { TEAM_ROLE_OPTIONS } from "./config/team-role.config"
import { TEAM_ACTIVITY_LOG_MOCK, TEAM_MEMBERS_MOCK } from "./data/team.mock"
import { TeamActivityPanel } from "./components/team-activity-panel"
import { TeamFilters, DEFAULT_TEAM_FILTERS } from "./components/team-filters"
import { InviteTeamMemberDialog } from "./components/invite-team-member-dialog"
import { TeamMembersTable } from "./components/team-members-table"
import { TeamRolesPanel } from "./components/team-roles-panel"
import { TeamStats, type TeamStatsData } from "./components/team-stats"

import type {
  InviteTeamMemberInput,
  TeamFilters as TeamFiltersValue,
  TeamMember,
  TeamMemberAction,
  TeamTab,
} from "./types/team.types"

export function TeamOverview() {
  const [members, setMembers] = useState<TeamMember[]>(() => [
    ...TEAM_MEMBERS_MOCK,
  ])
  const [filters, setFilters] = useState<TeamFiltersValue>({
    ...DEFAULT_TEAM_FILTERS,
  })
  const [activeTab, setActiveTab] = useState<TeamTab>("members")
  const [feedback, setFeedback] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const filteredMembers = useMemo(() => {
    const query = filters.search.trim().toLowerCase()

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
      const matchesRole = !filters.role || member.role === filters.role
      const matchesStatus = !filters.status || member.status === filters.status

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [filters, members])

  const stats = useMemo<TeamStatsData>(() => {
    const nonPendingMembers = members.filter(
      (member) => member.status !== "pending"
    )

    return {
      totalMembers: nonPendingMembers.length,
      activeMembers: members.filter((member) => member.status === "active")
        .length,
      inactiveMembers: members.filter((member) => member.status === "inactive")
        .length,
      roleCount: TEAM_ROLE_OPTIONS.length,
      roleNames: TEAM_ROLE_OPTIONS.map((option) => option.label),
      activeThisWeek: members.filter(
        (member) => member.status === "active" && member.activeThisWeek
      ).length,
      pendingInvitations: members.filter(
        (member) => member.status === "pending"
      ).length,
    }
  }, [members])

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visibleMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize

    return filteredMembers.slice(start, start + pageSize)
  }, [currentPage, filteredMembers, pageSize])

  const handleFiltersChange = (nextFilters: TeamFiltersValue) => {
    setFilters(nextFilters)
    setPage(1)
  }

  const handleInvite = (input: InviteTeamMemberInput) => {
    const newMember: TeamMember = {
      id: `team_invite_${Date.now()}`,
      name: input.name,
      email: input.email,
      role: input.role,
      status: "pending",
      avatarUrl: null,
      joinedAt: null,
      lastActiveAt: null,
      activeThisWeek: false,
    }

    setMembers((current) => [newMember, ...current])
    setActiveTab("members")
    setFilters({ ...DEFAULT_TEAM_FILTERS })
    setPage(1)
    setFeedback(`Invitation sent to ${input.email} in demo mode.`)
  }

  const handleMemberAction = (member: TeamMember, action: TeamMemberAction) => {
    if (action === "deactivate") {
      setMembers((current) =>
        current.map((item) =>
          item.id === member.id
            ? { ...item, status: "inactive", activeThisWeek: false }
            : item
        )
      )
      setFeedback(`${member.name} was deactivated.`)
      return
    }

    if (action === "reactivate") {
      setMembers((current) =>
        current.map((item) =>
          item.id === member.id
            ? { ...item, status: "active", activeThisWeek: true }
            : item
        )
      )
      setFeedback(`${member.name} was reactivated.`)
      return
    }

    if (action === "cancel_invitation" || action === "remove") {
      setMembers((current) => current.filter((item) => item.id !== member.id))
      setFeedback(
        action === "cancel_invitation"
          ? `Invitation for ${member.name} was cancelled.`
          : `${member.name} was removed from the team.`
      )
      return
    }

    if (action === "resend_invitation") {
      setFeedback(`Invitation resent to ${member.email}.`)
      return
    }

    setFeedback(
      action === "edit"
        ? `${member.name}'s member editor is ready for backend integration.`
        : `${member.name}'s profile view is ready for backend integration.`
    )
  }

  return (
    <div className="min-h-full space-y-8 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Team"
        description="Manage coaches, admins, and team access from one place."
        actions={<InviteTeamMemberDialog onInvite={handleInvite} />}
      />

      <TeamStats data={stats} />

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <UsersRound aria-hidden="true" className="size-4.5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Team workspace
            </h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Review access, roles, and recent changes across your team.
            </p>
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground">
          Demo mode · Backend ready
        </span>
      </div>

      {feedback && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-lg border border-gold/20 bg-gold/5 px-3 py-2 text-xs text-foreground"
        >
          <span>{feedback}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setFeedback(null)}
            className="h-7 px-2 text-[10px] text-muted-foreground"
          >
            Dismiss
          </Button>
        </div>
      )}

      <Tabs
        value={activeTab}
        onValueChange={(nextValue) => {
          if (
            nextValue === "members" ||
            nextValue === "roles" ||
            nextValue === "activity"
          ) {
            setActiveTab(nextValue)
          }
        }}
        className="w-full min-w-0"
      >
        <nav
          aria-label="Team sections"
          className="w-full min-w-0 border-b border-border"
        >
          <div className="scrollbar-hidden w-full overflow-x-auto overflow-y-hidden overscroll-x-contain">
            <TabsList
              variant="line"
              className="inline-flex h-auto w-max min-w-full items-stretch justify-start gap-1 rounded-none bg-transparent p-0 shadow-none"
            >
              <TabsTrigger
                value="members"
                className={cn(
                  "relative inline-flex h-10 shrink-0 items-center justify-center gap-1.5",
                  "rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2",
                  "text-[11px] font-medium whitespace-nowrap text-muted-foreground shadow-none",
                  "transition-colors hover:bg-muted/40 hover:text-foreground",
                  "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset",
                  "data-[active]:border-gold data-[active]:bg-transparent data-[active]:text-gold data-[active]:shadow-none",
                  "data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold data-[state=active]:shadow-none",
                  activeTab === "members" && "border-gold text-gold"
                )}
              >
                <UsersRound aria-hidden="true" className="size-3.5" />
                Members
                <span className="inline-flex min-w-5 items-center justify-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] leading-none font-semibold tabular-nums">
                  {members.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="roles"
                className={cn(
                  "relative inline-flex h-10 shrink-0 items-center justify-center gap-1.5",
                  "rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2",
                  "text-[11px] font-medium whitespace-nowrap text-muted-foreground shadow-none",
                  "transition-colors hover:bg-muted/40 hover:text-foreground",
                  "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset",
                  "data-[active]:border-gold data-[active]:bg-transparent data-[active]:text-gold data-[active]:shadow-none",
                  "data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold data-[state=active]:shadow-none",
                  activeTab === "roles" && "border-gold text-gold"
                )}
              >
                <ShieldCheck aria-hidden="true" className="size-3.5" />
                Roles & Permissions
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className={cn(
                  "relative inline-flex h-10 shrink-0 items-center justify-center gap-1.5",
                  "rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2",
                  "text-[11px] font-medium whitespace-nowrap text-muted-foreground shadow-none",
                  "transition-colors hover:bg-muted/40 hover:text-foreground",
                  "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset",
                  "data-[active]:border-gold data-[active]:bg-transparent data-[active]:text-gold data-[active]:shadow-none",
                  "data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:text-gold data-[state=active]:shadow-none",
                  activeTab === "activity" && "border-gold text-gold"
                )}
              >
                <Activity aria-hidden="true" className="size-3.5" />
                Activity Log
              </TabsTrigger>
            </TabsList>
          </div>
        </nav>

        <TabsContent value="members" className="mt-5 space-y-4">
          <TeamFilters value={filters} onChange={handleFiltersChange} />
          <div className="space-y-3">
            <TeamMembersTable
              members={visibleMembers}
              onAction={handleMemberAction}
            />
            <BookingTablePagination
              pagination={{
                page: currentPage,
                pageSize,
                totalItems: filteredMembers.length,
                totalPages,
              }}
              onPageChange={setPage}
              onPageSizeChange={(nextPageSize) => {
                setPageSize(nextPageSize)
                setPage(1)
              }}
              pageSizeOptions={[5, 10, 20]}
              itemLabel="members"
            />
          </div>
        </TabsContent>

        <TabsContent value="roles" className="mt-5">
          <TeamRolesPanel members={members} />
        </TabsContent>

        <TabsContent value="activity" className="mt-5">
          <TeamActivityPanel activity={TEAM_ACTIVITY_LOG_MOCK} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TeamOverview
