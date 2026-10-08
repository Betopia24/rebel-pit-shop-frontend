export const publicNavigation = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "schedule",
    label: "Schedule",
    href: "/schedule",
  },
  {
    id: "about",
    label: "About",
    href: "/about",
  },
  {
    id: "classes",
    label: "Classes",
    href: "/classes",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/message",
  },
] as const





export const footerNavigation = [
  ...publicNavigation,
] as const


export const programNavigation = [
  {
    id: "boxing-classes",
    label: "Boxing Classes",
    href: "/schedule",
  },
  {
    id: "personal-training-program",
    label: "Personal Training",
    href: "/classes#personal-training",
  },
  {
    id: "youth-boxing",
    label: "Youth Boxing",
    href: "/schedule",
  },
  {
    id: "fitness-conditioning",
    label: "Fitness Conditioning",
    href: "/schedule",
  },
] as const


export const legalNavigation = [
  {
    id: "terms",
    label: "Terms & Conditions",
    href: "/terms",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    id: "sitemap",
    label: "Sitemap",
    href: "/sitemap.xml",
  },
] as const
