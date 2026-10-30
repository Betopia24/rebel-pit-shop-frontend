import type { ClassInformationCategory } from "../types/class-information.types"

export const CLASS_INFORMATION_CATEGORY_CONFIG: Record<
  ClassInformationCategory,
  { label: string; description: string }
> = {
  group_class: {
    label: "Group classes",
    description: "Coach-led boxing and kickboxing experiences.",
  },
  training_option: {
    label: "Training options",
    description: "Personalized programs and flexible support.",
  },
  open_gym: {
    label: "Open gym",
    description: "Self-directed training spaces and equipment.",
  },
}

export const CLASS_INFORMATION_CATEGORY_ORDER: readonly ClassInformationCategory[] =
  ["group_class", "training_option", "open_gym"]
