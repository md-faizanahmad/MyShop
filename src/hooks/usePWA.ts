// src/hooks/usePWA.ts
import { useCallback, useEffect, useState } from "react";

/**
 * Lightweight, robust PWA hook that does not rely on
 * the 'virtual:pwa-register' virtual module (avoids tsc errors).
 *
 * It registers /sw.js (which vite-plugin-pwa generates at build time)
 * and exposes:
 *  - isInstallable
 *  - isOfflineReady
 *  - isUpdateAvailable
 *  - install() -> triggers the saved beforeinstallprompt event
 *  - applyUpdate() -> tells the waiting SW to skipWaiting (then page should reload)
 */

/* Local shape for the install prompt event (no global dependency) */
type InstallPromptEventShape = Event & {
  prompt?: () => Promise<void>;
  userChoice?: Promise<{
    outcome: "accepted" | "dismissed";
    platform?: string;
  }>;
};

type UpdateState = {
  isUpdateAvailable: boolean;
  // function that will send SKIP_WAITING to waiting SW (or null)
  applyUpdate: (() => void) | null;
};

export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOfflineReady, setIsOfflineReady] = useState(false);
  const [updateState, setUpdateState] = useState<UpdateState>({
    isUpdateAvailable: false,
    applyUpdate: null,
  });

  // Register the service worker at runtime using standard API.
  // This avoids importing any virtual module and works with vite-plugin-pwa generated /sw.js.
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let registration: ServiceWorkerRegistration | null = null;
    console.log(registration);
    let waitingWorker: ServiceWorker | null = null;

    const onRegistrationSuccess = (reg: ServiceWorkerRegistration) => {
      registration = reg;

      // If there's already a waiting worker (e.g. after update), expose update
      if (reg.waiting) {
        waitingWorker = reg.waiting;
        setUpdateState({
          isUpdateAvailable: true,
          applyUpdate: () => {
            waitingWorker?.postMessage({ type: "SKIP_WAITING" });
          },
        });
      }

      // Listen for future updatefound events (new SW being installed)
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          // When it's installed and there is an active controller,
          // it means a new SW is available (update).
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            waitingWorker = reg.waiting ?? newWorker;
            setUpdateState({
              isUpdateAvailable: true,
              applyUpdate: () => {
                waitingWorker?.postMessage({ type: "SKIP_WAITING" });
              },
            });
          }
        });
      });

      // The SW can tell us it's ready for offline usage.
      // Some implementations trigger 'installed' state for first install.
      // We'll treat successful registration as offline-ready hint.
      setIsOfflineReady(true);
    };

    const registerSw = async () => {
      try {
        // Attempt to register the generated service worker at /sw.js
        const reg = await navigator.serviceWorker.register("/sw.js");
        onRegistrationSuccess(reg);
      } catch {
        // Registration can fail in certain environments (file://, insecure, etc.)
        // Keep silent — SW is optional for app functionality.
        // console.warn("SW registration failed:", err);
      }
    };

    registerSw();

    // When the waiting service worker calls skipWaiting and becomes the active controller,
    // reload so the new code takes effect.
    const onControllerChange = () => {
      // When controller changes, perform a hard reload to pick up new content
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange
    );

    return () => {
      try {
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          onControllerChange
        );
      } catch {
        // ignore
      }
      registration = null;
      waitingWorker = null;
    };
  }, []);

  // Listen for the beforeinstallprompt event and save it for later install()
  useEffect(() => {
    const handler = (ev: Event) => {
      const e = ev as InstallPromptEventShape;
      if (typeof e.prompt === "function" && e.userChoice) {
        ev.preventDefault();
        // Save the real event on window for UI to trigger later
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__deferredPWAInstall = {
          prompt: e.prompt.bind(e),
          userChoice: e.userChoice,
        };
        setIsInstallable(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
  }, []);

  const install = useCallback(async () => {
    // Use the saved beforeinstallprompt event (if any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saved = (window as any).__deferredPWAInstall as
      | {
          prompt: () => Promise<void>;
          userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
        }
      | undefined;

    if (!saved) {
      return { outcome: "no-event" } as const;
    }
    try {
      await saved.prompt();
      const choice = await saved.userChoice;
      // clear
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__deferredPWAInstall = undefined;
      setIsInstallable(false);
      return { outcome: choice.outcome } as {
        outcome: "accepted" | "dismissed";
      };
    } catch (error) {
      return { outcome: "error", error } as {
        outcome: "error";
        error: unknown;
      };
    }
  }, []);

  const applyUpdate = useCallback(async () => {
    if (!updateState.applyUpdate) return false;
    try {
      updateState.applyUpdate();
      return true;
    } catch {
      return false;
    }
  }, [updateState]);

  return {
    isInstallable,
    isOfflineReady,
    isUpdateAvailable: updateState.isUpdateAvailable,
    install,
    applyUpdate,
  } as const;
}
