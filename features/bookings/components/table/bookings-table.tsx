"use client"

import { useId, useMemo } from "react"
import type { ReactNode } from "react"

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Inbox,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"

import { Skeleton } from "@/components/ui/skeleton"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils"

import { BookingTableRow } from "./booking-table-row"

import type {
  Booking,
  BookingAction,
  BookingId,
  BookingSort,
  BookingSortDirection,
  BookingSortField,
} from "../../types/booking.types"

export type BookingsTableStatus = "loading" | "success" | "empty" | "error"

export interface BookingsTableProps {
  bookings: readonly Booking[]
  selectedBookingId?: BookingId | null
  selectedBookingIds?: readonly BookingId[]
  onBookingSelect: (bookingId: BookingId) => void
  onSelectionChange?: (bookingIds: readonly BookingId[]) => void
  onBookingAction?: (bookingId: BookingId, action: BookingAction) => void
  getAvailableActions?: (booking: Booking) => readonly BookingAction[]
  sort?: BookingSort | null
  onSortChange?: (sort: BookingSort) => void
  status?: BookingsTableStatus
  error?: string | null
  onRetry?: () => void
  disabled?: boolean
  loadingRows?: number
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

/* ============================================================
   CONSTANTS
============================================================ */

const TABLE_COLUMN_COUNT = 10

const DEFAULT_LOADING_ROWS = 6

const DEFAULT_SORT: BookingSort = {
  field: "startsAt",
  direction: "asc",
}

const TABLE_HEADER_TEXT_CLASS =
  "text-[11px] font-semibold text-muted-foreground"

/* ============================================================
   SORTING
============================================================ */

interface SortableHeaderProps {
  label: string

  field: BookingSortField

  sort: BookingSort | null

  onSortChange?: (sort: BookingSort) => void

  disabled?: boolean

  className?: string
}

function SortableHeader({
  label,
  field,
  sort,
  onSortChange,
  disabled = false,
  className,
}: SortableHeaderProps) {
  const isActive = sort?.field === field

  const direction = isActive ? sort.direction : null

  const Icon =
    direction === "asc"
      ? ArrowUp
      : direction === "desc"
        ? ArrowDown
        : ArrowUpDown

  const nextDirection: BookingSortDirection =
    isActive && direction === "asc" ? "desc" : "asc"

  const canSort = Boolean(onSortChange) && !disabled

  if (!canSort) {
    return (
      <span
        className={cn(
          "inline-flex items-center",
          "whitespace-nowrap",
          TABLE_HEADER_TEXT_CLASS,
          className
        )}
      >
        {label}
      </span>
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => {
        onSortChange?.({
          field,
          direction: nextDirection,
        })
      }}
      aria-label={`Sort by ${label}, ${
        nextDirection === "asc" ? "ascending" : "descending"
      }`}
      className={cn(
        "h-6 gap-1",
        "rounded-md px-0",
        TABLE_HEADER_TEXT_CLASS,
        "text-muted-foreground",
        "hover:bg-transparent",
        "hover:text-foreground",
        isActive && "text-foreground",
        className
      )}
    >
      {label}

      <Icon
        aria-hidden="true"
        className={cn(
          "size-3.5 shrink-0",
          isActive ? "text-foreground" : "text-muted-foreground/70"
        )}
      />
    </Button>
  )
}

/* ============================================================
   TABLE SKELETON
============================================================ */

function BookingsTableSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, index) => (
        <TableRow
          key={`booking-skeleton-${index}`}
          className="h-17 border-b border-border/70"
        >
          <TableCell className="px-3 py-3">
            <Skeleton className="size-4 rounded-sm" />
          </TableCell>

          <TableCell className="px-3 py-3">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2.5 w-16" />
            </div>
          </TableCell>

          <TableCell className="px-3 py-3">
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-8 shrink-0 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-3 w-25" />
                <Skeleton className="h-2.5 w-23" />
              </div>
            </div>
          </TableCell>

          <TableCell className="px-3 py-3">
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-2.5 w-20" />
            </div>
          </TableCell>

          <TableCell className="px-3 py-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </TableCell>

          <TableCell className="px-3 py-3">
            <Skeleton className="h-5 w-22 rounded-md" />
          </TableCell>

          <TableCell className="px-3 py-3">
            <Skeleton className="h-5 w-20 rounded-md" />
          </TableCell>

          <TableCell className="px-3 py-3">
            <Skeleton className="h-3 w-12" />
          </TableCell>

          <TableCell className="px-3 py-3">
            <Skeleton className="size-7 rounded-md" />
          </TableCell>

          <TableCell className="px-3 py-3">
            <Skeleton className="ml-auto size-7 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

/* ============================================================
   EMPTY / ERROR STATE
============================================================ */

interface TableMessageProps {
  icon: ReactNode

  title: string

  description: string

  action?: ReactNode

  isError?: boolean
}

function TableMessage({
  icon,
  title,
  description,
  action,
  isError = false,
}: TableMessageProps) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={TABLE_COLUMN_COUNT} className="p-0">
        <div
          role={isError ? "alert" : "status"}
          className={cn(
            "flex min-h-64 flex-col",
            "items-center justify-center",
            "gap-3 px-6 py-10 text-center"
          )}
        >
          <div
            className={cn(
              "flex size-11 items-center",
              "justify-center rounded-xl",
              isError
                ? "bg-destructive/10 text-destructive"
                : "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-foreground">{title}</h3>

            <p className="mx-auto max-w-sm text-[11px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {action}
        </div>
      </TableCell>
    </TableRow>
  )
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingsTable({
  bookings,
  selectedBookingId = null,
  selectedBookingIds = [],
  onBookingSelect,
  onSelectionChange,
  onBookingAction,
  getAvailableActions,
  sort = DEFAULT_SORT,
  onSortChange,
  status = "success",
  error = null,
  onRetry,
  disabled = false,
  loadingRows = DEFAULT_LOADING_ROWS,
  emptyTitle = "No bookings found",
  emptyDescription = "Try adjusting your search or filters to find the bookings you're looking for.",
  className,
}: BookingsTableProps) {
  const tableDescriptionId = useId()

  /* ==========================================================
     VISIBLE SELECTION
  ========================================================== */

  const visibleBookingIds = useMemo(
    () => bookings.map((booking) => booking.id),
    [bookings]
  )

  const selectedIdsSet = useMemo(
    () => new Set(selectedBookingIds),
    [selectedBookingIds]
  )

  const selectedVisibleCount = useMemo(
    () => visibleBookingIds.filter((id) => selectedIdsSet.has(id)).length,
    [visibleBookingIds, selectedIdsSet]
  )

  const allVisibleSelected =
    visibleBookingIds.length > 0 &&
    selectedVisibleCount === visibleBookingIds.length

  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected

  const selectionEnabled =
    Boolean(onSelectionChange) && !disabled && status === "success"

  /* ==========================================================
     SELECTION HANDLERS
  ========================================================== */

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange || disabled) {
      return
    }

    const next = new Set(selectedBookingIds)

    if (checked) {
      visibleBookingIds.forEach((id) => next.add(id))
    } else {
      visibleBookingIds.forEach((id) => next.delete(id))
    }

    onSelectionChange([...next])
  }

  const handleBookingCheckedChange = (
    bookingId: BookingId,
    checked: boolean
  ) => {
    if (!onSelectionChange || disabled) {
      return
    }

    const next = new Set(selectedBookingIds)

    if (checked) {
      next.add(bookingId)
    } else {
      next.delete(bookingId)
    }

    onSelectionChange([...next])
  }

  /* ==========================================================
     CONTENT STATUS
  ========================================================== */

  const isLoading = status === "loading"

  const isError = status === "error"

  const isEmpty =
    status === "empty" || (status === "success" && bookings.length === 0)

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      aria-label="Bookings table"
      aria-busy={isLoading}
      className={cn(
        "min-w-0 overflow-hidden",
        "rounded-xl border border-border",
        "bg-card",
        className
      )}
    >
      <p id={tableDescriptionId} className="sr-only">
        Booking records with date, customer, class, coach, type, status,
        attendees, source and available actions.
      </p>

      {/* ======================================================
          HORIZONTAL SCROLL CONTAINER
      ====================================================== */}

      <Table
        aria-describedby={tableDescriptionId}
        className={cn("w-full min-w-290", "border-collapse")}
      >
        {/* ==================================================
              TABLE HEADER
          ================================================== */}

        <TableHeader>
          <TableRow
            className={cn(
              "h-11 border-b border-border",
              "bg-muted/30",
              "hover:bg-muted/30"
            )}
          >
            {/* Select all */}
            <TableHead className="w-10 px-3">
              <Checkbox
                checked={allVisibleSelected}
                indeterminate={someVisibleSelected}
                disabled={!selectionEnabled || visibleBookingIds.length === 0}
                onCheckedChange={(checked) => {
                  handleSelectAll(checked === true)
                }}
                aria-label="Select all visible bookings"
              />
            </TableHead>

            {/* Date & Time */}
            <TableHead className={cn("min-w-33 px-3", TABLE_HEADER_TEXT_CLASS)}>
              <SortableHeader
                label="Date & Time"
                field="startsAt"
                sort={sort}
                onSortChange={onSortChange}
                disabled={disabled}
              />
            </TableHead>

            {/* Member / Visitor */}
            <TableHead className={cn("min-w-46 px-3", TABLE_HEADER_TEXT_CLASS)}>
              <SortableHeader
                label="Member / Visitor"
                field="customerName"
                sort={sort}
                onSortChange={onSortChange}
                disabled={disabled}
              />
            </TableHead>

            {/* Class / Service */}
            <TableHead className={cn("min-w-47 px-3", TABLE_HEADER_TEXT_CLASS)}>
              <SortableHeader
                label="Class / Service"
                field="className"
                sort={sort}
                onSortChange={onSortChange}
                disabled={disabled}
              />
            </TableHead>

            {/* Coach */}
            <TableHead className={cn("min-w-36 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Coach
            </TableHead>

            {/* Type */}
            <TableHead className={cn("min-w-28 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Type
            </TableHead>

            {/* Status */}
            <TableHead className={cn("min-w-27 px-3", TABLE_HEADER_TEXT_CLASS)}>
              <SortableHeader
                label="Status"
                field="status"
                sort={sort}
                onSortChange={onSortChange}
                disabled={disabled}
              />
            </TableHead>

            {/* Attendees */}
            <TableHead className={cn("min-w-20 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Attendees
            </TableHead>

            {/* Source */}
            <TableHead className={cn("min-w-21 px-3", TABLE_HEADER_TEXT_CLASS)}>
              Source
            </TableHead>

            {/* Actions */}
            <TableHead className="w-12 px-3 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ==================================================
              TABLE BODY
          ================================================== */}

        <TableBody>
          {isLoading ? (
            <BookingsTableSkeleton
              rows={Math.max(1, Math.min(20, Math.trunc(loadingRows)))}
            />
          ) : isError ? (
            <TableMessage
              isError
              icon={<AlertCircle className="size-5" />}
              title="Unable to load bookings"
              description={
                error?.trim() ||
                "Something went wrong while loading booking records."
              }
              action={
                onRetry ? (
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
                ) : null
              }
            />
          ) : isEmpty ? (
            <TableMessage
              icon={<Inbox className="size-5" />}
              title={emptyTitle}
              description={emptyDescription}
            />
          ) : (
            bookings.map((booking) => (
              <BookingTableRow
                key={booking.id}
                booking={booking}
                selected={selectedBookingId === booking.id}
                checked={selectedIdsSet.has(booking.id)}
                onSelect={onBookingSelect}
                onCheckedChange={
                  selectionEnabled ? handleBookingCheckedChange : undefined
                }
                onAction={onBookingAction}
                availableActions={getAvailableActions?.(booking) ?? ["view"]}
                disabled={disabled}
              />
            ))
          )}
        </TableBody>
      </Table>

      {/* ======================================================
          OPTIONAL SELECTION SUMMARY
      ====================================================== */}

      {!isLoading &&
        !isError &&
        selectionEnabled &&
        selectedBookingIds.length > 0 && (
          <div
            className={cn(
              "flex flex-wrap items-center",
              "justify-between gap-2",
              "border-t border-border",
              "bg-muted/20 px-4 py-2.5"
            )}
          >
            <p
              className={cn(
                "text-[11px]",
                "text-muted-foreground",
                "tabular-nums"
              )}
            >
              <span className="font-semibold text-foreground">
                {selectedBookingIds.length}
              </span>{" "}
              booking
              {selectedBookingIds.length === 1 ? "" : "s"} selected
            </p>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onSelectionChange?.([])}
              className="h-7 px-2 text-[11px]"
            >
              Clear Selection
            </Button>
          </div>
        )}
    </section>
  )
}

export default BookingsTable
