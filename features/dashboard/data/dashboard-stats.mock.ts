import type {
  DashboardStat,
  DashboardStatSparklinePoint,
} from "../types/dashboard-stat.types";

const MOCK_REFERENCE_DATE = "2024-04-22";

function createDailySparkline(
  values: readonly number[],
): readonly DashboardStatSparklinePoint[] {
  const referenceDate = new Date(
    `${MOCK_REFERENCE_DATE}T00:00:00.000Z`,
  );

  return values.map((value, index) => {
    const date = new Date(referenceDate);

    date.setUTCDate(
      referenceDate.getUTCDate() -
        (values.length - 1 - index),
    );

    return {
      timestamp: date.toISOString(),
      value,
    };
  });
}

export const DASHBOARD_STATS_MOCK = [
    {
        id: "total_conversations",
        value: 248,

        trend: {
        change: 26,
        changePercent: null,
        direction: "up",
        sentiment: "positive",
        comparisonPeriod: "previous_week",
        },

        sparkline: {
        points: createDailySparkline([
            18, 27, 32, 30, 41, 35, 48, 48,
        ]),
        },
    },
    {
        id: "qualified_leads",
        value: 68,

        trend: {
        change: 10,
        changePercent: 18,
        direction: "up",
        sentiment: "positive",
        comparisonPeriod: "previous_week",
        },

        sparkline: {
        points: createDailySparkline([
            5, 8, 12, 11, 10, 14, 13, 16,
        ]),
        },
    },
    {
        id: "free_trial_requests",
        value: 32,

        trend: {
        change: 6,
        changePercent: 23,
        direction: "up",
        sentiment: "positive",
        comparisonPeriod: "previous_week",
        },

        sparkline: {
        points: createDailySparkline([
            3, 5, 6, 8, 6, 9, 11, 12,
        ]),
        },
    },
    {
        id: "human_handoffs",
        value: 14,

        trend: {
        change: 2,
        changePercent: 7,
        direction: "up",
        sentiment: "negative",
        comparisonPeriod: "previous_week",
        },

        sparkline: {
        points: createDailySparkline([
            1, 3, 2, 5, 7, 5, 8, 7,
        ]),
        },
    },
] as const satisfies readonly DashboardStat[];

export function getDashboardStatMock(
  id: DashboardStat["id"],
): DashboardStat {
  const stat = DASHBOARD_STATS_MOCK.find(
    (item) => item.id === id,
  );

  if (!stat) {
    throw new Error(
      `Dashboard mock statistic not found: ${id}`,
    );
  }

  return stat;
}