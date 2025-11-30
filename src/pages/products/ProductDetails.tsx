import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import type { PublicProduct } from "../../types/product";
import { useStore } from "../../context/useStore";
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

const API = import.meta.env.VITE_API_URL;

export default function ProductDetails() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { addToWishlist, removeFromWishlist, wishlistIds, addToCart } =
    useStore();

  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<PublicProduct>({
    queryKey: ["product", productSlug],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/products/slug/${productSlug}`);
      return res.data.product;
    },
    enabled: !!productSlug,
  });

  if (isLoading) return <ProductDetailsSkeleton />;

  if (error || !product)
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-gray-600">
        Product Not Found
      </div>
    );

  const isWishlisted = wishlistIds.includes(product._id);

  const toggleWish = () => {
    if (isWishlisted) removeFromWishlist(product._id);
    else addToWishlist(product._id);
  };

  const addCart = () => addToCart(product._id, 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-600 mb-6"
        >
          <ChevronLeft size={18} />
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <div>
            <ImageGallery
              name={product.name}
              stock={product.stock}
              images={product.images ?? []}
            />
            <ProductHighlights highlights={product.highlights ?? []} />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <ProductDescription description={product.description ?? ""} />
            <PriceCard
              price={product.price}
              discountedPrice={product.discountPrice}
              stock={product.stock}
            />

            <ActionButtons
              productId={product._id}
              stock={product.stock}
              isWishlisted={isWishlisted}
              onWishlistToggle={toggleWish}
              onAddToCart={addCart}
              onBuyNow={() => navigate(`/checkout?quickbuy=${product._id}`)}
            />

            <ProductSpecifications
              specifications={product.specifications ?? {}}
            />
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-12 border-t pt-10">
          <h2 className="text-center text-2xl font-bold mb-6">
            Customer Reviews
          </h2>

          <ReviewForm productId={product._id} slug={product.slug} />

          <div className="mt-8">
            <ReviewList reviews={product.reviews ?? []} />
          </div>
        </section>

        {/* Suggested */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-bold mb-6">
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
