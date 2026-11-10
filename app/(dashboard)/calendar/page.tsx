import { PageHeader } from "@/features/admin-shell/components/page-header"
import { getDemoSessionUser } from "@/features/auth/lib/demo-auth"
import { CalendarOverview } from "@/features/calendar/calendar-overview"

export default async function Calendar() {
  const user = await getDemoSessionUser()

  if (!user) return null

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Calendar"
        description={user.role === "coach" ? "View your classes, sessions, and availability." : "Manage classes, sessions, and availability."}
      />
      <CalendarOverview viewerRole={user.role} viewerId={user.id} />
    </div>
  )
}
