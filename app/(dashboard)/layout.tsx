import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "@/features/admin-shell/components/app-sidebar"
import { DashboardHeader } from "@/features/admin-shell/components/dashboard-header"

import {
  clearDemoSession,
  getDemoSessionUser,
} from "@/features/auth/lib/demo-auth"

interface DashboardLayoutProps {
  children: ReactNode
}

async function handlePreviewLogout() {
  "use server"

  await clearDemoSession()
  redirect("/login")
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getDemoSessionUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar user={user} logoutAction={handlePreviewLogout} />

      <SidebarInset
        id="dashboard-main"
        className="flex min-h-svh min-w-0 flex-col bg-background text-foreground"
      >
        {/* Shared sticky top bar */}
        <DashboardHeader />

        {/* Dashboard route content */}
        <div className="min-w-0 flex-1 bg-background">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
