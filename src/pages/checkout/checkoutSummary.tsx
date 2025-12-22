// src/pages/checkout/CheckoutSummary.tsx
import { Lock } from "lucide-react";

interface Props {
  subtotal: number;
  shipping: number;
  total: number;
  disabled: boolean;
  isQuickBuy: boolean;
  onPay: () => void;
}

export default function CheckoutSummary({
  subtotal,
  shipping,
  total,
  disabled,
  isQuickBuy,
  onPay,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border h-fit">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
        </div>

        <hr />

        <div className="flex justify-between font-black text-xl">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={onPay}
        disabled={disabled}
        className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-bold"
      >
        <Lock className="inline mr-2" />
        {isQuickBuy ? "Buy Now" : "Pay"} ₹{total}
      </button>
    </div>
  );
}
