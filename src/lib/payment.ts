// src/lib/payment.ts
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL as string;

export interface RazorpayOrder {
  id: string;
  amount: number; // smallest currency unit (e.g., paise)
  currency: string;
}

export interface CreateOrderResp {
  success: true;
  key: string;
  order: RazorpayOrder;
  meta?: {
    name?: string;
    description?: string;
    prefill?: { name?: string; email?: string; contact?: string };
    themeColor?: string;
    image?: string;
    redirect?: string;
  };
}

export interface VerifyResponse {
  success: boolean;
  orderId?: string;
  redirect?: string;
}

declare global {
  interface Window {
    loadRazorpay?: () => Promise<void>;
    Razorpay?: RazorpayConstructor;
  }
}

export interface RazorpayHandlerPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayHandlerPayload) => void | Promise<void>;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayInstance {
  open: () => void;
}

export interface RazorpayConstructor {
  new (opts: RazorpayOptions): RazorpayInstance;
}

/**
 * startPayment
 * - Loads Razorpay script via window.loadRazorpay()
 * - Calls server to create order (expects CreateOrderResp)
 * - Opens checkout and resolves only after server verification succeeds
 *
 * Throws on any failure / user cancel / timeout.
 */
export async function startPayment(
  timeoutMs = 2 * 60 * 1000
): Promise<VerifyResponse> {
  if (typeof window === "undefined")
    throw new Error("startPayment must run in browser");

  if (!window.loadRazorpay) {
    const msg =
      "window.loadRazorpay helper not found. Add loader helper to index.html.";
    console.error(msg);
    toast.error("Payment initialization failed.");
    throw new Error(msg);
  }

  try {
    await window.loadRazorpay();
  } catch (err) {
    console.error("Failed to load Razorpay script", err);
    toast.error("Unable to load payment gateway. Try again.");
    throw err;
  }

  if (!window.Razorpay) {
    const msg = "Razorpay object not available after loading script.";
    console.error(msg);
    toast.error("Payment initialization failed.");
    throw new Error(msg);
  }

  // Create order on server (server should create Razorpay order and return key+order)
  let createResp: CreateOrderResp;
  try {
    const res = await axios.post<CreateOrderResp>(
      `${API}/v1/payment/create-order`,
      {},
      { withCredentials: true }
    );
    createResp = res.data;
  } catch (err) {
    console.error("Failed to create order on server", err);
    toast.error("Failed to create payment order. Try again.");
    throw err;
  }

  if (!createResp?.success || !createResp.order || !createResp.key) {
    console.error("Invalid create-order response", createResp);
    toast.error("Payment initialization failed.");
    throw new Error("Invalid order response from server");
  }

  const { order, key, meta } = createResp;

  return new Promise<VerifyResponse>((resolve, reject) => {
    let settled = false;

    const settleResolve = (val: VerifyResponse) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };

    const settleReject = (err: unknown) => {
      if (settled) return;
      settled = true;
      reject(err);
    };

    const timeout = setTimeout(() => {
      settleReject(new Error("Payment timed out"));
      toast.error("Payment timed out. Try again.");
    }, timeoutMs);

    const options: RazorpayOptions = {
      key,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      name: meta?.name ?? "MyAZ Store",
      description: meta?.description ?? "Order Payment",
      image: meta?.image ?? "/pwa-512x512.png",
      prefill: meta?.prefill,
      theme: { color: meta?.themeColor ?? "#2563eb" },

      handler: async (payload: RazorpayHandlerPayload) => {
        try {
          const verifyRes = await axios.post<VerifyResponse>(
            `${API}/v1/payment/verify-payment`,
            payload,
            {
              withCredentials: true,
            }
          );

          clearTimeout(timeout);

          if (verifyRes.data?.success) {
            toast.success("Payment successful");
            settleResolve(verifyRes.data);
          } else {
            console.error("Verification failed", verifyRes.data);
            toast.error("Payment verification failed. Contact support.");
            settleReject(new Error("Verification failed"));
          }
        } catch (err) {
          clearTimeout(timeout);
          console.error("Verification request failed", err);
          toast.error("Payment verification failed. Try again later.");
          settleReject(err);
        }
      },

      modal: {
        ondismiss: () => {
          clearTimeout(timeout);
          toast("Payment cancelled", { icon: "⚠️" });
          settleReject(new Error("Payment cancelled by user"));
        },
      },
    };

    try {
      const Rz = window.Razorpay as RazorpayConstructor;
      const rzp = new Rz(options);
      rzp.open();
    } catch (err) {
      clearTimeout(timeout);
      console.error("Failed to open Razorpay checkout", err);
      toast.error("Unable to open payment window. Try again.");
      settleReject(err);
    }
  });
}
