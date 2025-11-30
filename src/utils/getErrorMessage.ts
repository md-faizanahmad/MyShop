import axios from "axios";

/**
 * Extract a friendly string message from unknown errors (axios or generic).
 */
export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const payload = err.response?.data;
    if (payload && typeof payload === "object") {
      // If server provided a message field, prefer it
      const maybeMessage = (payload as { message?: unknown }).message;
      if (typeof maybeMessage === "string" && maybeMessage.length)
        return maybeMessage;
      // Sometimes backend returns { error: "..." }
      const maybeError = (payload as { error?: unknown }).error;
      if (typeof maybeError === "string" && maybeError.length)
        return maybeError;
    }
    // fallback to axios message
    if (err.message) return err.message;
    return "Request failed";
  }

  if (err instanceof Error) return err.message;
  return String(err ?? "Unknown error");
}
