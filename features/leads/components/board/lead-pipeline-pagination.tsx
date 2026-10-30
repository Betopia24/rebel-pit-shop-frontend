"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"

export interface LeadPipelinePaginationProps {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: readonly number[]
  disabled?: boolean
  className?: string
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50] as const
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function LeadPipelinePagination({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  disabled = false,
  className,
}: LeadPipelinePaginationProps) {
  const safeTotalItems = Math.max(0, totalItems)
  const safePageSize = Math.max(1, pageSize)
  const safeTotalPages = Math.max(1, totalPages)
  const currentPage = Math.min(Math.max(1, page), safeTotalPages)
  const startItem =
    safeTotalItems > 0 ? (currentPage - 1) * safePageSize + 1 : 0
  const endItem =
    safeTotalItems > 0
      ? Math.min(currentPage * safePageSize, safeTotalItems)
      : 0

  const pageOptions = [...new Set([...pageSizeOptions, safePageSize])]
    .filter((option) => Number.isSafeInteger(option) && option > 0)
    .sort((a, b) => a - b)

  const canGoPrevious = currentPage > 1 && !disabled
  const canGoNext = currentPage < safeTotalPages && !disabled

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3 border-t border-border/80 pt-3",
        "sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        <p
          className="text-[11px] leading-4 text-muted-foreground tabular-nums"
          aria-live="polite"
        >
          Showing{" "}
          <span className="font-semibold text-foreground">
            {NUMBER_FORMATTER.format(startItem)}–
            {NUMBER_FORMATTER.format(endItem)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {NUMBER_FORMATTER.format(safeTotalItems)}
          </span>{" "}
          leads
        </p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">
          Use filters to narrow the pipeline view.
        </p>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] whitespace-nowrap text-muted-foreground">
              Leads per page
            </span>
            <Select
              value={String(safePageSize)}
              onValueChange={(nextValue) => {
                const nextSize = Number(nextValue)

                if (
                  Number.isSafeInteger(nextSize) &&
                  nextSize > 0 &&
                  nextSize !== safePageSize
                ) {
                  onPageSizeChange(nextSize)
                }
              }}
              disabled={disabled}
            >
              <SelectTrigger
                size="sm"
                aria-label="Leads per page"
                className="h-8 w-17 rounded-md border-border bg-card text-[11px] tabular-nums"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {pageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <nav
          aria-label="Lead pipeline pagination"
          className="flex items-center gap-1 rounded-lg border border-border bg-card p-1"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!canGoPrevious}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous lead page"
            className="size-7 rounded-md text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft aria-hidden="true" className="size-3.5" />
          </Button>

          <span className="min-w-20 px-2 text-center text-[10px] font-medium text-foreground tabular-nums">
            Page {currentPage} of {safeTotalPages}
          </span>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!canGoNext}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next lead page"
            className="size-7 rounded-md text-muted-foreground hover:text-foreground"
          >
            <ChevronRight aria-hidden="true" className="size-3.5" />
          </Button>
        </nav>
      </div>
    </div>
  )
}

export default LeadPipelinePagination
