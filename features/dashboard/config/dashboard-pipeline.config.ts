import type {
  DashboardPipelineDateOption,
  DashboardPipelineDatePreset,
  DashboardPipelineStageConfig,
  DashboardPipelineStageId,
} from "../types/dashboard-pipeline.types";

export const DASHBOARD_PIPELINE_STAGES = [
  {
    id: "new_inquiry",
    label: "New Inquiry",
    description:
      "Customers who have started a new inquiry with Rebel Boxing Club.",
    colorLevel: 1,
  },
  {
    id: "ai_qualified",
    label: "AI Qualified",
    description:
      "Inquiries that have met the AI qualification criteria.",
    colorLevel: 2,
  },
  {
    id: "trial_requested",
    label: "Trial Requested",
    description:
      "Qualified prospects who have requested a free trial class.",
    colorLevel: 3,
  },
  {
    id: "booking_confirmed",
    label: "Booking Confirmed",
    description:
      "Prospects whose trial class booking has been confirmed.",
    colorLevel: 4,
  },
  {
    id: "trial_attended",
    label: "Trial Attended",
    description:
      "Prospects who have attended their scheduled trial class.",
    colorLevel: 5,
  },
  {
    id: "membership_converted",
    label: "Membership Converted",
    description:
      "Prospects who have converted into club members.",
    colorLevel: 6,
  },
] as const satisfies readonly DashboardPipelineStageConfig[];

export const DASHBOARD_PIPELINE_DATE_OPTIONS = [
  {
    value: "last_7_days",
    label: "Last 7 days",
  },
  {
    value: "last_30_days",
    label: "Last 30 days",
  },
  {
    value: "last_90_days",
    label: "Last 90 days",
  },
  {
    value: "custom",
    label: "Custom range",
  },
] as const satisfies readonly DashboardPipelineDateOption[];

export const DEFAULT_DASHBOARD_PIPELINE_PERIOD:
  DashboardPipelineDatePreset = "last_30_days";

  export function getDashboardPipelineStageConfig(
  id: DashboardPipelineStageId,
): DashboardPipelineStageConfig {
  const config = DASHBOARD_PIPELINE_STAGES.find(
    (stage) => stage.id === id,
  );

  if (!config) {
    throw new Error(
      `Dashboard pipeline stage configuration not found: ${id}`,
    );
  }

  return config;
}

export function getDashboardPipelinePeriodLabel(
  preset: DashboardPipelineDatePreset,
): string {
  const option = DASHBOARD_PIPELINE_DATE_OPTIONS.find(
    (item) => item.value === preset,
  );

  return option?.label ?? "Select period";
}

export const DASHBOARD_PIPELINE_STAGE_ORDER:
  readonly DashboardPipelineStageId[] =
  DASHBOARD_PIPELINE_STAGES.map(
    (stage) => stage.id,
  );