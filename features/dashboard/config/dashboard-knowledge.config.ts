import type {
  DashboardKnowledgeMetricConfig,
  DashboardKnowledgeMetricId,
} from "../types/dashboard-knowledge.types";

export const DASHBOARD_KNOWLEDGE_ROUTE =
  "/knowledge-base";

  export const DASHBOARD_KNOWLEDGE_METRICS = [
  {
    id: "faq_entries",
    label: "FAQ entries",
    icon: "file-text",
    description:
      "Frequently asked questions available in the AI knowledge base.",
    emphasis: "default",
  },
  {
    id: "membership_plans",
    label: "Membership plans",
    icon: "package",
    description:
      "Membership plans and their information available to the AI.",
    emphasis: "default",
  },
  {
    id: "coach_profiles",
    label: "Coach profiles",
    icon: "users",
    description:
      "Coach information and profiles available in the knowledge base.",
    emphasis: "default",
  },
  {
    id: "policies_rules",
    label: "Policies & rules",
    icon: "shield-check",
    description:
      "Club policies, safety guidelines and operational rules.",
    emphasis: "default",
  },
  {
    id: "open_knowledge_gaps",
    label: "Open knowledge gaps",
    icon: "triangle-alert",
    description:
      "Unresolved questions or missing information requiring review.",
    emphasis: "attention",
  },
]  as const satisfies readonly DashboardKnowledgeMetricConfig[];

export function getDashboardKnowledgeMetricConfig(
  id: DashboardKnowledgeMetricId,
): DashboardKnowledgeMetricConfig {
  const config = DASHBOARD_KNOWLEDGE_METRICS.find(
    (metric) => metric.id === id,
  );

  if (!config) {
    throw new Error(
      `Dashboard knowledge metric configuration not found: ${id}`,
    );
  }

  return config;
}

export const DASHBOARD_KNOWLEDGE_METRIC_ORDER:
  readonly DashboardKnowledgeMetricId[] =
  DASHBOARD_KNOWLEDGE_METRICS.map(
    (metric) => metric.id,
  );

export const DASHBOARD_KNOWLEDGE_GRID_COLUMNS = 2;

export const DASHBOARD_KNOWLEDGE_METRIC_COUNT =
  DASHBOARD_KNOWLEDGE_METRICS.length;