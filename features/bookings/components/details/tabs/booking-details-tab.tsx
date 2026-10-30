import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { BookingCustomerInfo } from "../sections/booking-customer-info"
import { BookingClassInfo } from "../sections/booking-class-info"
import { BookingStatusInfo } from "../sections/booking-status-info"

import {
  BookingAdditionalInfo,
  BookingSourceInfo,
} from "../sections/booking-source-info"

import type { BookingDetails } from "../../../types/booking-details.types"

export interface BookingDetailsTabProps {
  details: BookingDetails
  onViewLead?: () => void
  leadHref?: string | null
  showPreviousBookings?: boolean
  showClassDescription?: boolean
  showSessionAvailability?: boolean
  showStatusHistory?: boolean
  showAllowedTransitions?: boolean
  showEmptyAdditionalInfo?: boolean
  className?: string
}

/* ============================================================
   SECTION DIVIDER
============================================================ */

function BookingDetailsDivider() {
  return <Separator aria-hidden="true" className="bg-border" />
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export function BookingDetailsTab({
  details,
  onViewLead,
  leadHref = null,
  showPreviousBookings = false,
  showClassDescription = false,
  showSessionAvailability = true,
  showStatusHistory = false,
  showAllowedTransitions = false,
  showEmptyAdditionalInfo = false,
  className,
}: BookingDetailsTabProps) {
  const { booking, details: bookingInformation } = details

  const { customer, classInformation, status, source, additionalInformation } =
    bookingInformation

  return (
    <div className={cn("flex min-w-0 flex-col", "gap-4 pb-4", className)}>
      {/* ======================================================
          1. CUSTOMER INFORMATION
      ====================================================== */}

      <BookingCustomerInfo
        data={customer}
        onViewLead={onViewLead}
        leadHref={leadHref}
        showPreviousBookings={showPreviousBookings}
      />

      <BookingDetailsDivider />

      {/* ======================================================
          2. CLASS INFORMATION
      ====================================================== */}

      <BookingClassInfo
        booking={booking}
        data={classInformation}
        showDescription={showClassDescription}
        showAvailability={showSessionAvailability}
      />

      <BookingDetailsDivider />

      {/* ======================================================
          3. BOOKING STATUS
      ====================================================== */}

      <BookingStatusInfo
        booking={booking}
        data={status}
        showHistory={showStatusHistory}
        showAllowedTransitions={showAllowedTransitions}
        showSource={false}
      />

      <BookingDetailsDivider />

      {/* ======================================================
          4. BOOKING SOURCE
      ====================================================== */}

      <BookingSourceInfo booking={booking} data={source} />

      {/* ======================================================
          5. ADDITIONAL INFORMATION
      ====================================================== */}

      <BookingAdditionalInfo
        data={additionalInformation}
        specialRequests={customer.specialRequests}
        showEmptyState={showEmptyAdditionalInfo}
        className="border-t border-border pt-4"
      />
    </div>
  )
}

export default BookingDetailsTab
