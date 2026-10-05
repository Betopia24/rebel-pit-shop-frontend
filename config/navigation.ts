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
    id: "personal-training",
    label: "Personal Training",
    href: "/personal-training",
  },
] as const


const footerOnlyNavigation = [
  {
    id: "sign-waiver",
    label: "Sign Waiver",
    href: "/sign-waiver",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/message",
  },
] as const


export const footerNavigation = [
  ...publicNavigation,
  ...footerOnlyNavigation,
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
    href: "/personal-training",
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
    id: "privacy-policy",
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    id: "terms-conditions",
    label: "Terms & Conditions",
    href: "/terms",
  },
  {
    id: "sitemap",
    label: "Sitemap",
    href: "/sitemap.xml",
  },
] as const