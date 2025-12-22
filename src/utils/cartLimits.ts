// src/utils/cartLimits.ts
export function getMaxQtyByPrice(price: number): number {
  if (price >= 60000) return 2;
  if (price >= 20000) return 3;
  return 5;
}
