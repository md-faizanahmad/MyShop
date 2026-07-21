// src/features/auth/api/resetPasswordApi.ts

import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

export interface ResendOtpPayload {
  email: string;
}
const API_BASE = import.meta.env.VITE_API_URL as string;
/* -------------------------------------------------------------------------- */
/*                             Forgot Password                                */
/* -------------------------------------------------------------------------- */

export const forgotPassword = async ({ email }: ForgotPasswordPayload) => {
  const { data } = await axios.post(`${API_BASE}/v1/users/forgot-password`, {
    email,
  });

  return data;
};

/* -------------------------------------------------------------------------- */
/*                                Verify OTP                                  */
/* -------------------------------------------------------------------------- */

export const verifyOtp = async ({ email, otp }: VerifyOtpPayload) => {
  const { data } = await axios.post(`${API_BASE}/v1/users/verify-otp`, {
    email,
    otp,
    purpose: "password_reset",
  });

  return data;
};

/* -------------------------------------------------------------------------- */
/*                              Reset Password                                */
/* -------------------------------------------------------------------------- */

export const resetPassword = async ({
  email,
  newPassword,
}: ResetPasswordPayload) => {
  const { data } = await axios.post(`${API_BASE}/v1/users/reset-password`, {
    email,
    newPassword,
  });

  return data;
};

/* -------------------------------------------------------------------------- */
/*                                Resend OTP                                  */
/* -------------------------------------------------------------------------- */

export const resendOtp = async ({ email }: ResendOtpPayload) => {
  const { data } = await axios.post(`${API_BASE}/v1/users/resend-otp`, {
    email,
    purpose: "password_reset",
  });

  return data;
};
