import type { ReactNode } from "react";

import {
  CalendarDays,
  ClipboardList,
  ExternalLink,
  Flag,
  Hash,
  MessageSquareText,
  Target,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { BookingSourceIcon } from "../../shared/booking-source-icon";

import type { Booking } from "../../../types/booking.types";

import type {
  BookingAdditionalInformation,
  BookingSourceDetails,
} from "../../../types/booking-details.types";


export interface BookingSourceInfoProps {
    booking: Booking;
    data: BookingSourceDetails;
    showCampaign?: boolean;
    showExternalReference?: boolean;
    className?: string;
}

export interface BookingAdditionalInfoProps {
    data: BookingAdditionalInformation;
    specialRequests?: string | null;
    showEmptyState?: boolean;
    className?: string;
}

export interface BookingSourceAndAdditionalInfoProps {
    booking: Booking;
    source: BookingSourceDetails;
    additionalInformation: BookingAdditionalInformation;
    specialRequests?: string | null;
    className?: string;
}


function normalizeText(
  value: string | null | undefined,
): string | null {
  return value?.trim() || null;
}

function formatDateTime(
  value: string,
  timezone: string,
): string {
  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return "Not available";
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
    }).format(date);
  } catch {
    return "Not available";
  }
}

function formatExperienceLevel(
  value: BookingAdditionalInformation["experienceLevel"],
): string | null {
  if (!value || value === "unknown") {
    return null;
  }

  return value
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

/* ============================================================
   REUSABLE INFORMATION ROW
============================================================ */

interface InformationRowProps {
  icon: ReactNode;

  label: string;

  children: ReactNode;

  className?: string;
}

function InformationRow({
  icon,
  label,
  children,
  className,
}: InformationRowProps) {
  return (
    <div
      className={cn(
        "grid min-w-0",
        "grid-cols-[104px_minmax(0,1fr)]",
        "items-start gap-3 py-2",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-0 items-center gap-1.5",
          "text-[10px] leading-4",
          "text-muted-foreground",
        )}
      >
        <span
          aria-hidden="true"
          className="shrink-0"
        >
          {icon}
        </span>

        <span>{label}</span>
      </div>

      <div
        className={cn(
          "min-w-0 break-words",
          "text-[11px] font-medium",
          "leading-relaxed text-foreground",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   BOOKING SOURCE SECTION
============================================================ */

export function BookingSourceInfo({
  booking,
  data,
  showCampaign = true,
  showExternalReference = true,
  className,
}: BookingSourceInfoProps) {
  const campaignName = normalizeText(
    data.campaignName,
  );

  const externalReference = normalizeText(
    data.externalReference ??
      data.source.externalReference,
  );

  const createdAt =
    data.source.createdAt ||
    booking.createdAt;

  const timezone =
    booking.schedule.timezone || "UTC";

  return (
    <section
      aria-label="Booking source information"
      className={cn(
        "min-w-0 space-y-2",
        className,
      )}
    >
      <h3 className="text-xs font-semibold text-foreground">
        Booking Source
      </h3>

      <div className="space-y-0.5">
        {/* Source channel */}
        <InformationRow
          icon={
            <ExternalLink className="size-3.5" />
          }
          label="Source"
        >
          <BookingSourceIcon
            source={data.source.channel}
            appearance="label"
            size="sm"
            showTooltip={false}
          />
        </InformationRow>

        {/* Created date */}
        <InformationRow
          icon={
            <CalendarDays className="size-3.5" />
          }
          label="Booked At"
        >
          <time dateTime={createdAt}>
            {formatDateTime(
              createdAt,
              timezone,
            )}
          </time>
        </InformationRow>

        {/* Campaign */}
        {showCampaign && campaignName && (
          <InformationRow
            icon={<Flag className="size-3.5" />}
            label="Campaign"
          >
            {campaignName}
          </InformationRow>
        )}

        {/* External booking reference */}
        {showExternalReference &&
          externalReference && (
            <InformationRow
              icon={
                <Hash className="size-3.5" />
              }
              label="Reference"
            >
              <span className="font-mono text-[10px]">
                {externalReference}
              </span>
            </InformationRow>
          )}
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE LEVEL
============================================================ */

function ExperienceLevelBadge({
  level,
}: {
  level: BookingAdditionalInformation["experienceLevel"];
}) {
  const label = formatExperienceLevel(level);

  if (!label) return null;

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-5 w-fit rounded-md",
        "border-border bg-muted/40",
        "px-2 py-0",
        "text-[10px] font-medium",
        "text-foreground shadow-none",
      )}
    >
      {label}
    </Badge>
  );
}

/* ============================================================
   ADDITIONAL INFORMATION SECTION
============================================================ */

export function BookingAdditionalInfo({
  data,
  specialRequests = null,
  showEmptyState = false,
  className,
}: BookingAdditionalInfoProps) {
  const experienceLevel =
    formatExperienceLevel(
      data.experienceLevel,
    );

  const goal = normalizeText(data.goal);

  const notes = normalizeText(data.notes);

  const requests = normalizeText(
    specialRequests,
  );

  const customFields = data.customFields.filter(
    (field) =>
      normalizeText(field.label) !== null &&
      normalizeText(field.value) !== null,
  );

  const hasContent = Boolean(
    experienceLevel ||
      goal ||
      notes ||
      requests ||
      customFields.length > 0,
  );

  if (!hasContent && !showEmptyState) {
    return null;
  }

  return (
    <section
      aria-label="Additional booking information"
      className={cn(
        "min-w-0 space-y-3",
        className,
      )}
    >
      <h3 className="text-xs font-semibold text-foreground">
        Additional Information
      </h3>

      {!hasContent ? (
        <div
          className={cn(
            "rounded-lg border",
            "border-dashed border-border",
            "bg-muted/20 px-3 py-4",
            "text-center",
          )}
        >
          <p className="text-[11px] text-muted-foreground">
            No additional information provided.
          </p>
        </div>
      ) : (
        <div className="space-y-0.5">
          {/* Experience */}
          {experienceLevel && (
            <InformationRow
              icon={
                <UserRound className="size-3.5" />
              }
              label="Experience"
            >
              <ExperienceLevelBadge
                level={data.experienceLevel}
              />
            </InformationRow>
          )}

          {/* Training goal */}
          {goal && (
            <InformationRow
              icon={
                <Target className="size-3.5" />
              }
              label="Goal"
            >
              {goal}
            </InformationRow>
          )}

          {/* Special requests */}
          {requests && (
            <InformationRow
              icon={
                <MessageSquareText className="size-3.5" />
              }
              label="Requests"
            >
              {requests}
            </InformationRow>
          )}

          {/* Additional notes */}
          {notes && (
            <InformationRow
              icon={
                <ClipboardList className="size-3.5" />
              }
              label="Notes"
            >
              {notes}
            </InformationRow>
          )}

          {/* Custom fields */}
          {customFields.length > 0 && (
            <div
              className={cn(
                "space-y-2 pt-2",
                "border-t border-border",
              )}
            >
              <h4 className="text-[10px] font-semibold text-muted-foreground">
                Custom Information
              </h4>

              <dl className="space-y-2">
                {customFields.map((field) => (
                  <div
                    key={field.id}
                    className={cn(
                      "flex flex-wrap items-start",
                      "justify-between gap-2",
                    )}
                  >
                    <dt className="text-[10px] text-muted-foreground">
                      {field.label}
                    </dt>

                    <dd
                      className={cn(
                        "min-w-0 max-w-full",
                        "break-words text-right",
                        "text-[11px] font-medium",
                        "text-foreground",
                      )}
                    >
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ============================================================
   COMBINED COMPONENT
============================================================ */

/**
 * Convenience composition for the
 * Booking Details tab.
 *
 * Import individual sections when
 * a different layout is needed.
 */
export function BookingSourceAndAdditionalInfo({
  booking,
  source,
  additionalInformation,
  specialRequests = null,
  className,
}: BookingSourceAndAdditionalInfoProps) {
  return (
    <div
      className={cn(
        "min-w-0 space-y-4",
        className,
      )}
    >
      <BookingSourceInfo
        booking={booking}
        data={source}
      />

      <Separator />

      <BookingAdditionalInfo
        data={additionalInformation}
        specialRequests={specialRequests}
      />
    </div>
  );
}