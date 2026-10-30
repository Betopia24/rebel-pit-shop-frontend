import { Check, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { TEAM_ROLE_CONFIG } from "../config/team-role.config"

import type { TeamMember } from "../types/team.types"

export function TeamRolesPanel({
  members,
}: {
  members: readonly TeamMember[]
}) {
  const roles = Object.values(TEAM_ROLE_CONFIG)

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {roles.map((role) => {
        const count = members.filter(
          (member) => member.role === role.id && member.status !== "pending"
        ).length

        return (
          <article
            key={role.id}
            className="rounded-xl border border-border bg-card p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <ShieldCheck aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {role.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {count} {count === 1 ? "member" : "members"}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">
                {role.id === "admin" ? "Full access" : "Operational access"}
              </Badge>
            </div>

            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              {role.description}
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {role.permissions.map((permission) => (
                <div
                  key={permission}
                  className="flex items-start gap-2 text-[11px] text-foreground"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-3.5 shrink-0 text-emerald-400"
                  />
                  <span>{permission}</span>
                </div>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default TeamRolesPanel
