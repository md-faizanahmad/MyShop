// src/utils/formatCurrency.ts
export function formatCurrency(
  amount?: number,
  currency: "INR" | "USD" = "INR"
): string {
  if (typeof amount !== "number") return "—";

  return amount.toLocaleString(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
}
