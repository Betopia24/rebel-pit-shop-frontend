export const SCHEDULE_TIME_ZONE =
  "America/Chicago"

export type ScheduleClassType =
  | "boxing"
  | "kickboxing"
  | "conditioning"
  | "strength"
  | "open-gym"

export type ScheduleAvailability =
  | "available"
  | "limited"
  | "full"
  | "cancelled"

export type ScheduleCoach = {
  id: string
  name: string
  slug: string
}

export type ScheduleClass = {
  id: string

  title: string
  type: ScheduleClassType

  coach: ScheduleCoach | null

  date: string

  startTime: string
  endTime: string

  durationMinutes: number

  capacity: number
  bookedCount: number

  availability: ScheduleAvailability

  bookingEnabled: boolean
}

export type ScheduleDay = {
  date: string
  classes: ScheduleClass[]
}

export type ScheduleWeek = {
  startDate: string
  endDate: string

  timeZone: string

  days: ScheduleDay[]
}

export type ScheduleFilters = {
  classType: "all" | ScheduleClassType
  coachId: "all" | string
  duration: "all" | string
}

export type ScheduleBookingInput = {
  classId: string

  firstName: string
  lastName: string

  email: string
  phone: string
}