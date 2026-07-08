// src/features/auth/types.ts

import type { ChangeEvent, FormEvent } from "react";

export interface LoginFormProps {
  email: string;
  password: string;
  otp: string;

  showPassword: boolean;
  otpSent: boolean;
  resendTimer: number;

  loading: boolean;
  otpLoading: boolean;
  verifyLoading: boolean;

  error: string;

  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOtpChange: (e: ChangeEvent<HTMLInputElement>) => void;

  onSubmitPassword: (e: FormEvent<HTMLFormElement>) => void;
  onSendOtp: () => void;
  onVerifyOtp: () => void;

  toggleShowPassword: () => void;
}
