import type { LucideIcon } from "lucide-react";

export type DashboardStatId = "total_conversations" | "qualified_leads" | "free_trial_requests" | "human_handoffs";

export type DashboardStatValueFormat  = "number" | "percentage" | "duration";

export type DashboardStatTrendDirection = "up" | "down" | "flat";

export type DashboardStatTrendSentiment = "positive" | "negative" | "neutral";

export type DashboardStatComparisonPeriod = "previous_day" | "previous_week" | "previous_month" | "previous_period";

export interface DashboardStatTrend {
    change: number;
    changePercent: number | null;
    direction: DashboardStatTrendDirection;
    sentiment: DashboardStatTrendSentiment;
    comparisonPeriod: DashboardStatComparisonPeriod;
}

export interface DashboardStatSparklinePoint {
    timestamp: string;
    value: number;
}

export interface DashboardStatSparkline {
  points: readonly DashboardStatSparklinePoint[];
}

export interface DashboardStat {
    id: DashboardStatId;
    value: number;
    trend: DashboardStatTrend | null;
    sparkline: DashboardStatSparkline | null;
}

export interface DashboardStatConfig {
    id: DashboardStatId;
    title: string;
    icon: LucideIcon;
    valueFormat: DashboardStatValueFormat;
    description?: string;
}

export interface StatCardProps {
    stat: DashboardStat;
    config: DashboardStatConfig;
    className?: string;
    isLoading?: boolean;
}

export interface StatsOverviewProps {
    stats: readonly DashboardStat[];
    className?: string;
    isLoading?: boolean;
}