import { motion } from "framer-motion";
import {
  BadgeCheck,
  Headphones,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import brandLogo from "@/assets/brand-logo.png";

interface BrandStorySectionProps {
  title?: string;
  description?: string;
  videoUrl?: string;
}

const CLASSES = {
  section: "w-full py-14 md:py-20 antialiased",

  container: "max-w-7xl mx-auto px-5 sm:px-8 lg:px-12",

  grid: "grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center",

  badge:
    "inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700",

  badgeDot: "w-1.5 h-1.5 rounded-full bg-red-600",

  heading:
    "text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.15] text-gray-900",

  body: "mt-5 max-w-xl text-sm sm:text-base leading-7 text-gray-600",

  features: "mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3",

  feature: "flex items-start gap-3 ",

  icon: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700",

  featureTitle: "text-sm font-semibold text-gray-900",

  featureText: "mt-1 text-xs leading-5 text-gray-500",

  media:
    "relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] shadow-sm",

  video: "absolute inset-0 h-full w-full object-cover",

  mediaOverlay:
    "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 sm:p-7 pt-20",

  overlayLabel:
    "text-[11px] font-semibold uppercase tracking-[0.15em] text-sky-800",

  overlayText: "mt-1 text-sm sm:text-base font-medium text-white",
} as const;

export default function BrandStorySection({
  title = "Why AZStore?",
  description = `We focus on practical tech and everyday accessories that are worth buying.
From phone accessories to audio and laptop essentials, our goal is simple —
useful products, fair prices, and a straightforward shopping experience.`,
  videoUrl = "/AZ-video.mp4",
}: BrandStorySectionProps) {
  return (
    <section className={CLASSES.section}>
      <div className={CLASSES.container}>
        <div className={CLASSES.grid}>
          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            <div className={CLASSES.badge}>
              <span className={CLASSES.badgeDot} />
              <span>Why AZStore?</span>
            </div>

            <h2 className={CLASSES.heading}>{title}</h2>

            <p className={CLASSES.body}>{description}</p>

            <div className={CLASSES.features}>
              <Feature
                icon={<BadgeCheck size={18} />}
                title="Curated Products"
                description="Practical tech and accessories selected for everyday use."
              />

              <Feature
                icon={<ShieldCheck size={18} />}
                title="Quality First"
                description="We focus on products that offer genuine everyday value."
              />

              <Feature
                icon={<PackageCheck size={18} />}
                title="Reliable Shopping"
                description="Simple ordering with secure packaging and delivery."
              />

              <Feature
                icon={<Headphones size={18} />}
                title="Everyday Tech"
                description="Accessories and gear made for work, travel and daily life."
              />
            </div>
          </motion.div>

          {/* VIDEO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.08,
            }}
          >
            <div className={CLASSES.media}>
              <video
                src={videoUrl}
                poster={brandLogo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className={CLASSES.video}
              />

              <div className={CLASSES.mediaOverlay}>
                <p className={CLASSES.overlayLabel}>Made for everyday use</p>

                <p className={CLASSES.overlayText}>
                  Useful products. Fair prices. Simple shopping.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className={CLASSES.feature}>
      <div className={CLASSES.icon}>{icon}</div>

      <div>
        <h3 className={CLASSES.featureTitle}>{title}</h3>

        <p className={CLASSES.featureText}>{description}</p>
      </div>
    </div>
  );
}
