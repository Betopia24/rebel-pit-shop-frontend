export const siteConfig = {
  name: "Rebel Boxing Club",

  shortName: "Rebel Boxing",

  description:
    "Professional boxing training, personal coaching, and fitness programs.",

  footer: {
    tagline: "Train hard. Fight smart. Become stronger every day.",
  },

  contact: {
    phone: "(316) 558-5385",
    email: "info@rebelboxing.com",
    address: "8909 W Central Ave, Wichita, KS 67212",
  },

  hours: [
    {
      days: "Mon–Fri",
      time: "6:00 AM – 9:00 PM",
    },
    {
      days: "Sat–Sun",
      time: "8:00 AM – 4:00 PM",
    },
  ],
} as const


export type SiteConfig = typeof siteConfig