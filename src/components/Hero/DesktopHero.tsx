import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { HomeHero } from "@/types/home";

interface DesktopHeroProps {
  hero: HomeHero;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
}

export default function DesktopHero({
  hero,
  onPrevious,
  onNext,
  showNavigation = false,
}: DesktopHeroProps) {
  return (
    <section
      className="relative isolate m-1 overflow-hidden rounded-xl bg-slate-100 text-white"
      aria-labelledby="desktop-hero-heading"
    >
      <div className="relative aspect-[3/1] min-h-[260px] w-full overflow-hidden lg:min-h-[320px]">
        {/* Background image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={hero._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            {hero.backgroundImage ? (
              <img
                src={hero.backgroundImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden="true"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-900" />
            )}

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
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-20 flex h-full min-h-[260px] items-center px-8 lg:min-h-[320px] lg:px-14 xl:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={hero._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="space-y-3 lg:space-y-4">
                {/* Badge */}
                {hero.liveBadge?.enabled && (
                  <div className="inline-flex max-w-[320px] items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sky-400 opacity-75" />
                      <span className="relative inline-flex h-full w-full rounded-full bg-sky-300" />
                    </span>

                    <span className="truncate">{hero.liveBadge.text}</span>
                  </div>
                )}

                {/* Headline */}
                <h2
                  id="desktop-hero-heading"
                  className="max-w-[520px] text-3xl font-black leading-[1.08] tracking-tight text-white lg:text-4xl xl:text-5xl"
                >
                  {hero.headline}

                  {hero.gradientHeadline && (
                    <>
                      {" "}
                      <span className="bg-linear-to-r from-indigo-200 via-sky-200 to-emerald-200 bg-clip-text text-transparent">
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
                      className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-slate-100 active:scale-[0.98] lg:px-5 lg:py-2.5 lg:text-sm"
                    >
                      <span>{hero.primaryCTA.text}</span>

                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}

                  {hero.secondaryCTA?.text && (
                    <a
                      href={hero.secondaryCTA.link}
                      className="inline-flex max-w-[180px] items-center justify-center truncate rounded-lg border border-white/25 bg-black/35 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/55 active:scale-[0.98] lg:px-5 lg:py-2.5 lg:text-sm"
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
        {showNavigation && (
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous banner"
            className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-sm backdrop-blur-md transition hover:bg-black/55 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        {/* Next */}
        {showNavigation && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next banner"
            className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-sm backdrop-blur-md transition hover:bg-black/55 active:scale-95"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
