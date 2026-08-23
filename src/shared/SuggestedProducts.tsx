// // src/components/SuggestedProducts.tsx
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import ProductSkeleton from "../skeleton/ProductSkeleton";
// import type { PublicProduct } from "../types/product";
// import ProductCard from "../pages/ProductCard";

// const API = import.meta.env.VITE_API_URL;

// interface Props {
//   categoryId?: string | null;
//   currentId: string; // MongoDB ID to exclude current product
//   limit?: number;
// }

// export default function SuggestedProducts({
//   categoryId,
//   currentId,
//   limit = 4,
// }: Props) {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["suggested", categoryId],
//     queryFn: async () => {
//       if (!categoryId) return [] as PublicProduct[];

//       // fetch all products then filter
//       const res = await axios.get(`${API}/v1/products`);
//       const products = res.data.products as PublicProduct[];

//       return products.filter((p) => p.category?._id === categoryId);
//     },
//     enabled: Boolean(categoryId),
//     staleTime: 1000 * 60 * 2,
//   });

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {Array.from({ length: limit }).map((_, i) => (
//           <ProductSkeleton key={i} />
//         ))}
//       </div>
//     );
//   }

//   if (error || !data || data.length === 0) {
//     return (
//       <div className="text-sm text-gray-600">No suggestions available.</div>
//     );
//   }

//   const filtered = data.filter((p) => p._id !== currentId).slice(0, limit);

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {filtered.map((p) => (
//         <ProductCard key={p._id} product={p} />
//       ))}
//     </div>
//   );
// }

///////////////////23-08-2026
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import type { PublicProduct } from "../types/product";
import ProductCard from "../pages/ProductCard";

const API = import.meta.env.VITE_API_URL;

interface Props {
  categoryId?: string | null;
  currentId: string;
  limit?: number;
}

export default function SuggestedProducts({
  categoryId,
  currentId,
  limit = 4,
}: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["suggested", categoryId],
    queryFn: async () => {
      if (!categoryId) return [] as PublicProduct[];

      const res = await axios.get(`${API}/v1/products`);
      const products = res.data.products as PublicProduct[];

      return products.filter((p) => p.category?._id === categoryId);
    },
    enabled: Boolean(categoryId),
    staleTime: 1000 * 60 * 2,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {Array.from({ length: limit }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !data || data.length === 0) {
    return <p className="text-sm text-gray-500">No suggestions available.</p>;
  }

  const filtered = data.filter((p) => p._id !== currentId).slice(0, limit);

  if (!filtered.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {filtered.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
