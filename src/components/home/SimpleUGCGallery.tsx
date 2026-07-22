import type { FC } from "react";

// 1. Updated interface and data for tech focus
interface TechUGCItem {
  id: string;
  image: string;
  category: string;
  username: string; // Added username for authentic UGC feel
}

const techUgcData: TechUGCItem[] = [
  {
    id: "1",
    // Authentic, lifestyle close-up of a premium smartphone
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
    category: "Smartphones",
    username: "@alex_tech",
  },
  {
    id: "2",
    // Lifestyle shot of premium wireless over-ear headphones
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    category: "Headphones",
    username: "@music_lover99",
  },
  {
    id: "3",
    // Minimalist workspace setup with a modern laptop
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    category: "Laptops",
    username: "@dev_mode",
  },
  {
    id: "4",
    // Smartwatch on a wrist, looking sleek and useful
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
    category: "Smartwatches",
    username: "@fitness_fan",
  },
  {
    id: "5",
    // Modern tablet with a stylus, ready for creation
    image:
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=600&auto=format&fit=crop",
    category: "Tablets",
    username: "@creative_mind",
  },
  {
    id: "6",
    // A drone being operated in a scenic location
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600&auto=format&fit=crop",
    category: "Drones",
    username: "@sky_view",
  },
  {
    id: "7",
    // Multiple devices (phone, watch, headphones) charging together
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop",
    category: "Charging Tech",
    username: "@power_user",
  },
  {
    id: "8",
    // Mechanical keyboard, personalized setup
    image:
      "https://images.unsplash.com/photo-1618384800394-2456b19d8d8d?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    username: "@setup_pro",
  },
];

// Fallback image in case an Unsplash link fails (using a different neutral tech shot)
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=600&auto=format&fit=crop";

interface TechUGCGalleryProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCategoryClick?: (category: string) => void;
}

const TechUGCGallery: FC<TechUGCGalleryProps> = ({
  // 2. Updated defaults for tech context
  title = "Our Tech in the Wild",
  subtitle = "Community favorites, real-world setups",
  ctaLabel = "Explore All Gadgets",
  onCategoryClick,
}) => {
  const handleItemClick = (category: string): void => {
    if (onCategoryClick) onCategoryClick(category);
  };

  return (
    // 3. Sophisticated Neutral Palette (No Blue)
    // Using gray-50/gray-900 for section background
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Title / Header Area */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Grid: 4 columns, minimal gap for a tight, modern feel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 md:gap-2">
          {techUgcData.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.category)}
              aria-label={`View ${item.category} curated by ${item.username}`}
              // Increased aspect ratio slightly (5/4) for a more substantial feel
              className="group relative overflow-hidden rounded-lg aspect-[5/4] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:focus-visible:ring-gray-50"
            >
              {/* The Image - No Cheap Scaling */}
              <img
                src={item.image}
                alt={`${item.category} setup from ${item.username}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (img.src !== FALLBACK_IMAGE) {
                    img.src = FALLBACK_IMAGE;
                  }
                }}
              />

              {/* Sophisticated Gradient Overlay - Shows details on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                {/* Username */}
                <span className="text-xs font-medium text-gray-300 mb-1">
                  {item.username}
                </span>
                {/* Category Pill - Using amber for a warm, high-quality accent */}
                <div className="flex">
                  <span className="inline-flex rounded-full bg-amber-400 px-3.5 py-1 text-xs font-bold text-gray-950 shadow-md">
                    {item.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Button Area */}
        <div className="text-left mt-12 md:mt-16">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-gray-950 text-white dark:bg-gray-50 dark:text-gray-950 px-8 py-3 text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-50"
            aria-label={ctaLabel}
            onClick={() => {
              console.log("Navigate to all tech gallery");
            }}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechUGCGallery;
