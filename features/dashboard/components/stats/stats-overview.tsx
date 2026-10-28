import { StatCard } from "./stat-card";
import { DASHBOARD_STATS_CONFIG } from "../../config/dashboard-stats.config";
import { cn } from "@/lib/utils";
import type {
  DashboardStat,
  DashboardStatId,
  StatsOverviewProps,
} from "../../types/dashboard-stat.types";

export interface DashboardStatsOverviewProps
    extends StatsOverviewProps {
        errors?: Partial<
            Record<DashboardStatId, string>
        >;
        loadingStats?: readonly DashboardStatId[];
    }
export function StatsOverview({
  stats,
  className,
  isLoading = false,
  errors = {},
  loadingStats = [],
}: DashboardStatsOverviewProps) {
    const statsById = new Map<
        DashboardStatId,
        DashboardStat
    >();

    for (const stat of stats) {
        statsById.set(stat.id, stat);
    }
    const loadingStatIds = new Set<
        DashboardStatId
    >(loadingStats);

    return (
        <section
            aria-label="Dashboard statistics"
            aria-busy={isLoading}
            className={cn("w-full min-w-0", className)}
            >
            <div
                className={cn(
                "grid grid-cols-1 gap-3",
                "sm:grid-cols-2",
                "xl:grid-cols-4",
                )}
            >
                {DASHBOARD_STATS_CONFIG.map((config) => {
                const stat =
                    statsById.get(config.id) ?? null;

                const cardLoading =
                    isLoading ||
                    loadingStatIds.has(config.id);

                const cardError =
                    cardLoading
                    ? null
                    : errors[config.id] ?? null;

                return (
                    <StatCard
                        key={config.id}
                        config={config}
                        stat={stat}
                        isLoading={cardLoading}
                        error={cardError}
                    />
                );
                })}
            </div>
        </section>
    );
}