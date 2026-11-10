import "server-only"

import { cookies } from "next/headers"

import type { SidebarUser } from "@/features/admin-shell/types/navigation.types"

const DEMO_SESSION_COOKIE = "rebel_demo_session"
const DEMO_PASSWORD = "ASDFqwer!234"

const DEMO_USERS = {
  "admin@example.com": {
    id: "demo-admin",
    name: "Demo Admin",
    email: "admin@example.com",
    avatarUrl: null,
    role: "admin",
  },
  "staff@example.com": {
    id: "demo-staff",
    name: "Demo Staff",
    email: "staff@example.com",
    avatarUrl: null,
    role: "staff",
  },
  "coach@example.com": {
    id: "coach-nichole",
    name: "Nichole",
    email: "coach@example.com",
    avatarUrl: null,
    role: "coach",
  },
} as const satisfies Record<string, SidebarUser>

export async function authenticateDemoUser(
  email: string,
  password: string
): Promise<SidebarUser | null> {
  const normalizedEmail = email.trim().toLowerCase()
  const user = DEMO_USERS[normalizedEmail as keyof typeof DEMO_USERS]

  if (!user || password !== DEMO_PASSWORD) {
    return null
  }

  return user
}

export async function createDemoSession(
  user: SidebarUser,
  rememberMe: boolean
) {
  const cookieStore = await cookies()

  cookieStore.set(DEMO_SESSION_COOKIE, user.role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(rememberMe ? { maxAge: 60 * 60 * 24 * 30 } : {}),
  })
}

export async function getDemoSessionUser(): Promise<SidebarUser | null> {
  const cookieStore = await cookies()
  const role = cookieStore.get(DEMO_SESSION_COOKIE)?.value

  if (role === "admin") {
    return DEMO_USERS["admin@example.com"]
  }

  if (role === "staff") {
    return DEMO_USERS["staff@example.com"]
  }

  if (role === "coach") {
    return DEMO_USERS["coach@example.com"]
  }

  return null
}

export async function clearDemoSession() {
  const cookieStore = await cookies()
  cookieStore.delete(DEMO_SESSION_COOKIE)
}
