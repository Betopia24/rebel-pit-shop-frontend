"use client"

import { useMemo, useState, type FormEvent } from "react"
import { CalendarPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type {
  Booking,
  BookingClass,
  BookingCoach,
  BookingCustomer,
  BookingStatus,
  BookingType,
} from "../types/booking.types"

export interface CreateManualBookingInput {
  customerId: BookingCustomer["id"]
  classId: BookingClass["id"]
  coachId: BookingCoach["id"] | null
  type: BookingType
  status: BookingStatus
  date: string
  time: string
  durationMinutes: number
}

interface CreateBookingDialogProps {
  customers: readonly BookingCustomer[]
  classes: readonly BookingClass[]
  coaches: readonly BookingCoach[]
  onCreate: (input: CreateManualBookingInput) => void
}

const BOOKING_TYPE_OPTIONS: readonly {
  value: BookingType
  label: string
}[] = [
  { value: "free_class", label: "Free Class" },
  { value: "member", label: "Membership Session" },
  { value: "personal_training", label: "Personal Training" },
  { value: "consultation", label: "Consultation" },
]

const BOOKING_STATUS_OPTIONS: readonly {
  value: BookingStatus
  label: string
}[] = [
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "waitlist", label: "Waitlist" },
]

const FIELD_CLASS_NAME =
  "h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30"

export function CreateBookingDialog({
  customers,
  classes,
  coaches,
  onCreate,
}: CreateBookingDialogProps) {
  const [open, setOpen] = useState(false)
  const [customerId, setCustomerId] = useState(customers[0]?.id ?? "")
  const [classId, setClassId] = useState(classes[0]?.id ?? "")
  const [coachId, setCoachId] = useState<string>(classes[0]?.coach?.id ?? "")
  const [type, setType] = useState<BookingType>("free_class")
  const [status, setStatus] = useState<BookingStatus>("confirmed")
  const [date, setDate] = useState("2025-04-23")
  const [time, setTime] = useState("09:00")
  const [durationMinutes, setDurationMinutes] = useState("60")

  const selectedClass = useMemo(
    () => classes.find((item) => item.id === classId) ?? null,
    [classes, classId]
  )

  const resetForm = () => {
    const firstClass = classes[0]

    setCustomerId(customers[0]?.id ?? "")
    setClassId(firstClass?.id ?? "")
    setCoachId(firstClass?.coach?.id ?? "")
    setType("free_class")
    setStatus("confirmed")
    setDate("2025-04-23")
    setTime("09:00")
    setDurationMinutes("60")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!customerId || !classId || !date || !time) return

    onCreate({
      customerId,
      classId,
      coachId: coachId || null,
      type,
      status,
      date,
      time,
      durationMinutes: Math.max(15, Number(durationMinutes) || 60),
    })

    setOpen(false)
    resetForm()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) resetForm()
      }}
    >
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="h-9 gap-2 bg-gold text-black hover:bg-gold/90"
      >
        <CalendarPlus aria-hidden="true" className="size-4" />
        Create Booking
      </Button>

      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-xl overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle>Create a booking</DialogTitle>
          <DialogDescription>
            Add a booking manually. It will be saved in demo mode until the
            backend is connected.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="booking-customer">Customer</Label>
              <select
                id="booking-customer"
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
                className={FIELD_CLASS_NAME}
                required
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ·{" "}
                    {customer.kind === "member" ? "Member" : "Visitor"}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-class">Class / Service</Label>
              <select
                id="booking-class"
                value={classId}
                onChange={(event) => {
                  const nextClassId = event.target.value
                  const nextClass = classes.find(
                    (item) => item.id === nextClassId
                  )

                  setClassId(nextClassId)
                  setCoachId(nextClass?.coach?.id ?? "")
                }}
                className={FIELD_CLASS_NAME}
                required
              >
                {classes.map((bookingClass) => (
                  <option key={bookingClass.id} value={bookingClass.id}>
                    {bookingClass.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-type">Booking Type</Label>
              <select
                id="booking-type"
                value={type}
                onChange={(event) => setType(event.target.value as BookingType)}
                className={FIELD_CLASS_NAME}
              >
                {BOOKING_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-coach">Coach</Label>
              <select
                id="booking-coach"
                value={coachId}
                onChange={(event) => setCoachId(event.target.value)}
                className={FIELD_CLASS_NAME}
              >
                <option value="">Unassigned</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-status">Status</Label>
              <select
                id="booking-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as BookingStatus)
                }
                className={FIELD_CLASS_NAME}
              >
                {BOOKING_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-date">Date</Label>
              <Input
                id="booking-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-time">Start time</Label>
              <Input
                id="booking-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-duration">Duration (minutes)</Label>
              <Input
                id="booking-duration"
                type="number"
                min={15}
                step={15}
                value={durationMinutes}
                onChange={(event) => setDurationMinutes(event.target.value)}
                required
              />
            </div>
          </div>

          {selectedClass && (
            <p className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              Location:{" "}
              <span className="font-medium text-foreground">
                {selectedClass.location ?? "Not specified"}
              </span>
            </p>
          )}

          <DialogFooter className="-mx-4 -mb-4 rounded-b-xl border-t border-border bg-muted/20 px-4 py-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gold text-black hover:bg-gold/90"
            >
              Create Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
