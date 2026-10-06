export type ScheduleDayId =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun"


export type ScheduleLevel =
  | "Beginner"
  | "All Levels"
  | "Intermediate"
  | "Advanced"
  | "Youth"
  | "Members Only"


export type Coach = {
  id: string
  name: string
  avatar?: string
}


export type CoachProfile = Coach & {
  role: string
  specialties: string[]
  credentials: string[]
  bio: string[]
}


export type ScheduleClass = {
  id: string

  title: string
  description: string

  startTime: string
  endTime: string

  level: ScheduleLevel

  joined: number

  coach: Coach
}


export type ScheduleDay = {
  id: ScheduleDayId
  label: string

  classes: ScheduleClass[]
}


export type UpcomingEvent = {
  id: string

  date: string

  category: string

  title: string
  description: string

  startTime: string
  endTime: string

  location: string

  ctaLabel: string
  href: string
}


export type ScheduleEventsData = {
  timeZone: string

  coaches: CoachProfile[]

  schedule: {
    eyebrow: string
    title: string
    description: string

    days: ScheduleDay[]
  }

  events: UpcomingEvent[]
}