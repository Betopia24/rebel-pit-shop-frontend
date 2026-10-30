"use client"

import { useState, type FormEvent } from "react"

import { MailPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { TEAM_ROLE_OPTIONS } from "../config/team-role.config"

import type { InviteTeamMemberInput, TeamMemberRole } from "../types/team.types"

const FIELD_CLASS_NAME =
  "h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30"

interface InviteTeamMemberDialogProps {
  onInvite: (input: InviteTeamMemberInput) => void
}

export function InviteTeamMemberDialog({
  onInvite,
}: InviteTeamMemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<TeamMemberRole>("coach")
  const [message, setMessage] = useState("")

  const resetForm = () => {
    setName("")
    setEmail("")
    setRole("coach")
    setMessage("")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !email.trim()) return

    onInvite({
      name: name.trim(),
      email: email.trim(),
      role,
      message: message.trim(),
    })
    setOpen(false)
    resetForm()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) resetForm()
      }}
    >
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="h-9 gap-2 bg-gold text-background hover:bg-gold-hover"
      >
        <MailPlus aria-hidden="true" className="size-4" />
        Invite Team Member
      </Button>

      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-lg overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle>Invite a team member</DialogTitle>
          <DialogDescription>
            Send an invitation link so they can join the Rebel Boxing Club
            workspace.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="team-member-name">Full name</Label>
              <Input
                id="team-member-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Jordan Lee"
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="team-member-email">Email address</Label>
              <Input
                id="team-member-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="team-member-role">Role</Label>
              <select
                id="team-member-role"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as TeamMemberRole)
                }
                className={FIELD_CLASS_NAME}
              >
                {TEAM_ROLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] leading-4 text-muted-foreground">
                {role === "admin"
                  ? "Admins can manage the workspace, settings, and team access."
                  : "Coaches can manage assigned leads, bookings, and conversations."}
              </p>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="team-member-message">
                Personal message{" "}
                <span className="font-normal text-muted-foreground">
                  (Optional)
                </span>
              </Label>
              <Textarea
                id="team-member-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Add a short note for the invitee..."
                maxLength={300}
                className="min-h-24 resize-y text-sm"
              />
            </div>
          </div>

          <DialogFooter className="-mx-4 -mb-4 rounded-b-xl border-t border-border bg-muted/20 px-4 py-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-gold text-background hover:bg-gold-hover"
            >
              <MailPlus aria-hidden="true" className="size-3.5" />
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteTeamMemberDialog
