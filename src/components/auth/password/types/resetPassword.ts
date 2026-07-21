// src/features/auth/types/resetPassword.ts

/* -------------------------------------------------------------------------- */
/*                              Reset Password Step                           */
/* -------------------------------------------------------------------------- */

export const RESET_PASSWORD_STEP = {
  EMAIL: "EMAIL",
  VERIFY_OTP: "VERIFY_OTP",
  RESET_PASSWORD: "RESET_PASSWORD",
} as const;

export type ResetPasswordStep =
  (typeof RESET_PASSWORD_STEP)[keyof typeof RESET_PASSWORD_STEP];

/* -------------------------------------------------------------------------- */
/*                                 OTP Config                                 */
/* -------------------------------------------------------------------------- */

export const OTP_LENGTH = 6;

/* -------------------------------------------------------------------------- */
/*                             Initial OTP Value                              */
/* -------------------------------------------------------------------------- */

export const INITIAL_OTP = Array.from({ length: OTP_LENGTH }, () => "");

/* -------------------------------------------------------------------------- */
/*                              Reset Password Form                           */
/* -------------------------------------------------------------------------- */

export interface ResetPasswordForm {
  email: string;
  otp: string[];
  newPassword: string;
  confirmPassword: string;
}

/* -------------------------------------------------------------------------- */
/*                           Reset Password Hook                              */
/* -------------------------------------------------------------------------- */

export interface UseResetPasswordReturn {
  step: ResetPasswordStep;

  email: string;
  otp: string[];

  newPassword: string;
  confirmPassword: string;

  showPassword: boolean;
  showConfirmPassword: boolean;

  isLoading: boolean;

  isOtpComplete: boolean;
  isPasswordMatched: boolean;
  canResetPassword: boolean;

  setEmail: (value: string) => void;

  setNewPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;

  handleOtpChange: (value: string[]) => void;
  handleEmailSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleOtpSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleResetPassword: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

  resendOtp: () => Promise<void>;

  goBackToEmail: () => void;
  goBackToOtp: () => void;

  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;

  resetFlow: () => void;
}
