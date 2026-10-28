import { DashboardPageShell } from "@/features/admin-shell/components/dashboard-page-shell"
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview"

export default function Dashboard() {
  return (
    <DashboardPageShell
      title="Dashboard"
      description="Get a quick overview of your boxing club operations."
    >
      <DashboardOverview />
    </DashboardPageShell>
  )
}
