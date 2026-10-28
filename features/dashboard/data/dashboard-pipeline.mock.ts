import type {
  DashboardPipelineData,
  DashboardPipelineDatePreset,
  DashboardPipelineStage,
} from "../types/dashboard-pipeline.types";

const MOCK_TIMEZONE = "America/Chicago";

const MOCK_END_DATE = "2024-04-22";

const MOCK_UPDATED_AT = "2024-04-22T18:00:00.000Z";

function shiftDate(
  dateString: string,
  days: number,
): string {
  const date = new Date(
    `${dateString}T00:00:00.000Z`,
  );

  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}

function createDateRange(
  preset: Exclude<
    DashboardPipelineDatePreset,
    "custom"
  >,
) {
  const days =
    preset === "last_7_days"
      ? 7
      : preset === "last_30_days"
        ? 30
        : 90;

  return {
    preset,
    startDate: shiftDate(
      MOCK_END_DATE,
      -(days - 1),
    ),
    endDate: MOCK_END_DATE,
  } as const;
}

function calculateConversionRate(
  count: number,
  totalInquiries: number,
): number | null {
  if (
    !Number.isInteger(count) ||
    !Number.isInteger(totalInquiries) ||
    count < 0 ||
    totalInquiries <= 0
  ) {
    return null;
  }

  return Math.round(
    (count / totalInquiries) * 100,
  );
}

function createPipelineStages(
  counts: {
    newInquiry: number;
    aiQualified: number;
    trialRequested: number;
    bookingConfirmed: number;
    trialAttended: number;
    membershipConverted: number;
  },
): readonly DashboardPipelineStage[] {
  const baseline = counts.newInquiry;

  return [
    {
      id: "new_inquiry",
      count: counts.newInquiry,
      conversionRate:
        calculateConversionRate(
          counts.newInquiry,
          baseline,
        ),
    },
    {
      id: "ai_qualified",
      count: counts.aiQualified,
      conversionRate:
        calculateConversionRate(
          counts.aiQualified,
          baseline,
        ),
    },
    {
      id: "trial_requested",
      count: counts.trialRequested,
      conversionRate:
        calculateConversionRate(
          counts.trialRequested,
          baseline,
        ),
    },
    {
      id: "booking_confirmed",
      count: counts.bookingConfirmed,
      conversionRate:
        calculateConversionRate(
          counts.bookingConfirmed,
          baseline,
        ),
    },
    {
      id: "trial_attended",
      count: counts.trialAttended,
      conversionRate:
        calculateConversionRate(
          counts.trialAttended,
          baseline,
        ),
    },
    {
      id: "membership_converted",
      count: counts.membershipConverted,
      conversionRate:
        calculateConversionRate(
          counts.membershipConverted,
          baseline,
        ),
    },
  ];
}

export const DASHBOARD_PIPELINE_MOCK:
  DashboardPipelineData = {
  dateRange: createDateRange("last_30_days"),

  timezone: MOCK_TIMEZONE,

  stages: createPipelineStages({
    newInquiry: 248,
    aiQualified: 142,
    trialRequested: 68,
    bookingConfirmed: 42,
    trialAttended: 36,
    membershipConverted: 18,
  }),

  updatedAt: MOCK_UPDATED_AT,
};

export const DASHBOARD_PIPELINE_MOCK_BY_PERIOD = {
  last_7_days: {
    dateRange: createDateRange("last_7_days"),
    timezone: MOCK_TIMEZONE,
    stages: createPipelineStages({
      newInquiry: 64,
      aiQualified: 38,
      trialRequested: 19,
      bookingConfirmed: 12,
      trialAttended: 9,
      membershipConverted: 5,
    }),
    updatedAt: MOCK_UPDATED_AT,
  },

  last_30_days: DASHBOARD_PIPELINE_MOCK,

  last_90_days: {
    dateRange: createDateRange("last_90_days"),
    timezone: MOCK_TIMEZONE,
    stages: createPipelineStages({
      newInquiry: 692,
      aiQualified: 401,
      trialRequested: 198,
      bookingConfirmed: 126,
      trialAttended: 103,
      membershipConverted: 52,
    }),
    updatedAt: MOCK_UPDATED_AT,
  },
} satisfies Record<
  Exclude<DashboardPipelineDatePreset, "custom">,
  DashboardPipelineData
>;

export const DASHBOARD_PIPELINE_EMPTY_MOCK:
  DashboardPipelineData = {
  dateRange: createDateRange("last_30_days"),

  timezone: MOCK_TIMEZONE,

  stages: createPipelineStages({
    newInquiry: 0,
    aiQualified: 0,
    trialRequested: 0,
    bookingConfirmed: 0,
    trialAttended: 0,
    membershipConverted: 0,
  }),

  updatedAt: MOCK_UPDATED_AT,
};

export function getDashboardPipelineMock(
  preset: Exclude<
    DashboardPipelineDatePreset,
    "custom"
  > = "last_30_days",
): DashboardPipelineData {
  return DASHBOARD_PIPELINE_MOCK_BY_PERIOD[preset];
}