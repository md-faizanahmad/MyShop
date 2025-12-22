// // src/shared/AddToWishlistButton.tsx
// import { Heart } from "lucide-react";
// import toast from "react-hot-toast";
// import type { PublicProduct } from "../types/product";
// import { useWishlistStore } from "../store/useWishlistStore";

// interface Props {
//   product: PublicProduct;
//   size?: "sm" | "default" | "lg";
// }

// export default function AddToWishlistButton({
//   product,
//   size = "default",
// }: Props) {
//   const { items, toggle } = useWishlistStore();
//   const isWishlisted = items.some((i) => i._id === product._id); // ← Fixed

//   return (
//     <button
//       onClick={(e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         toggle(product);
//         toast.success(
//           isWishlisted ? "Removed from wishlist" : "Saved to wishlist",
//           {
//             icon: isWishlisted ? "HeartOff" : "Heart",
//           }
//         );
//       }}
//       className={`p-2 rounded-full transition-all ${
//         isWishlisted
//           ? "bg-pink-100 text-pink-600"
//           : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
//       }`}
//     >
//       <Heart
//         size={size === "lg" ? 24 : 20}
//         className={isWishlisted ? "fill-current" : ""}
//       />
//     </button>
//   );
// }
