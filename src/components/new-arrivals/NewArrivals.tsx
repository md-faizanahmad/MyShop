import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

interface NewArrival {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

const NEW_ARRIVALS: NewArrival[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: "₹2,499",
    image: "/images/products/headphones.jpg",
    badge: "New",
  },
  {
    id: "2",
    name: "Smart Watch Series",
    price: "₹1,999",
    image: "/images/products/smartwatch.jpg",
    badge: "New",
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: "₹1,499",
    image: "/images/products/speaker.jpg",
    badge: "New",
  },
  {
    id: "4",
    name: "Fast Charging Adapter",
    price: "₹799",
    image: "/images/products/adapter.jpg",
  },
  {
    id: "5",
    name: "USB-C Braided Cable",
    price: "₹399",
    image: "/images/products/usb-cable.jpg",
  },
];

export default function NewArrivals() {
  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className="py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5">
              <Sparkles
                aria-hidden="true"
                className="size-3.5 text-sky-500 sm:size-4"
              />

              <span className="text-[11px] font-semibold uppercase tracking-wide text-sky-600 sm:text-xs">
                Fresh picks
              </span>
            </div>

            <h2
              id="new-arrivals-heading"
              className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl lg:text-2xl"
            >
              New Arrivals
            </h2>

            <p className="mt-0.5 hidden text-sm text-zinc-500 sm:block">
              Fresh products, just added to the store.
            </p>
          </div>

          {/* Desktop / mobile route */}
          <Link
            to="/new-arrivals"
            className="
              inline-flex shrink-0 items-center gap-1
              rounded-lg px-2 py-1.5
              text-xs font-semibold text-sky-600
              transition-colors
              hover:bg-sky-50 hover:text-sky-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-sky-500
              focus-visible:ring-offset-2
              sm:px-3 sm:text-sm
            "
          >
            View all
            <ArrowRight aria-hidden="true" className="size-3.5 sm:size-4" />
          </Link>
        </div>

        {/* Mobile: horizontal product rail */}
        <div
          className="
            -mx-4 flex gap-3 overflow-x-auto px-4 pb-2
            snap-x snap-mandatory
            scrollbar-none
            sm:-mx-6 sm:px-6
            lg:mx-0 lg:grid lg:grid-cols-4
            lg:gap-4 lg:overflow-visible lg:px-0
            xl:grid-cols-5
          "
        >
          {NEW_ARRIVALS.map((product) => (
            <article
              key={product.id}
              className="
                group
                w-[150px] shrink-0 snap-start
                overflow-hidden rounded-xl
                border border-zinc-100
                bg-white
                transition-shadow
                hover:shadow-md
                sm:w-[170px]
                lg:w-auto
              "
            >
              {/* Product image */}
              <Link
                to={`/product/${product.id}`}
                aria-label={`View ${product.name}`}
                className="relative block aspect-square overflow-hidden bg-zinc-50"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="
                    h-full w-full object-contain
                    p-3
                    transition-transform duration-300
                    group-hover:scale-[1.04]
                  "
                />

                {product.badge && (
                  <span
                    className="
                      absolute left-2 top-2
                      rounded-md bg-sky-600
                      px-1.5 py-0.5
                      text-[9px] font-bold
                      uppercase tracking-wide text-white
                    "
                  >
                    {product.badge}
                  </span>
                )}
              </Link>

              {/* Product information */}
              <div className="p-2.5 sm:p-3">
                <Link
                  to={`/product/${product.id}`}
                  className="
                    block
                    text-xs font-medium leading-4
                    text-zinc-800
                    line-clamp-2
                    transition-colors
                    hover:text-sky-600
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-sky-500
                    focus-visible:ring-offset-1
                    sm:text-sm sm:leading-5
                  "
                >
                  {product.name}
                </Link>

                <p className="mt-1.5 text-sm font-bold text-zinc-950 sm:text-base">
                  {product.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
