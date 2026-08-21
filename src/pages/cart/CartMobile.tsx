import { Heart, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import type { JSX } from "react";

import OrderSummaryCard from "./OrderSummaryCard";
import { getMaxQtyByPrice } from "../../utils/cartLimits";
import type { CartItem } from "@/types/cartItem";

interface CartMobileProps {
  items: CartItem[];
  totalItems: number;
  updateQty: (productId: string, qty: number) => void | Promise<void>;
  removeItem: (productId: string) => void | Promise<void>;
  isWishlisted: (productId: string) => boolean;
  removeWish: (productId: string) => void | Promise<void>;
}

export default function CartMobile({
  items,
  totalItems,
  updateQty,
  removeItem,
  isWishlisted,
  removeWish,
}: CartMobileProps): JSX.Element {
  return (
    <section className="min-h-screen bg-sky-50 px-3 py-5 lg:hidden">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-4 px-1">
          <h1 className="text-lg font-semibold tracking-tight text-slate-900">
            Your Cart
            <span className="ml-1.5 text-xs font-normal text-slate-400">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </h1>
        </header>

        <div className="space-y-3">
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
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.18 }}
                  className="
                    overflow-hidden
                    rounded-xl
                    bg-white
                    p-3
                    shadow-[0_2px_10px_rgba(15,23,42,0.06)]
                  "
                >
                  <div className="flex gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="
                        h-20
                        w-20
                        shrink-0
                        rounded-lg
                        bg-slate-100
                        object-cover
                      "
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
                            {product.name}
                          </h2>

                          <p className="mt-0.5 text-[11px] text-slate-500">
                            ₹{product.price.toLocaleString("en-IN")} each
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-bold text-sky-600">
                          ₹{(product.price * item.qty).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center overflow-hidden rounded-lg bg-slate-50">
                          <button
                            type="button"
                            onClick={() =>
                              void updateQty(product._id, item.qty - 1)
                            }
                            disabled={item.qty <= 1}
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              text-sm
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
                              h-8
                              min-w-8
                              items-center
                              justify-center
                              px-1
                              text-xs
                              font-semibold
                              text-slate-900
                            "
                          >
                            {item.qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              if (!canIncrease) {
                                toast.error(`Maximum ${maxQty} units allowed`);
                                return;
                              }

                              void updateQty(product._id, item.qty + 1);
                            }}
                            disabled={!canIncrease}
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              text-sm
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

                        <div className="flex items-center gap-1.5">
                          {wishlisted && (
                            <button
                              type="button"
                              onClick={() => {
                                void removeWish(product._id);
                                toast.success("Removed from wishlist");
                              }}
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-red-50
                                text-red-500
                              "
                              aria-label={`Remove ${product.name} from wishlist`}
                            >
                              <Heart
                                size={16}
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
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              bg-red-50
                              text-red-500
                            "
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <Trash2 size={16} strokeWidth={1.8} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>

          <div className="pt-2">
            <OrderSummaryCard />
          </div>
        </div>
      </div>
    </section>
  );
}
