import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const INITIAL_TIME = 8 * 60 * 60 + 42 * 60 + 19;

function formatTime(value: number) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <section
      aria-labelledby="flash-sale-heading"
      className="py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden border border-zinc-200 bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Product Image */}
            <div
              className="
                relative
                order-first
                flex
                min-h-[230px]
                items-center
                justify-center
                bg-zinc-50
                px-6
                py-8
                sm:min-h-[300px]
                lg:order-last
                lg:min-h-[380px]
              "
            >
              <img
                src="https://res.cloudinary.com/daqb5wglu/image/upload/v1765302805/MyStore/products/file_micrrn.jpg"
                alt="Laptop featured in the flash sale"
                loading="lazy"
                decoding="async"
                className="
                  max-h-[190px]
                  w-auto
                  max-w-[88%]
                  object-contain
                  sm:max-h-[240px]
                  sm:max-w-[82%]
                  lg:max-h-[300px]
                  lg:max-w-[78%]
                "
              />

              {/* Discount */}
              <span
                className="
                  absolute
                  left-4
                  top-4
                  bg-red-600
                  px-2.5
                  py-1.5
                  text-[11px]
                  font-semibold
                  text-white
                  sm:left-5
                  sm:top-5
                  sm:text-xs
                "
              >
                Up to 20% off
              </span>
            </div>

            {/* Content */}
            <div
              className="
                flex
                flex-col
                justify-center
                border-t
                border-zinc-200
                px-5
                py-7
                sm:px-8
                sm:py-9
                lg:border-t-0
                lg:border-r
                lg:px-10
                lg:py-10
              "
            >
              {/* Label */}
              <div className="mb-3 flex items-center gap-1.5">
                <Zap
                  aria-hidden="true"
                  className="size-4 fill-red-500 text-red-500"
                />

                <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
                  Flash Sale
                </span>
              </div>

              {/* Heading */}
              <h2
                id="flash-sale-heading"
                className="
                  max-w-md
                  text-xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-zinc-900
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                Save on selected laptops
              </h2>

              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-zinc-500
                "
              >
                Limited-time prices while stocks last.
              </p>

              {/* Sale Information */}
              <div
                className="
                  mt-6
                  grid
                  grid-cols-2
                  gap-5
                  sm:flex
                  sm:items-end
                  sm:gap-8
                "
              >
                {/* Countdown */}
                <div>
                  <p
                    className="
                      mb-1.5
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-wide
                      text-zinc-400
                    "
                  >
                    Ends in
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-semibold tabular-nums text-zinc-900">
                      {hours}
                    </span>
                    <span className="text-xs text-zinc-400">h</span>

                    <span className="text-lg font-semibold tabular-nums text-zinc-900">
                      {minutes}
                    </span>
                    <span className="text-xs text-zinc-400">m</span>

                    <span className="text-lg font-semibold tabular-nums text-red-600">
                      {seconds}
                    </span>
                    <span className="text-xs text-zinc-400">s</span>
                  </div>
                </div>

                {/* Stock */}
                <div className="col-span-2 w-full sm:max-w-[190px]">
                  <div className="mb-1.5 flex items-center justify-between">
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
                    className="h-1.5 overflow-hidden bg-zinc-100"
                  >
                    <div className="h-full w-[85%] bg-red-500" />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="/products?deal=flash-sale"
                className="
                  mt-6
                  inline-flex
                  min-h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  bg-sky-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-sky-700
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-sky-600
                  focus-visible:ring-offset-2
                  sm:w-fit
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
