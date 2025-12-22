// utils/getExpectedDelivery.ts
export function getExpectedDelivery(status: string, createdAt: string): string {
  const orderDate = new Date(createdAt);
  const today = new Date();

  const s = status.toLowerCase();

  let deliveryDate: Date;

  if (s.includes("deliver")) {
    return "Delivered";
  }

  if (s.includes("ship")) {
    deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);
  } else if (s.includes("process")) {
    deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 6);
  } else {
    deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 7);
  }

  return deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
