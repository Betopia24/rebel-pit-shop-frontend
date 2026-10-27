import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "@/features/admin-shell/components/app-sidebar"
import { DashboardHeader } from "@/features/admin-shell/components/dashboard-header"

import type { SidebarUser } from "@/features/admin-shell/types/navigation.types"

interface DashboardLayoutProps {
  children: ReactNode
}

const developmentUser: SidebarUser = {
  id: "dev-admin",
  name: "Demo Admin",
  email: "demo@example.com",
  avatarUrl: null,
  role: "admin",
}

async function handlePreviewLogout() {
  "use server"

  redirect("/login")
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  if (process.env.NODE_ENV === "production") {
    redirect("/login")
  }
  const user = developmentUser

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
