
import type {
  DashboardKnowledgeData,
  DashboardKnowledgeMetric,
  DashboardKnowledgeMetricId,
  KnowledgeOverviewProps,
} from "../types/dashboard-knowledge.types";

/**
 * ============================================================
 * REBEL BOXING CLUB
 * Dashboard Knowledge Base Mock Data
 * ============================================================
 *
 * Development-only mock data.
 *
 * Screenshot values:
 *
 * FAQ Entries          → 42
 * Membership Plans     → 6
 * Coach Profiles       → 8
 * Policies & Rules     → 12
 * Open Knowledge Gaps  → 3
 *
 * Supports:
 * - Normal state
 * - Loading state
 * - Empty state
 * - Error state
 * - Partial data
 * - Individual metric errors
 * - Zero knowledge gaps
 *
 * No API calls, React components or hooks.
 * ============================================================
 */

/* ============================================================
   CONSTANTS
============================================================ */

/**
 * Fixed timestamp for deterministic mock data.
 *
 * Matches the historical reference dashboard
 * design rather than the current date.
 */
export const DASHBOARD_KNOWLEDGE_MOCK_UPDATED_AT =
  "2024-04-22T16:00:00-05:00";

/* ============================================================
   DEFAULT METRICS
============================================================ */

/**
 * Main metric dataset matching the screenshot.
 *
 * Metric IDs correspond to the static
 * dashboard-knowledge.config.ts definitions.
 *
 * Counts are fictional sample values.
 */
export const DASHBOARD_KNOWLEDGE_METRICS_MOCK = [
  {
    id: "faq_entries",
    count: 42,
  },
  {
    id: "membership_plans",
    count: 6,
  },
  {
    id: "coach_profiles",
    count: 8,
  },
  {
    id: "policies_rules",
    count: 12,
  },
  {
    id: "open_knowledge_gaps",
    count: 3,
  },
] as const satisfies readonly DashboardKnowledgeMetric[];

/* ============================================================
   MAIN KNOWLEDGE DATA
============================================================ */

/**
 * Default Knowledge Base overview.
 */
export const DASHBOARD_KNOWLEDGE_MOCK:
  DashboardKnowledgeData = {
  metrics: DASHBOARD_KNOWLEDGE_METRICS_MOCK,

  updatedAt:
    DASHBOARD_KNOWLEDGE_MOCK_UPDATED_AT,
};

/* ============================================================
   EMPTY STATE
============================================================ */

/**
 * Represents a business with no Knowledge Base
 * content and no detected knowledge gaps.
 *
 * Zero is a valid metric value.
 *
 * The overview component can use this dataset
 * with status="empty" to show its empty state.
 */
export const DASHBOARD_KNOWLEDGE_EMPTY_MOCK:
  DashboardKnowledgeData = {
  metrics: [
    { id: "faq_entries", count: 0 },
    { id: "membership_plans", count: 0 },
    { id: "coach_profiles", count: 0 },
    { id: "policies_rules", count: 0 },
    { id: "open_knowledge_gaps", count: 0 },
  ],

  updatedAt:
    DASHBOARD_KNOWLEDGE_MOCK_UPDATED_AT,
};

/* ============================================================
   PARTIAL DATA STATE
============================================================ */

/**
 * Some Knowledge Base metrics are unavailable.
 *
 * Null counts mean the metric could not be
 * calculated or retrieved.
 *
 * Other valid counts remain visible.
 */
export const DASHBOARD_KNOWLEDGE_PARTIAL_MOCK:
  DashboardKnowledgeData = {
  metrics: [
    { id: "faq_entries", count: 42 },
    { id: "membership_plans", count: 6 },
    { id: "coach_profiles", count: null },
    { id: "policies_rules", count: 12 },
    { id: "open_knowledge_gaps", count: null },
  ],

  updatedAt:
    DASHBOARD_KNOWLEDGE_MOCK_UPDATED_AT,
};

/* ============================================================
   ZERO KNOWLEDGE GAPS
============================================================ */

/**
 * All content metrics are available.
 *
 * No unresolved knowledge gaps exist.
 *
 * The gaps metric should not use an
 * attention/warning appearance when count=0.
 */
export const DASHBOARD_KNOWLEDGE_NO_GAPS_MOCK:
  DashboardKnowledgeData = {
  metrics: [
    { id: "faq_entries", count: 42 },
    { id: "membership_plans", count: 6 },
    { id: "coach_profiles", count: 8 },
    { id: "policies_rules", count: 12 },
    { id: "open_knowledge_gaps", count: 0 },
  ],

  updatedAt:
    DASHBOARD_KNOWLEDGE_MOCK_UPDATED_AT,
};

/* ============================================================
   INDIVIDUAL METRIC ERROR STATE
============================================================ */

/**
 * Errors for individual metrics.
 *
 * Useful when one data source fails while
 * the remaining metrics load successfully.
 */
export const DASHBOARD_KNOWLEDGE_METRIC_ERRORS_MOCK = {
  coach_profiles:
    "Unable to load coach profiles.",

  open_knowledge_gaps:
    "Unable to calculate knowledge gaps.",
} satisfies Partial<
  Record<DashboardKnowledgeMetricId, string>
>;

/* ============================================================
   COMPONENT STATE MOCKS
============================================================ */

/**
 * Successful overview.
 */
export const DASHBOARD_KNOWLEDGE_SUCCESS_STATE_MOCK = {
  data: DASHBOARD_KNOWLEDGE_MOCK,
  status: "success",
} satisfies KnowledgeOverviewProps;

/**
 * Loading overview.
 *
 * The UI should render five metric skeletons.
 */
export const DASHBOARD_KNOWLEDGE_LOADING_STATE_MOCK = {
  data: null,
  status: "loading",
} satisfies KnowledgeOverviewProps;

/**
 * Empty overview.
 */
export const DASHBOARD_KNOWLEDGE_EMPTY_STATE_MOCK = {
  data: DASHBOARD_KNOWLEDGE_EMPTY_MOCK,
  status: "empty",
} satisfies KnowledgeOverviewProps;

/**
 * Error overview.
 */
export const DASHBOARD_KNOWLEDGE_ERROR_STATE_MOCK = {
  data: null,
  status: "error",
  error: "Unable to load Knowledge Base summary.",
} satisfies KnowledgeOverviewProps;

/**
 * Partial success.
 *
 * Some metrics have valid counts,
 * while others are unavailable.
 */
export const DASHBOARD_KNOWLEDGE_PARTIAL_STATE_MOCK = {
  data: DASHBOARD_KNOWLEDGE_PARTIAL_MOCK,
  status: "success",
  metricErrors:
    DASHBOARD_KNOWLEDGE_METRIC_ERRORS_MOCK,
} satisfies KnowledgeOverviewProps;

/**
 * Successfully resolved knowledge gaps.
 */
export const DASHBOARD_KNOWLEDGE_NO_GAPS_STATE_MOCK = {
  data: DASHBOARD_KNOWLEDGE_NO_GAPS_MOCK,
  status: "success",
} satisfies KnowledgeOverviewProps;

/* ============================================================
   MOCK DATA HELPERS
============================================================ */

/**
 * Get one metric from the default mock dataset.
 *
 * Returns null if the metric ID is not found.
 */
export function getDashboardKnowledgeMetricMock(
  id: DashboardKnowledgeMetricId,
): DashboardKnowledgeMetric | null {
  return (
    DASHBOARD_KNOWLEDGE_METRICS_MOCK.find(
      (metric) => metric.id === id,
    ) ?? null
  );
}

/**
 * Return a fresh copy of the default
 * Knowledge Base dataset.
 *
 * This prevents callers from mutating
 * the exported mock arrays.
 */
export function getDashboardKnowledgeMock():
  DashboardKnowledgeData {
  return {
    metrics: DASHBOARD_KNOWLEDGE_METRICS_MOCK.map(
      (metric) => ({
        id: metric.id,
        count: metric.count,
      }),
    ),

    updatedAt:
      DASHBOARD_KNOWLEDGE_MOCK_UPDATED_AT,
  };
}

/**
 * Create an overview dataset with selected
 * metric counts overridden.
 *
 * Useful for UI development scenarios.
 *
 * Example:
 * createDashboardKnowledgeMock({
 *   faq_entries: 120,
 *   open_knowledge_gaps: 0,
 * });
 */
export function createDashboardKnowledgeMock(
  overrides: Partial<
    Record<DashboardKnowledgeMetricId, number | null>
  > = {},
): DashboardKnowledgeData {
  const metrics =
    DASHBOARD_KNOWLEDGE_METRICS_MOCK.map(
      (metric): DashboardKnowledgeMetric => ({
        id: metric.id,

        count: Object.prototype.hasOwnProperty.call(
          overrides,
          metric.id,
        )
          ? overrides[metric.id] ?? null
          : metric.count,
      }),
    );

  return {
    metrics,

    updatedAt:
      DASHBOARD_KNOWLEDGE_MOCK_UPDATED_AT,
  };
}
