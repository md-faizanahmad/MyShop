// src/components/cart/OrderSummaryCard.tsx
// import { Link } from "react-router-dom";
// import { ArrowRight, Trash2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { useCartStore } from "../../store/useCartStore";

// export default function OrderSummaryCard() {
//   const totalItems = useCartStore((s) =>
//     s.items.reduce((sum, i) => sum + i.qty, 0),
//   );
//   const subtotal = useCartStore((s) => s.getTotalPrice());
//   const clearCart = useCartStore((s) => s.clear);

//   const [confirm, setConfirm] = useState(false);

//   const handleClear = (): void => {
//     clearCart();
//     toast.success("Cart cleared");
//     setConfirm(false);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
//       <h3 className="text-xl font-bold mb-4">Order Summary</h3>

//       <div className="space-y-3">
//         <div className="flex justify-between">
//           <span>Items</span>
//           <span>{totalItems}</span>
//         </div>

//         <div className="flex justify-between font-bold">
//           <span>Total</span>
//           <span>₹{subtotal.toLocaleString("en-IN")}</span>
//         </div>
//       </div>

//       <Link
//         to="/checkout"
//         aria-disabled={totalItems === 0}
//         className={`block mt-6 text-center py-3 rounded-xl font-semibold transition ${
//           totalItems === 0
//             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//             : "bg-sky-600 text-white hover:bg-sky-700"
//         }`}
//       >
//         Proceed to Checkout <ArrowRight className="inline ml-2" />
//       </Link>

//       <button
//         onClick={() => setConfirm(true)}
//         className="mt-4 w-full text-red-600 flex items-center justify-center gap-2"
//       >
//         <Trash2 size={18} />
//         Clear Cart
//       </button>

//       {confirm && (
//         <button
//           onClick={handleClear}
//           className="mt-2 w-full bg-red-600 text-white py-2 rounded-xl"
//         >
//           Confirm Clear Cart
//         </button>
//       )}
//     </div>
//   );
// }
///////////////////////////////////22-08-2026
import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useCartStore } from "../../store/useCartStore";

export default function OrderSummaryCard() {
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.qty, 0),
  );
  const subtotal = useCartStore((s) => s.getTotalPrice());
  const clearCart = useCartStore((s) => s.clear);

  const [confirm, setConfirm] = useState(false);

  const handleClear = (): void => {
    clearCart();
    toast.success("Cart cleared");
    setConfirm(false);
  };

  return (
    <section className=" pt-5">
      <h3 className="text-base font-semibold tracking-tight text-slate-900">
        Order Summary
      </h3>

      <div className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center justify-between text-slate-500">
          <span>Items</span>
          <span className="font-medium text-slate-700">{totalItems}</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="font-medium text-slate-900">Total</span>

          <span className="text-base font-semibold text-sky-600">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        aria-disabled={totalItems === 0}
        onClick={(event) => {
          if (totalItems === 0) {
            event.preventDefault();
          }
        }}
        className={`
          mt-5
          flex
          h-11
          w-full
          items-center
          justify-center
          gap-2
          text-sm
          font-semibold
          transition-colors
          ${
            totalItems === 0
              ? "cursor-not-allowed bg-slate-200 text-slate-400"
              : "bg-sky-600 text-white hover:bg-sky-700"
          }
        `}
      >
        Proceed to Checkout
        <ArrowRight size={17} strokeWidth={2} />
      </Link>

      {!confirm ? (
        <button
          type="button"
          onClick={() => setConfirm(true)}
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            py-2
            text-xs
            font-medium
            text-red-500
            transition-colors
            hover:text-red-600
          "
        >
          <Trash2 size={15} strokeWidth={1.8} />
          Clear Cart
        </button>
      ) : (
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="
              flex-1
              bg-red-600
              px-3
              py-2
              text-xs
              font-semibold
              text-white
              transition-colors
              hover:bg-red-700
            "
          >
            Confirm
          </button>

          <button
            type="button"
            onClick={() => setConfirm(false)}
            className="
              flex-1
              px-3
              py-2
              text-xs
              font-medium
              text-slate-500
              transition-colors
              hover:text-slate-800
            "
          >
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}
