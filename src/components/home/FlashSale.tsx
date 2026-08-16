import { ArrowRight, Zap } from "lucide-react";

export default function FlashSale() {
  return (
    <section
      aria-labelledby="flash-sale-heading"
      className="py-5 sm:py-7 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            overflow-hidden
            

          "
        >
          {/* ================================================
              MOBILE-FIRST CONTENT
          ================================================= */}
          <div className="lg:grid lg:grid-cols-2">
            {/* Product image comes first on mobile */}
            <div
              className="
                relative
                order-first
                h-48
                overflow-hidden
                bg-zinc-50
                sm:h-64
                lg:order-last
                lg:h-full
                lg:min-h-[360px]
              "
            >
              <img
                src="https://res.cloudinary.com/daqb5wglu/image/upload/v1765302805/MyStore/products/file_micrrn.jpg"
                alt="Laptop featured in the flash sale"
                loading="lazy"
                decoding="async"
                className="
                  h-full w-full
                  object-cover
                  object-center
                "
              />

              {/* Discount */}
              <span
                className="
                  absolute left-3 top-3
                  rounded-md
                  bg-white
                  px-2 py-1
                  text-[11px]
                  font-semibold
                  text-sky-600
                  shadow-sm
                  sm:left-4 sm:top-4
                  sm:text-xs
                "
              >
                Up to 20% off
              </span>
            </div>

            {/* Deal content */}
            <div
              className="
                flex flex-col
                justify-center
                px-5 py-6
                sm:px-8 sm:py-8
                lg:px-10 lg:py-10
              "
            >
              {/* Label */}
              <div className="mb-2.5 flex items-center gap-1.5">
                <Zap
                  aria-hidden="true"
                  className="size-3.5 fill-sky-500 text-red-500"
                />

                <span className="text-xs font-semibold text-red-600">
                  Flash sale
                </span>
              </div>

              {/* Heading */}
              <h2
                id="flash-sale-heading"
                className="
                  max-w-md
                  text-xl font-bold
                  leading-tight tracking-tight
                  text-zinc-900
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                Save on selected laptops.
              </h2>

              <p
                className="
                  mt-1.5 max-w-md
                  text-sm leading-5
                  text-zinc-500
                  sm:mt-2 sm:text-[15px] sm:leading-6
                "
              >
                Limited-time prices while stocks last.
              </p>

              {/* Deal details */}
              <div
                className="
                  mt-5
                  flex items-center gap-6
                  sm:mt-6 sm:gap-8
                "
              >
                {/* Countdown */}
                <div>
                  <p
                    className="
                      mb-1
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-wide
                      text-zinc-400
                    "
                  >
                    Ends in
                  </p>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-semibold text-zinc-900">
                      08
                    </span>
                    <span className="text-xs text-zinc-400">h</span>

                    <span className="text-lg font-semibold text-zinc-900">
                      42
                    </span>
                    <span className="text-xs text-zinc-400">m</span>

                    <span className="text-lg font-semibold text-zinc-900">
                      19
                    </span>
                    <span className="text-xs text-zinc-400">s</span>
                  </div>
                </div>

                {/* Stock */}
                <div className="min-w-32">
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span
                      className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-wide
                        text-zinc-400
                      "
                    >
                      Stock
                    </span>

                    <span className="text-[10px] font-semibold text-red-600">
                      12 left
                    </span>
                  </div>

                  <div
                    role="progressbar"
                    aria-label="Flash sale stock remaining"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={85}
                    className="
                      h-1.5
                      overflow-hidden
                      rounded-full
                      bg-zinc-100
                    "
                  >
                    <div className="h-full w-[85%] rounded-full bg-red-500" />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="/products?deal=flash-sale"
                className="
                  mt-5
                  inline-flex min-h-10
                  w-fit
                  items-center justify-center gap-2
                  rounded-lg
                  bg-sky-500
                  px-4 py-2
                  text-sm font-semibold
                  text-white
                  transition-colors
                  hover:bg-sky-600
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-sky-500
                  focus-visible:ring-offset-2
                  active:bg-sky-700
                  sm:mt-6
                "
              >
                Shop the deal
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
