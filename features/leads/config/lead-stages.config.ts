import type { LeadStage } from "../types/lead.types";

export interface LeadStageConfig {
    id: LeadStage;
    label: string;
    description: string;
    order: number;
    isConversionStage: boolean;
}

export const LEAD_PIPELINE_STAGES = [
  {
    id: "new_inquiry",
    label: "New Inquiry",
    description: "Initial contact received",
    order: 1,
    isConversionStage: false,
  },
  {
    id: "ai_qualified",
    label: "AI Qualified",
    description: "Information gathered",
    order: 2,
    isConversionStage: false,
  },
  {
    id: "free_class_requested",
    label: "Free Class Requested",
    description: "Trial class requested",
    order: 3,
    isConversionStage: false,
  },
  {
    id: "booking_confirmed",
    label: "Booking Confirmed",
    description: "Class scheduled",
    order: 4,
    isConversionStage: false,
  },
  {
    id: "trial_attended",
    label: "Trial Attended",
    description: "Completed trial class",
    order: 5,
    isConversionStage: false,
  },
  {
    id: "membership_converted",
    label: "Membership Converted",
    description: "Became a member",
    order: 6,
    isConversionStage: true,
  },
] as const satisfies readonly LeadStageConfig[];

export const LEAD_STAGE_CONFIG: Record<
  LeadStage,
  LeadStageConfig
> = Object.fromEntries(
  LEAD_PIPELINE_STAGES.map((stage) => [
    stage.id,
    stage,
  ]),
) as Record<LeadStage, LeadStageConfig>;

export const LEAD_STAGE_ORDER: readonly LeadStage[] =
  LEAD_PIPELINE_STAGES.map((stage) => stage.id);

  export function getLeadStageConfig(
  stage: LeadStage,
): LeadStageConfig {
  return LEAD_STAGE_CONFIG[stage];
}

export function getLeadStageLabel(
  stage: LeadStage,
): string {
  return getLeadStageConfig(stage).label;
}

export function getLeadStageOrder(
  stage: LeadStage,
): number {
  return getLeadStageConfig(stage).order;
}

export function isLeadConversionStage(
  stage: LeadStage,
): boolean {
  return getLeadStageConfig(stage).isConversionStage;
}

export function sortLeadStages(
  stages: readonly LeadStage[],
): LeadStage[] {
  return [...stages].sort(
    (a, b) =>
      getLeadStageOrder(a) -
      getLeadStageOrder(b),
  );
}

export function getNextLeadStage(
  stage: LeadStage,
): LeadStage | null {
  const index = LEAD_STAGE_ORDER.indexOf(stage);

  if (
    index === -1 ||
    index >= LEAD_STAGE_ORDER.length - 1
  ) {
    return null;
  }

  return LEAD_STAGE_ORDER[index + 1];
}

export function getPreviousLeadStage(
  stage: LeadStage,
): LeadStage | null {
  const index = LEAD_STAGE_ORDER.indexOf(stage);

  if (index <= 0) {
    return null;
  }

  return LEAD_STAGE_ORDER[index - 1];
}
