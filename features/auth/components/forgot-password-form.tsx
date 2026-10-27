"use client"

import { useEffect, useId, useState } from "react"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Controller, useForm } from "react-hook-form"

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import {
  AUTH_VALIDATION,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../schemas/auth.schema"

import type {
  ForgotPasswordFormValues,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  PasswordRecoveryState,
  ResendOtpRequest,
  ResendOtpResponse,
  ResetPasswordFormValues,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpFormValues,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types/auth.types"

export interface ForgotPasswordFormProps {
  onRequestOtp: (
    request: ForgotPasswordRequest
  ) => Promise<ForgotPasswordResponse>

  onVerifyOtp: (request: VerifyOtpRequest) => Promise<VerifyOtpResponse>

  onResendOtp: (request: ResendOtpRequest) => Promise<ResendOtpResponse>

  onResetPassword: (
    request: ResetPasswordRequest
  ) => Promise<ResetPasswordResponse>
}

type RecoveryAction = "request" | "verify" | "resend" | "reset"

const RECOVERY_STEPS = [
  { id: "email", label: "Email", icon: Mail },
  { id: "otp", label: "Verify OTP", icon: ShieldCheck },
  {
    id: "new_password",
    label: "Password",
    icon: LockKeyhole,
  },
] as const

function getRecoveryStepIndex(step: PasswordRecoveryState["step"]): number {
  switch (step) {
    case "email":
      return 0

    case "otp":
      return 1

    case "new_password":
      return 2

    case "success":
      return 3
  }
}

function getRemainingSeconds(availableAt: string): number {
  const timestamp = Date.parse(availableAt)

  if (!Number.isFinite(timestamp)) {
    return 0
  }

  return Math.max(0, Math.ceil((timestamp - Date.now()) / 1000))
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "code" in error) {
    const code = error.code

    if (code === "OTP_INVALID") {
      return "The verification code is incorrect."
    }

    if (code === "OTP_EXPIRED" || code === "RECOVERY_SESSION_EXPIRED") {
      return "Your verification code has expired. Request a new code."
    }

    if (code === "OTP_ATTEMPTS_EXCEEDED") {
      return "Too many attempts. Please request a new code."
    }

    if (code === "OTP_RESEND_TOO_SOON") {
      return "Please wait before requesting another code."
    }

    if (code === "RESET_TOKEN_INVALID" || code === "RESET_TOKEN_EXPIRED") {
      return "Your reset authorization has expired. Start again."
    }

    if (code === "RATE_LIMITED") {
      return "Too many requests. Please try again later."
    }
  }

  return fallback
}

export function ForgotPasswordForm({
  onRequestOtp,
  onVerifyOtp,
  onResendOtp,
  onResetPassword,
}: ForgotPasswordFormProps) {
  const formId = useId()

  const [recovery, setRecovery] = useState<PasswordRecoveryState>({
    step: "email",
  })

  const [activeAction, setActiveAction] = useState<RecoveryAction | null>(null)

  const [serverError, setServerError] = useState<string | null>(null)

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [remainingSeconds, setRemainingSeconds] = useState(0)

  const emailForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  })

  const otpForm = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onTouched",
    defaultValues: {
      otp: "",
    },
  })

  const passwordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const isBusy = activeAction !== null

  const currentStepIndex = getRecoveryStepIndex(recovery.step)

  /* ============================================================
     RESEND COOLDOWN
  ============================================================ */

  const resendAvailableAt =
    recovery.step === "otp" ? recovery.resendAvailableAt : null

  useEffect(() => {
    if (!resendAvailableAt) {
      return
    }

    const updateRemaining = () => {
      setRemainingSeconds(getRemainingSeconds(resendAvailableAt))
    }

    updateRemaining()

    const interval = window.setInterval(updateRemaining, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [resendAvailableAt])

  /* ============================================================
     STEP 1 — REQUEST OTP
  ============================================================ */

  async function handleRequestOtp(values: ForgotPasswordFormValues) {
    if (isBusy) return

    setActiveAction("request")
    setServerError(null)

    try {
      const response = await onRequestOtp(values)

      otpForm.reset({ otp: "" })
      passwordForm.reset({
        newPassword: "",
        confirmPassword: "",
      })

      setRemainingSeconds(getRemainingSeconds(response.resendAvailableAt))

      setRecovery({
        step: "otp",
        email: values.email,
        recoveryId: response.recoveryId,
        resendAvailableAt: response.resendAvailableAt,
      })
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "Unable to process your request. Please try again."
        )
      )
    } finally {
      setActiveAction(null)
    }
  }

  /* ============================================================
     STEP 2 — VERIFY OTP
  ============================================================ */

  async function handleVerifyOtp(values: VerifyOtpFormValues) {
    if (isBusy || recovery.step !== "otp") {
      return
    }

    const currentRecovery = recovery

    setActiveAction("verify")
    setServerError(null)

    try {
      const response = await onVerifyOtp({
        recoveryId: currentRecovery.recoveryId,
        otp: values.otp,
      })

      otpForm.reset({ otp: "" })

      setRecovery({
        step: "new_password",
        email: currentRecovery.email,
        resetToken: response.resetToken,
        expiresAt: response.expiresAt,
      })
    } catch (error) {
      otpForm.reset({ otp: "" })

      setServerError(
        getErrorMessage(error, "Unable to verify your code. Please try again.")
      )
    } finally {
      setActiveAction(null)
    }
  }

  /* ============================================================
     RESEND OTP
  ============================================================ */

  async function handleResendOtp() {
    if (
      isBusy ||
      recovery.step !== "otp" ||
      getRemainingSeconds(recovery.resendAvailableAt) > 0
    ) {
      return
    }

    const currentRecovery = recovery

    setActiveAction("resend")
    setServerError(null)

    try {
      const response = await onResendOtp({
        recoveryId: currentRecovery.recoveryId,
      })

      otpForm.reset({ otp: "" })

      setRemainingSeconds(getRemainingSeconds(response.resendAvailableAt))

      setRecovery({
        ...currentRecovery,
        resendAvailableAt: response.resendAvailableAt,
      })
    } catch (error) {
      setServerError(
        getErrorMessage(error, "Unable to resend the code. Please try again.")
      )
    } finally {
      setActiveAction(null)
    }
  }

  /* ============================================================
     STEP 3 — RESET PASSWORD
  ============================================================ */

  async function handleResetPassword(values: ResetPasswordFormValues) {
    if (isBusy || recovery.step !== "new_password") {
      return
    }

    const currentRecovery = recovery

    if (Date.parse(currentRecovery.expiresAt) <= Date.now()) {
      setServerError("Your reset authorization has expired. Start again.")
      return
    }

    setActiveAction("reset")
    setServerError(null)

    try {
      await onResetPassword({
        resetToken: currentRecovery.resetToken,
        newPassword: values.newPassword,
      })

      passwordForm.reset({
        newPassword: "",
        confirmPassword: "",
      })

      emailForm.reset({ email: "" })
      otpForm.reset({ otp: "" })

      setRecovery({
        step: "success",
      })
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "Unable to reset your password. Please try again."
        )
      )
    } finally {
      setActiveAction(null)
    }
  }

  /* ============================================================
     NAVIGATION
  ============================================================ */

  function handleChangeEmail() {
    if (isBusy) return

    otpForm.reset({ otp: "" })

    setServerError(null)
    setRemainingSeconds(0)

    setRecovery({
      step: "email",
    })
  }

  function handleStartOver() {
    if (isBusy) return

    emailForm.reset({ email: "" })
    otpForm.reset({ otp: "" })

    passwordForm.reset({
      newPassword: "",
      confirmPassword: "",
    })

    setShowPassword(false)
    setShowConfirmPassword(false)
    setServerError(null)
    setRemainingSeconds(0)

    setRecovery({
      step: "email",
    })
  }

  /* ============================================================
     SUCCESS STATE
  ============================================================ */

  if (recovery.step === "success") {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Password reset successful
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Your password has been updated. You can now sign in with your new
            password.
          </p>
        </div>

        <Button
          className="h-11 w-full"
          nativeButton={false}
          render={<Link href="/login" />}
        >
          Back to sign in
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>
    )
  }

  /* ============================================================
     FORM RENDER
  ============================================================ */

  return (
    <div className="w-full space-y-6">
      {/* Progress indicator */}
      <nav aria-label="Password recovery progress">
        <ol className="grid grid-cols-3 gap-2">
          {RECOVERY_STEPS.map((item, index) => {
            const Icon = item.icon

            const completed = index < currentStepIndex

            const active = index === currentStepIndex

            return (
              <li
                key={item.id}
                aria-current={active ? "step" : undefined}
                className="min-w-0 space-y-2"
              >
                <div
                  className={[
                    "h-1 rounded-full",
                    completed || active ? "bg-primary" : "bg-border",
                  ].join(" ")}
                />

                <div
                  className={[
                    "flex items-center justify-center gap-1.5",
                    "text-xs",
                    active || completed
                      ? "text-foreground"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  <Icon aria-hidden="true" className="size-3.5 shrink-0" />

                  <span className="truncate">{item.label}</span>
                </div>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Step-specific heading */}
      <div className="space-y-1.5 text-center">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {recovery.step === "email"
            ? "Enter your email"
            : recovery.step === "otp"
              ? "Verify your email"
              : "Create a new password"}
        </h2>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {recovery.step === "email"
            ? "We'll send a verification code to your account email."
            : recovery.step === "otp"
              ? `Enter the 6-digit code sent to ${recovery.email}.`
              : "Choose a strong password to secure your account."}
        </p>
      </div>

      {/* Server-side error */}
      {serverError && (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          {serverError}
        </div>
      )}

      {/* ======================================================
          STEP 1 — EMAIL
      ====================================================== */}

      {recovery.step === "email" && (
        <form noValidate onSubmit={emailForm.handleSubmit(handleRequestOtp)}>
          <FieldGroup className="gap-5">
            <Controller
              name="email"
              control={emailForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-email`}>
                    Email address
                  </FieldLabel>

                  <Input
                    {...field}
                    id={`${formId}-email`}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={isBusy}
                    aria-invalid={fieldState.invalid}
                    className="h-11"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={isBusy} className="h-11 w-full">
              {activeAction === "request" ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                  Sending code...
                </>
              ) : (
                <>
                  Send verification code
                  <ArrowRight aria-hidden="true" className="size-4" />
                </>
              )}
            </Button>
          </FieldGroup>
        </form>
      )}

      {/* ======================================================
          STEP 2 — VERIFY OTP
      ====================================================== */}

      {recovery.step === "otp" && (
        <form noValidate onSubmit={otpForm.handleSubmit(handleVerifyOtp)}>
          <FieldGroup className="gap-5">
            <Controller
              name="otp"
              control={otpForm.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="items-center"
                >
                  <FieldLabel htmlFor={`${formId}-otp`} className="self-start">
                    Verification code
                  </FieldLabel>

                  <InputOTP
                    id={`${formId}-otp`}
                    maxLength={AUTH_VALIDATION.OTP_LENGTH}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={isBusy}
                    aria-invalid={fieldState.invalid}
                    autoComplete="one-time-code"
                    containerClassName="justify-center"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>

                    <InputOTPSeparator />

                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="self-start"
                    />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={
                isBusy ||
                otpForm.watch("otp").length !== AUTH_VALIDATION.OTP_LENGTH
              }
              className="h-11 w-full"
            >
              {activeAction === "verify" ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                  Verifying...
                </>
              ) : (
                <>
                  Verify code
                  <ArrowRight aria-hidden="true" className="size-4" />
                </>
              )}
            </Button>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isBusy}
                onClick={handleChangeEmail}
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Change email
              </Button>

              <Button
                type="button"
                variant="link"
                size="sm"
                disabled={isBusy || remainingSeconds > 0}
                onClick={handleResendOtp}
              >
                {activeAction === "resend"
                  ? "Resending..."
                  : remainingSeconds > 0
                    ? `Resend in ${remainingSeconds}s`
                    : "Resend code"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      )}

      {/* ======================================================
          STEP 3 — NEW PASSWORD
      ====================================================== */}

      {recovery.step === "new_password" && (
        <form
          noValidate
          onSubmit={passwordForm.handleSubmit(handleResetPassword)}
        >
          <FieldGroup className="gap-5">
            <Controller
              name="newPassword"
              control={passwordForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-new-password`}>
                    New password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id={`${formId}-new-password`}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter new password"
                      disabled={isBusy}
                      aria-invalid={fieldState.invalid}
                      className="h-11 pr-11"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={isBusy}
                      onClick={() => setShowPassword((previous) => !previous)}
                      aria-label={
                        showPassword ? "Hide new password" : "Show new password"
                      }
                      aria-pressed={showPassword}
                      style={{ transform: "translateY(-50%)" }}
                      className="absolute top-1/2 right-1.5 size-8 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                      ) : (
                        <Eye aria-hidden="true" className="size-4" />
                      )}
                    </Button>
                  </div>

                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Use at least {AUTH_VALIDATION.PASSWORD_MIN_LENGTH}{" "}
                      characters.
                    </p>
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={passwordForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${formId}-confirm-password`}>
                    Confirm password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id={`${formId}-confirm-password`}
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Confirm new password"
                      disabled={isBusy}
                      aria-invalid={fieldState.invalid}
                      className="h-11 pr-11"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={isBusy}
                      onClick={() =>
                        setShowConfirmPassword((previous) => !previous)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                      aria-pressed={showConfirmPassword}
                      style={{ transform: "translateY(-50%)" }}
                      className="absolute top-1/2 right-1.5 size-8 -translate-y-1/2 text-muted-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                      ) : (
                        <Eye aria-hidden="true" className="size-4" />
                      )}
                    </Button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={isBusy} className="h-11 w-full">
              {activeAction === "reset" ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-4 animate-spin"
                  />
                  Resetting password...
                </>
              ) : (
                <>
                  Reset password
                  <ArrowRight aria-hidden="true" className="size-4" />
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              disabled={isBusy}
              onClick={handleStartOver}
              className="w-full"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Start over
            </Button>
          </FieldGroup>
        </form>
      )}

      {/* Sign in navigation */}
      {recovery.step !== "new_password" && (
        <div className="text-center">
          <Button
            variant="link"
            size="sm"
            nativeButton={false}
            render={<Link href="/login" />}
            className="text-muted-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to sign in
          </Button>
        </div>
      )}
    </div>
  )
}
