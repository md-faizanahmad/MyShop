// src/stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./CartStore";
import { useWishlistStore } from "./WishlistStore";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;

  // Actions
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      token: null,

      login: (userData, token) => {
        set({
          user: userData,
          isLoggedIn: true,
          token,
        });
      },

      logout: () => {
        // Clear auth
        set({
          user: null,
          isLoggedIn: false,
          token: null,
        });

        // CRITICAL: Clear cart & wishlist on logout
        useCartStore.getState().clearCart();
        useWishlistStore.getState().clearWishlist();

        // Optional: Clear localStorage token if stored separately
        localStorage.removeItem("token");
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      setToken: (token) => set({ token }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
      }),
    }
  )
);
