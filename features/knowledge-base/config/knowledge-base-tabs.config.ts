import {
  CalendarDays,
  FileText,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"

import type { KnowledgeBaseTab } from "../types/knowledge-base.types"

export interface KnowledgeBaseTabDefinition {
  id: KnowledgeBaseTab
  label: string
  description: string
  icon: LucideIcon
}

export const KNOWLEDGE_BASE_TABS: readonly KnowledgeBaseTabDefinition[] = [
  {
    id: "schedule",
    label: "Schedule",
    description:
      "Store opening hours, class schedules, and availability rules.",
    icon: CalendarDays,
  },
  {
    id: "coach_information",
    label: "Coach Information",
    description:
      "Keep coach profiles, specialties, and assignment details in one place.",
    icon: UserRound,
  },
  {
    id: "class_information",
    label: "Class Information",
    description:
      "Document class types, levels, locations, and member requirements.",
    icon: UsersRound,
  },
  {
    id: "contact",
    label: "Contact",
    description:
      "Manage club contact details and the preferred support channels.",
    icon: Phone,
  },
  {
    id: "additional_documents",
    label: "Additional Documents",
    description: "Add policies, FAQs, guides, and other reference documents.",
    icon: FileText,
  },
]
