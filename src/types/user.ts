// src/types/user.ts

/**
 * Public, frontend-safe user object.
 * Comes from GET /v1/users/me
 */
export interface PublicUser {
  /** Stable string id (mapped from backend id) */
  id: string;

  name: string;
  email: string;
  phone?: string;
}

/**
 * API response for /v1/users/me
 */
export interface MeResponse {
  success: boolean;
  user: PublicUser;
}
