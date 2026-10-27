
import type { Metadata } from "next";

import { AuthShell } from "@/features/auth/components/auth-shell";

import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

import {
  forgotPasswordSchema,
  newPasswordSchema,
  verifyOtpSchema,
} from "@/features/auth/schemas/auth.schema";

import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/features/auth/types/auth.types";

/* ============================================================
   PAGE METADATA
============================================================ */

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Securely reset your Rebel Boxing Club staff account password.",
  robots: {
    index: false,
    follow: false,
  },
};

/* ============================================================
   STEP 1 — REQUEST OTP
============================================================ */

/**
 * Request a password recovery code.
 *
 * Production integration must:
 * - Validate the email.
 * - Apply rate limiting.
 * - Generate a secure OTP.
 * - Store only a protected OTP verifier.
 * - Send the OTP through the configured email service.
 * - Return a generic response regardless of account existence.
 */
async function requestOtp(
  request: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  "use server";

  const result = forgotPasswordSchema.safeParse(request);

  if (!result.success) {
    throw new Error("Invalid email address.");
  }

  // TODO: Connect password recovery service.
  //
  // return authService.requestPasswordResetOtp(
  //   result.data,
  // );

  throw new Error(
    "Password recovery service is not configured.",
  );
}

/* ============================================================
   STEP 2 — VERIFY OTP
============================================================ */

/**
 * Verify the supplied OTP.
 *
 * Production integration must:
 * - Validate recoveryId and OTP.
 * - Enforce OTP expiration.
 * - Enforce attempt limits.
 * - Prevent OTP replay.
 * - Issue short-lived reset authorization.
 */
async function verifyOtp(
  request: VerifyOtpRequest,
): Promise<VerifyOtpResponse> {
  "use server";

  const result = verifyOtpSchema.safeParse({
    otp: request.otp,
  });

  if (
    !request.recoveryId?.trim() ||
    !result.success
  ) {
    throw new Error(
      "Invalid verification request.",
    );
  }

  // TODO: Connect OTP verification service.
  //
  // return authService.verifyPasswordResetOtp({
  //   recoveryId: request.recoveryId,
  //   otp: result.data.otp,
  // });

  throw new Error(
    "OTP verification service is not configured.",
  );
}

/* ============================================================
   RESEND OTP
============================================================ */

/**
 * Request another verification code.
 *
 * The resend cooldown shown in the frontend
 * is only a UI convenience.
 *
 * The backend must independently enforce
 * cooldowns and rate limits.
 */
async function resendOtp(
  request: ResendOtpRequest,
): Promise<ResendOtpResponse> {
  "use server";

  if (!request.recoveryId?.trim()) {
    throw new Error(
      "Invalid recovery request.",
    );
  }

  // TODO: Connect OTP resend service.
  //
  // return authService.resendPasswordResetOtp({
  //   recoveryId: request.recoveryId,
  // });

  throw new Error(
    "OTP resend service is not configured.",
  );
}

/* ============================================================
   STEP 3 — RESET PASSWORD
============================================================ */

/**
 * Set a new password after successful OTP verification.
 *
 * Production integration must:
 * - Validate the reset authorization.
 * - Enforce token expiration and single use.
 * - Enforce the password policy.
 * - Hash the password securely.
 * - Invalidate previous recovery credentials.
 * - Revoke existing sessions as appropriate.
 */
async function resetPassword(
  request: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  "use server";

  const passwordResult =
    newPasswordSchema.safeParse(
      request.newPassword,
    );

  if (
    !request.resetToken?.trim() ||
    !passwordResult.success
  ) {
    throw new Error(
      "Invalid password reset request.",
    );
  }

  // TODO: Connect password reset service.
  //
  // return authService.resetPassword({
  //   resetToken: request.resetToken,
  //   newPassword: passwordResult.data,
  // });

  throw new Error(
    "Password reset service is not configured.",
  );
}

/* ============================================================
   PAGE
============================================================ */

/**
 * Shared password recovery page for
 * Rebel Boxing Club Admin and Coach.
 *
 * Flow:
 *
 * Email
 *   ↓
 * Verify OTP
 *   ↓
 * New Password + Confirm Password
 *   ↓
 * Success
 *
 * All steps are handled in one client form.
 * Backend operations use Server Actions.
 */
export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Reset your password">
      <ForgotPasswordForm
        onRequestOtp={requestOtp}
        onVerifyOtp={verifyOtp}
        onResendOtp={resendOtp}
        onResetPassword={resetPassword}
      />
    </AuthShell>
  );
}
