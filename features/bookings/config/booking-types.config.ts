
import type { LucideIcon } from "lucide-react";

import {
  CalendarClock,
  CalendarDays,
  Dumbbell,
  Gift,
  MessageCircle,
  UserRound,
  Users,
} from "lucide-react";

import type {
  Booking,
  BookingCategory,
  BookingTab,
  BookingType,
} from "../types/booking.types";

export interface BookingTabConfig {
    value: BookingTab;
    label: string;
    shortLabel: string;
    description: string;
    icon: LucideIcon;
}

export interface BookingCategoryConfig {
    value: BookingCategory;
    label: string;
    description: string;
    icon: LucideIcon;
}

export interface BookingTypeConfig {
    value: BookingType;
    label: string;
    shortLabel: string;
    icon: LucideIcon;
    badgeClassName: string;
    iconClassName: string;
    iconBackgroundClassName: string;
    dotClassName: string;
}

export interface BookingTypeOption {
    value: BookingType;
    label: string;
}

export const BOOKING_TAB_CONFIG = {
  all: {
    value: "all",
    label: "All Bookings",
    shortLabel: "All",
    description: "View every booking.",
    icon: CalendarDays,
  },

  free_class: {
    value: "free_class",
    label: "Free Class Requests",
    shortLabel: "Free Class",
    description: "View free trial class bookings.",
    icon: Gift,
  },

  membership: {
    value: "membership",
    label: "Membership Sessions",
    shortLabel: "Membership",
    description: "View member session bookings.",
    icon: Users,
  },

  personal_training: {
    value: "personal_training",
    label: "Personal Training",
    shortLabel: "Training",
    description: "View personal training bookings.",
    icon: Dumbbell,
  },

  consultation: {
    value: "consultation",
    label: "Consultations",
    shortLabel: "Consultation",
    description: "View consultation bookings.",
    icon: MessageCircle,
  },

  waitlist: {
    value: "waitlist",
    label: "Waitlist",
    shortLabel: "Waitlist",
    description: "View bookings awaiting availability.",
    icon: CalendarClock,
  },
} satisfies Record<BookingTab, BookingTabConfig>;


export const BOOKING_TAB_ORDER = [
  "all",
  "free_class",
  "membership",
  "personal_training",
  "consultation",
  "waitlist",
] as const satisfies readonly BookingTab[];


export const BOOKING_TABS: readonly BookingTabConfig[] =
  BOOKING_TAB_ORDER.map(
    (tab) => BOOKING_TAB_CONFIG[tab],
  );


export const BOOKING_CATEGORY_CONFIG = {
  free_class: {
    value: "free_class",
    label: "Free Class",
    description: "A free introductory class.",
    icon: Gift,
  },

  membership: {
    value: "membership",
    label: "Membership Session",
    description: "A session booked by a member.",
    icon: Users,
  },

  personal_training: {
    value: "personal_training",
    label: "Personal Training",
    description: "A personal coaching session.",
    icon: Dumbbell,
  },

  consultation: {
    value: "consultation",
    label: "Consultation",
    description: "A consultation appointment.",
    icon: MessageCircle,
  },
} satisfies Record<
  BookingCategory,
  BookingCategoryConfig
>;


export const BOOKING_CATEGORY_ORDER = [
  "free_class",
  "membership",
  "personal_training",
  "consultation",
] as const satisfies readonly BookingCategory[];


export const BOOKING_TYPE_CONFIG = {
  free_class: {
    value: "free_class",

    label: "Free Class",

    shortLabel: "Free Class",

    icon: Gift,

    badgeClassName:
      "border-info/20 bg-info/10 text-info",

    iconClassName:
      "text-info",

    iconBackgroundClassName:
      "bg-info/10",

    dotClassName:
      "bg-info",
  },

  member: {
    value: "member",

    label: "Member",

    shortLabel: "Member",

    icon: Users,

    badgeClassName:
      "border-info/20 bg-info/10 text-info",

    iconClassName:
      "text-info",

    iconBackgroundClassName:
      "bg-info/10",

    dotClassName:
      "bg-info",
  },

  personal_training: {
    value: "personal_training",

    label: "Personal Training",

    shortLabel: "Training",

    icon: Dumbbell,

    badgeClassName:
      "border-primary/20 bg-primary/10 text-primary",

    iconClassName:
      "text-primary",

    iconBackgroundClassName:
      "bg-primary/10",

    dotClassName:
      "bg-primary",
  },

  consultation: {
    value: "consultation",

    label: "Consultation",

    shortLabel: "Consultation",

    icon: UserRound,

    badgeClassName:
      "border-destructive/20 bg-destructive/10 text-destructive",

    iconClassName:
      "text-destructive",

    iconBackgroundClassName:
      "bg-destructive/10",

    dotClassName:
      "bg-destructive",
  },
} satisfies Record<BookingType, BookingTypeConfig>;



export const BOOKING_TYPE_ORDER = [
  "free_class",
  "member",
  "personal_training",
  "consultation",
] as const satisfies readonly BookingType[];


export const BOOKING_TYPE_OPTIONS:
  readonly BookingTypeOption[] =
  BOOKING_TYPE_ORDER.map((type) => ({
    value: type,
    label: BOOKING_TYPE_CONFIG[type].label,
  }));


export function getBookingTabConfig(
  tab: BookingTab,
): BookingTabConfig {
  return BOOKING_TAB_CONFIG[tab];
}

export function getBookingCategoryConfig(
  category: BookingCategory,
): BookingCategoryConfig {
  return BOOKING_CATEGORY_CONFIG[category];
}

export function getBookingTypeConfig(
  type: BookingType,
): BookingTypeConfig {
  return BOOKING_TYPE_CONFIG[type];
}


export function getBookingTabLabel(
  tab: BookingTab,
): string {
  return BOOKING_TAB_CONFIG[tab].label;
}

export function getBookingCategoryLabel(
  category: BookingCategory,
): string {
  return BOOKING_CATEGORY_CONFIG[category].label;
}

export function getBookingTypeLabel(
  type: BookingType,
): string {
  return BOOKING_TYPE_CONFIG[type].label;
}


export function isBookingTab(
  value: unknown,
): value is BookingTab {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(
      BOOKING_TAB_CONFIG,
      value,
    )
  );
}

export function isBookingCategory(
  value: unknown,
): value is BookingCategory {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(
      BOOKING_CATEGORY_CONFIG,
      value,
    )
  );
}

export function isBookingType(
  value: unknown,
): value is BookingType {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(
      BOOKING_TYPE_CONFIG,
      value,
    )
  );
}


export function parseBookingTab(
  value: unknown,
): BookingTab {
  return isBookingTab(value)
    ? value
    : "all";
}

export function parseBookingType(
  value: unknown,
): BookingType | null {
  return isBookingType(value)
    ? value
    : null;
}


export function matchesBookingCategoryTab(
  booking: Booking,
  tab: BookingTab,
): boolean {
  if (tab === "all") {
    return true;
  }

  if (tab === "waitlist") {
    return booking.status === "waitlist";
  }

  return booking.category === tab;
}


export type BookingTabCounts = Record<
  BookingTab,
  number
>;


export function getBookingTabCounts(
  bookings: readonly Booking[],
): BookingTabCounts {
  const counts: BookingTabCounts = {
    all: bookings.length,
    free_class: 0,
    membership: 0,
    personal_training: 0,
    consultation: 0,
    waitlist: 0,
  };

  for (const booking of bookings) {
    counts[booking.category] += 1;

    if (booking.status === "waitlist") {
      counts.waitlist += 1;
    }
  }

  return counts;
}


export type BookingCategoryCounts = Record<
  BookingCategory,
  number
>;

export function getBookingCategoryCounts(
  bookings: readonly Booking[],
): BookingCategoryCounts {
  const counts: BookingCategoryCounts = {
    free_class: 0,
    membership: 0,
    personal_training: 0,
    consultation: 0,
  };

  for (const booking of bookings) {
    counts[booking.category] += 1;
  }

  return counts;
}


export function getBookingTabOptions(): readonly {
  value: BookingTab;
  label: string;
}[] {
  return BOOKING_TABS.map((tab) => ({
    value: tab.value,
    label: tab.label,
  }));
}

export function getBookingCategoryOptions(): readonly {
  value: BookingCategory | null;
  label: string;
}[] {
  return [
    {
      value: null,
      label: "All Categories",
    },

    ...BOOKING_CATEGORY_ORDER.map(
      (category) => ({
        value: category,
        label:
          BOOKING_CATEGORY_CONFIG[category].label,
      }),
    ),
  ];
}
