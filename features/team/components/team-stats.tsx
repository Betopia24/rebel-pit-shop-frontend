import { Activity, MailClock, ShieldCheck, UsersRound } from "lucide-react"

import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import { cn } from "@/lib/utils"

export interface TeamStatsData {
  totalMembers: number
  activeMembers: number
  inactiveMembers: number
  roleCount: number
  roleNames: readonly string[]
  activeThisWeek: number
  pendingInvitations: number
}

interface TeamStatCardConfig {
  label: string
  icon: LucideIcon
  iconClassName: string
  iconBackgroundClassName: string
}

const TEAM_STAT_CONFIG: readonly TeamStatCardConfig[] = [
  {
    label: "Total Team Members",
    icon: UsersRound,
    iconClassName: "text-gold",
    iconBackgroundClassName: "bg-gold-10",
  },
  {
    label: "Roles",
    icon: ShieldCheck,
    iconClassName: "text-sky-400",
    iconBackgroundClassName: "bg-sky-400/10",
  },
  {
    label: "Active This Week",
    icon: Activity,
    iconClassName: "text-emerald-400",
    iconBackgroundClassName: "bg-emerald-400/10",
  },
  {
    label: "Pending Invitations",
    icon: MailClock,
    iconClassName: "text-amber-400",
    iconBackgroundClassName: "bg-amber-400/10",
  },
]

export function TeamStats({ data }: { data: TeamStatsData }) {
  const values = [
    data.totalMembers,
    data.roleCount,
    data.activeThisWeek,
    data.pendingInvitations,
  ]

  const descriptions = [
    `${data.activeMembers} active · ${data.inactiveMembers} inactive`,
    data.roleNames.join(" · "),
    "Active in the last 7 days",
    "Awaiting acceptance",
  ]

  return (
    <section
      aria-label="Team statistics"
      className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {TEAM_STAT_CONFIG.map((config, index) => {
        const Icon = config.icon

        return (
          <Card
            key={config.label}
            className="min-w-0 gap-0 rounded-xl border-border bg-card py-0 shadow-none"
          >
            <CardContent className="flex min-h-31 flex-col p-3.5 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 text-[11px] leading-4 font-medium text-muted-foreground">
                  {config.label}
                </p>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    config.iconBackgroundClassName
                  )}
                >
                  <Icon
                    className={cn("size-4", config.iconClassName)}
                    strokeWidth={1.8}
                  />
                </span>
              </div>

              <p className="mt-2 text-[27px] leading-none font-semibold tracking-tight text-foreground tabular-nums">
                {values[index]}
              </p>

              <p className="mt-auto pt-3 text-[10px] leading-4 text-muted-foreground">
                {descriptions[index]}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}

export default TeamStats
