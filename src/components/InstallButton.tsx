// src/components/InstallButton.tsx
import { usePWA } from "../hooks/usePWA";

export function InstallButton() {
  const { isInstallable, install } = usePWA();

  if (!isInstallable) return null;

  return (
    <button
      onClick={async () => {
        const res = await install();
        if (res.outcome === "accepted") {
          // optional: show toast "Installed"
          console.log("PWA: user accepted install");
        } else if (res.outcome === "dismissed") {
          console.log("PWA: user dismissed install");
        } else {
          console.log("PWA: install error or no event", res);
        }
      }}
      className="px-3 py-1 rounded bg-sky-600 text-white"
      aria-label="Install app"
    >
      Install App
    </button>
  );
}
