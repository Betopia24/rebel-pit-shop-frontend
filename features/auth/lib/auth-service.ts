
import "server-only";

import type {
  AuthApiError,
  AuthApiResult,
  CurrentSessionResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/features/auth/types/auth.types";

/**
 * ============================================================
 * REBEL BOXING CLUB
 * Authentication API Service
 * ============================================================
 *
 * Server-side only.
 *
 * Responsibilities:
 * - Login
 * - Current session
 * - Request password reset OTP
 * - Verify OTP
 * - Resend OTP
 * - Reset password
 * - Logout
 *
 * This service communicates with the backend.
 *
 * IMPORTANT:
 * The backend must implement these endpoints
 * and the agreed response contracts.
 *
 * Cookie creation, session persistence and
 * logout cookie clearing must be handled by
 * the trusted authentication boundary.
 * ============================================================
 */

/* ============================================================
   CONFIGURATION
============================================================ */

const AUTH_ENDPOINTS = {
  login: "/auth/login",
  me: "/auth/me",
  logout: "/auth/logout",
  requestOtp: "/auth/forgot-password",
  verifyOtp: "/auth/verify-otp",
  resendOtp: "/auth/resend-otp",
  resetPassword: "/auth/reset-password",
} as const;

const REQUEST_TIMEOUT_MS = 15_000;

/* ============================================================
   ERRORS
============================================================ */

export class AuthServiceError extends Error {
  readonly code: AuthApiError["code"];
  readonly requestId?: string;
  readonly retryAfterSeconds?: number;
  readonly status: number;

  constructor(
    error: AuthApiError,
    status: number = 500,
  ) {
    super(error.message);

    this.name = "AuthServiceError";
    this.code = error.code;
    this.requestId = error.requestId;
    this.retryAfterSeconds =
      error.retryAfterSeconds;
    this.status = status;
  }
}

/* ============================================================
   HELPERS
============================================================ */

function getApiBaseUrl(): URL {
  const rawUrl = process.env.AUTH_API_BASE_URL;

  if (!rawUrl) {
    throw new AuthServiceError({
      code: "SERVER_ERROR",
      message:
        "Authentication service is not configured.",
    });
  }

  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    throw new AuthServiceError({
      code: "SERVER_ERROR",
      message:
        "Invalid authentication service configuration.",
    });
  }

  if (
    url.protocol !== "https:" &&
    !(
      process.env.NODE_ENV !== "production" &&
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(
        url.hostname,
      )
    )
  ) {
    throw new AuthServiceError({
      code: "SERVER_ERROR",
      message:
        "Authentication service requires a secure URL.",
    });
  }

  return url;
}

function createEndpointUrl(
  path: string,
): string {
  const base = getApiBaseUrl();

  const basePath = base.pathname.replace(/\/+$/, "");
  const endpointPath = path.replace(/^\/+/, "");

  base.pathname = `${basePath}/${endpointPath}`;

  base.search = "";
  base.hash = "";

  return base.toString();
}

function getFallbackError(
  status: number,
): AuthApiError {
  if (status === 401) {
    return {
      code: "UNAUTHORIZED",
      message: "Authentication failed.",
    };
  }

  if (status === 403) {
    return {
      code: "FORBIDDEN",
      message: "Access denied.",
    };
  }

  if (status === 429) {
    return {
      code: "RATE_LIMITED",
      message:
        "Too many requests. Please try again later.",
    };
  }

  if (status >= 500) {
    return {
      code: "SERVER_ERROR",
      message:
        "Authentication service is temporarily unavailable.",
    };
  }

  return {
    code: "VALIDATION_ERROR",
    message: "Unable to process your request.",
  };
}

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function parseApiError(
  payload: unknown,
  status: number,
): AuthApiError {
  const fallback = getFallbackError(status);

  if (!isRecord(payload)) {
    return fallback;
  }

  const error = payload.error;

  if (!isRecord(error)) {
    return fallback;
  }

  return {
    code:
      typeof error.code === "string"
        ? (error.code as AuthApiError["code"])
        : fallback.code,

    // Do not expose arbitrary backend messages.
    message: fallback.message,

    requestId:
      typeof error.requestId === "string"
        ? error.requestId
        : undefined,

    retryAfterSeconds:
      typeof error.retryAfterSeconds === "number" &&
      Number.isFinite(error.retryAfterSeconds) &&
      error.retryAfterSeconds >= 0
        ? error.retryAfterSeconds
        : undefined,
  };
}

/* ============================================================
   HTTP CLIENT
============================================================ */

interface AuthRequestOptions {
  method?: "GET" | "POST";
  body?: unknown;

  /**
   * Optional trusted request headers.
   *
   * For server-side session forwarding only.
   * Do not pass browser-controlled headers.
   */
  headers?: HeadersInit;
}

async function authRequest<T>(
  path: string,
  options: AuthRequestOptions = {},
): Promise<T> {
  const url = createEndpointUrl(path);

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: options.method ?? "POST",
      headers,
      body:
        options.body === undefined
          ? undefined
          : JSON.stringify(options.body),
      cache: "no-store",
      signal: AbortSignal.timeout(
        REQUEST_TIMEOUT_MS,
      ),
    });
  } catch {
    throw new AuthServiceError(
      {
        code: "NETWORK_ERROR",
        message:
          "Unable to connect to the authentication service.",
      },
      503,
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new AuthServiceError(
      {
        code: "SERVER_ERROR",
        message:
          "Invalid authentication service response.",
      },
      response.status,
    );
  }

  if (!isRecord(payload)) {
    throw new AuthServiceError(
      {
        code: "SERVER_ERROR",
        message:
          "Invalid authentication service response.",
      },
      response.status,
    );
  }

  const result = payload as AuthApiResult<T>;

  if (
    !response.ok ||
    result.success !== true
  ) {
    throw new AuthServiceError(
      parseApiError(payload, response.status),
      response.status,
    );
  }

  if (!("data" in result)) {
    throw new AuthServiceError(
      {
        code: "SERVER_ERROR",
        message:
          "Authentication response is missing data.",
      },
      response.status,
    );
  }

  /**
   * Backend response must follow the
   * shared AuthApiResult<T> contract.
   *
   * Add runtime response schemas once the
   * backend contract is finalized.
   */
  return result.data;
}

/* ============================================================
   AUTHENTICATION SERVICE
============================================================ */

export const authService = {
  /**
   * Authenticate staff email and password.
   *
   * The backend response is user/session metadata.
   *
   * A trusted server action or route handler
   * must establish the browser's actual session.
   */
  login(
    request: LoginRequest,
  ): Promise<LoginResponse> {
    return authRequest<LoginResponse>(
      AUTH_ENDPOINTS.login,
      {
        body: request,
      },
    );
  },

  /**
   * Fetch the authenticated staff account.
   *
   * Session transport must be supplied by the
   * trusted server-side integration.
   */
  getCurrentSession(
    headers?: HeadersInit,
  ): Promise<CurrentSessionResponse> {
    return authRequest<CurrentSessionResponse>(
      AUTH_ENDPOINTS.me,
      {
        method: "GET",
        headers,
      },
    );
  },

  /**
   * Start email password recovery.
   */
  requestPasswordResetOtp(
    request: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    return authRequest<ForgotPasswordResponse>(
      AUTH_ENDPOINTS.requestOtp,
      {
        body: request,
      },
    );
  },

  /**
   * Validate the six-digit OTP and obtain
   * a limited reset authorization.
   */
  verifyPasswordResetOtp(
    request: VerifyOtpRequest,
  ): Promise<VerifyOtpResponse> {
    return authRequest<VerifyOtpResponse>(
      AUTH_ENDPOINTS.verifyOtp,
      {
        body: request,
      },
    );
  },

  /**
   * Request another recovery code.
   */
  resendPasswordResetOtp(
    request: ResendOtpRequest,
  ): Promise<ResendOtpResponse> {
    return authRequest<ResendOtpResponse>(
      AUTH_ENDPOINTS.resendOtp,
      {
        body: request,
      },
    );
  },

  /**
   * Update the password after OTP verification.
   *
   * Only the verified reset token and
   * new password are sent to the backend.
   */
  resetPassword(
    request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    return authRequest<ResetPasswordResponse>(
      AUTH_ENDPOINTS.resetPassword,
      {
        body: request,
      },
    );
  },

  /**
   * Invalidate the server-side session.
   *
   * The trusted boundary must also clear
   * the browser's authentication cookie.
   */
  logout(
    headers?: HeadersInit,
  ): Promise<LogoutResponse> {
    return authRequest<LogoutResponse>(
      AUTH_ENDPOINTS.logout,
      {
        headers,
      },
    );
  },
};
