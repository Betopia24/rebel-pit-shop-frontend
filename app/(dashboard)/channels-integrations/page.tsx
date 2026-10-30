import { DashboardPageShell } from "@/features/admin-shell/components/dashboard-page-shell"
import { ChannelsIntegrationsSettings } from "@/features/channels/channels-integrations-settings"

export default function ChannelsIntegrations() {
  return (
    <DashboardPageShell
      title="Channels & Integrations"
      description="Connect your communication channels so your AI assistant can chat with customers and manage bookings."
    >
      <ChannelsIntegrationsSettings />
    </DashboardPageShell>
  )
}
