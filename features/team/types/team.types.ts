export type TeamMemberRole = "admin" | "coach"

export type TeamMemberStatus = "active" | "inactive" | "pending"

export type TeamTab = "members" | "roles" | "activity"

export type TeamMemberAction =
  | "view"
  | "edit"
  | "deactivate"
  | "reactivate"
  | "resend_invitation"
  | "cancel_invitation"
  | "remove"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: TeamMemberRole
  status: TeamMemberStatus
  avatarUrl: string | null
  joinedAt: string | null
  lastActiveAt: string | null
  activeThisWeek: boolean
}

export interface TeamFilters {
  search: string
  role: TeamMemberRole | null
  status: TeamMemberStatus | null
}

export interface InviteTeamMemberInput {
  name: string
  email: string
  role: TeamMemberRole
  message: string
}

export interface TeamRoleDefinition {
  id: TeamMemberRole
  name: string
  description: string
  permissions: readonly string[]
}

export interface TeamActivityLog {
  id: string
  actor: string
  action: string
  target: string
  timestamp: string
  tone: "gold" | "green" | "red" | "muted"
}
