import { PageHeader } from "@/features/admin-shell/components/page-header"
import { InboxOverview } from "@/features/inbox/inbox-overview"

export default function Inbox() {
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Inbox"
        description="Manage customer conversations, AI replies, and human follow-up from one place."
      />
      <div className="min-h-0 min-w-0 flex-1">
        <InboxOverview />
      </div>
    </div>
  )
}
