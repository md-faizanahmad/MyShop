// src/virtual-pwa.d.ts
// Ambient declarations for the virtual module provided by vite-plugin-pwa
// and for the beforeinstallprompt event + Window extensions.

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

// Virtual module provided by vite-plugin-pwa
declare module "virtual:pwa-register" {
  export type RegisterSWOptions = {
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
  };

  /**
   * Registers the generated service worker.
   * Returns an updater function if you want to programmatically check for updates — but you don't have to use it.
   */
  export function registerSW(options?: RegisterSWOptions): (() => void) | void;
  export default registerSW;
}

export {};
