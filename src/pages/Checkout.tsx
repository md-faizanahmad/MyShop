// src/pages/checkout.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Truck, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { startPayment, type VerifyResponse } from "../lib/payment";

const API = import.meta.env.VITE_API_URL as string;

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

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  product: Product;
  qty: number;
}

export default function Checkout(): React.JSX.Element {
  // Cast store values to typed shapes (adjust if your stores export types)
  const { items: cartItems } = useCartStore() as { items: CartItem[] };
  const { user } = useAuthStore() as {
    user: { _id: string; email?: string } | null;
  };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [paymentState, setPaymentState] = useState<
    "idle" | "processing" | "verifying" | "success"
  >("idle");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    let mounted = true;

    async function loadAddresses(): Promise<void> {
      try {
        const res = await axios.get<{ success: boolean; addresses: Address[] }>(
          `${API}/v1/addresses`,
          {
            withCredentials: true,
          }
        );

        if (!mounted) return;

        if (res.data.success) {
          setAddresses(res.data.addresses);
          const def = res.data.addresses.find((a) => a.isDefault);
          if (def) setSelectedAddress(def._id);
        } else {
          toast.error("Failed to load addresses");
        }
      } catch {
        if (mounted) toast.error("Failed to load addresses");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAddresses();

    return () => {
      mounted = false;
    };
  }, [user, navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const shipping = subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  const isPaying =
    paymentState === "processing" || paymentState === "verifying";

  const handlePayment = async (): Promise<void> => {
    if (!selectedAddress) {
      toast.error("Select a delivery address");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setPaymentState("processing");

    try {
      // Save full checkout session (server should persist session using cookies)
      await axios.post(
        `${API}/v1/checkout/session`,
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

      // Start payment flow — startPayment resolves only after server verification
      setPaymentState("verifying");
      const verify: VerifyResponse = await startPayment();

      if (verify.success) {
        setPaymentState("success");

        if (verify.redirect) {
          window.location.href = verify.redirect;
          return;
        }

        if (verify.orderId) {
          navigate(
            `/order-success?orderId=${encodeURIComponent(verify.orderId)}`
          );
          return;
        }

        navigate("/order-success");
      } else {
        // defensive: startPayment normally rejects on failure, but handle gracefully
        setPaymentState("idle");
        toast.error("Payment verification failed");
      }
    } catch (err) {
      setPaymentState("idle");
      // startPayment already shows contextual toasts for many failure cases;
      // show a fallback message if nothing else displayed
      if (
        !(err instanceof Error && err.message === "Payment cancelled by user")
      ) {
        toast.error("Payment failed or cancelled");
      }
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
                            name="shippingAddress"
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
                  disabled={!selectedAddress || paymentState !== "idle"}
                  className="w-full mt-8 bg-blue-600 text-white py-5 rounded-xl text-xl font-bold shadow hover:bg-blue-700 disabled:bg-gray-400"
                >
                  <Lock className="inline-block mr-2" />

                  {isPaying ? (
                    <div className="inline-flex items-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : (
                    <span>Pay ₹{total.toLocaleString()}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {paymentState === "verifying" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-sky-600 mx-auto" />
            <p className="mt-4 text-lg">Verifying your payment...</p>
          </div>
        </motion.div>
      )}

      {paymentState === "success" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-3xl font-black">Payment successful</h2>
            <p className="mt-2">Thank you for your order.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
