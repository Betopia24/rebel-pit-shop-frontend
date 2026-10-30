
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type {
  BookingCustomer,
} from "../../../types/booking.types";
import type {
  BookingCustomerDetails,
} from "../../../types/booking-details.types";

export interface BookingCustomerInfoProps {
    data: BookingCustomerDetails;
    onViewLead?: () => void;
    leadHref?: string | null;
    showPreviousBookings?: boolean;
    className?: string;
}

/* ============================================================
   HELPERS
============================================================ */

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

function normalizeText(
  value: string | null | undefined,
): string | null {
  return value?.trim() || null;
}


function getSafeLeadHref(
  href: string | null | undefined,
): string | null {
  if (!href) return null;

  if (
    href === "/leads" ||
    href.startsWith("/leads?") ||
    href.startsWith("/leads/")
  ) {
    return href;
  }

  return null;
}

/* ============================================================
   CONTACT INFORMATION
============================================================ */

interface CustomerContactRowProps {
  icon: ReactNode;
  label: string;
  value: string | null;
  href?: string;
}

function CustomerContactRow({
  icon,
  label,
  value,
  href,
}: CustomerContactRowProps) {
  const displayValue = value ?? "Not provided";

  const content = (
    <span
      className={cn(
        "block min-w-0 truncate",
        "text-[11px] leading-4",
        value
          ? "font-medium text-foreground"
          : "text-muted-foreground",
        href &&
          "underline-offset-2 hover:text-gold hover:underline",
      )}
    >
      {displayValue}
    </span>
  );

  return (
    <div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-start gap-2 py-1.5">
      <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <span aria-hidden="true">{icon}</span>
        {label}
      </span>

      <Tooltip>
        <TooltipTrigger
          render={
            href && value ? (
              <a
                href={href}
                className="min-w-0 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            ) : (
              <span
                tabIndex={0}
                className="min-w-0 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            )
          }
        >
          {content}
        </TooltipTrigger>

        <TooltipContent
          side="top"
          className="max-w-72 break-all"
        >
          {displayValue}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

/* ============================================================
   CUSTOMER STATUS
============================================================ */

function CustomerKindBadge({
  customer,
}: {
  customer: BookingCustomer;
}) {
  const isMember = customer.kind === "member";

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-5 w-fit rounded-md",
        "px-1.5 py-0 text-[10px]",
        "font-medium shadow-none",
        isMember
          ? "border-success/20 bg-success/10 text-success"
          : "border-border bg-muted text-muted-foreground",
      )}
    >
      {isMember ? "Member" : "Visitor"}
    </Badge>
  );
}

/* ============================================================
   VIEW LEAD ACTION
============================================================ */

function ViewLeadAction({
  onViewLead,
  leadHref,
}: {
  onViewLead?: () => void;
  leadHref?: string | null;
}) {
  const safeHref = getSafeLeadHref(leadHref);

  const actionClassName = cn(
    "h-7 shrink-0 gap-1",
    "rounded-md px-2",
    "text-[10px] font-medium",
    "text-gold hover:text-gold",
    "hover:bg-gold-10",
  );

  if (onViewLead) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onViewLead}
        className={actionClassName}
      >
        View Lead
        <ArrowUpRight
          aria-hidden="true"
          className="size-3"
        />
      </Button>
    );
  }

  if (safeHref) {
    return (
      <Button
        variant="ghost"
        size="sm"
        render={<Link href={safeHref} />}
        className={actionClassName}
      >
        View Lead
        <ArrowUpRight
          aria-hidden="true"
          className="size-3"
        />
      </Button>
    );
  }

  return null;
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingCustomerInfo({
  data,
  onViewLead,
  leadHref,
  showPreviousBookings = false,
  className,
}: BookingCustomerInfoProps) {
  const customer = data.customer;

  const name =
    normalizeText(customer.name) ??
    "Unknown Customer";

  const phone = normalizeText(customer.phone);
  const email = normalizeText(customer.email);

  const hasLead = Boolean(customer.leadId);

  const canViewLead =
    hasLead &&
    (Boolean(onViewLead) ||
      Boolean(getSafeLeadHref(leadHref)));

  const phoneHref = phone
    ? `tel:${phone.replace(/[^\d+]/g, "")}`
    : undefined;

  const emailHref = email
    ? `mailto:${email}`
    : undefined;

  return (
    <section
      aria-label="Booking customer information"
      className={cn("min-w-0", className)}
    >
      {/* ======================================================
          CUSTOMER IDENTITY
      ====================================================== */}

      <div className="flex min-w-0 items-start gap-3">
        <Avatar className="size-10 shrink-0">
          {customer.avatarUrl && (
            <AvatarImage
              src={customer.avatarUrl}
              alt={name}
            />
          )}

          <AvatarFallback
            className={cn(
              "bg-muted text-xs",
              "font-semibold text-foreground",
            )}
          >
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="min-w-0 truncate text-xs font-semibold text-foreground">
              {name}
            </h3>

            <CustomerKindBadge customer={customer} />
          </div>

          <div className="min-w-0">
            <CustomerContactRow
              icon={<Phone className="size-3" />}
              label="Phone"
              value={phone}
              href={phoneHref}
            />

            <CustomerContactRow
              icon={<Mail className="size-3" />}
              label="Email"
              value={email}
              href={emailHref}
            />
          </div>
        </div>

        {canViewLead && (
          <ViewLeadAction
            onViewLead={onViewLead}
            leadHref={leadHref}
          />
        )}
      </div>

      {/* ======================================================
          OPTIONAL CUSTOMER HISTORY
      ====================================================== */}

      {showPreviousBookings &&
        data.previousBookingsCount !== null && (
          <div
            className={cn(
              "mt-3 flex items-center gap-2",
              "rounded-md border border-border",
              "bg-muted/25 px-3 py-2",
            )}
          >
            <UserRound
              aria-hidden="true"
              className="size-3.5 text-muted-foreground"
            />

            <span className="text-[11px] text-muted-foreground">
              Previous bookings
            </span>

            <span className="ml-auto text-[11px] font-semibold tabular-nums text-foreground">
              {data.previousBookingsCount}
            </span>
          </div>
        )}
    </section>
  );
}

export default BookingCustomerInfo;
