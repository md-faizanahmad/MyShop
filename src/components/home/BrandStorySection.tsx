import { motion } from "framer-motion";

interface BrandStorySectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const DEFAULT_TECH_IMAGE =
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop";

/* --- TAILWIND CLASS CONSTRAINTS --- */
const CLASSES = {
  section: "w-full py-16 md:py-24 bg-gray-50 antialiased",
  container: "max-w-7xl mx-auto px-5 sm:px-8 lg:px-12",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center",

  // Badge & Typography
  badge:
    "inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs uppercase tracking-wider text-amber-700 font-semibold mb-4",
  heading:
    "text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-snug",
  bodyText: "text-gray-600 mt-4 leading-relaxed text-sm md:text-base",

  // Feature Cards List
  statsGrid: "mt-8 grid grid-cols-2 gap-4 text-sm",
  statCard: "rounded-lg border border-gray-200 bg-white p-4 shadow-xs",
  statLabel: "text-xs uppercase tracking-wider text-gray-500 font-medium",
  statValue: "mt-1 text-sm font-semibold text-gray-900",

  // Image Frame & Overlay
  imageWrapper:
    "relative rounded-lg border border-gray-200 bg-white shadow-xs overflow-hidden aspect-[4/3]",
  image:
    "w-full h-full object-cover transition-transform duration-700 hover:scale-105",
  overlay:
    "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-5 pt-12",
  overlayTag: "text-xs uppercase tracking-wider text-amber-300 font-semibold",
  overlayText: "text-xs sm:text-sm font-medium text-white mt-0.5",
} as const;

export default function BrandStorySection({
  title = "Why MyAZStore?",
  description = "We’re here to help you find tech and gear that just works. From phone accessories to laptop and audio setup essentials, every item at MyAZStore is picked to give you good quality and daily convenience — without high price tags.",
  imageUrl = DEFAULT_TECH_IMAGE,
}: BrandStorySectionProps) {
  return (
    <section className={CLASSES.section}>
      <div className={CLASSES.container}>
        <div className={CLASSES.grid}>
          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className={CLASSES.badge}>Our Story</div>

            <h2 className={CLASSES.heading}>{title}</h2>

            <p className={CLASSES.bodyText}>{description}</p>

            <dl className={CLASSES.statsGrid}>
              <div className={CLASSES.statCard}>
                <dt className={CLASSES.statLabel}>Selected Items</dt>
                <dd className={CLASSES.statValue}>Quality first</dd>
              </div>
              <div className={CLASSES.statCard}>
                <dt className={CLASSES.statLabel}>Shopping</dt>
                <dd className={CLASSES.statValue}>Simple & reliable</dd>
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
            <div className={CLASSES.imageWrapper}>
              <img
                src={imageUrl}
                alt="MyAZStore Workspace"
                className={CLASSES.image}
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (img.src !== DEFAULT_TECH_IMAGE) {
                    img.src = DEFAULT_TECH_IMAGE;
                  }
                }}
              />

              <div className={CLASSES.overlay}>
                <p className={CLASSES.overlayTag}>Made for everyday use</p>
                <p className={CLASSES.overlayText}>
                  Great products, fair prices, fast shipping.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
