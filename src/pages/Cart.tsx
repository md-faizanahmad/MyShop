// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import type { CartItem } from "../types/cartItem";
// import { toast } from "react-toastify";
// import { useStore } from "../context/useStore";
// // import { startPayment } from "../lib/payment";
// import { Link } from "react-router-dom";

// const API = import.meta.env.VITE_API_URL;

// export default function Cart() {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const { refreshStore } = useStore();

//   async function loadCart() {
//     try {
//       const { data } = await axios.get<{ success: boolean; items: CartItem[] }>(
//         `${API}/v1/cart`,
//         { withCredentials: true }
//       );

//       setItems(data.items ?? []);
//     } catch {
//       toast.error("Failed to load cart");
//     }
//   }

//   useEffect(() => {
//     loadCart();
//   }, []);

//   // -------------------------
//   // Update Quantity
//   // -------------------------
//   async function updateQty(productId: string, qty: number) {
//     if (qty < 1) return;

//     try {
//       await axios.put(
//         `${API}/v1/cart/update`,
//         { productId, qty },
//         { withCredentials: true }
//       );

//       setItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId ? { ...item, qty } : item
//         )
//       );

//       refreshStore();
//     } catch {
//       toast.error("Failed to update cart");
//     }
//   }

//   // -------------------------
//   // Remove Item
//   // -------------------------
//   async function removeItem(productId: string) {
//     try {
//       await axios.delete(`${API}/v1/cart/remove/${productId}`, {
//         withCredentials: true,
//       });

//       setItems((prev) => prev.filter((item) => item.product._id !== productId));
//       refreshStore();
//       toast.success("Item removed");
//     } catch {
//       toast.error("Failed to remove item");
//     }
//   }

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.product.price * item.qty,
//     0
//   );

//   const shipping = subtotal === 0 ? 0 : subtotal > 999 ? 0 : 49;

//   const total = subtotal + shipping;

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-5">My Cart</h1>

//       {items.length === 0 && (
//         <div className="text-gray-500 text-center mt-10 text-lg">
//           Your cart is empty.
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left: Cart Items */}
//         <div className="lg:col-span-2 space-y-4">
//           {items.map((item) => (
//             <div
//               key={item.product._id}
//               className="flex gap-4 bg-white rounded-lg shadow p-4"
//             >
//               {/* Image */}
//               <img
//                 src={item.product.imageUrl}
//                 alt={item.product.name}
//                 className="w-24 h-24 rounded object-cover"
//               />

//               {/* Info */}
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-800">
//                   {item.product.name}
//                 </h3>
//                 <p className="text-blue-600 font-bold text-lg">
//                   ₹{item.product.price}
//                 </p>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center gap-3 mt-2">
//                   <button
//                     onClick={() => updateQty(item.product._id, item.qty - 1)}
//                     className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded"
//                   >
//                     <Minus size={14} />
//                   </button>

//                   <span className="w-8 text-center font-semibold">
//                     {item.qty}
//                   </span>

//                   <button
//                     onClick={() => updateQty(item.product._id, item.qty + 1)}
//                     className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded"
//                   >
//                     <Plus size={14} />
//                   </button>
//                 </div>
//               </div>

//               {/* Remove Button */}
//               <button
//                 onClick={() => removeItem(item.product._id)}
//                 className="text-red-500 hover:text-red-700 p-2"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Right: Summary */}
//         {items.length > 0 && (
//           <div className="bg-white shadow rounded-lg p-5 h-fit">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//             <div className="space-y-2 text-gray-700">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
//               </div>

//               <hr />

//               <div className="flex justify-between text-lg font-bold">
//                 <span>Total</span>
//                 <span>₹{total}</span>
//               </div>
//             </div>

//             <Link
//               to="/checkout"
//               className="w-full block bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold text-center hover:bg-blue-700"
//             >
//               Continue to Checkout
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
////////////////////////////////Updated
import { useEffect, useState } from "react";
import axios from "axios";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../types/cartItem";
import { toast } from "react-toastify";
import { useStore } from "../context/useStore";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshStore } = useStore();

  // Safe accessor — handles deleted products gracefully
  const safeProduct = (item: CartItem) => ({
    _id: item.product?._id ?? "deleted",
    name: item.product?.name ?? "Product Removed",
    price: item.product?.price ?? 0,
    imageUrl:
      item.product?.imageUrl ||
      "https://via.placeholder.com/150/cccccc/999999?text=No+Image",
  });

  async function loadCart() {
    try {
      setLoading(true);
      const { data } = await axios.get<{ success: boolean; items: CartItem[] }>(
        `${API}/v1/cart`,
        { withCredentials: true }
      );
      setItems(data.items ?? []);
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  // Optimistic quantity update
  async function updateQty(productId: string, newQty: number) {
    if (newQty < 1 || !productId || productId === "deleted") return;

    setItems((prev) =>
      prev.map((item) =>
        item.product?._id === productId ? { ...item, qty: newQty } : item
      )
    );

    try {
      await axios.put(
        `${API}/v1/cart/update`,
        { productId, qty: newQty },
        { withCredentials: true }
      );
      refreshStore();
    } catch {
      toast.error("Update failed, reverting...");
      loadCart();
    }
  }

  // Fast delete with animation
  async function removeItem(productId: string) {
    setItems((prev) => prev.filter((item) => item.product?._id !== productId));
    toast.success("Removed from cart");

    try {
      await axios.delete(`${API}/v1/cart/remove/${productId}`, {
        withCredentials: true,
      });
      refreshStore();
    } catch {
      toast.error("Failed to remove");
      loadCart();
    }
  }

  // Filter out deleted products before calculating total
  const validItems = items.filter((item) => item.product !== null);
  const subtotal = validItems.reduce(
    (sum, item) => sum + item.product!.price * item.qty,
    0
  );
  const shipping = subtotal === 0 ? 0 : subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  const CartSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-4 bg-white rounded-xl shadow p-5">
          <div className="w-28 h-28 bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-7 bg-gray-200 rounded w-24" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded" />
              <div className="w-12 h-8 bg-gray-200 rounded" />
              <div className="w-9 h-9 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Cart</h1>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartSkeleton />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
              <div className="space-y-4">
                <div className="h-7 bg-gray-200 rounded w-40" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-20" />
                    <div className="h-5 bg-gray-200 rounded w-24" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-20" />
                    <div className="h-5 bg-gray-200 rounded w-24" />
                  </div>
                </div>
                <div className="h-12 bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Your cart is empty</p>
            <Link
              to="/"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">
              {items.map((item) => {
                const p = safeProduct(item);
                const isDeleted = item.product === null;

                return (
                  <div
                    key={item._id} // use cart item ID (always exists)
                    className={`flex gap-4 bg-white rounded-xl shadow-md p-5 transition-all ${
                      isDeleted ? "opacity-75" : "hover:shadow-lg"
                    }`}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-28 h-28 rounded-lg object-cover border"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {p.name}
                          {isDeleted && (
                            <span className="block text-sm text-red-600 font-medium mt-1">
                              This product is no longer available
                            </span>
                          )}
                        </h3>
                        <p className="text-xl font-bold text-blue-600 mt-1">
                          ₹{p.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQty(item.product?._id ?? "", item.qty - 1)
                          }
                          disabled={item.qty === 1 || isDeleted}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-bold text-lg">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            item.product &&
                            updateQty(item.product._id, item.qty + 1)
                          }
                          disabled={isDeleted}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeItem(item.product?._id ?? item._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-full transition self-start"
                      title="Remove from cart"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-6">
              <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600 font-semibold" : ""
                    }
                  >
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {subtotal > 0 && subtotal <= 999 && (
                  <p className="text-sm text-orange-600">
                    Add ₹{(999 - subtotal).toLocaleString()} more for FREE
                    shipping!
                  </p>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-2xl text-blue-600">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full mt-6 block bg-blue-600 text-white text-center py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => validItems.length === 0 && e.preventDefault()}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
