"use client"

import { useState } from "react"

import { BookingRequests } from "./booking/booking-requests"
import { InboxPreview } from "./inbox/inbox-preview"
import { KnowledgeOverview } from "./knowledge/knowledge-overview"
import { LeadPipeline } from "./pipeline/lead-pipeline"
import { TodaySchedule } from "./schedule/today-schedule"
import { StatsOverview } from "./stats/stats-overview"

import { DASHBOARD_BOOKING_MOCK } from "../data/dashboard-booking.mock"
import { DASHBOARD_INBOX_MOCK } from "../data/dashboard-inbox.mock"
import { DASHBOARD_KNOWLEDGE_MOCK } from "../data/dashboard-knowledge.mock"
import {
  DASHBOARD_PIPELINE_MOCK,
  DASHBOARD_PIPELINE_MOCK_BY_PERIOD,
} from "../data/dashboard-pipeline.mock"
import {
  DASHBOARD_SCHEDULE_DATES_WITH_SESSIONS,
  DASHBOARD_SCHEDULE_MOCK_DATE,
  getDashboardScheduleMock,
} from "../data/dashboard-schedule.mock"
import { DASHBOARD_STATS_MOCK } from "../data/dashboard-stats.mock"
import type {
  DashboardPipelineDatePreset,
  DashboardPipelineDateRange,
} from "../types/dashboard-pipeline.types"

export function DashboardOverview() {
  const [pipelinePeriod, setPipelinePeriod] =
    useState<DashboardPipelineDatePreset>("last_30_days")
  const [customPipelineRange, setCustomPipelineRange] =
    useState<DashboardPipelineDateRange>({
      ...DASHBOARD_PIPELINE_MOCK.dateRange,
      preset: "custom",
    })
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(
    DASHBOARD_SCHEDULE_MOCK_DATE
  )

  const pipelineData =
    pipelinePeriod === "custom"
      ? {
          ...DASHBOARD_PIPELINE_MOCK,
          dateRange: customPipelineRange,
        }
      : DASHBOARD_PIPELINE_MOCK_BY_PERIOD[pipelinePeriod]

  const scheduleData = getDashboardScheduleMock(selectedScheduleDate)

  return (
    <div className="space-y-6">
      {/* Row 1: at-a-glance stats */}
      <StatsOverview stats={DASHBOARD_STATS_MOCK} />

      {/* Row 2: pipeline + schedule */}
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.95fr)]">
        <LeadPipeline
          data={pipelineData}
          status="success"
          selectedPeriod={pipelinePeriod}
          customDateRange={customPipelineRange}
          onPeriodChange={setPipelinePeriod}
          onCustomDateRangeChange={setCustomPipelineRange}
        />
        <TodaySchedule
          data={scheduleData}
          status="success"
          selectedDate={selectedScheduleDate}
          onDateChange={setSelectedScheduleDate}
          datesWithSessions={DASHBOARD_SCHEDULE_DATES_WITH_SESSIONS}
          timezone={scheduleData.timezone}
        />
      </div>

      {/* Row 3: 5 / 5 / 2 dashboard previews */}
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,5fr)_minmax(220px,2fr)]">
        <InboxPreview
          data={DASHBOARD_INBOX_MOCK}
          status="success"
          referenceTime={DASHBOARD_INBOX_MOCK.updatedAt}
        />
        <BookingRequests data={DASHBOARD_BOOKING_MOCK} status="success" />
        <KnowledgeOverview data={DASHBOARD_KNOWLEDGE_MOCK} status="success" />
      </div>
    </div>
  )
}
