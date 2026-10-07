"use client"

import * as React from "react"

import {
  CalendarDays,
  Clock3,
  UserRound,
  type LucideIcon,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import type {
  ScheduleBookingInput,
  ScheduleClass,
} from "../types"

import {
  bookScheduleClass,
} from "../services/book-class"

import {
  formatScheduleDayLong,
  formatTime,
} from "../utils/date"

/* =========================================================
   SCHEDULE BOOKING SHEET

   Responsibilities:
   - Display selected class details
   - Collect booking information
   - Submit booking request
   - Show success / error states
   - Reset local state when the sheet closes

   Notes:
   - No setState inside useEffect
   - scheduleClass is safely narrowed to selectedClass
   - Uses Tailwind v4 canonical classes
========================================================= */

type ScheduleBookingSheetProps = {
  scheduleClass:
    | ScheduleClass
    | null

  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"

export function ScheduleBookingSheet({
  scheduleClass,
  open,
  onOpenChange,
}: ScheduleBookingSheetProps) {
  const [
    status,
    setStatus,
  ] =
    React.useState<SubmitStatus>(
      "idle"
    )

  /* =======================================================
     SHEET OPEN / CLOSE
  ======================================================= */

  function handleOpenChange(
    nextOpen: boolean
  ) {
    if (!nextOpen) {
      setStatus("idle")
    }

    onOpenChange(
      nextOpen
    )
  }

  /* =======================================================
     NO CLASS SELECTED
  ======================================================= */

  if (!scheduleClass) {
    return null
  }

  /*
   * Create a stable, non-null reference.
   *
   * TypeScript does not always preserve prop narrowing
   * inside nested async functions such as handleSubmit.
   */
  const selectedClass =
    scheduleClass

  /* =======================================================
     SUBMIT BOOKING
  ======================================================= */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const form =
      event.currentTarget

    const formData =
      new FormData(form)

    const input: ScheduleBookingInput =
      {
        classId:
          selectedClass.id,

        firstName:
          String(
            formData.get(
              "firstName"
            ) ?? ""
          ),

        lastName:
          String(
            formData.get(
              "lastName"
            ) ?? ""
          ),

        email:
          String(
            formData.get(
              "email"
            ) ?? ""
          ),

        phone:
          String(
            formData.get(
              "phone"
            ) ?? ""
          ),
      }

    setStatus(
      "submitting"
    )

    try {
      await bookScheduleClass(
        input
      )

      form.reset()

      setStatus(
        "success"
      )
    } catch {
      setStatus(
        "error"
      )
    }
  }

  const submitting =
    status ===
    "submitting"

  return (
    <Sheet
      open={open}
      onOpenChange={
        handleOpenChange
      }
    >
      <SheetContent
        side="right"
        className="
          w-full

          overflow-y-auto

          border-l
          border-foreground/10

          bg-background

          sm:max-w-120
        "
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <SheetHeader>
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-7

                bg-primary
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase

                tracking-[0.2em]

                text-primary
              "
            >
              Reserve Your Spot
            </span>
          </div>

          <SheetTitle
            className="
              mt-3

              font-heading
              text-3xl
              font-black
              uppercase

              leading-none
              tracking-[-0.035em]

              text-foreground
            "
          >
            {
              selectedClass.title
            }
          </SheetTitle>

          <SheetDescription
            className="
              text-sm
              leading-6

              text-text-secondary
            "
          >
            Confirm your class
            details and tell us
            how to reach you.
          </SheetDescription>
        </SheetHeader>

        {/* =================================================
            CLASS DETAILS
        ================================================== */}

        <div
          className="
            mx-4
            mt-6

            rounded-xl

            border
            border-foreground/10

            bg-surface-dark

            p-5
          "
        >
          <BookingDetail
            icon={
              CalendarDays
            }
          >
            {formatScheduleDayLong(
              selectedClass.date
            )}
          </BookingDetail>

          <BookingDetail
            icon={Clock3}
          >
            {formatTime(
              selectedClass.startTime
            )}

            {" — "}

            {formatTime(
              selectedClass.endTime
            )}
          </BookingDetail>

          {selectedClass.coach && (
            <BookingDetail
              icon={
                UserRound
              }
            >
              Coach{" "}

              {
                selectedClass
                  .coach.name
              }
            </BookingDetail>
          )}
        </div>

        {/* =================================================
            BOOKING SUCCESS
        ================================================== */}

        {status ===
        "success" ? (
          <div
            className="
              mx-4
              mt-6

              overflow-hidden

              rounded-xl

              border
              border-primary/30

              bg-primary/5
            "
          >
            {/* GOLD ACCENT */}

            <div
              aria-hidden="true"
              className="
                h-0.5
                w-full

                bg-primary
              "
            />

            <div className="p-6">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-primary
                "
              >
                Booking Confirmed
              </p>

              <h3
                className="
                  mt-3

                  font-heading
                  text-2xl
                  font-black
                  uppercase

                  leading-tight
                  tracking-tight

                  text-foreground
                "
              >
                You&apos;re In.
              </h3>

              <p
                className="
                  mt-3

                  text-sm
                  leading-6

                  text-text-secondary
                "
              >
                Your booking
                request has been
                completed for{" "}

                <span
                  className="
                    font-semibold
                    text-foreground
                  "
                >
                  {
                    selectedClass.title
                  }
                </span>
                .
              </p>

              {/* CLASS CONFIRMATION */}

              <div
                className="
                  mt-5

                  rounded-lg

                  border
                  border-foreground/10

                  bg-background/60

                  px-4
                  py-3
                "
              >
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase

                    tracking-[0.14em]

                    text-primary
                  "
                >
                  {
                    formatScheduleDayLong(
                      selectedClass.date
                    )
                  }
                </p>

                <p
                  className="
                    mt-1

                    text-sm
                    font-semibold

                    text-foreground
                  "
                >
                  {formatTime(
                    selectedClass.startTime
                  )}

                  {" — "}

                  {formatTime(
                    selectedClass.endTime
                  )}
                </p>
              </div>

              {/* DONE */}

              <button
                type="button"
                onClick={() =>
                  handleOpenChange(
                    false
                  )
                }
                className="
                  mt-5

                  min-h-11
                  w-full

                  rounded-md

                  border
                  border-primary/70

                  bg-primary

                  px-5

                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.08em]

                  text-primary-foreground

                  shadow-(--shadow-gold-xs)

                  transition-[background-color,box-shadow]
                  duration-200

                  hover:bg-gold-hover
                  hover:shadow-(--shadow-gold-sm)

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                "
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* =================================================
             BOOKING FORM
          ================================================== */

          <form
            onSubmit={
              handleSubmit
            }
            className="
              mx-4
              mt-6

              space-y-4

              pb-6
            "
          >
            {/* ===============================================
                NAME
            ================================================ */}

            <div
              className="
                grid
                grid-cols-1

                gap-4

                sm:grid-cols-2
              "
            >
              <BookingField
                id="firstName"
                name="firstName"
                label="First Name"
                autoComplete="given-name"
                required
              />

              <BookingField
                id="lastName"
                name="lastName"
                label="Last Name"
                autoComplete="family-name"
                required
              />
            </div>

            {/* ===============================================
                EMAIL
            ================================================ */}

            <BookingField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              autoComplete="email"
              required
            />

            {/* ===============================================
                PHONE
            ================================================ */}

            <BookingField
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              required
            />

            {/* ===============================================
                ERROR
            ================================================ */}

            {status ===
              "error" && (
              <div
                role="alert"
                className="
                  rounded-md

                  border
                  border-destructive/25

                  bg-destructive/5

                  px-4
                  py-3
                "
              >
                <p
                  className="
                    text-xs
                    font-medium
                    leading-5

                    text-destructive
                  "
                >
                  We couldn&apos;t
                  complete the booking.
                  Please try again.
                </p>
              </div>
            )}

            {/* ===============================================
                SUBMIT
            ================================================ */}

            <button
              type="submit"
              disabled={
                submitting
              }
              className="
                min-h-12
                w-full

                rounded-md

                border
                border-primary/70

                bg-primary

                px-6

                text-[10px]
                font-bold
                uppercase

                tracking-[0.08em]

                text-primary-foreground

                shadow-(--shadow-gold-sm)

                transition-[background-color,box-shadow,opacity]
                duration-200

                hover:bg-gold-hover
                hover:shadow-(--shadow-gold-md)

                disabled:pointer-events-none
                disabled:opacity-60

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
              "
            >
              {submitting
                ? "Booking..."
                : "Confirm Booking"}
            </button>

            {/* ===============================================
                PRIVACY
            ================================================ */}

            <p
              className="
                text-center

                text-[9px]
                leading-5

                text-text-muted
              "
            >
              By booking this
              class, you&apos;re
              asking Rebel Boxing
              Club to reserve a
              spot using the
              information above.
            </p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}

/* =========================================================
   BOOKING DETAIL
========================================================= */

type BookingDetailProps = {
  icon: LucideIcon

  children:
    React.ReactNode
}

function BookingDetail({
  icon: Icon,
  children,
}: BookingDetailProps) {
  return (
    <div
      className="
        flex
        items-center

        gap-3

        border-b
        border-foreground/8

        py-3

        first:pt-0

        last:border-b-0
        last:pb-0
      "
    >
      <span
        className="
          flex
          size-8
          shrink-0

          items-center
          justify-center

          rounded-full

          border
          border-primary/25

          bg-primary/5

          text-primary
        "
      >
        <Icon
          aria-hidden={true}
          strokeWidth={1.6}
          className="size-3.5"
        />
      </span>

      <span
        className="
          text-sm
          font-medium

          text-text-soft
        "
      >
        {children}
      </span>
    </div>
  )
}

/* =========================================================
   BOOKING FIELD
========================================================= */

type BookingFieldProps = {
  id: string
  name: string
  label: string

  type?:
    | "text"
    | "email"
    | "tel"

  autoComplete?: string

  required?: boolean
}

function BookingField({
  id,
  name,
  label,

  type = "text",

  autoComplete,

  required = false,
}: BookingFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          block

          text-[9px]
          font-bold
          uppercase

          tracking-[0.16em]

          text-text-secondary
        "
      >
        {label}

        {required && (
          <span
            aria-hidden="true"
            className="
              text-primary
            "
          >
            {" "}
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={
          autoComplete
        }
        className="
          min-h-11
          w-full

          rounded-md

          border
          border-foreground/15

          bg-surface

          px-4

          text-sm
          text-foreground

          outline-none

          transition-[border-color,box-shadow,background-color]
          duration-200

          hover:border-foreground/25

          focus:border-primary/55
          focus:bg-surface-card
          focus:ring-2
          focus:ring-primary/15
        "
      />
    </div>
  )
}