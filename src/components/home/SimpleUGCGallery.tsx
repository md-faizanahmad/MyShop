import type { FC } from "react";

interface UGCItem {
  id: string;
  image: string;
  category: string;
}

const ugcData: UGCItem[] = [
  {
    id: "1",
    image:
      "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
    category: "Co-ord Sets",
  },
  {
    id: "2",
    image:
      "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
    category: "Sneakers",
  },
  {
    id: "3",
    image:
      "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
    category: "Handbags",
  },
  {
    id: "4",
    image:
      "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
    category: "Formal Shirts",
  },
  {
    id: "5",
    image:
      "https://res.cloudinary.com/daqb5wglu/image/upload/v1765046975/smartphone_lyuolh.png",
    category: "Smartphone",
  },
  {
    id: "6",
    image:
      "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
    category: "Travel Bags",
  },
  {
    id: "7",
    image:
      "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
    category: "Summer Dresses",
  },
  {
    id: "8",
    image:
      "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
    category: "Watches",
  },
];

interface SimpleUGCGalleryProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCategoryClick?: (category: string) => void;
}

const SimpleUGCGallery: FC<SimpleUGCGalleryProps> = ({
  title = "Shop the Look",
  subtitle = "Real customers, real style",
  ctaLabel = "Explore All Styles",
  onCategoryClick,
}) => {
  const handleItemClick = (category: string): void => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ugcData.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.category)}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
            >
              <img
                src={item.image}
                alt={item.category}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay + label */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="w-full px-3 pb-3">
                  <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-gray-900 bg-gray-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-gray-800 hover:border-gray-800 transition"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimpleUGCGallery;
