import type { IconType } from "react-icons";
import {
  FaFacebookMessenger,
  FaInstagram,
} from "react-icons/fa";

import {
  Globe2,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

import type {
  LeadChannel,
} from "../types/lead.types";

export type LeadChannelIcon = IconType | LucideIcon;

export interface LeadChannelConfig {
    id: LeadChannel;
    label: string;
    shortLabel: string;
    description: string;
    icon: LeadChannelIcon;
    badgeClassName: string;
    iconClassName: string;
}

export const LEAD_CHANNEL_CONFIG = {
  messenger: {
    id: "messenger",

    label: "Messenger",

    shortLabel: "Messenger",

    description: "Facebook Messenger conversation",

    icon: FaFacebookMessenger,

    badgeClassName:
      "border-transparent bg-primary/10 text-primary",

    iconClassName:
      "text-primary",
  },

  instagram: {
    id: "instagram",

    label: "Instagram",

    shortLabel: "Instagram",

    description: "Instagram direct message",

    icon: FaInstagram,

    badgeClassName:
      "border-transparent bg-secondary text-secondary-foreground",

    iconClassName:
      "text-foreground",
  },

  website: {
    id: "website",

    label: "Website Chat",

    shortLabel: "Website",

    description: "Website live chat conversation",

    icon: Globe2,

    badgeClassName:
      "border-transparent bg-muted text-muted-foreground",

    iconClassName:
      "text-muted-foreground",
  },

  sms: {
    id: "sms",

    label: "SMS",

    shortLabel: "SMS",

    description: "SMS text message conversation",

    icon: MessageSquare,

    badgeClassName:
      "border-transparent bg-success/10 text-success",

    iconClassName:
      "text-success",
  },
} satisfies Record<LeadChannel, LeadChannelConfig>;

export const LEAD_CHANNEL_ORDER = [
    "messenger",
    "instagram",
    "website",
    "sms",
] as const satisfies readonly LeadChannel[];

export const LEAD_CHANNEL_OPTIONS =
    LEAD_CHANNEL_ORDER.map((channel) => {
        const config = LEAD_CHANNEL_CONFIG[channel];

        return {
        value: config.id,
        label: config.label,
        };
});

export function getLeadChannelConfig(
  channel: LeadChannel,
): LeadChannelConfig {
  return LEAD_CHANNEL_CONFIG[channel];
}

export function getLeadChannelLabel(
  channel: LeadChannel,
): string {
  return getLeadChannelConfig(channel).label;
}

export function getLeadChannelShortLabel(
  channel: LeadChannel,
): string {
  return getLeadChannelConfig(channel).shortLabel;
}

export function getLeadChannelIcon(
  channel: LeadChannel,
): LeadChannelIcon {
  return getLeadChannelConfig(channel).icon;
}

export function isLeadChannel(
  value: unknown,
): value is LeadChannel {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(
      LEAD_CHANNEL_CONFIG,
      value,
    )
  );
}