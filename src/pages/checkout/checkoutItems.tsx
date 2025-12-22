// src/pages/checkout/CheckoutItems.tsx
import type { CartItem } from "../../types/cartItem";

interface Props {
  items: CartItem[];
  isQuickBuy: boolean;
}

export default function CheckoutItems({ items, isQuickBuy }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border">
      <h2 className="text-2xl font-bold mb-6">
        {isQuickBuy ? "Buy Now Item" : "Order Items"}
      </h2>

      <div className="space-y-5">
        {items.map((i) => (
          <div
            key={i.product._id}
            className="flex gap-4 items-start border-b pb-4 last:border-b-0"
          >
            <img
              src={i.product.imageUrl}
              alt={i.product.name}
              className="w-20 h-20 rounded-lg border object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-gray-900">{i.product.name}</p>

              <p className="text-sm text-gray-500 mt-1">Qty: {i.qty}</p>

              <p className="text-sky-600 font-bold mt-2">
                ₹{i.product.price.toLocaleString("en-IN")} × {i.qty} = ₹
                {(i.product.price * i.qty).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
