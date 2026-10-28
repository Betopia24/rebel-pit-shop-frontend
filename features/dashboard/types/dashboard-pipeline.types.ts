export type PipelineISODateTime = string

export type DashboardPipelineStageId =
  | "new_inquiry"
  | "ai_qualified"
  | "trial_requested"
  | "booking_confirmed"
  | "trial_attended"
  | "membership_converted"

export type DashboardPipelineDatePreset =
  "last_7_days" | "last_30_days" | "last_90_days" | "custom"

export interface DashboardPipelineDateRange {
  preset: DashboardPipelineDatePreset
  startDate: string
  endDate: string
}

export interface DashboardPipelineStage {
  id: DashboardPipelineStageId
  count: number
  conversionRate: number | null
}

export interface DashboardPipelineData {
  dateRange: DashboardPipelineDateRange
  timezone: string
  stages: readonly DashboardPipelineStage[]
  updatedAt: PipelineISODateTime | null
}

export interface DashboardPipelineStageConfig {
  id: DashboardPipelineStageId
  label: string
  description?: string
  colorLevel: 1 | 2 | 3 | 4 | 5 | 6
}

export interface DashboardPipelineDateOption {
  value: DashboardPipelineDatePreset
  label: string
}

export type DashboardPipelineStatus = "loading" | "success" | "empty" | "error"

export interface PipelineStageProps {
  stage: DashboardPipelineStage
  config: DashboardPipelineStageConfig
  position: "first" | "middle" | "last"
  className?: string
}

export interface LeadPipelineProps {
  data: DashboardPipelineData | null
  status: DashboardPipelineStatus
  selectedPeriod: DashboardPipelineDatePreset
  customDateRange?: DashboardPipelineDateRange
  onPeriodChange?: (period: DashboardPipelineDatePreset) => void
  onCustomDateRangeChange?: (dateRange: DashboardPipelineDateRange) => void
  onRetry?: () => void
  error?: string | null
  className?: string
}
