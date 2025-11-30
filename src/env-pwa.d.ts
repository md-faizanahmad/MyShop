// src/env-pwa.d.ts
// Must live inside `src/`. Exact filename matters only insofar as it's included by tsconfig (your tsconfig includes "src").

/**
 * Minimal type for the beforeinstallprompt event.
 * We declare it globally so hook code can use it.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform?: string }>;
}

declare global {
  interface Window {
    __deferredPWAInstall?: BeforeInstallPromptEvent | undefined;
    triggerPWAInstall?: () => Promise<
      | { outcome: "accepted" | "dismissed" }
      | { outcome: "no-event" }
      | { outcome: "error"; error: unknown }
    >;
  }
}

/* Virtual module provided by vite-plugin-pwa */
declare module "virtual:pwa-register" {
  export type RegisterSWOptions = {
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
  };

  // registerSW returns either a function (updater) or void
  export function registerSW(options?: RegisterSWOptions): (() => void) | void;
  export default registerSW;
}

export {}; // ensure this file is treated as a module
