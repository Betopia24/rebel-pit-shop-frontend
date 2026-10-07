import type {
  ScheduleClassType,
  ScheduleCoach,
} from "../types"

export type MockScheduleTemplate = {
  id: string

  weekday: number

  title: string
  type: ScheduleClassType

  coach: ScheduleCoach | null

  startTime: string
  endTime: string

  durationMinutes: number

  capacity: number
  bookedCount: number

  bookingEnabled: boolean
}

const nichole: ScheduleCoach = {
  id: "coach-nichole",
  name: "Nichole",
  slug: "nichole",
}

const nhut: ScheduleCoach = {
  id: "coach-nhut",
  name: "Nhut",
  slug: "nhut",
}

const john: ScheduleCoach = {
  id: "coach-john",
  name: "John",
  slug: "john",
}

const moses: ScheduleCoach = {
  id: "coach-moses",
  name: "Moses",
  slug: "moses",
}

const devin: ScheduleCoach = {
  id: "coach-devin",
  name: "Devin",
  slug: "devin",
}

const kelsey: ScheduleCoach = {
  id: "coach-kelsey",
  name: "Kelsey",
  slug: "kelsey",
}

export const mockScheduleTemplates: MockScheduleTemplate[] =
  [
    /* =======================================================
       MONDAY
    ======================================================= */

    {
      id: "mon-boxing-0600",
      weekday: 0,

      title: "Boxing Fitness",
      type: "boxing",

      coach: nichole,

      startTime: "06:00",
      endTime: "07:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 8,

      bookingEnabled: true,
    },

    {
      id: "mon-kickboxing-1000",
      weekday: 0,

      title: "Kickboxing",
      type: "kickboxing",

      coach: john,

      startTime: "10:00",
      endTime: "11:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 12,

      bookingEnabled: true,
    },

    {
      id: "mon-strength-1800",
      weekday: 0,

      title: "Strength & Boxing",
      type: "strength",

      coach: moses,

      startTime: "18:00",
      endTime: "19:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 5,

      bookingEnabled: true,
    },

    /* =======================================================
       TUESDAY
    ======================================================= */

    {
      id: "tue-kickboxing-0800",
      weekday: 1,

      title: "Kickboxing",
      type: "kickboxing",

      coach: devin,

      startTime: "08:00",
      endTime: "09:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 4,

      bookingEnabled: true,
    },

    {
      id: "tue-boxing-1200",
      weekday: 1,

      title: "Boxing Fitness",
      type: "boxing",

      coach: nichole,

      startTime: "12:00",
      endTime: "13:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 6,

      bookingEnabled: true,
    },

    {
      id: "tue-conditioning-1800",
      weekday: 1,

      title: "Conditioning",
      type: "conditioning",

      coach: kelsey,

      startTime: "18:00",
      endTime: "19:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 7,

      bookingEnabled: true,
    },

    /* =======================================================
       WEDNESDAY
    ======================================================= */

    {
      id: "wed-boxing-0600",
      weekday: 2,

      title: "Boxing Fitness",
      type: "boxing",

      coach: nhut,

      startTime: "06:00",
      endTime: "07:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 6,

      bookingEnabled: true,
    },

    {
      id: "wed-conditioning-1000",
      weekday: 2,

      title: "Conditioning",
      type: "conditioning",

      coach: kelsey,

      startTime: "10:00",
      endTime: "11:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 9,

      bookingEnabled: true,
    },

    {
      id: "wed-kickboxing-1600",
      weekday: 2,

      title: "Kickboxing",
      type: "kickboxing",

      coach: john,

      startTime: "16:00",
      endTime: "17:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 5,

      bookingEnabled: true,
    },

    {
      id: "wed-boxing-1800",
      weekday: 2,

      title: "Boxing Fitness",
      type: "boxing",

      coach: moses,

      startTime: "18:00",
      endTime: "19:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 10,

      bookingEnabled: true,
    },

    {
      id: "wed-open-gym-2000",
      weekday: 2,

      title: "Open Gym",
      type: "open-gym",

      coach: null,

      startTime: "20:00",
      endTime: "21:00",

      durationMinutes: 60,

      capacity: 20,
      bookedCount: 0,

      bookingEnabled: false,
    },

    /* =======================================================
       THURSDAY
    ======================================================= */

    {
      id: "thu-boxing-0800",
      weekday: 3,

      title: "Boxing Fitness",
      type: "boxing",

      coach: nichole,

      startTime: "08:00",
      endTime: "09:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 7,

      bookingEnabled: true,
    },

    {
      id: "thu-kickboxing-1200",
      weekday: 3,

      title: "Kickboxing",
      type: "kickboxing",

      coach: devin,

      startTime: "12:00",
      endTime: "13:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 6,

      bookingEnabled: true,
    },

    {
      id: "thu-conditioning-1800",
      weekday: 3,

      title: "Conditioning",
      type: "conditioning",

      coach: kelsey,

      startTime: "18:00",
      endTime: "19:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 8,

      bookingEnabled: true,
    },

    /* =======================================================
       FRIDAY
    ======================================================= */

    {
      id: "fri-strength-0600",
      weekday: 4,

      title: "Strength & Boxing",
      type: "strength",

      coach: moses,

      startTime: "06:00",
      endTime: "07:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 4,

      bookingEnabled: true,
    },

    {
      id: "fri-boxing-1000",
      weekday: 4,

      title: "Boxing Fitness",
      type: "boxing",

      coach: nhut,

      startTime: "10:00",
      endTime: "11:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 5,

      bookingEnabled: true,
    },

    {
      id: "fri-kickboxing-1800",
      weekday: 4,

      title: "Kickboxing",
      type: "kickboxing",

      coach: john,

      startTime: "18:00",
      endTime: "19:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 9,

      bookingEnabled: true,
    },

    /* =======================================================
       SATURDAY
    ======================================================= */

    {
      id: "sat-boxing-0800",
      weekday: 5,

      title: "Boxing Fitness",
      type: "boxing",

      coach: nichole,

      startTime: "08:00",
      endTime: "09:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 8,

      bookingEnabled: true,
    },

    {
      id: "sat-conditioning-1200",
      weekday: 5,

      title: "Conditioning",
      type: "conditioning",

      coach: kelsey,

      startTime: "12:00",
      endTime: "13:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 6,

      bookingEnabled: true,
    },

    {
      id: "sat-boxing-1600",
      weekday: 5,

      title: "Boxing Fitness",
      type: "boxing",

      coach: moses,

      startTime: "16:00",
      endTime: "17:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 2,

      bookingEnabled: true,
    },

    /* =======================================================
       SUNDAY
    ======================================================= */

    {
      id: "sun-kickboxing-1000",
      weekday: 6,

      title: "Kickboxing",
      type: "kickboxing",

      coach: devin,

      startTime: "10:00",
      endTime: "11:00",

      durationMinutes: 60,

      capacity: 12,
      bookedCount: 6,

      bookingEnabled: true,
    },

    {
      id: "sun-open-gym-1800",
      weekday: 6,

      title: "Open Gym",
      type: "open-gym",

      coach: null,

      startTime: "18:00",
      endTime: "19:00",

      durationMinutes: 60,

      capacity: 20,
      bookedCount: 0,

      bookingEnabled: false,
    },
  ]