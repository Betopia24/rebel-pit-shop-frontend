export type ISODateTime = string

export type AuthUserId = string

export type AuthRequestId = string

export type AuthUserRole = "admin" | "coach" | "staff"

export type AuthAccountStatus = "active" | "inactive" | "suspended"

export interface AuthUser {
  id: AuthUserId
  name: string
  email: string
  role: AuthUserRole
  status: AuthAccountStatus
  avatarUrl: string | null
}

export interface LoginFormValues {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginRequest = LoginFormValues

export interface LoginResponse {
  user: AuthUser
  session: AuthSession
}

export interface AuthSession {
  expiresAt: ISODateTime
}

export interface CurrentSessionResponse {
  user: AuthUser
  session: AuthSession
}

export type PasswordRecoveryStep = "email" | "otp" | "new_password" | "success"

export interface ForgotPasswordFormValues {
  email: string
}
export type ForgotPasswordRequest = ForgotPasswordFormValues

export interface ForgotPasswordResponse {
  message: string
  recoveryId: string
  resendAvailableAt: ISODateTime
}

export interface VerifyOtpFormValues {
  otp: string
}

export interface VerifyOtpRequest {
  recoveryId: string
  otp: string
}

export interface VerifyOtpResponse {
  resetToken: string
  expiresAt: ISODateTime
}

export interface ResendOtpRequest {
  recoveryId: string
}

export interface ResendOtpResponse {
  message: string
  resendAvailableAt: ISODateTime
}

export interface ResetPasswordFormValues {
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordRequest {
  resetToken: string
  newPassword: string
}

export interface ResetPasswordResponse {
  message: string
}

export type PasswordRecoveryState =
  | {
      step: "email"
    }
  | {
      step: "otp"
      email: string
      recoveryId: string
      resendAvailableAt: ISODateTime
    }
  | {
      step: "new_password"
      email: string
      resetToken: string
      expiresAt: ISODateTime
    }
  | {
      step: "success"
    }

export type AuthErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_CREDENTIALS"
  | "ACCOUNT_INACTIVE"
  | "ACCOUNT_SUSPENDED"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "OTP_INVALID"
  | "OTP_EXPIRED"
  | "OTP_ATTEMPTS_EXCEEDED"
  | "OTP_RESEND_TOO_SOON"
  | "RECOVERY_SESSION_EXPIRED"
  | "RESET_TOKEN_INVALID"
  | "RESET_TOKEN_EXPIRED"
  | "RATE_LIMITED"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"

export interface AuthApiError {
  code: AuthErrorCode
  message: string
  requestId?: AuthRequestId
  retryAfterSeconds?: number
}

export type AuthApiResult<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: AuthApiError
    }

export interface LogoutResponse {
  message: string
}
