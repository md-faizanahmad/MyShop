// import axios from "axios";

// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// interface RazorpayOrder {
//   id: string;
//   amount: number;
//   currency: string;
// }

// interface RazorpayHandlerResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }

// interface RazorpayOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   name: string;
//   description: string;
//   order_id: string;
//   handler: (response: RazorpayHandlerResponse) => void;
//   prefill?: {
//     name?: string;
//     email?: string;
//     contact?: string;
//   };
//   theme?: {
//     color?: string;
//   };
// }

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => {
//       open: () => void;
//     };
//   }
// }

// export async function startPayment(amount: number) {
//   try {
//     // 1. Create Order
//     const { data } = await axios.post<{
//       success: boolean;
//       order: RazorpayOrder;
//     }>(
//       `${API}/api/payment/create-order`,
//       { amount },
//       { withCredentials: true }
//     );

//     if (!data.success) throw new Error("Order failed");

//     const order = data.order;

//     // 2. Razorpay Options
//     const options: RazorpayOptions = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "MyAZStore",
//       description: "Order Payment",
//       order_id: order.id,

//       handler(response) {
//         console.log("Payment Success:", response);
//         alert("Payment Successful!");
//         window.location.href = "/dashboard/orders";
//       },

//       prefill: {
//         name: "MyAZStore User",
//         email: "user@example.com",
//       },

//       theme: { color: "#2563eb" },
//     };

//     // 3. Open Razorpay Popup
//     const razor = new window.Razorpay(options);
//     razor.open();
//   } catch (err) {
//     console.error(err);
//     alert("Payment failed. Try again.");
//   }
// }
///////////////////////new upadated---------------import axios from "axios";

// src/lib/payment.ts
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// interface RazorpayOrder {
//   id: string;
//   amount: number;
//   currency: string;
// }

// interface RazorpayHandlerResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }

// interface RazorpayOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   name: string;
//   description: string;
//   order_id: string;
//   handler: (response: RazorpayHandlerResponse) => void;
//   prefill?: {
//     name?: string;
//     email?: string;
//     contact?: string;
//   };
//   theme?: {
//     color?: string;
//   };
// }

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => {
//       open: () => void;
//     };
//   }
// }

// /**
//  * amount: final total
//  * addressId: selected address to attach to order
//  */
// export async function startPayment(amount: number, addressId: string) {
//   try {
//     // 1. Create order
//     const { data } = await axios.post<{
//       success: boolean;
//       order: RazorpayOrder;
//     }>(
//       `${API}/api/payment/create-order`,
//       { amount },
//       { withCredentials: true }
//     );

//     if (!data.success) throw new Error("Order creation failed");

//     const order = data.order;

//     // 2. Razorpay options
//     const options: RazorpayOptions = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "MyAZStore",
//       description: "Order Payment",
//       order_id: order.id,

//       async handler(response) {
//         try {
//           const verifyRes = await axios.post<{
//             success: boolean;
//             orderId?: string;
//           }>(
//             `${API}/api/payment/verify-payment`,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               addressId,
//             },
//             { withCredentials: true }
//           );

//           if (verifyRes.data.success) {
//             window.location.href = "/order-success";
//           } else {
//             alert("Payment verification failed.");
//           }
//         } catch {
//           alert("Payment verification failed.");
//         }
//       },

//       prefill: {
//         name: "MyAZStore User",
//         email: "myazstore@shop.com",
//       },

//       theme: { color: "#2563eb" },
//     };

//     const razor = new window.Razorpay(options);
//     razor.open();
//   } catch (err) {
//     console.error(err);
//     alert("Payment failed. Try again.");
//   }
// }
////////////////////////////// Update 25--11
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// interface RazorpayOrder {
//   id: string;
//   amount: number;
//   currency: string;
// }

// interface VerifyResponse {
//   success: boolean;
// }

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export async function startPayment(): Promise<void> {
//   // 1️⃣ Create Razorpay order
//   const createRes = await axios.post<{
//     success: boolean;
//     order: RazorpayOrder;
//   }>(`${API}/api/payment/create-order`, {}, { withCredentials: true });

//   if (!createRes.data.success) throw new Error("Order creation failed");

//   const order = createRes.data.order;

//   // 2️⃣ Open Razorpay popup
//   const options = {
//     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//     amount: order.amount,
//     currency: order.currency,
//     name: "MyAZStore",
//     description: "Order Payment",
//     order_id: order.id,

//     handler: async (response: {
//       razorpay_order_id: string;
//       razorpay_payment_id: string;
//       razorpay_signature: string;
//     }) => {
//       const verifyRes = await axios.post<VerifyResponse>(
//         `${API}/api/payment/verify-payment`,
//         response,
//         { withCredentials: true }
//       );

//       if (verifyRes.data.success) {
//         window.location.href = "/order-success";
//       }
//     },

//     theme: { color: "#2563eb" },
//   };

//   const razor = new window.Razorpay(options);
//   razor.open();
// }

////////////////////////////////26--11 updated

// lib/payment.ts
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface VerifyResponse {
  success: boolean;
  orderId: string;
}

declare global {
  interface Window {
    Razorpay: new (options: unknown) => {
      open: () => void;
    };
  }
}

export async function startPayment(): Promise<void> {
  // Create Razorpay order
  const { data } = await axios.post<{ success: boolean; order: RazorpayOrder }>(
    `${API}/api/payment/create-order`,
    {},
    { withCredentials: true }
  );

  if (!data.success) throw new Error("Order creation failed");

  const order = data.order;

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "MyAZStore",
    description: "Order Payment",
    order_id: order.id,

    handler: async (response: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      const verifyRes = await axios.post<VerifyResponse>(
        `${API}/api/payment/verify-payment`,
        response,
        { withCredentials: true }
      );

      if (verifyRes.data.success) {
        window.location.href = `/order-success?orderId=${verifyRes.data.orderId}`;
      }
    },

    theme: { color: "#2563eb" },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
}
