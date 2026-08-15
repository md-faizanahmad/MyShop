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
      className="relative isolate m-1 min-h-[340px] overflow-hidden rounded-xl bg-neutral-950 text-white md:min-h-[500px]"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={hero._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {hero.backgroundImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 transition-all"
              style={{
                backgroundImage: `url(${hero.backgroundImage})`,
              }}
              aria-hidden="true"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 z-10 bg-linear-to-r from-black/90 via-black/60 to-black/20 md:bg-linear-to-b md:from-black/45 md:via-black/65 md:to-neutral-950/80" />

          {/* Ambient */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            aria-hidden="true"
          >
            <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[48px_48px]" />

            <div className="absolute left-1/3 top-0 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-[340px] w-full max-w-7xl items-center px-6 py-10 md:min-h-[500px] md:px-8 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={hero._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="mx-auto max-w-4xl text-center">
              <div className="space-y-4 md:space-y-6">
                {/* LIVE BADGE */}
                {hero.liveBadge?.enabled && (
                  <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-200 shadow-xs backdrop-blur-md">
                    <span
                      className="relative flex h-2 w-2 shrink-0"
                      aria-hidden="true"
                    >
                      <span className="absolute inline-flex h-full w-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sky-500 opacity-75" />

                      <span className="relative inline-flex h-full w-full rounded-full bg-white" />
                    </span>

                    <span className="truncate">{hero.liveBadge.text}</span>
                  </div>
                )}

                {/* HEADLINE */}
                <h2
                  id="hero-heading"
                  className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  {hero.headline}

                  {hero.gradientHeadline && (
                    <>
                      <br />

                      <span className="bg-linear-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                        {hero.gradientHeadline}
                      </span>
                    </>
                  )}
                </h2>

                {/* SUBHEADLINE */}
                {hero.subheadline && (
                  <p className="mx-auto max-w-[720px] text-base font-medium leading-relaxed text-slate-300 md:text-xl">
                    {hero.subheadline}
                  </p>
                )}

                {/* CTA */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  {hero.primaryCTA?.text && (
                    <a
                      href={hero.primaryCTA.link}
                      className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white px-6 py-3 text-base font-bold text-slate-950 shadow-sm transition duration-200 hover:bg-slate-100 active:scale-[0.98] md:px-8 md:py-4"
                    >
                      <span>{hero.primaryCTA.text}</span>

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 md:h-5 md:w-5" />
                    </a>
                  )}

                  {hero.secondaryCTA?.text && (
                    <a
                      href={hero.secondaryCTA.link}
                      className="inline-flex max-w-[280px] shrink-0 items-center justify-center truncate rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3 text-base font-semibold text-slate-200 backdrop-blur-md transition-all duration-200 hover:bg-slate-800 hover:text-white active:scale-[0.98] md:px-8 md:py-4"
                    >
                      {hero.secondaryCTA.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel arrows */}
      {showNavigation && (
        <>
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous banner"
            className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next banner"
            className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </>
      )}
    </section>
  );
}
