import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { HomeHero } from "@/types/home";

interface DesktopHeroProps {
  hero: HomeHero;
  showNavigation?: boolean;
}

export default function DesktopHero({ hero }: DesktopHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden rounded-sm bg-slate-900 text-white"
      aria-labelledby="desktop-hero-heading"
    >
      <div className="relative aspect-3/1 min-h-[260px] w-full overflow-hidden lg:min-h-80">
        {/* Background image */}
        <div className="absolute inset-0 bg-slate-900">
          <AnimatePresence initial={false}>
            <motion.img
              key={hero._id}
              src={hero.backgroundImage || ""}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.45,
                ease: "easeInOut",
              }}
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            />
          </AnimatePresence>

          {/* Content readability overlay */}
          <div
            className="absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-transparent"
            aria-hidden="true"
          />

          {/* Bottom subtle fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/20 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 flex h-full min-h-[260px] items-center px-8 lg:min-h-80 lg:px-14 xl:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={hero._id}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="w-full max-w-md"
            >
              <div className="space-y-3 lg:space-y-4">
                {/* Badge */}

                {hero.liveBadge?.enabled && (
                  <div className="max-w-full">
                    <p className="truncate text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
                      {hero.liveBadge.text}
                    </p>

                    <div className="relative mt-1.5 h-1 w-14 overflow-hidden rounded-full bg-sky-500">
                      <motion.div
                        className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-red-500"
                        animate={{
                          x: ["0%", "200%", "0%"],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Headline */}
                <h2
                  id="desktop-hero-heading"
                  className="max-w-[520px] font-sans text-3xl font-extrabold leading-[1.12] tracking-[-0.025em] text-white lg:text-4xl xl:text-[46px]"
                >
                  {hero.headline}

                  {hero.gradientHeadline && (
                    <>
                      {" "}
                      <span className="font-semibold text-white/90">
                        {hero.gradientHeadline}
                      </span>
                    </>
                  )}
                </h2>

                {/* Subheadline */}
                {hero.subheadline && (
                  <p className="line-clamp-2 max-w-[500px] text-sm font-medium leading-relaxed text-white/85 lg:text-base">
                    {hero.subheadline}
                  </p>
                )}

                {/* CTAs */}
                <div className="flex items-center gap-2 pt-1">
                  {hero.primaryCTA?.text && (
                    <a
                      href={hero.primaryCTA.link}
                      className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-500 px-4 py-2 text-xs font-bold text-white/85 shadow-sm transition-colors hover:bg-sky-600 hover:text-white active:scale-[0.98] lg:px-5 lg:py-2.5 lg:text-sm"
                    >
                      <span>{hero.primaryCTA.text}</span>

                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}

                  {hero.secondaryCTA?.text && (
                    <a
                      href={hero.secondaryCTA.link}
                      className="inline-flex max-w-[180px] items-center justify-center truncate rounded-lg border border-white/20 bg-slate-900/85 px-4 py-2 text-xs font-semibold text-white/75 shadow-sm transition-colors hover:bg-slate-800 hover:text-white active:scale-[0.98] lg:px-5 lg:py-2.5 lg:text-sm"
                    >
                      {hero.secondaryCTA.text}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Previous */}
      </div>
    </section>
  );
}
