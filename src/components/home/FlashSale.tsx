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
      className="py-5 sm:py-7 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            overflow-hidden
            bg-gradient-to-r
            from-sky-50
            via-white
            to-red-50
          "
        >
          <div className="lg:grid lg:grid-cols-2">
            {/* Product image */}
            <div
              className="
                relative
                order-first
                flex
                min-h-[220px]
                items-center
                justify-center
                overflow-hidden
                sm:min-h-[280px]
                lg:order-last
                lg:min-h-[360px]
              "
            >
              {/* Soft background glow */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-40
                  w-40
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-sky-200/40
                  blur-3xl
                  sm:h-56
                  sm:w-56
                "
              />

              <img
                src="https://res.cloudinary.com/daqb5wglu/image/upload/v1765302805/MyStore/products/file_micrrn.jpg"
                alt="Laptop featured in the flash sale"
                loading="lazy"
                decoding="async"
                className="
                  relative
                  z-10
                  max-h-[180px]
                  w-auto
                  max-w-[90%]
                  object-contain
                  mix-blend-multiply
                  drop-shadow-[0_20px_20px_rgba(0,0,0,0.14)]
                  transition-transform
                  duration-500
                  hover:scale-[1.04]
                  sm:max-h-[230px]
                  sm:max-w-[85%]
                  lg:max-h-[290px]
                  lg:max-w-[82%]
                  lg:[transform:rotateY(-8deg)_rotateX(3deg)]
                  lg:hover:[transform:rotateY(-3deg)_rotateX(1deg)_scale(1.04)]
                "
              />

              {/* Discount */}
              <span
                className="
                  absolute
                  left-3
                  top-3
                  z-20
                  rounded-md
                  bg-white/90
                  px-2.5
                  py-1.5
                  text-[11px]
                  font-semibold
                  text-sky-600
                  shadow-sm
                  backdrop-blur-sm
                  sm:left-4
                  sm:top-4
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
                px-5
                py-7
                sm:px-8
                sm:py-9
                lg:px-10
                lg:py-10
              "
            >
              <div className="mb-2.5 flex items-center gap-1.5">
                <Zap
                  aria-hidden="true"
                  className="size-3.5 fill-sky-500 text-red-500"
                />

                <span className="text-xs font-semibold text-red-600">
                  Flash sale
                </span>
              </div>

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
                Save on selected laptops.
              </h2>

              <p
                className="
                  mt-1.5
                  max-w-md
                  text-sm
                  leading-5
                  text-zinc-500
                  sm:mt-2
                  sm:text-[15px]
                  sm:leading-6
                "
              >
                Limited-time prices while stocks last.
              </p>

              {/* Sale details */}
              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  items-end
                  gap-x-6
                  gap-y-4
                  sm:mt-6
                  sm:gap-x-8
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
                    <span className="min-w-[20px] text-lg font-semibold tabular-nums text-zinc-900">
                      {hours}
                    </span>
                    <span className="text-xs text-zinc-400">h</span>

                    <span className="min-w-[20px] text-lg font-semibold tabular-nums text-zinc-900">
                      {minutes}
                    </span>
                    <span className="text-xs text-zinc-400">m</span>

                    <span className="min-w-[20px] text-lg font-semibold tabular-nums text-red-600">
                      {seconds}
                    </span>
                    <span className="text-xs text-zinc-400">s</span>
                  </div>
                </div>

                {/* Stock */}
                <div className="min-w-[130px] flex-1 sm:max-w-[180px]">
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
                    className="h-1.5 overflow-hidden rounded-full bg-zinc-100"
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
                  inline-flex
                  min-h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-sky-500
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-sky-600
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-sky-500
                  focus-visible:ring-offset-2
                  active:bg-sky-700
                  sm:mt-6
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
