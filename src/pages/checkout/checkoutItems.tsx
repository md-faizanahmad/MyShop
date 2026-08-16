// // src/pages/checkout/CheckoutItems.tsx
// import type { CartItem } from "../../types/cartItem";

// interface Props {
//   items: CartItem[];
//   isQuickBuy: boolean;
// }

// export default function CheckoutItems({ items, isQuickBuy }: Props) {
//   return (
//     <div className="bg-white rounded-xl shadow p-6 border">
//       <h2 className="text-2xl font-bold mb-6">
//         {isQuickBuy ? "Buy Now Item" : "Order Items"}
//       </h2>

//       <div className="space-y-5">
//         {items.map((i) => (
//           <div
//             key={i.product._id}
//             className="flex gap-4 items-start border-b pb-4 last:border-b-0"
//           >
//             <img
//               src={i.product.imageUrl}
//               alt={i.product.name}
//               className="w-20 h-20 rounded-lg border object-cover"
//             />

//             <div className="flex-1">
//               <p className="font-semibold text-gray-900">{i.product.name}</p>

//               <p className="text-sm text-gray-500 mt-1">Qty: {i.qty}</p>

//               <p className="text-sky-600 font-bold mt-2">
//                 ₹{i.product.price.toLocaleString("en-IN")} × {i.qty} = ₹
//                 {(i.product.price * i.qty).toLocaleString("en-IN")}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

///////////////////17-08-2026
// src/pages/checkout/CheckoutItems.tsx
import { Link } from "react-router-dom";
import type { CartItem } from "../../types/cartItem";

interface Props {
  items: CartItem[];
  isQuickBuy: boolean;
}

export default function CheckoutItems({ items, isQuickBuy }: Props) {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-labelledby="checkout-items-title"
    >
      <header className="mb-4">
        <h2
          id="checkout-items-title"
          className="text-lg font-semibold text-slate-900"
        >
          {isQuickBuy ? "Your Item" : "Order Items"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review your items before placing the order.
        </p>
      </header>

      <div className="divide-y divide-slate-100">
        {items.map((i) => {
          const itemTotal = i.product.price * i.qty;

          return (
            <article
              key={i.product._id}
              className="flex gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4"
            >
              <Link
                to={`/category/${i.product.category.slug}/product/${i.product.slug}`}
                className="shrink-0"
                aria-label={`View ${i.product.name}`}
              >
                <img
                  src={i.product.imageUrl}
                  alt={i.product.name}
                  loading="lazy"
                  className="h-18 w-18 rounded-lg border border-slate-200 object-cover transition-opacity hover:opacity-80 sm:h-20 sm:w-20"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/category/${i.product.category.slug}/product/${i.product.slug}`}
                  className="line-clamp-2 text-sm font-medium leading-5 text-slate-900 hover:text-sky-600"
                >
                  {i.product.name}
                </Link>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span>Qty: {i.qty}</span>
                  <span>₹{i.product.price.toLocaleString("en-IN")} each</span>
                </div>

                <p className="mt-2 text-sm font-semibold text-sky-600">
                  ₹{itemTotal.toLocaleString("en-IN")}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
