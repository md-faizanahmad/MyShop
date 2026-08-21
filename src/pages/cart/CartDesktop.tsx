import { Heart, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import type { JSX } from "react";

import OrderSummaryCard from "./OrderSummaryCard";
import { getMaxQtyByPrice } from "../../utils/cartLimits";
import type { CartItem } from "@/types/cartItem";

interface CartDesktopProps {
  items: CartItem[];
  totalItems: number;
  updateQty: (productId: string, qty: number) => void | Promise<void>;
  removeItem: (productId: string) => void | Promise<void>;
  isWishlisted: (productId: string) => boolean;
  removeWish: (productId: string) => void | Promise<void>;
}

export default function CartDesktop({
  items,
  totalItems,
  updateQty,
  removeItem,
  isWishlisted,
  removeWish,
}: CartDesktopProps): JSX.Element {
  return (
    <section className="hidden min-h-screen bg-sky-50 px-4 py-8 lg:block">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="flex items-center text-xl font-semibold tracking-tight text-slate-900">
            Your Cart
            <span className="ml-2 text-xs font-normal leading-none text-slate-400">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </h1>
        </header>

        <div className="grid items-start gap-7 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <AnimatePresence initial={false}>
              {items.map((item) => {
                const product = item.product;
                const maxQty = getMaxQtyByPrice(product.price);
                const canIncrease = item.qty < maxQty;
                const wishlisted = isWishlisted(product._id);

                return (
                  <motion.article
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.2 }}
                    className="
                      overflow-hidden
                      rounded-xl
                      bg-white
                      p-4
                      shadow-[0_2px_12px_rgba(15,23,42,0.06)]
                    "
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="
                          h-24
                          w-24
                          shrink-0
                          rounded-lg
                          object-cover
                          bg-slate-100
                        "
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h2 className="truncate text-sm font-semibold text-slate-900">
                              {product.name}
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                              ₹{product.price.toLocaleString("en-IN")} each
                            </p>
                          </div>

                          <p className="shrink-0 text-sm font-bold text-sky-600">
                            ₹
                            {(product.price * item.qty).toLocaleString("en-IN")}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex items-center overflow-hidden rounded-lg bg-slate-50 shadow-sm">
                            <button
                              type="button"
                              onClick={() =>
                                void updateQty(product._id, item.qty - 1)
                              }
                              disabled={item.qty <= 1}
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                text-base
                                text-slate-600
                                transition
                                hover:bg-slate-100
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                              "
                              aria-label={`Decrease quantity of ${product.name}`}
                            >
                              −
                            </button>

                            <span
                              className="
                                flex
                                h-9
                                min-w-10
                                items-center
                                justify-center
                                px-2
                                text-sm
                                font-semibold
                                text-slate-900
                              "
                              aria-label={`Quantity ${item.qty}`}
                            >
                              {item.qty}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                if (!canIncrease) {
                                  toast.error(
                                    `Maximum ${maxQty} units allowed`,
                                  );
                                  return;
                                }

                                void updateQty(product._id, item.qty + 1);
                              }}
                              disabled={!canIncrease}
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                text-base
                                text-slate-600
                                transition
                                hover:bg-slate-100
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                              "
                              aria-label={`Increase quantity of ${product.name}`}
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            {wishlisted && (
                              <button
                                type="button"
                                onClick={() => {
                                  void removeWish(product._id);
                                  toast.success("Removed from wishlist");
                                }}
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-red-50
                                  text-red-500
                                  transition
                                  hover:bg-red-100
                                "
                                aria-label={`Remove ${product.name} from wishlist`}
                              >
                                <Heart
                                  size={17}
                                  strokeWidth={1.8}
                                  className="fill-current"
                                />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => void removeItem(product._id)}
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                bg-red-50
                                text-red-500
                                transition
                                hover:bg-red-100
                              "
                              aria-label={`Remove ${product.name} from cart`}
                            >
                              <Trash2 size={17} strokeWidth={1.8} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          <aside className="lg:sticky lg:top-24">
            <OrderSummaryCard />
          </aside>
        </div>
      </div>
    </section>
  );
}
