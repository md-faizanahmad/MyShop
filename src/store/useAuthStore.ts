// src/store/useAuthStore.ts
import { create } from "zustand";

/* ----------------------------------
   Types
---------------------------------- */

export interface PublicUser {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface MeResponse {
  success: boolean;
  user?: PublicUser;
}

export type AuthStatus = "idle" | "loading" | "authenticated" | "guest";

interface AuthState {
  user: PublicUser | null;
  status: AuthStatus;
  initializing: boolean;

  /* lifecycle */
  restoreSession: () => Promise<void>;

  /* auth actions */
  loginWithPassword: (input: {
    email: string;
    password: string;
  }) => Promise<void>;

  sendOtp: (email: string) => Promise<void>;

  loginWithOtp: (input: { email: string; otp: string }) => Promise<void>;

  logout: () => Promise<void>;

  /* internal */
  _forceLogout: () => void;
}

/* ----------------------------------
   Config
---------------------------------- */

const API_BASE = import.meta.env.VITE_API_URL as string;

/* ----------------------------------
   Store
---------------------------------- */

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: "idle",
  initializing: true,

  /* ----------------------------------
     RESTORE SESSION
  ---------------------------------- */
  restoreSession: async () => {
    set({ status: "loading" });

    try {
      const res = await fetch(`${API_BASE}/v1/users/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        set({
          user: null,
          status: "guest",
          initializing: false,
        });
        return;
      }

      const data: MeResponse = await res.json();

      if (data.success && data.user) {
        set({
          user: data.user,
          status: "authenticated",
          initializing: false,
        });
      } else {
        set({
          user: null,
          status: "guest",
          initializing: false,
        });
      }
    } catch {
      set({
        user: null,
        status: "guest",
        initializing: false,
      });
    }
  },

  /* ----------------------------------
     LOGIN WITH PASSWORD
  ---------------------------------- */
  loginWithPassword: async ({ email, password }) => {
    set({ status: "loading" });

    const res = await fetch(`${API_BASE}/v1/users/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      set({ status: "guest" });
      throw new Error("LOGIN_FAILED");
    }

    await get().restoreSession();
  },

  /* ----------------------------------
     SEND OTP
  ---------------------------------- */
  sendOtp: async (email) => {
    if (!email) throw new Error("EMAIL_REQUIRED");

    const res = await fetch(`${API_BASE}/v1/users/send-otp`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        purpose: "login",
      }),
    });

    if (!res.ok) {
      throw new Error("OTP_SEND_FAILED");
    }
  },

  /* ----------------------------------
     LOGIN WITH OTP
  ---------------------------------- */
  loginWithOtp: async ({ email, otp }) => {
    set({ status: "loading" });

    const res = await fetch(`${API_BASE}/v1/users/verify-otp`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp,
        purpose: "login",
      }),
    });

    if (!res.ok) {
      set({ status: "guest" });
      throw new Error("OTP_LOGIN_FAILED");
    }

    await get().restoreSession();
  },

  /* ----------------------------------
     LOGOUT
  ---------------------------------- */
  logout: async () => {
    try {
      await fetch(`${API_BASE}/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      set({
        user: null,
        status: "guest",
      });
    }
  },

  /* ----------------------------------
     FORCE LOGOUT (401 interceptor)
  ---------------------------------- */
  _forceLogout: () => {
    set({
      user: null,
      status: "guest",
    });
  },
}));
