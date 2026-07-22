import { motion } from "framer-motion";

interface BrandStorySectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const DEFAULT_TECH_IMAGE =
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop";

export default function BrandStorySection({
  title = "Why MyAZStore?",
  description = "We’re dedicated to elevating your desk, mobile, and audio setup. From precision-engineered peripherals to everyday charging essentials, every product at MyAZStore is tested for reliability and sleek minimalist design — without the premium markups.",
  imageUrl = DEFAULT_TECH_IMAGE,
}: BrandStorySectionProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Small badge */}
            <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-1 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-4">
              Our Philosophy
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 dark:text-gray-50 tracking-tight leading-snug">
              {title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed text-sm md:text-base">
              {description}
            </p>

            {/* Highlights / stats */}
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-xs">
                <dt className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Curated Hardware
                </dt>
                <dd className="mt-1 text-sm font-semibold text-gray-950 dark:text-gray-50">
                  Performance First
                </dd>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-xs">
                <dt className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Setup Experience
                </dt>
                <dd className="mt-1 text-sm font-semibold text-gray-950 dark:text-gray-50">
                  Minimal & Seamless
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* IMAGE SIDE */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden aspect-4/3">
              <img
                src={imageUrl}
                alt="MyAZStore Tech Environment"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (img.src !== DEFAULT_TECH_IMAGE) {
                    img.src = DEFAULT_TECH_IMAGE;
                  }
                }}
              />

              {/* Bottom gradient overlay & detail label */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-gray-950/90 via-gray-950/40 to-transparent p-5 pt-12">
                <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  Built for everyday power users
                </p>
                <p className="text-xs sm:text-sm font-medium text-gray-200 mt-0.5">
                  Engineered gadgets, transparent pricing, fast fulfillment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
