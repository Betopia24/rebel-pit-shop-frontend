import { DashboardPageShell } from "@/features/admin-shell/components/dashboard-page-shell"
import { AnalyticsOverview } from "@/features/analytics/analytics-overview"

export default function Analytics() {
  return (
    <DashboardPageShell
      title="Analytics"
      description="Understand how prospects discover Rebel, book a session, and become members."
    >
      <AnalyticsOverview />
    </DashboardPageShell>
  )
}
