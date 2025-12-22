// // src/pages/checkout/CheckoutPage.tsx
// // Date: 2025-12-14
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";

// import { useCartStore } from "../../store/useCartStore";
// import { useAuthStore } from "../../store/useAuthStore";
// import { startPayment, type VerifyResponse } from "../../lib/payment";

// import CheckoutAddresses from "./checkoutAddresses";
// import CheckoutItems from "./checkoutItems";
// import CheckoutSummary from "./checkoutSummary";
// import CheckoutLoading from "./checkoutLoading";
// import CheckoutVerifying from "./checkoutVerifying";

// import type { Address } from "../../types/address";
// import type { PublicProduct } from "../../types/product";

// const API = import.meta.env.VITE_API_URL as string;

// interface BuyNowItem {
//   product: PublicProduct;
//   qty: number;
// }

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();

//   const quickBuyId = params.get("quickbuy");
//   const isQuickBuy = Boolean(quickBuyId);

//   const cartItems = useCartStore((s) => s.items);
//   const user = useAuthStore((s) => s.user);

//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddress, setSelectedAddress] = useState<string>("");

//   const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);

//   const [loading, setLoading] = useState(true);
//   const [state, setState] = useState<
//     "idle" | "processing" | "verifying" | "success"
//   >("idle");

//   /* -------------------------------------------------------
//      AUTH + ADDRESS LOAD
//   ------------------------------------------------------- */
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     let mounted = true;

//     async function loadAddresses() {
//       try {
//         const res = await axios.get(`${API}/v1/addresses`, {
//           withCredentials: true,
//         });

//         if (!mounted) return;

//         setAddresses(res.data.addresses || []);
//         const def = res.data.addresses?.find((a: Address) => a.isDefault);
//         if (def) setSelectedAddress(def._id);
//       } catch {
//         toast.error("Failed to load addresses");
//       }
//     }

//     loadAddresses();

//     return () => {
//       mounted = false;
//     };
//   }, [user, navigate]);

//   /* -------------------------------------------------------
//      QUICK BUY PRODUCT LOAD (THE MISSING PIECE)
//   ------------------------------------------------------- */
//   useEffect(() => {
//     if (!isQuickBuy || !quickBuyId) return;

//     let mounted = true;

//     async function loadProduct() {
//       try {
//         const res = await axios.get(`${API}/v1/products/${quickBuyId}`);

//         if (!mounted) return;

//         setBuyNowItem({
//           product: res.data.product,
//           qty: 1,
//         });
//       } catch {
//         toast.error("Unable to load product");
//         navigate("/");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     loadProduct();

//     return () => {
//       mounted = false;
//     };
//   }, [isQuickBuy, quickBuyId, navigate]);

//   /* -------------------------------------------------------
//      CART FLOW LOADING END
//   ------------------------------------------------------- */
//   useEffect(() => {
//     if (!isQuickBuy) setLoading(false);
//   }, [isQuickBuy]);

//   /* -------------------------------------------------------
//      ITEMS SOURCE (CART vs BUY NOW)
//   ------------------------------------------------------- */
//   const items = useMemo(() => {
//     return isQuickBuy ? (buyNowItem ? [buyNowItem] : []) : cartItems;
//   }, [isQuickBuy, buyNowItem, cartItems]);

//   /* -------------------------------------------------------
//      PRICE CALCULATION
//   ------------------------------------------------------- */
//   const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

//   const shipping = subtotal >= 999 ? 0 : 49;
//   const total = subtotal + shipping;

//   /* -------------------------------------------------------
//      PAYMENT
//   ------------------------------------------------------- */
//   const handlePay = async () => {
//     if (!selectedAddress) {
//       toast.error("Select delivery address");
//       return;
//     }

//     if (items.length === 0) {
//       toast.error("No items to checkout");
//       return;
//     }

//     setState("processing");

//     try {
//       await axios.post(
//         `${API}/v1/checkout/session`,
//         {
//           addressId: selectedAddress,
//           items: items.map((i) => ({
//             productId: i.product._id,
//             qty: i.qty,
//             price: i.product.price,
//           })),
//           totalAmount: total,
//         },
//         { withCredentials: true }
//       );

//       setState("verifying");
//       const verify: VerifyResponse = await startPayment();
//       setState("success");
//       navigate(
//         verify.orderId
//           ? `/order-success?orderId=${verify.orderId}`
//           : "/order-success"
//       );
//     } catch {
//       setState("idle");
//       toast.error("Payment failed");
//     }
//   };

//   if (loading) return <CheckoutLoading />;

//   /* -------------------------------------------------------
//      RENDER
//   ------------------------------------------------------- */
//   return (
//     <AnimatePresence mode="wait">
//       {state === "verifying" && <CheckoutVerifying />}

//       {state === "verifying" && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="min-h-screen bg-gray-50 py-8 px-4"
//         >
//           <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-8">
//               <CheckoutAddresses
//                 addresses={addresses}
//                 selected={selectedAddress}
//                 onSelect={setSelectedAddress}
//               />

//               <CheckoutItems items={items} isQuickBuy={isQuickBuy} />
//             </div>

//             <CheckoutSummary
//               subtotal={subtotal}
//               shipping={shipping}
//               total={total}
//               disabled={!selectedAddress}
//               isQuickBuy={isQuickBuy}
//               onPay={handlePay}
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
// src/pages/checkout/CheckoutPage.tsx
// Date: 2025-12-14

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { startPayment, type VerifyResponse } from "../../lib/payment";

import CheckoutAddresses from "./checkoutAddresses";
import CheckoutItems from "./checkoutItems";
import CheckoutSummary from "./checkoutSummary";
import CheckoutLoading from "./checkoutLoading";
import CheckoutVerifying from "./checkoutVerifying";

import type { Address } from "../../types/address";
import type { PublicProduct } from "../../types/product";

const API = import.meta.env.VITE_API_URL as string;

interface BuyNowItem {
  product: PublicProduct;
  qty: number;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const quickBuyId = params.get("quickbuy");
  const isQuickBuy = Boolean(quickBuyId);

  const cartItems = useCartStore((s) => s.items);
  const user = useAuthStore((s) => s.user);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<"idle" | "verifying">("idle");

  /* -------------------- AUTH + ADDRESS -------------------- */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(`${API}/v1/addresses`, { withCredentials: true })
      .then((res) => {
        setAddresses(res.data.addresses || []);
        const def = res.data.addresses?.find((a: Address) => a.isDefault);
        if (def) setSelectedAddress(def._id);
      })
      .catch(() => toast.error("Failed to load addresses"))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  /* -------------------- BUY NOW PRODUCT -------------------- */
  useEffect(() => {
    if (!isQuickBuy || !quickBuyId) return;

    axios
      .get(`${API}/v1/products/${quickBuyId}`)
      .then((res) =>
        setBuyNowItem({
          product: res.data.product,
          qty: 1,
        })
      )
      .catch(() => {
        toast.error("Unable to load product");
        navigate("/");
      });
  }, [isQuickBuy, quickBuyId, navigate]);

  /* -------------------- ITEMS SOURCE -------------------- */
  const items = useMemo(
    () => (isQuickBuy ? (buyNowItem ? [buyNowItem] : []) : cartItems),
    [isQuickBuy, buyNowItem, cartItems]
  );

  /* -------------------- PRICE -------------------- */
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  /* -------------------- PAYMENT -------------------- */
  const handlePay = async () => {
    if (!selectedAddress) return toast.error("Select delivery address");
    if (items.length === 0) return toast.error("No items to checkout");

    try {
      setState("verifying");

      await axios.post(
        `${API}/v1/checkout/session`,
        {
          addressId: selectedAddress,
          items: items.map((i) => ({
            productId: i.product._id,
            qty: i.qty,
            price: i.product.price,
          })),
          totalAmount: total,
        },
        { withCredentials: true }
      );

      const verify: VerifyResponse = await startPayment();

      navigate(
        verify.orderId
          ? `/order-success?orderId=${verify.orderId}`
          : "/order-success"
      );
    } catch {
      setState("idle");
      toast.error("Payment failed");
    }
  };

  if (loading) return <CheckoutLoading />;

  /* -------------------- RENDER -------------------- */
  return (
    <AnimatePresence mode="wait">
      {state === "verifying" ? (
        <CheckoutVerifying />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gray-50 py-8 px-4"
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CheckoutAddresses
                addresses={addresses}
                selected={selectedAddress}
                onSelect={setSelectedAddress}
              />

              <CheckoutItems items={items} isQuickBuy={isQuickBuy} />
            </div>

            <CheckoutSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              disabled={!selectedAddress}
              isQuickBuy={isQuickBuy}
              onPay={handlePay}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
