import type { FC } from "react";

interface UGCItem {
  id: string;
  image: string;
  category: string; // e.g. "Summer Dresses", "Sneakers", "Handbags"
}

const ugcData: UGCItem[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1521577352947-9bb58764b69e?w=800&q=80",
    category: "Co-ord Sets",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
    category: "Sneakers",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "Handbags",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Formal Shirts",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    category: "Skincare",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80",
    category: "Travel Bags",
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52a?w=800&q=80",
    category: "Summer Dresses",
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1584911846147-2855e1f1e062?w=800&q=80",
    category: "Watches",
  },
];

const SimpleUGCGallery: FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Shop the Look
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Real customers, real style
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ugcData.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
            >
              <img
                src={item.image}
                alt={`Customer wearing ${item.category}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Category Label on Hover */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                <span className="text-white text-lg md:text-xl font-bold tracking-wide drop-shadow-2xl">
                  {item.category}
                </span>
              </div>

              {/* Optional: Always visible subtle label */}
              {/* <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-gray-800">{item.category}</span>
              </div> */}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition hover:scale-105">
            Explore All Styles
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimpleUGCGallery;
