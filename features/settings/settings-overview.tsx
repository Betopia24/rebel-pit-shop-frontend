"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"

import type { LucideIcon } from "lucide-react"
import {
  Check,
  ChevronRight,
  Link2,
  LockKeyhole,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"

type SettingsSectionId =
  | "profile"
  | "security"

interface SettingsSection {
  id: SettingsSectionId
  label: string
  description: string
  icon: LucideIcon
}

interface SettingsState {
  fullName: string
  email: string
  phone: string
  timezone: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const SETTINGS_SECTIONS: readonly SettingsSection[] = [
  {
    id: "profile",
    label: "My profile",
    description: "Personal details and account preferences",
    icon: UserRound,
  },
  {
    id: "security",
    label: "Security",
    description: "Update your account password",
    icon: LockKeyhole,
  },
] as const

const INITIAL_SETTINGS: SettingsState = {
  fullName: "Rebel Admin",
  email: "admin@rebelboxing.com",
  phone: "+1 (312) 555-0148",
  timezone: "America/Chicago",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="space-y-1.5">
      <span className="block text-[11px] font-medium text-foreground">
        {label}
      </span>
      {children}
      {hint && (
        <span className="block text-[10px] leading-4 text-muted-foreground">
          {hint}
        </span>
      )}
    </label>
  )
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  return (
    <Field label={label}>
      <Select value={value} onValueChange={(nextValue) => nextValue && onChange(nextValue)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-start gap-3 border-b border-border px-4 py-4 sm:px-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
          <Icon aria-hidden="true" className="size-4.5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  )
}

function SaveButton() {
  return (
    <div className="flex justify-end border-t border-border pt-4">
      <Button type="submit" size="sm" className="h-8 gap-1.5 text-[11px]">
        <Check aria-hidden="true" className="size-3.5" />
        Save changes
      </Button>
    </div>
  )
}

export function SettingsOverview() {
  const [activeSection, setActiveSection] =
    useState<SettingsSectionId>("profile")
  const [settings, setSettings] = useState<SettingsState>(INITIAL_SETTINGS)
  const [feedback, setFeedback] = useState<string | null>(null)

  function updateSetting<Key extends keyof SettingsState>(
    key: Key,
    value: SettingsState[Key]
  ) {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  function saveSection(label: string) {
    setFeedback(`${label} settings saved in demo mode.`)
  }

  function renderSection() {
    switch (activeSection) {
      case "profile":
        return (
          <SectionCard
            icon={UserRound}
            title="My profile"
            description="Keep your administrator profile and contact details up to date."
          >
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault()
                saveSection("Profile")
              }}
            >
              <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/30 p-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-sm font-semibold text-gold">
                  RA
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground">
                    Administrator account
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Admin access · Last active a few minutes ago
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" className="h-7 text-[10px]">
                  Change photo
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <Input
                    value={settings.fullName}
                    onChange={(event) => updateSetting("fullName", event.target.value)}
                  />
                </Field>
                <Field label="Work email" hint="Used for sign-in and account alerts.">
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(event) => updateSetting("email", event.target.value)}
                  />
                </Field>
                <Field label="Phone number">
                  <Input
                    value={settings.phone}
                    onChange={(event) => updateSetting("phone", event.target.value)}
                  />
                </Field>
                <SelectField
                  label="Personal timezone"
                  value={settings.timezone}
                  onChange={(value) => updateSetting("timezone", value)}
                  options={[
                    { value: "America/Chicago", label: "Central Time (Chicago)" },
                    { value: "America/New_York", label: "Eastern Time (New York)" },
                    { value: "America/Los_Angeles", label: "Pacific Time (Los Angeles)" },
                  ]}
                />
              </div>
              <SaveButton />
            </form>
          </SectionCard>
        )
      case "security":
        return (
          <SectionCard
            icon={LockKeyhole}
            title="Update password"
            description="Change the password you use to access the admin dashboard."
          >
            <form
              className="max-w-xl space-y-5"
              onSubmit={(event) => {
                event.preventDefault()
                saveSection("Password")
              }}
            >
              <Field label="Current password">
                <Input
                  type="password"
                  autoComplete="current-password"
                  value={settings.currentPassword}
                  onChange={(event) =>
                    updateSetting("currentPassword", event.target.value)
                  }
                />
              </Field>
              <Field label="New password">
                <Input
                  type="password"
                  autoComplete="new-password"
                  value={settings.newPassword}
                  onChange={(event) =>
                    updateSetting("newPassword", event.target.value)
                  }
                />
              </Field>
              <Field label="Confirm password">
                <Input
                  type="password"
                  autoComplete="new-password"
                  value={settings.confirmPassword}
                  onChange={(event) =>
                    updateSetting("confirmPassword", event.target.value)
                  }
                />
              </Field>
              <SaveButton />
            </form>
          </SectionCard>
        )
    }
  }

  return (
    <div className="space-y-4">
      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-lg border border-gold/20 bg-gold/5 px-3 py-2 text-xs text-foreground"
        >
          <Check aria-hidden="true" className="size-3.5 text-gold" />
          {feedback}
        </div>
      )}

      <div className="grid min-w-0 gap-5 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="h-fit rounded-xl border border-border bg-card p-2 lg:sticky lg:top-20">
          <div className="px-3 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
              Admin controls
            </p>
            <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
              Manage how the club runs behind the scenes.
            </p>
          </div>
          <nav aria-label="Settings sections" className="space-y-1">
            {SETTINGS_SECTIONS.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(section.id)
                    setFeedback(null)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors",
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium">{section.label}</span>
                    <span className="mt-0.5 block truncate text-[9px] text-current/60">
                      {section.description}
                    </span>
                  </span>
                  {isActive && <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />}
                </button>
              )
            })}
          </nav>
          <div className="mt-3 border-t border-border px-3 pt-3">
            <Link
              href="/channels-integrations"
              className="flex items-center gap-2 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Link2 aria-hidden="true" className="size-3.5 text-gold" />
              Manage connected channels
            </Link>
          </div>
        </aside>

        <main className="min-w-0">{renderSection()}</main>
      </div>
    </div>
  )
}

export default SettingsOverview
