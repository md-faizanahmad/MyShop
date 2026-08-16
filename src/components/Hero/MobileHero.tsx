import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { HomeHero } from "@/types/home";

interface MobileHeroProps {
  hero: HomeHero;
}

export default function MobileHero({ hero }: MobileHeroProps) {
  return (
    <section
      className="relative m-1 overflow-hidden rounded-xl "
      aria-labelledby="mobile-hero-heading"
    >
      {/* Banner */}
      <div className="relative aspect-10/7 min-h-[215px] w-full overflow-hidden">
        {/* Background image */}
        {hero.mobileBackgroundImage ? (
          <img
            src={hero.mobileBackgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        ) : hero.backgroundImage ? (
          <img
            src={hero.backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-100" />
        )}

        {/* Soft left readability layer */}
        <div
          className="absolute inset-0 bg-linear-to-r from-white/85 via-white/35 to-transparent"
          aria-hidden="true"
        />

        {/* Bottom soft fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/5 to-transparent"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <motion.div
            key={hero._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[80%] max-w-[280px] pl-5 pr-2"
          >
            <div className="space-y-3">
              {/* Campaign label */}
              {hero.liveBadge?.enabled && (
                <div className="max-w-full">
                  <p className="truncate text-[10px] font-bold uppercase tracking-[0.22em] text-sky-600">
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
                  {/* <div className="mt-2 h-1 w-12 rounded-full bg-sky-500" /> */}
                </div>
              )}

              {/* Headline */}
              <h2
                id="mobile-hero-heading"
                className="text-[26px] font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900"
              >
                {hero.headline}

                {hero.gradientHeadline && (
                  <>
                    {" "}
                    <span className="text-sky-600">
                      {hero.gradientHeadline}
                    </span>
                  </>
                )}
              </h2>

              {/* Subheadline */}
              {hero.subheadline && (
                <p className="line-clamp-3 max-w-[220px] text-[11px] font-medium leading-normal text-slate-600">
                  {hero.subheadline}
                </p>
              )}

              {/* CTA */}
              {hero.primaryCTA?.text && (
                <a
                  href={hero.primaryCTA.link}
                  className="group inline-flex items-center gap-1.5 rounded-md bg-sky-500 px-3.5 py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-sky-600 active:scale-[0.97]"
                >
                  <span>{hero.primaryCTA.text}</span>

                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-active:translate-x-0.5" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
