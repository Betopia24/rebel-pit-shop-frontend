"use client"

import { useState } from "react"

import { BellRing, Mail, MessageSquareText } from "lucide-react"

import type { LucideIcon } from "lucide-react"

import { Switch } from "@/components/ui/switch"

import { cn } from "@/lib/utils"

interface PreferenceRowProps {
  icon: LucideIcon
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function PreferenceRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: PreferenceRowProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/30 px-3 py-3">
      <span
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
          checked ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"
        )}
      >
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-foreground">{title}</p>
          <Switch
            size="sm"
            checked={checked}
            onCheckedChange={onChange}
            aria-label={title}
          />
        </div>
        <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    inApp: true,
    emailDigest: false,
    bookingAlerts: true,
  })

  return (
    <aside className="min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">
          Notification preferences
        </h2>
        <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
          Choose how your team receives important workspace updates.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <PreferenceRow
          icon={BellRing}
          title="In-app notifications"
          description="Show alerts in your dashboard and notification center."
          checked={preferences.inApp}
          onChange={(checked) =>
            setPreferences((current) => ({ ...current, inApp: checked }))
          }
        />
        <PreferenceRow
          icon={Mail}
          title="Email digest"
          description="Receive a daily summary of unread activity."
          checked={preferences.emailDigest}
          onChange={(checked) =>
            setPreferences((current) => ({ ...current, emailDigest: checked }))
          }
        />
        <PreferenceRow
          icon={MessageSquareText}
          title="Booking alerts"
          description="Get notified when a booking needs attention."
          checked={preferences.bookingAlerts}
          onChange={(checked) =>
            setPreferences((current) => ({
              ...current,
              bookingAlerts: checked,
            }))
          }
        />
      </div>

      <p className="mt-4 border-t border-border pt-4 text-[10px] leading-4 text-muted-foreground">
        Preferences are shown in demo mode and will sync with your account after
        the backend is connected.
      </p>
    </aside>
  )
}

export default NotificationPreferences
