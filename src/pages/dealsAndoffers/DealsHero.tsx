import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

export default function DealsHero() {
  return (
    <section className="relative overflow-hidden rounded-md border border-zinc-200 bg-zinc-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=85')",
        }}
      />

      <div className="absolute inset-0 bg-zinc-950/65" />

      <div className="relative flex min-h-[250px] items-center px-5 py-8 sm:min-h-[290px] sm:px-8 lg:min-h-[310px] lg:px-12">
        <div className="max-w-lg">
          <span className="inline-flex items-center gap-1.5 bg-red-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            <Zap className="h-3 w-3 fill-current" />
            Limited Time Offer
          </span>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[40px]">
            Big Deals.
            <br />
            Better Prices.
          </h1>

          <p className="mt-3 max-w-md text-sm leading-5 text-zinc-200 sm:text-base">
            Save more on electronics, fashion, accessories and everyday
            essentials.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-1.5 rounded-sm bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Shop Deals
              <ChevronRight className="h-4 w-4" />
            </button>

            <span className="text-xs font-medium text-zinc-300 sm:text-sm">
              Up to <strong className="text-white">50% OFF</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Desktop arrows */}
      <button
        type="button"
        aria-label="Previous offer"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-sm border border-white/20 bg-black/20 p-2 text-white transition hover:bg-white/10 md:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Next offer"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-sm border border-white/20 bg-black/20 p-2 text-white transition hover:bg-white/10 md:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slider indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        <span className="h-1.5 w-6 bg-white" />
        <span className="h-1.5 w-1.5 bg-white/40" />
        <span className="h-1.5 w-1.5 bg-white/40" />
      </div>
    </section>
  );
}
