import { DashboardPageShell } from "@/features/admin-shell/components/dashboard-page-shell"
import { AiPlaygroundOverview } from "@/features/ai-playground/ai-playground-overview"

export default function AiPlayground() {
  return (
    <DashboardPageShell
      title="AI Playground"
      description="Test your assistant with realistic customer conversations before turning it on for live channels."
    >
      <AiPlaygroundOverview />
    </DashboardPageShell>
  )
}
