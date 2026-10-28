"use client";

import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CalendarX2,
  RefreshCw,
} from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
  buttonVariants,
} from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import { ScheduleItem } from "./schedule-item";
import { ScheduleCalendar } from "./schedule-calendar";

import {
  DASHBOARD_SCHEDULE_DATE_FORMAT,
  DASHBOARD_SCHEDULE_LOCALE,
  DASHBOARD_SCHEDULE_PREVIEW_LIMIT,
  DASHBOARD_SCHEDULE_TIMEZONE,
} from "../../config/dashboard-schedule.config";

import type {
  DashboardScheduleData,
  DashboardScheduleItem,
  TodayScheduleProps,
} from "../../types/dashboard-schedule.types";

export interface DashboardTodayScheduleProps
  extends TodayScheduleProps {
    timezone?: string;
  }

function isValidDateKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T12:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function formatSelectedDate(
  value: string,
): string {
  if (!isValidDateKey(value)) {
    return "Selected date unavailable";
  }

  return new Intl.DateTimeFormat(
    DASHBOARD_SCHEDULE_LOCALE,
    {
      ...DASHBOARD_SCHEDULE_DATE_FORMAT,
      timeZone: "UTC",
    },
  ).format(new Date(`${value}T12:00:00.000Z`));
}
function getBusinessDateKey(
  timezone: string,
  now: Date,
): string {
  try {
    const parts = new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    ).formatToParts(now);

    const getPart = (type: string) =>
      parts.find((part) => part.type === type)?.value ??
      "";

    return [
      getPart("year"),
      getPart("month"),
      getPart("day"),
    ].join("-");
  } catch {
    return "";
  }
}

function getPreviewSessions(
  items: readonly DashboardScheduleItem[],
): DashboardScheduleItem[] {
  return items
    .filter(
      (item) =>
        Number.isFinite(Date.parse(item.startsAt)) &&
        Number.isFinite(item.durationMinutes) &&
        item.durationMinutes > 0 &&
        item.title.trim().length > 0,
    )
    .slice()
    .sort(
      (a, b) =>
        Date.parse(a.startsAt) -
        Date.parse(b.startsAt),
    )
    .slice(0, DASHBOARD_SCHEDULE_PREVIEW_LIMIT);
}

function ScheduleListSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading schedule sessions"
      className="space-y-0"
    >
      {Array.from({
        length: DASHBOARD_SCHEDULE_PREVIEW_LIMIT,
      }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "grid min-h-15 grid-cols-[auto_4.25rem_minmax(0,1fr)_auto]",
            "items-center gap-x-2 py-2.5",
            "sm:grid-cols-[auto_4.5rem_minmax(0,1fr)_auto]",
            index <
              DASHBOARD_SCHEDULE_PREVIEW_LIMIT - 1 &&
              "border-b border-border",
          )}
        >
          <Skeleton className="size-1.5 rounded-full" />
          <Skeleton className="h-3 w-13" />

          <div className="min-w-0 space-y-2 border-l border-border pl-2.5">
            <Skeleton className="h-3 w-30 max-w-full" />
            <Skeleton className="h-2.5 w-24 max-w-full" />
          </div>

          <Skeleton className="h-3 w-12" />
        </div>
      ))}

      <span className="sr-only">
        Loading scheduled classes and training sessions.
      </span>
    </div>
  );
}

function ScheduleEmpty() {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-48 flex-col",
        "items-center justify-center gap-3",
        "rounded-lg border border-dashed border-border",
        "px-4 py-6 text-center",
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <CalendarX2
          aria-hidden="true"
          className="size-5"
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          No sessions scheduled
        </p>

        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          There are no classes or training sessions
          scheduled for this date.
        </p>
      </div>
    </div>
  );
}

function ScheduleError({
  message,
  onRetry,
}: {
  message?: string | null;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-48 flex-col",
        "items-center justify-center gap-3",
        "rounded-lg border border-dashed",
        "border-destructive/30",
        "px-4 py-6 text-center",
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
        <AlertCircle
          aria-hidden="true"
          className="size-5"
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Unable to load schedule
        </p>

        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          {message ||
            "Something went wrong while loading the schedule."}
        </p>
      </div>

      {onRetry && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onRetry}
          className="mt-1"
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

function ScheduleList({
  data,
  selectedDate,
}: {
  data: DashboardScheduleData;
  selectedDate: string;
}) {
  /**
   * Do not display data belonging to a different date.
   * The parent should load the newly selected date.
   */
  if (data.date !== selectedDate) {
    return <ScheduleListSkeleton />;
  }

  const sessions = getPreviewSessions(data.items);

  if (sessions.length === 0) {
    return <ScheduleEmpty />;
  }

  return (
    <div
      aria-label="Scheduled sessions"
      className="min-w-0"
    >
      {sessions.map((item, index) => (
        <ScheduleItem
          key={item.id}
          item={item}
          timezone={data.timezone}
          showDivider={index < sessions.length - 1}
        />
      ))}
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function TodaySchedule({
  data,
  status,
  selectedDate,
  onDateChange,
  datesWithSessions = [],
  onRetry,
  error = null,
  timezone = DASHBOARD_SCHEDULE_TIMEZONE,
  className,
}: DashboardTodayScheduleProps) {
  const isLoading = status === "loading";
  const isError = status === "error";

  const isValidDate = isValidDateKey(selectedDate);

  const isToday =
    isValidDate &&
    selectedDate ===
      getBusinessDateKey(timezone, new Date());

  const dateLabel = formatSelectedDate(selectedDate);

  /**
   * Treat stale data as loading rather than
   * displaying a different date's sessions.
   */
  const isStale =
    status === "success" &&
    data !== null &&
    data.date !== selectedDate;

  const isEmpty =
    status === "empty" ||
    (status === "success" &&
      !isStale &&
      (!data || data.items.length === 0));

  return (
    <Card
      className={cn(
        "min-w-0 gap-0",
        "rounded-xl border-border",
        "bg-card text-card-foreground",
        "py-0 shadow-sm",
        className,
      )}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <CardHeader
        className={cn(
          "flex flex-row flex-wrap",
          "items-start justify-between",
          "gap-x-3 gap-y-2",
          "px-4 pt-4 pb-3",
          "sm:px-5 sm:pt-5",
        )}
      >
        <div className="min-w-0 space-y-1">
          <CardTitle
            className={cn(
              "flex items-center gap-2",
              "text-sm font-semibold",
              "tracking-tight text-foreground",
              "sm:text-base",
            )}
          >
            <CalendarDays
              aria-hidden="true"
              className="size-4 text-gold"
            />

            {isToday
              ? "Today's Schedule"
              : "Schedule"}
          </CardTitle>

          <CardDescription
            className="text-xs leading-relaxed text-muted-foreground"
          >
            Classes and consultations · {dateLabel}
          </CardDescription>
        </div>

        <CardAction className="self-start">
          <Link
            href="/calendar"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
              }),
              "h-8 gap-1.5 px-2",
              "text-xs font-medium text-gold",
              "hover:bg-gold-10 hover:text-gold-hover",
              "focus-visible:ring-2",
              "focus-visible:ring-ring",
            )}
          >
            View Calendar
            <ArrowRight
              aria-hidden="true"
              className="size-3.5"
            />
          </Link>
        </CardAction>
      </CardHeader>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <CardContent className="px-4 pt-1 pb-4 sm:px-5 sm:pb-5">
        <div
          className={cn(
            "grid min-w-0 grid-cols-1",
            "items-start gap-4",
            "md:grid-cols-[minmax(0,1fr)_auto]",
            "md:gap-4",
          )}
        >
          {/* Schedule list */}
          <div
            className="min-w-0"
            aria-live="polite"
            aria-busy={isLoading || isStale}
          >
            {isLoading || isStale ? (
              <ScheduleListSkeleton />
            ) : isError ? (
              <ScheduleError
                message={error}
                onRetry={onRetry}
              />
            ) : isEmpty ? (
              <ScheduleEmpty />
            ) : data ? (
              <ScheduleList
                data={data}
                selectedDate={selectedDate}
              />
            ) : (
              <ScheduleEmpty />
            )}
          </div>

          {/* Mini calendar */}
          <aside
            aria-label="Choose schedule date"
            className={cn(
              "min-w-0",
              "md:w-55",
              "lg:w-58",
            )}
          >
            <ScheduleCalendar
              selectedDate={selectedDate}
              onDateChange={onDateChange}
              datesWithSessions={
                datesWithSessions
              }
              timezone={timezone}
              disabled={!onDateChange}
              className="w-full"
            />
          </aside>
        </div>
      </CardContent>
    </Card>
  );
}