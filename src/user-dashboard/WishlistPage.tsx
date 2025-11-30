// pages/WishlistPage.tsx
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, X, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlistStore } from "../store/WishlistStore";
import { useCartStore } from "../store/CartStore";
import WishlistEmpty from "../shared/WishlistEmpty";

export default function WishlistPage() {
  const { items, remove, clearWishlist } = useWishlistStore();
  const { addItem, items: cartItems } = useCartStore();

  const isInCart = (productId: string) =>
    cartItems.some((item) => item.product._id === productId);

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success("Wishlist cleared");
  };

  if (items.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-50 pt-16 pb-20 px-3">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
            My Wishlist
          </h1>
          <p className="text-base text-gray-600 mt-2 font-medium">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Clear All Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleClearWishlist}
            className="flex items-center gap-2.5 bg-linear-to-r from-red-500 to-pink-600 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Trash2 className="w-5 h-5" />
            Clear All
          </button>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 md:gap-5">
          {items.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-sky-100/80"
              onDoubleClick={() => {
                remove(product._id);
                toast.success("Removed from wishlist");
              }}
            >
              {/* Image Container */}
              <Link
                to={`/product/${product._id}`}
                className="block aspect-square relative overflow-hidden"
              >
                <img
                  src={product.imageUrl || "/placeholder.jpg"}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark overlay + Double-tap hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <span className="text-white text-xs font-bold tracking-wider opacity-80">
                    Double-tap to remove
                  </span>
                </div>

                {/* Filled Heart Badge (Saved) */}
                <div className="absolute top-3 right-3">
                  <div className="w-9 h-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-lg">
                    <Heart
                      className="w-5 h-5 text-red-500"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </Link>

              {/* Compact Info */}
              <div className="p-3 space-y-1.5">
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight hover:text-sky-600 transition">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm font-bold bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  ₹{product.price?.toLocaleString("en-IN") || "N/A"}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({ product, qty: 1 });
                      toast.success("Added to cart");
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                      isInCart(product._id)
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-linear-to-r from-sky-500 to-blue-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {isInCart(product._id) ? (
                      "Added"
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(product._id);
                      toast.success("Removed");
                    }}
                    className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
