import type { TeamMemberRole, TeamRoleDefinition } from "../types/team.types"

export const TEAM_ROLE_OPTIONS: readonly {
  value: TeamMemberRole
  label: string
}[] = [
  { value: "admin", label: "Admin" },
  { value: "coach", label: "Coach" },
]

export const TEAM_ROLE_CONFIG: Record<TeamMemberRole, TeamRoleDefinition> = {
  admin: {
    id: "admin",
    name: "Admin",
    description:
      "Full access to club operations, settings, and team management.",
    permissions: [
      "Manage team members",
      "Manage channels and integrations",
      "View analytics and reports",
      "Manage bookings and leads",
    ],
  },
  coach: {
    id: "coach",
    name: "Coach",
    description:
      "Manage assigned conversations, leads, bookings, and sessions.",
    permissions: [
      "View assigned leads",
      "Manage bookings and attendance",
      "Reply to conversations",
      "View personal schedule",
    ],
  },
}

export function getTeamRoleLabel(role: TeamMemberRole): string {
  return TEAM_ROLE_CONFIG[role].name
}
