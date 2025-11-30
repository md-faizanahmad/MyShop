// // src/components/cart/CartPage.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useStore } from "../../context/useStore";
// import CartItemsList from "./CartItemsList";
// import CartSummary from "./CartSummary";
// import CartEmpty from "./CartEmpty";
// import CartSkeleton from "./CartSkeleton";

// const API = import.meta.env.VITE_API_URL;

// export default function CartPage() {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { refreshStore } = useStore();

//   // Why: Central data fetching + state management
//   // Keeps child components pure and reusable
//   const loadCart = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get<{ success: boolean; items: CartItem[] }>(
//         `${API}/api/cart`,
//         { withCredentials: true }
//       );
//       setItems(data.items ?? []);
//     } catch {
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   // Shared handlers – passed down to children
//   const handleQtyChange = (productId: string, qty: number) => {
//     if (qty < 1) return;

//     // Optimistic UI update (feels instant)
//     setItems(prev =>
//       prev.map(i => (i.product._id === productId ? { ...i, qty } : i))
//     );

//     // Debounced API call (via child)
//   };

//   const handleRemove = async (productId: string) => {
//     setItems(prev => prev.filter(i => i.product._id !== productId));
//     toast.success("Item removed");

//     try {
//       await axios.delete(`${API}/api/cart/remove/${productId}`, {
//         withCredentials: true,
//       });
//       refreshStore();
//     } catch {
//       toast.error("Failed to remove");
//       loadCart();
//     }
//   };

//   const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
//   const shipping = subtotal === 0 ? 0 : subtotal > 999 ? 0 : 49;
//   const total = subtotal + shipping;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center lg:text-left">
//           My Cart {items.length > 0 && `(${items.length})`}
//         </h1>

//         {loading ? (
//           <CartSkeleton />
//         ) : items.length === 0 ? (
//           <CartEmpty />
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <CartItemsList
//               items={items}
//               onQtyChange={handleQtyChange}
//               onRemove={handleRemove}
//             />
//             <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// // }

// src/components/cart/CartPage.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useStore } from "../../context/useStore";
// import CartItemsList from "./CartItemsList";
// import CartSummary from "./CartSummary";
// import CartEmpty from "./CartEmpty";
// import CartSkeleton from "./CartSkeleton";
// import type { CartItem } from "../../types/cartItem";

// const API = import.meta.env.VITE_API_URL as string;

// export default function CartPage() {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { refreshStore } = useStore();

//   const loadCart = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get<{ success: boolean; items: any[] }>(
//         `${API}/api/cart`,
//         { withCredentials: true }
//       );

//       const validItems = (data.items || []).filter(
//         (item): item is CartItem =>
//           item.product !== null && typeof item.product.price === "number"
//       );

//       setItems(validItems);
//     } catch {
//       toast.error("Failed to load cart");
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const handleQtyChange = (productId: string, qty: number) => {
//     if (qty < 1) return;
//     setItems((prev) =>
//       prev.map((item) =>
//         item.product?._id === productId ? { ...item, qty } : item
//       )
//     );
//   };

//   const handleRemove = async (productId: string) => {
//     setItems((prev) => prev.filter((item) => item.product?._id !== productId));
//     toast.success("Removed from cart");

//     try {
//       await axios.delete(`${API}/api/cart/remove/${productId}`, {
//         withCredentials: true,
//       });
//       refreshStore?.();
//     } catch {
//       toast.error("Failed to remove");
//       loadCart();
//     }
//   };

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.product.price * item.qty,
//     0
//   );
//   const shipping = subtotal === 0 ? 0 : subtotal > 999 ? 0 : 49;
//   const total = subtotal + shipping;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center lg:text-left">
//           My Cart {items.length > 0 && `(${items.length})`}
//         </h1>

//         {loading ? (
//           <CartSkeleton />
//         ) : items.length === 0 ? (
//           <CartEmpty />
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <CartItemsList
//               items={items}
//               onQtyChange={handleQtyChange}
//               onRemove={handleRemove}
//             />
//             <CartSummary
//               subtotal={subtotal}
//               shipping={shipping}
//               total={total}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//// Updated
// src/pages/CartPage.tsx
// import { Link } from "react-router-dom";
// import { Trash2, AlertCircle, ShoppingBag } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useCartStore } from "../../store/CartStore";
// import OrderSummaryCard from "./OrderSummaryCard";

// const API = import.meta.env.VITE_API_URL;
// const MAX_UNITS = 4;

// export default function CartPage() {
//   const { items, updateQuantity, removeItem, getTotalItems } = useCartStore();

//   const updateMutation = useMutation({
//     mutationFn: ({ productId, qty }: { productId: string; qty: number }) =>
//       axios.put(
//         `${API}/api/cart/update`,
//         { productId, qty },
//         { withCredentials: true }
//       ),
//   });

//   const removeMutation = useMutation({
//     mutationFn: (productId: string) =>
//       axios.delete(`${API}/api/cart/remove`, {
//         data: { productId },
//         withCredentials: true,
//       }),
//   });

//   const handleQtyChange = (productId: string, newQty: number) => {
//     if (newQty > MAX_UNITS) {
//       toast.error(`Max ${MAX_UNITS} units allowed`, { duration: 2000 });
//       return;
//     }
//     updateQuantity(productId, newQty);
//     updateMutation.mutate({ productId, qty: newQty });
//   };

//   const handleRemove = (productId: string) => {
//     removeItem(productId);
//     removeMutation.mutate(productId);
//     toast.success("Removed from cart");
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-50 flex items-center justify-center p-6">
//         <div className="text-center">
//           <div className="w-32 h-32 mx-auto mb-8 bg-white/80 backdrop-blur rounded-full shadow-xl flex items-center justify-center">
//             <ShoppingBag size={60} className="text-sky-500" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             Your cart is empty
//           </h1>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-3 bg-linear-to-r from-sky-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50 py-6 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl sm:text-4xl font-black text-center mb-8 bg-linear-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
//           Your Cart ({getTotalItems()})
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Cart Items – Compact Cards */}
//           <div className="lg:col-span-2 space-y-5">
//             <AnimatePresence mode="popLayout">
//               {items.map((item) => {
//                 const { product, qty } = item;
//                 const isMax = qty >= MAX_UNITS;

//                 return (
//                   <motion.div
//                     key={item._id}
//                     layout
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9, x: -100 }}
//                     className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden"
//                   >
//                     <div className="p-4 flex gap-4">
//                       <Link
//                         to={`/product/${product._id}`}
//                         className="flex shrink-0"
//                       >
//                         <img
//                           src={product.imageUrl}
//                           alt={product.name}
//                           className="w-24 h-24 rounded-xl object-cover border-2 border-sky-100"
//                         />
//                       </Link>

//                       <div className="flex-1">
//                         <Link to={`/product/${product._id}`}>
//                           <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-sky-600 transition">
//                             {product.name}
//                           </h3>
//                         </Link>

//                         <div className="mt-2 flex justify-between items-end">
//                           <p className="text-2xl font-black text-sky-600">
//                             ₹{(product.price * qty).toLocaleString("en-IN")}
//                           </p>
//                         </div>

//                         {isMax && (
//                           <div className="mt-2 inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
//                             <AlertCircle size={14} />
//                             Max limit reached
//                           </div>
//                         )}

//                         <div className="mt-4 flex items-center gap-3">
//                           <div className="flex items-center bg-gray-100 rounded-xl">
//                             <button
//                               onClick={() =>
//                                 handleQtyChange(product._id, qty - 1)
//                               }
//                               disabled={qty <= 1}
//                               className="w-11 h-11 hover:bg-gray-200 disabled:opacity-40 transition"
//                             >
//                               −
//                             </button>
//                             <span className="w-14 text-center font-bold text-lg">
//                               {qty}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 handleQtyChange(product._id, qty + 1)
//                               }
//                               disabled={isMax}
//                               className="w-11 h-11 hover:bg-gray-200 disabled:opacity-40 transition"
//                             >
//                               +
//                             </button>
//                           </div>

//                           <button
//                             onClick={() => handleRemove(product._id)}
//                             className="text-red-600 hover:bg-red-50 p-3 rounded-xl transition"
//                           >
//                             <Trash2 size={22} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>

//           {/* Order Summary – Sticky on Desktop */}
//           <div className="lg:sticky lg:top-6 h-fit">
//             <OrderSummaryCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/// upadte ui and fast
// src/pages/cart/CartPage.tsx
// import { Link } from "react-router-dom";
// import { Trash2, AlertCircle, ShoppingBag, Heart } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import { useCartStore } from "../../store/CartStore";
// import { useWishlistStore } from "../../store/WishlistStore";
// import type { PublicProduct } from "../../types/product";
// import OrderSummaryCard from "./OrderSummaryCard";

// const MAX_UNITS = 4;

// export default function CartPage() {
//   const { items, updateQuantity, removeItem } = useCartStore();
//   const { items: wishlistItems, toggle } = useWishlistStore();

//   const isWishlisted = (productId: string) =>
//     wishlistItems.some((item) => item._id === productId);

//   const handleToggleWishlist = (product: PublicProduct) => {
//     toggle(product);
//     toast.success(
//       isWishlisted(product._id) ? "Removed from wishlist" : "Added to wishlist",
//       { duration: 1200 }
//     );
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-6">
//         <div className="text-center">
//           <div className="w-32 h-32 mx-auto mb-8 bg-white/90 rounded-full shadow-2xl flex items-center justify-center">
//             <ShoppingBag size={60} className="text-sky-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             Your cart is empty
//           </h1>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold shadow-xl"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl sm:text-4xl font-black text-center mb-10 bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
//           Your Cart ({items.reduce((sum, i) => sum + i.qty, 0)})
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-5">
//             <AnimatePresence mode="popLayout">
//               {items.map((item) => {
//                 const p = item.product;
//                 const qty = item.qty;
//                 const wishlisted = isWishlisted(p._id);
//                 const isMax = qty >= MAX_UNITS;

//                 return (
//                   <motion.div
//                     key={p._id} // ← Fixed: use product._id
//                     layout
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden"
//                   >
//                     <div className="p-4 flex gap-4">
//                       <Link to={`/product/${p._id}`} className="flex-shrink-0">
//                         <img
//                           src={p.imageUrl}
//                           alt={p.name}
//                           className="w-24 h-24 rounded-xl object-cover border-2 border-sky-100"
//                         />
//                       </Link>

//                       <div className="flex-1 space-y-3">
//                         <Link to={`/product/${p._id}`}>
//                           <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-sky-600">
//                             {p.name}
//                           </h3>
//                         </Link>

//                         <p className="text-2xl font-black text-sky-600">
//                           ₹{(p.price * qty).toLocaleString("en-IN")}
//                         </p>

//                         {isMax && (
//                           <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
//                             <AlertCircle size={14} /> Max {MAX_UNITS} reached
//                           </div>
//                         )}

//                         <div className="flex items-center gap-3">
//                           <div className="flex items-center bg-sky-50 rounded-xl">
//                             <button
//                               onClick={() => updateQuantity(p._id, qty - 1)}
//                               disabled={qty <= 1}
//                               className="w-10 h-10 text-sky-600 hover:bg-sky-100 disabled:opacity-40"
//                             >
//                               −
//                             </button>
//                             <span className="w-12 text-center font-bold text-lg text-sky-700">
//                               {qty}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(p._id, qty + 1)}
//                               disabled={isMax}
//                               className="w-10 h-10 text-sky-600 hover:bg-sky-100 disabled:opacity-40"
//                             >
//                               +
//                             </button>
//                           </div>

//                           <button
//                             onClick={() => handleToggleWishlist(p)}
//                             className={`p-3 rounded-xl transition-all ${
//                               wishlisted
//                                 ? "bg-pink-100 text-pink-600"
//                                 : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
//                             }`}
//                           >
//                             <Heart
//                               size={22}
//                               className={wishlisted ? "fill-current" : ""}
//                             />
//                           </button>

//                           <button
//                             onClick={() => removeItem(p._id)}
//                             className="text-red-600 hover:bg-red-50 p-3 rounded-xl transition"
//                           >
//                             <Trash2 size={22} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>

//           <div className="lg:sticky lg:top-6 h-fit">
//             <OrderSummaryCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//////////////////////////////// update 24-11
// src/pages/CartPage.tsx
// pages/CartPage.tsx
import { Link } from "react-router-dom";
import { Trash2, AlertCircle, ShoppingBag, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useCartStore } from "../../store/CartStore";
import { useWishlistStore } from "../../store/WishlistStore";
import type { PublicProduct } from "../../types/product";
import OrderSummaryCard from "./OrderSummaryCard";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const { items: wishlistItems, toggle } = useWishlistStore();

  const isWishlisted = (productId: string) =>
    wishlistItems.some((item) => item._id === productId);

  const handleToggleWishlist = (product: PublicProduct) => {
    toggle(product);
    toast.success(
      isWishlisted(product._id) ? "Removed from wishlist" : "Added to wishlist",
      { duration: 1200 }
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/90 rounded-full shadow-2xl flex items-center justify-center border-8 border-white">
            <ShoppingBag size={64} className="text-sky-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-4">
            Your cart is empty
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h6 className="text-3xl sm:text-4xl font-black text-center mb-10 bg-linear-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
          Your Cart ({items.reduce((sum, i) => sum + i.qty, 0)} items)
        </h6>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                const p = item.product;
                const qty = item.qty;
                const stock = p.stock; // Real stock from your API
                const isMax = qty >= stock;
                const isLowStock = stock <= 5 && stock > 0;

                return (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    className="bg-white rounded-3xl shadow-xl border border-sky-100 overflow-hidden hover:shadow-2xl transition-shadow"
                  >
                    <div className="p-5 flex gap-5">
                      <Link to={`/product/${p._id}`} className="flex  shrink-0">
                        <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-sky-100">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 space-y-4">
                        <div>
                          <Link to={`/product/${p._id}`}>
                            <h3 className="font-bold text-lg text-gray-900 hover:text-sky-600 transition line-clamp-2">
                              {p.name}
                            </h3>
                          </Link>
                          <p className="text-1xl font-black text-sky-600 mt-2">
                            ₹{(p.price * qty).toLocaleString("en-IN")}
                          </p>
                        </div>

                        {/* Stock Alerts */}
                        {isMax && (
                          <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold w-fit">
                            <AlertCircle size={16} />
                            Max limit reached ({stock} in stock)
                          </div>
                        )}
                        {isLowStock && qty < stock && (
                          <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold w-fit">
                            <AlertCircle size={16} />
                            Only {stock} left in stock!
                          </div>
                        )}

                        {/* Quantity & Actions */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-sky-50 rounded-2xl overflow-hidden">
                            <button
                              onClick={() => updateQuantity(p._id, qty - 1)}
                              disabled={qty <= 1}
                              className="w-12 h-12 text-sky-600 hover:bg-sky-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-bold text-xl"
                            >
                              −
                            </button>
                            <span className="w-16 text-center font-bold text-xl text-sky-700">
                              {qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(p._id, qty + 1)}
                              disabled={isMax}
                              className="w-12 h-12 text-sky-600 hover:bg-sky-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-bold text-xl"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleToggleWishlist(p)}
                            className={`p-3.5 rounded-2xl transition-all duration-300 shadow-md ${
                              isWishlisted(p._id)
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                            }`}
                          >
                            <Heart
                              size={24}
                              className={
                                isWishlisted(p._id) ? "fill-current" : ""
                              }
                            />
                          </button>

                          <button
                            onClick={() => removeItem(p._id)}
                            className="p-3.5 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition shadow-md"
                          >
                            <Trash2 size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-6 h-fit">
            <OrderSummaryCard />
          </div>
        </div>
      </div>
    </div>
  );
}
