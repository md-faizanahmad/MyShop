// src/pages/product/ProductDetails.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import type { PublicProduct } from "../../types/product";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";

import ProductDetailsSkeleton from "../../skeleton/ProductDetailsSkeleton";
import ImageGallery from "./ImageGallery";
import ProductHighlights from "./ProductHighlights";
import PriceCard from "./PriceCard";
import ActionButtons from "./ActionButtons";
import ProductSpecifications from "./ProductSpecifications";
import ReviewForm from "../../shared/ReviewForm";
import ReviewList from "../../shared/ReviewList";
import SuggestedProducts from "../../shared/SuggestedProducts";
import ProductDescription from "./ProductDescription";
import ProductName from "./ProductName";
import { useAuthStore } from "../../store/useAuthStore";
import ProductBreadcrumb from "./ProductBreadcrumb";

const API = import.meta.env.VITE_API_URL;

export default function ProductDetails() {
  const { categorySlug, productSlug } = useParams<{
    categorySlug: string;
    productSlug: string;
  }>();

  const navigate = useNavigate();

  // Stores;

  const cartItems = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addItem);
  const removeFromCart = useCartStore((s) => s.removeItem);

  const wishlistItems = useWishlistStore((s) => s.items);
  const addWish = useWishlistStore((s) => s.add);
  const removeWish = useWishlistStore((s) => s.remove);
  const user = useAuthStore((state) => state.user);

  // Data fetch

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<PublicProduct>({
    queryKey: ["product", productSlug],
    queryFn: async () => {
      const res = await axios.get(`${API}/v1/products/slug/${productSlug}`);
      return res.data.product;
    },
    enabled: !!productSlug,
  });

  if (isLoading) return <ProductDetailsSkeleton />;

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-gray-600">
        Product Not Found
      </div>
    );
  }

  // Derived state
  const isWishlisted = wishlistItems.some((w) => w.productId === product._id);
  const isInCart = cartItems.some((i) => i.product._id === product._id);

  // Handlers

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeWish(product._id);
      toast.success("Removed from wishlist");
    } else {
      addWish(product);
      toast.success("Added to wishlist");
    }
  };

  const toggleCart = () => {
    if (isInCart) {
      removeFromCart(product._id);
      toast.success("Removed from cart");
    } else {
      addToCart(product, 1);
      toast.success("Added to cart");
    }
  };

  const galleryImages: string[] = [
    product.imageUrl,
    ...(product.images || []).map((img) =>
      typeof img === "string" ? img : img?.url,
    ),
  ].filter(Boolean) as string[];

  const hasUserReviewed = Boolean(
    user?._id &&
    product.reviews?.some((review) => review.user?._id === user._id),
  );
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6">
        <ProductBreadcrumb categorySlug={categorySlug} product={product} />

        {/* Product */}
        {/* <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6"> */}
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:gap-5">
          {/* Gallery */}
          <div className="min-w-0">
            <ImageGallery
              name={product.name}
              stock={product.stock}
              images={galleryImages}
              isWishlisted={isWishlisted}
              onWishlistToggle={toggleWishlist}
            />

            <ProductHighlights highlights={product.highlights ?? []} />
          </div>

          {/* Product Info */}
          <div className="min-w-0 flex flex-col gap-4">
            <ProductName name={product.name} />

            <PriceCard
              price={product.price}
              discountedPrice={product.discountPrice}
              stock={product.stock}
              offers={product.offers}
            />

            <ActionButtons
              stock={product.stock}
              isInCart={isInCart}
              onCartToggle={toggleCart}
              onBuyNow={() => navigate(`/checkout?quickbuy=${product._id}`)}
            />

            <ProductDescription description={product.description ?? ""} />

            <ProductSpecifications
              specifications={product.specifications ?? {}}
            />
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-10 border-t pt-8 sm:mt-14 sm:pt-10">
          <h2 className="mb-5 text-center text-lg font-semibold sm:mb-6 sm:text-xl">
            Customer Reviews
          </h2>

          <ReviewList
            productId={product._id}
            reviews={product.reviews ?? []}
            currentUserId={user?._id}
          />

          {!hasUserReviewed && (
            <ReviewForm productId={product._id} slug={product.slug} />
          )}
        </section>

        {/* Suggested */}
        <section className="mt-10 sm:mt-14">
          <h2 className="mb-5 text-center text-lg font-semibold sm:mb-6 sm:text-xl">
            You Might Also Like
          </h2>

          <SuggestedProducts
            categoryId={product.category._id}
            currentId={product._id}
          />
        </section>
      </div>
    </div>
  );
}
