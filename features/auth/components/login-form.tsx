"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import { loginSchema } from "../schemas/auth.schema"

import type { LoginFormValues } from "../types/auth.types"

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>
  error?: string | null
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const formId = useId()

  const emailId = `${formId}-email`
  const passwordId = `${formId}-password`
  const rememberId = `${formId}-remember`

  const [showPassword, setShowPassword] = useState(false)

  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function handleSubmit(values: LoginFormValues) {
    setSubmitError(null)

    try {
      await onSubmit(values)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again."
      )
    }
  }

  const displayedError = submitError ?? error

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      noValidate
      className="w-full"
    >
      <FieldGroup className="gap-5">
        {/* Email address */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={emailId}>Email address</FieldLabel>

              <Input
                {...field}
                id={emailId}
                type="email"
                inputMode="email"
                autoComplete="username"
                placeholder="you@example.com"
                disabled={isSubmitting}
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.invalid ? `${emailId}-error` : undefined
                }
                className="h-11 border-input bg-background text-foreground placeholder:text-muted-foreground"
              />

              {fieldState.invalid && (
                <div id={`${emailId}-error`}>
                  <FieldError errors={[fieldState.error]} />
                </div>
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={passwordId}>Password</FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? `${passwordId}-error` : undefined
                  }
                  className="h-11 border-input bg-background pr-11 text-foreground placeholder:text-muted-foreground"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={isSubmitting}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((previous) => !previous)}
                  style={{ transform: "translateY(-50%)" }}
                  className="absolute top-1/2 right-1.5 size-8 -translate-y-1/2 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="size-4" />
                  ) : (
                    <Eye aria-hidden="true" className="size-4" />
                  )}
                </Button>
              </div>

              {fieldState.invalid && (
                <div id={`${passwordId}-error`}>
                  <FieldError errors={[fieldState.error]} />
                </div>
              )}
            </Field>
          )}
        />

        {/* Remember me and forgot password */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3">
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={rememberId}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                  onBlur={field.onBlur}
                  disabled={isSubmitting}
                  ref={field.ref}
                />

                <label
                  htmlFor={rememberId}
                  className="cursor-pointer text-sm font-normal text-muted-foreground select-none"
                >
                  Remember me
                </label>
              </div>
            )}
          />

          <Link
            href="/forgot-password"
            className="rounded-sm text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-gold-hover hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
          >
            Forgot password?
          </Link>
        </div>

        {/* Authentication error */}
        {displayedError && (
          <div
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
          >
            {displayedError}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-1 h-11 w-full font-semibold transition-colors motion-reduce:transition-none"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="size-4 animate-spin motion-reduce:animate-none"
              />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
