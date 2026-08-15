import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { HomeHero } from "@/types/home";

interface MobileHeroProps {
  hero: HomeHero;
}

export default function MobileHero({ hero }: MobileHeroProps) {
  return (
    <section
      className="relative m-1 overflow-hidden rounded-xl bg-slate-100"
      aria-labelledby="mobile-hero-heading"
    >
      {/* Banner image */}
      <div className="relative aspect-2/1 w-full overflow-hidden">
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
          <div className="absolute inset-0 bg-slate-900" />
        )}

        {/* Subtle readability overlay */}
        <div
          className="absolute inset-0 bg-linear-to-r from-black/55 via-black/10 to-transparent"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <motion.div
            key={hero._id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[58%] pl-4 pr-2"
          >
            {/* Badge */}
            {hero.liveBadge?.enabled && (
              <div className="mb-1.5 inline-flex max-w-full items-center rounded-full bg-black/60 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                <span className="mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                <span className="truncate">{hero.liveBadge.text}</span>
              </div>
            )}

            {/* Headline */}
            <h2
              id="mobile-hero-heading"
              className="line-clamp-2 text-[18px] font-extrabold leading-[1.08] tracking-tight text-white"
            >
              {hero.headline}

              {hero.gradientHeadline && (
                <>
                  {" "}
                  <span className="text-white">{hero.gradientHeadline}</span>
                </>
              )}
            </h2>

            {/* Subheadline */}
            {hero.subheadline && (
              <p className="mt-1 line-clamp-2 max-w-full text-[9px] font-medium leading-[1.35] text-white/90">
                {hero.subheadline}
              </p>
            )}

            {/* CTA */}
            {hero.primaryCTA?.text && (
              <a
                href={hero.primaryCTA.link}
                className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-slate-950 shadow-sm transition active:scale-95"
              >
                {hero.primaryCTA.text}

                <ArrowRight className="h-3 w-3" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
