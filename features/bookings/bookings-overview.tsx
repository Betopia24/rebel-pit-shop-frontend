"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import { CheckCheck, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils"

import {
  BookingDetailsPanel,
  type BookingRescheduleInput,
} from "./components/details/booking-details-panel"
import {
  CreateBookingDialog,
  type CreateManualBookingInput,
} from "./components/create-booking-dialog"
import { BookingFiltersToolbar } from "./components/filters/booking-filters"
import { BookingTypeTabs } from "./components/filters/booking-type-tabs"
import { BookingStats } from "./components/shared/booking-stats"
import { BookingsTable } from "./components/table/bookings-table"
import { BookingTablePagination } from "./components/table/booking-pagination"

import {
  getBookingTabCounts,
  matchesBookingCategoryTab,
} from "./config/booking-types.config"

import {
  BOOKING_DETAILS_MOCK_TIMEZONE,
  createDefaultBookingDetails,
  getBookingDetailsMockById,
} from "./data/booking-details.mock"

import {
  BOOKING_CLASS_OPTIONS_MOCK,
  BOOKING_CUSTOMERS_MOCK,
  BOOKING_COACHES_MOCK,
  BOOKINGS_MOCK,
  BOOKING_STATISTICS_MOCK,
} from "./data/bookings.mock"

import type {
  Booking,
  BookingAction,
  BookingFilters,
  BookingId,
  BookingPagination,
  BookingSort,
  BookingStatus,
} from "./types/booking.types"

import type {
  BookingDetails,
  BookingDetailsTabId,
  BookingNote,
} from "./types/booking-details.types"

import { DEFAULT_BOOKING_FILTERS } from "./types/booking.types"

import type { BookingNoteInput } from "./components/details/tabs/booking-notes-tab"

const DEFAULT_SORT: BookingSort = {
  field: "startsAt",
  direction: "asc",
}

const DEFAULT_PAGE_SIZE = 10

const MANUAL_BOOKING_TYPE_CONFIG = {
  free_class: {
    category: "free_class",
    type: "free_class",
  },
  member: {
    category: "membership",
    type: "member",
  },
  personal_training: {
    category: "personal_training",
    type: "personal_training",
  },
  consultation: {
    category: "consultation",
    type: "consultation",
  },
} as const

const ROW_ACTIONS = [
  "view",
  "edit",
  "confirm",
  "reschedule",
  "send_message",
  "cancel",
] as const satisfies readonly BookingAction[]

const TERMINAL_STATUSES: readonly BookingStatus[] = [
  "completed",
  "cancelled",
  "no_show",
]

function isTerminalStatus(status: BookingStatus): boolean {
  return TERMINAL_STATUSES.includes(status)
}

function isActionEnabled(booking: Booking, action: BookingAction): boolean {
  switch (action) {
    case "view":
      return true
    case "edit":
    case "cancel":
    case "reschedule":
      return !isTerminalStatus(booking.status)
    case "confirm":
      return booking.status === "pending" || booking.status === "waitlist"
    case "mark_completed":
    case "mark_no_show":
      return booking.status === "confirmed"
    case "send_message":
      return true
    case "view_lead":
      return booking.leadId !== null
  }
}

function parseFilterDate(
  value: string | null,
  endOfDay = false
): number | null {
  if (!value) return null

  const date = new Date(`${value}T${endOfDay ? "23:59:59.999" : "00:00:00"}`)

  return Number.isFinite(date.getTime()) ? date.getTime() : null
}

function matchesDateRange(booking: Booking, filters: BookingFilters): boolean {
  const from = parseFilterDate(filters.dateRange.from)
  const to = parseFilterDate(filters.dateRange.to, true)
  const startsAt = Date.parse(booking.schedule.startsAt)

  if (!Number.isFinite(startsAt)) return false
  if (from !== null && startsAt < from) return false
  if (to !== null && startsAt > to) return false

  return true
}

function matchesBookingFilters(
  booking: Booking,
  filters: BookingFilters,
  includeTab = true
): boolean {
  if (includeTab && !matchesBookingCategoryTab(booking, filters.tab)) {
    return false
  }

  if (filters.status !== null && booking.status !== filters.status) {
    return false
  }

  if (filters.classId !== null && booking.bookingClass.id !== filters.classId) {
    return false
  }

  if (filters.coachId !== null && booking.coach?.id !== filters.coachId) {
    return false
  }

  if (filters.source !== null && booking.source.channel !== filters.source) {
    return false
  }

  if (!matchesDateRange(booking, filters)) {
    return false
  }

  const query = filters.search.trim().toLowerCase()

  if (!query) return true

  return [
    booking.reference,
    booking.customer.name,
    booking.customer.phone,
    booking.customer.email,
    booking.bookingClass.name,
    booking.bookingClass.location,
    booking.coach?.name,
    booking.source.channel,
  ].some((value) => value?.toLowerCase().includes(query))
}

function getSortValue(
  booking: Booking,
  field: BookingSort["field"]
): string | number {
  switch (field) {
    case "startsAt":
      return Date.parse(booking.schedule.startsAt)
    case "createdAt":
      return Date.parse(booking.createdAt)
    case "customerName":
      return booking.customer.name
    case "className":
      return booking.bookingClass.name
    case "status":
      return booking.status
  }
}

function compareBookings(
  first: Booking,
  second: Booking,
  sort: BookingSort
): number {
  const firstValue = getSortValue(first, sort.field)
  const secondValue = getSortValue(second, sort.field)

  const result =
    typeof firstValue === "number" && typeof secondValue === "number"
      ? firstValue - secondValue
      : String(firstValue).localeCompare(String(secondValue))

  return sort.direction === "asc" ? result : -result
}

function getStatusUpdate(action: BookingAction): BookingStatus | null {
  switch (action) {
    case "confirm":
      return "confirmed"
    case "cancel":
      return "cancelled"
    case "mark_completed":
      return "completed"
    case "mark_no_show":
      return "no_show"
    default:
      return null
  }
}

function getUpdatedDetails(
  details: BookingDetails,
  booking: Booking
): BookingDetails {
  const actions = details.actions.items.map((item) => {
    const enabled = isActionEnabled(booking, item.action)

    return {
      ...item,
      enabled,
      disabledReason: enabled
        ? null
        : (item.disabledReason ??
          "This action is unavailable for the current booking status."),
    }
  })

  return {
    ...details,
    booking,
    header: {
      ...details.header,
      bookingId: booking.id,
      reference: booking.reference,
      status: booking.status,
      hasLinkedLead: booking.leadId !== null,
    },
    details: {
      ...details.details,
      customer: {
        ...details.details.customer,
        customer: booking.customer,
      },
      status: {
        ...details.details.status,
        currentStatus: booking.status,
      },
      source: {
        ...details.details.source,
        source: booking.source,
      },
    },
    actions: {
      ...details.actions,
      items: actions,
    },
    timezone:
      booking.schedule.timezone ||
      details.timezone ||
      BOOKING_DETAILS_MOCK_TIMEZONE,
  }
}

function updateBookingNotes(
  current: BookingDetails,
  updater: (notes: BookingNote[]) => BookingNote[]
): BookingDetails {
  const items = updater([...current.notes.items])

  return {
    ...current,
    notes: {
      items,
      totalCount: items.length,
    },
  }
}

export function BookingsOverview({ className }: { className?: string }) {
  const router = useRouter()

  const [bookings, setBookings] = useState<Booking[]>(() => [...BOOKINGS_MOCK])
  const [filters, setFilters] = useState<BookingFilters>(() => ({
    ...DEFAULT_BOOKING_FILTERS,
    dateRange: { ...DEFAULT_BOOKING_FILTERS.dateRange },
  }))
  const [sort, setSort] = useState<BookingSort>(DEFAULT_SORT)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  // Keep the details panel closed until the user explicitly selects a booking.
  const [selectedBookingId, setSelectedBookingId] = useState<BookingId | null>(
    null
  )
  const [selectedBookingIds, setSelectedBookingIds] = useState<BookingId[]>([])
  const [bulkConfirmIds, setBulkConfirmIds] = useState<BookingId[] | null>(null)
  const [activeTab, setActiveTab] = useState<BookingDetailsTabId>("details")
  const [detailsOverrides, setDetailsOverrides] = useState<
    Record<BookingId, BookingDetails>
  >({})
  const [feedback, setFeedback] = useState<string | null>(null)

  const filteredBookings = useMemo(
    () => bookings.filter((booking) => matchesBookingFilters(booking, filters)),
    [bookings, filters]
  )

  const sortedBookings = useMemo(
    () => [...filteredBookings].sort((a, b) => compareBookings(a, b, sort)),
    [filteredBookings, sort]
  )

  const totalPages = Math.max(1, Math.ceil(sortedBookings.length / pageSize))
  const currentPage = Math.min(page, totalPages)

  const visibleBookings = useMemo(() => {
    const start = (currentPage - 1) * pageSize

    return sortedBookings.slice(start, start + pageSize)
  }, [currentPage, pageSize, sortedBookings])

  const pendingFilteredBookings = useMemo(
    () => filteredBookings.filter((booking) => booking.status === "pending"),
    [filteredBookings]
  )

  const selectedPendingBookingIds = useMemo(
    () =>
      selectedBookingIds.filter((bookingId) =>
        bookings.some(
          (booking) => booking.id === bookingId && booking.status === "pending"
        )
      ),
    [bookings, selectedBookingIds]
  )

  const pagination = useMemo<BookingPagination>(
    () => ({
      page: currentPage,
      pageSize,
      totalItems: sortedBookings.length,
      totalPages,
    }),
    [currentPage, pageSize, sortedBookings.length, totalPages]
  )

  const tabCounts = useMemo(
    () =>
      getBookingTabCounts(
        bookings.filter((booking) =>
          matchesBookingFilters(booking, filters, false)
        )
      ),
    [bookings, filters]
  )

  const selectedBooking = useMemo(
    () => bookings.find((booking) => booking.id === selectedBookingId) ?? null,
    [bookings, selectedBookingId]
  )

  const selectedDetails = useMemo(() => {
    if (!selectedBooking) return null

    const details =
      detailsOverrides[selectedBooking.id] ??
      getBookingDetailsMockById(selectedBooking.id)

    return details ? getUpdatedDetails(details, selectedBooking) : null
  }, [detailsOverrides, selectedBooking])

  const updateDetails = (
    bookingId: BookingId,
    updater: (details: BookingDetails) => BookingDetails
  ) => {
    setDetailsOverrides((current) => {
      const base = current[bookingId] ?? getBookingDetailsMockById(bookingId)

      if (!base) return current

      return {
        ...current,
        [bookingId]: updater(base),
      }
    })
  }

  const handleBookingSelect = (bookingId: BookingId) => {
    setSelectedBookingId(bookingId)
    setActiveTab("details")
    setFeedback(null)
  }

  const handleCreateBooking = (input: CreateManualBookingInput) => {
    const customer = Object.values(BOOKING_CUSTOMERS_MOCK).find(
      (item) => item.id === input.customerId
    )
    const bookingClass = BOOKING_CLASS_OPTIONS_MOCK.find(
      (item) => item.id === input.classId
    )
    const coach = Object.values(BOOKING_COACHES_MOCK).find(
      (item) => item.id === input.coachId
    )

    if (!customer || !bookingClass) return

    const startsAtDate = new Date(`${input.date}T${input.time}:00`)

    if (!Number.isFinite(startsAtDate.getTime())) return

    const startsAt = startsAtDate.toISOString()
    const endsAt = new Date(
      startsAtDate.getTime() + input.durationMinutes * 60_000
    ).toISOString()
    const createdAt = new Date().toISOString()
    const bookingId = `booking_manual_${Date.now()}`
    const bookingType = MANUAL_BOOKING_TYPE_CONFIG[input.type]
    const capacity =
      input.type === "personal_training" || input.type === "consultation"
        ? 1
        : 16

    const booking: Booking = {
      id: bookingId,
      reference: `BK-${input.date.replaceAll("-", "")}-${String(
        bookings.length + 1
      ).padStart(3, "0")}`,
      customer,
      bookingClass,
      coach: coach ?? bookingClass.coach,
      category: bookingType.category,
      type: bookingType.type,
      status: input.status,
      schedule: {
        sessionId: null,
        startsAt,
        endsAt,
        timezone: BOOKING_DETAILS_MOCK_TIMEZONE,
        location: bookingClass.location,
      },
      attendance: {
        attendees: 1,
        capacity,
        checkedIn: 0,
      },
      source: {
        channel: "manual",
        createdAt,
        externalReference: null,
      },
      createdAt,
      updatedAt: createdAt,
      notesCount: 0,
      messagesCount: 0,
      leadId: customer.leadId,
    }

    setBookings((current) => [booking, ...current])
    setDetailsOverrides((current) => ({
      ...current,
      [booking.id]: createDefaultBookingDetails(booking),
    }))
    setFilters({
      ...DEFAULT_BOOKING_FILTERS,
      dateRange: { ...DEFAULT_BOOKING_FILTERS.dateRange },
    })
    setPage(1)
    setSelectedBookingIds([])
    setSelectedBookingId(booking.id)
    setActiveTab("details")
    setFeedback("Booking created in demo mode.")
  }

  const handleStatusAction = (bookingId: BookingId, status: BookingStatus) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status,
              updatedAt: new Date().toISOString(),
            }
          : booking
      )
    )

    setFeedback("Booking status updated in demo mode.")
  }

  const handleBulkConfirm = () => {
    if (!bulkConfirmIds?.length) return

    const ids = new Set(bulkConfirmIds)
    const updatedAt = new Date().toISOString()

    setBookings((current) =>
      current.map((booking) =>
        ids.has(booking.id) && booking.status === "pending"
          ? {
              ...booking,
              status: "confirmed",
              updatedAt,
            }
          : booking
      )
    )
    setSelectedBookingIds([])
    setBulkConfirmIds(null)
    setFeedback(
      `${bulkConfirmIds.length} pending ${
        bulkConfirmIds.length === 1 ? "booking" : "bookings"
      } confirmed in demo mode.`
    )
  }

  const handleReschedule = (
    bookingId: BookingId,
    input: BookingRescheduleInput
  ) => {
    const startsAtDate = new Date(`${input.date}T${input.time}:00`)

    if (!Number.isFinite(startsAtDate.getTime())) return

    const startsAt = startsAtDate.toISOString()
    const endsAt = new Date(
      startsAtDate.getTime() + input.durationMinutes * 60_000
    ).toISOString()
    const updatedAt = new Date().toISOString()

    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              schedule: {
                ...booking.schedule,
                startsAt,
                endsAt,
              },
              updatedAt,
            }
          : booking
      )
    )

    setDetailsOverrides((current) => {
      const base = current[bookingId] ?? getBookingDetailsMockById(bookingId)

      if (!base) return current

      return {
        ...current,
        [bookingId]: {
          ...base,
          details: {
            ...base.details,
            classInformation: {
              ...base.details.classInformation,
              durationMinutes: input.durationMinutes,
            },
          },
        },
      }
    })

    setFeedback("Booking rescheduled in demo mode.")
  }

  const handleBookingAction = (bookingId: BookingId, action: BookingAction) => {
    const booking = bookings.find((item) => item.id === bookingId)

    if (!booking || !isActionEnabled(booking, action)) return

    if (action === "view") {
      handleBookingSelect(bookingId)
      return
    }

    const nextStatus = getStatusUpdate(action)

    if (nextStatus) {
      handleStatusAction(bookingId, nextStatus)
      return
    }

    if (action === "view_lead" && booking.leadId) {
      router.push(`/leads-prospect/${booking.leadId}`)
      return
    }

    if (action === "send_message") {
      router.push("/inbox")
      return
    }

    setFeedback(
      action === "reschedule"
        ? "Reschedule flow is ready for backend connection."
        : "Edit flow is ready for backend connection."
    )
  }

  const handleAddNote = (input: BookingNoteInput) => {
    if (!selectedBooking) return

    const note: BookingNote = {
      id: `local_note_${Date.now()}`,
      content: input.content.trim(),
      visibility: input.visibility,
      author: {
        id: "demo-admin",
        name: "Demo Admin",
        avatarUrl: null,
        type: "admin",
      },
      createdAt: new Date().toISOString(),
      updatedAt: null,
      canEdit: true,
      canDelete: true,
    }

    updateDetails(selectedBooking.id, (details) =>
      updateBookingNotes(details, (items) => [...items, note])
    )
    setFeedback("Note added in demo mode.")
  }

  const handleUpdateNote = (
    noteId: BookingNote["id"],
    input: BookingNoteInput
  ) => {
    if (!selectedBooking) return

    updateDetails(selectedBooking.id, (details) =>
      updateBookingNotes(details, (items) =>
        items.map((note) =>
          note.id === noteId
            ? {
                ...note,
                content: input.content.trim(),
                visibility: input.visibility,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      )
    )
    setFeedback("Note updated in demo mode.")
  }

  const handleDeleteNote = (noteId: BookingNote["id"]) => {
    if (!selectedBooking) return

    updateDetails(selectedBooking.id, (details) =>
      updateBookingNotes(details, (items) =>
        items.filter((note) => note.id !== noteId)
      )
    )
    setFeedback("Note deleted in demo mode.")
  }

  const handleCheckIn = (attendeeId: string) => {
    if (!selectedBooking) return

    updateDetails(selectedBooking.id, (details) => ({
      ...details,
      attendees: {
        ...details.attendees,
        items: details.attendees.items.map((attendee) =>
          attendee.id === attendeeId
            ? {
                ...attendee,
                status: "checked_in",
                checkedInAt: new Date().toISOString(),
              }
            : attendee
        ),
        checkedInCount: Math.min(
          details.attendees.totalCount,
          details.attendees.checkedInCount + 1
        ),
      },
    }))
    setFeedback("Attendee checked in in demo mode.")
  }

  const handleFiltersChange = (next: BookingFilters) => {
    setFilters(next)
    setPage(1)
    setSelectedBookingIds([])
    setSelectedBookingId(null)
    setActiveTab("details")
  }

  const handleTabChange = (nextTab: BookingFilters["tab"]) => {
    handleFiltersChange({ ...filters, tab: nextTab })
  }

  return (
    <div className={cn("relative min-w-0 space-y-4", className)}>
      <div className="flex justify-end md:absolute md:-top-20 md:right-0 md:z-10">
        <CreateBookingDialog
          customers={Object.values(BOOKING_CUSTOMERS_MOCK)}
          classes={BOOKING_CLASS_OPTIONS_MOCK}
          coaches={Object.values(BOOKING_COACHES_MOCK)}
          onCreate={handleCreateBooking}
        />
      </div>

      <BookingStats statistics={BOOKING_STATISTICS_MOCK} status="success" />

      <BookingTypeTabs
        value={filters.tab}
        onChange={handleTabChange}
        counts={tabCounts}
        showCounts
      />

      <BookingFiltersToolbar
        value={filters}
        onChange={handleFiltersChange}
        classes={BOOKING_CLASS_OPTIONS_MOCK}
        coaches={Object.values(BOOKING_COACHES_MOCK)}
      />

      {feedback && (
        <div
          role="status"
          className="bg-gold-10 flex items-center justify-between gap-3 rounded-lg border border-gold/20 px-3 py-2 text-xs text-foreground"
        >
          <span>{feedback}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setFeedback(null)}
            aria-label="Dismiss booking message"
            className="size-6 shrink-0"
          >
            <X aria-hidden="true" className="size-3.5" />
          </Button>
        </div>
      )}

      {(filters.status === "pending" && pendingFilteredBookings.length > 0) ||
      selectedPendingBookingIds.length > 0 ? (
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCheck aria-hidden="true" className="size-4" />
            </span>
            <p className="text-muted-foreground">
              {filters.status === "pending" &&
              pendingFilteredBookings.length > 0
                ? `${pendingFilteredBookings.length} pending ${pendingFilteredBookings.length === 1 ? "booking" : "bookings"} in this filtered view.`
                : `${selectedPendingBookingIds.length} pending ${selectedPendingBookingIds.length === 1 ? "booking" : "bookings"} selected.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedPendingBookingIds.length > 0 && (
              <Button
                type="button"
                size="sm"
                onClick={() => setBulkConfirmIds(selectedPendingBookingIds)}
                className="h-8 bg-emerald-600 text-[11px] text-white hover:bg-emerald-500"
              >
                Confirm selected
              </Button>
            )}

            {filters.status === "pending" &&
              pendingFilteredBookings.length > 0 && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    setBulkConfirmIds(
                      pendingFilteredBookings.map((booking) => booking.id)
                    )
                  }
                  className="h-8 bg-emerald-600 text-[11px] text-white hover:bg-emerald-500"
                >
                  Confirm all pending
                </Button>
              )}
          </div>
        </div>
      ) : null}

      <Dialog
        open={bulkConfirmIds !== null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setBulkConfirmIds(null)
        }}
      >
        <DialogContent className="max-w-sm bg-card">
          <DialogHeader>
            <DialogTitle>Confirm pending bookings?</DialogTitle>
            <DialogDescription>
              This will confirm {bulkConfirmIds?.length ?? 0} pending booking
              {(bulkConfirmIds?.length ?? 0) === 1 ? "" : "s"} and reserve their
              session spots.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setBulkConfirmIds(null)}
            >
              Keep Pending
            </Button>
            <Button
              type="button"
              onClick={handleBulkConfirm}
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              Confirm Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex min-w-0 items-stretch gap-4 overflow-hidden">
        <div className="min-w-0 flex-1 space-y-3 overflow-hidden">
          <BookingsTable
            bookings={visibleBookings}
            selectedBookingId={selectedBookingId}
            selectedBookingIds={selectedBookingIds}
            onBookingSelect={handleBookingSelect}
            onSelectionChange={setSelectedBookingIds}
            onBookingAction={handleBookingAction}
            getAvailableActions={(booking) =>
              ROW_ACTIONS.filter((action) => isActionEnabled(booking, action))
            }
            sort={sort}
            onSortChange={(nextSort) => {
              setSort(nextSort)
              setPage(1)
            }}
          />

          <BookingTablePagination
            pagination={pagination}
            onPageChange={setPage}
            onPageSizeChange={(nextPageSize) => {
              setPageSize(nextPageSize)
              setPage(1)
            }}
          />
        </div>

        <BookingDetailsPanel
          className={cn(
            "w-[min(25rem,32vw)] self-start",
            "h-[calc(100dvh-8rem)] max-h-[calc(100dvh-8rem)]",
            "rounded-xl border border-border shadow-lg"
          )}
          booking={selectedBooking}
          details={selectedDetails}
          open={selectedBooking !== null}
          onClose={() => setSelectedBookingId(null)}
          onAction={handleBookingAction}
          onReschedule={handleReschedule}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onViewLead={() => {
            if (selectedBooking?.leadId) {
              router.push(`/leads-prospect/${selectedBooking.leadId}`)
            }
          }}
          leadHref={
            selectedBooking?.leadId
              ? `/leads-prospect/${selectedBooking.leadId}`
              : null
          }
          canCheckIn={
            selectedBooking?.status === "confirmed" &&
            Boolean(
              selectedDetails?.attendees.items.some(
                (attendee) => attendee.status === "registered"
              )
            )
          }
          onCheckIn={handleCheckIn}
          canAddNote
          canCreateCustomerVisibleNotes
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          onOpenInbox={(conversationId) => {
            router.push(`/inbox?conversation=${conversationId}`)
          }}
          showStatusHistory
        />
      </div>
    </div>
  )
}

export default BookingsOverview
