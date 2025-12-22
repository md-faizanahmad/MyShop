// // src/components/cart/OrderSummaryCard.tsx
// import { Link } from "react-router-dom";
// import { ArrowRight, Trash2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { useCartStore } from "../../store/useCartStore";

// export default function OrderSummaryCard() {
//   /* -----------------------------
//      Store
//   ----------------------------- */
//   const totalItems = useCartStore((s) =>
//     s.items.reduce((sum, i) => sum + i.qty, 0)
//   );
//   const getTotalPrice = useCartStore((s) => s.getTotalPrice);
//   const clearCart = useCartStore((s) => s.clear);

//   const subtotal = getTotalPrice();

//   const [confirm, setConfirm] = useState(false);

//   const handleClear = (): void => {
//     clearCart();
//     toast.success("Cart cleared");
//     setConfirm(false);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow p-6">
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
//         className="block mt-6 bg-sky-600 text-white text-center py-3 rounded-xl font-semibold"
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
// src/components/cart/OrderSummaryCard.tsx
import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useCartStore } from "../../store/useCartStore";

export default function OrderSummaryCard() {
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.qty, 0)
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
    <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        aria-disabled={totalItems === 0}
        className={`block mt-6 text-center py-3 rounded-xl font-semibold transition ${
          totalItems === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-sky-600 text-white hover:bg-sky-700"
        }`}
      >
        Proceed to Checkout <ArrowRight className="inline ml-2" />
      </Link>

      <button
        onClick={() => setConfirm(true)}
        className="mt-4 w-full text-red-600 flex items-center justify-center gap-2"
      >
        <Trash2 size={18} />
        Clear Cart
      </button>

      {confirm && (
        <button
          onClick={handleClear}
          className="mt-2 w-full bg-red-600 text-white py-2 rounded-xl"
        >
          Confirm Clear Cart
        </button>
      )}
    </div>
  );
}
