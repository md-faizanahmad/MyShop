import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { HomeHero } from "@/types/home";

interface MobileHeroProps {
  hero: HomeHero;
}

export default function MobileHero({ hero }: MobileHeroProps) {
  return (
    <section
      className="relative isolate m-1 min-h-[235px] overflow-hidden rounded-xl bg-neutral-950 text-white"
      aria-labelledby="mobile-hero-heading"
    >
      {/* Background */}
      {hero.mobileBackgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero.mobileBackgroundImage})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-r from-black/90 via-black/65 to-black/25"
        aria-hidden="true"
      />

      {/* Subtle bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-black/45 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 flex min-h-[235px] items-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[88%]"
        >
          <div className="space-y-2.5">
            {/* Live badge */}
            {hero.liveBadge?.enabled && (
              <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex h-full w-full rounded-full bg-sky-300" />
                </span>

                <span className="truncate">{hero.liveBadge.text}</span>
              </div>
            )}

            {/* Headline */}
            <h2
              id="mobile-hero-heading"
              className="text-[23px] font-black leading-[1.12] tracking-tight text-white"
            >
              {hero.headline}

              {hero.gradientHeadline && (
                <>
                  {" "}
                  <span className="bg-linear-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                    {hero.gradientHeadline}
                  </span>
                </>
              )}
            </h2>

            {/* Subheadline */}
            {hero.subheadline && (
              <p className="line-clamp-2 max-w-[95%] text-[11px] font-medium leading-relaxed text-slate-200">
                {hero.subheadline}
              </p>
            )}

            {/* CTA */}
            <div className="flex items-center gap-2 pt-1">
              {hero.primaryCTA?.text && (
                <a
                  href={hero.primaryCTA.link}
                  className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[11px] font-bold text-slate-950 shadow-sm transition active:scale-[0.97]"
                >
                  {hero.primaryCTA.text}

                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-active:translate-x-0.5" />
                </a>
              )}

              {hero.secondaryCTA?.text && (
                <a
                  href={hero.secondaryCTA.link}
                  className="inline-flex max-w-[42%] shrink-0 items-center justify-center truncate rounded-lg border border-white/20 bg-black/35 px-3.5 py-2 text-[11px] font-semibold text-white backdrop-blur-md transition active:scale-[0.97]"
                >
                  {hero.secondaryCTA.text}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
