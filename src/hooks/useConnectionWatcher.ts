import { useEffect } from "react";
import { useConnectionStore } from "../store/useConnectionStore";

export default function useConnectionWatcher() {
  const setConnected = useConnectionStore((state) => state.setConnected);

  useEffect(() => {
    const handleOnline = () => setConnected(true);
    const handleOffline = () => setConnected(false);

    // Set initial status
    setConnected(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setConnected]);
}
