// // src/components/product/ImageGallery.tsx
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ZoomIn, AlertCircle, Heart } from "lucide-react";

// interface ImageGalleryProps {
//   images: string[]; // Main + thumbnails (URLs)
//   name: string;
//   stock: number;
//   isNew?: boolean;
//   has360View?: boolean;
//   isWishlisted?: boolean; // New prop
//   onWishlistToggle?: () => void; // New prop
//   currentUserId?: string;
// }

// export default function ImageGallery({
//   images = [],
//   name,
//   stock,
//   isNew = false,
//   has360View = false,
//   isWishlisted = false,
//   onWishlistToggle = () => {},
// }: ImageGalleryProps) {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);

//   const mainImage = images[selectedIndex] || images[0] || "/placeholder.jpg";

//   const isOutOfStock = stock === 0;
//   const isLowStock = stock > 0 && stock <= 10;

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -30 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-4"
//     >
//       {/* Main Image Viewer */}
//       <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-inner">
//         {/* Main Image */}
//         <div
//           className="relative aspect-square cursor-zoom-in overflow-hidden"
//           onClick={() => setIsZoomed(!isZoomed)}
//         >
//           <AnimatePresence mode="wait">
//             <motion.img
//               key={selectedIndex}
//               src={mainImage}
//               alt={name}
//               initial={{ opacity: 0, scale: 1.1 }}
//               animate={{ opacity: 1, scale: isZoomed ? 1.8 : 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="w-full h-full object-contain select-none"
//               draggable={false}
//             />
//           </AnimatePresence>

//           {/* Zoom Indicator */}
//           {isZoomed && (
//             <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
//               <ZoomIn size={18} />
//               Tap to zoom out
//             </div>
//           )}

//           {/* Top Badges */}
//           <div className="absolute top-4 left-4 flex flex-col gap-2">
//             {isNew && (
//               <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
//                 NEW
//               </span>
//             )}
//             {has360View && (
//               <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
//                 360° View
//               </span>
//             )}
//           </div>

//           {/* Wishlist Heart Icon - Top Right (Flipkart/Amazon style) */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent triggering zoom
//               onWishlistToggle();
//             }}
//             className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110 hover:bg-white"
//             aria-label={
//               isWishlisted ? "Remove from wishlist" : "Add to wishlist"
//             }
//           >
//             <Heart
//               size={24}
//               className={`transition-all ${
//                 isWishlisted
//                   ? "fill-red-500 text-red-500 scale-110"
//                   : "text-gray-700"
//               }`}
//             />
//           </button>

//           {/* Stock Overlay */}
//           {isOutOfStock && (
//             <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
//               <div className="text-center">
//                 <AlertCircle size={64} className="mx-auto text-red-500 mb-3" />
//                 <p className="text-white text-3xl font-bold">Out of Stock</p>
//               </div>
//             </div>
//           )}

//           {isLowStock && (
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 py-2 rounded-full font-bold text-sm animate-pulse">
//               Only {stock} left!
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Thumbnails */}
//       {images.length > 1 && (
//         <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
//           {images.map((img, idx) => (
//             <button
//               key={idx}
//               onClick={() => setSelectedIndex(idx)}
//               className={`relative rounded-xl overflow-hidden border-2 transition-all ${
//                 selectedIndex === idx
//                   ? "border-blue-600 shadow-lg scale-105"
//                   : "border-gray-200 hover:border-gray-400"
//               }`}
//             >
//               <img
//                 src={img}
//                 alt={`${name} view ${idx + 1}`}
//                 className="w-full aspect-square object-cover"
//               />
//               {selectedIndex === idx && (
//                 <div className="absolute inset-0 bg-blue-600/20" />
//               )}
//             </button>
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// }

/////////////////////////////// 23-08-2026
// src/components/product/ImageGallery.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, AlertCircle, Heart } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  name: string;
  stock: number;
  isNew?: boolean;
  has360View?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
  currentUserId?: string;
}

export default function ImageGallery({
  images = [],
  name,
  stock,
  isNew = false,
  has360View = false,
  isWishlisted = false,
  onWishlistToggle = () => {},
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const mainImage = images[selectedIndex] || images[0] || "/placeholder.jpg";

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 10;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 sm:space-y-4"
    >
      {/* Gallery */}
      <div className="flex flex-col  gap-3 lg:flex-row lg:items-start lg:gap-0">
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="order-2  flex pl-4 gap-3 overflow-x-auto overflow-y-hidden lg:order-1 lg:flex-col lg:w-22 lg:shrink-0 ">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedIndex(idx);
                  setIsZoomed(false);
                }}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition lg:h-16 lg:w-16 ${
                  selectedIndex === idx
                    ? "border-blue-600"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt={`${name} view ${idx + 1}`}
                  className="h-full w-full object-contain"
                />

                {selectedIndex === idx && (
                  <div className="absolute inset-0 bg-blue-600/10" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <div className="relative overflow-hidden">
            <div
              className="relative aspect-[1/0.9] max-h-[360px] cursor-zoom-in overflow-hidden sm:aspect-square sm:max-h-[480px] lg:aspect-[1/0.9] lg:max-h-none"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={mainImage}
                  alt={name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: 1,
                    scale: isZoomed ? 1.8 : 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full select-none object-contain"
                  draggable={false}
                />
              </AnimatePresence>

              {/* Zoom Indicator */}
              {isZoomed && (
                <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
                  <ZoomIn size={15} />
                  Tap to zoom out
                </div>
              )}

              {/* Badges */}
              <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 sm:left-4 sm:top-4 sm:gap-2">
                {isNew && (
                  <span className="rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white sm:px-3 sm:py-1.5 sm:text-xs">
                    NEW
                  </span>
                )}

                {has360View && (
                  <span className="rounded-full bg-purple-600 px-2 py-1 text-[10px] font-bold text-white sm:px-3 sm:py-1.5 sm:text-xs">
                    360° View
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onWishlistToggle();
                }}
                className="absolute cursor-pointer rounded-sm right-7 top-2 flex h-9 w-9 items-center justify-center  bg-white/90 shadow-md backdrop-blur-sm transition hover:scale-105 sm:right-8 sm:top-1 sm:h-10 sm:w-10"
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  size={19}
                  className={
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
                  }
                />
              </button>

              {/* Out Of Stock */}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <div className="text-center">
                    <AlertCircle
                      size={42}
                      className="mx-auto mb-2 text-red-400 sm:size-14"
                    />
                    <p className="text-xl font-bold text-white sm:text-2xl">
                      Out of Stock
                    </p>
                  </div>
                </div>
              )}

              {/* Low Stock */}
              {isLowStock && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-semibold text-white sm:bottom-3 sm:px-3 sm:py-1.5 sm:text-xs">
                  Only {stock} left!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
