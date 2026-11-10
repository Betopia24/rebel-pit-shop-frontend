import { DashboardPageShell } from "@/features/admin-shell/components/dashboard-page-shell"
import { SettingsOverview } from "@/features/settings/settings-overview"

export default function Settings() {
  return (
    <DashboardPageShell
      title="Settings"
      description="Keep your club workspace, bookings, AI, and admin access running the way you want."
    >
      <SettingsOverview />
    </DashboardPageShell>
  )
}
