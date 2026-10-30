"use client"

import { useMemo } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"

import type { BookingPagination } from "../../types/booking.types"

export interface BookingPaginationProps {
  pagination: BookingPagination
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: readonly number[]
  itemLabel?: string
  isLoading?: boolean
  disabled?: boolean
  className?: string
}

type PaginationItem =
  { type: "page"; value: number } | { type: "ellipsis"; key: string }

/* ============================================================
   CONSTANTS
============================================================ */

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

/* ============================================================
   HELPERS
============================================================ */

function normalizeNonNegativeInteger(value: number, fallback = 0): number {
  return Number.isSafeInteger(value) && value >= 0 ? value : fallback
}

function normalizePositiveInteger(value: number, fallback = 1): number {
  return Number.isSafeInteger(value) && value > 0 ? value : fallback
}

function buildPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 0) {
    return []
  }

  const pages = new Set<number>()

  pages.add(1)
  pages.add(totalPages)

  for (
    let page = Math.max(1, currentPage - 1);
    page <= Math.min(totalPages, currentPage + 1);
    page++
  ) {
    pages.add(page)
  }

  if (currentPage <= 3) {
    for (let page = 1; page <= Math.min(4, totalPages); page++) {
      pages.add(page)
    }
  }

  if (currentPage >= totalPages - 2) {
    for (let page = Math.max(1, totalPages - 3); page <= totalPages; page++) {
      pages.add(page)
    }
  }

  const sorted = [...pages].sort((a, b) => a - b)

  const items: PaginationItem[] = []

  sorted.forEach((page, index) => {
    const previous = sorted[index - 1]

    if (previous !== undefined && page - previous > 1) {
      if (page - previous === 2) {
        items.push({
          type: "page",
          value: previous + 1,
        })
      } else {
        items.push({
          type: "ellipsis",
          key: `ellipsis-${previous}-${page}`,
        })
      }
    }

    items.push({
      type: "page",
      value: page,
    })
  })

  return items
}

/* ============================================================
   LOADING STATE
============================================================ */

function PaginationSkeleton() {
  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-wrap items-center", "justify-between gap-3")}
    >
      <Skeleton className="h-3 w-40" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-25 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  )
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingTablePagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  itemLabel = "bookings",
  isLoading = false,
  disabled = false,
  className,
}: BookingPaginationProps) {
  const totalItems = normalizeNonNegativeInteger(pagination.totalItems)

  const pageSize = normalizePositiveInteger(pagination.pageSize, 10)

  /**
   * Calculate page count from totalItems
   * and pageSize to avoid invalid controls.
   *
   * The API should provide consistent
   * pagination metadata.
   */
  const calculatedTotalPages = Math.ceil(totalItems / pageSize)

  const totalPages = calculatedTotalPages

  const currentPage =
    totalPages > 0
      ? Math.min(normalizePositiveInteger(pagination.page), totalPages)
      : 1

  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0

  const endItem =
    totalItems > 0 ? Math.min(currentPage * pageSize, totalItems) : 0

  const canGoPrevious = currentPage > 1 && !disabled && !isLoading

  const canGoNext = currentPage < totalPages && !disabled && !isLoading

  const pageItems = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages]
  )

  const validPageSizeOptions = useMemo(() => {
    const options = new Set<number>()

    for (const option of pageSizeOptions) {
      if (Number.isSafeInteger(option) && option > 0) {
        options.add(option)
      }
    }

    options.add(pageSize)

    return [...options].sort((a, b) => a - b)
  }, [pageSize, pageSizeOptions])

  const handlePageChange = (nextPage: number) => {
    if (
      disabled ||
      isLoading ||
      !Number.isSafeInteger(nextPage) ||
      nextPage < 1 ||
      nextPage > totalPages ||
      nextPage === currentPage
    ) {
      return
    }

    onPageChange(nextPage)
  }

  const handlePageSizeChange = (nextValue: string | null) => {
    if (disabled || isLoading || !onPageSizeChange || !nextValue) {
      return
    }

    const nextSize = Number(nextValue)

    if (
      !Number.isSafeInteger(nextSize) ||
      nextSize <= 0 ||
      nextSize === pageSize ||
      !validPageSizeOptions.includes(nextSize)
    ) {
      return
    }

    onPageSizeChange(nextSize)
  }

  return (
    <div
      className={cn(
        "min-w-0 border-t border-border",
        "bg-card px-4 py-3",
        className
      )}
    >
      {isLoading ? (
        <PaginationSkeleton />
      ) : (
        <div
          className={cn(
            "flex flex-wrap items-center",
            "justify-between gap-x-4 gap-y-3"
          )}
        >
          {/* ==================================================
              RESULTS SUMMARY
          ================================================== */}

          <p
            className={cn(
              "text-[11px] leading-4",
              "text-muted-foreground",
              "tabular-nums"
            )}
            aria-live="polite"
          >
            Showing{" "}
            <span className="font-medium text-foreground">
              {NUMBER_FORMATTER.format(startItem)}
            </span>
            {"–"}
            <span className="font-medium text-foreground">
              {NUMBER_FORMATTER.format(endItem)}
            </span>
            {" of "}
            <span className="font-medium text-foreground">
              {NUMBER_FORMATTER.format(totalItems)}
            </span>{" "}
            {itemLabel}
          </p>

          {/* ==================================================
              PAGINATION CONTROLS
          ================================================== */}

          <div className={cn("flex min-w-0 flex-wrap", "items-center gap-3")}>
            {/* Rows per page */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "whitespace-nowrap",
                  "text-[11px]",
                  "text-muted-foreground"
                )}
              >
                Rows per page
              </span>

              <Select
                value={String(pageSize)}
                onValueChange={handlePageSizeChange}
                disabled={disabled || !onPageSizeChange}
              >
                <SelectTrigger
                  size="sm"
                  aria-label="Rows per page"
                  className={cn(
                    "h-8 w-18 rounded-md",
                    "border-border bg-background",
                    "text-[11px] tabular-nums"
                  )}
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent align="end">
                  {validPageSizeOptions.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Page navigation */}
            <nav
              aria-label={`${itemLabel} pagination`}
              className="flex items-center gap-1"
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={!canGoPrevious}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous page"
                className={cn("size-8 rounded-md", "border-border")}
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </Button>

              {pageItems.map((item) => {
                if (item.type === "ellipsis") {
                  return (
                    <span
                      key={item.key}
                      aria-hidden="true"
                      className={cn(
                        "flex size-8 items-center",
                        "justify-center",
                        "text-[11px]",
                        "text-muted-foreground"
                      )}
                    >
                      ...
                    </span>
                  )
                }

                const active = item.value === currentPage

                return (
                  <Button
                    key={item.value}
                    type="button"
                    variant={active ? "secondary" : "ghost"}
                    size="icon"
                    disabled={disabled}
                    onClick={() => handlePageChange(item.value)}
                    aria-label={`Page ${item.value}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "size-8 rounded-md",
                      "text-[11px]",
                      "font-medium tabular-nums",
                      active &&
                        "bg-gold-10 hover:bg-gold-10 border border-gold/30 text-gold hover:text-gold",
                      !active && "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.value}
                  </Button>
                )
              })}

              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={!canGoNext}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next page"
                className={cn("size-8 rounded-md", "border-border")}
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </Button>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingTablePagination
