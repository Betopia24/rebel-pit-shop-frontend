import type { ReactNode } from "react"

import { PageHeader } from "./page-header"

interface DashboardPageShellProps {
  title: string
  description: string
  children?: ReactNode
}

export function DashboardPageShell({
  title,
  description,
  children,
}: DashboardPageShellProps) {
  return (
    <div className="min-h-full space-y-8 p-4 sm:p-6 lg:p-8">
      <PageHeader title={title} description={description} />

      {children ?? (
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            This area is ready for your dashboard content.
          </p>
        </section>
      )}
    </div>
  )
}
