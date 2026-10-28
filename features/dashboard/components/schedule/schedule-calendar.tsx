"use client";

import { useState } from "react";

import {
  AlertCircle,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import {
  DASHBOARD_SCHEDULE_LOCALE,
  DASHBOARD_SCHEDULE_TIMEZONE,
} from "../../config/dashboard-schedule.config";

import type {
  ScheduleCalendarProps,
  ScheduleDate,
} from "../../types/dashboard-schedule.types";

export interface DashboardScheduleCalendarProps
  extends ScheduleCalendarProps {
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function isValidScheduleDate(
  value: string,
): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T12:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function parseScheduleDate(
  value: ScheduleDate,
): Date | undefined {
  if (!isValidScheduleDate(value)) {
    return undefined;
  }

  return new Date(`${value}T12:00:00Z`);
}

function formatScheduleDateKey(
  date: Date,
  timezone: string,
): ScheduleDate {
  const parts = new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  ).formatToParts(date);

  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value ??
    "";

  return [
    getPart("year"),
    getPart("month"),
    getPart("day"),
  ].join("-");
}

function ScheduleCalendarSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-label="Loading calendar"
      aria-busy="true"
      className={cn(
        "w-full rounded-lg border border-border",
        "bg-card p-3",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="size-6 rounded-md" />
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="size-6 rounded-md" />
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            key={`weekday-${index}`}
            className="mx-auto h-2.5 w-4"
          />
        ))}

        {Array.from({ length: 35 }).map((_, index) => (
          <Skeleton
            key={`date-${index}`}
            className="mx-auto mt-1 aspect-square w-full rounded-md"
          />
        ))}
      </div>

      <span className="sr-only">
        Loading schedule calendar.
      </span>
    </div>
  );
}

function ScheduleCalendarError({
  message,
  onRetry,
  className,
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-52 flex-col",
        "items-center justify-center gap-3",
        "rounded-lg border border-dashed",
        "border-destructive/30",
        "bg-card px-4 py-6 text-center",
        className,
      )}
    >
      <AlertCircle
        aria-hidden="true"
        className="size-5 text-destructive"
      />

      <p className="text-xs leading-relaxed text-muted-foreground">
        {message}
      </p>

      {onRetry && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onRetry}
        >
          <RefreshCw
            aria-hidden="true"
            className="size-3.5"
          />
          Try again
        </Button>
      )}
    </div>
  );
}

function ScheduleCalendarEmpty({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-52 flex-col",
        "items-center justify-center gap-2",
        "rounded-lg border border-dashed border-border",
        "bg-card px-4 py-6 text-center",
        className,
      )}
    >
      <CalendarDays
        aria-hidden="true"
        className="size-5 text-muted-foreground"
      />

      <p className="text-xs text-muted-foreground">
        Calendar date unavailable
      </p>
    </div>
  );
}

export function ScheduleCalendar({
  selectedDate,
  onDateChange,
  datesWithSessions = [],
  timezone = DASHBOARD_SCHEDULE_TIMEZONE,
  disabled = false,
  isLoading = false,
  error = null,
  onRetry,
  className,
}: DashboardScheduleCalendarProps) {
  const [visibleMonth, setVisibleMonth] =
    useState<Date | undefined>(() =>
      parseScheduleDate(selectedDate),
    );

  /* ==========================================================
     LOADING
  ========================================================== */

  if (isLoading) {
    return (
      <ScheduleCalendarSkeleton
        className={className}
      />
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error) {
    return (
      <ScheduleCalendarError
        message={error}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  const selected = parseScheduleDate(selectedDate);

  /* ==========================================================
     INVALID DATE
  ========================================================== */

  if (!selected) {
    return (
      <ScheduleCalendarEmpty
        className={className}
      />
    );
  }

  /* ==========================================================
     SCHEDULED DATES
  ========================================================== */

  const sessionDates = datesWithSessions
    .map(parseScheduleDate)
    .filter((date): date is Date => date !== undefined);

  /* ==========================================================
     DATE SELECTION
  ========================================================== */

  function handleSelect(date: Date | undefined) {
    if (!date || disabled || !onDateChange) {
      return;
    }

    const dateKey = formatScheduleDateKey(
      date,
      timezone,
    );

    if (
      isValidScheduleDate(dateKey) &&
      dateKey !== selectedDate
    ) {
      onDateChange(dateKey);
    }
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      className={cn(
        "min-w-0 rounded-lg border border-border",
        "bg-card p-2",
        className,
      )}
      aria-label="Schedule mini calendar"
    >
      <Calendar
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        month={visibleMonth ?? selected}
        onMonthChange={setVisibleMonth}
        timeZone={timezone}
        locale={undefined}
        showOutsideDays
        disabled={disabled || !onDateChange}
        modifiers={{
          hasSessions: sessionDates,
        }}
        modifiersClassNames={{
          hasSessions: cn(
            "relative",
            "after:pointer-events-none",
            "after:absolute after:bottom-0.5",
            "after:left-1/2 after:-translate-x-1/2",
            "after:size-1 after:rounded-full",
            "after:bg-gold",
          ),
        }}
        className={cn(
          "w-full bg-transparent p-0",
          "[--cell-size:1.7rem]",
        )}
        classNames={{
          months: "flex w-full flex-col",
          month: "flex w-full flex-col gap-1.5",
          month_caption:
            "flex h-7 items-center justify-center",
          caption_label:
            "text-[11px] font-semibold text-foreground",
          weekdays: "flex",
          weekday:
            "flex-1 text-center text-[9px] font-medium text-muted-foreground",
          week: "mt-0.5 flex w-full",
          day: "relative flex-1 text-center",
          day_button:
            "mx-auto size-(--cell-size) rounded-full text-[10px] font-medium",
        }}
        formatters={{
          formatCaption: (month) =>
            new Intl.DateTimeFormat(
              DASHBOARD_SCHEDULE_LOCALE,
              {
                month: "long",
                year: "numeric",
                timeZone: timezone,
              },
            ).format(month),
        }}
      />
    </div>
  );
}