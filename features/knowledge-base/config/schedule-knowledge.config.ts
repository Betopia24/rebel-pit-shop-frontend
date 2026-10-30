import type { ScheduleDayId, ScheduleLevel } from "@/features/schedule/types"

export const SCHEDULE_KNOWLEDGE_DAYS: readonly {
  id: ScheduleDayId
  label: string
}[] = [
  { id: "mon", label: "Monday" },
  { id: "tue", label: "Tuesday" },
  { id: "wed", label: "Wednesday" },
  { id: "thu", label: "Thursday" },
  { id: "fri", label: "Friday" },
  { id: "sat", label: "Saturday" },
  { id: "sun", label: "Sunday" },
]

export const SCHEDULE_KNOWLEDGE_LEVELS: readonly ScheduleLevel[] = [
  "Beginner",
  "All Levels",
  "Intermediate",
  "Advanced",
  "Youth",
  "Members Only",
]
