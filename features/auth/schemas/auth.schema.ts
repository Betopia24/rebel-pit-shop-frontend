import { z } from "zod";

import type {
  ForgotPasswordFormValues,
  LoginFormValues,
  ResetPasswordFormValues,
  VerifyOtpFormValues,
} from "../types/auth.types";

export const AUTH_VALIDATION = {
  EMAIL_MAX_LENGTH: 254,
  PASSWORD_MIN_LENGTH: 12,
  PASSWORD_MAX_LENGTH: 128,
  OTP_LENGTH: 6,
} as const;

export const emailSchema = z
  .string()
  .trim()
  .min(1, {
    error: "Email address is required.",
  })
  .max(AUTH_VALIDATION.EMAIL_MAX_LENGTH, {
    error: "Email address is too long.",
  })
  .pipe(
    z.email({
      error: "Enter a valid email address.",
    }),
  );

  export const loginSchema = z.object({
  email: emailSchema,

  password: z
    .string()
    .min(1, {
      error: "Password is required.",
    }),

  rememberMe: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const otpSchema = z
  .string()
  .length(AUTH_VALIDATION.OTP_LENGTH, {
    error: "Enter the complete 6-digit code.",
  })
  .regex(/^\d{6}$/, {
    error: "Verification code must contain only numbers.",
  });

export const verifyOtpSchema = z.object({
  otp: otpSchema,
});

export const newPasswordSchema = z
  .string()
  .min(AUTH_VALIDATION.PASSWORD_MIN_LENGTH, {
    error: `Password must contain at least ${AUTH_VALIDATION.PASSWORD_MIN_LENGTH} characters.`,
  })
  .max(AUTH_VALIDATION.PASSWORD_MAX_LENGTH, {
    error: `Password must not exceed ${AUTH_VALIDATION.PASSWORD_MAX_LENGTH} characters.`,
  });

  export const resetPasswordSchema = z
  .object({
    newPassword: newPasswordSchema,

    confirmPassword: z.string().min(1, {
      error: "Please confirm your new password.",
    }),
  })
  .refine(
    (values) =>
      values.newPassword === values.confirmPassword,
    {
      error: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

  type SchemaOutputMatches<
  TSchema extends z.ZodType,
  TExpected,
> =
  z.output<TSchema> extends TExpected
    ? true
    : false;

const schemaCompatibility: {
  login: SchemaOutputMatches<
    typeof loginSchema,
    LoginFormValues
  >;
  forgotPassword: SchemaOutputMatches<
    typeof forgotPasswordSchema,
    ForgotPasswordFormValues
  >;
  verifyOtp: SchemaOutputMatches<
    typeof verifyOtpSchema,
    VerifyOtpFormValues
  >;
  resetPassword: SchemaOutputMatches<
    typeof resetPasswordSchema,
    ResetPasswordFormValues
  >;
} = {
  login: true,
  forgotPassword: true,
  verifyOtp: true,
  resetPassword: true,
};

void schemaCompatibility;

export type LoginSchemaInput = z.input<typeof loginSchema>;
export type LoginSchemaOutput = z.output<typeof loginSchema>;

export type ForgotPasswordSchemaInput =
  z.input<typeof forgotPasswordSchema>;

export type ForgotPasswordSchemaOutput =
  z.output<typeof forgotPasswordSchema>;

export type VerifyOtpSchemaInput =
  z.input<typeof verifyOtpSchema>;

export type VerifyOtpSchemaOutput =
  z.output<typeof verifyOtpSchema>;

export type ResetPasswordSchemaInput =
  z.input<typeof resetPasswordSchema>;

export type ResetPasswordSchemaOutput =
  z.output<typeof resetPasswordSchema>;