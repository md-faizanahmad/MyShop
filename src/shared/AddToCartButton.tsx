// src/components/ui/AddToCartButton.tsx
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useCartStore } from "../store/CartStore";
import type { PublicProduct } from "../types/product";

const API = import.meta.env.VITE_API_URL;
const MAX_UNITS_PER_PRODUCT = 4; // Final rule: max 4 units

interface Props {
  product: PublicProduct;
  quantity?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  size = "default",
  className = "",
}: Props) {
  const { items, addItem } = useCartStore();
  const queryClient = useQueryClient();

  // Calculate current quantity in cart for this product
  const currentQty = items.reduce((sum, item) => {
    return item.product._id === product._id ? sum + item.qty : sum;
  }, 0);

  const totalAfterAdd = currentQty + quantity;
  const isMaxReached = totalAfterAdd >= MAX_UNITS_PER_PRODUCT;
  const isInCart = currentQty > 0;

  const mutation = useMutation({
    mutationFn: () =>
      axios.post(
        `${API}/v1/cart/add`,
        { productId: product._id, quantity },
        { withCredentials: true }
      ),

    onMutate: () => {
      // Optimistic update
      addItem({
        product,
        qty: quantity,
      });
    },

    onSuccess: () => {
      toast.success(
        totalAfterAdd >= MAX_UNITS_PER_PRODUCT
          ? `Max ${MAX_UNITS_PER_PRODUCT} units added!`
          : "Added to cart!",
        { duration: 1800 }
      );
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: () => {
      toast.error("Failed to add to cart");
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (totalAfterAdd > MAX_UNITS_PER_PRODUCT) {
      toast.error(
        `Sorry! Maximum ${MAX_UNITS_PER_PRODUCT} units allowed per customer`,
        { duration: 3000 }
      );
      return;
    }

    mutation.mutate();
  };

  const sizes = {
    sm: "w-10 h-10",
    default: "w-12 h-12",
    lg: "w-full h-14 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      disabled={mutation.isPending || isMaxReached}
      className={`
        relative overflow-hidden rounded-2xl
        flex items-center justify-center gap-3 font-bold shadow-lg
        transition-all duration-200
        ${
          isMaxReached || mutation.isPending
            ? "opacity-70 cursor-not-allowed"
            : "hover:shadow-xl"
        }
        ${
          size === "lg"
            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
            : "bg-white border-2 border-gray-300"
        }
        ${sizes[size]} ${className}
      `}
    >
      {/* Loading */}
      {mutation.isPending && (
        <Loader2 className="animate-spin" size={size === "lg" ? 24 : 20} />
      )}

      {/* Max Reached */}
      {isMaxReached && !mutation.isPending && (
        <span className="flex items-center gap-2">
          <Check size={size === "lg" ? 24 : 20} />
          {size === "lg" ? "Max Reached" : ""}
        </span>
      )}

      {/* In Cart but not max */}
      {!mutation.isPending && isInCart && !isMaxReached && (
        <span className="flex items-center gap-2">
          <ShoppingCart size={size === "lg" ? 22 : 18} />
          {size === "lg" ? "Add More" : ""}
        </span>
      )}

      {/* Default State */}
      {!mutation.isPending && !isInCart && (
        <>
          <ShoppingCart size={size === "lg" ? 22 : 18} />
          {size === "lg" && "Add to Cart"}
        </>
      )}

      {/* Ripple Effect */}
      {mutation.isPending && (
        <motion.div
          className="absolute inset-0 bg-white/30"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}
