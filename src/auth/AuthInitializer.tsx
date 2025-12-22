import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useCartStore } from "../store/useCartStore";

/**
 * App boot sequence (runs once)
 * 1. Restore auth session from cookie
 * 2. Hydrate wishlist & cart AFTER auth is confirmed
 */
export default function AuthInitializer(): null {
  useEffect(() => {
    const boot = async (): Promise<void> => {
      const authStore = useAuthStore.getState();

      // 🔑 Step 1: restore session
      await authStore.restoreSession();

      // 🔁 Re-read UPDATED auth state
      const { status } = useAuthStore.getState();

      // 🔑 Step 2: hydrate protected data
      if (status === "authenticated") {
        await Promise.all([
          useWishlistStore.getState().hydrate(),
          useCartStore.getState().hydrate(),
        ]);
      }
    };

    void boot();
  }, []);

  return null;
}
