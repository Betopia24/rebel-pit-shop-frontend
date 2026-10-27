import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { AuthShell } from "@/features/auth/components/auth-shell"
import { LoginForm } from "@/features/auth/components/login-form"

import {
  authenticateDemoUser,
  createDemoSession,
} from "@/features/auth/lib/demo-auth"

import { loginSchema } from "@/features/auth/schemas/auth.schema"

import type { LoginFormValues } from "@/features/auth/types/auth.types"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to the Rebel Boxing Club staff dashboard.",
}

async function signIn(values: LoginFormValues): Promise<void> {
  "use server"

  const result = loginSchema.safeParse(values)

  if (!result.success) {
    throw new Error("Invalid sign-in information.")
  }

  const user = await authenticateDemoUser(
    result.data.email,
    result.data.password
  )

  if (!user) {
    throw new Error("Invalid email or password.")
  }

  await createDemoSession(user, result.data.rememberMe)
  redirect("/dashboard")
}

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to your Rebel Boxing Club dashboard."
    >
      <LoginForm onSubmit={signIn} />
    </AuthShell>
  )
}
