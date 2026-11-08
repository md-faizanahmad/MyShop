///////////////////17-08-2026
// src/pages/checkout/CheckoutItems.tsx
// import { Link } from "react-router-dom";
// import type { CartItem } from "../../types/cartItem";

// interface Props {
//   items: CartItem[];
//   isQuickBuy: boolean;
// }

// export default function CheckoutItems({ items, isQuickBuy }: Props) {
//   return (
//     <section
//       className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
//       aria-labelledby="checkout-items-title"
//     >
//       <header className="mb-4">
//         <h2
//           id="checkout-items-title"
//           className="text-lg font-semibold text-slate-900"
//         >
//           {isQuickBuy ? "Your Item" : "Order Items"}
//         </h2>

//         <p className="mt-1 text-sm text-slate-500">
//           Review your items before placing the order.
//         </p>
//       </header>

//       <div className="divide-y divide-slate-100">
//         {items.map((i) => {
//           const itemTotal = i.product.price * i.qty;

//           return (
//             <article
//               key={i.product._id}
//               className="flex gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4"
//             >
//               <Link
//                 to={`/category/${i.product.category.slug}/product/${i.product.slug}`}
//                 className="shrink-0"
//                 aria-label={`View ${i.product.name}`}
//               >
//                 <img
//                   src={i.product.imageUrl}
//                   alt={i.product.name}
//                   loading="lazy"
//                   className="h-18 w-18 rounded-lg border border-slate-200 object-cover transition-opacity hover:opacity-80 sm:h-20 sm:w-20"
//                 />
//               </Link>

//               <div className="min-w-0 flex-1">
//                 <Link
//                   to={`/category/${i.product.category.slug}/product/${i.product.slug}`}
//                   className="line-clamp-2 text-sm font-medium leading-5 text-slate-900 hover:text-sky-600"
//                 >
//                   {i.product.name}
//                 </Link>

//                 <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
//                   <span>Qty: {i.qty}</span>
//                   <span>₹{i.product.price.toLocaleString("en-IN")} each</span>
//                 </div>

//                 <p className="mt-2 text-sm font-semibold text-sky-600">
//                   ₹{itemTotal.toLocaleString("en-IN")}
//                 </p>
//               </div>
//             </article>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Price Bug Fixing

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
          // Use discounted price when available, otherwise use original price.
          const sellingPrice = i.product.discountPrice ?? i.product.price;
          const itemTotal = sellingPrice * i.qty;

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

                  <span>₹{sellingPrice.toLocaleString("en-IN")} each</span>

                  {/* Show original price only when a discount is available. */}
                  {i.product.discountPrice != null && (
                    <span className="line-through">
                      ₹{i.product.price.toLocaleString("en-IN")}
                    </span>
                  )}
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
