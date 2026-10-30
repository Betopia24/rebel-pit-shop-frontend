import scheduleEventsJson from "@/data/schedule-events.json"

import type { ScheduleEventsData } from "@/features/schedule/types"

import type { ScheduleKnowledgeFaq } from "../types/schedule-knowledge.types"

export const SCHEDULE_KNOWLEDGE_SOURCE =
  scheduleEventsJson as ScheduleEventsData

export const SCHEDULE_KNOWLEDGE_FAQS: readonly ScheduleKnowledgeFaq[] = [
  {
    id: "experience",
    question: "Do I need boxing experience before booking a class?",
    answer:
      "No. Everyone starts somewhere at Rebel. Members can begin at their current fitness level and coaches can adjust the workout as needed.",
    published: true,
  },
  {
    id: "no-contact",
    question: "Are Rebel boxing classes no-contact?",
    answer:
      "Yes. Group fitness classes are built around boxing and kickboxing-inspired training without requiring person-to-person sparring.",
    published: true,
  },
  {
    id: "duration",
    question: "How long are the classes?",
    answer:
      "Classes are generally structured as 30, 60, or 75 minute workouts depending on the session type.",
    published: true,
  },
  {
    id: "what-to-bring",
    question: "What should I bring to my first class?",
    answer:
      "Wear comfortable workout clothes, bring water, and arrive a few minutes early so the team can help you get settled.",
    published: true,
  },
  {
    id: "modify",
    question: "Can I modify exercises during class?",
    answer:
      "Yes. You can adjust movements, slow your pace, take additional rest, or use alternatives that better fit your needs.",
    published: true,
  },
] as const
