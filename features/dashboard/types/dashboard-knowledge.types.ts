export type DashboardKnowledgeISODateTime = string;

export type DashboardKnowledgeMetricId = "faq_entries" | "membership_plans" | "coach_profiles" | "policies_rules" | "open_knowledge_gaps";

export interface DashboardKnowledgeMetric {
    id: DashboardKnowledgeMetricId;
    count: number | null;
}

export interface DashboardKnowledgeData {
    metrics: readonly DashboardKnowledgeMetric[];
    updatedAt: DashboardKnowledgeISODateTime | null;
}

export interface DashboardKnowledgeMetricConfig {
    id: DashboardKnowledgeMetricId;
    label: string;
    description?: string;
    icon: "file-text" | "package" | "users" | "shield-check" | "triangle-alert";
    emphasis: "default" | "attention";
}

export type DashboardKnowledgeStatus = "loading" | "success" | "empty" | "error";

export interface KnowledgeMetricProps {
    metric: DashboardKnowledgeMetric | null;
    config: DashboardKnowledgeMetricConfig;
    isLoading?: boolean;
    error?: string | null;
    className?: string;
}

export interface KnowledgeOverviewProps {
    data: DashboardKnowledgeData | null;
    status: DashboardKnowledgeStatus;
    error?: string | null;
    metricErrors?: Partial<
        Record<DashboardKnowledgeMetricId, string>
    >;
    onRetry?: () => void;
    className?: string;
}