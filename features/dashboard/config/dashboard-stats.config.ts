import {
  CalendarDays,
  MessageCircle,
  UserRound,
  UsersRound,
} from "lucide-react";

import type {
  DashboardStatConfig,
  DashboardStatId,
} from "../types/dashboard-stat.types";

export const DASHBOARD_STATS_CONFIG = [
  {
    id: "total_conversations",
    title: "Total Conversations",
    icon: MessageCircle,
    valueFormat: "number",
    description:
      "Total customer conversations across connected messaging channels.",
  },
  {
    id: "qualified_leads",
    title: "Qualified Leads",
    icon: UserRound,
    valueFormat: "number",
    description:
      "Leads that meet the club's qualification criteria.",
  },
  {
    id: "free_trial_requests",
    title: "Free Trial Requests",
    icon: CalendarDays,
    valueFormat: "number",
    description:
      "Customer requests to attend a free trial boxing class.",
  },
  {
    id: "human_handoffs",
    title: "Human Handoffs",
    icon: UsersRound,
    valueFormat: "number",
    description:
      "Customer conversations transferred from AI to a human team member.",
  },
] as const satisfies readonly DashboardStatConfig[];

export function getDashboardStatConfig(
  id: DashboardStatId,
): DashboardStatConfig {
  const config = DASHBOARD_STATS_CONFIG.find(
    (item) => item.id === id,
  );

  if (!config) {
    throw new Error(
      `Dashboard stat configuration not found: ${id}`,
    );
  }

  return config;
}