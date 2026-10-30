import type { ScheduleClass, ScheduleDayId } from "@/features/schedule/types"

export type ScheduleKnowledgeItem = ScheduleClass & {
  dayId: ScheduleDayId
  dayLabel: string
}

export type ScheduleKnowledgeFaq = {
  id: string
  question: string
  answer: string
  published: boolean
}

export type ScheduleKnowledgeClassForm = {
  dayId: ScheduleDayId
  title: string
  description: string
  startTime: string
  endTime: string
  level: ScheduleClass["level"]
  coachId: string
}
