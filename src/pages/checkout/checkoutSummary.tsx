// // src/pages/checkout/CheckoutSummary.tsx
// import { Lock } from "lucide-react";

// interface Props {
//   subtotal: number;
//   shipping: number;
//   total: number;
//   disabled: boolean;
//   isQuickBuy: boolean;
//   onPay: () => void;
// }

// export default function CheckoutSummary({
//   subtotal,
//   shipping,
//   total,
//   disabled,
//   isQuickBuy,
//   onPay,
// }: Props) {
//   return (
//     <div className="bg-white rounded-xl shadow p-6 border h-fit">
//       <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

//       <div className="space-y-3">
//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>₹{subtotal}</span>
//         </div>

//         <div className="flex justify-between">
//           <span>Shipping</span>
//           <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
//         </div>

//         <hr />

//         <div className="flex justify-between font-black text-xl">
//           <span>Total</span>
//           <span>₹{total}</span>
//         </div>
//       </div>

//       <button
//         onClick={onPay}
//         disabled={disabled}
//         className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-bold"
//       >
//         <Lock className="inline mr-2" />
//         {isQuickBuy ? "Buy Now" : "Pay"} ₹{total}
//       </button>
//     </div>
//   );
// }

//////////////////17-08-2026

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
    <aside
      className="h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-labelledby="order-summary-title"
    >
      <header className="mb-4">
        <h2
          id="order-summary-title"
          className="text-lg font-semibold text-slate-900"
        >
          Order Summary
        </h2>
      </header>

      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4 text-slate-600">
          <dt>Subtotal</dt>
          <dd className="font-medium text-slate-900">
            ₹{subtotal.toLocaleString("en-IN")}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4 text-slate-600">
          <dt>Shipping</dt>
          <dd
            className={
              shipping === 0
                ? "font-medium text-green-600"
                : "font-medium text-slate-900"
            }
          >
            {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString("en-IN")}`}
          </dd>
        </div>
      </dl>

      <div className="my-4 border-t border-slate-100" />

      <div className="flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-slate-900">Total</span>

        <span className="text-xl font-bold text-slate-900">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <button
        type="button"
        onClick={onPay}
        disabled={disabled}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        <Lock size={16} aria-hidden="true" />
        {isQuickBuy ? "Buy Now" : "Pay"} ₹{total.toLocaleString("en-IN")}
      </button>

      <p className="mt-3 text-center text-xs text-slate-400">Secure payment</p>
    </aside>
  );
}
