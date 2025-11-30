// // pages/Checkout.tsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Lock, Truck, Loader2, CheckCircle } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useCartStore } from "../store/CartStore";
// import { useAuthStore } from "../store/AuthStore";
// import { startPayment } from "../lib/payment";

// const API = import.meta.env.VITE_API_URL;

// interface Address {
//   _id: string;
//   fullName: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   landmark?: string;
//   isDefault?: boolean;
// }

// export default function Checkout() {
//   const { items: cartItems } = useCartStore();
//   const { user } = useAuthStore();

//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [paymentState, setPaymentState] = useState<
//     "idle" | "processing" | "verifying" | "success"
//   >("idle");

//   const navigate = useNavigate();

//   // Load addresses
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     async function load() {
//       try {
//         const res = await axios.get(`${API}/api/addresses`, {
//           withCredentials: true,
//         });

//         if (res.data.success) {
//           setAddresses(res.data.addresses || []);

//           const def = res.data.addresses.find(
//             (a: Address) => a.isDefault === true
//           );

//           if (def) setSelectedAddress(def._id);
//         }
//       } catch (err) {
//         console.log(err);
//         toast.error("Failed to load addresses");
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, [user, navigate]);

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.product.price * item.qty,
//     0
//   );

//   const shipping = subtotal >= 999 ? 0 : 49;
//   const total = subtotal + shipping;

//   // 🔥 FINAL FIXED PAYMENT HANDLER
//   const handlePayment = async () => {
//     if (!selectedAddress) return toast.error("Select a delivery address");
//     if (cartItems.length === 0) return toast.error("Your cart is empty");

//     setPaymentState("processing");

//     try {
//       // 1️⃣ Save address into checkout session
//       await axios.post(
//         `${API}/api/checkout/address`,
//         { addressId: selectedAddress },
//         { withCredentials: true }
//       );

//       // 2️⃣ Save items + total into checkout session
//       await axios.post(
//         `${API}/api/checkout/session`,
//         {
//           items: cartItems.map((i) => ({
//             product: i.product._id,
//             qty: i.qty,
//             price: i.product.price,
//           })),
//           totalAmount: total,
//         },
//         { withCredentials: true }
//       );

//       // 3️⃣ Start Razorpay
//       await startPayment();

//       // UI animation
//       setPaymentState("verifying");
//     } catch (err) {
//       console.log(err);
//       setPaymentState("idle");
//       toast.error("Payment failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="w-12 h-12 animate-spin text-sky-600" />
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="text-center max-w-md">
//           <h1 className="text-4xl font-black mb-4">Your cart is empty</h1>
//           <button
//             onClick={() => navigate("/")}
//             className="text-sky-600 font-bold underline text-lg"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* MAIN CHECKOUT UI */}
//       <AnimatePresence mode="wait">
//         {paymentState === "idle" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="min-h-screen py-8 px-4 bg-gray-50"
//           >
//             <div className="max-w-6xl mx-auto">
//               <h1 className="text-4xl text-center font-black mb-12">
//                 Secure Checkout
//               </h1>

//               <div className="grid lg:grid-cols-3 gap-8">
//                 {/* LEFT SIDE */}
//                 <div className="lg:col-span-2 space-y-8">
//                   {/* ADDRESSES */}
//                   <div className="bg-white rounded-xl shadow p-6 border">
//                     <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                       <Truck className="text-sky-600" />
//                       Delivery Address
//                     </h2>

//                     {addresses.length === 0 ? (
//                       <div className="text-center py-8 bg-gray-50 rounded-xl">
//                         <p>No addresses saved.</p>
//                         <button
//                           className="text-blue-600 underline mt-2"
//                           onClick={() => navigate("/addresses")}
//                         >
//                           Add Address
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="grid gap-4">
//                         {addresses.map((addr) => (
//                           <label
//                             key={addr._id}
//                             className={`p-5 rounded-xl border cursor-pointer transition ${
//                               selectedAddress === addr._id
//                                 ? "border-sky-600 bg-sky-50"
//                                 : "border-gray-300"
//                             }`}
//                           >
//                             <div className="flex gap-4 items-start">
//                               <input
//                                 type="radio"
//                                 checked={selectedAddress === addr._id}
//                                 onChange={() => setSelectedAddress(addr._id)}
//                               />

//                               <div>
//                                 <p className="font-bold">{addr.fullName}</p>
//                                 <p className="text-gray-600">
//                                   {addr.street}, {addr.city}, {addr.state} -{" "}
//                                   {addr.pincode}
//                                 </p>
//                                 <p className="text-gray-700 mt-1">
//                                   Phone: {addr.phone}
//                                 </p>

//                                 {addr.isDefault && (
//                                   <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full mt-2 inline-block">
//                                     Default
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* CART ITEMS */}
//                   <div className="bg-white rounded-xl shadow p-6 border">
//                     <h2 className="text-2xl font-bold mb-6">Order Items</h2>

//                     <div className="space-y-6">
//                       {cartItems.map((i) => (
//                         <div key={i.product._id} className="flex gap-5">
//                           <img
//                             src={i.product.imageUrl}
//                             className="w-24 h-24 rounded-xl border object-cover"
//                           />

//                           <div className="flex-1">
//                             <p className="font-semibold">{i.product.name}</p>
//                             <p className="text-sky-600 font-bold text-lg mt-1">
//                               ₹{i.product.price.toLocaleString()} × {i.qty} = ₹
//                               {(i.product.price * i.qty).toLocaleString()}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* SUMMARY */}
//                 <div className="bg-white rounded-xl shadow p-6 border h-fit">
//                   <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

//                   <div className="space-y-4 text-lg">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>₹{subtotal.toLocaleString()}</span>
//                     </div>

//                     <div className="flex justify-between">
//                       <span>Shipping</span>
//                       <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
//                     </div>

//                     <hr />

//                     <div className="flex justify-between text-2xl font-black">
//                       <span>Total</span>
//                       <span className="text-sky-600">
//                         ₹{total.toLocaleString()}
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handlePayment}
//                     disabled={!selectedAddress}
//                     className="w-full mt-8 bg-blue-600 text-white py-5 rounded-xl text-xl font-bold shadow hover:bg-blue-700 disabled:bg-gray-400"
//                   >
//                     <Lock className="inline-block mr-2" />
//                     Pay ₹{total.toLocaleString()}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* PAYMENT UI OVERLAY */}
//       <AnimatePresence>
//         {paymentState !== "idle" && (
//           <motion.div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
//             <motion.div className="bg-white rounded-2xl p-10 w-[350px] text-center">
//               {paymentState === "processing" && (
//                 <>
//                   <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-600" />
//                   <p className="mt-4 text-xl font-bold">
//                     Processing Payment...
//                   </p>
//                 </>
//               )}

//               {paymentState === "verifying" && (
//                 <>
//                   <Loader2 className="w-12 h-12 mx-auto animate-spin text-yellow-600" />
//                   <p className="mt-4 text-xl font-bold">Verifying…</p>
//                 </>
//               )}

//               {paymentState === "success" && (
//                 <>
//                   <CheckCircle className="w-14 h-14 mx-auto text-green-600" />
//                   <p className="mt-4 text-xl font-bold text-green-600">
//                     Payment Success!
//                   </p>
//                 </>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
//////////////////////////////// updated 26--11

// pages/Checkout.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Truck, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/AuthStore";
import { startPayment } from "../lib/payment";

const API = import.meta.env.VITE_API_URL;

interface Address {
  _id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

export default function Checkout() {
  const { items: cartItems } = useCartStore();
  const { user } = useAuthStore();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const [paymentState, setPaymentState] = useState<
    "idle" | "processing" | "verifying" | "success"
  >("idle");

  const navigate = useNavigate();

  // Load addresses
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    async function load() {
      try {
        const res = await axios.get(`${API}/api/addresses`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setAddresses(res.data.addresses);

          const def = res.data.addresses.find((a: Address) => a.isDefault);

          if (def) setSelectedAddress(def._id);
        }
      } catch {
        toast.error("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const shipping = subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  // ✔ FIXED PAYMENT HANDLER (no /checkout/address required)
  const handlePayment = async () => {
    if (!selectedAddress) return toast.error("Select a delivery address");
    if (cartItems.length === 0) return toast.error("Your cart is empty");

    setPaymentState("processing");

    try {
      // 1️⃣ Save FULL checkout session via cookie
      await axios.post(
        `${API}/api/checkout/session`,
        {
          addressId: selectedAddress,
          items: cartItems.map((i) => ({
            productId: i.product._id,
            qty: i.qty,
            price: i.product.price,
          })),
          totalAmount: total,
        },
        { withCredentials: true }
      );

      // 2️⃣ Trigger Razorpay payment
      await startPayment();

      setPaymentState("verifying");
    } catch (err) {
      console.error(err);
      setPaymentState("idle");
      toast.error("Payment failed!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-sky-600" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-black mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sky-600 font-bold underline text-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main UI */}
      <AnimatePresence mode="wait">
        {paymentState === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen py-8 px-4 bg-gray-50"
          >
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl text-center font-black mb-12">
                Secure Checkout
              </h1>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">
                  {/* ADDRESSES */}
                  <div className="bg-white rounded-xl shadow p-6 border">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <Truck className="text-sky-600" />
                      Delivery Address
                    </h2>

                    <div className="grid gap-4">
                      {addresses.map((addr) => (
                        <label
                          key={addr._id}
                          className={`p-5 rounded-xl border cursor-pointer transition ${
                            selectedAddress === addr._id
                              ? "border-sky-600 bg-sky-50"
                              : "border-gray-300"
                          }`}
                        >
                          <div className="flex gap-4 items-start">
                            <input
                              type="radio"
                              checked={selectedAddress === addr._id}
                              onChange={() => setSelectedAddress(addr._id)}
                            />

                            <div>
                              <p className="font-bold">{addr.fullName}</p>
                              <p className="text-gray-600">
                                {addr.street}, {addr.city}, {addr.state} -{" "}
                                {addr.pincode}
                              </p>
                              <p className="text-gray-700 mt-1">
                                Phone: {addr.phone}
                              </p>

                              {addr.isDefault && (
                                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full mt-2 inline-block">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* CART ITEMS */}
                  <div className="bg-white rounded-xl shadow p-6 border">
                    <h2 className="text-2xl font-bold mb-6">Order Items</h2>

                    <div className="space-y-6">
                      {cartItems.map((i) => (
                        <div key={i.product._id} className="flex gap-5">
                          <img
                            src={i.product.imageUrl}
                            className="w-24 h-24 rounded-xl border object-cover"
                          />

                          <div className="flex-1">
                            <p className="font-semibold">{i.product.name}</p>
                            <p className="text-sky-600 font-bold text-lg mt-1">
                              ₹{i.product.price.toLocaleString()} × {i.qty} = ₹
                              {(i.product.price * i.qty).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SUMMARY */}
                <div className="bg-white rounded-xl shadow p-6 border h-fit">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 text-lg">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-2xl font-black">
                      <span>Total</span>
                      <span className="text-sky-600">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!selectedAddress}
                    className="w-full mt-8 bg-blue-600 text-white py-5 rounded-xl text-xl font-bold shadow hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    <Lock className="inline-block mr-2" />
                    Pay ₹{total.toLocaleString()}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
