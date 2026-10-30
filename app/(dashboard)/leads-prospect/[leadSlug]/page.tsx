import { DashboardPageShell } from "@/features/admin-shell/components/dashboard-page-shell"

import { LeadDetailsPage } from "@/features/leads/components/details/lead-details-page"

export default function LeadDetails() {
  return (
    <DashboardPageShell
      title="Lead Profile"
      description="Review the lead profile, activity, and next steps."
    >
      <LeadDetailsPage />
    </DashboardPageShell>
  )
}
