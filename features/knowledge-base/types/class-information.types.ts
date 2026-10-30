export type ClassInformationCategory =
  "group_class" | "training_option" | "open_gym"

export type ClassInformationItem = {
  id: string
  category: ClassInformationCategory
  number: string
  eyebrow: string
  title: string
  description: string
  benefits: string[]
  bestFor: string[]
  ctaLabel: string
  ctaHref: string
  published: boolean
}
