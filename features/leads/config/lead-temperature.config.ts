import type { LucideIcon } from "lucide-react";

import {
  Flame,
  Snowflake,
  Sun,
} from "lucide-react";

import type {
  LeadTemperature,
} from "../types/lead.types";

export interface LeadTemperatureConfig {
    id: LeadTemperature;
    label: string;
    shortLabel: string;
    description: string;
    icon: LucideIcon;
    badgeClassName: string;
    iconClassName: string;
    priority: number;
}

export const LEAD_TEMPERATURE_CONFIG = {
  hot: {
    id: "hot",

    label: "Hot Lead",

    shortLabel: "Hot",

    description:
      "High-intent lead showing strong interest in joining or booking.",

    icon: Flame,

    badgeClassName:
      "border-transparent bg-destructive/10 text-destructive",

    iconClassName:
      "text-destructive",

    priority: 3,
  },

  warm: {
    id: "warm",

    label: "Warm Lead",

    shortLabel: "Warm",

    description:
      "Interested lead that may need more information or follow-up.",

    icon: Sun,

    badgeClassName:
      "border-transparent bg-warning/10 text-warning",

    iconClassName:
      "text-warning",

    priority: 2,
  },

  cold: {
    id: "cold",

    label: "Cold Lead",

    shortLabel: "Cold",

    description:
      "Low-intent or early-stage lead with limited engagement.",

    icon: Snowflake,

    badgeClassName:
      "border-transparent bg-muted text-muted-foreground",

    iconClassName:
      "text-muted-foreground",

    priority: 1,
  },
} satisfies Record<
  LeadTemperature,
  LeadTemperatureConfig
>;

export const LEAD_TEMPERATURE_ORDER = [
  "hot",
  "warm",
  "cold",
] as const satisfies readonly LeadTemperature[];

export const LEAD_TEMPERATURE_OPTIONS =
  LEAD_TEMPERATURE_ORDER.map((temperature) => {
    const config =
      LEAD_TEMPERATURE_CONFIG[temperature];

    return {
      value: config.id,
      label: config.label,
    };
  });

  export function getLeadTemperatureConfig(
  temperature: LeadTemperature,
): LeadTemperatureConfig {
  return LEAD_TEMPERATURE_CONFIG[temperature];
}

export function getLeadTemperatureShortLabel(
  temperature: LeadTemperature,
): string {
  return getLeadTemperatureConfig(
    temperature,
  ).shortLabel;
}

export function getLeadTemperaturePriority(
  temperature: LeadTemperature,
): number {
  return getLeadTemperatureConfig(
    temperature,
  ).priority;
}

export function sortLeadTemperatures(
  temperatures: readonly LeadTemperature[],
): LeadTemperature[] {
  return [...temperatures].sort(
    (a, b) =>
      getLeadTemperaturePriority(b) -
      getLeadTemperaturePriority(a),
  );
}

export function isLeadTemperature(
  value: unknown,
): value is LeadTemperature {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(
      LEAD_TEMPERATURE_CONFIG,
      value,
    )
  );
}