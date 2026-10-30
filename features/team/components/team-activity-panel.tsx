import { Activity, CheckCircle2, Clock3, UserRoundX } from "lucide-react"

import { cn } from "@/lib/utils"

import type { TeamActivityLog } from "../types/team.types"

const TONE_CONFIG = {
  gold: { icon: Activity, className: "bg-gold/10 text-gold" },
  green: {
    icon: CheckCircle2,
    className: "bg-emerald-400/10 text-emerald-400",
  },
  red: { icon: UserRoundX, className: "bg-destructive/10 text-destructive" },
  muted: { icon: Clock3, className: "bg-muted text-muted-foreground" },
} as const

export function TeamActivityPanel({
  activity,
}: {
  activity: readonly TeamActivityLog[]
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-4 sm:px-5">
        <h2 className="text-sm font-semibold text-foreground">
          Recent activity
        </h2>
        <p className="mt-1 text-[11px] text-muted-foreground">
          A history of important team and access changes.
        </p>
      </div>

      <div className="divide-y divide-border">
        {activity.map((item) => {
          const config = TONE_CONFIG[item.tone]
          const Icon = config.icon

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 px-4 py-4 sm:px-5"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  config.className
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs leading-5 text-foreground">
                  <span className="font-semibold">{item.actor}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>{" "}
                  <span className="font-medium">{item.target}</span>
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {item.timestamp}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TeamActivityPanel
