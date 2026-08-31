/////////////////  many banners
import { useEffect, useState } from "react";
import type { HomeHero } from "@/types/home";
import DesktopHero from "../Hero/DesktopHero";
import MobileHero from "../Hero/MobileHero";

interface HeroSectionProps {
  heroes: HomeHero[];
  loading: boolean;
}

export default function HeroSection({ heroes, loading }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hero = heroes[currentIndex];

  // Keep index valid when banners change
  useEffect(() => {
    if (currentIndex >= heroes.length) {
      setCurrentIndex(Math.max(heroes.length - 1, 0));
    }
  }, [heroes.length, currentIndex]);

  useEffect(() => {
    if (heroes.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === heroes.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => window.clearInterval(interval);
  }, [heroes.length]);
  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <section
        className="relative m-1 flex h-[235px] items-center justify-center overflow-hidden  bg-slate-900 animate-pulse sm:h-[340px] md:h-[520px]"
        aria-label="Loading hero banners"
      >
        <div className="h-6 w-6 rounded-full border-2 border-slate-700 border-t-indigo-500 animate-spin sm:h-8 sm:w-8" />
      </section>
    );
  }

  /* ---------------- EMPTY ---------------- */

  if (!heroes.length || !hero) {
    return (
      <section
        className="relative m-1 flex h-[150px] items-center justify-center overflow-hidden rounded-xl bg-slate-950 px-4 sm:h-[220px]"
        aria-label="Hero banner unavailable"
      >
        <p className="text-xs font-medium text-slate-400">
          Unable to load banner. Please Check Your Internet Connection
        </p>
      </section>
    );
  }

  return (
    <section className="relative" aria-label="Featured banners">
      {/* =====================================================
          DESKTOP / TABLET
          ===================================================== */}
      <div className="hidden sm:block">
        <DesktopHero hero={hero} showNavigation={heroes.length > 1} />
      </div>

      {/* =====================================================
          MOBILE
          ===================================================== */}
      <div className="block sm:hidden">
        <MobileHero hero={hero} />
      </div>

      {/* =====================================================
          MOBILE CAROUSEL DOTS
          ===================================================== */}
      {heroes.length > 1 && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-3 z-40 flex justify-center sm:bottom-4"
          aria-label="Hero banner navigation"
        >
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur-sm">
            {heroes.map((banner, index) => (
              <button
                key={banner._id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to banner ${index + 1}`}
                aria-current={index === currentIndex}
                className={`h-1 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "w-4 bg-red-800"
                    : "w-1.5 bg-sky-500 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
