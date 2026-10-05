export const siteConfig = {
  name: "Rebel Boxing Club",
  shortName: "Rebel Boxing",

  description:
    "Professional boxing training, personal coaching, and fitness programs.",

  contact: {
    phone: "(316) 558-5385",
    email: "info@rebelboxing.com",
    address: "8909 W Central Ave, Wichita, KS 67212",
  },
} as const

export type SiteConfig = typeof siteConfig