// src/hooks/useLoginWithOTP.ts
import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";

const API = import.meta.env.VITE_API_URL ?? "";

export type UseLoginWithOTPOptions = {
  cooldownSeconds?: number;
};

export type UseLoginWithOTPReturn = {
  step: "email" | "otp";
  email: string;
  setEmail: (v: string) => void;
  otp: string;
  setOtp: (v: string) => void;
  sending: boolean;
  verifying: boolean;
  remaining: number;
  errorMessage: string | null;
  sendOTP: () => Promise<void>;
  verifyOTP: () => Promise<void>;
  resetToEmail: () => void;
  clearError: () => void;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function useLoginWithOTP({
  cooldownSeconds = 60,
}: UseLoginWithOTPOptions = {}): UseLoginWithOTPReturn {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const [sending, setSending] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mountedRef = useRef<boolean>(true);
  const sendControllerRef = useRef<AbortController | null>(null);
  const verifyControllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      sendControllerRef.current?.abort();
      verifyControllerRef.current?.abort();
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // countdown
  useEffect(() => {
    if (remaining <= 0) return;
    timerRef.current = window.setInterval(() => {
      setRemaining((s) => {
        const next = s - 1;
        if (next <= 0 && timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return Math.max(0, next);
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [remaining]);

  const clearError = useCallback(() => setErrorMessage(null), []);

  const startCooldown = useCallback(
    (secs = cooldownSeconds) => {
      setRemaining(secs);
    },
    [cooldownSeconds]
  );

  const sendOTP = useCallback(async () => {
    clearError();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (sending || remaining > 0) return;

    setSending(true);
    sendControllerRef.current?.abort();
    sendControllerRef.current = new AbortController();

    try {
      await axios.post(
        `${API}/v1/auth/login/send-otp`,
        { email: trimmed },
        { withCredentials: true, signal: sendControllerRef.current.signal }
      );

      if (!mountedRef.current) return;
      // generic message handled by UI/consumer (do not reveal existence)
      setStep("otp");
      setOtp("");
      startCooldown();
    } catch (err) {
      const aerr = err as AxiosError;
      if (aerr?.name === "CanceledError" || aerr?.name === "AbortError") {
        return;
      }
      const message =
        (aerr?.response?.data as unknown as { message?: string })?.message ??
        "Unable to send OTP. Try again later.";
      if (mountedRef.current) setErrorMessage(message);
    } finally {
      if (mountedRef.current) setSending(false);
    }
  }, [email, sending, remaining, startCooldown, clearError]);

  const verifyOTP = useCallback(async () => {
    clearError();
    const trimmedOtp = otp.trim();
    if (trimmedOtp.length < 4) {
      setErrorMessage("Enter a valid OTP (4+ characters).");
      return;
    }
    if (verifying) return;

    setVerifying(true);
    verifyControllerRef.current?.abort();
    verifyControllerRef.current = new AbortController();

    try {
      await axios.post(
        `${API}/v1/auth/login/verify-otp`,
        { email: email.trim(), otp: trimmedOtp },
        { withCredentials: true, signal: verifyControllerRef.current.signal }
      );

      if (!mountedRef.current) return;
      // success - consumer will handle navigation/refresh
    } catch (err) {
      const aerr = err as AxiosError;
      if (aerr?.name === "CanceledError" || aerr?.name === "AbortError") {
        return;
      }
      const message =
        (aerr?.response?.data as unknown as { message?: string })?.message ??
        "Invalid OTP.";
      if (mountedRef.current) setErrorMessage(message);
      throw err; // rethrow so consumer can react (container)
    } finally {
      if (mountedRef.current) setVerifying(false);
    }
  }, [email, otp, verifying, clearError]);

  const resetToEmail = useCallback(() => {
    setStep("email");
    setOtp("");
    setErrorMessage(null);
  }, []);

  return {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    sending,
    verifying,
    remaining,
    errorMessage,
    sendOTP,
    verifyOTP,
    resetToEmail,
    clearError,
  };
}
