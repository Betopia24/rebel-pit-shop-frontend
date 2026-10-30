"use client"

import { useState, useSyncExternalStore } from "react"

import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  MessageSquareText,
  NotebookPen,
  RefreshCw,
  Users,
  X,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"

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

import { Skeleton } from "@/components/ui/skeleton"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

import { BookingStatusBadge } from "../shared/booking-status-badge"

import { BookingDetailsTab } from "./tabs/booking-details-tab"

import { BookingAttendeesTab } from "./tabs/booking-attendees-tab"

import { BookingNotesTab } from "./tabs/booking-notes-tab"

import type { BookingNoteInput } from "./tabs/booking-notes-tab"

import { BookingMessagesTab } from "./tabs/booking-messages-tab"

import type {
  Booking,
  BookingAction,
  BookingId,
} from "../../types/booking.types"

import type {
  BookingDetails,
  BookingDetailsTabId,
  BookingNote,
  BookingAttendee,
} from "../../types/booking-details.types"

export interface BookingDetailsPanelProps {
  booking: Booking | null
  details?: BookingDetails | null
  open: boolean
  onClose: () => void
  onAction?: (bookingId: BookingId, action: BookingAction) => void
  onReschedule?: (bookingId: BookingId, input: BookingRescheduleInput) => void
  activeTab?: BookingDetailsTabId
  onTabChange?: (tab: BookingDetailsTabId) => void
  onViewLead?: () => void
  leadHref?: string | null
  canCheckIn?: boolean
  onCheckIn?: (attendeeId: BookingAttendee["id"]) => void
  checkingInIds?: readonly BookingAttendee["id"][]
  canAddNote?: boolean
  canCreateCustomerVisibleNotes?: boolean
  onAddNote?: (input: BookingNoteInput) => void
  onUpdateNote?: (noteId: BookingNote["id"], input: BookingNoteInput) => void
  onDeleteNote?: (noteId: BookingNote["id"]) => void
  isAddingNote?: boolean
  updatingNoteIds?: readonly BookingNote["id"][]
  deletingNoteIds?: readonly BookingNote["id"][]
  onOpenInbox?: (conversationId: string) => void
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  disabled?: boolean
  showStatusHistory?: boolean
  className?: string
}

export interface BookingRescheduleInput {
  date: string
  time: string
  durationMinutes: number
}

/* ============================================================
   TAB CONFIGURATION
============================================================ */

interface BookingDetailsTabConfig {
  value: BookingDetailsTabId
  label: string
  icon: LucideIcon
}

const BOOKING_DETAILS_TABS = [
  {
    value: "details",
    label: "Details",
    icon: CalendarClock,
  },
  {
    value: "attendees",
    label: "Attendees",
    icon: Users,
  },
  {
    value: "notes",
    label: "Notes",
    icon: NotebookPen,
  },
  {
    value: "messages",
    label: "Messages",
    icon: MessageSquareText,
  },
] as const satisfies readonly BookingDetailsTabConfig[]

/* ============================================================
   RESPONSIVE DETECTION
============================================================ */

/**
 * Tailwind's xl breakpoint is 1280px.
 *
 * Avoid mounting an open mobile Sheet
 * on desktop, where a hidden Sheet could
 * otherwise leave an active overlay or
 * scroll lock.
 */

const MOBILE_QUERY = "(max-width: 1279px)"

function subscribeMobile(callback: () => void): () => void {
  const query = window.matchMedia(MOBILE_QUERY)

  query.addEventListener("change", callback)

  return () => {
    query.removeEventListener("change", callback)
  }
}

function getMobileSnapshot(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches
}

function getServerMobileSnapshot(): boolean {
  return false
}

function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot
  )
}

/* ============================================================
   FORMATTERS
============================================================ */

function formatBookedAt(value: string, timezone: string): string {
  const date = new Date(value)

  if (!Number.isFinite(date.getTime())) {
    return "Date unavailable"
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    }).format(date)
  } catch {
    return "Date unavailable"
  }
}

function formatCount(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "0"
  }

  return new Intl.NumberFormat("en-US").format(Math.trunc(value))
}

/* ============================================================
   LOADING SKELETON
============================================================ */

function BookingDetailsSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-5 p-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-52" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-44" />
        </div>
      </div>

      <Skeleton className="h-px w-full" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />

        <div className="flex items-center gap-3">
          <Skeleton className="size-14 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex justify-between gap-3">
            <Skeleton className="h-3 w-18" />
            <Skeleton className="h-3 w-36" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-16 rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-px w-full" />

      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  )
}

/* ============================================================
   ERROR STATE
============================================================ */

function BookingDetailsError({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-0 flex-1 flex-col",
        "items-center justify-center",
        "gap-3 px-6 py-10 text-center"
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-5 text-destructive" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-foreground">
          Unable to load booking details
        </h3>

        <p className="max-w-64 text-[11px] leading-relaxed text-muted-foreground">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="h-8 gap-1.5 text-[11px]"
        >
          <RefreshCw className="size-3.5" />
          Try Again
        </Button>
      )}
    </div>
  )
}

/* ============================================================
   PANEL HEADER
============================================================ */

interface BookingDetailsHeaderProps {
  booking: Booking | null

  timezone: string

  onClose: () => void

  showCloseButton: boolean
}

function BookingDetailsHeader({
  booking,
  timezone,
  onClose,
  showCloseButton,
}: BookingDetailsHeaderProps) {
  return (
    <header
      className={cn(
        "flex shrink-0 items-start",
        "justify-between gap-3",
        "border-b border-border",
        "bg-card px-4 py-3"
      )}
    >
      <div className="min-w-0 space-y-1">
        <h2 className="truncate text-sm font-semibold text-foreground">
          {booking ? "Booking Details" : "Booking Details"}
        </h2>

        {booking ? (
          <div className="space-y-0.5">
            <p className="truncate text-[11px] font-medium text-foreground">
              {booking.reference}
            </p>

            <p className="text-[10px] text-muted-foreground">
              Booked {formatBookedAt(booking.createdAt, timezone)}
            </p>
          </div>
        ) : (
          <p className="text-[10px] text-muted-foreground">Select a booking</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {booking && <BookingStatusBadge status={booking.status} size="sm" />}

        {showCloseButton && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close booking details"
            className="size-7 rounded-md"
          >
            <X aria-hidden="true" className="size-4" />
          </Button>
        )}
      </div>
    </header>
  )
}

/* ============================================================
   PANEL TABS
============================================================ */

interface BookingPanelTabsProps {
  details: BookingDetails

  activeTab: BookingDetailsTabId

  onTabChange: (tab: BookingDetailsTabId) => void

  props: BookingDetailsPanelProps
}

function BookingPanelTabs({
  details,
  activeTab,
  onTabChange,
  props,
}: BookingPanelTabsProps) {
  const {
    onViewLead,
    onReschedule,
    leadHref,
    canCheckIn = false,
    onCheckIn,
    checkingInIds = [],
    canAddNote = false,
    canCreateCustomerVisibleNotes = false,
    onAddNote,
    onUpdateNote,
    onDeleteNote,
    isAddingNote = false,
    updatingNoteIds = [],
    deletingNoteIds = [],
    onOpenInbox,
    disabled = false,
    showStatusHistory = false,
  } = props

  const attendeeCount = details.attendees.totalCount

  const notesCount = details.notes.totalCount

  const messagesCount = details.messages.totalCount

  const getTabCount = (tab: BookingDetailsTabId): number | null => {
    switch (tab) {
      case "attendees":
        return attendeeCount

      case "notes":
        return notesCount

      case "messages":
        return messagesCount

      case "details":
        return null
    }
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(nextValue) => {
        const next = BOOKING_DETAILS_TABS.find((tab) => tab.value === nextValue)

        if (next) {
          onTabChange(next.value)
        }
      }}
      className="flex min-h-0 min-w-0 flex-1 flex-col gap-0"
    >
      {/* ======================================================
          TAB NAVIGATION
      ====================================================== */}

      <div className="scrollbar-hidden shrink-0 overflow-x-auto overflow-y-hidden border-b border-border bg-card px-2">
        <TabsList
          className={cn(
            "flex h-11 w-max min-w-full items-stretch justify-start gap-1",
            "rounded-none",
            "bg-card p-0"
          )}
        >
          {BOOKING_DETAILS_TABS.map((tab) => {
            const Icon = tab.icon

            const count = getTabCount(tab.value)

            const selected = activeTab === tab.value

            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "relative flex h-11 min-w-fit flex-none shrink-0",
                  "items-center justify-center",
                  "gap-1.5 rounded-none",
                  "border-b-2 border-transparent",
                  "bg-transparent px-1",
                  "text-[11px] font-medium",
                  "text-muted-foreground",
                  "whitespace-nowrap",
                  "shadow-none transition-colors",
                  "hover:text-foreground",
                  "data-[active]:border-transparent",
                  "data-[active]:bg-transparent",
                  "data-[active]:text-gold",
                  "data-[active]:border-b-gold",
                  "data-[state=active]:border-transparent",
                  "data-[state=active]:bg-transparent",
                  "data-[state=active]:text-gold",
                  "data-[state=active]:border-b-gold",
                  selected && "border-transparent border-b-gold text-gold",
                  "after:bottom-0"
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                  strokeWidth={1.8}
                />

                <span>{tab.label}</span>

                {count !== null && count > 0 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 rounded-md",
                      "px-1 py-0.5",
                      "text-[9px] leading-none",
                      "font-semibold tabular-nums",
                      selected
                        ? "bg-gold-10 text-gold"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {formatCount(count)}
                  </span>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </div>

      {/* ======================================================
          SCROLLABLE TAB CONTENT
      ====================================================== */}

      <div
        className={cn(
          "min-h-0 min-w-0 flex-1",
          "scrollbar-hidden overflow-y-auto overscroll-contain",
          "px-4 py-4"
        )}
      >
        <TabsContent value="details" className="mt-0 min-w-0 outline-none">
          <BookingDetailsTab
            details={details}
            onViewLead={onViewLead}
            leadHref={leadHref}
            showStatusHistory={showStatusHistory}
            showSessionAvailability
          />
        </TabsContent>

        <TabsContent value="attendees" className="mt-0 min-w-0 outline-none">
          <BookingAttendeesTab
            booking={details.booking}
            data={details.attendees}
            availability={details.details.classInformation.availability}
            canCheckIn={canCheckIn}
            onCheckIn={onCheckIn}
            checkingInIds={checkingInIds}
            disabled={disabled}
          />
        </TabsContent>

        <TabsContent value="notes" className="mt-0 min-w-0 outline-none">
          <BookingNotesTab
            data={details.notes}
            timezone={details.timezone}
            canAddNote={canAddNote}
            canCreateCustomerVisibleNotes={canCreateCustomerVisibleNotes}
            onAddNote={onAddNote}
            onUpdateNote={onUpdateNote}
            onDeleteNote={onDeleteNote}
            isAddingNote={isAddingNote}
            updatingNoteIds={updatingNoteIds}
            deletingNoteIds={deletingNoteIds}
            disabled={disabled}
          />
        </TabsContent>

        <TabsContent value="messages" className="mt-0 min-w-0 outline-none">
          <BookingMessagesTab
            data={details.messages}
            timezone={details.timezone}
            onOpenInbox={onOpenInbox}
            disabled={disabled}
          />
        </TabsContent>
      </div>
    </Tabs>
  )
}

/* ============================================================
   FOOTER ACTIONS
============================================================ */

function getScheduleFieldValues(booking: Booking): BookingRescheduleInput {
  const startsAt = new Date(booking.schedule.startsAt)
  const endsAt = new Date(booking.schedule.endsAt)
  const timezone = booking.schedule.timezone || "UTC"

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(startsAt)

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  ) as Record<string, string>

  const durationMinutes = Math.round(
    (endsAt.getTime() - startsAt.getTime()) / 60_000
  )

  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
    durationMinutes: Number.isFinite(durationMinutes)
      ? Math.max(15, durationMinutes)
      : 60,
  }
}

interface BookingPanelFooterProps {
  details: BookingDetails

  disabled: boolean

  onAction?: BookingDetailsPanelProps["onAction"]

  onReschedule?: BookingDetailsPanelProps["onReschedule"]
}

function BookingPanelFooter({
  details,
  disabled,
  onAction,
  onReschedule,
}: BookingPanelFooterProps) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false)
  const [schedule, setSchedule] = useState<BookingRescheduleInput>(() =>
    getScheduleFieldValues(details.booking)
  )

  const bookingId = details.booking.id

  const isActionEnabled = (action: BookingAction): boolean => {
    if (disabled || !onAction) {
      return false
    }

    return details.actions.items.some(
      (item) => item.action === action && item.enabled
    )
  }

  const handleAction = (action: BookingAction) => {
    if (!isActionEnabled(action)) {
      return
    }

    onAction?.(bookingId, action)
  }

  const canCancel = isActionEnabled("cancel")

  const canConfirm = isActionEnabled("confirm")

  const canReschedule = isActionEnabled("reschedule")

  const canSendMessage = isActionEnabled("send_message")

  return (
    <footer
      className={cn(
        "shrink-0 space-y-2",
        "border-t border-border",
        "bg-card p-3"
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        {canConfirm && (
          <Button
            type="button"
            size="sm"
            onClick={() => setConfirmDialogOpen(true)}
            className="col-span-2 h-9 gap-1.5 rounded-md bg-emerald-600 text-[11px] font-semibold text-white shadow-sm shadow-emerald-950/30 hover:bg-emerald-500"
          >
            <CheckCircle2 aria-hidden="true" className="size-3.5" />
            Confirm Booking
          </Button>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canCancel}
          onClick={() => {
            setCancelDialogOpen(true)
          }}
          className={cn(
            "h-8 min-w-0 rounded-md",
            "border-destructive/40 bg-destructive px-2",
            "text-[11px] font-medium",
            "text-destructive-foreground",
            canCancel && "hover:bg-destructive/90"
          )}
        >
          Cancel Booking
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canReschedule}
          onClick={() => {
            setSchedule(getScheduleFieldValues(details.booking))
            setRescheduleDialogOpen(true)
          }}
          className={cn(
            "h-8 min-w-0 gap-1.5",
            "rounded-md border-border",
            "px-2 text-[11px]",
            "font-medium"
          )}
        >
          <CalendarClock aria-hidden="true" className="size-3.5 shrink-0" />
          Reschedule
        </Button>
      </div>

      <Button
        type="button"
        size="sm"
        disabled={!canSendMessage}
        onClick={() => {
          handleAction("send_message")
        }}
        className={cn(
          "h-8 w-full gap-2",
          "rounded-md text-[11px]",
          "font-semibold"
        )}
      >
        <MessageSquareText aria-hidden="true" className="size-3.5" />
        Send Message
      </Button>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="max-w-sm bg-card">
          <DialogHeader>
            <DialogTitle>Confirm this booking?</DialogTitle>
            <DialogDescription>
              This will confirm {details.booking.customer.name}&apos;s booking
              and reserve their spot in the session.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Keep Pending
            </Button>
            <Button
              type="button"
              onClick={() => {
                setConfirmDialogOpen(false)
                handleAction("confirm")
              }}
              className="bg-emerald-600 text-white shadow-sm shadow-emerald-950/30 hover:bg-emerald-500"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={rescheduleDialogOpen}
        onOpenChange={setRescheduleDialogOpen}
      >
        <DialogContent className="max-w-sm bg-card">
          <DialogHeader>
            <DialogTitle>Reschedule booking</DialogTitle>
            <DialogDescription>
              Choose a new date and time for {details.booking.customer.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reschedule-date">Date</Label>
              <Input
                id="reschedule-date"
                type="date"
                value={schedule.date}
                onChange={(event) =>
                  setSchedule((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reschedule-time">Start time</Label>
              <Input
                id="reschedule-time"
                type="time"
                value={schedule.time}
                onChange={(event) =>
                  setSchedule((current) => ({
                    ...current,
                    time: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="reschedule-duration">Duration (minutes)</Label>
              <Input
                id="reschedule-duration"
                type="number"
                min={15}
                step={15}
                value={schedule.durationMinutes}
                onChange={(event) =>
                  setSchedule((current) => ({
                    ...current,
                    durationMinutes: Math.max(
                      15,
                      Number(event.target.value) || 15
                    ),
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRescheduleDialogOpen(false)}
            >
              Keep Current Time
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (!schedule.date || !schedule.time || !onReschedule) return

                onReschedule(bookingId, schedule)
                setRescheduleDialogOpen(false)
              }}
              className="bg-gold text-black hover:bg-gold/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="max-w-sm bg-card">
          <DialogHeader>
            <DialogTitle>Cancel this booking?</DialogTitle>
            <DialogDescription>
              This will mark the booking as cancelled. You can’t undo this
              action in the current demo flow.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
            >
              Keep Booking
            </Button>
            <Button
              type="button"
              onClick={() => {
                setCancelDialogOpen(false)
                handleAction("cancel")
              }}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            >
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  )
}

/* ============================================================
   PANEL CONTENT
============================================================ */

interface BookingPanelContentProps {
  panelProps: BookingDetailsPanelProps

  activeTab: BookingDetailsTabId

  onTabChange: (tab: BookingDetailsTabId) => void

  showCloseButton: boolean
}

function BookingPanelContent({
  panelProps,
  activeTab,
  onTabChange,
  showCloseButton,
}: BookingPanelContentProps) {
  const {
    booking,
    details = null,
    onClose,
    onAction,
    onReschedule,
    isLoading = false,
    error = null,
    onRetry,
    disabled = false,
  } = panelProps

  const resolvedBooking = details?.booking ?? booking

  const timezone =
    details?.timezone ?? resolvedBooking?.schedule.timezone ?? "UTC"

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full",
        "flex-col overflow-hidden bg-card"
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <BookingDetailsHeader
        booking={resolvedBooking}
        timezone={timezone}
        onClose={onClose}
        showCloseButton={showCloseButton}
      />

      {/* ======================================================
          BODY
      ====================================================== */}

      {isLoading ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <BookingDetailsSkeleton />
        </div>
      ) : error ? (
        <BookingDetailsError message={error} onRetry={onRetry} />
      ) : details && (!booking || details.booking.id === booking.id) ? (
        <>
          <BookingPanelTabs
            details={details}
            activeTab={activeTab}
            onTabChange={onTabChange}
            props={panelProps}
          />

          <BookingPanelFooter
            details={details}
            disabled={disabled}
            onAction={onAction}
            onReschedule={onReschedule}
          />
        </>
      ) : resolvedBooking ? (
        <div
          role="status"
          className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-6 text-center"
        >
          <CalendarClock className="size-6 text-muted-foreground" />

          <p className="text-xs font-medium text-foreground">
            Booking information is not available
          </p>

          <p className="text-[11px] text-muted-foreground">
            Detailed information for this booking has not been loaded.
          </p>

          {onRetry && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="h-8 text-[11px]"
            >
              <RefreshCw className="size-3.5" />
              Reload Details
            </Button>
          )}
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 text-center">
          <CalendarClock className="mb-3 size-6 text-muted-foreground" />

          <p className="text-xs text-muted-foreground">
            Select a booking to view details.
          </p>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   MAIN PANEL
============================================================ */

export function BookingDetailsPanel(props: BookingDetailsPanelProps) {
  const {
    booking,
    open,
    onClose,
    activeTab: controlledTab,
    onTabChange,
    className,
  } = props

  const isMobile = useIsMobile()

  const selectedBookingId = booking?.id ?? props.details?.id ?? null

  const [internalTabState, setInternalTabState] = useState<{
    bookingId: BookingId | null
    tab: BookingDetailsTabId
  }>({
    bookingId: null,
    tab: "details",
  })

  const activeTab =
    controlledTab ??
    (internalTabState.bookingId === selectedBookingId
      ? internalTabState.tab
      : "details")

  const handleTabChange = (nextTab: BookingDetailsTabId) => {
    if (controlledTab === undefined) {
      setInternalTabState({
        bookingId: selectedBookingId,
        tab: nextTab,
      })
    }

    onTabChange?.(nextTab)
  }

  const panelContent = (
    <BookingPanelContent
      key={selectedBookingId ?? "unselected"}
      panelProps={props}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      showCloseButton
    />
  )

  return (
    <>
      {/* ======================================================
          DESKTOP INLINE PANEL
      ====================================================== */}

      {open && (
        <aside
          aria-label="Selected booking details"
          className={cn(
            "hidden h-full min-h-0 min-w-0",
            "w-95 shrink-0",
            "overflow-hidden",
            "border-l border-border",
            "bg-card xl:flex",
            className
          )}
        >
          {!isMobile && panelContent}
        </aside>
      )}

      {/* ======================================================
          MOBILE SHEET
      ====================================================== */}

      {isMobile && (
        <Sheet
          open={open}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              onClose()
            }
          }}
        >
          <SheetContent
            side="right"
            showCloseButton={false}
            className={cn(
              "flex h-dvh w-full",
              "max-w-full flex-col",
              "gap-0 overflow-hidden",
              "border-l border-border",
              "bg-card p-0",
              "sm:max-w-110"
            )}
          >
            <SheetTitle className="sr-only">Booking Details</SheetTitle>

            <SheetDescription className="sr-only">
              View booking information, attendees, notes, messages, and
              available actions.
            </SheetDescription>

            <BookingPanelContent
              key={selectedBookingId ?? "unselected"}
              panelProps={props}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              showCloseButton
            />
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default BookingDetailsPanel
